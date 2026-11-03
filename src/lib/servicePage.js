import { getFromStrapi } from "@/lib/strapi";

// Services page content from Strapi (GET /api/service-page). Only the SEO block is used:
// the service cards are built in (the "Our Services" menu, src/data/services.js).
// Returns { seo }, or { seo: undefined } when Strapi does not send it (or cannot be reached).
export async function getServicePage() {
  const response = await getFromStrapi("service-page?populate=*", "service-page");
  const page = response?.data ?? response ?? {};
  return { seo: page.seo ?? undefined };
}
