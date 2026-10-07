import DestinationHero from "@/components/DestinationHero";
import DestinationList from "@/components/DestinationList";

export const metadata = {
  title: "Study Destinations | PFEC Global",
  description: "Explore various factors that you need to consider before you choose a study destination.",
};

export default function DestinationsPage() {
  return (
    <>
      <DestinationHero />
      <DestinationList />
    </>
  );
}
