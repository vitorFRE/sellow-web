# Module: users

**Feature host:** `src/features/settings`  
**API file:** `src/features/settings/api/users-api.ts`  
**Type:** Description

---

## 1. Purpose

The users API looks up platform users for admin settings flows.

Member CRUD uses the workspaces module.

---

## 2. Main parts

| Part | Path | Role |
|------|------|------|
| Users API | `api/users-api.ts` | User lookup |
| Workspace user type | `types/workspace-user.ts` | User type for settings |

---

## 3. API endpoints

| Method | Path | Action |
|--------|------|--------|
| GET | `/users` | List users with page and limit |
| GET | `/users/:userId` | Read one user |

---

## 4. Permissions

Admin UI uses these calls for manager and super admin flows.

See [../reference/permissions.md](../reference/permissions.md).

---

## 5. Key type

| Type | Meaning |
|------|---------|
| `WorkspaceUser` | User record used in settings |

---

## 6. Related documents

- [settings.md](./settings.md)
- [workspaces.md](./workspaces.md)
- [auth.md](./auth.md)
