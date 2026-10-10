import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { fadeUpOnLoad } from "@/lib/motion";

// Country labels on the desktop banner. left/top are % of the banner, width/height are the image's pixel size.
const heroLabels = [
  { name: "Australia", file: "australia", width: 169, height: 55, left: 3.22, top: 62.2 },
  { name: "UK", file: "uk", width: 109, height: 55, left: 11.22, top: 19.3 },
  { name: "USA", file: "usa", width: 121, height: 55, left: 18.59, top: 7.4 },
  { name: "Dubai", file: "dubai", width: 141, height: 55, left: 25.59, top: 12.7 },
  { name: "Malaysia", file: "malaysia", width: 167, height: 55, left: 32.5, top: 25.9 },
  { name: "Canada", file: "canada", width: 159, height: 55, left: 60.32, top: 26 },
  { name: "Europe", file: "europe", width: 139, height: 52, left: 66.07, top: 19.2 },
  { name: "Ireland", file: "ireland", width: 151, height: 55, left: 73.49, top: 41.2 },
  { name: "New Zealand", file: "new-zealand", width: 217, height: 55, left: 81.85, top: 21.3 },
  { name: "Germany", file: "germany", width: 175, height: 55, left: 88.98, top: 48.6 },
];

// Same labels on the mobile banner (811 x 461), which stacks them in two columns beside the student
const heroLabelsMobile = [
  { name: "Europe", file: "europe", width: 139, height: 52, left: 11.22, top: 0 },
  { name: "UK", file: "uk", width: 93, height: 48, left: 3.95, top: 17.79 },
  { name: "USA", file: "usa", width: 105, height: 48, left: 15.29, top: 33.84 },
  { name: "New Zealand", file: "new-zealand", width: 188, height: 48, left: 4.32, top: 49.89 },
  { name: "Ireland", file: "ireland", width: 131, height: 48, left: 0, top: 66.38 },
  { name: "Dubai", file: "dubai", width: 123, height: 48, left: 10.48, top: 88.07 },
  { name: "Canada", file: "canada", width: 137, height: 48, left: 76.33, top: 2.6 },
  { name: "Australia", file: "australia", width: 146, height: 48, left: 69.91, top: 22.13 },
  { name: "Germany", file: "germany", width: 152, height: 48, left: 81.38, top: 43.17 },
  { name: "Malaysia", file: "malaysia", width: 145, height: 48, left: 75.59, top: 59 },
];

// Gives every label its own speed, distance and starting point on each axis.
// The values are fixed per label (not Math.random) so the server and browser render the same thing.
const spread = (i, salt) => ((i * 3 + salt * 7) % 10) / 10; // 0 to 0.9, jumps around from one label to the next

function driftStyle(i, axis) {
  if (axis === "x") {
    return {
      "--drift-x": `${6 + spread(i, 1) * 8}%`,
      animationDuration: `${6 + spread(i, 2) * 4}s`,
      animationDelay: `${-spread(i, 3) * 10}s`,
    };
  }
  return {
    "--drift-y": `${28 + spread(i, 4) * 22}%`,
    "--drift-tilt": `${(i % 2 ? -1 : 1) * (1 + spread(i, 5) * 2)}deg`,
    animationDuration: `${3.4 + spread(i, 6) * 2.6}s`,
    animationDelay: `${-spread(i, 7) * 8}s`,
  };
}

// The floating country labels. Placed in % of the banner so they keep their spot at every size;
// each one wanders on its own path (hero-drift-x / hero-drift-y in globals.css).
function CountryLabels({ labels, folder, bannerWidth }) {
  return labels.map((label, i) => (
    <motion.div
      key={label.name}
      {...fadeUpOnLoad(0.8 + i * 0.08)}
      className="absolute"
      style={{ left: `${label.left}%`, top: `${label.top}%`, width: `${(label.width / bannerWidth) * 100}%` }}
    >
      <span className="block animate-hero-drift-x motion-reduce:animate-none" style={driftStyle(i, "x")}>
        <Image
          src={`/images/${folder}/${label.file}.png`}
          alt={label.name}
          width={label.width}
          height={label.height}
          className="h-auto w-full animate-hero-drift-y motion-reduce:animate-none"
          style={driftStyle(i, "y")}
        />
      </span>
    </motion.div>
  ));
}

export default function Hero() {
  return (
    <section className="overflow-hidden bg-linear-to-b from-navy to-indigo text-white">
      <div className="mx-auto max-w-7xl px-4 pt-10 text-center sm:px-6 lg:px-8 lg:pt-12">
        {/* Figma: Yeseva One Regular 52, line height auto, white fill, 1px black stroke on the outside.
            CSS strokes are centred on the letter edge, so a 2px stroke painted behind the fill leaves 1px outside. */}
        <motion.h1
          {...fadeUpOnLoad()}
          className="font-serif text-3xl font-normal leading-[normal] [-webkit-text-stroke:2px_#000] [paint-order:stroke_fill] sm:text-4xl lg:text-[52px]"
        >
          Your Study Abroad Dream
          <br />
          is our only Priority!
        </motion.h1>
        <motion.p {...fadeUpOnLoad(0.15)} className="mt-4 text-base text-white/85 sm:text-lg lg:text-xl">
          From education to visas, we&apos;ve got your back.
        </motion.p>
        <motion.div {...fadeUpOnLoad(0.3)} className="mt-6">
          <Link
            href="#"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold hover:opacity-90"
          >
            Book a FREE Consultation
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12h16m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Mobile banner - stripes, student and country labels are separate images (811 x 461 in Figma) */}
      <motion.div
        {...fadeUpOnLoad(0.4)}
        className="relative mx-auto mt-8 aspect-[811/461] w-full max-w-xl md:hidden"
      >
        <Image
          src="/images/homepage-hero-mobile/stripes.png"
          alt=""
          width={774}
          height={376}
          className="absolute bottom-0 left-[1.73%] h-auto w-[95.44%]"
        />
        <Image
          src="/images/homepage-hero-mobile/student.png"
          alt="Graduate student surrounded by study destination flags"
          width={456}
          height={456}
          priority
          sizes="(min-width: 576px) 324px, 57vw"
          className="absolute bottom-0 left-[24.17%] h-auto w-[56.23%]"
        />
        <CountryLabels labels={heroLabelsMobile} folder="homepage-hero-mobile" bannerWidth={811} />
      </motion.div>

      {/* Desktop banner - a little wider than the screen on tablets so the student stays a readable size */}
      <motion.div
        {...fadeUpOnLoad(0.4)}
        className="relative mx-auto mt-8 hidden max-w-7xl justify-center md:flex lg:mt-4"
      >
        {/* Slanted stripes behind the student */}
        <div className="absolute bottom-0 top-[40%] flex -skew-x-[20deg] gap-[1.5vw]">
          <div className="w-[8vw] bg-white/10" />
          <div className="w-[8vw] bg-white/10" />
          <div className="w-[8vw] bg-white/10" />
        </div>
        <div className="relative w-[150%] max-w-none shrink-0 lg:w-full">
          <Image
            src="/images/homepage-hero/banner.png"
            alt="Graduate student with landmarks of study destinations around the world"
            width={3338}
            height={978}
            priority
            sizes="(min-width: 1024px) 1280px, 150vw"
            className="h-auto w-full"
          />
          <CountryLabels labels={heroLabels} folder="homepage-hero" bannerWidth={3338} />
        </div>
      </motion.div>
    </section>
  );
}
