import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const FEATURES = [
  { icon: '🔒', title: 'HIPAA-certified infrastructure', body: 'All data encrypted at rest (AES-256) and in transit (TLS 1.3). BAA included. SOC 2 Type II audited annually.' },
  { icon: '🔗', title: 'Deep EHR integrations', body: 'Native two-way sync with Epic, Athena, Kareo, eClinicalWorks, and 30+ others. No CSV exports.' },
  { icon: '👨‍⚕️', title: 'Physician oversight portal', body: 'Review AI-generated codes, approve outliers, and track your revenue trends — from any device.' },
  { icon: '💬', title: 'Patient billing & statements', body: 'Branded, plain-language statements sent via email and SMS. Online payment portal included.' },
  { icon: '📊', title: 'Real-time analytics', body: 'Track collection rate, days-in-AR, denial reasons, and payer performance from a live dashboard.' },
  { icon: '🤝', title: 'Dedicated success team', body: 'Every practice gets a named account manager. Response SLA: 2 hours for urgent issues.' },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}

export default function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section style={{ padding: '120px 0', background: 'var(--surface)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--indigo-pale)', marginBottom: 16 }}
          >
            Platform
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.07 }}
            style={{ fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff' }}
          >
            Everything your practice needs. <span className="gradient-text">Nothing it doesn't.</span>
          </motion.h2>
        </div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}
        >
          {FEATURES.map(f => (
            <motion.div
              key={f.title}
              variants={item}
              whileHover={{ y: -4, borderColor: 'rgba(99,102,241,0.4)' }}
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: 32,
                transition: 'border-color 0.25s',
                cursor: 'default',
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{f.title}</h4>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.48)' }}>{f.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
