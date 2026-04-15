import { IconTable } from "@tabler/icons-react"

import type { GoogleMapsImportItem } from "@/features/leads/types/google-maps-import"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const PREVIEW_LIMIT = 100

function truncate(s: string | null | undefined, n: number) {
  if (!s) return "—"
  return s.length <= n ? s : `${s.slice(0, n)}…`
}

type Props = {
  items: GoogleMapsImportItem[]
}

export function ImportItemsPreview({ items }: Props) {
  const shown = items.slice(0, PREVIEW_LIMIT)
  const rest = items.length - shown.length

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="flex size-8 items-center justify-center rounded-xl bg-muted/80 text-foreground">
            <IconTable className="size-4" aria-hidden />
          </span>
          <span>
            <span className="font-medium text-foreground">
              {items.length.toLocaleString("pt-BR")}
            </span>{" "}
            {items.length === 1 ? "item válido" : "itens válidos"}
            {rest > 0 ? (
              <span className="text-muted-foreground">
                {" "}
                (primeiros {PREVIEW_LIMIT} na tabela)
              </span>
            ) : null}
          </span>
        </p>
      </div>
      <div className="max-h-[min(420px,50vh)] overflow-auto rounded-3xl border border-border/80 bg-card/80 shadow-inner">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Cidade / UF</TableHead>
              <TableHead>Nota</TableHead>
              <TableHead>Aval.</TableHead>
              <TableHead>Site</TableHead>
              <TableHead>URL Maps</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shown.map((item, i) => (
              <TableRow key={`${item.title}-${i}`}>
                <TableCell className="max-w-48 font-medium wrap-break-word">
                  {item.title || "—"}
                </TableCell>
                <TableCell className="tabular-nums">
                  {item.phone?.trim() || "—"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {[item.city, item.state].filter(Boolean).join(" · ") || "—"}
                </TableCell>
                <TableCell className="tabular-nums">
                  {item.totalScore ?? "—"}
                </TableCell>
                <TableCell className="tabular-nums">
                  {item.reviewsCount ?? "—"}
                </TableCell>
                <TableCell className="max-w-32 text-muted-foreground">
                  {truncate(item.website ?? null, 28)}
                </TableCell>
                <TableCell className="max-w-40 text-muted-foreground">
                  {truncate(item.url ?? null, 36)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
