# Procedure: move a lead in the pipeline

**Type:** Procedure  
**Max words per instruction:** 20

---

## 1. Purpose

This procedure changes the lead status on the pipeline board.

---

## 2. Conditions

1. You are signed in.
2. An active workspace is selected.
3. Your workspace role can write leads.
4. The lead status is not `IMPORTED`.

---

## 3. Steps

1. Open `/dashboard/pipeline`.
2. Find the lead card.
3. Drag the card to the target status column.
4. If the target status is `LOST`, select a loss reason.
5. Confirm the status change.
6. Verify that the card stays in the new column.

---

## 4. Open lead detail

1. Select the lead card.
2. Review contact data in the sheet.
3. Edit notes when needed.
4. Set or clear a follow-up when needed.
5. Close the sheet.

---

## 5. Create a lead from the pipeline

1. Open the pipeline toolbar create action.
2. Fill the required lead fields.
3. Save the lead.
4. Confirm that the new card appears.

---

## 6. Failure actions

| Condition | Action |
|-----------|--------|
| Drag not allowed | Check write permission. |
| Loss reason missing | Create a loss reason in settings. |
| Status update fails | Refresh the board. Retry. |

---

## 7. Related documents

- [../modules/pipeline.md](../modules/pipeline.md)
- [../modules/lead-detail.md](../modules/lead-detail.md)
- [../modules/loss-reasons.md](../modules/loss-reasons.md)
- [../reference/permissions.md](../reference/permissions.md)
