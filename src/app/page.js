import { getHomeSections, getHomeSeo } from "@/lib/homepage";
import { toMetadata } from "@/lib/seo";
import { getLatestBlogs } from "@/lib/blogs";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Destinations from "@/components/Destinations";
import CourseFinder from "@/components/CourseFinder";
import PopularCourses from "@/components/PopularCourses";
import Steps from "@/components/Steps";
import Events from "@/components/Events";
import Achievements from "@/components/Achievements";
import Partners from "@/components/Partners";
import Testimonials from "@/components/Testimonials";
import Blogs from "@/components/Blogs";
import Faq from "@/components/Faq";
import FaqSchema from "@/components/FaqSchema";

import Contact from "@/components/Contact";


// Built-in questions, shown only when Strapi sends no FAQ section (or the CMS cannot be reached)
const homeFaqs = [
  {
    question:
      "What services does PFEC Global India offer for study abroad aspirants?",
    answer:
      "PFEC Global India supports students with university admissions, visa processing, scholarship guidance, pre-departure preparation, health insurance, and other study abroad services.",
  },
  {
    question:
      "Which countries can I study in with PFEC Global's support?",
    answer:
      "PFEC Global operates in 11 countries and collaborates with over 550 universities. Australia, the United Kingdom, Canada, Germany, the United States, and Ireland are some of the destinations available to students.",
  },
  {
    question:
      "How experienced is PFEC Global in international education consultancy?",
    answer:
      "PFEC Global has over 18 years of experience as a study abroad agency, with more than 22,000 student success stories.",
  },
  {
    question:
      "Is there a fee to get guidance from PFEC Global India?",
    answer:
      "PFEC Global India offers consultations and student services. Available services and fees may depend on the university and the service selected.",
  },
  {
    question: "How do I get started with PFEC Global India?",
    answer:
      "Fill out the consultation form on our homepage with your contact details, preferred study destination, and English language proficiency level. Our counselors can then guide you through the next steps.",
  },
];


// The home page waits for Strapi on every visit while caching is switched off (CACHE_STRAPI in src/lib/strapi.js).
// This tells Next.js that waiting is expected here. Remove it when caching is switched back on.
export const instant = false;

// SEO tags come from the "seo" block of the home page in Strapi; these are used for whatever Strapi does not send
const defaultMetadata = {
  title: "PFEC Global | Study Abroad & Visa",
  description: "From education to visas, we've got your back.",
};

export async function generateMetadata() {
  return toMetadata(await getHomeSeo(), defaultMetadata);
}

export default async function Home() {
  // Content from Strapi. Whatever Strapi does not send (a section, a heading, a list) is undefined here,
  // and the section then shows its built-in content - so the page also works with the CMS switched off.
  // The blog posts come from a separate CMS; both are asked at the same time.
  const [cms, latestBlogs] = await Promise.all([getHomeSections(), getLatestBlogs(10)]);
  // The same questions feed the FAQ section and its schema for search engines, so the two always match
  const faqs = cms.faq?.faqs ?? homeFaqs;

  return (
    <>
      <Hero {...cms.hero} />
      <Services {...cms.services} />
      {/* CourseFinder search, just above "Top Institutions across the Globe" */}
      <CourseFinder />
      <Destinations {...cms.countries} />
      <PopularCourses {...cms["study-areas"]} />
      <Steps />
      <Events {...cms.events} />
      <Achievements />
      <Partners {...cms.partnerships} />
      <Testimonials {...cms.testimonials} />
      <Blogs items={latestBlogs} />
      {/* Heading and questions from the FAQ section of the home page in Strapi; the built-in questions when it sends none */}
      <Faq {...cms.faq} faqs={faqs} />
      <FaqSchema faqs={faqs} />
      <Contact />
    </>
  );
}
