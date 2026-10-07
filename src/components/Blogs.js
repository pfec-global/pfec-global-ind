"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import useDragScroll from "@/hooks/useDragScroll";
import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";

// Dummy blog posts - replace with real data
const posts = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: "Why Should you study in Australia in 2025?",
  href: "#",
}));

const GAP = 16; // gap-4 between cards

export default function Blogs() {
  const trackRef = useRef(null);
  useDragScroll(trackRef);
  const pausedRef = useRef(false);
  const [pages, setPages] = useState(1);
  const [active, setActive] = useState(0);

  // Work out how many pages of cards there are and which one is showing
  const measure = () => {
    const track = trackRef.current;
    const perPage = Math.round((track.clientWidth + GAP) / (track.firstElementChild.offsetWidth + GAP));
    setPages(Math.ceil(posts.length / perPage));
    setActive(Math.round(track.scrollLeft / (track.clientWidth + GAP)));
  };

  const goTo = (page) => {
    const track = trackRef.current;
    track.scrollTo({ left: page * (track.clientWidth + GAP), behavior: "smooth" });
  };

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);

    // Autoplay every 5 seconds, paused while the mouse is over the slider
    const timer = setInterval(() => {
      if (pausedRef.current) return;
      const track = trackRef.current;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;
      track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + track.clientWidth + GAP, behavior: "smooth" });
    }, 5000);

    return () => {
      window.removeEventListener("resize", measure);
      clearInterval(timer);
    };
  }, []);

  return (
    <section className="bg-[#f9f9f9] py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp()} className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Insights to Keep You Ahead</h2>
            <p className="mt-3 text-sm text-ink/70 sm:text-base">
              Explore articles packed with practical advice, trends, and expert perspectives to help you make an
              informed decision
            </p>
          </div>
          <Link
            href="#"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-accent px-5 py-2.5 text-sm font-semibold text-accent transition duration-300 hover:bg-accent hover:text-white"
          >
            Explore All
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12h16m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

        <motion.div {...fadeUp(0.15)}>
          {/* Slider: 1 card per page on mobile, 2 on tablet, 4 on desktop */}
          <div
            ref={trackRef}
            onScroll={measure}
            onMouseEnter={() => (pausedRef.current = true)}
            onMouseLeave={() => (pausedRef.current = false)}
            className="mt-4 grid cursor-grab snap-x snap-mandatory select-none grid-flow-col auto-cols-[100%] gap-4 overflow-x-auto py-4 [scrollbar-width:none] active:cursor-grabbing sm:auto-cols-[calc((100%-1rem)/2)] lg:auto-cols-[calc((100%-3rem)/4)]"
          >
            {posts.map((post) => (
              <Link
                key={post.id}
                href={post.href}
                className="group relative aspect-4/3 snap-start overflow-hidden rounded-xl shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                {/* Image placeholder - replace with a next/image of the blog cover */}
                <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-slate-300 to-slate-500 text-xs text-white/80 transition-transform duration-500 group-hover:scale-110">
                  Image
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/70 to-transparent p-4 pt-12">
                  <h3 className="text-sm text-white transition-colors duration-300 group-hover:text-accent sm:text-base">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Dots - one per page */}
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to blog page ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-accent" : "w-2 bg-ink/15"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
