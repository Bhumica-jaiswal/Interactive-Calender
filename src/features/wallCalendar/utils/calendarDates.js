export function startOfLocalDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function compareCalendarDays(a, b) {
  return startOfLocalDay(a).getTime() - startOfLocalDay(b).getTime()
}

export function isSameCalendarDay(a, b) {
  return compareCalendarDays(a, b) === 0
}

export function orderRangeEdges(a, b) {
  return compareCalendarDays(b, a) < 0 ? [b, a] : [a, b]
}

export function normalizeCalendarDate(date) {
  return startOfLocalDay(date)
}

/**
 * @param {Date} date
 * @param {Date} rangeFrom
 * @param {Date} rangeTo
 * @returns {'single' | 'start' | 'end' | 'middle' | null}
 */
export function getRangeBoundaryRole(date, rangeFrom, rangeTo) {
  if (!rangeFrom || !rangeTo) return null
  const t = startOfLocalDay(date).getTime()
  const tf = startOfLocalDay(rangeFrom).getTime()
  const tt = startOfLocalDay(rangeTo).getTime()
  if (t < tf || t > tt) return null
  if (tf === tt) return 'single'
  if (t === tf) return 'start'
  if (t === tt) return 'end'
  return 'middle'
}
