import { useEffect, useMemo, useState } from 'react'

const DEFAULT_THEME = {
  primary: '#2563eb',
  primarySoft: '#dbeafe',
  primaryMuted: '#93c5fd',
  primaryRing: '#60a5fa',
  onPrimary: '#ffffff',
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

function rgbToHex(r, g, b) {
  const toHex = (v) => Math.round(v).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function hslToRgb(h, s, l) {
  const hue = ((h % 360) + 360) % 360
  const sat = clamp(s, 0, 100) / 100
  const lig = clamp(l, 0, 100) / 100
  const c = (1 - Math.abs(2 * lig - 1)) * sat
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1))
  const m = lig - c / 2

  let r = 0
  let g = 0
  let b = 0
  if (hue < 60) [r, g, b] = [c, x, 0]
  else if (hue < 120) [r, g, b] = [x, c, 0]
  else if (hue < 180) [r, g, b] = [0, c, x]
  else if (hue < 240) [r, g, b] = [0, x, c]
  else if (hue < 300) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]

  return {
    r: (r + m) * 255,
    g: (g + m) * 255,
    b: (b + m) * 255,
  }
}

function channelToLinear(v) {
  const s = v / 255
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
}

function relativeLuminance({ r, g, b }) {
  return 0.2126 * channelToLinear(r) + 0.7152 * channelToLinear(g) + 0.0722 * channelToLinear(b)
}

function pickOnColor(primaryRgb) {
  const whiteLum = 1
  const blackLum = 0
  const bgLum = relativeLuminance(primaryRgb)
  const contrastWhite = (Math.max(whiteLum, bgLum) + 0.05) / (Math.min(whiteLum, bgLum) + 0.05)
  const contrastBlack = (Math.max(blackLum, bgLum) + 0.05) / (Math.min(blackLum, bgLum) + 0.05)
  return contrastWhite >= contrastBlack ? '#ffffff' : '#111827'
}

function deriveThemeFromPixels(pixels) {
  let hueSum = 0
  let satSum = 0
  let lightSum = 0
  let count = 0

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i]
    const g = pixels[i + 1]
    const b = pixels[i + 2]
    const a = pixels[i + 3]
    if (a < 120) continue

    const max = Math.max(r, g, b) / 255
    const min = Math.min(r, g, b) / 255
    const delta = max - min
    const light = (max + min) / 2
    if (light < 0.15 || light > 0.9) continue
    if (delta < 0.08) continue

    let hue = 0
    if (delta !== 0) {
      if (max === r / 255) hue = ((g - b) / 255 / delta) % 6
      else if (max === g / 255) hue = (b / 255 - r / 255) / delta + 2
      else hue = (r / 255 - g / 255) / delta + 4
      hue *= 60
    }

    const sat = delta / (1 - Math.abs(2 * light - 1))
    hueSum += hue
    satSum += sat
    lightSum += light
    count += 1
  }

  if (count === 0) return DEFAULT_THEME

  const avgHue = hueSum / count
  const avgSat = clamp((satSum / count) * 100 * 1.2, 50, 82)
  const avgLight = clamp((lightSum / count) * 100, 32, 55)

  const primaryRgb = hslToRgb(avgHue, avgSat, avgLight)
  const softRgb = hslToRgb(avgHue, clamp(avgSat - 34, 28, 56), 92)
  const mutedRgb = hslToRgb(avgHue, clamp(avgSat - 20, 36, 66), 74)
  const ringRgb = hslToRgb(avgHue, clamp(avgSat - 4, 52, 80), 64)

  return {
    primary: rgbToHex(primaryRgb.r, primaryRgb.g, primaryRgb.b),
    primarySoft: rgbToHex(softRgb.r, softRgb.g, softRgb.b),
    primaryMuted: rgbToHex(mutedRgb.r, mutedRgb.g, mutedRgb.b),
    primaryRing: rgbToHex(ringRgb.r, ringRgb.g, ringRgb.b),
    onPrimary: pickOnColor(primaryRgb),
  }
}

export function useImageTheme(imageUrl) {
  const [theme, setTheme] = useState(DEFAULT_THEME)

  useEffect(() => {
    let cancelled = false
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = imageUrl
    img.onload = () => {
      if (cancelled) return
      try {
        const canvas = document.createElement('canvas')
        canvas.width = 36
        canvas.height = 36
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        if (!ctx) return
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data
        const next = deriveThemeFromPixels(pixels)
        setTheme(next)
      } catch {
        setTheme(DEFAULT_THEME)
      }
    }
    img.onerror = () => {
      if (!cancelled) setTheme(DEFAULT_THEME)
    }
    return () => {
      cancelled = true
    }
  }, [imageUrl])

  return useMemo(
    () => ({
      '--wc-primary': theme.primary,
      '--wc-primary-soft': theme.primarySoft,
      '--wc-primary-muted': theme.primaryMuted,
      '--wc-primary-ring': theme.primaryRing,
      '--wc-on-primary': theme.onPrimary,
    }),
    [theme],
  )
}

