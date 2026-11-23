// Round country flags in public/images/flags, by country slug ("australia", "new-zealand"...).
// Used when Strapi has no flag for a country (e.g. the flag beside "Study in <country>" in the breadcrumbs).
// To add a flag: put the picture in public/images/flags and add its name here with its file type.
const FLAG_FILES = {
  australia: "png",
  bangladesh: "svg",
  canada: "png",
  dubai: "png",
  europe: "png",
  germany: "png",
  india: "svg",
  indonesia: "svg",
  ireland: "png",
  japan: "svg",
  malaysia: "png",
  "new-zealand": "png",
  singapore: "svg",
  "sri-lanka": "svg",
  uk: "png",
  usa: "png",
};

// Other names a country can have in a slug
const ALIASES = {
  "united-kingdom": "uk",
  england: "uk",
  "united-states": "usa",
  "united-states-of-america": "usa",
  us: "usa",
  uae: "dubai",
  "united-arab-emirates": "dubai",
  nz: "new-zealand",
};

// "study-in-australia", "scholarships-in-uk", "australia" -> "/images/flags/australia.png" (undefined when there is none)
export function builtInFlag(slug) {
  const key = String(slug ?? "")
    .toLowerCase()
    .trim()
    .replace(/^(study|scholarships?)-in-/, "");
  const name = FLAG_FILES[key] ? key : ALIASES[key];
  return name ? `/images/flags/${name}.${FLAG_FILES[name]}` : undefined;
}
