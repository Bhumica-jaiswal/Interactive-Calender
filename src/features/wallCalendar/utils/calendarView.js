/**
 * @param {number} year
 * @param {number} month - 1–12
 * @param {number} deltaMonths - e.g. -1 or +1
 * @returns {{ year: number, month: number }}
 */
export function addCalendarMonths(year, month, deltaMonths) {
  const d = new Date(year, month - 1 + deltaMonths, 1)
  return { year: d.getFullYear(), month: d.getMonth() + 1 }
}

/**
 * @param {number} year
 * @param {number} month - 1–12
 * @param {Intl.DateTimeFormatOptions} [opts]
 */
export function formatMonthYearHeading(year, month, locale = undefined, opts) {
  const date = new Date(year, month - 1, 1)
  return date.toLocaleDateString(locale ?? undefined, {
    month: 'long',
    year: 'numeric',
    ...opts,
  })
}
