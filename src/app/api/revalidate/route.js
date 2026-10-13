import { revalidateTag } from "next/cache";

// Strapi webhook: POST /api/revalidate?secret=<REVALIDATE_SECRET>  (or the secret in an "x-revalidate-secret" header).
// Refreshes the content fetched from Strapi so an edit in the CMS shows on the site without waiting for the hourly refresh.
// Optional: ?tag=homepage to refresh one thing only. Without it every Strapi tag below is refreshed.
const tags = ["homepage", "destination-page", "service-page", "scholarship-page", "scholarship", "country"];

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const secret = request.headers.get("x-revalidate-secret") ?? searchParams.get("secret");
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ revalidated: false, message: "Invalid secret" }, { status: 401 });
  }

  const tag = searchParams.get("tag");
  const refreshed = tag ? tags.filter((item) => item === tag) : tags;
  // "max": visitors keep getting the current page while the fresh one is prepared in the background
  for (const item of refreshed) revalidateTag(item, "max");
  return Response.json({ revalidated: true, tags: refreshed });
}
