import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { Icons, Eyebrow, Reveal } from './_shared'

function Counter({ to, decimals = 0, prefix = '', suffix = '', duration = 1800 }) {
  const [v, setV] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    let raf
    const tick = now => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 4)
      setV(eased * to)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration])
  const display = decimals ? v.toFixed(decimals) : Math.floor(v).toLocaleString()
  return <span ref={ref}>{prefix}{display}{suffix}</span>
}

const METRICS = [
  { icon: Icons.layers, to: 50000, suffix: '+', label: 'Claims processed monthly', c: '#8b93ff' },
  { icon: Icons.check, to: 98.7, decimals: 1, suffix: '%', label: 'First-pass acceptance', c: '#22d3ee' },
  { icon: Icons.globe, to: 500, suffix: '+', label: 'Payer integrations', c: '#38bdf8' },
  { icon: Icons.chart, to: 32, suffix: '%', label: 'Average revenue lift', c: '#34d399', duration: 1400 },
]

export default function Metrics() {
  return (
    <section id="results" style={{ position: 'relative', padding: '110px 0', background: 'linear-gradient(180deg,#04070f,#070d1c)', overflow: 'hidden' }}>
      <div className="aurora" style={{ width: 800, height: 500, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.2, background: 'radial-gradient(ellipse,#4f46e5,transparent 60%)' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <Reveal><Eyebrow color="#34d399">The results</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title" style={{ marginTop: 16, maxWidth: 640, marginInline: 'auto' }}>
              Numbers that move the <span className="gradient-text">bottom line.</span>
            </h2>
          </Reveal>
        </div>

        <div className="metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 }}>
          {METRICS.map((m, i) => {
            const Ic = m.icon
            return (
              <Reveal key={m.label} delay={i * 0.08} y={26} style={{ display: 'flex' }}>
                <div className="glass glass-sheen" style={{ position: 'relative', borderRadius: 20, padding: 30, width: '100%', textAlign: 'center' }}>
                  <span style={{ width: 46, height: 46, borderRadius: 13, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: m.c, background: `${m.c}1f`, border: `1px solid ${m.c}40`, marginBottom: 18 }}><Ic size={23} /></span>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(34px,4vw,46px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: '#fff', marginBottom: 10 }}>
                    <Counter to={m.to} decimals={m.decimals} suffix={m.suffix} duration={m.duration} />
                  </div>
                  <div style={{ fontSize: 13.5, color: 'var(--ink-45)', fontWeight: 500 }}>{m.label}</div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
      <style>{`@media (max-width:760px){ .metrics-grid{ grid-template-columns:repeat(2,1fr) !important; } }`}</style>
    </section>
  )
}
