import { compareCalendarDays, orderRangeEdges, startOfLocalDay } from './calendarDates.js'

/** @param {Date} date */
export function formatLocalISODate(date) {
  const d = startOfLocalDay(date)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/**
 * @param {Date} from
 * @param {Date} to
 * @returns {string} e.g. "2026-04-01_2026-04-05"
 */
export function makeRangeKey(from, to) {
  const [a, b] = orderRangeEdges(from, to)
  return `${formatLocalISODate(a)}_${formatLocalISODate(b)}`
}

/**
 * @param {string} key
 * @returns {{ start: Date, end: Date } | null}
 */
export function parseRangeKey(key) {
  const idx = key.indexOf('_')
  if (idx <= 0 || idx === key.length - 1) return null
  const left = key.slice(0, idx)
  const right = key.slice(idx + 1)
  const start = parseLocalISODate(left)
  const end = parseLocalISODate(right)
  if (!start || !end) return null
  return { start, end }
}

function parseLocalISODate(ymd) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd)
  if (!m) return null
  const y = Number(m[1])
  const mo = Number(m[2]) - 1
  const d = Number(m[3])
  const dt = new Date(y, mo, d)
  if (dt.getFullYear() !== y || dt.getMonth() !== mo || dt.getDate() !== d) return null
  return startOfLocalDay(dt)
}

/** UI stores summary + details; persisted value is a single string. */
export function serializeNoteFields(summary, details) {
  const s = summary.trim()
  const t = details.trim()
  if (!t) return s
  if (!s) return t
  return `${s}\n\n${t}`
}

export function parseNoteFields(raw) {
  const str = raw == null ? '' : String(raw)
  const i = str.indexOf('\n\n')
  if (i === -1) return { summary: str, details: '' }
  return {
    summary: str.slice(0, i).trimEnd(),
    details: str.slice(i + 2).trimStart(),
  }
}

/**
 * @param {Record<string, string>} notes
 * @returns {Set<number>} local-midnight timestamps for every day covered by a non-empty note
 */
export function buildDaysWithNotesSet(notes) {
  const set = new Set()
  for (const [key, text] of Object.entries(notes)) {
    if (text == null || String(text).trim() === '') continue
    const parsed = parseRangeKey(key)
    if (!parsed) continue
    let cursor = startOfLocalDay(parsed.start)
    const end = startOfLocalDay(parsed.end)
    while (compareCalendarDays(cursor, end) <= 0) {
      set.add(cursor.getTime())
      cursor = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + 1)
    }
  }
  return set
}

export function formatRangeLabel(start, end, locale) {
  const opts = { month: 'short', day: 'numeric', year: 'numeric' }
  const a = start.toLocaleDateString(locale, opts)
  const b = end.toLocaleDateString(locale, opts)
  if (formatLocalISODate(start) === formatLocalISODate(end)) return a
  return `${a} – ${b}`
}

export function previewNoteText(raw, maxLen = 72) {
  const { summary, details } = parseNoteFields(raw)
  const line = summary || details || ''
  if (line.length <= maxLen) return line
  return `${line.slice(0, maxLen - 1)}…`
}
