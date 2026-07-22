# Reference: routes

**Type:** Reference

---

## 1. Purpose

This document lists application routes and their feature pages.

---

## 2. Route files

Route files live in `src/routes`.

TanStack Router writes `src/routeTree.gen.ts`.

Do not edit the generated file by hand.

---

## 3. Route table

| Path | File | Page / behavior |
|------|------|-----------------|
| `/` | `routes/index.tsx` | Login page |
| `/dashboard` | `routes/dashboard/route.tsx` | Auth gate and dashboard shell |
| `/dashboard/` | `routes/dashboard/index.tsx` | Dashboard home |
| `/dashboard/pipeline` | `routes/dashboard/pipeline.tsx` | Pipeline page |
| `/dashboard/leads` | `routes/dashboard/leads.tsx` | Leads list page |
| `/dashboard/importar` | `routes/dashboard/importar.tsx` | Import hub page |
| `/dashboard/configuracoes` | `routes/dashboard/configuracoes.tsx` | Settings page |
| `/dashboard/selecionar-workspace` | `routes/dashboard/selecionar-workspace.tsx` | Workspace selector |
| `/dashboard/followups` | `routes/dashboard/followups.tsx` | Placeholder |
| `/dashboard/templates` | `routes/dashboard/templates.tsx` | Placeholder |
| `/dashboard/portfolio` | `routes/dashboard/portfolio.tsx` | Placeholder |
| `/dashboard/propostas` | `routes/dashboard/propostas.tsx` | Placeholder |
| `/dashboard/relatorio` | `routes/dashboard/relatorio.tsx` | Placeholder |

---

## 4. Search params

| Route | Param | Effect |
|-------|-------|--------|
| `/dashboard/pipeline` | `criar=1` | Open create lead UI |

---

## 5. Guards

### Route `/`

1. If tokens exist and `/auth/me` succeeds, resolve the workspace.
2. Move to `/dashboard` or `/dashboard/selecionar-workspace`.

### Routes `/dashboard/*`

1. Ensure auth me data.
2. On failure, move to `/`.
3. If the active workspace is missing, move to the selector page.

---

## 6. Lead detail

Lead detail opens as a sheet.

Lead detail has no route path.

---

## 7. Related documents

- [../architecture.md](../architecture.md)
- [../modules/dashboard.md](../modules/dashboard.md)
- [../modules/auth.md](../modules/auth.md)
