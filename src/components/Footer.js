import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaYoutubeSquare, FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";
import { destinations, scholarships } from "@/data/countries";
import { courses } from "@/components/PopularCourses";

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

// destinationItems, scholarshipItems and courseItems come from Strapi (see FooterWithCms.js); without them the built-in lists are used.
// courseItems is a list of course names, the other two are lists of { label, href }.
// year also comes from FooterWithCms.js, because the shell of the page is built ahead of time and cannot read the date.
export default function Footer({
  destinationItems = destinations,
  scholarshipItems = scholarships,
  courseItems = courses,
  year = 2026,
}) {
  // Each inner array is one footer column
  const columns = [
    [
      { title: "Study Abroad", links: firstFew(destinationItems) },
      {
        title: "PFEC Global",
        links: [
          { label: "Contact Us", href: "/contact-us" },
          { label: "About Us", href: "/aboutus" },
          { label: "Careers", href: "#" },
        ],
      },
    ],
    [
      { title: "Scholarships", links: firstFew(scholarshipItems) },
      {
        title: "Resources",
        links: [
          { label: "Blogs", href: "/blogs" },
          { label: "Downloadable Content", href: "#" },
          { label: "Upcoming Events", href: "/events" },
        ],
      },
    ],
    [{ title: "Popular Courses", links: firstFew(courseItems).map((label) => ({ label, href: "#" })) }],
  ];

  return (
    <footer className="bg-[#f8f9fb] text-ink">
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <motion.div {...fadeUp()} className="grid gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo and contact */}
          <div>
            <Image
              src="/images/pfec_ ind_footer_logo.webp"
              alt="PFEC Global - Study Abroad | Visa"
              width={500}
              height={201}
              className="h-14 w-auto"
            />

            <ul className="mt-6 space-y-5 text-sm">
              <li className="flex items-center gap-3">
                <svg
                  className="h-6 w-6 shrink-0 text-accent"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" strokeLinejoin="round" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                <span>
                  Dummy Address
                  <br />
                  Dummy Address
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="h-6 w-6 shrink-0 text-accent"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Dummy phone Number</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="h-6 w-6 shrink-0 text-accent"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" strokeLinejoin="round" />
                </svg>
                <span>Dummy Email ID</span>
              </li>
            </ul>

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

          {/* Link columns */}
          {columns.map((groups, i) => (
            <div key={i} className="space-y-8">
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
            </div>
          ))}
        </motion.div>

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
