import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import About from '../components/About'
import Services from '../components/Services'
import DeepDive from '../components/DeepDive'
import Features from '../components/Features'
import Payers from '../components/Payers'
import BuiltFor from '../components/BuiltFor'
import HomeFAQ from '../components/HomeFAQ'
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
      <Stats />
      <About />
      <Services />
      <DeepDive />
      <Features />
      <Payers />
      <BuiltFor />
      <HomeFAQ />
      <CTA />
    </motion.div>
  )
}
