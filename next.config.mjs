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
  // Pages that moved to a shorter address; old links are sent to the new one
  async redirects() {
    return [
      { source: "/blogs/category/:slug", destination: "/category/:slug", permanent: true },
      { source: "/blogs/author/:slug", destination: "/author/:slug", permanent: true },
      // Country pages moved from /destinations/<slug> to /<slug>
      { source: "/destinations/:slug", destination: "/:slug", permanent: true },
    ];
  },
  // Lets the blog CMS show a post inside its "preview" panel (see isBlogPreview in src/lib/blogs.js)
  async headers() {
    return [
      {
        source: "/blogs/:slug",
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
