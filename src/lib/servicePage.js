import { getFromStrapi } from "@/lib/strapi";
import { serviceCard } from "@/lib/homepage";

// Services page content from Strapi (GET /api/service-page).
// Returns { seo, items }: seo is the page's SEO block, items are the service cards ({ title, icon }).
// Whatever Strapi does not send comes back as undefined, and the page then uses its built-in content.
export async function getServicePage() {
  const response = await getFromStrapi("service-page", "service-page");
  const page = response?.data ?? response ?? {};
  const services = Array.isArray(page.services) ? page.services : [];

  return {
    seo: page.seo ?? undefined,
    items:
      services.length > 0
        ? [...services].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map(serviceCard)
        : undefined,
  };
}
