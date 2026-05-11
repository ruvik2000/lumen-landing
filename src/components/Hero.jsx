import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'

// ── Animation variants ──────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1]

const wordStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } },
}

const wordVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

// ── Tabs ────────────────────────────────────────────────────────
const TABS = ['Coding', 'Claims', 'Billing']

function CodingPanel() {
  return (
    <div style={{ padding: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Encounter · Emily R.</span>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Est. patient · 38m ago</span>
      </div>
      <div style={{ background: '#1a2236', borderRadius: 8, padding: 14, marginBottom: 14, fontSize: 12.5, color: 'rgba(255,255,255,0.62)', lineHeight: 1.65, borderLeft: '3px solid rgba(99,102,241,0.55)' }}>
        Chronic low back pain radiating to right hip. Exam: tenderness at L3–L4. Administered methylprednisolone 40mg IM injection.
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}>Analyzing</span>
        <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }} animate={{ width: '100%' }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
            style={{ height: '100%', background: 'linear-gradient(90deg, #6366f1, #38bdf8)', borderRadius: 2 }}
          />
        </div>
        <span style={{ fontSize: 10, color: '#a5b4fc' }}>100%</span>
      </div>
      {[
        { code: 'M54.50', label: 'Low back pain, unspecified', sub: 'Primary diagnosis', conf: '97%' },
        { code: '99213', label: 'Office visit, established', sub: 'E&M service code', conf: '95%' },
        { code: '96372', label: 'Therapeutic injection, IM', sub: 'Procedure code', conf: '92%' },
      ].map(item => (
        <motion.div
          key={item.code}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: 11, background: 'rgba(255,255,255,0.035)', borderRadius: 8, marginBottom: 7, border: '1px solid rgba(255,255,255,0.055)' }}
        >
          <div style={{ background: 'rgba(99,102,241,0.22)', color: '#a5b4fc', fontSize: 10, fontWeight: 700, padding: '3px 7px', borderRadius: 4, whiteSpace: 'nowrap', fontFamily: 'monospace', marginTop: 2 }}>
            {item.code}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: 'rgba(255,255,255,0.88)' }}>{item.label}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.32)', marginTop: 1 }}>{item.sub}</div>
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--emerald)', flexShrink: 0, marginTop: 2 }}>{item.conf}</div>
        </motion.div>
      ))}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14 }}>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', flex: 1 }}>Awaiting Dr. Chen</span>
        <button style={{ padding: '6px 14px', borderRadius: 6, fontSize: 11, fontWeight: 700, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.55)', cursor: 'pointer', border: 'none' }}>Edit</button>
        <button style={{ padding: '6px 14px', borderRadius: 6, fontSize: 11, fontWeight: 700, background: 'var(--emerald)', color: '#fff', cursor: 'pointer', border: 'none' }}>Approve</button>
      </div>
    </div>
  )
}

function ClaimsPanel() {
  const events = [
    { dot: 'rgba(99,102,241,0.3)', dotTxt: '#a5b4fc', icon: '✓', label: 'Submitted', labelColor: '#fff', detail: 'Feb 14 · 837P via clearinghouse' },
    { dot: 'rgba(239,68,68,0.2)', dotTxt: '#fca5a5', icon: '✗', label: 'Denied · CO-4', labelColor: '#fca5a5', detail: 'Feb 20 · Inadequate documentation' },
    { dot: 'rgba(245,158,11,0.2)', dotTxt: '#fcd34d', icon: '↩', label: 'Appeal Filed', labelColor: '#fcd34d', detail: 'Feb 21 · auto · clinical records attached' },
    { dot: 'rgba(16,185,129,0.2)', dotTxt: '#6ee7b7', icon: '$', label: 'Paid · $287.00', labelColor: '#6ee7b7', detail: 'Mar 08 · 835 remit received' },
  ]
  return (
    <div style={{ padding: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Claim #84321</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', marginTop: 2 }}>BlueCross BlueShield · Emily R.</div>
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>$287.00</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {events.map((ev, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4, ease: EASE }}
            style={{ display: 'flex', gap: 14, position: 'relative' }}
          >
            {i < events.length - 1 && (
              <div style={{ position: 'absolute', left: 8, top: 20, bottom: -14, width: 1, background: 'rgba(255,255,255,0.07)' }} />
            )}
            <div style={{ width: 18, height: 18, borderRadius: '50%', background: ev.dot, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: ev.dotTxt, flexShrink: 0, marginTop: 2 }}>
              {ev.icon}
            </div>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: ev.labelColor }}>{ev.label}</div>
              <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{ev.detail}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.18)', borderRadius: 8, marginTop: 14 }}>
        <div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Resolution time</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--emerald)', marginTop: 3 }}>22 days</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Outcome</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--emerald)', marginTop: 3 }}>Fully recovered</div>
        </div>
      </div>
    </div>
  )
}

