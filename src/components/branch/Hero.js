import Image from "next/image";
import CountUp from "./CountUp";
import ConsultationForm from "./ConsultationForm";

const stats = [
  { end: 22000, label: "Students Assisted" },
  { end: 550, label: "Institutions across 11 Countries" },
  { end: 20, label: "Years of Experience" },
];

// The three slanted bars behind the hat, left to right.
const bars = [
  { src: "/images/branch/homepage-hero/pfec_bar_1.png", left: "0%" },
  { src: "/images/branch/homepage-hero/pfec_bar_2.png", left: "29%" },
  { src: "/images/branch/homepage-hero/pfec_bar_3.png", left: "58%" },
];

// Slanted PFEC bars with the floating hat. Shown above the counters on phones and tablets,
// and below the buttons on desktop.
function HatIllustration({ className }) {
  return (
    <div className={`relative aspect-[400/195] w-full ${className}`}>
      {bars.map(({ src, left }) => (
        <Image
          key={src}
          src={src}
          alt=""
          width={398}
          height={463}
          className="absolute top-0 h-full w-[42%] opacity-20"
          style={{ left }}
        />
      ))}
      <Image
        src="/images/branch/hero_hat.png"
        alt=""
        width={1920}
        height={1080}
        priority
        className="absolute left-[11.5%] top-[2%] w-[77%] animate-bob"
      />
    </div>
  );
}

// The top of a branch page: its title, numbers, buttons and the consultation form.
// branch is one entry of src/data/branches.js.
export default function Hero({ branch }) {
  return (
    <section className="overflow-hidden bg-linear-to-b from-[#011642] to-[#0338A8] text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1fr_calc(26*var(--bu))] lg:gap-12 lg:px-8 xl:grid-cols-[1fr_calc(36.6*var(--bu))] xl:gap-16 xl:py-[calc(2.75*var(--bu))]">
        <div className="xl:pl-4">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl xl:text-[length:calc(3*var(--bu))]">
            PFEC Global - {branch.city}
            <span className="mt-1 block max-w-[calc(30*var(--bu))] text-2xl font-normal leading-tight sm:text-3xl xl:max-w-[calc(40*var(--bu))] xl:text-[length:calc(2.55*var(--bu))] xl:leading-[1.2]">
              Best Study Abroad Consultant in {branch.city}
            </span>
          </h1>

          <hr className="mt-5 w-40 border-white/70 xl:mt-[calc(1.6*var(--bu))] xl:w-[calc(18.6*var(--bu))]" />

          <p className="mt-5 max-w-[calc(34*var(--bu))] text-base sm:text-lg xl:mt-[calc(1.6*var(--bu))] xl:max-w-[calc(45*var(--bu))] xl:text-[length:calc(1.5*var(--bu))] xl:leading-snug">
            Free expert guidance from your first counselling session to your
            visa – and support after you land.
          </p>

          <HatIllustration className="mx-auto mt-6 max-w-[calc(22*var(--bu))] lg:hidden" />

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap xl:mt-[calc(1.7*var(--bu))] xl:gap-[calc(1.6*var(--bu))]">
            {/* Counters */}
            <div className="grid grid-cols-3 gap-3 rounded-md bg-[#020b22]/85 px-4 py-3 ring-1 ring-white/10 sm:gap-6 xl:w-[calc(35*var(--bu))] xl:px-[calc(1*var(--bu))] xl:py-[calc(1*var(--bu))]">
              {stats.map(({ end, label }) => (
                <div key={label}>
                  <p className="text-lg font-bold text-accent sm:text-xl xl:text-[length:calc(1.5*var(--bu))]">
                    <CountUp end={end} suffix="+" />
                  </p>
                  <p className="mt-0.5 text-xs leading-tight text-white/90 sm:text-sm xl:max-w-[calc(10*var(--bu))] xl:text-[length:calc(1.05*var(--bu))]">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Google rating */}
            <div className="flex items-center gap-4 self-start rounded-md bg-[#020b22]/85 px-4 py-3 ring-1 ring-white/10 sm:self-auto xl:gap-[calc(1.4*var(--bu))] xl:px-[calc(1.1*var(--bu))]">
              <Image
                src="/images/branch/google_img.png"
                alt="Google Reviews"
                width={960}
                height={480}
                className="h-auto w-24 xl:w-[calc(8.6*var(--bu))]"
              />
              <div className="h-10 w-px bg-white/70 xl:h-[calc(3.7*var(--bu))]" />
              <div>
                <p className="flex items-center gap-1 text-xl font-bold text-accent xl:text-[length:calc(1.6*var(--bu))]">
                  <CountUp end={4.7} decimals={1} />
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#fbbc04] xl:h-[calc(1.6*var(--bu))] xl:w-[calc(1.6*var(--bu))]" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5-4.9-4.5 6.6-.8z" />
                  </svg>
                </p>
                <p className="text-xs text-white/90 sm:text-sm xl:text-[length:calc(1.05*var(--bu))]">
                  <CountUp end={178} /> Reviews
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 xl:mt-[calc(1.6*var(--bu))] xl:gap-[calc(1*var(--bu))]">
            <a
              href="#consultation"
              className="rounded-lg bg-accent px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 xl:px-[calc(1*var(--bu))] xl:py-[calc(0.9*var(--bu))] xl:text-[length:calc(1.05*var(--bu))]"
            >
              Book a Free Consultation
            </a>
            <a
              href={branch.whatsappUrl}
              className="flex items-center gap-2 rounded-lg border-2 border-[#25d366] bg-white px-4 py-2.5 text-sm font-bold text-neutral-900 transition-opacity hover:opacity-90 xl:px-[calc(0.9*var(--bu))] xl:py-[calc(0.75*var(--bu))] xl:text-[length:calc(1.05*var(--bu))]"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#25d366] xl:h-[calc(1.7*var(--bu))] xl:w-[calc(1.7*var(--bu))]">
                <svg viewBox="0 0 24 24" className="h-[70%] w-[70%] text-white" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.2-1.4A9.9 9.9 0 1 0 12.04 2zm5.8 14c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3.1s.8-2.2 1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.9 2.2c.1.1.1.3 0 .5l-.3.5-.4.5c-.2.1-.3.3-.1.6.2.3.8 1.2 1.6 2 1.1 1 2 1.3 2.3 1.4.3.2.5.1.6 0l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.3 0 .1 0 .7-.2 1.4z" />
                </svg>
              </span>
              Chat on WhatsApp
            </a>
          </div>

          <HatIllustration className="mt-[calc(2.6*var(--bu))] hidden max-w-[calc(26*var(--bu))] lg:block xl:max-w-[calc(41*var(--bu))]" />
        </div>

        <div id="consultation" className="scroll-mt-28">
          <ConsultationForm />
        </div>
      </div>
    </section>
  );
}
