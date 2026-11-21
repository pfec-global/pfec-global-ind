import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeUp, hoverShine } from "@/lib/motion";

const partners = [
  { name: "PIER - Professional International Education Resources", src: "/images/partner/rpau6p5ie89wvrjipun8.webp" },
  { name: "ICEF Agency Status", src: "/images/partner/hf2cwoohnmtnokkkfuac.webp" },
  {
    name: "Swinburne University of Technology - Platinum Education Agent",
    src: "/images/partner/iyq2zz1vdfw9o3rffwjt.webp",
  },
  { name: "AIRC - American International Recruitment Council", src: "/images/partner/f7jaagienrirztzvgdrp.webp" },
  { name: "IEAA - International Education Association of Australia", src: "/images/partner/sr0mftzhsyrhvmqa8khu.webp" },
];

// heading, subheading and items ({ name, src }) come from Strapi; without them the built-in content is used
// A heading or subheading passed as null is left out (the home page does this for fields Strapi does not send).
export default function Partners({
  heading,
  subheading = "Strong Ties Created by Deep Rooted Industry Connections. Helping Us Provide Top-Notch Service.",
  items = partners,
}) {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div {...fadeUp()}>
          {heading !== null && (
            <h2 className="text-2xl font-semibold sm:text-3xl">
              {heading ?? (
                <>
                  Our Industry <span className="text-indigo">Partnerships</span>
                </>
              )}
            </h2>
          )}
          {subheading && (
            <p className="mt-4 text-sm text-ink/70 sm:text-base">
              {subheading}
            </p>
          )}
        </motion.div>

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
