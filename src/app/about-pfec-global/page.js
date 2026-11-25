
import AboutHero from "@/components/Abouthero";
import WhoAreWe from "@/components/WhoAreWe";
import Achievements from "@/components/Achievements";
import MissionVision from "@/components/MissionVision";
import Certifications from "@/components/Certifications";
import Recognitions from "@/components/Recognitions";
import CoreValues from "@/components/CoreValues";

// SEO tags of the About page (there is no About page in Strapi, so they are set here)
const title = "About PFEC India | Trusted Study Abroad Consultants in India";
const description =
  "Discover PFEC India—trusted consultants guiding students to top global study destinations. Learn about our mission, values, and expert support team.";

const url = `${(process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/+$/, "")}/about-pfec-global/`;

export const metadata = {
  title,
  description,
  keywords: "",
  alternates: { canonical: url },
  openGraph: { type: "website", title, description, url },
};

export default function AboutPage() {
  return (
    <> 
          <main>
      <AboutHero />
      <WhoAreWe />
      <Achievements />
      <Certifications />
      <Recognitions />
      <MissionVision /> 
      <CoreValues />

      </main>
    </>
  );
}