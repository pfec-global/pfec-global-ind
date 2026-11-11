import { notFound } from "next/navigation";
import { getEventDetail, getEventSlugs } from "@/lib/eventDetail";
import { toMetadata } from "@/lib/seo";
import EventDetail from "@/components/EventDetail";
import Contact from "@/components/Contact";

// The page waits for Strapi on every visit while caching is switched off (CACHE_STRAPI in src/lib/strapi.js).
// This tells Next.js that waiting is expected here. Remove it when caching is switched back on.
export const instant = false;

// One page per event in Strapi: /events/<slug>
export async function generateStaticParams() {
  const slugs = await getEventSlugs();
  return (slugs ?? []).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = await getEventDetail(slug);
  if (!event) return {};
  // SEO tags from the "seo" block of the event in Strapi; the title and short description fill any gaps
  return toMetadata(event.seo, {
    title: `${event.title} | PFEC Global Events`,
    description: event.shortDescription,
  });
}

export default async function EventPage({ params }) {
  const { slug } = await params;
  const event = await getEventDetail(slug);
  // No such event, or Strapi cannot be reached (there are no built-in events to fall back to)
  if (!event) notFound();

  return (
    <>
      <EventDetail event={event} />
      <Contact />
    </>
  );
}
