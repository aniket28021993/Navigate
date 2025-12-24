import type { PropsWithChildren } from 'react'

interface SectionCardProps extends PropsWithChildren {
  title: string
  description?: string
}

export function SectionCard({ title, description, children }: SectionCardProps) {
  return (
    <section className="section-card">
      <div className="section-card__header">
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      <div className="section-card__content">{children}</div>
    </section>
  )
}
