import { readdir } from "node:fs/promises";
import path from "node:path";
import { connection } from "next/server";
import { countryHref } from "@/lib/homepage";
import { getCountrySlugs } from "@/lib/countryDetail";
import { getScholarshipSlugs } from "@/lib/scholarshipDetail";
import { getEventSlugs } from "@/lib/eventDetail";
import { getBlogAuthorSlugs, getBlogCategorySlugs, getBlogPostSlugs } from "@/lib/blogs";

// /sitemap.xml - every page of the site, built fresh on each request so new content shows up by itself:
//   - the fixed pages: every page.js under src/app (so a page added to the code is listed automatically)
//   - the pages made from the CMS: countries, scholarships, events, blog posts, blog categories and authors
// The full address of each page starts with NEXT_PUBLIC_SITE_URL from .env (e.g. https://pfecglobal.com.bd).

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");

// Used when src/app cannot be read on the server (e.g. a build deployed without the source files)
const FALLBACK_PAGES = [
  "/",
  "/about-us",
  "/about-us/awards-and-achievements",
  "/about-us/our-leadership-team",
  "/blogs",
  "/contact-us",
  "/destinations",
  "/events",
  "/privacy-policy",
  "/scholarships",
  "/services",
  "/services/admission-support",
  "/services/health-insurance",
  "/services/student-accommodations",
  "/services/visa-services",
  "/terms-of-use",
];

// Folders that are not part of the address: route groups "(name)", private "_name", parallel "@name"
const skipsInUrl = (name) => /^\(.*\)$/.test(name);
const notAPage = (name) => name.startsWith("_") || name.startsWith("@") || name === "api";

// Every page.js under src/app that has no [slug] part -> its address ("/", "/about-us", ...)
// The turbopackIgnore comments stop the build from copying the whole project into the server bundle
// because of this folder scan. Where the source files are not on the server, FALLBACK_PAGES is used instead.
async function findStaticPages(dir = path.join(/*turbopackIgnore: true*/ process.cwd(), "src", "app"), url = "") {
  const entries = await readdir(/*turbopackIgnore: true*/ dir, { withFileTypes: true });
  const pages = entries.some((entry) => entry.isFile() && /^page\.(js|jsx|ts|tsx|mdx)$/.test(entry.name)) ? [url || "/"] : [];
  for (const entry of entries) {
    if (!entry.isDirectory() || notAPage(entry.name) || entry.name.includes("[")) continue;
    const childUrl = skipsInUrl(entry.name) ? url : `${url}/${entry.name}`;
    pages.push(...(await findStaticPages(path.join(/*turbopackIgnore: true*/ dir, entry.name), childUrl)));
  }
  return pages;
}

// How important a page is, and how often it changes (hints for search engines)
function hints(url) {
  if (url === "/") return { changeFrequency: "daily", priority: 1 };
  if (/^\/(blogs|events)(\/|$)/.test(url)) return { changeFrequency: "weekly", priority: 0.7 };
  if (/^\/(privacy-policy|terms-of-use)$/.test(url)) return { changeFrequency: "yearly", priority: 0.3 };
  if (/^\/(category|author)\//.test(url)) return { changeFrequency: "weekly", priority: 0.5 };
  return { changeFrequency: "monthly", priority: 0.8 };
}

// CMS slugs -> addresses. Some slugs were saved with spaces around them, which would make broken links: trimmed here.
const list = (slugs, toUrl) =>
  Array.isArray(slugs)
    ? slugs
        .filter((slug) => typeof slug === "string" && slug.trim())
        .map((slug) => toUrl(slug.trim()))
    : [];

export default async function sitemap() {
  // Build the list on every request, never once at build time, so it always matches the CMS
  await connection();

  const [staticPages, countries, scholarships, events, posts, categories, authors] = await Promise.all([
    findStaticPages().catch(() => FALLBACK_PAGES),
    getCountrySlugs(),
    getScholarshipSlugs(),
    getEventSlugs(),
    getBlogPostSlugs(),
    getBlogCategorySlugs(),
    getBlogAuthorSlugs(),
  ]);

  const urls = [
    ...staticPages,
    ...list(countries, countryHref),
    ...list(scholarships, (slug) => `/scholarships/${slug}`),
    ...list(events, (slug) => `/events/${slug}`),
    ...list(posts, (slug) => `/blogs/${slug}`),
    ...list(categories, (slug) => `/category/${slug}`),
    ...list(authors, (slug) => `/author/${slug}`),
  ];

  const now = new Date();
  return [...new Set(urls)].sort().map((url) => ({
    // encodeURI: an address with a space or another special character is written the way browsers send it
    url: `${SITE_URL}${url === "/" ? "" : encodeURI(url)}`,
    lastModified: now,
    ...hints(url),
  }));
}
