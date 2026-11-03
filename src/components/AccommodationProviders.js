
"use client";

const providers = [
  {
    id: "casita",
    name: "Casita",
    logo: "/images/casita-logo.webp",
    features: [
      {
        icon: "building",
        text: "Properties in 400+ Cities across 60+ Countries",
      },
      { icon: "tag", text: "Low Price Guarantee" },
      { icon: "check", text: "100% Verified Listings" },
      { icon: "support", text: "24/7 Customer Support" },
    ],
    url: "https://www.casita.com/?utm_source=pfe-5788",
  },
  {
    id: "university-living",
    name: "University Living",
    logo: "/images/university-living-logo.webp",
    features: [
      {
        icon: "building",
        text: "65000+ Properties across 640 Cities Globally",
      },
      { icon: "shield", text: "Safe & Secure Options" },
      { icon: "check", text: "Verified Listings" },
      { icon: "support", text: "24/7 Customer Support" },
    ],
    url: "https://pfecglobal.in/university-living/",
  },
];

function FeatureIcon({ type }) {
  const common = {
    width: 15,
    height: 15,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const paths = {
    building: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="1" />
        <path d="M8 5V2M16 5V2M3 10h18M8 10v11M16 10v11M3 15h18" />
      </>
    ),
    tag: (
      <>
        <path d="M20 13l-7 7L3 10V3h7l10 10z" />
        <circle cx="7.5" cy="7.5" r="1" />
      </>
    ),
    check: (
      <>
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="currentColor"
          stroke="none"
        />
        <path
          d="m8 12 2.5 2.5L16 9"
          stroke="#fff"
          strokeWidth="2.5"
        />
      </>
    ),
    support: (
      <>
        <path d="M4 13v-2a8 8 0 0 1 16 0v2" />
        <rect x="3" y="12" width="4" height="7" rx="2" />
        <rect x="17" y="12" width="4" height="7" rx="2" />
        <path d="M17 19a3 3 0 0 1-3 3h-2" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  };

  return <svg {...common}>{paths[type]}</svg>;
}

export default function AccommodationProviders() {
  return (
    <section
      className="w-full bg-[#F8F8F8] py-12 sm:py-14 lg:py-16"
      aria-labelledby="accommodation-heading"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
        {/* Section Heading */}
        <h2
          id="accommodation-heading"
          className="mb-9 text-center text-2xl font-bold leading-tight text-[#182B82] sm:mb-12 sm:text-3xl"
        >
          Choose from Reliable Accommodation Providers
        </h2>

        {/* Provider Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
          {providers.map((provider) => (
            <article
              key={provider.id}
              className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)] sm:p-7 lg:p-8"
            >
              {/* Logo Image */}
              <div className="flex min-h-[110px] items-center justify-center border-b border-gray-100 pb-5">
                <img
                  src={provider.logo}
                  alt={`${provider.name} logo`}
                  className="h-auto max-h-[75px] w-auto max-w-[220px] object-contain"
                />
              </div>

              {/* Provider Features */}
              <div className="flex flex-1 flex-col gap-5 py-6">
                {provider.features.map((feature, index) => (
                  <div
                    key={`${provider.id}-${index}`}
                    className="flex items-start gap-3 text-sm leading-6 text-gray-700 sm:text-[15px]"
                  >
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FFF0ED] text-[#EF4939]">
                      <FeatureIcon type={feature.icon} />
                    </span>

                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Explore Button */}
              <a
                href={provider.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Explore ${provider.name}`}
                className="group mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#EF4939] px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#D93628] focus:outline-none focus:ring-2 focus:ring-[#EF4939] focus:ring-offset-2 sm:w-fit sm:min-w-[180px]"
              >
                Explore Now
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
