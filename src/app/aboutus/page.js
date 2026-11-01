
import AboutHero from "@/components/Abouthero";
import WhoAreWe from "@/components/WhoAreWe";
import Achievements from "@/components/Achievements";
import MissionVision from "@/components/MissionVision";
import Professional from "@/components/Professional";
import CoreValues from "@/components/CoreValues";

import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <> 
          <main>
      <AboutHero />
      <WhoAreWe />
      <Achievements />
      <Professional /> 
      <MissionVision /> 
      <CoreValues />

      </main>
            <Footer />
    </>
  );
}