import { DayCell } from './DayCell.jsx'
import { buildCalendarMonth } from '../utils/buildCalendarMonth.js'
import {
  getRangeBoundaryRole,
  isSameCalendarDay,
  orderRangeEdges,
} from '../utils/calendarDates.js'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function CalendarGrid({
  year,
  month,
  startDate,
  endDate,
  hoverDate,
  onDateClick,
  onDateHover,
}) {
  const cells = buildCalendarMonth(year, month)
  const today = new Date()

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

      <div
        className="mt-2 grid grid-cols-7 gap-2"
        onPointerLeave={() => onDateHover?.(null)}
      >
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

          const { date } = cell

          let confirmedRole = null
          if (startDate && endDate) {
            confirmedRole = getRangeBoundaryRole(date, startDate, endDate)
          }

          let previewRole = null
          if (startDate && !endDate && hoverDate) {
            const [from, to] = orderRangeEdges(startDate, hoverDate)
            previewRole = getRangeBoundaryRole(date, from, to)
          }

          const showAnchorOnly =
            Boolean(startDate && !endDate && !hoverDate) &&
            isSameCalendarDay(date, startDate)

          return (
            <DayCell
              key={cell.key}
              date={date}
              onDateClick={onDateClick}
              onDateEnter={onDateHover}
              confirmedRole={confirmedRole}
              previewRole={previewRole}
              showAnchorOnly={showAnchorOnly}
              isToday={isSameCalendarDay(date, today)}
            />
          )
        })}
      </div>
    </section>
  )
}
