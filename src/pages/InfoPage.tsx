import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { aboutInfo } from '../data/about'
import { certifications } from '../data/certifications'
import { education } from '../data/education'
import { experiences } from '../data/experiences'
import { skillCategories } from '../data/skills'
import { socials } from '../data/socials'

const smoothEase = [0.16, 1, 0.3, 1] as const

const sectionReveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: smoothEase } },
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
        <span className="size-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
        {children}
      </span>
      <div className="flex-1 h-px bg-[#3D3D3D]/0" /> {/* Transparent to match image which has no line */}
    </div>
  )
}

function SkillBadge({ label, icon, viewBox }: { label: string; icon?: string; viewBox?: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-[8px] border border-[#3D3D3D] bg-bg-secondary px-3 py-1.5 text-[13px] font-medium text-white/70 transition-colors duration-200 hover:border-white/20 hover:text-white">
      {icon && (
        <svg
          className="size-4 shrink-0 fill-current"
          viewBox={viewBox || '0 0 24 24'}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={icon} />
        </svg>
      )}
      {label}
    </span>
  )
}

export function InfoPage() {
  const reduceMotion = useReducedMotion()
  const revealProps = reduceMotion
    ? { initial: false, whileInView: 'visible' as const }
    : { initial: 'hidden' as const, whileInView: 'visible' as const }

  return (
    <div className="mx-auto max-w-[1000px] px-5 pb-24 pt-28 sm:px-8">

      {/* ── ABOUT ME ─────────────────────────────────────────── */}
      <motion.div
        variants={sectionReveal}
        viewport={{ once: true, amount: 0.3 }}
        {...revealProps}
        className="pb-16"
      >
        <SectionLabel>About Me</SectionLabel>

        <h1 className="relative mb-16 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight text-white text-glow-white sm:text-[58px]">
          I build scalable systems for real business operations.
        </h1>

        <div className="h-px w-full bg-[#3D3D3D] mb-12" />

        <div className="grid gap-12 sm:grid-cols-[280px_1fr]">
          {/* Left Column: Personal details & Socials */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-[14px] font-semibold text-[#F9BD4E]">{aboutInfo.name}</p>
              <p className="mt-1 text-[13px] text-white/50">{aboutInfo.location}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="group flex items-center gap-1 text-[13px] font-medium text-white/80 hover:text-white transition-colors"
                >
                  {social.label}
                  <ArrowUpRight className="size-3 text-[#F9BD4E]" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Bio */}
          <div className="space-y-6">
            {aboutInfo.bio.map((paragraph, i) => (
              <p key={i} className="text-[15px] leading-[1.8] text-white/70 max-w-2xl">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </motion.div>


      {/* ── Technical Skills ────────────────────────────── */}
      <motion.div
        variants={sectionReveal}
        viewport={{ once: true, amount: 0.2 }}
        {...revealProps}
        className="py-12"
      >
        <div className="mb-12 flex items-center gap-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
            TECHNICAL SKILL
          </span>
          <div className="flex-1 h-px bg-[#3D3D3D]" />
        </div>

        <div className="grid gap-x-12 gap-y-16 sm:grid-cols-2">
          {skillCategories.map((category) => (
            <div key={category.label}>
              <p className="mb-4 text-[14px] font-semibold text-white/90">{category.label}</p>
              <div className="flex flex-wrap gap-2.5">
                {category.items.map((item) => (
                  <SkillBadge key={item.label} label={item.label} icon={item.icon} viewBox={item.viewBox} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>


      {/* ── Work Experience ──────────────────────────────── */}
      <motion.div
        variants={sectionReveal}
        viewport={{ once: true, amount: 0.15 }}
        {...revealProps}
        className="py-16 mt-8"
      >
        <div className="mb-12 flex items-center gap-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
            WORK EXPERIENCE
          </span>
          <div className="flex-1 border-t border-dashed border-[#3D3D3D]" />
        </div>

        <div className="relative">
          {/* Vertical dashed line */}
          <div className="absolute left-[11px] sm:left-[220px] top-2 bottom-0 w-px border-l border-dashed border-[#3D3D3D] sm:-translate-x-1/2 z-0" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease: smoothEase, delay: index * 0.08 }}
                className="relative z-10 grid gap-4 sm:gap-0 sm:grid-cols-[220px_minmax(0,1fr)]"
              >
                {/* Left: date + location */}
                <div className="relative pl-8 sm:pl-0 sm:pr-10">
                  {/* Glowing dot */}
                  <div className="absolute left-[11px] sm:left-auto sm:right-0 top-1.5 -translate-x-1/2 sm:translate-x-1/2 size-[7px] rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                  
                  <p className="text-[14px] font-semibold text-[#F9BD4E] leading-snug">
                    {exp.period}
                  </p>
                  <p className="mt-1 text-[13px] text-white/50 leading-relaxed">
                    {exp.location}
                  </p>
                </div>

                {/* Right: content */}
                <div className="pl-8 sm:pl-10">
                  <h3 className="text-[16px] font-semibold text-white leading-snug">
                    {exp.title}
                  </h3>
                  <p className="mt-1 text-[13px] font-medium uppercase tracking-wider text-white/40">
                    {exp.company}
                  </p>
                  {exp.points && exp.points.length > 0 && (
                    <ul className="mt-5 space-y-3">
                      {exp.points.map((point, pi) => (
                        <li
                          key={pi}
                          className="flex items-start gap-3 text-[14.5px] leading-[1.7] text-white/60"
                        >
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-white/20" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Education & Certifications ──────────────────────────────── */}
      <motion.div
        variants={sectionReveal}
        viewport={{ once: true, amount: 0.15 }}
        {...revealProps}
        className="py-8 mt-4 grid gap-16 sm:gap-12 sm:grid-cols-2"
      >
        {/* Education */}
        <div>
          <div className="mb-10 flex items-center gap-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
              EDUCATION
            </span>
            <div className="flex-1 border-t border-dashed border-[#3D3D3D]" />
          </div>

          <div className="space-y-10">
            {education.map(edu => (
              <motion.div 
                key={edu.school}
                initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease: smoothEase }}
              >
                <h3 className="text-[16px] font-semibold text-white leading-snug">{edu.school}</h3>
                <p className="mt-1 text-[14.5px] text-white/60 leading-relaxed">{edu.degree}</p>
                <p className="mt-4 text-[14px] font-semibold text-[#F9BD4E] leading-snug">{edu.period}</p>
                <p className="mt-1 text-[13px] text-white/50 leading-relaxed">{edu.location}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <div className="mb-10 flex items-center gap-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
              CERTIFICATIONS
            </span>
            <div className="flex-1 border-t border-dashed border-[#3D3D3D]" />
          </div>

          <div className="space-y-10">
            {certifications.map((cert, idx) => (
              <motion.div 
                key={cert.title}
                initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease: smoothEase, delay: idx * 0.08 }}
              >
                <h3 className="text-[16px] font-semibold text-white leading-snug">{cert.title}</h3>
                <p className="mt-1.5 text-[14px] font-medium text-[#F9BD4E] leading-relaxed">{cert.issuer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
