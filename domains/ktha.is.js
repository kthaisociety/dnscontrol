D(
  "ktha.is",
  REG_NONE,
  DnsProvider(DNS_CLOUDFLAREAPI),
  DefaultTTL(7200),

  HOST_SYNAPSE("@"),
  HOST_SYNAPSE("www"),

  HOST_SYNAPSE("app"),

  LE_CAA,
  END,
);
