import * as React from "react"
import { IconFileUpload } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

type Props = {
  value: string
  onChange: (value: string) => void
}

export function ImportJsonSource({ value, onChange }: Props) {
  const fileRef = React.useRef<HTMLInputElement>(null)

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
    <div className="flex flex-col gap-3">
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
          onClick={() => fileRef.current?.click()}
        >
          <IconFileUpload className="size-4" />
          Carregar arquivo .json
        </Button>
        <label htmlFor="import-json-file" className="sr-only">
          Selecionar arquivo JSON
        </label>
        <span className="text-xs text-muted-foreground">
          ou edite o texto abaixo
        </span>
      </div>
      <textarea
        className="min-h-[220px] w-full resize-y rounded-4xl border border-input bg-input/30 px-4 py-3 font-mono text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        placeholder='{ "items": [ { "title": "...", "url": "..." } ] }'
        spellCheck={false}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
