import { notFound } from "next/navigation";
import { categories, getCategoryPosts } from "@/data/blogs";
import { getBlogCategory, getBlogCategorySlugs } from "@/lib/blogs";
import BlogHero from "@/components/BlogHero";
import BlogListing from "@/components/BlogListing";
import { plainText } from "@/components/HighlightText";

// The page waits for the blog CMS on every visit while caching is switched off.
// This tells Next.js that waiting is expected here. Remove it when caching is switched back on.
export const instant = false;

// One page per category of the blog CMS (the built-in categories if the CMS cannot be reached)
export async function generateStaticParams() {
  const slugs = (await getBlogCategorySlugs()) ?? categories.map((category) => category.slug);
  return slugs.map((slug) => ({ slug }));
}

// The category with its posts: from the blog CMS, or the built-in dummy category if the CMS cannot be reached.
// Returns null when there is no such category.
async function loadCategory(slug) {
  const category = await getBlogCategory(slug);
  if (category) {
    return {
      name: category.name,
      title: `${category.name} Blogs`,
      description: `Articles, guides and updates about ${category.name}, written by the PFEC Global team.`,
      posts: category.posts,
    };
  }
  if (category === null) return null; // the CMS answered: no category with this slug

  const fallback = categories.find((item) => item.slug === slug);
  return fallback ? { name: fallback.name, title: fallback.title, description: fallback.description, posts: getCategoryPosts(slug) } : null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await loadCategory(slug);
  if (!category) return {};
  return { title: `${plainText(category.title)} | PFEC Global`, description: category.description };
}

export default async function BlogCategoryPage({ params }) {
  const { slug } = await params;
  const category = await loadCategory(slug);
  if (!category) notFound();

  return (
    <>
      {/* The same hero as the blog list page, with Home > Blog > the category as breadcrumbs */}
      <BlogHero
        title={category.title}
        description={category.description}
        breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: category.name }]}
        showSearch={false}
      />
      <BlogListing posts={category.posts} />
    </>
  );
}
