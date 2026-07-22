# Architecture

## 1. Purpose

This document describes the Sellow Web front-end structure.

---

## 2. Application type

Sellow Web is a single-page application.

The browser loads one HTML page.  
The router changes views without a full page reload.

---

## 3. Top-level folders

| Folder | Role |
|--------|------|
| `src/features` | Domain feature modules |
| `src/routes` | File-based routes |
| `src/shared` | Shared config, API helpers, theme |
| `src/components` | UI primitives and charts |
| `src/lib` | Small shared utilities |
| `public` | Static assets |

---

## 4. Feature module layout

Each feature module can contain these folders:

| Folder | Role |
|--------|------|
| `api` | HTTP request functions |
| `components` | UI parts for the feature |
| `hooks` | React hooks |
| `lib` | Pure helpers |
| `pages` | Page-level components |
| `queries` | TanStack Query keys and options |
| `types` | TypeScript types |
| `schemas` | Zod schemas |
| `config` | Static config |
| `context` | React context |

---

## 5. Feature modules

| Module | Path | Role |
|--------|------|------|
| auth | `src/features/auth` | Sign-in, tokens, authorized fetch |
| workspaces | `src/features/workspaces` | Active workspace and members |
| dashboard | `src/features/dashboard` | Shell, sidebar, home metrics |
| leads | `src/features/leads` | Lead list, create, edit, import payload |
| lead-detail | `src/features/lead-detail` | Lead detail sheet, notes, follow-up |
| pipeline | `src/features/pipeline` | Kanban pipeline |
| integrations | `src/features/integrations` | Import hub and integration runs |
| settings | `src/features/settings` | Settings page sections |
| feedback | `src/features/feedback` | Feedback API and labels |

---

## 6. Bootstrap sequence

1. `src/main.tsx` starts the application.
2. The theme provider wraps the tree.
3. The query client provider wraps the tree.
4. The router provider mounts the route tree.
5. The root route renders the outlet and toast host.

Default query options:

- `staleTime`: 5 minutes
- `retry`: false

---

## 7. Routing model

TanStack Router uses file routes in `src/routes`.

The plugin writes `src/routeTree.gen.ts`.

Do not edit `routeTree.gen.ts` by hand.

See [reference/routes.md](./reference/routes.md).

---

## 8. Data flow

```
UI component
  → hook or mutation
    → API function
      → authorizedFetch
        → backend HTTP API
```

Business requests send:

1. `Authorization: Bearer <access token>`
2. `X-Workspace-Id: <active workspace id>` (unless skipped)

Query cache keys for business data use `businessQueryKey(workspaceId, ...)`.

When the active workspace changes, the application invalidates business queries.

---

## 9. Auth and workspace gate

### Public route `/`

1. The user signs in.
2. The application stores tokens.
3. The application loads `/auth/me`.
4. The application resolves the active workspace.
5. The router moves the user to `/dashboard` or `/dashboard/selecionar-workspace`.

### Protected routes `/dashboard/*`

1. The route loader ensures auth data.
2. On auth failure, the router moves the user to `/`.
3. If no valid active workspace exists, the router moves the user to the selector page.

---

## 10. UI layers

| Layer | Location | Role |
|-------|----------|------|
| Dashboard shell | `src/features/dashboard/layout` | Sidebar and main frame |
| Pages | `src/features/*/pages` | Full page content |
| Feature components | `src/features/*/components` | Feature UI |
| UI primitives | `src/components/ui` | Buttons, sheets, forms |
| Charts | `src/components/evilcharts` | Chart building blocks |

---

## 11. External client services

| Service | Use |
|---------|-----|
| Backend API (`VITE_API_URL`) | All business data |
| Nominatim | Place search for map import |
| Carto basemaps | Map tiles in MapLibre |

---

## 12. Placeholder routes

These routes exist. The UI shows a placeholder:

- `/dashboard/followups`
- `/dashboard/templates`
- `/dashboard/portfolio`
- `/dashboard/propostas`
- `/dashboard/relatorio`

---

## 13. Related documents

- [getting-started.md](./getting-started.md)
- [modules/auth.md](./modules/auth.md)
- [modules/workspaces.md](./modules/workspaces.md)
- [reference/api-endpoints.md](./reference/api-endpoints.md)
