import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

const PAYERS = [
  'UnitedHealth', 'Aetna', 'BCBS', 'Cigna', 'Humana', 'Medicare', 'Medicaid',
  'Anthem', 'Centene', 'Molina', 'Kaiser', 'Oscar Health', 'Ambetter', 'HealthFirst',
  'Tricare', 'WellCare', 'Magellan', 'Optum', 'CVS Aetna', 'Highmark',
  'Carefirst', 'Premera', 'Regence', 'HCSC', 'Independence', 'Geisinger',
]

export default function Payers() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} style={{ padding: '100px 0', background: 'var(--bg)', overflow: 'hidden' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--indigo-pale)', marginBottom: 16 }}>
            Payer network
          </div>
          <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 36px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginBottom: 12 }}>
            Connected to 500+ payers
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', maxWidth: 480, margin: '0 auto' }}>
            From national carriers to regional Medicaid plans — if they accept electronic claims, we're already connected.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}
        >
          {PAYERS.map((p, i) => (
            <motion.span
              key={p}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.025, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ borderColor: 'rgba(99,102,241,0.5)', color: '#fff', background: 'rgba(99,102,241,0.08)' }}
              style={{
                fontSize: 13, fontWeight: 600, padding: '7px 16px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 100,
                color: 'rgba(255,255,255,0.5)',
                transition: 'border-color 0.2s, color 0.2s, background 0.2s',
                cursor: 'default',
              }}
            >
              {p}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, scale: 0.88 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 + PAYERS.length * 0.025 }}
            style={{
              fontSize: 13, fontWeight: 600, padding: '7px 16px',
              background: 'rgba(99,102,241,0.1)',
              border: '1px solid rgba(99,102,241,0.3)',
              borderRadius: 100,
              color: 'var(--indigo-pale)',
            }}
          >
            + 474 more
          </motion.span>
        </motion.div>
      </div>
    </section>
  )
}
