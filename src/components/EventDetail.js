import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { fadeUp, fadeUpOnLoad, zoomIn } from "@/lib/motion";
import { getHeadings } from "@/lib/markdown";
import BlogContent from "@/components/BlogContent";
import StudyAbroadCta from "@/components/StudyAbroadCta";

// Event details page: hero (title, date, place, banner, "Register Now"), then the description and FAQs
// with a sticky "Event Details" card beside them. event comes from getEventDetail (src/lib/eventDetail.js).

const arrow = (
  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M4 12h16m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const icons = {
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="m16 10 5-3v10l-5-3" strokeLinejoin="round" />
    </>
  ),
  tag: (
    <>
      <path d="M3 12V4h8l10 10-8 8L3 12z" strokeLinejoin="round" />
      <circle cx="7.5" cy="7.5" r="1.5" />
    </>
  ),
};

function Icon({ name, className = "h-5 w-5" }) {
  return (
    <svg className={`shrink-0 text-accent ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

// "Register Now": the event's registration form in a new tab. Without a form link (or once the event is over)
// it opens the consultation popup instead (data-consultation, see ConsultationModal).
function RegisterButton({ event, className = "" }) {
  const style = `group inline-flex items-center justify-center gap-3 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/35 ${className}`;
  if (event.registerLink && !event.isPast) {
    return (
      <a href={event.registerLink} target="_blank" rel="noopener noreferrer" className={style}>
        Register Now
        {arrow}
      </a>
    );
  }
  return (
    <Link href="#contact" data-consultation className={style}>
      {event.isPast ? "Book a FREE Consultation" : "Register Now"}
      {arrow}
    </Link>
  );
}

function Hero({ event }) {
  const place = event.online ? "Online" : [event.venue, event.city].filter(Boolean).join(", ");
  return (
    <section className="relative overflow-hidden bg-[#e3f3fb]">
      {/* Slanted stripes in the bottom right corner, like the other details pages */}
      <div aria-hidden="true" className="absolute -bottom-2 right-0 flex h-1/3 -skew-x-[20deg] gap-2 sm:gap-3 lg:right-[4%] lg:h-2/5">
        <div className="w-10 bg-[#6a62c4] sm:w-16 lg:w-20" />
        <div className="w-10 bg-[#aeb1df] sm:w-16 lg:w-20" />
        <div className="w-10 bg-[#cdd6ee] sm:w-16 lg:w-20" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:px-8 lg:py-16">
        <motion.div {...fadeUpOnLoad()}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs text-ink/60">
            <Link href="/" className="transition hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/events" className="transition hover:text-accent">Events</Link>
            <span className="mx-2">/</span>
            <span className="text-ink/80">{event.title}</span>
          </nav>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="rounded bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">{event.type}</span>
            {event.countries.map((country) =>
              country.href ? (
                <Link key={country.name} href={country.href} className="rounded bg-indigo/10 px-2.5 py-1 text-xs font-medium text-indigo transition hover:bg-indigo hover:text-white">
                  {country.name}
                </Link>
              ) : (
                <span key={country.name} className="rounded bg-indigo/10 px-2.5 py-1 text-xs font-medium text-indigo">{country.name}</span>
              ),
            )}
            {event.isPast && <span className="rounded bg-ink/10 px-2.5 py-1 text-xs font-medium text-ink/70">This event has ended</span>}
          </div>

          <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-indigo sm:text-4xl lg:text-[44px]">{event.title}</h1>
          {event.shortDescription && <p className="mt-4 max-w-xl text-sm leading-7 text-ink/75 sm:text-base">{event.shortDescription}</p>}

          <ul className="mt-6 space-y-3 text-sm font-semibold text-ink sm:text-base">
            {event.date && (
              <li className="flex items-center gap-3"><Icon name="calendar" />{event.date}</li>
            )}
            {event.time && (
              <li className="flex items-center gap-3"><Icon name="clock" />{event.time} (IST)</li>
            )}
            {place && (
              <li className="flex items-center gap-3"><Icon name={event.online ? "video" : "pin"} />{place}</li>
            )}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <RegisterButton event={event} />
            {event.mapUrl && !event.online && (
              <a
                href={event.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-indigo/30 bg-white/60 px-5 py-3 text-sm font-semibold text-indigo transition duration-300 hover:border-indigo hover:bg-indigo hover:text-white"
              >
                <Icon name="pin" className="h-4 w-4 text-current" />
                Get Directions
              </a>
            )}
          </div>
        </motion.div>

        {/* Banner with the date badge on its corner */}
        <motion.div {...zoomIn(0.15)} className="relative">
          <div className="overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_rgba(16,0,79,0.18)]">
            {event.image ? (
              <Image
                src={event.image.src}
                alt={event.image.alt}
                width={event.image.width ?? 1200}
                height={event.image.height ?? 630}
                sizes="(min-width: 1024px) 600px, 100vw"
                priority
                className="h-auto w-full"
              />
            ) : (
              <div className="flex aspect-[1.9] items-center justify-center bg-linear-to-br from-indigo/20 to-indigo/50 text-sm text-white">
                {event.title}
              </div>
            )}
          </div>
          {event.day && (
            <div className="absolute -left-3 -top-4 bg-accent px-4 py-2 text-center text-white shadow-[4px_4px_0_0_var(--color-indigo)] sm:-left-5">
              <p className="text-2xl font-bold leading-none">{event.day}</p>
              <p className="mt-1 text-xs font-semibold uppercase">{event.month} {event.year}</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// One row of the "Event Details" card
function DetailRow({ icon, label, children }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10">
        <Icon name={icon} className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-ink/50">{label}</p>
        <div className="mt-0.5 break-words text-sm font-semibold text-ink">{children}</div>
      </div>
    </li>
  );
}

function DetailsCard({ event }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
      <h2 className="text-lg font-bold text-indigo">Event Details</h2>
      <ul className="mt-5 space-y-4">
        {event.date && <DetailRow icon="calendar" label="Date">{event.date}</DetailRow>}
        {event.time && <DetailRow icon="clock" label="Time">{event.time} (IST)</DetailRow>}
        <DetailRow icon="tag" label="Event Type">{event.type}</DetailRow>
        {event.online ? (
          <DetailRow icon="video" label="Where">
            Online
            {event.onlineLink && !event.isPast && (
              <a href={event.onlineLink} target="_blank" rel="noopener noreferrer" className="mt-1 block font-medium text-accent underline">
                Join link
              </a>
            )}
          </DetailRow>
        ) : (
          (event.venue || event.address) && (
            <DetailRow icon="pin" label="Venue">
              {event.venue}
              {event.address && <span className="mt-1 block font-normal text-ink/70">{event.address}</span>}
              {event.mapUrl && (
                <a href={event.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block font-medium text-accent underline">
                  View on Google Maps
                </a>
              )}
            </DetailRow>
          )
        )}
      </ul>
      <RegisterButton event={event} className="mt-6 w-full" />
    </div>
  );
}

function Body({ event }) {
  const headings = getHeadings(event.content);
  return (
    <section className="bg-[#f9f9f9] py-12 lg:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_340px] lg:gap-12 lg:px-8">
        <motion.div {...fadeUp()} className="min-w-0">
          <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
            About this <span className="text-indigo">Event</span>
          </h2>
          <div className="mt-5 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            {event.content ? (
              <BlogContent markdown={event.content} headings={headings} />
            ) : (
              <p className="text-sm leading-7 text-ink/75 sm:text-base">{event.shortDescription}</p>
            )}
          </div>
        </motion.div>

        <aside className="min-w-0">
          <div className="space-y-6 lg:sticky lg:top-28">
            <motion.div {...fadeUp(0.1)}>
              <DetailsCard event={event} />
            </motion.div>
            <motion.div {...fadeUp(0.2)}>
              <StudyAbroadCta />
            </motion.div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default function EventDetail({ event }) {
  return (
    <>
      <Hero event={event} />
      <Body event={event} />
    </>
  );
}
