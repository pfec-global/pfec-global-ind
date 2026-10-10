import StepsColumn from "@/components/StepsColumn";
import StepsRow from "@/components/StepsRow";

// "Study Abroad in just 6 Simple Steps". The steps appear one after another as the visitor scrolls.
export default function Steps() {
  return (
    <section className="bg-[#f9f9f9]">
      {/* Mobile: steps in a zig-zag column */}
      <StepsColumn />

      {/* Tablet and desktop: one pinned row of steps */}
      <StepsRow />
    </section>
  );
}
