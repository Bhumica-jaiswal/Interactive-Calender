import { useCallback, useEffect, useRef, useState } from 'react'
import { normalizeCalendarDate, orderRangeEdges } from '../utils/calendarDates.js'

/** Debounced clear avoids preview flashing when the pointer briefly leaves the grid or crosses gaps. */
const HOVER_CLEAR_DELAY_MS = 48

/**
 * Range selection for calendar UIs: anchor → end → reset cycle; hover for preview.
 *
 * @returns {object} startDate, endDate, hoverDate, onDateClick, onDateHover
 */
export function useRangeSelection() {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [hoverDate, setHoverDate] = useState(null)

  const hoverClearTimerRef = useRef(null)

  const cancelPendingHoverClear = useCallback(() => {
    if (hoverClearTimerRef.current == null) return
    clearTimeout(hoverClearTimerRef.current)
    hoverClearTimerRef.current = null
  }, [])

  const scheduleHoverClear = useCallback(() => {
    cancelPendingHoverClear()
    hoverClearTimerRef.current = setTimeout(() => {
      setHoverDate(null)
      hoverClearTimerRef.current = null
    }, HOVER_CLEAR_DELAY_MS)
  }, [cancelPendingHoverClear])

  useEffect(() => () => cancelPendingHoverClear(), [cancelPendingHoverClear])

  const onDateClick = useCallback(
    (clickedDate) => {
      if (startDate != null && endDate != null) {
        cancelPendingHoverClear()
        setStartDate(null)
        setEndDate(null)
        setHoverDate(null)
        return
      }

      if (startDate == null) {
        setStartDate(normalizeCalendarDate(clickedDate))
        setEndDate(null)
        return
      }

      const [from, to] = orderRangeEdges(startDate, clickedDate).map(normalizeCalendarDate)
      cancelPendingHoverClear()
      setStartDate(from)
      setEndDate(to)
      setHoverDate(null)
    },
    [startDate, endDate, cancelPendingHoverClear],
  )

  const onDateHover = useCallback(
    (date) => {
      if (date != null) {
        cancelPendingHoverClear()
        setHoverDate(normalizeCalendarDate(date))
        return
      }
      scheduleHoverClear()
    },
    [cancelPendingHoverClear, scheduleHoverClear],
  )

  return {
    startDate,
    endDate,
    hoverDate,
    onDateClick,
    onDateHover,
  }
}
