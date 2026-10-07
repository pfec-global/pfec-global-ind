"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuUser, LuGem, LuCrown, LuTrophy } from "react-icons/lu";
import * as motion from "motion/react-client";
import { fadeUp, zoomIn } from "@/lib/motion";

const stats = [
  { value: 22000, decimals: 0, suffix: "+", label: "Students Assisted", Icon: LuUser },
  { value: 550, decimals: 0, suffix: "+", label: "Partner Institutions", Icon: LuGem },
  { value: 96.7, decimals: 1, suffix: "%", label: "Visa Grants", Icon: LuCrown },
  { value: 18, decimals: 0, suffix: "", label: "Years of Expertise", Icon: LuTrophy },
];

export default function Achievements() {
  const sectionRef = useRef(null);
  // Goes from 0 to 1 over two seconds; every number is shown as value * progress
  const [progress, setProgress] = useState(0);

  // Start counting the first time the section scrolls into view
  useEffect(() => {
    let frame;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now) => {
          const t = Math.min((now - start) / 2000, 1);
          setProgress(1 - (1 - t) ** 3); // fast at first, slows down at the end
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.3 },
    );
    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#f9f9f9] py-12 lg:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[2fr_3fr] lg:px-8">
        <div>
          <motion.h2 {...fadeUp()} className="text-2xl font-semibold sm:text-3xl">
            Our <span className="text-indigo">Achievements</span>
          </motion.h2>

          <div className="mt-6 grid max-w-md grid-cols-2 gap-x-6 gap-y-8">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} {...fadeUp(i * 0.1)} className="group">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent transition duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
                  <stat.Icon className="h-5 w-5" />
                </span>
                <p className="mt-3 text-2xl font-bold tabular-nums text-accent">
                  {(stat.value * progress).toLocaleString("en-US", {
                    minimumFractionDigits: stat.decimals,
                    maximumFractionDigits: stat.decimals,
                  })}
                  {stat.suffix}
                </p>
                <p className="mt-1 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <p className="mt-8 max-w-xs text-sm text-ink/70">
            lorem ipsum something something lorem ipsum something something
          </p>
          <Link href="#" className="group mt-4 inline-flex items-center gap-3 text-sm font-semibold text-accent">
            Learn more About us
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
        </div>

        {/* Map with larger office labels for phones */}
        <motion.div {...zoomIn(0.2)} className="md:hidden">
          <Image
            src="/images/world_map.webp"
            alt="World map showing PFEC Global offices in India, Bangladesh, Sri Lanka and Australia"
            width={822}
            height={494}
            sizes="100vw"
            className="mx-auto h-auto w-full max-w-xl"
          />
        </motion.div>
        {/* Detailed map for tablet and desktop */}
        <motion.div {...zoomIn(0.2)} className="hidden md:block">
          <Image
            src="/images/world_map_mobile.webp"
            alt="World map showing PFEC Global offices in India, Bangladesh, Sri Lanka and Australia"
            width={1791}
            height={1031}
            sizes="(min-width: 1024px) 720px, 100vw"
            className="mx-auto h-auto w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
