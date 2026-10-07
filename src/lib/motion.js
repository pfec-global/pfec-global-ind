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
