import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { fadeUp, zoomIn } from "@/lib/motion";

export const courses = [
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

// heading and items come from Strapi; without them the built-in content is used.
// An item is a course name, or { name, href, icon } - icon ({ src, alt }) is shown before the name
// when Strapi sends one, and left out otherwise. A plain name (or one without href) links nowhere yet.
const toItem = (course) => (typeof course === "string" ? { name: course } : course);

// A heading passed as null is left out (the home page does this for fields Strapi does not send).
// moreHref (optional): a link under the buttons to the page with every course - the home page shows only some.
export default function PopularCourses({ heading, items = courses, moreHref }) {
  return (
    <section className="bg-[linear-gradient(180deg,#C2F4FF_0%,#FFFFFF_100%)] py-12 lg:py-16">
      <div className="mx-auto grid max-w-7xl items-end gap-10 px-4 sm:px-6 lg:grid-cols-[11fr_9fr] lg:px-8">
        <div>
          {heading !== null && (
            <motion.h2 {...fadeUp()} className="max-w-md text-2xl font-semibold leading-snug sm:text-3xl">
              {heading ?? (
                <>
                  <span className="text-indigo">Explore Popular courses</span> chosen by other study abroad aspirants
                </>
              )}
            </motion.h2>
          )}

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
            {items.map(toItem).map(({ name, href = "#", icon }, i) => (
              <motion.div key={name} {...fadeUp(i * 0.06)}>
                <Link
                  href={href}
                  className="group flex h-full items-center justify-between gap-3 rounded-lg border border-black/5 bg-white px-3.5 py-3 text-[13px] leading-snug shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-xl"
                >
                  <span className="flex items-center gap-2.5">
                    {icon && (
                      <Image
                        src={icon.src}
                        alt=""
                        width={24}
                        height={24}
                        className="h-6 w-6 shrink-0 object-contain"
                      />
                    )}
                    {name}
                  </span>
                  <svg
                    className="h-3.5 w-3.5 shrink-0 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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

          {moreHref && (
            <motion.div {...fadeUp(0.2)} className="mt-6">
              <Link
                href={moreHref}
                className="group inline-flex items-center gap-3 rounded-lg border border-accent px-5 py-2.5 text-sm font-semibold text-accent transition duration-300 hover:bg-accent hover:text-white"
              >
                Explore All Courses
                <svg
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M4 12h16m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          )}
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
