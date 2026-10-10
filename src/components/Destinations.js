"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import useDragScroll from "@/hooks/useDragScroll";
import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";

const destinations = [
  "Australia",
  "USA",
  "UK",
  "Canada",
  "New Zealand",
  "Ireland",
  "Germany",
  "Europe",
  "Dubai",
  "Malaysia",
];

export default function Destinations() {
  const trackRef = useRef(null);
  useDragScroll(trackRef);
  const pausedRef = useRef(false);

  // Slide the card row left (-1) or right (1) by most of its visible width
  const slide = (direction) => {
    const track = trackRef.current;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  };

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
    <section className="bg-[#f9f9f9] py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp()} className="text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Gain Access to <span className="text-indigo">Top Institutions across the Globe</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-ink/70 sm:text-base">
            PFEC Global is a partner of renowned institutions across 11 countries. Pick a destination below and learn
            everything you need to make an informed decision.
          </p>
        </motion.div>

        <motion.div {...fadeUp(0.15)} className="mt-6 flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous destinations"
            onClick={() => slide(-1)}
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-accent shadow-md transition duration-300 hover:bg-accent hover:text-white sm:flex"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Scrollable card row - swipe on touch screens, arrows on larger screens */}
          <div
            ref={trackRef}
            onMouseEnter={() => (pausedRef.current = true)}
            onMouseLeave={() => (pausedRef.current = false)}
            className="flex min-w-0 flex-1 snap-x snap-mandatory cursor-grab select-none active:cursor-grabbing gap-4 overflow-x-auto py-4 [scrollbar-width:none]"
          >
            {destinations.map((country) => (
              <Link
                key={country}
                href={`/destinations/study-in-${country.toLowerCase().replaceAll(" ", "-")}`}
                className="group relative aspect-3/4 w-[62%] shrink-0 snap-start overflow-hidden rounded-xl shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl sm:w-[38%] md:w-[29%] lg:w-[calc((100%-5rem)/6)]"
              >
                {/* Image placeholder - replace with a next/image photo of the country */}
                <div className="absolute inset-0 flex items-center justify-center bg-linear-to-b from-sky-200 to-sky-600 text-xs text-white/70 transition-transform duration-500 group-hover:scale-110">
                  Image
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/70 to-transparent p-3 pt-10 text-white">
                  <p className="text-sm font-semibold">Study in {country}</p>
                  <p className="mt-1 text-xs text-white/80 transition-colors duration-300 group-hover:text-accent">
                    Learn More &gt;
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <button
            type="button"
            aria-label="Next destinations"
            onClick={() => slide(1)}
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-accent shadow-md transition duration-300 hover:bg-accent hover:text-white sm:flex"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </motion.div>

        <motion.div {...fadeUp(0.2)} className="mt-6 text-center">
          <p className="text-sm text-ink/70 sm:text-base">
            Not sure where to start? Our team of experts can provide free end-to-end assistance
          </p>
          <Link href="#" className="group mt-4 inline-flex items-center gap-3 text-sm font-semibold text-accent">
            Book a FREE Consultation
            <svg
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 12h16m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
