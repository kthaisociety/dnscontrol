D(
  "ktha.is",
  REG_NONE,
  DnsProvider(DNS_CLOUDFLAREAPI),
  DefaultTTL(7200),

  // web, short-link domain
  HOST_SYNAPSE("@"),
  HOST_SYNAPSE("www"),

  // app
  // NOTE: ktha.is is for short links.
  HOST_SYNAPSE("app"),

  LE_CAA,
  END,
);
