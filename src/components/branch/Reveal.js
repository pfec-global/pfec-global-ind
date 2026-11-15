"use client";

import { MotionConfig } from "motion/react";
import * as motion from "motion/react-client";

// Fades and slides its children in the first time they scroll into view.
// `as` picks the tag (div, li, ...); `x` / `y` set where it slides in from, `scale` the size it grows from.
export default function Reveal({
  children,
  as = "div",
  id,
  className,
  delay = 0,
  x = 0,
  y = 48,
  scale = 1,
  duration = 0.7,
}) {
  const Tag = motion[as];
  const content = (
    <MotionConfig reducedMotion="user">
      <Tag
        className={className}
        initial={{ opacity: 0, x, y, scale }}
        whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </Tag>
    </MotionConfig>
  );
  // The id sits on a wrapper that never moves, so anchor links land in the
  // right place even before the slide-in has played.
  return id ? <div id={id}>{content}</div> : content;
}
