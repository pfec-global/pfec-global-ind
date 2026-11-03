import { getAwardPage } from "@/lib/awardPage";
import { toMetadata } from "@/lib/seo";
import AwardsHero from "@/components/AwardsHero";
import KeyHighlights from "@/components/KeyHighlights";
import AwardTrophies from "@/components/AwardTrophies";
import Professional from "@/components/Professional";
import AwardsGallery from "@/components/AwardsGallery";
import Contact from "@/components/Contact";

// The page waits for Strapi on every visit while caching is switched off (CACHE_STRAPI in src/lib/strapi.js).
// This tells Next.js that waiting is expected here. Remove it when caching is switched back on.
export const instant = false;

// SEO tags come from the "seo" block of the page in Strapi; these are used for whatever Strapi does not send
const defaultMetadata = {
  title: "Awards & Achievements | PFEC Global",
  description: "PFEC Global has been recognised with many prestigious awards by universities around the world.",
};

export async function generateMetadata() {
  const { seo } = await getAwardPage();
  return toMetadata(seo, defaultMetadata);
}

export default async function AwardsAndAchievements() {
  // The trophies come from Strapi (GET /api/award-page); without them their section is left out
  const { awards } = await getAwardPage();

  return (
    <main>
      <AwardsHero />
      <KeyHighlights />
      <AwardTrophies awards={awards} />
      <Professional />
      <AwardsGallery />
      <Contact />
    </main>
  );
}
