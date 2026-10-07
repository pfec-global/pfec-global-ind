"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import useDragScroll from "@/hooks/useDragScroll";

// Dummy testimonials - replace with real data
const testimonials = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  text:
    "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. " +
    "Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. " +
    "Velit officia consequat duis enim velit mollit.",
  name: "Floyd Miles",
  course: "Master of Computer Science",
  university: "Swansea University, UK",
  photo: "/images/avater.webp",
}));

const GAP = 16; // gap-4 between cards

export default function Testimonials() {
  const trackRef = useRef(null);
  useDragScroll(trackRef);
  const pausedRef = useRef(false);
  const [pages, setPages] = useState(1);
  const [active, setActive] = useState(0);

  // Work out how many pages of cards there are and which one is showing
  const measure = () => {
    const track = trackRef.current;
    const perPage = Math.round((track.clientWidth + GAP) / (track.firstElementChild.offsetWidth + GAP));
    setPages(Math.ceil(testimonials.length / perPage));
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
    <section className="bg-[#f1f4f8] py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Slider: 1 card per page on mobile, 2 on tablet, 3 on desktop */}
        <div
          ref={trackRef}
          onScroll={measure}
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
          className="grid snap-x snap-mandatory cursor-grab select-none active:cursor-grabbing grid-flow-col auto-cols-[100%] gap-4 overflow-x-auto py-4 [scrollbar-width:none] sm:auto-cols-[calc((100%-1rem)/2)] lg:auto-cols-[calc((100%-2rem)/3)]"
        >
          {testimonials.map((item) => (
            <figure
              key={item.id}
              className="group flex snap-start flex-col rounded-xl border border-black/5 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <blockquote className="line-clamp-6 flex-1 text-sm leading-relaxed">{item.text}</blockquote>

              <figcaption className="mt-5 flex items-center gap-3">
                <Image
                  src={item.photo}
                  alt={item.name}
                  width={56}
                  height={56}
                  className="h-14 w-14 shrink-0 rounded-full"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="mt-0.5 text-xs text-ink/60">{item.course}</p>
                  <p className="mt-0.5 text-xs">{item.university}</p>
                </div>
                <span className="h-10 font-serif text-7xl leading-none text-indigo/20 transition-colors duration-300 group-hover:text-accent/40">
                  &rdquo;
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Dots - one per page */}
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to testimonials page ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-accent" : "w-2 bg-ink/15"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
