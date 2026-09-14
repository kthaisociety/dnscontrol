// Providers:
var REG_NONE = NewRegistrar("none_primary");
var DNS_CLOUDFLAREAPI = NewDnsProvider("cloudflareapi_primary");

// Various functions that might be used
require("functions.js");

// Domains:
require_glob("./domains/");

// Add TXT record to all zones with info about DNSControl managed zones
var domains = getConfiguredDomains();
for (i = 0; i < domains.length; i++) {
  D_EXTEND(domains[i], DNSCONTROL_MANAGED);
}
