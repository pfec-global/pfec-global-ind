import { scholarships } from "@/data/countries";
import PageHero from "@/components/PageHero";
import DestinationList from "@/components/DestinationList";
import Universities from "@/components/Universities";
import Reasons from "@/components/Reasons";
import Factors from "@/components/Factors";
import Scholarship from "@/components/Scholarship";
import Steps from "@/components/Steps";
import Contact from "@/components/Contact";
import DestinationContent from "@/components/DestinationContent";

export const metadata = {
  title: "Scholarships | PFEC Global",
  description: "Explore scholarships for international students in every study destination.",
};

// Same page as the destination list, with the scholarships in the card grid
export default function ScholarshipsPage() {
  return (
    <>
      <PageHero
        titleTop="Whichever Scholarship you Need,"
        titleBottom="We Will Help you Get It!"
        subtitle="Explore scholarships for international students in every study destination"
      />
      <DestinationList items={scholarships} />
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
