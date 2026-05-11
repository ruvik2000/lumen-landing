import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const CATEGORIES = [
  {
    title: 'Getting Started',
    faqs: [
      { q: 'How long does onboarding take?', a: 'Most practices go live within 10 business days. We handle EHR integration, payer enrollment, and staff orientation. You\'ll review and approve the configuration before anything goes live.' },
      { q: 'What do I need to provide to get started?', a: 'A signed service agreement, your EHR credentials for integration setup, a list of payers you\'re currently contracted with, and a list of your providers. That\'s it.' },
      { q: 'Do I need to change my EHR or workflows?', a: 'No. Lumen works with your existing EHR. Your clinical workflows stay exactly the same. We sit in the background, reading the notes your providers already write.' },
      { q: 'Is there a minimum practice size?', a: 'No minimum. Lumen works for solo physicians and small groups. We\'ve onboarded single-provider concierge practices and 18-provider multi-specialty groups.' },
    ],
  },
  {
    title: 'Coding & Claims',
    faqs: [
      { q: 'How accurate is the AI coding?', a: 'Our ICD-10 and CPT coding achieves a 98.7% first-pass acceptance rate across all payers. The model is continuously trained on new payer policy updates and specialty-specific encounter patterns.' },
      { q: 'What specialties does Lumen support?', a: 'Internal medicine, family medicine, psychiatry, orthopedics, pediatrics, ophthalmology, pulmonology, dermatology, and more. We\'re continuously expanding specialty training data.' },
      { q: 'Can I review codes before they\'re submitted?', a: 'Yes. Your physician oversight portal shows every AI-generated code with its confidence score. You can approve batches, flag individual codes, or override any suggestion before submission.' },
      { q: 'How quickly are claims submitted after an encounter?', a: 'Claims are typically generated and submitted within 4 hours of the encounter note being finalized in your EHR. Urgent submissions can be prioritized.' },
    ],
  },
  {
    title: 'Denials & Appeals',
    faqs: [
      { q: 'What happens when a claim is denied?', a: 'Lumen automatically detects the denial, classifies the reason (CO, PR, OA codes), and triggers the appropriate appeal workflow. For most denials, the appeal is submitted within minutes.' },
      { q: 'Do you handle both technical and clinical denials?', a: 'Yes. Technical denials (wrong modifier, missing info) are handled automatically. Clinical denials (medical necessity, level of care) are escalated to our certified billing team for human review within 4 hours.' },
      { q: 'What\'s your denial appeal success rate?', a: 'We overturn 76% of initially denied claims on first appeal. For claims that go to peer-to-peer review, our clinical team coordinates directly with your providers.' },
      { q: 'How do I track denial trends?', a: 'Your Lumen dashboard shows denial reasons by payer, CPT code, and provider — with month-over-month trend lines so you can spot systematic issues early.' },
    ],
  },
  {
    title: 'Billing & Revenue',
    faqs: [
      { q: 'How is Lumen priced?', a: 'We charge a percentage of collections — typically 2.9% to 4.5% depending on specialty and volume. No setup fees, no per-seat licenses, no long-term lock-in.' },
      { q: 'How soon will I see a revenue improvement?', a: 'Most practices see measurable improvement within the first 30 days — typically from better code capture on under-documented visits and faster denial resolution.' },
      { q: 'Do you handle patient billing too?', a: 'Yes. Lumen sends branded, plain-language statements to patients via email and SMS, and provides an online payment portal. You receive deposits directly to your bank account.' },
      { q: 'What\'s the typical revenue lift I can expect?', a: 'The average across our practice base is +32% in net collections in the first 6 months. Results vary by specialty, current collection rate, and payer mix.' },
    ],
  },
  {
    title: 'Security & Compliance',
    faqs: [
      { q: 'Is Lumen HIPAA compliant?', a: 'Yes. Lumen is HIPAA-certified and we sign a Business Associate Agreement (BAA) with every practice before accessing any data. We have designated Privacy and Security Officers.' },
      { q: 'How is data encrypted?', a: 'All data is encrypted at rest using AES-256 and in transit using TLS 1.3. Data is stored in HIPAA-eligible AWS regions with geo-redundant backups.' },
      { q: 'Do you sell or share patient data?', a: 'Never. Patient data is used exclusively to provide billing services to your practice. We do not sell, license, or aggregate patient data for any purpose.' },
      { q: 'What security certifications does Lumen have?', a: 'SOC 2 Type II (annual audit), HIPAA certification, and HITRUST CSF. Our full security documentation is available under NDA for enterprise practices.' },
    ],
  },
  {
    title: 'EHR & Integrations',
    faqs: [
      { q: 'Which EHRs do you integrate with?', a: 'Epic, Athena Health, Kareo (Tebra), eClinicalWorks, DrChrono, Modernizing Medicine, Greenway Health, Practice Fusion, and 25+ others via HL7/FHIR or direct API.' },
      { q: 'What if my EHR isn\'t on your list?', a: 'We\'ll evaluate it during your onboarding call. If we don\'t have a connector yet, we can often build one — particularly for mid-market EHRs with documented APIs.' },
      { q: 'Is the EHR integration bidirectional?', a: 'Yes. We read clinical documentation to generate codes and also write back payment and denial status so your EHR\'s financial reporting stays accurate.' },
    ],
  },
  {
    title: 'Support',
    faqs: [
      { q: 'What support is included?', a: 'Every practice gets a named account manager, access to our billing team via in-app chat and phone, and a response SLA of 2 hours for urgent issues during business hours.' },
      { q: 'Is there after-hours support?', a: 'For critical issues — such as payer portal outages or EDI submission failures — we have on-call support available 24/7. Routine questions are handled during business hours (8am–7pm ET).' },
      { q: 'Do you provide training for my staff?', a: 'Yes. We offer live onboarding training, recorded walkthroughs for your staff, and an in-app help center with step-by-step guides. Additional training sessions are available on request.' },
    ],
  },
]

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
}

