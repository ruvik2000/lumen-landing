import { useState, useEffect, lazy, Suspense } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { DottedBackground } from './DottedBackground'

const DottedSurface = lazy(() =>
  import('./DottedSurface').then(m => ({ default: m.DottedSurface }))
)

// ── Animation constants ──────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1]

const wordStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
}
const wordVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

// ── Title ────────────────────────────────────────────────────────
const TITLE_WORDS = ['The', 'billing', 'partner', 'your', 'practice', 'wants.']
const GRADIENT_WORDS = new Set(['billing', 'partner'])

// ── Social proof ─────────────────────────────────────────────────
const AVATARS = [
  { t: 'SC', bg: 'rgba(99,102,241,0.32)',  c: '#a5b4fc' },
  { t: 'MJ', bg: 'rgba(16,185,129,0.28)',  c: '#6ee7b7' },
  { t: 'PK', bg: 'rgba(245,158,11,0.24)',  c: '#fcd34d' },
  { t: 'LR', bg: 'rgba(239,68,68,0.22)',   c: '#fca5a5' },
]

// ── EHR Marquee ──────────────────────────────────────────────────
const EMRS = ['Athenahealth', 'eClinicalWorks', 'NextGen', 'AdvancedMD', 'DrChrono', 'Elation Health', 'Greenway Health', 'Practice Fusion', 'Office Ally']

