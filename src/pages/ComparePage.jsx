import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const COMPETITORS = [
  {
    name: 'Tebra (Kareo)',
    summary: 'A combined EHR + billing platform built for small practices. Billing is offered as an add-on, but the core product is the EHR.',
    pros: ['Full EHR included', 'Patient engagement tools', 'Wide specialty support'],
    cons: ['Billing is secondary to EHR', 'No AI coding engine', 'Support quality varies significantly', 'Expensive for billing-only use'],
    pricing: '% collections + EHR fee',
  },
  {
    name: 'AdvancedMD',
    summary: 'Enterprise RCM and EHR suite targeting mid-to-large practices. Powerful, but complex and expensive for independents.',
    pros: ['Comprehensive feature set', 'Strong analytics reporting', 'Large payer network'],
    cons: ['Steep learning curve', 'High per-provider cost', 'No AI automation — manual coding', 'Long implementation timelines'],
    pricing: '$700–$2,000+/mo per provider',
  },
  {
    name: 'athenahealth',
    summary: 'One of the largest cloud-based EHR and RCM platforms. Built for hospital networks and large practices.',
    pros: ['Extensive payer network', 'Integrated EHR + billing', 'Strong compliance infrastructure'],
    cons: ['Very expensive for independents', 'Designed for hospital-scale teams', 'Slow denial resolution', 'Rigid onboarding process'],
    pricing: '5–8% of collections',
  },
  {
    name: 'DrChrono',
    summary: 'EHR-first platform with billing add-ons, targeting smaller practices. Billing is outsourced to a third-party RCM team.',
    pros: ['iPad-friendly EHR', 'Good for small practices', 'Reasonable base pricing'],
    cons: ['Billing is outsourced — not in-house', 'Limited denial automation', 'No AI coding', 'Support is slow to respond'],
    pricing: 'Custom per practice',
  },
  {
    name: 'Adonis',
    summary: 'AI-native RCM platform targeting physician groups and health systems. Strong on analytics but a different target market.',
    pros: ['AI-assisted coding', 'Strong analytics', 'Health system integrations'],
    cons: ['Targets larger groups (10+ providers)', 'Minimum revenue thresholds', 'Less focus on independent practices', 'Limited specialty coverage'],
    pricing: 'Enterprise — not listed',
  },
]

const FEATURE_ROWS = [
  { label: 'AI-generated ICD-10 / CPT coding', lumen: true, tebra: false, amd: false, athena: false, drchrono: false, adonis: true },
  { label: 'Automatic denial appeals', lumen: true, tebra: false, amd: false, athena: false, drchrono: false, adonis: true },
  { label: 'Same-day claim submission', lumen: true, tebra: true, amd: true, athena: true, drchrono: false, adonis: true },
  { label: 'Solo practice pricing', lumen: true, tebra: true, amd: false, athena: false, drchrono: true, adonis: false },
  { label: '< 14-day onboarding', lumen: true, tebra: false, amd: false, athena: false, drchrono: false, adonis: false },
  { label: 'Named account manager', lumen: true, tebra: false, amd: false, athena: false, drchrono: false, adonis: true },
  { label: 'No long-term contracts', lumen: true, tebra: false, amd: false, athena: false, drchrono: false, adonis: false },
  { label: 'Patient billing & portal', lumen: true, tebra: true, amd: true, athena: true, drchrono: true, adonis: false },
  { label: 'SOC 2 Type II certified', lumen: true, tebra: true, amd: true, athena: true, drchrono: false, adonis: true },
]

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
}

function Check({ yes }) {
  return (
    <span style={{ fontSize: 16, color: yes ? '#10b981' : 'rgba(255,255,255,0.18)', fontWeight: 700 }}>
      {yes ? '✓' : '✗'}
    </span>
  )
}

export default function ComparePage() {
  const tableRef = useRef(null)
  const tableInView = useInView(tableRef, { once: true, margin: '-60px' })

  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit" style={{ paddingTop: 64 }}>
      {/* Header */}
      <div style={{ background: 'var(--surface)', padding: '80px 0 64px', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: 800, textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--indigo-pale)', marginBottom: 16 }}>Compare</div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginBottom: 16 }}>How Lumen compares</h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: 560, margin: '0 auto' }}>
            We think you should choose based on the facts. Here's an honest look at how Lumen stacks up against the alternatives.
          </p>
        </div>
      </div>

      {/* Feature comparison table */}
      <div style={{ background: 'var(--bg)', padding: '80px 0' }}>
        <div className="container" style={{ overflowX: 'auto' }}>
          <motion.div
            ref={tableRef}
            initial={{ opacity: 0, y: 28 }}
            animate={tableInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '12px 20px', fontSize: 13, color: 'rgba(255,255,255,0.35)', fontWeight: 600, borderBottom: '1px solid var(--border)' }}>Feature</th>
                  {['Lumen', 'Tebra', 'AdvancedMD', 'athena', 'DrChrono', 'Adonis'].map((h, i) => (
                    <th key={h} style={{
                      textAlign: 'center', padding: '12px 16px',
                      fontSize: 13, fontWeight: 700,
                      color: i === 0 ? 'var(--indigo-pale)' : 'rgba(255,255,255,0.45)',
                      borderBottom: '1px solid var(--border)',
                      background: i === 0 ? 'rgba(99,102,241,0.06)' : 'transparent',
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FEATURE_ROWS.map((row, i) => (
                  <tr key={row.label} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
                    <td style={{ padding: '14px 20px', fontSize: 14, color: 'rgba(255,255,255,0.65)', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>{row.label}</td>
                    {[row.lumen, row.tebra, row.amd, row.athena, row.drchrono, row.adonis].map((val, j) => (
                      <td key={j} style={{ textAlign: 'center', padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.03)', background: j === 0 ? 'rgba(99,102,241,0.04)' : 'transparent' }}>
                        <Check yes={val} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </div>

      {/* Competitor cards */}
      <div style={{ background: 'var(--surface)', padding: '80px 0 120px' }}>
        <div className="container">
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 40 }}>In-depth comparison</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
            {COMPETITORS.map((c, i) => <CompetitorCard key={c.name} comp={c} i={i} />)}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function CompetitorCard({ comp, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 16, padding: 28 }}
    >
      <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{comp.name}</h3>
      <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.45)', marginBottom: 20 }}>{comp.summary}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#10b981', marginBottom: 8 }}>Strengths</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {comp.pros.map(p => <li key={p} style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', display: 'flex', gap: 6 }}><span style={{ color: '#10b981' }}>+</span>{p}</li>)}
          </ul>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#ef4444', marginBottom: 8 }}>Weaknesses</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {comp.cons.map(c => <li key={c} style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', display: 'flex', gap: 6 }}><span style={{ color: '#ef4444' }}>–</span>{c}</li>)}
          </ul>
        </div>
      </div>
      <div style={{ paddingTop: 14, borderTop: '1px solid var(--border)', fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
        Typical pricing: <span style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>{comp.pricing}</span>
      </div>
    </motion.div>
  )
}
