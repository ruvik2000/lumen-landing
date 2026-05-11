import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const SECTIONS = [
  {
    eyebrow: 'AI Coding',
    title: 'From clinical note to billable code — in seconds',
    body: 'Lumen\'s coding engine processes your encounter documentation the moment you close a note. It extracts diagnoses, procedures, modifiers, and place-of-service details — cross-referencing payer rules to ensure every code will clear. No template mapping. No coder bottleneck.',
    bullets: ['Reads SOAP notes, voice transcripts, and structured EHR data', 'Automatic modifer (25, 59, GT) detection', 'Flags under-coded or upcoded visits before submission'],
    visual: <CodingVisual />,
    flip: false,
  },
  {
    eyebrow: 'Claims & Payers',
    title: 'Clean claims. Faster payments.',
    body: 'Every claim passes a 2,700-point pre-submission scrub against payer-specific rules before it leaves our system. We connect to over 500 commercial and government payers electronically — with real-time status updates and automatic ERA/EOB matching to your bank.',
    bullets: ['2,700-rule pre-submission scrub', '500+ payer EDI connections', 'Real-time ERA reconciliation & deposit matching'],
    visual: <ClaimsVisual />,
    flip: true,
  },
  {
    eyebrow: 'Denial Management',
    title: 'Every denial answered. Automatically.',
    body: 'When a claim is denied, Lumen classifies the reason, generates a tailored appeal letter, and resubmits — all without a human touching it. For edge cases that need expert review, we escalate to our certified billing team within 4 hours.',
    bullets: ['AI-generated appeal letters per payer policy', 'Human escalation SLA: 4 hours', 'Full denial analytics: track trends, spot patterns'],
    visual: <DenialVisual />,
    flip: false,
  },
]

export default function DeepDive() {
  return (
    <section style={{ padding: '40px 0 120px', background: 'var(--bg)' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 120 }}>
        {SECTIONS.map(s => <DeepSection key={s.eyebrow} section={s} />)}
      </div>
    </section>
  )
}

function DeepSection({ section: s }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const content = (
    <motion.div
      initial={{ opacity: 0, x: s.flip ? 32 : -32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--indigo-pale)', marginBottom: 16 }}>{s.eyebrow}</div>
      <h3 style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.2, marginBottom: 20 }}>{s.title}</h3>
      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.52)', marginBottom: 28 }}>{s.body}</p>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {s.bullets.map(b => (
          <li key={b} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 15, color: 'rgba(255,255,255,0.65)' }}>
            <span style={{ color: 'var(--indigo-pale)', fontWeight: 700, flexShrink: 0, marginTop: 2 }}>—</span>
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  )

  const visual = (
    <motion.div
      initial={{ opacity: 0, x: s.flip ? -32 : 32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      {s.visual}
    </motion.div>
  )

  return (
    <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
      {s.flip ? <>{visual}{content}</> : <>{content}{visual}</>}
    </div>
  )
}

function CodingVisual() {
  const codes = [
    { code: 'Z00.00', desc: 'Encounter for exam, adult', conf: 98 },
    { code: 'E11.9', desc: 'Type 2 diabetes mellitus', conf: 96 },
    { code: 'I10', desc: 'Essential hypertension', conf: 99 },
    { code: '99214', desc: 'Office visit, level 4', conf: 97 },
    { code: 'G0008', desc: 'Influenza vaccine admin', conf: 94 },
  ]
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: 28, overflow: 'hidden' }}>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginBottom: 16, fontFamily: 'monospace' }}>AI Coding — encounter_20260511.txt</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {codes.map((c, i) => (
          <motion.div
            key={c.code}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg)', borderRadius: 10, padding: '10px 14px' }}
          >
            <span style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 700, color: 'var(--indigo-pale)', minWidth: 56 }}>{c.code}</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', flex: 1 }}>{c.desc}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 48, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${c.conf}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.3, duration: 0.6 }}
                  style={{ height: '100%', background: 'var(--indigo-pale)', borderRadius: 2 }}
                />
              </div>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', minWidth: 28 }}>{c.conf}%</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ClaimsVisual() {
  const claims = [
    { id: 'CLM-7741', payer: 'UnitedHealth', amount: '$342', status: 'Paid', color: '#10b981' },
    { id: 'CLM-7742', payer: 'Aetna', amount: '$218', status: 'Submitted', color: '#6366f1' },
    { id: 'CLM-7743', payer: 'BCBS Illinois', amount: '$510', status: 'Paid', color: '#10b981' },
    { id: 'CLM-7744', payer: 'Cigna', amount: '$124', status: 'Pending', color: '#f59e0b' },
    { id: 'CLM-7745', payer: 'Medicare', amount: '$287', status: 'Paid', color: '#10b981' },
  ]
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: 28 }}>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>Claims Tracker — May 2026</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {claims.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'var(--bg)', borderRadius: 10 }}
          >
            <span style={{ fontFamily: 'monospace', fontSize: 12, color: 'rgba(255,255,255,0.35)', minWidth: 72 }}>{c.id}</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', flex: 1 }}>{c.payer}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#fff', minWidth: 44 }}>{c.amount}</span>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: `${c.color}22`, color: c.color }}>{c.status}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function DenialVisual() {
  const events = [
    { time: '09:04', label: 'Claim denied — CO-4: missing modifier', type: 'error' },
    { time: '09:04', label: 'Root cause identified — CPT 99214 + 25', type: 'info' },
    { time: '09:05', label: 'Appeal letter generated', type: 'info' },
    { time: '09:06', label: 'Resubmitted to Cigna', type: 'info' },
    { time: '09:47', label: 'Claim approved — $218.00', type: 'success' },
  ]
  const colors = { error: '#ef4444', info: '#6366f1', success: '#10b981' }
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: 28 }}>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>Denial Recovery — Live Log</div>
      <div style={{ position: 'relative', paddingLeft: 24 }}>
        <div style={{ position: 'absolute', left: 7, top: 6, bottom: 6, width: 1, background: 'var(--border)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {events.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}
            >
              <div style={{ position: 'absolute', left: 3, width: 9, height: 9, borderRadius: '50%', background: colors[e.type], marginTop: 4, boxShadow: `0 0 8px ${colors[e.type]}` }} />
              <div style={{ marginLeft: 4 }}>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', marginRight: 10 }}>{e.time}</span>
                <span style={{ fontSize: 13, color: e.type === 'success' ? '#10b981' : 'rgba(255,255,255,0.65)' }}>{e.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
