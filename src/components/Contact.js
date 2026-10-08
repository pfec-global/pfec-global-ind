"use client";

import Link from "next/link";
import { LuCrown } from "react-icons/lu";
import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";

const reasons = ["FREE End-to-End Assistance", "FREE End-to-End Assistance", "FREE End-to-End Assistance"];

// Placeholder options - replace with the real list
const topics = ["Study Abroad", "Student Visa", "Scholarships", "Migration Services"];

const inputClass =
  "w-full rounded-lg border border-transparent bg-[#f1f4f8] px-4 py-3 text-sm outline-none transition duration-300 placeholder:text-ink/50 focus:border-accent focus:bg-white";

export default function Contact() {
  // The form is not connected to anything yet - send the data to your API or CRM here
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section id="contact" className="scroll-mt-20 bg-[#f1f4f8] py-12 lg:py-16">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        <motion.div {...fadeUp()}>
          <h2 className="text-2xl font-semibold sm:text-3xl">Contact Us Section</h2>
          <p className="mt-3 max-w-xs text-sm text-ink/70 sm:text-base">
            Few Lines of text goes here Few Lines of text goes here Few Lines of text goes here
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

        <motion.form
          {...fadeUp(0.15)}
          onSubmit={handleSubmit}
          className="space-y-4 rounded-xl bg-white p-5 shadow-lg sm:p-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            aria-label="Full Name"
            required
            className={inputClass}
          />
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            aria-label="Email ID"
            required
            className={inputClass}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            aria-label="Phone Number"
            required
            className={inputClass}
          />

          <div className="relative">
            <select
              name="topic"
              aria-label="I would like to know more about"
              defaultValue=""
              required
              className={`${inputClass} appearance-none pr-10`}
            >
              <option value="" disabled>
                I would like to know more about
              </option>
              {topics.map((topic) => (
                <option key={topic}>{topic}</option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-accent"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 9l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <label className="flex items-center gap-2 text-xs">
            <input type="checkbox" name="agree" required className="h-4 w-4 accent-accent" />
            <span>
              I agree to{" "}
              <Link href="/privacy-policy" className="text-accent underline">
                privacy policy
              </Link>{" "}
              and{" "}
              <Link href="/terms-of-use" className="text-accent underline">
                Terms of Use
              </Link>
            </span>
          </label>

          <button
            type="submit"
            className="w-full rounded-lg bg-accent py-3 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/40"
          >
            Log In
          </button>
        </motion.form>
      </div>
    </section>
  );
}
