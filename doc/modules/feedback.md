# Module: feedback

**Path:** `src/features/feedback`  
**Type:** Description

---

## 1. Purpose

The feedback module sends and lists user feedback.

Super admins review all feedback items.

---

## 2. Main parts

| Part | Path | Role |
|------|------|------|
| Feedback API | `api/feedback-api.ts` | Feedback HTTP calls |
| Query keys | `queries/feedback-query-keys.ts` | Cache keys |
| Labels | `lib/feedback-labels.ts` | Type and status labels |
| Status badge | `components/feedback-status-badge.tsx` | Status badge |
| Types | `types/feedback.ts` | Feedback types |

Settings hosts the feedback UI sections.

---

## 3. User actions

1. Create feedback with type and message.
2. List personal feedback items.
3. Filter personal feedback by status or type.

---

## 4. Super admin actions

1. List all feedback items.
2. Change feedback status.
3. Add an admin note.

---

## 5. API endpoints

| Method | Path | Workspace header |
|--------|------|------------------|
| POST | `/feedback/create` | As configured by caller |
| GET | `/feedback/mine` | Skip |
| GET | `/feedback` | Skip |
| PATCH | `/feedback/:id` | Skip |

---

## 6. Key types

| Type | Values / meaning |
|------|------------------|
| `FeedbackType` | `BUG`, `SUGGESTION`, `OTHER` |
| `FeedbackStatus` | `OPEN`, `IN_REVIEW`, `RESOLVED`, `CLOSED` |
| `Feedback` | Feedback record |
| `FeedbackListResponse` | Paginated list |

---

## 7. Permissions

| Action | Who |
|--------|-----|
| Create / list mine | Authenticated user |
| List all / patch | `SUPER_ADMIN` |

---

## 8. Related documents

- [settings.md](./settings.md)
- [../reference/permissions.md](../reference/permissions.md)
