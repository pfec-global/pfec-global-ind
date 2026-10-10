import { notFound } from "next/navigation";
import { getScholarship, scholarshipSlugs } from "@/data/scholarships";
import { getRelatedPosts } from "@/data/blogs";
import DetailHero from "@/components/DetailHero";
import DetailBody from "@/components/DetailBody";
import RelatedBlogs from "@/components/RelatedBlogs";

// Build one page per scholarship page
export function generateStaticParams() {
  return scholarshipSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const scholarship = getScholarship(slug);
  if (!scholarship) return {};
  return { title: `${scholarship.titleTop} | PFEC Global`, description: scholarship.subtitle };
}

// Same page as a blog post (markdown body, "Jump to Topic" box, sidebar, related blogs) with a different hero
export default async function ScholarshipPage({ params }) {
  const { slug } = await params;
  // Dummy data for now - later this becomes the call to the Strapi API
  const scholarship = getScholarship(slug);
  if (!scholarship) notFound();

  return (
    <>
      <DetailHero
        titleTop={scholarship.titleTop}
        titleBottom={scholarship.titleBottom}
        subtitle={scholarship.subtitle}
        image={scholarship.image}
        floatingIcons
      />
      <DetailBody content={scholarship.content} showCta={scholarship.showCta} banners={scholarship.banners} />
      <RelatedBlogs posts={getRelatedPosts(slug)} />
    </>
  );
}
