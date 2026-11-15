import { notFound } from "next/navigation";
import { destinationSlugs, getDestination } from "@/data/destinations";
import { getRelatedPosts } from "@/data/blogs";
import { getCountryDetail, getCountrySlugs } from "@/lib/countryDetail";
import { getRelatedBlogs, getRecentBlogPosts } from "@/lib/blogs";
import { toMetadata } from "@/lib/seo";
import DetailHero from "@/components/DetailHero";
import DetailBody from "@/components/DetailBody";
import Universities from "@/components/Universities";
import PopularCourses from "@/components/PopularCourses";
import RelatedBlogs from "@/components/RelatedBlogs";

// Country details page, at the root of the site: /study-in-australia/, /study-in-canada/...
// Shown by src/app/[slug]/page.js, which shares the root of the site with the scholarship pages.

// One page per country in Strapi (the built-in countries if Strapi cannot be reached)
export async function countrySlugs() {
  return (await getCountrySlugs()) ?? destinationSlugs;
}

// The page content: from Strapi, or the built-in dummy page if Strapi cannot be reached.
// Returns null when there is no such country.
async function loadCountry(slug) {
  const cms = await getCountryDetail(slug);
  if (cms) {
    return {
      ...cms,
      titleTop: `Study in ${cms.name}`,
      subtitle:
        cms.shortDescription ??
        "Get comprehensive guidance & end-to-end assistance from expert study abroad mentors for FREE!*",
    };
  }
  if (cms === null) return null; // Strapi answered: no country with this slug

  const fallback = getDestination(slug);
  return fallback
    ? { ...fallback, name: fallback.country, image: { src: fallback.image, alt: "" }, institutions: [], popularCourses: [] }
    : null;
}

export async function countryMetadata(slug) {
  const country = await loadCountry(slug);
  if (!country) return {};
  // SEO tags from the "seo" block of the country in Strapi; the title and subtitle fill any gaps
  return toMetadata(country.seo, { title: `${country.titleTop} | PFEC Global`, description: country.subtitle });
}

export async function CountryPage({ slug }) {
  const country = await loadCountry(slug);
  if (!country) notFound();

  // Blog posts about this country: the blog category has the same slug as the country (study-in-australia).
  // A country without posts gets the newest posts instead, and the dummy posts if the blog CMS cannot be reached.
  const countryPosts = await getRelatedBlogs("", slug);
  const related = countryPosts?.length ? countryPosts : ((await getRecentBlogPosts(8)) ?? getRelatedPosts(slug));

  return (
    <>
      <DetailHero
        titleTop={country.titleTop}
        titleBottom="with Expert Guidance"
        subtitle={country.subtitle}
        image={country.image?.src ?? "/images/study_area_image.webp"}
        imageAlt={country.image?.alt ?? ""}
      />
      <DetailBody content={country.content} showCta banners={country.banners ?? []} />
      {country.institutions.length > 0 && (
        <Universities heading={`Top Institutions in ${country.name}`} groups={country.institutions} />
      )}
      {country.popularCourses.length > 0 && (
        <PopularCourses heading={`Popular Courses in ${country.name}`} items={country.popularCourses} />
      )}
      <RelatedBlogs posts={related} />
    </>
  );
}
