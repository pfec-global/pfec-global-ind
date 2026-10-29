import { getDestinationPage } from "@/lib/destinationPage";
import { getScholarshipPage } from "@/lib/scholarshipPage";
import Navbar from "@/components/Navbar";

// One line of a navbar dropdown. The logo is shown when Strapi sends one, nothing otherwise.
const toMenuItem = (item) => ({ label: item.label, href: item.href, flag: item.flag?.src });

// The navbar with its two dropdowns taken from Strapi:
// Destinations from GET /api/destination-page (logo = the country's flag),
// Scholarships from GET /api/scholarship-page (logo = the scholarship's logo).
// A dropdown that Strapi sends nothing for keeps its built-in list.
export default async function NavbarWithCms() {
  const [destinationPage, scholarshipPage] = await Promise.all([getDestinationPage(), getScholarshipPage()]);
  return (
    <Navbar
      destinationItems={destinationPage.items?.map(toMenuItem)}
      scholarshipItems={scholarshipPage.items?.map(toMenuItem)}
    />
  );
}
