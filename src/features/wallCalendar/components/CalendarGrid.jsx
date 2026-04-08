import { DayCell } from './DayCell.jsx'
import { buildCalendarMonth } from '../utils/buildCalendarMonth.js'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function CalendarGrid({ year, month }) {
  const cells = buildCalendarMonth(year, month)

  return (
    <section className="mt-6">
      <div className="grid grid-cols-7 gap-2">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="px-2 pb-1 text-center text-xs font-semibold uppercase tracking-wide text-zinc-500"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-2">
        {cells.map((cell) => {
          if (cell.kind === 'padding') {
            return (
              <div
                key={cell.key}
                className="aspect-square w-full rounded-2xl border border-transparent bg-transparent"
                aria-hidden="true"
              />
            )
          }
          return <DayCell key={cell.key} date={cell.date} />
        })}
      </div>
    </section>
  )
}
