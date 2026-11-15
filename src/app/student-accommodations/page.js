import ServiceHero from "@/components/ServiceHero";
import AccommodationProviders from "@/components/AccommodationProviders";
import AccommodationFactors from "@/components/AccommodationFactors";

import Faq from "@/components/Faq";
import Steps from "@/components/Steps";

import TestimonialsWithCms from "@/components/TestimonialsWithCms";





const homeFaqs = [
  {
    question:
      "What kind of student accommodation options can I find through University Living and Casita?",
    answer:
      "Both platforms offer verified student housing near major universities—ranging from shared apartments and studios to ensuite rooms and private flats—based on your preferences and budget.",
  },
  {
    question:
      "Can I compare prices and facilities before booking?",
    answer:
      "Yes! Both University Living and Casita allow you to filter by price, location, amenities, and room types—making it easy to compare and choose what suits you best.",
  },
  {
    question:
      "Is it safe to book accommodation through these platforms?",
    answer:
      "Absolutely. Both providers are trusted globally and list only verified properties. Support teams are available to assist you from enquiry to move-in.",
  },
  {
    question:
      "How early should I book my student accommodation?",
    answer:
      "It’s best to book as early as possible—ideally right after receiving your offer letter. Early booking gives you more choices, better deals, and peace of mind before your journey.",
  },
  {
    question: "Can PFEC Global help me choose the right accommodation?",
    answer:
      "Yes. Our counsellors can guide you on choosing housing based on your study location, lifestyle, and budget—ensuring a smooth transition abroad.",
  },
];

export default function StudentAccommodationsPage() {
  return (
    <>
      <ServiceHero
        tag="Student Accommodations"
        titleTop="Find Affordable and Trusted "
        titleBottom="Student Accommodations"
        subtitle="Unlock global opportunities with seamless guidance from application to acceptance."
        image="/images/services/Student-Accommodations.webp"
        buttonText="Book a Free Consultation"
        buttonHref="/contact-us"
      />

      {/* Other sections */}
   <AccommodationProviders />
   <AccommodationFactors />
      
        
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