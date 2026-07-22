# Sellow Web

**Product:** Sellow Web  
**Type:** Single-page application (SPA)  
**Package:** `sellow-web`  
**Package manager:** pnpm  
**Documentation standard:** ASD-STE100

---

## 1. Purpose

Sellow Web is a B2B sales CRM front end.

The application lets a user:

- sign in
- select a workspace
- import leads
- manage leads
- move leads in a pipeline
- configure workspace settings

---

## 2. Tech stack

| Layer | Technology |
|-------|------------|
| UI library | React 19 |
| Bundler | Vite 7 |
| Language | TypeScript |
| Router | TanStack Router |
| Server state | TanStack Query |
| Forms | TanStack Form + Zod |
| Styles | Tailwind CSS 4 |
| UI components | shadcn / Base UI |
| Maps | MapLibre GL |

---

## 3. Conditions

Before you start:

1. Install Node.js (compatible with Vite 7).
2. Install pnpm.
3. Get a valid backend API URL.

---

## 4. Install

1. Open a terminal.
2. Go to the project root.
3. Run:

```bash
pnpm install
```

---

## 5. Configure

1. Create a file named `.env` or `.env.local`.
2. Add this line:

```bash
VITE_API_URL=https://your-api-host.example
```

3. Save the file.

Do not commit secret values.

---

## 6. Run

### Development

1. Run:

```bash
pnpm dev
```

2. Open the local URL that Vite prints.

### Production build

1. Run:

```bash
pnpm build
```

2. Preview the build:

```bash
pnpm preview
```

---

## 7. Quality commands

| Command | Action |
|---------|--------|
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format TypeScript files |
| `pnpm typecheck` | Run the TypeScript checker |
| `pnpm clean` | Remove `node_modules` and `dist` |

---

## 8. Add a UI component

1. Run:

```bash
pnpm dlx shadcn@latest add button
```

2. Import the component:

```tsx
import { Button } from "@/components/ui/button"
```

UI components live in `src/components/ui`.

---

## 9. Source layout

```
src/
  features/     Domain modules
  routes/       File-based routes
  shared/       Shared API and theme code
  components/   UI primitives
```

Path alias: `@` maps to `src/`.

---

## 10. Full documentation

Read the ASD-STE100 document set in [`doc/`](./doc/README.md).

| Document | Content |
|----------|---------|
| [doc/README.md](./doc/README.md) | Document map |
| [doc/STE100.md](./doc/STE100.md) | Writing rules |
| [doc/getting-started.md](./doc/getting-started.md) | Install and run detail |
| [doc/architecture.md](./doc/architecture.md) | Application structure |
| [doc/glossary.md](./doc/glossary.md) | Technical nouns and verbs |
