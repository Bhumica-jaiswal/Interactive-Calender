import { DayCell } from './DayCell.jsx'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function CalendarGrid() {
  // Static placeholder days (no logic yet).
  const days = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - 2 // creates a few "leading" days visually
    const inMonth = dayNumber >= 1 && dayNumber <= 30
    const label = inMonth ? String(dayNumber) : String(inMonth ? dayNumber : dayNumber <= 0 ? 30 + dayNumber : dayNumber - 30)
    return { key: i, label, inMonth }
  })

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
        {days.map((day) => (
          <DayCell key={day.key} label={day.label} inMonth={day.inMonth} />
        ))}
      </div>
    </section>
  )
}

