# Procedure: sign in

**Type:** Procedure  
**Max words per instruction:** 20

---

## 1. Purpose

This procedure signs a user into Sellow Web.

---

## 2. Conditions

1. The development server or the production app is running.
2. You have a valid email and password.
3. `VITE_API_URL` points to a working API.

---

## 3. Steps

1. Open the application root URL `/`.
2. Enter your email.
3. Enter your password.
4. Select the sign-in control.
5. Wait for the login request to finish.
6. If many workspaces exist, select one workspace.
7. Confirm that the dashboard opens.

---

## 4. Expected results

1. The application stores the access token.
2. The application stores the refresh token.
3. The application loads the current user.
4. The application sets an active workspace.
5. The router opens a protected dashboard route.

---

## 5. Failure actions

| Condition | Action |
|-----------|--------|
| Invalid credentials | Check email and password. Retry. |
| API URL missing | Set `VITE_API_URL`. Restart the app. |
| No workspace access | Contact an administrator. |
| Token refresh fails | Sign in again. |

---

## 6. Related documents

- [../modules/auth.md](../modules/auth.md)
- [../modules/workspaces.md](../modules/workspaces.md)
- [../getting-started.md](../getting-started.md)
