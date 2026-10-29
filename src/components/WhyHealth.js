
"use client";

import { useEffect, useRef, useState } from "react";
import AdmissionForm from "@/components/AdmissionForm";

const healthBenefits = [
  {
    title: "International Medical Coverage:",
    description:
      "Health insurance provides you with the peace of mind to receive medical care anywhere in the world, ensuring you won't face overwhelming expenses.",
  },
  {
    title: "Visa and Enrollment Support:",
    description:
      "Having health insurance can make obtaining a student visa and enrollment easier. This reduces the chances of your applications being delayed or rejected.",
  },
  {
    title: "Financial Protection:",
    description:
      "In the event of an unexpected incident, having health insurance ensures that your medical expenses are covered. It safeguards you from potential financial stress.",
  },
  {
    title: "Legal Compliance:",
    description:
      "Many countries create specific health insurance requirements for international students. Securing this insurance not only safeguards your well-being but also shields you from potential legal complications and the risk of deportation. Protect yourself and ensure a smooth study experience abroad.",
  },
  {
    title: "Comprehensive Care:",
    description:
      "Health insurance covers expenses related to hospital stays, prescription medications, mental health support, and much more.",
  },
];

export default function WhyHealth() {
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
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-white py-10 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-[1350px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_1fr] lg:gap-8 xl:gap-10">

          {/* LEFT CONTENT */}
          <div
            className={`min-w-0 transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-8 opacity-0"
            }`}
          >
            <h2 className="font-montserrat text-xl font-bold leading-snug text-[#172b70] sm:text-2xl">
              Why is Health Insurance vital for your study abroad experience?
            </h2>

            <p className="mt-6 font-montserrat text-sm leading-7 text-black sm:text-base">
              Health insurance is an essential requirement for a worry-free
              experience while studying abroad.
            </p>

            {/* HEALTH INSURANCE BENEFITS */}
            <div className="mt-8 space-y-5 sm:mt-10 sm:space-y-6">
              {healthBenefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="group flex items-start gap-4 sm:gap-5"
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Decorative marker */}
                  <div className="flex shrink-0 items-center justify-center pt-2">
                    <span className="block h-6 w-3 -skew-x-[18deg] bg-[#2110a5] transition-transform duration-300 group-hover:scale-y-125 sm:h-7 sm:w-3.5" />
                  </div>

                  {/* Benefit text */}
                  <p className="font-montserrat text-sm leading-[1.8] text-[#111] sm:text-base">
                    <strong className="font-bold">
                      {benefit.title}
                    </strong>{" "}
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT FORM */}
          <div
            className={`min-w-0 transition-all delay-150 duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
            }`}
          >
            <AdmissionForm />
          </div>

        </div>
      </div>
    </section>
  );
}
