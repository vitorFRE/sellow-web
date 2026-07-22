# Procedure: import leads

**Type:** Procedure  
**Max words per instruction:** 20

---

## 1. Purpose

This procedure imports leads into the active workspace.

---

## 2. Conditions

1. You are signed in.
2. An active workspace is selected.
3. Your workspace role can write leads.

---

## 3. Path A — Google Maps search

1. Open `/dashboard/importar`.
2. Select the search mode.
3. Enter the search text.
4. Set the search area on the map.
5. Start the integration run.
6. Wait until the run finishes.
7. Open `/dashboard/leads` to review imported leads.

### Abort a run

1. Open the active run panel.
2. Select abort.
3. Confirm that the run status changes.

---

## 4. Path B — JSON import

1. Open `/dashboard/importar`.
2. Select the JSON mode.
3. Provide the JSON lead payload.
4. Start the import.
5. Confirm the success message.
6. Open `/dashboard/leads` to review the new leads.

---

## 5. After import

1. Review each imported lead.
2. Set the import review state when needed.
3. Move accepted leads into the pipeline.

---

## 6. Failure actions

| Condition | Action |
|-----------|--------|
| Write permission missing | Ask an owner or admin for access. |
| Run stays pending | Refresh the runs list. Wait. |
| Run fails | Read the run error. Fix input. Retry. |
| JSON invalid | Fix the payload format. Retry. |

---

## 7. Related documents

- [../modules/integrations.md](../modules/integrations.md)
- [../modules/leads.md](../modules/leads.md)
- [../reference/permissions.md](../reference/permissions.md)
