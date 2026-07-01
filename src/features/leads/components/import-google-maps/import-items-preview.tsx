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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-sm text-stat-muted">
          <span className="text-2xl font-semibold tabular-nums text-stat-value">
            {items.length.toLocaleString("pt-BR")}
          </span>{" "}
          {items.length === 1 ? "item válido" : "itens válidos"}
        </p>
        {rest > 0 ? (
          <p className="text-xs text-stat-muted">
            Exibindo os primeiros {PREVIEW_LIMIT} na tabela
          </p>
        ) : null}
      </div>

      <div className="max-h-[min(420px,50vh)] overflow-auto rounded-lg border border-stat-card-border bg-stat-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[11px] tracking-[0.08em] text-stat-label uppercase">
                Título
              </TableHead>
              <TableHead className="text-[11px] tracking-[0.08em] text-stat-label uppercase">
                Telefone
              </TableHead>
              <TableHead className="text-[11px] tracking-[0.08em] text-stat-label uppercase">
                Cidade / UF
              </TableHead>
              <TableHead className="text-[11px] tracking-[0.08em] text-stat-label uppercase">
                Nota
              </TableHead>
              <TableHead className="text-[11px] tracking-[0.08em] text-stat-label uppercase">
                Aval.
              </TableHead>
              <TableHead className="text-[11px] tracking-[0.08em] text-stat-label uppercase">
                Site
              </TableHead>
              <TableHead className="text-[11px] tracking-[0.08em] text-stat-label uppercase">
                URL Maps
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shown.map((item, i) => (
              <TableRow key={`${item.title}-${i}`} className="border-stat-card-border">
                <TableCell className="max-w-48 font-medium wrap-break-word text-stat-value">
                  {item.title || "—"}
                </TableCell>
                <TableCell className="font-mono text-xs tabular-nums text-stat-value">
                  {item.phone?.trim() || "—"}
                </TableCell>
                <TableCell className="text-sm text-stat-muted">
                  {[item.city, item.state].filter(Boolean).join(" · ") || "—"}
                </TableCell>
                <TableCell className="tabular-nums text-stat-value">
                  {item.totalScore ?? "—"}
                </TableCell>
                <TableCell className="tabular-nums text-stat-value">
                  {item.reviewsCount ?? "—"}
                </TableCell>
                <TableCell className="max-w-32 text-sm text-stat-muted">
                  {truncate(item.website ?? null, 28)}
                </TableCell>
                <TableCell className="max-w-40 text-sm text-stat-muted">
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
