import { getFromStrapi, toImage } from "@/lib/strapi";

// Home page content from Strapi (GET /api/homepage), reshaped into the props of the home page sections.
// Every value is optional: a section, heading or list that is missing or empty comes back as undefined,
// and the component then shows its built-in content instead.

// Country pages live at the root of the site: /study-in-australia.
// Strapi sends the slug as "study-in-australia"; older entries may only have "australia".
export const countryHref = (slug) => `/${slug.startsWith("study-in-") ? slug : `study-in-${slug}`}`;

const text = (value) => (typeof value === "string" && value.trim() ? value.trim() : undefined);
// An empty list counts as "not sent", so the built-in list is used
const list = (items, map) => (Array.isArray(items) && items.length > 0 ? items.map(map) : undefined);

// Strapi slug of a service -> the page it links to. A service that is not listed links to the services page.
const serviceHrefs = {
  "university-admission-assistance": "/services/admission-support",
  "scholarship-guidance": "/scholarships",
  "student-visa-assistance": "/services/visa-services",
  "health-insurance-assistance": "/services/health-insurance",
  "student-accommodation-assistance": "/services/student-accommodations",
};

// One service card. Its small picture is the service's icon, or its cardImage when no icon is uploaded.
// Also used by the services page (src/lib/servicePage.js).
export const serviceCard = (service) => ({
  title: service.name.trim(),
  href: serviceHrefs[service.slug] ?? "/services",
  icon: toImage(service.icon) ?? toImage(service.cardImage),
});

// "2026-11-24T10:00:00.000Z" -> "24 Nov" (Indian time)
const eventDate = (value) => {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return undefined;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "Asia/Kolkata" }).format(date);
};

// "2026-11-24T10:00:00.000Z" -> "2026" (Indian time)
const eventYear = (value) => {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return undefined;
  return new Intl.DateTimeFormat("en-GB", { year: "numeric", timeZone: "Asia/Kolkata" }).format(date);
};

// One event card. Also used by the events page (src/lib/events.js).
export const eventCard = (event) => ({
  id: event.slug,
  date: eventDate(event.startDateTime) ?? "",
  year: eventYear(event.startDateTime) ?? "",
  startsAt: event.startDateTime ?? "",
  location: [event.venueName, event.city].filter(Boolean).join(", "),
  type: event.eventType === "online" ? "Online Event" : "In-person Event",
  title: event.title,
  description: event.shortDescription ?? "",
  image: toImage(event.bannerImage, event.title),
});

// One function per Strapi section (__component: "sections.<name>")
const mappers = {
  hero: (section) => {
    // The hero design has one heading, so the first slide is used
    const slide = section.slides?.[0];
    const button = slide?.buttons?.[0];
    return {
      heading: text(slide?.heading),
      subheading: text(slide?.subheading),
      button: text(button?.label) && {
        label: button.label,
        href: text(button.url) ?? "#",
        newTab: Boolean(button.openNewTab),
      },
    };
  },

  countries: (section) => ({
    heading: text(section.heading),
    subheading: text(section.subheading),
    items: list(section.countries, (country) => ({
      name: country.name.trim(),
      href: countryHref(country.slug),
      image: toImage(country.cardImage, `Study in ${country.name}`),
    })),
  }),

  events: (section) => ({
    heading: text(section.heading),
    subheading: text(section.subheading),
    items: list(section.events, eventCard),
  }),

  services: (section) => ({
    heading: text(section.heading),
    subheading: text(section.subheading),
    items: list(section.services, serviceCard),
  }),

  "study-areas": (section) => ({
    heading: text(section.heading),
    items: list(section.studyAreas, (area) => area.name.trim()),
  }),

  testimonials: (section) => ({
    items: list(section.testimonials, (item, i) => ({
      id: i,
      text: item.message ?? "",
      name: item.studentName,
      course: item.course ?? "",
      university: item.university ?? "",
      photo: toImage(item.image, item.studentName)?.src,
    })),
  }),

  partnerships: (section) => ({
    heading: text(section.heading),
    subheading: text(section.subheading),
    items: list(
      [...(section.partnerships ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).filter((item) => item.image?.url),
      (item) => ({ name: item.image.alternativeText || "Partner logo", src: toImage(item.image).src }),
    ),
  }),
};

// The "seo" block of the home page (meta title, description...), or undefined if Strapi did not send one
export async function getHomeSeo() {
  const response = await getFromStrapi("homepage", "homepage");
  return (response?.data ?? response)?.seo ?? undefined;
}

// Returns { hero, countries, events, services, "study-areas", testimonials, partnerships }.
// A section that Strapi did not send (or the whole object, if Strapi is down) is simply missing.
export async function getHomeSections() {
  const response = await getFromStrapi("homepage", "homepage");
  const page = response?.data ?? response ?? {};
  // The sections are the list on the page whose entries carry a __component name
  const sections = Object.values(page).find((value) => Array.isArray(value) && value.some((item) => item?.__component)) ?? [];

  const result = {};
  for (const section of sections) {
    const name = section.__component?.replace("sections.", "");
    if (mappers[name] && !result[name]) result[name] = mappers[name](section);
  }
  return result;
}
