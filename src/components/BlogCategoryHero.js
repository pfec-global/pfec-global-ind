import Link from "next/link";
import * as motion from "motion/react-client";
import { fadeUpOnLoad } from "@/lib/motion";

// Hero of the blog category page: back link, title and description, all centred
export default function BlogCategoryHero({ title, description }) {
  return (
    <section className="bg-[#E4F6FA] px-4 py-8 text-center sm:px-6 lg:py-10">
      <motion.div {...fadeUpOnLoad()}>
        <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 12H4m6-6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to All Blogs
        </Link>
      </motion.div>
      <motion.h1 {...fadeUpOnLoad(0.1)} className="mt-4 text-3xl font-bold text-navy sm:text-4xl">
        {title}
      </motion.h1>
      <motion.p {...fadeUpOnLoad(0.2)} className="mx-auto mt-3 max-w-2xl text-sm text-ink/75">
        {description}
      </motion.p>
    </section>
  );
}
