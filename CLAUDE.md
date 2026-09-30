# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

The single source of truth for the KTH AI Society's DNS records, expressed in
[DNSControl](https://docs.dnscontrol.org/)'s JavaScript DSL and applied to Cloudflare.
There is no application code here — every `.js` file is DNSControl configuration, evaluated
by the `dnscontrol` binary (not Node).

**Merging to `main` applies the change to live DNS.** There is no manual approval step between
merge and apply; the push workflow runs on every commit to `main`.

## Commands

Requires the `dnscontrol` binary (currently v5.3.0 via Homebrew — keep it matched to the pinned
container image in `.github/workflows/`).

```sh
dnscontrol check                        # validate DSL syntax; needs no credentials
dnscontrol preview                      # diff config against live Cloudflare
dnscontrol preview --domains kthais.com # ...restricted to one zone
dnscontrol preview --expect-no-changes  # what the drift workflow runs; non-zero exit on drift
dnscontrol push                         # apply. Normally CI-only — see above

npx prettier@3.9.9 --check .            # what the prettier workflow runs; needs Node
npx prettier@3.9.9 --write .            # fix formatting in place
```

Prettier runs with its defaults (there is no config or ignore file) over every file type it
supports — Markdown and YAML as well as the DNSControl `.js`. Keep the version matched to
`.github/workflows/prettier.yml`. It pads Markdown tables to aligned columns, so after editing a
table in this file or `README.md`, run `--write` rather than aligning by hand.

Anything beyond `check` needs `CLOUDFLARE_DNSCONTROL_TOKEN`. `.envrc` (gitignored, direnv)
fetches it from 1Password: `op item get "Cloudflare DNSControl API Token" --account
kthaisociety.1password.eu`, so you must be signed in to `op` first. `creds.json` _is_ committed
but holds only `$VAR` indirections, never secret material — keep it that way.

## Architecture

`dnsconfig.js` is the entrypoint and runs in this order:

1. Declares the providers: `REG_NONE` (registrar `none_primary`) and `DNS_CLOUDFLAREAPI`.
2. `require("functions.js")` — shared record macros.
3. `require_glob("./domains/")` — one file per zone, each a single `D(...)` block ending in `END`.
4. Walks `getConfiguredDomains()` and `D_EXTEND`s every zone with `DNSCONTROL_MANAGED`.

Step 4 means the `dnscontrol-managed` TXT marker is applied automatically to every zone — never
add it to an individual domain file. Anything else that must hold for _all_ zones belongs in that
loop rather than repeated per file.

Registrar is `REG_NONE` for every zone: nameserver delegation and registrar state are **not**
managed here. This repo only owns records inside the existing Cloudflare zones.

### functions.js macros

Prefer these over raw records; they are the reason a service move is a one-line change:

- `HOST_SYNAPSE(name, ...modifiers)` — A + AAAA pointing at the Synapse host. Variadic, so extra
  record modifiers pass through: `HOST_SYNAPSE("chat-maintenance", TTL(300))`. Most web-facing
  names in this repo use it; changing the host IP here moves every one of them.
- `GOOGLE_MX`, `LE_CAA` (Let's Encrypt-only CAA via `CAA_BUILDER`), `DNSCONTROL_MANAGED`.

A macro returning a list is spliced into the `D()` argument list directly — write `GOOGLE_MX,`
with no call parentheses, unlike `HOST_SYNAPSE(...)` which takes arguments.

Zones default to `DefaultTTL(7200)`; per-record `TTL()` is used for names expected to move soon.

## CI

The three `dnscontrol-*` workflows run in the pinned `ghcr.io/dnscontrol/dnscontrol:5.3.0`
container; `prettier` runs `npx prettier@3.9.9` directly on the runner.

| Workflow             | Trigger                        | Does                                                                                             |
| -------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------ |
| `dnscontrol-preview` | PR to `main`                   | `preview`, diff into the job summary. Skipped for fork PRs (no secret access).                   |
| `dnscontrol-push`    | push to `main`, manual         | `push --notify`                                                                                  |
| `dnscontrol-drift`   | cron 05:17 & 17:17 UTC, manual | `preview --notify --expect-no-changes` — fails on out-of-band Cloudflare edits                   |
| `prettier`           | PR to `main`                   | `prettier --check .` — fails on unformatted files. Needs no secrets, so it runs on fork PRs too. |

`push` and `drift` share the `dnscontrol-apply` concurrency group (`cancel-in-progress: false`) so
a drift check never reads Cloudflare mid-apply and reports not-yet-applied changes as drift. Keep
any new workflow that reads or writes live DNS in that same group.

`--notify` posts to Mattermost via the `notifications` entry in `creds.json` (`shoutrrr_url` →
`$MATTERMOST_WEBHOOK_URL`); it is silent when there is nothing to report.
