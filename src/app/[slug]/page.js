import { CountryPage, countryMetadata, countrySlugs } from "./country";
import { ScholarshipPage, scholarshipMetadata, scholarshipSlugs } from "./scholarship";

// One-part addresses at the root of the site, as on the live site:
//   /study-in-australia/        -> country page      (country.js)
//   /scholarships-in-australia/ -> scholarship page  (scholarship.js)
// Next.js allows only one dynamic folder at the root, so both share this one and the slug decides.
// Fixed pages (/contact-us/, /scholarships/...) have their own folders and are matched before this.
// Any other one-part address goes to the country page, which shows the 404 page when there is no such country.

// The page waits for Strapi on every visit while caching is switched off (CACHE_STRAPI in src/lib/strapi.js).
// This tells Next.js that waiting is expected here. Remove it when caching is switched back on.
export const instant = false;

const isScholarship = (slug) => slug.startsWith("scholarships-");

// Every country and every scholarship page
export async function generateStaticParams() {
  const [countries, scholarships] = await Promise.all([countrySlugs(), scholarshipSlugs()]);
  return [...countries, ...scholarships].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return isScholarship(slug) ? scholarshipMetadata(slug) : countryMetadata(slug);
}

export default async function SlugPage({ params }) {
  const { slug } = await params;
  return isScholarship(slug) ? <ScholarshipPage slug={slug} /> : <CountryPage slug={slug} />;
}
