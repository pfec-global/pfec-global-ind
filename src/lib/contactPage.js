import { getFromStrapi } from "@/lib/strapi";
import { testimonialCard } from "@/lib/homepage";

// Contact page content from Strapi (GET /api/contact-page).
// Returns { seo, testimonials }: seo is the page's SEO block, testimonials the cards picked for this page.
// Whatever Strapi does not send comes back as undefined.
export async function getContactPage() {
  const response = await getFromStrapi("contact-page?populate=*", "contact-page");
  const page = response?.data ?? response ?? {};
  const testimonials = (Array.isArray(page.testimonials) ? page.testimonials : [])
    .filter((item) => item.studentName?.trim() && item.message?.trim())
    .map(testimonialCard);

  return {
    seo: page.seo ?? undefined,
    testimonials: testimonials.length > 0 ? testimonials : undefined,
  };
}
