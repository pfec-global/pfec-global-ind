import { Suspense } from "react";
import { getAllTestimonials } from "@/lib/testimonials";
import Testimonials from "@/components/Testimonials";

// Every testimonial in Strapi (GET /api/testimonials), for the pages that show them without a heading.
// Without them the built-in testimonials are shown.
async function TestimonialsFromCms() {
  const items = await getAllTestimonials();
  return <Testimonials items={items} />;
}

// Shows the built-in testimonials straight away and swaps to the ones from Strapi as soon as they arrive,
// so the page does not wait for the CMS.
export default function TestimonialsWithCms() {
  return (
    <Suspense fallback={<Testimonials />}>
      <TestimonialsFromCms />
    </Suspense>
  );
}
