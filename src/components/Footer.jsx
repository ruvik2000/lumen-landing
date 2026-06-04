import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icons, TrustPill } from './_shared'

const cols = [
  { title: 'Product', links: [{ label: 'How it works', to: '/#how' }, { label: 'Platform', to: '/#platform' }, { label: 'Results', to: '/#results' }, { label: 'Compare', to: '/compare' }] },
  { title: 'Company', links: [{ label: 'Blog', to: '/blog' }, { label: 'FAQ', to: '/faq' }, { label: 'Careers', to: '#' }, { label: 'Help center', to: '#' }] },
  { title: 'Legal', links: [{ label: 'Terms of service', to: '#' }, { label: 'Privacy policy', to: '#' }, { label: 'HIPAA compliance', to: '#' }, { label: 'BAA', to: '#' }] },
]

export default function Footer() {
  return (
    <footer style={{ position: 'relative', background: '#04070f', borderTop: '1px solid var(--border)', paddingTop: 72, paddingBottom: 40, overflow: 'hidden' }}>
      <div className="aurora" style={{ width: 600, height: 300, bottom: -180, left: '50%', transform: 'translateX(-50%)', opacity: 0.12, background: 'radial-gradient(ellipse,#4f46e5,transparent 65%)' }} />
      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 56, marginBottom: 56 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
              <span style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#6366f1,#22d3ee)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icons.pulse size={16} style={{ color: '#fff' }} />
              </span>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 18, color: '#fff' }}>Relio</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-45)', maxWidth: 280, marginBottom: 18 }}>
              AI-native medical billing for independent practices. You treat the patient — we handle the rest.
            </p>
            <TrustPill style={{ borderRadius: 10 }} />
          </div>

          {cols.map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-30)', marginBottom: 18 }}>{col.title}</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11 }}>
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link to={l.to} style={{ fontSize: 14, color: 'var(--ink-45)', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-45)'}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hairline" style={{ marginBottom: 28 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
          <span style={{ fontSize: 13, color: 'var(--ink-30)' }}>© 2026 Relio Health Technologies, Inc. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 10 }}>
            {[Icons.users, Icons.globe, Icons.chat].map((Ic, i) => (
              <motion.a key={i} href="#" whileHover={{ y: -2, color: '#fff' }}
                className="glass" style={{ width: 38, height: 38, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-45)' }}>
                <Ic size={17} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media (max-width:760px){ .footer-grid{ grid-template-columns:1fr 1fr !important; gap:32px !important; } }`}</style>
    </footer>
  )
}
