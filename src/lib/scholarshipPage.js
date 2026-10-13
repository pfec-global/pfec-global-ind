import { getFromStrapi, toImage } from "@/lib/strapi";

// Scholarship list page content from Strapi (GET /api/scholarship-page).
// Returns { seo, items }: seo is the page's SEO block, items are the scholarships ({ label, href, image, flag }) -
// image is the card photo (cardImage in Strapi), flag is the small logo (logo in Strapi).
// Whatever Strapi does not send comes back as undefined, and the page then uses its built-in content.
export async function getScholarshipPage() {
  const response = await getFromStrapi("scholarship-page", "scholarship-page");
  const page = response?.data ?? response ?? {};
  const scholarships = Array.isArray(page.scholarships) ? page.scholarships : [];

  return {
    seo: page.seo ?? undefined,
    items:
      scholarships.length > 0
        ? [...scholarships]
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .map((scholarship) => ({
              label: scholarship.name.trim(),
              href: `/scholarships/${scholarship.slug}`,
              image: toImage(scholarship.cardImage, scholarship.name.trim()),
              flag: toImage(scholarship.logo),
            }))
        : undefined,
  };
}
