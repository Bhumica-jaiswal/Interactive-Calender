/**
 * Builds a flat list of grid cells for a month view (Sunday-first columns).
 *
 * @param {number} year - Full year (e.g. 2026)
 * @param {number} month - Month 1–12 (January = 1)
 * @returns {Array<
 *   | { kind: 'padding'; key: string }
 *   | { kind: 'day'; key: string; date: Date }
 * >}
 */
export function buildCalendarMonth(year, month) {
  const y = Math.trunc(year)
  const m = Math.trunc(month)

  if (m < 1 || m > 12 || !Number.isFinite(y)) {
    throw new RangeError('buildCalendarMonth: year must be finite and month must be 1–12')
  }

  const monthIndex = m - 1
  const firstOfMonth = new Date(y, monthIndex, 1)
  const startWeekday = firstOfMonth.getDay() // 0 = Sunday, aligns with grid header
  const daysInMonth = new Date(y, monthIndex + 1, 0).getDate()

  /** @type {Array<{ kind: 'padding'; key: string } | { kind: 'day'; key: string; date: Date }>} */
  const cells = []

  for (let i = 0; i < startWeekday; i += 1) {
    cells.push({ kind: 'padding', key: `pad-start-${y}-${m}-${i}` })
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({
      kind: 'day',
      key: `day-${y}-${m}-${day}`,
      date: new Date(y, monthIndex, day),
    })
  }

  const remainder = cells.length % 7
  if (remainder !== 0) {
    const toPad = 7 - remainder
    for (let i = 0; i < toPad; i += 1) {
      cells.push({ kind: 'padding', key: `pad-end-${y}-${m}-${i}` })
    }
  }

  return cells
}
