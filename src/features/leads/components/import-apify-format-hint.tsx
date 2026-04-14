import { IconInfoCircle } from "@tabler/icons-react"

export function ImportApifyFormatHint() {
  return (
    <div
      className="flex gap-3 rounded-3xl border border-border/80 bg-muted/40 px-4 py-3 text-sm text-muted-foreground"
      role="note"
    >
      <IconInfoCircle
        className="mt-0.5 size-[1.125rem] shrink-0 text-primary"
        aria-hidden
      />
      <p className="min-w-0 leading-relaxed">
        <span className="font-medium text-foreground">Formato Apify</span>
        {" — "}
        O JSON esperado segue o padrão de exportação do Apify para dados do Google
        Maps (por exemplo, a saída de um actor de scraping). Você pode colar o
        resultado do run ou carregar um arquivo nesse formato.
      </p>
    </div>
  )
}
