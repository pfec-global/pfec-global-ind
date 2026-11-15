// Data of the "Explore & Apply" slider on the Ahmedabad branch page (src/components/branch/Destinations.js).
// Kept out of that client component so the server part (BranchDestinations.js) can read it too:
// a server component only gets a reference, not the values, from a "use client" file.

// The photo and flag of the branch design for each country: a country from Strapi that has none borrows these
// (see src/components/branch/BranchDestinations.js). photo is in public/images/branch/county, flag in
// public/images/branch/country_icon, href is the country page.
export const builtInDestinations = [
  { name: "Australia", href: "/study-in-australia/", link: "Study in Australia", photo: "au.jpg", flag: "australia.png" },
  { name: "United Kingdom", href: "/study-in-uk/", link: "Study in the UK", photo: "uk.jpg", flag: "united kingdom.png" },
  { name: "Canada", href: "/study-in-canada/", link: "Study in Canada", photo: "ca.jpg", flag: "canada.png" },
  { name: "New Zealand", href: "/study-in-new-zealand/", link: "Study in New Zealand", photo: "nz.jpg", flag: "new zealand.png" },
  { name: "USA", href: "/study-in-usa/", link: "Study in the USA", photo: "usa.jpg", flag: "united states.png" },
  { name: "Ireland", href: "/study-in-ireland/", link: "Study in Ireland", photo: "airland.jpg", flag: "ireland.png" },
  { name: "Germany", href: "/study-in-germany/", link: "Study in Germany", photo: "germany.jpg", flag: "germany.png" },
  { name: "Europe", href: "/study-in-europe/", link: "Study in Europe", photo: "europ.jpg", flag: "european union.png" },
  { name: "Dubai", href: "/study-in-dubai/", link: "Study in Dubai", photo: "dubai.jpg", flag: "dubai.png" },
  { name: "Malaysia", href: "/study-in-malaysia/", link: "Study in Malaysia", photo: "malaysia.jpg", flag: "malaysia.png" },
  { name: "Japan", href: "/study-in-japan/", link: "Study in Japan", photo: "japan.jpg", flag: "japan.png" },
];

// A built-in country in the shape the slider draws
export const toItem = ({ name, href, link, photo, flag }) => ({
  name,
  href,
  link,
  image: { src: `/images/branch/county/${photo}`, alt: "" },
  flag: `/images/branch/country_icon/${flag}`,
});
