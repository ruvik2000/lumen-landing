import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} style={{ padding: '120px 0', background: 'var(--bg)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'center' }}>
          {/* Left — statement */}
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--indigo-pale)', marginBottom: 20 }}>
              Why Lumen
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', color: '#fff', marginBottom: 24 }}>
              The billing system wasn't<br />built for independent doctors.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: 'rgba(255,255,255,0.55)', marginBottom: 20 }}>
              Legacy RCM vendors were designed for hospital networks with dedicated billing departments.
              Independent practices end up using the same bloated tools — and paying for features they'll never need.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: 'rgba(255,255,255,0.55)' }}>
              Lumen is purpose-built for solo and small-group practices. Our AI reads your clinical notes,
              generates precise codes, submits clean claims, and fights every denial — so you never have to.
            </p>

            <div style={{ display: 'flex', gap: 12, marginTop: 40, flexWrap: 'wrap' }}>
              {['No billing staff required', 'No long-term contracts', 'Live in under 2 weeks'].map(tag => (
                <span
                  key={tag}
                  style={{
                    fontSize: 13, fontWeight: 600, padding: '6px 14px',
                    background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)',
                    borderRadius: 20, color: 'var(--indigo-pale)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — testimonial card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ delay: 0.15 }}
          >
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 20,
              padding: 40,
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Glow */}
              <div style={{
                position: 'absolute', top: -60, right: -60,
                width: 200, height: 200,
                background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
              }} />

              <div style={{ fontSize: 48, color: 'var(--indigo-pale)', lineHeight: 1, marginBottom: 20, opacity: 0.6 }}>"</div>
              <p style={{ fontSize: 18, lineHeight: 1.75, color: 'rgba(255,255,255,0.82)', fontStyle: 'italic', marginBottom: 32 }}>
                I used to spend three evenings a week reviewing billing reports.
                Lumen handles everything — coding, submissions, follow-ups. My collections
                went up 28% in the first quarter and I haven't touched a claim since.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--indigo-mid), var(--sky))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, fontWeight: 700, color: '#fff',
                }}>
                  SR
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Dr. Simone R.</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Internal Medicine, Solo Practice — Chicago, IL</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
