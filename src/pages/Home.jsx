import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import TrustBar from '../components/TrustBar'
import LiveEngine from '../components/LiveEngine'
import Journey from '../components/Journey'
import StackedReveal from '../components/StackedReveal'
import Bento from '../components/Bento'
import Metrics from '../components/Metrics'
import Specialties from '../components/Specialties'
import Testimonial from '../components/Testimonial'
import FAQ from '../components/FAQ'
import CTA from '../components/CTA'

const pageVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.45, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
}

export default function Home() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
      <Hero />
      <TrustBar />
      <LiveEngine />
      <Journey />
      <StackedReveal />
      <Bento />
      <Metrics />
      <Specialties />
      <Testimonial />
      <FAQ />
      <CTA />
    </motion.div>
  )
}
