import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Footer } from './components/layout/Footer'
import { Sidebar } from './components/layout/Sidebar'
import { TopNav, type Tab } from './components/layout/TopNav'
import { InfoPage } from './pages/InfoPage'
import { WorksPage } from './pages/WorksPage'

const pageVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.25, ease: 'easeIn' as const },
  },
}

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('works')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
  }

  return (
    <div
      className="relative min-h-screen overflow-x-clip text-white flex flex-col"
      style={{ background: '#0A0A0A' }}
    >
      {/* Ambient Top Light */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] w-full bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05)_0%,transparent_70%)]" />

      {/* Sidebar overlay — portal-like, sits above everything */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Fixed top nav */}
      <TopNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      />

      {/* Full-width content area */}
      <main className="relative z-[1] flex-1 pt-14 overflow-x-clip">
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
          {activeTab === 'works' ? (
            <motion.div
              key="works"
              variants={pageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <WorksPage onNavigateInfo={() => handleTabChange('info')} />
            </motion.div>
          ) : (
            <motion.div
              key="info"
              variants={pageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <InfoPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />

    </div>
  )
}

export default App
