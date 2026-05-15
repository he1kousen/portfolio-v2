import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { type Project } from '../../data/projects'

interface ProjectDetailModalProps {
  project: Project
  onClose: () => void
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Menggabungkan gambar utama dengan gambar di gallery
  const carouselImages = [project.image, ...(project.gallery || [])]

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1))
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1))
  }

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center pointer-events-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container */}
      <motion.div
        initial={{ y: '100%', opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: '100%', opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl sm:rounded-2xl border border-[#2A2A2A] bg-[#0E0E0E] shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex size-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-white/20"
        >
          <X className="size-5" />
        </button>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          {/* Header Image Carousel */}
          <div className="relative h-64 sm:h-[420px] w-full overflow-hidden group bg-[#111111]">
            <AnimatePresence initial={false}>
              <motion.img
                key={currentImageIndex}
                src={carouselImages[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/20 to-transparent pointer-events-none" />

            {/* Carousel Controls */}
            {carouselImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 flex size-10 sm:size-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md opacity-100 sm:opacity-0 transition-all sm:group-hover:opacity-100 hover:bg-white/20 hover:scale-110"
                >
                  <ChevronLeft className="size-6 sm:size-8" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 flex size-10 sm:size-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md opacity-100 sm:opacity-0 transition-all sm:group-hover:opacity-100 hover:bg-white/20 hover:scale-110"
                >
                  <ChevronRight className="size-6 sm:size-8" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 z-10">
                  {carouselImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentImageIndex(idx)
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-6 bg-[#F9BD4E]' : 'w-1.5 bg-white/50 hover:bg-white/80'
                        }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="px-6 pb-20 pt-8 sm:px-12 sm:pt-12">
            {/* Title & Brand */}
            <div className="mb-8">
              {project.companyLogo && (
                <div className="mb-4 h-8">
                  {typeof project.companyLogo === 'string' ? (
                    <img src={project.companyLogo} alt={`${project.title} brand`} className="h-full w-auto object-contain object-left" />
                  ) : (
                    <div className="h-full w-auto text-white">
                      {project.companyLogo}
                    </div>
                  )}
                </div>
              )}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                  {project.title}
                </h2>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F9BD4E] px-6 py-2.5 text-[13px] font-bold text-black transition-transform hover:scale-105 sm:w-auto w-full"
                >
                  View Site
                  <ArrowUpRight className="size-4" />
                </a>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-1.5 text-[12px] font-mono text-[#a0a0a0] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Description / Content */}
            <div className="mb-12 space-y-6">
              {project.content ? (
                project.content.map((paragraph, idx) => (
                  <p key={idx} className="text-[15px] sm:text-[16px] leading-[1.8] text-[#cccccc]">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-[15px] sm:text-[16px] leading-[1.8] text-[#cccccc]">
                  {project.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
