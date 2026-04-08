import { formatMonthYearHeading } from '../utils/calendarView.js'

const HERO_IMAGE_URL =
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2400&q=80'

export function HeroSection({ year, month }) {
  const title = formatMonthYearHeading(year, month)

  return (
    <header className="relative">
      <div className="relative h-40 w-full sm:h-52 lg:h-60">
        <img
          className="h-full w-full object-cover"
          src={HERO_IMAGE_URL}
          alt="Calendar hero"
          loading="lazy"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/50 via-zinc-950/10 to-transparent" />

        <div className="absolute left-5 top-5 sm:left-7 sm:top-7 lg:left-10 lg:top-9">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/85">
            Wall Calendar
          </p>
          <h1
            className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
            aria-live="polite"
          >
            {title}
          </h1>
          <p className="mt-1 text-sm text-white/80">Minimal • Range-ready • Notes</p>
        </div>
      </div>

      {/* angled bottom edge */}
      <div className="h-6 w-full bg-white [clip-path:polygon(0_0,100%_0,100%_55%,0_100%)] sm:h-7 lg:h-8" />
    </header>
  )
}

