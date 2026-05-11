import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const SPECIALTIES = [
  { icon: '🫀', name: 'Internal Medicine' },
  { icon: '🧠', name: 'Psychiatry & Behavioral Health' },
  { icon: '🦴', name: 'Orthopedics' },
  { icon: '👁️', name: 'Ophthalmology' },
  { icon: '🩺', name: 'Family Medicine' },
  { icon: '👶', name: 'Pediatrics' },
  { icon: '🫁', name: 'Pulmonology' },
  { icon: '🦷', name: 'Dentistry & Oral Surgery' },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

export default function BuiltFor() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section style={{ padding: '100px 0', background: 'var(--surface)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--indigo-pale)', marginBottom: 16 }}>
              Built for
            </div>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.2, marginBottom: 20 }}>
              Across every<br />specialty and size
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>
              Whether you're a single-physician practice or a 20-provider group, Lumen scales
              with you. Our coding models are trained on specialty-specific encounter patterns,
              so your documentation gets coded correctly from day one.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {['Solo practices', 'Group practices (2–20 providers)', 'Concierge & cash-pay', 'Telehealth-first'].map(t => (
                <span key={t} style={{ fontSize: 13, fontWeight: 600, padding: '6px 14px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 20, color: 'var(--indigo-pale)' }}>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            ref={ref}
            variants={container}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}
          >
            {SPECIALTIES.map(s => (
              <motion.div
                key={s.name}
                variants={item}
                whileHover={{ y: -3, borderColor: 'rgba(99,102,241,0.4)', background: 'rgba(99,102,241,0.06)' }}
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 14,
                  padding: '18px 20px',
                  display: 'flex', alignItems: 'center', gap: 12,
                  transition: 'border-color 0.2s, background 0.2s',
                  cursor: 'default',
                }}
              >
                <span style={{ fontSize: 24 }}>{s.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.65)', lineHeight: 1.35 }}>{s.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
