import Link from "next/link";
import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";
import { blogCategories, blogSections } from "@/data/blogs";
import BlogHero from "@/components/BlogHero";
import BlogSlider from "@/components/BlogSlider";
import Contact from "@/components/Contact";

export const metadata = {
  title: "Blogs | PFEC Global",
  description:
    "Articles packed with practical advice, trends, and expert perspectives to help you make an informed decision.",
};

export default function BlogsPage() {
  return (
    <>
      <BlogHero />

      {/* Explore by Category bar */}
      <div className="border-b border-ink/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-x-4 gap-y-2 px-4 py-4 text-xs sm:flex-row sm:items-center sm:px-6 sm:text-sm lg:px-8">
          <span className="shrink-0 text-ink/70">Explore by Category:</span>
          {/* Always one row: if the categories do not fit (small phones) the row scrolls sideways instead of wrapping */}
          <ul className="flex min-w-0 items-center divide-x divide-ink/30 overflow-x-auto whitespace-nowrap [scrollbar-width:none]">
            {blogCategories.map((category) => (
              <li key={category.label} className="px-3 first:pl-0 last:pr-0 sm:px-4">
                <Link href={category.href} className="font-semibold text-accent hover:underline">
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="bg-[#f9f9f9] py-10 lg:py-14">
        <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:space-y-14 lg:px-8">
          {/* One slider per section */}
          {blogSections.map((section) => (
            <motion.div key={section.slug} {...fadeUp()} id={section.slug} className="scroll-mt-24">
              {/* Title, a line filling the space in between, and the Explore All button */}
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-indigo sm:text-2xl">{section.title}</h2>
                <span className="h-px flex-1 bg-indigo/40" />
                <Link
                  href={section.href}
                  className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-accent px-3 py-2 text-xs font-semibold text-accent transition duration-300 hover:bg-accent hover:text-white sm:px-4 sm:text-sm"
                >
                  Explore All
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
