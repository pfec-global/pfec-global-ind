"use client";

import Image from "next/image";
import useLoopSlider from "./useLoopSlider";

const AUTOPLAY_MS = 4500;

// photoClass crops each cut-out photo so the faces sit well in the yellow box.
const testimonials = [
  {
    photo: "testimonial_1.png",
    photoClass: "object-center",
    quote:
      "My name is Abdul Deriya, and I recently received my Dubai student visa. I would like to give special thanks to PFEC Global for supporting me throughout the entire process, from counselling to visa approval. I visited many local consultancies, but I did not receive the proper guidance I was looking for. am very satisfied with the support and professionalism of the PFEC counsellor team.",
    name: "Abdul Deriya",
    course: "Manipal Academy of Higher Education - Dubai Campus",
  },
  {
    photo: "testimonial_3.png",
    photoClass: "object-top origin-top scale-[1.35]",
    quote:
      "I had a great experience with Azman Salid from PFEC Global during my Australian student visa process. They carefully guided me through every step, ensured all documents were accurate, and handled the process with great attention to detail. Their patience, dedication, and consistent support made everything much easier and stress-free. I highly recommend PFEC Global.",
    name: "Giash Uddin",
    course: "RMIT University - Bachelor of Engineering (Mechanical)",
  },
  {
    photo: "testimonial_2.png",
    photoClass: "object-[30%_center]",
    quote: "Lorem ipsum is standard dummy or placeholder text used in graphic design, publishing, and web development to preview layouts without real content distracting the reader.",
    name: "Lorem ipsum",
    course: "Adelade University - Bachelor of Engineering (Computer Science)",
  },
];

export default function Testimonials() {
  const count = testimonials.length;
  // The list is rendered twice so the track can loop without a visible jump.
  const { animate, trackStyle, dragProps, handleTransitionEnd, setPaused } =
    useLoopSlider(count, AUTOPLAY_MS);

  return (
    <section id="testimonials" className="overflow-hidden bg-[#f8f8f8]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 xl:pb-[calc(3.5*var(--bu))] xl:pt-[calc(3.5*var(--bu))]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase text-accent xl:text-[length:calc(0.75*var(--bu))]">
              Student Stories
            </p>
            <h2 className="mt-1 text-3xl font-bold text-[#1d297c] xl:text-[length:calc(2.05*var(--bu))]">
              Honest advice. Real outcomes.
            </h2>
          </div>
          <p className="text-sm text-neutral-800 xl:pb-1 xl:text-[length:calc(1*var(--bu))]">
            Personal guidance based on your goals, virtual or in person.
          </p>
        </div>

        {/* Clips cards at the left edge of the content; on the right they run off the screen. */}
        <div className="mt-8 [clip-path:inset(-2rem_-100vw_-2rem_0)] xl:mt-[calc(2.6*var(--bu))]">
          <ul
            onTransitionEnd={handleTransitionEnd}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            {...dragProps}
            style={trackStyle}
            className={`flex cursor-grab touch-pan-y select-none gap-4 active:cursor-grabbing [--step:calc(20*var(--bu))] sm:[--step:calc(25*var(--bu))] md:[--step:calc(43*var(--bu))] xl:gap-[calc(2.5*var(--bu))] xl:[--step:calc(48.5*var(--bu))] ${
              animate ? "transition-transform duration-700 ease-out" : ""
            }`}
          >
            {[...testimonials, ...testimonials].map(
              ({ photo, photoClass, quote, name, course }, i) => (
                <li
                  key={i}
                  aria-hidden={i >= count}
                  className="flex w-[calc(19*var(--bu))] shrink-0 flex-col gap-5 rounded-xl bg-[#212a80] p-4 text-white sm:w-[calc(24*var(--bu))] md:w-[calc(42*var(--bu))] md:flex-row md:items-center xl:w-[calc(46*var(--bu))] xl:gap-[calc(1.4*var(--bu))] xl:rounded-[calc(0.9*var(--bu))] xl:p-[calc(1.5*var(--bu))]"
                >
                  <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-lg bg-[#fdd63a] md:aspect-auto md:h-[calc(17*var(--bu))] md:w-[calc(15*var(--bu))] xl:h-[calc(19.2*var(--bu))] xl:w-[calc(17.7*var(--bu))] xl:rounded-[calc(0.75*var(--bu))]">
                    <Image
                      src={`/images/branch/testimonial/${photo}`}
                      alt={name}
                      fill
                      sizes="(min-width: 768px) 18rem, 24rem"
                      draggable={false}
                      className={`object-cover ${photoClass}`}
                    />
                  </div>

                  <div className="pb-1 md:pr-3 xl:pr-[calc(0.5*var(--bu))]">
                    <p className="text-sm leading-relaxed text-white/90 xl:text-[length:calc(1*var(--bu))] xl:leading-[calc(1.43*var(--bu))]">
                      {quote}
                    </p>
                    <p className="mt-4 text-sm font-bold uppercase xl:mt-[calc(1.4*var(--bu))] xl:text-[length:calc(0.98*var(--bu))]">
                      {name}
                    </p>
                    <p className="mt-1.5 text-xs text-white/70 xl:mt-[calc(0.5*var(--bu))] xl:text-[length:calc(0.85*var(--bu))]">
                      {course}
                    </p>
                  </div>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
