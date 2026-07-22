# Reference: permissions

**Type:** Reference  
**Source:** `src/features/workspaces/lib/workspace-permissions.ts`

---

## 1. Purpose

This document lists front-end permission checks.

The UI hides or blocks actions when a check fails.

---

## 2. Role kinds

### Global role

| Value | Meaning |
|-------|---------|
| `USER` | Standard user |
| `SUPER_ADMIN` | Platform admin |

### Workspace role

| Value | Meaning |
|-------|---------|
| `OWNER` | Full workspace control |
| `ADMIN` | Manage members and delete leads |
| `MEMBER` | Write leads |

---

## 3. Capability matrix

| Capability | OWNER | ADMIN | MEMBER | SUPER_ADMIN |
|------------|:-----:|:-----:|:------:|:-----------:|
| Write leads | Yes | Yes | Yes | — |
| Delete leads | Yes | Yes | No | — |
| Write loss reasons | Yes | Yes | No | — |
| Manage members | Yes | Yes | No | — |
| Remove member | Yes | No | No | — |
| Promote to owner | Yes | No | No | — |
| Admin all workspaces | — | — | — | Yes |
| Admin all feedback | — | — | — | Yes |

`SUPER_ADMIN` is a global role.  
Workspace capabilities still use the workspace role of the user.

---

## 4. Helper functions

| Function | Result |
|----------|--------|
| `isSuperAdmin(globalRole)` | True when role is `SUPER_ADMIN` |
| `isWorkspaceMember(role)` | True for `OWNER`, `ADMIN`, `MEMBER` |
| `canWriteLeads(role)` | True for all workspace members |
| `canDeleteLeads(role)` | True for `OWNER` and `ADMIN` |
| `canWriteLossReasons(role)` | True for `OWNER` and `ADMIN` |
| `canManageMembers(role)` | True for `OWNER` and `ADMIN` |
| `canRemoveMember(role)` | True for `OWNER` |
| `canPromoteToOwner(role)` | True for `OWNER` |

---

## 5. Feature mapping

| Feature | Write check | Delete / manage check |
|---------|-------------|------------------------|
| Leads | `canWriteLeads` | `canDeleteLeads` |
| Pipeline | `canWriteLeads` | `canDeleteLeads` |
| Integrations import | `canWriteLeads` | — |
| Lead notes / follow-up | `canWriteLeads` | — |
| Loss reasons | `canWriteLossReasons` | `canWriteLossReasons` |
| Members | `canManageMembers` | `canRemoveMember` / `canPromoteToOwner` |
| Feedback admin | `isSuperAdmin` | `isSuperAdmin` |
| Workspaces admin | `isSuperAdmin` | `isSuperAdmin` |

---

## 6. Related documents

- [../modules/workspaces.md](../modules/workspaces.md)
- [../modules/settings.md](../modules/settings.md)
- [../glossary.md](../glossary.md)
