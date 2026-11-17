import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";
import AwardsRow from "@/components/AwardsRow";

// The trophies from the awards page in Strapi (see src/lib/awardPage.js).
// title, awardedBy and year are optional: whatever is filled in shows under the picture.
// Without any awards the section is not drawn at all.
// heading and subheading (from Strapi on the home page): without them the built-in heading is shown;
// passed as null they are left out.
// slider (the home page): smaller pictures in an endless auto-playing row instead of the grid - more than four
// awards are split over two rows that move in opposite directions.
export default function AwardTrophies({ awards, heading, subheading, slider = false }) {
  if (!awards) return null;
  const half = Math.ceil(awards.length / 2);
  const rows = awards.length > 4 ? [awards.slice(0, half), awards.slice(half)] : [awards];

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp()} className="text-center">
          {heading !== null && (
            <h2 className="text-2xl font-bold text-black sm:text-3xl">
              {heading ?? (
                <>
                  Our <span className="text-indigo">Awards</span>
                </>
              )}
            </h2>
          )}
          {subheading !== null && (
            <p className="mt-4 text-sm text-black/70 sm:text-base">
              {subheading ?? "A few of the trophies our universities have presented to PFEC Global."}
            </p>
          )}
        </motion.div>

        {!slider && (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {awards.map((award, index) => (
              <motion.figure
                key={award.id ?? index}
                {...fadeUp((index % 4) * 0.08)}
                // The pictures bring their own white card and shadow, so only the hover lift is added here
                className="transition-transform duration-300 hover:-translate-y-2"
              >
                {/* Every picture gets the same frame (the size most of them are uploaded at, 670 x 1070),
                    so the cards line up even when one is uploaded a little narrower or wider; nothing is cropped */}
                <div className="relative aspect-[670/1070]">
                  <Image
                    src={award.image.src}
                    alt={award.image.alt}
                    fill
                    sizes="(min-width: 1280px) 296px, (min-width: 1024px) 23vw, 48vw"
                    className="object-contain"
                  />
                </div>
                {(award.title || award.awardedBy || award.year) && (
                  <figcaption className="px-2 pt-3 text-center">
                    {award.title && <p className="text-sm font-semibold text-ink">{award.title}</p>}
                    {(award.awardedBy || award.year) && (
                      <p className="mt-1 text-xs text-ink/70">
                        {[award.awardedBy && `Awarded by ${award.awardedBy}`, award.year].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </figcaption>
                )}
              </motion.figure>
            ))}
          </div>
        )}
      </div>

      {/* Full width, outside the container, so the rows run from edge to edge */}
      {slider && (
        <motion.div {...fadeUp(0.1)} className="mt-8 space-y-2">
          {rows.map((row, i) => (
            <AwardsRow key={i} items={row} direction={i === 0 ? 1 : -1} variant="picture" />
          ))}
        </motion.div>
      )}
    </section>
  );
}
