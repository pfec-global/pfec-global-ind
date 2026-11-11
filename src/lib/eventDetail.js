import { getFromStrapi, toImage } from "@/lib/strapi";
import { getHomeSections } from "@/lib/homepage";
import { faqToMarkdown, prepareBlogMarkdown, stripMarkdown } from "@/lib/blogMarkdown";

// Event details page content from Strapi. Takes two calls:
//   GET /api/events?filters[slug][$eq]=<slug>   -> the event's documentId
//   GET /api/events/<documentId>?populate=*      -> everything (description, FAQs, banner, SEO...)
// The events list only returns upcoming events, so for an event that has already started the first call
// finds nothing. The events picked for the home page are then searched for the slug as well.
// Returns the page, null if there is no event with this slug, or undefined if Strapi cannot be reached.
export async function getEventDetail(slug) {
  const found = await getFromStrapi(`events?filters[slug][$eq]=${encodeURIComponent(slug)}`, "events");
  if (!found) return undefined;

  let documentId = found.data?.[0]?.documentId;
  if (!documentId) {
    const home = await getHomeSections();
    documentId = home.events?.items?.find((item) => item.id === slug)?.documentId;
  }
  if (!documentId) return null;

  const response = await getFromStrapi(`events/${documentId}?populate=*`, "events");
  const event = response?.data;
  if (!event) return undefined;
  return toEventDetail(event);
}

// Event details pages: the slug of every upcoming event and of the events on the home page,
// or undefined if Strapi cannot be reached
export async function getEventSlugs() {
  const response = await getFromStrapi("events?fields[0]=slug&pagination[pageSize]=100", "events");
  if (!response) return undefined;
  const home = await getHomeSections();
  const slugs = [...(response.data ?? []).map((item) => item.slug), ...(home.events?.items ?? []).map((item) => item.id)];
  return [...new Set(slugs.filter(Boolean))];
}

const clean = (value) => (typeof value === "string" && value.trim() ? value.trim() : undefined);

// Event times are shown in Indian time, the same as the event cards (src/lib/homepage.js)
const TIME_ZONE = "Asia/Kolkata";
const format = (value, options) => {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return undefined;
  return new Intl.DateTimeFormat("en-GB", { timeZone: TIME_ZONE, ...options }).format(date);
};

// The description can arrive as markdown (text) or as Strapi "blocks" (rich text). Blocks are turned into markdown.
const inline = (children = []) =>
  children
    .map((child) => {
      if (child.type === "link") return `[${inline(child.children)}](${child.url})`;
      let value = child.text ?? "";
      if (!value.trim()) return value;
      if (child.bold) value = `**${value}**`;
      if (child.italic) value = `*${value}*`;
      return value;
    })
    .join("");

function blocksToMarkdown(blocks) {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "heading":
          return `${"#".repeat(Math.min(Math.max(block.level ?? 2, 2), 6))} ${inline(block.children)}`;
        case "list":
          return (block.children ?? [])
            .map((item, i) => `${block.format === "ordered" ? `${i + 1}.` : "-"} ${inline(item.children)}`)
            .join("\n");
        case "quote":
          return `> ${inline(block.children)}`;
        default:
          return inline(block.children);
      }
    })
    .filter((text) => text.trim())
    .join("\n\n");
}

const descriptionMarkdown = (description) =>
  Array.isArray(description) ? blocksToMarkdown(description) : prepareBlogMarkdown(description);

// Strapi event -> what the details page shows
function toEventDetail(event) {
  const online = event.eventType === "online";
  const description = descriptionMarkdown(event.description);
  const start = event.startDateTime;
  const end = event.endDateTime;
  const startTime = format(start, { hour: "numeric", minute: "2-digit", hour12: true });
  const endTime = format(end, { hour: "numeric", minute: "2-digit", hour12: true });
  const sameDay = format(start, { dateStyle: "medium" }) === format(end, { dateStyle: "medium" });
  const address = clean(event.address);

  return {
    slug: event.slug,
    title: clean(event.title) ?? "Event",
    online,
    type: online ? "Online Event" : "In-person Event",
    shortDescription: clean(event.shortDescription) ?? stripMarkdown(description).slice(0, 200),
    // "Tuesday, 20 October 2026"
    date: format(start, { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
    // Date badge in the hero: "20" / "Oct" / "2026"
    day: format(start, { day: "numeric" }),
    month: format(start, { month: "short" }),
    year: format(start, { year: "numeric" }),
    // "1:00 pm - 3:00 pm", or the end date too when the event runs over several days
    time: startTime
      ? endTime
        ? `${startTime} - ${sameDay ? endTime : `${format(end, { day: "numeric", month: "short" })}, ${endTime}`}`
        : startTime
      : undefined,
    startsAt: start,
    endsAt: end,
    // Over once its end time (or its start time, when it has no end) has passed
    isPast: new Date(end || start).getTime() < Date.now(),
    venue: clean(event.venueName),
    city: clean(event.city),
    address,
    // The map link from Strapi, or a Google Maps search for the address
    mapUrl:
      clean(event.mapUrl) ??
      (address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}` : undefined),
    onlineLink: online ? clean(event.onlineLink) : undefined,
    // The registration form. Without one, "Register Now" opens the consultation popup instead.
    registerLink: clean(event.registrationUrl),
    image: toImage(event.bannerImage, clean(event.title) ?? ""),
    countries: (event.countries ?? []).filter((country) => clean(country.name)).map((country) => ({
      name: country.name.trim(),
      href: country.slug ? `/${country.slug}` : undefined,
    })),
    // The description (markdown), followed by the FAQs as the last section - drawn as an accordion by BlogContent
    content: [description, faqToMarkdown(event.faqs)].filter(Boolean).join("\n\n"),
    seo: event.seo ?? undefined,
  };
}
