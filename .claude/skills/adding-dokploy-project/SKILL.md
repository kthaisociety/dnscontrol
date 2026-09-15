---
name: adding-dokploy-project
description: Use when someone wants DNS for a project hosted on Dokploy - launching a new app, giving a service a subdomain, or adding a staging environment to a project that already has one.
---

# Adding a Dokploy project

## Overview

**Dokploy runs on the Synapse host.** Every Dokploy project is therefore a `HOST_SYNAPSE()` record,
never a raw `A`/`AAAA` pair. Dokploy's reverse proxy routes by hostname, so DNS needs nothing beyond
the name pointing at that host.

## Ask first

Gather these in one message, asking only for what the request hasn't already given you. "Launching
orbit, our reading-group finder, repo github.com/kthaisociety/orbit" has already answered 2, 3
and 5 — don't re-ask those.

1. **Zone** — decide from the table and state your pick with an opt-out ("I'd put this on
   `kthais.com` — sound right?"). Don't ask open-endedly.
2. **Project name** — becomes the hostname, lowercased, spaces to hyphens (`AI Study Guide` →
   `ai-study-guide`)
3. **What it is** — one short phrase, for the comment
4. **Staging?** — confirm, don't infer. "Somewhere to test it" is not a yes.
5. **Where it lives** — repo URL, for the comment
6. **API host?** — if yes, `api.<project>` (plus `api.<project>-staging` when staging was requested)

| Zone | For |
|---|---|
| `kthais.com` | Projects for the KTH chapter — member tools, course things. The usual answer. |
| `aisociety.se` | Broader AI Society projects, not specific to KTH. |

Projects don't go on `kthais.se` (redirects only) or `ktha.is` (short links — its lone `app` record
is a legacy exception, not a precedent).

Before writing, grep the zone file for the name to confirm it's free.

## The records

Insert **directly above `LE_CAA`**, whatever else sits in between — on some zones the last project
block is nowhere near the bottom of the file. Project name first, `-staging` second.

```js
  // orbit, reading group finder
  // https://github.com/kthaisociety/orbit
  HOST_SYNAPSE("orbit"),
  HOST_SYNAPSE("orbit-staging"),
```

With an API host, add `api.orbit` (and `api.orbit-staging`) to the same block, web names before API
names. No `TTL()` — a new name has nothing cached, so it takes the zone default.

**The two comment lines are a new convention.** No existing block carries a repo URL; write it
anyway. If the repo genuinely doesn't exist yet, use `// repo: TBD` so it's greppable later, and say
so in the PR.

**Adding staging to a project that already exists:** extend that project's existing block rather
than starting a second one.

## Then

Run `dnscontrol check`, then open a PR and fill in the template. Never push to `main` — merging
applies to live DNS immediately. The CI preview is enough; a local `dnscontrol preview` needs the
Cloudflare token from 1Password.

Tell the member that `LE_CAA` locks the zone to Let's Encrypt. Dokploy's default Traefik certs are
fine, but a non-LE certificate fails to issue with an error that doesn't look like a CAA problem.

## Common mistakes

| Mistake | Fix |
|---|---|
| Raw `A`/`AAAA` with the Synapse IP | `HOST_SYNAPSE()` keeps the IP in one place |
| Staging named `-dev` | Use `-staging`. `pyrmit-dev` and `kthcoursecommunity-dev` predate this |
| Copying `lumina`'s ordering | That block is `-staging` first and predates this skill. Name first |
| Dropping the repo URL to match surrounding style | Existing blocks predate the convention. Write both lines |
| Zone picked as "wherever the other projects are" | Use the table. KTH-specific vs. general is the rule |
