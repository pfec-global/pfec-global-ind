
import AboutHero from "@/components/Abouthero";
import WhoAreWe from "@/components/WhoAreWe";
import Achievements from "@/components/Achievements";
import MissionVision from "@/components/MissionVision";
import Certifications from "@/components/Certifications";
import Recognitions from "@/components/Recognitions";
import CoreValues from "@/components/CoreValues";


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