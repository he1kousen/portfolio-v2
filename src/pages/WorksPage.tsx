import { ProjectGallery } from '../components/sections/ProjectGallery'
import { WorkHero } from '../components/sections/WorkHero'
import { ContactSection } from '../components/sections/ContactSection'

export function WorksPage({ onNavigateInfo }: { onNavigateInfo: () => void }) {
  return (
    <div className="mx-auto max-w-[1000px] px-4 pb-24 pt-12 sm:px-6">
      <WorkHero onNavigateInfo={onNavigateInfo} />
      <ProjectGallery />
      <ContactSection />
    </div>
  )
}

