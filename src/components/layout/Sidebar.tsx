import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useEffect } from 'react'
import { aboutInfo } from '../../data/about'
import { socials } from '../../data/socials'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const smoothEase = [0.16, 1, 0.3, 1] as const

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop dihilangkan agar halaman tetap bisa diklik */}

          {/* Drawer panel */}
          <motion.aside
            key="sidebar-panel"
            role="dialog"
            aria-label="Navigation menu"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.42, ease: smoothEase }}
            className="fixed left-0 top-0 bottom-0 z-[70] flex w-64 flex-col border-r border-[#2A2A2A] bg-[#0A0A0A]/70 px-8 py-10 backdrop-blur-lg"
          >
            {/* Subtle top glow */}
            {/* <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-brand-primary/5 to-transparent" /> */}

            {/* Name & Location */}
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.18, duration: 0.42, ease: smoothEase }}
              className="mt-4 space-y-1"
            >
              <h2 className="text-sm font-semibold text-white leading-snug">
                {aboutInfo.name}
              </h2>
              <p className="text-xs text-white/42 leading-relaxed">
                {aboutInfo.location}
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.24, duration: 0.38, ease: smoothEase }}
              className="my-6 h-px origin-left bg-[#3D3D3D]"
            />

            {/* Social links */}
            <nav aria-label="Social links" className="flex flex-col gap-3">
              {socials.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.28 + i * 0.07, duration: 0.38, ease: smoothEase }}
                  className="group inline-flex items-center gap-1 text-sm text-white/60 transition-colors duration-200 hover:text-white"
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  {social.label}
                  <ArrowUpRight
                    className="size-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.8}
                  />
                </motion.a>
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
