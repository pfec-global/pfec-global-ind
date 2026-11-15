"use client";

import { useState } from "react";

// Outline icons (24×24) for the service cards.
const icons = {
  profile: (
    <path d="M4 6l1.5 1.5L8 5M4 12l1.5 1.5L8 11M4.5 17.5l3 3M7.5 17.5l-3 3M11 6.5h9M11 12.5h9M11 19h9" />
  ),
  university: <path d="M3 21h18M5 21V10M9.5 21V10M14.5 21V10M19 21V10M2 10h20L12 3z" />,
  application: (
    <>
      <path d="M12 7v14M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
      <path d="M5 8h4M5 12h4M15 8h4M15 12h4" />
    </>
  ),
  scholarship: (
    <>
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <rect x="3" y="7" width="18" height="14" rx="3" />
      <path d="M14 11.5c-.4-.6-1.1-1-2-1-1.1 0-2 .6-2 1.5s.9 1.3 2 1.5 2 .6 2 1.5-.9 1.5-2 1.5c-.9 0-1.6-.4-2-1M12 9.5v1M12 16.5v1" />
    </>
  ),
  visa: (
    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
  ),
  departure: (
    <path d="M11 17l2 2a1 1 0 1 0 3-3M14 14l2.5 2.5a1 1 0 1 0 3-3l-3.9-3.9a3 3 0 0 0-4.2 0l-.9.9a1 1 0 1 1-3-3l2.8-2.8a5.8 5.8 0 0 1 7.1-.9l.5.3a2 2 0 0 0 1.4.3L21 4M21 3l1 11h-2M3 3L2 14l6.5 6.5a1 1 0 1 0 3-3M3 4h8" />
  ),
};

// Each title is split into its two lines, as in the design.
const services = [
  { title: ["Profile Review", "& Counselling"], icon: "profile" },
  { title: ["University &", "Course Selection"], icon: "university" },
  { title: ["Application", "Assistance"], icon: "application" },
  { title: ["Scholarship", "Guidance"], icon: "scholarship" },
  { title: ["Visa", "Assistance"], icon: "visa" },
  { title: ["Pre-Departure", "Support"], icon: "departure" },
];

export default function Services() {
  // The highlighted card follows the mouse (or keyboard focus); the first one is highlighted by default.
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="bg-[#290098] text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:px-8 xl:grid-cols-[calc(27*var(--bu))_1fr] xl:gap-8 xl:py-[calc(6*var(--bu))]">
        <div>
          <p className="text-xs font-bold uppercase xl:text-[length:calc(0.77*var(--bu))]">
            Our Services
          </p>
          <h2 className="mt-2 max-w-[calc(22*var(--bu))] text-3xl font-bold leading-tight xl:mt-[calc(0.6*var(--bu))] xl:text-[length:calc(1.95*var(--bu))] xl:leading-[calc(2.25*var(--bu))]">
            Everything you need to Study Abroad, in One Place.
          </h2>
          <hr className="mt-5 w-40 border-white/70 xl:mt-[calc(1.45*var(--bu))] xl:w-[calc(14.8*var(--bu))]" />
          <p className="mt-5 max-w-[calc(27*var(--bu))] text-sm leading-relaxed text-white/85 xl:mt-[calc(1.45*var(--bu))] xl:text-[length:calc(1*var(--bu))] xl:leading-[calc(1.55*var(--bu))]">
            From your first conversation to your departure, get expert support
            across your study abroad journey.
          </p>
        </div>

        <ul
          onMouseLeave={() => setActive(0)}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-[calc(1.55*var(--bu))] xl:gap-y-[calc(1.6*var(--bu))]"
        >
          {services.map(({ title, icon }, i) => {
            const on = active === i;
            return (
              <li key={icon}>
                <a
                  href="#consultation"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`flex h-full items-center gap-5 rounded-xl px-5 py-5 transition duration-300 xl:min-h-[calc(8.25*var(--bu))] xl:gap-[calc(2.2*var(--bu))] xl:rounded-[calc(0.95*var(--bu))] xl:px-[calc(1.5*var(--bu))] ${
                    on
                      ? "bg-accent text-white shadow-[0_8px_20px_rgba(0,0,0,0.3)]"
                      : "bg-white text-neutral-900"
                  }`}
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-[#290098] transition-colors duration-300 xl:h-[calc(3.25*var(--bu))] xl:w-[calc(3.25*var(--bu))] ${
                      on ? "bg-white/90" : "bg-neutral-100"
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-7 w-7 xl:h-[calc(1.9*var(--bu))] xl:w-[calc(1.9*var(--bu))]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {icons[icon]}
                    </svg>
                  </span>
                  <span>
                    <span className="block text-lg font-bold leading-snug xl:text-[length:calc(1.45*var(--bu))] xl:leading-[calc(1.75*var(--bu))]">
                      {title[0]}
                      <br />
                      {title[1]}
                    </span>
                    <span
                      className={`mt-1.5 block text-sm transition-colors duration-300 xl:mt-[calc(0.55*var(--bu))] xl:text-[length:calc(0.9*var(--bu))] ${
                        on ? "text-white/80" : "text-neutral-500"
                      }`}
                    >
                      Get Started &gt;
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
