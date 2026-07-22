# Getting started

## 1. Purpose

This procedure installs and runs Sellow Web on a local machine.

---

## 2. Conditions

Before you start:

1. Install Node.js (compatible with Vite 7).
2. Install pnpm.
3. Get a valid backend API URL.

---

## 3. Install dependencies

1. Open a terminal.
2. Go to the project root.
3. Run:

```bash
pnpm install
```

---

## 4. Set the API base URL

1. Create a file named `.env` or `.env.local` in the project root.
2. Add this line:

```bash
VITE_API_URL=https://your-api-host.example
```

3. Save the file.

Do not commit secret values.

See [reference/environment.md](./reference/environment.md).

---

## 5. Start the development server

1. Run:

```bash
pnpm dev
```

2. Open the local URL that Vite prints.
3. Sign in with a valid user account.

---

## 6. Build for production

1. Run:

```bash
pnpm build
```

2. The build output is in `dist/`.

---

## 7. Preview the production build

1. Run:

```bash
pnpm preview
```

2. Open the local preview URL.

---

## 8. Quality commands

| Command | Action |
|---------|--------|
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format TypeScript files with Prettier |
| `pnpm typecheck` | Run the TypeScript checker |
| `pnpm clean` | Remove `node_modules` and `dist` |

---

## 9. Add a UI component

1. Run:

```bash
pnpm dlx shadcn@latest add <component-name>
```

2. Import the component from `@/components/ui/<component-name>`.

---

## 10. Related documents

- [architecture.md](./architecture.md)
- [procedures/login.md](./procedures/login.md)
- [reference/environment.md](./reference/environment.md)
