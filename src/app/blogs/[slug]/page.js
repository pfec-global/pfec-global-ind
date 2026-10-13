import { notFound } from "next/navigation";
import { getPost, getRelatedPosts, postSlugs } from "@/data/blogs";
import { getBlogPost, getBlogPostSlugs, getRelatedBlogs, isBlogPreview } from "@/lib/blogs";
import BlogPostHero from "@/components/BlogPostHero";
import DetailBody from "@/components/DetailBody";
import RelatedBlogs from "@/components/RelatedBlogs";

// The page waits for the blog CMS on every visit while caching is switched off.
// This tells Next.js that waiting is expected here. Remove it when caching is switched back on.
export const instant = false;

// One page per post of the blog CMS (the built-in dummy posts if the CMS cannot be reached)
export async function generateStaticParams() {
  const slugs = (await getBlogPostSlugs()) ?? postSlugs;
  return slugs.map((slug) => ({ slug }));
}

// The post: from the blog CMS, or the built-in dummy post if the CMS cannot be reached.
// Returns null when there is no such post.
// query is the ?status=draft&secret=... that Strapi adds to preview an unpublished draft.
async function loadPost(slug, query) {
  const post = await getBlogPost(slug, isBlogPreview(query));
  if (post) return post;
  if (post === null) return null; // the CMS answered: no post with this slug
  return getPost(slug) ?? null;
}

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const post = await loadPost(slug, await searchParams);
  if (!post) return {};

  const title = post.seo?.title ?? post.title;
  const description = post.seo?.description ?? post.summary;
  const url = `${(process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/+$/, "")}/blogs/${slug}`;
  return {
    title: `${title} | PFEC Global`,
    description,
    keywords: post.seo?.keywords,
    alternates: { canonical: url },
    openGraph: { type: "article", title, description, url, images: post.image ? [{ url: post.image }] : undefined },
  };
}

export default async function BlogPostPage({ params, searchParams }) {
  const { slug } = await params;
  const post = await loadPost(slug, await searchParams);
  if (!post) notFound();

  // Related posts: the newest ones of the same category (dummy ones if the CMS cannot be reached)
  const related = (post.tagSlug !== undefined && (await getRelatedBlogs(slug, post.tagSlug))) || getRelatedPosts(slug);

  return (
    <>
      <BlogPostHero post={post} />
      <DetailBody content={post.content} showCta={post.showCta ?? true} banners={post.banners ?? []} />
      <RelatedBlogs posts={related} href={post.tagHref} />
    </>
  );
}
