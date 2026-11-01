import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";

export default function AwardsHero() {
  return (
    <section className="bg-[#e8f8fc] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">

        {/* Left Content */}
        <motion.div {...fadeUp()}>
          <span className="inline-flex rounded-md bg-[#fff0ee] px-7 py-3 text-sm font-medium text-[#ef4b3b]">
            Awards and Achievements
          </span>

          <h1 className="mt-7 max-w-xl font-serif text-3xl font-bold leading-tight text-[#17318f] sm:text-4xl lg:text-4xl">
            PFEC Global: Shining with Prestigious Awards!
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-black/80 sm:text-base">
            Our efforts have been recognized with many prestigious accolades
            over the years.
          </p>

          <a
            href="#register-now"
            className="mt-7 inline-flex items-center gap-3 rounded-md bg-[#ef4b3b] px-7 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#d83a2b]"
          >
            Book a FREE Consultation
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>

        {/* Right Hero Image */}
        <motion.div
          {...fadeUp(0.12)}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[650px]">
            <Image
              src="/images/Awards-page-banner-1.webp"
              alt="PFEC Global awards and achievements"
              width={900}
              height={520}
              priority
              className="h-auto w-full object-contain"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}