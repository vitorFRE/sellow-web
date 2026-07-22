# Module: workspaces

**Path:** `src/features/workspaces`  
**Type:** Description

---

## 1. Purpose

The workspaces module selects and stores the active workspace.

The module also manages workspace members and permission checks.

---

## 2. Main parts

| Part | Path | Role |
|------|------|------|
| Workspace context | `context/workspace-context.tsx` | Active workspace state |
| Workspace selector page | `pages/workspace-selector-page.tsx` | Choose a workspace |
| Workspace selector | `components/workspace-selector.tsx` | Selector UI |
| Workspaces API | `api/workspaces-api.ts` | Workspace and member HTTP calls |
| Workspace storage | `lib/workspace-storage.ts` | Persist active workspace id |
| Resolve workspace | `lib/resolve-active-workspace.ts` | Choose a valid workspace |
| Permissions | `lib/workspace-permissions.ts` | Role capability checks |
| Business query key | `lib/business-query-key.ts` | Workspace-scoped cache keys |

---

## 3. Active workspace rules

1. The application stores the active workspace id in localStorage.
2. Business requests send header `X-Workspace-Id`.
3. When the active workspace changes, business queries invalidate.

---

## 4. Resolve flow

1. Load workspaces from `/auth/me` or `/workspaces`.
2. If one workspace exists, select that workspace.
3. If many workspaces exist, open the selector page.
4. If no workspace exists, block dashboard access.

---

## 5. API endpoints

| Method | Path | Workspace header |
|--------|------|------------------|
| GET | `/workspaces` | Skip |
| POST | `/workspaces` | Skip |
| GET | `/workspaces/:workspaceId/members` | Required |
| POST | `/workspaces/:workspaceId/members` | Required |
| PATCH | `/workspaces/:workspaceId/members/:userId` | Required |
| DELETE | `/workspaces/:workspaceId/members/:userId` | Required |

---

## 6. Key types

| Type | Values / meaning |
|------|------------------|
| `WorkspaceRole` | `OWNER`, `ADMIN`, `MEMBER` |
| `Workspace` | Workspace record |
| `UserWorkspace` | Workspace link for the current user |
| `WorkspaceMember` | Member of a workspace |

---

## 7. Permission helpers

| Function | Allows |
|----------|--------|
| `canWriteLeads` | Create and update leads |
| `canDeleteLeads` | Delete leads |
| `canWriteLossReasons` | Manage loss reasons |
| `canManageMembers` | Add and update members |
| `canRemoveMember` | Remove a member |
| `canPromoteToOwner` | Promote a member to owner |
| `isSuperAdmin` | Platform admin checks |

See [../reference/permissions.md](../reference/permissions.md).

---

## 8. Related documents

- [auth.md](./auth.md)
- [settings.md](./settings.md)
- [users.md](./users.md)
