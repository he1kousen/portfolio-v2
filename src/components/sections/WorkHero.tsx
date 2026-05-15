import { motion, type Variants } from 'framer-motion'
import { ArrowRight, UserCircle, ChevronDown } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'

/* ── Typewriter config ──────────────────────────────────────────────── */
const ROLES = [
  'Software Engineer.',
  'Tech Enthusiast.',
  'Gaming Addict.',
  'Music Enjoyer.',
]

const TYPE_SPEED = 70        // ms per character typing
const DELETE_SPEED = 40      // ms per character deleting
const PAUSE_AFTER_TYPE = 2200 // ms to hold the full word
const PAUSE_AFTER_DELETE = 400 // ms before typing next word

/* ── Typewriter hook ────────────────────────────────────────────────── */
function useTypewriter(words: string[]) {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const currentWord = words[wordIndex]

  const tick = useCallback(() => {
    if (!isDeleting) {
      // Typing
      if (displayed.length < currentWord.length) {
        return { next: displayed + currentWord[displayed.length], delay: TYPE_SPEED }
      }
      // Finished typing → pause then delete
      return { next: displayed, delay: PAUSE_AFTER_TYPE, startDelete: true }
    }
    // Deleting
    if (displayed.length > 0) {
      return { next: displayed.slice(0, -1), delay: DELETE_SPEED }
    }
    // Finished deleting → move to next word
    return { next: '', delay: PAUSE_AFTER_DELETE, nextWord: true }
  }, [displayed, isDeleting, currentWord])

  useEffect(() => {
    const result = tick()
    const timeout = setTimeout(() => {
      setDisplayed(result.next)
      if (result.startDelete) setIsDeleting(true)
      if (result.nextWord) {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
      }
    }, result.delay)
    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, wordIndex, tick, words.length])

  return displayed
}

/* ── Component ──────────────────────────────────────────────────────── */
export function WorkHero({ onNavigateInfo }: { onNavigateInfo: () => void }) {
  const typed = useTypewriter(ROLES)

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects-list')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative flex min-h-[420px] flex-col items-center justify-center px-4 py-20 text-center sm:min-h-[500px] sm:py-24"
    >


      {/* ── Line 1: Name ─────────────────────────────────── */}
      <motion.h1
        variants={itemVariants}
        className="relative mb-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-[58px] md:leading-[1]"
      >
        I'm{' '}
        <span className="text-white text-glow-white">
          he1kousen
        </span>
      </motion.h1>

      {/* ── Line 2: Typewriter role ──────────────────────── */}
      <motion.p
        variants={itemVariants}
        className="relative mb-10 flex flex-wrap items-center justify-center gap-x-2 text-lg text-white/60 sm:text-xl md:text-2xl"
      >
        <span>and i'm a</span>
        <span className="relative inline-flex min-w-[180px] justify-start sm:min-w-[240px]">
          <span className="font-semibold text-white">
            {typed}
          </span>
          {/* Blinking cursor */}
          <span className="ml-px inline-block h-[1.15em] w-[2px] translate-y-[0.05em] animate-blink bg-white" />
        </span>
      </motion.p>

      {/* ── CTA buttons ──────────────────────────────────── */}
      <motion.div variants={itemVariants} className="relative flex gap-3">
        {/* Primary CTA */}
        <button
          onClick={handleScrollToProjects}
          className="group flex items-center gap-2 rounded-full border border-[rgba(242,242,242,0.1)] bg-white/5 px-5 py-3 text-[14px] font-medium text-white shadow-floating transition-all duration-300 hover:bg-white/10 hover:shadow-elevated"
        >
          Browse Projects
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>

        {/* Secondary CTA */}
        <button
          onClick={onNavigateInfo}
          className="flex items-center gap-2 rounded-full border border-[rgba(242,242,242,0.1)] bg-transparent px-5 py-3 text-[14px] font-medium text-white/70 transition-all duration-300 hover:bg-white/5 hover:text-white"
        >
          <UserCircle className="size-4" />
          About Me
        </button>
      </motion.div>

      {/* ── Scroll Down Indicator ────────────────────────── */}
      <motion.div
        variants={itemVariants}
        className="mt-20 flex flex-col items-center gap-2 cursor-pointer opacity-50 transition-opacity hover:opacity-100"
        onClick={handleScrollToProjects}
      >
        {/* <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#888888]">
          Scroll Down
        </span> */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="size-4 text-[#888888]" />
        </motion.div>
      </motion.div>

      {/* Subtle bottom divider */}
      <motion.div
        variants={itemVariants}
        className="absolute bottom-0 left-1/2 h-px w-full max-w-[600px] -translate-x-1/2"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #3D3D3D 50%, transparent 100%)',
        }}
      />
    </motion.div>
  )
}
