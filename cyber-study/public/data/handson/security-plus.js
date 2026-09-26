/* Hands-on firewall policy exercises for CompTIA Security+. Checked by tools/check-data.js against public/assets/fw.js. */
CertHub.addHandson("security-plus", {
  items: [
    {
      id: "secp-fw-smtp", kind: "fw", d: 3,
      title: "Only the mail server may send SMTP",
      prompt: "Several workstations were caught sending spam directly to the internet on TCP 25. Only the mail server (`mail-server`, 172.16.1.25 in the DMZ) should send SMTP out.\n\nUpdate the rules so workstations can browse the web and use DNS but can't send SMTP to the internet. This firewall ends with an implicit deny.",
      hint: "Replace service any in the inside rule with the ports users need: tcp/80, tcp/443 and udp/53. Keep the mail server's tcp/25 rule.",
      explain: "Restricting outbound SMTP to the mail server is an egress filtering control: infected hosts can't send spam or exfiltrate data by email, and the mail server can apply filtering and logging. The inside rule should list only the services users need, which is least privilege; everything else falls to the implicit deny at the end of the rule list.",
      setup: { vendor: "generic", zones: ["inside", "dmz", "outside"], addresses: { "inside-net": "10.1.0.0/16", "mail-server": "172.16.1.25" } },
      rules: [
        { name: "mail-out", from: ["dmz"], to: ["outside"], src: ["mail-server"], dst: ["any"], app: ["any"], service: ["tcp/25"], action: "allow" },
        { name: "inside-out", from: ["inside"], to: ["outside"], src: ["inside-net"], dst: ["any"], app: ["any"], service: ["any"], action: "allow" }
      ],
      solution: [
        { name: "mail-out", from: ["dmz"], to: ["outside"], src: ["mail-server"], dst: ["any"], app: ["any"], service: ["tcp/25"], action: "allow" },
        { name: "inside-out", from: ["inside"], to: ["outside"], src: ["inside-net"], dst: ["any"], app: ["any"], service: ["tcp/80", "tcp/443", "udp/53"], action: "allow" }
      ],
      tests: [
        { label: "Mail server sends mail on TCP 25", flow: { from: "dmz", to: "outside", src: "172.16.1.25", dst: "198.51.100.25", proto: "tcp", port: 25 }, expect: "allow" },
        { label: "Workstation sends SMTP to the internet", flow: { from: "inside", to: "outside", src: "10.1.5.7", dst: "198.51.100.25", proto: "tcp", port: 25 }, expect: "deny" },
        { label: "Workstation browses an HTTPS site", flow: { from: "inside", to: "outside", src: "10.1.5.7", dst: "192.0.2.80", proto: "tcp", port: 443 }, expect: "allow" },
        { label: "Workstation sends a DNS query", flow: { from: "inside", to: "outside", src: "10.1.5.7", dst: "192.0.2.53", proto: "udp", port: 53 }, expect: "allow" }
      ]
    },
    {
      id: "secp-fw-quarantine", kind: "fw", d: 4,
      title: "Quarantine a compromised host",
      prompt: "During an incident, workstation 10.1.9.44 (`infected-pc`) must be cut off from the network while the team investigates. A block rule was added, but the host is still reaching the internet and the file server.\n\nFix the rule list so the infected PC is blocked everywhere and other hosts keep working.",
      hint: "The firewall uses the first rule that matches. The block rule is at the bottom, below the broad allows. Move it to the top.",
      explain: "Containment is the step after detection in incident response, and isolating a host with a firewall rule is a common way to do it. A rule only works if nothing above it matches first: here the broad allow rules shadow the block. Putting specific denies above general allows, and testing afterward, is basic firewall hygiene.",
      setup: { vendor: "generic", zones: ["inside", "servers", "outside"], addresses: { "inside-net": "10.1.0.0/16", "infected-pc": "10.1.9.44", "file-server": "10.10.0.20" } },
      rules: [
        { name: "inside-to-files", from: ["inside"], to: ["servers"], src: ["inside-net"], dst: ["file-server"], app: ["any"], service: ["tcp/445"], action: "allow" },
        { name: "inside-out", from: ["inside"], to: ["outside"], src: ["inside-net"], dst: ["any"], app: ["any"], service: ["tcp/80", "tcp/443", "udp/53"], action: "allow" },
        { name: "quarantine", from: ["any"], to: ["any"], src: ["infected-pc"], dst: ["any"], app: ["any"], service: ["any"], action: "deny" }
      ],
      solution: [
        { name: "quarantine", from: ["any"], to: ["any"], src: ["infected-pc"], dst: ["any"], app: ["any"], service: ["any"], action: "deny" },
        { name: "inside-to-files", from: ["inside"], to: ["servers"], src: ["inside-net"], dst: ["file-server"], app: ["any"], service: ["tcp/445"], action: "allow" },
        { name: "inside-out", from: ["inside"], to: ["outside"], src: ["inside-net"], dst: ["any"], app: ["any"], service: ["tcp/80", "tcp/443", "udp/53"], action: "allow" }
      ],
      tests: [
        { label: "Infected PC reaches the internet", flow: { from: "inside", to: "outside", src: "10.1.9.44", dst: "198.51.100.61", proto: "tcp", port: 443 }, expect: "deny" },
        { label: "Infected PC reaches the file server", flow: { from: "inside", to: "servers", src: "10.1.9.44", dst: "10.10.0.20", proto: "tcp", port: 445 }, expect: "deny" },
        { label: "Healthy PC reaches the file server", flow: { from: "inside", to: "servers", src: "10.1.9.50", dst: "10.10.0.20", proto: "tcp", port: 445 }, expect: "allow" },
        { label: "Healthy PC browses an HTTPS site", flow: { from: "inside", to: "outside", src: "10.1.9.50", dst: "192.0.2.80", proto: "tcp", port: 443 }, expect: "allow" }
      ]
    },
    {
      id: "secp-fw-guest", kind: "fw", d: 3,
      title: "Segment guest Wi-Fi",
      prompt: "The guest network's rule sends guest traffic to `any` zone on any port, so visitors can reach inside servers.\n\nChange it so guests reach only the outside zone, using web (tcp/80, tcp/443) and DNS (udp/53).",
      hint: "Set the destination zone to outside and list the three services. The implicit deny blocks the rest.",
      explain: "Segmentation keeps untrusted devices away from internal systems. Guest Wi-Fi is treated like the internet: allowed out, never in. Naming only the destination zone and services guests need is least privilege, and the implicit deny at the end of the list blocks everything else, including SMB to internal servers.",
      setup: { vendor: "generic", zones: ["inside", "guest", "outside"], addresses: { "guest-net": "172.20.0.0/22" } },
      rules: [
        { name: "guest-any", from: ["guest"], to: ["any"], src: ["guest-net"], dst: ["any"], app: ["any"], service: ["any"], action: "allow" }
      ],
      solution: [
        { name: "guest-internet", from: ["guest"], to: ["outside"], src: ["guest-net"], dst: ["any"], app: ["any"], service: ["tcp/80", "tcp/443", "udp/53"], action: "allow" }
      ],
      tests: [
        { label: "Guest browses an HTTPS site", flow: { from: "guest", to: "outside", src: "172.20.1.14", dst: "192.0.2.80", proto: "tcp", port: 443 }, expect: "allow" },
        { label: "Guest sends a DNS query", flow: { from: "guest", to: "outside", src: "172.20.1.14", dst: "192.0.2.53", proto: "udp", port: 53 }, expect: "allow" },
        { label: "Guest connects to an inside file share", flow: { from: "guest", to: "inside", src: "172.20.1.14", dst: "10.1.0.25", proto: "tcp", port: 445 }, expect: "deny" },
        { label: "Guest opens RDP to an inside server", flow: { from: "guest", to: "inside", src: "172.20.1.14", dst: "10.1.0.30", proto: "tcp", port: 3389 }, expect: "deny" }
      ]
    },
    {
      id: "secp-fw-jump", kind: "fw", d: 2,
      title: "Admin access only through a jump server",
      prompt: "Servers accept SSH (tcp/22) and RDP (tcp/3389) from anywhere inside. Policy says administration must go through the jump server (`jump-server`, 10.99.0.10).\n\nRestrict the admin rule so only the jump server can open SSH or RDP to the servers, while users can still reach the web app on tcp/443.",
      hint: "Change the source of the admin rule from inside-net to jump-server. Leave the web rule as it is.",
      explain: "A jump server (jump box) is a hardened host that admins log in to first, usually with MFA, before reaching servers. Allowing SSH and RDP only from it shrinks the attack surface, gives one place to log admin sessions, and stops malware on an ordinary workstation from reaching server admin ports. This is least privilege and access control applied to network paths.",
      setup: { vendor: "generic", zones: ["inside", "servers"], addresses: { "inside-net": "10.1.0.0/16", "jump-server": "10.99.0.10", "server-net": "10.10.0.0/24" } },
      rules: [
        { name: "admin-access", from: ["inside"], to: ["servers"], src: ["any"], dst: ["server-net"], app: ["any"], service: ["tcp/22", "tcp/3389"], action: "allow" },
        { name: "web-app", from: ["inside"], to: ["servers"], src: ["inside-net"], dst: ["server-net"], app: ["any"], service: ["tcp/443"], action: "allow" }
      ],
      solution: [
        { name: "admin-access", from: ["inside"], to: ["servers"], src: ["jump-server"], dst: ["server-net"], app: ["any"], service: ["tcp/22", "tcp/3389"], action: "allow" },
        { name: "web-app", from: ["inside"], to: ["servers"], src: ["inside-net"], dst: ["server-net"], app: ["any"], service: ["tcp/443"], action: "allow" }
      ],
      tests: [
        { label: "Jump server opens SSH to a server", flow: { from: "inside", to: "servers", src: "10.99.0.10", dst: "10.10.0.21", proto: "tcp", port: 22 }, expect: "allow" },
        { label: "Jump server opens RDP to a server", flow: { from: "inside", to: "servers", src: "10.99.0.10", dst: "10.10.0.22", proto: "tcp", port: 3389 }, expect: "allow" },
        { label: "Workstation opens RDP to a server", flow: { from: "inside", to: "servers", src: "10.1.6.12", dst: "10.10.0.22", proto: "tcp", port: 3389 }, expect: "deny" },
        { label: "Workstation opens SSH to a server", flow: { from: "inside", to: "servers", src: "10.1.6.12", dst: "10.10.0.21", proto: "tcp", port: 22 }, expect: "deny" },
        { label: "Workstation uses the web app", flow: { from: "inside", to: "servers", src: "10.1.6.12", dst: "10.10.0.21", proto: "tcp", port: 443 }, expect: "allow" }
      ]
    },
    {
      id: "secp-fw-dmz-web", kind: "fw", d: 3,
      title: "Least privilege for a DMZ web server",
      prompt: "A public web server (`web-server`, 172.16.1.10) sits in the DMZ. The inbound rule allows any port from outside to the whole DMZ.\n\nRewrite it so the internet reaches only the web server, only on HTTP (tcp/80) and HTTPS (tcp/443). The firewall ends with an implicit deny.",
      hint: "Set the destination to web-server and the service to tcp/80 and tcp/443.",
      explain: "A screened subnet (DMZ) holds public-facing servers so a compromise there doesn't land an attacker on the internal network. Inbound rules should still follow least privilege: one destination, only the ports the service needs. Exposing SSH, RDP or other DMZ hosts to the internet greatly widens the attack surface, and the implicit deny handles everything not listed.",
      setup: { vendor: "generic", zones: ["inside", "dmz", "outside"], addresses: { "web-server": "172.16.1.10", "dmz-net": "172.16.1.0/24" } },
      rules: [
        { name: "outside-to-dmz", from: ["outside"], to: ["dmz"], src: ["any"], dst: ["dmz-net"], app: ["any"], service: ["any"], action: "allow" }
      ],
      solution: [
        { name: "outside-to-web", from: ["outside"], to: ["dmz"], src: ["any"], dst: ["web-server"], app: ["any"], service: ["tcp/80", "tcp/443"], action: "allow" }
      ],
      tests: [
        { label: "HTTPS from the internet to the web server", flow: { from: "outside", to: "dmz", src: "198.51.100.23", dst: "172.16.1.10", proto: "tcp", port: 443 }, expect: "allow" },
        { label: "HTTP from the internet to the web server", flow: { from: "outside", to: "dmz", src: "198.51.100.23", dst: "172.16.1.10", proto: "tcp", port: 80 }, expect: "allow" },
        { label: "SSH from the internet to the web server", flow: { from: "outside", to: "dmz", src: "198.51.100.23", dst: "172.16.1.10", proto: "tcp", port: 22 }, expect: "deny" },
        { label: "HTTPS from the internet to another DMZ host", flow: { from: "outside", to: "dmz", src: "198.51.100.23", dst: "172.16.1.11", proto: "tcp", port: 443 }, expect: "deny" },
        { label: "RDP from the internet to another DMZ host", flow: { from: "outside", to: "dmz", src: "198.51.100.23", dst: "172.16.1.12", proto: "tcp", port: 3389 }, expect: "deny" }
      ]
    },
    {
      id: "secp-fw-blocklist", kind: "fw", d: 2,
      title: "Block known-bad addresses",
      prompt: "Threat intelligence reports command-and-control servers in the address group `threat-list`. Inside hosts can currently reach them because the outbound rule allows all web traffic.\n\nAdd a rule so no inside host can reach anything in `threat-list`, while normal web browsing keeps working.",
      hint: "Add a deny rule from inside to outside with destination threat-list, and put it above inside-web.",
      explain: "Blocking known malicious IPs from threat intelligence feeds is a mitigation that cuts off command-and-control and data exfiltration for hosts that are already infected. The deny has to be above the general allow because the first matching rule wins. Block lists only stop known indicators, so they complement, not replace, monitoring and endpoint protection.",
      setup: { vendor: "generic", zones: ["inside", "outside"], addresses: { "inside-net": "10.1.0.0/16" }, addressGroups: { "threat-list": ["198.51.100.0/24", "203.0.113.66"] } },
      rules: [
        { name: "inside-web", from: ["inside"], to: ["outside"], src: ["inside-net"], dst: ["any"], app: ["any"], service: ["tcp/80", "tcp/443", "udp/53"], action: "allow" }
      ],
      solution: [
        { name: "block-threat-list", from: ["inside"], to: ["outside"], src: ["any"], dst: ["threat-list"], app: ["any"], service: ["any"], action: "deny" },
        { name: "inside-web", from: ["inside"], to: ["outside"], src: ["inside-net"], dst: ["any"], app: ["any"], service: ["tcp/80", "tcp/443", "udp/53"], action: "allow" }
      ],
      tests: [
        { label: "Workstation browses a normal HTTPS site", flow: { from: "inside", to: "outside", src: "10.1.2.44", dst: "192.0.2.20", proto: "tcp", port: 443 }, expect: "allow" },
        { label: "Workstation sends a DNS query", flow: { from: "inside", to: "outside", src: "10.1.2.44", dst: "192.0.2.53", proto: "udp", port: 53 }, expect: "allow" },
        { label: "Workstation connects to 203.0.113.66 (listed)", flow: { from: "inside", to: "outside", src: "10.1.2.44", dst: "203.0.113.66", proto: "tcp", port: 443 }, expect: "deny" },
        { label: "Workstation connects to 198.51.100.140 (listed range)", flow: { from: "inside", to: "outside", src: "10.1.2.44", dst: "198.51.100.140", proto: "tcp", port: 80 }, expect: "deny" }
      ]
    }
  ]
});
