import { cache } from "react";
import { cacheLife, cacheTag } from "next/cache";

// Talks to the Strapi CMS. Server only: STRAPI_URL and STRAPI_TOKEN never reach the browser.

// Caching is switched off for now: every page view asks Strapi again, so an edit in the CMS shows on the next reload.
// Set this to true to cache the answers (refreshed about once an hour, or straight away when Strapi calls
// /api/revalidate - see src/app/api/revalidate/route.js), and remove "export const instant = false" from src/app/page.js.
const CACHE_STRAPI = false;

// "https://cms.example.com/" -> "https://cms.example.com", so the address works with or without a slash at the end
const withoutSlash = (url) => (url ?? "").trim().replace(/\/+$/, "");

// GET <STRAPI_URL>/api/<path>.
// Throws if the CMS is not configured, cannot be reached or answers with an error.
async function fetchStrapi(path) {
  const { STRAPI_TOKEN } = process.env;
  const url = withoutSlash(process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL);
  if (!url) throw new Error("STRAPI_URL is not set");

  const response = await fetch(`${url}/api/${path}`, {
    headers: STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {},
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`Strapi answered ${response.status} for /api/${path}`);
  return response.json();
}

// The cached version of the same call. A failed call is not cached.
async function fetchStrapiCached(path, tag) {
  "use cache";
  cacheLife("hours");
  cacheTag(tag);
  return fetchStrapi(path);
}

// Returns null instead of failing, so the page can fall back to its built-in content.
// tag is the name used to refresh this answer from the webhook (only matters while caching is on).
// cache(): a page and its SEO tags both need the same answer, so within one page view Strapi is asked only once.
export const getFromStrapi = cache(async function getFromStrapi(path, tag) {
  try {
    return CACHE_STRAPI ? await fetchStrapiCached(path, tag) : await fetchStrapi(path);
  } catch (error) {
    // error.cause holds the real reason behind a plain "fetch failed" (unknown host, certificate problem...)
    const reason = error.cause?.message ?? error.cause?.code;
    console.warn(`[strapi] ${error.message}${reason ? ` (${reason})` : ""} - using the built-in content`);
    return null;
  }
});

// Strapi media -> { src, alt, width, height } for next/image, or null if there is no image.
// Strapi sends "/uploads/..." paths, which need the address of the CMS in front.
export function toImage(media, fallbackAlt = "") {
  if (!media?.url) return null;
  const base = withoutSlash(process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL);
  return {
    src: media.url.startsWith("/") ? `${base}${media.url}` : media.url,
    alt: media.alternativeText || fallbackAlt,
    width: media.width ?? null,
    height: media.height ?? null,
  };
}
