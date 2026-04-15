import * as React from "react"
import { IconBraces, IconFileUpload } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

type Props = {
  value: string
  onChange: (value: string) => void
}

export function ImportJsonSource({ value, onChange }: Props) {
  const fileRef = React.useRef<HTMLInputElement>(null)
  const lines = value.length > 0 ? value.split(/\r\n|\r|\n/).length : 0
  const chars = value.length

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : ""
      onChange(text)
    }
    reader.readAsText(file)
    e.target.value = ""
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <input
            id="import-json-file"
            ref={fileRef}
            type="file"
            accept=".json,application/json"
            className="sr-only"
            onChange={handleFile}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2 rounded-2xl"
            onClick={() => fileRef.current?.click()}
          >
            <IconFileUpload className="size-4" aria-hidden />
            Carregar .json
          </Button>
          <label htmlFor="import-json-file" className="sr-only">
            Selecionar arquivo JSON
          </label>
          <span className="text-xs text-muted-foreground">
            ou cole / edite abaixo
          </span>
        </div>
        {chars > 0 ? (
          <div className="flex items-center gap-1.5 text-xs tabular-nums text-muted-foreground">
            <IconBraces className="size-3.5 opacity-70" aria-hidden />
            <span>
              {chars.toLocaleString("pt-BR")} caracteres
              {lines > 0 ? ` · ${lines} linhas` : ""}
            </span>
          </div>
        ) : null}
      </div>
      <div className="relative">
        <textarea
          className="min-h-[240px] w-full resize-y rounded-4xl border border-input bg-muted/20 px-4 py-3.5 font-mono text-[13px] leading-relaxed outline-none transition-shadow focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/45 sm:min-h-[260px]"
          placeholder='{ "items": [ { "title": "...", "url": "..." } ] }'
          spellCheck={false}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Conteúdo JSON para importação"
        />
      </div>
    </div>
  )
}
