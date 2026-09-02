# TenderHub — Build Rules

These rules govern all architectural, implementation, and code generation tasks across the TenderHub codebase.

---

## Rule 0 — The blueprint is the only source of truth
The Rev 3.0 document (and the phase plan built from it) is the spec. Not the model's idea of what a tender platform usually looks like, not a package's example app, not "best practice" in the abstract.
- If a decision isn't in the blueprint, **stop and ask** — don't invent a plausible-sounding default and keep going.
- If the model's instinct disagrees with the blueprint (e.g. "normally you'd use a status string here"), the blueprint wins. If it thinks the blueprint is actually wrong, it says so explicitly and waits — it does not silently substitute its own pattern.
- Every generic SaaS/marketplace pattern is a suspect, not a default: multi-tenant orgs, roles, subscriptions — this system has specific, non-generic rules for all of them. Copying the generic version is the exact failure mode.

## Rule 1 — One module, fully, before the next
Do not scaffold all 28 tables, then all controllers, then all filters. For each module: migration → model → controller → filter/auth → manual verification against a running server, in that order, before starting the next module. A pile of half-wired controllers across ten modules is worse than three modules that actually work.

## Rule 2 — "Done" means verified against a running server, not written
A feature is not complete because the code compiles or the happy path returns 200 once. It's complete when the specific negative cases below are checked and refused correctly. If asked "is X done," the answer must be based on an actual request made against a running instance in this session — not a description of what the code should do.

## Rule 3 — Non-negotiable structural decisions
These are fixed. Do not "improve" or simplify them:
- **BFF pattern**: browser never talks to the API directly. Next.js route handlers forward the caller's own token; CodeIgniter is never publicly routable. `proxy.ts` is the single gate all role/quota checks pass through — no route reachable by any path (link, bookmark, typed URL, stale prefetch) that skips it.
- **Tokens live in httpOnly cookies**, never in JS-readable storage, never in localStorage/sessionStorage.
- **`notices` is one shared table** for tenders and auctions, `kind` fixed by route. Do not split into two tables.
- **`procurements.stage_idx` is an integer 0–6**, not a status string or enum of strings. Every "has this happened" check is `stage_idx >= n`.
- **Alert profiles match on slugs, never on auto-increment ids.**
- **Documents are content-addressed by SHA-256** (`aa/bb/<hash>.ext` fanout), never stored/served by a guessable static path.
- **The paywall is one transformer class** with a tier→field `RELEASE` map. A withheld field is never serialized — not filtered in the UI, not masked, not blurred. If a field shouldn't be visible, it must not leave the server in that response, in JSON-LD, or in any RSC client-component prop.
- **Plans are a config matrix, not a database table**, until there's a stated reason to move it (sales needs to edit it without a deploy).
- **The filter chain order is fixed**: `auth-jwt` → `tenant` → `group:<role>` → `entitlement:<key>`. Role check before plan check — a wrong-role user gets 403, not a 402 upsell for a plan they can't buy.

## Rule 4 — Security invariants (each must be independently verified, not assumed from role checks)
- Sealed bid data (bidder identity, price, security flag) is **never read out of the database** before opening — the query itself excludes those columns, it isn't filtered after fetching.
- Opening requires **two distinct officers** (`start` by one, `countersign` by a different one) — reject same-person with 403, reject countersign before published opening time with 409.
- An evaluator with no COI declaration on file, or a declared conflict, gets **no evaluation content at all** — not a greyed-out screen, a 403.
- Standstill period is **computed server-side** from org config — never accepted from client input.
- Self-approval above an org's threshold is refused **at the API** (403), never only hidden in the UI.
- Signed document links: minted on click (never embedded in rendered HTML), bound to document+user+expiry in one HMAC, constant-time compared, refused identically for tampered/expired/re-pointed/no-session (one message for all four — don't let error messages tell an attacker which guess was close).
- Deadlines (`closing_at`, opening time) are judged by **server time only**, never client/browser time.
- Identical error responses for unknown-account vs wrong-password, and for OTP whether-or-not-the-number-exists. No response shape may let someone enumerate accounts.
- Partner API keys are SHA-256 hashed at rest, never stored plaintext; webhook secrets shown exactly once at creation.

## Rule 5 — API conventions, fixed across all 82 endpoints
- Success: `{ data, meta }`, with `meta.now` (server time) on every payload.
- Failure: `application/problem+json` (RFC 9457), machine-readable reason, `upgrade_to` field when the failure is plan-related.
- Multi-select query params must accept repeated (`?district=1&district=2`), bracketed (`district[]=`), and comma-separated forms — PHP silently collapses repeated keys to the last value unless handled explicitly; check this specifically, don't assume the framework does it for you.
- Count queries and list queries must share the same filter conditions via one reusable constraint (closure/scope) applied to two independent query builders — never call a count method that resets or diverges from the list builder.

## Rule 6 — Explicit anti-pattern list (each of these is a documented real bug — check for it, don't just avoid it in theory)
- ❌ Filtering a locked field out in the frontend/component instead of never serializing it server-side.
- ❌ Passing a "sealed" data array as props to a client component and relying on a UI label to hide it — React serializes client-component props into the page source regardless of what's rendered.
- ❌ Writing a field into structured data (JSON-LD) that's withheld from the visible page.
- ❌ Comparing ids from different DB drivers with strict type equality (`SQLite` returns strings, `MySQL` returns ints) — cast explicitly before comparing.
- ❌ Accepting any non-empty value as a valid API key/token — actually verify against a stored hash.
- ❌ Bare date validation that accepts relative strings like "next tuesday" — pin an explicit format.
- ❌ Editing a published closing date directly instead of through an addendum — direct edits leave no record a date ever changed.
- ❌ A count query that resets/diverges from its paired list query's `WHERE`/`JOIN` clauses.
- ❌ Sending a proxied request body as re-parsed text instead of forwarding raw bytes with the original `Content-Type` — breaks multipart uploads (the boundary lives in that header).
- ❌ A service locator call for a service that isn't registered, allowed to fail silently instead of erroring loud — verify every `service()`/DI call resolves to something real, don't assume the framework will complain.

## Rule 7 — Honesty in status reporting
Never report a subsystem as done, working, or "built" without having made an actual request against a running instance and observed the actual response in this session. If something is implemented but not run/verified, say "written, not verified" — not "done." This mirrors the blueprint's own `built` / `partial` / `planned` labeling; keep using those three labels and don't round `partial` up to `built`.

## Rule 8 — When stuck, name the fork instead of picking silently
If there are two reasonable ways to implement something the blueprint doesn't fully specify, state both options and which one you're taking and why — in one line — rather than silently picking one. This is what makes a bad default catchable before it's built on top of.
