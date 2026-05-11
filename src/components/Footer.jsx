import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const cols = [
  {
    title: 'Product',
    links: [
      { label: 'About', to: '/#about' },
      { label: 'Services', to: '/#services' },
      { label: 'Compare', to: '/compare' },
      { label: 'Blog', to: '/blog' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Talk with us', to: '/#cta' },
      { label: 'Help center', to: '#' },
      { label: 'LinkedIn', to: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of service', to: '#' },
      { label: 'Privacy policy', to: '#' },
      { label: 'HIPAA compliance', to: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--gray-900)', paddingTop: 72, paddingBottom: 40, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 60, marginBottom: 60 }}>
          {/* Brand */}
          <div>
            <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '0.08em', color: '#fff', marginBottom: 12 }}>LUMEN</div>
            <div style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.38)' }}>
              End-to-end medical billing.<br />
              You treat the patient, we handle the rest.
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              {['in', '𝕏', '●'].map((icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.15, color: '#fff' }}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)',
                    transition: 'color 0.2s',
                  }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.28)', marginBottom: 20 }}>
                {col.title}
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = '#fff'}
                      onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.22)' }}>© 2026 Apex Health Technologies, Inc. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy', 'Terms', 'HIPAA'].map(l => (
              <a key={l} href="#" style={{ fontSize: 13, color: 'rgba(255,255,255,0.22)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.22)'}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
