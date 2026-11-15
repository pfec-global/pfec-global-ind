import { branches } from "@/data/branches";
import BranchPage from "@/components/branch/BranchPage";

const branch = branches.kolkata;

export const metadata = branch.metadata;

// Kolkata branch landing page - same sections as every branch page, with the Kolkata details of src/data/branches.js
export default function StudyAbroadConsultantKolkataPage() {
  return <BranchPage branch={branch} />;
}
