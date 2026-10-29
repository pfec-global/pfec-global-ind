import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";

const highlights = [
  "Earning a multitude of esteemed awards and honors, PFEC Global stands tall in its years of remarkable operation.",

  "With a rich history of more than a decade, PFEC Global boasts numerous honors and awards that set us apart and fuel our drive to gain industry wide acclaim.",

  "Our team's unmatched expertise and unwavering dedication are key to propelling us to unparalleled success in the consultancy industry.",

  "Let's proudly present a glimpse of the remarkable accolades we've garnered throughout our journey as a devoted higher education and award-winning education agency.",
];

export default function KeyHighlights() {
  return (
    <section className="bg-[#28358f] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div {...fadeUp()} className="text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Key Highlights
          </h2>
        </motion.div>

        {/* Highlights Grid */}
        <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2 lg:gap-x-16">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              {...fadeUp(index * 0.08)}
              className="flex items-start gap-5"
            >
              {/* Decorative Slash */}
              <span
                aria-hidden="true"
                className="mt-2 block h-6 w-3 shrink-0 -skew-x-12 bg-white"
              />

              {/* Text */}
              <p className="text-base font-semibold leading-7 text-white sm:text-lg">
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}