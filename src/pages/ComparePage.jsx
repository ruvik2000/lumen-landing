import { motion } from 'framer-motion'
import { Icons, Reveal, PageHero, EASE } from '../components/_shared'

const COMPETITORS = [
  { name: 'Tebra (Kareo)', summary: 'A combined EHR + billing platform built for small practices. Billing is offered as an add-on, but the core product is the EHR.', pros: ['Full EHR included', 'Patient engagement tools', 'Wide specialty support'], cons: ['Billing is secondary to EHR', 'No AI coding engine', 'Support quality varies significantly', 'Expensive for billing-only use'], pricing: '% collections + EHR fee' },
  { name: 'AdvancedMD', summary: 'Enterprise RCM and EHR suite targeting mid-to-large practices. Powerful, but complex and expensive for independents.', pros: ['Comprehensive feature set', 'Strong analytics reporting', 'Large payer network'], cons: ['Steep learning curve', 'High per-provider cost', 'No AI automation — manual coding', 'Long implementation timelines'], pricing: '$700–$2,000+/mo per provider' },
  { name: 'athenahealth', summary: 'One of the largest cloud-based EHR and RCM platforms. Built for hospital networks and large practices.', pros: ['Extensive payer network', 'Integrated EHR + billing', 'Strong compliance infrastructure'], cons: ['Very expensive for independents', 'Designed for hospital-scale teams', 'Slow denial resolution', 'Rigid onboarding process'], pricing: '5–8% of collections' },
  { name: 'DrChrono', summary: 'EHR-first platform with billing add-ons, targeting smaller practices. Billing is outsourced to a third-party RCM team.', pros: ['iPad-friendly EHR', 'Good for small practices', 'Reasonable base pricing'], cons: ['Billing is outsourced — not in-house', 'Limited denial automation', 'No AI coding', 'Support is slow to respond'], pricing: 'Custom per practice' },
  { name: 'Adonis', summary: 'AI-native RCM platform targeting physician groups and health systems. Strong on analytics but a different target market.', pros: ['AI-assisted coding', 'Strong analytics', 'Health system integrations'], cons: ['Targets larger groups (10+ providers)', 'Minimum revenue thresholds', 'Less focus on independent practices', 'Limited specialty coverage'], pricing: 'Enterprise — not listed' },
]

const FEATURE_ROWS = [
  { label: 'AI-generated ICD-10 / CPT coding', vals: [true, false, false, false, false, true] },
  { label: 'Automatic denial appeals', vals: [true, false, false, false, false, true] },
  { label: 'Same-day claim submission', vals: [true, true, true, true, false, true] },
  { label: 'Solo practice pricing', vals: [true, true, false, false, true, false] },
  { label: '< 14-day onboarding', vals: [true, false, false, false, false, false] },
  { label: 'Named account manager', vals: [true, false, false, false, false, true] },
  { label: 'No long-term contracts', vals: [true, false, false, false, false, false] },
  { label: 'Patient billing & portal', vals: [true, true, true, true, true, false] },
  { label: 'SOC 2 Type II certified', vals: [true, true, true, true, false, true] },
]
const COLS = ['Relio', 'Tebra', 'AdvancedMD', 'athena', 'DrChrono', 'Adonis']

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
}

function Mark({ yes }) {
  return yes
    ? <Icons.check size={18} style={{ color: '#34d399' }} />
    : <Icons.x size={15} style={{ color: 'rgba(255,255,255,0.18)' }} />
}

export default function ComparePage() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
      <PageHero
        eyebrow="Compare"
        title="How Relio"
        gradient="stacks up."
        subtitle="Choose on the facts. Here's an honest look at how Relio compares to the alternatives independent practices actually consider."
        accent="#8b93ff"
      />

      {/* Comparison table */}
      <div style={{ background: '#04070f', padding: '40px 0 80px' }}>
        <div className="container">
          <Reveal y={28}>
            <div className="glass glass-sheen" style={{ position: 'relative', borderRadius: 20, padding: 8, overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 760 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: 13, color: 'var(--ink-45)', fontWeight: 600 }}>Feature</th>
                    {COLS.map((h, i) => (
                      <th key={h} style={{ textAlign: 'center', padding: '16px 14px', fontSize: 13, fontWeight: 700, color: i === 0 ? '#fff' : 'var(--ink-45)', borderRadius: i === 0 ? '12px 12px 0 0' : 0, background: i === 0 ? 'rgba(99,102,241,0.14)' : 'transparent' }}>
                        {i === 0 ? <span className="gradient-text" style={{ fontFamily: 'var(--font-heading)', fontSize: 15 }}>Relio</span> : h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FEATURE_ROWS.map((row, i) => (
                    <tr key={row.label}>
                      <td style={{ padding: '14px 20px', fontSize: 14, color: 'var(--ink-80)', borderTop: '1px solid var(--glass-border)' }}>{row.label}</td>
                      {row.vals.map((val, j) => (
                        <td key={j} style={{ textAlign: 'center', padding: '14px 14px', borderTop: '1px solid var(--glass-border)', background: j === 0 ? 'rgba(99,102,241,0.07)' : 'transparent' }}>
                          <span style={{ display: 'inline-flex' }}><Mark yes={val} /></span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Competitor cards */}
      <div style={{ background: '#070d1c', padding: '80px 0 120px' }}>
        <div className="container-wide">
          <Reveal><h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(26px,3vw,38px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginBottom: 36 }}>In-depth comparison</h2></Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: 20 }}>
            {COMPETITORS.map((c, i) => <CompetitorCard key={c.name} comp={c} i={i} />)}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function CompetitorCard({ comp, i }) {
  return (
    <Reveal delay={(i % 3) * 0.07} y={24} style={{ display: 'flex' }}>
      <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="glass glass-sheen" style={{ position: 'relative', borderRadius: 18, padding: 28, width: '100%' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{comp.name}</h3>
        <p style={{ fontSize: 13.5, lineHeight: 1.7, color: 'var(--ink-45)', marginBottom: 22 }}>{comp.summary}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#34d399', marginBottom: 10 }}>Strengths</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {comp.pros.map(p => <li key={p} style={{ fontSize: 13, color: 'var(--ink-60)', display: 'flex', gap: 7, alignItems: 'flex-start' }}><Icons.check size={14} style={{ color: '#34d399', marginTop: 2, flexShrink: 0 }} />{p}</li>)}
            </ul>
          </div>
          <div>
            <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#f87171', marginBottom: 10 }}>Weaknesses</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {comp.cons.map(c => <li key={c} style={{ fontSize: 13, color: 'var(--ink-60)', display: 'flex', gap: 7, alignItems: 'flex-start' }}><Icons.x size={13} style={{ color: '#f87171', marginTop: 2, flexShrink: 0 }} />{c}</li>)}
            </ul>
          </div>
        </div>
        <div style={{ paddingTop: 14, borderTop: '1px solid var(--glass-border)', fontSize: 12, color: 'var(--ink-30)' }}>
          Typical pricing: <span style={{ color: 'var(--ink-80)', fontWeight: 600 }}>{comp.pricing}</span>
        </div>
      </motion.div>
    </Reveal>
  )
}
