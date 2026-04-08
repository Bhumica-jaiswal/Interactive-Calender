import { memo } from 'react'
import { cx } from '../utils/cx.js'
import { formatRangeLabel } from '../utils/rangeNotes.js'

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
  hasWorkMemory,
  hasLifeMemory,
  tooltipMemory,
  memoryHighlightType,
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

  const confirmedMemoryClasses =
    memoryHighlightType === 'work'
      ? {
          single:
            'border-transparent bg-blue-500 text-white shadow-md shadow-blue-500/20 hover:scale-[1.02]',
          start:
            'border-transparent bg-blue-500 text-white shadow-md shadow-blue-500/20 hover:scale-[1.02]',
          end: 'border-transparent bg-blue-500 text-white shadow-md shadow-blue-500/20 hover:scale-[1.02]',
          middle: 'border-blue-200 bg-blue-100 text-blue-900 shadow-sm hover:bg-blue-100/95',
        }
      : memoryHighlightType === 'life'
        ? {
            single:
              'border-transparent bg-green-500 text-white shadow-md shadow-green-500/20 hover:scale-[1.02]',
            start:
              'border-transparent bg-green-500 text-white shadow-md shadow-green-500/20 hover:scale-[1.02]',
            end: 'border-transparent bg-green-500 text-white shadow-md shadow-green-500/20 hover:scale-[1.02]',
            middle:
              'border-green-200 bg-green-100 text-green-900 shadow-sm hover:bg-green-100/95',
          }
        : null

  const confirmedDynamicClasses = {
    single:
      'border-transparent bg-[var(--wc-primary)] text-[var(--wc-on-primary)] shadow-md shadow-zinc-950/25 hover:scale-[1.02] hover:shadow-lg',
    start:
      'border-transparent bg-[var(--wc-primary)] text-[var(--wc-on-primary)] shadow-md shadow-zinc-950/20 hover:scale-[1.02]',
    end: 'border-transparent bg-[var(--wc-primary)] text-[var(--wc-on-primary)] shadow-md shadow-zinc-950/20 hover:scale-[1.02]',
    middle:
      'border-[var(--wc-primary-muted)] bg-[var(--wc-primary-soft)] text-zinc-900 shadow-sm hover:brightness-[0.98]',
  }

  const layerClasses =
    layer === 'confirmed'
      ? confirmedMemoryClasses ?? confirmedDynamicClasses
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
    ? memoryHighlightType
      ? isDarkEndpoint
        ? memoryHighlightType === 'work'
          ? 'ring-2 ring-inset ring-blue-200/60'
          : 'ring-2 ring-inset ring-green-200/60'
        : memoryHighlightType === 'work'
          ? 'ring-2 ring-inset ring-blue-300/35'
          : 'ring-2 ring-inset ring-green-300/35'
      : isDarkEndpoint
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
  const ariaLabel = ariaLabelBase

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

      {(hasWorkMemory || hasLifeMemory) ? (
        <div className="pointer-events-none absolute bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-1.5 sm:bottom-1.5">
          {hasWorkMemory ? (
            <span
              className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-sm"
              aria-hidden
            />
          ) : null}
          {hasLifeMemory ? (
            <span
              className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-sm"
              aria-hidden
            />
          ) : null}
        </div>
      ) : null}

      {tooltipMemory ? (
        <div
          className={cx(
            'pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-[11rem] -translate-x-1/2 rounded-xl bg-zinc-950/95 px-2.5 py-2 text-left text-[11px] text-white shadow-lg shadow-black/20',
            'opacity-0 translate-y-1 transition-all duration-200 ease-out',
            'group-hover:opacity-100 group-hover:translate-y-0 motion-reduce:transition-none motion-reduce:transform-none',
          )}
          aria-hidden
        >
          <div className="truncate font-medium text-white">{tooltipMemory.title}</div>
          <div className="mt-1 text-[10px] leading-snug text-zinc-200">
            {formatRangeLabel(tooltipMemory.startDate, tooltipMemory.endDate)}
          </div>
          {tooltipMemory.details ? (
            <div className="mt-1 line-clamp-2 text-[10px] leading-snug text-zinc-300">
              {tooltipMemory.details}
            </div>
          ) : null}
        </div>
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
    prev.hasWorkMemory === next.hasWorkMemory &&
    prev.hasLifeMemory === next.hasLifeMemory &&
    prev.memoryHighlightType === next.memoryHighlightType &&
    (prev.tooltipMemory?.id ?? null) === (next.tooltipMemory?.id ?? null) &&
    prev.onDateClick === next.onDateClick &&
    prev.onDateEnter === next.onDateEnter
  )
}

export const DayCell = memo(DayCellInner, propsAreEqual)
