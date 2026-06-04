import { useState } from 'react'
import { motion } from 'framer-motion'
import { Icons, Reveal, PageHero, EASE } from '../components/_shared'

const FEATURED = {
  tag: 'Revenue Cycle', date: 'May 8, 2026',
  title: 'Why independent practices lose 23% of billable revenue — and how to stop it',
  excerpt: 'The average independent practice collects less than 77 cents for every dollar they bill. The causes are well-known: under-coded visits, slow follow-up on denials, and claims that never get submitted at all. Here’s what’s really happening and what high-performing practices do differently.',
  readTime: '9 min read',
}

const POSTS = [
  { tag: 'Coding', date: 'Apr 30, 2026', title: 'The ICD-10 coding errors that trigger the most denials in 2026', excerpt: 'BCBS and UnitedHealth updated their claim editing rules in January. We analyzed 180,000 denials to find the exact patterns costing practices the most money.', readTime: '7 min read' },
  { tag: 'Policy', date: 'Apr 22, 2026', title: "Medicare's 2026 physician fee schedule: what changes and what it means for your revenue", excerpt: 'CMS finalized a 2.8% reduction in the conversion factor for 2026. Here’s which specialties are hit hardest and how high-volume practices are offsetting the cut.', readTime: '6 min read' },
  { tag: 'Practice Management', date: 'Apr 14, 2026', title: 'How to negotiate better rates with commercial payers as an independent practice', excerpt: "You don't need a large group to negotiate. We interviewed 12 solo and small-group physicians who renegotiated contracts in 2025 — here’s their playbook.", readTime: '11 min read' },
  { tag: 'Denial Management', date: 'Apr 7, 2026', title: 'A step-by-step guide to writing a denial appeal that actually gets paid', excerpt: 'Most appeal letters fail because they re-state the claim rather than address the denial reason. Here’s the structure that gets results — with annotated examples.', readTime: '8 min read' },
  { tag: 'Technology', date: 'Mar 28, 2026', title: 'What large language models actually get right (and wrong) about medical coding', excerpt: 'We ran 12,000 encounters through five AI coding systems and compared output to certified coders. The results are more nuanced than the vendor claims.', readTime: '13 min read' },
  { tag: 'Compliance', date: 'Mar 19, 2026', title: "HIPAA enforcement trends in 2026: what's changed and what practices need to know", excerpt: 'OCR issued 38 enforcement actions in Q1 2026 alone. The common thread isn’t what you’d expect — it’s not data breaches, it’s documentation failures.', readTime: '5 min read' },
]

const tagColors = {
  'Revenue Cycle': '#818cf8',
  Coding: '#38bdf8',
  Policy: '#fbbf24',
  'Practice Management': '#34d399',
  'Denial Management': '#f87171',
  Technology: '#22d3ee',
  Compliance: '#fb923c',
}

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
}

function Tag({ label }) {
  const c = tagColors[label] || 'rgba(255,255,255,0.5)'
  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, background: `${c}1f`, color: c, border: `1px solid ${c}3a`, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</span>
  )
}

export default function BlogPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
      <PageHero
        eyebrow="Relio Journal"
        title="Insights for"
        gradient="independent practices."
        subtitle="Revenue cycle strategy, coding updates, payer policy changes, and practice management — from our team to yours."
        accent="#38bdf8"
      />

      <div style={{ background: '#04070f', padding: '40px 0 120px' }}>
        <div className="container-wide">
          {/* Featured */}
          <Reveal y={28}>
            <motion.a href="#" whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              className="glass-2 glass-sheen" style={{ position: 'relative', display: 'block', borderRadius: 24, padding: 'clamp(28px,4vw,48px)', marginBottom: 48, overflow: 'hidden' }}>
              <div className="aurora" style={{ width: 360, height: 360, top: -160, right: -100, opacity: 0.18, background: 'radial-gradient(circle,#818cf8,transparent 65%)' }} />
              <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                  <Tag label={FEATURED.tag} />
                  <span style={{ fontSize: 13, color: 'var(--ink-30)' }}>{FEATURED.date} · {FEATURED.readTime}</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(22px,2.8vw,32px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.2, marginBottom: 16, maxWidth: 680 }}>{FEATURED.title}</h2>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--ink-60)', maxWidth: 620, marginBottom: 24 }}>{FEATURED.excerpt}</p>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#8b93ff', display: 'inline-flex', alignItems: 'center', gap: 7 }}>Read article <Icons.arrow size={16} /></span>
              </div>
            </motion.a>
          </Reveal>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(330px,1fr))', gap: 20 }}>
            {POSTS.map((post, i) => (
              <Reveal key={post.title} delay={(i % 3) * 0.07} y={24} style={{ display: 'flex' }}>
                <motion.a href="#" whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="glass glass-sheen" style={{ position: 'relative', display: 'flex', flexDirection: 'column', borderRadius: 18, padding: 26, width: '100%' }}>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'center' }}>
                    <Tag label={post.tag} />
                    <span style={{ fontSize: 12, color: 'var(--ink-30)' }}>{post.readTime}</span>
                  </div>
                  <h3 style={{ fontSize: 16.5, fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: 10 }}>{post.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-45)', marginBottom: 20, flex: 1 }}>{post.excerpt}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: 'var(--ink-30)' }}>{post.date}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#8b93ff', display: 'inline-flex', alignItems: 'center', gap: 5 }}>Read <Icons.arrow size={13} /></span>
                  </div>
                </motion.a>
              </Reveal>
            ))}
          </div>

          {/* Newsletter */}
          <Reveal y={24}>
            <div className="glass-2 glass-sheen" style={{ position: 'relative', marginTop: 64, borderRadius: 24, padding: 'clamp(32px,4vw,52px)', textAlign: 'center', overflow: 'hidden' }}>
              <div className="aurora" style={{ width: 420, height: 280, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.16, background: 'radial-gradient(ellipse,#22d3ee,transparent 65%)' }} />
              <div style={{ position: 'relative' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(22px,2.6vw,30px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', marginBottom: 12 }}>Stay ahead of payer policy changes</h3>
                <p style={{ fontSize: 15, color: 'var(--ink-45)', marginBottom: 28 }}>New articles every week. No noise, no spam — just what matters for independent practices.</p>
                <form onSubmit={e => { e.preventDefault(); if (email) setSent(true) }} style={{ display: 'flex', gap: 10, justifyContent: 'center', maxWidth: 440, margin: '0 auto', flexWrap: 'wrap' }}>
                  <label htmlFor="nl-email" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Email address</label>
                  <input id="nl-email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@yourpractice.com" required
                    style={{ flex: '1 1 220px', padding: '13px 16px', borderRadius: 11, fontSize: 14, background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: '#fff', outline: 'none' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.6)'} onBlur={e => e.target.style.borderColor = 'var(--glass-border)'} />
                  <motion.button type="submit" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                    style={{ padding: '13px 22px', borderRadius: 11, fontSize: 14, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', background: 'linear-gradient(135deg,#6366f1,#4f46e5 60%,#0891b2)', border: '1px solid rgba(139,147,255,0.4)', boxShadow: '0 6px 20px rgba(99,102,241,0.4)' }}>
                    {sent ? 'Subscribed ✓' : 'Subscribe'}
                  </motion.button>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </motion.div>
  )
}
