import { ArrowUpRight } from 'lucide-react'
import { socials } from '../../data/socials'

export function Footer() {
  return (
    <footer className="relative z-[1] w-full border-t border-[#3D3D3D]/30 bg-[#0A0A0A] py-8 mt-12">
      <div className="mx-auto flex max-w-[1000px] flex-col items-center justify-between gap-6 px-5 sm:flex-row sm:px-8">
        
        {/* Left: Branding & Copyright */}
        <div className="flex flex-col items-center sm:items-start">
          <span className="text-[14px] font-semibold text-[#F9BD4E]">he1kousen / Ikhsan</span>
          <span className="mt-1 text-[13px] text-white/50">
            © {new Date().getFullYear()} All rights reserved.
          </span>
        </div>

        {/* Right: Social Links */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
              className="group flex items-center gap-1 text-[13px] font-medium text-white/80 transition-colors hover:text-white"
            >
              {social.label}
              <ArrowUpRight className="size-3 text-[#F9BD4E] opacity-70 transition-opacity group-hover:opacity-100" />
            </a>
          ))}
        </div>
        
      </div>
    </footer>
  )
}
