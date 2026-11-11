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
    <section className="bg-[#f6f7fb] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div {...fadeUp()} className="text-center">
          <h2 className="text-2xl font-bold text-black sm:text-3xl">
            Our <span className="text-[#18349a]">Core Values</span>
          </h2>
        </motion.div>

        {/* Values: one card each. On hover the card lifts, its border turns red, a red bar sweeps
            in along the bottom and the icon pops. (The hover lives on the inner card, because the
            outer motion.div controls its own transform for the scroll-in animation.) */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {values.map((value, index) => (
            <motion.div key={value.title} {...fadeUp(index * 0.08)} className="h-full">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#e6e8ef] bg-white p-6 shadow-[0_4px_14px_rgba(16,0,79,0.06)] transition duration-300 ease-out hover:-translate-y-2 hover:border-[#ef4b3b]/40 hover:shadow-[0_18px_40px_rgba(239,75,59,0.18)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-7">
                {/* Icon - grows and gets a soft red glow on hover */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ef4b3b] text-white ring-0 ring-[#ef4b3b]/15 transition duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:ring-8 [&_svg]:h-6 [&_svg]:w-6">
                  {value.icon}
                </div>

                {/* Title */}
                <h3 className="mt-5 text-lg font-semibold text-[#ef4b3b] sm:text-xl">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-6 text-black/75 sm:text-base">
                  {value.description}
                </p>

                {/* Red bar that sweeps in from the left along the bottom on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#ef4b3b] transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}