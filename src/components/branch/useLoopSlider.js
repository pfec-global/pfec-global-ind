import { useEffect, useRef, useState } from "react";

const DRAG_THRESHOLD = 50;
// Movement (px) before a press counts as a drag rather than a click.
const CLICK_SLOP = 5;

const nextFrame = (callback) =>
  requestAnimationFrame(() => requestAnimationFrame(callback));

// Index logic for a looping slider. Render the slides twice and move the track
// by `index` steps; the hook jumps back by `count` unseen once a lap completes.
export default function useLoopSlider(count, autoplayMs) {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStart = useRef(null);
  // True once the current press has moved far enough to be a drag; blocks the click that follows.
  const dragged = useRef(false);

  // Jump to `from` instantly, then slide to `to`.
  const jumpThenSlide = (from, to) => {
    setAnimate(false);
    setIndex(from);
    nextFrame(() => {
      setAnimate(true);
      setIndex(to);
    });
  };

  const next = () =>
    index >= count
      ? jumpThenSlide(index - count, index - count + 1)
      : setIndex(index + 1);

  const prev = () =>
    index <= 0 ? jumpThenSlide(count, count - 1) : setIndex(index - 1);

  const goTo = (slide) => setIndex(slide);

  const handleTransitionEnd = (event) => {
    if (event.target !== event.currentTarget || index < count) return;
    setAnimate(false);
    setIndex(index - count);
    nextFrame(() => setAnimate(true));
  };

  // Mouse drag and touch swipe: follow the pointer, then settle on release.
  const endDrag = () => {
    if (dragStart.current === null) return;
    dragStart.current = null;
    if (dragOffset <= -DRAG_THRESHOLD) next();
    else if (dragOffset >= DRAG_THRESHOLD) prev();
    setDragOffset(0);
  };

  // The pointer is only captured once it moves, so a plain click still reaches links inside the slides.
  const dragProps = {
    onPointerDown: (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      dragStart.current = event.clientX;
      dragged.current = false;
    },
    onPointerMove: (event) => {
      if (dragStart.current === null) return;
      const offset = event.clientX - dragStart.current;
      if (!dragged.current && Math.abs(offset) > CLICK_SLOP) {
        dragged.current = true;
        event.currentTarget.setPointerCapture(event.pointerId);
      }
      if (dragged.current) setDragOffset(offset);
    },
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
    onClickCapture: (event) => {
      if (dragged.current) event.preventDefault();
    },
    onDragStart: (event) => event.preventDefault(),
  };

  const dragging = dragOffset !== 0;

  useEffect(() => {
    if (!autoplayMs || paused || dragging) return;
    const timer = setInterval(next, autoplayMs);
    return () => clearInterval(timer);
  });

  return {
    index,
    active: index % count,
    animate: animate && !dragging,
    trackStyle: {
      transform: `translateX(calc(var(--step) * ${-index} + ${dragOffset}px))`,
    },
    dragProps,
    next,
    prev,
    goTo,
    handleTransitionEnd,
    setPaused,
  };
}
