import { startTransition, useCallback, useMemo, useState } from 'react'
import { HeroSection, HERO_IMAGE_URL } from './HeroSection.jsx'
import { CalendarHeader } from './CalendarHeader.jsx'
import { CalendarGrid } from './CalendarGrid.jsx'
import { NotesPanel } from './NotesPanel.jsx'
import { useRangeSelection } from '../hooks/useRangeSelection.js'
import { useImageTheme } from '../hooks/useImageTheme.js'
import { addCalendarMonths } from '../utils/calendarView.js'
import { buildDaysWithNotesSet } from '../utils/rangeNotes.js'

const DEFAULT_YEAR = 2026
const DEFAULT_MONTH = 4

export function CalendarContainer() {
  const {
    startDate,
    endDate,
    hoverDate,
    onDateClick,
    onDateHover,
    setRange,
    clearSelection,
  } = useRangeSelection()
  const [notesByRangeKey, setNotesByRangeKey] = useState({})
  const [visibleMonth, setVisibleMonth] = useState(() => ({
    year: DEFAULT_YEAR,
    month: DEFAULT_MONTH,
  }))
  /** -1 = previous, 1 = next, 0 = initial paint (no enter motion). */
  const [monthEnterDirection, setMonthEnterDirection] = useState(0)
  const themeVars = useImageTheme(HERO_IMAGE_URL)

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

  const handleSaveNote = useCallback(
    (key, value) => {
      setNotesByRangeKey((prev) => {
        const next = { ...prev }
        if (String(value).trim() === '') delete next[key]
        else next[key] = value
        return next
      })

      // Return calendar to neutral state after saving.
      clearSelection()
    },
    [clearSelection],
  )

  const handleRemoveNote = useCallback((key) => {
    setNotesByRangeKey((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }, [])

  return (
    <section className="mx-auto w-full min-w-0 max-w-6xl">
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-36px_rgba(0,0,0,0.35)] ring-1 ring-zinc-950/5 md:rounded-3xl">
        <HeroSection
          year={visibleMonth.year}
          month={visibleMonth.month}
          imageUrl={HERO_IMAGE_URL}
        />

        <div
          style={themeVars}
          className="grid min-w-0 grid-cols-1 gap-6 p-4 sm:p-5 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-8 md:p-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-10 lg:p-10"
        >
          <aside className="order-2 min-w-0 md:order-1">
            <NotesPanel
              startDate={startDate}
              endDate={endDate}
              notesByRangeKey={notesByRangeKey}
              onSaveNote={handleSaveNote}
              onRemoveNote={handleRemoveNote}
              onSelectRange={setRange}
            />
          </aside>

          <div className="order-1 min-w-0 md:order-2">
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
