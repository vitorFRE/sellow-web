# Shared infrastructure

**Path:** `src/shared`  
**Type:** Description

---

## 1. Purpose

Shared code supports all feature modules.

Shared code does not own a product page.

---

## 2. Parts

| Part | Path | Role |
|------|------|------|
| API base | `config/api-base.ts` | Read `VITE_API_URL` |
| Parse API JSON | `api/parse-api-json.ts` | Parse response bodies |
| HTTP error | `api/http-error.ts` | Error type for failed requests |
| API error helpers | `lib/api-errors.ts` | User-facing error messages |
| Theme provider | `components/theme-provider.tsx` | Light, dark, and system theme |
| Coming soon badge | `components/coming-soon-badge.tsx` | Placeholder badge |
| Mobile hook | `hooks/use-mobile.ts` | Detect mobile layout |
| Theme shortcut | `hooks/use-theme-keyboard-shortcut.ts` | Theme keyboard control |
| Format datetime | `lib/format-datetime.ts` | Date and time formatting |
| Theme helpers | `lib/theme.ts` | Theme utility functions |

---

## 3. API base rules

1. Read `import.meta.env.VITE_API_URL`.
2. Use an empty string when the value is missing.
3. Write a development warning when the value is missing.

---

## 4. Theme rules

1. Store the theme preference in localStorage key `theme`.
2. Support light, dark, and system modes.
3. Apply the theme class on the document root.

---

## 5. Related UI packages

| Package path | Role |
|--------------|------|
| `src/components/ui` | shadcn UI primitives |
| `src/components/evilcharts` | Chart building blocks |
| `src/lib/utils.ts` | `cn()` class helper |

---

## 6. Related documents

- [architecture.md](./architecture.md)
- [reference/environment.md](./reference/environment.md)
- [modules/auth.md](./modules/auth.md)
