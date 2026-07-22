# Module: pipeline

**Path:** `src/features/pipeline`  
**Type:** Description

---

## 1. Purpose

The pipeline module shows leads on a kanban board.

The user moves cards between lead statuses.

---

## 2. Main parts

| Part | Path | Role |
|------|------|------|
| Pipeline page | `pages/pipeline-page.tsx` | Board page |
| Pipeline kanban | `components/pipeline-kanban.tsx` | Board layout |
| Pipeline column | `components/pipeline-column.tsx` | One status column |
| Pipeline toolbar | `components/pipeline-toolbar.tsx` | Filters and create action |
| Pipeline header | `components/pipeline-header.tsx` | Page header |
| Card actions | `components/pipeline-card-actions.tsx` | Card menu actions |
| Lost reason dialog | `components/pipeline-lost-reason-dialog.tsx` | Loss reason when status is `LOST` |
| Board queries | `hooks/use-pipeline-board-queries.ts` | Column data queries |

---

## 3. Board rules

1. The board shows kanban statuses only.
2. The board does not show `IMPORTED`.
3. Drag a card to change the lead status.
4. When status becomes `LOST`, the UI asks for a loss reason.
5. Create lead opens from the toolbar when the user can write leads.

---

## 4. Data source

The pipeline module uses the leads API.

There is no separate pipeline API file.

Main calls:

- `GET /leads` per status column
- `PATCH /leads/:id/status` on move

---

## 5. Permissions

| Action | Roles |
|--------|-------|
| Move lead / create lead | `OWNER`, `ADMIN`, `MEMBER` |
| Delete lead | `OWNER`, `ADMIN` |

---

## 6. Related documents

- [leads.md](./leads.md)
- [lead-detail.md](./lead-detail.md)
- [loss-reasons.md](./loss-reasons.md)
- [../procedures/pipeline-move.md](../procedures/pipeline-move.md)
