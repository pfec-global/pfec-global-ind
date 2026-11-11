"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import AdmissionForm from "@/components/AdmissionForm";

// Opens the registration form (the same AdmissionForm used on the contact and service pages) in a popup
// whenever a "Book a FREE Consultation" link or button is clicked anywhere on the site.
// It is added once in the layout and finds those buttons by their text, so the buttons don't need any
// change - including the ones whose label comes from the CMS. To make any other link open it,
// give it the attribute data-consultation.
const isConsultationButton = (el) =>
  el.hasAttribute("data-consultation") || /free consultation/i.test(el.textContent ?? "");

export default function ConsultationModal() {
  const [open, setOpen] = useState(false);
  // Where the clicked button is, measured from the middle of the screen: the form zooms out of it
  // when it opens and shrinks back into it when it closes
  const [from, setFrom] = useState({ x: 0, y: 0 });
  const closeButton = useRef(null);
  const opener = useRef(null);

  // One click listener for the whole page. It listens in the capture phase - before the button's own
  // handlers run - and stops the click there, so a Next.js <Link> doesn't navigate (to "#" etc.) instead.
  useEffect(() => {
    const onClick = (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const el = event.target.closest?.("a, button");
      if (!el || el.closest("[data-consultation-modal]") || !isConsultationButton(el)) return;
      event.preventDefault();
      event.stopPropagation();
      opener.current = el;
      const box = el.getBoundingClientRect();
      setFrom({
        x: box.left + box.width / 2 - window.innerWidth / 2,
        y: box.top + box.height / 2 - window.innerHeight / 2,
      });
      setOpen(true);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // While open: Escape closes it, the page behind can't scroll, and focus goes to the close button.
  // When it closes, focus goes back to the button that opened it.
  useEffect(() => {
    if (!open) return;
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar) document.body.style.paddingRight = `${scrollbar}px`; // stops the page shifting sideways
    document.addEventListener("keydown", onKey);
    closeButton.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      document.removeEventListener("keydown", onKey);
      opener.current?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          data-consultation-modal
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Dimmed, blurred page behind - clicking it closes the popup */}
          <div aria-hidden className="fixed inset-0 bg-black/55 backdrop-blur-[3px]" onClick={() => setOpen(false)} />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Book a FREE Consultation"
            className="relative my-auto w-full max-w-md"
            // Zoom: starts tiny on the clicked button, grows to the middle of the screen with a small
            // overshoot (the spring), and on closing shrinks back into the button
            initial={{ opacity: 0, scale: 0.15, x: from.x, y: from.y }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.15,
              x: from.x,
              y: from.y,
              transition: { duration: 0.3, ease: [0.4, 0, 0.6, 1] },
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              opacity: { duration: 0.2 },
            }}
          >
            <button
              ref={closeButton}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute -right-2 -top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink shadow-md transition duration-300 hover:rotate-90 hover:bg-accent hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>

            <AdmissionForm />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
