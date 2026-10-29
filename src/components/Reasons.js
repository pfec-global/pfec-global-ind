import Image from "next/image";
import * as motion from "motion/react-client";
import { LuGraduationCap, LuBriefcase, LuGlobe, LuSprout, LuHandshake } from "react-icons/lu";
import { fadeUp, zoomIn } from "@/lib/motion";

const reasons = [
  {
    title: "Quality Education",
    text: "Access world-class universities and unique academic programs that may not be available in your home country.",
    Icon: LuGraduationCap,
  },
  {
    title: "Career Advantages",
    text: "Employers value the cross-cultural communication, flexibility, and resilience developed through studying abroad.",
    Icon: LuBriefcase,
  },
  {
    title: "Cultural Immersion",
    text: "Experience new cultures, languages, and traditions firsthand, broadening your perspective and understanding of the world.",
    Icon: LuGlobe,
  },
  {
    title: "Personal Growth",
    text: "Living in a different country fosters independence, adaptability, and problem-solving skills, helping you grow as an individual.",
    Icon: LuSprout,
  },
  {
    title: "Global Networking",
    text: "Build a network of international friends, professionals, and mentors, which can open doors to global career opportunities.",
    Icon: LuHandshake,
  },
];

export default function Reasons() {
  return (
    <section className="bg-[#f9f9f9] py-12 lg:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <motion.h2 {...fadeUp()} className="text-2xl font-bold leading-snug text-indigo sm:text-3xl">
            5 Reasons Why you Studying Abroad is a Great Decision
          </motion.h2>

          <ul className="mt-6 space-y-5">
            {reasons.map((reason, i) => (
              <motion.li key={reason.title} {...fadeUp(i * 0.08)} className="group flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent transition duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
                  <reason.Icon className="h-5 w-5" />
                </span>
                <p className="text-sm leading-relaxed sm:text-base">
                  <span className="font-semibold">{reason.title}:</span> {reason.text}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div {...zoomIn(0.2)}>
          <Image
            src="/images/5_reason.webp"
            alt="Student holding a passport and a paper plane"
            width={1400}
            height={994}
            sizes="(min-width: 1024px) 600px, 100vw"
            className="mx-auto h-auto w-full max-w-xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
