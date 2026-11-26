import { getFromStrapi } from "@/lib/strapi";
import { testimonialCard } from "@/lib/homepage";

// Strapi answers at most 100 entries per request (its default maxPageSize), so the list is read page by page
const PAGE_SIZE = 100;
// Safety stop in case Strapi keeps reporting more pages (10 000 testimonials)
const MAX_PAGES = 100;

// Every testimonial entry in Strapi (GET /api/testimonials) as Strapi sends it, in their "order", with no limit
// on how many. Entries without a student name or a message are left out. An empty list when Strapi sends none.
export async function getAllTestimonialEntries() {
  const entries = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const path =
      `testimonials?pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}` +
      "&populate[0]=image&populate[1]=country&sort=order:asc";
    const response = await getFromStrapi(path, "testimonials");
    const data = Array.isArray(response?.data) ? response.data : [];
    entries.push(...data);
    const pageCount = response?.meta?.pagination?.pageCount ?? 1;
    if (data.length === 0 || page >= pageCount) break;
  }
  return entries.filter((item) => item?.message?.trim() && item?.studentName?.trim());
}

// The same testimonials as slider cards ({ id, text, name, course, university, photo }), or undefined when
// Strapi sends none, so the component can fall back to its built-in ones. photo is undefined without an image.
export async function getAllTestimonials() {
  const cards = (await getAllTestimonialEntries()).map(testimonialCard);
  return cards.length > 0 ? cards : undefined;
}
