type SectionHeaderProps = {
  eyebrow: string
  title: string
  description?: string
}

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="mb-3 text-[15px] font-medium leading-[1.1] text-black/60 dark:text-white/60">
        {eyebrow}
      </p>
      <h2 className="text-[42px] font-semibold leading-[1.1] tracking-tight text-black dark:text-white sm:text-[58px]">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-black/60 dark:text-white/60">{description}</p> : null}
    </div>
  )
}
