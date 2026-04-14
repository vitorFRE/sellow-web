type SectionPlaceholderProps = {
  title: string
  description?: string
}

export function SectionPlaceholder({
  title,
  description,
}: SectionPlaceholderProps) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <h1 className="text-xl font-medium">{title}</h1>
      {description ? (
        <p className="wrap-break-word text-sm text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  )
}
