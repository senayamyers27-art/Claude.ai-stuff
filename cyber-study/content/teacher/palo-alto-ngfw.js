/* Teacher edition for Palo Alto Networks Certified Next-Generation Firewall Engineer (NGFW-Engineer): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("palo-alto-ngfw", [
 {
  "t": "Interface types: Layer 3, Layer 2, virtual wire, tap, loopback, tunnel, VLAN and aggregate Ethernet (LACP); subinterfaces and 802.1Q tags",
  "objectives": [
   "Students will be able to identify the PAN-OS interface type (Layer 3, Layer 2, virtual wire, tap) that fits a stated deployment requirement.",
   "Students will be able to explain the purpose of loopback, tunnel, VLAN and aggregate Ethernet interfaces and what each needs to function.",
   "Students will be able to describe where IP and zone settings belong on an aggregate Ethernet group and why LACP is recommended.",
   "Students will be able to design 802.1Q subinterfaces so multiple VLANs on one port land in separate zones."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the whiteboard without correcting them yet."
   ],
   [
    12,
    "Teach",
    "Draw one firewall with four ports and label each as Layer 3, Layer 2, virtual wire and tap. For each, say what it can and cannot do, stressing that tap cannot block and virtual wire needs no IP addresses. Add loopback, tunnel, VLAN and AE as logical interfaces, then show a trunk with subinterfaces tagged 20 and 30."
   ],
   [
    18,
    "Activity",
    "Run the requirement card sort described below. Circulate and ask each pair to justify one placement aloud."
   ],
   [
    5,
    "Discuss",
    "Review the cards groups disagreed on, then use the discussion questions to surface the tap versus virtual wire distinction."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "A security team wants to try a new firewall on a production link this week, but the network team refuses any change that could drop traffic or require re-addressing. How would you connect it, and what would you give up?",
  "activity": {
   "title": "Requirement card sort: pick the interface",
   "materials": "Printed cards (one requirement per card, about 12 cards per pair), whiteboard divided into columns labeled Layer 3, Layer 2, Virtual wire, Tap, Aggregate Ethernet, Subinterfaces, Loopback/Tunnel/VLAN.",
   "steps": [
    "Before class, write requirements on cards, such as 'terminate an IPsec tunnel', 'observe a SPAN port only', 'insert inline with no re-addressing', 'bundle two 10G links with failover', 'carry VLANs 20 and 30 on one port in different zones', 'always-up address for the GlobalProtect portal'.",
    "Pairs sort their cards into the columns on their desk, writing the one clue word that decided each placement on the card.",
    "Each pair then picks one card and states one configuration detail that must be correct for it to work, such as the IP address going on the ae interface or the subinterface tag matching the switch trunk.",
    "Pairs place two of their cards on the whiteboard columns; the class flags any placement it disagrees with for the discussion."
   ]
  },
  "discussion": [
   "Why might an organization start with a tap interface and later move to virtual wire, and what changes in what the firewall can do?",
   "What could go wrong if the subinterface number and the 802.1Q tag do not match, and which one actually matters?"
  ],
  "exit": [
   [
    "Which interface type can log threats but can never block them?",
    "Tap, because it receives a mirrored copy of traffic and is not in the forwarding path."
   ],
   [
    "Where do you configure the IP address for an aggregate Ethernet bundle?",
    "On the ae interface or its subinterfaces, not on the member ports."
   ],
   [
    "A firewall must perform NAT and terminate a VPN. Which interface type is required?",
    "Layer 3."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page reference table of the four main types with a 'routes, switches, sits in the wire, watches' column, and let them sort only the first six cards.",
   "Extend: Ask fast finishers to design a single firewall that uses virtual wire subinterfaces for two VLANs plus a Layer 3 AE uplink, and list each interface's zone and type."
  ]
 },
 {
  "t": "Security zones: zone types, one zone per interface, intrazone vs interzone default rules, User-ID enablement per zone",
  "objectives": [
   "Students will be able to explain why PAN-OS security policy is written between zones and why an interface without a zone passes no traffic.",
   "Students will be able to match interfaces to the correct zone type, including the External and Tunnel zone types.",
   "Students will be able to state the behavior and logging defaults of intrazone-default and interzone-default and how to override them.",
   "Students will be able to decide on which zones User Identification should be enabled and justify the choice."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let two or three students answer, then reveal the defaults."
   ],
   [
    12,
    "Teach",
    "Draw a firewall with Trust, Untrust and DMZ zones. Trace one intrazone and one interzone flow, show the two default rules at the bottom of a projected rulebase, and explain Override for logging. Cover zone types, the one zone per interface rule and the User Identification checkbox."
   ],
   [
    18,
    "Activity",
    "Run the rulebase walk-through described below in small groups."
   ],
   [
    5,
    "Discuss",
    "Groups share one surprising result and the class discusses the questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If you write no security rules at all on a brand new firewall, which traffic do you think will pass and which will be blocked? Will you see any of it in the logs?",
  "activity": {
   "title": "Trace the flow: which rule matches?",
   "materials": "Projector or printed handout with a short rulebase (four custom rules plus the two default rules) and a zone diagram; printed flow cards; whiteboard.",
   "steps": [
    "Give each group the zone diagram, the rulebase and eight flow cards, such as 'DMZ web server to DMZ database on mysql' or 'Guest laptop to Trust file server'.",
    "For each card, groups record the source zone, destination zone, the rule that matches and whether a log entry is written.",
    "Groups then propose one change, such as an intrazone deny with logging or an override on interzone-default, that would satisfy an auditor's request to see blocked traffic.",
    "Finally each group decides which zones in the diagram should have User Identification enabled and writes one sentence explaining why Untrust should not."
   ]
  },
  "discussion": [
   "Why might Palo Alto Networks make intrazone traffic allowed by default, and when is that default risky?",
   "What is the trade-off between logging the default deny rule and the volume of logs it creates?"
  ],
  "exit": [
   [
    "What do intrazone-default and interzone-default do by default, and do they log?",
    "Intrazone-default allows same-zone traffic, interzone-default denies cross-zone traffic, and neither logs unless overridden."
   ],
   [
    "Can one subinterface belong to two zones?",
    "No, each interface or subinterface belongs to exactly one zone."
   ],
   [
    "Which zones should have Enable User Identification turned on?",
    "Only trusted internal zones where users originate, not Internet-facing zones."
   ]
  ],
  "differentiation": [
   "Support: Pair struggling students with a partner and give them a color-coded zone diagram where same-zone flows are one color, so they can see intrazone versus interzone before choosing rules.",
   "Extend: Ask fast finishers to explain how a universal rule listing two zones on each side differs from an interzone rule, and rewrite one rule from the handout to remove unintended access."
  ]
 },
 {
  "t": "Zone protection profiles (flood, reconnaissance, packet-based) and interface management profiles",
  "objectives": [
   "Students will be able to explain where a zone protection profile is applied and why it acts before security policy.",
   "Students will be able to describe the Alarm, Activate and Maximum flood thresholds and compare RED with SYN cookies.",
   "Students will be able to distinguish zone protection from DoS protection policy and choose the right tool for a scenario.",
   "Students will be able to configure an interface management profile that allows only the needed services, including Response Pages when required."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student ideas for stopping a flood."
   ],
   [
    12,
    "Teach",
    "Sketch a rising line graph of connections per second with three horizontal lines for Alarm, Activate and Maximum. Explain RED and SYN cookies, reconnaissance protection with exclusions, and a few packet-based options. Contrast zone-wide protection with DoS protection policy for single hosts, then introduce interface management profiles."
   ],
   [
    18,
    "Activity",
    "Run the incident triage role-play described below."
   ],
   [
    5,
    "Discuss",
    "Debrief the triage choices using the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "A website is getting thousands of fake connection attempts per second. Why might writing a normal firewall rule be too slow or too late to help?",
  "activity": {
   "title": "Incident triage: which protection fits?",
   "materials": "Printed incident cards (eight scenarios), a whiteboard with columns Zone protection, DoS protection policy, Interface management profile, and Not a firewall setting; markers.",
   "steps": [
    "Groups of three take roles: on-call engineer, security lead and change approver.",
    "For each incident card, such as 'SYN flood against the whole Internet edge', 'one payment server needs per-source limits', 'block page not displayed' or 'own scanner is being blocked', the engineer proposes a fix, the security lead checks it, and the approver asks one risk question.",
    "Groups write the chosen setting and the specific option, for example SYN cookies, block-ip, a scanner exclusion or the Response Pages checkbox.",
    "Each group posts two cards under the matching whiteboard column and explains one choice to the class."
   ]
  },
  "discussion": [
   "Why is copying flood thresholds from another organization a poor idea, and how would you choose your own?",
   "Why are many packet-based protection options disabled by default, and how should you enable them safely?"
  ],
  "exit": [
   [
    "To which zone do you attach a zone protection profile meant to stop Internet floods?",
    "The ingress zone where the traffic enters, typically Untrust."
   ],
   [
    "Name the three flood thresholds in order.",
    "Alarm, Activate and Maximum."
   ],
   [
    "Users get a timeout instead of the URL block page. What should you check?",
    "That the interface management profile on that interface includes Response Pages."
   ]
  ],
  "differentiation": [
   "Support: Provide a simple decision chart with three questions (whole zone or one host, attack or management access, before policy or as a rule) that leads to the right tool.",
   "Extend: Ask fast finishers to write a short change plan for enabling packet-based protections in a test window, including what to watch in the Threat log."
  ]
 },
 {
  "t": "Routing: virtual routers vs logical routers (Advanced Routing Engine), static routes, OSPF, BGP, administrative distance defaults, ECMP",
  "objectives": [
   "Students will be able to compare virtual routers with logical routers on the Advanced Routing Engine and state how logical routers are enabled.",
   "Students will be able to apply the route selection order of longest prefix, administrative distance and metric using PAN-OS default AD values.",
   "Students will be able to configure a floating static route behind a dynamic protocol.",
   "Students will be able to explain per-session ECMP load balancing and the Symmetric Return option."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and have students vote by raising hands."
   ],
   [
    12,
    "Teach",
    "Write the PAN-OS AD defaults on the board and highlight OSPF internal 30 and iBGP 200. Walk through the longest prefix, AD, metric order with two examples. Explain virtual routers versus logical routers, then ECMP methods and per-session balancing."
   ],
   [
    18,
    "Activity",
    "Run the route table tournament described below."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions and correct any lingering AD confusion."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A firewall knows two ways to reach the same network: one typed in by an admin and one learned from OSPF. Which do you think it uses by default, and would your answer change on a different vendor's router?",
  "activity": {
   "title": "Route table tournament",
   "materials": "Printed route cards (prefix, source protocol, AD, metric), printed destination IP cards, whiteboard bracket, AD reference table projected.",
   "steps": [
    "Pairs receive a stack of route cards for the same firewall and five destination cards.",
    "For each destination, pairs pick the winning route and write which rule decided it: longest prefix, AD or metric.",
    "Pairs then adjust one static route's AD so that it becomes a floating backup behind OSPF, and write the new value with a reason.",
    "Finish with two cards showing equal routes; pairs explain what ECMP would do with a single long download session versus many short sessions."
   ]
  },
  "discussion": [
   "Why might an organization choose to migrate to logical routers, and what precautions would you take before enabling Advanced Routing?",
   "When would you prefer a static route with path monitoring over running a dynamic routing protocol at a small branch?"
  ],
  "exit": [
   [
    "What is the PAN-OS default AD for OSPF internal routes?",
    "30."
   ],
   [
    "A /24 learned by iBGP and a /16 static route both cover a destination. Which wins and why?",
    "The /24, because longest prefix match is checked before administrative distance."
   ],
   [
    "Is ECMP balancing per packet or per session?",
    "Per session."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-step flowchart (compare prefix length, then AD, then metric) and let them use the projected AD table during the activity.",
   "Extend: Ask fast finishers to explain OSPF neighbor symptoms, such as ExStart stuck versus no neighbor at all, and the likely cause of each."
  ]
 },
 {
  "t": "Policy-based forwarding with path monitoring; service routes; DHCP server/relay and DNS proxy",
  "objectives": [
   "Students will be able to explain how policy-based forwarding overrides the routing table and list its match criteria and actions.",
   "Students will be able to explain why application-based PBF does not catch the first session and how the application cache resolves it.",
   "Students will be able to configure PBF path monitoring and symmetric return for a dual-ISP site.",
   "Students will be able to distinguish PBF from service routes and choose between DHCP server, DHCP relay and DNS proxy for a requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sort answers into 'user traffic' and 'firewall's own traffic' on the board."
   ],
   [
    12,
    "Teach",
    "Draw a branch with MPLS and broadband. Show a PBF rule for the Guest zone, then fail the broadband link to show Fail Over versus Wait Recover. Explain the application cache, symmetric return, service routes, DHCP server versus relay, and DNS proxy domain rules."
   ],
   [
    18,
    "Activity",
    "Run the branch design whiteboard exercise described below."
   ],
   [
    5,
    "Discuss",
    "Groups compare designs and discuss the questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A branch firewall cannot download its own software updates, and guest Wi-Fi is using the expensive company circuit. Are these the same kind of problem? Why or why not?",
  "activity": {
   "title": "Design the branch: steer, serve and resolve",
   "materials": "Whiteboard or large paper per group, markers, a printed requirements sheet for a two-link retail branch.",
   "steps": [
    "Groups receive requirements: guests use broadband, POS stays on MPLS, guests fall back to MPLS if broadband fails, updates must work though MGT is isolated, staff get addresses from a central server, and internal domains resolve to internal DNS.",
    "Groups draw the branch and label each requirement with the feature that meets it: PBF, path monitoring action, symmetric return, service route, DHCP relay or DNS proxy domain rule.",
    "For the PBF rule, groups write the match criteria, action, egress interface, next hop and monitored IP.",
    "Groups trade drawings with a neighbor, who must find one missing piece, such as the security rule for the new egress zone."
   ]
  },
  "discussion": [
   "What risks come with an application-based PBF rule, and when would you use address or service criteria instead?",
   "When would Wait Recover be a better choice than Fail Over for PBF path monitoring?"
  ],
  "exit": [
   [
    "Why might the first session of an application ignore an app-based PBF rule?",
    "The PBF decision happens on the first packet before App-ID identifies the app; later sessions match through the application cache."
   ],
   [
    "The MGT port has no Internet and updates fail. What do you configure?",
    "A service route so update traffic uses a data interface with Internet access."
   ],
   [
    "Can an interface be both a DHCP server and a DHCP relay?",
    "No."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column card labeled 'traffic through the firewall' and 'traffic from the firewall itself' to sort requirements before choosing features.",
   "Extend: Ask fast finishers to add a No PBF rule that keeps guest access to an internal captive portal on MPLS and explain the rule order."
  ]
 },
 {
  "t": "NAT on Layer 3 interfaces: source NAT (DIPP, dynamic IP, static), destination NAT, U-turn NAT, pre-NAT IP vs post-NAT zone in security rules",
  "objectives": [
   "Students will be able to differentiate DIPP, Dynamic IP and Static IP source NAT and pick one for a scenario.",
   "Students will be able to configure destination NAT to publish an internal server.",
   "Students will be able to determine the correct addresses and zones for NAT rules and security rules using the pre-NAT address and post-NAT zone principle.",
   "Students will be able to explain why U-turn NAT translates the source and when split DNS is an alternative."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and record answers for later comparison."
   ],
   [
    12,
    "Teach",
    "Draw Untrust, DMZ and Trust zones with a published web server. Walk a packet step by step: ingress zone, route lookup on the pre-NAT destination, NAT match, security match with pre-NAT address and post-NAT zone, then translation. Cover the three source NAT types and U-turn NAT."
   ],
   [
    18,
    "Activity",
    "Run the rule-writing relay described below."
   ],
   [
    5,
    "Discuss",
    "Review the warm-up answers against what the class learned and discuss the questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "An outside visitor connects to your web server's public address, and the firewall changes it to a private address. When the firewall checks whether to allow the session, which address do you think it compares: the public one or the private one?",
  "activity": {
   "title": "NAT and security rule relay",
   "materials": "Printed scenario sheets with network diagrams and blank NAT and security rule tables; whiteboard; projector to show answers.",
   "steps": [
    "Teams of three line up: one writes the NAT rule, one writes the security rule, one acts as checker.",
    "For each scenario (inbound web server, outbound user Internet access, internal users reaching the server by public IP, partner needing bi-directional static NAT), the first two members fill in zones, addresses and translation fields.",
    "The checker verifies the security rule uses the pre-NAT address and post-NAT zone and the NAT rule uses the zone from routing the pre-NAT destination, then rotates roles.",
    "The teacher projects the answers and teams score one point per correct field."
   ]
  },
  "discussion": [
   "Why do you think PAN-OS evaluates security policy using the post-NAT zone but the pre-NAT address?",
   "When would split DNS be a cleaner solution than U-turn NAT, and what does each require?"
  ],
  "exit": [
   [
    "For an inbound published server, which destination address and zone go in the security rule?",
    "The public pre-NAT address and the post-NAT zone, such as DMZ."
   ],
   [
    "Which source NAT type can run out of addresses?",
    "Dynamic IP."
   ],
   [
    "Why does U-turn NAT also translate the source address?",
    "So the server replies through the firewall instead of directly to the client, keeping the session symmetric."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a fill-in template with the phrase 'Address before, Zone after' printed on it and pre-filled zones for the first scenario.",
   "Extend: Ask fast finishers to write the test nat-policy-match and test security-policy-match inputs for one scenario and predict the output."
  ]
 },
 {
  "t": "High availability: active/passive vs active/active, HA1/HA2/HA3 and backup links, priority and preemption, link and path monitoring, floating IPs",
  "objectives": [
   "Students will be able to compare active/passive and active/active HA, including supported deployment types.",
   "Students will be able to identify the purpose of HA1, HA2, HA3 and backup links and explain how backup links prevent split brain.",
   "Students will be able to predict failover and failback behavior from device priority and preemption settings.",
   "Students will be able to configure link and path monitoring to catch failures that heartbeats miss."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect a few answers."
   ],
   [
    12,
    "Teach",
    "Draw two firewalls with labeled HA1, HA2 and backup links, then add HA3 for active/active. Explain priority (lower wins), preemption on both peers, link groups with any and all, path monitoring and floating IPs."
   ],
   [
    18,
    "Activity",
    "Run the HA failure role-play described below."
   ],
   [
    5,
    "Discuss",
    "Debrief using the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you had two identical firewalls, how would the backup one know that the main one had stopped working? Can you think of a failure it might not notice?",
  "activity": {
   "title": "Role-play: the HA pair under pressure",
   "materials": "Printed role cards (Firewall A, Firewall B, HA1 link, HA2 link, upstream switch), printed failure event cards, sticky notes, whiteboard.",
   "steps": [
    "Groups of five take roles; the two firewall players note their priority and preemption settings on sticky notes.",
    "The teacher reads failure events one at a time, such as 'HA1 cable unplugged with no backup', 'upstream switch port dies', 'Firewall A recovers' or 'HA2 link fails'.",
    "For each event, firewall players announce their new state and the link players say what is lost, such as heartbeats or session synchronization.",
    "Groups record which configuration change (backup link, link group, path monitoring, preemption on both peers) would have produced a better outcome."
   ]
  },
  "discussion": [
   "Why is active/passive recommended for most designs even though active/active uses both firewalls?",
   "What are the pros and cons of leaving preemption disabled?"
  ],
  "exit": [
   [
    "Which HA link keeps existing sessions alive after failover?",
    "HA2."
   ],
   [
    "Firewall A has priority 50 and Firewall B has priority 100. Which is preferred active?",
    "Firewall A, because the lower number wins."
   ],
   [
    "What causes split brain and how do you prevent it?",
    "Loss of the only HA1 link so both peers go active; prevent it with an HA1 backup link."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a labeled diagram card with 'Control, Copy, Carry' next to HA1, HA2 and HA3 to keep during the role-play.",
   "Extend: Ask fast finishers to explain how floating IPs and ARP load-sharing differ in active/active and when each would be used."
  ]
 },
 {
  "t": "Site-to-site IPsec: IKE gateway, IKE and IPsec crypto profiles, tunnel interfaces, proxy IDs, tunnel monitoring",
  "objectives": [
   "Students will be able to list the components of a route-based PAN-OS IPsec VPN and the order in which they are configured.",
   "Students will be able to distinguish phase 1 settings in the IKE crypto profile and IKE gateway from phase 2 settings in the IPsec crypto profile.",
   "Students will be able to determine when proxy IDs are required and how they must match a policy-based peer.",
   "Students will be able to troubleshoot tunnel symptoms using tunnel monitoring, routing and security policy checks."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and write student ideas for the 'two steps' on the board."
   ],
   [
    12,
    "Teach",
    "Build the VPN on the board in order: tunnel interface, IKE crypto profile, IPsec crypto profile, IKE gateway, IPsec tunnel. Explain proxy IDs with a policy-based peer, tunnel monitoring versus dead peer detection, and the route plus security rule requirement."
   ],
   [
    18,
    "Activity",
    "Run the paired log troubleshooting exercise described below."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions and link symptoms to phases."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Two offices want to send private files to each other across the public Internet. What would they need to agree on before any file is sent?",
  "activity": {
   "title": "Pair troubleshooting: read the VPN symptoms",
   "materials": "Printed symptom sheets with short, teacher-written System log and CLI excerpts (for example IKE phase 1 failures, phase 2 proposal mismatches, a green tunnel with no route), a printed configuration summary for each case, whiteboard.",
   "steps": [
    "Pairs receive six cases, each with a symptom, a log excerpt and a configuration summary.",
    "For each case, pairs decide whether the problem is phase 1, phase 2, routing, security policy or monitoring, and circle the evidence.",
    "Pairs write the fix, such as matching the DH group, adding mirrored proxy IDs, adding a route to the tunnel interface, or adding an IP address to the tunnel interface for monitoring.",
    "Two pairs compare answers and agree on the one case they found hardest to share with the class."
   ]
  },
  "discussion": [
   "Why does Palo Alto Networks favor route-based VPNs over policy-based VPNs, and what does that make easier?",
   "How is tunnel monitoring different from dead peer detection, and why might you want both?"
  ],
  "exit": [
   [
    "Which object ties the tunnel interface, IKE gateway and IPsec crypto profile together?",
    "The IPsec tunnel under Network > IPsec Tunnels."
   ],
   [
    "Phase 1 is up but phase 2 fails with a policy-based peer. What is the most likely cause?",
    "Mismatched proxy IDs."
   ],
   [
    "What does tunnel monitoring require on the tunnel interface?",
    "An IP address to source the monitoring pings."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column cheat sheet separating phase 1 settings from phase 2 settings to use while reading the logs.",
   "Extend: Ask fast finishers to design a primary and backup tunnel pair with tunnel monitoring and explain how routing moves traffic on failure."
  ]
 },
 {
  "t": "Quantum-resistant IKEv2 VPNs (post-quantum preshared keys) and GRE tunnels",
  "objectives": [
   "Students will be able to explain the harvest now, decrypt later threat and why it matters for long-lived confidential data.",
   "Students will be able to describe how post-quantum preshared keys protect IKEv2 tunnels and the configuration requirements for both peers.",
   "Students will be able to compare requiring a PPK with allowing fallback and choose a setting for a given peer.",
   "Students will be able to contrast GRE tunnels with IPsec and identify when GRE alone is inappropriate."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and discuss briefly."
   ],
   [
    12,
    "Teach",
    "Explain harvest now, decrypt later with a timeline drawing. Show how a PPK is mixed into key derivation and never sent, the IKEv2-only rule, matching key IDs, and the required versus fallback setting. Mention hybrid key exchange as a concept. Then explain GRE as unencrypted encapsulation with keepalives."
   ],
   [
    18,
    "Activity",
    "Run the tunnel advisor case study described below."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions as a class."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If someone recorded all of your encrypted messages today, would it matter if they could read them in fifteen years? Which kinds of data would still be sensitive then?",
  "activity": {
   "title": "Tunnel advisor case study",
   "materials": "Printed case cards describing five organizations and their tunnel needs, a whiteboard table with columns IPsec with PPK, IPsec without PPK, GRE, GRE plus protection.",
   "steps": [
    "Small groups receive cases such as long-term bank replication data, a cloud service that requires GRE, a partner device without PPK support, an IKEv1-only legacy peer, and multicast routing to a peer over a private link.",
    "Groups recommend a tunnel type and, for PPK cases, the negotiation setting (required or allow fallback), writing a one-sentence justification.",
    "Groups list one configuration detail that must match on both peers for their recommendation, such as the key and key ID or the IKE version.",
    "Each group presents one case and the class challenges any recommendation that sends sensitive data over GRE alone."
   ]
  },
  "discussion": [
   "Why is it reasonable to deploy quantum-resistant protection now, before large quantum computers exist?",
   "What are the operational risks of managing PPKs, and how would you reduce them?"
  ],
  "exit": [
   [
    "Can a PPK be used with an IKEv1 gateway?",
    "No, PPKs are an IKEv2 extension."
   ],
   [
    "Why does a PPK help even if Diffie-Hellman is broken later?",
    "It is mixed into key derivation but never transmitted, so the session keys cannot be derived without it."
   ],
   [
    "Does GRE encrypt traffic?",
    "No, GRE only encapsulates packets and provides no confidentiality or integrity."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students the envelope analogy on a card (GRE as an outer envelope, PPK as a secret phrase agreed in person) and a short glossary of DH, IKEv2 and KEM.",
   "Extend: Ask fast finishers to explain the idea behind hybrid key exchange and why the result is at least as strong as the stronger method."
  ]
 },
 {
  "t": "GlobalProtect: portal, gateways (internal/external), authentication, connect methods (user-logon, pre-logon, on-demand), split tunneling, HIP objects and profiles, IPsec vs SSL tunnels",
  "objectives": [
   "Students will be able to distinguish the roles of the GlobalProtect portal, external gateways and internal gateways.",
   "Students will be able to select a connect method (user-logon, pre-logon, on-demand) for a stated user need and name its prerequisites.",
   "Students will be able to compare full tunnel with split tunneling and IPsec with SSL tunnels.",
   "Students will be able to build a HIP-based access requirement using HIP objects, HIP profiles and security rules."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list answers."
   ],
   [
    12,
    "Teach",
    "Draw the app, the portal and two gateways. Explain configuration delivery, gateway selection and internal host detection. Cover the connect methods with a timeline of a laptop booting, then split tunneling, IPsec versus SSL fallback, and the HIP object to HIP profile to security rule chain."
   ],
   [
    18,
    "Activity",
    "Run the help desk ticket role-play described below."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions and link tickets to features."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When you work from home or a coffee shop, how could your company still protect you and its data the same way it does in the office?",
  "activity": {
   "title": "Help desk ticket role-play",
   "materials": "Printed ticket cards (eight user complaints), printed configuration option cards (portal, external gateway, internal gateway, user-logon, pre-logon, on-demand, split tunnel include, split tunnel exclude, IPsec, SSL fallback, HIP object, HIP profile), whiteboard.",
   "steps": [
    "Pairs take turns as the user reading a ticket and the engineer choosing configuration option cards to fix it.",
    "Tickets include 'cannot reset expired password at sign-in', 'video calls stutter on hotel Wi-Fi', 'finance server should require disk encryption', 'office laptops need user-based rules without a tunnel' and 'contractor only connects once a week'.",
    "The engineer explains the fix and one prerequisite, such as machine certificates for pre-logon or a GlobalProtect subscription for HIP checks.",
    "Pairs post their hardest ticket and solution on the whiteboard for the class to review."
   ]
  },
  "discussion": [
   "What security visibility do you lose with split tunneling, and when is that trade-off acceptable?",
   "Why might an organization deploy internal gateways even though users are already on the corporate network?"
  ],
  "exit": [
   [
    "Which component delivers the configuration and gateway list to the app?",
    "The portal."
   ],
   [
    "Which connect method lets remote users reset passwords at the sign-in screen, and what does it need?",
    "Pre-logon, which needs a machine certificate on the endpoint."
   ],
   [
    "What do you place in a security rule to require disk encryption?",
    "A HIP profile that references a HIP object checking disk encryption."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a simple flow diagram (app to portal for instructions, app to gateway for traffic) and a timeline card showing when each connect method starts.",
   "Extend: Ask fast finishers to design the authentication for portal and gateway using a certificate profile plus SAML, and explain where authentication override cookies help."
  ]
 },
 {
  "t": "Administrator accounts: dynamic roles vs admin role profiles, API and CLI permissions",
  "objectives": [
   "Students will be able to distinguish the PAN-OS dynamic roles (Superuser, Superuser read-only, Device Administrator, Device Administrator read-only, Virtual System Administrator) by what each can and cannot do.",
   "Students will be able to compare dynamic roles with admin role profiles in terms of granularity and maintenance after upgrades.",
   "Students will be able to design an API-only or read-only administrator role by choosing web interface, XML API, REST API and CLI settings.",
   "Students will be able to identify the log and authentication features that provide administrator accountability, including the Config log and vendor-specific attributes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about a shared admin account. Collect two or three answers and write the word accountability on the board."
   ],
   [
    12,
    "Teach",
    "Walk through Device > Administrators and Device > Admin Roles on projected screenshots or a whiteboard sketch. Contrast dynamic roles (self-updating, coarse) with admin role profiles (granular, manual upkeep). Show the four permission areas: Web UI, XML API, REST API, Command Line. Explain VSAs and the Config log."
   ],
   [
    18,
    "Activity",
    "Run the Role Builder card activity in pairs. Circulate and ask each pair to justify why their choice is least privilege."
   ],
   [
    5,
    "Discuss",
    "Have pairs share one design and debate the discussion questions, especially the maintenance cost of custom profiles."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper or sticky notes and hand them in."
   ]
  ],
  "warmup": "Six engineers and two scripts all log in to a firewall as `admin`. A risky rule appears overnight. What questions can you not answer, and what would you change first?",
  "activity": {
   "title": "Role Builder",
   "materials": "Printed persona cards (six to eight), a printed role worksheet with columns for Web UI areas, XML API types, REST API, and Command Line, pens, whiteboard.",
   "steps": [
    "Give each pair three persona cards, such as a SIEM log-pull script, a help desk analyst, a tenant administrator on vsys2, a senior engineer who onboards new admins, and a backup script that exports configuration.",
    "For each persona, pairs decide whether a dynamic role fits or an admin role profile is needed, and fill in the worksheet with Enable, Read Only or Disable for each area, the CLI level, and the API types.",
    "Pairs swap worksheets with another pair, who acts as auditor and tries to find one permission that is broader than needed.",
    "The teacher reveals a model answer for two personas (the SIEM script and the senior engineer) and explains why Superuser is required only for the engineer who creates admin accounts."
   ]
  },
  "discussion": [
   "When would you accept the convenience of a dynamic role even though a custom profile could be tighter?",
   "How would you make sure custom admin role profiles are reviewed after every PAN-OS upgrade?",
   "What are the advantages of assigning admin roles from a RADIUS or SAML server instead of creating local accounts?"
  ],
  "exit": [
   [
    "Which role type automatically gains access to new features after an upgrade?",
    "A dynamic role, such as Superuser or Device Administrator."
   ],
   [
    "A script needs only to read logs through the XML API. What role settings do you choose?",
    "An admin role profile with all web interface areas disabled, Command Line set to none, REST API disabled, and only the XML API Log type enabled."
   ],
   [
    "Which log shows the administrator who changed a security rule?",
    "The Config log."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column comparison chart (dynamic role versus admin role profile) with rows for granularity, upgrade behavior, API control and CLI control, and let them fill it in before attempting the persona cards.",
   "Extend: Ask fast finishers to design the RADIUS VSA scheme for three admin groups, naming which role or profile each group receives and how a vsys-restricted admin would be handled."
  ]
 },
 {
  "t": "Server profiles (LDAP, RADIUS, TACACS+, SAML, Kerberos), authentication profiles and sequences, MFA",
  "objectives": [
   "Students will be able to explain the layered relationship between server profiles, authentication profiles and authentication sequences.",
   "Students will be able to compare LDAP, RADIUS, TACACS+, SAML and Kerberos by transport, encryption and typical use.",
   "Students will be able to design an authentication sequence with a secure local fallback for administrator access.",
   "Students will be able to identify where MFA can be enforced: at a SAML IdP, a RADIUS server, the Factors tab, or Authentication policy."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the RADIUS outage. List student ideas on the board under the headings Where, How, Order."
   ],
   [
    13,
    "Teach",
    "Draw the three layers as stacked boxes: server profile, authentication profile, sequence, with features (admin login, GlobalProtect, portal) pointing at the top. Fill in a protocol comparison table together: transport, what is encrypted, typical use. Show the Factors tab and the username modifier."
   ],
   [
    17,
    "Activity",
    "Run the Protocol Match card sort, then the fallback design challenge in small groups."
   ],
   [
    5,
    "Discuss",
    "Groups present their fallback design. Discuss the security of break-glass local accounts."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions individually."
   ]
  ],
  "warmup": "Your firewall admins all log in through RADIUS. The RADIUS servers just went offline during an incident. What happens to your ability to manage the firewall, and how could you have prepared?",
  "activity": {
   "title": "Protocol Match and Fallback Design",
   "materials": "Printed cards with protocol names (LDAP, RADIUS, TACACS+, SAML, Kerberos) and description cards (for example \"TCP, encrypts whole payload\", \"imports IdP metadata\", \"provides group mapping\", \"ticket-based SSO with a keytab\", \"UDP, encrypts only the password\"), whiteboard, markers.",
   "steps": [
    "In groups of three, students match each description card to the correct protocol card, then compare with a neighboring group and resolve any disagreements.",
    "Give each group a scenario card: admins use TACACS+, VPN users use a cloud IdP, and one site has unreliable links to the data center.",
    "Groups sketch on the whiteboard which server profiles, authentication profiles and sequences they would create and which feature references each one.",
    "Each group must state where MFA happens for each user population and how the local emergency account is protected."
   ]
  },
  "discussion": [
   "What are the risks of a local break-glass account, and how do you reduce them?",
   "Why might an organization prefer letting a SAML IdP handle MFA instead of configuring MFA on the firewall?",
   "How does the username modifier help when users type names in different formats?"
  ],
  "exit": [
   [
    "What is the difference between a server profile and an authentication profile?",
    "A server profile says how to reach the external server; an authentication profile chooses the method and server and adds the allow list, lockout, username format and MFA factors."
   ],
   [
    "Which protocol uses TCP and encrypts the entire payload?",
    "TACACS+."
   ],
   [
    "What object lets the firewall try RADIUS first and then the local database?",
    "An authentication sequence."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed layer diagram with the feature and server boxes filled in, so students only need to add the authentication profile and sequence in between.",
   "Extend: Ask students to explain how Kerberos SSO through Authentication Portal requires both a Kerberos server profile and a keytab, and when you would choose it over SAML."
  ]
 },
 {
  "t": "Authentication policy and Authentication Portal",
  "objectives": [
   "Students will be able to explain when Authentication policy is needed in addition to passive User-ID sources.",
   "Students will be able to compare browser-challenge, web-form and no-captive-portal enforcement methods.",
   "Students will be able to choose between transparent and redirect Authentication Portal modes based on interface type and requirements.",
   "Students will be able to apply Authentication policy to require MFA before non-web access, such as SSH to a server."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about guest laptops and record answers. Point out that User-ID sources are passive."
   ],
   [
    13,
    "Teach",
    "Sketch the flow on the whiteboard: unknown user, authentication rule match, portal challenge, IP-to-user mapping, then security policy. Compare the three enforcement methods and the two portal modes in a table. Explain decryption for HTTPS and the browser-first approach for SSH."
   ],
   [
    17,
    "Activity",
    "Run the Portal Design Clinic: groups solve scenario cards and draw the configuration."
   ],
   [
    5,
    "Discuss",
    "Groups share one scenario and the class critiques timeouts and rule order."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A visitor's laptop joins your guest Wi-Fi. It never logs in to your domain. How could the firewall learn who is using it, and why would that matter for policy?",
  "activity": {
   "title": "Portal Design Clinic",
   "materials": "Printed scenario cards (four), blank configuration worksheets with fields for rule match criteria, enforcement object, portal mode, timeout and supporting settings, whiteboard.",
   "steps": [
    "Form groups of three and give each group two scenario cards, such as a virtual wire deployment for contractors, a domain campus wanting silent SSO, a guest Wi-Fi with redirect mode, and MFA before SSH to a jump server.",
    "Groups fill in the worksheet: source zone and user, service or URL category, enforcement method, portal mode, timeout, and any needed decryption rule or interface management profile.",
    "Each group writes one sentence explaining what the security policy must still do after authentication.",
    "Groups swap worksheets and check each other's work against a teacher-provided checklist (Layer 3 for redirect, Response Pages, decryption for HTTPS, browser first for non-web)."
   ]
  },
  "discussion": [
   "How would you choose an authentication timeout for guest users compared with step-up MFA to a sensitive server?",
   "Why might an organization prefer browser-challenge on its campus but web-form on its guest network?",
   "What could go wrong if the no-captive-portal exception rule were placed below a broad authentication rule?"
  ],
  "exit": [
   [
    "Which portal mode should you use on a firewall deployed in Layer 2 or virtual wire?",
    "Transparent mode."
   ],
   [
    "What does a no-captive-portal enforcement object do?",
    "It lets matching traffic pass without authentication, usually as an exception above broader rules."
   ],
   [
    "How do you require MFA before an SSH session to a server?",
    "Create an authentication rule for that traffic with an MFA-enabled profile; the user authenticates in a browser first, then SSH is allowed until the timeout."
   ]
  ],
  "differentiation": [
   "Support: Give students a flowchart template with blanks (Is the traffic web? Is it HTTPS? Is the interface Layer 3?) to guide each design decision.",
   "Extend: Ask students to explain why redirect mode supports session cookies and Kerberos while transparent mode does not, and what the redirect host's DNS name must resolve to."
  ]
 },
 {
  "t": "Virtual systems: vsys creation, interfaces/zones/routers per vsys, shared gateway, inter-vsys traffic via external zones",
  "objectives": [
   "Students will be able to explain what a virtual system is and which resources (interfaces, zones, routers, objects, admins) belong to a vsys.",
   "Students will be able to describe the steps to create additional vsys, including enabling Multi Virtual System Capability and setting resource limits.",
   "Students will be able to configure inter-vsys traffic on paper using external zones, visible virtual systems, routing and two security rules.",
   "Students will be able to compare a shared gateway with an ordinary vsys and identify where security is enforced."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up apartment-building question and connect answers to the idea of logical firewalls."
   ],
   [
    12,
    "Teach",
    "Draw a physical firewall containing vsys1, vsys2 and a shared gateway. Label which items belong to exactly one vsys and which can be shared. Trace an inter-vsys session and count the rules it needs. Explain the shared gateway's routing, NAT and PBF, with no security policy."
   ],
   [
    18,
    "Activity",
    "Run the Two Firewalls in One whiteboard build in groups of four."
   ],
   [
    5,
    "Discuss",
    "Groups present their designs and the class identifies any missing rule, zone or route."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Two companies share one office building. What must each have to themselves, and what can they safely share? How would you let them pass documents to each other?",
  "activity": {
   "title": "Two Firewalls in One",
   "materials": "Whiteboard or large paper per group, markers, printed requirement cards, sticky notes in two colors (one for vsys1 objects, one for vsys2 objects).",
   "steps": [
    "Give each group a requirement card: vsys1 (Finance) and vsys2 (Research) share one appliance, both need Internet access through one outside interface, and Finance's reporting server must reach a database in Research.",
    "Groups draw the appliance, place interfaces and zones on colored sticky notes in the correct vsys, and add a shared gateway with the outside interface.",
    "Groups add the external zones, visible virtual system settings, the route between virtual routers, and write the two security rules on sticky notes in the right vsys.",
    "Rotate: each group inspects another group's board and adds a red sticky note to anything missing, such as a one-sided rule or an interface in two vsys."
   ]
  },
  "discussion": [
   "When would you choose separate virtual routers per vsys instead of sharing one?",
   "What are the trade-offs between using multiple vsys and buying separate physical firewalls?",
   "Why is it useful that inter-vsys sessions appear in both vsys Traffic logs?"
  ],
  "exit": [
   [
    "What zone type is used to pass traffic from vsys1 to vsys2?",
    "An external zone, configured in each vsys and pointing at the other."
   ],
   [
    "Does a shared gateway have its own security policy?",
    "No; it provides routing, NAT and PBF, and security is enforced in the tenant vsys."
   ],
   [
    "Can one interface be assigned to two vsys?",
    "No; each interface and each zone belongs to exactly one vsys."
   ]
  ],
  "differentiation": [
   "Support: Provide a pre-drawn template with boxes for vsys1, vsys2 and the shared gateway, and a checklist of items to place (interfaces, zones, external zones, routes, rules).",
   "Extend: Ask students to add resource limits for each vsys and explain what symptoms a tenant would see if their maximum sessions limit were reached."
  ]
 },
 {
  "t": "Logging: log types, log forwarding profiles, syslog/SNMP/email/HTTP server profiles, Device > Log Settings, Strata Logging Service",
  "objectives": [
   "Students will be able to identify the main PAN-OS log types and what generates each one.",
   "Students will be able to distinguish policy-generated logs forwarded by log forwarding profiles from non-policy logs forwarded through Device > Log Settings.",
   "Students will be able to select the right server profile (syslog, SNMP, email, HTTP) for a forwarding requirement.",
   "Students will be able to troubleshoot missing logs by checking rule logging settings, security profiles, forwarding attachments and Strata Logging Service or Panorama status."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about missing threat logs in the SIEM. List possible causes on the board."
   ],
   [
    12,
    "Teach",
    "Draw the logging pipeline: rule match and profiles generate logs, log forwarding profile or Device > Log Settings selects them, server profiles define destinations. Show a projected Traffic log filter. Explain the default profile name, session start versus end, and Strata Logging Service."
   ],
   [
    18,
    "Activity",
    "Run the Log Routing card sort followed by the Missing Logs troubleshooting round in pairs."
   ],
   [
    5,
    "Discuss",
    "Pairs share which missing-log case was hardest and why."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your SIEM shows no threats from a firewall for a week, but the firewall's own Threat log is busy. Name three places the problem could be.",
  "activity": {
   "title": "Log Routing and Missing Logs",
   "materials": "Printed cards with log types (Traffic, Threat, URL, WildFire, Configuration, System, User-ID, HIP Match), two labeled mats (Log Forwarding Profile, Device > Log Settings), printed troubleshooting scenario cards, whiteboard.",
   "steps": [
    "Pairs sort each log type card onto the correct mat and write on the card which event generates that log.",
    "The teacher reveals the answer key and highlights the split between policy-generated and non-policy logs.",
    "Pairs receive four Missing Logs scenarios, such as denied traffic not logged, no threat logs from one rule, configuration changes absent from syslog, and logs not reaching the cloud service.",
    "For each scenario, pairs write the first check they would make and the setting that fixes it, then compare with another pair."
   ]
  },
  "discussion": [
   "What are the costs and benefits of enabling Log at Session Start on many rules?",
   "When would email or HTTP forwarding be a better fit than syslog?",
   "What risks arise if logs are only stored on the firewall itself?"
  ],
  "exit": [
   [
    "Where do you forward System logs to a syslog server?",
    "Device > Log Settings, using a syslog server profile."
   ],
   [
    "What object sends Threat logs from specific rules to a SIEM?",
    "A log forwarding profile attached to those security rules, pointing to a syslog server profile."
   ],
   [
    "Why might a rule that allowed an exploit produce no Threat log?",
    "No security profile, such as vulnerability protection, was attached to the rule."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page flowchart: Is the log generated by a rule match? If yes, use a log forwarding profile; if no, use Device > Log Settings. Students use it during the card sort.",
   "Extend: Ask students to write log forwarding filters for two requirements, such as high and critical threats only, and denied traffic only, and explain how `show logging-status` helps confirm delivery to Panorama or the cloud."
  ]
 },
 {
  "t": "Software and content updates: PAN-OS upgrade paths and base images, HA upgrade order, dynamic update schedules and thresholds",
  "objectives": [
   "Students will be able to explain the difference between PAN-OS software releases and content updates.",
   "Students will be able to sequence a PAN-OS upgrade correctly, including Panorama first, content before software, and the base image requirement.",
   "Students will be able to describe the upgrade order for an active/passive HA pair, including preemption and suspend steps.",
   "Students will be able to configure dynamic update schedules with actions and thresholds that balance protection and stability."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about phone updates and connect it to software versus content."
   ],
   [
    12,
    "Teach",
    "Draw a timeline of an upgrade window on the board. Explain feature, maintenance and base images, Panorama first, content first, and each HA step. Show the Dynamic Updates schedule fields: recurrence, action, threshold, and the new App-ID option."
   ],
   [
    18,
    "Activity",
    "Run the Upgrade Night sequencing activity in small groups."
   ],
   [
    5,
    "Discuss",
    "Groups compare sequences and justify any differences."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Your phone offers a major system update and a small app update. Which do you install first, which needs a restart, and what would make you wait a few days?",
  "activity": {
   "title": "Upgrade Night",
   "materials": "Printed step cards (about twelve, shuffled), each with one upgrade step such as upgrade Panorama, install content, download base image, export device state, disable preemption, upgrade passive peer, suspend active peer, return peer to functional; tape or sticky putty; whiteboard.",
   "steps": [
    "Groups of three receive a shuffled set of step cards and arrange them in the correct order on the whiteboard.",
    "The teacher introduces a twist card, such as \"install fails with a missing base image\" or \"active peer takes back the role mid-upgrade,\" and groups identify which step was skipped.",
    "Groups then design a dynamic update schedule for a hospital firewall, writing recurrence, action and threshold for Applications and Threats, Antivirus and WildFire.",
    "Each group explains one choice they made and the risk it reduces."
   ]
  },
  "discussion": [
   "How long a threshold is too long for threat content, and who should decide?",
   "Why is a device state export more useful than a configuration snapshot alone when an upgrade fails?",
   "What checks would you run after an upgrade before declaring success?"
  ],
  "exit": [
   [
    "What must be downloaded before installing a maintenance release of a new feature release?",
    "That feature release's base image."
   ],
   [
    "In an HA active/passive upgrade, which peer is upgraded first?",
    "The passive peer."
   ],
   [
    "What does a content update threshold do?",
    "It delays installing a new content release until it has been available for a set number of hours."
   ]
  ],
  "differentiation": [
   "Support: Give students a partially ordered list with four anchor steps already placed so they only need to fill in the gaps.",
   "Extend: Ask students to write the CLI commands for the HA upgrade steps, including the suspend and functional commands, and explain how they would verify synchronization."
  ]
 },
 {
  "t": "Certificate management: CAs, forward trust/untrust, SSL inbound inspection, SSL/TLS service profiles, certificate profiles, OCSP/CRL",
  "objectives": [
   "Students will be able to explain the roles of the Forward Trust and Forward Untrust certificates in SSL Forward Proxy.",
   "Students will be able to contrast SSL Forward Proxy with SSL Inbound Inspection, including what certificate material each requires.",
   "Students will be able to distinguish an SSL/TLS service profile from a certificate profile and choose the correct one for a scenario.",
   "Students will be able to describe OCSP and CRL revocation checking and the order PAN-OS uses."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about badges and IDs. Introduce the vocabulary of issuer, trust and revocation."
   ],
   [
    13,
    "Teach",
    "Draw the forward proxy flow on the whiteboard: client, firewall, server, with the impersonated certificate signed by Forward Trust or Forward Untrust. Draw inbound inspection next to it. Build a two-column table: SSL/TLS service profile (what I present) versus certificate profile (how I judge others). Explain OCSP first, then CRL."
   ],
   [
    17,
    "Activity",
    "Run the Certificate Symptom Clinic in pairs."
   ],
   [
    5,
    "Discuss",
    "Pairs share the hardest symptom and the class agrees on the fix."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A receptionist issues visitor badges. What should happen when a visitor's ID is expired? What would go wrong if expired-ID visitors got the same badge as everyone else?",
  "activity": {
   "title": "Certificate Symptom Clinic",
   "materials": "Printed symptom cards (six to eight), printed object cards (Forward Trust CA, Forward Untrust CA, server certificate and key, SSL/TLS service profile, certificate profile, OCSP, CRL, Trusted Root CA flag), whiteboard.",
   "steps": [
    "Give each pair a stack of symptom cards, such as \"every decrypted site shows a warning,\" \"expired-certificate sites show no warning,\" \"auditor wants TLS 1.2 minimum on the portal,\" \"revoked client certificates still connect,\" and \"need to inspect HTTPS to our own web server.\"",
    "Pairs match each symptom to the object card that is the cause or fix and write a one-sentence explanation.",
    "Pairs then order the revocation steps for a certificate profile with both OCSP and CRL enabled and decide whether to block on unknown status for a hospital portal.",
    "The teacher walks through answers, asking pairs to defend their choices aloud."
   ]
  },
  "discussion": [
   "What are the privacy and trust implications of a firewall acting as a CA for users' traffic?",
   "When would you accept blocking sessions on unknown revocation status, and when is it too risky?",
   "How would you track certificate expiry dates so a Forward Trust CA never expires unnoticed?"
  ],
  "exit": [
   [
    "Which certificate signs impersonated certificates for sites whose real certificate is expired?",
    "The Forward Untrust certificate."
   ],
   [
    "What does SSL Inbound Inspection require on the firewall?",
    "The protected server's certificate and private key."
   ],
   [
    "Which object validates GlobalProtect client certificates?",
    "A certificate profile, with trusted CAs and OCSP or CRL checks."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of forward proxy with blanks for which CA signs the impersonated certificate in each case, and a sentence frame: \"The firewall presents ___; the firewall judges ___.\"",
   "Extend: Ask students to explain why Forward Trust should ideally be a subordinate CA from the enterprise PKI rather than a self-signed CA, and what happens to users when it expires."
  ]
 },
 {
  "t": "Decryption exclusions for pinned and sensitive apps",
  "objectives": [
   "Students will be able to explain why certificate pinning and mutual TLS prevent decryption.",
   "Students will be able to distinguish technical exclusions (SSL Decryption Exclusion list) from policy exclusions (No Decrypt rules).",
   "Students will be able to use Decryption log evidence to decide which exclusion fits a failing application.",
   "Students will be able to apply a decryption profile to No Decrypt rules to keep certificate validation on excluded traffic."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about opening packages in a mailroom and capture student answers on the board under Cannot Open and Should Not Open."
   ],
   [
    12,
    "Teach",
    "Explain pinning and mutual TLS with a simple diagram. Show where the SSL Decryption Exclusion list lives and how No Decrypt rules work in the top-down rulebase. Show a sample Decryption log line describing a handshake failure. Stress narrow exclusions and decryption profiles."
   ],
   [
    18,
    "Activity",
    "Run the Exclusion Triage activity in pairs with printed log excerpts."
   ],
   [
    5,
    "Discuss",
    "Pairs debate privacy categories and how they would explain choices to HR."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A company mailroom checks packages for hazards. Name one kind of package it cannot open without breaking, and one kind it should not open even if it could.",
  "activity": {
   "title": "Exclusion Triage",
   "materials": "Printed cards with simplified, made-up Decryption log excerpts and help desk tickets (six to eight), a printed rulebase diagram with a broad decrypt rule, sticky notes, whiteboard.",
   "steps": [
    "Pairs read each card and decide whether the case needs an SSL Decryption Exclusion, a No Decrypt rule, or no exclusion at all, writing the reason on a sticky note.",
    "For No Decrypt cases, pairs place their sticky note on the printed rulebase in the correct position relative to the broad decrypt rule.",
    "For each exclusion, pairs choose the narrowest scope possible, such as one hostname instead of a wildcard domain.",
    "The teacher reviews answers and asks pairs to name which decryption profile settings they would still apply to excluded traffic."
   ]
  },
  "discussion": [
   "Who in an organization should decide which categories are excluded for privacy, and why?",
   "How could an attacker take advantage of an overly broad decryption exclusion?",
   "How often should exclusions be reviewed, and what evidence would you use?"
  ],
  "exit": [
   [
    "An app fails after decryption but the browser on the same device works. What is the likely cause and fix?",
    "Certificate pinning; add the app's hostname to the SSL Decryption Exclusion list."
   ],
   [
    "Where must a No Decrypt rule for health sites be placed?",
    "Above the broad decrypt rules, because decryption policy is evaluated top-down."
   ],
   [
    "How can you still block expired certificates on traffic you do not decrypt?",
    "Attach a decryption profile with certificate checks to the No Decrypt rule."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision tree: Does a browser work while the app fails? Is client certificate authentication involved? Is the category private by policy? Students follow it for each card.",
   "Extend: Ask students to write a short exclusion policy document outline listing categories, the approval process, review frequency, and how the Decryption log is monitored."
  ]
 },
 {
  "t": "User-ID sources (server monitoring, syslog listener, GlobalProtect, XML API), group mapping and Cloud Identity Engine",
  "objectives": [
   "Students will be able to explain why User-ID maps IP addresses to users and where mappings are applied.",
   "Students will be able to select the appropriate User-ID source (server monitoring, syslog listener, GlobalProtect, XML API, terminal server agent) for a given environment.",
   "Students will be able to describe how group mapping and the group include list make group-based policy work.",
   "Students will be able to compare LDAP group mapping with the Cloud Identity Engine for on-premises and cloud directories."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about rules written for IP addresses and list problems students raise."
   ],
   [
    12,
    "Teach",
    "Draw a central IP-to-user table with arrows from each source: domain controllers, Wi-Fi controller or NAC via syslog, GlobalProtect, XML API, terminal server agent. Add a second box for groups fed by LDAP or the Cloud Identity Engine. Show sample output of `show user ip-user-mapping all` on the projector."
   ],
   [
    18,
    "Activity",
    "Run the Source Match-Up scenario rotation in small groups."
   ],
   [
    5,
    "Discuss",
    "Groups share one scenario where two sources could work and argue which is better."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If your firewall rules could only use IP addresses, what would break when people move between Wi-Fi, VPN and their desks?",
  "activity": {
   "title": "Source Match-Up",
   "materials": "Printed environment cards (six to eight) describing organizations, a printed list of User-ID sources, chart paper for each station, markers.",
   "steps": [
    "Set up stations around the room, each with one environment card, such as a university with 802.1X Wi-Fi, a company with all-remote staff, a hospital with shared Remote Desktop servers, a startup using only a cloud directory, and a warehouse with a custom app.",
    "Groups rotate every few minutes and write on the chart paper which User-ID source they would use and how groups would be retrieved.",
    "At each station, groups must also note one security consideration, such as service account rights, SSL for syslog, or avoiding client probing.",
    "Groups return to their first station, review the combined answers, and present the best design to the class."
   ]
  },
  "discussion": [
   "Why does Palo Alto Networks discourage client probing, and what would you use instead?",
   "What risks come from mapping timeouts that are too long or too short?",
   "When would you choose the Windows User-ID agent over the integrated agent on the firewall?"
  ],
  "exit": [
   [
    "Which User-ID source reads logon events from Active Directory domain controllers?",
    "Server monitoring by the integrated or Windows User-ID agent."
   ],
   [
    "How do you get usernames from a wireless controller that sends login messages?",
    "Configure a syslog listener with a syslog parse profile and add the controller as a monitored server."
   ],
   [
    "Why might a rule using a directory group never match?",
    "The group is missing from the group mapping include list, so its membership was never retrieved."
   ]
  ],
  "differentiation": [
   "Support: Give students a matching worksheet that pairs each source with a one-line clue, such as logon events, login syslog, VPN tunnel, script push, shared IP, before attempting the station scenarios.",
   "Extend: Ask students to design User-ID for a merged company with one on-premises Active Directory and one cloud-only directory, explaining how the Cloud Identity Engine and server monitoring would work together."
  ]
 },
 {
  "t": "Management plane: permitted IPs, service routes, candidate vs running config, commits, partial commits, config locks and named snapshots",
  "objectives": [
   "Students will be able to explain the separation of the management plane and data plane and how Permitted IP Addresses and service routes affect management access.",
   "Students will be able to distinguish the candidate and running configurations and describe what a commit, validate and preview do.",
   "Students will be able to choose between partial commits, config locks and commit locks to coordinate multiple administrators.",
   "Students will be able to select the correct snapshot operation (save, load, revert, load version, export) for a recovery scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about shared documents and draft versus published versions."
   ],
   [
    12,
    "Teach",
    "Draw the management plane and data plane side by side, then a candidate box and a running box with a commit arrow. Add snapshot operations around the candidate box and label which ones touch running (only commit). Explain Permitted IP Addresses and service routes with a quick sketch of an isolated management network."
   ],
   [
    18,
    "Activity",
    "Run the Commit Desk role-play in groups of four."
   ],
   [
    5,
    "Discuss",
    "Groups share one mistake they caught and how they would prevent it in a real team."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You and a colleague are editing the same shared document. How do you make sure your edits go out without publishing their half-written paragraph?",
  "activity": {
   "title": "Commit Desk",
   "materials": "Printed role cards (Admin A, Admin B, Superuser, Auditor), printed scenario cards, two large paper boxes drawn on the whiteboard labeled Candidate and Running, sticky notes for configuration changes.",
   "steps": [
    "Each group assigns roles. Admins A and B place sticky-note changes in the Candidate box according to their scenario cards.",
    "The teacher reads events aloud, such as \"Admin A must commit only the NAT change,\" \"Admin B leaves for lunch with a config lock,\" \"roll back to last week's committed version,\" and \"updates fail on an isolated MGT network.\"",
    "For each event, the group decides the correct action (partial commit, config lock or commit lock, Load configuration version then commit, service route) and moves sticky notes to show the effect; only a commit moves notes to Running.",
    "The Auditor checks each move and records any action that would have changed the running configuration by mistake."
   ]
  },
  "discussion": [
   "Should commit locks be acquired automatically on your team, and what are the trade-offs?",
   "How would you design management access for a firewall at a remote branch with no dedicated management network?",
   "What naming and storage habits make configuration snapshots useful during an emergency?"
  ],
  "exit": [
   [
    "Which operation discards uncommitted changes?",
    "Revert to running configuration."
   ],
   [
    "How do you return to last week's committed configuration?",
    "Load configuration version to place it in the candidate, then commit."
   ],
   [
    "What controls which hosts can reach the MGT interface's management services?",
    "The Permitted IP Addresses list."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card listing each snapshot operation with a one-line effect and whether it touches the candidate or the running configuration.",
   "Extend: Ask students to write the CLI sequence to save a snapshot, perform a partial commit for their own changes, and check commit job status, and to explain how they would verify service routes are working."
  ]
 },
 {
  "t": "Web proxy (explicit and transparent) on supported PAN-OS 11.x platforms",
  "objectives": [
   "Students will be able to explain the difference between explicit and transparent web proxy modes on PAN-OS.",
   "Students will be able to identify the supporting components a PAN-OS web proxy requires, including a loopback interface and a DNS proxy.",
   "Students will be able to choose the appropriate proxy mode for a migration scenario based on client control, traffic path and authentication needs.",
   "Students will be able to explain why decryption is still required to inspect HTTPS content through the proxy."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to recall a time a website was blocked at school or work and guess where that decision was made. Collect answers and introduce the idea of a proxy as a middleman."
   ],
   [
    15,
    "Teach",
    "Draw two diagrams on the whiteboard: a browser with a PAC file sending CONNECT to a proxy address, and a browser sending traffic normally through a firewall in the path. Walk through authentication options (Kerberos, SAML) for explicit mode, User-ID for transparent mode, and the required loopback and DNS proxy. Close by stressing that decryption is still needed to see HTTPS content."
   ],
   [
    15,
    "Activity",
    "Run the scenario card sort described in the activity. Circulate and ask each pair to justify one placement aloud."
   ],
   [
    5,
    "Discuss",
    "Bring the class together and work through the discussion questions, focusing on why transparent mode cannot challenge for credentials."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "If you were building a middleman for all web traffic, would you rather every computer know about it, or have it work invisibly? List one benefit and one drawback of each.",
  "activity": {
   "title": "Explicit or transparent: scenario card sort",
   "materials": "Printed scenario cards (8 to 10 short migration scenarios), whiteboard split into Explicit, Transparent and Needs more info columns, sticky notes.",
   "steps": [
    "Pairs receive a set of scenario cards, each describing a customer: whether clients can be configured, whether the firewall is in the path, and what identity is required.",
    "Pairs sort each card into Explicit, Transparent or Needs more info, writing one sentence of justification on a sticky note.",
    "For every card, pairs also list the supporting components needed (loopback, DNS proxy, authentication method, decryption rule).",
    "Pairs post their sticky notes on the whiteboard columns, and the teacher reviews any card that landed in different columns across pairs."
   ]
  },
  "discussion": [
   "Why does a transparent proxy have to rely on User-ID rather than a proxy login prompt?",
   "What could go wrong during a migration if the PAC file is updated before the firewall proxy is fully tested, or after?"
  ],
  "exit": [
   [
    "Which mode lets the proxy challenge users with Kerberos or SAML?",
    "Explicit proxy, because clients knowingly send requests to it."
   ],
   [
    "Name two supporting objects the PAN-OS web proxy requires.",
    "A loopback interface and a DNS proxy object."
   ],
   [
    "A team enables the web proxy but not decryption. What can it see of HTTPS traffic?",
    "Only the destination domain from the CONNECT request or SNI, not the encrypted content."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a two-column comparison sheet (explicit vs transparent) with blanks for client setup, traffic path and identity source to fill in before the card sort.",
   "Extend: ask fast finishers to write a short cutover plan for retiring a legacy proxy, including testing steps, PAC file timing and the logs they would check to confirm success."
  ]
 },
 {
  "t": "Panorama: device groups and hierarchy, pre-rules and post-rules, templates, template stacks, template variables and overrides",
  "objectives": [
   "Students will be able to classify firewall settings as belonging to a device group or a template.",
   "Students will be able to state the full security rule evaluation order on a Panorama-managed firewall.",
   "Students will be able to explain how template stack priority, template variables and local overrides determine a firewall's final value.",
   "Students will be able to design a device group and template stack layout for a multi-site scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and let students discuss in pairs for two minutes, then take three answers."
   ],
   [
    15,
    "Teach",
    "On the whiteboard, draw a Shared box with a parent and child device group beneath it, then draw the sandwich: pre-rules on top, local rules in the middle, post-rules below, defaults at the bottom. Then draw a template stack with three templates and show which wins. Explain variables with a store example and show what an override icon means."
   ],
   [
    15,
    "Activity",
    "Run the card sort and rule-order line-up described in the activity."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect overrides and variables to real operational drift."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on paper."
   ]
  ],
  "warmup": "You manage 300 identical stores. Name one setting that must be the same everywhere and one that must be different at every store. How would you avoid typing the same thing 300 times?",
  "activity": {
   "title": "Where does it live, and what runs first?",
   "materials": "Printed setting cards (for example: security rule, address object, interface IP, zone, syslog server profile, NAT rule, DNS server, URL filtering profile), printed rule cards labeled Shared pre, Parent DG pre, DG pre, Local, DG post, Parent DG post, Shared post, Default; whiteboard with two columns: Device group and Template.",
   "steps": [
    "In groups of three, students sort the setting cards into Device group or Template and tape them under the matching column on the whiteboard.",
    "Each group then receives the shuffled rule cards and lines them up in evaluation order on their desk.",
    "The teacher reads out three short scenarios (for example, a local rule conflicting with a Shared pre-rule) and groups use their line-up to decide which rule matches.",
    "Finally, each group sketches a template stack for the 300-store example, marking which values become variables and which template sits highest."
   ]
  },
  "discussion": [
   "What risks do local overrides create in a large fleet, and how would you keep them under control?",
   "When would you put a rule in a post-rule rather than a pre-rule?"
  ],
  "exit": [
   [
    "Is a zone configured in a device group or a template?",
    "A template, because zones are part of the Network tab."
   ],
   [
    "List the order: local rules, Shared post-rules, device group pre-rules, Shared pre-rules.",
    "Shared pre-rules, device group pre-rules, local rules, Shared post-rules."
   ],
   [
    "A template stack has Template A above Template B, and both set NTP. Which value applies if there is no local override?",
    "Template A's value, because the higher template in the stack wins."
   ]
  ],
  "differentiation": [
   "Support: provide a one-page reference showing the Network and Device tabs versus the Policies and Objects tabs, so students can check which family a setting belongs to during the sort.",
   "Extend: challenge fast finishers to design a three-level device group hierarchy for a company with two regions and two store formats, and explain where they would place each of five given rules."
  ]
 },
 {
  "t": "Panorama commit and push workflow; Panorama modes (Panorama, Management Only, Log Collector) and version requirements",
  "objectives": [
   "Students will be able to explain the difference between Commit to Panorama, Push to Devices and Commit and Push.",
   "Students will be able to identify which Panorama mode fits a scenario based on whether it manages devices, stores logs, or both.",
   "Students will be able to sequence an upgrade of Panorama, Log Collectors and firewalls correctly.",
   "Students will be able to use In Sync and Out of Sync status to troubleshoot a missed push."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about saved drafts versus sent messages and connect it to commit versus push."
   ],
   [
    15,
    "Teach",
    "Draw the two-step flow on the whiteboard: admin edits, Commit to Panorama, Push to Devices, each firewall commits. Add the Managed Devices sync column. Then draw a table with three modes and two columns (manages, stores logs) and fill it in with the class. Finish with the upgrade order rule."
   ],
   [
    15,
    "Activity",
    "Run the role-play described in the activity, with students acting as Panorama, firewalls and Log Collectors."
   ],
   [
    5,
    "Discuss",
    "Work through the discussion questions as a whole class."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on an index card."
   ]
  ],
  "warmup": "Have you ever written a message, saved it as a draft, and later realized it was never sent? What would the equivalent be when one server manages forty firewalls?",
  "activity": {
   "title": "Commit, push and upgrade role-play",
   "materials": "Name cards for roles (Panorama, Firewall A to D, Log Collector 1 and 2), sticky notes representing configuration changes, a whiteboard with a Managed Devices table showing In Sync or Out of Sync for each firewall.",
   "steps": [
    "Assign roles. The Panorama student writes a change on a sticky note and keeps it, announcing 'committed to Panorama'. The class updates the whiteboard table to show every firewall Out of Sync.",
    "The Panorama student then pushes by handing sticky notes only to the firewalls in the chosen scope; the teacher deliberately leaves one firewall out, and students must spot it from the table.",
    "The teacher announces an upgrade scenario with version numbers written as Release 1 and Release 2. Students physically line up in the order they would be upgraded and explain why.",
    "Finally, the teacher reads three mode descriptions and students hold up a card showing Panorama, Management Only or Log Collector."
   ]
  },
  "discussion": [
   "Why might a vendor require the management server to be at least as new as the devices it manages?",
   "What checks would you add to a change process so a missed push is caught before users notice?"
  ],
  "exit": [
   [
    "After Commit to Panorama, what more is needed for a new rule to reach the firewalls?",
    "A Push to Devices (or Commit and Push) to the right scope."
   ],
   [
    "Which mode stores logs but has no management web interface?",
    "Log Collector mode."
   ],
   [
    "Put these in upgrade order: firewalls, Panorama, Log Collectors.",
    "Panorama, then Log Collectors, then firewalls."
   ]
  ],
  "differentiation": [
   "Support: give students a filled-in example of the mode table and a flowchart of commit then push to refer to during the role-play.",
   "Extend: ask fast finishers to write a step-by-step change plan for pushing a risky rule change to 200 firewalls in waves, including Preview Changes and how they would verify each wave."
  ]
 },
 {
  "t": "PAN-OS XML API (keygen, config, op, commit) and REST API; API-only admin role profiles",
  "objectives": [
   "Students will be able to name the XML API request types keygen, config, op and commit and state what each does.",
   "Students will be able to distinguish the set, edit, get and show config actions and predict their effect.",
   "Students will be able to compare the XML API and the REST API, including which one performs commits.",
   "Students will be able to design an API-only admin role profile with least privilege for a given automation task."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about house keys and record answers on the whiteboard as a list of privileges."
   ],
   [
    15,
    "Teach",
    "Walk through a script's life cycle on the whiteboard: keygen, config set with an xpath, op to check status, commit and job polling. Write sample request parameters (no hostnames needed). Contrast with a REST GET and POST on a versioned resource. Then show the admin role profile screen layout (web UI, CLI, XML API, REST API sections) on the projector from slides or a drawing."
   ],
   [
    15,
    "Activity",
    "Run the request-matching and role-design activity described below."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions on credential risk and auditing."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "You need a neighbor to water your plants for a week. What keys would you give them, and what would you never give them? How is that like a script logging in to a firewall?",
  "activity": {
   "title": "Match the request, then lock down the key",
   "materials": "Printed cards showing short API request descriptions (for example: 'type=config action=edit xpath=.../address', 'type=op cmd=<show><jobs>...', 'GET /restapi/v11.0/Objects/Addresses'), printed outcome cards, and a blank admin role profile worksheet with Web UI, Command Line, XML API and REST API sections.",
   "steps": [
    "In pairs, students match each request card to its outcome card (for example, 'replaces the address container' or 'checks a commit job').",
    "The teacher reveals answers and highlights the edit-versus-set card, asking pairs to explain what would be lost.",
    "Each pair receives a script scenario (log exporter, address updater, inventory reporter) and fills in the role profile worksheet with the minimum permissions.",
    "Pairs swap worksheets and challenge each other: could this key commit, change policy or open the web UI? Fix any excess permissions."
   ]
  },
  "discussion": [
   "Why is putting a username and password in a request URL riskier than sending them in a POST body?",
   "How does using a dedicated service account for each script improve both security and troubleshooting?"
  ],
  "exit": [
   [
    "Which XML API request type returns an API key?",
    "keygen."
   ],
   [
    "A script must add an object without removing others at the same xpath. Should it use set or edit?",
    "set, because it merges; edit replaces the node."
   ],
   [
    "What should an admin role profile for a log-reading script enable?",
    "Only XML API Log, with the web UI and CLI disabled."
   ]
  ],
  "differentiation": [
   "Support: give students a one-page cheat sheet listing each XML API type and config action with a single-sentence description to use during matching.",
   "Extend: ask fast finishers to outline, in plain steps, how a script should handle a commit job that returns a failure, including what it logs and how it alerts a human."
  ]
 },
 {
  "t": "Infrastructure as code: Terraform panos provider, Ansible paloaltonetworks.panos collection, pan-os-python SDK",
  "objectives": [
   "Students will be able to explain the benefits of infrastructure as code for firewall configuration.",
   "Students will be able to compare Terraform, Ansible and pan-os-python by style (declarative, procedural, programmatic).",
   "Students will be able to select the most suitable tool for a given automation scenario and justify the choice.",
   "Students will be able to explain why a commit is still required after any of these tools makes changes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about recipes and collect two or three answers about why written steps beat memory."
   ],
   [
    15,
    "Teach",
    "Project the YAML and Python snippets from the lesson and read them line by line. On the whiteboard, draw three columns for Terraform, Ansible and pan-os-python with rows for style, key concept (state file, idempotent tasks, object tree) and typical use. Draw a pipeline: pull request, plan, review, apply, commit."
   ],
   [
    15,
    "Activity",
    "Run the tool-choice debate described in the activity."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to talk about drift and ownership."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Think of a dish you cook often. Would a new cook get the same result from your memory or from a written recipe? What would make the recipe even more reliable?",
  "activity": {
   "title": "Pick the tool: scenario debate",
   "materials": "Printed scenario cards (for example: build rules alongside cloud VMs, monthly upgrade sequence, custom integration with a ticket system, onboarding 50 firewalls, reporting which rules have no hits), three table signs labeled Terraform, Ansible and pan-os-python, the projector showing the lesson snippets.",
   "steps": [
    "Split the class into three teams, one per tool, each sitting at its labeled table.",
    "The teacher reads a scenario card. Each team has one minute to argue why its tool fits, or concede that another tool fits better.",
    "The class votes, and the teacher confirms the best answer with a short reason tied to declarative, procedural or programmatic style.",
    "After four or five scenarios, each team writes one sentence on the whiteboard naming the step every tool still needs before changes are live."
   ]
  },
  "discussion": [
   "What problems arise when two different tools both try to manage the same address object?",
   "Why should the automation account's API key live in a secret store rather than in the repository?"
  ],
  "exit": [
   [
    "Which tool uses plan and apply with a state file?",
    "Terraform with the panos provider."
   ],
   [
    "Name the tool best suited to an ordered upgrade workflow, and say why.",
    "Ansible, because playbooks run tasks in order with idempotent modules."
   ],
   [
    "After a tool creates an object, what must happen before the firewall enforces it?",
    "A commit, because the change is only in the candidate configuration."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a comparison table with the three tools' key words (state file, playbook, object tree) already filled in, so they can focus on matching scenarios.",
   "Extend: ask fast finishers to sketch a pipeline that uses Terraform to build baseline policy and Ansible for upgrades, stating which objects each tool owns and how they would detect drift."
  ]
 },
 {
  "t": "External dynamic lists (IP, domain, URL) and dynamic address groups with tags",
  "objectives": [
   "Students will be able to explain how an external dynamic list is retrieved and why its changes need no commit.",
   "Students will be able to match IP, Domain and URL EDL types to the policy locations where each is used.",
   "Students will be able to describe how tags populate a dynamic address group and list at least three tag sources.",
   "Students will be able to choose between an EDL and a dynamic address group for a given scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about badges versus guest lists and collect quick answers."
   ],
   [
    15,
    "Teach",
    "Draw a web server with a text file and an arrow to the firewall labeled 'check interval'. Under it, draw three branches: IP to rules, Domain to anti-spyware DNS policies, URL to URL filtering. Then draw a DAG as a circle with a match expression and show IP addresses with tags moving in and out. Emphasize that neither needs a commit."
   ],
   [
    15,
    "Activity",
    "Run the badge-based DAG simulation and the EDL placement sort described in the activity."
   ],
   [
    5,
    "Discuss",
    "Work through the discussion questions about trust in list sources."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "A party has two ways to control entry: a printed guest list updated by the host, or anyone wearing a certain badge gets in. Which is faster to change, and which is easier to abuse?",
  "activity": {
   "title": "Wristbands and lists",
   "materials": "Sticky notes in three colors as tags, a sheet showing a DAG match expression (for example 'web' and 'prod'), printed cards describing feeds (IP feed, domain feed, URL feed), whiteboard with three zones labeled Security rule, Anti-spyware DNS policy, URL filtering.",
   "steps": [
    "Give each student one or two colored sticky notes representing tags. Display the DAG match expression; students whose tags match stand up as group members.",
    "The teacher 'registers' and 'unregisters' tags by handing out or collecting sticky notes; the class watches membership change without anyone rewriting the rule.",
    "In pairs, students take feed cards and place them in the correct whiteboard zone, writing the EDL type on each.",
    "Close with a twist: the teacher announces the feed server is offline, and pairs write what the firewall does and how they would protect the feed source."
   ]
  },
  "discussion": [
   "Whoever controls an EDL file controls part of your policy. What safeguards would you require for a list source?",
   "When would a dynamic user group be a better quarantine tool than a dynamic address group?"
  ],
  "exit": [
   [
    "Where do you reference a Domain EDL?",
    "In an anti-spyware profile's DNS policies."
   ],
   [
    "Name two sources of tags for a dynamic address group.",
    "Any two of: the XML API, VM information sources, log forwarding auto-tagging, address objects, Panorama or User-ID agents."
   ],
   [
    "Does a DAG need a commit when a new IP is tagged?",
    "No, membership updates at runtime."
   ]
  ],
  "differentiation": [
   "Support: provide a three-row table (IP, Domain, URL) with the policy location column left blank for students to fill in, plus one worked example row.",
   "Extend: ask fast finishers to design a quarantine flow combining an IP EDL from a threat feed and a DAG for internally detected hosts, and explain why they would use both."
  ]
 },
 {
  "t": "Auto-tagging from log forwarding profiles and HTTP server profiles for webhooks and ticketing",
  "objectives": [
   "Students will be able to describe the components of an automated quarantine chain from log filter to enforcing rule.",
   "Students will be able to configure, on paper, a tagging built-in action with target, tag, registration location and timeout.",
   "Students will be able to explain how an HTTP server profile sends logs to ticketing or chat webhooks.",
   "Students will be able to troubleshoot a broken quarantine chain using rule order, DAG membership and the IP-Tag log."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a store alarm and list on the whiteboard what happens automatically versus what needs a person."
   ],
   [
    15,
    "Teach",
    "Draw the chain left to right: threat log, log forwarding filter, tagging action, DAG, deny rule, plus a branch to an HTTP server profile and a ticket. Explain each setting in the tagging action and the payload variables. Show where the IP-Tag log fits as verification."
   ],
   [
    15,
    "Activity",
    "Run the chain-building and break-fix activity described below."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions on when automatic quarantine is appropriate."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "When a shoplifter walks out with a tagged item, what happens automatically, and what still needs a person? Which of those steps could a firewall do on its own?",
  "activity": {
   "title": "Build the chain, then break it",
   "materials": "Printed component cards (Threat log, Log forwarding filter, Tagging action, Tag timeout, DAG, Deny rule, HTTP server profile, Ticket, IP-Tag log), tape, a whiteboard, and printed fault cards describing a broken setup.",
   "steps": [
    "In groups of three, students tape component cards in order on the whiteboard to form a working quarantine and notification chain, labeling each arrow with what passes along it.",
    "Each group writes the settings for the tagging action on a sticky note: target, action, registration location, tag name and timeout.",
    "The teacher hands each group a fault card (profile not attached to rules, DAG typo, deny rule below an allow rule, webhook over plain HTTP) and the group identifies which link is broken and how they would confirm it.",
    "Groups rotate to another group's chain and verify the fix is correct."
   ]
  },
  "discussion": [
   "What are the risks of automatic quarantine, and how would you build trust in it gradually?",
   "Who should receive webhook notifications in your organization, and what information must the payload include to be useful?"
  ],
  "exit": [
   [
    "Which part of the firewall configuration performs the tagging?",
    "A tagging built-in action in a log forwarding profile entry, attached to security rules."
   ],
   [
    "What turns a tag into an actual block?",
    "A DAG that matches the tag used in a deny or restrict rule placed above broader allow rules."
   ],
   [
    "Where do you confirm that a tag was registered and later removed?",
    "The IP-Tag log."
   ]
  ],
  "differentiation": [
   "Support: provide a partially completed chain diagram with two components missing, so struggling students can focus on placing the missing pieces and explaining them.",
   "Extend: ask fast finishers to design a JSON payload outline for a ticket using log field variables such as $src, $threatid and $severity, and to explain how the receiving system should authenticate the request."
  ]
 },
 {
  "t": "VM-Series bootstrapping (init-cfg.txt, bootstrap.xml, content/license/software/plugins folders) and Zero Touch Provisioning",
  "objectives": [
   "Students will be able to list the five bootstrap folders and state which are required.",
   "Students will be able to identify the purpose of init-cfg.txt, bootstrap.xml and the authcodes file.",
   "Students will be able to compare VM-Series bootstrapping with Zero Touch Provisioning for hardware firewalls.",
   "Students will be able to troubleshoot a failed bootstrap using the boot order and show system bootstrap status."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about setting up a new phone and list what restored itself automatically."
   ],
   [
    15,
    "Teach",
    "Draw the bootstrap package as a folder tree on the whiteboard and fill in each folder's contents. Project the sample init-cfg.txt and explain each key. Draw the first-boot sequence as a numbered timeline. Then contrast with ZTP: serial claimed in advance, power and network on site, firewall calls the ZTP service."
   ],
   [
    15,
    "Activity",
    "Run the package inspection activity described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore secrets handling and scale."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When you set up a new phone and sign in, what comes back automatically and what do you still have to do by hand? What would it take for a firewall to do the same?",
  "activity": {
   "title": "Inspect the bootstrap package",
   "materials": "Printed 'package listings' showing folder trees and init-cfg.txt contents for four fictional firewalls, each with zero or one deliberate fault (missing content folder, misspelled file name, missing vm-auth-key, firewall not factory default), plus a printed boot-order timeline.",
   "steps": [
    "In pairs, students review each package listing against the required folder list and the expected init-cfg.txt keys.",
    "For each package, pairs predict at which step of the boot timeline it will fail, or mark it as healthy.",
    "Pairs write the CLI command and log they would check to confirm their prediction.",
    "The class reviews answers together, and the teacher reveals one scenario that should be solved with ZTP instead of bootstrapping, asking pairs to explain why."
   ]
  },
  "discussion": [
   "Auth codes and VM auth keys are sensitive. Where should they be stored, and who should be able to read them?",
   "Why might a team prefer init-cfg.txt plus Panorama over shipping a full bootstrap.xml in every package?"
  ],
  "exit": [
   [
    "Name the bootstrap folder that holds the authcodes file.",
    "The license folder."
   ],
   [
    "Which file is optional: init-cfg.txt or bootstrap.xml?",
    "bootstrap.xml."
   ],
   [
    "What is the on-site step for a ZTP firewall?",
    "Connect power and an Internet-connected port; the firewall finds its manager through the ZTP service."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a labeled reference diagram of the folder tree and an annotated init-cfg.txt to compare against during the inspection.",
   "Extend: ask fast finishers to write an init-cfg.txt for a firewall with a static management IP and explain which additional keys are needed compared with DHCP."
  ]
 },
 {
  "t": "Form factors: PA-Series, VM-Series, CN-Series, Cloud NGFW for AWS and Azure",
  "objectives": [
   "Students will be able to describe PA-Series, VM-Series, CN-Series and Cloud NGFW and where each runs.",
   "Students will be able to compare form factors by who operates the firewall infrastructure.",
   "Students will be able to select the correct form factor for a scenario using clues such as Kubernetes, managed service or physical data center.",
   "Students will be able to explain why all form factors share the same core inspection technology."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about ways to get coffee and map each answer to who does the work."
   ],
   [
    15,
    "Teach",
    "Draw a two-axis chart on the whiteboard: where it runs (rack, hypervisor or cloud VM, Kubernetes, managed cloud service) and who operates it (customer or Palo Alto Networks). Place each form factor and note its management (Panorama, Kubernetes plugin, rulestacks). Mention Prisma Access for remote users as a related cloud service."
   ],
   [
    15,
    "Activity",
    "Run the form-factor matching game described below."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions on trade-offs between control and operational effort."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You can get coffee by buying a machine, renting one you clean yourself, using the office kitchen, or ordering at a café. Who does the work in each case, and when would you choose each?",
  "activity": {
   "title": "Which firewall goes where?",
   "materials": "Printed scenario cards (for example: campus edge, VMware private cloud, Kubernetes namespaces, new AWS account with no ops team, Azure Virtual WAN hub, branch office with high throughput), four large signs on the walls labeled PA-Series, VM-Series, CN-Series and Cloud NGFW.",
   "steps": [
    "Each student draws a scenario card and walks to the sign for the form factor they would choose.",
    "At each sign, students compare cards and agree on the one clue word in each scenario that decided it.",
    "The teacher reads two tricky cards aloud (for example, 'cloud, but full routing control needed') and students at the wrong sign must move and explain why.",
    "Groups write their clue words on the whiteboard to build a class cheat sheet."
   ]
  },
  "discussion": [
   "What does an organization gain and give up when it chooses a managed firewall service over operating its own virtual firewalls?",
   "Why might one company reasonably use all four form factors at the same time?"
  ],
  "exit": [
   [
    "Which form factor inspects east-west traffic between Kubernetes pods?",
    "CN-Series."
   ],
   [
    "A customer wants firewall protection in AWS without operating instances. Which form factor fits?",
    "Cloud NGFW for AWS."
   ],
   [
    "Who handles scaling and HA for VM-Series in a public cloud?",
    "The customer."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a table with the four form factors in rows and columns for 'where it runs', 'who operates it' and 'clue words', partly filled in.",
   "Extend: ask fast finishers to design a security architecture for a company with a data center, a private cloud, Kubernetes and two public clouds, justifying each form factor choice in one sentence."
  ]
 },
 {
  "t": "Strata Cloud Manager and cloud-delivered management",
  "objectives": [
   "Students will be able to explain what Strata Cloud Manager is and how it differs from hosting Panorama.",
   "Students will be able to map Panorama concepts (device groups, templates, variables) to SCM concepts (folders, snippets, variables).",
   "Students will be able to list the prerequisites for onboarding a firewall to SCM.",
   "Students will be able to recommend SCM or Panorama for a scenario and justify the choice."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about home servers versus cloud services and collect pros and cons."
   ],
   [
    15,
    "Teach",
    "On the whiteboard, draw Panorama on premises next to SCM in the cloud. Draw a folder tree (Global, Branches, individual firewalls) with a snippet attached to Branches. Build a two-column mapping table: device group to folder, template to snippet, variables to variables. List onboarding prerequisites and show logs flowing to Strata Logging Service. Close with AIOps features such as best practice assessments."
   ],
   [
    15,
    "Activity",
    "Run the migration planning activity described below."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions on cloud dependency and isolated sites."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Would you rather keep your photos on a computer at home or in a cloud service? What do you gain and what do you depend on with each choice?",
  "activity": {
   "title": "Plan the move to cloud management",
   "materials": "Printed company profiles (for example: startup with no data center, utility with an isolated control network, retailer migrating from Panorama), printed concept cards (device group, template, template variable, folder, snippet, variable), sticky notes, whiteboard.",
   "steps": [
    "In pairs, students match each Panorama concept card to its closest SCM concept card and tape the pairs on the whiteboard.",
    "Each pair receives a company profile and decides whether SCM, Panorama or a phased combination fits, writing their reasons on sticky notes.",
    "For profiles that choose SCM, pairs sketch a folder tree, name two snippets, and list the onboarding prerequisites they must confirm.",
    "Pairs present their plan in one minute each, and the class challenges any plan that ignores connectivity or isolated-network requirements."
   ]
  },
  "discussion": [
   "What new dependencies does a company accept when its firewall management moves to the cloud?",
   "Why might a company connect Panorama to the cloud for insights before moving any firewalls to SCM?"
  ],
  "exit": [
   [
    "Which SCM construct is inherited by everything beneath it?",
    "A folder."
   ],
   [
    "Where do SCM-managed firewalls send logs?",
    "Strata Logging Service."
   ],
   [
    "Name one situation where Panorama is a better fit than SCM.",
    "An isolated or regulated network without reliable Internet access, or any requirement for on-premises management."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a completed concept mapping table and ask them to explain each pair in their own words before attempting a company profile.",
   "Extend: ask fast finishers to write a phased migration plan from Panorama to SCM for 100 firewalls, including how they would use best practice assessments to measure progress."
  ]
 }
]);
