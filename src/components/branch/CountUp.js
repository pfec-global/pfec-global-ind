"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1800;

// Counts from 0 to `end` the first time it scrolls into view.
// `decimals` keeps that many digits after the point (e.g. 4.7 needs 1).
export default function CountUp({ end, suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const format = (number) =>
    number.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) + suffix;

  useEffect(() => {
    let frame;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setValue(end);
          return;
        }
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / DURATION_MS, 1);
          // Ease out: fast at first, slowing into the final number.
          setValue(end * (1 - (1 - progress) ** 3));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [end]);

  // The hidden final value reserves the width so nothing shifts while counting.
  return (
    <span ref={ref} className="relative inline-block">
      <span className="opacity-0">{format(end)}</span>
      <span aria-hidden="true" className="absolute inset-y-0 left-0">
        {format(value)}
      </span>
    </span>
  );
}
