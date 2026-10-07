"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "About Us", href: "#", hasDropdown: false },
  { label: "Destinations", href: "/destinations", hasDropdown: false },
  { label: "Our Services", href: "/services", hasDropdown: false },
  { label: "Resources", href: "#", hasDropdown: true },
  { label: "Scholarships", href: "#", hasDropdown: true },
  // Scrolls to the Contact section, which is on every page
  { label: "Contact Us", href: "#contact", hasDropdown: false },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  // The home page starts with the dark navbar over its dark hero and turns white on scroll.
  // Every other page has a light hero, so the navbar is white from the start.
  // pathname is also used to highlight the nav item of the page being viewed
  const pathname = usePathname();
  const light = scrolled || pathname !== "/";

  // Track scroll: progress bar (0 to 1) and whether to switch to the white navbar
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setScrolled(window.scrollY > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* The header fades its background and shadow; the links and menu button fade their own text colour.
          (Fading the colour on both the header and its children makes the text change in jerky steps.) */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-md transition-[background-color,box-shadow] duration-500 ease-in-out ${
          light ? "bg-white/80 text-ink shadow-lg" : "bg-navy text-white shadow-none"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
          {/* Both logos are stacked and cross-fade: white on the dark navbar, coloured on the white one */}
          <Link href="/" className="relative shrink-0">
            <Image
              src="/images/pfec_ind_logo.webp"
              alt="PFEC Global - Study Abroad | Visa"
              width={304}
              height={106}
              priority
              className={`h-9 w-auto transition-opacity duration-500 lg:h-10 ${light ? "opacity-0" : "opacity-100"}`}
            />
            <Image
              src="/images/pfec_ ind_footer_logo.webp"
              alt=""
              width={500}
              height={201}
              className={`absolute left-0 top-0 h-full w-auto max-w-none transition-opacity duration-500 ${
                light ? "opacity-100" : "opacity-0"
              }`}
            />
          </Link>

          {/* Desktop links */}
          <nav className="hidden flex-1 items-center justify-end gap-6 xl:flex 2xl:gap-8">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`flex items-center gap-1.5 whitespace-nowrap text-sm transition-colors duration-500 hover:text-accent ${
                  pathname === link.href ? "font-semibold text-accent" : ""
                }`}
              >
                {link.label}
                {link.hasDropdown && (
                  <svg
                    className="h-4 w-4 text-accent"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 9l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 lg:gap-6">
            <Link
              href="#"
              className="hidden rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 sm:block"
            >
              Book a Free Consultation
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="transition-colors duration-500 xl:hidden"
            >
              <svg
                className="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="border-t border-current/10 px-4 pb-6 pt-2 sm:px-6 lg:px-8 xl:hidden">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`flex items-center justify-between border-b border-current/10 py-3 text-sm transition-colors duration-500 ${
                  pathname === link.href ? "font-semibold text-accent" : ""
                }`}
              >
                {link.label}
                {link.hasDropdown && (
                  <svg
                    className="h-4 w-4 text-accent"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 9l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </Link>
            ))}
            <Link
              href="#"
              className="mt-4 block rounded-lg bg-accent px-4 py-3 text-center text-sm font-semibold text-white sm:hidden"
            >
              Book a Free Consultation
            </Link>
          </nav>
        )}

        {/* Scroll progress bar */}
        <div
          className="absolute inset-x-0 top-full h-1 origin-left bg-accent"
          style={{ transform: `scaleX(${progress})` }}
        />
      </header>

      {/* Floating back-to-top button - fades in once the page is scrolled.
          Plain anchor so the browser scrolls smoothly to the top. */}
      <a
        href="#"
        aria-label="Back to top"
        className={`fixed bottom-6 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/30 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/40 sm:right-6 lg:right-8 ${
          scrolled ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 15l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </>
  );
}
