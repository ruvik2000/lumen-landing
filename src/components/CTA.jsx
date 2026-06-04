import { motion } from 'framer-motion'
import { Icons, Reveal } from './_shared'

export default function CTA() {
  return (
    <section id="cta" style={{ position: 'relative', padding: '130px 0', background: '#04070f', overflow: 'hidden' }}>
      <div className="aurora" style={{ width: 760, height: 560, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.32, background: 'radial-gradient(ellipse,#4f46e5,transparent 60%)' }} />
      <div className="aurora" style={{ width: 420, height: 420, bottom: -120, right: '12%', opacity: 0.2, background: 'radial-gradient(circle,#34d399,transparent 65%)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <Reveal y={32}>
          <div className="glass-2 glass-sheen" style={{ position: 'relative', borderRadius: 30, padding: 'clamp(40px,6vw,80px)', textAlign: 'center', maxWidth: 860, margin: '0 auto', overflow: 'hidden' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 100, background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)', marginBottom: 28 }}>
              <Icons.shield size={14} style={{ color: '#6ee7b7' }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#6ee7b7' }}>SOC 2 Type II · HIPAA certified</span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px,5.2vw,64px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.04, color: '#fff', marginBottom: 22 }}>
              Stop leaving money<br /><span className="gradient-text">on the table.</span>
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: 'var(--ink-60)', maxWidth: 520, margin: '0 auto 38px' }}>
              Get a free audit of your current collection rate. We’ll show you exactly what you’re
              missing — and how fast Relio recovers it.
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.a href="#" whileHover={{ y: -2, boxShadow: '0 22px 56px rgba(99,102,241,0.6)' }} whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'linear-gradient(135deg,#6366f1,#4f46e5 55%,#0891b2 130%)', color: '#fff', fontSize: 16, fontWeight: 700, padding: '16px 32px', borderRadius: 13, boxShadow: '0 10px 32px rgba(99,102,241,0.46), inset 0 1px 0 rgba(255,255,255,0.3)', border: '1px solid rgba(139,147,255,0.4)' }}>
                Book a free audit <Icons.arrow size={17} />
              </motion.a>
              <motion.a href="#" whileHover={{ y: -2, background: 'rgba(255,255,255,0.09)' }} whileTap={{ scale: 0.97 }}
                className="glass" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, color: 'var(--ink-80)', fontSize: 16, fontWeight: 600, padding: '16px 28px', borderRadius: 13 }}>
                <Icons.chat size={17} /> Talk to sales
              </motion.a>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 22, marginTop: 32, flexWrap: 'wrap' }}>
              {['No setup fee', 'No long-term contracts', 'Live in 10 days'].map(t => (
                <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, color: 'var(--ink-45)' }}>
                  <Icons.check size={15} style={{ color: '#34d399' }} /> {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
