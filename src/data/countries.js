// The countries that have a details page, and the links to those pages.
// Kept apart from the page content so the navbar can list the links without loading the content.

const destinationCountries = [
  "Australia",
  "USA",
  "UK",
  "Canada",
  "Ireland",
  "New Zealand",
  "Malaysia",
  "Japan",
  "Europe",
  "Dubai",
  "Indonesia",
  "Germany",
  "Singapore",
];

const scholarshipCountries = ["Australia", "USA", "UK", "Canada", "Ireland", "New Zealand"];

// Round flags in public/images/flags. These three are drawn as SVG; the others are PNGs taken from the hero labels.
const svgFlags = ["Japan", "Singapore", "Indonesia"];

// "New Zealand" -> "new-zealand"
const toSlug = (country) => country.toLowerCase().replaceAll(" ", "-");

const flagOf = (country) => `/images/flags/${toSlug(country)}.${svgFlags.includes(country) ? "svg" : "png"}`;

// The round flag for a country or scholarship page: "/scholarships-in-new-zealand" -> "/images/flags/new-zealand.png".
// undefined when there is no flag for that country.
export function countryFlag(href) {
  const slug = (href ?? "").replace(/^\/|\/$/g, "").replace(/^(study|scholarships)-in-/, "");
  const country = destinationCountries.find((name) => toSlug(name) === slug);
  return country ? flagOf(country) : undefined;
}

// Country details pages: /study-in-<country>
export const destinations = destinationCountries.map((country) => ({
  country,
  slug: `study-in-${toSlug(country)}`,
  label: `Study in ${country}`,
  href: `/study-in-${toSlug(country)}`,
  flag: flagOf(country),
}));

// Scholarship details pages: /scholarships-in-<country>/
export const scholarships = scholarshipCountries.map((country) => ({
  country,
  slug: `scholarships-in-${toSlug(country)}`,
  label: `Scholarships in ${country}`,
  href: `/scholarships-in-${toSlug(country)}`,
  flag: flagOf(country),
}));
