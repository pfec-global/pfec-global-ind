import Image, { getImageProps } from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { fadeUpOnLoad, shineSweep } from "@/lib/motion";
import { PlaneRibbon } from "@/components/HeroDecorations";
import Breadcrumbs from "@/components/Breadcrumbs";

// Hero of the country and scholarship details pages: light blue band with the title, subtitle and
// consultation button on the left, a photo on the right and slanted stripes in the bottom right corner.
// Mobile: text first, then the photo. On laptops the ribbon line with the gliding paper plane sits above the photo.
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

// The band of light for an artwork picture. The picture has see-through edges, so the band is masked by the picture
// itself and only lights up its solid parts. The mask is Next.js's resized copy of the picture (/_next/image),
// served from this site, so a picture from Strapi works as a mask too.
function ArtworkShine({ image, width, height }) {
  const mask = getImageProps({ src: image, alt: "", width: 640, height: Math.round((640 * height) / width) }).props.src;
  const maskStyle = { maskImage: `url("${mask}")`, WebkitMaskImage: `url("${mask}")`, maskSize: "100% 100%", WebkitMaskSize: "100% 100%" };
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden" style={maskStyle}>
      <span className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/75 to-transparent transition-[left] duration-700 group-hover:left-[150%]" />
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
  // stripes: the three slanted bars behind the photo (switched off on the country and scholarship pages)
  stripes = true,
  // artwork (the course pages): light grey band, and the picture drawn exactly as uploaded - the course pictures
  // in Strapi are finished designs with their own frame, shadow and slanted shapes built in, so the stripes and the
  // white photo card are left out. imageWidth / imageHeight: the picture's size, so it keeps its shape.
  artwork = false,
  imageWidth,
  imageHeight,
  // background (optional): the colour of the band, e.g. "bg-[#e3f3fb]". Without it: grey for an artwork picture,
  // light blue for a photo. The country and scholarship pages keep light blue whichever kind of picture they have.
  background,
  breadcrumbs,
}) {
  return (
    <section className={`relative overflow-hidden ${background ?? (artwork ? "bg-[#f9f9f9]" : "bg-[#e3f3fb]")}`}>
      {/* Slanted stripes behind the photo */}
      {stripes && !artwork && (
        <div
          aria-hidden="true"
          className="absolute -bottom-2 right-0 flex h-2/5 -skew-x-[20deg] gap-2 sm:gap-3 lg:right-[4%] lg:h-[45%]"
        >
          <div className="w-12 bg-[#6a62c4] sm:w-20 lg:w-24" />
          <div className="w-12 bg-[#aeb1df] sm:w-20 lg:w-24" />
          <div className="w-12 bg-[#cdd6ee] sm:w-20 lg:w-24" />
        </div>
      )}

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
          {/* breadcrumbs (optional, [{ label, href }] after Home): where the page sits in the site, above the title */}
          {breadcrumbs && (
            <motion.div {...fadeUpOnLoad()} className="mb-5">
              <Breadcrumbs items={breadcrumbs} />
            </motion.div>
          )}
          <motion.h1
            {...fadeUpOnLoad()}
            className="font-serif text-3xl leading-tight sm:text-4xl xl:text-5xl"
          >
            <span className="text-indigo">{titleTop}</span>
            {/* titleBottom is optional: without it the title is just the blue line */}
            {titleBottom && (
              <>
                <br />
                {titleBottom}
              </>
            )}
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

        {artwork ? (
          // The picture as uploaded: a finished design with its own frame and shapes, so nothing is drawn around it
          <motion.div {...fadeUpOnLoad(0.2)} className="mx-auto w-full max-w-2xl lg:max-w-none">
            {/* On hover the picture lifts, grows a little and a band of light sweeps across it */}
            <div className="group relative transition duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.02] motion-reduce:transition-none">
              <Image
                src={image}
                alt={imageAlt}
                width={imageWidth ?? 1240}
                height={imageHeight ?? 732}
                priority
                sizes="(min-width: 1280px) 620px, (min-width: 1024px) 48vw, (min-width: 672px) 672px, 100vw"
                className="h-auto w-full"
              />
              <ArtworkShine image={image} width={imageWidth ?? 1240} height={imageHeight ?? 732} />
            </div>
          </motion.div>
        ) : (
          // The photo with the ribbon line and paper plane just above it (laptops only, like the service pages)
          <div className="relative mx-auto w-full max-w-xl lg:mt-24">
            <PlaneRibbon className="bottom-full left-[8%] mb-8 hidden w-[55%] lg:block" />
            <motion.div {...fadeUpOnLoad(0.2)}>
              {/* On hover: the card lifts, the photo zooms in slowly and a band of light sweeps across it (shineSweep).
                  Kept on this inner box: the outer one's position is driven by the fade-in animation. */}
              <div
                className={`group relative aspect-video w-full overflow-hidden rounded-2xl bg-white shadow-lg transition duration-500 hover:-translate-y-1.5 hover:shadow-2xl ${shineSweep}`}
              >
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 576px, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                />
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
