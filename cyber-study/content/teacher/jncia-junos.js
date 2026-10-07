/* Teacher edition for Juniper Networks Certified Associate, Junos (JNCIA-Junos) (JN0-106): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("jncia-junos", [
 {
  "t": "Collision domains and broadcast domains, and how switches and routers divide them",
  "objectives": [
   "Students will be able to define collision domain and broadcast domain and explain why each affects network performance.",
   "Students will be able to state which devices and features (hub, switch, VLAN, router) split each type of domain.",
   "Students will be able to count collision and broadcast domains correctly in a mixed network diagram.",
   "Students will be able to recommend VLANs or routing to reduce broadcast traffic in a given scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect three or four answers on the whiteboard without correcting them yet."
   ],
   [
    12,
    "Teach",
    "Explain collision domains using the hub story and CSMA/CD, then broadcast domains using ARP and DHCP as examples. Write the summary line 'hubs split nothing, switches split collisions, VLANs and routers split broadcasts' on the board."
   ],
   [
    15,
    "Activity",
    "Run the diagram-counting activity in pairs, then reveal answers diagram by diagram, having one pair explain each count aloud."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to connect the counting rules to real design choices such as guest networks and broadcast storms."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand it in at the door."
   ]
  ],
  "warmup": "Imagine 200 computers on one big network where every computer hears every announcement any other computer makes. What problems might that cause, and how would you fix it?",
  "activity": {
   "title": "Circle the domains",
   "materials": "Four printed network diagrams (or projected slides) mixing hubs, switches, routers and VLANs; two colors of marker or pen per pair.",
   "steps": [
    "Give each pair the four diagrams, ranging from a single switch to a router joining a switch and a hub.",
    "Ask pairs to circle each collision domain in one color and each broadcast domain in the other, then write the totals beside each diagram.",
    "For the last diagram, add a twist: split the switch into two VLANs and ask how the counts change.",
    "Reveal answers and have pairs who disagreed explain their reasoning before you confirm the correct count."
   ]
  },
  "discussion": [
   "Why do you think almost no one buys hubs anymore, yet broadcast domains are still a design concern?",
   "If VLANs separate broadcast domains for free, why not put every user in a separate VLAN?"
  ],
  "exit": [
   [
    "Which device splits collision domains but not broadcast domains?",
    "A switch (or bridge), because each port is its own collision domain but broadcasts are flooded to all ports in the VLAN."
   ],
   [
    "A router has three interfaces in use. How many broadcast domains does it create?",
    "Three, one per interface."
   ],
   [
    "How can a single switch be divided into multiple broadcast domains?",
    "By configuring VLANs; each VLAN is a separate broadcast domain."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page reference card showing each device with a symbol for 'splits collisions' and 'splits broadcasts', and start them on the simplest diagram with one switch before moving to mixed diagrams.",
   "Extend: Ask fast finishers to design a small clinic network with staff, guest and medical device groups, then count every domain and explain where an IRB interface would sit."
  ]
 },
 {
  "t": "What routers and switches do: Layer 2 frame forwarding vs Layer 3 packet forwarding",
  "objectives": [
   "Students will be able to distinguish Layer 2 frame forwarding from Layer 3 packet forwarding by the addresses and tables each uses.",
   "Students will be able to describe which header fields change and which stay the same at each routed hop.",
   "Students will be able to compare how switches and routers handle unknown destinations and broadcasts.",
   "Students will be able to identify Junos configuration that makes an interface switched or routed."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about envelopes and let students guess which addresses change in transit."
   ],
   [
    12,
    "Teach",
    "Walk through switch forwarding (learn, look up, forward or flood) and router forwarding (strip, look up longest match, decrement TTL, rewrite). Show `show ethernet-switching table` and `show route` output on the projector."
   ],
   [
    16,
    "Activity",
    "Run the 'Envelope relay' role-play across three hops, then debrief what each 'device' changed."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions to connect the role-play to Layer 3 switches and IRB interfaces."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "When you mail a letter across the country, which information on it changes along the way and which never changes? How might that relate to a network?",
  "activity": {
   "title": "Envelope relay",
   "materials": "Paper, envelopes or folded sheets, sticky notes for MAC 'outer labels', a whiteboard drawing of PC, switch, router, switch, server.",
   "steps": [
    "Assign students as PC, Switch 1, Router, Switch 2 and Server, each with a MAC written on a name tag; the PC and Server also have IP addresses.",
    "The PC writes source and destination IPs and a TTL of 5 on the inner sheet, then sticks an outer label with its own MAC and the router's MAC.",
    "Switches pass the envelope along without changing anything; the Router removes the outer label, lowers the TTL by one and writes a new label with its MAC and the server's MAC.",
    "The class records on the board what changed at each step and confirms that IPs stayed fixed while MAC labels changed at the router."
   ]
  },
  "discussion": [
   "Why might routers drop unknown traffic while switches flood it? What would go wrong if routers flooded?",
   "If an EX switch can route with IRB interfaces, is it a switch or a router? Does the label matter?"
  ],
  "exit": [
   [
    "Which address does a switch use to make forwarding decisions?",
    "The destination MAC address."
   ],
   [
    "What happens to the TTL each time a packet passes through a router?",
    "It is decremented by one; the packet is dropped if it reaches zero."
   ],
   [
    "A capture before and after a router shows different MAC addresses but the same IPs. Is this normal?",
    "Yes. Routers rewrite the Layer 2 header at each hop while IP addresses stay the same (without NAT)."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column comparison table (switch vs router) with blanks for address type, table name, unknown destination behavior and header changes, and let students fill it in during the teach segment.",
   "Extend: Give fast finishers a routing table with four overlapping prefixes and five destination addresses, and ask them to pick the route for each using longest-prefix match."
  ]
 },
 {
  "t": "Ethernet frames, MAC addresses (48 bits, OUI) and the MAC learning/flooding process",
  "objectives": [
   "Students will be able to label the fields of an Ethernet II frame, including the 802.1Q tag position and the FCS.",
   "Students will be able to explain the structure of a 48-bit MAC address, including the OUI and the broadcast address.",
   "Students will be able to trace the MAC learning, forwarding, filtering and flooding process on a switch step by step.",
   "Students will be able to interpret a Junos Ethernet switching table to troubleshoot a missing device."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and have students find a MAC address on their own laptop or phone settings."
   ],
   [
    12,
    "Teach",
    "Draw the Ethernet II frame on the board field by field, then explain MAC structure and the learning process. Project a sample `show ethernet-switching table` output."
   ],
   [
    15,
    "Activity",
    "Run the 'Human switch' simulation, updating a whiteboard MAC table after each frame."
   ],
   [
    8,
    "Discuss",
    "Use discussion questions to connect learning behavior to troubleshooting and security."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions individually."
   ]
  ],
  "warmup": "Find the hardware (MAC) address of your laptop or phone. What do you notice about its length and format? What might the first half tell you?",
  "activity": {
   "title": "Human switch",
   "materials": "Index cards labeled as frames (source MAC, destination MAC), a whiteboard grid for the MAC table, tape marking four 'ports' on the floor.",
   "steps": [
    "Choose one student as the switch and four students as hosts standing at ports 1 to 4, each with a short MAC label.",
    "Hosts hand frame cards to the switch one at a time; the switch writes the source MAC and port in the table before deciding to forward, filter or flood.",
    "The class calls out the correct action for each frame; include a broadcast, an unknown destination and a frame for a host on the same port.",
    "Finish by erasing one entry to simulate aging and asking what happens to the next frame for that host."
   ]
  },
  "discussion": [
   "Why might a switch's habit of flooding unknown frames be a privacy or security concern on a shared network?",
   "Why do you think switches age out entries instead of keeping them forever?"
  ],
  "exit": [
   [
    "What part of a MAC address identifies the manufacturer?",
    "The OUI, the first 24 bits."
   ],
   [
    "A switch receives a frame for a known MAC on a different port. What does it do?",
    "Forwards it out only that port."
   ],
   [
    "What is the MAC broadcast address?",
    "ff:ff:ff:ff:ff:ff (all 48 bits set to 1)."
   ]
  ],
  "differentiation": [
   "Support: Hand out a color-coded frame diagram with each field's size printed in it, and walk struggling students through two frames of the human switch exercise before they decide actions alone.",
   "Extend: Ask fast finishers to decode the individual/group and universal/local bits for several sample MAC addresses and explain what each result means."
  ]
 },
 {
  "t": "ARP: resolving an IPv4 next hop to a MAC address; gratuitous ARP; `show arp`",
  "objectives": [
   "Students will be able to describe the ARP request and reply exchange, including which message is broadcast and which is unicast.",
   "Students will be able to determine which IP address a host ARPs for when the destination is local versus remote.",
   "Students will be able to explain the purposes of gratuitous ARP, including failover and duplicate address detection.",
   "Students will be able to use and interpret Junos `show arp`, `show arp no-resolve` and `clear arp` output."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and gather ideas about how a device could find a hardware address it does not know."
   ],
   [
    12,
    "Teach",
    "Draw the ARP request and reply on the board, then show the local versus remote decision. Explain gratuitous ARP and project sample `show arp no-resolve` output."
   ],
   [
    15,
    "Activity",
    "Run the 'Who has this IP?' role-play with a correct scenario, a wrong-mask scenario and a failover scenario."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions, including the security implications of an unauthenticated protocol."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Your laptop knows the printer's IP address but needs its hardware address to send anything over Ethernet. How could it find out, if it has never talked to the printer before?",
  "activity": {
   "title": "Who has this IP?",
   "materials": "Name cards with an IP address and MAC address for each student, a whiteboard 'ARP cache' for two students, a printed scenario sheet.",
   "steps": [
    "Give six students IP and MAC cards on the same subnet, plus one 'router' card with two interfaces on different subnets.",
    "A sender reads a destination IP, decides if it is local using its mask, and calls out a broadcast request for either the destination or the gateway; only the owner replies quietly to the sender.",
    "Update the sender's whiteboard ARP cache; repeat with a wrong mask on the sender and let the class discover why no one answers.",
    "Simulate a failover: the 'backup router' takes over the gateway IP and shouts a gratuitous ARP; students holding stale entries update them."
   ]
  },
  "discussion": [
   "ARP has no authentication. How could an attacker abuse that, and what could a network team do to detect or prevent it?",
   "Why do you think Junos ages out ARP entries instead of keeping them until the interface goes down?"
  ],
  "exit": [
   [
    "Is an ARP request broadcast or unicast?",
    "Broadcast, to ff:ff:ff:ff:ff:ff."
   ],
   [
    "A host at 10.1.1.5/24 sends to 10.2.2.5. Which IP does it ARP for?",
    "Its default gateway's IP, because 10.2.2.5 is on a different subnet."
   ],
   [
    "What is one reason a router sends a gratuitous ARP after a VRRP failover?",
    "To update hosts' and switches' tables so the virtual IP now maps to the new master's MAC."
   ]
  ],
  "differentiation": [
   "Support: Provide a flowchart card (Is the destination on my subnet? Yes: ARP for it. No: ARP for the gateway.) and pair struggling students with a partner for the first role-play round.",
   "Extend: Ask fast finishers to compare ARP with IPv6 neighbor discovery, naming the message types and the multicast used instead of broadcast."
  ]
 },
 {
  "t": "IPv4 addressing: classes, private ranges, subnet masks, CIDR prefixes and subnetting math",
  "objectives": [
   "Students will be able to identify classful ranges, RFC 1918 private ranges, loopback and link-local addresses.",
   "Students will be able to convert between prefix lengths and dotted-decimal subnet masks.",
   "Students will be able to calculate the network address, broadcast address and usable host range for any IPv4 address and prefix.",
   "Students will be able to divide an address block into subnets that meet given host requirements."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display five addresses and ask students to classify each as private or public."
   ],
   [
    13,
    "Teach",
    "Review classes and private ranges, then build the mask table on the board. Demonstrate the block-size method with two worked examples, one in the last octet and one in the third."
   ],
   [
    17,
    "Activity",
    "Run the 'Subnet race' in teams with a progressive set of cards."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect subnet sizing to real design decisions."
   ],
   [
    5,
    "Exit ticket",
    "Students solve the three exit problems without calculators."
   ]
  ],
  "warmup": "Which of these addresses could be used on the public internet: 10.4.4.4, 172.32.1.1, 192.168.100.1, 172.31.200.9, 8.8.4.4? Explain your reasoning.",
  "activity": {
   "title": "Subnet race",
   "materials": "Printed problem cards in three difficulty tiers, whiteboard or scrap paper for each team, a projected answer key.",
   "steps": [
    "Split the class into teams of three and hand out tier-one cards (find network and broadcast for a last-octet prefix).",
    "When a team solves a card correctly, the teacher checks it and hands them a tier-two card (third-octet prefixes) and then tier three (design subnets for given host counts).",
    "Each team must show the block size calculation, not just the answer, to earn the next card.",
    "Finish by having two teams present one design problem each, explaining their prefix choices."
   ]
  },
  "discussion": [
   "Why do you think network designers often allocate the largest subnets first when carving up a block?",
   "What problems might appear if two sites accidentally use overlapping private subnets and later need to connect?"
  ],
  "exit": [
   [
    "What is the broadcast address of 10.1.1.200/26?",
    "10.1.1.255, because the /26 block containing .200 runs from .192 to .255."
   ],
   [
    "How many usable hosts does a /29 provide?",
    "Six (8 addresses minus network and broadcast)."
   ],
   [
    "Write the dotted-decimal mask for /20.",
    "255.255.240.0."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference strip listing prefix, mask, block size and usable hosts for /24 to /30, and have them practice only last-octet problems until they are confident.",
   "Extend: Challenge fast finishers to subnet 172.16.0.0/20 for five sites of different sizes using variable-length masks, then summarize the result back to a single route."
  ]
 },
 {
  "t": "IPv6 addressing: 128-bit format, compression rules, global unicast, link-local (fe80::/10), multicast, EUI-64",
  "objectives": [
   "Students will be able to compress and expand IPv6 addresses correctly using both compression rules.",
   "Students will be able to identify global unicast, link-local, unique local, multicast, loopback and unspecified addresses by prefix.",
   "Students will be able to derive an EUI-64 interface ID from a MAC address.",
   "Students will be able to explain why Junos shows an automatic link-local address after configuring family inet6."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write a full uncompressed IPv6 address on the board and ask students to suggest ways to shorten it."
   ],
   [
    12,
    "Teach",
    "Present the two compression rules with the only-one-double-colon reason, then the address types table, then EUI-64 step by step on the board."
   ],
   [
    16,
    "Activity",
    "Run the 'Valid or not' card sort followed by two EUI-64 calculations in pairs."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions to explore why IPv6 dropped broadcast and how link-local addresses help routing."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Here is an address: 2001:0db8:0000:0000:0000:ff00:0042:8329. If you had to read this aloud over the phone every day, what shortcuts would you want, and what rules would keep them unambiguous?",
  "activity": {
   "title": "Valid or not",
   "materials": "Printed cards each showing one IPv6 address (some valid, some with two double colons, some with dropped trailing zeros, some typed by type), a whiteboard with columns.",
   "steps": [
    "Give each pair a deck of about 15 address cards.",
    "Pairs sort cards into 'valid' and 'invalid', then sort the valid ones by type: global unicast, link-local, unique local, multicast, loopback.",
    "Pairs expand two compressed cards fully to prove they were valid.",
    "Finish with two EUI-64 calculations from given MAC addresses; one pair shows its work on the board for each."
   ]
  },
  "discussion": [
   "Why do you think IPv6 designers removed broadcast and relied on multicast instead?",
   "What are the privacy implications of building an interface ID from a device's MAC address?"
  ],
  "exit": [
   [
    "Why can :: appear only once in an IPv6 address?",
    "Because with two, the reader could not tell how many zero groups each represents."
   ],
   [
    "What prefix identifies link-local addresses?",
    "fe80::/10."
   ],
   [
    "What hex value is inserted into the middle of a MAC address in EUI-64?",
    "fffe."
   ]
  ],
  "differentiation": [
   "Support: Provide a worksheet that prints each hextet in its own box so students can apply one compression rule at a time, and a step card for EUI-64 with blanks for each stage.",
   "Extend: Ask fast finishers to work out the binary of the first byte for three MACs to show exactly why flipping the seventh bit changes 00 to 02 and 02 to 00."
  ]
 },
 {
  "t": "OSI and TCP/IP models; TCP vs UDP; well-known ports",
  "objectives": [
   "Students will be able to list the seven OSI layers in order and map them to the four TCP/IP layers.",
   "Students will be able to describe encapsulation and name the data unit at each layer.",
   "Students will be able to compare TCP and UDP and choose the appropriate one for a given application.",
   "Students will be able to recall the transport protocol and port number for common services, including BGP and OSPF."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the board."
   ],
   [
    13,
    "Teach",
    "Build the OSI and TCP/IP models side by side on the board, demonstrate encapsulation, then contrast TCP and UDP with the handshake drawn out."
   ],
   [
    15,
    "Activity",
    "Run the 'Port card match' activity in small groups, then the layer placement round."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions to connect ports and layers to firewall filter design."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When you send a package, what steps happen between putting an item in a box and it arriving at someone's door? Which steps could happen without knowing what is inside the box?",
  "activity": {
   "title": "Port card match",
   "materials": "Printed card sets: service names, port numbers, TCP/UDP labels and OSI layer cards with example devices or protocols.",
   "steps": [
    "Give each group of three a shuffled set of service, port and transport cards.",
    "Groups match each service to its port and transport within eight minutes, setting aside any they are unsure of.",
    "Reveal answers; groups score one point per correct triple and discuss the tricky ones such as DNS and OSPF.",
    "In a final round, groups place cards such as switch, router, HTTPS, MAC address and fiber cable onto the correct OSI layer."
   ]
  },
  "discussion": [
   "Why might a network engineer prefer to troubleshoot from Layer 1 upward rather than starting at the application?",
   "When would you choose to accept UDP's lack of reliability, and when would it be a mistake?"
  ],
  "exit": [
   [
    "Name the OSI layers in order from 1 to 7.",
    "Physical, Data Link, Network, Transport, Session, Presentation, Application."
   ],
   [
    "Which port and transport does BGP use?",
    "TCP port 179."
   ],
   [
    "What are the three messages of the TCP handshake?",
    "SYN, SYN-ACK, ACK."
   ]
  ],
  "differentiation": [
   "Support: Give students a partially completed port table with half the entries filled in and the OSI mnemonic printed at the top, and let them use it during the card match.",
   "Extend: Ask fast finishers to draft the list of terms a Junos loopback filter would need for a router running BGP, OSPF, SSH, NTP and SNMP, stating protocol and port for each."
  ]
 },
 {
  "t": "Class of service concepts: why traffic is classified, queued, scheduled and rewritten",
  "objectives": [
   "Students will be able to explain why CoS is needed and why it has effect only during congestion.",
   "Students will be able to describe the CoS pipeline stages (classification, policing, queuing and scheduling, rewrite) in order.",
   "Students will be able to state whether each stage occurs on ingress or egress.",
   "Students will be able to identify the Junos configuration hierarchy and verification commands used for CoS."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about lines at a busy venue and collect ideas for fair or priority systems."
   ],
   [
    12,
    "Teach",
    "Draw the CoS pipeline as boxes from ingress to egress, explaining each stage with the voice-and-backup example. Show the `[edit class-of-service]` sections on a projected slide."
   ],
   [
    15,
    "Activity",
    "Run the 'Congested link' simulation with packet cards and queues taped on desks."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to explore trust, fairness and the limits of CoS."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "At a busy theme park, some people use a priority pass while others wait in the regular line. What rules make that system work, and what happens to the regular line if too many people get passes?",
  "activity": {
   "title": "Congested link",
   "materials": "Colored paper slips as packets (voice, control, data), three labeled boxes or desk areas as queues, a timer, a whiteboard to record results.",
   "steps": [
    "One student classifies incoming packet slips by color into forwarding classes and writes a loss priority on each.",
    "Packets go into queues; a 'scheduler' student may send only three packets every ten seconds, first with no rules (FIFO) and then with a priority rule for voice and control.",
    "When a queue holds more than five slips, the student drops high loss priority slips first; the class records how many voice packets were delayed or dropped in each round.",
    "A final student stamps a marking on each departing slip to show the rewrite step, and the class discusses why the next 'router' benefits."
   ]
  },
  "discussion": [
   "If every application marks its traffic as highest priority, what happens to CoS? How should a network decide what to trust?",
   "When would buying more bandwidth be a better answer than configuring CoS?"
  ],
  "exit": [
   [
    "Where does classification happen: ingress or egress?",
    "Ingress."
   ],
   [
    "What does a rewrite rule do?",
    "Sets markings such as DSCP in outgoing packets based on forwarding class and loss priority."
   ],
   [
    "What decides which packets are dropped first under congestion?",
    "Loss priority, applied through drop profiles such as RED."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled pipeline diagram with each stage, its location (ingress or egress) and a one-line purpose, and let struggling students act as the classifier in the simulation where the rules are clearest.",
   "Extend: Ask fast finishers to sketch, in plain words, the Junos objects they would create for a voice-priority design (classifier, forwarding classes, schedulers, scheduler map, rewrite rule) and where each is applied."
  ]
 },
 {
  "t": "Junos default forwarding classes (best-effort, expedited-forwarding, assured-forwarding, network-control)",
  "objectives": [
   "Students will be able to name the four Junos default forwarding classes and their default queue numbers.",
   "Students will be able to match each default forwarding class to the type of traffic it is intended for.",
   "Students will be able to explain why classifying traffic into EF or AF without schedulers does not improve its treatment.",
   "Students will be able to use `show class-of-service forwarding-class` and `show interfaces queue` to verify CoS behavior."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up scenario about the restaurant VIP section and ask what is missing."
   ],
   [
    12,
    "Teach",
    "Present the four classes and queue numbers in a table, explain each intended use, then explain the default scheduler split and why EF and AF get nothing by default. Project sample command output."
   ],
   [
    15,
    "Activity",
    "Run the 'Read the queues' output analysis in pairs."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to explore why defaults are designed this way."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A restaurant adds a 'VIP fast seating' section to its menu but never sets up tables or staff for it. What happens to customers who choose VIP on a busy night?",
  "activity": {
   "title": "Read the queues",
   "materials": "Projected or printed mock `show interfaces queue` outputs (three scenarios), worksheet with questions, whiteboard.",
   "steps": [
    "Give pairs three mock outputs: an uncongested router, a congested router with no CoS configured, and a congested router with EF classified but no scheduler.",
    "For each, pairs identify which queues carry traffic, which are dropping, and what that implies about the configuration.",
    "Pairs write one sentence recommending a fix for the third scenario.",
    "Discuss answers as a class, writing the correct queue numbers and default shares on the board."
   ]
  },
  "discussion": [
   "Why do you think Juniper gives network-control a default share even when no CoS is configured?",
   "Why might teams keep the default class names instead of inventing their own?"
  ],
  "exit": [
   [
    "What is the default queue number for expedited-forwarding?",
    "Queue 1."
   ],
   [
    "Which two default classes receive scheduler resources by default?",
    "best-effort and network-control."
   ],
   [
    "Name the default class intended for OSPF and BGP traffic.",
    "network-control."
   ]
  ],
  "differentiation": [
   "Support: Hand out a card with the four classes, queue numbers, intended traffic and default share, and let struggling students check their worksheet answers against it.",
   "Extend: Ask fast finishers to list, in order, every configuration piece needed to make EF actually prioritize voice, and predict what `show interfaces queue` would show afterward under congestion."
  ]
 },
 {
  "t": "Behavior aggregate (DSCP-based) vs multifield classification",
  "objectives": [
   "Students will be able to explain how a behavior aggregate classifier uses DSCP, IP precedence, 802.1p or EXP markings.",
   "Students will be able to explain how a multifield classifier uses firewall filter terms to set forwarding class and loss priority.",
   "Students will be able to state the evaluation order when BA and MF classifiers are both applied, and which result wins.",
   "Students will be able to recommend where to deploy each classifier type in an edge and core design."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about priority stickers and collect answers."
   ],
   [
    12,
    "Teach",
    "Explain BA classification with a DSCP lookup table on the board, then MF classification by walking through the sample filter line by line. Finish with the evaluation order and the edge-and-core design."
   ],
   [
    15,
    "Activity",
    "Run the 'Edge or core' scenario sort and the filter review in small groups."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to explore trust boundaries."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If a shipping company let customers put their own 'urgent' stickers on parcels and always believed them, what would happen? How could the company fix it without inspecting every parcel at every depot?",
  "activity": {
   "title": "Edge or core",
   "materials": "Printed scenario cards describing interfaces and traffic sources, a printed MF filter excerpt with a missing catch-all term, whiteboard.",
   "steps": [
    "Give each group eight scenario cards, such as 'customer-facing interface', 'link between two core routers' and 'dorm access uplink'.",
    "Groups decide for each whether to use BA, MF or both, and justify the choice in one sentence.",
    "Groups then review the printed filter excerpt, predict what happens to unmatched traffic, and write the missing term.",
    "Each group presents one card and its filter fix; the teacher confirms the trust-boundary reasoning."
   ]
  },
  "discussion": [
   "Where should a trust boundary sit in a network that connects employees, guests and partners?",
   "Why might an engineer still keep a BA classifier on an edge interface even when an MF filter is applied there?"
  ],
  "exit": [
   [
    "Which classifier type reads only the DSCP value?",
    "Behavior aggregate."
   ],
   [
    "Where is an MF classifier applied?",
    "As an input firewall filter on the ingress interface."
   ],
   [
    "When BA and MF both apply to a packet, which wins?",
    "MF, because it is evaluated after BA."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a comparison card listing for BA and MF: what it reads, where it is configured, typical location in the network and speed, and let them refer to it during the scenario sort.",
   "Extend: Ask fast finishers to extend the sample filter with an assured-forwarding term for traffic to a business application server on a specific TCP port, keeping the catch-all last."
  ]
 },
 {
  "t": "Junos OS as one modular OS across routing, switching and security platforms",
  "objectives": [
   "Students will be able to name Juniper product families that run Junos OS and explain the benefit of a single OS.",
   "Students will be able to explain how modular daemons in protected memory improve stability.",
   "Students will be able to describe the candidate configuration and commit model shared across platforms.",
   "Students will be able to identify how platform differences appear in the Junos configuration hierarchy."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about learning devices from different makers and collect experiences."
   ],
   [
    12,
    "Teach",
    "Present the single OS across MX, PTX, ACX, EX, QFX and SRX, then modular daemons with a drawing of separate memory boxes, then the commit model and platform-specific hierarchy levels."
   ],
   [
    15,
    "Activity",
    "Run the 'Daemon crash' role-play followed by the hierarchy comparison."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions about consistency and stability."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of two phones or computers from different makers you have used. What was hard about switching between them? What would make switching easy?",
  "activity": {
   "title": "Daemon crash",
   "materials": "Name cards for daemons (routing, CLI, interfaces, chassis, SNMP) and one card for the kernel; a printed side-by-side excerpt of router, switch and SRX configurations.",
   "steps": [
    "Five students hold daemon cards and stand in separate taped squares representing protected memory; one student is the kernel.",
    "The teacher announces that the SNMP daemon has crashed; that student sits down, the kernel restarts them, and the class notes which services kept running.",
    "Contrast with a 'monolithic' round where all five stand in one square and a single crash sends everyone down.",
    "In pairs, students compare the three printed configurations and highlight the shared hierarchy in one color and platform-specific levels (security, vlans) in another."
   ]
  },
  "discussion": [
   "How does using one OS across device types help a small IT team with limited time for training?",
   "What risks might come with every platform sharing one code base?"
  ],
  "exit": [
   [
    "Which Juniper firewall family runs Junos OS?",
    "SRX."
   ],
   [
    "Why can one Junos daemon restart without crashing the device?",
    "Each daemon runs in its own protected memory, so the kernel can restart it independently."
   ],
   [
    "What command activates changes in the candidate configuration?",
    "`commit`."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page diagram showing the kernel, daemons in separate boxes and the candidate-to-active commit flow, and pair struggling students with a partner during the configuration comparison.",
   "Extend: Ask fast finishers to list five operational commands that work identically on a router, switch and firewall, and one hierarchy level unique to each platform."
  ]
 },
 {
  "t": "Separation of control plane and forwarding plane",
  "objectives": [
   "Students will be able to distinguish the control plane and forwarding plane and name the Junos component that implements each.",
   "Students will be able to describe how the forwarding table moves from the RE to the PFE and what exception traffic is.",
   "Students will be able to explain the performance, stability, security and scale benefits of separating the planes.",
   "Students will be able to choose the correct CLI command to inspect the routing table, forwarding table, RE status and FPC status."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about planners and doers and list examples on the board."
   ],
   [
    12,
    "Teach",
    "Draw the RE and PFE as two boxes joined by an internal link. Show routes flowing down as a forwarding table and exception traffic flowing up. Explain the four benefits and project sample output of the four show commands."
   ],
   [
    15,
    "Activity",
    "Run the 'Which plane?' card sort, then the restaurant role-play."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to explore limits of the design."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of an organization where some people plan and others carry out the work, such as air traffic controllers and pilots. What happens if the planners are briefly unavailable? What keeps working?",
  "activity": {
   "title": "Which plane?",
   "materials": "Printed cards describing router events or tasks (for example 'OSPF hello received', 'transit packet to 10.2.2.20', 'SSH login to router', 'apply filter to transit traffic', 'compute best BGP path'), two labeled areas on the whiteboard for RE and PFE.",
   "steps": [
    "Give each group a shuffled set of about 12 task cards.",
    "Groups place each card under RE (control plane) or PFE (forwarding plane), marking any that start in the PFE but are sent up as exception traffic.",
    "Review answers as a class, discussing borderline cards such as TTL-expired packets and firewall filters.",
    "Finish with a quick role-play: one student is the RE writing a 'forwarding table' card, others are PFE students forwarding paper packets; the RE student steps away and the class observes that forwarding continues."
   ]
  },
  "discussion": [
   "The PFE keeps forwarding when the RE is busy, but with a frozen table. When might that be a problem?",
   "Why is a firewall filter on the loopback interface such an important part of protecting a Junos device?"
  ],
  "exit": [
   [
    "Which component forwards transit traffic?",
    "The Packet Forwarding Engine (PFE)."
   ],
   [
    "What is exception traffic?",
    "Host-bound traffic the PFE sends up to the RE, such as routing protocol packets or SSH sessions to the router."
   ],
   [
    "Which command shows the table the PFE uses?",
    "`show route forwarding-table`."
   ]
  ],
  "differentiation": [
   "Support: Give students a labeled diagram of the RE and PFE with arrows for the forwarding table and exception traffic, and a cue card listing the four benefits with one-line examples.",
   "Extend: Ask fast finishers to draft, in plain words, which traffic a loopback filter should permit for a router running BGP, OSPF, SSH and NTP, and explain why transit traffic is unaffected by that filter."
  ]
 },
 {
  "t": "Routing Engine (RE): runs the CLI, routing protocols, builds the routing and forwarding tables",
  "objectives": [
   "Students will be able to list the main responsibilities of the Routing Engine: management, routing, chassis control and table building.",
   "Students will be able to distinguish the routing table (RIB) from the forwarding table (FIB) and explain how the RE moves routes from one to the other.",
   "Students will be able to apply Junos route preference values to predict which route becomes active for a prefix.",
   "Students will be able to identify CLI commands that show RE status, the routing table and the forwarding table."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the slow SSH prompt and let pairs guess which part of the router is busy. Collect two or three answers on the whiteboard without correcting them yet."
   ],
   [
    13,
    "Teach",
    "Draw a box split into RE and PFE. Walk through the four RE jobs, then draw the route sources feeding inet.0, the preference comparison, the active route marked with an asterisk, and the arrow pushing the FIB down to the PFE. Project sample `show route` output and point to the asterisk and the [Static/5] style labels."
   ],
   [
    17,
    "Activity",
    "Run the 'Build the FIB' card sort described below. Circulate and ask each group to justify their active route choices out loud."
   ],
   [
    5,
    "Discuss",
    "Return to the warm-up answers and resolve them. Use the discussion questions to connect RE load, routing protocol stability and transit forwarding."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on a sticky note and hand it in at the door."
   ]
  ],
  "warmup": "A router answers SSH very slowly, but every user behind it says the network feels normal. What could be busy, and why might it not affect their traffic?",
  "activity": {
   "title": "Build the FIB",
   "materials": "Printed route cards (each card shows a prefix, a source such as Direct, Static, OSPF or BGP, a preference value and a next hop), a sheet labeled 'inet.0' and a sheet labeled 'Forwarding table', whiteboard.",
   "steps": [
    "Give each group of three a shuffled deck of about 15 route cards covering six prefixes, with several prefixes offered by more than one source.",
    "Groups place every card on the inet.0 sheet, grouped by prefix, to model the routing table.",
    "For each prefix, groups choose the active route using lowest preference, mark it with a star sticky note, and move only that card's prefix and next hop onto the forwarding table sheet.",
    "The teacher announces an event, such as 'the static route to 10.50.0.0/24 is deleted,' and groups update both sheets, noticing that the backup card in inet.0 now becomes active.",
    "Each group writes on the whiteboard one sentence explaining why the forwarding table is smaller than the routing table."
   ]
  },
  "discussion": [
   "Why would Juniper design the router so that the RE never touches transit packets?",
   "What could happen to OSPF neighbors if the RE's CPU were completely overwhelmed, even though the PFE was healthy?",
   "Why keep inactive routes in the routing table at all if they are never used for forwarding?"
  ],
  "exit": [
   [
    "Name two responsibilities of the Routing Engine.",
    "Any two of: running the CLI and management services, running routing protocols through rpd, monitoring chassis hardware, building the routing and forwarding tables."
   ],
   [
    "A prefix is learned via BGP and OSPF. Which is active by default?",
    "OSPF, because its internal preference of 10 is lower than BGP's 170."
   ],
   [
    "Which table does the PFE use to forward traffic, and who builds it?",
    "The forwarding table (FIB), which the RE builds from active routes and pushes to the PFE."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference card listing the four preference values and a filled-in example of one prefix moving from inet.0 to the forwarding table before they start the card sort.",
   "Extend: Ask fast finishers to research and explain what `commit synchronize` and graceful Routing Engine switchover protect against, and to predict what happens to forwarding during an RE switchover."
  ]
 },
 {
  "t": "Packet Forwarding Engine (PFE): forwards transit traffic using the forwarding table copied from the RE",
  "objectives": [
   "Students will be able to explain the role of the PFE as the forwarding plane and how it obtains its forwarding table from the RE.",
   "Students will be able to describe the steps the PFE takes to forward a transit packet, including longest-prefix match.",
   "Students will be able to identify features enforced in the PFE, such as firewall filters, policers and CoS.",
   "Students will be able to classify a packet as handled entirely by the PFE or passed up to the RE."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about rebooting the 'brain' and whether traffic stops. Take a quick show of hands, then promise to revisit the vote."
   ],
   [
    12,
    "Teach",
    "Extend the RE/PFE diagram from the previous lesson. Show an FPC with PICs and decode an interface name. Walk a single packet through ingress, longest-prefix match, filter, Layer 2 rewrite, TTL decrement and egress. Contrast with a packet addressed to the router."
   ],
   [
    18,
    "Activity",
    "Run the 'Be the PFE' role-play described below, rotating roles so each student plays the PFE at least once."
   ],
   [
    5,
    "Discuss",
    "Revisit the warm-up vote. Use the discussion questions to emphasize that the PFE keeps forwarding but faithfully forwards bad routes too."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on paper."
   ]
  ],
  "warmup": "If you restart the part of a router that runs routing protocols, does all traffic through the router stop immediately? Vote yes or no and explain your guess in one sentence.",
  "activity": {
   "title": "Be the PFE",
   "materials": "A printed forwarding table on one sheet (about eight prefixes of mixed lengths with next-hop interfaces), printed packet cards with destination addresses and a few marked 'to router lo0', whiteboard for scoring.",
   "steps": [
    "Form groups of four: one student is the RE holding the forwarding table, one is the PFE, one feeds packet cards, and one records results.",
    "The RE hands the PFE a copy of the forwarding table, then steps back and is not allowed to help with transit packets.",
    "The feeder presents packets one at a time; the PFE performs a longest-prefix match and announces the egress interface, or says 'send to RE' for packets addressed to the router.",
    "Midway, the teacher announces a route change; the RE updates one line on the PFE's copy while the feeder keeps sending packets without pausing.",
    "Rotate roles twice, then each group writes on the whiteboard one packet the PFE could not handle alone and why."
   ]
  },
  "discussion": [
   "Why does Juniper put firewall filters in the PFE rather than the RE?",
   "If a bad routing change is committed, will the PFE notice? What does that mean for change control?",
   "What are the trade-offs of software forwarding on smaller platforms compared to ASIC forwarding?"
  ],
  "exit": [
   [
    "What does the PFE use to decide where to send a transit packet?",
    "Its copy of the forwarding table, using a longest-prefix match on the destination address."
   ],
   [
    "Name one feature you configure on the RE but that is enforced in the PFE.",
    "Firewall filters, policers, or CoS classification and queuing."
   ],
   [
    "A packet arrives addressed to the router's loopback address. Who processes it?",
    "The PFE passes it to the RE as host-bound exception traffic over a rate-limited path."
   ]
  ],
  "differentiation": [
   "Support: Provide a worked example of longest-prefix match with three overlapping prefixes and let struggling students practice it before the role-play.",
   "Extend: Ask fast finishers to explain how a lo0 input filter evaluated in the PFE protects the RE, and to predict what `show pfe statistics traffic` would show during a ping flood to the router."
  ]
 },
 {
  "t": "Key daemons: rpd (routing), mgd (management/CLI), dcd (interfaces), chassisd (chassis)",
  "objectives": [
   "Students will be able to state the function of rpd, mgd, dcd and chassisd.",
   "Students will be able to match a described symptom or log message to the responsible daemon.",
   "Students will be able to explain why independent daemons limit the impact of a single process failure.",
   "Students will be able to name commands used to investigate a daemon restart."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and ask students to guess what kind of software failed. List guesses on the board."
   ],
   [
    12,
    "Teach",
    "Introduce daemons and protected memory. Draw four boxes on the RE labeled rpd, mgd, dcd and chassisd with arrows showing mgd notifying the others on commit. Show the commands for checking processes and core dumps."
   ],
   [
    18,
    "Activity",
    "Run the 'Symptom triage' card sort described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore independence and the limits of it."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "A router logs that some software restarted overnight, but nobody lost their SSH session and user traffic never stopped. What does that tell you about how the router's software is built?",
  "activity": {
   "title": "Symptom triage",
   "materials": "Printed symptom cards (about 16, such as 'BGP session stuck in Active', 'commit check reports an error', 'new interface address missing', 'temperature alarm on FPC 1', 'NETCONF script cannot load configuration'), four labeled envelopes for rpd, mgd, dcd and chassisd, sticky notes.",
   "steps": [
    "Groups of three receive a shuffled set of symptom cards and the four daemon envelopes.",
    "Groups sort each card into the envelope of the daemon most directly responsible and write a one-line reason on a sticky note attached to the card.",
    "For three cards of their choice, groups also write the show command they would run first.",
    "Groups swap envelopes with another group and audit their sorting, flagging disagreements.",
    "The class resolves flagged cards together, with the teacher confirming the correct daemon."
   ]
  },
  "discussion": [
   "What are the benefits of running each function as a separate process, and what shared resources can still cause one daemon to affect another?",
   "Why might restarting a daemon on a production router be risky even if it fixes a problem?",
   "How would you explain a 3 a.m. rpd restart to a nontechnical manager?"
  ],
  "exit": [
   [
    "Which daemon would you suspect if an OSPF adjacency keeps flapping?",
    "rpd, the routing protocol daemon."
   ],
   [
    "Which daemon checks the candidate configuration when you run commit check?",
    "mgd, the management daemon."
   ],
   [
    "If rpd restarts, does the PFE stop forwarding transit traffic? Why?",
    "No. The PFE keeps forwarding with the last forwarding table it received while rpd restarts and routing reconverges."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students the first-letter memory aid (R for routing, M for management, D for device interfaces, chassis for chassis) on a card and pair them with a confident partner for the sort.",
   "Extend: Have fast finishers write a short incident summary for the warm-up scenario that names the daemon, the evidence commands, the impact and a next step."
  ]
 },
 {
  "t": "Transit traffic vs exception (host-bound) traffic and why exception traffic is rate-limited to the RE",
  "objectives": [
   "Students will be able to classify packets as transit or exception traffic based on their destination and handling needs.",
   "Students will be able to explain why Junos rate-limits exception traffic sent from the PFE to the RE.",
   "Students will be able to compare built-in rate limiting with a lo0 firewall filter as RE protections.",
   "Students will be able to interpret ping and traceroute results correctly in light of exception handling."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up scenario and ask students whether the router is broken. Record yes, no and unsure counts."
   ],
   [
    12,
    "Teach",
    "Draw the PFE with a wide arrow for transit traffic and a narrow, valve-controlled arrow up to the RE. List the types of exception traffic. Explain what happens to rpd if the RE is flooded, then introduce per-protocol policing and the lo0 filter."
   ],
   [
    18,
    "Activity",
    "Run the 'Transit or exception' sort and traceroute reading described below."
   ],
   [
    5,
    "Discuss",
    "Revisit the warm-up and the discussion questions. Emphasize that destination, not protocol, determines the category."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Pings to your core router are slow, but users say websites load normally. Is the router broken? Write yes, no or unsure, with one sentence of reasoning.",
  "activity": {
   "title": "Transit or exception",
   "materials": "Printed packet description cards (about 20, such as 'BGP update from peer', 'HTTPS from laptop to web server', 'ping to router loopback', 'packet with TTL 1 arriving for a remote host', 'SSH to the router', 'SSH through the router to a server'), two labeled areas on the whiteboard, and a printed traceroute output with one slow middle hop.",
   "steps": [
    "In pairs, students sort each card into Transit or Exception on their desk, writing a short reason for any card they find tricky.",
    "Pairs place their trickiest three cards on the whiteboard under the category they chose; the class discusses and the teacher confirms.",
    "Hand out the traceroute printout. Pairs decide whether the slow middle hop indicates a forwarding problem and write their reasoning.",
    "Each pair drafts, in plain words, three lo0 filter rules for a router that runs OSPF, is managed by SSH from one subnet and uses NTP.",
    "Two pairs share their rule lists and the class checks whether anything needed was forgotten."
   ]
  },
  "discussion": [
   "Why could a flood of ping traffic to a router eventually cause routing problems across the whole network if there were no rate limits?",
   "What is the difference between limiting how much traffic reaches the RE and deciding which traffic is allowed?",
   "How would you explain to a nontechnical principal why pinging the router is not a good test of the network?"
  ],
  "exit": [
   [
    "Is a traceroute's ICMP time-exceeded reply transit or exception traffic?",
    "Exception traffic, because the RE generates it when a packet's TTL expires."
   ],
   [
    "Why does Junos limit the rate of exception traffic to the RE?",
    "To prevent floods from overwhelming the RE's CPU, which could starve routing protocols and management."
   ],
   [
    "Where do you apply a filter to control which host-bound traffic reaches the RE?",
    "As an input filter on the loopback interface, lo0."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-question flowchart for the sort: 'Is the packet addressed to the router, or does the router need to create a reply or do special processing? If yes, exception; if no, transit.'",
   "Extend: Ask fast finishers to explain why per-protocol policing is better than one shared limit for all exception traffic, using a scenario where SNMP floods the router."
  ]
 },
 {
  "t": "Junos OS vs Junos OS Evolved (FreeBSD-based vs Linux-based)",
  "objectives": [
   "Students will be able to identify FreeBSD as the base of Junos OS and Linux as the base of Junos OS Evolved.",
   "Students will be able to explain which parts of the operator experience stay the same across both variants.",
   "Students will be able to describe at least two architectural differences of Junos OS Evolved.",
   "Students will be able to determine which variant a device runs from `show version` output."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about switching phone brands and what you would have to relearn. Link it to Tomas's worry from the lesson hook."
   ],
   [
    12,
    "Teach",
    "Draw two stacks side by side: hardware, kernel (FreeBSD or Linux), daemons or applications, CLI and configuration on top. Shade the top layers in the same color to show what stays the same. Project two sample `show version` outputs, one with an EVO tag."
   ],
   [
    18,
    "Activity",
    "Run the 'Same or different' card sort described below."
   ],
   [
    5,
    "Discuss",
    "Work through the discussion questions, focusing on why vendors keep the user interface stable."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "If you switched from one brand of phone to another, what would you have to relearn and what would stay the same? Now imagine a router vendor changing the operating system underneath its software. What would network engineers want to stay the same?",
  "activity": {
   "title": "Same or different",
   "materials": "Printed statement cards (about 16, such as 'CLI prompt symbols', 'kernel', 'commit confirmed', 'shell environment after start shell', 'software image file', 'rollback rescue', 'NETCONF', 'how system state is shared between processes'), two columns drawn on the whiteboard labeled Same and Different, printed `show version` excerpts.",
   "steps": [
    "Pairs sort each statement card into Same or Different when comparing Junos OS with Junos OS Evolved.",
    "Each pair places two cards on the whiteboard and explains its choice in one sentence.",
    "The teacher reviews the board, correcting any misplaced cards and highlighting that the CLI and commit model are the same.",
    "Pairs examine the printed `show version` excerpts and label each as Junos OS or Junos OS Evolved, circling the evidence.",
    "Pairs write one exam-style distractor answer about the two variants and swap it with another pair to identify why it is wrong."
   ]
  },
  "discussion": [
   "Why would Juniper keep the CLI and configuration model identical while changing the operating system underneath?",
   "What operational risks could arise when a network runs both variants at the same time?",
   "How might storing system state in a distributed database help availability?"
  ],
  "exit": [
   [
    "Which operating system is Junos OS Evolved based on?",
    "Linux."
   ],
   [
    "Name two things that are the same on Junos OS and Junos OS Evolved.",
    "Any two of: CLI, configuration hierarchy and syntax, commit and rollback model, rescue configuration, NETCONF and other automation interfaces."
   ],
   [
    "How can you identify a device running Junos OS Evolved from the CLI?",
    "Run `show version` and look for the EVO tag in the release name."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-row table to fill in with Kernel, Shell, CLI and Commit model as columns, so they can compare the variants one attribute at a time.",
   "Extend: Ask fast finishers to write a short change-plan note explaining what a team must check before introducing an Evolved platform into an all-classic Junos network."
  ]
 },
 {
  "t": "Protecting the RE with a filter on the lo0 interface",
  "objectives": [
   "Students will be able to explain why an input filter on lo0 protects the RE from host-bound traffic on all interfaces.",
   "Students will be able to read a Junos firewall filter, evaluate terms in order, and apply the implicit discard rule.",
   "Students will be able to identify which protocols and sources a router's RE protection filter must accept.",
   "Students will be able to describe a safe deployment procedure using `show | compare` and `commit confirmed`."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about guarding a building with many doors. Connect student answers to the idea of protecting the router itself."
   ],
   [
    12,
    "Teach",
    "Project the PROTECT-RE filter. Walk through each term, showing first-match behavior and the implicit discard. Explain why lo0 sees all host-bound traffic and why transit traffic is unaffected. Model the commit confirmed procedure step by step."
   ],
   [
    18,
    "Activity",
    "Run the 'Packet walk' filter exercise described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore lockout risk, IPv6 and filter maintenance."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A building has twelve entrances, and you want to control who reaches the executive floor. Would you station a guard at every entrance or somewhere else? Why?",
  "activity": {
   "title": "Packet walk",
   "materials": "Printed copies of a lo0 filter with five or six terms (one deliberately missing NTP), printed packet cards describing source address, protocol and port, a projector, whiteboard.",
   "steps": [
    "Pairs receive the printed filter and a stack of about 12 packet cards, including SSH from a management host, SSH from an unknown internet address, OSPF hello, BGP from a peer, BGP from a stranger, an NTP reply and a ping.",
    "For each packet, pairs walk the terms from top to bottom, write which term matched (or 'implicit discard') and the result.",
    "Pairs identify which legitimate traffic is being dropped and write the missing term in `set` command form.",
    "Pairs write the safe deployment steps for their corrected filter in order, including the commands they would use to verify neighbors.",
    "Two pairs compare their missing-term fixes and deployment steps, and the teacher projects a model answer."
   ]
  },
  "discussion": [
   "Why is a remote lo0 filter change one of the riskiest everyday changes on a router, and how does commit confirmed reduce that risk?",
   "What are the trade-offs of accepting ICMP from anywhere versus only from known sources?",
   "How do prefix lists make an RE protection filter easier to maintain over time?"
  ],
  "exit": [
   [
    "Why does a single filter on lo0 protect the RE from all interfaces?",
    "Because a lo0 input filter is applied by the PFE to all host-bound traffic, regardless of the ingress interface."
   ],
   [
    "A packet matches no term in a firewall filter. What happens to it?",
    "It is discarded by the implicit final discard."
   ],
   [
    "Which commit option should you use when applying a new lo0 filter on a remote router, and why?",
    "`commit confirmed`, so the change rolls back automatically if you lose access or break routing."
   ]
  ],
  "differentiation": [
   "Support: Provide a simplified filter with three terms and color-code the `from` and `then` parts so struggling students can practice the top-down walk before using the full filter.",
   "Extend: Ask fast finishers to write an equivalent `family inet6` filter outline and to add a policer to the ICMP term, explaining what each change protects against."
  ]
 },
 {
  "t": "Boot sequence and storage: primary/backup media, snapshots",
  "objectives": [
   "Students will be able to describe the Junos boot order, including primary and backup boot media and the alarm raised when booting from backup.",
   "Students will be able to explain the purpose of a snapshot and when to take one.",
   "Students will be able to distinguish a snapshot from a rescue configuration and rollback files.",
   "Students will be able to select the correct commands for snapshots, storage checks and rescue configuration."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about backing up a phone before an update. Collect answers about what goes wrong when the backup is old."
   ],
   [
    12,
    "Teach",
    "Draw the boot sequence as a ladder: firmware and loader, primary or backup media, kernel, init, daemons, juniper.conf.gz. Then draw two storage boxes and show a snapshot copying from one to the other. Contrast with a rescue configuration file. Write the key commands on the board."
   ],
   [
    18,
    "Activity",
    "Run the 'Upgrade runbook' sequencing activity described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reinforce timing and the difference between protections."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Before updating your phone, you back it up. If you then never back it up again for a year and the phone breaks, what do you get back? How might the same problem apply to a router?",
  "activity": {
   "title": "Upgrade runbook",
   "materials": "Printed step cards (such as 'check show system storage', 'request system storage cleanup', 'request system configuration rescue save', 'install new software', 'reboot', 'verify interfaces and routing', 'request system snapshot', 'show system snapshot'), plus three printed failure scenario cards, sticky notes, whiteboard.",
   "steps": [
    "Groups of three arrange the step cards into a safe upgrade runbook order on their desks.",
    "Groups compare their order with a neighboring group and resolve differences, paying attention to when the snapshot is taken.",
    "The teacher deals each group a failure scenario card, such as 'primary media fails one month later' or 'a bad configuration change is committed after the upgrade.'",
    "Groups decide which protection (snapshot, rescue configuration or rollback) saves the day in their scenario and write the recovery command on a sticky note.",
    "Each group presents its scenario and recovery in one minute while the class checks the reasoning."
   ]
  },
  "discussion": [
   "Why is it risky to take a snapshot before verifying a new software release?",
   "How could an improper shutdown, such as pulling power, lead to booting from backup media?",
   "When would you use a rescue configuration instead of a rollback number?"
  ],
  "exit": [
   [
    "What happens when a Junos device boots from backup media?",
    "It runs from the alternate media and raises an alarm to signal a problem with the primary."
   ],
   [
    "What does `request system snapshot` do?",
    "It copies the running software and configuration to the backup boot media."
   ],
   [
    "How is a rescue configuration different from a snapshot?",
    "A rescue configuration is only a saved configuration file restored with rollback rescue; a snapshot copies software and configuration so the device can boot from backup media."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed runbook with the first and last steps filled in, and a glossary card defining snapshot, rescue configuration and rollback.",
   "Extend: Ask fast finishers to write a one-paragraph post-incident note for the Redfield Library scenario explaining what saved the branch and what the next steps are."
  ]
 },
 {
  "t": "CLI modes: operational (`>`) and configuration (`#`); entering with `configure`, `configure private`, `configure exclusive`",
  "objectives": [
   "Students will be able to identify operational mode, configuration mode and the shell from their prompts.",
   "Students will be able to compare plain `configure`, `configure exclusive` and `configure private` in terms of how the candidate is shared.",
   "Students will be able to choose the appropriate configure option for a multi-user scenario.",
   "Students will be able to name common operational and configuration mode commands, including the `run` prefix."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about shared documents. Write student answers in three columns that will later map to plain, exclusive and private."
   ],
   [
    12,
    "Teach",
    "Project prompts for shell, operational and configuration mode and have students call out which is which. Explain the candidate and commit model. Walk through the three configure options using the Oakridge story and project the configure private output."
   ],
   [
    18,
    "Activity",
    "Run the 'Three doors' role-play described below."
   ],
   [
    5,
    "Discuss",
    "Work through the discussion questions about team change practices."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "When several people edit the same shared document, what can go wrong? What features do document tools offer to prevent it?",
  "activity": {
   "title": "Three doors",
   "materials": "A large sheet of paper representing the shared candidate, individual small sheets representing private candidates, a 'LOCK' card, colored markers, scenario cards, whiteboard.",
   "steps": [
    "Groups of three act as engineers editing one router; each writes one planned change on a sticky note.",
    "Round 1 (plain configure): all three add their sticky notes to the shared sheet; one student, chosen by the teacher, 'commits' before the others finish, and the group records what went live.",
    "Round 2 (configure exclusive): one student takes the LOCK card; the others try to commit and must be refused; the lock holder then 'exits without committing' and removes their note.",
    "Round 3 (configure private): each student works on a private sheet; commits move only that student's note onto the active configuration sheet.",
    "Groups receive two scenario cards and write which configure option fits each and why, then share with the class."
   ]
  },
  "discussion": [
   "Why might a team adopt a rule that everyone uses configure private on shared devices?",
   "When is configure exclusive a better choice than configure private?",
   "What problems could the `run` prefix help avoid during a long configuration session?"
  ],
  "exit": [
   [
    "What does the prompt `user@r1#` tell you?",
    "You are in configuration mode."
   ],
   [
    "Which configure option commits only your own changes, merged with the active configuration?",
    "`configure private`."
   ],
   [
    "Two engineers use plain configure and one commits. What gets committed?",
    "All changes in the shared candidate, including the other engineer's unfinished edits."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-row comparison card (plain, exclusive, private) with columns for 'shared or own copy,' 'can others commit,' and 'what happens on exit without commit' to fill in during the role-play.",
   "Extend: Ask fast finishers to write a short team change policy for a shared router that specifies which configure option to use, when to use commit confirmed and how to communicate locks."
  ]
 },
 {
  "t": "Navigating the hierarchy: `edit`, `up`, `top`, `exit`, `exit configuration-mode`; the `[edit ...]` banner",
  "objectives": [
   "Students will be able to interpret the `[edit ...]` banner to determine their position in the configuration hierarchy.",
   "Students will be able to predict the result of `edit`, `up`, `up n`, `top`, `exit` and `exit configuration-mode` from a given position.",
   "Students will be able to use the `top` prefix to run commands elsewhere in the hierarchy without moving.",
   "Students will be able to explain how `exit` differs from `up`."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the computer's folder structure and the 'back' versus 'up one folder' buttons."
   ],
   [
    12,
    "Teach",
    "Draw the configuration tree on the whiteboard with system, interfaces and protocols branches. Move a magnet or sticky note along it as you narrate each command, writing the banner after each move. Emphasize the difference between up and exit with two contrasting sequences."
   ],
   [
    18,
    "Activity",
    "Run the 'Where am I now' banner trace described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect navigation to error prevention."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "On your computer, what is the difference between pressing a 'back' button and pressing an 'up one folder' button? Can they ever take you to different places?",
  "activity": {
   "title": "Where am I now",
   "materials": "Printed command-sequence worksheets (each with a starting banner and five to eight navigation commands), a large tree diagram of a sample Junos configuration projected or drawn on the whiteboard, sticky notes.",
   "steps": [
    "Pairs receive a worksheet with four sequences, such as starting at `[edit]` then `edit protocols ospf area 0`, `up`, `edit area 1`, `exit`, `top`.",
    "For each command, pairs write the banner that would appear afterward, using the tree diagram for reference.",
    "Pairs mark any step where `exit` and `up` would give different results and explain why on a sticky note.",
    "Pairs write their own tricky five-command sequence and trade it with another pair to solve.",
    "The teacher reviews two of the student-written sequences on the projector with the class tracing them aloud."
   ]
  },
  "discussion": [
   "How does working at a deeper hierarchy level reduce typing errors in long commands?",
   "Why might Junos normalize values such as area 0 to 0.0.0.0, and what does that mean when you read output?",
   "When would `exit configuration-mode` be more useful than repeated `exit` commands?"
  ],
  "exit": [
   [
    "You are at `[edit protocols ospf area 0.0.0.0]`. What banner appears after `up 2`?",
    "`[edit protocols]`."
   ],
   [
    "What does `top show system` do when typed deep in the hierarchy?",
    "It displays the system configuration as if from the top level, without moving you."
   ],
   [
    "From `[edit]` you type `edit interfaces ge-0/0/0 unit 0`, then `exit`. Where are you?",
    "At `[edit]`, the level before the most recent edit."
   ]
  ],
  "differentiation": [
   "Support: Let struggling students physically move a token along a printed tree diagram for each command before writing the banner.",
   "Extend: Ask fast finishers to design the shortest sequence of commands to add statements in three different hierarchy branches and end at the top ready to run `show | compare`."
  ]
 },
 {
  "t": "Command completion with Space and Tab; `?` for context help",
  "objectives": [
   "Students will be able to distinguish Space completion from Tab completion, including which completes user-defined names.",
   "Students will be able to use `?` in its three forms to discover commands, options and values.",
   "Students will be able to interpret a syntax error caret to locate a typing mistake.",
   "Students will be able to recall common CLI editing shortcuts and command history."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about phone keyboard suggestions and when they help or fail."
   ],
   [
    12,
    "Teach",
    "Project a CLI transcript (or screenshots) showing Space completing `sh` to `show`, Space failing on a filter name, Tab succeeding, the three forms of `?`, and a syntax error caret. Write 'Space: built-in only. Tab: built-in plus your names' on the board."
   ],
   [
    18,
    "Activity",
    "Run the 'CLI detective' challenge described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect help features to working on unfamiliar devices."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Your phone suggests words as you type. Does it suggest the names of your friends as well as dictionary words? Why might a router treat 'dictionary' words and names you created differently?",
  "activity": {
   "title": "CLI detective",
   "materials": "Printed challenge cards, each showing a partial CLI line and a goal (such as 'complete the filter name', 'find which options follow show route', 'locate the typo'), printed sample outputs of `?` help and syntax errors, a projector, whiteboard for scoring.",
   "steps": [
    "Teams of three receive a set of ten challenge cards and the printed sample outputs.",
    "For each card, teams write which key or help form they would use (Space, Tab, `?` alone, partial word with `?`, or full command with space and `?`) and what they expect to see.",
    "For the syntax error cards, teams circle the mistake indicated by the caret and write the corrected command.",
    "Teams score a point for each correct answer as the teacher reveals answers on the projector, explaining any Space versus Tab traps.",
    "Each team writes one new challenge card about Space versus Tab and swaps it with another team to solve."
   ]
  },
  "discussion": [
   "Why is context-sensitive help on the device sometimes more reliable than documentation found elsewhere?",
   "Should engineers use abbreviations in written change procedures? What are the trade-offs?",
   "How would you use these features on a device you have never seen before to find out what has been configured?"
  ],
  "exit": [
   [
    "Which key completes a user-defined policy name, Space or Tab?",
    "Tab."
   ],
   [
    "What is the difference between `show inter?` and `show interfaces ?`?",
    "`show inter?` lists options beginning with 'inter'; `show interfaces ?` lists what can follow the complete `show interfaces` command."
   ],
   [
    "What does the caret in a syntax error message indicate?",
    "The point in the command where Junos could not understand the input."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference card listing Space, Tab and the three `?` forms with one example each, and pair them with a partner for the detective challenge.",
   "Extend: Ask fast finishers to write a short 'first five minutes on an unfamiliar router' guide that uses only help and completion features to discover the device's interfaces, filters and routing protocols."
  ]
 },
 {
  "t": "Help: `help topic`, `help reference`, `help apropos`",
  "objectives": [
   "Students will be able to describe the type of information provided by `help topic`, `help reference` and `help apropos`.",
   "Students will be able to select the correct help command for a described need.",
   "Students will be able to explain how the hierarchy level affects `help apropos` results.",
   "Students will be able to recognize `help syslog` and `help tip cli` and their purposes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the parts of a cookbook or textbook. List student answers on the board."
   ],
   [
    12,
    "Teach",
    "Map each textbook part to a help command on the board: concepts chapter to topic, reference card to reference, index to apropos. Project sample outputs of each command, then introduce help syslog and help tip cli. Emphasize that apropos searches below the current level."
   ],
   [
    18,
    "Activity",
    "Run the 'Help desk relay' scenario matching described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore offline work and choosing the right tool."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A thick textbook usually has a concepts section, a reference section and an index. When would you use each one?",
  "activity": {
   "title": "Help desk relay",
   "materials": "Printed need cards (about 15, such as 'I need the default value for an OSPF timer', 'what is a routing instance', 'find where MTU can be set', 'what does this log tag mean', 'I want a CLI shortcut tip'), five labeled envelopes for topic, reference, apropos, syslog and tip cli, a projector with sample outputs.",
   "steps": [
    "Teams of four line up; the teacher places a stack of need cards face down at the front.",
    "One student at a time draws a card, reads it aloud, and the team agrees on which help command fits and places the card in that envelope.",
    "For each apropos card, the team also writes the hierarchy level they would run it from and why.",
    "After all cards are placed, teams swap envelopes with another team to audit, marking disagreements with sticky notes.",
    "The teacher reviews disputed cards on the projector, showing a sample output for each correct command."
   ]
  },
  "discussion": [
   "Why might a network engineer prefer built-in help over searching the web, even when internet access is available?",
   "How does the hierarchy level you run apropos from change what you find, and how would you use that to your advantage?",
   "Which help command would you use first when facing a feature you have never configured, and why?"
  ],
  "exit": [
   [
    "Which help command searches for configuration statements containing a keyword?",
    "`help apropos`."
   ],
   [
    "You know the statement name but need its options and default values. Which command?",
    "`help reference`."
   ],
   [
    "What does `help topic` provide?",
    "Conceptual information explaining what a feature is and how it is used."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students the cookbook comparison on a card (concepts chapter, recipe card, index) next to the matching command names to use during the relay.",
   "Extend: Ask fast finishers to write three exam-style questions with plausible distractors that test the difference between topic, reference and apropos."
  ]
 },
 {
  "t": "Output filtering with pipes: `| match`, `| except`, `| find`, `| count`, `| no-more`, `| last`, `| save`",
  "objectives": [
   "Students will be able to describe the effect of `| match`, `| except`, `| find`, `| count`, `| no-more`, `| last` and `| save`.",
   "Students will be able to distinguish `| match` from `| find` and `| match` from `| except`.",
   "Students will be able to construct chained pipe commands to answer an operational question.",
   "Students will be able to predict how the order of chained pipes affects the result."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about searching a long email inbox. List the search and filter features students name."
   ],
   [
    12,
    "Teach",
    "Project a long sample `show interfaces terse` output and a log excerpt. Apply each pipe option in turn, showing the before and after. Highlight match versus find and show how reversing two chained pipes changes the result."
   ],
   [
    18,
    "Activity",
    "Run the 'Paper pipes' exercise described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect pipes to incident response and documentation."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Your email inbox has 5,000 messages. What features do you use to find the three that matter? Which of those would be useful on a router that prints thousands of lines?",
  "activity": {
   "title": "Paper pipes",
   "materials": "Printed sample outputs (a 40-line `show interfaces terse`, a 30-line log excerpt and a short configuration), highlighters, scissors or sticky notes, printed question cards, whiteboard.",
   "steps": [
    "Pairs receive the printed outputs and a set of question cards, such as 'Which interfaces are down?', 'Show the configuration starting at protocols', 'How many lines mention up?', 'Show the last three SNMP messages.'",
    "For each question, pairs write the full command with pipes, then physically apply it to the paper output by highlighting the lines that would appear (or tallying lines for count).",
    "For find, pairs mark the first matching line and highlight everything after it, comparing the result with match on the same word.",
    "Pairs take one chained command and reverse the order of its pipes, then highlight the new result and note the difference.",
    "Selected pairs present one command and their highlighted output on the projector for the class to verify."
   ]
  },
  "discussion": [
   "Why is `| no-more` useful when copying output into a ticket or running scripts?",
   "When would `| save` be better than copying output from your terminal window?",
   "Why should you be cautious about treating `| count` results as exact totals?"
  ],
  "exit": [
   [
    "What is the difference between `| match protocols` and `| find protocols`?",
    "Match shows only lines containing 'protocols'; find starts at the first such line and shows everything after it."
   ],
   [
    "Write a command to see the five most recent log lines containing LINK.",
    "`show log messages | match LINK | last 5`."
   ],
   [
    "Which pipe option hides lines that contain a pattern?",
    "`| except`."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page cheat sheet with each pipe option, a one-line description and an example, and start them with single-pipe questions before chained ones.",
   "Extend: Ask fast finishers to write a five-command incident 'first look' script using pipes that answers which interfaces are down, when they went down and how many routes exist, and to explain the order of each chain."
  ]
 },
 {
  "t": "`| display set`, `| compare`, `| display inheritance`",
  "objectives": [
   "Students will be able to explain the question each of `| display set`, `| compare` and `| display inheritance` answers.",
   "Students will be able to interpret `show | compare` output, including `+`, `-` and bracketed hierarchy headers.",
   "Students will be able to compare the candidate with the active configuration and with an older rollback.",
   "Students will be able to apply `| display inheritance` to reveal settings inherited from configuration groups."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a short hierarchical configuration and ask students to write the full path of one deeply nested line. Discuss how long it took and why."
   ],
   [
    12,
    "Teach",
    "Show the same configuration with `| display set`, then a `show | compare` output, then a group with `apply-groups` and the `| display inheritance` view. Say clearly that none of these change the configuration; they change only the view."
   ],
   [
    15,
    "Activity",
    "Run the diff-reading card activity in pairs (see activity)."
   ],
   [
    8,
    "Discuss",
    "Ask pairs to report one change they would stop before committing and why. Connect to shared candidate risks and change records."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Here is a line from a router configuration: `address 10.0.13.1/30;`. Without scrolling, can you tell which interface and unit it belongs to? What would make that easier?",
  "activity": {
   "title": "Read the diff before you commit",
   "materials": "Printed cards with four short `show | compare` outputs, two hierarchical configuration snippets with an `apply-groups` statement, a whiteboard and markers.",
   "steps": [
    "Give each pair one card set. For each `show | compare` card, they write in plain words what the commit will add, remove or change.",
    "Each set includes one card with an unexpected removal, such as an OSPF interface. Pairs must flag it and say what they would do before committing.",
    "For the hierarchical snippets, pairs rewrite two statements in `| display set` form with full paths.",
    "For the group card, pairs predict what `| display inheritance` would show for one interface and write the comment that names the source group.",
    "Pairs swap cards with a neighbor and check each other's answers against a key the teacher projects."
   ]
  },
  "discussion": [
   "Why might a team require a pasted `show | compare` output in every change ticket?",
   "What are the benefits and the risks of putting common settings in configuration groups?",
   "When would you choose set format over the hierarchical view, and when the reverse?"
  ],
  "exit": [
   [
    "In `show | compare`, what does a line beginning with `-` mean?",
    "The statement is in the active configuration and will be removed by the commit."
   ],
   [
    "Which pipe option outputs configuration as full-path commands you can paste into another device?",
    "`| display set`."
   ],
   [
    "An interface seems to have no MTU statement, but an MTU is applied. What do you add to the show command to find out why?",
    "`| display inheritance`, which shows inherited values and the group they come from."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a color-coded key (green for `+`, red for `-`, blue for bracket headers) and let them annotate one diff card together with the teacher before working alone.",
   "Extend: Ask fast finishers to write a single chained command that lists every inherited and direct NTP setting in set format, and explain the order of the pipes."
  ]
 },
 {
  "t": "Running operational commands from configuration mode with `run`",
  "objectives": [
   "Students will be able to explain why operational commands are not available directly in configuration mode.",
   "Students will be able to compare the output of `show interfaces` and `run show interfaces` in configuration mode.",
   "Students will be able to apply `run` to verify a change without leaving configuration mode or losing uncommitted work."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect two or three answers on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Project two outputs side by side: configuration-mode `show interfaces ge-0/0/1` and `run show interfaces ge-0/0/1 terse`. Say: one is what you asked for, the other is what the device is doing. Walk through the change, commit, verify workflow."
   ],
   [
    15,
    "Activity",
    "Run the 'which show?' card sort (see activity)."
   ],
   [
    8,
    "Discuss",
    "Ask why exiting configuration mode can be risky in private or exclusive mode, and how `run` fits into `commit confirmed`."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "You are halfway through configuring a router and want to know if a link is up. Would you rather leave your work to check, or check from where you are? What could go wrong if you leave?",
  "activity": {
   "title": "Which show? Card sort",
   "materials": "Printed cards, each with a scenario (for example 'Is the OSPF neighbor Full?', 'What address did I just type on ge-0/0/2?', 'Ping the gateway'), three column headers on the whiteboard: 'show (config mode)', 'run ...', 'neither'.",
   "steps": [
    "Pairs receive 10 scenario cards and sort each into the column whose command answers it from configuration mode.",
    "For each card in the 'run' column, pairs write the full command, such as `run show ospf neighbor`.",
    "For each card in the 'show' column, pairs note what hierarchy level they would need to be at.",
    "Include two trick cards, such as checking an address you typed but did not commit with `run show interfaces`, and ask pairs to explain why it fails.",
    "Pairs compare with another pair and resolve any disagreements, then the teacher reveals the key."
   ]
  },
  "discussion": [
   "Why do you think Junos separates configuration display from operational status so strictly?",
   "How does `run` make the change, commit, verify routine more likely to be followed in practice?"
  ],
  "exit": [
   [
    "How do you run a traceroute to 10.2.2.2 from configuration mode?",
    "`run traceroute 10.2.2.2`."
   ],
   [
    "In configuration mode, which command shows whether ge-0/0/0 is physically up: `show interfaces ge-0/0/0` or `run show interfaces ge-0/0/0`?",
    "`run show interfaces ge-0/0/0`, because plain `show` displays only configuration."
   ],
   [
    "After using `run`, where are you in the hierarchy and what happened to uncommitted changes?",
    "You are at the same hierarchy level and the uncommitted changes are still in the candidate."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column reference sheet with the prompt symbols (`>` and `#`) and three paired examples of `show` versus `run show` for students to keep during the card sort.",
   "Extend: Ask fast finishers to design a five-command verification checklist, all using `run`, that an engineer should execute after committing an interface change."
  ]
 },
 {
  "t": "Active vs candidate configuration",
  "objectives": [
   "Students will be able to explain the difference between the active and candidate configurations.",
   "Students will be able to compare which commands display each configuration in operational and configuration mode.",
   "Students will be able to apply `rollback n`, `show | compare` and `commit` in the correct order to restore a previous configuration.",
   "Students will be able to state how many committed configurations Junos keeps and how they are numbered."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let students share experiences with 'live' edits that went wrong."
   ],
   [
    12,
    "Teach",
    "Draw two boxes on the whiteboard labeled Candidate and Active with an arrow labeled commit. Add a stack labeled rollback 0 to 49. Walk through edit, compare, commit and rollback, saying each time which box changes."
   ],
   [
    15,
    "Activity",
    "Run the 'Candidate or active?' role-play (see activity)."
   ],
   [
    8,
    "Discuss",
    "Discuss shared versus private candidates and why a failed commit changes nothing."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Have you ever edited something live and broken it before you finished, such as a shared spreadsheet or a website? What would have helped?",
  "activity": {
   "title": "Candidate or active? Role-play",
   "materials": "Two large sheets of paper or whiteboard areas labeled Candidate and Active, sticky notes, a stack of index cards labeled rollback 1 to 5, printed command cards.",
   "steps": [
    "Assign roles: one student is the Candidate keeper, one the Active keeper, one the History keeper, and the rest are engineers.",
    "Engineers draw command cards (`set`, `delete`, `show | compare`, `commit`, `rollback 1`, `rollback 0`, `show configuration`) and read them aloud.",
    "Keepers move sticky notes to show the effect: `set` adds a note only to Candidate, `commit` copies Candidate to Active and pushes the old Active onto the History stack.",
    "When `rollback 1` is drawn, the History keeper copies rollback 1 into Candidate only, and the class must say what is still needed.",
    "After ten cards, the class states which configuration a user in operational mode would see with `show configuration`."
   ]
  },
  "discussion": [
   "What risks come with a shared candidate configuration, and when would you choose `configure private` or `configure exclusive`?",
   "Why might a two-step rollback, load then commit, be safer than an instant restore?"
  ],
  "exit": [
   [
    "You typed several `set` commands but did not commit. Has the device's behavior changed?",
    "No. The changes exist only in the candidate configuration."
   ],
   [
    "Which command in configuration mode discards all uncommitted changes?",
    "`rollback 0`."
   ],
   [
    "How many configurations can Junos keep, and what number is the active one?",
    "50 in total; the active configuration is rollback 0, with 1 to 49 being previous commits."
   ]
  ],
  "differentiation": [
   "Support: Give students a flowchart card showing edit, `show | compare`, `commit`, and rollback with arrows, and let them trace each role-play step on it.",
   "Extend: Ask fast finishers to explain what happens to uncommitted changes when a user exits a shared session versus a private session, and to write a short policy recommendation for their team."
  ]
 },
 {
  "t": "J-Web GUI and enabling it with `system services web-management`",
  "objectives": [
   "Students will be able to explain what J-Web is and how it relates to the CLI's configuration database.",
   "Students will be able to write the configuration that enables J-Web over HTTPS on a specific interface.",
   "Students will be able to compare HTTP and HTTPS access to J-Web in terms of security.",
   "Students will be able to apply management-plane security practices to J-Web access."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list the class's pros and cons of graphical versus command-line management on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Explain that J-Web is another window into the same configuration database. Write the two `web-management` lines on the board and annotate each word. Emphasize HTTPS, the certificate, the interface restriction, login classes and that commits still apply."
   ],
   [
    15,
    "Activity",
    "Run the 'Secure the web interface' configuration review (see activity)."
   ],
   [
    8,
    "Discuss",
    "Discuss when a team should leave J-Web disabled and how to tell from the CLI that a change came from J-Web."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you could manage a firewall from a web page instead of a command line, what would you gain, and what new risks might you introduce?",
  "activity": {
   "title": "Secure the web interface: configuration review",
   "materials": "Printed handouts with four short `[edit system services]` configuration excerpts (one with `http` only, one with `https` but no interface restriction, one correct, one with J-Web enabled on an internet-facing interface), red and green pens.",
   "steps": [
    "In pairs, students read each excerpt and mark in green what is acceptable and in red what is risky.",
    "For each risky excerpt, pairs write the corrected `set` commands.",
    "Pairs answer: which user accounts and login classes should be allowed to log in to J-Web for this office?",
    "Pairs add one sentence describing what the change would look like in `show system commit` after it is made in J-Web.",
    "Two pairs present their corrections; the class agrees on a final secure configuration written on the whiteboard."
   ]
  },
  "discussion": [
   "Why is it valuable that J-Web and the CLI share one configuration database and one rollback history?",
   "What would you tell a manager who wants J-Web reachable from anywhere for convenience?"
  ],
  "exit": [
   [
    "Write the statement that enables J-Web over HTTPS with a self-signed certificate.",
    "`set system services web-management https system-generated-certificate`."
   ],
   [
    "A change made in J-Web has not been committed. Is it active?",
    "No. J-Web changes go into the candidate and take effect only after commit, just like CLI changes."
   ],
   [
    "Name two ways to reduce the risk of running J-Web.",
    "Any two of: use HTTPS only, restrict it to management interfaces with the `interface` option, allow it in the lo0 filter only from management hosts, use named accounts with proper login classes, or disable it when not needed."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of the `[edit system services web-management]` hierarchy with each keyword explained, so students can build commands by following the tree.",
   "Extend: Ask fast finishers to write a lo0 firewall filter term, in words or set commands, that allows HTTPS to the device only from a management subnet, and explain where it fits among other terms."
  ]
 },
 {
  "t": "Remote access: SSH, console, out-of-band management interface (fxp0/em0/me0)",
  "objectives": [
   "Students will be able to explain when to use the console port, SSH and an out-of-band management interface.",
   "Students will be able to match the management interface names fxp0, me0 and em0 to typical platform families.",
   "Students will be able to write the configuration to enable SSH, deny root SSH logins and address a management interface.",
   "Students will be able to justify why the management interface does not forward transit traffic."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and ask students to list every way they could reach the device."
   ],
   [
    12,
    "Teach",
    "Draw a router on the whiteboard with three paths: console to the RE, fxp0 to the RE, and revenue ports to the PFE. Explain console settings, SSH configuration with root-login deny, Telnet's weakness and the platform names for the management port."
   ],
   [
    15,
    "Activity",
    "Run the 'Layers of access' design exercise (see activity)."
   ],
   [
    8,
    "Discuss",
    "Ask groups to share designs and debate the routing choices for the management network."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A router two hundred miles away stops responding on its usual address. Brainstorm every way you might still reach it, and what each way depends on.",
  "activity": {
   "title": "Layers of access design",
   "materials": "Whiteboard or large paper per group, markers, printed scenario cards describing three sites (a router site, an EX switch closet, an SRX branch firewall).",
   "steps": [
    "Groups of three receive one site card and draw the device, its production links, a management network and a terminal server.",
    "Groups label the correct management interface name for their platform and write its addressing `set` command.",
    "Groups write the SSH configuration, including `root-login deny`, and note whether Telnet should be enabled.",
    "Groups add a route for the management network and explain why a default route out the management port could be a problem on a production router.",
    "Each group walks through a failure: production network down, then management network down, and shows which access path still works."
   ]
  },
  "discussion": [
   "What does out-of-band management protect you from that in-band management does not?",
   "Why might an organization block root logins over SSH but still allow root at the console?"
  ],
  "exit": [
   [
    "Which management interface name would you expect on an EX switch?",
    "me0."
   ],
   [
    "Which access method works even when the device has no network configuration?",
    "The console port, a direct serial connection to the Routing Engine."
   ],
   [
    "Why does fxp0 not route transit traffic to other interfaces?",
    "It connects to the Routing Engine rather than the Packet Forwarding Engine, so it is for management only."
   ]
  ],
  "differentiation": [
   "Support: Give students a three-row table (console, SSH, management port) with columns for 'needs network?', 'encrypted?' and 'used for' to complete before the design activity.",
   "Extend: Ask fast finishers to compare a static route, `backup-router` and a dedicated management routing instance for reaching the management network, and recommend one for a production core router."
  ]
 },
 {
  "t": "Factory-default configuration and the root-password requirement before the first commit",
  "objectives": [
   "Students will be able to explain why Junos refuses to commit until a root password is configured.",
   "Students will be able to compare typical factory-default contents on routers, EX switches and SRX branch firewalls.",
   "Students will be able to apply `set system root-authentication plain-text-password` to recover from a failed first commit.",
   "Students will be able to distinguish `load factory-default` from `request system zeroize`."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect answers to the idea of secure defaults."
   ],
   [
    10,
    "Teach",
    "Project the failed commit output. Ask students to find the reason before explaining it. Then explain root-authentication options, password hashing and the platform differences in the factory default."
   ],
   [
    17,
    "Activity",
    "Run the 'Day-one console' pair troubleshooting exercise (see activity)."
   ],
   [
    8,
    "Discuss",
    "Discuss secure defaults and when to use zeroize versus load factory-default."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Why do you think a new device ships with no root password at all, rather than a default password printed in the manual?",
  "activity": {
   "title": "Day-one console: pair troubleshooting",
   "materials": "Printed console transcripts (four short scenarios), a whiteboard, sticky notes.",
   "steps": [
    "Give each pair four transcripts: a fresh router with a failed commit, a switch after `load factory-default`, a successful commit with `plain-text-password`, and a device being prepared for return.",
    "For each failing transcript, pairs identify the exact error line and write the command that fixes it.",
    "For the successful transcript, pairs predict what the root-authentication section will look like in `show configuration`.",
    "For the returning device, pairs decide between `load factory-default` and `request system zeroize` and justify the choice on a sticky note.",
    "Pairs post their sticky notes on the whiteboard and the class reviews any disagreements."
   ]
  },
  "discussion": [
   "What other systems you use force you to set a password before they become usable, and why is that safer than a default password?",
   "Why might an SRX branch default include more configuration than an MX router default?"
  ],
  "exit": [
   [
    "A commit on a brand-new device fails with 'Missing mandatory statement'. What is missing?",
    "`system root-authentication`, the root password."
   ],
   [
    "How does Junos store a password entered with `plain-text-password`?",
    "As a hash, shown as `encrypted-password` in the configuration."
   ],
   [
    "Which command erases configuration and data before hardware is returned?",
    "`request system zeroize`."
   ]
  ],
  "differentiation": [
   "Support: Walk struggling students through the first transcript line by line, highlighting the prompt, the error and the fix, before they attempt the others.",
   "Extend: Ask fast finishers to list the root-authentication options (`plain-text-password`, `encrypted-password`, SSH public keys) and explain when a team would choose each for a fleet of devices."
  ]
 },
 {
  "t": "Initial configuration: host name, root authentication, users and login classes, management interface, static default route",
  "objectives": [
   "Students will be able to write the initial configuration for host name, root authentication, user accounts, management address and a static route.",
   "Students will be able to compare the four predefined login classes and choose the right one for a given role.",
   "Students will be able to explain why named accounts and specific management routes are preferred in production.",
   "Students will be able to verify the initial configuration with operational commands."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Walk through the starter configuration line by line on the projector. Pause at login classes and build a four-row table of what each class can do. Explain the static default route, preference 5 and the production caution."
   ],
   [
    15,
    "Activity",
    "Run the 'Badge office' login-class role assignment and config build (see activity)."
   ],
   [
    8,
    "Discuss",
    "Groups present their configurations; the class checks class choices and route choices."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If five engineers all log in to a router as root, and one of them breaks something, how would you find out who did it?",
  "activity": {
   "title": "Badge office: roles to login classes",
   "materials": "Printed role cards (network engineer, help desk technician, auditor, contractor whose access has ended, monitoring system), whiteboard, student laptops with a text editor or paper.",
   "steps": [
    "Groups of three receive the role cards and a short description of each person's duties.",
    "Groups assign each role a predefined login class and write one sentence justifying it.",
    "Groups write the `set system login user` statements for three of the roles.",
    "Groups add a host name, root authentication, a management address on fxp0 and a static route to a given jump host subnet.",
    "Groups list the three operational commands they would run to verify the result and swap with another group for peer review."
   ]
  },
  "discussion": [
   "When would a custom login class be better than any of the four predefined classes?",
   "Why do accurate time and DNS settings matter to an auditor, not just to engineers?"
  ],
  "exit": [
   [
    "Which predefined login class can restart processes and clear statistics but not change configuration?",
    "operator."
   ],
   [
    "Write the command for a static route to 10.60.0.0/24 via 10.50.0.1.",
    "`set routing-options static route 10.60.0.0/24 next-hop 10.50.0.1`."
   ],
   [
    "Which command confirms that a static default route is active?",
    "`show route 0.0.0.0/0 exact`, which shows it with protocol Static and preference 5."
   ]
  ],
  "differentiation": [
   "Support: Provide a fill-in-the-blank version of the starter configuration with the keywords missing (host-name, class, family inet, next-hop) for students to complete before writing their own.",
   "Extend: Ask fast finishers to design a custom login class for the help desk that adds an idle timeout and denies the `request system reboot` command, describing which statements they would use."
  ]
 },
 {
  "t": "Interface naming (type-fpc/pic/port.unit), physical vs logical properties, unit 0, family inet/inet6",
  "objectives": [
   "Students will be able to decode any Junos interface name into type, FPC, PIC, port and unit.",
   "Students will be able to classify interface statements as physical or logical properties.",
   "Students will be able to explain when unit 0 is required and when multiple units are possible.",
   "Students will be able to apply `family inet` and `family inet6` to configure IPv4 and IPv6 addresses on a unit."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write `xe-1/2/3.0` on the board and ask students to guess what each part means."
   ],
   [
    12,
    "Teach",
    "Explain the naming format with a drawing of a chassis, FPCs, PICs and ports. Then sort statements into physical and logical columns and explain units, vlan-tagging and families."
   ],
   [
    15,
    "Activity",
    "Run the 'Name that port' and physical-or-logical card sort (see activity)."
   ],
   [
    8,
    "Discuss",
    "Review tricky cards, especially description, vlan-tagging and addresses."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Look at `xe-1/2/3.0`. What do you think each letter and number tells you about where this port is?",
  "activity": {
   "title": "Name that port and sort the statements",
   "materials": "A printed drawing of a chassis with two FPCs, each holding two PICs with four ports; printed statement cards (mtu, speed, description, vlan-tagging, vlan-id, family inet address, family inet6 address, disable); whiteboard with columns Physical and Logical.",
   "steps": [
    "Pairs receive the chassis drawing and five interface names; they circle the matching port for each name.",
    "Pairs then write the interface name for three ports the teacher points to on the projector.",
    "Pairs sort the statement cards into Physical and Logical columns.",
    "Pairs write the full set commands to give ge-0/0/2 unit 0 both an IPv4 and an IPv6 address.",
    "Pairs check answers with a neighbor, then the teacher reveals the key and discusses any disagreements."
   ]
  },
  "discussion": [
   "Why might separating physical and logical properties make configurations easier to manage?",
   "What problems could arise if a technician miscounts ports by starting at 1?"
  ],
  "exit": [
   [
    "Decode `ge-2/1/7.0`.",
    "Gigabit Ethernet; FPC 2, PIC 1, port 7; logical unit 0."
   ],
   [
    "Is `vlan-tagging` a physical or logical property?",
    "Physical; it is configured directly under the interface name."
   ],
   [
    "Write the statement that adds IPv6 address 2001:db8::1/64 to ge-0/0/0 unit 0.",
    "`set interfaces ge-0/0/0 unit 0 family inet6 address 2001:db8::1/64`."
   ]
  ],
  "differentiation": [
   "Support: Give students a color-coded template where type, FPC, PIC, port and unit each have a color, and let them highlight names before decoding.",
   "Extend: Ask fast finishers to configure a router port carrying three VLANs as separate units with IPv4 addresses and to predict the `show interfaces terse` output."
  ]
 },
 {
  "t": "Special interfaces: lo0, fxp0/em0/me0, irb",
  "objectives": [
   "Students will be able to explain why lo0 is used for router IDs, session sources and Routing Engine protection.",
   "Students will be able to describe the role and limits of the management interface on different platforms.",
   "Students will be able to write the configuration that gives a VLAN an irb gateway.",
   "Students will be able to match each special interface to the problem it solves."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect ideas about stable identities."
   ],
   [
    12,
    "Teach",
    "Draw a router with two physical links and a lo0 bubble, then a switch with two VLANs and irb units. Explain lo0, /32 masks, router IDs, the lo0 filter, the management port and irb with `l3-interface`."
   ],
   [
    15,
    "Activity",
    "Run the 'Which interface fixes it?' troubleshooting cards (see activity)."
   ],
   [
    8,
    "Discuss",
    "Review the cards and discuss the old `vlan` interface name and internal interfaces."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you had to give a router one address that never changes, even when cables are unplugged, what would that address need to be attached to?",
  "activity": {
   "title": "Which interface fixes it?",
   "materials": "Printed problem cards (six short scenarios), printed configuration fragments, whiteboard.",
   "steps": [
    "Pairs receive six problem cards, such as 'BGP drops when one link fails', 'Hosts cannot leave their VLAN', 'Need SSH even when production is down', 'Protect the RE from unwanted traffic'.",
    "For each card, pairs name the special interface that solves it (lo0, management interface, irb).",
    "Pairs write the key configuration line or lines for each solution, including masks and `l3-interface` where needed.",
    "Pairs identify one card where a configured interface exists but is misconfigured (for example lo0 with a /24) and correct it.",
    "Pairs present one solution each to the class while the teacher writes the agreed configuration on the board."
   ]
  },
  "discussion": [
   "Why does it matter that lo0 is always up, and what still has to be configured for other routers to reach it?",
   "Would you route between VLANs on a switch with irb or send traffic to a separate router? What factors affect that choice?"
  ],
  "exit": [
   [
    "Why is lo0 used as a BGP session source?",
    "It is always up and not tied to one physical link, so the session survives any single link failure if another path exists."
   ],
   [
    "What does an irb interface provide for a VLAN?",
    "A Layer 3 gateway address so traffic can be routed between that VLAN and other networks."
   ],
   [
    "What mask is normally used on an IPv4 lo0 address?",
    "/32."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-column summary card (lo0, management interface, irb) with 'what it is', 'always up?' and 'used for' filled in for one column as a model.",
   "Extend: Ask fast finishers to configure two VLANs with irb units on a switch, advertise lo0 in OSPF in words, and explain how a remote engineer would reach the switch."
  ]
 },
 {
  "t": "Commit model: `commit check`, `commit confirmed`, `commit and-quit`, `commit comment`, `commit at`",
  "objectives": [
   "Students will be able to explain what each of `commit check`, `commit confirmed`, `commit and-quit`, `commit comment` and `commit at` does.",
   "Students will be able to compare `commit check` and `commit confirmed` in terms of the risks each addresses.",
   "Students will be able to apply a safe commit routine for a remote change, including confirmation.",
   "Students will be able to cancel a scheduled commit and find commit comments in history."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about locking yourself out and gather strategies."
   ],
   [
    12,
    "Teach",
    "Present each commit option with a one-line purpose and an example. Draw a timeline for `commit confirmed` showing the confirmed and unconfirmed outcomes. Show `commit at` and `clear system commit`."
   ],
   [
    15,
    "Activity",
    "Run the 'Choose the commit' scenario relay (see activity)."
   ],
   [
    8,
    "Discuss",
    "Discuss why many teams mandate `commit confirmed` and comments, and what `commit check` cannot catch."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You are changing a firewall on a device you can only reach over the network. What could go wrong, and how would you get back in if it did?",
  "activity": {
   "title": "Choose the commit: scenario relay",
   "materials": "Printed scenario cards (eight), a whiteboard divided into five columns labeled with the commit options, sticky notes, a timer on the projector.",
   "steps": [
    "Teams of four line up. Each team member in turn draws a scenario card, such as 'validate a large change before the window' or 'apply a change at 02:00'.",
    "The student writes the exact command on a sticky note and places it in the correct column.",
    "For `commit confirmed` scenarios, the student must also say aloud how to confirm and what happens if they do not.",
    "After all cards are placed, teams check another team's board and challenge any wrong placement.",
    "The teacher reviews the board and highlights combined commands such as `commit confirmed 5 comment`."
   ]
  },
  "discussion": [
   "Why does passing `commit check` not make a change safe?",
   "What information should a good commit comment contain for future engineers and auditors?"
  ],
  "exit": [
   [
    "You run `commit confirmed 3` and then lose access. What happens?",
    "After 3 minutes, Junos automatically rolls back to the previous configuration and commits it, restoring access."
   ],
   [
    "How do you confirm a `commit confirmed`?",
    "Issue another `commit` (or `commit check`) before the timer expires."
   ],
   [
    "Which command cancels a pending `commit at`?",
    "`clear system commit` in operational mode."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page table of the five options with purpose, example and 'changes active config?' columns to use during the relay.",
   "Extend: Ask fast finishers to write a team change procedure that combines `show | compare`, `commit check`, `commit confirmed` with a comment, verification with `run`, and `commit synchronize` for dual Routing Engines."
  ]
 },
 {
  "t": "Rollback: `rollback n` (0–49), `show | compare rollback n`, rescue configuration",
  "objectives": [
   "Students will be able to explain how the rollback history is numbered and how many versions it keeps.",
   "Students will be able to apply `show | compare rollback n`, `rollback n` and `commit` to restore an earlier configuration safely.",
   "Students will be able to compare numbered rollbacks with the rescue configuration.",
   "Students will be able to save and load a rescue configuration."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about version history in tools students use."
   ],
   [
    12,
    "Teach",
    "Draw a vertical stack labeled 0 to 49 and show how a commit pushes everything down. Demonstrate the compare, rollback, commit sequence on the projector. Introduce the rescue configuration as a separate box beside the stack."
   ],
   [
    15,
    "Activity",
    "Run the 'Commit history detective' activity (see activity)."
   ],
   [
    8,
    "Discuss",
    "Discuss how comments and a rescue configuration change the speed of recovery."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of a document or app with version history. How do you find the version you want, and what happens when you restore it?",
  "activity": {
   "title": "Commit history detective",
   "materials": "Printed mock `show system commit` output with eight commits (some with comments), printed `show | compare rollback n` outputs for three of them, index cards numbered 0 to 7, a whiteboard.",
   "steps": [
    "Pairs read the commit history and identify which rollback number holds the last configuration described as verified.",
    "Pairs read the compare outputs and decide which rollback would revert only the problem change.",
    "Pairs write the full command sequence, from entering configuration mode to the final commit.",
    "The teacher announces 'a new commit just happened'; pairs renumber their index cards and state the new number of their target version.",
    "Pairs write one sentence explaining when they would use the rescue configuration instead of a numbered rollback."
   ]
  },
  "discussion": [
   "Why is a two-step rollback, load then commit, safer than an instant restore?",
   "How often should a team update its rescue configuration, and who should approve it?"
  ],
  "exit": [
   [
    "You type `rollback 2`. Has the device changed?",
    "No. The configuration is loaded into the candidate and takes effect only after commit."
   ],
   [
    "Which command saves the rescue configuration?",
    "`request system configuration rescue save`."
   ],
   [
    "What is the oldest rollback number Junos keeps?",
    "49."
   ]
  ],
  "differentiation": [
   "Support: Give students a numbered strip of paper representing the rollback stack that they can slide to see how numbers shift after each commit.",
   "Extend: Ask fast finishers to write a recovery runbook that uses commit comments, `show system commit`, `show | compare rollback n` and the rescue configuration, and explain which step to take first in an outage."
  ]
 },
 {
  "t": "Saving and loading: `save`, `load merge`, `load override`, `load replace`, `load set`, `load factory-default`",
  "objectives": [
   "Students will be able to explain how `load merge`, `load override`, `load replace` and `load set` combine a file with the candidate.",
   "Students will be able to choose the correct load option for a given deployment scenario.",
   "Students will be able to apply `save` and `load ... terminal relative` to export and paste configuration.",
   "Students will be able to explain why `load factory-default` requires a root password before commit."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about combining two lists and collect strategies."
   ],
   [
    12,
    "Teach",
    "Use two colored sets of sticky notes on the whiteboard, one for the existing candidate and one for a file, and physically demonstrate merge, override and replace. Then show `load set`, `terminal`, `relative`, `save` and `load factory-default`."
   ],
   [
    15,
    "Activity",
    "Run the 'Merge, override or replace?' card exercise (see activity)."
   ],
   [
    8,
    "Discuss",
    "Discuss the opening branch-rollout story and write a short team procedure together."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You have a contact list on your phone and a file of contacts from a coworker. What are the different ways you could combine them, and what could go wrong with each?",
  "activity": {
   "title": "Merge, override or replace?",
   "materials": "Printed 'existing candidate' cards and 'loaded file' cards (each showing a few statements, some tagged `replace:`), a printed answer grid, pens.",
   "steps": [
    "Pairs receive a candidate card and a file card for each of four rounds.",
    "For each round, pairs write the resulting candidate after `load merge`, after `load override` and after `load replace`.",
    "Pairs mark which statements from the original candidate survive in each case.",
    "Pairs then receive four scenario cards (golden baseline, add a filter, swap syslog section, paste set commands) and choose the load option for each.",
    "Pairs compare their grids with another pair and resolve differences before the teacher reveals the answers."
   ]
  },
  "discussion": [
   "Why is `show | compare` essential after every load, even when you are confident in the file?",
   "When might `load override` be dangerous on a production device, and how could you reduce that risk?"
  ],
  "exit": [
   [
    "Which load option keeps existing configuration and adds the file's statements?",
    "`load merge`."
   ],
   [
    "Which load option removes a static route that is in the candidate but not in the file?",
    "`load override`."
   ],
   [
    "After `load factory-default`, what must you configure before commit succeeds?",
    "A root password with `system root-authentication`."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-picture reference card showing merge as two circles combined, override as one circle replaced and replace as one slice swapped, for students to use during the card rounds.",
   "Extend: Ask fast finishers to write a short golden file using a `replace:` tag on one section and predict exactly what `show | compare` would show after loading it with `load replace`."
  ]
 },
 {
  "t": "Editing tools: `delete`, `deactivate`/`activate`, `annotate`, `copy`, `rename`, `insert`",
  "objectives": [
   "Students will be able to choose between `delete`, `deactivate` and `disable` for a described change and explain the effect of each.",
   "Students will be able to use `insert` to correct the order of firewall filter or policy terms.",
   "Students will be able to explain what `annotate`, `copy` and `rename` do, including the limitation that `rename` does not update references.",
   "Students will be able to predict how each edit appears in `show` and `show | display set` output."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the whiteboard without judging them."
   ],
   [
    12,
    "Teach",
    "Project a short configuration and walk through each command, showing the before and after with `show | compare`. Emphasize `inactive:`, the `/* */` comment and that new terms land at the bottom."
   ],
   [
    18,
    "Activity",
    "Run the Edit Command Match card activity in pairs, then have pairs fix a printed filter with misordered terms."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the commands to safe change practice."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand it in."
   ]
  ],
  "warmup": "You need to turn off a BGP peering tonight but want it back tomorrow exactly as it is. What would you do on a device you know, and what could go wrong if you just deleted it?",
  "activity": {
   "title": "Edit Command Match and Fix the Filter",
   "materials": "Printed scenario cards (one change request per card), printed command cards, a printed firewall filter with three terms in the wrong order, whiteboard.",
   "steps": [
    "Give each pair eight scenario cards, such as \"turn off the backup ISP until tomorrow\" or \"explain why this static route exists\", and the command cards `delete`, `deactivate`, `activate`, `disable`, `annotate`, `copy`, `rename`, `insert`.",
    "Pairs match each scenario to the best command and write the full command line on the back of the card.",
    "Hand out the misordered filter (ALLOW-ALL above BLOCK-TELNET). Pairs explain why Telnet is still allowed and write the `insert` command that fixes it.",
    "Ask two pairs to read their answers aloud; the class flags any answer where `deactivate` and `disable` were confused or where a `rename` left a broken reference."
   ]
  },
  "discussion": [
   "When would deleting a configuration be safer than deactivating it, for example from an audit or clarity point of view?",
   "Why might a team require annotations on every exception in a firewall filter?"
  ],
  "exit": [
   [
    "What is the difference between a deactivated interface and a disabled interface?",
    "A deactivated interface is ignored as if not configured and shows `inactive:`; a disabled interface is configured but administratively down."
   ],
   [
    "A new filter term never matches because it sits below an accept-all term. Which command fixes this?",
    "`insert term NEW before term ACCEPT-ALL`, then commit."
   ],
   [
    "Do `annotate` comments appear in `show | display set` output?",
    "No. They appear in the hierarchical view as `/* ... */` lines but not in set-style output."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page table listing each command, its effect on the candidate, and how it looks in `show`, and let them use it during the card match.",
   "Extend: Ask fast finishers to write a five-step change plan that copies an interface configuration, renames a filter and fixes every reference, including the `show | compare` and `commit check` steps."
  ]
 },
 {
  "t": "Configuration groups with `groups` and `apply-groups`, including wildcards",
  "objectives": [
   "Students will be able to define a configuration group with a wildcard and apply it with `apply-groups`.",
   "Students will be able to predict which value wins when explicit configuration, multiple groups and different levels conflict.",
   "Students will be able to use `show | display inheritance` to explain where an unexpected setting came from.",
   "Students will be able to describe the purpose of `apply-groups-except`, `junos-defaults` and the `re0`/`re1` groups."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list the answers; steer toward the idea of writing a standard once."
   ],
   [
    12,
    "Teach",
    "Project the GE-DEFAULTS example. Show plain `show` output and then `display inheritance` output side by side. Walk through the precedence rules with a small table on the board."
   ],
   [
    18,
    "Activity",
    "Run Who Wins in small groups using printed configuration snippets."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to weigh consistency against visibility."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If you had to set the same MTU on 300 interfaces and the standard changes twice a year, how would you want the configuration to be organized?",
  "activity": {
   "title": "Who Wins: Group Precedence Puzzles",
   "materials": "Printed cards, each showing a short configuration with groups, wildcards and some explicit statements; whiteboard; sticky notes.",
   "steps": [
    "Give each group of three students six puzzle cards. Each card asks what value a specific interface or setting ends up with.",
    "Students write their answer and the rule that decides it (explicit wins, first group listed wins, deeper level wins, wildcard matches only existing objects, apply-groups-except) on a sticky note.",
    "The teacher reveals the `display inheritance` output for each card on the projector, and groups check their answers.",
    "Each group writes one new puzzle card for another group to solve."
   ]
  },
  "discussion": [
   "What risks come with heavy use of groups when a new engineer joins the team?",
   "When would you rather type a setting directly than inherit it from a group?"
  ],
  "exit": [
   [
    "A group sets `mtu 9192` for `<ge-*>`, and ge-0/0/3 has `mtu 1500` typed directly. Which MTU applies?",
    "1500, because explicit configuration overrides inherited values."
   ],
   [
    "Which statement exempts one interface from a group applied above it?",
    "`apply-groups-except GROUPNAME` at that interface's level."
   ],
   [
    "Which command reveals inherited statements and their source group?",
    "`show | display inheritance` (or `show configuration | display inheritance`)."
   ]
  ],
  "differentiation": [
   "Support: Give students a laminated precedence ladder (explicit, then deeper level, then first-listed group) to keep beside them while solving the puzzles.",
   "Extend: Ask fast finishers to design a group set for a two-RE router using `re0` and `re1` and explain which settings must not be shared."
  ]
 },
 {
  "t": "System services: SSH, NTP, syslog, SNMP basics",
  "objectives": [
   "Students will be able to state where SSH, Telnet, NTP, syslog and SNMP are configured in the Junos hierarchy.",
   "Students will be able to write set commands that enable SSH with root login denied, add an NTP server and forward syslog to a remote host.",
   "Students will be able to determine which syslog messages are captured for a given severity level.",
   "Students will be able to compare SNMPv2c communities with SNMPv3 in terms of security."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the audit finding and list student ideas."
   ],
   [
    12,
    "Teach",
    "Walk through each service with the four-line configuration on the projector. Draw the hierarchy on the board, marking `snmp` as top level. Write the eight severities as a ladder."
   ],
   [
    18,
    "Activity",
    "Run the Audit Fix-It role-play in pairs."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions on trade-offs and verification."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "An auditor says your routers accept Telnet and their clocks disagree. Why would an auditor care about the clocks at all?",
  "activity": {
   "title": "Audit Fix-It",
   "materials": "Printed audit finding sheets (four findings each), printed severity ladder, student laptops with a text editor or paper, whiteboard.",
   "steps": [
    "Pairs receive an audit sheet: Telnet enabled, root SSH login allowed, no NTP, no remote syslog, SNMPv2c read-write community with no client restriction.",
    "One student plays auditor and reads each finding; the other writes the Junos set or delete commands that fix it, naming the hierarchy used.",
    "Pairs swap roles and use the severity ladder to decide which messages a log host set to `error` would receive.",
    "The teacher projects a model answer and pairs mark their own work, noting any service placed under the wrong hierarchy."
   ]
  },
  "discussion": [
   "If your monitoring platform only supports SNMPv2c, what can you do to reduce the risk?",
   "How would you verify each of these services is working after the commit?"
  ],
  "exit": [
   [
    "Which hierarchy holds SNMP configuration in Junos?",
    "The top-level `snmp` hierarchy, not `system`."
   ],
   [
    "A syslog host is set to `warning`. Does it receive `notice` messages? Does it receive `critical` messages?",
    "No for notice, which is less serious; yes for critical, which is more serious."
   ],
   [
    "Write the command that blocks direct root logins over SSH.",
    "`set system services ssh root-login deny`."
   ]
  ],
  "differentiation": [
   "Support: Provide a fill-in-the-blank hierarchy map with `system services`, `system ntp`, `system syslog` and `snmp` partly labeled, and let students complete it before the role-play.",
   "Extend: Ask fast finishers to add an SNMP trap-group and a client restriction to the community and explain how each change reduces exposure."
  ]
 },
 {
  "t": "Monitoring the platform: `show chassis hardware`, `show chassis alarms`, `show system alarms`, `show chassis routing-engine`, `show system storage`",
  "objectives": [
   "Students will be able to match each platform health question to the correct Junos command.",
   "Students will be able to classify an alarm as a chassis (hardware or environmental) or system (software or configuration) alarm.",
   "Students will be able to interpret key fields in `show chassis routing-engine` and `show system storage` output.",
   "Students will be able to plan a pre-change health check using these commands."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers on the board."
   ],
   [
    12,
    "Teach",
    "Project sample output from each command and annotate the key fields live: part and serial numbers, alarm class, CPU idle, last reboot reason, /var usage."
   ],
   [
    18,
    "Activity",
    "Run the Alarm Sort and Output Detective activity in groups of three."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions about pre- and post-change checks."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Your monitoring system says a router has a major alarm at 2 a.m. What do you want to know about the device before you look at routing or interfaces?",
  "activity": {
   "title": "Alarm Sort and Output Detective",
   "materials": "Printed alarm cards (for example fan failure, PEM not OK, rescue configuration not set, license issue, temperature high, boot media issue), printed output excerpts from the five commands, sticky notes.",
   "steps": [
    "Groups sort the alarm cards into two columns on the desk labeled `show chassis alarms` and `show system alarms`, and mark each Major or Minor where the card says.",
    "Groups receive printed output excerpts with the command name blacked out and identify which command produced each.",
    "For the Routing Engine and storage excerpts, groups write one sentence on a sticky note stating whether the device is healthy and why.",
    "The teacher reveals answers on the projector and asks groups to explain any card they placed in the wrong column."
   ]
  },
  "discussion": [
   "Why might it be useful to save the output of these commands before and after every maintenance window?",
   "What could cause consistently high Routing Engine CPU even when traffic levels are normal?"
  ],
  "exit": [
   [
    "A power supply has failed. Which alarm command shows it?",
    "`show chassis alarms`."
   ],
   [
    "Which command shows the last reboot reason and CPU utilization?",
    "`show chassis routing-engine`."
   ],
   [
    "Why does a full /var matter before an upgrade?",
    "The package cannot be copied and unpacked, so the upgrade fails; logs also cannot be written."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-column cheat card (hardware versus software) with two example alarms in each column to anchor the sort.",
   "Extend: Ask fast finishers to write a five-command health-check script in the order they would run it and explain what result would make them stop a planned change."
  ]
 },
 {
  "t": "Monitoring interfaces: `show interfaces terse`, `extensive`, `monitor interface`, `monitor traffic interface`",
  "objectives": [
   "Students will be able to interpret Admin and Link status in `show interfaces terse` output to distinguish configuration from physical problems.",
   "Students will be able to locate and interpret CRC errors, drops and carrier transitions in `extensive` output.",
   "Students will be able to choose between `monitor interface` and `monitor traffic interface` for a given troubleshooting need.",
   "Students will be able to explain why `monitor traffic interface` generally does not show transit traffic."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about a link that is up but slow."
   ],
   [
    12,
    "Teach",
    "Project terse and extensive output and annotate status columns and error counters. Explain the Routing Engine limitation of `monitor traffic interface` with a simple diagram of control plane and forwarding plane."
   ],
   [
    18,
    "Activity",
    "Run the Interface Triage pair troubleshooting activity."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions."
   ]
  ],
  "warmup": "A link shows as up, but users say it is slow. What would you want to see that a simple up or down indicator cannot tell you?",
  "activity": {
   "title": "Interface Triage",
   "materials": "Printed scenario cards with matching output excerpts (terse lines with various Admin and Link states, extensive excerpts with error counters), whiteboard.",
   "steps": [
    "Each pair receives five scenario cards, such as an interface Admin down, one Admin up and Link down, one with rising CRC errors, one with many carrier transitions, and one where OSPF will not form.",
    "Pairs write the likely cause for each card and the next command they would run.",
    "For the OSPF card, pairs write the exact `monitor traffic interface` command with a matching filter.",
    "Pairs swap cards with another pair and check answers, then the teacher reviews any disagreements on the board."
   ]
  },
  "discussion": [
   "Why is clearing interface statistics an important step before deciding a link is faulty?",
   "If you cannot capture transit traffic with `monitor traffic interface`, what other ways might you investigate a user's traffic problem?"
  ],
  "exit": [
   [
    "An interface shows Admin down. What does that tell you?",
    "It has been disabled in configuration with `disable`."
   ],
   [
    "Where would you look for CRC errors?",
    "In `show interfaces <name> extensive` output."
   ],
   [
    "Which command gives a live, refreshing view of one interface's counters?",
    "`monitor interface <name>`."
   ]
  ],
  "differentiation": [
   "Support: Give students a decision flowchart (terse first, then extensive, then monitor) to follow during the triage activity.",
   "Extend: Ask fast finishers to write three `matching` expressions for `monitor traffic interface` that would isolate OSPF, BGP and ICMP, and explain what they would expect to see for each."
  ]
 },
 {
  "t": "Network tools: ping, traceroute, SSH, telnet from the CLI",
  "objectives": [
   "Students will be able to use ping options such as `count`, `rapid`, `source`, `size` and `do-not-fragment` to design a meaningful test.",
   "Students will be able to explain why the source address of a test affects whether a reply returns.",
   "Students will be able to interpret traceroute output, including asterisks.",
   "Students will be able to use `telnet <address> port <n>` to test TCP reachability."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch the scenario on the board."
   ],
   [
    12,
    "Teach",
    "Walk through ping options, the source address problem with a three-router diagram, how traceroute uses TTL, and telnet port testing."
   ],
   [
    18,
    "Activity",
    "Run the Return Address role-play with students acting as routers."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions on tool choice."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A router can ping a partner's server, but the PCs behind the router cannot reach it. List as many possible reasons as you can in two minutes.",
  "activity": {
   "title": "Return Address Role-Play",
   "materials": "Sticky notes as packets, printed name cards for three routers and a partner server, a whiteboard drawing of the topology with each router's routing table written beside it.",
   "steps": [
    "Four students stand as R1, R2, the partner router and the partner server, each holding a printed routing table. The partner router's table lacks a route to the LAN prefix.",
    "A student writes a ping packet on a sticky note with the link address as source and passes it hop by hop; the reply returns successfully.",
    "Repeat with the LAN gateway as source; the class watches the reply stop at the partner router because it has no route back.",
    "Pairs then write the Junos commands that would reveal each case (`ping ... source ...`, `traceroute ... source ...`, `telnet ... port 179`) and predict their output."
   ]
  },
  "discussion": [
   "When would traceroute asterisks be worth investigating, and when can you ignore them?",
   "Why might an organization allow Telnet as a client tool on routers but forbid the Telnet service?"
  ],
  "exit": [
   [
    "Which option makes a Junos ping use the loopback address?",
    "`source <loopback address>`."
   ],
   [
    "How do you stop a Junos ping that was started without `count`?",
    "Press Ctrl+C."
   ],
   [
    "How do you check whether TCP port 179 is reachable on 192.0.2.20?",
    "`telnet 192.0.2.20 port 179`."
   ]
  ],
  "differentiation": [
   "Support: Provide a printed option card listing each ping and traceroute option with a one-line example for students to reference.",
   "Extend: Ask fast finishers to design a test plan for a new VPN routing instance using `routing-instance`, `source` and `do-not-fragment`, explaining what each test proves."
  ]
 },
 {
  "t": "System logging (`/var/log/messages`, `show log`) and protocol traceoptions",
  "objectives": [
   "Students will be able to read and filter `/var/log/messages` with `show log` and pipes such as `match`, `last` and `except`.",
   "Students will be able to interpret the fields of a Junos syslog line.",
   "Students will be able to configure targeted protocol traceoptions with file size limits and explain why they must be removed afterward.",
   "Students will be able to distinguish what syslog tells you from what traceoptions tell you."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect ideas."
   ],
   [
    12,
    "Teach",
    "Project a log excerpt and break down one line field by field. Demonstrate pipes, `monitor start` and `monitor stop`. Show the OSPF traceoptions configuration and discuss its risks."
   ],
   [
    18,
    "Activity",
    "Run the Log Detective activity in groups of three."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "A neighbor dropped at 3 a.m. and came back a minute later. If you could ask the router one question about that night, what would it be?",
  "activity": {
   "title": "Log Detective",
   "materials": "A printed 40-line messages log excerpt with mixed events, a printed OSPF trace excerpt showing a hello dead-interval mismatch, highlighters, sticky notes.",
   "steps": [
    "Groups receive the log excerpt and write the `show log messages | ...` command that would isolate the interface and OSPF events.",
    "Groups highlight the line where the neighbor went down and label its timestamp, process, event tag and details.",
    "Groups write a traceoptions configuration with a file size limit and two flags they would enable next, then receive the trace excerpt and identify the root cause.",
    "Each group finishes by writing the command that removes the traceoptions, and one group presents its full workflow."
   ]
  },
  "discussion": [
   "Why is accurate time on every device essential when you compare logs across routers?",
   "What policy would you set in a team to make sure traceoptions are never left running?"
  ],
  "exit": [
   [
    "Which command shows the most recent 20 lines of the messages log?",
    "`show log messages | last 20`."
   ],
   [
    "Where are trace files stored and how do you read one?",
    "In /var/log; read with `show log <filename>`."
   ],
   [
    "What does syslog tell you compared with traceoptions?",
    "Syslog records what happened at a chosen severity; traceoptions record detailed protocol activity that explains why."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of one syslog line and a list of common pipe options with examples.",
   "Extend: Ask fast finishers to write a traceoptions plan for a flapping BGP session, choosing flags and file limits, and justify each choice in terms of CPU and storage impact."
  ]
 },
 {
  "t": "Managing files: `file list`, `file show`, `request system storage cleanup`",
  "objectives": [
   "Students will be able to identify the purpose of key Junos directories such as /var/log, /var/tmp, /config and the user home directory.",
   "Students will be able to use `file list`, `file show` and `file copy` to inspect and move files.",
   "Students will be able to free space safely using `request system storage cleanup` and its `dry-run` option.",
   "Students will be able to explain the risks of manual `file delete` compared with the cleanup command."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect answers to device storage."
   ],
   [
    12,
    "Teach",
    "Draw the directory tree on the board. Project a `file list ... detail` output and a cleanup prompt, and explain `dry-run`."
   ],
   [
    18,
    "Activity",
    "Run the Storeroom Cleanup card sort and command-writing activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions about change control and deletion risk."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your phone says storage is full and an update cannot install. What do you do first, and what would you never delete?",
  "activity": {
   "title": "Storeroom Cleanup",
   "materials": "Printed file cards (for example messages.3.gz, a crash dump, an old package in /var/tmp, juniper.conf.gz in /config, a user backup in the home directory), a printed `show system storage` output, whiteboard.",
   "steps": [
    "Pairs sort the file cards into three piles: safe for the cleanup command, delete manually only if you created it, never delete.",
    "Pairs write the commands they would use, in order, to prepare for an upgrade: check storage, preview cleanup, run cleanup, verify storage, copy package, verify package size.",
    "Pairs compare their piles with another pair and resolve differences.",
    "The teacher reviews the model answer, highlighting why configuration files belong in the never-delete pile."
   ]
  },
  "discussion": [
   "Why might a change manager want to see `dry-run` output before approving a cleanup?",
   "What are the advantages of copying backups off the device rather than keeping them in /var/tmp?"
  ],
  "exit": [
   [
    "Which option previews a storage cleanup without deleting files?",
    "`dry-run`, as in `request system storage cleanup dry-run`."
   ],
   [
    "In which directory are software packages usually staged?",
    "/var/tmp."
   ],
   [
    "Why is the cleanup command safer than `file delete`?",
    "It lists files and asks for confirmation, and only targets files the system considers safe to remove; `file delete` is immediate with no undo."
   ]
  ],
  "differentiation": [
   "Support: Give students a labeled directory map with one example file in each directory to use during the card sort.",
   "Extend: Ask fast finishers to write the full command sequence to back up the configuration to a remote server with `file copy`, clean storage and stage a package, explaining what they would check after each step."
  ]
 },
 {
  "t": "Software installation and upgrades with `request system software add`; snapshots",
  "objectives": [
   "Students will be able to list the prepare, install and verify steps of a Junos upgrade in the correct order.",
   "Students will be able to explain the effect of the `reboot` option and of configuration validation during `request system software add`.",
   "Students will be able to explain what a snapshot protects against and when to take one.",
   "Students will be able to choose verification commands to confirm a successful upgrade."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a failed laptop update and collect lessons learned."
   ],
   [
    12,
    "Teach",
    "Draw the three phases on the board and walk through each command. Contrast validation, software rollback and snapshot."
   ],
   [
    18,
    "Activity",
    "Run the Upgrade Runbook sequencing activity in small groups."
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
  "warmup": "Have you ever had a computer or phone update go wrong? What would you do differently if hundreds of people depended on that device?",
  "activity": {
   "title": "Upgrade Runbook",
   "materials": "Printed step cards (show version, copy config off device, show system storage, storage cleanup, file copy package to /var/tmp, file list detail, software add with reboot, show version, check alarms and neighbors, request system snapshot), plus two distractor cards, whiteboard.",
   "steps": [
    "Groups arrange the step cards into a runbook in the correct order and remove any distractor cards that do not belong.",
    "Groups label each card prepare, install, verify or protect.",
    "The teacher reads two failure scenarios (validation fails; device later boots from backup media) and groups explain what happened and which card addresses it.",
    "Groups compare runbooks with a neighboring group and agree on a final order."
   ]
  },
  "discussion": [
   "Why might a team wait a day or more before taking a snapshot after an upgrade?",
   "What information would you capture before an upgrade to make post-upgrade verification easier?"
  ],
  "exit": [
   [
    "Which command installs a Junos package and activates it immediately?",
    "`request system software add <package> reboot`."
   ],
   [
    "What does configuration validation protect you from?",
    "Installing and booting a release that would reject the current configuration."
   ],
   [
    "What does a snapshot protect against?",
    "Failure or corruption of the primary boot media, by keeping a copy of software and configuration on alternate media."
   ]
  ],
  "differentiation": [
   "Support: Give students a partially completed runbook with the phase headings filled in and three steps already placed.",
   "Extend: Ask fast finishers to write a rollback plan for an upgrade that boots but breaks a routing protocol, including which commands they would use and in what order."
  ]
 },
 {
  "t": "Rebooting, halting and powering off safely: `request system reboot`, `halt`, `power-off`",
  "objectives": [
   "Students will be able to describe the end state of the device after `request system reboot`, `halt` and `power-off`.",
   "Students will be able to choose the appropriate shutdown command for on-site and remote scenarios.",
   "Students will be able to schedule and cancel a reboot using `at`, `in` and `clear system reboot`.",
   "Students will be able to explain why a graceful shutdown protects the file systems."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and discuss what can go wrong when power is cut."
   ],
   [
    10,
    "Teach",
    "Present the three commands as a table of end states. Demonstrate scheduling with `at` and `in`, the confirmation prompt, the `message` option and `clear system reboot`."
   ],
   [
    20,
    "Activity",
    "Run the Which Shutdown scenario cards and role-play in pairs."
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
  "warmup": "What could happen to a computer's files if someone pulled the power cord while it was saving? Why might a router be more at risk than a laptop?",
  "activity": {
   "title": "Which Shutdown",
   "materials": "Printed scenario cards (rack move on site, remote branch restart after hours, decommissioning a device on site, postponed maintenance window, unplanned restart investigation), printed command cards, whiteboard.",
   "steps": [
    "Pairs draw a scenario card. One student plays the on-site technician or manager and describes the situation; the other plays the engineer and chooses the command.",
    "The engineer writes the full command, including `at`, `in` or `message` options where useful, and states the device's end state.",
    "Pairs swap roles for the next card; for the investigation card they name the commands that show uptime and the last reboot reason.",
    "The teacher reviews answers, highlighting any pair that chose power-off for a remote device."
   ]
  },
  "discussion": [
   "What safeguards would you want before allowing staff to run power-off on remote devices?",
   "Why does Junos default the confirmation answer to no?"
  ],
  "exit": [
   [
    "Which command stops Junos but leaves the device powered on?",
    "`request system halt`."
   ],
   [
    "Which command cancels a scheduled reboot?",
    "`clear system reboot`."
   ],
   [
    "Why should you not use `request system power-off` on an unattended remote router?",
    "It stays off until someone physically powers it on, so you could not bring it back remotely."
   ]
  ],
  "differentiation": [
   "Support: Give students a three-row picture card showing reboot (circle arrow), halt (pause with power on) and power-off (power off) to anchor the end states.",
   "Extend: Ask fast finishers to write a maintenance notice and command sequence for a dual-RE router that restarts only the backup RE, and explain how they would confirm which RE they are logged into."
  ]
 },
 {
  "t": "Root password recovery from the console using recovery (single-user) mode",
  "objectives": [
   "Students will be able to sequence the steps of Junos root password recovery from console connection to reboot.",
   "Students will be able to explain why physical console access is required and what that implies for physical security.",
   "Students will be able to state that recovery changes only the root password and uses a normal commit.",
   "Students will be able to evaluate the trade-off of `set system ports console insecure`."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about lost passwords and physical access."
   ],
   [
    12,
    "Teach",
    "Project the console transcript and walk through each step. Emphasize `boot -s`, `recovery`, `root-authentication`, the normal commit and the preserved configuration. Explain `console insecure`."
   ],
   [
    18,
    "Activity",
    "Run the Recovery Sequence and Policy Debate activity in small groups."
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
  "warmup": "If you could reset any device's password just by plugging into it, who should be allowed in the room with that device? Why?",
  "activity": {
   "title": "Recovery Sequence and Policy Debate",
   "materials": "Printed step cards for the recovery procedure (shuffled), printed console transcript with blanks, whiteboard divided into For and Against columns.",
   "steps": [
    "Groups put the shuffled step cards in order: connect console, reboot, interrupt at loader, `boot -s`, type `recovery`, configure, set root-authentication, commit, exit and reboot.",
    "Groups fill the blanks in the printed transcript with the correct commands and keywords.",
    "Half the groups argue for enabling `console insecure` at a bank's branches and half argue against; each group lists two points on the whiteboard.",
    "The teacher summarizes, linking the debate to password vaults and physical controls such as locked racks and authenticated console servers."
   ]
  },
  "discussion": [
   "Which physical and procedural controls would you put in place instead of, or as well as, `console insecure`?",
   "How should an organization handle root credentials when an administrator leaves?"
  ],
  "exit": [
   [
    "What keyword do you type at the single-user prompt to start password recovery?",
    "`recovery`."
   ],
   [
    "What happens to the rest of the configuration after password recovery?",
    "It is preserved; only the root password changes."
   ],
   [
    "What is the effect of `set system ports console insecure`?",
    "Single-user mode requires the root password, which blocks this console recovery procedure."
   ]
  ],
  "differentiation": [
   "Support: Give students the step cards with the first and last steps already placed and a word bank for the transcript blanks.",
   "Extend: Ask fast finishers to write a short credential management policy covering vault storage, who can retrieve root passwords, rotation when staff leave and how console access is logged."
  ]
 },
 {
  "t": "Saving and restoring a rescue configuration",
  "objectives": [
   "Students will be able to save, view, restore and delete a rescue configuration using the correct mode and command for each.",
   "Students will be able to compare the rescue configuration with numbered rollbacks in terms of how each is created and retained.",
   "Students will be able to explain what a rescue configuration should contain and why it must be kept current.",
   "Students will be able to identify the rescue configuration alarm and how to clear it."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a safe place to return to and collect ideas."
   ],
   [
    12,
    "Teach",
    "Draw a timeline of commits on the board showing rollbacks shifting with each commit and the rescue configuration fixed to one side. Project the save, show, rollback and commit sequence."
   ],
   [
    18,
    "Activity",
    "Run the Rollback Timeline activity with sticky notes."
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
  "warmup": "After a dozen changes, something broke and you do not know which change caused it. Would you rather undo one change at a time or jump to a point you know was safe? Why?",
  "activity": {
   "title": "Rollback Timeline",
   "materials": "Sticky notes in two colors, whiteboard with a horizontal timeline, printed scenario cards describing a sequence of commits and one rescue save.",
   "steps": [
    "Groups place one sticky note per commit on the timeline and label rollback 0, 1, 2 and so on as of the latest commit.",
    "Using a second color, groups mark when the rescue configuration was saved, then add three more commits and relabel the rollbacks while leaving the rescue note unchanged.",
    "Groups answer scenario questions, such as which rollback number now holds a particular commit and what `rollback rescue` would load.",
    "Groups write the full command sequence to restore and activate the rescue configuration, naming the CLI mode for each command."
   ]
  },
  "discussion": [
   "What should a minimal rescue configuration contain for a remote branch router, and what should it leave out?",
   "How would you make sure rescue configurations stay current across a fleet of devices?"
  ],
  "exit": [
   [
    "Which command and mode save the rescue configuration?",
    "`request system configuration rescue save` in operational mode."
   ],
   [
    "What must you do after `rollback rescue` to make it active?",
    "Commit."
   ],
   [
    "How does the rescue configuration differ from rollback 1?",
    "Rollback 1 changes with every commit; the rescue configuration is saved manually and stays the same until you replace or delete it."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column table (rollbacks versus rescue) with prompts such as created by, changes when and restored with for students to fill in.",
   "Extend: Ask fast finishers to write a minimal rescue configuration in set format for a branch router, including root authentication, a management address, a default route and SSH with root login denied."
  ]
 },
 {
  "t": "NTP, SNMP and remote syslog for ongoing operations",
  "objectives": [
   "Students will be able to interpret `show ntp associations` output and state whether a device is synchronized.",
   "Students will be able to distinguish SNMP polls from traps and SNMPv2c from SNMPv3.",
   "Students will be able to explain why remote syslog depends on accurate NTP time and name the default ports.",
   "Students will be able to design a periodic health check for NTP, SNMP and syslog on a Junos device."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the whiteboard without judging them."
   ],
   [
    15,
    "Teach",
    "Project the `show ntp associations` sample and walk through each column, stressing the asterisk and the reach value. Contrast SNMP polls and traps with arrows on the board, then show the syslog host command and explain source-address."
   ],
   [
    15,
    "Activity",
    "Run the Broken Services card activity in pairs, then have two pairs present their diagnosis."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect time accuracy to incident response."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand it in at the door."
   ]
  ],
  "warmup": "Your phone's clock is ten minutes slow and you send a message saying you left at 9:00. Why might that cause trouble, and what would the same problem look like across fifty routers writing logs?",
  "activity": {
   "title": "Broken Services card diagnosis",
   "materials": "Printed cards, each with a short output excerpt (NTP associations with and without an asterisk, SNMP statistics taken five minutes apart, a syslog host configuration plus a log server note), whiteboard.",
   "steps": [
    "Give each pair a set of four cards describing one router's state.",
    "Pairs decide for each service whether it is healthy, broken or unknown, and write the evidence beside it.",
    "Pairs propose the single most likely root cause and the first command they would run to confirm it.",
    "Two pairs present; the class checks whether the evidence supports their conclusion."
   ]
  },
  "discussion": [
   "If the log server is quiet, how would you prove the router is still sending rather than assuming all is well?",
   "Why might an organization choose SNMPv3 even though SNMPv2c is easier to set up?"
  ],
  "exit": [
   [
    "What marks the synchronized server in `show ntp associations`?",
    "An asterisk (`*`) before the server address."
   ],
   [
    "Which direction does an SNMP trap travel?",
    "From the device's agent to the network management system, without being requested."
   ],
   [
    "Name the default transport and port for NTP and for remote syslog.",
    "NTP uses UDP port 123; remote syslog uses UDP port 514 by default."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page reference that labels each column of the NTP output and a two-arrow diagram showing polls versus traps.",
   "Extend: Ask fast finishers to write a complete set of commands for a hardened setup with two NTP servers, SNMPv3 read-only access limited to one NMS, and syslog sourced from lo0."
  ]
 },
 {
  "t": "Packet forwarding decisions: longest-prefix match, next hops, active vs inactive routes (`*`)",
  "objectives": [
   "Students will be able to apply longest-prefix match to choose the forwarding route for a given destination address.",
   "Students will be able to explain the difference between the routing table and the forwarding table.",
   "Students will be able to identify the active route and selected next hop in `show route` output using `*` and `>`.",
   "Students will be able to predict which inactive route becomes active after a failure."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let students vote by show of hands before revealing the answer."
   ],
   [
    15,
    "Teach",
    "Draw the RE and PFE on the board with an arrow labeled 'active routes only.' Work through three destination addresses against a small table, then project the `show route` sample and circle `*`, `>` and the preference brackets."
   ],
   [
    15,
    "Activity",
    "Run the Packet Race card activity in small groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on why longest match must come before preference."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on paper."
   ]
  ],
  "warmup": "A router has a route to 10.0.0.0/8 with preference 5 and a route to 10.1.0.0/16 with preference 170. Where does a packet to 10.1.2.3 go? Vote, then defend your choice.",
  "activity": {
   "title": "Packet Race",
   "materials": "Printed route-table sheet with about eight prefixes of varied lengths and preferences, a deck of destination-address cards, whiteboard for scoring.",
   "steps": [
    "Give each group of three the route-table sheet and shuffle the destination cards face down.",
    "Flip one card at a time; each group writes the matching prefix, protocol and next hop, racing for accuracy rather than speed.",
    "After eight cards, announce that one interface has failed and ask which inactive routes now become active.",
    "Groups compare answers and explain any disagreements using the order prefix, preference, next hop."
   ]
  },
  "discussion": [
   "Why would it be dangerous if preference were compared before prefix length?",
   "Why does Junos keep inactive routes at all instead of discarding them?"
  ],
  "exit": [
   [
    "Routes exist for 0.0.0.0/0, 172.16.0.0/12 and 172.16.4.0/24. Which is used for 172.16.4.9?",
    "172.16.4.0/24, the longest matching prefix."
   ],
   [
    "Which routes are copied to the forwarding table?",
    "Only the active route for each prefix."
   ],
   [
    "In `show route`, what does `>` mark?",
    "The selected next hop that traffic actually uses."
   ]
  ],
  "differentiation": [
   "Support: Provide a binary-conversion helper card and practice checking whether an address falls inside a prefix before doing the race.",
   "Extend: Ask fast finishers to build a table where a discard route and a reject route are both present and explain what a sender would observe for each."
  ]
 },
 {
  "t": "Routing tables: inet.0, inet6.0, inet.3, and instance tables such as vr1.inet.0",
  "objectives": [
   "Students will be able to identify the purpose of inet.0, inet6.0, inet.3 and mpls.0.",
   "Students will be able to construct the correct table name for a routing instance and address family.",
   "Students will be able to interpret the header counts of a routing table, including hidden routes.",
   "Students will be able to choose the right command to locate a route in a specific table."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student guesses on the board."
   ],
   [
    12,
    "Teach",
    "Draw a filing cabinet with drawers labeled inet.0, inet6.0, inet.3, mpls.0 and vr1.inet.0. Explain each drawer, then project the instance table sample and read the header together."
   ],
   [
    18,
    "Activity",
    "Run the Which Drawer card sort in pairs, followed by a quick check of answers."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "You configured an interface and it is up, but `show route` does not list its subnet. Brainstorm every reason you can think of.",
  "activity": {
   "title": "Which Drawer card sort",
   "materials": "Printed cards each describing a route or situation (an IPv6 static route, an OSPF IPv4 route, an LSP to a remote loopback, a direct route on an interface in instance SALES, a BGP route whose next hop cannot be resolved), sheets labeled with table names plus one labeled hidden.",
   "steps": [
    "Pairs place each card on the sheet for the table where the route would appear.",
    "For each card, pairs write the command they would use to see it.",
    "Reveal answers one by one; pairs score a point for the table and a point for the command.",
    "Finish by asking pairs to invent one tricky card and swap it with a neighbor."
   ]
  },
  "discussion": [
   "What are the benefits of keeping IPv4 and IPv6 routes in separate tables?",
   "How could separate instance tables help or hurt when troubleshooting a customer complaint?"
  ],
  "exit": [
   [
    "What is the table name for IPv6 routes in an instance called LAB?",
    "LAB.inet6.0."
   ],
   [
    "Is inet.3 used for ordinary IPv4 forwarding? Explain.",
    "No. It holds MPLS LSP egress routes that BGP uses to resolve next hops."
   ],
   [
    "Which command lists routes that Junos knows but cannot use?",
    "`show route hidden`."
   ]
  ],
  "differentiation": [
   "Support: Give a printed naming template with blanks for instance, family and number, and practice filling it in for five examples.",
   "Extend: Ask fast finishers to explain how a BGP route's next hop could be resolved through inet.3 and what would change if no LSP existed."
  ]
 },
 {
  "t": "Route preference values: direct/local 0, static 5, OSPF internal 10, RIP 100, aggregate/generated 130, OSPF external 150, BGP 170",
  "objectives": [
   "Students will be able to recall the default Junos preference values for direct, static, OSPF internal, RIP, aggregate, OSPF external and BGP routes.",
   "Students will be able to determine the active route when one prefix is learned from multiple sources.",
   "Students will be able to explain why longest-prefix match is applied before preference.",
   "Students will be able to describe how a floating static route uses a raised preference."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up and record the class ranking on the board."
   ],
   [
    12,
    "Teach",
    "Write the seven default values in a vertical ladder, explain the trust reasoning for each rung, introduce the mnemonic, and project the `[OSPF/150]` sample."
   ],
   [
    18,
    "Activity",
    "Run Preference Showdown in teams."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions individually."
   ]
  ],
  "warmup": "Rank these from most to least trustworthy for directions to a new restaurant: what you see on the street, a note from your manager, a friend's text, a stranger's review. How might a router make a similar ranking?",
  "activity": {
   "title": "Preference Showdown",
   "materials": "Printed cards, each showing a route source and prefix (for example Static 10.0.0.0/8, OSPF external 10.1.0.0/16, RIP 10.1.0.0/16), whiteboard for scores.",
   "steps": [
    "Split the class into teams and deal three to four route cards to each team per round.",
    "The teacher announces a destination address; teams decide which of their routes would forward it and why, applying longest match first and preference second.",
    "The teacher then removes one card to simulate a failure and teams name the new active route.",
    "Award points for correct answers and for correctly naming the rule used."
   ]
  },
  "discussion": [
   "Why might an engineer deliberately raise the preference of a static route?",
   "What risks come from changing default preferences on only some routers in a network?"
  ],
  "exit": [
   [
    "List the default preferences for static, OSPF internal, RIP and BGP.",
    "Static 5, OSPF internal 10, RIP 100, BGP 170."
   ],
   [
    "A prefix is learned via RIP and OSPF external. Which is active?",
    "RIP, because 100 is lower than 150."
   ],
   [
    "Static 10.0.0.0/8 and BGP 10.4.0.0/16 both exist. Which forwards traffic to 10.4.1.1?",
    "The BGP /16, because longest-prefix match applies before preference."
   ]
  ],
  "differentiation": [
   "Support: Provide a laminated ladder card with the seven values and the mnemonic for use during the activity.",
   "Extend: Ask fast finishers to design a two-router scenario where changing OSPF external-preference on only one router produces asymmetric routing, and explain it."
  ]
 },
 {
  "t": "Routing instances: virtual-router, forwarding and VRF types",
  "objectives": [
   "Students will be able to compare the virtual-router, forwarding and vrf instance types.",
   "Students will be able to select the correct instance type for a described business requirement.",
   "Students will be able to read a basic virtual-router configuration and predict where its routes appear.",
   "Students will be able to test connectivity within an instance using the routing-instance option."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch student ideas."
   ],
   [
    15,
    "Teach",
    "Draw one router box split into three colored areas. Walk through the virtual-router configuration line by line, then explain FBF with an arrow from a filter into a table with no interfaces, and finish with VRF, route distinguishers and targets."
   ],
   [
    15,
    "Activity",
    "Run Instance Matchmaker in small groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "A small business owner wants guests and staff on separate networks but can only afford one router. How might one device behave like two?",
  "activity": {
   "title": "Instance Matchmaker",
   "materials": "Printed requirement cards (guest isolation, department sent to a second ISP, service provider with overlapping customer addresses, lab with three routers on one box), a sheet with three columns labeled virtual-router, forwarding and vrf.",
   "steps": [
    "Groups place each requirement card in the column for the right instance type.",
    "For each card, groups list what extra configuration is needed (interfaces, firewall filter, RIB group, route distinguisher, VRF target).",
    "Groups write one test command for each scenario using the routing-instance option.",
    "The teacher reveals answers and groups correct their sheets."
   ]
  },
  "discussion": [
   "Why does a forwarding instance not need interfaces of its own?",
   "How does a route distinguisher let two customers use the same private addresses?"
  ],
  "exit": [
   [
    "Which instance type would you use to isolate a guest network on one router?",
    "virtual-router."
   ],
   [
    "Which instance type is used for filter-based forwarding?",
    "forwarding."
   ],
   [
    "What does a vrf instance require beyond interfaces and a table?",
    "A route distinguisher and a VRF target or import/export policies."
   ]
  ],
  "differentiation": [
   "Support: Give a comparison table with yes/no cells for interfaces, own table, VPN signaling and filter required, and let students fill it before the activity.",
   "Extend: Ask fast finishers to write the complete set commands for a forwarding instance used for FBF, including the firewall filter term with the routing-instance action."
  ]
 },
 {
  "t": "Static routes: `routing-options static`, next-hop, qualified-next-hop with preference (floating routes), discard and reject",
  "objectives": [
   "Students will be able to configure a static route with a directly connected next hop under `routing-options static`.",
   "Students will be able to build a primary and backup path using `qualified-next-hop` with preference.",
   "Students will be able to explain how a floating static route interacts with dynamic routing preferences.",
   "Students will be able to compare discard and reject next hops and choose one for a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect ideas."
   ],
   [
    15,
    "Teach",
    "Write the basic static route on the board, explain the directly connected rule, then add a qualified next hop and walk through failover. Show a floating static against OSPF and finish with discard versus reject."
   ],
   [
    15,
    "Activity",
    "Run Fill in the Failover in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the exit questions."
   ]
  ],
  "warmup": "Your usual road to school is closed. How do you know to take another route, and how would you write that plan down so someone else could follow it without asking you?",
  "activity": {
   "title": "Fill in the Failover",
   "materials": "Printed worksheet with three network diagrams (branch with fiber and LTE, site running OSPF with a backup link, router advertising a summary), blank lines for set commands, projector for answers.",
   "steps": [
    "Pairs write the set commands for diagram one using next-hop and qualified-next-hop.",
    "Pairs write a floating static route for diagram two and state its preference relative to OSPF.",
    "Pairs choose discard or reject for diagram three and justify the choice.",
    "The teacher projects model answers and pairs trade worksheets to mark each other's work."
   ]
  },
  "discussion": [
   "What failures can a static route with a qualified next hop not detect, and how might you handle them?",
   "When would reject be more helpful than discard inside a corporate network?"
  ],
  "exit": [
   [
    "What happens to a static route whose next hop is not directly connected and has no resolve option?",
    "It stays inactive (hidden) because the next hop cannot be resolved."
   ],
   [
    "What preference would make a static route float behind OSPF internal routes?",
    "Any value higher than 10, commonly something like 200."
   ],
   [
    "Which static route action drops traffic and sends an ICMP unreachable?",
    "reject."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed configuration with blanks for the next hop and preference values only.",
   "Extend: Ask fast finishers to explain how they would make a static route float behind BGP as well as OSPF and what preference values are valid choices."
  ]
 },
 {
  "t": "Default routes and summarization (aggregate routes)",
  "objectives": [
   "Students will be able to explain when a default route is used under longest-prefix match.",
   "Students will be able to configure an aggregate route and identify its contributing routes.",
   "Students will be able to explain why the aggregate's default reject next hop prevents loops.",
   "Students will be able to distinguish aggregate routes from generated routes and state that both need export policy to be advertised."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and discuss briefly."
   ],
   [
    15,
    "Teach",
    "Draw ten /24 subnets inside a /16 box. Show the aggregate command, explain contributing routes, then draw the loop that would occur without a reject next hop. Close with generated routes and the need for an export policy."
   ],
   [
    15,
    "Activity",
    "Run Summary Builder in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "If you had to give a visitor directions to any of 50 shops in one mall, would you list each shop or just say the mall? What is lost and gained?",
  "activity": {
   "title": "Summary Builder",
   "materials": "Printed lists of subnets for three fictional sites, blank route-table sheets, whiteboard for a loop diagram.",
   "steps": [
    "Pairs find the smallest single prefix that summarizes each site's subnets.",
    "Pairs write the aggregate command and the export policy terms needed to advertise it.",
    "The teacher removes subnets from one site one at a time; pairs decide when the aggregate disappears.",
    "Pairs trace a packet for an unused address with and without the reject next hop and present the difference."
   ]
  },
  "discussion": [
   "What information do neighbors lose when you summarize, and when might that matter?",
   "Why might you choose discard instead of reject for an aggregate facing the internet?"
  ],
  "exit": [
   [
    "What is the default next hop of a Junos aggregate route?",
    "reject."
   ],
   [
    "Is an aggregate route advertised to neighbors automatically?",
    "No. It must be exported with a routing policy."
   ],
   [
    "What is the default preference of aggregate and generated routes?",
    "130."
   ]
  ],
  "differentiation": [
   "Support: Provide a binary worksheet that shows how to find a common prefix length for a group of subnets.",
   "Extend: Ask fast finishers to design a conditional default route with a generated route and explain which contributing routes should keep it active."
  ]
 },
 {
  "t": "Dynamic routing concepts: why IGPs and EGPs exist, OSPF and BGP at a high level",
  "objectives": [
   "Students will be able to explain why dynamic routing protocols are used instead of only static routes.",
   "Students will be able to classify OSPF, IS-IS, RIP and BGP as IGPs or EGPs and justify the classification.",
   "Students will be able to describe how OSPF uses LSAs and SPF and how BGP uses the AS path.",
   "Students will be able to recall BGP's transport and port and the Junos preferences for OSPF and BGP."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record answers."
   ],
   [
    15,
    "Teach",
    "Draw two autonomous systems on the board. Inside each, show OSPF flooding LSAs and computing SPF. Between them, show BGP over TCP 179 with an AS path growing as the route crosses ASs, and demonstrate loop rejection."
   ],
   [
    15,
    "Activity",
    "Run the Flood and Path role-play."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "If you managed 300 static routes and one link broke at 2 a.m., how would the network find out and fix itself? What would you want routers to do for you?",
  "activity": {
   "title": "Flood and Path role-play",
   "materials": "Sticky notes, string or tape to mark links on the floor or desks, printed AS number badges.",
   "steps": [
    "Part one: six students act as OSPF routers in one area. Each writes their links on a sticky note and passes copies to every neighbor until everyone holds the same set, then they compute the shortest path to a target.",
    "Remove one link and repeat the flooding to show reconvergence.",
    "Part two: students form three ASs with badges. A route note is passed between ASs, each adding its AS number to the path; the class tries to send it back into an AS already listed and sees it rejected.",
    "Debrief by listing the differences observed between the two parts."
   ]
  },
  "discussion": [
   "Why can't the whole internet run a single link-state protocol?",
   "What does an organization gain by running both an IGP and BGP?"
  ],
  "exit": [
   [
    "Is BGP an IGP or EGP, and what port does it use?",
    "An EGP; TCP port 179."
   ],
   [
    "What does OSPF flood, and what does each router compute from it?",
    "LSAs; each router builds the link-state database and runs SPF to find lowest-cost paths."
   ],
   [
    "What are the default Junos preferences for OSPF internal and BGP routes?",
    "OSPF internal 10, BGP 170."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column comparison chart (IGP versus EGP) with prompts for goal, example protocols and key mechanism.",
   "Extend: Ask fast finishers to explain why IBGP sessions are commonly built between loopback addresses and what role the IGP plays in that."
  ]
 },
 {
  "t": "Reading `show route`, `show route detail`, `show route protocol`, `show route table`",
  "objectives": [
   "Students will be able to interpret the header, symbols, brackets, age and next-hop lines of `show route` output.",
   "Students will be able to choose between `show route` filters such as exact, protocol, table, hidden and terse.",
   "Students will be able to use `show route detail` to find why a route is inactive.",
   "Students will be able to use route age to suspect a flapping link."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a raw `show route` snippet with no explanation and ask the warm-up question."
   ],
   [
    12,
    "Teach",
    "Annotate the projected output live: circle the header counts, the legend, `*`, brackets, age and `>`. Then list the filter options and show a detail excerpt with an inactive reason."
   ],
   [
    18,
    "Activity",
    "Run Output Detectives in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "Look at this route output for one minute. Write down three things you think it tells you, even if you are guessing.",
  "activity": {
   "title": "Output Detectives",
   "materials": "Printed case cards each with a short `show route` or `show route detail` excerpt and a user complaint, highlighters.",
   "steps": [
    "Each pair receives four case cards.",
    "Pairs highlight the active route, its source and preference, the selected next hop and the age.",
    "Pairs write a one-sentence diagnosis and the next command they would run for each case.",
    "Pairs swap cards with another pair and check each other's diagnoses, then the teacher reviews the hardest case."
   ]
  },
  "discussion": [
   "Why is the age field useful even though it does not affect route selection?",
   "When would you use `receive-protocol` versus `advertising-protocol` while troubleshooting BGP?"
  ],
  "exit": [
   [
    "What does the `>` symbol mark in `show route` output?",
    "The selected next hop in use."
   ],
   [
    "Which command filters output to OSPF routes only?",
    "`show route protocol ospf`."
   ],
   [
    "Which output shows the reason a route is inactive?",
    "`show route <prefix> detail` or `extensive`."
   ]
  ],
  "differentiation": [
   "Support: Give a labeled template of one route entry with arrows naming each field, for students to keep beside them.",
   "Extend: Ask fast finishers to write the exact sequence of commands they would use to troubleshoot a missing BGP route, from neighbor to policy to table."
  ]
 },
 {
  "t": "Routing policy uses: import (into the routing table) and export (out of the routing table)",
  "objectives": [
   "Students will be able to explain import and export policy directions relative to the routing table.",
   "Students will be able to choose import or export policy for a described requirement.",
   "Students will be able to configure an export policy that redistributes static routes into OSPF.",
   "Students will be able to explain why OSPF import policy cannot block LSA flooding."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and gather answers."
   ],
   [
    12,
    "Teach",
    "Draw the routing table in the center of the board with protocol boxes around it. Label arrows in as import and arrows out as export. Walk through the ADVERTISE-STATIC example and explain the OSPF limitation."
   ],
   [
    18,
    "Activity",
    "Run Front Door, Back Door in small groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "A warehouse has a receiving dock and a shipping dock. Where would you put an inspector to stop damaged goods from being stocked, and where to stop the wrong goods from being sent to a customer?",
  "activity": {
   "title": "Front Door, Back Door",
   "materials": "Printed requirement cards, a large routing-table drawing on the whiteboard, sticky notes in two colors (one for import, one for export).",
   "steps": [
    "Each group draws five requirement cards (for example accept only a default from an ISP, advertise a static route into OSPF, prefer one provider's routes, stop advertising private prefixes, load balance across equal paths).",
    "Groups write the direction and the configuration attachment point on a colored sticky note for each card.",
    "Groups place their notes on the arrows of the whiteboard drawing.",
    "The class reviews any card where groups disagreed and resolves it using the routing-table perspective."
   ]
  },
  "discussion": [
   "How could a missing export policy turn an enterprise into a transit network between two providers?",
   "Why does OSPF's design limit what import policy can do, while BGP's does not?"
  ],
  "exit": [
   [
    "Which policy direction controls what you advertise to a neighbor?",
    "Export."
   ],
   [
    "Where do you apply a policy to redistribute static routes into OSPF?",
    "As an export policy under `protocols ospf`."
   ],
   [
    "Does a policy-statement do anything before it is applied?",
    "No. It must be applied as import or export somewhere."
   ]
  ],
  "differentiation": [
   "Support: Provide a printed diagram with the routing table in the middle and arrows already labeled import and export for reference.",
   "Extend: Ask fast finishers to write a complete BGP import and export policy pair for a company with two ISPs that accepts only defaults and advertises only its own aggregate."
  ]
 },
 {
  "t": "Default policies: BGP accepts and advertises active BGP routes; OSPF import accepts all and export rejects all; RIP export rejects all",
  "objectives": [
   "Students will be able to state the default import and export policies for BGP, OSPF and RIP.",
   "Students will be able to explain why OSPF works normally despite a default export policy that rejects all routes.",
   "Students will be able to diagnose a RIP router that advertises nothing and write the fix.",
   "Students will be able to predict what a BGP router with no export policy advertises."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and take quick predictions."
   ],
   [
    15,
    "Teach",
    "Draw a three-row table on the board (BGP, OSPF, RIP) with import and export columns and fill it in, explaining the LSA exception for OSPF and the IBGP rule for BGP. Show the RIP-OUT policy."
   ],
   [
    15,
    "Activity",
    "Run Default Policy Detectives with symptom cards."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "You turn on RIP, OSPF and BGP on three pairs of lab routers with no policies. Predict which pairs will exchange routes and which will not.",
  "activity": {
   "title": "Default Policy Detectives",
   "materials": "Printed symptom cards (RIP routers learn nothing, BGP edge leaks provider routes, OSPF does not advertise a static default, BGP does not announce the company prefix), blank paper for fixes.",
   "steps": [
    "Pairs read each symptom card and name the default policy responsible.",
    "Pairs write the policy or configuration change that fixes the symptom.",
    "Pairs exchange fixes with another pair, who checks that the fix uses the right direction and protocol.",
    "The teacher reviews the BGP transit leak card in depth with the whole class."
   ]
  },
  "discussion": [
   "Why might Junos designers have chosen 'export rejects all' as the default for RIP and OSPF?",
   "What are the risks of relying on BGP's default export policy at an internet edge?"
  ],
  "exit": [
   [
    "What is RIP's default export policy?",
    "Reject all routes, so nothing is advertised without an export policy."
   ],
   [
    "What does BGP export by default?",
    "Active BGP routes, except IBGP-learned routes are not sent to other IBGP peers."
   ],
   [
    "Does OSPF's default export policy stop internal OSPF routes from being shared?",
    "No. LSAs are flooded by the protocol; only redistribution of other routes is blocked."
   ]
  ],
  "differentiation": [
   "Support: Give a pre-filled default policy table with two blanks per row to complete during the teach segment.",
   "Extend: Ask fast finishers to explain how a configured policy chain that ends without a final term interacts with each protocol's default policy, using an example."
  ]
 },
 {
  "t": "Policy structure: terms, `from` match conditions, `then` actions; terminating vs flow-control actions (next term, next policy)",
  "objectives": [
   "Students will be able to describe the structure of a policy-statement with terms, from conditions and then actions.",
   "Students will be able to classify actions as terminating, flow-control or modifying.",
   "Students will be able to trace a route through a policy and a policy chain to predict the result.",
   "Students will be able to correct a policy whose term order produces the wrong result."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and discuss answers."
   ],
   [
    12,
    "Teach",
    "Project the EXPORT-BGP policy. Explain AND versus OR in from, then sort actions into three columns on the board. Trace two routes through the policy live, then show a two-policy chain."
   ],
   [
    18,
    "Activity",
    "Run Policy Walkthrough in pairs with route cards."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "A bouncer has two rules on a card: 'Anyone with a ticket, let in' and then 'Anyone named Alex, turn away.' Alex arrives with a ticket. What happens, and how would you fix the card?",
  "activity": {
   "title": "Policy Walkthrough",
   "materials": "Printed policy sheets (one single policy, one two-policy chain, one with a term-order bug), a deck of route cards listing protocol, prefix and community, pens.",
   "steps": [
    "Pairs take a route card and trace it through the first policy sheet, writing each term checked and the action taken.",
    "Pairs repeat with the policy chain sheet, noting where evaluation moves to the next policy or to the default policy.",
    "Pairs examine the buggy policy, identify which route is wrongly accepted and rewrite the term order.",
    "Pairs present one trace to the class, explaining each step aloud."
   ]
  },
  "discussion": [
   "Why do many engineers end every policy with an explicit final term?",
   "When would a term with only modifying actions be useful in a real design?"
  ],
  "exit": [
   [
    "Which actions are terminating?",
    "accept and reject."
   ],
   [
    "Two different conditions appear in one `from` section. How are they combined?",
    "With a logical AND; both must match."
   ],
   [
    "A term matches and only adds a community. What happens next?",
    "The community is added and evaluation continues with the next term."
   ]
  ],
  "differentiation": [
   "Support: Provide a flowchart template showing match, modify, terminate or continue, for students to follow while tracing routes.",
   "Extend: Ask fast finishers to write a policy that uses `next policy` deliberately and explain how it interacts with a second policy in the chain and the BGP default policy."
  ]
 },
 {
  "t": "Policy chains and evaluation order, falling through to the default policy",
  "objectives": [
   "Students will be able to trace a route through a multi-policy chain and identify which term and policy makes the final decision.",
   "Students will be able to explain when a route falls through to a protocol's default policy and state the BGP default export behavior.",
   "Students will be able to compare the effect of policy order and BGP global, group and neighbor application levels.",
   "Students will be able to apply an explicit reject term and the `insert` command to correct a flawed chain."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up prompt. Take three or four answers and write them on the board without judging. Tell students they will be able to answer it precisely by the end of class."
   ],
   [
    12,
    "Teach",
    "Draw a chain of three boxes labeled P1, P2 and P3 followed by a box labeled Default. Walk three routes through it aloud: one rejected in P1, one accepted in P2, one that matches nothing. Stress that the first accept or reject is final, that `next policy` and non-terminating matches move on, and state the BGP default export behavior. Briefly show that a neighbor-level export replaces the group-level one."
   ],
   [
    18,
    "Activity",
    "Run the route-tracing card activity described below. Circulate and ask each pair to say out loud which term made the decision for each route."
   ],
   [
    5,
    "Discuss",
    "Revisit the warm-up answers and correct them as a class. Use the discussion questions to connect the activity to real outages such as accidental transit."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note or index card and hand them in at the door."
   ]
  ],
  "warmup": "Your only BGP export policy accepts your company's own aggregate route and says nothing else. Which routes do you think your router advertises to your provider, and why?",
  "activity": {
   "title": "Trace the route through the chain",
   "materials": "Printed policy cards (one card per policy showing its terms as `set` lines), printed route cards (a prefix, protocol and whether it is active), a printed card showing the BGP default export behavior, whiteboard and markers.",
   "steps": [
    "Give each pair a chain of three policy cards laid out left to right, the default policy card at the end, and a stack of eight route cards.",
    "For each route card, pairs move the card across the policy cards, reading terms top to bottom, and stop at the first `accept` or `reject`. They write the deciding policy and term, or the word default, on the route card.",
    "Hand out a change card that swaps the order of two policies. Pairs re-trace the routes and circle every route whose fate changed.",
    "Hand out a second change card that adds a final `then reject` term to the last policy. Pairs note which routes no longer reach the default.",
    "Two pairs compare answers, resolve any differences, and one pair presents a route whose result surprised them."
   ]
  },
  "discussion": [
   "Why might Junos designers have chosen a permissive BGP default export policy rather than a reject-everything default, and what does that mean for engineers writing policies?",
   "In your own words, why is an early broad accept more dangerous than an early broad reject in a chain?"
  ],
  "exit": [
   [
    "In `export [ X Y ]`, policy X rejects 10.0.0.0/8. Can policy Y accept it?",
    "No. The reject in X is terminating, so Y and the default never evaluate that route."
   ],
   [
    "A route matches no terminating term in any policy of a BGP export chain. What happens to it?",
    "It falls through to the BGP default export policy, which advertises it if it is an active BGP route."
   ],
   [
    "How do you place policy NEW before policy OLD in an existing export chain?",
    "Use `insert export NEW before OLD` at the protocol, group or neighbor hierarchy where the chain is configured."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a chain of only two short policies and four route cards, and a printed flowchart with the three outcomes (terminating match, next policy or no match, end of chain) to follow step by step.",
   "Extend: Ask fast finishers to design a complete export chain for a dual-homed site that advertises only its aggregate, blocks bogons first, and works correctly even if someone later adds a neighbor-level policy."
  ]
 },
 {
  "t": "Route filters and match types: exact, orlonger, longer, upto, prefix-length-range; prefix lists",
  "objectives": [
   "Students will be able to state which routes each match type (exact, orlonger, longer, upto, prefix-length-range) selects for a given filter prefix.",
   "Students will be able to determine whether a given route matches a route filter by checking containment first and length second.",
   "Students will be able to explain longest-match selection when several route filters appear in one term.",
   "Students will be able to write a policy term using a prefix list with `prefix-list` or `prefix-list-filter` and the correct match type."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and let pairs discuss for two minutes. Collect answers and note disagreements about whether the /16 itself counts."
   ],
   [
    12,
    "Teach",
    "Draw a number line from /16 to /32 under the prefix 192.168.0.0/16. Shade the range each match type covers, one color per type. Emphasize the two-step check (inside the prefix, then length). Show one term with two route filters and demonstrate longest match. Finish with prefix-list versus prefix-list-filter."
   ],
   [
    18,
    "Activity",
    "Run the match-type card sort described below, then a quick round where pairs write one route filter for a stated business requirement."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions. Ask pairs to share the route that fooled them most in the sort."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on paper."
   ]
  ],
  "warmup": "Your filter is `route-filter 192.168.0.0/16 orlonger`. Write down three routes that match and one route that looks close but does not match.",
  "activity": {
   "title": "Match-type card sort",
   "materials": "Printed route cards (about 15 prefixes such as 192.168.0.0/16, 192.168.4.0/22, 192.168.7.128/25, 192.168.1.1/32, 10.0.0.0/24, 192.168.0.0/15), five printed header cards (exact, orlonger, longer, upto /24, prefix-length-range /20-/24), sticky notes, whiteboard.",
   "steps": [
    "Write the filter prefix 192.168.0.0/16 on the board. Give each group of three the header cards and the route cards.",
    "Groups place each route card under every header it matches, using sticky notes to duplicate a route that matches several headers. Routes that match none go in a separate pile.",
    "Groups check their work against the number line on the board and explain any route in the no-match pile, naming which step failed (containment or length).",
    "Give each group a requirement card, for example accept a customer's /22 and subnets down to /24 only. Groups write the route filter and the final reject term.",
    "Groups swap requirement answers with a neighbor group, who tests three routes against it and reports whether it meets the requirement."
   ]
  },
  "discussion": [
   "When would a provider choose `upto` over `orlonger` for customer routes, and what risk does `orlonger` create?",
   "Why might you prefer separate terms rather than several route filters in one term?"
  ],
  "exit": [
   [
    "Does 10.0.0.0/8 match `route-filter 10.0.0.0/8 longer`?",
    "No. `longer` excludes the filter's own prefix and matches only more specific routes."
   ],
   [
    "Name the match type that accepts 203.0.113.0/24 and its subnets down to /26 only.",
    "`upto /26` on 203.0.113.0/24."
   ],
   [
    "What is the difference between `from prefix-list CUST` and `from prefix-list-filter CUST orlonger`?",
    "The first matches only routes exactly equal to the list entries; the second also matches more specific routes inside each entry."
   ]
  ],
  "differentiation": [
   "Support: Give students a printed number line from /8 to /32 and have them shade each match type for one prefix before attempting the card sort, and limit their deck to eight route cards.",
   "Extend: Challenge students to rewrite `orlonger` and `longer` on a /16 using only `prefix-length-range`, and to predict the result of a term containing three overlapping route filters for five tricky routes."
  ]
 },
 {
  "t": "Testing with `test policy`",
  "objectives": [
   "Students will be able to use `test policy <name> <prefix>` correctly, including `0.0.0.0/0` to test the whole routing table.",
   "Students will be able to explain the default accept behavior of `test policy` and why it can differ from a protocol's default policy.",
   "Students will be able to interpret `test policy` output, including the accepted and rejected summary.",
   "Students will be able to sequence a safe workflow: commit the policy, test it, apply it with `commit confirmed`, and verify with `show route advertising-protocol bgp`."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Collect ideas for checking a policy safely before applying it, and steer toward the idea of a dry run."
   ],
   [
    12,
    "Teach",
    "Project the sample `test policy` output and annotate it: the table header, an accepted route, the aggregate's `Reject` next hop, and the summary line. Explain default accept and contrast it with BGP and OSPF defaults. Present the four-step workflow on the board."
   ],
   [
    18,
    "Activity",
    "Run the predict-the-output activity below in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions and connect them to the warm-up ideas."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "You have written a new export policy that will be applied toward your internet provider. Before you attach it to BGP, how could you find out which routes it would accept without risking a leak?",
  "activity": {
   "title": "Predict the test output",
   "materials": "Printed handout with a small routing table (about 10 routes of mixed protocols: static, direct, aggregate, BGP) and three short policies written as `set` lines; projector for the sample output; whiteboard.",
   "steps": [
    "Pairs read the routing table and Policy 1, which has an accept term and a final reject. They write the routes `test policy POLICY1 0.0.0.0/0` would list and the accepted and rejected counts.",
    "Pairs repeat for Policy 2, which has the same accept term but no final reject, remembering that unmatched routes show as accepted.",
    "Pairs note, for Policy 2, which routes BGP export would actually advertise if the policy were applied, using the BGP default export rule printed on the handout, and circle differences from their test prediction.",
    "Pairs write the four-step safe workflow for applying Policy 1 to a BGP group, including the verification command.",
    "The teacher reveals the answers; pairs score themselves and explain one mistake they corrected."
   ]
  },
  "discussion": [
   "Why do you think Junos made `test policy` accept unmatched routes instead of copying a protocol's default policy?",
   "What kinds of policy mistakes can `test policy` not catch, and how would you catch them instead?"
  ],
  "exit": [
   [
    "What command tests policy EXPORT-ISP against every route in inet.0?",
    "`test policy EXPORT-ISP 0.0.0.0/0`."
   ],
   [
    "Why might `test policy` show more accepted routes than a protocol actually exports?",
    "`test policy` accepts any route not explicitly rejected, while the protocol's default policy might reject those unmatched routes."
   ],
   [
    "After applying an export policy to BGP, which command confirms what is really being sent to neighbor 203.0.113.1?",
    "`show route advertising-protocol bgp 203.0.113.1`."
   ]
  ],
  "differentiation": [
   "Support: Provide a version of the handout with only five routes and a single policy, plus a checklist reminding students to ask for each route whether it hits accept, reject, or nothing.",
   "Extend: Ask students to explain how they would verify an import policy, since `test policy` works on routes already in the table, using `show route receive-protocol bgp` and the installed routes for comparison."
  ]
 },
 {
  "t": "Firewall filters: stateless, term order, match conditions, implicit discard at the end",
  "objectives": [
   "Students will be able to explain what stateless means for a Junos firewall filter and why return traffic must be permitted explicitly.",
   "Students will be able to trace a packet through ordered filter terms and identify the deciding term or the implicit discard.",
   "Students will be able to apply AND and OR logic to match conditions within a term.",
   "Students will be able to write a filter term, including a `tcp-established` term and an explicit final term, for a stated requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up scenario. Ask students to guess why the server broke, and record guesses on the board."
   ],
   [
    12,
    "Teach",
    "Project the PROTECT filter. Walk three packets through it: an SSH packet from 192.0.2.10, an SSH packet from 203.0.113.5, and a DNS reply. Explain stateless behavior, term order, AND versus OR, and the implicit discard. Contrast firewall filters with SRX stateful security policies in one sentence."
   ],
   [
    18,
    "Activity",
    "Run the packet-walk role-play described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions and return to the warm-up guesses to confirm the implicit discard as the cause."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "An engineer applies a filter that only accepts HTTPS to a web server. Afterward the server cannot download updates. The filter contains no discard statements. What might be going on?",
  "activity": {
   "title": "Packet walk role-play",
   "materials": "A filter of five terms printed in large type, one term per sheet, plus a sheet labeled Implicit discard; printed packet cards listing source address, destination address, protocol, port and TCP flags; tape; whiteboard.",
   "steps": [
    "Tape the five term sheets and the implicit discard sheet in order along a wall or the whiteboard.",
    "Hand each student a packet card. One at a time, students walk their packet along the wall, stopping at the first term where every condition matches, and announce the action.",
    "The class checks each walk. If a student stops at the wrong term, the class identifies which condition failed (AND) or which value matched (OR).",
    "Swap two term sheets to change the order and have students whose results changed walk again.",
    "In pairs, students write one new term that lets reply traffic for internal web browsing back in, and decide where in the order it belongs."
   ]
  },
  "discussion": [
   "What are the trade-offs between a stateless filter and a stateful firewall for protecting a router versus protecting a server network?",
   "Why is a visible final count-and-discard term better practice than relying on the implicit discard?"
  ],
  "exit": [
   [
    "What happens to a packet that matches no term in a Junos firewall filter?",
    "It is silently discarded by the implicit final discard term."
   ],
   [
    "A term has `from source-address 10.1.1.0/24` and `from protocol [ tcp udp ]`. Does a UDP packet from 10.1.1.5 match?",
    "Yes. The source matches, and UDP is one of the ORed protocol values; the two conditions are ANDed and both are true."
   ],
   [
    "Name the match condition that selects TCP replies with ACK or RST set.",
    "`tcp-established`."
   ]
  ],
  "differentiation": [
   "Support: Give students a filter with only two terms and four packet cards, and a printed checklist: is every condition true, which action applies, or does it fall to the implicit discard.",
   "Extend: Ask students to write a complete filter for a small office internet interface that permits replies to internal users, SSH from one management network, and limited ICMP, ending with a counted final discard, and to explain the order they chose."
  ]
 },
 {
  "t": "Filter actions: terminating (accept, discard, reject) and non-terminating (count, log, syslog, policer)",
  "objectives": [
   "Students will be able to classify firewall filter actions as terminating or non-terminating.",
   "Students will be able to compare discard and reject and choose the appropriate one for a given network position.",
   "Students will be able to predict the result of a term that contains only non-terminating actions, and explain `next term`.",
   "Students will be able to choose between `log`, `syslog` and `count` for a monitoring need and name the command that displays each."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a ping flood. Gather ideas and highlight any answer that combines blocking with measuring."
   ],
   [
    12,
    "Teach",
    "Draw two columns on the board: Decides (accept, discard, reject, routing-instance) and Adds (count, log, syslog, policer, forwarding-class, next term). Walk through the policer example line by line. State the implied accept rule and show how `next term` changes it. Compare `show firewall` and `show firewall log`."
   ],
   [
    18,
    "Activity",
    "Run the action card sort and term-building activity described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on a half sheet."
   ]
  ],
  "warmup": "Your router is being flooded with pings, but your team still needs ping for troubleshooting. What would you want a filter to do with ICMP traffic?",
  "activity": {
   "title": "Sort the actions, then build the term",
   "materials": "Printed action cards (accept, discard, reject, routing-instance, count, log, syslog, policer, forwarding-class, next term), printed requirement cards, sticky notes, whiteboard.",
   "steps": [
    "In groups of three, students sort the action cards into Terminating and Non-terminating piles and write one sentence on a sticky note explaining each.",
    "The teacher checks the piles with the class and resolves disagreements, especially policer and next term.",
    "Each group draws two requirement cards, for example: limit ICMP to the router and measure it; record blocked scanner traffic on the central log server; count web traffic but let later terms decide.",
    "Groups write the `then` section for each requirement using the cards, and state what happens to a matching packet.",
    "Groups pass their answers to the next group, which checks for an accidental implied accept or a wrong logging choice and writes feedback."
   ]
  },
  "discussion": [
   "When might a network team prefer `reject` over `discard`, despite the security advantages of discard?",
   "Why is it risky to rely on the implied accept instead of writing a terminating action in every term?"
  ],
  "exit": [
   [
    "A term matches a packet and has only `then policer LIMIT`. What happens to a packet within the rate limit?",
    "It is accepted, because a term without a terminating action implies accept."
   ],
   [
    "Which terminating action sends an ICMP unreachable back to the sender?",
    "`reject`."
   ],
   [
    "You need blocked-packet records kept on a remote server. Which action do you use: `log` or `syslog`?",
    "`syslog`, because `log` only stores headers in a small local buffer viewed with `show firewall log`."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-column reference sheet with each action, its type and a one-line description, and let them use it during the card sort and term building.",
   "Extend: Ask students to design a loopback filter term that polices ICMP, counts it, sends a syslog message only for traffic above the policer limit, and explain any limitation they discover in doing so with a single term."
  ]
 },
 {
  "t": "Applying filters to interfaces (input/output) and to lo0 to protect the RE",
  "objectives": [
   "Students will be able to apply a firewall filter to a logical interface in the input or output direction using correct `set` syntax.",
   "Students will be able to distinguish host-bound traffic from transit traffic and explain why an lo0 input filter protects the RE but not transit traffic.",
   "Students will be able to list the services an lo0 protection filter must permit and predict what breaks when one is missing.",
   "Students will be able to apply an lo0 filter safely using `commit confirmed` and verify it with `show firewall filter`."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question. List student answers on the board as two groups: traffic to the router and traffic through the router."
   ],
   [
    12,
    "Teach",
    "Draw a router with three physical interfaces and a box inside labeled RE with lo0 at its door. Trace a transit packet and a host-bound SSH packet. Show the three `set` lines for input, output and lo0. Walk through the services a good lo0 filter permits, and demonstrate the `commit confirmed 5` workflow and verification commands."
   ],
   [
    18,
    "Activity",
    "Run the lo0 filter design and peer review described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "List every kind of traffic you can think of that is addressed to a router itself rather than passing through it. Which of these would break if it were blocked?",
  "activity": {
   "title": "Design and break-test an lo0 filter",
   "materials": "Printed network scenario sheet (router with management network, two BGP peers, internal OSPF, NTP and DNS servers, internet uplinks), blank filter worksheets, sticky notes, whiteboard.",
   "steps": [
    "In pairs, students read the scenario and list every host-bound service the router uses, with the sources that should be allowed.",
    "Pairs write a PROTECT-RE filter as `set` lines on the worksheet, including a final count-and-discard term, and the line that applies it to lo0 input.",
    "Pairs swap worksheets. The reviewing pair writes on sticky notes any service that would break (for example OSPF adjacencies drop) and any source that is too broad.",
    "Original pairs fix their filters and write the exact commit and verification commands they would use, including `commit confirmed`.",
    "The teacher calls on two pairs to share the most important missing term they found."
   ]
  },
  "discussion": [
   "Why is filtering at lo0 more efficient and less error-prone than placing RE protection on every physical interface?",
   "How would you decide between an input filter on one interface and an output filter on another to protect a server segment?"
  ],
  "exit": [
   [
    "Write the command to apply filter PROTECT-RE to IPv4 traffic destined to the Routing Engine.",
    "`set interfaces lo0 unit 0 family inet filter input PROTECT-RE`."
   ],
   [
    "Does an lo0 input filter affect traffic forwarded from ge-0/0/0 to ge-0/0/1?",
    "No. It inspects only host-bound traffic, not transit traffic."
   ],
   [
    "After applying an lo0 filter, NTP stops synchronizing. What is the likely cause and fix?",
    "The filter has no term permitting NTP from the time servers, so the replies hit the implicit discard; add an NTP term."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed PROTECT-RE filter with the SSH and final discard terms written, and have students add only the routing protocol and NTP terms using a reference list of port and protocol names.",
   "Extend: Ask students to add the IPv6 equivalent of their lo0 filter and to explain how they would use `apply-path` to keep the BGP peer list current as neighbors change."
  ]
 },
 {
  "t": "Unicast reverse path forwarding (uRPF) checks: strict and loose",
  "objectives": [
   "Students will be able to explain how uRPF uses a source-address lookup in the forwarding table to drop spoofed packets.",
   "Students will be able to compare strict and loose modes and choose the right mode for single-homed and multihomed interfaces.",
   "Students will be able to configure `rpf-check`, `mode loose` and `fail-filter` on a Junos interface.",
   "Students will be able to diagnose false drops caused by asymmetric routing and apply the feasible-paths option or a fail filter."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about forged return addresses. Collect answers about how a router could tell a packet's source is fake."
   ],
   [
    12,
    "Teach",
    "Draw a router with three interfaces and a small forwarding table. Walk two packets through strict mode: one legitimate, one spoofed. Repeat in loose mode. Then draw a multihomed customer with asymmetric paths and show strict mode dropping valid traffic. Present the three configuration lines and feasible paths."
   ],
   [
    18,
    "Activity",
    "Run the forwarding-table packet check activity described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A letter arrives with a return address in another country, but it was dropped into your neighborhood mailbox. What could you check to decide whether the return address is believable?",
  "activity": {
   "title": "Pass or drop: checking sources against the table",
   "materials": "Printed forwarding table (about eight routes with outgoing interfaces, including a default route on one version), printed packet cards listing arrival interface and source address, whiteboard.",
   "steps": [
    "In pairs, students take the forwarding table without a default route and ten packet cards.",
    "For each packet, pairs decide pass or drop under strict mode, writing the route they looked up and its interface.",
    "Pairs repeat the decisions under loose mode and mark packets whose result changed.",
    "The teacher hands out the second table, which adds a default route. Pairs redo loose mode and note how many spoofed packets now pass.",
    "Pairs pick the right mode for three interface descriptions (single-homed customer, dual-homed customer, upstream provider) and justify each choice in one sentence."
   ]
  },
  "discussion": [
   "Why is it more effective to apply uRPF at the edge of the network than in the core?",
   "What trade-off does an operator make when choosing loose mode on an upstream link, and how could they compensate?"
  ],
  "exit": [
   [
    "A packet arrives on ge-0/0/1 with a source whose route points out ge-0/0/2. Does it pass strict uRPF? Loose uRPF?",
    "It fails strict mode because the arrival interface differs; it passes loose mode because a route to the source exists."
   ],
   [
    "Write the statement to enable loose uRPF for IPv4 on ge-0/0/2 unit 0.",
    "`set interfaces ge-0/0/2 unit 0 family inet rpf-check mode loose`."
   ],
   [
    "New DHCP clients fail after strict uRPF is enabled. What option lets you make an exception?",
    "A `fail-filter` that accepts DHCP requests from 0.0.0.0 among the packets that fail the check."
   ]
  ],
  "differentiation": [
   "Support: Give students a forwarding table with only four routes and a two-question flowchart (is there a route to the source, and does it use the arrival interface) to follow for each packet.",
   "Extend: Ask students to explain in writing how the feasible-paths option changes the strict-mode decision for a multihomed BGP customer, and to design a fail filter that counts and logs failures while still permitting DHCP."
  ]
 }
]);
