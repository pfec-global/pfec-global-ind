import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";

const values = [
  {
    title: "Client-centric",
    description: "Strive for client satisfaction",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M8.5 9.5c1.5-1.5 5.5-1.5 7 0" />
        <path d="M9 14c1.8 1.2 4.2 1.2 6 0" />
        <path d="M8 12h.01" />
        <path d="M16 12h.01" />
      </svg>
    ),
  },
  {
    title: "Ownership",
    description: "Deliver as committed",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M8.5 9.5h7" />
        <path d="M9.5 13c1.7 1.3 3.3 1.3 5 0" />
        <path d="M9 7.5h6" />
      </svg>
    ),
  },
  {
    title: "Reliability",
    description: "Fostering trust through honesty and openness",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M8 3v6a4 4 0 0 0 8 0V3" />
        <path d="M6 3v3" />
        <path d="M18 3v3" />
        <path d="M12 13v8" />
        <path d="M9 21h6" />
      </svg>
    ),
  },
  {
    title: "Teamwork",
    description: "Strong cooperation for the best conclusion",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="m3 9 9-4 9 4-9 4-9-4Z" />
        <path d="M7 11v4c2.5 2 7.5 2 10 0v-4" />
      </svg>
    ),
  },
];

export default function CoreValues() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div {...fadeUp()} className="text-center">
          <h2 className="text-2xl font-bold text-black sm:text-3xl">
            Our <span className="text-[#18349a]">Core Values</span>
          </h2>
        </motion.div>

        {/* Values */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              {...fadeUp(index * 0.08)}
              className="group"
            >
              {/* Icon */}
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ef4b3b] text-white transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110">
                {value.icon}
              </div>

              {/* Title */}
              <h3 className="mt-2 text-lg font-semibold text-[#ef4b3b] sm:text-xl">
                {value.title}
              </h3>

              {/* Description */}
              <p className="mt-3 max-w-xs text-sm leading-6 text-black/80 sm:text-base">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}