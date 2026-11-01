"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

// Pixels per second of the automatic movement
const SPEED = 40;

function AwardCard({ item }) {
  return (
    <div className="group flex w-72 shrink-0 flex-col overflow-hidden rounded-xl border border-black/5 bg-white shadow-[0_4px_15px_rgba(0,0,0,0.10)] transition-shadow duration-300 hover:shadow-[0_14px_35px_rgba(0,0,0,0.16)]">
      {/* Logo Section */}
      <div className="flex min-h-[125px] flex-col items-center justify-center bg-white px-5 py-4">
        <span className="mb-1 text-[10px] text-black/40">
          Recognized by
        </span>

        <div className="relative h-[70px] w-full">
          <Image
            src={item.logo}
            alt={`${item.name} logo`}
            fill
            draggable={false}
            className="object-contain transition-transform duration-500 group-hover:scale-105"
            sizes="288px"
          />
        </div>
      </div>

      {/* Awards Content */}
      <div className="flex-1 bg-[#fff9e8] px-6 py-5">
        <ul className="space-y-2 text-sm leading-5 text-black/80">
          {item.awards.map((award) => (
            <li
              key={award}
              className="flex items-start gap-2"
            >
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-black/70" />

              <span>{award}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// One endless row of award cards. direction 1 moves to the left, -1 to the right.
// The cards are drawn twice: when one full set has passed, the row jumps back by exactly that distance,
// which looks the same, so the row never reaches an end - also when dragged by hand in either direction.
// The movement pauses while the mouse is over the row, and "reduce motion" switches it off (dragging still works).
export default function AwardsRow({ items, direction = 1 }) {
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const hoveredRef = useRef(false);
  const dragRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame;
    let last = performance.now();

    const tick = (now) => {
      const seconds = Math.min((now - last) / 1000, 0.1); // a hidden tab must not cause a big jump
      last = now;
      if (!reducedMotion && !hoveredRef.current && !dragRef.current) {
        offsetRef.current += direction * SPEED * seconds;
      }
      // Width of one set of cards, including the gap after it
      const setWidth = track.children[items.length].offsetLeft - track.children[0].offsetLeft;
      offsetRef.current = ((offsetRef.current % setWidth) + setWidth) % setWidth;
      track.style.transform = `translateX(${-offsetRef.current}px)`;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [direction, items.length]);

  const onPointerDown = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { x: event.clientX, offset: offsetRef.current };
  };

  const onPointerMove = (event) => {
    if (dragRef.current) offsetRef.current = dragRef.current.offset - (event.clientX - dragRef.current.x);
  };

  const onPointerEnd = () => {
    dragRef.current = null;
  };

  return (
    <div
      onPointerEnter={(event) => event.pointerType === "mouse" && (hoveredRef.current = true)}
      onPointerLeave={() => (hoveredRef.current = false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      className="cursor-grab touch-pan-y select-none overflow-hidden py-3 active:cursor-grabbing"
    >
      <div ref={trackRef} className="flex w-max gap-6">
        {items.map((item) => (
          <AwardCard key={item.name} item={item} />
        ))}
        {/* The second set, only there for the endless effect */}
        {items.map((item) => (
          <div key={item.name} aria-hidden="true" className="flex">
            <AwardCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
