import { FaBriefcaseMedical, FaBuildingColumns, FaHouse, FaPlane } from "react-icons/fa6";

// The service pages, used by the "Our Services" dropdown in the navbar and the footer
export const serviceItems = [
  { label: "University Admission Assistance", href: "/admission-support", Icon: FaBuildingColumns },
  { label: "Student Visa Assistance", href: "/visa-services", Icon: FaPlane },
  { label: "Health Insurance Assistance", href: "/health-insurance", Icon: FaBriefcaseMedical },
  { label: "Student Accommodation Assistance", href: "/student-accommodations", Icon: FaHouse },
];
