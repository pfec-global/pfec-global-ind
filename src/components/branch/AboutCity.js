// Outline icons (24×24) for the course chips.
const icons = {
  stem: (
    <>
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </>
  ),
  code: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 8h18M10 12l-2 2 2 2M14 12l2 2-2 2" />
    </>
  ),
  plane: (
    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
  ),
  health: (
    <>
      <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z" />
      <path d="M3.2 12h6.3l.5-1 2 4.5 2-7 1.5 3.5h5.3" />
    </>
  ),
  law: (
    <>
      <path d="M16 16l3-8 3 8c-.9.7-1.9 1-3 1s-2.1-.3-3-1zM2 16l3-8 3 8c-.9.7-1.9 1-3 1s-2.1-.3-3-1z" />
      <path d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </>
  ),
  chef: (
    <>
      <path d="M17 21a1 1 0 0 0 1-1v-5.4c0-.4.3-.8.7-1a4 4 0 0 0-2.1-7.6 5 5 0 0 0-9.2 0 4 4 0 0 0-2.1 7.6c.4.2.7.6.7 1V20a1 1 0 0 0 1 1z" />
      <path d="M6 17h12" />
    </>
  ),
  engineering: (
    <>
      <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5M14 6a6 6 0 0 1 6 6v3M4 15v-3a6 6 0 0 1 6-6" />
      <rect x="2" y="15" width="20" height="3" rx="1" />
    </>
  ),
  business: (
    <>
      <path d="M2 3h20M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3M7 21l5-5 5 5" />
      <path d="M7 11l3-3 2 2 4-4" />
    </>
  ),
  it: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  environment: (
    <>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z" />
      <path d="M2 21c0-3 1.9-5.4 5.1-6 2.4-.5 4.9-2 5.9-3" />
    </>
  ),
  tourism: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z" />
    </>
  ),
  architecture: (
    <path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M4 18h16M12 2l8 5H4z" />
  ),
};

// Each inner array is one row of chips on desktop; on smaller screens they all wrap together.
const courseRows = [
  [
    { label: "STEM Courses", icon: "stem" },
    { label: "Computer Science & IT", icon: "code" },
  ],
  [
    { label: "Commercial Pilot", icon: "plane" },
    { label: "Public Health", icon: "health" },
    { label: "Juris Doctor", icon: "law" },
  ],
  [
    { label: "Culinary Arts", icon: "chef" },
    { label: "Engineering", icon: "engineering" },
    { label: "Business and Management", icon: "business" },
  ],
  [
    { label: "Information Technology", icon: "it" },
    { label: "Environmental Sciences", icon: "environment" },
  ],
  [
    { label: "Tourism and Hospitality", icon: "tourism" },
    { label: "Architecture & Construction", icon: "architecture" },
  ],
];

// Why study abroad from this city, and the course chips. branch is one entry of src/data/branches.js.
export default function AboutCity({ branch }) {
  return (
    <section id="about" className="bg-[#f8f8f8]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 xl:py-[calc(3.5*var(--bu))]">
        {/* Above the text and the course chips; two lines from tablets up */}
        <h2 className="text-2xl font-bold leading-tight text-[#1d297c] sm:text-3xl xl:text-[length:calc(1.8*var(--bu))] xl:leading-[calc(2.2*var(--bu))]">
          Study abroad consultants in {branch.city}{" "}
          <br className="hidden sm:block" />
          for {branch.region} students
        </h2>

        <div className="grid items-center gap-10 xl:grid-cols-[1fr_auto] xl:gap-16">
          <div className="xl:max-w-[calc(43*var(--bu))]">
            <div className="mt-3 space-y-4 text-[16px] leading-relaxed text-neutral-800 xl:mt-[calc(0.6*var(--bu))] xl:space-y-[calc(1.25*var(--bu))]">
              {branch.about.map((text) => (
                <p key={text.slice(0, 20)}>{text}</p>
              ))}
            </div>

            <a
              href="#"
              className="mt-6 inline-flex items-center gap-3 rounded-lg bg-accent px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 xl:mt-[calc(2.1*var(--bu))] xl:px-[calc(1*var(--bu))] xl:py-[calc(0.95*var(--bu))] xl:text-[length:calc(1*var(--bu))]"
            >
              Browse Top Courses
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          {/* Course chips: rows line up on the right on desktop */}
          <ul className="flex flex-wrap gap-3 xl:flex-col xl:items-end xl:gap-[calc(0.95*var(--bu))]">
            {courseRows.map((row) => (
              <li key={row[0].label} className="contents xl:flex xl:gap-[calc(0.85*var(--bu))]">
                {row.map(({ label, icon }) => (
                  <a
                    key={label}
                    href="#"
                    className="flex items-center gap-2.5 rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-800 shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-colors hover:border-accent hover:text-accent xl:gap-[calc(0.9*var(--bu))] xl:rounded-[calc(0.55*var(--bu))] xl:px-[calc(1*var(--bu))] xl:py-[calc(0.85*var(--bu))] xl:text-[length:calc(1*var(--bu))]"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-accent xl:h-[calc(1.45*var(--bu))] xl:w-[calc(1.45*var(--bu))]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {icons[icon]}
                    </svg>
                    {label}
                  </a>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
