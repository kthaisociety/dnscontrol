## What changes

<!-- Which names, on which zone, and what they point at now vs. after. One or two lines. -->

## Why

<!-- The service being launched, moved, verified or retired. Link the issue or chat thread if there is one. -->

## Checklist

- [ ] I read the **preview** diff in CI and it changes only the records I intended
- [ ] Records live in the right `domains/<zone>.js` file, inside its existing `D(...)` block
- [ ] Used the `functions.js` helpers (`HOST_SYNAPSE`, `GOOGLE_MX`, `LE_CAA`) where they fit,
      rather than hand-written equivalents
- [ ] `CNAME`/`MX` targets end with a trailing dot
- [ ] New names are grouped under a `// comment` saying what they are for
- [ ] No secrets, tokens or private keys — `creds.json` still contains only `$VAR` references
- [ ] Changes are limited to DNS; no unrelated edits to workflows, `dnsconfig.js` or `creds.json`
      mixed into this PR

## Anything risky?

<!--
Call it out if this PR touches:
  - MX, SPF, DKIM or DMARC records  -> can break mail delivery
  - CAA records                     -> can block certificate issuance
  - apex (`@`) or `www`             -> takes the main site down if wrong
  - deletions                       -> say what is being retired and confirm it is really unused
Lower the TTL in a separate, earlier PR if you are about to move something.
Otherwise: "nothing risky".
-->

---

⚠️ Merging this applies it to live DNS immediately.
