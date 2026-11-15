import ServiceHero from "@/components/ServiceHero";
import VisaServices from "@/components/VisaServices";
import Faq from "@/components/Faq";
import Steps from "@/components/Steps";

import TestimonialsWithCms from "@/components/TestimonialsWithCms";





const homeFaqs = [
  {
    question:
      "What documents are typically required for a student visa application?",
    answer:
      "To successfully obtain a student visa, you must first possess a valid passport. In addition, you will need to provide an acceptance letter from your chosen institution, a certificate demonstrating your English proficiency, financial statements to prove your ability to support yourself, and specific documents required by your country.",
  },
  {
    question:
      "How long does student visa processing take?",
    answer:
      "Securing a student visa can take up to 12 weeks, so it’s crucial to plan accordingly. To ensure a smooth application process, PFEC India strongly recommends initiating your visa application at least six months before the start of your classes.",
  },
  {
    question:
      "Can PFEC assist me in preparing for the visa interview?",
    answer:
      "Yes. PFEC Global will help you with every bit of the visa processing. We will provide mock interviews for you. Your answers will be evaluated, and we will provide you with tailored feedback.",
  },
  {
    question:
      "Can I extend my visa after completing my studies abroad?",
    answer:
      "In many countries, students can extend their stay with post-study work permits or graduate visas. PFEC Global India will assist you throughout the entire process, ensuring you are informed about current developments.",
  },
  {
    question: "What kind of visa support does PFEC Global India offer?",
    answer:
      "The PFEC Global offers different support services. It includes Document verification, country-specific visa guidelines, SOP, and financial document preparation, visa interview preparation, and ongoing support for extensions or changes.",
  },
];

export default function VisaServicesPage() {
  return (
    <>
      <ServiceHero
        tag="Visa Services"
        titleTop="Hassle-Free Visa Services for"
        titleBottom="Your Study Abroad Journey"
        subtitle="Get expert guidance and seamless support for your student visa application and approval."
        image="/images/services/admission-support.webp"
        buttonText="Book a Free Consultation"
        buttonHref="/contact-us"
      />

      {/* Other sections */}
       <VisaServices />
        
                <Steps />
        
         <TestimonialsWithCms />
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