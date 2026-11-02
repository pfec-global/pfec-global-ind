import { Suspense } from "react";
import { getHomeSections } from "@/lib/homepage";
import Testimonials from "@/components/Testimonials";

// The testimonials picked on the home page in Strapi (GET /api/homepage), for the other pages that show them.
// Without them the built-in testimonials are shown.
async function TestimonialsFromCms() {
  const { testimonials } = await getHomeSections();
  return <Testimonials {...testimonials} />;
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
