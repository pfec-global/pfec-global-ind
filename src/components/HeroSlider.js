"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Ratio of a Strapi image, for the height of the slider. Falls back when the image or its size is missing.
const ratio = (image, fallback) => (image?.width && image?.height ? `${image.width} / ${image.height}` : fallback);

// The home hero built from the slides in Strapi: one slide is shown as a plain banner, several slide by themselves.
// Every part of a slide is optional (see src/lib/homepage.js):
// - desktopImage (768px and up) and mobileImage (below) - each one stands in for the other when missing;
//   a slide without any image gets the navy background of the site
// - heading, subheading and buttons - over the image (at the bottom on phones, on the left from 768px); nothing is drawn when empty
// - link - makes the whole slide clickable
// autoplay and autoplaySpeed (seconds) come from Strapi too. Hovering the slider pauses it.
export default function HeroSlider({ slides, autoplay = true, autoplaySpeed = 5 }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragStart = useRef(null);
  const count = slides.length;
  const many = count > 1;

  const goTo = (index) => setActive((index + count) % count);

  useEffect(() => {
    if (!many || !autoplay || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(() => setActive((current) => (current + 1) % count), autoplaySpeed * 1000);
    return () => clearTimeout(timer);
  }, [active, many, autoplay, paused, autoplaySpeed, count]);

  // Swipe on touch screens (and drag with the mouse): 50px to either side changes the slide
  const onPointerDown = (event) => {
    dragStart.current = event.clientX;
  };
  const onPointerUp = (event) => {
    if (dragStart.current === null) return;
    const distance = event.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(distance) > 50) goTo(active + (distance < 0 ? 1 : -1));
  };

  // All slides share the height of the first one, taken from its images
  const first = slides[0];
  const style = {
    "--hero-mobile": ratio(first.mobileImage ?? first.desktopImage, "4 / 3"),
    "--hero-desktop": ratio(first.desktopImage ?? first.mobileImage, "1280 / 670"),
  };

  return (
    <section
      aria-roledescription={many ? "carousel" : undefined}
      aria-label="Highlights"
      className="relative overflow-hidden bg-linear-to-b from-navy to-indigo text-white"
      style={style}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="flex touch-pan-y transition-transform duration-700 ease-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${active * 100}%)` }}
        onPointerDown={many ? onPointerDown : undefined}
        onPointerUp={many ? onPointerUp : undefined}
        onPointerCancel={() => (dragStart.current = null)}
      >
        {slides.map((slide, i) => (
          <Slide
            key={slide.id ?? i}
            slide={slide}
            first={i === 0}
            hidden={i !== active}
            label={many ? `${i + 1} of ${count}` : undefined}
          />
        ))}
      </div>

      {many && (
        <>
          <ArrowButton direction="previous" onClick={() => goTo(active - 1)} />
          <ArrowButton direction="next" onClick={() => goTo(active + 1)} />

          {/* Dots - under the image on phones, over it from 768px */}
          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-5">
            {slides.map((slide, i) => (
              <button
                key={slide.id ?? i}
                type="button"
                aria-label={`Show slide ${i + 1}`}
                aria-current={i === active ? "true" : undefined}
                onClick={() => goTo(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-7 bg-accent" : "w-2.5 bg-white/60 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function Slide({ slide, first, hidden, label }) {
  const desktop = slide.desktopImage ?? slide.mobileImage;
  const mobile = slide.mobileImage ?? slide.desktopImage;
  const hasText = slide.heading || slide.subheading || slide.buttons.length > 0;
  const Heading = first ? "h1" : "h2";

  return (
    <div
      role={label ? "group" : undefined}
      aria-roledescription={label ? "slide" : undefined}
      aria-label={label}
      aria-hidden={hidden || undefined}
      inert={hidden || undefined}
      className="relative w-full shrink-0"
    >
      {/* The images keep the slider at the ratio of the first slide; a slide without images is just as tall */}
      <div className="relative aspect-(--hero-mobile) md:aspect-(--hero-desktop)">
        {mobile && (
          <Image
            src={mobile.src}
            alt={mobile.alt}
            fill
            priority={first}
            sizes="100vw"
            className="object-cover md:hidden"
          />
        )}
        {desktop && (
          <Image
            src={desktop.src}
            alt={desktop.alt}
            fill
            priority={first}
            sizes="100vw"
            className="hidden object-cover md:block"
          />
        )}
        {/* Darkens the bottom (phones) or the left side (768px and up) so the text stays readable over a busy picture */}
        {hasText && (mobile || desktop) && (
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent md:bg-linear-to-r md:from-black/60 md:via-black/25" />
        )}
      </div>

      {/* The whole slide is a link when Strapi gives one; the buttons sit above it and keep their own links */}
      {slide.link && (
        <Link
          href={slide.link}
          aria-label={slide.heading ?? "Learn more"}
          tabIndex={hidden ? -1 : undefined}
          className="absolute inset-0 z-10"
        />
      )}

      {hasText && (
        // Over the image, so every slide is exactly as tall as its picture: at the bottom on phones, on the left from 768px
        <div className="absolute inset-0 flex items-end px-4 pb-12 pt-6 text-center sm:px-6 md:items-center md:px-20 md:pb-6 md:text-left">
          <div className="mx-auto w-full max-w-7xl">
            <div className="md:max-w-xl">
              {slide.heading && (
                <Heading className="text-balance font-serif text-2xl leading-tight sm:text-4xl lg:text-5xl">
                  {slide.heading}
                </Heading>
              )}
              {slide.subheading && (
                <p className="mt-3 line-clamp-3 text-sm text-white/85 sm:text-lg md:mt-4 md:line-clamp-none">{slide.subheading}</p>
              )}
              {slide.buttons.length > 0 && (
                <div className="relative z-20 mt-4 flex flex-wrap justify-center gap-3 md:mt-6 md:justify-start">
                  {slide.buttons.map((button, i) => (
                    <Link
                      key={i}
                      href={button.href}
                      target={button.newTab ? "_blank" : undefined}
                      rel={button.newTab ? "noopener noreferrer" : undefined}
                      className={`group inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition duration-300 ${
                        button.style === "secondary"
                          ? "border border-white text-white hover:bg-white hover:text-navy"
                          : "bg-accent text-white hover:opacity-90"
                      }`}
                    >
                      {button.label}
                      <svg
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path d="M4 12h16m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Round previous / next buttons on the sides of the image (from 768px; phones swipe or use the dots)
function ArrowButton({ direction, onClick }) {
  const next = direction === "next";
  return (
    <button
      type="button"
      aria-label={next ? "Next slide" : "Previous slide"}
      onClick={onClick}
      className={`absolute top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-accent shadow-md transition hover:bg-white md:flex ${
        next ? "right-4" : "left-4"
      }`}
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <path d={next ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6"} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
