import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icons, Reveal, PageHero, EASE } from '../components/_shared'

const CATEGORIES = [
  {
    title: 'Getting Started', icon: Icons.bolt, c: '#8b93ff',
    faqs: [
      { q: 'How long does onboarding take?', a: "Most practices go live within 10 business days. We handle EHR integration, payer enrollment, and staff orientation. You'll review and approve the configuration before anything goes live." },
      { q: 'What do I need to provide to get started?', a: "A signed service agreement, your EHR credentials for integration setup, a list of payers you're currently contracted with, and a list of your providers. That's it." },
      { q: 'Do I need to change my EHR or workflows?', a: 'No. Relio works with your existing EHR. Your clinical workflows stay exactly the same. We sit in the background, reading the notes your providers already write.' },
      { q: 'Is there a minimum practice size?', a: "No minimum. Relio works for solo physicians and small groups. We've onboarded single-provider concierge practices and 18-provider multi-specialty groups." },
    ],
  },
  {
    title: 'Coding & Claims', icon: Icons.brain, c: '#22d3ee',
    faqs: [
      { q: 'How accurate is the AI coding?', a: 'Our ICD-10 and CPT coding achieves a 98.7% first-pass acceptance rate across all payers. The model is continuously trained on new payer policy updates and specialty-specific encounter patterns.' },
      { q: 'What specialties does Relio support?', a: "Internal medicine, family medicine, psychiatry, orthopedics, pediatrics, ophthalmology, pulmonology, dermatology, and more. We're continuously expanding specialty training data." },
      { q: "Can I review codes before they're submitted?", a: 'Yes. Your physician oversight portal shows every AI-generated code with its confidence score. You can approve batches, flag individual codes, or override any suggestion before submission.' },
      { q: 'How quickly are claims submitted after an encounter?', a: 'Claims are typically generated and submitted within 4 hours of the encounter note being finalized in your EHR. Urgent submissions can be prioritized.' },
    ],
  },
  {
    title: 'Denials & Appeals', icon: Icons.refresh, c: '#38bdf8',
    faqs: [
      { q: 'What happens when a claim is denied?', a: 'Relio automatically detects the denial, classifies the reason (CO, PR, OA codes), and triggers the appropriate appeal workflow. For most denials, the appeal is submitted within minutes.' },
      { q: 'Do you handle both technical and clinical denials?', a: 'Yes. Technical denials (wrong modifier, missing info) are handled automatically. Clinical denials (medical necessity, level of care) are escalated to our certified billing team for human review within 4 hours.' },
      { q: "What's your denial appeal success rate?", a: 'We overturn 76% of initially denied claims on first appeal. For claims that go to peer-to-peer review, our clinical team coordinates directly with your providers.' },
      { q: 'How do I track denial trends?', a: 'Your Relio dashboard shows denial reasons by payer, CPT code, and provider — with month-over-month trend lines so you can spot systematic issues early.' },
    ],
  },
  {
    title: 'Billing & Revenue', icon: Icons.dollar, c: '#34d399',
    faqs: [
      { q: 'How is Relio priced?', a: 'We charge a percentage of collections — typically 2.9% to 4.5% depending on specialty and volume. No setup fees, no per-seat licenses, no long-term lock-in.' },
      { q: 'How soon will I see a revenue improvement?', a: 'Most practices see measurable improvement within the first 30 days — typically from better code capture on under-documented visits and faster denial resolution.' },
      { q: 'Do you handle patient billing too?', a: 'Yes. Relio sends branded, plain-language statements to patients via email and SMS, and provides an online payment portal. You receive deposits directly to your bank account.' },
      { q: "What's the typical revenue lift I can expect?", a: 'The average across our practice base is +32% in net collections in the first 6 months. Results vary by specialty, current collection rate, and payer mix.' },
    ],
  },
  {
    title: 'Security & Compliance', icon: Icons.shield, c: '#6ee7b7',
    faqs: [
      { q: 'Is Relio HIPAA compliant?', a: 'Yes. Relio is HIPAA-certified and we sign a Business Associate Agreement (BAA) with every practice before accessing any data. We have designated Privacy and Security Officers.' },
      { q: 'How is data encrypted?', a: 'All data is encrypted at rest using AES-256 and in transit using TLS 1.3. Data is stored in HIPAA-eligible AWS regions with geo-redundant backups.' },
      { q: 'Do you sell or share patient data?', a: 'Never. Patient data is used exclusively to provide billing services to your practice. We do not sell, license, or aggregate patient data for any purpose.' },
      { q: 'What security certifications does Relio have?', a: 'SOC 2 Type II (annual audit), HIPAA certification, and HITRUST CSF. Our full security documentation is available under NDA for enterprise practices.' },
    ],
  },
  {
    title: 'EHR & Integrations', icon: Icons.link, c: '#818cf8',
    faqs: [
      { q: 'Which EHRs do you integrate with?', a: 'Epic, Athena Health, Kareo (Tebra), eClinicalWorks, DrChrono, Modernizing Medicine, Greenway Health, Practice Fusion, and 25+ others via HL7/FHIR or direct API.' },
      { q: "What if my EHR isn't on your list?", a: "We'll evaluate it during your onboarding call. If we don't have a connector yet, we can often build one — particularly for mid-market EHRs with documented APIs." },
      { q: 'Is the EHR integration bidirectional?', a: "Yes. We read clinical documentation to generate codes and also write back payment and denial status so your EHR's financial reporting stays accurate." },
    ],
  },
  {
    title: 'Support', icon: Icons.chat, c: '#fbbf24',
    faqs: [
      { q: 'What support is included?', a: 'Every practice gets a named account manager, access to our billing team via in-app chat and phone, and a response SLA of 2 hours for urgent issues during business hours.' },
      { q: 'Is there after-hours support?', a: 'For critical issues — such as payer portal outages or EDI submission failures — we have on-call support available 24/7. Routine questions are handled during business hours (8am–7pm ET).' },
      { q: 'Do you provide training for my staff?', a: 'Yes. We offer live onboarding training, recorded walkthroughs for your staff, and an in-app help center with step-by-step guides. Additional sessions are available on request.' },
    ],
  },
]

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
}

