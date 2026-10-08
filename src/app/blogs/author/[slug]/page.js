import { notFound } from "next/navigation";
import { authors, getAuthorPosts } from "@/data/blogs";
import AuthorHero from "@/components/AuthorHero";
import BlogListing from "@/components/BlogListing";

// Build one page per author
export function generateStaticParams() {
  return authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const author = authors.find((item) => item.slug === slug);
  if (!author) return {};
  return {
    title: `${author.name} - Author | PFEC Global`,
    description: author.bio,
  };
}

export default async function AuthorPage({ params }) {
  const { slug } = await params;
  const author = authors.find((item) => item.slug === slug);
  if (!author) notFound();

  const posts = getAuthorPosts(slug);
  const stats = [
    { label: "Articles Published", value: String(posts.length).padStart(2, "0") },
    { label: "Active Since", value: author.activeSince },
  ];

  return (
    <>
      <AuthorHero author={author} stats={stats} />
      <BlogListing posts={posts} />
    </>
  );
}
