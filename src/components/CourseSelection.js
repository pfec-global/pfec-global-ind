
"use client";

import { useEffect, useRef, useState } from "react";

const documentList = [
  "English Language Proficiency Test Scores (PTE/IELTS)",
  "Entrance Exam Test Scores (GRE/GMAT/LSAT/MCAT)",
  "Statement of Purpose (SOP)",
  "All-Academic Documents",
  "Updated Resume/Curriculum Vitae",
  "Letters of Recommendation (LOR)",
  "Experience Letters (if available)",
  "Certificates for Extra-curricular Activities",
  "Proof of Sufficient Funds",
  "Research Proposal & Portfolio",
];

const courseSections = [
  {
    id: "course-selection",
    title: "Course Selection and Admission Advice",
    subtitle: "Choosing the right course and institution",
    image: "/images/course-selection.webp",
    alt: "Darts hitting a target representing course selection and career goals",
    imagePosition: "left",
    paragraphs: [
      "To guide the students in selecting the best quality of education tailored to their merit, course timeline, and financial abilities, our dedicated advisors start with background research and Genuine Temporary Entrant (GTE) eligibility as a process of application.",
      "At PFEC Global, we believe every student profile is unique, thus, focusing on evaluating each profile with time and care, considering past education qualifications and job experience through recognition of prior learning (RPL). Indeed, the extensive research on individual applicants leads us to choose what form of education will best fit their interests and prepare the supporting documents. For instance, a student with a study break of more than two years after completing High School or a Bachelor’s degree must provide sufficient evidence explaining the reason for the gap. Again, each applicant must present firm grounds on the statement of purpose behind selecting a course that would significantly increase employment upon return to the home country. Fortunately, we are here to guide the students in this regard. Eventually, after evaluating interests, academic history, financial status, and future career goals our team of devoted counselors recommends the right course and institution to the students.",
    ],
  },
  {
    id: "admission-documents",
    title: "Preparing the papers required by the educational institutions",
    image: "/images/admission-documents.webp",
    alt: "Student preparing and signing admission documents",
    imagePosition: "right",
    paragraphs: [
      "Alongside advising the right institutions, courses, and countries for international students, we also guide on what documentation the institutions need for their admission process. Our advisors, who provide reliable overseas education consultants in Dhaka and Chittagong, assist the applicants in preparing and assembling the following documents required during the admission application:",
    ],
    list: documentList,
  },
  {
    id: "interactive-sessions",
    title: "Interactive Sessions for Admission Help",
    image: "/images/interactive-sessions.webp",
    alt: "Student attending an online consultation with an education advisor",
    imagePosition: "left",
    paragraphs: [
      "PFEC Global is an official representative of institutes around the world to provide authentic services to students in India. On this ground, we arrange regular seminars where prominent educational institutions take part and conduct informative sessions, followed by on-spot admission for potential candidates. This process breeds trust and confidence among the students and makes us a trustworthy student visa consultant in India. Moreover, through interactive sessions, students get the golden opportunity to know about their dream institution and destination from QA sessions with institute representatives both in our onshore and offshore offices.",
    ],
  },
];

function AnimatedSection({ children, id, background = "bg-white" }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`overflow-hidden ${background} py-12 sm:py-16 lg:py-20`}
    >
      <div
        className={`mx-auto w-full max-w-[1130px] px-5 sm:px-8 transition-all duration-1000 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        {children}
      </div>
    </section>
  );
}

function CourseImage({ src, alt, imagePosition }) {
  return (
    <div
      className={`group w-full overflow-hidden ${
        imagePosition === "right" ? "lg:order-2" : "lg:order-1"
      }`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-[260px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none sm:h-[340px] lg:h-[400px]"
      />
    </div>
  );
}

function CourseContent({ section }) {
  return (
    <div
      className={`w-full ${
        section.imagePosition === "right" ? "lg:order-1" : "lg:order-2"
      }`}
    >
      <h2 className="font-montserrat text-[20px] font-bold leading-[1.6] text-black sm:text-[22px]">
        {section.title}
      </h2>

      {section.subtitle && (
        <h3 className="mt-4 font-montserrat text-[17px] font-normal leading-relaxed text-[#293b57] sm:text-[18px]">
          {section.subtitle}
        </h3>
      )}

      <div className="mt-4 space-y-5 font-montserrat text-[13px] leading-[1.75] text-[#17263d] sm:text-[14px]">
        {section.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {section.list && (
        <ol className="mt-6 list-decimal space-y-1 pl-5 font-montserrat text-[13px] leading-[1.6] text-[#17263d] sm:text-[14px]">
          {section.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default function CourseSelection() {
  return (
    <div className="font-montserrat">
      {courseSections.map((section, index) => (
        <AnimatedSection
          key={section.id}
          id={section.id}
          background={index === 2 ? "bg-[#fafafa]" : "bg-white"}
        >
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-5">
            <CourseImage
              src={section.image}
              alt={section.alt}
              imagePosition={section.imagePosition}
            />

            <CourseContent section={section} />
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}
