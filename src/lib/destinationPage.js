import { getFromStrapi, toImage } from "@/lib/strapi";
import { countryHref } from "@/lib/homepage";

// Destination list page content from Strapi (GET /api/destination-page).
// Returns { seo, items }: seo is the page's SEO block, items are the countries ({ label, href, image, flag }) -
// image is the card photo (cardImage in Strapi), flag is the small country logo.
// Whatever Strapi does not send comes back as undefined, and the page then uses its built-in content.
export async function getDestinationPage() {
  const response = await getFromStrapi("destination-page", "destination-page");
  const page = response?.data ?? response ?? {};
  const countries = Array.isArray(page.countries) ? page.countries : [];

  return {
    seo: page.seo ?? undefined,
    items:
      countries.length > 0
        ? [...countries]
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .map((country) => ({
              label: `Study in ${country.name.trim()}`,
              href: countryHref(country.slug),
              image: toImage(country.cardImage, `Study in ${country.name.trim()}`),
              flag: toImage(country.flag),
            }))
        : undefined,
  };
}
