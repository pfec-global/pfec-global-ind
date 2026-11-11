// FAQ structured data (schema.org FAQPage) for search engines, so Google can show the questions and answers
// in its results. Give it the same list the page shows: faqs = [{ question, answer }].
// Renders nothing visible, and nothing at all when there are no questions.
// Usage: <FaqSchema faqs={faqs} />
export default function FaqSchema({ faqs }) {
  const items = (Array.isArray(faqs) ? faqs : []).filter(
    (faq) => typeof faq?.question === "string" && faq.question.trim() && typeof faq?.answer === "string" && faq.answer.trim(),
  );
  if (items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question.trim(),
      acceptedAnswer: { "@type": "Answer", text: faq.answer.trim() },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // The answers come from the CMS: "<" is escaped so a "</script>" inside one cannot break out of this tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  );
}
