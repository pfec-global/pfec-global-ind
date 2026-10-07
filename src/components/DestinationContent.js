import * as motion from "motion/react-client";
import { fadeUp } from "@/lib/motion";

const universities = [
  ["Harvard University", "United States", "$51,904", "Up to 100% of demonstrated financial need"],
  ["University of Toronto", "Canada", "CAD 58,160", "Full tuition, books, and incidental fees"],
  ["Yale University", "United States", "$59,950", "Up to 100% of demonstrated financial need"],
  ["University of Oxford", "United Kingdom", "£26,770 to £37,510", "Full tuition and living expenses"],
  ["University of Cambridge", "United Kingdom", "£22,227 to £33,825", "Full tuition and maintenance costs"],
  ["Princeton University", "United States", "$53,890", "Up to 100% of demonstrated financial need"],
  [
    "Massachusetts Institute of Technology (MIT)",
    "United States",
    "$53,790",
    "Up to 100% of demonstrated financial need",
  ],
  ["University of British Columbia", "Canada", "CAD 54,000", "Full tuition and living expenses"],
  ["University of Auckland", "New Zealand", "NZD 35,000", "Up to NZD 200,000 (varies by program and scholarship type)"],
  ["Australian National University", "Australia", "AUD 45,360", "Partial to full tuition waivers"],
];

const destinations = [
  {
    name: "Australia",
    text: "Studying abroad is a life-changing experience that opens doors to global opportunities, high-quality education, and personal growth. At PFEC Global, we help aspiring students navigate the complexities of studying in top destinations like Australia, Canada, the USA, the UK, and New Zealand. With over 22,000 successful student placements and partnerships with 550+ leading institutions, we ensure a seamless journey from choosing the right course to securing a student visa.",
  },
  {
    name: "UK",
    text: "The UK boasts prestigious universities such as Oxford, Cambridge, and Imperial College London. It offers short-duration courses, excellent research opportunities, and an easy post-study work visa process, making it a popular study destination.",
  },
  {
    name: "USA",
    text: "The USA boasts prestigious universities such as Oxford, Cambridge, and Imperial College London. It offers short-duration courses, excellent research opportunities, and an easy post-study work visa process, making it a popular study destination.",
  },
];

export default function DestinationContent() {
  return (
    <section className="bg-[#f9f9f9] py-12 lg:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp()}>
          <h2 className="text-xl font-bold sm:text-2xl">
            Discover the Best Study Destinations and Transform Your Future with PFEC Global
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/75">
            Studying abroad is a life-changing experience that opens doors to global opportunities, high-quality
            education, and personal growth. At PFEC Global, we help aspiring students navigate the complexities of
            studying in top destinations like Australia, Canada, the USA, the UK, and New Zealand. With over 22,000
            successful student placements and partnerships with 550+ leading institutions, we ensure a seamless journey
            from choosing the right course to securing a student visa.
          </p>
        </motion.div>

        <motion.div {...fadeUp()} className="mt-10">
          <h2 className="text-xl font-bold sm:text-2xl">Top Universities in the World</h2>
          {/* The table scrolls sideways on small screens instead of squeezing its columns */}
          <div className="mt-4 overflow-x-auto rounded-lg border border-indigo/15 bg-white">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-[#f1f1f4] text-xs font-semibold">
                <tr>
                  <th className="px-4 py-3">University Name</th>
                  <th className="px-4 py-3">Country</th>
                  <th className="px-4 py-3">Average Tuition Fees (per year)</th>
                  <th className="px-4 py-3">Maximum Scholarship Value</th>
                </tr>
              </thead>
              <tbody>
                {universities.map((row) => (
                  <tr
                    key={row[0]}
                    className="border-t border-indigo/15 transition-colors duration-300 hover:bg-indigo/5"
                  >
                    {row.map((cell, i) => (
                      <td key={i} className="px-4 py-3 align-middle">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div {...fadeUp()} className="mt-10">
          <h2 className="text-xl font-bold sm:text-2xl">Study Destinations We Cover</h2>
          {destinations.map((destination) => (
            <div key={destination.name} className="mt-5">
              <h3 className="font-semibold text-indigo">{destination.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{destination.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
