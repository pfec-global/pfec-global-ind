import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";

export default function MissionVision() {
  return (
    <section className="bg-[#f2f6fa] py-12 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">

        {/* Mission */}
        <motion.div
          {...fadeUp()}
          className="rounded-2xl bg-white p-6 shadow-[0_6px_20px_rgba(0,0,0,0.08)] sm:p-7 lg:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold text-[#ef4b3b]">
                Mission
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[#555] sm:text-base">
                Going above and beyond to ensure that each of our student's
                career aspirations has been achieved through our guidance, and
                we achieve this together.
              </p>
            </div>

            {/* Mission Icon */}
            <div className="shrink-0 text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22V12" />
                <path d="M12 12c0-4 2-7 6-8 0 4-2 7-6 8Z" />
                <path d="M12 15c0-3-2-5-6-6 0 4 2 6 6 6Z" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Vision */}
        <motion.div
          {...fadeUp(0.1)}
          className="rounded-2xl bg-white p-6 shadow-[0_6px_20px_rgba(0,0,0,0.08)] sm:p-7 lg:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold text-[#ef4b3b]">
                Vision
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[#555] sm:text-base">
                To be the world’s most trusted education agent that transforms
                student lives.
              </p>
            </div>

            {/* Vision Icon */}
            <div className="shrink-0 text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3 11 14-4 1 6-14 4z" />
                <path d="m17 9 3-1 1 4-3 1" />
                <path d="M8 16 6 22" />
                <path d="M12 15l2 7" />
              </svg>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}