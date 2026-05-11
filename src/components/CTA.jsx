import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function CTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="cta" ref={ref} style={{ padding: '120px 0', background: 'var(--surface)', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 600, height: 400,
        background: 'radial-gradient(ellipse, rgba(99,102,241,0.18) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', textAlign: 'center', maxWidth: 680 }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--indigo-pale)', marginBottom: 20 }}>
            Get started
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.1, marginBottom: 20 }}>
            Ready to stop leaving<br />
            <span className="gradient-text">money on the table?</span>
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.75, color: 'rgba(255,255,255,0.5)', marginBottom: 48, maxWidth: 520, margin: '0 auto 48px' }}>
            Talk with a Lumen billing specialist. We'll audit your current collection rate — free — and show you exactly what you're missing.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.a
              href="#"
              whileHover={{ scale: 1.04, boxShadow: '0 16px 48px rgba(99,102,241,0.5)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'linear-gradient(135deg, var(--indigo-mid), var(--indigo-light))',
                color: '#fff', fontSize: 16, fontWeight: 700,
                padding: '16px 36px', borderRadius: 12,
                display: 'inline-block', boxShadow: '0 8px 32px rgba(99,102,241,0.3)',
              }}
            >
              Book a free audit
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}
              style={{
                color: 'rgba(255,255,255,0.6)', fontSize: 16, fontWeight: 600,
                padding: '16px 32px', borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.15)',
                display: 'inline-block', transition: 'border-color 0.2s, color 0.2s',
              }}
            >
              See a live demo
            </motion.a>
          </div>

          <p style={{ marginTop: 32, fontSize: 13, color: 'rgba(255,255,255,0.25)' }}>
            No commitment. No credit card. Results in your first week.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
