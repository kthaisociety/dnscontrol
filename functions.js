var DNSCONTROL_MANAGED = [
  // TXT record to determine that this zone is managed by DNSControl (this repo)
  TXT("dnscontrol-managed", "This zone is managed by DNSControl"),
];

var HOST_SYNAPSE = function (dns_name) {
  var modifiers = Array.prototype.slice.call(arguments, 1);
  return [
    A.apply(null, [dns_name, "176.126.70.246"].concat(modifiers)),
    AAAA.apply(
      null,
      [dns_name, "2a0e:dc0:2:6c29::dead:beef"].concat(modifiers),
    ),
  ];
};

var GOOGLE_MX = [
  MX("@", 1, "aspmx.l.google.com."),
  MX("@", 5, "alt1.aspmx.l.google.com."),
  MX("@", 5, "alt2.aspmx.l.google.com."),
  MX("@", 10, "alt3.aspmx.l.google.com."),
  MX("@", 10, "alt4.aspmx.l.google.com."),
];

var LE_CAA = [
  CAA_BUILDER({
    label: "@",
    iodef: "mailto:contact@kthais.com",
    issue: ["letsencrypt.org"],
  }),
];