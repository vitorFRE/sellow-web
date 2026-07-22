# Sellow Web — front-end documentation

**Product:** Sellow Web  
**Type:** Single-page application (SPA)  
**Standard:** ASD-STE100 Simplified Technical English  
**Package:** `sellow-web`  
**Package manager:** pnpm

---

## Purpose

Sellow Web is a B2B sales CRM front end.

The application lets a user:

- sign in
- select a workspace
- import leads
- manage leads
- move leads in a pipeline
- configure workspace settings

---

## Document map

### Core

| Document | Content |
|----------|---------|
| [STE100.md](./STE100.md) | Writing rules for this document set |
| [glossary.md](./glossary.md) | Technical nouns and technical verbs |
| [architecture.md](./architecture.md) | Application structure |
| [shared.md](./shared.md) | Shared infrastructure |
| [getting-started.md](./getting-started.md) | Install and run procedures |

### Modules

| Document | Feature path |
|----------|--------------|
| [modules/auth.md](./modules/auth.md) | `src/features/auth` |
| [modules/workspaces.md](./modules/workspaces.md) | `src/features/workspaces` |
| [modules/dashboard.md](./modules/dashboard.md) | `src/features/dashboard` |
| [modules/leads.md](./modules/leads.md) | `src/features/leads` |
| [modules/lead-detail.md](./modules/lead-detail.md) | `src/features/lead-detail` |
| [modules/pipeline.md](./modules/pipeline.md) | `src/features/pipeline` |
| [modules/integrations.md](./modules/integrations.md) | `src/features/integrations` |
| [modules/settings.md](./modules/settings.md) | `src/features/settings` |
| [modules/feedback.md](./modules/feedback.md) | `src/features/feedback` |
| [modules/loss-reasons.md](./modules/loss-reasons.md) | Loss reasons in settings |
| [modules/users.md](./modules/users.md) | User lookup in settings |

### Reference

| Document | Content |
|----------|---------|
| [reference/routes.md](./reference/routes.md) | Application routes |
| [reference/api-endpoints.md](./reference/api-endpoints.md) | HTTP endpoints |
| [reference/permissions.md](./reference/permissions.md) | Role permissions |
| [reference/environment.md](./reference/environment.md) | Environment variables |

### Procedures

| Document | Content |
|----------|---------|
| [procedures/login.md](./procedures/login.md) | Sign-in procedure |
| [procedures/import-leads.md](./procedures/import-leads.md) | Import leads procedure |
| [procedures/pipeline-move.md](./procedures/pipeline-move.md) | Move a lead in the pipeline |

---

## Tech stack (summary)

| Layer | Technology |
|-------|------------|
| UI library | React 19 |
| Bundler | Vite 7 |
| Language | TypeScript 5.9 |
| Router | TanStack Router |
| Server state | TanStack Query |
| Forms | TanStack Form + Zod |
| Tables | TanStack Table |
| Styles | Tailwind CSS 4 |
| UI components | shadcn / Base UI |
| Maps | MapLibre GL |
| Drag and drop | @dnd-kit/react |
| Icons | @tabler/icons-react |

---

## How to read this set

1. Read [STE100.md](./STE100.md).
2. Read [glossary.md](./glossary.md).
3. Read [architecture.md](./architecture.md).
4. Open the module document for your task.
5. Use reference documents for routes, endpoints, and permissions.

---

## Source layout

```
src/
  features/     Domain modules
  routes/       File-based routes
  shared/       Shared API and theme code
  components/   UI primitives
```

Path alias: `@` maps to `src/`.
