# DNS for KTH AI Society

Every DNS record for our domains, managed as code with [DNSControl](https://docs.dnscontrol.org/)
and applied to Cloudflare.

Zones: **kthais.com**, **kthais.se**, **aisociety.se**, **ktha.is**

> ⚠️ **Merging to `main` changes live DNS immediately.** There is no separate deploy step.

## Making a change

1. Edit the zone's file in `domains/` — one file per domain.
2. Open a pull request. CI posts a **preview** of exactly which records will change; read it before
   asking for review.
3. Merge. The change is applied within a minute or two.

Nameserver delegation and registrar settings are _not_ managed here — only the records inside our
existing Cloudflare zones.

## Writing records

Use the helpers in `functions.js` instead of raw records wherever they fit:

```js
HOST_SYNAPSE("lumina")            // A + AAAA pointing at our Synapse host
HOST_SYNAPSE("chat", TTL(300))    // ...with a shorter TTL while a service is moving
GOOGLE_MX,                        // Google Workspace mail (note: no parentheses)
LE_CAA,                           // CAA locking certs to Let's Encrypt
```

`HOST_SYNAPSE` is how almost every web-facing name is defined, so moving the host is a one-line
change. A helper that takes no arguments is written bare with a trailing comma.

Conventions worth matching:

- Targets of `CNAME` and `MX` end with a trailing dot: `"ghs.googlehosted.com."`
- Group records under a short `// comment` saying what the name is for.
- Don't add the `dnscontrol-managed` TXT record — it is applied to every zone automatically.

## Running it locally

You need the `dnscontrol` binary, matching the version pinned in `.github/workflows/`:

```sh
brew install dnscontrol
dnscontrol check      # validate syntax — no credentials needed
```

To diff against live DNS you also need our Cloudflare token.


If you have 1Password [1Password CLI](https://developer.1password.com/docs/cli/) you can use [direnv](https://direnv.net/) with a `.envrc` file:

```.envrc
export CLOUDFLARE_DNSCONTROL_TOKEN=$(op item get "Cloudflare DNSControl API Token" --account kthaisociety.1password.eu --reveal --fields label=password)
```

Then you can do:

```sh
op signin --account kthaisociety.1password.eu
direnv allow

dnscontrol preview                        # show what would change
dnscontrol preview --domains kthais.com   # ...for one zone only
```

You shouldn't need to run `dnscontrol push` by hand, CI does it on merge.

## Automation

| Workflow | When               | What                                                                    |
| -------- | ------------------ | ----------------------------------------------------------------------- |
| preview  | on every PR        | comments the diff, so changes get reviewed before merge                 |
| push     | on merge to `main` | applies the change and notifies Mattermost                              |
| drift    | twice a day        | fails if someone edited DNS in the Cloudflare dashboard instead of here |

If the drift check fires, someone made a change outside this repo. Fix it by making the same change
here, or re-run `push` to overwrite it.
