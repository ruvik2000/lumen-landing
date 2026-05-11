import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const SERVICES = [
  {
    icon: '⚡',
    title: 'AI Coding Engine',
    description:
      'Our model reads your SOAP notes, transcripts, and encounter data to generate ICD-10, CPT, and HCPCS codes — no templates, no human coder required.',
    bullets: ['Reads free-text clinical notes', 'Flags under-coded visits', 'Modifier suggestion & validation'],
    gradient: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)',
    glow: 'rgba(99,102,241,0.25)',
  },
  {
    icon: '✈️',
    title: 'Automated Claims',
    description:
      'Lumen submits clean claims directly to 500+ payers — electronic and paper — with real-time status tracking and instant denial alerts in your dashboard.',
    bullets: ['Same-day submission', '500+ payer EDI connections', 'Real-time ERA/EOB reconciliation'],
    gradient: 'linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)',
    glow: 'rgba(14,165,233,0.2)',
  },
  {
    icon: '🛡️',
    title: 'Denial Recovery',
    description:
      'Every denial triggers an automatic appeal workflow. Our AI identifies the root cause, generates the appeal letter, and escalates to human review when needed.',
    bullets: ['Root-cause classification', 'Auto-generated appeal letters', 'Escalation to certified coders'],
    gradient: 'linear-gradient(135deg, #065f46 0%, #10b981 100%)',
    glow: 'rgba(16,185,129,0.2)',
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const card = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" ref={ref} style={{ padding: '120px 0', background: 'var(--surface)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--indigo-pale)', marginBottom: 16 }}
          >
            What we do
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.07 }}
            style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.15 }}
          >
            End-to-end revenue cycle, <span className="gradient-text">zero overhead</span>
          </motion.h2>
        </div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
        >
          {SERVICES.map(s => (
            <ServiceCard key={s.title} service={s} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ServiceCard({ service: s }) {
  return (
    <motion.div
      variants={card}
      whileHover={{ y: -6, boxShadow: `0 24px 60px ${s.glow}` }}
      style={{
        background: 'var(--bg)',
        border: '1px solid var(--border)',
        borderRadius: 20,
        padding: 40,
        position: 'relative',
        overflow: 'hidden',
        transition: 'box-shadow 0.3s',
        cursor: 'default',
      }}
    >
      {/* Top gradient bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: s.gradient, borderRadius: '20px 20px 0 0' }} />

      {/* Icon */}
      <div style={{
        width: 52, height: 52, borderRadius: 14,
        background: s.gradient,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 24, marginBottom: 24,
        boxShadow: `0 8px 24px ${s.glow}`,
      }}>
        {s.icon}
      </div>

      <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 12 }}>{s.title}</h3>
      <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(255,255,255,0.52)', marginBottom: 24 }}>{s.description}</p>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {s.bullets.map(b => (
          <li key={b} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'rgba(255,255,255,0.62)' }}>
            <span style={{ width: 18, height: 18, borderRadius: '50%', background: s.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 10, color: '#fff', fontWeight: 700 }}>✓</span>
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
