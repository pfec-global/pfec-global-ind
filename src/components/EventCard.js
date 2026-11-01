import Image from "next/image";
import Link from "next/link";

// One event card of the home page slider.
export default function EventCard({ event }) {
  return (
    <article
      className="group snap-start overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
    >
      <div className="relative h-32 overflow-hidden">
        {event.image ? (
          <Image
            src={event.image.src}
            alt={event.image.alt}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 85vw"
            draggable={false}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          // Placeholder until the event has a banner
          <div className="flex h-full items-center justify-center bg-linear-to-br from-indigo/20 to-indigo/50 text-xs text-white transition-transform duration-500 group-hover:scale-110">
            Image
          </div>
        )}
      </div>

      <div className="flex">
        <div className="flex w-24 shrink-0 flex-col items-center justify-center gap-2 bg-accent p-3 text-center text-white sm:w-28">
          <p className="text-xl">{event.date}</p>
          <p className="flex items-start gap-1 text-left text-[10px] leading-tight">
            <svg
              className="mt-0.5 h-3 w-3 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" strokeLinejoin="round" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {event.location}
          </p>
        </div>

        <div className="p-4">
          <span className="rounded bg-accent/10 px-2 py-1 text-[10px] font-medium text-accent">
            {event.type}
          </span>
          <h3 className="mt-2 font-semibold">{event.title}</h3>
          <p className="mt-1 line-clamp-3 text-xs text-ink/70">{event.description}</p>
          <Link href="#" className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-accent">
            Register Now
            <svg
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 12h16m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
