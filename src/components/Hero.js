import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="overflow-hidden bg-linear-to-b from-navy to-indigo text-white">
      <div className="mx-auto max-w-7xl px-4 pt-10 text-center sm:px-6 lg:px-8 lg:pt-12">
        {/* Figma: Yeseva One Regular 52, line height auto, white fill, 1px black stroke on the outside.
            CSS strokes are centred on the letter edge, so a 2px stroke painted behind the fill leaves 1px outside. */}
        <h1 className="font-serif text-3xl font-normal leading-[normal] [-webkit-text-stroke:2px_#000] [paint-order:stroke_fill] sm:text-4xl lg:text-[52px]">
          Your Study Abroad Dream
          <br />
          is our only Priority!
        </h1>
        <p className="mt-4 text-base text-white/85 sm:text-lg lg:text-xl">
          From education to visas, we&apos;ve got your back.
        </p>
        <Link
          href="#"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold hover:opacity-90"
        >
          Book a FREE Consultation
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 12h16m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* Mobile banner */}
      <Image
        src="/images/hero_mobile_banner.webp"
        alt="Graduate student surrounded by study destination flags"
        width={811}
        height={461}
        priority
        sizes="100vw"
        className="mx-auto mt-8 h-auto w-full max-w-xl md:hidden"
      />

      {/* Desktop banner - a little wider than the screen on tablets so the student stays a readable size */}
      <div className="relative mx-auto mt-8 hidden max-w-7xl justify-center md:flex lg:mt-4">
        {/* Slanted stripes behind the student */}
        <div className="absolute bottom-0 top-[40%] flex -skew-x-[20deg] gap-[1.5vw]">
          <div className="w-[8vw] bg-white/10" />
          <div className="w-[8vw] bg-white/10" />
          <div className="w-[8vw] bg-white/10" />
        </div>
        <Image
          src="/images/hero_banner.webp"
          alt="Graduate student with landmarks of study destinations around the world"
          width={3338}
          height={978}
          priority
          sizes="(min-width: 1024px) 1280px, 150vw"
          className="relative w-[150%] max-w-none shrink-0 lg:w-full"
        />
      </div>
    </section>
  );
}
