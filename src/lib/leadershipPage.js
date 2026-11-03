import { getFromStrapi, toImage } from "@/lib/strapi";

// Leadership page content from Strapi (GET /api/leadership-page).
// Returns { seo, leaders }: seo is the page's SEO block, leaders are the cards
// ({ id, name, designation, image, points, linkedinUrl }), sorted by their "order" field.
// Whatever Strapi does not send comes back as undefined, and the page then uses its built-in content.
// (GET /api/leaders on its own answers "400 Invalid key shortDescription", so the leaders are read from the page.)

const text = (value) => (typeof value === "string" && value.trim() ? value.trim() : undefined);

// "- First point\n- Second point" -> ["First point", "Second point"]
const points = (description) =>
  (text(description) ?? "")
    .split("\n")
    .map((line) => line.replace(/^\s*[-*•]\s*/, "").trim())
    .filter(Boolean);

export async function getLeadershipPage() {
  const response = await getFromStrapi("leadership-page?populate=*", "leadership-page");
  const page = response?.data ?? response ?? {};

  const leaders = (Array.isArray(page.leaders) ? page.leaders : [])
    .filter((leader) => text(leader.name))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((leader) => ({
      id: leader.id,
      name: leader.name.trim(),
      designation: text(leader.position),
      image: toImage(leader.image, leader.name.trim()),
      points: points(leader.description),
      linkedinUrl: text(leader.linkedinUrl),
    }));

  return {
    seo: page.seo ?? undefined,
    leaders: leaders.length > 0 ? leaders : undefined,
  };
}
