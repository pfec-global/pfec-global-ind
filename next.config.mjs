// Images uploaded in Strapi are served from the CMS, so next/image has to be allowed to load them
const strapiUrl = new URL(process.env.NEXT_PUBLIC_STRAPI_URL || "https://cms.pfecglobal.in");
// The blog posts and their cover images come from a separate CMS (see src/lib/blogs.js)
const blogCmsUrl = new URL(process.env.BLOG_CMS_URL || "https://countrycms.pfecglobal.com");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  // Every address ends in "/", like the live site: /contact-us/, /study-in-australia/ ("/contact-us" redirects there)
  trailingSlash: true,
  // The addresses follow the live site (pfecglobal.in). Earlier addresses of this site send visitors
  // and search engines to the new one (308 permanent redirects).
  async redirects() {
    return [
      // About Us and its two pages
      { source: "/aboutus/awards-and-achievements", destination: "/awards-and-achievements/", permanent: true },
      { source: "/aboutus/our-leadership-team", destination: "/our-leadership-team/", permanent: true },
      { source: "/aboutus", destination: "/about-pfec-global/", permanent: true },
      { source: "/about-us/awards-and-achievements", destination: "/awards-and-achievements/", permanent: true },
      { source: "/about-us/our-leadership-team", destination: "/our-leadership-team/", permanent: true },
      { source: "/about-us", destination: "/about-pfec-global/", permanent: true },
      // Services: the list page, and the service pages that were under /services/
      { source: "/services", destination: "/service-archive-page/", permanent: true },
      { source: "/services/:slug", destination: "/:slug/", permanent: true },
      // Destinations: the list page, and the country pages that were under /destinations/
      { source: "/destinations", destination: "/destination-page/", permanent: true },
      { source: "/destinations/:slug", destination: "/:slug/", permanent: true },
      // Scholarship pages were under /scholarships/ (the list page itself stays at /scholarships/)
      { source: "/scholarships/:slug", destination: "/:slug/", permanent: true },
      // Blog: /blogs -> /blog. Categories and authors moved out of it earlier.
      { source: "/blogs/category/:slug", destination: "/category/:slug/", permanent: true },
      { source: "/blogs/author/:slug", destination: "/author/:slug/", permanent: true },
      { source: "/blogs", destination: "/blog/", permanent: true },
      { source: "/blogs/:slug", destination: "/blog/:slug/", permanent: true },
    ];
  },
  // Lets the blog CMS show a post inside its "preview" panel (see isBlogPreview in src/lib/blogs.js)
  async headers() {
    return [
      {
        source: "/blog/:slug",
        headers: [{ key: "Content-Security-Policy", value: `frame-ancestors 'self' ${blogCmsUrl.origin}` }],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: strapiUrl.protocol.replace(":", ""),
        hostname: strapiUrl.hostname,
        port: strapiUrl.port,
        pathname: "/**",
      },
      {
        protocol: blogCmsUrl.protocol.replace(":", ""),
        hostname: blogCmsUrl.hostname,
        port: blogCmsUrl.port,
        pathname: "/**",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
