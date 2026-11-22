import PageHero from "@/components/PageHero";
import UniversityLivingWidget from "@/components/UniversityLivingWidget";

// /university-living/ - University Living's student accommodation search, embedded on the site.
// Opened from "Explore Now" on the University Living card of the accommodations page (AccommodationProviders.js).

export const metadata = {
  title: "Student Accommodation with University Living | PFEC Global",
  description:
    "Search verified student accommodation near your university with University Living - 65000+ properties across 640 cities globally.",
};

export default function UniversityLivingPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Our Services", href: "/service-archive-page" },
          { label: "Student Accommodation", href: "/student-accommodations" },
          { label: "University Living" },
        ]}
        titleTop="Find Your Student Home"
        titleBottom="with University Living"
        subtitle="Search 65000+ verified properties across 640 cities globally - safe, secure and with 24/7 support"
      />

      <section className="bg-white pb-12 pt-6 lg:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <UniversityLivingWidget />
        </div>
      </section>
    </>
  );
}
