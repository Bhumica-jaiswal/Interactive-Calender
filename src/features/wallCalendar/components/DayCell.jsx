import { memo } from 'react'
import { cx } from '../utils/cx.js'

const TRANSITION_CLASSES =
  'transition-[transform,background-color,color,box-shadow,border-color,ring-color] duration-200 ease-out motion-reduce:transform-none motion-reduce:transition-none'

const HOVER_LIFT_CLASSES =
  'hover:scale-[1.02] hover:-translate-y-[1px] hover:shadow-md active:translate-y-0'

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
            'border-transparent bg-[var(--wc-primary)] text-[var(--wc-on-primary)] shadow-md shadow-zinc-950/25 hover:scale-[1.02] hover:shadow-lg',
          start:
            'border-transparent bg-[var(--wc-primary)] text-[var(--wc-on-primary)] shadow-md shadow-zinc-950/20 hover:scale-[1.02]',
          end: 'border-transparent bg-[var(--wc-primary)] text-[var(--wc-on-primary)] shadow-md shadow-zinc-950/20 hover:scale-[1.02]',
          middle:
            'border-[var(--wc-primary-muted)] bg-[var(--wc-primary-soft)] text-zinc-900 shadow-sm hover:brightness-[0.98]',
        }
      : layer === 'preview'
        ? {
            single:
              'border border-dashed border-[var(--wc-primary-muted)] bg-[var(--wc-primary-muted)] text-zinc-900 shadow-sm ring-1 ring-[var(--wc-primary-ring)] hover:scale-[1.02]',
            start:
              'border border-dashed border-[var(--wc-primary-muted)] bg-[var(--wc-primary-muted)] text-zinc-900 shadow-sm ring-1 ring-[var(--wc-primary-ring)] hover:scale-[1.02]',
            end: 'border border-dashed border-[var(--wc-primary-muted)] bg-[var(--wc-primary-muted)] text-zinc-900 shadow-sm ring-1 ring-[var(--wc-primary-ring)] hover:scale-[1.02]',
            middle:
              'border border-[var(--wc-primary-soft)] bg-[var(--wc-primary-soft)] text-zinc-900 shadow-sm ring-1 ring-[var(--wc-primary-ring)] hover:brightness-[0.98]',
          }
        : layer === 'anchor'
          ? {
              single:
                'border-transparent bg-[var(--wc-primary)] text-[var(--wc-on-primary)] shadow-md shadow-zinc-950/25 hover:scale-[1.02]',
            }
          : null

  const roleKey = layer === 'anchor' ? 'single' : role
  const layerStyleClasses =
    layerClasses && roleKey
      ? layerClasses[roleKey]
      : 'border-zinc-200 bg-white shadow-sm hover:border-zinc-300 hover:bg-zinc-50'

  const todayRing = isToday
    ? isDarkEndpoint
      ? 'ring-2 ring-inset ring-white/40'
      : isPreviewEndpoint
        ? 'ring-2 ring-inset ring-[var(--wc-primary-soft)]'
        : isHighlighted
          ? 'ring-2 ring-inset ring-[var(--wc-primary-ring)]'
          : 'ring-2 ring-inset ring-zinc-400/45'
    : ''

  const baseInteractive = [
    'group relative flex aspect-square w-full min-h-0 min-w-0 flex-col items-start justify-between p-1.5 text-left sm:p-2',
    'touch-manipulation select-none',
    TRANSITION_CLASSES,
    HOVER_LIFT_CLASSES,
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/25 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-[0.98]',
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
      className={cx(baseInteractive, roundedByRole, borderBase, layerStyleClasses, todayRing)}
      aria-label={ariaLabel}
      aria-pressed={isHighlighted}
      onClick={() => onDateClick?.(date)}
      onPointerEnter={() => onDateEnter?.(date)}
    >
      <div className="flex w-full items-center justify-between">
        <span
          className={cx(
            'text-[13px] font-semibold leading-none sm:text-sm',
            TRANSITION_CLASSES,
            labelLight ? 'text-white' : 'text-zinc-900/90 group-hover:text-zinc-900',
          )}
        >
          {label}
        </span>
        <span
          className={cx(
            'inline-flex h-2 w-2 rounded-full opacity-0 transition-opacity duration-200 ease-out motion-reduce:transition-none',
            'group-hover:scale-110 group-hover:opacity-100 motion-reduce:group-hover:scale-100',
            labelLight ? 'bg-white/60' : 'bg-zinc-400',
          )}
        />
      </div>

      <div
        className={cx(
          'mt-1 h-5 w-full rounded-lg sm:mt-2 sm:h-7 sm:rounded-xl',
          TRANSITION_CLASSES,
          isHighlighted ? 'opacity-0' : 'bg-zinc-100/70 opacity-0 group-hover:opacity-100',
        )}
      />

      {hasNote ? (
        <span
          className={cx(
            'pointer-events-none absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-amber-500 shadow-sm transition-opacity duration-200 sm:bottom-1.5',
            labelLight ? 'ring-2 ring-white/70' : 'ring-2 ring-white',
          )}
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