function BillingPanel() {
  const patients = [
    { initials: 'ER', bg: 'rgba(99,102,241,0.2)', col: '#a5b4fc', name: 'Emily R.', ch: 'SMS · 3 days ago', amt: '$156.00', status: 'Paid', sBg: 'rgba(16,185,129,0.14)', sCol: '#6ee7b7' },
    { initials: 'MT', bg: 'rgba(245,158,11,0.15)', col: '#fcd34d', name: 'Marcus T.', ch: 'Email · 5 days ago', amt: '$94.00', status: 'Viewed', sBg: 'rgba(99,102,241,0.14)', sCol: '#a5b4fc' },
    { initials: 'PK', bg: 'rgba(16,185,129,0.15)', col: '#6ee7b7', name: 'Priya K.', ch: 'SMS · today', amt: '$245.50', status: 'Sent', sBg: 'rgba(255,255,255,0.07)', sCol: 'rgba(255,255,255,0.45)' },
    { initials: 'LW', bg: 'rgba(239,68,68,0.1)', col: '#fca5a5', name: 'Leon W.', ch: 'Email · 1 day ago', amt: '$117.00', status: 'Paid', sBg: 'rgba(16,185,129,0.14)', sCol: '#6ee7b7' },
  ]
  return (
    <div style={{ padding: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>Patient Statements</div>
          <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.32)', marginTop: 2 }}>This week · 4 sent · $612.50 collected</div>
        </div>
        <div style={{ fontSize: 9, fontWeight: 800, padding: '4px 10px', background: 'rgba(16,185,129,0.14)', color: '#6ee7b7', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Auto</div>
      </div>
      {patients.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4, ease: EASE }}
          style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 0', borderBottom: i < patients.length - 1 ? '1px solid rgba(255,255,255,0.045)' : 'none' }}
        >
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: p.col, flexShrink: 0 }}>{p.initials}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>{p.name}</div>
            <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.32)' }}>{p.ch}</div>
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: '#fff' }}>{p.amt}</div>
          <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '3px 8px', background: p.sBg, color: p.sCol, borderRadius: 4 }}>{p.status}</div>
        </motion.div>
      ))}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 7, marginTop: 10 }}>
        <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.32)' }}>Next follow-up · Wed 10:00 AM</span>
        <a href="#" style={{ fontSize: 10.5, fontWeight: 700, color: '#a5b4fc' }}>View all →</a>
      </div>
    </div>
  )
}

// ── EMR Marquee ─────────────────────────────────────────────────
const EMRS = ['Athenahealth', 'eClinicalWorks', 'NextGen', 'AdvancedMD', 'DrChrono', 'Elation Health', 'Greenway Health', 'Practice Fusion', 'Office Ally']

