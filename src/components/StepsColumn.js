"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { STEP_LENGTH, Step, StepsHeading, place } from "@/components/StepPieces";

// Mobile: the six steps zig-zag down the page, joined by a dashed path.
// All x / y / width / height values are pixels on the 860px-wide Figma frame; the steps start at y = 215.
const PATH = { x: 307, y: 309, width: 251, height: 1059 };
const layout = {
  folder: "6_step_mobile",
  frame: { width: 860, height: 1345, top: 215 },
  shape: { width: 298, height: 348 },
  labelHeight: 76,
  cardHeight: 113,
  steps: [
    { shape: { x: 90, y: 237 }, label: { x: 71, y: 403, width: 87 }, card: { x: 42, y: 432, width: 416 }, art: { x: 134, y: 228, size: 223 } },
    { shape: { x: 463, y: 390 }, label: { x: 447, y: 556, width: 91 }, card: { x: 426, y: 586, width: 372 }, art: { x: 557, y: 416, size: 145 } },
    { shape: { x: 91, y: 625 }, label: { x: 71, y: 791, width: 92 }, card: { x: 42, y: 820, width: 404 }, art: { x: 198, y: 659, size: 128 } },
    { shape: { x: 431, y: 802 }, label: { x: 411, y: 968, width: 94 }, card: { x: 383, y: 997, width: 434 }, art: { x: 532, y: 835, size: 139 } },
    { shape: { x: 82, y: 1025 }, label: { x: 65, y: 1191, width: 92 }, card: { x: 41, y: 1221, width: 414 }, art: { x: 178, y: 1058, size: 139 } },
    { shape: { x: 437, y: 1200 }, label: { x: 417, y: 1366, width: 92 }, card: { x: 389, y: 1395, width: 424 }, art: { x: 540, y: 1233, size: 139 } },
  ],
};

// The column is too tall to pin on a phone, so it scrolls normally and each step appears
// as it comes up the screen. A step starts when `progress` reaches how far down the column it sits.
const stepStart = (step) => ((step.shape.y - layout.frame.top) / layout.frame.height) * (1 - STEP_LENGTH);

export default function StepsColumn() {
  const column = useRef(null);
  const reduceMotion = useReducedMotion();
  const furthest = useRef(0);

  // 0 when the top of the column is 80% down the screen, 1 when its bottom is 85% down the screen
  const { scrollYProgress } = useScroll({ target: column, offset: ["start 0.8", "end 0.85"] });
  // The spring makes the steps glide after the scroll instead of jumping with every swipe
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 22, restDelta: 0.001 });
  // Only ever moves forward, so a step that has appeared stays put when the visitor scrolls back up
  const progress = useTransform(smooth, (value) => (furthest.current = Math.max(furthest.current, value)));
  // The dashed path draws itself from top to bottom, a little ahead of the steps
  const pathClip = useTransform(progress, [0.02, 0.9], ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]);

  // Visitors with "reduce motion" get the finished column straight away
  useEffect(() => {
    if (reduceMotion) smooth.jump(1);
  }, [reduceMotion, smooth]);

  return (
    <div className="mx-auto max-w-xl overflow-hidden pb-6 pt-12 md:hidden">
      <StepsHeading />

      <ol
        ref={column}
        className="relative mt-4 list-none"
        style={{ aspectRatio: `${layout.frame.width} / ${layout.frame.height}` }}
      >
        <motion.div aria-hidden className="absolute" style={{ ...place(layout.frame, PATH), clipPath: pathClip }}>
          <Image
            src="/images/6_step_mobile/path.png"
            alt=""
            width={PATH.width}
            height={PATH.height}
            loading="eager"
            className="h-auto w-full"
          />
        </motion.div>

        {layout.steps.map((step, i) => (
          <Step key={i} layout={layout} i={i} start={stepStart(step)} progress={progress} />
        ))}
      </ol>
    </div>
  );
}
