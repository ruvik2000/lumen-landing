import { motion } from 'framer-motion'
import { Icons, Eyebrow, Reveal, EASE } from './_shared'

export default function Bento() {
  return (
    <section id="platform" style={{ position: 'relative', padding: '120px 0', background: '#04070f', overflow: 'hidden' }}>
      <div className="aurora" style={{ width: 600, height: 600, bottom: -200, left: -150, opacity: 0.16, background: 'radial-gradient(circle,#4f46e5,transparent 65%)' }} />
      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <Reveal><Eyebrow color="#22d3ee">The platform</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title" style={{ marginTop: 16, maxWidth: 720, marginInline: 'auto' }}>
              Everything your practice needs.<br /><span className="gradient-text">Nothing it doesn’t.</span>
            </h2>
          </Reveal>
        </div>

        <div className="bento-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gridAutoRows: 'minmax(200px,auto)', gap: 18 }}>
          {/* Big feature tile */}
          <Tile span="2x2" accent="#8b93ff">
            <TileHead icon={Icons.brain} c="#8b93ff" tag="AI Coding Engine" />
            <h3 style={tileTitle}>Reads the note. Codes the visit.</h3>
            <p style={tileBody}>Trained on millions of specialty-specific encounters, our model assigns precise ICD-10, CPT &amp; HCPCS — with confidence scoring on every line.</p>
            <CodeStrip />
          </Tile>

          <Tile span="2x1" accent="#22d3ee">
            <TileHead icon={Icons.shield} c="#22d3ee" tag="2,700-rule scrub" />
            <h3 style={tileTitle}>Claims clean before they leave.</h3>
            <p style={tileBody}>Payer-specific edits catch errors pre-submission, lifting first-pass acceptance to 98.7%.</p>
          </Tile>

          <Tile span="1x1" accent="#34d399">
            <TileHead icon={Icons.lock} c="#34d399" />
            <h3 style={tileTitleSm}>HIPAA + SOC 2</h3>
            <p style={tileBodySm}>AES-256 at rest, TLS 1.3 in transit. BAA included.</p>
          </Tile>

          <Tile span="1x1" accent="#38bdf8">
            <TileHead icon={Icons.link} c="#38bdf8" />
            <h3 style={tileTitleSm}>Native EHR sync</h3>
            <p style={tileBodySm}>Two-way, real-time. 30+ systems. No CSV exports.</p>
          </Tile>

          <Tile span="2x1" accent="#fbbf24">
            <TileHead icon={Icons.chat} c="#fbbf24" tag="Patient billing" />
            <h3 style={tileTitle}>Statements patients actually pay.</h3>
            <p style={tileBody}>Branded, plain-language bills via email &amp; SMS with a one-tap payment portal.</p>
          </Tile>

          <Tile span="2x1" accent="#818cf8">
            <TileHead icon={Icons.chart} c="#818cf8" tag="Live analytics" />
            <h3 style={tileTitle}>See every dollar, in real time.</h3>
            <p style={tileBody}>Collection rate, days-in-AR, denial reasons and payer performance — one live board.</p>
            <MiniBars />
          </Tile>

          <Tile span="2x1" accent="#34d399">
            <TileHead icon={Icons.users} c="#34d399" tag="Human backup" />
            <h3 style={tileTitle}>Certified coders on standby.</h3>
            <p style={tileBody}>For edge cases the AI escalates, a named success team responds within 2 hours.</p>
          </Tile>
        </div>
      </div>

      <style>{`
        .bento-tile-2x2 { grid-column: span 2; grid-row: span 2; }
        .bento-tile-2x1 { grid-column: span 2; }
        .bento-tile-1x1 { grid-column: span 1; }
        @media (max-width: 900px) {
          .bento-grid { grid-template-columns: repeat(2,1fr) !important; }
          .bento-tile-2x2, .bento-tile-2x1 { grid-column: span 2 !important; grid-row: auto !important; }
          .bento-tile-1x1 { grid-column: span 1 !important; }
        }
        @media (max-width: 560px) {
          .bento-grid { grid-template-columns: 1fr !important; }
          .bento-tile-2x2, .bento-tile-2x1, .bento-tile-1x1 { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  )
}

const tileTitle = { fontFamily: 'var(--font-heading)', fontSize: 'clamp(18px,1.7vw,23px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', lineHeight: 1.15, marginBottom: 10 }
const tileTitleSm = { fontFamily: 'var(--font-heading)', fontSize: 17, fontWeight: 800, color: '#fff', marginBottom: 6 }
const tileBody = { fontSize: 14.5, lineHeight: 1.65, color: 'var(--ink-60)' }
const tileBodySm = { fontSize: 13, lineHeight: 1.6, color: 'var(--ink-45)' }

function Tile({ children, span, accent }) {
  return (
    <Reveal as="div" y={24} style={{ display: 'flex' }}>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className={`glass glass-sheen bento-tile-${span}`}
        style={{ position: 'relative', borderRadius: 22, padding: 26, display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%', cursor: 'default' }}
        onMouseEnter={e => e.currentTarget.style.borderColor = `${accent}66`}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--glass-border)'}
      >
        <div className="aurora" style={{ width: 220, height: 220, top: -120, right: -80, opacity: 0.14, background: `radial-gradient(circle,${accent},transparent 65%)` }} />
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>{children}</div>
      </motion.div>
    </Reveal>
  )
}

function TileHead({ icon: Ic, c, tag }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
      <span style={{ width: 44, height: 44, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c, background: `${c}1f`, border: `1px solid ${c}40`, flexShrink: 0 }}><Ic size={22} /></span>
      {tag && <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: c }}>{tag}</span>}
    </div>
  )
}

function CodeStrip() {
  const codes = [['Z00.00', 98], ['E11.9', 96], ['I10', 99], ['99214', 97]]
  return (
    <div style={{ marginTop: 'auto', paddingTop: 18, display: 'flex', flexDirection: 'column', gap: 7 }}>
      {codes.map(([code, conf], i) => (
        <motion.div key={code} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(0,0,0,0.25)', borderRadius: 9, padding: '8px 12px' }}>
          <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: '#8b93ff', minWidth: 54 }}>{code}</span>
          <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
            <motion.div initial={{ width: 0 }} whileInView={{ width: `${conf}%` }} viewport={{ once: true }} transition={{ delay: i * 0.08 + 0.2, duration: 0.6, ease: EASE }} style={{ height: '100%', background: '#8b93ff', borderRadius: 2 }} />
          </div>
          <span className="mono" style={{ fontSize: 10.5, color: 'var(--ink-45)', minWidth: 26 }}>{conf}%</span>
        </motion.div>
      ))}
    </div>
  )
}

function MiniBars() {
  return (
    <div style={{ marginTop: 'auto', paddingTop: 16, display: 'flex', alignItems: 'flex-end', gap: 5, height: 50 }}>
      {[42, 60, 50, 74, 66, 88, 100].map((h, i) => (
        <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.5 }}
          style={{ flex: 1, borderRadius: 3, background: i === 6 ? 'linear-gradient(#818cf8,#22d3ee)' : 'rgba(129,140,248,0.35)' }} />
      ))}
    </div>
  )
}
