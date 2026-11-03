import { connection } from "next/server";
import { getDestinationPage } from "@/lib/destinationPage";
import { getScholarshipPage } from "@/lib/scholarshipPage";
import Footer from "@/components/Footer";

// The footer with its lists taken from Strapi:
// Study Abroad from GET /api/destination-page, Scholarships from GET /api/scholarship-page.
// A list that Strapi sends nothing for keeps its built-in lines.
export default async function FooterWithCms() {
  // The year is read on each visit: without this Next.js stops at new Date() while it prerenders the page
  await connection();
  const [destinationPage, scholarshipPage] = await Promise.all([
    getDestinationPage(),
    getScholarshipPage(),
  ]);
  return (
    <Footer
      destinationItems={destinationPage.items}
      scholarshipItems={scholarshipPage.items}
      year={new Date().getFullYear()}
    />
  );
}
