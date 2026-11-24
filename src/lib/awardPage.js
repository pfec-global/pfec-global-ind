import { getFromStrapi, toImage } from "@/lib/strapi";

// Awards page content from Strapi (GET /api/award-page).
// Returns { seo, awards }: seo is the page's SEO block, awards are the trophies ({ id, title, awardedBy, year, image }),
// sorted by their "order" field. Every field of an award is optional; an award without a picture is left out.
// Whatever Strapi does not send comes back as undefined.
const text = (value) => (typeof value === "string" && value.trim() ? value.trim() : undefined);

// Strapi awards -> the award cards, sorted by "order" (an award without a picture is left out); undefined when
// there are none. Also used for the awards section of the home page (src/lib/homepage.js).
export function toAwardCards(list) {
  const awards = (Array.isArray(list) ? list : [])
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
        // The picture's alt text: the image's own alt text in Strapi, or else the award's name, who gave it and
        // the year, e.g. "ACU 2024 Silver Award, awarded by Australian Catholic University (2024)"
        image: toImage(
          award.image,
          [title, awardedBy && `awarded by ${awardedBy}`].filter(Boolean).join(", ") +
            (award.year ? ` (${award.year})` : "") || "PFEC Global award",
        ),
      };
    });
  return awards.length > 0 ? awards : undefined;
}

export async function getAwardPage() {
  const response = await getFromStrapi("award-page", "award-page");
  const page = response?.data ?? response ?? {};

  return {
    seo: page.seo ?? undefined,
    awards: toAwardCards(page.awards),
  };
}

