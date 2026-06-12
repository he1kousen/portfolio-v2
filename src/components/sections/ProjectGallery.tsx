import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { projects, type Project } from '../../data/projects'
import { ProjectDetailModal } from './ProjectDetailModal'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export function ProjectGallery() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="projects-list" className="py-12">
      {/* Section Header */}
      <div className="mb-16 text-center">
        {/* <h2 className="mb-3 text-3xl font-bold tracking-tight text-[#f5f5f5] sm:text-4xl">
          My Projects
        </h2> */}
        {/* <p className="text-[14px] text-[#888888] sm:text-[15px]">
          
        </p> */}
      </div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 gap-12"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            role="button"
            tabIndex={0}
            variants={cardVariants}
            className="group relative flex flex-col rounded-2xl border border-[#222222] bg-[#111111] p-4 sm:p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#F9BD4E] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_8px_30px_rgba(0,0,0,0.5)] cursor-pointer text-left"
          >
            {/* Number Badge */}
            <div className="absolute left-8 top-8 z-10 flex size-8 items-center justify-center rounded-full bg-[#1a1a1a] border border-[#2a2a2a] text-[13px] font-medium text-white/80 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] transition-all duration-250 group-hover:bg-[#F9BD4E] group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)] group-hover:text-black group-hover:scale-110">
              {index + 1}
            </div>

            {/* Thumbnail */}
            <div className="relative mb-6 sm:mb-8 aspect-[16/9] md:aspect-[2/1] lg:aspect-[21/9] w-full overflow-hidden rounded-xl bg-[#1a1a1a]">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col sm:flex-row sm:items-start justify-between gap-6 px-2">
              <div className="flex-1 max-w-3xl">
                {/* Company / Brand Logo */}
                {project.companyLogo && (
                  <div className="mb-4 h-6">
                    {typeof project.companyLogo === 'string' ? (
                      <img src={project.companyLogo} alt={`${project.title} brand`} className="h-full w-auto object-contain object-left opacity-80 transition-opacity group-hover:opacity-100" />
                    ) : (
                      <div className="h-full w-auto text-white/80 transition-colors group-hover:text-white">
                        {project.companyLogo}
                      </div>
                    )}
                  </div>
                )}
                <h3 className="mb-3 text-[22px] font-semibold text-[#f5f5f5] group-hover:text-[#F9BD4E] transition-colors">{project.title}</h3>
                <p className="mb-6 text-[15px] font-light leading-relaxed text-[#888888]">
                  {project.description}
                </p>

                {/* Stack Badges */}
                <div className="mt-auto flex flex-wrap gap-3">
                  {project.stack.map((tech) => (
                    <img
                      key={tech.name}
                      src={tech.logo}
                      alt={tech.name}
                      title={tech.name}
                      className="h-6 w-6 object-contain opacity-75 transition-opacity group-hover:opacity-100"
                    />
                  ))}
                </div>
              </div>

              {/* CTA Link */}
              <div className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.1em] text-[#888888] transition-colors group-hover:text-[#F9BD4E] sm:mt-2 shrink-0 pt-2 sm:pt-0">
                View Details
                <ArrowRight className="size-4 transition-transform duration-250 group-hover:translate-x-1" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
