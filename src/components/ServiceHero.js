import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeUpOnLoad } from "@/lib/motion";

export default function ServiceHero({
  tag,
  titleTop,
  titleBottom,
  subtitle,
  image,
  buttonText = "Book a Free Consultation",
  buttonHref = "#",
}) {
  return (
    <section className="overflow-hidden bg-[#e5f7fb]">
      <div className="mx-auto grid max-w-7xl items-end gap-8 px-5 pt-10 sm:px-8 lg:grid-cols-2 lg:gap-10 lg:px-10 lg:pt-16">

        {/* Left Content */}
        <div className="pb-8 lg:pb-12">
          {/* Tag */}
          <motion.span
            {...fadeUpOnLoad()}
            className="inline-block rounded-sm bg-[#fff1ef] px-3 py-2 text-xs font-medium text-[#f15a4a] sm:text-sm"
          >
            {tag}
          </motion.span>

          {/* Heading */}
          <motion.h1
            {...fadeUpOnLoad(0.1)}
            className="mt-5 max-w-2xl font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-[36px]"
          >
            <span className="text-[#17318f]">{titleTop}</span>
            <br />
            <span className="text-black">{titleBottom}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            {...fadeUpOnLoad(0.2)}
            className="mt-6 max-w-xl text-base leading-7 text-black sm:text-lg sm:leading-8"
          >
            {subtitle}
          </motion.p>

          {/* CTA */}
          <motion.div {...fadeUpOnLoad(0.3)} className="mt-7">
            <a
              href={buttonHref}
              className="inline-flex items-center gap-3 rounded-lg bg-[#f4513b] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#e84430] hover:shadow-lg sm:px-6 sm:py-3.5 sm:text-base"
            >
              {buttonText}

              <span className="text-xl leading-none">
                →
              </span>
            </a>
          </motion.div>
        </div>

        {/* Right Banner Image */}
        <motion.div
          {...fadeUpOnLoad(0.2)}
          className="relative flex h-full items-end justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[650px]">
            <Image
              src={image}
              alt={tag}
              width={900}
              height={600}
              priority
              className="h-auto w-full object-contain"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}