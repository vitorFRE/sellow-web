# Module: auth

**Path:** `src/features/auth`  
**Type:** Description

---

## 1. Purpose

The auth module signs the user in and keeps the session valid.

The module also clears the session when the user signs out.

---

## 2. Main parts

| Part | Path | Role |
|------|------|------|
| Login page | `components/login-page.tsx` | Sign-in screen |
| Login form | `components/login-form.tsx` | Email and password form |
| Auth API | `api/auth-api.ts` | Login, refresh, me, logout |
| Token storage | `lib/token-storage.ts` | Read and write tokens |
| Authorized fetch | `lib/authorized-fetch.ts` | Authenticated HTTP helper |
| Refresh mutex | `lib/refresh-mutex.ts` | One refresh at a time |
| Clear auth | `lib/clear-auth-state.ts` | Remove tokens and workspace id |
| Logout | `lib/logout.ts` | Sign-out flow |
| Me query | `queries/auth-me-query.ts` | Current user query |
| Login schema | `schemas/login-schema.ts` | Form validation |

---

## 3. Sign-in flow

1. The user enters email and password.
2. The form sends `POST /auth/login`.
3. The module stores the access token and the refresh token.
4. The module loads `GET /auth/me`.
5. The application resolves the active workspace.
6. The router opens the dashboard or the workspace selector.

---

## 4. Authorized request flow

1. Read the access token from storage.
2. Add `Authorization: Bearer <access token>`.
3. Add `X-Workspace-Id` unless the call skips the workspace header.
4. Send the request.
5. If the response is `401`, refresh the access token.
6. Retry the request one time.
7. If the retry fails, clear the auth state.

---

## 5. Token refresh

1. Read the refresh token.
2. Send `POST /auth/refresh` with the refresh token.
3. Store the new tokens.
4. Continue the failed request.

The refresh mutex stops parallel refresh calls.

---

## 6. Sign-out flow

1. Send `POST /auth/logout` when possible.
2. Clear local tokens.
3. Clear the active workspace id.
4. Open route `/`.

---

## 7. API endpoints

| Method | Path | Auth |
|--------|------|------|
| POST | `/auth/login` | No |
| POST | `/auth/refresh` | Refresh token |
| GET | `/auth/me` | Access token |
| POST | `/auth/logout` | Access token |

---

## 8. Key types

| Type | Meaning |
|------|---------|
| `AuthUser` | Current user profile |
| `GlobalRole` | `USER` or `SUPER_ADMIN` |
| `LoginResponse` | Tokens from login |
| `RefreshResponse` | Tokens from refresh |

---

## 9. Related documents

- [../procedures/login.md](../procedures/login.md)
- [workspaces.md](./workspaces.md)
- [../reference/permissions.md](../reference/permissions.md)
