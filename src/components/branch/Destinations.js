"use client";

import Image from "next/image";
import useLoopSlider from "./useLoopSlider";

const AUTOPLAY_MS = 3000;
// Up to this many countries fit side by side on a laptop: they are shown once, without the endless loop
const MAX_WITHOUT_LOOP = 5;

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

// items: the countries from Strapi, [{ name, href, link, image, flag }] - image is { src, alt } or null,
// flag a picture path or undefined.
export default function Destinations({ items }) {
  const destinations = items;
  const count = destinations.length;
  const loop = count > MAX_WITHOUT_LOOP;
  // The list is rendered twice so the track can loop without a visible jump.
  const {
    animate,
    trackStyle,
    dragProps,
    next,
    prev,
    handleTransitionEnd,
    setPaused,
  } = useLoopSlider(count, loop ? AUTOPLAY_MS : 0);
  // The endless loop draws the list twice; a short list is drawn once and scrolls by swipe on phones
  const shown = loop ? [...destinations, ...destinations] : destinations;

  return (
    <section id="destinations" className="overflow-hidden bg-[#f8f8f8]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 xl:pb-[calc(4.3*var(--bu))] xl:pt-[calc(3.5*var(--bu))]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase text-brand xl:text-[length:calc(0.8*var(--bu))]">
              Countries
            </p>
            <h2 className="mt-2 text-2xl font-bold leading-tight text-[#1d297c] sm:text-3xl xl:mt-[calc(1.1*var(--bu))] xl:text-[length:calc(1.95*var(--bu))] xl:leading-[calc(2.25*var(--bu))]">
              Explore &amp; Apply to {count}
              <br />
              Global Study Destinations
            </h2>
          </div>

          <div className="flex flex-col gap-4 sm:items-end xl:gap-[calc(0.9*var(--bu))]">
            <p className="max-w-[calc(24*var(--bu))] text-sm text-neutral-600 sm:text-right xl:text-[length:calc(1*var(--bu))] xl:leading-[calc(1.45*var(--bu))]">
              Pick a country to see universities, courses and visa steps, or
              let a counsellor help you compare.
            </p>
            {loop && (
              <div className="flex gap-2">
                <Arrow label="Previous destination" onClick={prev} />
                <Arrow label="Next destination" onClick={next} flip />
              </div>
            )}
          </div>
        </div>

        {/* Clips cards at the left edge of the content; on the right they run off the screen. */}
        <div className="mt-8 [clip-path:inset(-2rem_-100vw_-2rem_0)] xl:mt-[calc(2.4*var(--bu))]">
          <ul
            {...(loop
              ? {
                  onTransitionEnd: handleTransitionEnd,
                  onMouseEnter: () => setPaused(true),
                  onMouseLeave: () => setPaused(false),
                  ...dragProps,
                  style: trackStyle,
                }
              : {})}
            className={`flex gap-4 xl:gap-[calc(1.3*var(--bu))] ${
              loop
                ? `cursor-grab touch-pan-y select-none active:cursor-grabbing [--step:calc(16*var(--bu))] sm:[--step:calc(18*var(--bu))] xl:[--step:calc(18.7*var(--bu))] ${
                    animate ? "transition-transform duration-700 ease-out" : ""
                  }`
                : "snap-x overflow-x-auto pb-2 [scrollbar-width:none]"
            }`}
          >
            {shown.map(
              ({ name, href, link, image, flag }, i) => (
                <li key={i} aria-hidden={i >= count || undefined} className="shrink-0 snap-start">
                  <a
                    href={href}
                    draggable={false}
                    tabIndex={i >= count ? -1 : undefined}
                    className="group relative block h-[calc(20*var(--bu))] bg-linear-to-br from-[#011642] to-[#0338A8] w-[calc(15*var(--bu))] overflow-hidden rounded-2xl sm:w-[calc(17*var(--bu))] xl:h-[calc(21.6*var(--bu))] xl:w-[calc(17.4*var(--bu))] xl:rounded-[calc(1.15*var(--bu))]"
                  >
                    {image && (
                      <Image
                        src={image.src}
                        alt=""
                        fill
                        sizes="(min-width: 1280px) 18rem, 17rem"
                        draggable={false}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    )}
                    {/* Dark fade at the bottom so the name stays readable */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-b from-transparent via-[#1b1446]/75 to-[#120d3d]" />

                    <div className="absolute inset-x-0 bottom-0 px-[calc(1.15*var(--bu))] pb-5 text-white xl:pb-[calc(1.4*var(--bu))]">
                      <p className="flex items-center gap-2 whitespace-nowrap text-lg font-bold sm:text-xl xl:gap-[calc(0.55*var(--bu))] xl:text-[length:calc(1.35*var(--bu))]">
                        {flag && (
                          <Image
                            src={flag}
                            alt=""
                            width={85}
                            height={85}
                            draggable={false}
                            className="h-6 w-6 shrink-0 rounded-full ring-2 ring-white/80 xl:h-[calc(1.6*var(--bu))] xl:w-[calc(1.6*var(--bu))]"
                          />
                        )}
                        {name}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-white/90 xl:mt-[calc(0.3*var(--bu))] xl:text-[length:calc(0.8*var(--bu))]">
                        {link}
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </p>
                    </div>
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
