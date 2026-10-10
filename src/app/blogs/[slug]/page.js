import { notFound } from "next/navigation";
import { getPost, getRelatedPosts, postSlugs } from "@/data/blogs";
import BlogPostHero from "@/components/BlogPostHero";
import DetailBody from "@/components/DetailBody";
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

  return (
    <>
      <BlogPostHero post={post} />
      <DetailBody content={post.content} showCta={post.showCta} banners={post.banners} />
      <RelatedBlogs posts={getRelatedPosts(slug)} href={post.tagHref} />
    </>
  );
}
