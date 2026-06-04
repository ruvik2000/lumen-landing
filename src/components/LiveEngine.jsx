import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import { Icons, Eyebrow, Reveal, EASE } from './_shared'

/* The pipeline a claim travels through */
const STAGES = [
  { key: 'parse',  label: 'Parse note',   icon: Icons.scan,   c: '#8b93ff' },
  { key: 'code',   label: 'Assign codes', icon: Icons.brain,  c: '#22d3ee' },
  { key: 'scrub',  label: 'Scrub',        icon: Icons.shield, c: '#38bdf8' },
  { key: 'submit', label: 'Submit',       icon: Icons.send,   c: '#818cf8' },
  { key: 'paid',   label: 'Reconcile',    icon: Icons.dollar, c: '#34d399' },
]

/* Streaming event log entries (looped) */
const FEED = [
  { t: 'Parsed encounter note · Dr. Chen', tag: 'AI', c: '#8b93ff' },
  { t: 'Codes: 99214, E11.9, I10 · 98% conf', tag: 'CODE', c: '#22d3ee' },
  { t: 'Passed 2,700-rule scrub', tag: 'SCRUB', c: '#38bdf8' },
  { t: 'Submitted to Aetna · clean', tag: 'EDI', c: '#818cf8' },
  { t: 'ERA received · $218.00 posted', tag: 'PAID', c: '#34d399' },
  { t: 'Denial CO-4 auto-appealed · Cigna', tag: 'APPEAL', c: '#fbbf24' },
  { t: 'Appeal approved · $124.00 recovered', tag: 'WON', c: '#34d399' },
]

