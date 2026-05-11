import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import FAQPage from './pages/FAQPage'
import ComparePage from './pages/ComparePage'
import BlogPage from './pages/BlogPage'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Nav />
      <AnimatedRoutes />
      <Footer />
    </HashRouter>
  )
}
