# Module: dashboard

**Path:** `src/features/dashboard`  
**Type:** Description

---

## 1. Purpose

The dashboard module provides the application shell and the home page.

The home page shows lead metrics and short lists.

---

## 2. Main parts

| Part | Path | Role |
|------|------|------|
| Dashboard shell | `layout/dashboard-shell.tsx` | Sidebar layout and workspace provider |
| Home page | `pages/dashboard-home-page.tsx` | Overview metrics |
| Placeholder page | `pages/section-placeholder.tsx` | Coming-soon sections |
| App sidebar | `components/app-sidebar.tsx` | Navigation |
| Nav main | `components/nav-main.tsx` | Primary links |
| Nav user | `components/nav-user.tsx` | User menu |
| Dashboard API | `api/dashboard-api.ts` | Overview request |
| Sidebar config | `config/dashboard-sidebar-data.tsx` | Nav items |

---

## 3. Shell behavior

1. The shell wraps protected dashboard routes.
2. The shell mounts the workspace provider.
3. The sidebar shows primary and secondary links.
4. Child routes render in the main content area.

---

## 4. Home page data

The home page calls `GET /dashboard`.

The response includes:

- total leads
- counts by lead status
- funnel chart data
- recent leads
- upcoming follow-ups

---

## 5. API endpoints

| Method | Path |
|--------|------|
| GET | `/dashboard` |

The request needs auth and the workspace header.

---

## 6. Key type

| Type | Meaning |
|------|---------|
| `DashboardOverviewResponse` | Home page metrics payload |

---

## 7. Sidebar destinations

| Label (UI) | Route |
|------------|-------|
| Início | `/dashboard` |
| Pipeline | `/dashboard/pipeline` |
| Leads | `/dashboard/leads` |
| Importar | `/dashboard/importar` |
| Configurações | `/dashboard/configuracoes` |

Some sidebar items open dialogs or placeholder pages.

---

## 8. Related documents

- [../architecture.md](../architecture.md)
- [../reference/routes.md](../reference/routes.md)
- [leads.md](./leads.md)
- [pipeline.md](./pipeline.md)
