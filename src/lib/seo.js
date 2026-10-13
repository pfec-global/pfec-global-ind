import { toImage } from "@/lib/strapi";

// Turns the "seo" block of a Strapi page into the metadata of a Next.js page (title, description, ...).
// seo = { metaTitle, metaDescription, metaKeywords, canonicalUrl, noIndex, ogImage }.
// fallback = { title, description }: used for whatever Strapi does not send, or when Strapi is down.
export function toMetadata(seo, fallback) {
  const clean = (value) => (typeof value === "string" && value.trim() ? value.trim() : undefined);
  const title = clean(seo?.metaTitle) ?? fallback.title;
  const description = clean(seo?.metaDescription) ?? fallback.description;
  const image = toImage(seo?.ogImage, title);

  return {
    title,
    description,
    keywords: clean(seo?.metaKeywords),
    alternates: clean(seo?.canonicalUrl) ? { canonical: seo.canonicalUrl.trim() } : undefined,
    // noIndex in Strapi hides the page from search engines
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image.src, width: image.width ?? undefined, height: image.height ?? undefined }] : undefined,
    },
  };
}
