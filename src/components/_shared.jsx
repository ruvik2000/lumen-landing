import { motion } from 'framer-motion'

export const EASE = [0.16, 1, 0.3, 1]

/* ────────────────────────────────────────────────────────────
   Inline SVG icon set — replaces all emoji icons.
   Each takes (size, stroke) and inherits currentColor.
   ──────────────────────────────────────────────────────────── */
const ic = (paths, fill = false) =>
  function Icon({ size = 24, stroke = 1.6, style }) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} aria-hidden="true">
        {paths.map((d, i) => (
          <path key={i} d={d}
            stroke={fill ? 'none' : 'currentColor'}
            fill={fill ? 'currentColor' : 'none'}
            strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
        ))}
      </svg>
    )
  }

export const Icons = {
  bolt:      ic(['M13 2 4.5 13.5H11l-1 8.5L19.5 10H13l0-8Z']),
  send:      ic(['M22 2 11 13', 'M22 2l-7 20-4-9-9-4 20-7Z']),
  shield:    ic(['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z', 'M9 12l2 2 4-4']),
  brain:    ic(['M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V4.5A2.5 2.5 0 0 0 9 4Z', 'M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1']),
  link:      ic(['M9 15l6-6', 'M11 6l1-1a4 4 0 0 1 6 6l-1 1', 'M13 18l-1 1a4 4 0 0 1-6-6l1-1']),
  chart:     ic(['M4 20V10', 'M10 20V4', 'M16 20v-7', 'M22 20H2']),
  doc:       ic(['M7 3h7l5 5v13H7V3Z', 'M14 3v5h5', 'M10 13h6', 'M10 17h6']),
  chat:      ic(['M21 15a3 3 0 0 1-3 3H8l-5 4V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v9Z']),
  lock:      ic(['M6 11h12v9H6z', 'M9 11V7a3 3 0 0 1 6 0v4']),
  users:     ic(['M16 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1', 'M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M21 20v-1a4 4 0 0 0-3-3.8', 'M16 4.2A3.5 3.5 0 0 1 16 11']),
  check:     ic(['M5 12.5 10 17 19 7']),
  arrow:     ic(['M5 12h14', 'M13 6l6 6-6 6']),
  sparkles:  ic(['M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4L12 3Z', 'M19 14l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z']),
  heart:     ic(['M12 21s-7-4.6-9.3-9A5.2 5.2 0 0 1 12 6a5.2 5.2 0 0 1 9.3 6c-2.3 4.4-9.3 9-9.3 9Z']),
  pulse:     ic(['M2 12h4l2-6 4 14 3-9 2 1h5']),
  clock:     ic(['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 7v5l3 2']),
  layers:    ic(['M12 3 2 8l10 5 10-5-10-5Z', 'M2 16l10 5 10-5', 'M2 12l10 5 10-5']),
  refresh:   ic(['M4 12a8 8 0 0 1 14-5l2 2', 'M20 12a8 8 0 0 1-14 5l-2-2', 'M18 4v5h-5', 'M6 20v-5h5']),
  scan:      ic(['M4 7V5a1 1 0 0 1 1-1h2', 'M17 4h2a1 1 0 0 1 1 1v2', 'M20 17v2a1 1 0 0 1-1 1h-2', 'M7 20H5a1 1 0 0 1-1-1v-2', 'M4 12h16']),
  dollar:    ic(['M12 2v20', 'M17 6.5C17 4.6 14.8 4 12 4S7 4.9 7 7s2.5 2.8 5 3.2 5 1 5 3.3-2.2 3.5-5 3.5-5-.8-5-2.7']),
  building:  ic(['M3 21h18', 'M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16', 'M15 21V9h2a2 2 0 0 1 2 2v10', 'M9 7h2M9 11h2M9 15h2']),
  star:      ic(['M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8-4.3-4.1 5.9-.9L12 3Z'], true),
  flag:      ic(['M4 21V4', 'M4 4h11l-1.5 4L15 12H4']),
  globe:     ic(['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M3 12h18', 'M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z']),
  book:      ic(['M4 5a2 2 0 0 1 2-2h11v16H6a2 2 0 0 0-2 2V5Z', 'M17 3h1a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2h-1']),
  scale:     ic(['M12 3v18', 'M7 7h10', 'M7 7l-3 6h6l-3-6Z', 'M17 7l-3 6h6l-3-6Z', 'M6 21h12']),
  x:         ic(['M6 6l12 12', 'M18 6 6 18']),
  eye:       ic(['M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z']),
  bone:      ic(['M17 3a2.5 2.5 0 0 1 1.8 4.3L9.3 16.8A2.5 2.5 0 1 1 7 19a2.5 2.5 0 1 1-2.8-2.8l9.5-9.5A2.5 2.5 0 0 1 17 3Z']),
  tooth:     ic(['M12 4c-2-1.5-5-1.5-6 .5-1.2 2.4.3 5 .8 8 .3 1.8.2 5 1.7 5s1.3-3 1.8-4.5c.3-.9.6-.9 .9 0C13.4 18 13.2 21 14.7 21s1.4-3.2 1.7-5c.5-3 2-5.6.8-8-1-2-4-2-5.2-.5Z']),
  baby:      ic(['M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M9 13a5 5 0 0 0 6 0', 'M7 21a5 5 0 0 1 10 0', 'M12 11v4']),
  lungs:     ic(['M12 4v8', 'M9 8c0 2-3 3-3 7 0 2 .5 4 2 4s2-2 2-4V9', 'M15 8c0 2 3 3 3 7 0 2-.5 4-2 4s-2-2-2-4V9']),
}

