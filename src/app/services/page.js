import PageHero from "@/components/PageHero";
import { ServiceCards, activeServiceCards } from "@/components/Services";
import Steps from "@/components/Steps";
import Contact from "@/components/Contact";
import DestinationContent from "@/components/DestinationContent";

export const metadata = {
  title: "Our Services | PFEC Global",
  description: "Get end-to-end assistance and realize your study abroad dreams.",
};

// Built-in page (not from Strapi): the cards are the services of the "Our Services" menu, each linked to its page
export default function ServicesPage() {
  return (
    <>
      <PageHero
        tag="Services"
        titleTop="Get End-to-End Assistance"
        titleBottom="and Realize Your Study Abroad Dreams"
        subtitle="Explore Various factors that you need to consider before you choose a study destination"
      />
      <section className="bg-[#f9f9f9] px-4 pb-12 pt-4 sm:px-6 lg:pb-16">
        <div className="mx-auto max-w-4xl">
          <ServiceCards items={activeServiceCards()} />
        </div>
      </section>
      {/* Same components as the home page */}
      <Steps />
      <Contact />
      {/* Same component as the destinations page */}
      <DestinationContent />
    </>
  );
}
