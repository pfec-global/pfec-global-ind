import { getFromStrapi } from "@/lib/strapi";

// A text-only page from Strapi: GET /api/privacy-policy or GET /api/terms-of-use.
// Returns { content, seo, updatedAt }: content is the page text (markdown), seo the page's SEO block,
// updatedAt the date of the last edit ("11 October 2026"). Whatever Strapi does not send comes back as undefined,
// and the page then shows its built-in text.
export async function getLegalPage(path) {
  const response = await getFromStrapi(`${path}?populate=*`, path);
  const page = response?.data ?? response ?? {};
  const content = typeof page.content === "string" && page.content.trim() ? page.content.trim() : undefined;
  const updated = page.updatedAt ? new Date(page.updatedAt) : null;

  return {
    content,
    seo: page.seo ?? undefined,
    updatedAt:
      updated && !Number.isNaN(updated.getTime())
        ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" }).format(updated)
        : undefined,
  };
}
