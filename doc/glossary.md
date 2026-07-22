# Glossary — technical nouns and technical verbs

This glossary lists project terms for ASD-STE100.

Use these terms with one meaning only.

---

## Technical nouns

| Term | Meaning |
|------|---------|
| access token | Short-life token for API authorization |
| refresh token | Long-life token that renews the access token |
| authorized fetch | HTTP helper that adds auth headers and renews tokens |
| workspace | Tenant unit that owns leads and members |
| workspace id | Unique identifier of a workspace |
| active workspace | Workspace in use for the current session |
| workspace role | Role of a user in one workspace: `OWNER`, `ADMIN`, or `MEMBER` |
| global role | Platform role of a user: `USER` or `SUPER_ADMIN` |
| lead | Sales contact or company record |
| lead status | Pipeline stage of a lead |
| import review | Triage state of an imported lead |
| pipeline | Kanban board of lead statuses |
| integration run | Async job that imports leads from an external source |
| loss reason | Reason recorded when a lead status is `LOST` |
| follow-up | Scheduled next contact for a lead |
| lead notes | Free-text notes attached to a lead |
| feedback | User message about a bug or a suggestion |
| dashboard overview | Summary metrics for the home page |
| query key | Cache key for TanStack Query |
| business query key | Query key scoped by workspace id |
| feature module | Code folder under `src/features` |
| route tree | Generated route map in `routeTree.gen.ts` |
| API base URL | Value of `VITE_API_URL` |
| workspace header | HTTP header `X-Workspace-Id` |
| import hub | Page that starts lead imports |
| lead detail sheet | Side panel that shows one lead |

---

## Technical verbs

| Term | Meaning |
|------|---------|
| sign in | Authenticate with email and password |
| sign out | End the session and clear local tokens |
| refresh | Request a new access token with the refresh token |
| authorize | Attach tokens and headers to an HTTP request |
| resolve | Select the active workspace from available workspaces |
| invalidate | Mark cached query data as stale |
| import | Create leads from external data |
| triage | Set the import review state of a lead |
| abort | Stop an integration run |
| promote | Change a member role to `OWNER` |

---

## Lead status values

| Value | UI label (Portuguese) | In pipeline |
|-------|----------------------|-------------|
| `IMPORTED` | Importado | No |
| `NEW` | Novo | Yes |
| `CONTACTED` | Contatado | Yes |
| `QUALIFYING` | Qualificação | Yes |
| `BRIEFING` | Briefing | Yes |
| `PROPOSAL_SENT` | Proposta enviada | Yes |
| `NEGOTIATION` | Negociação | Yes |
| `WON` | Ganho | Yes |
| `LOST` | Perdido | Yes |

---

## Workspace role values

| Value | Meaning |
|-------|---------|
| `OWNER` | Full control of the workspace |
| `ADMIN` | Manage members and delete leads |
| `MEMBER` | Create and update leads |

---

## Global role values

| Value | Meaning |
|-------|---------|
| `USER` | Standard platform user |
| `SUPER_ADMIN` | Platform administrator |

---

## Feedback type values

| Value | Meaning |
|-------|---------|
| `BUG` | Defect report |
| `SUGGESTION` | Improvement idea |
| `OTHER` | Other message |

---

## Feedback status values

| Value | Meaning |
|-------|---------|
| `OPEN` | New item |
| `IN_REVIEW` | Under review |
| `RESOLVED` | Fixed or accepted |
| `CLOSED` | Closed without further work |

---

## Storage keys

| Key | Storage | Content |
|-----|---------|---------|
| `sellow_access_token` | localStorage | Access token |
| `sellow_refresh_token` | localStorage | Refresh token |
| `sellow_active_workspace_id` | localStorage | Active workspace id |
| `theme` | localStorage | Theme preference |

---

## Words to avoid

Do not use these synonyms. Use the approved term.

| Avoid | Use |
|-------|-----|
| commence / initiate / begin | start |
| utilize | use |
| terminate (session) | sign out |
| fetch (as noun for API call) | request |
| tenant | workspace |
| deal / opportunity | lead |
| board (sales) | pipeline |
