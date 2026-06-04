import { motion } from 'framer-motion'
import { Icons } from './_shared'

const EHRS = ['Athenahealth', 'eClinicalWorks', 'Epic', 'NextGen', 'AdvancedMD', 'DrChrono', 'Elation Health', 'Kareo', 'Greenway', 'Practice Fusion', 'Office Ally']

function Marquee({ items, speed = 34, reverse = false }) {
  const row = [...items, ...items]
  return (
    <div style={{ overflow: 'hidden', WebkitMaskImage: 'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)', maskImage: 'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)' }}>
      <motion.div
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}
      >
        {row.map((it, i) => (
          <span key={i} style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink-30)', padding: '0 30px' }}>{it}</span>
        ))}
      </motion.div>
    </div>
  )
}

export default function TrustBar() {
  return (
    <section style={{ position: 'relative', padding: '46px 0 30px', background: '#04070f', borderTop: '1px solid var(--border)' }}>
      <div className="container-wide">
        {/* Compliance line */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 30, flexWrap: 'wrap' }}
        >
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink-45)', marginRight: 4 }}>Enterprise-grade security &amp; compliance</span>
          {[
            { icon: Icons.shield, label: 'SOC 2 Type II' },
            { icon: Icons.lock, label: 'HIPAA certified' },
            { icon: Icons.check, label: 'HITRUST CSF' },
          ].map(({ icon: Ic, label }) => (
            <span key={label} className="glass" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 14px', borderRadius: 100, fontSize: 13, fontWeight: 600, color: 'var(--ink-80)' }}>
              <Ic size={15} style={{ color: '#6ee7b7' }} /> {label}
            </span>
          ))}
        </motion.div>

        <div style={{ textAlign: 'center', fontSize: 11.5, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-30)', marginBottom: 18 }}>
          Two-way native integrations with every major EHR
        </div>
        <Marquee items={EHRS} />
      </div>
    </section>
  )
}
