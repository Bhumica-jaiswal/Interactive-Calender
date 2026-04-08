function NoteItem({ title, meta }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-zinc-300">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-zinc-900">{title}</p>
          <p className="mt-1 text-xs text-zinc-500">{meta}</p>
        </div>
        <button
          type="button"
          className="rounded-lg px-2 py-1 text-xs font-medium text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
        >
          Edit
        </button>
      </div>
    </div>
  )
}

export function NotesPanel() {
  return (
    <section className="sticky top-6">
      <div className="rounded-3xl bg-zinc-50 p-5 ring-1 ring-zinc-950/5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold tracking-tight text-zinc-900">
              Notes
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              Attach details to a selected date range.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
          >
            Add
          </button>
        </div>

        <div className="mt-5 grid gap-3">
          <NoteItem title="Team offsite" meta="Apr 8–10 · 2 notes" />
          <NoteItem title="Dentist appointment" meta="Apr 14 · 9:30 AM" />
          <NoteItem title="Pay rent" meta="Apr 1 · Reminder" />
        </div>

        <div className="mt-5 rounded-2xl border border-dashed border-zinc-300 bg-white/60 p-4">
          <p className="text-sm font-medium text-zinc-900">Quick add</p>
          <p className="mt-1 text-sm text-zinc-500">
            Select a range, then jot something down.
          </p>
          <div className="mt-3">
            <textarea
              className="min-h-24 w-full resize-none rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-2 focus:ring-zinc-900/10"
              placeholder="Add a note…"
              disabled
            />
          </div>
        </div>
      </div>
    </section>
  )
}

