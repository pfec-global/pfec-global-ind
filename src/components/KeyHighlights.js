import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";

const highlights = [
  "Earning a multitude of esteemed awards and honors, PFEC Global stands tall in its years of remarkable operation.",

  "With a rich history of more than a decade, PFEC Global boasts numerous honors and awards that set us apart and fuel our drive to gain industry wide acclaim.",

  "Our team's unmatched expertise and unwavering dedication are key to propelling us to unparalleled success in the consultancy industry.",

  "Let's proudly present a glimpse of the remarkable accolades we've garnered throughout our journey as a devoted higher education and award-winning education agency.",
];

// The three slanted bars on the right, darkest first
const bars = ["bg-[#150f92]", "bg-[#958bc1]", "bg-[#c8cce6]"];

export default function KeyHighlights() {
  return (
    <section className="bg-[#f9f9f9] py-12 sm:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[3fr_2fr] lg:gap-16 lg:px-8">
        <div>
          {/* Heading */}
          <motion.div {...fadeUp()}>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Key <span className="text-indigo">Highlights</span>
            </h2>
          </motion.div>

          {/* Highlights list */}
          <div className="mt-6 space-y-5">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                {...fadeUp(index * 0.08)}
                className="flex items-start gap-4"
              >
                {/* Decorative Slash */}
                <span
                  aria-hidden="true"
                  className="mt-1.5 block h-5 w-2 shrink-0 -skew-x-12 bg-[#150f92]"
                />

                {/* Text */}
                <p className="max-w-2xl text-sm leading-6 text-ink sm:text-base">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative bars - desktop only */}
        <motion.div
          {...fadeUp(0.15)}
          aria-hidden="true"
          className="hidden h-64 justify-center gap-[6%] px-[8%] lg:flex"
        >
          {bars.map((color) => (
            <span key={color} className={`h-full w-1/4 -skew-x-[20deg] ${color}`} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
