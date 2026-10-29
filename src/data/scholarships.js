import { scholarships } from "@/data/countries";
import { scholarshipContent } from "@/data/detailContent";

// Dummy data for the scholarship details pages - replace with real data (CMS / API).
// Each one has a page at /scholarships/<slug>, e.g. /scholarships/scholarships-in-australia.

// Scholarship details page: the slug of every page
export const scholarshipSlugs = scholarships.map((item) => item.slug);

// Scholarship details page: one full page, or undefined if there is none with that slug.
// content is markdown. Sidebar: same options as a blog post (showCta, banners).
export const getScholarship = (slug) => {
  const country = scholarships.find((item) => item.slug === slug)?.country;
  if (!country) return undefined;
  return {
    slug,
    country,
    titleTop: `Scholarships in ${country}`,
    titleBottom: "for International Students",
    subtitle: "Check your eligibility and receive end-to-end scholarship assistance from our experts for FREE!*",
    image: "/images/study_area_image.webp", // placeholder - replace with a real photo
    showCta: true,
    banners: [
      {
        title: "Want to Study in the UK?",
        text: "Join us at the UK Admission Day & Get into a top University, hassle-free",
        buttonLabel: "Sign me Up",
        href: "/#contact",
      },
    ],
    content: scholarshipContent(country), // every dummy page has the same body
  };
};
