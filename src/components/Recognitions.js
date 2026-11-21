import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";
import { CertLogo, CertShineStyle } from "@/components/Certifications";

// "Recognitions": one row of logos, shown under "Our Professional Certifications, Memberships, and Partnerships".
// The logos move the same way as the certification logos (CertLogo in Certifications.js): they pop in one after
// another, float, a light keeps sweeping across them, and on hover round badges spin like a coin, the others tilt.
// Pictures are in public/images/certification. className: how tall the logo is drawn (wide logos are kept lower).
const logos = [
  {
    src: "/images/certification/pier-logo.png",
    alt: "PIER - Professional International Education Resources",
    width: 1060,
    height: 835,
    className: "h-16 sm:h-20",
  },
  {
    src: "/images/certification/icef.png",
    alt: "ICEF Agency Status #2660",
    width: 650,
    height: 762,
    coin: true,
    className: "h-28 sm:h-36",
  },
  {
    src: "/images/certification/swin-bur-ne.png",
    alt: "Swinburne University of Technology - Platinum Education Agent",
    width: 1254,
    height: 1254,
    coin: true,
    className: "h-28 sm:h-36",
  },
  {
    src: "/images/certification/airc.png",
    alt: "AIRC - American International Recruitment Council, certified through 2030",
    width: 250,
    height: 250,
    coin: true,
    className: "h-28 sm:h-36",
  },
  {
    src: "/images/certification/ieaa.png",
    alt: "IEAA - International Education Association of Australia",
    width: 281,
    height: 101,
    className: "h-10 sm:h-12",
  },
];

export default function Recognitions({ heading = "Recognitions" }) {
  return (
    <section className="bg-[#f8f8f8] py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h2 {...fadeUp()} className="text-2xl font-semibold sm:text-3xl">
          {heading}
        </motion.h2>

        <CertShineStyle />
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 lg:gap-x-16">
          {logos.map(({ className, ...logo }, index) => (
            <CertLogo key={logo.src} logo={logo} index={index} className={className} />
          ))}
        </div>
      </div>
    </section>
  );
}