function EmrMarquee() {
  const doubled = [...EMRS, ...EMRS]
  return (
    <div style={{ overflow: 'hidden', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
      <motion.div
        animate={{ x: [0, -50 * EMRS.length] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: 0, whiteSpace: 'nowrap' }}
      >
        {doubled.map((emr, i) => (
          <span key={i} style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.28)', padding: '0 24px', whiteSpace: 'nowrap' }}>
            {emr}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ── Hero ─────────────────────────────────────────────────────────
const TITLE_LINES = [
  ['The', 'billing'],
  ['partner', 'your'],
  ['practice', 'wants.'],
]

export default function Hero() {
  const [activeTab, setActiveTab] = useState(0)

  // Mouse parallax — spring physics, only animates x/y (compositor safe, opacity never changes)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const cfg  = { stiffness: 22, damping: 22, mass: 2 }
  const mx   = useSpring(rawX, cfg)
  const my   = useSpring(rawY, cfg)
  const p1x  = useTransform(mx, v => v)
  const p1y  = useTransform(my, v => v)
  const p2x  = useTransform(mx, v => -v * 0.7)
  const p2y  = useTransform(my, v => -v * 0.55)
  const p3x  = useTransform(mx, v => v * 0.45)
  const p3y  = useTransform(my, v => v * 0.38)

  useEffect(() => {
    const move = e => {
      rawX.set((e.clientX / window.innerWidth  - 0.5) * 95)
      rawY.set((e.clientY / window.innerHeight - 0.5) * 75)
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [rawX, rawY])

  // Auto-cycle tabs
  useEffect(() => {
    const timer = setInterval(() => setActiveTab(t => (t + 1) % TABS.length), 5000)
    return () => clearInterval(timer)
  }, [])

  const panels = [<CodingPanel key="c" />, <ClaimsPanel key="cl" />, <BillingPanel key="b" />]
  const allWords = TITLE_LINES.flat()

  return (
    <section style={{ background: 'linear-gradient(140deg, #020711 0%, #060c1c 55%, #0c0722 100%)', minHeight: '100vh', paddingTop: 64, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

      {/* ─── CSS keyframes: transform-only, opacity never hits 0 ─── */}
      <style>{`
        @keyframes lumenOrb1 {
          0%,100% { transform: scale(1)    translate(0px,    0px); }
          25%     { transform: scale(1.22) translate(38px,  -30px); }
          55%     { transform: scale(0.87) translate(-14px,  25px); }
          80%     { transform: scale(1.16) translate(24px,   16px); }
        }
        @keyframes lumenOrb2 {
          0%,100% { transform: scale(1.04) translate(0px,    0px); }
          30%     { transform: scale(0.82) translate(-32px,  28px); }
          65%     { transform: scale(1.24) translate(20px,  -20px); }
        }
        @keyframes lumenOrb3 {
          0%,100% { transform: scale(1)    translate(0px,    0px); }
          42%     { transform: scale(1.3)  translate(24px,   35px); }
          74%     { transform: scale(0.84) translate(-12px, -16px); }
        }
        @keyframes lumenOrb4 {
          0%,100% { transform: scale(1)    translate(0px,    0px); }
          48%     { transform: scale(1.4)  translate(-26px, -22px); }
        }
        @keyframes lumenAurora {
          0%,100% { transform: translateY(0px)   scaleX(1);   }
          50%     { transform: translateY(-50px) scaleX(1.12); }
        }
        @keyframes lumenDotPulse {
          0%,100% { opacity: 0.22; }
          50%     { opacity: 0.40; }
        }
        @keyframes lumenRingCW  { to { transform: rotate( 360deg); } }
        @keyframes lumenRingCCW { to { transform: rotate(-360deg); } }
      `}</style>

      {/* Layer 1 — dot grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 40%, black 25%, transparent 100%)',
        maskImage: 'radial-gradient(ellipse 90% 80% at 50% 40%, black 25%, transparent 100%)',
        animation: 'lumenDotPulse 9s ease-in-out infinite',
      }} />

      {/* Layer 2 — rotating rings */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 700, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '1px solid rgba(99,102,241,0.08)', animation: 'lumenRingCW 80s linear infinite', willChange: 'transform' }} />
      </div>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 460, height: 460, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '1px solid rgba(56,189,248,0.07)', animation: 'lumenRingCCW 55s linear infinite', willChange: 'transform' }} />
      </div>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 260, height: 260, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '1px solid rgba(168,85,247,0.06)', animation: 'lumenRingCW 35s linear infinite', willChange: 'transform' }} />
      </div>

      {/* Layer 3 — CSS background orbs */}
      <div style={{ position: 'absolute', top: '-15%', left: '22%', width: '68%', height: '78%', background: 'radial-gradient(circle, rgba(99,102,241,0.55) 0%, transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0, opacity: 0.18, willChange: 'transform', animation: 'lumenOrb1 9s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '-2%', right: '-8%',  width: '48%', height: '62%', background: 'radial-gradient(circle, rgba(56,189,248,0.45) 0%, transparent 70%)',  filter: 'blur(90px)',  pointerEvents: 'none', zIndex: 0, opacity: 0.14, willChange: 'transform', animation: 'lumenOrb2 11s ease-in-out infinite 2s' }} />
      <div style={{ position: 'absolute', top: '32%',  left: '-12%',    width: '40%', height: '58%', background: 'radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)',  filter: 'blur(80px)',  pointerEvents: 'none', zIndex: 0, opacity: 0.12, willChange: 'transform', animation: 'lumenOrb3 13s ease-in-out infinite 5s' }} />
      <div style={{ position: 'absolute', top: '52%',  left: '48%',     width: '36%', height: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.35) 0%, transparent 70%)', filter: 'blur(72px)',  pointerEvents: 'none', zIndex: 0, opacity: 0.10, willChange: 'transform', animation: 'lumenOrb4 15s ease-in-out infinite 1s' }} />

      {/* Layer 4 — Framer Motion mouse-parallax orbs */}
      <motion.div style={{ x: p1x, y: p1y, position: 'absolute', top: '5%',  left: '30%', width: '55%', height: '65%', background: 'radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)', filter: 'blur(90px)', opacity: 0.16, pointerEvents: 'none', zIndex: 0 }} />
      <motion.div style={{ x: p2x, y: p2y, position: 'absolute', top: '38%', right: '-4%', width: '44%', height: '52%', background: 'radial-gradient(circle, rgba(56,189,248,0.45) 0%, transparent 70%)',  filter: 'blur(85px)', opacity: 0.12, pointerEvents: 'none', zIndex: 0 }} />
      <motion.div style={{ x: p3x, y: p3y, position: 'absolute', top: '15%', left: '-6%', width: '36%', height: '46%', background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)', filter: 'blur(75px)', opacity: 0.10, pointerEvents: 'none', zIndex: 0 }} />

      {/* Layer 5.5 — Framer Motion light beam sweeps
          Key: opacity floor is 0.001 (never 0) so the GPU compositing layer
          is pre-created at mount and never torn down → no white flash.
          No filter:blur on these elements; gradient stops encode softness. */}
      <motion.div
        initial={{ opacity: 0.001, x: '-15%' }}
        animate={{ opacity: [0.001, 0.13, 0.001], x: ['-15%', '122%'] }}
        transition={{ duration: 7, ease: [0.25, 0.1, 0.25, 1], repeat: Infinity, repeatDelay: 10 }}
        style={{
          position: 'absolute', top: '-5%', left: 0, width: '24%', height: '110%',
          background: 'linear-gradient(105deg, transparent 0%, transparent 20%, rgba(99,102,241,0) 30%, rgba(99,102,241,0.08) 42%, rgba(129,140,248,0.17) 50%, rgba(99,102,241,0.08) 58%, rgba(99,102,241,0) 70%, transparent 80%, transparent 100%)',
          skewX: -12, pointerEvents: 'none', zIndex: 0, willChange: 'opacity, transform',
        }}
      />
      <motion.div
        initial={{ opacity: 0.001, x: '-15%' }}
        animate={{ opacity: [0.001, 0.08, 0.001], x: ['-15%', '122%'] }}
        transition={{ duration: 9, ease: [0.25, 0.1, 0.25, 1], repeat: Infinity, repeatDelay: 7, delay: 5 }}
        style={{
          position: 'absolute', top: '12%', left: 0, width: '15%', height: '76%',
          background: 'linear-gradient(105deg, transparent 0%, transparent 20%, rgba(56,189,248,0) 30%, rgba(56,189,248,0.07) 42%, rgba(56,189,248,0.13) 50%, rgba(56,189,248,0.07) 58%, rgba(56,189,248,0) 70%, transparent 80%, transparent 100%)',
          skewX: -12, pointerEvents: 'none', zIndex: 0, willChange: 'opacity, transform',
        }}
      />

      {/* Layer 5 — aurora ribbon */}
      <div style={{ position: 'absolute', top: '18%', left: '-30%', right: '-30%', height: '58%', background: 'linear-gradient(105deg, rgba(99,102,241,0.14) 0%, rgba(56,189,248,0.1) 28%, rgba(124,58,237,0.16) 55%, rgba(56,189,248,0.09) 78%, rgba(99,102,241,0.12) 100%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0, opacity: 0.45, willChange: 'transform', animation: 'lumenAurora 18s ease-in-out infinite' }} />

      {/* Layer 7 — edge vignette */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 115% 105% at 50% 50%, transparent 42%, rgba(5,9,27,0.8) 100%)' }} />

      <div className="container" style={{ paddingTop: 80, paddingBottom: 60, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center', position: 'relative', zIndex: 1, flex: 1 }}>

        {/* Left: Text */}
        <div style={{ minWidth: 0 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.35)', borderRadius: 100, fontSize: 11, fontWeight: 700, color: '#a5b4fc', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 28, backdropFilter: 'blur(8px)' }}
          >
            {/* Pulsing live dot — tiny element, no blur filter → flash-free at opacity 0 */}
            <span style={{ position: 'relative', width: 8, height: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <motion.span
                animate={{ scale: [1, 2.6], opacity: [0.6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#6ee7b7' }}
              />
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6ee7b7', position: 'relative', flexShrink: 0 }} />
            </span>
            AI-Native Medical Billing
          </motion.div>

          {/* Animated word-by-word title */}
          <motion.h1
            variants={wordStagger}
            initial="hidden"
            animate="visible"
            style={{ fontSize: 'clamp(34px, 3.8vw, 54px)', fontWeight: 900, letterSpacing: '-1.5px', lineHeight: 1.1, color: '#fff', marginBottom: 22 }}
          >
            {allWords.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariant}
                style={{ display: 'inline-block', marginRight: '0.28em' }}
              >
                {word === 'billing' || word === 'partner' ? (
                  <span className="gradient-text">{word}</span>
                ) : word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6, ease: EASE }}
            style={{ fontSize: 17, lineHeight: 1.78, color: 'rgba(255,255,255,0.55)', marginBottom: 40 }}
          >
            Lumen manages coding, claims, and appeals from start to finish. You focus on patients — we handle the billing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6, ease: EASE }}
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.04, boxShadow: '0 12px 32px rgba(99,102,241,0.5)' }}
              whileTap={{ scale: 0.97 }}
              style={{ background: 'var(--indigo-light)', color: '#fff', fontSize: 15, fontWeight: 700, padding: '14px 32px', borderRadius: 10, display: 'inline-block', letterSpacing: '-0.2px' }}
            >
              Explore the portal
            </motion.a>
            <motion.a
              href="#cta"
              whileHover={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.5)' }}
              whileTap={{ scale: 0.97 }}
              style={{ background: 'transparent', color: '#fff', fontSize: 15, fontWeight: 600, padding: '14px 32px', borderRadius: 10, display: 'inline-block', border: '1.5px solid rgba(255,255,255,0.25)', transition: 'background 0.2s, border-color 0.2s' }}
            >
              Talk with us
            </motion.a>
          </motion.div>

          {/* EHR marquee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            style={{ marginTop: 56 }}
          >
            <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
              EHRs we integrate with
            </div>
            <EmrMarquee />
          </motion.div>
        </div>

        {/* Right: Product Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
        >
          {/* Tab buttons */}
          <div style={{ display: 'flex', gap: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: 4, marginBottom: 10, width: 'fit-content' }}>
            {TABS.map((tab, i) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(i)}
                animate={{ background: activeTab === i ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0)', color: activeTab === i ? '#fff' : 'rgba(255,255,255,0.38)' }}
                whileHover={{ color: 'rgba(255,255,255,0.75)' }}
                transition={{ duration: 0.2 }}
                style={{ padding: '7px 18px', borderRadius: 7, fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer' }}
              >
                {tab}
              </motion.button>
            ))}
          </div>

          {/* Window */}
          <div style={{ background: '#0d1628', border: '1px solid rgba(99,102,241,0.18)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 0 0 1px rgba(99,102,241,0.12), 0 24px 64px rgba(0,0,0,0.6), 0 0 80px rgba(99,102,241,0.14)', minHeight: 380, position: 'relative' }}>
            {/* Top glow line */}
            <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(129,140,248,0.6), transparent)', pointerEvents: 'none', zIndex: 2 }} />
            {/* Title bar */}
            <div style={{ background: '#1a2236', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 7, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
              <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.28)' }}>Lumen — Revenue Portal</span>
            </div>

            {/* Panel with AnimatePresence */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                {panels[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Stats bar at bottom of hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.7, ease: EASE }}
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px 0', position: 'relative', zIndex: 1 }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: 60, flexWrap: 'wrap' }}>
          {[
            { value: '50,000+', label: 'Claims processed' },
            { value: '98.7%', label: 'First-pass acceptance' },
            { value: '< 2 weeks', label: 'To go live' },
            { value: '500+', label: 'Payers supported' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', marginTop: 4, fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
