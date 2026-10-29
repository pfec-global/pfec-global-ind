import { getFromStrapi, toImage } from "@/lib/strapi";
import { faqToMarkdown, prepareBlogMarkdown } from "@/lib/blogMarkdown";

// Scholarship details page content from Strapi.
// The list endpoint only returns the card fields, so this takes two calls:
//   GET /api/scholarships?filters[slug][$eq]=<slug>     -> the scholarship's documentId
//   GET /api/scholarships/<documentId>?populate=*       -> everything (description, FAQs, hero image, SEO...)
// Returns the page, null if Strapi has no scholarship with this slug, or undefined if Strapi cannot be reached.
export async function getScholarshipDetail(slug) {
  const found = await getFromStrapi(`scholarships?filters[slug][$eq]=${encodeURIComponent(slug)}`, "scholarship");
  if (!found) return undefined;
  const documentId = found.data?.[0]?.documentId;
  if (!documentId) return null;

  const response = await getFromStrapi(`scholarships/${documentId}?populate=*`, "scholarship");
  const item = response?.data;
  if (!item) return undefined;

  const name = item.name.trim();
  const banner = item.showSidebarBanner ? item.sidebarBanner : null;
  return {
    name,
    shortDescription: item.shortDescription?.trim() || null,
    // The big picture of the hero: the hero image, or the card picture when no hero image is uploaded
    image: toImage(item.heroImage, name) ?? toImage(item.cardImage, name),
    // The description (markdown), followed by the FAQs as the last section - drawn as an accordion
    content: [prepareBlogMarkdown(item.description), faqToMarkdown(item.faqs)].filter(Boolean).join("\n\n"),
    seo: item.seo ?? undefined,
    // Optional dark promo card in the sidebar, switched on per scholarship with showSidebarBanner
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

// Scholarship details pages: the slug of every scholarship in Strapi, or undefined if Strapi cannot be reached
export async function getScholarshipSlugs() {
  const response = await getFromStrapi("scholarships?fields[0]=slug&pagination[pageSize]=100", "scholarship");
  return response?.data?.map((item) => item.slug);
}
