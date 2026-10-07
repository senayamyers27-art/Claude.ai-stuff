/* Lessons for Juniper Networks Certified Associate, Junos (JNCIA-Junos) (JN0-106): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("jncia-junos", [
 {
  "t": "Collision domains and broadcast domains, and how switches and routers divide them",
  "hook": "It is a quiet Thursday at Pinecrest Veterinary Clinics until the front desk calls: the check-in system freezes every few minutes, and the X-ray workstation takes forever to save images. You walk into the back closet and find the answer half-buried under a box of gauze: an old unmanaged hub that someone used to add three extra ports, daisy-chained off the main switch. Meanwhile your manager wants to put the new guest Wi-Fi on the same flat network as the clinic PCs to save time. Two different problems, two different kinds of domain. Which device fixes which problem, and how do you count the domains when the exam hands you a diagram full of hubs, switches and routers?",
  "simple": "Picture devices on a network as people in rooms. A collision domain is a group of devices that have to take turns talking, because if two talk at once their words crash together and both must repeat themselves. Old hubs put everyone in one big room, so collisions were common. A switch gives every port its own private line, so collisions basically disappear. A broadcast domain is the group of devices that all hear an announcement shouted to everyone, like an intercom message. A switch passes those announcements to every port, so all its ports hear them. A router acts like a wall between buildings: announcements stop at the router. VLANs, which are virtual groups on a switch, also act like walls.",
  "body": [
   "Two ideas explain a lot about how Ethernet networks behave as they grow: the collision domain and the broadcast domain. A collision domain is the set of devices whose transmissions can collide with each other on a shared medium. A broadcast domain is the set of devices that all receive a Layer 2 broadcast frame, one sent to the destination MAC (media access control) address ff:ff:ff:ff:ff:ff, when any one of them sends it. The JNCIA-Junos exam expects you to know which devices split which domain, why that matters for performance, and how to count both kinds of domain in a diagram.",
   "Collisions come from the early days of Ethernet, when every station shared one coaxial cable or was connected through a hub. A hub is a Layer 1 repeater: whatever electrical signal arrives on one port is copied out every other port, with no idea of addresses at all. That means only one device can transmit at a time. If two send at once, the signals collide, both stations detect the garbled result, stop, wait a random backoff time and try again. That access method is CSMA/CD (carrier sense multiple access with collision detection), and it only applies to half-duplex links, where a device can either send or receive but not both at once. Every port on a hub is in the same collision domain, so each device you add means more collisions, more backoff waiting and less usable bandwidth for everyone.",
   "A switch fixes the collision problem. Each switch port is its own collision domain, because the switch receives a whole frame, buffers it in memory and forwards it only where it needs to go based on the destination MAC address. Two devices on different ports can transmit at the same moment without interfering. When a port runs full duplex, which is normal today on every modern switch and network interface card, the device can send and receive at the same time over separate wire pairs or fiber strands, and collisions cannot happen at all. So a 24-port switch creates 24 collision domains. On a Junos device you can confirm the duplex setting with `show interfaces ge-0/0/1` and look for the link mode line; a half-duplex link on a modern network usually points to an autonegotiation problem.",
   "A switch does not, however, stop broadcasts. By default it floods a broadcast frame out every port in the same VLAN (virtual LAN) except the one it came in on. All those ports together form one broadcast domain. Broadcasts are necessary: ARP (Address Resolution Protocol) requests and DHCP (Dynamic Host Configuration Protocol) discovery messages use them, and so do some older protocols. But every host that receives a broadcast must stop and process it, at least far enough to decide it can be ignored. In a very large flat network, broadcasts consume bandwidth on every link and CPU time on every host, and a single misbehaving device or a Layer 2 loop can turn that into a broadcast storm that takes the whole segment down.",
   "VLANs are the switch's answer to this. A VLAN is a logical Layer 2 segment, and each VLAN is its own broadcast domain. If ports 1 to 12 are in a Staff VLAN and ports 13 to 24 are in a Guest VLAN, a broadcast from a guest laptop is flooded only to the other guest ports. One physical switch now contains two broadcast domains, and devices in different VLANs cannot reach each other at Layer 2 at all. On Junos switches you would see this in the configuration under the `vlans` hierarchy, with interfaces assigned using `family ethernet-switching vlan members`.",
   "A router divides broadcast domains by its very nature. It does not forward Layer 2 broadcasts from one interface to another, so each router interface, or each logical unit on Junos such as `ge-0/0/0.0` and `ge-0/0/0.100`, sits in a different broadcast domain and a different IP subnet. Traffic between broadcast domains must be routed, either by a router or by a Layer 3 switch using an IRB (integrated routing and bridging) interface, which acts as the default gateway for a VLAN. This is why VLANs and subnets usually line up one to one: each VLAN is a broadcast domain, and each broadcast domain gets its own subnet.",
   "Router interfaces also separate collision domains, just as switch ports do, because each interface is its own point-to-point or switched segment. So a router splits both kinds of domain, a switch splits only collision domains (unless you add VLANs), and a hub splits neither. Bridges, the older two- or four-port ancestors of switches, behave like switches: they split collision domains but forward broadcasts.",
   "A handy summary to carry into the exam: hubs split nothing, switches split collision domains, VLANs and routers split broadcast domains. When you count domains in an exam diagram, work methodically. For collision domains, count each switch port and each router interface that has something connected to it as a separate domain, and treat a hub plus everything plugged into it as a single domain. For broadcast domains, count each router interface (or each VLAN, if the diagram shows them) as a separate domain, and remember that everything on one switch in one VLAN, including any hubs hanging off it, is one broadcast domain. Drawing a quick circle around each domain on your scratch paper is the fastest way to avoid miscounting."
  ],
  "analogy": "Think of an office building. A hub is an open-plan room with one conversation allowed at a time: if two people talk, nobody understands either. A switch gives everyone a private phone line, so conversations never clash, but the building intercom still reaches every desk. A VLAN is like wiring the intercom separately for each floor, and a router is the wall between two buildings that the intercom cannot cross. The analogy stops working at full duplex: on a real full-duplex link, both ends can talk and listen at the very same time.",
  "terms": [
   [
    "Collision domain",
    "A network segment where simultaneous transmissions can collide; each switch or router port is its own collision domain, while a hub and all its ports form one."
   ],
   [
    "Broadcast domain",
    "The set of devices that receive a Layer 2 broadcast from any member; bounded by routers and by VLANs."
   ],
   [
    "CSMA/CD",
    "Carrier sense multiple access with collision detection, the half-duplex Ethernet method of listening before sending, detecting collisions and backing off for a random time."
   ],
   [
    "Full duplex",
    "A link mode where a device can send and receive at the same time, which removes collisions entirely."
   ],
   [
    "VLAN",
    "Virtual LAN: a logical Layer 2 segment on a switch; each VLAN is a separate broadcast domain."
   ],
   [
    "IRB interface",
    "Integrated routing and bridging: a Layer 3 interface on a Junos switch or router that routes traffic for a VLAN, acting as its gateway."
   ]
  ],
  "example": "An office has 40 PCs on two 24-port EX switches in one VLAN, with an SRX firewall as the gateway. There are about 48 collision domains (one per used switch port, including the uplinks) but only one broadcast domain on the LAN side. When the team splits users into a Staff VLAN and a Guest VLAN, the switches now carry two broadcast domains, and the SRX (or an IRB interface on the EX) must route between them. A broadcast from a guest laptop no longer reaches the staff PCs.",
  "mistakes": [
   [
    "A switch reduces broadcast traffic because it forwards frames only where they need to go.",
    "Switches forward known unicast frames selectively, but they flood broadcasts out every port in the VLAN. Only VLANs or routers shrink a broadcast domain."
   ],
   [
    "A hub creates one collision domain per port, just like a switch.",
    "A hub repeats every signal to every port, so the hub and everything on it share a single collision domain."
   ],
   [
    "Each switch port is its own broadcast domain.",
    "Each switch port is its own collision domain. All ports in the same VLAN share one broadcast domain."
   ],
   [
    "Collisions are still a normal part of modern Ethernet.",
    "On full-duplex switched links collisions cannot occur. Seeing collision counters climb today usually means a duplex mismatch or a half-duplex link that should not be there."
   ]
  ],
  "tryit": [
   [
    "A diagram shows a router with two interfaces. Interface A connects to a switch with 6 PCs plus the router link (all one VLAN). Interface B connects to a hub with 4 PCs. How many collision domains and broadcast domains are there?",
    "Broadcast domains: 2, one per router interface. Collision domains: the switch has 7 used ports (6 PCs plus the router link), giving 7, and the hub with its 4 PCs and router link is 1 more, for a total of 8."
   ],
   [
    "A school wants to keep student laptops from receiving broadcasts sent by administrative PCs, but has only one switch and no budget for another. What should you recommend?",
    "Create two VLANs on the switch, one for students and one for administration. Each VLAN is a separate broadcast domain, and a router or IRB interface can route between them if any traffic must cross."
   ]
  ],
  "tip": "Watch for questions that mix hubs, switches and routers in one diagram. A hub adds no collision domains; a switch adds one per port but none for broadcasts; a router adds a broadcast domain per interface. VLANs also create broadcast domains inside a single switch.",
  "check": [
   [
    "How many broadcast domains does a single switch with all ports in the default VLAN create?",
    "One. A switch floods broadcasts out every port in the same VLAN, so without extra VLANs the whole switch is one broadcast domain."
   ],
   [
    "Why can collisions not occur on a full-duplex switch port?",
    "Because the device and the switch port each have a dedicated path to send and receive at the same time, so there is no shared medium for signals to collide on."
   ],
   [
    "What device or feature do you need to separate broadcast domains?",
    "A router (or Layer 3 interface such as an IRB) or VLANs; each router interface and each VLAN is its own broadcast domain."
   ],
   [
    "A 16-port hub has 10 devices attached. How many collision domains does it form?",
    "One. A hub repeats all signals to every port, so all attached devices share a single collision domain."
   ]
  ]
 },
 {
  "t": "What routers and switches do: Layer 2 frame forwarding vs Layer 3 packet forwarding",
  "hook": "Devon, a new junior engineer at Lakeshore Freight, has two packet captures open side by side and a puzzled look. Both captures show the same ping from a dispatcher's PC to the warehouse server, one taken on the office LAN and one taken just past the gateway router. The IP addresses match perfectly in both. The MAC addresses do not match at all. Devon is sure the router is corrupting traffic and wants to open a support case. You glance at the screens and realize the router is doing exactly what it should. What changed between the two captures, what stayed the same, and why does the difference between a frame and a packet explain everything?",
  "simple": "A switch and a router both pass traffic along, but they read different labels. A switch works inside one local network and reads the hardware address burned into each device, called a MAC address, a bit like a name tag. It keeps a list of which name tag is on which port. A router connects different networks and reads the IP address, which is more like a full mailing address with a city and street. It keeps a list of which networks are reachable which way. Think of a mail carrier on one street (the switch) versus a regional sorting center (the router). When a letter moves between cities, it gets a new envelope at each sorting center, but the final address on the letter inside stays the same.",
  "body": [
   "Switches and routers both move traffic, but they make decisions using different information at different layers. A switch forwards Ethernet frames within a single network using MAC (media access control) addresses, which belong to Layer 2 of the OSI (Open Systems Interconnection) model. A router forwards IP packets between networks using IP addresses, which belong to Layer 3. Understanding that split is the foundation for everything else you will configure on Junos devices, from interface families to routing tables.",
   "Start with the switch. A Layer 2 switch keeps a table that maps MAC addresses to ports, called the MAC table or, on Junos, the Ethernet switching table, which you view with `show ethernet-switching table`. Each entry lists the VLAN, the MAC address, how it was learned and the interface. When a frame arrives, the switch looks up the destination MAC address. If it knows the port, it forwards the frame out that port only. If it does not, or if the frame is a broadcast, it floods the frame to all ports in the VLAN except the one it arrived on. Importantly, the frame itself is not changed: the source and destination MAC addresses stay the same from one end of the switched network to the other. The switch is transparent to the hosts.",
   "Now the router. A router keeps a routing table of destination prefixes, such as 10.1.2.0/24, and the next hop or outgoing interface for each. On Junos the main IPv4 table is `inet.0`, viewed with `show route`. When a packet arrives, the router first strips the incoming Layer 2 header, because that header only described the hop from the previous device. It reads the destination IP address and finds the longest, meaning most specific, matching prefix. It decrements the TTL (time to live) field by one and discards the packet if the TTL reaches zero, which stops packets from looping forever. Then it builds a brand-new Layer 2 header for the outgoing link, with its own MAC address as the source and the next hop's MAC address as the destination.",
   "That rewrite is the key exam fact. At each routed hop the MAC addresses change, while the source and destination IP addresses stay the same end to end, assuming no NAT (network address translation) is in the path. Layer 2 addresses describe the current hop; Layer 3 addresses describe the whole journey. So a packet capture on the LAN shows the PC's MAC sending to the router's MAC, and a capture on the far side shows the router's outgoing MAC sending to the server's MAC, with identical IP addresses in both.",
   "The two devices also treat unknown destinations differently, and this reflects their different assumptions. A switch floods frames for unknown destination MACs, because it assumes the device is somewhere on this local network and will reply soon, letting the switch learn its port. A router drops packets for destinations it has no route to, unless it has a default route (0.0.0.0/0) to fall back on, and it can send an ICMP (Internet Control Message Protocol) destination-unreachable message back to the source. Flooding across the internet would be disastrous, so routers are conservative. Routers also do not forward broadcasts between interfaces, which is why they bound broadcast domains.",
   "In practice, many modern devices do both jobs. Juniper EX and QFX switches switch frames in hardware within a VLAN and route between VLANs using IRB (integrated routing and bridging) interfaces. MX routers can also bridge. On Junos the distinction shows up directly in the configuration. `family ethernet-switching` on an interface unit means that unit participates in Layer 2 switching, while `family inet` with an address means it is a Layer 3 routed interface. For example, `set interfaces ge-0/0/2 unit 0 family inet address 10.1.1.1/24` makes ge-0/0/2 a routed port, and `set interfaces ge-0/0/3 unit 0 family ethernet-switching vlan members STAFF` makes ge-0/0/3 a switched access port.",
   "It helps to look at the scale of each table, too. A switching table holds individual host MAC addresses, so it grows with the number of devices on the local network. A routing table holds prefixes, so a single entry like 10.2.0.0/16 can represent tens of thousands of hosts. That summarization is part of why routing scales to the internet while flat Layer 2 networks do not.",
   "For the exam, remember the two sets of keywords. Layer 2: frames, MAC addresses, flooding, learning and the Ethernet switching table. Layer 3: packets, IP addresses, longest-prefix match, TTL, next hops and the routing table. If a question asks what a device does with traffic, decide first whether it is acting as a switch or a router, then apply the matching behavior."
  ],
  "analogy": "A switch is like a receptionist in one office building who knows which desk each employee sits at and walks each memo straight there, without changing the envelope. A router is like a postal sorting center between cities: it reads the destination city, picks the next truck, and puts the letter in a fresh outer envelope addressed to the next sorting center, while the letter inside keeps its original addresses. The analogy breaks slightly because a router also lowers the TTL each hop, like a stamp that counts how many sorting centers the letter has passed through.",
  "terms": [
   [
    "Frame",
    "A Layer 2 unit of data with a header containing source and destination MAC addresses and a trailer with an error check."
   ],
   [
    "Packet",
    "A Layer 3 unit of data with a header containing source and destination IP addresses and a TTL."
   ],
   [
    "Ethernet switching table",
    "The Junos table mapping learned MAC addresses to interfaces and VLANs, shown with `show ethernet-switching table`."
   ],
   [
    "Routing table",
    "A table of destination prefixes and next hops; on Junos the IPv4 unicast table is inet.0."
   ],
   [
    "Longest-prefix match",
    "The rule that a router uses the most specific matching route when several prefixes contain the destination."
   ],
   [
    "TTL",
    "Time to live: an IP header field decremented by one at each router; the packet is discarded when it reaches zero."
   ]
  ],
  "example": "A PC at 10.1.1.10 pings a server at 10.2.2.20. The PC's frame goes through an EX switch unchanged to the gateway router. The router matches 10.2.2.0/24, lowers the TTL by one, rewrites the Ethernet header with its own MAC as source and the server's MAC as destination, and sends it out. A packet capture on each side shows the same IP addresses but different MAC addresses.",
  "mistakes": [
   [
    "A router changes the destination IP address to the next hop's address.",
    "The destination IP stays the same end to end (ignoring NAT). The router only uses the next hop to choose the new destination MAC address."
   ],
   [
    "A switch rewrites the source MAC address to its own MAC when forwarding.",
    "A Layer 2 switch forwards frames unchanged; the original source and destination MACs are preserved across the switched network."
   ],
   [
    "A router floods packets for unknown destinations just like a switch does.",
    "A router drops packets with no matching route (unless a default route exists) and may send ICMP destination unreachable. Flooding is a Layer 2 behavior."
   ],
   [
    "Routers pick the route with the shortest prefix because it covers more addresses.",
    "Routers use the longest, most specific matching prefix. A /24 beats a /16 for an address both contain."
   ]
  ],
  "tryit": [
   [
    "A router has routes for 10.0.0.0/8, 10.2.0.0/16 and 10.2.2.0/24, plus a default route. A packet arrives for 10.2.2.20. Which route is used, and what happens to its TTL and MAC addresses?",
    "The 10.2.2.0/24 route, because it is the longest matching prefix. The router decrements the TTL by one and builds a new Ethernet header with its own MAC as source and the next hop's (or the destination host's) MAC as destination."
   ],
   [
    "A new EX switch port is configured with `family inet address 10.5.5.1/24` instead of `family ethernet-switching`. A user plugs a PC into it and expects to be in the STAFF VLAN. What is happening?",
    "The port is a routed Layer 3 interface, not a switched port, so it is not a member of any VLAN. The PC is on its own subnet with the switch as its router. Reconfigure the unit with `family ethernet-switching` and the STAFF VLAN to make it an access port."
   ]
  ],
  "tip": "Exam questions like to ask what changes at each hop. In routed traffic, MAC addresses change at every router while IP addresses stay the same (ignoring NAT), and the TTL drops by one at each router.",
  "check": [
   [
    "What does a switch do with a frame whose destination MAC is not in its table?",
    "It floods the frame out every port in the same VLAN except the one it arrived on."
   ],
   [
    "What does a router do with a packet when it has no matching route and no default route?",
    "It drops the packet and may send an ICMP destination-unreachable message to the source."
   ],
   [
    "Which header fields does a router rewrite when forwarding a packet?",
    "It builds a new Layer 2 header (new source and destination MAC) and decrements the IP TTL; the source and destination IP addresses stay the same."
   ],
   [
    "On Junos, which interface family makes a unit a Layer 3 routed interface?",
    "`family inet` (or `family inet6` for IPv6) with an address; `family ethernet-switching` makes it a Layer 2 switched port."
   ]
  ]
 },
 {
  "t": "Ethernet frames, MAC addresses (48 bits, OUI) and the MAC learning/flooding process",
  "hook": "At Brightwater Public Library, Priya on the IT team installs a new badge printer for the staff room and plugs it into port ge-0/0/12 on the EX switch. It gets power, the status light goes green, but nobody can print to it. She runs `show ethernet-switching table` and searches for the printer's MAC address, printed on a sticker on the back. It is nowhere in the table. Meanwhile a colleague insists the switch must be broken, because every other device shows up. Is the switch faulty, or is it waiting for something from the printer? And while she is looking, what do all those other fields in an Ethernet frame actually mean?",
  "simple": "Every network card has a hardware address called a MAC address, made of 12 letters and numbers like 00:05:86:71:2a:c0. The first half says which company made the card; the second half is a serial number the company assigns. Data on a local network travels in packages called frames, and each frame is labeled with who sent it and who should get it. A switch learns where devices are by reading the sender label on frames as they arrive, a bit like a teacher learning seats by noticing who raises a hand from where. If the switch does not yet know where someone sits, it sends the frame to everyone and waits for a reply. A device that never speaks never gets learned.",
  "body": [
   "Ethernet is the Layer 2 technology on almost every LAN (local area network) you will touch, from a home router to a data center switch fabric. Data is carried in frames, and every frame names its sender and receiver with MAC (media access control) addresses. Knowing the frame layout and how switches learn addresses helps you read `show ethernet-switching table` output, interpret interface error counters and troubleshoot why traffic is or is not reaching a host.",
   "Here is the Ethernet II frame from front to back. It starts with a preamble and start-of-frame delimiter that let the receiver synchronize its clock to the incoming bits. Then comes the destination MAC address (6 bytes), followed by the source MAC address (6 bytes). Notice the destination comes first, so a switch can begin its lookup as early as possible. Next is a 2-byte EtherType that says what protocol is inside, for example 0x0800 for IPv4, 0x86DD for IPv6 and 0x0806 for ARP (Address Resolution Protocol). If the frame carries an 802.1Q VLAN tag, a 4-byte tag sits between the source MAC and the EtherType, holding the VLAN ID and the 802.1p priority bits. Next comes the payload, normally up to 1500 bytes, and finally a 4-byte FCS (frame check sequence), a CRC (cyclic redundancy check) the receiver recalculates to detect corruption. Frames that fail the check are dropped, and on Junos they show up as input errors or CRC errors in `show interfaces extensive`.",
   "A MAC address is 48 bits long, usually written as 12 hexadecimal digits such as `00:05:86:71:2a:c0`. Junos displays them with colons; other systems may use dashes or dots, but the value is the same. The first 24 bits are the OUI (organizationally unique identifier), which the IEEE (Institute of Electrical and Electronics Engineers) assigns to a manufacturer. The last 24 bits are assigned by that manufacturer to each interface it builds. That is why you can often guess a device's vendor from the first half of its MAC, which is handy when hunting an unknown device in a switching table.",
   "Two bits in the first byte have special meanings. The least significant bit of the first byte is the individual/group bit: when it is set to 1, the address is a group (multicast) address rather than a single interface. The next bit is the universal/local bit: when set, the address is locally administered, meaning someone assigned it by software rather than using the burned-in value. The all-ones address ff:ff:ff:ff:ff:ff is the broadcast address, delivered to every device in the broadcast domain.",
   "Switches learn MAC addresses automatically, with no configuration. The process has a clear order. When a frame arrives, the switch first reads the source MAC address and records it against the incoming port and VLAN, creating or refreshing an entry. Then it looks at the destination MAC address. If the destination is known and lives on a different port, the frame goes out that one port only. If the destination is known and lives on the same port the frame came in on, the frame is filtered, meaning dropped, because the receiver already heard it on that segment. If the destination is unknown, a broadcast, or by default a multicast (unless a feature such as IGMP snooping limits it), the switch floods it out every other port in the VLAN. When the unknown host replies, its source MAC is learned, and future frames to it are forwarded directly instead of flooded.",
   "Learned entries do not last forever. They age out if the switch stops seeing traffic from that address, so the table stays current when devices move between ports or are unplugged. On many Junos switches the default aging time is 300 seconds. You can view the table with `show ethernet-switching table`, filter it by interface or VLAN, and clear dynamic entries with `clear ethernet-switching table` to force relearning, for example after recabling a closet.",
   "One consequence of source-based learning trips people up. Because learning is based only on source addresses, a device that never transmits is never learned, and traffic to it keeps being flooded. Most devices send something soon after connecting, such as a DHCP (Dynamic Host Configuration Protocol) request or a gratuitous ARP, so in practice they appear quickly. But a silent device, or one with a misconfigured network stack, can stay invisible in the table, which is a useful clue when troubleshooting.",
   "For the exam, keep the direction straight: learn from the source, forward based on the destination. Know that a MAC address is 48 bits with a 24-bit OUI, that the broadcast address is all ones, and that the FCS detects errors but does not correct them."
  ],
  "analogy": "A switch learning MAC addresses is like a new mail clerk in an apartment building. Each time a resident drops off outgoing mail, the clerk notes their name and mailbox number from the return address. When a letter arrives for someone the clerk has never seen, the clerk slips a copy under every door. Once that person sends something, the clerk knows their box. The analogy stops working on timing: a real switch forgets entries after a few minutes of silence, while a clerk usually remembers.",
  "terms": [
   [
    "MAC address",
    "A 48-bit Layer 2 hardware address, written as 12 hexadecimal digits, that identifies a network interface."
   ],
   [
    "OUI",
    "Organizationally unique identifier: the first 24 bits of a MAC address, assigned by the IEEE to identify the manufacturer."
   ],
   [
    "EtherType",
    "The 2-byte field that identifies the payload protocol, such as 0x0800 for IPv4, 0x86DD for IPv6 or 0x0806 for ARP."
   ],
   [
    "FCS",
    "Frame check sequence: a CRC at the end of the frame used to detect transmission errors; failed frames are dropped."
   ],
   [
    "Flooding",
    "Sending a frame out all ports in the VLAN except the ingress port, used for broadcasts and unknown destinations."
   ],
   [
    "MAC aging",
    "Removal of a learned entry after a period with no frames from that source; often 300 seconds by default on Junos switches."
   ]
  ],
  "example": "You plug a new printer into port ge-0/0/12 of an EX switch. Until the printer sends anything, `show ethernet-switching table` has no entry for it and frames to its MAC are flooded. As soon as it sends a DHCP request, the switch records its MAC against ge-0/0/12 in that VLAN, and later print jobs go only to that port. The first three bytes of its MAC match the printer vendor's OUI, which confirms you found the right entry.",
  "mistakes": [
   [
    "Switches learn MAC addresses from the destination field of incoming frames.",
    "Switches learn from the source MAC address and use the destination MAC to decide where to forward."
   ],
   [
    "The FCS lets the receiver fix corrupted bits.",
    "The FCS only detects errors. A frame that fails the check is dropped and counted as an error; recovery, if any, is up to higher layers such as TCP."
   ],
   [
    "The OUI is the last 24 bits of a MAC address.",
    "The OUI is the first 24 bits and identifies the manufacturer; the last 24 bits are assigned by the manufacturer."
   ],
   [
    "An empty switching-table entry for a device means the switch port is broken.",
    "It often just means the device has not transmitted yet. Learning only happens when the switch sees a frame with that source MAC."
   ]
  ],
  "tryit": [
   [
    "A switch has learned PC-A on ge-0/0/1 and PC-B on ge-0/0/2, both in VLAN 10. PC-A sends a frame to PC-C, which has never transmitted. What does the switch do, and what changes when PC-C replies?",
    "It refreshes PC-A's entry on ge-0/0/1, then floods the frame out every other port in VLAN 10 because PC-C is unknown. When PC-C replies, the switch learns PC-C's MAC on its port, and later frames to PC-C go only out that port."
   ],
   [
    "You see a MAC address of 01:00:5e:00:00:05 in a capture. Is it a single device's address, and how can you tell?",
    "No. The least significant bit of the first byte (01) is set, which marks it as a group (multicast) address rather than an individual interface."
   ]
  ],
  "tip": "Switches learn from the source MAC and forward based on the destination MAC. Questions often try to swap these two, or to swap the positions of the OUI and the vendor-assigned half.",
  "check": [
   [
    "How many bits is a MAC address and what do the first 24 bits represent?",
    "48 bits; the first 24 bits are the OUI, which identifies the vendor that made the interface."
   ],
   [
    "Which field of an incoming frame does a switch use to populate its MAC table?",
    "The source MAC address, recorded against the ingress port and VLAN."
   ],
   [
    "Why might traffic to a silent device keep being flooded?",
    "Because the switch never sees a frame with that device's MAC as the source, so it never learns the port and treats the destination as unknown."
   ],
   [
    "What does an EtherType of 0x0806 indicate?",
    "The frame carries an ARP message."
   ]
  ]
 },
 {
  "t": "ARP: resolving an IPv4 next hop to a MAC address; gratuitous ARP; `show arp`",
  "hook": "It is 11 p.m. at Copperline Manufacturing and Rosa, the network engineer on call, has just brought up a new point-to-point link between two Junos routers. Interfaces are up, addresses look right, yet the first ping across the link times out before the rest succeed. An hour later, during a planned failover test, the backup gateway takes over and half the plant floor loses connectivity for a few seconds before recovering on its own. Her manager asks for an explanation in plain words by morning. Both mysteries trace back to one small protocol that quietly runs every time an IPv4 packet leaves an Ethernet interface. What is it doing, and how can Rosa see it?",
  "simple": "On a local network, devices know each other's IP addresses, but to actually deliver data over Ethernet they also need the hardware address, the MAC address. ARP is how they find it. It works like calling out in a crowded room: 'Whoever has IP 10.0.0.2, please tell me your hardware address.' Everyone hears the question, but only the right device answers, directly to the asker. The asker writes the answer in a little address book called the ARP cache, so it does not have to shout again for a while. Sometimes a device announces its own address without being asked, called gratuitous ARP, like a new neighbor introducing themselves so everyone updates their notes.",
  "body": [
   "IP addresses tell a device where a packet is going, but on an Ethernet link the frame still needs a destination MAC (media access control) address before it can be sent. ARP (Address Resolution Protocol) bridges that gap for IPv4. Every time a Junos router sends a packet out an Ethernet interface to a next hop, it needs that next hop's MAC address, and ARP is how it gets it. IPv6 does not use ARP; it uses neighbor discovery instead, which you will meet separately.",
   "The process uses two messages. First, the sender checks its ARP cache for an existing mapping. If there is no entry, it broadcasts an ARP request to ff:ff:ff:ff:ff:ff asking, in effect, 'who has 10.0.0.2? tell 10.0.0.1'. The request carries the sender's own IP and MAC address, so the target already has what it needs to reply. Every host in the broadcast domain receives the request, but only the owner of 10.0.0.2 answers, with a unicast ARP reply containing its MAC address. The sender stores the mapping in its ARP cache and sends the waiting packet. The target usually also caches the requester's mapping, since it will almost certainly need to send a reply. This small exchange is why the very first ping across a fresh link sometimes times out or takes longer while the rest succeed.",
   "A key point that shows up on exams: a host or router only ARPs for addresses on its own subnet. If the final destination is on another network, the sender ARPs for the next hop, which for an end host is its default gateway, not for the far-away destination. The router then repeats the process on its outgoing link for its own next hop. That is why a wrong default gateway or a wrong subnet mask shows up as missing or incorrect ARP entries: a host with the wrong mask may believe a remote address is local and ARP for it, getting no answer.",
   "Gratuitous ARP is an ARP message a device sends about its own address without being asked, typically a request or reply where the sender IP and target IP are the same. Devices send it when an interface comes up or an address changes, for three main reasons. First, to detect a duplicate IP address: if anyone answers, the address is already in use. Second, to update other hosts' caches after a MAC change, such as a replaced network card. Third, to announce a new active device after a failover, for example when a VRRP (Virtual Router Redundancy Protocol) backup takes over a virtual IP address and must tell hosts and switches where that address now lives. If those caches are not updated quickly, traffic keeps going to the old device for a short time, which is one cause of brief outages during failover.",
   "ARP's simplicity is also its weakness. ARP has no authentication, so any device can send unsolicited replies claiming to own an address. Attackers can abuse this to poison caches and place themselves in the traffic path. Recognizing this risk matters for defense: switch features such as dynamic ARP inspection validate ARP messages against trusted bindings, and watching for sudden changes in the MAC address associated with a gateway IP is a classic detection technique.",
   "On Junos, operational mode commands let you inspect and manage the cache. `show arp` lists entries with MAC address, IP address, name and interface. `show arp no-resolve` skips reverse DNS (Domain Name System) lookups, which makes output faster and avoids long pauses when DNS is unreachable, a common situation in labs or during outages. `show arp interface ge-0/0/0.0` narrows the view to one interface, and `clear arp` removes dynamic entries so they are relearned, which is useful after replacing hardware. Junos ages dynamic ARP entries out after a timer, 20 minutes by default, which you can change with the `aging-timer` statement under `[edit system arp]`.",
   "```\nuser@r1> show arp no-resolve\nMAC Address       Address         Interface      Flags\n2c:6b:f5:10:22:01 10.0.12.2       ge-0/0/0.0     none\n```",
   "Reading that output, you can confirm Layer 2 reachability to the neighbor: r1 has resolved 10.0.12.2 to a MAC on ge-0/0/0.0. If a ping fails and there is no ARP entry for the next hop, the problem is at Layer 1 or Layer 2, or the addressing is wrong. If the entry exists but pings still fail, look higher, for example at firewall filters or the remote routing table."
  ],
  "analogy": "ARP is like arriving at a party where you know a guest's name but not their face. You ask loudly, 'Is Sam here?' Everyone hears, only Sam waves back, and you remember Sam's face for the rest of the evening. Gratuitous ARP is Sam walking in and saying, 'Hi, I am Sam,' so everyone updates their memory. The analogy stops at trust: at a party you might notice an impostor, but ARP believes any answer, which is why cache poisoning is possible.",
  "terms": [
   [
    "ARP",
    "Address Resolution Protocol: maps an IPv4 address to a MAC address on the local link using a broadcast request and a unicast reply."
   ],
   [
    "ARP cache",
    "The table of learned IP-to-MAC mappings, shown on Junos with `show arp`; dynamic entries age out (20 minutes by default on Junos)."
   ],
   [
    "Gratuitous ARP",
    "An unsolicited ARP about the sender's own IP, used for duplicate address detection and to update neighbors' caches, for example after failover."
   ],
   [
    "no-resolve",
    "A Junos output option that stops the command from doing reverse DNS lookups on addresses."
   ],
   [
    "VRRP",
    "Virtual Router Redundancy Protocol: lets routers share a virtual gateway IP; the new master sends gratuitous ARP after taking over."
   ]
  ],
  "example": "After configuring 10.0.12.1/30 on r1 and 10.0.12.2/30 on r2, you ping r2 from r1. The first ping may be slightly slower while ARP runs. Afterward, `show arp no-resolve` on r1 shows r2's MAC against 10.0.12.2 on ge-0/0/0.0, and r2 shows r1's entry too, proving Layer 2 reachability across the link.",
  "mistakes": [
   [
    "A host ARPs for the IP address of the remote server it wants to reach.",
    "If the server is on another subnet, the host ARPs for its default gateway's IP. It only ARPs for addresses it believes are on its own subnet."
   ],
   [
    "ARP replies are broadcast so everyone can learn the mapping.",
    "ARP requests are broadcast; replies are normally unicast back to the requester. Gratuitous ARP is the case where a device announces its own mapping to everyone."
   ],
   [
    "ARP is used for IPv6 too.",
    "IPv6 uses neighbor discovery (ICMPv6 neighbor solicitation and advertisement), viewed on Junos with `show ipv6 neighbors`."
   ],
   [
    "`show arp no-resolve` shows only unresolved entries.",
    "It shows the same entries but skips reverse DNS name lookups, so output is faster."
   ]
  ],
  "tryit": [
   [
    "A PC at 192.168.5.20 was accidentally given mask 255.255.0.0 instead of 255.255.255.0, with gateway 192.168.5.1. It tries to reach a server at 192.168.9.10 on another subnet and fails. What does ARP have to do with it?",
    "With a /16 mask, the PC thinks 192.168.9.10 is local, so it ARPs for the server directly instead of for the gateway. No one on the local segment owns that address, so there is no reply and the traffic never reaches the router. Fixing the mask makes the PC ARP for 192.168.5.1."
   ],
   [
    "During a VRRP failover test, users lose connectivity for a few seconds and then recover. Which ARP mechanism is meant to keep this gap short?",
    "Gratuitous ARP. The new master announces that the virtual IP now maps to its MAC, so switches and hosts update their tables quickly instead of waiting for old entries to age out."
   ]
  ],
  "tip": "Remember that an ARP request is a broadcast and an ARP reply is normally unicast, and that a device ARPs for its next hop, not for a remote destination. Know `show arp no-resolve` as the faster way to view the cache.",
  "check": [
   [
    "A host at 192.168.1.10/24 sends to 8.8.8.8. Whose MAC address does it ARP for?",
    "Its default gateway's, because 8.8.8.8 is not on the local subnet; the frame goes to the gateway, which routes it onward."
   ],
   [
    "Name two reasons a device sends a gratuitous ARP.",
    "To detect a duplicate IP address and to update other devices' ARP caches, for example after a failover moves a virtual IP to a new MAC."
   ],
   [
    "Why use `show arp no-resolve` instead of `show arp`?",
    "It skips reverse DNS lookups, so the output appears immediately and is not delayed when DNS is slow or unreachable."
   ],
   [
    "What Junos command removes dynamic ARP entries so they are relearned?",
    "`clear arp`."
   ]
  ]
 },
 {
  "t": "IPv4 addressing: classes, private ranges, subnet masks, CIDR prefixes and subnetting math",
  "hook": "Marcus has just joined Riverbend Health Partners as the only network person for four small clinics. His first ticket: the new pediatrics clinic opens Monday, and someone needs to carve its addresses out of the 10.20.0.0/24 block without overlapping the other three sites. A vendor's spreadsheet already lists an address for the clinic printer, 10.20.0.64, which looks suspicious. Then a technician calls asking whether 172.20.1.1 is 'one of ours or something on the internet.' Marcus has no subnet calculator on the loaner laptop, and the exam he is booked for next month will not give him one either. Can he do the math in his head, fast and correctly?",
  "simple": "An IPv4 address is a number that identifies a device on a network, written as four numbers from 0 to 255, like 192.168.1.10. Part of the address names the network, like a street, and the rest names the device, like a house number. The subnet mask, often written as a slash and a number such as /24, says where the street part ends. Some address ranges are private: anyone can use them inside a home or business, and they are never used directly on the internet, much like room numbers inside a hotel. Subnetting means splitting one block of addresses into smaller blocks, the way you might divide a long street into separate neighborhoods, each with its own first and last address reserved.",
  "body": [
   "An IPv4 address is 32 bits, written as four decimal octets separated by dots, such as 172.16.5.130. Each octet represents 8 bits and ranges from 0 to 255. Part of the address identifies the network and the rest identifies the host on that network. The subnet mask, or prefix length, says exactly where that boundary falls. You will type addresses with prefix lengths on every Junos interface, for example `set interfaces ge-0/0/0 unit 0 family inet address 172.16.5.129/26`, and Junos derives the connected subnet from it, so subnetting has to become automatic.",
   "Historically, addresses were grouped into classes by their first octet. Class A covered 1 to 126 with a default /8 mask, Class B covered 128 to 191 with /16, and Class C covered 192 to 223 with /24. Class D (224 to 239) is reserved for multicast and Class E (240 to 255) for experimental use. The 127.0.0.0/8 range, which would otherwise fall in Class A, is reserved for loopback, so 127.0.0.1 always means 'this host'. Classful addressing wasted enormous amounts of space, since an organization needing 300 addresses had to take a whole Class B of 65,536. Today we use CIDR (classless inter-domain routing), where any prefix length from /0 to /32 is allowed and routes are written as prefix/length. Classes still appear on exams as vocabulary, so know the ranges, but do not assume a /8 just because an address starts with 10.",
   "RFC 1918 reserves three private ranges that are not routed on the public internet and are usually translated to public addresses with NAT (network address translation): 10.0.0.0/8, 172.16.0.0/12 (which runs from 172.16.0.0 to 172.31.255.255) and 192.168.0.0/16. The middle one catches people out, because it is a /12, not a /16: 172.20.1.1 and 172.31.0.5 are private, but 172.32.0.1 is not. You will also meet 169.254.0.0/16, the link-local range a host assigns itself when it cannot reach a DHCP (Dynamic Host Configuration Protocol) server, so seeing a 169.254 address on a PC is a strong hint that DHCP failed.",
   "A subnet mask is a run of 1 bits followed by a run of 0 bits. /24 is 255.255.255.0, /25 is 255.255.255.128, /26 is 255.255.255.192, /27 is 255.255.255.224, /28 is 255.255.255.240, /29 is 255.255.255.248 and /30 is 255.255.255.252. Learning that sequence of last-octet values (128, 192, 224, 240, 248, 252, 254, 255) pays off on every subnetting question. For any prefix, the number of host bits is 32 minus the prefix length. A subnet contains 2 to the power of the host bits addresses, and 2 fewer usable host addresses, because the first address is the network address and the last is the broadcast address. So a /26 has 64 addresses and 62 usable hosts, a /28 has 16 addresses and 14 hosts, and a /30 has 4 addresses and 2 hosts.",
   "That /30 result is why /30 is common on router-to-router links: exactly two usable addresses, one per router. A /31 is also allowed on point-to-point links; it has no network or broadcast address, so both of its two addresses are usable, which saves space. A /32 identifies a single host, and on Junos you will see it on loopback interfaces such as `lo0.0` and as local routes in the routing table.",
   "The fastest subnetting method is the block size. Find the octet where the mask stops being 255, called the interesting octet, and subtract that mask value from 256. For /26 (mask .192) the block size is 64, so subnets start at .0, .64, .128 and .192. To find which subnet 172.16.5.130/26 belongs to, find the block that contains 130: it is the one starting at .128, because the next one starts at .192. So the network address is 172.16.5.128, the broadcast is one less than the next block, 172.16.5.191, and the usable hosts run from .129 to .190.",
   "The same method works when the interesting octet is not the last one. For 10.4.37.9/20, the mask is 255.255.240.0, the interesting octet is the third, and the block size is 256 minus 240, or 16. Blocks in the third octet start at 0, 16, 32, 48, and 37 falls in the block starting at 32. So the network is 10.4.32.0, the broadcast is 10.4.47.255, and the usable range is 10.4.32.1 to 10.4.47.254.",
   "Working the other way, you may need to split a block into smaller subnets. To divide 172.16.0.0/22 into /26 blocks, you borrow 4 bits (26 minus 22), giving 2 to the 4th, or 16 subnets of 64 addresses each, running 172.16.0.0, 172.16.0.64, 172.16.0.128, 172.16.0.192, 172.16.1.0 and so on up to 172.16.3.192. To size a subnet for a requirement, pick the smallest block whose usable count is enough: 50 hosts needs a /26 (62 usable), while 70 hosts needs a /25 (126 usable). Practice these until you can do them in your head, because the exam expects speed and accuracy without a calculator."
  ],
  "analogy": "Subnetting is like dividing a long street into blocks of houses. The block size is how many house numbers each block gets, and every block reserves its first number for the block's street sign (the network address) and its last number for the block's loudspeaker that reaches every house (the broadcast). To find a house's block, you just ask which run of numbers it falls between. The analogy stops at the edges: real house numbers do not have to be powers of two, but subnet sizes always are.",
  "terms": [
   [
    "CIDR",
    "Classless inter-domain routing: addressing with arbitrary prefix lengths written as address/length, replacing classful boundaries."
   ],
   [
    "Subnet mask",
    "A 32-bit value of contiguous 1s (network part) followed by 0s (host part), such as 255.255.255.192 for /26."
   ],
   [
    "RFC 1918 private ranges",
    "10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16, reserved for internal use and not routed on the internet."
   ],
   [
    "Network address",
    "The first address in a subnet, with all host bits set to 0, which identifies the subnet itself."
   ],
   [
    "Broadcast address",
    "The last address in a subnet, with all host bits set to 1, used to reach every host on that subnet."
   ],
   [
    "Block size",
    "256 minus the interesting mask octet; the spacing between consecutive subnet addresses."
   ]
  ],
  "example": "You are given 10.20.0.0/24 and need four equal subnets for four clinic LANs. Borrowing 2 bits gives /26: 10.20.0.0, .64, .128 and .192, each with 62 usable hosts. On the first clinic router you configure `set interfaces ge-0/0/1 unit 0 family inet address 10.20.0.1/26`, and the hosts use .2 to .62 with .1 as the gateway. The vendor's suggested printer address, 10.20.0.64, is the network address of the second subnet and cannot be assigned to a host.",
  "mistakes": [
   [
    "172.16.0.0/16 is the whole private Class B range, so 172.20.1.1 is public.",
    "The RFC 1918 range is 172.16.0.0/12, covering 172.16.0.0 to 172.31.255.255, so 172.20.1.1 is private."
   ],
   [
    "A /26 has 64 usable hosts.",
    "It has 64 addresses but 62 usable hosts, because the network and broadcast addresses cannot be assigned."
   ],
   [
    "Any address ending in .0 or .255 is invalid for a host.",
    "It depends on the mask. In 10.1.0.0/23, 10.1.0.255 and 10.1.1.0 are both ordinary usable host addresses."
   ],
   [
    "127.0.0.1 is a Class A address you can assign to an interface.",
    "127.0.0.0/8 is reserved for loopback and is never used as a normal interface address."
   ]
  ],
  "tryit": [
   [
    "A branch needs subnets for 50 users, 20 phones and a router link, carved from 192.168.40.0/24 with no overlap and as little waste as possible. What prefix lengths do you choose?",
    "Users: /26 (62 usable), for example 192.168.40.0/26. Phones: /27 (30 usable), for example 192.168.40.64/27. Router link: /30 (2 usable) or /31, for example 192.168.40.96/30. Allocating the largest subnet first keeps the blocks aligned."
   ],
   [
    "A technician configures 10.8.17.255/22 on a host and says it must be wrong because it ends in 255. Is it valid?",
    "Yes. A /22 has block size 4 in the third octet, so the subnet is 10.8.16.0 to 10.8.19.255. 10.8.17.255 is in the middle of the range and is a valid host address."
   ]
  ],
  "tip": "Check whether a question asks for addresses or usable hosts. The usable count is 2 to the power of host bits minus 2 (except /31 and /32, which are special cases). Memorize the mask values 128, 192, 224, 240, 248, 252 so block sizes come instantly.",
  "check": [
   [
    "What are the network and broadcast addresses for 192.168.10.77/27?",
    "A /27 has a block size of 32, so the subnet containing .77 starts at .64; the network is 192.168.10.64 and the broadcast is 192.168.10.95."
   ],
   [
    "How many usable hosts are in a /28?",
    "A /28 has 4 host bits, so 16 addresses and 14 usable hosts."
   ],
   [
    "Is 172.20.1.1 a private address?",
    "Yes. It falls inside 172.16.0.0/12, which covers 172.16.0.0 to 172.31.255.255."
   ],
   [
    "How many /26 subnets fit in a /22?",
    "Sixteen, because you borrow 4 bits and 2 to the 4th is 16."
   ]
  ]
 },
 {
  "t": "IPv6 addressing: 128-bit format, compression rules, global unicast, link-local (fe80::/10), multicast, EUI-64",
  "hook": "Sunita is enabling IPv6 for the first time on the core routers at Northgate Community College. She configures one global address on ge-0/0/1, commits, and runs `show interfaces terse`. To her surprise, the interface now lists two IPv6 addresses, one she typed and one starting with fe80 that she never configured. A colleague reviewing her change ticket flags a typo in the documented address because it contains a double colon, and another flags a different address because it contains two. One of them is right. Before the change board meets tomorrow, Sunita needs to know which addresses are legal, where that extra fe80 address came from, and whether it is safe to leave there.",
  "simple": "IPv6 is the newer version of internet addressing. Its addresses are much longer than the old IPv4 ones, so long that the world will not run out. They are written as eight groups of four characters using the digits 0 to 9 and letters a to f, separated by colons. Because they are so long, there are two shortcuts: you can drop zeros at the start of any group, and you can replace one stretch of all-zero groups with a double colon. Different address types have different jobs, like different kinds of phone numbers: global addresses work across the internet, link-local addresses (starting fe80) only work on the local cable, and multicast addresses (starting ff) reach a group of devices at once.",
  "body": [
   "IPv6 was designed to replace IPv4's 32-bit address space with 128-bit addresses, enough that address scarcity, and with it most of the need for NAT (network address translation), goes away. An IPv6 address is written as eight groups called hextets, each of four hexadecimal digits, separated by colons, for example `2001:0db8:0000:0000:0a00:0000:0000:0001`. Like IPv4, an IPv6 address has a prefix length. Most LANs (local area networks) use a /64, where the first 64 bits identify the subnet and the last 64 bits, the interface ID, identify the host. That fixed split is what makes automatic address features like EUI-64 work.",
   "Two compression rules make addresses readable. First, leading zeros in any hextet may be dropped, so `0db8` becomes `db8`, `0a00` becomes `a00` and `0000` becomes `0`. Note that only leading zeros go; trailing zeros stay, so `a00` cannot be shortened to `a`. Second, one contiguous run of all-zero hextets may be replaced with `::`, but only once per address, because using it twice would make the length ambiguous: the reader could not tell how many zero groups each `::` represents. Applying both rules to the address above gives `2001:db8::a00:0:0:1`. When there are two runs of zeros, the standard form compresses the longest run, and when two runs are the same length, it compresses the first one, which is why the address above keeps the later `0:0` written out.",
   "To expand an address, reverse the process. Count the hextets that are present, subtract from eight, and fill the `::` with that many zero groups, then pad every hextet back to four digits. For `2001:db8::10`, three hextets are present, so `::` stands for five zero groups, giving `2001:0db8:0000:0000:0000:0000:0000:0010`. Expanding before comparing is the safest way to tell whether two differently written addresses are actually the same.",
   "The main address types are worth knowing by their prefixes. Global unicast addresses, currently allocated from 2000::/3 (so they start with 2 or 3), are routable on the internet, and 2001:db8::/32 is reserved for documentation examples like the ones in this lesson. Link-local addresses, fe80::/10, exist on every IPv6-enabled interface automatically and are valid only on that link; routers never forward them. Routing protocols and neighbor discovery use link-local addresses, and routers often use them as next hops. Unique local addresses, fc00::/7 (in practice fd00::/8), are the rough equivalent of private IPv4 space. The loopback address is ::1 and the unspecified address, used when a device does not yet have an address, is ::.",
   "Multicast addresses start with ff00::/8 and deliver a packet to every member of a group. Common examples are ff02::1 (all nodes on the link) and ff02::2 (all routers on the link). IPv6 has no broadcast at all; multicast does that job more efficiently, because only interested devices process the packet. This is a frequent exam point: if an answer choice mentions an IPv6 broadcast address, it is wrong.",
   "EUI-64 (extended unique identifier, 64-bit) is a method for building a 64-bit interface ID from a 48-bit MAC (media access control) address. The steps are: split the MAC into two 24-bit halves, insert `fffe` in the middle, then flip the seventh bit of the first byte, known as the universal/local bit. For MAC `00:05:86:71:2a:c0`, the halves are 000586 and 712ac0. Inserting fffe gives 0005:86ff:fe71:2ac0. Flipping the seventh bit changes the first byte from 00 to 02, giving the interface ID `0205:86ff:fe71:2ac0`, which compresses to `205:86ff:fe71:2ac0`. Because the result is exactly 64 bits, EUI-64 only makes sense with a /64 prefix, which is one more reason /64 is the standard LAN size. The `fffe` in the middle of an interface ID is also a quick visual clue that an address was built this way. The link-local address formed from it would then be `fe80::205:86ff:fe71:2ac0`.",
   "On Junos you configure IPv6 under `family inet6`. The command `set interfaces ge-0/0/0 unit 0 family inet6 address 2001:db8:1::1/64` sets a static global address. Alternatively, `set interfaces ge-0/0/1 unit 0 family inet6 address 2001:db8:10::/64 eui-64` gives only the /64 prefix and lets Junos fill in the interface ID from the interface's MAC. Either way, a link-local address is created automatically as soon as `family inet6` is configured, which explains the extra fe80 address you see in `show interfaces terse`. Use `show ipv6 neighbors` to view the neighbor cache built by neighbor discovery, the IPv6 replacement for ARP (Address Resolution Protocol), and `show route table inet6.0` to view the IPv6 routing table."
  ],
  "analogy": "Think of IPv6 compression like writing a long phone extension. You can skip the leading zeros of each part, and you can write one stretch of zeros as an ellipsis. But if you used two ellipses, whoever dialed would not know how many zeros belonged in each gap, so only one is allowed. The analogy fits the rule closely; where it stops is that phone numbers have no equivalent of the fixed 64-bit network and host halves.",
  "mnemonic": "For EUI-64, think 'Split, Stuff, Flip': split the MAC in half, stuff fffe in the middle, flip the seventh bit of the first byte.",
  "terms": [
   [
    "Hextet",
    "One of the eight 16-bit groups of an IPv6 address, written as up to four hexadecimal digits."
   ],
   [
    "Link-local address",
    "An fe80::/10 address automatically present on every IPv6 interface, valid only on the local link and never routed."
   ],
   [
    "Global unicast address",
    "A publicly routable IPv6 address, currently from 2000::/3."
   ],
   [
    "Unique local address",
    "An address from fc00::/7 (in practice fd00::/8) for internal use, similar to private IPv4 space."
   ],
   [
    "EUI-64",
    "A method of forming a 64-bit interface ID from a MAC address by inserting fffe and flipping the universal/local bit."
   ],
   [
    "Multicast (IPv6)",
    "Addresses in ff00::/8 that deliver to a group; IPv6 uses multicast instead of broadcast."
   ]
  ],
  "example": "On a lab router you configure `set interfaces ge-0/0/1 unit 0 family inet6 address 2001:db8:10::/64 eui-64` and commit. `show interfaces ge-0/0/1 terse` then lists two IPv6 addresses: a global one ending in the EUI-64 interface ID and an fe80:: link-local address with the same interface ID. Both are expected, and the link-local one is what OSPFv3 and neighbor discovery will use to talk to neighbors on that link.",
  "mistakes": [
   [
    "An address can use :: twice if there are two separate runs of zeros.",
    "Only one :: is allowed per address; two would make it impossible to know how many zero groups each represents."
   ],
   [
    "Trailing zeros in a hextet can be dropped, so 0a00 becomes a.",
    "Only leading zeros can be dropped; 0a00 becomes a00."
   ],
   [
    "IPv6 uses ff:ff:ff:ff... as a broadcast address.",
    "IPv6 has no broadcast. Multicast groups such as ff02::1 (all nodes) do that job."
   ],
   [
    "The unexpected fe80 address on an interface is a misconfiguration and should be deleted.",
    "Junos creates a link-local address automatically on every inet6 interface; it is required for neighbor discovery and routing protocols."
   ]
  ],
  "tryit": [
   [
    "A change ticket lists three addresses to configure: 2001:db8:0:1::5/64, 2001:db8::1::5/64 and fe80::1/64 as the server's internet-facing address. Which entries would you send back, and why?",
    "Send back the second, because it uses :: twice and is invalid. Also query the third: fe80::/10 is link-local and cannot be reached from other networks, so it cannot be the server's internet-facing address. The first is a valid global unicast address."
   ],
   [
    "A router interface has MAC 00:1a:2b:3c:4d:5e and is configured with prefix 2001:db8:5::/64 eui-64. What global address results?",
    "Split into 001a2b and 3c4d5e, insert fffe to get 001a:2bff:fe3c:4d5e, then flip the seventh bit so 00 becomes 02: interface ID 021a:2bff:fe3c:4d5e. The address is 2001:db8:5:0:21a:2bff:fe3c:4d5e. The single zero hextet is normally written as 0 rather than ::, since the standard form does not use :: for just one group."
   ]
  ],
  "tip": "The double colon may appear only once in an address. An answer choice with two `::` is always invalid. Also remember: link-local is fe80::/10, multicast is ff00::/8, global unicast is 2000::/3, and there is no IPv6 broadcast.",
  "check": [
   [
    "Compress 2001:0db8:0000:0000:0000:0000:0000:0010.",
    "2001:db8::10. Leading zeros are dropped and the run of six zero hextets becomes a single ::."
   ],
   [
    "What range do link-local addresses come from, and can they be routed?",
    "fe80::/10. They are valid only on the local link and are never forwarded by routers."
   ],
   [
    "What two changes turn a MAC address into an EUI-64 interface ID?",
    "Insert fffe between the two 24-bit halves, and flip the seventh bit of the first byte."
   ],
   [
    "What does ff02::2 represent?",
    "The all-routers multicast group on the local link."
   ]
  ]
 },
 {
  "t": "OSI and TCP/IP models; TCP vs UDP; well-known ports",
  "hook": "The help desk at Saltmarsh Insurance forwards you a ticket marked urgent: the new claims portal will not load for anyone at the Eastport branch. The branch manager adds that 'the network is fine, I can ping the server.' You look at the change log and see that yesterday someone tightened the firewall filter on the branch router. Ping is ICMP, the portal runs on HTTPS, and the time server and DNS are also on the other side of that router. Which layer is actually broken, which protocols and port numbers should that filter allow, and how do you explain it to the manager in a way that ends the argument about whether the network is fine?",
  "simple": "Networks are easier to understand when you break them into layers, each with one job, like the steps of sending a package: packing the item, labeling it, choosing a delivery route and driving the truck. The OSI model has seven layers and the TCP/IP model has four, but they describe the same idea. Two common ways to send data are TCP and UDP. TCP is like a signed-for delivery: it sets up a connection, numbers every piece, and resends anything lost. UDP is like dropping postcards in the mail: faster and simpler, but nobody checks they arrived. Port numbers are like apartment numbers on a building, telling the computer which program should receive the data, such as 443 for secure websites.",
  "body": [
   "Layered models give you a shared vocabulary for where a problem or a feature lives. The OSI (Open Systems Interconnection) model has seven layers. Layer 1, Physical, covers bits on the wire, cables, connectors and optics. Layer 2, Data Link, covers frames, MAC (media access control) addresses and switches. Layer 3, Network, covers packets, IP addresses and routers. Layer 4, Transport, covers segments and the TCP and UDP port numbers. Layer 5, Session, Layer 6, Presentation, and Layer 7, Application, handle conversations between applications, data formats and encryption, and the application protocols themselves. The TCP/IP model used by the real internet collapses these into four layers: Network Access (or Link), Internet, Transport and Application, where Application covers OSI layers 5 to 7 and Network Access covers OSI layers 1 and 2.",
   "Each layer adds its own header as data travels down the stack, a process called encapsulation. Application data gets a TCP or UDP header to become a segment (or, for UDP, a datagram). That gets an IP header to become a packet. The packet gets an Ethernet header and trailer to become a frame, which is finally sent as bits. The receiver reverses the process, called decapsulation, stripping each header as the data moves up. When you hear people say 'Layer 2 switch', 'Layer 3 routing' or 'Layer 4 port', they are using OSI numbers, so it pays to know them by heart.",
   "The models also give you a troubleshooting method. If ping works, Layer 3 connectivity is fine, because ping uses ICMP (Internet Control Message Protocol), which runs directly over IP. If an application still fails, the problem is higher: a blocked TCP or UDP port, a service that is not running, or an application error. Working up or down the layers keeps you from guessing.",
   "The transport layer has two main protocols, and their differences are a favorite exam topic. TCP (Transmission Control Protocol) is connection-oriented and reliable. It opens a session with a three-way handshake: the client sends SYN, the server answers SYN-ACK and the client replies ACK. It numbers every byte with sequence numbers, acknowledges what it receives, retransmits lost data, delivers data to the application in order and uses windowing for flow control, so a fast sender does not overwhelm a slow receiver. It closes the session gracefully with FIN exchanges. All that reliability costs a larger header and some delay.",
   "UDP (User Datagram Protocol) is connectionless. There is no handshake, no acknowledgment, no retransmission and no ordering, just a small 8-byte header with source port, destination port, length and checksum. That makes UDP lighter and faster, which suits short request-and-response exchanges like DNS (Domain Name System) queries, real-time voice and video where a late packet is useless anyway, and protocols that handle loss themselves. Neither protocol is better; each fits different needs.",
   "Ports identify the application on a host, so one server can run many services on the same IP address. Well-known ports are 0 to 1023. The ones worth memorizing are FTP (File Transfer Protocol) 20 and 21 over TCP, SSH (Secure Shell) 22 over TCP, Telnet 23 over TCP, SMTP (Simple Mail Transfer Protocol) 25 over TCP, DNS 53 over UDP and TCP, DHCP (Dynamic Host Configuration Protocol) 67 for the server and 68 for the client over UDP, TFTP (Trivial File Transfer Protocol) 69 over UDP, HTTP 80 over TCP, NTP (Network Time Protocol) 123 over UDP, SNMP (Simple Network Management Protocol) 161 and traps on 162 over UDP, BGP (Border Gateway Protocol) 179 over TCP, HTTPS 443 over TCP and syslog 514 over UDP. Note that some routing protocols do not use ports at all: OSPF (Open Shortest Path First) runs directly over IP as protocol number 89.",
   "These numbers matter on Junos because firewall filters match them. A filter term might use `from protocol tcp destination-port ssh` or `destination-port 22`; Junos accepts many well-known names in place of numbers, such as `ssh`, `bgp`, `ntp` and `https`. When you build a filter to protect the Routing Engine, you list the exact protocols and ports the router needs. Knowing which run over TCP versus UDP saves you from locking out BGP or NTP by mistake, and knowing that OSPF matches on `protocol ospf` rather than a port saves you from writing a term that can never match.",
   "For the exam, be able to place a protocol or device at its layer, map OSI layers to TCP/IP layers, contrast TCP and UDP features, and recall the port and transport for each common service."
  ],
  "analogy": "TCP is like a phone call: you dial, the other person answers, you confirm you can hear each other, and if something is garbled you ask them to repeat it. UDP is like shouting announcements over a stadium speaker: quick, no setup, and if someone misses a word, nobody repeats it. Ports are like extensions on a company phone system, getting the call to the right desk. The analogy stops at ordering: a phone call is naturally in order, while TCP must actively reorder segments that arrive out of sequence.",
  "mnemonic": "OSI layers 1 to 7: Please Do Not Throw Sausage Pizza Away (Physical, Data Link, Network, Transport, Session, Presentation, Application).",
  "terms": [
   [
    "Encapsulation",
    "Adding each layer's header (and trailer) to data as it moves down the stack."
   ],
   [
    "TCP",
    "Connection-oriented, reliable transport using a three-way handshake, sequence numbers, acknowledgments, retransmission and windowing."
   ],
   [
    "UDP",
    "Connectionless, best-effort transport with a small header and no acknowledgments or retransmission."
   ],
   [
    "Well-known ports",
    "Port numbers 0 to 1023, assigned to common services such as SSH (22) and HTTPS (443)."
   ],
   [
    "Three-way handshake",
    "The SYN, SYN-ACK, ACK exchange that opens a TCP connection."
   ],
   [
    "IP protocol number",
    "A field in the IP header identifying the payload, such as 6 for TCP, 17 for UDP and 89 for OSPF."
   ]
  ],
  "example": "A user reports that an internal website does not load, although ping works. Ping (ICMP, Layer 3) succeeding shows routing is fine, so you look higher: a firewall filter on the path allows ICMP but not TCP port 443. Adding a term that accepts `protocol tcp destination-port https` fixes it. While you are there, you confirm the filter also permits UDP 53 for DNS and UDP 123 for NTP so the branch keeps resolving names and keeping time.",
  "mistakes": [
   [
    "If ping works, the application must be reachable.",
    "Ping only proves Layer 3 reachability with ICMP. A filter can still block the TCP or UDP port the application uses."
   ],
   [
    "OSPF uses a well-known TCP or UDP port.",
    "OSPF runs directly over IP as protocol 89 and uses no port; BGP is the routing protocol that uses TCP port 179."
   ],
   [
    "DNS uses only UDP 53.",
    "DNS uses UDP 53 for most queries but TCP 53 for zone transfers and large responses."
   ],
   [
    "UDP is unreliable, so it is the wrong choice for anything important.",
    "UDP suits voice, video and quick queries where speed matters or the application handles loss itself; reliability is not always worth the delay."
   ]
  ],
  "tryit": [
   [
    "You are writing a loopback filter for a router that runs BGP, receives SSH management, syncs time and runs OSPF. Which protocol and port matches do you need?",
    "TCP 179 for BGP, TCP 22 for SSH, UDP 123 for NTP, and a match on protocol OSPF (IP protocol 89) with no port. Forgetting that OSPF has no port, or matching NTP as TCP, would break those services."
   ],
   [
    "A video conferencing vendor says its media streams use UDP rather than TCP. A colleague worries this means calls will be unreliable. How do you respond?",
    "For real-time media, a retransmitted packet would arrive too late to be useful, so TCP's retransmission adds delay without helping. UDP's low overhead suits live audio and video; the application tolerates or conceals small losses."
   ]
  ],
  "tip": "Know which protocol each well-known port uses. DNS is the classic trick: it uses UDP 53 for most queries but TCP 53 for zone transfers and large responses. BGP uses TCP 179, while OSPF uses IP protocol 89 and no port.",
  "check": [
   [
    "Which OSI layers does the TCP/IP Application layer cover?",
    "OSI layers 5, 6 and 7 (Session, Presentation and Application)."
   ],
   [
    "Give two features TCP provides that UDP does not.",
    "Any two of: connection setup with a handshake, acknowledgments, retransmission of lost data, in-order delivery and flow control through windowing."
   ],
   [
    "What transport protocol and port does SSH use?",
    "TCP port 22."
   ],
   [
    "What is the name of the data unit at OSI Layer 3?",
    "A packet."
   ]
  ]
 },
 {
  "t": "Class of service concepts: why traffic is classified, queued, scheduled and rewritten",
  "hook": "Every night at 1 a.m., the backup job at Granite Ridge Logistics copies the day's records to the data center across a single WAN link. And every night the overnight dispatchers, who coordinate drivers by voice-over-IP phones, complain that calls turn choppy and robotic for about an hour. Last week, an OSPF adjacency even dropped during the backup, briefly cutting off a warehouse. Your manager asks whether the only answer is to buy a faster circuit. You suspect the link has plenty of capacity for the calls; the problem is that every packet is treated the same. How can the router decide who goes first when the link is full?",
  "simple": "When a network link gets busy, packets have to wait in line. Without any rules, it is one line, first come first served, so a phone call can get stuck behind a huge file transfer. Class of service, or CoS, adds rules. First, the router sorts each packet into a category, such as voice or regular data. Then it gives each category its own waiting line and decides how often each line gets to move, so urgent traffic goes first. Finally, it can stamp a label on each packet so the next router knows its category without re-checking. It is like an airport with separate lines for crew, priority boarding and everyone else. It does not make the plane bigger; it decides who boards first.",
  "body": [
   "CoS (class of service) is how a network decides which traffic gets better treatment when links get busy. Without it, every packet waits in one FIFO (first-in, first-out) queue on the outgoing interface, so a large file transfer can delay a voice call, or even a routing protocol hello that keeps an adjacency alive. Junos CoS lets you sort traffic into classes and give each class its own share of bandwidth, buffer space and priority. The JNCIA-Junos exam tests the concepts, the vocabulary and the order of operations, rather than detailed tuning.",
   "CoS on Junos works as a pipeline with four main stages, and it helps to follow a packet through them. The first stage is classification. As a packet enters an interface, the router assigns it two internal values: a forwarding class, which decides which output queue it will use, and a loss priority, which says how readily it can be dropped under congestion, typically low or high. Classification can read markings already in the packet, such as the DSCP (Differentiated Services Code Point) value in the IP header, or it can match on other fields such as addresses and ports using a firewall filter. These internal values travel with the packet through the router but are not themselves written into the packet.",
   "The second stage is policing. A policer limits how much traffic of a class is admitted, measured as a rate and a burst size. Traffic within the limit passes untouched; the excess is either dropped or re-marked, for example by raising its loss priority so it is first to go if congestion appears later. Policing is how a provider enforces a contract, such as limiting a customer's priority traffic to an agreed rate.",
   "The third stage is queuing and scheduling, which happen on the egress interface. Each forwarding class maps to a queue. A scheduler defines, per queue, a transmit rate (a share of the interface bandwidth), a buffer size (how much traffic the queue can hold while waiting) and a priority. A scheduler map ties schedulers to forwarding classes, and you apply the scheduler map to an interface. When the link is congested, the scheduler decides which queue sends next. A queue with a higher priority is served before lower-priority queues, which is why voice is often placed in a high-priority queue, usually with a limited transmit rate so that it cannot starve every other class. Drop profiles use techniques such as RED (random early detection) to drop some packets before a queue is completely full, usually dropping high loss priority traffic first. Dropping early signals TCP senders to slow down gently, instead of every flow losing packets at once when the buffer overflows.",
   "The fourth stage is rewrite. Before the packet leaves, a rewrite rule can set the DSCP, IP precedence, 802.1p or MPLS (Multiprotocol Label Switching) EXP bits in the outgoing header to match the forwarding class and loss priority the packet was given. That way the next router downstream can classify it quickly from those markings, keeping treatment consistent across the whole network. Without rewrite, each router would have to repeat the expensive classification work, or would see stale markings.",
   "It helps to remember why each step exists and where it happens. Classification happens once, at the network edge and on ingress, because examining many fields can be expensive and because the edge is where you decide what to trust. Policing enforces limits. Queuing only matters when there is congestion: on an idle link, every packet leaves immediately regardless of class, so CoS has no visible effect. Scheduling decides who wins when queues compete for the same egress interface. Rewriting carries the decision to the next hop. None of it creates bandwidth; it only decides who suffers when there is not enough.",
   "On Junos, all of this lives under the `[edit class-of-service]` hierarchy, with sections such as `classifiers`, `forwarding-classes`, `schedulers`, `scheduler-maps`, `rewrite-rules` and `interfaces`. Policers and multifield classifiers are configured under `[edit firewall]`, because they are built with firewall filter syntax. To verify, `show class-of-service interface ge-0/0/0` shows which classifiers, scheduler map and rewrite rules are applied to an interface, and `show interfaces queue ge-0/0/0` shows per-queue counters, including drops, which is often the fastest way to prove that one class is suffering while others are fine."
  ],
  "analogy": "CoS is like an airport security checkpoint. At the entrance, an agent checks your boarding pass and sends you to the crew, priority or general line (classification). Each line has its own agents and rules about how many to let through (scheduling). If a line overflows, the last arrivals are turned away first (drops by loss priority). Your boarding pass gets stamped so the gate agent knows your group without asking again (rewrite). The analogy stops at timing: at an empty airport nobody waits, just as CoS changes nothing on an uncongested link.",
  "mnemonic": "Pipeline order: Can Police Stop Robbers, for Classify, Police, Schedule (queue and schedule) and Rewrite.",
  "terms": [
   [
    "Class of service (CoS)",
    "The set of features that classify, police, queue, schedule and mark traffic so different classes get different treatment."
   ],
   [
    "Forwarding class",
    "The Junos label assigned to a packet that determines which output queue it uses."
   ],
   [
    "Loss priority",
    "A per-packet value (such as low or high) that tells the router which packets to drop first under congestion."
   ],
   [
    "Policer",
    "A rate and burst limit that drops or re-marks traffic exceeding it."
   ],
   [
    "Scheduler",
    "A set of parameters for a queue, including transmit rate, buffer size and priority; tied to forwarding classes by a scheduler map."
   ],
   [
    "Rewrite rule",
    "An egress rule that sets CoS markings like DSCP in outgoing packets based on forwarding class and loss priority."
   ]
  ],
  "example": "A branch WAN link carries voice and bulk backups. Voice packets arrive marked DSCP EF, so the edge router classifies them into expedited-forwarding with loss priority low. A scheduler gives that queue strict high priority with a limited transmit rate, while backups sit in best-effort. When a nightly backup saturates the link, calls stay clear because the scheduler sends the voice queue first, and `show interfaces queue` shows drops only in the best-effort queue.",
  "mistakes": [
   [
    "CoS increases the bandwidth available on a link.",
    "CoS only decides which traffic is delayed or dropped when demand exceeds capacity; it creates no bandwidth."
   ],
   [
    "Queuing and scheduling happen when the packet arrives on the ingress interface.",
    "Classification happens on ingress; queuing, scheduling and rewrite happen on the egress interface."
   ],
   [
    "The forwarding class is a field written into the packet header.",
    "Forwarding class and loss priority are internal to the router. Rewrite rules are what put markings such as DSCP into the outgoing header."
   ],
   [
    "If CoS is configured, its effect will be visible all the time.",
    "On an uncongested link, queues stay empty and every packet leaves immediately, so CoS has no noticeable effect."
   ]
  ],
  "tryit": [
   [
    "Your core routers receive traffic already marked correctly by edge routers, but they treat everything as best-effort. The edge rewrite rules are working. What step is probably missing on the core?",
    "Classification on the core ingress interfaces. Without a classifier that reads the DSCP markings, the core assigns everything to the default class. A behavior aggregate classifier that trusts the DSCP values would fix it."
   ],
   [
    "A customer is allowed 10 Mbps of priority traffic on a shared link, but is sending 30 Mbps marked as priority. Which CoS mechanism enforces the contract, and what can it do to the excess?",
    "A policer. It admits traffic up to the agreed rate and either drops the excess or re-marks it, for example with high loss priority or a lower class, so it does not steal priority bandwidth."
   ]
  ],
  "tip": "Keep the order straight: classify on ingress, queue and schedule on egress, rewrite on egress. Questions often ask where in the path each step happens and which values a classifier assigns.",
  "check": [
   [
    "What two values does a Junos classifier assign to a packet?",
    "A forwarding class (which picks the output queue) and a loss priority (which controls drop preference under congestion)."
   ],
   [
    "Why do rewrite rules exist?",
    "To mark outgoing packets (for example setting DSCP) so downstream routers can classify them consistently without re-examining the traffic."
   ],
   [
    "Does CoS scheduling change anything on an uncongested link?",
    "Not noticeably. When there is no congestion, queues stay empty and packets are sent as soon as they arrive."
   ],
   [
    "What ties schedulers to forwarding classes for an interface?",
    "A scheduler map, which is applied to the interface under `[edit class-of-service interfaces]`."
   ]
  ]
 },
 {
  "t": "Junos default forwarding classes (best-effort, expedited-forwarding, assured-forwarding, network-control)",
  "hook": "Jamal at Oakhaven School District spent Friday afternoon writing a classifier that puts all the district's voice traffic into expedited-forwarding. He committed it, tested one call, and went home pleased. On Monday morning, with every school's video streaming and backups running, the principals report that phone calls are worse than before. Jamal checks `show interfaces queue` on the WAN router and sees the expedited-forwarding queue dropping packets steadily, while the best-effort queue sails along. He did not configure anything for best-effort at all. What does Junos do with traffic before you configure CoS, and why might putting voice in the 'premium' class make it suffer?",
  "simple": "Before you set up any traffic priorities, Junos already has four built-in categories, called forwarding classes, each with its own waiting line, called a queue. Best-effort is for everyday traffic like web browsing. Expedited-forwarding is meant for time-sensitive traffic like phone calls. Assured-forwarding is for important business traffic that needs a guaranteed share. Network-control is for the routers' own messages that keep the network running. Here is the catch: out of the box, only the everyday line and the network-control line are actually given any space and time to send. The other two exist in name but have nothing assigned. It is like a restaurant that prints a 'VIP' section on the menu but has not set up any tables there yet.",
  "body": [
   "Before you configure anything under `[edit class-of-service]`, Junos already has a working CoS (class of service) setup. It defines four forwarding classes and maps each to an output queue on every interface. Knowing these defaults matters for two reasons: they decide how your traffic is treated on day one, before anyone has designed a CoS policy, and the exam asks about the class names, their queue numbers and what each is intended for.",
   "The four default forwarding classes are best-effort, mapped to queue 0; expedited-forwarding, mapped to queue 1; assured-forwarding, mapped to queue 2; and network-control, mapped to queue 3. You can see them with `show class-of-service forwarding-class`. In conversation and documentation the names are often abbreviated BE, EF, AF and NC. The queue number is what matters to the hardware, while the name is the label you use in classifiers, schedulers and rewrite rules.",
   "Each class has an intended use, borrowed from the DiffServ (Differentiated Services) architecture. Best-effort is ordinary data with no special guarantee: web browsing, email, file transfers and most application traffic. Expedited-forwarding is for traffic that needs low delay, low jitter and low loss, such as voice; it takes its name from the EF per-hop behavior in DiffServ. Assured-forwarding is for traffic that should get a guaranteed share of bandwidth but can tolerate some delay, such as important business applications or interactive video; it corresponds to the DiffServ AF classes. Network-control is for the router's own protocol traffic, such as OSPF (Open Shortest Path First) and BGP (Border Gateway Protocol) messages and other keepalives, which must get through or the network itself breaks: drop enough OSPF hellos and an adjacency goes down, taking routes with it.",
   "The defaults are deliberately simple, and the details are a favorite exam topic. With no CoS configuration, most traffic ends up in best-effort. Traffic marked with IP precedence 6 or 7, the values traditionally used for routing and network control, is placed in network-control by the default classifier on many platforms. That is how routing protocols get protected even on a router nobody has tuned.",
   "The default scheduler is where people get caught. It gives bandwidth and buffer only to the best-effort and network-control queues, roughly 95 percent and 5 percent respectively. Expedited-forwarding and assured-forwarding get no transmit rate and no buffer until you configure schedulers for them. So simply classifying voice into EF without also building a scheduler, a scheduler map and applying that map to the interface would not give it better treatment. Under congestion it could even make things worse, because the EF queue has nothing reserved and its packets are dropped while best-effort traffic continues. Classification and scheduling must be configured together.",
   "You can customize the defaults. Under `[edit class-of-service forwarding-classes]` you can rename forwarding classes, add more (many platforms support eight or more queues) and remap them to different queue numbers. Most designs keep the four default names because they are widely understood by other engineers and match DiffServ vocabulary, and simply add schedulers to give EF and AF the resources they need.",
   "It helps to see how the forwarding classes connect to the rest of the CoS pipeline. A forwarding class is only a label that points at a queue. Classifiers decide which packets receive the label, schedulers decide how much bandwidth, buffer and priority the queue behind the label receives, and rewrite rules decide what marking the packet carries when it leaves. Every packet also carries a loss priority alongside its forwarding class, so two packets in the same best-effort queue can still be treated differently when the queue fills: the one with high loss priority is dropped first. When you troubleshoot, walk that chain in order, asking whether the traffic is classified into the class you expect, whether that class has a scheduler, and whether the scheduler map is applied to the egress interface.",
   "Verification ties it together. When you look at `show interfaces queue ge-0/0/0`, you will see per-queue counters for queued, transmitted and dropped packets, labeled with these class names. That is the quickest way to confirm which queue your traffic is actually using and whether any queue is dropping packets. Rising drops in queue 1 while queue 0 is clean is the classic signature of EF traffic without a scheduler.",
   "```\nuser@r1> show class-of-service forwarding-class\nForwarding class          ID   Queue ...\n  best-effort              0     0\n  expedited-forwarding     1     1\n  assured-forwarding       2     2\n  network-control          3     3\n```"
  ],
  "analogy": "Think of the four default classes as four checkout lanes in a store that just opened. All four lanes have signs: regular, express, reserved and staff-only. But on opening day the manager has staffed only the regular lane and the staff-only lane. Customers sent to the express lane find no cashier and wait, or give up. Hiring cashiers for those lanes is like configuring schedulers. The analogy stops at sharing: an unused scheduled share is not wasted on a real router, because idle bandwidth can be used by other queues.",
  "mnemonic": "Queues 0 to 3 in order: Big Elephants Always Nap, for best-effort (0), expedited-forwarding (1), assured-forwarding (2) and network-control (3).",
  "terms": [
   [
    "best-effort (BE)",
    "Default forwarding class for ordinary traffic, mapped to queue 0; receives most of the default scheduler's resources."
   ],
   [
    "expedited-forwarding (EF)",
    "Default forwarding class for low-latency, low-jitter traffic such as voice, mapped to queue 1; has no resources until a scheduler is configured."
   ],
   [
    "assured-forwarding (AF)",
    "Default forwarding class for traffic that needs a bandwidth guarantee, mapped to queue 2; has no resources until a scheduler is configured."
   ],
   [
    "network-control (NC)",
    "Default forwarding class for routing and control protocol traffic, mapped to queue 3; receives a small default share."
   ],
   [
    "show interfaces queue",
    "Operational command that shows per-queue transmit and drop counters for an interface."
   ]
  ],
  "example": "An engineer classifies voice into expedited-forwarding but forgets schedulers. Calls get worse during busy hours. `show interfaces queue ge-0/0/0` shows drops on queue 1, because the default scheduler map gives EF no bandwidth. Adding a scheduler for EF with a transmit rate and high priority, including it in a scheduler map alongside best-effort and network-control, and applying that map to the interface fixes it.",
  "mistakes": [
   [
    "The default queue numbers are NC 0, AF 1, EF 2, BE 3, with the most important class first.",
    "The defaults are best-effort 0, expedited-forwarding 1, assured-forwarding 2 and network-control 3."
   ],
   [
    "Putting traffic into expedited-forwarding is enough to give it priority.",
    "By default EF has no scheduler resources. You must also configure a scheduler, include it in a scheduler map and apply the map to the interface."
   ],
   [
    "Network-control is meant for management traffic like SSH sessions from administrators.",
    "Network-control is intended for routing and control protocols such as OSPF and BGP whose loss would destabilize the network."
   ],
   [
    "By default, bandwidth is split evenly across all four queues.",
    "The default scheduler gives resources only to best-effort and network-control, roughly 95 and 5 percent."
   ]
  ],
  "tryit": [
   [
    "A newly installed router has no CoS configuration. During heavy congestion, will its OSPF hellos be protected, and will voice traffic marked DSCP EF get priority?",
    "OSPF hellos are typically protected, because traffic with IP precedence 6 or 7 is classified into network-control, which has a default share. Voice gets no special treatment: without configured classifiers and schedulers it lands in best-effort with everything else."
   ],
   [
    "A colleague wants to move assured-forwarding to queue 5 and rename it 'business-critical'. Is that possible on Junos, and is anything else needed?",
    "Yes, forwarding classes can be renamed and remapped under `[edit class-of-service forwarding-classes]` on platforms with enough queues. It still needs a scheduler and scheduler map to receive bandwidth, and classifiers and rewrite rules must use the new name."
   ]
  ],
  "tip": "Memorize the queue numbers: BE 0, EF 1, AF 2, NC 3. Also remember that by default only BE and NC get scheduler resources, so EF and AF need schedulers before they help anyone.",
  "check": [
   [
    "Which queue does network-control use by default and what traffic belongs there?",
    "Queue 3; it carries routing and other control protocol traffic such as OSPF and BGP."
   ],
   [
    "What happens if you put traffic into assured-forwarding but configure no schedulers?",
    "It gets no guaranteed bandwidth, because the default scheduler map only allocates resources to best-effort and network-control."
   ],
   [
    "Which default class is intended for voice?",
    "expedited-forwarding, which is designed for low delay, jitter and loss."
   ],
   [
    "Which command lists the forwarding classes and their queue numbers?",
    "`show class-of-service forwarding-class`."
   ]
  ]
 },
 {
  "t": "Behavior aggregate (DSCP-based) vs multifield classification",
  "hook": "Alicia runs the network at Tidewater Regional Internet, a small provider serving local businesses. One customer, a busy marketing agency, has discovered that its traffic is marked DSCP EF and gets priority across Tidewater's backbone, and now every packet the agency sends, including huge video uploads, arrives claiming to be voice. Other customers' calls are suffering. Alicia's core routers simply trust whatever DSCP value arrives, which has worked well for years. She does not want to re-engineer the whole core, but she cannot let one customer decide its own priority. Where should she inspect traffic more closely, what tool lets her do it, and what should the core keep doing?",
  "simple": "Before a router can give some traffic priority, it has to decide which category each packet belongs in. There are two ways. The quick way, called behavior aggregate classification, reads a priority label already stamped on the packet by someone earlier, like reading a 'priority' sticker on a parcel. The careful way, called multifield classification, ignores or double-checks stickers and looks at several details, such as who sent the packet, where it is going and which application it belongs to, like a mail room checking the sender and contents before deciding. The quick way is great inside your own trusted network. The careful way is best at the entrance, where outsiders might put fake priority stickers on everything.",
  "body": [
   "Classification is the first CoS (class of service) step: deciding which forwarding class and loss priority a packet gets as it enters the router. Junos offers two ways to do it, and the exam expects you to know how each works and when each is used. A BA (behavior aggregate) classifier reads a single CoS marking already present in the packet. An MF (multifield) classifier examines several header fields using a firewall filter. The names describe the method: BA groups together all packets that share one marking, while MF looks at multiple fields.",
   "BA classification relies on markings that someone upstream already set. For IP traffic this is usually the DSCP (Differentiated Services Code Point), the upper 6 bits of the IPv4 ToS (type of service) byte or the IPv6 traffic class byte, giving 64 possible values. Common values are EF (decimal 46) for voice, the AF classes such as AF11 through AF43 for assured traffic with different drop precedences, CS6 and CS7 for network control, and 0 for best effort. Older equipment uses IP precedence, the top 3 bits of the same byte, giving 8 values. On Ethernet, 802.1p uses 3 bits in the VLAN tag, and MPLS (Multiprotocol Label Switching) networks use the EXP bits, also called traffic class bits, in the label.",
   "A BA classifier is essentially a lookup table: DSCP value X maps to forwarding class Y and loss priority Z. For example, DSCP 46 maps to expedited-forwarding with low loss priority, and DSCP 0 maps to best-effort. Because it reads one field and does one lookup, it is fast and simple, and the same classifier can be reused on many interfaces. You define BA classifiers under `[edit class-of-service classifiers]`, choosing a type such as `dscp`, `inet-precedence`, `ieee-802.1` or `exp`, and you apply one to an interface under `[edit class-of-service interfaces]`.",
   "The weakness of BA classification is trust. It only works if the markings are correct. Inside your own network, where your own edge routers set the markings, that is fine. At the edge, it is risky, because a customer, a user or a misconfigured application can mark everything as EF and claim priority it is not entitled to. Trusting those markings blindly lets the sender, rather than the network operator, decide who gets priority. That is where MF classification helps.",
   "An MF classifier is a firewall filter whose terms match fields such as source and destination address, protocol, and source and destination ports, and whose actions set `forwarding-class` and `loss-priority`. For example, one term could match UDP traffic from the voice gateway subnet and place it in expedited-forwarding with low loss priority, while a final term puts everything else in best-effort, regardless of how it was marked. You apply it as an input filter on the ingress interface, exactly like any other firewall filter. Because it can examine many fields, MF classification lets you base priority on facts you control, such as which subnet or application the traffic belongs to.",
   "```\nset firewall family inet filter CLASSIFY term voice from source-address 10.9.9.0/24\nset firewall family inet filter CLASSIFY term voice from protocol udp\nset firewall family inet filter CLASSIFY term voice then forwarding-class expedited-forwarding\nset firewall family inet filter CLASSIFY term voice then loss-priority low\nset firewall family inet filter CLASSIFY term rest then forwarding-class best-effort\nset interfaces ge-0/0/1 unit 0 family inet filter input CLASSIFY\n```",
   "Notice two details in that filter. The `voice` term has two `from` conditions, which must both match (a logical AND). The `rest` term has no `from` clause at all, so it matches every remaining packet, and its action implicitly accepts the traffic after setting the class. Without a catch-all term like `rest`, any packet that matched no term would hit the filter's implicit discard at the end, which would silently drop traffic, a classic mistake when an MF classifier is written in a hurry.",
   "The two methods can coexist on the same interface, and the order matters. When both are applied, the BA classifier runs first and the MF classifier runs after it, so the MF result wins for any packet the filter matches. Packets the MF filter does not reclassify keep their BA result. The typical design follows from the trust problem: use MF classification at the network edge, where traffic enters from untrusted sources; use a rewrite rule on egress to set DSCP to values that match the chosen class; then use BA classification on core routers, which simply trust those corrected markings and classify quickly."
  ],
  "analogy": "BA classification is like an airport gate agent who reads the boarding group printed on your pass and sends you to that line, trusting the airline's check-in desk. MF classification is like the check-in desk itself, which looks at your name, ticket type and loyalty status before printing that group. Gates can be fast because check-in did the careful work. The analogy stops at override order: on Junos, when both are applied to one interface, the careful MF result is applied after BA and wins.",
  "terms": [
   [
    "Behavior aggregate (BA) classifier",
    "A classifier that maps a single CoS marking (DSCP, IP precedence, 802.1p or MPLS EXP) to a forwarding class and loss priority."
   ],
   [
    "Multifield (MF) classifier",
    "A firewall filter that matches several header fields and sets forwarding class and loss priority as its action."
   ],
   [
    "DSCP",
    "Differentiated Services Code Point: the upper 6 bits of the IPv4 ToS or IPv6 traffic class byte, used to mark a packet's CoS treatment."
   ],
   [
    "EF (DSCP 46)",
    "The DSCP value conventionally used for expedited, low-latency traffic such as voice."
   ],
   [
    "IP precedence",
    "The older 3-bit marking in the top of the ToS byte, giving 8 values; precedence 6 and 7 are used for network control."
   ]
  ],
  "example": "An ISP edge router receives customer traffic where all packets claim DSCP EF. The ISP applies an MF classifier on the customer-facing interface that only honors EF for traffic from the customer's contracted voice subnet and puts the rest in best-effort, then rewrites DSCP on egress. Core routers use a BA classifier and trust those corrected markings.",
  "mistakes": [
   [
    "A behavior aggregate classifier is configured as a firewall filter.",
    "BA classifiers are defined under `[edit class-of-service classifiers]` and read a single marking. The firewall filter approach is multifield classification."
   ],
   [
    "When BA and MF classifiers are both applied, BA wins because it runs first.",
    "BA runs first, but MF runs after it and overrides the result for any packet the filter matches."
   ],
   [
    "BA classification is best at the network edge because it is fastest.",
    "BA trusts existing markings, which is risky for untrusted traffic. MF at the edge, BA in the core is the typical design."
   ],
   [
    "An MF filter without a final catch-all term simply leaves unmatched traffic in its BA class.",
    "A firewall filter ends with an implicit discard, so unmatched packets are dropped. Include a final term that accepts the rest."
   ]
  ],
  "tryit": [
   [
    "A university's core routers already have a DSCP BA classifier. The campus edge receives traffic from student dorms where some gaming software marks packets EF. The network team wants only traffic from the IP phone subnet treated as voice. What should they deploy and where?",
    "Apply an MF classifier (a firewall filter) as an input filter on the dorm-facing edge interfaces, setting expedited-forwarding only for the phone subnet and best-effort for everything else, followed by a rewrite rule on egress so the core's BA classifier sees corrected DSCP values."
   ],
   [
    "An engineer writes an MF filter with one term matching voice traffic and applies it to an interface. Shortly afterward, users on that interface lose all non-voice connectivity. What went wrong?",
    "The filter has no catch-all term, so all non-voice packets reach the implicit discard at the end of the filter. Adding a final term with no `from` conditions that sets best-effort (and accepts) restores the traffic."
   ]
  ],
  "tip": "If a question mentions matching on addresses or ports, the answer is multifield (a firewall filter). If it mentions reading DSCP, precedence, 802.1p or EXP, the answer is behavior aggregate. When both apply, MF overrides BA.",
  "check": [
   [
    "Which classifier type uses a firewall filter?",
    "Multifield classification; the filter's terms match header fields and the `then` actions set forwarding class and loss priority."
   ],
   [
    "Why is BA classification usually used in the core rather than the edge?",
    "Because it trusts existing markings, which is safe once the edge has classified and rewritten them but risky for traffic from untrusted sources."
   ],
   [
    "If a packet matches both a BA and an MF classifier on the same interface, which result applies?",
    "The MF result, because the multifield classifier is evaluated after the BA classifier and overrides it."
   ],
   [
    "How many bits make up the DSCP field, and how many values does that allow?",
    "Six bits, allowing 64 values."
   ]
  ]
 },
 {
  "t": "Junos OS as one modular OS across routing, switching and security platforms",
  "hook": "Elena has run lab routers in a virtual environment for six months, studying at night. On Monday she starts her first network job at Bluestem Agricultural Co-op, and her new manager hands her a list: a pair of core routers, a dozen campus switches and two firewalls at the edge. Her stomach drops. Does she now have to learn three different operating systems, three different command sets and three different ways to save a change? Then, mid-morning, a monitoring alert says a process on one of the firewalls restarted overnight, yet the device never stopped passing traffic. How can one crashed process leave the rest of the box running, and how much of her lab practice actually carries over?",
  "simple": "Juniper uses the same operating system, called Junos OS, on its routers, switches and firewalls. That means once you learn the commands on one device, you can use them on the others, like being able to drive any car once you know where the pedals and steering wheel are, even if a truck has a few extra buttons. Junos is also built from many small programs instead of one big one. Each small program does one job, such as handling routing or the command line, and runs in its own protected space. If one of them crashes, the system can restart just that piece while everything else keeps working, a bit like one light bulb burning out without blacking out the whole house.",
  "body": [
   "One of Juniper's main design ideas, and a recurring exam theme, is that the same operating system, Junos OS, runs across many product families. MX routers handle edge and service provider routing, PTX routers serve the network core, ACX routers sit in access and aggregation networks, EX and QFX switches cover campus and data center switching, and SRX security gateways provide firewall and security services. If you learn the CLI (command-line interface) on a virtual router in your lab, the same commands, configuration hierarchy and commit model carry over to a campus switch or a firewall.",
   "Several design ideas make this possible. The first is a single source code base: features are developed once and enabled for the hardware that supports them, rather than each product line having its own separately written software. This keeps behavior consistent and means a bug fix or new feature in the common code benefits every platform. The second is a structured release process. Releases have version names such as 23.4R1, where the leading numbers identify the release and R1, R2 and so on are maintenance releases of it, delivering fixes. The exact release cadence has changed over the years, so rely on Juniper's current documentation rather than memorizing a schedule.",
   "The third idea is modularity, and it explains the firewall alert in the opening story. Rather than one large monolithic program, Junos runs many separate processes, called daemons, each with one job. One daemon runs the routing protocols, another runs the CLI, another manages interfaces, another monitors chassis hardware, another handles SNMP (Simple Network Management Protocol), and so on. Each daemon runs in its own protected memory space, so a bug in one cannot overwrite another's memory. If a daemon fails, the kernel can restart it without taking down the others or rebooting the whole device. That isolation is a major reason Junos is regarded as stable, and it is why a single process restart is logged and alarmed but usually does not interrupt service.",
   "The fourth idea is the separation of the control plane from the forwarding plane. The software that runs protocols, management and the CLI lives on the RE (Routing Engine), while transit traffic is forwarded by the PFE (Packet Forwarding Engine). This division means heavy management activity does not slow down traffic, and it pairs naturally with modularity: even a routing daemon restart need not stop forwarding. You will study both components in detail in the next lesson.",
   "For you as an operator, consistency is the practical benefit. The configuration is a single hierarchy you edit with `set` and `delete` statements in configuration mode. Your changes go into a candidate configuration and take effect only when you `commit`, which checks the syntax and logic before activating anything. You can review pending changes with `show | compare`, use `commit confirmed` to have the device automatically roll back if you lose access, and return to earlier committed versions with `rollback`. These workflows are identical on a router, a switch and a firewall.",
   "Operational commands are consistent too. `show interfaces terse` gives a quick list of interfaces and their states, `show route` displays the routing table, `show system alarms` reports active system alarms, and `show log messages` reads the main system log. Interface naming follows the same type-FPC/PIC/port pattern everywhere, such as `ge-0/0/0`. An engineer who knows these on one platform can begin troubleshooting another immediately. The same is true for automation: scripts and tools that read Junos configuration or command output work across product families, because the structure of that data is shared.",
   "Platform differences do exist, but they appear mostly as additional hierarchy levels rather than a different system. SRX gateways add `security` zones and policies. EX and QFX switches use `vlans` and `family ethernet-switching` on interfaces. Chassis-specific settings appear under `chassis`. Learning a new Juniper platform is therefore mostly a matter of learning a few extra branches of a tree you already know.",
   "Juniper also offers Junos OS Evolved, a variant that runs on a Linux foundation on certain platforms. It keeps the same CLI, the same configuration model and the same commit workflow, so from the operator's point of view it behaves like Junos. The exam treats the user interface as common to both, so focus on the shared CLI and configuration concepts rather than the internals."
  ],
  "analogy": "Junos across platforms is like one family of cars from the same maker: a sedan, a pickup and a van share the same dashboard, pedals and controls, so any driver can get in and go, and the pickup simply adds a tow hitch. Modularity is like a building with separate circuit breakers for each room: if one room's circuit trips, you reset that breaker and the rest of the building never loses power. The analogy stops at repair: Junos restarts a failed daemon automatically, without anyone walking to the breaker box.",
  "terms": [
   [
    "Junos OS",
    "Juniper's network operating system, used across its routing, switching and security platforms with one CLI and configuration model."
   ],
   [
    "Daemon",
    "A background process with a single responsibility, such as routing or the CLI, running in its own protected memory."
   ],
   [
    "Modularity",
    "The design in which separate processes can fail and restart independently without crashing the system."
   ],
   [
    "Candidate configuration",
    "The working copy of the configuration you edit; it takes effect only after a commit."
   ],
   [
    "Junos OS Evolved",
    "A Linux-based variant of Junos on certain platforms that keeps the same CLI and configuration model."
   ]
  ],
  "example": "A network engineer who has only used vJunos-router in a lab starts a job running EX switches and SRX firewalls. On day one she logs in, types `show interfaces terse`, `configure`, `show | compare` and `commit confirmed` exactly as in her lab. The only new things to learn are the security and VLAN hierarchies specific to those platforms. When the overnight alert reports a restarted daemon on an SRX, she checks `show log messages`, sees the process restarted cleanly, and confirms traffic never stopped.",
  "mistakes": [
   [
    "Each Juniper product family runs its own operating system with its own commands.",
    "Routers, switches and SRX firewalls all run Junos OS with the same CLI, hierarchy and commit model; platforms add extra hierarchy levels."
   ],
   [
    "If any Junos process crashes, the whole device reboots.",
    "Daemons run in protected memory, and a failed daemon can be restarted on its own while the rest of the system keeps running."
   ],
   [
    "Configuration changes in Junos take effect as soon as you type them.",
    "Changes go into the candidate configuration and become active only after `commit`."
   ],
   [
    "Junos OS Evolved requires learning a different CLI.",
    "Junos OS Evolved keeps the same CLI and configuration model."
   ]
  ],
  "tryit": [
   [
    "Your company is choosing between two vendors for a refresh of routers, switches and firewalls. A manager asks what operational advantage running Junos on all three would bring. What do you tell them?",
    "One CLI, one configuration hierarchy and one commit and rollback workflow across all three device types, so staff training, documentation and automation carry over. Platform-specific features appear as extra hierarchy levels, not a new system, and the modular daemon design adds stability."
   ],
   [
    "A syslog message shows that the SNMP daemon on a core router restarted, but users report no outage. A junior engineer wants to reboot the router to be safe. Is that necessary?",
    "Usually not. Junos daemons run in protected memory and restart independently, so an SNMP daemon restart does not affect routing or forwarding. Investigate the cause in the logs and monitor for repeats instead of causing an outage with a reboot."
   ]
  ],
  "tip": "Exam answers that stress 'one OS, one CLI, one release train, modular daemons' describe Junos. An answer saying each platform has a different operating system, or that a single process failure crashes the whole device, is wrong.",
  "check": [
   [
    "Name three Juniper product families that run Junos OS.",
    "Any three of: MX routers, PTX routers, ACX routers, EX switches, QFX switches and SRX firewalls."
   ],
   [
    "What is the benefit of running each function as a separate daemon?",
    "Each daemon has its own protected memory, so a fault in one can be contained and the daemon restarted without crashing the whole system."
   ],
   [
    "Does the CLI change between Junos OS and Junos OS Evolved?",
    "No. Both use the same CLI and configuration model."
   ],
   [
    "When does a configuration change typed in configuration mode take effect?",
    "Only after you commit the candidate configuration."
   ]
  ]
 },
 {
  "t": "Separation of control plane and forwarding plane",
  "hook": "It is 3 a.m. at Summit Valley Medical Center, and Omar is on the night shift watching the core router's dashboard. A colleague in another city has just run an enormous `show route` command that sends the Routing Engine CPU to 90 percent. Omar braces for a flood of calls from the emergency department, whose imaging systems send scans across that router all night. The phone stays silent. Scans keep flowing at full speed. Twenty minutes later, a routing daemon restarts after a software bug, and still the traffic keeps moving. How can a router's brain be this busy, or even briefly confused, while its traffic carries on as if nothing happened?",
  "simple": "A router has two separate jobs. One job is thinking: talking to other routers, working out the best paths, and letting administrators log in and make changes. The other job is doing: actually pushing huge numbers of data packets out the right ports, very fast. Juniper routers give these jobs to different parts of the hardware. The thinking part, the Routing Engine, is like a regular computer. The doing part, the Packet Forwarding Engine, uses special chips built only to move packets quickly. The thinking part hands the doing part a cheat sheet of where to send things. Even if the thinker is busy or briefly restarts, the doer keeps working from its cheat sheet, like a delivery driver following a printed route when the dispatcher's phone is busy.",
  "body": [
   "Every router does two very different jobs. It has to work out where traffic should go, by running routing protocols, handling management sessions and building tables. And it has to actually move enormous numbers of packets per second out of the right interfaces. Junos separates these into the control plane and the forwarding plane (also called the data plane), and runs them on different hardware components. This separation is one of the defining features of Junos platforms and a core JNCIA-Junos exam topic.",
   "The control plane is handled by the RE (Routing Engine). It is essentially a general-purpose computer, with a CPU, memory and storage, running the Junos kernel and its daemons. The RE exchanges OSPF (Open Shortest Path First), BGP (Border Gateway Protocol) and other protocol messages with neighbors, runs the CLI (command-line interface) and the J-Web graphical interface, handles SSH (Secure Shell), SNMP (Simple Network Management Protocol) and syslog, and stores the configuration. From everything it learns, it computes the best path to each destination and installs those paths in the routing table. From the routing table it then derives a forwarding table, a streamlined list of just what is needed to forward packets.",
   "The forwarding plane is handled by the PFE (Packet Forwarding Engine). On most platforms it is built from specialized ASICs (application-specific integrated circuits) designed to look up destinations, apply firewall filters, policers and CoS (class of service), and forward traffic at line rate, meaning as fast as the interfaces can carry it. The RE sends a copy of the forwarding table down to the PFE, along with the filters and CoS settings the PFE needs, and the PFE forwards transit traffic using that copy without involving the RE for each packet. Transit traffic is traffic that passes through the router on its way somewhere else, which is the vast majority of what a router handles.",
   "The two components are connected by an internal link. Over it, the RE pushes forwarding table updates to the PFE whenever routes change, and the PFE sends up the small amount of traffic that the RE itself must handle. That host-bound traffic includes routing protocol packets from neighbors, SSH or SNMP sessions addressed to the router, and packets that need special handling, such as ones whose TTL (time to live) has expired. This traffic is often called exception traffic, and it is rate-limited on its way up so that a flood of it cannot overwhelm the RE.",
   "The benefits of this design are why it appears on the exam, and they fall into four groups. Performance: forwarding speed does not depend on RE CPU load, so a busy CLI session, a large BGP update or a heavy SNMP poll does not slow transit traffic. Stability: if the RE is heavily loaded, or a routing daemon restarts, the PFE can keep forwarding with the last forwarding table it received, so traffic keeps flowing while the control plane recovers. Security: because transit traffic never reaches the RE, attacks against the router itself are limited to the exception path, which you can protect with a firewall filter applied to the loopback interface, `lo0`, to permit only the protocols and sources the RE needs. Scale: RE and PFE hardware can be improved independently, so a platform can gain faster forwarding or a more powerful control processor without redesigning both.",
   "It is worth being precise about the limits of the stability benefit. The PFE keeps forwarding with its existing table, but that table is frozen until the RE recovers. If the network changes during that time, for example a link elsewhere fails, the PFE cannot learn about it on its own. That is why features that protect the control plane, and redundant REs on larger platforms, still matter.",
   "You can see both sides from the CLI. `show route` displays the routing table held on the RE, including all learned routes and their sources. `show route forwarding-table` shows the forwarding table built from it, which is what the PFE uses. `show chassis routing-engine` reports RE CPU utilization, memory and uptime, which is where you would see that 90 percent spike from the opening story. `show chassis fpc` shows the FPCs (Flexible PIC Concentrators), the line cards that host PFEs on modular platforms, along with their state, temperature and utilization. Comparing RE load with traffic statistics during an incident is a quick way to confirm that the planes are behaving independently."
  ],
  "analogy": "Think of a restaurant. The head chef in the back office plans the menu, takes calls from suppliers and writes recipe cards: that is the Routing Engine. The line cooks in the kitchen follow those cards and turn out plates at full speed: that is the Packet Forwarding Engine. If the chef is stuck on a long phone call, the kitchen keeps cooking from the cards it has. The analogy stops at change: if a supplier runs out of an ingredient while the chef is unavailable, the cooks cannot rewrite the cards themselves, just as the PFE cannot learn new routes without the RE.",
  "terms": [
   [
    "Control plane",
    "The functions that decide where traffic goes: routing protocols, management and table building, handled by the Routing Engine."
   ],
   [
    "Forwarding plane",
    "The functions that move transit packets using the forwarding table, handled by the Packet Forwarding Engine; also called the data plane."
   ],
   [
    "Routing Engine (RE)",
    "The CPU-based component that runs Junos, the CLI and routing protocols, and builds the routing and forwarding tables."
   ],
   [
    "Packet Forwarding Engine (PFE)",
    "The component, usually ASIC-based, that forwards traffic at line rate using the forwarding table copied from the RE."
   ],
   [
    "Exception traffic",
    "Packets that the PFE must send up to the RE, such as traffic addressed to the router itself; this path is rate-limited."
   ],
   [
    "Forwarding table",
    "The streamlined table derived from the routing table and pushed to the PFE, shown with `show route forwarding-table`."
   ]
  ],
  "example": "During a maintenance window, an engineer runs a large `show route` command and the RE CPU climbs to 90 percent for a minute, visible in `show chassis routing-engine`. Customers see no effect, because their transit traffic is forwarded by the PFE using its forwarding table, which the heavy CLI output does not touch. Meanwhile, the router's loopback filter continues to limit which management and protocol traffic can reach the RE at all.",
  "mistakes": [
   [
    "The Routing Engine forwards every packet after looking it up in the routing table.",
    "The PFE forwards transit traffic using its copy of the forwarding table. Only host-bound exception traffic goes to the RE."
   ],
   [
    "If the RE is busy or a routing daemon restarts, all traffic stops.",
    "The PFE keeps forwarding with the last forwarding table it received, so transit traffic continues while the control plane recovers."
   ],
   [
    "`show route` and `show route forwarding-table` show exactly the same thing.",
    "`show route` shows the RE's routing table with all learned routes; `show route forwarding-table` shows the forwarding table derived from it for the PFE."
   ],
   [
    "Separating the planes means the router needs no protection for its control plane.",
    "Exception traffic still reaches the RE, which is why it is rate-limited and why you apply a firewall filter to lo0."
   ]
  ],
  "tryit": [
   [
    "A router under a heavy flood of SSH connection attempts aimed at its own address shows high RE CPU, while transit traffic statistics look normal. Which plane is affected, and what protective measure would you recommend?",
    "The control plane on the RE is affected, because traffic addressed to the router is exception traffic sent up from the PFE. Transit traffic is unaffected because the PFE forwards it. Recommend a firewall filter on lo0 that permits SSH only from trusted management subnets and the protocols the router needs, discarding the rest."
   ],
   [
    "The routing daemon on a router restarts during the night. Traffic continues, but during those minutes a link fails elsewhere in the network. What happens to traffic heading toward that failed link, and why?",
    "It may keep being sent toward the failed path until the RE recovers, because the PFE keeps using its last forwarding table and cannot learn about topology changes itself. Once the routing daemon is back, it recalculates routes and pushes an updated forwarding table."
   ]
  ],
  "tip": "If a question asks which component forwards transit traffic, the answer is the PFE. If it asks which runs protocols, builds tables or hosts the CLI, the answer is the RE. Protect the RE with a filter on the loopback interface.",
  "check": [
   [
    "What does the RE send to the PFE?",
    "A copy of the forwarding table (plus configuration such as filters and CoS), which the PFE uses to forward transit traffic."
   ],
   [
    "Why can a router keep forwarding if its routing daemon restarts?",
    "Because the PFE keeps using the last forwarding table it received from the RE, independent of the RE's processes."
   ],
   [
    "Name one security benefit of separating the planes.",
    "Transit traffic never reaches the RE, so only host-bound exception traffic can target the control plane, and it can be rate-limited and filtered."
   ],
   [
    "Which command shows Routing Engine CPU and memory usage?",
    "`show chassis routing-engine`."
   ]
  ]
 },
 {
  "t": "Routing Engine (RE): runs the CLI, routing protocols, builds the routing and forwarding tables",
  "hook": "It is 2 a.m. at Northgate Regional Transit and Priya, the on-call network engineer, is staring at a ticket that says 'core router slow, please check.' She logs in over SSH and the prompt takes several seconds to appear. Yet the station cameras and fare gates, all of which send traffic through that same router, are working perfectly. A colleague in chat insists the router must be dropping packets and wants to reboot it. Priya suspects something else: the part of the router she is talking to is not the part that moves the cameras' traffic. Which part of a Junos device is she actually logged into, what is it responsible for, and why can it be busy while forwarding stays healthy?",
  "simple": "Think of a Junos router as two workers sharing one box. One worker is the planner, called the Routing Engine. It is a small computer that talks with other routers, learns which roads lead where, keeps the settings, and lets you log in and type commands. The other worker is the mover, which actually pushes the data along. The planner writes a clean list that says 'for this address, use that exit,' and hands a copy to the mover. Then the mover does the heavy lifting on its own. It is like a dispatcher at a delivery company who plans the routes and prints a route sheet for each driver, but never drives a truck. If the dispatcher is swamped with phone calls, the trucks keep driving with the sheets they already have.",
  "body": [
   "The Routing Engine, or RE, is the brain of a Junos device. It is a general-purpose computer with its own CPU (central processing unit), memory and storage, and it runs the Junos kernel together with all the software processes, called daemons, that make the device work. When you log in, type commands, change the configuration or watch an OSPF (Open Shortest Path First) adjacency come up, you are interacting with the RE. Juniper separates this control work from the job of moving packets, which is handled by the Packet Forwarding Engine, or PFE. That separation of the control plane from the forwarding plane is one of the core architecture ideas on the JNCIA-Junos exam.",
   "The RE's responsibilities fall into four groups. The first is management: it runs the CLI (command-line interface), the J-Web graphical interface, SSH (Secure Shell), NETCONF for automation, SNMP (Simple Network Management Protocol) and system logging. It stores the active configuration, the candidate you are editing and the rollback history, and it keeps the system clock accurate through NTP (Network Time Protocol). The second is routing: it runs routing protocols such as OSPF, IS-IS (Intermediate System to Intermediate System) and BGP (Border Gateway Protocol) through the routing protocol daemon, rpd, and it holds static routes and the direct routes created by configured interfaces. The third is chassis control: it monitors hardware, power supplies, fans and temperature, and raises alarms when something is wrong. The fourth is table building: it turns everything it has learned into a forwarding table for the PFE.",
   "That last job is worth following step by step, because exam questions often test the difference between the two tables. Every source of routes, whether direct interfaces, local addresses, static routes, OSPF or BGP, contributes candidate routes to the routing table, which is also called the RIB (routing information base). On Junos, IPv4 unicast routes live in a table named `inet.0` and IPv6 unicast routes in `inet6.0`. A single prefix can have several candidates at once. When that happens, the RE picks one active route using route preference, a number Junos assigns to each source where the lowest value wins. Direct and local routes are 0, static routes are 5, OSPF internal routes are 10 and BGP routes are 170. Other vendors call this idea administrative distance, but on a Juniper exam the term is preference.",
   "Once the active routes are chosen, the RE builds the forwarding table, or FIB (forwarding information base). The FIB is leaner than the RIB: it lists only the active route for each prefix, with the next hop fully resolved to an outgoing interface and Layer 2 information. Inactive backup routes stay in the RIB, ready to take over if the active route disappears, but they are not copied to the FIB. The RE then pushes the FIB to every PFE in the system over an internal link. From that moment, the PFE can forward transit traffic without asking the RE anything.",
   "You can watch each stage from the CLI. `show route` lists the routing table; in its output, an asterisk next to an entry marks the active route for that prefix, and the bracketed text shows the protocol and preference, such as `[Static/5]` or `[OSPF/10]`. `show route protocol static` narrows the list to one source, and `show route 10.1.1.0/24 extensive` explains why a route was or was not chosen. `show route forwarding-table destination 10.1.1.0/24` shows the entry the PFE actually uses. `show chassis routing-engine` reports the RE's CPU load, memory use, uptime and, on systems with two REs, which one is currently primary.",
   "Larger platforms often have two Routing Engines for redundancy. One is primary (older documentation and some command output say master) and the other is backup. Features such as graceful Routing Engine switchover, often shortened to GRES, can move control to the backup RE while the PFEs keep forwarding with the tables they already hold. Because both REs must be ready to take over, you keep their configurations identical by committing with `commit synchronize`, which commits on the primary and copies the result to the backup.",
   "It is just as important to know what the RE does not do. It does not forward transit traffic, meaning packets that are simply passing through the device from one network to another. Those packets are handled entirely by the PFE using the FIB. The RE only sees packets that are addressed to the device itself, such as SSH sessions, OSPF hellos and BGP updates, or packets that need special help, such as one whose TTL (time to live) has expired. This is why Priya's router in the opening scene could be slow to answer SSH while the cameras' traffic flowed normally.",
   "Because the RE is an ordinary computer whose CPU has far less packet capacity than the PFE's forwarding hardware, it must be protected. A flood of traffic aimed at the router's own addresses could starve rpd of CPU time, delaying routing protocol hellos until neighbors give up and adjacencies drop. Junos therefore rate-limits the traffic the PFE sends up to the RE, and Juniper recommends applying a firewall filter on the loopback interface, lo0, to accept only the host-bound traffic the device really needs. Later lessons cover both protections in detail."
  ],
  "analogy": "The RE is like an air traffic control tower. The controllers talk to other airports, plan routes and decide which runway each flight uses, then hand pilots clear instructions. The planes themselves, like the PFE, do the actual flying and do not radio the tower about every mile. If the tower gets flooded with phone calls, planes already following their instructions keep flying. The analogy stops working in one place: real pilots can improvise, but a PFE only follows the forwarding table it was given.",
  "mnemonic": "Four RE jobs, MRCT: Management (CLI, SSH, configuration storage), Routing (rpd and the protocols), Chassis (hardware monitoring and alarms), Tables (building the RIB and pushing the FIB to the PFE).",
  "terms": [
   [
    "Routing Engine (RE)",
    "The control-plane computer in a Junos device that runs the kernel, daemons, CLI and routing protocols, and builds the forwarding table."
   ],
   [
    "Routing table (RIB)",
    "The RE's table of all known routes from every source; inet.0 holds IPv4 unicast routes and inet6.0 holds IPv6 unicast routes."
   ],
   [
    "Forwarding table (FIB)",
    "The table of active routes with resolved next hops that the RE pushes to each PFE."
   ],
   [
    "Route preference",
    "Junos's value for choosing between route sources for the same prefix; lower wins (direct 0, static 5, OSPF internal 10, BGP 170)."
   ],
   [
    "Active route",
    "The route the RE selects for a prefix and installs in the forwarding table, marked with * in `show route`."
   ],
   [
    "commit synchronize",
    "A commit that also copies the committed configuration to the backup Routing Engine on dual-RE systems."
   ]
  ],
  "example": "A router learns 10.50.0.0/24 from both OSPF and a static route. `show route 10.50.0.0/24` lists both, with an asterisk on the static entry shown as `[Static/5]`, because its preference of 5 beats OSPF's 10. `show route forwarding-table destination 10.50.0.0/24` confirms the static next hop is what the PFE uses. If the static route is deleted and committed, the OSPF route becomes active and the RE pushes the updated entry to the PFE.",
  "mistakes": [
   [
    "The Routing Engine forwards packets between interfaces.",
    "Transit forwarding is done by the PFE using its copy of the forwarding table. The RE only handles traffic addressed to the device and exception packets."
   ],
   [
    "The routing table and the forwarding table are the same thing.",
    "The routing table (RIB) holds every candidate route from every source. The forwarding table (FIB) holds only the active routes with resolved next hops and is copied to the PFE."
   ],
   [
    "Higher route preference wins, like a priority score.",
    "On Junos the lowest preference value wins. Static (5) beats OSPF internal (10), which beats BGP (170)."
   ],
   [
    "If the RE is busy, all traffic through the router slows down.",
    "A busy RE affects management and routing protocol processing, but the PFE keeps forwarding transit traffic with the forwarding table it already has."
   ]
  ],
  "tryit": [
   [
    "You are troubleshooting a router where users report that a route to 172.16.8.0/24 is going the wrong way. `show route 172.16.8.0/24` shows two entries: one learned from OSPF and one from BGP. The BGP entry points toward the expected path but has no asterisk. Which route is the PFE using, and why?",
    "The PFE is using the OSPF route. The asterisk marks the active route, and OSPF internal preference (10) is lower than BGP (170), so the RE installed OSPF in the forwarding table. You can confirm with `show route forwarding-table destination 172.16.8.0/24`. To change the path you would need to change preferences or the routing design, not the PFE."
   ],
   [
    "A dual-RE router is about to have its primary Routing Engine replaced during a maintenance window. A junior engineer has been committing changes with plain `commit` for weeks. What should you check before the switchover, and which command should be used going forward?",
    "Check that the backup RE has the same configuration, for example by comparing it, because plain `commit` only commits on the RE you are logged into. Going forward, use `commit synchronize` so the backup RE always holds the same committed configuration and can take over cleanly."
   ]
  ],
  "tip": "The RE builds both tables but does not forward transit traffic. If an answer says the RE forwards packets between interfaces, it is describing the wrong component. Also remember lowest preference wins.",
  "check": [
   [
    "What is the difference between the routing table and the forwarding table?",
    "The routing table holds all learned routes from every source; the forwarding table holds only the active routes with resolved next hops and is copied to the PFE."
   ],
   [
    "Which daemon on the RE runs routing protocols?",
    "rpd, the routing protocol daemon."
   ],
   [
    "Which command shows RE CPU and memory usage?",
    "`show chassis routing-engine`."
   ],
   [
    "A prefix is learned by static route and by OSPF. Which becomes active by default and why?",
    "The static route, because its preference of 5 is lower than OSPF internal's 10, and lower preference wins on Junos."
   ]
  ]
 },
 {
  "t": "Packet Forwarding Engine (PFE): forwards transit traffic using the forwarding table copied from the RE",
  "hook": "Marcus is the lead engineer at Silverline Fiber, a small regional internet provider, and he has a maintenance window tonight to rework OSPF on the main aggregation router. The customer success manager is nervous. 'If you are changing the routing brain, does all customer traffic stop while you work?' she asks. Marcus has watched this router carry heavy evening streaming traffic while engineers typed away in the CLI, and nothing ever stuttered. But he also knows a bad change could still hurt customers. What is it about the way Junos divides its work that lets packets keep moving while the routing brain is busy, and what still depends on getting the change right?",
  "simple": "Inside a Junos device there is a part whose only job is moving data quickly. It is called the Packet Forwarding Engine. It does not think about which roads are best. Instead, it carries a printed list from the planning part of the router that says 'traffic for this address goes out that door.' When a packet arrives, the mover glances at the list, picks the matching line and sends the packet on, very fast, using special chips. It can also check simple rules on the way, like 'block traffic from this address.' It is like a toll booth worker with a rule sheet: they do not design the highways, they just read the sheet and wave each car to the right lane. If a car is headed for the toll office itself, the worker passes it inside instead.",
  "body": [
   "The Packet Forwarding Engine, or PFE, is the part of a Junos device that actually moves traffic. Where the Routing Engine (RE) thinks, the PFE acts. It receives packets on ingress interfaces, decides where each one goes using the forwarding table, applies any filters, policers and CoS (class of service) settings, and sends each packet out the correct egress interface, typically at line rate, meaning as fast as the interface can carry traffic. On the exam, the PFE represents the forwarding plane, and the RE represents the control plane.",
   "On most Juniper hardware the PFE is built from ASICs (application-specific integrated circuits) that Juniper designs, so lookups and forwarding happen in silicon rather than in general-purpose software. That is what lets one device forward enormous volumes of traffic. Modular chassis, such as larger MX Series routers, contain several line cards called FPCs (Flexible PIC Concentrators), and each FPC holds one or more PFEs. The physical ports sit on PICs (Physical Interface Cards) or directly on the line card. Interface names reflect this layout: in `ge-1/2/3`, 1 is the FPC slot, 2 is the PIC and 3 is the port. Smaller fixed-configuration devices may have a single PFE. On some SRX branch firewalls and on virtual platforms, forwarding runs in software on dedicated CPU cores, but the architecture and the terminology stay the same.",
   "The key point is that the PFE does not run routing protocols or choose best paths. The RE computes the forwarding table from its active routes and pushes a copy to each PFE over an internal link. When a transit packet arrives, the PFE performs a longest-prefix match: it compares the destination address against the forwarding table and chooses the most specific matching entry. A packet to 10.1.1.77 would match 10.1.1.0/24 rather than 10.0.0.0/8 if both exist. The PFE then finds the next hop and outgoing interface, rewrites the Layer 2 header, decrements the TTL (time to live) and transmits the packet. None of these steps involves the RE.",
   "Because the PFE has its own copy of the table, it keeps working even when the RE is busy. During Marcus's OSPF change, the RE recalculates routes and sends updates to the PFEs, which replace changed entries while forwarding continues with everything else. That said, the PFE forwards with whatever it was given. If a configuration change produces wrong routes, the PFE will faithfully forward along the wrong paths, which is why careful change control still matters.",
   "Several important features are enforced directly in the PFE, which is why they cost little performance. Firewall filters, Juniper's name for stateless packet filters similar to access control lists, are evaluated in the PFE. So are policers that limit traffic rates, CoS classification, queuing and rewrite rules, and sampling for flow monitoring. You configure all of these on the RE through the CLI, but when you commit, the configuration is compiled and installed into the PFE, which then applies it to every relevant packet. Exam questions sometimes suggest the RE inspects transit packets to apply filters; it does not.",
   "The PFE also decides which packets are not ordinary transit traffic. Packets addressed to one of the device's own IP addresses, packets whose TTL expires, some packets carrying IP options and similar exceptions are handed up to the RE over a deliberately rate-limited internal path. This protects the RE from being overwhelmed while letting the PFE carry the bulk of the load. A firewall filter on the loopback interface, lo0, is also evaluated in the PFE before host-bound packets go up to the RE, so unwanted management traffic can be dropped in hardware.",
   "Operational commands let you look at the PFE side of the device. `show route forwarding-table` displays what has been installed for forwarding, and you can narrow it with `destination` followed by a prefix. On modular systems, `show chassis fpc` shows the state, CPU and memory of each line card, and `show chassis fpc pic-status` lists the PICs and whether they are online. `show pfe statistics traffic` shows counters of packets the PFE has handled, including how many it sent to the RE, which helps when you suspect heavy host-bound traffic. `show interfaces ge-0/0/0 extensive` shows per-interface counters such as input errors and drops that originate in forwarding hardware.",
   "To summarize the division of labor: the RE decides, the PFE delivers. The RE builds the forwarding table; the PFE uses it. The RE holds the filter configuration; the PFE enforces it. Keeping that split clear will help you answer most architecture questions on the exam."
  ],
  "analogy": "The PFE is like a mail sorting machine in a large post office. Supervisors (the RE) decide which ZIP codes go to which trucks and load that table into the machine. The machine then reads each envelope and drops it into the right bin at high speed without asking a supervisor. Letters addressed to the post office itself get pulled aside for staff. The analogy breaks slightly because a real sorting machine might jam and stop everything, whereas a Junos PFE keeps forwarding even if the RE is temporarily busy.",
  "terms": [
   [
    "PFE",
    "Packet Forwarding Engine: the forwarding-plane component that forwards transit traffic using a copy of the forwarding table."
   ],
   [
    "ASIC",
    "Application-specific integrated circuit: custom silicon that performs lookups and forwarding at high speed."
   ],
   [
    "FPC",
    "Flexible PIC Concentrator: a line card in a modular Junos chassis that contains PFE hardware; its slot is the first number in an interface name."
   ],
   [
    "PIC",
    "Physical Interface Card: the module that provides the physical ports; its number is the middle value in names like ge-0/1/0."
   ],
   [
    "Firewall filter",
    "Juniper's stateless packet filter, configured on the RE and evaluated in the PFE, similar to an access control list."
   ],
   [
    "Longest-prefix match",
    "The forwarding lookup rule that selects the most specific matching entry for a destination address."
   ]
  ],
  "example": "An MX router forwards 100 Gbps of customer traffic while an engineer reconfigures OSPF. The new routes are computed on the RE and pushed to the PFEs, which update the changed entries in their forwarding tables. Throughout, the PFEs keep forwarding transit traffic and applying the customer-facing firewall filters and policers with no measurable slowdown. `show route forwarding-table destination 203.0.113.0/24` afterward confirms the new next hop is installed.",
  "mistakes": [
   [
    "The PFE runs OSPF and BGP to learn routes.",
    "Routing protocols run in rpd on the RE. The PFE only receives the finished forwarding table and uses it for lookups."
   ],
   [
    "Firewall filters are processed by the RE because that is where you configure them.",
    "You configure filters on the RE, but the commit installs them in the PFE, which evaluates them against packets in hardware."
   ],
   [
    "Pings and SSH to the router are forwarded by the PFE like any other traffic.",
    "Traffic addressed to the device itself is exception, or host-bound, traffic. The PFE passes it up to the RE over a rate-limited path."
   ],
   [
    "If the PFE has a forwarding table, configuration mistakes cannot affect traffic.",
    "The PFE forwards with whatever table the RE gives it. A bad routing change produces bad forwarding entries."
   ]
  ],
  "tryit": [
   [
    "A colleague says a new firewall filter on the customer-facing interface of a busy MX router will 'push the Routing Engine CPU to 100 percent because it has to check every packet.' Traffic on that interface is several gigabits per second. Should you expect RE CPU to rise sharply after the commit?",
    "No. The filter is compiled and installed in the PFE, which evaluates it in forwarding hardware. Transit packets never visit the RE, so its CPU should not change meaningfully. You might check `show chassis routing-engine` before and after to confirm, and `show firewall` to see filter counters incrementing in the PFE."
   ]
  ],
  "tip": "Firewall filters, policers and CoS are enforced in the PFE even though you configure them on the RE. If an answer says the RE inspects every transit packet, it is wrong.",
  "check": [
   [
    "Where does the PFE get its forwarding table?",
    "From the Routing Engine, which computes it from the active routes and pushes a copy to each PFE."
   ],
   [
    "Name two features the PFE enforces on transit traffic.",
    "Any two of: firewall filters, policers, CoS classification and queuing, rewrite rules and sampling."
   ],
   [
    "What does the PFE do with a packet addressed to the router itself?",
    "It sends it up to the Routing Engine as exception (host-bound) traffic over a rate-limited internal path."
   ],
   [
    "In the interface name xe-2/1/0, what does the 2 represent?",
    "The FPC (line card) slot number."
   ]
  ]
 },
 {
  "t": "Key daemons: rpd (routing), mgd (management/CLI), dcd (interfaces), chassisd (chassis)",
  "hook": "Monday morning at Cedar Valley Health, Jordan opens the overnight syslog summary and finds a line saying a process on the core router restarted at 3:17 a.m. The help desk got no calls. The hospital's imaging systems stayed reachable, and SSH sessions to the router never dropped. But OSPF neighbors logged a brief reset at the same minute. Jordan's manager wants to know what failed, whether patients were ever at risk, and whether it will happen again. To answer, Jordan needs to know which piece of Junos software crashed and what that piece is responsible for. How do you match a symptom to the right process, and why did one crash not take everything else down with it?",
  "simple": "Junos is not one giant program. It is a team of smaller programs, each with one job, called daemons. One daemon handles routing and talks to other routers. Another handles the command line and saving settings. Another sets up the network ports. Another watches the hardware, like fans and power supplies. Because each one runs separately, if one stumbles, the others keep working, and the system restarts the one that stumbled. It is like a restaurant kitchen with a grill cook, a salad cook, a dishwasher and a host. If the grill cook steps out for a minute, salads still get made and guests still get seated, and the manager gets the grill cook back to work quickly.",
  "body": [
   "Junos is built from many independent processes called daemons, each running in its own protected memory space on the Routing Engine (RE). Protected memory means one daemon cannot overwrite another's data, so a bug in one process is far less likely to corrupt the rest of the system. The exam focuses on four daemons: rpd, mgd, dcd and chassisd. Knowing what each does helps you read log messages, interpret `show system processes` output and predict what happens when something fails.",
   "rpd, the routing protocol daemon, runs every routing protocol, including OSPF (Open Shortest Path First), IS-IS (Intermediate System to Intermediate System), BGP (Border Gateway Protocol) and RIP (Routing Information Protocol). It also handles static routes, routing policy and route selection using preference. It maintains the routing tables, such as `inet.0`, and hands the active routes to the kernel, which builds the forwarding table and installs it in the Packet Forwarding Engine (PFE). If an OSPF adjacency is flapping or a BGP session will not establish, rpd is the process doing the work, and its trace and log output are where you look. You can restart it with `restart routing`, but on a production router this briefly resets routing adjacencies, so treat it as a last resort.",
   "mgd, the management daemon, is the heart of the user interface. Each CLI session you open communicates with mgd. It processes configuration changes, maintains the candidate configuration, and runs `commit`: it checks the candidate for syntax and consistency, saves it as the new active configuration, and then notifies the other daemons that the parts they care about have changed. When you type `commit check`, it is mgd that validates the candidate without activating it. mgd also serves NETCONF and other automation interfaces, which is why scripts and the CLI see the same configuration. A useful mental picture of a commit is a relay: you hand the candidate to mgd, mgd checks it and makes it active, and then mgd passes each section to the daemon that owns it, so interface changes go to dcd and protocol changes go to rpd.",
   "dcd, the device control daemon, configures and manages interfaces. When you commit changes under `[edit interfaces]`, dcd applies them: setting addresses, MTU (maximum transmission unit) values, encapsulation and logical units. It works with the kernel to create the interface entries that other processes, such as rpd, depend on. If an interface address you just committed does not appear in `show interfaces terse`, dcd is the daemon involved. Its restart command is `restart interface-control`.",
   "chassisd, the chassis daemon, manages the physical hardware: Routing Engines, line cards, power supplies, fans and temperature sensors. It detects when components are inserted or removed, powers them up and down, and raises chassis alarms. The results show up in `show chassis hardware`, which inventories components and serial numbers, `show chassis environment`, which reports temperatures and fan status, and `show chassis alarms`, which lists active alarms. Its restart command is `restart chassis-control`, which can briefly affect hardware and should be used with care.",
   "Other daemons exist and may appear in logs. snmpd handles SNMP (Simple Network Management Protocol); eventd handles system logging and event policies; alarmd manages alarms on some platforms. You do not need every daemon for the exam, but you should recognize the pattern: each feature has its own process, and log messages often name the process that produced them.",
   "The most important architectural point is independence. Suppose rpd crashes. The kernel notices and restarts it automatically. While it restarts, routing adjacencies reset and routes are relearned, but mgd keeps serving the CLI so you can still log in, chassisd keeps managing hardware, and the PFE keeps forwarding transit traffic using the last forwarding table it received. That is exactly what Jordan saw at Cedar Valley Health: SSH stayed up, imaging traffic flowed, and only OSPF briefly reset.",
   "When investigating, a few commands help. `show system processes extensive` lists running processes with their CPU use, memory and start times; a daemon with a very recent start time has probably restarted. `show system core-dumps` lists core files written when a process crashed, which Juniper support can analyze. `show log messages | match rpd` filters the main log for routing daemon messages. Combining these lets you name the process, the time and the effect, which is what a manager like Jordan's wants to hear."
  ],
  "analogy": "Think of the daemons as departments in a city hall. The planning office (rpd) decides on roads, the front desk (mgd) takes requests and files paperwork, the utilities crew (dcd) hooks up connections to buildings, and facilities (chassisd) keeps the heating, power and elevators running. If planning closes for an hour, the front desk still answers questions and the lights stay on. The analogy has limits: daemons share one RE's CPU and memory, so a runaway process can still slow the others.",
  "mnemonic": "Match the letters to the jobs: R-pd for Routing, M-gd for Management, D-cd for Device interfaces, Chassis-d for Chassis hardware. The first letter of each name tells you its job.",
  "terms": [
   [
    "Daemon",
    "A background process in Junos that performs one function, running in its own protected memory space."
   ],
   [
    "rpd",
    "Routing protocol daemon: runs routing protocols, policy and route selection, and maintains the routing tables."
   ],
   [
    "mgd",
    "Management daemon: serves the CLI and automation interfaces and processes configuration commits."
   ],
   [
    "dcd",
    "Device control daemon: configures and manages physical and logical interfaces."
   ],
   [
    "chassisd",
    "Chassis daemon: monitors and controls hardware components and raises chassis alarms."
   ],
   [
    "Core dump",
    "A file written when a process crashes, listed with `show system core-dumps`, used for root-cause analysis."
   ]
  ],
  "example": "A router logs that a process restarted unexpectedly. The engineer checks `show system core-dumps` and finds a recent rpd core file, and `show system processes extensive` shows rpd with a start time a few minutes old. OSPF neighbors reconverged, but SSH sessions, interfaces and hardware stayed up, and transit traffic kept flowing. The engineer opens a support case with the core file attached.",
  "mistakes": [
   [
    "If rpd crashes, you lose the CLI.",
    "The CLI is served by mgd, a separate process. You can still log in and run commands while rpd restarts."
   ],
   [
    "dcd runs routing protocols because routes use interfaces.",
    "dcd configures interfaces. Routing protocols are run by rpd."
   ],
   [
    "A daemon crash means the router stops forwarding traffic.",
    "The PFE keeps forwarding with its last forwarding table. Routing may reconverge, but transit forwarding does not simply stop."
   ],
   [
    "chassisd processes commits for hardware settings.",
    "All commits are processed by mgd, which then notifies chassisd, dcd, rpd and others of their relevant changes."
   ]
  ],
  "tryit": [
   [
    "After committing a new IP address on ge-0/0/2, you run `show interfaces terse` and the address is missing, while OSPF on other interfaces is fine and there are no hardware alarms. Which daemon is most directly involved, and what would you check?",
    "dcd, the device control daemon, applies interface configuration. Confirm the commit succeeded, check `show configuration interfaces ge-0/0/2` for typos, and look in `show log messages` for dcd errors. rpd and chassisd are unlikely to be the cause given healthy OSPF and no alarms."
   ],
   [
    "A fan tray fails on a router and a red alarm appears. Your teammate wants to run `restart routing` to clear it. Is that the right daemon?",
    "No. Fans and alarms are handled by chassisd, not rpd. Restarting routing would reset adjacencies and not fix a hardware fault. Check `show chassis alarms` and `show chassis environment`, then replace the fan tray."
   ]
  ],
  "tip": "Match the daemon to the symptom: routing problems point to rpd, CLI or commit problems to mgd, interface configuration to dcd and hardware alarms to chassisd.",
  "check": [
   [
    "Which daemon validates and applies a commit?",
    "mgd, the management daemon, which checks the candidate and signals other daemons to apply their parts of the configuration."
   ],
   [
    "Which daemon manages power supplies, fans and line cards?",
    "chassisd, the chassis daemon."
   ],
   [
    "What happens to the CLI if rpd crashes?",
    "It keeps working, because mgd is a separate process; rpd is restarted independently."
   ],
   [
    "Which command lists processes with their start times, helping you spot a recent restart?",
    "`show system processes extensive`."
   ]
  ]
 },
 {
  "t": "Transit traffic vs exception (host-bound) traffic and why exception traffic is rate-limited to the RE",
  "hook": "Elena runs the network for Brightwater School District, and a principal has just called: 'The internet is slow, and when I ping the main router it barely answers.' Elena pulls up the district's core router. Pings to its address show high delay and a few timeouts. Yet a quick test from a classroom laptop to a cloud learning platform beyond the router looks perfectly normal. A misbehaving device somewhere is spraying requests at the router's own address. Is the router failing, or is it doing exactly what it was designed to do? And how does it keep routing working while something hammers on its door?",
  "simple": "A router sees two kinds of traffic. Most traffic is just passing through on its way somewhere else, like cars driving through a town on the highway. The fast forwarding hardware handles those by itself. A small amount of traffic is meant for the router itself, like a ping to the router, a login, or messages from neighboring routers. That traffic has to go to the router's small onboard computer, which is much slower. To stop that small computer from being buried, the router only lets a limited amount of this traffic through to it at a time. It is like a busy office building: thousands of people walk through the lobby to other floors, but only a few at a time are allowed into the manager's office.",
  "body": [
   "Every packet a Junos device receives falls into one of two groups, and telling them apart is essential for understanding both performance and security. Transit traffic passes through the device on its way to somewhere else. Exception traffic needs attention from the Routing Engine (RE), either because it is addressed to the device itself or because the Packet Forwarding Engine (PFE) cannot finish handling it alone. The exam uses the terms exception traffic and host-bound traffic often, so it pays to be precise.",
   "Transit traffic is the vast majority of what a router carries. A web session between a student's laptop and a server on the internet, a video call between two offices, or a backup job between data centers all simply pass through. The PFE looks up the destination in its forwarding table, applies any firewall filters, policers and CoS (class of service) treatment, rewrites the Layer 2 header and sends the packet out. The RE never sees these packets, which is why transit performance depends on the forwarding hardware rather than on the RE's CPU (central processing unit).",
   "Exception traffic comes in several kinds. Host-bound traffic is addressed to one of the device's own IP addresses. That includes routing protocol packets such as OSPF (Open Shortest Path First) hellos and BGP (Border Gateway Protocol) updates, management sessions such as SSH (Secure Shell), SNMP (Simple Network Management Protocol) and NTP (Network Time Protocol), and pings sent to the router. A second kind is traffic that requires the RE to generate a response: when a transit packet's TTL (time to live) expires, the router may send back an ICMP (Internet Control Message Protocol) time-exceeded message, which is exactly what makes traceroute work. A third kind needs special processing, such as packets carrying certain IP options, or packets toward a next hop whose Layer 2 address must first be resolved with ARP (Address Resolution Protocol). Some control traffic, such as multicast routing protocol packets, also goes to the RE even though it is not addressed to a single router address.",
   "The path from the PFE up to the RE is deliberately limited. The RE is a general-purpose computer with far less packet-handling capacity than the PFE's ASICs (application-specific integrated circuits). If an attacker, a misconfigured monitoring tool or a network loop sent line-rate traffic at the router's own address, an unlimited path could saturate the RE's CPU. rpd, the routing protocol daemon, would be starved of time to send and process hellos, adjacencies would time out, routes would be withdrawn, and the problem would spread across the network. A busy RE can turn a local nuisance into a network-wide outage.",
   "Junos therefore rate-limits exception traffic on its way to the RE. On many platforms it goes further with per-protocol policing, commonly called DDoS (distributed denial of service) protection, which assigns separate limits to different types of host-bound traffic. With separate limits, a flood of one type, such as ICMP or SNMP, uses up only its own allowance and cannot crowd out OSPF or BGP packets. Policing happens in the PFE, before the excess ever reaches the RE, so the protection costs the RE nothing.",
   "Built-in rate limits are a safety net rather than a complete defense. They limit volume, but they do not decide which sources are legitimate, so a flood can still push out legitimate SSH or SNMP of the same type. You add that judgment yourself with a firewall filter applied as an input filter on the loopback interface, `lo0`. The PFE applies the lo0 filter to all host-bound traffic, regardless of which physical interface it arrived on, before sending it up. A well-built lo0 filter accepts only the protocols and sources the router needs, such as SSH from management subnets and BGP from configured peers, and discards everything else.",
   "This distinction matters a great deal when troubleshooting. A ping to the router measures exception handling, not transit forwarding. Slow or dropped pings to a busy router do not necessarily mean users are affected, because the router is protecting its RE by limiting how fast it answers. To judge forwarding performance, test through the router to a host on the other side, not to the router itself. Likewise, a traceroute that shows high delay or asterisks at one hop may simply mean that router de-prioritizes generating ICMP replies, while traffic passing through it is fine.",
   "In Elena's case, the right reading is that the router is working as designed. Transit traffic is unaffected, the rate limits keep routing protocols healthy, and the next step is to find the noisy device and tighten the lo0 filter so only approved hosts can reach the router's management services."
  ],
  "analogy": "Picture a large hospital. Thousands of visitors pass through the main corridor to reach wards and clinics; that is transit traffic, and the corridors handle it easily. A few people need to see the chief of medicine directly; that is exception traffic. The chief's assistant lets in only so many visitors per hour and screens names against an approved list, like rate limits plus a lo0 filter. The analogy breaks a little because a real assistant can judge urgency, while Junos rate limits only count packets unless your filter adds rules.",
  "terms": [
   [
    "Transit traffic",
    "Packets that pass through the device to another destination, forwarded entirely by the PFE."
   ],
   [
    "Exception traffic",
    "Packets the PFE sends to the RE, including host-bound traffic and packets that need special handling, such as TTL expiry."
   ],
   [
    "Host-bound traffic",
    "Traffic addressed to the device itself, such as routing protocols, SSH, SNMP, NTP or pings to the router."
   ],
   [
    "DDoS protection",
    "Per-protocol policing on many Junos platforms that limits how much of each exception traffic type reaches the RE."
   ],
   [
    "lo0 input filter",
    "A firewall filter on the loopback interface that the PFE applies to all host-bound traffic before it reaches the RE."
   ]
  ],
  "example": "A misconfigured monitoring server starts sending thousands of SNMP requests per second to a core router. Transit traffic is unaffected, but SNMP responses slow down and some time out. Because exception traffic is rate-limited, OSPF and BGP keepalives still get through and adjacencies stay up. The engineer identifies the source with `show log messages` and interface counters, then updates the lo0 filter to accept SNMP only from approved management hosts.",
  "mistakes": [
   [
    "Slow pings to a router prove the router is slow at forwarding traffic.",
    "Pings to the router are exception traffic, rate-limited on their way to the RE. Test through the router to measure forwarding."
   ],
   [
    "Traceroute replies are transit traffic.",
    "The ICMP time-exceeded replies that traceroute relies on are generated by the RE, so they are exception traffic."
   ],
   [
    "The rate limit on host-bound traffic is a complete security control, so a lo0 filter is unnecessary.",
    "Rate limits cap volume but do not tell good sources from bad. A lo0 filter decides which sources and protocols are allowed."
   ],
   [
    "A ping through the router to a server is host-bound because it uses ICMP.",
    "Protocol does not decide the category; the destination does. ICMP to a host beyond the router is transit traffic."
   ]
  ],
  "tryit": [
   [
    "During a network audit at Brightwater, a consultant runs traceroute to a cloud server and sees the third hop, your core router, showing 300 ms while hops four through ten show 20 ms. The consultant writes 'core router adding 300 ms of latency' in the report. Is that conclusion correct?",
    "Probably not. The third hop's time measures how quickly that router's RE generated an ICMP time-exceeded reply, which is rate-limited exception traffic. Because later hops show low latency, packets passing through the core router are forwarded quickly. The consultant should test through the router, not judge it by its own replies."
   ],
   [
    "You are writing a lo0 filter for a router that runs OSPF and BGP, is managed by SSH from 10.99.0.0/24 and polls an NTP server. A teammate suggests a single term that accepts everything from your internal 10.0.0.0/8 range. Why is that a weak design?",
    "It trusts every internal host for every protocol, so a compromised or misconfigured internal device could still flood or probe the RE. Better to accept only the specific protocols from specific sources: OSPF from neighbors, BGP from configured peers, SSH from 10.99.0.0/24 and NTP from the NTP server, then discard the rest."
   ]
  ],
  "tip": "Traceroute replies, pings to the router and routing protocol packets are all exception traffic. A ping through the router to a host on the other side is transit traffic. Destination decides the category, not protocol.",
  "check": [
   [
    "Is an OSPF hello received from a neighbor transit or exception traffic?",
    "Exception (host-bound) traffic, because it is addressed to the router and must be processed by rpd on the RE."
   ],
   [
    "Why does Junos rate-limit traffic sent from the PFE to the RE?",
    "To stop floods of host-bound traffic from overwhelming the RE's CPU and disrupting routing protocols and management."
   ],
   [
    "Why can a slow ping to a router be misleading?",
    "Pings to the router are exception traffic handled by the RE at a limited rate, so they do not reflect how fast the PFE forwards transit traffic."
   ],
   [
    "What does a lo0 filter add that built-in rate limits do not?",
    "It decides which protocols and sources are allowed, rather than only limiting how much traffic reaches the RE."
   ]
  ]
 },
 {
  "t": "Junos OS vs Junos OS Evolved (FreeBSD-based vs Linux-based)",
  "hook": "Tomas has just joined the network team at Lakeshore Logistics, which is adding a new high-capacity router to its data center next to the older routers already in place. The purchase order says the new box runs 'Junos OS Evolved.' Tomas spent months learning Junos for his certification and now worries he has to start over with a new command set, new configuration syntax and new procedures. His team lead laughs and says most of his skills will carry straight across, but that a few things underneath really are different. What actually changes between Junos OS and Junos OS Evolved, and what stays exactly the same?",
  "simple": "Juniper makes two versions of its router software. Both look and feel the same to you: you log in, type the same commands and write the same settings. The difference is underneath, in the foundation each version is built on. The older, classic version sits on top of an operating system called FreeBSD. The newer version, called Evolved, sits on top of Linux, which lets Juniper organize the software in a more modern way. It is like two cars with identical dashboards, steering wheels and pedals, but different engines under the hood. You drive them the same way, even though a mechanic would see big differences when the hood is open.",
  "body": [
   "Juniper maintains two variants of its network operating system. Classic Junos OS is built on a FreeBSD kernel; FreeBSD is an open-source, Unix-like operating system, and it has been the base of Junos for most of Juniper's history. Junos OS Evolved is a newer variant built on Linux and used on a subset of newer platforms. The JNCIA-Junos exam expects you to know the difference in foundation and to understand that the operator experience is deliberately kept the same.",
   "Start with classic Junos OS. Its daemons, such as rpd (routing protocol daemon), mgd (management daemon), dcd (device control daemon) and chassisd (chassis daemon), run as FreeBSD processes on the Routing Engine. If you drop from the CLI to the underlying shell with `start shell`, you find yourself in a FreeBSD environment with familiar Unix commands. On many newer hardware platforms, classic Junos OS itself runs as a virtual machine on top of a Linux-based host, but from the operator's point of view it is still FreeBSD-based Junos, and the exam treats it that way.",
   "Junos OS Evolved runs natively on Linux. Its internal architecture changes how the software is organized underneath. Applications run as native Linux processes. System state, such as interface status and routes, is kept in a distributed database that applications publish to and subscribe from, rather than being passed only directly between processes. Because components are more loosely coupled, they can be restarted or upgraded more independently. Juniper's stated goals include higher availability, easier integration of third-party Linux applications and a more modern software base.",
   "You can tell which variant a device runs by looking at the software release. Release names for Junos OS Evolved typically carry an EVO tag, so `show version` on an Evolved device shows a release string that includes it, while a classic device shows a release without it. The same command also shows the hostname and model. Juniper's hardware documentation for each model states which variant it supports, which is the authoritative way to check before you buy or upgrade.",
   "For operators, and for the exam, the most important fact is what does not change. Junos OS Evolved keeps the same CLI, with operational mode (`>`) and configuration mode (`#`). It keeps the same hierarchical configuration, the same commit model with a candidate configuration and an active configuration, the same rollback history and rescue configuration, and the same automation interfaces such as NETCONF. Commands like `show interfaces terse`, `show route`, `configure`, `show | compare`, `commit check` and `commit confirmed` work the same way. An OSPF configuration written for an MX router can be applied to an Evolved router with the same `set` commands, assuming the interfaces exist.",
   "Some details do differ in practice, and it helps to know where. Software packages are different files, so you cannot install a classic Junos image on an Evolved platform or the reverse. Shell-level troubleshooting looks different because the shell is Linux rather than FreeBSD, and some low-level commands and process names differ. A few features may be available on one variant before the other. None of that changes the everyday CLI workflow the exam focuses on. In practice, an engineer moving to an Evolved platform reads the release notes for that platform, confirms the features the network depends on are supported, and uses the matching software package when upgrading. The configuration skills, verification commands and safe change habits built on classic Junos carry over unchanged.",
   "Which one you meet depends on the hardware. Junos OS Evolved is used on some newer platforms in the PTX, ACX and QFX families, while MX Series routers, EX Series switches and SRX Series firewalls largely run classic Junos OS. Product lines change over time, so rely on Juniper's documentation for a specific model rather than a memorized list. For the exam, you only need the big picture: which kernel each variant uses and that the operator experience is shared.",
   "A useful way to summarize the difference is this: same user interface and configuration model, different kernel and internal architecture. When an exam question contrasts the two, FreeBSD goes with Junos OS and Linux goes with Junos OS Evolved, and any answer suggesting that Evolved needs a different CLI or configuration syntax is a distractor."
  ],
  "analogy": "Junos OS and Junos OS Evolved are like the same smartphone app running on two different phone operating systems. The buttons, menus and saved settings look identical, and you use the app the same way on either phone. Underneath, each version is built differently to fit its platform, and you cannot install one phone's version on the other. The analogy stops working if you take it too far: Juniper changed more than packaging, since Evolved also reorganizes internal state into a distributed database.",
  "terms": [
   [
    "Junos OS",
    "The classic Juniper network operating system, built on a FreeBSD kernel."
   ],
   [
    "Junos OS Evolved",
    "A Linux-based variant of Junos with a more distributed internal architecture and the same CLI and configuration model."
   ],
   [
    "FreeBSD",
    "A Unix-like open-source operating system that is the base of classic Junos OS."
   ],
   [
    "Linux",
    "The open-source operating system kernel that Junos OS Evolved runs on natively."
   ],
   [
    "show version",
    "Operational command that shows the model, hostname and running software release; Evolved releases carry an EVO tag."
   ],
   [
    "start shell",
    "Operational command that leaves the Junos CLI for the underlying operating system shell."
   ]
  ],
  "example": "An engineer manages both an MX router and a newer PTX router. On both she runs `show version` and sees the release; the PTX's release string includes EVO. Her OSPF configuration, firewall filters and `commit confirmed` workflow are identical on both, so her change procedure does not need to be rewritten. The only difference she notices is when she runs `start shell` for deep troubleshooting and finds a Linux environment on the PTX.",
  "mistakes": [
   [
    "Junos OS Evolved uses a new CLI and different configuration syntax.",
    "Evolved keeps the same CLI, configuration hierarchy, commit model and rollback. The difference is the underlying operating system and architecture."
   ],
   [
    "Classic Junos OS is based on Linux and Evolved is based on FreeBSD.",
    "It is the reverse: classic Junos OS is FreeBSD-based, and Junos OS Evolved is Linux-based."
   ],
   [
    "You can install either software image on any Juniper device.",
    "Each platform supports a specific variant, and the software packages are different. Check the hardware documentation for the model."
   ],
   [
    "Because some classic Junos devices run on a Linux host, they are Junos OS Evolved.",
    "On those platforms classic Junos still runs as FreeBSD-based Junos inside a virtual machine. Evolved runs natively on Linux."
   ]
  ],
  "tryit": [
   [
    "Your company is replacing a core router with a platform that runs Junos OS Evolved. The change team asks whether they must rewrite all of their saved configuration snippets and their commit procedure, which uses `commit check`, `show | compare` and `commit confirmed`. What do you tell them?",
    "The configuration syntax and commit workflow are the same on Junos OS Evolved, so the snippets and procedure carry over, subject to interface names and features matching the new hardware. They should verify feature support for the specific platform and use the correct Evolved software package for upgrades, but they do not need a new CLI procedure."
   ]
  ],
  "tip": "If an answer says Junos OS Evolved needs a different CLI or configuration syntax, it is wrong. The difference is the underlying OS: FreeBSD for Junos OS, Linux for Evolved.",
  "check": [
   [
    "Which kernel is classic Junos OS based on?",
    "FreeBSD."
   ],
   [
    "What stays the same between Junos OS and Junos OS Evolved?",
    "The CLI, configuration hierarchy, commit and rollback model and automation interfaces such as NETCONF."
   ],
   [
    "How can you tell which variant a device runs?",
    "Check `show version`; Evolved releases are identified with an EVO tag in the release name, and the platform documentation lists which variant it supports."
   ],
   [
    "Name one goal of the Junos OS Evolved architecture.",
    "Any of: higher availability, more independent restarts and upgrades of components, easier integration of third-party Linux applications, a more modern software base."
   ]
  ]
 },
 {
  "t": "Protecting the RE with a filter on the lo0 interface",
  "hook": "Rafael manages the edge router for Pinecrest Credit Union, and this week's security review has flagged it: the router answers SSH login prompts from anywhere on the internet, and its logs show thousands of failed login attempts every night from addresses nobody recognizes. The auditor wants it fixed before Friday. Rafael knows he could add a filter to every interface one by one, but the router has a dozen interfaces and more are coming. He also knows that one wrong filter on a remote router could lock him out entirely and take down BGP with the credit union's internet providers. How do you protect the router itself with a single filter, without cutting off the very traffic it needs to survive?",
  "simple": "A router has a small built-in computer that runs its brain: logins, settings and conversations with other routers. That computer is easy to overwhelm and needs a guard at the door. In Junos, you place that guard on a special virtual interface called the loopback, lo0, which stands for the router itself. Any traffic aimed at the router, no matter which port it came in on, must pass that guard. The guard has a list of allowed visitors, such as the IT team's laptops and the neighboring routers, and turns everyone else away. It is like a front desk in an office building: one desk checks every visitor heading to the executive floor, instead of putting a guard at every entrance.",
  "body": [
   "The Routing Engine (RE) is the one part of a Junos device that attackers and misconfigured systems can overload with relatively little traffic, because it is a general-purpose computer with limited packet-handling capacity. Juniper's standard defense is a firewall filter applied to the loopback interface, `lo0`. Because of how Junos handles host-bound traffic, a filter on lo0 inspects every packet headed to the RE, no matter which physical interface it arrived on. Built-in rate limits on exception traffic protect the RE from sheer volume, but only a filter can decide which sources and protocols are allowed.",
   "Why lo0 rather than every physical interface? The loopback interface represents the router itself. When you apply an input filter to `lo0.0`, the Packet Forwarding Engine (PFE) evaluates it against every packet destined for the RE, whether it came in on ge-0/0/0, xe-1/0/3 or an interface added next year. You write one filter in one place instead of repeating it on every interface and remembering to add it to new ones. Transit traffic is not affected, because transit packets never go to the RE. Because the PFE evaluates the filter, unwanted packets are dropped in forwarding hardware before they ever consume RE CPU (central processing unit) time.",
   "A firewall filter is made of ordered terms. Each term has `from` conditions, which are match criteria such as source address, destination port or protocol, and `then` actions, such as `accept`, `discard`, `reject`, `count` or `log`. Junos evaluates terms from top to bottom and stops at the first term that matches. If no term matches, the packet hits an implicit final action of discard. That implicit discard is the most important thing to remember about firewall filters: anything you forget to allow is silently dropped. A term with no `from` clause matches every packet, which is how you write an explicit catch-all at the end.",
   "A good RE protection filter therefore lists everything the router legitimately needs, and nothing more. Typical terms accept SSH (Secure Shell) only from management subnets, BGP (Border Gateway Protocol) only from configured peers, OSPF (Open Shortest Path First) from neighbors, NTP (Network Time Protocol) and SNMP (Simple Network Management Protocol) from known servers, DNS (Domain Name System) replies, and ICMP (Internet Control Message Protocol), often limited with a policer so pings cannot flood the RE. Remember that replies to sessions the router itself starts, such as DNS lookups or NTP queries, also arrive as host-bound traffic and must be allowed. A final term counts and discards everything else, so you can see what is being dropped. Prefix lists, which are named address lists defined under `policy-options`, make the filter much easier to maintain, since you update the list instead of the filter.",
   "```\nset policy-options prefix-list MGMT 10.99.0.0/24\nset policy-options prefix-list BGP-PEERS 192.0.2.1/32\nset firewall family inet filter PROTECT-RE term ssh from source-prefix-list MGMT\nset firewall family inet filter PROTECT-RE term ssh from protocol tcp\nset firewall family inet filter PROTECT-RE term ssh from destination-port ssh\nset firewall family inet filter PROTECT-RE term ssh then accept\nset firewall family inet filter PROTECT-RE term bgp from source-prefix-list BGP-PEERS\nset firewall family inet filter PROTECT-RE term bgp from protocol tcp\nset firewall family inet filter PROTECT-RE term bgp from port bgp\nset firewall family inet filter PROTECT-RE term bgp then accept\nset firewall family inet filter PROTECT-RE term ospf from protocol ospf\nset firewall family inet filter PROTECT-RE term ospf then accept\nset firewall family inet filter PROTECT-RE term icmp from protocol icmp\nset firewall family inet filter PROTECT-RE term icmp then accept\nset firewall family inet filter PROTECT-RE term deny-rest then count DROPPED\nset firewall family inet filter PROTECT-RE term deny-rest then discard\nset interfaces lo0 unit 0 family inet filter input PROTECT-RE\n```",
   "Read the example from top to bottom the way the PFE does. SSH is accepted only from the MGMT prefix list, so the internet-wide login attempts in Rafael's logs would fall through to the last term. BGP is accepted only from the listed peer. OSPF and ICMP are accepted from anywhere in this simple version; production filters usually narrow these too. The `deny-rest` term has no `from` clause, so it matches everything left, counts it in the DROPPED counter and discards it. The final line applies the filter as an input filter to unit 0 of lo0 under `family inet`.",
   "Applying this kind of filter is the classic way to lock yourself out of a remote router, so procedure matters as much as syntax. Review the change with `show | compare`, then commit it with `commit confirmed` and a short timer, such as `commit confirmed 5`. If you lose access or routing breaks, Junos automatically rolls back to the previous configuration when the timer expires. Test from your management host, check that BGP and OSPF neighbors are still up with `show bgp summary` and `show ospf neighbor`, and only then confirm with a plain `commit`.",
   "After deployment, monitor the filter. `show firewall filter PROTECT-RE` displays counter values, so you can see how many packets the DROPPED counter has caught; a steadily rising counter is normal on an internet-facing router, while a sudden jump may signal a scan or a missing term. Finally, remember that a `family inet` filter protects only IPv4. If the router has IPv6 addresses, it needs a separate filter under `family inet6` applied to lo0 as well, or IPv6 host-bound traffic remains unprotected."
  ],
  "analogy": "A lo0 filter is like the reception desk on the executive floor of an office tower. Visitors may enter through any of the building's doors, but anyone heading to the executives must pass that one desk, which checks a guest list in order and turns away anyone not on it. People just passing through the lobby to other floors never see the desk. Where the analogy fails: a receptionist might use judgment for an unlisted visitor, but a Junos filter silently discards anything not explicitly accepted.",
  "terms": [
   [
    "lo0",
    "The loopback interface, representing the device itself; an input filter on it applies to all host-bound traffic."
   ],
   [
    "Firewall filter term",
    "One rule in a filter, with `from` match conditions and `then` actions, evaluated in order from top to bottom."
   ],
   [
    "Implicit discard",
    "The hidden final action of every Junos firewall filter that drops packets matching no term."
   ],
   [
    "Prefix list",
    "A named list of prefixes under `policy-options` that filters and policies can reference."
   ],
   [
    "commit confirmed",
    "A commit that rolls back automatically unless confirmed with another commit within a set number of minutes."
   ],
   [
    "Policer",
    "A rate limiter that can be called from a filter term to cap traffic such as ICMP to the RE."
   ]
  ],
  "example": "An engineer applies an RE filter allowing SSH and ICMP but forgets OSPF. She uses `commit confirmed 5`. Within a minute OSPF neighbors drop because hellos match no term and hit the implicit discard, and the DROPPED counter climbs. She simply waits; after five minutes Junos rolls back, the adjacencies return, and she adds the missing OSPF term, reviews with `show | compare` and tries again.",
  "mistakes": [
   [
    "You must apply the RE protection filter to every physical interface.",
    "An input filter on lo0 is applied to all host-bound traffic regardless of ingress interface. One filter protects the RE everywhere."
   ],
   [
    "Traffic that matches no term is accepted by default.",
    "Every Junos firewall filter ends with an implicit discard. Anything you forget to allow is dropped."
   ],
   [
    "The lo0 filter also protects hosts behind the router.",
    "It applies only to traffic destined for the RE. Transit traffic is filtered only by filters on the interfaces it crosses."
   ],
   [
    "A family inet filter on lo0 protects the router's IPv6 addresses too.",
    "IPv6 host-bound traffic needs its own filter under family inet6 applied to lo0."
   ]
  ],
  "tryit": [
   [
    "You are about to apply a new lo0 filter on a router 300 miles away that has two BGP peers and an OSPF backbone. Your filter accepts SSH from your management subnet, BGP from both peers and ICMP. You have not added a term for OSPF yet but plan to 'add it later.' What will happen if you commit, and how should you proceed?",
    "OSPF hellos will match no term, hit the implicit discard, and OSPF adjacencies will drop, which may break routing and even your path to the router. Add the OSPF term first, review with `show | compare`, commit with `commit confirmed` and a short timer, verify neighbors and management access, then confirm."
   ],
   [
    "After deploying a lo0 filter, `show firewall filter PROTECT-RE` shows the DROPPED counter rising quickly, and the NTP status on the router shows it cannot reach its time server. What is the likely cause?",
    "NTP replies from the time server are host-bound traffic and probably match no accept term, so the implicit or explicit discard drops them. Add a term accepting NTP from the time server's address and recommit with `commit confirmed`."
   ]
  ],
  "tip": "The filter goes on lo0 as an input filter under the family you want to protect (inet, inet6). Forgetting routing protocols, or forgetting that there is an implicit discard, is the usual trap. Always use commit confirmed.",
  "check": [
   [
    "Why apply the RE protection filter to lo0 instead of each physical interface?",
    "Because a lo0 input filter is applied to all traffic destined for the RE regardless of ingress interface, so one filter protects the RE everywhere."
   ],
   [
    "What happens to host-bound traffic that matches no term?",
    "It is discarded by the implicit final discard action of the filter."
   ],
   [
    "Does the lo0 filter affect transit traffic?",
    "No. It only applies to traffic destined for the Routing Engine; transit traffic is filtered only by filters on the interfaces it crosses."
   ],
   [
    "Which command shows the counters for a filter named PROTECT-RE?",
    "`show firewall filter PROTECT-RE`."
   ]
  ]
 },
 {
  "t": "Boot sequence and storage: primary/backup media, snapshots",
  "hook": "A summer thunderstorm knocks out power to the Redfield Library branch, and when the lights come back, the branch's Juniper firewall boots up with a red alarm on the console. Sam, the county's only network technician, drives out with a laptop and a console cable. The firewall is passing traffic, but the alarm says it booted from its backup media. Sam remembers that a few months ago, after the last software upgrade, a contractor ran some command he did not fully understand. Whether the library stays online this week depends on what that contractor did. What does 'booted from backup media' really mean, and what makes the difference between a calm visit and an emergency?",
  "simple": "A Junos device starts up a lot like a computer. It looks for its software on its main storage, loads it, and then loads its saved settings. Most devices also have a second place to boot from, a spare copy, in case the main storage gets damaged. If the main copy will not start, the device tries the spare and turns on a warning light so you know. The spare only helps if it holds a good, up-to-date copy, and that is what a snapshot is for: it copies the working software and settings onto the spare. It is like keeping a second set of house keys at a neighbor's. They only help if they still fit the lock after you change it.",
  "body": [
   "A Junos device boots from storage much like a PC, and knowing the order helps you recover when something goes wrong, such as a corrupted disk after a power outage or a failed software upgrade. The JNCIA-Junos exam looks for three ideas: devices have primary and backup boot media, the boot process follows a predictable order, and snapshots keep the backup media useful.",
   "Most Junos devices have more than one place they can boot from. The primary boot device is usually internal flash memory or an SSD (solid-state drive). Alternates may include a second internal disk, a second partition on the same device, an arrangement that some platforms call dual-root partitioning, or a USB storage device. On power-up, the system firmware and boot loader try these devices in a set order. Normally the primary device is used. If it is missing, or the software on it is corrupted, the device tries the backup media instead. When a device boots from backup media, Junos raises an alarm, and you see it in `show chassis alarms` or `show system alarms` depending on the platform. That alarm is your signal that the primary needs attention, even if everything appears to work.",
   "After the loader finds a valid image, the rest of the sequence unfolds in layers. The Junos kernel starts, then the init process launches the daemons. mgd (management daemon) loads the active configuration, which is stored as the compressed file `/config/juniper.conf.gz`. dcd (device control daemon) brings up interfaces, rpd (routing protocol daemon) starts routing protocols, and chassisd (chassis daemon) brings hardware components online. Only after these steps does the device begin passing traffic based on its configuration. If the active configuration cannot be loaded, for example because the file is damaged, the device can fall back to the rescue configuration if one has been saved.",
   "A snapshot is a copy of the currently running software and configuration onto another storage device or partition. Its purpose is simple: make sure the backup boot media contains a known-good system rather than an old release or nothing at all. The command is `request system snapshot`, with options that depend on the platform. On dual-partition platforms, such as many SRX Series branch firewalls and EX Series switches, you may use `request system snapshot slice alternate` to copy the running partition to the other one. `show system snapshot` shows what the backup media currently holds, so you can confirm the copy succeeded and matches the running release.",
   "Timing matters. Upgrading software typically changes what the primary media runs but does not automatically update the backup. If you upgrade and never take a snapshot, the backup may still hold the old release, or a release from years ago, and booting from it after a failure could bring up unexpected behavior or a configuration that no longer matches. The best practice is to take a snapshot after a successful upgrade and after you have verified that the new release works, so both boot media hold the same good system. Taking a snapshot before verification risks copying a broken system onto your only spare.",
   "Several related commands help with boot and storage. `show system storage` displays free space on each file system; low space is a common reason software upgrades fail, and `request system storage cleanup` removes old log files, temporary files and crash files to recover space. It lists what it plans to delete and asks for confirmation. `request system configuration rescue save` saves the current active configuration as the rescue configuration, which you can reload later with `rollback rescue` in configuration mode followed by a commit. `request system reboot` and `request system halt` restart or shut down the system cleanly; on some platforms the reboot command accepts options to boot from particular media. Pulling the power instead of halting can corrupt storage, which is exactly how the backup media ends up being needed.",
   "Keep snapshots and rescue configurations separate in your mind, because exam questions often blur them. A snapshot copies software and configuration to backup media so the device can boot. A rescue configuration is only a configuration file, a known-good fallback you can load when a configuration change goes badly; it does nothing to help if the primary storage fails. Rollback files, numbered from 0 for the active configuration upward, are a third, separate safety net for undoing recent commits.",
   "A good operational habit ties these together. Before an upgrade, save a rescue configuration and check storage space. Perform the upgrade, then verify interfaces, routing and services. Once you are satisfied, take a snapshot so both boot media match. In the Redfield Library story, a contractor who followed that habit is the reason Sam's visit is calm: the alternate partition holds the current release and configuration, and the branch stays online while a replacement is planned."
  ],
  "analogy": "Primary and backup boot media are like a pilot and copilot. Normally the pilot flies, but if the pilot cannot, the copilot takes over and the cabin crew is alerted. A snapshot is the briefing that makes sure the copilot knows the current flight plan rather than last year's route. The analogy breaks down because a copilot can catch up mid-flight, whereas backup media holds only what you last copied to it.",
  "terms": [
   [
    "Primary boot media",
    "The storage device the system normally boots Junos from, typically internal flash or an SSD."
   ],
   [
    "Backup boot media",
    "Alternate storage, such as a second partition, disk or USB device, used when the primary fails; booting from it raises an alarm."
   ],
   [
    "Snapshot",
    "A copy of the running software and configuration to backup media, made with `request system snapshot`."
   ],
   [
    "Rescue configuration",
    "A saved known-good configuration file, created with `request system configuration rescue save` and restored with `rollback rescue`."
   ],
   [
    "juniper.conf.gz",
    "The compressed file in /config that holds the active configuration."
   ],
   [
    "request system storage cleanup",
    "Operational command that removes old logs and temporary files to free storage space, after confirmation."
   ]
  ],
  "example": "An SRX branch firewall's primary partition becomes corrupted after a power outage. On reboot it boots from the alternate partition and raises an alarm. Because the administrator had run `request system snapshot slice alternate` after the last verified upgrade, the alternate holds the current release and configuration, and the site stays online while a replacement is planned. `show system snapshot` confirms what the alternate media contains.",
  "mistakes": [
   [
    "A rescue configuration lets the device boot if the primary storage fails.",
    "A rescue configuration is only a configuration file. Booting from backup media requires a snapshot of software and configuration on that media."
   ],
   [
    "Upgrading the software automatically updates the backup boot media.",
    "An upgrade typically changes only what the primary runs. You must take a snapshot to copy the new system to the backup media."
   ],
   [
    "Take the snapshot immediately before verifying the upgrade, to save time.",
    "Snapshot after verification, so you never copy a broken system onto your only backup."
   ],
   [
    "If the device is passing traffic after booting from backup, nothing needs to be done.",
    "The alarm means the primary media has a problem. Investigate and repair or replace it, then restore matching snapshots."
   ]
  ],
  "tryit": [
   [
    "You upgraded a switch to a new release last week, verified it, and moved on without taking a snapshot. Today a colleague asks whether the switch is protected if its primary media fails tonight. What do you tell them, and what do you do?",
    "Not fully. The backup media likely still holds the old release and an older configuration, so a failover would boot unexpected software. Check with `show system snapshot`, then run `request system snapshot` (or `slice alternate` on dual-partition platforms) now that the release is verified."
   ],
   [
    "An upgrade fails partway with a message about insufficient space. What should you check and run before trying again?",
    "Check free space with `show system storage`, then run `request system storage cleanup` to remove old logs and temporary files, review the list it shows, confirm, and retry the upgrade."
   ]
  ],
  "tip": "Snapshots copy software and configuration to backup media for booting; the rescue configuration is only a configuration file. Keep the two apart in exam answers.",
  "check": [
   [
    "What does a device do if its primary boot media fails?",
    "It tries the backup (alternate) boot media and, if it boots from there, raises an alarm."
   ],
   [
    "Why take a snapshot after a successful upgrade?",
    "So the backup media contains the same known-good software and configuration, allowing a clean boot if the primary fails."
   ],
   [
    "Which command saves the current configuration as the rescue configuration?",
    "`request system configuration rescue save`."
   ],
   [
    "Where is the active configuration stored on the file system?",
    "In `/config/juniper.conf.gz`."
   ]
  ]
 },
 {
  "t": "CLI modes: operational (`>`) and configuration (`#`); entering with `configure`, `configure private`, `configure exclusive`",
  "hook": "It is Thursday evening at Oakridge Manufacturing, and two engineers are logged into the same plant router. Dana is halfway through adding a new VLAN interface for the packaging line, typing carefully and planning to finish after a quick check. Meanwhile Lee, working on an unrelated SNMP change, types `commit` and goes home. The next morning, the packaging line's half-built interface is live with the wrong address, and the plant's labeling printers cannot reach their server. Nobody broke a rule on purpose. Both simply typed `configure` and started editing. How did Lee's commit push Dana's unfinished work, and which way of entering configuration mode would have prevented it?",
  "simple": "The Junos command line has two main rooms. In the first room, the 'look and do' room, you check how things are running, test connections and restart things, but you cannot change settings. Its prompt ends with a greater-than sign, `>`. In the second room, the 'change settings' room, you edit the device's settings, and its prompt ends with a hash sign, `#`. There are three doors into the settings room. The plain door means everyone shares one notepad of changes. The exclusive door locks the notepad so others cannot save. The private door gives you your own notepad. It is like editing a shared document: everyone typing in one copy, one person locking it, or each person working on their own copy and merging later.",
  "body": [
   "The Junos CLI (command-line interface) has two main modes, and nearly everything you do starts with knowing which one you are in. Operational mode is for monitoring and managing the device: viewing status, running tests, restarting processes and upgrading software. Configuration mode is for changing the configuration. The prompt tells you which mode you are in: `user@router>` means operational mode and `user@router#` means configuration mode. In configuration mode, Junos also prints an `[edit]` banner above the prompt that shows your position in the configuration hierarchy.",
   "When you log in as a normal user, you land in operational mode. If you log in as the root user at the console, you start at a Unix shell prompt ending in `%`, and you type `cli` to get to operational mode; this three-level ladder of shell, operational mode and configuration mode is worth recognizing. Operational commands include `show` to display status, `clear` to reset counters or tables, `ping` and `traceroute` to test reachability, `monitor` to watch logs or interface traffic live, `request` for system actions such as rebooting or installing software, `restart` to restart daemons and `file` to manage files. You also type `configure` here to enter configuration mode.",
   "Configuration changes in Junos do not take effect as you type. You edit a candidate configuration, a working copy, and nothing changes on the device until you `commit`, which validates the candidate and makes it the active configuration. That design is what makes the three ways of entering configuration mode matter: they differ in how the candidate is shared with other users who are editing at the same time. You can see who is logged in with the operational command `show system users`, and Junos prints a list of other users editing the configuration when you enter configuration mode. On a device managed by a team, checking for other editors before you start is a simple habit that prevents surprises.",
   "Plain `configure` opens the shared candidate configuration. Everyone who enters with plain `configure` edits the same candidate. When anyone commits, all changes in that candidate are committed, including other users' unfinished ones. Junos does warn you when others are editing, listing who they are and noting that the configuration has been changed but not committed, but it does not stop you. This is exactly what happened at Oakridge: Lee's commit activated Dana's half-finished interface. Plain `configure` is fine on a device where you are the only person making changes.",
   "`configure exclusive` locks the candidate configuration. While you hold the lock, other users cannot commit changes, which prevents surprises during a sensitive change such as a maintenance window. If you exit exclusive mode without committing, your uncommitted changes are discarded, so you must either commit or accept losing them. Other users who try to commit see a message saying the configuration is locked and by whom, which helps them coordinate with you.",
   "`configure private` gives you your own private copy of the candidate configuration. Your changes are kept separate from other users' until you commit, and when you commit, only your changes are applied, merged with the current active configuration. This is the safest option when several people work on the same device at once, and it is the answer to the Oakridge problem: had Dana and Lee each used `configure private`, Lee's commit would have applied only the SNMP change. Two rules apply. You cannot enter private mode while the shared candidate has uncommitted changes, and if you exit private mode without committing, your changes are lost, as the warning on entry reminds you.",
   "```\nuser@r1> configure private\nwarning: uncommitted changes will be discarded on exit\nEntering configuration mode\n\n[edit]\nuser@r1#\n```",
   "Configuration mode has its own set of commands: `set` to add or change statements, `delete` to remove them, `show` to display the candidate, `edit` to move around the hierarchy, `commit` to activate changes and `rollback` to load a previous configuration. You can still run an operational command without leaving configuration mode by prefixing it with `run`, for example `run show interfaces terse`, which saves a lot of switching back and forth. To leave, type `exit` at the top level or `exit configuration-mode` from anywhere. If you have uncommitted changes, Junos asks whether you really want to exit, and in exclusive or private mode it reminds you that those changes will be discarded."
  ],
  "analogy": "Think of the configuration as a shared whiteboard plan in a meeting room. Plain configure is everyone writing on the same whiteboard; when anyone clicks 'publish,' the whole board goes out, half-finished notes included. Configure exclusive is locking the room so only you can publish. Configure private is taking your own copy of the board to your desk and publishing only your edits, which get merged in. The analogy breaks slightly because Junos refuses private mode if the shared board already has unpublished notes.",
  "terms": [
   [
    "Operational mode",
    "The CLI mode, shown by the `>` prompt, used for monitoring, troubleshooting and system actions."
   ],
   [
    "Configuration mode",
    "The CLI mode, shown by the `#` prompt, used to change the candidate configuration."
   ],
   [
    "Candidate configuration",
    "The working copy of the configuration you edit; it becomes active only when committed."
   ],
   [
    "configure exclusive",
    "Enters configuration mode and locks the candidate so no other user can commit; uncommitted changes are discarded on exit."
   ],
   [
    "configure private",
    "Enters configuration mode with a private candidate so only your changes are committed and merged with the active configuration."
   ],
   [
    "run",
    "Prefix that executes an operational command from configuration mode, such as `run show route`."
   ]
  ],
  "example": "Two engineers need to change the same router at the same time. If both use plain `configure`, the first to commit would also push the other's half-finished edits. Instead each uses `configure private`. Each commits only their own changes, which are merged with the active configuration, and neither sees the other's work until it is committed.",
  "mistakes": [
   [
    "`configure exclusive` gives you a private copy of the configuration.",
    "Exclusive locks the shared candidate so others cannot commit. Private gives you your own copy."
   ],
   [
    "Changes made in plain `configure` belong only to you.",
    "Plain configure shares one candidate. Any user's commit activates everyone's uncommitted changes in it."
   ],
   [
    "You must leave configuration mode to run a show command.",
    "Use the `run` prefix, such as `run show interfaces terse`, to run operational commands from configuration mode."
   ],
   [
    "The `#` prompt means you are in the Unix shell.",
    "The `#` prompt means Junos configuration mode. The root shell prompt ends with `%`, and operational mode uses `>`."
   ]
  ],
  "tryit": [
   [
    "You are planning a two-hour maintenance window on a core router to restructure BGP policy. Other engineers may log in during the window to check things, and you do not want anyone committing anything until you finish. Which configure option should you use?",
    "`configure exclusive`. It locks the candidate so other users cannot commit while you work. Remember that if you exit without committing, your uncommitted changes are discarded, so finish with a commit (ideally `commit confirmed`) before leaving."
   ],
   [
    "You type `configure private` and Junos returns an error saying the shared configuration has been modified. A colleague is in plain configure mode with uncommitted work. What is happening and what are your options?",
    "Private mode cannot start while the shared candidate has uncommitted changes. Coordinate with the colleague to commit or discard their work, or, if appropriate, use plain configure knowing you share their candidate."
   ]
  ],
  "tip": "Link the keyword to its effect: exclusive locks others out; private isolates your changes; plain configure shares one candidate with everyone. Prompt symbols: `>` operational, `#` configuration, `%` shell.",
  "check": [
   [
    "Which prompt symbol indicates configuration mode?",
    "The hash sign, `#`; operational mode uses `>`."
   ],
   [
    "What risk does plain `configure` carry when several users edit at once?",
    "A commit by any user commits all changes in the shared candidate, including other users' incomplete work."
   ],
   [
    "What does `configure exclusive` prevent?",
    "It locks the configuration so other users cannot commit changes while you are in exclusive mode."
   ],
   [
    "What happens to your changes if you exit `configure private` without committing?",
    "They are discarded."
   ]
  ]
 },
 {
  "t": "Navigating the hierarchy: `edit`, `up`, `top`, `exit`, `exit configuration-mode`; the `[edit ...]` banner",
  "hook": "Aisha is on a late shift at Bayview Port Authority, adding six interfaces to OSPF on a router that controls the crane network. Every command she types starts with `set protocols ospf area 0.0.0.0 interface`, and by the fourth line she has already mistyped the area once. A senior engineer looking over her shoulder says, 'You are working too hard. Move into the hierarchy and let the banner tell you where you are.' Then he types `exit` and is surprised himself when it jumps back further than he expected. How do you move around the Junos configuration tree confidently, and why does `exit` not always do what people assume?",
  "simple": "The Junos settings are organized like folders inside folders on a computer. There is a top folder, and inside it are folders for things like system settings, network ports and routing, and inside those are more folders. Instead of typing the full path every time, you can step into a folder and work there, and a label above the prompt always shows which folder you are in. One command steps down into a folder, another steps up one level, another jumps all the way to the top, and one leaves the settings area entirely. It is like walking around a large office building with a 'you are here' sign that follows you, so you always know which floor and room you are standing in.",
  "body": [
   "The Junos configuration is a tree. At the top are statements such as `system`, `interfaces`, `protocols`, `routing-options`, `firewall` and `policy-options`. Each contains further levels, all the way down to individual settings like an interface address or an OSPF area. In configuration mode you can move around this tree much as you move around folders in a file system. Doing so saves typing, reduces errors in long paths and helps you focus on one part of the configuration at a time. These commands exist only in configuration mode; operational mode has no hierarchy to move through, so you first enter configuration mode with `configure` before you can use them.",
   "The banner above the prompt shows where you are. When you first enter configuration mode it reads `[edit]`, meaning you are at the top level. After `edit protocols ospf area 0`, it reads `[edit protocols ospf area 0.0.0.0]`. Every command you type is now relative to that position. Typing `set interface ge-0/0/0.0` there adds an interface to OSPF area 0 without retyping the path, and `show` at that level displays only that part of the configuration. Get into the habit of glancing at the banner before every command; it is the easiest way to avoid putting a statement in the wrong place.",
   "`edit` moves you down to a hierarchy level, and it creates the level in the candidate configuration if it does not exist yet. You can move several levels at once by naming the full path, as in `edit interfaces ge-0/0/1 unit 0 family inet`. `up` moves one level up, and `up` followed by a number moves several levels, so `up 2` from `[edit protocols ospf area 0.0.0.0]` lands at `[edit protocols]`. `top` jumps straight to the top of the hierarchy, wherever you are.",
   "`top` is also useful as a prefix. Putting `top` in front of a command runs that command from the top level without moving you. From deep inside OSPF, `top show interfaces ge-0/0/0` displays that interface's configuration and leaves you exactly where you were, and `top set system ntp server 10.10.10.10` adds a statement elsewhere in the tree. `top edit system` moves you to `[edit system]` in one step. Using the prefix keeps your place in a long editing session.",
   "`exit` is the subtle one, and it is a favorite exam topic. It returns you to the level you were at before your most recent `edit`, not necessarily one level up. If you were at `[edit]` and typed `edit protocols ospf area 0`, then `exit` takes you straight back to `[edit]`, skipping `[edit protocols ospf]` and `[edit protocols]`. If you instead moved down in two steps, first `edit protocols ospf` and then `edit area 0`, a single `exit` takes you back to `[edit protocols ospf]`. When you type `exit` at the top level, it leaves configuration mode, asking for confirmation if there are uncommitted changes. `exit configuration-mode` leaves configuration mode from any level in one step, which is handy when you are deep in the tree and finished.",
   "```\n[edit]\nuser@r1# edit protocols ospf area 0\n\n[edit protocols ospf area 0.0.0.0]\nuser@r1# set interface ge-0/0/0.0\n\n[edit protocols ospf area 0.0.0.0]\nuser@r1# up\n\n[edit protocols ospf]\nuser@r1# top\n\n[edit]\nuser@r1#\n```",
   "Notice that Junos displayed area 0 as 0.0.0.0. Junos normalizes many values to its standard format, so OSPF areas appear in dotted-decimal form whatever you typed. Expect this in output, and do not be thrown when the banner shows something slightly different from what you entered. The same normalization happens elsewhere, which is why reviewing with `show` is more reliable than rereading your own typing.",
   "A tidy configuration session uses navigation deliberately. Move into the section you are working on with `edit`. Make changes with short relative `set` commands. Check them with `show` at that level. Use `top show` or `run` to look at other things without losing your place. Then return to the top with `top` and review the whole change with `show | compare` before you commit. At Bayview, Aisha could have typed `edit protocols ospf area 0` once and then six short `set interface` lines, with the banner confirming every line went into the right area. The difference between the commands is easy to summarize: `up` climbs one level, `top` goes to the top, `exit` retraces your last `edit`, and `exit configuration-mode` leaves entirely."
  ],
  "analogy": "Navigating the hierarchy is like using an elevator in a tall building with a display showing your floor, which is the banner. `edit` takes you to a chosen floor, `up` goes one floor, and `top` goes to the lobby. `exit` is different: it is like pressing 'back' to return to the floor where you last boarded, even if that was many floors away. The analogy is imperfect because elevators do not create new floors, but `edit` creates a hierarchy level if it does not yet exist.",
  "terms": [
   [
    "[edit] banner",
    "The line above the configuration prompt that shows your current position in the hierarchy."
   ],
   [
    "edit",
    "Moves to, and creates if needed, a configuration hierarchy level."
   ],
   [
    "up",
    "Moves up one level, or several with a number, such as `up 2`."
   ],
   [
    "top",
    "Moves to the top of the hierarchy, or runs a command from the top when used as a prefix, such as `top show interfaces`."
   ],
   [
    "exit",
    "Returns to the level before your most recent `edit`; at the top level it leaves configuration mode."
   ],
   [
    "exit configuration-mode",
    "Leaves configuration mode from any hierarchy level in one step."
   ]
  ],
  "example": "While configuring OSPF at `[edit protocols ospf area 0.0.0.0]`, you want to check the address on ge-0/0/0. Instead of navigating away, you type `top show interfaces ge-0/0/0` to see it, then continue adding interfaces to area 0 from where you are. When finished, `top` followed by `show | compare` lets you review all your changes before committing.",
  "mistakes": [
   [
    "`exit` always moves up exactly one level.",
    "`exit` returns to the level you were at before the most recent `edit`, which may be several levels up. `up` is the command that moves exactly one level."
   ],
   [
    "You must navigate to the top before running a command elsewhere in the tree.",
    "Prefix the command with `top`, such as `top show interfaces`, to run it from the top without moving."
   ],
   [
    "`edit` fails if the hierarchy level does not already exist.",
    "`edit` creates the level in the candidate configuration if needed."
   ],
   [
    "Typing `exit` anywhere leaves configuration mode.",
    "Only `exit` at the top level, or `exit configuration-mode` from any level, leaves configuration mode."
   ]
  ],
  "tryit": [
   [
    "You start at `[edit]`, type `edit interfaces ge-0/0/1`, then `edit unit 0 family inet`. The banner reads `[edit interfaces ge-0/0/1 unit 0 family inet]`. You type `exit` once. Where are you now, and what would `up` have done instead?",
    "`exit` returns you to `[edit interfaces ge-0/0/1]`, the level before the most recent `edit`. `up` would have moved one level to `[edit interfaces ge-0/0/1 unit 0]`."
   ],
   [
    "You are deep at `[edit protocols bgp group ISP-A]` and need to add an NTP server under system, then continue with BGP. What is the most efficient approach?",
    "Use `top set system ntp server` followed by the server address. The `top` prefix runs the command from the top level and leaves you at `[edit protocols bgp group ISP-A]` to continue your BGP work."
   ]
  ],
  "tip": "`up` goes one level up; `exit` returns to where you were before the last `edit`, which may be several levels up. At the top level, `exit` leaves configuration mode; `exit configuration-mode` leaves from anywhere.",
  "check": [
   [
    "You are at `[edit protocols ospf area 0.0.0.0]`. What does `up` do?",
    "It moves you to `[edit protocols ospf]`, one level up."
   ],
   [
    "How can you view the interfaces configuration without leaving your current hierarchy level?",
    "Use `top show interfaces`, which runs the command from the top level while you stay where you are."
   ],
   [
    "What does the `[edit system login]` banner tell you?",
    "That you are in configuration mode at the system login level, so commands are relative to that position."
   ],
   [
    "From `[edit]` you typed `edit protocols ospf area 0`. Where does `exit` take you?",
    "Back to `[edit]`, the level before the most recent `edit`."
   ]
  ]
 },
 {
  "t": "Command completion with Space and Tab; `?` for context help",
  "hook": "Ben is two weeks into his first network job at Meadowbrook College, and the senior engineer has asked him to check the counters on a firewall filter a contractor built last year. Ben has no idea what the filter is called, and he cannot remember whether the command is `show firewall` or `show filter`. Asking again feels embarrassing. He starts typing, presses Space hoping the router will finish the filter name for him, and nothing happens. A coworker leans over and says, 'Try Tab. And when in doubt, ask the router with a question mark.' How can the Junos CLI itself teach you the commands you have forgotten, and why did Space let Ben down?",
  "simple": "The Junos command line helps you type. If you type the start of a command word and press the Space bar, it fills in the rest of the word for you, as long as it is a standard word built into Junos. The Tab key does the same thing, but it can also fill in names that people made up, like the name of a filter or a policy. If you are not sure what to type next, type a question mark and the router lists every choice that makes sense at that spot, with a short description. It is like a phone keyboard that suggests words: Space finishes dictionary words, Tab also finishes your contacts' names, and the question mark shows the whole menu.",
  "body": [
   "The Junos CLI (command-line interface) is designed to help you type less and make fewer mistakes. It completes commands for you, lists what is valid at each point, and tells you exactly where something went wrong. Getting comfortable with these features makes you faster in the lab, helps you discover commands you do not yet know, and is directly tested on the JNCIA-Junos exam, especially the difference between the Space and Tab keys.",
   "The Space bar completes command names and keywords that are built into Junos. If you type `sh` and press Space, the CLI expands it to `show ` and waits for the next word. If what you typed is ambiguous, for example `s`, which could be `set`, `show`, `ssh` and others, the CLI cannot choose, so it lists the possibilities instead and leaves your input as it was. You do not always need to complete words at all: Junos accepts unambiguous abbreviations when you press Enter, so `sh int ters` runs `show interfaces terse`. Abbreviations are handy for experienced users but harder for colleagues to read in documentation, so spell commands out when you write procedures.",
   "The Tab key completes the same built-in keywords, and it also completes names you or your colleagues have defined yourselves. Those user-defined values include interface names, firewall filter names, routing policy names, prefix list names and user names. For example, after `show firewall filter ` pressing Tab can complete `PROTECT-RE` or list the filters that exist, and after `show interfaces ge-` pressing Tab lists the gigabit Ethernet interfaces present on the device. Space does not complete user-defined values. That single difference is the detail exam questions most often test: Space for built-in keywords only, Tab for keywords and names that exist in the configuration.",
   "The question mark shows context-sensitive help, meaning help that depends on exactly where you are in the command. Type `?` on its own at the prompt to list every command available at that point, each with a short description. Type part of a word followed immediately by `?`, such as `show inter?`, to see only the options that start with those letters. Type a full command followed by a space and `?`, such as `show interfaces ?`, to see what can come next, including options such as `terse`, `extensive` and `detail` and the interface names on the device. You never need to press Enter after `?`; the help appears as soon as you type it, and your partial command is redisplayed so you can keep typing.",
   "Context help works in configuration mode too. At any hierarchy level, `?` lists the statements that can appear there, so at `[edit protocols ospf]` it shows options such as `area` and the other statements that belong under OSPF. After `set` and a statement name, `?` shows which values are valid, such as the format expected for an address or the range allowed for a number. This is often faster than looking up syntax, and it reflects the exact software release on the device in front of you.",
   "The CLI also reports errors precisely. If you mistype a keyword, Junos prints `syntax error` and places a caret, the `^` symbol, under the point where your input stopped making sense. Typing `show interfaces trese` produces a caret under `trese`, so you can see the typo immediately. When a command needs an argument you have not supplied, the CLI reports that it is missing or incomplete rather than guessing. Reading the caret position is quicker than rereading the whole line.",
   "A few keyboard shortcuts based on Emacs-style editing round out the toolkit. Ctrl+A moves the cursor to the start of the line and Ctrl+E to the end, Ctrl+W deletes the word before the cursor, and Ctrl+U deletes the whole line. The up arrow, or Ctrl+P, recalls previous commands, and the down arrow, or Ctrl+N, moves forward again. To see a list of recent commands, use `show cli history`. Together with completion and help, these let you fix and repeat commands without retyping them.",
   "Putting it together, a confident workflow looks like this. When you know roughly what you want, type a few letters and press Space or Tab to complete. When you are unsure, type `?` to see the menu. When you need a name that someone else created, use Tab. When something fails, look for the caret. In Ben's case, typing `show firewall ?` would have shown him the `filter` option, and `show firewall filter ` followed by Tab would have revealed the contractor's filter name."
  ],
  "analogy": "Completion and help are like a knowledgeable librarian at a reference desk. Start saying a common subject heading and the librarian finishes it for you, which is Space. Start saying the title of a book in this particular library and the librarian finishes that too, which is Tab, because Tab knows the local collection. Ask 'what do you have on this shelf?' and you get a list with short summaries, which is `?`. The analogy stops short because a librarian might guess what you meant from a vague request, whereas Junos lists choices rather than guessing when your input is ambiguous.",
  "terms": [
   [
    "Space completion",
    "Pressing Space to complete built-in Junos commands and keywords; it does not complete user-defined names."
   ],
   [
    "Tab completion",
    "Pressing Tab to complete both built-in keywords and user-defined names such as interfaces, filters and policies."
   ],
   [
    "Context-sensitive help",
    "Using `?` to list the commands, options or values valid at the current point in a command or hierarchy level."
   ],
   [
    "Syntax error caret",
    "The ^ marker Junos prints under the part of a command it could not understand."
   ],
   [
    "Command abbreviation",
    "Typing enough of each keyword to be unambiguous, such as `sh int ters` for `show interfaces terse`."
   ],
   [
    "show cli history",
    "Operational command that lists commands recently entered in the session."
   ]
  ],
  "example": "You cannot remember the command to see OSPF adjacencies. You type `show ospf ?` and see a list including `neighbor`, `interface` and `database`. You choose `show ospf neighbor`. Later you type `show firewall filter ` and press Tab to complete the long filter name a colleague created. When you mistype `show route protocl static`, Junos prints a caret under `protocl`, and you fix it with the up arrow and a quick edit.",
  "mistakes": [
   [
    "Space completes everything, including filter and policy names.",
    "Space completes only built-in Junos keywords. Use Tab to complete user-defined names."
   ],
   [
    "You must press Enter after `?` to see help.",
    "Help appears immediately when you type `?`, and your partial command is shown again so you can continue."
   ],
   [
    "Abbreviations always work as long as they are short.",
    "An abbreviation works only if it is unambiguous. `s` alone matches several commands, so Junos lists them instead."
   ],
   [
    "`?` only works in operational mode.",
    "`?` also lists valid statements and values in configuration mode at your current hierarchy level."
   ]
  ],
  "tryit": [
   [
    "A teammate asks you to apply an existing routing policy to BGP. You know it starts with EXPORT- but not the rest of its name. You are typing `set protocols bgp group ISP export EXP` in configuration mode. Which key helps you finish the name, and why not the other one?",
    "Press Tab. The policy name is user-defined, and only Tab completes user-defined names from the configuration. Space completes only built-in keywords, so it would not fill in the policy name. Typing `?` would also list the available policies."
   ]
  ],
  "tip": "Space completes only built-in keywords; Tab completes built-in keywords and user-defined names. That difference is a favorite exam question. Use `?` whenever you are unsure what comes next.",
  "check": [
   [
    "Which key completes the name of a firewall filter you defined?",
    "Tab. Space only completes Junos's built-in commands and keywords."
   ],
   [
    "What does typing `show interfaces ?` display?",
    "The options and interface names that can follow `show interfaces`, each with a short description."
   ],
   [
    "What does Junos show when you mistype a keyword?",
    "A `syntax error` message with a caret (^) marking where the input went wrong."
   ],
   [
    "What happens if you type an ambiguous abbreviation such as `s` and press Space?",
    "Junos lists the possible matching commands instead of completing it."
   ]
  ]
 },
 {
  "t": "Help: `help topic`, `help reference`, `help apropos`",
  "hook": "Grace is building a lab for the network team at Fairhaven Water District in a training room that, for security reasons, has no internet connection at all. Halfway through, she needs to set an idle timeout so forgotten CLI sessions close automatically, but she cannot remember what the statement is called or where it lives in the configuration. Her phone is locked in a locker outside the room. The only resource she has is the router itself. Fortunately, Junos ships with documentation built into the CLI, and three help commands each answer a different kind of question. Which one finds a statement whose name you do not know, and which ones explain it once you have found it?",
  "simple": "The Junos command line has a built-in help library, so you can look things up right on the device without the internet. There are three main ways to use it. One explains ideas, like 'what is an OSPF area and how is it used.' One gives the exact rules for writing a setting: how to spell it, where it goes and what options it has. The third is a search: you type a word you think is related, and it lists the settings that contain that word. It is like a cookbook with three parts: a chapter explaining cooking techniques, a precise recipe card for each dish, and an index at the back where you look up 'garlic' to find every recipe that uses it.",
  "body": [
   "Beyond the question mark for quick context help, Junos includes reference documentation right inside the CLI (command-line interface). This is valuable in labs without internet access, on devices in isolated or high-security networks, and during troubleshooting when you do not want to leave the session. For the JNCIA-Junos exam you should know three help commands and, above all, which question each one answers: `help topic`, `help reference` and `help apropos`.",
   "`help topic` shows conceptual explanations: what a feature is, why you would use it and how it fits together. For example, `help topic interfaces address` explains how interface addresses are configured, and `help topic ospf area` describes what OSPF (Open Shortest Path First) areas are and how they are used. The text reads like a short excerpt from a user guide. To browse what is available, type `help topic ?` and continue with `?` at each level to drill into a subject. Use `help topic` when you understand roughly what you want to do but need the background before you start typing configuration.",
   "`help reference` shows syntax and hierarchy information for a configuration statement. It gives the exact statement syntax, the hierarchy levels where the statement can appear, its options and their default values, and often a brief description of each option. For example, `help reference ospf area` shows the statement's syntax, the hierarchy levels under which it appears and what each option means. A helpful way to think about it: `help reference` is the command reference manual built into the CLI, while `help topic` is the concepts guide. When you already know the statement's name and need to get the details exactly right, reach for `help reference`.",
   "`help apropos` is the search tool. It looks for a word or string among the configuration statements available at your current hierarchy level and below, and lists each matching statement with its path. That is how you find a statement when you know roughly what it is about but not what it is called or where it lives. At the `[edit system]` level, `help apropos ntp` lists statements related to NTP (Network Time Protocol). At the top level, `help apropos mtu` lists the places where an MTU (maximum transmission unit) can be configured. Because apropos searches the configuration statements beneath your position, it is most useful in configuration mode, and running it higher in the hierarchy searches a wider part of the tree.",
   "The three commands work well as a sequence. Grace, in her offline lab, could go to `[edit system]` and run `help apropos idle`. The output would point her to the `idle-timeout` statement under login classes, including its path. She could then run `help reference idle-timeout` to see its exact syntax and the unit it uses, and, if she wanted to understand login classes more broadly, `help topic` on that subject. Search first, then check syntax, then read concepts as needed.",
   "Two other help commands are worth recognizing. `help syslog` followed by a message tag, such as `help syslog UI_COMMIT`, explains what a particular system log message means, what usually causes it and what action, if any, you should take. That turns a cryptic log tag into plain language during troubleshooting. `help tip cli` prints a tip about using the CLI, which is a painless way to pick up shortcuts over time; you can run it repeatedly to see different tips.",
   "Keep these commands distinct from the question mark. The `?` shows what can come next at the current point in a command, which is perfect for discovering keywords and values one step at a time. The `help` commands give longer explanations and can search across the hierarchy, which `?` cannot do. Exam questions often describe a need, such as 'you know the feature relates to timeouts but not the statement name,' and ask which help command to use. The verb in the need usually gives it away.",
   "A quick way to keep the three straight: topic tells you about a concept, reference tells you the exact syntax of a statement and where it lives, and apropos helps you find a statement whose name you do not know. If the question mentions understanding, choose topic. If it mentions syntax, options, defaults or hierarchy location, choose reference. If it mentions searching or a keyword, choose apropos."
  ],
  "analogy": "The three help commands are like the parts of a big cookbook. `help topic` is the techniques chapter that explains what braising is and when to use it. `help reference` is the exact recipe card with ingredients, quantities and steps. `help apropos` is the index at the back, where you look up 'garlic' and get a list of every page that mentions it. The analogy has one limit: Junos apropos searches only below your current hierarchy level, like an index that covers only the chapter you are in.",
  "mnemonic": "Topic for Theory, Reference for Rules of syntax, Apropos for A search. Concept, exact syntax, find by keyword.",
  "terms": [
   [
    "help topic",
    "Displays conceptual, usage-guide information about a feature."
   ],
   [
    "help reference",
    "Displays syntax, hierarchy location, options and defaults for a configuration statement."
   ],
   [
    "help apropos",
    "Searches configuration statements at and below the current level for a string and lists matching statements with their paths."
   ],
   [
    "help syslog",
    "Explains the meaning of a system log message tag and suggests actions."
   ],
   [
    "help tip cli",
    "Displays a tip about using the Junos CLI."
   ]
  ],
  "example": "In a lab without internet access, you need to limit how long idle CLI sessions stay open but do not know the statement. At `[edit system]` you run `help apropos idle` and see the `idle-timeout` statement listed under login class. Then `help reference idle-timeout` shows its syntax and units, and you configure it. Later a log shows a message tag you do not recognize, and `help syslog` with that tag explains it.",
  "mistakes": [
   [
    "`help topic` shows the exact syntax and default values of a statement.",
    "`help topic` gives conceptual explanations. Exact syntax, hierarchy location and defaults come from `help reference`."
   ],
   [
    "`help apropos` explains what a feature does.",
    "`help apropos` searches for statements containing a string and lists their paths. It finds names; it does not explain concepts."
   ],
   [
    "`help apropos` searches the entire configuration tree no matter where you are.",
    "It searches statements at and below your current hierarchy level, so run it higher in the tree to search more broadly."
   ],
   [
    "The question mark and the help commands do the same thing.",
    "`?` lists what can come next at the current point. The help commands provide longer documentation and keyword search."
   ]
  ],
  "tryit": [
   [
    "A colleague sees the log message tag UI_COMMIT_PROGRESS repeatedly and asks what it means. There is no internet access in the operations center. Which help command answers this?",
    "`help syslog UI_COMMIT_PROGRESS`, which explains what that system log message means and whether any action is needed. The topic, reference and apropos commands are for features and configuration statements, not log tags."
   ],
   [
    "You need to configure a maximum number of prefixes for a BGP neighbor, but you do not know the statement name. You are at `[edit protocols bgp]`. Describe a sensible sequence of help commands.",
    "Start with `help apropos prefix` at `[edit protocols bgp]` to list matching statements and their paths. Once you identify the statement, use `help reference` on it to confirm syntax, options and defaults. Use `help topic` if you need conceptual background."
   ]
  ],
  "tip": "Match the verb to the need: concepts use `help topic`, exact syntax uses `help reference`, and searching for a statement by keyword uses `help apropos`.",
  "check": [
   [
    "Which help command shows a statement's syntax and where it lives in the hierarchy?",
    "`help reference`."
   ],
   [
    "You know a feature relates to 'mtu' but not the statement name. Which help command finds it?",
    "`help apropos mtu`, which searches configuration statements for that string."
   ],
   [
    "What kind of information does `help topic` give?",
    "Conceptual usage-guide information explaining what a feature is and how it is used."
   ],
   [
    "Which command explains the meaning of a system log message tag?",
    "`help syslog` followed by the tag."
   ]
  ]
 },
 {
  "t": "Output filtering with pipes: `| match`, `| except`, `| find`, `| count`, `| no-more`, `| last`, `| save`",
  "hook": "The bridge call has fifteen people on it and everyone is waiting for Nadia. A fiber cut has taken down part of the Summit Hills Hospital campus network, and the incident manager wants three answers right now: which interfaces are down, when they went down, and how many routes the core router has lost. Nadia types `show interfaces terse` and hundreds of lines scroll past, most of them perfectly healthy. The log is thousands of lines long. Paging through with the space bar while everyone listens is not an option. How can she turn a flood of output into exactly the three lines she needs, in seconds?",
  "simple": "Some router commands print a huge amount of text, far more than you can read. The pipe symbol, a straight vertical line `|`, lets you pass that text through a filter before it reaches your screen. One filter keeps only the lines with a certain word. Another hides lines with a word. Another jumps to the first place a word appears. Another just counts the lines instead of showing them. Others show only the last few lines, print everything without pausing, or save the output to a file. It is like searching a long email inbox: you can show only messages from one person, hide newsletters, jump to the first message about a topic, or count how many messages match.",
  "body": [
   "Many Junos commands produce long output. The routing table on an internet-connected router can hold a very large number of routes, `show interfaces extensive` on a single port fills several screens, and the main log can contain thousands of lines. The pipe symbol, `|`, lets you send a command's output through one or more filters so that you see only what you need. Pipes work in both operational mode and configuration mode, and you can chain several of them together on a single line. The JNCIA-Junos exam expects you to know what each common pipe option does and to tell similar ones apart.",
   "`| match` shows only the lines that contain a pattern. `show interfaces terse | match ge-` lists only the gigabit Ethernet lines. The pattern is treated as a regular expression, so you can match several alternatives by putting the pattern in quotes and separating the choices with a vertical bar, as in `show interfaces terse | match \"ge-0/0/0|ge-0/0/1\"`. `| except` is the opposite: it hides the lines that contain the pattern and shows everything else. `show interfaces terse | except down` hides interfaces that are down, leaving the ones that are up. Together, match and except let you include or exclude lines precisely.",
   "`| find` behaves differently from match, and that difference is a common exam question. Instead of showing only matching lines, find starts the display at the first line that matches and then shows everything after it, matching or not. It is ideal for jumping to a section of a long configuration or log. `show configuration | find protocols` starts at the protocols section and continues through the rest of the configuration. If you used `| match protocols` instead, you would see only the single lines that contain the word, which is rarely what you want when reading a configuration.",
   "`| count` counts the lines of output instead of displaying them, and prints a short line such as `Count: 42 lines`. It is a quick way to measure volume without scrolling. `show route protocol bgp | count` gives a rough idea of how much BGP (Border Gateway Protocol) output there is, and `show interfaces terse | match up | count` tells you how many lines mention up. Remember that it counts lines, not necessarily objects; a route with several next hops can occupy more than one line, so treat the number as an indicator rather than an exact route count. For exact route numbers, `show route summary` is the better tool.",
   "Two options control how output is paged. By default, Junos pauses after each screenful and shows a `---(more)---` prompt. `| no-more` prints all of the output at once without pausing, which is useful when you are capturing output in a terminal log, pasting it into a ticket or running commands from a script. `| last` shows only the end of the output, and `| last 20` shows the last 20 lines. That is ideal for seeing the newest entries in a log, because new messages are added at the bottom: `show log messages | last 20` shows the most recent twenty.",
   "`| save` writes the output to a file on the device. `show configuration | save /var/tmp/backup.conf` creates a text copy of the configuration that you can later copy off the device with a file transfer tool, and `show interfaces extensive | save /var/tmp/intf-before.txt` captures a baseline before a change for later comparison. Several related options are worth recognizing: `| display xml` shows the output in XML (Extensible Markup Language) format, which is useful for automation; `| trim` followed by a number removes that many characters from the start of each line; and `| hold` keeps the more prompt at the end of the output instead of returning straight to the prompt. Typing `| ?` after any command lists every pipe option available.",
   "```\nuser@r1> show log messages | match SNMP | last 5\nuser@r1> show route | count\nuser@r1> show configuration | find interfaces | no-more\nuser@r1> show interfaces terse | match \"ge-|xe-\" | except down\n```",
   "Pipes are applied from left to right, with each stage receiving the output of the one before. In the first example, the log is first filtered to lines containing SNMP (Simple Network Management Protocol), and then only the last five of those matches are shown. In the third, display starts at the interfaces section and the rest of the configuration prints without pausing. In the fourth, the output keeps gigabit and 10-gigabit Ethernet lines and then drops any that are down. Order matters: `| last 5 | match SNMP` would take the last five log lines first and then search only those, which could easily show nothing.",
   "Back on Nadia's bridge call, three commands answer the incident manager: `show interfaces terse | match down` for the failed interfaces, `show log messages | match SNMP_TRAP_LINK_DOWN | last 10` for when they failed, and `show route summary` or a counted route listing compared with the baseline for the routing impact. Practicing a handful of combinations like these is the fastest way to become efficient on the Junos CLI."
  ],
  "analogy": "Pipes are like a series of sieves on a kitchen counter. You pour all the output in at the top. A match sieve lets through only the pieces you asked for, an except sieve catches the pieces you do not want, find throws away everything until the first piece you care about and then lets the rest through, and count just weighs what arrives instead of serving it. The analogy breaks down with `| save`, which is less like a sieve and more like pouring the result into a jar for later.",
  "terms": [
   [
    "| match",
    "Shows only output lines that match a pattern, treated as a regular expression."
   ],
   [
    "| except",
    "Hides output lines that match a pattern and shows the rest."
   ],
   [
    "| find",
    "Starts displaying output at the first line matching a pattern and shows everything after it."
   ],
   [
    "| count",
    "Counts output lines instead of displaying them."
   ],
   [
    "| no-more",
    "Displays all output at once without pausing at the more prompt."
   ],
   [
    "| last",
    "Shows only the last lines of output, optionally a specific number, such as `| last 20`."
   ],
   [
    "| save",
    "Writes command output to a file on the device."
   ]
  ],
  "example": "During an outage call you need to know which interfaces are down. You run `show interfaces terse | match down | except \".32768|.16386\"` to list down interfaces while hiding internal logical units, then `show log messages | match SNMP_TRAP_LINK_DOWN | last 10` to see when they went down. Finally, `show interfaces terse | save /var/tmp/outage-interfaces.txt` keeps a copy for the incident report.",
  "mistakes": [
   [
    "`| find` shows only the lines that match the pattern.",
    "That is `| match`. `| find` starts at the first match and then shows everything after it."
   ],
   [
    "`| count` gives the exact number of routes or interfaces.",
    "It counts lines of output. One object can span several lines, so use purpose-built summaries such as `show route summary` for exact totals."
   ],
   [
    "The order of chained pipes does not matter.",
    "Pipes run left to right. `| match X | last 5` and `| last 5 | match X` can produce very different results."
   ],
   [
    "`| last` shows the oldest log entries.",
    "New log messages are added at the end, so `| last` shows the newest entries."
   ]
  ],
  "tryit": [
   [
    "You need to send your manager the complete BGP configuration section of a router for a design review, without pausing at every screen and without scrolling through the system and interface sections first. Which pipe options would you use, and in what order?",
    "Use `show configuration | find bgp | no-more`, or more precisely `show configuration protocols bgp | no-more`. The find option starts the display at the first BGP line, and no-more prints the rest without pausing. You could add `| save` with a file path to keep a copy on the device."
   ],
   [
    "A colleague runs `show log messages | last 10 | match OSPF` and reports 'no OSPF messages in the log,' even though OSPF neighbors flapped this morning. What went wrong?",
    "The pipes ran left to right: last 10 kept only the ten newest log lines, and match then searched just those. Reverse the order to `show log messages | match OSPF | last 10` to see the ten most recent OSPF messages."
   ]
  ],
  "tip": "`find` starts at the first match and keeps printing everything after it; `match` prints only matching lines. Questions often contrast them. Pipes run left to right, so order matters.",
  "check": [
   [
    "Which pipe option shows only lines containing 'inet'?",
    "`| match inet`."
   ],
   [
    "How would you see only the last 10 lines of the messages log?",
    "`show log messages | last 10`."
   ],
   [
    "What does `| no-more` do?",
    "It displays the entire output at once, without pausing at each screen for the more prompt."
   ],
   [
    "Which pipe option writes output to a file on the device?",
    "`| save` followed by a file path, such as `| save /var/tmp/backup.conf`."
   ]
  ]
 },
 {
  "t": "`| display set`, `| compare`, `| display inheritance`",
  "hook": "It is 11 p.m. at Bayline Logistics and you are halfway through a planned change on the core router. Priya, who started the shift before you, had been working in the same shared candidate configuration, and nobody is quite sure what she left behind. Meanwhile a ticket says jumbo frames are failing on one link, but the interface section shows no MTU setting at all. Your manager wants a clean list of exactly what tonight's commit will change, and she wants it before anyone types commit. How do you see the real differences, the hidden inherited settings and a copy-ready version of the configuration without guessing?",
  "simple": "A Junos device can show you its settings in different ways, a bit like a document you can view as an outline, as a list of edits, or with the template text filled in. `| display set` turns the outline into a list of one-line instructions that would rebuild it, which is easy to copy. `| compare` shows only what changed, with a plus sign for things being added and a minus sign for things being removed, like the track-changes view in a word processor. `| display inheritance` fills in settings that came from a shared template, called a group, so you can see what the device is really using and where each value came from.",
  "body": [
   "Some pipe options do more than filter lines: they change how configuration is displayed. Three that you will use constantly are `| display set`, `| compare` and `| display inheritance`. Each answers a different question. The first answers what commands would build this configuration. The second answers what have I changed, or what changed between two versions. The third answers where a setting really comes from. Knowing which question you are asking tells you which pipe to reach for, and exam questions are often written exactly that way: they describe the question an engineer has and ask which option answers it.",
   "Start with the default view so the alternatives make sense. By default Junos shows configuration in a hierarchical format with curly braces, semicolons and indentation, which is easy to read as a structure because related statements sit together under their parent, such as everything for one interface grouped under that interface name. The weakness of this view is that a single line, such as `address 10.0.12.1/30;`, does not tell you where it lives unless you scroll up to see its parents. That is fine for reading, but awkward for searching and copying.",
   "`| display set` solves that by showing the same configuration as the flat list of `set` commands that would recreate it. For example, `show configuration interfaces | display set` might print `set interfaces ge-0/0/0 unit 0 family inet address 10.0.12.1/30`. Because every line carries its full path from the top of the hierarchy, set format is ideal for copying configuration between devices, documenting changes in a change ticket and searching with `| match`. You can paste set commands directly into configuration mode on another router, or load them from a file with `load set`. Nothing about the configuration itself changes; only the presentation does.",
   "`| compare` shows the difference between two configurations. In configuration mode, `show | compare` compares your candidate configuration with the active (committed) configuration, and it is the command to run before every commit. Lines beginning with `+` exist in the candidate and will be added; lines beginning with `-` exist in the active configuration and will be removed. A changed value appears as a pair, the old line with `-` and the new line with `+`. Headers in square brackets, such as `[edit system]`, show where in the hierarchy each change is. If there are no differences, the command returns nothing at all, which is itself useful information.",
   "You can also compare against earlier commits. In configuration mode, `show | compare rollback 3` compares the candidate with the configuration from three commits ago. In operational mode, `show configuration | compare rollback 1` compares the active configuration with the previous commit, which shows exactly what the last commit changed. This is often the fastest way to answer the question that follows any outage: what did someone change most recently? The example below shows typical output from the candidate check.",
   "```\n[edit]\nuser@r1# show | compare\n[edit system]\n-  host-name r1-old;\n+  host-name r1;\n[edit interfaces ge-0/0/1 unit 0 family inet]\n+       address 10.0.13.1/30;\n```",
   "Reading that output carefully matters. The host name is changing from r1-old to r1, and an address is being added to ge-0/0/1 unit 0. If you see a line you did not expect, such as a removed routing protocol interface, stop and investigate before committing. In a shared configuration session, other people's uncommitted edits sit in the same candidate as yours, and `show | compare` is how you notice them before they go live with your commit.",
   "`| display inheritance` deals with configuration groups. Junos lets you define reusable blocks of configuration under `[edit groups]` and apply them with `apply-groups`, for example a group that sets the same syslog and Network Time Protocol (NTP) servers on every router, or one that applies a maximum transmission unit (MTU) to all interfaces matching a wildcard such as `<ge-*>`. Groups keep configurations short and consistent, but inherited settings are not shown in the normal `show` output, so it can be hard to tell what is really configured. An interface may look as if it has no MTU statement while it actually inherits one from a group.",
   "Adding `| display inheritance` shows the configuration with inherited values filled in and marks them with comments naming the group they came from, in the form `## 'mtu' was inherited from group 'JUMBO'`. Adding `| display inheritance no-comments` shows the expanded values without those annotations, which is cleaner when you want to copy the result. Remember that values set directly on a statement take priority over inherited ones, so the expanded view is the most reliable picture of what the device will actually use.",
   "Combining these is common, because each pipe transforms the output of the one before it. `show configuration | display inheritance | display set | match mtu` answers 'where is every MTU setting, including those from groups?' in one line. Likewise, `show configuration | display set | save /var/tmp/after.set` stores a set-format copy of the configuration for your change record. Practice reading all three views until you can move between them without thinking, because they are everyday tools and frequent exam material."
  ],
  "analogy": "Think of a recipe card. The normal Junos view is the card laid out in sections, `| display set` is the same recipe rewritten as numbered single steps you could read aloud to someone else, and `| compare` is a red pen marking what you added and crossed out since the last version. `| display inheritance` is like seeing the notes from the family cookbook that every card quietly follows. The analogy stops at one point: none of these views changes the recipe itself, they only change how you read it.",
  "terms": [
   [
    "| display set",
    "Shows configuration as the list of `set` commands that would recreate it, each with its full hierarchy path."
   ],
   [
    "| compare",
    "Shows differences between the candidate and active configuration, or against a rollback, using + and - markers."
   ],
   [
    "| display inheritance",
    "Shows configuration with values inherited from configuration groups filled in and annotated with the source group."
   ],
   [
    "Configuration group",
    "A reusable block of configuration under `[edit groups]` applied elsewhere with `apply-groups`."
   ],
   [
    "apply-groups",
    "The statement that applies a configuration group at a hierarchy level so its settings are inherited there."
   ]
  ],
  "example": "Before a maintenance change you run `show | compare` and notice an unexpected `- protocols ospf area 0.0.0.0 interface ge-0/0/2.0` line that a colleague left in the shared candidate. You remove it from your commit plan, avoiding an outage, and afterward use `show configuration | display set | save /var/tmp/after.set` to document the change.",
  "mistakes": [
   [
    "Believing `| display set` changes the configuration into set format or applies anything.",
    "It only changes how the output is shown. The stored configuration and the device's behavior are untouched."
   ],
   [
    "Reading a `-` line in `show | compare` as an error or warning.",
    "A `-` line simply means the statement exists in the active configuration and will be removed when you commit. A changed value shows as a `-` line for the old value and a `+` line for the new one."
   ],
   [
    "Assuming a setting is absent because the normal `show` output does not list it.",
    "It may be inherited from a configuration group through `apply-groups`. Use `| display inheritance` to see inherited values and which group they come from."
   ],
   [
    "Thinking `show | compare` in configuration mode compares with the previous commit.",
    "Without arguments it compares the candidate with the active configuration. To compare with an older commit, add `rollback n`."
   ]
  ],
  "tryit": [
   [
    "You join a change window and suspect a colleague left uncommitted edits in the shared candidate. You also need to give the next shift a version of the final interface configuration they can paste into a spare router. Which two commands do you run, and in what order?",
    "First run `show | compare` in configuration mode to see every uncommitted difference, including any edits you did not make, and remove anything unexpected before committing. After committing, run `show configuration interfaces | display set` (optionally piped to `save`) to produce full-path set commands that can be pasted into configuration mode on the spare router."
   ],
   [
    "A router's interface ge-0/0/3 shows no `mtu` statement in `show configuration interfaces ge-0/0/3`, yet monitoring reports an MTU of 9192. The configuration contains an `apply-groups JUMBO` statement. How do you confirm where the value comes from?",
    "Run `show configuration interfaces ge-0/0/3 | display inheritance`. The inherited MTU appears in the output with a comment naming the JUMBO group, showing that the value comes from the group's wildcard match rather than a direct statement."
   ]
  ],
  "tip": "In configuration mode, `show | compare` compares candidate against active. Adding `rollback n` compares against an older commit. Inherited group settings stay hidden unless you use `| display inheritance`.",
  "check": [
   [
    "What does a line starting with `+` mean in `show | compare` output?",
    "That the line exists in the candidate but not in the active configuration, so the commit will add it."
   ],
   [
    "Why is `| display set` useful for copying configuration between routers?",
    "Because it outputs complete set commands with their full paths, which can be pasted straight into configuration mode on another device."
   ],
   [
    "How do you see settings a router inherits from an apply-groups statement?",
    "Add `| display inheritance` to the show command; inherited values appear with comments naming the source group."
   ],
   [
    "Which command in operational mode shows exactly what the most recent commit changed?",
    "`show configuration | compare rollback 1`, which compares the active configuration with the previous commit."
   ]
  ]
 },
 {
  "t": "Running operational commands from configuration mode with `run`",
  "hook": "You are deep inside `[edit protocols ospf area 0.0.0.0]` on a branch router for Cedar Valley Clinics, working in `configure private` with half a dozen uncommitted edits. Devon in the network operations center messages you: is the uplink to the hub actually up right now? Your instinct is to type `show interfaces`, but in configuration mode that only shows what you have configured, not whether the link is passing traffic. Exiting would mean leaving your place, and in private mode it could cost you your unsaved work. How do you check the live state of the device without stepping out of configuration mode?",
  "simple": "A Junos device has two main modes. Operational mode is for looking at what the device is doing right now, like checking the dashboard of a car. Configuration mode is for changing settings, like opening the hood. In configuration mode, the word `show` displays your settings, not the live dashboard. The `run` command is a shortcut: put `run` in front of any dashboard command and it works without closing the hood. So `run show interfaces terse` tells you which ports are actually up, and `run ping` tests a connection, while all your unfinished changes stay exactly where you left them.",
  "body": [
   "When you are in the middle of configuring something, you often need to check the device's state: is the interface up, did the route appear, what is the neighbor's address? Operational commands like `show interfaces` or `ping` are not available directly in configuration mode, because in configuration mode `show` displays configuration, not status, and commands such as `ping` and `traceroute` simply are not part of the configuration command set. The `run` command solves this: it runs any operational mode command without leaving configuration mode.",
   "Usage is simple: put `run` in front of the operational command exactly as you would type it at the `>` prompt. `run show interfaces terse` shows interface status. `run ping 10.0.12.2 count 3` tests reachability with three probes. `run show route 10.1.1.0/24` checks the routing table for that prefix. `run show ospf neighbor` checks adjacencies. Command completion with the space bar or Tab and the `?` help key work after `run` just as in operational mode, so you can explore options without leaving. Pipes work too, for example `run show log messages | last 10` to see the newest log entries, or `run show route | match 0.0.0.0` to look for a default route.",
   "The distinction between `show` and `run show` is worth understanding clearly, because it is easy to confuse and exams test it. In configuration mode, `show interfaces` displays the interfaces section of the candidate configuration: what you have configured, including uncommitted changes. `run show interfaces` displays the operational state of the interfaces: whether they are administratively and physically up, their traffic counters and the addresses currently in use. One tells you what you asked for; the other tells you what the device is actually doing. Those two can differ in important ways. An address you just typed appears in `show interfaces` immediately but will not appear in `run show interfaces` until you commit. A cable that is unplugged leaves the configuration untouched but shows the link as down in the operational output.",
   "Hierarchy also matters for plain `show`. In configuration mode, `show` is relative to your current position, so at `[edit interfaces ge-0/0/1]` a bare `show` displays only that interface's configuration. `run show`, by contrast, ignores your position in the hierarchy entirely, because operational commands do not live inside the configuration tree. Typing `run show route` at `[edit protocols ospf]` shows the full routing table, not anything related to the OSPF configuration level.",
   "Using `run` keeps your configuration session intact. You stay at the same hierarchy level, your uncommitted changes remain in the candidate, and you avoid the round trip of exiting, checking and re-entering. This is especially useful in `configure exclusive` or `configure private` modes, where exiting with uncommitted changes can discard your work. It also reduces mistakes: every time you leave and re-enter configuration mode you must find your place in the hierarchy again, and it is easy to land at the wrong level and configure the wrong thing.",
   "A typical workflow looks like this: make a change, `commit`, then `run show ...` to confirm the effect, all without leaving configuration mode. If you used `commit confirmed`, which automatically rolls the change back unless you confirm it, you can verify with `run` commands and then type `commit` again to confirm before the timer expires. This pattern of change, commit, verify is the backbone of safe remote work, and `run` makes the verify step quick enough that people actually do it.",
   "```\n[edit interfaces ge-0/0/1]\nuser@r1# set unit 0 family inet address 10.0.13.1/30\nuser@r1# commit\ncommit complete\nuser@r1# run show interfaces ge-0/0/1 terse\nInterface      Admin Link Proto  Local\nge-0/0/1       up    up\nge-0/0/1.0     up    up   inet   10.0.13.1/30\n```",
   "Notice what the example tells you. The prompt ends in `#`, which marks configuration mode, and the bracketed banner shows you are still at `[edit interfaces ge-0/0/1]` after the `run` command finishes. The output shows both the physical interface (ge-0/0/1) and its logical unit (ge-0/0/1.0) with Admin and Link both up and the new IPv4 address active. If Link had shown down, you would know the problem is physical, such as a cable or the far end, not your configuration.",
   "A few more habits make `run` even more useful. You can check system resources with `run show system uptime` or `run show chassis alarms` before a risky change, look at who else is logged in with `run show system users` before committing in a shared candidate, and use `run show configuration | compare rollback 1` to see what the most recent commit changed. When an exam question asks how to perform any operational task, such as ping, traceroute or a status check, while staying in configuration mode, the answer will include `run`."
  ],
  "analogy": "Using `run` is like a cook who can glance at the dining room through a kitchen window without taking off the apron or leaving the stove. The recipe on the counter (your candidate configuration) stays half-finished and untouched while you check what the guests (the live network) are actually experiencing. Where the analogy stops: `run` does not show you your recipe at all. To see your own uncommitted settings, you use plain `show`.",
  "terms": [
   [
    "run",
    "A configuration-mode command that executes an operational-mode command without leaving configuration mode."
   ],
   [
    "show (configuration mode)",
    "Displays the candidate configuration at or below the current hierarchy level."
   ],
   [
    "run show",
    "Displays operational state from within configuration mode."
   ],
   [
    "Operational state",
    "What the device is actually doing now, such as interface status, routes and neighbors."
   ],
   [
    "Operational mode",
    "The default CLI mode, shown by a `>` prompt, used for monitoring, troubleshooting and running commands like ping."
   ]
  ],
  "example": "While configuring OSPF at `[edit protocols ospf area 0.0.0.0]`, you commit and then type `run show ospf neighbor` to see whether the adjacency reached Full state. It shows Init, so you type `run show interfaces ge-0/0/0 terse` and discover the neighbor-facing address is on the wrong subnet, all without leaving your place in the hierarchy.",
  "mistakes": [
   [
    "Typing `show interfaces` in configuration mode to check whether a link is up.",
    "In configuration mode `show interfaces` displays configured statements only. Use `run show interfaces` (or `run show interfaces terse`) to see live link status."
   ],
   [
    "Exiting configuration mode to run a ping and then re-entering.",
    "This is slow and, in private or exclusive mode, can discard uncommitted work. `run ping <address>` does the same test without leaving."
   ],
   [
    "Expecting a newly typed address to appear in `run show interfaces` right away.",
    "Operational output reflects only committed configuration. Until you commit, the address exists only in the candidate and shows up in plain `show`."
   ],
   [
    "Believing `run` commands are limited by your current hierarchy level.",
    "Operational commands are not part of the configuration tree, so `run show route` shows the full table no matter where you are in the hierarchy."
   ]
  ],
  "tryit": [
   [
    "You are working at `[edit protocols bgp group ISP]` in `configure private` with uncommitted changes. A colleague asks whether the router can currently reach the provider's address 203.0.113.1. You do not want to lose your place or your work. What do you type, and what will not happen as a result?",
    "Type `run ping 203.0.113.1 count 5`. You stay at the same hierarchy level, the uncommitted changes remain in your private candidate, and nothing is committed. The ping tests the current live state, which does not yet include your uncommitted BGP edits."
   ]
  ],
  "tip": "In configuration mode, `show` means configuration and `run show` means live status. If a question asks how to ping from configuration mode, the answer includes `run`.",
  "check": [
   [
    "How do you ping 10.1.1.1 without leaving configuration mode?",
    "Type `run ping 10.1.1.1`."
   ],
   [
    "In configuration mode, what is the difference between `show interfaces` and `run show interfaces`?",
    "`show interfaces` displays the configured (candidate) interface statements; `run show interfaces` displays the live operational status of the interfaces."
   ],
   [
    "Do uncommitted changes survive using `run`?",
    "Yes. You stay in configuration mode at the same level, and the candidate configuration is untouched."
   ],
   [
    "At `[edit interfaces ge-0/0/1]`, what does a bare `show` display?",
    "Only the candidate configuration for ge-0/0/1, because configuration-mode `show` is relative to the current hierarchy level."
   ]
  ]
 },
 {
  "t": "Active vs candidate configuration",
  "hook": "Tuesday morning at Northgate Library Services, Sam is adding three new VLAN interfaces and adjusting an OSPF cost on the main router. Halfway through, a coworker leans over: if you have already typed those lines, are users on the second floor about to lose their connection? Sam pauses. On some network gear, every line takes effect the instant you press Enter. On Junos, nothing has happened yet. Why not, and what has to occur before any of Sam's changes touch live traffic?",
  "simple": "Junos keeps two copies of its settings. The active configuration is the one the device is really using. The candidate configuration is a draft copy you edit. Typing changes only edits the draft, so nothing on the network changes while you work. When you are happy, the `commit` command checks the draft for mistakes and, if it is fine, makes it the new active configuration. It is like editing a document in draft mode and pressing publish only when it is ready. Every published version is also saved, so you can go back to an earlier one if a change causes trouble.",
  "body": [
   "Junos never changes the running device the moment you type a configuration command. Instead it keeps two configurations: the active configuration, which the device is actually running, and the candidate configuration, a working copy you edit. Only when you commit does the candidate become the new active configuration. This model is one of the most important Junos ideas, and it makes changes safer and easier to undo, because you can prepare, review and even abandon a whole set of related edits before any of them affect traffic.",
   "When you enter configuration mode with `configure`, Junos gives you a candidate that starts as a copy of the active configuration. With plain `configure`, several users share one candidate and can see each other's edits. With `configure private`, each user gets their own copy, and with `configure exclusive`, one user locks the candidate so others cannot change it. In every case, each `set`, `delete`, `rename` or `copy` changes only the candidate. Nothing on the device changes yet: interfaces do not move, routes do not change, users are not added. You can make many related changes and review them together with `show | compare` before any of them take effect.",
   "This matters most for changes that only make sense together. Imagine moving an IP address from one interface to another. On a device that applies every line immediately, removing the old address first would cut off access before the new one exists. On Junos you delete the old address, add the new one, check the result and commit both at once, so the device moves from one consistent state to the next in a single step.",
   "When you type `commit`, Junos checks the whole candidate for syntax and consistency errors. For example, it will refuse to commit an interface that references a firewall filter that does not exist, or a configuration with no root password. If the check passes, the candidate becomes the active configuration and the relevant software processes, called daemons, are signaled to apply the changes. If it fails, nothing is activated, the active configuration stays exactly as it was, and you get error messages pointing to the problem so you can fix it in the candidate and try again.",
   "Every commit is saved. The newly active configuration is rollback 0, the previous one becomes rollback 1, and so on. Junos stores the current configuration plus up to 49 previous ones, 50 in total. The active configuration is stored as `/config/juniper.conf.gz`, the most recent few rollbacks sit alongside it in `/config`, and older ones are kept in `/var/db/config`. You can see the history with `show system commit`, which lists each commit's number, time, user, method and any comment that was attached. When the history is full, the oldest version is dropped as each new commit is added.",
   "The rollback command works on the candidate, not on the device. `rollback 0` in configuration mode discards all uncommitted changes, resetting the candidate to match the active configuration. `rollback 1` loads the previous commit into the candidate; the device is not changed until you `commit` again. This two-step design lets you check with `show | compare` exactly what a rollback would do before applying it. In operational mode you can view old versions without touching anything, using `show system rollback 3` or `show configuration | compare rollback 3`.",
   "The two views are shown by different commands, and keeping them straight prevents confusion. In operational mode, `show configuration` displays the active configuration, exactly what the device is running. In configuration mode, `show` displays the candidate, including uncommitted changes. When they differ, `show | compare` is the bridge between them, listing what would be added with `+` and what would be removed with `-`. If `show | compare` returns nothing, the candidate and active configurations are identical.",
   "Leaving configuration mode also interacts with the candidate. If you type `exit` with uncommitted changes in a shared session, Junos warns you that uncommitted changes remain; they stay in the shared candidate, where the next person to commit will activate them along with their own work. In private mode, uncommitted changes are discarded when you leave. This is another reason to run `show | compare` before every commit: it reveals anything already sitting in the candidate.",
   "To sum up the model: edit the candidate, review the differences, commit to activate, and rely on the saved history to undo. Exam questions frequently describe a change that 'did not take effect' and expect you to recognize that it was never committed, or describe a rollback and expect you to know that a commit is still required."
  ],
  "analogy": "The candidate configuration is like a shopping cart on a website. You can add items, remove them and look over the whole cart, and nothing is charged until you press the checkout button, which is the commit. Checkout also verifies the cart, refusing to proceed if something is invalid. Where the analogy stops: in a shared Junos session, other users may be putting items in the same cart, so always review the whole cart with `show | compare` before checking out.",
  "terms": [
   [
    "Active configuration",
    "The committed configuration the device is currently running."
   ],
   [
    "Candidate configuration",
    "The editable copy of the configuration; changes take effect only after commit."
   ],
   [
    "Rollback",
    "Loading a previously committed configuration (0 to 49) into the candidate; it must then be committed."
   ],
   [
    "rollback 0",
    "Discards uncommitted changes by resetting the candidate to the active configuration."
   ],
   [
    "show system commit",
    "Lists commit history with time, user and any comments."
   ],
   [
    "show | compare",
    "In configuration mode, lists differences between the candidate and the active configuration with + and - markers."
   ]
  ],
  "example": "An engineer changes OSPF costs, commits, and traffic shifts badly. She enters configuration mode, runs `rollback 1`, checks `show | compare` to confirm it reverses only the cost change, then commits. The previous behavior returns within seconds, and `show system commit` shows both commits for the change record.",
  "mistakes": [
   [
    "Believing each `set` command takes effect on the device immediately.",
    "`set` changes only the candidate. The device's behavior changes only after a successful `commit`."
   ],
   [
    "Thinking `rollback 1` instantly restores the previous configuration on the device.",
    "It only loads the previous version into the candidate. You must `commit` for it to become active."
   ],
   [
    "Expecting `show configuration` in operational mode to include your uncommitted edits.",
    "It displays the active configuration only. Uncommitted changes appear in configuration-mode `show` or `show | compare`."
   ],
   [
    "Assuming a failed commit applies the parts that were valid.",
    "A commit is all or nothing. If the check fails, nothing is activated and the active configuration is unchanged."
   ]
  ],
  "tryit": [
   [
    "You are in a shared configuration session and have made five edits. Before committing, you run `show | compare` and see a sixth change, a deleted static route, that you did not make. What is going on, and what should you do?",
    "In plain `configure` mode the candidate is shared, so another user's uncommitted edit is in the same candidate and would be activated by your commit. Do not commit yet: find out who made the change (for example with `run show system users`) and agree whether to keep it, or restore that part before committing. Using `configure private` avoids this situation in future."
   ],
   [
    "After a commit, users report slow performance. You want to return to the configuration from two commits ago, but first you want to be sure what it would change. What sequence do you use?",
    "In configuration mode, run `rollback 2`, then `show | compare` to see the differences between the loaded candidate and the active configuration. If they are what you expect, `commit`. Until that commit, the device still runs the current configuration."
   ]
  ],
  "tip": "Rollback only changes the candidate. Nothing on the device changes until you commit the rolled-back candidate.",
  "check": [
   [
    "What command discards all uncommitted configuration changes?",
    "`rollback 0` in configuration mode, which resets the candidate to the active configuration."
   ],
   [
    "How many committed configurations can Junos keep for rollback?",
    "50 in total: the current one (rollback 0) plus 49 previous ones (rollback 1 to 49)."
   ],
   [
    "In operational mode, which command shows the active configuration?",
    "`show configuration`."
   ],
   [
    "What happens to the active configuration if `commit` finds an error?",
    "Nothing. The commit fails as a whole, the active configuration stays unchanged and the errors are reported."
   ]
  ]
 },
 {
  "t": "J-Web GUI and enabling it with `system services web-management`",
  "hook": "Marisol runs IT for Willow Creek Veterinary, a three-person office that just received a new Junos firewall. She is comfortable with a browser but has never touched a command line, and the consultant who usually helps is away for two weeks. She asks you whether she can manage the device through a web page, and whether doing that would bypass all the careful commit and rollback habits you keep telling her about. At the same time, your security lead warns that web interfaces left open on the wrong network are a favorite target. How do you turn the web interface on safely, and what does it really change?",
  "simple": "J-Web is a website that lives inside many Junos devices. Instead of typing commands, you open a browser, log in and use menus, forms and charts to watch and change the device. Behind the scenes it uses the same settings and the same save-then-apply process as the command line, so a change made in the browser still has to be committed and can still be undone. You switch it on with a setting called `web-management`. The safer choice is HTTPS, the encrypted version of web traffic you see as a padlock in your browser, so passwords are not sent in readable form.",
  "body": [
   "Not everyone wants to manage devices from a command line, and even experienced engineers sometimes prefer a graphical view for monitoring. J-Web is the web-based graphical interface built into many Junos devices, particularly SRX Series firewalls and EX Series switches. It lets you monitor the device, configure common features through forms and wizards, and view and commit configuration changes from a browser. For the exam, think of J-Web as one of the user interfaces to Junos alongside the command-line interface (CLI), not as a separate system.",
   "J-Web runs on the device itself, so there is nothing to install on your workstation: you point a browser at one of the device's IP addresses. Crucially, it uses the same configuration database as the CLI. Changes you make in J-Web go into a candidate configuration and must be committed, and they appear in `show system commit` like any other commit, usually with a method that identifies the web interface. That means you can mix CLI and J-Web freely, and the rollback history covers both. An engineer could make a change in J-Web and a colleague could inspect it with `show | compare rollback 1` in the CLI a minute later.",
   "The interface itself is organized around common tasks. J-Web typically includes a dashboard with system and interface status, monitoring pages for routing, security and logs, configuration pages for features such as interfaces, users and security policies, a point-and-click configuration editor that mirrors the configuration hierarchy, and tools such as ping and traceroute. The exact layout and features vary by platform and software release, so the exam focuses on what J-Web is and how it is enabled rather than on specific screens.",
   "J-Web is enabled with the `web-management` service under `[edit system services]`. You choose HTTP, HTTPS or both. HTTP, the Hypertext Transfer Protocol, is unencrypted, so credentials and configuration cross the network in clear text where anyone capturing traffic could read them. HTTPS, which wraps HTTP in Transport Layer Security (TLS), encrypts the session and is preferred. For HTTPS you need a certificate. The simplest option is to let the device generate a self-signed one with `system-generated-certificate`; your browser will warn that it does not recognize the issuer, which is expected for a self-signed certificate. Organizations with their own certificate authority can install a signed certificate instead. You can also restrict which interfaces accept J-Web connections.",
   "```\nset system services web-management https system-generated-certificate\nset system services web-management https interface ge-0/0/0.0\n```",
   "Read those two lines carefully. The first enables J-Web over HTTPS using a certificate the device creates for itself. The second limits J-Web to logical interface ge-0/0/0.0, so the service does not answer on other interfaces. Like every other configuration statement, these do nothing until you commit. After committing, you can check that the configuration is in place with `show configuration system services` in operational mode.",
   "After committing, open an HTTPS session to the device's address in a browser and log in with a Junos user account. Your permissions in J-Web follow your login class, the same set of permissions that controls you in the CLI, so a read-only user can view pages but not change configuration, and a super-user can do everything. On some SRX branch models, J-Web is enabled in the factory-default configuration so you can do the initial setup from a browser connected to an inside port. Some platforms and releases ship J-Web as a separate package that you install before you can use it, so check the documentation for your model rather than assuming it is present.",
   "From a security point of view, treat J-Web like any management service, because it is a doorway to full control of the device. Enable only HTTPS where possible, limit it to management interfaces or trusted networks with the `interface` option, and allow it in your loopback firewall filter, the filter on lo0 that protects the Routing Engine, only from management hosts. Use named accounts with appropriate login classes rather than root, so actions are attributed to individuals. If you do not use J-Web, leave it disabled to reduce the device's attack surface; a service that is not running cannot be attacked.",
   "The key exam facts are compact. The statement is `set system services web-management` followed by `http` or `https`. HTTPS needs a certificate, and `system-generated-certificate` is the easy option. J-Web changes follow the same candidate, commit and rollback model as the CLI, and J-Web access follows the user's login class."
  ],
  "analogy": "J-Web and the CLI are like the touchscreen and the physical buttons on the same car stereo. Whichever you use, you are changing the same settings, and the stereo remembers them the same way. Choosing HTTPS over HTTP is like having that conversation in a closed room instead of shouting across a parking lot. Where the analogy stops: J-Web changes do not apply the instant you tap them; they wait in the candidate until you commit.",
  "terms": [
   [
    "J-Web",
    "The web-based graphical interface for managing many Junos devices."
   ],
   [
    "web-management",
    "The `[edit system services]` statement that enables J-Web over HTTP and/or HTTPS."
   ],
   [
    "system-generated-certificate",
    "An option that lets Junos create a self-signed certificate for HTTPS access to J-Web."
   ],
   [
    "Login class",
    "The set of permissions assigned to a user, which applies in J-Web as in the CLI."
   ],
   [
    "HTTPS",
    "HTTP protected by TLS encryption; the preferred way to reach J-Web because credentials and configuration are encrypted."
   ]
  ],
  "example": "A small office receives a new SRX firewall. The administrator connects a laptop, browses to the default address and uses J-Web's setup wizard to set a root password and addresses. Later, from the CLI, he runs `show system commit` and sees the J-Web commits listed alongside his CLI changes.",
  "mistakes": [
   [
    "Believing J-Web keeps its own separate configuration that bypasses commit and rollback.",
    "J-Web edits the same candidate configuration as the CLI. Changes must be committed and appear in the same commit and rollback history."
   ],
   [
    "Choosing `http` because it is simpler to set up.",
    "HTTP sends credentials and configuration in clear text. Use `https`, with `system-generated-certificate` if no other certificate is available."
   ],
   [
    "Looking for J-Web under `[edit interfaces]` or `[edit security]`.",
    "J-Web is a system service: it is enabled under `[edit system services web-management]`."
   ],
   [
    "Assuming any J-Web user can change configuration.",
    "J-Web enforces the user's login class. A read-only user can view but not change or commit configuration."
   ]
  ],
  "tryit": [
   [
    "A branch office wants J-Web available for its local administrator, but the security team insists it must never answer on the internet-facing interface ge-0/0/0.0. The inside management interface is ge-0/0/1.0, and no certificate authority is available. Which configuration fits?",
    "`set system services web-management https system-generated-certificate` and `set system services web-management https interface ge-0/0/1.0`, then commit. This enables only encrypted access with a self-signed certificate and limits J-Web to the inside interface. Adding a lo0 filter term that permits HTTPS only from management hosts strengthens it further."
   ]
  ],
  "tip": "The statement is `set system services web-management` with `http` or `https`. J-Web changes use the same candidate, commit and rollback model as the CLI.",
  "check": [
   [
    "Which configuration hierarchy enables J-Web?",
    "`[edit system services web-management]`, with `http` and/or `https`."
   ],
   [
    "Why prefer HTTPS over HTTP for J-Web?",
    "HTTP sends credentials and configuration unencrypted; HTTPS encrypts the session."
   ],
   [
    "Do J-Web changes take effect immediately?",
    "No. Like the CLI, they go into a candidate configuration and take effect when committed."
   ],
   [
    "What option lets the device create its own certificate for J-Web over HTTPS?",
    "`system-generated-certificate` under `web-management https`."
   ]
  ]
 },
 {
  "t": "Remote access: SSH, console, out-of-band management interface (fxp0/em0/me0)",
  "hook": "At 2 a.m. your phone buzzes: the Riverside Transit depot router has stopped answering. Monitoring shows its loopback address unreachable, and the dispatch office cannot see bus locations. Jonah, the on-call engineer two states away, tries SSH to the router's usual address and gets nothing. Driving out would take four hours. Is there another way in, one that does not depend on the very network that just failed, and what should have been set up in advance so this night ends in ten minutes instead of four hours?",
  "simple": "There are three main ways to reach a Junos device. The console port is a cable plugged straight into the device, like plugging a keyboard into a computer; it works even if the network is broken. SSH, which stands for Secure Shell, lets you log in over the network with everything scrambled so nobody can read your password. A management port is a separate network connection used only for running the device, like a staff-only side door to a shop, so you can still get in when the main entrance is jammed. Good setups use all three so there is always a way in.",
  "body": [
   "You can reach a Junos device in several ways, and good designs use more than one so you can still get in when something breaks. The main methods are the console port, Secure Shell (SSH) over the network, and a dedicated out-of-band management interface. Each one protects you against a different kind of failure, which is why the exam expects you to know what each is for, how it is enabled and what its limits are.",
   "The console port is a serial connection directly to the Routing Engine (RE), the part of the device that runs Junos and the control plane. It works even when no network configuration exists, which makes it the method for initial setup, root password recovery and troubleshooting when the device is unreachable over the network. You connect with a console cable, often RJ-45 to serial or USB, and terminal emulation software. The usual default settings are 9600 baud, 8 data bits, no parity and 1 stop bit, often written as 9600 8N1, with no flow control. In production, console ports are commonly wired to a terminal server, a device that lets you reach many consoles remotely through a separate path.",
   "On a new device the only account is root, which logs in without a password at the console and lands at the Unix-style shell, shown by a `%` prompt, where you type `cli` to start the Junos command-line interface. Named user accounts, by contrast, land directly in the CLI when they log in. Remember that the first commit on a new device requires a root password, so the console session is usually where that password is first set.",
   "SSH is the standard way to manage Junos remotely. It encrypts the whole session, including passwords, and runs over Transmission Control Protocol (TCP) port 22. You enable it with `set system services ssh` and commit. It is good practice to prevent the root account from logging in over SSH, with `set system services ssh root-login deny`, so administrators log in with their own named accounts and are audited individually; the console remains available for root when truly needed. Telnet also exists, on TCP port 23, but it sends everything, including passwords, in clear text, so avoid enabling it. Protect SSH further with your lo0 firewall filter, the input filter on the loopback interface that guards the RE, allowing SSH only from management networks.",
   "Out-of-band management means managing a device over a network path separate from the traffic it forwards. The opposite, in-band management, uses the same production interfaces that carry user traffic, so a problem in the production network can also cut off your management access. Many Junos devices have a dedicated management Ethernet port wired directly to the RE rather than to the Packet Forwarding Engine (PFE), the hardware that forwards transit traffic. Its name depends on the platform: fxp0 on many routers and SRX firewalls, me0 on EX switches, and em0 on some other platforms, including several QFX models. You configure it like any interface, for example `set interfaces fxp0 unit 0 family inet address 192.168.100.11/24`.",
   "Because this port connects to the RE, it does not forward transit traffic between itself and the revenue ports. Packets arriving on fxp0 are for the device itself, not to be routed onward. That makes it useful for management even when the production network is down, and it keeps management traffic off the data plane. It also means you usually need a route for the management network, since your workstation is often on a different subnet. Options include a static route to the management subnets, a `backup-router` statement that provides a default path while the routing process (rpd) is not running, such as during boot, or placing the management interface in a dedicated management routing instance on platforms that support one, which keeps management routes out of the main routing table.",
   "A word of caution about routing for the management port. A static default route pointing out fxp0 might seem convenient, but on a production router it competes with the real default route and can pull traffic toward an interface that cannot forward it. Specific static routes for management subnets, or a separate management instance, avoid that problem. Verifying the setup is straightforward: `show interfaces terse fxp0` confirms the address, and `show route 192.168.100.0/24` confirms the device can reach the management network.",
   "A resilient setup combines all three: console access through a terminal server for emergencies, an out-of-band management network reaching fxp0, me0 or em0, and SSH with named accounts for daily work. Each layer backs up the one above it. If SSH over the production network fails, you use the management network. If the management network fails too, the console still works, because it depends only on the serial link and the RE itself."
  ],
  "analogy": "Think of a theater. SSH over the production network is the main entrance everyone uses. The out-of-band management port is the staff door at the back, on a separate street, so staff can get in even when a crowd blocks the front. The console port is the key that opens the building's control room directly. Where the analogy stops: the staff door leads only to the building, not through it to other streets, just as fxp0 does not forward transit traffic to other interfaces.",
  "terms": [
   [
    "Console port",
    "A serial port connected directly to the RE, usable without any network configuration."
   ],
   [
    "SSH",
    "Secure Shell: encrypted remote CLI access over TCP port 22, enabled with `set system services ssh`."
   ],
   [
    "Out-of-band management",
    "Managing a device over a network path separate from the traffic it forwards."
   ],
   [
    "fxp0 / me0 / em0",
    "Platform-specific names for the dedicated management Ethernet interface connected to the RE."
   ],
   [
    "root-login deny",
    "SSH option that blocks the root account from logging in over SSH."
   ],
   [
    "In-band management",
    "Managing a device through the same interfaces that carry production traffic."
   ],
   [
    "backup-router",
    "A statement that gives the device a default path for management traffic when the routing process is not running, such as during boot."
   ]
  ],
  "example": "A routing loop takes down a site's production network. The engineer cannot reach the router's loopback over the WAN, but she can SSH to its fxp0 address over the separate management network, find the bad static route and fix it. Had the management network also failed, a console server would have been the last resort.",
  "mistakes": [
   [
    "Believing fxp0, me0 or em0 can route traffic between hosts like any other port.",
    "The management interface connects to the Routing Engine, not the Packet Forwarding Engine, so it does not forward transit traffic to other interfaces."
   ],
   [
    "Mixing up the platform names, for example expecting fxp0 on an EX switch.",
    "EX switches use me0, many routers and SRX firewalls use fxp0, and some other platforms such as several QFX models use em0."
   ],
   [
    "Enabling Telnet as a convenient alternative to SSH.",
    "Telnet sends credentials in clear text. Use SSH (`set system services ssh`) and block root logins over SSH with `root-login deny`."
   ],
   [
    "Thinking the console requires an IP address or network configuration.",
    "The console is a direct serial connection to the RE and works without any network configuration, which is why it is used for initial setup and recovery."
   ]
  ],
  "tryit": [
   [
    "You are designing management access for a new EX switch in a closet that is a long drive away. The security team wants encrypted remote logins, individual accountability and a way in even if both the production network and the management network fail. What three things do you configure or arrange?",
    "Configure an address on me0 (the EX management interface) on the out-of-band management network, with a route back to the management subnets. Enable SSH with `set system services ssh` and `root-login deny`, with named user accounts for each administrator. Connect the console port to a terminal server reached by a separate path, so console access remains if both networks fail."
   ]
  ],
  "tip": "Know which management interface name goes with which platform family and remember it connects to the RE, not the PFE, so it does not route transit traffic.",
  "check": [
   [
    "Why is the console port useful even when the network is down?",
    "It is a direct serial connection to the Routing Engine that needs no network configuration."
   ],
   [
    "What statement enables SSH on a Junos device?",
    "`set system services ssh`."
   ],
   [
    "Does fxp0 forward transit traffic to other interfaces?",
    "No. It connects to the Routing Engine for management only and is not part of the forwarding plane."
   ],
   [
    "What are the usual default console settings on a Junos device?",
    "9600 baud, 8 data bits, no parity, 1 stop bit (9600 8N1), with no flow control."
   ],
   [
    "Which SSH option stops the root account from logging in over SSH?",
    "`set system services ssh root-login deny`."
   ]
  ]
 },
 {
  "t": "Factory-default configuration and the root-password requirement before the first commit",
  "hook": "Your first week at Elmwood Community College's IT department, and Lena hands you a boxed Junos router for the new science building. You connect the console cable, log in as root without being asked for a password, type `cli` and `configure`, set a friendly host name and type `commit`. Instead of 'commit complete', the screen fills with an error about a missing mandatory statement. Nothing you typed has taken effect. Lena smiles and says every new hire hits this on day one. What is the device refusing to do, and why is that refusal a deliberate safety feature?",
  "simple": "Every new Junos device comes with a starter set of settings from the factory, called the factory-default configuration. It is just enough to boot and, on some models, to work in a basic way straight out of the box. What it never includes is a password for root, the all-powerful administrator account. Junos will not let you save and apply any change until you set that password. It is like a new phone that refuses to finish setup until you choose a screen lock. Once the root password is set, your other changes can be committed normally.",
  "body": [
   "Every Junos device ships with a factory-default configuration: a minimal set of statements that lets the device boot and, on some platforms, do something useful straight away. Knowing what it contains and what it lacks explains the first thing you will run into on a new box: Junos will not let you commit anything until you set a root password. This lesson covers what the default looks like on different platforms, why the root password rule exists and how to return a device to its factory state.",
   "The contents of the factory default vary by platform, because different devices have different jobs out of the box. Routers such as the MX Series tend to have a very small default: system logging settings and little else, with interfaces unconfigured, because a router's job depends entirely on the network it joins. EX Series switches typically put their ports into Ethernet switching in the default virtual LAN (VLAN) so they work as a plain switch out of the box. SRX Series branch firewalls usually include security zones, a basic policy allowing traffic from the trust zone to the untrust zone, source network address translation (NAT), a Dynamic Host Configuration Protocol (DHCP) server on the inside and a DHCP client on the outside, so a small office can plug in and go. Whatever the platform, the factory default has no root password.",
   "You can see the factory default on a new device by logging in at the console and running `show configuration` in operational mode. Look for what is missing as well as what is present: you will find no `root-authentication` statement under `[edit system]`, no named user accounts and usually no management address. The exact contents differ by model and release, so the exam focuses on the general pattern rather than every line.",
   "That missing password is intentional. The first time you log in at the console as root, no password is asked, so you can get started. But when you try to commit any change, Junos checks for a root authentication statement, and if there is none the commit fails with an error saying the `root-authentication` statement is missing. You must set one before any other change can take effect. This stops a device from being deployed on a network with an open root account, which would let anyone who reached it take complete control. It is a forced safe default rather than a reminder you can ignore.",
   "```\n[edit]\nroot# set system host-name lab-r1\nroot# commit\n[edit]\n  'system'\n    Missing mandatory statement: 'root-authentication'\nerror: configuration check-out failed\nroot# set system root-authentication plain-text-password\nNew password:\nRetype new password:\nroot# commit\ncommit complete\n```",
   "Read the output closely. The host name change was valid, yet the commit failed because the configuration as a whole lacked a mandatory statement. After the root password was added to the same candidate, the next commit succeeded and activated both the password and the host name together. Junos also enforces password rules by default, such as a minimum length and a mix of character types, so a very short or simple password may be rejected at the prompt.",
   "With `plain-text-password`, Junos prompts for the password twice and stores it as a hash, so the configuration shows an `encrypted-password` string rather than your actual password. Despite the name, the plain text is never saved; the word refers only to how you type it in. You can also supply an existing hash with `encrypted-password`, which is useful when copying a standard configuration to many devices, or an SSH public key with `ssh-rsa` or `ssh-ed25519`, depending on what your release supports. Whatever method you choose, it satisfies the mandatory statement.",
   "You can return a device to its factory default at any time. In configuration mode, `load factory-default` replaces the candidate with the factory default; you must then set the root password again before you can commit, because the default contains none. This affects only the configuration. In operational mode, `request system zeroize` goes further, erasing all configuration and log data and returning the device to factory state, which is appropriate before returning or disposing of hardware so no passwords, keys or addresses are left behind. Many devices also have a reset or config button that restores the defaults, and the details of how long to hold it vary by model.",
   "The takeaway is simple and frequently tested: on a new or reset device, the very first configuration you commit must include a root password. If an exam question describes a fresh device, or one where someone ran `load factory-default`, and a commit that fails with a missing mandatory statement, the answer is that `system root-authentication` has not been configured."
  ],
  "analogy": "A new Junos device is like a new apartment whose landlord hands you the keys but will not let you register any other changes, such as your name on the mailbox, until you set the alarm code. You can walk around and plan everything, but nothing becomes official until the place is secured. Where the analogy stops: Junos does not save your other changes separately while waiting; they sit in the candidate and are applied together with the password in one commit.",
  "terms": [
   [
    "Factory-default configuration",
    "The platform-specific configuration a Junos device ships with and returns to after a reset."
   ],
   [
    "root-authentication",
    "The mandatory `[edit system]` statement that sets the root account's password or key."
   ],
   [
    "plain-text-password",
    "An option that prompts for a password and stores it in hashed form in the configuration."
   ],
   [
    "load factory-default",
    "A configuration-mode command that replaces the candidate with the factory-default configuration."
   ],
   [
    "request system zeroize",
    "An operational command that erases configuration and data and returns the device to factory state."
   ],
   [
    "encrypted-password",
    "The hashed form in which Junos stores a password; you can also paste an existing hash with this option."
   ]
  ],
  "example": "You unbox a vSRX in your lab, log in as root at the console, type `cli` and `configure`, set a host name and commit. The commit fails with 'Missing mandatory statement: root-authentication'. You add `set system root-authentication plain-text-password`, enter a strong password twice, commit again and it succeeds.",
  "mistakes": [
   [
    "Believing the first commit fails because the host name or another setting is wrong.",
    "The commit fails because the factory default has no root password. Add `set system root-authentication ...` and commit again."
   ],
   [
    "Thinking `plain-text-password` stores the password in readable form.",
    "The name refers to how you type it. Junos hashes it and shows an `encrypted-password` string in the configuration."
   ],
   [
    "Assuming `load factory-default` keeps the existing root password.",
    "The factory default contains no root password, so after loading it you must set one again before any commit succeeds."
   ],
   [
    "Treating `load factory-default` and `request system zeroize` as the same thing.",
    "`load factory-default` changes only the candidate configuration. `request system zeroize` erases configuration and data and resets the whole device."
   ]
  ],
  "tryit": [
   [
    "A colleague is decommissioning a firewall that will be sent back to a reseller. She plans to run `load factory-default`, set a root password and commit. Is that enough, and what would you recommend instead?",
    "Not enough. `load factory-default` replaces only the active configuration once committed; earlier configurations remain in the rollback history, and logs and other files stay on the device. For hardware leaving the organization, `request system zeroize` is appropriate because it erases configuration and log data and returns the device to factory state."
   ],
   [
    "You run `load factory-default` on a lab switch, then add a host name and a VLAN, and `commit` fails. What is missing and what do you type?",
    "The root password, because the factory default has none. Type `set system root-authentication plain-text-password`, enter the password twice, then commit."
   ]
  ],
  "tip": "After `load factory-default` the root password is gone from the candidate, so you must set it again before committing. Questions often describe this failed commit and ask why.",
  "check": [
   [
    "Why does the first commit on a new Junos device fail?",
    "Because the factory default has no root password, and Junos requires `system root-authentication` before any commit succeeds."
   ],
   [
    "How is a password entered with `plain-text-password` stored?",
    "Junos hashes it and stores it as `encrypted-password` in the configuration."
   ],
   [
    "What is the difference between `load factory-default` and `request system zeroize`?",
    "`load factory-default` replaces only the candidate configuration (which you then commit); `request system zeroize` erases configuration and data and resets the whole device."
   ]
  ]
 },
 {
  "t": "Initial configuration: host name, root authentication, users and login classes, management interface, static default route",
  "hook": "Halcyon Water District is bringing a new router online at its treatment plant, and the change ticket lands on your desk with a short list: give it a name, lock down root, create accounts for Tomas and for the monitoring team, put it on the management network and make sure the jump host can reach it. Tomas needs full rights. The monitoring team must be able to look but never touch. By lunch, an auditor will ask who can change what on this device and how you know. Which handful of statements turns a blank box into something identifiable, secure and reachable?",
  "simple": "When you set up a new Junos device, you give it the same basic settings almost every time. A host name is its name tag, so you know which device you are on. A root password protects the master account. Personal user accounts let each person log in as themselves, and a login class decides what each person may do, much like keycards that open different doors in an office. An address on the management port puts the device on the network used for running it. Finally, a static route tells the device how to send replies back to the computers that manage it, like writing a return address on an envelope.",
  "body": [
   "Once a device boots with its factory default, a handful of settings make it identifiable, secure and reachable. Nearly every Junos device you deploy will get the same starter set: a host name, a root password, named user accounts with appropriate login classes, a management interface address and a route so management traffic can get home. These are also the first tasks in most JNCIA labs, so it is worth being able to type them from memory and explain what each line does.",
   "The host name identifies the device in the prompt, in system log messages and in Simple Network Management Protocol (SNMP) monitoring. `set system host-name r1` changes the prompt to `user@r1` after the commit. A clear naming convention, such as site and role, saves real confusion when you have several SSH sessions open at once. Root authentication, `set system root-authentication plain-text-password`, is mandatory before the first commit, as the previous lesson explained, so it belongs in the very first batch of changes.",
   "Named user accounts are better than sharing root, because each person is accountable and gets only the rights they need. When everyone logs in as root, the logs cannot tell you who made a change. With named accounts, `show system commit` and the system log record each user by name. You create an account under `[edit system login user]`, give it a password with `authentication plain-text-password` (or an SSH key) and assign it a login class with the `class` statement. A user account cannot be committed without a class.",
   "The login class defines permissions. Junos includes four predefined classes, which the exam expects you to know. `super-user` has all permissions, including changing configuration. `operator` can view information and perform operational actions such as clearing statistics and restarting software processes, but cannot change configuration. `read-only` can view information only. `unauthorized` has no permissions. You can also create custom classes under `[edit system login class]` with specific permission flags, such as `view`, `configure` or `clear`, lists of commands explicitly allowed or denied, and settings like `idle-timeout`, which logs out a session after a number of idle minutes.",
   "The configuration below puts the whole starter set together. Read each line and say aloud what it does before moving on; that habit is excellent exam preparation.",
   "```\nset system host-name r1\nset system root-authentication plain-text-password\nset system login user alice class super-user authentication plain-text-password\nset system login user noc class read-only authentication plain-text-password\nset interfaces fxp0 unit 0 family inet address 192.168.100.11/24\nset routing-options static route 0.0.0.0/0 next-hop 192.168.100.1\nset system services ssh root-login deny\n```",
   "The management interface address makes the device reachable for Secure Shell (SSH). Use fxp0, me0 or em0 depending on the platform, or a regular interface if there is no out-of-band port. A static route provides the path back to management workstations, because the device needs to know where to send its replies. A static default route, `0.0.0.0/0`, is the catch-all route used when no more specific route matches. It appears in `show route` with the Static protocol and a route preference of 5, the Junos default for static routes; lower preference values are preferred when several protocols offer the same prefix. The `next-hop` must be an address on a directly connected subnet, here the management gateway 192.168.100.1.",
   "One caution: a default route pointing out the management interface is fine in a small lab, but on a production router it would pull transit traffic toward a port that cannot forward it. In production, prefer a specific static route for the management subnets, the `backup-router` statement, or a dedicated management routing instance where the platform supports one. Also consider adding `set system name-server` for Domain Name System (DNS) lookups, `set system ntp server` for Network Time Protocol time synchronization and `set system time-zone`, since correct time and name resolution make logs and troubleshooting far easier. Accurate timestamps are also what an auditor expects when matching log entries to change records.",
   "After committing, verify rather than assume. `show system users` shows who is logged in and from where. `show interfaces terse fxp0` confirms the address and that the link is up. `show route 0.0.0.0/0 exact` confirms the default route is active and shows its protocol and preference. Then test the accounts: log in as the read-only user and try `configure`, which should be refused. A quick check like this proves the permissions do what the change ticket intended."
  ],
  "analogy": "Login classes work like the badge system in an office building. A super-user badge opens every door, including the equipment room where things get changed. An operator badge lets you walk the halls and press reset buttons but not rewire anything. A read-only badge lets you look through the windows. An unauthorized badge opens nothing. Where the analogy stops: Junos classes can be customized command by command, which is much finer control than most badge systems offer.",
  "mnemonic": "For the four predefined login classes from most to least power, remember 'Some Operators Read Upside-down': Super-user, Operator, Read-only, Unauthorized.",
  "terms": [
   [
    "host-name",
    "The `[edit system]` statement that names the device, shown in the prompt and logs."
   ],
   [
    "Login class",
    "A set of permissions assigned to user accounts; predefined classes are super-user, operator, read-only and unauthorized."
   ],
   [
    "super-user",
    "Predefined login class with all permissions."
   ],
   [
    "Static default route",
    "A manually configured 0.0.0.0/0 route used when no more specific route matches."
   ],
   [
    "next-hop",
    "The address of the neighboring router to which a static route sends matching traffic."
   ],
   [
    "operator",
    "Predefined login class that can view and perform operational actions such as clearing and restarting, but not change configuration."
   ],
   [
    "read-only",
    "Predefined login class that can view information only."
   ]
  ],
  "example": "For a new lab router you set the host name r1, a root password, a super-user account for yourself and a read-only account for a colleague, address fxp0 as 192.168.100.11/24 and add a static route to the jump host network via 192.168.100.1. Your colleague logs in as noc, can run `show` commands, but gets a permission error when trying `configure`.",
  "mistakes": [
   [
    "Assigning the `operator` class to a monitoring team that must not change anything at all.",
    "Operator can clear statistics and restart processes. For view-only access, use `read-only`."
   ],
   [
    "Believing `operator` can change configuration because it sounds administrative.",
    "Only super-user, or a custom class with the configure permission, can change configuration. Operator cannot."
   ],
   [
    "Pointing a static default route out the management interface on a production router.",
    "It can attract transit traffic toward a port that does not forward it. Use specific management routes, `backup-router` or a management routing instance."
   ],
   [
    "Sharing the root account among the team for convenience.",
    "Named accounts give individual accountability in logs and commit history and allow least-privilege login classes."
   ]
  ],
  "tryit": [
   [
    "Your help desk staff must be able to clear interface statistics and view status when troubleshooting, but must never change configuration. Your auditors must only view. Which predefined login class do you give each group?",
    "Give the help desk `operator`, which allows viewing plus operational actions such as clearing statistics, without configuration rights. Give the auditors `read-only`, which allows viewing only."
   ],
   [
    "A new router at a lab bench has its management port fxp0 on 10.50.0.0/24, and the jump host lives on 10.60.0.0/24 behind gateway 10.50.0.1. This is a production router that also has a real default route from the provider. What route do you add for management, and why not a default route?",
    "Add `set routing-options static route 10.60.0.0/24 next-hop 10.50.0.1`. A specific route reaches the jump host without competing with the provider's default route, which a 0.0.0.0/0 route out fxp0 would do."
   ]
  ],
  "tip": "Know the four predefined login classes and what each allows: super-user everything, operator view plus operational actions, read-only view only, unauthorized nothing.",
  "check": [
   [
    "Which predefined login class lets a user view status but not change configuration or clear counters?",
    "read-only."
   ],
   [
    "Write the command for a static default route via 10.0.0.1.",
    "`set routing-options static route 0.0.0.0/0 next-hop 10.0.0.1`."
   ],
   [
    "Why create named user accounts instead of sharing root?",
    "So each person is individually authenticated and logged, and receives only the permissions their login class allows."
   ],
   [
    "What is the default route preference of a static route in Junos?",
    "5."
   ]
  ]
 },
 {
  "t": "Interface naming (type-fpc/pic/port.unit), physical vs logical properties, unit 0, family inet/inet6",
  "hook": "A help-desk ticket at Pinecrest Medical Group reads: 'Please move the imaging server's link from xe-1/2/3 to xe-1/2/4 tonight.' Ravi, the field technician, is standing in the data center in front of a chassis with several line cards, each holding modules full of ports. He calls you: which card, which module, which port? And when he plugs it in, why does the router still not answer pings until you add something called unit 0? You have one minute to explain how to read the name and where the address actually lives.",
  "simple": "Junos names each network port like a street address. In `ge-0/0/1`, the letters say what kind of port it is (here, Gigabit Ethernet). The three numbers then go from big to small: which line card slot, which module on that card, and which port on that module, all counting from zero. After a dot comes the unit number, which is a logical slice of the port. Some settings belong to the whole physical port, like its speed. Others, like the IP address, belong to a unit. The word `family` says which language the unit speaks: `inet` for IPv4 and `inet6` for IPv6.",
  "body": [
   "Junos names network interfaces in a consistent format that tells you exactly where a port is in the hardware: `type-fpc/pic/port`, followed by `.unit` for a logical unit. For example, `ge-0/0/1.0` is a Gigabit Ethernet port on FPC 0, PIC 0, port 1, logical unit 0. Reading these names quickly is basic Junos literacy: it tells a technician where to plug a cable, tells you which configuration stanza to edit and appears in nearly every operational command you run.",
   "The type is a short prefix for the interface technology. Common ones are `fe` (Fast Ethernet, 100 Mbps), `ge` (Gigabit Ethernet), `xe` (10 Gigabit Ethernet), and `et` (higher-speed Ethernet such as 40 and 100 Gbps and above). You will also see `ae` for aggregated Ethernet bundles, which combine several physical links into one logical link, and several special types covered in the next lesson. The prefix describes the interface's speed class, so if you see `xe` you know immediately you are dealing with a 10-Gigabit port.",
   "The three numbers locate the port. The Flexible PIC Concentrator (FPC) is the line card slot number; on fixed-configuration switches it is often 0, or the member number in a Virtual Chassis, where several switches are managed as one. The Physical Interface Card (PIC) is the interface card or module slot on that FPC. Port is the physical port on that PIC. All three start at 0, not 1, which is a frequent source of off-by-one mistakes. So `xe-1/2/3` is the fourth port on the third PIC of the second FPC.",
   "Each interface has physical properties and logical properties, and knowing which is which tells you where in the hierarchy a statement belongs. Physical properties apply to the whole port and are configured directly under the interface name: `description`, `disable`, `mtu`, `speed`, link-mode settings, `vlan-tagging` (which enables virtual LAN, or VLAN, tags) and `encapsulation`. Logical properties are configured under a unit, which is a logical interface: protocol families, addresses, VLAN IDs and firewall filters. Commands show the split clearly: `set interfaces ge-0/0/1 mtu 9192` is physical because no unit appears, while `set interfaces ge-0/0/1 unit 0 family inet address 10.0.13.1/30` is logical. Note that a description can be set at both levels, describing the port or an individual unit.",
   "Every interface that carries traffic needs at least one unit, because the unit is where protocol families and addresses live. On a plain Ethernet port without VLAN tagging, there is exactly one unit, and it must be unit 0. When you enable `vlan-tagging` on the physical interface, you can create several units, each with a `vlan-id`, turning one physical port into many logical interfaces, sometimes called subinterfaces. The unit number does not have to match the VLAN ID, but making them match, such as unit 100 for VLAN 100, is a common convention that makes configurations easier to read.",
   "The family statement defines which protocol the unit carries. `family inet` is Internet Protocol version 4 (IPv4) and holds IPv4 addresses. `family inet6` is IPv6. Other families include `mpls` for Multiprotocol Label Switching, `iso` (needed for the IS-IS routing protocol) and `ethernet-switching` for Layer 2 ports on switches. A unit can have several families at once, so one unit can carry both IPv4 and IPv6 in a dual-stack design. It can also have more than one address per family. Without a family, a unit does not process that protocol's traffic at all, even if the physical link is up.",
   "```\nset interfaces ge-0/0/1 description \"to r2\"\nset interfaces ge-0/0/1 unit 0 family inet address 10.0.12.1/30\nset interfaces ge-0/0/1 unit 0 family inet6 address 2001:db8:12::1/64\n```",
   "In that example, the description is a physical property of ge-0/0/1, and both addresses sit under unit 0, one in family inet and one in family inet6. After committing, this single unit answers on both IPv4 and IPv6. If you had tried to put an address directly under `ge-0/0/1` without a unit and family, the CLI would not accept it, because there is no such statement at the physical level.",
   "To check your work, `show interfaces terse` lists each physical interface and its logical units with administrative status, link status, families and addresses. Physical lines have no dot; logical lines have a dot and unit number, such as ge-0/0/1.0. If the physical line shows Link down, look at cabling or the far end; if the physical line is up but no family appears on the unit, look at your configuration. `show interfaces ge-0/0/1 extensive` gives detailed physical and logical statistics, including errors and traffic counters."
  ],
  "analogy": "An interface name is like a hotel room number with a twist. The building wing is the FPC, the floor is the PIC, the room is the port, and the numbering starts at zero. The unit is like dividing a suite into separate rooms with their own doors, each with its own guest list, which is the family and address. Where the analogy stops: a plain room without VLAN tagging can only have one door, and it is always numbered 0.",
  "mnemonic": "Read the numbers from biggest to smallest with 'Funny Penguins Party': FPC (line card), then PIC (module), then Port. Then the dot and the unit.",
  "terms": [
   [
    "type-fpc/pic/port",
    "The Junos interface naming format, such as ge-0/0/1, identifying technology, line card, interface card and port."
   ],
   [
    "Logical unit",
    "A logical interface under a physical port, written as .unit, that holds families and addresses."
   ],
   [
    "Physical properties",
    "Settings for the whole port, such as MTU, speed, description and VLAN tagging."
   ],
   [
    "family inet / inet6",
    "Protocol families that enable IPv4 or IPv6 on a logical unit."
   ],
   [
    "vlan-tagging",
    "A physical property that allows multiple units, each with its own VLAN ID, on one port."
   ],
   [
    "FPC",
    "Flexible PIC Concentrator: the line card slot, the first number in an interface name."
   ],
   [
    "PIC",
    "Physical Interface Card: the module on the FPC, the second number in an interface name."
   ]
  ],
  "example": "A router has one port, ge-0/0/2, connected to a switch trunk carrying VLANs 100 and 200. You set `vlan-tagging` on the physical interface, then create unit 100 with `vlan-id 100` and address 10.100.0.1/24, and unit 200 with `vlan-id 200` and address 10.200.0.1/24. `show interfaces terse` lists ge-0/0/2.100 and ge-0/0/2.200 as separate logical interfaces.",
  "mistakes": [
   [
    "Counting FPC, PIC or port numbers from 1.",
    "All three start at 0, so ge-0/0/0 is the first port on the first PIC of the first FPC."
   ],
   [
    "Trying to configure an IP address directly on the physical interface.",
    "Addresses are logical properties. They always go under a unit and family, as in `unit 0 family inet address ...`."
   ],
   [
    "Thinking the unit number must equal the VLAN ID.",
    "It is only a convention. The VLAN is set with `vlan-id`; the unit number can differ."
   ],
   [
    "Treating MTU or speed as a unit setting.",
    "MTU and speed configured directly under the interface name are physical properties that apply to the whole port."
   ]
  ],
  "tryit": [
   [
    "A colleague configures `set interfaces ge-0/0/3 unit 10 family inet address 10.10.0.1/24` on a port that has no `vlan-tagging`, and the commit fails. What is wrong and what are the two ways to fix it?",
    "Without VLAN tagging, an Ethernet port can have only unit 0. Either change the configuration to use unit 0, or, if the port is a trunk carrying VLANs, enable `vlan-tagging` on ge-0/0/3 and add `vlan-id 10` to unit 10."
   ]
  ],
  "tip": "In a name like xe-1/2/3.0, the numbers are FPC 1, PIC 2, port 3, unit 0. Addresses always go under a unit and family, never directly on the physical interface.",
  "check": [
   [
    "What does each part of et-2/0/5.0 mean?",
    "et is a high-speed Ethernet interface; FPC 2, PIC 0, port 5; logical unit 0."
   ],
   [
    "Is MTU a physical or logical property in the command `set interfaces ge-0/0/0 mtu 1600`?",
    "Physical, because it is configured directly under the interface name rather than under a unit."
   ],
   [
    "Which family statement enables IPv6 on a unit?",
    "`family inet6`."
   ],
   [
    "On an untagged Ethernet port, which unit number must be used?",
    "Unit 0."
   ]
  ]
 },
 {
  "t": "Special interfaces: lo0, fxp0/em0/me0, irb",
  "hook": "Two problems arrive on the same morning at Oakridge School District. First, the BGP session from the district router keeps dropping whenever one particular uplink flaps, even though a second path exists. Second, teachers in the new staff VLAN on the campus switch can talk to each other but cannot reach anything beyond their own subnet; there is no gateway. Kiara, your junior engineer, asks if these are two unrelated problems. They are, but both are solved by interfaces that do not map to a single transit port. Which special interfaces fix each one, and why?",
  "simple": "Junos has a few special interfaces that are not ordinary cable ports. The loopback interface, `lo0`, is a pretend port that represents the device itself; it never goes down while the device is on, so it makes a dependable address, like a person's permanent home address rather than a hotel room. The management port (named fxp0, me0 or em0 depending on the device) is a side door used only for managing the device. The `irb` interface gives a group of switch ports, a VLAN, a doorway to other networks, acting as the default gateway that computers in that VLAN send outside traffic to.",
  "body": [
   "Besides ordinary Ethernet ports, Junos has several special interfaces that do not map to a single transit port. Three appear throughout the JNCIA material: the loopback interface lo0, the management interface (fxp0, em0 or me0 depending on platform) and the integrated routing and bridging interface, irb. Each solves a specific problem: giving the device a stable identity, giving administrators a separate path in, and giving a VLAN a routed gateway.",
   "lo0 is the loopback interface. It is a logical interface that represents the device itself, and it is always up as long as the device is running, because it does not depend on any physical link. A cable can be unplugged and a line card can fail, but lo0 stays up. That makes its address the best way to identify a router. Routing protocols like Open Shortest Path First (OSPF) and Border Gateway Protocol (BGP) commonly use the lo0 address as the router ID and as the source for sessions, so sessions can survive the failure of any one physical link as long as some path between the routers exists. If a BGP session were tied to a physical interface address, losing that one link would drop the session even when another path is available.",
   "Loopback addresses are usually host addresses: a /32 for IPv4 or /128 for IPv6, as in `set interfaces lo0 unit 0 family inet address 192.168.255.1/32`. A host mask is used because the address identifies one device, not a subnet of hosts. For the address to be reachable from elsewhere, it must be advertised, for example by including lo0 in OSPF. As an earlier lesson explained, lo0 is also where you apply the input firewall filter that protects the Routing Engine (RE), because traffic destined to the device itself is evaluated against the filter on lo0 regardless of which physical port it arrived on.",
   "The management interface is a dedicated Ethernet port connected to the RE for out-of-band management. It is fxp0 on many routers and SRX firewalls, me0 on EX switches and em0 on some other platforms. It does not connect to the Packet Forwarding Engine (PFE), so it does not forward transit traffic between itself and other interfaces. You configure it like any other interface, with a unit 0 and a family inet address, and use it for Secure Shell (SSH), Simple Network Management Protocol (SNMP), Network Time Protocol (NTP) and similar management traffic. Because it is separate from the production ports, it remains usable when the production network has problems.",
   "irb stands for integrated routing and bridging. It is a logical Layer 3 interface attached to a virtual LAN (VLAN), or bridge domain,, giving that VLAN a routed gateway address. Hosts in the VLAN use the irb address as their default gateway, and the device routes between the VLAN and other networks. On EX and QFX switches, irb interfaces are how you route between VLANs without an external router, an approach often called inter-VLAN routing. Older EX software used an interface called `vlan` for the same purpose, configured as units such as vlan.10, which you may still see in older documentation and lab guides.",
   "The configuration for an irb has three parts: the VLAN definition, the link between the VLAN and its irb unit with `l3-interface`, and the irb unit's address. Access ports are then placed in the VLAN with family ethernet-switching. Here is a complete example for one VLAN.",
   "```\nset vlans STAFF vlan-id 10\nset vlans STAFF l3-interface irb.10\nset interfaces irb unit 10 family inet address 10.10.0.1/24\nset interfaces ge-0/0/5 unit 0 family ethernet-switching vlan members STAFF\n```",
   "Reading it line by line: VLAN STAFF uses VLAN ID 10; its Layer 3 interface is irb.10; irb unit 10 has the gateway address 10.10.0.1/24; and port ge-0/0/5 is an access port in STAFF. A PC on ge-0/0/5 configured with gateway 10.10.0.1 can now reach other VLANs that have their own irb units. As with ordinary interfaces, the unit number does not have to match the VLAN ID, but matching them keeps things readable. If the irb is missing or has no address, hosts can still reach each other inside the VLAN at Layer 2 but cannot leave it, which is exactly the symptom in the opening scenario.",
   "On a device you will also see internal interfaces in `show interfaces terse` that you should not configure, such as those used for communication between the RE and the PFE. Their names vary by platform. The ones you configure deliberately are the three in this lesson, plus the regular ports. When verifying, `show interfaces terse lo0`, `show interfaces terse irb` and `show interfaces terse fxp0` (or me0 or em0) show their addresses and status at a glance."
  ],
  "analogy": "Picture a company. lo0 is the company's registered head-office address: it stays the same even if a branch road is closed, so it is the address everyone uses to identify the business. The management port is the staff entrance that only employees use. The irb is the front desk of one department, the place every employee in that department goes when they need to send something outside. Where the analogy stops: lo0 is not physically anywhere, it is purely logical, and it still needs to be advertised in a routing protocol to be reachable.",
  "terms": [
   [
    "lo0",
    "The loopback interface representing the device itself; always up, typically holding a /32 router ID address."
   ],
   [
    "Management interface",
    "fxp0, em0 or me0: an out-of-band Ethernet port connected to the RE, not used for transit traffic."
   ],
   [
    "irb",
    "Integrated routing and bridging: a Layer 3 interface attached to a VLAN that acts as its routed gateway."
   ],
   [
    "l3-interface",
    "The VLAN statement that associates a VLAN with its irb unit."
   ],
   [
    "Router ID",
    "A 32-bit value that identifies a router to protocols such as OSPF and BGP, commonly taken from the lo0 address."
   ]
  ],
  "example": "A campus EX switch has VLANs STAFF (10) and VOICE (20). You create irb.10 with 10.10.0.1/24 and irb.20 with 10.20.0.1/24 and associate them with the VLANs. PCs use 10.10.0.1 as their gateway and phones use 10.20.0.1, and the switch routes between them. The switch's lo0 address 192.168.255.10/32 is advertised in OSPF so the network team can always reach it.",
  "mistakes": [
   [
    "Using a physical interface address as the BGP session source between loopback-reachable routers.",
    "If that link fails, the session drops even when another path exists. Use the always-up lo0 address as the source and router ID."
   ],
   [
    "Giving lo0 a /24 or other subnet mask.",
    "A loopback identifies one device, so it normally uses a /32 for IPv4 or /128 for IPv6."
   ],
   [
    "Expecting the management interface to route traffic for users.",
    "fxp0, me0 and em0 connect to the RE, not the PFE, and do not forward transit traffic."
   ],
   [
    "Thinking an irb is a physical port you plug cables into.",
    "irb is a logical Layer 3 interface tied to a VLAN with `l3-interface`; hosts reach it through the VLAN's switch ports."
   ]
  ],
  "tryit": [
   [
    "On a campus EX switch, users in VLAN VOICE (ID 20) can reach each other but not the call server in another VLAN. `show vlans` shows VOICE with ports assigned, but there is no `l3-interface` statement for it. What do you add?",
    "Add an irb unit with a gateway address and associate it with the VLAN: `set interfaces irb unit 20 family inet address 10.20.0.1/24` and `set vlans VOICE l3-interface irb.20`, then commit. Phones must use 10.20.0.1 as their default gateway, and the call server's VLAN needs its own irb so the switch can route between them."
   ]
  ],
  "tip": "lo0 is always up and used for router IDs and RE protection; the management interface is out-of-band and does not forward transit traffic; irb is the Layer 3 gateway for a VLAN.",
  "check": [
   [
    "Why is the lo0 address a good choice for a router ID?",
    "Because lo0 is always up and does not depend on any physical link, so the ID stays stable."
   ],
   [
    "What is the role of an irb interface?",
    "It provides a Layer 3 gateway address for a VLAN so the device can route traffic between that VLAN and other networks."
   ],
   [
    "What mask is typically used on a lo0 IPv4 address?",
    "A /32 host mask."
   ],
   [
    "Which statement links a VLAN to its irb unit?",
    "`l3-interface`, for example `set vlans STAFF l3-interface irb.10`."
   ]
  ]
 },
 {
  "t": "Commit model: `commit check`, `commit confirmed`, `commit and-quit`, `commit comment`, `commit at`",
  "hook": "Tonight you are tightening the firewall filter that protects the Routing Engine on a router at Summit Ridge Power's remote substation, a three-hour drive away over mountain roads. If you get one term wrong, the filter could block your own SSH session, and the only fix would be a long drive and an angry morning meeting. Your teammate Ana has a second change, an OSPF tweak, that must not go live until the 2 a.m. maintenance window, and she will be asleep by then. Which commit options let you test safely, recover automatically and schedule work for later?",
  "simple": "In Junos, committing is the moment your draft settings become live. There are several ways to commit. `commit check` is like a spell-check: it finds errors without changing anything. `commit confirmed` is a safety net: it applies the change but undoes it automatically after a few minutes unless you say it is fine by committing again, so if you lock yourself out, access comes back on its own. `commit and-quit` commits and leaves configuration mode in one go. `commit comment` adds a note explaining the change. `commit at` schedules the change for a later time, like scheduling an email to send overnight.",
  "body": [
   "In Junos, a commit is the moment the candidate configuration becomes the active configuration. Because a single bad commit can cut off a remote site, Junos offers several commit options that make changes safer and easier to track. The exam expects you to know what each one does and when to use it: `commit check`, `commit confirmed`, `commit and-quit`, `commit comment` and `commit at`. Together they turn a risky single step into a controlled process.",
   "`commit check` validates the candidate without activating it. Junos parses the whole configuration and reports errors, such as a missing mandatory statement or a reference to a firewall filter or routing policy that does not exist, but nothing is applied. When it succeeds, you see `configuration check succeeds`. Use it while building a large change to catch mistakes early, before the maintenance window starts. It is important to understand its limit: passing `commit check` does not guarantee the change is a good idea; it only means the configuration is valid. A filter that blocks your own SSH traffic is perfectly valid syntax and will pass the check.",
   "`commit confirmed` is the safety net for remote changes, and it covers exactly the gap that `commit check` leaves. It commits the candidate as usual, so the change takes effect immediately, but starts a timer, 10 minutes by default, or the number of minutes you specify, as in `commit confirmed 5`. If you do not confirm the change by committing again before the timer expires, Junos automatically rolls back to the previous configuration and commits it. If your change locks you out, for example with a bad firewall filter or a wrong route, you just wait and access returns. To confirm, you issue another `commit` (Junos also accepts `commit check` for this). Use it for any change that could affect your own connectivity.",
   "Think through what happens in each case. If the change is fine, you verify it, type `commit`, and the timer is cancelled; the change stays. If the change breaks access, you cannot type anything, the timer runs out, and the previous configuration returns, which also appears in `show system commit` as an automatic rollback. Either way you are never stranded for longer than the timer. That is why many teams require `commit confirmed` for every change made over the network to a remote device.",
   "`commit and-quit` commits and, if successful, exits configuration mode and returns you to operational mode in one step; if the commit fails, you stay in configuration mode to fix the error. `commit comment` attaches a note to the commit, for example `commit comment \"CHG1234 add OSPF on ge-0/0/1\"`. Comments appear in `show system commit`, making it far easier to find which rollback to return to later and to match commits with change tickets for an audit. Options can be combined, so `commit confirmed 5 comment \"CHG1234\"` is valid and common.",
   "`commit at` schedules a commit for later. You give a time, such as `commit at 02:00:00` for a time of day, or a full date and time like `commit at \"2026-10-03 02:00:00\"`. Junos validates the configuration immediately, so you learn about errors now rather than at 2 a.m., and then activates it at the scheduled time, which is useful for changes that must happen in a maintenance window when nobody wants to be typing. While a commit is pending, the configuration is locked against further commits, and you can cancel it with the operational command `clear system commit`. `show system commit` shows the pending commit along with the time it will take effect.",
   "```\n[edit]\nuser@r1# show | compare\nuser@r1# commit check\nconfiguration check succeeds\nuser@r1# commit confirmed 5 comment \"add lo0 filter\"\ncommit confirmed will be automatically rolled back in 5 minutes unless confirmed\ncommit complete\nuser@r1# run show ospf neighbor\nuser@r1# commit\ncommit complete\n```",
   "That transcript shows the routine in action. The engineer reviews the differences, validates, applies with a five-minute safety timer and a comment, checks that OSPF neighbors are still up with a `run` command, and confirms with a plain `commit`. Had the `run show ospf neighbor` output shown missing neighbors, the engineer could simply have waited for the automatic rollback, or used `rollback 1` and `commit` to undo the change immediately.",
   "A safe everyday routine follows from these options: review with `show | compare`, validate with `commit check`, apply with `commit confirmed` plus a comment, verify with `run show` commands, then confirm with `commit`. On systems with two Routing Engines, `commit synchronize` applies the commit to both, so the backup RE has the same configuration if a switchover occurs. Exam questions usually focus on what happens when `commit confirmed` is not confirmed, how to confirm it, the default timer, and how to cancel a scheduled `commit at`."
  ],
  "analogy": "`commit confirmed` works like a trial period on a new phone plan with automatic cancellation. You start using it right away, and if you do nothing, it is cancelled after the trial and your old plan returns. To keep it, you must actively confirm. `commit check` is the salesperson checking your paperwork is filled in correctly, which says nothing about whether the plan suits you. Where the analogy stops: Junos trial periods are minutes, not weeks, and default to 10.",
  "mnemonic": "Safe change order, 'Can Cats Climb Very Carefully': Compare (`show | compare`), Check (`commit check`), Confirmed (`commit confirmed`), Verify (`run show`), Commit (to confirm).",
  "terms": [
   [
    "commit check",
    "Validates the candidate configuration without activating it."
   ],
   [
    "commit confirmed",
    "Commits with an automatic rollback (10 minutes by default) unless confirmed by a second commit."
   ],
   [
    "commit and-quit",
    "Commits and then exits configuration mode if the commit succeeds."
   ],
   [
    "commit comment",
    "Attaches a text note to a commit, shown in `show system commit`."
   ],
   [
    "commit at",
    "Schedules a validated commit to take effect at a specified time; cancel with `clear system commit`."
   ],
   [
    "clear system commit",
    "Operational command that cancels a pending scheduled commit created with `commit at`."
   ]
  ],
  "example": "You are changing the lo0 filter on a router 300 kilometres away. You run `commit confirmed 5 comment \"tighten RE filter\"`. Your SSH session freezes, which means the filter blocks you. You reconnect after five minutes, once the automatic rollback has restored access, fix the missing term, and repeat. This time `run show system users` works, so you confirm with `commit`.",
  "mistakes": [
   [
    "Believing `commit check` proves a change is safe to apply.",
    "It only proves the configuration is valid. A valid filter can still block your own access; use `commit confirmed` for that risk."
   ],
   [
    "Thinking `commit confirmed` waits for confirmation before applying the change.",
    "The change takes effect immediately. The timer only decides whether it is automatically rolled back."
   ],
   [
    "Confirming a `commit confirmed` with a special keyword such as `confirm`.",
    "You confirm by issuing another `commit` (or `commit check`) before the timer expires."
   ],
   [
    "Assuming a `commit at` configuration is checked only at the scheduled time.",
    "Junos validates it immediately and activates it later; cancel a pending one with `clear system commit`."
   ]
  ],
  "tryit": [
   [
    "You are adding a new term to the lo0 filter on a router you reach only over SSH through the production network. The team wants the change recorded with ticket CHG2201 and a recovery window shorter than the default. What single commit command do you use, and what do you do next?",
    "Use `commit confirmed 5 comment \"CHG2201\"` (any short timer works). Then verify with commands such as `run show system users` or a new SSH session. If access works, type `commit` to confirm. If you are locked out, wait; Junos rolls back automatically when the timer expires."
   ],
   [
    "A change has been validated and must go live at 01:30 tonight, but at 21:00 the change board postpones it. What do you check and what do you run?",
    "Run `show system commit` to see the pending scheduled commit, then cancel it with `clear system commit` in operational mode."
   ]
  ],
  "tip": "If you do not confirm, `commit confirmed` rolls back automatically, 10 minutes by default. Confirm with a plain `commit`. `commit check` never changes the active configuration.",
  "check": [
   [
    "What happens if you use `commit confirmed` and never commit again?",
    "When the timer expires (10 minutes by default), Junos automatically rolls back to the previous configuration and commits it."
   ],
   [
    "Which option validates the configuration without applying it?",
    "`commit check`."
   ],
   [
    "How do you cancel a pending `commit at`?",
    "Use `clear system commit` in operational mode."
   ],
   [
    "What is the default rollback timer for `commit confirmed`?",
    "10 minutes."
   ]
  ]
 },
 {
  "t": "Rollback: `rollback n` (0–49), `show | compare rollback n`, rescue configuration",
  "hook": "It is Monday morning at Foxglove Insurance, and the router at the regional office has been misbehaving since Friday. Over the weekend, three different engineers committed changes, some with comments and some without. Now Gabriel, your team lead, wants the router back to the last configuration everyone trusts, but nobody is sure whether that is one, three or seven commits ago. He asks two questions: how far back can Junos take us, and is there a configuration we saved deliberately for exactly this kind of mess? What tools does Junos give you to step back safely?",
  "simple": "Every time you apply a change on a Junos device, it keeps a copy of the earlier version, like the version history in a shared document. The current version is number 0, the one before it is 1, and so on up to 49. You can load any of them back with `rollback` and a number, but it only goes into your draft until you apply it with `commit`. Before applying, you can compare the old version with what you have now. Separately, you can save one special trusted version, called the rescue configuration, which does not get pushed out as new changes pile up.",
  "body": [
   "Every time you run `commit` on a Junos device, the software keeps a copy of the configuration that was active before. These saved copies form a numbered history. The currently active configuration is rollback 0, the one committed just before it is rollback 1, and so on back to rollback 49, so Junos keeps up to 50 versions in total. Each new commit shifts every number up by one, and the oldest version drops off the end once the history is full. This history is one of the biggest practical advantages of Junos: undoing a bad change is a single command instead of a frantic retyping session from memory.",
   "To go back, enter configuration mode and type `rollback n`, where n is the number you want. This is the part many beginners miss: `rollback` only loads the old version into the candidate configuration, and Junos responds with `load complete`. Nothing changes on the running device until you `commit`. That gives you a chance to check what you are about to do, and to back out if you chose the wrong number. `rollback` with no number is the same as `rollback 0`, which throws away all uncommitted changes in the candidate and brings you back to the active configuration. It is the quickest way to abandon an edit session that has gone wrong.",
   "Before rolling back, look at the differences. In configuration mode, `show | compare rollback 3` compares the candidate with rollback 3 and prints lines starting with `+` and `-` that describe how the two differ. After you load a rollback, plain `show | compare` shows exactly what committing it would change compared with the active configuration, which is the most direct preview. From operational mode you can see the history itself with `show system commit`, which lists each commit with its number, time, user and method (CLI, J-Web, NETCONF and so on), plus any comment, and you can examine any old version with `show system rollback n` or compare it with `show configuration | compare rollback 1`. The `file compare` command can compare saved configuration files as well.",
   "This is where commit comments pay off. If every commit in the history carries a comment such as a change ticket number, finding the last good configuration is a matter of reading `show system commit`. Without comments, you are left comparing versions one by one. The example below compares the candidate with rollback 1, then loads and commits it.",
   "```\n[edit]\nuser@R1# show | compare rollback 1\n[edit interfaces ge-0/0/1 unit 0 family inet]\n-      address 10.1.1.1/24;\n+      address 10.1.1.5/24;\nuser@R1# rollback 1\nload complete\nuser@R1# commit\n```",
   "Reading the output carefully: the only difference between the candidate and rollback 1 is the address on ge-0/0/1, so loading and committing rollback 1 changes just that address. When the comparison shows unexpected extra differences, stop and think, because a rollback replaces the whole candidate, including any other changes made since that version. A rollback is a full configuration, not a single undo of one line.",
   "The rescue configuration is different from the numbered history. It is a single, known-good configuration that you save on purpose, usually a minimal configuration that gives you management access: an interface address, a route, SSH and the root password. You save the current active configuration as the rescue with `request system configuration rescue save`, and you load it in configuration mode with `rollback rescue` followed by `commit`. Unlike rollback 1 through 49, it never ages out because of new commits; it stays until you save a new one or delete it with `request system configuration rescue delete`. If no rescue configuration is saved, the device typically raises a minor system alarm reminding you that it is missing, visible in `show system alarms`.",
   "Some devices also let you restore the rescue configuration with a hardware button, which is useful when you cannot log in at all; the exact behavior depends on the platform. In practice, a good habit is to save a rescue configuration after the initial build of every device and to update it after major, verified changes, so it always represents a state you trust.",
   "Think of the two as a short-term and a long-term safety net. The numbered rollbacks let you step back a few commits after a mistake. The rescue configuration is the version you trust when you no longer know which numbered version was the last good one. On the exam, expect questions on the 0 to 49 range, on the fact that a rollback must be committed, and on the difference between rollback n and the rescue configuration."
  ],
  "analogy": "Rollback numbers work like a stack of dated photos of a garden, newest on top. You can pull out any photo and use it as a plan, but the garden only changes when you actually replant, which is the commit. The rescue configuration is the framed photo on the wall that you chose yourself; new photos on the stack never replace it. Where the analogy stops: the stack only holds 50 photos, and the oldest is thrown away as each new one is added.",
  "terms": [
   [
    "Rollback 0",
    "The currently active (committed) configuration; `rollback` with no number returns the candidate to it."
   ],
   [
    "Rollback n",
    "A previously committed configuration, numbered 1 to 49 by age, which can be loaded into the candidate."
   ],
   [
    "show | compare",
    "Displays differences between the candidate and the active configuration or a named rollback, using + and - markers."
   ],
   [
    "Rescue configuration",
    "A manually saved known-good configuration, loaded with `rollback rescue`, that is not replaced by normal commits."
   ],
   [
    "request system configuration rescue save",
    "Operational command that saves the current active configuration as the rescue configuration."
   ],
   [
    "rollback rescue",
    "Configuration-mode command that loads the rescue configuration into the candidate; it must then be committed."
   ]
  ],
  "example": "An engineer changes an OSPF interface cost and commits, and suddenly traffic takes a slow path. She types `configure`, then `show | compare rollback 1` to confirm the only difference is the cost, then `rollback 1` and `commit`. Traffic returns to the fast path within seconds.",
  "mistakes": [
   [
    "Believing `rollback 1` restores the previous configuration immediately.",
    "It only loads it into the candidate. You must `commit` to activate it."
   ],
   [
    "Thinking the rescue configuration is the same as rollback 1.",
    "Rollback 1 changes with every commit. The rescue configuration is saved deliberately and stays until replaced or deleted."
   ],
   [
    "Expecting `rollback 50` or higher to work.",
    "The range is 0 to 49: 0 is the active configuration and 49 the oldest kept."
   ],
   [
    "Treating a rollback as undoing only the most recent single line.",
    "A rollback loads a complete earlier configuration, so every difference since that version is reverted. Check with `show | compare` first."
   ]
  ],
  "tryit": [
   [
    "Since Friday, four commits have been made to a router. `show system commit` shows that commit 3 has the comment 'CHG881 baseline verified'. You want to return to that configuration but first see what would change. What do you type, in order?",
    "In configuration mode, run `rollback 3`, then `show | compare` to review exactly what committing it would change versus the active configuration. If the differences are as expected, `commit` (ideally `commit confirmed` with a comment). Until then, the device keeps running the current configuration."
   ],
   [
    "A newly deployed switch shows a minor alarm about a missing rescue configuration. The build has been verified. What should you do?",
    "Run `request system configuration rescue save` in operational mode to save the current verified configuration as the rescue configuration, which clears the reminder and gives you a long-term recovery point."
   ]
  ],
  "tip": "Remember that `rollback n` does not take effect by itself; it only replaces the candidate. You must still commit. Also remember the range: 0 is the active config and 49 is the oldest.",
  "check": [
   [
    "You type `rollback 2` in configuration mode. Has the device's behavior changed yet?",
    "No. The rollback only loads that version into the candidate configuration; it takes effect only after you commit."
   ],
   [
    "What is the difference between rollback 1 and the rescue configuration?",
    "Rollback 1 is automatically the previous committed version and shifts with every commit; the rescue configuration is saved deliberately with `request system configuration rescue save` and stays until you replace or delete it."
   ],
   [
    "Which command shows who committed each configuration and when?",
    "`show system commit` in operational mode."
   ],
   [
    "How do you load the rescue configuration?",
    "In configuration mode, `rollback rescue`, followed by `commit`."
   ]
  ]
 },
 {
  "t": "Saving and loading: `save`, `load merge`, `load override`, `load replace`, `load set`, `load factory-default`",
  "hook": "Bluestem Credit Union is opening five new branches, and each branch router must start from the same approved baseline file. On the first router, Owen loaded the baseline, committed, and discovered that every leftover factory setting was still there alongside it. On the second, Zoe used a different load option and accidentally wiped the static route to the core that she had added by hand. The network manager wants a written procedure by Friday that explains which load option does what. When should you merge, when should you override, and what is `replace` for?",
  "simple": "Instead of typing settings one line at a time, you can bring a whole file of settings into your draft configuration. The `save` command writes your settings out to a file, like saving a document. The `load` commands bring a file in, and each one mixes it with your current draft differently. `merge` adds the file's settings to what you already have. `override` throws away everything and keeps only the file, like replacing a whole document. `replace` swaps only the sections the file marks for replacement. `set` reads a list of one-line commands. `factory-default` brings back the factory settings. All of them change only the draft until you commit.",
  "body": [
   "Besides typing `set` commands one at a time, you can move whole configurations in and out of the candidate as files. This is how you back up a device, copy a standard configuration to many devices, or paste a block of configuration from a template. All the `load` commands change only the candidate; as usual, nothing is live until you commit, which means you can always review the result with `show | compare` and back out with `rollback 0` if the load did something unexpected.",
   "`save` writes configuration to a file. At the top of the hierarchy, `save r1-backup.conf` writes the whole candidate to that file, by default in your home directory on the device. If you are inside a hierarchy level such as `[edit protocols ospf]`, `save` writes only that part, which is handy for exporting one section as a template. You can also save to a remote destination using a File Transfer Protocol (FTP) or Secure Copy Protocol (SCP) style path, such as a backup server, so a copy exists off the device. In operational mode, `show configuration | save filename` does a similar job for the active configuration, and you can combine it with `| display set` to save in set format.",
   "The `load` options differ in how they combine the file with what is already in the candidate, and this is the heart of the topic. `load merge` adds the file's statements to the existing configuration; where both define the same statement, the file's value wins, and everything else is kept. `load override` discards the entire existing candidate and replaces it with the file, so anything not in the file is gone, including settings you might have wanted to keep. `load replace` looks for statements in the file tagged with `replace:` and replaces only those sections, leaving the rest of the candidate alone. Statements in the file without the tag are merged.",
   "`load set` reads a file, or pasted text, made of `set` and `delete` commands, the same format that `show configuration | display set` produces. This makes it the natural partner of `| display set`: export in set format from one device, then load on another. For any of these options, the source can be a filename or the word `terminal`, which lets you paste text directly into the session and finish with Ctrl+D on a new line. Junos reports `load complete` when the text was parsed, or errors for lines it could not understand.",
   "```\n[edit interfaces ge-0/0/2]\nuser@R1# load merge terminal relative\n[Type ^D at a new line to end input]\nunit 0 { family inet { address 10.9.9.1/24; } }\n^D\nload complete\n```",
   "The `relative` keyword makes the loaded text relative to your current hierarchy level, which is handy when pasting a snippet while you are already inside, for example, `[edit interfaces ge-0/0/2]`. Without `relative`, Junos would expect the pasted text to start from the top of the hierarchy and would not know that `unit 0` belongs under ge-0/0/2. In the example, the pasted text uses the hierarchical curly-brace format, which works for `load merge`, `load override` and `load replace`; `load set` expects set-format lines instead.",
   "Choosing between options is mostly about what should happen to existing configuration. To add or update a few statements while keeping everything else, use `load merge` or `load set`. To make a device match a golden file exactly, use `load override`, accepting that anything not in the file disappears. To swap out specific sections, such as an entire firewall filter, while leaving the rest alone, use `load replace` with `replace:` tags in the file. After any load, `show | compare` tells you precisely what the commit would change, and that review step is what catches surprises like a lost static route.",
   "`load factory-default` replaces the candidate with the factory default configuration for that platform. Because the factory default does not include a root password, Junos will refuse to commit until you set one with `set system root-authentication plain-text-password`. This is a common exam fact: every commit requires root authentication to be configured. For a full reset of the device, including logs and files, there is also the operational command `request system zeroize`, which is more drastic than loading the defaults because it erases data rather than only replacing the candidate.",
   "To summarize the exam distinctions: merge keeps existing configuration and adds to it, with the file winning on conflicts; override wipes everything not in the file; replace swaps only tagged sections; set loads set-style commands; factory-default loads the platform default and needs a root password before commit. And `save` goes the other way, writing configuration out to a file."
  ],
  "analogy": "Imagine updating a shared contact list from a file. Merge is importing the file and letting it update matching contacts while keeping everyone else. Override is deleting the whole list and importing only the file. Replace is swapping only the groups the file labels for replacement, such as the whole 'Suppliers' group. Where the analogy stops: in Junos none of this is final until you commit, so you can always review the imported result with `show | compare` first.",
  "terms": [
   [
    "load merge",
    "Combines statements from a file or terminal with the existing candidate, with the loaded values winning on conflicts."
   ],
   [
    "load override",
    "Discards the whole candidate and replaces it with the loaded configuration."
   ],
   [
    "load replace",
    "Replaces only the configuration sections that are marked with the `replace:` tag in the loaded text."
   ],
   [
    "load set",
    "Loads a list of `set` and `delete` commands, as produced by `| display set`."
   ],
   [
    "load factory-default",
    "Loads the platform's factory default configuration into the candidate; a root password must be set before commit."
   ],
   [
    "save",
    "Writes the candidate configuration, or the part at the current hierarchy level, to a file."
   ],
   [
    "relative",
    "Load keyword that interprets the loaded text relative to the current hierarchy level."
   ]
  ],
  "example": "A team keeps a golden baseline for branch routers. When a new router arrives, the engineer copies the baseline file to it, runs `load override /var/tmp/branch-baseline.conf`, sets the site-specific hostname and addresses, checks with `commit check` and then commits. Nothing from the factory configuration survives, which is exactly what they want.",
  "mistakes": [
   [
    "Using `load merge` to make a device match a baseline file exactly.",
    "Merge keeps existing statements not in the file. To match the file exactly, use `load override`."
   ],
   [
    "Using `load override` to add a small snippet.",
    "Override discards everything not in the file, which would wipe the rest of the configuration. Use `load merge` or `load set` for additions."
   ],
   [
    "Believing a load takes effect as soon as `load complete` appears.",
    "Load changes only the candidate. Review with `show | compare` and commit to activate."
   ],
   [
    "Pasting a snippet with no top-level context while inside a hierarchy level, without `relative`.",
    "Without `relative`, the text is read from the top of the hierarchy. Add `relative` so it applies at your current level."
   ]
  ],
  "tryit": [
   [
    "You are standing at `[edit firewall family inet]` and want to paste a complete new filter written in curly-brace format, starting with `filter PROTECT-RE {`, without touching any other filters. Which command do you use?",
    "`load merge terminal relative`. Merge adds the new filter while keeping the existing ones, and `relative` places the pasted text under the current `[edit firewall family inet]` level. Review with `show | compare`, then commit."
   ],
   [
    "A golden configuration file tags the `[edit system syslog]` section with `replace:`. You want the router's syslog settings to match the file exactly, but everything else on the router must stay as it is. Which load option fits?",
    "`load replace` with the file. Only the tagged syslog section is replaced; the rest of the candidate is left alone (untagged statements are merged). Check with `show | compare` before committing."
   ]
  ],
  "tip": "Exam questions usually test merge versus override: merge keeps existing config and adds to it, override wipes everything not in the file. Also remember that factory-default will not commit without a root password.",
  "check": [
   [
    "You need to paste a set of `set` commands copied from another router. Which load option fits?",
    "`load set terminal`, which accepts set-style commands; then commit."
   ],
   [
    "After `load factory-default`, the commit fails. What is the most likely reason?",
    "The root authentication password is missing; Junos requires `system root-authentication` before any commit."
   ],
   [
    "Which option would remove a static route that exists in the candidate but not in the loaded file?",
    "`load override`, because it replaces the entire candidate with the file."
   ],
   [
    "What does the `relative` keyword do with a load command?",
    "It makes the loaded text apply relative to your current hierarchy level instead of the top of the configuration."
   ]
  ]
 },
 {
  "t": "Editing tools: `delete`, `deactivate`/`activate`, `annotate`, `copy`, `rename`, `insert`",
  "hook": "It is 11 p.m. at Ridgeview Freight, and Omar has a maintenance window that closes at midnight. The backup ISP is flapping and needs to be taken out of service tonight, but the carrier promises a fix by morning and Omar will need that BGP group back exactly as it was. He also has a firewall filter where a new term to block Telnet never seems to match, and a teammate wants a comment explaining a strange static route. Omar could retype everything from memory, or he could reach for the right editing command. Which tools let him switch things off, reorder, copy and document without losing a single line?",
  "simple": "When you change a Junos configuration, `set` is not the only tool. Think of the configuration as a document you are editing before you press save (the commit). `delete` erases a line. `deactivate` greys a line out so it stays in the document but is ignored, and `activate` brings it back. `annotate` sticks a note on a line so the next person knows why it is there. `copy` duplicates a section under a new name, and `rename` changes a name in place. `insert` moves a line up or down where order matters, such as the rules in a firewall filter. It is like editing a recipe card: crossing out a step lightly in pencil is very different from tearing it off the card.",
  "body": [
   "Junos gives you several commands for changing configuration beyond `set`. Knowing them saves typing and, more importantly, lets you make changes safely and reversibly. Every one of these tools works on the candidate configuration, the private working copy you edit in configuration mode, and nothing takes effect on the running device until you commit. That means you can always review your edits with `show | compare` before they go live, and you can abandon them with `rollback 0` if you change your mind.",
   "The `delete` command removes a statement or an entire hierarchy. `delete interfaces ge-0/0/1 unit 0 family inet address 10.1.1.1/24` removes one address and leaves the rest of the interface alone, while `delete protocols ospf` removes the whole OSPF configuration in one stroke. Be careful with scope: `delete` at a high level with no argument, such as at the top of `[edit]`, asks for confirmation because it would erase everything under that level. Once a deletion is committed, the only way to get the lines back is a rollback to an earlier configuration, so delete is the right tool only when you truly no longer want the configuration.",
   "The `deactivate` command keeps a statement in the configuration but tells Junos to ignore it. When you view the configuration, the statement is prefixed with `inactive:`, so anyone reading it can see it exists but is switched off. This is ideal for temporarily turning something off, for example `deactivate protocols bgp group ISP-B`, because you can bring it back exactly as it was, with every neighbor, policy and timer intact, by typing `activate protocols bgp group ISP-B` and committing. Compare that with `delete`, which loses the configuration for good until a rollback. A third, often confused option is `disable`, which exists inside many objects such as interfaces. `disable` is a real configuration setting that administratively shuts the item down. An interface that is deactivated is treated as if it were not configured at all; an interface with `disable` is fully configured but administratively down, and it shows Admin down in `show interfaces terse`.",
   "The `annotate` command adds a comment to a statement at the current hierarchy level. For example, at `[edit interfaces]` you can type `annotate ge-0/0/0 \"Uplink to ISP-A, circuit 4411\"`. The comment appears as a `/* ... */` line directly above the statement in the configuration and helps the next engineer understand why something is there, which is especially valuable for odd static routes or policy exceptions that look like mistakes. Comments are displayed in the normal hierarchical configuration view but not in `show | display set` output, so do not be surprised when they vanish from set-style listings.",
   "The `copy` command duplicates a configuration element under a new name. `copy interfaces ge-0/0/1 to ge-0/0/2` copies the entire interface configuration, including units and addresses, which you would then edit so the two interfaces do not share an address. The `rename` command changes a name in place: `rename firewall family inet filter PROTECT to filter PROTECT-RE`. An important limitation applies to both: references to the old name elsewhere are not updated automatically. If an interface applies the filter `PROTECT` as an input filter, renaming the filter leaves that interface pointing at a name that no longer exists, and the commit check will complain. Always review with `show | compare` and `commit check` afterward.",
   "The `insert` command changes the order of items where order matters, which mainly means terms in routing policies and firewall filters. New terms are always added at the end of the list, no matter when you think of them. If you add a term that must be evaluated earlier, you move it, for example `insert term BLOCK-TELNET before term ALLOW-ALL`. Order matters because both policies and filters are evaluated from the top down and stop at the first terminating action, such as accept, reject or discard. A broad term near the top can swallow traffic before a more specific term below it ever gets a chance to match. You can also use `insert ... after ...` to place a term below a named term.",
   "```\n[edit firewall family inet filter PROTECT-RE]\nuser@R1# insert term ALLOW-SSH before term DENY-ALL\nuser@R1# show | compare\n```",
   "Putting the tools together gives you a safe change habit. Use `deactivate` when you might want something back, `delete` when you are sure you do not, `disable` when you want an object configured but shut down, `annotate` to explain the unusual, `copy` and `rename` to work faster with care for references, and `insert` whenever a new term must not sit at the bottom. Then check your work with `show | compare` before you commit."
  ],
  "analogy": "Think of the candidate configuration as a recipe card you are revising. `delete` tears a step off the card. `deactivate` puts a strike-through in pencil: the step is still readable and can be restored, but the cook skips it. `disable` is a step that is still followed but says \"leave the oven off.\" `insert` moves a step earlier, which matters because cooks follow the card top to bottom. The analogy stops at `rename`: on a card you would fix every mention of a renamed ingredient, but Junos does not update other references for you.",
  "terms": [
   [
    "delete",
    "Removes a statement or an entire hierarchy from the candidate configuration; it is gone after commit unless you roll back."
   ],
   [
    "deactivate",
    "Marks a statement `inactive:` so it stays in the configuration but is ignored at commit; reversed with `activate`."
   ],
   [
    "disable",
    "A configuration setting inside objects such as interfaces that keeps the object configured but administratively down."
   ],
   [
    "annotate",
    "Attaches a comment to a statement at the current hierarchy level, shown as `/* ... */`."
   ],
   [
    "rename",
    "Changes the name of a configuration element in place without updating other references to it."
   ],
   [
    "insert",
    "Moves an ordered element, such as a policy or filter term, before or after another."
   ]
  ],
  "example": "During a maintenance window a network engineer needs to stop a BGP session to a backup ISP but may need it again tomorrow. Instead of deleting the group, she runs `deactivate protocols bgp group BACKUP` and commits. The next day `activate protocols bgp group BACKUP` and a commit restore the exact same session settings.",
  "mistakes": [
   [
    "Treating `deactivate` and `disable` as the same thing.",
    "`deactivate` makes Junos ignore the statement as if it were not configured; `disable` is a configured setting that administratively shuts the object down. A disabled interface shows Admin down, while a deactivated one is simply not configured."
   ],
   [
    "Assuming a new firewall filter term is placed where you are thinking of it, or that order does not matter.",
    "New terms always go to the end. Filters and policies are evaluated top down and stop at the first terminating action, so use `insert` to move a specific term above a broad one."
   ],
   [
    "Believing `rename` updates every reference to the old name.",
    "It changes only the element itself. Interfaces or policies that refer to the old name must be fixed separately, which `show | compare` and `commit check` help you find."
   ],
   [
    "Thinking these commands change the running device immediately.",
    "They change the candidate configuration only. Nothing takes effect until you commit."
   ]
  ],
  "tryit": [
   [
    "You manage a router where the filter PROTECT-RE has terms ALLOW-ICMP, ALLOW-ALL and nothing else. Security asks you to block Telnet to the Routing Engine tonight, and you add a term BLOCK-TELNET with a discard action. After commit, Telnet attempts still succeed. What happened, and what is the fix?",
    "BLOCK-TELNET was added at the end, after ALLOW-ALL, so Telnet traffic is accepted by ALLOW-ALL first and evaluation stops. Run `insert term BLOCK-TELNET before term ALLOW-ALL`, check with `show | compare`, and commit."
   ],
   [
    "A colleague wants to retire an old OSPF interface configuration but is not sure whether the circuit will return next month. Should they use `delete` or `deactivate`, and why?",
    "`deactivate`. The configuration stays in place marked `inactive:` and can be restored exactly with `activate` and a commit, while `delete` would require rebuilding it or finding an old rollback."
   ]
  ],
  "tip": "Know the difference between `deactivate` (configuration kept but ignored), `delete` (configuration removed) and `disable` (configured but administratively down). Also know that new terms go to the end, so `insert` is the fix when term order is wrong.",
  "check": [
   [
    "You add a new firewall filter term, but it never matches because an earlier term accepts everything. How do you fix it without retyping?",
    "Use `insert term NEW before term OLD` to move it above the broader term, then commit."
   ],
   [
    "How does a deactivated statement appear when you run `show`?",
    "It is prefixed with `inactive:`."
   ],
   [
    "After `rename firewall family inet filter A to filter B`, does an interface that applied filter A now use filter B?",
    "No. `rename` does not update references, so the interface still points to A and must be changed separately."
   ]
  ]
 },
 {
  "t": "Configuration groups with `groups` and `apply-groups`, including wildcards",
  "hook": "Lena has just joined the network team at Alder Valley Schools, which runs forty Junos switches and routers across twelve campuses. Her first ticket says every Gigabit Ethernet interface must use the same jumbo MTU, and the standard changes again next term. She opens a router configuration and finds the MTU set nowhere, yet `show interfaces` reports exactly the value the standard asks for. Someone has made the setting appear without typing it on each interface. Where is it coming from, and how can Lena change one line and fix forty devices' worth of interfaces without missing one?",
  "simple": "A configuration group is a reusable block of settings you write once and then plug in wherever you want it. You define the block under `groups`, and nothing happens until you switch it on with `apply-groups`. Wildcards let the block say \"apply this to every interface whose name starts with ge-\". Think of a school dress code posted once on the office wall instead of written into every student's schedule: everyone follows it, but a student with a doctor's note (an explicit setting) can wear something different. Settings typed directly always beat settings from a group. Because group settings are not shown in the normal view, you use a special display option to reveal where each one came from.",
  "body": [
   "Configuration groups let you write a piece of configuration once and apply it in many places. This keeps large configurations short, consistent and easier to change, because a standard lives in one spot instead of being copied onto dozens of objects. A group is defined under the `groups` hierarchy using exactly the same structure as the normal configuration, so anything you know how to configure you can also put in a group. A group has no effect at all until you reference it with `apply-groups`, which is a common source of confusion when someone builds a group and wonders why nothing changed after commit.",
   "Here is a simple case. Every Gigabit Ethernet interface should use a particular MTU (maximum transmission unit), the largest frame size the interface will send, and every interface should run IPv4 on unit 0. You define a group with a wildcard in the interface name and then apply it at the top level of the configuration.",
   "```\nset groups GE-DEFAULTS interfaces <ge-*> mtu 9192\nset groups GE-DEFAULTS interfaces <ge-*> unit 0 family inet\nset apply-groups GE-DEFAULTS\n```",
   "The angle brackets hold a wildcard pattern. `<ge-*>` matches any interface name starting with `ge-`, and `<*>` matches anything at that level. The most important rule is that a wildcard only matches items that actually exist in the normal configuration. A group does not create interfaces, OSPF areas or users on its own; it fills in statements for objects you have already configured. If ge-0/0/7 has no configuration at all, the group above does nothing for it. Patterns can also use `?` to match a single character and bracketed character ranges, which helps when you want to target a subset of ports.",
   "You can apply groups at the top of the configuration or at a specific hierarchy level, such as `set interfaces apply-groups GE-DEFAULTS` or under a single protocol. When values conflict, the rules for which one wins follow a clear order. Anything you configure explicitly in the normal configuration overrides a value inherited from a group, so an interface with `mtu 1500` typed directly keeps 1500. If several groups are applied at the same level, the one listed first takes priority over later ones. Groups applied at a more specific, deeper level take priority over groups applied higher up. To stop inheritance for one object, use `apply-groups-except GROUPNAME` at that object's level, which is how you exempt a single interface from a standard without dismantling the group.",
   "Because inherited statements are not shown in normal `show` output, you need a special view to see the configuration the device actually uses. `show | display inheritance` in configuration mode, or `show configuration | display inheritance` in operational mode, expands the groups and marks each inherited line with a `##` comment naming the group it came from, so you can see at a glance that the MTU on ge-0/0/1 was supplied by GE-DEFAULTS rather than typed on the interface. Adding `| display inheritance brief` gives a more compact version. This is the view to reach for whenever a value appears that you did not expect, because the answer is very often a group applied somewhere you were not looking.",
   "One group you will see on every Junos device is `junos-defaults`, a built-in group that holds predefined settings such as named applications for common protocols. You do not normally edit it, and it is not shown in the regular configuration, but it explains why some values exist even though nobody typed them. On systems with dual Routing Engines (REs), the special groups `re0` and `re1` hold settings such as hostnames and management interface addresses that must differ per Routing Engine. Each RE applies only the group that matches its own name, so one shared configuration can still give each RE a unique identity.",
   "In practice, groups shine for standards that repeat: interface defaults, login banners and syslog settings across a fleet, or OSPF timers on every core-facing link. The trade-off is visibility. Because inherited lines are hidden by default, a team that uses groups heavily should train everyone to check `display inheritance` before assuming a setting is missing or misconfigured. It also helps to give groups clear names that describe their purpose, such as GE-DEFAULTS or SYSLOG-STANDARD, and to keep each group focused on one job, so that anyone reading `apply-groups` at the top of a configuration can guess what each group contributes before expanding it."
  ],
  "analogy": "A configuration group is like a dress code posted once on a school's office wall. It applies only to students who are actually enrolled (the wildcard matches only existing objects), not to imaginary ones. A student with a doctor's note wears what the note says (explicit configuration beats the group), and a student listed as exempt skips the code entirely (`apply-groups-except`). The analogy stops at visibility: everyone can read the wall, but Junos hides inherited lines until you ask for `display inheritance`.",
  "terms": [
   [
    "groups",
    "The configuration hierarchy where reusable blocks of configuration are defined."
   ],
   [
    "apply-groups",
    "The statement that makes a group's configuration inherit into the level where it is applied."
   ],
   [
    "apply-groups-except",
    "Stops a named group from being inherited by a specific object or level."
   ],
   [
    "Wildcard (<...>)",
    "A pattern in angle brackets inside a group, such as `<ge-*>`, that matches existing configuration names."
   ],
   [
    "display inheritance",
    "A `show` pipe option that expands inherited group statements and marks where each came from."
   ],
   [
    "junos-defaults",
    "A built-in group of predefined settings, such as named applications, present on every device."
   ]
  ],
  "example": "A service provider wants every core-facing interface to run OSPF point-to-point with the same hello settings. It writes a group with `protocols ospf area 0 interface <ge-*>` settings, applies it under protocols, and uses `apply-groups-except` on the one ge- interface in OSPF that needs different timers.",
  "mistakes": [
   [
    "Expecting a wildcard group to create configuration for every matching interface on the box.",
    "Wildcards only match objects that already exist in the normal configuration. An unconfigured port receives nothing from the group."
   ],
   [
    "Assuming a group value overrides a value typed directly on the object.",
    "Explicit configuration always wins over inherited values. Groups fill in what is not configured directly."
   ],
   [
    "Defining a group and expecting it to take effect after commit.",
    "A group does nothing until it is referenced with `apply-groups` at some level of the configuration."
   ],
   [
    "Concluding a setting is missing because plain `show` does not list it.",
    "Inherited statements are hidden by default. Use `show | display inheritance` to see them and the group they came from."
   ]
  ],
  "tryit": [
   [
    "Two groups are applied at the top level in this order: `apply-groups [ SITE-A CORP ]`. SITE-A sets the syslog host to 192.0.2.50 and CORP sets it to 192.0.2.60 at the same statement, and nothing is configured directly. A colleague claims CORP wins because it is the corporate standard. Which value applies, and how would you prove it?",
    "SITE-A's value applies, because among groups applied at the same level the first one listed takes priority. Running `show configuration system syslog | display inheritance` shows the inherited value and names the group it came from."
   ]
  ],
  "tip": "Explicit configuration always beats group inheritance, and the first group listed wins among peers. If a question asks why a statement is in effect but not visible, the answer is usually a group; `show | display inheritance` reveals it.",
  "check": [
   [
    "A group sets MTU 9192 on `<ge-*>`, and interface ge-0/0/3 has `mtu 1500` configured directly. Which MTU applies?",
    "1500, because explicitly configured statements override group-inherited values."
   ],
   [
    "Does a wildcard group create configuration for interfaces that are not otherwise configured?",
    "No. Wildcards only match objects that already exist in the configuration."
   ],
   [
    "How can you see inherited statements in the configuration?",
    "Use `show | display inheritance` (or `show configuration | display inheritance`)."
   ]
  ]
 },
 {
  "t": "System services: SSH, NTP, syslog, SNMP basics",
  "hook": "The auditor at Kestrel Mutual Insurance slides a one-page finding across the table. Three branch routers accept Telnet, their clocks disagree by up to eleven minutes, nothing is being sent to the central log platform, and the monitoring system polls them with a community string anyone on the network could sniff. Dev, the network engineer, has until Friday to fix all four. He knows each problem has a home somewhere in the Junos configuration, but which hierarchy holds which service, and which settings close the gaps without locking him out of his own devices?",
  "simple": "A router needs a few basic helper services to be manageable. SSH (Secure Shell) is a locked, private phone line for typing commands remotely; Telnet is the same line with no lock. NTP (Network Time Protocol) keeps the router's clock correct by checking a trusted time server, like setting your watch by an official clock. Syslog is the router's diary of events, kept locally and optionally copied to a central server. SNMP (Simple Network Management Protocol) lets a monitoring system ask the router how it is doing and lets the router shout when something goes wrong. In Junos, SSH, Telnet, NTP and syslog are set under `system`, while SNMP has its own top-level section.",
  "body": [
   "A new Junos device does very little for remote management by default. You decide which services run, and each one is configured in a predictable place. SSH, Telnet, NTP and syslog live under the `system` hierarchy, while SNMP has its own top-level `snmp` hierarchy. This lesson covers the four services you will set up on almost every device: SSH for remote command-line access, NTP for time, syslog for logging and SNMP for monitoring. Knowing where each lives is a frequent exam point.",
   "SSH (Secure Shell) gives you an encrypted remote CLI session, protecting both your password and everything you type. Enable it with `set system services ssh`. It is good practice to add `set system services ssh root-login deny` so that nobody can log in directly as root over the network. Instead, administrators log in with their own named accounts, which means their actions are recorded under their names in the logs and commit history. Telnet can be enabled with `set system services telnet`, but it sends usernames, passwords and every command in clear text, so anyone capturing traffic can read them; it should be avoided or removed with `delete system services telnet`. Other management services, such as NETCONF over SSH and web management, are also enabled under `system services`.",
   "NTP (Network Time Protocol) keeps the device clock accurate by synchronizing it with one or more time servers. Correct time matters more than it first appears. Log entries, commit history and certificate validity all depend on the clock, and when you correlate an incident across ten devices, their timestamps must agree or the story of what happened falls apart. Configure a server with `set system ntp server 192.0.2.10`, adding more than one server for resilience, and set the local time zone with `set system time-zone`. If the clock is far off, NTP corrects it gradually and may take a long time, so you can set it once immediately with `set date ntp` from operational mode and let NTP keep it accurate afterward. `show ntp associations` and `show ntp status` confirm synchronization.",
   "Syslog is how Junos records events. Local log files live in `/var/log`, and each file is configured with a facility, the category of event, and a severity, the level of seriousness. For example, `set system syslog file messages any notice` logs events from any facility at severity notice or more serious into the messages file. To also send events to a central log server, use `set system syslog host 192.0.2.50 any warning`. Severities from most to least serious are emergency, alert, critical, error, warning, notice, info and debug. Choosing a severity includes everything more severe than it, so a host set to warning receives warning, error, critical, alert and emergency messages, but not notice, info or debug. Facilities let you be more selective: instead of `any`, you can name categories such as `authorization` for login events or `interactive-commands` for commands users type, and give each its own severity in the same file or host statement.",
   "SNMP (Simple Network Management Protocol) lets a monitoring system poll the device for counters and status, such as interface traffic and CPU load, and lets the device send traps, which are unsolicited alerts sent when something happens, such as a link going down. A basic SNMPv2c setup uses a community string, a shared word that acts like a password: `set snmp community monitor-ro authorization read-only`. You can add `clients` under the community to restrict which source addresses may poll. Traps are sent to targets defined in a `trap-group`. SNMPv1 and SNMPv2c communities travel in clear text, so they offer weak protection; SNMPv3, which adds user-based authentication and encryption, is preferred wherever the monitoring platform supports it. Granting read-only access rather than read-write is also a sensible default.",
   "```\nset system services ssh root-login deny\nset system ntp server 192.0.2.10\nset system syslog host 192.0.2.50 any warning\nset snmp community monitor-ro authorization read-only\n```",
   "Taken together, these settings form a baseline hardening and visibility checklist: encrypted management with SSH and no direct root logins, Telnet removed, consistent time from NTP, events stored locally and forwarded centrally with syslog, and monitoring through a restricted, read-only SNMP community or, better, SNMPv3. After committing, verify each piece: log in over SSH with a named account, check NTP associations, watch a test event arrive on the log server, and confirm the monitoring system can poll the device. A short checklist like this is worth turning into a standard group or template so every new device starts from the same secure baseline."
  ],
  "analogy": "Think of a small office building. SSH is the staff entrance with a badge reader, while Telnet is a propped-open side door. NTP is the master clock in the lobby that every office clock is set from, so meeting notes from different floors line up. Syslog is the security desk's logbook, with a copy faxed to headquarters. SNMP is the building manager walking around asking for meter readings, plus the fire alarm that calls out on its own. The analogy breaks for SNMPv2c: its \"password\" is shouted out loud on every visit.",
  "mnemonic": "Syslog severities, most to least serious: Every Alley Cat Eats Whiskers, Never Ignoring Dinner (Emergency, Alert, Critical, Error, Warning, Notice, Info, Debug).",
  "terms": [
   [
    "SSH",
    "Secure Shell, an encrypted protocol for remote command-line access, enabled with `set system services ssh`."
   ],
   [
    "root-login deny",
    "An SSH option that blocks direct root logins over the network so administrators use named accounts."
   ],
   [
    "NTP",
    "Network Time Protocol, which synchronizes the device clock with a time server."
   ],
   [
    "Syslog severity",
    "The level of an event, from emergency (most serious) to debug; a configured level includes all more serious levels."
   ],
   [
    "SNMP community",
    "A shared string used by SNMPv1/v2c to authorize polling; it provides weak, clear-text protection."
   ],
   [
    "SNMP trap",
    "An unsolicited alert the device sends to a monitoring system, with targets defined in a `trap-group`."
   ]
  ],
  "example": "After a security audit, a company requires encrypted management and central logging. The engineer enables SSH with root login denied, removes the telnet service, points NTP at the internal time servers and adds a syslog host so the security team's log platform receives every warning and above from each router.",
  "mistakes": [
   [
    "Looking for SNMP under `system`, like the other services.",
    "SSH and Telnet are under `system services`, NTP under `system ntp` and syslog under `system syslog`, but SNMP is its own top-level `snmp` hierarchy."
   ],
   [
    "Thinking a syslog severity of warning logs only warning messages.",
    "A severity includes everything more serious. Warning also captures error, critical, alert and emergency."
   ],
   [
    "Believing an SNMPv2c community string is a secure password.",
    "Communities are sent in clear text. Restrict clients, use read-only, and prefer SNMPv3 for authentication and encryption."
   ],
   [
    "Assuming NTP will instantly fix a clock that is far off.",
    "NTP adjusts gradually. Use `set date ntp` once from operational mode to step the clock, then let NTP maintain it."
   ]
  ],
  "tryit": [
   [
    "A security engineer at your company asks that the central log server receive only serious problems, not routine notices, but she wants errors and anything worse included. Today the router has `set system syslog host 192.0.2.50 any any`. What would you change it to, and what will she stop receiving?",
    "Change it to a severity such as `set system syslog host 192.0.2.50 any warning` (or `error` if she wants only errors and worse). With warning she still receives warning, error, critical, alert and emergency, and stops receiving notice, info and debug."
   ],
   [
    "You are reviewing a router and find `set system services telnet` and `set system services ssh` with no other options. List two changes that improve security without removing remote access.",
    "Delete the Telnet service (`delete system services telnet`) so credentials are not sent in clear text, and add `set system services ssh root-login deny` so administrators must use named accounts."
   ]
  ],
  "tip": "Expect questions on where services live: `system services` for SSH and telnet, `system ntp`, `system syslog`, but top-level `snmp`. Also remember that a syslog severity includes everything more severe than it.",
  "check": [
   [
    "Which statement prevents direct root logins over SSH?",
    "`set system services ssh root-login deny`."
   ],
   [
    "Why is accurate time from NTP important for troubleshooting?",
    "Log timestamps and commit history must line up across devices to correlate events correctly."
   ],
   [
    "If syslog is set to severity `warning`, will `error` messages be logged?",
    "Yes. Error is more severe than warning, and a severity setting includes all more serious levels."
   ],
   [
    "Which SNMP version adds authentication and encryption?",
    "SNMPv3."
   ]
  ]
 },
 {
  "t": "Monitoring the platform: `show chassis hardware`, `show chassis alarms`, `show system alarms`, `show chassis routing-engine`, `show system storage`",
  "hook": "At 2:10 a.m. Priya's phone buzzes: the monitoring system at Northgate Logistics reports a major alarm on the core router in the main warehouse. She logs in from home, half awake, with the operations manager already asking whether the morning shipping run is at risk. Is a fan dying, a power supply out, the disk full, or is the control plane overloaded? Priya has five commands she types before she touches routing or interfaces. Which ones tell her what is wrong with the box itself, and which details will the replacement-parts request need?",
  "simple": "Before blaming the network, check that the device itself is healthy, the way a mechanic checks the dashboard lights before taking the engine apart. Junos has a few commands for this. One lists every physical part with its serial number. Two list warnings: one for hardware problems such as a broken fan or power supply, and one for software problems such as a missing backup configuration. One shows how hard the device's brain, the Routing Engine, is working: its processor, memory and temperature. The last shows how full the disks are, much like checking free space on your phone before installing an update. Together they answer: is anything broken, overheating, overloaded or full?",
  "body": [
   "Before you troubleshoot routing or interfaces, you need to know the device itself is healthy. Junos provides a small set of operational-mode commands that tell you what hardware is installed, whether anything is alarming, how busy the control plane is and whether storage is filling up. These are the first commands many engineers type after logging in to an unfamiliar or misbehaving device, and they are a frequent topic on the exam because each one answers a different question.",
   "The first, `show chassis hardware`, lists the physical inventory. You see the chassis, the Routing Engines, line cards such as FPCs (Flexible PIC Concentrators), the PICs (Physical Interface Cards) they hold, power supplies, fans and pluggable optics, each with part numbers, revision numbers and serial numbers. You use it to confirm that a replacement card was detected, to record serial numbers for a support case or an asset audit, or to check which transceiver is plugged into a port before you blame the far end. Adding `detail` or `extensive` shows more, such as memory sizes and component versions.",
   "Junos separates alarms into two kinds, and the exam expects you to know which is which. `show chassis alarms` reports hardware and environmental problems: a failed fan, a power supply without input, a temperature over its limit, or a link down on an interface that has been configured to raise an alarm. `show system alarms` reports software and configuration conditions, such as a missing rescue configuration, a license issue or a problem with the boot media. Each alarm has a class: Major, shown in red and needing immediate attention, or Minor, shown in yellow. Many devices also light alarm LEDs on the front panel, and the CLI may display a banner at login telling you alarms are active, so even a technician on site has a clue.",
   "The command `show chassis routing-engine` shows the health of the Routing Engine (RE), the component that runs Junos, the routing protocols and the CLI itself. Key fields include CPU utilization, split into user, background, kernel, interrupt and idle percentages; memory utilization; temperature; uptime; the last reboot reason; and the one-, five- and fifteen-minute load averages. Consistently high CPU can point to a routing protocol problem, such as a flapping neighbor causing constant recalculation, or to excessive traffic being sent to the RE instead of being forwarded in hardware. On dual-RE systems the output also shows which RE is currently the primary (master) and which is the backup, which matters when you plan a switchover.",
   "The command `show system storage` works like the Unix `df` command. It lists each file system with its total size, used space, available space, percentage used and mount point. Pay special attention to `/var`, which holds logs, temporary files and staged software. If `/var` fills up, logs cannot be written, so you lose visibility exactly when you need it, and software upgrades fail because there is no room to copy and unpack the package. When space is low you clean it with `request system storage cleanup`, covered in a later lesson.",
   "```\nuser@R1> show chassis alarms\n1 alarms currently active\nAlarm time               Class  Description\n2026-03-02 09:14:21 UTC  Major  PEM 1 Not OK\nuser@R1> show system alarms\n1 alarms currently active\nAlarm time               Class  Description\n2026-03-01 18:02:44 UTC  Minor  Rescue configuration is not set\n```",
   "Reading the sample output above, the chassis alarm says a power entry module, PEM 1, is not OK, a hardware problem that needs a site visit or a check of the power feed. The system alarm says no rescue configuration is saved, a software condition you fix from the CLI in seconds with `request system configuration rescue save`. Same device, two very different responses, which is exactly why Junos keeps the two lists separate.",
   "Together these commands give you a quick health check: inventory, alarms of both kinds, control plane load and disk space. Related commands worth knowing are `show chassis environment`, which reports temperatures, fan speeds and power status for each component, and `show system uptime`, which tells you when the system booted, when protocols last started and when the configuration was last committed. A disciplined engineer runs this short sequence before and after every maintenance window, so that any new alarm or sudden jump in CPU can be traced to the change that caused it."
  ],
  "analogy": "Checking a Junos device is like checking a car before a long drive. `show chassis hardware` is the parts list in the owner's manual with serial numbers. `show chassis alarms` is the warning lights for physical faults like low oil or overheating, while `show system alarms` is the infotainment screen nagging about a missed software update. `show chassis routing-engine` is the tachometer and temperature gauge for the engine, and `show system storage` is the fuel gauge. The analogy stops at fixing things: some \"warning lights\" here, like the rescue alarm, you clear yourself in seconds.",
  "terms": [
   [
    "Chassis alarm",
    "A hardware or environmental alarm, such as a failed fan or power supply, shown by `show chassis alarms`."
   ],
   [
    "System alarm",
    "A software or configuration alarm, such as a missing rescue configuration, shown by `show system alarms`."
   ],
   [
    "Major and Minor",
    "Alarm classes: Major (red) needs immediate attention; Minor (yellow) is less urgent."
   ],
   [
    "Routing Engine (RE)",
    "The control-plane component that runs Junos, routing protocols and management; its health is shown by `show chassis routing-engine`."
   ],
   [
    "FPC",
    "Flexible PIC Concentrator, a line card slot that holds PICs and forwards traffic on many Junos platforms."
   ],
   [
    "show system storage",
    "Lists file systems with size, used and available space, like the Unix `df` command."
   ]
  ],
  "example": "The NOC receives an SNMP trap that a router has a major alarm. The on-call engineer logs in, runs `show chassis alarms` and sees a power supply reporting no input. `show chassis hardware` gives the power supply's part and serial number, which she adds to the replacement request. `show system alarms` is clean, so the software side is fine.",
  "mistakes": [
   [
    "Expecting a missing rescue configuration to appear in `show chassis alarms`.",
    "It is a software or configuration condition, so it appears in `show system alarms`. Chassis alarms cover hardware and environment."
   ],
   [
    "Looking for Routing Engine CPU and memory in `show chassis hardware`.",
    "Hardware lists inventory and serial numbers. CPU, memory, temperature, uptime and last reboot reason are in `show chassis routing-engine`."
   ],
   [
    "Ignoring a nearly full `/var` because the device is forwarding traffic fine.",
    "A full `/var` stops log writes and causes software upgrades to fail. Check `show system storage` and clean up before upgrades."
   ]
  ],
  "tryit": [
   [
    "You are asked to open a hardware replacement case for a line card that a technician says shows a red LED. The vendor's form asks for the part number and serial number, and your manager wants to know whether the software side also needs attention. Which commands do you run and what do you look for in each?",
    "Run `show chassis alarms` to confirm the hardware alarm and its class, `show chassis hardware` to read the line card's part and serial numbers, and `show system alarms` to check for any software or configuration alarms that need separate action."
   ],
   [
    "A router's users report slow SSH logins and delayed CLI responses, but traffic through the router seems normal. Which platform command is most useful first, and what fields would you check?",
    "`show chassis routing-engine`, checking CPU utilization (especially low idle), memory utilization and load averages, since the control plane rather than forwarding appears to be struggling."
   ]
  ],
  "tip": "Chassis alarms are about hardware and environment; system alarms are about software and configuration. A missing rescue configuration is the classic example of a system alarm.",
  "check": [
   [
    "Which command would report that no rescue configuration is saved?",
    "`show system alarms`, because it is a software/configuration condition."
   ],
   [
    "Where would you find the Routing Engine's CPU and memory utilization and last reboot reason?",
    "`show chassis routing-engine`."
   ],
   [
    "Why might a software upgrade fail after `show system storage` shows /var almost full?",
    "There is no room to copy and unpack the package; clean up storage first."
   ]
  ]
 },
 {
  "t": "Monitoring interfaces: `show interfaces terse`, `extensive`, `monitor interface`, `monitor traffic interface`",
  "hook": "The help-desk ticket at Birchwood Dental Group says only \"the internet is slow at the Elm Street office.\" Marcus logs in to the branch router. The uplink is up, pings to the provider work, and nobody has changed anything in weeks. Yet staff swear that uploading X-ray images now takes minutes instead of seconds. Something is wrong on that link, but \"up\" is not the same as \"healthy.\" Which interface views will show Marcus the difference, prove whether the problem is still happening right now, and tell him whether to call the carrier or grab a new patch cable?",
  "simple": "Interfaces are the router's ports, and most network problems show up there. Junos lets you look at them at different zoom levels. The terse view is a one-line summary per port: is it switched on, is the cable connected, what address does it have. The extensive view is the full medical report, including error counts that show a damaged cable. `monitor interface` is a live dashboard whose numbers update every second, like watching a car's speedometer instead of reading last month's mileage. `monitor traffic interface` lets you see individual packets, but mainly the ones addressed to the router itself, not traffic just passing through it.",
  "body": [
   "Interfaces are where most network problems show up, so Junos gives you several views of them, from a one-line summary, to a detailed error report, to live counters, to a packet capture. Choosing the right view saves time: you start broad to find the interface with a problem, then zoom in to understand what kind of problem it is and whether it is still happening.",
   "The quick overview is `show interfaces terse`. Each physical interface and each logical unit gets one line, with columns for Admin status, Link status, Proto (the protocol families configured on the unit, such as inet for IPv4, inet6 for IPv6 or iso for IS-IS) and Local and Remote addresses. Reading the status columns is a core skill. Admin up and Link down usually means a cabling, optic or far-end problem, because the interface is enabled in configuration but no signal is present. Admin down means someone configured `disable` on the interface. You can narrow the output with an interface name, such as `show interfaces terse ge-0/0/1`, or a wildcard such as `show interfaces terse ge-*`.",
   "```\nuser@R1> show interfaces terse ge-0/0/1\nInterface       Admin Link Proto    Local            Remote\nge-0/0/1        up    up\nge-0/0/1.0      up    up   inet     10.1.12.1/30\n```",
   "Without options, `show interfaces ge-0/0/1` gives a medium level of detail: speed, MTU, MAC address, flags, input and output rates and the addresses on each logical unit. `show interfaces ge-0/0/1 detail` adds traffic statistics, and `show interfaces ge-0/0/1 extensive` shows everything, including error counters: input errors, CRC (cyclic redundancy check) or framing errors, drops, runts, collisions, carrier transitions and per-queue statistics. When a link is up but users complain it is slow or dropping, extensive output is where you look. Rising CRC errors usually point at a bad cable, a dirty or failing optic, or a duplex or speed mismatch; a growing carrier transitions count shows a link that is flapping, going down and up. Counters accumulate since boot or the last clear, so a large number may be old history. Use `clear interfaces statistics ge-0/0/1` to reset them, then check again to see whether errors are still increasing now.",
   "For a live view, `monitor interface ge-0/0/1` opens a full-screen, real-time display of the interface's counters and rates that refreshes about once per second, with a column showing how much each counter has changed since you started watching. Single keys control it: n moves to the next interface, f freezes the display, t thaws it again, c clears the delta counters and q quits. It is ideal for watching whether traffic is flowing at this moment or whether errors are climbing while a user repeats a slow transfer. `monitor interface traffic` shows a live summary of all interfaces at once, which helps you spot the busiest port quickly.",
   "When you need to see actual packets, `monitor traffic interface ge-0/0/1` provides a capture similar to tcpdump. There is an important limitation that the exam likes to test: on most platforms it shows only packets sent to or from the Routing Engine, such as routing protocol hellos, pings to the device itself, SSH sessions and ARP, not transit traffic that the forwarding hardware passes through the box. That makes it excellent for checking whether OSPF hellos or BGP messages are arriving from a neighbor, and a poor tool for watching a user's web download. Useful options include `no-resolve` to avoid slow DNS lookups, `detail` for more protocol decode, `count` to stop after a number of packets, and a `matching` expression to filter, for example `monitor traffic interface ge-0/0/1 matching \"proto ospf\"`. Press Ctrl+C to stop the capture.",
   "Putting the views together gives a reliable troubleshooting path. Start with `show interfaces terse` to find interfaces that are down and see whether the cause is configuration (Admin down) or physical (Link down). For an interface that is up but performing badly, use `extensive` to read the error counters, clear them, and use `monitor interface` to see whether errors are still growing. When a routing adjacency will not form, use `monitor traffic interface` to confirm whether the neighbor's protocol packets are reaching the Routing Engine at all. Each step narrows the problem before you change anything. Recording what you saw at each step, such as the CRC count before and after clearing, also gives you evidence to share with a carrier or a field technician, which shortens the conversation when you ask them to replace an optic or test a circuit."
  ],
  "analogy": "Think of a hospital ward. `show interfaces terse` is the board at the nurses' station: one line per patient saying awake or asleep, stable or not. `extensive` is the full chart with every test result, including the slow-building problems. `monitor interface` is the bedside monitor beeping in real time. `monitor traffic interface` is listening with a stethoscope, but only to the patient's own heartbeat (traffic to the Routing Engine), not to the visitors walking past the bed (transit traffic).",
  "terms": [
   [
    "show interfaces terse",
    "A one-line-per-interface summary of admin status, link status, protocol families and addresses."
   ],
   [
    "extensive",
    "The most detailed interface output, including error counters such as CRC errors, drops and carrier transitions."
   ],
   [
    "CRC error",
    "A cyclic redundancy check failure, meaning a received frame was corrupted, often by a bad cable or optic."
   ],
   [
    "Carrier transitions",
    "A counter of how many times the link has gone down and up; a rising value indicates flapping."
   ],
   [
    "monitor interface",
    "A live, auto-refreshing display of one interface's counters and rates."
   ],
   [
    "monitor traffic interface",
    "A tcpdump-like capture of packets to and from the Routing Engine on an interface."
   ]
  ],
  "example": "Users on a branch report slow file transfers. `show interfaces terse` shows the uplink as up/up, but `show interfaces ge-0/0/0 extensive` shows thousands of input CRC errors. After `clear interfaces statistics ge-0/0/0`, `monitor interface ge-0/0/0` shows the CRC count still rising during a transfer. Replacing the patch cable stops the errors.",
  "mistakes": [
   [
    "Using `monitor traffic interface` to capture a user's transit traffic through the router.",
    "On most platforms it shows only traffic to or from the Routing Engine, such as protocol hellos, pings to the device and SSH. Transit traffic is forwarded in hardware and not shown."
   ],
   [
    "Reading Admin down as a cabling problem.",
    "Admin down means the interface is disabled in configuration. Admin up with Link down is the pattern that points to a cable, optic or far-end problem."
   ],
   [
    "Treating a large CRC counter as proof of a current problem.",
    "Counters accumulate since boot or the last clear. Clear the statistics and watch whether errors are still increasing."
   ],
   [
    "Expecting error counters in plain `show interfaces terse` output.",
    "Terse shows status and addresses only. Error counters are in `extensive` output."
   ]
  ],
  "tryit": [
   [
    "An OSPF neighbor on ge-0/0/2 is stuck and will not reach Full. The interface shows up/up in terse output and pings across the link succeed. You want to know whether the neighbor's OSPF hellos are actually reaching your router. Which command do you use and why is it suitable here?",
    "`monitor traffic interface ge-0/0/2 matching \"proto ospf\"` (optionally with `no-resolve`). OSPF hellos are addressed to the Routing Engine, so they appear in this capture, letting you confirm whether they arrive and inspect their parameters."
   ]
  ],
  "tip": "Remember that `monitor traffic interface` normally sees only traffic to or from the Routing Engine, not transit traffic. And up/down (admin up, link down) is a physical problem, while down in the Admin column means the interface is disabled in configuration.",
  "check": [
   [
    "In `show interfaces terse`, ge-0/0/2 shows Admin up, Link down. What is the likely cause?",
    "A physical-layer problem such as a cable, optic or the far-end port, since the interface is enabled in configuration."
   ],
   [
    "Which command shows CRC errors on an interface?",
    "`show interfaces <name> extensive`."
   ],
   [
    "Would `monitor traffic interface` show a web download passing through the router between two hosts?",
    "Generally no; it captures traffic to and from the Routing Engine, not transit traffic forwarded in hardware."
   ]
  ]
 },
 {
  "t": "Network tools: ping, traceroute, SSH, telnet from the CLI",
  "hook": "Fiona at Cedar Point Credit Union has just brought up a new circuit to a payments partner. From the router, `ping 172.16.5.1` replies perfectly, and she is ready to declare victory. Then the teller supervisor calls: none of the branch workstations can reach the partner's system, and the morning batch is due in an hour. The router can reach the far side, so how can the hosts behind it not? Fiona's tools are all right there in the Junos CLI, but the answer depends on one option she has not used yet. What is the router's ping not telling her?",
  "simple": "Junos includes the classic network test tools right in the command line. `ping` is like knocking on a door and listening for a reply: it tells you whether a device answers. `traceroute` is like asking for a list of every town your package passed through on its way, so you can see where it got stuck. SSH and Telnet let you open a remote session from the router to another device, a bit like phoning a colleague from the office line. The router-specific twist is that you can choose which of the router's addresses the test comes from. That matters because the reply has to find its way back to that exact return address.",
  "body": [
   "Junos includes the familiar network testing tools directly in operational mode. You do not need to leave the CLI or find a workstation to test reachability, trace a path or open a session to another device. What makes them powerful on a router is the set of options that let you choose the source address, the outgoing interface, the routing instance and the packet size, so that your test behaves like the real traffic you are trying to troubleshoot. A test that does not match the real traffic can mislead you in either direction.",
   "The `ping` command sends ICMP (Internet Control Message Protocol) echo requests and reports the echo replies. Unlike the Windows version, Junos ping keeps running until you press Ctrl+C unless you give a `count`, which surprises people the first time. Useful options include `count 5` to stop after five packets; `rapid`, which sends a quick burst of five packets by default and prints `!` for each reply and `.` for each timeout; `source 10.0.0.1` to test from a specific local address; `interface ge-0/0/1` to send out a specific interface; `routing-instance vr1` to use another routing table; `size 1472` together with `do-not-fragment` to test whether a path can carry full-size packets without fragmentation; and `ttl` to limit how many hops the packet may cross.",
   "```\nuser@R1> ping 10.1.12.2 rapid count 5\nPING 10.1.12.2 (10.1.12.2): 56 data bytes\n!!!!!\n--- 10.1.12.2 ping statistics ---\n5 packets transmitted, 5 packets received, 0% packet loss\n```",
   "Choosing the source address matters more than any other option. When you ping a remote network from a router, the default source address is the address of the outgoing interface, often a small point-to-point link subnet. The far end may have a route back to your loopback or your LAN prefix but no route back to that link address, so the ping fails even though real traffic works. The reverse also happens, as in the opening story: the ping from the link address works, but the far end has no route back to the LAN, so hosts fail. Testing with `source` set to the loopback address, or to the LAN gateway address, gives a more realistic result because it proves the return path for the traffic you actually care about.",
   "The `traceroute` command shows each router hop on the path to a destination. It works by sending probes with increasing TTL (time to live) values: the first probe has a TTL of 1, so the first router discards it and returns an ICMP time-exceeded message, revealing itself; the next probe has a TTL of 2, and so on until the destination answers. Each line of output shows a hop number, the responding router and its response times. Asterisks mean no reply arrived within the timeout, which may be a filter or rate limit on that router rather than a real failure, especially if later hops respond normally. Traceroute supports the same `source` and `routing-instance` options, plus `no-resolve` to skip slow DNS lookups. For IPv6, use `traceroute inet6` and `ping inet6`.",
   "The `ssh` and `telnet` commands open a session from the device to another host, for example `ssh user@192.0.2.20` or `telnet 192.0.2.20`. This is useful when you can only reach a remote device by first logging in to a nearby router that acts as a jump point. Telnet has a second, very practical use: testing whether a TCP port is open. `telnet 192.0.2.20 port 179` checks whether something on that address is listening on the BGP port; a connection that opens tells you the port is reachable, while a refusal or timeout points to a filter, a missing configuration or a routing problem. Both commands accept `routing-instance` and `source` options. Remember that Telnet is unencrypted, so use it for testing rather than for managing production devices.",
   "A sensible troubleshooting order uses these tools together. Start with a ping from the router using the source address that matches the real traffic. If it fails, run traceroute with the same source to see where the path stops. If the path looks fine but an application still fails, test the specific TCP port with telnet. Each result narrows the problem from \"something is broken\" to a specific hop, route or filter. Write down the exact commands and options you used, because a colleague or a partner's engineer who repeats the same test with a different source address may get a different answer, and the difference is often the clue that solves the case."
  ],
  "analogy": "Pinging from a router is like mailing a letter with a reply envelope. The recipient may be perfectly reachable, but if the return address on the envelope is one their post office does not know how to deliver to, no reply ever comes back. Changing the `source` is choosing which return address to print. Traceroute is a package tracker listing each depot it passed through; a depot that does not report a scan (asterisks) has not necessarily lost the package.",
  "terms": [
   [
    "ping rapid",
    "A ping mode that sends a burst of echo requests and prints `!` for replies and `.` for timeouts."
   ],
   [
    "source option",
    "Sets the source IP address of a test packet, which affects whether the far end can reply."
   ],
   [
    "do-not-fragment",
    "A ping option that, with `size`, tests whether a path can carry a packet of that size without fragmentation."
   ],
   [
    "traceroute",
    "A tool that reveals each router hop to a destination using increasing TTL values."
   ],
   [
    "routing-instance option",
    "Runs a test using a specific routing instance's table instead of the default inet.0."
   ]
  ],
  "example": "A new link to a partner network is up, and `ping 172.16.5.1` from the router works, but hosts on the LAN cannot reach the partner. `ping 172.16.5.1 source 10.10.10.1` (the LAN gateway address) fails, revealing that the partner has no return route to the LAN prefix. Adding that route on the partner side fixes it.",
  "mistakes": [
   [
    "Concluding that hosts can reach a destination because a ping from the router works.",
    "The router's ping uses the outgoing interface address by default. Repeat the test with `source` set to the LAN or loopback address to prove the return path for real traffic."
   ],
   [
    "Expecting Junos ping to stop on its own after a few packets.",
    "It runs until Ctrl+C unless you specify `count` or use `rapid`."
   ],
   [
    "Reading asterisks in traceroute as proof that a hop is down.",
    "They mean no reply within the timeout, which is often filtering or rate limiting. If later hops answer, traffic is passing through."
   ],
   [
    "Using Telnet only as an insecure login tool and forgetting its testing value.",
    "`telnet <address> port <n>` is a quick way to see whether a TCP port, such as 179 for BGP, is reachable. Avoid it for production management."
   ]
  ],
  "tryit": [
   [
    "A router's loopback 10.255.0.1 is used as the BGP source toward a peer at 203.0.113.9. The session will not establish. A plain `ping 203.0.113.9` works. What two tests do you run next, and what would each result tell you?",
    "Run `ping 203.0.113.9 source 10.255.0.1` to check that the peer has a return route to your loopback, and `telnet 203.0.113.9 port 179 source 10.255.0.1` to check whether the BGP port is reachable from that source. A failed sourced ping points to routing; a successful ping but refused port points to a filter or missing BGP configuration on the peer."
   ],
   [
    "Users report large file transfers to a remote site stall, while small web pages load. You suspect a path that cannot carry full-size packets. Which ping options help you test this?",
    "Use `ping <destination> size 1472 do-not-fragment` (1472 bytes of data plus headers fills a 1500-byte packet) and reduce the size until replies return, which shows the largest packet the path carries without fragmentation."
   ]
  ],
  "tip": "Junos ping runs forever without `count` or `rapid`. When a question describes a ping from the router working but hosts failing, think about the source address and the return route.",
  "check": [
   [
    "How do you ping from a router using its loopback address as the source?",
    "`ping <destination> source <loopback address>`."
   ],
   [
    "How would you test whether a remote router accepts TCP connections on port 179?",
    "`telnet <address> port 179` from the CLI."
   ],
   [
    "What does a line of asterisks in traceroute output mean?",
    "That hop did not reply within the timeout, possibly because of filtering or rate limiting, not necessarily a failure."
   ]
  ]
 },
 {
  "t": "System logging (`/var/log/messages`, `show log`) and protocol traceoptions",
  "hook": "It is the second night in a row that the OSPF adjacency between two routers at Summit Valley Hospital has dropped at 3 a.m. and come back on its own a minute later. The imaging team wants to know why their transfers keep failing overnight, and Jonah, the network engineer on call, has nothing but a vague alert. The router knows exactly what happened; it wrote it down. But where, and how does Jonah find two relevant lines among thousands? And if the log only says the neighbor went down, how does he find out why?",
  "simple": "A router keeps a diary of what happens to it: ports going up and down, people logging in, configuration changes, and neighbors appearing or disappearing. In Junos the main diary file is called `messages`, kept in a folder named `/var/log`, and you read it with `show log messages`. Because it is long, you filter it, like searching your email for one word. That diary tells you what happened. When you need to know why, you turn on traceoptions, which is like asking one department to write a very detailed minute-by-minute report for a while. Those reports are large, so you switch them off when you are done.",
  "body": [
   "Logs tell you what the device has been doing: interfaces going up and down, commits, logins and failed logins, routing protocol neighbors changing state and hardware events. Junos writes these events to files under the `/var/log` directory. The most important file is `messages`, which on most platforms is configured by default to collect events at severity notice and above from all facilities. When something goes wrong, `messages` is almost always the first place to look, because it gives you a timeline of events with timestamps, the process that reported each event, and a short event tag that you can search for.",
   "You read logs from operational mode with `show log messages`. The file can be thousands of lines long, so you will rarely read it unfiltered. Instead you pipe the output: `show log messages | match ge-0/0/1` finds lines mentioning an interface, `show log messages | last 20` shows the most recent twenty entries, and `| except` hides noisy lines you do not care about. You can chain pipes, for example matching an event tag and then showing only the last few occurrences. Another useful file, if configured, is `interactive-commands`, which records the commands users typed, a valuable audit trail. Typing `show log` alone lists the files available in `/var/log`, which is handy when you do not remember a file's exact name.",
   "```\nuser@R1> show log messages | match SNMP_TRAP_LINK | last 3\nMar  2 10:01:12 R1 mib2d[1780]: SNMP_TRAP_LINK_DOWN: ifIndex 526, ifAdminStatus up(1), ifOperStatus down(2), ifName ge-0/0/1\n```",
   "Reading the line above from left to right, you see the timestamp, the hostname R1, the process that logged the event (`mib2d` with its process ID), the event tag `SNMP_TRAP_LINK_DOWN`, and the details: the interface ge-0/0/1 is administratively up but operationally down. That combination points to a physical link loss rather than someone disabling the port.",
   "To watch a log live, use `monitor start messages`. New lines are printed to your terminal as they are written, which is ideal while you reproduce a problem, such as unplugging a cable or restarting a neighbor. Stop it with `monitor stop`. You can press Esc-Q to pause and resume the output on screen temporarily without stopping monitoring. Log files rotate when they reach their configured size limit: the current file is renamed and compressed, keeping a set of older files such as `messages.0.gz` and `messages.1.gz`, so older events may live in those archives rather than the current file.",
   "Syslog tells you what happened; traceoptions tell you why. Traceoptions are a detailed debugging facility that you enable per protocol or per process in the configuration. You choose a trace file name, optionally its size and the number of rotated copies, and one or more flags that select what to record. For OSPF, for example, the `hello` flag records hello packets, the `error` flag records errors such as mismatched parameters, and the `state` flag records neighbor state changes. Adding `detail` to a flag records more of each packet's contents.",
   "```\nset protocols ospf traceoptions file ospf-trace size 1m files 3\nset protocols ospf traceoptions flag hello detail\nset protocols ospf traceoptions flag error\n```",
   "After committing, read the trace with `show log ospf-trace` or watch it live with `monitor start ospf-trace`, because trace files are also stored in `/var/log`. Use traceoptions with discipline. They can generate a lot of output and use Routing Engine CPU and disk space, so enable only the flags you need, limit the file size and number of files, and remove or deactivate the traceoptions when you finish. The `all` flag is tempting but is usually far too verbose for a production device, where it can bury the useful lines and add load at the worst possible moment.",
   "A typical workflow ties the two together. First check `show log messages` for the event, for example that an OSPF neighbor went down at a certain time. Then enable traceoptions for that protocol with a few targeted flags to see the details, for example that the neighbor's hellos carry a different dead interval than the local configuration. Fix the problem, confirm the neighbor is stable, and then delete or deactivate the traceoptions and commit. Leaving tracing on indefinitely is one of the most common ways to fill `/var` without noticing."
  ],
  "analogy": "The messages log is a building's front-desk logbook: who came and went, which doors opened, short one-line entries with times. Traceoptions are like installing a camera in one room for a few days to see exactly what happens there. The camera answers why, but it fills storage quickly and someone has to remember to take it down afterward. Both recordings are kept in the same cabinet, `/var/log`, and you open either one with `show log`.",
  "terms": [
   [
    "/var/log/messages",
    "The main system log file on Junos, holding events from all facilities at the configured severity."
   ],
   [
    "show log",
    "Displays a log file from /var/log, or lists the files when used alone."
   ],
   [
    "monitor start",
    "Prints new lines of a log or trace file to the terminal in real time until `monitor stop`."
   ],
   [
    "Log rotation",
    "Renaming and compressing a full log file into archives such as `messages.0.gz` so a fresh file can be written."
   ],
   [
    "traceoptions",
    "Per-protocol or per-process debugging configuration that writes detailed events to a trace file based on selected flags."
   ]
  ],
  "example": "An OSPF adjacency to a new router will not form. `show log messages | match OSPF` shows nothing useful, so the engineer enables `traceoptions` with the `hello` and `error` flags. The trace shows hellos arriving with a dead interval of 120 seconds while the local setting is 40. Matching the timers brings the neighbor up, and she deletes the traceoptions.",
  "mistakes": [
   [
    "Thinking traceoptions are an operational command you run like `show`.",
    "Traceoptions are configuration under a protocol or process and take effect after commit. You read the result with `show log <tracefile>`."
   ],
   [
    "Leaving traceoptions, especially the `all` flag, running after troubleshooting.",
    "Tracing consumes Routing Engine CPU and disk space. Use targeted flags, limit file size and count, and remove it when done."
   ],
   [
    "Assuming `show log messages` shows every event that ever happened.",
    "It shows the current file at the configured severity. Older events may be in rotated archives such as `messages.0.gz`, and events below the configured severity are not recorded."
   ],
   [
    "Expecting `monitor start` to stop when you log out or press a key.",
    "Use `monitor stop` to end it; Esc-Q only pauses the on-screen output."
   ]
  ],
  "tryit": [
   [
    "A BGP session to an upstream provider resets a few times a day. `show log messages | match BGP` shows state changes but not the reason. You are asked to collect more detail without risking the router's stability during business hours. What do you configure, and what do you do afterward?",
    "Configure BGP traceoptions with a named file, a limited `size` and number of `files`, and only targeted flags (for example state and error rather than `all`). Read it with `show log <file>` or `monitor start <file>`. When the cause is found, delete or deactivate the traceoptions and commit."
   ]
  ],
  "tip": "Syslog records events at a chosen severity; traceoptions give protocol-level debugging detail. Both end up in /var/log and both are read with `show log <file>`. Always remove traceoptions after troubleshooting.",
  "check": [
   [
    "How do you display only the last 10 lines of the messages log?",
    "`show log messages | last 10`."
   ],
   [
    "How do you see new log entries in real time and then stop?",
    "`monitor start messages` to begin and `monitor stop` to end."
   ],
   [
    "Why should traceoptions be removed after use?",
    "They can generate large files and consume Routing Engine CPU and storage."
   ]
  ]
 },
 {
  "t": "Managing files: `file list`, `file show`, `request system storage cleanup`",
  "hook": "Rosa at Bluewater Port Authority has a software upgrade scheduled for a harbor-gate router at 10 p.m. At 9:40 she starts copying the package, and the transfer dies halfway with a message that there is no space left on the device. The router has been running for three years, quietly collecting rotated logs, a crash dump from last winter and the leftover package from the previous upgrade. Rosa has twenty minutes. She could start deleting files she half recognizes, or she could use the tools Junos provides. How does she find out what is taking the space and clear it without deleting something important?",
  "simple": "Under the hood, a Junos device is a small computer with folders and files, like the one on your laptop. Logs go in one folder, temporary files and new software in another, and each user has a home folder. The `file list` command shows what is in a folder, like opening a folder window. `file show` opens a text file so you can read it. Over time old files pile up, like downloads you forgot about, and the disk fills. Instead of deleting files one by one and risking a mistake, Junos has a cleanup command that shows you what it plans to remove and asks before it deletes anything. It can even show the list without deleting.",
  "body": [
   "Junos is built on a Unix-like operating system, so it has an ordinary file system with directories, files, owners and permissions. A few directories matter most. `/var/log` holds logs and trace files. `/var/tmp` holds temporary files and is the usual place to stage software packages before installation. `/config` and `/var/db/config` hold the saved configuration files, including the active configuration and the rollback history. Each user has a home directory, `/var/home/<user>`, which is where commands such as `save` write files by default when you do not give a full path. From the CLI you manage these files with the `file` family of commands, so you do not need to drop into a Unix shell.",
   "The `file list` command shows the contents of a directory. With no argument it lists your home directory. `file list /var/tmp` lists the temporary directory, and `file list /var/log detail` adds the size, owner and modification date of each file, similar to the Unix `ls -l` command. You use it to confirm that a software package finished copying with the expected size, to find the exact name of an old log or trace file, or to check whether a configuration backup you saved earlier is still there.",
   "The `file show` command displays the contents of a text file, for example `file show /var/log/messages` or `file show /var/tmp/backup.conf`. It is useful for reading a saved configuration before you load it, or for reading a log file that is not in the default location. Several other file commands are worth recognizing. `file copy` copies files locally or to and from a remote server using FTP, SCP or HTTP style locations, which is how you move backups off the device and bring software packages on. `file delete` removes a file, `file rename` renames or moves it, `file compare files` shows the differences between two files, and `file archive` compresses files into an archive.",
   "```\nuser@R1> file list /var/tmp detail\n/var/tmp:\n-rw-r--r--  1 root  wheel  412331520 Mar  1 22:10 junos-install-package.tgz\n-rw-r--r--  1 admin wheel      18234 Mar  2 08:02 r1-backup.conf\nuser@R1> file copy /var/tmp/r1-backup.conf scp://admin@192.0.2.30/backups/\n```",
   "In the listing above, the first file is a large software package of roughly 400 MB left in `/var/tmp`, and the second is a small configuration backup owned by the admin user. The `file copy` line then sends that backup to a remote server over SCP (Secure Copy Protocol), so a copy exists off the device.",
   "Over time, storage fills with rotated log files, crash dumps, old software packages and temporary files. `show system storage` tells you how full each file system is. To reclaim space safely, Junos provides `request system storage cleanup`. It first lists the files it plans to delete and asks for confirmation before removing anything, so you can review the list. If you only want to see the list without deleting anything, add `dry-run`: `request system storage cleanup dry-run`. This is a safe first step on any device you are not familiar with, and it is also a good way to show a change reviewer what will be removed before the maintenance window.",
   "Running cleanup before a software upgrade is a common best practice, since the new package must be copied to the device and then expanded during installation, which temporarily needs more space than the package itself. After cleanup, run `show system storage` again to confirm you have enough room, and use `file list /var/tmp detail` after copying to confirm the package arrived complete.",
   "Be careful with manual deletes. `file delete` removes a file immediately; there is no recycle bin or undo. Do not delete files you do not understand, especially in configuration directories such as `/config`, where removing the wrong file could affect the active configuration or your rollback history. The cleanup command is the preferred method because it targets only files the system considers safe to remove, such as rotated logs, crash files and temporary files. Reserve `file delete` for files you created yourself, such as an old backup or a package you staged and no longer need. Before deleting even those, consider whether a copy should first be sent off the device with `file copy`, since a backup that exists only on the router it protects is of little use if that router fails. A short habit of listing, previewing, copying and only then deleting keeps storage healthy without surprises."
  ],
  "analogy": "Managing files on a Junos device is like tidying a shared office storeroom. `file list` is opening the door and reading the box labels, and `file show` is opening one box to read what is inside. `request system storage cleanup` is the facilities team that hands you a list of boxes marked for recycling and waits for your signature; `dry-run` is asking for the list without the truck. `file delete` is you throwing a box in the shredder yourself: fast, but there is no getting it back.",
  "terms": [
   [
    "file list",
    "Lists files in a directory; `detail` adds size, owner and date."
   ],
   [
    "file show",
    "Displays the contents of a text file from the CLI."
   ],
   [
    "file copy",
    "Copies a file locally or to and from a remote server, for example using SCP or FTP."
   ],
   [
    "request system storage cleanup",
    "Removes rotated logs, crash files and temporary files after showing the list and asking for confirmation."
   ],
   [
    "dry-run",
    "A cleanup option that shows which files would be deleted without deleting them."
   ],
   [
    "/var/tmp",
    "The temporary directory where software packages are usually staged before installation."
   ]
  ],
  "example": "Before upgrading a branch router, an engineer runs `show system storage` and sees /var at 93 percent. `request system storage cleanup dry-run` shows old log archives and a leftover package from the last upgrade. She runs the cleanup for real, confirms the space is freed and then copies the new package to /var/tmp.",
  "mistakes": [
   [
    "Believing `request system storage cleanup` deletes files immediately without warning.",
    "It lists the files and asks for confirmation first. Adding `dry-run` shows the list without deleting anything."
   ],
   [
    "Using `file delete` freely to clear space, including in configuration directories.",
    "`file delete` has no undo. Prefer the cleanup command, which only removes files considered safe, and never delete configuration files you do not understand."
   ],
   [
    "Looking for logs in /var/tmp or packages in /var/log.",
    "Logs and trace files live in /var/log; software packages are usually staged in /var/tmp."
   ],
   [
    "Confusing `file show` with `show log`.",
    "Both can display text files, but `show log` is built for files in /var/log and lets you name them without a path, while `file show` is the general tool for a file anywhere, given its path."
   ]
  ],
  "tryit": [
   [
    "You inherit a router you have never managed, and `show system storage` shows /var at 96 percent. Your change ticket requires you to document what will be removed before deleting anything. What do you run, in what order, and why?",
    "Run `request system storage cleanup dry-run` to list what would be removed and attach that list to the ticket. After approval, run `request system storage cleanup` and confirm at the prompt, then run `show system storage` again to verify the space was freed."
   ],
   [
    "A colleague says she saved a configuration with `save r1-before-change.conf` but cannot find it in /var/tmp. Where is it likely to be and how would you confirm?",
    "Without a full path, `save` writes to the user's home directory, `/var/home/<user>`. Running `file list` with no argument shows the home directory and confirms the file is there."
   ]
  ],
  "tip": "Use `dry-run` to preview a cleanup. Know the directories: logs in /var/log, packages usually staged in /var/tmp, and user files in the home directory where `save` writes by default.",
  "check": [
   [
    "How do you see which files a storage cleanup would remove without deleting them?",
    "`request system storage cleanup dry-run`."
   ],
   [
    "Which command displays the contents of a saved configuration file?",
    "`file show <path>`, for example `file show /var/tmp/backup.conf`."
   ],
   [
    "Which command lists files in /var/log with their sizes and dates?",
    "`file list /var/log detail`."
   ]
  ]
 },
 {
  "t": "Software installation and upgrades with `request system software add`; snapshots",
  "hook": "The security team at Larkspur Community College has flagged the campus core router: its Junos release needs to be upgraded before the end of the month. Tomas has done a few upgrades in a lab, but this router carries every classroom, the library and the student information system. If the new release rejects part of his configuration, or the router fails to boot, the whole campus goes dark during finals. He has a two-hour window on Saturday night. What steps will keep that window boring, and how can he make sure there is a known-good copy to fall back on if the boot media itself fails?",
  "simple": "Upgrading Junos is like installing a major operating system update on your laptop, except many people depend on this device. You prepare first: check what version you have, make sure there is free space and save a copy of your settings somewhere else. Then you copy the new software onto the device and run one install command, usually telling it to restart when done. Junos helpfully checks that your current settings will still work with the new version before it installs, and stops if they will not. After the restart you check that everything came back. Finally, once you trust the new version, you take a snapshot: a spare copy of the software and settings on a second disk, like a bootable backup drive.",
  "body": [
   "Upgrading Junos is a routine but high-stakes task. A careful process minimizes the risk of ending up with a device that does not boot, or one that boots into a release that does not support part of your configuration. The general steps are the same on most platforms, even though package names, file formats and some command options differ by product line, so always read the release notes for your specific device model and target version before you begin. Think of the process in three phases: prepare, install and verify, followed by a snapshot once the new software has proven itself.",
   "The first phase is preparation. Check the current version with `show version`, which displays the hostname, model and installed software release. Confirm that the target release supports your hardware and the features you use. Save a copy of the configuration off the device, for example with `file copy` to a server, so you can recover even if the device itself is lost. Make sure there is enough storage with `show system storage`, and free space with `request system storage cleanup` if needed, because the package must be copied and then expanded during installation. Then copy the package to the device, usually into `/var/tmp`, using `file copy` from an FTP, SCP or HTTP server, or by uploading it with SCP from your workstation. Check the file size with `file list /var/tmp detail` to confirm the copy is complete.",
   "The second phase is installation. The command is `request system software add` followed by the path to the package, typically with the `reboot` option so the new software is activated immediately after installation:",
   "```\nuser@R1> request system software add /var/tmp/<package-name>.tgz reboot\n```",
   "By default, Junos validates your current configuration against the new software before installing, and it stops if the configuration would not commit on the new release. This protects you from booting into software that rejects your configuration and leaves the device without its intended settings. You may see options such as `validate` and `no-validate`; skipping validation removes that safety net and should be done only when you understand exactly why it is needed. Without the `reboot` option, the package is staged and becomes active on the next reboot, which lets you install ahead of time and restart later inside the maintenance window. On some platforms, `request system software rollback` returns the device to the previously installed software if the upgrade causes problems.",
   "The third phase is verification. After the reboot, use `show version` to confirm the device is running the new release. Then check the health commands you know: `show chassis alarms` and `show system alarms` for new alarms, `show interfaces terse` for interfaces that did not come back, routing protocol neighbor commands to confirm adjacencies and sessions, and `show log messages` for errors logged during boot. Comparing these with output you saved before the upgrade makes any difference obvious. If something important did not come back and you cannot fix it inside the window, the decision to roll back to the previous software should be made early, while there is still time to complete it, rather than in the final minutes.",
   "Snapshots protect you against boot media problems, a different risk from a bad upgrade. A snapshot copies the running software and configuration to another storage device or partition, often called the alternate or backup media. If the primary media fails or becomes corrupted, the device can boot from the alternate copy and keep running while you repair the primary. The command is `request system snapshot`, with platform-dependent options such as selecting the target media or the alternate slice, and you check the result with `show system snapshot`. A good practice is to take a snapshot only after you have confirmed the new software is stable, so the backup copy is a known-good one rather than an untested release. Some systems raise an alarm if they booted from the backup media, which is a signal that the primary media needs attention.",
   "On devices with two Routing Engines, the software is upgraded on each RE, and features such as graceful Routing Engine switchover can reduce downtime during the process, but the basic command remains `request system software add`. Whatever the platform, the habit is the same: prepare thoroughly, let validation protect you, verify carefully, and only then refresh the snapshot so your fallback reflects a release you trust."
  ],
  "analogy": "Upgrading Junos is like moving a family into a new house. Preparation is measuring the furniture and packing a box of essentials you keep in the car (the off-device configuration backup). Validation is the inspector who checks that your furniture fits through the doors before the move starts, and stops the move if it will not. The snapshot is a copy of the house key and floor plan kept at a friend's place, made only after you are happy with the new house. The analogy stops at speed: Junos validation takes moments, not days.",
  "terms": [
   [
    "request system software add",
    "The operational command that installs a Junos software package, optionally with `reboot` to activate it immediately."
   ],
   [
    "Configuration validation",
    "A check during installation that confirms the current configuration is compatible with the new software."
   ],
   [
    "request system software rollback",
    "On platforms that support it, returns the device to the previously installed software."
   ],
   [
    "request system snapshot",
    "Copies the current software and configuration to alternate boot media as a backup."
   ],
   [
    "show version",
    "Displays the hostname, model and installed Junos software version."
   ]
  ],
  "example": "An operations team plans a Junos upgrade on a core router. They save the configuration to a server, clean storage, copy the package to /var/tmp, and run `request system software add /var/tmp/<package>.tgz reboot` in a maintenance window. After verifying neighbors and alarms for a day, they run `request system snapshot` so the backup media also holds the new, proven release.",
  "mistakes": [
   [
    "Taking a snapshot immediately before or right after installing new software.",
    "A snapshot should capture a known-good system. Take it after the new release has been verified as stable, so the backup is trustworthy."
   ],
   [
    "Assuming the new software is active as soon as `request system software add` finishes.",
    "Without `reboot`, the package is staged and becomes active only at the next reboot."
   ],
   [
    "Using `no-validate` by habit to make installs faster.",
    "Validation stops the install if the configuration would not commit on the new release. Skipping it removes that protection."
   ],
   [
    "Confusing a snapshot with a rollback of configuration.",
    "A snapshot copies software and configuration to alternate boot media to survive media failure; configuration rollback restores a previous configuration file."
   ]
  ],
  "tryit": [
   [
    "During preparation for an upgrade, you find /var at 95 percent and the package is about 400 MB. Your colleague suggests copying the package anyway and deleting files if the install fails. What should you do instead, and why?",
    "Run `request system storage cleanup dry-run`, then the cleanup, and confirm free space with `show system storage` before copying. The package must be copied and expanded, so insufficient space can cause a failed copy or install in the middle of the window."
   ],
   [
    "An upgrade completed last night and the router has run cleanly for 24 hours with all neighbors up and no alarms. Your manager asks whether anything else should be done. What do you recommend?",
    "Run `request system snapshot` (and check it with `show system snapshot`) so the alternate boot media holds the new, verified software and configuration."
   ]
  ],
  "tip": "The install command is `request system software add`; add `reboot` to activate it immediately. Snapshots copy software and configuration to alternate media, so take them after the new release has proven stable.",
  "check": [
   [
    "What happens by default if your configuration is not compatible with the new software during installation?",
    "Validation fails and the installation stops, protecting you from booting with an unusable configuration."
   ],
   [
    "When is the best time to run `request system snapshot` after an upgrade?",
    "After you have verified that the new software and configuration work correctly, so the backup is known good."
   ],
   [
    "Which command confirms the running Junos version after an upgrade?",
    "`show version`."
   ]
  ]
 },
 {
  "t": "Rebooting, halting and powering off safely: `request system reboot`, `halt`, `power-off`",
  "hook": "A facilities technician at Maple Grove Library is standing in the wiring closet with a cart, ready to move the branch router to a new rack. He calls Ava, the network engineer, and asks, \"Can I just pull the plug?\" Ava remembers a router at another branch that someone unplugged mid-write last year; it came back with a damaged file system and took half a day to recover. She is logged in remotely and has three shutdown commands to choose from. One brings the router straight back, one stops it and waits, and one turns it off entirely. Which one fits a rack move, and which one would strand her if she typed it on a device two hundred miles away?",
  "simple": "A Junos device is a real computer that is constantly writing to its disks, so yanking the power cord can scramble its files, the same way pulling the plug on a laptop mid-update can break it. Junos gives you three polite ways to stop. Reboot shuts down neatly and starts right back up, like restarting your phone. Halt shuts down neatly and then waits with the power still on, so someone can safely unplug it. Power-off shuts down neatly and then switches the power off, and it stays off until a person presses the button or plugs it back in. You can also schedule a reboot for later and cancel it if plans change.",
  "body": [
   "A Junos device runs a full operating system with file systems that are written to constantly: logs, trace files, configuration commits and internal databases. Pulling the power cord without warning risks interrupting those writes and corrupting the file systems, which can leave the device unable to boot or force a lengthy repair when it starts. Junos therefore provides commands to shut down in an orderly way. Processes stop cleanly, open files are closed and disks are synchronized before anything turns off or restarts. Knowing which command to use, and what state the device ends up in afterward, is the core of this topic.",
   "The `request system reboot` command performs a graceful restart. The device shuts down its software cleanly and boots again on its own, without anyone needing to touch it. You are asked to confirm before it proceeds, which protects you from a typo. You can schedule a reboot for a specific time with `at`, for example `request system reboot at 23:00`, or delay it by a number of minutes with `in`, for example `request system reboot in 10`. A pending scheduled reboot can be cancelled with `clear system reboot`, which is useful when a maintenance window is postponed. On systems with two Routing Engines, options such as `both-routing-engines` or `other-routing-engine` control which RE restarts. On most single-RE platforms, rebooting interrupts all traffic through the device until it is back up, so schedule it in a maintenance window and tell the people who depend on the device.",
   "The `request system halt` command stops the software gracefully but leaves the hardware powered on. The device ends at a boot-loader prompt on the console, waiting for input. To bring it back you typically press a key on the console to boot it, or power-cycle it. Halt is the right choice when you need to physically remove power afterward, for example to move a device to a new rack or replace a power cable, because the file systems are already safely closed by the time the cord is pulled. The safe sequence is to halt, watch the console or wait until the system reports it has stopped, and only then remove power. Because a halted device is no longer reachable over the network, halt is mainly a command for situations where someone is standing next to the hardware or has console access through a console server, so they can see the prompt and decide when to restore power.",
   "The `request system power-off` command shuts the software down gracefully and then turns the power off, on hardware that supports software-controlled power. The device stays off until someone physically powers it on again, by pressing a power button or reconnecting the power source. That makes it convenient when you are on site and want the device completely off, but dangerous on a remote device you cannot reach. If you type power-off on a router in a branch office with no staff on site, nobody can bring it back until someone travels there.",
   "```\nuser@R1> request system reboot in 5 message \"Maintenance reboot\"\nReboot the system in 5 minutes? [yes,no] (no) yes\nuser@R1> clear system reboot\n```",
   "The `message` option, shown above, broadcasts a notice to other logged-in users so they are not surprised when their sessions end and have a chance to save their work. Notice that the default answer to the confirmation is `no`, so pressing Enter without typing yes does nothing. After any reboot, `show system uptime` tells you when the system booted and when protocols last started, and `show chassis routing-engine` shows the last reboot reason. Comparing that reason with your change record is a quick way to confirm whether a restart was planned or caused by a fault, such as a power event or a software crash.",
   "A simple way to remember the three outcomes is by what happens next. Reboot comes back on its own. Halt stops and waits with power on. Power-off stops and turns the power off, staying off until someone intervenes. On dual-RE systems, these commands apply to the RE you are logged into unless you specify otherwise, so check which RE you are on before you type. Whichever command you choose, never pull power from a running device without first halting or powering it off gracefully, and always consider whether you will be able to reach the device again once it is down."
  ],
  "analogy": "Think of closing a busy restaurant. Reboot is closing for a short break and reopening automatically: staff tidy up, lock the door and unlock it again a few minutes later. Halt is closing for the night with the lights still on and the manager waiting at the door; nothing reopens until someone acts, but it is safe to move furniture. Power-off is closing, switching off the main breaker and going home; nobody gets in until someone comes back with the key. Pulling the plug is everyone walking out mid-service with food still on the stove.",
  "terms": [
   [
    "request system reboot",
    "Gracefully shuts down and restarts the device, optionally at a scheduled time with `at` or after a delay with `in`."
   ],
   [
    "request system halt",
    "Gracefully stops the software while leaving power on, so the device can be safely unplugged or restarted from the console."
   ],
   [
    "request system power-off",
    "Gracefully shuts down and powers off the device; it stays off until powered on physically."
   ],
   [
    "clear system reboot",
    "Cancels a pending scheduled reboot."
   ],
   [
    "show system uptime",
    "Shows when the system booted and when protocols last started, useful after a reboot."
   ]
  ],
  "example": "A technician needs to move a branch router to a new rack. The engineer on the console runs `request system halt`, waits for the boot-loader prompt that shows the system has stopped, and tells the technician it is safe to unplug the power. After the move, the router boots normally with no file system repair.",
  "mistakes": [
   [
    "Thinking `request system halt` turns the device off.",
    "Halt stops the software but leaves power on, waiting at the boot loader. Power-off is the command that turns the power off."
   ],
   [
    "Using `request system power-off` on a remote device to perform a restart.",
    "Power-off leaves the device off until someone physically powers it on. Use `request system reboot` when you want it to come back on its own."
   ],
   [
    "Believing a scheduled reboot cannot be undone once confirmed.",
    "`clear system reboot` cancels a pending scheduled reboot."
   ],
   [
    "Assuming it is fine to pull power from a running device if it is lightly loaded.",
    "File systems are written constantly; always halt or power off gracefully first to avoid corruption."
   ]
  ],
  "tryit": [
   [
    "You manage a router in a remote branch with no IT staff on site. A vendor asks you to \"shut it down and bring it back\" to apply a change that needs a restart, and the branch manager wants it done after closing at 20:00. Which command do you use, and what would you avoid?",
    "Use `request system reboot at 20:00` (optionally with `message`), which restarts automatically. Avoid `request system power-off`, because the device would stay off with nobody on site to power it back on, and avoid halt for the same reason."
   ],
   [
    "Your maintenance window is cancelled an hour after you scheduled `request system reboot at 23:00`. What do you do, and how would you later confirm whether the router restarted?",
    "Run `clear system reboot` to cancel the pending reboot. Later, `show system uptime` or the last reboot reason in `show chassis routing-engine` shows whether and why the device restarted."
   ]
  ],
  "tip": "Know the outcome of each command: reboot restarts automatically, halt stops but stays powered, power-off turns the power off. Never pull power from a running device without halting first.",
  "check": [
   [
    "You want to physically unplug a router safely. Which command do you run first?",
    "`request system halt` (or `request system power-off`), so the file systems are closed before power is removed."
   ],
   [
    "How do you cancel a reboot you scheduled for tonight?",
    "`clear system reboot`."
   ],
   [
    "After `request system power-off`, how does the device come back?",
    "Only when someone physically powers it on again."
   ]
  ]
 },
 {
  "t": "Root password recovery from the console using recovery (single-user) mode",
  "hook": "The only network engineer at Willow Creek Veterinary Clinics left last month, and nobody wrote down the root password for the firewall at the main hospital. Now a new branch needs a VPN, the managed service provider has no working account, and the owner, Dr. Patel, is asking whether the device has to be thrown out. Sam, a consultant, drives over with a laptop and a console cable. He knows Junos has a way back in, but it only works if he is physically standing at the device. How does it work, will it wipe the configuration that runs the clinics, and what does it say about who should be allowed into that closet?",
  "simple": "If everyone has forgotten a Junos device's master (root) password, there is a rescue path, but only for someone who can plug a cable directly into the device's console port. That is on purpose: being in the room is treated as proof that you are allowed to fix it. You restart the device, interrupt it as it starts up, and boot it into a special minimal mode. From there you type `recovery`, which opens the command line as root without asking for a password. You set a new root password, save it, and restart. Everything else in the configuration stays as it was. It is like a locksmith who can only rekey your front door while standing in your hallway.",
  "body": [
   "If nobody knows the root password and no other administrator account works, you can still regain control of a Junos device, but only with physical access to its console port. This is a deliberate design choice. The recovery procedure treats physical presence as proof of authority, which is exactly why console access and the room the device sits in must be protected. The exact prompts and menus vary by platform and Junos generation, so treat what follows as the general flow and follow the documented procedure for your specific model when you do it for real.",
   "The first steps get you to the boot loader. Step 1: Connect a terminal or laptop to the console port, typically at 9600 baud, 8 data bits, no parity and 1 stop bit, and then reboot or power-cycle the device. If you cannot log in, power-cycling is often the only way to start the process, which is one reason to do this in a planned window. Step 2: Watch the boot messages closely and interrupt the normal boot at the loader. On many devices you see a prompt such as 'Hit [Enter] to boot immediately, or space bar for command prompt'; pressing the space bar within a few seconds gives you a loader prompt. On some newer platforms you instead choose a recovery or single-user entry from a boot menu.",
   "The next steps reach the Junos CLI. Step 3: Boot into single-user mode, a minimal boot state with only essential services. At the classic loader prompt the command is `boot -s`. The system starts with the minimum needed and then asks you to enter a full path name for a shell or to type 'recovery' for root password recovery. Step 4: Type `recovery`. Junos starts the management process and drops you into the CLI in operational mode as root, without asking for a password.",
   "```\nloader> boot -s\n...\nEnter full pathname of shell or 'recovery' for root password recovery or RETURN for /bin/sh: recovery\n...\nroot> configure\nroot# set system root-authentication plain-text-password\nNew password:\nRetype new password:\nroot# commit\nroot# exit\nroot> exit\n```",
   "The final steps set the password and return to normal operation. Step 5: Enter configuration mode, set a new root password with `set system root-authentication plain-text-password`, enter it twice when prompted, and commit. This is a normal commit, so any other errors in the configuration must be resolved before it succeeds. Despite the keyword, the password is not stored in plain text; Junos hashes it before saving it in the configuration. Step 6: Exit configuration mode and the CLI, and when prompted, confirm that you want to reboot. The device boots normally with its existing configuration and the new root password. Only the root password changed; interfaces, routing, security policies and every other setting are untouched, which is the answer to the clinic owner's worry.",
   "From a security point of view, this procedure is a reminder that physical access is powerful. You can make recovery harder with `set system ports console insecure`. When the console is marked insecure, entering single-user mode requires the root password, which blocks this recovery path for anyone who does not already know it. Use that setting only if you have another reliable way to recover, because a forgotten password on a device with an insecure console may require a much more disruptive reset that loses the configuration. Other controls are often a better fit: locked racks and wiring closets, console servers that require their own authentication, and logging and alerting on console access.",
   "Finally, good credential management means you rarely need this procedure at all. Store root and emergency credentials in a proper password vault with controlled access, make sure more than one trusted person can retrieve them, and change them when staff with access leave the organization. Recovery from the console is a safety net, not a substitute for knowing your own passwords.",
   "For the exam, keep the sequence and its key facts in mind: console access is required; you interrupt the boot and enter single-user mode; you type `recovery` to reach the CLI as root; you set `root-authentication` and perform a normal commit; the rest of the configuration is preserved; and `console insecure` prevents this method by requiring the root password for single-user mode."
  ],
  "analogy": "Root password recovery is like a building superintendent who can rekey any apartment lock, but only while physically standing inside the building's locked utility room. Being in that room is the proof of authority, so the room's door matters as much as the apartment locks. Marking the console `insecure` is like requiring the old key to enter the utility room: it stops intruders, but if the key is truly lost, the only option left is to replace the whole door.",
  "terms": [
   [
    "Console port",
    "A physical serial management port, typically 9600 baud, 8 data bits, no parity, 1 stop bit, required for password recovery."
   ],
   [
    "Single-user mode",
    "A minimal boot state, entered from the loader (for example with `boot -s`), used for recovery tasks."
   ],
   [
    "recovery",
    "The keyword typed at the single-user prompt to start the Junos CLI as root for password recovery."
   ],
   [
    "root-authentication",
    "The `system` configuration statement that holds the root user's password; it must be set before any commit."
   ],
   [
    "console insecure",
    "A `system ports console` setting that requires the root password to enter single-user mode, blocking console password recovery."
   ]
  ],
  "example": "A small company's only network engineer leaves without handing over the firewall's root password. A consultant visits the site, connects to the console, reboots, interrupts the loader, boots into single-user mode, types `recovery`, sets a new root password and commits. After a reboot the device runs normally with its original configuration.",
  "mistakes": [
   [
    "Believing root password recovery can be done over SSH or the network.",
    "It requires physical console access and a reboot into single-user mode. That physical requirement is the security control."
   ],
   [
    "Thinking password recovery resets the device to factory defaults.",
    "Only the root password changes. The rest of the configuration is preserved and the commit is a normal commit."
   ],
   [
    "Assuming `console insecure` makes the console less secure.",
    "Despite the name, marking the console insecure tightens security: single-user mode then requires the root password, blocking this recovery path."
   ],
   [
    "Expecting `plain-text-password` to store the password in clear text.",
    "The keyword means you type it in plain text at the prompt; Junos stores a hashed form in the configuration."
   ]
  ],
  "tryit": [
   [
    "A regional bank wants to stop anyone who reaches a branch router's console from resetting the root password. The network team proposes `set system ports console insecure`. The manager asks what the downside is. What do you tell her?",
    "With the console marked insecure, single-user mode requires the root password, so the standard recovery procedure no longer works. If the root password is ever lost, recovery may require a far more disruptive reset that loses the configuration, so the bank must keep root credentials reliably stored in a password vault before enabling it."
   ],
   [
    "During recovery, you set a new root password and type `commit`, but the commit fails with an error about an unrelated interface statement. What does this tell you and what do you do?",
    "Recovery uses a normal commit, so any configuration error blocks it. Fix or deactivate the problem statement, commit again, then exit and reboot."
   ]
  ],
  "tip": "Password recovery requires physical console access and ends with a normal commit of the new root password. Marking the console `insecure` prevents this recovery method.",
  "check": [
   [
    "What must you type at the single-user prompt to reach the Junos CLI for password recovery?",
    "`recovery`."
   ],
   [
    "Which setting would stop someone with console access from using this recovery procedure?",
    "`set system ports console insecure`, which makes single-user mode require the root password."
   ],
   [
    "Does password recovery erase the rest of the configuration?",
    "No. Only the root password is changed; the existing configuration is kept."
   ]
  ]
 },
 {
  "t": "Saving and restoring a rescue configuration",
  "hook": "It is nearly midnight at Granite Ridge Water District, and Keisha has spent four hours on a remote pumping-station router: new firewall filters, a routing change, a tweak to the management interface, a dozen commits in all. Her last commit locked her out of SSH. She can still reach the console through an out-of-band console server, but she no longer remembers which of those twelve commits was the last one that truly worked. Rolling back one at a time could take an hour, and the morning shift relies on telemetry from this site. Is there a single, known-safe place she can jump back to?",
  "simple": "A rescue configuration is a saved \"safe mode\" setup for a Junos device that you choose yourself. It usually holds just enough to let you log in and manage the device: passwords, a management address, a route and remote login. You save it when things are working, with one command. If you later make a mess of the settings, you load the rescue configuration and activate it, and you are back to a state you know you can reach. It is like a spare house key you hid in a place you chose, rather than relying on whichever door you happened to leave unlocked last. Unlike the automatic history of recent changes, it never gets pushed out by new changes.",
  "body": [
   "A rescue configuration is your personal known-good fallback. It is typically a minimal configuration that is guaranteed to give you management access to the device: the root password, a management interface address, a default route, SSH and perhaps one administrator login account. Its job is not to run the full production network. Its job is to let you get back in when everything else has gone wrong, so that you can then rebuild the production configuration calmly. Think of it as insurance you buy before you need it: it costs one command on a quiet day and can save an hour of guesswork, or a long drive to a remote site, on a bad night when you have locked yourself out with a mistaken filter or route.",
   "You create it from operational mode by saving the currently active configuration with `request system configuration rescue save`. Junos stores it in a dedicated file, on most platforms under `/config` as `rescue.conf.gz`. Because the command saves whatever configuration is active at that moment, there are two common approaches. The first is to save it when the device is in a clean, stable state, accepting that the rescue configuration is a full copy of a working configuration. The second, more deliberate approach is to commit a trimmed-down management configuration, save it as the rescue, and then load and commit the full production configuration on top. You can view the saved rescue configuration at any time with `show system configuration rescue`, and you can pipe that output to search it, for example to confirm the root password is set.",
   "```\nuser@R1> request system configuration rescue save\nuser@R1> show system configuration rescue | match root-authentication\nuser@R1> request system configuration rescue delete\n```",
   "To restore it, enter configuration mode and type `rollback rescue`. Like every rollback, this only loads the rescue configuration into the candidate configuration; nothing on the running device changes until you commit. That gives you a moment to review the change with `show | compare` before you activate it. The rescue configuration also behaves differently from the numbered rollbacks over time. It does not age out like rollback numbers 1 to 49, and new commits do not replace or push it out. It changes only when you deliberately save a new one or delete it with `request system configuration rescue delete`.",
   "Junos encourages you to have one. Many Junos devices raise a minor system alarm, 'Rescue configuration is not set', when none exists, and you will see it in `show system alarms`. Saving a rescue configuration clears the alarm. Some smaller platforms, such as certain branch SRX Series firewalls and EX Series switches, also let you load the rescue configuration with the physical Config or Reset button on the front panel. The exact button behavior, such as how long to press it, varies by model, but the idea is that someone on site can restore management access without logging in at all.",
   "How does the rescue configuration differ from the numbered rollbacks? Rollbacks are automatic and relative. Every commit pushes the history down by one, so rollback 1 is always the configuration before the last commit, whatever that happened to be, and after enough commits an old configuration falls off the end of the list. The rescue configuration is manual and absolute: it is whatever you decided was safe, and it stays that way until you change it. After a long sequence of changes where you are not sure which rollback was the last working one, the rescue configuration gives you a known starting point in a single step.",
   "Keep it current. If you change the management address, the administrator accounts or the root password, save a new rescue configuration too, or the fallback may not actually let you in when you need it most. An outdated rescue configuration that points at a retired management subnet or contains a password nobody remembers is little better than none. A simple habit is to make updating the rescue configuration part of the checklist for any change that touches management access.",
   "To summarize the commands: saving and deleting are operational-mode `request system configuration rescue` commands, viewing is `show system configuration rescue`, and restoring is `rollback rescue` in configuration mode followed by `commit`. Being precise about which mode each command belongs to is a common exam detail."
  ],
  "analogy": "Numbered rollbacks are like your browser's back button: it always takes you to the page just before the current one, and after enough clicks the oldest pages disappear from history. The rescue configuration is a bookmark you created yourself on a page you know works; it never moves no matter how much you browse. The analogy breaks in one way: clicking the bookmark in Junos (`rollback rescue`) only loads the page into a preview, and you must commit to actually go there.",
  "terms": [
   [
    "request system configuration rescue save",
    "Saves the current active configuration as the rescue configuration."
   ],
   [
    "show system configuration rescue",
    "Displays the saved rescue configuration."
   ],
   [
    "rollback rescue",
    "Loads the rescue configuration into the candidate; a commit activates it."
   ],
   [
    "request system configuration rescue delete",
    "Removes the saved rescue configuration."
   ],
   [
    "Rescue alarm",
    "A minor system alarm raised on many devices when no rescue configuration has been saved."
   ]
  ],
  "example": "After a long evening of firewall and routing changes, an engineer loses SSH access to a remote router but can still reach it through an out-of-band console server. Unsure which rollback is safe, she types `configure`, `rollback rescue` and `commit`. The router returns to its minimal management configuration, and she rebuilds the production changes carefully from a saved file.",
  "mistakes": [
   [
    "Believing `rollback rescue` immediately activates the rescue configuration.",
    "It only loads it into the candidate. You must commit to make it active."
   ],
   [
    "Thinking the rescue configuration is updated automatically with each commit, like rollback 1.",
    "It is saved manually and never changes until you save a new one or delete it."
   ],
   [
    "Trying to save the rescue configuration from configuration mode with `rollback` or `save`.",
    "Saving is the operational-mode command `request system configuration rescue save`; restoring is `rollback rescue` in configuration mode."
   ],
   [
    "Expecting a missing rescue configuration to show up as a chassis alarm.",
    "It is a software and configuration condition, so it appears in `show system alarms` as a minor alarm."
   ]
  ],
  "tryit": [
   [
    "Your team changed the management subnet on all branch routers last quarter. Today a branch router is unreachable after a bad commit, and a colleague plans to load the rescue configuration from the console. The rescue configurations were last saved two years ago. What risk do you point out, and what process change do you propose?",
    "The old rescue configuration probably uses the retired management subnet and possibly old credentials, so restoring it may not restore remote access. After recovery, save a new rescue configuration, and add updating it to the checklist for any change that affects management access."
   ],
   [
    "A new router shows a minor alarm in `show system alarms` saying the rescue configuration is not set. The device is configured and stable. What do you run, and how do you confirm the alarm cleared?",
    "Run `request system configuration rescue save` in operational mode, optionally check it with `show system configuration rescue`, then run `show system alarms` to confirm the alarm is gone."
   ]
  ],
  "tip": "Saving is an operational-mode `request` command, but restoring is `rollback rescue` in configuration mode followed by commit. A missing rescue configuration shows up in `show system alarms`.",
  "check": [
   [
    "Which command saves the rescue configuration?",
    "`request system configuration rescue save` in operational mode."
   ],
   [
    "After typing `rollback rescue`, is the rescue configuration active?",
    "Not until you commit; rollback only loads it into the candidate."
   ],
   [
    "Does the rescue configuration get replaced as you make new commits?",
    "No. It stays the same until you save a new one or delete it."
   ]
  ]
 },
 {
  "t": "NTP, SNMP and remote syslog for ongoing operations",
  "hook": "It is Monday morning at Pinecrest Logistics, and Tomas from the security team is at your desk with a printout. Over the weekend someone tried hundreds of logins on the branch router in Fresno, but the central log server shows nothing from that router since Thursday. Worse, the few entries that did arrive are stamped with a time three hours off from every other device, so he cannot line them up with the firewall logs. The monitoring dashboard shows the router green the whole time. Was the router quietly fine, or was it blind and silent? Which of your three background services let you down, and how would you have known sooner?",
  "simple": "A router needs three helpers running in the background. NTP (Network Time Protocol) keeps its clock correct by asking a trusted time server. SNMP (Simple Network Management Protocol) lets a monitoring program ask the router how it is doing and lets the router shout out when something breaks. Remote syslog copies the router's diary of events to a central server so the record survives even if the router dies. Setting them up is not enough; you have to check they keep working. Think of a home with a smoke alarm, a wall clock and a security camera that records to the cloud. If the camera's clock is wrong or the upload stopped last week, the recording is no help when you need it.",
  "body": [
   "Configuring NTP (Network Time Protocol), SNMP (Simple Network Management Protocol) and syslog once is only the start. In daily operations you need to confirm that they are still working, keep them secure and actually use them to spot problems before users do. A service that silently stopped weeks ago gives you a false sense of safety, which is arguably worse than having no service at all. This lesson focuses on verifying and using these three services as part of ongoing operations, which is how the JNCIA-Junos exam tends to frame them.",
   "Start with NTP, because the other two depend on it. The key verification commands are `show ntp associations` and `show ntp status`. The associations output lists each configured server with its reference ID, stratum (how many steps away from an authoritative clock it is), reachability, delay and offset. An asterisk (`*`) in front of a server means the device is synchronized to it. If no server has an asterisk, the clock is not synchronized. Common causes are that the server is unreachable, that a firewall filter on the loopback interface blocks UDP (User Datagram Protocol) port 123, or that the local clock was too far off for NTP to correct gradually. `show ntp status` summarizes the device's own stratum and synchronization state, and `show system uptime` displays the current system time alongside how long the device has been up.",
   "```\nuser@R1> show ntp associations\n     remote           refid      st t when poll reach   delay   offset  jitter\n==============================================================================\n*192.0.2.10      .GPS.            1 u   33   64  377    1.022    0.114   0.050\n 192.0.2.11      192.0.2.10       2 u   40   64  377    1.305    0.240   0.071\n```",
   "Reading that output, R1 is synchronized to 192.0.2.10, a stratum 1 server whose reference is GPS. The second server is a stratum 2 server that is reachable and available as a backup. The `reach` value of 377 is an octal register showing that the last eight polls all succeeded; a low or zero value means polls are failing. Good practice is to configure at least two or three servers for redundancy, to use `source-address` if the servers only accept requests from certain addresses, and to add NTP authentication keys so the device only trusts genuine time sources rather than anything that answers on port 123.",
   "For SNMP, the device runs an agent that answers polls (get requests) from a network management system (NMS) and sends traps when events occur, such as a link going down or a chassis alarm. Polls are pulled by the NMS; traps are pushed by the device without being asked. Polls are authorized by community strings in SNMPv2c, which are sent in clear text, or by users with authentication and privacy (encryption) settings in SNMPv3. Traps are defined with `set snmp trap-group <name> targets <address>` and a list of categories such as link or chassis. `show snmp statistics` shows counts of requests received, responses sent and traps sent, which helps prove whether the monitoring system is actually reaching the device. If the counters do not increase between two checks, nobody is polling. Restrict access with `clients` lists and read-only authorization, and protect the Routing Engine with a firewall filter that allows SNMP only from the monitoring servers.",
   "For remote syslog, `set system syslog host <address> <facility> <severity>` sends events to a central server, over UDP port 514 by default. Central logging matters for two reasons. First, local log files under `/var/log` rotate and are lost if the device fails or is replaced. Second, a security team needs events from all devices in one place to correlate incidents, for example matching a burst of failed logins on a router with alerts on a firewall. Useful options include `source-address`, so that logs always come from the stable loopback address rather than whichever interface happens to be used, and `structured-data`, which sends messages in a more machine-readable format that log tools can parse easily.",
   "The three services reinforce each other. Remote syslog paired with accurate NTP time is what makes logs trustworthy, because a timeline built from devices with drifting clocks cannot be lined up. SNMP traps tell the NMS that something happened right now, while syslog gives the detailed story afterward. If NTP fails, every log and trap carries a misleading timestamp, so troubleshooting time sync comes first whenever records look out of order.",
   "A good operational habit is a periodic health check that asks three questions. Are the NTP servers reachable and is one marked with an asterisk? Is the monitoring system still polling, shown by SNMP counters that keep increasing? Are recent events arriving at the log server, which you can test by generating a harmless event such as entering and leaving configuration mode and confirming it appears centrally? A quiet log server might mean everything is fine, or it might mean the device stopped sending. Only a deliberate check tells the two apart."
  ],
  "analogy": "Think of a security guard post. NTP is the wall clock everyone writes times from, SNMP is the supervisor phoning to ask whether all is well plus the guard radioing when an alarm trips, and remote syslog is the logbook copied to head office each hour. If the clock is wrong, every logbook entry misleads. If the phone line is cut, silence looks like calm. The analogy stops at direction: SNMP polls come from the NMS, while traps and syslog come from the device.",
  "terms": [
   [
    "show ntp associations",
    "Lists NTP servers with stratum, reachability and offset; `*` marks the server the device is synchronized to."
   ],
   [
    "Stratum",
    "How many steps a time source is from an authoritative reference clock; lower numbers are closer to the reference."
   ],
   [
    "SNMP trap",
    "An unsolicited message from the device's SNMP agent to a management system about an event."
   ],
   [
    "SNMPv3",
    "A version of SNMP that adds user-based authentication and encryption."
   ],
   [
    "show snmp statistics",
    "Shows counters of SNMP requests, responses and traps, used to prove the NMS is reaching the device."
   ],
   [
    "source-address",
    "An option for services such as syslog and NTP that fixes the source IP of outgoing packets, often to the loopback."
   ]
  ],
  "example": "A security analyst notices a gap in firewall logs from one site. The network engineer checks the router and finds `show ntp associations` has no `*` and the syslog host is configured, but a new lo0 filter is blocking return NTP traffic. After permitting NTP in the filter, the clock synchronizes and logs with accurate timestamps resume at the central server.",
  "mistakes": [
   [
    "Believing that a configured syslog host means logs are arriving.",
    "Configuration only says where to send. A firewall filter, routing problem or wrong source address can stop delivery, so confirm events actually reach the server."
   ],
   [
    "Thinking SNMP traps are requests from the NMS.",
    "Traps are pushed by the device's agent without being asked. Polls (get requests) are the ones the NMS sends and the agent answers."
   ],
   [
    "Picking SNMPv2c when a question asks for encrypted management traffic.",
    "SNMPv2c uses clear-text community strings. Only SNMPv3 adds authentication and privacy (encryption)."
   ],
   [
    "Assuming any server listed in `show ntp associations` means the clock is synchronized.",
    "Being listed only means it is configured. Synchronization is shown by the asterisk; no asterisk means not synchronized."
   ]
  ],
  "tryit": [
   [
    "You are auditing a router at Lakeview Clinic. `show ntp associations` lists two servers, neither with an asterisk, and both show a reach value of 0. Syslog and SNMP are configured and the NMS reports the router as up. What do you investigate first, and why?",
    "Investigate NTP reachability first: a reach of 0 means no polls are succeeding, so check routing to the servers and whether a loopback firewall filter blocks UDP port 123. Fixing time first matters because every syslog message and trap the router sends is stamped with an unreliable time until it synchronizes."
   ]
  ],
  "tip": "An asterisk in `show ntp associations` means synchronized. SNMP polls are answered by the agent, traps are pushed by it; SNMPv3 adds authentication and encryption that v2c lacks. Syslog to a remote host defaults to UDP 514, NTP uses UDP 123.",
  "check": [
   [
    "How can you tell from `show ntp associations` that the device is synchronized?",
    "One server is marked with an asterisk (`*`)."
   ],
   [
    "Why send syslog to a remote server instead of relying only on local files?",
    "Local logs rotate and can be lost with the device, and central logs allow correlation across many devices."
   ],
   [
    "Which SNMP version provides encryption?",
    "SNMPv3."
   ],
   [
    "What command helps prove that the NMS is actually polling the device?",
    "`show snmp statistics`, by checking that request and response counters increase over time."
   ]
  ]
 },
 {
  "t": "Packet forwarding decisions: longest-prefix match, next hops, active vs inactive routes (`*`)",
  "hook": "A ticket lands in your queue at Bayside Freight: traffic to the partner network at 172.16.40.9 is going out the internet link instead of the private circuit. Dana, the junior engineer, insists that cannot be right, because the static route to the partner's 172.16.0.0/12 has preference 5 and the route the ISP sent, 172.16.40.0/24, came from BGP with 170, so the static should win. She opens `show route` and sees two asterisks on two different lines and a `>` she does not understand. You know the answer is not about preference at all. How does a Junos router really decide where each packet goes, and what do those symbols mean?",
  "simple": "Every packet carries a destination address, like an address on an envelope. The router keeps a list of directions, and each direction covers a range of addresses, some broad and some narrow. When a packet arrives, the router picks the direction that matches the address most precisely. A direction for your exact street beats one for your whole city, which beats one that says 'anything else goes to the post office.' If the router knows two ways to reach the exact same range, it keeps one as the main choice, marked with a star, and saves the other as a backup in case the first one breaks.",
  "body": [
   "A router's core job is to decide, for every packet, where to send it next. Junos makes that decision in two stages that are handled by two different parts of the device. The Routing Engine (RE) collects routes from all sources, including directly connected interfaces, static configuration and routing protocols, into routing tables and picks the best route for each destination prefix. Those best routes are then copied into the forwarding table, which the Packet Forwarding Engine (PFE) uses to forward packets at high speed in hardware. The RE thinks, and the PFE acts on what the RE decided.",
   "When a packet arrives, the forwarding decision uses longest-prefix match. The router compares the destination address with all prefixes in the forwarding table and picks the most specific one that contains it, meaning the one with the longest prefix length. Suppose the table has 0.0.0.0/0, 10.0.0.0/8 and 10.1.1.0/24. A packet to 10.1.1.7 matches all three, but /24 is the longest, so that route wins. A packet to 10.2.3.4 matches the /8 and the default route and uses the /8. A packet to 8.8.8.8 matches only the default route. Longest match always wins over route preference or metric, because those only compare routes to the same prefix. A /24 and a /8 are different prefixes, so they never compete on preference at all.",
   "Each route points to a next hop: the neighboring router's address and the outgoing interface. There are also special next hops that do not lead to a neighbor. A local route (a /32 for one of the device's own addresses) sends packets up to the Routing Engine, because the packet is for the router itself, such as an SSH (Secure Shell) session or a ping. A discard next hop drops packets silently, and a reject next hop drops them and sends an ICMP (Internet Control Message Protocol) unreachable message back to the sender. When several equal next hops exist, a route can list more than one, and the router selects among them.",
   "Now the active versus inactive idea. For a single prefix, Junos may learn several routes, for example a static route and an OSPF (Open Shortest Path First) route to 10.5.0.0/16. Only one of them becomes the active route, chosen mainly by route preference (lower is better) and then by tie-breakers such as metric. The active route is the only one placed in the forwarding table. In `show route` output, the legend line at the top reads `+ = Active Route, - = Last Active, * = Both`. In steady state the active route is usually also the last active one, so you normally see an asterisk on it, and the asterisk is what exam questions treat as the mark of the active route. Right after a change you may briefly see `+` on the new active route and `-` on the one that was active before.",
   "```\nuser@R1> show route 10.5.0.0/16\ninet.0: 12 destinations, 13 routes (12 active, 0 holddown, 0 hidden)\n+ = Active Route, - = Last Active, * = Both\n10.5.0.0/16  *[Static/5] 00:12:40\n              >  to 10.1.12.2 via ge-0/0/1.0\n              [OSPF/10] 00:03:11, metric 20\n              >  to 10.1.13.2 via ge-0/0/2.0\n```",
   "Reading that example, there is one prefix with two routes. The static route with preference 5 carries the asterisk and is active, so packets for 10.5.0.0/16 leave through ge-0/0/1.0 toward 10.1.12.2. The OSPF route with preference 10 is inactive. Notice the header: 12 destinations but 13 routes, because this prefix contributes two routes and only one of them counts as active. That gap between routes and active routes is a quick hint that backups exist somewhere in the table.",
   "Inactive routes are not useless; they are backups. If the active route disappears, for example because its interface goes down, the next-best route for that prefix becomes active and is installed in the forwarding table without any manual action. The `>` symbol marks the next hop actually selected when a route has more than one possible next hop, so on a route with two equal-cost paths you will see two next-hop lines and the `>` on the one in use. To see exactly what the PFE is using, rather than what the RE knows, run `show route forwarding-table destination 10.5.1.1`.",
   "Putting it together, the order of decisions is worth memorizing. First, longest-prefix match chooses which prefix applies to the packet. Second, among routes for that exact prefix, the lowest preference becomes active. Third, tie-breakers such as metric settle any remaining tie. Finally, the `>` shows which next hop of the active route the packet will use. Most exam distractors try to make you apply step two before step one."
  ],
  "analogy": "Picture a mail sorting room with labeled bins: one for a single street, one for the whole city, one for the whole country, and one marked 'everything else.' A clerk always drops a letter into the most specific bin that fits its address. Preference is like having two couriers who both serve the same street bin; the more trusted one gets the job and the other waits. The analogy stops working in one place: a router recomputes the winning courier automatically the moment one disappears.",
  "mnemonic": "Prefix, Preference, Path: first the longest prefix picks the destination entry, then the lowest preference picks the active route for that prefix, then `>` shows the path (next hop) in use.",
  "terms": [
   [
    "Longest-prefix match",
    "The forwarding rule that chooses the most specific matching prefix for a destination address."
   ],
   [
    "Next hop",
    "The neighboring address and outgoing interface to which a packet is sent."
   ],
   [
    "Active route",
    "The single best route for a prefix, marked `*` in `show route`, and the only one installed in the forwarding table."
   ],
   [
    "Forwarding table",
    "The table built from active routes that the Packet Forwarding Engine uses to forward packets."
   ],
   [
    "Reject vs discard next hop",
    "Both drop packets; reject also returns an ICMP unreachable message, discard is silent."
   ]
  ],
  "example": "A router has a default route to an ISP and a static route for 172.16.0.0/12 to a partner. A server sends traffic to 172.16.40.9. Even though the default route also matches, the /12 is more specific, so the packet goes to the partner. Traffic to any public address falls through to the default route.",
  "mistakes": [
   [
    "Choosing the route with the lowest preference even when the prefixes differ.",
    "Preference only compares routes to the exact same prefix. Longest-prefix match is applied first, so a more specific route wins regardless of its preference."
   ],
   [
    "Thinking inactive routes are errors to be cleaned up.",
    "Inactive routes are backups. If the active route is withdrawn, the next-best route for that prefix becomes active automatically."
   ],
   [
    "Confusing `*` and `>`.",
    "The asterisk marks the active route for the prefix; the `>` marks the selected next hop within a route."
   ],
   [
    "Assuming all routes in the routing table are used for forwarding.",
    "Only active routes are copied to the forwarding table used by the PFE. `show route forwarding-table` shows what is actually installed."
   ]
  ],
  "tryit": [
   [
    "A router at Northgate College has a static default route (preference 5), an OSPF route to 10.30.0.0/16 (preference 10) and a BGP route to 10.30.8.0/22 (preference 170). A packet arrives for 10.30.9.20. Which route forwards it and why?",
    "The BGP route to 10.30.8.0/22 forwards it. 10.30.9.20 falls inside 10.30.8.0/22 (10.30.8.0 to 10.30.11.255), and /22 is the longest matching prefix. Preference never enters the decision because the three routes are for different prefixes."
   ],
   [
    "During a maintenance window you notice a route line showing `+` and another showing `-` for the same prefix. What happened?",
    "The active route just changed. The `+` marks the newly active route and the `-` marks the route that was active before; once things settle, the active route normally shows `*` for both."
   ]
  ],
  "tip": "Longest match is decided first; preference only chooses among routes to the exact same prefix. The `*` marks the active route and `>` marks the selected next hop. Only active routes reach the forwarding table.",
  "check": [
   [
    "A router has routes to 10.0.0.0/8 (static) and 10.20.0.0/16 (OSPF). Which is used for 10.20.5.5?",
    "The /16 learned from OSPF, because longest-prefix match beats preference."
   ],
   [
    "What does an asterisk before a route in `show route` mean?",
    "It is the active route for that prefix and is installed in the forwarding table."
   ],
   [
    "What happens to an inactive route when the active route is withdrawn?",
    "It can become the new active route and be installed in the forwarding table."
   ],
   [
    "Which command shows what the Packet Forwarding Engine is actually using for a destination?",
    "`show route forwarding-table destination <address>`."
   ]
  ]
 },
 {
  "t": "Routing tables: inet.0, inet6.0, inet.3, and instance tables such as vr1.inet.0",
  "hook": "Rafael at Silverline Hotels configured a guest network on a new router, and the guests can browse fine. But when he types `show route` looking for the guest subnet 192.168.50.0/24, it is not there. He checks the interface; it is up and addressed. He starts to suspect a bug. Then a colleague asks a simple question: which table did you look in? Rafael had no idea a router could have more than one. Where did his route go, and how do you find it?",
  "simple": "A Junos router keeps several separate route lists instead of one big one, and each list has a name that tells you what is inside. The main list for ordinary internet-style addresses (IPv4) is called inet.0. The list for the newer, longer addresses (IPv6) is inet6.0. Some lists are for special jobs, like inet.3, which helps with tunnels between routers. If you split the router into separate virtual routers, each gets its own lists, named with the virtual router's name in front. It is like a filing cabinet with labeled drawers: if you look in the wrong drawer, the file seems missing even though it is right there.",
  "body": [
   "Junos does not keep all routes in one table. It keeps separate routing tables for different address families and purposes, and each table has a name that tells you what it holds. The naming follows a simple pattern: an optional instance name, then the family, then a number, all separated by dots. Knowing the names helps you read `show route` output correctly and understand why a route appears in one place but not another, which is a frequent source of confusion and of exam questions.",
   "`inet.0` is the main IPv4 unicast routing table. Directly connected networks, static routes, OSPF (Open Shortest Path First), RIP (Routing Information Protocol) and BGP (Border Gateway Protocol) IPv4 routes all go here by default, and it is the table used to build the forwarding entries for normal IPv4 traffic. When you run `show route` without options, most of what you see is inet.0. If someone talks about 'the routing table' on a Junos device without qualification, they almost always mean inet.0.",
   "`inet6.0` is the IPv6 unicast table. IPv6 connected, static and dynamic routes, such as those from OSPFv3 or BGP carrying IPv6 prefixes, are stored here. You view it with `show route table inet6.0`. Keeping IPv4 and IPv6 apart means the two families never interfere with each other's route selection, and it lets you check each family on its own when you are running dual stack.",
   "`inet.3` holds IPv4 routes to the egress points of MPLS (Multiprotocol Label Switching) label-switched paths (LSPs), typically the loopback addresses of other routers reachable through an LSP. It is not used to forward ordinary IP packets directly. Instead, BGP uses it when resolving next hops: if a BGP next hop is reachable through an LSP in inet.3, traffic for that BGP route is sent over the MPLS tunnel rather than hop by hop through plain IP lookups. You will meet it more in later certifications, but at this level you should recognize the name and know its purpose. Other tables you may see include `mpls.0` for label-switching entries, `inet.1` for the multicast forwarding cache and `inet.2` for multicast reverse-path checks.",
   "Routing instances get their own tables. Their names follow the pattern instance-name dot family dot number. An instance called `vr1` has `vr1.inet.0` for IPv4 and `vr1.inet6.0` for IPv6. Interfaces placed in that instance, and routes configured or learned in it, appear only in its tables, not in the main inet.0. This separation is what lets you run multiple independent routing domains on one device, and it is also why Rafael in the opening scene could not find his guest subnet: it lived in the guest instance's table.",
   "```\nuser@R1> show route table vr1.inet.0\nvr1.inet.0: 3 destinations, 3 routes (3 active, 0 holddown, 0 hidden)\n192.168.50.0/24    *[Direct/0] 01:02:03\n                    >  via ge-0/0/3.0\n192.168.50.1/32    *[Local/0] 01:02:03\n                       Local via ge-0/0/3.0\n```",
   "The header line of each table shows destinations, routes and counts of active, holddown and hidden routes. Destinations are distinct prefixes; routes can outnumber them when a prefix is learned from several sources. Holddown routes are in the middle of being withdrawn. Hidden routes are ones Junos knows but cannot use, for example because the next hop cannot be resolved or an import policy rejected them; you can see them with `show route hidden`. A nonzero hidden count is worth a look whenever a route you expect is missing.",
   "Several commands help you navigate tables. `show route summary` gives a quick count of routes per table and per protocol, which is a good way to see at a glance which tables exist on a device and how big each one is. `show route table <name>` limits output to one table, and you can combine it with a prefix, as in `show route table vr1.inet.0 192.168.50.0/24`. Test tools follow the same idea: `ping 192.168.50.10 routing-instance vr1` sends the ping using the instance's table instead of inet.0.",
   "When a route seems missing, work through a short checklist. Is it IPv4 or IPv6, so inet.0 or inet6.0? Is the interface or protocol configured inside a routing instance, so the route is in that instance's table? Is the route hidden rather than absent? Asking those three questions in order resolves most 'my route disappeared' puzzles without any guesswork."
  ],
  "analogy": "Think of a hospital records room. Adult patient files sit in one cabinet, pediatric files in another, and a separate locked cabinet belongs to a partner clinic that rents space in the building. Each cabinet has a label, and a file only exists in the cabinet it was filed in. The analogy stops working slightly for inet.3: it is less a cabinet of patients and more a reference index that BGP consults to decide how to reach a next hop.",
  "terms": [
   [
    "inet.0",
    "The main IPv4 unicast routing table."
   ],
   [
    "inet6.0",
    "The IPv6 unicast routing table."
   ],
   [
    "inet.3",
    "An IPv4 table of MPLS LSP egress addresses used mainly for BGP next-hop resolution."
   ],
   [
    "mpls.0",
    "The table of MPLS label-switching entries."
   ],
   [
    "Instance table",
    "A routing table belonging to a routing instance, named like `vr1.inet.0`."
   ],
   [
    "Hidden route",
    "A route Junos knows but cannot use, for example due to an unresolvable next hop; shown with `show route hidden`."
   ]
  ],
  "example": "An engineer puts a guest Wi-Fi interface into a virtual-router instance called GUEST. Guests' routes appear in GUEST.inet.0 and never mix with the corporate routes in inet.0. When she needs to test from the guest side, she runs `ping 8.8.8.8 routing-instance GUEST` so the ping uses the instance table.",
  "mistakes": [
   [
    "Thinking inet.3 is the table used to forward ordinary IPv4 traffic.",
    "inet.0 forwards ordinary IPv4 traffic. inet.3 holds MPLS LSP egress addresses and is used mainly by BGP for next-hop resolution."
   ],
   [
    "Expecting routes in a routing instance to show up in inet.0.",
    "Instance routes live only in the instance's own tables, such as `vr1.inet.0`, unless they are deliberately leaked."
   ],
   [
    "Naming an instance's IPv4 table `inet.0.vr1` or `vr1-inet.0`.",
    "The pattern is instance name first, then family and number: `vr1.inet.0`."
   ],
   [
    "Assuming a missing route was never learned.",
    "It may be hidden. Check `show route hidden` and the hidden count in the table header."
   ]
  ],
  "tryit": [
   [
    "At Granite Bank, a router has a routing instance named BRANCH-A with interface ge-0/0/5.0 in it. A technician runs `ping 10.80.1.1` to reach a host behind ge-0/0/5.0 and it fails, although the host is up. What is the likely cause and how should the technician test?",
    "The plain ping uses inet.0, but the host's route lives in BRANCH-A.inet.0. The technician should run `ping 10.80.1.1 routing-instance BRANCH-A` and check the route with `show route table BRANCH-A.inet.0`."
   ]
  ],
  "tip": "Learn the naming pattern: family (inet or inet6) plus a number, with instance tables prefixed by the instance name. inet.3 is for MPLS next-hop resolution, not ordinary IP forwarding.",
  "check": [
   [
    "Which table stores IPv6 unicast routes?",
    "inet6.0."
   ],
   [
    "What table would hold IPv4 routes for a routing instance named CUST-A?",
    "CUST-A.inet.0."
   ],
   [
    "What command gives a quick count of routes in every table?",
    "`show route summary`."
   ],
   [
    "What is inet.3 mainly used for?",
    "Holding MPLS LSP egress addresses so BGP can resolve next hops over LSPs."
   ]
  ]
 },
 {
  "t": "Route preference values: direct/local 0, static 5, OSPF internal 10, RIP 100, aggregate/generated 130, OSPF external 150, BGP 170",
  "hook": "At Copperfield Manufacturing, the plant network learns the route to the warehouse, 172.20.0.0/16, three ways at once: from an old RIP (Routing Information Protocol) router nobody has retired, from OSPF as an external route redistributed by a firewall, and from a BGP session with a partner. Lena, on her first week, is asked which path production traffic takes. She guesses OSPF, because OSPF is 'better than RIP.' Her lead smiles and asks her to run `show route`. The asterisk sits next to RIP. How can an old protocol beat a modern one, and what numbers decide it?",
  "simple": "Sometimes a router hears about the same destination from several sources. It needs a rule for which source to believe. Junos gives each source a trust number called preference, and the lowest number wins. Networks plugged straight into the router are 0, because they are certain. Routes you type in yourself are 5. Routes OSPF learns inside your own network are 10. RIP is 100. Summary routes you build are 130. Routes brought into OSPF from somewhere else are 150. BGP routes are 170. It is like asking for directions: you trust what you can see yourself first, then a note from your boss, then a neighbor, and a stranger last.",
  "body": [
   "When Junos learns more than one route to exactly the same prefix from different sources, it must pick one to make active. The first and most important criterion is route preference, a number assigned to each routing source. Other vendors call the same idea administrative distance, so if you have studied for other exams the concept will be familiar, though the numbers differ. The rule is simple: the lower the preference, the more the route is trusted, so the lower value wins and becomes the active route that is installed in the forwarding table.",
   "The default values you need to know are: Direct and Local routes 0; Static 5; OSPF (Open Shortest Path First) internal routes 10; RIP (Routing Information Protocol) 100; Aggregate and Generated routes 130; OSPF external (AS external) routes 150; and BGP (Border Gateway Protocol) 170, for both internal and external BGP. IS-IS (Intermediate System to Intermediate System) internal routes also exist with values between OSPF and RIP, 15 for Level 1 and 18 for Level 2, but the list in the exam objective is the core you must recall instantly: 0, 5, 10, 100, 130, 150, 170.",
   "The ordering reflects trust, and understanding the reasoning makes the list easier to remember. Directly connected networks are facts the router can see on its own interfaces, so they get 0. A static route is a deliberate instruction from an administrator, so it gets 5. OSPF internal routes are learned inside your own network with full topology knowledge, so they rank next at 10. RIP is older, uses a simple hop count and converges slowly, so it sits much lower at 100. Aggregate and generated routes are summaries you create locally, at 130. OSPF external routes are routes that were redistributed into OSPF from some other source, so OSPF does not have full knowledge of them and trusts them less than internal ones, at 150. BGP routes typically come from outside your network and are governed by policy, so they have the highest default value at 170.",
   "One important consequence of that ordering is the classic exam trap: RIP at 100 beats OSPF external at 150. Many learners assume OSPF always beats RIP, but that is only true for OSPF internal routes. If the same prefix arrives as a RIP route and as an OSPF external route, the RIP route is active by default, which is exactly what surprised Lena in the opening scene.",
   "Remember that preference only compares routes to the same prefix. It never overrides longest-prefix match. If you have a static route to 10.0.0.0/8 (preference 5) and a BGP route to 10.1.0.0/16 (preference 170), both are active in their own right, because they are different prefixes, and a packet to 10.1.2.3 uses the more specific BGP route. Preference is a tie-breaker among candidates for one prefix, not a ranking of the whole table.",
   "```\n10.5.0.0/16  *[Static/5] 00:12:40\n              >  to 10.1.12.2 via ge-0/0/1.0\n              [OSPF/150] 00:03:11, metric 20, tag 0\n              >  to 10.1.13.2 via ge-0/0/2.0\n```",
   "In `show route`, the preference is shown in brackets next to the protocol, such as `[Static/5]` or `[OSPF/150]`. That bracket alone tells you the OSPF route above is an external one, because internal OSPF routes show 10. If preference ties between two routes for the same prefix, Junos moves on to further tie-breakers, such as the protocol metric, and `show route detail` will report the reason a losing route is inactive. A quick way to practice is to look at any route with more than one entry and ask two questions: which bracket holds the lowest number, and does the asterisk sit on that line? If the answer to the second question is no, someone has changed a default, and `show route detail` will tell you where the active route's preference came from.",
   "You can change preference when the defaults do not suit your design. A static route can be given `preference 200` so that it loses to a dynamic route and only takes over when the dynamic route disappears, which is called a floating static route. OSPF allows `preference` and `external-preference` settings to change its internal and external values, BGP groups and neighbors can be given a `preference`, and routing policy can set preference with the `then preference` action. Changing defaults should be done deliberately and consistently across devices, because it changes which path every packet takes and can create surprising asymmetric routing if only some routers are changed."
  ],
  "analogy": "Imagine a hiring manager with several references for one candidate. A firsthand observation counts most, a note from the manager's own boss comes next, a trusted coworker after that, and an anonymous online review counts least. The manager acts on the most trusted reference available and keeps the others on file. The analogy breaks if you apply it across different candidates: preference only ranks sources for the same prefix, never different prefixes.",
  "mnemonic": "Do Some Old Routers Ask Our Boss: Direct 0, Static 5, OSPF internal 10, RIP 100, Aggregate 130, OSPF external 150, BGP 170.",
  "terms": [
   [
    "Route preference",
    "A number assigned to each route source in Junos; for the same prefix the lowest value becomes active."
   ],
   [
    "Administrative distance",
    "The name other vendors use for the same concept as Junos route preference."
   ],
   [
    "OSPF internal route",
    "A route learned from within the OSPF domain, with default preference 10."
   ],
   [
    "OSPF external route",
    "A route redistributed into OSPF from another source, with default preference 150."
   ],
   [
    "Floating static route",
    "A static route with a raised preference so it is used only when a better route is missing."
   ]
  ],
  "example": "A router learns 172.20.0.0/16 by OSPF from inside the network (preference 10) and the same prefix by BGP from a partner (preference 170). The OSPF route is active and traffic stays on the internal path. When the internal link fails and the OSPF route disappears, the BGP route becomes active automatically.",
  "mistakes": [
   [
    "Assuming OSPF always beats RIP.",
    "Only OSPF internal routes (10) beat RIP (100). OSPF external routes have preference 150, so RIP wins against them by default."
   ],
   [
    "Believing a higher preference value means a more preferred route.",
    "In Junos, lower preference is better. A value of 0 is the most trusted."
   ],
   [
    "Using preference to choose between routes with different prefix lengths.",
    "Longest-prefix match comes first. Preference only decides among routes to the exact same prefix."
   ],
   [
    "Remembering IBGP and EBGP with different default preferences.",
    "In Junos both internal and external BGP routes default to 170."
   ]
  ],
  "tryit": [
   [
    "At Redwood Transit, a prefix is learned as a static route with `preference 200`, as an OSPF internal route and as a BGP route. The OSPF adjacency then fails. Which route becomes active before and after the failure?",
    "Before the failure, OSPF internal (10) is active. After it fails, BGP (170) becomes active, because 170 is lower than the raised static preference of 200. The static route would only take over if BGP also disappeared."
   ],
   [
    "A colleague sees `[OSPF/150]` in output and says the route came from an OSPF neighbor's own interface. Is that right?",
    "Not quite. Preference 150 marks an OSPF external route, meaning it was redistributed into OSPF from another source by some router, rather than describing an OSPF-internal link."
   ]
  ],
  "tip": "Memorize the list in order: 0, 5, 10, 100, 130, 150, 170. The classic trap is comparing OSPF external (150) with RIP (100): RIP wins. Another trap is forgetting that longest match comes before preference.",
  "check": [
   [
    "A prefix is learned via RIP and as an OSPF external route. Which is active by default?",
    "RIP, with preference 100, beats OSPF external at 150."
   ],
   [
    "What is the default preference of both internal and external BGP routes in Junos?",
    "170."
   ],
   [
    "What does `[Static/5]` in `show route` output mean?",
    "The route came from a static route and has preference 5."
   ],
   [
    "What is the default preference of an aggregate route?",
    "130, the same as a generated route."
   ]
  ]
 },
 {
  "t": "Routing instances: virtual-router, forwarding and VRF types",
  "hook": "The general manager at Seaview Resort calls you in. A guest posted online that from the lobby Wi-Fi he could see the hotel's booking server responding to pings. The resort cannot afford a second router this quarter, but the guest network and the property systems must never touch. Your lead says one Junos box can act like several separate routers, and that there are different 'types' of these virtual routers for different jobs. Which type keeps the guests in their own world, and what are the others for?",
  "simple": "A routing instance lets one physical router behave like several separate routers, each with its own list of routes and its own connections. There are a few kinds. A virtual router is the plain version: you give it some ports and it keeps its own routes, totally separate from the rest. A forwarding instance has no ports at all; it is a side list of routes that special rules can send certain traffic to, such as 'send the finance team out the backup internet line.' A VRF is the kind that internet providers use to carry many customers' private networks over one shared network without mixing them up. Think of one office building divided into separately locked suites.",
  "body": [
   "A routing instance is a separate collection of routing tables, interfaces and routing protocol settings inside a single Junos device. By default everything lives in the master (default) instance, which uses inet.0 and inet6.0. Additional instances let you run independent routing domains side by side, each with its own tables such as `vr1.inet.0`. Instances are configured under the `routing-instances` hierarchy, and the kind of separation you get depends on the `instance-type` you choose. At the JNCIA-Junos level, three Layer 3 types matter most: virtual-router, forwarding and vrf.",
   "The virtual-router type is the simplest way to split a device into several independent routers. You assign interfaces to it, and you can run static routes and protocols such as OSPF (Open Shortest Path First) or BGP (Border Gateway Protocol) inside it. Its routes stay in its own table and do not mix with the default instance unless you deliberately leak them with policy or RIB (routing information base) groups. There is no MPLS (Multiprotocol Label Switching) VPN (virtual private network) signaling involved. Typical uses are separating guest and corporate traffic, isolating a management network, or building a lab with several routers on one box.",
   "```\nset routing-instances vr1 instance-type virtual-router\nset routing-instances vr1 interface ge-0/0/3.0\nset routing-instances vr1 routing-options static route 0.0.0.0/0 next-hop 192.168.50.254\n```",
   "Look closely at that configuration. The interface statement moves ge-0/0/3.0 out of the default instance and into vr1, so its direct and local routes now appear in `vr1.inet.0`. The static default route is configured under the instance's own `routing-options`, not the global one, so it affects only traffic arriving in vr1. Nothing in inet.0 knows about 192.168.50.0/24, and nothing in vr1 knows about the corporate networks, which is exactly the isolation the resort in the opening scene needs.",
   "The forwarding type is used for filter-based forwarding (FBF), also called policy-based routing. A forwarding instance has its own routing table but no interfaces of its own. A firewall filter on an incoming interface matches certain traffic, for example by source address, and uses the `routing-instance` action to send it to the forwarding instance, which then looks the packet up in its own table instead of inet.0. This lets you send traffic from one department out a different ISP (internet service provider) than the rest of the network, even though the destination is the same. To make interface routes available to the forwarding instance's table, so its next hops can be resolved, FBF designs usually share them using a RIB group.",
   "The vrf type (VPN routing and forwarding) is used by service providers for Layer 3 VPNs over MPLS. Like a virtual router, it has its own interfaces and routing table, but it also requires a route distinguisher, which makes each customer's prefixes unique across the provider network, and a VRF target (route target) community or explicit import and export policies, which control which VPN routes are shared between sites via BGP. Multiple customers can use the same private addresses, such as 10.0.0.0/8, without conflict because each lives in its own VRF and is tagged with its own distinguisher as it crosses the provider core.",
   "Comparing the three side by side helps. A virtual-router has interfaces and a table but no VPN extras. A forwarding instance has a table but no interfaces, and depends on a firewall filter to steer traffic into it. A vrf has interfaces and a table plus a route distinguisher and a VRF target or policies. If an exam question mentions filter-based forwarding, think forwarding; if it mentions route distinguishers or MPLS Layer 3 VPNs, think vrf; if it just wants separate routing on one box, think virtual-router.",
   "You work with instances using `show route table vr1.inet.0`, `show route instance`, which lists instances, their types and their tables, and test commands with the `routing-instance` option, such as `ping 8.8.8.8 routing-instance vr1` or `traceroute 8.8.8.8 routing-instance vr1`. Remember that a logical interface can belong to only one instance at a time; assigning it to a second instance produces a commit error. Other instance types exist, for Layer 2 VPNs and virtual switches for example, but the three above are the ones associated with Layer 3 routing at this level. When you troubleshoot an instance, check three things in order: that the interface really is listed under the instance, that the expected routes appear in the instance's table, and that your test commands name the instance. Most problems with instances turn out to be one of those three."
  ],
  "analogy": "Picture an office building. A virtual router is a locked suite with its own doors to the street and its own mail slot. A forwarding instance is a mail-sorting rule in the lobby: letters from a certain sender get routed through a special courier, but the rule has no suite of its own. A VRF is a suite rented through an agency that labels every tenant's mail with a unique tag so identical room numbers in different branches never get confused. The analogy simplifies the tag: the route distinguisher keeps prefixes unique, while VRF targets decide which sites share routes.",
  "terms": [
   [
    "Routing instance",
    "A separate set of routing tables, interfaces and protocol settings within one Junos device."
   ],
   [
    "virtual-router",
    "An instance type with its own interfaces and routing table, used to create independent routers on one device without VPN signaling."
   ],
   [
    "forwarding instance",
    "An instance type with a routing table but no interfaces, used with firewall filters for filter-based forwarding."
   ],
   [
    "VRF",
    "VPN routing and forwarding instance type used for MPLS Layer 3 VPNs, requiring a route distinguisher and VRF target or policies."
   ],
   [
    "Route distinguisher",
    "A value added to VPN prefixes to keep overlapping customer addresses unique in the provider network."
   ],
   [
    "VRF target",
    "A route target community that controls which VPN routes are imported and exported between sites."
   ]
  ],
  "example": "A hotel router must keep guest traffic away from its property management systems. The engineer places the guest-facing VLAN interface into a virtual-router instance with its own default route to a separate internet circuit. Guests can browse the web, but no route exists between the guest table and inet.0, so they cannot reach internal systems.",
  "mistakes": [
   [
    "Choosing a forwarding instance when you need to assign interfaces.",
    "A forwarding instance has no interfaces of its own. To give an instance interfaces for simple separation, use virtual-router (or vrf for MPLS VPNs)."
   ],
   [
    "Picking virtual-router for an MPLS Layer 3 VPN.",
    "Layer 3 VPNs use the vrf type, which adds a route distinguisher and VRF target or policies. A virtual-router has no VPN signaling."
   ],
   [
    "Expecting a plain `ping` to use an instance's routes.",
    "Ping and traceroute use inet.0 unless you add `routing-instance <name>`."
   ],
   [
    "Placing one logical interface in two instances.",
    "A logical interface belongs to exactly one instance at a time."
   ]
  ],
  "tryit": [
   [
    "Orchard Credit Union wants traffic from its call-center subnet to leave through a second ISP, while every other subnet uses the primary ISP, even for the same destinations. The call-center interface must stay in the default instance with everyone else. Which instance type fits and what else is needed?",
    "A forwarding instance with its own default route to the second ISP, plus a firewall filter on the call-center-facing interface that matches the call-center source addresses and uses the `routing-instance` action to send them to it. A RIB group is typically used so the forwarding instance can resolve its next hop via interface routes."
   ]
  ],
  "tip": "Match the type to the use: virtual-router for simple separation, forwarding for filter-based forwarding (no interfaces), vrf for MPLS Layer 3 VPNs with route distinguishers and targets.",
  "check": [
   [
    "Which instance type has no interfaces and is used with firewall filters to steer traffic?",
    "The forwarding instance type, used for filter-based forwarding."
   ],
   [
    "What two things does a VRF need that a virtual router does not?",
    "A route distinguisher and a VRF target (or VRF import/export policies)."
   ],
   [
    "How do you ping using a routing instance's table?",
    "`ping <address> routing-instance <name>`."
   ],
   [
    "Where do the routes of an interface placed in instance vr1 appear?",
    "In `vr1.inet.0` (and `vr1.inet6.0` for IPv6), not in inet.0."
   ]
  ]
 },
 {
  "t": "Static routes: `routing-options static`, next-hop, qualified-next-hop with preference (floating routes), discard and reject",
  "hook": "Kai manages the network for Elmwood Dental's six clinics. Each clinic router has a fiber link and a cheap LTE backup. Last month the fiber at the Oak Street clinic was cut by a backhoe, and the clinic was offline for four hours even though the LTE modem was working the whole time. The router had a default route to the fiber gateway and nothing else. Now Kai wants the router to fail over by itself, and he also wants to quietly drop traffic aimed at unused internal subnets. How can static routes, which never change on their own, give him both?",
  "simple": "A static route is a direction you type into the router by hand: 'to reach this group of addresses, hand packets to that neighbor.' It never changes unless you change it, which makes it simple and predictable. You can still build a backup into it: give the main path a better number and the backup a slightly worse number, so the router uses the backup only when the main path's link goes down. You can also tell a static route to throw packets away instead of sending them anywhere, either silently or with a polite 'cannot deliver' reply. It is like a household rule: take the main road, use the side road only if the main road is closed, and never drive into the lake.",
  "body": [
   "A static route is a route you configure by hand. It does not adapt to topology changes the way a routing protocol does, but it is simple, predictable and uses no protocol overhead, which is why it remains common in real networks. Static routes are used for default routes to an ISP (internet service provider), for stub sites with a single uplink and for backup paths. In Junos they live under `routing-options static` for the default instance, or under `routing-instances <name> routing-options static` for an instance. The basic form names a prefix and a next hop, as shown below.",
   "```\nset routing-options static route 0.0.0.0/0 next-hop 203.0.113.1\nset routing-options static route 10.50.0.0/16 next-hop 10.1.12.2\n```",
   "By default the next-hop address must be on a directly connected subnet. If it is not reachable through a directly connected interface, the route stays inactive (hidden) because Junos cannot resolve which interface to use. If you really need a next hop several hops away, the `resolve` option lets Junos resolve it through other routes in the table, but directly connected next hops are the normal case and the one the exam expects. Static routes have a default preference of 5, which means they beat every dynamic protocol unless you change that.",
   "You can list several `next-hop` statements for the same route; they are treated as equal next hops with the same preference. A qualified next hop, by contrast, lets you give different next hops for the same route their own preference (and metric). This is how you build a primary and backup path inside one static route.",
   "```\nset routing-options static route 0.0.0.0/0 next-hop 203.0.113.1\nset routing-options static route 0.0.0.0/0 qualified-next-hop 198.51.100.1 preference 7\n```",
   "Here the plain next hop uses the default preference of 5 and is preferred. If the interface toward 203.0.113.1 goes down, that next hop becomes unusable and the qualified next hop with preference 7 takes over. When the interface comes back, the route returns to the primary next hop. Note the limitation: the failover is triggered when the next hop becomes unreachable, typically because the interface goes down. A static route cannot detect a failure further upstream on its own, which is one reason dynamic routing or additional monitoring exists.",
   "A floating static route is the same idea applied between a static route and a dynamic protocol. You give the static route a preference higher than the protocol's, for example `set routing-options static route 10.50.0.0/16 next-hop 10.9.9.2 preference 200`. OSPF (Open Shortest Path First) routes at 10 or 150, and even BGP (Border Gateway Protocol) at 170, then win while they are available, and the static route floats up to become active only when the dynamic route disappears. The word 'floating' captures this: the route sits below the surface, inactive but ready.",
   "Instead of a next hop, a static route can point to special actions. `discard` silently drops matching packets. `reject` drops them and returns an ICMP (Internet Control Message Protocol) destination unreachable message to the sender. Both are useful for blackholing traffic, for example for a summary prefix you advertise so that packets to unused parts of it are dropped rather than looping, or to stop traffic to a known bad destination. Discard is usually preferred facing the internet because it does not generate ICMP messages that an attacker could use to map your network or that add load to the router. Reject is friendlier inside a network, because the sender learns quickly that the destination does not exist instead of waiting for a timeout.",
   "Verify with `show route protocol static` and check that the route has the `*` for active, or look for it in `show route hidden` if it is missing. Other options you may see include `no-readvertise`, which keeps the route from being exported by routing policy into protocols, and `retain`, which keeps it in the forwarding table if the routing process stops. Putting it together for Kai's clinics: a default route with a fiber `next-hop` and an LTE `qualified-next-hop` at preference 7 gives automatic failover when the fiber interface drops, and a `discard` route for unused internal space keeps stray traffic from wandering. After committing, Kai can confirm the design by checking that `show route 0.0.0.0/0 exact` lists both next hops with the fiber one selected, and by administratively disabling the fiber interface during a maintenance window to watch the LTE next hop take over."
  ],
  "analogy": "A static route with a qualified next hop is like a written commute plan taped to the fridge: take the highway, but if the highway on-ramp is closed, take Route 9. The plan never rewrites itself, but it already contains the backup. Discard is a locked door with no sign; reject is a locked door with a sign saying no entry. The analogy stops working for upstream failures: the plan only notices a closed on-ramp, not a traffic jam ten miles later.",
  "terms": [
   [
    "next-hop",
    "The directly connected address a static route forwards to; if unreachable, the route is not usable."
   ],
   [
    "qualified-next-hop",
    "A next hop within a static route that has its own preference or metric, used for backup paths."
   ],
   [
    "Floating static route",
    "A static route with a preference higher than a dynamic route, so it becomes active only when the dynamic route is gone."
   ],
   [
    "resolve",
    "A static route option that allows a next hop that is not directly connected to be resolved through other routes."
   ],
   [
    "discard vs reject",
    "Both drop matching packets; reject also sends an ICMP unreachable message, discard stays silent."
   ]
  ],
  "example": "A branch router has a fiber link to the main ISP and a cheaper LTE link. The engineer configures a default route with `next-hop` pointing to the fiber gateway and a `qualified-next-hop` to the LTE gateway with preference 7. When the fiber interface goes down, the default route immediately uses LTE, and it moves back when the fiber recovers.",
  "mistakes": [
   [
    "Expecting a static route with a remote next hop to work without extra options.",
    "By default the next hop must be directly connected. Otherwise the route stays hidden unless you add `resolve`."
   ],
   [
    "Creating a floating static route by lowering its preference.",
    "A floating route needs a higher preference than the dynamic route so that it loses while the dynamic route exists."
   ],
   [
    "Thinking multiple plain `next-hop` statements create a primary and backup.",
    "Multiple plain next hops share the same preference and act as equal next hops. Use `qualified-next-hop` with a different preference for a backup."
   ],
   [
    "Believing discard and reject differ in whether traffic is dropped.",
    "Both drop the traffic. The only difference is that reject returns an ICMP unreachable to the sender."
   ]
  ],
  "tryit": [
   [
    "At Cedar Ridge Library, a router runs OSPF and learns 10.60.0.0/16 from the core. The engineer wants a static route to the same prefix through a backup link, used only if OSPF loses the route. She configures it with no preference option. What happens, and what should she change?",
    "With the default preference of 5, the static route beats OSPF (10) and becomes active immediately, sending traffic over the backup link all the time. She should add a preference higher than OSPF's, such as `preference 200`, to make it a floating static route."
   ]
  ],
  "tip": "A static next hop must normally be directly connected, or the route will not become active. A higher preference makes a route a backup, and reject differs from discard only by sending an ICMP unreachable.",
  "check": [
   [
    "You configure a static route whose next hop is on a remote network, and it does not appear as active. Why?",
    "Junos requires the next hop to be directly reachable by default; without `resolve` the next hop cannot be resolved."
   ],
   [
    "How do you make a static route that is used only if OSPF loses its route to the same prefix?",
    "Give the static route a preference higher than OSPF's, such as `preference 200`, creating a floating static route."
   ],
   [
    "What is the difference between discard and reject?",
    "Both drop traffic; reject sends an ICMP unreachable to the source, discard drops silently."
   ],
   [
    "How do you give a backup next hop its own preference within one static route?",
    "Use `qualified-next-hop <address> preference <value>`."
   ]
  ]
 },
 {
  "t": "Default routes and summarization (aggregate routes)",
  "hook": "The core routers at Northfield Utilities are struggling. Each regional office advertises dozens of /24 subnets, and every time a single office switch reboots, a ripple of route updates washes across the whole network. Priya, the network architect, wants each office to send just one route upward. During the design review, a colleague raises a worry: if the office router advertises a big summary, what happens to packets aimed at parts of that range that do not exist? Could they loop forever between the office and the core? How does Junos summarize safely?",
  "simple": "A default route is the catch-all direction: 'if you do not know where else to send it, send it here.' It matches every address, but because the router always prefers the most precise match, it is only used as a last resort. Summarization goes the other way: instead of telling neighbors about fifty small neighborhoods, you tell them about the one city that contains them all. Junos builds these summaries as aggregate routes. A summary only appears while at least one of the small neighborhoods actually exists, and packets for empty parts of the city are refused instead of wandering around. It is like a postal service delivering to 'any address in Springfield' but returning letters for streets that do not exist.",
  "body": [
   "A default route, written 0.0.0.0/0 for IPv4 and ::/0 for IPv6, matches every destination because its prefix length is zero. Thanks to longest-prefix match, it is used only when no more specific route exists. That makes it the classic way to send all unknown traffic toward an ISP (internet service provider) or a core router, so that small sites do not need a full table. You can create it as a static route (`set routing-options static route 0.0.0.0/0 next-hop 203.0.113.1`), learn it from a routing protocol, or advertise it into OSPF (Open Shortest Path First) with an export policy so other routers learn it.",
   "Summarization is the opposite idea: instead of sending many specific routes, you advertise one broader prefix that covers them. If a site uses 10.20.0.0/24 through 10.20.255.0/24, you can advertise just 10.20.0.0/16. Summarization brings three benefits. It makes routing tables smaller, it reduces the work routers do when a single subnet flaps, because the summary stays stable and neighbors never hear about the flap, and it hides internal detail from neighbors. The cost is a little precision: neighbors no longer know exactly which subnets exist.",
   "In Junos, a summary is created with an aggregate route under `routing-options aggregate`, and you can inspect it with `show route` using the `exact` and `detail` options.",
   "```\nset routing-options aggregate route 10.20.0.0/16\nuser@R1> show route 10.20.0.0/16 exact detail\n```",
   "An aggregate route becomes active only when at least one contributing route exists. A contributing route is any active route that is more specific than the aggregate and falls inside it, such as 10.20.5.0/24. If all contributing routes disappear, the aggregate goes away too, so you do not advertise a summary for networks that are not reachable at all. That is a safety feature: neighbors stop sending traffic for the range when nothing in it is reachable. `show route 10.20.0.0/16 exact detail` lists the contributing routes, which is the quickest way to check why an aggregate is or is not active.",
   "The next hop of an aggregate route is reject by default. That can seem odd at first, but it makes sense, and it answers the worry from the design review. The router forwards packets for a real subnet using the more specific contributing route, thanks to longest match, so the aggregate's own next hop is never used for them. Packets that match only the aggregate are for unused parts of the range, and dropping them prevents routing loops. Without it, the office router might send those packets back toward the core along its default route, the core would send them back to the office because of the summary, and the packets would bounce until their TTL (time to live) expired. You can change the action to `discard` for silent drops if you do not want ICMP (Internet Control Message Protocol) unreachable messages sent. Aggregate routes have a default preference of 130.",
   "Creating an aggregate does not advertise it. This is a point the exam likes to test. The aggregate exists only in the local routing table until a routing policy exports it into OSPF or BGP (Border Gateway Protocol), for example with a term matching `from protocol aggregate` and `route-filter 10.20.0.0/16 exact` with `then accept`, applied as an export policy under the protocol. You often also want to stop the specific routes from being advertised, so only the summary goes out and the benefit of hiding the flaps is real.",
   "Junos also has generated routes, configured under `routing-options generate`. Like aggregates, they depend on contributing routes and have preference 130, but instead of reject they take the next hop of the primary contributing route. That makes them useful as a conditional default route: for example, a generated 0.0.0.0/0 that exists only while certain upstream routes are present, so a router stops attracting traffic toward a provider when the provider's routes vanish. The simple way to remember the difference is that an aggregate rejects by default, while a generated route forwards using a real next hop it borrows from a contributor. In both cases, `show route <prefix> exact detail` is the verification tool: it lists the contributing routes, shows which one is primary, and makes it clear whether the summary is active right now. Checking that output before and after writing the export policy avoids most summarization surprises."
  ],
  "analogy": "An aggregate route is like a building directory sign at the street that says 'Suites 100 to 199, this entrance.' The sign only goes up once at least one suite is occupied, and the receptionist turns away anyone asking for an empty suite rather than sending them back outside. A generated route is a sign that instead points visitors to the receptionist of the main occupied suite. The analogy stops working for advertising: in Junos the sign is not shown to neighbors until an export policy puts it out.",
  "terms": [
   [
    "Default route",
    "The route 0.0.0.0/0 (or ::/0) that matches any destination not covered by a more specific route."
   ],
   [
    "Summarization",
    "Advertising one broader prefix in place of many more specific ones."
   ],
   [
    "Aggregate route",
    "A summary route under `routing-options aggregate`, active only when a contributing route exists, with a reject next hop by default."
   ],
   [
    "Contributing route",
    "An active, more specific route that falls within an aggregate or generated route and keeps it active."
   ],
   [
    "Generated route",
    "A summary-like route that takes the next hop of its primary contributing route instead of reject."
   ]
  ],
  "example": "A regional office owns 10.20.0.0/16, split into dozens of /24 subnets. Its edge router creates an aggregate for 10.20.0.0/16 and exports only that into BGP toward the core. The core table holds one route instead of dozens, and when a single /24 flaps at the office, the core does not notice.",
  "mistakes": [
   [
    "Assuming an aggregate route is advertised as soon as it is configured.",
    "It is only in the local table. An export policy under OSPF or BGP must accept it before neighbors learn it."
   ],
   [
    "Thinking the aggregate is active even with no contributing routes.",
    "An aggregate needs at least one active, more specific contributing route inside its range to become active."
   ],
   [
    "Believing packets for real subnets are rejected because the aggregate's next hop is reject.",
    "Real subnets use their more specific contributing routes through longest match; only packets matching nothing but the aggregate are rejected."
   ],
   [
    "Mixing up aggregate and generated routes.",
    "Both need contributing routes and use preference 130, but aggregates reject by default while generated routes use the next hop of the primary contributing route."
   ]
  ],
  "tryit": [
   [
    "At Blue Harbor School District, an engineer configures `set routing-options aggregate route 10.40.0.0/16` on a site router, commits, and checks the core. The core has no route to 10.40.0.0/16, although `show route 10.40.0.0/16 exact` on the site router shows it active. What is missing?",
    "An export policy. The aggregate is active locally, but nothing advertises it. She needs a policy matching `from protocol aggregate` and `route-filter 10.40.0.0/16 exact` with `then accept`, applied as an export policy under the protocol that talks to the core."
   ],
   [
    "The same router later loses every 10.40.x.x subnet because the site switch fails. What happens to the aggregate and why is that useful?",
    "The aggregate becomes inactive because no contributing routes remain, so it is withdrawn. The core stops sending traffic for a range that is entirely unreachable."
   ]
  ],
  "tip": "An aggregate needs at least one contributing route to be active, uses preference 130, has reject as its default next hop and is not advertised until an export policy sends it out.",
  "check": [
   [
    "What must exist for an aggregate route to become active?",
    "At least one active, more specific contributing route within the aggregate's range."
   ],
   [
    "What happens to a packet that matches only the aggregate route and no contributing route?",
    "It is rejected (dropped with ICMP unreachable) by default, or silently discarded if configured with discard."
   ],
   [
    "How does a generated route differ from an aggregate route?",
    "A generated route uses the next hop of its primary contributing route instead of reject."
   ],
   [
    "When is a default route used for forwarding?",
    "Only when no more specific route matches the destination, because of longest-prefix match."
   ]
  ]
 },
 {
  "t": "Dynamic routing concepts: why IGPs and EGPs exist, OSPF and BGP at a high level",
  "hook": "Halvorsen University has grown from one campus to four, and the spreadsheet of static routes that Ingrid maintains now runs to three hundred lines. Last week a fiber between the science building and the library broke, and nobody noticed until students complained, because the static routes kept pointing at the dead link. Meanwhile the university is adding a second internet provider and needs to announce its public addresses to both. Ingrid's manager asks a fair question: do we need one new protocol or two, and why are they different?",
  "simple": "Routers can talk to each other to share which networks they can reach, so you do not have to type every route by hand. When a link breaks, they notice and find another way automatically. There are two families of these conversations. Inside one organization's network, routers use an interior protocol like OSPF, which focuses on finding the fastest path quickly. Between different organizations, such as a company and its internet providers, routers use BGP, which focuses on rules and business choices and can handle the enormous size of the internet. Think of the roads inside a city versus the highways and border crossings between countries: different priorities, different rules.",
  "body": [
   "Static routes work well for a handful of networks, but they do not scale and they do not react to failures on their own. Dynamic routing protocols let routers tell each other which networks they can reach, detect link failures and recalculate paths automatically. Protocols fall into two groups based on where they operate relative to an autonomous system (AS), which is a network under a single administrative control with its own routing policy, usually identified by an AS number. Your company's network is typically one AS, and each internet provider is another.",
   "Interior gateway protocols (IGPs) run inside one AS. Their goal is to find the best path quickly within a network you control and trust, and to reconverge fast when something fails. OSPF (Open Shortest Path First), IS-IS (Intermediate System to Intermediate System) and RIP (Routing Information Protocol) are IGPs. Exterior gateway protocols (EGPs) run between autonomous systems, where the priorities are different: scale to the size of the internet, enforce business policy such as which neighbor you prefer and what traffic you are willing to carry, and prevent loops between organizations that do not share topology details. BGP (Border Gateway Protocol) is the EGP used on the internet today.",
   "Why not use one protocol for everything? An IGP assumes all routers share detailed knowledge and trust each other, which is reasonable inside your own network but impossible across thousands of independent organizations. An EGP assumes neighbors are separate businesses with their own interests, so it exchanges reachability and attributes rather than full topology and lets each AS apply its own policy. Each design is excellent at its own job and poor at the other's.",
   "OSPF is a link-state protocol. Each router describes its own links in link-state advertisements (LSAs) and floods them to every router in the area. Every router then builds the same map of the network, the link-state database, and runs the SPF (shortest path first) algorithm, also called Dijkstra's algorithm, to compute the lowest-cost path to each destination. Cost is derived from interface bandwidth by default, so faster links are preferred. OSPF neighbors discover each other with hello packets, and they must agree on parameters such as area, hello and dead intervals and subnet to form an adjacency. For scale, OSPF divides a network into areas, with area 0 as the backbone that all other areas connect to. OSPF converges fast and is well suited to enterprise and service provider cores.",
   "```\nset protocols ospf area 0.0.0.0 interface ge-0/0/1.0\nset protocols ospf area 0.0.0.0 interface lo0.0 passive\nuser@R1> show ospf neighbor\n```",
   "In that snippet, OSPF runs on ge-0/0/1.0 in the backbone area, and the loopback is included as passive, which means its address is advertised but no hellos are sent on it, since no neighbor could ever appear there. `show ospf neighbor` lists adjacent routers and their state; a healthy adjacency shows the Full state. If the fiber in the opening scene breaks, the neighbor across it disappears, LSAs are reflooded, and every router recomputes SPF to route around the failure within seconds.",
   "BGP is a path-vector protocol. BGP speakers form sessions over TCP (Transmission Control Protocol) port 179, so delivery is reliable and BGP does not need its own retransmission scheme. Each advertised route carries attributes, the most important being the AS path, which lists the autonomous systems the route has passed through. A router that sees its own AS number in the path rejects the route, which prevents loops between organizations. BGP sessions between different ASs are external BGP (EBGP); sessions within one AS are internal BGP (IBGP). BGP chooses routes through a sequence of attribute comparisons rather than a single metric, which gives operators fine-grained policy control. It is slower to converge than an IGP but can carry very large numbers of routes.",
   "In practice, the two work together. An IGP such as OSPF provides fast internal reachability, including to other routers' loopback addresses, and BGP runs on top of it to exchange external and customer routes; IBGP sessions are commonly built between loopbacks that the IGP makes reachable. In Junos, OSPF routes have preference 10 (internal) or 150 (external), and BGP routes have 170, so if the same prefix is learned both ways, the internal OSPF path is preferred by default."
  ],
  "analogy": "An IGP is like a city's traffic control center: it sees every street, knows every closure the moment it happens and reroutes cars instantly. BGP is like the agreements between countries at border crossings: each country does not see the other's streets, only which destinations can be reached through which neighbor, and each decides by its own rules whom to let through. The analogy simplifies one point: BGP's AS path is like a passport stamp list, and a country refuses entry to a traveler already stamped by itself.",
  "terms": [
   [
    "Autonomous system (AS)",
    "A network under one administrative control with its own routing policy, identified by an AS number."
   ],
   [
    "IGP",
    "Interior gateway protocol, such as OSPF, IS-IS or RIP, used within a single AS."
   ],
   [
    "EGP",
    "Exterior gateway protocol used between autonomous systems; BGP is the one used today."
   ],
   [
    "Link-state",
    "A protocol design, used by OSPF, where routers flood link information and each computes paths with SPF."
   ],
   [
    "Path-vector",
    "A protocol design, used by BGP, where routes carry a list of the autonomous systems they crossed."
   ],
   [
    "AS path",
    "A BGP attribute listing the autonomous systems a route has crossed, used for loop prevention and path selection."
   ]
  ],
  "example": "A university runs OSPF across its campus so every building router quickly finds the best internal path and reroutes around a broken fiber in seconds. At the edge, it runs EBGP with two internet providers to announce its public prefixes and receive internet routes, using policy to prefer one provider for outbound traffic.",
  "mistakes": [
   [
    "Calling BGP an IGP because it can run inside an AS as IBGP.",
    "BGP is the exterior gateway protocol. IBGP is simply BGP between routers of the same AS, usually carrying external routes across it."
   ],
   [
    "Saying OSPF uses hop count to choose paths.",
    "OSPF uses cost, derived from bandwidth by default, and runs SPF. Hop count is what RIP uses."
   ],
   [
    "Believing BGP runs over UDP.",
    "BGP uses TCP port 179, which gives it reliable delivery."
   ],
   [
    "Thinking EGPs are chosen for fast convergence.",
    "IGPs prioritize fast convergence; EGPs prioritize policy control and scale."
   ]
  ],
  "tryit": [
   [
    "Fairmont Health has twelve hospitals connected by private links and one connection each to two internet providers. A consultant proposes running only BGP everywhere to keep things simple. What would you recommend and why?",
    "Run an IGP such as OSPF inside the hospital network for fast, automatic internal reconvergence and loopback reachability, and EBGP at the edge with the two providers for policy control over public prefixes. Each protocol is suited to its role, and IBGP, if needed internally, relies on the IGP for reachability between loopbacks."
   ]
  ],
  "tip": "IGP means inside one AS and is about fast, best-path convergence; EGP means between ASs and is about policy and scale. OSPF is link-state with SPF and areas; BGP is path-vector over TCP 179 with the AS path for loop prevention.",
  "check": [
   [
    "Is OSPF an IGP or an EGP, and what algorithm does it use?",
    "An IGP; it uses the SPF (Dijkstra) algorithm on its link-state database."
   ],
   [
    "What transport and port does BGP use?",
    "TCP port 179."
   ],
   [
    "How does BGP prevent routing loops between autonomous systems?",
    "A router rejects routes whose AS path already contains its own AS number."
   ],
   [
    "What is the name of the OSPF backbone area?",
    "Area 0 (0.0.0.0)."
   ]
  ]
 },
 {
  "t": "Reading `show route`, `show route detail`, `show route protocol`, `show route table`",
  "hook": "It is 11 p.m. and the help desk at Ridgeway Pharmacy has escalated a strange complaint: the Denver store drops off the network for a few seconds every few minutes, then comes back. You log in to the core router and type `show route 10.44.0.0/16`. A screen of brackets, symbols and timers scrolls past. Somewhere in those lines is the clue that tells you whether the route is stable, where it comes from and which way packets are going. Can you read it fast enough to find the problem before the store closes?",
  "simple": "`show route` is the command that shows the router's list of directions. Each entry tells you a destination, where the router learned it, how much it trusts that source, which neighbor packets are handed to, and how long the entry has existed. A star means 'this is the one in use.' An arrow mark means 'this is the exit being used.' You can narrow the list to one source, one table or one destination, or ask for extra detail that explains why an entry is or is not being used. It is like reading a train departure board: you learn to scan for the line, the platform and the time without reading every word.",
  "body": [
   "`show route` is the command you will use most when troubleshooting routing on Junos. Reading its output quickly and correctly is a core skill, and exam questions often show a snippet and ask what it means. The output follows a consistent layout, so once you know where each piece of information sits, you can scan even a long table in seconds. Here is a short example from a router with a static default route, a directly connected link and an OSPF (Open Shortest Path First) route to a neighbor's loopback.",
   "```\nuser@R1> show route\ninet.0: 9 destinations, 10 routes (9 active, 0 holddown, 0 hidden)\n+ = Active Route, - = Last Active, * = Both\n\n0.0.0.0/0          *[Static/5] 2d 03:11:20\n                    >  to 203.0.113.1 via ge-0/0/0.0\n10.1.12.0/30       *[Direct/0] 2d 03:11:25\n                    >  via ge-0/0/1.0\n10.1.12.1/32       *[Local/0] 2d 03:11:25\n                       Local via ge-0/0/1.0\n10.255.0.2/32      *[OSPF/10] 00:41:02, metric 1\n                    >  to 10.1.12.2 via ge-0/0/1.0\n```",
   "Start with the header. It names the table (inet.0) and gives counts: destinations (prefixes), routes (a prefix can have several), and how many are active, in holddown (being withdrawn) and hidden (unusable). Here there are 9 destinations but 10 routes, so one prefix has a backup route that is not shown in this trimmed snippet. Next is the legend for the symbols. Each route entry then shows the prefix, a `*` if it is active, the protocol and preference in brackets such as `[OSPF/10]`, how long the route has been known, the metric if any, and one or more next-hop lines. The `>` marks the next hop in use. A Direct route is the subnet on an interface, and a Local route is the device's own /32 address on that subnet, used to deliver packets to the router itself.",
   "Filtering helps on real devices with thousands of routes. `show route 10.255.0.2` shows the best match for that address, which is handy when you want to know which route a particular packet would use. `show route 10.0.0.0/8 exact` shows only that exact prefix rather than everything more specific. `show route protocol ospf` (or static, bgp, direct, local, aggregate) shows only routes from that source, which is a quick way to check what a protocol is contributing. `show route table inet6.0` or `show route table vr1.inet.0` shows a specific table. `show route terse` shows a compact one-line-per-route view, and `show route hidden` lists routes Junos cannot use.",
   "`show route detail` (and the even longer `extensive`) explains why a route is what it is. For each route you see its preference, the next-hop type and interface, the State field (for example `<Active Int>` for an active internal route), the Age, the Task that installed it, the metric, the announcement bits showing which protocols or processes use it, and for BGP (Border Gateway Protocol) routes attributes such as the AS (autonomous system) path, local preference and communities. Inactive routes show an `Inactive reason` line, which is especially useful: it tells you why a route lost, for example `Route Preference` when another route to the same prefix had a better preference. When someone asks why traffic is not using the path they expected, this line is usually the answer.",
   "For BGP specifically, `show route receive-protocol bgp <neighbor>` shows routes received from a neighbor and `show route advertising-protocol bgp <neighbor>` shows what you are sending to it. Together these let you check both sides of a policy: whether a neighbor is sending what you expect, and whether your export policy is sending what you intend. They complement `show route protocol bgp`, which shows BGP routes in the table after import policy.",
   "Get into the habit of reading each route in this order: is it active (`*`), where did it come from (protocol and preference), where does it go (`>` next hop and interface), and how long has it been there. That last field is underrated. A short age on an important route often reveals a flapping link, because each time the route is withdrawn and relearned its timer restarts. In the opening scene, an OSPF route to the Denver store showing an age of under a minute, and resetting again a few minutes later, would point straight at an unstable link toward that site.",
   "Finally, connect what you read to the next step. If the route is missing, check `show route hidden` and the relevant protocol's neighbor state. If it is present but inactive, use `detail` to read the inactive reason. If it is active but young, investigate the interface with commands such as `show interfaces extensive` and look for errors or carrier transitions. Reading `show route` well tells you which of these paths to take."
  ],
  "analogy": "Reading `show route` is like reading an airport departures board. Each line is a destination; the airline is the protocol, the gate is the next hop and interface, and the time since the flight was posted is the age. A flight marked boarding is the active route. The detail view is like asking the agent why a flight was moved: it gives the reason. The analogy stops at timing: a short age is not a delay but a sign the route was recently relearned.",
  "terms": [
   [
    "Hidden route",
    "A route Junos knows but cannot use, often because its next hop is unresolvable or a policy rejected it; shown with `show route hidden`."
   ],
   [
    "Direct route",
    "A route to the subnet configured on an interface, with preference 0."
   ],
   [
    "Local route",
    "A /32 (or /128) route to the device's own interface address, with preference 0."
   ],
   [
    "show route detail",
    "Output that adds state, age, task, inactive reason and protocol attributes for each route."
   ],
   [
    "show route protocol",
    "Filters `show route` to routes from one source such as static, ospf or bgp."
   ]
  ],
  "example": "Users report that a remote site is unreachable for a few seconds every few minutes. `show route 10.44.0.0/16` shows the OSPF route with an age of only 00:00:37. Checking again later shows the age reset, so the route is flapping. The engineer checks `show interfaces extensive` on the link toward the site and finds carrier transitions increasing.",
  "mistakes": [
   [
    "Using `show route protocol` to view a routing instance's routes.",
    "`protocol` filters by route source. To view an instance's routes, use `show route table <instance>.inet.0`."
   ],
   [
    "Reading `[OSPF/10]` as a metric of 10.",
    "The number after the slash is the preference. The metric appears separately, such as `metric 1`."
   ],
   [
    "Ignoring the age field.",
    "A very short age on an important route suggests flapping and is often the first clue to an unstable link."
   ],
   [
    "Expecting plain `show route` to explain why a route is inactive.",
    "Use `show route <prefix> detail` or `extensive` to see the inactive reason."
   ]
  ],
  "tryit": [
   [
    "At Lantern Insurance, `show route 172.31.0.0/16` shows two entries: `*[OSPF/150]` via ge-0/0/2.0 and `[BGP/170]` via ge-0/0/3.0. A manager expected traffic to use ge-0/0/3.0. What is happening, and what command confirms the reason?",
    "The OSPF external route (150) is active because its preference is lower than BGP's 170, so traffic uses ge-0/0/2.0. `show route 172.31.0.0/16 detail` would show the BGP route's inactive reason as route preference."
   ]
  ],
  "tip": "Know every symbol: `*` active, `>` selected next hop, brackets show protocol/preference. Use `protocol` to filter by source, `table` to choose a table and `detail` to see why a route is inactive.",
  "check": [
   [
    "Which command shows only static routes?",
    "`show route protocol static`."
   ],
   [
    "In `show route` output, what does `[OSPF/10]` indicate?",
    "The route was learned from OSPF as an internal route with preference 10."
   ],
   [
    "Where would you look to see why a route is not active?",
    "`show route <prefix> detail` (or extensive), which shows the inactive reason."
   ],
   [
    "Which command shows the routes you are sending to a BGP neighbor?",
    "`show route advertising-protocol bgp <neighbor>`."
   ]
  ]
 },
 {
  "t": "Routing policy uses: import (into the routing table) and export (out of the routing table)",
  "hook": "Marcus at Tidewater Shipping connected the company to a second internet provider on Friday. By Monday, the first provider's network operations center is on the phone: Tidewater is advertising the entire internet routing table back to them, offering to carry other people's traffic. Marcus is stunned; he only wanted to receive routes. He had written a policy but was not sure whether it belonged on the way in or the way out. Which direction is which in Junos, and how could one misplaced policy turn a shipping company into an accidental transit provider?",
  "simple": "A routing policy is a set of rules that decides which directions a router accepts and which ones it shares. Junos describes direction from the point of view of the router's own route list. An import policy is a rule at the front door: it checks routes arriving from neighbors before they are added to the list, and can refuse or change them. An export policy is a rule at the back door: it checks routes on the list before they are told to neighbors. For example, you might accept only a default route from your internet provider (import) and tell the provider only about your own addresses (export). Think of a building's security desk that checks both who comes in and what is carried out.",
  "body": [
   "Routing policy is how you control which routes enter the routing table and which routes a device advertises to others. In Junos, every policy is applied in one of two directions, and the direction is always described from the point of view of the routing table, not from the point of view of a neighbor or an interface. Getting that perspective right is the single most important idea in this lesson, and it is the reason the same policy can have very different effects depending on where you apply it.",
   "An import policy acts on routes coming from a routing protocol into the routing table. It decides which received routes are accepted and can change their attributes, such as preference, local preference, metric or communities, before they are installed. BGP routes rejected by import policy do not simply vanish; by default Junos keeps them as hidden routes, which you can see with `show route hidden`, so you can confirm the policy did what you intended. For example, you can reject a BGP (Border Gateway Protocol) neighbor's advertisement of a private prefix that should never come from the internet, or raise the local preference of routes from a preferred provider so they win route selection. Import policies are applied under the protocol, for example `set protocols bgp group ISP import FROM-ISP`.",
   "An export policy acts on routes going from the routing table out into a routing protocol, to be advertised to neighbors. It decides which active routes are advertised and can change attributes on the way out, such as prepending to the AS (autonomous system) path or setting a community. Export policy is also how redistribution works in Junos: to advertise static, direct or aggregate routes into OSPF (Open Shortest Path First), you write a policy that matches them and accepts them, and then apply it with `set protocols ospf export ADVERTISE-STATIC`. Without that export policy, those routes are not advertised.",
   "```\nset policy-options policy-statement ADVERTISE-STATIC term 1 from protocol static\nset policy-options policy-statement ADVERTISE-STATIC term 1 then accept\nset protocols ospf export ADVERTISE-STATIC\n```",
   "That example shows the two halves of every policy: the definition and the application. The `policy-options` lines define a named policy-statement, which by itself does nothing. The last line applies it as an export policy under OSPF, so static routes in the routing table are now offered to OSPF neighbors as external routes. In the opening scene, Marcus's mistake was the opposite: with no restrictive export policy on his BGP groups, BGP's default behavior advertised the routes learned from one provider to the other.",
   "There is an important limitation for link-state protocols such as OSPF. Because every OSPF router in an area must have the same link-state database to compute consistent paths, you cannot use import policy to block LSAs (link-state advertisements) from being flooded or entering the database. OSPF import policy can only affect which OSPF external routes are installed into the local routing table, and even then the LSAs are still flooded onward. Export policy is how OSPF originates external routes into the domain. With BGP, a path-vector protocol, both import and export policies are very flexible, because each router makes its own decisions about what it accepts and advertises.",
   "Policies can also be applied in other places. `routing-options forwarding-table export` applies a policy as routes go from the routing table to the forwarding table; the classic use is enabling load balancing across equal-cost paths with the `load-balance per-packet` action, which on modern hardware actually balances per flow despite its name. Policies are also used for route leaking between instances and for controlling generated routes.",
   "A useful mental picture: the routing table sits in the middle. Protocols feed routes in through import policies and receive routes to advertise through export policies, and the forwarding table receives active routes through its own export point. If you remember that import means into the table and export means out of the table, you can place any policy correctly, whatever the protocol. It also helps to verify both sides: `show route receive-protocol bgp <neighbor>` shows what arrived before import policy, and `show route advertising-protocol bgp <neighbor>` shows what export policy is actually sending, so you can see each policy's effect directly instead of guessing. When a question asks you to stop routes from being learned, think import; when it asks you to stop or start advertising, or to redistribute, think export."
  ],
  "analogy": "Think of the routing table as a warehouse. Import policy is the receiving dock inspector, who decides which delivered crates get shelved and may relabel them. Export policy is the shipping dock inspector, who decides which shelved crates go out on which truck and may relabel them on the way. The analogy breaks for OSPF: its LSAs are like mandatory memos that every warehouse in the area must file, so the receiving inspector cannot stop them, only decide which external crates are shelved locally.",
  "terms": [
   [
    "Import policy",
    "A routing policy applied to routes received from a protocol before they are placed in the routing table."
   ],
   [
    "Export policy",
    "A routing policy applied to active routes as they are advertised from the routing table into a protocol."
   ],
   [
    "Redistribution",
    "Advertising routes learned from one source into another protocol; in Junos this is done with export policy."
   ],
   [
    "policy-statement",
    "The named routing policy object configured under `policy-options`."
   ],
   [
    "Forwarding-table export",
    "A policy applied under `routing-options forwarding-table export`, often used to enable load balancing."
   ]
  ],
  "example": "An enterprise connected to two ISPs wants to receive only a default route from each. It applies an import policy on both BGP groups that accepts 0.0.0.0/0 and rejects everything else, and an export policy that advertises only its own aggregate, so it never accidentally becomes a transit path between the providers.",
  "mistakes": [
   [
    "Applying an import policy to stop advertising routes to a neighbor.",
    "Advertising is outbound from the routing table, so it is controlled by export policy."
   ],
   [
    "Expecting OSPF import policy to stop LSAs from being flooded.",
    "OSPF must keep a consistent link-state database. Import policy can only limit which external routes are installed locally."
   ],
   [
    "Assuming a defined policy-statement takes effect after commit.",
    "A policy does nothing until it is applied as import or export under a protocol or other attachment point."
   ],
   [
    "Thinking redistribution in Junos uses a separate redistribute command.",
    "Redistribution is done with an export policy applied under the receiving protocol."
   ]
  ],
  "tryit": [
   [
    "Pinewood Clinic's router runs OSPF internally and has a static default route to its ISP. Other OSPF routers in the clinic do not know how to reach the internet. What should the engineer configure, and in which direction?",
    "An export policy under OSPF that matches the static default route, for example `from protocol static` with `route-filter 0.0.0.0/0 exact` and `then accept`, applied with `set protocols ospf export <name>`. Export is correct because the route must go out of the routing table into OSPF."
   ]
  ],
  "tip": "Import and export are relative to the routing table: import is into it, export is out of it. OSPF import policy cannot stop LSA flooding; to advertise static or direct routes into OSPF you need an export policy.",
  "check": [
   [
    "You want OSPF to advertise a static route. Which type of policy do you apply, and where?",
    "An export policy matching the static route, applied under `protocols ospf export`."
   ],
   [
    "You want to stop routes from a BGP neighbor entering your routing table. Which direction?",
    "Import policy on that BGP neighbor or group."
   ],
   [
    "Can an OSPF import policy prevent LSAs from being flooded to other routers?",
    "No. It can only affect which external routes are installed in the local routing table."
   ]
  ]
 },
 {
  "t": "Default policies: BGP accepts and advertises active BGP routes; OSPF import accepts all and export rejects all; RIP export rejects all",
  "hook": "Two lab routers sit on Aisha's bench at the Brightwater Community College networking lab. She enables RIP on both, connects them and waits for routes. Nothing. She checks the cable, the interfaces, the RIP neighbor statements. Still nothing. On the next bench, a classmate's OSPF lab came up immediately with no extra configuration, and another classmate's BGP routers are already swapping routes. Aisha starts to wonder if RIP is broken on Junos. It is not. What does each protocol do when you write no policy at all?",
  "simple": "Every routing protocol in Junos comes with a built-in rule for what to do when you have not written your own. These are called default policies. BGP, by default, accepts the routes its neighbors send and passes on the BGP routes it is using. OSPF, by default, accepts its routes, and shares its own network map automatically, but does not add anything from outside OSPF. RIP, by default, listens to its neighbors but tells them nothing at all, not even about its own connected networks, so you must always add a sharing rule for RIP. It is like three new employees: one shares everything relevant, one shares only official reports, and one listens in meetings but never speaks until told to.",
  "body": [
   "Every routing protocol in Junos has a built-in default policy. It is applied automatically at the end of any policy chain, so it decides what happens to a route that none of your configured policies explicitly accepts or rejects. If you do not configure any policy at all, the default policy is all that applies. Knowing each protocol's default explains a lot of behavior that surprises beginners, and it is a favorite area for exam questions that describe a symptom and ask for the cause.",
   "BGP's (Border Gateway Protocol) default import policy accepts all BGP routes received from neighbors, so they are placed in the routing table, subject to normal checks such as AS (autonomous system) path loop detection and next-hop resolution. BGP's default export policy advertises all active BGP routes to BGP neighbors. There is one important restriction that comes from the protocol itself rather than the policy: routes learned from an IBGP (internal BGP) peer are not advertised to other IBGP peers, which is why IBGP normally needs a full mesh or route reflectors. Notice what the default does not do: it does not advertise static, direct, OSPF or aggregate routes into BGP. To announce your own prefixes, you need an export policy.",
   "That BGP default has real consequences. An enterprise with two providers and no export policy will, by default, advertise the active BGP routes learned from provider A to provider B, and vice versa, because they are active BGP routes. That can make the enterprise look like a transit path between providers, which is why edge routers almost always have an explicit export policy that advertises only the organization's own prefixes.",
   "OSPF's (Open Shortest Path First) default import policy accepts all OSPF routes. OSPF's default export policy rejects everything. That sounds alarming until you recall how OSPF works: routers share their own links and neighbors through LSAs (link-state advertisements), which are generated and flooded by the protocol itself, not by policy. So OSPF still exchanges all internal OSPF information normally, including the interfaces you have placed in OSPF areas; the export default only means that non-OSPF routes, such as statics or a default route, are not injected. When you want to advertise a static default route into OSPF, you write an export policy for it.",
   "RIP's (Routing Information Protocol) default import policy accepts RIP routes from neighbors, but its default export policy rejects everything. Unlike OSPF, RIP learns and advertises routes through the routing table rather than through a separately flooded database, so the export policy really is the only path out. With the default export policy, a Junos router running RIP receives routes but advertises nothing, not even its directly connected networks or routes it learned by RIP. To make RIP work you always need an export policy, typically one that accepts `from protocol [ rip direct ]`, applied to the RIP group.",
   "```\nset policy-options policy-statement RIP-OUT term 1 from protocol [ rip direct ]\nset policy-options policy-statement RIP-OUT term 1 then accept\nset protocols rip group NEIGHBORS export RIP-OUT\nset protocols rip group NEIGHBORS neighbor ge-0/0/1.0\n```",
   "With that configuration, the router advertises both its connected subnets and the routes it learned from other RIP routers, which is the normal behavior people expect from RIP on other platforms. In Aisha's lab, adding a similar policy on both routers makes routes appear on each side within moments, and `show route protocol rip` stops being empty.",
   "Summarizing the defaults in one place: BGP accepts all received BGP routes and advertises active BGP routes; OSPF accepts all and exports nothing extra, while still flooding its own link-state information; RIP accepts received RIP routes and advertises nothing. When a protocol does not behave as you expect, the first question to ask is whether your policy chain ends by falling through to one of these defaults. A route that matches none of your terms is not dropped by magic or accepted by luck; it is handled by the protocol's default policy. A practical habit follows from this: whenever you write a policy, decide deliberately whether you want the default to apply, and if not, end the policy with a final term that accepts or rejects everything left over. That way the result does not change if someone later moves the policy to a different protocol with a different default."
  ],
  "analogy": "Picture three new employees and the office's unwritten rules. The BGP employee reads all incoming mail and forwards relevant external mail to partners, but never mentions internal projects unless told to. The OSPF employee shares the official building map with every colleague automatically, but will not mention outside information unless asked. The RIP employee reads everything and stays silent until given a written instruction to speak. The analogy stops at IBGP: the BGP employee also never forwards mail from one internal colleague to another.",
  "terms": [
   [
    "Default policy",
    "The built-in, protocol-specific policy evaluated after all configured policies when none has made a final decision."
   ],
   [
    "BGP default import",
    "Accepts all BGP routes received from neighbors."
   ],
   [
    "BGP default export",
    "Advertises active BGP routes to BGP peers, except that IBGP-learned routes are not sent to other IBGP peers."
   ],
   [
    "OSPF default export",
    "Rejects all routes; OSPF's own link-state information is still flooded by the protocol itself."
   ],
   [
    "RIP default export",
    "Rejects all routes, so a RIP router advertises nothing until an export policy is configured."
   ]
  ],
  "example": "An engineer enables RIP on two lab routers and sees routes arriving on neither. `show route protocol rip` is empty on both. Because RIP's default export policy rejects everything, neither router is advertising. Adding an export policy that accepts RIP and direct routes on each router makes the routes appear within seconds.",
  "mistakes": [
   [
    "Thinking OSPF's default 'export rejects all' stops OSPF from sharing internal routes.",
    "OSPF shares its topology through LSAs flooded by the protocol. The export default only blocks redistribution of non-OSPF routes."
   ],
   [
    "Expecting BGP to advertise static or connected routes by default.",
    "BGP's default export advertises only active BGP routes. Your own prefixes need an export policy."
   ],
   [
    "Assuming RIP advertises its directly connected networks by default.",
    "RIP's default export rejects everything, including direct routes, so an export policy is always required."
   ],
   [
    "Believing BGP's default export sends IBGP-learned routes to other IBGP peers.",
    "The IBGP rule prevents that; full mesh or route reflectors are used instead."
   ]
  ],
  "tryit": [
   [
    "Stonebridge Bank's edge router has EBGP sessions to two ISPs and no export policy. A static route to its own public /24 exists. What does each ISP receive from the bank, and what should change?",
    "Each ISP receives the active BGP routes the bank learned from the other ISP, and not the bank's own /24, because the default export advertises only active BGP routes and never static routes. The bank should apply an export policy that accepts only its own prefix (for example the static or an aggregate) and rejects everything else."
   ]
  ],
  "tip": "The RIP trap is common: RIP needs an export policy even to advertise its own connected networks. For OSPF, 'export rejects all' does not stop normal OSPF operation; it only stops redistribution of other routes.",
  "check": [
   [
    "Without any policy, will a Junos BGP router advertise its static routes to peers?",
    "No. The default BGP export advertises only active BGP routes; static routes need an export policy."
   ],
   [
    "Why does OSPF still work with a default export policy that rejects all routes?",
    "OSPF shares its topology through LSAs flooded by the protocol, not through export policy."
   ],
   [
    "What must you add for a Junos router to advertise anything via RIP?",
    "An export policy under the RIP group, for example accepting `from protocol [ rip direct ]`."
   ],
   [
    "What does BGP's default import policy do?",
    "It accepts all BGP routes received from neighbors."
   ]
  ]
 },
 {
  "t": "Policy structure: terms, `from` match conditions, `then` actions; terminating vs flow-control actions (next term, next policy)",
  "hook": "Sofia at Granite Peak Telecom wrote what she thought was a careful export policy: term one accepts all static routes, and term two rejects one static prefix that belongs to a lab and must never reach customers. After the commit, a customer emails asking why they can suddenly see the lab network. Sofia reads the policy again and the logic looks right to her. Her mentor points at the order of the terms and asks one question: once a route is accepted, does Junos keep reading? What really happens inside a policy, line by line?",
  "simple": "A routing policy is a list of small if-then rules called terms, read from top to bottom. Each term says 'if a route looks like this' (the from part), 'then do this' (the then part). Some actions end the decision right away: accept lets the route through, reject blocks it. Other actions just say where to look next, like 'go to the next rule' or 'skip to the next policy.' Still others change something about the route, such as adding a tag, and then keep reading. The first accept or reject wins, so order matters. It is like a bouncer with a checklist: as soon as one line says let in or turn away, the bouncer stops reading.",
  "body": [
   "A Junos routing policy is a `policy-statement` defined under `policy-options`. Each policy is made of one or more terms, and each term is an if-then rule: a `from` section with match conditions and a `then` section with actions. Terms are evaluated in the order they appear, from top to bottom, and each route is checked against the terms independently. Understanding exactly when evaluation stops and when it continues is what lets you predict a policy's result, and it is heavily tested on the JNCIA-Junos exam.",
   "```\nset policy-options policy-statement EXPORT-BGP term STATICS from protocol static\nset policy-options policy-statement EXPORT-BGP term STATICS from route-filter 192.0.2.0/24 exact\nset policy-options policy-statement EXPORT-BGP term STATICS then community add CUST\nset policy-options policy-statement EXPORT-BGP term STATICS then accept\nset policy-options policy-statement EXPORT-BGP term REJECT-REST then reject\n```",
   "The `from` section lists match conditions such as `protocol`, `route-filter`, `prefix-list`, `neighbor`, `interface`, `area`, `as-path`, `community` and `tag`. When a term has several different conditions, all must match, a logical AND. In the example, a route must be both a static route and exactly 192.0.2.0/24 to match term STATICS. When one condition lists several values, like `protocol [ static direct ]`, any value can match, a logical OR. A term with no `from` section matches every route, which is how you write a catch-all final term like REJECT-REST above. There is also a `to` section for some conditions about where a route is going, such as a specific neighbor.",
   "The `then` section holds actions, and they fall into three groups. Terminating actions are `accept` and `reject`. When a route matches a term with one of these, evaluation stops right there for that route: no further terms and no further policies are checked. Flow-control actions change where evaluation continues: `next term` skips to the next term in the policy, and `next policy` skips the rest of this policy and moves to the next policy in the chain. Modifying actions change route attributes, such as `metric`, `preference`, `local-preference`, `community add`, `as-path-prepend` and `next-hop self`. Modifying actions do not stop evaluation by themselves.",
   "Walk a route through the example to see these rules work. The static route 192.0.2.0/24 matches both conditions of term STATICS, so it gets the CUST community added (a modifying action) and is then accepted (a terminating action); evaluation ends and the route is advertised with the community. A static route to 198.51.100.0/24 fails the route-filter, so it does not match STATICS and moves on to REJECT-REST, which has no `from` and therefore matches, rejecting it. An OSPF (Open Shortest Path First) route fails the protocol condition and is likewise rejected by the final term.",
   "What happens if a term matches but has no terminating or flow-control action, only modifiers? The modifications are applied, and evaluation continues with the next term, as if `next term` were present. This is useful for stacking changes: one term can set a community on many routes and a later term can accept or reject them. What if a route matches no term at all in the policy? Evaluation moves to the next policy in the chain, and if there are no more policies, to the protocol's default policy. This is why many engineers end their policies with an explicit final term, to make the result clear instead of relying on the default, which differs by protocol.",
   "Policy chains add one more layer. You can apply several policies in a list, for example `export [ POL-A POL-B ]`. Junos evaluates POL-A first; if a terminating action is reached, the result is final. If POL-A ends without a decision, or a term uses `next policy`, evaluation continues in POL-B, and finally in the default policy. Order in the list matters in the same way that term order matters within a policy.",
   "Order matters because the first terminating action wins. If the first term of an export policy accepts all static routes, a later term that tries to reject one static prefix never gets the chance, which is exactly what happened to Sofia in the opening scene. The fix is to place the specific reject term above the general accept term. Use `insert term X before term Y` to move terms in configuration mode, and use `show policy-options policy-statement NAME` to read the policy top to bottom. Also note that a policy is only a definition: it does nothing until you apply it as an import or export policy somewhere, and `test policy NAME <prefix>` can show which routes a policy accepts before you rely on it."
  ],
  "analogy": "A policy is like an airport security checklist read from the top. Each line says 'if the passenger matches this, do that.' Some lines end the check (cleared to board, or denied boarding). Some say 'skip to the next line' or 'send them to the next checkpoint.' Some just add a sticker to the boarding pass and keep reading. The analogy holds well, with one caution: a passenger who matches no line is not simply waved through; the protocol's default policy decides.",
  "terms": [
   [
    "Term",
    "A named if-then rule inside a policy, containing `from` match conditions and `then` actions."
   ],
   [
    "Terminating action",
    "`accept` or `reject`; ends policy evaluation for that route immediately."
   ],
   [
    "Flow-control action",
    "`next term` or `next policy`; moves evaluation to another term or policy without deciding the route's fate."
   ],
   [
    "Modifying action",
    "An action that changes route attributes, such as metric or community, without ending evaluation."
   ],
   [
    "Policy chain",
    "A list of policies applied together, evaluated in order and ending with the protocol's default policy."
   ]
  ],
  "example": "An ISP customer wants to prepend its AS twice on announcements to a backup provider. Its export policy has a first term that matches its aggregate, applies `as-path-prepend` and then `accept`, and a final term with no `from` that rejects everything else, so nothing but the aggregate is ever sent.",
  "mistakes": [
   [
    "Placing a general accept term above a specific reject term and expecting the reject to apply.",
    "The first terminating action wins. Put the specific reject term first, or the route is accepted before it is reached."
   ],
   [
    "Thinking multiple conditions in one `from` are ORed.",
    "Different conditions in one `from` are ANDed. Only multiple values inside one condition, like `protocol [ static direct ]`, are ORed."
   ],
   [
    "Believing a term with only modifying actions ends evaluation.",
    "Modifying actions apply and evaluation continues to the next term."
   ],
   [
    "Assuming a route that matches no term is rejected.",
    "It moves to the next policy in the chain and then to the protocol's default policy, which may accept it."
   ]
  ],
  "tryit": [
   [
    "Meadowbrook Networks applies `export [ TAG-ROUTES FINAL ]` to BGP. TAG-ROUTES has one term that matches `from protocol static` and only does `then community add NOC`. FINAL has one term matching `community NOC` with `then accept` and a last term with `then reject`. What happens to a static route and to an OSPF route?",
    "The static route gets the NOC community in TAG-ROUTES; with no terminating action, evaluation continues, falls out of TAG-ROUTES, enters FINAL, matches the community term and is accepted. The OSPF route matches nothing in TAG-ROUTES, moves to FINAL, does not have the community, and is rejected by the last term."
   ]
  ],
  "tip": "Several conditions in one `from` are ANDed; several values in one condition are ORed. A term with no `from` matches everything, and a term with only modifying actions continues to the next term. The first accept or reject wins.",
  "check": [
   [
    "A term matches a route and its `then` section only sets `metric 50`. What happens next?",
    "The metric is set and evaluation continues with the next term, because no terminating action was given."
   ],
   [
    "What does `next policy` do?",
    "It stops evaluating the current policy and moves to the next policy in the chain."
   ],
   [
    "How does a term with no `from` section behave?",
    "It matches all routes."
   ],
   [
    "A route matches no term in any configured policy. What decides its fate?",
    "The protocol's default policy."
   ]
  ]
 },
 {
  "t": "Policy chains and evaluation order, falling through to the default policy",
  "hook": "It is Tuesday morning at Lakeview Logistics, and Priya, the network engineer, opens an email from the company's second internet provider. Their tone is polite but firm: why is your edge router advertising thousands of the first provider's routes to us? Priya checks the export configuration. There is only one policy applied, and all it does is accept the company's own aggregate route. Nothing in it says to advertise anything else. Yet the router is clearly offering a path between two providers, turning the small company into an accidental transit network. How can a policy that only says accept for one route end up sending thousands of others?",
  "simple": "A routing policy is a set of rules a router uses to decide which routes to share or keep. You can stack several policies in a row, called a chain. The router checks each route against the first policy, then the next, and so on. The first rule that clearly says yes (accept) or no (reject) ends the checking for that route. If no rule anywhere gives a clear answer, the route drops through to a built-in fallback rule, called the default policy, that each routing protocol has. Think of a nightclub with three bouncers in a line and a manager at the back. The first bouncer who says yes or no decides. If none of them decides, the manager applies the house rule, which might be more generous than you expected.",
  "body": [
   "You can apply more than one routing policy in the same place. When you list several policies, for example `set protocols bgp group ISP export [ NO-BOGONS ADVERTISE-AGG ]`, they form a policy chain. Border Gateway Protocol (BGP) export and import, Open Shortest Path First (OSPF) export, and other protocol policy points all accept chains. Understanding how Junos walks through a chain is essential to predicting what a policy configuration will actually do, and the JNCIA-Junos exam regularly asks you to trace a route through one.",
   "Evaluation follows a fixed order. For each route, Junos starts with the first policy in the chain, reading left to right, and evaluates that policy's terms from top to bottom. As soon as the route matches a term with a terminating action, `accept` or `reject`, the decision is final. Junos does not look at any remaining terms, any remaining policies or the default policy. If a route matches a term whose action is `next policy`, or if it matches no term with a terminating action in this policy, evaluation moves on to the next policy in the chain. A matching term that only modifies attributes, such as setting a metric or adding a community, changes the route and then lets evaluation continue. If the route reaches the end of the last configured policy without a terminating action, it falls through to the protocol's default policy, which makes the final decision.",
   "```\nChain: export [ P1 P2 P3 ] -> then default policy\nRoute A: P1 term 2 says reject   -> rejected, P2/P3/default never checked\nRoute B: no match in P1, P2 term 1 says accept -> accepted\nRoute C: no match in P1, P2 or P3 -> protocol default decides\n```",
   "Because of this, the order of policies in the chain matters just as much as the order of terms inside each policy. A broad `accept` in an early policy prevents any later policy from rejecting the same route, because the later policy never sees it. A common and sensible design is to put the most specific protections first, for example a policy that rejects bogon or private prefixes, then the policies that accept what you want to advertise, and finally an explicit reject-all term or policy so nothing slips through to a permissive default. When you add a policy to an existing chain with `set`, it goes to the end of the list. To place it earlier, use the `insert` command at the protocol or group level, for example `insert export NO-BOGONS before ADVERTISE-AGG` from the `[edit protocols bgp group ISP]` hierarchy, and then confirm the new order with `show`.",
   "Falling through to the default policy is where most surprises come from, so it is worth knowing the defaults for the common protocols. BGP's default import policy accepts all valid BGP routes, and its default export policy advertises active BGP routes to BGP neighbors, subject to the normal internal BGP (IBGP) rules. OSPF's default export policy does not redistribute routes from other sources into OSPF, so you write an export policy to inject them. The defaults are reasonable for a protocol in isolation, but they can produce unwanted results when your own policies leave gaps.",
   "Consider the scenario from the opening. The BGP export chain contains only a policy that accepts the company's aggregate route. The aggregate is accepted by that policy, which is what the engineer intended. Every other active BGP route, including the full set of routes learned from the first Internet service provider (ISP), matches no term, reaches the end of the chain and falls through to BGP's default export policy. That default advertises active BGP routes, so the second ISP receives them. The result is that the company offers transit between two ISPs. Adding a final term with no `from` section and `then reject` to the policy fixes it, because every remaining route now meets a terminating action before it can reach the default.",
   "BGP also lets you apply policies at more than one level: globally under `protocols bgp`, at the group level and at the neighbor level. The most specific level wins, and it replaces rather than adds to the less specific one. A neighbor-level export therefore replaces the group-level export for that neighbor, and the group-level policies are not evaluated for that neighbor at all. This catches people who add a small neighbor-specific policy and suddenly lose all the group's filtering for that peer. If you want both, list all the needed policies in the neighbor's own chain.",
   "Junos also supports policy expressions, which combine policies with logical operators such as AND (`&&`), OR (`||`) and NOT, written inside parentheses. They evaluate differently from a simple chain and are used less often; for daily work and for the exam, chains are the main tool. Whatever you build, verify it. In operational mode, `test policy` runs routes from the routing table through a policy, and `show route advertising-protocol bgp <neighbor>` shows what is really being sent to a peer after commit, which is the definitive answer to what your chain did.",
   "To summarize the decision logic in one sentence: the first terminating action anywhere in the chain wins, non-terminating matches change the route and pass it along, and anything left undecided at the end belongs to the protocol's default policy. If you remember that sentence and end your chains deliberately, policy chains become predictable rather than mysterious."
  ],
  "analogy": "A policy chain is like a row of security checkpoints at an airport followed by a supervisor. Each checkpoint either waves you through, turns you away, or sends you on to the next one. Once any checkpoint makes a firm decision, you never see the later checkpoints. If you walk past every checkpoint without a firm decision, the supervisor applies the airport's standing rule. The analogy stops working in one place: at a real airport, being waved through early does not stop a later guard from stopping you, but in Junos an early accept is final.",
  "terms": [
   [
    "Policy chain",
    "An ordered list of policies applied in one place, evaluated left to right, each policy's terms top to bottom."
   ],
   [
    "Terminating action",
    "An action, `accept` or `reject`, that ends evaluation for the route immediately."
   ],
   [
    "next policy",
    "A flow-control action that skips the rest of the current policy and moves to the next policy in the chain."
   ],
   [
    "Fall-through",
    "What happens when no configured policy makes a terminating decision, so the protocol's default policy decides."
   ],
   [
    "Explicit reject term",
    "A final term with no `from` and `then reject`, used to stop routes from reaching the default policy."
   ],
   [
    "Policy hierarchy in BGP",
    "Policies applied at neighbor level override those at group level, which override global ones; they replace rather than add."
   ]
  ],
  "example": "A company's BGP export chain is `[ AGG-ONLY ]`, which accepts its 198.51.100.0/24 aggregate. A few days later its second ISP notices it is receiving routes from the first ISP through the company. The engineer adds a term with `then reject` at the end of AGG-ONLY, commits, and checks `show route advertising-protocol bgp` toward each provider. Only the aggregate is sent now, because other BGP routes no longer fall through to the default export policy.",
  "mistakes": [
   [
    "A later policy in the chain can override an earlier accept.",
    "Once any term accepts or rejects a route, evaluation stops. Later policies and the default policy never see that route."
   ],
   [
    "If my policy does not mention a route, that route is not advertised.",
    "An unmatched route falls through to the protocol's default policy. For BGP export, that default advertises active BGP routes."
   ],
   [
    "A neighbor-level export policy adds to the group-level policies.",
    "The most specific level replaces the less specific one. The group-level chain is not evaluated for that neighbor."
   ],
   [
    "`set ... export NEWPOL` puts the new policy at the front of the chain.",
    "New entries go to the end of the list. Use `insert ... before` to place a policy earlier."
   ]
  ],
  "tryit": [
   [
    "Your BGP group EXT has `export [ ACCEPT-ALL-STATIC BLOCK-RFC1918 ]`. ACCEPT-ALL-STATIC accepts every static route. A static route to 10.20.0.0/16 exists, and BLOCK-RFC1918 rejects private ranges. A colleague says the private route is safe because BLOCK-RFC1918 is in the chain. Is the colleague right?",
    "No. The first policy accepts the static route to 10.20.0.0/16, and an accept is final, so BLOCK-RFC1918 never evaluates it. Reorder the chain with `insert export BLOCK-RFC1918 before ACCEPT-ALL-STATIC` so the protection runs first."
   ],
   [
    "An engineer adds `set protocols bgp group EXT neighbor 203.0.113.9 export TAG-COMMUNITY` to set a community for one peer. The group already has `export [ NO-BOGONS ADVERTISE-AGG ]`. What changes for that neighbor?",
    "That neighbor now uses only TAG-COMMUNITY, because the neighbor-level export replaces the group-level chain. If TAG-COMMUNITY has no terminating actions, routes fall through to the BGP default and every active BGP route is advertised. The fix is to give the neighbor the full chain, for example `[ NO-BOGONS TAG-COMMUNITY ADVERTISE-AGG ]`, ending in an explicit reject."
   ]
  ],
  "tip": "The first terminating action anywhere in the chain wins; later policies and the default are never consulted for that route. If nothing terminates, the protocol default policy decides, which for BGP export means advertising active BGP routes. End chains with an explicit reject.",
  "check": [
   [
    "In `export [ A B ]`, policy A accepts a route. Does policy B get to reject it?",
    "No. Once a terminating action accepts the route, evaluation stops."
   ],
   [
    "What decides the fate of a route that matches no terminating term in any policy of the chain?",
    "The protocol's default policy."
   ],
   [
    "How can you ensure only intended routes are exported by BGP?",
    "End the chain with an explicit reject term or policy so nothing falls through to the default."
   ],
   [
    "A route matches a term whose only action is `next policy`. What happens?",
    "Evaluation leaves the current policy and continues with the next policy in the chain, or the default policy if it was the last."
   ]
  ]
 },
 {
  "t": "Route filters and match types: exact, orlonger, longer, upto, prefix-length-range; prefix lists",
  "hook": "Marcus works the provider desk at Northfield Fiber. A business customer, Cedar Hill Clinic, owns 203.0.113.0/24 and wants to announce some smaller pieces of it for traffic engineering. Marcus's import policy needs to accept the /24 and its subnets down to a sensible size, and reject everything else, especially anyone else's address space. His first draft uses `orlonger`, and a senior engineer stops him: that would let the clinic announce single /32 host routes, too. Another colleague suggests `longer`, which would block the /24 itself. Each match type sounds similar, and one word changes which routes enter the provider's network. Which one does Marcus actually need?",
  "simple": "Routers keep a list of destinations, each written as an address plus a length, like 192.168.0.0/16. The number after the slash says how big the block is: a smaller number is a bigger block, and a bigger number is a smaller, more specific block inside it. A route filter lets a policy pick out routes by block. First the route has to sit inside the block you name. Then a match type says which sizes count: only the exact block, the block and everything inside it, only the pieces inside it, or pieces within a range of sizes. It is like a mail sorter who first checks the town on an envelope, then checks whether it is addressed to the whole town, a neighborhood or a single house.",
  "body": [
   "Most routing policies need to match specific prefixes. Junos does this with the `route-filter` match condition in the `from` section of a policy term. A route filter pairs a prefix with a match type that describes which routes equal to or inside that prefix should match. The syntax is `from route-filter <prefix>/<length> <match-type>`. Every route filter check has two steps, and keeping them separate in your head prevents most mistakes: first, does the route fall within the filter's prefix; second, does the route's prefix length satisfy the match type.",
   "Using 192.168.0.0/16 as the filter prefix, here is what each match type accepts. `exact` matches only 192.168.0.0/16 itself and nothing more specific. `orlonger` matches 192.168.0.0/16 and any more specific route inside it, such as 192.168.5.0/24 or the host route 192.168.5.1/32. `longer` matches only routes more specific than /16 inside it, but not the /16 itself, so it is the right choice when you want to catch subnets of a block while leaving the block alone. `upto /24` matches routes inside 192.168.0.0/16 with prefix lengths from /16 up to and including /24, so 192.168.0.0/16 and 192.168.7.0/24 match but 192.168.7.128/25 does not. `prefix-length-range /20-/24` matches routes inside the /16 whose lengths are between /20 and /24 inclusive; the /16 itself does not match because its length is outside the range. There is also `through`, which matches a contiguous chain of prefixes from one given prefix to a more specific one, but it is used far less often.",
   "The pairs that exam questions like to contrast are worth stating plainly. `orlonger` includes the filter's own prefix, while `longer` excludes it. `upto` always starts at the filter's own length and ends where you say, while `prefix-length-range` starts and ends where you say. In fact, `orlonger` on a /16 behaves like `upto /32`, and `longer` on a /16 behaves like `prefix-length-range /17-/32`, which can help you check your reasoning.",
   "```\nset policy-options policy-statement FROM-CUST term OK from route-filter 203.0.113.0/24 upto /26\nset policy-options policy-statement FROM-CUST term OK then accept\nset policy-options policy-statement FROM-CUST term REST then reject\n```",
   "Always remember that the route must first fall within the filter's prefix; the match type only checks its length after that. A route to 10.0.0.0/24 never matches `route-filter 192.168.0.0/16 orlonger`, no matter what length it has, because it is not inside 192.168.0.0/16 at all. Likewise, a less specific route such as 192.168.0.0/15 does not match a filter on 192.168.0.0/16, because it covers more than the filter prefix rather than sitting inside it.",
   "When a single term contains several route filters, Junos does not simply try them one by one until something matches. It first finds the route filter whose prefix is the longest match for the route, and then checks only that filter's match type. If that check fails, the route does not match the term, even if a shorter filter in the same term would have matched. For example, with `10.0.0.0/8 orlonger` and `10.1.0.0/16 exact` in the same term, a route to 10.1.1.0/24 is compared against the 10.1.0.0/16 filter, because that is the longest match, fails `exact`, and so does not match the term at all. If you want independent checks, put the filters in separate terms, where each term is evaluated in order on its own.",
   "Prefix lists are named lists of prefixes defined under `policy-options prefix-list`. They are reusable: the same list can be referenced in many routing policies and also in firewall filters, so you maintain the addresses in one place. In a policy, `from prefix-list NAME` matches routes that exactly equal an entry in the list, as though each entry had the `exact` match type. When you need a different match type for every entry, use `from prefix-list-filter NAME orlonger`, or `exact`, `longer` and the others. A handy feature is `apply-path`, which builds a prefix list automatically from other parts of the configuration, for example from all configured Border Gateway Protocol (BGP) neighbor addresses, so the list stays correct when neighbors are added or removed.",
   "```\nset policy-options prefix-list CUSTOMER-NETS 203.0.113.0/24\nset policy-options prefix-list CUSTOMER-NETS 198.51.100.0/24\nset policy-options policy-statement P term 1 from prefix-list-filter CUSTOMER-NETS orlonger\n```",
   "In practice, route filters and prefix lists are how providers enforce what customers may announce, how enterprises keep private and bogon space out of their advertisements, and how engineers select a handful of aggregates for export. Before applying a new filter, you can confirm its effect with `test policy <name> <prefix>` in operational mode, which shows the routes the policy would accept from the current routing table."
  ],
  "analogy": "A route filter works like a delivery driver with a map. First the driver checks whether the address is inside the delivery zone at all; an address in another city is out regardless of anything else. Then the match type decides how detailed the address may be: the whole zone only (exact), the zone or any street or house in it (orlonger), only streets and houses but not the zone itself (longer), or only addresses down to street level (upto). Where it stops working: with several filters in one term, the driver uses only the most detailed map that covers the address, not every map in the van.",
  "terms": [
   [
    "route-filter",
    "A policy match condition pairing a prefix with a match type to select routes equal to or inside that prefix."
   ],
   [
    "exact",
    "Matches only the route equal to the filter's prefix and length."
   ],
   [
    "orlonger",
    "Matches the filter's prefix and any more specific route inside it."
   ],
   [
    "longer",
    "Matches only routes more specific than the filter's prefix, not the prefix itself."
   ],
   [
    "upto",
    "Matches routes inside the prefix with lengths from the prefix's own length up to the stated length."
   ],
   [
    "prefix-length-range",
    "Matches routes inside the prefix whose lengths fall between two stated lengths, inclusive."
   ],
   [
    "Prefix list",
    "A named, reusable list of prefixes, matched exactly with `prefix-list` or with a match type via `prefix-list-filter`."
   ],
   [
    "apply-path",
    "A prefix-list option that builds the list automatically from addresses found elsewhere in the configuration."
   ]
  ],
  "example": "A provider lets a customer announce its 203.0.113.0/24 and any subnets down to /26 for traffic engineering, but nothing smaller. The import policy uses `route-filter 203.0.113.0/24 upto /26` with accept, and a final reject term. The customer's /24, /25s and /26s are accepted, while announcements of /27s or of anyone else's address space are rejected.",
  "mistakes": [
   [
    "`orlonger` and `longer` are the same thing.",
    "`orlonger` includes the filter's own prefix; `longer` matches only more specific routes and excludes the prefix itself."
   ],
   [
    "`upto /24` on a /16 matches only the /24 routes.",
    "`upto` matches every length from the filter's own length (/16) through the stated length (/24), inclusive."
   ],
   [
    "With several route filters in one term, a route matches if any filter matches.",
    "Junos picks the filter with the longest matching prefix and checks only its match type. If that fails, the term does not match."
   ],
   [
    "`from prefix-list NAME` matches the listed prefixes and their subnets.",
    "`prefix-list` matches entries exactly. Use `prefix-list-filter NAME orlonger` to include more specific routes."
   ]
  ],
  "tryit": [
   [
    "You must reject any route more specific than /24 anywhere in the 172.16.0.0/12 block, but allow the /12 itself and anything from /13 to /24. A colleague proposes `route-filter 172.16.0.0/12 prefix-length-range /25-/32` with reject in an early term. Will this work, and is there an alternative?",
    "Yes. That term catches only routes inside 172.16.0.0/12 with lengths /25 through /32, so the /12 and the /13 to /24 routes are unaffected and continue to later terms. An equivalent approach is to accept `route-filter 172.16.0.0/12 upto /24` first and reject the rest afterward."
   ],
   [
    "A term contains `route-filter 10.0.0.0/8 orlonger` and `route-filter 10.5.0.0/16 exact`, followed by `then accept`. Will 10.5.1.0/24 be accepted by this term?",
    "No. The longest matching filter for 10.5.1.0/24 is 10.5.0.0/16, and its match type is `exact`, which fails. Junos does not fall back to the /8 filter in the same term. Put the filters in separate terms if each should be checked independently."
   ]
  ],
  "tip": "Know the difference between orlonger (includes the prefix) and longer (excludes it), and between upto (starts at the prefix length) and prefix-length-range (starts where you say). Multiple route filters in one term use longest match first, then only that filter's match type.",
  "check": [
   [
    "Does 172.16.0.0/12 match `route-filter 172.16.0.0/12 longer`?",
    "No. `longer` matches only more specific routes, not the prefix itself."
   ],
   [
    "Which routes match `route-filter 10.0.0.0/8 prefix-length-range /16-/24`?",
    "Routes inside 10.0.0.0/8 with prefix lengths from /16 through /24."
   ],
   [
    "How do you apply the `orlonger` match type to every entry of a prefix list?",
    "Use `from prefix-list-filter NAME orlonger`."
   ],
   [
    "Does 192.168.8.0/25 match `route-filter 192.168.0.0/16 upto /24`?",
    "No. It is inside the /16, but its length /25 is longer than the /24 limit."
   ]
  ]
 },
 {
  "t": "Testing with `test policy`",
  "hook": "It is 9 p.m. at Riverbend Credit Union, and Elena has a maintenance window to apply a new export policy toward the bank's internet provider. If she gets it wrong, she could leak internal routes to the internet or withdraw the routes that let members reach online banking. She has written the policy carefully, but routing policies are unforgiving: one missing term and the router may advertise far more than intended. Elena would love to see exactly which routes the policy will accept before she attaches it to BGP and commits. Is there a way to ask the router what the policy would do, without letting it touch the live session?",
  "simple": "A routing policy is a list of rules that decides which routes a router shares or keeps. Mistakes can cause outages, so Junos gives you a dry-run command called `test policy`. You give it the name of a policy and a range of addresses. The router takes the routes it already knows in that range, runs each one through your rules, and shows you the ones your rules would let through. Nothing is sent to any neighbor. One quirk matters: if a route reaches the end of your rules without a clear yes or no, the test shows it as allowed. It is like a spell-checker preview: it shows problems before you send the letter, but only as well as its own rules allow.",
  "body": [
   "Routing policies can have wide effects, and a mistake in a route filter or in term order can advertise or block far more than you intended. Junos gives you a way to see what a policy would match before you rely on it: the operational-mode command `test policy`. It is a quick, safe check of policy logic that you can run as often as you like, because it does not change the configuration or affect any routing protocol.",
   "The syntax is `test policy <policy-name> <prefix>`. Junos takes the routes currently in the routing table, inet.0 by default, that fall within the prefix you give, runs each one through the named policy, and displays the routes the policy accepts. To test against every route in the table, use `0.0.0.0/0` as the prefix. To check a narrower set, give a more specific prefix, for example `test policy ADVERTISE-AGG 198.51.100.0/24`, which tests only routes within that block. Because the command works on routes already in the routing table, it is a natural fit for export policies, which operate on routes the device already has. It is less useful for import policies, whose job is to act on routes before they are installed.",
   "```\nuser@R1> test policy ADVERTISE-AGG 0.0.0.0/0\ninet.0: 25 destinations, 27 routes (25 active, 0 holddown, 0 hidden)\n+ = Active Route, - = Last Active, * = Both\n198.51.100.0/24    *[Aggregate/130] 01:12:04\n                       Reject\nPolicy ADVERTISE-AGG: 1 prefix accepted, 24 prefix rejected\n```",
   "Reading the output is straightforward once you know what to look for. The header shows the routing table and its route counts, just like `show route`. Each route listed is one the policy accepted; here the aggregate route 198.51.100.0/24 with its preference of 130. The `Reject` under it is the aggregate route's own next hop, which is normal for an aggregate and has nothing to do with the policy decision. The summary line at the bottom gives the count of accepted and rejected prefixes, which is often the fastest way to spot a policy that matches far too much.",
   "There is one behavior you must remember for the exam and for real work: the default action of `test policy` is accept. When a route passes through all the terms without hitting a terminating action, `test policy` treats it as accepted and shows it. It does not apply the default policy of whatever protocol you will eventually use the policy with, because the test is not tied to any protocol. So if your policy has no final reject term, `test policy` may show many more accepted routes than the protocol will actually advertise, or the reverse, depending on that protocol's default. For example, an Open Shortest Path First (OSPF) export policy without a final reject might show static routes as accepted in the test even though OSPF's own default would not export them. The cleanest approach is to end policies with an explicit terminating term, which also makes the test output match reality.",
   "`test policy` is a check of logic, not a full simulation. It focuses on which routes are accepted, so do not rely on it to show attribute changes such as metric, local preference or community modifications, and it cannot tell you what a BGP (Border Gateway Protocol) neighbor will do with the routes. For those questions, look at the real results after committing. `show route advertising-protocol bgp <neighbor>` shows what is actually being sent to that neighbor, with the attributes as advertised, and `show route receive-protocol bgp <neighbor>` shows what is received from the neighbor before import policy is applied. Comparing the test output with those commands is a solid habit that catches surprises early.",
   "A practical workflow ties this together. First, write or change the policy in configuration mode and commit it. The policy has no effect until it is applied under a protocol, so committing an unapplied policy is harmless. Second, in operational mode, run `test policy` with `0.0.0.0/0` and then with specific prefixes you care about, and confirm that the accepted count and the listed routes are what you expect. Third, apply the policy under the protocol, for example under the BGP group's `export` statement. Using `commit confirmed` for that final step gives you an automatic rollback if the change cuts off your access or breaks peering, and you then confirm with a plain `commit` once everything checks out.",
   "Finally, verify the live result. After the policy is applied and committed, check `show route advertising-protocol bgp <neighbor>` and compare it with what `test policy` predicted. If the two differ, the most common causes are a missing final reject term combined with a protocol default that behaves differently from the test's default accept, or a policy chain where another policy acts on the route before yours does."
  ],
  "analogy": "Using `test policy` is like running a draft letter through a mail-merge preview before printing. The preview shows exactly which recipients would get the letter, so you can spot that you accidentally included the whole address book. But the preview has its own rule: anyone not explicitly excluded shows up in the list, even if the post office would later refuse them. And it does not show how each envelope will look once stamped, just who is on the list, which is why you still check the real mail afterward.",
  "terms": [
   [
    "test policy",
    "An operational command that runs routing table entries through a policy and shows the routes it accepts."
   ],
   [
    "Default accept in test policy",
    "Routes not explicitly rejected by the tested policy are shown as accepted, regardless of any protocol's default policy."
   ],
   [
    "0.0.0.0/0 test prefix",
    "The prefix that makes `test policy` evaluate every route in the routing table."
   ],
   [
    "advertising-protocol",
    "`show route advertising-protocol bgp <neighbor>` shows the routes actually being advertised to a BGP neighbor."
   ],
   [
    "receive-protocol",
    "`show route receive-protocol bgp <neighbor>` shows routes received from a BGP neighbor before import policy."
   ],
   [
    "commit confirmed",
    "A commit that rolls back automatically unless confirmed within a set time, useful when applying risky policy changes."
   ]
  ],
  "example": "Before applying a new BGP export policy, an engineer commits the policy definition without applying it and runs `test policy EXPORT-ISP 0.0.0.0/0`. The summary shows 400 prefixes accepted instead of the expected 2. She realizes the policy lacks a final reject term, adds it, retests to see only the two aggregates, applies the policy with `commit confirmed`, and checks `show route advertising-protocol bgp` toward the provider before confirming.",
  "mistakes": [
   [
    "`test policy` applies the BGP or OSPF default policy to unmatched routes.",
    "It is not tied to any protocol. Its own default is accept, so unmatched routes are shown as accepted."
   ],
   [
    "You must apply the policy to a protocol before you can test it.",
    "The policy only needs to be committed. Testing an unapplied policy is the safe, recommended order."
   ],
   [
    "`test policy` shows everything a BGP neighbor will receive, attributes included.",
    "It checks which routes are accepted. Use `show route advertising-protocol bgp <neighbor>` to see what is actually sent."
   ],
   [
    "`test policy` is the best way to check an import policy against incoming routes.",
    "It runs routes already in the routing table, so it suits export policies. For incoming routes, compare `receive-protocol` with the installed routes."
   ]
  ],
  "tryit": [
   [
    "You run `test policy EXPORT-OSPF 0.0.0.0/0` and see 12 static routes accepted. The policy has one term that accepts two specific static routes and no final reject term. After you apply it as an OSPF export policy, only the two intended routes appear in other routers' OSPF databases. Why do the test and the live result differ?",
    "`test policy` accepts every route that is not explicitly rejected, so the ten unmatched static routes show as accepted in the test. In OSPF, unmatched routes fall through to OSPF's default export policy, which does not export static routes. Adding a final `then reject` term makes the test output match the live behavior."
   ],
   [
    "A teammate wants to skip `test policy` and simply apply the new BGP export policy during the maintenance window, saying `commit confirmed` will protect them. What would you recommend?",
    "Test first. `commit confirmed` only rolls back if you lose access or fail to confirm; it does not stop a leak to the provider during those minutes. Running `test policy` with `0.0.0.0/0` before applying the policy shows unexpected accepted routes with no risk, and `commit confirmed` remains a useful second safety net."
   ]
  ],
  "tip": "`test policy` accepts by default any route the policy does not explicitly reject, regardless of the protocol's default policy. Use `0.0.0.0/0` to test the whole table, and confirm the live result with `show route advertising-protocol bgp`.",
  "check": [
   [
    "What prefix do you give `test policy` to evaluate every route in inet.0?",
    "`0.0.0.0/0`."
   ],
   [
    "A route matches no term in the tested policy. How does `test policy` show it?",
    "As accepted, because the default action of `test policy` is accept."
   ],
   [
    "Which command shows what the router is really advertising to a BGP neighbor after commit?",
    "`show route advertising-protocol bgp <neighbor>`."
   ]
  ]
 },
 {
  "t": "Firewall filters: stateless, term order, match conditions, implicit discard at the end",
  "hook": "Jordan, a junior engineer at Pinecrest Medical Group, applies a new firewall filter to the interface facing the server farm. The filter has one job: allow HTTPS to the patient portal. The commit succeeds, the portal loads, and Jordan heads for lunch. Twenty minutes later the help desk is flooded: the portal server cannot reach its database, software updates fail, and name lookups time out. Nothing in the filter says to block any of that. Jordan reads it again and sees only accept statements. How can a filter that contains nothing but accept terms be dropping so much traffic?",
  "simple": "A firewall filter is a list of rules a Junos device checks for each packet, the small chunks that data travels in. The rules are read from top to bottom, and the first rule that matches decides whether the packet goes through. Two things surprise beginners. First, the filter has no memory: it judges every packet on its own, so if you allow a request to go out, you must also allow the answer to come back. Second, there is an invisible last rule that throws away any packet no earlier rule allowed. It is like a guest list at a door: if your name is not on it, you do not get in, even if nobody wrote that rule down.",
  "body": [
   "Junos firewall filters inspect packets and decide what to do with them. Other vendors call the same feature access control lists (ACLs). Filters are configured under `firewall family <family> filter <name>`, where the family is usually `inet` for Internet Protocol version 4 (IPv4) or `inet6` for IPv6. Once applied to interfaces, they are processed in the Packet Forwarding Engine (PFE) at high speed, so a filter can examine every packet without slowing the device down the way software inspection on the Routing Engine (RE) would.",
   "Firewall filters are stateless. Each packet is examined on its own, with no memory of previous packets or connections. If you allow a client inside your network to open a Transmission Control Protocol (TCP) connection to a server outside, a stateless filter on the inbound direction must also explicitly allow the server's replies, because the filter has no idea a conversation was ever started. The `tcp-established` match condition helps here: it matches TCP packets with the acknowledgment (ACK) or reset (RST) flag set, which is what reply packets and packets in an existing connection look like. This is different from the stateful security policies on SRX Series firewalls, which track sessions and permit return traffic automatically. On the exam, if a question mentions firewall filters, think stateless; if it mentions security policies and zones on an SRX, think stateful.",
   "A filter is made of terms, evaluated in order from top to bottom, just like routing policy terms. Each term has a `from` section with match conditions and a `then` section with actions. The first term that matches and applies a terminating action, such as `accept` or `discard`, decides the packet's fate, and later terms are not checked. That makes term order a design decision: a broad accept placed above a narrow discard means the discard never sees the traffic it was meant to stop.",
   "```\nset firewall family inet filter PROTECT term SSH from source-address 192.0.2.0/24\nset firewall family inet filter PROTECT term SSH from protocol tcp\nset firewall family inet filter PROTECT term SSH from destination-port ssh\nset firewall family inet filter PROTECT term SSH then accept\nset firewall family inet filter PROTECT term ICMP from protocol icmp\nset firewall family inet filter PROTECT term ICMP then accept\n```",
   "The example shows the structure. Term SSH accepts Secure Shell (SSH) only when all three conditions are true: the source is in 192.0.2.0/24, the protocol is TCP, and the destination port is 22, written here by its name `ssh`. Term ICMP accepts all Internet Control Message Protocol (ICMP) traffic, such as ping, from anywhere. Anything else reaches the end of the filter.",
   "Junos offers many match conditions for IPv4. Common ones include `source-address`, `destination-address` (and `address` for either direction), `source-prefix-list` and `destination-prefix-list` to reuse prefix lists, `protocol` (tcp, udp, icmp, ospf and so on), `source-port` and `destination-port` by number or name, `icmp-type`, `tcp-flags`, `tcp-established` and `tcp-initial` (the first packet of a TCP connection), `dscp` for the Differentiated Services Code Point (DSCP) marking, and `fragment-flags`. The logic matches routing policy: different conditions in one term are combined with AND, and multiple values for one condition are combined with OR. So `from protocol tcp` plus `from destination-port [ 22 443 ]` matches TCP packets to port 22 or port 443. A term with no `from` section matches all packets, which is how you write a catch-all final term.",
   "Every filter ends with an implicit term that discards everything not matched earlier. You do not see it in the configuration, but it is always there. In the example above, a Telnet packet from anywhere, or an SSH packet from outside 192.0.2.0/24, matches no term and is silently discarded, with no message sent back to the sender. This default-deny behavior is secure, but it also means that when you apply a filter you must explicitly permit everything you still need, or you can cut off traffic, including your own management session, routing protocol neighbors and Domain Name System (DNS) replies. A common practice is to end filters with an explicit final term that counts or logs what is being dropped, so the implicit discard never happens without you being able to see it in `show firewall`.",
   "This is exactly what happened in the opening scenario. The filter accepted Hypertext Transfer Protocol Secure (HTTPS) traffic to the portal, but database connections, update downloads and DNS replies matched no term and hit the implicit discard. Nothing said block, and nothing needed to: in a Junos filter, anything not permitted is dropped.",
   "Because order matters and new terms are added at the bottom of a filter, use `insert term <new> before term <existing>` to reposition terms, and review the whole filter with `show firewall family inet filter <name>` in configuration mode, or `show | compare`, before committing. Applying a filter to a management path deserves `commit confirmed` so a mistake rolls back on its own."
  ],
  "analogy": "A Junos firewall filter is like a bouncer with a printed guest list but no memory. He reads the list from the top and lets you in at the first line that matches you. If you are not on the list, you are turned away, even though no line says to turn you away. And because he forgets faces instantly, a friend who stepped out for a moment must be on the list too, or they cannot get back in. Unlike a real bouncer, though, he checks every single packet, not just each person once.",
  "terms": [
   [
    "Firewall filter",
    "A Junos ACL configured under `firewall family <family> filter`, made of ordered terms with match conditions and actions."
   ],
   [
    "Stateless filter",
    "A filter that evaluates each packet independently without tracking connections, so return traffic must be explicitly allowed."
   ],
   [
    "Implicit discard",
    "The hidden final action of every Junos firewall filter that silently drops packets not matched by any term."
   ],
   [
    "tcp-established",
    "A match condition for TCP packets with the ACK or RST flag set, typically reply traffic."
   ],
   [
    "tcp-initial",
    "A match condition for the first packet of a TCP connection, which has SYN set and ACK clear."
   ],
   [
    "Match condition",
    "A `from` criterion such as address, protocol or port used to select packets in a filter term."
   ]
  ],
  "example": "An engineer applies a filter permitting only HTTPS to a web server subnet and commits. Suddenly the server cannot resolve names or download updates. The filter is stateless and ends with an implicit discard, so the DNS and update replies coming back are dropped. Adding a term for return traffic, using `tcp-established` for TCP, and a term for DNS responses from the company's resolvers, restores service.",
  "mistakes": [
   [
    "If a filter only contains accept terms, it cannot block anything.",
    "Every filter ends with an implicit discard, so all traffic not explicitly accepted is dropped."
   ],
   [
    "Junos firewall filters remember connections and allow replies automatically.",
    "Filters are stateless. Reply traffic must be permitted, for example with `tcp-established`. Stateful session tracking belongs to SRX security policies."
   ],
   [
    "Multiple values for one condition, like two ports, must both be true.",
    "Values within one condition are ORed. Different conditions in the same term are ANDed."
   ],
   [
    "A new term added with `set` is evaluated first.",
    "New terms go to the bottom of the filter. Use `insert` to move them above existing terms."
   ]
  ],
  "tryit": [
   [
    "Your filter has term 1: `from protocol tcp`, `then accept`, and term 2: `from source-address 198.51.100.0/24`, `from protocol tcp`, `from destination-port 23`, `then discard`. Security asks why Telnet from 198.51.100.0/24 is still getting through. What is wrong and how do you fix it?",
    "Term 1 accepts all TCP, including Telnet, and the first matching terminating action wins, so term 2 never sees those packets. Move term 2 above term 1 with `insert term 2 before term 1`, or rename the terms to reflect the new order."
   ],
   [
    "You apply an input filter on the internet-facing interface that accepts only inbound SSH from a partner network. Staff inside the office can no longer browse websites, though nothing in the filter mentions web traffic. Why?",
    "The replies from web servers arrive inbound on that interface, match no term, and hit the implicit discard. Because the filter is stateless, it does not know staff started those connections. Add a term accepting `tcp-established` traffic, and terms for any other replies needed, such as DNS."
   ]
  ],
  "tip": "Filters are stateless, evaluated top to bottom, and end with an implicit discard. Multiple conditions in one term are ANDed, multiple values in one condition are ORed, and a term with no `from` matches everything.",
  "check": [
   [
    "A packet matches no term in a filter. What happens to it?",
    "It is silently discarded by the implicit final term."
   ],
   [
    "Why might a stateless filter need a `tcp-established` term?",
    "Because it does not track connections, reply packets must be explicitly permitted; `tcp-established` matches them."
   ],
   [
    "A term has `from protocol tcp` and `from destination-port [ 22 443 ]`. Which packets match?",
    "TCP packets to destination port 22 or 443."
   ],
   [
    "What does a term with no `from` section match?",
    "All packets, which makes it useful as a final catch-all term."
   ]
  ]
 },
 {
  "t": "Filter actions: terminating (accept, discard, reject) and non-terminating (count, log, syslog, policer)",
  "hook": "At 2 a.m. the monitoring system at Granite Valley Schools pages Omar: the core router's Routing Engine CPU is pinned near its limit. A quick look shows a flood of pings aimed at the router itself. Omar could simply drop all ICMP, but the operations team relies on ping and traceroute every day, and the vendor's support engineers will ask for them during troubleshooting. He wants to keep a trickle of ICMP, see exactly how much is arriving, and protect the router from the rest. A single filter term can do all of that, if he chooses the right combination of actions. Which actions decide a packet's fate, and which merely observe or shape it?",
  "simple": "When a firewall filter rule matches a packet, the `then` part says what to do. Some actions make the final decision: let it through (accept), quietly throw it away (discard), or throw it away and tell the sender (reject). Other actions do something extra without deciding: count it, write a note about it, or slow down traffic that goes over a speed limit (a policer). You can combine one deciding action with several extra ones. One surprise: if a rule has only extra actions and no decision, Junos lets the packet through. Think of a toll booth: the attendant can wave you through or turn you away, and also count cars and photograph plates while doing it.",
  "body": [
   "The `then` section of a firewall filter term decides what happens to packets that match the term. Actions come in two kinds, and the JNCIA-Junos exam expects you to sort them correctly. Terminating actions decide the packet's fate and stop filter evaluation for that packet. Non-terminating actions, also called action modifiers, do something extra, such as counting, logging or rate limiting, and can be combined with a terminating action in the same term.",
   "The terminating actions you need to know are `accept`, `discard` and `reject`. `accept` lets the packet continue to its destination, or up to the Routing Engine (RE) if it is addressed to the device. `discard` drops the packet silently, sending nothing back. `reject` drops it and sends an Internet Control Message Protocol (ICMP) message to the source; by default this is a destination unreachable message indicating the traffic was administratively prohibited, and you can choose other ICMP message types or a Transmission Control Protocol (TCP) reset instead. Discard is usually the safer choice facing untrusted networks because it gives an attacker less information about what is there and generates no extra traffic from the router. Reject can be friendlier inside a network because applications fail quickly with a clear error instead of waiting for a timeout. `routing-instance` is also terminating: it sends the packet to a forwarding instance for filter-based forwarding.",
   "The main non-terminating actions are these. `count <name>` increments a named counter for matching packets and bytes, which you view with `show firewall filter <name>` or `show firewall`. `log` records packet headers in a buffer on the Routing Engine, which you view with `show firewall log`; the buffer is small and older entries are overwritten over time, so it is a short-term troubleshooting aid rather than a record. `syslog` sends a message about the packet to the system log, so it can go to local files or to a remote syslog server if a file or host is configured for the firewall facility, which makes it the better choice for keeping evidence. `policer <name>` applies a rate limit defined under `firewall policer`, so traffic above a bandwidth limit and burst size is dropped or marked while traffic within the limit continues. Others include `forwarding-class` and `loss-priority` for class of service (CoS), `sample` for traffic sampling, and the flow-control action `next term`.",
   "```\nset firewall policer LIMIT-ICMP if-exceeding bandwidth-limit 1m burst-size-limit 15k\nset firewall policer LIMIT-ICMP then discard\nset firewall family inet filter PROTECT term ICMP from protocol icmp\nset firewall family inet filter PROTECT term ICMP then policer LIMIT-ICMP\nset firewall family inet filter PROTECT term ICMP then count ICMP-IN\nset firewall family inet filter PROTECT term ICMP then accept\nset firewall family inet filter PROTECT term LAST then count DROPPED\nset firewall family inet filter PROTECT term LAST then discard\n```",
   "Reading this example step by step shows how the actions combine. The policer LIMIT-ICMP allows ICMP up to 1 megabit per second with a 15-kilobyte burst and discards anything beyond that. Term ICMP matches every ICMP packet, runs it through the policer, counts it in the ICMP-IN counter, and accepts whatever the policer did not drop. Term LAST has no `from` section, so it matches everything else, counts it as DROPPED, and discards it. The values here are only an illustration; real limits depend on the network.",
   "An important rule follows from the design: if a term has only non-terminating actions and no terminating action, Junos treats the term as though it also said `accept`. So a term with only `count WEB` will count and accept the packet, not pass it on to later terms. This catches people who add a counting term near the top of a filter, intending only to measure traffic, and accidentally accept everything it matches, bypassing the discard terms below. If you want to count a packet and still let later terms decide, add `next term` explicitly, which tells Junos to continue to the following term after the modifiers run.",
   "Counters and logs are your window into what a filter is doing. When a filter seems to block the wrong thing, check which term's counter is increasing with `show firewall filter <name>` while you reproduce the problem. Use `clear firewall filter <name>` to reset the counters before a test so the numbers you see come only from your test. The final `count DROPPED` term above is worth copying into every filter, because it makes the normally invisible implicit discard visible and tells you right away when legitimate traffic is being dropped.",
   "Choosing between the logging actions is a common exam distinction. Use `log` when you want a quick look at recent packet headers on the device itself, and `syslog` when the information must be kept, searched later or sent to a central server. Both are non-terminating, so pair them with `accept` or `discard` to make your intent clear rather than relying on the implied accept."
  ],
  "analogy": "Think of a filter term's actions like a highway checkpoint. The officer's decision is the terminating action: wave the car on (accept), quietly send it back with no explanation (discard), or send it back with a written notice (reject). Meanwhile, a clicker counts cars (count), a camera takes snapshots kept for a short time (log), a report goes to headquarters (syslog), and a ramp meter holds back cars when too many arrive at once (policer). The analogy breaks in one spot: if the officer forgets to decide, Junos waves the car through.",
  "terms": [
   [
    "accept",
    "A terminating action that permits the packet."
   ],
   [
    "discard",
    "A terminating action that drops the packet silently."
   ],
   [
    "reject",
    "A terminating action that drops the packet and sends an ICMP unreachable (or TCP reset) to the source."
   ],
   [
    "count",
    "A non-terminating action that increments a named packet and byte counter."
   ],
   [
    "policer",
    "A non-terminating action that rate-limits matching traffic using a policer defined under `firewall policer`."
   ],
   [
    "log vs syslog",
    "`log` stores packet headers in a Routing Engine buffer for `show firewall log`; `syslog` writes to the system log."
   ],
   [
    "next term",
    "A flow-control action that continues evaluation with the following term instead of the implied accept."
   ]
  ],
  "example": "A router's CPU spikes whenever someone floods it with pings. The engineer adds a term to its loopback filter that matches ICMP, applies a policer limiting it to a small rate, counts it and accepts it. Normal troubleshooting pings still work, `show firewall filter` shows how much ICMP is arriving, and the flood no longer overwhelms the Routing Engine.",
  "mistakes": [
   [
    "A term with only `count` just counts and lets later terms decide.",
    "A term with no terminating action implies accept. Add `next term` if you want evaluation to continue."
   ],
   [
    "Discard and reject are the same.",
    "Discard is silent. Reject also sends an ICMP unreachable or TCP reset back to the source."
   ],
   [
    "`log` sends entries to the remote syslog server.",
    "`log` keeps headers in a small local buffer viewed with `show firewall log`. `syslog` writes to the system log, which can be sent to a remote server."
   ],
   [
    "A policer is a terminating action.",
    "A policer is a non-terminating modifier. Traffic within the limit continues to the term's terminating action."
   ]
  ],
  "tryit": [
   [
    "You add a new first term to a filter with `then count ALL-TRAFFIC` and no `from` section, hoping to measure total traffic. After commit, traffic that the later discard terms used to block is now reaching the network. What happened and how do you fix it?",
    "A term with only non-terminating actions implies accept, and with no `from` it matches every packet, so everything is counted and accepted before the discard terms run. Add `then next term` to the counting term so evaluation continues, or move the counting into the individual terms."
   ],
   [
    "A filter on an internet-facing interface blocks a range of scanning sources. Your manager asks whether to use `reject` or `discard`, and also wants a lasting record of the blocked packets on the central log server. What do you recommend?",
    "Use `discard`, because it sends nothing back, gives scanners less information and creates no extra traffic. Add `syslog` (not `log`) with a firewall facility destination configured, because `log` keeps only a small local buffer."
   ]
  ],
  "tip": "A term with only non-terminating actions implicitly accepts the packet. Discard is silent; reject sends ICMP back. Log goes to a local buffer (`show firewall log`); syslog goes to the system log. Policers rate-limit but do not by themselves end evaluation.",
  "check": [
   [
    "A term matches a packet and has only `then count WEB`. What happens to the packet?",
    "It is counted and accepted, because a term with no terminating action implies accept."
   ],
   [
    "What is the difference between discard and reject?",
    "Discard drops silently; reject drops and sends an ICMP unreachable or TCP reset to the sender."
   ],
   [
    "Where do you view packets recorded by the `log` action?",
    "With `show firewall log`."
   ],
   [
    "How do you reset a filter's counters before a test?",
    "Use `clear firewall filter <name>`."
   ]
  ]
 },
 {
  "t": "Applying filters to interfaces (input/output) and to lo0 to protect the RE",
  "hook": "Sofia manages the edge routers for Bayside Water Utility. The security team's latest scan shows thousands of SSH login attempts against the routers from addresses all over the internet, arriving on every interface: the two provider links, the office uplink, even the link to the treatment plant. Writing and maintaining a separate filter for every interface would be tedious and easy to get wrong. Worse, Sofia knows that a single missing line in a protection filter could drop her own SSH session or tear down the routing protocols that keep the plant connected. Is there one place she can apply a filter that protects the router from all directions at once, and how does she apply it without locking herself out?",
  "simple": "A firewall filter does nothing until you attach it to an interface, which is a port or connection on the router. You also choose a direction: incoming (input) or outgoing (output). Traffic passing through the router to somewhere else is checked by filters on the interfaces it uses. Traffic addressed to the router itself, like someone logging in to manage it, is handled by the router's brain, called the Routing Engine. Junos has a special virtual interface called lo0, the loopback. A filter on lo0 input checks everything aimed at the router's brain, no matter which port it came through. It is like putting one guard at the office door instead of at every entrance to the building.",
  "body": [
   "A firewall filter does nothing until you apply it. You apply filters to a logical interface, the unit, under the protocol family, and you choose a direction. `input` filters packets arriving on the interface; `output` filters packets leaving it. You can apply one input and one output filter per family on an interface, or use `input-list` and `output-list` to apply several filters in sequence, which lets you combine a shared common filter with an interface-specific one.",
   "```\nset interfaces ge-0/0/0 unit 0 family inet filter input FROM-INTERNET\nset interfaces ge-0/0/1 unit 0 family inet filter output TO-SERVERS\nset interfaces lo0 unit 0 family inet filter input PROTECT-RE\n```",
   "Choose the direction by thinking about where traffic comes from and where you want to stop it. To stop unwanted traffic entering your network from the internet, apply an input filter on the internet-facing interface, which drops it as early as possible, before the device spends effort routing it. To control what reaches a particular server segment regardless of which interface it came in on, an output filter on the interface toward that segment is often simpler, because every path to those servers leaves through that one interface. Remember that a filter is stateless, so a filter in one direction may need terms for the replies of traffic you initiated in the other direction.",
   "The loopback interface, lo0, has a special role. Traffic destined to the device itself is handled by the Routing Engine (RE), the control-plane component that runs routing protocols and management services. That host-bound traffic includes Secure Shell (SSH), Simple Network Management Protocol (SNMP), Network Time Protocol (NTP), Border Gateway Protocol (BGP), Open Shortest Path First (OSPF), ping, and replies to queries the device makes, such as Domain Name System (DNS) responses. It reaches the RE no matter which physical interface it arrived on. An input filter on lo0 is applied to all of that host-bound traffic from every interface, so one filter protects the control plane. It does not affect transit traffic that the device merely forwards between other interfaces. This makes an lo0 input filter the standard way to protect the RE from unauthorized access and floods.",
   "A good lo0 filter permits only what the device needs, from only the sources that need it. Typical terms allow SSH from management networks, SNMP from monitoring servers, NTP from the time servers, BGP from configured neighbors (a prefix list built with `apply-path` can list them automatically), OSPF and Bidirectional Forwarding Detection (BFD) from the internal network, rate-limited Internet Control Message Protocol (ICMP), DNS and other replies the device relies on, and then a final term that counts and discards everything else. Because every filter ends with an implicit discard, forgetting a term breaks that function: forget OSPF and your adjacencies drop, forget NTP replies and the clock stops synchronizing, forget BGP and your peerings time out.",
   "```\nset policy-options prefix-list BGP-PEERS apply-path \"protocols bgp group <*> neighbor <*>\"\nset firewall family inet filter PROTECT-RE term BGP from source-prefix-list BGP-PEERS\nset firewall family inet filter PROTECT-RE term BGP from protocol tcp\nset firewall family inet filter PROTECT-RE term BGP from port bgp\nset firewall family inet filter PROTECT-RE term BGP then accept\n```",
   "Applying an lo0 filter is a classic way to lock yourself out, so use `commit confirmed 5`. If your SSH session dies because the filter is wrong, the device automatically rolls back to the previous configuration after five minutes. If everything still works, run `commit` again within that time to make the change permanent. Afterwards, verify with `show firewall filter PROTECT-RE` to see the counters for each term, and with `show interfaces lo0 detail` or `show configuration interfaces lo0` to confirm the filter is applied. Watch the final discard counter for a few minutes; if it climbs steadily, look at what is being dropped before you assume it is all unwanted.",
   "Filters can also be applied to Internet Protocol version 6 (IPv6) traffic with `family inet6`, and an Internet Protocol version 4 (IPv4) filter, configured under `family inet`, never inspects IPv6 packets. If the device is reachable over IPv6, protect lo0 for both families, or an attacker can simply reach the management services over the unprotected family.",
   "In summary, input and output filters on physical interfaces control traffic entering and leaving the device, including transit traffic, while an input filter on lo0 is the single place to protect the RE from host-bound traffic arriving on any interface. Build the lo0 filter from an inventory of every service the router actually uses, end it with a counted discard, and apply it with `commit confirmed`."
  ],
  "analogy": "Think of the router as an office building. Filters on the doors (physical interfaces) control everyone walking in or out, including couriers just passing through the lobby to another building. The lo0 filter is the receptionist outside the executive office: it checks only people who want to see the executives (the RE), and it does not matter which door they used to enter the building. The analogy has a limit: couriers passing through never meet the receptionist at all, just as transit traffic never touches the lo0 filter.",
  "terms": [
   [
    "Input filter",
    "A filter applied to packets arriving on an interface."
   ],
   [
    "Output filter",
    "A filter applied to packets leaving an interface."
   ],
   [
    "input-list / output-list",
    "Statements that apply several filters in sequence in one direction on an interface."
   ],
   [
    "lo0 filter",
    "An input filter on the loopback interface that inspects all traffic destined to the Routing Engine from any interface."
   ],
   [
    "Host-bound traffic",
    "Packets addressed to the device itself, such as management and routing protocol traffic, processed by the RE."
   ],
   [
    "Transit traffic",
    "Packets the device forwards between interfaces without processing them itself; an lo0 filter does not inspect them."
   ]
  ],
  "example": "A security team wants to stop SSH brute-force attempts reaching a router from the internet. The engineer creates PROTECT-RE allowing SSH only from the management prefix list, BGP from peers, OSPF, NTP and limited ICMP, with a final count-and-discard term. She applies it to lo0 input with `commit confirmed 5`, verifies her session and the BGP sessions remain up, checks the counters with `show firewall filter PROTECT-RE`, then commits again.",
  "mistakes": [
   [
    "An input filter on lo0 also filters traffic passing through the router.",
    "lo0 input applies only to host-bound traffic destined to the RE. Transit traffic needs filters on the physical interfaces."
   ],
   [
    "You need a protection filter on every physical interface to protect the RE.",
    "One lo0 input filter covers host-bound traffic arriving on all interfaces."
   ],
   [
    "An lo0 filter only needs to permit management protocols like SSH.",
    "Routing protocols, NTP, DNS replies and anything else the RE uses must also be permitted, or the implicit discard breaks them."
   ],
   [
    "A `family inet` filter on lo0 protects the router over IPv6 too.",
    "IPv4 filters never inspect IPv6 packets. Apply a `family inet6` filter as well."
   ]
  ],
  "tryit": [
   [
    "You need to stop all hosts on the guest Wi-Fi segment, which connects on ge-0/0/3, from reaching the finance server segment on ge-0/0/5, but guests must still reach the internet. Guests should also be unable to SSH to the router itself. Where do you apply filters?",
    "Apply an input filter on ge-0/0/3 (or an output filter on ge-0/0/5) that discards guest traffic to the finance subnet, because that is transit traffic. For SSH to the router, make sure the lo0 input filter permits SSH only from the management network, which covers guests on every interface."
   ],
   [
    "After applying a new lo0 filter with `commit confirmed 10`, your SSH session works, but two minutes later the OSPF neighbors on all interfaces go down. What do you do?",
    "Do not confirm the commit. Either let the timer expire so Junos rolls back, or roll back yourself with `rollback 1` and commit. Then add a term permitting OSPF from the internal network to the filter before applying it again."
   ]
  ],
  "tip": "A filter on lo0 input protects the Routing Engine from traffic arriving on any interface but does not filter transit traffic. Always include routing protocols and management services, protect both inet and inet6, and use `commit confirmed`.",
  "check": [
   [
    "Does an input filter on lo0 block transit traffic passing through the router?",
    "No. It only applies to traffic destined to the Routing Engine."
   ],
   [
    "You apply a new lo0 filter and all OSPF neighbors go down. What is the likely cause?",
    "The filter lacks a term permitting OSPF, so OSPF packets hit the implicit discard."
   ],
   [
    "Why use `commit confirmed` when applying an lo0 filter?",
    "If the filter blocks your management access, the configuration rolls back automatically after the timer."
   ],
   [
    "How many filters can be applied in one direction for one family on an interface without using a list?",
    "One. Use `input-list` or `output-list` to apply several in sequence."
   ]
  ]
 },
 {
  "t": "Unicast reverse path forwarding (uRPF) checks: strict and loose",
  "hook": "Kenji runs the network for Summit Regional ISP, a small provider serving homes and businesses in three valleys. One evening a partner network reports a flood coming from Summit's address space, but the packets carry source addresses that belong to neither Summit nor its customers. Someone on a customer connection is forging the source of every packet, and the flood is being sent onward as if Summit vouched for it. Kenji wants his edge routers to refuse packets whose source address could not possibly have come from the interface they arrived on. But two of his business customers are connected to two providers, and their traffic does not always return the way it left. How can he block forged sources without dropping those customers' legitimate traffic?",
  "simple": "Every packet carries two addresses: where it is going and where it says it came from. Attackers can lie about the second one, the source, to hide or to aim replies at a victim. Unicast reverse path forwarding (uRPF) is a router feature that checks whether a packet's claimed source makes sense. In strict mode, the router asks: if I sent something back to this source, would it go out the same port this packet came in on? If not, the packet is dropped. Loose mode only asks: do I know any way back to this source at all? It is like a mailroom that checks return addresses: strict compares the return address to the delivery route, loose only checks that the address exists.",
  "body": [
   "Attackers often forge, or spoof, the source address of packets, for example in denial-of-service (DoS) floods, to hide their origin or to make replies hit a victim. Unicast reverse path forwarding (uRPF) is a simple and efficient defense. Normally a router looks only at a packet's destination address to decide where to send it. With uRPF enabled on an interface, the router also looks up the packet's source address in its forwarding table and asks whether that source is plausible for the packet. Packets that fail the check are dropped. This supports the widely recommended practice of filtering spoofed traffic at the network edge, close to where it enters.",
   "In strict mode, the source address must be reachable through the same interface the packet arrived on. In other words, if the router were to send a reply to that source, it would use this interface. A packet arriving on a customer interface with a source address from some other network fails, because the route to that source points elsewhere. Strict mode is very effective on single-homed customer or access interfaces, where traffic always comes back the way it went, because only the customer's own addresses can pass.",
   "In loose mode, the source address only needs to have a route in the forwarding table through any interface. Loose mode does not verify the arrival interface, so it catches fewer spoofed packets, mainly those using sources the router has no route for at all, such as unallocated or unrouted address space. It is useful where routing is asymmetric, for example on links to multiple providers, where strict mode would drop legitimate traffic. Keep in mind that a default route can make almost any source look reachable, which weakens loose mode considerably on a router that relies on a default route.",
   "Asymmetric routing is the main risk with strict mode. If traffic from a network arrives on one link but the router's best route back to that network uses another link, strict uRPF drops valid traffic, and users see connections that partly work or fail without an obvious cause. This is common with multihomed customers and with Border Gateway Protocol (BGP) designs where inbound and outbound paths are engineered differently. By default Junos compares against active paths only. The option `set routing-options forwarding-table unicast-reverse-path feasible-paths` makes the check consider all feasible paths, such as alternate routes learned from BGP, which reduces false drops in multihomed designs while keeping much of strict mode's protection.",
   "Configuration is per interface and per address family. You enable it under the family on the logical unit, and the mode defaults to strict:",
   "```\nset interfaces ge-0/0/1 unit 0 family inet rpf-check\nset interfaces ge-0/0/2 unit 0 family inet rpf-check mode loose\nset interfaces ge-0/0/1 unit 0 family inet rpf-check fail-filter RPF-EXCEPTIONS\n```",
   "The first line enables strict mode, the default. The second enables loose mode. The `fail-filter` option names a firewall filter that is applied only to packets that fail the check, letting you make exceptions, such as accepting Dynamic Host Configuration Protocol (DHCP) requests that legitimately use a source of 0.0.0.0 before a client has an address, or counting and logging failures before dropping them so you can see what is being blocked. Packets that pass the check are not affected by the fail filter at all.",
   "Monitoring tells you whether uRPF is doing its job or harming legitimate users. Detailed interface output such as `show interfaces ge-0/0/1.0 extensive` shows RPF failure counters, which tell you how much traffic is being dropped by the check. A steady trickle on a customer interface may be spoofed traffic worth investigating; a sudden jump after a routing change often means asymmetric routing is causing false drops. Platform support and exact behavior can vary, so check the documentation for your hardware before relying on a particular option.",
   "To pick the right mode on the exam or in practice, ask one question about the interface: does traffic always return the same way it arrived? If yes, as on a single-homed customer link, use strict mode. If not, as on multihomed or provider-facing links, use loose mode or strict mode with feasible paths, and use a fail filter for known exceptions. Remember too that uRPF complements firewall filters rather than replacing them: uRPF judges whether a source address is believable, while filters decide which traffic is allowed at all."
  ],
  "analogy": "uRPF is like a gated community guard checking the sticker on an incoming car. In strict mode, the guard checks that the sticker belongs to this particular gate's neighborhood; a resident's car entering through the wrong gate is turned away. In loose mode, the guard only checks that the sticker is from any neighborhood in town. The analogy shows the trade-off: strict stops more impostors but annoys residents who use different gates coming and going, which is exactly what asymmetric routing does.",
  "terms": [
   [
    "uRPF",
    "Unicast reverse path forwarding, a check that validates a packet's source address against the forwarding table to drop spoofed traffic."
   ],
   [
    "Strict mode",
    "The source must be reachable via the same interface the packet arrived on; the Junos default for `rpf-check`."
   ],
   [
    "Loose mode",
    "The source only needs a route in the forwarding table via any interface."
   ],
   [
    "fail-filter",
    "A firewall filter applied only to packets that fail the uRPF check, used for exceptions or logging."
   ],
   [
    "Feasible paths",
    "An option that lets uRPF consider all valid alternate paths, not just active ones, to handle asymmetric routing."
   ],
   [
    "Asymmetric routing",
    "Traffic to and from a network uses different paths, which can cause strict uRPF to drop valid packets."
   ]
  ],
  "example": "An ISP enables strict `rpf-check` on each single-homed customer interface. A compromised customer device starts sending floods with random source addresses. Because those sources do not route back through that customer's interface, the router drops them, and the RPF failure counters in `show interfaces extensive` reveal which customer needs to be contacted. On its two upstream provider links, the ISP uses loose mode instead to avoid dropping legitimate asymmetric traffic.",
  "mistakes": [
   [
    "Loose mode is the safer default because it blocks more spoofed traffic.",
    "Strict mode blocks more spoofing; loose mode only blocks sources with no route at all. Strict is the Junos default for `rpf-check`."
   ],
   [
    "Strict mode is always best, even on multihomed links.",
    "With asymmetric routing, strict mode drops legitimate traffic. Use loose mode or the feasible-paths option there."
   ],
   [
    "Loose mode is very effective on a router with a default route.",
    "A default route makes nearly any source appear reachable, so loose mode catches very little."
   ],
   [
    "The fail-filter inspects all traffic on the interface.",
    "It applies only to packets that fail the uRPF check, for exceptions like DHCP or for counting and logging."
   ]
  ],
  "tryit": [
   [
    "A business customer connects to your router on ge-0/0/4 and also to another provider. You see that some of their traffic to you arrives on ge-0/0/4 with source addresses your router reaches through a different path, based on how the customer engineers its routing. You want anti-spoofing on this interface. Which uRPF approach fits?",
    "Avoid plain strict mode, because asymmetric routing would cause it to drop valid packets. Use loose mode, or keep strict mode and enable `unicast-reverse-path feasible-paths` so alternate BGP paths through ge-0/0/4 count. Watch the RPF failure counters after the change."
   ],
   [
    "After enabling strict uRPF on a DHCP-served access interface, new clients cannot get addresses, though existing clients work. Why, and how do you fix it without disabling uRPF?",
    "New DHCP clients send requests from 0.0.0.0, which has no route back through that interface, so they fail the strict check. Configure a `fail-filter` that accepts DHCP traffic from 0.0.0.0 and discards other failures."
   ]
  ],
  "tip": "Strict mode checks the arrival interface and suits single-homed edges; loose mode only checks that a route exists and suits asymmetric or multihomed links. Asymmetric routing plus strict mode drops legitimate traffic. Strict is the default for `rpf-check`.",
  "check": [
   [
    "Why can strict uRPF drop legitimate traffic on a multihomed link?",
    "With asymmetric routing, the best route back to the source may use a different interface than the one the packet arrived on."
   ],
   [
    "Which Junos statement enables loose uRPF on an interface?",
    "`set interfaces <if> unit <n> family inet rpf-check mode loose`."
   ],
   [
    "What is the purpose of `fail-filter`?",
    "To apply a filter to packets that fail the check, for exceptions such as DHCP or for counting and logging."
   ],
   [
    "What mode does `rpf-check` use if you do not specify one?",
    "Strict mode."
   ]
  ]
 }
], {"reviewed":"2026-10-07"});
