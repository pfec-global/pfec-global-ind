
"use client";

import { useEffect, useRef, useState } from "react";

const insuranceTips = [
  {
    title: "University and Country Requirements",
    description:
      "Each country and university may have different requirements concerning the OSHC. Check and ask about it before you decide to purchase a plan. Most countries insist on OSHC before commencing the course. The requirements may also vary depending on the type of visa issued.",
    bg: "bg-[#fff8e5]",
  },
  {
    title: "Compare Different Plans",
    description:
      "After you are clear about the insurance specifications, research and compare the plans available. You should consider the coverage offered as well as the exclusions. Also, consider the amount that goes into the benefits. Most plans offer coverage for pre and post-hospitalisation expenses, doctor's visits, medical checkups, evacuation, repatriation, prescription medicines, etc. Seek the advice of an insurance agent if necessary.",
    bg: "bg-[#e4f7fb]",
  },
  {
    title: "Read The Fine Print",
    description:
      "Read between the lines to avoid surprises. Look for what is excluded, waiting periods, hidden limits, etc., that are normally mentioned in the terms and conditions.",
    bg: "bg-[#e3f8ec]",
  },
];

const insuranceBenefits = [
  { title: "Exclusive benefits", icon: "gift" },
  { title: "Quick turnaround", icon: "clock" },
  { title: "Value for money", icon: "wallet" },
];

const eligibilityCriteria = [
  "Should have a student visa for the duration of their stay in the foreign country.",
  "They should have an admission letter for a full-time course study from an approved University.",
  "The student health cover should be for the entire duration of their stay in the country.",
  "The age criteria vary with the insurance provider. The student should meet the age criteria specified by the respective insurance company.",
  "If any family member is accompanying the student, insurance coverage will be required for the partner as well.",
];

function AnimatedSection({ children, className = "", delay = 0 }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${className} transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
      <path d="M3 12h5l2-4 4 8 2-4h5" />
    </svg>
  );
}

function BenefitIcon({ type }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      aria-hidden="true"
      {...common}
    >
      {type === "gift" && (
        <>
          <rect x="3" y="8" width="18" height="13" rx="2" />
          <path d="M12 8v13M3 12h18M12 8H7a3 3 0 1 1 3-3l2 3Zm0 0h5a3 3 0 1 0-3-3l-2 3Z" />
        </>
      )}

      {type === "clock" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </>
      )}

      {type === "wallet" && (
        <>
          <rect x="3" y="5" width="18" height="15" rx="2" />
          <path d="M3 9h18M16 14h2M7 5V3h10v2" />
        </>
      )}
    </svg>
  );
}

function ConsultationButton() {
  return (
    <a
      href="#register-now"
      className="mt-5 inline-flex items-center gap-3 rounded-sm bg-[#ef4938] px-5 py-3 font-montserrat text-xs font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#d83a2b] sm:text-sm"
    >
      Book a Free Consultation
      <span aria-hidden="true">→</span>
    </a>
  );
}

function DecorativeImage({ src, alt, imageClassName = "" }) {
  return (
    <div className="relative mx-auto w-full max-w-[600px]">
      {/* Decorative angled shapes */}
   

      <div className="relative z-10 overflow-hidden rounded-xl shadow-md">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`h-[260px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[330px] lg:h-[350px] ${imageClassName}`}
        />
      </div>
    </div>
  );
}

