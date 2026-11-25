import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import { rehypeFaqAccordion, rehypeHeadingIds } from "@/lib/markdown";
import { FaqItem, FaqList } from "@/components/FaqAccordion";

// How each markdown element is drawn. react-markdown also passes a "node" prop, which must not reach the HTML tag.
const components = {
  // scroll-mt leaves room for the sticky navbar and the floating "Jump to Topic" box when jumping to a heading
  // Section headings (h2) are clearly bigger than sub-headings (h3), with a thin line under them
  h2: ({ node, ...props }) => (
    <h2 className="mt-10 scroll-mt-36 border-b border-indigo/10 pb-2 text-[22px] font-bold leading-snug text-indigo first:mt-0 sm:text-2xl" {...props} />
  ),
  h3: ({ node, ...props }) => <h3 className="mt-8 text-[18px] font-semibold leading-snug text-ink" {...props} />,
  h4: ({ node, ...props }) => <h4 className="mt-6 text-[16px] font-bold text-ink" {...props} />,
  h5: ({ node, ...props }) => <h5 className="mt-6 font-bold text-ink" {...props} />,
  h6: ({ node, ...props }) => <h6 className="mt-6 font-semibold text-ink" {...props} />,
  p: ({ node, ...props }) => <p className="mt-4" {...props} />,
  strong: ({ node, ...props }) => <strong className="font-bold text-ink" {...props} />,
  // Links to other websites open in a new tab; links inside the site use the Next.js router
  a: ({ node, href = "", children, ...props }) =>
    /^https?:\/\//.test(href) ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className="break-words text-accent underline" {...props}>
        {children}
      </a>
    ) : (
      <Link href={href} className="break-words text-accent underline" {...props}>
        {children}
      </Link>
    ),
  // The second set of classes is for task lists ("- [x] done"): no bullets, the checkbox takes their place
  ul: ({ node, ...props }) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 [&.contains-task-list]:list-none [&.contains-task-list]:pl-1 [&_ol]:mt-2 [&_ul]:mt-2" {...props} />
  ),
  ol: ({ node, ...props }) => <ol className="mt-4 list-decimal space-y-2 pl-6 [&_ol]:mt-2 [&_ul]:mt-2" {...props} />,
  li: ({ node, ...props }) => <li className="[&>input]:mr-2 [&>input]:accent-accent [&>p]:mt-0" {...props} />,
  blockquote: ({ node, ...props }) => (
    <blockquote
      className="mt-6 rounded-r-lg border-l-4 border-accent bg-accent/5 px-4 py-3 italic text-ink [&>p:first-child]:mt-0"
      {...props}
    />
  ),
  // Markdown images come from the CMS with an unknown size and domain, so a plain <img> is used instead of next/image
  img: ({ node, alt = "", ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} loading="lazy" className="mt-6 h-auto max-w-full rounded-xl" {...props} />
  ),
  // Inline `code`. Inside a code block the <pre> below removes this pill styling again.
  code: ({ node, ...props }) => (
    <code className="rounded bg-ink/10 px-1.5 py-0.5 font-mono text-[0.9em] text-ink" {...props} />
  ),
  // Code block: scrolls sideways instead of breaking the page width
  pre: ({ node, ...props }) => (
    <pre
      className="mt-6 overflow-x-auto rounded-xl bg-navy p-4 text-xs leading-relaxed text-white sm:text-sm [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit"
      {...props}
    />
  ),
  // Tables scroll sideways on small screens instead of squeezing their columns
  table: ({ node, ...props }) => (
    <div className="mt-6 overflow-x-auto rounded-lg border border-indigo/15 bg-white">
      <table className="w-full min-w-[480px] text-left text-[16px] [&_p]:mt-0" {...props} />
    </div>
  ),
  thead: ({ node, ...props }) => <thead className="text-xs font-semibold text-ink" {...props} />,
  tr: ({ node, ...props }) => <tr className="border-t border-indigo/15 first:border-t-0" {...props} />,
  // A vertical line between columns: every cell has a line on its right except the last one of its row.
  // (A cell spanning several rows keeps its line all the way down.)
  // The header cells get a light pink background - also when the HTML table has no <thead>.
  th: ({ node, ...props }) => (
    <th className="border-r border-indigo/15 bg-[#FDECEB] px-4 py-3 last:border-r-0" {...props} />
  ),
  td: ({ node, ...props }) => <td className="border-r border-indigo/15 px-4 py-3 align-top last:border-r-0" {...props} />,
  hr: ({ node, ...props }) => <hr className="my-8 border-ink/15" {...props} />,
  // FAQ accordion: these four tags are created by rehypeFaqAccordion, they are not real HTML
  "faq-list": ({ node, ...props }) => <FaqList {...props} />,
  "faq-item": ({ node, ...props }) => <FaqItem {...props} />,
  "faq-question": ({ children }) => children,
  "faq-answer": ({ children }) => <div className="px-4 pb-4 [&>*:first-child]:mt-0">{children}</div>,
};

