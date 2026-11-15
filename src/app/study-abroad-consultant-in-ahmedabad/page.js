import { branches } from "@/data/branches";
import BranchPage from "@/components/branch/BranchPage";

const branch = branches.ahmedabad;

export const metadata = branch.metadata;

// Ahmedabad branch landing page - same sections as every branch page, with the Ahmedabad details of src/data/branches.js
export default function StudyAbroadConsultantAhmedabadPage() {
  return <BranchPage branch={branch} />;
}
