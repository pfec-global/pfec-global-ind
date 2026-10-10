import { destinations } from "@/data/countries";
import { countryContent } from "@/data/detailContent";

// Dummy data for the country details pages - replace with real data (CMS / API).
// Each country has a page at /destinations/study-in-<country>, e.g. /destinations/study-in-new-zealand.

// Country details page: the slug of every page
export const destinationSlugs = destinations.map((item) => item.slug);

// Country details page: one full page, or undefined if there is no country with that slug.
// content is markdown. Sidebar: same options as a blog post (showCta, banners).
export const getDestination = (slug) => {
  const country = destinations.find((item) => item.slug === slug)?.country;
  if (!country) return undefined;
  return {
    slug,
    country,
    titleTop: `Study in ${country}`,
    titleBottom: "with Expert Guidance",
    subtitle: "Get comprehensive guidance & end-to-end assistance from expert study abroad mentors for FREE!*",
    image: "/images/study_area_image.webp", // placeholder - replace with a photo of the country
    showCta: true,
    banners: [
      {
        title: "Want to Study in the UK?",
        text: "Join us at the UK Admission Day & Get into a top University, hassle-free",
        buttonLabel: "Sign me Up",
        href: "/#contact",
      },
    ],
    content: countryContent(country), // every dummy country has the same body
  };
};
