import { getFromStrapi, toImage } from "@/lib/strapi";
import { faqToMarkdown, prepareBlogMarkdown } from "@/lib/blogMarkdown";

// Country details page content from Strapi.
// The list endpoint only returns the card fields, so this takes two calls:
//   GET /api/countries?filters[slug][$eq]=<slug>     -> the country's documentId
//   GET /api/countries/<documentId>?populate=*       -> everything (description, FAQs, institutions, SEO...)
// Returns the page, null if Strapi has no country with this slug, or undefined if Strapi cannot be reached.
export async function getCountryDetail(slug) {
  const found = await getFromStrapi(`countries?filters[slug][$eq]=${encodeURIComponent(slug)}`, "country");
  if (!found) return undefined;
  const documentId = found.data?.[0]?.documentId;
  if (!documentId) return null;

  const response = await getFromStrapi(`countries/${documentId}?populate=*`, "country");
  const item = response?.data;
  if (!item) return undefined;

  const name = item.name.trim();
  const logos = (list) => (Array.isArray(list) ? list.map((media) => toImage(media, "Institution logo")).filter(Boolean) : []);

  return {
    name,
    shortDescription: item.shortDescription?.trim() || null,
    // The big picture of the hero: the hero image, or the card photo when no hero image is uploaded
    image: toImage(item.heroImage, `Study in ${name}`) ?? toImage(item.cardImage, `Study in ${name}`),
    // The description (markdown), followed by the FAQs as the last section - drawn as an accordion
    content: [prepareBlogMarkdown(item.description), faqToMarkdown(item.faqs)].filter(Boolean).join("\n\n"),
    seo: item.seo ?? undefined,
    banners: item.showSidebarBanner && item.sidebarBanner ? [toPromoBanner(item.sidebarBanner)] : [],
    // Logo sliders, one tab per kind of institution. Kinds without logos are left out.
    institutions: [
      { label: "Universities", logos: logos(item.universities) },
      { label: "Private Colleges", logos: logos(item.privateColleges) },
      { label: "TAFEs", logos: logos(item.tafes) },
      { label: "University Pathways", logos: logos(item.universityPathways) },
    ].filter((group) => group.logos.length > 0),
    popularCourses: (item.popularCourses ?? []).map((course) => course.name.trim()),
  };
}

// The sidebar banner of a country is a ready-made HTML card with inline styles, which the site does not draw as-is
// (inline styles and raw HTML from the CMS are removed for safety). Its title, button text and link are taken
// out of it and shown in the site's own dark promo card instead.
function toPromoBanner(banner) {
  const html = banner.content ?? "";
  const link = html.match(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i);
  const label = link?.[2].replace(/<svg[\s\S]*?<\/svg>/gi, "").replace(/<[^>]+>/g, "").trim();
  const href = link?.[1] ?? "";
  return {
    title: banner.title?.trim() || "Get Started on your Study Abroad Dream",
    text: "Receive free end-to-end assistance and personalised guidance from our experts.",
    buttonLabel: label || "Book Free Consultation",
    // "#consultation" and other in-page anchors point to the contact form of the home page
    href: !href || href.startsWith("#") ? "/#contact" : href,
  };
}

// Country details pages: the slug of every country in Strapi, or undefined if Strapi cannot be reached
export async function getCountrySlugs() {
  const response = await getFromStrapi("countries?fields[0]=slug&pagination[pageSize]=100", "country");
  return response?.data?.map((item) => item.slug);
}
