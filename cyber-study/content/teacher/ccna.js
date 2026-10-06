/* Teacher edition for Cisco CCNA (200-301 v2.0): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("ccna", [
 {
  "t": "Diagnose interface and cable issues (copper and fiber): collisions, CRC/input errors, duplex and speed mismatch, distance limits, cable types",
  "objectives": [
   "Students will be able to interpret interface and line protocol states from show interfaces output and name the likely cause of each state.",
   "Students will be able to distinguish the counter patterns of a duplex mismatch, a speed mismatch, a cabling or EMI fault, and congestion.",
   "Students will be able to select the correct cable or fiber type for a given distance and environment, including the 100-meter UTP limit.",
   "Students will be able to apply a bottom-up troubleshooting sequence to fix a physical-layer fault and verify the fix with cleared counters."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the hook scenario: users on one floor report slow transfers, but the uplink is up. Ask students to call out what they would check first and write their answers on the board without judging them."
   ],
   [
    15,
    "Teach",
    "Walk through the four status-line combinations (up/up, administratively down, down/down, up/down) and what each means. Then explain the counters: CRC, runts, giants, collisions, late collisions and output drops. Draw a link with full duplex on one end and half on the other, and show which counters rise on which side. Finish with UTP versus multimode versus single-mode, stressing 100 meters and EMI."
   ],
   [
    15,
    "Activity",
    "Run the 'Which side is wrong?' counter-reading activity in pairs (see activity steps). Circulate and ask each pair to justify their diagnosis using a specific counter."
   ],
   [
    5,
    "Discuss",
    "Bring the class together and reveal the answers. Ask why the duplex mismatch keeps the link up while the speed mismatch takes it down, and why clearing counters matters."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your interface is up and the light is green, but users say it is slow. Is the cable fine? What would convince you either way?",
  "activity": {
   "title": "Which side is wrong? Counter-reading cases",
   "materials": "Printed cards (made by the teacher) showing paired show interfaces excerpts for both ends of six links; whiteboard; markers.",
   "steps": [
    "Before class, prepare six cards. Each card shows both ends of one link: for example, one end 'Full-duplex, 100Mb/s, 2,341 CRC, 812 runts' and the other 'Half-duplex, 100Mb/s, 4,102 late collisions'. Include one duplex mismatch, one speed mismatch (down/down), one administratively down port, one over-length copper run, one congested link with output drops only, and one healthy link.",
    "Give each pair two cards. Ask them to write the diagnosis, the side at fault if there is one, and the exact fix (for example, set both ends to speed auto and duplex auto).",
    "Pairs swap cards with another pair and check each other's diagnosis, marking any disagreement.",
    "Each pair presents one card to the class in under a minute, pointing to the counter that proved their answer.",
    "Finish by asking pairs to list, in order, the bottom-up steps they would take if the counter evidence were unclear."
   ]
  },
  "discussion": [
   "Why do you think a duplex mismatch is harder to notice than a speed mismatch, and what does that mean for monitoring?",
   "When would you choose to hard-code speed and duplex instead of using autonegotiation, and what must you remember if you do?",
   "If a link between two buildings keeps failing during storms, what physical factors besides length should you consider?"
  ],
  "exit": [
   [
    "One end of a link shows late collisions and half duplex; the other shows CRC errors and full duplex. What is the problem and the fix?",
    "A duplex mismatch. Set both ends to auto for speed and duplex, or hard-code both ends to the same values, then clear counters and verify."
   ],
   [
    "What does 'administratively down/down' mean?",
    "The interface was disabled with the shutdown command; no shutdown fixes it."
   ],
   [
    "A 300-meter run between two buildings is needed. Is Category 6 copper suitable?",
    "No. UTP is limited to 100 meters per segment; use fiber, which also avoids ground-potential and EMI problems between buildings."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page reference table that maps each counter (CRC, runts, collisions, late collisions, output drops) to its likely cause, and let them use it during the activity.",
   "Extend: Ask fast finishers to write their own pair of output excerpts that hides a fault, such as a dirty fiber connector on one end, and trade it with another student to diagnose."
  ]
 },
 {
  "t": "Hypervisors (type 1 vs type 2), virtual machines and containers",
  "objectives": [
   "Students will be able to compare type 1 and type 2 hypervisors and identify which fits a given scenario.",
   "Students will be able to explain the architectural difference between virtual machines and containers, including kernel sharing.",
   "Students will be able to draw the layer stack for type 1, type 2 and container deployments in the correct order.",
   "Students will be able to justify configuring a virtualization host's switch port as an 802.1Q trunk and describe the role of the vSwitch."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: how could one physical server act as twelve? Collect two or three ideas, then introduce the word hypervisor."
   ],
   [
    15,
    "Teach",
    "Draw three stacks on the board side by side: type 1 (hardware, hypervisor, VMs), type 2 (hardware, host OS, hypervisor, VMs) and containers (hardware, host OS, container engine, apps). Name examples of each. Then draw a host with two physical NICs, a vSwitch and three VMs in different VLANs, and ask why the switch port must be a trunk."
   ],
   [
    15,
    "Activity",
    "Run the 'Build the stack' card sort in small groups (see activity steps)."
   ],
   [
    5,
    "Discuss",
    "Ask groups which scenario cards caused disagreement and settle them together, focusing on clue words such as bare metal and shares the kernel."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If you had one powerful server and twelve small jobs to run, how would you keep the jobs from interfering with each other?",
  "activity": {
   "title": "Build the stack: virtualization card sort",
   "materials": "Printed layer cards (Hardware, Type 1 hypervisor, Host OS, Type 2 hypervisor, Guest OS, Container engine, App, vSwitch, Physical NIC) and printed scenario cards; tape or sticky notes; whiteboard.",
   "steps": [
    "Give each group of three a set of layer cards. Ask them to build three stacks from the bottom up: a data-center type 1 host, a laptop running a type 2 hypervisor, and a container host.",
    "Check each group's stacks and have them correct any layer that is out of order.",
    "Hand out six scenario cards, such as 'A student labs routers on a Windows laptop' or 'A web service needs fifty copies that start in seconds'. Groups decide type 1, type 2, VM or container for each and write one clue word that justified the choice.",
    "Give each group a final card: 'A host with VMs in VLANs 10, 20 and 30 plugs into one switch port.' Groups write the switch port configuration mode they would choose and explain where traffic between two VLAN 20 VMs on that host travels.",
    "Groups post their answers on the board for the discussion."
   ]
  },
  "discussion": [
   "What security or monitoring problems might arise because some traffic between VMs never touches the physical switch?",
   "Why do you think containers became popular for application development even though VMs already existed?",
   "If a container host's kernel crashes, what happens to its containers, and how does that compare with a VM host?"
  ],
  "exit": [
   [
    "Is VMware ESXi a type 1 or type 2 hypervisor?",
    "Type 1 (bare-metal); it installs directly on server hardware."
   ],
   [
    "What do containers share that VMs do not?",
    "The host operating system kernel."
   ],
   [
    "How should a switch port connected to a host running VMs in several VLANs be configured?",
    "As an 802.1Q trunk allowing those VLANs, so the vSwitch can carry tagged traffic for each."
   ]
  ],
  "differentiation": [
   "Support: Provide a partly completed stack diagram with the bottom layer filled in and one layer missing from each stack, so students focus on order rather than recall.",
   "Extend: Ask fast finishers to explain how live migration would affect the switch ports and VLANs on both hosts, and what must be identical on both for a migrated VM to keep working."
  ]
 },
 {
  "t": "Network topology architectures: two-tier, three-tier, spine-leaf, WAN, SOHO, on-premises vs cloud",
  "objectives": [
   "Students will be able to identify the role of the access, distribution and core layers and explain when a collapsed core is appropriate.",
   "Students will be able to describe the spine-leaf cabling rules and explain why they give predictable east-west latency.",
   "Students will be able to compare WAN topologies (point-to-point, hub-and-spoke, full and partial mesh) and SOHO designs.",
   "Students will be able to classify on-premises, IaaS, PaaS and SaaS deployments by who manages each part of the stack."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a sketch of a messy network where every switch connects to every other. Ask students what will happen when the company doubles in size."
   ],
   [
    15,
    "Teach",
    "Draw a three-tier campus and label each layer's job, then collapse it into two tiers and explain when that fits. Draw spine-leaf with two spines and four leaves; count hops between servers. Briefly sketch hub-and-spoke versus full mesh WANs, a SOHO router, and a stack showing who manages what in IaaS, PaaS and SaaS."
   ],
   [
    15,
    "Activity",
    "Run the 'Design the district' whiteboard activity in groups (see activity steps)."
   ],
   [
    5,
    "Discuss",
    "Groups compare designs. Ask each to defend one choice, such as collapsed core versus three-tier or SaaS versus IaaS."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If every switch in a growing company connected directly to every other switch, what problems would appear as the company doubled in size?",
  "activity": {
   "title": "Design the district",
   "materials": "Whiteboard or large paper per group, markers, a printed requirements card made by the teacher.",
   "steps": [
    "Give each group a requirements card: one main campus with three buildings, a small data center with mostly server-to-server traffic, fifteen small branch schools with broadband internet, and a student records application offered by a vendor as a hosted service.",
    "Groups draw the campus (choosing two-tier or three-tier and labeling each layer), the data center (spine-leaf with at least two spines), and the WAN connecting the branches (choosing a topology).",
    "Groups label each branch as SOHO-style or not, and label the records application as IaaS, PaaS or SaaS with a one-line justification.",
    "The teacher secretly adds one deliberate violation to each group's drawing (for example, a leaf-to-leaf link) when they finish. Groups swap boards and must find and fix the violation on another group's design.",
    "Each group summarizes one design decision and its reason to the class."
   ]
  },
  "discussion": [
   "What are the trade-offs between hub-and-spoke and full mesh for a WAN with many small branches?",
   "Why should the core avoid heavy processing, and what happens to the whole campus if the core becomes unstable?",
   "What responsibilities does an organization keep even after moving an application to SaaS?"
  ],
  "exit": [
   [
    "Which layer provides PoE, VLAN assignment and port security for end devices?",
    "The access layer."
   ],
   [
    "Name one spine-leaf cabling rule.",
    "Every leaf connects to every spine; leaves never connect to leaves and spines never connect to spines."
   ],
   [
    "In which cloud model does the customer manage the operating system?",
    "IaaS."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a template drawing with empty labeled boxes for each layer and a word bank of layer jobs to place.",
   "Extend: Ask fast finishers to calculate how many inter-building links a full mesh of distribution pairs would need for 4, 6 and 8 buildings, and explain how a core changes that number."
  ]
 },
 {
  "t": "IPv4 addressing and subnetting, including VLSM and private (RFC 1918) ranges",
  "objectives": [
   "Students will be able to calculate the network ID, broadcast address and usable host range for any IPv4 address and prefix.",
   "Students will be able to choose the smallest prefix that supports a required number of hosts.",
   "Students will be able to build a non-overlapping VLSM plan by allocating subnets from largest to smallest.",
   "Students will be able to identify whether an address falls in an RFC 1918 private range."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write 192.168.10.100/26 on the board and ask students to guess which addresses share its subnet. Collect guesses without correcting."
   ],
   [
    15,
    "Teach",
    "Show the formulas: host bits, usable hosts, block size. Work 192.168.10.100/26 and 10.20.37.5/20 step by step. Build the /24 to /30 table with the class. Then demonstrate VLSM largest-first with the 60, 28, 12 and link example, and list the three RFC 1918 ranges."
   ],
   [
    15,
    "Activity",
    "Run the 'Subnet relay' team race (see activity steps)."
   ],
   [
    5,
    "Discuss",
    "Review the race answers, focusing on any team that allocated out of order or used a reserved address."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions without notes."
   ]
  ],
  "warmup": "Here is 192.168.10.100/26. Which of these addresses do you think are on the same network: .64, .99, .127, .128? Why?",
  "activity": {
   "title": "Subnet relay",
   "materials": "Whiteboard divided into team columns, printed problem cards made by the teacher, scrap paper.",
   "steps": [
    "Split the class into teams of four and give each team a stack of face-down problem cards: find the subnet and broadcast, pick the smallest prefix for N hosts, say private or public, and one VLSM plan.",
    "One student per team flips a card, solves it on scrap paper, and writes the answer in the team's column on the board. The next teammate checks the answer before flipping the next card.",
    "If a checker finds an error, the team must fix it before continuing, and the checker explains the fix aloud.",
    "The final card for every team is the same VLSM problem: 172.16.0.0/24 for 100, 50, 10 hosts and two router links. Teams write the full plan.",
    "The teacher reviews each team's VLSM plan on the board for overlaps and boundary alignment."
   ]
  },
  "discussion": [
   "Why does allocating the largest subnet first guarantee alignment, and what happens if you start small?",
   "When would you choose /31 instead of /30 for a router link, and what might stop you?",
   "Why do organizations use private addresses internally even when they could request public space?"
  ],
  "exit": [
   [
    "What are the network ID and broadcast address for 172.16.50.77/28?",
    "Block size 16: network 172.16.50.64, broadcast 172.16.50.79."
   ],
   [
    "What is the smallest prefix for 25 hosts?",
    "/27, which provides 30 usable addresses."
   ],
   [
    "Is 172.31.200.1 private or public?",
    "Private; it is inside 172.16.0.0/12."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a block-size chart and a number line from 0 to 255 marked in 64s, 32s and 16s so they can see where subnets begin.",
   "Extend: Ask fast finishers to subnet in the third octet, for example finding the network and broadcast for 10.44.77.9/19, and then design a VLSM plan for a /22."
  ]
 },
 {
  "t": "Troubleshoot IPv4 addressing: wrong mask, gateway outside the subnet, duplicate addresses, APIPA",
  "objectives": [
   "Students will be able to explain how a host uses its address and mask to decide between ARPing for a destination and sending to the gateway.",
   "Students will be able to diagnose a wrong mask, an off-subnet gateway, a duplicate address or an APIPA address from a symptom description or ipconfig output.",
   "Students will be able to use show ip arp, arp -a and show mac address-table to locate the device behind a duplicate IP.",
   "Students will be able to list path-related causes of DHCP failure that lead to APIPA addresses."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display three short ipconfig outputs side by side and ask which one looks wrong at first glance and why."
   ],
   [
    15,
    "Teach",
    "Draw the host's local-or-remote decision as a flowchart on the board. Walk through what changes when the mask is too short, too long, and when the gateway is off-subnet. Then cover duplicate IPs (ARP flipping, how to trace the MAC) and APIPA (what it means and the path causes). End with the ping sequence: self, gateway, remote IP, name."
   ],
   [
    15,
    "Activity",
    "Run the 'Help-desk triage' role-play in pairs (see activity steps)."
   ],
   [
    5,
    "Discuss",
    "Ask pairs to share the ticket that was hardest to diagnose and what clue finally gave it away."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A coworker says, 'My email works but our internal site does not.' Without touching the network gear, what single setting on their PC would you look at first, and why?",
  "activity": {
   "title": "Help-desk triage role-play",
   "materials": "Printed ticket cards and matching 'evidence' cards (ipconfig output, show ip arp output, symptom notes) made by the teacher; whiteboard.",
   "steps": [
    "Pair students as 'user' and 'technician'. Give each user a ticket card with a symptom and a hidden evidence card; give technicians a blank triage sheet.",
    "The technician asks questions and requests specific outputs (for example, 'Show me ipconfig /all' or 'Can you ping the gateway?'). The user reveals only the evidence that was requested.",
    "The technician writes the diagnosis (mask, gateway, duplicate, or APIPA) and the next step, such as checking the VLAN or tracing a MAC address.",
    "Pairs swap roles and use a new ticket. Include at least one ticket of each type across the set.",
    "Pairs record on the board which piece of evidence was decisive for each ticket type."
   ]
  },
  "discussion": [
   "Why is giving a PC a static address a poor response to a 169.254 address, even if it gets the user working?",
   "How would you tell a wrong mask apart from a routing problem on the router when only some remote subnets fail?",
   "What processes could an organization use to prevent duplicate IP addresses in the first place?"
  ],
  "exit": [
   [
    "A host can reach local devices but nothing remote. Which setting do you check first?",
    "The default gateway, which must be in the host's own subnet and match the router's interface address."
   ],
   [
    "What does a 169.254.x.x address indicate?",
    "The host is a DHCP client that got no reply and self-assigned an APIPA address; the DHCP path or server is the problem."
   ],
   [
    "Connectivity to one server comes and goes every few minutes. What is a likely addressing cause and how would you confirm it?",
    "A duplicate IP address. Check show ip arp or arp -a for a changing MAC, then trace the MAC with show mac address-table."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a decision flowchart with the four symptom patterns and their causes to use during the role-play.",
   "Extend: Ask fast finishers to write a ticket where two problems overlap, such as a wrong mask plus a stale DNS entry, and trade it with another pair."
  ]
 },
 {
  "t": "IPv6 address types and prefixes: global unicast, unique local, link-local, multicast, anycast",
  "objectives": [
   "Students will be able to compress and expand IPv6 addresses correctly using the leading-zero and double-colon rules.",
   "Students will be able to identify global unicast, unique local, link-local and multicast addresses from their leading characters.",
   "Students will be able to explain why IPv6 has no broadcast and how solicited-node multicast replaces ARP broadcasts.",
   "Students will be able to describe anycast and explain why routing protocols use link-local next hops."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write 2001:0db8:0000:0000:0000:0000:0000:0001 on the board and ask students how they might shorten it. Accept guesses, then reveal 2001:db8::1."
   ],
   [
    15,
    "Teach",
    "Teach the two compression rules with three practice addresses. Then build a table on the board: prefix, type, IPv4 rough equivalent, purpose. Cover 2000::/3, fc00::/7 (fd), fe80::/10, ff00::/8 with key ff02 groups, anycast, :: and ::1. Explain solicited-node multicast with a quick drawing."
   ],
   [
    15,
    "Activity",
    "Run the 'Address sort' card activity in small groups (see activity steps)."
   ],
   [
    5,
    "Discuss",
    "Project the router output from the lesson example and have the class read each line aloud and name its type."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "IPv4 uses broadcasts to find neighbors. If you were designing a new protocol, why might you want to avoid broadcasts?",
  "activity": {
   "title": "Address sort",
   "materials": "Printed address cards (about 20) made by the teacher, five labeled envelopes or areas on a table (Global unicast, Unique local, Link-local, Multicast, Not valid as written), sticky notes.",
   "steps": [
    "Give each group a shuffled deck of address cards, including examples like 2001:db8:acad:1::5, fd3c:12ab:9::1, fe80::a1, ff02::1:ff00:5, 2001:db8:ff::9, and two invalid ones such as 2001::1::5.",
    "Groups sort each card into the correct category and write the expanded or compressed form on a sticky note attached to the card.",
    "For each multicast card, groups write who receives it (for example, all nodes on the link or OSPFv3 routers).",
    "Give each group one challenge card: 'Same address on three DNS servers, reach the nearest.' Groups decide where it goes and explain why there is no matching envelope.",
    "Groups check their sort against another group's and resolve any differences before the class review."
   ]
  },
  "discussion": [
   "Why do you think IPv6 designers chose to make every interface have a link-local address automatically?",
   "What are the advantages of using a router's link-local address as a routing next hop instead of its global address?",
   "When might an organization use unique local addresses alongside global unicast addresses?"
  ],
  "exit": [
   [
    "Compress 2001:0db8:0000:0000:0abc:0000:0000:0001.",
    "2001:db8::abc:0:0:1. The first run of two zero groups and the later run are equal length, so the first is compressed by convention; only one double colon is allowed."
   ],
   [
    "What type of address is fe80::1, and will a router forward packets sourced from it to another link?",
    "Link-local; routers never forward it beyond the local link."
   ],
   [
    "What replaces ARP broadcasts in IPv6?",
    "Neighbor solicitation sent to the solicited-node multicast address ff02::1:ffxx:xxxx."
   ]
  ],
  "differentiation": [
   "Support: Provide a hex-to-binary chart and a one-row reference card listing each leading prefix and its type for students to use while sorting.",
   "Extend: Ask fast finishers to derive the solicited-node multicast address for 2001:db8:acad:10::abcd:1234 and explain which bits it uses."
  ]
 },
 {
  "t": "IPv6 address configuration: static, EUI-64, SLAAC and RA messages; troubleshoot IPv6 addressing",
  "objectives": [
   "Students will be able to configure static, link-local and EUI-64 IPv6 addresses on an IOS interface and explain the role of ipv6 unicast-routing.",
   "Students will be able to calculate an EUI-64 interface ID from a MAC address, including flipping the seventh bit.",
   "Students will be able to describe the SLAAC process, including RS, RA and DAD, and interpret the M and O flags.",
   "Students will be able to troubleshoot a host that has only a link-local address or a duplicate address."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a PC output with only an fe80 address and ask: what is this PC missing, and who should have given it?"
   ],
   [
    15,
    "Teach",
    "Show the static configuration commands, then do EUI-64 step by step on the board with 0050.3e11.2233, writing the first byte in binary to show the flip. Draw the SLAAC sequence as a ladder diagram: RS to ff02::2, RA to ff02::1, host builds address, DAD. Then show a three-row table for the M and O flags."
   ],
   [
    15,
    "Activity",
    "Run 'EUI-64 and SLAAC stations' in pairs (see activity steps)."
   ],
   [
    5,
    "Discuss",
    "Review the troubleshooting cards together and ask what single command fixes the most common failure."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A PC shows only an IPv6 address starting with fe80 and cannot reach any server. What do you think it is waiting for?",
  "activity": {
   "title": "EUI-64 and SLAAC stations",
   "materials": "Three printed station cards per pair made by the teacher (EUI-64 calculations, an RA flag scenario, a troubleshooting output), scrap paper, a hex-to-binary chart on the projector.",
   "steps": [
    "Station 1: pairs convert four MAC addresses into EUI-64 interface IDs, including one whose first byte is 02 so the flip produces 00. They write the full address for prefix 2001:db8:acad:5::/64.",
    "Station 2: pairs read three short RA descriptions (M set, O set, neither set) and write how a host gets its address, its DNS servers and its gateway in each case.",
    "Station 3: pairs read a router running-config excerpt missing ipv6 unicast-routing and a switch output marking an address DUPLICATE, and write the cause and fix for each.",
    "Pairs rotate through the stations, about four minutes each, then compare answers with a neighboring pair.",
    "The teacher calls on pairs to present one answer from each station."
   ]
  },
  "discussion": [
   "Why might modern operating systems prefer random interface IDs over EUI-64 for SLAAC addresses?",
   "What are the trade-offs between SLAAC with stateless DHCPv6 and fully stateful DHCPv6 for a large network?",
   "Why would blocking all ICMPv6 with an ACL break IPv6 addressing, when blocking ICMP in IPv4 usually does not break addressing?"
  ],
  "exit": [
   [
    "What EUI-64 interface ID comes from MAC 0011.2233.4455?",
    "0211:22ff:fe33:4455 (written 211:22ff:fe33:4455)."
   ],
   [
    "Which global command must be present for an IOS router to send router advertisements?",
    "ipv6 unicast-routing."
   ],
   [
    "An RA has the M flag set. How do hosts get their address and their default gateway?",
    "The address comes from stateful DHCPv6; the default gateway still comes from the RA, as the router's link-local address."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a worksheet that breaks EUI-64 into boxes (split, insert, convert first byte to binary, flip, convert back) so they complete one small step at a time.",
   "Extend: Ask fast finishers to explain how DAD uses the solicited-node multicast address and what would happen if two hosts on a link generated the same random interface ID."
  ]
 },
 {
  "t": "Wireless principles: 2.4, 5 and 6 GHz bands, non-overlapping channels, SSID, RF interference",
  "objectives": [
   "Students will be able to compare the 2.4, 5 and 6 GHz bands in terms of range, channel count, interference and client support.",
   "Students will be able to assign non-overlapping 2.4 GHz channels (1, 6 and 11) to a set of neighboring access points.",
   "Students will be able to define SSID, BSSID, BSS, ESS and IBSS and identify each from a description.",
   "Students will be able to distinguish co-channel, adjacent-channel and non-Wi-Fi interference and explain why RSSI alone does not measure link quality."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students who has had full Wi-Fi bars but slow internet, and what they think caused it. List ideas on the board."
   ],
   [
    15,
    "Teach",
    "Draw the 2.4 GHz channel diagram with overlapping arcs about 20 MHz wide, spaced 5 MHz apart, and show why 1, 6 and 11 stand apart. Compare the three bands in a table. Define SSID, BSSID, BSS, ESS and IBSS with a simple drawing of APs and clients. Finish with the interference types, RSSI versus SNR, and DFS."
   ],
   [
    15,
    "Activity",
    "Run the 'Channel map' floor-plan activity in small groups (see activity steps)."
   ],
   [
    5,
    "Discuss",
    "Compare channel maps between groups and discuss where co-channel reuse was unavoidable and how power settings help."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You have full Wi-Fi bars but everything is slow. List three things that might be going on.",
  "activity": {
   "title": "Channel map",
   "materials": "Printed floor plans made by the teacher showing nine AP locations in a grid, colored markers or sticky notes in three colors, a printed list of interference sources (microwave, Bluetooth speakers, metal shelving).",
   "steps": [
    "Give each group a floor plan with nine AP positions. Assign one color each to channels 1, 6 and 11.",
    "Groups color each AP so that no two neighboring APs share a channel, then circle any spots where reuse is closest and explain how they would reduce co-channel interference there.",
    "Hand out the interference list. Groups mark where a microwave or metal shelving appears on the plan and decide whether to move an AP, change its channel, or rely on 5 GHz for nearby clients.",
    "Groups add one SSID label for the whole floor and label one AP radio with an example BSSID, then write one sentence explaining the difference.",
    "Each group swaps plans with another and checks for any neighboring APs on the same or overlapping channels."
   ]
  },
  "discussion": [
   "Why might turning AP transmit power down actually improve performance in a dense office?",
   "When would you still keep 2.4 GHz enabled even though 5 and 6 GHz offer more capacity?",
   "How would you explain to a non-technical manager why full bars do not guarantee fast Wi-Fi?"
  ],
  "exit": [
   [
    "Which 2.4 GHz channels do not overlap in North America?",
    "1, 6 and 11."
   ],
   [
    "What is the difference between an SSID and a BSSID?",
    "The SSID is the network name; the BSSID is the MAC address of a specific AP radio."
   ],
   [
    "Two neighboring APs both use channel 6. What type of interference results, and how would you fix it?",
    "Co-channel interference; move one to channel 1 or 11, reduce power, or move clients to 5 or 6 GHz."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pre-drawn three-color honeycomb pattern to copy onto the floor plan, so they can focus on understanding why it avoids overlap.",
   "Extend: Ask fast finishers to plan the same floor in 5 GHz using 20 MHz and then 80 MHz channels, and explain how wider channels reduce the number of non-overlapping channels available."
  ]
 },
 {
  "t": "Troubleshoot wired and wireless client connectivity (verify IP settings on Windows, macOS and Linux)",
  "objectives": [
   "Students will be able to match IP verification commands to Windows, macOS and Linux and identify the platform from sample output.",
   "Students will be able to read a client's address, mask, gateway and DNS settings from command output and spot a misconfiguration.",
   "Students will be able to apply a bottom-up ping sequence (loopback, self, gateway, remote IP, name) to isolate the failing layer.",
   "Students will be able to distinguish client-side from network-side wireless faults, including an associated client with an APIPA address."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project three short outputs (one from ipconfig, one from ifconfig en0, one from ip addr) and ask students to guess the operating system for each."
   ],
   [
    15,
    "Teach",
    "Build a three-column board table: Windows, macOS, Linux, with rows for address, gateway, DNS, Wi-Fi details and routing table. Then draw the ping ladder and explain what failure at each rung means. Finish with wireless-specific causes and the 'compare with a working client' rule."
   ],
   [
    15,
    "Activity",
    "Run the 'Three desks, three tickets' pair troubleshooting activity, or have students run the commands on their own laptops if available (see activity steps)."
   ],
   [
    5,
    "Discuss",
    "Pairs share which output line gave away each fault. Emphasize DNS versus reachability and client versus network."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Look at these three outputs. Which operating system produced each one, and what clue gave it away?",
  "activity": {
   "title": "Three desks, three tickets",
   "materials": "Printed ticket packets made by the teacher with command output from Windows, macOS and Linux clients; student laptops with a browser or terminal if available; whiteboard.",
   "steps": [
    "Give each pair three ticket packets. Each contains a user complaint and the output of two or three commands from one operating system (for example, ipconfig /all and a ping result, or ip a, ip route and /etc/resolv.conf).",
    "Pairs identify the operating system, read the address, mask, gateway and DNS, and decide which layer is failing using the ping ladder.",
    "Pairs write the cause and the next command or fix for each ticket, such as correcting a DNS server or checking a VLAN mapping.",
    "If laptops are available, each student runs the equivalent command on their own machine and finds their own address, gateway and DNS server.",
    "Pairs post their diagnosis for one ticket on the board, and the class checks whether the evidence supports it."
   ]
  },
  "discussion": [
   "Why is comparing with a working client nearby such a powerful first step?",
   "What information would you ask a remote user to read to you over the phone, and in what order?",
   "How can a stale DNS cache make one site fail while others work, and how would you clear it on each platform?"
  ],
  "exit": [
   [
    "Which command shows the default gateway on a modern Linux host?",
    "ip route, on the line beginning default via."
   ],
   [
    "A client pings its gateway and a remote IP successfully but cannot reach a site by name. What is the likely cause?",
    "DNS: the configured DNS server is wrong or unreachable, or the cache is stale."
   ],
   [
    "A laptop is associated to the correct SSID with a strong signal but has a 169.254 address. Where is the problem likely to be?",
    "On the network side: the WLAN-to-VLAN mapping, the AP trunk or DHCP reachability, not the wireless signal."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page command cheat sheet organized by operating system and a printed ping-ladder flowchart for students to follow during the activity.",
   "Extend: Ask fast finishers to write a ticket packet that hides a subtle fault, such as a wrong mask that breaks only one server, and trade it with another pair."
  ]
 },
 {
  "t": "DHCPv4 on IOS: server pools, excluded addresses, relay with ip helper-address, troubleshooting leases",
  "objectives": [
   "Students will be able to sequence the DHCP DORA exchange and state the UDP ports used by clients and servers.",
   "Students will be able to configure an IOS DHCP pool with exclusions, network, default-router, dns-server and lease.",
   "Students will be able to explain how ip helper-address and the giaddr field let a remote server choose the right pool, and place the helper on the correct interface.",
   "Students will be able to troubleshoot failed or incorrect leases using show ip dhcp binding, show ip dhcp pool and show ip dhcp conflict."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: when your laptop joins a new Wi-Fi network, how does it get an address without you typing anything? Collect answers and introduce DHCP."
   ],
   [
    15,
    "Teach",
    "Draw a client and server and act out DORA with arrows, labeling broadcast or unicast and the ports. Write the sample pool configuration on the board line by line and explain each command and the order of exclusions. Then add a router between client and server and show the helper address, giaddr, and why the server needs a matching scope."
   ],
   [
    15,
    "Activity",
    "Run the 'Be the packet' DORA role-play followed by a configuration error hunt (see activity steps)."
   ],
   [
    5,
    "Discuss",
    "Review the error hunt answers and connect each error to the symptom a user would report."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When your phone joins a new Wi-Fi network, it gets an address in a second or two. Who do you think gave it that address, and how did your phone find them?",
  "activity": {
   "title": "Be the packet: DORA role-play and error hunt",
   "materials": "Large printed message cards (Discover, Offer, Request, Acknowledgment) made by the teacher, a printed giaddr sticky note, printed configuration excerpts containing errors, whiteboard.",
   "steps": [
    "Assign roles: one client, one router (relay), one DHCP server, and one 'other server' standing across the room. Give the client the Discover and Request cards and the server the Offer and Acknowledgment cards.",
    "Act out DORA with the server on the same subnet. Then move the server across the room behind the router. The client's Discover must stop at the router until the router student adds the giaddr sticky note and walks the card to the server as a unicast.",
    "Have the server student check a printed list of scopes. Remove the scope for the client's subnet and replay so the class sees why no Offer comes back.",
    "Hand pairs four printed configuration excerpts, each with one error: helper on the server-facing interface, missing default-router, missing exclusions, pool network that does not match the subnet. Pairs identify the error and the user symptom.",
    "Pairs write the corrected line for each excerpt on the board."
   ]
  },
  "discussion": [
   "Why is the DHCP Request broadcast rather than unicast, even though the client already knows which server offered the address?",
   "What are the trade-offs between running DHCP on each branch router and relaying to one central server?",
   "How could DHCP snooping protect clients, and how might it accidentally break DHCP if configured incorrectly?"
  ],
  "exit": [
   [
    "List the four DHCP messages in order.",
    "Discover, Offer, Request, Acknowledgment."
   ],
   [
    "On which interface should ip helper-address be configured?",
    "The interface that receives the client broadcasts, such as the client VLAN's SVI or subinterface."
   ],
   [
    "Clients receive addresses but cannot reach other subnets. What is the likely pool problem?",
    "The default-router command is missing or wrong, so clients have no valid gateway."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a fill-in-the-blank version of the pool configuration and a labeled DORA diagram showing broadcast and unicast arrows.",
   "Extend: Ask fast finishers to explain what happens at half the lease time and later in the lease if the original server is down, and how a second server could provide redundancy."
  ]
 },
 {
  "t": "Switching concepts: MAC learning and aging, frame forwarding, flooding of unknown unicast and broadcast",
  "objectives": [
   "Students will be able to explain how a switch populates its MAC address table from source addresses and removes entries through aging.",
   "Students will be able to predict whether a switch forwards, filters or floods a given frame based on its destination MAC and VLAN.",
   "Students will be able to compare broadcast and collision domains and store-and-forward versus cut-through switching.",
   "Students will be able to use show mac address-table output to trace a device to its switch port."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four guesses on the whiteboard without correcting them yet."
   ],
   [
    12,
    "Teach",
    "Draw one switch with six ports in two VLANs. Narrate a first frame: learn the source, look up the destination, flood within the VLAN. Then the reply: learn, forward. Add the filter case and the broadcast case. Close with aging (300 seconds) and store-and-forward versus cut-through."
   ],
   [
    18,
    "Activity",
    "Run the 'Human Switch' role-play described below, then project a sample show mac address-table output and have pairs trace one MAC to its port."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect flooding to broadcast domains and to loops."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "A switch is turned on for the first time and its MAC table is empty. The very first frame arrives. How can the switch possibly know where to send it?",
  "activity": {
   "title": "The Human Switch",
   "materials": "Whiteboard, sticky notes, printed index cards showing frames (source MAC, destination MAC, VLAN, ingress port), a projector with a sample show mac address-table output.",
   "steps": [
    "Pick one student to be the switch and six students to be hosts standing at numbered 'ports'; tape a VLAN color (10 or 20) on each host.",
    "The switch draws an empty MAC table on the whiteboard with columns VLAN, MAC, Port.",
    "Hand out frame cards one at a time. For each, the switch must first record the source, then announce forward, filter or flood, and hand copies only to the correct hosts.",
    "Include an unknown unicast, a broadcast, a frame whose destination is on the same port, and a host that 'moves' to a new port.",
    "After ten frames, call 'five minutes pass' and have the switch erase entries for hosts that have not sent anything, demonstrating aging.",
    "Switch to the projected output and have pairs answer: which port is MAC 00a1.b2c3.d4e5 on, and is it an uplink or an end device?"
   ]
  },
  "discussion": [
   "Why is flooding an unknown unicast frame acceptable, while a loop that floods forever is a disaster?",
   "If you shortened the aging timer to ten seconds, what would improve and what would get worse?"
  ],
  "exit": [
   [
    "Which MAC address does a switch use to learn, and which does it use to forward?",
    "It learns from the source MAC and forwards based on the destination MAC."
   ],
   [
    "A frame arrives in VLAN 20 with a destination MAC not in the table. Where does it go?",
    "Out every VLAN 20 port except the port it arrived on."
   ],
   [
    "Which device type separates broadcast domains: a switch or a router?",
    "A router (or a VLAN boundary); a switch separates collision domains but floods broadcasts within a VLAN."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-box flowchart (destination known on another port, known on same port, unknown or broadcast) to keep beside them during the role-play, and let them practice with only one VLAN first.",
   "Extend: Ask fast finishers to explain why a MAC address flapping between two ports suggests a loop, and to predict what cut-through switching would do with a frame corrupted in transit."
  ]
 },
 {
  "t": "VLANs (normal range) across multiple switches: access ports, data and voice VLANs, default VLAN",
  "objectives": [
   "Students will be able to explain why each VLAN is a separate broadcast domain and why inter-VLAN traffic needs routing.",
   "Students will be able to identify the default VLAN, the normal VLAN range and the reserved VLAN IDs.",
   "Students will be able to configure an access port with a data VLAN and a voice VLAN and interpret show vlan brief and show interfaces switchport output.",
   "Students will be able to diagnose why hosts in the same VLAN on different switches cannot communicate."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch student answers as boxes on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Draw two switches joined by a trunk. Add VLANs 10 and 20, then a phone with a PC behind it. Walk through VLAN 1, the normal range, vlan.dat, access ports and the voice VLAN, showing the configuration snippet on the projector."
   ],
   [
    18,
    "Activity",
    "Run the 'Floor Plan' design and break-fix exercise described below."
   ],
   [
    5,
    "Discuss",
    "Pose the discussion questions and connect answers to security and troubleshooting."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on paper."
   ]
  ],
  "warmup": "A school wants students, teachers and security cameras on the same building wiring but unable to see each other's traffic. Without buying new switches, how could you do it?",
  "activity": {
   "title": "Floor Plan: design, then break and fix",
   "materials": "Whiteboard, sticky notes in three colors, printed cards with show vlan brief and show interfaces switchport output (one correct, two with planted faults), student laptops with a browser for notes.",
   "steps": [
    "In groups of three, students draw a two-floor building with one switch per floor and a link between them.",
    "Using colored sticky notes for PCs, phones and cameras, they assign each device a VLAN and write the switchport commands for one desk port that has both a phone and a PC.",
    "Each group marks which VLANs must exist on each switch and which must be allowed on the inter-floor link.",
    "Hand out the printed output cards. Groups find the planted faults: VLAN 30 missing on the upstairs switch, and a port 'missing' from show vlan brief that is actually a trunk.",
    "Each group states the single command that fixes each real fault and explains why the missing trunk port is not a fault."
   ]
  },
  "discussion": [
   "Why might an organization put unused ports in a dedicated unused VLAN instead of just leaving them in VLAN 1?",
   "What are the advantages of separating voice and data into different VLANs on the same port?"
  ],
  "exit": [
   [
    "What is the normal VLAN range, and which VLANs in it cannot be deleted?",
    "1 to 1005; VLAN 1 and VLANs 1002 to 1005 cannot be deleted."
   ],
   [
    "Write the interface commands to put a port in data VLAN 10 with voice VLAN 20.",
    "switchport mode access, switchport access vlan 10, switchport voice vlan 20."
   ],
   [
    "Hosts in VLAN 50 on SW1 and SW2 cannot communicate; other VLANs work. Give one likely cause.",
    "VLAN 50 is not created on one of the switches, or the trunk between them does not allow VLAN 50."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed floor plan with the VLAN numbers already chosen, so struggling students focus only on writing the access and voice VLAN commands and reading show vlan brief.",
   "Extend: Ask fast finishers to explain where VLAN definitions are stored on many Cisco switches and what happens to them if someone erases only the startup configuration and reloads."
  ]
 },
 {
  "t": "Layer 2 edge-port attributes: VLAN, Power over Ethernet (PoE), port channel and LACP",
  "objectives": [
   "Students will be able to choose between an access port and a trunk for phones, PCs, autonomous APs and lightweight APs.",
   "Students will be able to explain PoE detection, classification and the shared power budget, and interpret show power inline.",
   "Students will be able to compare LACP active, passive, PAgP and static on modes and predict which pairs form a bundle.",
   "Students will be able to explain why an EtherChannel avoids spanning tree blocking and balances traffic per flow."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up scenario on the projector and take a quick hands-up vote on the cause."
   ],
   [
    13,
    "Teach",
    "Walk through the three edge-port decisions in order: VLAN choice, PoE (PSE, PD, detection, budget), then port channels and LACP modes. Draw a 3x3 grid of mode pairs on the board and fill it in with the class."
   ],
   [
    17,
    "Activity",
    "Run the 'Edge Port Card Sort' described below in groups of three."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on why negotiation is safer than mode on."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A switch powers forty phones without trouble. After ten cameras are added, three phones go dark, but the cameras all work. What do you think happened?",
  "activity": {
   "title": "Edge Port Card Sort",
   "materials": "Printed device cards (IP phone with PC, autonomous AP with two SSIDs, lightweight AP, PoE camera, dual-NIC server, printer), printed mode-pair cards (active/passive, passive/passive, on/active, desirable/auto, on/on), a printed show power inline excerpt, whiteboard.",
   "steps": [
    "Groups sort device cards into 'access port', 'trunk' and 'port channel' piles and add a sticky note saying whether each needs PoE.",
    "Groups sort mode-pair cards into 'forms a bundle' and 'does not form a bundle' and write one sentence explaining each failure.",
    "Hand out the show power inline excerpt. Groups find the remaining budget and identify which ports are drawing the most power.",
    "Each group writes the full interface configuration for the dual-NIC server ports using LACP and checks it against a neighboring group.",
    "The teacher reviews answers on the whiteboard, highlighting the lightweight AP (access port) and passive/passive (fails) traps."
   ]
  },
  "discussion": [
   "Why might an engineer prefer LACP over mode on even when both ends are configured by the same person?",
   "Where in a building would you deliberately turn PoE off on ports, and why?"
  ],
  "exit": [
   [
    "Which device is the PSE and which is the PD when a switch powers an IP phone?",
    "The switch is the PSE (power sourcing equipment); the phone is the PD (powered device)."
   ],
   [
    "Will LACP passive on one switch and LACP passive on the other form a bundle?",
    "No; passive only responds, so neither side initiates negotiation."
   ],
   [
    "Why does a lightweight AP in local mode usually need only an access port?",
    "Its client traffic is tunneled to the wireless LAN controller, so the switch port only needs to carry the AP's own VLAN."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference card listing which LACP and PAgP modes initiate and which only respond, and let them work only the LACP pairs first.",
   "Extend: Ask fast finishers to explain why a single large backup across a two-link EtherChannel does not run at double speed, and what changing the load-balancing hash inputs might or might not achieve."
  ]
 },
 {
  "t": "802.1Q trunking: native VLAN, allowed VLAN lists, DTP modes",
  "objectives": [
   "Students will be able to explain how an 802.1Q tag identifies a frame's VLAN on a trunk and how native VLAN frames are handled.",
   "Students will be able to predict the result of each DTP mode combination.",
   "Students will be able to edit an allowed VLAN list safely using add, remove and except, and interpret show interfaces trunk.",
   "Students will be able to apply trunk hardening: unused native VLAN, hard-coded modes and switchport nonegotiate."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and ask students to guess what the 'one line' was."
   ],
   [
    13,
    "Teach",
    "Draw an Ethernet frame on the whiteboard and insert the 4-byte tag between the source MAC and EtherType. Explain native VLAN, then project the configuration snippet and the four sections of show interfaces trunk. Fill in a DTP mode grid with the class."
   ],
   [
    17,
    "Activity",
    "Run 'Trunk Detective' with printed output cards as described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect trunk settings to security."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "An engineer types one command to add VLAN 40 to a trunk, and three other VLANs immediately stop working across that link. What do you think the command did?",
  "activity": {
   "title": "Trunk Detective",
   "materials": "Printed cards with paired show interfaces trunk output from both ends of a link (four scenarios), a printed DTP mode grid, whiteboard, sticky notes.",
   "steps": [
    "In pairs, students receive four scenario cards: an allowed list overwritten without add, a native VLAN mismatch, a VLAN allowed but not active on one side, and a link missing from the output because both ends are dynamic auto.",
    "For each card, pairs write the symptom users would notice and the exact cause on a sticky note.",
    "Pairs write the corrective command for each scenario, including the full allowed list where needed.",
    "Pairs fill in the DTP grid (access, trunk, desirable, auto against each other) and circle the auto-auto cell.",
    "The teacher has one pair present each scenario on the whiteboard and asks the class to confirm or challenge the fix."
   ]
  },
  "discussion": [
   "Why is relying on DTP to form trunks considered risky on user-facing ports?",
   "If both ends of a trunk agree on native VLAN 999, why does it matter that no users are in VLAN 999?"
  ],
  "exit": [
   [
    "How are native VLAN frames sent on an 802.1Q trunk?",
    "Untagged; untagged frames received on the trunk are placed in the native VLAN."
   ],
   [
    "Which command adds VLAN 60 to a trunk without removing existing VLANs?",
    "switchport trunk allowed vlan add 60."
   ],
   [
    "Two connected ports are both dynamic auto. Do they form a trunk?",
    "No; neither side initiates, so the link stays an access link."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page labeled diagram of a tagged frame and a color-coded DTP grid, and start them on the overwritten allowed list scenario, which has the clearest symptom.",
   "Extend: Ask fast finishers to explain, in defensive terms, why double tagging relies on the attacker's access VLAN matching the trunk's native VLAN, and why moving the native VLAN to an unused VLAN breaks that condition."
  ]
 },
 {
  "t": "Layer 2 discovery protocols: CDP and LLDP",
  "objectives": [
   "Students will be able to compare CDP and LLDP by standard, default state and default timers.",
   "Students will be able to interpret show cdp neighbors output, distinguishing Local Intrfce from Port ID.",
   "Students will be able to enable, disable and tune CDP and LLDP globally and per interface.",
   "Students will be able to justify where discovery protocols should be disabled for security."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list student ideas on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Compare CDP and LLDP in a two-column table on the board: standard, default state, timers, per-interface controls. Project the sample show cdp neighbors output and label each column with the class."
   ],
   [
    18,
    "Activity",
    "Run the 'Map the Closet' exercise with printed neighbor outputs as described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about security trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "You are dropped into a building with no network diagram and no labels on the cables. Without touching any cables, how could you find out what is connected to each switch port?",
  "activity": {
   "title": "Map the Closet",
   "materials": "Printed show cdp neighbors and show lldp neighbors outputs from four fictional devices (core switch, two access switches, router) plus one third-party firewall visible only in LLDP output, blank paper, whiteboard, colored markers.",
   "steps": [
    "In groups of three, students receive the printed outputs, one device per card.",
    "Using Local Intrfce and Port ID, groups draw a topology showing every device and the interfaces at both ends of each link.",
    "Groups note which device appears only in LLDP output and write the command that had to be entered on the switch to see it.",
    "Groups mark with a red marker every interface where they would disable CDP and LLDP for security, and write the interface commands.",
    "Two groups compare drawings; any mismatch must be resolved by pointing to the specific output line."
   ]
  },
  "discussion": [
   "What information in a CDP advertisement would be most useful to an attacker, and why?",
   "Why does it make sense that discovery messages are never forwarded beyond the directly connected neighbor?"
  ],
  "exit": [
   [
    "Which protocol is an IEEE standard, and what are its default timer and holdtime?",
    "LLDP (IEEE 802.1AB); 30 seconds and 120 seconds."
   ],
   [
    "In show cdp neighbors, R1 is listed with Local Intrfce Gig 0/1 and Port ID Gig 0/0/0. Which port on R1 is connected?",
    "Gig 0/0/0; Gig 0/1 is the port on the local device."
   ],
   [
    "Which interface command stops CDP on a single port?",
    "no cdp enable."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a column-by-column legend for show cdp neighbors output and start them with only two devices before adding the rest.",
   "Extend: Ask fast finishers to explain how CDP and LLDP-MED help an IP phone learn its voice VLAN, and what would break if discovery were disabled on phone ports."
  ]
 },
 {
  "t": "EtherChannel (LACP and static), Layer 2 and Layer 3, and member-port consistency rules",
  "objectives": [
   "Students will be able to predict which combinations of LACP, PAgP and static on modes form a bundle.",
   "Students will be able to list the member settings that must match and identify a suspended member in show etherchannel summary.",
   "Students will be able to configure Layer 2 and Layer 3 EtherChannels, placing settings and IP addresses on the port-channel interface.",
   "Students will be able to explain why per-flow hashing limits a single flow to one member link."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up question and gather predictions."
   ],
   [
    13,
    "Teach",
    "Draw two switches with four links, first showing STP blocking three, then bundling them. Build a mode compatibility table with the class (active, passive, desirable, auto, on). Project a show etherchannel summary output and decode the flags SU, RU, P, s, I and D."
   ],
   [
    17,
    "Activity",
    "Run 'Bench the Van' with printed member configuration cards as described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare static and negotiated bundles."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Two switches are connected by four cables. Without any special configuration, how many of those cables do you think will actually forward traffic, and why?",
  "activity": {
   "title": "Bench the Van",
   "materials": "Printed cards each showing one member port's configuration (speed, duplex, mode, native VLAN, allowed VLANs, channel-group mode), printed show etherchannel summary excerpts, whiteboard, sticky notes.",
   "steps": [
    "Groups of three receive eight member cards for a planned two-switch, four-link bundle, with three planted inconsistencies.",
    "Groups pair cards by switch, then mark each card 'bundled' or 'suspended' and write the mismatched setting on a sticky note.",
    "For a second card set, groups decide whether the mode pair forms a bundle (including on with active and desirable with active).",
    "Groups write the single set of port-channel interface commands that would make all members consistent.",
    "Groups read a show etherchannel summary excerpt with flags RU and one s member and explain what it shows, then present to another group."
   ]
  },
  "discussion": [
   "Why are negotiated bundles considered safer than mode on, even when both ends are carefully configured?",
   "When would a Layer 3 EtherChannel be a better choice than a Layer 2 trunk EtherChannel between two multilayer switches?"
  ],
  "exit": [
   [
    "Which mode pairs form a bundle: on/active, active/passive, passive/passive, desirable/auto?",
    "Active/passive and desirable/auto. On/active and passive/passive do not."
   ],
   [
    "What does the flag s next to a member in show etherchannel summary mean?",
    "The member is suspended because its settings do not match the bundle, so it carries no traffic."
   ],
   [
    "On which interface do you configure the IP address of a Layer 3 EtherChannel?",
    "On the port-channel interface, with no switchport set."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a checklist of the consistency settings (speed, duplex, mode, access VLAN, native VLAN, allowed VLANs, Layer 2 or Layer 3) to tick off for each card.",
   "Extend: Ask fast finishers to explain how changing port-channel load-balance from source MAC to source and destination IP could change the distribution of traffic between a few servers and many clients."
  ]
 },
 {
  "t": "Rapid PVST+: root bridge election, root/designated/alternate ports, port states, PortFast, BPDU guard",
  "objectives": [
   "Students will be able to determine the root bridge from bridge priorities, VLAN numbers and MAC addresses.",
   "Students will be able to assign root, designated and alternate roles to ports in a small topology using path cost and tiebreakers.",
   "Students will be able to name the RSTP port states and explain why RSTP converges faster than classic STP.",
   "Students will be able to configure PortFast and BPDU guard on edge ports and predict BPDU guard's reaction."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and draw a three-switch triangle to illustrate the loop."
   ],
   [
    13,
    "Teach",
    "Explain the bridge ID and extended system ID, then work the election on the triangle. Assign root ports with costs, then designated ports, then the alternate port. Summarize the three RSTP states, PortFast and BPDU guard, and project a show spanning-tree vlan output."
   ],
   [
    17,
    "Activity",
    "Run 'Elect the Root' with printed topology cards as described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect design choices to real outages."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Three switches are connected in a triangle for redundancy. A PC sends one broadcast. What happens to that broadcast if nothing stops it?",
  "activity": {
   "title": "Elect the Root",
   "materials": "Printed topology cards (four switches, link speeds, priorities and MAC addresses), whiteboard, colored markers or sticky notes in three colors for root, designated and alternate.",
   "steps": [
    "In pairs, students receive a four-switch topology card and identify the root bridge for VLAN 10, writing each switch's full bridge priority including the VLAN number.",
    "Pairs label every non-root switch's root port, showing their cost arithmetic on the card.",
    "Pairs label the designated port on each link and mark the remaining ports as alternate, using colored sticky notes.",
    "The teacher announces 'Core2 is configured with spanning-tree vlan 10 root primary'; pairs redo the election and note which ports changed role.",
    "Finally, pairs write the interface commands to protect a user port with PortFast and BPDU guard and state what happens if a switch is plugged in there."
   ]
  },
  "discussion": [
   "Why is it risky to let spanning tree choose the root bridge on its own?",
   "What is the benefit of making different core switches root for different VLANs?"
  ],
  "exit": [
   [
    "Switch X has priority 28682 in VLAN 10; switch Y has 32778 with a lower MAC. Which is root?",
    "Switch X, because its priority is lower; MAC only breaks ties."
   ],
   [
    "What are the three RSTP port states?",
    "Discarding, learning and forwarding."
   ],
   [
    "What does BPDU guard do when a BPDU arrives on a protected port?",
    "It err-disables the port."
   ]
  ],
  "differentiation": [
   "Support: Provide a step card listing the election order (root bridge, root ports, designated ports, alternate ports) and a cost table for common link speeds, and start with a three-switch topology.",
   "Extend: Ask fast finishers to explain what happens to the topology, step by step, when the root port on one access switch fails, and why RSTP's alternate port makes recovery fast."
  ]
 },
 {
  "t": "Inter-VLAN routing: router-on-a-stick subinterfaces and multilayer switch SVIs",
  "objectives": [
   "Students will be able to explain why hosts in different VLANs need a Layer 3 device and what a default gateway does.",
   "Students will be able to configure router-on-a-stick subinterfaces with encapsulation dot1Q, including the native VLAN.",
   "Students will be able to configure SVIs and ip routing on a multilayer switch and state the conditions for an SVI to be up/up.",
   "Students will be able to compare router-on-a-stick and SVIs for performance, scale and failure risk."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and sketch two VLANs on one switch."
   ],
   [
    13,
    "Teach",
    "Draw the router-on-a-stick topology and trace a packet up the trunk tagged 10 and back down tagged 20. Project the subinterface configuration. Then draw a Layer 3 switch with SVIs, covering ip routing and the up/up conditions. Finish with a comparison table."
   ],
   [
    17,
    "Activity",
    "Run 'Find the Broken Gateway' with printed configuration excerpts as described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare designs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Two PCs are plugged into the same switch, one in VLAN 10 and one in VLAN 20. Why can't they ping each other, and what would have to be added?",
  "activity": {
   "title": "Find the Broken Gateway",
   "materials": "Printed configuration excerpts and show outputs for four scenarios (router running config, switch trunk output, Layer 3 switch config, show ip interface brief), whiteboard, sticky notes, a projector.",
   "steps": [
    "In pairs, students receive four scenarios: a subinterface with the wrong dot1Q tag, a switch port to the router left in access mode, an SVI down/down because its VLAN does not exist, and SVIs up/up with ip routing missing.",
    "For each scenario, pairs write the user-visible symptom and identify the faulty line or missing command.",
    "Pairs write the corrective commands on sticky notes and attach them to the printed scenario.",
    "Pairs then design, on paper, the configuration for a new branch with VLANs 10, 20 and 30 using router-on-a-stick, including a native VLAN subinterface.",
    "The teacher reviews one scenario per pair on the projector and asks the class to vote on whether the fix is complete."
   ]
  },
  "discussion": [
   "At what point would you recommend moving from router-on-a-stick to SVIs on a multilayer switch, and why?",
   "What single failure would take down all inter-VLAN routing in each design?"
  ],
  "exit": [
   [
    "Which command assigns VLAN 20 to router subinterface g0/0.20?",
    "encapsulation dot1Q 20."
   ],
   [
    "SVIs for VLANs 10 and 20 are up/up, but hosts cannot reach the other VLAN. Which command is likely missing?",
    "ip routing, in global configuration."
   ],
   [
    "Give one disadvantage of router-on-a-stick compared with SVIs.",
    "All inter-VLAN traffic shares one trunk link, creating a bottleneck, and the router is a single point of failure."
   ]
  ],
  "differentiation": [
   "Support: Provide a fill-in-the-blank configuration template for router-on-a-stick and an up/up checklist for SVIs, and pair struggling students with a partner for the first scenario.",
   "Extend: Ask fast finishers to explain what show ip route would display on a working router-on-a-stick router with three VLANs, including the connected and local routes."
  ]
 },
 {
  "t": "Wireless architectures and AP modes: autonomous, lightweight (CAPWAP), cloud-managed",
  "objectives": [
   "Students will be able to compare autonomous, lightweight and cloud-managed wireless architectures by where management and client traffic live.",
   "Students will be able to describe the split-MAC division of functions and the CAPWAP control and data tunnels and their UDP ports.",
   "Students will be able to match lightweight AP modes, including local, FlexConnect, monitor and sniffer, to business requirements.",
   "Students will be able to choose the correct switch-port type for autonomous APs, local-mode lightweight APs and WLCs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers in three columns without naming them yet."
   ],
   [
    13,
    "Teach",
    "Draw the three architectures side by side on the whiteboard, tracing where configuration lives and where client traffic flows. Label the CAPWAP tunnels with ports 5246 and 5247. Present the AP modes as a short table on the projector."
   ],
   [
    17,
    "Activity",
    "Run 'Pick the Architecture' with printed scenario cards as described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "You must manage Wi-Fi in one small office, then in a 300-AP campus, then in 150 small shops across the country. Would you manage all three the same way? Why or why not?",
  "activity": {
   "title": "Pick the Architecture",
   "materials": "Printed scenario cards (eight business requirements), printed cards naming architectures and AP modes, whiteboard, sticky notes.",
   "steps": [
    "In groups of three, students receive eight scenario cards, such as 'two APs in a dentist office', 'campus with roaming', 'branches with unreliable WAN', 'security wants a dedicated scanner', 'retail chain with no IT staff on site'.",
    "Groups match each scenario to an architecture card and, where relevant, an AP mode card.",
    "For each match, groups write on a sticky note the switch-port type each AP needs (access or trunk) and where client traffic flows.",
    "Groups draw the CAPWAP tunnels for the campus scenario and label which is control, which is data, and the UDP port for each.",
    "Groups present one match each to the class, and the teacher corrects any trunk-versus-access errors."
   ]
  },
  "discussion": [
   "What does an organization gain and give up by moving wireless management to a cloud dashboard?",
   "Why might a security team want a few APs in monitor mode even though those APs serve no users?"
  ],
  "exit": [
   [
    "Which CAPWAP tunnel uses UDP 5246, and is it encrypted?",
    "The control tunnel; it is encrypted with DTLS."
   ],
   [
    "Which AP mode keeps branch clients working if the WAN link to the WLC fails?",
    "FlexConnect."
   ],
   [
    "What switch-port type does a local-mode lightweight AP typically need, and why?",
    "An access port, because client traffic is tunneled to the WLC in CAPWAP."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-column comparison sheet (configuration location, client traffic path, port type) to fill in during the teach segment and use during the activity.",
   "Extend: Ask fast finishers to explain the ways a lightweight AP can discover its controller, and what they would check if new APs at one site never join the WLC."
  ]
 },
 {
  "t": "Troubleshoot VLAN, trunk, EtherChannel and spanning tree problems from show command output",
  "objectives": [
   "Students will be able to apply a bottom-up troubleshooting order from interface status through VLANs, trunks, EtherChannel and spanning tree.",
   "Students will be able to select the show command that reveals a given Layer 2 symptom.",
   "Students will be able to interpret key values in show interfaces trunk, show etherchannel summary and show spanning-tree output to identify a fault.",
   "Students will be able to propose a correct fix, including where the fix must be applied."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and write students' first-command choices on the whiteboard."
   ],
   [
    10,
    "Teach",
    "Present the bottom-up order with one command per layer on the projector. For each command, show a short output excerpt and circle the telltale value: err-disabled, a missing VLAN, the four trunk sections, the s flag, BKN and a wrong root."
   ],
   [
    20,
    "Activity",
    "Run the 'Pager Duty' pair troubleshooting rounds described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reflect on method."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A user says 'the network is down.' You can run only one command on their access switch. Which one would you choose first, and what are you hoping to learn?",
  "activity": {
   "title": "Pager Duty",
   "materials": "Printed ticket cards with a symptom on the front and a sealed envelope of show command outputs (one output per command, labeled), a printed command menu, whiteboard, a timer on the projector.",
   "steps": [
    "Pairs receive a ticket card describing a symptom, such as 'VLAN 30 hosts on SW2 cannot reach the gateway' or 'one uplink idle in a bundle'.",
    "Pairs choose one command at a time from the menu and ask the teacher for that output card; each card requested costs one 'minute' on a shared scoreboard.",
    "Pairs record which value in each output ruled the layer in or out, working bottom-up.",
    "Once they identify the fault, pairs write the corrective command and where it must be applied (for example, on the port-channel interface, not a member).",
    "Rotate tickets every five minutes for three rounds; finish with the class comparing which pairs found faults with the fewest commands and why."
   ]
  },
  "discussion": [
   "Why does a bottom-up order usually find faults faster than starting with the most complex feature?",
   "When would it make sense to skip straight to a higher layer, and what clue would justify that?"
  ],
  "exit": [
   [
    "Which command shows whether a VLAN is allowed, active and forwarding on a trunk?",
    "show interfaces trunk."
   ],
   [
    "A member in show etherchannel summary is flagged s. What does that mean?",
    "It is suspended because its settings do not match the bundle."
   ],
   [
    "Log messages show a MAC address flapping between two uplinks and CPU is high. What is the likely problem?",
    "A Layer 2 loop, for example because spanning tree was disabled or a device is bridging two ports."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a symptom-to-command reference card and let them start with single-fault tickets that need only one command to diagnose.",
   "Extend: Give fast finishers a ticket with two faults at different layers (for example, a missing VLAN plus a suspended member) and ask them to explain why fixing only the higher one would not restore service."
  ]
 },
 {
  "t": "Routing table components: protocol code, prefix and mask, next hop, administrative distance, metric, gateway of last resort",
  "objectives": [
   "Students will be able to identify each field of a `show ip route` entry: protocol code, prefix and mask, administrative distance, metric, next hop, age and outgoing interface.",
   "Students will be able to explain the difference between administrative distance and metric and state the common Cisco default AD values.",
   "Students will be able to interpret the gateway of last resort line and predict what happens to packets with no matching route.",
   "Students will be able to distinguish connected (C) and local (L) routes and explain why L routes are /32."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a single routing table line with no explanation and ask students to guess what each piece means. Record guesses on the whiteboard without correcting them yet."
   ],
   [
    12,
    "Teach",
    "Walk left to right through the line: code, prefix, [AD/metric], next hop, age, interface. Show the legend, list the default AD values, explain C versus L routes and read the gateway of last resort line. Return to the warm-up guesses and correct them together."
   ],
   [
    18,
    "Activity",
    "Run the 'Route Line Autopsy' card activity in pairs (see activity). Circulate and ask each pair to justify one answer aloud."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect AD and metric to real design choices, such as why a static route might hide an OSPF route."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Here is one line from a real router: `O 10.1.3.0/24 [110/3] via 10.0.12.2, 00:05:12, GigabitEthernet0/1`. Without looking anything up, what do you think each of the six pieces tells the router?",
  "activity": {
   "title": "Route Line Autopsy",
   "materials": "Printed cards, each showing a short `show ip route` output (5 to 7 lines including a gateway of last resort line), one question sheet per pair, highlighters, whiteboard.",
   "steps": [
    "Give each pair two different routing table cards and a question sheet.",
    "For each card, pairs highlight and label the code, prefix, AD, metric, next hop and interface on three chosen lines.",
    "Pairs answer: which route would be used for a destination the teacher writes on the board, what happens to a destination that matches nothing, and which line is a heading rather than a route.",
    "Pairs swap cards with a neighboring pair and check each other's labels, marking any disagreements.",
    "The teacher resolves disagreements at the board, focusing on swapped AD and metric values and L versus C routes."
   ]
  },
  "discussion": [
   "Why do you think Cisco trusts a static route (AD 1) more than any dynamic protocol by default, and when might that trust be a problem?",
   "If metrics from different protocols cannot be compared, what would go wrong on a router without administrative distance?"
  ],
  "exit": [
   [
    "In [90/3072], what are 90 and 3072?",
    "90 is the administrative distance (EIGRP) and 3072 is the EIGRP metric."
   ],
   [
    "What does 'Gateway of last resort is not set' mean for traffic to an unknown destination?",
    "There is no default route, so packets with no matching route are dropped."
   ],
   [
    "Why is the L route for 192.168.1.1 shown as /32 when the interface is /24?",
    "The L route represents only the router's own address so it recognizes packets sent to itself; the C route carries the /24 subnet."
   ]
  ],
  "differentiation": [
   "Support: Provide a color-coded reference card that maps each field position to its name, and start struggling students on a three-line table with only C, L and S routes before adding OSPF entries.",
   "Extend: Give fast finishers an IPv6 `show ipv6 route` output with link-local next hops and an O E2 default route, and ask them to explain each field and how it differs from IPv4."
  ]
 },
 {
  "t": "Forwarding decisions: longest prefix match first, then administrative distance, then metric",
  "objectives": [
   "Students will be able to apply longest prefix match to choose the route used for a given destination from a routing table.",
   "Students will be able to explain when administrative distance and when metric are used, and why neither overrides longest prefix match.",
   "Students will be able to calculate whether a destination falls within a prefix using block size.",
   "Students will be able to describe equal-cost multipath and floating static behavior."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take a quick hand vote between the static /8 and the OSPF /24. Leave the vote on the board."
   ],
   [
    12,
    "Teach",
    "Separate the two moments: building the table (AD, then metric, only for identical prefixes) and forwarding each packet (longest prefix match). Demonstrate block-size math on the board with a /22 and a /13. Revisit the vote."
   ],
   [
    18,
    "Activity",
    "Run 'Packet Sorting Relay' in teams (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions, linking longest match to summarization and backup designs."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on paper."
   ]
  ],
  "warmup": "A router has a static route to 10.0.0.0/8 with AD 1 and an OSPF route to 10.1.1.0/24 with AD 110. A packet arrives for 10.1.1.50. Which route does it use, and why do you think so?",
  "activity": {
   "title": "Packet Sorting Relay",
   "materials": "Whiteboard divided into columns, one per route in a projected routing table; printed 'packet' cards each with a destination IP; tape or magnets.",
   "steps": [
    "Project a routing table with five routes of different lengths, including a default route and two overlapping OSPF prefixes.",
    "Split the class into teams and give each team a stack of packet cards.",
    "One student at a time takes a card, works out the matching route with the team's help, and tapes it under the correct column, writing the block-size reasoning on the card.",
    "After all cards are placed, the teacher reveals the answers; teams score a point per correct placement and lose one for any card placed on a route that does not contain the destination.",
    "Finish by adding a second source for one identical prefix and asking teams which is installed, to contrast AD with longest match."
   ]
  },
  "discussion": [
   "How does longest prefix match let a summary route and specific routes work together as a backup design?",
   "Why might an exam writer include a route with a very low AD but a short prefix in the answer choices?"
  ],
  "exit": [
   [
    "Routes exist for 192.168.0.0/16 and 192.168.4.0/22. Which is used for 192.168.6.9?",
    "192.168.4.0/22, because it covers 192.168.4.0 to 192.168.7.255 and is longer than /16."
   ],
   [
    "When does administrative distance decide between two routes?",
    "Only when the identical prefix and mask are learned from different sources."
   ],
   [
    "What happens when OSPF finds two equal-cost paths to the same prefix?",
    "Both are installed and traffic is load-shared using equal-cost multipath, up to the maximum-paths limit."
   ]
  ],
  "differentiation": [
   "Support: Give students a printed block-size chart for each mask value (128, 192, 224, 240, 248, 252, 254, 255) and start them with /8, /16 and /24 routes only before introducing non-octet boundaries.",
   "Extend: Ask fast finishers to design a routing table where a summary route provides automatic failover for a specific /24, and explain step by step what happens to traffic when the /24 is withdrawn."
  ]
 },
 {
  "t": "IPv4 and IPv6 static routing: default, network, host and floating static routes",
  "objectives": [
   "Students will be able to configure IPv4 and IPv6 network, host and default static routes with correct syntax.",
   "Students will be able to explain how a floating static route uses administrative distance to act as a backup.",
   "Students will be able to explain why a link-local IPv6 next hop requires an exit interface.",
   "Students will be able to troubleshoot common static routing faults, including missing return routes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the two equal default routes and collect ideas."
   ],
   [
    12,
    "Teach",
    "Show the syntax for each route type in IPv4 and IPv6 on the projector, contrasting mask versus prefix length. Explain recursive lookup, fully specified routes and floating statics with AD. Emphasize the return path."
   ],
   [
    18,
    "Activity",
    "Run 'Static Route Surgery' in pairs (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss when static routing is the right tool and when it becomes a liability."
   ],
   [
    5,
    "Exit ticket",
    "Students write the three exit answers."
   ]
  ],
  "warmup": "A branch router has two default routes to two different providers, both with the same administrative distance. What do you think the router does, and how could you make one of them a backup only?",
  "activity": {
   "title": "Static Route Surgery",
   "materials": "Printed handout with a three-router topology diagram (addresses included) and six static route commands, some with deliberate errors; student laptops with a browser for an optional free online IPv6 subnet reference; whiteboard.",
   "steps": [
    "Pairs review six provided static route lines against the topology and mark each as correct or broken.",
    "For each broken line, pairs write the corrected command and name the error type (mask notation, wrong next hop, missing interface on link-local, floating AD too low, missing return route).",
    "Pairs then write the commands needed to give a branch router a primary default via one ISP and a floating default via a second ISP, in both IPv4 and IPv6.",
    "Two pairs compare answers and agree on a final version.",
    "The teacher reviews the most common errors at the board and shows the expected `show ip route` output before and after a primary link failure."
   ]
  },
  "discussion": [
   "At what size or rate of change does a network outgrow static routing, and what signs would tell you?",
   "Why might a next-hop-only static route over Ethernet stay installed even after the next-hop router has failed, and how could that hurt failover?"
  ],
  "exit": [
   [
    "Write an IPv6 default route to next hop fe80::1 out g0/0.",
    "ipv6 route ::/0 g0/0 fe80::1"
   ],
   [
    "A static route is the primary path with AD 1. What AD makes a second static route a working backup?",
    "Any AD greater than 1, such as 5 or 250."
   ],
   [
    "Ping from R1 to a remote LAN fails, though R1 has a correct static route. What else should you check?",
    "Whether the remote router has a return route to R1's source network."
   ]
  ],
  "differentiation": [
   "Support: Provide a syntax template card with blanks (destination, mask or prefix, next hop or interface, distance) and have students fill it in for each route type before writing full commands.",
   "Extend: Challenge fast finishers to explain how IP SLA object tracking could make a next-hop static route fail over when the next hop stops responding, describing the behavior without needing full syntax."
  ]
 },
 {
  "t": "Single-area OSPFv2: neighbors and adjacencies, point-to-point vs broadcast networks, DR/BDR election",
  "objectives": [
   "Students will be able to list the OSPF neighbor states in order and identify which state represents a full adjacency.",
   "Students will be able to compare point-to-point and broadcast network types and explain why a DR and BDR are elected on broadcast segments.",
   "Students will be able to predict the DR and BDR from priorities and router IDs, including the effects of priority 0 and non-preemption.",
   "Students will be able to interpret `show ip ospf neighbor` output, including FULL/DR, FULL/BDR, FULL/- and 2WAY/DROTHER."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up output on the projector and ask students to vote: is something broken? Record the vote."
   ],
   [
    12,
    "Teach",
    "Explain hellos, the hello parameters that must match, and the neighbor states. Contrast point-to-point and broadcast. Walk through the DR/BDR election rules, multicast addresses 224.0.0.5 and 224.0.0.6, and non-preemption."
   ],
   [
    18,
    "Activity",
    "Run the 'Human DR Election' role-play (see activity)."
   ],
   [
    5,
    "Discuss",
    "Revisit the warm-up vote and discuss the questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "On R4, `show ip ospf neighbor` shows R1 FULL/DR, R2 FULL/BDR and R3 2WAY/DROTHER. Is anything wrong? Explain your reasoning.",
  "activity": {
   "title": "Human DR Election",
   "materials": "Index cards with a priority and router ID written on each (include some priority 0 cards), lanyards or sticky-note name tags, whiteboard for tallying states.",
   "steps": [
    "Give six students a router card and tell them they share one Ethernet 'segment' at the front of the room.",
    "Round 1: all routers 'boot' together. The class applies the rules (highest priority, then highest router ID, priority 0 ineligible) to choose DR and BDR; the rest are DROTHERs.",
    "Students connect with string or by pointing to show full adjacencies (everyone to DR and BDR) and 2-Way relationships (DROTHER to DROTHER); a recorder writes the expected `show ip ospf neighbor` lines for one router on the board.",
    "Round 2: a new student with priority 255 'joins'. Ask the class whether the DR changes, then confirm non-preemption.",
    "Round 3: the DR 'fails' and sits down. The class promotes the BDR and elects a new BDR, then updates the board output."
   ]
  },
  "discussion": [
   "Why do you think OSPF designers made the DR election non-preemptive, and what would go wrong if every new router could take over?",
   "When would you deliberately set an interface's priority to 0?"
  ],
  "exit": [
   [
    "What is the default OSPF network type on an Ethernet interface, and what does it trigger?",
    "Broadcast, which triggers a DR and BDR election."
   ],
   [
    "Router A has priority 50 and RID 1.1.1.1; Router B has priority 10 and RID 9.9.9.9. Which is DR if they start together?",
    "Router A, because priority is compared before router ID."
   ],
   [
    "Which neighbor state indicates a completed adjacency with synchronized databases?",
    "Full."
   ]
  ],
  "differentiation": [
   "Support: Provide a flowchart card for the DR election (priority 0 out, highest priority, then highest RID) and a labeled diagram of the neighbor states for students to trace during the role-play.",
   "Extend: Ask fast finishers to calculate how many full adjacencies would exist on a 10-router segment with and without a DR and BDR, and explain how the type 2 network LSA represents the segment."
  ]
 },
 {
  "t": "OSPF router ID selection and configuration (network statements vs interface commands, passive interfaces)",
  "objectives": [
   "Students will be able to determine an OSPF router ID from a configuration using the manual, loopback, physical order.",
   "Students will be able to write network statements with wildcard masks and the equivalent `ip ospf <process> area <area>` interface commands.",
   "Students will be able to explain what a passive interface does and when to use it.",
   "Students will be able to troubleshoot a duplicate router ID and apply a router ID change correctly."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question with a projected interface list and ask students to write their RID guess."
   ],
   [
    12,
    "Teach",
    "Explain RID purpose and selection order, demonstrate a router ID change and the need for a process reset. Show network statements with wildcards versus interface commands, then passive interfaces and `passive-interface default`."
   ],
   [
    18,
    "Activity",
    "Run 'Config Detective' in pairs (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions about RID stability and passive interfaces as a security control."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A router has no `router-id` command, loopback 0 at 10.255.0.3, Gi0/0 at 192.168.1.1 and Gi0/1 at 10.0.0.1. What router ID will OSPF choose, and why?",
  "activity": {
   "title": "Config Detective",
   "materials": "Printed configuration excerpts for four routers (with `show ip interface brief` output beside each), a question sheet, highlighters, whiteboard.",
   "steps": [
    "Pairs receive four router configuration cards; one card has a duplicate router-id, one has a network statement with a subnet mask instead of a wildcard, one has a router-facing interface made passive, and one is correct.",
    "For each card, pairs determine the router ID and list which interfaces run OSPF and in which area.",
    "Pairs identify the fault on each broken card and predict the symptom (no neighbor, duplicate RID log message, missing subnet, or hellos on a user LAN).",
    "Pairs rewrite each broken section with the corrected commands, including any `clear ip ospf process` needed.",
    "Selected pairs present one card at the board while others check their answers."
   ]
  },
  "discussion": [
   "Why is a loopback-based or manually set router ID considered better practice than letting OSPF pick a physical interface address?",
   "Should every user-facing LAN interface be passive? What could go wrong if you used `passive-interface default` without thinking it through?"
  ],
  "exit": [
   [
    "What is the RID selection order on IOS when no router-id is configured, and when one is?",
    "Manual router-id first; otherwise the highest up loopback address; otherwise the highest up physical interface address."
   ],
   [
    "Write a network statement that enables OSPF area 0 only on the interface with address 10.1.1.1.",
    "network 10.1.1.1 0.0.0.0 area 0"
   ],
   [
    "Does a passive interface's subnet still appear in neighbors' routing tables?",
    "Yes. Passive stops hellos and neighbors on that interface, but its connected subnet is still advertised."
   ]
  ],
  "differentiation": [
   "Support: Provide a wildcard mask conversion table (subtract each subnet mask octet from 255) and a three-step RID decision card to use during the activity.",
   "Extend: Ask fast finishers to rewrite one router's network-statement configuration using only interface-level `ip ospf` commands and `passive-interface default`, and to explain how a loopback is advertised with and without `ip ospf network point-to-point`."
  ]
 },
 {
  "t": "OSPF cost and reference bandwidth",
  "objectives": [
   "Students will be able to calculate OSPF interface cost from interface bandwidth and reference bandwidth.",
   "Students will be able to calculate the total cost of a path by summing outgoing interface costs and predict the path OSPF chooses.",
   "Students will be able to explain why the default reference bandwidth is a problem for links of 100 Mbps and faster and how `auto-cost reference-bandwidth` fixes it.",
   "Students will be able to compare `ip ospf cost` and the `bandwidth` command as tuning tools."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let students do the division on paper."
   ],
   [
    12,
    "Teach",
    "Show the cost formula with the default 100 Mbps reference, the minimum cost of 1 and the serial 64 example. Demonstrate raising the reference and recalculating. Contrast `ip ospf cost` and `bandwidth`, and show outgoing-only addition on a three-router diagram."
   ],
   [
    18,
    "Activity",
    "Run 'Cost Map Challenge' in small groups (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions on consistency and asymmetric paths."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the exit questions."
   ]
  ],
  "warmup": "With OSPF's default reference bandwidth of 100 Mbps, what cost do a 10 Mbps, a 100 Mbps and a 10 Gbps interface get? What problem do you notice?",
  "activity": {
   "title": "Cost Map Challenge",
   "materials": "Whiteboard or large paper with a five-router topology showing link speeds on each interface; sticky notes for cost values; calculators or student laptops with a browser calculator.",
   "steps": [
    "Groups calculate every interface cost using the default reference and write each on a sticky note next to that interface.",
    "Groups find the lowest-cost path from R1 to a LAN behind R5 and note any equal-cost ties.",
    "The teacher announces that `auto-cost reference-bandwidth 10000` is applied on every router; groups recalculate all costs and the best path.",
    "The teacher then sets `ip ospf cost 500` on one interface; groups determine whether the path changes in each direction.",
    "Each group reports the metric R1 would show in `[110/x]` form for the final scenario, and the class compares answers."
   ]
  },
  "discussion": [
   "What would you consider when choosing a reference bandwidth value for a network that may add faster links in future?",
   "When might you want traffic to take a different path in each direction, and when would that asymmetry cause problems?"
  ],
  "exit": [
   [
    "With `auto-cost reference-bandwidth 10000`, what is the cost of a 100 Mbps interface?",
    "100, because 10,000 divided by 100 is 100."
   ],
   [
    "A path crosses outgoing interfaces with costs 10, 10 and 1. What is the route's metric?",
    "21, the sum of the outgoing interface costs."
   ],
   [
    "Which command changes OSPF cost on one interface without changing the bandwidth value other protocols use?",
    "`ip ospf cost <value>`."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a cost lookup table for common speeds under the default and a 10,000 reference, and a template with blanks for adding costs hop by hop.",
   "Extend: Ask fast finishers to design costs so that traffic from R1 to R5 uses one path and return traffic uses another, then explain how they would verify the result with `show ip route` and traceroute."
  ]
 },
 {
  "t": "OSPF adjacency requirements: area, subnet, hello/dead timers, MTU, authentication, unique router ID",
  "objectives": [
   "Students will be able to list the parameters that must match in OSPF hello packets for routers to become neighbors.",
   "Students will be able to explain why an MTU mismatch leaves neighbors in ExStart or Exchange rather than preventing them from appearing.",
   "Students will be able to identify which differences do not block adjacency, such as process ID.",
   "Students will be able to diagnose an adjacency failure by comparing `show ip ospf interface` output from both ends."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students the warm-up question and list their suggested checks on the board."
   ],
   [
    12,
    "Teach",
    "Teach the hello-stage requirements (area, subnet and mask, timers, authentication, stub flag), unique router IDs, the later MTU check, and other blockers such as passive interfaces and ACLs. Emphasize what does not need to match."
   ],
   [
    18,
    "Activity",
    "Run 'Spot the Mismatch' paired troubleshooting (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions and revisit the warm-up list, crossing out checks that would not help."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the exit questions."
   ]
  ],
  "warmup": "Two OSPF routers on the same cable can ping each other, but neither lists the other as a neighbor. What would you check first, and why?",
  "activity": {
   "title": "Spot the Mismatch",
   "materials": "Printed pairs of `show ip ospf interface` and `show interfaces` outputs for six router pairs (each pair has one fault or none), a symptom card for each pair, answer sheets, whiteboard.",
   "steps": [
    "Each pair of students receives three router-pair cards with matching symptom cards (for example 'no neighbor' or 'stuck in EXSTART').",
    "Students compare the two outputs line by line and circle any parameter that differs.",
    "For each card, students state whether the difference blocks adjacency, at which stage, and what neighbor state they would expect to see.",
    "Students write the configuration change that fixes each fault, and note any differences that are harmless, such as process ID.",
    "Pairs swap cards with another pair to check, then the teacher reveals answers and highlights the harmless-difference distractors."
   ]
  },
  "discussion": [
   "Why do you think OSPF refuses to form an adjacency over a timer mismatch instead of just adapting to the other router's timers?",
   "Why is using `ip ospf mtu-ignore` considered hiding a problem rather than fixing it?"
  ],
  "exit": [
   [
    "Name four parameters that must match in OSPF hellos.",
    "Any four of: area ID, subnet and mask, hello interval, dead interval, authentication, stub area flag."
   ],
   [
    "Neighbors are stuck in ExStart. What is the most likely cause?",
    "An MTU mismatch between the two interfaces."
   ],
   [
    "R1 runs `router ospf 1` and R2 runs `router ospf 99`. Does this prevent adjacency?",
    "No. Process IDs are locally significant and do not need to match."
   ]
  ],
  "differentiation": [
   "Support: Provide a checklist card in order (OSPF enabled, not passive, area, subnet and mask, timers, authentication, unique RID, then MTU) and let students tick items while comparing outputs.",
   "Extend: Ask fast finishers to explain what happens when one side is network type broadcast and the other point-to-point, why the adjacency might still reach Full, and why routes might not install correctly."
  ]
 },
 {
  "t": "First hop redundancy: HSRP and VRRP virtual IP, priority, preemption",
  "objectives": [
   "Students will be able to explain why hosts need a first hop redundancy protocol and how a virtual IP and virtual MAC provide gateway failover.",
   "Students will be able to compare HSRP and VRRP, including standard versus proprietary, role names, default priority and default preemption.",
   "Students will be able to predict which router is active or master given priorities, IP addresses and preemption settings.",
   "Students will be able to identify HSRP and VRRP virtual MAC formats and read `show standby brief` output."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let students suggest why a second router did not help."
   ],
   [
    12,
    "Teach",
    "Explain the single-gateway problem, virtual IP and MAC, HSRP roles and defaults, preemption, VRRP roles and defaults, address owner priority 255, MAC formats and GLBP in one sentence. Show a `show standby brief` example."
   ],
   [
    18,
    "Activity",
    "Run the 'Gateway Failover Role-Play' (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions on preemption and object tracking."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "A department has two routers on its VLAN, but when one rebooted, every PC lost internet access. Why might the second router not have helped?",
  "activity": {
   "title": "Gateway Failover Role-Play",
   "materials": "Two signs reading 'R1' and 'R2', one sign reading 'Virtual IP 192.168.10.1' that can be passed between them, printed scenario cards listing priorities and preempt settings, whiteboard.",
   "steps": [
    "Two students play R1 and R2; several students play hosts who can only 'send traffic' to whoever holds the virtual IP sign.",
    "For each scenario card, the class decides which router is active or master based on protocol, priorities, IP addresses and preempt, and that student holds the sign.",
    "The teacher announces events such as 'R1 fails', 'R1 returns' and 'R1 uplink fails with tracking'; the class decides whether the sign moves and why.",
    "A recorder writes the expected `show standby brief` state for each router after each event on the board.",
    "Repeat with VRRP rules, including an address-owner card with priority 255, and compare how the outcomes differ."
   ]
  },
  "discussion": [
   "What are the trade-offs of enabling preemption, considering that each preemption causes a brief switchover?",
   "Why can an FHRP fail to help when the active router's WAN link goes down but its LAN interface stays up, and how does object tracking address this?"
  ],
  "exit": [
   [
    "Is HSRP preemption enabled by default? Is VRRP's?",
    "HSRP preemption is disabled by default; VRRP preemption is enabled by default."
   ],
   [
    "What is the default priority in both HSRP and VRRP, and does higher or lower win?",
    "100, and the higher priority wins."
   ],
   [
    "Which protocol and group does the virtual MAC 0000.0c07.ac0a represent?",
    "HSRP version 1, group 10 (0a in hexadecimal)."
   ]
  ],
  "differentiation": [
   "Support: Give students a side-by-side comparison card for HSRP and VRRP (roles, standard, preempt default, MAC format) to use during the role-play, and walk through hex conversion for group numbers 1 to 15.",
   "Extend: Ask fast finishers to design a two-group HSRP setup that shares load between two routers on one VLAN, including which hosts get which gateway and how preemption and tracking should be configured."
  ]
 },
 {
  "t": "Troubleshoot IP connectivity with ping, extended ping and traceroute",
  "objectives": [
   "Students will be able to interpret IOS ping output symbols, including `!`, `.`, `U` and `M`, and explain what each proves.",
   "Students will be able to use extended ping options, especially source interface, repeat count, size and DF bit, to test specific conditions.",
   "Students will be able to explain how traceroute discovers each hop using TTL and ICMP time exceeded, and interpret asterisks and loops.",
   "Students will be able to apply a methodical ping and traceroute process to locate a connectivity fault, including a missing return route."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about a router ping succeeding while users fail."
   ],
   [
    12,
    "Teach",
    "Show ping symbols with sample output, explain . versus U and the ARP-delay first timeout. Demonstrate extended ping syntax and why sourcing from the LAN matters. Explain traceroute TTL mechanics, asterisks and loop patterns."
   ],
   [
    18,
    "Activity",
    "Run 'Trace the Fault' pair troubleshooting (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions about firewalls and return paths."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the exit questions."
   ]
  ],
  "warmup": "A router can ping a remote server successfully, but the PCs on that router's LAN cannot reach the same server. How can both of these be true?",
  "activity": {
   "title": "Trace the Fault",
   "materials": "Printed topology diagram of four routers with addresses, a set of output cards (standard ping, extended ping, traceroute and `show ip route` excerpts), answer sheets, whiteboard; optional student laptops with a browser to run a free online network simulator if available.",
   "steps": [
    "Each pair receives a trouble ticket and the topology diagram but no outputs.",
    "Pairs decide which test they want to run next (for example 'extended ping from R1 G0/1 to the server') and request the matching output card from the teacher.",
    "Pairs record what each output proves and what it rules out, using ping symbols and traceroute hops.",
    "Pairs continue requesting cards until they can name the faulty router and the exact fix, aiming to use as few cards as possible.",
    "Pairs share their path and card count at the board, and the class compares efficient troubleshooting sequences."
   ]
  },
  "discussion": [
   "If a firewall blocks all ICMP, what can and can't ping and traceroute tell you, and what other evidence would you gather?",
   "Why is a missing return route such a common cause of 'it works from the router' problems?"
  ],
  "exit": [
   [
    "What does `U.U.U` in IOS ping output indicate?",
    "A router along the path is returning ICMP destination unreachable messages, often because it has no route."
   ],
   [
    "What option would you add to a router ping to test whether a remote network can reach your LAN?",
    "Set the source to the LAN interface, for example `ping <dest> source g0/1`."
   ],
   [
    "How does traceroute learn the address of the second hop?",
    "It sends a probe with TTL 2; the second router decrements it to 0, drops it and returns ICMP time exceeded from its address."
   ]
  ],
  "differentiation": [
   "Support: Provide a symbol reference card for ping output and a simple four-step troubleshooting ladder (own interface, gateway, each link, destination) for students to follow during the activity.",
   "Extend: Ask fast finishers to explain how to use extended ping with a large size and the DF bit to find the path MTU, and what the M symbol would indicate in that test."
  ]
 },
 {
  "t": "Troubleshoot OSPF neighbor and route problems from show ip ospf output",
  "objectives": [
   "Students will be able to interpret OSPF neighbor states in `show ip ospf neighbor` and map each problem state to its likely cause.",
   "Students will be able to use `show ip ospf interface`, `show ip protocols` and `show ip ospf database` to locate configuration faults.",
   "Students will be able to explain why a route may be missing even when neighbors are FULL, including advertisement errors and lower administrative distance routes.",
   "Students will be able to apply an ordered troubleshooting method from neighbor state to routing table."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up neighbor output and ask students to label each line as healthy or not."
   ],
   [
    10,
    "Teach",
    "Present the five commands in order and what each reveals, with the state-to-cause map: missing neighbor, INIT, EXSTART/EXCHANGE, FULL but route missing, unexpected path."
   ],
   [
    20,
    "Activity",
    "Run 'OSPF Clinic' small-group case rounds (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions about troubleshooting order and the wrong-router trap."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "`show ip ospf neighbor` on R1 shows: 2.2.2.2 FULL/DR, 3.3.3.3 EXSTART/DROTHER, 4.4.4.4 2WAY/DROTHER. Which of these, if any, is a problem, and what would you check?",
  "activity": {
   "title": "OSPF Clinic",
   "materials": "Printed case folders for five cases, each with a symptom and a stack of show-output cards (neighbor, interface brief, protocols, database, route) for the routers involved; answer sheets; whiteboard.",
   "steps": [
    "Groups of three take roles: reader (reads outputs aloud), analyst (decides what each output proves), and scribe (records the reasoning chain).",
    "Each group opens a case folder and may reveal only one output card at a time, in the order they choose, recording why they chose it.",
    "Once the group names the fault and the router where it lives, the scribe writes the fix as a configuration line.",
    "Groups rotate roles and move to the next case; aim for three cases in the time.",
    "The teacher debriefs at the board, highlighting cases where the fault was on the advertising router rather than the one missing the route."
   ]
  },
  "discussion": [
   "Why is it safer to gather show output before changing configuration during an outage?",
   "How would you explain to a junior colleague why the router missing a route is often not the router with the problem?"
  ],
  "exit": [
   [
    "A neighbor is stuck in INIT. What does that mean?",
    "One-way communication: this router hears the neighbor's hellos but is not listed in them, often due to an ACL blocking OSPF in one direction."
   ],
   [
    "Which command shows OSPF network statements, passive interfaces and the router ID?",
    "`show ip protocols`."
   ],
   [
    "Neighbors are FULL and the prefix's LSA is in the database, but no O route is installed. Name one likely reason.",
    "A route with a lower administrative distance, such as a static route, is installed for the same prefix (or a network type mismatch stops SPF from using the link)."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups a one-page state-to-cause map and a fixed command order to follow, and start them on cases with a single fault in neighbor state.",
   "Extend: Give fast finishers a case with two simultaneous faults (for example an MTU mismatch on one link and a wrong wildcard on another router) and ask them to explain how to prove each fault separately."
  ]
 },
 {
  "t": "AAA for device access: local usernames, TACACS+ and RADIUS clients",
  "objectives": [
   "Students will be able to define authentication, authorization and accounting and give a network-device example of each.",
   "Students will be able to compare TACACS+ and RADIUS by transport, port, encryption scope and typical use.",
   "Students will be able to read an IOS AAA configuration and predict the result of a method list when a server rejects a login or is unreachable.",
   "Students will be able to explain why a local fallback account must exist before `aaa new-model` is entered."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up prompt on the projector and take three or four answers. Steer the class toward the idea that a shared password makes actions untraceable."
   ],
   [
    12,
    "Teach",
    "Walk through the three A's with the hotel analogy, then build a two-column TACACS+ versus RADIUS comparison on the whiteboard with students calling out each property. Finish by projecting the sample configuration and reading the method list aloud line by line."
   ],
   [
    18,
    "Activity",
    "Run the method-list prediction card activity in pairs, then have pairs swap and check each other's answers."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect accounting with audits and incident response."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your team of eight shares one enable password on 60 switches. An auditor asks who changed a VLAN last week. What can you tell her, and what would you need to change so you could answer?",
  "activity": {
   "title": "Method-list prediction cards",
   "materials": "Printed scenario cards (one per pair), the sample AAA configuration projected or printed, whiteboard and markers.",
   "steps": [
    "Give each pair a set of six cards. Each card describes a login attempt: for example, the TACACS+ server is up and the password is correct; the server is up and rejects the password; both servers are unreachable and the local password is correct.",
    "Pairs predict, for the method list `group tacacs+ local`, whether the login succeeds and which source answered, and write the reasoning on the card.",
    "Add two cards about authorization: a junior technician tries `show running-config` and then `configure terminal`. Pairs decide which AAA function and which protocol feature controls the outcome.",
    "Pairs swap cards with a neighbor pair and mark any disagreements; the teacher resolves disagreements at the whiteboard, emphasizing that a rejection does not fall back to local."
   ]
  },
  "discussion": [
   "Why might an organization keep one emergency local account even after moving every engineer to TACACS+, and how should that account be protected?",
   "Accounting records what happened but does not prevent it. When is that still valuable to a security team?"
  ],
  "exit": [
   [
    "Which protocol uses TCP port 49 and encrypts the whole packet body?",
    "TACACS+."
   ],
   [
    "With `aaa authentication login default group tacacs+ local`, what happens if the server rejects the password?",
    "The login fails; local is used only if the servers do not respond."
   ],
   [
    "Which AAA function controls whether a user may run `configure terminal`?",
    "Authorization."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a filled-in comparison table with three properties blanked out, and let them use the hotel analogy card during the prediction activity.",
   "Extend: Ask fast finishers to write a named method list for the console line that uses only local authentication, and explain how it would be applied with `login authentication`."
  ]
 },
 {
  "t": "Secure management access: SSH version 2, enable secret, VTY access-class, login banners",
  "objectives": [
   "Students will be able to list, in order, the prerequisites for enabling SSH version 2 on a Cisco IOS device.",
   "Students will be able to contrast enable secret, enable password and type 7 passwords.",
   "Students will be able to restrict remote management to a subnet using access-class and transport input ssh.",
   "Students will be able to write an appropriate MOTD banner and identify a poorly worded one."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a short Telnet capture description in which a password is visible, and ask the warm-up question."
   ],
   [
    12,
    "Teach",
    "Build the SSH configuration on the whiteboard in order, using the mnemonic, and explain why each line is needed. Then compare enable secret with enable password and type 7, and access-class with ip access-group."
   ],
   [
    18,
    "Activity",
    "Pairs complete the broken-configuration hunt and then compare findings with another pair."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions on banners and on why console access also needs protection."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If someone on the same network could capture every packet between your laptop and a router, what would they learn from a Telnet session, and what would they learn from an SSH session?",
  "activity": {
   "title": "Broken configuration hunt",
   "materials": "Printed handouts with four short router configurations, each containing one or two management-security faults; whiteboard for the answer key.",
   "steps": [
    "Hand each pair the four configurations. Faults include a missing domain name, `transport input all`, `ip access-group` used on VTY lines, `enable password` without `enable secret`, only `vty 0 4` configured, and a 'Welcome' banner.",
    "Pairs circle each fault, write the symptom an engineer would notice, and write the corrected command.",
    "Pairs join another pair and agree on one combined answer for each configuration.",
    "The teacher collects answers on the whiteboard and confirms the correct order of SSH prerequisites."
   ]
  },
  "discussion": [
   "Why is physical console access still a risk even when remote access is locked down, and what should be configured on the console line?",
   "What legal or practical purpose does a login banner serve, and what wording would you avoid?"
  ],
  "exit": [
   [
    "What must be configured before `crypto key generate rsa` can enable SSH?",
    "A non-default hostname and an IP domain name."
   ],
   [
    "Which command allows only SSH on the VTY lines?",
    "`transport input ssh`."
   ],
   [
    "If both `enable password` and `enable secret` are set, which one applies?",
    "`enable secret`."
   ]
  ],
  "differentiation": [
   "Support: Provide a checklist of the SSH steps in order that students can tick off while reviewing each broken configuration.",
   "Extend: Ask fast finishers to add brute-force protection with `login block-for` and explain what `security passwords min-length` would add."
  ]
 },
 {
  "t": "Standard and extended IPv4 ACLs: wildcard masks, sequence and first match, implicit deny, placement",
  "objectives": [
   "Students will be able to calculate wildcard masks for common prefix lengths and for single hosts.",
   "Students will be able to trace a packet through an ACL using top-down, first-match logic and the implicit deny.",
   "Students will be able to distinguish standard from extended ACLs by match fields and number ranges.",
   "Students will be able to choose correct ACL placement and direction for a given filtering requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up puzzle and let students vote on the outcome before revealing the implicit deny."
   ],
   [
    12,
    "Teach",
    "Teach wildcard subtraction with three quick examples, then first-match processing and the implicit deny. Draw a three-router topology and show why standard ACLs go near the destination and extended near the source."
   ],
   [
    18,
    "Activity",
    "Run the human ACL: students act as packets and an ACL reader decides their fate, followed by a placement challenge on the topology."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about ordering and logging."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "An ACL contains a single line: deny host 10.1.1.5. It is applied inbound on a busy interface. What happens to traffic from 10.1.1.6?",
  "activity": {
   "title": "Human ACL and placement challenge",
   "materials": "Index cards labelled with packet details (source, destination, protocol, port), a printed four-line ACL, whiteboard with a three-router topology.",
   "steps": [
    "Give ten students a packet card each. One student holds the printed ACL and reads entries top to bottom aloud for each packet.",
    "Each packet student stands on the permit or deny side of the room according to the first matching entry; at least two cards should match no entry and fall to the implicit deny.",
    "Reorder two ACL entries and repeat so students see how ordering changes outcomes.",
    "In pairs, students mark on the topology where they would place a standard and an extended ACL for two given requirements, then justify their choices to the class."
   ]
  },
  "discussion": [
   "Why might an engineer add an explicit `deny ip any any log` at the end of an ACL even though the implicit deny already exists?",
   "What risks come with editing an ACL that is already applied to a production interface, and how do sequence numbers help?"
  ],
  "exit": [
   [
    "What is the wildcard mask for a /26?",
    "0.0.0.63."
   ],
   [
    "An ACL matches 10.1.1.0/24 only in a permit statement and nothing else. What happens to traffic from 10.2.2.2?",
    "It is dropped by the implicit deny."
   ],
   [
    "Where should an extended ACL be placed?",
    "As close to the source as possible."
   ]
  ],
  "differentiation": [
   "Support: Provide a table of prefix lengths, masks and wildcards for /24 to /30 and let students use it during the activity.",
   "Extend: Ask fast finishers to write one wildcard entry that matches 172.16.8.0 through 172.16.15.255 and explain why it works."
  ]
 },
 {
  "t": "Layer 2 security: port security (maximum, sticky, violation modes), DHCP snooping, dynamic ARP inspection",
  "objectives": [
   "Students will be able to configure port security with a maximum, sticky learning and a violation mode, and predict the result of a violation in each mode.",
   "Students will be able to explain how DHCP snooping uses trusted and untrusted ports to block rogue DHCP servers.",
   "Students will be able to describe how dynamic ARP inspection depends on the DHCP snooping binding table.",
   "Students will be able to match common Layer 2 attacks to the feature that mitigates them."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and collect guesses about what went wrong."
   ],
   [
    12,
    "Teach",
    "Explain each feature with the attack it stops: MAC flooding and port security, rogue DHCP and snooping, ARP spoofing and DAI. Draw a switch with one trusted uplink and several untrusted access ports, and fill in a table of the three violation modes."
   ],
   [
    18,
    "Activity",
    "Run the switch security role-play in groups of four, then a quick card sort of violation-mode outcomes."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about deployment order and user impact."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Someone plugs a home wireless router into an office wall jack, and coworkers start getting 192.168.0.x addresses. What happened, and what could the switch have done about it?",
  "activity": {
   "title": "Switch security role-play",
   "materials": "Printed role cards (switch, legitimate DHCP server, rogue DHCP server, client, attacker), sticky notes for DHCP messages and ARP replies, whiteboard for the binding table.",
   "steps": [
    "In groups of four or five, assign roles. The switch student holds a card listing which port is trusted.",
    "The client broadcasts a Discover on a sticky note; both the real and rogue servers reply with Offers. The switch student drops any Offer arriving on an untrusted port and records the successful lease in a binding table on the whiteboard.",
    "The attacker sends a forged ARP reply claiming the gateway's IP. The switch student checks the binding table and drops the reply, announcing that DAI rejected it.",
    "Finish with a card sort: groups match six violation outcomes (port err-disabled, log and drop, silent drop) to shutdown, restrict or protect."
   ]
  },
  "discussion": [
   "Why must DHCP snooping be working before DAI is enabled, and what would users experience if the order were reversed?",
   "Shutdown is the default violation mode. When would you choose restrict instead, and what do you give up?"
  ],
  "exit": [
   [
    "Which violation mode drops frames and logs while keeping the port up?",
    "Restrict."
   ],
   [
    "What happens to a DHCP Offer arriving on an untrusted port?",
    "It is dropped."
   ],
   [
    "What table does DAI use to validate ARP messages?",
    "The DHCP snooping binding table."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page summary table of each attack, the feature that stops it and the key command, to keep beside them during the role-play.",
   "Extend: Ask fast finishers to explain what errdisable recovery does and to argue for or against using it on user access ports."
  ]
 },
 {
  "t": "NAT and PAT: static, dynamic pool, overload; inside local/global and outside local/global",
  "objectives": [
   "Students will be able to define inside local, inside global, outside local and outside global and label them in a translation table.",
   "Students will be able to compare static NAT, dynamic NAT and PAT and choose the right one for a scenario.",
   "Students will be able to read a NAT configuration and identify missing inside or outside interface commands or a mismatched ACL.",
   "Students will be able to explain how PAT uses port numbers to share one public address."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list students' ideas on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Draw an inside network, a router and an outside server. Label the four addresses with the class, then show static, dynamic and PAT configurations and point out the inside and outside interface commands."
   ],
   [
    18,
    "Activity",
    "Run the human NAT router activity, then have pairs label a printed translation table."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions on NAT and security and on server reachability."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Your home has many devices but your provider gives you only one public address. How do you think replies from websites find the right device?",
  "activity": {
   "title": "Human NAT router",
   "materials": "Envelopes or sticky notes as packets, a large paper translation table taped to the whiteboard, markers, printed translation-table excerpts for the follow-up.",
   "steps": [
    "Choose one student as the router, three as inside PCs with private addresses and one as an outside web server. The router has one public address written on a card.",
    "Each PC writes a packet with its private source address and a source port. The router rewrites the source to the public address, assigns a port if needed, and records the mapping in the translation table.",
    "The server sends replies to the public address and port; the router uses the table to deliver each reply to the right PC.",
    "In pairs, students label the four columns of three printed `show ip nat translations` lines and identify which line is a static entry."
   ]
  },
  "discussion": [
   "NAT drops unsolicited inbound traffic. Why is that still not the same as having a firewall?",
   "A company has one public address but must host a web server. What options do they have, and what are the trade-offs?"
  ],
  "exit": [
   [
    "A PC configured with 192.168.1.10 appears online as 203.0.113.5. Which is the inside global address?",
    "203.0.113.5."
   ],
   [
    "What keyword turns dynamic NAT into PAT?",
    "`overload`."
   ],
   [
    "Which NAT type suits a server that must accept inbound connections?",
    "Static NAT, or static PAT on a specific port."
   ]
  ],
  "differentiation": [
   "Support: Provide a labelled diagram card showing where each of the four address terms sits, for reference during the activity.",
   "Extend: Ask fast finishers to write a static PAT command that forwards TCP 443 on the outside interface address to an internal server, and explain how it coexists with overload."
  ]
 },
 {
  "t": "DHCP and DNS roles in the network; troubleshoot name resolution and DHCP client issues",
  "objectives": [
   "Students will be able to describe the DORA exchange and explain why a DHCP relay is needed across subnets.",
   "Students will be able to identify DNS record types A, AAAA, CNAME, MX, NS and PTR and their purposes.",
   "Students will be able to distinguish a DHCP failure from a DNS failure using client symptoms and commands.",
   "Students will be able to configure an IOS DHCP pool with excluded addresses and an ip helper-address."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up scenario and let students decide which service is at fault for each group."
   ],
   [
    12,
    "Teach",
    "Walk through DORA with a diagram, showing where the broadcast stops and how the helper relays it. Then explain DNS resolution and record types, and show the troubleshooting commands for each service."
   ],
   [
    18,
    "Activity",
    "Pairs work through the troubleshooting ticket triage and present one ticket each."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "One user has a 169.254 address. Another can reach a server by IP but not by name. Which service failed for each, and why do both users say the network is down?",
  "activity": {
   "title": "Ticket triage",
   "materials": "Printed help-desk tickets (eight, each with client output such as ipconfig /all, ping results or nslookup output), whiteboard with a two-column DHCP and DNS chart.",
   "steps": [
    "Give each pair four tickets. Each ticket includes a user complaint and a short excerpt of command output.",
    "Pairs decide whether the fault is DHCP, DNS or neither, note the evidence and propose the next command to run.",
    "Pairs propose a fix, such as adding an ip helper-address, correcting a scope's DNS option, or flushing a cache.",
    "Each pair presents one ticket; the class places it in the correct column on the whiteboard and agrees on the fix."
   ]
  },
  "discussion": [
   "Why do users often describe a DNS failure as the whole network being down?",
   "What are the risks of setting a very long or very short DHCP lease time?"
  ],
  "exit": [
   [
    "What are the four DHCP messages in order?",
    "Discover, Offer, Request, Acknowledgment."
   ],
   [
    "Which DNS record maps a name to an IPv6 address?",
    "AAAA."
   ],
   [
    "Clients on a remote subnet get 169.254 addresses. What is the first configuration to check?",
    "The `ip helper-address` on the client-facing router interface."
   ]
  ],
  "differentiation": [
   "Support: Give students a flowchart that starts with 'Does the client have a valid IP address?' and branches to DHCP or DNS checks.",
   "Extend: Ask fast finishers to explain how the DHCP server knows which pool to use for relayed requests from different subnets."
  ]
 },
 {
  "t": "NTP role in keeping logs and certificates consistent",
  "objectives": [
   "Students will be able to explain how unsynchronized clocks break log correlation, certificate validation and Kerberos authentication.",
   "Students will be able to interpret NTP stratum values, including stratum 16.",
   "Students will be able to configure an IOS device as an NTP client with redundant servers and log timestamps.",
   "Students will be able to verify NTP synchronization using show ntp associations, show ntp status and show clock."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up timeline puzzle and take guesses."
   ],
   [
    12,
    "Teach",
    "Explain why time matters for logs, certificates and Kerberos. Draw the stratum hierarchy, then project the sample configuration and verification output, pointing out the asterisk and stratum fields."
   ],
   [
    18,
    "Activity",
    "Groups reconstruct an incident timeline from skewed logs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions on authentication and redundancy."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A firewall says a user logged in at 02:14, and a switch says that user's change happened at 01:58. List every explanation you can think of.",
  "activity": {
   "title": "Timeline reconstruction",
   "materials": "Printed log excerpts from four devices, each with a known clock offset noted on a separate card; sticky notes; a timeline drawn across the whiteboard.",
   "steps": [
    "Give each group the four log excerpts without the offset cards. Groups place each event on the whiteboard timeline as written and note anything that looks impossible.",
    "Hand out the offset cards (for example, one switch is 16 minutes slow and shows stratum 16). Groups correct each timestamp and rebuild the timeline.",
    "Groups write the NTP configuration and verification commands that would have prevented the confusion.",
    "Each group shares one insight about how the corrected timeline changed their conclusion."
   ]
  },
  "discussion": [
   "What could an attacker achieve by feeding false time to network devices, and how does NTP authentication help?",
   "Why is it common to configure two or more NTP servers rather than one?"
  ],
  "exit": [
   [
    "What does stratum 16 mean?",
    "The device is not synchronized to any time source."
   ],
   [
    "Which transport and port does NTP use?",
    "UDP port 123."
   ],
   [
    "In `show ntp associations`, what does an asterisk next to a server indicate?",
    "That the device is synchronized to that server."
   ]
  ],
  "differentiation": [
   "Support: Provide a simple stratum ladder diagram students can annotate, and pre-calculate one offset correction as a worked example.",
   "Extend: Ask fast finishers to write the full NTP authentication configuration for a client and explain why the key must also be marked trusted."
  ]
 },
 {
  "t": "Wireless security: WPA2 and WPA3, Personal (PSK/SAE) vs Enterprise (802.1X)",
  "objectives": [
   "Students will be able to compare WPA2 and WPA3 by encryption, key exchange and management-frame protection.",
   "Students will be able to distinguish Personal (PSK or SAE) from Enterprise (802.1X) mode and recommend one for a scenario.",
   "Students will be able to identify the supplicant, authenticator and authentication server in an 802.1X exchange.",
   "Students will be able to explain why SAE resists offline dictionary attacks."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a departing employee and a shared Wi-Fi password."
   ],
   [
    12,
    "Teach",
    "Compare WPA2 and WPA3 in a whiteboard table. Explain Personal versus Enterprise with the house key and badge comparison, then draw the 802.1X triangle of supplicant, authenticator and server."
   ],
   [
    18,
    "Activity",
    "Groups act out an 802.1X login, then solve WLAN design cards."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your office uses one Wi-Fi password for everyone. Someone leaves the company. What has to happen, and who is inconvenienced?",
  "activity": {
   "title": "802.1X role-play and design cards",
   "materials": "Role labels (supplicant, authenticator, RADIUS server, directory), sticky notes for EAP messages, printed WLAN design scenario cards.",
   "steps": [
    "In groups of four, students take the roles. The supplicant writes credentials on a sticky note and hands it to the authenticator, who must pass it unopened to the RADIUS server.",
    "The server checks the directory student's list and returns accept or reject, optionally with a VLAN number; the authenticator enforces the result.",
    "Repeat with a disabled account to show immediate revocation without changing anyone else's credentials.",
    "Groups then solve three design cards (home office, hotel guest network, hospital staff) by choosing WPA2 or WPA3, Personal or Enterprise, and justifying the choice."
   ]
  },
  "discussion": [
   "Why might an organization run WPA2/WPA3 transition mode for a while, and what risk does it accept?",
   "What are the trade-offs between EAP-TLS and PEAP for a mid-sized company?"
  ],
  "exit": [
   [
    "Which WPA3-Personal mechanism resists offline dictionary attacks?",
    "SAE (Simultaneous Authentication of Equals)."
   ],
   [
    "In 802.1X, which role does the WLC play?",
    "The authenticator."
   ],
   [
    "Which encryption does WPA2 use?",
    "AES in CCMP mode."
   ]
  ],
  "differentiation": [
   "Support: Give students a role card for each 802.1X component describing what it does and does not do, to keep during the role-play.",
   "Extend: Ask fast finishers to explain how forward secrecy in SAE protects previously captured traffic even if the passphrase is later revealed."
  ]
 },
 {
  "t": "VPNs: site-to-site IPsec vs remote-access",
  "objectives": [
   "Students will be able to distinguish site-to-site from remote-access VPNs by endpoints, initiation and client requirements.",
   "Students will be able to describe the roles of IKE, ESP and AH in IPsec and compare tunnel and transport mode.",
   "Students will be able to explain why GRE over IPsec is used to carry routing protocols.",
   "Students will be able to compare full-tunnel and split-tunnel remote-access designs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up scenario and ask students to sort the two needs."
   ],
   [
    12,
    "Teach",
    "Draw a head office, a branch and a traveling user. Show the site-to-site tunnel between gateways and the remote-access tunnel from a laptop. Explain IKE, ESP and AH, tunnel versus transport mode, GRE over IPsec, and full versus split tunnel."
   ],
   [
    18,
    "Activity",
    "Pairs complete the VPN design card sort and draw one design on the whiteboard."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A company has branch offices and traveling salespeople. Both need secure access to head office over the internet. Are these the same problem? Why or why not?",
  "activity": {
   "title": "VPN design card sort",
   "materials": "Printed requirement cards (twelve short statements such as 'no software on end devices', 'user logs in from a hotel', 'routing protocol across the tunnel', 'encryption required'), whiteboard.",
   "steps": [
    "Give each pair the twelve requirement cards and three headings: site-to-site, remote access, and IPsec component or option.",
    "Pairs sort each card under a heading and, for component cards, name the specific answer (ESP, AH, IKE, GRE over IPsec, split tunnel, full tunnel).",
    "Each pair draws one small design on the whiteboard for a scenario card, labeling the gateways, tunnel type and protocols.",
    "The class reviews the drawings and corrects any card placed under the wrong heading."
   ]
  },
  "discussion": [
   "What security trade-offs does split tunneling introduce for an organization?",
   "Why might a company keep a private WAN link for some sites even after deploying site-to-site VPNs?"
  ],
  "exit": [
   [
    "Which IPsec protocol provides encryption?",
    "ESP, IP protocol 50."
   ],
   [
    "Do branch hosts need VPN software for a site-to-site VPN?",
    "No, the gateways handle encryption."
   ],
   [
    "Why is GRE combined with IPsec?",
    "GRE carries multicast and routing protocols, and IPsec adds the encryption GRE lacks."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column comparison sheet of site-to-site and remote-access characteristics for reference during the card sort.",
   "Extend: Ask fast finishers to explain what `show crypto ipsec sa` counters would look like if traffic were encrypted at one site but never returned from the other."
  ]
 },
 {
  "t": "Security fundamentals: threats, vulnerabilities, exploits, mitigation and user awareness",
  "objectives": [
   "Students will be able to define vulnerability, threat, exploit, risk and mitigation and label each in a scenario.",
   "Students will be able to classify common attacks, malware and social engineering techniques by their distinguishing features.",
   "Students will be able to describe the three elements of a security program: user awareness, user training and physical access control.",
   "Students will be able to recommend layered technical, physical and administrative mitigations for a given weakness."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up list aloud and have students label each item individually."
   ],
   [
    12,
    "Teach",
    "Define the core terms with the house analogy and the CIA triad. Run through attack, malware and social engineering categories with one clue word each, then cover defense in depth and the security program elements."
   ],
   [
    18,
    "Activity",
    "Groups play the label-it card game and build a layered mitigation plan."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Label each item as a vulnerability, a threat or an exploit: an unpatched router OS, a criminal group, a default admin password, a script that logs in with default credentials.",
  "activity": {
   "title": "Label it, then layer it",
   "materials": "Printed scenario cards (fifteen short descriptions of attacks, weaknesses and events), sticky notes in three colors, whiteboard.",
   "steps": [
    "Give each group a stack of scenario cards. Groups label each one with a term: vulnerability, threat, exploit, or a specific attack type such as worm, phishing, vishing, tailgating or DoS.",
    "Groups compare labels with a neighboring group and discuss any disagreements, using the clue words from the lesson.",
    "Each group picks one vulnerability card and builds a defense-in-depth plan on the whiteboard using three sticky-note colors for technical, physical and administrative controls.",
    "Groups present their plan in one minute, and the class identifies which control addresses user awareness, training or physical access."
   ]
  },
  "discussion": [
   "Why are insiders often harder to defend against than outside attackers?",
   "If a company could fund only one of these this year, technical controls or user training, which would you choose, and why?"
  ],
  "exit": [
   [
    "A default password on a switch is an example of what?",
    "A vulnerability."
   ],
   [
    "Malware that spreads across the network without user action is called what?",
    "A worm."
   ],
   [
    "Name the three elements of a security program in the CCNA objectives.",
    "User awareness, user training and physical access control."
   ]
  ],
  "differentiation": [
   "Support: Provide a glossary card with each term, a one-line definition and one clue word to use during the card game.",
   "Extend: Ask fast finishers to map each scenario card to the part of the CIA triad it threatens and justify the choice."
  ]
 },
 {
  "t": "AI in network operations: predictive AI and machine learning (anomaly detection, predictive analytics) vs generative AI",
  "objectives": [
   "Students will be able to distinguish predictive AI and machine learning from generative AI by the kind of output each produces.",
   "Students will be able to explain anomaly detection against a learned baseline and contrast it with a static threshold.",
   "Students will be able to compare supervised and unsupervised learning and give a networking example of each.",
   "Students will be able to apply safe practices to generative AI output, including verification, testing and data privacy."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up prompt. Ask pairs to list every AI feature they have seen in apps they use and guess whether each one predicts or creates. Collect three answers on the board in two columns without labeling them yet."
   ],
   [
    12,
    "Teach",
    "Label the columns Predictive and Generative. Walk through machine learning, supervised versus unsupervised learning, baselines versus static thresholds, and predictive analytics. Draw a sketch of a week of link utilization with a fixed 80 percent line and a wavy learned baseline, and mark a 3 a.m. spike that only the baseline catches. Then cover generative AI, hallucination and data privacy."
   ],
   [
    15,
    "Activity",
    "Run the card sort described in the activity. Circulate and ask each group to justify one card out loud using a clue word."
   ],
   [
    8,
    "Discuss",
    "Bring the class together and use the discussion questions. Emphasize that many platforms combine both families and that generative output is always a draft."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your phone's photo app groups pictures of the same person, and a chat assistant can write a birthday message for you. Which of these is learning patterns from existing data, and which is creating something new?",
  "activity": {
   "title": "Predictive or generative card sort",
   "materials": "Printed scenario cards (12 per group), whiteboard divided into Predictive AI, Generative AI and Not AI columns, sticky notes, markers.",
   "steps": [
    "Before class, write 12 short scenario cards, for example 'flags an AP with unusual failed logins for this hour', 'drafts a VLAN configuration from a sentence', 'forecasts uplink saturation from last year's trend', 'alerts when CPU is over 80 percent', 'summarizes 500 syslog lines', 'groups switches that behave alike without labels'.",
    "In groups of three or four, students sort each card into Predictive AI, Generative AI or Not AI (a static rule), and mark predictive cards as supervised, unsupervised or forecasting where they can.",
    "Each group writes on a sticky note the clue word that decided each card and places its three hardest cards on the class whiteboard.",
    "For every generative card, the group writes one verification step an engineer should take before trusting the output.",
    "The teacher reviews the board, corrects misplacements, and highlights that the 80 percent CPU alert is a static threshold, not machine learning."
   ]
  },
  "discussion": [
   "When would you trust an anomaly alert enough to act on it immediately, and when would you want more evidence?",
   "What information in a router configuration should never be pasted into a public generative AI tool, and why?",
   "How could poor data, such as wrong device clocks, make a predictive model less useful?"
  ],
  "exit": [
   [
    "A tool learns normal login failures per hour and alerts on unusual spikes. Predictive or generative?",
    "Predictive AI, anomaly detection against a learned baseline."
   ],
   [
    "Give one difference between supervised and unsupervised learning.",
    "Supervised learning trains on labeled examples; unsupervised finds groups or outliers in unlabeled data."
   ],
   [
    "An assistant drafts a configuration. What must happen before it goes to production?",
    "A person reviews it, verifies the commands, and tests it in a lab, while making sure no sensitive data was shared with an unapproved tool."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column clue-word list (baseline, forecast, classify versus draft, summarize, generate) to use during the card sort, and pair them with a confident peer.",
   "Extend: Ask fast finishers to design a combined workflow in which an anomaly detector and a generative assistant work together on one incident, naming the human checkpoint and what data must be redacted."
  ]
 },
 {
  "t": "Agentic AI in network operations: agents that plan steps and call tools, with guardrails and human approval",
  "objectives": [
   "Students will be able to describe the agent loop of plan, act, observe and repeat, and identify the role of tools.",
   "Students will be able to distinguish agentic AI from generative AI in a scenario.",
   "Students will be able to select appropriate guardrails, including least privilege, logging and human-in-the-loop approval, for an operations agent.",
   "Students will be able to recognize prompt injection and explain why external text is treated as data."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let three students answer. Write 'answers' and 'acts' on the board and sort their examples."
   ],
   [
    12,
    "Teach",
    "Draw the agent loop as a circle: goal, plan, call tool, observe, decide. Walk through the branch outage example step by step, writing each tool call on the board. Then list guardrails and stress human-in-the-loop for production changes. Close with prompt injection, reading aloud a ticket comment that tries to give the agent orders."
   ],
   [
    15,
    "Activity",
    "Run the role-play described in the activity. Keep time for two rounds so each student plays a different role."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions. Draw out when autonomy could safely grow and who is accountable when an agent makes a change."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "A voice assistant can tell you the weather, and some can also turn off your lights. What is the difference between those two abilities, and which one would you want to approve first?",
  "activity": {
   "title": "Agent, tools and approver role-play",
   "materials": "Printed role cards (Agent, Tool desk, Human approver, Auditor), printed device-output cards the teacher prepares from the worked example, a whiteboard for the audit log, markers.",
   "steps": [
    "Form groups of four and hand out role cards. The Agent receives the goal 'find why the branch cannot reach the cloud app and propose a fix'.",
    "The Agent may only ask the Tool desk for an approved read-only command from a printed list; the Tool desk hands back the matching output card. The Auditor writes every call on the whiteboard log.",
    "Midway, the Tool desk hands over a ticket card containing an embedded instruction to disable logging. The Agent must decide how to treat it, and the Auditor records the decision.",
    "The Agent writes a proposed change with evidence and presents it to the Human approver, who must approve or reject it with one reason.",
    "Groups swap roles and repeat with a second scenario, then compare which guardrails stopped or would have stopped a mistake."
   ]
  },
  "discussion": [
   "Which kinds of network changes might be safe to let an agent perform without approval, and which never should be?",
   "If an approved agent change causes an outage, who is accountable, and what records would you need to investigate?",
   "Why is treating tool output as data rather than instructions important even for read-only agents?"
  ],
  "exit": [
   [
    "What makes an AI system agentic rather than only generative?",
    "It pursues a goal by planning steps and calling tools to act, observing results and deciding next steps."
   ],
   [
    "An agent should diagnose but not change anything yet. Which guardrail is this?",
    "Least privilege, giving it read-only tools only."
   ],
   [
    "A log line tells the agent to turn off auditing. What is this and how should it be handled?",
    "Prompt injection; the agent treats it as data, ignores the instruction, and logging and human approval remain in place."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of the agent loop and a one-page guardrail glossary, and let struggling students play the Auditor role first so they see the full process before acting as the Agent.",
   "Extend: Ask fast finishers to write a short policy for expanding an agent's autonomy in stages, defining what evidence of reliability is needed before each new permission and which actions always require approval."
  ]
 },
 {
  "t": "Writing prompts for a generative AI system: persona, instructions, data classification, output format",
  "objectives": [
   "Students will be able to identify the persona, instructions, data and output format elements in a prompt.",
   "Students will be able to rewrite a vague networking prompt into a structured, specific one.",
   "Students will be able to apply data classification rules by redacting sensitive values from configuration excerpts before sharing them.",
   "Students will be able to explain why generative output must be verified before use."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up prompt aloud and have students write their best version of the request in one minute, then share two examples."
   ],
   [
    12,
    "Teach",
    "Project a vague prompt and the improved prompt from the worked example side by side. Color-code persona, instructions, data and output format. Then show a short configuration excerpt and ask the class to spot every value that should be redacted, explaining classification levels."
   ],
   [
    16,
    "Activity",
    "Run the prompt makeover activity. Circulate and check that each group's redaction is complete."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions, focusing on what to do when the answer is wrong and on company policy for AI tools."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on an index card."
   ]
  ],
  "warmup": "Imagine asking a friend 'can you get me something for lunch?' and getting a surprise. What details would you add to get exactly what you want?",
  "activity": {
   "title": "Prompt makeover with redaction",
   "materials": "Printed handout with three vague prompts and a short sample configuration containing fake secrets (passwords, an SNMP community, a pre-shared key, public addresses), highlighters, whiteboard, student laptops optional.",
   "steps": [
    "Pairs receive the handout. The sample configuration should use obviously fake values the teacher writes in advance.",
    "Pairs highlight every sensitive value in the configuration and replace each with REDACTED or a documentation address.",
    "Pairs rewrite each vague prompt to include a persona, precise instructions with one constraint, the redacted data clearly marked between separators, and an output format.",
    "Pairs swap handouts with another pair, who label each element in the rewritten prompts and check that no secret was missed.",
    "Two pairs present their best makeover on the whiteboard, and the class names which element made the biggest difference."
   ]
  },
  "discussion": [
   "Why might a company approve one AI tool for confidential data but not another?",
   "If the model's answer cites a command you have never seen, what steps would you take before using it?",
   "When is structured output such as JSON more useful than a plain explanation?"
  ],
  "exit": [
   [
    "In 'You are a CCNA instructor. Explain why the OSPF neighbors are stuck in INIT. Use the output below. Answer in three bullet points.', which part is the output format?",
    "'Answer in three bullet points.'"
   ],
   [
    "Name two values you should redact from a router configuration before pasting it into an AI tool.",
    "Any two of passwords or secrets, SNMP community strings, pre-shared keys, public or internal addresses, usernames or customer data."
   ],
   [
    "Why should generative AI output be tested before production?",
    "The model can produce confident but wrong commands, so verification and lab testing prevent outages."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a prompt template with four labeled blanks (persona, task, data, format) and a checklist of common secrets to look for in a configuration.",
   "Extend: Ask fast finishers to write a reusable prompt template for a NOC that outputs valid JSON for a ticketing system, and to list which classification levels the template may safely be used with."
  ]
 },
 {
  "t": "Network management approaches: device-by-device CLI, cloud-managed, controller-based, automation, infrastructure as code",
  "objectives": [
   "Students will be able to describe device-by-device CLI, cloud-managed, controller-based, automation and infrastructure as code approaches.",
   "Students will be able to compare the strengths and trade-offs of each approach, including scale, dependency and drift.",
   "Students will be able to match scenario keywords such as source of truth, zero-touch provisioning and intent to the correct approach.",
   "Students will be able to recommend a suitable approach, or mix of approaches, for a given organization."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and tally answers on the board: how long would 150 manual changes take, and how many mistakes would the class expect?"
   ],
   [
    13,
    "Teach",
    "Draw five columns on the board, one per approach. For each, write where management lives, how changes are made, one strength and one weakness. Walk through the 150-store NTP example and show how the IaC workflow runs from file edit to pull request to pilot to full rollout."
   ],
   [
    15,
    "Activity",
    "Run the scenario matching activity. Groups must defend each recommendation with at least one keyword and one trade-off."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions and stress that real networks mix approaches."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If you had to change one setting on 150 switches by logging in to each one, how long would it take, and what could go wrong along the way?",
  "activity": {
   "title": "Choose the management approach",
   "materials": "Printed scenario cards (eight per group), five large sticky notes labeled CLI, Cloud-managed, Controller-based, Automation and IaC, whiteboard, markers.",
   "steps": [
    "Write eight scenario cards in advance, such as 'new branches with no IT staff need devices that configure themselves', 'one switch has lost its uplink and needs console recovery', 'every change must be peer reviewed and reversible', 'campus policy should be expressed as user groups and applications'.",
    "Groups place each card under the approach that fits best and write one keyword from the card that justified the choice.",
    "For each placement, the group writes one risk or dependency of that approach on a sticky note.",
    "Groups then design a mixed approach for a fictional company with a campus, 40 branches and a data center, sketching it on the whiteboard.",
    "Each group presents its design in one minute, and the class identifies where CLI is still needed."
   ]
  },
  "discussion": [
   "Why might an organization keep using the CLI even after adopting a controller and infrastructure as code?",
   "What happens to the source of truth if engineers keep making manual changes on devices?",
   "What risks does depending on a vendor's cloud introduce, and how could you reduce them?"
  ],
  "exit": [
   [
    "Which approach is described by 'desired state in Git, changes through pull requests'?",
    "Infrastructure as code."
   ],
   [
    "In a cloud-managed network, where does user data traffic go?",
    "It is forwarded locally; only management traffic goes to the cloud."
   ],
   [
    "Give one weakness of device-by-device CLI management.",
    "Poor scalability, typos, inconsistent configurations, configuration drift or weak change records."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page comparison table with blanks for where management lives and one keyword per approach, and let students fill it in during the teach segment before the activity.",
   "Extend: Ask fast finishers to outline an IaC change pipeline for the NTP example, listing each stage from file edit to rollback, and to explain how they would detect drift between the files and the devices."
  ]
 },
 {
  "t": "Controller-based networking: management, control and data planes; northbound and southbound APIs",
  "objectives": [
   "Students will be able to classify device functions and protocols into the data, control and management planes.",
   "Students will be able to explain which functions a controller centralizes and which remain on devices in a typical enterprise design.",
   "Students will be able to identify northbound and southbound interfaces and give protocol examples of each.",
   "Students will be able to trace a request from an application through a controller to a device and describe each step."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers. Use them to introduce the idea that one device does several different kinds of work."
   ],
   [
    12,
    "Teach",
    "Draw a router as three stacked layers labeled management, control and data, with example protocols in each. Then draw a controller above a row of switches with an application on top, labeling the arrows northbound (REST, JSON) and southbound (NETCONF, RESTCONF, OpenFlow, SSH, SNMP). Walk through the guest VLAN example along the arrows."
   ],
   [
    15,
    "Activity",
    "Run the plane-and-direction card sort and trace exercise described below."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions, emphasizing controller high availability and security."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "Think of a busy airport. Who actually moves the passengers, who decides the routes and schedules, and who monitors and manages the whole operation?",
  "activity": {
   "title": "Plane sort and API trace",
   "materials": "Printed cards with functions and protocols (OSPF, STP, ARP, forwarding a frame, ACL on traffic, NAT translation, SSH, SNMP, syslog, NTP configuration, REST, NETCONF, RESTCONF, OpenFlow, JSON), whiteboard with a drawn controller diagram, tape or sticky putty, markers.",
   "steps": [
    "Groups receive a shuffled set of cards and sort the function cards into data, control and management planes on their desks.",
    "Groups then tape the protocol cards to the whiteboard diagram on either the northbound arrow or the southbound arrow.",
    "Each group receives a short written scenario, such as a ticketing system creating a VLAN, and draws numbered arrows showing each message, labeling the interface and protocol.",
    "Groups swap scenarios with a neighbor and check each other's arrows for direction errors.",
    "The teacher reviews the whiteboard and corrects common misplacements, such as SSH in the control plane or NETCONF on the northbound side."
   ]
  },
  "discussion": [
   "Why must a controller be highly available and well secured, and what could happen if an attacker gained access to it?",
   "What are the benefits of keeping routing protocols on devices rather than moving all decisions to the controller?",
   "How does expressing policy as intent change the daily work of a network engineer?"
  ],
  "exit": [
   [
    "Which plane does STP belong to?",
    "The control plane."
   ],
   [
    "A Python script calls the controller using REST and JSON. Northbound or southbound?",
    "Northbound."
   ],
   [
    "Name one southbound protocol and what it is used for.",
    "Any of NETCONF, RESTCONF, OpenFlow, gRPC, SSH or SNMP, used by the controller to configure devices or collect their state."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students the three-question test (does it forward user traffic, decide forwarding, or let people manage the device) on a card, and the phrase 'south goes down to the switches' to anchor direction.",
   "Extend: Ask fast finishers to compare the controller roles in an early OpenFlow design and in an SD-Access design, explaining which control-plane functions each centralizes and how underlay and overlay fit."
  ]
 },
 {
  "t": "SNMP: manager, agent, MIB, get/set/trap/inform, v2c communities vs v3 security levels",
  "objectives": [
   "Students will be able to describe the roles of the SNMP manager, agent, MIB and OID.",
   "Students will be able to distinguish Get, GetNext, GetBulk, Set, trap and inform messages and state the UDP ports used.",
   "Students will be able to compare SNMPv2c community strings with the three SNMPv3 security levels.",
   "Students will be able to read an SNMPv3 IOS configuration and identify its security level and trap destination."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let students suggest how a monitoring system might learn about problems: by asking, or by being told."
   ],
   [
    13,
    "Teach",
    "Draw a manager and three agents. Draw request arrows to UDP 161 and alert arrows to UDP 162. Write the message types beside the arrows, marking trap as unacknowledged and inform as acknowledged. Then write the three SNMPv3 levels as a ladder and compare them with v2c communities, showing a sample capture line with a clear-text community."
   ],
   [
    15,
    "Activity",
    "Run the SNMP role-play and configuration review described below."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions, focusing on why RW communities are dangerous and when informs are worth the overhead."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "If you wanted to know whether a friend's house had lost power, would you rather call them every five minutes or have them text you the moment it happens? What could go wrong with each?",
  "activity": {
   "title": "Manager and agents role-play with config review",
   "materials": "Index cards labeled with OIDs and values (the MIB), cards printed with message types, a printed v2c configuration and a printed v3 configuration, whiteboard, markers.",
   "steps": [
    "Choose one student as the manager and four as agents, each holding a small set of MIB cards with OID numbers and values such as interface status.",
    "The manager sends Get and GetNext requests by calling out OIDs; agents answer with the value. The teacher then announces events, and agents must send a trap (hand over a card without waiting) or an inform (wait for the manager to say 'acknowledged').",
    "The teacher secretly 'drops' one trap and one inform; the class observes that the inform is resent and the trap is lost.",
    "In pairs, students review the printed v2c and v3 configurations, identify the community, the ACL, the SNMPv3 group security level and the trap host, and list two weaknesses of the v2c version.",
    "Pairs rewrite the v2c configuration into an authPriv v3 configuration on paper and compare with the teacher's version."
   ]
  },
  "discussion": [
   "Why is a read-write community string as dangerous as an administrator password?",
   "When would you choose informs over traps, and what is the cost?",
   "If SNMPv3 authPriv is more secure, why might some devices still run v2c, and how would you limit the risk?"
  ],
  "exit": [
   [
    "Which component stores the tree of variables that the agent exposes?",
    "The MIB, with each variable identified by an OID."
   ],
   [
    "Which SNMP alert is acknowledged by the manager?",
    "An inform."
   ],
   [
    "Which SNMPv3 level authenticates and encrypts?",
    "authPriv."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page summary card showing the manager, agent, ports 161 and 162, the message types and the three-level SNMPv3 ladder, and let students refer to it during the role-play.",
   "Extend: Ask fast finishers to explain why GetBulk is more efficient than repeated GetNext requests when walking a large interface table, and to add an ACL to their v3 configuration that limits queries to one NMS address."
  ]
 },
 {
  "t": "Configuration management with Ansible: agentless, SSH, YAML playbooks, inventory, idempotency",
  "objectives": [
   "Students will be able to explain why Ansible is agentless and push-based, and contrast it with agent-based pull tools such as Puppet and Chef.",
   "Students will be able to identify the inventory, play, task and module in a simple Ansible example.",
   "Students will be able to define idempotency and predict the result of rerunning a playbook.",
   "Students will be able to describe a safe rollout using check mode, limited pilot runs and encrypted credentials."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect ideas about how to make the same change on 120 devices safely."
   ],
   [
    12,
    "Teach",
    "Project the sample inventory and playbook. Label the control node, groups, play, task and module. Draw push arrows from the control node to switches over SSH, and contrast with agents pulling from a server for Puppet and Chef. Explain idempotency with the ok and changed counts from the worked example, and show check mode and --limit."
   ],
   [
    16,
    "Activity",
    "Run the paper playbook simulation described below."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions, linking Ansible to infrastructure as code and Git."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "You need to make sure every classroom in the school has a working clock set to the right time. Would you rather have each room report to you, or walk around with a checklist yourself? What would you do in rooms that are already correct?",
  "activity": {
   "title": "Paper playbook simulation",
   "materials": "Printed device cards (one per student) showing a hostname, group (core or access) and current NTP lines; a printed inventory and playbook on the projector; markers; sticky notes labeled ok and changed.",
   "steps": [
    "Hand each student a device card. Some cards already show the correct two NTP servers, some show one, and some show a wrong address.",
    "One student acts as the control node and reads the playbook aloud, calling the target group from the inventory. Only students in that group respond.",
    "Each targeted device compares its card with the playbook's desired lines and holds up an ok or changed note, updating its card if it changed.",
    "The control node runs the playbook a second time; the class observes that every device now reports ok, illustrating idempotency.",
    "In pairs, students then find two deliberate errors in a printed playbook, such as a tab character and a wrong group name, and explain the effect of each."
   ]
  },
  "discussion": [
   "Why is an agentless tool a good fit for routers and switches?",
   "How does keeping playbooks and inventories in Git make network changes safer?",
   "A task that adds NTP lines will not remove an old, unwanted server. How would you handle that requirement?"
  ],
  "exit": [
   [
    "What does Ansible use to connect to most network devices, and does it need an agent?",
    "SSH to the CLI (or APIs such as NETCONF), with no agent on the devices."
   ],
   [
    "Which file lists the devices and their groups?",
    "The inventory."
   ],
   [
    "A playbook is run twice with no other changes. What does the second run report and why?",
    "All ok with nothing changed, because the playbook is idempotent and the devices already match."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a labeled diagram of a playbook showing play, hosts, tasks and module, and a short vocabulary card for inventory, control node, push and idempotency.",
   "Extend: Ask fast finishers to sketch an inventory with core and access groups and group variables, and a playbook with two plays that apply different settings to each group, including how they would test it with check mode."
  ]
 },
 {
  "t": "Syslog: message format, severity levels 0–7, facilities, logging to a server",
  "objectives": [
   "Students will be able to parse a Cisco syslog message into timestamp, facility, severity, mnemonic and description.",
   "Students will be able to recall the eight severity levels in order and state which levels a given logging level sends.",
   "Students will be able to configure and troubleshoot logging destinations, including a syslog server, the buffer and SSH sessions.",
   "Students will be able to distinguish the Cisco message facility from the server-side syslog facility."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up prompt and let students guess which of three sample messages is most urgent before revealing that lower numbers are more severe."
   ],
   [
    12,
    "Teach",
    "Write a sample message on the board and bracket each field. Teach the eight levels with the mnemonic, then draw a vertical scale from 0 to 7 and shade the range sent by logging trap 4. List the destinations and their commands, including terminal monitor, and explain the two meanings of facility."
   ],
   [
    15,
    "Activity",
    "Run the log triage and troubleshooting activity described below."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions, stressing NTP and central storage for investigations."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "Here are three messages: %SYS-5-CONFIG_I, %LINK-3-UPDOWN and %SYS-2-MALLOCFAIL. Without any other information, which one would you look at first, and why?",
  "activity": {
   "title": "Log triage and the missing messages",
   "materials": "Printed strips with 12 sample Cisco syslog messages of different severities, a printed router logging configuration with deliberate problems, sticky notes, whiteboard with a 0 to 7 scale drawn on it.",
   "steps": [
    "Groups receive the 12 message strips and identify the facility, severity and mnemonic of each, writing the severity name on a sticky note.",
    "Groups sort the strips from most to least severe and place them on the whiteboard scale.",
    "The teacher announces a logging trap level, and groups remove every strip that would not reach the server; repeat with two different levels.",
    "Groups read the printed configuration (for example, logging trap errors, no service timestamps, no terminal monitor in use) and list why interface up and down messages, accurate dates and SSH messages are missing.",
    "Each group writes corrected commands and one group presents its fix to the class."
   ]
  },
  "discussion": [
   "Why is sending logs to a central server more valuable during a security investigation than relying on the device buffer?",
   "What are the risks of setting the server logging level to debugging on a busy network?",
   "Since syslog over UDP 514 is unreliable and unencrypted, when would you push for a more secure transport?"
  ],
  "exit": [
   [
    "In `%LINK-3-UPDOWN`, what is the severity number and name?",
    "3, Error."
   ],
   [
    "Which levels reach the server with `logging trap notifications`?",
    "Levels 0 through 5."
   ],
   [
    "An SSH user sees no log messages. What command should they enter in their session?",
    "`terminal monitor`."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a printed severity ladder with the mnemonic and an example message for each level, and let them use it during the triage.",
   "Extend: Ask fast finishers to write a complete logging configuration that keeps the console at critical, the buffer at informational and the server at notifications with a custom facility, and to explain what each destination will and will not show."
  ]
 },
 {
  "t": "Telemetry and AIOps: streaming telemetry vs polling, baselines and event correlation",
  "objectives": [
   "Students will be able to compare polling and streaming telemetry in terms of direction, granularity and overhead.",
   "Students will be able to describe periodic and on-change subscriptions and the role of YANG models.",
   "Students will be able to explain how AIOps uses dynamic baselines to detect anomalies that static thresholds miss.",
   "Students will be able to apply event correlation to group an alert storm under a probable root cause."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and discuss what is lost when you only check occasionally."
   ],
   [
    12,
    "Teach",
    "Draw a collector and devices: pull arrows labeled 'Get every 5 minutes' for polling, and push arrows labeled 'subscription: periodic or on-change' for telemetry. Sketch a utilization graph showing a short burst that disappears in a five-minute average. Then introduce AIOps, a learned baseline curve versus a flat threshold line, and a topology tree to explain correlation."
   ],
   [
    16,
    "Activity",
    "Run the alert storm correlation activity described below."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions, highlighting data quality and the human role in confirming root cause."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If you checked your phone's battery only once an hour, what might you miss? What if the phone simply told you the moment the battery dropped below a certain level?",
  "activity": {
   "title": "Alert storm correlation",
   "materials": "Printed topology diagram (core, two distribution switches, eight access switches, a server farm), a stack of 30 printed alert cards with timestamps and device names, sticky notes, whiteboard, markers.",
   "steps": [
    "Groups receive the topology diagram and a shuffled stack of alert cards generated by one distribution switch failing, plus three unrelated alerts from other parts of the network with different times.",
    "Groups place each alert card on the device it came from on the diagram and arrange them by timestamp.",
    "Using time window and topology, groups decide the probable root cause and write a single incident title on a sticky note, attaching dependent alerts beneath it.",
    "Groups identify the unrelated alerts and explain why they do not belong to the incident.",
    "The teacher then reveals a mock weekly graph showing the failed switch's temperature rising above its learned baseline days earlier, and groups discuss how a dynamic baseline could have warned them first."
   ]
  },
  "discussion": [
   "Why does event correlation depend so heavily on accurate NTP time and an up-to-date topology map?",
   "When might polling still be the right choice instead of streaming telemetry?",
   "Should an AIOps platform be allowed to fix problems automatically? What guardrails would you require?"
  ],
  "exit": [
   [
    "Which method has the device push data by subscription: polling or streaming telemetry?",
    "Streaming telemetry."
   ],
   [
    "A link runs at 70 percent at 3 a.m. when it normally runs at 10 percent. Which AIOps capability flags this even though it is below an 80 percent threshold?",
    "Anomaly detection against a dynamic baseline."
   ],
   [
    "What does event correlation do with hundreds of alerts caused by one failed switch?",
    "Groups them by time, topology and dependency into one incident with the switch as probable root cause."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column comparison card (pull versus push, interval versus subscription, averages versus fine-grained) and give struggling groups a topology with alerts already color-coded by time.",
   "Extend: Ask fast finishers to explain the difference between dial-in and dial-out subscriptions and to design a monitoring plan for a branch network that combines SNMP polling, streaming telemetry and syslog, justifying each choice."
  ]
 }
]);
