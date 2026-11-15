import { Suspense } from "react";
import { Bebas_Neue, Poppins, Titan_One } from "next/font/google";
import Reveal from "./Reveal";
import Hero from "./Hero";
import BranchEvents from "./BranchEvents";
import Testimonials from "./Testimonials";
import Location from "./Location";
import AboutCity from "./AboutCity";
import BranchDestinations from "./BranchDestinations";
import Services from "./Services";
import HowItWorks from "./HowItWorks";
import Team from "./Team";
import WhyTrust from "@/components/WhyTrust";
import OfficeGallery from "./OfficeGallery";
import Faq from "@/components/Faq";
import FaqSchema from "@/components/FaqSchema";

// The extra fonts of the branch design (Montserrat comes from the site layout)
const titanOne = Titan_One({ variable: "--font-titan-one", weight: "400", subsets: ["latin"] });
const bebasNeue = Bebas_Neue({ variable: "--font-bebas-neue", weight: "400", subsets: ["latin"] });
const poppins = Poppins({ variable: "--font-poppins", weight: ["400", "500", "600", "700"], subsets: ["latin"] });

// Questions of the FAQ section - shown with the home page's FAQ design (and its search engine markup)
const branchFaqs = [
  {
    question: "How can PFEC help me with IELTS registration?",
    answer:
      "PFEC Global will guide you through the entire IELTS registration process, from selecting the right test type and date to completing your booking smoothly and on time.",
  },
  {
    question: "Why should I register for IELTS through PFEC?",
    answer:
      "By registering through PFEC, you receive personalized support, expert guidance, and assistance with your study abroad plans, all in one place.",
  },
  {
    question: "What support does PFEC provide after IELTS registration?",
    answer:
      "PFEC offers end-to-end support, including university selection, application assistance, and visa guidance based on your IELTS results.",
  },
  {
    question: "Can PFEC help me choose the right IELTS test?",
    answer:
      "Yes, our experienced counsellors will help you choose the correct IELTS test (Academic, General, or UKVI) based on your study, work, or migration goals.",
  },
  {
    question: "How do I get started with PFEC for IELTS registration?",
    answer:
      "Simply contact PFEC Global or visit our office, and our team will assist you with the registration process and guide you on your study abroad journey.",
  },
];


// A city branch landing page (/study-abroad-consultant-in-<city>/), built from the pfec_brunch_page design
// (sections in src/components/branch). It sits between the site's own navbar and footer.
// branch is one entry of src/data/branches.js: the city's name, contact details, texts and office photos.
// The upcoming events and the study destinations come from Strapi; the other sections are built in.
export default function BranchPage({ branch }) {
  return (
    <>
      <div className={`branch-page overflow-x-clip ${titanOne.variable} ${bebasNeue.variable} ${poppins.variable}`}>
        <Reveal>
          <Hero branch={branch} />
        </Reveal>
        {/* The events wait for Strapi; the rest of the page does not wait for them */}
        <Suspense fallback={null}>
          <Reveal>
            <BranchEvents />
          </Reveal>
        </Suspense>
        <Reveal>
          <Testimonials />
        </Reveal>
        <Reveal>
          <Location branch={branch} />
        </Reveal>
        <Reveal>
          <AboutCity branch={branch} />
        </Reveal>
        {/* Only the countries of the Strapi destination list; nothing shows without them */}
        <Suspense fallback={null}>
          <Reveal>
            <BranchDestinations />
          </Reveal>
        </Suspense>
        <Reveal>
          <Services />
        </Reveal>
        <Reveal>
          <HowItWorks />
        </Reveal>
        <Reveal>
          <Team branch={branch} />
        </Reveal>
        <Reveal>
          <WhyTrust />
        </Reveal>
        <Reveal>
          <OfficeGallery branch={branch} />
        </Reveal>
      </div>
      {/* Outside .branch-page, so it looks exactly like the home page FAQ; its button opens the form at the top */}
      <Faq faqs={branchFaqs} ctaHref="#consultation" />
      <FaqSchema faqs={branchFaqs} />
    </>
  );
}
