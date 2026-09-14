D(
  "aisociety.se",
  REG_NONE,
  DnsProvider(DNS_CLOUDFLAREAPI),
  DefaultTTL(7200),

  // web
  HOST_SYNAPSE("@"),
  HOST_SYNAPSE("www"),

  // synapse
  HOST_SYNAPSE("synapse"),

  // wildcard
  HOST_SYNAPSE("*.preview-synapse"),

  // documents
  CNAME("documents", "kthaisociety.github.io."),

  // chat
  A("chat", "153.92.126.113"),
  AAAA("chat", "2a0e:dc0:2:91bb::1"),

  HOST_SYNAPSE("chat-maintenance", TTL(300)),

  // new-chat
  A("chat-new", "153.92.126.113", TTL(300)),
  AAAA("chat-new", "2a0e:dc0:2:91bb::1", TTL(300)),

  // old-chat
  A("chat-old", "188.66.62.216", TTL(60)),
  AAAA("chat-old", "2a0d:5f47:fffc:10::11", TTL(60)),

  // chat redirect
  HOST_SYNAPSE("mattermost"),

  // lumina, ai study guide
  HOST_SYNAPSE("lumina-staging"),
  HOST_SYNAPSE("lumina"),

  // minio
  HOST_SYNAPSE("s3.synapse"),
  HOST_SYNAPSE("console.s3.synapse"),

  // google verification
  TXT(
    "@",
    "google-site-verification=Q34Mq3qN7XxMWtQ21UAlaXkMInJCk_F0EmrTy3PZ3Eo",
  ),

  // amazon ses
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
  MX("ses", 10, "feedback-smtp.eu-north-1.amazonses.com."),
  TXT("ses", "v=spf1 include:amazonses.com ~all"),

  TXT("_dmarc", "v=DMARC1; p=none;"),

  GOOGLE_MX,

  LE_CAA,
  END,
);
