import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";

const partnerTypes = [
  "Renowned universities",
  "TAFEs",
  "Colleges and tertiary schools all across the world",
];

export default function WhoAreWe() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.5fr_0.8fr] lg:gap-16 lg:px-8">
        
        {/* Left Content */}
        <motion.div {...fadeUp()}>
          <h2 className="text-2xl font-bold text-black sm:text-3xl">
            Who are we?
          </h2>

          <div className="mt-6 max-w-3xl space-y-6 text-sm leading-7 text-[#707070] sm:text-base">
            <p>
              Our journey started with a single office in 2006 in Melbourne,
              Australia and since then we have expanded to different geographies
              Sydney, Adelaide and Perth in Australia, Dhaka and Chattogram
              offices in Bangladesh and Ahmedabad & Kolkata offices in India and
              Colombo office in Sri Lanka. Our multifield growth across the
              segments is a testimony to our commitment to professionalism,
              persistent hard work, as well as efficient and effective teamwork.
            </p>

            <div>
              <p>
                At present, PFEC Global represents over 550 educational
                institutions globally. Our partners include:
              </p>

              <ul className="mt-5 list-disc space-y-1 pl-6">
                {partnerTypes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <p>
              Since 2006, PFEC Global has helped realize the dreams of 22000+
              students from different nationalities with the help of our
              partners. Our defined processes, vast experience, committed
              workforce, uncompromising work ethics helps us deliver the best
              possible service and pleasant experience in educational and career
              undertakings globally for all of our clients.
            </p>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          {...fadeUp(0.12)}
          className="flex justify-center lg:justify-end"
        >
          <Image
            src="/images/Who-are-we.webp"
            alt="ICEF Accredited Agency Status"
            width={430}
            height={520}
            className="h-auto w-full max-w-[320px] object-contain sm:max-w-[360px] lg:max-w-[390px]"
          />
        </motion.div>

      </div>
    </section>
  );
}