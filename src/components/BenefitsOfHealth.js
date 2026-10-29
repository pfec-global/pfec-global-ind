
"use client";

import { useEffect, useRef, useState } from "react";

const benefitsFaqs = [
  {
    question:
      "Is OVHC/OSHC mandatory for Indian students planning to study abroad?",
    answer:
      "Overseas Student Health Cover (OSHC) is generally required for international students studying in Australia on a student visa. Overseas Visitor Health Cover (OVHC) may be suitable for other visa types or visitors, depending on the destination and visa requirements. Requirements vary by country and visa category.",
  },
  {
    question: "What does OVHC/OSHC cover for Indian students?",
    answer:
      "Depending on the policy, health cover may include hospital treatment, medical consultations, emergency services, and prescription medicines. Coverage, waiting periods, exclusions, and limits vary by provider and plan.",
  },
  {
    question:
      "Can PFEC India assist with arranging the right student health cover?",
    answer:
      "PFEC India can guide students on understanding health insurance requirements for their study destination and exploring suitable cover options. Contact our team to discuss your circumstances and available support.",
  },
  {
    question:
      "How do I choose the best OVHC/OSHC plan as an Indian student?",
    answer:
      "Compare the requirements for your visa, premiums, hospital and medical benefits, exclusions, waiting periods, and any additional coverage you need. Review the policy details carefully before choosing a plan.",
  },
];

export default function BenefitsOfHealth() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#fafafa] py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-12">

        {/* LEFT CONTENT */}
        <div
          className={`min-w-0 transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-8 opacity-0"
          }`}
        >
          <h2 className="font-montserrat text-xl font-bold leading-snug text-[#172b70] sm:text-2xl">
            Benefits of Overseas Student Health Cover
          </h2>

          <p className="mt-6 font-montserrat text-sm leading-[1.8] text-[#777] sm:text-base">
            OVHC is mandatory to comply with visa regulations. Apart from
            that, several other benefits make it a requirement for students
            studying abroad. They are:
          </p>

          {/* FAQ ACCORDION */}
          <div className="mt-6 space-y-3">
            {benefitsFaqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-xl transition-all duration-300 ${
                    index === 0 && !isOpen
                      ? "bg-white"
                      : "border-transparent bg-white"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenIndex((current) =>
                        current === index ? null : index
                      )
                    }
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-3 py-4 text-left sm:px-4"
                  >
                    <span className="font-montserrat text-base font-normal leading-[1.7] text-[#ff4938] sm:text-lg">
                      {faq.question}
                    </span>

                    <span
                      aria-hidden="true"
                      className="shrink-0 text-2xl font-semibold leading-none text-black transition-transform duration-300"
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-3 pb-5 font-montserrat text-sm leading-7 text-[#333] sm:px-4">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA BUTTON */}
          <a
            href="#register-now"
            className="mt-6 inline-flex items-center gap-3 rounded-sm bg-[#ef4938] px-7 py-3 font-montserrat text-xs font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#d83a2b] sm:text-sm"
          >
            Book a Free Consultation
            <span aria-hidden="true" className="text-base">
              →
            </span>
          </a>
        </div>

        {/* RIGHT IMAGE AND DECORATION */}
        <div
          className={`relative mx-auto w-full max-w-[600px] transition-all delay-150 duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-8 opacity-0"
          }`}
        >
        
          {/* Main image */}
        <div className="relative z-10 overflow-hidden rounded-2xl border-2 border-[#a9a7c8] bg-white shadow-sm">
  <img
    src="/images/health-insurance-benefits.wepb"
    alt="Healthcare professional discussing health insurance with a student"
    loading="lazy"
    className="h-auto w-full object-contain transition-transform duration-700 hover:scale-105"
  />
</div>
        </div>

      </div>
    </section>
  );
}
