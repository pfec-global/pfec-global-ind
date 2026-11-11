import { getLeadershipPage } from "@/lib/leadershipPage";
import { toMetadata } from "@/lib/seo";
import LeadershipTeam from "@/components/LeadershipTeam";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";

// The page waits for Strapi on every visit while caching is switched off (CACHE_STRAPI in src/lib/strapi.js).
// This tells Next.js that waiting is expected here. Remove it when caching is switched back on.
export const instant = false;

// SEO tags come from the "seo" block of the page in Strapi; these are used for whatever Strapi does not send
const defaultMetadata = {
  title: "Our Leadership Team | PFEC Global",
  description: "Meet the experienced team that spearheads PFEC Global and guides students to study abroad.",
};

export async function generateMetadata() {
  const { seo } = await getLeadershipPage();
  return toMetadata(seo, defaultMetadata);
}

export default async function OurLeadershipTeam() {
  // The leader cards come from Strapi (GET /api/leaders); without them the built-in ones are shown
  const { leaders } = await getLeadershipPage();

  return (
    <main>
      <LeadershipTeam leaders={leaders} />
      <Achievements />
      <Contact />
    </main>
  );
}
