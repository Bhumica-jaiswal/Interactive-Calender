import { useEffect, useMemo, useState } from 'react'
import { formatRangeLabel } from '../utils/rangeNotes.js'

const MEMORY_TYPES = [
  { type: 'work', label: 'Work', accent: 'blue' },
  { type: 'life', label: 'Life', accent: 'green' },
]

function accentClasses(accent, selected) {
  if (selected) {
    return (
      accent === 'blue'
        ? 'border-blue-500 bg-blue-500 text-white shadow-sm'
        : 'border-green-500 bg-green-500 text-white shadow-sm'
    )
  }

  return (
    accent === 'blue'
      ? 'border-blue-100 bg-blue-50 text-blue-800 hover:bg-blue-100'
      : 'border-green-100 bg-green-50 text-green-800 hover:bg-green-100'
  )
}

export function NotesPanel({
  startDate,
  endDate,
  onAddMemory,
  memoryType,
  onTypeChange,
}) {
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')

  const hasFullRange = Boolean(startDate && endDate)
  const rangeLabel = useMemo(
    () => (hasFullRange ? formatRangeLabel(startDate, endDate) : ''),
    [hasFullRange, startDate, endDate],
  )

  useEffect(() => {
    if (!hasFullRange) {
      setTitle('')
      setDetails('')
      onTypeChange?.('work')
    }
  }, [hasFullRange])

  const handleSave = () => {
    if (!hasFullRange) return
    const trimmed = title.trim()
    if (!trimmed) return

    onAddMemory?.({
      title: trimmed,
      type: memoryType,
      startDate,
      endDate,
      details: details.trim(),
    })

    setTitle('')
    setDetails('')
    onTypeChange?.('work')
  }

  const saveDisabled = !hasFullRange || !title.trim()
  const primaryAccent = memoryType === 'work' ? 'blue' : 'green'

  return (
    <section className="md:sticky md:top-6 md:z-10 md:self-start">
      <div className="rounded-3xl bg-zinc-50 p-4 ring-1 ring-zinc-950/5 sm:p-5 md:max-h-[min(100%,calc(100dvh-5rem))] md:overflow-y-auto md:overscroll-contain md:p-6 md:pr-4">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-zinc-900">
            Memories
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-zinc-500">
            Create a memory from a selected date range.
          </p>
        </div>

        <div className="mt-5 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-5">
          {!hasFullRange ? (
            <p className="text-sm text-zinc-600">
              Choose a <span className="font-medium text-zinc-800">start</span> and{' '}
              <span className="font-medium text-zinc-800">end</span> date on the calendar
              to save a memory.
            </p>
          ) : (
            <>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Selected range
              </p>
              <p className="mt-1 text-sm font-semibold text-zinc-900">{rangeLabel}</p>

              <div className="mt-4 space-y-3">
                <div>
                  <label
                    className="mb-1 block text-xs font-medium text-zinc-600"
                    htmlFor="memory-title"
                  >
                    Title
                  </label>
                  <input
                    id="memory-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Team offsite"
                    className="w-full min-h-[44px] rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-base text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-2 focus:ring-zinc-900/10 sm:min-h-0 sm:py-2 sm:text-sm"
                    autoComplete="off"
                  />
                </div>

                <div>
                  <p className="mb-1 text-xs font-medium text-zinc-600">Type</p>
                  <div className="inline-flex w-full rounded-2xl bg-zinc-100 p-0.5">
                    {MEMORY_TYPES.map((t) => {
                      const selected = memoryType === t.type
                      return (
                        <button
                          key={t.type}
                          type="button"
                          onClick={() => onTypeChange?.(t.type)}
                          className={[
                            'relative inline-flex min-h-[36px] flex-1 items-center justify-center rounded-2xl px-3 text-xs font-medium transition',
                            'focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20',
                            'touch-manipulation',
                            accentClasses(t.accent, selected),
                          ].join(' ')}
                        >
                          {t.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <label
                    className="mb-1 block text-xs font-medium text-zinc-600"
                    htmlFor="memory-details"
                  >
                    Details (optional)
                  </label>
                  <textarea
                    id="memory-details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Add one or two lines (links, context, reminders...)"
                    rows={2}
                    className="w-full resize-y rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-2 focus:ring-zinc-900/10 sm:py-2"
                  />
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saveDisabled}
                  className={[
                    'touch-manipulation inline-flex min-h-[44px] w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 disabled:cursor-not-allowed disabled:opacity-50',
                    primaryAccent === 'blue'
                      ? 'bg-blue-500 text-white hover:brightness-95'
                      : 'bg-green-500 text-white hover:brightness-95',
                  ].join(' ')}
                >
                  Save Memory
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
