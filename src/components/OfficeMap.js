import Image from "next/image";
import * as motion from "motion/react-client";
import { countries, offices } from "@/data/mapOffices";

// The world map of PFEC Global's offices. The offices are listed in src/data/mapOffices.js -
// add a line there and its pin and label appear here by themselves.
//
// The map itself (public/images/world_map/world-dots.svg) is made of the single hexagon dot
// public/images/world_map/Vector.png repeated over every land area. It was generated once with the
// "dotted-map" npm package (not a dependency of the site): Mercator projection, 64 dots high,
// latitudes -56 to 80, longitudes -170 to 190.
// The numbers below come from that generator; they turn a lat / lng into a place on the picture.
// They only need changing if the map picture is generated again with other settings.
const MAP = {
  xMin: -19725813.768568076, // Mercator metres at the map's left edge
  yMax: 15496570.739723718, // ... and top edge
  xRange: 39674266.5187227,
  yRange: 23019533.980988838,
  width: 110, // map size in dots
  height: 64,
  pad: 0.5, // empty margin around the dots, in dots
  viewWidth: 111, // size of the picture's viewBox
  viewHeight: 65,
};
const EARTH_RADIUS = 6378137;

// lat / lng -> { left, top } in % of the map picture
const toMapPosition = (lat, lng) => {
  const x = (EARTH_RADIUS * lng * Math.PI) / 180;
  const y = EARTH_RADIUS * Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
  const dotX = (MAP.width * (x - MAP.xMin)) / MAP.xRange + MAP.pad;
  const dotY = (MAP.height * (MAP.yMax - y)) / MAP.yRange + MAP.pad;
  return { left: (dotX / MAP.viewWidth) * 100, top: (dotY / MAP.viewHeight) * 100 };
};

// Each office with its place on the map and its flag. A line's own lat / lng / flag win over the countries list.
// A country with no known place is left out (and named in the browser console, in development).
const pins = offices.flatMap((office) => {
  const known = countries[office.country] ?? {};
  const lat = office.lat ?? known.lat;
  const lng = office.lng ?? known.lng;
  if (lat == null || lng == null) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`OfficeMap: no lat / lng for "${office.country}" - add it to countries in src/data/mapOffices.js`);
    }
    return [];
  }
  const { left, top } = toMapPosition(lat, lng);
  // Labels go on the right, except near the right edge of the map where they would not fit
  return [{ ...office, flag: office.flag ?? known.flag, left, top, side: office.side ?? (left > 85 ? "left" : "right") }];
});

const mapAlt = `World map showing PFEC Global offices in ${new Intl.ListFormat("en", { type: "conjunction" }).format(
  pins.map((pin) => pin.country),
)}`;

// Where each label goes, measured from the point the pin touches (the pin is about 24px tall, 16px on phones)
const labelPlace = {
  left: "right-2.5 top-[-8px] -translate-y-1/2 sm:right-4 sm:top-[-12px]",
  "left-up": "right-2.5 bottom-1.5 sm:right-4 sm:bottom-2.5",
  "left-down": "right-2.5 top-[-4px] sm:right-4 sm:top-[-6px]",
  right: "left-2.5 top-[-8px] -translate-y-1/2 sm:left-4 sm:top-[-12px]",
  below: "left-1/2 top-1.5 -translate-x-1/2 sm:top-2",
};

// Animation, played once when the map scrolls into view:
// the map fades in, then country after country the pin drops onto its country with a little bounce,
// a ripple starts pulsing under it and its label pops up.
const delayOf = (index) => 0.5 + index * 0.35;
const mapIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};
const pinDrop = (index) => ({
  hidden: { opacity: 0, y: -40 },
  show: { opacity: 1, y: 0, transition: { delay: delayOf(index), type: "spring", stiffness: 420, damping: 14 } },
});
const rippleIn = (index) => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { delay: delayOf(index) + 0.3 } },
});
const labelPop = (index) => ({
  hidden: { opacity: 0, scale: 0.4 },
  show: { opacity: 1, scale: 1, transition: { delay: delayOf(index) + 0.2, type: "spring", stiffness: 380, damping: 18 } },
});

export default function OfficeMap({ className = "" }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={`relative aspect-111/65 w-full ${className}`}
    >
      <motion.div variants={mapIn} className="absolute inset-0">
        <Image
          src="/images/world_map/world-dots.svg"
          alt={mapAlt}
          fill
          unoptimized
          draggable={false}
          className="select-none object-contain"
        />
      </motion.div>

      {pins.map(({ country, count, flag, left, top, side }, index) => (
        // A zero-size box sitting exactly on the country; everything else is placed around it
        <div key={country} className="group absolute" style={{ left: `${left}%`, top: `${top}%` }}>
          {/* Ripple pulsing under the pin */}
          <motion.span
            variants={rippleIn(index)}
            className="absolute left-0 top-0 block h-0 w-0"
            aria-hidden="true"
          >
            <span className="absolute -left-2 -top-2 h-4 w-4 rounded-full bg-accent/40 motion-safe:animate-ping sm:-left-3 sm:-top-3 sm:h-6 sm:w-6" />
            <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-accent/60" />
          </motion.span>

          {/* Location pin: its tip touches the country */}
          <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-full">
            <motion.div variants={pinDrop(index)}>
              <svg
                className="h-4 w-4 text-accent drop-shadow-md transition-transform duration-300 group-hover:-translate-y-1 sm:h-6 sm:w-6"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7z"
                />
                <circle cx="12" cy="9" r="2.6" fill="white" />
              </svg>
            </motion.div>
          </div>

          {/* Label: flag, country and number of offices */}
          <div className={`absolute ${labelPlace[side]}`}>
            <motion.div
              variants={labelPop(index)}
              className="flex items-center gap-1 whitespace-nowrap rounded-md bg-white px-1.5 py-0.5 shadow-md ring-1 ring-ink/5 transition-transform duration-300 group-hover:scale-105 sm:gap-2 sm:px-2.5 sm:py-1.5"
            >
              {/* Flag, when the country has one */}
              {flag && (
                <Image
                  src={flag}
                  alt=""
                  width={20}
                  height={20}
                  className="h-2.5 w-2.5 shrink-0 rounded-full object-cover sm:h-4 sm:w-4"
                />
              )}
              <span className="text-center leading-tight">
                <span className="block text-[8px] font-bold text-accent sm:text-sm">{country}</span>
                <span className="block text-[6px] text-ink/60 sm:text-[10px]">
                  ({count} {count === 1 ? "Office" : "Offices"})
                </span>
              </span>
            </motion.div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
