import { buildFaqSchema, type Faq } from '../lib/faqSchema'

interface FaqSectionProps {
  faqs: Faq[]
  /** Heading shown above the list. Defaults to a generic FAQ title. */
  title?: string
}

// Renders an accessible Q/A list AND injects matching FAQPage JSON-LD.
// Used by town guides and the conditions page. The visible answer text is the
// same string passed into the schema, so the two never drift apart.
export default function FaqSection({ faqs, title = 'Frequently Asked Questions' }: FaqSectionProps) {
  if (!faqs || faqs.length === 0) return null

  return (
    <article className="lc">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }}
      />
      <h2 className="lc-name" style={{ fontSize: 24, marginBottom: 14 }}>
        {title}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {faqs.map((f, i) => (
          <div key={i}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, margin: '0 0 6px' }}>
              {f.q}
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-soft)', margin: 0 }}>
              {f.a}
            </p>
          </div>
        ))}
      </div>
    </article>
  )
}
