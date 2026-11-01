
"use client";

import AdmissionForm from "@/components/AdmissionForm";

const destinations = [
  "Australia",
  "United Kingdom",
  "United States of America",
  "Canada",
  "Ireland",
  "New Zealand",
  "Malaysia",
  "Japan",
  "Europe",
  "Dubai (UAE)",
];

const visaBenefits = [
  {
    title: "Expert Guidance",
    description: "Visa applications & documentation",
    image: "/images/Education-pana-1.png",
  },
  {
    title: "High Visa Success Rate",
    description: "For multiple study destinations",
    image: "/images/Globalization-pana-1.png",
  },
  {
    title: "100% FREE",
    description: "Assistance through the visa process",
    image: "/images/Education-pana-1.png",
  },
];

const reasons = [
  {
    title: "Decades of experience:",
    text: "Thousands of successful student visas — high approval rates across all major destinations.",
  },
  {
    title: "Country-specific experts:",
    text: "Each region managed by dedicated specialists aware of the latest embassy changes.",
  },
  {
    title: "Ethical and transparent:",
    text: "Zero false promises or shortcuts; clear guidance at every step.",
  },
  {
    title: "End-to-end support:",
    text: "From initial counseling to landing in your study country.",
  },
];

const visaSteps = [
  "Free initial eligibility assessment and visa pathway planning",
  "Tailored document checklist based on admission and family finances",
  "Proofreading, corrections, and finalization — every document checked before submission",
  "Visa application submission and scheduling of appointments/interviews",
  "Embassy decision and post-approval briefing",
];

const visaTypes = [
  ["Australia", "Student visa (subclass 500), dependents"],
  ["UK", "Student visa (Tier 4/Student Route), Child Student, Graduate Route"],
  ["USA", "F-1, J-1, M-1 visa guidance, SEVIS registration"],
  ["Canada", "Study permits and non-SDS student visa guidance"],
  ["Ireland", "Stamp 2 student visas"],
  ["New Zealand", "Fee Paying Student, Pathway Student visas"],
  ["Malaysia/Japan/Dubai/Europe/Indonesia", "Country-specific study permits and residence applications"],
];

export default function VisaServices() {
  return (
    <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-[1250px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_0.95fr] lg:gap-10">

          {/* LEFT CONTENT */}
          <div className="min-w-0 font-montserrat">
            <h1 className="text-xl font-bold leading-snug text-black sm:text-2xl">
              Why Choose PFEC for Visa Services?
            </h1>

            {/* BENEFIT CARDS */}
            <div className="mt-5 grid grid-cols-3 gap-2">
              {visaBenefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="group flex min-h-[125px] flex-col justify-between overflow-hidden rounded-xl border border-[#f1e7e4] bg-[#fff5f2] p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div>
                    <h2 className="text-xs font-bold leading-tight text-[#ef4b3b] sm:text-sm">
                      {benefit.title}
                    </h2>
                    <p className="mt-1 text-[10px] leading-relaxed text-[#444] sm:text-xs">
                      {benefit.description}
                    </p>
                  </div>

                  <img
                    src={benefit.image}
                    alt={benefit.title}
                    loading="lazy"
                    className="mx-auto mt-2 h-12 w-full object-contain transition-transform duration-500 group-hover:scale-105 sm:h-16"
                  />
                </div>
              ))}
            </div>

            {/* FREE SUPPORT BANNER */}
            <div className="mt-3 rounded-xl bg-gradient-to-r from-[#10175d] to-[#273488] px-4 py-3 text-white shadow-sm">
              <p className="text-xs leading-relaxed sm:text-sm">
                Free End-to-End Guidance, Profile Assessment, Career Guidance,
                University Application Assistance and much more!
              </p>
            </div>

            {/* INTRODUCTION */}
            <div className="mt-6">
              <h2 className="text-base font-bold text-[#10175d] sm:text-lg">
                PFEC India Visa Services for Study Abroad
              </h2>

              <p className="mt-3 text-xs leading-[1.8] text-[#333] sm:text-sm">
                PFEC India provides comprehensive, expert visa services for
                students planning to study in the world's top destinations. As
                one of the most trusted international education consultancies,
                our dedicated team guides Indian students smoothly through
                every step of the student visa process — maximizing approvals
                and minimizing stress.
              </p>
            </div>

            {/* DESTINATIONS */}
            <div className="mt-6">
              <h2 className="text-base font-bold text-[#10175d] sm:text-lg">
                Our Destinations for Student Visa Assistance
              </h2>

              <p className="mt-3 text-xs leading-relaxed text-[#333] sm:text-sm">
                We offer specialized visa support for the following study
                abroad countries:
              </p>

              <ul className="mt-3 list-disc space-y-1 pl-5 text-xs leading-relaxed text-[#222] sm:text-sm">
                {destinations.map((destination) => (
                  <li key={destination}>{destination}</li>
                ))}
              </ul>
            </div>

            {/* WHY CHOOSE PFEC */}
            <div className="mt-7">
              <h2 className="text-base font-bold text-[#10175d] sm:text-lg">
                Why Choose PFEC India for Visa Services?
              </h2>

              <ul className="mt-4 list-disc space-y-2 pl-5 text-xs leading-[1.7] text-[#333] sm:text-sm">
                {reasons.map((reason) => (
                  <li key={reason.title}>
                    <strong>{reason.title}</strong> {reason.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* VISA PROCESS */}
            <div className="mt-7">
              <h2 className="text-base font-bold text-[#10175d] sm:text-lg">
                How Our Visa Experts Work With You
              </h2>

              <ul className="mt-4 list-disc space-y-1.5 pl-5 text-xs leading-[1.7] text-[#333] sm:text-sm">
                {visaSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>

            {/* SUPPORTED VISA TYPES */}
            <div className="mt-7">
              <h2 className="text-base font-bold text-[#10175d] sm:text-lg">
                Supported Visa Types (by Country)
              </h2>

              <ul className="mt-4 list-disc space-y-2 pl-5 text-xs leading-[1.7] text-[#333] sm:text-sm">
                {visaTypes.map(([country, description]) => (
                  <li key={country}>
                    <strong>{country}:</strong> {description}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT FORM - REUSABLE COMPONENT */}
          <div className="min-w-0 lg:sticky lg:top-24">
            <AdmissionForm />
          </div>

        </div>
      </div>
    </section>
  );
}
