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

// "New Zealand" -> "new-zealand"
const toSlug = (country) => country.toLowerCase().replaceAll(" ", "-");

// Country details pages: /destinations/study-in-<country>
export const destinations = destinationCountries.map((country) => ({
  country,
  slug: `study-in-${toSlug(country)}`,
  label: `Study in ${country}`,
  href: `/destinations/study-in-${toSlug(country)}`,
}));

// Scholarship details pages: /scholarships/scholarships-in-<country>
export const scholarships = scholarshipCountries.map((country) => ({
  country,
  slug: `scholarships-in-${toSlug(country)}`,
  label: `Scholarships in ${country}`,
  href: `/scholarships/scholarships-in-${toSlug(country)}`,
}));
