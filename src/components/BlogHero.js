import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeUpOnLoad } from "@/lib/motion";

// Hero of the blog list page: title and search on the left, image on the right (stacked on mobile).
// The image sits on the bottom edge of the section, so the section has no bottom padding.
export default function BlogHero() {
  return (
    <section className="overflow-hidden bg-[#E4F6FA]">
      <div className="mx-auto grid max-w-7xl items-end gap-8 px-4 pt-10 sm:px-6 md:grid-cols-2 lg:gap-12 lg:px-8">
        <div className="md:self-center md:pb-10">
          <motion.h1 {...fadeUpOnLoad()} className="text-3xl font-bold text-navy sm:text-4xl">
            Blogs
          </motion.h1>
          <motion.p {...fadeUpOnLoad(0.1)} className="mt-4 max-w-lg text-sm text-ink/75">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fermentum nisi eget ante varius, at
            dapibus justo dignissim. Praesent interdum pretium turpis. Suspendisse nec neque sodales, bibendum velit
            id, ultrices augu
          </motion.p>

          {/* Search box - not connected yet: hook it up once the blogs come from real data */}
          <motion.form {...fadeUpOnLoad(0.2)} role="search" className="relative mt-6 max-w-xs">
            <input
              type="search"
              name="q"
              placeholder="Search Topic"
              aria-label="Search blog topics"
              className="w-full rounded-lg border border-ink/10 bg-white py-3 pl-4 pr-11 text-sm shadow-sm outline-none transition focus:border-accent"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-1 top-1/2 -translate-y-1/2 p-2 text-ink transition-colors hover:text-accent"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
              </svg>
            </button>
          </motion.form>
        </div>

        <motion.div {...fadeUpOnLoad(0.3)} className="mx-auto w-full max-w-md md:max-w-none">
          <Image
            src="/images/blog_hero_image.webp"
            alt="Student working on a laptop"
            width={1288}
            height={716}
            priority
            sizes="(min-width: 1280px) 592px, (min-width: 768px) 50vw, (min-width: 480px) 448px, 100vw"
            className="h-auto w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
