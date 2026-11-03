import { FaBriefcaseMedical, FaBuildingColumns, FaHouse, FaPlane } from "react-icons/fa6";

// The service pages, used by the "Our Services" dropdown in the navbar and the footer
export const serviceItems = [
  { label: "University Admission Assistance", href: "/services/admission-support", Icon: FaBuildingColumns },
  { label: "Student Visa Assistance", href: "/services/visa-services", Icon: FaPlane },
  { label: "Health Insurance Assistance", href: "/services/health-insurance", Icon: FaBriefcaseMedical },
  { label: "Student Accommodation Assistance", href: "/services/student-accommodations", Icon: FaHouse },
];