/* Compliance trust pill (SOC 2 / HIPAA) — replaces the prior YC badge */
export function TrustPill({ size = 'md', style }) {
  const sm = size === 'sm'
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: sm ? 6 : 8,
      padding: sm ? '5px 11px' : '6px 13px', borderRadius: 100,
      background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)',
      color: '#6ee7b7', fontSize: sm ? 11.5 : 12.5, fontWeight: 700, whiteSpace: 'nowrap', ...style,
    }}>
      <Icons.shield size={sm ? 13 : 15} />
      SOC 2 Type II · HIPAA
    </span>
  )
}

/* ────────────────────────────────────────────────────────────
   Reveal — scroll-triggered fade/translate wrapper
   ──────────────────────────────────────────────────────────── */
export function Reveal({ children, y = 28, delay = 0, once = true, style, as = 'div' }) {
  const M = motion[as] || motion.div
  return (
    <M
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-10% 0px' }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      style={style}
    >
      {children}
    </M>
  )
}

/* Section eyebrow with a leading dot */
export function Eyebrow({ children, color = 'var(--indigo-pale)' }) {
  return (
    <span className="eyebrow" style={{ color }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, boxShadow: `0 0 10px ${color}` }} />
      {children}
    </span>
  )
}

/* Primary glass-gradient pill button (magnetic on hover) */
export function GButton({ children, href = '#', primary = true, icon = true, onClick, style }) {
  return (
    <motion.a
      href={href} onClick={onClick}
      whileHover={{ y: -2, boxShadow: primary
        ? '0 18px 50px rgba(99,102,241,0.55)'
        : '0 12px 30px rgba(0,0,0,0.4)' }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 9,
        fontSize: 15, fontWeight: 700, padding: '14px 26px', borderRadius: 12,
        letterSpacing: '-0.01em', cursor: 'pointer', position: 'relative', overflow: 'hidden',
        ...(primary ? {
          background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #0891b2 130%)',
          color: '#fff',
          boxShadow: '0 8px 28px rgba(99,102,241,0.45), inset 0 1px 0 rgba(255,255,255,0.3)',
          border: '1px solid rgba(139,147,255,0.4)',
        } : {
          background: 'var(--glass-2)', color: 'var(--ink-80)',
          border: '1px solid var(--glass-border)',
          backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',
        }),
        ...style,
      }}
    >
      {children}
      {icon && <Icons.arrow size={16} />}
    </motion.a>
  )
}

/* Reusable aurora blob */
export function Aurora({ color, x, y, size = 480, opacity = 0.5, delay = 0 }) {
  return (
    <div className="aurora" style={{
      width: size, height: size, left: x, top: y, opacity,
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      animation: `auroraFloat ${16 + delay}s ease-in-out ${delay}s infinite`,
    }} />
  )
}

/* Shared header for sub-pages — aurora + dotted glow + animated title */
export function PageHero({ eyebrow, title, gradient, subtitle, children, accent = '#8b93ff' }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', paddingTop: 160, paddingBottom: 64, background: 'radial-gradient(120% 90% at 50% -20%, #0b1226 0%, #050810 60%, #04070f 100%)' }}>
      <div className="aurora" style={{ width: 640, height: 640, top: -280, left: '50%', marginLeft: -320, opacity: 0.42, background: `radial-gradient(circle, ${accent}, transparent 65%)` }} />
      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 820, textAlign: 'center' }}>
        <Reveal y={16}><Eyebrow color={accent}>{eyebrow}</Eyebrow></Reveal>
        <Reveal y={22} delay={0.06}>
          <h1 className="section-title" style={{ margin: '18px auto 18px', fontSize: 'clamp(34px,5.2vw,60px)' }}>
            {title} {gradient && <span className="gradient-text">{gradient}</span>}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal y={18} delay={0.12}>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: 'var(--ink-60)', maxWidth: 600, margin: '0 auto' }}>{subtitle}</p>
          </Reveal>
        )}
        {children && <Reveal y={16} delay={0.18}><div style={{ marginTop: 28 }}>{children}</div></Reveal>}
      </div>
    </section>
  )
}
