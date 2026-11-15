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

// The home page only sends a few fields of each event, without its registration form link (registrationUrl).
// So each of those events is looked up on its own (GET /api/events/<documentId>) to add the link.
// If a lookup fails the event is still shown; its "Register Now" then goes to the contact form.
async function withRegisterLinks(items) {
  return Promise.all(
    items.map(async (item) => {
      if (item.registerLink || !item.documentId) return item;
      const response = await getFromStrapi(`events/${item.documentId}`, "events");
      return response?.data ? { ...item, registerLink: eventCard(response.data).registerLink } : item;
    }),
  );
}

// All events from Strapi (GET /api/events), grouped by day.
// When that list is empty, the events picked for the home page are used, so the page matches the home page slider.
export async function getEventGroups() {
  const response = await getFromStrapi("events?populate=*&pagination[pageSize]=100", "events");
  const events = Array.isArray(response?.data) ? response.data : [];
  const items =
    events.length > 0 ? events.map(eventCard) : await withRegisterLinks((await getHomeSections()).events?.items ?? []);
  return groupByDate(items);
}

// "2026-11-24T05:30:00.000Z" -> "24 Nov 2026" and "11:00 AM" (Indian time)
const dayOf = (date) =>
  new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "Asia/Kolkata" }).format(date);
const timeOf = (date) =>
  new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" }).format(date);
const validDate = (value) => {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date : null;
};

// "24 Nov 2026 | 11:00 AM - 1:00 PM" (the end time only when Strapi has one on the same day)
function dateLine(startsAt, endsAt) {
  const start = validDate(startsAt);
  if (!start) return "";
  const end = validDate(endsAt);
  const until = end && dayOf(end) === dayOf(start) ? ` - ${timeOf(end)}` : "";
  return `${dayOf(start)} | ${timeOf(start)}${until}`;
}

// The next events for a slider (the Ahmedabad branch page): upcoming ones first, soonest first.
// When nothing is coming up, the most recent past events are shown instead, newest first.
// Same source as the events page: GET /api/events, or the events picked for the home page when that list is empty.
// Returns [{ id, title, date, venue, image, href }] - an empty list when Strapi has no events or cannot be reached.
// now is the current time; the caller reads it after connection(), so the list is built on every visit.
export async function getUpcomingEvents(now, limit = 10) {
  const response = await getFromStrapi("events?populate=*&pagination[pageSize]=100", "events");
  const raw = Array.isArray(response?.data) ? response.data : [];
  const items =
    raw.length > 0
      ? raw.map((event) => ({ ...eventCard(event), endsAt: event.endDateTime }))
      : ((await getHomeSections()).events?.items ?? []);

  const byStart = items.filter((item) => validDate(item.startsAt)).sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  const upcoming = byStart.filter((item) => validDate(item.startsAt) >= now);
  const chosen = upcoming.length > 0 ? upcoming : byStart.reverse();

  return chosen.slice(0, limit).map((item) => ({
    id: item.id ?? item.documentId ?? item.title,
    title: item.title,
    date: dateLine(item.startsAt, item.endsAt),
    venue: item.location || item.type,
    image: item.image ?? null,
    href: item.id ? `/events/${item.id}/` : "/events/",
  }));
}
