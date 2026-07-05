// ─────────────────────────────────────────────────────────────────────────────
// FAQ SCHEMA — builds a schema.org FAQPage JSON-LD object from a list of Q/A
// pairs. Plain object in / plain object out so it serializes identically on the
// server (prerender) and the client. The rendered answer text in <FaqSection>
// must match the `text` here — Google requires visible answers to match schema.
// ─────────────────────────────────────────────────────────────────────────────

export type Faq = { q: string; a: string }

export function buildFaqSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }
}
