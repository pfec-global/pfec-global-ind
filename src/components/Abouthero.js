import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";
import HeroDecorations from "@/components/HeroDecorations";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[#e9faff] py-12 sm:py-16 lg:pb-20 lg:pt-24 2xl:pt-28">
      {/* The ribbon lines with the floating graduation hat and paper plane, the same as the other page heroes */}
      <HeroDecorations />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Breadcrumbs: Home > About PFEC Global */}
        <motion.div {...fadeUp()}>
          <Breadcrumbs items={[{ label: "About PFEC Global" }]} center />
        </motion.div>

        {/* Main Heading */}
        <motion.div {...fadeUp(0.08)} className="mt-7 text-center">
          {/* max-w-3xl: the title stays in the middle, clear of the decorative lines and hat at the sides */}
          <h1 className="mx-auto max-w-3xl font-serif text-3xl font-bold leading-tight text-[#152b96] sm:text-4xl">
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