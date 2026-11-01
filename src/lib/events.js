import { getFromStrapi } from "@/lib/strapi";
import { eventCard, getHomeSections } from "@/lib/homepage";

// Same-day events end up side by side: [{ date: "24 Nov", year: "2026", events }], earliest day first.
export function groupByDate(events) {
  const groups = new Map();
  for (const event of [...events].sort((a, b) => a.startsAt.localeCompare(b.startsAt))) {
    const key = `${event.date} ${event.year}`;
    if (!groups.has(key)) groups.set(key, { date: event.date, year: event.year, events: [] });
    groups.get(key).events.push(event);
  }
  return [...groups.values()];
}

// All events from Strapi (GET /api/events), grouped by day.
// When that list is empty, the events picked for the home page are used, so the page matches the home page slider.
export async function getEventGroups() {
  const response = await getFromStrapi("events?populate=*&pagination[pageSize]=100", "events");
  const events = Array.isArray(response?.data) ? response.data : [];
  const items = events.length > 0 ? events.map(eventCard) : (await getHomeSections()).events?.items;
  return groupByDate(items ?? []);
}
