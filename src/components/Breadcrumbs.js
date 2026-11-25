import Image from "next/image";
import Link from "next/link";
import { LuChevronRight, LuHouse } from "react-icons/lu";
import { plainText } from "@/components/HighlightText";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, "");
// The full address of a page, ending in "/" like every address of the site (trailingSlash in next.config.mjs)
const fullUrl = (href) => `${SITE_URL}${href.replace(/\/*$/, "/")}`;

// "Home > Student Services > Education Counselling": where the page sits in the site, each step a link.
// items = [{ label, href, icon }] after Home; the last item is the current page (no href needed, not a link).
// icon (optional): a small round picture before the label - e.g. the country's flag beside "Study in Ireland".
// center: the trail is centred (for centred heroes). dark: light text, for heroes with a dark background.
// Also adds the same trail as structured data (schema.org BreadcrumbList), so Google can show it in its results.
export default function Breadcrumbs({ items, className = "", center = false, dark = false }) {
  const trail = [{ label: "Home", href: "/" }, ...items].map((item) => ({ ...item, label: plainText(item.label) }));
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href && i < trail.length - 1 ? { item: fullUrl(item.href) } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={`flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs font-medium sm:text-sm ${
          center ? "justify-center" : ""
        }`}
      >
        {trail.map((item, i) => {
          const last = i === trail.length - 1;
          const icon = item.icon ? (
            <Image
              src={item.icon}
              alt=""
              width={18}
              height={18}
              className="h-[18px] w-[18px] shrink-0 rounded-full object-cover ring-1 ring-black/10"
            />
          ) : null;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {i > 0 && <LuChevronRight className={`h-3.5 w-3.5 shrink-0 ${dark ? "text-white/50" : "text-ink/40"}`} aria-hidden="true" />}
              {last ? (
                <span aria-current="page" className={`flex items-center gap-1.5 ${dark ? "text-white" : "text-accent"}`}>
                  {icon}
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 underline decoration-transparent underline-offset-4 transition hover:decoration-current ${
                    dark ? "text-white/75 hover:text-white" : "text-ink/70 hover:text-indigo"
                  }`}
                >
                  {i === 0 && <LuHouse className="h-3.5 w-3.5" aria-hidden="true" />}
                  {icon}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </nav>
  );
}
