import { useRef, useState, useLayoutEffect } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Icons, Eyebrow } from './_shared'

const PANELS = [
  {
    n: '01', tag: 'Capture', icon: Icons.doc, c: '#8b93ff',
    title: 'You close the note.',
    body: "That's it. Finish your encounter in your EHR the way you always have. The moment you sign off, Relio picks it up — no template mapping, no export, no extra clicks.",
    chips: ['Any EHR', 'SOAP / voice / structured', 'Zero workflow change'],
    visual: <NoteVisual />,
  },
  {
    n: '02', tag: 'Code', icon: Icons.brain, c: '#22d3ee',
    title: 'AI codes every visit.',
    body: 'Our model reads the full clinical context and assigns precise ICD-10, CPT, and HCPCS codes with modifiers — flagging under-coded visits before they cost you money.',
    chips: ['ICD-10 · CPT · HCPCS', 'Modifier detection', 'Under-coding alerts'],
    visual: <CodeVisual />,
  },
  {
    n: '03', tag: 'Submit', icon: Icons.send, c: '#38bdf8',
    title: 'Clean claims, out the door.',
    body: 'Every claim passes a 2,700-rule scrub tuned to each payer, then goes out electronically to 500+ payers — same day, with real-time status tracking.',
    chips: ['2,700-rule scrub', '500+ payers', 'Same-day EDI'],
    visual: <SubmitVisual />,
  },
  {
    n: '04', tag: 'Recover', icon: Icons.refresh, c: '#818cf8',
    title: 'Denials fight back. Automatically.',
    body: 'A denial triggers an autonomous appeal: Relio finds the root cause, drafts the payer-specific letter, and resubmits — escalating to a certified coder only when it truly needs a human.',
    chips: ['Root-cause AI', 'Auto-appeals', '4-hour human SLA'],
    visual: <RecoverVisual />,
  },
  {
    n: '05', tag: 'Get paid', icon: Icons.dollar, c: '#34d399',
    title: 'The dollar lands in your account.',
    body: 'ERAs are matched to deposits automatically and reconciled to the cent. You watch collections climb from a live dashboard — and never touch a claim again.',
    chips: ['Auto ERA matching', 'Deposit reconciliation', 'Live collections'],
    visual: <PaidVisual />,
  },
]

