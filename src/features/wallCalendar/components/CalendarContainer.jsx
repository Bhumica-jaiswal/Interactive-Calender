import { HeroSection } from './HeroSection.jsx'
import { CalendarHeader } from './CalendarHeader.jsx'
import { CalendarGrid } from './CalendarGrid.jsx'
import { NotesPanel } from './NotesPanel.jsx'
import { useRangeSelection } from '../hooks/useRangeSelection.js'

const DEFAULT_YEAR = 2026
const DEFAULT_MONTH = 4

export function CalendarContainer() {
  const { startDate, endDate, hoverDate, onDateClick, onDateHover } = useRangeSelection()

  return (
    <section className="mx-auto w-full max-w-6xl">
      <div className="overflow-hidden rounded-3xl bg-white shadow-[0_24px_60px_-36px_rgba(0,0,0,0.35)] ring-1 ring-zinc-950/5">
        <HeroSection />

        <div className="grid grid-cols-1 gap-6 p-5 sm:gap-8 sm:p-7 lg:grid-cols-[22rem_1fr] lg:gap-10 lg:p-10">
          <aside className="order-2 lg:order-1">
            <NotesPanel />
          </aside>

          <div className="order-1 lg:order-2">
            <CalendarHeader />
            <CalendarGrid
              year={DEFAULT_YEAR}
              month={DEFAULT_MONTH}
              startDate={startDate}
              endDate={endDate}
              hoverDate={hoverDate}
              onDateClick={onDateClick}
              onDateHover={onDateHover}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

