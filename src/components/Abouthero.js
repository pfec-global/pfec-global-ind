import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";

export default function AboutHero() {
  return (
    <section className="bg-[#e9faff] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Small Label */}
        <motion.div {...fadeUp()} className="text-center">
          <span className="inline-flex rounded-md bg-[#fff1ef] px-8 py-3 text-sm font-medium text-[#ef4b3b]">
            About Us
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.div {...fadeUp(0.08)} className="mt-7 text-center">
          <h1 className="mx-auto max-w-6xl font-serif text-3xl font-bold leading-tight text-[#152b96] sm:text-4xl lg:text-3xl">
            Helping Students Achieve their Study Abroad Dreams with Expert
            Guidance
          </h1>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          {...fadeUp(0.16)}
          className="mx-auto mt-10 max-w-6xl overflow-hidden rounded-[22px] shadow-sm"
        >
          <Image
            src="/images/team-photo.webp"
            alt="PFEC Global team"
            width={1600}
            height={700}
            priority
            className="h-auto w-full object-cover"
          />
        </motion.div>

      </div>
    </section>
  );
}