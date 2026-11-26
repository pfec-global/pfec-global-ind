import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeUp, hoverShine } from "@/lib/motion";
import HighlightText from "@/components/HighlightText";

// The partner logos come only from Strapi (the "partnerships" section of GET /api/homepage):
// items ({ name, src }), heading and subheading. There are no built-in logos - without items nothing is shown.
// A heading or subheading Strapi leaves empty (null) is left out.
export default function Partners({ heading, subheading, items }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {(heading || subheading) && (
          <motion.div {...fadeUp()}>
            {heading && <h2 className="text-2xl font-semibold sm:text-3xl"><HighlightText text={heading} /></h2>}
            {subheading && <p className="mt-4 text-sm text-ink/70 sm:text-base">{subheading}</p>}
          </motion.div>
        )}

        {/* Mobile: always 2 logos per row (a leftover odd logo is centred). Tablet and up: one wrapping row -
            on laptops five 220px logos fill the row. */}
        <div className="mt-8 grid grid-cols-2 place-items-center gap-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-6">
          {items.map((partner, i) => (
            <motion.div key={partner.src} {...fadeUp(i * 0.08)} className="last:odd:col-span-2">
              {/* On hover the logo lifts, grows a little and a band of light sweeps across it (hoverShine) */}
              <div className={hoverShine}>
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={220}
                  height={150}
                  className="h-[112px] w-full max-w-[165px] object-contain sm:h-[130px] sm:w-[210px] sm:max-w-none lg:h-[150px] lg:w-[220px]"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
