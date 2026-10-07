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

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Destinations />
      <PopularCourses />
      <Steps />
      <Events />
      <Achievements />
      <Partners />
      <Testimonials />
      <Blogs />
      <Contact />
    </>
  );
}
