import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";

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

export default function Partners() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div {...fadeUp()}>
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Our Industry <span className="text-indigo">Partnerships</span>
          </h2>
          <p className="mt-4 text-sm text-ink/70 sm:text-base">
            Strong Ties Created by Deep Rooted Industry Connections. Helping Us Provide Top-Notch Service.
          </p>
        </motion.div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {partners.map((partner, i) => (
            <motion.div key={partner.name} {...fadeUp(i * 0.08)}>
              <Image
                src={partner.src}
                alt={partner.name}
                width={200}
                height={120}
                className="h-[84px] w-[140px] object-contain transition duration-300 hover:-translate-y-1.5 hover:scale-105 sm:h-[120px] sm:w-[200px]"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
