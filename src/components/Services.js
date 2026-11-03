import Image from "next/image";
import Link from "next/link";
import {
  FaBuildingColumns,
  FaHandHoldingDollar,
  FaPlane,
  FaBriefcaseMedical,
  FaHouse,
  FaClipboardCheck,
} from "react-icons/fa6";
import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";
import { serviceItems } from "@/data/services";

const services = [
  { title: "University Admission Assistance", href: "/services/admission-support", Icon: FaBuildingColumns, color: "bg-sky-100 text-sky-500" },
  { title: "Scholarship Guidance", href: "/scholarships", Icon: FaHandHoldingDollar, color: "bg-red-100 text-red-500" },
  { title: "Student Visa Assistance", href: "/services/visa-services", Icon: FaPlane, color: "bg-lime-100 text-lime-600" },
  { title: "Health Insurance Assistance", href: "/services/health-insurance", Icon: FaBriefcaseMedical, color: "bg-amber-100 text-amber-500" },
  { title: "Student Accommodation Assistance", href: "/services/student-accommodations", Icon: FaHouse, color: "bg-indigo-100 text-indigo-600" },
  { title: "IELTS & PTE Coaching Classes", href: "/contact-us", Icon: FaClipboardCheck, color: "bg-emerald-100 text-emerald-600" },
];

// The service cards on their own - also used on the services page.
// items (from Strapi) is a list of { title, href, icon: { src, alt } | null }; without it the six built-in services are shown.
// A Strapi service without a picture borrows the icon and colour of the built-in card in the same position.
export function ServiceCards({ items }) {
  const cards = items
    ? items.map((item, i) => ({ ...services[i % services.length], ...item }))
    : services;

  return (
    // Four cards sit two by two, more than four in rows of three
    <div className={`grid grid-cols-2 gap-3 ${cards.length > 4 ? "md:grid-cols-3" : ""}`}>
      {cards.map((service, i) => (
        <motion.div key={service.title} {...fadeUp(i * 0.08)}>
          <Link
            href={service.href}
            className="group block h-full rounded-xl border border-black/5 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-xl"
          >
            {service.icon ? (
              // A picture uploaded in Strapi fills the whole circle (it brings its own colours)
              <Image
                src={service.icon.src}
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-contain transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${service.color}`}
              >
                <service.Icon className="h-4 w-4" />
              </span>
            )}
            <p className="mt-3 text-sm">
              {service.title}{" "}
              <span className="inline-block text-accent transition-transform duration-300 group-hover:translate-x-1">
                &gt;
              </span>
            </p>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

// One card for every service that has its own page (the "Our Services" menu, src/data/services.js), linked to it.
// Also used by the services page. cmsItems (optional, from Strapi) lend their title and picture to the card
// that links to the same page.
export function activeServiceCards(cmsItems) {
  return serviceItems.map(({ label, href }) => ({
    ...services.find((service) => service.href === href),
    title: label,
    ...cmsItems?.find((item) => item.href === href),
  }));
}

// heading, subheading and items come from Strapi; without them the built-in content is used
export default function Services({
  heading = "How PFEC Global Assists International Students in Australia",
  subheading = "Get comprehensive guidance & end-to-end assistance from expert Education & migration agents for FREE!*",
  items,
}) {
  const cards = activeServiceCards(items);

  return (
    <section className="bg-[#f9f9f9] bg-linear-to-b from-ink/15 to-ink/0 py-12 lg:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[2fr_3fr] lg:px-8">
        <motion.div {...fadeUp()}>
          <h2 className="text-2xl font-semibold leading-snug sm:text-3xl">
            {heading}
          </h2>
          <p className="mt-4 max-w-md text-sm text-ink/70 sm:text-base">
            {subheading}
          </p>
          {/* On hover an orange fill sweeps in from the left behind the text */}
          <Link href="#" className="group mt-3 -ml-4 relative isolate inline-flex items-center gap-3 overflow-hidden rounded-lg px-4 py-2.5 text-sm font-semibold text-accent transition-colors duration-300 hover:text-white focus-visible:text-white before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-accent before:transition-transform before:duration-300 hover:before:scale-x-100 focus-visible:before:scale-x-100">
            Book a FREE Consultation
            <svg
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 12h16m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

        <ServiceCards items={cards} />
      </div>
    </section>
  );
}
