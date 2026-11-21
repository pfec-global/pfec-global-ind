import { notFound } from "next/navigation";
import { getScholarship, scholarshipSlugs as builtInScholarshipSlugs } from "@/data/scholarships";
import { getRelatedPosts } from "@/data/blogs";
import { getScholarshipDetail, getScholarshipSlugs } from "@/lib/scholarshipDetail";
import { getRecentBlogPosts } from "@/lib/blogs";
import { toMetadata } from "@/lib/seo";
import DetailHero from "@/components/DetailHero";
import DetailBody from "@/components/DetailBody";
import RelatedBlogs from "@/components/RelatedBlogs";

// Scholarship details page, at the root of the site: /scholarships-in-australia/, /scholarships-in-uk/...
// Shown by src/app/[slug]/page.js, which shares the root of the site with the country pages.

// One page per scholarship in Strapi (the built-in ones if Strapi cannot be reached)
export async function scholarshipSlugs() {
  return (await getScholarshipSlugs()) ?? builtInScholarshipSlugs;
}

// The page content: from Strapi, or the built-in dummy page if Strapi cannot be reached.
// Returns null when there is no such scholarship.
async function loadScholarship(slug) {
  const cms = await getScholarshipDetail(slug);
  if (cms) {
    return {
      titleTop: cms.name,
      titleBottom: "for Indian Students",
      subtitle:
        cms.shortDescription ??
        "Check your eligibility and receive end-to-end scholarship assistance from our experts for FREE!*",
      image: cms.image?.src ?? "/images/study_area_image.webp",
      imageAlt: cms.image?.alt ?? "",
      content: cms.content,
      showCta: true,
      banners: cms.banners,
      seo: cms.seo,
    };
  }
  if (cms === null) return null; // Strapi answered: no scholarship with this slug
  return getScholarship(slug) ?? null;
}

export async function scholarshipMetadata(slug) {
  const scholarship = await loadScholarship(slug);
  if (!scholarship) return {};
  // SEO tags from the "seo" block of the scholarship in Strapi; the title and subtitle fill any gaps
  return toMetadata(scholarship.seo, {
    title: `${scholarship.titleTop} | PFEC Global`,
    description: scholarship.subtitle,
  });
}

// Same page as a blog post (markdown body, "Jump to Topic" box, sidebar, related blogs) with a different hero
export async function ScholarshipPage({ slug }) {
  const scholarship = await loadScholarship(slug);
  if (!scholarship) notFound();

  // Newest posts of the blog CMS (dummy posts if it cannot be reached)
  const related = (await getRecentBlogPosts(8)) ?? getRelatedPosts(slug);

  return (
    <>
      <DetailHero
        breadcrumbs={[{ label: "Scholarships", href: "/scholarships" }, { label: scholarship.titleTop }]}
        titleTop={scholarship.titleTop}
        titleBottom={scholarship.titleBottom}
        subtitle={scholarship.subtitle}
        image={scholarship.image}
        imageAlt={scholarship.imageAlt}
        floatingIcons
        // No slanted PFEC bars behind the photo, as on the country pages
        stripes={false}
      />
      <DetailBody content={scholarship.content} showCta={scholarship.showCta} banners={scholarship.banners} />
      <RelatedBlogs posts={related} />
    </>
  );
}
