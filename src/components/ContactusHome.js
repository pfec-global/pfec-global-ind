
"use client";

import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";
import AdmissionForm from "@/components/AdmissionForm";

export default function ContactUs() {
  return (
    <section
      id="contact-us"
      className="w-full overflow-hidden bg-[#E4F7FA] py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-10">

        {/* Left Content */}
        <motion.div {...fadeUp()} className="w-full">
          <span className="inline-flex rounded-md bg-[#FFF0ED] px-3 py-2 text-sm font-semibold text-[#F04438]">
            Contact us
          </span>

          <h1 className="mt-6 max-w-[600px] font-serif text-3xl font-bold leading-tight text-[#192B82] sm:text-4xl lg:text-[34px]">
            Reach out to us and get started on your Study Abroad Dreams
          </h1>

          <p className="mt-6 max-w-[650px] text-base leading-7 text-[#101828] sm:text-xl sm:leading-9">
            Our team of experts are waiting to assist you further. You can
            get in touch by:
          </p>

          {/* Illustration */}
          <div className="relative mx-auto mt-8 w-full max-w-[660px] sm:mt-10 lg:mt-8">


            {/* Graduate Image */}
            <div className="relative z-10 flex h-[260px] items-end justify-center sm:h-[330px] lg:h-[320px]">
              <img
                src="/images/contact-graduate.webp
                "
                alt="Graduate holding a diploma"
                className="h-full w-full object-contain object-bottom"
              />
            </div>
          </div>
        </motion.div>

        {/* Right Registration Form */}
        <motion.div
          {...fadeUp(0.15)}
          className="w-full"
        >
          

            <AdmissionForm />
       
        </motion.div>

      </div>
    </section>
  );
}
