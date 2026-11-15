"use client";

import { useId } from "react";

const destinations = [
  "Australia",
  "UK",
  "USA",
  "Canada",
  "Ireland",
  "New Zealand",
  "Germany",
  "Europe",
  "Dubai",
  "Malaysia",
  "Japan",
  "Singapore",
];

const countryCodes = ["+91", "+94", "+62", "+977", "+880", "+971", "+1", "+44", "+61"];

// Every dropdown of the form: its field name, label, placeholder and options.
const selects = {
  destination: { label: "Preferred destination", placeholder: "Select Country", options: destinations },
  studyYear: { label: "Preferred Study Year", placeholder: "Pick a Year", options: ["2026", "2027", "2028"] },
  intake: {
    label: "Preferred Intake",
    placeholder: "Select an Intake",
    options: ["January", "February", "May", "July", "September", "November"],
  },
  studyLevel: {
    label: "Preferred Study Level",
    placeholder: "Select Study Level",
    options: ["Foundation", "Diploma", "Undergraduate", "Postgraduate", "PhD"],
  },
  testStatus: {
    label: "English Language Test Status",
    placeholder: "Select Test Status",
    options: ["Already taken (IELTS / PTE / TOEFL)", "Test booked", "Not taken yet", "Not required"],
  },
  education: {
    label: "Current Highest Education",
    placeholder: "Your last/current degree",
    options: ["12th / Higher Secondary", "Diploma", "Bachelor's Degree", "Master's Degree", "PhD"],
  },
  budget: {
    label: "Your Education Budget",
    placeholder: "Choose your Budget Range",
    options: ["Below ₹15 Lakh", "₹15 – 25 Lakh", "₹25 – 40 Lakh", "Above ₹40 Lakh"],
  },
  score: {
    label: "Latest Education Score",
    placeholder: "Your Last Score",
    options: ["Below 50%", "50 – 60%", "60 – 70%", "70 – 80%", "Above 80%"],
  },
  fundSource: {
    label: "Source of Education Fund",
    placeholder: "Pick your Fund Source",
    options: ["Self / Family Funded", "Education Loan", "Scholarship", "Sponsor"],
  },
};

const labelClass = "mb-2 block text-xs font-semibold text-neutral-900 xl:text-[length:calc(0.85*var(--bu))]";
const fieldClass =
  "h-11 w-full rounded-lg border border-[#cfd3ee] bg-white px-3.5 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-brand focus:ring-2 focus:ring-brand/15 xl:h-[calc(2.95*var(--bu))] xl:text-[length:calc(0.95*var(--bu))]";

const chevron = (
  <svg
    viewBox="0 0 24 24"
    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-700"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

function Select({ name, className = "" }) {
  const id = useId();
  const { label, placeholder, options } = selects[name];
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        {/* The grey placeholder turns dark once a real option is picked */}
        <select
          id={id}
          name={name}
          required
          defaultValue=""
          className={`${fieldClass} cursor-pointer appearance-none truncate pr-9 invalid:text-neutral-400`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} className="text-neutral-900">
              {option}
            </option>
          ))}
        </select>
        {chevron}
      </div>
    </div>
  );
}

export default function ConsultationForm() {
  const id = useId();

  // TODO: send the answers to the CRM. Until then the form only checks that every field is filled.
  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl bg-white p-5 shadow-[0_10px_40px_rgba(0,0,0,0.25)] sm:p-7 xl:rounded-[calc(1.25*var(--bu))] xl:p-[calc(1.75*var(--bu))]"
    >
      <h2 className="text-lg font-bold text-accent sm:text-xl xl:text-[length:calc(1.35*var(--bu))]">
        Book a Free Consultation with PFEC Global
      </h2>

      <div className="mt-5 grid gap-x-[calc(1.75*var(--bu))] gap-y-4 sm:grid-cols-2 xl:mt-[calc(1.5*var(--bu))] xl:gap-y-[calc(1.1*var(--bu))]">
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-name`} className={labelClass}>
            Student Name
          </label>
          <input
            id={`${id}-name`}
            name="name"
            required
            autoComplete="name"
            placeholder="Enter Student’s Name"
            className={fieldClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-email`} className={labelClass}>
            Email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@email.com"
            className={fieldClass}
          />
        </div>

        <div className="flex gap-3 sm:col-span-2">
          <div className="w-[calc(6.5*var(--bu))] shrink-0 xl:w-[calc(8.4*var(--bu))]">
            <label htmlFor={`${id}-code`} className={labelClass}>
              Country Code
            </label>
            <div className="relative">
              <select
                id={`${id}-code`}
                name="countryCode"
                defaultValue="+91"
                className={`${fieldClass} cursor-pointer appearance-none pr-9`}
              >
                {countryCodes.map((code) => (
                  <option key={code}>{code}</option>
                ))}
              </select>
              {chevron}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <label htmlFor={`${id}-phone`} className={labelClass}>
              Phone Number
            </label>
            <input
              id={`${id}-phone`}
              name="phone"
              type="tel"
              required
              autoComplete="tel-national"
              placeholder="98xxx xxxxx"
              className={fieldClass}
            />
          </div>
        </div>

        <Select name="destination" />
        <Select name="studyYear" />
        <Select name="intake" />
        <Select name="studyLevel" />
        <Select name="testStatus" />
        <Select name="education" />
        <Select name="budget" />
        <Select name="score" />
        <Select name="fundSource" className="sm:col-span-2" />
      </div>

      <label className="mt-5 flex cursor-pointer items-center gap-3 text-xs text-neutral-700 xl:text-[length:calc(0.8*var(--bu))]">
        <input
          type="checkbox"
          name="agree"
          required
          className="h-5 w-5 shrink-0 cursor-pointer rounded accent-accent"
        />
        <span>
          I agree to the{" "}
          <a href="/privacy-policy/" target="_blank" className="text-brand underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="/terms-of-use/" target="_blank" className="text-brand underline">
            Terms of Use
          </a>
        </span>
      </label>

      <button
        type="submit"
        className="mt-5 h-12 w-full cursor-pointer rounded-full bg-accent font-bold text-white transition-opacity hover:opacity-90 xl:h-[calc(3.5*var(--bu))] xl:text-[length:calc(1.05*var(--bu))]"
      >
        Book Appointment
      </button>
    </form>
  );
}