export default function HealthInsurance() {
  return (
    <main className="w-full font-montserrat">

      {/* SECTION 1: HOW TO CHOOSE A PLAN */}
      <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1100px]">
          <AnimatedSection className="text-center">
            <h2 className="text-xl font-bold leading-tight text-[#172b70] sm:text-2xl">
              How to Choose the Best Health Insurance Plan?
            </h2>

            <p className="mx-auto mt-5 max-w-[900px] text-xs leading-[1.8] text-[#222] sm:text-sm">
              Buying the best health insurance plan you should not forget
              before you fly abroad for studies. Choosing the best plan from
              the host of policies under the OSHC can be overwhelming. But
              considering the following can help you shortlist the plans.
            </p>
          </AnimatedSection>

          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {insuranceTips.map((tip, index) => (
              <AnimatedSection key={tip.title} delay={index * 120}>
                <article
                  className={`group h-full min-h-[220px] rounded-2xl border border-black/10 ${tip.bg} p-5 shadow-[0_2px_6px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6`}
                >
                  <div className="text-[#24338c] transition-transform duration-300 group-hover:scale-110">
                    <HeartIcon />
                  </div>

                  <h3 className="mt-3 text-sm font-semibold leading-snug text-[#f04435] sm:text-base">
                    {tip.title}
                  </h3>

                  <p className="mt-4 text-xs leading-[1.7] text-[#252525] sm:text-[13px]">
                    {tip.description}
                  </p>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW TO BUY ONLINE */}
      <section className="bg-[#fafafa] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">

          <AnimatedSection>
            <h2 className="text-xl font-bold leading-snug text-[#172b70] sm:text-2xl">
              How to Buy an Online Health Insurance Plan?
            </h2>

            <div className="mt-5 space-y-4 text-xs leading-[1.8] text-[#292929] sm:text-sm">
              <p>
                You can buy a health insurance plan online by accessing the
                health insurance provider&apos;s official website within a few
                minutes. However, for more clarity about the best insurance
                providers in your host country, you can take the assistance of
                PFEC.
              </p>

              <p>
                PFEC coordinates with the best insurance providers across the
                globe. Whichever country you choose to study abroad, PFEC will
                help you get the best insurance providers who offer:
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {insuranceBenefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="group flex items-center gap-3"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ef4938] text-white transition-transform duration-300 group-hover:scale-110">
                    <BenefitIcon type={benefit.icon} />
                  </span>

                  <h3 className="text-sm font-bold text-black sm:text-base">
                    {benefit.title}
                  </h3>
                </div>
              ))}
            </div>

            <p className="mt-5 text-xs leading-[1.8] text-[#292929] sm:text-sm">
              The team will help you compare policies and get the most relevant
              and affordable student health coverage for you.
            </p>

            <ConsultationButton />
          </AnimatedSection>

          <AnimatedSection delay={150} className="relative">
            

            <img
              src="/images/health-insurance-illustration.webp"
              alt="Healthcare professional examining a patient"
              loading="lazy"
              className="relative z-10 mx-auto h-auto w-full max-w-[420px] object-contain transition-transform duration-500 hover:scale-[1.03]"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* SECTION 3: HEALTH INSURANCE ELIGIBILITY */}
      <section className="overflow-hidden bg-[#fcecea] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">

          {/* LEFT IMAGE */}
          <AnimatedSection>
            <DecorativeImage
              src="/images/health-insurance-eligibility.webp"
              alt="Students discussing study abroad plans with an advisor"
            />
          </AnimatedSection>

          {/* RIGHT CONTENT */}
          <AnimatedSection delay={150}>
            <h2 className="text-xl font-bold leading-snug text-[#172b70] sm:text-2xl">
              Health Insurance Plan Eligibility Criteria
            </h2>

            <p className="mt-5 text-xs leading-[1.8] text-[#222] sm:text-sm">
              As per the visa regulations and specific university/country
              requirements, students going to foreign countries for studies
              should have a student health cover. This will take care of their
              healthcare expenses and provide access to quality treatments
              during their stay abroad. They have to comply with the following
              eligibility criteria to purchase the health insurance plan.
            </p>

            {/* ELIGIBILITY LIST */}
            <div className="mt-5 space-y-4 sm:space-y-5">
              {eligibilityCriteria.map((criterion, index) => (
                <div
                  key={criterion}
                  className="group flex items-start gap-3"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1 block h-4 w-2 shrink-0 -skew-x-[20deg] bg-[#2110a5] transition-transform duration-300 group-hover:scale-y-125 sm:h-5 sm:w-2.5"
                  />

                  <p className="text-xs leading-[1.8] text-[#222] sm:text-sm">
                    {criterion}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-5 text-xs leading-[1.8] text-[#222] sm:text-sm">
              Our team will help you get the most relevant and affordable
              student health coverage for you.
            </p>

            <ConsultationButton />
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
