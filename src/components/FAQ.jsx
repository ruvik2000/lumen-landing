import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eyebrow, Reveal, EASE } from './_shared'

const FAQS = [
  { q: 'How long does it take to get started?', a: 'Most practices are live within 10 business days. We handle the EHR integration, payer enrollment, and staff training. You sign the contract, answer a few onboarding questions — we do the rest.' },
  { q: 'Do I need to change my EHR?', a: 'No. Relio integrates with your existing EHR via direct API or our secure connector. We support Epic, Athena, Kareo, eClinicalWorks, and 30+ others. If you use a system we haven’t connected to yet, we’ll build the integration.' },
  { q: 'What happens if a claim is denied?', a: 'Relio automatically detects the denial, classifies the reason, and triggers an appeal workflow. For the vast majority of denials we resubmit within minutes — without any action from you. Complex cases go to our certified billing team within 4 hours.' },
  { q: 'How is Relio priced?', a: 'We charge a percentage of collections — typically 2.9–4.5% depending on specialty, volume, and payer mix. No setup fees, no per-provider licenses, no long-term contracts. You only pay when we get you paid.' },
  { q: 'Is my patient data secure?', a: 'Yes. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We are HIPAA-certified, SOC 2 Type II audited, and sign a Business Associate Agreement (BAA) with every practice before accessing any data.' },
  { q: 'Can I keep my own billing staff?', a: 'Absolutely. Many practices use Relio alongside an existing biller. Our portal gives your staff full visibility into claims, denials, and analytics — and they can override any AI-generated code.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section style={{ position: 'relative', padding: '110px 0', background: '#04070f' }}>
      <div className="container" style={{ maxWidth: 800 }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <Reveal><Eyebrow color="#22d3ee">FAQ</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 className="section-title" style={{ marginTop: 16 }}>Questions, answered.</h2></Reveal>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FAQS.map((f, i) => (
            <Reveal key={i} delay={i * 0.04} y={16}>
              <Item faq={f} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Item({ faq, open, onToggle }) {
  return (
    <div className="glass glass-sheen" style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', borderColor: open ? 'rgba(99,102,241,0.4)' : 'var(--glass-border)' }}>
      <button onClick={onToggle} style={{ width: '100%', textAlign: 'left', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: open ? '#fff' : 'var(--ink-80)', transition: 'color 0.2s' }}>{faq.q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3, ease: EASE }}
          style={{ flexShrink: 0, width: 26, height: 26, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: open ? '#8b93ff' : 'var(--ink-45)', background: open ? 'rgba(99,102,241,0.14)' : 'rgba(255,255,255,0.05)', fontSize: 18, lineHeight: 1 }}>+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} style={{ overflow: 'hidden' }}>
            <div style={{ padding: '0 24px 22px', fontSize: 15, lineHeight: 1.8, color: 'var(--ink-60)' }}>{faq.a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
