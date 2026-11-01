import AwardsHero from "@/components/AwardsHero";
import KeyHighlights from "@/components/KeyHighlights";
import Professional from "@/components/Professional";
import AwardsGallery from "@/components/AwardsGallery";
import Contact from "@/components/Contact";



import Footer from "@/components/Footer";

export default function AwardsAndAchievements() {
  return (
    <> 
          <main>
       <AwardsHero />
       <KeyHighlights />
       <Professional />
       <AwardsGallery />
       <Contact />

      </main>
            <Footer />
    </>
  );
}