function EmrMarquee() {
  const doubled = [...EMRS, ...EMRS]
  return (
    <div style={{ overflow: 'hidden', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
      <motion.div
        animate={{ x: [0, -50 * EMRS.length] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', whiteSpace: 'nowrap' }}
      >
        {doubled.map((emr, i) => (
          <span key={i} style={{ fontSize: 12.5, fontWeight: 500, color: 'rgba(255,255,255,0.22)', padding: '0 24px', whiteSpace: 'nowrap' }}>
            {emr}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ── Pill stats ───────────────────────────────────────────────────
const STATS = [
  { value: '50,000+',   label: 'Claims processed' },
  { value: '98.7%',     label: 'First-pass acceptance' },
  { value: '< 2 weeks', label: 'To go live' },
  { value: '500+',      label: 'Payers supported' },
]

// ── Hero ─────────────────────────────────────────────────────────
export default function Hero() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      style={{
        background: 'linear-gradient(160deg, #020711 0%, #060c1c 50%, #0b0920 100%)',
        minHeight: '100vh', paddingTop: 64,
        display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
      }}
      aria-label="Hero"
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>

      {/* Layer 0 — static SVG dot grid with edge vignette (renders below the animated wave) */}
      <DottedBackground
        dotColor="rgba(99,102,241,0.2)"
        backgroundColor="transparent"
        dotSize={1.5}
        dotSpacing={22}
        enableVignette={true}
        vignetteColor="rgb(2,7,17)"
        enableInnerGlow={false}
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      />

      {/* Layer 1 — Three.js animated dot-wave surface (lazy-loaded; sits above SVG grid) */}
      {!prefersReduced && (
        <Suspense fallback={null}>
          <DottedSurface />
        </Suspense>
      )}

      {/* Radial center glow — lifts focal point, dims edges */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: '-8%', left: '50%',
          width: '100%', paddingBottom: '85%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.14) 0%, transparent 52%)',
          filter: 'blur(32px)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      {/* Bottom scene fade */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '28%',
          background: 'linear-gradient(to top, rgba(2,7,17,0.96) 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      {/* ─── Main content — centered single column ─── */}
      <div
        className="container"
        style={{
          paddingTop: 108, paddingBottom: 72,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          textAlign: 'center',
          position: 'relative', zIndex: 1, flex: 1,
        }}
      >

        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '5px 16px', background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.28)', borderRadius: 100,
            fontSize: 11, fontWeight: 700, color: '#a5b4fc',
            letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 36,
            backdropFilter: 'blur(12px)',
          }}
        >
          <span style={{ position: 'relative', width: 8, height: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <motion.span
              animate={{ scale: [1, 2.6], opacity: [0.6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#6ee7b7' }}
            />
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6ee7b7', position: 'relative', flexShrink: 0 }} />
          </span>
          AI-Native Medical Billing
        </motion.div>

        {/* Headline — large, centered, word-stagger */}
        <motion.h1
          variants={wordStagger}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(44px, 6.8vw, 88px)',
            fontWeight: 900, letterSpacing: '-0.035em',
            lineHeight: 1.04, color: '#fff',
            marginBottom: 28, maxWidth: 800,
          }}
        >
          {TITLE_WORDS.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariant}
              style={{ display: 'inline-block', marginRight: '0.22em' }}
            >
              {GRADIENT_WORDS.has(word)
                ? <span className="gradient-text">{word}</span>
                : word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.58, duration: 0.6, ease: EASE }}
          style={{
            fontSize: 18, lineHeight: 1.78,
            color: 'rgba(255,255,255,0.56)',
            marginBottom: 40, maxWidth: 540,
          }}
        >
          Lumen manages coding, claims, and appeals from start to finish.
          You focus on patients — we handle the billing.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72, duration: 0.55, ease: EASE }}
          style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 16 }}
        >
          <motion.a
            href="#cta"
            whileHover={{ scale: 1.04, boxShadow: '0 20px 48px rgba(99,102,241,0.62)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: 'linear-gradient(135deg, #5b5fc7 0%, #6366f1 50%, #818cf8 100%)',
              color: '#fff', fontSize: 15, fontWeight: 700,
              padding: '14px 32px', borderRadius: 10,
              display: 'inline-flex', alignItems: 'center', gap: 8,
              cursor: 'pointer', textDecoration: 'none',
              boxShadow: '0 8px 28px rgba(99,102,241,0.44)',
              border: '1px solid rgba(129,140,248,0.25)',
              letterSpacing: '-0.1px',
            }}
          >
            Book a free audit
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>

          <motion.a
            href="#deep-dive"
            whileHover={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.38)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.8)',
              fontSize: 15, fontWeight: 600, padding: '14px 28px',
              borderRadius: 10, display: 'inline-flex', alignItems: 'center',
              border: '1.5px solid rgba(255,255,255,0.14)',
              transition: 'background 0.2s, border-color 0.2s',
              cursor: 'pointer', textDecoration: 'none',
            }}
          >
            See how it works
          </motion.a>
        </motion.div>

        {/* No-friction micro-copy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.86, duration: 0.5 }}
          style={{ fontSize: 12, color: 'rgba(255,255,255,0.24)', marginBottom: 52 }}
        >
          No setup fee · No long-term contracts · Go live in 10 days
        </motion.p>

        {/* Social proof strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.5, ease: EASE }}
          style={{ display: 'flex', alignItems: 'center', gap: 14 }}
        >
          {/* Overlapping avatars */}
          <div style={{ display: 'flex' }} role="img" aria-label="Customer avatars">
            {AVATARS.map((av, idx) => (
              <div
                key={idx}
                style={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: av.bg, border: '2.5px solid #060c1c',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 9, fontWeight: 800, color: av.c,
                  marginLeft: idx === 0 ? 0 : -10,
                  position: 'relative', zIndex: AVATARS.length - idx,
                }}
              >
                {av.t}
              </div>
            ))}
          </div>

          {/* Trust text + stars */}
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>
              Trusted by 200+ independent practices
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 3 }}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#fbbf24" aria-hidden="true">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
              ))}
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.33)', marginLeft: 4 }}>4.9 / 5.0</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ─── Stats bar ─── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.65, ease: EASE }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.055)',
            padding: '22px 0',
            background: 'rgba(255,255,255,0.012)',
          }}
        >
          <div className="container" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {STATS.map((stat, i, arr) => (
              <div
                key={i}
                style={{
                  textAlign: 'center', padding: '4px 48px',
                  borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.055)' : 'none',
                }}
              >
                <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.32)', marginTop: 4, fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EHR marquee */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.04)',
            padding: '16px 0',
            background: 'rgba(0,0,0,0.18)',
          }}
        >
          <div className="container">
            <div style={{ fontSize: 10.5, fontWeight: 600, color: 'rgba(255,255,255,0.17)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10, textAlign: 'center' }}>
              EHRs we integrate with
            </div>
            <EmrMarquee />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
