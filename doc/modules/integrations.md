# Module: integrations

**Path:** `src/features/integrations`  
**Type:** Description

---

## 1. Purpose

The integrations module runs the import hub.

The user starts Google Maps lead runs or imports JSON lead data.

---

## 2. Main parts

| Part | Path | Role |
|------|------|------|
| Import hub page | `pages/import-hub-page.tsx` | Import modes |
| Import hub header | `components/import-hub-header.tsx` | Page header |
| Import mode switch | `components/import-mode-switch.tsx` | Search or JSON mode |
| Google Maps panel | `components/google-maps-async-panel.tsx` | Async search flow |
| Search form | `components/google-maps-search-form.tsx` | Search inputs |
| Search area map | `components/search-area-map.tsx` | Map area selection |
| Place search field | `components/place-search-field.tsx` | Place lookup |
| JSON import panel | `components/json-import-panel.tsx` | JSON import UI |
| Runs list | `components/integration-runs-list.tsx` | Past runs |
| Active run panel | `components/active-integration-run-panel.tsx` | Current run status |
| Integrations API | `api/integrations-api.ts` | Run HTTP calls |
| Geocode helper | `lib/geocode-places.ts` | Nominatim place search |

---

## 3. Import modes

### Search mode

1. The user sets a query and a map area.
2. The UI starts `POST /integrations/google-maps-leads/runs`.
3. The UI polls the run status.
4. The user can abort the run.

### JSON mode

1. The user pastes or uploads JSON lead data.
2. The UI sends `POST /leads/import/google-maps`.
3. The backend creates leads.

---

## 4. API endpoints

| Method | Path | Action |
|--------|------|--------|
| POST | `/integrations/google-maps-leads/runs` | Start a Google Maps run |
| GET | `/integrations/runs` | List runs |
| GET | `/integrations/runs/:id` | Read one run |
| POST | `/integrations/runs/:id/abort` | Abort a run |

JSON import uses the leads API.

---

## 5. External client call

Place search uses Nominatim:

`https://nominatim.openstreetmap.org/search`

---

## 6. Key types

| Type | Meaning |
|------|---------|
| `IntegrationRun` | Run record |
| `IntegrationRunStatus` | Run status value |
| `GoogleMapsLeadsRunInput` | Search input |
| `StartGoogleMapsLeadsRunPayload` | Start payload |

---

## 7. Permissions

Import actions need `canWriteLeads`.

Allowed roles: `OWNER`, `ADMIN`, `MEMBER`.

---

## 8. Related documents

- [leads.md](./leads.md)
- [../procedures/import-leads.md](../procedures/import-leads.md)
- [../reference/api-endpoints.md](../reference/api-endpoints.md)
