import { motion } from 'framer-motion'
import { Icons, Eyebrow, Reveal } from './_shared'

const SPECIALTIES = [
  { icon: Icons.heart, name: 'Internal Medicine' },
  { icon: Icons.brain, name: 'Psychiatry & Behavioral' },
  { icon: Icons.bone, name: 'Orthopedics' },
  { icon: Icons.eye, name: 'Ophthalmology' },
  { icon: Icons.pulse, name: 'Family Medicine' },
  { icon: Icons.baby, name: 'Pediatrics' },
  { icon: Icons.lungs, name: 'Pulmonology' },
  { icon: Icons.tooth, name: 'Dental & Oral Surgery' },
]

const PAYERS = ['UnitedHealth', 'Aetna', 'BCBS', 'Cigna', 'Humana', 'Medicare', 'Medicaid', 'Anthem', 'Centene', 'Kaiser', 'Oscar', 'Optum', 'Tricare', 'Highmark', 'Carefirst']

export default function Specialties() {
  const row = [...PAYERS, ...PAYERS]
  return (
    <section style={{ position: 'relative', padding: '110px 0', background: '#070d1c', overflow: 'hidden' }}>
      <div className="container-wide">
        <div className="spec-grid" style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <Reveal><Eyebrow color="#22d3ee">Built for</Eyebrow></Reveal>
            <Reveal delay={0.05}>
              <h2 className="section-title" style={{ margin: '18px 0 20px' }}>
                Every specialty.<br /><span className="gradient-text">Every size.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--ink-60)', maxWidth: 440, marginBottom: 26 }}>
                From a single-physician clinic to a 20-provider group, Relio’s models are trained on
                specialty-specific encounter patterns — so your documentation gets coded correctly from day one.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {['Solo practices', 'Groups (2–20)', 'Concierge & cash-pay', 'Telehealth-first'].map(t => (
                  <span key={t} style={{ fontSize: 13, fontWeight: 600, padding: '7px 14px', borderRadius: 100, color: 'var(--ink-80)', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)' }}>{t}</span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} y={28}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
              {SPECIALTIES.map((s, i) => {
                const Ic = s.icon
                return (
                  <motion.div key={s.name} whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className="glass glass-sheen"
                    style={{ position: 'relative', borderRadius: 15, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 13, cursor: 'default' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--glass-border)'}
                  >
                    <span style={{ width: 38, height: 38, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b93ff', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.26)', flexShrink: 0 }}><Ic size={19} /></span>
                    <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink-80)', lineHeight: 1.3 }}>{s.name}</span>
                  </motion.div>
                )
              })}
            </div>
          </Reveal>
        </div>

        {/* Payer marquee */}
        <div style={{ marginTop: 80 }}>
          <div style={{ textAlign: 'center', fontSize: 11.5, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-30)', marginBottom: 22 }}>
            Connected to 500+ payers
          </div>
          <div style={{ overflow: 'hidden', WebkitMaskImage: 'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)', maskImage: 'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)' }}>
            <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
              style={{ display: 'flex', gap: 12, width: 'max-content' }}>
              {row.map((p, i) => (
                <span key={i} className="glass" style={{ fontSize: 14, fontWeight: 600, padding: '9px 18px', borderRadius: 100, color: 'var(--ink-60)', whiteSpace: 'nowrap' }}>{p}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      <style>{`@media (max-width:820px){ .spec-grid{ grid-template-columns:1fr !important; gap:40px !important; } }`}</style>
    </section>
  )
}
