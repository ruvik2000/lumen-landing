import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/#about', label: 'About' },
  { to: '/#services', label: 'Services' },
  { to: '/faq', label: 'FAQ' },
  { to: '/compare', label: 'Compare' },
  { to: '/blog', label: 'Blog' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const isHome = location.pathname === '/'
  const isDark = isHome && !scrolled

  const textColor = isDark ? 'rgba(255,255,255,0.75)' : 'var(--gray-600)'
  const textHover = isDark ? '#fff' : 'var(--gray-900)'
  const logoColor = isDark ? '#fff' : 'var(--gray-900)'

  return (
    <>
      <motion.nav
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 32px',
          background: scrolled ? 'rgba(255,255,255,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
          boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.07)' : 'none',
          transition: 'background 0.35s, box-shadow 0.35s, backdrop-filter 0.35s',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ fontWeight: 900, fontSize: 16, letterSpacing: '0.08em', color: logoColor, transition: 'color 0.3s' }}>
          LUMEN
        </Link>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: 32, listStyle: 'none', alignItems: 'center' }}>
          {links.map(l => (
            <li key={l.label} style={{ display: window.innerWidth < 768 ? 'none' : 'block' }}>
              <Link
                to={l.to}
                style={{ fontSize: 14, fontWeight: 500, color: textColor, transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = textHover}
                onMouseLeave={e => e.target.style.color = textColor}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <a
            href="#"
            style={{ fontSize: 14, fontWeight: 500, color: textColor, padding: '8px 14px', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = textHover}
            onMouseLeave={e => e.target.style.color = textColor}
          >
            Sign In
          </a>
          <motion.a
            href="#cta"
            whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(99,102,241,0.4)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: 'var(--indigo-light)', color: '#fff',
              fontSize: 14, fontWeight: 600, padding: '9px 20px', borderRadius: 8,
              display: 'inline-block',
            }}
          >
            Talk with us
          </motion.a>
        </div>
      </motion.nav>

      {/* Mobile menu — simplified */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 150,
              background: 'var(--bg)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 40,
            }}
          >
            {links.map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={l.to} style={{ fontSize: 28, fontWeight: 700, color: '#fff' }} onClick={() => setMenuOpen(false)}>
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
