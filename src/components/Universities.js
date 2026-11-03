"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useDragScroll from "@/hooks/useDragScroll";
import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";

// Each name matches a card image in public/images/university/<name>.png
const universities = [
  "Aston University",
  "Bangor University",
  "Birbeck University",
  "Birmingham City University",
  "Brunel University",
  "Canterbury Christ Church University",
  "Cardiff Metropolitan University",
  "Cardiff University",
  "City University of London",
  "Cranfield University",
];

// Built-in list, used when no groups are passed
const defaultGroups = [
  { label: "Universities", logos: universities.map((name) => ({ src: `/images/university/${name}.png`, alt: name })) },
];

// Slider of institution logos.
// groups (optional) is a list of { label, logos: [{ src, alt }] } - e.g. Universities, Private Colleges, TAFEs.
// With more than one group, tabs above the slider switch between them.
export default function Universities({ heading = "Study at a top global University with PFEC", groups = defaultGroups }) {
  const [activeTab, setActiveTab] = useState(0);
  const logos = groups[activeTab]?.logos ?? [];
  const trackRef = useRef(null);
  useDragScroll(trackRef);
  const pausedRef = useRef(false);

  // Autoplay: move one card every 3 seconds, back to the start after the last card.
  // Paused while the mouse is over the slider.
  useEffect(() => {
    const timer = setInterval(() => {
      if (pausedRef.current) return;
      const track = trackRef.current;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;
      const step = track.firstElementChild.offsetWidth + 16; // card width + gap-4
      track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + step, behavior: "smooth" });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#f1f4f8] py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2 {...fadeUp()} className="text-center text-2xl font-bold text-indigo sm:text-3xl">
          {heading}
        </motion.h2>

        {groups.length > 1 && (
          <motion.div {...fadeUp(0.1)} role="tablist" className="mt-6 flex flex-wrap justify-center gap-2">
            {groups.map((group, i) => (
              <button
                key={group.label}
                type="button"
                role="tab"
                aria-selected={i === activeTab}
                onClick={() => {
                  setActiveTab(i);
                  trackRef.current.scrollTo({ left: 0 });
                }}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors duration-300 sm:text-sm ${
                  i === activeTab
                    ? "border-accent bg-accent text-white"
                    : "border-ink/15 bg-white text-ink hover:border-accent hover:text-accent"
                }`}
              >
                {group.label}
              </button>
            ))}
          </motion.div>
        )}

        <motion.div {...fadeUp(0.15)}>
          {/* Slider: 2 cards on mobile, 3 on tablet, 4 on small laptops, 5 on desktop */}
          <div
            ref={trackRef}
            onMouseEnter={() => (pausedRef.current = true)}
            onMouseLeave={() => (pausedRef.current = false)}
            className="mt-4 flex cursor-grab snap-x snap-mandatory select-none gap-4 overflow-x-auto py-4 [scrollbar-width:none] active:cursor-grabbing"
          >
            {logos.map((logo) => (
              <Link
                key={logo.src}
                href="#"
                className="w-[calc((100%-1rem)/2)] shrink-0 snap-start transition duration-300 hover:-translate-y-1.5 sm:w-[calc((100%-2rem)/3)] md:w-[calc((100%-3rem)/4)] lg:w-[calc((100%-4rem)/5)]"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={456}
                  height={326}
                  sizes="(min-width: 1024px) 240px, (min-width: 640px) 33vw, 50vw"
                  className="h-auto w-full"
                />
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.2)} className="mt-4 text-center">
          <p className="text-sm text-ink/70 sm:text-base">You may be eligible for these renowned institutions.</p>
          <Link
            href="#"
            className="group mt-4 inline-flex items-center gap-2 rounded-lg border border-accent px-5 py-2.5 text-sm font-semibold text-accent transition duration-300 hover:bg-accent hover:text-white"
          >
            Get a free profile assessment
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12h16m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
