import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";

const awards = [
  {
    name: "Adelaide University",
    logo: "/images/awards/Frame 1000001718-15.png",
    awards: [
      "Partner of the Year Award - Diamond Category (2024)",
      "Partner of the Year Award - Diamond Category (2023)",
    ],
  },
  {
    name: "The University of Western Australia",
    logo: "/images/awards/Frame 1000001718-16.png",
    awards: ["Best Newcomer for 2024 - Gold"],
  },
  {
    name: "RMIT University",
    logo: "/images/awards/Frame 1000001718-14.png",
    awards: ["Gold Agent Status (2023)"],
  },
  {
    name: "Deakin University",
    logo: "/images/awards/Frame 1000001718-17.png",
    awards: ["Outstanding Partner Award (2020)"],
  },
  {
    name: "La Trobe University",
    logo: "/images/awards/Frame 1000001718-7.png",
    awards: [
      "Double Platinum Eagle Award (2023)",
      "Most Engaged Agency Award (2024)",
    ],
  },
  {
    name: "Swinburne University of Technology",
    logo: "/images/awards/Frame 1000001718-4.png    ",
    awards: [
      "Appreciation for Outstanding Partnership & Support for Sarawak Campus (2024)",
      "Partner of the Decade - Emerging Excellence (2020)",
    ],
  },

  {
    name: "Victoria University",
    logo: "/images/awards/Frame 1000001531-5.png",
    awards: [
      "Excellence Award for Conversion - AU (2022)",
      "Top Performing Agent (2024)",
      "Agent of the Year (2021)",
    ],
  },
  {
    name: "Australian Catholic University",
    logo: "/images/awards/Frame 1000002098.png",
    awards: ["2024 Silver Award"],
  },
  {
    name: "University of Wollongong",
    logo: "/images/awards/Frame 1000001532-1.png",
    awards: [
      "Certificate of Achievement for Global Recruitment Initiatives - 2023",
    ],
  },
  {
    name: "Western Sydney University",
    logo: "/images/awards/Frame 1000001718-8.png",
    awards: [
      "Rising Star Agent Award (2022)",
      "Outstanding Achievement Partner Award (2024)",
    ],
  },
  {
    name: "Edith Cowan University",
    logo: "/images/awards/Frame 1000001531-2.png",
    awards: [
      "Top Performing Agent Award (2023)",
      "Highest Achiever - Interstate Recruitment (2022)",
      "Top Performing Agent Award (Eastern States) (2021)",
    ],
  },
  {
    name: "James Cook University",
    logo: "/images/awards/Frame 1000001718-11.png",
    awards: ["Trusted Agent (2025)"],
  },
  {
    name: "Federation University",
    logo: "/images/awards/Frame 1000001718-5.png",
    awards: [
      "Platinum Level Status in the Recruitment of International Students (2023 & 2021)",
    ],
  },
  {
    name: "Southern Cross University",
    logo: "/images/awards/Frame 1000001531-4.png",
    awards: [
      "Agent of the Year Award - 2022",
      "VIP Agent Status (FY2024)",
    ],
  },
  {
    name: "CQUniversity Australia",
    logo: "/images/awards/Frame 1000001531-3.png",
    awards: [
      "Collaborative Excellence Award (2024)",
      "Outstanding Service Award (2023)",
      "Top Performing Agent (2021)",
      "Top Quality Agent (2018)",
    ],
  },
  {
    name: "University of Tasmania",
    logo: "/images/awards/Frame 1000001532-2.png",
    awards: [
      "In Recognition of Excellent Cooperation & Unwavering Support (2023)",
      "Rising Star Award (2024)",
    ],
  },
  {
    name: "Torrens University Australia",
    logo: "/images/awards/Frame 1000001718-13.png",
    awards: ["Excellence Award Subcontinent (2021)"],
  },
  {
    name: "Charles Darwin University",
    logo: "/images/awards/Frame 1000001532-3.png",
    awards: ["Top Performing Agent - Bangladesh (2020)"],
  },
  {
    name: "The University of Adelaide",
    logo: "/images/awards/Frame 1000001718-10.png",
    awards: ["Certificate of Appreciation (2023)"],
  },
  {
    name: "University of Technology Sydney",
    logo: "/images/awards/Frame 1000001718-3.png",
    awards: ["Outstanding Performance - South Asia (2023)"],
  },
  {
    name: "La Trobe College Australia",
    logo: "/images/awards/Frame 1000001718-7.png",
    awards: [
      "New Rising Star (2024)",
      "Golden Eagle Award (2022)",
    ],
  },
  {
    name: "Kaplan Business School Australia",
    logo: "/images/awards/Frame 1000001531-1.png",
    awards: [
      "Legacy Partner Agency (South Asia)",
      "Champion Performer - Kaplan Agent Portal",
      "Outstanding Agency Performance (South Asia)",
      "Above & Beyond Award - 2023",
      "Outstanding Performance in 2020 (Year on Year growth)",
    ],
  },
  {
    name: "Navitas",
    logo: "/images/awards/Frame 1000001718-2.png",
    awards: [
      "Outstanding Partner Award (2025)",
      "Diamond Agent (2022)",
    ],
  },
  {
    name: "Melbourne Polytechnic",
    logo: "/images/awards/Frame 1000001718-1.png",
    awards: ["Most Consistent Agency (2020)"],
  },
  {
    name: "CIM",
    logo: "/images/awards/Frame 1000001531.png",
    awards: ["Top Performing Partner 2023 - 24 (Melbourne Campus)"],
  },
  {
    name: "Holmes Institute",
    logo: "/images/awards/Frame 1000001718-6.png",
    awards: ["Outstanding Performance - Gold (2023/24)"],
  },
  {
    name: "UP Education",
    logo: "/images/awards/Frame 1000001718-9.png",
    awards: ["Platinum Partner (2023)"],
  },
  {
    name: "Victorian Institute of Technology",
    logo: "/images/awards/Frame 1000001532.png",
    awards: [
      "Platinum Agency Award (2020)",
      "Top Performing Business Partner (2023)",
    ],
  },
  {
    name: "PE Education",
    logo: "/images/awards/Frame 1000001718.png",
    awards: ["Agent Excellence Award (2023)"],
  },
];

export default function AwardsGallery() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div {...fadeUp()} className="text-center">
          <h2 className="text-2xl font-bold text-black sm:text-3xl">
            <span className="text-[#17318f]">Awards</span> Gallery
          </h2>
        </motion.div>

        {/* Gallery */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {awards.map((item, index) => (
            <motion.div
              key={`${item.name}-${index}`}
              {...fadeUp(index * 0.04)}
              className="group overflow-hidden rounded-xl border border-black/5 bg-white shadow-[0_4px_15px_rgba(0,0,0,0.10)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_14px_35px_rgba(0,0,0,0.16)]"
            >
              {/* Logo Section */}
              <div className="flex min-h-[125px] flex-col items-center justify-center bg-white px-5 py-4">
                <span className="mb-1 text-[10px] text-black/40">
                  Recognized by
                </span>

                <div className="relative h-[70px] w-full">
                  <Image
                    src={item.logo}
                    alt={`${item.name} logo`}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </div>

              {/* Awards Content */}
              <div className="min-h-[135px] bg-[#fff9e8] px-6 py-5">
                <ul className="space-y-2 text-sm leading-5 text-black/80">
                  {item.awards.map((award) => (
                    <li
                      key={award}
                      className="flex items-start gap-2"
                    >
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-black/70" />

                      <span>{award}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}