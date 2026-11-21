"use client";

import Image from "next/image";
import useLoopSlider from "@/components/branch/useLoopSlider";
import { CertLogo, CertShineStyle } from "@/components/Certifications";

const AUTOPLAY_MS = 3500;

// Award cards in public/images/branch/why_trust: each picture is a complete card.
const awards = [
  {
    src: "1.png",
    width: 650,
    alt: "Best Newcomer Gold (2024), recognised by The University of Western Australia",
  },
  {
    src: "2.png",
    width: 650,
    alt: "Double Platinum Eagle (2023) and Most Engaged Agency (2024), recognised by La Trobe University",
  },
  {
    src: "3.png",
    width: 650,
    alt: "Outstanding Partnership & Support for Sarawak Campus (2024), recognised by Swinburne University of Technology",
  },
  {
    src: "4.png",
    width: 632,
    alt: "Outstanding Achievement (2024) and Rising Star Agent Award (2022), recognised by Western Sydney University",
  },
];

// Logos in public/images/branch/affiliations, in the order of the design; className sizes each one.
// coin: round badges - they spin like a coin on hover (the same animation as Certifications.js, see CertLogo).
const affiliations = [
  { src: "affiliations_4.png", width: 250, height: 250, alt: "AIRC - American International Recruitment Council certified", className: "h-20 xl:h-[calc(8.1*var(--bu))]", coin: true },
  { src: "affiliations_3.png", width: 650, height: 762, alt: "ICEF accredited agency", className: "h-20 xl:h-[calc(8*var(--bu))]", coin: true },
  { src: "affiliations_5.png", width: 420, height: 650, alt: "QEAC #12934", className: "h-[calc(4.75*var(--bu))] xl:h-[calc(7.75*var(--bu))]" },
  { src: "affiliations_2.png", width: 772, height: 731, alt: "Member of Migration Institute of Australia", className: "h-[calc(4.75*var(--bu))] xl:h-[calc(7.6*var(--bu))]" },
  { src: "affiliations_1.png", width: 281, height: 101, alt: "IEAA - International Education Association of Australia", className: "h-7 xl:h-[calc(2.75*var(--bu))]" },
];

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

// "Why Trust PFEC": award cards in an endless slider, then the accreditation logos.
// Used on the home page and the Ahmedabad branch page. It comes from the branch design, whose sizes are
// written in --bu units: figma-scale (globals.css) gives the section those units, so it looks the same on any page.
export default function WhyTrust() {
  const count = awards.length;
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
    <section id="why-trust" className="figma-scale overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 xl:pb-[calc(5.5*var(--bu))] xl:pt-[calc(5.5*var(--bu))]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase text-[#290098] xl:text-[length:calc(0.77*var(--bu))]">
              Why Trust PFEC
            </p>
            <h2 className="mt-2 text-2xl font-bold leading-tight text-[#1d297c] sm:text-3xl xl:mt-[calc(1.1*var(--bu))] xl:text-[length:calc(1.95*var(--bu))] xl:leading-[calc(2.2*var(--bu))]">
              Recognised by universities.
              <br />
              Accredited by the industry.
            </h2>
          </div>

          <div className="flex flex-col gap-4 sm:items-end xl:gap-[calc(0.9*var(--bu))]">
            <p className="max-w-[calc(26*var(--bu))] text-sm text-neutral-600 sm:text-right xl:text-[length:calc(0.95*var(--bu))] xl:leading-[calc(1.45*var(--bu))]">
              Founded in Melbourne in 2006, now with offices in Australia,
              Bangladesh, India, Sri Lanka and Indonesia.
            </p>
            <div className="flex gap-2">
              <Arrow label="Previous award" onClick={prev} />
              <Arrow label="Next award" onClick={next} flip />
            </div>
          </div>
        </div>

        {/* Clips cards at the left edge of the content; on the right they run off the screen. */}
        <div className="mt-8 [clip-path:inset(-2rem_-100vw_-2rem_0)] xl:mt-[calc(2.7*var(--bu))]">
          <ul
            onTransitionEnd={handleTransitionEnd}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            {...dragProps}
            style={trackStyle}
            className={`flex cursor-grab touch-pan-y select-none gap-4 active:cursor-grabbing [--step:calc(19*var(--bu))] sm:[--step:calc(23*var(--bu))] xl:gap-[calc(2*var(--bu))] xl:[--step:calc(28.4*var(--bu))] ${
              animate ? "transition-transform duration-700 ease-out" : ""
            }`}
          >
            {[...awards, ...awards].map(({ src, width, alt }, i) => (
              <li
                key={i}
                aria-hidden={i >= count}
                className="w-[calc(18*var(--bu))] shrink-0 sm:w-[calc(22*var(--bu))] xl:w-[calc(26.4*var(--bu))]"
              >
                <Image
                  src={`/images/branch/why_trust/${src}`}
                  alt={alt}
                  width={width}
                  height={372}
                  sizes="(min-width: 1280px) 27rem, 22rem"
                  draggable={false}
                  className="aspect-[650/372] w-full object-contain"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Affiliations */}
        <div className="mt-8 flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-white p-6 lg:flex-row lg:items-center lg:justify-between xl:mt-[calc(2.6*var(--bu))] xl:min-h-[calc(11*var(--bu))] xl:rounded-[calc(1.15*var(--bu))] xl:px-[calc(1.9*var(--bu))] xl:py-[calc(1*var(--bu))]">
          <div>
            <h3 className="text-xl font-bold text-neutral-900 xl:text-[length:calc(1.45*var(--bu))]">
              <span className="text-[#290098]">Our Affiliations</span> &amp;
              Recognition
            </h3>
            <p className="mt-1 max-w-[calc(21*var(--bu))] text-sm text-neutral-700 xl:text-[length:calc(0.95*var(--bu))] xl:leading-[calc(1.3*var(--bu))]">
              Prestigious recognitions that speak volumes about the quality of
              our service.
            </p>
          </div>

          {/* The logos pop in one after another, float, a light keeps sweeping across them, and on hover the
              round badges spin like a coin, the others grow and tilt (CertLogo, the same as Certifications.js) */}
          <CertShineStyle />
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-4 xl:gap-x-[calc(1.4*var(--bu))]">
            {affiliations.map(({ src, className, ...logo }, index) => (
              <li key={src}>
                <CertLogo logo={{ ...logo, src: `/images/branch/affiliations/${src}` }} index={index} className={className} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