export default function Journey() {
  const reduced = useReducedMotion()
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current) return
      const d = trackRef.current.scrollWidth - window.innerWidth
      setDistance(Math.max(0, d))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])

  return (
    <section id="how" ref={sectionRef} style={{ position: 'relative', height: reduced ? 'auto' : `calc(100vh + ${distance}px)`, background: 'linear-gradient(180deg,#04070f,#070d1c)' }}>
      <div style={{ position: reduced ? 'relative' : 'sticky', top: 0, height: reduced ? 'auto' : '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="aurora" style={{ width: 600, height: 600, top: '-10%', left: '20%', opacity: 0.18, background: 'radial-gradient(circle,#22d3ee,transparent 65%)' }} />

        {/* Header */}
        <div className="container-wide" style={{ position: 'relative', zIndex: 2, marginBottom: 36 }}>
          <Eyebrow color="#34d399">How Relio works</Eyebrow>
          <h2 className="section-title" style={{ marginTop: 16, maxWidth: 620 }}>
            Five steps. <span className="gradient-text">Zero of them yours.</span>
          </h2>
          {!reduced && <p style={{ fontSize: 14, color: 'var(--ink-30)', marginTop: 12 }}>Scroll to follow a claim through the pipeline →</p>}
        </div>

        {/* Horizontal track */}
        <motion.div ref={trackRef} style={{ x: reduced ? 0 : x, display: 'flex', gap: 24, padding: '0 max(32px, calc((100vw - 1340px)/2 + 32px))', flexWrap: reduced ? 'wrap' : 'nowrap', alignItems: 'stretch' }}>
          {PANELS.map((p, i) => <Panel key={p.n} p={p} index={i} progress={scrollYProgress} count={PANELS.length} reduced={reduced} />)}
        </motion.div>

        {/* Progress bar */}
        {!reduced && (
          <div className="container-wide" style={{ position: 'relative', zIndex: 2, marginTop: 34 }}>
            <div style={{ height: 3, borderRadius: 3, background: 'var(--glass-border)', overflow: 'hidden', maxWidth: 260 }}>
              <motion.div style={{ height: '100%', borderRadius: 3, background: 'linear-gradient(90deg,#6366f1,#34d399)', scaleX: scrollYProgress, transformOrigin: 'left' }} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function Panel({ p, reduced }) {
  const Ic = p.icon
  return (
    <motion.div
      whileHover={reduced ? {} : { y: -6 }}
      className="glass-2 glass-sheen"
      style={{ position: 'relative', flex: '0 0 auto', width: 'min(540px, 84vw)', borderRadius: 24, padding: 34, display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
        <span style={{ width: 52, height: 52, borderRadius: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.c, background: `${p.c}22`, border: `1px solid ${p.c}44` }}><Ic size={26} /></span>
        <span className="mono" style={{ fontSize: 44, fontWeight: 700, color: 'rgba(255,255,255,0.06)', letterSpacing: '-0.04em' }}>{p.n}</span>
      </div>
      <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: p.c, marginBottom: 12 }}>{p.tag}</div>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px,2.6vw,32px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.12, marginBottom: 14 }}>{p.title}</h3>
      <p style={{ fontSize: 15.5, lineHeight: 1.75, color: 'var(--ink-60)', marginBottom: 22 }}>{p.body}</p>

      <div style={{ marginTop: 'auto' }}>
        <div style={{ marginBottom: 20 }}>{p.visual}</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {p.chips.map(c => (
            <span key={c} style={{ fontSize: 12, fontWeight: 600, padding: '6px 12px', borderRadius: 100, color: 'var(--ink-80)', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)' }}>{c}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ── Mini visuals ── */
function Shell({ children, label }) {
  return (
    <div style={{ background: 'rgba(0,0,0,0.28)', border: '1px solid var(--glass-border)', borderRadius: 14, padding: 14 }}>
      <div className="mono" style={{ fontSize: 10, color: 'var(--ink-30)', marginBottom: 10 }}>{label}</div>
      {children}
    </div>
  )
}
function NoteVisual() {
  return (
    <Shell label="encounter_0511.txt">
      {['S: 52F here for diabetes f/u, reports...', 'O: BP 138/86, A1c 7.4, foot exam wnl', 'A: T2DM, essential HTN', 'P: continue metformin, recheck 3mo'].map((l, i) => (
        <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
          style={{ fontSize: 11.5, color: 'var(--ink-60)', fontFamily: 'var(--font-mono)', padding: '3px 0' }}>{l}</motion.div>
      ))}
    </Shell>
  )
}
function CodeVisual() {
  const codes = [['99214', 'Office visit · L4', 97], ['E11.9', 'Type 2 diabetes', 96], ['I10', 'Essential HTN', 99]]
  return (
    <Shell label="codes generated">
      {codes.map(([code, desc, conf], i) => (
        <div key={code} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 0' }}>
          <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: '#22d3ee', minWidth: 52 }}>{code}</span>
          <span style={{ fontSize: 12, color: 'var(--ink-60)', flex: 1 }}>{desc}</span>
          <span className="mono" style={{ fontSize: 10.5, color: 'var(--ink-45)' }}>{conf}%</span>
        </div>
      ))}
    </Shell>
  )
}
function SubmitVisual() {
  const rows = [['UnitedHealth', 'clean', '#34d399'], ['Aetna', 'clean', '#34d399'], ['Cigna', 'scrubbing', '#fbbf24']]
  return (
    <Shell label="outbound queue">
      {rows.map(([payer, st, c]) => (
        <div key={payer} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 0' }}>
          <Icons.check size={13} style={{ color: c }} />
          <span style={{ fontSize: 12, color: 'var(--ink-60)', flex: 1 }}>{payer}</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: c, padding: '2px 8px', borderRadius: 20, background: `${c}1f` }}>{st}</span>
        </div>
      ))}
    </Shell>
  )
}
function RecoverVisual() {
  const events = [['09:04', 'Denied CO-4', '#ef4444'], ['09:05', 'Appeal drafted', '#818cf8'], ['09:47', 'Approved · $124', '#34d399']]
  return (
    <Shell label="denial · live">
      {events.map(([t, l, c]) => (
        <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 0' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: c, boxShadow: `0 0 8px ${c}` }} />
          <span className="mono" style={{ fontSize: 10.5, color: 'var(--ink-30)' }}>{t}</span>
          <span style={{ fontSize: 12, color: c === '#34d399' ? '#34d399' : 'var(--ink-60)' }}>{l}</span>
        </div>
      ))}
    </Shell>
  )
}
function PaidVisual() {
  return (
    <Shell label="collections · May">
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 64 }}>
        {[45, 58, 52, 70, 66, 88, 82, 100].map((h, i) => (
          <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }}
            style={{ flex: 1, borderRadius: 3, background: i >= 6 ? 'linear-gradient(#34d399,#10b981)' : 'rgba(99,102,241,0.45)' }} />
        ))}
      </div>
    </Shell>
  )
}