export default function LiveEngine() {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-20%' })

  const [active, setActive] = useState(0)
  const [log, setLog] = useState([0, 1, 2])
  const [collected, setCollected] = useState(48210)

  useEffect(() => {
    if (reduced || !inView) return
    const stageTimer = setInterval(() => setActive(a => (a + 1) % STAGES.length), 1100)
    const feedTimer = setInterval(() => {
      setLog(prev => {
        const next = (prev[prev.length - 1] + 1) % FEED.length
        return [...prev.slice(-4), next]
      })
      setCollected(c => c + Math.floor(80 + Math.random() * 360))
    }, 1700)
    return () => { clearInterval(stageTimer); clearInterval(feedTimer) }
  }, [reduced, inView])

  return (
    <section ref={ref} style={{ position: 'relative', padding: '120px 0', background: 'linear-gradient(180deg,#04070f,#060b18 50%,#04070f)', overflow: 'hidden' }}>
      <div className="aurora" style={{ width: 700, height: 700, top: -120, right: -200, opacity: 0.22, background: 'radial-gradient(circle,#4f46e5,transparent 65%)' }} />

      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.85fr) minmax(0,1.15fr)', gap: 64, alignItems: 'center' }} className="engine-grid">
          {/* Copy */}
          <div>
            <Reveal><Eyebrow color="#22d3ee">Live engine</Eyebrow></Reveal>
            <Reveal delay={0.05}>
              <h2 className="section-title" style={{ margin: '18px 0 20px' }}>
                Your revenue cycle,<br /><span className="gradient-text">running itself.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--ink-60)', maxWidth: 440, marginBottom: 30 }}>
                Every encounter you close kicks off an autonomous pipeline. Relio codes it,
                scrubs it against payer rules, submits it, and chases the dollar — while you sleep.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { icon: Icons.clock, t: 'Median note-to-submission', v: 'under 3 sec' },
                  { icon: Icons.check, t: 'First-pass acceptance', v: '98.7%' },
                  { icon: Icons.refresh, t: 'Denials auto-appealed', v: 'zero touch' },
                ].map((r, i) => {
                  const Ic = r.icon
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <span style={{ width: 38, height: 38, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b93ff', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.28)', flexShrink: 0 }}><Ic size={19} /></span>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>{r.v}</span>
                        <span style={{ fontSize: 14, color: 'var(--ink-45)' }}>{r.t}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Reveal>
          </div>

          {/* App window */}
          <Reveal delay={0.1} y={40}>
            <div className="glass-2 glass-sheen" style={{ position: 'relative', borderRadius: 22, padding: 0, overflow: 'hidden' }}>
              {/* Title bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)' }}>
                <div style={{ display: 'flex', gap: 7 }}>
                  {['#ff5f57', '#febc2e', '#28c840'].map(c => <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c, opacity: 0.85 }} />)}
                </div>
                <span className="mono" style={{ fontSize: 12, color: 'var(--ink-45)', marginLeft: 6 }}>relio.app / revenue-cycle</span>
                <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600, color: '#34d399', padding: '3px 9px', borderRadius: 20, background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399' }} /> Live
                </span>
              </div>

              {/* Pipeline */}
              <div style={{ padding: '26px 22px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 22, left: 22, right: 22, height: 2, background: 'var(--glass-border)' }} />
                  <motion.div style={{ position: 'absolute', top: 22, left: 22, height: 2, background: 'linear-gradient(90deg,#6366f1,#34d399)', borderRadius: 2 }}
                    animate={{ width: `calc(${(active / (STAGES.length - 1)) * 100}% - ${(active / (STAGES.length - 1)) * 44}px)` }}
                    transition={{ duration: 0.6, ease: EASE }} />
                  {STAGES.map((s, i) => {
                    const Ic = s.icon
                    const on = i <= active
                    return (
                      <div key={s.key} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flex: 1 }}>
                        <motion.div
                          animate={{ scale: i === active ? 1.12 : 1, borderColor: on ? s.c : 'var(--glass-border)', background: on ? `${s.c}26` : 'rgba(255,255,255,0.03)', color: on ? s.c : 'var(--ink-30)' }}
                          transition={{ duration: 0.4 }}
                          style={{ width: 44, height: 44, borderRadius: 13, border: '1px solid', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Ic size={20} />
                          {i === active && <motion.span layoutId="pulse" style={{ position: 'absolute', inset: -4, borderRadius: 16, border: `1.5px solid ${s.c}`, opacity: 0.6 }} />}
                        </motion.div>
                        <span style={{ fontSize: 10.5, fontWeight: 600, color: on ? 'var(--ink-80)' : 'var(--ink-30)', textAlign: 'center' }}>{s.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Body: live feed + counter */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 0, borderTop: '1px solid var(--glass-border)' }} className="engine-body">
                {/* Feed */}
                <div style={{ padding: '18px 20px', borderRight: '1px solid var(--glass-border)' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-30)', marginBottom: 12 }}>Activity feed</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 9, minHeight: 168 }}>
                    <AnimatePresence mode="popLayout" initial={false}>
                      {log.map((idx, i) => {
                        const e = FEED[idx]
                        return (
                          <motion.div key={`${idx}-${i}`} layout
                            initial={{ opacity: 0, x: -14, height: 0 }}
                            animate={{ opacity: i === log.length - 1 ? 1 : 0.45 + i * 0.13, x: 0, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: EASE }}
                            style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                          >
                            <span className="mono" style={{ fontSize: 8.5, fontWeight: 700, color: e.c, padding: '2px 6px', borderRadius: 5, background: `${e.c}1f`, border: `1px solid ${e.c}3a`, minWidth: 48, textAlign: 'center', flexShrink: 0 }}>{e.tag}</span>
                            <span style={{ fontSize: 12.5, color: 'var(--ink-80)' }}>{e.t}</span>
                          </motion.div>
                        )
                      })}
                    </AnimatePresence>
                  </div>
                </div>
                {/* Counter */}
                <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-30)', marginBottom: 10 }}>Collected today</div>
                  <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', fontFamily: 'var(--font-heading)' }}>
                    ${collected.toLocaleString()}
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 8, fontSize: 12, fontWeight: 600, color: '#34d399' }}>
                    <Icons.chart size={13} /> +18.4% vs last month
                  </div>
                  <div style={{ marginTop: 18, display: 'flex', gap: 4, alignItems: 'flex-end', height: 46 }}>
                    {[40, 55, 48, 70, 62, 84, 78, 96].map((h, i) => (
                      <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.5, ease: EASE }}
                        style={{ flex: 1, borderRadius: 3, background: i === 7 ? 'linear-gradient(#34d399,#10b981)' : 'rgba(99,102,241,0.4)' }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .engine-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .engine-body { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
