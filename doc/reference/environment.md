# Reference: environment

**Type:** Reference

---

## 1. Purpose

This document lists environment variables for the front end.

---

## 2. Required variable

| Name | Required | Meaning |
|------|----------|---------|
| `VITE_API_URL` | Yes for API calls | API base URL |

Example:

```bash
VITE_API_URL=https://api.example.com
```

Put the value in `.env` or `.env.local`.

Type declaration file: `src/vite-env.d.ts`  
Reader file: `src/shared/config/api-base.ts`

---

## 3. Runtime behavior

1. Vite injects `import.meta.env.VITE_API_URL`.
2. The API base helper reads that value.
3. If the value is missing in development, the helper writes a warning.

---

## 4. External URLs (not env)

| URL | Use |
|-----|-----|
| `https://nominatim.openstreetmap.org/search` | Place search |
| Carto GL style URLs | Map basemaps |

These values live in source code.

---

## 5. Local storage keys

| Key | Content |
|-----|---------|
| `sellow_access_token` | Access token |
| `sellow_refresh_token` | Refresh token |
| `sellow_active_workspace_id` | Active workspace id |
| `theme` | Theme preference |

---

## 6. Security notes

1. Do not commit `.env` files with secrets.
2. Do not put private keys in front-end env vars.
3. The browser can read all `VITE_*` values.

---

## 7. Related documents

- [../getting-started.md](../getting-started.md)
- [api-endpoints.md](./api-endpoints.md)
