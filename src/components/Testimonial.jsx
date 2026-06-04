import { motion } from 'framer-motion'
import { Icons, Eyebrow, Reveal } from './_shared'

const FEATURED = {
  quote: 'I used to spend three evenings a week reviewing billing reports. Relio handles everything — coding, submissions, follow-ups. My collections went up 28% in the first quarter and I haven’t touched a claim since.',
  name: 'Dr. Simone R.', role: 'Internal Medicine · Solo Practice, Chicago IL', initials: 'SR', c: '#8b93ff',
}

const SMALL = [
  { quote: 'We dropped our biller and our denial rate fell. That math still surprises me.', name: 'Dr. Marcus J.', role: 'Orthopedics, Austin TX', initials: 'MJ', c: '#22d3ee' },
  { quote: 'Go-live took 9 days. By week three we were collecting faster than ever.', name: 'Priya K., PM', role: 'Family Medicine, Seattle WA', initials: 'PK', c: '#34d399' },
  { quote: 'The appeals run themselves. I genuinely forget denials are a thing now.', name: 'Dr. Lena R.', role: 'Psychiatry, Denver CO', initials: 'LR', c: '#fbbf24' },
]

export default function Testimonial() {
  return (
    <section style={{ position: 'relative', padding: '120px 0', background: 'linear-gradient(180deg,#070d1c,#04070f)', overflow: 'hidden' }}>
      <div className="aurora" style={{ width: 560, height: 560, top: -160, right: -120, opacity: 0.16, background: 'radial-gradient(circle,#22d3ee,transparent 65%)' }} />
      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <Reveal><Eyebrow color="#8b93ff">Loved by physicians</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title" style={{ marginTop: 16 }}>
              Practices don’t go back.
            </h2>
          </Reveal>
        </div>

        {/* Featured */}
        <Reveal y={30}>
          <div className="glass-2 glass-sheen" style={{ position: 'relative', borderRadius: 26, padding: 'clamp(32px,5vw,60px)', textAlign: 'center', maxWidth: 880, margin: '0 auto 24px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 24 }}>
              {[...Array(5)].map((_, i) => <Icons.star key={i} size={18} style={{ color: '#fbbf24' }} />)}
            </div>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(20px,2.4vw,30px)', fontWeight: 600, lineHeight: 1.4, letterSpacing: '-0.02em', color: '#fff', marginBottom: 32 }}>
              “{FEATURED.quote}”
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
              <span style={{ width: 50, height: 50, borderRadius: '50%', background: `linear-gradient(135deg,${FEATURED.c},#22d3ee)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff', fontSize: 17 }}>{FEATURED.initials}</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 15.5, fontWeight: 700, color: '#fff' }}>{FEATURED.name}</div>
                <div style={{ fontSize: 13.5, color: 'var(--ink-45)' }}>{FEATURED.role}</div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Small cards */}
        <div className="testi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, maxWidth: 880, margin: '0 auto' }}>
          {SMALL.map((t, i) => (
            <Reveal key={i} delay={i * 0.08} y={24} style={{ display: 'flex' }}>
              <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="glass glass-sheen" style={{ position: 'relative', borderRadius: 18, padding: 26, width: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>{[...Array(5)].map((_, j) => <Icons.star key={j} size={12} style={{ color: '#fbbf24' }} />)}</div>
                <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'var(--ink-80)', marginBottom: 20, flex: 1 }}>“{t.quote}”</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                  <span style={{ width: 36, height: 36, borderRadius: '50%', background: `${t.c}26`, border: `1px solid ${t.c}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: t.c, fontSize: 12 }}>{t.initials}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{t.name}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--ink-45)' }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media (max-width:760px){ .testi-grid{ grid-template-columns:1fr !important; } }`}</style>
    </section>
  )
}
