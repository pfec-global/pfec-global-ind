import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeUp, zoomIn } from "@/lib/motion";

const factors = [
  "Choosing the right Study Destination based on your aspirations",
  "Evaluate tuition fees, living expenses, scholarships, travel and insurance.",
  "Understand the reputation of the institution that you are applying to.",
  "Familiarize yourself with visa process and rules for international students",
  "Choosing the right Study Destination based on your aspirations",
];

export default function Factors() {
  return (
    <section className="bg-[#f4f4f4] py-12 lg:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Desktop: image on the left. Mobile and tablet: image below the text, just above the next section. */}
        <motion.div {...zoomIn()} className="order-last lg:order-first">
          <Image
            src="/images/factor_to_consider.webp"
            alt="Student with headphones holding her books"
            width={1400}
            height={765}
            sizes="(min-width: 1024px) 600px, 100vw"
            className="mx-auto h-auto w-full max-w-xl"
          />
        </motion.div>

        <div>
          <motion.h2 {...fadeUp()} className="max-w-md text-2xl font-bold leading-snug text-indigo sm:text-3xl">
            Factors to Consider Before you Decide to Study Abroad
          </motion.h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {factors.map((factor, i) => (
              <motion.div key={i} {...fadeUp(i * 0.08)}>
                <p className="h-full rounded-xl border border-black/5 bg-[#f1f4f8] p-4 text-sm shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-accent/30 hover:bg-white hover:shadow-xl">
                  {factor}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
