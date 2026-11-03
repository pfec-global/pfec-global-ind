import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaYoutubeSquare, FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";
import { destinations, scholarships } from "@/data/countries";
import { officeCountries } from "@/data/offices";
import { serviceItems } from "@/data/services";

// Footer lists stay short: only the first few lines of each are shown
const firstFew = (items, count = 5) => items.slice(0, count);

const socials = [
  { label: "LinkedIn", Icon: FaLinkedin, color: "text-[#0a66c2]" },
  { label: "YouTube", Icon: FaYoutubeSquare, color: "text-[#e62117]" },
  { label: "Facebook", Icon: FaFacebookSquare, color: "text-[#1b3f8b]" },
  { label: "Instagram", Icon: FaInstagramSquare, color: "text-[#d6249f]" },
  { label: "X", Icon: FaSquareXTwitter, color: "text-black" },
];

const legalLinks = [
  { label: "Terms & Conditions", href: "/terms-of-use" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

// destinationItems and scholarshipItems come from Strapi (see FooterWithCms.js); without them the built-in lists are used.
// Both are lists of { label, href }.
// year also comes from FooterWithCms.js, because the shell of the page is built ahead of time and cannot read the date.
export default function Footer({
  destinationItems = destinations,
  scholarshipItems = scholarships,
  year = 2026,
}) {
  // The link lists, row by row: on large and laptop screens three sit side by side next to the logo,
  // so Our Services and Resources start on the same line however long the lists above them are
  const groups = [
    { title: "Study Abroad", links: firstFew(destinationItems) },
    { title: "Scholarships", links: firstFew(scholarshipItems) },
    {
      title: "PFEC Global",
      links: [
        { label: "Contact Us", href: "/contact-us" },
        { label: "About Us", href: "/aboutus" },
        // { label: "Careers", href: "#" },
      ],
    },
    { title: "Our Services", links: serviceItems },
    {
      title: "Resources",
      links: [
        { label: "Blogs", href: "/blogs" },
        // { label: "Downloadable Content", href: "#" },
        { label: "Upcoming Events", href: "/events" },
      ],
    },
  ];

  return (
    <footer className="bg-[#f8f9fb] text-ink">
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <motion.div {...fadeUp()} className="grid gap-x-10 gap-y-8 pb-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo and contact */}
          <div className="lg:row-span-2">
            <Image
              src="/images/pfec_ ind_footer_logo.webp"
              alt="PFEC Global - Study Abroad | Visa"
              width={500}
              height={201}
              className="h-14 w-auto"
            />

            <p className="mt-6 max-w-xs text-sm leading-6">
              Since 2006, PFEC Global has been guiding students toward a better life abroad through expert higher
              education consultancy and end-to-end support.
            </p>

            <p className="mt-6 font-semibold">Follow Us</p>
            <div className="mt-3 flex gap-3">
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className={`hover:opacity-80 ${social.color}`}
                >
                  <social.Icon className="h-7 w-7" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link lists */}
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="font-semibold text-accent">{group.title}</h3>
              <ul className="mt-3 space-y-3 text-sm">
                {group.links.map(({ label, href }, j) => (
                  <li key={j}>
                    <Link href={href} className="hover:text-accent">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Countries with a PFEC office - same list as the contact page, India first */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-black/10 py-5 text-sm font-medium">
          {officeCountries.map((country) => (
            <Link key={country.id} href="/contact-us" className="flex items-center gap-2 hover:text-accent">
              <Image
                src={country.flag}
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 rounded-full object-cover"
              />
              {country.name}
            </Link>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-4 border-t border-black/10 py-5 text-sm md:flex-row md:justify-between">
          <p>© {year} PFEC Global | All Rights Reserved</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {legalLinks.map(({ label, href }) => (
              <Link key={label} href={href} className="hover:text-accent">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
