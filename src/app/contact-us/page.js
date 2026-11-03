import { getContactPage } from "@/lib/contactPage";
import { toMetadata } from "@/lib/seo";
import ContactusHome from "@/components/ContactusHome";
import OfficeLocations from "@/components/OfficeLocations";
import Achievements from "@/components/Achievements";
import Steps from "@/components/Steps";
import Testimonials from "@/components/Testimonials";
import TestimonialsWithCms from "@/components/TestimonialsWithCms";

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

export default async function ContactPage() {
  // The testimonials picked for this page in Strapi (GET /api/contact-page);
  // without them the ones from the home page are shown, and the built-in ones after that
  const { testimonials } = await getContactPage();

  return (
    <>
      <ContactusHome />
      <OfficeLocations />
      <Achievements />
      <Steps />
      {testimonials ? <Testimonials items={testimonials} /> : <TestimonialsWithCms />}
    </>
  );
}
