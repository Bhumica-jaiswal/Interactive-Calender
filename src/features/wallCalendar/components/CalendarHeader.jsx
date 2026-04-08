function IconChevronLeft(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M12.78 15.53a.75.75 0 0 1-1.06 0l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 1 1 1.06 1.06L9.06 10l3.72 3.72a.75.75 0 0 1 0 1.06Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function IconChevronRight(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M7.22 4.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L10.94 10 7.22 6.28a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export function CalendarHeader({ year, month, onPrevMonth, onNextMonth }) {
  const view = new Date(year, month - 1, 1)
  const monthName = view.toLocaleDateString(undefined, { month: 'long' })
  const heading = `${monthName} ${year}`

  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2
          className="text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl"
          aria-live="polite"
        >
          {monthName} <span className="text-zinc-500">{year}</span>
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Select a range to preview, confirm, and attach notes.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrevMonth}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 shadow-sm transition hover:scale-[1.03] hover:bg-zinc-50 hover:text-zinc-900 active:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 motion-reduce:hover:scale-100"
          aria-label={`Previous month, currently viewing ${heading}`}
        >
          <IconChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={onNextMonth}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 shadow-sm transition hover:scale-[1.03] hover:bg-zinc-50 hover:text-zinc-900 active:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 motion-reduce:hover:scale-100"
          aria-label={`Next month, currently viewing ${heading}`}
        >
          <IconChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
