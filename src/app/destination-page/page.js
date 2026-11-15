import { getDestinationPage } from "@/lib/destinationPage";
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
  title: "Study Destinations | PFEC Global",
  description: "Explore various factors that you need to consider before you choose a study destination.",
};

export async function generateMetadata() {
  const { seo } = await getDestinationPage();
  return toMetadata(seo, defaultMetadata);
}

export default async function DestinationsPage() {
  // The country cards come from Strapi (GET /api/destination-page). Without them the built-in countries are shown.
  const { items } = await getDestinationPage();

  return (
    <>
      <PageHero
        titleTop="Wherever you wish to Study,"
        titleBottom="We Will Take you There!"
        subtitle="Explore Various factors that you need to consider before you choose a study destination"
      />
      <DestinationList items={items} />
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
