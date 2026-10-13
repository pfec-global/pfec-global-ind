import { scholarships } from "@/data/countries";
import { getScholarshipPage } from "@/lib/scholarshipPage";
import { toMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import DestinationList from "@/components/DestinationList";
import Universities from "@/components/Universities";
import Reasons from "@/components/Reasons";
import Factors from "@/components/Factors";
import Scholarship from "@/components/Scholarship";
import Steps from "@/components/Steps";
import Contact from "@/components/Contact";
import DestinationContent from "@/components/DestinationContent";

// The page waits for Strapi on every visit while caching is switched off (CACHE_STRAPI in src/lib/strapi.js).
// This tells Next.js that waiting is expected here. Remove it when caching is switched back on.
export const instant = false;

// SEO tags come from the "seo" block of the page in Strapi; these are used for whatever Strapi does not send
const defaultMetadata = {
  title: "Scholarships | PFEC Global",
  description: "Explore scholarships for international students in every study destination.",
};

export async function generateMetadata() {
  const { seo } = await getScholarshipPage();
  return toMetadata(seo, defaultMetadata);
}

// Same page as the destination list, with the scholarships in the card grid
export default async function ScholarshipsPage() {
  // The scholarship cards come from Strapi (GET /api/scholarship-page). Without them the built-in ones are shown.
  const { items = scholarships } = await getScholarshipPage();

  return (
    <>
      <PageHero
        titleTop="Whichever Scholarship you Need,"
        titleBottom="We Will Help you Get It!"
        subtitle="Explore scholarships for international students in every study destination"
      />
      <DestinationList items={items} zoomImages />
      <Universities />
      <Reasons />
      <Factors />
      <Scholarship />
      {/* Same components as the home page */}
      <Steps />
      <Contact />
      <DestinationContent />
    </>
  );
}
