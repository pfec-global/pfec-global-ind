import Link from "next/link";
import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";
import { blogCategories, blogSections } from "@/data/blogs";
import { getBlogSections } from "@/lib/blogs";
import BlogHero from "@/components/BlogHero";
import BlogCategoryBar from "@/components/BlogCategoryBar";
import BlogSlider from "@/components/BlogSlider";
import Contact from "@/components/Contact";

export const metadata = {
  title: "Blogs | PFEC Global",
  description:
    "Articles packed with practical advice, trends, and expert perspectives to help you make an informed decision.",
};

// The page waits for the blog CMS on every visit while caching is switched off.
// This tells Next.js that waiting is expected here. Remove it when caching is switched back on.
export const instant = false;

export default async function BlogsPage() {
  // The posts come from the blog CMS, grouped by category (12 newest per category).
  // If the CMS cannot be reached, the built-in dummy sections are shown instead.
  const cmsSections = await getBlogSections();
  const sections = cmsSections ?? blogSections;
  // The "Explore by Category" bar lists the categories that have posts
  const categories = cmsSections
    ? cmsSections.map((section) => ({ label: section.name, href: section.href }))
    : blogCategories;

  return (
    <>
      <BlogHero />

      <BlogCategoryBar categories={categories} />

      <section className="bg-[#f9f9f9] py-10 lg:py-14">
        <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:space-y-14 lg:px-8">
          {/* One slider per category */}
          {sections.map((section) => (
            <motion.div key={section.slug} {...fadeUp()} id={section.slug} className="scroll-mt-24">
              {/* Title, a line filling the space in between, and the Explore All button */}
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-indigo sm:text-2xl">{section.title}</h2>
                <span className="h-px flex-1 bg-indigo/40" />
                <Link
                  href={section.href}
                  className="group inline-flex shrink-0 items-center gap-2 rounded-lg border border-accent px-3 py-2 text-xs font-semibold text-accent transition duration-300 hover:bg-accent hover:text-white sm:px-4 sm:text-sm"
                >
                  Explore All
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 12h16m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
              <div className="mt-2">
                <BlogSlider posts={section.posts} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Same component as the home page */}
      <Contact />
    </>
  );
}
