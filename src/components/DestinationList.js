import Link from "next/link";
import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";
import { destinations } from "@/data/countries";

// Grid of cards that link to the details pages. items is a list of { label, href }:
// the countries by default, or the scholarships on the scholarship list page.
export default function DestinationList({ items = destinations }) {
  return (
    <section className="bg-[#f9f9f9] pb-12 pt-6 lg:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 2 cards per row on mobile, 3 on tablet, 4 on small laptops, 6 on desktop. A leftover last row is centred. */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.href}
              {...fadeUp((i % 6) * 0.06)}
              className="w-[calc((100%-0.75rem)/2)] sm:w-[calc((100%-2rem)/3)] md:w-[calc((100%-3rem)/4)] lg:w-[calc((100%-5rem)/6)]"
            >
              <Link
                href={item.href}
                className="group relative block aspect-3/4 overflow-hidden rounded-xl shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Image placeholder - replace with a next/image photo */}
                <div className="absolute inset-0 flex items-center justify-center bg-linear-to-b from-sky-200 to-sky-600 text-xs text-white/70 transition-transform duration-500 group-hover:scale-110">
                  Image
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/70 to-transparent p-3 pt-10 text-white">
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="mt-1 text-xs text-white/80 transition-colors duration-300 group-hover:text-accent">
                    Learn More &gt;
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp()} className="mt-10 text-center">
          <p className="text-sm text-ink/70 sm:text-base">
            Not sure where to start? Our team of experts can provide free end-to-end assistance
          </p>
          <Link
            href="#"
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-accent px-5 py-2.5 text-sm font-semibold text-accent transition duration-300 hover:bg-accent hover:text-white"
          >
            Book a FREE Consultation
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12h16m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
