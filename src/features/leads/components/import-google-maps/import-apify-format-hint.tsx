import * as React from "react"
import { IconChevronDown, IconInfoCircle } from "@tabler/icons-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function ImportApifyFormatHint() {
  const [open, setOpen] = React.useState(true)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div
        className="overflow-hidden rounded-3xl border border-border/80 bg-muted/30"
        role="note"
      >
        <CollapsibleTrigger
          type="button"
          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted/50"
        >
          <span className="flex items-center gap-2">
            <IconInfoCircle
              className="size-4.5 shrink-0 text-primary"
              aria-hidden
            />
            Formato Apify
          </span>
          <IconChevronDown
            className={`size-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p className="border-t border-border/60 px-4 pb-4 pt-3 text-sm leading-relaxed text-muted-foreground">
            O JSON esperado segue o padrão de exportação do Apify para dados do
            Google Maps (por exemplo, a saída de um actor de scraping). Você
            pode colar o resultado do run ou carregar um arquivo nesse formato.
          </p>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}
