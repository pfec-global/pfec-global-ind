"use client";

import Image from "next/image";
import { motion, useTransform } from "motion/react";

// Shared by the desktop row (StepsRow) and the mobile column (StepsColumn).
// Each step is built from separate images - slanted shape, picture, "Step N" label and text card -
// so every piece can animate on its own.

export const stepTexts = [
  "Get your profile assessed & receive recommendations from expert counsellors",
  "Shortlist your preferred institutions and courses based on your aspirations",
  "Complete the application process & secure scholarships with our comprehensive assistance",
  "Receive the offer letter from the institution & complete the necessary steps to finalize your seat",
  "Apply & prepare for visa interviews. Our team will guide you at every single step of the way.",
  "Prepare for take-off! Get ready to board the flight and begin your first day at the institution abroad!",
];

// `progress` is a number that goes from 0 to 1 as the visitor scrolls through the section.
export const PIECE_GAP = 0.02; // inside a step: shape > picture > label > card
export const PIECE_LENGTH = 0.1; // progress a single piece takes to fully appear
export const STEP_LENGTH = PIECE_GAP * 3 + PIECE_LENGTH; // from a step starting to its card being fully shown

// Turns a box on the Figma frame into % positions, so the layout scales with the screen.
// frame = { width, height, top }: the part of the Figma frame that the steps occupy.
export const place = (frame, { x, y, width }) => ({
  left: `${(x / frame.width) * 100}%`,
  top: `${((y - frame.top) / frame.height) * 100}%`,
  width: `${(width / frame.width) * 100}%`,
});

// Shared by every piece that reacts to hovering its step
const hoverMove = "transition duration-300 ease-out motion-reduce:transition-none";

// One piece of a step. It fades in and moves from `from` to its resting place between
// progress `start` and `start + PIECE_LENGTH`.
function Piece({ progress, start, from = {}, style, children, ...rest }) {
  const range = [start, start + PIECE_LENGTH];
  const opacity = useTransform(progress, range, [0, 1]);
  const x = useTransform(progress, range, [from.x ?? "0%", "0%"]);
  const y = useTransform(progress, range, [from.y ?? "0%", "0%"]);
  const scale = useTransform(progress, range, [from.scale ?? 1, 1]);
  return (
    <motion.div className="absolute" style={{ ...style, opacity, x, y, scale }} {...rest}>
      {children}
    </motion.div>
  );
}

// layout = { folder, frame, shape: { width, height }, labelHeight, cardHeight, steps: [{ shape, label, card, art }] }
export function Step({ layout, i, start, progress }) {
  const n = i + 1;
  const { folder, frame } = layout;
  const step = layout.steps[i];
  return (
    // Hovering any piece of a step lifts that whole step (group-hover on the images below)
    <li className="group contents">
      <Piece
        aria-hidden
        progress={progress}
        start={start}
        from={{ x: "-12%", y: "8%" }}
        style={place(frame, { ...step.shape, width: layout.shape.width })}
      >
        <Image
          src={`/images/${folder}/shape.png`}
          alt=""
          width={layout.shape.width}
          height={layout.shape.height}
          className={`h-auto w-full group-hover:scale-105 group-hover:brightness-90 ${hoverMove}`}
        />
      </Piece>

      <Piece
        aria-hidden
        progress={progress}
        start={start + PIECE_GAP}
        from={{ y: "10%", scale: 0.85 }}
        style={place(frame, { ...step.art, width: step.art.size })}
      >
        {/* The picture keeps bobbing gently after it appears, each step at its own pace */}
        <div className={`group-hover:-translate-y-[6%] group-hover:scale-110 ${hoverMove}`}>
          <Image
            src={`/images/${folder}/step-${n}-art.png`}
            alt=""
            width={step.art.size}
            height={step.art.size}
            className="h-auto w-full animate-hero-drift-y motion-reduce:animate-none"
            style={{
              "--drift-y": "2.5%",
              "--drift-tilt": "0deg",
              animationDuration: `${2.6 + ((i * 3) % 5) * 0.35}s`,
              animationDelay: `${-i * 0.7}s`,
            }}
          />
        </div>
      </Piece>

      <Piece
        aria-hidden
        progress={progress}
        start={start + PIECE_GAP * 2}
        from={{ y: "60%" }}
        style={place(frame, step.label)}
      >
        <Image
          src={`/images/${folder}/step-${n}-label.png`}
          alt=""
          width={step.label.width}
          height={layout.labelHeight}
          className={`h-auto w-full group-hover:-translate-y-[9%] ${hoverMove}`}
        />
      </Piece>

      <Piece progress={progress} start={start + PIECE_GAP * 3} from={{ y: "35%" }} style={place(frame, step.card)}>
        <Image
          src={`/images/${folder}/step-${n}-card.png`}
          alt={`Step ${n}: ${stepTexts[i]}`}
          width={step.card.width}
          height={layout.cardHeight}
          className={`h-auto w-full group-hover:-translate-y-[6%] group-hover:drop-shadow-lg ${hoverMove}`}
        />
      </Piece>
    </li>
  );
}

export function StepsHeading() {
  return (
    <div className="px-4 text-center">
      <h2 className="text-2xl font-semibold lg:text-3xl">
        Study Abroad in just <span className="text-indigo">6 Simple Steps</span>
      </h2>
      <p className="mt-2 text-sm text-ink/60 lg:mt-3 lg:text-base">
        With PFEC Global by your side, your can make the whole process a breeze!
      </p>
    </div>
  );
}
