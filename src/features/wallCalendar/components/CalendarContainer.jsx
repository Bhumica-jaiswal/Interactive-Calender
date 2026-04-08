import { startTransition, useCallback, useMemo, useRef, useState } from 'react'
import { HeroSection, HERO_IMAGE_URL } from './HeroSection.jsx'
import { CalendarHeader } from './CalendarHeader.jsx'
import { CalendarGrid } from './CalendarGrid.jsx'
import { NotesPanel } from './NotesPanel.jsx'
import { MemoriesTimeline } from './MemoriesTimeline.jsx'
import { useRangeSelection } from '../hooks/useRangeSelection.js'
import { useImageTheme } from '../hooks/useImageTheme.js'
import { addCalendarMonths } from '../utils/calendarView.js'

const DEFAULT_YEAR = 2026
const DEFAULT_MONTH = 4

function normalizeDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function getDayMs(date) {
  return normalizeDate(date).getTime()
}

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

  const [memories, setMemories] = useState([])
  const [activeMemoryId, setActiveMemoryId] = useState(null)
  const [draftMemoryType, setDraftMemoryType] = useState('work')

  const [visibleMonth, setVisibleMonth] = useState(() => ({
    year: DEFAULT_YEAR,
    month: DEFAULT_MONTH,
  }))
  /** -1 = previous, 1 = next, 0 = initial paint (no enter motion). */
  const [monthEnterDirection, setMonthEnterDirection] = useState(0)
  const themeVars = useImageTheme(HERO_IMAGE_URL)

  const calendarGridWrapperRef = useRef(null)

  const memoriesByDay = useMemo(() => {
    const map = new Map()

    for (const memory of memories) {
      const start = normalizeDate(memory.startDate)
      const end = normalizeDate(memory.endDate)
      if (end.getTime() < start.getTime()) continue

      let cursor = new Date(start.getTime())
      while (cursor.getTime() <= end.getTime()) {
        const key = cursor.getTime()
        if (!map.has(key)) map.set(key, [])
        map.get(key).push(memory)
        cursor = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + 1)
      }
    }

    for (const arr of map.values()) {
      arr.sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    }

    return map
  }, [memories])

  const activeMemory = useMemo(
    () => memories.find((m) => m.id === activeMemoryId) || null,
    [memories, activeMemoryId],
  )

  const addMemory = useCallback(
    (memory) => {
      if (!memory) return
      if (!(memory.startDate instanceof Date) || !(memory.endDate instanceof Date)) return
      if (!memory.title || !memory.title.trim()) return
      if (memory.type !== 'work' && memory.type !== 'life') return

      const start = normalizeDate(memory.startDate)
      const end = normalizeDate(memory.endDate)
      if (end.getTime() < start.getTime()) return

      const id =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now() + Math.random())

      const nextMemory = {
        id,
        title: memory.title.trim(),
        type: memory.type,
        startDate: start,
        endDate: end,
        details: memory.details ? String(memory.details).trim() : '',
      }

      setMemories((prev) => [...prev, nextMemory])
      setActiveMemoryId(null)
      clearSelection()
    },
    [clearSelection],
  )

  const getMemoryForDate = useCallback(
    (date) => {
      if (!date) return []
      return memoriesByDay.get(getDayMs(date)) || []
    },
    [memoriesByDay],
  )

  const getMemoriesInRange = useCallback(
    (rangeStart, rangeEnd) => {
      if (!rangeStart || !rangeEnd) return []
      const s = normalizeDate(rangeStart).getTime()
      const e = normalizeDate(rangeEnd).getTime()
      const from = Math.min(s, e)
      const to = Math.max(s, e)

      return memories.filter((m) => {
        const ms = getDayMs(m.startDate)
        const me = getDayMs(m.endDate)
        return me >= from && ms <= to
      })
    },
    [memories],
  )

  const scrollCalendarIntoView = useCallback(() => {
    calendarGridWrapperRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const handleSelectMemory = useCallback(
    (memory) => {
      if (!memory) return
      setActiveMemoryId(memory.id)
      setRange(memory.startDate, memory.endDate)

      startTransition(() => {
        setMonthEnterDirection(0)
        setVisibleMonth({
          year: memory.startDate.getFullYear(),
          month: memory.startDate.getMonth() + 1,
        })
      })

      requestAnimationFrame(() => scrollCalendarIntoView())
    },
    [scrollCalendarIntoView, setRange],
  )

  const handleDateClick = useCallback(
    (date) => {
      setActiveMemoryId(null)
      onDateClick(date)
    },
    [onDateClick],
  )

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
              onAddMemory={addMemory}
              memoryType={draftMemoryType}
              onTypeChange={setDraftMemoryType}
            />

            <MemoriesTimeline
              memories={memories}
              activeMemoryId={activeMemoryId}
              onSelectMemory={handleSelectMemory}
            />
          </aside>

          <div className="order-1 min-w-0 md:order-2">
            <CalendarHeader
              year={visibleMonth.year}
              month={visibleMonth.month}
              onPrevMonth={goPrevMonth}
              onNextMonth={goNextMonth}
            />

            <div ref={calendarGridWrapperRef}>
              <CalendarGrid
                year={visibleMonth.year}
                month={visibleMonth.month}
                monthEnterDirection={monthEnterDirection}
                startDate={startDate}
                endDate={endDate}
                hoverDate={hoverDate}
                onDateClick={handleDateClick}
                onDateHover={onDateHover}
                getMemoryForDate={getMemoryForDate}
                activeMemory={activeMemory}
              draftMemoryType={draftMemoryType}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
