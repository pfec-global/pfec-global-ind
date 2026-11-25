// Renders a heading from Strapi where the part written inside { } is shown in the brand blue (#1D297C).
// "How PFEC Global {Simplifies your Study Abroad Journey?}" -> "How PFEC Global" in the normal colour,
// the rest in blue. Several { } parts are allowed; text without braces is shown as it is.
export default function HighlightText({ text, className = "text-indigo" }) {
  if (typeof text !== "string") return text;

  return text.split(/(\{[^{}]*\})/).map((part, i) =>
    part.startsWith("{") && part.endsWith("}") ? (
      <span key={i} className={className}>
        {part.slice(1, -1)}
      </span>
    ) : (
      part
    )
  );
}

// The same text with the braces removed, for places that need plain text (page titles, alt text, etc.)
export function plainText(text) {
  return typeof text === "string" ? text.replace(/[{}]/g, "") : text;
}
