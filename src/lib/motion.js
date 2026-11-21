// Shared animation presets, used as: <motion.div {...fadeUp()}>
// Pass a delay in seconds to make items appear one after another.

const ease = [0.22, 1, 0.36, 1]; // quick start, long soft landing

// Fade in and rise when scrolled into view (plays once)
export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, delay, ease },
});

// Same movement, but plays as soon as the page loads (hero)
export const fadeUpOnLoad = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

// Fade in while growing slightly - for large images
export const zoomIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.94 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.9, delay, ease },
});

// Hover effect of a picture card (partner logos, award pictures): it lifts, grows a little and a band of light
// sweeps across it, like a reflection. Put it on a wrapper around the picture - the band is drawn by its ::after.
export const hoverShine =
  "relative overflow-hidden rounded-xl transition-transform duration-300 hover:-translate-y-1.5 hover:scale-105 after:pointer-events-none after:absolute after:inset-y-0 after:-left-full after:w-1/2 after:-skew-x-12 after:bg-linear-to-r after:from-transparent after:via-white/60 after:to-transparent after:transition-[left] after:duration-700 hover:after:left-[150%]";

// The same band of light alone, for a card that already has its own hover lift and rounded corners
// (it needs "relative overflow-hidden" too)
export const shineSweep =
  "after:pointer-events-none after:absolute after:inset-y-0 after:-left-full after:w-1/2 after:-skew-x-12 after:bg-linear-to-r after:from-transparent after:via-white/70 after:to-transparent after:transition-[left] after:duration-700 hover:after:left-[150%]";
