import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";

export default function AwardsHero() {
  return (
    <section className="overflow-hidden bg-[#e8f8fc] pt-12 sm:pt-16 lg:pt-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">

        {/* Left Content */}
        <motion.div {...fadeUp()} className="lg:pb-20">
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
            className="group mt-7 inline-flex items-center gap-3 rounded-md bg-[#ef4b3b] px-7 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#d83a2b]"
          >
            Book a FREE Consultation
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M4 12h16m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>

        {/* Right Hero Image */}
        <motion.div
          {...fadeUp(0.12)}
          className="flex justify-center self-end lg:justify-end"
        >
          <div className="relative aspect-[3/2] w-full max-w-[650px]">
            {/* The three slanted bars behind the people - same colours as in Key Highlights */}
            <span className="absolute bottom-0 left-[3%] top-[14%] w-[20%] -skew-x-[20deg] bg-[#150f92]" />
            <span className="absolute bottom-0 left-[33%] top-[14%] w-[20%] -skew-x-[20deg] bg-[#958bc1]" />
            <span className="absolute bottom-0 left-[63%] top-[14%] w-[20%] -skew-x-[20deg] bg-[#c8cce6]" />
            {/* award.png has a wide empty area on its left: object position frames just the people */}
            <Image
              src="/images/award.png"
              alt="PFEC Global awards and achievements"
              fill
              priority
              // The picture is drawn about twice as wide as its frame (the sides are cut off), and sizes has to say so
              sizes="(min-width: 1024px) 1330px, 205vw"
              className="object-cover object-[93%_bottom]"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}