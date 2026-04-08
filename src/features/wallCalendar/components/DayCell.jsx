import { memo } from 'react'

const TRANSITION_CLASSES =
  'transition-[transform,background-color,color,box-shadow,border-color,ring-color] duration-200 ease-out motion-reduce:transform-none motion-reduce:transition-none'

function formatDayNumber(date) {
  return String(date.getDate())
}

function resolveVisualState({ confirmedRole, previewRole, showAnchorOnly }) {
  if (confirmedRole) return { layer: 'confirmed', role: confirmedRole }
  if (previewRole) return { layer: 'preview', role: previewRole }
  if (showAnchorOnly) return { layer: 'anchor', role: 'single' }
  return { layer: 'none', role: null }
}

function DayCellInner({
  date,
  onDateClick,
  onDateEnter,
  confirmedRole,
  previewRole,
  showAnchorOnly,
  isToday,
  hasNote,
}) {
  const label = formatDayNumber(date)
  const { layer, role } = resolveVisualState({
    confirmedRole,
    previewRole,
    showAnchorOnly,
  })

  const isPreviewEndpoint =
    layer === 'preview' &&
    (role === 'single' || role === 'start' || role === 'end')

  const isDarkEndpoint =
    layer === 'confirmed' &&
    (role === 'single' || role === 'start' || role === 'end')

  const isHighlighted = layer !== 'none'
  const labelLight = isDarkEndpoint || isPreviewEndpoint

  const roundedByRole =
    role === 'single'
      ? 'rounded-2xl'
      : role === 'start'
        ? 'rounded-l-2xl rounded-r-lg'
        : role === 'end'
          ? 'rounded-r-2xl rounded-l-lg'
          : role === 'middle'
            ? 'rounded-lg'
            : 'rounded-2xl'

  const layerClasses =
    layer === 'confirmed'
      ? {
          single:
            'border-transparent bg-zinc-900 text-white shadow-md shadow-zinc-950/25 hover:scale-[1.02] hover:shadow-lg',
          start:
            'border-transparent bg-zinc-900 text-white shadow-md shadow-zinc-950/20 hover:scale-[1.02]',
          end: 'border-transparent bg-zinc-900 text-white shadow-md shadow-zinc-950/20 hover:scale-[1.02]',
          middle:
            'border-zinc-200/90 bg-zinc-200 text-zinc-900 shadow-sm hover:bg-zinc-200/95',
        }
      : layer === 'preview'
        ? {
            single:
              'border border-dashed border-sky-400/70 bg-sky-500 text-white shadow-sm shadow-sky-500/20 ring-1 ring-sky-300/50 hover:scale-[1.02]',
            start:
              'border border-dashed border-sky-400/65 bg-sky-500 text-white shadow-sm shadow-sky-500/15 ring-1 ring-sky-300/45 hover:scale-[1.02]',
            end: 'border border-dashed border-sky-400/65 bg-sky-500 text-white shadow-sm shadow-sky-500/15 ring-1 ring-sky-300/45 hover:scale-[1.02]',
            middle:
              'border border-sky-200/90 bg-sky-100 text-sky-950 shadow-sm ring-1 ring-sky-200/55 hover:bg-sky-100/95',
          }
        : layer === 'anchor'
          ? {
              single:
                'border-transparent bg-zinc-900 text-white shadow-md shadow-zinc-950/25 hover:scale-[1.02]',
            }
          : null

  const roleKey = layer === 'anchor' ? 'single' : role
  const layerStyleClasses =
    layerClasses && roleKey
      ? layerClasses[roleKey]
      : 'border-zinc-200 bg-white shadow-sm hover:scale-[1.02] hover:border-zinc-300 hover:bg-zinc-50'

  const todayRing = isToday
    ? isDarkEndpoint
      ? 'ring-2 ring-inset ring-white/40'
      : isPreviewEndpoint
        ? 'ring-2 ring-inset ring-sky-100/70'
        : isHighlighted
          ? 'ring-2 ring-inset ring-sky-300/35'
          : 'ring-2 ring-inset ring-zinc-400/45'
    : ''

  const baseInteractive = [
    'group relative flex aspect-square w-full flex-col items-start justify-between p-2 text-left',
    TRANSITION_CLASSES,
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 active:scale-[0.98]',
  ].join(' ')

  const borderBase = layer === 'none' ? 'border' : ''

  const ariaLabelBase = date.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  const ariaLabel = hasNote ? `${ariaLabelBase}. Has note.` : ariaLabelBase

  return (
    <button
      type="button"
      className={[baseInteractive, roundedByRole, borderBase, layerStyleClasses, todayRing]
        .filter(Boolean)
        .join(' ')}
      aria-label={ariaLabel}
      aria-pressed={isHighlighted}
      onClick={() => onDateClick?.(date)}
      onPointerEnter={() => onDateEnter?.(date)}
    >
      <div className="flex w-full items-center justify-between">
        <span
          className={[
            'text-sm font-semibold',
            TRANSITION_CLASSES,
            labelLight ? 'text-white' : 'text-zinc-900/90 group-hover:text-zinc-900',
          ].join(' ')}
        >
          {label}
        </span>
        <span
          className={[
            'inline-flex h-2 w-2 rounded-full opacity-0 transition-opacity duration-200 ease-out motion-reduce:transition-none',
            'group-hover:scale-110 group-hover:opacity-100 motion-reduce:group-hover:scale-100',
            labelLight ? 'bg-white/60' : 'bg-zinc-400',
          ].join(' ')}
        />
      </div>

      <div
        className={[
          'mt-2 h-7 w-full rounded-xl',
          TRANSITION_CLASSES,
          isHighlighted ? 'opacity-0' : 'bg-zinc-100/70 opacity-0 group-hover:opacity-100',
        ].join(' ')}
      />

      {hasNote ? (
        <span
          className={[
            'pointer-events-none absolute bottom-1.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-amber-500 shadow-sm transition-opacity duration-200',
            labelLight ? 'ring-2 ring-white/70' : 'ring-2 ring-white',
          ].join(' ')}
          aria-hidden
        />
      ) : null}
    </button>
  )
}

function propsAreEqual(prev, next) {
  return (
    prev.date.getTime() === next.date.getTime() &&
    prev.confirmedRole === next.confirmedRole &&
    prev.previewRole === next.previewRole &&
    prev.showAnchorOnly === next.showAnchorOnly &&
    prev.isToday === next.isToday &&
    prev.hasNote === next.hasNote &&
    prev.onDateClick === next.onDateClick &&
    prev.onDateEnter === next.onDateEnter
  )
}

export const DayCell = memo(DayCellInner, propsAreEqual)
