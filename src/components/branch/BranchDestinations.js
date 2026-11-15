import { getDestinationPage } from "@/lib/destinationPage";
import { countryFlag } from "@/data/countries";
import { builtInDestinations, toItem } from "@/data/branchDestinations";
import Destinations from "./Destinations";

// The "Explore & Apply" slider of the branch page: exactly the countries of GET /api/destination-page,
// in their Strapi order (the same list as the Destination page and menu). Nothing is added to it.
// A country without a flag or card picture in Strapi borrows the branch design's one (or the site's round flag).
// When Strapi sends no countries (or cannot be reached) the section is left out.
export default async function BranchDestinations() {
  const { items: countries } = await getDestinationPage();
  if (!countries?.length) return null;

  const items = countries.map((country) => {
    const builtIn = builtInDestinations.find((item) => item.href.replace(/\/$/, "") === country.href);
    const fallback = builtIn ? toItem(builtIn) : {};
    const name = country.label.replace(/^Study in /, "");
    return {
      name,
      href: country.href,
      link: country.label,
      image: country.image ?? fallback.image ?? null,
      flag: country.flag?.src ?? fallback.flag ?? countryFlag(country.href),
    };
  });
  return <Destinations items={items} />;
}
