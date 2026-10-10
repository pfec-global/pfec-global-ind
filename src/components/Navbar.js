"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { destinations, scholarships } from "@/data/countries";

// items (optional) is the dropdown of a link: it opens on hover on desktop and on tap in the mobile menu.
// section (optional) is the start of the URLs that belong to the link, used to highlight it on its inner pages.
const links = [
  { label: "About Us", href: "#" },
  { label: "Destinations", href: "/destinations", section: "/destinations", items: destinations },
  { label: "Our Services", href: "/services" },
  { label: "Blog", href: "/blogs" },
  { label: "Scholarships", href: "/scholarships", section: "/scholarships", items: scholarships },
  // Scrolls to the Contact section, which is on every page
  { label: "Contact Us", href: "#contact" },
];

const chevron = (className) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 9l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  // Label of the link whose dropdown is showing: hovered on desktop, tapped open in the mobile menu
  const [dropdown, setDropdown] = useState(null);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  // The home page starts with the dark navbar over its dark hero and turns white on scroll.
  // Every other page has a light hero, so the navbar is white from the start.
  // pathname is also used to highlight the nav item of the page being viewed
  const pathname = usePathname();
  const light = scrolled || pathname !== "/";
  const isActive = (link) => pathname === link.href || (link.section && pathname.startsWith(link.section));

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
          <nav className="hidden h-full flex-1 items-center justify-end gap-6 xl:flex 2xl:gap-8">
            {links.map((link) => (
              <div
                key={link.label}
                className="relative flex h-full items-center"
                onMouseEnter={() => setDropdown(link.items ? link.label : null)}
                onMouseLeave={() => setDropdown(null)}
                onFocus={() => setDropdown(link.items ? link.label : null)}
                onBlur={(event) => !event.currentTarget.contains(event.relatedTarget) && setDropdown(null)}
              >
                <Link
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  aria-haspopup={link.items ? "true" : undefined}
                  aria-expanded={link.items ? dropdown === link.label : undefined}
                  // A dropdown link without a page of its own only opens its dropdown
                  onClick={(event) => link.items && link.href === "#" && event.preventDefault()}
                  className={`flex items-center gap-1.5 whitespace-nowrap text-sm transition-colors duration-500 hover:text-accent ${
                    isActive(link) ? "font-semibold text-accent" : ""
                  }`}
                >
                  {link.label}
                  {link.items &&
                    chevron(
                      `h-4 w-4 text-accent transition-transform duration-300 ${dropdown === link.label ? "rotate-180" : ""}`,
                    )}
                </Link>

                {/* Dropdown: always in the page so it can fade, but only clickable while open.
                    The top padding keeps the mouse "inside" on its way from the link to the panel. */}
                {link.items && (
                  <div
                    className={`absolute left-1/2 top-full -translate-x-1/2 pt-1 transition duration-300 ${
                      dropdown === link.label ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"
                    }`}
                  >
                    <ul
                      className={`grid gap-x-2 rounded-xl bg-white p-3 text-ink shadow-xl ring-1 ring-ink/5 ${
                        link.items.length > 8 ? "w-[26rem] grid-cols-2" : "w-72"
                      }`}
                    >
                      {link.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setDropdown(null)}
                            aria-current={pathname === item.href ? "page" : undefined}
                            className={`block rounded-lg px-3 py-2 text-sm transition-colors duration-200 hover:bg-accent/10 hover:text-accent ${
                              pathname === item.href ? "font-semibold text-accent" : ""
                            }`}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
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
          <nav className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-current/10 px-4 pb-6 pt-2 sm:px-6 lg:px-8 xl:hidden">
            {links.map((link) => (
              <div key={link.label} className="border-b border-current/10">
                <div className="flex items-center justify-between">
                  <Link
                    href={link.href}
                    // A dropdown link without a page of its own opens its list instead of closing the menu
                    onClick={(event) => {
                      if (link.items && link.href === "#") {
                        event.preventDefault();
                        setDropdown(dropdown === link.label ? null : link.label);
                      } else setOpen(false);
                    }}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className={`flex-1 py-3 text-sm transition-colors duration-500 ${
                      isActive(link) ? "font-semibold text-accent" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                  {/* The arrow opens the list of pages under the link */}
                  {link.items && (
                    <button
                      type="button"
                      aria-label={`Show ${link.label} pages`}
                      aria-expanded={dropdown === link.label}
                      onClick={() => setDropdown(dropdown === link.label ? null : link.label)}
                      className="-mr-2 p-3"
                    >
                      {chevron(
                        `h-4 w-4 text-accent transition-transform duration-300 ${dropdown === link.label ? "rotate-180" : ""}`,
                      )}
                    </button>
                  )}
                </div>
                {link.items && dropdown === link.label && (
                  <ul className="pb-3 pl-4">
                    {link.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={pathname === item.href ? "page" : undefined}
                          className={`block py-2 text-sm ${
                            pathname === item.href ? "font-semibold text-accent" : "opacity-80"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
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
