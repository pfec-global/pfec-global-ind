
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { fadeUp } from "@/lib/motion";

const defaultFaqs = [
  {
    question: "What services does PFEC Global India offer?",
    answer:
      "PFEC Global India supports students with university admissions, visa processing, scholarship guidance, pre-departure preparation, health insurance, and other study abroad services.",
  },
  {
    question: "Which countries can I study in?",
    answer:
      "PFEC Global provides guidance for students interested in studying in destinations such as Australia, the United Kingdom, Canada, Germany, the United States, and Ireland.",
  },
];

export default function Faq({
  title = "Frequently Asked Questions",
  faqs = defaultFaqs,
  ctaText = "Book a Free Consultation",
  ctaDescription = "Our experts are waiting to help you take the next steps towards your dream.",
  ctaHref = "#register-now",
}) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="bg-[#f5f4ff] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div {...fadeUp()} className="text-center">
          <h2 className="font-montserrat text-2xl font-semibold text-black sm:text-3xl">
            {title}
          </h2>
        </motion.div>

        {/* FAQ List */}
        <div className="mt-8 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.question}
                {...fadeUp(index * 0.06)}
                className="overflow-hidden rounded-xl bg-white"
              >
                {/* Question */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                >
                  <span className="font-montserrat text-base font-medium leading-6 text-[#ef4b3b] sm:text-lg">
                    {faq.question}
                  </span>

                  <span
                    aria-hidden="true"
                    className="shrink-0 text-2xl font-bold leading-none text-black"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.25,
                        ease: "easeInOut",
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-6">
                        <p className="max-w-3xl font-montserrat text-sm leading-7 text-black/80 sm:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div {...fadeUp(0.3)} className="mt-7 text-center">
          <p className="font-montserrat text-sm text-gray-500 sm:text-base">
            {ctaDescription}
          </p>

          <a
            href={ctaHref}
            className="group mt-6 inline-flex items-center justify-center gap-3 rounded-xl bg-[#ef4b3b] px-7 py-3 font-montserrat text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#d83a2b]"
          >
            {ctaText}
            {/* The same arrow as the other "Book a FREE Consultation" links */}
            <svg
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M4 12h16m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
