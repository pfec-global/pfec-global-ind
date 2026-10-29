import Link from "next/link";
import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";

export default function Scholarship() {
  return (
    <section className="bg-indigo px-4 py-12 text-center text-white sm:px-6 lg:py-16">
      <motion.h2 {...fadeUp()} className="mx-auto max-w-3xl text-balance text-2xl font-semibold leading-snug sm:text-3xl">
        You may be eligible for up to 50% Scholarship at a renowned University Abroad
      </motion.h2>
      <motion.p {...fadeUp(0.15)} className="mt-4 text-sm text-white/85 sm:text-base">
        Check your eligibility and receive end to end assistance for FREE!
      </motion.p>
      <motion.div {...fadeUp(0.3)} className="mt-6">
        <Link
          href="#"
          className="group inline-flex items-center gap-3 rounded-lg bg-accent px-5 py-3 text-sm font-semibold shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30"
        >
          Get Started
          <svg
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 12h16m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </motion.div>
    </section>
  );
}
