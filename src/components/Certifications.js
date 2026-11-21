import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";

// The certification logos, in groups. Pictures are in public/images/certification.
// height: how tall the logo is drawn (wide logos are kept lower so they don't look too big).
// coin: round badges - they spin like a coin on hover.
const groups = [
  {
    title: "Accreditations",
    logos: [
      { src: "/images/certification/airc.png", alt: "AIRC - American International Recruitment Council, certified through 2030", width: 250, height: 250, coin: true },
      { src: "/images/certification/icef.png", alt: "ICEF Accredited Agency", width: 650, height: 762, coin: true },
    ],
  },
  {
    title: "Professional Certifications",
    logos: [{ src: "/images/certification/qeac.png", alt: "PIER Qualified Education Agent Counsellor (QEAC) #12934", width: 420, height: 650 }],
  },
  {
    title: "Professional Membership",
    logos: [
      { src: "/images/certification/mia.png", alt: "Member of Migration Institute of Australia (MIA)", width: 772, height: 731 },
      { src: "/images/certification/ieaa.png", alt: "IEAA - International Education Association of Australia", width: 281, height: 101, wide: true },
    ],
  },
];

// The light sweeping across the logos: crosses in the first 60% of the time, then waits before the next pass.
// Defined here so the component carries its own animation (React adds it to the page once).
// Draw it once in every section that uses CertLogo.
export function CertShineStyle() {
  return (
    <style href="cert-shine" precedence="default">
      {"@keyframes cert-shine { 0% { background-position: 150% 0; } 60%, 100% { background-position: -50% 0; } }"}
    </style>
  );
}

// One animated logo, shared with the "Recognitions" section (Recognitions.js).
// logo: { src, alt, width, height, coin } - coin: a round badge, it spins like a coin on hover.
// index: its place in the section, so the logos pop in and float one after another.
// className: the height the logo is drawn at.
export function CertLogo({ logo: { coin, alt, ...logo }, index, className }) {
  return (
    // 1. Pops in with a small turn, one logo after another
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay: 0.3 + index * 0.15, type: "spring", stiffness: 260, damping: 15 }}
      className="[perspective:600px]"
    >
      {/* 2. Then floats gently up and down, each logo at its own moment */}
      <div className="animate-tool-float motion-reduce:animate-none" style={{ animationDelay: `${index * -0.6}s` }}>
        {/* 3. On hover: round badges spin like a coin, the others grow and tilt
            (the glow below turns with the logo, as it is inside the same box) */}
        <div
          className={`relative transition-transform duration-700 ease-out ${
            coin ? "hover:[transform:rotateY(360deg)]" : "hover:-rotate-3 hover:scale-110"
          }`}
        >
          <Image {...logo} alt={alt} sizes="180px" className={`block w-auto object-contain ${className}`} />
          {/* 4. A band of light keeps sweeping across the logo. The logo itself is used as a mask,
              so the light only shows on the logo, not on the empty space around it. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 animate-[cert-shine_3.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.85)_50%,transparent_65%)] bg-size-[250%_100%] bg-no-repeat motion-reduce:hidden"
            style={{
              maskImage: `url("${logo.src}")`,
              WebkitMaskImage: `url("${logo.src}")`,
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
              animationDelay: `${index * 0.5}s`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Certifications({
  heading = "Our Professional Certifications, Memberships, and Partnerships",
  subheading = "Prestigious recognitions that speak volumes about the quality of our service.",
}) {
  let logoIndex = 0; // counts the logos across the groups, so they pop in one after another
  return (
    <section className="bg-[#f4f4f4] py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div {...fadeUp()}>
          <h2 className="text-2xl font-semibold sm:text-3xl">{heading}</h2>
          {subheading && <p className="mt-3 text-sm text-ink/70 sm:text-base">{subheading}</p>}
        </motion.div>

        <CertShineStyle />
        <div className="mt-8 flex flex-wrap items-stretch justify-center gap-5 lg:gap-6">
          {groups.map((group, g) => (
            <motion.div
              key={group.title}
              {...fadeUp(0.1 + g * 0.12)}
              className="w-full rounded-2xl bg-white px-6 py-5 shadow-sm ring-1 ring-ink/5 transition-shadow duration-300 hover:shadow-xl sm:w-auto"
            >
              <h3 className="text-base font-semibold">{group.title}</h3>
              <div className="mt-4 flex items-center justify-center gap-5">
                {group.logos.map(({ wide, ...logo }) => (
                  <CertLogo
                    key={logo.src}
                    logo={logo}
                    index={logoIndex++}
                    className={wide ? "h-12 sm:h-14" : "h-24 sm:h-28"}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
