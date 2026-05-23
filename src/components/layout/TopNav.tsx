import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export type Tab = 'works' | 'info'

interface TopNavProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

const tabs: { id: Tab; label: string }[] = [
  { id: 'works', label: 'Work' },
  { id: 'info', label: 'Info' },
]

// ── Unique "scatter & snap" hamburger icon ──────────────────
function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.div
      className="relative flex size-5 flex-col items-center justify-center"
      animate={isOpen ? 'open' : 'closed'}
      // Subtle pop on every toggle
      whileTap={{ scale: 0.88 }}
    >
      {/* Top bar — bounces up briefly, then snaps to 45° */}
      <motion.span
        className="absolute h-[1.5px] w-5 rounded-full bg-current origin-center"
        style={{ top: '5px' }}
        variants={{
          closed: { rotate: 0, y: 0, scaleX: 1 },
          open: {
            rotate: [0, -22, 45],
            y: [0, -4, 6],
            scaleX: [1, 1.15, 1],
          },
        }}
        transition={{ duration: 0.42, times: [0, 0.38, 1], ease: 'easeInOut' }}
      />

      {/* Middle bar — shoots right and vanishes */}
      <motion.span
        className="absolute h-[1.5px] w-3.5 rounded-full bg-current origin-right"
        style={{ top: '50%', translateY: '-50%', right: 0 }}
        variants={{
          closed: { scaleX: 1, opacity: 1, x: 0 },
          open: { scaleX: 0, opacity: 0, x: 6 },
        }}
        transition={{ duration: 0.2, ease: 'easeIn' }}
      />

      {/* Bottom bar — bounces down briefly, then snaps to -45° */}
      <motion.span
        className="absolute h-[1.5px] w-5 rounded-full bg-current origin-center"
        style={{ bottom: '5px' }}
        variants={{
          closed: { rotate: 0, y: 0, scaleX: 1 },
          open: {
            rotate: [0, 22, -45],
            y: [0, 4, -6],
            scaleX: [1, 1.15, 1],
          },
        }}
        transition={{ duration: 0.42, times: [0, 0.38, 1], ease: 'easeInOut' }}
      />
    </motion.div>
  )
}

import { ArrowUpRight, Sun, Moon } from 'lucide-react'
import { useDarkMode } from '../../hooks/useDarkMode'

export function TopNav({ activeTab, onTabChange, sidebarOpen, onToggleSidebar }: TopNavProps) {
  const { isDark, toggleDarkMode } = useDarkMode()
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-20 bg-transparent">
      <div className="mx-auto flex h-full items-center justify-between px-6 md:px-12 pt-4">
        {/* Left — Brand/Name */}
        <div className="flex-1">
          <div className="flex flex-col">
            <span className="text-[14px] font-semibold text-black dark:text-white">Muhammad Ikhsan</span>
            <span className="text-[12px] font-normal text-[#8A8A8A]">Junior Web Developer</span>
          </div>
        </div>

        {/* Center — Tab pill & Hamburger */}
        <div className="flex shrink-0 items-center gap-2">
          <div className="relative flex items-center rounded-[9999px] border border-[#2A2A2A] bg-white/80 dark:bg-[#141414]/80 p-1 shadow-floating backdrop-blur-md">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  'relative min-w-[68px] rounded-[9999px] px-5 py-1.5 text-[13px] font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary',
                  activeTab === tab.id ? 'text-black dark:text-white' : 'text-[#8A8A8A] hover:text-black dark:text-white',
                )}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full bg-[#2A2A2A] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Bright top edge glow indicator */}
                    <div className="absolute top-0 left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  </motion.div>
                )}
                <span className="relative">{tab.label}</span>
              </button>
            ))}
          </div>

          <motion.button
            aria-label="Toggle dark mode"
            onClick={toggleDarkMode}
            whileTap={{ scale: 0.88 }}
            className={cn(
              'relative flex size-[38px] items-center justify-center rounded-full border shadow-floating backdrop-blur-md transition-all duration-300',
              'border-gray-300 dark:border-[#2A2A2A] bg-white/80 dark:bg-[#141414]/80 text-gray-500 dark:text-[#8A8A8A] hover:border-gray-400 dark:hover:border-[#3D3D3D] hover:text-black dark:hover:text-white'
            )}
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </motion.button>

          <motion.button
            aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={sidebarOpen}
            onClick={onToggleSidebar}
            className={cn(
              'relative flex size-[38px] items-center justify-center rounded-full border shadow-floating backdrop-blur-md transition-all duration-300',
              sidebarOpen
                ? 'border-brand-primary/40 bg-brand-primary/10 text-brand-primary'
                : 'border-[#2A2A2A] bg-white/80 dark:bg-[#141414]/80 text-[#8A8A8A] hover:border-[#3D3D3D] hover:text-black dark:text-white',
            )}
          >
            <HamburgerIcon isOpen={sidebarOpen} />
          </motion.button>
        </div>

        {/* Right — Links */}
        <div className="hidden flex-1 items-center justify-end gap-6 md:flex">
          <a href="https://linkedin.com/in/he1kousen" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[13px] font-medium text-black dark:text-white hover:text-[#8A8A8A] transition-colors">
            LinkedIn <ArrowUpRight className="size-3.5 text-[#8A8A8A]" />
          </a>
          <a href="#" className="flex items-center gap-1 text-[13px] font-medium text-black dark:text-white hover:text-[#8A8A8A] transition-colors">
            Resume <ArrowUpRight className="size-3.5 text-[#8A8A8A]" />
          </a>
        </div>
      </div>
    </header>
  )
}

