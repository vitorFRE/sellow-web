import { createFileRoute } from "@tanstack/react-router"

import { SectionPlaceholder } from "@/features/dashboard/pages/section-placeholder"

export const Route = createFileRoute("/dashboard/followups")({
  component: FollowupsPage,
})

function FollowupsPage() {
  return (
    <SectionPlaceholder
      title="Follow-ups"
      description="Lembretes e próximos contatos para não deixar oportunidades esfriarem."
    />
  )
}
