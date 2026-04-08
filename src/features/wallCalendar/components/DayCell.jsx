function formatDayNumber(date) {
  return String(date.getDate())
}

export function DayCell({ date }) {
  const label = formatDayNumber(date)

  return (
    <button
      type="button"
      className={[
        'group relative flex aspect-square w-full flex-col items-start justify-between rounded-2xl border border-zinc-200 bg-white p-2 text-left shadow-sm transition',
        'hover:border-zinc-300 hover:bg-zinc-50',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20',
      ].join(' ')}
      aria-label={date.toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })}
    >
      <div className="flex w-full items-center justify-between">
        <span className="text-sm font-semibold text-zinc-900/90 group-hover:text-zinc-900">
          {label}
        </span>
        <span className="inline-flex h-2 w-2 rounded-full bg-zinc-200 opacity-0 transition group-hover:opacity-100" />
      </div>

      <div className="mt-2 h-7 w-full rounded-xl bg-zinc-100/70 opacity-0 transition group-hover:opacity-100" />
    </button>
  )
}
