import { connection } from "next/server";
import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";
import { getCoursesPage } from "@/lib/courses";
import { toMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import HighlightText from "@/components/HighlightText";

// The page waits for Strapi on every visit while caching is switched off (CACHE_STRAPI in src/lib/strapi.js).
// This tells Next.js that waiting is expected here. Remove it when caching is switched back on.
export const instant = false;

// SEO tags from the "seo" block of the study area page in Strapi; these fill any gaps
export async function generateMetadata() {
  // Rendered on every visit (the page waits for Strapi anyway); without this Next.js reports an unstable
  // Date.now() while it prerenders this route
  await connection();
  return toMetadata((await getCoursesPage())?.seo, {
    title: "Courses to Study Abroad | PFEC Global",
    description: "Explore popular courses to study abroad and get free guidance from our study abroad experts.",
  });
}

// One course card. The logo, summary, study levels and top places are only shown when Strapi sends them.
function CourseCard({ course, index }) {
  return (
    // The outer motion.div plays the scroll-in animation; the hover lift is on the card inside it
    <motion.div {...fadeUp((index % 3) * 0.08)} className="h-full">
      <Link
        href={course.href}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#e6e8ef] bg-white p-6 shadow-[0_4px_14px_rgba(16,0,79,0.06)] transition duration-300 ease-out hover:-translate-y-2 hover:border-accent/40 hover:shadow-[0_18px_40px_rgba(239,75,59,0.18)] sm:p-7"
      >
        {course.icon && (
          <span className="mb-5 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-accent/10 ring-0 ring-accent/15 transition duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:ring-8">
            <Image src={course.icon.src} alt="" width={56} height={56} className="h-9 w-9 object-contain" />
          </span>
        )}
        <h2 className="text-xl font-semibold text-ink transition-colors duration-300 group-hover:text-accent"><HighlightText text={course.name} /></h2>
        {course.summary && <p className="mt-2 text-sm leading-6 text-ink/70">{course.summary}</p>}

        {(course.levels.length > 0 || course.destinations.length > 0) && (
          <dl className="mt-5 space-y-2 border-t border-ink/10 pt-4 text-xs">
            {course.levels.length > 0 && (
              <div className="flex gap-2">
                <dt className="w-20 shrink-0 font-semibold text-ink/50">Levels</dt>
                <dd className="text-ink/80">{course.levels.join(" · ")}</dd>
              </div>
            )}
            {course.destinations.length > 0 && (
              <div className="flex gap-2">
                <dt className="w-20 shrink-0 font-semibold text-ink/50">Top places</dt>
                <dd className="text-ink/80">{course.destinations.slice(0, 3).join(", ")}</dd>
              </div>
            )}
          </dl>
        )}

        {/* The details sit right under the title; this pushes only the link to the bottom, so the links line up
            across a row (a card with fewer details then has its spare room above the link, not under the title) */}
        <span className="flex-1" />

        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
          Explore Course
          <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M4 12h16m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>

        {/* Red bar that sweeps in from the left along the bottom on hover */}
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100" />
      </Link>
    </motion.div>
  );
}

// Courses list page: /courses/
export default async function CoursesPage() {
  // Rendered on every visit (the page waits for Strapi anyway); without this Next.js reports an unstable
  // Date.now() while it prerenders this route
  await connection();
  // Empty when Strapi cannot be reached or sends no study areas
  const courses = (await getCoursesPage())?.courses ?? [];

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Courses" }]}
        titleTop="Find the Right"
        titleBottom="Course for You"
        subtitle="Explore popular courses to study abroad and get free guidance from our experts"
      />

      <section className="bg-[#f6f7fb] py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {courses.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course, index) => (
                <CourseCard key={course.slug} course={course} index={index} />
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-ink/70">Courses are coming soon.</p>
          )}
        </div>
      </section>

      {/* Closing call to action - "Book a FREE Consultation" opens the registration popup */}
      <section className="bg-indigo px-4 py-12 text-center text-white sm:px-6 lg:py-16">
        <motion.h2 {...fadeUp()} className="mx-auto max-w-3xl text-balance text-2xl font-semibold leading-snug sm:text-3xl">
          Not sure which course is right for you?
        </motion.h2>
        <motion.p {...fadeUp(0.15)} className="mt-4 text-sm text-white/85 sm:text-base">
          Our certified counsellors can match your profile with the right course and institution - for free.
        </motion.p>
        <motion.div {...fadeUp(0.3)} className="mt-6">
          <Link
            href="#"
            className="group inline-flex items-center gap-3 rounded-lg bg-accent px-5 py-3 text-sm font-semibold shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30"
          >
            Book a FREE Consultation
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 12h16m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </section>
    </>
  );
}
