import { notFound } from "next/navigation";
import { getDestination, destinationSlugs } from "@/data/destinations";
import { getRelatedPosts } from "@/data/blogs";
import DetailHero from "@/components/DetailHero";
import DetailBody from "@/components/DetailBody";
import RelatedBlogs from "@/components/RelatedBlogs";

// Build one page per country
export function generateStaticParams() {
  return destinationSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) return {};
  return { title: `${destination.titleTop} | PFEC Global`, description: destination.subtitle };
}

// Same page as a blog post (markdown body, "Jump to Topic" box, sidebar, related blogs) with a different hero
export default async function DestinationPage({ params }) {
  const { slug } = await params;
  // Dummy data for now - later this becomes the call to the Strapi API
  const destination = getDestination(slug);
  if (!destination) notFound();

  return (
    <>
      <DetailHero
        titleTop={destination.titleTop}
        titleBottom={destination.titleBottom}
        subtitle={destination.subtitle}
        image={destination.image}
      />
      <DetailBody content={destination.content} showCta={destination.showCta} banners={destination.banners} />
      <RelatedBlogs posts={getRelatedPosts(slug)} />
    </>
  );
}
