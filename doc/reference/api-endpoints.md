# Reference: API endpoints

**Type:** Reference

---

## 1. Purpose

This document lists backend paths that the front end calls.

All paths append to `VITE_API_URL`.

---

## 2. Auth

| Method | Path | Notes |
|--------|------|-------|
| POST | `/auth/login` | Plain fetch |
| POST | `/auth/refresh` | Refresh bearer |
| GET | `/auth/me` | Access bearer |
| POST | `/auth/logout` | Access bearer |

---

## 3. Dashboard

| Method | Path |
|--------|------|
| GET | `/dashboard` |

---

## 4. Leads

| Method | Path |
|--------|------|
| GET | `/leads` |
| POST | `/leads/create` |
| PATCH | `/leads/:id` |
| PATCH | `/leads/:id/status` |
| PATCH | `/leads/:id/import-review` |
| DELETE | `/leads/delete/:id` |
| POST | `/leads/import/google-maps` |
| GET | `/leads/:leadId/notes` |
| PUT | `/leads/:leadId/notes` |
| GET | `/leads/:leadId/follow-up` |
| PUT | `/leads/:leadId/follow-up` |
| DELETE | `/leads/:leadId/follow-up` |

---

## 5. Integrations

| Method | Path |
|--------|------|
| POST | `/integrations/google-maps-leads/runs` |
| GET | `/integrations/runs` |
| GET | `/integrations/runs/:id` |
| POST | `/integrations/runs/:id/abort` |

---

## 6. Workspaces

| Method | Path | Workspace header |
|--------|------|------------------|
| GET | `/workspaces` | Skip |
| POST | `/workspaces` | Skip |
| GET | `/workspaces/:workspaceId/members` | Required |
| POST | `/workspaces/:workspaceId/members` | Required |
| PATCH | `/workspaces/:workspaceId/members/:userId` | Required |
| DELETE | `/workspaces/:workspaceId/members/:userId` | Required |

---

## 7. Loss reasons

| Method | Path |
|--------|------|
| GET | `/loss-reasons` |
| POST | `/loss-reasons/create` |
| PATCH | `/loss-reasons/:id` |
| DELETE | `/loss-reasons/:id` |

---

## 8. Users

| Method | Path |
|--------|------|
| GET | `/users` |
| GET | `/users/:userId` |

---

## 9. Feedback

| Method | Path | Workspace header |
|--------|------|------------------|
| POST | `/feedback/create` | Caller choice |
| GET | `/feedback/mine` | Skip |
| GET | `/feedback` | Skip |
| PATCH | `/feedback/:id` | Skip |

---

## 10. Common headers

| Header | When |
|--------|------|
| `Authorization: Bearer <access token>` | Authenticated calls |
| `X-Workspace-Id: <workspace id>` | Business calls unless skipped |

---

## 11. Related documents

- [environment.md](./environment.md)
- [../modules/auth.md](../modules/auth.md)
- [permissions.md](./permissions.md)
