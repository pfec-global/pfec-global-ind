import ServiceHero from "@/components/ServiceHero";
import AdmissionSupport from "@/components/AdmissionSupport";
import CourseSelection from "@/components/CourseSelection";
import Faq from "@/components/Faq";
import Steps from "@/components/Steps";

import Testimonials from "@/components/Testimonials";





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

export default function AdmissionSupportPage() {
  return (
    <>
      <ServiceHero
        tag="Services"
        titleTop="Expert Admission Support"
        titleBottom="for Your Study Abroad Journey"
        subtitle="Unlock global opportunities with seamless guidance from application to acceptance."
        image="/images/services/admission-support.webp"
        buttonText="Book a Free Consultation"
        buttonHref="/contact-us"
      />

      {/* Other sections */}
       <AdmissionSupport />
        <CourseSelection />
                <Steps />
        
         <Testimonials />
          {/* Homepage FAQ */}
                <Faq
                  title="Frequently Asked Questions"
                  faqs={homeFaqs}
                  ctaText="Book a Free Consultation"
                  ctaDescription="Our experts are waiting to help you take the next steps towards your dream."
                  ctaHref="#register-now"
                />
                       
                
    </>
  );
}