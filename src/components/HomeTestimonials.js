import { getHomeSections } from "@/lib/homepage";
import { getAllTestimonials } from "@/lib/testimonials";
import Testimonials from "@/components/Testimonials";

// The testimonials section as the home page shows it (the home page and the contact page):
// the heading and subheading of the home page's testimonials section in Strapi (GET /api/homepage),
// with every testimonial in Strapi (GET /api/testimonials) as the cards - not only the ones picked there.
// Left out when Strapi sends no testimonials. A heading or subheading Strapi leaves empty is not shown.
export default async function HomeTestimonials() {
  const [{ testimonials: section }, items] = await Promise.all([getHomeSections(), getAllTestimonials()]);
  if (!items) return null;
  return <Testimonials heading={section?.heading} subheading={section?.subheading} items={items} />;
}
