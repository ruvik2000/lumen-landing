import { lazy, Suspense } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { DottedBackground } from './DottedBackground'
import { Icons, EASE } from './_shared'

const DottedSurface = lazy(() =>
  import('./DottedSurface').then(m => ({ default: m.DottedSurface }))
)

const wordStagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } } }
const wordVariant = {
  hidden: { opacity: 0, y: 34, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } },
}

const LINE1 = ['Medical', 'billing,']
const LINE2 = ['run', 'by', 'AI.']

const AVATARS = [
  { t: 'SC', bg: 'rgba(99,102,241,0.32)', c: '#a5b4fc' },
  { t: 'MJ', bg: 'rgba(16,185,129,0.28)', c: '#6ee7b7' },
  { t: 'PK', bg: 'rgba(34,211,238,0.26)', c: '#7dd3fc' },
  { t: 'LR', bg: 'rgba(245,158,11,0.22)', c: '#fcd34d' },
]

export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <section
      style={{
        position: 'relative', minHeight: '100vh', overflow: 'hidden',
        background: 'radial-gradient(120% 80% at 50% -10%, #0b1226 0%, #050810 55%, #04070f 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        paddingTop: 168, paddingBottom: 80,
      }}
      aria-label="Hero"
    >
      {/* Aurora mesh */}
      <div className="aurora" style={{ width: 720, height: 720, top: -260, left: '50%', marginLeft: -360, opacity: 0.5, background: 'radial-gradient(circle, rgba(79,70,229,0.5) 0%, transparent 65%)', animation: reduced ? 'none' : 'auroraFloat 20s ease-in-out infinite' }} />
      <div className="aurora" style={{ width: 520, height: 520, top: 60, left: -120, opacity: 0.35, background: 'radial-gradient(circle, rgba(34,211,238,0.45) 0%, transparent 65%)', animation: reduced ? 'none' : 'auroraFloat 24s ease-in-out 2s infinite' }} />
      <div className="aurora" style={{ width: 480, height: 480, top: 120, right: -140, opacity: 0.3, background: 'radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 65%)', animation: reduced ? 'none' : 'auroraFloat 22s ease-in-out 1s infinite' }} />

      {/* Dot grid + animated wave */}
      <DottedBackground
        dotColor="rgba(99,102,241,0.18)" backgroundColor="transparent"
        dotSize={1.4} dotSpacing={24} enableVignette enableInnerGlow={false}
        vignetteColor="rgb(4,7,15)"
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      />
      {!reduced && <Suspense fallback={null}><DottedSurface /></Suspense>}

      {/* Bottom fade */}
      <div aria-hidden style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '34%', background: 'linear-gradient(to top, #04070f 6%, transparent 100%)', zIndex: 0, pointerEvents: 'none' }} />

      {/* ── Content ── */}
      <div className="container" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

        {/* Trust badge */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}
          className="glass glass-sheen"
          style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 9, padding: '7px 16px', borderRadius: 100, marginBottom: 30, background: 'rgba(255,255,255,0.05)' }}
        >
          <span style={{ position: 'relative', width: 8, height: 8, display: 'inline-flex' }}>
            <motion.span animate={reduced ? {} : { scale: [1, 2.4], opacity: [0.6, 0] }} transition={{ duration: 1.8, repeat: Infinity }} style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#6ee7b7' }} />
            <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#6ee7b7' }} />
          </span>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--ink-80)', textTransform: 'uppercase' }}>AI-Native Medical Billing</span>
          <span style={{ width: 1, height: 13, background: 'var(--border-strong)' }} />
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 700, color: '#6ee7b7' }}>
            <Icons.shield size={13} /> SOC 2 · HIPAA
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={wordStagger} initial="hidden" animate="visible"
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(46px, 8vw, 104px)', fontWeight: 800, letterSpacing: '-0.045em', lineHeight: 0.98, color: '#fff', marginBottom: 26, maxWidth: 1000 }}
        >
          <span style={{ display: 'block' }}>
            {LINE1.map((w, i) => <motion.span key={i} variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.24em' }}>{w}</motion.span>)}
          </span>
          <span style={{ display: 'block' }}>
            {LINE2.map((w, i) => (
              <motion.span key={i} variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.24em' }}>
                {w === 'AI.' ? <span className="gradient-text">AI.</span> : w}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7, ease: EASE }}
          style={{ fontSize: 'clamp(16px,1.6vw,20px)', lineHeight: 1.7, color: 'var(--ink-60)', maxWidth: 560, marginBottom: 38 }}
        >
          Relio reads your clinical notes, codes every visit, submits clean claims,
          and fights denials — autonomously. The revenue cycle, finally on autopilot.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.84, duration: 0.6, ease: EASE }}
          style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20 }}
        >
          <motion.a href="#cta" whileHover={{ y: -2, boxShadow: '0 22px 56px rgba(99,102,241,0.6)' }} whileTap={{ scale: 0.97 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'linear-gradient(135deg,#6366f1,#4f46e5 55%,#0891b2 130%)', color: '#fff', fontSize: 16, fontWeight: 700, padding: '16px 30px', borderRadius: 13, boxShadow: '0 10px 32px rgba(99,102,241,0.46), inset 0 1px 0 rgba(255,255,255,0.3)', border: '1px solid rgba(139,147,255,0.4)' }}>
            Book a free audit <Icons.arrow size={17} />
          </motion.a>
          <motion.a href="#how" whileHover={{ y: -2, background: 'rgba(255,255,255,0.09)' }} whileTap={{ scale: 0.97 }}
            className="glass"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 9, color: 'var(--ink-80)', fontSize: 16, fontWeight: 600, padding: '16px 26px', borderRadius: 13 }}>
            <Icons.eye size={17} /> See it work
          </motion.a>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.5 }}
          style={{ fontSize: 12.5, color: 'var(--ink-30)', marginBottom: 52 }}>
          No setup fee · No long-term contracts · Live in 10 days
        </motion.p>

        {/* Floating live-claim glass card */}
        <HeroCard reduced={reduced} />

        {/* Social proof */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25, duration: 0.6, ease: EASE }}
          style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 44 }}>
          <div style={{ display: 'flex' }} role="img" aria-label="Customer avatars">
            {AVATARS.map((av, i) => (
              <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', background: av.bg, border: '2.5px solid #060b18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9.5, fontWeight: 800, color: av.c, marginLeft: i === 0 ? 0 : -10, position: 'relative', zIndex: AVATARS.length - i }}>{av.t}</div>
            ))}
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {[...Array(5)].map((_, i) => <Icons.star key={i} size={13} style={{ color: '#fbbf24' }} />)}
              <span style={{ fontSize: 12, color: 'var(--ink-45)', marginLeft: 5 }}>4.9 / 5.0</span>
            </div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink-60)', marginTop: 2 }}>Trusted by 200+ independent practices</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* Floating glass card that shows a claim moving through the pipeline */
