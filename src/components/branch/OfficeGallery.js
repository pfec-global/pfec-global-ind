"use client";

import Image from "next/image";
import useLoopSlider from "./useLoopSlider";

const AUTOPLAY_MS = 4000;


function Arrow({ label, onClick, flip }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#290098] text-white transition-opacity hover:opacity-80 xl:h-[calc(3*var(--bu))] xl:w-[calc(3*var(--bu))]"
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-6 w-6 ${flip ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14.5 5l-7 7 7 7" />
      </svg>
    </button>
  );
}

// Photos of the office. branch is one entry of src/data/branches.js (photos in public/images/branch/<galleryFolder>).
export default function OfficeGallery({ branch }) {
  const { photos } = branch;
  const count = photos.length;
  const {
    active,
    animate,
    trackStyle,
    dragProps,
    next,
    prev,
    goTo,
    handleTransitionEnd,
    setPaused,
  } = useLoopSlider(count, AUTOPLAY_MS);

  return (
    <section id="office" className="overflow-hidden bg-white">
      <div className="py-14 xl:pb-[calc(4.5*var(--bu))] xl:pt-[calc(4.3*var(--bu))]">
        <h2 className="px-4 text-center text-2xl font-bold text-[#1d297c] sm:text-3xl xl:text-[length:calc(1.95*var(--bu))]">
          Inside PFEC Global {branch.city}
        </h2>

        {/* The photos are rendered three times: the middle copy is the one being shown, centred on
            the screen, and the copies either side fill the edges so a photo always peeks out on both sides. */}
        <div className="mt-8 xl:mt-[calc(2.1*var(--bu))]">
          <ul
            onTransitionEnd={handleTransitionEnd}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            {...dragProps}
            style={{
              ...trackStyle,
              marginLeft: `calc(50% - var(--slide) / 2 - var(--step) * ${count})`,
            }}
            className={`flex cursor-grab touch-pan-y select-none gap-4 active:cursor-grabbing [--slide:calc(17*var(--bu))] [--step:calc(18*var(--bu))] sm:gap-8 sm:[--slide:calc(26*var(--bu))] sm:[--step:calc(28*var(--bu))] xl:gap-[calc(4.4*var(--bu))] xl:[--slide:calc(37.9*var(--bu))] xl:[--step:calc(42.3*var(--bu))] ${
              animate ? "transition-transform duration-700 ease-out" : ""
            }`}
          >
            {[...photos, ...photos, ...photos].map((photo, i) => (
              <li
                key={i}
                aria-hidden={i < count || i >= count * 2}
                className="relative aspect-[916/763] w-[var(--slide)] shrink-0 overflow-hidden"
              >
                <Image
                  src={`/images/branch/${branch.galleryFolder}/${photo}`}
                  alt={`Inside the PFEC Global ${branch.city} office, photo ${(i % count) + 1}`}
                  fill
                  sizes="(min-width: 1280px) 38rem, (min-width: 640px) 26rem, 17rem"
                  draggable={false}
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 flex justify-center gap-3 xl:mt-[calc(1.5*var(--bu))] xl:gap-[calc(1*var(--bu))]">
          <Arrow label="Previous photo" onClick={prev} />
          <Arrow label="Next photo" onClick={next} flip />
        </div>

        <div className="mt-5 flex justify-center gap-1.5 xl:mt-[calc(1.6*var(--bu))]">
          {photos.map((photo, i) => (
            <button
              key={photo}
              type="button"
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === active}
              onClick={() => goTo(i)}
              className={`h-2 w-2 cursor-pointer rounded-full transition-colors xl:h-[calc(0.55*var(--bu))] xl:w-[calc(0.55*var(--bu))] ${
                i === active ? "bg-accent" : "bg-accent/15"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
