"use client";

import { useEffect, useRef, useState } from "react";

// How far from the top of the screen a heading has to be to count as "being read" (navbar + this box + some air)
const OFFSET = 170;

// "Jump to Topic" box of a blog post. headings is a list of { id, text } - one per h2 of the post.
// It floats under the navbar while scrolling. The top row always shows the section being read;
// the list below it opens and closes, highlights that section, and a click jumps to a section.
export default function BlogToc({ headings }) {
  const navRef = useRef(null);
  const wasStuckRef = useRef(false);
  const [activeId, setActiveId] = useState(headings[0]?.id);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    // A post without h2 headings has no box at all, so there is nothing to follow
    if (headings.length === 0) return;

    const onScroll = () => {
      // The active section is the last heading that has passed the top of the screen
      let current = headings[0]?.id;
      for (const heading of headings) {
        const el = document.getElementById(heading.id);
        if (el && el.getBoundingClientRect().top <= OFFSET) current = heading.id;
      }
      setActiveId(current);

      // The moment the box starts floating, close the list so it does not cover the text being read.
      // (The reader can still open it again with the arrow.)
      const nav = navRef.current;
      if (!nav) return;
      const stuck = nav.getBoundingClientRect().top <= parseFloat(getComputedStyle(nav).top) + 1;
      if (stuck && !wasStuckRef.current) setOpen(false);
      wasStuckRef.current = stuck;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  if (headings.length === 0) return null;

  const activeIndex = Math.max(
    0,
    headings.findIndex((heading) => heading.id === activeId),
  );

  return (
    <nav
      ref={navRef}
      aria-label="Jump to topic"
      className="sticky top-[116px] z-30 w-full rounded-xl border border-indigo/15 bg-[#f1f5f8] shadow-lg"
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-center gap-3 px-4 py-3.5 text-left text-sm sm:px-5 sm:py-4 sm:text-base"
      >
        <span className="shrink-0 font-bold text-accent">Jump to Topic</span>
        <span aria-hidden="true" className="h-5 w-px shrink-0 bg-ink/40" />
        <span className="min-w-0 flex-1 truncate font-bold">
          {activeIndex + 1}. {headings[activeIndex].text}
        </span>
        <svg
          className={`h-5 w-5 shrink-0 text-accent transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 9l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* The list is always in the page so it can slide open and shut: the grid row grows from 0 to the
          height of the list. inert keeps the hidden links out of reach of the keyboard and screen readers. */}
      <div
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <ol className="mx-4 max-h-[50vh] overflow-y-auto border-t border-ink/25 py-3 text-sm sm:mx-5 sm:text-base">
            {headings.map((heading, i) => (
              <li key={heading.id}>
                {/* A normal #link: the browser scrolls to the heading (smoothly, see scroll-smooth in layout.js) */}
                <a
                  href={`#${heading.id}`}
                  aria-current={heading.id === activeId ? "location" : undefined}
                  onClick={() => setOpen(false)}
                  className={`block py-2.5 transition-colors duration-300 hover:text-accent ${
                    heading.id === activeId ? "font-bold text-ink" : "text-ink/75"
                  }`}
                >
                  {i + 1}. {heading.text}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </nav>
  );
}
