
"use client";

import { useState } from "react";

const countries = [
  { id: "india", name: "India", code: "IN" },
  { id: "australia", name: "Australia", code: "AU" },
  { id: "bangladesh", name: "Bangladesh", code: "BD" },
  { id: "sri-lanka", name: "Sri Lanka", code: "LK" },
];

const offices = {
  india: [
    {
      city: "Kolkata",
      address:
        "Landmark Building (Opp. of Minto Park Bus Stand), 9th Floor, 228A, A.J.C Bose Road, Kolkata - 700020",
      phone: "+91 98 3693 4948",
    },
    {
      city: "Ahmedabad",
      address:
        "Unit No. 102, First Floor, Mahalaxya Building, Chimanlal Girdharlal Rd, Ahmedabad, Gujarat 380009",
      phone: "+91 79 4090 3800",
    },
  ],

  australia: [
    {
      city: "Sydney",
      address:
        "Suite 402, Level 4/447 Kent St, Sydney NSW 2000, Australia",
      phone: "+61 2 8378 4282",
      map: true,
    },
    {
      city: "Melbourne",
      address:
        "11/50 Queen St, Melbourne VIC 3000, Australia",
      phone: "+61 3 9620 1773",
      map: true,
    },
    {
      city: "Adelaide",
      address:
        "Level M/90 King William St, Adelaide SA 5000, Australia",
      phone: "+61 8 7099 2258",
      map: true,
    },
    {
      city: "Perth",
      address:
        "Suite A, Level 8th/16 St Georges Terrace, Perth WA 6000, Australia",
      phone: "+61 8 6266 8335",
    },
    {
      city: "Brisbane",
      address:
        "Level 18/324 Queen St, Brisbane City QLD 4000, Australia",
      phone: "+61 7 3102 1707",
      map: true,
    },
    {
      city: "Lakemba",
      address:
        "13/61-67 Haldon St, Lakemba NSW 2195, Australia",
      phone: "+61 2 8378 4282",
      map: true,
    },
  ],

  bangladesh: [
    {
      city: "Dhanmondi",
      address:
        "SIMA Blossom (5th Floor) Plot 390 (Old), 03 (New), Road-27 (Old) 16, New, Dhaka 1209, Bangladesh",
      phone: "+880 9609 80 03 00",
    },
    {
      city: "Banani",
      address:
        "RSR Tower (7th Floor), House no. 50, Block C, Rd No. 11, Banani, Dhaka 1213",
      phone: "+880 9609 80 07 00",
    },
    {
      city: "Chattogram",
      address:
        "5th floor, Equity Centrum, O R Nizam Road, GEC Circle, Chattogram",
      phone: "+880 9609 80 04 00",
    },
    {
      city: "Uttara",
      address:
        "Level 8, RM Plaza, 20 Sonargaon Jonopath Road, Sector 11, Dhaka 1230",
      phone: "+880 9609 80 05 00",
    },
  ],

  "sri-lanka": [
    {
      city: "Colombo",
      address:
        "PFEC Global, 2nd Floor, 72C Bauddhaloka Mawatha, Colombo 04 (Irish Consulate Building)",
      phone: "+94 77 734 3234",
    },
  ],
};

/* Inline SVG icons */

function MapPinIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2a8 8 0 0 0-8 8c0 5.5 8 12 8 12s8-6.5 8-12a8 8 0 0 0-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.56.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.56 1 1 0 0 1-.25 1.02Z" />
    </svg>
  );
}

