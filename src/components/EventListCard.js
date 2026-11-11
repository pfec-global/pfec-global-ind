import Image from "next/image";
import Link from "next/link";

const arrow = (
  <svg className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M4 12h16m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// One wide row of the events page: picture on the left, details on the right. Stacks on mobile.
// The picture and the title open the event's details page (/events/<slug>).
// "Register Now" opens the event's registration form (registrationUrl from Strapi) in a new tab,
// or goes to the Contact form further down the page when the event has no form.
export default function EventListCard({ event }) {
  const details = `/events/${event.id}`;
  const external = Boolean(event.registerLink);
  return (
    <article className="group grid overflow-hidden bg-white shadow-sm transition duration-300 hover:shadow-xl md:grid-cols-[2fr_3fr]">
      <Link href={details} tabIndex={-1} aria-hidden="true" className="relative block h-48 overflow-hidden md:h-full md:min-h-52">
        {event.image ? (
          <Image
            src={event.image.src}
            alt={event.image.alt}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          // Placeholder until the event has a banner
          <div className="flex h-full items-center justify-center bg-linear-to-br from-indigo/20 to-indigo/50 text-xs text-white">
            Image
          </div>
        )}
      </Link>

      <div className="flex flex-col justify-center p-5 lg:px-8">
        <span className="w-fit rounded bg-accent/10 px-2 py-1 text-[10px] font-medium text-accent">{event.type}</span>
        <h3 className="mt-2 text-lg font-semibold text-accent lg:text-xl">
          <Link href={details} className="transition hover:text-indigo">
            {event.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-ink/70">{event.description}</p>

        <ul className="mt-3 space-y-2 text-sm font-semibold">
          <li className="flex items-center gap-2.5">
            <svg className="h-4 w-4 shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
            </svg>
            {event.date} {event.year}
          </li>
          {event.location && (
            <li className="flex items-center gap-2.5">
              <svg className="h-4 w-4 shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" strokeLinejoin="round" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              {event.location}
            </li>
          )}
        </ul>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Link
            href={event.registerLink ?? "#contact"}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="group/btn inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/30"
          >
            Register Now
            {arrow}
          </Link>
          <Link
            href={details}
            className="group/btn inline-flex items-center gap-2 rounded-lg border border-accent px-4 py-2 text-sm font-semibold text-accent transition duration-300 hover:bg-accent hover:text-white"
          >
            View Details
            {arrow}
          </Link>
        </div>
      </div>
    </article>
  );
}
