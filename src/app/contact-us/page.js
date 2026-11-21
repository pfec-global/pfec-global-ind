import { getContactPage } from "@/lib/contactPage";
import { toMetadata } from "@/lib/seo";
import ContactusHome from "@/components/ContactusHome";
import OfficeLocations from "@/components/OfficeLocations";
import Achievements from "@/components/Achievements";
import Steps from "@/components/Steps";
import HomeTestimonials from "@/components/HomeTestimonials";

// The page waits for Strapi on every visit while caching is switched off (CACHE_STRAPI in src/lib/strapi.js).
// This tells Next.js that waiting is expected here. Remove it when caching is switched back on.
export const instant = false;

// SEO tags come from the "seo" block of the page in Strapi; these are used for whatever Strapi does not send
const defaultMetadata = {
  title: "Contact Us | PFEC Global",
  description: "Book an appointment with your nearest PFEC Global office in India, Australia, Bangladesh or Sri Lanka.",
};

export async function generateMetadata() {
  const { seo } = await getContactPage();
  return toMetadata(seo, defaultMetadata);
}

export default function ContactPage() {
  return (
    <>
      <ContactusHome />
      <OfficeLocations />
      <Achievements />
      <Steps />
      {/* The same testimonials section as the home page (heading, subheading and cards from Strapi) */}
      <HomeTestimonials />
    </>
  );
}
