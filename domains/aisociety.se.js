D(
  "aisociety.se",
  REG_NONE,
  DnsProvider(DNS_CLOUDFLAREAPI),
  DefaultTTL(7200),

  // web
  HOST_SYNAPSE("@"),
  HOST_SYNAPSE("www"),

  // synapse, the host everything below runs on
  HOST_SYNAPSE("synapse"),

  // wildcard for preview deployments on the Synapse host
  HOST_SYNAPSE("*.preview-synapse"),

  // documents, association documents and statutes (GitHub Pages)
  // https://github.com/kthaisociety/documents.aisociety.se
  CNAME("documents", "kthaisociety.github.io."),

  // chat, the Mattermost server
  // NOTE: not on the Synapse host, so raw A/AAAA rather than HOST_SYNAPSE
  A("chat", "153.92.126.113"),
  AAAA("chat", "2a0e:dc0:2:91bb::1"),

  // chat-maintenance, placeholder shown while chat is down
  // https://github.com/kthaisociety/mattermost-maintenance-placeholder
  HOST_SYNAPSE("chat-maintenance", TTL(300)),

  // chat redirect
  HOST_SYNAPSE("mattermost"),

  // minio, S3-compatible object storage
  // https://github.com/kthaisociety/minio-docker
  HOST_SYNAPSE("s3.synapse"),
  HOST_SYNAPSE("console.s3.synapse"),

  // google domain verification
  TXT(
    "@",
    "google-site-verification=Q34Mq3qN7XxMWtQ21UAlaXkMInJCk_F0EmrTy3PZ3Eo",
  ),

  // amazon ses DKIM
  CNAME(
    "m2gmbeg67f4lpbvjzhvmwh5yszup5a6v._domainkey",
    "m2gmbeg67f4lpbvjzhvmwh5yszup5a6v.dkim.amazonses.com.",
  ),
  CNAME(
    "vqc2itemjzcn77kydt57h2ctb2z55tlt._domainkey",
    "vqc2itemjzcn77kydt57h2ctb2z55tlt.dkim.amazonses.com.",
  ),
  CNAME(
    "eu6hcpyidhdvqsuqlrod3sbmxnhc2gte._domainkey",
    "eu6hcpyidhdvqsuqlrod3sbmxnhc2gte.dkim.amazonses.com.",
  ),

  // amazon ses mail-from subdomain
  MX("ses", 10, "feedback-smtp.eu-north-1.amazonses.com."),
  TXT("ses", "v=spf1 include:amazonses.com ~all"),

  // mail policy
  TXT("_dmarc", "v=DMARC1; p=none;"),

  // google mail
  GOOGLE_MX,

  // lumina, ai study guide
  // repo: TBD
  HOST_SYNAPSE("lumina"),
  HOST_SYNAPSE("lumina-staging"),

  LE_CAA,
  END,
);