function OfficeCard({ office, countryId }) {
  const buttonText =
    countryId === "australia"
      ? "Book an Appointment"
      : "Schedule a Virtual Meeting";

  const mapQuery = encodeURIComponent(
    `${office.address}, ${office.city}`
  );

  return (
    <article className="flex h-full min-w-0 flex-col rounded-2xl border border-[#dddddd] bg-white p-5 shadow-[0_5px_10px_rgba(0,0,0,0.09)] transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6">
      <h3 className="text-xl font-bold leading-7 text-[#182B82]">
        {office.city}
      </h3>

      {/* Address */}
      <div className="mt-4 flex items-start gap-3">
        <span className="mt-1 shrink-0 text-[#FF4058]">
          <MapPinIcon />
        </span>

        <p className="min-w-0 break-words text-[15px] leading-[1.65] text-[#626B7A]">
          {office.address}

          {office.map && (
            <>
              {" "}
              (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-transparent transition hover:text-[#182B82] hover:decoration-current"
              >
                Get Location on Google Map
              </a>
              )
            </>
          )}
        </p>
      </div>

      {/* Phone */}
      <a
        href={`tel:${office.phone.replace(/\s/g, "")}`}
        className="mt-3 flex items-center gap-3 text-[15px] leading-6 text-[#626B7A] transition hover:text-[#FF4050]"
      >
        <span className="shrink-0 text-[#FF4058]">
          <PhoneIcon />
        </span>
        <span>{office.phone}</span>
      </a>

      {/* Button */}
      <a
        href="#contact"
        className="mt-4 inline-flex min-h-[60px] w-full items-center justify-center rounded-[10px] bg-[#EF4939] px-3 py-3 text-center text-base font-medium leading-6 text-white transition duration-300 hover:bg-[#D9362B] focus:outline-none focus:ring-2 focus:ring-[#EF4939] focus:ring-offset-2 sm:text-lg"
      >
        {buttonText}
      </a>
    </article>
  );
}

export default function OfficeLocations() {
  const [activeCountry, setActiveCountry] = useState("india");

  const selectedOffices = offices[activeCountry];

  /*
   * India: 2 columns
   * Australia: 3 columns
   * Bangladesh: 3 columns, last card centered
   * Sri Lanka: 1 centered card with the same width as other cards
   */

  const gridClass =
    activeCountry === "india"
      ? "grid-cols-1 sm:grid-cols-2 max-w-[800px]"
      : activeCountry === "sri-lanka"
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-[1200px]"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-[1440px]";

  return (
    <section
      id="office-locations"
      className="w-full bg-[#F0F4F7] py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">

        {/* Appointment Instructions */}
        <div className="bg-white px-4 py-8 sm:py-10">
          <h2 className="text-center text-2xl font-bold leading-tight text-black sm:text-[26px]">
            Schedule an Appointment
            <br />
            with your nearest PFEC Office
          </h2>

          <p className="mx-auto mt-6 max-w-5xl text-center text-base leading-7 text-[#7B8491] sm:text-xl">
            Whether you want to meet us virtually or in-person, we got you
            covered. Here’s what you need to do:
          </p>

          <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-7 md:grid-cols-3 md:gap-8">
            {[
              <>
                <strong>Step 1:</strong> Select your Nearest PFEC Office
              </>,
              <>
                <strong>Step 2:</strong> Choose the preferred mode, date and
                time slot
              </>,
              <>
                <strong>Step 3:</strong> Fill the requested details. Your
                Appointment is scheduled. See you there!
              </>,
            ].map((step, index) => (
              <div key={index} className="flex items-center gap-5">
                <span
                  className="h-9 w-4 shrink-0 -skew-x-[20deg] bg-[#17109A]"
                  aria-hidden="true"
                />
                <p className="text-base leading-7 text-black sm:text-lg">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Country Offices */}
        <div className="pt-10 sm:pt-12">
          <h2 className="text-center text-2xl font-bold text-black sm:text-[25px]">
            Our Services can be Availed in 4 Countries
          </h2>

          <p className="mt-2 text-center text-base leading-7 text-[#7B8491] sm:text-xl">
            Pick a country and get the details to connect with our team
            located near you:
          </p>

          {/* Country Tabs */}
          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-12"
            role="tablist"
            aria-label="Select country"
          >
            {countries.map((country) => {
              const isActive = activeCountry === country.id;

              return (
                <button
                  key={country.id}
                  id={`tab-${country.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="office-panel"
                  onClick={() => setActiveCountry(country.id)}
                  className={`inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl px-5 py-3 text-base shadow-sm transition duration-200 sm:px-6 sm:text-lg ${
                    isActive
                      ? "bg-[#10004F] text-white ring-1 ring-[#10004F]"
                      : "bg-white text-[#161616] hover:bg-[#E7E5F4]"
                  }`}
                >
                  <span className="text-sm font-medium">
                    {country.code}
                  </span>
                  {country.name}
                </button>
              );
            })}
          </div>

          {/* Office Cards Grid */}
          <div
            id="office-panel"
            role="tabpanel"
            aria-labelledby={`tab-${activeCountry}`}
            className={`mx-auto mt-8 grid items-stretch gap-6 ${gridClass}`}
          >
            {selectedOffices.map((office, index) => {
              const isLastBangladeshCard =
                activeCountry === "bangladesh" &&
                index === selectedOffices.length - 1;

              const isSriLanka = activeCountry === "sri-lanka";

              return (
                <div
                  key={office.city}
                  className={
                    isLastBangladeshCard
                      ? "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-12px)] lg:col-span-3 lg:w-[calc(33.333%-16px)]"
                      : isSriLanka
                        ? "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-12px)] lg:col-span-1 lg:col-start-2 lg:w-full"
                        : ""
                  }
                >
                  <OfficeCard
                    office={office}
                    countryId={activeCountry}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
