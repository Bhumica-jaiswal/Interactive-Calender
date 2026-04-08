import { useMemo } from 'react'
import { DayCell } from './DayCell.jsx'
import { buildCalendarMonth } from '../utils/buildCalendarMonth.js'
import {
  getRangeBoundaryRole,
  isSameCalendarDay,
  orderRangeEdges,
  startOfLocalDay,
} from '../utils/calendarDates.js'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/** @param {number} dir -1 previous month, 1 next month, 0 no entrance motion */
function monthEnterAnimationClass(dir) {
  if (dir === -1) {
    return 'motion-reduce:animate-cal-enter-fade animate-cal-enter-left'
  }
  if (dir === 1) {
    return 'motion-reduce:animate-cal-enter-fade animate-cal-enter-right'
  }
  return ''
}

export function CalendarGrid({
  year,
  month,
  monthEnterDirection,
  startDate,
  endDate,
  hoverDate,
  onDateClick,
  onDateHover,
  daysWithNotes,
}) {
  const cells = useMemo(() => buildCalendarMonth(year, month), [year, month])
  const today = new Date()
  const enterClass = monthEnterAnimationClass(monthEnterDirection ?? 0)

  return (
    <section className="mt-6 overflow-hidden">
      <div
        key={`${year}-${month}`}
        className={enterClass}
      >
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

            const hasNote =
              daysWithNotes != null && daysWithNotes.has(startOfLocalDay(date).getTime())

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
                hasNote={hasNote}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
