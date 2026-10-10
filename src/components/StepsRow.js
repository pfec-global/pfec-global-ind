"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { PIECE_GAP, STEP_LENGTH, Step, StepsHeading, place } from "@/components/StepPieces";

// Tablet and desktop: the six steps sit in one row.
// All x / y / width / height values are pixels on the 3840px-wide Figma frame; the row starts at y = 330.
const LINE = { x: 457, y: 656, width: 2606, height: 2 };
const layout = {
  folder: "6_step",
  frame: { width: 3840, height: 600, top: 330 },
  shape: { width: 472, height: 552 },
  labelHeight: 120,
  cardHeight: 178,
  steps: [
    { shape: { x: 362, y: 350 }, label: { x: 332, y: 614, width: 138 }, card: { x: 288, y: 660, width: 524 }, art: { x: 432, y: 336, size: 354 } },
    { shape: { x: 906, y: 350 }, label: { x: 880, y: 614, width: 144 }, card: { x: 846, y: 660, width: 470 }, art: { x: 1056, y: 390, size: 230 } },
    { shape: { x: 1432, y: 350 }, label: { x: 1402, y: 614, width: 146 }, card: { x: 1358, y: 660, width: 510 }, art: { x: 1604, y: 404, size: 202 } },
    { shape: { x: 1958, y: 350 }, label: { x: 1928, y: 614, width: 148 }, card: { x: 1884, y: 660, width: 544 }, art: { x: 2120, y: 402, size: 220 } },
    { shape: { x: 2502, y: 350 }, label: { x: 2476, y: 614, width: 146 }, card: { x: 2442, y: 660, width: 522 }, art: { x: 2656, y: 402, size: 220 } },
    { shape: { x: 3028, y: 350 }, label: { x: 2998, y: 614, width: 146 }, card: { x: 2954, y: 660, width: 534 }, art: { x: 3194, y: 402, size: 220 } },
  ],
};

// How the scroll drives the row. The section is taller than the screen and its content stays pinned,
// so scrolling "plays" the steps: `progress` goes from 0 to 1 while the visitor scrolls through it.
// The amount of scrolling is the h-[220vh] on the section below: taller = more scrolling to reveal all six steps.
const FIRST_STEP = 0.06; // progress at which step 1 starts to appear
const STEP_GAP = 0.14; // progress between one step starting and the next
const LAST_STEP = FIRST_STEP + (layout.steps.length - 1) * STEP_GAP;
const LINE_END = LAST_STEP + PIECE_GAP * 2;
// Progress at which the last card has fully appeared. From then on the section is a normal, unpinned block.
const ALL_SHOWN = LAST_STEP + STEP_LENGTH + 0.01;

export default function StepsRow() {
  const section = useRef(null);
  const row = useRef(null);
  const reduceMotion = useReducedMotion();
  // true once all six steps have been shown: the animation is over for this visit
  const [finished, setFinished] = useState(false);
  const furthest = useRef(0);
  const rowTopBeforeUnpin = useRef(null);

  // 0 when the top of the section reaches 80% down the screen, 1 when its bottom reaches the bottom of the screen
  const { scrollYProgress } = useScroll({ target: section, offset: ["start 0.8", "end end"] });
  // The spring makes the steps glide after the scroll instead of jumping with every wheel tick
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 22, restDelta: 0.001 });
  // Only ever moves forward, so a step that has appeared stays put when the visitor scrolls back up
  const progress = useTransform(smooth, (value) => (furthest.current = Math.max(furthest.current, value)));
  const lineClip = useTransform(progress, [FIRST_STEP, LINE_END], ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]);

  useMotionValueEvent(progress, "change", (value) => {
    if (finished || value < ALL_SHOWN) return;
    rowTopBeforeUnpin.current = row.current.getBoundingClientRect().top;
    setFinished(true);
  });

  // Unpinning makes the section much shorter. Scroll by the same amount in the same frame,
  // so the steps stay exactly where they are on screen instead of jumping.
  useLayoutEffect(() => {
    if (!finished || rowTopBeforeUnpin.current === null) return;
    const shift = row.current.getBoundingClientRect().top - rowTopBeforeUnpin.current;
    if (shift) window.scrollBy({ top: shift, behavior: "instant" });
  }, [finished]);

  // Visitors with "reduce motion" get the finished row straight away
  useEffect(() => {
    if (reduceMotion) smooth.jump(1);
  }, [reduceMotion, smooth]);

  return (
    <div
      ref={section}
      className={`hidden md:block ${finished ? "" : "h-[220vh] motion-reduce:h-auto"}`}
    >
      {/* Stays pinned on screen while the visitor scrolls through the section, until all steps are shown */}
      <div
        className={
          finished
            ? "py-14"
            : "sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-16 motion-reduce:static motion-reduce:h-auto motion-reduce:py-14"
        }
      >
        <div className="mx-auto w-full max-w-screen-2xl">
          <StepsHeading />

          <ol
            ref={row}
            className="relative mt-4 list-none lg:mt-6"
            style={{ aspectRatio: `${layout.frame.width} / ${layout.frame.height}` }}
          >
            {/* Dashed line joining the steps - draws itself from left to right as the steps appear */}
            <motion.div aria-hidden className="absolute" style={{ ...place(layout.frame, LINE), clipPath: lineClip }}>
              <Image
                src="/images/6_step/line.png"
                alt=""
                width={LINE.width}
                height={LINE.height}
                loading="eager"
                className="block h-px w-full xl:h-0.5"
              />
            </motion.div>

            {layout.steps.map((step, i) => (
              <Step key={i} layout={layout} i={i} start={FIRST_STEP + i * STEP_GAP} progress={progress} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
