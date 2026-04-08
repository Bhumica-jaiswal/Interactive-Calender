import { startTransition, useCallback, useMemo, useState } from 'react'
import { HeroSection } from './HeroSection.jsx'
import { CalendarHeader } from './CalendarHeader.jsx'
import { CalendarGrid } from './CalendarGrid.jsx'
import { NotesPanel } from './NotesPanel.jsx'
import { useRangeSelection } from '../hooks/useRangeSelection.js'
import { addCalendarMonths } from '../utils/calendarView.js'
import { buildDaysWithNotesSet } from '../utils/rangeNotes.js'

const DEFAULT_YEAR = 2026
const DEFAULT_MONTH = 4

export function CalendarContainer() {
  const { startDate, endDate, hoverDate, onDateClick, onDateHover, setRange } =
    useRangeSelection()
  const [notesByRangeKey, setNotesByRangeKey] = useState({})
  const [visibleMonth, setVisibleMonth] = useState(() => ({
    year: DEFAULT_YEAR,
    month: DEFAULT_MONTH,
  }))
  /** -1 = previous, 1 = next, 0 = initial paint (no enter motion). */
  const [monthEnterDirection, setMonthEnterDirection] = useState(0)

  const daysWithNotes = useMemo(() => buildDaysWithNotesSet(notesByRangeKey), [notesByRangeKey])

  const goPrevMonth = useCallback(() => {
    startTransition(() => {
      setMonthEnterDirection(-1)
      setVisibleMonth((v) => addCalendarMonths(v.year, v.month, -1))
    })
  }, [])

  const goNextMonth = useCallback(() => {
    startTransition(() => {
      setMonthEnterDirection(1)
      setVisibleMonth((v) => addCalendarMonths(v.year, v.month, 1))
    })
  }, [])

  const handleSaveNote = useCallback((key, value) => {
    setNotesByRangeKey((prev) => {
      const next = { ...prev }
      if (String(value).trim() === '') delete next[key]
      else next[key] = value
      return next
    })
  }, [])

  const handleRemoveNote = useCallback((key) => {
    setNotesByRangeKey((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }, [])

  return (
    <section className="mx-auto w-full max-w-6xl">
      <div className="overflow-hidden rounded-3xl bg-white shadow-[0_24px_60px_-36px_rgba(0,0,0,0.35)] ring-1 ring-zinc-950/5">
        <HeroSection year={visibleMonth.year} month={visibleMonth.month} />

        <div className="grid grid-cols-1 gap-6 p-5 sm:gap-8 sm:p-7 lg:grid-cols-[22rem_1fr] lg:gap-10 lg:p-10">
          <aside className="order-2 lg:order-1">
            <NotesPanel
              startDate={startDate}
              endDate={endDate}
              notesByRangeKey={notesByRangeKey}
              onSaveNote={handleSaveNote}
              onRemoveNote={handleRemoveNote}
              onSelectRange={setRange}
            />
          </aside>

          <div className="order-1 lg:order-2">
            <CalendarHeader
              year={visibleMonth.year}
              month={visibleMonth.month}
              onPrevMonth={goPrevMonth}
              onNextMonth={goNextMonth}
            />
            <CalendarGrid
              year={visibleMonth.year}
              month={visibleMonth.month}
              monthEnterDirection={monthEnterDirection}
              startDate={startDate}
              endDate={endDate}
              hoverDate={hoverDate}
              onDateClick={onDateClick}
              onDateHover={onDateHover}
              daysWithNotes={daysWithNotes}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
