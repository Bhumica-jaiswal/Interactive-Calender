import { useEffect, useMemo, useState } from 'react'
import {
  formatRangeLabel,
  makeRangeKey,
  parseNoteFields,
  parseRangeKey,
  previewNoteText,
  serializeNoteFields,
} from '../utils/rangeNotes.js'

function SavedNoteRow({ noteKey, text, onEdit }) {
  const parsed = parseRangeKey(noteKey)
  const label =
    parsed != null ? formatRangeLabel(parsed.start, parsed.end) : noteKey
  const preview = previewNoteText(text)

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm transition duration-200 hover:-translate-y-[1px] hover:border-zinc-300 hover:shadow-md sm:p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</p>
          <p className="mt-1 line-clamp-2 text-sm text-zinc-800">{preview || '—'}</p>
        </div>
        <button
          type="button"
          onClick={() => parsed && onEdit(parsed.start, parsed.end)}
          className="touch-manipulation shrink-0 rounded-lg px-3 py-2.5 text-xs font-medium text-zinc-700 transition duration-200 hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/25 focus-visible:ring-offset-2 focus-visible:ring-offset-white md:min-h-0 md:px-2 md:py-1.5"
        >
          Edit
        </button>
      </div>
    </div>
  )
}

export function NotesPanel({
  startDate,
  endDate,
  notesByRangeKey,
  onSaveNote,
  onRemoveNote,
  onSelectRange,
}) {
  const [summary, setSummary] = useState('')
  const [details, setDetails] = useState('')

  const hasFullRange = Boolean(startDate && endDate)
  const rangeKey = hasFullRange ? makeRangeKey(startDate, endDate) : null
  const existingRaw = rangeKey != null ? notesByRangeKey[rangeKey] ?? '' : ''

  useEffect(() => {
    if (!hasFullRange || rangeKey == null) {
      setSummary('')
      setDetails('')
      return
    }
    const { summary: s, details: d } = parseNoteFields(notesByRangeKey[rangeKey] ?? '')
    setSummary(s)
    setDetails(d)
  }, [hasFullRange, rangeKey, notesByRangeKey])

  const savedEntries = useMemo(() => {
    return Object.entries(notesByRangeKey)
      .filter(([, v]) => String(v).trim() !== '')
      .sort(([a], [b]) => a.localeCompare(b))
  }, [notesByRangeKey])

  const draftValue = serializeNoteFields(summary, details)
  const dirty = hasFullRange && draftValue.trim() !== String(existingRaw).trim()

  const handleSave = () => {
    if (!rangeKey) return
    onSaveNote?.(rangeKey, draftValue)
  }

  const handleRemove = () => {
    if (!rangeKey) return
    onRemoveNote?.(rangeKey)
    setSummary('')
    setDetails('')
  }

  const saveDisabled =
    !hasFullRange ||
    !dirty ||
    (String(existingRaw).trim() === '' && draftValue.trim() === '')

  return (
    <section className="md:sticky md:top-6 md:z-10 md:self-start">
      <div className="rounded-3xl bg-zinc-50 p-4 ring-1 ring-zinc-950/5 sm:p-5 md:max-h-[min(100%,calc(100dvh-5rem))] md:overflow-y-auto md:overscroll-contain md:p-6 md:pr-4">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-zinc-900">Notes</h3>
          <p className="mt-1 text-sm leading-relaxed text-zinc-500">
            Select a date range, then add a short label and optional details.
          </p>
        </div>

        <div className="mt-5 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-5">
          {!hasFullRange ? (
            <p className="text-sm text-zinc-600">
              Choose a <span className="font-medium text-zinc-800">start</span> and{' '}
              <span className="font-medium text-zinc-800">end</span> date on the calendar to
              attach a note.
            </p>
          ) : (
            <>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Selected range
              </p>
              <p className="mt-1 text-sm font-semibold text-zinc-900">
                {formatRangeLabel(startDate, endDate)}
              </p>

              <div className="mt-4 space-y-3">
                <div>
                  <label
                    className="mb-1 block text-xs font-medium text-zinc-600"
                    htmlFor="note-summary"
                  >
                    Summary
                  </label>
                  <input
                    id="note-summary"
                    type="text"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="e.g. Trip planning"
                    className="w-full min-h-[44px] rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-base text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-2 focus:ring-zinc-900/10 sm:min-h-0 sm:py-2 sm:text-sm"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label
                    className="mb-1 block text-xs font-medium text-zinc-600"
                    htmlFor="note-details"
                  >
                    Details <span className="font-normal text-zinc-400">(optional)</span>
                  </label>
                  <textarea
                    id="note-details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Flights, links, reminders…"
                    rows={3}
                    className="w-full resize-y rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-base leading-relaxed text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-2 focus:ring-zinc-900/10 sm:py-2 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saveDisabled}
                  className="touch-manipulation inline-flex min-h-[44px] flex-1 items-center justify-center rounded-xl bg-[var(--wc-primary)] px-4 py-2.5 text-sm font-semibold text-[var(--wc-on-primary)] shadow-sm transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--wc-primary-ring)] disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-0 sm:flex-none sm:px-3 sm:py-2"
                >
                  Save note
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  disabled={!hasFullRange || String(existingRaw).trim() === ''}
                  className="touch-manipulation inline-flex min-h-[44px] flex-1 items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-0 sm:flex-none sm:px-3 sm:py-2"
                >
                  Remove
                </button>
              </div>
              {String(existingRaw).trim() !== '' && !dirty ? (
                <p className="mt-3 text-xs text-zinc-500">Saved for this range. Edit fields to update.</p>
              ) : null}
            </>
          )}
        </div>

        <div className="mt-5">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            All notes ({savedEntries.length})
          </p>
          {savedEntries.length === 0 ? (
            <p className="mt-2 text-sm text-zinc-500">No notes yet.</p>
          ) : (
            <ul className="mt-3 flex flex-col gap-2.5 pb-1">
              {savedEntries.map(([key, text]) => (
                <li key={key}>
                  <SavedNoteRow noteKey={key} text={text} onEdit={onSelectRange} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
