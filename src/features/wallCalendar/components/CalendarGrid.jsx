import { useMemo } from 'react'
import { DayCell } from './DayCell.jsx'
import { buildCalendarMonth } from '../utils/buildCalendarMonth.js'
import { cx } from '../utils/cx.js'
import {
  getRangeBoundaryRole,
  isSameCalendarDay,
  orderRangeEdges,
} from '../utils/calendarDates.js'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/** @param {number} dir -1 previous month, 1 next month, 0 no entrance motion */
function monthEnterAnimationClass(dir) {
  if (dir === -1) {
    return 'motion-reduce:animate-cal-enter-fade animate-cal-flip-prev'
  }
  if (dir === 1) {
    return 'motion-reduce:animate-cal-enter-fade animate-cal-flip-next'
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
  getMemoryForDate,
  activeMemory,
  draftMemoryType,
}) {
  const cells = useMemo(() => buildCalendarMonth(year, month), [year, month])
  const today = new Date()
  const enterClass = monthEnterAnimationClass(monthEnterDirection ?? 0)

  return (
    <section className="mt-4 min-w-0 overflow-hidden [perspective:1200px] md:mt-6">
      <div
        key={`${year}-${month}`}
        className={cx('origin-top transform-gpu [backface-visibility:hidden]', enterClass)}
      >
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2 md:gap-2.5">
          {WEEKDAYS.map((d) => (
            <div
              key={d}
              className="px-0.5 pb-1 text-center text-[10px] font-semibold uppercase tracking-wide text-zinc-500 sm:px-1 sm:text-xs"
            >
              {d}
            </div>
          ))}
        </div>

        <div
          className="mt-1.5 grid grid-cols-7 gap-1.5 sm:mt-2 sm:gap-2 md:gap-2.5"
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
              !activeMemory &&
              Boolean(startDate && !endDate && !hoverDate) &&
              isSameCalendarDay(date, startDate)

            const memoriesForDay = getMemoryForDate ? getMemoryForDate(date) : []
            const hasWorkMemory = memoriesForDay.some((m) => m.type === 'work')
            const hasLifeMemory = memoriesForDay.some((m) => m.type === 'life')
            const tooltipMemory = memoriesForDay.length > 0 ? memoriesForDay[0] : null

            const resolvedConfirmedRole = activeMemory
              ? getRangeBoundaryRole(
                  date,
                  activeMemory.startDate,
                  activeMemory.endDate,
                )
              : confirmedRole

            const resolvedPreviewRole =
              !activeMemory && previewRole ? previewRole : null

            const memoryHighlightType = resolvedConfirmedRole
              ? activeMemory
                ? activeMemory.type
                : draftMemoryType
              : null

            return (
              <DayCell
                key={cell.key}
                date={date}
                onDateClick={onDateClick}
                onDateEnter={onDateHover}
                confirmedRole={resolvedConfirmedRole}
                previewRole={resolvedPreviewRole}
                showAnchorOnly={showAnchorOnly}
                isToday={isSameCalendarDay(date, today)}
                hasWorkMemory={hasWorkMemory}
                hasLifeMemory={hasLifeMemory}
                tooltipMemory={tooltipMemory}
                memoryHighlightType={memoryHighlightType}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
