D(
  "kthais.se",
  REG_NONE,
  DnsProvider(DNS_CLOUDFLAREAPI),
  DefaultTTL(7200),

  // web
  HOST_SYNAPSE("@"),
  HOST_SYNAPSE("www"),

  // google mail
  GOOGLE_MX,

  // google spf
  TXT("@", "v=spf1 include:_spf.google.com ~all"),

  // google domain verification
  TXT(
    "@",
    "google-site-verification=f_5cHRcS6nxiR4XBv9-RyUQlXpBBiCIq6p8F9UtCrPU",
  ),

  // google DKIM
  TXT(
    "google._domainkey",
    "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwSyAnzkAVeNIY5KQnh49TPRE0Sg36gZ6FW2Z177fjKhQgDZZBEGYiX86sEwQ7NpmKeLOr1At48r2nEErq2xeSdNFGekNGT744GQNDclCeY1U+kP7cxMP95ozKPKZM9ndAImCnWhB39ar1yZhGFvbK/7MECjIAz9AsMD+JHvyWGxHDqct7JCklkxghSYVvKk0SsfLJRNOhgObRJlU9cDklT/zGKBhbiI1SH4qorTnMTGPHMoY0p01wslO4Shoj7v/U/1P1AuhJcznTq7oWHa7wDG0sNogy3kpIsB3VO/0TmgoUcD0TTG6euLzrl9G9ao6FrZiqDTktxb78p8IVGKFnwIDAQAB",
  ),

  // chat redirect
  HOST_SYNAPSE("chat"),
  HOST_SYNAPSE("mattermost"),

  // documents redirect
  HOST_SYNAPSE("documents"),

  LE_CAA,
  END,
);
