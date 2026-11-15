"use client";

import Image from "next/image";
import useLoopSlider from "./useLoopSlider";

const AUTOPLAY_MS = 3500;

// Photos are in public/images/branch/team, named after the person.
const team = [
  { name: "Kapil Kamar", role: ["Principal Migration Agent", "MARN 241861"] },
  { name: "Tushar Chopra", role: ["Registered Migration Agent", "MARN 2418420"] },
  { name: "Nic Soltani", role: ["Senior Registered Migration", "Agent - MARN 1387104"] },
  { name: "Apurva Golani", role: ["Registered Migration Agent", "MARN 2518793"] },
];

function Arrow({ label, onClick, flip }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white text-accent shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-transform hover:scale-105 xl:h-[calc(3*var(--bu))] xl:w-[calc(3*var(--bu))]"
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-6 w-6 ${flip ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14.5 5l-7 7 7 7" />
      </svg>
    </button>
  );
}

// The counsellors slider. branch is one entry of src/data/branches.js.
export default function Team({ branch }) {
  const count = team.length;
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
    <section id="team" className="overflow-hidden bg-accent text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:px-8 xl:grid-cols-[25rem_1fr] xl:gap-0 xl:py-[calc(5*var(--bu))]">
        <div>
          <p className="text-xs font-bold uppercase xl:text-[length:calc(0.8*var(--bu))]">
            Meet Our Team
          </p>
          <h2 className="mt-1 text-3xl font-bold leading-tight xl:text-[length:calc(1.85*var(--bu))] xl:leading-[calc(2.3*var(--bu))]">
            Your counsellors at
            <br />
            PFEC {branch.city}
          </h2>
          <p className="mt-2 max-w-[calc(24.5*var(--bu))] text-sm text-white/95 xl:mt-[calc(0.5*var(--bu))] xl:text-[length:calc(1*var(--bu))] xl:leading-[calc(1.25*var(--bu))]">
            Talk to a real person who knows your destination – in English, Hindi
            or {branch.language}.
          </p>

          <a
            href="#consultation"
            className="mt-7 inline-flex items-center gap-3 rounded-lg bg-[#290098] px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 xl:mt-[calc(3.8*var(--bu))] xl:px-[calc(1*var(--bu))] xl:py-[calc(0.95*var(--bu))] xl:text-[length:calc(1*var(--bu))]"
          >
            Book FREE Appointment
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>

          <div className="mt-7 flex gap-4 xl:mt-[calc(3.9*var(--bu))] xl:gap-[calc(1.5*var(--bu))]">
            <Arrow label="Previous counsellor" onClick={prev} />
            <Arrow label="Next counsellor" onClick={next} flip />
          </div>
        </div>

        <div className="min-w-0 overflow-hidden">
          <ul
            onTransitionEnd={handleTransitionEnd}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            {...dragProps}
            style={trackStyle}
            className={`flex cursor-grab touch-pan-y select-none gap-4 active:cursor-grabbing [--step:calc(16*var(--bu))] sm:[--step:calc(18*var(--bu))] xl:gap-[calc(1.55*var(--bu))] xl:[--step:calc(18.85*var(--bu))] ${
              animate ? "transition-transform duration-700 ease-out" : ""
            }`}
          >
            {[...team, ...team].map(({ name, role }, i) => (
              <li
                key={i}
                aria-hidden={i >= count}
                className="group w-[calc(15*var(--bu))] shrink-0 overflow-hidden rounded-lg bg-white text-neutral-900 sm:w-[calc(17*var(--bu))] xl:w-[calc(17.3*var(--bu))] xl:rounded-[calc(0.6*var(--bu))]"
              >
                <div className="relative h-[calc(18*var(--bu))] overflow-hidden bg-neutral-100 xl:h-[calc(19.9*var(--bu))]">
                  <Image
                    src={`/images/branch/team/${name}.png`}
                    alt={name}
                    fill
                    sizes="(min-width: 1280px) 18rem, 17rem"
                    draggable={false}
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="px-3 pb-3 pt-2 xl:px-[calc(0.8*var(--bu))] xl:pb-[calc(0.75*var(--bu))] xl:pt-[calc(0.45*var(--bu))]">
                  <p className="text-lg font-bold text-accent xl:text-[length:calc(1.35*var(--bu))]">
                    {name}
                  </p>
                  <div className="mt-1 h-px w-32 bg-accent/70 xl:w-[calc(9.5*var(--bu))]" />
                  <p className="mt-2 text-sm leading-snug xl:mt-[calc(0.6*var(--bu))] xl:text-[length:calc(1*var(--bu))] xl:leading-[calc(1.25*var(--bu))]">
                    {role[0]}
                    <br />
                    {role[1]}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
