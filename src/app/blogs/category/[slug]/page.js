import { notFound } from "next/navigation";
import { categories, getCategoryPosts } from "@/data/blogs";
import BlogCategoryHero from "@/components/BlogCategoryHero";
import BlogListing from "@/components/BlogListing";

// Build one page per category
export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) return {};
  return {
    title: `${category.title} | PFEC Global`,
    description: category.description,
  };
}

export default async function BlogCategoryPage({ params }) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();

  return (
    <>
      <BlogCategoryHero title={category.title} description={category.description} />
      <BlogListing posts={getCategoryPosts(slug)} />
    </>
  );
}
