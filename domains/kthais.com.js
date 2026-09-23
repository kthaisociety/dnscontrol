D(
  "kthais.com",
  REG_NONE,
  DnsProvider(DNS_CLOUDFLAREAPI),
  DefaultTTL(7200),

  // web
  HOST_SYNAPSE("@"),
  HOST_SYNAPSE("www"),

  // api, backend for the main site
  // https://github.com/kthaisociety/landingpage-backend
  HOST_SYNAPSE("api"),

  // ai-study-guide, LLM-assisted study guide for KTH students
  // https://github.com/kthaisociety/AI-Study-Guide
  HOST_SYNAPSE("ai-study-guide"),

  // blog, hosted externally (not on the Synapse host)
  A("blog", "162.159.152.4"),
  A("blog", "162.159.153.4"),

  // google mail
  GOOGLE_MX,

  // mail, Google Workspace mail UI
  CNAME("mail", "ghs.googlehosted.com."),

  // domain verification
  TXT("@", "1password-site-verification=UPVJWGBQUJD25H6ATVPFOWP7CY"),
  TXT(
    "@",
    "atlassian-domain-verification=WzlM0SAapn/TLo4Zdqb3aKH7S9vCfRL7I48PW8HcSRZ1lBA7DS0unQ5wNVTeJaKq",
  ),
  TXT(
    "@",
    "google-site-verification=_-b1c39rAbYqUddvyTFRv4MFi0wAl_mXFcrZkQ998EE",
  ),
  // google search console
  TXT(
    "@",
    "google-site-verification=qPFq_dJHERVhDjxHM0uLx-E-UB7IzWQ_Gk88RJxeBjI",
  ),

  // mail policy
  TXT("@", "v=spf1 include:_spf.google.com ~all"),
  TXT("_dmarc", "v=DMARC1; p=none;"),

  // google DKIM
  TXT(
    "google._domainkey",
    "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApZSr/Jn/HKIClV05g4jRlvpOdG5GO/jseorqGIzkSCNXOiNz3krg7AtZyPZ1KFxpiWnZ0vQA6JKDxXV/rpdx83NfJr4COV/OSgLswdMsrzxCkI8cEcvrvXIia6rf6MkxnaTq91GY1jvurCOBs4PkzN6fBcRSi+iHb7AkWMmPVuXwu3gzbrIwvbwucEjs9NBI/BGMPZYIRBlhpDJEzDvS0Ghvcgqq2aWAO6/4czXV+uI7TrFr4WbiUvBIRl/9SjjycBC9xG5zVXoc1GoD4bZ9agLQORv2oH252jcFxt9WgGRRZmGt6Tknlal6MRFp0C11SIstJuvfe6IsXJz45/y0fwIDAQAB",
  ),

  // amazon ses DKIM
  CNAME(
    "iqsxmlmlln6j2qgbtkocmkdmd3xiqt2g._domainkey",
    "iqsxmlmlln6j2qgbtkocmkdmd3xiqt2g.dkim.amazonses.com.",
  ),
  CNAME(
    "aig2jmi5bsw5mmv3dalk6loev2tsjb7h._domainkey",
    "aig2jmi5bsw5mmv3dalk6loev2tsjb7h.dkim.amazonses.com.",
  ),
  CNAME(
    "q2xp4x6bkfhgn7roatfdueceyezfagze._domainkey",
    "q2xp4x6bkfhgn7roatfdueceyezfagze.dkim.amazonses.com.",
  ),

  // amazon ses mail-from subdomain
  MX("ses", 10, "feedback-smtp.eu-north-1.amazonses.com."),
  TXT("ses", "v=spf1 include:amazonses.com ~all"),

  // chat redirect
  HOST_SYNAPSE("chat"),
  HOST_SYNAPSE("mattermost"),

  // documents redirect
  HOST_SYNAPSE("documents"),

  // pyrmit
  // https://github.com/kthaisociety/pyrmit
  HOST_SYNAPSE("pyrmit"),
  HOST_SYNAPSE("api.pyrmit"),

  // pyrmit staging
  // NOTE: named -dev, predating the -staging convention. Left as-is because
  // renaming would break the live hostname. Use -staging for new projects.
  // https://github.com/kthaisociety/pyrmit
  HOST_SYNAPSE("pyrmit-dev"),
  HOST_SYNAPSE("api.pyrmit-dev"),

  // gnosis
  // https://github.com/kthaisociety/gnosis
  HOST_SYNAPSE("gnosis"),
  HOST_SYNAPSE("api.gnosis"),

  // kthcoursecommunity staging (no production name on this zone yet)
  // NOTE: named -dev, predating the -staging convention. Left as-is because
  // renaming would break the live hostname. Use -staging for new projects.
  // https://github.com/kthaisociety/KTH-Course-Community
  HOST_SYNAPSE("kthcoursecommunity-dev"),
  HOST_SYNAPSE("api.kthcoursecommunity-dev"),

  LE_CAA,
  END,
);
