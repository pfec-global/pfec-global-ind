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
import WhyTrust from "@/components/WhyTrust";
import Partners from "@/components/Partners";
import LeadershipTeam from "@/components/LeadershipTeam";
import AwardTrophies from "@/components/AwardTrophies";
import Testimonials from "@/components/Testimonials";
import Blogs from "@/components/Blogs";
import Faq from "@/components/Faq";
import FaqSchema from "@/components/FaqSchema";

import Contact from "@/components/Contact";


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

// A section's heading and subheading exactly as Strapi sends them: a field it leaves empty becomes null,
// which the components read as "leave it out" (instead of showing their built-in text)
const onlyFromCms = (section) => ({ ...section, heading: section.heading ?? null, subheading: section.subheading ?? null });

export default async function Home() {
  // Content from Strapi (and the blog CMS). A section that gets no data - Strapi sends nothing for it,
  // or cannot be reached - is left out of the page; it shows again as soon as its content is added.
  // Inside a section, a heading or subheading Strapi does not send is left out too.
  // Sections without a "?" test below have built-in content only.
  const [cms, latestBlogs] = await Promise.all([getHomeSections(), getLatestBlogs(10)]);
  // The same questions feed the FAQ section and its schema for search engines, so the two always match
  const faqs = cms.faq?.faqs;
  // The home page has a second partnerships section ("Our Partners") after the awards
  const morePartners = cms.all.partnerships?.[1];

  return (
    <>
      {cms.hero?.slides && <Hero {...cms.hero} />}
      {/* The cards are the four service pages; Strapi gives the heading and the pictures */}
      {cms.services?.items && <Services {...onlyFromCms(cms.services)} />}
      {/* CourseFinder search, just above "Top Institutions across the Globe" */}
      <CourseFinder />
      {cms.countries?.items && <Destinations {...onlyFromCms(cms.countries)} />}
      {cms["study-areas"]?.items && <PopularCourses {...onlyFromCms(cms["study-areas"])} />}
      <Steps />
      {cms.events?.items && <Events {...onlyFromCms(cms.events)} />}
      <Achievements />
      <WhyTrust />
      {cms.partnerships?.items && <Partners {...onlyFromCms(cms.partnerships)} />}
      {cms.leadership?.leaders && <LeadershipTeam {...onlyFromCms(cms.leadership)} background="bg-[#f9f9f9]" />}
      {cms.awards?.awards && <AwardTrophies {...onlyFromCms(cms.awards)} slider />}
      {morePartners?.items && <Partners {...onlyFromCms(morePartners)} />}
      {cms.testimonials?.items && <Testimonials {...cms.testimonials} />}
      {latestBlogs && <Blogs items={latestBlogs} />}
      {faqs && (
        <>
          <Faq faqs={faqs} title={cms.faq.title ?? null} />
          <FaqSchema faqs={faqs} />
        </>
      )}
      <Contact />
    </>
  );
}
