import { getHomeSections, getHomeSeo } from "@/lib/homepage";
import { toMetadata } from "@/lib/seo";
import { getLatestBlogs } from "@/lib/blogs";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Destinations from "@/components/Destinations";
import PopularCourses from "@/components/PopularCourses";
import Steps from "@/components/Steps";
import Events from "@/components/Events";
import Achievements from "@/components/Achievements";
import Partners from "@/components/Partners";
import Testimonials from "@/components/Testimonials";
import Blogs from "@/components/Blogs";
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

export default async function Home() {
  // Content from Strapi. Whatever Strapi does not send (a section, a heading, a list) is undefined here,
  // and the section then shows its built-in content - so the page also works with the CMS switched off.
  // The blog posts come from a separate CMS; both are asked at the same time.
  const [cms, latestBlogs] = await Promise.all([getHomeSections(), getLatestBlogs(10)]);

  return (
    <>
      <Hero {...cms.hero} />
      <Services {...cms.services} />
      <Destinations {...cms.countries} />
      <PopularCourses {...cms["study-areas"]} />
      <Steps />
      <Events {...cms.events} />
      <Achievements />
      <Partners {...cms.partnerships} />
      <Testimonials {...cms.testimonials} />
      <Blogs items={latestBlogs} />
      <Contact />
    </>
  );
}
