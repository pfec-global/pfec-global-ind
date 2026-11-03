
"use client";

import { useEffect, useRef, useState } from "react";

const healthReasons = [
  "The primary reason is that the Department of Immigration and Citizenship requires that anyone residing in Australia on a student visa are required to have an Overseas Health Cover.",

  "Overseas Student Health Insurance (OSHC) covers medical expenses such as hospitalisation, surgeries, doctor's fees, and prescription medicines, reducing the financial burden and ensuring access to quality healthcare abroad.",

  "Regular medical checkups are necessary to maintain robust health. OSHC covers the costs incurred for regular doctor visits, lab tests, and any medical emergencies that may arise. You can seek medical help without hesitation if you have student health cover.",

  "If you have an existing medical issue which needs regular intervention, having the best health insurance plan will help. Some student health insurance plans offer coverage for pre-existing conditions after a waiting period, and you can get constant medical attention.",

  "Treating accident injuries results in substantial medical bills. OSHC provides coverage for accidental injuries, whether minor or major, so that you get healthcare promptly.",
];

export default function HealthCover() {
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
      { threshold: 0.12 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#202f80] py-12 text-white sm:py-16 lg:py-20"
    >
      <div className="mx-auto grid max-w-[1350px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-12">

        {/* LEFT IMAGE */}
        <div
          className={`relative mx-auto w-full max-w-[600px] transition-all duration-1000 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-10 opacity-0"
          }`}
        >
        

          {/* Main image */}
          <div className="relative z-10 overflow-hidden rounded-2xl border border-white/30 shadow-lg">
            <img
              src="/images/health-cover-doctor.webp"
              alt="Doctor providing healthcare consultation"
              loading="lazy"
              className="h-[280px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[350px] lg:h-[335px] xl:h-[365px]"
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div
          className={`relative z-10 transition-all delay-150 duration-1000 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-10 opacity-0"
          }`}
        >
          <h2 className="font-montserrat text-xl font-bold leading-snug text-white sm:text-2xl">
            Why Do You Need a Student Health Cover?
          </h2>

          <p className="mt-6 font-montserrat text-sm leading-7 text-white sm:text-base">
            The student health cover is needed for various reasons:
          </p>

          {/* BENEFIT LIST */}
          <div className="mt-6 space-y-5 sm:mt-7 sm:space-y-6">
            {healthReasons.map((reason, index) => (
              <div
                key={reason}
                className="group flex items-start gap-4 sm:gap-5"
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Orange decorative marker */}
                <div className="flex shrink-0 items-center pt-2">
                  <span className="block h-6 w-3 -skew-x-[20deg] bg-[#ef4938] transition-transform duration-300 group-hover:scale-y-125 sm:h-7 sm:w-3.5" />
                </div>

                <p className="font-montserrat text-sm leading-[1.8] text-white sm:text-base">
                  {reason}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#register-now"
            className="group mt-7 inline-flex items-center gap-3 rounded-sm bg-[#ef4938] px-7 py-3 font-montserrat text-xs font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#d83a2b] sm:text-sm"
          >
            Book a Free Consultation
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M4 12h16m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
