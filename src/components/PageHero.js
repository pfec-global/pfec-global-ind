import * as motion from "motion/react-client";
import { fadeUpOnLoad } from "@/lib/motion";
import HeroDecorations from "@/components/HeroDecorations";
import Breadcrumbs from "@/components/Breadcrumbs";

// Light hero with the ribbon decorations, shared by the inner pages (destinations, services...).
// tag is optional: a small pill label shown above the title.
// breadcrumbs (optional, [{ label, href }] after Home): shown instead of the tag.
export default function PageHero({ tag, titleTop, titleBottom, subtitle, breadcrumbs }) {
  return (
    <section className="relative overflow-hidden bg-[#f9f9f9] px-4 pb-6 pt-16 text-center sm:px-6 lg:pt-20">
      <HeroDecorations />

      {breadcrumbs ? (
        <motion.div {...fadeUpOnLoad()} className="relative mb-4">
          <Breadcrumbs items={breadcrumbs} center />
        </motion.div>
      ) : (
        tag && (
          <motion.span
            {...fadeUpOnLoad()}
            className="relative mb-4 inline-block rounded bg-accent/10 px-3 py-1 text-xs font-semibold text-accent"
          >
            {tag}
          </motion.span>
        )
      )}
      <motion.h1 {...fadeUpOnLoad()} className="relative font-serif text-3xl leading-tight sm:text-4xl xl:text-5xl">
        <span className="text-indigo">{titleTop}</span>
        <br />
        {titleBottom}
      </motion.h1>
      <motion.p
        {...fadeUpOnLoad(0.15)}
        className="relative mx-auto mt-4 max-w-md text-sm text-ink/70 sm:text-base lg:text-lg"
      >
        {subtitle}
      </motion.p>
    </section>
  );
}
