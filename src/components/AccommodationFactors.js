
"use client";

const factors = [
  {
    title: "Location & Connectivity",
    description:
      "Choose accommodation close to your university or with easy access to public transport, shops, and essentials.",
  },
  {
    title: "Safety & Security",
    description:
      "Check for secure entry, CCTV, and emergency support to ensure a safe living environment.",
  },
  {
    title: "Budget & Inclusions",
    description:
      "Compare costs and see what's included—utilities, internet, furnishings, etc.—to avoid hidden expenses.",
  },
  {
    title: "Amenities & Facilities",
    description:
      "Look for features like laundry, kitchen, study areas, and social spaces that support both study and lifestyle.",
  },
  {
    title: "Contract Flexibility",
    description:
      "Review lease terms, cancellation policies, and notice periods in case your plans change.",
  },
];

export default function AccommodationFactors() {
  return (
    <section className="w-full overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-10">

        {/* Left Content */}
        <div>
          <h2 className="max-w-[500px] text-2xl font-bold leading-snug text-[#182B82] sm:text-3xl">
            Factors to Consider before Finalizing a Student Accommodation
          </h2>

          <p className="mt-4 max-w-[490px] text-sm leading-6 text-gray-700">
            Here are some of the key factors that will vary based on the needs
            of each student:
          </p>

          {/* Factors List */}
          <div className="mt-6 space-y-5">
            {factors.map((factor, index) => (
              <div
                key={factor.title}
                className="flex items-start gap-4"
              >
                {/* Decorative Slanted Shape */}
                <div className="mt-3 h-6 w-3 shrink-0 -skew-x-[20deg] bg-[#202D87]" />

                <div>
                  <h3 className="text-sm font-bold leading-5 text-black">
                    {factor.title}
                  </h3>

                  <p className="mt-1 text-[13px] leading-[1.6] text-gray-800">
                    {factor.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="/contact-us"
            className="group mt-6 inline-flex items-center gap-2 rounded-lg border border-[#FF493D] px-3 py-2 text-xs font-medium text-[#FF493D] transition-all duration-300 hover:bg-[#FF493D] hover:text-white"
          >
            Book a Free Consultation
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M4 12h16m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Right Image */}
        <div className="relative mx-auto w-full max-w-[550px] lg:ml-auto">
         

          {/* Image */}
          <div className="relative z-10 aspect-[1.55/1] w-full overflow-hidden rounded-xl">
            <img
              src="/images/accommodation-factors.webp"
              alt="Student settling into a new accommodation"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
