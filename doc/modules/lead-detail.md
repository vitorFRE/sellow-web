# Module: lead-detail

**Path:** `src/features/lead-detail`  
**Type:** Description

---

## 1. Purpose

The lead-detail module shows one lead in a side sheet.

The user can read contact data, edit notes, and manage a follow-up.

---

## 2. Main parts

| Part | Path | Role |
|------|------|------|
| Lead detail sheet | `components/lead-detail-sheet.tsx` | Side panel shell |
| Notes editor | `components/lead-detail-notes-editor.tsx` | Notes editor |
| Follow-up dialog | `components/lead-detail-follow-up-dialog.tsx` | Create or edit follow-up |
| Follow-up fields | `components/lead-detail-follow-up-fields.tsx` | Follow-up form fields |
| Follow-up empty state | `components/lead-detail-follow-up-empty-state.tsx` | Empty follow-up UI |
| Follow-up hook | `hooks/use-lead-follow-up.ts` | Follow-up mutations |
| Lead detail API | `api/lead-detail-api.ts` | Notes and follow-up HTTP calls |

---

## 3. Open behavior

1. The user opens a lead from the pipeline or from the leads list.
2. The sheet mounts with the selected lead.
3. The sheet loads notes and follow-up data.
4. The user edits data in the sheet tabs.

The lead detail has no dedicated route.

---

## 4. API endpoints

| Method | Path | Action |
|--------|------|--------|
| GET | `/leads/:leadId/notes` | Read notes |
| PUT | `/leads/:leadId/notes` | Save notes |
| GET | `/leads/:leadId/follow-up` | Read follow-up |
| PUT | `/leads/:leadId/follow-up` | Save follow-up |
| DELETE | `/leads/:leadId/follow-up` | Remove follow-up |

---

## 5. Permissions

Write actions need `canWriteLeads`.

Allowed roles: `OWNER`, `ADMIN`, `MEMBER`.

---

## 6. Key types

| Type | Meaning |
|------|---------|
| `LeadNotes` | Notes payload |
| `LeadFollowUpChannel` | Follow-up channel |
| `LeadFollowUpResponse` | Follow-up from API |
| `LeadFollowUpInput` | Follow-up write payload |
| `LeadFollowUpView` | Follow-up view model |

---

## 7. Related documents

- [leads.md](./leads.md)
- [pipeline.md](./pipeline.md)
- [../reference/permissions.md](../reference/permissions.md)
