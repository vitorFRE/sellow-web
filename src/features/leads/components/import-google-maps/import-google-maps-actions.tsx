import { IconLoader2, IconUpload } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

type Props = {
  canImport: boolean
  isPending: boolean
  onImport: () => void
}

export function ImportGoogleMapsActions({
  canImport,
  isPending,
  onImport,
}: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-muted-foreground">
        A importação pode levar alguns segundos conforme a quantidade de itens.
      </p>
      <Button
        type="button"
        size="lg"
        className="shrink-0 gap-2 rounded-2xl px-6"
        disabled={!canImport}
        onClick={onImport}
      >
        {isPending ? (
          <>
            <IconLoader2 className="size-4 animate-spin" aria-hidden />
            Importando…
          </>
        ) : (
          <>
            <IconUpload className="size-4" aria-hidden />
            Importar leads
          </>
        )}
      </Button>
    </div>
  )
}
