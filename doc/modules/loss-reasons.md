# Module: loss reasons

**Feature host:** `src/features/settings`  
**API file:** `src/features/settings/api/loss-reasons-api.ts`  
**Type:** Description

---

## 1. Purpose

A loss reason explains why a lead status became `LOST`.

The settings page manages the loss reason list for the active workspace.

---

## 2. Main parts

| Part | Path | Role |
|------|------|------|
| Loss reasons section | `components/loss-reasons-section.tsx` | CRUD UI |
| Loss reasons API | `api/loss-reasons-api.ts` | HTTP calls |
| Loss reason type | `types/loss-reason.ts` | Type definition |

The pipeline uses loss reasons when a card moves to `LOST`.

---

## 3. API endpoints

| Method | Path | Action |
|--------|------|--------|
| GET | `/loss-reasons` | List loss reasons |
| POST | `/loss-reasons/create` | Create a loss reason |
| PATCH | `/loss-reasons/:id` | Update a loss reason |
| DELETE | `/loss-reasons/:id` | Delete a loss reason |

---

## 4. Permissions

| Action | Roles |
|--------|-------|
| Read | All workspace members |
| Create / update / delete | `OWNER`, `ADMIN` |

---

## 5. Key type

| Type | Meaning |
|------|---------|
| `LossReason` | Loss reason record |

---

## 6. Related documents

- [settings.md](./settings.md)
- [pipeline.md](./pipeline.md)
- [../procedures/pipeline-move.md](../procedures/pipeline-move.md)
