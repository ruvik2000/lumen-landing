import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

function AnimatedNumber({ target, suffix = '', duration = 1800 }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const raf = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 4)
      setValue(Math.floor(eased * target))
      if (t < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [inView, target, duration])

  return <span ref={ref}>{value.toLocaleString()}{suffix}</span>
}

const STATS = [
  { value: 50000, suffix: '+', label: 'Claims processed monthly' },
  { value: 98.7, suffix: '%', label: 'First-pass acceptance rate', isFloat: true },
  { value: 500, suffix: '+', label: 'Payer integrations' },
  { value: 32, suffix: '%', label: 'Average revenue lift', duration: 1400 },
]

export default function Stats() {
  return (
    <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '64px 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {STATS.map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: '0 32px',
                borderRight: i < STATS.length - 1 ? '1px solid var(--border)' : 'none',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 42, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 8 }}
                className="gradient-text"
              >
                {s.isFloat
                  ? <FloatNumber target={s.value} suffix={s.suffix} />
                  : <AnimatedNumber target={s.value} suffix={s.suffix} duration={s.duration || 1800} />
                }
              </div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FloatNumber({ target, suffix }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const duration = 1800
    const raf = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 4)
      setValue((eased * target).toFixed(1))
      if (t < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [inView, target])

  return <span ref={ref}>{value}{suffix}</span>
}
