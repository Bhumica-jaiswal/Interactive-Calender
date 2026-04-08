import { useMemo } from 'react'
import { formatRangeLabel } from '../utils/rangeNotes.js'
import { cx } from '../utils/cx.js'

function memoryTheme(type) {
  if (type === 'life') {
    return {
      dot: 'bg-green-500',
      soft: 'border-green-100 bg-green-50',
      ring: 'ring-green-400/45',
      border: 'border-green-200',
      text: 'text-green-900',
    }
  }

  return {
    dot: 'bg-blue-500',
    soft: 'border-blue-100 bg-blue-50',
    ring: 'ring-blue-400/45',
    border: 'border-blue-200',
    text: 'text-blue-900',
  }
}

export function MemoriesTimeline({ memories, activeMemoryId, onSelectMemory }) {
  const sorted = useMemo(() => {
    const arr = Array.isArray(memories) ? [...memories] : []
    arr.sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    return arr
  }, [memories])

  return (
    <section className="mt-6">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          Memories ({sorted.length})
        </p>
      </div>

      <div className="mt-3 max-h-[40vh] overflow-y-auto pr-1">
        {sorted.length === 0 ? (
          <p className="text-sm text-zinc-500">Add your first memory.</p>
        ) : (
          <ul className="flex flex-col gap-2.5">
            {sorted.map((m) => {
              const theme = memoryTheme(m.type)
              const isActive = m.id === activeMemoryId

              return (
                <li key={m.id}>
                  <button
                    type="button"
                    onClick={() => onSelectMemory?.(m)}
                    className={cx(
                      'group flex w-full items-center gap-3 rounded-2xl border bg-white px-3 py-2.5 text-left shadow-sm transition duration-200',
                      theme.border,
                      theme.soft,
                      'hover:-translate-y-[1px] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 active:translate-y-0',
                      isActive && `ring-2 ${theme.ring}`,
                    )}
                  >
                    <span
                      className={cx('h-7 w-1.5 rounded-full shadow-sm', theme.dot)}
                      aria-hidden
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-zinc-900 group-hover:text-zinc-950">
                        {m.title}
                      </p>
                      <p className="mt-0.5 text-xs text-zinc-600">
                        {formatRangeLabel(m.startDate, m.endDate)}
                      </p>
                      {m.details ? (
                        <p className="mt-0.5 line-clamp-2 text-xs text-zinc-500">
                          {m.details}
                        </p>
                      ) : null}
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}

