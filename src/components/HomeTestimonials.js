import { getHomeSections } from "@/lib/homepage";
import Testimonials from "@/components/Testimonials";

// The testimonials section of the home page in Strapi (GET /api/homepage) - its heading, subheading and cards -
// for every page that shows it the way the home page does (the home page and the contact page).
// Left out when Strapi sends no testimonials. A heading or subheading Strapi leaves empty is not shown.
// (Strapi is asked only once per page view, so a page that also reads other home sections pays nothing extra.)
export default async function HomeTestimonials() {
  const { testimonials } = await getHomeSections();
  if (!testimonials?.items) return null;
  return <Testimonials {...testimonials} />;
}
