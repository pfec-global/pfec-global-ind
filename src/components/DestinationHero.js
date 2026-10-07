import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeUpOnLoad } from "@/lib/motion";

export default function DestinationHero() {
  return (
    <section className="relative overflow-hidden bg-[#f9f9f9] px-4 pb-6 pt-12 text-center sm:px-6 lg:pt-20">
      {/* Decorative ribbon and graduation hat on the left (large screens only) */}
      <motion.div {...fadeUpOnLoad(0.3)} className="absolute left-0 top-[4vw] hidden w-[22%] lg:block 2xl:w-[27%]">
        <Image src="/images/rebon_1.webp" alt="" width={1217} height={282} className="h-auto w-full" />
        <Image
          src="/images/graduation_hat.webp"
          alt=""
          width={168}
          height={168}
          className="absolute left-[32%] top-[55%] h-auto w-[14%]"
        />
      </motion.div>

      {/* Decorative ribbon and paper plane on the right (large screens only) */}
      <motion.div {...fadeUpOnLoad(0.3)} className="absolute right-0 top-[3.5vw] hidden w-[22%] lg:block 2xl:w-[27%]">
        <Image src="/images/rebon_2.webp" alt="" width={1211} height={272} className="h-auto w-full" />
        <Image
          src="/images/paper_plane.webp"
          alt=""
          width={168}
          height={168}
          className="absolute -top-[12%] left-[21%] h-auto w-[14%]"
        />
      </motion.div>

      <motion.h1 {...fadeUpOnLoad()} className="relative font-serif text-3xl leading-tight sm:text-4xl xl:text-5xl">
        <span className="text-indigo">Wherever you wish to Study,</span>
        <br />
        We Will Take you There!
      </motion.h1>
      <motion.p
        {...fadeUpOnLoad(0.15)}
        className="relative mx-auto mt-4 max-w-md text-sm text-ink/70 sm:text-base lg:text-lg"
      >
        Explore Various factors that you need to consider before you choose a study destination
      </motion.p>
    </section>
  );
}
