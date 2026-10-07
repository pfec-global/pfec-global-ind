import Image from "next/image";

// The heading, step text and illustrations are all part of the two images
const alt =
  "Study Abroad in just 6 Simple Steps. Step 1: Get your profile assessed and receive recommendations from expert counsellors. " +
  "Step 2: Shortlist your preferred institutions and courses based on your aspirations. " +
  "Step 3: Complete the application process and secure scholarships with our comprehensive assistance. " +
  "Step 4: Receive the offer letter from the institution and complete the necessary steps to finalize your seat. " +
  "Step 5: Apply and prepare for visa interviews. Our team will guide you at every single step of the way. " +
  "Step 6: Prepare for take-off! Get ready to board the flight and begin your first day at the institution abroad!";

export default function Steps() {
  return (
    <section className="bg-[#f9f9f9]">
      {/* Mobile: steps in a zig-zag column */}
      <Image
        src="/images/6_step_study_abroad_mobile.webp"
        alt={alt}
        width={860}
        height={1612}
        sizes="100vw"
        className="mx-auto h-auto w-full max-w-xl md:hidden"
      />

      {/* Tablet and desktop: steps in one row */}
      <Image
        src="/images/6_step_study_abroad.webp"
        alt={alt}
        width={3840}
        height={1030}
        sizes="(min-width: 1536px) 1536px, 100vw"
        className="mx-auto hidden h-auto w-full max-w-screen-2xl md:block"
      />
    </section>
  );
}
