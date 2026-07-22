# Module: settings

**Path:** `src/features/settings`  
**Type:** Description

---

## 1. Purpose

The settings module shows workspace and platform configuration sections.

---

## 2. Main page

Path: `pages/configuracoes-settings-page.tsx`  
Route: `/dashboard/configuracoes`

---

## 3. Sections

| Section id | Component | Visibility |
|------------|-----------|------------|
| `loss-reasons` | `LossReasonsSection` | All members |
| `members` | `MembersSection` | Managers or super admin |
| `my-feedback` | `FeedbackMySection` | All members |
| `workspaces-admin` | `WorkspacesAdminSection` | `SUPER_ADMIN` |
| `feedback-admin` | `FeedbackAdminSection` | `SUPER_ADMIN` |

---

## 4. Owned APIs

| File | Role |
|------|------|
| `api/loss-reasons-api.ts` | Loss reason CRUD |
| `api/users-api.ts` | User lookup |

Member CRUD uses the workspaces API.  
Feedback calls use the feedback module.

---

## 5. Supporting parts

| Part | Role |
|------|------|
| `components/settings-page-header.tsx` | Page header |
| `components/settings-mobile-menu-list.tsx` | Mobile section menu |
| `components/members-section` | Member management UI |
| `components/loss-reasons-section.tsx` | Loss reason UI |
| `components/feedback-admin-section` | Admin feedback UI |
| `components/workspaces-admin-section` | Admin workspace UI |

---

## 6. Permissions

| Action | Roles |
|--------|-------|
| View loss reasons | All members |
| Write loss reasons | `OWNER`, `ADMIN` |
| Manage members | `OWNER`, `ADMIN` |
| Remove member / promote owner | `OWNER` |
| Admin workspace list | `SUPER_ADMIN` |
| Admin feedback list | `SUPER_ADMIN` |

---

## 7. Related documents

- [loss-reasons.md](./loss-reasons.md)
- [feedback.md](./feedback.md)
- [users.md](./users.md)
- [workspaces.md](./workspaces.md)
- [../reference/permissions.md](../reference/permissions.md)
