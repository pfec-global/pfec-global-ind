
"use client";

import { useEffect, useRef, useState } from "react";

const healthPlans = [
  {
    title: "Overseas Student Health Cover (OSHC)",
    description:
      "Overseas Student Health Cover is a health insurance plan designed for international students studying abroad. It is a complete coverage for expenses incurred comprising pre and post-hospitalisation coverage, and prescription medicines. This student health cover ensures that the students have access to quality healthcare services in their host country. It offers peace of mind and financial security against any unexpected medical costs that may arise. This is a mandatory requirement by some universities and visa regulations. It reassures the students and their families that their health needs are taken care of while they focus on their education.",
  },
  {
    title: "Overseas Visitor Health Cover (OVHC)",
    description:
      "Overseas Visitor Health Cover is designed especially for visitors to Australia who cannot access the Australian public Medicare System for any hospital or medical costs. The eligibility criteria, premiums, and benefits for various health insurance plans under OVHC differ. Most plans, however, cover hospital expenses and a portion of the doctor's fees. To avail of the services of dentists, physiotherapists, and optometrists, you can purchase a General Treatment Cover in addition to OVHC.",
  },
];

export default function TypesOfHealth() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#e4f7fb] py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        {/* SECTION HEADING */}
        <div
          className={`text-center transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <h2 className="font-montserrat text-2xl font-bold leading-tight text-[#172b70] sm:text-3xl">
            Types of Health Insurance Plans
          </h2>

          <p className="mx-auto mt-6 max-w-[1250px] font-montserrat text-sm leading-7 text-[#111] sm:text-base">
            Funding medical emergencies can be a huge financial burden while
            studying abroad. To be worry-free, knowing that your health and
            well-being are taken care of, you should purchase health insurance
            plans while studying abroad. There are two types of health plans,
            and they are:
          </p>
        </div>

        {/* HEALTH PLAN CARDS */}
        <div className="mx-auto mt-9 grid max-w-[1320px] grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:mt-10 lg:gap-6">
          {healthPlans.map((plan, index) => (
            <article
              key={plan.title}
              style={{
                transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
              }}
              className={`group rounded-[20px] border border-[#d5e2e5] bg-white p-6 shadow-[0_2px_7px_rgba(0,0,0,0.22)] transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.12)] motion-reduce:transform-none motion-reduce:transition-none sm:p-7 lg:p-6 xl:p-8 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              {/* HEART ICON */}
              <div className="mb-3 text-[#202e8b] transition-transform duration-300 group-hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                  <path d="M3 12h5l2-4 4 8 2-4h5" />
                </svg>
              </div>

              {/* CARD TITLE */}
              <h3 className="font-montserrat text-lg font-semibold leading-snug text-[#ff4938] sm:text-xl">
                {plan.title}
              </h3>

              {/* CARD DESCRIPTION */}
              <p className="mt-6 font-montserrat text-[13px] leading-[1.85] text-[#111] sm:text-sm">
                {plan.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
