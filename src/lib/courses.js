import { getFromStrapi, toImage } from "@/lib/strapi";
import { countryHref } from "@/lib/homepage";
import { faqToMarkdown, prepareBlogMarkdown, stripMarkdown } from "@/lib/blogMarkdown";

// Courses (Strapi "study areas") for the /courses/ list page and the /courses/<slug>/ details pages:
//   GET /api/study-area-page                                      -> page SEO + every study area (list)
//   GET /api/study-areas?view=detail&filters[slug][$eq]=<slug>    -> one study area with everything (details)

const clean = (value) => (typeof value === "string" && value.trim() ? value.trim() : undefined);

const COURSEFINDER_URL = (process.env.NEXT_PUBLIC_COURSEFINDER_URL || "https://coursefinder.pfecglobal.com").replace(/\/+$/, "");

// The CourseFinder university search, for the "Find Universities" card of a details page
export function courseFinderHref(content = "course_page") {
  const params = new URLSearchParams({
    utm_source: process.env.NEXT_PUBLIC_COURSEFINDER_UTM_SOURCE || "pfecglobal",
    utm_medium: "referral",
    utm_campaign: "coursefinder_widget",
    utm_content: content,
  });
  return `${COURSEFINDER_URL}/universities?${params}`;
}

// Study levels are shown from the lowest to the highest (Strapi sends them in any order);
// a level not in this list keeps its place after the known ones
const LEVEL_RANK = ["certificate", "foundation", "diploma", "advanced diploma", "bachelor", "graduate", "master", "masters", "mba", "phd", "doctorate"];
const rank = (name) => {
  const index = LEVEL_RANK.indexOf(name.toLowerCase());
  return index === -1 ? LEVEL_RANK.length : index;
};

// [{ name: "Diploma" }, ...] -> ["Diploma", ...] (empty names left out, each name once, lowest level first)
const levelNames = (levels) =>
  [...new Set((Array.isArray(levels) ? levels : []).map((level) => clean(level?.name)).filter(Boolean))].sort(
    (a, b) => rank(a) - rank(b),
  );

// Countries of a study area -> { name, href, flag }; href is the country page
const toCountries = (countries) =>
  (Array.isArray(countries) ? countries : [])
    .filter((country) => clean(country?.name))
    .map((country) => ({
      name: country.name.trim(),
      href: country.slug ? countryHref(country.slug) : undefined,
      flag: toImage(country.flag, country.name)?.src,
    }));

const byOrder = (a, b) => (a.order ?? 0) - (b.order ?? 0);

// One study area of the list -> a course card. icon, levels and destinations are only shown when Strapi sends them.
const toCard = (area) => ({
  slug: area.slug,
  name: area.name.trim(),
  summary: clean(area.shortDescription),
  href: `/courses/${area.slug}`,
  icon: toImage(area.icon, area.name),
  levels: levelNames(area.studyLevels),
  destinations: toCountries(area.countries).map((country) => country.name),
});

// List page: { seo, courses }, or undefined when Strapi cannot be reached.
// The study area page does not send each area's countries ("Top places" on the cards), but the detail view of
// the study areas does: GET /api/study-areas?view=detail. Both are asked at the same time and the countries
// are added to each area by its slug. If that second call fails, the cards are shown without "Top places".
export async function getCoursesPage() {
  const [response, details] = await Promise.all([
    getFromStrapi("study-area-page", "study-area-page"),
    getFromStrapi("study-areas?view=detail&pagination[pageSize]=100", "study-areas"),
  ]);
  if (!response) return undefined;
  const page = response.data ?? {};
  const countriesBySlug = new Map(
    (Array.isArray(details?.data) ? details.data : []).map((area) => [area?.slug, area?.countries]),
  );
  const areas = (Array.isArray(page.studyAreas) ? page.studyAreas : [])
    .filter((area) => clean(area?.name) && clean(area?.slug))
    .map((area) => ({ ...area, countries: area.countries ?? countriesBySlug.get(area.slug) }));
  return { seo: page.seo ?? undefined, courses: [...areas].sort(byOrder).map(toCard) };
}

// All courses (footer list): [{ slug, name, href, ... }], empty when Strapi cannot be reached
export async function getCourses() {
  return (await getCoursesPage())?.courses ?? [];
}

// The slug of every course (details pages and the sitemap), or undefined when Strapi cannot be reached
export async function getCourseSlugs() {
  return (await getCoursesPage())?.courses.map((course) => course.slug);
}

// Details page body as markdown: the description, then the study levels and destinations (when Strapi sends them),
// then the FAQs (drawn as an accordion). Every "##" heading becomes a line of the "Jump to Topic" box.
function toMarkdown(area, levels, countries) {
  const name = area.name.trim();
  return [
    prepareBlogMarkdown(area.description),
    levels.length ? `## Study Levels for ${name}\n\n${levels.map((level) => `- ${level}`).join("\n")}` : "",
    countries.length
      ? `## Top Destinations to Study ${name}\n\n${countries
          .map((country) => `- ${country.href ? `[Study in ${country.name}](${country.href})` : country.name}`)
          .join("\n")}`
      : "",
    faqToMarkdown(area.faqs),
  ]
    .filter(Boolean)
    .join("\n\n");
}

// One course for its details page, null when Strapi has no course with this slug,
// or undefined when Strapi cannot be reached
export async function getCourse(slug) {
  const response = await getFromStrapi(
    `study-areas?view=detail&filters[slug][$eq]=${encodeURIComponent(slug)}`,
    "study-areas",
  );
  if (!response) return undefined;
  const area = response.data?.[0];
  if (!area || !clean(area.name)) return null;

  const name = area.name.trim();
  const levels = levelNames(area.studyLevels);
  const countries = toCountries(area.countries);
  const banner = area.showSidebarBanner ? area.sidebarBanner : null;
  const faqs = (Array.isArray(area.faqs) ? area.faqs : []).filter((faq) => clean(faq?.question) && clean(faq?.answer));

  return {
    slug: area.slug,
    name,
    summary: clean(area.shortDescription),
    // The hero picture: the banner image, or the card picture when there is none
    image: toImage(area.heroImage, name) ?? toImage(area.cardImage, name),
    levels,
    countries,
    content: toMarkdown(area, levels, countries),
    // For the FAQ schema: plain text answers (the page itself shows them with their formatting)
    faqs: faqs.map((faq) => ({ question: faq.question.trim(), answer: stripMarkdown(faq.answer).trim() })),
    seo: area.seo ?? undefined,
    // Optional dark promo card from Strapi, switched on per course with showSidebarBanner
    banners:
      banner && (banner.title || banner.heading)
        ? [
            {
              title: banner.title ?? banner.heading,
              text: banner.text ?? banner.description ?? banner.subheading ?? "",
              buttonLabel: banner.buttonLabel ?? banner.buttonText ?? banner.label ?? "Learn More",
              href: banner.href ?? banner.url ?? banner.link ?? "/#contact",
            },
          ]
        : [],
  };
}
