type SectionPlaceholderProps = {
  title: string
  description?: string
}

export function SectionPlaceholder({
  title,
  description,
}: SectionPlaceholderProps) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-medium">{title}</h1>
      {description ? (
        <p className="text-sm text-muted-foreground">{description}</p>
      ) : null}
    </div>
  )
}
