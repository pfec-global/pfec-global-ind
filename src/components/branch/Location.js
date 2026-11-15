// TODO: replace with the offices' real opening hours.
const HOURS = ["[Mon–Sat, 00:00–00:00]", "[Sunday: Closed]"];

const iconClass = "h-5 w-5 shrink-0 text-brand xl:h-[calc(1.35*var(--bu))] xl:w-[calc(1.35*var(--bu))]";

const icons = {
  phone: (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 4h3.5l1.5 4.5-2 1.5a11 11 0 0 0 6 6l1.5-2 4.5 1.5V19a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="13.5" r="7.5" />
      <path d="M12 13.5V9.5M10 2.5h4" />
    </svg>
  ),
};

// The office's contact details and map. branch is one entry of src/data/branches.js.
export default function Location({ branch }) {
  // Google Maps embed that needs no API key: it searches for the office and drops a pin on it
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(branch.mapQuery)}&z=16&output=embed`;

  return (
    <section id="location" className="bg-[#f8f8f8]">
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 xl:pb-[calc(3.5*var(--bu))] xl:pt-[calc(1.6*var(--bu))]">
        <div className="grid items-center gap-8 rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:p-8 lg:grid-cols-[1fr_minmax(0,calc(28*var(--bu)))] xl:grid-cols-[1fr_calc(33.9*var(--bu))] xl:rounded-[calc(1.3*var(--bu))] xl:px-[calc(5*var(--bu))] xl:py-[calc(2.9*var(--bu))]">
          <div>
            <p className="text-xs font-bold uppercase text-accent xl:text-[length:calc(0.75*var(--bu))]">
              Visit Us
            </p>
            <h2 className="mt-1 text-2xl font-bold text-brand sm:text-3xl xl:text-[length:calc(1.85*var(--bu))]">
              PFEC {branch.city} office
            </h2>

            <address className="mt-6 space-y-4 text-[15px] not-italic text-neutral-800 xl:mt-[calc(2.2*var(--bu))] xl:space-y-[calc(1.15*var(--bu))] xl:text-[length:calc(1.2*var(--bu))]">
              <div className="flex flex-wrap gap-x-8 gap-y-4 xl:gap-x-[calc(2*var(--bu))]">
                <a href={branch.phoneHref} className="flex items-center gap-3 hover:text-accent">
                  {icons.phone}
                  {branch.phone}
                </a>
                {branch.email && (
                  <a href={`mailto:${branch.email}`} className="flex items-center gap-3 break-all hover:text-accent">
                    {icons.email}
                    {branch.email}
                  </a>
                )}
              </div>
              <p className="flex gap-3">
                <span className="mt-0.5">{icons.pin}</span>
                <span>
                  {branch.addressLines[0]}
                  <br className="hidden sm:block" /> {branch.addressLines[1]}
                </span>
              </p>
              <p className="flex gap-3">
                <span className="mt-0.5">{icons.clock}</span>
                <span>
                  {HOURS[0]}
                  <br />
                  {HOURS[1]}
                </span>
              </p>
            </address>
          </div>

          <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 lg:aspect-auto lg:h-[calc(16*var(--bu))] xl:h-[calc(18.7*var(--bu))]">
            <iframe
              src={mapUrl}
              title={`Map showing the PFEC Global ${branch.city} office`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