export default function FAQPage() {
  const [openItem, setOpenItem] = useState(null)

  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit" style={{ paddingTop: 64 }}>
      {/* Header */}
      <div style={{ background: 'var(--surface)', padding: '80px 0 64px', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: 760, textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--indigo-pale)', marginBottom: 16 }}>Help center</div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginBottom: 16 }}>Frequently asked questions</h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
            Everything you need to know about Lumen. Can't find an answer?{' '}
            <a href="#cta" style={{ color: 'var(--indigo-pale)', textDecoration: 'underline' }}>Talk with our team.</a>
          </p>
        </div>
      </div>

      {/* FAQ categories */}
      <div style={{ background: 'var(--bg)', padding: '80px 0 120px' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          {CATEGORIES.map((cat, ci) => (
            <CategorySection
              key={cat.title}
              category={cat}
              openItem={openItem}
              setOpenItem={setOpenItem}
              baseIndex={ci * 100}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function CategorySection({ category, openItem, setOpenItem, baseIndex }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ marginBottom: 56 }}
    >
      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
        {category.title}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {category.faqs.map((faq, i) => {
          const key = baseIndex + i
          return (
            <FAQItem
              key={key}
              faq={faq}
              open={openItem === key}
              onToggle={() => setOpenItem(openItem === key ? null : key)}
            />
          )
        })}
      </div>
    </motion.div>
  )
}

function FAQItem({ faq, open, onToggle }) {
  return (
    <div style={{
      background: 'var(--surface)', border: `1px solid ${open ? 'rgba(99,102,241,0.4)' : 'var(--border)'}`,
      borderRadius: 12, overflow: 'hidden', transition: 'border-color 0.25s',
    }}>
      <button
        onClick={onToggle}
        style={{ width: '100%', textAlign: 'left', padding: '18px 22px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}
      >
        <span style={{ fontSize: 15, fontWeight: 600, color: open ? '#fff' : 'rgba(255,255,255,0.78)', transition: 'color 0.2s' }}>{faq.q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }} style={{ fontSize: 20, color: open ? 'var(--indigo-pale)' : 'rgba(255,255,255,0.28)', flexShrink: 0 }}>+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: 'hidden' }}>
            <div style={{ padding: '0 22px 18px', fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.52)' }}>{faq.a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
