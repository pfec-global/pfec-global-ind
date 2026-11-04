import { getFromStrapi, toImage } from "@/lib/strapi";

// Awards page content from Strapi (GET /api/award-page).
// Returns { seo, awards }: seo is the page's SEO block, awards are the trophies ({ id, title, awardedBy, year, image }),
// sorted by their "order" field. Every field of an award is optional; an award without a picture is left out.
// Whatever Strapi does not send comes back as undefined.
export async function getAwardPage() {
  const response = await getFromStrapi("award-page", "award-page");
  const page = response?.data ?? response ?? {};
  const text = (value) => (typeof value === "string" && value.trim() ? value.trim() : undefined);

  const awards = (Array.isArray(page.awards) ? page.awards : [])
    .filter((award) => award.image?.url)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((award) => {
      const title = text(award.title);
      const awardedBy = text(award.awardedBy);
      return {
        id: award.id,
        title,
        awardedBy,
        year: award.year ?? undefined,
        image: toImage(award.image, [title, awardedBy && `awarded by ${awardedBy}`].filter(Boolean).join(", ") || "PFEC Global award"),
      };
    });

  return {
    seo: page.seo ?? undefined,
    awards: awards.length > 0 ? awards : undefined,
  };
}

