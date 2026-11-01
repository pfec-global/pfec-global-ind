import { getEventGroups } from "@/lib/events";
import PageHero from "@/components/PageHero";
import EventListCard from "@/components/EventListCard";
import Contact from "@/components/Contact";

// The page waits for Strapi on every visit while caching is switched off (CACHE_STRAPI in src/lib/strapi.js).
// This tells Next.js that waiting is expected here. Remove it when caching is switched back on.
export const instant = false;

export const metadata = {
  title: "Events | PFEC Global",
  description: "Take your study abroad dreams further with our roster of offline and online events.",
};

export default async function EventsPage() {
  const groups = await getEventGroups();

  return (
    <>
      <PageHero
        tag="Events"
        titleTop="Join us at our"
        titleBottom="Upcoming Events"
        subtitle="Take your study abroad dreams further with our roster of offline and online events"
      />
      <section className="bg-[#f9f9f9] py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {groups.length === 0 && <p className="text-center text-sm text-ink/70">No events are scheduled right now.</p>}

          {/* Timeline: one date badge, then every event of that day. On mobile the badge sits above its cards. */}
          {groups.map((group, i) => (
            <div key={`${group.date} ${group.year}`} className="flex flex-col gap-4 pb-10 last:pb-0 sm:flex-row sm:gap-6">
              <div className="flex shrink-0 flex-col items-start sm:w-24 sm:items-center">
                <div className="bg-accent px-4 py-2 text-center text-white shadow-[4px_4px_0_0_var(--color-indigo)]">
                  <p className="whitespace-nowrap text-lg font-bold uppercase leading-tight">{group.date || "Date TBA"}</p>
                  <p className="text-sm">{group.year}</p>
                </div>
                {/* The line runs down to the next date */}
                {i < groups.length - 1 && <span className="mt-1 -mb-10 hidden w-px flex-1 bg-ink/40 sm:block" />}
              </div>

              <div className="min-w-0 flex-1 space-y-5">
                {group.events.map((event) => (
                  <EventListCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Contact />
    </>
  );
}
