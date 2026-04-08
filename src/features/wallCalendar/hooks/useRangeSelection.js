import { useCallback, useState } from 'react'

function startOfLocalDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function compareCalendarDays(a, b) {
  return startOfLocalDay(a).getTime() - startOfLocalDay(b).getTime()
}

function orderRangeEdges(a, b) {
  if (compareCalendarDays(b, a) < 0) {
    return [b, a]
  }
  return [a, b]
}

function normalizeCalendarDate(date) {
  return startOfLocalDay(date)
}

/**
 * Range selection for calendar UIs: anchor → end → reset cycle; hover for preview.
 *
 * @returns {object} startDate, endDate, hoverDate, onDateClick, onDateHover
 */
export function useRangeSelection() {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [hoverDate, setHoverDate] = useState(null)

  const onDateClick = useCallback(
    (clickedDate) => {
      if (startDate != null && endDate != null) {
        setStartDate(null)
        setEndDate(null)
        return
      }

      if (startDate == null) {
        setStartDate(normalizeCalendarDate(clickedDate))
        setEndDate(null)
        return
      }

      const [from, to] = orderRangeEdges(startDate, clickedDate).map(normalizeCalendarDate)
      setStartDate(from)
      setEndDate(to)
    },
    [startDate, endDate],
  )

  const onDateHover = useCallback((date) => {
    setHoverDate(date == null ? null : normalizeCalendarDate(date))
  }, [])

  return {
    startDate,
    endDate,
    hoverDate,
    onDateClick,
    onDateHover,
  }
}
