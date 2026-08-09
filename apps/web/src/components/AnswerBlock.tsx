// ─────────────────────────────────────────────────────────────────────────────
// ANSWER BLOCK — short, literal answers to the definitional queries a page
// already ranks for, placed above the fold.
//
// These queries ("what does lbi stand for", "how long is long beach island nj")
// sit on page one and take zero clicks, because Google answers them in the SERP
// from someone else's copy. The fix is not more prose: it's a heading that
// matches the question verbatim and a first sentence that stands alone as the
// answer, so the snippet is drawn from — and attributed to — this page.
//
// Deliberately NOT a second FAQ: no JSON-LD is emitted here. Pages carry one
// FAQPage block from <FaqSection>, and a question lives in one place or the
// other, never both, so the two can't compete for the same snippet.
// ─────────────────────────────────────────────────────────────────────────────

export type Answer = {
  /** Phrased the way it is typed into search, not the way an editor would write it. */
  q: string
  /** One sentence that answers the question with no other context needed. */
  lead: string
  /** Optional second sentence — the reason to click through rather than stop at the snippet. */
  detail?: string
}

interface AnswerBlockProps {
  answers: Answer[]
  /** Screen-reader/heading label for the group. */
  title?: string
}

export default function AnswerBlock({ answers, title = 'The short answers' }: AnswerBlockProps) {
  if (!answers || answers.length === 0) return null

  return (
    <article className="lc" style={{ borderLeft: '3px solid var(--teal-deep)' }}>
      <p className="pg-eyebrow" style={{ marginBottom: 14 }}>
        <span>{title}</span>
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {answers.map(a => (
          <div key={a.q}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 19,
                fontWeight: 500,
                color: 'var(--ink)',
                margin: '0 0 6px',
                lineHeight: 1.25,
              }}
            >
              {a.q}
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink)', margin: 0, fontWeight: 500 }}>
              {a.lead}
            </p>
            {a.detail && (
              <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-soft)', margin: '6px 0 0' }}>
                {a.detail}
              </p>
            )}
          </div>
        ))}
      </div>
    </article>
  )
}
