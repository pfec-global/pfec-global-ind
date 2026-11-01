"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import EventCard from "@/components/EventCard";
import useDragScroll from "@/hooks/useDragScroll";
import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";

// Built-in dummy events, used when Strapi does not send any. image: null shows the placeholder.
const events = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  date: "24 Nov",
  location: "PFEC Office, Ahmedabad",
  type: "In-person Event",
  title: "Study Abroad Fair",
  description: "1-2 line short description goes here1-2 line short description goes here",
  image: null,
}));

// heading, subheading and items come from Strapi; without them the built-in content is used
export default function Events({
  heading,
  subheading = "Take your study abroad dreams further with our roster of offline and online events",
  items = events,
}) {
  const trackRef = useRef(null);
  useDragScroll(trackRef);
  const pausedRef = useRef(false);

  // Slide by one column: forward (1) or back (-1). Going forward from the end returns to the start.
  const slide = (direction) => {
    const track = trackRef.current;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;
    if (direction === 1 && atEnd) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      const step = track.firstElementChild.offsetWidth + 16; // card width + gap-4
      track.scrollBy({ left: direction * step, behavior: "smooth" });
    }
  };

  // Autoplay every 4 seconds, paused while the mouse is over the slider
  useEffect(() => {
    const timer = setInterval(() => {
      if (!pausedRef.current) slide(1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#f4f4f4] py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp()} className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              {heading ?? (
                <>
                  Join us at our <span className="text-indigo">Upcoming Events</span>
                </>
              )}
            </h2>
            <p className="mt-3 text-sm text-ink/70 sm:text-base">
              {subheading}
            </p>
          </div>

          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              aria-label="Previous events"
              onClick={() => slide(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-accent shadow-md transition duration-300 hover:bg-accent hover:text-white"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next events"
              onClick={() => slide(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-accent shadow-md transition duration-300 hover:bg-accent hover:text-white"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.15)}>
          {/* Slider: one row of cards on mobile and tablet. On desktop three cards fit side by side,
              so a second row is only used when there are more than three events.
              "safe center" centres the cards when they do not fill the row, and does nothing once they overflow. */}
          <div
            ref={trackRef}
            onMouseEnter={() => (pausedRef.current = true)}
            onMouseLeave={() => (pausedRef.current = false)}
            className={`mt-4 grid snap-x snap-mandatory cursor-grab select-none active:cursor-grabbing grid-flow-col grid-rows-1 auto-cols-[85%] gap-4 [justify-content:safe_center] overflow-x-auto py-4 [scrollbar-width:none] sm:auto-cols-[calc((100%-1rem)/2)] lg:auto-cols-[calc((100%-2rem)/3)] ${
              items.length > 3 ? "lg:grid-rows-2" : ""
            }`}
          >
            {items.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.2)} className="mt-4 text-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 rounded-lg border border-accent px-5 py-2.5 text-sm font-semibold text-accent transition duration-300 hover:bg-accent hover:text-white"
          >
            Explore all Events
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12h16m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
