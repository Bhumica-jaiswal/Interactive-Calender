import { formatMonthYearHeading } from '../utils/calendarView.js'

export const HERO_IMAGE_URL =
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2400&q=80'

export function HeroSection({ year, month, imageUrl = HERO_IMAGE_URL }) {
  const title = formatMonthYearHeading(year, month)

  return (
    <header className="relative">
      <div className="relative h-36 w-full min-h-0 sm:h-44 md:h-52 lg:h-60">
        <img
          className="h-full w-full object-cover"
          src={imageUrl}
          alt="Calendar hero"
          loading="lazy"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/50 via-zinc-950/10 to-transparent" />

        <div className="absolute left-4 right-4 top-4 max-w-[min(100%,28rem)] sm:left-6 sm:right-auto sm:top-6 md:left-8 md:top-8 lg:left-10 lg:top-9">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/85 sm:text-xs">
            Wall Calendar
          </p>
          <h1
            className="mt-1 text-xl font-semibold leading-tight tracking-tight text-white sm:text-2xl md:text-3xl"
            aria-live="polite"
          >
            {title}
          </h1>
          <p className="mt-1.5 text-xs leading-snug text-white/80 sm:text-sm">
            Minimal • Range-ready • Notes
          </p>
        </div>
      </div>

      {/* angled bottom edge */}
      <div className="h-6 w-full bg-white [clip-path:polygon(0_0,100%_0,100%_55%,0_100%)] sm:h-7 lg:h-8" />
    </header>
  )
}

