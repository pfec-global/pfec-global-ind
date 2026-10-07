import Link from "next/link";
import {
  FaBuildingColumns,
  FaHandHoldingDollar,
  FaPlane,
  FaBriefcaseMedical,
  FaHouse,
  FaClipboardCheck,
} from "react-icons/fa6";

const services = [
  { title: "University Admission Assistance", Icon: FaBuildingColumns, color: "bg-sky-100 text-sky-500" },
  { title: "Scholarship Guidance", Icon: FaHandHoldingDollar, color: "bg-red-100 text-red-500" },
  { title: "Student Visa Assistance", Icon: FaPlane, color: "bg-lime-100 text-lime-600" },
  { title: "Health Insurance Assistance", Icon: FaBriefcaseMedical, color: "bg-amber-100 text-amber-500" },
  { title: "Student Accommodation Assistance", Icon: FaHouse, color: "bg-indigo-100 text-indigo-600" },
  { title: "IELTS & PTE Coaching Classes", Icon: FaClipboardCheck, color: "bg-emerald-100 text-emerald-600" },
];

export default function Services() {
  return (
    <section className="bg-[#f9f9f9] bg-linear-to-b from-ink/15 to-ink/0 py-12 lg:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[2fr_3fr] lg:px-8">
        <div>
          <h2 className="text-2xl font-semibold leading-snug sm:text-3xl">
            How PFEC Global Assists International Students in Australia
          </h2>
          <p className="mt-4 max-w-md text-sm text-ink/70 sm:text-base">
            Get comprehensive guidance &amp; end-to-end assistance from expert Education &amp; migration agents for FREE!*
          </p>
          <Link href="#" className="group mt-5 inline-flex items-center gap-3 text-sm font-semibold text-accent">
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
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.title}
              href="#"
              className="group rounded-xl border border-black/5 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-xl"
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${service.color}`}
              >
                <service.Icon className="h-4 w-4" />
              </span>
              <p className="mt-3 text-sm">
                {service.title}{" "}
                <span className="inline-block text-accent transition-transform duration-300 group-hover:translate-x-1">
                  &gt;
                </span>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