export default function FAQPage() {
  const [openItem, setOpenItem] = useState('0-0')

  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
      <PageHero
        eyebrow="Help center"
        title="Questions,"
        gradient="answered."
        subtitle="Everything you need to know about Relio — onboarding, coding, denials, security, and more."
        accent="#22d3ee"
      />

      <div style={{ background: '#04070f', padding: '64px 0 120px' }}>
        <div className="container" style={{ maxWidth: 820 }}>
          {CATEGORIES.map((cat, ci) => {
            const Ic = cat.icon
            return (
              <Reveal key={cat.title} y={24} style={{ marginBottom: 48 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 18 }}>
                  <span style={{ width: 42, height: 42, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cat.c, background: `${cat.c}1f`, border: `1px solid ${cat.c}40` }}><Ic size={21} /></span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>{cat.title}</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {cat.faqs.map((faq, i) => {
                    const key = `${ci}-${i}`
                    return <Item key={key} faq={faq} accent={cat.c} open={openItem === key} onToggle={() => setOpenItem(openItem === key ? null : key)} />
                  })}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

function Item({ faq, open, onToggle, accent }) {
  return (
    <div className="glass glass-sheen" style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', borderColor: open ? `${accent}66` : 'var(--glass-border)' }}>
      <button onClick={onToggle} style={{ width: '100%', textAlign: 'left', padding: '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 15.5, fontWeight: 600, color: open ? '#fff' : 'var(--ink-80)', transition: 'color 0.2s' }}>{faq.q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3, ease: EASE }}
          style={{ flexShrink: 0, width: 26, height: 26, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: open ? accent : 'var(--ink-45)', background: open ? `${accent}22` : 'rgba(255,255,255,0.05)', fontSize: 18, lineHeight: 1 }}>+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32, ease: EASE }} style={{ overflow: 'hidden' }}>
            <div style={{ padding: '0 22px 20px', fontSize: 14.5, lineHeight: 1.8, color: 'var(--ink-60)' }}>{faq.a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
