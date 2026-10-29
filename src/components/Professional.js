import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";

const recognitions = [
  {
    title: "Accreditations",
    src: "/images/Frame 1000002053.png",
    alt: "PFEC Global accreditations including AIRC and ICEF",
  },
  {
    title: "Professional Certifications",
    src: "/images/Frame 1000002055.png",
    alt: "PFEC Global professional certifications",
  },
  {
    title: "Professional Membership",
    src: "/images/Frame 1000002056.png",
    alt: "PFEC Global professional memberships",
  },
];

export default function ProfessionalRecognition() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div {...fadeUp()} className="text-center">
          <h2 className="text-2xl font-bold text-black sm:text-3xl">
            Our Professional Certifications, Memberships, and Partnerships
          </h2>

          <p className="mt-4 text-sm text-black/70 sm:text-base">
            Prestigious recognitions that speak volumes about the quality of our
            service.
          </p>
        </motion.div>

        {/* Image Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recognitions.map((item, index) => (
            <motion.div
              key={item.title}
              {...fadeUp(index * 0.08)}
              className="group overflow-hidden rounded-2xl shadow-[0_4px_18px_rgba(0,0,0,0.10)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.14)]"
            >
              <div className="relative aspect-[4/2.6] w-full overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}