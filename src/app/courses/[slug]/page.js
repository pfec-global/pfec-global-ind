import { connection } from "next/server";
import { notFound } from "next/navigation";
import { getCourse, getCourseSlugs, courseFinderHref } from "@/lib/courses";
import { getRelatedPosts } from "@/data/blogs";
import { getRecentBlogPosts } from "@/lib/blogs";
import { toMetadata } from "@/lib/seo";
import DetailHero from "@/components/DetailHero";
import DetailBody from "@/components/DetailBody";
import RelatedBlogs from "@/components/RelatedBlogs";
import FaqSchema from "@/components/FaqSchema";

// Course details page: /courses/nursing/, /courses/education/... - one per study area in Strapi.
// Same layout as the scholarship pages: hero, then the content with its "Jump to Topic" box and FAQ accordion,
// the promo cards beside it, and the newest blog posts under it.

// The page waits for Strapi on every visit while caching is switched off (CACHE_STRAPI in src/lib/strapi.js).
// This tells Next.js that waiting is expected here. Remove it when caching is switched back on.
export const instant = false;

// One page per study area in Strapi. With Cache Components the list must never be empty, or the build fails:
// when Strapi sends none (or cannot be reached during the build) one placeholder slug is listed. Its page is
// a "not found" page, and the real courses are still built when they are first visited.
export async function generateStaticParams() {
  const slugs = await getCourseSlugs();
  return (slugs?.length ? slugs : ["no-courses-yet"]).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  // Rendered on every visit (the page waits for Strapi anyway); without this Next.js reports an unstable
  // Date.now() while it prerenders this route
  await connection();
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) return {};
  // SEO tags from the "seo" block of the study area in Strapi; the name and summary fill any gaps
  return toMetadata(course.seo, {
    title: `Study ${course.name} Abroad | PFEC Global`,
    description: course.summary ?? `Study ${course.name} abroad with free guidance from PFEC Global's experts.`,
  });
}

export default async function CoursePage({ params }) {
  // Rendered on every visit (the page waits for Strapi anyway); without this Next.js reports an unstable
  // Date.now() while it prerenders this route
  await connection();
  const { slug } = await params;
  const course = await getCourse(slug);
  // No such course, or Strapi cannot be reached (there are no built-in courses to fall back to)
  if (!course) notFound();

  // Newest posts of the blog CMS (dummy posts if it cannot be reached)
  const related = (await getRecentBlogPosts(8)) ?? getRelatedPosts(slug);

  return (
    <>
      <DetailHero
        breadcrumbs={[{ label: "Courses", href: "/courses" }, { label: course.name }]}
        titleTop={course.name}
        subtitle={
          course.summary ?? "Get comprehensive guidance & end-to-end assistance from expert study abroad mentors for FREE!*"
        }
        image={course.image?.src ?? "/images/study_area_image.webp"}
        imageAlt={course.image?.alt ?? ""}
        // The course pictures in Strapi are finished designs (slanted shapes, flag and cap built in, see-through
        // background): drawn as uploaded on the grey band, with no photo card, stripes or floating icons of our own
        imageWidth={course.image?.width ?? undefined}
        imageHeight={course.image?.height ?? undefined}
        artwork
      />
      <DetailBody
        content={
          course.content ||
          `${course.name} course details are coming soon. Book a free consultation and our counsellors will guide you.`
        }
        showCta
        banners={[
          ...course.banners,
          {
            title: `Find ${course.name} Universities`,
            text: "Compare institutions and programs across our study destinations on CourseFinder.",
            buttonLabel: "Search on CourseFinder",
            href: courseFinderHref(),
          },
        ]}
      />
      <RelatedBlogs posts={related} />
      <FaqSchema faqs={course.faqs} />
    </>
  );
}
