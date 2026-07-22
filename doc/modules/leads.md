# Module: leads

**Path:** `src/features/leads`  
**Type:** Description

---

## 1. Purpose

The leads module lists, creates, edits, and imports leads.

The module also supports import review and a map view.

---

## 2. Main parts

| Part | Path | Role |
|------|------|------|
| Leads list page | `pages/leads-list-page.tsx` | Table and map for imported leads |
| Leads API | `api/leads-api.ts` | Lead HTTP calls |
| Lead columns | `components/leads-columns.tsx` | Table column definitions |
| Create form | `components/create-lead-form` | Create lead |
| Edit form | `components/edit-lead-form` | Edit lead |
| Map view | `components/leads-map-view.tsx` | Map of lead coordinates |
| Status config | `config/lead-status.ts` | Status labels and kanban flags |
| Lead types | `types/lead.ts` | Lead domain types |
| Import types | `types/google-maps-import.ts` | JSON import payload types |

---

## 3. Lead status model

`IMPORTED` leads stay on the leads page.

Pipeline statuses stay on the pipeline page.

Status list:

1. `IMPORTED`
2. `NEW`
3. `CONTACTED`
4. `QUALIFYING`
5. `BRIEFING`
6. `PROPOSAL_SENT`
7. `NEGOTIATION`
8. `WON`
9. `LOST`

---

## 4. List filters

The list request can include:

- page
- limit
- status
- search
- minTotalScore
- minReviewsCount
- hasWebsite
- importReview
- sortBy
- sortDir

---

## 5. API endpoints

| Method | Path | Action |
|--------|------|--------|
| GET | `/leads` | List leads |
| POST | `/leads/create` | Create a lead |
| PATCH | `/leads/:id` | Update a lead |
| PATCH | `/leads/:id/status` | Change lead status |
| PATCH | `/leads/:id/import-review` | Set import review |
| DELETE | `/leads/delete/:id` | Delete a lead |
| POST | `/leads/import/google-maps` | Import leads from JSON |

---

## 6. Permissions

| Action | Roles |
|--------|-------|
| Create / update / import / triage | `OWNER`, `ADMIN`, `MEMBER` |
| Delete | `OWNER`, `ADMIN` |

---

## 7. Key types

| Type | Meaning |
|------|---------|
| `Lead` | Lead record |
| `LeadStatus` | Status value |
| `ImportReview` | Triage value |
| `LeadsListResponse` | Paginated list |

---

## 8. Related documents

- [lead-detail.md](./lead-detail.md)
- [pipeline.md](./pipeline.md)
- [integrations.md](./integrations.md)
- [../procedures/import-leads.md](../procedures/import-leads.md)
