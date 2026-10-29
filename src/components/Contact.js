
"use client";

import { LuCrown } from "react-icons/lu";
import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";
import AdmissionForm from "@/components/AdmissionForm";

const reasons = [
  "FREE End-to-End Assistance",
  "FREE End-to-End Assistance",
  "FREE End-to-End Assistance",
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-[#f1f4f8] py-12 lg:py-16"
    >
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">

        {/* Left Content */}
        <motion.div {...fadeUp()}>
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Contact Us Section
          </h2>

          <p className="mt-3 max-w-xs text-sm text-ink/70 sm:text-base">
            Few Lines of text goes here Few Lines of text goes here
            Few Lines of text goes here
          </p>

          <h3 className="mt-6 font-semibold">Why Choose Us</h3>

          <ul className="mt-3 space-y-3 text-sm">
            {reasons.map((reason, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-accent shadow-sm">
                  <LuCrown className="h-4 w-4" />
                </span>

                {reason}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Reusable Admission Form */}
        <motion.div {...fadeUp(0.15)}>
          <AdmissionForm />
        </motion.div>

      </div>
    </section>
  );
}
