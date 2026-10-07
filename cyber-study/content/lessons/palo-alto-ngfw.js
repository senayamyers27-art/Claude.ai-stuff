/* Lessons for Palo Alto Networks Certified Next-Generation Firewall Engineer (NGFW-Engineer): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("palo-alto-ngfw", [
 {
  "t": "Interface types: Layer 3, Layer 2, virtual wire, tap, loopback, tunnel, VLAN and aggregate Ethernet (LACP); subinterfaces and 802.1Q tags",
  "hook": "It is your second week at Bayside Freight, and Priya from the network team drops a printed rack diagram on your desk. A new firewall arrives Thursday. It has to sit between the core switch and a router nobody is allowed to re-address, it must give the warehouse VLANs their own policy, and the security team also wants a copy of traffic from a mirror port for a pilot. Priya taps the diagram. \"Every one of these ports needs a type before we cable anything. Pick wrong and we either re-address half the building or end up with a firewall that watches an attack happen and cannot stop it.\" Which type goes on which port?",
  "simple": "A firewall port can behave in a few different ways, and you have to choose one for each port. It can act like a router, which has its own address and moves traffic between different networks. It can act like a switch, which passes traffic between devices on the same network. It can sit invisibly in the middle of a cable, checking everything that passes without anyone changing their settings. Or it can just watch a copy of the traffic and never touch the real thing. Think of a building lobby: a receptionist who directs visitors to other floors (router), a hallway that connects rooms on one floor (switch), a security guard standing in a doorway checking bags (invisible inline), or a camera that records but cannot stop anyone (watch only).",
  "body": [
   "Every PAN-OS deployment starts with a decision about how each physical port behaves. The interface type decides whether the firewall routes, switches, sits invisibly in the path, or only watches. Picking the right type matters because it controls which features you can use later: dynamic routing protocols, GlobalProtect and IPsec (IP Security) termination need Layer 3 interfaces, most Network Address Translation (NAT) designs use them, and a tap interface can never block anything. When you inherit a firewall, the first screen to read is Network > Interfaces, whose Ethernet, VLAN, Loopback and Tunnel tabs show each port's type, zone and router at a glance. A port whose Interface Type column still says nothing useful, or whose zone is blank, is a port that will not pass traffic.",
   "A Layer 3 interface has an IP address, belongs to a virtual router (or a logical router on the Advanced Routing Engine) and a Layer 3 zone, and forwards by routing. It is the most common type and the only physical type that supports a DHCP (Dynamic Host Configuration Protocol) server, dynamic routing protocols and VPN (virtual private network) termination, and it is the usual home for NAT. A Layer 2 interface has no IP address; the firewall switches frames between Layer 2 interfaces that share a VLAN (virtual local area network) object, while still applying security policy between Layer 2 zones. This lets you segment hosts in one subnet without changing their gateway.",
   "A virtual wire (vwire) binds exactly two interfaces together as a 'bump in the wire': no IP addresses, no MAC (media access control) learning and no routing. You drop it into an existing link without re-addressing anything, yet you still get App-ID, threat prevention and security policy, because the firewall is fully in the forwarding path. A vwire can pass tagged traffic, and its Tag Allowed field limits which VLAN tags it accepts. A tap interface is different in one crucial way. It receives a copy of traffic from a switch SPAN (Switched Port Analyzer) or mirror port, so it gives visibility, such as App-ID results and threat logs, but it cannot block, because the real packets never pass through the firewall. Tap mode is often used for a proof of concept where nobody wants risk to production traffic.",
   "Several interfaces are logical rather than physical. A loopback interface is a Layer 3 interface that is always up, useful for management access, DNS (Domain Name System) proxy, a GlobalProtect portal or a stable source address that does not depend on one cable. A tunnel interface, for example `tunnel.1`, is the logical endpoint for route-based IPsec, GlobalProtect or GRE (Generic Routing Encapsulation); you assign it to a zone and a router just like a physical Layer 3 port, and routes that point at it send traffic into the tunnel. A VLAN interface, such as `vlan.10`, gives a Layer 2 VLAN an IP address so hosts in that VLAN can be routed to Layer 3 networks, much like a switched virtual interface on a switch. All three need a zone and, for the Layer 3 kinds, a router assignment before they do anything useful.",
   "An aggregate Ethernet (AE) interface, such as `ae1`, bundles several physical ports of the same speed and media into one logical link for more bandwidth and redundancy. You create the group under Network > Interfaces > Ethernet > Add Aggregate Group, then set each member port's Interface Type to Aggregate Ethernet and assign it to the group. Link Aggregation Control Protocol (LACP) is optional but recommended: it negotiates membership with the switch and detects a misconnected or failed member, so traffic is not black-holed down a dead link. The AE group itself then gets a type, such as Layer 3, Layer 2 or virtual wire, and all configuration (IP address, zone, subinterfaces) is done on the group, not on the members. The members simply become anonymous lanes of the bundle.",
   "Subinterfaces let one physical or AE port carry many networks using IEEE 802.1Q VLAN tags. On a Layer 3 port you create `ethernet1/3.20` with tag 20 and its own IP address, zone and router, which is the classic 'router on a stick' design facing a trunk port on a switch. Layer 2 and vwire interfaces support subinterfaces too; on a vwire they let you put different VLANs into different zones. By convention the subinterface number matches the tag, but it is the tag field that actually matters. If the switch trunk sends VLAN 20 and your subinterface is tagged 21, nothing arrives, even though the interface shows as up.",
   "Consider a worked example. A hospital wants threat prevention on the link between its core switch and an old router, but nobody can re-address the router this quarter. You configure ethernet1/5 and ethernet1/6 as a virtual wire, place each side in its own Virtual Wire zone, and cable the firewall inline. The firewall immediately enforces App-ID and threat profiles without any IP or routing change. Later the hospital adds a guest network on the same trunk, so you add vwire subinterfaces with tag 50 in a separate Guest zone, and guest traffic now gets its own rules while the clinical VLANs keep theirs.",
   "Common mistakes follow a pattern. People expect a tap interface to block (it only observes), try to configure an IP address on AE member ports instead of on the `ae` group, tag a subinterface with a different VLAN from the switch's trunk so traffic never arrives, and assume a loopback or tunnel interface works without a zone and router assignment.",
   "Exam questions usually describe a requirement and ask for the interface type, so learn the clue words. 'No network changes', 'no IP addresses' or 'transparent inline' point to virtual wire. 'Only monitor', 'SPAN port' or 'must never affect traffic' point to tap. 'Route between subnets', 'NAT', 'IPsec' or 'GlobalProtect' point to Layer 3. 'Switch between hosts in one subnet while enforcing policy' points to Layer 2. 'Bundle ports for bandwidth and failover' points to aggregate Ethernet with LACP, and 'several VLANs on one physical port with different zones' points to subinterfaces with 802.1Q tags."
  ],
  "analogy": "Think of interface types as jobs at a building entrance. A Layer 3 port is a receptionist who reads each visitor's destination and sends them to another floor. A Layer 2 port is a hallway joining rooms on one floor, with a guard checking passes between wings. A virtual wire is a guard standing in an existing doorway: nobody changes their route, but everyone is checked. A tap is a security camera watching a recording of the door. It sees everything and can raise an alert, but it can never close the door, which is exactly the point the exam tests.",
  "mnemonic": "For the four main deployment types, think 'Route, Switch, Wire, Watch': Layer 3 routes, Layer 2 switches, virtual wire sits in the wire, tap only watches.",
  "terms": [
   [
    "Virtual wire",
    "A pair of interfaces bound together so the firewall inspects traffic transparently with no IP addresses, routing or switching."
   ],
   [
    "Tap interface",
    "An interface fed by a switch SPAN or mirror port that gives visibility and logging but cannot enforce or block."
   ],
   [
    "Aggregate Ethernet (AE)",
    "A logical interface bundling several same-speed physical ports, optionally negotiated with LACP, for bandwidth and redundancy."
   ],
   [
    "LACP",
    "Link Aggregation Control Protocol, which negotiates an aggregate bundle with the peer and removes failed or misconnected members."
   ],
   [
    "Subinterface",
    "A logical interface on a parent port that handles one 802.1Q VLAN tag, with its own zone and addressing."
   ],
   [
    "Tunnel interface",
    "A logical Layer 3 interface used as the endpoint of a route-based IPsec, GRE or GlobalProtect tunnel."
   ],
   [
    "Loopback interface",
    "An always-up logical Layer 3 interface used for services such as management, DNS proxy or a GlobalProtect portal."
   ],
   [
    "VLAN interface",
    "A Layer 3 interface attached to a Layer 2 VLAN so its hosts can be routed to other networks."
   ]
  ],
  "example": "A hospital wants threat prevention on the link between its core switch and an old router, but nobody can re-address the router this quarter. You configure ethernet1/5 and ethernet1/6 as a virtual wire in two Virtual Wire zones, cable the firewall inline, and it begins enforcing App-ID and threat profiles without any IP or routing change. When a guest VLAN is added to the same trunk, vwire subinterfaces with its tag place guests in their own zone.",
  "mistakes": [
   [
    "Choosing tap mode when the requirement says the firewall must block threats.",
    "A tap interface only receives a mirrored copy of traffic and is not in the forwarding path, so it can log but never block. Inline blocking with no re-addressing calls for virtual wire."
   ],
   [
    "Putting the IP address on the physical member ports of an aggregate group.",
    "Member ports are set to type Aggregate Ethernet and carry no configuration. The IP address, zone and subinterfaces go on the `ae` interface itself."
   ],
   [
    "Assuming the subinterface number is what matches the switch VLAN.",
    "The 802.1Q tag field decides which VLAN the subinterface handles. Naming `ethernet1/3.20` with tag 20 is only a convention; a wrong tag means no traffic."
   ],
   [
    "Thinking virtual wire gives up security features because it has no IP addresses.",
    "A vwire still enforces App-ID, security policy and threat prevention. What it gives up is routing, switching and features that need an interface address, such as VPN termination."
   ]
  ],
  "tryit": [
   [
    "Coastline Dental is opening a branch. The firewall must hand out IP addresses to staff laptops, perform source NAT to the Internet, and terminate an IPsec tunnel back to headquarters. The ISP router and the branch switch are new, so re-addressing is not a problem. Which interface type should the inside and outside ports use?",
    "Layer 3 on both. DHCP server, NAT and IPsec termination all require Layer 3 interfaces with IP addresses and a router assignment. Virtual wire would avoid re-addressing, but that is not a constraint here, and a vwire cannot terminate a VPN."
   ],
   [
    "A data center needs more than one 10-gigabit link between the firewall and the core switch, and losing one cable must not cause an outage. The switch team also wants the firewall to detect a miscabled port automatically. What do you build?",
    "An aggregate Ethernet group with LACP enabled. The bundle provides combined bandwidth and redundancy, and LACP negotiates membership with the switch so a failed or misconnected member is removed instead of silently dropping traffic."
   ]
  ],
  "tip": "If a question says the firewall must be added 'with no network changes' or 'without IP addresses', the answer is virtual wire. If it must only observe and never block, it is tap. Routing, NAT and VPN termination require Layer 3.",
  "check": [
   [
    "Which interface type provides visibility only and can never block traffic?",
    "Tap, because it receives a mirrored copy of traffic from a SPAN port and is not in the forwarding path."
   ],
   [
    "What does LACP add to an aggregate Ethernet group?",
    "It negotiates the bundle with the peer switch and detects failed or misconnected member links so they are removed from use."
   ],
   [
    "How do you carry VLAN 30 and VLAN 40 on one Layer 3 port with separate zones?",
    "Create two Layer 3 subinterfaces (for example ethernet1/2.30 and ethernet1/2.40) with 802.1Q tags 30 and 40, each with its own IP address and zone."
   ],
   [
    "Where do you configure the IP address for an aggregate Ethernet bundle?",
    "On the ae interface (or its subinterfaces), not on the member ports, which are set to type Aggregate Ethernet."
   ]
  ]
 },
 {
  "t": "Security zones: zone types, one zone per interface, intrazone vs interzone default rules, User-ID enablement per zone",
  "hook": "The auditor at Meridian Health Partners leans back in her chair. \"Your two DMZ web servers can talk to each other on any port. Show me the rule that allows that.\" You scroll through the security rulebase on the projector. There is no such rule. There is also no log entry for the blocked traffic she says her scanner generated from the guest network last night. Ravi, your manager, is quietly watching from the doorway. How can traffic be allowed by a rule you never wrote, and blocked without leaving a trace?",
  "simple": "A zone is a label you give to a group of firewall ports that deserve the same level of trust, like \"inside\", \"outside\" or \"servers\". Rules are written about zones, such as \"inside may reach outside for web browsing\". If two devices are in the same zone, the firewall lets them talk by default. If they are in different zones, it blocks them by default. Neither default writes anything in the log unless you ask it to. Think of an office: people on the same floor can walk over to each other freely, but going to another floor needs a badge, and the badge reader only keeps a record if someone switches recording on. Zones also decide where the firewall tries to learn which person is using which computer.",
  "body": [
   "A security zone is a named group of interfaces that share the same trust level, such as Trust, Untrust or DMZ (demilitarized zone). Palo Alto Networks security policy is written between zones, not between interfaces, so zones are the backbone of every rule you will write. Traffic is always classified by a source zone, where it entered the firewall, and a destination zone, where it will leave. If an interface has no zone, the firewall will not pass traffic through it at all, which is a common surprise on a new deployment: the link light is green, the IP address answers nothing, and the Traffic log is empty.",
   "Zones have types that must match the interfaces placed in them: Layer 3, Layer 2, Virtual Wire, Tap, Tunnel and External. A Layer 3 interface can only join a Layer 3 zone, a vwire interface only a Virtual Wire zone, and so on, and the web interface will simply not offer a mismatched zone in the drop-down. The External type is special: it exists only on firewalls with multiple virtual systems (vsys) and represents another virtual system, used for traffic passing between vsys. The Tunnel zone type is used with tunnel content inspection, where the firewall inspects the traffic carried inside a cleartext tunnel such as GRE (Generic Routing Encapsulation) or unencrypted GTP (GPRS Tunneling Protocol), so you can write policy on the inner traffic.",
   "The key rule is that an interface or subinterface belongs to exactly one zone, while a zone can contain many interfaces. That is why subinterfaces are so useful: two VLANs (virtual LANs) on the same port can sit in different zones and get different policy. Traffic entering and leaving interfaces in the same zone is intrazone; traffic crossing from one zone to a different zone is interzone. You create zones under Network > Zones and assign interfaces there or on the interface's Config tab. Zones are also where zone protection profiles attach, and they are the unit that logs, reports and the Application Command Center summarize by, so good zone names make every later report easier to read.",
   "At the bottom of every rulebase are two predefined rules. `intrazone-default` allows traffic within the same zone, and `interzone-default` denies traffic between different zones. Neither logs by default. You cannot delete them, but you can select one and click Override to enable logging or attach security profiles, which is a common best practice so that denied interzone traffic shows up in the Traffic log with the rule name interzone-default. Any rule you write above them takes precedence because the rulebase is evaluated top-down and the first match wins.",
   "Security rules also have a rule type, and it changes how the zones you list are interpreted. Universal, the default, matches both intrazone and interzone traffic between the listed zones. Intrazone matches only traffic whose source and destination zone are the same, and interzone matches only traffic between different listed zones. A universal rule listing Trust and DMZ as both source and destination therefore also allows Trust to Trust and DMZ to DMZ, which can surprise people who meant only cross-zone access.",
   "Zones also control where User-ID runs. In the zone settings there is an Enable User Identification checkbox. When it is enabled, the firewall maps IP addresses from that zone to usernames, so source users appear in logs and user or group based rules can match. Enable it only on internal zones where your users actually are. Enabling it on an Internet-facing zone is a known risk: if client probing is configured, the firewall may try to probe untrusted addresses, which can expose credentials or hashes to outsiders, and it wastes resources mapping addresses that will never be users. You can further narrow mapping with include and exclude network lists on the zone.",
   "Consider a worked example. Two web servers sit in the DMZ zone on different subinterfaces. Traffic between them is intrazone and therefore allowed by the default rule, which worries the auditor because a compromised server could attack its neighbor. You add an explicit DMZ-to-DMZ rule allowing only the application the servers genuinely need, such as `mysql` from the front end to the database, then add an intrazone deny rule with logging below it. You also override interzone-default to log at session end. Lateral movement between the servers is now restricted and visible in the Traffic log.",
   "Common mistakes include expecting denied interzone traffic to appear in the Traffic log without overriding the default rule, forgetting to assign a newly created subinterface to a zone, trying to put a Layer 3 interface into a Virtual Wire zone, and enabling User Identification on the Untrust zone. Another subtle mistake is assuming intrazone traffic is inspected just because it is allowed; the default intrazone rule has no security profiles unless you override it or write your own rule.",
   "Exam questions often ask about defaults and placement. 'Why does blocked traffic not appear in the logs?' points to overriding interzone-default to enable logging. 'Hosts in the same zone can reach each other without any rule' points to intrazone-default. 'Two VLANs on one port need different policy' points to subinterfaces in separate zones. 'Where should User-ID be enabled?' points to trusted internal zones only, and 'zone that represents another vsys' points to the External zone type."
  ],
  "analogy": "Zones work like floors in an office building with badge readers on the stairwells. People on the same floor walk to each other's desks freely, which is intrazone-default. Going to a different floor is blocked unless your badge has that floor programmed, which is interzone-default plus your own allow rules. The badge system keeps no history unless someone turns on recording, just as the default rules do not log until you override them. The analogy stops at one point: a desk (interface) can only ever be on one floor.",
  "terms": [
   [
    "Security zone",
    "A logical group of interfaces with the same trust level that security and NAT policy reference."
   ],
   [
    "intrazone-default",
    "The predefined rule that allows traffic whose source and destination zone are the same; not logged by default."
   ],
   [
    "interzone-default",
    "The predefined rule that denies traffic between different zones; not logged by default."
   ],
   [
    "External zone",
    "A zone type used on multi-vsys firewalls to represent another virtual system for inter-vsys traffic."
   ],
   [
    "Tunnel zone",
    "A zone type used with tunnel content inspection so policy can apply to traffic inside a cleartext tunnel."
   ],
   [
    "Enable User Identification",
    "A per-zone setting that tells the firewall to map IP addresses in that zone to usernames."
   ],
   [
    "Rule override",
    "Changing the settings, such as logging or profiles, of a predefined default rule, which cannot be deleted."
   ],
   [
    "Rule type",
    "A security rule setting of universal, intrazone or interzone that controls whether same-zone, cross-zone or both kinds of traffic match."
   ]
  ],
  "example": "Two web servers sit in the DMZ zone on different subinterfaces. Traffic between them is intrazone and allowed by default, which worries the auditor. You add an explicit DMZ-to-DMZ rule allowing only the needed application, then an intrazone deny rule with logging below it, and override interzone-default to log. Lateral movement between the servers is now restricted and every blocked attempt is visible in the Traffic log.",
  "mistakes": [
   [
    "Believing the default rules log their matches.",
    "Neither intrazone-default nor interzone-default logs by default. You must select the rule, click Override and enable logging to see denied interzone traffic in the Traffic log."
   ],
   [
    "Thinking you can delete or edit the default rules freely.",
    "They are predefined and cannot be deleted. Override only lets you change logging and security profile settings; you control behavior by writing rules above them."
   ],
   [
    "Placing one interface in two zones to share it between networks.",
    "An interface or subinterface belongs to exactly one zone. Use 802.1Q subinterfaces so each VLAN can be in its own zone."
   ],
   [
    "Enabling User Identification on every zone for complete coverage.",
    "Enable it only on internal zones where users originate. On an Internet-facing zone it wastes resources and, with client probing, can expose credentials to untrusted hosts."
   ]
  ],
  "tryit": [
   [
    "At Northwind Library, a new subinterface ethernet1/4.60 was created for the staff VLAN with an IP address and router assignment. Staff on VLAN 60 cannot reach anything, and the Traffic log shows no entries at all from their subnet, not even denies. The interface status is up. What is the most likely cause?",
    "The subinterface has not been assigned to a security zone. The firewall does not process traffic on an interface with no zone, so there is nothing to log. Assign it to the appropriate Layer 3 zone, then write rules from that zone."
   ],
   [
    "You write a single universal rule with source zones Trust and Guest, destination zones Trust and Guest, action allow, intending only to let Guest reach a Trust printer. A tester then reaches a Trust file server from Guest. Why, and how do you fix it?",
    "A universal rule with both zones on each side matches every combination, including Guest to Trust for any listed address and service. Narrow it to source Guest, destination Trust, the printer's address and the printing application, or use the interzone rule type with precise objects."
   ]
  ],
  "tip": "Remember the defaults: intrazone allowed, interzone denied, neither logged. When a question asks why denied traffic does not appear in the Traffic log, the answer is that interzone-default must be overridden to enable logging.",
  "check": [
   [
    "Can one Layer 3 interface belong to two zones?",
    "No. Each interface or subinterface belongs to exactly one zone; use subinterfaces if you need different zones on one port."
   ],
   [
    "Where should 'Enable User Identification' be turned on?",
    "Only on trusted internal zones where users originate, never on Internet-facing untrusted zones, to avoid probing or exposing credentials to outsiders."
   ],
   [
    "What happens to traffic from Trust to DMZ if no rule matches it?",
    "It hits interzone-default and is denied, without logging unless the rule is overridden."
   ],
   [
    "Which zone type represents another virtual system?",
    "The External zone type, available on multi-vsys firewalls for inter-vsys traffic."
   ]
  ]
 },
 {
  "t": "Zone protection profiles (flood, reconnaissance, packet-based) and interface management profiles",
  "hook": "At 2:10 a.m. the monitoring wall at Granite Valley Utilities turns red. Dashboard session counts on the edge firewall climb by the second, and the customer payment portal starts timing out. Luis, on call, sees thousands of half-open TCP connections from addresses scattered across the Internet, and a port scan from earlier in the evening sitting in the Threat log. He could write security rules, but the flood is arriving faster than any rule could be evaluated. Then a branch office messages: they cannot even ping their inside gateway. Is there a defense that acts before policy, and why will the gateway not answer a ping?",
  "simple": "Some attacks do not try to sneak in. They try to overwhelm the firewall with a huge pile of fake connection requests, or quietly knock on every door to see which one opens. A zone protection profile is a set of guard rules for a whole area of the network, usually the side facing the Internet. It notices when requests arrive far too fast, when someone is checking door after door, or when packets look broken or forged, and it throws them away early, before the firewall spends effort on them. A separate setting, the interface management profile, simply decides which basic services a firewall port will answer, such as ping. It is like a shop with a doorman who turns away a sudden stampede, plus a sign saying which questions the front desk will answer.",
  "body": [
   "A zone protection profile defends a whole zone against floods, scans and malformed packets. You create it under Network > Network Profiles > Zone Protection and attach it to the ingress zone, typically the Internet-facing zone, under Network > Zones. The firewall enforces it before security policy is even evaluated. That early placement is why it is cheap and effective: bad traffic is dropped before it consumes session resources or forces a policy lookup. Zone protection is your first, broad layer of denial-of-service (DoS) defense, and it complements, rather than replaces, the more targeted tools covered later in this lesson.",
   "Flood protection covers SYN, UDP (User Datagram Protocol), ICMP (Internet Control Message Protocol), ICMPv6 and 'other IP' floods. Each uses three thresholds measured in new connections per second arriving at the zone: Alarm (generate an alarm), Activate (start dropping) and Maximum (drop everything above this rate). For UDP, ICMP and other floods the drop mechanism is Random Early Drop (RED), which discards an increasing share of packets as the rate climbs from Activate toward Maximum. For SYN floods you can choose RED or SYN cookies. With SYN cookies the firewall answers the SYN on the server's behalf and only forwards the connection once the client completes the TCP (Transmission Control Protocol) handshake, so legitimate users still connect while spoofed SYNs are absorbed. SYN cookies is the usual recommendation.",
   "Thresholds deserve care. Base them on measured normal peaks rather than guessing, because thresholds that are too low drop legitimate traffic during a busy hour, and thresholds that are too high never trigger. A sensible approach is to observe connection rates for a while, set Alarm somewhat above the normal peak so you learn when traffic is unusual, and set Activate and Maximum progressively higher. Flood events then appear in the Threat log, which tells you whether the settings fit real traffic.",
   "Reconnaissance protection detects TCP port scans, UDP port scans and host sweeps, where one source probes many addresses. For each you set an interval and a threshold of events, and an action: allow, alert, block, or block-ip for a set duration, tracking by source or by source and destination. You can exclude trusted scanners, such as your own vulnerability scanner, by source address so they are not blocked during authorized scans. Without that exclusion, the security team's own scheduled scan can block itself halfway through and produce misleading results.",
   "Packet-based attack protection drops traffic that is malformed or abused. Options include dropping spoofed IP addresses (the source is not reachable through the interface it arrived on), IP options such as strict or loose source routing, fragmented traffic if you choose, TCP SYN packets carrying data, mismatched overlapping TCP segments, TCP split handshakes, oversized ICMP and ping of death, and suspicious IPv6 extension headers. Many of these are off by default because they can break unusual but legitimate applications, so enable them in a test window and watch the Threat log.",
   "Do not confuse zone protection with DoS protection policy. Zone protection is aggregate and zone-wide. DoS protection policy (Policies > DoS Protection) uses DoS protection profiles to protect specific critical hosts, with classified (per source or destination IP) or aggregate thresholds, and matches on zones, addresses and services like a rule. Best practice uses both: zone protection as a broad shield for the whole perimeter, and DoS protection policy for the handful of servers whose loss would hurt most.",
   "An interface management profile is unrelated to attacks from the network; it controls which management services a data-plane interface answers. Services include ping, SSH (Secure Shell), HTTPS, HTTP, Telnet, SNMP (Simple Network Management Protocol), Response Pages (needed for Authentication Portal and URL block pages), User-ID and the User-ID syslog listeners, plus a Permitted IP Addresses list. You create it under Network > Network Profiles > Interface Mgmt and attach it on the interface's Advanced tab. Without a profile, a data interface does not even answer ping.",
   "Consider a worked example. After a port scan from the Internet shows up in the Threat log, you create a zone protection profile for the Untrust zone. TCP port scan detection is set to block-ip for an hour, SYN flood protection uses SYN cookies with thresholds just above your measured peak, and spoofed-IP packets are dropped. Your internal vulnerability scanner's address is added as an exclusion. Separately, the branch team cannot ping the inside gateway, so you create an interface management profile allowing ping and HTTPS from the admin subnet only and attach it to the inside interface, never to the outside one. Forgetting Response Pages in such a profile is a classic follow-on problem, because it silently stops block pages and Authentication Portal from working.",
   "Exam questions use clear clue words. 'Protect the whole zone', 'before policy lookup' or 'SYN flood from the Internet' point to a zone protection profile on the ingress zone. 'Protect one critical server with per-IP thresholds' points to DoS protection policy. 'Complete the handshake on the server's behalf' is SYN cookies. 'Interface will not answer ping' or 'block page not shown' points to a missing interface management profile or a missing Response Pages option."
  ],
  "analogy": "Zone protection is like crowd control at a stadium gate. Stewards count how fast people arrive: past one rate they radio a warning (Alarm), past another they start turning some people away (Activate), and above the limit nobody else gets in (Maximum). They also turn away anyone with a forged ticket and watch for someone trying every gate. It all happens before ticket inspection, which is the security policy. The comparison breaks down for SYN cookies, which is more like a steward taking a phone number and only admitting people who answer the callback.",
  "mnemonic": "Flood thresholds rise in the order A, A, M: 'Alarm, Activate, Maximum', or 'Announce, Act, Max out'.",
  "terms": [
   [
    "Zone protection profile",
    "A profile applied to an ingress zone that defends against floods, reconnaissance and malformed packets before policy lookup."
   ],
   [
    "SYN cookies",
    "A SYN flood defense where the firewall completes the handshake on the server's behalf and forwards only validated connections."
   ],
   [
    "Random Early Drop (RED)",
    "A flood defense that drops a growing share of packets once the Activate threshold is exceeded."
   ],
   [
    "Reconnaissance protection",
    "Zone protection settings that detect port scans and host sweeps and can alert, block or block the source IP."
   ],
   [
    "DoS protection policy",
    "Rules with DoS profiles that protect specific hosts using classified or aggregate thresholds."
   ],
   [
    "Interface management profile",
    "A profile that controls which management and response services (ping, SSH, HTTPS, response pages and more) a data interface accepts."
   ]
  ],
  "example": "After a port scan from the Internet shows up in the Threat log, you apply a zone protection profile to the Untrust zone with TCP port scan detection set to block-ip for an hour, SYN flood protection using SYN cookies, and spoofed-IP drops. Your internal vulnerability scanner's address is added as an exclusion so authorized scans keep working, and an interface management profile allowing only ping and HTTPS from the admin subnet goes on the inside interface.",
  "mistakes": [
   [
    "Attaching the zone protection profile to the zone where the protected servers live.",
    "Zone protection is applied to the ingress zone, where the attack traffic enters, such as Untrust. It acts before policy lookup on packets arriving in that zone."
   ],
   [
    "Using zone protection to give one critical server its own per-IP limits.",
    "Zone protection is aggregate and zone-wide. Per-host or per-source limits for specific servers belong in DoS protection policy with DoS protection profiles."
   ],
   [
    "Copying flood thresholds from another site or a blog post.",
    "Thresholds must reflect your own measured traffic. Too low drops legitimate users, too high never triggers. Measure normal peaks first."
   ],
   [
    "Treating an interface management profile as an attack defense setting.",
    "It only controls which management and response services an interface answers. Allowing HTTPS or SSH on an Internet-facing interface through it is a serious exposure, not a protection."
   ]
  ],
  "tryit": [
   [
    "Pinecrest College's web filtering is configured to block gambling sites, and the Traffic and URL Filtering logs show the blocks happening. Students, however, see a browser timeout instead of the college's block page. The inside interface has an interface management profile that allows ping and HTTPS from the IT subnet. What is missing?",
    "The Response Pages service in the interface management profile on the interface students use. Without it, the firewall cannot serve the URL block page or Authentication Portal on that interface, so users see a timeout even though the block itself works."
   ],
   [
    "Every Tuesday night the security team's vulnerability scanner sweeps the DMZ from the inside, and every Tuesday it stops partway and reports that most hosts are offline. The internal zone recently got a zone protection profile with host sweep detection set to block-ip. What should you change?",
    "Add the scanner's source address to the reconnaissance protection exclusion list. Its authorized sweep is triggering block-ip, which blocks the scanner itself and makes hosts look offline. The protection should remain for everyone else."
   ]
  ],
  "tip": "Zone protection attaches to the ingress zone, not the destination. If a question asks why an interface will not answer ping or show a block page, look for a missing interface management profile or a missing Response Pages option.",
  "check": [
   [
    "What are the three flood thresholds?",
    "Alarm, Activate and Maximum, measured in new connections per second to the zone."
   ],
   [
    "How does zone protection differ from DoS protection policy?",
    "Zone protection is zone-wide and applied at ingress; DoS protection policy targets specific hosts with rules and DoS profiles, including per-IP thresholds."
   ],
   [
    "Where do you allow ping on a data interface?",
    "In an interface management profile with ping enabled, attached on the interface's Advanced tab."
   ],
   [
    "Why is SYN cookies usually preferred over RED for SYN floods?",
    "It lets legitimate clients complete connections while spoofed SYNs are absorbed, instead of dropping packets randomly."
   ]
  ]
 },
 {
  "t": "Routing: virtual routers vs logical routers (Advanced Routing Engine), static routes, OSPF, BGP, administrative distance defaults, ECMP",
  "hook": "On Monday morning the finance team at Lakeshore Cooperative complains that the payroll application is crawling. Dana, the network lead, pulls up the branch firewall and frowns. The branch has a fast MPLS circuit running OSPF and a slow backup IPsec tunnel, and somehow every packet for headquarters is taking the slow tunnel even though MPLS is healthy. Someone added a static route to the backup path over the weekend \"just in case\". Dana turns to you. \"OSPF is up, the neighbor is Full, the route is learned. So why is the firewall ignoring it?\"",
  "simple": "Routing is how the firewall decides which way to send traffic, like a delivery driver choosing roads. It keeps a list of known destinations and the road to each one. Sometimes it learns the same destination two ways, for example from a route someone typed in by hand and from a route another router shared automatically. To choose, it first prefers the most specific address (a street address beats a city name). If two are equally specific, it trusts some sources more than others, using a ranking number where lower is better. If several roads are equally good, it can spread different trips across them. Newer firewalls also offer a reorganized routing setup that works more like a traditional router.",
  "body": [
   "A PAN-OS firewall routes with a routing instance to which Layer 3 interfaces are assigned. For many years that instance has been the virtual router (VR); a new firewall ships with one called `default`. You can create more VRs to separate routing domains, and a static route can use another VR as its next hop. Each VR has its own routing table, the RIB (routing information base), which holds every learned route, and its forwarding table, the FIB (forwarding information base), which holds only the best routes actually used to forward packets. Routing matters for security because the destination zone of every session is found by a route lookup, so a wrong route can mean a wrong zone and a wrong security rule.",
   "Newer PAN-OS releases add the Advanced Routing Engine on supported platforms. When you enable Advanced Routing under Device > Setup > Management > General Settings, then commit and reboot, virtual routers are replaced by logical routers. The protocols are the same in spirit, but configuration is reorganized: route filtering, redistribution and BGP or OSPF tuning use reusable routing profiles, filters, access lists, prefix lists and route maps under Network > Routing > Routing Profiles, closer to how traditional routers are configured. Enabling it restructures the routing configuration, so back up and plan the change first, and review what was migrated afterward. On the exam, 'logical router' means the Advanced Routing Engine and 'virtual router' means the legacy engine.",
   "Static routes have a destination prefix, an egress interface and/or next hop, an administrative distance and a metric. Optional path monitoring pings an address and withdraws the route when it fails, which lets a backup static route take over. Static routes are predictable and need no neighbor, which makes them ideal for a default route to an ISP or a small branch, but they do not adapt on their own unless you add path monitoring.",
   "OSPF (Open Shortest Path First) is a link-state interior gateway protocol. You set the router ID, define areas (area 0 as the backbone, plus normal, stub or NSSA, not-so-stubby areas), add participating interfaces, and confirm neighbors reach Full state. BGP (Border Gateway Protocol) is used toward ISPs and between large networks: you set the local AS (autonomous system) number and router ID, create peer groups and peers with their AS numbers, and use import and export rules or redistribution to control what is learned and advertised. When OSPF neighbors stick in ExStart or Exchange, suspect an MTU (maximum transmission unit) mismatch; when they never appear at all, check the area, authentication and hello settings.",
   "When the same destination is available from several sources, the firewall prefers the longest prefix match first, then the lowest administrative distance (AD), then the lowest metric. The PAN-OS default AD values are: static 10, eBGP 20, OSPF internal 30, OSPF external 110, RIP (Routing Information Protocol) 120 and iBGP 200. Notice that OSPF internal (30) differs from the common Cisco value of 110, a frequent exam trap. You can change AD per static route or per protocol. Remember that AD only breaks ties between equally specific prefixes; a /24 always beats a /16 for a destination inside the /24, whatever their AD values.",
   "Equal-cost multipath (ECMP) lets the router install several equal-cost routes to one destination and share sessions across them. You enable it on the router and choose a load-balancing method: IP Modulo, IP Hash, Weighted Round Robin or Balanced Round Robin. Balancing is per session, so packets of one session stay on one path, which keeps App-ID and threat inspection consistent. The Symmetric Return option sends return traffic out the interface on which the session arrived, which helps when two ISPs are in use.",
   "Consider a worked example. A branch firewall learns 10.20.0.0/16 from OSPF over MPLS and also has a static route for 10.20.0.0/16 through a backup IPsec tunnel. With default values the static route (AD 10) wins and sends everything over the backup path. You set the static route's AD to 200 so the OSPF internal route (AD 30) is preferred. The static route becomes a floating route that only enters the FIB if OSPF loses the prefix. You verify with `show routing route` on the legacy engine, or the `show advanced-routing route` family on a logical router, and test a destination with `test routing fib-lookup virtual-router default ip 10.20.1.5`.",
   "Common mistakes include forgetting to add a new Layer 3 interface to the router, so connected routes never appear; assuming Cisco AD values apply; expecting AD to beat a more specific prefix; enabling ECMP and expecting per-packet balancing; and changing to the Advanced Routing Engine without reviewing the migrated configuration.",
   "Exam questions tend to test ordering and defaults. 'Which route is used?' is answered by longest prefix first, then AD, then metric. 'Floating static route' means raising the static AD above the dynamic protocol. 'Logical router', 'route maps' and 'routing profiles' point to the Advanced Routing Engine. 'Several equal paths, balance sessions' points to ECMP, and 'return traffic must use the same interface' points to Symmetric Return."
  ],
  "analogy": "Route selection is like a courier deciding how to deliver a parcel. First the most precise address wins: instructions for '14 Elm Street' beat instructions for 'anywhere in Springfield'. If two sets of instructions are equally precise, the courier trusts the more reliable source, the way a lower administrative distance wins. Only then does the shorter trip, the metric, decide. ECMP is a courier with two equally good roads who sends each whole delivery down one road, never splitting one parcel between them.",
  "mnemonic": "Route choice order is 'Longest, Lowest, Least': longest prefix, then lowest administrative distance, then least metric.",
  "terms": [
   [
    "Virtual router",
    "The legacy PAN-OS routing instance holding interfaces, static routes and dynamic protocols with its own routing table."
   ],
   [
    "Logical router",
    "The routing instance used when the Advanced Routing Engine is enabled, configured with reusable routing profiles and route maps."
   ],
   [
    "Administrative distance",
    "A preference value for route sources; lower wins when prefixes are equal length. PAN-OS defaults include static 10 and OSPF internal 30."
   ],
   [
    "Floating static route",
    "A static route given a higher administrative distance so it is used only when the preferred dynamic route disappears."
   ],
   [
    "ECMP",
    "Equal-cost multipath: installing multiple equal routes to a destination and balancing sessions across them."
   ],
   [
    "RIB and FIB",
    "The routing information base holds all learned routes; the forwarding information base holds the best routes actually used to forward."
   ]
  ],
  "example": "A branch firewall learns 10.20.0.0/16 from OSPF and also has a static route for 10.20.0.0/16 via a backup circuit. You set the static route's AD to 200 so OSPF (internal, AD 30) is preferred, and the floating static route only appears in the forwarding table if OSPF loses the prefix. A test with test routing fib-lookup confirms the OSPF next hop is used while the primary circuit is up.",
  "mistakes": [
   [
    "Assuming OSPF internal routes have an administrative distance of 110 on PAN-OS.",
    "PAN-OS uses 30 for OSPF internal and 110 for OSPF external. The 110 figure comes from other vendors and is a common distractor."
   ],
   [
    "Expecting a route with a lower administrative distance to beat a more specific prefix.",
    "Longest prefix match is evaluated first. AD only breaks ties between routes of the same prefix length."
   ],
   [
    "Thinking ECMP splits the packets of one session across links.",
    "PAN-OS ECMP balances per session, so every packet of a session uses the same path. This keeps inspection and return traffic consistent."
   ],
   [
    "Believing logical routers can be used alongside virtual routers by just creating one.",
    "Logical routers appear only after enabling Advanced Routing in the device management settings, committing and rebooting, on a supported platform and release. They replace virtual routers."
   ]
  ],
  "tryit": [
   [
    "Harborview Clinic's firewall has a default route 0.0.0.0/0 learned by eBGP from ISP A and a static default route to ISP B with default settings. Management wants ISP A to be primary and ISP B used only if the BGP session drops. What, if anything, must change?",
    "Raise the static route's administrative distance above 20, for example to 200. With defaults, the static route (AD 10) beats eBGP (AD 20), so traffic would use ISP B. A higher AD makes it a floating static route that only enters the FIB when the BGP route disappears."
   ],
   [
    "After adding ethernet1/7 as a new Layer 3 interface with IP 10.50.0.1/24 and a zone, hosts on 10.50.0.0/24 cannot reach anything and `show routing route` does not list 10.50.0.0/24. What step was missed?",
    "The interface was not added to the virtual router (or logical router). Until it is, its connected route does not appear in the routing table and the firewall cannot route to or from that subnet."
   ]
  ],
  "tip": "Memorize the PAN-OS AD defaults, especially OSPF internal 30 and iBGP 200, and remember that longest prefix match beats AD. Logical router always implies the Advanced Routing Engine.",
  "check": [
   [
    "What must you do to switch from virtual routers to logical routers?",
    "Enable Advanced Routing in the device management settings, commit and reboot, on a platform and release that supports it."
   ],
   [
    "Which wins: a /24 learned by iBGP or a /16 static route, for a destination inside the /24?",
    "The /24, because longest prefix match is evaluated before administrative distance."
   ],
   [
    "Is ECMP load balancing per packet or per session?",
    "Per session; all packets of a session use the same path."
   ],
   [
    "What is the PAN-OS default administrative distance for OSPF internal routes?",
    "30, which differs from the value used by some other vendors."
   ]
  ]
 },
 {
  "t": "Policy-based forwarding with path monitoring; service routes; DHCP server/relay and DNS proxy",
  "hook": "Willow Creek Outfitters has 40 stores, each with an MPLS circuit for the point-of-sale systems and a cheap broadband line nobody uses. The CFO wants guest Wi-Fi moved off MPLS by Friday. Meanwhile Tomas at store 17 reports the firewall has not downloaded threat updates in a week, its management port sits on an isolated network, and the store's laptops keep asking a server across the WAN for addresses and names. You have one firewall per store and a long list. Which of these problems is routing, which is something else, and what happens to guests when the broadband line dies?",
  "simple": "Normally a firewall sends traffic based only on where it is going, like a mail sorter who only reads the destination. Policy-based forwarding lets you say \"traffic from these people goes out this particular exit\", for example sending guest Wi-Fi out a cheap internet line. A health check can watch that exit and stop using it if it fails. Separately, the firewall has its own errands, like downloading updates, and a service route tells it which exit to use for those. The firewall can also hand out addresses to devices (DHCP), pass those requests on to another server (relay), and answer \"what is the address of this website?\" questions for devices (DNS proxy). Think of a hotel concierge who decides which door each group of guests leaves by.",
  "body": [
   "Normally the firewall forwards by destination using the routing table. Policy-based forwarding (PBF) overrides that for traffic matching specific criteria, for example sending guest traffic out a cheap broadband link while corporate traffic uses MPLS (Multiprotocol Label Switching). PBF rules live under Policies > Policy Based Forwarding and are evaluated before the route lookup for a new session, so a matching PBF rule wins over the routing table. This lesson also covers three services the firewall provides to itself and to clients: service routes, DHCP and DNS proxy.",
   "A PBF rule matches on source zone or interface, source address, source user, destination address, application and service. Its action is Forward (with an egress interface and optional next hop), Forward to VSYS on multi-vsys firewalls, Discard, or No PBF, which exempts matching traffic so it uses normal routing. No PBF is handy for carving exceptions out of a broad rule, for example keeping traffic to internal servers on MPLS even though the rest of the guest zone goes to broadband.",
   "Application-based PBF has a catch. The PBF decision is made on the first packet, before App-ID has identified the application. The firewall solves this with an application cache, so the first session of an application follows the routing table and later sessions match the PBF rule once the app is cached for that destination. If you need every session steered from the very start, use service, port or address criteria where you can.",
   "Path monitoring makes PBF safe. On the Forwarding tab you enable monitoring with a monitor profile and a monitored IP, often the next hop or something beyond it. If the pings fail, the action Fail Over disables the rule so traffic falls back to the routing table, while Wait Recover keeps using the rule and waits for the path to return. Without monitoring, a Forward rule keeps sending traffic into a dead link. Enforce Symmetric Return, set on the same tab, makes replies to sessions that arrived on a particular interface leave by that same interface and next hop, which matters with two ISPs so return traffic does not exit through the wrong provider and get dropped. Keep in mind that PBF only changes the path; security policy still has to allow the traffic into the new egress zone.",
   "Service routes answer a different question: which interface does the firewall's own management plane use to reach services such as DNS (Domain Name System), NTP (Network Time Protocol), dynamic updates, syslog, LDAP (Lightweight Directory Access Protocol), RADIUS (Remote Authentication Dial-In User Service) or Panorama? By default everything leaves the dedicated MGT port. Under Device > Setup > Services > Service Route Configuration you can pick a data interface and source address per service, which is common when the MGT network has no Internet access. PBF steers user traffic passing through the firewall; it does not fix traffic the firewall originates itself.",
   "On Layer 3 interfaces the firewall can act as a DHCP (Dynamic Host Configuration Protocol) server under Network > DHCP, handing out addresses from a pool along with gateway, DNS and other options, and it can inherit DNS settings from an upstream DHCP client interface. Or it can act as a DHCP relay, forwarding client broadcasts to a central DHCP server on another network. An interface cannot be both server and relay at once.",
   "A DNS proxy (Network > DNS Proxy) makes a firewall interface answer DNS queries for clients. It forwards queries to primary and secondary servers, can send specific domains to specific servers using domain rules (split DNS), can hold static FQDN-to-IP entries, and caches answers to speed up responses. It is handy for branches and is required by some features, such as the web proxy. The distinction to hold onto: PBF steers user traffic, service routes steer firewall-originated traffic, DHCP hands out addresses and DNS proxy answers name queries.",
   "Consider a worked example. A retail branch has MPLS and a broadband link. You write a PBF rule matching the Guest zone, forwarding to the broadband interface with the ISP gateway as next hop, path monitoring on 198.51.100.1 with action Fail Over, and symmetric return enabled. When the broadband link drops, the rule disables itself and guest traffic follows the default route over MPLS until the link recovers. The branch's MGT port sits on an isolated network, so you configure service routes for Palo Alto Networks Services and DNS through the broadband interface so content updates keep arriving.",
   "Exam questions use recognizable clues. 'Send traffic from a particular user, zone or application out a different ISP' points to PBF. 'First session ignored the rule' points to the application cache. 'Rule should stop being used when the link fails' is Fail Over path monitoring. 'Firewall cannot download updates because MGT has no Internet' points to a service route. 'Forward DHCP requests to a central server' is DHCP relay, and 'send internal domains to internal DNS servers' is a DNS proxy domain rule."
  ],
  "analogy": "PBF is like a hotel doorman who sends tour groups out the side door to the coach park while everyone else uses the main entrance. Path monitoring is the doorman checking that the coach park gate is open; if it is locked, he sends the groups out the front instead (Fail Over). A service route is different: it is the hotel's own delivery van choosing which gate to use for its errands. The analogy stops working for app-based PBF, because the doorman cannot recognize a tour group until he has seen it once.",
  "terms": [
   [
    "Policy-based forwarding (PBF)",
    "Rules that forward matching traffic by criteria like source, user or application instead of the routing table."
   ],
   [
    "Application cache",
    "The record of App-ID results by destination that lets later sessions of an application match app-based PBF rules."
   ],
   [
    "Symmetric return",
    "A PBF option that sends replies back out the same interface and next hop on which the original traffic arrived."
   ],
   [
    "Service route",
    "A setting that makes a management-plane service such as DNS, updates or syslog source its traffic from a data interface instead of MGT."
   ],
   [
    "DHCP relay",
    "A firewall interface role that forwards client DHCP broadcasts to a DHCP server on another network."
   ],
   [
    "DNS proxy",
    "A firewall feature that answers client DNS queries, forwards them to chosen servers per domain and caches the results."
   ],
   [
    "No PBF",
    "A PBF action that exempts matching traffic from policy-based forwarding so it follows the routing table."
   ]
  ],
  "example": "A retail branch has MPLS and a broadband link. A PBF rule sends the Guest zone to the broadband interface with path monitoring on the ISP gateway set to Fail Over. When the broadband link drops, the rule disables itself and guest traffic follows the default route over MPLS until the link recovers. Because the branch's MGT network has no Internet, service routes send update and DNS traffic out the broadband interface.",
  "mistakes": [
   [
    "Expecting an application-based PBF rule to steer the very first session of that application.",
    "The PBF decision happens on the first packet, before App-ID identifies the app. The first session follows the routing table; later sessions match once the app is in the application cache."
   ],
   [
    "Using a PBF rule to make the firewall download updates through a data interface.",
    "PBF applies to traffic passing through the firewall. The firewall's own management traffic is steered by service routes under Device > Setup > Services."
   ],
   [
    "Configuring a PBF Forward rule without path monitoring.",
    "Without monitoring, the rule keeps forwarding into a failed link and black-holes traffic. Path monitoring with Fail Over lets traffic fall back to normal routing."
   ],
   [
    "Assuming a PBF rule also permits the traffic.",
    "PBF only chooses the path. A security rule must still allow the traffic from its source zone to the new egress zone."
   ]
  ],
  "tryit": [
   [
    "Elmwood Schools has two ISPs. A PBF rule sends the Students zone out ISP B, but sessions from the Internet that arrive on ISP B for a published server keep failing, and packet captures show replies leaving through ISP A. What option fixes the return path?",
    "Enforce Symmetric Return on the PBF forwarding settings. It makes replies to sessions that arrived on an interface leave by that same interface and next hop, so return traffic does not exit through the wrong ISP and get dropped."
   ],
   [
    "A branch firewall serves DHCP to the staff VLAN from its own pool. The company now wants all addresses issued by a central DHCP server at headquarters for auditing. What do you change on the staff interface?",
    "Remove the DHCP server configuration from that interface and configure it as a DHCP relay pointing to the headquarters server. An interface can be a server or a relay, not both, and the relay forwards client broadcasts to the central server."
   ]
  ],
  "tip": "PBF is evaluated before routing, but app-based PBF only applies after the app is in the application cache, so the first session uses the routing table. Service routes are for firewall-originated traffic, not user traffic.",
  "check": [
   [
    "Why might the first session of an application ignore an app-based PBF rule?",
    "The PBF decision is made on the first packet before App-ID identifies the app; only later sessions match via the application cache."
   ],
   [
    "Your MGT port has no Internet access and dynamic updates fail. What do you configure?",
    "A service route so the Palo Alto Networks Services traffic uses a data interface with Internet access."
   ],
   [
    "What does Fail Over do in PBF path monitoring?",
    "It disables the PBF rule when monitoring fails so traffic falls back to the normal routing table."
   ],
   [
    "Can one interface be both a DHCP server and a DHCP relay?",
    "No, an interface is configured as either a DHCP server or a DHCP relay, not both."
   ]
  ]
 },
 {
  "t": "NAT on Layer 3 interfaces: source NAT (DIPP, dynamic IP, static), destination NAT, U-turn NAT, pre-NAT IP vs post-NAT zone in security rules",
  "hook": "Sunrise Bakery Supply is launching its online ordering site tonight. The web server sits in the DMZ at a private address, the public address is registered, and Kenji has written a NAT rule and a security rule exactly the way it seemed logical: from Untrust to DMZ, destination the server's private address. At 9 p.m. the marketing email goes out. At 9:02 the phones start ringing because nobody can reach the site, and test traffic hits interzone-default. Then the office staff report they cannot reach the site by name from inside either. Two rules, both looking correct. What did the firewall actually compare?",
  "simple": "Inside a company, devices use private addresses that the internet cannot reach, a bit like office extension numbers. Network Address Translation (NAT) swaps those private addresses for public ones at the firewall, like a receptionist who takes outside calls on the main number and transfers them to the right extension. Outgoing, many staff can share one public address. Incoming, the public address of a website can be transferred to the private server. The tricky part is writing the matching permission rule: the firewall checks the original public address the caller dialed, but the department (zone) where the call actually ends up. Get either half wrong and the call is never put through.",
  "body": [
   "Network Address Translation (NAT) rewrites addresses as traffic crosses the firewall. PAN-OS handles NAT in its own rulebase (Policies > NAT), separate from security rules, and evaluates it top-down with the first match winning. Only one NAT rule applies to a session, so a rule can translate both source and destination at once if needed. NAT is normally done on Layer 3 interfaces; virtual wire supports some NAT too, but the exam focuses on Layer 3. Understanding NAT is essential because nearly every Internet-facing design uses it, and misreading how NAT and security policy interact is the most common cause of rules that never match.",
   "Source NAT changes the source address, usually so private hosts can reach the Internet. Dynamic IP and Port (DIPP) is the everyday choice: many internal hosts share one public address, often the egress interface address, and the firewall keeps their sessions apart by translating source ports. Dynamic IP translates each host one-to-one to the next free address in a pool without changing ports; when the pool runs out, new sessions fail unless you configure a fallback to DIPP. Static IP translates a fixed address to a fixed address, keeping the port, and its Bi-directional option also creates the matching inbound translation so outside hosts can start sessions to the inside host.",
   "Destination NAT changes the destination address, typically to publish an internal server. A rule matching the server's public IP translates it to the private address, optionally with port translation, such as public 443 to private 8443. Destination translation can also target an address object that resolves by FQDN (fully qualified domain name), or distribute sessions across several addresses. For dynamic destination translation, PAN-OS offers distribution methods such as round robin.",
   "The most tested concept is how zones and addresses line up, so follow the packet carefully. When a packet arrives, the firewall determines the source zone from the ingress interface, then does a route lookup on the original (pre-NAT) destination to find the destination zone, and matches NAT policy with those values. Security policy is then checked using the pre-NAT IP addresses and the post-NAT zone, the zone where the translated destination actually lives. Only after the security rule allows the session is the translation applied to the packet on its way out.",
   "Apply that to an inbound web server. The NAT rule is from Untrust to Untrust, because the public IP routes toward the Untrust interface, with destination the public IP, translated to the private address. The security rule is from Untrust to DMZ (the post-NAT zone), with the public IP (the pre-NAT address) as its destination. Write the security rule with the private address and it never matches; write the NAT rule with DMZ as the destination zone and it never matches either.",
   "U-turn NAT solves internal users reaching an internal server by its public IP. With only a destination translation, and the server in the same subnet as the users, the request goes to the firewall, is translated to the server, and the server replies directly to the user, bypassing the firewall and breaking the session. The fix is a NAT rule from Trust to Untrust (the route lookup for the public IP points to Untrust), destination the public IP, translated to the server, plus source translation to the firewall's interface address so replies come back through the firewall. Split DNS (Domain Name System), which hands internal clients the private address, is often a cleaner alternative.",
   "Consider a worked example. A web server at 10.10.10.5 in the DMZ is published as 203.0.113.10. The NAT rule matches source zone Untrust, destination zone Untrust, destination 203.0.113.10, and translates the destination to 10.10.10.5. The security rule allows Untrust to DMZ, destination 203.0.113.10, applications `web-browsing` and `ssl`. You verify with `test nat-policy-match from Untrust to Untrust source 198.51.100.7 destination 203.0.113.10 destination-port 443 protocol 6` and the matching `test security-policy-match` command, then check the NAT source and destination columns in the Traffic log.",
   "Common mistakes include using the private (post-NAT) address in the security rule for inbound traffic, using the DMZ zone as the destination zone of the inbound NAT rule, placing a broad outbound DIPP rule above a specific static rule so the static rule never matches, and using Dynamic IP for a large user population and running out of pool addresses. Another is forgetting that the firewall must own or answer ARP (Address Resolution Protocol) for public addresses that are not its interface address, usually by routing the range to the firewall.",
   "Exam questions almost always turn on the address and zone rule. 'Which destination address in the security rule?' is the pre-NAT public address. 'Which destination zone in the security rule?' is the post-NAT zone. 'Which destination zone in the NAT rule?' is the zone found by routing the pre-NAT destination. 'Many users share one address' is DIPP, 'pool exhausted' is Dynamic IP, 'internal users reach a server by its public name' is U-turn NAT, and 'one-to-one in both directions' is static with Bi-directional."
  ],
  "analogy": "Think of a company switchboard. Callers dial the main public number, and the operator transfers them to an internal extension. The security guard's list says which callers may be put through, and it is written using the number the caller dialed (pre-NAT address) but names the department where the phone actually rings (post-NAT zone). Outbound DIPP is many staff sharing one outside line, told apart by which button they press, the port. The analogy stops working for U-turn NAT, where an inside caller dials the public number and the operator must stay on the line.",
  "mnemonic": "For security rules on NAT traffic, remember 'Address before, Zone after': pre-NAT address, post-NAT zone.",
  "terms": [
   [
    "DIPP",
    "Dynamic IP and Port source NAT: many hosts share one or a few addresses with source port translation."
   ],
   [
    "Dynamic IP NAT",
    "Source NAT that maps each host one-to-one to a free pool address without port translation; the pool can be exhausted."
   ],
   [
    "Static IP NAT",
    "A fixed one-to-one address translation that can be made bi-directional to allow inbound connections."
   ],
   [
    "Destination NAT",
    "Translation of the destination address, and optionally port, usually to publish an internal server."
   ],
   [
    "U-turn NAT",
    "NAT that lets internal clients reach an internal server via its public IP by translating destination and source so traffic returns through the firewall."
   ],
   [
    "Post-NAT zone",
    "The zone where the translated destination actually lives, used as the destination zone in security rules."
   ]
  ],
  "example": "A web server at 10.10.10.5 in the DMZ is published as 203.0.113.10. The NAT rule matches Untrust to Untrust, destination 203.0.113.10, translated to 10.10.10.5. The security rule allows Untrust to DMZ, destination 203.0.113.10, applications web-browsing and ssl. Written with 10.10.10.5 as the destination, the security rule would never match, and test security-policy-match would show the session hitting interzone-default.",
  "mistakes": [
   [
    "Using the server's private address as the destination in the inbound security rule.",
    "Security policy matches on pre-NAT addresses, so the destination must be the public address. The private address is only correct for the zone lookup, which gives the post-NAT zone."
   ],
   [
    "Setting the destination zone of the inbound NAT rule to DMZ.",
    "NAT policy uses the zone found by routing the pre-NAT destination. The public address routes toward the Untrust interface, so the NAT rule is Untrust to Untrust."
   ],
   [
    "Choosing Dynamic IP NAT for hundreds of users sharing a few public addresses.",
    "Dynamic IP is one-to-one without port translation and exhausts its pool. DIPP lets many hosts share an address by translating source ports."
   ],
   [
    "Fixing internal access to a public-named server with destination NAT only.",
    "If the server shares a subnet with the clients, it replies directly and the session breaks. U-turn NAT also translates the source to the firewall, or split DNS gives internal users the private address."
   ]
  ],
  "tryit": [
   [
    "Oakridge Insurance publishes a mail server at public 192.0.2.25, private 172.16.20.25 in the Servers zone. The NAT rule is Untrust to Untrust, destination 192.0.2.25, translated to 172.16.20.25. Inbound mail fails and the Traffic log shows interzone-default. The security rule reads: source Untrust, destination zone Untrust, destination 192.0.2.25, application smtp. What is wrong?",
    "The security rule's destination zone should be Servers, the post-NAT zone where the translated address lives. The address 192.0.2.25 is correct because security uses pre-NAT addresses. With destination zone Untrust, the rule never matches."
   ],
   [
    "A partner needs to open connections to an internal reporting server, and the reporting server must also appear to the partner as one fixed public address when it initiates connections outward. Which NAT type covers both directions with one rule?",
    "Static IP source NAT with the Bi-directional option. It maps the private address to one fixed public address for outbound traffic and automatically creates the matching inbound translation."
   ]
  ],
  "tip": "Security rules use pre-NAT addresses and the post-NAT zone. NAT rules use pre-NAT addresses and the zone found by routing the pre-NAT destination. Almost every NAT exam question turns on this.",
  "check": [
   [
    "Which source NAT type can run out of addresses?",
    "Dynamic IP, because it maps hosts one-to-one to pool addresses without port translation."
   ],
   [
    "In the security rule for an inbound destination NAT, which destination address and zone do you use?",
    "The public (pre-NAT) address and the DMZ (post-NAT) zone."
   ],
   [
    "Why does U-turn NAT also translate the source?",
    "So the server replies to the firewall rather than directly to the internal client, keeping the session symmetric."
   ],
   [
    "What destination zone does the NAT rule for an inbound published server use?",
    "Untrust, because the route lookup for the public (pre-NAT) address points to the Untrust interface."
   ]
  ]
 },
 {
  "t": "High availability: active/passive vs active/active, HA1/HA2/HA3 and backup links, priority and preemption, link and path monitoring, floating IPs",
  "hook": "At 4:45 p.m. on a Friday at Cedar Point Logistics, a switch in the core rack loses power and takes one port with it: the port connected to the active firewall's outside interface. The firewall itself is fine. It keeps sending heartbeats to its peer, its HA status widget shows green, and the passive firewall sits quietly ready. Meanwhile every warehouse scanner loses its connection to the shipping system. Aisha, the on-call engineer, stares at a pair of healthy firewalls and a company that is effectively offline. Why did high availability not fail over, and what should have been configured?",
  "simple": "High availability means using two identical firewalls so that if one breaks, the other takes over and people barely notice. Usually one does all the work while the other waits, constantly copying the first one's settings and its list of open connections, so it can pick up where the first left off. They talk over special cables: one for \"are you alive?\" messages and settings, another for copying connection details. Each firewall has a priority number to decide who should be in charge, and you can tell them to watch important cables or distant routers so a broken link also triggers a switch. It is like a pilot and co-pilot: the co-pilot follows everything and takes the controls if the pilot cannot fly.",
  "body": [
   "High availability (HA) pairs two identical firewalls so that if one fails, the other carries on with minimal disruption. Both peers must be the same model, run the same PAN-OS and content versions, and have matching licenses, and each is given a group ID and the peer's HA1 address. HA is configured under Device > High Availability. Because a firewall is often the only path to the Internet or between network segments, HA is how you remove it as a single point of failure.",
   "In active/passive mode, one firewall handles all traffic while the other stays synchronized and ready. On failover, the passive peer takes over the same interface IP and MAC (media access control) addresses, so neighbors barely notice. It works with Layer 3, Layer 2 and virtual wire deployments and is the recommended mode for most designs because it is simple to troubleshoot. In active/active mode, both peers process traffic at once. It supports only Layer 3 and virtual wire and exists mainly for asymmetric routing designs where traffic may arrive on either firewall. It adds concepts such as the session owner (the peer that performs Layer 7 inspection), the session setup peer, and floating IP addresses. It does not double usable capacity, because each peer must still be able to carry the full load after a failure.",
   "Peers talk over dedicated links. HA1 is the control link: hellos, heartbeats, HA state and management-plane configuration synchronization. HA2 is the data link: it synchronizes sessions, forwarding tables, IPsec security associations and ARP (Address Resolution Protocol) tables, so existing sessions survive failover. HA2 can use Ethernet, IP or UDP transport. HA3 exists only in active/active and forwards packets between peers for session setup and asymmetric traffic; it is a Layer 2 link and benefits from jumbo frames.",
   "Backup links matter as much as the primary ones. HA1 backup and HA2 backup links provide redundancy for the control and data links. Without an HA1 backup, a single failed cable can cause split brain, where both peers believe they should be active because each thinks the other has died. Two active firewalls answering for the same addresses cause far more disruption than one failed firewall.",
   "Device priority decides which peer should be active; the lower number wins. Preemption lets the higher-priority firewall take the active role back after it recovers. Preemption only works if it is enabled on both peers, and it is off by default, so the peer that took over normally stays active. Leaving preemption off avoids flapping back and forth when a firewall recovers unreliably, and many teams prefer to fail back deliberately in a maintenance window.",
   "Failover triggers include heartbeat loss and monitoring. Link monitoring watches physical interfaces grouped into link groups: the failure condition 'any' fails over if one link in the group goes down, 'all' only when every link fails. Path monitoring pings destination IPs, such as the upstream router, and fails over when they become unreachable. Together they catch failures a heartbeat would miss, such as a dead switch port or a failed upstream router, while both firewalls remain perfectly healthy.",
   "Floating IP addresses belong to active/active. Instead of one peer owning the interface address, a floating IP is bound to a device ID and moves to the surviving peer on failure. For load sharing you can use two floating IPs, one active on each peer, or ARP load-sharing, where both peers answer for one virtual IP. Check status in the dashboard's High Availability widget or with `show high-availability state`, and review HA events in the System log.",
   "Consider a worked example. In an active/passive pair, the upstream switch port for the active firewall's Untrust interface dies, but the firewall itself stays up and keeps sending heartbeats. Because you configured a link group containing ethernet1/1 with the 'any' condition, the firewall declares itself non-functional and fails over. The passive peer becomes active with the same IP and MAC addresses, and sessions synchronized over HA2 continue. Once the port is repaired, the original peer returns to passive, because preemption is disabled, and you fail back in a maintenance window with `request high-availability state suspend` on the active peer.",
   "Exam questions use clear signals. 'Sessions survive failover' points to HA2. 'Heartbeats and configuration sync' is HA1. 'Packet forwarding between peers' or 'asymmetric routing' points to HA3 and active/active. 'Recovered firewall did not become active again' points to preemption. 'Both peers active after a link failure' is split brain, fixed with backup links, and 'address moves between peers in active/active' is a floating IP. 'Firewall stayed up but its uplink died and nothing failed over' points to missing link or path monitoring."
  ],
  "analogy": "An HA pair is like a pilot and co-pilot. HA1 is the intercom where they confirm the other is awake and share the flight plan. HA2 is the co-pilot following every instrument reading, so taking the controls needs no catch-up. Link and path monitoring are warning lights for a failed engine even though the pilot is fine. Preemption is whether the senior pilot automatically takes the controls back after returning from a break. The analogy fails for active/active, where both fly at once and HA3 passes work between them.",
  "mnemonic": "HA links by number: 1 = Control (heartbeats and config), 2 = Copy (sessions and tables), 3 = Carry (packets between active/active peers).",
  "terms": [
   [
    "HA1",
    "The HA control link carrying hellos, heartbeats, state and configuration synchronization."
   ],
   [
    "HA2",
    "The HA data link that synchronizes sessions, forwarding tables, IPsec SAs and ARP tables."
   ],
   [
    "HA3",
    "The active/active-only link that forwards packets between peers for session setup and asymmetric flows."
   ],
   [
    "Preemption",
    "The option that lets the higher-priority (lower number) peer reclaim the active role; must be enabled on both peers."
   ],
   [
    "Split brain",
    "A failure where both peers believe they should be active, usually because the only HA1 link failed."
   ],
   [
    "Link group",
    "A set of monitored interfaces whose failure condition (any or all) triggers failover."
   ],
   [
    "Path monitoring",
    "HA monitoring that pings destination IPs, such as an upstream router, and triggers failover when they become unreachable."
   ],
   [
    "Floating IP",
    "An active/active address bound to one peer that moves to the other peer on failure."
   ]
  ],
  "example": "In an active/passive pair, the upstream switch port for the active firewall's Untrust interface dies but the firewall stays up. Because you configured a link group containing ethernet1/1 with the 'any' condition, the firewall fails over, the passive peer becomes active with the same IP and MAC, and synchronized sessions over HA2 continue. Preemption is off, so you fail back later in a maintenance window.",
  "mistakes": [
   [
    "Believing the firewall with the higher priority number becomes active.",
    "In PAN-OS HA the lower device priority number is preferred. A peer with priority 50 is preferred over one with 100."
   ],
   [
    "Enabling preemption on only the preferred firewall.",
    "Preemption must be enabled on both peers to take effect. It is off by default, so a recovered firewall normally stays passive."
   ],
   [
    "Choosing active/active to double the firewall throughput.",
    "Each peer must be able to carry the whole load after a failure, so usable capacity does not double. Active/active is mainly for asymmetric routing; active/passive is simpler and recommended for most designs."
   ],
   [
    "Assuming heartbeats alone will catch an upstream failure.",
    "Heartbeats only prove the peers are alive. A dead switch port or upstream router needs link monitoring or path monitoring to trigger failover."
   ]
  ],
  "tryit": [
   [
    "Riverside Credit Union's two firewalls are connected by a single cable used for HA1, and HA2 runs on a separate port. During cable maintenance someone unplugs the HA1 cable, and suddenly both firewalls show as active and users see intermittent outages. What happened and how do you prevent it?",
    "Split brain: with the only HA1 link gone, each peer lost the other's heartbeats and assumed it should be active. Configure an HA1 backup link (and an HA2 backup) so control traffic survives the loss of one link."
   ],
   [
    "A data center has asymmetric routing: traffic for one session can arrive on either of two firewalls depending on the upstream routers. The deployment uses Layer 3 interfaces. Which HA mode fits, and which extra link does it require?",
    "Active/active, which is designed for asymmetric routing and supports Layer 3 and virtual wire. It requires HA3 to forward packets between peers so the session owner can inspect them."
   ]
  ],
  "tip": "Lower priority number wins, and preemption must be on for both peers. Active/active supports only Layer 3 and virtual wire. HA3 appears only in active/active questions.",
  "check": [
   [
    "Which HA link keeps existing sessions alive after failover?",
    "HA2, because it synchronizes the session table and related state between peers."
   ],
   [
    "Firewall A (priority 50) failed and recovered but did not become active again. Why?",
    "Preemption is not enabled on both peers, so the current active peer keeps the role."
   ],
   [
    "Why add an HA1 backup link?",
    "To avoid split brain if the only HA1 link fails and both peers would otherwise assume they should be active."
   ],
   [
    "Which deployment types does active/active support?",
    "Layer 3 and virtual wire only."
   ]
  ]
 },
 {
  "t": "Site-to-site IPsec: IKE gateway, IKE and IPsec crypto profiles, tunnel interfaces, proxy IDs, tunnel monitoring",
  "hook": "Blue Heron Engineering signed a contract with a supplier, and the supplier's IT contact, Marcus, sends a one-page VPN worksheet: peer address, pre-shared key, encryption settings and two protected subnets. You build the tunnel that afternoon. The IKE gateway turns green within seconds, and you feel good about it, until the project manager messages that the design drawings still will not upload. The IPsec tunnel status shows phase 1 up and phase 2 stubbornly down, and the System log repeats the same negotiation failure every few seconds. The keys match. The algorithms match. What is the supplier's device expecting that yours is not sending?",
  "simple": "A site-to-site VPN is a private, scrambled pipe between two offices across the public internet. Setting it up happens in two steps. First, the two firewalls prove who they are and agree on a secret way to talk (phase 1). Second, they agree on how to scramble the actual business data and which office networks the pipe is for (phase 2). On Palo Alto firewalls, the pipe shows up as a special interface, and you send traffic into it with normal routes. If the other side is a device that insists on listing exactly which networks may use the pipe, you must list the same networks, or phase 2 fails. It is like two people agreeing on a secret language, then agreeing exactly which rooms the messages are for.",
  "body": [
   "Palo Alto Networks firewalls build route-based site-to-site VPNs (virtual private networks). Instead of a policy saying 'encrypt traffic from A to B', you create a tunnel interface and route the remote networks to it. Anything routed into the tunnel is protected with IPsec (IP Security). This keeps VPN logic in routing, where static routes or dynamic protocols such as OSPF (Open Shortest Path First) and BGP (Border Gateway Protocol) can steer traffic, and it makes the tunnel look like any other interface in a zone, so the same security rules, logs and reports apply.",
   "The building blocks are configured in order. First, a tunnel interface (Network > Interfaces > Tunnel, for example `tunnel.10`) assigned to a virtual or logical router and a security zone; an IP address on it is optional but required for tunnel monitoring or dynamic routing over the tunnel. Second, an IKE (Internet Key Exchange) crypto profile for phase 1: Diffie-Hellman (DH) group, encryption algorithm, authentication (hash) algorithm and key lifetime. Third, an IPsec crypto profile for phase 2: ESP (Encapsulating Security Payload) or AH (Authentication Header), encryption, authentication, the DH group for perfect forward secrecy (PFS) and the lifetime. Both peers must agree on these values. Both profiles live under Network > Network Profiles.",
   "Next is the IKE gateway (Network > Network Profiles > IKE Gateways). It defines the IKE version (IKEv1 only, IKEv2 only, or IKEv2 preferred), the local interface and IP, the peer address (static IP, FQDN or dynamic), authentication by pre-shared key or certificate, local and peer identification, the IKE crypto profile, and advanced options like NAT traversal, passive mode and dead peer detection. Finally, the IPsec tunnel object (Network > IPsec Tunnels) ties together the tunnel interface, the IKE gateway and the IPsec crypto profile, and holds proxy IDs and tunnel monitoring settings.",
   "Proxy IDs define which local and remote subnets a phase 2 security association (SA) covers. A PAN-OS-to-PAN-OS route-based tunnel does not need them, because both sides propose 0.0.0.0/0 by default. But when the peer is a policy-based device, you must enter proxy IDs that exactly mirror the peer's configured local and remote networks, one per subnet pair, with each side's local matching the other side's remote. A mismatch is the classic cause of phase 1 coming up while phase 2 fails, and the System log shows the phase 2 proposal being rejected.",
   "Tunnel monitoring proves the data path works. It sends pings through the tunnel to a destination IP on the far side, sourced from the tunnel interface IP. A monitor profile chooses what happens on failure: Wait Recover keeps the tunnel and waits, while Fail Over lets routing or PBF (policy-based forwarding) move traffic to a backup path. Dead peer detection works at the IKE level and only shows the peer is answering IKE; tunnel monitoring proves traffic actually passes.",
   "Do not forget policy and routing. You need a route for the remote subnets pointing to the tunnel interface, security rules between the internal zone and the VPN zone in both directions, and a rule permitting IKE and IPsec (applications `ike` and `ipsec-esp`) between the public endpoints if the external interface's zone requires it. Troubleshoot with the status lights on the IPsec Tunnels page, the System log filtered for IKE messages, and CLI commands such as `show vpn ike-sa`, `show vpn ipsec-sa`, `test vpn ike-sa gateway <name>` and `test vpn ipsec-sa tunnel <name>`.",
   "Consider a worked example. You connect a PAN-OS firewall to a partner's policy-based VPN device protecting 172.16.5.0/24 and 172.16.6.0/24. Phase 1 establishes, but nothing passes. The System log shows the phase 2 negotiation failing because the proposed networks do not match. You add two proxy IDs on the IPsec tunnel, each pairing your local 10.1.0.0/16 with one remote subnet, add static routes for both remote subnets to `tunnel.20`, and write rules between Trust and the Partner-VPN zone. Both SAs come up, and tunnel monitoring against the partner's server keeps watch.",
   "Common mistakes include mismatched crypto profiles (phase 1 fails), mismatched proxy IDs (phase 2 fails), forgetting the route to the tunnel interface so traffic leaves in cleartext toward the Internet, leaving the tunnel interface without a zone, and enabling tunnel monitoring without an IP address on the tunnel interface. Another is mismatched peer identification when one side is behind NAT (Network Address Translation), which NAT traversal and correct local and peer IDs resolve.",
   "Exam questions often describe symptoms. 'Phase 1 fails' points to IKE gateway or IKE crypto settings: pre-shared key, IKE version, DH group or peer ID. 'Phase 1 up, phase 2 down with a third-party peer' points to proxy IDs or the IPsec crypto profile. 'Tunnel up but no traffic' points to routing or security policy. 'Detect a broken data path and fail over' is tunnel monitoring, and 'object that ties it all together' is the IPsec tunnel."
  ],
  "analogy": "Building an IPsec tunnel is like two embassies setting up a diplomatic pouch service. Phase 1 is the ambassadors meeting, checking credentials and agreeing on a secure meeting method. Phase 2 is agreeing on the sealed pouches themselves and exactly which departments may use them; proxy IDs are that department list, and if one embassy lists 'Trade' while the other lists 'Trade and Culture', no pouches move. The tunnel interface is the mailroom door, and routes decide which letters go through it.",
  "mnemonic": "Build order from the bottom up: 'Tunnel, Two profiles, Gateway, Glue'. Tunnel interface, IKE and IPsec crypto profiles, IKE gateway, then the IPsec tunnel object that glues them together.",
  "terms": [
   [
    "IKE gateway",
    "The object defining the VPN peer, local interface, IKE version, authentication and IKE crypto profile for phase 1."
   ],
   [
    "IKE crypto profile",
    "Phase 1 settings: Diffie-Hellman group, encryption, authentication and key lifetime."
   ],
   [
    "IPsec crypto profile",
    "Phase 2 settings: ESP or AH, encryption, authentication, PFS DH group and lifetime."
   ],
   [
    "Proxy ID",
    "A local/remote subnet pair that defines a phase 2 SA, required when the peer uses a policy-based VPN."
   ],
   [
    "Tunnel monitoring",
    "Pings through the tunnel to a remote IP that detect a broken data path and trigger wait-recover or fail-over."
   ],
   [
    "Perfect forward secrecy (PFS)",
    "A fresh Diffie-Hellman exchange for phase 2 keys so one compromised key does not expose other sessions."
   ],
   [
    "Dead peer detection",
    "An IKE-level check that the VPN peer is still responding, which does not by itself prove data passes through the tunnel."
   ]
  ],
  "example": "You connect a PAN-OS firewall to a partner's policy-based VPN device protecting 172.16.5.0/24 and 172.16.6.0/24. Phase 1 establishes, but phase 2 fails and the System log shows a proposal mismatch. Adding two proxy IDs, one for each remote subnet paired with your local 10.1.0.0/16, plus routes to the tunnel interface and matching security rules, brings both SAs up and traffic flows.",
  "mistakes": [
   [
    "Blaming the pre-shared key when phase 1 is up but phase 2 fails.",
    "If phase 1 is established, the key and IKE settings already worked. Phase 2 failures with a policy-based peer usually mean mismatched proxy IDs or IPsec crypto settings."
   ],
   [
    "Assuming a green tunnel means traffic will flow.",
    "The tunnel only carries what is routed into it and what security policy allows. Check the route to the tunnel interface and rules between the internal and VPN zones."
   ],
   [
    "Configuring proxy IDs on every PAN-OS-to-PAN-OS tunnel.",
    "Route-based PAN-OS peers propose 0.0.0.0/0 and do not need proxy IDs. They are required when the peer is a policy-based device."
   ],
   [
    "Enabling tunnel monitoring on a tunnel interface with no IP address.",
    "Monitoring pings are sourced from the tunnel interface IP, so the interface needs an address for tunnel monitoring to work."
   ]
  ],
  "tryit": [
   [
    "Fairfield Labs builds a new tunnel to a branch. The IPsec Tunnels page shows the IKE gateway red, and the System log reports that IKE phase 1 negotiation failed with no proposal chosen. Proxy IDs are not configured, and both sides are PAN-OS. Where do you look first?",
    "At the phase 1 settings: the IKE crypto profile (DH group, encryption, authentication, lifetime), the IKE version and the IKE gateway authentication and peer identification. 'No proposal chosen' in phase 1 means the peers did not agree on IKE crypto values; proxy IDs are a phase 2 matter and not needed between PAN-OS peers."
   ],
   [
    "A company has a primary tunnel to a data center over one ISP and a backup tunnel over another. Both tunnels show up, but last week the primary ISP dropped traffic upstream while IKE stayed established, and users were stranded. What feature would have moved traffic to the backup?",
    "Tunnel monitoring with a Fail Over monitor profile, using a destination IP on the far side and an IP on the tunnel interface. It detects that data no longer passes and lets routing move traffic to the backup tunnel, which dead peer detection alone did not do."
   ]
  ],
  "tip": "Phase 1 up but phase 2 down with a policy-based peer almost always means proxy IDs. Remember the tunnel interface needs a zone and router, and traffic still needs security rules and a route.",
  "check": [
   [
    "Which object ties the tunnel interface, IKE gateway and IPsec crypto profile together?",
    "The IPsec tunnel configuration under Network > IPsec Tunnels."
   ],
   [
    "When are proxy IDs required?",
    "When the peer is a policy-based VPN device; they must mirror the peer's local and remote subnet pairs."
   ],
   [
    "What does tunnel monitoring require on the tunnel interface?",
    "An IP address, used as the source of the monitoring pings."
   ],
   [
    "The tunnel shows green but users cannot reach the remote network. What should you check first?",
    "The route for the remote subnets to the tunnel interface and the security rules between the internal and VPN zones."
   ]
  ]
 },
 {
  "t": "Quantum-resistant IKEv2 VPNs (post-quantum preshared keys) and GRE tunnels",
  "hook": "The chief risk officer at Stonebridge Savings Bank forwards you an article with one sentence highlighted: \"Encrypted traffic recorded today may be readable in the future.\" Her note underneath is short. \"Our replication tunnel to the disaster recovery site carries account data we must protect for decades. Are we exposed, and what can we do now?\" On the same afternoon, a cloud provider's onboarding guide asks you to build a GRE tunnel, and a junior colleague suggests using it for the replication traffic too, since \"it is a tunnel, so it is private\". Which tunnel actually protects anything?",
  "simple": "Today's VPNs agree on secret keys using math problems that normal computers cannot solve. A powerful future quantum computer might solve them. Someone could record scrambled traffic today and unscramble it years later. A post-quantum preshared key is an extra long secret that both firewalls already know and never send over the network. It is mixed into the keys, so breaking the math alone is not enough to read the traffic. This only works with the newer IKEv2 method. GRE is a different kind of tunnel: it just wraps packets in an outer envelope to deliver them, without scrambling anything. It is like putting a letter in a second envelope; anyone who opens it can read the letter.",
  "body": [
   "Today's VPNs (virtual private networks) use Diffie-Hellman key exchange, which a sufficiently large quantum computer could break. The worry is 'harvest now, decrypt later': an attacker records encrypted VPN traffic today and decrypts it years from now once the key exchange can be broken. For data that must stay confidential for a long time, that future risk is a present problem, because traffic already captured cannot be re-protected later. Quantum-resistant VPN features in recent PAN-OS releases address this for IKEv2 (Internet Key Exchange version 2) site-to-site tunnels. This lesson also covers GRE, a simple tunnel with no cryptography at all, so you can tell the two apart.",
   "The approach this topic names is post-quantum preshared keys (PPKs), standardized in RFC 8784 for IKEv2. Both peers are configured with the same high-entropy secret key and a matching key ID, in addition to their normal authentication. The PPK is mixed into the derivation of the IPsec (IP Security) keys. Even if an attacker later breaks the Diffie-Hellman exchange, they still cannot derive the session keys without the PPK, which was never sent over the wire. A PPK does not replace authentication; it is added on top of the pre-shared key or certificate the gateway already uses.",
   "Configuration has a few rules worth memorizing. PPKs work only with IKEv2, not IKEv1, and both peers must support the extension. You configure them in the IKE gateway's advanced IKEv2 options, entering the key and key ID, with a negotiation setting that decides whether the tunnel requires the PPK or can fall back to a normal exchange for peers that do not support it. Requiring it is stronger but will fail against a non-supporting peer; allowing fallback keeps the tunnel up but without post-quantum protection for that peer.",
   "Newer releases also add hybrid key exchange, where a post-quantum key encapsulation mechanism (KEM) is combined with classical Diffie-Hellman using IKEv2 extensions for multiple key exchanges. The principle to remember is 'hybrid': the result is at least as strong as the stronger of the two methods, so you do not lose classical security while gaining quantum resistance. Check the release notes for which algorithms your PAN-OS version supports rather than assuming.",
   "Practical guidance completes the picture. Use strong symmetric algorithms such as AES-256 (Advanced Encryption Standard) with SHA-256 (Secure Hash Algorithm) or better, because symmetric cryptography with large keys is considered much less exposed to quantum attacks. Manage PPKs like any secret: generate them randomly, rotate them, and never reuse them across unrelated peers.",
   "Generic Routing Encapsulation (GRE) is a simple, unencrypted tunneling protocol, IP protocol 47, that wraps packets inside a new IP header. It is used to reach partners or cloud services that require GRE, and to carry traffic such as routing protocol exchanges or multicast to a peer. On PAN-OS you configure it under Network > GRE Tunnels: a tunnel interface (with zone and router), the local interface and address, the peer address, TTL (time to live), an optional Copy ToS (type of service) setting, and keepalives that mark the tunnel down if the peer stops responding so routing can react. Then you route traffic to the tunnel interface as you would with IPsec.",
   "The distinction the exam tests is protection. A PPK strengthens the confidentiality of an IPsec tunnel against future quantum attacks; GRE provides no confidentiality or integrity at all. Do not use GRE over untrusted networks for sensitive data unless something else, such as IPsec, protects it. Security policy still applies to traffic entering and leaving the GRE tunnel interface's zone, and you need a rule permitting GRE between the tunnel endpoints on the outside zone.",
   "Consider a worked example. A bank's data center to disaster recovery tunnel carries replication data that must stay confidential for decades. Both sides run IKEv2 on PAN-OS versions that support PPKs, so the engineers generate a long random PPK, enter the same key and key ID on each IKE gateway, and set the negotiation to require it. They confirm the SA (security association) comes up with `show vpn ike-sa` and check the System log for PPK negotiation messages. Separately, a cloud provider's service requires GRE, so the team builds a GRE tunnel with keepalives and runs it only across a private interconnect, not the Internet.",
   "Common mistakes include trying to use a PPK on an IKEv1 gateway, entering different key IDs on each side, setting the PPK as mandatory when the peer does not support it and then wondering why the tunnel is down, treating GRE as a secure VPN, and forgetting the security rule for GRE itself. On the exam, 'harvest now, decrypt later', 'quantum-resistant' or 'RFC 8784' point to post-quantum preshared keys with IKEv2. 'Combine classical and post-quantum key exchange' is hybrid key exchange. 'IP protocol 47', 'unencrypted encapsulation' or 'keepalive marks the tunnel down' point to GRE, and 'needs confidentiality over the Internet' means GRE alone is the wrong answer."
  ],
  "analogy": "A PPK is like two business partners who met in person years ago and agreed on a secret phrase that they never write down or say on the phone. Even if someone later cracks the lock on their phone line, the conversations stay useless without the phrase. GRE is a padded shipping envelope: it gets the contents to the right address and protects them from being bent, but anyone who opens it reads everything inside. The analogy stops at one point: a PPK must still be entered on both devices, so it needs careful handling like any secret.",
  "terms": [
   [
    "Post-quantum preshared key (PPK)",
    "An extra shared secret mixed into IKEv2 key derivation (RFC 8784) so session keys resist future quantum attacks on Diffie-Hellman."
   ],
   [
    "Harvest now, decrypt later",
    "The threat of recording encrypted traffic today to decrypt it once quantum computers can break the key exchange."
   ],
   [
    "Hybrid key exchange",
    "Combining a classical and a post-quantum key exchange so the result is at least as strong as the stronger one."
   ],
   [
    "Key encapsulation mechanism (KEM)",
    "A public key method for establishing a shared secret, the form most post-quantum key exchange algorithms take."
   ],
   [
    "GRE",
    "Generic Routing Encapsulation, an unencrypted tunneling protocol (IP protocol 47) that encapsulates packets in a new IP header."
   ],
   [
    "GRE keepalive",
    "A periodic check that marks a GRE tunnel down when the peer stops responding so routing can react."
   ]
  ],
  "example": "A bank's data center-to-DR tunnel carries replication data that must stay confidential for decades. Both sides run IKEv2 on PAN-OS versions that support PPKs, so the engineers add the same randomly generated PPK and key ID on each IKE gateway and set the negotiation to require it. Recorded traffic is now protected even if Diffie-Hellman is broken later, while a separate GRE tunnel to a cloud service runs only over a private link.",
  "mistakes": [
   [
    "Treating a GRE tunnel as a private, encrypted VPN.",
    "GRE only encapsulates packets in a new IP header and provides no confidentiality or integrity. Sensitive traffic over untrusted networks needs IPsec."
   ],
   [
    "Adding a PPK to an existing IKEv1 gateway for quantum resistance.",
    "PPKs (RFC 8784) are an IKEv2 extension only. The gateway must use IKEv2 and both peers must support PPKs."
   ],
   [
    "Assuming a PPK replaces the gateway's normal authentication.",
    "The PPK is mixed into key derivation in addition to pre-shared key or certificate authentication; it does not replace it."
   ],
   [
    "Setting the PPK to required for every peer to be safe.",
    "If a peer does not support PPKs, a required setting stops the tunnel from establishing. Allowing fallback keeps it up but without post-quantum protection, so match the setting to each peer's capability."
   ]
  ],
  "tryit": [
   [
    "Glenhaven Hospital wants quantum resistance on its tunnel to a research partner. Your firewall supports PPKs, but the partner's VPN device does not yet. Management insists the tunnel cannot go down. How do you configure the PPK negotiation setting, and what is the trade-off?",
    "Allow fallback rather than requiring the PPK. The tunnel stays up with the partner, but that peer gets no post-quantum protection until it supports PPKs, at which point you can switch to required. Requiring it now would stop the tunnel from establishing."
   ],
   [
    "A GRE tunnel to a cloud service shows up on the firewall even though the provider's endpoint stopped responding an hour ago, and traffic is being black-holed instead of taking an alternate route. What setting is missing?",
    "GRE keepalives. With keepalives enabled, the firewall marks the tunnel down when the peer stops responding, so the route through the tunnel is withdrawn and routing can use the alternate path."
   ]
  ],
  "tip": "PPKs mean IKEv2 only and must match on both peers. GRE is not encryption; if a question needs confidentiality over the Internet, GRE alone is the wrong answer.",
  "check": [
   [
    "Why does a PPK protect against future quantum attacks?",
    "It is mixed into the IPsec key derivation but never transmitted, so breaking Diffie-Hellman alone does not reveal the keys."
   ],
   [
    "Can you use a PPK with an IKEv1 gateway?",
    "No, PPKs are an IKEv2 extension."
   ],
   [
    "What does a GRE keepalive do?",
    "It checks the peer is responding and marks the tunnel down if it is not, so routing can react."
   ],
   [
    "What happens if you require a PPK but the peer does not support it?",
    "The tunnel fails to establish; allowing fallback keeps it up but without post-quantum protection."
   ]
  ]
 },
 {
  "t": "GlobalProtect: portal, gateways (internal/external), authentication, connect methods (user-logon, pre-logon, on-demand), split tunneling, HIP objects and profiles, IPsec vs SSL tunnels",
  "hook": "Monday morning at Copperfield Architects, the help desk queue is full. Remote designers cannot reset their expired domain passwords at the Windows sign-in screen, because the VPN only connects after they sign in. A partner working from a hotel says the VPN connects but video calls stutter badly. The security officer wants the finance file server reachable only from laptops with disk encryption turned on, and someone asks why the office laptops even need GlobalProtect when they are plugged into the LAN. Elena, the IT manager, hands you the list. \"One product. Five complaints. Where do we start?\"",
  "simple": "GlobalProtect is the app that connects remote laptops back to the company firewall, so the same protection follows people home or to a coffee shop. It has a portal, which is like a front desk that checks who you are and hands you instructions, and gateways, which are the doors that actually carry your traffic and apply the rules. You can choose when the connection starts: automatically after you sign in, before you sign in (so you can change your password at the login screen), or only when you click a button. You can send all traffic through it or only some. The app can also report the laptop's health, such as whether the disk is encrypted, so rules can refuse unhealthy laptops.",
  "body": [
   "GlobalProtect extends firewall policy to users wherever they are. It has three parts: the portal, one or more gateways, and the GlobalProtect app on endpoints. The portal is the first contact point: the app authenticates to it and downloads its configuration, including the list of gateways, the connect method, split tunnel behavior and HIP (Host Information Profile) collection settings. The portal is configured under Network > GlobalProtect > Portals on a Layer 3 interface or loopback, with an SSL/TLS (Secure Sockets Layer/Transport Layer Security) service profile that supplies its certificate. If clients do not trust that certificate, connections fail before authentication even starts.",
   "Gateways enforce policy. External gateways accept tunnels from remote users over the Internet; the app picks the best one by configured priority and response time. Internal gateways sit inside the network: users on the LAN connect to them, usually without a tunnel, so the firewall learns their User-ID and HIP information and can apply the same user and posture rules inside the office. The app decides whether it is inside or outside using internal host detection, a reverse DNS (Domain Name System) lookup of a known internal IP that only returns the expected hostname on the corporate network. Gateways are configured under Network > GlobalProtect > Gateways, where you also define the IP pool for tunnel clients and the tunnel interface in the VPN zone.",
   "Authentication uses authentication profiles tied to LDAP (Lightweight Directory Access Protocol), RADIUS (Remote Authentication Dial-In User Service), SAML (Security Assertion Markup Language), Kerberos and others, client certificates validated by a certificate profile, or both together. You can configure authentication separately at the portal and at the gateway, and use authentication override cookies so users are not prompted twice when the app moves from the portal to a gateway.",
   "Connect methods set when the tunnel comes up. User-logon (Always On) connects automatically after the user signs in to the endpoint, giving continuous protection. Pre-logon connects before the user signs in, authenticating the machine with a certificate, so login scripts, password resets and domain authentication work for remote laptops; after user login it transitions to the user's tunnel. On-demand connects only when the user clicks Connect, suited to occasional access. Pre-logon then On-demand is also available. Pre-logon without a machine certificate on the laptop simply cannot work, so certificate deployment comes first.",
   "Split tunneling decides what goes through the tunnel. By default all traffic does (full tunnel). With split tunneling you include or exclude routes, domains or applications in the gateway's client settings, for example excluding a video conferencing service to save bandwidth. Full tunnel gives the most visibility and control; split tunnel reduces load but sends excluded traffic directly to the Internet without inspection, so never exclude traffic you are required to inspect.",
   "The tunnel itself prefers IPsec (IP Security), which uses UDP (User Datagram Protocol) and performs better, and falls back to SSL over TCP 443 if IPsec is blocked or disabled. SSL is more likely to pass restrictive hotel or guest networks but performs worse for real-time traffic such as voice and video, which explains the stuttering call from the hotel room.",
   "HIP checks let policy consider endpoint posture. The app sends HIP data such as OS version, patch level, disk encryption and anti-malware status. HIP objects (Objects > GlobalProtect > HIP Objects) define individual criteria, and HIP profiles combine objects with AND, OR and NOT logic. HIP profiles are then used as a match condition in security rules, for example allowing finance servers only from encrypted, patched laptops. Rules reference HIP profiles, not HIP objects directly. HIP checks require a GlobalProtect subscription on the gateway firewalls, and results appear in the HIP Match log.",
   "Consider a worked example. Help desk calls rise because remote users cannot reset expired domain passwords at the Windows sign-in screen. You deploy machine certificates through the company's device management, add a certificate profile to the portal and gateway, and change the portal's agent configuration to pre-logon. Laptops now reach the domain controllers through the tunnel before sign-in, and password changes work from home. You also add a HIP profile requiring disk encryption to the rule that allows access to the finance servers, and you add a security rule from the VPN zone to internal resources, which is easy to forget.",
   "Exam questions use these clues. 'Delivers configuration and gateway list' is the portal; 'enforces policy and terminates the tunnel' is the gateway. 'Before the user signs in' is pre-logon; 'only when the user clicks' is on-demand. 'Is the device inside the network?' is internal host detection. 'Require disk encryption' points to a HIP profile in a security rule, and 'IPsec blocked on hotel Wi-Fi' points to the SSL fallback."
  ],
  "analogy": "GlobalProtect works like a large office campus. The portal is the visitor center: it checks your ID and hands you a map listing the entrances. Gateways are the entrances where guards actually inspect you and enforce the rules. HIP is the guard checking your vehicle's inspection sticker before letting you into the secure lot. Pre-logon is a shuttle that picks you up before you have even checked in. The analogy stops for internal gateways, where you are already inside and the guard mainly records who you are.",
  "mnemonic": "Connect methods by timing: 'Pre, Post, Push'. Pre-logon connects before sign-in, user-logon right after sign-in, on-demand when the user pushes Connect.",
  "terms": [
   [
    "Portal",
    "The GlobalProtect component that authenticates the app and delivers its configuration and gateway list."
   ],
   [
    "External gateway",
    "A gateway that terminates tunnels from remote users over the Internet and enforces policy on their traffic."
   ],
   [
    "Internal gateway",
    "A gateway inside the network used for User-ID and HIP enforcement, often without a tunnel."
   ],
   [
    "Internal host detection",
    "A reverse DNS check of a known internal IP that tells the app whether it is on the corporate network."
   ],
   [
    "Pre-logon",
    "A connect method that establishes the tunnel with a machine certificate before the user signs in."
   ],
   [
    "Split tunneling",
    "Sending only chosen routes, domains or applications through the tunnel while other traffic goes directly to the Internet."
   ],
   [
    "HIP object",
    "A single endpoint posture criterion, such as disk encryption enabled, used to build HIP profiles."
   ],
   [
    "HIP profile",
    "A combination of HIP objects evaluated as a match condition in security policy."
   ]
  ],
  "example": "Help desk calls rise because remote users cannot reset expired domain passwords at the Windows login screen. You deploy machine certificates and switch the portal's agent configuration to pre-logon. Laptops now reach the domain controllers through the tunnel before sign-in, and password changes work from home. A HIP profile requiring disk encryption is then added to the rule allowing access to the finance servers.",
  "mistakes": [
   [
    "Thinking the portal enforces security policy on user traffic.",
    "The portal authenticates the app and delivers configuration and the gateway list. Gateways terminate tunnels and enforce policy."
   ],
   [
    "Placing a HIP object directly in a security rule.",
    "Security rules reference HIP profiles. HIP objects are individual criteria that profiles combine with AND, OR and NOT logic."
   ],
   [
    "Switching to pre-logon without deploying machine certificates.",
    "Pre-logon authenticates the machine with a certificate before any user signs in. Without a certificate on the endpoint and a certificate profile on the portal and gateway, it cannot connect."
   ],
   [
    "Believing SSL is the preferred GlobalProtect tunnel because it passes more networks.",
    "IPsec is preferred because it uses UDP and performs better. SSL over TCP 443 is the fallback when IPsec is blocked or disabled."
   ]
  ],
  "tryit": [
   [
    "Maple Grove Council wants its office staff, who sit on the LAN, to be subject to the same user-based and disk-encryption rules as remote staff, but without sending their traffic through a VPN tunnel. What GlobalProtect component provides this, and how does the app know it is in the office?",
    "An internal gateway. Users connect to it, usually without a tunnel, so the firewall learns their User-ID and HIP data for policy. The app uses internal host detection, a reverse DNS lookup of a known internal IP, to decide it is on the corporate network."
   ],
   [
    "Remote contractors at Silverline Media use a rarely needed reporting system once a week. The company does not want their personal internet traffic going through the corporate firewall the rest of the time. Which connect method and tunnel setting fit best?",
    "On-demand connect method, so the tunnel comes up only when the contractor clicks Connect, combined with split tunneling that includes only the reporting system's routes or domains. Other traffic goes directly to the Internet."
   ]
  ],
  "tip": "Portal configures, gateway enforces. Pre-logon uses machine certificates before user login. IPsec is preferred, SSL is the fallback. HIP objects are criteria; HIP profiles are what security rules reference.",
  "check": [
   [
    "How does the app decide whether it is on the internal network?",
    "Internal host detection: a reverse DNS lookup of a configured internal IP that returns the expected hostname only when inside."
   ],
   [
    "Which object do you place in a security rule to require disk encryption?",
    "A HIP profile that references a HIP object checking disk encryption."
   ],
   [
    "Why would a tunnel use SSL instead of IPsec?",
    "IPsec is blocked or unavailable on the client's network, so the app falls back to SSL over TCP 443."
   ],
   [
    "Which connect method lets remote users run login scripts and reset passwords at the sign-in screen?",
    "Pre-logon, which connects with a machine certificate before the user signs in."
   ]
  ]
 },
 {
  "t": "Administrator accounts: dynamic roles vs admin role profiles, API and CLI permissions",
  "hook": "It is Tuesday morning at Ridgeline Freight, and the security lead, Dana, forwards you an alert: someone committed a change to the Internet-facing firewall at 3:14 a.m. that opened a new inbound rule. The Config log shows the change came from the account `admin`, which six people and two scripts all use. Nobody admits to it. The SIEM integration script runs with that same account, and its API key sits in a shared folder. Dana asks two questions you cannot answer yet: who actually made the change, and why could a log-collection script open inbound rules at all? How should administrator accounts and roles have been built so this question never comes up?",
  "simple": "A firewall is like a building with a master key and many smaller keys. Every person or program that manages it should get their own key, cut to open only the doors they really need. Palo Alto firewalls give you two kinds of keys. The first kind is ready-made, such as \"open everything\" or \"look at everything but touch nothing,\" and the maker updates these automatically when new doors are added. The second kind is custom: you decide, door by door, what each key opens, including the side doors that programs use. Custom keys are more precise, but when new doors appear after an upgrade, you have to update them yourself. A separate key per person also means the logbook shows exactly who opened which door.",
  "body": [
   "Every person or system that manages the firewall should have its own administrator account with the least privilege it needs. Shared accounts make it impossible to tell who changed what, and over-privileged accounts turn one stolen password or leaked API key into a full compromise of your most important security device. Accounts are created under Device > Administrators. Each account has a name, an authentication method (local password or an authentication profile), and an administrative role. The role decides what the account can see and change in the web interface, the command-line interface (CLI), the XML application programming interface (API) and the REST API. Getting roles right is the foundation for everything else in this lesson.",
   "Dynamic roles are built in and cover common needs without any design work. Superuser has full access, including creating other administrators and virtual systems. Superuser (read-only) can see everything but change nothing. Device Administrator has full access to the firewall except defining new administrator accounts and virtual systems. Device Administrator (read-only) is its view-only form. On firewalls with multiple virtual systems (vsys), Virtual System Administrator and Virtual System Administrator (read-only) restrict the admin to the vsys you choose, so a tenant's administrator never sees another tenant's rules. They are called dynamic because Palo Alto Networks updates them automatically when new features arrive in a PAN-OS release. An admin with a dynamic role sees new menus after an upgrade without you editing anything.",
   "Admin role profiles are custom roles you create under Device > Admin Roles. Each profile is either device-scoped or vsys-scoped. On the Web UI tab you set each area of the interface to Enable, Read Only or Disable, drilling down as far as individual nodes. For example, you can grant full access to Monitor and Policies, read-only access to Objects, and no access to Device. The profile also has separate tabs for the XML API, the REST API and the Command Line, so the web interface, the CLI and each API are controlled independently. The trade-off is maintenance. When an upgrade adds new features, custom profiles are not updated, so new areas may be disabled for those admins until you review and adjust the profile. Build a post-upgrade checklist that includes reviewing every admin role profile.",
   "CLI permission in a role profile is a single choice: none, superuser, superreader, deviceadmin or devicereader, with vsys equivalents (vsysadmin and vsysreader) on multi-vsys systems. Setting it to none blocks SSH and console management for that role even when the web interface is allowed, because the two are separate settings. XML API permissions are set per request type: Report, Log, Configuration, Operational Requests, Commit, User-ID Agent, Export and Import. REST API permissions are set per resource, such as specific policy or object types. This granularity is how you build API-only accounts: disable every web interface area, set Command Line to none, and enable only the API types the script needs. A key generated for that account can then do only what the role allows, no matter who holds it.",
   "Authentication for admins can be local or external. Local accounts store the password on the firewall, can be held to minimum password complexity rules, and can use password profiles for expiry. External authentication uses an authentication profile that points to RADIUS (Remote Authentication Dial-In User Service), TACACS+ (Terminal Access Controller Access-Control System Plus), LDAP (Lightweight Directory Access Protocol) or SAML (Security Assertion Markup Language). With RADIUS, TACACS+ and SAML, the server can assign the admin role and access domain using vendor-specific attributes (VSAs), so individual administrator accounts do not need to exist locally on the firewall. That keeps joiner and leaver processes in the identity system, where they belong. Set lockout values (failed attempts and lockout time) in the authentication profile, or under Device > Setup > Management for local accounts, so repeated failures lock the account.",
   "Accountability comes from the logs. The Config log (Monitor > Logs > Configuration) records each configuration change with the administrator name, the client (web, CLI or API), the source IP address, the command and the before and after values. The System log records administrator logins, logouts and authentication failures. These logs only answer the question \"who did this\" if each admin has a unique account, which is the strongest argument against shared logins. When you troubleshoot an admin who cannot see a menu, check the role first: is it a custom profile that was never updated, or a read-only role that hides the commit button?",
   "Consider a worked example. A monitoring script only needs to pull threat logs every five minutes. You create an admin role profile named `api-log-reader` with every web interface area disabled, Command Line set to none, REST API disabled, and only the XML API Log type enabled. You create an administrator `svc-siem` that uses the profile, generate an API key with that account, and store the key in the team's secrets manager. A help desk group, meanwhile, gets a role profile with read-only Monitor access, so they can confirm whether traffic was blocked without touching policy. Engineers authenticate through RADIUS, which returns a VSA naming either a Device Administrator role or a custom profile. If the script's key leaks, it cannot change configuration or open an SSH session.",
   "Watch for the common mistakes. Teams give scripts and service accounts Superuser because it is easy, share one admin account among a group, forget to update custom role profiles after an upgrade so admins cannot see new features, and assume disabling the web interface also disables the CLI. Another frequent error is expecting a Device Administrator to create new admin accounts, which only a Superuser can do.",
   "Exam questions often hinge on a few words. \"Automatically gains access to new features after an upgrade\" points to a dynamic role. \"Granular\", \"read-only access to one tab\", \"API-only\" or \"disable CLI\" point to an admin role profile. \"Restrict an admin to one tenant\" points to a virtual system administrator role. \"Who changed this rule?\" points to the Config log, and \"assign roles from the RADIUS server\" points to vendor-specific attributes. Remember the core trade-off: dynamic roles are simple and self-updating but coarse; admin role profiles are granular but need upkeep."
  ],
  "analogy": "Dynamic roles are like the standard keys a property manager hands out, master, maintenance, or view-only, and the locksmith automatically re-cuts them whenever a new door is installed. Admin role profiles are custom keys you cut door by door, including keys for the loading dock (the APIs) and the service tunnel (the CLI), and nobody re-cuts them when the building adds a wing. The analogy stops at one point: on the firewall, every action with any key is written in a logbook, the Config log, with the key holder's name.",
  "terms": [
   [
    "Dynamic role",
    "A built-in admin role such as Superuser or Device Administrator that Palo Alto Networks updates automatically when new features are added."
   ],
   [
    "Admin role profile",
    "A custom role defining per-area web interface, XML API, REST API and CLI permissions; it must be reviewed and maintained manually after upgrades."
   ],
   [
    "Device Administrator",
    "A dynamic role with full firewall access except creating administrator accounts and virtual systems."
   ],
   [
    "superreader",
    "A CLI role level that allows read-only access to the full CLI."
   ],
   [
    "Vsys administrator",
    "A role restricted to managing specific virtual systems on a multi-vsys firewall."
   ],
   [
    "Vendor-specific attribute (VSA)",
    "A value returned by RADIUS, TACACS+ or SAML that assigns an admin role or access domain without a local account."
   ],
   [
    "API key",
    "A token generated for an administrator account and used by scripts; it carries exactly that account's role permissions."
   ],
   [
    "Config log",
    "The log that records configuration changes, including which administrator made them, from which client and source IP address."
   ]
  ],
  "example": "A monitoring script only needs to pull threat logs. You create an admin role profile with all web interface areas disabled, CLI set to none, REST API disabled and only the XML API Log type enabled, then create an account using that profile and generate an API key for it. The key is stored in a secrets manager, and if it ever leaks, it cannot change configuration or open an SSH session.",
  "mistakes": [
   [
    "Giving a SIEM or automation script Superuser because it is the quickest way to make the API calls work.",
    "A leaked key would then have full control. Create an admin role profile that enables only the XML or REST API types the script uses, with web interface and CLI disabled."
   ],
   [
    "Assuming that disabling all web interface areas also blocks SSH access.",
    "The Command Line setting is separate. Set it to none in the admin role profile to block CLI access."
   ],
   [
    "Expecting custom admin role profiles to pick up new menus after a PAN-OS upgrade.",
    "Only dynamic roles update automatically. Custom profiles must be reviewed and new areas enabled by hand."
   ],
   [
    "Choosing Device Administrator for a lead engineer who must create accounts for new hires.",
    "Device Administrator cannot create administrator accounts or virtual systems. Only Superuser can manage administrators."
   ]
  ],
  "tryit": [
   [
    "Harbor Credit Union's network operations center (NOC) staff need to check the Traffic and Threat logs to answer help desk tickets, but they must not change any policy or log in over SSH. The security team also wants them to see any new monitoring features right after upgrades without extra work. Which approach fits best, a dynamic role or an admin role profile?",
    "An admin role profile with read-only Monitor access and Command Line set to none is the best fit, because no dynamic role grants monitoring only while blocking the CLI. Superuser (read-only) and Device Administrator (read-only) would expose every area, including configuration. The cost is that the team must review the profile after upgrades, since custom profiles do not update themselves."
   ]
  ],
  "tip": "Dynamic roles update automatically, custom admin role profiles do not. If a question mentions granular control, API-only access, or disabling the CLI, the answer is an admin role profile. Only Superuser can create administrators.",
  "check": [
   [
    "Why might an admin with a custom role not see a new feature after an upgrade?",
    "Custom admin role profiles are not updated automatically; the new area must be enabled in the profile."
   ],
   [
    "How do you stop a role from using SSH while allowing the web interface?",
    "Set the admin role profile's Command Line option to none."
   ],
   [
    "Which dynamic role cannot create or manage other administrator accounts?",
    "Device Administrator; only Superuser can manage administrators."
   ],
   [
    "How can a RADIUS server decide which role an admin receives?",
    "By returning vendor-specific attributes that name the admin role and access domain."
   ],
   [
    "Where do you find which administrator committed a specific rule change?",
    "In the Config log, which records the admin name, client, source IP address and the change."
   ]
  ]
 },
 {
  "t": "Server profiles (LDAP, RADIUS, TACACS+, SAML, Kerberos), authentication profiles and sequences, MFA",
  "hook": "It is 11:40 p.m. at Bluewater Health, and Marcus on the network team gets a call: a storm took down the data center link, the RADIUS servers are unreachable, and the firewall at the clinic site needs an emergency change. Every admin login fails with a timeout. The only local account was deleted last year during a cleanup. Meanwhile, the morning's audit report noted that LDAP bind credentials were crossing the network in cleartext. Two problems, one root cause: nobody had thought through how the firewall reaches its identity servers and what it should do when they disappear. How do server profiles, authentication profiles and sequences fit together so logins are both secure and resilient?",
  "simple": "When you log in to a firewall, it often does not check your password itself. It asks another system, like a receptionist calling the main office to confirm a visitor. Palo Alto splits this into layers. A server profile is the phone book entry: which office to call and how to reach it. An authentication profile is the rule card: which office to call for this kind of login, which people are allowed, how many wrong tries before lockout, and whether a second proof, such as a code on your phone, is required. An authentication sequence is the backup plan: if the first office does not answer, try the next one. Second proofs are called multi-factor authentication, and they stop a stolen password from being enough on its own.",
  "body": [
   "PAN-OS separates \"where is the identity server\" from \"how do we authenticate this login\". A server profile tells the firewall how to reach an external service. An authentication profile says which server profile, or the local database, to use for a given login, and adds rules such as multi-factor authentication (MFA), an allow list, and lockout. Features such as administrator login, GlobalProtect, Authentication Portal and the web proxy then reference the authentication profile rather than the server directly. Keeping these layers straight makes configuration reusable, because one server profile can serve several authentication profiles, and it makes exam questions much easier to decode.",
   "Server profiles live under Device > Server Profiles, one type per protocol. LDAP (Lightweight Directory Access Protocol) profiles list servers and ports, the directory type (active-directory, e-directory, sun or other), the base DN (distinguished name) where searches start, the bind DN and password the firewall uses to log in to the directory, and whether to require SSL/TLS (LDAPS or StartTLS). LDAP profiles are used both for authentication and for User-ID group mapping. RADIUS (Remote Authentication Dial-In User Service) profiles hold servers, a shared secret, timeout and retries, and an authentication protocol such as PEAP-MSCHAPv2, PEAP with GTC, EAP-TTLS with PAP, CHAP or PAP. RADIUS supports challenge-response, which many MFA products use, and can return vendor-specific attributes (VSAs) that assign admin roles. TACACS+ (Terminal Access Controller Access-Control System Plus) profiles hold servers and a shared secret like RADIUS, but the protocol encrypts the whole payload and runs over TCP, and it is popular for device administration.",
   "SAML (Security Assertion Markup Language) profiles are built by importing the identity provider (IdP) metadata file, which supplies the IdP's entity ID, single sign-on (SSO) URL and signing certificate. This enables SSO through cloud IdPs such as Microsoft Entra ID or Okta, where the IdP authenticates the user, often with its own MFA, and sends the firewall a signed assertion. Kerberos profiles point to a Key Distribution Center (KDC), usually a domain controller, for Kerberos authentication. Kerberos single sign-on for browsers additionally needs a keytab, exported from the directory for the firewall's service account, imported into the authentication profile, so domain-joined browsers can authenticate without typing a password.",
   "An authentication profile (Device > Authentication Profile) ties it together. You set the type (None, Local Database, LDAP, RADIUS, TACACS+, SAML, Kerberos or Cloud Authentication Service), choose the server profile, and set a user domain and username modifier such as `%USERDOMAIN%\\%USERINPUT%` or `%USERINPUT%@%USERDOMAIN%` so the username matches what the server expects. The Advanced tab holds the allow list of users or groups permitted to authenticate (use `all` deliberately, never by accident) and lockout settings for failed attempts and lockout time. The Factors tab enables MFA by adding MFA server profiles for supported MFA vendors; after the first factor succeeds, the firewall prompts for the additional factors, such as a push notification or a one-time code.",
   "An authentication sequence (Device > Authentication Sequence) is an ordered list of authentication profiles. The firewall tries each in turn until one succeeds. A common use is trying RADIUS or LDAP for employees, then the local database as a break-glass fallback if the directory is unreachable, or trying two different domains in a merged organization. You reference a sequence anywhere an authentication profile is accepted. There is also an option to use the domain the user types to pick the matching profile first, which speeds up logins in multi-domain setups. MFA can happen in several places: an IdP handling MFA through SAML, a RADIUS server that performs MFA itself, the firewall driving MFA through MFA server profiles on the Factors tab, or Authentication policy requiring MFA before users reach sensitive resources, even for non-web applications.",
   "The protocol comparison is a favorite exam topic. TACACS+ encrypts the whole body, uses TCP, and separates authentication, authorization and accounting, which suits device administration. RADIUS uses UDP, encrypts only the password field, and is common for network access and MFA push or token flows. SAML is browser-based federation in which the IdP, not the firewall, verifies the credentials. LDAP is a directory protocol that can authenticate users and also supplies groups. Kerberos provides ticket-based single sign-on for domain-joined machines.",
   "Consider a worked example. Remote admins log in with RADIUS backed by an MFA service, but if the RADIUS servers are unreachable nobody can manage the firewall. You create an authentication sequence named `Admin-Seq` that tries the RADIUS profile first and a Local Database profile second, and keep one strong local emergency account whose password lives in a vault and is rotated after each use. You test from the CLI with `test authentication authentication-profile Admin-RADIUS username jlee password`, which prompts for the password and shows each step, and you review results in the System and Authentication logs. You also edit the LDAP server profile used for group mapping to require SSL/TLS, which closes the audit finding.",
   "Watch for the common mistakes. People build a server profile but never reference it from an authentication profile, forget the allow list so every directory user can log in (or leave it empty so nobody can), use LDAP without TLS so bind credentials cross the network in cleartext, and mismatch username formats between what users type and what the server expects. Another classic outage is an expired IdP signing certificate in a SAML profile, which breaks every SAML login at once.",
   "Exam questions tend to use these clues. \"Where is the server and how do I reach it?\" is a server profile. \"Which method, which users, how many failed attempts?\" is an authentication profile. \"Try one, then another\" is an authentication sequence. \"Import IdP metadata\" is SAML. \"Encrypts the entire payload over TCP\" is TACACS+, and \"used for both authentication and group mapping\" is LDAP."
  ],
  "analogy": "Think of a hotel front desk. The server profile is the contact card for each outside office: phone number, extension, password to speak with them. The authentication profile is the desk's procedure sheet: for guests, call the booking office, accept only names on this list, ask for a second ID for the penthouse, and stop after five wrong answers. The authentication sequence is the escalation list: if the booking office does not pick up, call the night manager. The analogy weakens with SAML, where the guest is sent to the outside office in person and returns with a signed note.",
  "mnemonic": "Where, How, Order: the server profile says WHERE the server is, the authentication profile says HOW and WHO, and the sequence sets the ORDER to try them.",
  "terms": [
   [
    "Server profile",
    "Connection settings for an external service such as an LDAP server, RADIUS server, TACACS+ server, SAML IdP or Kerberos KDC."
   ],
   [
    "Authentication profile",
    "A profile that selects the authentication method and server, username format, allow list, lockout and MFA factors."
   ],
   [
    "Authentication sequence",
    "An ordered list of authentication profiles tried one after another until one succeeds."
   ],
   [
    "TACACS+",
    "A device administration AAA protocol that runs over TCP and encrypts the entire payload."
   ],
   [
    "SAML IdP metadata",
    "The identity provider's details, including entity ID, signing certificate and SSO URL, imported to build a SAML server profile."
   ],
   [
    "Keytab",
    "A file containing a service account's Kerberos keys, imported so the firewall can accept Kerberos SSO."
   ],
   [
    "Allow list",
    "The users or groups in an authentication profile that are permitted to authenticate with it."
   ],
   [
    "Multi-factor authentication (MFA)",
    "Requiring more than one type of proof, such as a password plus a push approval or token code."
   ]
  ],
  "example": "Remote admins log in with RADIUS backed by an MFA service, but if the RADIUS servers are unreachable nobody can manage the firewall. You create an authentication sequence that tries the RADIUS profile first and the local database second, and keep one strong local emergency account stored securely in a vault. The test authentication command confirms both paths work before you rely on them.",
  "mistakes": [
   [
    "Thinking that creating an LDAP or RADIUS server profile is enough for logins to start using it.",
    "A server profile only describes how to reach the server. An authentication profile must reference it, and the feature (admin login, GlobalProtect, portal) must reference that authentication profile or a sequence."
   ],
   [
    "Choosing RADIUS when a question asks for a protocol that encrypts the entire payload over TCP.",
    "RADIUS uses UDP and encrypts only the password. TACACS+ uses TCP and encrypts the whole body."
   ],
   [
    "Leaving the allow list empty and expecting everyone in the directory to be allowed.",
    "An empty allow list lets nobody authenticate. Add specific groups, or `all` deliberately if that is truly intended."
   ],
   [
    "Using a plain LDAP server profile without SSL/TLS on an internal network because it is trusted.",
    "The bind DN password and user credentials cross the network in cleartext. Require SSL/TLS on the LDAP server profile."
   ]
  ],
  "tryit": [
   [
    "Granite Valley Schools is moving staff to a cloud IdP that already enforces MFA. GlobalProtect users should sign in through that IdP in a browser, while firewall admins should keep using TACACS+ with a local fallback if the TACACS+ servers fail. Which server profiles, authentication profiles and sequences do you build?",
    "Build a SAML server profile by importing the IdP metadata and reference it in a SAML authentication profile used by the GlobalProtect portal and gateways; MFA happens at the IdP. For admins, build a TACACS+ server profile, a TACACS+ authentication profile, a Local Database authentication profile, and an authentication sequence that tries TACACS+ first and the local database second, then assign that sequence to administrator logins."
   ]
  ],
  "tip": "Server profile = where; authentication profile = how and who; sequence = try several in order. SAML is configured by importing IdP metadata. TACACS+ is TCP with full-payload encryption; RADIUS is UDP and encrypts only the password.",
  "check": [
   [
    "Which server profile type encrypts the entire packet body and uses TCP?",
    "TACACS+."
   ],
   [
    "What does an authentication sequence do if the first profile's server is unreachable?",
    "It moves on to the next authentication profile in the list."
   ],
   [
    "Which server profile is used for both authentication and group mapping?",
    "LDAP."
   ],
   [
    "How do you build a SAML server profile quickly and correctly?",
    "Import the identity provider's metadata, which supplies its SSO URL and signing certificate."
   ],
   [
    "Where in an authentication profile do you enable firewall-driven MFA?",
    "On the Factors tab, by adding MFA server profiles."
   ]
  ]
 },
 {
  "t": "Authentication policy and Authentication Portal",
  "hook": "It is the first day of the conference season at Cedar Point Convention Center, and Leo at the IT desk is fielding complaints. Visiting vendors on the guest Wi-Fi show up in the firewall logs only as IP addresses, so the group-based rules do nothing for them. Worse, the facilities team wants anyone who connects to the building-control server over SSH to prove their identity with a second factor first, and that server speaks no web protocol at all. User-ID is working fine for domain laptops, but these users never touch a domain controller. How can the firewall ask people who they are, and how can it put MFA in front of an application that cannot show a login page?",
  "simple": "Usually the firewall figures out who is using a computer quietly, by reading login records from other systems. Sometimes it cannot, for example when a visitor brings their own laptop. Authentication policy is a list of rules that says, for certain traffic, \"stop and ask this person to log in first.\" The Authentication Portal is the login page the firewall shows in the web browser. Once the person logs in, the firewall remembers \"this computer belongs to Ana\" for a while. This also works for things that are not websites: the person logs in once in a browser, and then the firewall lets their other traffic through until the timer runs out. Logging in tells the firewall who you are; separate security rules still decide what you may reach.",
  "body": [
   "User-ID usually learns who is behind an IP address silently, from domain controllers, GlobalProtect, syslog or the XML API. Sometimes that is not enough. A contractor's laptop is not on the domain, a guest network has no directory at all, or a sensitive server should demand fresh proof of identity, possibly with multi-factor authentication (MFA). Authentication policy and the Authentication Portal, formerly called Captive Portal, cover these cases by actively asking the user to prove who they are. The result is a new IP-to-user mapping that the rest of the firewall, including security policy and logging, can use.",
   "Authentication policy (Policies > Authentication) is a rulebase that decides which traffic must authenticate. Each rule matches source zone, source address, source user, destination zone and address, service and URL category. For source user you commonly choose `unknown` to catch unmapped users, or `known-user` when you want already-identified users to step up with MFA before reaching something sensitive. The rule's action is an authentication enforcement object, which picks the method and authentication profile, plus a timeout that decides how long the user stays authenticated for that rule before being challenged again. Rules are evaluated top-down like other rulebases, and traffic that matches no authentication rule is not challenged at all, so rule order and scope decide exactly who sees a login prompt.",
   "There are three enforcement methods. Browser-challenge uses Kerberos single sign-on through SPNEGO (Simple and Protected GSS-API Negotiation), so domain-joined browsers authenticate transparently without a prompt; it needs a Kerberos keytab in the authentication profile. Web-form shows a login page where the user types credentials; if browser-challenge fails, the firewall falls back to the web form. No-captive-portal lets matching traffic through without authenticating, which is useful as an exception rule placed above broader rules, for example for printers or update servers. Predefined objects include `default-browser-challenge`, `default-web-form` and `default-no-captive-portal`. You can create your own under Objects > Authentication to attach a specific authentication profile, such as one with MFA factors, and a custom message for the login page.",
   "The Authentication Portal itself is configured under Device > User Identification > Authentication Portal Settings, where you also set the idle timer, the default timer for mappings it creates, and the SSL/TLS service profile for the portal page. Its two modes are an exam favorite. In transparent mode, the firewall intercepts the browser traffic, impersonates the original destination website and answers with the authentication challenge. It works on any interface type, including virtual wire and Layer 2, but users see certificate warnings unless decryption with a trusted certificate is in place. In redirect mode, the firewall sends the browser to a Layer 3 interface on the firewall (the redirect host) with an HTTP 302 response. Because the browser then talks to a real host name, the firewall can set session cookies so users are not re-prompted on every new site, and redirect mode is required for Kerberos SSO and for designs that span multiple sites. Redirect mode needs an interface management profile with Response Pages enabled on the redirect interface, and a DNS name for the redirect host that resolves to that interface.",
   "Only web traffic can trigger the portal, because the firewall needs a browser to show the page. For HTTPS sites, the firewall must decrypt the session to inject the challenge, so pair authentication rules with a decryption policy and make sure endpoints trust the decryption certificate. For non-web applications such as SSH or RDP to a server, the user first authenticates in a browser, which creates an IP-to-user mapping with a timestamp; the authentication rule then permits the non-web traffic until the timeout expires. This is how you add MFA in front of legacy protocols that have no MFA support of their own. Keep the division of labor clear: authentication policy identifies users, while security policy still decides allow or deny, usually with rules that reference the users or groups the portal identified.",
   "Consider a worked example. Guest Wi-Fi users are not on the domain, so their IPs map to `unknown`. You create an authentication rule for source zone Guest, source user `unknown`, services `service-http` and `service-https`, using a custom web-form enforcement object tied to a local guest database authentication profile, with a timeout of a few hours. You enable redirect mode with a redirect host name that resolves to a loopback interface in the Guest zone, and that interface has a management profile with Response Pages allowed. A decryption rule lets HTTPS requests be challenged. After logging in, a guest's IP maps to their guest account, and security rules allow those users only web browsing. For the building-control server, a second authentication rule matches `known-user` to that server's address with an MFA-enabled profile, so staff complete MFA in a browser before their SSH session is allowed. Results appear in the Authentication log, and `show user ip-user-mapping all` lists the new mappings with the portal as their source.",
   "Watch for the common mistakes. People expect SSH or RDP to pop up a login page, forget decryption so HTTPS sites never show the portal, try to use redirect mode on a virtual wire deployment, leave Response Pages off the redirect interface, and assume authentication grants access by itself. Another is picking the wrong timeout: too short annoys users with repeated prompts, while too long weakens step-up MFA because one login covers a whole day.",
   "Exam questions use these clues. \"Transparent SSO for domain browsers\" is browser-challenge with Kerberos. \"Login page\" is web-form. \"Exempt this traffic\" is no-captive-portal. \"Virtual wire or Layer 2\" points to transparent mode; \"session cookies\", \"Kerberos\" or \"Layer 3 redirect host\" point to redirect mode. \"MFA before reaching an SSH server\" points to an authentication rule with an MFA-enabled profile, with the user logging in through a browser first."
  ],
  "analogy": "Authentication policy is like a security guard at a museum's special exhibit. Most visitors were already identified when they bought tickets online (User-ID), so they walk straight in. Anyone without a name on file, or anyone heading into the vault room, must show ID at the guard's desk first. The guard then stamps their hand, and the stamp lasts a few hours (the timeout). The analogy has one limit: the guard can only check ID at the front desk, which is the web browser. Visitors who arrive through a side corridor, such as SSH, must stop at the desk first.",
  "terms": [
   [
    "Authentication policy",
    "A rulebase that decides which traffic must authenticate, how, and for how long, before security policy uses the identified user."
   ],
   [
    "Authentication enforcement object",
    "The rule action choosing browser-challenge, web-form or no-captive-portal and an authentication profile."
   ],
   [
    "Browser-challenge",
    "An enforcement method using Kerberos SPNEGO so domain browsers authenticate without a prompt."
   ],
   [
    "Web-form",
    "An enforcement method that shows a login page for the user to enter credentials."
   ],
   [
    "Redirect mode",
    "Authentication Portal mode that redirects users to a firewall Layer 3 interface, supporting session cookies and Kerberos SSO."
   ],
   [
    "Transparent mode",
    "Authentication Portal mode where the firewall impersonates the destination site to present the challenge; works on virtual wire and Layer 2."
   ],
   [
    "Authentication timeout",
    "How long a user stays authenticated for an authentication rule before being challenged again."
   ]
  ],
  "example": "Guest Wi-Fi users are not on the domain, so their IPs map to unknown. An authentication rule for source user unknown from the Guest zone uses a web-form enforcement object tied to a local guest database, with redirect mode on a Layer 3 interface that allows Response Pages. After logging in, a guest's IP maps to their account, and security rules allow them only web browsing.",
  "mistakes": [
   [
    "Expecting an SSH or RDP connection to trigger the Authentication Portal login page.",
    "The portal needs a browser to display the challenge. The user authenticates in a browser first, and the authentication rule then allows the non-web traffic until the timeout expires."
   ],
   [
    "Choosing redirect mode for a firewall deployed in virtual wire.",
    "Redirect mode requires a Layer 3 interface as the redirect host. Transparent mode works with virtual wire and Layer 2."
   ],
   [
    "Believing that once a user authenticates, the firewall automatically allows their traffic.",
    "Authentication policy only identifies the user. Security policy rules still decide whether that user's traffic is allowed."
   ],
   [
    "Wondering why HTTPS sites never show the portal and assuming the rule is broken.",
    "The firewall must decrypt HTTPS to inject the challenge. Add a decryption rule for the traffic that should be challenged."
   ]
  ],
  "tryit": [
   [
    "Pinecrest Manufacturing deploys its firewall in virtual wire mode between the core switch and the router. Contractors on unmanaged laptops must log in before using the Internet, and the team does not mind certificate warnings during a short pilot. Which Authentication Portal mode and enforcement method should they use?",
    "Transparent mode with a web-form enforcement object. Redirect mode needs a Layer 3 interface as the redirect host, which a virtual wire deployment does not provide. Browser-challenge would not help because contractor laptops are not domain-joined and cannot do Kerberos SSO. To remove the certificate warnings after the pilot, they would add decryption with a certificate the laptops trust."
   ],
   [
    "At Northgate Bank, staff already identified by User-ID must complete MFA before opening SSH sessions to the core banking jump server. How do you configure this?",
    "Create an authentication rule matching source user `known-user`, the jump server as destination, and the SSH service, with an enforcement object that uses an authentication profile with MFA factors. Staff first browse to any web page to complete the MFA challenge, and the rule then allows their SSH traffic until its timeout ends. A security rule must still allow SSH to that server for the right group."
   ]
  ],
  "tip": "Redirect mode needs a Layer 3 interface with Response Pages in its management profile; transparent mode suits virtual wire and Layer 2. HTTPS triggers require decryption. Authentication policy identifies; security policy still decides allow or deny.",
  "check": [
   [
    "Which enforcement method gives transparent SSO for domain browsers?",
    "Browser-challenge, using Kerberos."
   ],
   [
    "Why can't an SSH session trigger the portal directly?",
    "The portal needs a web browser to display the challenge; users authenticate via a browser first and SSH is then allowed until the timeout."
   ],
   [
    "What must the redirect host interface have for redirect mode?",
    "An interface management profile with Response Pages enabled on a Layer 3 interface."
   ],
   [
    "Why do HTTPS sites need decryption for Authentication Portal to work?",
    "The firewall must decrypt the session to inject the authentication challenge into the browser's traffic."
   ],
   [
    "Which source user value targets devices the firewall has not yet mapped to a user?",
    "unknown."
   ]
  ]
 },
 {
  "t": "Virtual systems: vsys creation, interfaces/zones/routers per vsys, shared gateway, inter-vsys traffic via external zones",
  "hook": "It is a Thursday afternoon at Lakeshore Community College, and Priya, the firewall engineer, has a ticket from the registrar: the enrollment application cannot reach the student-housing portal. Both systems sit behind the same physical firewall, but administration runs in vsys1 and housing in vsys2, each with its own admins and rules. The housing admin swears the portal is open. The Traffic log in vsys1 shows the session leaving toward an external zone, then nothing. Priya realizes she is looking at two firewalls that happen to share one chassis. What does a session need to cross from one virtual system to another, and where does each side's security check happen?",
  "simple": "A virtual system is a way to split one physical firewall into several separate, smaller firewalls. Picture an apartment building: every apartment has its own front door, its own rooms and its own keys, even though they all share the same walls and plumbing. Each virtual system has its own network ports, zones, rules and administrators, so one department or customer cannot see or change another's settings. If two apartments want to pass something to each other, both residents must agree: one lets it out, the other lets it in. Sometimes the building also has a shared lobby door to the street, so every apartment can reach outside without each needing its own street entrance. That shared door is called a shared gateway.",
  "body": [
   "Virtual systems (vsys) split one physical firewall into several logical firewalls, each with its own interfaces, zones, policies, objects and administrators. Service providers use them to host tenants, and enterprises use them to separate business units that need independent policy and separate administration on shared hardware. The key mental model is that each vsys behaves like an independent firewall. Every firewall runs vsys1 even when you never see it, so everything you configure on a single-vsys firewall already lives in vsys1. That is why some CLI output and API paths mention `vsys1` on firewalls where nobody ever enabled multiple virtual systems.",
   "To create more, you first enable Multi Virtual System Capability under Device > Setup > Management > General Settings; enabling it requires a commit. How many vsys you can run depends on the platform. Many platforms need a virtual systems license for additional vsys beyond the base number included with the hardware, and smaller models may not support multiple virtual systems at all, so check the platform's capacity before you design. After the capability is on, Device > Virtual Systems lets you add vsys2, vsys3 and so on. For each vsys you can set resource limits such as maximum sessions, security rules, NAT rules and VPN tunnels, and you choose which interfaces, VLANs, virtual wires and virtual routers the vsys can use. You can also list visible virtual systems, which controls which other vsys this one may send traffic to.",
   "Ownership rules are strict for some objects and flexible for others. Each interface belongs to exactly one vsys, and each zone belongs to one vsys. Virtual routers are more flexible: a vsys can have its own router for full routing separation, or several vsys can share one router. Objects and policies can be defined per vsys or in the Shared location, which makes them available to every vsys; common address objects or security profiles are good candidates for Shared. Administrators can be restricted to a vsys using the virtual system administrator roles, so a tenant's admin never sees another tenant's policy or logs. In the web interface, a virtual system selector appears at the top of the Policies, Objects and Network tabs, and in the CLI `set system setting target-vsys vsys2` scopes your following commands to that vsys. Forgetting to switch context is one of the most common reasons an admin cannot find a rule.",
   "A shared gateway is a special kind of virtual system that several vsys use to reach a common network, usually the Internet, through the same interfaces. Instead of giving every tenant its own public interface and IP address, the shared gateway owns the outside interface, and tenant vsys connect to it. Shared gateways have their own zones, interfaces, routing, NAT and policy-based forwarding (PBF), but no security policy of their own. Security for traffic that uses a shared gateway is enforced in each tenant vsys. Because the shared gateway has no security rulebase, you do not write a matching pair of rules on both sides as you do between two ordinary vsys; the tenant vsys's rules are the enforcement point, and the shared gateway's zones are what the tenant's rules point toward.",
   "Traffic between two ordinary vsys uses external zones. In vsys1 you create a zone of type External that points to vsys2, and in vsys2 an external zone that points to vsys1; both vsys must list each other as visible virtual systems. A session from vsys1's Trust zone to vsys2's DMZ is evaluated twice. vsys1 needs a security rule from Trust to its external zone, and vsys2 needs a rule from its external zone to DMZ. Routing must also deliver the traffic to the other vsys, either through a shared virtual router or through a route whose next hop is the other vsys's virtual router. Because each vsys inspects the session, the session appears in both vsys Traffic logs, and either side can block it. Think of the two vsys as separate firewalls wired together by an internal cable: each side needs its own zone, route and rule.",
   "Consider a worked example. Lakeshore Community College runs vsys1 for administration and vsys2 for student housing. Both reach the Internet through a shared gateway that owns ethernet1/1 and performs source NAT. When the registrar's application in vsys1 must reach the housing portal in vsys2, Priya confirms each vsys lists the other as visible, creates an external zone in each vsys, and adds a route in vsys1's virtual router pointing the housing subnet at vsys2's router. The housing admin had allowed the portal only from the housing zones, so Priya asks them to add a rule from vsys2's external zone to the portal. The session now appears in both vsys Traffic logs, and each tenant's admin can see only their own side.",
   "Watch for the common mistakes. Admins write a rule on only one side of an inter-vsys flow, forget the route between the virtual routers, try to put one interface in two vsys, expect to write security rules inside the shared gateway, and troubleshoot in the wrong vsys context. Another is assuming the platform supports many vsys without checking its capacity and licensing, or forgetting that resource limits set on a vsys can cap its sessions or rules long before the hardware is busy, which looks like a mysterious failure to the tenant.",
   "Exam questions use these clues. \"Separate firewalls for tenants on one appliance\" is multiple vsys. \"Tenants share one Internet interface\" is a shared gateway. \"Traffic between two vsys\" is external zones with rules in each vsys. \"Where is security enforced for shared gateway traffic?\" is the tenant vsys. \"Must enable before creating vsys2\" is Multi Virtual System Capability, and \"restrict an admin to one tenant\" is a virtual system administrator role."
  ],
  "analogy": "Virtual systems are like apartments in one building. Each has its own door, rooms and keys (interfaces, zones, policies, admins). To pass a package between apartments, one resident hands it out through their door and the other must open their own door to accept it: two rules, two external zones. The shared gateway is the building's lobby door to the street, with a doorman who directs traffic and rewrites return addresses (routing and NAT) but checks no IDs; each apartment does its own checking. The analogy stops at routers: apartments can share a hallway (a virtual router), while doors never are shared.",
  "terms": [
   [
    "Virtual system (vsys)",
    "A logical firewall inside one physical firewall with its own interfaces, zones, policies, objects and admins."
   ],
   [
    "Shared gateway",
    "A virtual system that lets multiple vsys share external interfaces; it supports routing, NAT and PBF but has no security policy."
   ],
   [
    "External zone",
    "A zone type pointing at another vsys, used to pass traffic between virtual systems."
   ],
   [
    "Visible virtual system",
    "A setting listing which other vsys a vsys may communicate with; required for inter-vsys traffic."
   ],
   [
    "Multi Virtual System Capability",
    "The device setting that enables creating additional vsys, subject to platform support and licensing."
   ],
   [
    "Shared location",
    "The configuration scope whose objects and policies are available to every vsys."
   ],
   [
    "Target vsys",
    "The CLI setting that scopes commands to a particular virtual system."
   ]
  ],
  "example": "A college runs vsys1 for administration and vsys2 for student housing. Both reach the Internet through a shared gateway that owns ethernet1/1 and performs source NAT. When the registrar's app in vsys1 must reach a portal in vsys2, admins create external zones in both vsys, a route between their routers, and matching rules on both sides, and the session appears in both vsys logs.",
  "mistakes": [
   [
    "Writing one security rule in the source vsys and expecting inter-vsys traffic to flow.",
    "Each vsys is a separate firewall. The source vsys needs a rule to its external zone, and the destination vsys needs a rule from its external zone."
   ],
   [
    "Trying to add security rules inside the shared gateway to control tenant Internet access.",
    "Shared gateways have no security policy. Enforce security in each tenant vsys; the shared gateway handles routing, NAT and PBF."
   ],
   [
    "Assigning one physical interface to two virtual systems so both can use it.",
    "An interface and a zone each belong to exactly one vsys. Use a shared gateway or subinterfaces assigned to different vsys instead."
   ],
   [
    "Assuming virtual routers must also be one per vsys.",
    "Routers are flexible. A vsys can have its own virtual router, or several vsys can share one."
   ]
  ],
  "tryit": [
   [
    "Summit Hosting runs three customer vsys on one firewall. Each customer needs Internet access, but the provider has only one public interface and a small block of public addresses. The provider's security team insists that each customer's rules remain visible only to that customer's admins. How should they design Internet access?",
    "Use a shared gateway that owns the public interface and performs source NAT for all three tenants. Security rules stay in each customer vsys, which is the only place they can live because the shared gateway has no security policy. Each customer's admins get a virtual system administrator role limited to their vsys, so they see only their own rules."
   ]
  ],
  "tip": "Inter-vsys traffic needs an external zone and a security rule in each vsys, plus a route between them. Shared gateways do routing and NAT but no security policy. An interface and a zone always belong to exactly one vsys.",
  "check": [
   [
    "How many security rules does traffic from vsys1 to vsys2 need?",
    "Two: one in vsys1 to its external zone and one in vsys2 from its external zone."
   ],
   [
    "Where is security policy enforced for traffic using a shared gateway?",
    "In the tenant vsys, because shared gateways have no security policy."
   ],
   [
    "What must you enable before creating vsys2?",
    "Multi Virtual System Capability in the device management settings, on a supported and licensed platform."
   ],
   [
    "Can two virtual systems share one virtual router?",
    "Yes; interfaces and zones belong to one vsys, but routers can be shared or kept separate."
   ],
   [
    "Why might an admin not find a rule they know exists on a multi-vsys firewall?",
    "They are viewing or targeting the wrong vsys; switch the virtual system selector or set the target vsys in the CLI."
   ]
  ]
 },
 {
  "t": "Logging: log types, log forwarding profiles, syslog/SNMP/email/HTTP server profiles, Device > Log Settings, Strata Logging Service",
  "hook": "It is 2:05 a.m. at Westbrook Insurance, and Tomas in the security operations center (SOC) is chasing a lead. The endpoint team reports a laptop beaconing to a suspicious domain, and Tomas searches the SIEM for the firewall's threat logs. There are none from that firewall, for days. In the firewall itself, the Threat log is full of spyware detections. Then a second surprise: a rule was changed yesterday, and the SIEM has no configuration events either. Somewhere between the firewall writing a log and the SOC seeing it, the path is broken. Which logs leave the firewall, which settings send them, and why might two different log types need two different places to configure forwarding?",
  "simple": "A firewall keeps diaries. One diary lists every conversation it allowed or blocked. Another lists attacks it spotted. Others record who logged in, what settings changed, and the health of the device itself. These diaries stay on the firewall unless you tell it to send copies elsewhere, such as to a security team's central search tool. To send copies, you first create an address card for each destination, saying where it is and how to talk to it. Then you decide which diary entries go where. Entries created because traffic matched a rule are sent by a profile attached to that rule. Entries about the device itself, like settings changes, are sent from a separate system-wide settings page.",
  "body": [
   "Logs are how you prove what the firewall did and how you feed a security operations center (SOC). PAN-OS writes many log types, all visible under Monitor > Logs. The ones you will use most are Traffic (a record of each session, written by default at session end), Threat (vulnerability, spyware, virus, flood and scan detections), URL Filtering, WildFire Submissions, Data Filtering, HIP Match, GlobalProtect, User-ID, IP-Tag, Decryption, Tunnel Inspection, Authentication, Configuration, System and Alarms. The Unified log view combines several of these types for one search, and filters such as `( addr.src in 10.1.1.5 ) and ( action eq deny )` narrow results quickly. Clicking the magnifying glass on an entry opens the detailed log view, which shows related logs for the same session, so you can move from a Traffic entry to the Threat and URL entries it produced.",
   "Traffic logging is controlled per security rule. On a rule's Actions tab, Log at Session End is on by default and Log at Session Start is off. Enable start logging only when troubleshooting, for example to see long-lived sessions that have not ended yet, because it adds an extra log entry for every session that rule matches. Denied traffic is logged only if the deny rule has logging enabled, and the predefined interzone-default rule does not log by default, which is why administrators override it to turn on logging. Threat, URL, WildFire and Data Filtering logs come from the security profiles attached to the rule, so a rule without profiles produces no threat logs even if an attack passes straight through it. In other words, missing logs can be a policy problem, not a forwarding problem.",
   "To send logs elsewhere, you first define server profiles under Device > Server Profiles. A syslog profile lists servers, transport (UDP, TCP or SSL), port, format (BSD or IETF) and facility, and on its Custom Log Format tab lets you rewrite the message per log type, which matters when a SIEM (security information and event management) parser expects certain fields. An SNMP (Simple Network Management Protocol) trap profile sends traps to network monitoring systems, using SNMPv2c communities or SNMPv3 users. An email profile sends messages through an SMTP gateway to named recipients, which suits low-volume, high-importance alerts. An HTTP profile sends logs to web services with a custom URI, headers and payload per log type, which is how you integrate with ticketing, chat and automation tools that accept webhooks.",
   "A log forwarding profile (Objects > Log Forwarding) decides where policy-driven logs go. Each match list entry picks a log type (traffic, threat, URL, WildFire, data, tunnel, authentication or decryption), an optional filter such as `(severity geq high)`, and destinations: Panorama or cloud logging, syslog, SNMP, email or HTTP. Entries can also run built-in actions, such as tagging a source address so a dynamic address group can quarantine it. You attach the profile to security rules on the Actions tab. A log forwarding profile named `default` is automatically applied to new security rules, which saves you from forgetting it. Logs that are not produced by policy matches (System, Configuration, User-ID, HIP Match, GlobalProtect, IP-Tag, Correlation and similar) are forwarded from Device > Log Settings instead, with the same kind of filters and destinations. This split is the single most tested idea in logging questions.",
   "Strata Logging Service, formerly Cortex Data Lake, is Palo Alto Networks' cloud log storage. Firewalls forward logs to it directly or through Panorama, which gives centralized retention and lets cloud applications such as Strata Cloud Manager and Cortex products analyze the data. It requires a license and the firewall's device certificate for authentication. Panorama with Log Collectors is the on-premises alternative for central logging. On the firewall, `show logging-status` shows whether logs are reaching Panorama or the cloud service and the last sequence number forwarded. If forwarding fails, the firewall buffers logs locally for a time and sends them when the connection returns, so check connectivity, service routes and certificates before the local storage fills and older logs are overwritten.",
   "Consider a worked example. Tomas's SOC wants every critical and high threat in its SIEM within seconds, denied traffic for investigations, and all configuration changes. You create a syslog server profile over SSL (or at least TCP) with IETF format. You create a log forwarding profile with a threat entry filtered on `(severity geq high)` and a traffic entry filtered on `(action neq allow)`, both sending to the syslog profile, and attach it to the Internet-facing rules, including an overridden interzone-default with logging enabled. In Device > Log Settings you forward Configuration and System logs to the same syslog profile. You also add an HTTP server profile that opens a ticket for critical threats. The SIEM team confirms events arrive and parse correctly, and the missing threat logs turned out to come from rules with no log forwarding profile attached.",
   "Watch for the common mistakes. People expect denied traffic in the Traffic log without logging on the deny rule, try to forward System or Configuration logs with a log forwarding profile, send logs over UDP where loss is unacceptable, forget to attach the log forwarding profile to the rules that matter, and turn on Log at Session Start everywhere until storage floods. Another is forgetting that no security profile means no threat logs, so a quiet Threat log can be a warning sign rather than good news.",
   "Exam questions use these clues. \"Forward threat or traffic logs from specific rules\" is a log forwarding profile attached to those rules. \"Forward configuration or system logs\" is Device > Log Settings. \"Send to a ticketing webhook\" is an HTTP server profile. \"Cloud log storage for Strata Cloud Manager\" is Strata Logging Service, and \"automatically applied to new rules\" is a log forwarding profile named default."
  ],
  "analogy": "Think of a hospital. Each ward keeps patient charts (Traffic, Threat and URL logs), and the hospital office keeps building records (System and Configuration logs). Copies of patient charts go out according to instructions clipped to each ward's door, the log forwarding profile on each rule. Building records are sent by the front office's own standing instructions, Device > Log Settings. The address book of where copies may go, the server profiles, is shared by both. The analogy breaks slightly in one way: a ward with no specialist on duty, a rule with no security profile, writes no threat chart at all.",
  "terms": [
   [
    "Traffic log",
    "A per-session record written by default at session end for sessions matching rules with logging enabled."
   ],
   [
    "Threat log",
    "Records of vulnerability, spyware, virus, flood and scan detections, produced by security profiles attached to rules."
   ],
   [
    "Log forwarding profile",
    "An object attached to security rules that sends matching policy logs to Panorama, cloud logging, syslog, SNMP, email or HTTP."
   ],
   [
    "Device > Log Settings",
    "Where System, Configuration, User-ID, HIP Match and other non-policy logs are forwarded."
   ],
   [
    "Syslog server profile",
    "Settings for syslog destinations, including transport, port, format, facility and custom message formats."
   ],
   [
    "HTTP server profile",
    "A server profile that sends logs to web services with customizable URI, headers and payload."
   ],
   [
    "Strata Logging Service",
    "Palo Alto Networks' cloud log storage service (formerly Cortex Data Lake) used by cloud management and analytics apps."
   ]
  ],
  "example": "The SOC wants every critical threat in its SIEM within seconds and all config changes too. You create a syslog server profile over TCP, a log forwarding profile with a threat entry filtered on severity critical, attach it to the Internet rules, and in Device > Log Settings forward Configuration logs to the same syslog profile. The SIEM team then verifies that both log types arrive and parse.",
  "mistakes": [
   [
    "Adding a Configuration log entry to a log forwarding profile to send config changes to syslog.",
    "Log forwarding profiles handle policy-generated logs only. Configuration and System logs are forwarded from Device > Log Settings."
   ],
   [
    "Assuming blocked traffic is always in the Traffic log.",
    "Only deny rules with logging enabled produce entries. The predefined interzone-default rule must be overridden to enable logging."
   ],
   [
    "Concluding there are no attacks because the Threat log is empty for a rule.",
    "Threat logs come from security profiles. A rule with no profiles attached inspects nothing and logs no threats."
   ],
   [
    "Choosing UDP syslog for compliance logs that must not be lost.",
    "UDP gives no delivery guarantee. Use TCP, or SSL for confidentiality as well as reliability."
   ]
  ],
  "tryit": [
   [
    "Meadowbrook Utilities wants three things: high-severity threats from its Internet rules sent to the SIEM, every administrator login failure sent to the same SIEM, and a chat alert when WildFire finds malware. Where do you configure each one?",
    "Create a syslog server profile and an HTTP server profile. In a log forwarding profile attached to the Internet rules, add a threat entry filtered to high and above sending to syslog, and a WildFire entry filtered to malicious verdicts sending to the HTTP profile. Administrator login failures are System log events, so forward them from Device > Log Settings to the syslog profile, not from the log forwarding profile."
   ]
  ],
  "tip": "Traffic, Threat, URL, WildFire and Data logs are forwarded with a log forwarding profile on security rules; System and Configuration logs use Device > Log Settings. Traffic logs default to session end only, and deny rules must have logging enabled.",
  "check": [
   [
    "Where do you configure forwarding of Configuration logs to syslog?",
    "Device > Log Settings, using a syslog server profile."
   ],
   [
    "Why might blocked traffic not appear in the Traffic log?",
    "The matching deny rule, often interzone-default, does not have logging enabled."
   ],
   [
    "What happens to new security rules if a log forwarding profile is named default?",
    "It is automatically attached to them."
   ],
   [
    "Why might an allowed session with an exploit attempt produce no Threat log?",
    "The matching rule has no vulnerability protection or other security profile attached, so no threat inspection occurred."
   ],
   [
    "Which server profile type would you use to open tickets in a web-based ticketing system?",
    "An HTTP server profile with a custom URI, headers and payload."
   ]
  ]
 },
 {
  "t": "Software and content updates: PAN-OS upgrade paths and base images, HA upgrade order, dynamic update schedules and thresholds",
  "hook": "It is Saturday at 1 a.m. at Oakridge Logistics, the start of the approved maintenance window, and Jordan clicks Install on the new PAN-OS maintenance release for the primary firewall. An error appears: the base image is missing. Jordan downloads it, tries again, and the install now complains about the content version. The clock is ticking, the HA (high availability) peer is still running the old release, and Panorama has not been touched. On Monday, a separate incident report lands: a content update installed automatically overnight and changed how several applications were identified. What order should upgrades follow, and how do you keep fast-arriving content from surprising you?",
  "simple": "A firewall runs two kinds of updates. The first is the operating system itself, like a phone's major system update; it needs a restart and careful planning. The second is a stream of small updates that teach the firewall about new applications, viruses and attacks, like a phone's app store pushing new definitions; these install without a restart and arrive often. For the big system updates, you follow a set order: update the central manager first, refresh the small updates, then update one firewall of a pair while the other keeps working. For the small updates, you can tell the firewall to wait a few hours after each release before installing, so a rare bad update is caught by others before it reaches you.",
  "body": [
   "A firewall runs two kinds of code that update on different schedules. PAN-OS software is the operating system, released as feature releases (such as 10.2, 11.0 or 11.1), with maintenance releases within each feature release that fix bugs and security issues. Content updates are signatures and data: Applications and Threats (App-IDs plus vulnerability and spyware signatures), Antivirus, WildFire, GlobalProtect data files and others. Content updates arrive frequently and install without a reboot, while software upgrades require a reboot and a maintenance window. Keeping both current is a core security task, and doing either carelessly is a common cause of outages.",
   "PAN-OS upgrade paths follow rules. To install a maintenance release of a new feature release, you must first download that feature release's base image (the .0 release), even if you never install it; the firewall needs it present before it will install, say, a later 11.1 maintenance release. Traditionally you also upgrade through each feature release in sequence rather than jumping over one. Newer releases support skipping some versions in certain cases, so always read the supported upgrade path in the release notes rather than assuming. Each PAN-OS release also requires a minimum content version, so install current Applications and Threats content before upgrading software, or the install can fail.",
   "A safe single-firewall upgrade follows a routine. Read the release notes and known issues for the target release. Save a named configuration snapshot and export it along with the device state (Device > Setup > Operations), so you can rebuild the box if needed. Update content. Under Device > Software, click Check Now, then download the base image and the target image. Install the target image, reboot, and verify with `show system info`, the dashboard, and quick checks that sessions, VPN tunnels and User-ID mappings are healthy. From the CLI the same steps are `request system software check`, `request system software download version <ver>`, `request system software install version <ver>` and `request restart system`. If you manage the firewall with Panorama, upgrade Panorama first: Panorama must run the same or a later release than the firewalls it manages, and that includes Log Collectors.",
   "HA pairs are upgraded one peer at a time so traffic keeps flowing. A typical active/passive order is: disable preemption if it is enabled, so the original active firewall does not grab the role back mid-upgrade; upgrade the passive peer and reboot it; confirm it is healthy and that configuration and sessions are synchronized; suspend the active peer with `request high-availability state suspend` so the upgraded peer becomes active; upgrade the former active peer and reboot it; then return it to service with `request high-availability state functional` and restore preemption. Peers briefly run different releases during this window, which HA tolerates for the upgrade, but you should not leave them mismatched. For active/active pairs the idea is the same: one peer at a time, verifying synchronization between steps.",
   "Dynamic updates are scheduled under Device > Dynamic Updates. Each content type has its own recurrence (for example very frequent checks for WildFire, and hourly or daily for others) and an action: download only, or download and install. Download only suits environments where an administrator reviews content before it goes live. The threshold setting delays installing a new content release until it has been available for a set number of hours. That gives Palo Alto Networks time to pull a problematic release before your firewall installs it. For mission-critical networks a threshold is a common best practice, balanced against the need for fast protection; a short threshold on threat content and a longer one on application content is a typical compromise. Applications and Threats updates also let you review the new App-IDs in a release and choose to disable new App-IDs on install, so you can check how they affect policy before they change which rules match. You can then enable them after review.",
   "Consider a worked example. Jordan must move an HA pair from 10.2 to a later 11.1 maintenance release. Jordan first upgrades Panorama, then installs the latest content on both firewalls. The release notes show the supported path, so Jordan downloads each required base image ahead of the window. Jordan exports a named snapshot and device state from each peer, disables preemption, upgrades and reboots the passive peer, and checks that `show high-availability state` shows it synchronized. Jordan suspends the active peer, upgrades it, returns it to functional and re-enables preemption. Sessions stay up throughout. Afterward, Jordan sets a threshold on Applications and Threats installs and enables the option to disable new App-IDs on install, which addresses Monday's surprise.",
   "Watch for the common mistakes. People forget the base image and get an install error, upgrade firewalls before Panorama, upgrade software before content, upgrade both HA peers at once, and schedule content to install instantly on critical firewalls with no threshold. Another is skipping the configuration and device state export, which leaves no clean rollback if the upgrade goes wrong, or leaving preemption enabled so roles flip unexpectedly during the upgrade.",
   "Exam questions use these clues. \"Why download a version you will not run?\" is the base image requirement. \"Which to upgrade first?\" is Panorama before firewalls, content before software, and the passive peer before the active one. \"Delay content installation to reduce risk\" is the threshold. \"New App-IDs might change which rules match\" points to reviewing or disabling new App-IDs on install, and \"download but let an admin decide\" is the download-only action."
  ],
  "analogy": "Upgrading an HA pair is like repairing a two-lane bridge: you close one lane, rebuild it, move all traffic onto it, then rebuild the other lane, and you never close both lanes at once. The content threshold is like waiting a few days before installing a new app update that many other people are already running, so any bad release gets noticed and pulled first. Where the bridge picture stops working: HA peers must also stay synchronized, so you confirm sync before switching traffic.",
  "mnemonic": "PCPA, \"Please Check Passive first, then Active\": Panorama, then Content, then the Passive peer, then the Active peer.",
  "terms": [
   [
    "Feature release",
    "A PAN-OS version that introduces new capabilities, such as 11.1, identified by its first two numbers."
   ],
   [
    "Base image",
    "The .0 image of a feature release, which must be downloaded before installing a maintenance release of that feature release."
   ],
   [
    "Maintenance release",
    "A bug-fix release within a PAN-OS feature release, such as a later 11.1.x build."
   ],
   [
    "Applications and Threats",
    "The content package containing App-ID definitions and vulnerability and spyware signatures."
   ],
   [
    "Threshold",
    "A dynamic update setting that waits a set number of hours after release before installing new content."
   ],
   [
    "Preemption",
    "An HA setting that lets the higher-priority peer reclaim the active role; disabled during upgrades to prevent unexpected failovers."
   ],
   [
    "Device state",
    "An export of the firewall's configuration and related files used to restore or replace a device."
   ]
  ],
  "example": "You must move an HA pair from 10.2 to a later 11.1 maintenance release. You first upgrade Panorama, install the latest content on both firewalls, then check the release notes for the supported path. You download each required base image, upgrade the passive peer, fail over by suspending the active peer, upgrade the other peer, and confirm sessions stayed synchronized throughout.",
  "mistakes": [
   [
    "Downloading only the target maintenance release because the base image will never be run.",
    "PAN-OS requires the feature release's base image to be present before it installs a maintenance release of that feature release. Download both."
   ],
   [
    "Upgrading the managed firewalls first and Panorama later.",
    "Panorama must run the same or a later release than the firewalls it manages. Upgrade Panorama first."
   ],
   [
    "Upgrading both HA peers at the same time to finish faster.",
    "That takes down both firewalls. Upgrade the passive peer first, fail over, then upgrade the former active peer."
   ],
   [
    "Setting every content type to download and install immediately on critical firewalls.",
    "A bad release would install everywhere at once. Use a threshold, and consider disabling new App-IDs on install so you can review policy impact."
   ]
  ],
  "tryit": [
   [
    "Silver Lake Hospital's firewalls protect clinical systems where an outage is very costly, but the security team also wants new threat signatures quickly. An auditor asks how the team balances these. What dynamic update settings would you propose for Applications and Threats?",
    "Schedule Applications and Threats to download and install on a frequent recurrence with a threshold of some hours, so a problematic release has time to be pulled before installing. Enable the option to disable new App-IDs on install, then review them and enable them after checking policy impact. This keeps new threat signatures flowing while preventing new App-IDs from silently changing which rules match."
   ]
  ],
  "tip": "Base image first, content before software, Panorama before firewalls, passive peer before active. Thresholds delay content installation to reduce risk from a bad release.",
  "check": [
   [
    "Why must you download a base image you will not run?",
    "PAN-OS requires the feature release's base image to be present before installing a maintenance release of that feature release."
   ],
   [
    "In an active/passive pair, which peer do you upgrade first?",
    "The passive peer, then fail over and upgrade the former active peer."
   ],
   [
    "What does the dynamic update threshold do?",
    "It holds off installing a new content release until it has been published for the configured number of hours."
   ],
   [
    "Why install current content before a PAN-OS upgrade?",
    "Each PAN-OS release requires a minimum content version, and the install can fail without it."
   ],
   [
    "Why disable preemption before upgrading an HA pair?",
    "So the original active peer does not take back the active role automatically while peers are being upgraded and rebooted."
   ]
  ]
 },
 {
  "t": "Certificate management: CAs, forward trust/untrust, SSL inbound inspection, SSL/TLS service profiles, certificate profiles, OCSP/CRL",
  "hook": "It is Monday morning at Fairview Credit Union, the day after decryption went live, and the help desk queue is filling up. Half the tickets say every website shows a certificate warning. Then Nadia from security walks over with the opposite problem: she tested a site with a deliberately expired certificate, and her browser showed no warning at all. Meanwhile, the auditor wants proof that the GlobalProtect portal rejects revoked client certificates and refuses old TLS versions. Four symptoms, all about certificates, each pointing to a different object on the firewall. Which certificate does what, and how do you tell them apart under pressure?",
  "simple": "A certificate is a digital ID card for a website or device, and a certificate authority (CA) is the office that issues and vouches for those ID cards. Your computer keeps a list of offices it trusts. When the firewall inspects encrypted web traffic, it has to make its own stand-in ID cards for websites, so your computer must trust the firewall as an issuing office. If a website's real ID card is fake or expired, the firewall deliberately makes a stand-in card your computer will not trust, so you still get a warning. The firewall also has its own ID card for its login pages, and a checklist for judging other people's ID cards, including asking whether a card has been cancelled.",
  "body": [
   "Certificates underpin decryption, GlobalProtect, the management interface and many authentication features. You manage them under Device > Certificate Management > Certificates, where you can generate certificates and keys on the firewall, import and export them, and create certificate signing requests (CSRs) for an enterprise certificate authority (CA) to sign. A CA is the entity that signs certificates and vouches for their identity. Whether an endpoint trusts a certificate depends on whether it trusts the CA that signed it, directly or through a chain of intermediate CAs leading to a root in its trust store. Keep that idea in mind, because almost every certificate problem on the exam is really a question of who signed what and who trusts whom.",
   "For SSL Forward Proxy, which decrypts users' outbound HTTPS, the firewall acts as a CA. When a user visits a site, the firewall checks the real server certificate, then creates an impersonated copy for the same site, signed by one of two CA certificates. The Forward Trust certificate signs the copy when the real server certificate is valid and chains to a trusted CA. The Forward Untrust certificate signs it when the server certificate is invalid (expired, self-signed or from an untrusted issuer), so the user still gets a browser warning instead of silently trusting a bad site. Forward Trust should be a subordinate CA issued by your enterprise PKI (public key infrastructure), or a self-signed CA, that endpoints trust through group policy or device management. Forward Untrust should deliberately be a self-signed CA that endpoints do not trust. If the two are the same certificate, users lose the warning that protects them.",
   "SSL Inbound Inspection protects your own servers. There is no impersonation: you import the server's actual certificate and private key onto the firewall, and it decrypts inbound sessions to inspect them for threats such as exploits hidden in HTTPS requests. The decryption rule with the SSL Inbound Inspection type references that certificate. Because the firewall uses the real key, clients see exactly the same certificate as before and notice no difference. Guard these keys carefully, since anyone who obtains them can impersonate your server, and import the renewed certificate and key whenever the server's certificate is replaced, or inspection of that server will fail.",
   "Two profile types sound similar but point in opposite directions. An SSL/TLS service profile (Device > Certificate Management > SSL/TLS Service Profile) defines the certificate and allowed protocol versions, the minimum and maximum TLS (Transport Layer Security) version, for services the firewall itself hosts: the management web interface, GlobalProtect portal and gateways, Authentication Portal and others. It answers \"what certificate and TLS versions do I present to clients?\" Raising the minimum version is a simple hardening step. A certificate profile (Device > Certificate Management > Certificate Profile) is used when the firewall needs to validate someone else's certificate, such as GlobalProtect client certificates, administrator certificate logins or IPsec peers. It lists the trusted CA certificates, which certificate field supplies the username (for example subject or subject alternative name), and revocation checking options. It answers \"how do I judge a certificate presented to me?\"",
   "Revocation can be checked with a Certificate Revocation List (CRL), a periodically downloaded list of revoked serial numbers published by the CA, or with Online Certificate Status Protocol (OCSP), a real-time query to a responder about one certificate. When both are enabled, PAN-OS tries OCSP first and falls back to CRL. You can choose to block sessions if the status is unknown or the check times out, trading availability for strictness. Also mark certificates for their role when you create or import them: Trusted Root CA for certificates you want in the firewall's trust store, and Forward Trust or Forward Untrust for decryption. Watch expiry dates. An expired Forward Trust CA breaks browsing for every decrypted user at once, and an expired portal certificate stops GlobalProtect connections.",
   "Consider a worked example. At Fairview Credit Union, users visiting a site with an expired certificate see no warning, which alarms the security team. The cause: the same enterprise-issued CA was selected as both Forward Trust and Forward Untrust. You generate a separate self-signed CA named `fwd-untrust`, mark it as Forward Untrust only, and leave the enterprise-issued subordinate CA as Forward Trust. Warnings return for bad sites while good sites load normally. The other help desk tickets, warnings on every site, come from laptops that never received the Forward Trust CA, so you push it through device management. Finally, you add a certificate profile with OCSP and CRL checks to the GlobalProtect portal so revoked client certificates are rejected, and an SSL/TLS service profile with a raised minimum TLS version for the portal.",
   "Watch for the common mistakes. People use the same CA for Forward Trust and Forward Untrust, forget to deploy the Forward Trust CA to endpoints so every decrypted site shows an error, confuse an SSL/TLS service profile with a certificate profile, and let the Forward Trust or portal certificate expire. Another is setting block-on-unknown-status without a reachable OCSP responder or CRL distribution point, which blocks legitimate users whenever the check cannot complete.",
   "Exam questions use these clues. \"Users see warnings for every site after decryption\" points to the Forward Trust CA not being trusted by endpoints. \"No warning for sites with bad certificates\" points to Forward Untrust misconfigured. \"Decrypt traffic to our own web server\" is SSL Inbound Inspection with the server's key. \"Minimum TLS version for the portal\" is an SSL/TLS service profile, \"validate client certificates\" is a certificate profile, and \"real-time revocation check\" is OCSP."
  ],
  "analogy": "Think of a building receptionist who issues visitor badges. When a guest arrives with a valid government ID, the receptionist issues a badge the security guards recognize (Forward Trust). When the ID is expired or forged, the receptionist issues a badge with a bright red stripe that guards are trained to stop (Forward Untrust). The receptionist's own name tag is the SSL/TLS service profile, and the rulebook for checking guests' IDs, including a call to the issuing office to see if an ID was cancelled, is the certificate profile with OCSP. The analogy does not cover inbound inspection, where the firewall holds the server's real key.",
  "mnemonic": "\"Online before the List\": OCSP (Online) is checked first, and the CRL (List) is the fallback.",
  "terms": [
   [
    "Certificate authority (CA)",
    "An entity that signs certificates; endpoints trust certificates signed by CAs in their trust store."
   ],
   [
    "Forward Trust certificate",
    "The CA certificate the firewall uses to sign impersonated server certificates when the real server certificate is trusted."
   ],
   [
    "Forward Untrust certificate",
    "An untrusted CA certificate used to sign impersonated certificates for sites with invalid certificates, so users see a warning."
   ],
   [
    "SSL Inbound Inspection",
    "Decryption of traffic to your own servers using their imported certificate and private key."
   ],
   [
    "SSL/TLS service profile",
    "Settings for the certificate and TLS versions used by services the firewall hosts, such as the web interface and portal."
   ],
   [
    "Certificate profile",
    "Settings for validating client or peer certificates: trusted CAs, username field and OCSP/CRL checks."
   ],
   [
    "OCSP",
    "Online Certificate Status Protocol, a real-time query to a responder about a certificate's revocation status."
   ],
   [
    "CRL",
    "Certificate Revocation List, a periodically published list of revoked certificate serial numbers."
   ]
  ],
  "example": "After enabling decryption, users visiting a site with an expired certificate see no warning, which alarms the security team. The cause: the same trusted CA was selected as both Forward Trust and Forward Untrust. You generate a separate self-signed Forward Untrust CA that endpoints do not trust, and warnings return for bad sites while trusted sites load without errors.",
  "mistakes": [
   [
    "Selecting the enterprise CA for both Forward Trust and Forward Untrust to keep things simple.",
    "Sites with invalid certificates would then look trusted, and users would get no warning. Forward Untrust must be a separate CA that endpoints do not trust."
   ],
   [
    "Using an SSL/TLS service profile to validate GlobalProtect client certificates.",
    "SSL/TLS service profiles set what the firewall presents. Validating certificates others present is the job of a certificate profile."
   ],
   [
    "Expecting SSL Inbound Inspection to work with a Forward Trust CA like forward proxy does.",
    "Inbound inspection does not impersonate. It needs the protected server's own certificate and private key imported on the firewall."
   ],
   [
    "Assuming the CRL is checked first because it is the older, more familiar method.",
    "When both are configured, PAN-OS queries OCSP first and falls back to the CRL."
   ]
  ],
  "tryit": [
   [
    "Elm Street Clinics is launching a public patient portal on its own web servers behind the firewall and wants the firewall to inspect inbound HTTPS for exploits. Patients must not see any certificate change, and the clinic already has the portal's certificate from a public CA. What does the firewall need, and which decryption type do you choose?",
    "Choose SSL Inbound Inspection. Import the portal's certificate and private key onto the firewall and reference it in a decryption rule of that type. Because the firewall uses the real certificate and key, patients see the same certificate as before. No Forward Trust CA is involved, and the team must protect the imported key and re-import it whenever the certificate is renewed."
   ]
  ],
  "tip": "Forward Trust must be trusted by clients; Forward Untrust must not be. Inbound inspection uses the server's real key, forward proxy uses impersonation. Service profiles protect the firewall's own services; certificate profiles validate others' certificates. OCSP is tried before CRL.",
  "check": [
   [
    "What do you need on the firewall for SSL Inbound Inspection?",
    "The protected server's certificate and private key, imported and referenced by the decryption rule."
   ],
   [
    "When both OCSP and CRL are configured, which is tried first?",
    "OCSP, with CRL as the fallback."
   ],
   [
    "Which object sets the minimum TLS version for the GlobalProtect portal?",
    "An SSL/TLS service profile."
   ],
   [
    "Why must endpoints trust the Forward Trust CA?",
    "Because the firewall signs impersonated server certificates with it; if endpoints do not trust it, every decrypted site shows a certificate error."
   ],
   [
    "Which object lists trusted CAs and revocation checks for validating client certificates?",
    "A certificate profile."
   ]
  ]
 },
 {
  "t": "Decryption exclusions for pinned and sensitive apps",
  "hook": "It is Wednesday at Harborview Architects, two days after you turned on outbound decryption, and the help desk has a pattern. Web browsing works fine, but the desktop backup client in the design department fails every night, and a mobile banking app on staff phones refuses to connect over the office Wi-Fi. At the same time, Elena from HR asks a pointed question: is the firewall now reading employees' visits to their doctor's patient portal? You need to fix the broken apps without switching decryption off, and you need a privacy answer you can defend to HR and the works council. What should stay encrypted, and how do you decide?",
  "simple": "Decryption lets the firewall open and inspect encrypted web traffic, like a mailroom that opens packages to check for dangerous items. Some packages cannot be opened without ruining them. Certain apps are built to trust only one specific seal, so if anyone else reseals the package, the app refuses it. Other packages should not be opened because they are private, such as medical or banking letters. So the firewall keeps two kinds of exception lists: one for apps that break when opened, and one for private categories the organization chooses not to open. Even for unopened packages, the firewall can still read the label on the outside and reject packages with a fake or expired seal.",
  "body": [
   "Decryption gives the firewall visibility into encrypted traffic, but not everything can or should be decrypted. Some applications break when a middlebox decrypts them, and some traffic should stay private for legal or ethical reasons. Planning exclusions is part of every decryption rollout, and doing it well is what lets you decrypt most traffic without a flood of help desk calls. Palo Alto Networks' guidance is to decrypt as much as you can and exclude only what you must, documenting a reason for every exception so auditors and future administrators understand why it exists. Think of exclusions in two groups: technical exclusions for traffic that cannot be decrypted, and policy exclusions for traffic you choose not to decrypt.",
   "Technical exclusions come first. Certificate pinning means an app accepts only a specific certificate, public key or CA for its server, rather than whatever the operating system trusts. When the firewall substitutes its impersonated certificate, signed by the Forward Trust CA, the app refuses to connect, even though a browser on the same machine would accept it because the browser uses the system trust store. Many mobile apps, software updaters and some desktop clients pin. Other breakers include mutual TLS (Transport Layer Security), where the client authenticates with its own certificate and the firewall cannot present the client's certificate to the server on the client's behalf, and servers using protocols or ciphers the firewall does not support for decryption.",
   "Palo Alto Networks maintains a predefined list of known problem sites under Device > Certificate Management > SSL Decryption Exclusion. It is updated through content updates, and each entry shows a description of why it is there, such as pinning or client authentication. You can add your own entries by hostname, with wildcards allowed, for internal or niche apps that pin or require client certificates. These exclusions apply regardless of decryption policy, so they win even if a decrypt rule matches. Separately, when a session fails decryption for reasons such as client authentication, the firewall can add the server to a local exclusion cache so later sessions pass without decryption. The Decryption log (Monitor > Logs > Decryption) shows failed handshakes with error messages and reasons, which is how you find the apps that need exclusions. Make sure logging of unsuccessful TLS handshakes is enabled on your decryption rules during rollout so these entries appear.",
   "Policy-based exclusions cover sensitive traffic. In decryption policy (Policies > Decryption) you create rules with the action No Decrypt, typically matching URL categories such as `financial-services`, `health-and-medicine` and `government`, or specific users, groups or destinations. Place these rules above the broad decrypt rules, because decryption policy is evaluated top-down like other rulebases, and the first matching rule wins. This protects employee privacy and helps meet regulations and works council agreements. Local law may require such exclusions, so involve legal and human resources teams before you finalize the list, and record their decisions alongside each rule.",
   "Not decrypting does not mean not checking. Attach a decryption profile to No Decrypt rules so the firewall still validates server certificates, for example blocking sessions with expired certificates or untrusted issuers. You also still get App-ID based on the TLS handshake and the Server Name Indication (SNI), and URL filtering based on the SNI and the certificate's names, so category-based security rules keep working. Keep exclusions as narrow as possible. Excluding a broad category or a wildcard domain can hide command-and-control traffic that abuses popular cloud services. Review exclusions periodically, remove entries for apps that no longer exist, and prefer specific hostnames over whole categories when the reason is technical.",
   "Consider a worked example. After decryption goes live at Harborview Architects, the design department's desktop backup client stops working, while browsing is fine. You filter the Decryption log for the source users and find handshake failures to `backup.example.com` with an error indicating the client rejected the certificate. Because the client pins its certificate, you add that single hostname to the SSL Decryption Exclusion list rather than the whole cloud provider's domain, and the backups resume that night. The mobile banking app shows the same pattern, but it falls into a category HR wants private anyway. In the same review, HR asks that medical and banking portals stay private, so you add a No Decrypt rule for `health-and-medicine` and `financial-services` above the decrypt rule, with a decryption profile that still blocks expired certificates and untrusted issuers. You give Elena a short written list of the excluded categories and the reason for each.",
   "Watch for the common mistakes. People place the No Decrypt rule below the broad decrypt rule so it never matches, exclude a whole category or wildcard when one hostname would do, forget to attach a decryption profile to No Decrypt rules, and try to fix a pinned app by deploying the Forward Trust CA more widely, which cannot work because pinning ignores the system trust store. Another is treating the exclusion list and a No Decrypt rule as interchangeable: one handles technical breakage, the other policy decisions.",
   "Exam questions use these clues. \"App fails but browser works after decryption\" points to certificate pinning and an SSL Decryption Exclusion. \"Client certificate authentication\" points to mutual TLS, which cannot be decrypted by forward proxy. \"Privacy\", \"banking\" or \"healthcare\" points to a No Decrypt rule on URL categories. \"Still block expired certificates on excluded traffic\" points to a decryption profile on the No Decrypt rule, and \"find which apps fail\" points to the Decryption log."
  ],
  "analogy": "Decryption is like a mailroom that opens and reseals packages to check for hazards. A pinned app is a recipient who accepts only packages sealed with the sender's own wax stamp; resealed packages are refused, however official the mailroom's tape looks. Those go on a do-not-open list (the SSL Decryption Exclusion). Private letters, such as medical results, are left sealed by company policy (No Decrypt rules), yet the mailroom still checks the outside label and rejects packages with forged postmarks (the decryption profile). The analogy is imperfect in that a real mailroom could open anything; some sessions, like mutual TLS, truly cannot be opened.",
  "terms": [
   [
    "Certificate pinning",
    "An app accepting only a specific certificate, key or CA for its server, which breaks when a firewall substitutes its own certificate."
   ],
   [
    "Mutual TLS",
    "TLS where the client also presents a certificate; a forward proxy cannot present the client's certificate, so it cannot decrypt the session."
   ],
   [
    "SSL Decryption Exclusion list",
    "The predefined and custom list of hostnames the firewall never decrypts, found under Certificate Management."
   ],
   [
    "No Decrypt rule",
    "A decryption policy rule that leaves matching traffic encrypted, often for sensitive URL categories."
   ],
   [
    "Decryption profile",
    "Settings that validate certificates and protocols for decrypted and non-decrypted sessions."
   ],
   [
    "Server Name Indication (SNI)",
    "The hostname a client sends in the TLS handshake, which the firewall can use for App-ID and URL filtering without decrypting."
   ],
   [
    "Decryption log",
    "The log that records decryption sessions and failures, with reasons, used to find apps needing exclusions."
   ]
  ],
  "example": "After decryption goes live, a department's desktop backup client stops working, while browsing is fine. The Decryption log shows handshake failures to the backup service's hostname. Because the client pins its certificate, you add that single hostname to the SSL Decryption Exclusion list and the backups resume, while a No Decrypt rule with a decryption profile keeps health sites private but still checks their certificates.",
  "mistakes": [
   [
    "Fixing a pinned app by pushing the Forward Trust CA to more devices.",
    "Pinning ignores the system trust store, so the app rejects the impersonated certificate no matter how widely the CA is trusted. Add the hostname to the SSL Decryption Exclusion list."
   ],
   [
    "Placing the No Decrypt rule for financial sites at the bottom of the decryption rulebase.",
    "Decryption policy is evaluated top-down. The broad decrypt rule above it matches first, so the No Decrypt rule must sit above it."
   ],
   [
    "Excluding an entire cloud provider's wildcard domain because one app on it breaks.",
    "Broad exclusions create blind spots attackers can abuse. Exclude the specific hostname the app uses."
   ],
   [
    "Assuming excluded traffic gets no security checks at all.",
    "App-ID and URL filtering still use the handshake and SNI, and a decryption profile on the No Decrypt rule can still block expired or untrusted certificates."
   ]
  ],
  "tryit": [
   [
    "At Riverbend Pharmacy, a new inventory scanner app on handheld devices fails to sync after decryption is enabled, while staff can still browse the vendor's website from the same devices. The Decryption log shows the app's sessions to one vendor hostname ending in handshake errors. Should you create a No Decrypt rule for the vendor's URL category or add an SSL Decryption Exclusion?",
    "Add an SSL Decryption Exclusion for that specific hostname. The symptoms, app fails while the browser works plus handshake errors, point to certificate pinning, which is a technical exclusion. A No Decrypt rule on a URL category is meant for privacy policy decisions and would exclude far more traffic than necessary."
   ]
  ],
  "tip": "Pinned apps and mutual TLS need technical exclusions; privacy categories use No Decrypt rules placed above the decrypt rules. Attach a decryption profile to No Decrypt rules so certificate checks still happen.",
  "check": [
   [
    "Why does a pinned app fail when a browser does not?",
    "The app accepts only its expected certificate or CA, so it rejects the firewall's impersonated certificate even though the OS trusts it."
   ],
   [
    "How do you keep banking sites private while decrypting other traffic?",
    "Add a No Decrypt rule for the financial-services URL category above the decrypt rules."
   ],
   [
    "Where do you look to find apps failing decryption?",
    "The Decryption log, which records handshake failures and reasons."
   ],
   [
    "What can the firewall still inspect on traffic it does not decrypt?",
    "App-ID from the handshake, URL filtering on the SNI, and certificate checks through a decryption profile."
   ],
   [
    "Why can't SSL Forward Proxy decrypt a session that uses mutual TLS?",
    "The server requires the client's certificate, and the firewall cannot present the client's certificate on its behalf."
   ]
  ]
 },
 {
  "t": "User-ID sources (server monitoring, syslog listener, GlobalProtect, XML API), group mapping and Cloud Identity Engine",
  "hook": "It is Monday at Brightwater University, and the finance office reports that staff on the new wireless network cannot reach the payroll application, while the same people on wired desktops can. The security rule allows the group `finance-staff`. In the Traffic log, wired sessions show usernames, but the wireless sessions show only IP addresses and the source user `unknown`. Wi-Fi users authenticate to the wireless controller with 802.1X, which never writes a logon event to the domain controllers the firewall watches. And next term, the university moves half its accounts to a cloud-only directory. Where else can the firewall learn who is behind an address, and how will it learn their groups?",
  "simple": "Computers on a network are known by numbers called IP addresses, and those numbers change as people move around. User-ID is the firewall's way of keeping a live list of which person is using which address, so rules can say \"the finance team may use payroll\" instead of listing addresses. The firewall does not guess. It reads clues from other systems that already know who logged in: the company's login servers, the Wi-Fi system, the VPN, or a program that reports logins directly. Knowing the name is only half the job. The firewall also asks the company directory which teams each person belongs to, so rules can be written for whole groups. A cloud service can supply that team list when the directory lives in the cloud.",
  "body": [
   "User-ID maps IP addresses to usernames so policy and logs can refer to people and groups instead of addresses. That matters because addresses change constantly through DHCP, Wi-Fi roaming and VPNs, while a rule such as \"finance may reach the payroll app\" should follow the person wherever they connect. The firewall does not guess. It learns mappings from sources you configure, keeps them in a table with timeouts, and applies them only to traffic arriving in zones where Enable User Identification is checked. If that box is not checked on the users' zone, even perfect mappings are ignored for that traffic.",
   "Server monitoring is the most common source. Either the PAN-OS integrated User-ID agent running on the firewall, or the Windows-based User-ID agent installed on a server, reads security event logs from Microsoft Active Directory domain controllers, where successful logon events record which user logged on from which IP address. It can also monitor Microsoft Exchange servers and Novell eDirectory. The service account needs rights to read the event logs, such as membership in the Event Log Readers group, and should not be a domain admin, because a compromised service account with broad rights would be a serious exposure. The Windows agent is useful at scale because it offloads collection from the firewall and can feed many firewalls. You configure the integrated agent and its monitored servers under Device > User Identification > User Mapping.",
   "A syslog listener collects mappings from systems that already authenticate users, such as wireless controllers, network access control (NAC) systems, VPN concentrators or proxies. You define syslog parse profiles with regular expressions or field identifiers that pick out the username and IP address from login messages, and, where available, from logout messages so stale mappings are removed. Then you add each sending system to the monitored server list as a syslog sender with its parse profile. The listener is enabled through an interface management profile with User-ID Syslog Listener-UDP or User-ID Syslog Listener-SSL on the receiving interface; SSL is preferred because it protects the messages from tampering and eavesdropping.",
   "GlobalProtect is the most reliable source for remote and roaming users: the user authenticates to the gateway, so the firewall knows exactly who holds the tunnel IP. Internal gateways extend this to LAN users who run the GlobalProtect app inside the office. The XML API lets any script or third-party system push login and logout events, and tags, to the firewall; this is how custom apps, cloud platforms and orchestration tools feed User-ID. Other sources include Authentication Portal for users who must log in through a browser, terminal server agents for multi-user hosts such as Citrix or Microsoft Remote Desktop servers (which map users by source port range because many users share one IP), and client probing, which Palo Alto Networks discourages because it can expose credentials. Mappings expire after a timeout, so choose a value that fits how long your users' addresses stay stable.",
   "Knowing a username is only half the job, because policy is usually written for groups. Group mapping (Device > User Identification > Group Mapping Settings) uses an LDAP (Lightweight Directory Access Protocol) server profile to read group membership from the directory, with a group include list that limits which groups are retrieved and an update interval that controls how often membership refreshes. Once you define an include list, only those groups are retrieved, so make sure every group your rules reference is on it. `show user group list` shows retrieved groups, and `show user group name <group>` shows members.",
   "The Cloud Identity Engine (CIE) is a Palo Alto Networks cloud service for directory synchronization and authentication. It reads users and groups from on-premises Active Directory (through an agent), Microsoft Entra ID, Okta and other identity providers, and firewalls query it for user and group information instead of each running LDAP group mapping. Its Cloud Authentication Service can also act as the authentication method for GlobalProtect and Authentication Portal using SAML (Security Assertion Markup Language) identity providers. CIE is especially useful for cloud directories that have no LDAP interface, and for organizations that want one consistent identity view across many firewalls and cloud-delivered services.",
   "Consider a worked example. At Brightwater University, staff connect through a Wi-Fi controller using 802.1X, but those logins do not touch the domain controllers, so many IPs show as `unknown`. You configure the controller to send authentication syslog over SSL to a firewall interface whose management profile enables the User-ID Syslog Listener-SSL service. You write a syslog parse profile that extracts the user and IP from its login messages, and you add the controller as a monitored server. You confirm with `show user ip-user-mapping all` that Wi-Fi users appear, and with `show user group list` that `finance-staff` is retrieved. The payroll rule now matches. For next term's cloud-only accounts, you connect the firewalls to the Cloud Identity Engine, which syncs groups from the cloud directory without any LDAP interface.",
   "Watch for the common mistakes. Teams run the User-ID service account as a domain admin, forget to enable User Identification on the internal zone, leave the groups used in policy out of the group include list, parse only login messages so stale mappings linger, and enable client probing. Another is expecting LDAP group mapping to work against a cloud-only directory that has no LDAP service, which is exactly the gap the Cloud Identity Engine fills.",
   "Exam questions use these clues. \"Read logon events from domain controllers\" is server monitoring. \"Wireless controller or NAC sends login messages\" is a syslog listener with a parse profile. \"Remote users\" is GlobalProtect. \"Custom script or orchestration platform\" is the XML API. \"Many users share one IP\" is the terminal server agent. \"Groups from Entra ID or Okta\" points to the Cloud Identity Engine, and \"rule references a group but never matches\" points to the group include list."
  ],
  "analogy": "User-ID is like a hotel front desk that keeps a board of which guest is in which room. The desk learns from several sources: the check-in log (server monitoring), calls from the parking garage attendant (syslog listener), guests who arrive with a reservation code (GlobalProtect), and a booking app that pushes updates (XML API). A separate guest directory lists which tour group each guest belongs to (group mapping or the Cloud Identity Engine). The analogy stops at shared rooms: on a terminal server, many guests share one room, so the desk tracks them by bed number, which is the source port range.",
  "terms": [
   [
    "Server monitoring",
    "User-ID collection of logon events from domain controllers, Exchange or eDirectory by the integrated or Windows User-ID agent."
   ],
   [
    "Syslog parse profile",
    "Regex or field rules that extract username and IP address from third-party syslog messages."
   ],
   [
    "Terminal server agent",
    "A User-ID component that maps users on shared multi-user hosts by source port range."
   ],
   [
    "XML API (User-ID)",
    "An interface that lets scripts and third-party systems push login, logout and tag information to the firewall."
   ],
   [
    "Group mapping",
    "Retrieving directory group membership, usually via LDAP, so policy can reference groups."
   ],
   [
    "Group include list",
    "The set of directory groups the firewall retrieves for use in policy."
   ],
   [
    "Cloud Identity Engine",
    "A Palo Alto Networks cloud service that syncs users and groups from directories and IdPs and provides cloud authentication."
   ]
  ],
  "example": "Staff connect through a Wi-Fi controller using 802.1X, but those logins do not touch the domain controllers, so many IPs show as unknown. You configure the controller to send authentication syslog to the firewall, write a syslog parse profile that extracts user and IP, and the Wi-Fi users now appear in logs and match group-based rules, confirmed with show user ip-user-mapping all.",
  "mistakes": [
   [
    "Giving the User-ID service account Domain Admin rights so it can read every log.",
    "It only needs to read security event logs, for example through the Event Log Readers group. Excess rights create a high-value target."
   ],
   [
    "Assuming mappings apply everywhere once a source is configured.",
    "User-ID is applied only to traffic from zones with Enable User Identification checked."
   ],
   [
    "Writing a rule for a directory group that never matches and blaming the User-ID agent.",
    "If the group mapping uses an include list, the group must be on it; otherwise the firewall never retrieves its members."
   ],
   [
    "Planning LDAP group mapping for an organization that uses only a cloud directory.",
    "Cloud-only directories may have no LDAP interface. Use the Cloud Identity Engine to sync users and groups."
   ]
  ],
  "tryit": [
   [
    "Stonebridge Logistics runs a custom warehouse app that knows exactly which operator logs in at each scanning station, but those logins never reach Active Directory. The developers can write code but cannot change the network gear. Which User-ID source fits best, and why not a syslog listener?",
    "Use the XML API: the app can push login and logout events with the station IP and username directly to the firewall. A syslog listener would also work only if the app emitted syslog in a parseable format, which needs a parse profile and still depends on the message layout; with developers available, the XML API is the cleaner, purpose-built integration."
   ],
   [
    "A hospital has twenty clinicians working on one shared Remote Desktop server. All their sessions to the Internet show the same source IP, and policy must treat doctors and nurses differently. What User-ID component solves this?",
    "A terminal server agent on the Remote Desktop server. It assigns each user a range of source ports, so the firewall can tell users apart even though they share one IP address."
   ]
  ],
  "tip": "Server monitoring reads DC security logs; syslog listeners parse third-party messages; GlobalProtect is best for remote users; the XML API is for scripts. Group mapping needs LDAP or the Cloud Identity Engine, and any group used in policy must be on the include list when one is defined.",
  "check": [
   [
    "Which User-ID source suits a NAC system that logs user authentications?",
    "A syslog listener with a syslog parse profile for that system's messages."
   ],
   [
    "Why use the Cloud Identity Engine for an organization using only Microsoft Entra ID?",
    "It syncs cloud directory users and groups for policy without needing an LDAP connection to an on-premises directory."
   ],
   [
    "How does User-ID handle a terminal server with many users on one IP?",
    "A terminal server agent maps users to source port ranges instead of the shared IP."
   ],
   [
    "What permission should the server monitoring account have?",
    "Rights to read security event logs, such as the Event Log Readers group, not domain admin."
   ],
   [
    "Users have mappings, but the zone's traffic still shows unknown users. What setting should you check?",
    "Enable User Identification on that source zone."
   ]
  ]
 },
 {
  "t": "Management plane: permitted IPs, service routes, candidate vs running config, commits, partial commits, config locks and named snapshots",
  "hook": "It is Friday at 4:30 p.m. at Copperfield Retail, and Sam has just finished a NAT change for the new store. He clicks Commit and, a minute later, the help desk lights up: half the branch traffic is being dropped. The commit also pushed Ana's half-built security rules, which she had left in the configuration before heading to a meeting. Sam wants to roll back, but he is not sure whether loading last week's configuration will take effect immediately. Meanwhile, an audit note on his desk says the management web interface can be reached from any internal subnet. How do candidate and running configurations, commits, locks and snapshots work, and who should be able to reach the management plane at all?",
  "simple": "A firewall has two brains working side by side. One handles the traffic flowing through it. The other handles management: the login pages, settings and logs. Keeping them separate means a busy network cannot lock you out. When you change settings, you are editing a draft copy, like a document with unsaved changes. Nothing happens on the network until you press a button called commit, which checks the draft and makes it live. If several people edit at once, you can commit only your own changes, or put a lock on the draft so nobody else changes it. You can also save named copies of the settings, like saving a backup file before a big change, and bring them back later.",
  "body": [
   "Palo Alto Networks firewalls separate the management plane, which runs the web interface, command-line interface (CLI), logging, reporting and configuration, from the data plane, which processes traffic. The separation means a busy data plane does not lock you out of management, and heavy management tasks such as report generation do not slow traffic. Protecting and operating the management plane carefully is basic hygiene and a favorite exam area, because a compromised management interface means a compromised firewall, and an unplanned commit can take down a network as surely as an attack.",
   "Start with access. The dedicated MGT interface (Device > Setup > Interfaces > Management) has its own IP address, the services it allows (HTTPS, SSH, ping, SNMP, User-ID and so on), and a Permitted IP Addresses list. Only listed addresses or subnets can reach those services; if the list is empty, any host that can route to the interface can reach them. Best practice is to keep management on an isolated network, disable HTTP and Telnet, restrict permitted IPs to administrator jump hosts, require strong authentication, and never expose management to the Internet. Data interfaces can also allow management through an interface management profile, which has its own permitted IP list; avoid attaching such a profile to an Internet-facing interface.",
   "Service routes decide which interface the management plane uses to reach external services such as DNS, NTP, Palo Alto Networks update servers, syslog, email and authentication servers. By default the firewall uses the MGT interface for all of them. If the MGT network cannot reach a service, for example because the management network is isolated from the Internet, configure a service route on a data interface under Device > Setup > Services > Service Route Configuration, choosing the source interface and source address per service. A firewall that cannot download updates or reach its RADIUS server, while traffic flows fine, often has a service route problem.",
   "The firewall keeps two configurations. The candidate configuration is what you edit in the web interface or CLI configure mode; changes there do nothing yet. The running configuration is what the firewall is actually enforcing. A commit validates the candidate and makes it running. Before committing you can use Preview Changes to see a diff between running and candidate, Validate to check for errors without applying anything, and Change Summary to see what changed and who changed it. A partial commit applies only some changes, for example only those made by specific administrators, which prevents one admin from accidentally committing another's unfinished work. In the CLI, `commit partial admin <name>` does the same, and `show jobs all` tracks commit jobs and their results.",
   "Locks coordinate multiple admins. A config lock stops other admins from changing the candidate configuration; a commit lock stops others from committing. Locks are set from the lock icon at the top of the web interface, and superusers can remove other admins' locks. Automatically acquiring a commit lock when you start editing is an optional setting. Locks are a courtesy tool for teams: they prevent collisions, but a forgotten lock blocks everyone else until the owner or a superuser removes it.",
   "Named configuration snapshots protect you from mistakes. Under Device > Setup > Operations you can Save named configuration snapshot (writes the candidate to a named file), Load named configuration snapshot (replaces the candidate with it), Revert to running configuration (discard uncommitted changes), Load configuration version (bring an earlier committed version back into the candidate), and Export or Import to move files off and onto the box. The rule to remember is that loading a snapshot or version changes only the candidate; nothing takes effect until you commit. In the CLI, `save config to <filename>` writes a snapshot and `load config from <filename>` loads one, and again neither commits.",
   "The distinctions the exam tests come in pairs: candidate versus running, save versus commit, revert versus load, and config lock versus commit lock. Saving a snapshot does not apply anything; committing does. Reverting throws away uncommitted edits; loading a version brings back an older committed state into the candidate, which you then commit. A config lock protects editing; a commit lock protects committing.",
   "Consider a worked example. At Copperfield Retail, the right workflow would have been: Sam opens Commit, sets the scope to changes made by his own account, previews the diff and commits, so his NAT rule goes live and Ana's work stays pending. To recover now, Sam loads the configuration version from before his commit, which places it in the candidate, re-applies his NAT change, previews, and commits only once the diff looks right; Ana's rules can be rebuilt from her notes. Before the next weekend's upgrade, Sam saves a named snapshot `pre-upgrade-oct` and exports it with the device state to the team's file share. Finally, he edits the MGT interface's Permitted IP Addresses to allow only the two admin jump hosts, closing the audit finding.",
   "Watch for the common mistakes. People believe a loaded snapshot is live without a commit, commit everything and push a colleague's unfinished rules, expose HTTPS management on an Internet-facing data interface, leave the permitted IP list empty so any host can reach the login page, and forget that `save` in the CLI writes a snapshot but does not commit. Another is holding a config lock and going home, blocking the whole team. Exam clues follow the same lines: \"changes made but firewall behavior unchanged\" points to no commit, \"only commit my changes\" is a partial commit, \"prevent others from editing while I work\" is a config lock, \"discard all uncommitted changes\" is Revert to running configuration, \"go back to last week's committed configuration\" is Load configuration version followed by a commit, and \"limit who can reach the web UI\" is Permitted IP Addresses."
  ],
  "analogy": "The candidate and running configurations are like a shared document with a draft mode and a published version. Everyone edits the draft, and readers see only the published page until someone clicks Publish, the commit. A partial commit is publishing only your own paragraphs, and a config lock is checking out the document so nobody else can type. Named snapshots are saved copies you can reopen as the draft. The analogy breaks at one point: on the firewall, publishing triggers validation and can be refused, and the Permitted IP list decides who may even open the document.",
  "terms": [
   [
    "Management plane",
    "The part of the firewall that runs the web interface, CLI, logging and configuration, separate from traffic processing in the data plane."
   ],
   [
    "Permitted IP Addresses",
    "A list on the MGT interface or an interface management profile limiting which hosts can reach management services."
   ],
   [
    "Service route",
    "A setting that chooses which interface and source address the management plane uses to reach services such as DNS, NTP, updates and syslog."
   ],
   [
    "Candidate configuration",
    "The editable copy of the configuration that takes effect only after a commit."
   ],
   [
    "Running configuration",
    "The configuration the firewall is currently enforcing."
   ],
   [
    "Partial commit",
    "A commit of only selected changes, such as those made by specific administrators."
   ],
   [
    "Config lock",
    "A lock preventing other administrators from changing the candidate configuration."
   ],
   [
    "Named snapshot",
    "A saved, named copy of the configuration that can later be loaded into the candidate."
   ]
  ],
  "example": "Two admins edit the same firewall. Priya has finished a NAT change, while Sam's half-built security rules are still in the candidate. Priya uses Commit with the scope limited to her own changes, so her NAT rule goes live and Sam's work stays pending until he is ready. Before the next upgrade, Sam saves and exports a named snapshot as a rollback point.",
  "mistakes": [
   [
    "Loading a named snapshot and expecting the firewall's behavior to change right away.",
    "Loading replaces only the candidate configuration. You must commit to make it running."
   ],
   [
    "Clicking Commit with the default scope while a colleague has unfinished changes in the candidate.",
    "That pushes everyone's changes. Use a partial commit limited to your own administrator account."
   ],
   [
    "Choosing Revert to running configuration to return to last week's settings.",
    "Revert only discards uncommitted changes. To return to an earlier committed state, use Load configuration version, then commit."
   ],
   [
    "Leaving the MGT Permitted IP Addresses list empty because the management network is internal.",
    "An empty list allows any host that can route to the interface. Restrict it to administrator jump hosts or management subnets."
   ]
  ],
  "tryit": [
   [
    "Garnet Valley Water keeps its firewall's MGT interface on an isolated management network with no Internet access. After deployment, dynamic updates fail and the firewall cannot reach the NTP server, but user traffic flows normally. What should the engineer configure?",
    "Service routes. Under Device > Setup > Services, configure service routes so update, DNS and NTP traffic sources from a data interface that can reach those services. The data plane works fine, which shows the problem lies with the management plane's path to external services, not with traffic forwarding."
   ],
   [
    "Two engineers at Mapleton Transit are editing the same firewall. Leah is building a large set of new rules over several hours and wants to make sure nobody else changes the candidate configuration or commits her half-finished work. What should she use?",
    "A config lock to stop others from editing the candidate, and a commit lock to stop others from committing. She must remember to release both when finished, or a superuser will have to remove them."
   ]
  ],
  "tip": "Loading or reverting a snapshot changes only the candidate; you still need to commit. Permitted IPs on the MGT interface are the main control over who can reach management, and service routes control how the management plane reaches outside services.",
  "check": [
   [
    "You loaded a named snapshot but the firewall behavior is unchanged. Why?",
    "Loading a snapshot replaces the candidate configuration only; you must commit to make it running."
   ],
   [
    "How do you discard all uncommitted changes?",
    "Revert to running configuration."
   ],
   [
    "Which setting limits which hosts can reach the MGT interface's web UI?",
    "The Permitted IP Addresses list on the management interface settings."
   ],
   [
    "What is the difference between a config lock and a commit lock?",
    "A config lock stops others from editing the candidate; a commit lock stops others from committing."
   ],
   [
    "The firewall cannot download content updates from an isolated management network. What do you configure?",
    "A service route that sends update traffic through a data interface with Internet access."
   ]
  ]
 },
 {
  "t": "Web proxy (explicit and transparent) on supported PAN-OS 11.x platforms",
  "hook": "The lease on the old proxy appliance at Cedar Ridge Health ends in thirty days, and Priya, the network engineer, has been told to retire it. Every browser in the hospital reaches the web through a PAC file that points at that box, and every request carries a Kerberos identity that the compliance team relies on for its monthly web usage report. The new firewalls are already in the path. Priya wonders whether they can simply take over the proxy role, or whether she is about to break two thousand browsers and the audit trail at the same time. Can the firewall be the proxy, and which kind should it be?",
  "simple": "A proxy is a middleman for web browsing. Instead of your computer talking straight to a website, it hands the request to the proxy, and the proxy fetches the page for you. With an explicit proxy, your computer knows the middleman exists because someone set it up, often with a small settings file called a PAC file, and the middleman can ask who you are before helping. With a transparent proxy, nothing is set up on your computer; the middleman simply stands in the hallway every request already walks through. Think of a mailroom: you can hand letters to the clerk on purpose (explicit), or the clerk can quietly pick up every letter dropped in the outgoing tray (transparent). Newer firewall software on supported models can play either role.",
  "body": [
   "Many organizations have long run separate web proxies: browsers send web requests to a proxy that authenticates the user, inspects the request and forwards it to the destination. PAN-OS 11.x added a web proxy feature on supported platforms so the firewall itself can play that role. The goal is to help customers consolidate or migrate off legacy proxy appliances without rebuilding every workflow that assumes a proxy exists. Support depends on the hardware or VM model and the PAN-OS release, so check the compatibility information before planning rather than assuming every firewall can do it. A design that relies on a feature the platform lacks fails on the day of cutover, not on paper.",
   "Start with the explicit proxy, the one clients know about. Browsers or operating systems are configured, manually or with a PAC (proxy auto-config) file, to send web requests to the proxy's IP address and listening port. For plain HTTP the browser sends the full request to the proxy. For HTTPS, the client sends an HTTP CONNECT request, such as `CONNECT www.example.com:443`, asking the proxy to open a tunnel to the destination. Because the client knowingly talks to the proxy, the proxy can challenge it for authentication, typically with Kerberos for domain-joined machines or SAML (Security Assertion Markup Language) through an identity provider, often via the Cloud Identity Engine. Explicit proxy is useful when every web request must be attributed to a user, and where the firewall is not otherwise in the traffic path.",
   "A transparent proxy works the other way around: it intercepts web traffic without any client configuration. The firewall sits in the traffic path, and traffic destined for web ports is redirected into the proxy function. Users do not know a proxy exists, which avoids distributing PAC files and touching endpoint settings. The price is that it relies on routing traffic through the firewall, and user identity comes from other methods, such as User-ID mappings, rather than a proxy authentication challenge. A browser that does not know it is talking to a proxy has no reason to answer a proxy login prompt, which is why identity has to come from somewhere else.",
   "Setup is done in the web proxy configuration, found under Network > Proxy on supported releases. Expect to provide a loopback interface for the proxy, a DNS proxy object that the proxy uses for name resolution, the listening port for explicit mode, the authentication method, and the zones for proxy traffic. Each piece has a job: the loopback gives the proxy a stable address clients and PAC files can point at, and the DNS proxy lets it resolve the destination names it receives. Security policy still applies. Rules must allow the proxied traffic, and URL filtering, threat prevention and WildFire profiles do their normal jobs on it. To inspect HTTPS content rather than just see the domain in the CONNECT request or the SNI (Server Name Indication) field of the TLS handshake, you still need a decryption policy.",
   "How does this relate to the normal firewall? A regular next-generation firewall inspects traffic in line without being a proxy endpoint; clients connect to servers and the firewall watches and enforces in the middle. The web proxy is an additional way of handling web traffic that preserves proxy-dependent workflows, such as PAC files, proxy authentication and applications hard-coded to use a proxy. Choose explicit when clients must be steered to the proxy and authenticated there, or when the firewall is not in the default path. Choose transparent when you cannot touch client settings and the firewall already sits in the path. Neither mode replaces the core App-ID and Content-ID inspection; both feed traffic into it.",
   "Consider a worked example. A company is retiring an old proxy appliance that browsers reach through a PAC file with Kerberos authentication. On a supported firewall running a PAN-OS 11.x release with web proxy support, the team creates a loopback interface in a Proxy zone, a DNS proxy for resolution, and an explicit proxy listening on the same port the old appliance used, with Kerberos as the authentication method. They update the PAC file to point at the loopback's address, add a decryption rule for general web categories, and keep their user-based URL filtering rules. Browsers need no changes beyond the PAC update, and the Traffic and URL Filtering logs show usernames for every request, which keeps the compliance report intact.",
   "Several mistakes come up again and again: assuming every model and release supports the web proxy, forgetting the DNS proxy the proxy depends on, expecting transparent mode to prompt users for credentials, and believing the proxy inspects HTTPS content without decryption. Another is updating the proxy but not the PAC file, so clients keep sending traffic to the old appliance. When troubleshooting, work from the client outward. Check that clients really use the PAC file, that DNS resolution through the DNS proxy works, that authentication succeeded, and then review Traffic and URL Filtering logs for the proxied sessions. If the logs show no sessions at all, the clients are not reaching the proxy; if they show sessions without usernames, look at authentication.",
   "Exam questions use these clues. 'Clients configured with a PAC file' or 'proxy authentication with Kerberos or SAML' point to explicit proxy. 'No client changes' or 'intercept in the path' point to transparent proxy. 'Migrate off a legacy proxy appliance' points to the web proxy feature on a supported platform. 'See HTTPS content' still requires decryption, and 'required components' include a loopback interface and a DNS proxy. When an answer choice claims a proxy mode removes the need for decryption or works on every platform, treat it as a distractor."
  ],
  "analogy": "An explicit proxy is like a hotel concierge you walk up to and ask to book a table: you know they are there, and they can ask for your room number before helping. A transparent proxy is like a mail clerk who quietly sorts every letter dropped in the outgoing tray; you never speak to them, so they cannot ask who you are. The analogy stops at sealed envelopes: neither the concierge nor the clerk can read inside a sealed letter, just as neither proxy mode sees HTTPS content without decryption.",
  "terms": [
   [
    "Explicit proxy",
    "A proxy that clients are configured to use, directly or via a PAC file, sending requests to its IP address and port."
   ],
   [
    "Transparent proxy",
    "A proxy that intercepts web traffic in the path without any client configuration."
   ],
   [
    "PAC file",
    "A proxy auto-config script that tells browsers which proxy to use for which destinations."
   ],
   [
    "HTTP CONNECT",
    "The method an explicit proxy client uses to ask the proxy to open a tunnel to an HTTPS destination."
   ],
   [
    "Proxy authentication",
    "Challenging a client that talks to an explicit proxy to prove its identity, commonly with Kerberos or SAML."
   ],
   [
    "DNS proxy object",
    "The firewall DNS proxy configuration that the web proxy uses to resolve destination names."
   ],
   [
    "Loopback interface",
    "A logical interface that gives the web proxy a stable address for clients and PAC files to target."
   ]
  ],
  "example": "A company is retiring an old proxy appliance that browsers reach through a PAC file with Kerberos authentication. On a supported firewall running PAN-OS 11.x, the team configures an explicit web proxy on a loopback with a DNS proxy and Kerberos, updates the PAC file to point at the firewall's proxy address, and keeps user-based URL filtering working without changing browser settings.",
  "mistakes": [
   [
    "Transparent proxy will prompt users to log in, just like the old explicit proxy did.",
    "Clients do not know a transparent proxy exists, so identity comes from User-ID mappings rather than a proxy authentication challenge. If proxy authentication is required, choose explicit mode."
   ],
   [
    "Running traffic through the web proxy means the firewall can now see inside HTTPS.",
    "Without a decryption policy the firewall sees only the domain from the CONNECT request or the SNI. Content inspection of HTTPS still requires decryption."
   ],
   [
    "Any firewall on PAN-OS 11.x can run the web proxy.",
    "Support depends on the specific platform and release. Check compatibility information before you design around the feature."
   ],
   [
    "Once the firewall proxy is configured, the migration is finished.",
    "If the PAC file still points at the old appliance, clients keep using it. Updating the PAC file is part of the cutover."
   ]
  ],
  "tryit": [
   [
    "Lakeview College wants to replace its proxy, but the IT team cannot change settings on student-owned laptops, and all campus traffic already passes through the firewall. The security team is content with identity from existing User-ID mappings. Which web proxy mode fits, and what must they add to inspect the contents of HTTPS sites?",
    "Transparent proxy fits, because it needs no client configuration and the firewall is already in the path. To inspect HTTPS content they still need a decryption policy; the proxy alone sees only domains."
   ],
   [
    "A firm's firewall is not in the default path for one office subnet, and auditors require every web request to carry a username verified by the corporate identity provider. Which mode do you recommend?",
    "Explicit proxy with SAML (or Kerberos for domain machines). Clients are steered to the proxy with a PAC file, so the firewall does not have to be in the default path, and the proxy can challenge each client to authenticate."
   ]
  ],
  "tip": "Explicit means clients are configured (PAC file or settings) and can be challenged for authentication; transparent means no client changes. The feature depends on platform and release, needs a loopback interface and a DNS proxy, and HTTPS content inspection still needs decryption.",
  "check": [
   [
    "What distinguishes an explicit proxy from a transparent one?",
    "Clients are configured to send requests to an explicit proxy; a transparent proxy intercepts traffic without client configuration."
   ],
   [
    "Which proxy mode naturally supports prompting users to authenticate to the proxy?",
    "Explicit proxy, commonly with Kerberos or SAML, because the client knowingly talks to it."
   ],
   [
    "Does using the web proxy remove the need for decryption to inspect HTTPS content?",
    "No. Without decryption the firewall sees only the requested domain, not the encrypted content."
   ],
   [
    "Which supporting objects does the web proxy configuration expect?",
    "A loopback interface for the proxy and a DNS proxy for name resolution, plus zones and an authentication method for explicit mode."
   ]
  ]
 },
 {
  "t": "Panorama: device groups and hierarchy, pre-rules and post-rules, templates, template stacks, template variables and overrides",
  "hook": "It is Monday morning at Bluefin Outfitters, a chain of 300 stores, and Marco has inherited the Panorama server from a colleague who left on Friday. A ticket says store 147 cannot reach the new payment processor, and the security lead wants a company-wide block on a risky URL category by noon that no store admin can switch off. Marco opens Panorama and sees device groups nested three levels deep, a handful of template stacks, and little orange override icons scattered across store firewalls. Where does the block rule belong, where does the store's subnet live, and why does store 147 look different from the rest?",
  "simple": "Panorama is one control center for many firewalls. It keeps two kinds of settings in two kinds of folders. Device groups hold the rules about what traffic is allowed, plus the named objects those rules use. Templates hold the setup of the box itself: its network ports, zones, DNS servers and logging. Panorama rules can sit before the firewall's own local rules (pre-rules, which the local admin cannot get around) or after them (post-rules, a final safety net). Variables let one template fit many firewalls that need different addresses. Picture a school district: the district sets rules every school must follow, each school can add its own, and every school building has its own street address even though the floor plan is identical.",
  "body": [
   "Panorama is the centralized management platform for Palo Alto Networks firewalls. It lets you write policy once, push it to hundreds of devices, and see logs from all of them in one place. It splits configuration into two families: device groups for policies and objects, and templates for network and device settings. Keeping these straight is essential for the exam and for avoiding a messy fleet, because nearly every Panorama question starts with knowing which family a setting belongs to.",
   "Start with device groups. A device group contains firewalls that share policy, such as all branch firewalls. It holds security, NAT, decryption, PBF (policy-based forwarding) and other rules, plus address, service and security profile objects. Device groups form a hierarchy under the Shared location: Shared at the top, then parent device groups, then children, several levels deep. Objects and rules defined higher up are inherited by lower groups, so you can define company-wide rules once and region-specific rules below. A child can override an inherited object value when the object allows it, and each firewall belongs to exactly one device group. In the Panorama web interface you pick the device group from a drop-down at the top of the Policies and Objects tabs, which is a quick reminder that those tabs are device group territory.",
   "Next comes rule placement. Panorama rules are placed before or after the firewall's own local rules. Pre-rules are evaluated first and cannot be overridden locally; they are ideal for company-wide blocks. Post-rules come after local rules and just above the default rules; they suit catch-all logging or cleanup rules. The full evaluation order on a managed firewall is: Shared pre-rules, ancestor device group pre-rules, the firewall's own device group pre-rules, local firewall rules, the device group post-rules, ancestor post-rules, Shared post-rules, then the intrazone and interzone defaults. Notice the symmetry: pre-rules run from the most general (Shared) to the most specific, and post-rules run back out from the most specific to Shared. Local admins can see Panorama rules but not edit them, which is exactly what makes pre-rules useful for mandatory controls.",
   "Templates cover the other half of the firewall. They configure the settings on the firewall's Network and Device tabs: interfaces, zones, virtual routers, VPN, HA (high availability), server profiles, log settings and so on. A template stack combines several templates, for example a global template for DNS and NTP (Network Time Protocol), a regional template for syslog servers, and a model-specific template for interfaces. Templates in a stack have an order, and when two templates configure the same setting, the one higher in the list wins. You assign firewalls to the stack, not directly to individual templates. The stack itself can also hold configuration that overrides its member templates, which is handy for a setting that applies only to that combination.",
   "Template variables make shared templates work for many firewalls whose values differ. You write a variable like `$mgmt-dns` or `$branch-lan-ip` in the template, then give each firewall its own value in the template stack's per-device variable settings, using Manage Variables or a CSV import for many devices. One template can then serve a hundred branches, each with its own addresses. Overrides allow local deviations: a firewall admin can override a template-pushed value locally, shown with an override icon, unless you have set the template to prevent it. Overridden local values win over the template until someone reverts the override. Excessive overrides make fleets inconsistent, so use variables where values legitimately differ, and review the override icons on template-managed settings regularly so exceptions do not become permanent by accident.",
   "Consider a worked example. A retailer has 300 stores with identical designs but different subnets. The engineer builds one Store template with variables for the LAN IP and gateway, stacks it below a Global template for DNS, NTP and logging, and assigns all store firewalls to the Store-Stack. Policy lives in a Stores device group under a Retail parent. Shared pre-rules block high-risk URL categories everywhere, the Stores group adds point-of-sale rules, and a Shared post-rule denies and logs everything else. Each store gets its own variable values and the same policy. When one store looks different, the first places to check are local overrides on its template settings and any local rules sitting between the pre-rules and post-rules.",
   "Several mistakes come up repeatedly: looking for interfaces in a device group or security rules in a template, assuming the lower template in a stack wins, expecting local rules to override pre-rules, copying a template per site instead of using variables, and letting local overrides pile up unnoticed. Another is forgetting that Panorama rules only exist on the firewall after a push, which the next lesson covers. A useful habit is to ask two questions of any setting: is it policy or an object (device group), or is it part of the device's network and system setup (template)?",
   "Exam questions use these clues. 'Policies and objects for a set of firewalls' is a device group. 'Interfaces, zones, DNS, server profiles' is a template. 'Combine global, regional and model templates' is a template stack. 'Same template, different IPs per firewall' is template variables. 'Company rule that local admins cannot bypass' is a Shared or device group pre-rule, and 'catch-all logging just above the defaults' is a post-rule. 'A value on one firewall differs from the template' points to a local override."
  ],
  "analogy": "Think of a sandwich. Panorama pre-rules are the top slice of bread, post-rules are the bottom slice, and the firewall's local rules are the filling in between; the defaults are the plate underneath. The local admin can change the filling but never the bread. Templates are different: they are the kitchen itself, its plumbing and wiring, built from blueprints stacked in priority order. The analogy stops at inheritance, because real bread does not pass down through parent and child bakeries the way Shared and ancestor rules do.",
  "mnemonic": "Policy order is a mirror: Shared, Parent, Group, Local, Group, Parent, Shared, then Defaults. Say 'SPG, Local, GPS, Defaults': pre-rules go Shared to Group, post-rules come back Group to Shared, like a GPS route home.",
  "terms": [
   [
    "Device group",
    "A Panorama container of firewalls sharing policies and objects, arranged in a hierarchy under Shared."
   ],
   [
    "Shared location",
    "The top of the device group hierarchy, whose objects and rules are inherited by every device group."
   ],
   [
    "Pre-rules / post-rules",
    "Panorama rules evaluated before, or after, a firewall's local rules; local admins cannot edit them."
   ],
   [
    "Template",
    "Panorama configuration for the firewall's Network and Device tab settings, such as interfaces, zones and server profiles."
   ],
   [
    "Template stack",
    "An ordered combination of templates assigned to firewalls; higher templates win when settings conflict."
   ],
   [
    "Template variable",
    "A placeholder such as $dns-primary in a template whose value is set per firewall."
   ],
   [
    "Override",
    "A local firewall value that replaces a template-pushed value until the override is reverted."
   ]
  ],
  "example": "A retailer has 300 stores with identical designs but different subnets. The engineer builds one store template with variables for the LAN IP and gateway, stacks it under a global template for DNS, NTP and logging, and places Shared pre-rules blocking high-risk categories. Each store gets its own variable values and the same policy, and local admins cannot bypass the pre-rules.",
  "mistakes": [
   [
    "Interfaces and zones are configured in a device group.",
    "Device groups hold policies and objects. Interfaces, zones, routing and server profiles belong to templates, delivered through a template stack."
   ],
   [
    "In a template stack, the template at the bottom of the list wins because it is applied last.",
    "The template higher in the stack's list takes priority when two templates set the same value."
   ],
   [
    "A local admin can place a rule above a Panorama pre-rule to make an exception.",
    "Local rules are always evaluated after all pre-rules. Pre-rules cannot be overridden locally, which is why they suit mandatory controls."
   ],
   [
    "You need a separate template for each site because their IP addresses differ.",
    "Use template variables so one template serves many firewalls, with per-device values set in the template stack."
   ]
  ],
  "tryit": [
   [
    "Harbor Credit Union has a Shared pre-rule that blocks file-sharing applications. The Eastside branch device group has a pre-rule allowing one file-sharing app for a vendor, and a branch admin adds a local rule blocking that same app. Traffic from Eastside to the vendor app arrives. Which rule matches first, and why?",
    "The Shared pre-rule matches first, because Shared pre-rules are evaluated before device group pre-rules and before local rules. The vendor traffic is blocked. To permit it, the exception must be placed above the block within Shared pre-rules or the Shared rule must be scoped to exclude it."
   ],
   [
    "A template stack contains Global-Template (listed first) and Branch-Template (listed second). Both set a primary DNS server, with different values. One branch firewall shows a third value with an override icon. Which DNS server does that firewall use?",
    "The locally overridden value, because a local override wins over template values until it is reverted. Without the override, the value from Global-Template, which is higher in the stack, would apply."
   ]
  ],
  "tip": "Device groups = policy and objects; templates = Network and Device tabs. Pre-rules come before local rules and cannot be overridden locally. In a stack, the higher template wins, variables handle per-device values, and local overrides win until reverted.",
  "check": [
   [
    "Where would you configure interfaces and zones for 50 firewalls in Panorama?",
    "In a template, assigned to the firewalls through a template stack."
   ],
   [
    "Where does a local firewall rule fall relative to Panorama rules?",
    "After all pre-rules and before all post-rules."
   ],
   [
    "How do you use one template for many firewalls with different IPs?",
    "Use template variables and set each firewall's values in the template stack."
   ],
   [
    "Two templates in a stack set different DNS servers. Which value is used?",
    "The value from the template higher in the stack's order."
   ]
  ]
 },
 {
  "t": "Panorama commit and push workflow; Panorama modes (Panorama, Management Only, Log Collector) and version requirements",
  "hook": "At 4:40 p.m. the threat intelligence team at Northgate Logistics sends Aisha a list of malicious domains and asks for a block across all forty branches before end of day. She adds the rule in Panorama, clicks Commit, sees the green success message and heads home. At 6:15 p.m. her phone buzzes: an analyst says branch firewalls are still letting traffic reach one of those domains. Aisha is sure she committed the change. The Panorama audit trail agrees with her. So why is the rule nowhere to be found on the firewalls, and what did she miss?",
  "simple": "Panorama works in two steps. First you save your changes inside Panorama itself, which is called committing to Panorama. Nothing on the firewalls changes yet. Second, you send those changes out to the firewalls, which is called pushing. It is like writing an email and saving it as a draft versus actually pressing send. Panorama can also run in different jobs, called modes: managing firewalls and storing their logs, managing only, or storing logs only for another Panorama. One more rule keeps things working: the manager must be at least as new as the devices it manages, so you always upgrade Panorama first, the same way a teacher needs the newest textbook edition before teaching from it.",
  "body": [
   "Panorama has its own candidate and running configuration, just like a firewall, and it also holds configuration intended for managed devices. Changes therefore take two steps to reach a firewall, and forgetting the second step is one of the most common real-world mistakes. This lesson covers that workflow, the modes a Panorama appliance can run in, and the version rules that decide upgrade order. Together they explain most of the 'I changed it but nothing happened' tickets a Panorama administrator receives.",
   "Step one is Commit to Panorama. This validates your changes and makes them part of Panorama's running configuration, but nothing reaches the firewalls yet. Step two is Push to Devices, which sends device group and template configuration to the selected firewalls, and collector group configuration to Log Collectors. Each firewall then performs its own commit, so a push can succeed on most devices and fail on one whose local state conflicts. The Commit and Push option does both steps in sequence. You can edit the push scope to choose which device groups, templates and devices receive the push, and the Task Manager or Push Status shows per-device success, warnings and failures. Read those warnings; a push that completes with warnings can still leave a feature unconfigured on a device.",
   "Visibility tools help you confirm what actually happened. The Panorama > Managed Devices > Summary page shows whether each firewall's device group and template are In Sync or Out of Sync with Panorama, a quick way to find devices that missed a push, along with connection status and software versions. Preview Changes lets you see what a push will change on a device before sending it, which is the safest way to catch an unexpected deletion. If a local admin overrides a template setting, that device's configuration diverges until the override is reverted. Panorama can also be deployed as an HA (high availability) pair for resilience, and while Panorama manages a firewall, local changes are still possible, though best practice is to make shared changes centrally.",
   "Panorama runs in one of several modes, and each mode answers two questions: does it manage firewalls, and does it store logs? Panorama mode manages firewalls and also collects logs using its local Log Collector, on an M-Series appliance or a virtual appliance with log disks. Management Only mode manages devices but does not store firewall logs locally; logs go to dedicated Log Collectors or cloud logging. Log Collector mode turns the appliance into a dedicated log collector with no web interface for management; it is managed by a Panorama in Panorama or Management Only mode, and Log Collectors are grouped into collector groups for redundancy and scale. Older virtual deployments may also appear in a legacy mode. You change modes from the CLI (command-line interface) with commands such as `request system system-mode logger` or `request system system-mode management-only`, and the change reboots the appliance.",
   "Version requirements follow one rule: Panorama must run the same or a later release than the firewalls it manages. That means you upgrade Panorama first, then firewalls. Dedicated Log Collectors should run the same release as the Panorama managing them, so in a large deployment you upgrade Panorama, then its Log Collectors, then the firewalls, checking each stage before moving on. If Panorama is an HA pair, both peers are upgraded before you touch the managed devices. Panorama plugins, such as those for cloud or Kubernetes integrations, have their own compatibility requirements to check. The distinctions the exam tests are between committing and pushing, and between managing and collecting: Management Only manages without logs, Log Collector collects without managing.",
   "Consider a worked example. An engineer adds a block rule for a new malicious domain list to the Branches device group and clicks Commit to Panorama. An hour later the firewalls still allow the traffic. Managed Devices shows the Branches device group as Out of Sync on every branch firewall: the change was only committed to Panorama. The engineer uses Push to Devices with the scope set to the Branches device group, previews the change on one branch, watches the Push Status until each firewall reports success, and the rule takes effect. The status column then flips to In Sync, which is the confirmation to record in the change ticket.",
   "Several mistakes come up again and again: stopping after Commit to Panorama, pushing to the wrong scope and changing devices that were not ready, upgrading firewalls before Panorama, running Log Collectors on a different release from Panorama, and expecting to log in to a Log Collector's web interface. Another is switching an appliance's mode without planning, forgetting that the mode change reboots it and changes what it stores. Treat every mode change as a maintenance window event, and confirm where logs will go before and after.",
   "Exam questions use these clues. 'Changes committed but firewalls unchanged' points to a missing push. 'Out of Sync' points to Managed Devices and a push. 'Manages devices, stores no logs locally' is Management Only mode. 'Dedicated log storage with no management UI' is Log Collector mode. 'Can older Panorama manage newer firewalls?' is no, so Panorama is always upgraded first, and Log Collectors are kept on the same release as their Panorama."
  ],
  "analogy": "Commit to Panorama is like a head chef finalizing tonight's menu in the office; Push to Devices is printing it and handing it to every kitchen line. Until the menus are handed out, cooks keep making yesterday's dishes. The modes are kitchen roles: the head chef who also runs the pantry (Panorama mode), the head chef who only plans (Management Only), and the pantry clerk who stores supplies but never writes menus (Log Collector). The analogy stops at upgrades: in Panorama, the planner must always be on the newest version before the kitchens.",
  "mnemonic": "Upgrade order is 'P-L-F', Panorama, Log Collectors, Firewalls: the manager first, its log storage next, the managed devices last. Changes flow 'Commit, then Push': C comes before P in the alphabet.",
  "terms": [
   [
    "Commit to Panorama",
    "Makes changes part of Panorama's running configuration without sending them to firewalls."
   ],
   [
    "Push to Devices",
    "Sends device group, template or collector group configuration from Panorama to managed devices."
   ],
   [
    "Commit and Push",
    "A single action that commits to Panorama and then pushes to the selected devices."
   ],
   [
    "Panorama mode",
    "The mode in which Panorama both manages devices and stores logs with its local Log Collector."
   ],
   [
    "Management Only mode",
    "Panorama mode that manages devices but stores no firewall logs locally."
   ],
   [
    "Log Collector mode",
    "Mode that makes an appliance a dedicated log collector managed by another Panorama, with no management web interface."
   ],
   [
    "Collector group",
    "A set of Log Collectors that share log storage for redundancy and scale."
   ],
   [
    "In Sync / Out of Sync",
    "Managed Devices status showing whether a firewall's device group and template match Panorama's committed configuration."
   ]
  ],
  "example": "An engineer adds a block rule for a new malicious domain list in Panorama and commits. An hour later the firewalls still allow the traffic. Managed Devices shows the device group Out of Sync: the change was only committed to Panorama. A Push to Devices for that device group fixes it, and the Push Status confirms each firewall committed successfully.",
  "mistakes": [
   [
    "A successful Commit to Panorama means the firewalls are updated.",
    "Commit to Panorama only updates Panorama's own running configuration. A Push to Devices (or Commit and Push) is needed to send it to firewalls."
   ],
   [
    "You can upgrade firewalls first and Panorama later, as long as you do it in the same week.",
    "Panorama must run the same or a later release than its managed firewalls, so it is always upgraded first, followed by Log Collectors, then firewalls."
   ],
   [
    "Management Only mode is the one that stores logs without managing.",
    "It is the reverse: Management Only manages devices without storing logs locally. Log Collector mode stores logs without managing."
   ],
   [
    "You can log in to a dedicated Log Collector's web interface to check its settings.",
    "Log Collector mode has no management web interface; it is configured and monitored from the Panorama that manages it."
   ]
  ],
  "tryit": [
   [
    "Silverline Bank runs Panorama on one release with eight dedicated Log Collectors and 120 firewalls. A new firewall release fixes a bug affecting the branches, and the branch team wants to upgrade tonight. Panorama and the Log Collectors are still on the older release. What do you tell them?",
    "Upgrade Panorama first, then the Log Collectors to match Panorama, and only then the firewalls. An older Panorama cannot manage firewalls on a newer release, and Log Collectors should run the same release as their Panorama."
   ],
   [
    "A company wants its existing Panorama to keep managing firewalls, but all logs will now go to a new set of dedicated collectors. Which mode should the existing Panorama use, and what happens when you change it?",
    "Management Only mode, which manages devices without storing firewall logs locally. Changing the mode is done from the CLI and reboots the appliance, so it needs a maintenance window."
   ]
  ],
  "tip": "Commit to Panorama is not enough; you must also push. Panorama must be on the same or newer release than its firewalls, so it is always upgraded first, then Log Collectors, then firewalls. Log Collector mode has no management web UI.",
  "check": [
   [
    "What does Commit and Push do?",
    "Commits changes to Panorama, then pushes the resulting configuration to the selected devices."
   ],
   [
    "Which Panorama mode manages devices but relies on dedicated log collectors for logs?",
    "Management Only mode."
   ],
   [
    "Can a Panorama running an older release manage a firewall on a newer release?",
    "No, Panorama must run the same or a later release than its managed firewalls."
   ],
   [
    "Where do you see which firewalls missed a push?",
    "Panorama > Managed Devices, where device group and template status show In Sync or Out of Sync."
   ]
  ]
 },
 {
  "t": "PAN-OS XML API (keygen, config, op, commit) and REST API; API-only admin role profiles",
  "hook": "During a quarterly review at Maple Street Insurance, the auditor slides a printout across the table. It is a script from the security operations team that blocks attacker IP addresses on the firewalls, and near the top sits an API key belonging to the account named admin, a superuser. 'If someone copied this key,' the auditor asks Tomas, the firewall engineer, 'what could they do?' Tomas realizes the honest answer is anything at all. The script itself is useful and nobody wants to lose it. How can the team keep the automation and shrink what a leaked key could do to almost nothing?",
  "simple": "An API (application programming interface) is a way for one program to talk to another program instead of a person clicking buttons. A PAN-OS firewall has two of these. The older XML API can do nearly everything: read and change settings, run status commands, and make changes go live. The newer REST API uses a simpler style called JSON and covers objects and policies. A script first trades a username and password for a key, a long secret string, and then shows that key with every request. The key can only do what its account is allowed to do. So you give scripts their own account with a tightly limited role, like giving a house sitter a key that opens the front door and nothing else.",
  "body": [
   "Everything you do in the web interface is ultimately an API call, and PAN-OS exposes two APIs for automation. The XML API is the older, comprehensive one, covering configuration, operational commands, commits, logs, reports, User-ID and file transfers. The REST API offers JSON-based access to policies, objects, network and device configuration. Both run over HTTPS on the management interface, or on a data interface whose interface management profile allows HTTPS. Automation matters because it makes repeated changes consistent and lets security tools react faster than a human can, but every script is also a credential that must be protected.",
   "The XML API is organized by request type, set by the `type` parameter of requests to the `/api/` endpoint. First you get an API key with `type=keygen`, supplying a username and password, preferably in a POST body rather than the URL so credentials do not end up in web server or proxy logs. The firewall answers with an XML response containing a `<key>` element. The key is then sent with later requests, ideally in the `X-PAN-KEY` header rather than as a URL parameter. Using a dedicated service account means the key has only that account's rights, and every change made with it is recorded under that account's name.",
   "Configuration and operational requests are the workhorses. Configuration requests use `type=config` with an `action` and an `xpath` pointing at a node in the configuration tree. Common actions are get (read the candidate configuration), show (read the running configuration), set (add or merge), edit (replace), delete, rename, clone and move. Operational requests use `type=op` with a `cmd` parameter containing the CLI command expressed as XML, such as `<show><system><info></info></system></show>`. A handy trick is running `debug cli on` in the CLI, which prints the XML equivalent of commands you type. Commits use `type=commit`, optionally partial, and return a job ID that you poll with an op request such as `<show><jobs><id>42</id></jobs></show>` to check completion. Other types include log, report, export, import, user-id and version.",
   "Every response carries a status attribute, either `status=\"success\"` or `status=\"error\"` with a message explaining what went wrong, such as an invalid xpath or insufficient permissions. Scripts should check that attribute on every call rather than assuming success. The difference between set and edit deserves special care: set merges the supplied element into the node at the xpath, while edit replaces that node entirely, so an edit aimed at a parent container can silently remove the siblings you did not include.",
   "The REST API uses resource URLs with a version in the path, such as `/restapi/v11.0/Objects/Addresses`, with query parameters for location (for example `location=vsys&vsys=vsys1`) and name, and standard HTTP methods: GET to read, POST to create, PUT to edit, DELETE to remove. Bodies and responses are JSON. It is easy for developers who know JSON, but it does not cover everything; operations such as commit are done through the XML API. The firewall hosts API documentation and an API browser under its management address, which you can use to explore both APIs and copy correct xpaths.",
   "Security for API use comes from an API-only admin role profile. Create an admin role profile with every Web UI area disabled, Command Line set to none, and only the XML API types and REST API resources the script needs enabled. For a read-only log exporter, enable only XML API Log. For an address-object updater, enable Configuration and Commit and nothing else. Assign that profile to a dedicated administrator account, generate the key, and store it in a secrets manager. You can set an API key lifetime in the device authentication settings so keys expire, and use Expire All API Keys to revoke existing keys; generating a new key does not by itself invalidate older ones.",
   "Consider a worked example. A security team's orchestration tool must add attacker IPs to an address group. You create an admin role profile with web UI and CLI off and only XML API Configuration and Commit enabled, create `svc-soar` with it, and generate a key. The tool sends `type=config&action=set` with an xpath to `/config/devices/entry/vsys/entry[@name='vsys1']/address` and an element defining the new address object, adds it to the group, then sends `type=commit` and polls the job ID until it reports success. Every change appears in the Config log under `svc-soar`, so the audit trail shows exactly which tool did what.",
   "Several mistakes come up repeatedly: using a Superuser key in scripts, putting passwords in URLs, using edit when you meant set and wiping out siblings under the xpath, forgetting that config changes land in the candidate until a commit, and ignoring XML responses with `status=\"error\"`. Another is expecting the REST API to commit. Always test automation against a lab firewall first, and log the job IDs your scripts receive so a failed commit can be traced and retried instead of silently leaving changes in the candidate.",
   "Exam questions use these clues. 'Obtain an API key' is keygen. 'Read or change configuration at a path' is type=config with an xpath. 'Run a show command' is type=op. 'Make changes live' is type=commit and polling the job. 'JSON with GET, POST, PUT and DELETE on versioned URLs' is the REST API. 'Script must only read logs' points to an admin role profile with only XML API Log enabled, and 'revoke every existing key' points to Expire All API Keys."
  ],
  "analogy": "The XML API is like a building's master service desk with numbered windows: one window issues badges (keygen), one changes the floor plans (config), one answers questions about how the building is running (op), and one stamps plans as approved (commit). An API-only role is a badge that opens just the windows a courier needs. The analogy stops at the floor plans: changes made at the config window stay as drafts in the candidate configuration until someone visits the commit window.",
  "mnemonic": "The four core XML API request types, in the order a script uses them: 'Keys Configure Our Commits', keygen, config, op, commit. Get a key, change the configuration, check status with op, then commit.",
  "terms": [
   [
    "keygen",
    "The XML API request type that returns an API key for a username and password."
   ],
   [
    "XPath",
    "The path syntax the XML API uses to address a node in the configuration tree."
   ],
   [
    "set vs edit",
    "XML API config actions: set adds or merges at the xpath, edit replaces the node at the xpath."
   ],
   [
    "get vs show",
    "XML API config actions: get reads the candidate configuration, show reads the running configuration."
   ],
   [
    "type=op",
    "The XML API request type for running operational (non-configuration) commands expressed as XML."
   ],
   [
    "REST API",
    "The JSON-based PAN-OS API using versioned resource URLs and standard HTTP methods."
   ],
   [
    "API-only role",
    "An admin role profile with web UI and CLI disabled and only needed API permissions enabled."
   ],
   [
    "API key lifetime",
    "A device setting that makes API keys expire after a set period."
   ]
  ],
  "example": "A security team's orchestration tool must add attacker IPs to an address group. You create an admin role with web UI and CLI off and only XML API configuration and commit enabled, generate a key for that account, and the tool uses type=config action=set with an xpath to the address object, then type=commit, polling the job ID. Each change is traceable to the service account in the Config log.",
  "mistakes": [
   [
    "edit and set do the same thing, so either is fine for adding an object.",
    "set merges into the node at the xpath; edit replaces it. Using edit on a parent container can delete sibling entries that were not included in the element."
   ],
   [
    "Once a config request returns success, the change is live.",
    "Config requests change the candidate configuration. A type=commit request, followed by polling the job ID, makes the change running."
   ],
   [
    "The REST API can handle the whole workflow, including commit.",
    "The REST API covers objects, policies and other resources, but commit is performed through the XML API."
   ],
   [
    "Generating a new API key automatically invalidates the old one.",
    "Older keys keep working. Use an API key lifetime or Expire All API Keys to revoke them."
   ]
  ],
  "tryit": [
   [
    "Riverbend Clinic wants a nightly script that pulls threat logs into its reporting tool. The script runs on a shared server several teams can access. How should the script's account be set up, and why?",
    "Create a dedicated admin account with an admin role profile that disables the web UI and CLI and enables only XML API Log. Store its key in a secrets manager and consider an API key lifetime. If the key leaks, it can read logs but cannot change configuration or commit."
   ],
   [
    "A junior engineer's script sends a config request with action=edit and an xpath ending at the vsys address container, supplying one new address object. Afterwards, dozens of address objects are missing from the candidate configuration. What happened, and what should the script have used?",
    "edit replaced the whole address container with only the supplied element, removing the siblings. The script should use action=set, which merges the new object. Because the change is only in the candidate, the engineer can revert the candidate before anyone commits it."
   ]
  ],
  "tip": "Know the XML request types: keygen, config (with actions like get, show, set, edit, delete), op and commit. REST uses versioned URLs and JSON; commit is an XML API function. API-only accounts come from admin role profiles, not dynamic roles.",
  "check": [
   [
    "What is the difference between set and edit in the XML API?",
    "set adds or merges at the xpath, while edit replaces the node at the xpath with the supplied element."
   ],
   [
    "How can you find the XML for an operational CLI command?",
    "Run debug cli on in the CLI and then the command; the XML equivalent is printed."
   ],
   [
    "How do you ensure a leaked API key cannot change configuration?",
    "Generate it for an account whose admin role profile allows only the read-only API types needed."
   ],
   [
    "What is the difference between action=get and action=show in a config request?",
    "get reads the candidate configuration; show reads the running configuration."
   ]
  ]
 },
 {
  "t": "Infrastructure as code: Terraform panos provider, Ansible paloaltonetworks.panos collection, pan-os-python SDK",
  "hook": "It is the third outage this quarter at Kestrel Analytics, and every one traces back to a firewall rule someone typed by hand at midnight. Jun, the new cloud security lead, has been asked to make firewall changes reviewable, repeatable and reversible. The cloud team already builds its servers with Terraform, the operations team swears by Ansible, and one developer has a folder of Python scripts that 'just work'. Each group insists its tool is the obvious choice for the firewalls. Jun has one week to propose a plan. Which tool fits which job, and what will all of them still need before a change goes live?",
  "simple": "Infrastructure as code means writing down how your firewall should be set up in plain text files, keeping those files in a shared history, and letting a tool make the changes for you. It is like following a written recipe instead of cooking from memory: anyone can review it, repeat it, or go back to last week's version. Three tools are common for Palo Alto firewalls. Terraform lets you describe the finished result and works out the steps itself. Ansible follows a list of steps in order. pan-os-python is a toolkit for writing your own Python programs. All three talk to the firewall through its API, and all three leave changes as a draft until a commit makes them live.",
  "body": [
   "Infrastructure as code (IaC) means describing firewall configuration in text files kept in version control, then letting a tool apply it. The benefits are repeatability, peer review of changes, easy rollback to a known version, and consistency across many firewalls. All three tools in this topic talk to the PAN-OS XML API underneath, so everything from the API lesson still applies: API keys, API-only admin roles, and the difference between candidate and running configuration. The tools differ mainly in style: whether you describe an end state, a sequence of steps, or write your own program.",
   "Terraform, from HashiCorp, is declarative: you write the desired end state in HCL (HashiCorp Configuration Language) files and Terraform works out what to create, change or delete. The Palo Alto Networks `panos` provider supplies resources for objects, policies, network settings and more, for firewalls and Panorama. Terraform records what it manages in a state file, `terraform plan` shows the changes before `terraform apply` makes them, and `terraform destroy` removes what it created. Terraform is excellent at building configuration, for example creating address objects and rules alongside cloud VM-Series deployments. Committing is handled separately from the resource changes, and how depends on the provider version, so check its documentation; pushed configuration is not live until committed. Protect the state file, because it can contain sensitive values.",
   "Ansible, from Red Hat, uses YAML playbooks of tasks run in order. The `paloaltonetworks.panos` collection, installed with `ansible-galaxy collection install paloaltonetworks.panos`, provides modules for address objects, security rules, NAT, interfaces, commits and operational commands. Each module takes a provider dictionary with the firewall address and credentials or API key. Modules are designed to be idempotent: running a playbook twice should change nothing the second time, and Ansible reports each task as changed or ok so you can see what really happened. Ansible is well suited to procedural workflows such as onboarding a firewall, running an upgrade sequence or collecting information. The short playbook below ensures one address object exists and then commits.",
   "```yaml\n- name: Ensure web server object exists\n  paloaltonetworks.panos.panos_address_object:\n    provider: '{{ provider }}'\n    name: web-srv\n    value: 10.1.1.10\n    description: DMZ web server\n\n- name: Commit\n  paloaltonetworks.panos.panos_commit_firewall:\n    provider: '{{ provider }}'\n```",
   "pan-os-python is the Palo Alto Networks Python SDK (software development kit), imported as `panos`. It models the configuration as an object tree: a Firewall or Panorama object at the top, with children such as address objects, rulebases and rules. You build or refresh objects in Python, then call methods like `create()`, `apply()`, `delete()` and `commit()`. It is the most flexible choice when you need custom logic, such as reading a ticketing system, deciding what to change, and writing the result to the firewall, and it is what the Ansible collection uses internally. The example below creates an object in the candidate configuration and then commits it.",
   "```python\nfrom panos.firewall import Firewall\nfrom panos.objects import AddressObject\n\nfw = Firewall('192.0.2.10', api_key=API_KEY)\nobj = AddressObject('web-srv', '10.1.1.10')\nfw.add(obj)\nobj.create()   # goes into the candidate config\nfw.commit()    # makes it running\n```",
   "Consider a worked example. A cloud team deploys VM-Series firewalls with Terraform. They add the `panos` provider to the same repository so each new application's address objects and security rules are defined next to its infrastructure. A developer opens a pull request, the pipeline runs `terraform plan` and posts the output for review, a security engineer approves, and the pipeline applies and commits using a dedicated API-only account whose key lives in the pipeline's secret store. Separately, operations uses an Ansible playbook for monthly content and software upgrades because the steps must run in a fixed order. When an auditor asks who approved a rule, the answer is in the pull request history.",
   "Several mistakes come up repeatedly: forgetting the commit and wondering why nothing changed, editing objects by hand in the web interface so they drift from Terraform state, storing API keys or passwords in the repository, using a Superuser account for automation, and writing Ansible tasks with raw commands that break idempotency. Choosing between the tools is its own trap: Terraform for declarative, state-driven builds, especially alongside cloud infrastructure; Ansible for ordered workflows and teams already using it; pan-os-python for custom scripts and integrations. Many teams combine them, for example Terraform to build the baseline and Ansible or Python for day-two operations, as long as each object has one clear owner so tools do not fight over it.",
   "Exam questions use these clues. 'Desired state', 'plan and apply' or 'state file' point to Terraform. 'Playbook', 'YAML tasks', 'idempotent modules' or 'Galaxy collection' point to Ansible and `paloaltonetworks.panos`. 'Python object tree with create and commit methods' is pan-os-python. 'Changes made but not live' points to a missing commit, whichever tool was used, and 'someone changed it by hand and the next plan wants to undo it' describes drift from Terraform state."
  ],
  "analogy": "Terraform is like giving a contractor a finished blueprint: you describe the house you want and they work out what to build, change or tear down, keeping a ledger of what they built. Ansible is like a checklist handed to a crew, done in order, where re-running a finished step changes nothing. pan-os-python is a toolbox for building your own machine. The analogy stops at move-in day: with PAN-OS, none of them is finished until the commit, like a house that stays locked until the inspector signs off.",
  "terms": [
   [
    "Infrastructure as code (IaC)",
    "Managing configuration through version-controlled text files applied by tools rather than manual changes."
   ],
   [
    "Declarative",
    "Describing the desired end state and letting the tool compute the changes, as Terraform does."
   ],
   [
    "Terraform state",
    "The file where Terraform records the resources it manages and their current values; it can hold sensitive data."
   ],
   [
    "terraform plan / apply",
    "Plan previews the changes Terraform would make; apply carries them out."
   ],
   [
    "Idempotent",
    "Producing the same result no matter how many times an operation runs, a design goal of Ansible modules."
   ],
   [
    "paloaltonetworks.panos",
    "The Ansible collection of modules for managing PAN-OS firewalls and Panorama."
   ],
   [
    "pan-os-python",
    "The Palo Alto Networks Python SDK that models firewall and Panorama configuration as an object tree."
   ],
   [
    "Drift",
    "A difference between the configuration a tool expects and what is actually on the device, often caused by manual changes."
   ]
  ],
  "example": "A cloud team deploys VM-Series firewalls with Terraform. They add the panos provider to the same repository so each new application's address objects and security rules are defined next to its infrastructure, reviewed in a pull request, planned, applied and then committed through their pipeline using an API-only account whose key is kept in the pipeline's secret store.",
  "mistakes": [
   [
    "After terraform apply or an Ansible task reports success, the firewall is enforcing the change.",
    "All three tools change the candidate configuration. A commit is still required before the change becomes running configuration."
   ],
   [
    "Ansible is declarative and keeps a state file, just like Terraform.",
    "Terraform is the one with a state file and a plan/apply cycle. Ansible runs playbook tasks in order, using modules designed to be idempotent."
   ],
   [
    "It is fine to tweak a Terraform-managed rule by hand in the web interface for a quick fix.",
    "Manual changes cause drift; the next plan will try to revert them. Make the change in code, or give each object one clear owner."
   ],
   [
    "The automation account should be a superuser so the pipeline never hits a permission error.",
    "Use a dedicated API-only admin role with only the permissions the tool needs, and keep its key in a secrets store, not the repository."
   ]
  ],
  "tryit": [
   [
    "Fernwood Media wants to run a twelve-step quarterly process on 60 firewalls: back up configuration, download content, install it, check status, then upgrade software in a fixed order, stopping if any step fails. The team already uses YAML-based automation for its servers. Which tool fits best?",
    "Ansible with the paloaltonetworks.panos collection. The job is an ordered, procedural workflow, which is what playbooks are built for, and the team already knows the tool. Terraform is better suited to declaring end-state configuration than to sequenced operations."
   ],
   [
    "A developer runs terraform plan and sees that Terraform wants to change a security rule's destination back to an old value, although nobody edited the code. What most likely happened, and what should the team do?",
    "Someone changed the rule by hand on the firewall, creating drift from Terraform state. The team should decide which value is correct, put it in the code through a reviewed change, and stop making manual edits to Terraform-owned objects."
   ]
  ],
  "tip": "Terraform is declarative and state-based, Ansible runs ordered idempotent tasks, pan-os-python is the Python SDK the Ansible collection builds on. All of them change the candidate configuration, so a commit is still required.",
  "check": [
   [
    "Which tool records managed resources in a state file?",
    "Terraform."
   ],
   [
    "What is the Ansible collection for PAN-OS called?",
    "paloaltonetworks.panos."
   ],
   [
    "After obj.create() in pan-os-python, is the object live?",
    "No, it is in the candidate configuration until you commit."
   ],
   [
    "Why does idempotency matter in Ansible playbooks?",
    "Running the same playbook again makes no further changes, so it is safe to re-run and reports only real drift."
   ]
  ]
 },
 {
  "t": "External dynamic lists (IP, domain, URL) and dynamic address groups with tags",
  "hook": "Rosa runs the firewalls for Granite Valley Schools, and every morning her inbox holds a fresh threat feed from the state education network: new malicious IP addresses, new phishing domains, new bad URLs. For months she has pasted them into address groups by hand and committed before first period. Meanwhile, the district's new cloud servers appear and disappear several times a day as the student portal scales, and each one needs to match the right inbound rule. Rosa is tired, and she knows one missed paste could let ransomware in. Is there a way for the rules to stay the same while what they match keeps itself up to date?",
  "simple": "Normally a firewall rule lists exactly which addresses it applies to, and changing that list means editing and saving the rule. Two features let the list update on its own. An external dynamic list is a plain text file on a web server, one address, domain or web link per line, that the firewall downloads regularly; when the file changes, the firewall's protection changes too. A dynamic address group is a group that fills itself based on labels, called tags, attached to addresses. If a server gets the labels 'web' and 'prod', it joins the group automatically. It is like a mailing list people join by wearing a badge, rather than one where someone types every name.",
  "body": [
   "Static policy is slow to change: every new malicious address or new server means an edit and a commit. External dynamic lists and dynamic address groups let policy adapt automatically, and both are central to automation on PAN-OS. They share one idea: the rule stays the same while its membership changes at runtime, so security keeps pace with threat feeds and cloud workloads without an administrator in the loop for every change. Understanding where each feature gets its truth, and where each can be used in policy, answers most exam questions on the topic.",
   "Start with the external dynamic list (EDL), a text file hosted on a web server, one entry per line, that the firewall downloads on a schedule. You create it under Objects > External Dynamic Lists with a type, a source URL, an optional certificate profile to validate an HTTPS server, credentials if needed, and a check interval (every five minutes, hourly, daily, weekly or monthly). Changes in the file take effect at the next refresh with no commit. You can force a refresh from the CLI with `request system external-list refresh type ip name <list>` and view the entries with `request system external-list show type ip name <list>`. You can also list exceptions in the EDL object so specific entries are ignored even if they appear in the file, which protects you when a feed wrongly includes a partner's address.",
   "The type decides where the list can be used. An IP Address list holds addresses, ranges and subnets and is used as a source or destination in security, NAT, PBF (policy-based forwarding) and decryption rules. A Domain list is used in anti-spyware profiles, under DNS policies, so the firewall can alert, block or sinkhole DNS queries for listed domains. A URL list is used as a custom URL category in URL filtering profiles, or as a URL category match in security and decryption rules. Palo Alto Networks also provides predefined IP lists, such as known malicious IP addresses and bulletproof hosting providers, maintained through threat content subscriptions, and predefined URL lists. Each platform has capacity limits for entries, which vary by model, so check them before pointing a large feed at a small firewall.",
   "A dynamic address group (DAG) solves a different problem. It is an address group whose membership is defined by a match expression on tags, such as `'web' and 'prod'`, rather than a fixed list. Any IP address registered with matching tags becomes a member automatically. Tags can come from address objects, from the XML API (register and unregister calls from scripts or orchestration tools), from VM information sources that read cloud or hypervisor metadata, from auto-tagging in log forwarding profiles, and from Panorama or User-ID agents. Membership updates happen at runtime without a commit, which is why DAGs are used for quarantines and cloud workloads that come and go. You can see current members from the group's 'more' link or with `show object dynamic-address-group all`.",
   "The same idea extends to people. Dynamic user groups are the user equivalent of DAGs: groups whose members are users carrying certain tags, useful for quarantining a compromised account rather than an IP address. If a user moves between laptops or networks, a rule based on a dynamic user group follows the person, while a DAG follows the address.",
   "The choice between an EDL and a DAG is about where the truth lives. Use an EDL when the source of truth is a list maintained elsewhere, such as a threat intelligence feed or an internal IT inventory published as a file. Use a DAG when membership comes from events or metadata, such as a detection, a VM's cloud tags or an orchestration tool's decision. Always consider what happens if the list server is unreachable (the firewall keeps the last successfully retrieved list) and protect the list source, since whoever controls it controls your policy. Host feeds over HTTPS, validate the server with a certificate profile, and restrict who can edit the file.",
   "Consider a worked example. A threat intelligence platform publishes a list of command-and-control domains over HTTPS. You add it as a Domain EDL with a certificate profile, reference it in the anti-spyware profile's DNS Policies with the sinkhole action, and attach that profile to your outbound rules. Infected hosts now receive the sinkhole address when they query a listed domain, and you look for internal hosts connecting to the sinkhole address in the Traffic log to find infected machines. Meanwhile, web servers in the cloud carry tags `web` and `prod`, and a DAG with that match expression lets the inbound rule follow them as they scale.",
   "Several mistakes come up repeatedly: using a Domain list in a security rule (it belongs in anti-spyware DNS policies), expecting EDL changes to need a commit or DAG membership to appear only after one, hosting a list on an unauthenticated server anyone can edit, and setting a long refresh interval for a fast-moving feed. Another is writing a DAG match expression with a typo in the tag name, so the group silently stays empty. When a rule using a DAG matches nothing, check the group's current members before anything else.",
   "Exam questions use these clues. 'Threat feed of IPs used as a rule source or destination' is an IP EDL. 'Block or sinkhole malicious domains from a feed' is a Domain EDL in an anti-spyware profile. 'Feed of URLs for URL filtering' is a URL EDL. 'Membership changes with tags, no commit' is a dynamic address group, and 'quarantine a user account' is a dynamic user group. 'Feed server down' means the firewall keeps the last good copy."
  ],
  "analogy": "An EDL is like a restaurant's 'do not seat' list that head office faxes over every hour: the host never rewrites the seating rules, they just check the latest list. A DAG is like a VIP lounge that admits anyone wearing a gold wristband; nobody keeps a guest list, the wristband decides. The analogy stops at the fax machine breaking: a host might panic, but the firewall simply keeps using the last list it received successfully.",
  "mnemonic": "Where each EDL type goes: 'IP in the Rule, Domain in the DNS, URL in the URL category.' Domain pairs with DNS and URL pairs with URL category; the IP list is the one that sits directly in a rule.",
  "terms": [
   [
    "External dynamic list (EDL)",
    "A web-hosted list of IPs, domains or URLs that the firewall retrieves periodically and uses in policy without a commit."
   ],
   [
    "Check interval",
    "How often the firewall retrieves an EDL: every five minutes, hourly, daily, weekly or monthly."
   ],
   [
    "EDL exception",
    "An entry listed in the EDL object that the firewall ignores even if it appears in the source file."
   ],
   [
    "Dynamic address group (DAG)",
    "An address group whose members are IP addresses registered with tags that match its filter."
   ],
   [
    "Tag registration",
    "Associating a tag with an IP address or user at runtime, via the API, VM monitoring, auto-tagging or agents."
   ],
   [
    "DNS sinkhole",
    "An anti-spyware action that answers malicious domain queries with a controlled address so infected hosts can be found."
   ],
   [
    "Dynamic user group",
    "A group whose membership is users with matching tags, used for user-based quarantine."
   ]
  ],
  "example": "A threat intelligence platform publishes a list of command-and-control domains. You add it as a Domain EDL, reference it in the anti-spyware profile's DNS policy with the sinkhole action, and then look for internal hosts connecting to the sinkhole address in the Traffic log to find infected machines. The list refreshes every five minutes with no commit required.",
  "mistakes": [
   [
    "A Domain EDL can be placed directly in a security rule's destination field.",
    "Security rule source and destination take IP EDLs. A Domain EDL is used in an anti-spyware profile's DNS policies, which is then attached to security rules."
   ],
   [
    "After the feed file changes, you must commit for the firewall to use the new entries.",
    "EDLs refresh at their check interval with no commit, and DAG membership also updates at runtime without a commit."
   ],
   [
    "If the EDL server goes offline, the list empties and the rule stops blocking.",
    "The firewall keeps using the last list it retrieved successfully until it can refresh again."
   ],
   [
    "A DAG is just an address group you update by hand more easily.",
    "A DAG has no static member list; membership comes from IP addresses registered with tags that match its expression."
   ]
  ],
  "tryit": [
   [
    "Oakmont Credit Union's fraud team publishes a list of phishing site URLs on an internal web server, updated many times a day. Security wants users blocked from those URLs while ordinary browsing continues. Which EDL type should you create, where do you reference it, and what refresh interval makes sense?",
    "Create a URL EDL, use it as a custom URL category set to block in the URL filtering profile (or as a URL category match in a deny rule), and choose a short check interval such as every five minutes because the feed changes often. No commit is needed when the file changes."
   ],
   [
    "Your cloud team wants new web servers to be reachable through the inbound rule as soon as they launch, without anyone editing the firewall. The servers are launched with cloud tags. What do you build?",
    "A dynamic address group whose match expression uses the servers' tags (for example web and prod), fed by a VM information source or tag registration. New servers join the group at runtime and the existing rule applies with no commit."
   ]
  ],
  "tip": "IP lists go in rules, domain lists go in anti-spyware DNS policies, URL lists go in URL filtering or rule URL categories. EDL and DAG changes take effect without a commit, and a firewall keeps the last good EDL if the server is unreachable.",
  "check": [
   [
    "Where is a Domain EDL used?",
    "In an anti-spyware profile's DNS policies, for alert, block or sinkhole actions."
   ],
   [
    "How does an IP become a member of a dynamic address group?",
    "It is registered with tags that match the group's match expression, for example through the API, VM monitoring or auto-tagging."
   ],
   [
    "Does updating the EDL file on the web server require a commit on the firewall?",
    "No, the firewall picks up changes at its next scheduled refresh."
   ],
   [
    "What happens if the EDL web server becomes unreachable?",
    "The firewall keeps using the last list it successfully retrieved."
   ]
  ]
 },
 {
  "t": "Auto-tagging from log forwarding profiles and HTTP server profiles for webhooks and ticketing",
  "hook": "At 2:07 a.m. a laptop in the finance department at Copperline Freight starts beaconing to a known spyware server. The firewall logs a critical threat. Devon, the only analyst on call, is asleep, and his phone will not ring until the morning summary goes out. Last time this happened, the infected machine talked to its controller for six hours before anyone noticed, and the cleanup took a week. Devon's manager has asked a simple question: if the firewall already knows the laptop is infected, why can it not isolate the machine itself and wake someone up? How would you build that?",
  "simple": "When the firewall spots something serious, it writes a log entry. Auto-tagging lets that log entry trigger an action: the firewall sticks a label, called a tag, on the troublemaker's address. A rule that blocks anything with that label then applies straight away, with no one editing rules. Separately, the firewall can send the same log entry to another system over the web, which is called a webhook, so a help-desk ticket is opened or a chat message is posted. Think of a store security tag: when a shoplifter walks through the gate, the alarm sounds (the log), the doors lock (the tag and block rule), and the manager gets a text (the webhook), all without a guard pressing a button.",
  "body": [
   "Auto-tagging closes the loop between detection and enforcement. When the firewall logs an event that matters, such as a critical threat from an internal host, it can tag the host's IP address. A dynamic address group (DAG) that matches the tag then places the host into a quarantine rule, all within seconds and without a commit. HTTP server profiles extend the same idea outward, sending the event to ticketing, chat or orchestration systems so people and other tools can respond too. Together they turn the firewall from a recorder of bad events into a first responder.",
   "Tagging is configured in a log forwarding profile under Objects > Log Forwarding. Each match list entry has a log type and a filter, for example the threat log with `(severity eq critical)`. Under Built-in Actions you add an action of type Tagging and choose several things: the target (source address, destination address, and for some log types the user or the XFF, X-Forwarded-For, address), the action (add tag or remove tag), where the tag is registered (the local User-ID, Panorama, or a remote device through an HTTP server profile), the tag itself, and an optional timeout after which the tag expires. Then attach the log forwarding profile to the security rules whose traffic should trigger it. A profile that is not attached to any rule never sees a log, so it never acts.",
   "The enforcement side is ordinary policy. Create a DAG with a match expression on the tag, such as `'quarantine'`, and place a rule near the top of the rulebase that denies or restricts traffic from that DAG, perhaps allowing only access to remediation servers. Because DAG membership updates dynamically, tagged hosts are restricted immediately. A timeout lets hosts return automatically; without one, an administrator removes the tag after cleanup, for example with an XML API unregister call. Tagging users into dynamic user groups works the same way when user identity matters more than IP, which is useful when the same person may appear on different devices.",
   "HTTP server profiles send logs to other systems. Under Device > Server Profiles > HTTP you define one or more servers (address, protocol, port, method) and, on the Payload Format tab, a URI format, headers, parameters and a payload template per log type, built from log field variables such as `$src`, `$threatid` and `$severity`. Predefined payload formats exist for some common services, and you can write your own JSON. When a log forwarding profile sends a matching log to the HTTP profile, the firewall calls the webhook. That can open a ticket in an IT service management tool, post to a chat channel, or trigger an orchestration playbook. Use HTTPS and authentication headers so the receiving side can trust the request, and use the profile's Send Test Log button to check the format before relying on it.",
   "Put together, a single critical threat can tag the host into quarantine, open an incident ticket and notify the on-call analyst. This is the kind of integration the exam expects you to design, so remember the chain: a log forwarding profile entry with a filter, a tagging built-in action, a DAG matching the tag, a security rule using the DAG, and an HTTP server profile for external notification. Review the IP-Tag log to confirm tags were registered and removed as expected; it records the IP address, the tag, and when each registration and removal happened, which also serves as evidence for incident reports.",
   "Consider a worked example. A laptop triggers a critical spyware signature. The log forwarding profile on the outbound rule has a threat entry filtered on critical severity with two actions: tag the source address `quarantine` with a 24-hour timeout, and forward the log to an HTTP server profile that opens a ticket with the host, user and threat name. A rule at the top of the rulebase denies the Quarantine DAG everything except the remediation server. The laptop is isolated before an analyst even looks, and the ticket is waiting when they do. When the timeout expires, the IP-Tag log shows the tag removal, and the laptop's traffic flows normally again.",
   "Several mistakes come up repeatedly: tagging on low-severity or false-positive-prone events and quarantining healthy machines, forgetting to attach the log forwarding profile to the rules that generate the logs, placing the quarantine rule below broader allow rules so it never matches, and sending webhooks over plain HTTP with no authentication. Start with alerting only, and tighten filters as you gain confidence before turning on automatic quarantine. Automation that isolates the CEO's laptop during a board meeting because of a noisy signature will be switched off quickly, so earn trust gradually.",
   "Exam questions use these clues. 'Automatically isolate a host after a critical threat without a commit' points to a tagging built-in action plus a DAG in a deny rule. 'Open a ticket' or 'send to a chat or orchestration webhook' points to an HTTP server profile. 'Tag expires automatically' is the tag timeout. 'Verify tags were applied' points to the IP-Tag log. 'Profile configured but nothing happens' usually means it was never attached to the security rules."
  ],
  "analogy": "Auto-tagging is like a hospital triage nurse who, on seeing certain symptoms, puts a colored wristband on the patient; every door with a matching sign then stays closed to that wristband until it is cut off or expires. The HTTP server profile is the nurse paging the doctor and filing the chart. The analogy stops at the nurse's judgment: the firewall only acts on the filter you wrote, so a badly chosen filter will band healthy patients too.",
  "mnemonic": "The quarantine chain in order: 'Lazy Tigers Don't Run Home', Log forwarding filter, Tagging action, DAG matching the tag, Rule using the DAG, HTTP profile to notify.",
  "terms": [
   [
    "Auto-tagging",
    "A log forwarding built-in action that adds or removes tags on IPs or users when a matching log is generated."
   ],
   [
    "Built-in action",
    "An action inside a log forwarding profile entry, such as tagging, performed when a log matches."
   ],
   [
    "Tag timeout",
    "The time after which an auto-applied tag is removed, letting a host leave quarantine automatically."
   ],
   [
    "Webhook",
    "An HTTP request sent to another system when an event occurs, used here via an HTTP server profile."
   ],
   [
    "HTTP server profile",
    "A server profile that defines webhook destinations and the payload format the firewall sends for each log type."
   ],
   [
    "Payload format",
    "The per-log-type URI, headers and body template an HTTP server profile uses to build its requests."
   ],
   [
    "IP-Tag log",
    "The log that records tags registered to and removed from IP addresses."
   ]
  ],
  "example": "A laptop triggers a critical spyware signature. The log forwarding profile tags its IP 'quarantine' with a 24-hour timeout and sends the threat log to an HTTP server profile that opens a ticket. A top rule denies the Quarantine DAG everything except the remediation server, so the laptop is isolated before an analyst even looks, and the IP-Tag log records when the tag was added and removed.",
  "mistakes": [
   [
    "Creating the log forwarding profile is enough; it will act on all traffic.",
    "The profile must be attached to the security rules whose logs should trigger it. An unattached profile never sees matching logs."
   ],
   [
    "Tagging a host blocks it by itself.",
    "A tag only changes DAG membership. You also need a DAG that matches the tag and a deny or restrict rule using that DAG, placed above broader allow rules."
   ],
   [
    "Quarantine automation needs a commit each time a host is tagged.",
    "Tag registration and DAG membership update at runtime without a commit, which is why the response takes seconds."
   ],
   [
    "An HTTP server profile is how the firewall tags hosts.",
    "Tagging is a built-in action in the log forwarding profile. The HTTP server profile sends logs to external systems such as ticketing and chat (and can carry tag registration to a remote device)."
   ]
  ],
  "tryit": [
   [
    "Sandpiper Hotels enabled auto-tagging on threat logs of medium severity and above, and within a day several guest kiosks were quarantined for harmless browser toolbars. Leadership wants to keep automatic isolation for real infections. What do you change?",
    "Narrow the filter to critical severity (or specific high-confidence threat categories), add a tag timeout so mistakes clear themselves, and consider running in alert-only mode via the HTTP server profile for a while before re-enabling the tag action. Tighten the trigger rather than abandoning the automation."
   ],
   [
    "After building the chain, you test with a lab host that triggers a critical threat. The ticket opens correctly, but the host can still browse the Internet. The IP-Tag log shows the tag was registered. What do you check next?",
    "Check the quarantine rule's position and the DAG. The tag worked and the profile is attached, so either the DAG's match expression does not match the tag (for example a typo) or the quarantine rule sits below a broader allow rule. Verify DAG members, then move the deny rule above the allow rules."
   ]
  ],
  "tip": "The chain is: log forwarding profile filter, then tagging action, then DAG matching the tag, then a security rule using the DAG. HTTP server profiles send logs to webhooks for tickets and chat. Check the IP-Tag log to confirm tags.",
  "check": [
   [
    "Where do you configure a tag to be added when a critical threat is logged?",
    "In a log forwarding profile entry filtered on severity, using a tagging built-in action, attached to security rules."
   ],
   [
    "How does a tagged IP become blocked?",
    "A dynamic address group matching the tag is used in a deny or restrict rule, and the IP joins the group automatically."
   ],
   [
    "What defines the payload format sent to a ticketing webhook?",
    "The HTTP server profile's per-log-type payload format and headers."
   ],
   [
    "How can a quarantined host be released automatically?",
    "Set a timeout on the tagging action so the tag, and therefore DAG membership, expires."
   ]
  ]
 },
 {
  "t": "VM-Series bootstrapping (init-cfg.txt, bootstrap.xml, content/license/software/plugins folders) and Zero Touch Provisioning",
  "hook": "Black Friday traffic is climbing at Juniper Lane Outfitters, and the cloud autoscaling group has just launched six new VM-Series firewalls. Ellie, the cloud engineer on shift, watches the dashboard: five of them licensed themselves, registered with Panorama and started passing traffic within minutes. The sixth sits there unlicensed, dropping nothing and protecting nothing, while the load balancer keeps checking whether it is healthy. Nobody is going to log in to each new instance by hand during the busiest hour of the year. What did the five healthy firewalls read when they booted, and where should Ellie look to find out what went wrong with the sixth?",
  "simple": "Setting up a new firewall by hand takes a skilled person a long time: give it an address, license it, update it and load its settings. Bootstrapping lets a virtual firewall set itself up the first time it starts, by reading a package of folders you prepare in advance. One small text file tells it its basic network settings and which central manager to join; another folder holds its license codes. Zero Touch Provisioning does a similar job for physical firewalls: someone at the site just plugs in power and a network cable, and the firewall phones home to learn who manages it. It is like a new phone that restores your apps and settings by itself after you sign in.",
  "body": [
   "Deploying a firewall by hand, logging in to set an IP address, license it, update it and configure it, does not scale in the cloud or across hundreds of sites. Bootstrapping lets a VM-Series firewall configure itself on first boot, and Zero Touch Provisioning (ZTP) does something similar for supported hardware firewalls. Both remove the skilled engineer from the first-boot process, which makes autoscaling and large rollouts possible, and both guarantee every new firewall starts from the same known configuration rather than from whatever an engineer remembered to type.",
   "A bootstrap package is a set of folders the firewall reads at first boot. `config` holds `init-cfg.txt` and optionally `bootstrap.xml`. `license` holds an `authcodes` file with the license authorization codes. `software` holds a PAN-OS image to upgrade to. `content` holds Applications and Threats and optionally antivirus content packages to install. `plugins` holds VM-Series plugin images. The config, license, software and content folders must exist even when empty; plugins is optional. File and folder names matter, so a folder called `Config` or a file called `init-cfg.txt.txt` can make the firewall skip what you intended.",
   "The `init-cfg.txt` file holds basic settings as key-value pairs: the management interface type (DHCP client or static, with IP address, netmask and default gateway), hostname, DNS servers, Panorama server addresses, the template stack and device group names to join, the VM auth key that lets the firewall register with Panorama, and operational options such as swapping the management interface, which some cloud load balancer designs need. The optional `bootstrap.xml` is a complete configuration file, typically exported from a working firewall, that becomes the running configuration. Many teams skip it and let Panorama push configuration after registration, which keeps configuration in one place instead of copying it into every bootstrap bucket. A minimal `init-cfg.txt` looks like this:",
   "```\ntype=dhcp-client\nhostname=fw-aws-01\npanorama-server=10.0.10.5\ntplname=AWS-Stack\ndgname=AWS-Firewalls\nvm-auth-key=<key generated on Panorama>\ndns-primary=10.0.0.2\n```",
   "The package can be delivered in several ways depending on the platform: an ISO image attached as a virtual CD-ROM, a block storage volume, a cloud storage bucket or file share (such as AWS S3, Azure storage or Google Cloud Storage) referenced in the instance's user data, or basic init-cfg settings passed directly as user data or custom data without a full package. Bootstrapping only happens when the firewall boots from a factory-default state; it will not reapply to an already-configured firewall. The first boot runs in order: apply management settings, license from the auth codes, install content and software (rebooting if needed), load configuration, and register with Panorama. Watch progress with `show system bootstrap status`, and check the System log if a step fails.",
   "Zero Touch Provisioning is for hardware firewalls ordered as ZTP-capable models. An administrator registers the serial numbers and claim information with Panorama (using its ZTP plugin) or cloud management ahead of time. On site, someone plugs the firewall into power and an Internet-connected port. The firewall contacts the Palo Alto Networks ZTP service, learns which manager it belongs to, connects, and receives its template and device group configuration. No skilled engineer needs to be present. The distinction to remember: bootstrapping is a package you supply to a VM-Series instance; ZTP is a cloud-assisted claim process for hardware.",
   "Consider a worked example. An autoscaling group in AWS launches new VM-Series instances during peak load. Each instance's user data points to an S3 bucket containing `init-cfg.txt` with Panorama addresses, device group and template stack names and a VM auth key, plus an `authcodes` file, with the instance role granted read access to the bucket. New firewalls license themselves, register with Panorama, receive policy and join the load balancer target group automatically. When a new instance stays unlicensed, `show system bootstrap status` reveals it could not reach the licensing servers because a route was missing. Fixing the route table lets future instances bootstrap cleanly.",
   "Several mistakes come up repeatedly: missing required folders, wrong file names or case, buckets the instance cannot read because of permissions, firewalls that cannot reach the licensing servers or Panorama, an expired VM auth key, and expecting a bootstrap package to reconfigure a firewall that has already been set up. Another is embedding long-lived secrets in user data that many people can read; keep auth codes and keys in storage with tight access controls. When troubleshooting, follow the boot order: if management settings applied but licensing failed, look at outbound connectivity before anything else.",
   "Exam questions use these clues: 'which device group and template stack to join' is `init-cfg.txt`; 'full configuration at boot' is `bootstrap.xml`; 'license codes' is the authcodes file in the license folder; 'plug in power and network at a branch' is ZTP; and 'bootstrap ignored after reboot' means the firewall was not factory default. 'Register with Panorama automatically' points to the VM auth key and Panorama server entries in `init-cfg.txt`."
  ],
  "analogy": "A bootstrap package is like a moving box labeled for a new hire's first day: a note with their desk number and manager's name (init-cfg.txt), their badge codes (authcodes), the latest handbook (content and software), and optionally a full copy of a colleague's desk setup (bootstrap.xml). ZTP is more like a new hire who shows up at reception and the front desk calls head office to find out where they belong. The analogy stops at returning employees: the box is only opened on the very first day, never again.",
  "mnemonic": "The five bootstrap folders: 'Cats Like Sleeping Curled Peacefully', config, license, software, content, plugins. The first four must exist even if empty; only the last, plugins, is optional.",
  "terms": [
   [
    "Bootstrap package",
    "The config, license, software, content and plugins folders a VM-Series firewall reads on first boot."
   ],
   [
    "init-cfg.txt",
    "Bootstrap file with basic management, DNS, hostname and Panorama registration settings as key-value pairs."
   ],
   [
    "bootstrap.xml",
    "An optional full configuration file loaded during bootstrapping."
   ],
   [
    "authcodes",
    "The file in the license folder containing license authorization codes applied at first boot."
   ],
   [
    "VM auth key",
    "A key generated on Panorama that lets a bootstrapping VM-Series firewall register with it."
   ],
   [
    "Zero Touch Provisioning (ZTP)",
    "A process where supported hardware firewalls automatically connect to their assigned Panorama or cloud manager on first power-up."
   ],
   [
    "Factory-default state",
    "The unconfigured condition a firewall must be in for bootstrapping to run."
   ]
  ],
  "example": "An autoscaling group in AWS launches new VM-Series instances during peak load. Each instance's user data points to an S3 bucket containing init-cfg.txt with Panorama addresses, device group and template stack names, plus an authcodes file. New firewalls license themselves, register with Panorama, receive policy and join the load balancer target group automatically.",
  "mistakes": [
   [
    "bootstrap.xml is required, because the firewall needs a full configuration to boot.",
    "bootstrap.xml is optional. Many designs use only init-cfg.txt to register with Panorama, which then pushes the configuration."
   ],
   [
    "You can reboot a running firewall with a new bootstrap package to reconfigure it.",
    "Bootstrapping only runs from a factory-default state on first boot; an already-configured firewall ignores the package."
   ],
   [
    "Empty folders can be left out of the bootstrap package.",
    "The config, license, software and content folders must exist even when empty; only plugins is optional."
   ],
   [
    "ZTP and bootstrapping are the same process for any firewall.",
    "Bootstrapping is a package you supply to VM-Series; ZTP is a cloud-assisted claim process for supported hardware firewalls."
   ]
  ],
  "tryit": [
   [
    "Thornbury Bank is opening 40 small branches with no IT staff on site. Each branch gets a supported hardware firewall, and the central team manages everything from Panorama. How should the firewalls be provisioned, and what does the local person do?",
    "Use Zero Touch Provisioning. The central team registers each firewall's serial number and claim information with Panorama's ZTP plugin ahead of time. On site, someone connects power and an Internet-connected port; the firewall contacts the ZTP service, finds its Panorama and receives its template and device group configuration."
   ],
   [
    "A new VM-Series instance in Azure boots, gets its management IP and hostname, but never appears in Panorama. Its init-cfg.txt includes the Panorama address, template stack and device group. What are the likely causes and where do you look?",
    "Check `show system bootstrap status` and the System log. Likely causes are no network path from the management interface to Panorama, or a missing or expired VM auth key in init-cfg.txt. Since the management settings applied, the package was read, so focus on connectivity and the auth key."
   ]
  ],
  "tip": "Know the five folders: config, license, software, content, plugins. init-cfg.txt handles bootstrap basics and Panorama registration; bootstrap.xml is optional full config. Bootstrapping only runs from factory default, and ZTP is the hardware equivalent driven by a claim process.",
  "check": [
   [
    "Which file tells a bootstrapping firewall which device group and template stack to join?",
    "init-cfg.txt."
   ],
   [
    "Why might a firewall ignore a bootstrap package after a reboot?",
    "Bootstrapping only runs on first boot from a factory-default state."
   ],
   [
    "What does the on-site person do in ZTP?",
    "Connect power and an Internet-connected interface; the firewall contacts the ZTP service and registers to its assigned manager."
   ],
   [
    "Which bootstrap folders must exist even if empty?",
    "config, license, software and content; plugins is optional."
   ]
  ]
 },
 {
  "t": "Form factors: PA-Series, VM-Series, CN-Series, Cloud NGFW for AWS and Azure",
  "hook": "The architecture review at Wildflower Health starts in an hour, and Sam has four projects on one slide. The main data center needs a new edge firewall pair. A private VMware cloud needs inspection between application tiers. The developers' Kubernetes clusters have pods chatting to each other that no firewall can currently see. And a brand-new AWS account is going live next month, where the cloud team has said plainly that it will not patch or scale any firewall instances. The CISO wants one vendor's security everywhere. Can one family of firewalls really cover all four, and which form factor goes where?",
  "simple": "Palo Alto Networks sells the same firewall brain in different bodies. PA-Series is a physical box you install in a rack. VM-Series is the same software running as a virtual machine, on your own servers or in a public cloud, and you look after it. CN-Series runs as containers inside Kubernetes, the system many developers use to run apps, so it can watch traffic between app pieces. Cloud NGFW is a service in AWS or Azure that Palo Alto Networks runs for you, so you only write the rules. It is like getting coffee: buy your own machine, rent one you still clean yourself, use the one built into your office kitchen, or just order from a café that handles everything.",
  "body": [
   "Palo Alto Networks runs the same core technology, PAN-OS with App-ID, User-ID, Content-ID and the security subscriptions, across several form factors. What changes is where the firewall runs and who operates it. The exam expects you to pick the right one for a scenario and to know how each is deployed and managed, so think of each form factor as an answer to 'what am I protecting, and how much of the firewall do I want to run myself?' Reading a scenario for those two clues usually eliminates most wrong answers.",
   "PA-Series firewalls are physical appliances, from small branch models to large chassis for data centers and service providers. They use a single-pass architecture, where traffic is classified and inspected once, with dedicated resources for the management plane and data plane so heavy management tasks such as commits or report generation do not slow traffic. Choose PA-Series for campus edges, data centers and branches where you own the physical network, need high throughput, or want hardware-based features such as dedicated HA (high availability) ports. You are responsible for racking, power, cabling and lifecycle replacement.",
   "VM-Series firewalls are the same PAN-OS as a virtual machine. They run on private cloud hypervisors such as VMware ESXi, KVM and Hyper-V, and in public clouds such as AWS, Azure, Google Cloud and Oracle Cloud. Licensing is available through flexible credit-based models or cloud marketplaces. You manage VM-Series like any firewall, usually through Panorama or cloud management, and deploy them with bootstrapping and infrastructure as code. In the cloud you still own the virtual machines: sizing, scaling, patching and high availability are your responsibility, often using cloud load balancers. In exchange, you get full PAN-OS control, including custom routing and every feature the platform supports.",
   "CN-Series firewalls protect Kubernetes environments. They are delivered as containers: a management component (CN-MGMT) and firewall data plane components (CN-NGFW) that inspect traffic between pods, namespaces and services, including east-west traffic that never leaves the cluster. They are deployed with Kubernetes manifests or Helm charts, either as a DaemonSet (a firewall pod on each node) or as a Kubernetes service, and they are managed by Panorama with a Kubernetes plugin that can learn pod labels and turn them into tags for dynamic address groups, so policy follows workloads as they scale. A perimeter firewall, however capable, never sees pod-to-pod traffic that stays inside the cluster, which is the gap CN-Series fills.",
   "Cloud NGFW for AWS and Cloud NGFW for Azure are managed services. Palo Alto Networks operates the firewall infrastructure, including scaling, availability and upgrades, and you consume it as a native cloud resource bought through the cloud marketplace. In AWS it is inserted with endpoints that work with the Gateway Load Balancer model; in Azure it is deployed into a virtual network or a Virtual WAN hub. Policy is managed as rulestacks through the cloud console, APIs or infrastructure as code, or through Panorama or Strata Cloud Manager integration. You give up some low-level control compared with VM-Series in exchange for not running the firewalls yourself.",
   "Consider a worked example. A company protects its data center with PA-Series in an HA pair, runs VM-Series in a private VMware cloud where it needs full PAN-OS control and custom routing, uses CN-Series to control traffic between namespaces in its Kubernetes clusters, and, for a new AWS account where the team does not want to patch or scale firewall instances, subscribes to Cloud NGFW for AWS through the marketplace and manages its rulestack with Terraform. Remote users and small branches are served by Prisma Access, the SASE (secure access service edge) offering built on the same technology. Every one of these enforces App-ID-based policy, so the security team writes rules in a consistent language even though the operating models differ.",
   "Several mistakes come up repeatedly: choosing Cloud NGFW when the scenario needs full control of routing or PAN-OS features on the instance, choosing VM-Series when the requirement is 'no firewall instances to manage', using a perimeter firewall to inspect pod-to-pod traffic that never leaves the cluster, and forgetting that VM-Series in the cloud still needs a scaling and HA design. Another is assuming form factors run different security engines; the inspection technology is shared, while capacity and operational model differ. Licensing also differs: hardware is bought per appliance, while virtual and cloud options are often consumed through credits or marketplace billing, so read the scenario for hints about how the customer wants to pay and operate.",
   "Exam questions use these clues. 'Physical campus or data center' is PA-Series. 'Hypervisor or cloud VM you operate' is VM-Series. 'Kubernetes', 'pods', 'namespaces' or 'east-west inside the cluster' is CN-Series. 'Managed service', 'marketplace', 'no instances to operate' or 'rulestack' is Cloud NGFW. 'Remote users as a cloud service' points to Prisma Access. When two answers both seem to work, choose the one that matches who the scenario says should operate the firewall."
  ],
  "analogy": "Choosing a form factor is like choosing how to get around. PA-Series is buying a truck: powerful, yours, and you handle the maintenance and parking. VM-Series is leasing a car you still fuel and service yourself, wherever you drive it. CN-Series is a bicycle courier who weaves between buildings inside a campus where trucks cannot go. Cloud NGFW is a taxi: you say where to go and someone else maintains the vehicle. The analogy stops at the engine: every option uses the same inspection engine, unlike vehicles that differ underneath.",
  "terms": [
   [
    "PA-Series",
    "Palo Alto Networks physical hardware firewalls with separate management and data plane resources."
   ],
   [
    "Single-pass architecture",
    "Processing each packet once for classification and inspection instead of passing it through separate engines."
   ],
   [
    "VM-Series",
    "The virtual machine form of PAN-OS for private hypervisors and public clouds, operated by the customer."
   ],
   [
    "CN-Series",
    "Containerized firewalls for Kubernetes, with CN-MGMT and CN-NGFW components managed by Panorama."
   ],
   [
    "East-west traffic",
    "Traffic between workloads inside the same environment, such as pod to pod within a cluster, rather than in or out of it."
   ],
   [
    "Cloud NGFW",
    "A managed firewall service for AWS and Azure that Palo Alto Networks operates and customers consume as a native cloud resource."
   ],
   [
    "Rulestack",
    "The collection of rules and objects used to configure a Cloud NGFW resource."
   ]
  ],
  "example": "A company protects its data center with PA-Series, runs VM-Series in a private VMware cloud, uses CN-Series to control traffic between namespaces in its Kubernetes clusters, and for a new AWS account where the team does not want to manage firewall instances it subscribes to Cloud NGFW for AWS through the marketplace and manages the rulestack as code.",
  "mistakes": [
   [
    "VM-Series is the right answer whenever the word 'cloud' appears.",
    "If the scenario says the customer does not want to operate, patch or scale firewall instances, Cloud NGFW is the fit. VM-Series in the cloud is still customer-operated."
   ],
   [
    "A strong perimeter firewall can inspect traffic between pods in a Kubernetes cluster.",
    "Pod-to-pod traffic that stays inside the cluster never reaches the perimeter. CN-Series is deployed inside the cluster to inspect east-west traffic."
   ],
   [
    "Each form factor uses a different, weaker or stronger security engine.",
    "They share the same core technology (App-ID, User-ID, Content-ID and subscriptions); capacity, placement and operating model are what differ."
   ],
   [
    "Cloud NGFW gives you the same low-level control as VM-Series, without the work.",
    "Cloud NGFW trades some low-level control for being a managed service. When full routing control or instance-level PAN-OS features are required, VM-Series fits better."
   ]
  ],
  "tryit": [
   [
    "Pinecrest Software runs its product on Kubernetes in two clusters. An audit found that a compromised pod in the billing namespace could talk freely to the database namespace. The security team wants App-ID-based rules between namespaces that follow pods as they scale. Which form factor fits, and how is it managed?",
    "CN-Series, deployed in each cluster (for example as a DaemonSet) and managed by Panorama with the Kubernetes plugin, which turns pod labels into tags for dynamic address groups so rules follow workloads."
   ],
   [
    "A retail company's new Azure environment must have next-generation firewall inspection within weeks. The small cloud team insists it will not manage VM sizing, patching or high availability, and wants to buy through the Azure marketplace. Which form factor do you recommend?",
    "Cloud NGFW for Azure. It is a managed service operated by Palo Alto Networks, bought through the marketplace and deployed into a virtual network or Virtual WAN hub, with policy managed as rulestacks."
   ]
  ],
  "tip": "Managed service with no instances to operate means Cloud NGFW. Kubernetes east-west inspection means CN-Series. Full control of a virtual firewall on any hypervisor or cloud means VM-Series. Physical campus or data center means PA-Series.",
  "check": [
   [
    "Which form factor should you choose to inspect pod-to-pod traffic inside a Kubernetes cluster?",
    "CN-Series."
   ],
   [
    "Who handles scaling and upgrades for Cloud NGFW for AWS?",
    "Palo Alto Networks, because it is a managed service."
   ],
   [
    "What manages CN-Series firewalls?",
    "Panorama with the Kubernetes plugin."
   ],
   [
    "Who is responsible for scaling and HA of VM-Series firewalls in a public cloud?",
    "The customer, often using cloud load balancers and automation."
   ]
  ]
 },
 {
  "t": "Strata Cloud Manager and cloud-delivered management",
  "hook": "Nadia is the entire IT department at Brightwater Robotics, a startup that went from three offices to twenty in a year. Each branch has a next-generation firewall, remote staff connect through Prisma Access, and there is no data center or server room to host a management appliance. Last week a branch firewall drifted from the others because someone changed it locally, and Nadia only found out when a customer demo failed. Her board wants consistent security everywhere and a weekly score showing how good the configuration is. She has no spare hardware and no time to patch another server. What can manage the whole fleet for her?",
  "simple": "Strata Cloud Manager is a website, run by Palo Alto Networks, where you manage your firewalls instead of installing your own management server. You organize firewalls into folders, and settings placed on a folder apply to every firewall inside it, like a shared family calendar everyone sees. Snippets are reusable bundles of settings, such as the standard time and name servers, that you can attach wherever you need them. The firewalls send their logs to a cloud log service, so you can see activity across every site in one place. The service also grades your settings against recommended practices. It is like switching from keeping your photos on a home computer you must back up to a cloud photo service someone else maintains.",
  "body": [
   "Strata Cloud Manager (SCM) is the Palo Alto Networks cloud-delivered management platform for network security. Instead of installing Panorama as an appliance or virtual machine, you manage next-generation firewalls (NGFWs) and Prisma Access from a web console hosted by Palo Alto Networks. It brings configuration, visibility and AI-driven operations together in one place, and because it is a cloud service there is no management server for you to size, patch or back up. That shift changes both how you organize configuration and what you must plan before onboarding.",
   "Configuration in SCM uses a different model from Panorama's device groups and templates. Folders organize firewalls hierarchically; configuration applied at a higher folder is inherited by the folders and devices beneath it, similar to device group inheritance. Snippets are reusable, named sets of configuration, such as a standard set of security profiles or a DNS and NTP (Network Time Protocol) baseline, that you associate with folders or devices. Configuration that genuinely differs per device can be set at the device level, and variables handle values such as addresses that change from site to site. Like Panorama, you edit a candidate and then push the configuration to devices, reviewing the changes before they deploy.",
   "Onboarding a firewall to cloud management has prerequisites. The device must be registered to your customer support account, licensed for cloud management, and able to reach the cloud service; the firewall authenticates with a device certificate. Logs flow to Strata Logging Service, which SCM uses for visibility and reporting. This is why cloud management and cloud logging usually go together, and why outbound connectivity from the firewall's management plane, including any service routes, must be planned before onboarding. A firewall that cannot reach the service, lacks a device certificate or is missing the license will simply not appear as a managed device.",
   "Beyond configuration, SCM includes operational features that grew out of AIOps (AI for IT operations) for NGFW. These include best practice assessments that score your configuration against Palo Alto Networks recommendations, continuous checks that warn about risky policy changes before or after you push them, health monitoring and predictive alerts about capacity, and dashboards and a command center summarizing threats, users and applications across the fleet. Many organizations also use SCM to gain these insights for firewalls still managed by Panorama, through Panorama's integration with the cloud. That makes SCM useful even before any firewall moves off Panorama.",
   "When should you choose SCM versus Panorama? SCM suits organizations that want no management infrastructure to host, that also use Prisma Access, or that want unified cloud visibility across the fleet. Panorama suits environments that must keep management on premises, including isolated or regulated networks without reliable Internet, and it remains the manager for some integrations. They are not mutually exclusive during migrations, and a common path is to connect an existing Panorama to the cloud first for insights, then move folders of firewalls to SCM once the team is comfortable with the new model.",
   "Mapping the concepts helps you translate experience between the two platforms. Panorama device groups correspond broadly to SCM folders for policy inheritance, and reusable template configuration corresponds to snippets. Panorama template variables correspond to SCM variables, and in both platforms you review a candidate before pushing. The words differ, but the underlying goals of inheritance, reuse and per-device exceptions are the same, so a Panorama administrator can carry most design habits across.",
   "Consider a worked example. A fast-growing company has 20 branch firewalls and Prisma Access for remote users but no data center to host Panorama. It registers the firewalls to its support account, activates cloud management and Strata Logging Service licenses, and onboards the devices to SCM. The firewalls are organized into a Branches folder under the global folder, a snippet holds the standard security profile group and DNS and NTP settings, and per-branch addresses are set as variables. The team reviews the best practice assessment weekly and fixes the lowest-scoring rules first, which gives the board a measurable trend.",
   "Several mistakes come up repeatedly: expecting Panorama terms such as templates and device groups in SCM, onboarding a firewall that cannot reach the cloud service or lacks the right license, forgetting that logs go to Strata Logging Service rather than local collectors, and choosing SCM for a site that is required to stay disconnected from the Internet. Avoid assuming a specific feature exists on every license tier; features and names in cloud services evolve, so confirm current documentation when you plan a deployment, and check which management platform supports each feature you rely on before moving firewalls.",
   "Exam questions tend to test the concepts. 'Cloud-delivered management with nothing to host' is Strata Cloud Manager. 'Hierarchy whose configuration is inherited' is a folder. 'Reusable named configuration block' is a snippet. 'Where do SCM-managed firewalls send logs?' is Strata Logging Service. 'Score configuration against recommendations' is a best practice assessment, and 'isolated network with no Internet' points to Panorama instead."
  ],
  "analogy": "Panorama is like running your own email server in a back room: full control, but you patch it, back it up and keep the lights on. Strata Cloud Manager is like a hosted email service: someone else runs the servers, and you organize mail with folders and reusable templates. The analogy holds for folders and snippets too, since rules set on a folder apply to everything in it. It stops at offline use: a hosted service is no help to a site that must stay disconnected, which is exactly when Panorama remains the answer.",
  "terms": [
   [
    "Strata Cloud Manager (SCM)",
    "The Palo Alto Networks cloud-delivered console for managing and monitoring NGFWs and Prisma Access."
   ],
   [
    "Folder",
    "An SCM hierarchy container whose configuration is inherited by the folders and devices beneath it."
   ],
   [
    "Snippet",
    "A reusable, named set of configuration in SCM that can be applied to folders or devices."
   ],
   [
    "Strata Logging Service",
    "The cloud log service that SCM-managed firewalls forward logs to for visibility and reporting."
   ],
   [
    "Device certificate",
    "The certificate a firewall uses to authenticate to Palo Alto Networks cloud services during onboarding."
   ],
   [
    "Best practice assessment",
    "An evaluation of configuration against Palo Alto Networks recommendations with scores and remediation advice."
   ],
   [
    "AIOps",
    "AI-driven operations features that predict health and capacity problems and flag risky configuration."
   ]
  ],
  "example": "A fast-growing startup has 20 branch firewalls and Prisma Access for remote users but no data center to host Panorama. It onboards the firewalls to Strata Cloud Manager, organizes them into a Branches folder with a snippet holding standard security profiles, forwards logs to Strata Logging Service, and reviews the best practice assessment weekly to fix the weakest rules first.",
  "mistakes": [
   [
    "SCM uses device groups and template stacks, just hosted in the cloud.",
    "SCM uses folders for inherited configuration and snippets for reusable configuration blocks. The concepts map broadly to device groups and templates, but the names and model differ."
   ],
   [
    "Any firewall can be onboarded to SCM as long as you know its admin password.",
    "The firewall must be registered to the support account, licensed for cloud management, hold a device certificate and be able to reach the cloud service."
   ],
   [
    "SCM-managed firewalls keep sending logs to local Log Collectors.",
    "SCM relies on Strata Logging Service for logs, visibility and reporting."
   ],
   [
    "SCM is the right choice for every environment because nothing needs to be hosted.",
    "Sites that must stay isolated from the Internet, or that require on-premises management, still need Panorama."
   ]
  ],
  "tryit": [
   [
    "Ironwood Utilities operates control-center firewalls in a network that regulations require to be completely disconnected from the Internet. A consultant proposes moving all firewall management to Strata Cloud Manager to simplify operations. What do you recommend for those firewalls?",
    "Keep them on Panorama. SCM is cloud-delivered and requires firewalls to reach the cloud service and send logs to Strata Logging Service, which an isolated network cannot do. Other, Internet-connected parts of the company could still use SCM."
   ],
   [
    "A company onboards 12 firewalls to SCM. Eleven appear, but one never shows up as managed. It is licensed and registered to the support account. What should you check?",
    "Check whether the firewall has a valid device certificate and whether its management plane can reach the cloud service, including any service route settings and upstream firewall rules. Connectivity and certificate problems are the usual causes once licensing and registration are confirmed."
   ]
  ],
  "tip": "Map concepts: Panorama device groups and templates correspond to SCM folders and snippets. SCM is cloud-hosted and uses Strata Logging Service; Panorama is customer-hosted and suits on-premises or isolated environments.",
  "check": [
   [
    "What SCM construct holds a reusable set of configuration like a standard DNS and NTP baseline?",
    "A snippet."
   ],
   [
    "Where do firewalls managed by SCM send their logs?",
    "Strata Logging Service."
   ],
   [
    "Why might an organization keep Panorama instead of SCM?",
    "It needs management on premises, for example in an isolated or regulated network without reliable Internet access."
   ],
   [
    "What does a firewall need before it can be onboarded to SCM?",
    "Registration to the support account, the required cloud management license, a device certificate and connectivity to the cloud service."
   ]
  ]
 }
], {"reviewed":"2026-10-07"});
