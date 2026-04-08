export function DayCell({ label, inMonth }) {
  return (
    <button
      type="button"
      className={[
        'group relative flex aspect-square w-full flex-col items-start justify-between rounded-2xl border p-2 text-left shadow-sm transition',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20',
        inMonth
          ? 'border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50'
          : 'border-zinc-100 bg-zinc-50 text-zinc-400 hover:bg-zinc-100',
      ].join(' ')}
      aria-label={`Day ${label}`}
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

