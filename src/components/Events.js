"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import useDragScroll from "@/hooks/useDragScroll";
import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";

// Dummy events - replace with real data
const events = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  date: "24 Nov",
  location: "PFEC Office, Ahmedabad",
  type: "In-person Event",
  title: "Study Abroad Fair",
  description: "1-2 line short description goes here1-2 line short description goes here",
}));

export default function Events() {
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
              Join us at our <span className="text-indigo">Upcoming Events</span>
            </h2>
            <p className="mt-3 text-sm text-ink/70 sm:text-base">
              Take your study abroad dreams further with our roster of offline and online events
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
          {/* Slider: one row of cards on mobile and tablet, two rows on desktop */}
          <div
            ref={trackRef}
            onMouseEnter={() => (pausedRef.current = true)}
            onMouseLeave={() => (pausedRef.current = false)}
            className="mt-4 grid snap-x snap-mandatory cursor-grab select-none active:cursor-grabbing grid-flow-col grid-rows-1 auto-cols-[85%] gap-4 overflow-x-auto py-4 [scrollbar-width:none] sm:auto-cols-[calc((100%-1rem)/2)] lg:grid-rows-2 lg:auto-cols-[calc((100%-2rem)/3)]"
          >
            {events.map((event) => (
              <article
                key={event.id}
                className="group snap-start overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                {/* Image placeholder - replace with a next/image of the event */}
                <div className="h-32 overflow-hidden">
                  <div className="flex h-full items-center justify-center bg-linear-to-br from-indigo/20 to-indigo/50 text-xs text-white transition-transform duration-500 group-hover:scale-110">
                    Image
                  </div>
                </div>

                <div className="flex">
                  <div className="flex w-24 shrink-0 flex-col items-center justify-center gap-2 bg-accent p-3 text-center text-white sm:w-28">
                    <p className="text-xl">{event.date}</p>
                    <p className="flex items-start gap-1 text-left text-[10px] leading-tight">
                      <svg
                        className="mt-0.5 h-3 w-3 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" strokeLinejoin="round" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                      {event.location}
                    </p>
                  </div>

                  <div className="p-4">
                    <span className="rounded bg-accent/10 px-2 py-1 text-[10px] font-medium text-accent">
                      {event.type}
                    </span>
                    <h3 className="mt-2 font-semibold">{event.title}</h3>
                    <p className="mt-1 text-xs text-ink/70">{event.description}</p>
                    <Link href="#" className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-accent">
                      Register Now
                      <svg
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 12h16m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.2)} className="mt-4 text-center">
          <Link
            href="#"
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
