"use client";

import Image from "next/image";
import Link from "next/link";
import useLoopSlider from "./useLoopSlider";

const AUTOPLAY_MS = 3500;


const calendarIcon = (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5 shrink-0 text-accent xl:h-[calc(1.4*var(--bu))] xl:w-[calc(1.4*var(--bu))]"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </svg>
);

function Arrow({ label, onClick, flip }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-brand text-white transition-opacity hover:opacity-80 xl:h-[calc(2.05*var(--bu))] xl:w-[calc(2.05*var(--bu))]"
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-5 w-5 ${flip ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14.5 6l-6 6 6 6" />
      </svg>
    </button>
  );
}

// The upcoming events from Strapi, given by BranchEvents.js: [{ id, title, date, venue, image, href }].
// image is { src, alt } or null (a placeholder is drawn); href is the event's own page.
export default function Events({ events }) {
  const count = events.length;
  // The list is rendered twice so the track can loop without a visible jump.
  const {
    animate,
    trackStyle,
    dragProps,
    next,
    prev,
    handleTransitionEnd,
    setPaused,
  } = useLoopSlider(count, AUTOPLAY_MS);

  return (
    <section id="events" className="overflow-hidden bg-[#f8f8f8]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[19rem_1fr] lg:items-center lg:gap-0 lg:px-8 xl:grid-cols-[25.3rem_1fr] xl:py-[calc(5.4*var(--bu))] xl:pb-[calc(6.5*var(--bu))]">
        <div className="xl:pl-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#d9dcf3] bg-[#f1f2fc] text-brand shadow-[0_2px_8px_rgba(16,6,148,0.08)] xl:h-[calc(3.9*var(--bu))] xl:w-[calc(3.9*var(--bu))] xl:rounded-[calc(0.6*var(--bu))]">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 xl:h-[calc(1.9*var(--bu))] xl:w-[calc(1.9*var(--bu))]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M11 20.5H6a2.5 2.5 0 0 1-2.5-2.5V7.5A2.5 2.5 0 0 1 6 5h12a2.5 2.5 0 0 1 2.5 2.5V11" />
              <path d="M3.5 10h17M8 3v4M16 3v4" />
              <path d="M17 21s-3.5-2.1-3.5-4.3a1.8 1.8 0 0 1 3.5-.6 1.8 1.8 0 0 1 3.5.6C20.5 18.9 17 21 17 21z" />
            </svg>
          </span>

          <h2 className="mt-4 text-3xl font-bold text-[#1d297c] xl:mt-[calc(1.2*var(--bu))] xl:text-[length:calc(2.05*var(--bu))]">
            Upcoming Events
          </h2>
          <p className="mt-4 max-w-[calc(18*var(--bu))] text-sm text-neutral-800 xl:mt-[calc(1.9*var(--bu))] xl:max-w-[calc(17.5*var(--bu))] xl:text-[length:calc(1*var(--bu))] xl:leading-[calc(1.25*var(--bu))]">
            Specifically curated to help study abroad aspirants turn their
            dreams into reality.
          </p>

          <div className="mt-6 flex gap-2 xl:mt-[calc(2.6*var(--bu))]">
            <Arrow label="Previous event" onClick={prev} />
            <Arrow label="Next event" onClick={next} flip />
          </div>
        </div>

        {/* Clips cards at the left edge so they never slide over the text column;
            on the right they run off the edge of the screen. */}
        <div className="min-w-0 [clip-path:inset(-2rem_-100vw_-2rem_0)]">
          <ul
            onTransitionEnd={handleTransitionEnd}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            {...dragProps}
            style={trackStyle}
            className={`flex cursor-grab touch-pan-y select-none gap-4 active:cursor-grabbing [--step:calc(18*var(--bu))] sm:[--step:calc(21*var(--bu))] xl:gap-[calc(1.45*var(--bu))] xl:[--step:calc(25.05*var(--bu))] ${
              animate ? "transition-transform duration-700 ease-out" : ""
            }`}
          >
            {[...events, ...events].map(({ id, title, date, venue, image, href }, i) => (
              <li
                key={`${id}-${i}`}
                aria-hidden={i >= count}
                className="group w-[calc(17*var(--bu))] shrink-0 overflow-hidden rounded-xl bg-white shadow-[0_4px_18px_rgba(0,0,0,0.07)] sm:w-[calc(20*var(--bu))] xl:w-[calc(23.6*var(--bu))]"
              >
                <Link
                  href={href}
                  draggable={false}
                  tabIndex={i >= count ? -1 : undefined}
                  className="block"
                >
                <div className="relative h-40 overflow-hidden xl:h-[calc(11.7*var(--bu))]">
                  {image ? (
                    <Image
                      src={image.src}
                      alt={image.alt || title}
                      fill
                      sizes="(min-width: 1280px) 24rem, 20rem"
                      draggable={false}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  ) : (
                    // Placeholder until the event has a photo
                    <div className="flex h-full items-center justify-center bg-linear-to-br from-[#011642] to-[#0338A8] text-white/60 transition-transform duration-700 ease-out group-hover:scale-110">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-12 w-12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        aria-hidden="true"
                      >
                        <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
                        <path d="M3.5 10h17M8 3v4M16 3v4" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="px-5 pb-6 pt-4 xl:px-[calc(1.4*var(--bu))] xl:pb-[calc(1.6*var(--bu))] xl:pt-[calc(0.9*var(--bu))]">
                  <h3 className="line-clamp-2 min-h-[2lh] text-lg font-bold leading-snug text-accent xl:text-[length:calc(1.5*var(--bu))] xl:leading-[calc(1.8*var(--bu))]">
                    {title}
                  </h3>
                  <p className="mt-4 flex items-center gap-2.5 text-sm text-neutral-800 xl:mt-[calc(1.3*var(--bu))] xl:text-[length:calc(1*var(--bu))]">
                    {calendarIcon}
                    {date}
                  </p>
                  <p className="mt-3 flex items-center gap-2.5 text-sm text-neutral-800 xl:mt-[calc(1.2*var(--bu))] xl:text-[length:calc(1*var(--bu))]">
                    {calendarIcon}
                    {venue}
                  </p>
                </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
