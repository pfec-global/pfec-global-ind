
"use client";

import { useState } from "react";

const destinations = [
  "Australia", "UK", "Canada", "USA", "Ireland",
  "New Zealand", "Germany", "Dubai", "Malaysia",
  "Help me decide",
];

const offices = [
  "Chennai", "Bangalore", "Hyderabad", "Mumbai",
  "Delhi", "Pune", "Kochi",
];

const englishTestStatuses = [
  "I have the score available",
  "My exams are scheduled or waiting for result",
  "I have not appeared for any exams",
  "I am planning to reappear soon",
];

const fundingOptions = [
  "I have my own funds",
  "I am looking for Education Loans",
  "I am looking for Scholarships",
  "My parents will fund my studies",
  "My siblings will fund my studies",
  "I don't have source of funds",
];

export default function AdmissionForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    office: "",
    destination: "",
    englishTest: "",
    funding: "",
    agree: true,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePhoneChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      phone: e.target.value.replace(/\D/g, "").slice(0, 15),
    }));

    setErrors((prev) => ({ ...prev, phone: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim())
      newErrors.name = "Full name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim())
      newErrors.phone = "Mobile number is required";
    else if (formData.phone.length < 7)
      newErrors.phone = "Please enter a valid mobile number";

    if (!formData.office)
      newErrors.office = "Please select an office";

    if (!formData.destination)
      newErrors.destination = "Please select a destination";

    if (!formData.englishTest)
      newErrors.englishTest = "Please select an option";

    if (!formData.funding)
      newErrors.funding = "Please select an option";

    if (!formData.agree)
      newErrors.agree = "Please accept the privacy policy";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    console.log("Admission Support Form:", formData);

    // Connect your API or Zoho Forms here.
  };

  const inputClass = (name) =>
    `h-10 w-full rounded-xl border bg-white px-3 text-[14px] outline-none placeholder:text-[#222] ${
      errors[name] ? "border-red-500" : "border-[#ef4d39]"
    }`;

  const selectField = (name, placeholder, options) => (
    <div>
      <select
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className={`${inputClass(name)} h-11 appearance-none`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {errors[name] && (
        <p className="mt-1 text-xs text-red-500">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="rounded-2xl bg-white p-4 shadow-[0_3px_18px_rgba(0,0,0,0.12)] md:p-5">
      <h2 className="mb-5 text-center font-jakarta text-[16px] font-medium text-[#111] md:text-[17px]">
        Register with Us to Take the Next Step
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className={inputClass("name")}
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={inputClass("email")}
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
        </div>

        <div>
          <div className="flex gap-2">
            <input
              value="+91"
              readOnly
              aria-label="Country code"
              className="h-10 w-[64px] rounded-xl border border-[#ef4d39] text-center"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="Mobile Number"
              inputMode="numeric"
              className={inputClass("phone")}
            />
          </div>
          {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
        </div>

        {selectField("office", "Your Nearest PFEC Office", offices)}
        {selectField("destination", "Your Preferred Study Destination", destinations)}
        {selectField("englishTest", "English Language Test Status", englishTestStatuses)}
        {selectField("funding", "How Do You Plan To Fund Your Studies", fundingOptions)}

        <div className="flex items-start gap-3 pt-2">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            className="mt-1 h-4 w-4 accent-[#1976d2]"
          />

          <p className="font-jakarta text-[12px] leading-[1.45] text-[#ef4d39]">
            I agree to PFEC's{" "}
            <a href="/privacy-policy" className="underline">
              Privacy Policy
            </a>{" "}
            and consent to receive marketing and transactional updates via
            RCS, SMS, WhatsApp, and Email.
          </p>
        </div>

        {errors.agree && <p className="text-xs text-red-500">{errors.agree}</p>}

        <div className="flex justify-center pt-2">
          <button
            type="submit"
            className="rounded-full bg-[#ef4d39] px-7 py-2 font-jakarta text-[18px] font-bold text-white transition hover:bg-[#d93f2d]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
