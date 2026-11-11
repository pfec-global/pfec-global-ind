import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";

// Hover effect, shared with the Core Values cards: the card lifts and its border turns red, a red bar
// sweeps in along the bottom, and the icon turns red and pops. The hover is on an inner div because the
// outer motion.div controls its own transform for the scroll-in animation.
const card =
  "group relative h-full overflow-hidden rounded-2xl border border-transparent bg-white p-6 shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition duration-300 ease-out hover:-translate-y-2 hover:border-[#ef4b3b]/40 hover:shadow-[0_18px_40px_rgba(239,75,59,0.18)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-7 lg:p-8";
const bar =
  "absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#ef4b3b] transition-transform duration-500 ease-out group-hover:scale-x-100";
const icon =
  "shrink-0 text-black transition duration-300 group-hover:-rotate-6 group-hover:scale-125 group-hover:text-[#ef4b3b]";

export default function MissionVision() {
  return (
    <section className="bg-[#f2f6fa] py-12 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">

        {/* Mission */}
        <motion.div {...fadeUp()} className="h-full">
          <div className={card}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-[#ef4b3b]">
                  Mission
                </h3>

                <p className="mt-4 max-w-xl text-sm leading-7 text-[#555] sm:text-base">
                  Going above and beyond to ensure that each of our student’s
                  career aspirations has been achieved through our guidance, and
                  we achieve this together.
                </p>
              </div>

              {/* Mission Icon */}
              <div className={icon}>
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
            <span aria-hidden="true" className={bar} />
          </div>
        </motion.div>

        {/* Vision */}
        <motion.div {...fadeUp(0.1)} className="h-full">
          <div className={card}>
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
              <div className={icon}>
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
            <span aria-hidden="true" className={bar} />
          </div>
        </motion.div>

      </div>
    </section>
  );
}