/* Teacher edition for CompTIA Network+ (N10-009): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("network-plus", [
 {
  "t": "OSI model layers and the data unit at each layer",
  "objectives": [
   "Students will be able to list the seven OSI layers in order and name the PDU at each layer.",
   "Students will be able to explain encapsulation and de-encapsulation, including which addresses change at each router hop.",
   "Students will be able to classify common devices and protocols (hub, switch, router, firewall, HTTP, TCP, IP, Ethernet) by OSI layer.",
   "Students will be able to apply a layer-by-layer approach to isolate the layer at fault in a troubleshooting scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the whiteboard without judging them. Point out that every answer is really a guess about where the conversation broke, which is what the OSI model formalizes."
   ],
   [
    15,
    "Teach",
    "Draw the seven layers as a tall stack. Teach the mnemonic, then write the PDU beside each layer. Walk through one web request top-down, adding a labeled 'header' sticky note at each layer, then show the trailer at Layer 2. Project a Wireshark screenshot (prepared in advance) and match each section to the stack. Finish with device-to-layer pairings and the rule that MACs change per hop while IPs stay the same."
   ],
   [
    15,
    "Activity",
    "Run the 'Envelope Relay' activity described below. Circulate and ask each group which layer is acting right now and what PDU they are holding."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions. Draw out why the model is a reference, not an implementation, and why that matters for protocols like TLS and ARP."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them on the door as they leave."
   ]
  ],
  "warmup": "A coworker says 'the internet is down.' Write down three different things that could actually be broken, from the cable all the way to the website.",
  "activity": {
   "title": "Envelope Relay: encapsulation by hand",
   "materials": "Printed message slips, small and large envelopes or folded paper, sticky notes, markers, whiteboard.",
   "steps": [
    "Form groups of seven and assign each student one layer, standing in a line from Layer 7 to Layer 1. A second group acts as the receiving stack.",
    "The Layer 7 student writes a short HTTP-style request on a slip. Each student down the line wraps it and writes their header on the outside: Layer 4 adds source and destination ports, Layer 3 adds source and destination IPs, Layer 2 adds MACs and an 'FCS' sticky note on the back.",
    "The Layer 1 student 'transmits' by walking it to a student playing a router, who removes only the Layer 2 wrapping, reads the IP, and writes a new Layer 2 wrapper with new MACs before passing it on.",
    "The receiving group de-encapsulates in reverse order, naming each PDU aloud as they remove it.",
    "Repeat once with a fault card (for example 'cable cut' or 'no service on port 443') hidden at one layer; the receiving group must say which layer failed and how they would detect it."
   ]
  },
  "discussion": [
   "If the internet really runs on TCP/IP, why do network teams still talk in OSI layer numbers?",
   "Where would you place ARP and TLS, and why do they not fit neatly into one layer?",
   "When would you choose a top-down troubleshooting approach instead of bottom-up?"
  ],
  "exit": [
   [
    "Name the PDU at Layers 2, 3 and 4.",
    "Frame at Layer 2, packet at Layer 3, segment (TCP) or datagram (UDP) at Layer 4."
   ],
   [
    "When a packet crosses a router, which addresses are rewritten?",
    "The Layer 2 source and destination MAC addresses; the IP addresses stay the same unless NAT is used."
   ],
   [
    "A user's link light is off. Which layer do you investigate first?",
    "Layer 1, the physical layer: cable, jack, port and signal."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a printed layer chart with PDU names and two example devices per layer, and let them use it during the activity before removing it for the exit ticket.",
   "Extend: Ask fast finishers to map each OSI layer to the four TCP/IP model layers and explain where a VLAN tag and a TLS record would appear in a captured frame."
  ]
 },
 {
  "t": "Network appliances: routers, switches, firewalls, IDS/IPS, load balancers, proxies, NAS/SAN, wireless controllers",
  "objectives": [
   "Students will be able to describe the primary function and main OSI layer of routers, switches, firewalls, IDS/IPS, load balancers, proxies, NAS/SAN and wireless LAN controllers.",
   "Students will be able to distinguish IDS from IPS, forward from reverse proxy, and NAS from SAN.",
   "Students will be able to select the appropriate appliance for a described business need.",
   "Students will be able to place appliances on a network diagram and explain the impact of inline versus passive placement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. List students' answers, then sort them into 'connects things', 'protects things' and 'serves things' columns to preview the lesson."
   ],
   [
    15,
    "Teach",
    "Draw a simple network: internet, firewall, load balancer, three web servers, a core switch, a SAN, a WLC and APs. Add each appliance as you explain its job and layer. Spend extra time on the pairs that the exam contrasts: IDS vs IPS (draw the SPAN copy versus inline path), forward vs reverse proxy (draw arrows for direction), and NAS vs SAN (file vs block)."
   ],
   [
    15,
    "Activity",
    "Run the 'Appliance Matchmaker' card sort below in groups of three or four."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on fail-open versus fail-closed trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "If you had to protect a small business network with only one box, what would you buy and why?",
  "activity": {
   "title": "Appliance Matchmaker",
   "materials": "Printed cards: one set of appliance names and one set of need statements, a whiteboard with a blank network diagram, tape or sticky notes.",
   "steps": [
    "Give each group the appliance cards and twelve need cards, such as 'hide internal web servers from the internet', 'alert on port scans without touching traffic' and 'servers need shared storage they can format'.",
    "Groups match each need to one appliance and write the clue word that decided it on the card.",
    "Each group then places three of its appliances on the whiteboard diagram, marking whether each is inline or passive.",
    "The class reviews any placement that differs between groups and decides which is correct and why.",
    "Finish by asking each group what happens to users if each of their inline devices fails."
   ]
  },
  "discussion": [
   "Would you configure an inline IPS at a hospital to fail open or fail closed, and why?",
   "Why might a company use both an NGFW and a separate IDS?",
   "When is a NAS the better choice than a SAN even if budget is not an issue?"
  ],
  "exit": [
   [
    "Which device only alerts, and which can block: IDS or IPS?",
    "The IDS only alerts because it sees a copy of traffic; the IPS sits inline and can block."
   ],
   [
    "A device sits in front of web servers, hides their addresses and receives internet requests. What is it?",
    "A reverse proxy (often a load balancer acting as one)."
   ],
   [
    "Which storage option gives servers block-level access over Fibre Channel or iSCSI?",
    "A SAN, storage area network."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page reference table listing each appliance, its layer, and one clue word, and pair struggling students with a partner for the card sort.",
   "Extend: Ask fast finishers to design a high-availability layout for the firewall and IPS, and explain how session persistence on a load balancer affects failover."
  ]
 },
 {
  "t": "Network functions: CDN, VPN, QoS, TTL",
  "objectives": [
   "Students will be able to explain the problem each function solves: CDN (distance and load), VPN (privacy), QoS (contention) and TTL (loop prevention).",
   "Students will be able to compare site-to-site, client-to-site and clientless VPNs, and full versus split tunnel.",
   "Students will be able to describe the QoS process of classify, mark, queue, and distinguish shaping from policing.",
   "Students will be able to interpret traceroute output using their understanding of TTL and ICMP Time Exceeded."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list the answers. Point out that buying bandwidth is one answer, but this lesson offers four cheaper, more targeted tools."
   ],
   [
    15,
    "Teach",
    "Teach each function as a problem-and-fix pair on the whiteboard. Draw a world map with an origin and edge servers for CDN; a tunnel between two sites and a laptop for VPN, then shade full versus split tunnel; a single congested link with a priority queue for QoS, writing DSCP EF 46. For TTL, write a packet with TTL 3 crossing routers and decrement it aloud, then project the tracert output and read it line by line."
   ],
   [
    15,
    "Activity",
    "Run the 'Human Traceroute' activity, followed by the symptom-sorting round."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, especially the split-tunnel security trade-off."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "Video calls at your school sound fine in the morning but choppy every afternoon. List everything you might do about it before buying a faster internet connection.",
  "activity": {
   "title": "Human Traceroute and symptom sort",
   "materials": "Paper 'packets' with a TTL box, markers, six student volunteers as routers, printed symptom cards, whiteboard.",
   "steps": [
    "Line up six volunteers as routers between a 'source' student and a 'destination' student.",
    "The source sends a paper packet marked TTL 1. The first router subtracts one, reaches zero, discards it and hands back a 'Time Exceeded' note with its name. Repeat with TTL 2, 3 and so on, recording each responder on the board to build the trace.",
    "Ask one router to stay silent (no Time Exceeded reply) and show how that produces asterisks even though later hops still answer.",
    "Create a loop by having two routers pass a packet back and forth, and show TTL ending it.",
    "In pairs, students sort eight symptom cards (for example 'choppy voice at peak times', 'slow site for overseas users', 'branch needs private link to HQ') under CDN, VPN, QoS or TTL and justify each choice."
   ]
  },
  "discussion": [
   "What security controls does a company give up when it allows split tunneling, and how might it compensate?",
   "Why can QoS fail if only some devices on a path honor DSCP markings?",
   "Why is a CDN not a substitute for backups?"
  ],
  "exit": [
   [
    "What happens when an IPv4 packet's TTL reaches zero?",
    "The router discards it and usually sends an ICMP Time Exceeded message to the source."
   ],
   [
    "Which VPN mode sends only corporate traffic through the tunnel?",
    "Split tunnel."
   ],
   [
    "Name one QoS marking used at Layer 3 and the value commonly used for voice.",
    "DSCP, with voice commonly marked EF (Expedited Forwarding), DSCP 46."
   ]
  ],
  "differentiation": [
   "Support: Give students a four-column organizer with the problem, the function, one clue word and one example already filled in for CDN, and have them complete the other three.",
   "Extend: Ask fast finishers to explain how shaping and policing would each affect a backup job exceeding its rate, and why voice is usually given a strict priority queue with a cap."
  ]
 },
 {
  "t": "Cloud concepts: NFV, VPC, security groups, cloud gateways, deployment and service models (IaaS, PaaS, SaaS)",
  "objectives": [
   "Students will be able to design a basic VPC with public and private subnets and the correct route to an internet gateway, NAT gateway or VPN gateway.",
   "Students will be able to compare security groups (stateful, instance-level) with NACLs (stateless, subnet-level).",
   "Students will be able to classify scenarios by service model (IaaS, PaaS, SaaS) and deployment model (public, private, hybrid, community) and state the customer's responsibilities.",
   "Students will be able to explain the difference between NFV and SDN."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Collect answers and highlight that every 'cloud' service still runs on someone's hardware and network."
   ],
   [
    15,
    "Teach",
    "Draw a VPC 10.20.0.0/16 on the whiteboard with a public and a private subnet. Add the internet gateway, NAT gateway and VPN gateway, and write each subnet's route table beside it. Attach security groups to instances and a NACL at the subnet edge, contrasting stateful and stateless. Then draw a three-column responsibility chart for IaaS, PaaS and SaaS and finish with the four deployment models and NFV versus SDN."
   ],
   [
    15,
    "Activity",
    "Run the 'Build the VPC' whiteboard design challenge below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on shared responsibility and misconfiguration."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Name three apps you use every day that run 'in the cloud.' For each, who do you think patches the servers it runs on?",
  "activity": {
   "title": "Build the VPC",
   "materials": "Whiteboard or large paper per group, markers, printed requirement cards, sticky notes for route-table entries and security group rules.",
   "steps": [
    "Give each group a requirement card, for example: 'Web tier reachable on HTTPS from the internet; database reachable only from the web tier; database must download patches; office 192.168.0.0/16 must reach both tiers privately.'",
    "Groups draw the VPC, choose subnet ranges and place the gateways needed.",
    "They write each subnet's route table on sticky notes (destination and target) and each security group's inbound rules.",
    "Groups swap designs and act as auditors, looking for one route or rule that breaks a requirement or exposes something.",
    "Finish by having each group label which items in their design are the customer's responsibility under IaaS."
   ]
  },
  "discussion": [
   "If a cloud breach happens because a storage area was left public, who is at fault under the shared responsibility model?",
   "When might a company choose a dedicated private circuit to its cloud instead of a VPN gateway?",
   "Why does NFV make it practical for a provider to give every customer its own firewall?"
  ],
  "exit": [
   [
    "A private subnet must download updates but never accept inbound internet connections. Which gateway does its default route point to?",
    "A NAT gateway."
   ],
   [
    "Which is stateful and attached to an instance: a security group or a NACL?",
    "A security group."
   ],
   [
    "In which service model does the customer patch the operating system?",
    "IaaS."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed VPC diagram with the gateways already drawn, so struggling students focus only on choosing the correct route-table targets.",
   "Extend: Ask fast finishers to add a NACL to their design and write the rules needed, including ephemeral return ports, to allow HTTPS to the web tier."
  ]
 },
 {
  "t": "Common ports and protocols: FTP, SSH, Telnet, SMTP, DNS, DHCP, HTTP/S, NTP, SNMP, LDAP/S, SMB, Syslog, SQL, RDP, SIP",
  "objectives": [
   "Students will be able to state the port number and transport (TCP or UDP) for each protocol listed in the objective.",
   "Students will be able to pair insecure protocols with their secure replacements and the replacement's port.",
   "Students will be able to identify running services from netstat, ss or scan output.",
   "Students will be able to write the firewall rules needed for a described service, including direction and transport."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up prompt and give students one minute to write as many port numbers as they can from memory. Tally the class total on the board as a baseline."
   ],
   [
    15,
    "Teach",
    "Present the protocols in the lesson's five groups: file transfer and remote access, email and web, infrastructure, file sharing and databases, and voice. For each group write port, transport and secure partner on a large table. Highlight the swap-prone pairs (161/162, 67/68, 389/636, 22/23, FTP vs TFTP). Project the netstat excerpt and decode it with the class."
   ],
   [
    15,
    "Activity",
    "Run the 'Port Bingo and Firewall Fix' activity below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about clear-text protocols and nonstandard ports."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "Write down every port number you already know and what it is for. Which of them do you think send passwords in readable text?",
  "activity": {
   "title": "Port Bingo and Firewall Fix",
   "materials": "Printed bingo cards with port numbers in random grids, a list of protocol clues for the teacher, printed scan-output excerpts, pens.",
   "steps": [
    "Play two quick rounds of bingo: the teacher reads a clue such as 'secure directory lookups' or 'SNMP traps', and students mark the matching port (636, 162).",
    "Hand each pair a printed scan output for a fictional server showing five open ports, including at least one insecure protocol.",
    "Pairs identify each service, mark which are insecure, and name the secure replacement and its port.",
    "Pairs then write firewall rules for a short requirement card (for example, 'help desk manages switches securely; switches send logs and traps to the monitoring server'), listing source, destination, transport and port.",
    "Two pairs compare rules and resolve any differences, with the teacher confirming the direction of SNMP polling and traps."
   ]
  },
  "discussion": [
   "Why do some organizations still run Telnet or TFTP, and how can they reduce the risk?",
   "If a scan shows a web server on port 8443 instead of 443, what does that tell you and what does it not tell you?",
   "Why does VoIP often cause firewall trouble even when the SIP port is open?"
  ],
  "exit": [
   [
    "Which port and transport do SNMP traps use?",
    "UDP 162, sent from the device to the manager."
   ],
   [
    "What should replace Telnet, and on which port?",
    "SSH on TCP 22."
   ],
   [
    "A scan shows TCP 3389 open. What service is it?",
    "RDP, Remote Desktop Protocol, for graphical remote access to Windows."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a color-coded port chart grouped by function (red for insecure, green for secure) to use during bingo, then remove it for the firewall task.",
   "Extend: Ask fast finishers to explain how a stateful firewall handles the return traffic to the client's ephemeral port, and why a stateless ACL would need an extra rule."
  ]
 },
 {
  "t": "Protocol types (TCP, UDP, ICMP, GRE, IPsec) and traffic types (unicast, multicast, anycast, broadcast)",
  "objectives": [
   "Students will be able to compare TCP and UDP and choose the appropriate transport for a given application.",
   "Students will be able to explain the roles of ICMP, GRE, AH, ESP and IKE, including which provide encryption and which work through NAT.",
   "Students will be able to distinguish unicast, broadcast, multicast and anycast traffic and give an example of each.",
   "Students will be able to interpret a simple packet sequence such as a TCP handshake or reset."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question. Use the answers to introduce the phone call versus postcard comparison for TCP and UDP."
   ],
   [
    15,
    "Teach",
    "Act out the three-way handshake with a student volunteer. Draw TCP and UDP headers side by side to show the size difference. Explain ICMP message types with a ping and traceroute example. Draw the envelope layers for GRE, then GRE inside ESP, and mark which layers NAT rewrites to show why AH fails. Finish with four arrows on a diagram showing unicast, broadcast, multicast and anycast."
   ],
   [
    15,
    "Activity",
    "Run the 'Traffic Type Role-Play and Capture Read' activity below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, especially the trade-offs of filtering ICMP."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "If you were sending a live sports commentary over the internet, would you rather every word arrive eventually or arrive on time even if a few go missing? Why?",
  "activity": {
   "title": "Traffic Type Role-Play and Capture Read",
   "materials": "Colored cards labeled unicast, broadcast, multicast and anycast; a printed handout of five short packet sequences; whiteboard.",
   "steps": [
    "Arrange students as hosts in two 'subnets' separated by a student router. Give four students 'group member' badges for a multicast group and place two 'DNS server' students in different corners with the same name tag for anycast.",
    "The teacher holds up a traffic-type card and a sender student delivers a paper message accordingly: to one person, to everyone in their subnet only (the router blocks it), to badge holders only, or to the nearest 'DNS server'.",
    "Repeat with a broadcast that tries to cross the router to reinforce that routers bound broadcast domains.",
    "In pairs, students read the handout sequences (for example SYN, SYN-ACK, ACK; SYN, SYN-ACK, RST; repeated retransmissions; an ICMP Time Exceeded) and write what each one means.",
    "Pairs choose a protocol for three scenario cards (encrypt a site tunnel through NAT, carry OSPF between sites, live voice) and justify their choices."
   ]
  },
  "discussion": [
   "What could break if a firewall administrator blocks every ICMP message?",
   "Why would an organization still use GRE when IPsec exists?",
   "Why does IPv6 not need broadcast, and what replaces it?"
  ],
  "exit": [
   [
    "Which IPsec protocol provides encryption?",
    "ESP, Encapsulating Security Payload."
   ],
   [
    "List the three messages of the TCP handshake in order.",
    "SYN, SYN-ACK, ACK."
   ],
   [
    "Which traffic type delivers to hosts that have joined a group?",
    "Multicast."
   ]
  ],
  "differentiation": [
   "Support: Provide a comparison card listing each protocol with 'encrypts?', 'reliable?' and 'uses ports?' columns, and let struggling students fill it in during the teach segment.",
   "Extend: Ask fast finishers to explain why IKE needs UDP 4500 for NAT traversal and to sketch the headers of a GRE over IPsec packet in tunnel mode from outside to inside."
  ]
 },
 {
  "t": "Transmission media and transceivers: copper categories, single-mode vs multimode fiber, coax, SFP/QSFP, connectors",
  "objectives": [
   "Students will be able to select the correct copper category, fiber type or coax for a given distance, speed and environment.",
   "Students will be able to identify RJ45, RJ11, F-type, BNC, LC, SC, ST and MPO connectors from a description or picture.",
   "Students will be able to match transceiver types (SFP, SFP+, QSFP+, QSFP28, DAC) to link speeds and explain why both ends must match.",
   "Students will be able to apply a physical-layer checklist to troubleshoot a fiber link that will not come up."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch the answers. Introduce the three media families: copper, fiber and radio."
   ],
   [
    15,
    "Teach",
    "Build a table on the whiteboard: category, speed, distance for Cat 5e, 6, 6a and 8. Draw a cross-section of single-mode and multimode fiber showing core sizes and light paths. Project images of each connector and the transceiver family with speeds. Cover plenum versus riser and T568A/B straight-through versus crossover, then the fiber troubleshooting checklist."
   ],
   [
    15,
    "Activity",
    "Run the 'Cable Consultant' scenario cards and connector identification activity below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions on cost versus capability."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "You need to connect two buildings across a parking lot. What could go wrong if you just ran a long Ethernet cable between them?",
  "activity": {
   "title": "Cable Consultant",
   "materials": "Printed connector photo cards (or a projector slide with numbered images), printed scenario cards, a printed media reference table, whiteboard. If available, sample patch cables and transceivers can be passed around.",
   "steps": [
    "Pairs receive ten numbered connector images and write the name of each (RJ45, RJ11, F-type, BNC, LC, SC, ST, MPO) plus whether it is for copper, coax or fiber.",
    "Each pair then receives three scenario cards giving distance, speed and environment, such as '3 km at 10 Gbps between buildings' or '3 m server to top-of-rack switch at 10 Gbps'.",
    "For each scenario they specify the medium, cable rating or fiber type, transceiver and connector, and write one sentence of justification.",
    "Pairs swap one scenario with another pair, who must find any mismatch (for example multimode chosen for 3 km, or Cat 6 for 85 m at 10 Gbps).",
    "The teacher closes with a troubleshooting card: a fiber link that will not come up, and the class orders the checklist steps."
   ]
  },
  "discussion": [
   "When is shielded twisted pair worth its extra cost and installation care compared with fiber?",
   "Why might a data center choose DAC cables for in-rack links but fiber for links between rows?",
   "What practical habits prevent dirty fiber connectors from causing outages?"
  ],
  "exit": [
   [
    "Which copper category is the first rated for 10 Gbps at 100 meters?",
    "Cat 6a."
   ],
   [
    "Which fiber type should you choose for a 5 km link?",
    "Single-mode fiber."
   ],
   [
    "What speed does a QSFP28 transceiver provide, and how?",
    "100 Gbps, using four 25 Gbps lanes."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a laminated reference card with connector images and a distance-and-speed table to use during the scenario task.",
   "Extend: Ask fast finishers to explain how a BiDi transceiver works on a single strand and why the two ends must be complementary, then design a link that uses one."
  ]
 },
 {
  "t": "Topologies and architectures: mesh, star, hub and spoke, spine and leaf, three-tier, collapsed core, north-south vs east-west",
  "objectives": [
   "Students will be able to identify star, mesh, hub and spoke and hybrid topologies and state the strengths and weaknesses of each.",
   "Students will be able to calculate the number of links in a full mesh using n(n-1)/2.",
   "Students will be able to compare three-tier, collapsed core and spine and leaf architectures and choose one for a given site.",
   "Students will be able to distinguish north-south from east-west traffic and explain why east-west traffic drives microsegmentation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about airline routes. Connect it to hub and spoke and mesh on the board."
   ],
   [
    15,
    "Teach",
    "Draw star, full mesh and partial mesh, and work the formula for 5 and 6 nodes with the class. Draw a hub-and-spoke WAN and trace a branch-to-branch path. Draw the three-tier campus, label each layer's job, then erase the core to show a collapsed core. Draw spine and leaf with every leaf linked to every spine and count hops between two servers. Finish with arrows for north-south and east-west traffic."
   ],
   [
    15,
    "Activity",
    "Run the 'Design Desk' whiteboard challenge below in groups of three."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions on cost and security trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Why do some airlines make you change planes at a big hub airport instead of flying you directly between two small cities? What are the pros and cons?",
  "activity": {
   "title": "Design Desk",
   "materials": "Whiteboard sections or large paper per group, markers, printed client brief cards, sticky notes.",
   "steps": [
    "Give each group a client brief, for example: '50 retail branches and one HQ, low budget', 'single-building school with 300 users', or 'data center with constant server-to-server traffic and plans to double'.",
    "Groups draw a design that fits, labeling the topology or architecture and marking every single point of failure.",
    "Each group writes one sentence on cost, one on redundancy and one on scalability for its design.",
    "Groups rotate to another group's drawing and leave one sticky-note question or improvement, such as 'what happens if the hub fails?' or 'how do you add 200 more ports?'.",
    "Original groups answer the sticky notes aloud; the teacher highlights where east-west traffic would need microsegmentation."
   ]
  },
  "discussion": [
   "If most data center traffic is east-west, what does that mean for a design that relies only on a perimeter firewall?",
   "When is the extra cost of a separate core layer justified?",
   "How does SD-WAN change the weaknesses of hub and spoke?"
  ],
  "exit": [
   [
    "How many links does a full mesh of 5 nodes need?",
    "10, from 5 x 4 / 2."
   ],
   [
    "Which design combines the core and distribution layers into one?",
    "A collapsed core (two-tier) design."
   ],
   [
    "Is web server to database server traffic inside a data center north-south or east-west?",
    "East-west."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students labeled diagram templates for each topology and architecture, and let them match the client briefs to a template before drawing their own.",
   "Extend: Ask fast finishers to calculate how many cables a spine and leaf fabric with 4 spines and 12 leaves needs, and explain what happens to capacity if one spine fails."
  ]
 },
 {
  "t": "IPv4 addressing: public vs private (RFC 1918), APIPA, loopback, classes, subnetting and VLSM, CIDR",
  "objectives": [
   "Students will be able to classify an IPv4 address as public, private (RFC 1918), APIPA or loopback, and identify its historical class.",
   "Students will be able to calculate the network address, broadcast address, usable range and host count for a given address and prefix.",
   "Students will be able to select the smallest prefix that fits a host requirement and build a VLSM plan from largest to smallest.",
   "Students will be able to diagnose addressing faults such as APIPA addresses, wrong masks and wrong gateways from ipconfig output."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display three ipconfig outputs (one normal, one APIPA, one with a wrong mask) and ask the warm-up question. Collect guesses without confirming them yet."
   ],
   [
    15,
    "Teach",
    "Write the RFC 1918, loopback and APIPA ranges on the board. Briefly cover classes and why CIDR replaced them. Teach the block-size method step by step with 192.168.1.100/26, then do 172.16.37.10/20 together so students see it in another octet. Build the /24 to /30 host table with the class. Finish by modeling the VLSM plan for 500, 200, 60 and 2 hosts."
   ],
   [
    15,
    "Activity",
    "Run the 'Subnet Relay Race' and VLSM challenge below."
   ],
   [
    5,
    "Discuss",
    "Return to the warm-up outputs and have the class diagnose each one. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper without calculators."
   ]
  ],
  "warmup": "Here are three computers' network settings. Which one do you think cannot reach anything, which one can reach some things but not others, and what clues did you use?",
  "activity": {
   "title": "Subnet Relay Race and VLSM challenge",
   "materials": "Whiteboard divided into team columns, printed problem cards, scratch paper, pens. Student laptops with a browser-based subnet calculator are optional for checking only.",
   "steps": [
    "Split the class into teams of four. Each team member has one job in order: find host bits and block size, find the network address, find the broadcast address, find the usable range and host count.",
    "The teacher reads an address and prefix, such as 10.5.77.200/27. Each member writes their step on the board and hands the marker to the next teammate.",
    "The first team with a fully correct answer scores; run four or five rounds with different octets.",
    "Then give each team a VLSM brief, such as 'carve 172.20.0.0/22 for 300, 120, 50 and two point-to-point links', and have them build the allocation table largest first.",
    "Teams check another team's VLSM table for overlaps or misaligned blocks, using a calculator only to confirm."
   ]
  },
  "discussion": [
   "Why do organizations use private addressing even when they could request public addresses?",
   "What does seeing an APIPA address rule out, and what does it point you toward?",
   "Why is route summarization with CIDR valuable on large networks?"
  ],
  "exit": [
   [
    "Is 172.20.14.9 private or public? What about 172.40.1.1?",
    "172.20.14.9 is private (within 172.16.0.0/12); 172.40.1.1 is public."
   ],
   [
    "What are the network and broadcast addresses of 192.168.4.150/26?",
    "Network 192.168.4.128, broadcast 192.168.4.191."
   ],
   [
    "What is the smallest prefix that supports 25 hosts?",
    "/27, which gives 30 usable hosts."
   ]
  ],
  "differentiation": [
   "Support: Provide a printed powers-of-two and block-size chart, and let struggling students work the relay race in pairs on the same step before rotating.",
   "Extend: Ask fast finishers to find the single summary route for 10.8.4.0/24 through 10.8.7.0/24 and explain why 10.8.5.0/24 through 10.8.8.0/24 cannot be summarized as cleanly."
  ]
 },
 {
  "t": "Evolving use cases: SDN and SD-WAN, VxLAN, zero trust, SASE/SSE, infrastructure as code",
  "objectives": [
   "Students will be able to explain SDN's separation of control and data planes and the roles of northbound and southbound APIs.",
   "Students will be able to compare SDN with SD-WAN and SASE with SSE, stating what each includes.",
   "Students will be able to describe how VXLAN extends Layer 2 over Layer 3 and why its 24-bit VNI matters.",
   "Students will be able to apply zero trust and infrastructure as code concepts to solve described organizational problems."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. List the pain points students raise and keep them on the board to match against technologies later."
   ],
   [
    15,
    "Teach",
    "Draw the SDN layers with northbound and southbound arrows. Show a branch with broadband, LTE and MPLS links feeding an SD-WAN edge, and mark application-based path choice. Draw VXLAN as an Ethernet frame inside a UDP packet between two VTEPs over a routed cloud. Contrast perimeter security with zero trust, then draw SASE as SD-WAN plus an SSE box. Finish by projecting the IaC template and explaining version control and drift."
   ],
   [
    15,
    "Activity",
    "Run the 'Problem to Technology' consulting role-play below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, especially why zero trust is a strategy rather than a product."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "Imagine you had to change one setting on 500 network devices by tomorrow, logging into each one by hand. What could go wrong, and what would you wish you had?",
  "activity": {
   "title": "Problem to Technology consulting role-play",
   "materials": "Printed client problem cards, printed technology cards (SDN, SD-WAN, VXLAN, zero trust, SASE, SSE, IaC), sticky notes, whiteboard.",
   "steps": [
    "Groups of three each take the role of a consulting team and receive three client problem cards, such as 'branches lose connectivity when one circuit fails', 'need 20,000 isolated tenant segments in a routed data center', or 'stolen laptops keep full network access'.",
    "For each problem, the group selects one technology card, writes the clue that led them there, and lists one feature that solves the problem.",
    "Each group presents one recommendation to the class in under a minute while another group plays the skeptical client and asks one question.",
    "The class identifies any problem where two technologies were chosen and decides whether both apply (for example, zero trust delivered through SSE).",
    "Finish with each group writing the IaC-style template for one small change, such as adding a VLAN, on a sticky note."
   ]
  },
  "discussion": [
   "Why is zero trust described as a strategy rather than a product, and what tools might contribute to it?",
   "What risks does central control in SDN introduce, and how might they be managed?",
   "Does infrastructure as code remove the need for change management? Why or why not?"
  ],
  "exit": [
   [
    "What does SDN separate?",
    "The control plane (deciding where traffic goes) from the data plane (forwarding it)."
   ],
   [
    "What does SASE include that SSE does not?",
    "SD-WAN networking."
   ],
   [
    "How many bits is a VXLAN network identifier, and roughly how many segments does it allow?",
    "24 bits, allowing about 16 million segments."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a matching sheet with each technology, a one-line definition and one clue word, and have them match it to problem cards before the role-play.",
   "Extend: Ask fast finishers to explain why VXLAN underlays need a larger MTU and to describe how a VTEP handles a frame from a virtual machine moving to another rack."
  ]
 },
 {
  "t": "IPv6: address types, dual stack, tunneling, NAT64",
  "objectives": [
   "Students will be able to compress and expand IPv6 addresses using the leading-zero and double-colon rules.",
   "Students will be able to identify global unicast, unique local, link-local, loopback and multicast addresses from their prefixes.",
   "Students will be able to explain how NDP, SLAAC and DHCPv6 let IPv6 hosts configure themselves, and why ICMPv6 must not be blocked wholesale.",
   "Students will be able to choose between dual stack, tunneling and NAT64 for a described coexistence scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project an ipconfig output showing only an fe80:: address and ask the warm-up question. Note guesses on the board to revisit at the end."
   ],
   [
    15,
    "Teach",
    "Write a full IPv6 address and model the two shortening rules, then expand one back. Build a prefix table: 2000::/3, fc00::/7, fe80::/10, ff00::/8, ::1. Draw a router sending an RA and a host building an address with SLAAC, mentioning EUI-64 and privacy addresses. Finish with three quick diagrams for dual stack, a tunnel through IPv4 and NAT64 with DNS64."
   ],
   [
    15,
    "Activity",
    "Run the 'Hextet Sort and Transition Match' activity below."
   ],
   [
    5,
    "Discuss",
    "Return to the warm-up and have students explain why that PC cannot leave its link. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "This computer shows only an address starting with fe80 and nothing else. What do you think it can reach, and what might be missing?",
  "activity": {
   "title": "Hextet Sort and Transition Match",
   "materials": "Printed address cards (full and compressed IPv6 addresses), a sorting mat drawn on the whiteboard with columns for each address type, printed scenario cards, markers.",
   "steps": [
    "Give each pair a stack of 12 address cards. They compress any full addresses correctly on the card, checking that :: is used only once.",
    "Pairs place each card in the correct whiteboard column: global unicast, unique local, link-local, multicast or loopback.",
    "Pairs swap two of their compressed addresses with another pair, who must expand them back to all eight hextets.",
    "Each pair then receives three scenario cards, such as 'IPv6-only phones must reach an IPv4-only server' or 'two IPv6 sites connected by an IPv4-only provider', and chooses dual stack, tunneling or NAT64 with one sentence of justification.",
    "The teacher reviews any misplaced cards and asks the class to explain the rule that decides each one."
   ]
  },
  "discussion": [
   "If IPv6 removes the need for NAT, what role do firewalls play in protecting IPv6 hosts?",
   "Why might an unexpected IPv6 tunnel on a corporate network be a security concern?",
   "Why do many organizations prefer dual stack over translation where possible?"
  ],
  "exit": [
   [
    "Compress 2001:0db8:0000:0000:0000:0000:0000:0010.",
    "2001:db8::10."
   ],
   [
    "What type of address begins with fe80?",
    "A link-local address, valid only on the local link."
   ],
   [
    "Which transition method lets IPv6-only clients reach IPv4-only servers?",
    "NAT64, usually paired with DNS64."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a step-by-step compression checklist and a prefix reference card, and start them with addresses that need only one rule at a time.",
   "Extend: Ask fast finishers to build an EUI-64 interface ID from a given MAC address and explain why many operating systems now use random interface IDs instead."
  ]
 },
 {
  "t": "Static vs dynamic routing; OSPF, EIGRP and BGP; route selection (longest prefix, administrative distance, metrics)",
  "objectives": [
   "Students will be able to explain how connected, static and dynamic routes enter a routing table and when static routing is the better choice.",
   "Students will be able to compare OSPF, EIGRP, RIP and BGP by type, metric, standard and typical use.",
   "Students will be able to apply longest prefix match, administrative distance and metric, in that order, to choose the route a router uses.",
   "Students will be able to design a floating static backup route by choosing an appropriate administrative distance."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up question. Collect three or four answers aloud without correcting them, and tell students they will check their guesses at the end."
   ],
   [
    12,
    "Teach",
    "Draw a routing table on the whiteboard with connected, static, OSPF and EIGRP entries. Explain how each source gets there, then walk the selection order: longest prefix, then AD, then metric. Show the AD defaults list and say clearly that metrics are never compared across protocols. Finish with a one-minute comparison of OSPF, EIGRP, RIP and BGP."
   ],
   [
    15,
    "Activity",
    "Run the Route Race card activity in pairs (see activity). Circulate and ask each pair to say aloud which step of the selection order decided each card."
   ],
   [
    8,
    "Discuss",
    "Go through the trickiest cards as a class, especially the ones where a low-AD broad route lost to a high-AD specific route. Then pose the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand them in at the door."
   ]
  ],
  "warmup": "Your phone's maps app offers two ways to a friend's house: one is the street address, the other just the neighborhood. A second app offers the exact address too. Which instruction do you follow, and what would make you trust one app over the other?",
  "activity": {
   "title": "Route Race",
   "materials": "Printed cards the teacher makes in advance: 10 destination cards (one IP address each) and one printed routing table per pair with 8 to 10 routes from mixed sources showing [AD/metric]; whiteboard for scoring.",
   "steps": [
    "Give each pair the same printed routing table and shuffle the destination cards face down.",
    "Pairs flip a card, find every route that matches the destination, and write which route wins and which rule decided it (prefix, AD or metric).",
    "After all 10 cards, pairs swap answer sheets with a neighboring pair and check them against the teacher's projected key.",
    "As a stretch, each pair writes one floating static route that would back up the default route and states the AD they chose and why."
   ]
  },
  "discussion": [
   "Why do you think routers check prefix length before trustworthiness of the source?",
   "When would an organization accept the extra complexity of BGP instead of just using a default route to one ISP?",
   "What risks come with a network built entirely on static routes as it grows?"
  ],
  "exit": [
   [
    "A router has a static route (AD 1) to 10.0.0.0/8 and an OSPF route (AD 110) to 10.20.0.0/16. Which one carries a packet to 10.20.3.3?",
    "The OSPF /16, because longest prefix match is applied before administrative distance."
   ],
   [
    "Which protocol is open-standard and link-state, and which one routes between autonomous systems?",
    "OSPF is the open-standard link-state protocol; BGP routes between autonomous systems."
   ],
   [
    "What makes a static route a floating static route?",
    "It is given a higher administrative distance than the primary route, so it is installed only when the primary route disappears."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-box flowchart (Prefix? AD? Metric?) to fill in for each card, and start them with routing tables that differ in only one of the three steps.",
   "Extend: Ask fast finishers to design a two-ISP edge with a primary and floating backup default route, then explain in two sentences why a company might replace this with BGP."
  ]
 },
 {
  "t": "NAT and PAT, first hop redundancy (FHRP/VRRP/HSRP), subinterfaces",
  "objectives": [
   "Students will be able to distinguish static NAT, dynamic NAT, PAT and port forwarding and select the right one for a scenario.",
   "Students will be able to interpret a NAT translation table using the terms inside local, inside global and outside global.",
   "Students will be able to explain how an FHRP provides gateway redundancy and compare HSRP and VRRP, including priority and preemption.",
   "Students will be able to describe how subinterfaces with 802.1Q tags provide router-on-a-stick inter-VLAN routing."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the board. Point out that the hotel front desk idea is exactly what NAT and PAT do."
   ],
   [
    12,
    "Teach",
    "Draw an inside network, an edge router and the internet. Show static NAT, dynamic NAT and PAT on the same drawing, then project the translation table and label each column. Next, draw two routers sharing a virtual IP and explain active and standby roles, priority, preemption and tracking. Finish by sketching one router port with three subinterfaces to a switch trunk."
   ],
   [
    15,
    "Activity",
    "Run the Human NAT Table role-play (see activity)."
   ],
   [
    8,
    "Discuss",
    "Debrief the role-play: what broke when the pool ran out, what changed with PAT, and what happened when the active router sat down. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper before leaving."
   ]
  ],
  "warmup": "A 200-room hotel has one street address. How does the front desk make sure a package sent back to \"the hotel\" reaches the right guest?",
  "activity": {
   "title": "Human NAT Table",
   "materials": "Sticky notes, markers, a whiteboard divided into a translation table (inside local, inside global, outside global), and printed name tags reading Router A, Router B and Web Server.",
   "steps": [
    "Six students act as inside PCs, each holding a sticky note with a private IP and a source port; two students act as Router A (active) and Router B (standby); one acts as the web server.",
    "Round 1, dynamic NAT: give Router A only two public address cards. PCs request access one at a time; the class records each mapping on the board and notes what happens to the third PC.",
    "Round 2, PAT: Router A now has one public address and assigns unique port numbers. The class fills in the table and the web server sends replies that Router A must map back correctly.",
    "Round 3, FHRP: Router A sits down mid-round. Router B announces it now owns the virtual IP, and the PCs keep sending to the same gateway address without changing anything. Repeat once with preemption on and once with it off when Router A stands back up."
   ]
  },
  "discussion": [
   "If NAT already blocks unsolicited inbound connections, why do organizations still need firewalls?",
   "When would you choose router on a stick over a Layer 3 switch, and what would make you change your mind later?",
   "Should preemption always be enabled? What could go wrong if a flapping router keeps taking the active role back?"
  ],
  "exit": [
   [
    "Which translation method lets 150 PCs share one public IP address, and how does it keep connections apart?",
    "PAT (NAT overload); it gives each connection a unique source port on the shared public address."
   ],
   [
    "What is the open-standard FHRP, and what does preemption do?",
    "VRRP; preemption lets a higher-priority router take back the active role when it recovers."
   ],
   [
    "What two settings must match for a router-on-a-stick subinterface for VLAN 30 to work?",
    "The subinterface must use encapsulation dot1Q 30, and VLAN 30 must be carried on the switch trunk port that connects to the router."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially filled translation table and a one-page cheat sheet matching each NAT type to a one-line scenario, and let students work in threes during the role-play.",
   "Extend: Ask fast finishers to explain why IPsec needs NAT traversal and to design an FHRP pair with interface tracking, stating each router's priority and what happens when each link fails."
  ]
 },
 {
  "t": "VLANs, VLAN database, SVIs, 802.1Q trunking, native and voice VLANs",
  "objectives": [
   "Students will be able to explain how VLANs create separate broadcast domains and why inter-VLAN traffic needs a Layer 3 device.",
   "Students will be able to differentiate access ports, trunk ports, the native VLAN and the voice VLAN in a switch configuration.",
   "Students will be able to describe what the 802.1Q tag contains and how the allowed VLAN list affects traffic.",
   "Students will be able to troubleshoot common VLAN faults such as a missing allowed VLAN, a native VLAN mismatch or a down SVI."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the office building with separate departments. Collect ideas and connect them to broadcast domains."
   ],
   [
    12,
    "Teach",
    "Project the sample switch configuration. Walk line by line: creating and naming a VLAN, an access port with a voice VLAN, a trunk with a native VLAN and allowed list. Draw an 802.1Q frame with its tag fields. Finish by adding an SVI to the drawing as the gateway for each VLAN."
   ],
   [
    15,
    "Activity",
    "Run the Tag Sorter activity (see activity)."
   ],
   [
    8,
    "Discuss",
    "Review each pair's diagnosis of the fault cards. Ask the discussion questions and connect answers to security practice."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on a half sheet."
   ]
  ],
  "warmup": "Your school shares one building and one set of hallways, but students, staff and visitors should not all wander into the same rooms. How would you separate them without building new hallways?",
  "activity": {
   "title": "Tag Sorter",
   "materials": "Projector showing two switches and a trunk, printed frame cards (each showing source port, VLAN tag or 'untagged', and destination), six printed fault cards with short `show vlan brief` or `show interfaces trunk` excerpts, and colored sticky notes for VLANs.",
   "steps": [
    "Pairs receive a stack of frame cards and a printed two-switch diagram with access ports, a voice port and a trunk whose native VLAN and allowed list are marked.",
    "For each frame card, pairs decide whether the frame is tagged on the trunk, which VLAN it lands in on the far switch, or whether it is dropped, and place a sticky note on the diagram.",
    "Pairs then draw three fault cards and write the symptom a user would report and the one command change that fixes it.",
    "Two pairs combine and compare answers, resolving disagreements before the class debrief."
   ]
  },
  "discussion": [
   "If routing between VLANs is easy on a Layer 3 switch, what actually keeps guests away from staff systems?",
   "Why might an organization prefer one cable per desk shared by a phone and PC, and what risks or trade-offs come with it?",
   "What would you include in a switch hardening checklist after this lesson?"
  ],
  "exit": [
   [
    "What is the difference between an access port and a trunk port?",
    "An access port carries one VLAN untagged for an end device; a trunk carries many VLANs between network devices using 802.1Q tags."
   ],
   [
    "Users in VLAN 50 cannot reach colleagues in VLAN 50 on another switch, but other VLANs work. What is the first thing to check?",
    "Whether VLAN 50 is in the trunk's allowed list and exists in both switches' VLAN databases."
   ],
   [
    "What does an SVI do, and what must be true for it to come up?",
    "It acts as a Layer 3 gateway (or management address) for a VLAN; the VLAN must exist and have at least one active port or trunk."
   ]
  ],
  "differentiation": [
   "Support: Give students a color-coded diagram where each VLAN has its own color and the trunk is striped, and let them trace frames with a finger before writing answers.",
   "Extend: Ask fast finishers to explain how a double-tagging VLAN hopping attack depends on the native VLAN and list three switch settings that prevent it."
  ]
 },
 {
  "t": "Interface settings: speed, duplex, MTU and jumbo frames, link aggregation",
  "objectives": [
   "Students will be able to explain speed, duplex and autonegotiation and predict the result of hard-coding only one side of a link.",
   "Students will be able to identify a duplex mismatch or MTU problem from interface counters such as late collisions, CRC errors and giants.",
   "Students will be able to justify where jumbo frames are used and why they must be enabled end to end.",
   "Students will be able to describe how LACP link aggregation adds bandwidth and redundancy and why one flow uses only one member link."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the walkie-talkie warm-up and let two volunteers act it out, one taking turns and one talking freely, for 30 seconds."
   ],
   [
    12,
    "Teach",
    "Explain speed, duplex and autonegotiation, then show the projected `show interfaces` output and circle half duplex, 100 Mb/s and late collisions. Explain MTU, jumbo frames and tunnel overhead, and demonstrate the `ping -f -l` arithmetic (1472 + 28 = 1500). Finish with LACP, the active and passive modes, and per-flow hashing."
   ],
   [
    15,
    "Activity",
    "Run the Counter Detective activity (see activity)."
   ],
   [
    8,
    "Discuss",
    "Pairs share their diagnoses; correct any that blamed cabling for a configuration problem. Ask the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Two friends try to talk over walkie-talkies, but one of them thinks it is a normal phone call and never waits for a turn. What would each friend hear, and how would the conversation go?",
  "activity": {
   "title": "Counter Detective",
   "materials": "Printed case cards the teacher prepares, each with a short symptom description and an interface counter excerpt (duplex, speed, MTU, collisions, CRC, runts, giants, or an LACP member status); student laptops with a browser for optional lookup of command syntax.",
   "steps": [
    "Pairs receive six case cards: two duplex mismatches, two MTU or jumbo frame problems, one tunnel MTU issue and one LACP bundle with a suspended member.",
    "For each card, pairs circle the counter or line that gives the problem away and name the misconfigured setting.",
    "Pairs write the fix in one sentence and the command or test they would use to confirm it, such as `ethtool`, `show interfaces` or a don't-fragment ping.",
    "Each pair presents one card to the class in under a minute, explaining which side of the link is at fault."
   ]
  },
  "discussion": [
   "Why might an older admin have hard-coded speed and duplex in the past, and is that still a good idea today?",
   "If jumbo frames reduce overhead, why not enable them everywhere on the network?",
   "How would you explain to a manager that a 40 Gbps aggregated link will not make one backup job run at 40 Gbps?"
  ],
  "exit": [
   [
    "A server is hard-coded to 1 Gbps full duplex and the switch port is on auto. What duplex does the switch port likely choose and what counters rise?",
    "Half duplex; the switch logs collisions and late collisions while the server logs CRC errors and runts."
   ],
   [
    "What must be true for 9000-byte jumbo frames to work between a server and a storage array?",
    "Every device in the path, including the switch ports, must be configured for the larger MTU."
   ],
   [
    "Name the IEEE protocol that negotiates link aggregation and one requirement for member ports.",
    "LACP; member ports must match in speed, duplex, VLAN and trunk settings."
   ]
  ],
  "differentiation": [
   "Support: Provide a symptom-to-cause lookup card (collisions and CRC point to duplex, giants point to MTU, one flow capped points to hashing) that students can use for the first three cases.",
   "Extend: Ask fast finishers to calculate the largest don't-fragment ping payload for a path with a 1400-byte MTU and explain why blocking all ICMP can break path MTU discovery."
  ]
 },
 {
  "t": "Spanning Tree Protocol and loop prevention",
  "objectives": [
   "Students will be able to explain why Layer 2 loops cause broadcast storms and MAC address flapping.",
   "Students will be able to determine the root bridge, root ports, designated ports and blocked port in a small switch topology.",
   "Students will be able to compare classic STP and RSTP in port states and convergence time.",
   "Students will be able to select the correct protection feature (PortFast, BPDU guard, root guard, loop guard) for a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let students describe what would happen. Connect their answers to the missing TTL in Ethernet frames."
   ],
   [
    12,
    "Teach",
    "Draw a triangle of switches with priorities and MACs. Walk the three steps on the board: elect root, choose root ports, choose designated ports, block the rest. Show the projected `show spanning-tree` output and explain 4106. Cover port states, RSTP, and the protection features with one-line scenarios for each."
   ],
   [
    15,
    "Activity",
    "Run the Human Spanning Tree activity (see activity)."
   ],
   [
    8,
    "Discuss",
    "Debrief what changed when a link was cut and when a rogue switch joined. Ask the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on index cards."
   ]
  ],
  "warmup": "If someone in a crowded room shouted a message and asked everyone who heard it to shout it again to everyone near them, how long would the shouting last? What rule would stop it?",
  "activity": {
   "title": "Human Spanning Tree",
   "materials": "Name tags showing a switch name, priority and short MAC for each volunteer; string or tape to represent links on the floor; colored sticky notes marked R (root port), D (designated) and X (blocked); whiteboard.",
   "steps": [
    "Four or five student volunteers wear switch name tags and stand in a ring connected by string so that at least two loops exist; the rest of the class acts as auditors.",
    "The class elects the root bridge by comparing priorities and then MACs, and the root raises a hand.",
    "Each non-root switch calculates its lowest-cost path to the root (each link marked 4 or 19) and tags its root port with an R sticky note; then the class decides the designated port on each remaining link and marks the blocked port with an X.",
    "The teacher cuts one active string. Students work out which blocked port moves to forwarding and why. Finally a new student with a lower priority joins, and the class predicts what root guard or BPDU guard would do."
   ]
  },
  "discussion": [
   "Why is letting the switches pick a root on their own a risk in a real building?",
   "What would make an organization choose RSTP or MSTP over classic STP?",
   "Should users ever be allowed to plug small switches into wall jacks? How would you balance convenience and safety?"
  ],
  "exit": [
   [
    "How is the root bridge elected?",
    "The switch with the lowest bridge ID wins: lowest priority first, then lowest MAC address."
   ],
   [
    "A PC port takes about 30 seconds to start passing traffic, so DHCP times out. Which feature helps?",
    "PortFast (edge port), which lets end-device ports go straight to forwarding."
   ],
   [
    "Which feature err-disables an access port if a switch is plugged into it?",
    "BPDU guard."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a step card listing the three STP decisions in order and a pre-labeled three-switch diagram to complete before attempting the human activity.",
   "Extend: Ask fast finishers to design priorities for a primary and secondary root across two VLANs so each VLAN uses a different uplink, and explain how per-VLAN STP achieves load sharing."
  ]
 },
 {
  "t": "Wireless channels and bands: 2.4, 5 and 6 GHz, channel width, non-overlapping channels, regulatory impacts",
  "objectives": [
   "Students will be able to compare the 2.4, 5 and 6 GHz bands in range, penetration, capacity and client support.",
   "Students will be able to select non-overlapping channels and an appropriate channel width for a given deployment density.",
   "Students will be able to distinguish co-channel interference from adjacent-channel interference.",
   "Students will be able to explain regulatory impacts including DFS, transmit power control and country codes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Let students suggest strategies, then reveal that this is exactly the channel planning problem."
   ],
   [
    12,
    "Teach",
    "Draw the 2.4 GHz channels as overlapping arcs on the whiteboard to show why only 1, 6 and 11 work. Compare the three bands in a quick table. Show how channel width halves the number of available channels each time, then explain DFS, TPC and country codes."
   ],
   [
    15,
    "Activity",
    "Run the Floor Plan Channel Map activity (see activity)."
   ],
   [
    8,
    "Discuss",
    "Compare group plans on the projector, highlight any overlap or wide-channel choices, and ask the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "Thirty people in one room each want to talk to a partner at the same time. How would you organize the room so people can hear each other?",
  "activity": {
   "title": "Floor Plan Channel Map",
   "materials": "Printed floor plans showing 9 to 12 access point locations, colored markers or colored sticky dots for channels, a printed channel reference sheet for 2.4 and 5 GHz, and optionally student laptops with a free browser-based Wi-Fi channel planner or drawing tool.",
   "steps": [
    "Small groups receive a floor plan of a school wing with access points marked and a scenario card stating the client density.",
    "Groups assign 2.4 GHz channels using only 1, 6 and 11 so that no two neighboring access points share a channel, coloring each access point.",
    "Groups then choose a 5 GHz channel width for their scenario, count how many distinct channels that leaves, and assign channels, noting which ones are DFS.",
    "The teacher hands each group a twist card (a nearby airport, a microwave in the break room, or a move to a different country) and the group adjusts its plan and writes one sentence explaining the change."
   ]
  },
  "discussion": [
   "Why might letting a controller choose channels automatically be better or worse than a manual plan?",
   "When would a wide 160 MHz channel actually be the right choice?",
   "How does moving to 6 GHz change the number of access points you might need?"
  ],
  "exit": [
   [
    "What are the three non-overlapping 2.4 GHz channels in North America?",
    "1, 6 and 11."
   ],
   [
    "Which is worse, co-channel or adjacent-channel interference, and why?",
    "Adjacent-channel interference, because overlapping signals corrupt frames and cause retransmissions; co-channel interference only forces devices to take turns."
   ],
   [
    "What does DFS require an access point to do?",
    "Listen for radar on certain 5 GHz channels and move off the channel if radar is detected."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups a pre-drawn honeycomb template with three colors to fill in, and limit their first task to 2.4 GHz only.",
   "Extend: Ask fast finishers to plan the same floor at 20, 40 and 80 MHz on 5 GHz, count reusable channels for each, and recommend one width with a justification."
  ]
 },
 {
  "t": "802.11 standards, SSID/BSSID/ESSID, autonomous vs controller-based APs, mesh networks",
  "objectives": [
   "Students will be able to match 802.11a, b, g, n, ac, ax and be to their bands, generation names and key features.",
   "Students will be able to distinguish SSID, BSSID, BSS, ESS and IBSS and interpret a wireless scan.",
   "Students will be able to compare autonomous and controller-based access point deployments and choose one for a scenario.",
   "Students will be able to explain the benefits and throughput trade-offs of wireless mesh networks."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and have students check how many Wi-Fi networks and access points their phones or laptops see. Write a few names on the board."
   ],
   [
    12,
    "Teach",
    "Project a timeline of 802.11 standards with bands and generation names, emphasizing that 802.11ac is 5 GHz only and 802.11ax adds OFDMA. Then draw two access points sharing an SSID to show BSSIDs and an ESS. Contrast autonomous and controller-based management, and sketch a mesh with one wired root."
   ],
   [
    15,
    "Activity",
    "Run the Standards Card Sort and Scan Reading activity (see activity)."
   ],
   [
    8,
    "Discuss",
    "Review the scan interpretations as a class and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Walk from one end of a big store or campus to the other with your phone. The Wi-Fi name never changes, but are you connected to the same device the whole way? How could you find out?",
  "activity": {
   "title": "Standards Card Sort and Scan Reading",
   "materials": "Printed cards the teacher makes (one per standard: a, b, g, n, ac, ax, 6E, be) and a separate set of feature cards (bands, MIMO, MU-MIMO, OFDMA, 40/80/160 MHz, generation name); a printed mock wireless scan table listing SSIDs, BSSIDs, channels and signal strengths; whiteboard.",
   "steps": [
    "In small groups, students match each feature card to the standard that introduced or supports it and lay the standards out in chronological order.",
    "Groups check their sort against a projected key and correct errors, noting the ones they missed.",
    "Groups receive the mock wireless scan and answer: how many networks, how many radios, which entries form an ESS, and which might be a single autonomous access point in a neighbor's office.",
    "Each group gets a deployment card (a 3-person office, a 300-access-point campus, an outdoor courtyard with no cable) and writes a two-sentence recommendation choosing autonomous, controller-based or mesh."
   ]
  },
  "discussion": [
   "Why might an organization disable the oldest data rates even if a few old devices stop working?",
   "Who should decide when a device roams, the client or the network, and what are the trade-offs?",
   "What are the risks of depending on a cloud controller for access point management?"
  ],
  "exit": [
   [
    "Which standards operate only in 5 GHz?",
    "802.11a and 802.11ac."
   ],
   [
    "What is the difference between an SSID and a BSSID?",
    "The SSID is the network name; the BSSID uniquely identifies one access point radio, usually by its MAC address."
   ],
   [
    "Why does throughput drop at mesh points far from the root node?",
    "Each wireless hop uses airtime and adds latency, so every extra hop reduces available throughput."
   ]
  ],
  "differentiation": [
   "Support: Give students a partially completed standards table with the bands filled in, so they only need to add generation names and one key feature for each.",
   "Extend: Ask fast finishers to explain how 802.11k, 802.11r and 802.11v each improve roaming and which problem with sticky clients each addresses."
  ]
 },
 {
  "t": "Wireless security: WPA2/WPA3 Personal and Enterprise, PSK vs 802.1X, captive portals; antenna types",
  "objectives": [
   "Students will be able to compare WPA2 and WPA3, including SAE, forward secrecy and Protected Management Frames.",
   "Students will be able to choose between Personal (PSK) and Enterprise (802.1X with RADIUS) modes based on a scenario's requirements.",
   "Students will be able to describe the 802.1X roles and login sequence and explain what a captive portal does and does not provide.",
   "Students will be able to select omnidirectional or directional antennas for coverage and leakage goals."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the shared house key. List the problems students raise on the board."
   ],
   [
    12,
    "Teach",
    "Contrast WEP, WPA, WPA2 and WPA3 in a quick timeline. Draw Personal and Enterprise side by side, then walk the 802.1X sequence with supplicant, authenticator and RADIUS server. Explain captive portals and OWE, and finish by sketching omnidirectional and directional antenna patterns."
   ],
   [
    15,
    "Activity",
    "Run the 802.1X Role-Play and Design Cards activity (see activity)."
   ],
   [
    8,
    "Discuss",
    "Debrief the role-play, especially the round where the client did not check the server certificate. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on index cards."
   ]
  ],
  "warmup": "Your family shares one house key, and copies have been given to a dog walker, a neighbor and a former roommate. One of them should no longer get in. What are your options, and what would a better system look like?",
  "activity": {
   "title": "802.1X Role-Play and Design Cards",
   "materials": "Printed role cards (Supplicant, Authenticator, RADIUS Server, Evil Twin), printed credential and certificate slips, a printed set of six scenario design cards, and a whiteboard to record the message flow.",
   "steps": [
    "Three students play supplicant, authenticator and RADIUS server, passing paper slips to act out association, EAP relay, server certificate, client credentials, Access-Accept and VLAN assignment while the class records each step on the board.",
    "Repeat with a fourth student playing an evil twin access point; this time the supplicant does not check the server certificate, and the class identifies where the credentials were exposed and which setting would have prevented it.",
    "In pairs, students draw scenario design cards (a coffee shop, a hospital, a 4-person office, a hotel, a two-building campus link, a finance team needing individual revocation) and choose a security mode, an authentication method and an antenna type for each.",
    "Pairs swap cards with a neighbor and justify one choice they disagree on."
   ]
  },
  "discussion": [
   "Why do many organizations still run WPA2/WPA3 transition mode, and when should they turn it off?",
   "What would you tell a cafe owner who believes the captive portal makes their Wi-Fi secure?",
   "Is limiting signal leakage with antennas and power a real security control or just a bonus? Why?"
  ],
  "exit": [
   [
    "What handshake does WPA3-Personal use, and what attack does it resist?",
    "SAE (Simultaneous Authentication of Equals); it resists offline dictionary or password-guessing attacks against captured handshakes."
   ],
   [
    "A company must revoke individual users' Wi-Fi access. Which mode and what server does it need?",
    "Enterprise mode with 802.1X and a RADIUS server."
   ],
   [
    "Which antenna type suits a point-to-point link between two buildings?",
    "A directional antenna such as a Yagi or parabolic dish."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-column comparison sheet (Personal vs Enterprise) with prompts for key, users, revocation and logging to fill in during the teach segment, and pair them with a confident partner for the role-play.",
   "Extend: Ask fast finishers to compare PEAP and EAP-TLS, explain why EAP-TLS is considered strongest, and describe what a certificate infrastructure must provide for it to work."
  ]
 },
 {
  "t": "Physical installation: IDF/MDF, rack sizes, port-side exhaust/intake, cable management, patch panels",
  "objectives": [
   "Students will be able to distinguish the MDF, IDFs and demarc and explain how backbone and horizontal cabling connect them.",
   "Students will be able to calculate rack space in rack units and plan device placement, including heavy items at the bottom.",
   "Students will be able to choose port-side intake or port-side exhaust based on which aisle a switch's ports face.",
   "Students will be able to identify good cable management and patch panel practices and the 90 m / 100 m copper limits."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a projected photo-style sketch of a messy rack and ask the warm-up question. Collect observations on the board."
   ],
   [
    12,
    "Teach",
    "Draw a building cross-section with the demarc, MDF, and an IDF on each floor, labeling backbone and horizontal cabling and the 90 m / 100 m limits. Then draw a top view of a hot aisle/cold aisle row and walk through the port-side intake versus exhaust decision. Finish with rack units, rack types and patch panel practice."
   ],
   [
    15,
    "Activity",
    "Run the Build-a-Rack Elevation activity (see activity)."
   ],
   [
    8,
    "Discuss",
    "Groups present their rack elevations; the class critiques airflow and placement. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a half sheet."
   ]
  ],
  "warmup": "Look at this rack. List three things you would change before you trusted it to run a business, and say why each matters.",
  "activity": {
   "title": "Build-a-Rack Elevation",
   "materials": "Printed blank 24U rack elevation sheets (front and rear), printed equipment cutouts sized in U (switches, patch panels, cable managers, firewall, UPS, blanking panels) with airflow arrows, scissors or pre-cut cards, tape, and a printed scenario sheet stating which aisle each rack side faces.",
   "steps": [
    "Small groups receive a scenario: an IDF rack with the rear facing the hot aisle, a list of equipment and a requirement for 25% spare space.",
    "Groups calculate the total U required, decide whether the 24U rack is enough, and place the cutouts on the elevation, putting heavy items low and adding cable managers and blanking panels.",
    "For each switch, groups decide which way its ports face and select the port-side intake or port-side exhaust fan card, drawing airflow arrows to prove hot air ends up in the hot aisle.",
    "Groups label each patch panel port range and write two cable management rules they would post on the rack door."
   ]
  },
  "discussion": [
   "Why does the industry separate permanent cabling from patch cords instead of running cables straight to switches?",
   "What problems might appear months later from a rack installed with mixed airflow directions?",
   "Who should be responsible for keeping labels and cable maps up to date, and how would you enforce it?"
  ],
  "exit": [
   [
    "Which room holds the core equipment near where the carrier enters, and which rooms serve each floor?",
    "The MDF is the central room near the demarc; IDFs serve each floor or area."
   ],
   [
    "A switch's ports face the hot aisle. Which fan option should you order?",
    "Port-side exhaust."
   ],
   [
    "How tall is 1U, and what is the maximum length of a permanent horizontal copper run?",
    "1U is 1.75 inches; the permanent horizontal run is limited to 90 meters (100 meters total with patch cords)."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups a reference card showing the hot aisle/cold aisle top view with arrows and a two-line decision rule for fan direction, plus pre-totaled equipment heights.",
   "Extend: Ask fast finishers to design the cabling plan for a three-floor building, stating where IDFs go, what media connects them to the MDF and why, and how they would label patch panels."
  ]
 },
 {
  "t": "Power and environment: UPS, PDU, PoE/PoE+ budgets, temperature, humidity, fire suppression",
  "objectives": [
   "Students will be able to compare standby, line-interactive and online UPS designs and choose one for a scenario.",
   "Students will be able to calculate whether a PoE switch's power budget supports a given set of devices.",
   "Students will be able to recall the per-port power of 802.3af, 802.3at and 802.3bt and predict what happens when a device needs more than a port provides.",
   "Students will be able to explain the effects of temperature and humidity on equipment and select appropriate fire suppression for an equipment room."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the kitchen circuit breaker and let two or three students explain what happens."
   ],
   [
    12,
    "Teach",
    "Draw the power chain on the board: utility, generator, UPS, A and B PDUs, dual power supplies. Compare the three UPS types. Write the PoE standards table and work the 370 W example together. Finish with temperature, humidity extremes and the three fire suppression options."
   ],
   [
    15,
    "Activity",
    "Run the PoE Budget Challenge (see activity)."
   ],
   [
    8,
    "Discuss",
    "Groups share their purchase recommendations and justify headroom choices. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions individually."
   ]
  ],
  "warmup": "Your kitchen has six outlets. Each one can run a space heater, but when you plug in three heaters at once, the breaker trips. Why, if every outlet is rated for a heater?",
  "activity": {
   "title": "PoE Budget Challenge",
   "materials": "Printed device cards showing a device type and its wattage (cameras, phones, access points, a PTZ camera that needs 802.3bt), printed switch spec cards with port counts, PoE standard and total budget, calculators or student laptops with a browser calculator, and a whiteboard.",
   "steps": [
    "Groups receive a building scenario card listing the devices to be powered and a requirement for headroom (for example 20 percent).",
    "Groups total the wattage, add headroom, and choose the smallest switch from the spec cards that meets both the budget and the per-port standard each device needs.",
    "The teacher reveals a twist: five more access points are added, or one device needs 802.3bt. Groups recalculate and decide whether to upgrade, add a second switch, or set port priorities.",
    "Each group also chooses a UPS type and a fire suppression method for the closet and writes one sentence justifying each."
   ]
  },
  "discussion": [
   "Why is powering phones and access points through PoE often more resilient during a power outage than local power bricks?",
   "How much headroom would you plan for in a PoE budget, and what drives that decision?",
   "What are the safety trade-offs of clean-agent suppression compared with sprinklers?"
  ],
  "exit": [
   [
    "A 24-port PoE+ switch has a 370 W budget. How many 25 W access points can it power?",
    "14, because 370 / 25 = 14.8 and you cannot power part of a device."
   ],
   [
    "Which UPS design has no transfer time, and why?",
    "The online (double-conversion) UPS, because it always powers equipment from its inverter."
   ],
   [
    "What risk does very low humidity create in an equipment room?",
    "Increased electrostatic discharge, which can damage components."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a step-by-step budget worksheet (list devices, multiply, add, apply headroom, compare to budget) and the PoE standards table printed on the same page.",
   "Extend: Ask fast finishers to design a fully redundant power path for a critical rack, from utility to device, naming each component and the single point of failure it removes."
  ]
 },
 {
  "t": "Documentation: physical vs logical diagrams, rack diagrams, cable maps, IPAM, asset inventory, SLAs, wireless surveys",
  "objectives": [
   "Students will be able to distinguish physical and logical diagrams and identify which layer a diagram describes.",
   "Students will be able to select the correct document (rack diagram, cable map, IPAM, asset inventory, SLA or wireless survey) for a troubleshooting or audit question.",
   "Students will be able to calculate allowed downtime from an SLA uptime percentage and measurement period.",
   "Students will be able to compare predictive, on-site, passive and active wireless surveys."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and gather answers. Point out that each answer maps to a specific type of document."
   ],
   [
    10,
    "Teach",
    "Project a simple physical diagram and a logical diagram of the same small network side by side and ask students to spot the differences. Briefly introduce rack diagrams, cable maps, IPAM and asset inventory with one example question each. Work through 99.9 percent uptime per year and per month on the board, then summarize wireless survey types."
   ],
   [
    17,
    "Activity",
    "Run the Document Detective stations (see activity)."
   ],
   [
    8,
    "Discuss",
    "Review each station's answers and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions individually."
   ]
  ],
  "warmup": "You have just been hired to fix the network at a business where the only IT person quit with no notice. What information would you want written down before you touch anything?",
  "activity": {
   "title": "Document Detective",
   "materials": "Four printed station packets the teacher makes: (1) a physical and a logical diagram of the same network, (2) a rack diagram plus a cable map excerpt, (3) an IPAM table excerpt and an asset inventory excerpt, (4) an SLA paragraph and a printed wireless heat map; question cards for each station; calculators or student laptops with a browser calculator.",
   "steps": [
    "Divide the class into four groups and place one station packet at each table with three question cards (for example, which port is jack 2-205 patched to, which address is free in 10.2.40.0/24, was the SLA met).",
    "Groups spend about four minutes at each station, answering the question cards and writing which document they used.",
    "At the SLA station, groups calculate the allowed downtime for the stated period and decide whether a credit is owed.",
    "Back in their seats, each group writes one documentation gap they noticed in the packets (for example, a cable map entry that conflicts with the rack diagram) and how it should be fixed."
   ]
  },
  "discussion": [
   "Why does documentation so often go out of date, and what process would keep it current?",
   "Where should network documentation be stored so it is available during an outage but protected from attackers?",
   "Is 99.999 percent uptime always worth paying for? How would you decide what a business really needs?"
  ],
  "exit": [
   [
    "A diagram shows VLAN IDs, subnets and firewall zones. Is it physical or logical?",
    "Logical, because it shows how data flows and is addressed rather than how devices are cabled."
   ],
   [
    "Which document tells you which switch port a wall jack is patched to?",
    "The cable map (cable schedule), together with labels on the cable ends."
   ],
   [
    "About how much downtime per year does 99.9 percent uptime allow?",
    "About 8.8 hours per year."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a matching sheet that pairs each document type with a one-line question it answers, and a pre-structured SLA calculation template (total time, allowed percentage, allowed downtime).",
   "Extend: Ask fast finishers to draft a change-management checklist that names which documents must be updated after adding a new switch, a new VLAN and a new access point."
  ]
 },
 {
  "t": "Life-cycle management: end of life/support, software and firmware management, decommissioning",
  "objectives": [
   "Students will be able to distinguish end of sale, end of life and end of support and explain the security risk of running unsupported devices.",
   "Students will be able to sequence the steps of a controlled firmware upgrade, including release notes, hash verification, backup, change window and rollback.",
   "Students will be able to recommend compensating controls for a device that must remain in service past end of support.",
   "Students will be able to describe how to decommission and sanitize a network device and what records to keep."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the old phone and collect three or four answers on the whiteboard, grouping them into 'data on it' and 'still getting updates'."
   ],
   [
    12,
    "Teach",
    "Draw a timeline across the board: procurement, deployment, operation, end of sale, end of support, decommission. Explain each vendor milestone and stress that the risk begins at end of support. Walk through the upgrade sequence and project the backup, hash verification and show version commands."
   ],
   [
    18,
    "Activity",
    "Run the 'Upgrade night' card sort described below in groups of three or four, then have each group present its order and one justification."
   ],
   [
    5,
    "Discuss",
    "Pose the discussion questions, focusing on the clinic firewall scenario and what compensating controls are realistic."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them on the door as they leave."
   ]
  ],
  "warmup": "You are about to sell your old phone online. What would you do to it first, and would you still use it yourself if the maker had stopped sending security updates two years ago? Why or why not?",
  "activity": {
   "title": "Upgrade night and retirement day card sort",
   "materials": "Printed cards (one set per group) with steps such as 'read release notes', 'verify image hash', 'back up configuration', 'raise change request', 'test on pilot device', 'check flash space', 'keep previous image', 'verify after reload', 'confirm nothing depends on the device', 'revoke certificates', 'wipe storage', 'obtain certificate of destruction', plus two distractor cards ('install newest build immediately', 'skip backup to save time'); whiteboard or table space.",
   "steps": [
    "Give each group the shuffled cards and explain there are two processes mixed together: a firmware upgrade and a device retirement.",
    "Groups separate the cards into the two processes and discard any card that does not belong in a controlled process.",
    "Groups put each process in order, taping or laying the cards out in a line.",
    "Each group picks the one step it thinks is most often skipped in real life and writes the consequence of skipping it on a sticky note.",
    "Groups compare orders with a neighboring group and resolve differences, then the teacher reveals a reference order and discusses any defensible variations."
   ]
  },
  "discussion": [
   "A department head says the old firewall still works perfectly, so replacing it is a waste of money. How would you explain the risk in business terms?",
   "Which is worse: an upgrade with no rollback plan or a decommission with no sanitization? What does each put at risk?",
   "How could lapsed licenses cause a security gap that nobody notices for months?"
  ],
  "exit": [
   [
    "What is the main security risk of running a device past its end-of-support date?",
    "Newly discovered vulnerabilities will never be patched by the vendor, so the device stays exposed; replace it or isolate it with compensating controls."
   ],
   [
    "Name three things you should do before installing new firmware on a production switch.",
    "Any three of: read release notes, verify the image hash, test in a lab or pilot, get change approval and a maintenance window, back up the configuration, confirm flash space, keep the old image for rollback."
   ],
   [
    "Why must a router be sanitized before disposal, and what document proves it was done?",
    "Its configuration can hold password hashes, SNMP strings, VPN keys and certificates; a certificate of destruction or sanitization record proves it."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially completed timeline and the upgrade cards with the first and last steps already placed, and pair them with a peer who reads each card aloud.",
   "Extend: Ask fast finishers to write a one-paragraph risk exception for a switch that must stay in service six months past end of support, naming at least three compensating controls and a retirement date."
  ]
 },
 {
  "t": "Change management and configuration management: baselines, golden configs, backups",
  "objectives": [
   "Students will be able to list the components of a change request and describe the path from submission to closure, including the role of the CAB.",
   "Students will be able to classify changes as standard, normal or emergency and explain why each still needs a rollback plan.",
   "Students will be able to distinguish a configuration baseline, a performance baseline and a golden configuration and identify configuration drift from a diff.",
   "Students will be able to explain why the running configuration must be saved and why backups must be stored off-device and tested."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the Lakeside Freight hook aloud and ask the warm-up question. Collect answers on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Draw the change flow as boxes on the board (request, review, approve, schedule, implement, verify, close). Explain standard, normal and emergency changes. Define the two baselines and the golden config, then project the diff and ask the class to spot the drift."
   ],
   [
    18,
    "Activity",
    "Run the CAB role-play described below in groups of four or five."
   ],
   [
    5,
    "Discuss",
    "Bring the groups together and compare which requests were approved or sent back and why."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "A coworker made a late-night change that broke something, then went home. List everything you wish they had written down before they started.",
  "activity": {
   "title": "Change advisory board role-play",
   "materials": "Printed change request cards the teacher prepares (four or five requests, each deliberately missing something such as a rollback plan, an impact statement, a maintenance window or a test plan, and one complete standard change), printed approval checklists, sticky notes, whiteboard.",
   "steps": [
    "Split the class into groups and assign roles in each: requester, network lead, security reviewer, service owner and CAB chair.",
    "Give each group the stack of change request cards. The requester presents each card in under a minute.",
    "The board reviews each request against the checklist and decides: approve, approve as a standard change, or send back. For any send-back, they write the missing item on a sticky note.",
    "Introduce a surprise emergency request (an actively exploited service must be blocked) and have the group decide how to handle it quickly while still documenting it.",
    "Each group writes one strong rollback plan for its riskiest approved change, including a trigger, the exact restore step and who decides."
   ]
  },
  "discussion": [
   "Why might engineers see change management as bureaucracy, and how would you persuade them it saves time?",
   "Should a change that has been done safely fifty times become a standard change? What evidence would you want first?",
   "How do configuration monitoring and change tickets work together to separate authorized changes from unauthorized ones?"
  ],
  "exit": [
   [
    "Name four things a complete change request should contain.",
    "Any four of: what will change, the reason, risk and impact, implementation steps, test plan, rollback plan, schedule or maintenance window."
   ],
   [
    "What is configuration drift, and what tool or practice detects it?",
    "The gradual divergence of devices from the approved baseline or golden config; configuration monitoring that compares current configs with the golden config detects it."
   ],
   [
    "A switch loses a verified change after a reboot. What command step was missed?",
    "Saving the running configuration to the startup configuration, for example copy running-config startup-config."
   ]
  ],
  "differentiation": [
   "Support: Provide a change request template with labeled blanks and a one-page glossary of CAB, rollback, maintenance window, golden config and drift for students to use during the role-play.",
   "Extend: Ask advanced students to write the configuration monitoring rule they would create to catch the Telnet drift in the diff example and describe what the alert should contain and who it should go to."
  ]
 },
 {
  "t": "Monitoring: SNMP versions, traps, MIBs, flow data, packet capture, baselines, log aggregation and syslog, API integration",
  "objectives": [
   "Students will be able to explain how SNMP managers, agents, MIBs, OIDs, polls and traps work, including the ports used.",
   "Students will be able to compare SNMPv1, v2c and v3 and recommend the secure configuration.",
   "Students will be able to choose between SNMP, flow data, packet capture and syslog for a given monitoring question.",
   "Students will be able to interpret syslog severity levels and predict which messages a given logging level will send."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the slow afternoon and list student ideas for 'what data would you want' on the board."
   ],
   [
    13,
    "Teach",
    "Draw the depth ladder: SNMP, flow, packet capture, with syslog to the side. Explain manager, agent, MIB, OID, UDP 161 and 162 and the SNMP versions. Project the configuration and syslog line, decoding facility, severity and mnemonic. Teach the severity list and its memory aid."
   ],
   [
    17,
    "Activity",
    "Run the 'Which tool answers it' station activity described below."
   ],
   [
    5,
    "Discuss",
    "Review the trickiest cards and discuss when two tools could both work."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions individually."
   ]
  ],
  "warmup": "The internet is slow every afternoon at two. Before touching anything, what three facts would you want to know, and where might each fact come from?",
  "activity": {
   "title": "Which tool answers it",
   "materials": "Printed question cards (about twelve monitoring questions, such as 'Which host used the most WAN bandwidth yesterday?', 'Why does the TLS handshake fail?', 'Did the core switch's power supply fail at 3 a.m.?', 'Is the link busier than normal?'), four labeled areas of the whiteboard (SNMP, Flow data, Packet capture, Syslog/SIEM), a printed list of eight syslog messages with severity numbers, sticky notes.",
   "steps": [
    "Pairs draw question cards and place each under the data source that answers it best, writing a one-line reason on a sticky note.",
    "For each card, pairs also note whether the answer depends on a baseline.",
    "Hand out the syslog list. Tell pairs a device is set to logging level 4 and have them cross out every message that would not reach the server.",
    "Pairs swap boards with another pair and challenge any placement they disagree with.",
    "The teacher reviews the contested cards with the whole class."
   ]
  },
  "discussion": [
   "Why might an organization still run SNMPv2c today, and what would you do to reduce the risk until it can move to SNMPv3?",
   "What privacy concerns come with packet captures, and how should capture files be handled?",
   "How does accurate time on every device change what a SIEM can do?"
  ],
  "exit": [
   [
    "Which UDP ports do SNMP polls and SNMP traps use?",
    "Polls go to agents on UDP 161; traps go to the manager on UDP 162."
   ],
   [
    "A link is saturated. Which data source shows which hosts are responsible, and why is it preferred over a packet capture?",
    "Flow data such as NetFlow or IPFIX, because it summarizes who talked to whom and how much with far less data to store and analyze."
   ],
   [
    "A router logs at level 3. Will a severity 4 warning reach the syslog server?",
    "No. Level 3 sends severities 0 through 3 only, and 4 is less severe."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference card with the depth ladder, the port numbers and the severity list, and let them work the station activity with that card in hand.",
   "Extend: Ask fast finishers to calculate utilization from two interface counter readings taken 300 seconds apart on a 100 Mbps link, and explain why a 32-bit counter could give a wrong answer on a fast link."
  ]
 },
 {
  "t": "Monitoring solutions: network discovery, traffic analysis, performance and availability monitoring, configuration monitoring",
  "objectives": [
   "Students will be able to match a monitoring need to discovery, traffic analysis, performance, availability or configuration monitoring.",
   "Students will be able to explain why application-level checks are needed in addition to ping for availability monitoring.",
   "Students will be able to describe how dependencies and alert tuning reduce alert fatigue.",
   "Students will be able to explain how scheduled discovery and configuration monitoring expose rogue devices and unauthorized changes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the Pinecrest hook and ask students which of the three weekend problems they would fix first and why."
   ],
   [
    12,
    "Teach",
    "Write the five capabilities across the board with the question each answers. Project the nmap output and explain discovery. Walk through synthetic checks, application-level checks and dependencies, drawing a parent router with child devices to show alert suppression."
   ],
   [
    18,
    "Activity",
    "Run the 'Design the dashboard' group activity described below."
   ],
   [
    5,
    "Discuss",
    "Groups compare their alert rules and the class votes on the best dependency design."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your phone gets 300 alerts in four minutes. What do you do with alert number 301, and what does that tell you about how alerts should be designed?",
  "activity": {
   "title": "Design the dashboard",
   "materials": "Printed one-page network diagram of a small company (core router, two distribution switches, six access switches, a web server, a WAN link to a branch), printed scenario cards describing five problems (rogue access point, choppy branch video, web service down while host pings, unauthorized config change, core router failure), sticky notes in two colors, whiteboard.",
   "steps": [
    "Groups of three receive the diagram and scenario cards.",
    "For each scenario, groups write on a sticky note which capability would detect it and which data source it would use, and place it on the diagram where the check would run.",
    "Groups draw dependency arrows on the diagram so that a core router failure produces one root alert instead of dozens.",
    "Groups write two alert rules with thresholds, for example how many failed checks before paging, using the second sticky note color.",
    "Each group presents its design in one minute, and the class identifies any scenario a group's design would still miss."
   ]
  },
  "discussion": [
   "Why might a team that only monitors availability be surprised by user complaints?",
   "Who should receive which alerts, and what happens when every alert goes to everyone?",
   "How should a monitoring system be kept accurate as devices are added and retired?"
  ],
  "exit": [
   [
    "A manager asks what is using most of the WAN bandwidth. Which capability answers this?",
    "Traffic analysis, using flow data to find top talkers and top applications."
   ],
   [
    "A web server pings successfully but the site will not load. What kind of check would detect this?",
    "An application-level check that requests the page and verifies expected content."
   ],
   [
    "What reduces the flood of alerts when an upstream router fails?",
    "Dependencies that mark devices behind the failed router as unreachable and suppress their alerts, so only the root cause alerts."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a five-row matching table (need on the left, capability on the right) to complete before the group activity, and allow them to use it during the design.",
   "Extend: Ask fast finishers to design a synthetic test for the branch video problem, naming the metrics it measures, how often it runs and the thresholds that would raise an alert."
  ]
 },
 {
  "t": "Disaster recovery metrics: RPO, RTO, MTTR, MTBF; hot, warm and cold sites; active-active vs active-passive; DR testing",
  "objectives": [
   "Students will be able to define RPO, RTO, MTBF and MTTR and calculate MTBF and MTTR from failure data.",
   "Students will be able to select a hot, warm or cold site to meet a stated RTO and RPO and justify the cost trade-off.",
   "Students will be able to compare active-active and active-passive designs, including capacity sizing.",
   "Students will be able to order DR test types from least to most disruptive and choose one for a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about losing homework and write the two answers students give (how much work lost, how long to recover) as RPO and RTO."
   ],
   [
    13,
    "Teach",
    "Draw a timeline with the disaster in the middle: RPO pointing backward, RTO pointing forward. Work the MTBF and MTTR example on the board. Draw three boxes for hot, warm and cold sites with cost and speed arrows. Sketch active-active and active-passive and do the 70 percent capacity math."
   ],
   [
    17,
    "Activity",
    "Run the 'Pick the site' budget game described below."
   ],
   [
    5,
    "Discuss",
    "Groups share their most expensive and cheapest choices and defend them."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Your laptop dies while you are writing a long assignment. What two things decide how bad that is for you?",
  "activity": {
   "title": "Pick the site: a DR budget game",
   "materials": "Printed service cards (six services, each with an RPO, an RTO and a short description, such as online ordering, payroll, email, an internal wiki, a warehouse scanning system and an archive server), printed price cards for options (nightly backup, hourly snapshots, continuous replication, cold site, warm site, hot site, cloud recovery), a fixed budget in points written on the board, calculators or phones.",
   "steps": [
    "Groups of three get the service cards and price cards and a budget in points.",
    "For each service, groups choose a backup or replication method and a recovery site option that meets both its RPO and RTO.",
    "Groups total the cost. If they exceed the budget, they must write a note to management proposing which targets to relax and why.",
    "Give each group a failure log for one switch (three failure times and repair times) and have them calculate MTBF and MTTR.",
    "Groups choose which DR test to run first for their most critical service and explain why in one sentence."
   ]
  },
  "discussion": [
   "Who should set RPO and RTO: the IT team or the business, and why?",
   "When might active-passive be a better choice than active-active even though half the equipment sits idle?",
   "What should happen after a DR test reveals that a step in the plan is wrong?"
  ],
  "exit": [
   [
    "A service can lose no more than 1 hour of data and must be back within 8 hours. Which value is the RPO and which is the RTO?",
    "RPO is 1 hour (data loss) and RTO is 8 hours (downtime)."
   ],
   [
    "Repairs took 1, 3 and 5 hours. What is the MTTR, and is lower or higher better?",
    "3 hours; lower is better."
   ],
   [
    "Which recovery site fits an RTO of 15 minutes, and why not a warm site?",
    "A hot site, because a warm site still needs data restored and systems configured, which takes hours."
   ]
  ],
  "differentiation": [
   "Support: Provide a worked example card for MTBF and MTTR and a one-line definition card for each site type, and let struggling students handle three of the six services in the budget game.",
   "Extend: Ask fast finishers to calculate what capacity each site in an active-active pair can safely run at if a third site is added and the design must survive one site failure."
  ]
 },
 {
  "t": "DHCP: scopes, exclusions, reservations, lease time, options, relay/IP helper; SLAAC for IPv6",
  "objectives": [
   "Students will be able to describe the DORA exchange and the T1 and T2 renewal timers.",
   "Students will be able to configure a scope design using exclusions, reservations, lease times and options for a given network.",
   "Students will be able to troubleshoot APIPA addresses by distinguishing relay failures, scope exhaustion and rogue DHCP servers.",
   "Students will be able to explain how SLAAC and the M and O flags determine IPv6 address and option assignment."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and have students check their own laptop's IP configuration to find their DHCP server and lease expiry."
   ],
   [
    12,
    "Teach",
    "Act out DORA with two students (client and server) passing paper notes, with the client shouting the broadcasts. Project the ipconfig output. Explain scope, exclusion, reservation, lease and the options. Draw a router between a VLAN and the server to show why the relay is needed. Finish with SLAAC and the M and O flags."
   ],
   [
    18,
    "Activity",
    "Run the 'DHCP help desk' troubleshooting activity described below."
   ],
   [
    5,
    "Discuss",
    "Review each ticket's root cause as a class."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Open a command prompt or network settings on your laptop. Which server gave you your address, and when does your lease expire? What do you think happens when it does?",
  "activity": {
   "title": "DHCP help desk",
   "materials": "Printed ticket cards (five or six), each with a symptom and a short evidence excerpt such as ipconfig output, a scope summary or a router interface configuration; a printed DHCP option reference (options 3, 6, 15, 42, 66); whiteboard; student laptops optional for checking their own settings.",
   "steps": [
    "Pairs receive the ticket cards. Tickets include a VLAN with no IP helper, an exhausted guest scope with 8-day leases, a rogue DHCP server handing out 192.168.0.x, a printer that keeps changing address, phones that cannot find their TFTP server, and an IPv6 host with the O flag set.",
    "For each ticket, pairs identify the root cause from the evidence and write it in one sentence.",
    "Pairs write the fix, naming the exact feature (relay, lease time, scope size, DHCP snooping, reservation, option number).",
    "Pairs design a scope for a new 50-user office VLAN: range, exclusions for static devices, one reservation, lease time and options.",
    "Two pairs compare scope designs and explain one choice they made differently."
   ]
  },
  "discussion": [
   "When should a device use a DHCP reservation instead of a static address configured on the device itself?",
   "How long should leases be on a coffee-shop guest network versus a hospital's wired workstation network, and why?",
   "Why is a rogue DHCP server a security risk and not just an annoyance?"
  ],
  "exit": [
   [
    "List the four DORA messages in order.",
    "Discover, Offer, Request, Acknowledge."
   ],
   [
    "Only one VLAN's clients receive 169.254 addresses while all other VLANs work. What is the most likely cause?",
    "A missing or incorrect DHCP relay (IP helper address) on that VLAN's router interface or SVI."
   ],
   [
    "What is the difference between an exclusion and a reservation?",
    "An exclusion is never handed out; a reservation is always handed to one specific MAC address or client ID."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a flowchart (does any client get an address, is it one VLAN or all, are new or existing clients failing, is the address range unexpected) to work through each ticket.",
   "Extend: Ask fast finishers to explain what an IPv6 host does when a router advertisement has the M flag set, and why the host still needs the router advertisement even when DHCPv6 provides its address."
  ]
 },
 {
  "t": "DNS: record types (A, AAAA, CNAME, MX, TXT, NS, PTR, SOA), zones, recursive vs authoritative, DNSSEC, DoH/DoT, hosts file",
  "objectives": [
   "Students will be able to identify the purpose of A, AAAA, CNAME, MX, TXT, NS, PTR and SOA records and choose the right record for a scenario.",
   "Students will be able to trace a DNS lookup from client to recursive resolver to root, TLD and authoritative servers, distinguishing recursive and iterative queries.",
   "Students will be able to explain how TTL, SOA serial numbers and zone transfers affect when DNS changes take effect.",
   "Students will be able to compare DNSSEC with DoH and DoT and explain the role of the hosts file in troubleshooting."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let a few students guess how a name becomes an address."
   ],
   [
    12,
    "Teach",
    "Draw the resolution path on the board: PC, resolver, root, .com, authoritative. Walk through each record type with a one-line example. Project the dig and nslookup output. Explain TTL and the SOA serial, then contrast DNSSEC (signed) with DoH and DoT (encrypted)."
   ],
   [
    18,
    "Activity",
    "Run the 'Human DNS' role-play and record-matching activity described below."
   ],
   [
    5,
    "Discuss",
    "Discuss the Summit Outdoor Supply hook and map each symptom to a DNS concept."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You type a website name and press Enter. Before the page appears, your computer needs a number. Where do you think it gets that number, and what could go wrong along the way?",
  "activity": {
   "title": "Human DNS and record matching",
   "materials": "Printed role cards (client, recursive resolver, root server, .com server, example.com authoritative server), a printed zone file for a fictional domain with eight record types, printed scenario cards (such as 'add a mail server', 'verify domain ownership for a cloud service', 'reverse lookup for a log entry', 'alias www to a load balancer'), sticky notes, whiteboard.",
   "steps": [
    "Five volunteers take role cards and stand in a line. The client asks the resolver for www.example.com, and the resolver walks to each server in turn while the class narrates whether each query is recursive or iterative.",
    "The resolver writes the answer and a TTL on a sticky note and keeps it. The client asks again, and the class notes that the cache answers without walking the path.",
    "Pairs receive the printed zone file and scenario cards and write which record type they would add or change for each scenario.",
    "Pairs find the SOA record in the zone file and explain what must change about it when a record is edited.",
    "The class reviews answers, focusing on PTR versus A and TXT versus CNAME."
   ]
  },
  "discussion": [
   "Why might a company block DoH on its network even though it improves privacy for users?",
   "What could an attacker learn from an unrestricted zone transfer, and why does that matter?",
   "How would you prove that a problem is DNS rather than general connectivity?"
  ],
  "exit": [
   [
    "Which record type lists a domain's mail servers, and which preference value is tried first?",
    "MX; the lowest preference value is tried first."
   ],
   [
    "After a record change, some users still reach the old address for hours. What causes this?",
    "Resolvers cached the old record until its TTL expires."
   ],
   [
    "Does DNSSEC encrypt DNS queries? What does it provide instead?",
    "No. It provides integrity and authenticity through digital signatures; DoH or DoT provide encryption."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a record-type reference card with one example line per record and let them use it during the matching activity.",
   "Extend: Ask fast finishers to design a split-horizon DNS setup for a company whose intranet server has a private address internally and should not be resolvable from outside, and explain how they would test it."
  ]
 },
 {
  "t": "Time protocols: NTP, PTP and NTS",
  "objectives": [
   "Students will be able to explain why consistent time matters for log correlation, Kerberos and certificate validation.",
   "Students will be able to describe the NTP stratum hierarchy and interpret show ntp status and associations output.",
   "Students will be able to choose between NTP and PTP based on required accuracy and available hardware.",
   "Students will be able to explain what NTS adds to NTP and what attacks it helps prevent."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Run the warm-up: have students compare the time on their phones, laptops and the classroom clock to the second and note the differences."
   ],
   [
    12,
    "Teach",
    "Draw the stratum pyramid from reference clocks down to clients. Explain slewing, UDP 123 and internal NTP servers. Project the show ntp output and decode stratum, asterisk, reach and offset. Contrast PTP's hardware timestamping and NTS's authentication."
   ],
   [
    18,
    "Activity",
    "Run the 'Rebuild the timeline' log exercise described below."
   ],
   [
    5,
    "Discuss",
    "Discuss what the class learned about clock skew and time zones from the exercise."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Compare the time on your phone, your laptop and the wall clock to the second. How far apart are they? If each one were writing a log during a security incident, what problems could that cause?",
  "activity": {
   "title": "Rebuild the timeline",
   "materials": "Printed log excerpts from three fictional devices (firewall, switch, server) describing one incident, with deliberate clock offsets and one device logging in a different time zone; a printed note listing each device's NTP status and offset; printed scenario cards for NTP, PTP and NTS choices; whiteboard.",
   "steps": [
    "Groups of three get the three log excerpts and try to put the events in order. They will find the sequence impossible.",
    "Hand out the NTP status note showing each device's offset and time zone. Groups correct each timestamp and rebuild the true sequence on the whiteboard.",
    "Groups write two recommendations that would have prevented the confusion, such as internal NTP servers and UTC logging.",
    "Groups sort the scenario cards (office network, trading floor, mobile network base stations, public NTP service that must resist spoofing) into NTP, PTP or NTS and justify each choice.",
    "Each group shares one correction and one recommendation with the class."
   ]
  },
  "discussion": [
   "Why might an organization run its own internal NTP servers instead of pointing every device at public time sources?",
   "What could an attacker achieve by shifting a server's clock forward by a year?",
   "When is the extra cost of PTP hardware justified?"
  ],
  "exit": [
   [
    "What port and protocol does NTP use?",
    "UDP 123."
   ],
   [
    "A router syncs to a stratum 2 server. What stratum is the router, and does that guarantee its accuracy?",
    "Stratum 3; no, stratum counts hops from a reference clock and does not guarantee accuracy."
   ],
   [
    "What does NTS add to NTP?",
    "Authentication and integrity, using TLS-based key establishment so clients can verify time comes from the genuine server and was not altered."
   ]
  ],
  "differentiation": [
   "Support: Provide struggling students with a pre-filled offset table for the timeline activity so they focus on applying corrections rather than finding the offsets.",
   "Extend: Ask fast finishers to explain why NTP gradually slews a clock rather than jumping it, and what problems a sudden large jump could cause for logs and scheduled jobs."
  ]
 },
 {
  "t": "Access and management methods: site-to-site and client VPNs, SSH, GUI, API, console, jump box, in-band vs out-of-band",
  "objectives": [
   "Students will be able to compare site-to-site, client-based and clientless VPNs and full versus split tunneling.",
   "Students will be able to select SSH, GUI, API or console access for a scenario and explain the security requirements for each.",
   "Students will be able to explain how a jump box reduces attack surface and provides an audit trail.",
   "Students will be able to distinguish in-band from out-of-band management and justify out-of-band access for critical sites."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the Harborview hook and ask the warm-up question. List student ideas on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Draw headquarters, a branch and a remote worker. Add a site-to-site tunnel and a remote access VPN. Project the SSH hardening configuration and explain each line. Add a jump box with arrows to devices, then draw a separate console server with a cellular link to show out-of-band management."
   ],
   [
    18,
    "Activity",
    "Run the 'Locked out' design challenge described below."
   ],
   [
    5,
    "Discuss",
    "Groups compare designs and identify any single path whose failure would lock them out."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You lock yourself out of a router that is 200 miles away. List every way you can think of to get back in, and decide which ones would have needed planning in advance.",
  "activity": {
   "title": "Locked out: management access design challenge",
   "materials": "Printed site map of a fictional company (headquarters, two branches, a cloud VPC, remote workers), printed component cards (site-to-site VPN, remote access VPN, clientless VPN, SSH, HTTPS GUI, API, console port, console server, cellular modem, management VLAN, jump box, Telnet, HTTP), sticky notes, whiteboard.",
   "steps": [
    "Groups of three get the site map and component cards. They first discard any component that should never be used for management, explaining why.",
    "Groups place components on the map to provide secure everyday management for all sites and remote access for staff.",
    "The teacher announces failures one at a time (the branch VPN goes down, an engineer applies a bad ACL, a new switch arrives with no configuration, 300 switches need the same change) and groups show how their design handles each, adding components if needed.",
    "Groups mark which paths are in-band and which are out-of-band with different colored sticky notes.",
    "Each group writes a two-sentence justification for where it placed the jump box."
   ]
  },
  "discussion": [
   "What are the security trade-offs between split tunnel and full tunnel remote access VPNs?",
   "Why does a jump box itself become a high-value target, and how should it be protected?",
   "Is out-of-band management worth the cost at a small branch office? What would change your answer?"
  ],
  "exit": [
   [
    "A new switch has no configuration. Which access method do you use first?",
    "The console port, because it works without any IP configuration."
   ],
   [
    "Why is a management VLAN not considered out-of-band?",
    "It still depends on the production switches and links, so it fails when they fail."
   ],
   [
    "Which protocol should replace Telnet for remote CLI management, and on what port?",
    "SSH on TCP 22."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column card listing each access method with 'works when network is down: yes or no' and 'encrypted: yes or no' to use during the design challenge.",
   "Extend: Ask fast finishers to write a short change procedure for modifying a remote router's management ACL safely, including how a scheduled automatic rollback would protect against lockout."
  ]
 },
 {
  "t": "Logical security: encryption in transit and at rest, PKI and certificates, IAM, AAA, MFA, SSO, RADIUS, TACACS+, LDAP, SAML",
  "objectives": [
   "Students will be able to distinguish data in transit from data at rest and name appropriate encryption for each.",
   "Students will be able to explain how certificates and CAs establish trust, including revocation checks.",
   "Students will be able to define AAA and identify valid MFA combinations by factor category.",
   "Students will be able to choose between RADIUS, TACACS+, LDAP and SAML for a given scenario based on purpose, ports and encryption."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about how many accounts students have and how they sign in, then introduce the idea of one identity used everywhere."
   ],
   [
    12,
    "Teach",
    "Draw data at rest and in transit on the board. Explain key pairs, certificates and the browser's trust checks. Write AAA and the factor categories. Build a comparison table for RADIUS, TACACS+, LDAP and SAML with columns for purpose, transport and port, and what is encrypted. Walk through the SAML flow with arrows."
   ],
   [
    18,
    "Activity",
    "Run the 'Protocol match-up' scenario card activity described below."
   ],
   [
    5,
    "Discuss",
    "Discuss the Copperline auditor questions and which control answers each."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "How many different accounts do you sign in to each week? Which ones let you sign in with another account, such as 'sign in with your school account', and what happens if that one account is stolen?",
  "activity": {
   "title": "Protocol match-up",
   "materials": "Printed scenario cards (about twelve, such as 'Wi-Fi login with directory credentials', 'log every command on routers', 'SSO to a cloud payroll app', 'query user group membership', 'stolen backup tapes', 'browser warning on a device page', 'password plus SMS code', 'password plus security question'), a blank comparison table handout, sticky notes, whiteboard.",
   "steps": [
    "Pairs complete the blank comparison table for RADIUS, TACACS+, LDAP and SAML from memory, then check against the board.",
    "Pairs draw scenario cards and decide the protocol, control or factor category each needs, writing a one-line justification.",
    "For MFA cards, pairs label each factor by category and decide whether the combination is truly multifactor.",
    "Pairs act out the SAML flow with three roles (user's browser, service provider, identity provider), passing a paper assertion that the service provider must check for a signature.",
    "Pairs swap cards with another pair and challenge any answer they disagree with, and the teacher resolves disputes."
   ]
  },
  "discussion": [
   "Why is SSO both a security improvement and a new risk?",
   "Why might an organization use both RADIUS and TACACS+ at the same time?",
   "What happens to encrypted data if the keys are lost, and how should keys be protected?"
  ],
  "exit": [
   [
    "Which AAA protocol uses TCP 49, encrypts the entire payload and supports per-command authorization?",
    "TACACS+."
   ],
   [
    "Is a password plus a PIN multifactor authentication? Why or why not?",
    "No. Both are something you know, so it is a single factor."
   ],
   [
    "A laptop is stolen. Which protection keeps its stored files unreadable: TLS or full-disk encryption?",
    "Full-disk encryption, because the files are data at rest; TLS only protects data in transit."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed comparison table with the port numbers filled in, and pair struggling students with a partner for the scenario cards.",
   "Extend: Ask fast finishers to explain why a browser might reject a certificate that is within its validity dates and issued by a trusted CA, listing at least two reasons such as name mismatch or revocation."
  ]
 },
 {
  "t": "Security principles: least privilege, role-based access, CIA triad, defense in depth, zero trust, segmentation",
  "objectives": [
   "Students will be able to classify attacks and controls by the element of the CIA triad they affect.",
   "Students will be able to explain least privilege, separation of duties and RBAC and how they relate.",
   "Students will be able to evaluate a network design for defense in depth, zero trust and segmentation and recommend improvements.",
   "Students will be able to identify the principle described by an exam-style scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the ship and collect ideas about compartments and layers."
   ],
   [
    12,
    "Teach",
    "Draw a triangle for CIA and map three attacks onto it with the class. Explain least privilege and separation of duties, then build the three-role RBAC example on the board. Draw a castle and moat, then redraw it as zones with checks at every door to show segmentation and zero trust."
   ],
   [
    18,
    "Activity",
    "Run the 'Contain the outbreak' whiteboard design described below."
   ],
   [
    5,
    "Discuss",
    "Groups compare designs and discuss which layer did the most work in the scenario."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Why are large ships built with many watertight compartments instead of one big open hull? What would the network version of a compartment be?",
  "activity": {
   "title": "Contain the outbreak",
   "materials": "Printed diagram of a fictional small company on one flat network (reception, finance, engineering, guest Wi-Fi, servers, payment terminals), printed attack cards (phishing on reception PC, stolen help desk password, guest laptop with a worm, insider copying files), sticky notes in three colors for physical, technical and administrative controls, whiteboard.",
   "steps": [
    "Groups of three receive the flat-network diagram and trace how each attack card could spread, marking the CIA element each attack hits.",
    "Groups redesign the network on the whiteboard with segmentation, drawing zones and writing the allowed traffic between them.",
    "Groups add at least two controls of each type using the colored sticky notes to achieve defense in depth.",
    "Groups define three roles with least-privilege permissions for the IT team and note one separation-of-duties rule.",
    "The teacher replays each attack card against each design, and groups explain where the attack would now be stopped or detected."
   ]
  },
  "discussion": [
   "Can an organization move to zero trust gradually? What would you change first?",
   "When might strict least privilege get in the way of people doing their jobs, and how do organizations balance it?",
   "Which CIA element matters most for a hospital, a bank and a streaming service, and why might the answers differ?"
  ],
  "exit": [
   [
    "A DDoS attack takes a website offline. Which part of the CIA triad is affected?",
    "Availability."
   ],
   [
    "What is the relationship between least privilege and RBAC?",
    "Least privilege is the principle of minimal access; RBAC is a way to implement it by assigning minimal permissions to roles and users to roles."
   ],
   [
    "Which principle says 'never trust, always verify' regardless of network location?",
    "Zero trust."
   ]
  ],
  "differentiation": [
   "Support: Provide a matching sheet of clue phrases and principles for struggling students to complete before the group activity, and give them a pre-drawn zone template for the redesign.",
   "Extend: Ask fast finishers to describe how a zero trust design would handle the same employee accessing the finance application from the office and from home, including what is checked each time."
  ]
 },
 {
  "t": "Physical security, deception technologies (honeypots, honeynets), risk terms, audits and compliance (PCI DSS, GDPR)",
  "objectives": [
   "Students will be able to classify physical security controls as preventive or detective and match tailgating to the access control vestibule.",
   "Students will be able to distinguish vulnerability, threat, exploit and risk, and select the correct risk response (mitigate, transfer, avoid, accept) for a scenario.",
   "Students will be able to explain how honeypots and honeynets detect attackers and why they produce few false positives.",
   "Students will be able to determine whether PCI DSS, GDPR or both apply to an organization based on the data it handles."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a photo or sketch of a server room door propped open. Ask students to list every way an intruder could abuse the room in two minutes, then collect answers on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Walk through prevention versus detection controls, then the four risk terms using the VPN appliance example. Introduce the four risk responses and finish with honeypots, PCI DSS and GDPR, writing the clue words on the board."
   ],
   [
    15,
    "Activity",
    "Run the risk register card sort described below in groups of three or four."
   ],
   [
    8,
    "Discuss",
    "Groups share their hardest card and defend their choice. Correct misconceptions, especially insurance as transfer and GDPR's reach beyond EU companies."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "If an attacker could spend five unsupervised minutes in our school's network closet, what could they do, and which of those actions would a password stop?",
  "activity": {
   "title": "Risk register card sort",
   "materials": "Printed scenario cards (about 12 per group), whiteboard divided into columns, sticky notes, markers.",
   "steps": [
    "Give each group a deck of scenario cards, for example 'buy cyber insurance', 'unpatched firmware on a camera', 'retire the old FTP server', 'decoy database with no users', 'shop sells to customers in Spain'.",
    "Groups first sort each card into a column: vulnerability, threat, exploit, risk response, deception, physical control or compliance.",
    "For risk-response cards, groups write on a sticky note which of the four responses it is; for compliance cards, whether PCI DSS, GDPR or both apply.",
    "Each group picks one high-risk scenario and writes a short justification using likelihood and impact.",
    "The teacher circulates, asking 'what would make this risk lower?' to push groups toward controls."
   ]
  },
  "discussion": [
   "When is it reasonable for management to accept a risk rather than fix it, and who should sign off?",
   "What could go wrong if a honeypot is placed on the network without isolation or monitoring?",
   "Why might segmenting the card payment network make a PCI DSS audit easier?"
  ],
  "exit": [
   [
    "An unpatched VPN appliance is reachable from the internet and attackers are scanning for its flaw. Name the vulnerability and the threat.",
    "The vulnerability is the unpatched flaw; the threat is the attackers (threat actors) scanning to exploit it."
   ],
   [
    "A company buys cyber insurance. Which risk response is this?",
    "Risk transference, because the financial impact is shifted to the insurer while the risk itself remains."
   ],
   [
    "Which control stops one person from following another through a secure door?",
    "An access control vestibule (formerly mantrap), supported by guards and staff training."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page glossary card with the four risk terms and four responses, each with a single everyday example, and let them use it during the card sort.",
   "Extend: Ask fast finishers to draft a short risk register for a fictional coffee shop with card payments and EU online customers, scoring three risks by likelihood and impact and naming a response and a compliance requirement for each."
  ]
 },
 {
  "t": "Network segmentation enforcement for IoT, IIoT, SCADA/ICS/OT, guest and BYOD",
  "objectives": [
   "Students will be able to identify IoT, IIoT, OT/ICS/SCADA, guest and BYOD devices from a description and explain the main risk of each.",
   "Students will be able to select appropriate enforcement controls (VLANs, ACLs, firewalls, NAC, client isolation, air gaps) for each device group.",
   "Students will be able to read a simple segment ACL and explain what traffic it allows and logs.",
   "Students will be able to design safe remote vendor access to an OT network using a DMZ and jump host."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to list every networked device in a typical school building beyond PCs. Write them on the board and circle the ones nobody patches."
   ],
   [
    12,
    "Teach",
    "Explain each device group and its risk, emphasizing OT's safety and availability priorities. Project the CAMERAS-IN ACL and read it line by line with the class."
   ],
   [
    18,
    "Activity",
    "Run the segmentation whiteboard design described below in groups."
   ],
   [
    5,
    "Discuss",
    "Each group presents one boundary and the rule that enforces it. Challenge any design where OT is reachable directly from IT or the internet."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Name five devices in this building that connect to the network but are not computers. Which one would worry you most if an attacker controlled it, and why?",
  "activity": {
   "title": "Segment the clinic",
   "materials": "Whiteboard or large paper per group, markers, printed device cards (cameras, thermostats, infusion pumps, HVAC controller, guest phones, staff personal phones, records server), sticky notes.",
   "steps": [
    "Give each group the device cards for a fictional clinic and a blank network diagram with an internet connection and a core firewall.",
    "Groups draw segments (VLANs or zones) and place each device card in one, labeling each segment IoT, IIoT, OT, guest, BYOD or corporate.",
    "For every arrow between segments, groups write the allowed traffic on a sticky note, assuming default deny for anything not listed.",
    "Groups add how devices get placed in their segment: 802.1X, MAB, separate SSID or captive portal.",
    "Finally, groups design remote access for the HVAC vendor without exposing the OT segment to the internet."
   ]
  },
  "discussion": [
   "Why might an air gap still fail, and what procedures help keep it intact?",
   "Should the company be allowed to wipe an employee's personal phone? How does containerization change the answer?",
   "What signs in firewall logs would suggest that an IoT device has been compromised?"
  ],
  "exit": [
   [
    "Which group of systems puts safety and availability first and usually needs the strongest isolation?",
    "OT, including ICS, SCADA and PLCs."
   ],
   [
    "Name two controls that keep guests on a guest VLAN from reaching each other and internal servers.",
    "Client isolation (stops guest-to-guest traffic) and ACLs or firewall rules blocking internal subnets."
   ],
   [
    "What does the final 'deny ip ... any log' line in an IoT ACL achieve?",
    "It blocks all traffic not explicitly permitted and logs the attempts, giving early warning of a compromised device."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed clinic diagram with segments already drawn so struggling students only need to place devices and choose one control per boundary.",
   "Extend: Ask fast finishers to write a two-line ACL that lets a BYOD VLAN reach only an email server on TCP 443 and denies everything else with logging, then explain where they would apply it."
  ]
 },
 {
  "t": "Attacks: DoS/DDoS, VLAN hopping, MAC flooding, ARP and DNS poisoning/spoofing, rogue DHCP and APs, evil twin, on-path",
  "objectives": [
   "Students will be able to identify DoS/DDoS, VLAN hopping, MAC flooding, ARP poisoning, DNS poisoning, rogue DHCP, rogue AP, evil twin and on-path attacks from described symptoms.",
   "Students will be able to match each attack to its primary mitigation, such as port security, DAI, DHCP snooping or trunk hardening.",
   "Students will be able to distinguish a rogue access point from an evil twin.",
   "Students will be able to explain why volumetric DDoS must be mitigated upstream and why encryption with certificate validation defeats on-path attacks."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the Cedar Valley symptoms aloud (slow app, duplicate IP warning, odd login page, certificate warning) and ask pairs to guess how many different problems there might be."
   ],
   [
    15,
    "Teach",
    "Present each attack as 'what it trusts, what you see, what stops it.' Build a three-column table on the whiteboard as you go and draw the double-tagging path between two switches."
   ],
   [
    15,
    "Activity",
    "Run the symptom-to-defense matching game described below."
   ],
   [
    5,
    "Discuss",
    "Review the cards groups got wrong and talk through the rogue AP versus evil twin distinction and DAI's dependency on DHCP snooping."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Your phone shows two Wi-Fi networks with exactly the same name in a coffee shop. How would you decide which one to trust, and what could go wrong if you pick the wrong one?",
  "activity": {
   "title": "Symptom, attack, defense",
   "materials": "Three sets of printed cards per group (symptom cards, attack-name cards, defense cards), tape or sticky tack, whiteboard.",
   "steps": [
    "Give each group shuffled cards: about nine symptoms (for example 'switch floods frames like a hub', 'gateway MAC changed in arp -a', 'clients get 192.168.0.x addresses'), nine attack names and nine defenses.",
    "Groups lay out rows matching each symptom to an attack and a defense within ten minutes.",
    "Add two trap cards to the defense pile (for example 'MAC filtering' and 'bigger edge firewall') that do not correctly mitigate any attack; groups must explain why they rejected them.",
    "Groups post one row on the whiteboard and the class checks it together.",
    "The teacher closes by asking which defenses depend on each other (DAI needs DHCP snooping)."
   ]
  },
  "discussion": [
   "Several of these attacks lead to an on-path position. Why is encryption with certificate validation still effective once an attacker is on-path?",
   "Who should be responsible for DDoS protection: the organization, its ISP or a third-party service?",
   "How would you explain to a non-technical manager why an employee's home router caused an outage?"
  ],
  "exit": [
   [
    "Which switch feature stops a rogue DHCP server plugged into a user port?",
    "DHCP snooping, which drops DHCP server messages on untrusted ports."
   ],
   [
    "A frame with two 802.1Q tags reaches a VLAN it should not. Name the attack and one defense.",
    "Double tagging (VLAN hopping); defend by setting the native VLAN to an unused VLAN and tagging it, and disabling trunk negotiation on user ports."
   ],
   [
    "What is the difference between a rogue AP and an evil twin?",
    "A rogue AP is an unauthorized AP connected to your network; an evil twin impersonates your SSID to trick users into connecting."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference strip pairing each defense with one sentence describing what it checks, and let them match only symptoms to attacks first before adding defenses.",
   "Extend: Ask fast finishers to write the log message or command output they would expect to see for three of the attacks (for example a DAI drop, a port security violation and a duplicate IP warning) and explain what each field tells them."
  ]
 },
 {
  "t": "Social engineering: phishing, dumpster diving, shoulder surfing, tailgating; malware",
  "objectives": [
   "Students will be able to identify phishing variants (spear phishing, whaling, vishing, smishing, business email compromise) and nontechnical attacks (dumpster diving, shoulder surfing, tailgating, piggybacking) from a description.",
   "Students will be able to classify malware types by behavior, including virus, worm, Trojan, ransomware, rootkit, keylogger and botnet.",
   "Students will be able to list warning signs of a phishing email and the technical and procedural controls that counter it.",
   "Students will be able to map layered defenses to each step of a typical attack chain."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a fictional phishing email for a made-up company and give students two minutes to circle every warning sign they can find."
   ],
   [
    12,
    "Teach",
    "Cover phishing variants by channel and target, the three nontechnical attacks, and malware types by behavior. Write 'channel' and 'behavior' as the two sorting keys on the board."
   ],
   [
    15,
    "Activity",
    "Run the attack chain breakpoint activity described below."
   ],
   [
    8,
    "Discuss",
    "Groups share where they would break the chain most cheaply. Discuss why a reporting culture matters more than blame."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Have you ever received a text or email that felt urgent and slightly off? What made you suspicious, or what almost made you click?",
  "activity": {
   "title": "Break the attack chain",
   "materials": "Printed strip of seven attack-chain step cards per group (research, spear-phishing email, Trojan attachment, RAT and C2, keylogger, ransomware, recovery), sticky notes in two colors, whiteboard.",
   "steps": [
    "Groups lay the attack-chain cards in order on their desks.",
    "On one color of sticky note, groups name the social engineering technique or malware type at each step.",
    "On the other color, groups write at least one control that would stop or detect that step (training, filtering, EDR, egress monitoring, MFA, segmentation, offline backups).",
    "Each group circles the single control they think gives the most protection for the cost and prepares a one-sentence justification.",
    "Groups rotate to another table and add one control the first group missed."
   ]
  },
  "discussion": [
   "Why might an employee hide a mistaken click instead of reporting it, and how can an organization change that?",
   "Is it fair to send employees simulated phishing emails? What makes a simulation helpful rather than punishing?",
   "Which nontechnical attack do you think is most underrated in schools or small offices, and why?"
  ],
  "exit": [
   [
    "A caller pretending to be IT support asks for a user's password. Which technique is this?",
    "Vishing (voice phishing), a form of social engineering by phone."
   ],
   [
    "Which malware type spreads across a network without any user action?",
    "A worm, which exploits vulnerabilities to self-propagate."
   ],
   [
    "Name two controls that reduce the damage of a successful phishing email that steals a password.",
    "Multifactor authentication and monitoring or alerting on unusual logins; least privilege and segmentation also limit impact."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column cheat sheet (channel or target on one side, behavior on the other) and let struggling students sort only five cards at first before tackling the full chain.",
   "Extend: Ask fast finishers to write a short, original awareness poster script (no real company names) that teaches coworkers to verify payment requests by a second channel, and include two warning signs of business email compromise."
  ]
 },
 {
  "t": "Device hardening: disable unused ports and services, change default passwords, secure management protocols",
  "objectives": [
   "Students will be able to explain why default credentials, unused ports and unneeded services increase a device's attack surface.",
   "Students will be able to replace insecure management protocols with secure equivalents (Telnet to SSH, HTTP to HTTPS, SNMPv1/v2c to SNMPv3, FTP/TFTP to SFTP/SCP).",
   "Students will be able to interpret a hardened switch configuration and identify missing hardening steps.",
   "Students will be able to describe how golden configurations, configuration monitoring and scans keep devices hardened over time."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students what they changed, or should have changed, the first time they set up a home router. List answers on the board."
   ],
   [
    12,
    "Teach",
    "Present the three pillars (defaults, disable unused, secure protocols) and project the hardened configuration, explaining each line. Show the insecure-to-secure protocol table."
   ],
   [
    15,
    "Activity",
    "Run the config audit described below in pairs."
   ],
   [
    8,
    "Discuss",
    "Pairs share findings and the class builds a single hardening checklist on the whiteboard."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you bought a used router online, what would you change before connecting it to your home network, and why?",
  "activity": {
   "title": "Find the holes: switch config audit",
   "materials": "Printed copies of a deliberately weak switch configuration (Telnet allowed on some VTY lines, 'snmp-server community public', HTTP server on, unused ports in VLAN 1 and not shut, one shared admin account), highlighters, whiteboard.",
   "steps": [
    "Pairs receive the weak configuration and highlight every line that weakens security.",
    "For each highlighted line, pairs write the hardened replacement in the margin, using the lesson's configuration as a reference.",
    "Pairs list two checks they would run afterward to prove the device is hardened (for example an authorized port scan and a config comparison against the golden template).",
    "The teacher reveals an answer key and pairs score themselves, noting anything they missed.",
    "Pairs add one item to the class checklist on the whiteboard that no other pair has listed."
   ]
  },
  "discussion": [
   "Why is a shared admin account a problem even if the password is strong?",
   "How would you balance hardening a remote device against the risk of locking yourself out?",
   "What should happen when configuration monitoring reports that a switch no longer matches the golden configuration?"
  ],
  "exit": [
   [
    "Name the secure replacement for Telnet, HTTP and SNMPv2c.",
    "SSH, HTTPS and SNMPv3 (with authPriv)."
   ],
   [
    "Why are unused switch ports moved to a parking lot VLAN as well as shut down?",
    "So that if a port is re-enabled by mistake, it still gives no access to the user network."
   ],
   [
    "What tool confirms that only intended services remain open after hardening?",
    "An authorized port or vulnerability scan, such as nmap, compared against the intended services."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a matching table of insecure and secure protocols and a reduced version of the weak config with only five issues to find.",
   "Extend: Ask fast finishers to write a short golden configuration checklist for a wireless access point, covering credentials, services, management protocols and logging, and explain how they would detect drift."
  ]
 },
 {
  "t": "Switch security: port security, DHCP snooping, dynamic ARP inspection, BPDU guard",
  "objectives": [
   "Students will be able to match MAC flooding, rogue DHCP, ARP poisoning and rogue switches to port security, DHCP snooping, DAI and BPDU guard.",
   "Students will be able to explain why DAI depends on the DHCP snooping binding table and why uplinks must be trusted.",
   "Students will be able to compare the protect, restrict and shutdown violation modes.",
   "Students will be able to troubleshoot an err-disabled port or an APIPA outage caused by misconfigured switch security."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the three Willow Creek tickets aloud and ask students to guess which ticket was caused by a misconfiguration and which was a feature doing its job."
   ],
   [
    12,
    "Teach",
    "Explain each feature, then project the combined access-layer configuration and trace the trust settings. Draw the dependency arrow from DHCP snooping to DAI on the whiteboard."
   ],
   [
    15,
    "Activity",
    "Run the help desk ticket role-play described below."
   ],
   [
    8,
    "Discuss",
    "Review each ticket's root cause and fix. Emphasize finding the cause before re-enabling an err-disabled port."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If anyone could plug a device into a classroom wall jack and announce 'I am the router,' how would other computers know not to believe it?",
  "activity": {
   "title": "Help desk tickets: switch security edition",
   "materials": "Printed ticket cards with symptoms and short log or show-command excerpts (for example 'Interface g1/0/7 err-disabled: BPDU guard', clients with 169.254 addresses, DAI drop messages, a port security violation counter), whiteboard.",
   "steps": [
    "In pairs, one student plays the user describing the symptom from a ticket card, and the other plays the technician who may ask up to three questions.",
    "The technician names the switch feature involved, the likely cause and the fix, and writes it on the ticket card.",
    "Pairs swap roles for each new ticket, working through four to six tickets.",
    "For at least one ticket, the cause must be a misconfiguration (untrusted uplink, maximum 1 with a phone, DAI without snooping) rather than an attack.",
    "Pairs post their hardest ticket on the whiteboard for the class to review."
   ]
  },
  "discussion": [
   "Is it better for a port security violation to shut the port down or to restrict? What does each choice cost the help desk?",
   "Why might an organization still use port security if MAC addresses are easy to spoof?",
   "How would you roll out DHCP snooping and DAI to a live network without causing an outage?"
  ],
  "exit": [
   [
    "Which feature must be enabled before dynamic ARP inspection can work?",
    "DHCP snooping, because DAI checks ARP messages against its binding table."
   ],
   [
    "Which feature err-disables an access port when a user plugs in a small switch?",
    "BPDU guard, because the small switch sends BPDUs on a port expecting an end device."
   ],
   [
    "Which port security violation mode drops and logs violating frames without shutting the port?",
    "Restrict."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a four-row table with the attack, the feature and one symptom already filled in for two rows, and have them complete the remaining rows before the role-play.",
   "Extend: Ask fast finishers to write the configuration needed to add a static-IP printer on port g1/0/12 to a VLAN protected by DAI, and explain the risk of simply trusting that port instead."
  ]
 },
 {
  "t": "Network access control: 802.1X, MAC filtering, key management",
  "objectives": [
   "Students will be able to identify the supplicant, authenticator and authentication server in an 802.1X exchange and the protocols between them (EAPoL, EAP over RADIUS).",
   "Students will be able to explain posture assessment, remediation VLANs and MAC authentication bypass.",
   "Students will be able to evaluate why MAC filtering is weak compared with 802.1X.",
   "Students will be able to apply key management practices (generation, storage, rotation, revocation, expiry tracking) to PSKs and certificates."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students how they would control who enters a party if they could not see faces, only names written on stickers. Connect the answer to MAC filtering."
   ],
   [
    12,
    "Teach",
    "Draw the three 802.1X roles on the whiteboard with EAPoL and RADIUS arrows. Walk through the wired login, then posture, MAB, MAC filtering and the key life cycle."
   ],
   [
    15,
    "Activity",
    "Run the 802.1X role-play described below."
   ],
   [
    8,
    "Discuss",
    "Debrief the expired-certificate and spoofed-MAC rounds and connect them to key management and restricted MAB VLANs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your home Wi-Fi password is shared with ten friends, and you fall out with one of them. What do you have to do, and how annoying is it for everyone else?",
  "activity": {
   "title": "Act out 802.1X",
   "materials": "Printed role cards (supplicant, authenticator, RADIUS server, directory), printed 'credential' cards and 'certificate' cards with expiry dates, a 'VLAN' sign for each area of the room, string or tape to mark a 'port'.",
   "steps": [
    "Assign groups of four to the roles. The authenticator stands at the taped 'port' and lets nothing through except authentication messages.",
    "Round 1: the supplicant presents a credential card; the authenticator relays it to RADIUS, which checks with the directory and returns accept with a VLAN sign. The supplicant walks to that VLAN area.",
    "Round 2: the teacher hands RADIUS an expired certificate card. The supplicant must check it and refuse, showing why every user fails at once.",
    "Round 3: a printer card with no supplicant arrives; groups decide how MAB handles it and which restricted VLAN it gets. Then a student spoofs the printer's MAC and groups discuss what access that grants.",
    "Groups record one key management rule that would have prevented each problem."
   ]
  },
  "discussion": [
   "Why would an organization keep MAC filtering at all if it is so easy to bypass?",
   "What processes would make sure a certificate is renewed before it expires, even when staff change?",
   "Should a device that fails posture assessment be blocked completely or sent to remediation? What are the trade-offs?"
  ],
  "exit": [
   [
    "In 802.1X, which role does a wireless access point play?",
    "The authenticator, which relays EAP to the RADIUS server and controls access."
   ],
   [
    "Why is MAC filtering not considered real authentication?",
    "MAC addresses are visible in every frame and can be easily spoofed."
   ],
   [
    "Give two key management practices that reduce outages and risk with 802.1X.",
    "Track and renew certificates before they expire, and revoke credentials or certificates promptly when they are compromised or a user leaves; store private keys securely."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of the 802.1X roles with blanks for the protocol names, and have struggling students complete it before the role-play.",
   "Extend: Ask fast finishers to compare EAP-TLS and PEAP in a short paragraph, covering what each side must have (certificates or passwords) and the key management burden of each."
  ]
 },
 {
  "t": "Security rules: ACLs, implicit deny, URL and content filtering, zones and screened subnets",
  "objectives": [
   "Students will be able to trace packets through an ACL using top-down, first-match processing and the implicit deny.",
   "Students will be able to write or reorder ACL rules so specific denies precede broader permits, and explain standard versus extended ACL placement.",
   "Students will be able to distinguish URL filtering, content filtering and TLS inspection and their policy considerations.",
   "Students will be able to design a screened subnet with zone-based rules for internet-facing servers."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write the single-line 'deny host 10.1.1.50' ACL on the board and ask students to predict who loses access when it is applied."
   ],
   [
    12,
    "Teach",
    "Explain first match, implicit deny, standard versus extended placement and wildcard masks. Project the TO-WEB ACL and trace four packets with the class, then cover URL filtering, zones and the screened subnet."
   ],
   [
    15,
    "Activity",
    "Run the human ACL packet trace described below."
   ],
   [
    8,
    "Discuss",
    "Debrief the rounds where packets were wrongly allowed or blocked, and sketch a screened subnet on the whiteboard together."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A club's door list says only 'No one named Alex.' If the bouncer turns away anyone not explicitly allowed, who gets in?",
  "activity": {
   "title": "Be the router: human ACL trace",
   "materials": "Printed ACL rule cards (one rule per card, numbered), printed 'packet' cards with source, destination, protocol and port, whiteboard, tape.",
   "steps": [
    "Tape the rule cards in order across the front of the room; one student acts as the router and must read rules strictly from the top.",
    "Other students take packet cards and walk along the rules; the router stops at the first matching rule and announces permit or deny. Unmatched packets hit a hidden 'implicit deny' card at the end.",
    "After a few packets, the teacher swaps two rules so a broad permit sits above a specific deny, and the class observes which packet now slips through.",
    "In small groups, students rewrite the rule order to meet a stated policy (block one host, allow its subnet HTTPS, allow monitoring pings).",
    "Groups then place three servers (public web, mail relay, HR database) into inside, outside or screened subnet zones and justify each choice."
   ]
  },
  "discussion": [
   "Why do old, unused firewall rules become a security risk over time, and how would you manage them?",
   "Is TLS inspection a reasonable workplace practice? Which sites should be exempt, and who should decide?",
   "When would you choose a two-firewall screened subnet instead of a single three-interface firewall?"
  ],
  "exit": [
   [
    "What happens to traffic that matches no rule in an ACL?",
    "It is dropped by the implicit deny at the end of the list."
   ],
   [
    "An ACL permits 10.0.10.0/24 on line 10 and denies host 10.0.10.66 on line 20. Is 10.0.10.66 blocked? How do you fix it?",
    "No, it matches the permit first; move the host deny above the subnet permit."
   ],
   [
    "Where should a public-facing web server be placed, and why?",
    "In a screened subnet (DMZ), so a compromise does not give the attacker direct access to the internal network."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a flowchart card (start at top, does it match, act and stop, otherwise next rule, implicit deny at end) to use while tracing packets.",
   "Extend: Ask fast finishers to write an extended ACL that lets the internet reach a screened-subnet web server on TCP 443 only, lets that server reach one internal database on TCP 1433 only, and logs everything else, then state the interface and direction for each list."
  ]
 },
 {
  "t": "The seven-step troubleshooting methodology and its order",
  "objectives": [
   "Students will be able to list the seven CompTIA troubleshooting steps in the correct order.",
   "Students will be able to identify which step a technician is performing from a described action and state the next step.",
   "Students will be able to choose a top-to-bottom, bottom-to-top or divide-and-conquer approach based on symptoms.",
   "Students will be able to explain why verification, preventive measures and documentation are required even after a successful fix."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Tell the story of Kai rebooting a switch before asking questions, and ask students what went wrong and what he should have done first."
   ],
   [
    10,
    "Teach",
    "Present the seven steps with the mnemonic, the Step 1 sub-actions and the three approaches. Walk through the third-floor uplink example on the whiteboard."
   ],
   [
    18,
    "Activity",
    "Run the troubleshooting step card sort and 'what next' relay described below."
   ],
   [
    7,
    "Discuss",
    "Review the trickiest 'what next' cards, especially confirmed cause leading to planning and disproved theory leading to a new theory or escalation."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of a time you fixed something at home, like a slow Wi-Fi connection or a game that would not start. What did you do first, and did you ever make things worse by guessing?",
  "activity": {
   "title": "Step sort and what-next relay",
   "materials": "Printed step cards (seven per group, shuffled), printed action cards describing technician actions (for example 'asked the user what changed', 'swapped a known good cable to test', 'updated the knowledge base'), whiteboard, timer on the projector.",
   "steps": [
    "Groups race to put the seven step cards in order; the teacher checks and groups correct any errors.",
    "Groups then place each action card under the step it belongs to.",
    "Relay: the teacher reads a scenario ('The technician just confirmed the cause...'), and one member from each group writes the next step on the whiteboard; correct answers score a point.",
    "Include at least two scenarios where the theory is disproved and one where escalation is the right answer.",
    "Finish with each group writing a complete seven-step ticket note for a printer-moved scenario."
   ]
  },
  "discussion": [
   "Why might an experienced engineer move through the steps quickly, and when is it dangerous to skip one?",
   "Is escalating a problem a sign of weakness? How should a team treat escalations?",
   "What makes ticket documentation actually useful to the next person, rather than just a formality?"
  ],
  "exit": [
   [
    "List the seven troubleshooting steps in order.",
    "Identify the problem; establish a theory of probable cause; test the theory; establish a plan of action; implement the solution or escalate; verify full system functionality and implement preventive measures; document findings, actions, outcomes and lessons learned."
   ],
   [
    "A technician has just applied a fix. What is the next step?",
    "Verify full system functionality and, if applicable, implement preventive measures."
   ],
   [
    "A user has no link light on their PC. Which troubleshooting approach fits best?",
    "Bottom-to-top, starting at the Physical layer with cables, ports and link lights."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a printed strip with the seven steps and the mnemonic, and let them keep it during the relay before testing them without it on the exit ticket.",
   "Extend: Ask fast finishers to write two original 'what next' scenarios with tricky distractors, including one about multiple simultaneous problems, and swap them with another fast finisher to solve."
  ]
 },
 {
  "t": "Cabling issues: wrong cable type, signal degradation, crosstalk, EMI, attenuation, improper termination, TX/RX transposed",
  "objectives": [
   "Students will be able to identify attenuation, EMI, crosstalk, improper termination, wrong cable type and TX/RX transposition from symptoms.",
   "Students will be able to recommend the correct fix for each cabling issue, such as rerouting, shielding, fiber, re-termination or swapping strands.",
   "Students will be able to select the appropriate test tool (cable tester, certifier, TDR, OTDR, light meter, inspection scope) for a described fault.",
   "Students will be able to explain why a split pair passes continuity but fails at speed."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show (or describe) a cable with pairs untwisted several inches at the jack and ask students what could go wrong."
   ],
   [
    12,
    "Teach",
    "Cover each cabling issue with its symptom and fix, draw the duplex fiber TX/RX crossing on the whiteboard, and finish with the tool-to-symptom table."
   ],
   [
    15,
    "Activity",
    "Run the cable clinic case cards described below."
   ],
   [
    8,
    "Discuss",
    "Groups present one case, defend their diagnosis and tool choice, and the class discusses when to suspect cabling before hardware."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If a network link works fine all morning but fails every afternoon at the same time, what kinds of causes would you look for?",
  "activity": {
   "title": "Cable clinic case cards",
   "materials": "Printed case cards (symptom, environment, test results), a printed tool menu card, sticky notes, whiteboard. Optional: a few old patch cables and keystone jacks for students to inspect.",
   "steps": [
    "Each group receives six case cards, such as 'new fiber link dark, optics correct', '130 m copper run with errors', 'errors when compressor runs', 'passes continuity, CRC errors at 1 Gbps', 'multimode patch on single-mode SFP', 'non-plenum cable above ceiling tiles'.",
    "Groups write the cabling issue, the fix and the best test tool on a sticky note for each case.",
    "If physical cables are available, groups inspect them for poor terminations, missing strain relief or excessive untwist.",
    "Groups rank the six cases from cheapest to most expensive to fix.",
    "Groups post their answers on the whiteboard, and the teacher reveals the key and discusses any disagreements."
   ]
  },
  "discussion": [
   "Why do technicians so often replace switches or NICs when the cable is at fault, and how can a team avoid that?",
   "When would you choose a cable certifier over a simple cable tester, given the cost difference?",
   "Fiber is immune to EMI and supports long distances. Why not use fiber for every desk?"
  ],
  "exit": [
   [
    "A copper run is 130 meters long and shows constant errors. What is the issue?",
    "Attenuation, because it exceeds the 100-meter copper Ethernet limit."
   ],
   [
    "A new fiber link is dark though both optics are correct and the connectors are clean. What should you try first?",
    "Swap the TX and RX strands at one end, because they are likely transposed."
   ],
   [
    "Which tool finds the distance to a break in a fiber run?",
    "An OTDR (optical time-domain reflectometer)."
   ]
  ],
  "differentiation": [
   "Support: Provide struggling students with a symptom-to-cause matching sheet listing the key clue words (distance, motors, untwist, continuity, no light) before they attempt the case cards.",
   "Extend: Ask fast finishers to write a short cable installation checklist for a contractor that would prevent at least five of the issues covered, including untwist limits, plenum rating and fiber cleaning."
  ]
 },
 {
  "t": "Interface issues: increasing CRC and runt/giant counters, port status, duplex and speed mismatches",
  "objectives": [
   "Students will be able to interpret CRC, runt, giant, output drop and late collision counters and name the likely cause of each.",
   "Students will be able to distinguish administratively down, down/down, up/down and err-disabled port states and the next action for each.",
   "Students will be able to diagnose a duplex mismatch from counters on both ends and explain the correct fix.",
   "Students will be able to explain why increasing counters matter more than absolute values."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the `show interfaces g1/0/14` output and ask students to circle the numbers they think matter most."
   ],
   [
    12,
    "Teach",
    "Explain each counter, the two-part port status line and the four port states, then the duplex mismatch pattern (CRC and runts on the full side, late collisions on the half side)."
   ],
   [
    15,
    "Activity",
    "Run the counter detective activity described below in pairs."
   ],
   [
    8,
    "Discuss",
    "Pairs share their diagnoses; emphasize checking both ends, clearing counters and fixing both sides of a duplex mismatch."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A car's odometer reads 80,000 miles. Does that tell you whether the car has a problem today? What would you watch instead?",
  "activity": {
   "title": "Counter detective",
   "materials": "Printed interface output excerpts (six to eight cases, each showing both ends of a link at two times a few minutes apart), highlighters, whiteboard.",
   "steps": [
    "Pairs receive the cases, which include a duplex mismatch, an MTU mismatch, EMI-related CRC errors, congestion with output drops, an administratively down port, an err-disabled port and a stale counter that is not increasing.",
    "For each case, pairs highlight the counters that changed between the two readings and ignore the ones that did not.",
    "Pairs write the diagnosis and the fix, and for the duplex case they must state the setting for both ends.",
    "Pairs swap two cases with a neighboring pair and check each other's answers.",
    "The teacher reviews the stale-counter case last to reinforce that only increasing counters indicate an active problem."
   ]
  },
  "discussion": [
   "Why might some symptoms of a duplex mismatch appear on only one end of the link?",
   "When is it reasonable to hard-code speed and duplex instead of using autonegotiation, and what must you remember if you do?",
   "How would monitoring tools that graph error counters over time change how you troubleshoot interfaces?"
  ],
  "exit": [
   [
    "A port shows rising runts and CRC errors on a full-duplex switch port, and the attached server shows late collisions. What is the problem and fix?",
    "A duplex mismatch; set both ends to autonegotiate or hard-code both to the same speed and duplex."
   ],
   [
    "What do rising giant counters usually indicate?",
    "An MTU or jumbo frame mismatch between devices on the link or path."
   ],
   [
    "A port is 'administratively down'. What does that mean and how is it fixed?",
    "It was disabled with a shutdown command; after confirming why, re-enable it with no shutdown."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page counter key (counter name, what it means, likely cause) and start them on three simpler cases before the mixed set.",
   "Extend: Ask fast finishers to write the Linux commands they would use to check the same counters on a server NIC and explain how they would correlate those readings with the switch side."
  ]
 },
 {
  "t": "Hardware issues: PoE power budget exceeded, wrong PoE standard, transceiver mismatch, signal strength",
  "objectives": [
   "Students will be able to calculate whether a set of PoE devices fits within a switch's power budget using `show power inline` output.",
   "Students will be able to distinguish an exceeded PoE budget from a wrong PoE standard based on symptoms such as dark ports versus reduced-feature boots.",
   "Students will be able to identify transceiver mismatches by comparing speed, wavelength, fiber type and BiDi pairing at both ends of a link.",
   "Students will be able to interpret wireless dBm and SNR values and fiber receive power readings to diagnose signal strength problems."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up question and have students answer on sticky notes. Collect a few and read them aloud without judging, noting how many blamed the device itself."
   ],
   [
    13,
    "Teach",
    "Walk through the four issue types. Show the `show power inline` sample and do the budget math together on the whiteboard. List 802.3af, at and bt wattages. Draw two SFPs facing each other and list what must match. Write a dBm number line from -30 to -90 and mark excellent, -67 target and poor."
   ],
   [
    17,
    "Activity",
    "Run the 'Hardware Detective' card activity in groups of three. Circulate, asking each group to justify its diagnosis with a specific clue from the card."
   ],
   [
    5,
    "Discuss",
    "Bring the class together. Ask groups to share one card that fooled them and pose the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper individually and hand them in at the door."
   ]
  ],
  "warmup": "Three new cameras out of eight will not power on, and the other five work perfectly. Before you call the vendor for a replacement, what is the first thing you would check, and why?",
  "activity": {
   "title": "Hardware Detective",
   "materials": "Printed scenario cards (8 to 10, each with a symptom and a snippet of `show power inline`, `show interfaces transceiver` or a Wi-Fi analyzer reading), a printed answer key for the teacher, whiteboard, sticky notes.",
   "steps": [
    "Prepare cards in advance: for example a switch with 4 W remaining and a dark port, a PoE+ access point on an 802.3af port with one radio off, an LR optic facing an SR optic, a DOM reading with very low receive power, a laptop at -82 dBm, and a strong signal with a high noise floor.",
    "Give each group of three a stack of cards face down. Groups turn over one card at a time, agree on a category (budget exceeded, wrong standard, transceiver mismatch, signal strength) and write the deciding clue on a sticky note.",
    "For each card, groups also write one fix on the sticky note, such as adding a power supply, using an injector, matching optics, cleaning connectors or relocating an access point.",
    "Groups post their sticky notes on the whiteboard under the four category headings. The teacher reviews any misplaced notes with the class and asks the group to explain its reasoning before revealing the answer."
   ]
  },
  "discussion": [
   "Why do PoE problems often appear only at certain times of day, and how would you design monitoring to catch them?",
   "What are the risks and benefits of using third-party optics in a switch, and how would you decide whether to allow them?"
  ],
  "exit": [
   [
    "A switch with a 740 W budget powers 20 access points drawing 30 W each. How much budget remains for phones?",
    "140 W remains (20 x 30 = 600 W; 740 - 600 = 140 W)."
   ],
   [
    "A PTZ camera powers on but its motor does not move. The port is 802.3af. What is the likely cause?",
    "Wrong PoE standard or class: the camera needs more power than 802.3af provides (15.4 W), so it runs in reduced-power mode."
   ],
   [
    "Name three things that must match between the optics at each end of a fiber link.",
    "Any three of: speed, wavelength or standard, fiber type (single-mode or multimode), complementary BiDi pairing, and switch support for the module."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page reference card listing PoE standards and wattages, a dBm number line, and a checklist of what must match on optics, and let them work the first two scenario cards with the teacher.",
   "Extend: Ask fast finishers to design a PoE plan for a fictional floor with 24 phones, 8 access points and 6 cameras, choosing a switch budget, setting port priorities and explaining how they would handle nighttime camera heaters."
  ]
 },
 {
  "t": "Switching issues: STP loops, incorrect VLAN assignment, ACLs",
  "objectives": [
   "Students will be able to recognize the symptoms of a switching loop and describe immediate and preventive fixes, including STP, BPDU guard and storm control.",
   "Students will be able to diagnose incorrect access VLAN assignment and trunk allowed-list, native VLAN and trunk mode problems from command output.",
   "Students will be able to identify ACL errors involving rule order, implicit deny and direction.",
   "Students will be able to apply a host-outward troubleshooting path to a switching scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question. Take three or four answers aloud and write the guessed causes on the board for later."
   ],
   [
    13,
    "Teach",
    "Draw three switches in a triangle and show how a loop forms without STP. Explain BPDU guard and storm control. Project the `show interfaces trunk` output and ask students to find the problem before revealing it. Write the three ACL rules (top-down, first match, implicit deny) and show an inbound versus outbound example on an SVI."
   ],
   [
    17,
    "Activity",
    "Run 'Follow the Frame' in pairs. Circulate, asking pairs to name the exact command they would run next."
   ],
   [
    5,
    "Discuss",
    "Ask pairs to share the hardest ticket and pose the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions individually."
   ]
  ],
  "warmup": "One morning, the entire office network becomes almost unusable within seconds, and every switch light is blinking constantly. What could cause a whole network to fail at once without any device actually breaking?",
  "activity": {
   "title": "Follow the Frame",
   "materials": "Printed ticket sheets (one per pair) with six short tickets and matching command output excerpts (`show vlan brief`, `show interfaces trunk`, `show spanning-tree`, `show access-lists` with hit counters), whiteboard, markers.",
   "steps": [
    "Each pair receives a ticket sheet. Tickets include a host in the wrong VLAN, a trunk missing a VLAN, a native VLAN mismatch log message, an ACL with a deny but no permit, an ACL applied in the wrong direction and a loop with MAC flapping messages.",
    "For each ticket, pairs trace the frame from the host outward on a quick sketch: access port, VLAN, trunks, gateway SVI, ACL. They circle the point where the frame fails.",
    "Pairs write the fix as a single command or action, being careful with keywords such as add on trunk allowed lists.",
    "The teacher calls on pairs to present one ticket each at the whiteboard, and the class votes on whether the fix is complete or would cause a new problem."
   ]
  },
  "discussion": [
   "Why might an organization choose to shut down unused switch ports and enable BPDU guard everywhere users can plug in, and what is the trade-off?",
   "How can a change management process reduce self-inflicted outages like replacing a trunk's allowed VLAN list?"
  ],
  "exit": [
   [
    "List three symptoms of a switching loop.",
    "Any three of: network-wide slowdown, broadcast storm, very high switch CPU, constantly flashing link lights, MAC address flapping messages."
   ],
   [
    "VLAN 50 works on the core switch but not on a remote access switch, while other VLANs work there. What two things should you check?",
    "Whether VLAN 50 exists in the remote switch's VLAN database and whether it is in the allowed list on every trunk along the path."
   ],
   [
    "An ACL contains only `deny host 10.1.1.5`. What effect does it have when applied?",
    "It blocks 10.1.1.5 and, because of the implicit deny, all other traffic too."
   ]
  ],
  "differentiation": [
   "Support: Provide a flowchart handout (host port up, correct VLAN, VLAN on trunk, native VLAN matches, SVI up, ACL) and let students check boxes while working through each ticket.",
   "Extend: Challenge fast finishers to write a short ACL that blocks the guest VLAN from the server VLAN but allows everything else, state where and in which direction to apply it, and explain why."
  ]
 },
 {
  "t": "Routing issues: routing tables, default routes, address pool exhaustion, incorrect gateway, subnet mask or IP",
  "objectives": [
   "Students will be able to identify an incorrect IP address, subnet mask or default gateway from `ipconfig` output and predict its symptoms.",
   "Students will be able to apply an inside-out testing sequence (ipconfig, loopback, own address, gateway, remote host, traceroute) to isolate a fault.",
   "Students will be able to distinguish DHCP scope exhaustion from NAT pool exhaustion by their symptoms.",
   "Students will be able to read a routing table to determine which route matches a destination and recognize missing default or return routes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up prompt and have students discuss in pairs for two minutes, then share one idea per pair."
   ],
   [
    12,
    "Teach",
    "Draw a host, a switch and a router on the board. Show what happens with a wrong gateway, a too-broad mask and a too-narrow mask. Present the inside-out ping sequence. Show a small routing table and work through longest prefix match for two destinations. Explain return routes with a two-router drawing."
   ],
   [
    18,
    "Activity",
    "Run 'Broken Configs' in groups of three. Circulate and ask each group which test in the sequence would fail first."
   ],
   [
    5,
    "Discuss",
    "Review the trickiest cards and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card or paper."
   ]
  ],
  "warmup": "A computer can open files on a printer and server in the same room, but cannot load any website. List every setting on that computer that could cause this.",
  "activity": {
   "title": "Broken Configs",
   "materials": "Printed cards each showing `ipconfig` output or a short `show ip route` excerpt with one hidden error, an answer key for the teacher, whiteboard, student laptops with a browser (optional, for an online subnet calculator).",
   "steps": [
    "Each group receives eight cards: a gateway on the wrong subnet, a /16 mask on a /24 network, a /27 mask that is too narrow, an IP from the wrong subnet, a host with 169.254 addressing, a router table with no default route, a router table where a /24 and a /8 both match, and a traceroute with repeating hops.",
    "For each card, the group writes the symptom a user would report, the first test in the inside-out sequence that would fail, and the fix.",
    "Groups swap their completed answers with another group, which checks them against its own reasoning and marks any disagreements.",
    "The teacher reviews disagreements at the whiteboard, asking a student from each side to explain, then confirms the answer."
   ]
  },
  "discussion": [
   "Why is it good practice to check one affected host's configuration before changing any shared router or DHCP settings?",
   "What could go wrong if a static default route stays in place after the primary internet link fails, and how would you design failover?"
  ],
  "exit": [
   [
    "A PC has IP 10.1.1.20/24 and gateway 10.1.2.1. What will the user experience?",
    "The PC can reach hosts on 10.1.1.0/24 but nothing on other networks, because the gateway is not on its subnet."
   ],
   [
    "New devices get 169.254.x.x addresses but existing ones work. What is the likely cause?",
    "DHCP scope exhaustion: no free addresses remain for new clients."
   ],
   [
    "A router has routes to 10.0.0.0/8 and 10.20.5.0/24. Which route does it use for 10.20.5.9, and why?",
    "10.20.5.0/24, because the longest (most specific) prefix match wins."
   ]
  ],
  "differentiation": [
   "Support: Provide a subnet cheat sheet showing /24, /23 and /16 ranges, and pair struggling students with a partner to work through the first three cards using an online subnet calculator.",
   "Extend: Give fast finishers a two-site scenario where traffic leaves through one firewall and returns through another, and ask them to explain why sessions fail and propose two designs that fix the asymmetric path."
  ]
 },
 {
  "t": "Service issues: DHCP scope exhaustion, duplicate IPs, DNS failures, NTP issues",
  "objectives": [
   "Students will be able to match user complaints to the failing service (DHCP, duplicate IP, DNS or NTP) using each service's failure signature.",
   "Students will be able to trace a duplicate IP address to a switch port using the ARP table and MAC address table.",
   "Students will be able to use nslookup or dig against specific servers to separate client DNS problems from server or record problems.",
   "Students will be able to explain how clock skew breaks Kerberos authentication and certificate validation, and how NTP prevents it."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and ask students to vote by raising hands for DHCP, DNS, NTP or 'cable problem'. Record the votes on the board."
   ],
   [
    12,
    "Teach",
    "Present each service's failure signature in a four-column table on the whiteboard: symptom, quick test, root causes, fix. Walk through the ARP-to-MAC-table trace output and the IP-versus-name ping test. Explain the Kerberos five-minute default skew tolerance."
   ],
   [
    18,
    "Activity",
    "Run the 'Help Desk Role-Play' in groups of three. Circulate, listening for students who ask about scope and timing (who is affected, since when)."
   ],
   [
    5,
    "Discuss",
    "Revisit the warm-up vote and discuss which clue should have changed students' minds, then pose the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A user calls and says, 'The internet is down.' You find you can ping a public IP address from their PC, but their browser cannot load any site. Which service would you suspect, and what one test would confirm it?",
  "activity": {
   "title": "Help Desk Role-Play",
   "materials": "Printed role cards: caller cards with a complaint and hidden facts (such as 'you arrived after lunch' or 'your clock shows 3:12 when the wall clock says 3:00'), technician cards with a blank troubleshooting log, and an observer checklist; whiteboard.",
   "steps": [
    "In each group of three, one student is the caller, one the technician and one the observer. The caller reads only the complaint aloud and reveals hidden facts only when the technician asks a relevant question.",
    "The technician asks questions and names tests they would run (for example `ipconfig /all`, `nslookup` against a specific server, `arp -a`, `w32tm /query /status`), and the caller reads back the result printed on the card.",
    "The technician states the failing service and the fix; the observer checks whether the technician used the shortest path to the answer and notes any unnecessary steps.",
    "Rotate roles twice so each student plays each role, using a new card each time. End by having each group write its fastest diagnosis on the board."
   ]
  },
  "discussion": [
   "Why do users so often describe a DNS failure as 'the internet is down', and how should a help desk script account for that?",
   "What are the trade-offs of short versus long DHCP lease times on a guest network compared with a staff network?"
  ],
  "exit": [
   [
    "New guests get 169.254.x.x addresses while earlier guests work fine. The scope shows 100 percent in use. What is the problem and one fix?",
    "DHCP scope exhaustion; shorten lease times, expand the scope or subnet, or remove stale leases."
   ],
   [
    "A user can ping 10.0.0.25 but not fileserver.corp.local. What service is failing?",
    "DNS (name resolution)."
   ],
   [
    "Why might a laptop whose clock is 15 minutes slow fail to log on to the domain?",
    "Kerberos rejects authentication when clock skew exceeds its tolerance, five minutes by default."
   ]
  ],
  "differentiation": [
   "Support: Provide a signature cheat card listing each service, its tell-tale symptom and its quick test, and let struggling students play the observer first to see the process before acting as technician.",
   "Extend: Ask fast finishers to design a prevention plan for a fictional campus covering DHCP lease times, conflict detection, IPAM, redundant DNS servers in DHCP options and an NTP hierarchy, and explain how each control would show up in monitoring."
  ]
 },
 {
  "t": "Performance issues: congestion, bottlenecks, bandwidth, latency, packet loss, jitter",
  "objectives": [
   "Students will be able to define and distinguish bandwidth, throughput, congestion, bottleneck, latency, jitter and packet loss.",
   "Students will be able to match user complaints (choppy voice, slow transfers, laggy clicks) to the performance metric most likely responsible.",
   "Students will be able to interpret mtr or traceroute output to locate where loss and jitter begin and to dismiss probe rate-limiting.",
   "Students will be able to select appropriate fixes, explaining why bandwidth does not reduce latency and QoS does not create capacity."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect quick answers. Write 'more bandwidth' on the board and ask whether it fixes everything; leave it as an open question."
   ],
   [
    12,
    "Teach",
    "Use a highway drawing on the whiteboard to define each term. Write the rough voice guidance (about 150 ms one-way, 30 ms jitter, 1 percent loss) as a sense of scale. Project the mtr sample and walk through reading Loss% and StDev hop by hop."
   ],
   [
    18,
    "Activity",
    "Run 'Slow Network Simulation' as a whole-class physical demo followed by small-group card matching. Circulate during the card portion."
   ],
   [
    5,
    "Discuss",
    "Return to the warm-up board note and ask whether more bandwidth fixes each case; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Two users both say 'the network is slow'. One is on a video call that keeps freezing; the other is waiting on a large file copy. Do you think they have the same problem? Why or why not?",
  "activity": {
   "title": "Slow Network Simulation",
   "materials": "Sticky notes or paper slips as 'packets', a roll of tape to mark a 'link' on the floor, a stopwatch on a phone or the projector, printed complaint cards with short monitoring snippets (interface utilization, output drops, mtr lines, ping results), whiteboard.",
   "steps": [
    "Mark a path on the floor with a narrow 'bottleneck' section only one student wide. Have six students carry sticky-note packets from sender to receiver one at a time while another student times arrivals; then send all six at once and observe queuing at the bottleneck.",
    "Ask one student to walk at varying speeds to show jitter (uneven arrival times), and have a 'router' student drop a packet when more than three are waiting, to show loss from a full queue.",
    "Split into groups of three. Give each group six complaint cards and have them label each with the main metric (bandwidth, congestion, bottleneck, latency, jitter, loss) and one fix.",
    "Groups present one card each; the class challenges any fix that would not help, such as adding bandwidth for a latency problem."
   ]
  },
  "discussion": [
   "Why is a performance baseline essential before you can say whether the network is slow?",
   "When should a team buy more bandwidth versus apply QoS or reschedule traffic, and how would you justify the decision to management?"
  ],
  "exit": [
   [
    "What is the difference between bandwidth and throughput?",
    "Bandwidth is the maximum rate a link can carry; throughput is the rate actually achieved, which is lower."
   ],
   [
    "A call sounds robotic, but file downloads are fast. Which metrics are most likely to blame?",
    "Jitter and packet loss."
   ],
   [
    "An interface shows many output drops but no CRC errors. What does this indicate?",
    "Congestion: queues are overflowing because more traffic is offered than the link can carry, rather than a physical fault."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page glossary with the highway analogy for each term and let them match terms to pictures before tackling complaint cards.",
   "Extend: Ask fast finishers to calculate the oversubscription ratio for 48 gigabit ports on a 10 Gbps uplink and for 96 gigabit ports on a 1 Gbps uplink, then recommend a design and QoS policy for a voice-heavy office."
  ]
 },
 {
  "t": "Wireless issues: interference, channel overlap, signal degradation, coverage gaps, client disassociation, roaming misconfiguration",
  "objectives": [
   "Students will be able to calculate SNR from signal and noise readings and explain how interference degrades performance.",
   "Students will be able to distinguish adjacent-channel from co-channel interference and design a 2.4 GHz channel plan using channels 1, 6 and 11.",
   "Students will be able to diagnose coverage gaps, client disassociation and roaming misconfiguration using the where, when and which-devices questions.",
   "Students will be able to justify why maximizing access point power is usually the wrong fix."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question; have students write a one-sentence answer and hold it up. Note the split between 'yes' and 'no'."
   ],
   [
    12,
    "Teach",
    "Draw the 2.4 GHz channel overlap diagram showing channels 1 to 11 and where 1, 6 and 11 sit. Work the SNR example (-65 signal, -95 noise, then -75 noise). Explain the three diagnostic questions and list what must match for roaming: SSID, security and VLAN."
   ],
   [
    18,
    "Activity",
    "Run 'Floor Plan Channel Puzzle' in groups of three or four. Circulate and question each group's choices about channel and power."
   ],
   [
    5,
    "Discuss",
    "Groups present their floor plans briefly; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "If the Wi-Fi is weak in one part of a building, would turning every access point up to maximum power fix it? Write yes or no and one reason.",
  "activity": {
   "title": "Floor Plan Channel Puzzle",
   "materials": "Printed floor plans (one per group) showing 9 access point locations, a break room with a microwave, a metal-shelved storeroom and a stairwell; colored markers or sticky dots for channels 1, 6 and 11; printed incident cards; optional student laptops with a free Wi-Fi analyzer app.",
   "steps": [
    "Groups assign channels 1, 6 and 11 to the nine access points so that no two neighbors share a channel, using colored dots.",
    "The teacher hands out three incident cards: lunchtime slowdowns near the break room, drops in the storeroom, and voice calls dropping between two wings with different VLAN mappings. Groups annotate the floor plan with the cause and a fix for each.",
    "Groups mark where they would place one additional access point and explain whether they would raise or lower power on its neighbors.",
    "If laptops are available, students run a Wi-Fi analyzer in the classroom and record the channels and signal levels they see, then identify any overlap in the real environment."
   ]
  },
  "discussion": [
   "Why does moving clients to 5 GHz or 6 GHz often solve interference problems, and what new problems might it introduce?",
   "How would you prove to a skeptical manager that a problem is caused by a client driver rather than the access points?"
  ],
  "exit": [
   [
    "A signal is -62 dBm and the noise floor is -92 dBm. What is the SNR, and is it healthy?",
    "30 dB, which is healthy."
   ],
   [
    "Two neighboring access points are both on channel 6. What type of problem is this and what is its main effect?",
    "Co-channel interference; the access points must share airtime, reducing capacity."
   ],
   [
    "Name three settings that must match on access points for clients to roam seamlessly.",
    "SSID, security settings (passphrase or 802.1X configuration) and VLAN mapping."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pre-drawn channel overlap chart and a partially completed floor plan with three access points already assigned so they only complete the pattern.",
   "Extend: Ask fast finishers to redo the plan for a dense lecture hall using 5 GHz, choosing channel widths and explaining how 802.11k, 802.11r and 802.11v would help voice clients."
  ]
 },
 {
  "t": "Software tools: protocol analyzer, command line (ping, traceroute, nslookup, dig, tcpdump, netstat, arp, ip/ipconfig), nmap, LLDP/CDP, speed testers, iperf",
  "objectives": [
   "Students will be able to select the appropriate software tool for a troubleshooting question from a scenario description.",
   "Students will be able to interpret basic output from ping, traceroute, dig or nslookup, netstat or ss, arp and nmap.",
   "Students will be able to explain why ping failure, internet speed tests and unmirrored packet captures can mislead.",
   "Students will be able to describe ethical and authorization requirements for scanning and packet capture."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up prompt and have students jot answers. Ask two students to share what they would conclude."
   ],
   [
    12,
    "Teach",
    "Write the seven questions on the board (reachable, path, config, listening, on the wire, what is connected, how fast) and map each tool to one. Project the sample output and have students call out what each line means. Stress authorization before scanning or capturing."
   ],
   [
    18,
    "Activity",
    "Run 'Tool for the Job' as a card sort, then a live practice round on student laptops. Circulate during both."
   ],
   [
    5,
    "Discuss",
    "Review any cards groups disagreed on and pose the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "You ping a company web server and get no reply, but you can load its home page in your browser. What can you conclude, and what can you not conclude?",
  "activity": {
   "title": "Tool for the Job",
   "materials": "Printed tool cards (ping, traceroute, ipconfig/ip, nslookup, dig, netstat/ss, arp, tcpdump, protocol analyzer, nmap, LLDP/CDP, speed test, iperf), printed scenario cards, printed output snippets, student laptops with a browser and terminal for safe local commands.",
   "steps": [
    "In groups of three, students match 12 scenario cards (for example 'Which hop drops traffic to the branch?' or 'Is anything listening on port 3389 on this server?') to the correct tool card and write a one-line justification.",
    "Groups then match five output snippets (nmap open/closed/filtered, a traceroute that stops, an ss listening line, a dig answer, an arp entry) to the scenario they answer and write what each output means.",
    "On their own laptops, students run safe local commands only: `ipconfig /all` or `ip addr`, `ping` to the default gateway, `tracert` or `traceroute` to a public site, `nslookup` for a well-known domain and `netstat -an` or `ss -tuln`, recording one fact from each.",
    "Close by asking each group to explain one tool that could give a misleading answer and how they would double-check it."
   ]
  },
  "discussion": [
   "Why should an administrator get written permission before running nmap or a packet capture, even on their own employer's network?",
   "When would you choose tcpdump over a graphical protocol analyzer, and how might you use both together?"
  ],
  "exit": [
   [
    "Which tool would you use to see which switch port a server is connected to, without walking to the closet?",
    "LLDP or CDP, for example `show lldp neighbors` or `show cdp neighbors` on the switch."
   ],
   [
    "An nmap scan shows port 22 as closed. What does that mean?",
    "The host responded, but no service is listening on port 22."
   ],
   [
    "You need to measure throughput across your own WAN link between two offices. Which tool, and why not a speed test?",
    "iperf, because it measures between two endpoints you control; a speed test goes to an internet server and includes outside variables."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page 'one question, one tool' chart and let struggling students use it during the card sort, then remove it for the output-matching round.",
   "Extend: Ask fast finishers to write a capture filter for tcpdump that records only DNS traffic to a specific server and a Wireshark display filter for TCP retransmissions, then explain what each would help diagnose."
  ]
 },
 {
  "t": "Hardware tools: toner and probe, cable tester, cable certifier, TDR/OTDR, loopback plug, Wi-Fi analyzer, visual fault locator",
  "objectives": [
   "Students will be able to match each hardware tool to the specific troubleshooting question it answers.",
   "Students will be able to explain the difference between a cable tester and a cable certifier and when each is required.",
   "Students will be able to choose between TDR, OTDR and VFL based on cable type and distance.",
   "Students will be able to sequence hardware tools logically to isolate a Layer 1 fault from port to cable to far end."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up question on the projector. Students write an answer and compare with a neighbor."
   ],
   [
    12,
    "Teach",
    "Write the seven questions on the board and pair each with its tool. Show photos or drawings of each tool if available. Emphasize tester versus certifier, TDR versus OTDR, and VFL distance limits. State the fiber safety rule: never look into a fiber."
   ],
   [
    18,
    "Activity",
    "Run 'Toolbox Relay' in teams. Keep score on the whiteboard and briefly explain each correct answer."
   ],
   [
    5,
    "Discuss",
    "Pose the discussion questions and connect them back to cost and documentation."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "You have 200 unlabeled cables in a closet and need to find the one going to a specific office. What would you need, and why can you not just test each cable?",
  "activity": {
   "title": "Toolbox Relay",
   "materials": "Printed tool cards (toner and probe, cable tester, cable certifier, TDR, OTDR, loopback plug, Wi-Fi analyzer, spectrum analyzer, VFL, optical power meter) placed on a table at the front, printed scenario strips, whiteboard for scoring, and if available, a real cable tester, loopback plug or toner kit to pass around.",
   "steps": [
    "Split the class into three or four teams lined up at the back of the room. The teacher reads a scenario strip aloud, for example 'Prove a new run meets Cat 6a' or 'Find the distance to a break in buried fiber'.",
    "The first student from each team walks to the table, picks the tool card they think fits and returns. Teams score a point for the correct tool and a bonus point if they can state the question the tool answers.",
    "After ten rounds, give each team a multi-step scenario (a dead desk port) and have them arrange the tool cards in the order they would use them, writing one line for what each step rules out.",
    "Teams present their sequences; the teacher highlights efficient orders, such as testing the port with a loopback plug before tracing the cable, and corrects any misuse."
   ]
  },
  "discussion": [
   "Why might an organization rent or contract a cable certifier rather than buy one, and what risks come with skipping certification on a new install?",
   "How does good cable labeling and documentation reduce the need for tools like toner and probe?"
  ],
  "exit": [
   [
    "Which tool would you use to find the distance to a break in a copper cable hidden in a wall?",
    "A TDR (time-domain reflectometer)."
   ],
   [
    "A cable passes a wiremap test. Does that prove it meets Cat 6 performance? Explain.",
    "No. Wiremap checks only continuity and pin order; a certifier is needed to measure crosstalk, insertion loss and other parameters."
   ],
   [
    "What does a loopback plug test, and what does a pass tell you?",
    "It tests the port itself by sending its transmit signal back to its receive; a pass means the port works and the fault is in the cable or far end."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column matching worksheet (question and tool) to complete before the relay so they can play with confidence.",
   "Extend: Ask fast finishers to sketch what an OTDR trace might look like for a run with two connectors, a splice and a break, labeling each event and explaining what the steep drop at the break means."
  ]
 },
 {
  "t": "Basic device commands: show mac-address-table, show route, show interface, show config, show arp, show vlan, show power",
  "objectives": [
   "Students will be able to select the correct show command for a given troubleshooting question.",
   "Students will be able to chain show arp and show mac-address-table output to locate a device's physical switch port.",
   "Students will be able to interpret show interface counters to identify speed, duplex and physical errors.",
   "Students will be able to compare running and startup configurations to detect unsaved changes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up question and take a few answers. Write 'IP -> MAC -> port' on the board as a teaser."
   ],
   [
    12,
    "Teach",
    "Introduce each command with a one-line question it answers. Project the ARP-to-MAC-to-interface chain and walk through it line by line. Show sample `show interface` counters and ask which values indicate a problem. Explain running versus startup configuration."
   ],
   [
    18,
    "Activity",
    "Run 'Command Chain Hunt' in pairs. Circulate, asking pairs which command they will run next and why."
   ],
   [
    5,
    "Discuss",
    "Pairs share their routes through the hunt; pose the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "You know a misbehaving device's IP address but not where it is in the building. Which pieces of information would you need to find its physical port, and where might a switch or router store them?",
  "activity": {
   "title": "Command Chain Hunt",
   "materials": "Printed 'device output packets' for a fictional three-switch network (core switch ARP table, access switch MAC tables, show interfaces status, show vlan brief, show power inline, running and startup configs), a printed network diagram, ticket cards, whiteboard. Optional: student laptops with a free browser-based network simulator.",
   "steps": [
    "Each pair receives a ticket card (for example 'Find the device using 10.1.20.33', 'Why is the camera on Gi1/0/9 dark?', 'Why did port 14 return to VLAN 1 after reboot?') and the output packets. Pairs may only 'run' a command by requesting that page from the teacher's stack.",
    "Pairs record each command they request and what it told them, aiming to solve the ticket with the fewest commands. One ticket requires following a MAC from an uplink to a second switch.",
    "After solving, pairs write the fix and the command that would verify it.",
    "The teacher displays the shortest solution path for each ticket on the whiteboard, and pairs compare their routes and note any unnecessary steps."
   ]
  },
  "discussion": [
   "Why should technicians compare the running configuration with the startup configuration before and after making changes?",
   "How could regularly reviewing show mac-address-table output help detect unauthorized devices on the network?"
  ],
  "exit": [
   [
    "Which command shows which MAC address belongs to IP 10.5.5.20 on a gateway router?",
    "show arp (show ip arp)."
   ],
   [
    "A MAC address appears on access port Gi1/0/7 in show mac-address-table. What does that tell you?",
    "The device with that MAC is connected (directly or through an unmanaged device) to port Gi1/0/7 on this switch."
   ],
   [
    "What risk does a difference between running and startup configuration indicate?",
    "There are unsaved changes that will be lost if the device reboots."
   ]
  ],
  "differentiation": [
   "Support: Provide a command reference card listing each show command with the question it answers and a sample line of output, and allow struggling pairs to start with a single-switch ticket.",
   "Extend: Ask fast finishers to write a short troubleshooting runbook for a 'PoE device dead' ticket and a 'wrong VLAN' ticket, listing the exact commands in order and the output that would confirm or rule out each cause."
  ]
 }
]);
