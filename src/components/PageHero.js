import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeUpOnLoad } from "@/lib/motion";

// Light hero with the ribbon decorations, shared by the inner pages (destinations, services...).
// tag is optional: a small pill label shown above the title.
export default function PageHero({ tag, titleTop, titleBottom, subtitle }) {
  return (
    <section className="relative overflow-hidden bg-[#f9f9f9] px-4 pb-6 pt-16 text-center sm:px-6 lg:pt-20">
      {/* Decorative ribbon and graduation hat on the left.
          On mobile and tablet they sit faded behind the top of the hero, with a bigger hat so it stays visible. */}
      <motion.div
        {...fadeUpOnLoad(0.3)}
        className="absolute left-0 top-3 w-[44%] opacity-60 sm:w-[30%] lg:top-[4vw] lg:w-[22%] lg:opacity-100 2xl:w-[27%]"
      >
        <Image src="/images/rebon_1.webp" alt="" width={1217} height={282} className="h-auto w-full" />
        {/* The hat floats: slow sideways sway on the span, up-and-down bob with a slight tilt on the image */}
        <span
          className="absolute left-[32%] top-[55%] block w-[20%] animate-hero-drift-x motion-reduce:animate-none lg:w-[14%]"
          style={{ "--drift-x": "10%", animationDuration: "7s" }}
        >
          <Image
            src="/images/graduation_hat.webp"
            alt=""
            width={168}
            height={168}
            className="h-auto w-full animate-hero-drift-y motion-reduce:animate-none"
            style={{ "--drift-y": "14%", "--drift-tilt": "5deg", animationDuration: "4.2s" }}
          />
        </span>
      </motion.div>

      {/* Decorative ribbon and paper plane on the right (same sizes as the left side) */}
      <motion.div
        {...fadeUpOnLoad(0.3)}
        className="absolute right-0 top-3 w-[44%] opacity-60 sm:w-[30%] lg:top-[3.5vw] lg:w-[22%] lg:opacity-100 2xl:w-[27%]"
      >
        <Image src="/images/rebon_2.webp" alt="" width={1211} height={272} className="h-auto w-full" />
        {/* The plane glides: a wider sideways drift than the hat, at a different pace so they never move together */}
        <span
          className="absolute -top-[12%] left-[21%] block w-[20%] animate-hero-drift-x motion-reduce:animate-none lg:w-[14%]"
          style={{ "--drift-x": "28%", animationDuration: "5.5s", animationDelay: "-2s" }}
        >
          <Image
            src="/images/paper_plane.webp"
            alt=""
            width={168}
            height={168}
            className="h-auto w-full animate-hero-drift-y motion-reduce:animate-none"
            style={{ "--drift-y": "18%", "--drift-tilt": "-6deg", animationDuration: "3.6s", animationDelay: "-1s" }}
          />
        </span>
      </motion.div>

      {tag && (
        <motion.span
          {...fadeUpOnLoad()}
          className="relative mb-4 inline-block rounded bg-accent/10 px-3 py-1 text-xs font-semibold text-accent"
        >
          {tag}
        </motion.span>
      )}
      <motion.h1 {...fadeUpOnLoad()} className="relative font-serif text-3xl leading-tight sm:text-4xl xl:text-5xl">
        <span className="text-indigo">{titleTop}</span>
        <br />
        {titleBottom}
      </motion.h1>
      <motion.p
        {...fadeUpOnLoad(0.15)}
        className="relative mx-auto mt-4 max-w-md text-sm text-ink/70 sm:text-base lg:text-lg"
      >
        {subtitle}
      </motion.p>
    </section>
  );
}
