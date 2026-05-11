import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const FAQS = [
  {
    q: 'How long does it take to get started?',
    a: 'Most practices are live within 10 business days. We handle the EHR integration, payer enrollment, and staff training. You sign the contract and answer a few onboarding questions — we do the rest.',
  },
  {
    q: 'Do I need to change my EHR?',
    a: 'No. Lumen integrates with your existing EHR via direct API or our secure connector. We support Epic, Athena, Kareo, eClinicalWorks, and 30+ others. If you use a system we haven\'t connected to yet, we\'ll build the integration.',
  },
  {
    q: 'What happens if a claim is denied?',
    a: 'Lumen automatically detects the denial, classifies the reason, and triggers an appeal workflow. For the vast majority of denials, we resubmit within minutes — without any action required from you. For complex cases, our certified billing team takes over within 4 hours.',
  },
  {
    q: 'How is Lumen priced?',
    a: 'We charge a percentage of collections — typically 2.9–4.5% depending on your specialty, volume, and payer mix. There are no setup fees, no per-provider licenses, and no long-term contracts. You only pay when we get you paid.',
  },
  {
    q: 'Is my patient data secure?',
    a: 'Yes. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We are HIPAA-certified, SOC 2 Type II audited, and we sign a Business Associate Agreement (BAA) with every practice before accessing any data.',
  },
  {
    q: 'Can I still have my own billing staff?',
    a: 'Absolutely. Many practices use Lumen alongside an existing biller. Our portal gives your staff full visibility into claims, denials, and analytics — and they can override any AI-generated code if they prefer.',
  },
]

export default function HomeFAQ() {
  const [open, setOpen] = useState(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section style={{ padding: '120px 0', background: 'var(--bg)' }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--indigo-pale)', marginBottom: 16 }}>FAQ</div>
          <h2 style={{ fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff' }}>
            Common questions
          </h2>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
        >
          {FAQS.map((f, i) => (
            <FAQItem key={i} faq={f} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function FAQItem({ faq, open, onToggle }) {
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: `1px solid ${open ? 'rgba(99,102,241,0.4)' : 'var(--border)'}`,
        borderRadius: 14,
        overflow: 'hidden',
        transition: 'border-color 0.25s',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%', textAlign: 'left', padding: '20px 24px',
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 600, color: open ? '#fff' : 'rgba(255,255,255,0.8)', transition: 'color 0.2s' }}>
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: 20, color: open ? 'var(--indigo-pale)' : 'rgba(255,255,255,0.3)', flexShrink: 0, lineHeight: 1 }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 24px 20px', fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.55)' }}>
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
