import { notFound } from "next/navigation";
import { getPost, getRelatedPosts, postSlugs } from "@/data/blogs";
import { getHeadings } from "@/lib/markdown";
import BlogPostHero from "@/components/BlogPostHero";
import BlogToc from "@/components/BlogToc";
import BlogContent from "@/components/BlogContent";
import StudyAbroadCta from "@/components/StudyAbroadCta";
import PromoBanner from "@/components/PromoBanner";
import RelatedBlogs from "@/components/RelatedBlogs";

// Build one page per post
export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: `${post.title} | PFEC Global`, description: post.summary };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  // Dummy data for now - later this becomes the call to the Strapi API
  const post = getPost(slug);
  if (!post) notFound();

  // Every h2 of the markdown becomes one line of the "Jump to Topic" box
  const headings = getHeadings(post.content);
  // The sidebar is optional: it only appears if the post has the promo card or at least one banner
  const hasSidebar = post.showCta || post.banners.length > 0;

  return (
    <>
      <BlogPostHero post={post} />
      <section className="py-8 lg:py-12">
        {/* Content on the left, promo cards on the right (below the content on mobile and tablet).
            Without promo cards the content takes the full width. */}
        <div
          className={`mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:items-start lg:px-8 ${
            hasSidebar ? "lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-12" : ""
          }`}
        >
          {/* The "Jump to Topic" box floats inside this column, so it needs to be next to the content */}
          <div className="min-w-0">
            <BlogToc headings={headings} />
            <div className="mt-8">
              <BlogContent markdown={post.content} headings={headings} />
            </div>
          </div>

          {/* The sidebar floats beside the content while scrolling (desktop only - on smaller screens it is below the content) */}
          {hasSidebar && (
            <div className="mx-auto w-full max-w-xs space-y-6 lg:sticky lg:top-28">
              {post.showCta && <StudyAbroadCta />}
              {post.banners.map((banner) => (
                <PromoBanner key={banner.title} {...banner} />
              ))}
            </div>
          )}
        </div>
      </section>
      <RelatedBlogs posts={getRelatedPosts(slug)} href={post.tagHref} />
    </>
  );
}
