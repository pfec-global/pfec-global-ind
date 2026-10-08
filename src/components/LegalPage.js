import * as motion from "motion/react-client";
import { fadeUpOnLoad } from "@/lib/motion";

// Layout shared by the text-only pages (privacy policy, terms of use).
// The page passes plain h2 / h3 / p / ul / ol / a tags as children and they are styled here.
export default function LegalPage({ tag = "Documentation", title, children }) {
  return (
    <section className="bg-[#f9f9f9] px-4 pb-12 pt-12 sm:px-6 lg:pb-16 lg:pt-20">
      <div className="text-center">
        <motion.span
          {...fadeUpOnLoad()}
          className="mb-4 inline-block rounded bg-accent/10 px-3 py-1 text-xs font-semibold text-accent"
        >
          {tag}
        </motion.span>
        <motion.h1
          {...fadeUpOnLoad()}
          className="font-serif text-3xl leading-tight text-indigo sm:text-4xl xl:text-5xl"
        >
          {title}
        </motion.h1>
      </div>

      <motion.div
        {...fadeUpOnLoad(0.15)}
        className="mx-auto mt-8 max-w-4xl text-sm leading-relaxed text-ink/75 lg:mt-12 [&_a]:break-words [&_a]:text-accent [&_a]:underline [&_h2]:mt-6 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-ink sm:[&_h2]:text-xl [&_h3]:mt-4 [&_h3]:font-semibold [&_h3]:text-ink [&_li]:mt-1 [&_ol]:mt-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mt-2 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-6"
      >
        {children}
      </motion.div>
    </section>
  );
}
