import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { fadeUp, zoomIn } from "@/lib/motion";

const courses = [
  "Architecture & Civil Engineering",
  "Business, Commerce & Management",
  "Education",
  "Food & Hospitality",
  "Computer Science Engineering",
  "Health & Allied Health",
  "Humanities & Social Sciences",
  "Information Technology",
  "Sports & Vocational Courses",
];

export default function PopularCourses() {
  return (
    <section className="bg-[#f4f4f4] py-12 lg:py-16">
      <div className="mx-auto grid max-w-7xl items-end gap-10 px-4 sm:px-6 lg:grid-cols-[11fr_9fr] lg:px-8">
        <div>
          <motion.h2 {...fadeUp()} className="max-w-md text-2xl font-semibold leading-snug sm:text-3xl">
            <span className="text-indigo">Explore Popular courses</span> chosen by other study abroad aspirants
          </motion.h2>

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
            {courses.map((course, i) => (
              <motion.div key={course} {...fadeUp(i * 0.06)}>
                <Link
                  href="#"
                  className="group flex h-full items-center justify-between gap-3 rounded-xl border border-black/5 bg-white p-4 text-sm shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-xl"
                >
                  {course}
                  <svg
                    className="h-4 w-4 shrink-0 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M6 18L18 6M9 6h9v9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div {...zoomIn(0.2)}>
          <Image
            src="/images/study_area_image.webp"
            alt="Two students ready to study abroad"
            width={1304}
            height={724}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="mx-auto h-auto w-full max-w-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