function HeroCard({ reduced }) {
  const steps = [
    { icon: Icons.scan, label: 'Note parsed', sub: 'SOAP · 2.1s', c: '#8b93ff' },
    { icon: Icons.brain, label: 'Coded', sub: '99214 · E11.9', c: '#22d3ee' },
    { icon: Icons.send, label: 'Submitted', sub: 'Aetna · clean', c: '#38bdf8' },
    { icon: Icons.dollar, label: 'Paid', sub: '$218.00', c: '#34d399' },
  ]
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 12 }} animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: 1.05, duration: 0.9, ease: EASE }}
      className="glass-2 glass-sheen"
      style={{ position: 'relative', width: 'min(560px, 100%)', borderRadius: 20, padding: 20, perspective: 1000 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, padding: '0 4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ position: 'relative', width: 8, height: 8 }}>
            <motion.span animate={reduced ? {} : { scale: [1, 2.4], opacity: [0.7, 0] }} transition={{ duration: 1.8, repeat: Infinity }} style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#34d399' }} />
            <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#34d399' }} />
          </span>
          <span className="mono" style={{ fontSize: 11.5, color: 'var(--ink-60)', letterSpacing: '0.04em' }}>CLAIM-7742 · LIVE</span>
        </div>
        <span className="mono" style={{ fontSize: 11, color: 'var(--ink-30)' }}>autopilot</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
        {steps.map((s, i) => {
          const Ic = s.icon
          return (
            <motion.div key={i}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + i * 0.18, duration: 0.6, ease: EASE }}
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', borderRadius: 13, padding: '14px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, position: 'relative' }}
            >
              <div style={{ width: 34, height: 34, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.c, background: `${s.c}1f`, border: `1px solid ${s.c}44` }}>
                <Ic size={18} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{s.label}</div>
              <div className="mono" style={{ fontSize: 9.5, color: 'var(--ink-45)' }}>{s.sub}</div>
              {i < 3 && <div style={{ position: 'absolute', right: -7, top: '42%', color: 'var(--ink-30)', zIndex: 2 }}><Icons.arrow size={12} /></div>}
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
