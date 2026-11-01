import { connection } from "next/server";
import { getDestinationPage } from "@/lib/destinationPage";
import { getScholarshipPage } from "@/lib/scholarshipPage";
import { getHomeSections } from "@/lib/homepage";
import Footer from "@/components/Footer";

// The footer with its lists taken from Strapi:
// Study Abroad from GET /api/destination-page, Scholarships from GET /api/scholarship-page,
// Popular Courses from the study areas of GET /api/homepage.
// A list that Strapi sends nothing for keeps its built-in lines.
export default async function FooterWithCms() {
  // The year is read on each visit: without this Next.js stops at new Date() while it prerenders the page
  await connection();
  const [destinationPage, scholarshipPage, homeSections] = await Promise.all([
    getDestinationPage(),
    getScholarshipPage(),
    getHomeSections(),
  ]);
  return (
    <Footer
      destinationItems={destinationPage.items}
      scholarshipItems={scholarshipPage.items}
      courseItems={homeSections["study-areas"]?.items}
      year={new Date().getFullYear()}
    />
  );
}
