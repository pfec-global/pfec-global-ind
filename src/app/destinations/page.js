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
  title: "Study Destinations | PFEC Global",
  description: "Explore various factors that you need to consider before you choose a study destination.",
};

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        titleTop="Wherever you wish to Study,"
        titleBottom="We Will Take you There!"
        subtitle="Explore Various factors that you need to consider before you choose a study destination"
      />
      <DestinationList />
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