// Classes the CMS content may use (all other classes are removed): the "Book a Free Consultation" button that opens
// the consultation popup, and the grey band that centres it - styled in globals.css.
const contentClasses = {
  a: ["className", "data-footnote-backref", "open-consultation"],
  div: ["className", "consultation-cta"],
};

// What rehype-sanitize keeps: its default (GitHub-style) rules, plus the classes above
// and inline style="..." on any tag (cleaned afterwards by rehypeSafeStyles)
const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    "*": [...defaultSchema.attributes["*"], "style"],
    a: [...defaultSchema.attributes.a.filter((rule) => rule[0] !== "className"), contentClasses.a],
    div: [...defaultSchema.attributes.div, contentClasses.div],
  },
};

// CSS the content may not use in style="...": positioning (a box laid over the whole page), loading outside files
// (url(), @import) and old script hooks (expression(), behavior, -moz-binding). Everything else - colours, spacing,
// borders, flex/grid layouts - is kept, so cards and boxes built with inline styles in the CMS look as designed.
const blockedProperties = /^(position|z-index|inset|top|right|bottom|left|behavior|-moz-binding)$/i;
const blockedValues = /url\s*\(|expression\s*\(|javascript:|@import|\\/i;

// Plugin for react-markdown: removes the blocked declarations above from every style attribute
const rehypeSafeStyles = () => (tree) => {
  const visit = (node) => {
    if (typeof node.properties?.style === "string") {
      const safe = node.properties.style
        .split(";")
        .filter((declaration) => {
          const [property, ...value] = declaration.split(":");
          return value.length && !blockedProperties.test(property.trim()) && !blockedValues.test(value.join(":"));
        })
        .join(";");
      if (safe) node.properties.style = safe;
      else delete node.properties.style;
    }
    node.children?.forEach(visit);
  };
  visit(tree);
};

// The body of a blog post. markdown is the text as it comes from the API;
// headings is the list from getHeadings(markdown), used to give each h2 its id.
// remark-gfm adds tables, strikethrough, task lists and automatic links to standard markdown.
// HTML written inside the markdown (a <table>, <br>, <img>...) is rendered too, and gets the same styles as markdown:
// rehype-raw turns the HTML into real elements, then rehype-sanitize removes anything unsafe
// (<script>, <iframe>, <style>, onclick="..." attributes), so the content cannot inject code.
// Inline style="..." is kept for designed blocks (e.g. fee cards), minus the risky CSS (see rehypeSafeStyles).
// The FAQ section of the post becomes an accordion (see rehypeFaqAccordion).
// The order of the plugins matters: raw -> sanitize -> safe styles -> heading ids and FAQ.
export default function BlogContent({ markdown, headings }) {
  return (
    <article className="min-w-0 text-[16px] leading-relaxed text-ink/80">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeRaw,
          [rehypeSanitize, sanitizeSchema],
          rehypeSafeStyles,
          [rehypeHeadingIds, headings],
          rehypeFaqAccordion,
        ]}
        components={components}
      >
        {markdown}
      </Markdown>
    </article>
  );
}
