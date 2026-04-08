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
  const todayLabel = new Date().toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div className="min-w-0 flex-1">
        <h2
          className="text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl"
          aria-live="polite"
        >
          {monthName} <span className="text-zinc-500">{year}</span>
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-zinc-500 sm:max-w-md">
          Select a range to preview, confirm, and attach notes.
        </p>
        <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-[var(--wc-primary-muted)] bg-[var(--wc-primary-soft)] px-3 py-1 text-xs font-medium text-zinc-800 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--wc-primary)]" aria-hidden />
          <span>Today: {todayLabel}</span>
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-end gap-2 self-stretch sm:self-auto">
        <button
          type="button"
          onClick={onPrevMonth}
          className="inline-flex h-11 min-h-[44px] w-11 min-w-[44px] touch-manipulation items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 shadow-sm transition duration-200 hover:-translate-y-[1px] hover:border-[var(--wc-primary-muted)] hover:bg-[var(--wc-primary-soft)] hover:text-zinc-900 hover:shadow-md active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--wc-primary-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-white lg:h-10 lg:min-h-0 lg:w-10 lg:min-w-0"
          aria-label={`Previous month, currently viewing ${heading}`}
        >
          <IconChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={onNextMonth}
          className="inline-flex h-11 min-h-[44px] w-11 min-w-[44px] touch-manipulation items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 shadow-sm transition duration-200 hover:-translate-y-[1px] hover:border-[var(--wc-primary-muted)] hover:bg-[var(--wc-primary-soft)] hover:text-zinc-900 hover:shadow-md active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--wc-primary-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-white lg:h-10 lg:min-h-0 lg:w-10 lg:min-w-0"
          aria-label={`Next month, currently viewing ${heading}`}
        >
          <IconChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
