import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Icons, Eyebrow, Reveal } from './_shared'

const CARDS = [
  {
    icon: Icons.building, c: '#8b93ff',
    old: 'Legacy RCM was built for hospital networks.',
    title: 'Relio is built for independents.',
    body: 'No bloated enterprise suite, no per-seat licenses, no features you’ll never touch. A lean AI partner shaped for solo and small-group practices.',
    stat: '2 wks', statLabel: 'to go live',
  },
  {
    icon: Icons.users, c: '#22d3ee',
    old: 'A good biller costs $55k/yr — if you can hire one.',
    title: 'Relio needs zero billing staff.',
    body: 'The AI does the coding, submission, and follow-up. Your front desk stays at the front desk. Your overhead drops the day you switch.',
    stat: '$0', statLabel: 'billing headcount',
  },
  {
    icon: Icons.refresh, c: '#38bdf8',
    old: 'Denials quietly bleed 5–10% of revenue.',
    title: 'Relio appeals every denial.',
    body: 'The moment a claim is denied, an autonomous workflow finds the cause, writes the appeal, and resubmits — recovering dollars most practices write off.',
    stat: '94%', statLabel: 'denials recovered',
  },
  {
    icon: Icons.eye, c: '#34d399',
    old: 'You can’t see where money is stuck.',
    title: 'Relio shows you everything, live.',
    body: 'Collection rate, days-in-AR, denial trends, payer performance — one real-time dashboard, no spreadsheets, no month-end surprises.',
    stat: '+32%', statLabel: 'avg revenue lift',
  },
]

export default function StackedReveal() {
  const reduced = useReducedMotion()
  return (
    <section style={{ position: 'relative', background: 'linear-gradient(180deg,#070d1c,#04070f)', padding: '110px 0 40px' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: 18 }}>
        <Reveal><Eyebrow color="#8b93ff">Why practices switch</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <h2 className="section-title" style={{ marginTop: 16, maxWidth: 760, marginInline: 'auto' }}>
            The billing model is broken.<br /><span className="gradient-text">Relio rebuilt it.</span>
          </h2>
        </Reveal>
      </div>

      <div className="container" style={{ paddingBottom: reduced ? 0 : 80 }}>
        {CARDS.map((c, i) => <StackCard key={i} c={c} i={i} total={CARDS.length} reduced={reduced} />)}
      </div>
    </section>
  )
}

function StackCard({ c, i, total, reduced }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 140px', 'end 140px'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.86])
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.4])
  const Ic = c.icon
  const topBase = 120
  return (
    <div ref={ref} style={{ position: reduced ? 'static' : 'sticky', top: reduced ? 'auto' : topBase + i * 20, marginBottom: 26 }}>
      <motion.div
        style={reduced ? {} : { scale, opacity, transformOrigin: 'center top' }}
        className="glass-2 glass-sheen"
      >
        <div className="stack-inner" style={{ position: 'relative', borderRadius: 26, padding: 'clamp(28px,4vw,52px)', display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 40, alignItems: 'center', overflow: 'hidden' }}>
          <div className="aurora" style={{ width: 360, height: 360, top: -160, right: -120, opacity: 0.16, background: `radial-gradient(circle,${c.c},transparent 65%)` }} />
          <div style={{ position: 'relative' }}>
            <span style={{ width: 54, height: 54, borderRadius: 16, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: c.c, background: `${c.c}22`, border: `1px solid ${c.c}44`, marginBottom: 22 }}><Ic size={27} /></span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#f87171', padding: '3px 8px', borderRadius: 6, background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.28)', flexShrink: 0 }}>Before</span>
              <span style={{ fontSize: 14, color: 'var(--ink-45)', textDecoration: 'line-through', textDecorationColor: 'rgba(239,68,68,0.6)' }}>{c.old}</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px,3.2vw,38px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>{c.title}</h3>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink-60)', maxWidth: 520 }}>{c.body}</p>
          </div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(54px,7vw,84px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, background: `linear-gradient(135deg,#fff,${c.c})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{c.stat}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-45)', marginTop: 8 }}>{c.statLabel}</div>
          </div>
        </div>
      </motion.div>
      <style>{`@media (max-width:760px){ .stack-inner{ grid-template-columns:1fr !important; gap:24px !important; } }`}</style>
    </div>
  )
}
