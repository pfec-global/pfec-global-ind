import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { fadeUpOnLoad } from "@/lib/motion";

// Hero of the country and scholarship details pages: light blue band with the title, subtitle and
// consultation button on the left, a photo on the right and slanted stripes in the bottom right corner.
// Mobile: text first, then the photo.
// floatingIcons: shows the graduation hat and paper plane floating faded in the background (mobile and tablet only).

// One floating background icon: slow sideways sway on the span, up-and-down bob with a slight tilt on the image
function FloatingIcon({ src, className, driftX, tilt, duration, delay }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute block animate-hero-drift-x opacity-60 motion-reduce:animate-none lg:hidden ${className}`}
      style={{
        "--drift-x": driftX,
        animationDuration: `${duration * 1.6}s`,
        animationDelay: delay,
      }}
    >
      <Image
        src={src}
        alt=""
        width={168}
        height={168}
        className="h-auto w-full animate-hero-drift-y motion-reduce:animate-none"
        style={{
          "--drift-y": "16%",
          "--drift-tilt": tilt,
          animationDuration: `${duration}s`,
          animationDelay: delay,
        }}
      />
    </span>
  );
}

export default function DetailHero({
  titleTop,
  titleBottom,
  subtitle,
  image,
  imageAlt = "",
  floatingIcons = false,
}) {
  return (
    <section className="relative overflow-hidden bg-[#e3f3fb]">
      {/* Slanted stripes behind the photo */}
      <div
        aria-hidden="true"
        className="absolute -bottom-2 right-0 flex h-2/5 -skew-x-[20deg] gap-2 sm:gap-3 lg:right-[4%] lg:h-[45%]"
      >
        <div className="w-12 bg-[#6a62c4] sm:w-20 lg:w-24" />
        <div className="w-12 bg-[#aeb1df] sm:w-20 lg:w-24" />
        <div className="w-12 bg-[#cdd6ee] sm:w-20 lg:w-24" />
      </div>

      {floatingIcons && (
        <FloatingIcon
          src="/images/paper_plane.webp"
          className="right-5 top-4 w-10 sm:w-12"
          driftX="28%"
          tilt="-6deg"
          duration={3.6}
          delay="-1s"
        />
      )}

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-14">
        <div>
          <motion.h1
            {...fadeUpOnLoad()}
            className="font-serif text-3xl leading-tight sm:text-4xl xl:text-5xl"
          >
            <span className="text-indigo">{titleTop}</span>
            <br />
            {titleBottom}
          </motion.h1>
          <motion.p
            {...fadeUpOnLoad(0.15)}
            className="mt-4 max-w-lg text-sm sm:text-base lg:text-lg"
          >
            {subtitle}
          </motion.p>
          <motion.div {...fadeUpOnLoad(0.3)} className="relative mt-6">
            {/* The hat floats in the empty space to the right of the button */}
            {floatingIcons && (
              <FloatingIcon
                src="/images/graduation_hat.webp"
                className="right-4 top-0 w-10 sm:w-12"
                driftX="12%"
                tilt="5deg"
                duration={4.2}
                delay="0s"
              />
            )}
            <Link
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Book a FREE Consultation
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M4 12h16m-6-6l6 6-6 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        </div>

        <motion.div
          {...fadeUpOnLoad(0.2)}
          className="relative mx-auto aspect-video w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-lg"
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 576px, 100vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
