import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const FEATURED = {
  tag: 'Revenue Cycle',
  date: 'May 8, 2026',
  title: 'Why independent practices lose 23% of billable revenue — and how to stop it',
  excerpt:
    'The average independent practice collects less than 77 cents for every dollar they bill. The causes are well-known: under-coded visits, slow follow-up on denials, and claims that never get submitted at all. Here\'s what\'s really happening and what high-performing practices do differently.',
  readTime: '9 min read',
  category: 'Revenue Cycle',
}

const POSTS = [
  {
    tag: 'Coding',
    date: 'Apr 30, 2026',
    title: 'The ICD-10 coding errors that trigger the most denials in 2026',
    excerpt: 'BCBS and UnitedHealth updated their claim editing rules in January. We analyzed 180,000 denials to find the exact patterns that are costing practices the most money.',
    readTime: '7 min read',
  },
  {
    tag: 'Policy',
    date: 'Apr 22, 2026',
    title: 'Medicare\'s 2026 physician fee schedule: what changes and what it means for your revenue',
    excerpt: 'CMS finalized a 2.8% reduction in the conversion factor for 2026. Here\'s which specialties are hit hardest and what strategies high-volume practices are using to offset the cut.',
    readTime: '6 min read',
  },
  {
    tag: 'Practice Management',
    date: 'Apr 14, 2026',
    title: 'How to negotiate better rates with commercial payers as an independent practice',
    excerpt: 'You don\'t need a large group to negotiate. We interviewed 12 solo and small-group physicians who successfully renegotiated contracts in 2025 — here\'s their playbook.',
    readTime: '11 min read',
  },
  {
    tag: 'Denial Management',
    date: 'Apr 7, 2026',
    title: 'A step-by-step guide to writing a denial appeal that actually gets paid',
    excerpt: 'Most appeal letters fail because they re-state the claim rather than address the denial reason. Here\'s the structure that gets results — with annotated examples for CO-4, CO-97, and PR-96.',
    readTime: '8 min read',
  },
  {
    tag: 'Technology',
    date: 'Mar 28, 2026',
    title: 'What large language models actually get right (and wrong) about medical coding',
    excerpt: 'We ran 12,000 encounters through five AI coding systems and compared their output to certified coders. The results are more nuanced than the vendor claims.',
    readTime: '13 min read',
  },
  {
    tag: 'Compliance',
    date: 'Mar 19, 2026',
    title: 'HIPAA enforcement trends in 2026: what\'s changed and what practices need to know',
    excerpt: 'OCR issued 38 enforcement actions in Q1 2026 alone. The common thread across most of them isn\'t what you\'d expect — it\'s not data breaches, it\'s documentation failures.',
    readTime: '5 min read',
  },
]

const tagColors = {
  'Revenue Cycle': { bg: 'rgba(99,102,241,0.12)', color: '#818cf8' },
  Coding: { bg: 'rgba(14,165,233,0.12)', color: '#38bdf8' },
  Policy: { bg: 'rgba(245,158,11,0.12)', color: '#fbbf24' },
  'Practice Management': { bg: 'rgba(16,185,129,0.12)', color: '#34d399' },
  'Denial Management': { bg: 'rgba(239,68,68,0.12)', color: '#f87171' },
  Technology: { bg: 'rgba(168,85,247,0.12)', color: '#c084fc' },
  Compliance: { bg: 'rgba(251,146,60,0.12)', color: '#fb923c' },
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
}

function Tag({ label }) {
  const style = tagColors[label] || { bg: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }
  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, background: style.bg, color: style.color, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
      {label}
    </span>
  )
}

export default function BlogPage() {
  const gridRef = useRef(null)
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' })

  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit" style={{ paddingTop: 64 }}>
      {/* Header */}
      <div style={{ background: 'var(--surface)', padding: '80px 0 64px', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: 720, textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--indigo-pale)', marginBottom: 16 }}>Lumen Journal</div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginBottom: 16 }}>
            Insights for independent practices
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
            Revenue cycle strategy, coding updates, payer policy changes, and practice management — from our team to yours.
          </p>
        </div>
      </div>

      <div style={{ background: 'var(--bg)', padding: '80px 0 120px' }}>
        <div className="container">
          {/* Featured post */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20,
              padding: 48, marginBottom: 56, position: 'relative', overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' }}>
                <Tag label={FEATURED.tag} />
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>{FEATURED.date}</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>·</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>{FEATURED.readTime}</span>
              </div>
              <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: 16, maxWidth: 640 }}>
                {FEATURED.title}
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.52)', maxWidth: 600, marginBottom: 24 }}>
                {FEATURED.excerpt}
              </p>
              <a href="#" style={{ fontSize: 14, fontWeight: 700, color: 'var(--indigo-pale)', display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
                Read article <span style={{ fontSize: 18 }}>→</span>
              </a>
            </div>
          </motion.div>

          {/* Post grid */}
          <motion.div
            ref={gridRef}
            initial="hidden"
            animate={gridInView ? 'visible' : 'hidden'}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}
          >
            {POSTS.map(post => <PostCard key={post.title} post={post} />)}
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            style={{
              marginTop: 80, background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 20, padding: 48, textAlign: 'center',
            }}
          >
            <h3 style={{ fontSize: 24, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 12 }}>Stay ahead of payer policy changes</h3>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', marginBottom: 28 }}>
              New articles every week. No noise, no spam — just what matters for independent practices.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', maxWidth: 400, margin: '0 auto' }}>
              <input
                type="email"
                placeholder="you@yourpractice.com"
                style={{
                  flex: 1, padding: '12px 16px', borderRadius: 10, fontSize: 14,
                  background: 'var(--bg)', border: '1px solid var(--border)',
                  color: '#fff', outline: 'none',
                }}
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '12px 20px', borderRadius: 10, fontSize: 14, fontWeight: 700,
                  background: 'var(--indigo-mid)', color: '#fff', border: 'none', cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

function PostCard({ post }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
      whileHover={{ y: -4, borderColor: 'rgba(99,102,241,0.35)' }}
      style={{
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 28,
        cursor: 'pointer', transition: 'border-color 0.25s',
      }}
    >
      <div style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'center' }}>
        <Tag label={post.tag} />
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)' }}>{post.readTime}</span>
      </div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: 10 }}>{post.title}</h3>
      <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.45)', marginBottom: 20 }}>{post.excerpt}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>{post.date}</span>
        <a href="#" style={{ fontSize: 13, fontWeight: 600, color: 'var(--indigo-pale)', textDecoration: 'none' }}>Read →</a>
      </div>
    </motion.div>
  )
}
