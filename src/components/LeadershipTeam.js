import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";
import { FaLinkedin } from "react-icons/fa";

// The built-in leaders, shown until Strapi sends its own (see src/lib/leadershipPage.js).
// The pictures (built-in and from Strapi) already carry the name and title, so those are only printed without a picture.
const defaultLeaders = [
  {
    name: "Mohammad Shaiful Islam",
    designation: "Director and Managing Director",
    image: { src: "/images/leadership/mohammad-shaiful-islam.webp" },
    points: [
      "Driven by a strong belief in the power of education and its ability to change lives.",
      "Guided by certified expertise (QEAC D468) and a deep commitment to student success.",
      "Focused on creating life-changing opportunities, high-paying careers, and brighter futures abroad.",
    ],
  },
  {
    name: "Md. Shahidul Islam",
    designation: "Chief Executive Officer",
    image: { src: "/images/leadership/md-shahidul-islam.png" },
    points: [
      "Founded on the belief that education and opportunity should have no limits.",
      "Backed by strong industry ties and memberships in leading associations like IEAA, MIA, ISANA, ICEF, and Migration Alliance.",
      "Brings certified expertise as a QEAC (H018) and Registered Migration Agent (MARN 1795751).",
    ],
  },
  {
    name: "Mosharraf Khan Yaafi",
    designation: "Chief Growth Officer",
    image: { src: "/images/leadership/mosharraf-khan-yaafi.webp" },
    points: [
      "25+ years of corporate leadership across industries like FMCG, Telecom, international test management, and overseas education.",
      "Proven expertise in operations, business development, growth strategy, and commercial management.",
      "Has led successful projects across the UK, Australia, India, Sri Lanka, and Bangladesh.",
    ],
  },
  {
    name: "Fareha Begum",
    designation: "Country Manager, Bangladesh",
    image: { src: "/images/leadership/fareha-begum.webp" },
    points: [
      "A seasoned education professional with a strong foundation of knowledge and insight.",
      "Contributing to the industry with proven expertise since 1999.",
      "A key force behind the success and operations of PFEC Global Bangladesh.",
    ],
  },
];

// leaders ({ id, name, designation, image, points, linkedinUrl }) come from Strapi; without them the built-in ones are shown
export default function LeadershipTeam({ leaders = defaultLeaders }) {
  return (
    <section className="bg-[#e5f7fb] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          {...fadeUp()}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-block rounded-sm bg-[#fff1ef] px-2 py-1 text-[11px] font-medium text-[#f15a4a]">
            Our Leadership Team
          </span>

          <h2 className="mt-4 text-2xl font-bold leading-tight text-[#17318f] sm:text-3xl lg:text-[32px]">
            Rich with Experience. Fueled by Passion.
            <br />
            Driven by the Dreams of Study Abroad
            <br className="hidden sm:block" />
            Aspirants.
          </h2>

          <p className="mt-4 text-sm text-black/80 sm:text-base">
            Meet the team that spearheads PFEC Global.
          </p>
        </motion.div>

        {/* Leadership Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:gap-7">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.id ?? leader.name}
              {...fadeUp(index * 0.08)}
              className="group overflow-hidden rounded-xl bg-white shadow-[0_4px_15px_rgba(0,0,0,0.10)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_14px_35px_rgba(0,0,0,0.16)]"
            >
              {/* Image */}
              {leader.image && (
                <div className="relative aspect-[16/8] w-full overflow-hidden bg-white">
                  <Image
                    src={leader.image.src}
                    alt={leader.image.alt || leader.name || ""}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              )}

              {/* Name and title - only when there is no picture to show them */}
              {!leader.image && (
                <div className="px-6 pt-6 sm:px-7">
                  {leader.name && <h3 className="text-lg font-bold text-[#17318f]">{leader.name}</h3>}
                  {leader.designation && <p className="mt-1 text-sm font-medium text-[#f15a4a]">{leader.designation}</p>}
                </div>
              )}

              {/* Content */}
              <div className="px-6 py-6 sm:px-7 sm:py-7">
                <ul className="space-y-4 text-sm leading-6 text-black/80">
                  {leader.points?.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-black/70" />

                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                {leader.linkedinUrl && (
                  <a
                    href={leader.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${leader.name} on LinkedIn`}
                    className="mt-5 inline-flex text-[#0a66c2] transition-opacity hover:opacity-80"
                  >
                    <FaLinkedin className="h-6 w-6" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}