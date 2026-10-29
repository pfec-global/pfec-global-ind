import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { fadeUpOnLoad } from "@/lib/motion";

export const metadata = {
  title: "Page Not Found | PFEC Global",
  description: "The page you are looking for does not exist.",
};

// The 404 page. Next.js shows it for every address that does not match a page,
// and whenever a page calls notFound() (an unknown blog post, country, scholarship, category...).
// Desktop: text on the left, illustration on the right. Mobile: illustration first, then the text.
export default function NotFound() {
  return (
    <section className="bg-[#f9f9f9] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2 lg:gap-12">
        <div className="text-center md:text-left">
          <motion.h1 {...fadeUpOnLoad()} className="text-3xl font-bold leading-tight sm:text-4xl">
            Oops...
            <br />
            The Page Doesn&apos;t Exist
          </motion.h1>
          <motion.p {...fadeUpOnLoad(0.15)} className="mt-4 text-sm text-ink/80 sm:text-base">
            But don&apos;t worry, we can get you back on track.
          </motion.p>
          <motion.div {...fadeUpOnLoad(0.3)} className="mt-6">
            <Link
              href="/"
              className="inline-block rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Go to Homepage
            </Link>
          </motion.div>
        </div>

        <motion.div {...fadeUpOnLoad(0.2)} className="order-first md:order-last">
          <Image
            src="/images/404.png"
            alt="404 error - page not found"
            width={962}
            height={952}
            priority
            sizes="(min-width: 768px) 440px, 80vw"
            className="mx-auto h-auto w-full max-w-xs md:max-w-md"
          />
        </motion.div>
      </div>
    </section>
  );
}
