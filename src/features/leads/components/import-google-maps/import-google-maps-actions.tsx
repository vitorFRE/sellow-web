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
    <div className="flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="max-w-md text-xs leading-relaxed text-stat-muted">
        A importação pode levar alguns segundos conforme a quantidade de itens
        no arquivo.
      </p>
      <Button
        type="button"
        size="default"
        className="shrink-0 gap-2 px-5"
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
