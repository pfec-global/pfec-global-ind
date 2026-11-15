import { connection } from "next/server";
import { getUpcomingEvents } from "@/lib/events";
import Events from "./Events";

// The "Upcoming Events" slider of the branch page, filled with the next events from Strapi.
// Without any event (none in Strapi, or Strapi cannot be reached) the section is left out.
export default async function BranchEvents() {
  // Which events are "upcoming" depends on today's date, so the list is made on every visit
  await connection();
  const events = await getUpcomingEvents(new Date());
  if (events.length === 0) return null;
  return <Events events={events} />;
}
