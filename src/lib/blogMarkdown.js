// Cleans up the body of a blog post from the blog CMS before it is drawn by BlogContent.
// The editors write markdown, but paste ready-made HTML (tables, "Also Read" boxes) inside ``` fences,
// which markdown would show as a block of code. These helpers turn all of that into normal content.

// Posts were first written for the old website. Links to its posts are turned into links inside this site:
// "https://pfecglobal.in/blog/some-post/" -> "/blog/some-post"
const OLD_POST_LINK = /https?:\/\/(?:www\.)?pfecglobal\.in\/blog\/([a-z0-9-]+)\/?(?=["')\s]|$)/gi;

// <div class="blog-also-read-box"> ... <a href="url">text</a> </div>  ->  > **Also Read:** [text](url)
// (a markdown quote, which BlogContent already draws as a highlighted box)
// One box at a time: the match never runs past the box's own </div>. (It used to keep searching for an href
// past the end of a box that had none, and replace everything up to the next box's link - deleting the text,
// pictures and sections in between.)
const ALSO_READ_BOX = /<div[^>]*class="[^"]*blog-also-read-box[^"]*"[^>]*>((?:(?!<\/div>)[\s\S])*)<\/div>/gi;
const BOX_LINK = /<a\b([^>]*)>([\s\S]*?)<\/a>/i;

// The address of the box's link: its href, or - when an editor typed the address into another attribute
// by mistake (e.g. class="https://...") - the first attribute value that looks like an address
function boxLinkAddress(attributes) {
  const href = attributes.match(/\bhref\s*=\s*"([^"]*)"/i)?.[1]?.trim();
  if (href) return href;
  return attributes.match(/"\s*((?:https?:\/\/|\/)[^"\s]+)\s*"/)?.[1];
}

// One "Also Read" box -> the markdown quote. A box without any address keeps its text, without a link.
function alsoReadQuote(box, inner) {
  const link = inner.match(BOX_LINK);
  const text = (link ? link[2] : "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  if (!text) return "\n\n";
  const href = boxLinkAddress(link[1]);
  return `\n\n> **Also Read:** ${href ? `[${text}](${href})` : text}\n\n`;
}

export function prepareBlogMarkdown(content) {
  if (typeof content !== "string" || !content.trim()) return "";

  return (
    content
      .replace(/\r\n?/g, "\n")
      // Unwrap ``` fences that hold HTML, so the HTML is drawn instead of being shown as code.
      // Blank lines inside are removed: a blank line would end the HTML block and break the table.
      .replace(/```(?:html|markdown)?[ \t]*\n([\s\S]*?)```/gi, (fence, inner) =>
        inner.trim().startsWith("<") ? `\n\n${inner.trim().replace(/\n\s*\n/g, "\n")}\n\n` : fence,
      )
      .replace(ALSO_READ_BOX, alsoReadQuote)
      // Some tables arrive with the body opened or closed twice
      .replace(/<tbody>\s*<tbody>/gi, "<tbody>")
      .replace(/<\/tbody>\s*<\/tbody>/gi, "</tbody>")
      .replace(OLD_POST_LINK, "/blog/$1")
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}

// The FAQ block of a post ([{ question, answer }]) as markdown.
// BlogContent turns a "Frequently Asked Questions" section into an accordion, so the FAQ needs no component of its own.
export function faqToMarkdown(items) {
  const questions = (Array.isArray(items) ? items : []).filter((item) => item?.question?.trim() && item?.answer?.trim());
  if (questions.length === 0) return "";
  return [
    "## Frequently Asked Questions",
    ...questions.map((item) => `#### ${item.question.trim()}\n\n${prepareBlogMarkdown(item.answer)}`),
  ].join("\n\n");
}

// Markdown -> plain text, for the short summary in the hero and the SEO description
export const stripMarkdown = (text) =>
  typeof text === "string"
    ? text
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+\.)\s+/gm, "")
        .replace(/[*_~`]/g, "")
        .replace(/\s+/g, " ")
        .trim()
    : "";
