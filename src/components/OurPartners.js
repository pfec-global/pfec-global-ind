
"use client";

const partners = [
  {
    name: "nib",
    image: "/images/partners/nib.png",
    className: "w-[90px] sm:w-[105px]",
  },
  {
    name: "Medibank",
    image: "/images/partners/medibank.png",
    className: "w-[100px] sm:w-[120px]",
  },
  {
    name: "ahm",
    image: "/images/partners/iman.png",
    className: "w-[85px] sm:w-[100px]",
  },
  {
    name: "Bupa",
    image: "/images/partners/bupa.png",
    className: "w-[85px] sm:w-[100px]",
  },
  {
    name: "ahm by Medibank",
    image: "/images/partners/ahm.png",
    className: "w-[75px] sm:w-[90px]",
  },
  {
    name: "CBHS Health",
    image: "/images/partners/cbhs.png",
    className: "w-[100px] sm:w-[125px]",
  },
  {
    name: "Allianz",
    image: "/images/partners/allianz.png",
    className: "w-[95px] sm:w-[115px]",
  },
];

export default function Partners() {
  return (
    <section className="w-full overflow-hidden bg-[#eef3f7] py-8 sm:py-10">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-7 px-5 sm:px-8 md:flex-row md:gap-10 lg:gap-12">

        {/* HEADING */}
        <div className="shrink-0 text-center md:w-[155px] md:text-left">
          <h2 className="font-montserrat text-2xl font-extrabold leading-tight text-[#111111] sm:text-3xl">
            Our
            <br />
            Partners
          </h2>
        </div>

        {/* PARTNER LOGOS */}
        <div className="flex w-full flex-wrap items-center justify-center gap-x-7 gap-y-6 md:flex-1 md:flex-nowrap md:justify-between md:gap-x-6 lg:gap-x-10">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex shrink-0 items-center justify-center transition-transform duration-300 hover:scale-105"
            >
              <img
                src={partner.image}
                alt={partner.name}
                loading="lazy"
                className={`${partner.className} h-auto max-h-[65px] object-contain`}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
