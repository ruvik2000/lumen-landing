import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Icons, TrustPill } from './_shared'

const links = [
  { to: '/#how', label: 'How it works' },
  { to: '/#platform', label: 'Platform' },
  { to: '/#results', label: 'Results' },
  { to: '/faq', label: 'FAQ' },
  { to: '/compare', label: 'Compare' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  return (
    <>
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{
          position: 'fixed', top: scrolled ? 12 : 18, left: 0, right: 0,
          marginInline: 'auto', zIndex: 300,
          width: 'min(1180px, calc(100% - 28px))',
          transition: 'top 0.4s var(--ease)',
        }}
      >
        <div
          className="glass glass-sheen"
          style={{
            position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            height: 60, padding: '0 12px 0 22px', borderRadius: 16,
            background: scrolled ? 'rgba(8,12,22,0.72)' : 'rgba(255,255,255,0.04)',
            transition: 'background 0.4s var(--ease)',
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <Logo />
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em', color: '#fff' }}>
              Relio
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="nav-links" style={{ display: 'flex', gap: 4, listStyle: 'none', alignItems: 'center' }}>
            {links.map(l => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--ink-60)', padding: '8px 12px', borderRadius: 9, transition: 'color 0.2s, background 0.2s', display: 'block' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-60)'; e.currentTarget.style.background = 'transparent' }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right cluster */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="nav-yc">
              <TrustPill size="sm" style={{ borderRadius: 10 }} />
            </div>
            <motion.a
              href="#cta"
              className="nav-cta"
              whileHover={{ y: -1, boxShadow: '0 10px 26px rgba(99,102,241,0.5)' }}
              whileTap={{ scale: 0.96 }}
              style={{
                background: 'linear-gradient(135deg,#6366f1,#4f46e5 60%,#0891b2)', color: '#fff',
                fontSize: 13.5, fontWeight: 700, padding: '10px 18px', borderRadius: 11,
                display: 'inline-flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap',
                boxShadow: '0 6px 20px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
                border: '1px solid rgba(139,147,255,0.4)',
              }}
            >
              Book a free audit
            </motion.a>
            {/* Mobile toggle */}
            <button
              className="nav-burger"
              aria-label="Menu" onClick={() => setMenuOpen(o => !o)}
              style={{ display: 'none', width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', color: '#fff' }}
            >
              <Icons.layers size={20} />
            </button>
          </div>
        </div>
      </motion.nav>

      <style>{`
        @media (max-width: 920px) {
          .nav-links { display: none !important; }
          .nav-yc { display: none !important; }
          .nav-burger { display: inline-flex !important; }
        }
        @media (max-width: 520px) {
          .nav-cta { display: none !important; }
        }
      `}</style>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 250,
              background: 'rgba(4,7,15,0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28,
            }}
          >
            {links.map((l, i) => (
              <motion.div key={l.label}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link to={l.to} style={{ fontSize: 26, fontWeight: 700, color: '#fff' }} onClick={() => setMenuOpen(false)}>
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Logo() {
  return (
    <span style={{
      width: 30, height: 30, borderRadius: 9, position: 'relative',
      background: 'linear-gradient(135deg,#6366f1,#22d3ee 90%)',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 4px 14px rgba(34,211,238,0.4), inset 0 1px 0 rgba(255,255,255,0.5)',
    }}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M2 12h4l2-6 4 14 3-9 2 1h5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}
