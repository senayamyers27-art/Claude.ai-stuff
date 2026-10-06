/* Lessons for Cisco CCNP Enterprise core exam (ENCOR) (350-401 v1.2): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("ccnp-encor", [
 {
  "t": "Enterprise design: two-tier (collapsed core) and three-tier campus, fabric/spine-leaf, cloud vs on-premises",
  "hook": "Priya, the lead network engineer at Lakeside Polytechnic, has a whiteboard covered in boxes and lines. The college runs everything from one building today, with a pair of switches doing all the heavy lifting. Next fall two new buildings open across the quad, the research group wants a small data center for its servers, and the finance office keeps asking whether it would be cheaper to move it all to the cloud. Her manager wants a design proposal by Friday. If she connects every new building to every other building, the cabling bill and the troubleshooting will grow with every addition. If she over-builds, she wastes money the college does not have. Which design fits each part of the campus, and how does she defend that choice?",
  "simple": "Think of a network design as the floor plan for how switches connect. In a big campus, engineers stack switches in layers. The bottom layer is where people plug in. The middle layer gathers those connections together and applies rules. The top layer is a fast highway that links whole buildings. A small site can merge the top two layers into one pair of switches to save money; that is called a collapsed core. Data centers, where servers talk to each other constantly, use a different pattern: every edge switch connects to every central switch, so any server is the same short distance from any other. Finally, a company can own its equipment on site or rent computing from a cloud provider, much like owning a car versus using a rental service.",
  "body": [
   "Enterprise network design is about arranging switches and routers into layers so the network is predictable, easy to grow and quick to recover from failures. Cisco's classic campus model uses three logical layers: access, distribution and core. ENCOR expects you to know what each layer does, when you can merge layers, and how data center and cloud designs differ from the campus. The layered model exists because each layer has a narrow job, which makes failures easier to contain and the design easier to repeat building after building.",
   "The access layer is where users, phones, access points and printers connect. It provides port density, Power over Ethernet (PoE), virtual LAN (VLAN) assignment and edge security features such as port security, 802.1X authentication and DHCP (Dynamic Host Configuration Protocol) snooping. If you walk into a wiring closet and see stacks of 48-port switches with phone and laptop cables plugged in, you are looking at the access layer. These switches uplink, ideally to two distribution switches, so the loss of one uplink or one distribution switch does not isolate users.",
   "The distribution layer aggregates many access switches. It is the natural boundary between Layer 2 and Layer 3: it usually hosts the default gateways, protected by a first hop redundancy protocol (FHRP), summarizes routes toward the core and applies policy such as access control lists (ACLs) and quality of service (QoS). Because each distribution pair serves one building or one zone, it forms a distribution block, a repeatable module you can copy when you add a building. Route summarization at this boundary also limits how far a failure ripples: a flapping subnet in one block does not force every router in the campus to recalculate.",
   "The core layer is the high-speed backbone that connects distribution blocks, the data center and the WAN edge. The core should do as little as possible other than forward packets quickly and converge fast, so you avoid heavy policy there. A good core is boring by design: redundant, fully routed links, no access ports, no complex filtering. Its value is that every distribution block needs only a couple of uplinks to the core rather than links to every other block.",
   "That is the reason a three-tier design makes sense for a large campus with several buildings, where many distribution blocks need a common backbone. Without a core, every distribution pair would need links to every other pair, which grows as a full mesh and becomes hard to manage. With four blocks you might cope, but with ten the number of links, fiber runs and routing adjacencies becomes unmanageable. A two-tier design, also called a collapsed core, merges the core and distribution functions into one pair of switches. It fits a single building or a smaller campus, costs less and has fewer hops. The trade-off is scale: when you add more buildings, a dedicated core becomes worth it.",
   "Modern campus designs push Layer 3 closer to the edge. In a routed access design, the access switches run a routing protocol toward the distribution layer, so there are no Layer 2 loops between access and distribution, spanning tree is confined to each access switch, and convergence depends on routing rather than spanning tree timers. Both uplinks forward at once through equal-cost routing instead of one being blocked by spanning tree. The trade-off is that a VLAN can no longer span several access switches, so designs that require the same subnet in many closets either accept that limit or move to an overlay fabric such as SD-Access.",
   "Data centers usually use a spine-leaf (Clos) fabric instead. Every leaf switch connects to every spine switch, and spines do not connect to each other, nor do leaves. Servers attach to leaves. Any server is always exactly two switch hops from a server on another leaf (leaf to spine to leaf), which gives predictable latency and lots of equal-cost paths for east-west traffic between servers. This matters because modern applications are split into many tiers and services that talk to each other far more than they talk to users. You scale bandwidth by adding spines and scale ports by adding leaves. Overlays such as VXLAN (Virtual Extensible LAN) usually run on top of a routed spine-leaf underlay, letting you place workloads anywhere while the underlay stays a simple routed network.",
   "Finally, ENCOR asks you to compare on-premises and cloud deployments. On-premises means you buy, house and operate the hardware: you get full control, predictable costs after purchase and data locality, but you carry capital expense, capacity planning and hardware refresh. Cloud, whether infrastructure as a service (IaaS), platform as a service (PaaS) or software as a service (SaaS), shifts spending to operating expense, lets you scale up and down quickly and removes hardware management, but adds dependence on WAN or internet connectivity, less control over the underlying platform, and ongoing usage-based cost. Many enterprises end up hybrid, with some workloads in each, and the network design must then include secure, resilient connectivity between the campus and the cloud provider."
  ],
  "analogy": "A three-tier campus is like a city road system. Neighborhood streets (access) feed into local avenues (distribution), and avenues join a highway (core) that links districts. You would never build a direct road from every avenue to every other avenue; you connect each one to the highway. A small town skips the highway and lets one main road do both jobs, which is the collapsed core. A spine-leaf data center is different: it is more like a set of buildings where every building has a sky bridge to every central tower, so every trip is the same length.",
  "terms": [
   [
    "Access layer",
    "The layer where endpoints connect; provides port density, PoE, VLAN assignment and edge security."
   ],
   [
    "Distribution layer",
    "Aggregates access switches, usually hosts default gateways, and applies policy and route summarization."
   ],
   [
    "Core layer",
    "The high-speed backbone joining distribution blocks, designed for fast forwarding and fast convergence."
   ],
   [
    "Collapsed core",
    "A two-tier design where one pair of switches performs both core and distribution roles."
   ],
   [
    "Routed access",
    "A design where access switches route toward distribution, removing Layer 2 loops between the layers."
   ],
   [
    "Spine-leaf",
    "A data center topology where every leaf connects to every spine, giving equal-cost, two-hop paths between servers."
   ],
   [
    "East-west traffic",
    "Traffic between servers inside a data center, as opposed to north-south traffic entering or leaving it."
   ]
  ],
  "example": "A company with one office building uses a pair of Catalyst switches as a collapsed core, with access switches in each wiring closet uplinked to both. When it opens two more buildings on the same campus, it adds a dedicated core pair so each building's distribution pair needs only two uplinks to the core instead of links to every other building.",
  "mistakes": [
   [
    "Spine switches should connect to each other for redundancy.",
    "In a spine-leaf fabric, spines never connect to spines and leaves never connect to leaves. Redundancy comes from every leaf connecting to every spine."
   ],
   [
    "Every campus needs three tiers.",
    "A single building or small campus is usually best served by a two-tier collapsed core. A dedicated core pays off when many distribution blocks need a common backbone."
   ],
   [
    "The core is a good place for ACLs and QoS classification.",
    "Heavy policy belongs at the access and distribution layers. The core should forward quickly and converge fast with as little processing as possible."
   ],
   [
    "Moving to the cloud removes all network design work.",
    "Cloud shifts hardware management to the provider, but you still need reliable, secure connectivity to it, and you accept less control and ongoing usage costs."
   ]
  ],
  "tryit": [
   [
    "A regional clinic has one two-story building with four wiring closets and about 200 users. The budget is tight, and there are no plans to expand. A vendor proposes separate core and distribution switch pairs. What design would you recommend, and why?",
    "A two-tier collapsed core. One pair of switches can act as both distribution and core for four closets, which reduces cost and hop count. A dedicated core adds value only when there are many distribution blocks to interconnect."
   ],
   [
    "A software team is building a new on-site server room for microservices that talk to each other constantly. They want consistent latency between any two servers and the ability to add capacity in small steps. Which topology fits?",
    "Spine-leaf. Every server is two hops from any server on another leaf, there are many equal-cost paths for east-west traffic, and you add leaves for ports or spines for bandwidth."
   ]
  ],
  "tip": "If a question describes predictable latency for east-west server traffic and every leaf connecting to every spine, the answer is spine-leaf. If it describes a small site merging core and distribution, it is a two-tier collapsed core.",
  "check": [
   [
    "Why does a large campus add a dedicated core layer instead of connecting every distribution pair directly?",
    "Directly meshing distribution blocks grows as a full mesh and becomes costly and hard to manage; a core gives every block a small, fixed number of uplinks to a common backbone."
   ],
   [
    "In a spine-leaf fabric, how many switch hops separate servers on two different leaves?",
    "Two hops across the fabric, leaf to spine to leaf, because every leaf connects to every spine."
   ],
   [
    "Name one advantage and one drawback of public cloud compared with on-premises.",
    "Advantage: fast elastic scaling with operating rather than capital expense. Drawback: less control over the platform and dependence on connectivity, plus ongoing usage costs."
   ],
   [
    "What is the main trade-off of a routed access design?",
    "It removes Layer 2 loops and speeds convergence, but a VLAN can no longer span multiple access switches."
   ]
  ]
 },
 {
  "t": "High availability: redundancy, first hop redundancy protocols, stateful switchover (SSO)",
  "hook": "At 2:10 a.m. your phone buzzes. The supervisor engine in the main distribution chassis at Northfield Regional Hospital has failed. You brace for the flood of calls from the nursing stations, but none come. The standby supervisor took over, the line cards kept forwarding, and the only sign is a log message and a slightly nervous monitoring dashboard. Two months ago, at the clinic across town, a similar failure of a single gateway router left every PC on two floors unable to reach anything for half an hour, even though a second router sat right next to it, powered on and healthy. Why did one network shrug off a failure while the other went dark, and what made the difference?",
  "simple": "High availability means building a network so that when one piece breaks, users barely notice. The basic trick is to have two of everything: two cables, two switches, two power supplies. But spare parts only help if traffic can switch to them quickly. A PC is told to send everything to one gateway address, and it has no way to find another one on its own. So routers share a pretend address that either of them can answer for, like a shared office phone number that rings at whichever desk is staffed. Inside big switches, a backup brain stays in sync with the main brain so it can take over in an instant.",
  "body": [
   "High availability (HA) means designing the network so that a single failure, such as a dead link, a failed supervisor or a crashed gateway, causes little or no disruption. You get there with redundancy at several levels: redundant links, redundant devices, redundant components inside a device, and protocols that fail over quickly between them. Each level covers a different kind of failure, and a gap at any one of them can undo the rest, as the hospital and clinic in the opening scene show.",
   "Link and device redundancy is the foundation. Access switches uplink to two distribution switches, distribution switches connect to two core switches, and critical servers are dual-homed. EtherChannel bundles several physical links into one logical link so losing one member does not change the topology; spanning tree and routing protocols see the same single logical interface before and after the failure. Redundant paths only help if something decides quickly which path to use, which is the job of spanning tree at Layer 2 and routing protocols at Layer 3.",
   "Endpoints are the weak spot. A PC is configured, statically or through DHCP (Dynamic Host Configuration Protocol), with a single default gateway IP address and has no routing protocol to discover an alternative. If that gateway dies, the PC keeps sending frames toward a MAC address nobody answers. First hop redundancy protocols (FHRPs) solve this by letting two or more routers share a virtual IP address and a virtual MAC address. Hosts use the virtual IP as their gateway. One router actively forwards traffic for it; if that router fails, another takes over the same virtual addresses and the hosts never notice, because their ARP (Address Resolution Protocol) cache entry for the gateway still points to the same virtual MAC.",
   "There are three FHRPs to know. Hot Standby Router Protocol (HSRP) is Cisco proprietary and uses one active and one standby router per group; other members listen. Virtual Router Redundancy Protocol (VRRP) is an open standard with one master and one or more backups, which makes it the choice in multivendor networks. Gateway Load Balancing Protocol (GLBP) is Cisco proprietary and lets several routers forward at once: one router acts as the active virtual gateway and answers ARP requests for the virtual IP with different virtual MAC addresses, each belonging to a different forwarding router, so different hosts use different routers. HSRP and VRRP can approximate load sharing only by running multiple groups, for example making switch A active for odd VLANs and switch B active for even VLANs.",
   "Features such as priority, preemption and interface or object tracking let you control which router is active and move the role if an uplink fails. The router with the highest priority wins the election. Preemption allows a higher-priority router to take the role back when it recovers; in HSRP it must be enabled explicitly, while VRRP preempts by default. Tracking lowers a router's priority when something it depends on, such as its uplink to the core, goes down, so it hands the gateway role to a peer that still has a working path. Without tracking, a router with a dead uplink can stay active and quietly black-hole traffic.",
   "Inside a chassis switch or router with two route processors or supervisors, you also need redundancy. Stateful switchover (SSO) keeps the standby supervisor synchronized with the active one: configuration, and state information such as interface and Layer 2 protocol state. If the active supervisor fails, the standby takes over without resetting line cards, so forwarding in hardware continues. SSO on its own does not preserve routing protocol adjacencies; the new supervisor must rebuild them. That is why SSO is paired with Nonstop Forwarding (NSF), which lets the device keep forwarding using the existing forwarding table while graceful restart helpers (the neighbors) keep their adjacencies and routes in place during the rebuild. Without NSF, neighbors would see the adjacency drop, withdraw routes and reroute around a device that is in fact still forwarding perfectly well.",
   "Stacking and virtual switching add another layer. Catalyst switch stacks and StackWise Virtual let two or more physical switches act as one logical switch, with one control plane and SSO between members. Neighbors can then use a multichassis EtherChannel to both physical switches, removing spanning tree blocked links, since the downstream switch sees one logical neighbor and bundles both uplinks.",
   "When you design HA, remember that more redundancy adds complexity. Too many parallel paths can slow convergence and make troubleshooting harder, and every extra protocol is another thing that can be misconfigured. The usual guidance is two of everything at each layer, with fast, deterministic failover, and with the FHRP active router aligned with the spanning tree root for the same VLAN so traffic does not take an unnecessary detour across the link between distribution switches."
  ],
  "analogy": "An FHRP is like a shared front-desk phone number at a clinic. Patients only know one number. Whichever receptionist is on duty answers it, and if she steps away, a colleague picks up the same line, so callers never need a new number. SSO is like a co-pilot who has been following the flight plan the whole time and can take the controls instantly. The analogy stops at routing: the co-pilot still has to re-establish radio contact with air traffic control, which is why NSF and graceful restart are needed.",
  "terms": [
   [
    "FHRP",
    "First hop redundancy protocol: lets several routers share a virtual gateway IP and MAC so hosts survive a gateway failure."
   ],
   [
    "HSRP",
    "Hot Standby Router Protocol, a Cisco FHRP with one active and one standby router per group."
   ],
   [
    "VRRP",
    "Virtual Router Redundancy Protocol, an open-standard FHRP with a master and backups."
   ],
   [
    "GLBP",
    "Gateway Load Balancing Protocol, a Cisco FHRP in which several routers forward at once using different virtual MAC addresses."
   ],
   [
    "Preemption",
    "Allowing a higher-priority router to reclaim the active role when it comes back online."
   ],
   [
    "SSO",
    "Stateful switchover: the standby supervisor stays synchronized and takes over without resetting line cards."
   ],
   [
    "NSF",
    "Nonstop Forwarding: keeps forwarding packets using existing forwarding tables while routing protocols reconverge after a switchover."
   ]
  ],
  "example": "A distribution pair runs HSRP for each user VLAN, with switch A at priority 110 and preemption enabled and tracking its core uplink. When A's uplink fails, tracking lowers its priority below B's, B becomes active, and users keep using the same gateway address without noticing.",
  "mistakes": [
   [
    "SSO by itself keeps OSPF and BGP neighbors up during a supervisor failover.",
    "SSO synchronizes configuration and Layer 2 and interface state, but routing adjacencies must be rebuilt. NSF with graceful restart keeps forwarding and neighbor routes in place during that rebuild."
   ],
   [
    "HSRP and VRRP both forward through several routers at the same time in one group.",
    "Only GLBP load-balances within a single group. HSRP and VRRP have one forwarding router per group; you share load by using multiple groups."
   ],
   [
    "A router with higher priority always takes over as soon as it boots.",
    "It only takes over an existing active role if preemption is enabled. HSRP has preemption off by default; VRRP has it on."
   ],
   [
    "VRRP is a Cisco proprietary protocol.",
    "VRRP is an open standard. HSRP and GLBP are the Cisco proprietary FHRPs."
   ]
  ],
  "tryit": [
   [
    "Your distribution switch A is the HSRP active router for VLAN 20, but users report outages whenever A's single uplink to the core fails, even though switch B still has a working uplink. Both switches stay up during the outage. What is missing, and how does it fix the problem?",
    "Interface or object tracking on A. Tracking the core uplink lowers A's priority when the uplink fails, so B (with preemption) becomes active and forwards traffic over its working uplink instead of A black-holing it."
   ],
   [
    "A company mixes Cisco routers with another vendor's firewalls as gateways for a server VLAN and wants gateway redundancy. Which FHRP should it choose?",
    "VRRP, because it is an open standard supported by multiple vendors, while HSRP and GLBP are Cisco proprietary."
   ]
  ],
  "tip": "SSO alone does not keep routing adjacencies up. Pair SSO with NSF (and graceful restart on neighbors) to keep forwarding during a supervisor failover.",
  "check": [
   [
    "Why do hosts need an FHRP when the network already has two gateway routers?",
    "Hosts have a single statically configured or DHCP-assigned gateway and cannot detect its failure; an FHRP presents one virtual IP and MAC that another router takes over."
   ],
   [
    "Which FHRP lets several routers forward traffic for the same group at the same time?",
    "GLBP, by assigning different virtual MAC addresses to different hosts."
   ],
   [
    "What does SSO synchronize to the standby supervisor?",
    "Configuration and state information, so the standby can take over without resetting line cards; NSF is added so forwarding continues while routing protocols rebuild."
   ],
   [
    "What role does tracking play in an FHRP?",
    "It reduces a router's priority when a monitored interface or object fails, so a peer with a working path can become the active gateway."
   ]
  ]
 },
 {
  "t": "SD-WAN control and data plane: Manager, Validator, Controllers, WAN Edges, OMP and IPsec tunnels",
  "hook": "Marcus manages the network for Copperline Outfitters, a chain of 140 outdoor stores. A new store opens in a mountain town on Monday, and nobody from IT will be there. A box arrives, a store clerk plugs in the power, a broadband cable and an LTE antenna, and within minutes the router is talking to headquarters over encrypted tunnels, with the right configuration and the right policies. Then, during a maintenance window, the central dashboard goes offline for an hour, and Marcus holds his breath. The stores keep selling. How did a router with no on-site help know who to trust, where to get its configuration and how to reach its peers, and why did losing the dashboard not stop a single sale?",
  "simple": "SD-WAN splits the job of running a company's wide-area network across a few specialized pieces. One piece is the control panel where engineers make changes and watch everything. Another is the front door that checks each new router's identity and tells it where to go next. A third is the traffic director that shares maps of the network with every router, so each one knows how to reach the others. The routers themselves sit at each office and carry the actual business traffic, wrapped in encrypted tunnels straight to each other. Because the routers carry traffic on their own, they keep working for a while even if the control panel goes down, much like trains keep running on schedule if the planning office closes for the afternoon.",
  "body": [
   "Cisco Catalyst SD-WAN (formerly Viptela) separates the WAN into distinct planes, each handled by a different component. This separation is what lets you manage hundreds of branch routers as one fabric from a single dashboard. ENCOR expects you to name each component, its plane and what it does. Cisco renamed the components; you will see both the old and new names on the exam and in documentation, so learn them as pairs.",
   "The management plane is SD-WAN Manager (formerly vManage). It is the graphical interface and API endpoint where you build device templates or configuration groups, define policies, push software upgrades and view monitoring data. When an engineer logs in to see a map of every site with green and red tunnels, or opens a policy wizard to define an application route, that is the Manager. It also exposes a REST API, so automation tools can read statistics and push changes. It does not forward user traffic, and it is not part of the routing exchange between devices.",
   "The orchestration plane is SD-WAN Validator (formerly vBond). It is the first point of contact for a new or rebooting WAN Edge, which is configured with the Validator's address as part of its bootstrap. The Validator authenticates the device, typically by checking its certificate and serial number against the list of authorized devices, tells it where the Controllers and Manager are, and helps devices behind Network Address Translation (NAT) discover their public addresses so tunnels can form. It needs a publicly reachable address for that reason. Think of it as the gatekeeper and matchmaker of the fabric rather than a component that carries ongoing traffic.",
   "The control plane is SD-WAN Controller (formerly vSmart). WAN Edges build secure Datagram Transport Layer Security (DTLS) or Transport Layer Security (TLS) control connections to the Controllers and exchange routing information with them using the Overlay Management Protocol (OMP). OMP runs only between WAN Edges and Controllers, much like BGP (Border Gateway Protocol) with a route reflector: Edges advertise their service-side prefixes (OMP routes), their transport endpoints (TLOC routes, for transport locators, which identify a WAN interface by system IP, color and encapsulation) and service routes, which advertise network services such as firewalls available at a site. The Controller applies centralized control policy, for example to build hub-and-spoke topologies or restrict which sites can build tunnels to each other, and reflects the results to other Edges.",
   "OMP also distributes the keys that Edges use for data plane encryption, so Edges do not need to run a separate key exchange with every peer. In a fabric of hundreds of sites, pairwise key negotiation would create an enormous number of sessions; instead each Edge sends its keys to the Controller once, and the Controller passes them to the Edges that are allowed to build tunnels to it. This is a major reason the overlay scales.",
   "The data plane is the WAN Edge routers (formerly vEdge or cEdge). They sit at branches, campuses and data centers, connect to one or more transports such as MPLS (Multiprotocol Label Switching), broadband internet or LTE, and build IPsec tunnels directly to each other across those transports. Each transport interface is identified by a color such as mpls, biz-internet or lte. Colors matter because they tell the fabric which interfaces can reach each other and whether a public or private address should be used. Bidirectional Forwarding Detection (BFD) runs inside each tunnel to measure loss, latency and jitter and to detect failures, which feeds application-aware routing.",
   "A useful way to see the whole flow is to follow a new router coming online. It contacts the Validator, proves its identity, learns the Controller and Manager addresses, connects to the Manager for its configuration, forms OMP sessions with the Controllers, learns the routes, TLOCs and keys of permitted peers, and then builds IPsec tunnels with BFD running inside them. Control connections are long-lived and secured, while user traffic never passes through the Controllers or the Manager.",
   "An important design point: if the Controllers become unreachable, existing IPsec tunnels and forwarding keep working for a while using the last known routes and keys, because the data plane is independent of the control plane. OMP graceful restart allows Edges to keep that information during a controller outage. Losing the Manager affects only management and monitoring, not forwarding. For production, you still deploy redundant Controllers and Validators so new devices can onboard and changes can propagate during a failure."
  ],
  "analogy": "Picture an airline. The head office (Manager) writes schedules and monitors every flight. Airport security (Validator) checks each pilot's credentials and directs them to the right gate. Air traffic control (Controller) tells each plane which routes are open and shares that picture with everyone. The planes (WAN Edges) carry the passengers directly between cities. If head office closes for an afternoon, planes keep flying. The analogy stops at keys: real air traffic control does not hand out the locks for each cabin door, but the SD-WAN Controller does distribute encryption keys through OMP.",
  "terms": [
   [
    "SD-WAN Manager (vManage)",
    "The management plane: GUI, templates, policy definition, monitoring and REST API."
   ],
   [
    "SD-WAN Validator (vBond)",
    "The orchestration plane: authenticates WAN Edges, points them to controllers and assists NAT traversal."
   ],
   [
    "SD-WAN Controller (vSmart)",
    "The control plane: runs OMP with WAN Edges, applies control policy and distributes routes and keys."
   ],
   [
    "WAN Edge",
    "The data plane router at each site that builds IPsec tunnels to other Edges and forwards user traffic."
   ],
   [
    "OMP",
    "Overlay Management Protocol, the routing protocol between WAN Edges and Controllers carrying OMP, TLOC and service routes."
   ],
   [
    "TLOC",
    "Transport locator: identifies a WAN Edge transport attachment by system IP, color and encapsulation."
   ],
   [
    "Color",
    "A label on a WAN Edge transport interface, such as mpls or biz-internet, that identifies the transport type."
   ]
  ],
  "example": "A new branch router boots with only a basic bootstrap configuration. It contacts the Validator, is authenticated by its certificate and serial number, learns the Controller and Manager addresses, downloads its configuration from the Manager, forms OMP sessions with two Controllers, and then builds IPsec tunnels to the data center over both its MPLS and internet colors.",
  "mistakes": [
   [
    "OMP runs between WAN Edges so they can exchange routes directly.",
    "OMP runs only between WAN Edges and Controllers. The Controller reflects routes, TLOCs and keys to other Edges, similar to a BGP route reflector."
   ],
   [
    "User traffic passes through the Controllers.",
    "Controllers handle only the control plane. User traffic flows in IPsec tunnels directly between WAN Edges."
   ],
   [
    "The Manager is the first device a new router contacts.",
    "The Validator is the first point of contact. It authenticates the router and tells it how to reach the Controllers and Manager."
   ],
   [
    "If the Controllers go down, all branch traffic stops immediately.",
    "Existing tunnels keep forwarding using the last known routes and keys for a period, because the data plane is independent of the control plane."
   ]
  ],
  "tryit": [
   [
    "A branch WAN Edge sits behind a broadband modem doing NAT. Its tunnels to other sites will not come up, and the engineer finds the branch has never registered with the fabric. Which component should she check first, and why?",
    "The Validator. It is the first contact for onboarding, authenticates the device and helps devices behind NAT learn their public address. If the Edge cannot reach the Validator or fails authentication, it never learns where the Controllers are."
   ],
   [
    "Management wants guest-network branches to build tunnels only to the data center, not to each other. Which component enforces that topology, and with what?",
    "The Controller, using centralized control policy applied to OMP. It limits which TLOCs and routes it advertises to each Edge, so spokes only learn the hub."
   ]
  ],
  "tip": "Match the component to the plane: Manager is management, Validator is orchestration, Controller is control (OMP), WAN Edge is data (IPsec plus BFD). OMP never runs directly between two WAN Edges.",
  "check": [
   [
    "Which SD-WAN component does a WAN Edge contact first when it comes online?",
    "The Validator (vBond), which authenticates it and tells it how to reach the Controllers and Manager."
   ],
   [
    "What three kinds of routes does OMP carry?",
    "OMP routes (service-side prefixes), TLOC routes (transport endpoints) and service routes."
   ],
   [
    "What happens to user traffic if the SD-WAN Manager fails?",
    "Forwarding continues; only management, configuration changes and monitoring are affected, because the Manager is not in the data or control plane."
   ],
   [
    "What runs inside each IPsec tunnel to measure path quality?",
    "BFD, which measures loss, latency and jitter and detects tunnel failures."
   ]
  ]
 },
 {
  "t": "SD-WAN benefits and limitations compared with traditional WAN",
  "hook": "The CFO of Brightwater Insurance forwards you a renewal quote for the company's private MPLS circuits, with one line highlighted: the total. Below it is a note from the branch managers. Video calls freeze every afternoon, the cloud claims system is sluggish, and opening a new office takes three months while a circuit is ordered and an engineer flies out to configure the router. A vendor promises that SD-WAN will fix all of it, cut costs and guarantee perfect call quality over cheap internet links. Your job is to tell leadership which of those promises are real, which are partly true and which are simply not how networks work.",
  "simple": "A traditional company WAN connects offices with expensive private lines, and each office router is set up by hand. Internet traffic often travels to headquarters first to be checked, then out to the internet, which is slow for cloud apps. SD-WAN lets each office use several kinds of connections at once, such as a private line plus regular business internet, and wraps all traffic in encryption. A central system configures every router and keeps measuring how good each connection is right now, then sends important traffic like voice over the best one. It is a bit like a navigation app that checks live traffic and reroutes you. But just like that app, it cannot make a jammed road clear; it can only choose a better one.",
  "body": [
   "A traditional enterprise WAN typically connects branches to a data center over private circuits such as MPLS (Multiprotocol Label Switching) Layer 3 VPNs or leased lines. Each branch router is configured individually through the command line. Internet access is often backhauled through the data center so it can be inspected centrally by one set of firewalls and proxies. This works, but it is expensive, slow to change and poorly suited to cloud applications, because traffic to a cloud service hosted near the branch first travels all the way to headquarters and back.",
   "SD-WAN (software-defined WAN) changes the model in several ways, starting with transport independence. A branch can use MPLS, business broadband, LTE or 5G interchangeably, and the fabric builds encrypted IPsec tunnels over all of them. This lets you replace or supplement expensive private circuits with cheaper internet links and use all links actively rather than keeping one idle as a backup. In a traditional design, a backup circuit often sits unused until a failure; in SD-WAN, both links carry traffic every day, and policy decides which applications use which link.",
   "Centralized management is the second big benefit. You define configuration templates and policies once in SD-WAN Manager and apply them to hundreds of sites. Zero-touch provisioning lets a router shipped to a branch contact the orchestrator and pull its configuration without an engineer on site. Change becomes faster and more consistent: updating a security policy or adding a new application rule is one change pushed everywhere, not hundreds of manual sessions, each with its own chance of a typo.",
   "Application-aware routing is the third. Because BFD (Bidirectional Forwarding Detection) continuously measures loss, latency and jitter on every tunnel, you can write service-level agreement (SLA) policies such as 'send voice over any path with less than a set latency and loss; if MPLS degrades, move it to broadband.' A traditional WAN routing protocol picks paths by metric, not by live application quality, so a link that is up but losing packets still looks perfectly good to OSPF or BGP. SD-WAN can also break out Software as a Service (SaaS) traffic directly to the internet at the branch, with cloud security in the path, instead of hairpinning it through the data center, which improves performance for cloud applications.",
   "Security is built in. All overlay traffic is encrypted with IPsec, devices authenticate with certificates before they can join, and segmentation with VPNs (VRFs, or virtual routing and forwarding instances, in the overlay) keeps, for example, guest, corporate and payment traffic apart end to end. In a traditional WAN, the private MPLS service is often trusted without encryption, and segmentation must be built separately on each router.",
   "There are limitations and trade-offs, and the exam likes to test them. Internet transports offer no end-to-end SLA from a provider, so quality depends on your policy and path diversity. SD-WAN measures and steers; it cannot repair congestion inside an internet provider's network. If every available path is degraded, the traffic still suffers. IPsec and SD-WAN headers add overhead, which can matter for MTU (maximum transmission unit) and on small links, where fragmentation or reduced throughput may appear if MTU is not tuned.",
   "Operational dependencies matter too. The solution depends on controllers and orchestration, so you must design for their availability and for the certificate lifecycle, since expired certificates can stop devices from joining. Licensing and subscription costs replace some circuit costs, so the savings are real but not automatic. Operations staff need new skills and tools, and migrations must coexist with legacy routing for a period, often with route redistribution between the overlay and existing networks at hub sites.",
   "Finally, direct internet access at every branch expands the attack surface unless you pair it with firewalling or cloud security. Backhauling had one benefit: every internet flow passed through the central security stack. When each branch has its own internet exit, each exit needs equivalent protection, whether that is a firewall on the WAN Edge or a cloud security service. A balanced answer on the exam recognizes both the gains and these new responsibilities. When a question asks you to recommend SD-WAN, look for the drivers it solves well: many branches, a mix of transports, heavy use of cloud applications and a need for fast, consistent change. When a question stresses guaranteed latency over the internet or a team with no appetite for new tools, the limitations are what it is testing."
  ],
  "analogy": "SD-WAN is like a navigation app for a delivery fleet. The old way gave each driver a fixed route on a toll road, printed out by hand at each depot. The new way lets drivers use toll roads and free roads, with a central dispatcher updating every route at once and live traffic data steering urgent parcels around jams. Where the analogy holds for the exam: the app cannot clear a traffic jam, and if every road is jammed, deliveries are still late. SD-WAN steers around poor paths but cannot guarantee internet performance.",
  "terms": [
   [
    "Transport independence",
    "The ability of the SD-WAN overlay to run over any mix of MPLS, broadband, LTE or 5G links."
   ],
   [
    "Application-aware routing",
    "Choosing a path per application based on measured loss, latency and jitter against an SLA policy."
   ],
   [
    "Zero-touch provisioning",
    "Automatic onboarding where a new device contacts the orchestrator and downloads its configuration without manual setup."
   ],
   [
    "Direct internet access",
    "Sending internet or SaaS traffic straight out of the branch instead of backhauling it through the data center."
   ],
   [
    "Backhaul",
    "Sending branch internet traffic through the data center for central inspection before it reaches the internet."
   ]
  ],
  "example": "A retailer with 300 stores replaces its single MPLS circuit per store with MPLS plus broadband under SD-WAN. Point-of-sale traffic stays on MPLS unless its latency or loss exceeds the SLA, while traffic to the company's cloud office suite leaves directly over broadband through a cloud security service, relieving the congested data center internet link.",
  "mistakes": [
   [
    "SD-WAN guarantees performance over internet links.",
    "SD-WAN measures path quality and steers traffic, but internet transports have no provider SLA. If all paths degrade, traffic suffers."
   ],
   [
    "SD-WAN always costs less than MPLS.",
    "Cheaper circuits often lower costs, but licensing, subscriptions, security services and new skills offset part of the savings."
   ],
   [
    "Backup links in SD-WAN sit idle until a failure.",
    "SD-WAN uses all transports actively and distributes applications across them according to policy."
   ],
   [
    "Direct internet access is automatically more secure because traffic is encrypted.",
    "Overlay traffic is encrypted, but traffic leaving to the internet at each branch needs firewalling or cloud security, which expands the attack surface if omitted."
   ]
  ],
  "tryit": [
   [
    "A law firm runs voice calls over MPLS with broadband as a second SD-WAN transport. Every afternoon the MPLS link shows rising jitter, and calls become choppy, yet OSPF on a test router still sees the MPLS path as best. What SD-WAN feature addresses this, and how?",
    "Application-aware routing. BFD in each tunnel measures jitter, loss and latency; when MPLS violates the voice SLA class, policy moves voice to the broadband path that still meets the SLA. A metric-based routing protocol cannot see that degradation."
   ],
   [
    "A company plans direct internet access at 80 branches to speed up SaaS applications. The security team objects. What is their concern, and how is it usually addressed?",
    "Each branch becomes an internet exit, expanding the attack surface that used to be protected by one central security stack. It is addressed with firewalling on the WAN Edge or by steering traffic through a cloud security service."
   ]
  ],
  "tip": "Exam answers favor SD-WAN for active use of multiple transports, centralized policy, SLA-based path choice and cloud breakout. Watch for distractors claiming SD-WAN guarantees internet performance; it measures and steers but cannot guarantee a provider's network.",
  "check": [
   [
    "How does SD-WAN decide that voice should move from MPLS to broadband?",
    "BFD probes in each tunnel measure loss, latency and jitter; when MPLS violates the SLA class in the application-aware routing policy, traffic moves to a compliant path."
   ],
   [
    "Give two limitations of SD-WAN compared with a traditional MPLS WAN.",
    "Internet transports have no provider SLA, and encryption overhead plus controller and licensing dependencies add complexity and cost."
   ],
   [
    "What problem with traditional WANs does direct internet access solve?",
    "Backhauling cloud traffic through the data center, which adds latency and congests the central internet link."
   ]
  ]
 },
 {
  "t": "SD-Access: control plane (LISP), data plane (VXLAN), policy plane (TrustSec), fabric node roles",
  "hook": "Elena runs the network at Westgate Medical Center, a campus of six buildings. A contractor's laptop wanders from the admin wing to the imaging building, and the security officer asks a pointed question: can that laptop now reach the radiology servers, since it is in a different building on a different switch? In the old network, the honest answer would depend on which VLAN, which closet and which ACL someone remembered to update. In the new SD-Access fabric, Elena opens Catalyst Center and sees the laptop's identity, its group and the policy that still blocks it, wherever it plugs in. How does the fabric know where the laptop is, how does its traffic get there, and how does the policy travel with it?",
  "simple": "SD-Access is Cisco's way of building a campus network where your access follows you, not the cable you plug into. It uses three ideas. First, a directory: when a device connects, its switch records 'this device is here' in a central lookup service, so other switches can ask where to send traffic. Second, an envelope: traffic between switches is wrapped in an outer package addressed to the destination switch, so it can cross the campus over normal routed links. Third, a badge: each user or device is given a group tag, like a colored badge, that rides along with every packet. The receiving switch checks the badge against the rules before delivering it.",
  "body": [
   "Cisco SD-Access is the campus fabric solution managed by Catalyst Center (formerly DNA Center). Instead of stretching VLANs across the campus and relying on spanning tree, SD-Access builds a routed underlay and an overlay fabric on top of it. Each plane of the fabric uses a specific protocol, and ENCOR expects you to match them: LISP for the control plane, VXLAN for the data plane and TrustSec for the policy plane. Once you know what problem each protocol solves, the node roles fall into place.",
   "The control plane uses LISP (Locator/ID Separation Protocol). LISP splits an endpoint's identity (its IP or MAC address, called the EID or endpoint identifier) from its location (the loopback address of the switch it is attached to, called the RLOC or routing locator). In traditional routing, an IP address is both who you are and where you are, which is why moving a host to another subnet means changing its address. LISP separates the two, so the address stays the same and only the location record changes.",
   "When an endpoint connects, the edge switch registers the EID-to-RLOC mapping with the control plane node, which acts as a LISP map server and map resolver. When another switch needs to reach that endpoint, it asks the control plane node where it lives instead of flooding. The answer is cached locally, so later packets do not need another query. Endpoints can move between switches and keep their IP address, because only the mapping changes: the new edge registers the endpoint, and the control plane node updates its database so stale locations are corrected.",
   "The data plane uses VXLAN (Virtual Extensible LAN). Traffic between fabric switches is encapsulated in VXLAN over UDP, carried across the routed underlay. The outer IP header is addressed from the source RLOC to the destination RLOC, so underlay switches only need routes to fabric loopbacks. SD-Access uses a variant often called VXLAN-GPO (group policy option), which adds a field to the VXLAN header to carry the source Scalable Group Tag. The VXLAN network identifier (VNI) keeps virtual networks (which map to VRFs, or virtual routing and forwarding instances) separate, so traffic from one virtual network can never be confused with another, even when both cross the same physical links.",
   "The policy plane uses Cisco TrustSec. Users and devices are classified into Scalable Groups (for example Employees, Contractors, Cameras) usually by Cisco Identity Services Engine (ISE) during authentication with 802.1X or MAB (MAC Authentication Bypass). Each group has a Scalable Group Tag (SGT) that travels with the packet in the VXLAN header. Group-based access policies, enforced as SGACLs (scalable group ACLs) at the egress edge, decide which groups can talk. Enforcing at egress means the destination switch, which knows the destination's group, compares source and destination tags and applies the rule.",
   "This gives two levels of segmentation. Macro-segmentation separates virtual networks (VRFs): devices in different virtual networks cannot communicate at all unless traffic leaves the fabric and passes through a device such as a firewall that routes between them. Micro-segmentation uses SGTs between groups inside a virtual network, for example letting Employees reach printers while blocking Cameras from reaching Employees, even though all of them share the same virtual network and possibly the same subnet.",
   "The fabric node roles are the next piece. The control plane node runs the LISP map server and map resolver, holding the database of where every endpoint is. The edge node is the access switch where endpoints connect; it registers endpoints, encapsulates and decapsulates VXLAN, and acts as the anycast default gateway for its subnets. The border node connects the fabric to outside networks, with internal borders for known networks such as the data center and external borders as the default exit, often the internet. Intermediate nodes are underlay switches that simply route IP packets between fabric nodes and are unaware of the fabric; they see only outer IP headers.",
   "Wireless joins the same fabric through the fabric wireless controller and fabric-mode access points. The controller handles wireless control functions and registers wireless clients with the control plane node, while the access points send client traffic into VXLAN toward the edge, so wired and wireless users share the same policy model. Catalyst Center is the management and automation platform and ISE is the policy and identity platform. Border and control plane functions are often co-located on the same pair of switches, which is common in small and medium deployments."
  ],
  "analogy": "Think of a large conference center. When you arrive, the front desk (control plane node) writes down which room you are in. Messages for you are sealed in an envelope addressed to that room (VXLAN), carried by hallway staff who read only the room number (intermediate nodes). Your badge color (SGT) is printed on every envelope, and the room attendant (egress edge) checks it against the rules before handing it to anyone. If you change rooms, the front desk updates its book and you keep your name. The analogy stops at the badge: in SD-Access the badge is assigned by ISE at authentication, not chosen by you.",
  "mnemonic": "Control, data, policy is L-V-T: LISP finds where the endpoint is, VXLAN carries the traffic there, TrustSec decides whether it is allowed.",
  "terms": [
   [
    "EID",
    "Endpoint identifier: the IP or MAC address that identifies an endpoint in LISP."
   ],
   [
    "RLOC",
    "Routing locator: the underlay address (usually a loopback) of the fabric node where an endpoint is attached."
   ],
   [
    "Control plane node",
    "The fabric node running the LISP map server and map resolver that stores EID-to-RLOC mappings."
   ],
   [
    "Edge node",
    "The fabric access switch that connects endpoints, registers them with the control plane node and acts as their anycast gateway."
   ],
   [
    "Border node",
    "The fabric node that connects the SD-Access fabric to external networks such as the data center, WAN or internet."
   ],
   [
    "Intermediate node",
    "An underlay switch that routes IP between fabric nodes without any awareness of the overlay."
   ],
   [
    "SGT",
    "Scalable Group Tag: a 16-bit group identifier assigned to a user or device and used for group-based policy."
   ]
  ],
  "example": "A laptop in the Contractors group moves from building 1 to building 3. The new edge node registers the laptop's EID with the control plane node against its own RLOC. Other edges query the control plane node, send VXLAN traffic to the new location, and the Contractors SGT in each packet still blocks access to the Finance group servers.",
  "mistakes": [
   [
    "VXLAN is the SD-Access control plane.",
    "VXLAN is the data plane encapsulation. LISP is the control plane that maps endpoints to locations."
   ],
   [
    "Intermediate nodes need to understand LISP and SGTs.",
    "Intermediate nodes only route the outer IP packets between fabric loopbacks and know nothing about the overlay."
   ],
   [
    "SGTs separate virtual networks from each other.",
    "Virtual networks (VRFs) provide macro-segmentation. SGTs provide micro-segmentation between groups inside a virtual network."
   ],
   [
    "Policy is enforced at the ingress edge where the user connects.",
    "In SD-Access, SGACLs are enforced at the egress node, which knows both the source SGT carried in VXLAN and the destination's group."
   ]
  ],
  "tryit": [
   [
    "A hospital wants security cameras and staff laptops in the same virtual network so they can share some services, but cameras must never initiate connections to laptops. Should the engineer create a separate virtual network or use groups? Why?",
    "Use Scalable Groups within the same virtual network. Micro-segmentation with SGTs and an SGACL blocks Cameras from reaching Laptops while keeping shared services in one VRF. A separate virtual network would block all communication unless routed through an external device."
   ],
   [
    "After a wiring change, users in one building cannot reach anything outside the fabric, but traffic between buildings works. Which fabric role is the most likely suspect?",
    "The border node, because it connects the fabric to external networks. Traffic inside the fabric moves edge to edge without it."
   ]
  ],
  "tip": "Memorize the triad: control plane LISP, data plane VXLAN, policy plane TrustSec (SGT). Intermediate nodes are the only fabric role that knows nothing about the overlay.",
  "check": [
   [
    "Which SD-Access node role runs the LISP map server and map resolver?",
    "The control plane node."
   ],
   [
    "How does the SGT reach the enforcement point in SD-Access?",
    "It is carried inline in the VXLAN-GPO header from the ingress edge node to the egress node, which enforces the SGACL."
   ],
   [
    "What is the difference between macro- and micro-segmentation in SD-Access?",
    "Macro-segmentation separates virtual networks (VRFs); micro-segmentation uses SGTs to control traffic between groups within the same virtual network."
   ],
   [
    "Why can an endpoint keep its IP address when it moves between edge nodes?",
    "LISP separates identity (EID) from location (RLOC); only the mapping in the control plane node changes."
   ]
  ]
 },
 {
  "t": "Traditional campus vs SD-Access: underlay and overlay, group-based policy from Catalyst Center",
  "hook": "Jamal inherits the network at Riverbend University with a printed binder of ACLs that runs to dozens of pages. Each one lists IP addresses for labs, dorms, research servers and the campus police cameras. This week the research department is renumbering its subnets, and someone has to find and fix every rule that mentions the old addresses, on every distribution switch, without breaking the cameras. Meanwhile the dean wants the visiting-scholar group to have the same access in every building. Jamal starts to wonder whether the problem is the rules or the way the network ties rules to addresses and wiring closets. Is there a way to write the policy once and have it follow people wherever they go?",
  "simple": "In a traditional campus, who can talk to whom is decided by address and location. You put people in VLANs, which are like separate rooms, and write lists of allowed and blocked addresses. If a group needs the same room in several buildings, you have to stretch that room across the campus, which makes the network fragile. SD-Access splits the network into two layers. The bottom layer is plain, reliable roads between switches. The top layer is a set of virtual networks drawn on those roads. Rules are written about groups of people and devices, such as Guests or Cameras, not addresses. When someone logs in, they get a group tag, and the rules follow that tag anywhere on campus.",
  "body": [
   "In a traditional campus, segmentation and policy are tied to network topology. You create VLANs, map each VLAN to a subnet and default gateway, and write IP-based access control lists to control traffic between subnets. If you want a user group available in several buildings, you stretch VLANs across trunks, which brings spanning tree, broadcast domains that grow and larger failure domains. A loop or broadcast storm in one closet can then affect every building where that VLAN exists.",
   "Configuration in a traditional campus is manual and repetitive. Every switch is configured by hand, often by copying and editing a previous configuration, and ACLs grow into long lists of addresses that must change whenever addressing changes. Over time, nobody is quite sure which entries are still needed, and removing one feels risky, so the lists only grow. This is the problem SD-Access set out to solve by separating the physical network from the logical one and moving policy from addresses to identities.",
   "SD-Access separates the network into an underlay and an overlay. The underlay is the physical network of switches and links running a simple routed design, typically IS-IS (Intermediate System to Intermediate System) when Catalyst Center builds it through LAN automation, though OSPF or another IGP (interior gateway protocol) can be used in a manually built underlay. Its only job is to provide reachability between the loopback addresses (RLOCs, routing locators) of fabric nodes. There is no spanning tree between switches because every link is routed, and equal-cost paths can all forward at once.",
   "The overlay is the virtual network built on top, with LISP (Locator/ID Separation Protocol) as control plane and VXLAN (Virtual Extensible LAN) tunnels between fabric nodes. Endpoints sit in virtual networks that correspond to VRFs (virtual routing and forwarding instances, separate routing tables on the same switch), and within each virtual network, subnets can exist on every edge switch at once with the same anycast gateway IP and MAC. A user gets the same subnet and policy in any building without stretching Layer 2 across the campus. Because it is an overlay, you can change segmentation without touching the physical design: adding a new virtual network does not require new cabling or new trunks.",
   "Policy in SD-Access is group-based rather than address-based. Catalyst Center, integrated with Cisco ISE (Identity Services Engine), lets you define Scalable Groups (such as Employees, Guests, IoT Cameras, PCI Servers) and draw a policy matrix of which groups may talk to which, and with what contract (permit, deny or a specific set of ports). When a user authenticates with 802.1X or MAB (MAC Authentication Bypass), ISE assigns the SGT (Scalable Group Tag). The policy follows the user regardless of IP address or location, and the matrix stays small even as the network grows, because adding a new subnet or building does not add rows or columns.",
   "Compare the two approaches on a concrete change. In the traditional campus, renumbering a server subnet means editing every ACL that mentions it, on every device that enforces it. In SD-Access, the servers keep their group, so the matrix entry 'Guests cannot reach PCI Servers' remains correct with no edits at all. The policy is written in business terms, which also makes it easier for auditors and security teams to read.",
   "Catalyst Center organizes the work into workflows often described as design, policy, provision and assurance. In design you set up sites, IP pools and network settings such as DNS and DHCP servers. In policy you define virtual networks and group-based access. In provision you assign devices to sites and fabric roles and push configuration. In assurance you monitor health and troubleshoot, with views of client, device and application health over time. This is the intent-based model: you describe what you want, and the controller renders device configuration.",
   "The trade-offs: SD-Access needs supported hardware, licensing, Catalyst Center and usually ISE, and staff must learn fabric troubleshooting, which involves LISP lookups and VXLAN encapsulation rather than just VLANs and trunks. A traditional campus is simpler to understand and works on almost any switch, but it is slower to change and harder to segment consistently. Many organizations migrate gradually, running fabric sites alongside traditional ones. For the exam, keep the contrast simple: traditional means VLANs, trunks, spanning tree and IP-based ACLs configured device by device; SD-Access means a routed underlay, a LISP and VXLAN overlay, anycast gateways and group-based policy defined once in Catalyst Center."
  ],
  "analogy": "A traditional campus is like securing an office building by listing which desk numbers can enter which rooms. Every time someone changes desks, every list must be updated. SD-Access is like issuing employee badges by department and setting door rules by department: move desks, and your badge still works the same way. The roads between buildings (underlay) are just hallways; the departments and doors (overlay and policy) are drawn on top. The analogy stops at enforcement: in the fabric, the check happens at the destination switch, not at a single front door.",
  "terms": [
   [
    "Underlay",
    "The physical routed network that provides IP reachability between fabric node loopbacks."
   ],
   [
    "Overlay",
    "The virtual network (LISP plus VXLAN) built on the underlay that carries endpoint traffic and segmentation."
   ],
   [
    "Anycast gateway",
    "The same default gateway IP and MAC configured on every edge node for a subnet, so hosts keep their gateway anywhere."
   ],
   [
    "Group-based policy",
    "Access rules written between scalable groups (SGTs) instead of IP addresses."
   ],
   [
    "Virtual network",
    "An SD-Access macro-segment that maps to a VRF in the fabric."
   ],
   [
    "LAN automation",
    "A Catalyst Center feature that discovers and configures underlay switches, building an IS-IS routed underlay."
   ]
  ],
  "example": "A hospital needs infusion pumps in every ward isolated from guest devices. In the traditional design this meant an IoT VLAN trunked to every closet and ACLs on every distribution switch. With SD-Access the pumps authenticate by MAB, ISE assigns the Medical-Devices SGT, and a single row in the Catalyst Center policy matrix blocks Guests from Medical-Devices everywhere.",
  "mistakes": [
   [
    "The SD-Access underlay still runs spanning tree between switches.",
    "The underlay is fully routed, so there is no spanning tree between fabric switches. Spanning tree problems from stretched VLANs are removed."
   ],
   [
    "The overlay is the physical cabling and switches.",
    "The underlay is physical; the overlay is the virtual network of LISP and VXLAN built on top of it."
   ],
   [
    "Group-based policy still requires updating rules when IP addresses change.",
    "Rules reference groups, and the SGT is assigned at authentication, so addressing changes do not affect the policy."
   ],
   [
    "LAN automation builds the underlay with OSPF.",
    "Catalyst Center LAN automation uses IS-IS. OSPF or another IGP can be used only when you build the underlay manually."
   ]
  ],
  "tryit": [
   [
    "A school district needs the same Teachers access in all 14 school buildings. Today it trunks a Teachers VLAN to every closet and has had two spanning tree outages this year. What SD-Access feature removes the need to stretch that VLAN, and how?",
    "The anycast gateway in a routed underlay with a VXLAN overlay. Each edge node hosts the Teachers subnet with the same gateway IP and MAC, so teachers get the same subnet everywhere while the underlay stays routed with no stretched Layer 2."
   ],
   [
    "An auditor asks the network team to prove that guest devices can never reach payment servers, across all sites. Which approach makes that easier to demonstrate, and why?",
    "SD-Access group-based policy. One entry in the Catalyst Center policy matrix (Guests to PCI Servers: deny) applies everywhere, instead of reviewing IP ACLs on every device."
   ]
  ],
  "tip": "Underlay equals physical routed reachability between fabric nodes; overlay equals the virtual tunnels carrying user traffic. Questions about avoiding stretched VLANs and spanning tree point to the SD-Access routed underlay.",
  "check": [
   [
    "Which routing protocol does Catalyst Center LAN automation use to build the SD-Access underlay?",
    "IS-IS."
   ],
   [
    "Why does group-based policy scale better than IP ACLs?",
    "Rules are written between a small number of groups, and the policy follows the user's SGT regardless of IP address or location, so addressing changes do not require rule changes."
   ],
   [
    "Name the four Catalyst Center workflow areas often used to describe SD-Access deployment.",
    "Design, policy, provision and assurance."
   ]
  ]
 },
 {
  "t": "QoS components: classification and marking (DSCP, CoS), policing, shaping, queuing (CBWFQ, LLQ), WRED",
  "hook": "It is Monday at 9:05 a.m. at Pinecrest Legal Group, and the help desk queue is filling with the same complaint: phone calls from the downtown branch sound robotic and keep dropping words. Dana, the network engineer, pulls up the branch router and sees the WAN link pinned at full utilization. Someone in accounting started a huge backup to the cloud at nine, and the voice packets are stuck in line behind it. Buying a faster circuit will take weeks. The partners have client calls all morning. Dana cannot add bandwidth today, but she can decide who goes first. Which tools does she reach for, and in what order should they act on each packet?",
  "simple": "Quality of service, or QoS, is a set of rules for who goes first when a network link is busy. It does not make the link faster. Think of a grocery store with one checkout lane and a long line. QoS first puts a colored sticker on each shopper's cart, such as red for someone with only ice cream that will melt (that is marking). Then it opens an express lane that red carts always use first (priority queuing), gives other lanes a fair share (bandwidth guarantees), and politely turns some shoppers away early when the line is getting too long so it never jams completely (early dropping). It can also cap how fast people are let in, either by turning extras away (policing) or making them wait at the door (shaping).",
  "body": [
   "Quality of service (QoS) is a set of tools that decide which traffic gets priority when a link is congested. It cannot create bandwidth, but it can make sure voice and video, which are sensitive to delay, jitter and loss, get served before bulk transfers. A file download that takes a few extra seconds is barely noticed, while a voice packet that arrives late is as useless as one that never arrives. ENCOR focuses on the building blocks, what each one does to a packet, and the differences between tools that sound alike, especially policing versus shaping and CBWFQ versus LLQ.",
   "Classification comes first because every other tool needs to know what kind of traffic it is looking at. Classification identifies traffic, for example by access control list (ACL), by application using NBAR (Network-Based Application Recognition), or by an existing marking. Marking then writes a value into the packet so later devices can classify it quickly without repeating deep inspection. The usual design is to classify and mark once, as close to the source as possible, and let every other device in the path simply read the marking.",
   "There are two marking fields to know. At Layer 2, the 802.1Q tag has a 3-bit Class of Service (CoS) field, values 0 to 7. Because it lives inside the 802.1Q tag, CoS exists only on tagged trunk links and disappears on untagged access ports and at every routed hop where the frame is rebuilt. At Layer 3, the IP header's 6-bit DSCP (Differentiated Services Code Point) field gives values 0 to 63 and survives across routed hops, which is why DSCP is the marking that carries intent end to end. Common DSCP markings are EF (Expedited Forwarding, decimal 46) for voice, the AF classes (Assured Forwarding, such as AF41 for interactive video) whose second digit is a drop precedence, CS (class selector) values for backward compatibility with the older 3-bit IP precedence, and default (0) for best effort.",
   "Markings are only useful if they can be believed, so you establish a trust boundary. This is the point in the network, ideally the access port or the IP phone, where markings are either trusted or rewritten. A Cisco IP phone can be trusted to mark its own voice as EF, while a user's PC behind it should not be able to mark a game download as EF and jump the queue. In practice you trust the phone, re-mark or zero untrusted PC traffic, and let distribution and core devices trust what arrives from the access layer.",
   "Policing and shaping both enforce a rate, and the exam loves to contrast them. A policer measures traffic against a rate and drops or re-marks the excess immediately. It does not buffer, so it adds no delay, but dropped TCP segments cause retransmissions and a sawtooth throughput pattern. A policer can be applied inbound or outbound, and service providers use it to enforce the contracted rate on a customer circuit. A shaper buffers excess traffic and sends it later, smoothing bursts down to the target rate. It adds delay but avoids drops, and it applies outbound only, since you cannot delay packets that have already arrived. A typical use is shaping a branch interface to the provider's contracted rate, so your own router queues the excess where your QoS policy can prioritize it, rather than letting the provider's policer drop it blindly.",
   "Queuing decides the order in which packets leave an interface during congestion. When the link is not congested, packets leave as they arrive and the queuing policy does nothing visible. Class-Based Weighted Fair Queuing (CBWFQ) lets you define classes and give each one a guaranteed minimum bandwidth, for example 30 percent for business applications. A class can use more when others are idle, but it is assured its share when the link is full. CBWFQ alone is not ideal for voice, because a voice packet may still wait behind packets from other classes.",
   "Low Latency Queuing (LLQ) solves that by adding a strict-priority queue to CBWFQ. Traffic in the priority class is always sent first, ahead of every other class, which keeps delay and jitter low for voice and, in many designs, interactive video. The risk of strict priority is starvation: if the priority class were unlimited, a flood of EF traffic could stop everything else. So the priority queue is implicitly policed to its configured rate during congestion, and excess priority traffic is dropped rather than allowed to starve other classes. This is why you size the priority class carefully and keep only real-time traffic in it.",
   "Congestion avoidance keeps queues from filling completely. When a queue is full, tail drop discards every new arrival. Many TCP flows then lose packets at the same moment, all slow down together, underuse the link, and then ramp up together until the queue overflows again. This cycle is called TCP global synchronization. Weighted Random Early Detection (WRED) randomly drops some packets before the queue is full, so only a few flows back off at a time. It is weighted because the drop probability depends on the marking: packets with a higher AF drop precedence, such as AF13, are dropped earlier than AF11 in the same class. WRED is meant for TCP traffic; it does nothing useful for voice, which does not retransmit, so you never apply it to the priority class.",
   "In Cisco IOS and IOS XE these tools are configured with the Modular QoS CLI (MQC). A `class-map` classifies traffic, for example `match dscp ef` or `match protocol` with NBAR. A `policy-map` defines actions per class, such as `priority`, `bandwidth percent`, `police`, `shape average` or `random-detect dscp-based`. Then `service-policy input|output` applies it to an interface. A common pattern is hierarchical: a parent policy shapes the whole interface to the contracted rate, and a child policy inside it performs LLQ and CBWFQ, because queuing only engages when there is congestion, and the shaper creates that congestion point at the right rate. Verify with `show policy-map interface`, which shows matches, drops and queue depth per class."
  ],
  "analogy": "Picture a highway on-ramp with a metering light. A shaper is the light: cars wait in a short line and enter at a steady pace, so nobody is turned away but some wait. A policer is a gate that simply turns away any car beyond the allowed rate, with no waiting line. LLQ is a dedicated ambulance lane that always moves first but is only so wide. The analogy stops at TCP: cars do not slow down on their own when another car is turned away, but TCP senders do, which is exactly what WRED relies on.",
  "terms": [
   [
    "DSCP",
    "Differentiated Services Code Point: a 6-bit Layer 3 marking in the IP header, values 0 to 63, that survives routed hops."
   ],
   [
    "CoS",
    "Class of Service: a 3-bit Layer 2 priority in the 802.1Q tag, values 0 to 7, present only on tagged links."
   ],
   [
    "Trust boundary",
    "The point, ideally the access port or IP phone, where incoming markings are accepted or rewritten."
   ],
   [
    "Policing",
    "Enforcing a rate by dropping or re-marking excess traffic without buffering; inbound or outbound."
   ],
   [
    "Shaping",
    "Enforcing a rate by buffering excess traffic and sending it later; outbound only."
   ],
   [
    "CBWFQ",
    "Class-Based Weighted Fair Queuing: guarantees each defined class a minimum share of bandwidth during congestion."
   ],
   [
    "LLQ",
    "Low Latency Queuing: CBWFQ plus a strict-priority queue, implicitly policed, typically for voice."
   ],
   [
    "WRED",
    "Weighted Random Early Detection: drops packets early and selectively by marking to avoid tail drop and TCP global synchronization."
   ]
  ],
  "example": "A branch has a 100 Mbps circuit on a gigabit interface, and the provider polices at 100 Mbps. The engineer applies an outbound shaper at 100 Mbps with a child policy: voice marked EF in an LLQ priority class, video AF41 with a bandwidth guarantee, and WRED on the default class. During large file uploads, `show policy-map interface` shows drops only in the default class, and calls stay clear.",
  "mistakes": [
   [
    "Shaping and policing are the same thing, so either works in both directions.",
    "A policer drops or re-marks excess with no delay and works inbound or outbound. A shaper buffers excess, adds delay, and works outbound only."
   ],
   [
    "CoS markings are carried end to end across the network.",
    "CoS lives in the 802.1Q tag and is lost on untagged links and at routed hops. DSCP in the IP header survives across routed hops."
   ],
   [
    "Putting all important traffic in the LLQ priority queue is the safest choice.",
    "The priority queue is strict and implicitly policed. Overfilling it causes drops in the priority class and harms the voice it was meant to protect. Use CBWFQ bandwidth guarantees for other important traffic."
   ],
   [
    "WRED should be enabled on the voice class to protect it.",
    "WRED helps TCP flows that back off when they lose packets. Voice is UDP-based real-time traffic that does not retransmit, so it belongs in LLQ, not under WRED."
   ]
  ],
  "tryit": [
   [
    "A branch router has a gigabit Ethernet interface connected to a provider circuit sold at 50 Mbps, and the provider polices at that rate. The engineer configured LLQ for voice on the interface, but calls are still choppy during busy hours, and `show policy-map interface` shows almost no queuing. What is wrong, and what should she change?",
    "The interface never sees congestion at gigabit speed, so LLQ never engages, while the provider's policer drops excess traffic blindly at 50 Mbps. She should apply a hierarchical policy: a parent shaper at 50 Mbps outbound with the LLQ and CBWFQ policy as its child, so queuing happens on her router where voice can go first."
   ],
   [
    "Users in an office have discovered they can set DSCP EF on their own laptops' traffic, and the priority queue on the WAN router is overflowing. Where should the fix be applied, and what should it do?",
    "At the trust boundary on the access switch ports. Trust markings from IP phones but re-mark or reset traffic from PCs, so only genuine voice arrives at the WAN router marked EF."
   ]
  ],
  "tip": "Policing drops (no delay, both directions); shaping buffers (adds delay, outbound only). CoS lives in the 802.1Q tag and disappears on untagged or routed hops; DSCP survives end to end. EF is decimal 46 and belongs in the LLQ priority queue.",
  "check": [
   [
    "Why is LLQ preferred over plain CBWFQ for voice?",
    "LLQ adds a strict-priority queue that is always serviced first, minimizing delay and jitter, while its implicit policer prevents voice from starving other classes."
   ],
   [
    "What problem does WRED address that tail drop causes?",
    "TCP global synchronization, where many flows lose packets at once, back off together and then ramp up together."
   ],
   [
    "What decimal DSCP value is EF and what traffic uses it?",
    "46, used for voice bearer traffic."
   ],
   [
    "Why is a shaper often used on a branch interface facing a provider that polices?",
    "It buffers traffic down to the contracted rate so the branch's own queuing policy decides what waits, instead of the provider's policer dropping traffic indiscriminately."
   ]
  ]
 },
 {
  "t": "Hardware and software switching: process switching, CEF, FIB, RIB, adjacency table",
  "hook": "Tom is on call for Granite Ridge Logistics when a ticket arrives: the warehouse scanners can reach every server except the inventory database, and that one is painfully slow, not down. The routing table on the core switch looks perfect, with the right prefix and the right next hop. Ping works, barely. Tom's senior colleague looks over his shoulder and says, 'The routing table is only half the story. What does the switch actually use to forward that packet?' Tom realizes he has never looked past `show ip route`. Where does a packet's forwarding decision really happen, and what could make one destination slow while the routing table says everything is fine?",
  "simple": "When a router receives a packet, it has to decide where to send it next and then put a new address label on it for the next device. There are slow and fast ways to do this. The slow way is to have the main processor think through every single packet from scratch, like a mail clerk looking up every address in a big book. The fast way, used today, is to prepare a short, ready-made cheat sheet ahead of time: one list says 'for this destination, use this next stop', and another list holds pre-printed shipping labels for each next stop. Each packet then needs just one glance at the cheat sheet and a label swap. On big switches, special chips read the cheat sheet so the main processor is not involved at all.",
  "body": [
   "A router has to make a forwarding decision for every packet: look up the destination, pick an outgoing interface and next hop, rewrite the Layer 2 header and send it. How that decision is made determines how fast the device can forward and how much work lands on its central processing unit (CPU). Cisco devices have used three generations of switching methods, process switching, fast switching and Cisco Express Forwarding (CEF), and ENCOR expects you to know how they differ and which tables are involved. Here, switching means moving a packet from an input interface to an output interface, which is a router function as much as a switch function.",
   "Process switching is the oldest and slowest method. Each packet is handed to the main CPU, which runs a process that looks up the destination in the routing table, resolves the next hop's Layer 2 address and rewrites the frame. Every packet repeats the whole lookup, including recursive lookups when a route points to a next hop that is not directly connected. That is a lot of work per packet, and a busy interface can saturate the CPU quickly. Today, process switching is used only for traffic that cannot be handled any other way, such as packets addressed to the router itself or packets needing special handling.",
   "Fast switching improved on this with a route cache. The first packet to a destination was process switched, and the result, including the Layer 2 rewrite, was cached so later packets to the same destination used the cache. The weakness was that the cache was built on demand and had to be invalidated when routes changed. A burst of traffic to many new destinations, such as a scan or a routing change, meant many first packets, each one process switched, so the CPU could still be overwhelmed exactly when the network was under stress.",
   "Cisco Express Forwarding (CEF) is the current method and is enabled by default. The key idea is that CEF builds its tables in advance from the control plane rather than on demand from traffic. The routing protocols, static routes and connected interfaces populate the RIB (Routing Information Base), which is the routing table you see with `show ip route`. The RIB is a control plane structure: it holds the best routes chosen by administrative distance and metric, but it is not organized for the fastest possible lookup.",
   "From the RIB, CEF builds the FIB (Forwarding Information Base), a copy of the best routes optimized for fast longest-match lookup, with recursive next hops already resolved. If a static route points to a next hop that is itself learned through OSPF, the FIB entry already knows the final outgoing interface and directly connected next hop. When the RIB changes, CEF updates the FIB immediately, so the two stay in step without waiting for traffic.",
   "Separately, CEF builds the adjacency table from ARP (Address Resolution Protocol) for IPv4 and neighbor discovery (ND) for IPv6. It holds the prebuilt Layer 2 rewrite header for each directly connected next hop: destination MAC, source MAC and EtherType, ready to be stamped onto the packet. A FIB entry points to an adjacency, so forwarding is a single longest-match lookup followed by a header rewrite. Because both tables are prebuilt, the first packet to a destination is forwarded as quickly as the thousandth. CEF can also load-share across equal-cost paths, by default per destination so packets in one flow stay in order.",
   "On platforms with dedicated forwarding hardware, such as Catalyst switches, the FIB and adjacency information are programmed into ASICs (application-specific integrated circuits) and TCAM (ternary content addressable memory), so forwarding happens entirely in hardware without the CPU. This is often called hardware switching, and the CPU-based versions are called software switching. On software routers, CEF runs in software on the CPU but is still far faster than process switching. Either way, the control plane builds the RIB, and the data plane uses the FIB and adjacency table derived from it.",
   "Some adjacency entries are special, and they matter for troubleshooting. A glean adjacency means the destination is on a connected subnet but ARP has not resolved it yet, so the packet is sent to the CPU to trigger ARP. A punt adjacency sends packets to the CPU for features CEF cannot handle. Drop and null adjacencies discard traffic, for example traffic to a route pointing to Null0. If a host stays in glean because ARP never completes, its traffic keeps going to the CPU and performance suffers, even though the routing table looks perfect.",
   "You can inspect these tables directly. `show ip cef` lists FIB entries, `show ip cef <prefix> detail` shows how one destination will be forwarded, including the next hop and interface, and `show adjacency detail` shows each adjacency and its rewrite information. Comparing `show ip route` with `show ip cef` is a classic step: if the RIB has the right route but the FIB or adjacency does not, the problem is in the forwarding plane, not in the routing protocol."
  ],
  "analogy": "The RIB is like a road atlas: complete, authoritative and slow to read at every intersection. CEF tears out the answers ahead of time and writes a pocket card for each destination (the FIB) that says which exit to take, and keeps a stack of pre-addressed envelopes for each neighboring town (the adjacency table). The analogy stops at glean: if the envelope for a neighbor has not been addressed yet, the packet goes back to the office (the CPU) to look up the address, which is slow.",
  "terms": [
   [
    "RIB",
    "Routing Information Base: the routing table built by routing protocols, static and connected routes; a control plane structure."
   ],
   [
    "FIB",
    "Forwarding Information Base: CEF's lookup-optimized copy of the RIB's best routes with recursive next hops resolved."
   ],
   [
    "Adjacency table",
    "CEF's table of directly connected next hops with prebuilt Layer 2 rewrite headers, built from ARP or ND."
   ],
   [
    "Process switching",
    "Forwarding each packet by a CPU process with a full routing table lookup; slowest method."
   ],
   [
    "Fast switching",
    "A legacy method that process switched the first packet to a destination and cached the result for later packets."
   ],
   [
    "CEF",
    "Cisco Express Forwarding: prebuilds the FIB and adjacency table so forwarding needs no per-destination CPU work."
   ],
   [
    "Glean adjacency",
    "An adjacency for a connected subnet whose next hop has not been resolved by ARP; packets go to the CPU to trigger resolution."
   ]
  ],
  "example": "An engineer notices traffic to one server is slow. `show ip cef 10.20.30.40 detail` shows the correct next hop, but `show adjacency detail` reveals the next hop is in glean state because ARP is failing on that VLAN, sending packets to the CPU. Fixing the VLAN mismatch lets ARP resolve and traffic returns to hardware forwarding.",
  "mistakes": [
   [
    "The FIB is just another name for the routing table.",
    "The RIB is the routing table built by the control plane. The FIB is CEF's separate, lookup-optimized copy of the best routes, with next hops already resolved, used by the data plane."
   ],
   [
    "CEF builds its entries when the first packet to a destination arrives.",
    "That describes fast switching's route cache. CEF prebuilds the FIB and adjacency table from the RIB and ARP or ND before traffic arrives."
   ],
   [
    "The FIB holds the destination MAC address for each route.",
    "The FIB points to an adjacency. The adjacency table holds the Layer 2 rewrite header, including the next hop's MAC address."
   ],
   [
    "If `show ip route` is correct, forwarding must be correct.",
    "The forwarding plane can still have a problem, such as an adjacency stuck in glean because ARP fails. Check `show ip cef` and `show adjacency` too."
   ]
  ],
  "tryit": [
   [
    "A core switch forwards normally to most subnets, but traffic to one directly connected server VLAN is slow, and CPU interrupt time is elevated. The route is present in `show ip route`. Which table should the engineer check next, and what state would explain the symptom?",
    "The adjacency table with `show adjacency detail`. If the server's entry is in glean state, ARP has not resolved, so packets are punted to the CPU to trigger ARP instead of being forwarded in hardware."
   ],
   [
    "A legacy design document says the router should be tuned so that the first packet to each new destination is cached, to handle a monthly burst of traffic to many new hosts. Is that concern still valid on a router running CEF? Why?",
    "No. CEF builds the FIB and adjacency table in advance from the RIB and ARP, so the first packet to a new destination is forwarded as fast as later ones. On-demand caching was a fast switching weakness."
   ]
  ],
  "tip": "The RIB is built by the control plane; the FIB and adjacency table are derived from it by CEF for the data plane. CEF tables are built before traffic arrives, unlike fast switching's demand-built route cache. FIB gives the next hop; adjacency gives the Layer 2 rewrite.",
  "check": [
   [
    "Where does CEF get the Layer 2 rewrite information for a next hop?",
    "From the adjacency table, which CEF builds from ARP (IPv4) or neighbor discovery (IPv6) entries."
   ],
   [
    "Why is CEF faster than fast switching for the first packet to a new destination?",
    "CEF's FIB and adjacency table are prebuilt from the RIB and ARP, while fast switching had to process switch the first packet to create a cache entry."
   ],
   [
    "What does a glean adjacency indicate?",
    "The destination is on a connected subnet but ARP has not resolved its MAC address yet, so packets go to the CPU to trigger ARP."
   ],
   [
    "On a Catalyst switch, where are the FIB and adjacency entries used for hardware forwarding stored?",
    "They are programmed into the forwarding ASICs and TCAM, so packets are forwarded without the CPU."
   ]
  ]
 },
 {
  "t": "CAM and TCAM tables and what each stores",
  "hook": "The security team at Maplewood School District has just pushed a long new access list to the access switches in every middle school. By lunchtime, a teacher at Oakview reports that the printer works but the new blocking rules on her floor seem to be ignored. Kenji, the network engineer, logs in and finds a log message he has never seen before about hardware resources being exhausted. The configuration is correct, line for line. The switch simply did not have room to put all of it where it needed to go. What kind of memory ran out, why is it so limited, and how is it different from the table that tracks MAC addresses?",
  "simple": "Switches are fast because they use special memory chips that can find an answer in one step, instead of reading a list from top to bottom. There are two kinds. The first, CAM, only answers exact questions, like checking whether a specific phone number is in a contact list. Switches use it to remember which port each device's hardware address lives on. The second, TCAM, can answer fuzzy questions, like 'find the first rule that matches any number starting with 555'. It does this by letting some digits count as 'do not care'. Switches use it for routing and security rules. TCAM is fast but costly and small, so a switch can run out of room if you give it too many rules.",
  "body": [
   "Switches forward at line rate because they perform lookups in special memory rather than searching tables in software. A software search reads entries one after another, so it gets slower as the table grows. Lookup memory compares the search key against all stored entries at once and returns the answer in a single operation. Two kinds of lookup memory matter for ENCOR: CAM and TCAM. Knowing what each holds explains why some features are fast, why some lookups need one kind and not the other, and why switches can run out of resources.",
   "CAM (content addressable memory) is searched by content rather than by address. With ordinary memory you supply an address and get back the data stored there. With CAM you supply the data and get back where it is stored, in one lookup, regardless of table size. CAM performs exact matches only: the result is either a hit or a miss, and every bit of the key must match. That makes it ideal for the MAC address table, because a destination MAC address either is or is not known. This is why the MAC address table is often called the CAM table.",
   "Each MAC address table entry maps a MAC address and VLAN to an outgoing port. The switch learns entries from the source MAC of incoming frames and ages them out after a timer, 300 seconds by default on Cisco switches, so devices that move or disappear do not leave stale entries forever. When a frame arrives, the switch looks up the destination MAC and VLAN. A hit sends the frame out one port; a miss causes flooding out every port in the VLAN except the one it arrived on. Broadcast and unknown unicast frames are flooded the same way. You view the table with `show mac address-table`, which lists VLAN, MAC address, type (dynamic or static) and port.",
   "TCAM (ternary content addressable memory) adds a third state. Each bit in a TCAM entry can be matched as 0, 1 or 'don't care', often written X. This works through a value and a mask stored for each entry: the mask marks which bits must match and which are ignored. A single lookup can therefore match ranges and prefixes rather than only exact values. A route to 10.1.1.0/24, for example, is stored with the first 24 bits significant and the last 8 bits as don't care, so any address from 10.1.1.0 to 10.1.1.255 matches it in one operation.",
   "TCAM is used for lookups where the longest or first match matters. That includes the IP routing FIB (Forwarding Information Base, where longest-prefix match decides the route), access control lists (ACLs), quality of service (QoS) classification, policy-based routing and similar features. TCAM returns the first matching entry, so entries are ordered appropriately: longer prefixes before shorter ones, so that a /24 wins over a /16 that also matches, and ACL entries in their configured order, so that the first matching line decides the action exactly as it would in software. The ACL lookup can also combine several fields, such as source, destination, protocol and port, into one wide key checked in a single pass.",
   "Because TCAM is fast but expensive, power-hungry and limited in size, switches divide it into regions for different features. On many Catalyst platforms this allocation is controlled by an SDM (Switch Database Management) template, which trades space between, for example, unicast routes, MAC addresses and ACL entries. A switch used mainly at the access layer might favor ACL and MAC capacity, while one used for routing might favor route entries. Changing the template usually requires a reload, so it is a planned change, not a quick fix during an outage.",
   "When a feature exhausts its TCAM space, the consequences are real. The switch may fail to program new entries in hardware and log an error. Traffic that cannot be handled in hardware may be punted to the CPU, which is far slower and can become overloaded, or dropped, depending on platform. Either way, a configuration that looks correct in the running config does not behave correctly. You can check utilization with platform-specific commands such as `show sdm prefer` or `show platform hardware ... resource` commands, and you reduce usage by summarizing routes, consolidating ACL entries, or choosing a template better suited to the switch's role.",
   "A simple way to remember the difference: CAM answers 'is this exact value present?' and is used for Layer 2 MAC lookups. TCAM answers 'which is the first entry that matches this value when some bits do not matter?' and is used for Layer 3 routes, ACLs and QoS. Both return results in a single lookup; the difference is whether partial matches are possible."
  ],
  "analogy": "CAM is like a coat check: you hand over ticket 417 and get exactly coat 417, or nothing. TCAM is like a mail sorter with a rack of rules such as 'any ZIP code starting with 941 goes in bin 3'; some digits do not matter, and the first rule that fits wins. The analogy stops at speed and size: a real sorter reads rules one at a time, while TCAM checks every entry at once, and the rack has a fixed number of slots that can fill up.",
  "terms": [
   [
    "CAM",
    "Content addressable memory that returns a result for an exact match in a single lookup; used for the MAC address table."
   ],
   [
    "TCAM",
    "Ternary CAM whose bits can be 0, 1 or don't care; used for prefix, ACL and QoS lookups."
   ],
   [
    "MAC address table",
    "The table mapping MAC address and VLAN to a switch port, stored in CAM; entries age out after 300 seconds by default on Cisco switches."
   ],
   [
    "Don't care bit",
    "A TCAM bit masked so it matches either 0 or 1, which allows prefix and range matching."
   ],
   [
    "Longest-prefix match",
    "The routing rule that the most specific matching route wins; TCAM achieves it by ordering longer prefixes first."
   ],
   [
    "SDM template",
    "A Catalyst setting that divides TCAM and other hardware resources among features."
   ]
  ],
  "example": "After a network team adds thousands of ACL entries for a new security policy on an access switch, some rules stop working and the log shows TCAM space warnings. Reviewing `show sdm prefer` shows the ACL region is full; they condense the ACL using object groups and summarized ranges so it fits in hardware.",
  "mistakes": [
   [
    "The CAM table stores IP routes.",
    "CAM supports exact matches only and holds the MAC address table. IP routes need longest-prefix matching, which uses TCAM."
   ],
   [
    "TCAM is slower than CAM because it handles more complex matches.",
    "Both return a result in a single lookup. TCAM's cost is price, power and limited size, not lookup speed."
   ],
   [
    "If the ACL is in the running configuration, it is enforced in hardware.",
    "If the TCAM region is full, the switch may fail to program entries; traffic may then be punted to the CPU or dropped, depending on platform. Check resource utilization."
   ],
   [
    "A miss in the MAC address table causes the frame to be dropped.",
    "A miss causes the frame to be flooded out every port in the VLAN except the one it arrived on."
   ]
  ],
  "tryit": [
   [
    "A Catalyst switch used as a small branch router suddenly logs hardware resource errors after the WAN team adds a few thousand routes from a new partner network. ACLs and MAC learning are fine. What resource is likely exhausted, and what are two ways to address it?",
    "The TCAM region for unicast routes. The engineer can summarize or filter the incoming routes so fewer entries are needed, or change the SDM template to allocate more TCAM to routes, which usually requires a planned reload."
   ],
   [
    "An access switch floods frames destined to a printer out every port in VLAN 30 for a few seconds after the printer wakes up from sleep, then stops. Is this a fault?",
    "No. The printer's MAC entry aged out while it was idle, so the destination was unknown and the switch flooded within the VLAN. As soon as the printer sent a frame, the switch relearned its source MAC and resumed forwarding to one port."
   ]
  ],
  "tip": "Exact match equals CAM (MAC addresses). Longest-prefix or masked match equals TCAM (routes, ACLs, QoS). The 'T' for ternary means the third value: don't care.",
  "check": [
   [
    "Why can't plain CAM hold the IP routing table efficiently?",
    "Routing needs longest-prefix matching with masked bits, and CAM supports only exact matches; TCAM's don't-care bits allow prefix matching in a single lookup."
   ],
   [
    "What does a switch do when the destination MAC of a frame is not in the CAM table?",
    "It floods the frame out all ports in that VLAN except the one it arrived on."
   ],
   [
    "How does TCAM make sure a /24 route is chosen over a /16 route that also matches?",
    "TCAM returns the first match, and entries are ordered with longer prefixes before shorter ones."
   ],
   [
    "What controls how TCAM space is shared among features on many Catalyst switches?",
    "The SDM template, which allocates resources among unicast routes, MAC addresses, ACLs and other features."
   ]
  ]
 },
 {
  "t": "Punted traffic and its effect on the control plane CPU",
  "hook": "At 11:40 p.m. the monitoring wall at Bayview Credit Union turns red. OSPF neighbors on the main distribution switch are flapping every few minutes, and the backup gateway keeps grabbing and dropping the HSRP active role. Rosa, on the night shift, tries to SSH in and waits almost a minute for a prompt. When she finally gets one, CPU utilization reads 97 percent. Nothing in the routing design changed today. The only change ticket from the afternoon added a single line to an access list so the security team could 'see' backup traffic. How could one harmless-looking line bring a stable switch to its knees, and how does Rosa prove it?",
  "simple": "A big network switch has two kinds of workers. The first is a team of very fast machines that move ordinary traffic along without thinking. The second is one clever but slow manager, the main processor, who keeps the maps up to date, talks to neighboring switches and lets administrators log in. Normally the fast machines handle almost everything. Some packets, though, need the manager's attention, such as messages addressed to the switch itself or packets that need special handling. Sending a packet up to the manager is called punting. If too many packets get punted, the manager is buried in paperwork, stops talking to the neighbors on time, and the network starts to fall apart even though nothing is broken.",
  "body": [
   "A network device has several planes, and punting only makes sense once you see them. The data plane forwards transit traffic, ideally in hardware using ASICs (application-specific integrated circuits) and TCAM (ternary content addressable memory). The control plane runs routing protocols, spanning tree and other processes that build forwarding tables. The management plane handles SSH (Secure Shell), SNMP (Simple Network Management Protocol) and similar access. The control and management planes run on the route processor CPU, which is far slower than the forwarding hardware. Punting is when the data plane hands a packet up to the CPU instead of forwarding it in hardware.",
   "Some punts are legitimate and necessary. Packets addressed to the device itself are punted because only the CPU can process them: routing protocol hellos and updates (OSPF, EIGRP, BGP), SSH and SNMP sessions, and pings to the device's own address. These are the packets that keep the network running and the device manageable, so the goal is never zero punts. The goal is that the CPU sees only the traffic it truly needs, at a rate it can handle.",
   "Other packets are punted because they need processing the hardware cannot do. Common examples are packets with an expired TTL (time to live), which require the CPU to generate an ICMP (Internet Control Message Protocol) time exceeded message, as traceroute relies on; packets with IP options set; traffic that needs ARP (Address Resolution Protocol) resolution, the glean adjacency; packets that must be fragmented because they exceed the egress MTU (maximum transmission unit); traffic matched by features configured with logging, such as an ACL (access control list) entry with the `log` keyword; and traffic whose TCAM entries could not be programmed because the table is full. Each of these is fine in small amounts and dangerous at high volume.",
   "Why this matters: the CPU has limited capacity, and it is shared. If too much traffic is punted, CPU utilization climbs toward 100 percent, and the processes that keep the network running then starve. Routing protocol hellos are missed and adjacencies drop, so routes are withdrawn and traffic reroutes. Spanning tree BPDUs (bridge protocol data units) are not processed on time, which can cause loops. First hop redundancy protocols flap as hellos go missing. Management access becomes slow or impossible, which makes the problem harder to fix. A single misconfiguration can take down a stable network this way, and the symptoms often look like a routing or link problem rather than a CPU problem.",
   "Punting is also an attack surface, which is why it appears in the security domain as well as infrastructure. Attackers can deliberately cause punting, for example by flooding a router with packets aimed at its own addresses or packets with expiring TTLs, as a denial of service against the control plane. They do not need to fill the link; they only need to send enough of the right kind of traffic to overwhelm the CPU. Recognizing a sudden rise in punted traffic of one type is therefore both an operations skill and a security skill.",
   "To diagnose punting, start with the CPU. `show processes cpu sorted` lists the busiest processes, and `show processes cpu history` shows a graph of recent utilization so you can see when the problem began. Read the first line carefully: in 'CPU utilization for five seconds: X%/Y%', X is the total and Y is the portion spent in interrupt context. High utilization in interrupt context suggests traffic being handled by the CPU, while high process utilization with low interrupt time points to a specific process. On Catalyst IOS XE platforms, commands such as `show platform software fed switch active punt cause summary` or a CPU packet capture can show which punt causes and queues are busy, which usually leads straight to the culprit.",
   "Protections work in layers. Control Plane Policing (CoPP) applies a quality of service (QoS) policy to traffic headed for the CPU, rate-limiting it by class, so routing protocol traffic is guaranteed room while less important traffic such as ICMP is capped. Many platforms also have hardware rate limiters for specific punt causes, and Catalyst IOS XE switches ship with a default CoPP policy. Beyond those, good hygiene reduces punts at the source: avoid the `log` keyword on high-volume ACL entries, fix MTU mismatches to reduce fragmentation, make sure ARP resolves for connected hosts, and size TCAM so features stay in hardware.",
   "Putting it together for the exam: when a question pairs high CPU with flapping adjacencies or slow management access, think punted traffic. Identify the cause with CPU and punt statistics, remove the cause where possible, and protect the CPU with CoPP so the next surge cannot starve the control plane."
  ],
  "analogy": "Think of a busy restaurant. Cooks on the line (the data plane) turn out standard orders quickly. Unusual requests go to the head chef (the CPU), who also orders supplies and talks to the suppliers (routing neighbors). If a new rule sends every order to the head chef for a signature, the chef stops answering suppliers and the kitchen runs out of food. CoPP is a host at the kitchen door who limits how many special requests reach the chef. The analogy stops at intent: an attacker can deliberately flood the chef, which no real diner would do.",
  "terms": [
   [
    "Punt",
    "Sending a packet from the hardware data plane up to the route processor CPU for software handling."
   ],
   [
    "Control plane",
    "The functions that build forwarding state, such as routing protocols and spanning tree, running on the CPU."
   ],
   [
    "Data plane",
    "The forwarding path that moves transit packets, ideally in hardware."
   ],
   [
    "Management plane",
    "The functions used to access and manage the device, such as SSH and SNMP, also running on the CPU."
   ],
   [
    "Interrupt utilization",
    "The second number in the CPU five-second line, showing CPU time spent handling packets directly; high values suggest punted traffic."
   ],
   [
    "CoPP",
    "Control Plane Policing: a QoS policy that rate-limits traffic destined to or punted to the CPU."
   ]
  ],
  "example": "After a change, a distribution switch shows 95 percent CPU and its OSPF neighbors flap. `show processes cpu sorted` shows high interrupt time, and punt statistics reveal a new ACL entry with the log keyword matching a busy backup flow. Removing the log keyword brings the traffic back into hardware and OSPF stabilizes.",
  "mistakes": [
   [
    "High CPU on a switch slows only management access; forwarding is unaffected.",
    "Hardware forwarding may continue, but a saturated CPU misses routing hellos, BPDUs and FHRP hellos, so adjacencies drop, loops can form and gateways flap."
   ],
   [
    "The goal is to stop all traffic from reaching the CPU.",
    "Routing protocol, management and other control traffic must reach the CPU. The goal is to limit punts to necessary traffic at a safe rate, for example with CoPP."
   ],
   [
    "Adding `log` to an ACL entry is harmless because it only writes messages.",
    "Logged matches are punted to the CPU. On a high-volume entry, logging can drive the CPU toward saturation."
   ],
   [
    "High process utilization and high interrupt utilization mean the same thing.",
    "High interrupt time points to packets being handled by the CPU, typically punts; high process time with low interrupt time points to a specific process."
   ]
  ],
  "tryit": [
   [
    "A core router's CPU line reads 'CPU utilization for five seconds: 92%/88%'. No routing process is near the top of `show processes cpu sorted`, but BGP sessions are timing out. What is the most likely category of cause, and what should the engineer look at next?",
    "Most of the load is interrupt time, so packets are being punted to the CPU. The engineer should check punt cause statistics or capture CPU-bound traffic to find what is being punted, such as TTL-expired packets, logged ACL matches or glean traffic, and confirm CoPP is in place."
   ],
   [
    "The security team wants to protect edge routers from floods of traffic aimed at their own addresses while making sure routing protocols always keep working. What feature should be configured, and how should it treat different traffic?",
    "Control Plane Policing. Classify CPU-bound traffic and give routing protocol and management traffic adequate rates, while tightly rate-limiting less critical classes such as ICMP and dropping clearly unwanted traffic."
   ]
  ],
  "tip": "If a question links high CPU with flapping adjacencies, think punted traffic and protect with CoPP. TTL-expired packets, IP options, glean (ARP), fragmentation and ACL logging are classic punt causes.",
  "check": [
   [
    "Name three kinds of transit traffic that are commonly punted to the CPU.",
    "Packets with TTL expiring (needing ICMP time exceeded), packets with IP options, and packets matching an ACL entry with the log keyword; also traffic needing ARP resolution or fragmentation."
   ],
   [
    "Why can excessive punting cause a routing outage?",
    "The CPU is saturated, so routing protocol hellos are not sent or processed in time, adjacencies time out and routes are withdrawn."
   ],
   [
    "In 'CPU utilization for five seconds: 60%/50%', what does the 50 percent represent?",
    "The share of CPU time spent in interrupt context, handling packets directly, which suggests punted traffic."
   ],
   [
    "What does CoPP protect, and how?",
    "The control plane CPU, by applying a QoS policy that rate-limits traffic destined to or punted to the CPU by class."
   ]
  ]
 },
 {
  "t": "Hypervisors: type 1 vs type 2, virtual machines and virtual switching",
  "hook": "The server team at Summit Valley Hospital has just consolidated forty physical servers onto four hosts, and now Ian, the network engineer, is fielding complaints. A new virtual machine (VM) for the lab system cannot reach its database, even though both sit on the same physical host. A security analyst asks why her packet capture on the access switch never shows the traffic between the web and application servers. The server team says the switch ports are 'just access ports, like before'. Ian realizes the network now extends inside the servers. What is running on those hosts, where does the switching really happen, and what does the physical network need to look like for it to work?",
  "simple": "Virtualization lets one physical computer pretend to be many separate computers. The software that does this is called a hypervisor. It splits up the real processor, memory, disk and network cards and gives each pretend computer, called a virtual machine, its own share. There are two kinds. One kind runs directly on the hardware with nothing underneath, which is what businesses use for real servers. The other kind runs as an app on your normal laptop operating system, which is handy for practice labs. The virtual machines still need to talk to each other and to the network, so the hypervisor includes a software switch, like a tiny switch living inside the computer, with the real network cables acting as its connection to the outside world.",
  "body": [
   "Virtualization lets one physical server run many isolated operating systems. The software that makes this possible is the hypervisor, also called a virtual machine monitor. It divides the server's CPU, memory, storage and network interfaces among virtual machines (VMs), each of which believes it has its own hardware. Network engineers need this knowledge because many network functions, from firewalls to SD-WAN controllers to Catalyst Center components, now run as VMs, and because servers bring their own virtual switches into the network. ENCOR expects you to tell the two hypervisor types apart, describe what makes up a VM, and explain how virtual switching connects VMs to the physical network.",
   "A type 1 hypervisor, also called a bare-metal or native hypervisor, runs directly on the server hardware without a general-purpose operating system underneath. Examples are VMware ESXi, Microsoft Hyper-V, KVM (the Kernel-based Virtual Machine built into Linux) and Xen. Because it has direct access to hardware, it is efficient and is what data centers use for production. KVM sometimes confuses learners because Linux looks like a full operating system, but KVM is part of the Linux kernel itself, which turns the kernel into the hypervisor, so it is classed as type 1.",
   "A type 2 hypervisor, also called a hosted hypervisor, runs as an application on top of a normal operating system such as Windows, macOS or Linux. Examples are VMware Workstation, VMware Fusion and Oracle VirtualBox. It is convenient for labs and desktops, for example running a virtual router image on a laptop to practice for an exam, but it has more overhead because every hardware access passes through the host operating system. It also depends on that host: if the host operating system restarts for updates, every VM on it stops.",
   "A virtual machine consists of virtual hardware, meaning virtual CPUs (vCPUs), virtual memory, virtual disks stored as files and virtual network interface cards (vNICs), plus a guest operating system and its applications. Each VM is isolated from the others and can run a different operating system, so a Linux-based controller and a Windows server can share one host. Because a VM is essentially a set of files, it can be moved, snapshotted or cloned. Features such as live migration move a running VM between hosts with minimal interruption, which requires shared storage or storage migration and matching network connectivity on both hosts. If the destination host lacks the VM's VLAN on its uplinks, the VM arrives but loses connectivity.",
   "VMs must communicate, so the hypervisor includes a virtual switch. A virtual switch is a software Layer 2 switch inside the host. Each VM's vNIC connects to a port on it, and the host's physical NICs act as uplinks to the physical network. Virtual switches support VLAN tagging, so a VM's port can be placed in a VLAN, often through a port group, and the uplink to the physical switch is typically an 802.1Q trunk carrying several VLANs. The virtual switch learns MAC addresses and forwards frames much like a physical access switch, but it is configured by the server or virtualization team in the hypervisor's management tools.",
   "Traffic between two VMs on the same host and VLAN never touches the physical network; the virtual switch forwards it in memory. That is efficient, but it changes what the network team can see and control. A SPAN (Switched Port Analyzer) session or a NetFlow export on the physical switch will not capture that traffic, and physical ACLs do not filter it. Traffic between VMs in different VLANs, or to anything outside the host, leaves through the uplink trunk to be routed or inspected in the physical network.",
   "There are several virtual switch implementations to recognize. The VMware vSphere Standard Switch is configured per host, so each host must be set up consistently by hand. The vSphere Distributed Switch is managed centrally across many hosts, which keeps port groups and VLANs identical everywhere and makes live migration safer. Microsoft provides the Hyper-V virtual switch, and Linux environments commonly use Open vSwitch. The exam is less interested in product details than in the idea that a virtual switch is a real switching layer the network depends on.",
   "For the network engineer, the key design points are practical. Configure the physical switch port facing a hypervisor as a trunk with the right allowed VLANs, not as an access port, unless the host really uses a single untagged VLAN. Use link aggregation or the hypervisor's NIC teaming consistently on both sides: if the host expects an EtherChannel and the switch is not configured for one, or the reverse, you can get flapping MAC addresses or lost traffic. Make sure every host in a cluster has the same VLANs on its uplinks so VMs can move freely. And remember that some traffic is invisible to physical monitoring tools because it stays inside the host, so visibility and security may need tools that work at the virtual switch."
  ],
  "analogy": "A type 1 hypervisor is like a building designed from the ground up as apartments, with the landlord managing the foundation directly. A type 2 hypervisor is like renting out rooms in your own house: it works, but everything passes through the homeowner's rules, and if the homeowner leaves, the tenants go too. The virtual switch is the building's internal hallway; neighbors on the same floor visit without going outside, which is why the street camera (SPAN on the physical switch) never sees them.",
  "terms": [
   [
    "Hypervisor",
    "Software that creates and runs virtual machines by sharing physical hardware among them; also called a virtual machine monitor."
   ],
   [
    "Type 1 hypervisor",
    "A bare-metal hypervisor running directly on hardware, such as ESXi, Hyper-V, KVM or Xen."
   ],
   [
    "Type 2 hypervisor",
    "A hosted hypervisor running as an application on a host operating system, such as VirtualBox, VMware Workstation or VMware Fusion."
   ],
   [
    "Virtual machine",
    "An isolated set of virtual hardware (vCPUs, memory, virtual disks, vNICs) running its own guest operating system."
   ],
   [
    "Virtual switch",
    "A software Layer 2 switch inside the hypervisor connecting virtual NICs to each other and to physical uplinks."
   ],
   [
    "Distributed virtual switch",
    "A virtual switch managed centrally across many hosts so port groups and VLANs stay consistent."
   ]
  ],
  "example": "A data center host running ESXi has two 25-gigabit NICs connected to two leaf switches as 802.1Q trunks. Web VMs sit in VLAN 110 and database VMs in VLAN 120 on the same distributed switch; web-to-web traffic stays inside the host, while web-to-database traffic goes up the trunk to the leaf switch for routing and firewall inspection.",
  "mistakes": [
   [
    "KVM is a type 2 hypervisor because it runs on Linux.",
    "KVM is built into the Linux kernel, which becomes the hypervisor with direct hardware access, so it is classed as type 1."
   ],
   [
    "The switch port facing a hypervisor host should be an access port.",
    "Hosts usually carry VMs in several VLANs, so the port is normally an 802.1Q trunk with the required VLANs allowed."
   ],
   [
    "All VM traffic passes through the physical switch, so SPAN will capture it.",
    "Traffic between VMs on the same host and VLAN is switched inside the virtual switch and never reaches the physical network."
   ],
   [
    "Type 2 hypervisors are the standard choice for production data centers.",
    "Production uses type 1 hypervisors for efficiency and direct hardware access. Type 2 suits labs and desktops."
   ]
  ],
  "tryit": [
   [
    "A VM is live-migrated from host A to host B and immediately loses network connectivity, though it worked on host A. Both hosts connect to the same pair of switches. What should the network engineer check first?",
    "The VLANs allowed on host B's uplink trunks and its virtual switch port group configuration. If host B's uplinks or port group lack the VM's VLAN, the VM moves successfully but cannot reach the network."
   ],
   [
    "A student wants to run a virtual router and a Linux VM on a Windows laptop to practice for ENCOR. A coworker suggests installing ESXi instead. Which hypervisor type fits the student's need, and why?",
    "A type 2 hypervisor such as VirtualBox or VMware Workstation, because it runs as an application on the existing Windows installation. ESXi is a type 1 hypervisor that would replace the laptop's operating system."
   ]
  ],
  "tip": "Type 1 runs on bare metal (production, data center); type 2 runs on a host OS (labs, desktops). The physical port facing a hypervisor is usually a trunk, not an access port, and same-host, same-VLAN traffic never reaches the physical switch.",
  "check": [
   [
    "Is KVM a type 1 or type 2 hypervisor, and why?",
    "Type 1, because it is part of the Linux kernel and runs VMs with direct hardware access rather than as an application on a separate host OS."
   ],
   [
    "Why might traffic between two VMs not appear in a SPAN session on the physical switch?",
    "If both VMs are on the same host and VLAN, the virtual switch forwards the traffic internally and it never reaches the physical switch."
   ],
   [
    "What is the main operational advantage of a distributed virtual switch over a per-host standard switch?",
    "It is managed centrally across many hosts, so port groups and VLANs stay consistent, which simplifies operations and supports VM mobility."
   ],
   [
    "Name the virtual hardware components that make up a VM.",
    "Virtual CPUs, virtual memory, virtual disks stored as files and virtual NICs, plus a guest operating system."
   ]
  ]
 },
 {
  "t": "Containers compared with virtual machines",
  "hook": "It is 7 a.m. at Lakeside Freight and Priya, the network automation lead, is reviewing last night's failed backup job. The script that saves every switch configuration runs on an aging virtual machine that nobody has patched in months, and it crashed after an operating system update broke a Python library. Her manager asks a simple question in the stand-up: could the team package the script as a container instead, or even run it on the core switch itself? Someone else argues that containers are just smaller virtual machines and not worth the change. Priya needs to explain what really separates the two, what each costs and when each is the right tool. Which one should carry a nightly job that must run the same way everywhere?",
  "simple": "A virtual machine is like a complete pretend computer living inside a real one. It has its own operating system, the main software that runs a computer, so it is big and takes time to start, but it is well walled off from its neighbors. A container is lighter. It borrows the operating system that is already running on the real computer and only brings the app and the small pieces the app needs. Think of a house versus an apartment: each house has its own foundation and plumbing, while apartments share the building's foundation and pipes but still have locked doors. Apartments are cheaper and faster to move into, but a crack in the shared foundation affects everyone.",
  "body": [
   "Containers are another way to isolate applications, and they have become the standard way to package modern software, including many network tools and some Cisco applications. The ENCOR exam asks you to understand how containers differ from virtual machines (VMs) and when each fits. The single idea that explains almost every difference is where the operating system kernel lives, so keep that question in mind as you read.",
   "Start with the virtual machine. A VM virtualizes hardware. The hypervisor presents virtual CPUs, memory, disks and network adapters, and each VM runs its own complete guest operating system with its own kernel. That gives strong isolation and lets you run different operating systems side by side, for example Windows and Linux on the same host. The cost is size and start time: each VM carries a full operating system, typically gigabytes on disk, and boots like a real computer, running firmware, loading a kernel and starting services. Each guest also has to be patched, licensed and monitored as if it were a separate server.",
   "A container virtualizes the operating system instead. All containers on a host share the host's kernel. The container engine, such as Docker or containerd, uses Linux kernel features to isolate processes: namespaces give each container its own view of process IDs, network interfaces, mount points and host name, and control groups (cgroups) limit how much CPU and memory each container can consume. A container image contains only the application and the libraries it needs, not a kernel. Images are built in layers, so a base layer such as a minimal Linux user space can be shared by many images, and they are often only megabytes. Starting a container takes about as long as starting a process, because nothing has to boot. As a result you can run many more containers than VMs on the same hardware.",
   "The trade-offs follow directly from that shared kernel. Because containers share the host kernel, they must be compatible with it: Linux containers need a Linux kernel, so you cannot run a Windows application container directly on a Linux host the way you could run a Windows VM. Isolation is also weaker than a VM's, since a kernel vulnerability or a container breakout can affect every container on the host. That is why container security practices matter: run processes as a non-root user, use minimal images with fewer packages to exploit, scan images for known vulnerabilities before deployment, and pull images only from trusted registries.",
   "Each approach therefore has natural workloads. VMs are better for running different operating systems on one host, for legacy applications that expect a full server, and for workloads that need strong isolation, such as separating tenants. Containers are better for microservices, fast scaling, consistent environments from a developer laptop to production, and automated deployment pipelines where a new version is built, tested and shipped as an image. In practice the two are often combined rather than chosen exclusively: many organizations run their containers inside VMs, getting the VM's isolation boundary around a group of lightweight containers.",
   "Once you have many containers across many hosts, someone has to manage them. An orchestrator schedules containers onto hosts, restarts failed ones, scales the number of copies up and down and connects them to each other. Kubernetes is the most common orchestrator. Container networking uses virtual interfaces and bridges on each host, so each container gets its own interface and address, and orchestrators add overlay networks so containers on different hosts can talk as if they shared a segment. That overlay idea will feel familiar when you study VXLAN later.",
   "Cisco network devices also host containers, which is the part of this topic most specific to ENCOR. Many Catalyst IOS XE switches and routers support application hosting, which lets you run a Docker container on the device, for example a monitoring agent, a packet capture tool or a troubleshooting utility, isolated from the IOS XE processes so that a misbehaving app does not crash the switch. Guest Shell is a built-in Linux container environment on IOS XE that lets you run Python scripts on the device itself, for instance to react to events or collect show command output locally. These features use the same container principles: shared kernel, isolated processes and controlled resources.",
   "When an exam question describes a requirement, map it to the kernel question. Needs a different operating system, a full legacy server or a strong isolation boundary: choose a VM. Needs fast startup, high density, portable packaging or frequent automated deployment: choose a container. Needs to run a small tool directly on a Catalyst switch: think application hosting or Guest Shell."
  ],
  "analogy": "A VM is a detached house: its own foundation, wiring and plumbing, which is why it can be built in any style and a fire next door rarely spreads, but it is expensive and slow to build. Containers are apartments in one building: they share the foundation and plumbing (the host kernel), so they are cheap and quick to occupy. The analogy stops at style: every apartment must fit the building's structure, just as every container must match the host's operating system family.",
  "terms": [
   [
    "Container",
    "An isolated process environment that shares the host operating system kernel and packages an application with its dependencies."
   ],
   [
    "Virtual machine",
    "A software computer created by a hypervisor that runs its own complete guest operating system and kernel."
   ],
   [
    "Container image",
    "A portable, layered package of an application and its libraries used to start containers."
   ],
   [
    "Namespaces and cgroups",
    "Linux kernel features that isolate a container's view of the system and limit its resource use."
   ],
   [
    "Kubernetes",
    "A container orchestration platform that schedules, scales and heals containers across a cluster of hosts."
   ],
   [
    "Guest Shell",
    "A built-in Linux container environment on Cisco IOS XE used to run Python scripts on the device."
   ]
  ],
  "example": "A network team packages its configuration backup script with Python and its libraries into a small container image. It runs identically on a laptop, a Linux server and a Kubernetes cluster, and it starts in about a second each night, whereas the old approach needed a dedicated VM that took minutes to boot and patch.",
  "mistakes": [
   [
    "Containers are just small virtual machines with their own kernel.",
    "Containers have no kernel of their own. They are isolated processes sharing the host kernel, which is exactly why they are small and fast."
   ],
   [
    "A Linux host can run any container, including a Windows application container.",
    "Containers must match the host kernel family. To run a different operating system you need a VM, or a VM of that OS hosting its containers."
   ],
   [
    "Containers isolate workloads as strongly as VMs.",
    "A shared kernel means a kernel flaw can affect all containers. VMs offer the stronger boundary; containers rely on hardening practices such as non-root users and image scanning."
   ],
   [
    "You must choose containers or VMs, never both.",
    "Running containers inside VMs is a very common design that combines VM isolation with container density."
   ]
  ],
  "tryit": [
   [
    "Harbor Clinic must run an old billing application that requires a specific Windows Server release, alongside several small Linux-based monitoring tools that the team updates weekly. The only host available runs a Linux-based hypervisor. How would you place each workload?",
    "Run the billing application in a VM, because it needs its own Windows kernel and benefits from strong isolation. Package the monitoring tools as containers, possibly inside a Linux VM, because they share a Linux kernel, update often and start quickly."
   ],
   [
    "An engineer wants a small Python script to run directly on a Catalyst 9300 switch whenever an interface goes down, without a separate server. What container-based feature fits?",
    "Guest Shell, the built-in Linux container on IOS XE, runs Python scripts on the device. For a packaged third-party tool, IOS XE application hosting can run a Docker container instead."
   ]
  ],
  "tip": "The core distinction is the kernel: every VM has its own guest OS kernel; containers share the host kernel. That is why containers are lighter and faster but less isolated and must match the host OS family.",
  "check": [
   [
    "Why do containers start faster than virtual machines?",
    "They do not boot an operating system; they are isolated processes sharing the already running host kernel."
   ],
   [
    "When would you choose a VM over a container?",
    "When you need a different operating system from the host, strong isolation, or you are running a legacy application not designed for containers."
   ],
   [
    "Which kernel features provide container isolation and resource limits?",
    "Namespaces isolate the container's view of processes, network and file system; cgroups limit CPU and memory."
   ]
  ]
 },
 {
  "t": "VRF and VRF-Lite: separate routing tables, overlapping addresses, per-VRF routing",
  "hook": "On Monday morning, Marcus at Northgate Outfitters inherits a problem from last week's acquisition. The newly purchased company uses 10.10.0.0/16 internally, and so does Northgate. Leadership wants both networks connected to the same core routers by Friday, but renumbering thousands of devices will take months. Meanwhile, the security team also wants guest Wi-Fi traffic kept completely apart from the payment systems on those same routers. Marcus opens a terminal, types `show ip route`, and sees one table holding everything. Can one router really keep two identical address ranges, and a guest network, apart without buying new hardware?",
  "simple": "A router normally keeps one list of directions, called a routing table, telling it where to send traffic. A VRF lets one router keep several separate lists, as if it were several routers in one box. Each list has its own connections, and traffic in one list cannot see the others unless you deliberately allow it. Because the lists are separate, the same address can appear in two of them without confusion. It is like a hotel with two guests both named Alex Kim: the front desk keeps them straight because each has a different room key. VRF-Lite simply means doing this router by router, using a separate link or sub-link for each list between routers.",
  "body": [
   "A VRF (virtual routing and forwarding instance) splits one physical router into several logical routers. Each VRF has its own routing table, its own CEF (Cisco Express Forwarding) table and its own set of interfaces. Traffic in one VRF cannot reach another VRF unless you deliberately leak routes between them. A useful way to remember the idea is that VRFs are the Layer 3 equivalent of VLANs: a VLAN separates a switch into several broadcast domains, and a VRF separates a router into several routing domains. Both are key tools for segmentation.",
   "Independent tables make overlapping addresses possible. Because each VRF has its own routing table, the same IP prefix can exist in two VRFs at once without conflict. This is how service providers carry many customers who all use 10.0.0.0/8, and how an enterprise can keep a merged company's overlapping addresses separate until renumbering is finished. The same mechanism is used purely for security: isolating guest traffic, out-of-band management, building systems or payment card environments from the corporate network, so that even a routing mistake in one domain cannot send packets into another.",
   "VRF-Lite means using VRFs without MPLS (Multiprotocol Label Switching). Each router keeps its VRFs separate locally, and between routers you carry each VRF on its own interface or, more commonly, its own 802.1Q subinterface or VLAN, with a separate routing protocol instance or address family per VRF. The separation is maintained hop by hop: VRF GUEST on router A connects to VRF GUEST on router B over subinterface .20, VRF CORP over subinterface .10, and so on. This works well for a handful of VRFs across a few hops, but it grows awkward at scale because every link needs a subinterface, an address and a routing adjacency per VRF. In MPLS Layer 3 VPNs, by contrast, MP-BGP (multiprotocol BGP) carries all VRFs' routes across a shared core, using route distinguishers to keep overlapping prefixes unique and route targets to control which VRFs import which routes, while MPLS labels keep the traffic separate.",
   "Configuration on modern IOS XE follows a clear order: create the VRF, enable its address families, then assign interfaces. Assigning an interface to a VRF removes any IP address already on it, so you configure `vrf forwarding` before the IP address. If you apply it afterward, the router warns you and you must re-enter the address.",
   "```\nvrf definition GUEST\n address-family ipv4\n exit-address-family\n!\ninterface GigabitEthernet0/1.20\n encapsulation dot1Q 20\n vrf forwarding GUEST\n ip address 10.1.20.1 255.255.255.0\n!\nrouter ospf 2 vrf GUEST\n network 10.1.20.0 0.0.0.255 area 0\n```",
   "Older syntax and per-protocol details also appear on the exam. The legacy commands `ip vrf NAME` and `ip vrf forwarding NAME` still work for IPv4-only VRFs, while `vrf definition` supports both IPv4 and IPv6 address families. Routing protocols run per VRF, but each protocol expresses that differently. OSPF uses a separate process per VRF, as in `router ospf 2 vrf GUEST` above. EIGRP and BGP use address families under one process, for example `address-family ipv4 vrf GUEST`. Static routes name the VRF explicitly: `ip route vrf GUEST 0.0.0.0 0.0.0.0 10.1.99.1` installs a default route only in the GUEST table.",
   "Troubleshooting commands must include the VRF too, and forgetting this is the most common mistake in labs. `show ip route` shows only the global table, so a VRF's routes seem to be missing; use `show ip route vrf GUEST`. Likewise use `ping vrf GUEST 10.1.20.10` and `traceroute vrf GUEST 10.1.20.10`, because a plain ping is sourced from the global table and fails even when the VRF works perfectly. `show vrf` lists the VRFs and their interfaces, which quickly reveals an interface placed in the wrong one. `show ip protocols vrf GUEST` and `show ip ospf neighbor` help confirm per-VRF routing.",
   "Sometimes VRFs need to share something, such as internet access or a common DNS server. Route leaking makes that possible: static routes that point into another VRF, BGP route-target import and export, or route replication features can place selected prefixes from one table into another. Leaking should be as deliberate and narrow as the security design allows, because every leaked route is a hole in the separation the VRF was built to provide. Overlapping addresses also complicate leaking, since a prefix that exists in both VRFs cannot simply be imported, which is one reason shared services often sit behind NAT or on unique addresses."
  ],
  "analogy": "A router with VRFs is like an office building where several companies rent floors. They share the elevators and the street address (the physical router and links), but each floor has its own locked door and its own internal room numbers, so two companies can both have a Room 101. Visitors only reach another floor if building management grants access, which is route leaking. The analogy stops at the elevator: in VRF-Lite, each floor actually needs its own dedicated elevator car (subinterface) between buildings.",
  "mnemonic": "Configure a VRF in DAI order: Define the VRF and its address family, Assign the interface with vrf forwarding, then IP address it last, because assigning the VRF wipes the address.",
  "terms": [
   [
    "VRF",
    "Virtual routing and forwarding: an isolated routing and forwarding table with its own interfaces on a router."
   ],
   [
    "VRF-Lite",
    "Using VRFs hop by hop without MPLS, typically with one subinterface per VRF between devices."
   ],
   [
    "Route leaking",
    "Deliberately importing routes from one VRF into another so selected traffic can cross between them."
   ],
   [
    "Route distinguisher",
    "A value prepended to prefixes in MPLS VPNs so overlapping prefixes from different VRFs stay unique in MP-BGP."
   ],
   [
    "Route target",
    "A BGP extended community that controls which VRFs export and import particular routes in MPLS VPNs."
   ]
  ],
  "example": "After acquiring another company, an enterprise finds both use 10.10.0.0/16. The engineers place the acquired company's links in a VRF named ACQ on the core routers. Both networks keep working unchanged, and only shared services such as email are reachable through carefully leaked routes until the acquired network is renumbered.",
  "mistakes": [
   [
    "Running `ping 10.1.20.10` from the router proves whether a VRF host is reachable.",
    "A plain ping uses the global table. Use `ping vrf GUEST 10.1.20.10`; otherwise a working VRF looks broken."
   ],
   [
    "You can add `vrf forwarding` to an interface at any time without side effects.",
    "Applying vrf forwarding removes the interface's IP address. Configure the VRF first and the address afterward."
   ],
   [
    "VRF-Lite uses MPLS labels and MP-BGP to carry many VRFs over one link.",
    "That describes MPLS L3VPN. VRF-Lite has no labels; each VRF needs its own interface or subinterface and routing instance hop by hop."
   ],
   [
    "OSPF, EIGRP and BGP all run a separate process per VRF.",
    "OSPF uses a separate process per VRF; EIGRP and BGP use per-VRF address families under one process."
   ]
  ],
  "tryit": [
   [
    "At Ridgeview College, the guest network is in VRF GUEST on the distribution router. A technician reports that guest clients cannot reach the internet. `show ip route` on the router shows a default route, and `ping 203.0.113.10` to an internet test address succeeds from the router. What should you check next?",
    "Those tests used the global table. Check `show ip route vrf GUEST` for a default route in the guest table and test with `ping vrf GUEST`. The fix is likely a static route such as `ip route vrf GUEST 0.0.0.0 0.0.0.0 <next hop>` or a deliberate leak toward the internet edge."
   ]
  ],
  "tip": "When a lab says a host is unreachable but the interface is up, check whether you forgot the vrf keyword in ping, traceroute or show ip route. Also remember that applying vrf forwarding to an interface deletes its IP address.",
  "check": [
   [
    "How can two customers both use 192.168.1.0/24 on the same router?",
    "By placing each customer's interfaces in a separate VRF, so each prefix lives in its own routing table."
   ],
   [
    "What does VRF-Lite lack compared with MPLS L3VPN?",
    "It has no MPLS labels or MP-BGP VPN routes; each VRF must be carried hop by hop on separate interfaces or subinterfaces."
   ],
   [
    "Which command pings 10.1.20.10 inside VRF GUEST?",
    "ping vrf GUEST 10.1.20.10"
   ],
   [
    "How does EIGRP run inside a VRF compared with OSPF?",
    "EIGRP uses an address family (address-family ipv4 vrf NAME) under one process; OSPF uses a separate process per VRF."
   ]
  ]
 },
 {
  "t": "GRE tunnels: configuration, keepalives, recursive routing problems, MTU and MSS",
  "hook": "At 2:10 a.m., Dana on the night shift at Copperline Logistics gets paged: the tunnel between the Denver and Omaha warehouses keeps flapping. Every few minutes the log fills with a message saying Tunnel0 was temporarily disabled due to recursive routing, then the tunnel comes back, EIGRP neighbors reform, and it all collapses again. Earlier that evening a colleague made what he called a harmless tidy-up to the EIGRP configuration. To make things stranger, users at Omaha have complained for weeks that some web pages hang while small pings work fine. Dana suspects both problems come from how GRE wraps packets. What is the tunnel actually doing, and how does she stop it?",
  "simple": "A GRE tunnel puts a packet inside another packet, like putting a letter inside a second envelope addressed to a far-away office. The outside network only reads the outer envelope, so the inner letter can carry private addresses or routing messages the outside world would not understand. Three things trip people up. First, the tunnel can look up even when the far end is dead unless you turn on keepalives, small are-you-there checks. Second, the router must reach the far office without using the tunnel itself, or it would be trying to mail the envelope inside itself. Third, the extra envelope adds weight, so big packets no longer fit and must be made smaller.",
  "body": [
   "Generic Routing Encapsulation (GRE) is a simple tunneling protocol that wraps one packet inside another. The original packet, which can be IPv4, IPv6 or even multicast and routing protocol traffic, becomes the payload of a new IP packet with a GRE header, using IP protocol number 47. GRE lets you build a virtual point-to-point link across a network that does not know about your addresses, such as the internet, and run routing protocols over it as if the two routers were directly connected. GRE provides no encryption or authentication of its own, which is why it is often combined with IPsec (IP Security) when it crosses untrusted networks.",
   "It helps to name the two layers before configuring anything. The underlay is the transport network that carries the outer packets between the routers' public or provider addresses. The overlay is the virtual network inside the tunnel, with its own tunnel subnet and the private prefixes the routing protocol exchanges. A basic GRE tunnel needs a tunnel interface on each router with three things: an IP address for the tunnel itself (the overlay), a tunnel source (a local interface or address in the underlay) and a tunnel destination (the far router's underlay address).",
   "```\ninterface Tunnel0\n ip address 172.16.0.1 255.255.255.252\n tunnel source GigabitEthernet0/0\n tunnel destination 203.0.113.2\n ip mtu 1400\n ip tcp adjust-mss 1360\n```",
   "Tunnel status can be misleading, so understand what makes it come up. The default tunnel mode is `tunnel mode gre ip`. A tunnel interface comes up as soon as the router has a route to the tunnel destination and the source interface is up, even if the far end is down or misconfigured. In other words, up/up on a GRE tunnel proves only local reachability, not a working path. GRE keepalives fix this: `keepalive 10 3` sends a keepalive every 10 seconds and brings the line protocol down after 3 missed replies. Running a routing protocol over the tunnel also detects failure through its own hellos, which is often the more useful signal because routes are withdrawn when neighbors drop.",
   "Recursive routing is the classic GRE problem and the cause of Dana's flapping tunnel. The router must reach the tunnel destination through the underlay. If a routing protocol running over the tunnel ever learns a better route to the tunnel destination through the tunnel itself, the router would have to send the tunnel's packets through the tunnel, which is impossible. IOS detects this, logs a message saying the tunnel is temporarily disabled due to recursive routing, and the tunnel goes down. When it goes down the bad route disappears, the underlay route returns, the tunnel comes back up, the routing protocol relearns the bad route, and the cycle repeats. Prevent it by never advertising the underlay, meaning the tunnel source and destination networks, into the routing protocol running over the tunnel. Practical methods include using separate protocols or processes for underlay and overlay, filtering with distribute lists or route maps, narrowing network statements to the tunnel and LAN subnets, or using static routes for the underlay.",
   "MTU (maximum transmission unit) is the next trap. GRE adds overhead: 20 bytes for the new IP header plus 4 bytes of basic GRE header, so 24 bytes in total. On a standard 1500-byte Ethernet path, a full-size original packet no longer fits and must be fragmented or dropped. Setting `ip mtu` on the tunnel, commonly 1400 to leave room for IPsec later, makes the router fragment before encapsulating, or, if the original packet has the don't-fragment bit set, drop it and signal the sender with an ICMP (Internet Control Message Protocol) message. Many networks block ICMP, so Path MTU Discovery can fail silently. The symptom is exactly what the Omaha users report: small packets such as pings and the start of a web session work, but large transfers hang.",
   "TCP MSS (maximum segment size) adjustment solves that symptom for TCP traffic. `ip tcp adjust-mss` makes the router rewrite the MSS value in TCP SYN packets passing through the interface, so both hosts agree to send segments small enough to fit the tunnel without depending on ICMP. The MSS is the MTU minus 40 bytes of IPv4 and TCP headers, so an MTU of 1400 pairs with an MSS of 1360. Non-TCP traffic still relies on fragmentation or on the application choosing small packets.",
   "Verification ties it together. `show interfaces tunnel 0` displays the tunnel source, destination, mode, keepalive settings and line protocol state. `show ip interface brief` gives a quick up/down view. Ping across the tunnel with large packets and the don't-fragment bit, for example `ping 172.16.0.2 size 1400 df-bit`, to prove the configured MTU really fits end to end. When the tunnel flaps, look at the log for the recursive routing message and compare `show ip route` for the tunnel destination: it must point out the physical interface, never out Tunnel0."
  ],
  "analogy": "GRE is like mailing a sealed letter inside a larger courier envelope. The courier (underlay) only reads the outer address, so the inner letter can carry anything. Recursive routing is like telling the courier the fastest way to the destination office is to put the envelope inside itself, which can never work. MTU is the courier's size limit: the outer envelope adds bulk, so a letter that used to fit now needs trimming. The analogy stops at privacy: a real envelope hides the letter, but GRE does not encrypt anything.",
  "terms": [
   [
    "GRE",
    "Generic Routing Encapsulation: a tunneling protocol (IP protocol 47) that carries one packet inside another without encryption."
   ],
   [
    "Tunnel source and destination",
    "The underlay addresses the GRE packets use between the two tunnel endpoints."
   ],
   [
    "Recursive routing",
    "A failure where the route to the tunnel destination points through the tunnel itself, causing the tunnel to go down."
   ],
   [
    "MSS",
    "Maximum segment size: the largest TCP payload a host will accept, normally MTU minus 40 bytes."
   ],
   [
    "GRE keepalive",
    "Periodic probes that bring the tunnel line protocol down when the far end stops responding."
   ],
   [
    "Underlay and overlay",
    "The underlay is the transport network carrying outer packets; the overlay is the virtual network inside the tunnel."
   ]
  ],
  "example": "Two branches build a GRE tunnel over the internet and run EIGRP across it. Someone adds `network 0.0.0.0` under EIGRP, which advertises the public interfaces into EIGRP. Each router learns the other's public address via the tunnel, the log reports recursive routing, and the tunnel flaps until the network statement is narrowed to the tunnel and LAN subnets.",
  "mistakes": [
   [
    "A GRE tunnel that shows up/up proves the far end is reachable.",
    "Without keepalives, the tunnel is up whenever the destination is routable locally. Enable keepalives or rely on routing protocol hellos to detect a dead peer."
   ],
   [
    "GRE encrypts traffic because it is a tunnel.",
    "GRE only encapsulates. Add IPsec for confidentiality and integrity."
   ],
   [
    "Recursive routing is fixed by raising the tunnel's MTU.",
    "It is a routing problem: the tunnel destination is learned through the tunnel. Keep underlay prefixes out of the overlay routing protocol."
   ],
   [
    "ip tcp adjust-mss should equal the ip mtu value.",
    "MSS is the TCP payload size, so it is the MTU minus 40 bytes of IPv4 and TCP headers: 1400 MTU pairs with 1360 MSS."
   ]
  ],
  "tryit": [
   [
    "At Bluewater Pharmacy, a new GRE tunnel between two stores shows up/up and OSPF neighbors are full. Users can ping servers across the tunnel and load small pages, but file uploads stall partway through. The tunnel has no ip mtu or adjust-mss configured. What is the most likely cause and fix?",
    "GRE's 24 bytes of overhead push full-size packets over the 1500-byte path MTU, and blocked ICMP breaks Path MTU Discovery. Set `ip mtu 1400` and `ip tcp adjust-mss 1360` on both tunnel interfaces, then verify with `ping ... size 1400 df-bit`."
   ],
   [
    "A tunnel's far-end router has been powered off for an hour, yet the local Tunnel0 still shows up/up and static routes still point into it, black-holing traffic. What single interface command would make the tunnel reflect the failure?",
    "`keepalive 10 3` (or similar values). After three missed keepalives the line protocol goes down, and routes pointing into the tunnel are removed."
   ]
  ],
  "tip": "A GRE tunnel is up/up whenever the destination is routable, even if the far end is dead, unless keepalives are enabled. GRE adds 24 bytes; set ip mtu and ip tcp adjust-mss (MTU minus 40).",
  "check": [
   [
    "What causes the log message that a tunnel was temporarily disabled due to recursive routing?",
    "The best route to the tunnel destination was learned through the tunnel itself, usually because underlay addresses were advertised into the routing protocol running over the tunnel."
   ],
   [
    "If the tunnel ip mtu is 1400, what should ip tcp adjust-mss be set to?",
    "1360, which is 1400 minus 20 bytes of IP header and 20 bytes of TCP header."
   ],
   [
    "How many bytes of overhead does basic GRE over IPv4 add, and from what?",
    "24 bytes: a 20-byte outer IP header and a 4-byte GRE header."
   ]
  ]
 },
 {
  "t": "IPsec: IKE phases, tunnel vs transport mode, crypto maps vs tunnel protection",
  "hook": "The new branch of Pinecrest Savings opens Monday, and on Friday afternoon Jordan is still staring at a VPN that will not come up. The headquarters firewall team insists their side is correct. On the branch router, `show crypto isakmp sa` shows the peer stuck in MM_NO_STATE, and `show crypto ipsec sa` shows zero packets encrypted. The project manager asks whether they should just switch to a different kind of VPN configuration she read about, something called tunnel protection, and whether that would also let OSPF run between the sites. Jordan needs to know which stage of negotiation is failing and what each configuration style really offers. Where does an IPsec tunnel break, and how do you read the clues?",
  "simple": "IPsec is a set of rules that lets two routers send private, tamper-proof traffic across a public network like the internet. Before they can do that, they hold a two-step conversation. In step one they prove who they are and build a safe, private phone line just for talking. In step two, over that private line, they agree on exactly how to lock up the real data. Then the data flows, scrambled so outsiders cannot read it. IPsec can either wrap the whole original packet in a new outer one, hiding where it came from, or protect only the contents. It is like sending a package in a locked box inside a plain shipping box versus just locking the original box.",
  "body": [
   "IPsec (IP Security) is a framework of protocols that protects IP traffic with confidentiality (encryption), integrity (a hash-based message authentication code, or HMAC), authentication of the peers and anti-replay protection, which stops an attacker from recording packets and sending them again. It is used for site-to-site VPNs between routers and firewalls and for remote access. ENCOR focuses on three things: how the tunnel is negotiated, how packets are encapsulated, and the two main ways to configure it on Cisco IOS.",
   "Negotiation comes first. Before any data is protected, the peers must agree on algorithms and keys, and that is the job of IKE (Internet Key Exchange). In IKEv1, phase 1 builds a secure management channel called the ISAKMP (Internet Security Association and Key Management Protocol) or IKE security association (SA). The peers negotiate encryption, hash, authentication method (pre-shared key or certificates), Diffie-Hellman group and lifetime; run a Diffie-Hellman exchange to create shared keying material without ever sending the key itself; and authenticate each other. Phase 1 uses main mode, six messages that protect the peers' identities, or aggressive mode, three messages that are faster but expose identity information. If the proposals do not match, for example a different Diffie-Hellman group, phase 1 never completes, and `show crypto isakmp sa` stays in a state such as MM_NO_STATE. A healthy phase 1 SA shows QM_IDLE.",
   "Phase 2, called quick mode, runs inside the protected phase 1 channel and negotiates the IPsec SAs that actually protect data: the transform set (for example ESP with AES and SHA-2), the traffic to protect, and lifetimes. IPsec SAs are one-directional, so each tunnel has at least one pair, one inbound and one outbound. IKEv2 streamlines this into an initial exchange of four messages, IKE_SA_INIT and IKE_AUTH, that creates the IKE SA and the first child SA together. It has built-in support for features such as NAT traversal and dead peer detection, and additional child SAs can be created later. The phase names change, but the logic is the same: first a protected control channel, then data SAs.",
   "Two protocols can protect the data itself. ESP (Encapsulating Security Payload, IP protocol 50) provides encryption plus integrity and anti-replay, and it is what you use in practice. AH (Authentication Header, IP protocol 51) provides integrity and authentication only, with no encryption, and it does not work through NAT (network address translation) because its integrity check covers the outer IP header, which NAT rewrites. When NAT is detected between peers, ESP is encapsulated in UDP port 4500, a technique called NAT traversal (NAT-T); IKE itself uses UDP port 500. A firewall between the peers must therefore allow UDP 500, UDP 4500 and, without NAT-T, IP protocol 50.",
   "IPsec also has two modes, which describe how much of the packet is wrapped. In tunnel mode, the entire original IP packet, header and all, is encrypted and a new outer IP header is added between the VPN gateways. This is the normal mode for site-to-site VPNs because it hides the internal source and destination addresses and lets gateways protect traffic on behalf of whole subnets. In transport mode, only the payload is protected and the original IP header is kept. Transport mode is used when the endpoints themselves are the traffic source and destination, for example to protect a GRE tunnel between two routers, since GRE already provides a new outer header and a second one would waste bytes.",
   "Configuration on IOS comes in two styles. The older method is the crypto map. You define an ISAKMP policy, a transform set, and an ACL (access control list) that identifies interesting traffic, then bind them in a crypto map applied to the physical outgoing interface. Traffic matching the ACL is encrypted; anything else leaves in the clear. This is policy-based: the ACL, not the routing table, decides what is protected. Routing protocols and multicast do not work across it naturally, and the ACLs must mirror each other on both peers or phase 2 fails.",
   "The modern method is tunnel protection. You create an IPsec profile that references a transform set and apply it to a tunnel interface with `tunnel protection ipsec profile NAME`. Everything routed into the tunnel interface is encrypted, so the routing table decides what is protected. This is route-based and supports routing protocols, multicast, per-interface features and simpler configuration. It is the basis of GRE over IPsec, virtual tunnel interfaces (VTIs) and DMVPN (Dynamic Multipoint VPN), so the project manager's suggestion would indeed let OSPF run between the sites.",
   "Verification follows the two phases. Use `show crypto isakmp sa` for IKEv1 or `show crypto ikev2 sa` for IKEv2 to check the control channel, and `show crypto ipsec sa` to check the data SAs, where the pkts encaps and pkts decaps counters should increase in both directions. Encrypt counters rising on one side with decrypt counters stuck on the other usually points to a routing, ACL or filtering problem along the path rather than a negotiation failure."
  ],
  "analogy": "IPsec negotiation is like two embassies arranging a diplomatic pouch. In phase 1 the ambassadors meet, check credentials and set up a private meeting room. In phase 2, inside that room, they agree on the locks and codes for the pouches that will carry actual documents, one set for each direction. Tunnel mode puts the whole letter, envelope and addresses included, inside a sealed pouch; transport mode only locks the letter's contents and leaves the original envelope visible. The analogy stops at the room: in IPsec, the phase 1 channel keeps existing to renegotiate keys.",
  "mnemonic": "Phase 1 policy values to match, HAGLE: Hash, Authentication method, Group (Diffie-Hellman), Lifetime, Encryption. A mismatch in any of them leaves phase 1 incomplete.",
  "terms": [
   [
    "IKE phase 1",
    "Negotiates and authenticates the IKE (ISAKMP) SA, a secure channel for further negotiation."
   ],
   [
    "IKE phase 2",
    "Quick mode, which negotiates the IPsec SAs that protect user data."
   ],
   [
    "ESP",
    "Encapsulating Security Payload (IP protocol 50): provides encryption, integrity and anti-replay."
   ],
   [
    "AH",
    "Authentication Header (IP protocol 51): integrity and authentication without encryption; incompatible with NAT."
   ],
   [
    "Tunnel mode",
    "Encrypts the whole original packet and adds a new outer IP header; typical for site-to-site VPNs."
   ],
   [
    "Transport mode",
    "Protects only the payload and keeps the original IP header; used when endpoints are the traffic endpoints, such as GRE over IPsec."
   ],
   [
    "Tunnel protection",
    "Applying an IPsec profile to a tunnel interface to encrypt all traffic routed through it."
   ]
  ],
  "example": "An engineer troubleshooting a new VPN runs `show crypto isakmp sa` and sees the state stuck in MM_NO_STATE, meaning phase 1 never completed. Comparing ISAKMP policies reveals one side uses a different Diffie-Hellman group. After matching them, phase 1 reaches QM_IDLE and `show crypto ipsec sa` shows encrypt and decrypt counters increasing.",
  "mistakes": [
   [
    "AH is the better choice when you need encryption and integrity.",
    "AH provides no encryption and breaks with NAT. ESP provides encryption, integrity and anti-replay, and works through NAT using NAT-T on UDP 4500."
   ],
   [
    "Transport mode is the normal choice for site-to-site VPNs between gateways.",
    "Tunnel mode is normal for gateway-to-gateway VPNs because it hides internal addresses. Transport mode fits when the routers are themselves the endpoints, such as GRE over IPsec."
   ],
   [
    "A crypto map will carry OSPF hellos between sites as long as the ACL permits the subnets.",
    "Crypto maps are policy-based and do not naturally carry multicast routing traffic. Use tunnel protection on a GRE or VTI tunnel."
   ],
   [
    "Phase 2 builds the secure channel used to authenticate peers.",
    "Phase 1 authenticates peers and builds the IKE SA; phase 2 (quick mode) runs inside it and negotiates the data SAs."
   ]
  ],
  "tryit": [
   [
    "At Granite Ridge Dental, `show crypto isakmp sa` on the branch shows QM_IDLE, but `show crypto ipsec sa` shows no IPsec SAs for the expected subnets, and the log reports a proxy identities mismatch. The VPN uses a crypto map. What should the engineer compare?",
    "Phase 1 is fine, so the failure is in phase 2. Compare the interesting traffic ACLs on both peers: they must be mirror images (source and destination swapped). Also confirm the transform sets match."
   ]
  ],
  "tip": "Crypto maps are policy-based (ACL chooses traffic, applied to the physical interface); tunnel protection is route-based (routing chooses traffic, applied to a tunnel interface) and supports routing protocols and multicast. AH breaks with NAT; ESP with NAT-T uses UDP 4500.",
  "check": [
   [
    "Which IPsec mode hides the original source and destination addresses?",
    "Tunnel mode, because it encrypts the whole original packet and adds a new outer header."
   ],
   [
    "Why is tunnel protection better than a crypto map for running OSPF across a VPN?",
    "Tunnel protection encrypts everything routed through a tunnel interface, which supports multicast routing protocol traffic; crypto maps only match unicast interesting traffic defined by ACL."
   ],
   [
    "What does phase 2 negotiate that phase 1 does not?",
    "The IPsec SAs for user data: transform set, protected traffic and their keys and lifetimes."
   ],
   [
    "Which ports and protocols must a firewall allow between IPsec peers using NAT-T?",
    "UDP 500 for IKE and UDP 4500 for NAT-T encapsulated ESP (and IP protocol 50 if NAT-T is not used)."
   ]
  ]
 },
 {
  "t": "GRE over IPsec and virtual tunnel interfaces for routing protocols over VPNs",
  "hook": "Elena manages the network for Willow Creek Hospitals, and she has a problem that sounds simple. The new clinic is connected to headquarters with an encrypted crypto map VPN, and traffic flows, but OSPF never forms an adjacency across it. Every new subnet at the clinic means another static route and another ACL entry on both ends, and last week a typo in one of those entries took the lab results system offline for an hour. The security officer refuses any unencrypted tunnel across the internet. Elena wants encryption and dynamic routing together, with less to maintain. She has heard of two designs that do this. Which one fits a single clinic, and what changes on the routers?",
  "simple": "Businesses want two things from a link across the internet: secrecy, so nobody can read the traffic, and automatic directions, so routers can tell each other about new networks without someone typing them in. One older method gives secrecy but cannot pass the group messages routers use to share directions. A GRE tunnel can pass those messages but has no secrecy. Two fixes combine both. GRE over IPsec puts the GRE tunnel inside encryption, like putting a mail bag inside a locked truck. A virtual tunnel interface, or VTI, is a simpler built-in secure tunnel that behaves like a normal cable between the routers, so the routers can talk to each other through it.",
  "body": [
   "Enterprises want two things from a site-to-site VPN: encryption across an untrusted network, and dynamic routing so that sites learn each other's prefixes and fail over automatically. The tools you already know each deliver only half. GRE (Generic Routing Encapsulation) alone gives you routing but no encryption. A classic crypto map gives encryption but does not carry multicast, so routing protocols such as OSPF (Open Shortest Path First) and EIGRP (Enhanced Interior Gateway Routing Protocol), which use multicast hellos, do not work across it. Two designs combine the strengths: GRE over IPsec and IPsec virtual tunnel interfaces (VTIs).",
   "GRE over IPsec layers the two technologies. You build a normal GRE tunnel and then encrypt the GRE packets. The routing protocol runs over the GRE tunnel interface just as it would over a physical link, and all its multicast and unicast traffic is encapsulated in GRE, which is unicast between the two router addresses, so IPsec can protect it. The modern way to configure it is to apply an IPsec profile to the tunnel interface: `tunnel protection ipsec profile VPN-PROF`. Because GRE already adds a new IP header between the routers, IPsec can use transport mode, which saves the 20 bytes of an extra outer header; tunnel mode also works. The older approach applies a crypto map to the physical interface with an ACL matching GRE (IP protocol 47) between the tunnel endpoints, which still works but brings back the maintenance burden of crypto maps.",
   "A static VTI removes GRE entirely. You create a tunnel interface with `tunnel mode ipsec ipv4` and apply the IPsec profile. The tunnel interface is itself an IPsec endpoint, so traffic routed into it is encrypted in IPsec tunnel mode directly, with no GRE header. It still behaves like a routable point-to-point interface, so routing protocols, including their multicast hellos, work across it. You can apply QoS (quality of service), ACLs and NetFlow on the tunnel interface, and the configuration is simpler than a crypto map because the routing table, not an ACL, decides what is encrypted. A VTI also uses less overhead than GRE over IPsec because there is no GRE header.",
   "```\ncrypto ipsec profile VPN-PROF\n set transform-set TS-AES\n!\ninterface Tunnel10\n ip address 10.255.0.1 255.255.255.252\n tunnel source GigabitEthernet0/0\n tunnel destination 198.51.100.2\n tunnel mode ipsec ipv4\n tunnel protection ipsec profile VPN-PROF\n```",
   "Reading the configuration shows how familiar it is. The IPsec profile references a transform set, and the IKE policy and key or certificate configuration still have to exist exactly as they would for any IPsec tunnel. The tunnel interface looks like a GRE tunnel, with an overlay address, a tunnel source and a tunnel destination. The only differences are the `tunnel mode ipsec ipv4` line, which replaces the default GRE mode, and the `tunnel protection` line. Remove the `tunnel mode` line and you have GRE over IPsec instead; the protection line stays the same.",
   "Choose between the designs by what the tunnel must carry and how many sites it must serve. A VTI carries only one protocol family per tunnel, IPv4 or IPv6 depending on the mode (`tunnel mode ipsec ipv6` for IPv6), and it does not carry non-IP traffic. GRE can carry multiple protocols over one tunnel and supports multipoint GRE (mGRE), which is the foundation of DMVPN (Dynamic Multipoint VPN), where spokes register with a hub using NHRP (Next Hop Resolution Protocol) and build tunnels to each other on demand. For a simple site-to-site link with IPv4 routing, a VTI is usually the cleanest choice. On the hub side, dynamic VTIs, cloned from a virtual template when a peer connects, allow many remote peers to connect without a separate tunnel configuration for each.",
   "All the GRE lessons still apply. Avoid recursive routing by keeping underlay addresses, the tunnel source and destination networks, out of the overlay routing protocol. Account for overhead, too: encryption adds ESP (Encapsulating Security Payload) headers, an initialization vector, padding and an integrity check value on top of any GRE header, so tunnels commonly use `ip mtu 1400` and `ip tcp adjust-mss 1360` to avoid fragmentation and stalled TCP sessions.",
   "Verification works layer by layer. `show crypto isakmp sa` or `show crypto ikev2 sa` confirms the control channel. `show crypto ipsec sa` should show packet encapsulation and decapsulation counters increasing in both directions. `show interfaces tunnel 10` displays the tunnel mode, source, destination and protection profile. Finally, the routing protocol's neighbor table, for example `show ip ospf neighbor`, confirms that the adjacency formed over the tunnel and that prefixes are being exchanged."
  ],
  "analogy": "GRE over IPsec is like putting a regular mail bag (GRE, which can hold any kind of letter, including group mailings) into an armored truck (IPsec). A VTI is an armored truck with its own built-in compartments, so you do not need the bag at all, which saves space. The trade-off is that the built-in compartments fit only one kind of cargo per truck, IPv4 or IPv6, while the mail bag can mix types and can be routed to many destinations, as DMVPN does.",
  "terms": [
   [
    "GRE over IPsec",
    "A GRE tunnel whose packets are encrypted by IPsec, allowing routing protocols and multicast across an encrypted VPN."
   ],
   [
    "Static VTI",
    "An IPsec virtual tunnel interface (tunnel mode ipsec ipv4) that encrypts all traffic routed into it without a GRE header."
   ],
   [
    "Dynamic VTI",
    "A VTI cloned from a virtual template on a hub when a remote peer connects, avoiding per-peer tunnel configuration."
   ],
   [
    "IPsec profile",
    "A named set of IPsec parameters, such as the transform set, applied to a tunnel interface with tunnel protection."
   ],
   [
    "DMVPN",
    "Dynamic Multipoint VPN: hub-and-spoke mGRE plus NHRP and IPsec, letting spokes build direct tunnels on demand."
   ]
  ],
  "example": "A company links its headquarters and a branch with a crypto map but finds that OSPF never forms an adjacency across it. It replaces the crypto map with a static VTI on each router and runs OSPF on the tunnel interfaces. The adjacency forms, branch prefixes appear in the headquarters routing table, and traffic counters rise in `show crypto ipsec sa`.",
  "mistakes": [
   [
    "A VTI is just GRE with encryption turned on.",
    "A static VTI has no GRE header at all; tunnel mode ipsec ipv4 makes the tunnel interface a native IPsec endpoint, which is why it has less overhead."
   ],
   [
    "A VTI can carry IPv4, IPv6 and non-IP traffic on one tunnel.",
    "A VTI carries one IP family per tunnel. Use GRE when you need multiple protocols on one tunnel or multipoint designs."
   ],
   [
    "GRE over IPsec must use IPsec tunnel mode.",
    "Transport mode is enough and saves 20 bytes because GRE already supplies the outer header between the routers; tunnel mode also works."
   ],
   [
    "Adding encryption to a tunnel removes the need to worry about recursive routing.",
    "Recursive routing is about the underlay route to the tunnel destination. It applies to GRE over IPsec and VTIs just as it does to plain GRE."
   ]
  ],
  "tryit": [
   [
    "Summit Outdoor Gear has one headquarters and one warehouse. It needs encrypted connectivity and EIGRP for IPv4 between them, with QoS applied to the tunnel. No IPv6 or multipoint design is planned. Which design should the engineer choose and why?",
    "A static VTI. It supports EIGRP multicast hellos, allows QoS on the tunnel interface, has less overhead than GRE over IPsec, and its single-family limitation does not matter because only IPv4 is required."
   ],
   [
    "The same company later plans 40 branches that should reach each other directly without hairpinning through headquarters. Does the VTI design still fit?",
    "Not as well. Spoke-to-spoke on-demand tunnels need multipoint GRE with NHRP and IPsec, which is DMVPN, so GRE-based tunnels become the better foundation."
   ]
  ],
  "tip": "If the scenario needs multicast or a routing protocol across an encrypted tunnel, pick GRE over IPsec or a VTI, not a crypto map. A VTI has less overhead but carries a single IP family; GRE can carry multiple protocols and supports multipoint designs.",
  "check": [
   [
    "Why can GRE over IPsec use IPsec transport mode?",
    "GRE already adds a new outer IP header between the routers, so IPsec only needs to protect the GRE payload, saving the extra outer header."
   ],
   [
    "Which tunnel mode command turns a tunnel interface into a static VTI?",
    "tunnel mode ipsec ipv4 (or ipsec ipv6 for IPv6)."
   ],
   [
    "Why does OSPF fail across a classic crypto map but work across a VTI?",
    "OSPF uses multicast hellos that crypto maps do not naturally carry; a VTI is a routable interface that encrypts everything routed into it, including multicast."
   ]
  ]
 },
 {
  "t": "LISP: EID, RLOC, map server and map resolver, ITR and ETR",
  "hook": "Tomas is preparing for the design review at Brightwater University, which is moving its campus to a software-defined fabric. The vendor's slides keep mentioning LISP, and the chief architect asks Tomas to explain it to the committee in plain terms. Why should a laptop keep the same IP address as a student walks from the library to the engineering building? How does a switch in one building find a device in another without every switch holding every route on campus? A committee member, a physics professor, asks the sharpest question: if an address tells you both who a device is and where it is, what happens when the device moves? Tomas realizes that question is the whole point of LISP.",
  "simple": "On a normal network, a device's IP address works like both its name and its home address at the same time. If it moves, its address has to change. LISP splits these apart. Each device keeps a permanent name-like address, and the network separately tracks which router it is currently sitting behind, its current location. A central directory stores the pairing. When a router needs to reach a device, it asks the directory where that device is right now, remembers the answer for a while, and sends the traffic wrapped up toward that location. It is like a phone contact for a friend: their name stays the same when they move, and you just look up their current address before visiting.",
  "body": [
   "LISP (Locator/ID Separation Protocol) addresses a basic limitation of IP: an IP address says both who a device is and where it is. When a device moves, its address has to change, or the network has to carry a specific route for it everywhere, and every prefix that must be reachable ends up in routing tables across the network. LISP separates those two roles into two address spaces and adds a mapping system between them. It is the control plane of Cisco SD-Access (Software-Defined Access), so ENCOR expects you to know its components and message flow.",
   "Start with the two address types. The EID (endpoint identifier) is the address of the endpoint, such as a host's IP address. EIDs identify who the device is and stay the same when it moves. The RLOC (routing locator) is the address of the LISP router that the EID sits behind, usually a loopback reachable in the underlay. RLOCs identify where the device is. The key benefit follows immediately: the underlay core only needs to route RLOCs, a small and stable set of router addresses. It does not need to know about EID prefixes at all, which keeps core routing tables small and stable even as hosts come, go and move.",
   "The mapping system is the directory that stores which EIDs live behind which RLOCs. It has two functions, often run on the same device. The map server (MS) receives registrations: LISP routers send Map-Register messages saying 'these EID prefixes are reachable via my RLOC.' The map resolver (MR) receives Map-Request queries from routers that need to find an EID and forwards them toward the map server, which either passes the request to the authoritative ETR or, if the ETR asked it to, sends a proxy Map-Reply on its behalf. In SD-Access, the control plane node runs both the map server and map resolver roles, and it is the fabric's single source of truth for where endpoints are.",
   "LISP routers have roles named by the direction of traffic. The ITR (ingress tunnel router) receives packets from local hosts headed to a remote EID. It looks up its map cache; if there is no entry, it sends a Map-Request to the map resolver, receives a Map-Reply with the RLOC, caches it, and encapsulates the packet with an outer header addressed to that RLOC. The ETR (egress tunnel router) is the router in front of the destination EIDs. It registers its EIDs with the map server, answers Map-Requests, and decapsulates arriving packets and delivers them to the local host. A router that does both is an xTR, which is the usual case for a site edge or an SD-Access edge node, since every site both sends and receives.",
   "Not everything speaks LISP, so proxy roles connect the two worlds. Proxy ITRs and proxy ETRs (PITR and PETR) connect LISP sites with non-LISP networks: a PITR attracts traffic from non-LISP sites destined to EIDs and encapsulates it into the LISP network, while a PETR receives traffic from LISP sites headed to non-LISP destinations and forwards it natively. This is similar to how a border node in SD-Access connects the fabric to the rest of the enterprise and the internet.",
   "The flow is demand-based, much like DNS (Domain Name System). Routers pull only the mappings they need, when they need them, and cache them, rather than every router holding every route in advance. This pull model keeps state small on edge devices and makes mobility easy. When a host moves to a new site, the new ETR detects it and registers the same EID with its own RLOC. The map server updates the mapping, and the old ETR or the map server signals ITRs that still have stale cache entries to refresh them, for example with a Solicit-Map-Request. The host keeps its address, existing sessions can continue, and the underlay routing never changes.",
   "Finally, separate the control plane from the data plane. Traditional LISP uses its own data plane encapsulation over UDP port 4341, with control messages such as Map-Register and Map-Request on UDP port 4342. SD-Access keeps the LISP control plane but uses VXLAN (Virtual Extensible LAN) for the data plane, so it can carry Layer 2 frames and the Scalable Group Tag (SGT) used for segmentation policy. On the exam, if a question asks which protocol tells the fabric where an endpoint is, the answer is LISP; if it asks which protocol encapsulates the traffic in SD-Access, the answer is VXLAN.",
   "A good way to check your understanding is to trace who talks to whom. ETRs talk to the map server to register. ITRs talk to the map resolver to look up. Data flows from ITR to ETR, encapsulated from one RLOC to another. Hosts never see any of this; they simply send packets to EIDs."
  ],
  "analogy": "LISP works like a company directory for employees who hot-desk. An employee's name (EID) never changes, but their desk location (RLOC) does. When someone arrives at a desk, they check in with the front desk (Map-Register to the map server). When a courier needs to deliver a package, they ask the front desk where that person is sitting today (Map-Request to the map resolver), write the desk number on the outside (encapsulation) and remember it for a while (map cache). The analogy stops at the mailroom: the courier does not get the package forwarded automatically when the person moves; stale caches must be refreshed.",
  "terms": [
   [
    "EID",
    "Endpoint identifier: the address that identifies a host and stays with it when it moves."
   ],
   [
    "RLOC",
    "Routing locator: the underlay address of the LISP router through which an EID is reachable."
   ],
   [
    "Map server",
    "Receives Map-Register messages from ETRs and stores EID-to-RLOC mappings."
   ],
   [
    "Map resolver",
    "Receives Map-Request queries from ITRs and resolves them to the correct RLOC."
   ],
   [
    "ITR and ETR",
    "Ingress tunnel router encapsulates traffic toward a remote RLOC; egress tunnel router registers local EIDs and decapsulates arriving traffic."
   ],
   [
    "PITR and PETR",
    "Proxy tunnel routers that connect LISP sites with non-LISP networks."
   ]
  ],
  "example": "Host 10.1.1.10 at site A sends a packet to 10.2.2.20 at site B. Site A's ITR has no cache entry, so it sends a Map-Request to the map resolver. Site B's ETR had registered 10.2.2.0/24 with RLOC 192.0.2.2, so the ITR learns that mapping, caches it and encapsulates the packet to 192.0.2.2, where the ETR decapsulates and delivers it.",
  "mistakes": [
   [
    "The ITR sends Map-Register messages to announce its local hosts.",
    "Registration is the ETR's job, sent to the map server. The ITR sends Map-Requests to the map resolver to look up remote EIDs."
   ],
   [
    "The RLOC is the host's address and the EID is the router's address.",
    "It is the reverse. The EID identifies the endpoint; the RLOC locates the router the endpoint sits behind."
   ],
   [
    "Every LISP router learns every EID prefix in advance, like a routing protocol.",
    "LISP is pull-based: ITRs request mappings on demand and cache them, which keeps state small."
   ],
   [
    "SD-Access uses LISP for both control and data planes.",
    "SD-Access uses LISP as the control plane and VXLAN as the data plane."
   ]
  ],
  "tryit": [
   [
    "At Oakridge Medical Center, a nurse's tablet roams from the east wing, behind RLOC 192.0.2.10, to the west wing, behind RLOC 192.0.2.20. A few seconds later some traffic to the tablet still arrives at the east wing router. Which LISP components act to correct this, and what changes?",
    "The west wing ETR registers the tablet's unchanged EID with its own RLOC at the map server, which updates the mapping. ITRs holding the old cache entry are prompted to refresh, for example with a Solicit-Map-Request, and then encapsulate traffic to 192.0.2.20. The tablet keeps its IP address and the underlay routing does not change."
   ]
  ],
  "tip": "Registration goes to the map server (ETR sends Map-Register); lookups go to the map resolver (ITR sends Map-Request). Identity is the EID; location is the RLOC.",
  "check": [
   [
    "Which LISP device sends Map-Register messages and to whom?",
    "The ETR, to the map server, advertising the EID prefixes reachable behind its RLOC."
   ],
   [
    "Why does LISP make host mobility easier?",
    "The host keeps its EID; only the EID-to-RLOC mapping changes when it moves, so the underlay routing does not change."
   ],
   [
    "What does the ITR do when it has no map-cache entry for a destination EID?",
    "It sends a Map-Request to the map resolver, caches the RLOC from the Map-Reply and encapsulates the packet toward that RLOC."
   ]
  ]
 },
 {
  "t": "VXLAN: VNI, VTEP, UDP encapsulation, overlay vs underlay",
  "hook": "The data center team at Meridian Insurance is out of room. Spanning tree incidents keep taking down whole rows of racks, the VLAN numbering plan is nearly exhausted after years of new projects and acquisitions, and the application owners still demand that some servers in different rooms share one Layer 2 segment. Aisha, the lead engineer, proposes rebuilding on a routed spine-leaf fabric with VXLAN on top. During the design meeting, a skeptical colleague asks how you can have a single LAN stretched across a fully routed network, and why the plan mentions jumbo frames on every link. Aisha needs a crisp answer. How does VXLAN make a routed network look like one big switch?",
  "simple": "VXLAN lets computers in different parts of a network act as if they are plugged into the same local switch, even though the network between them is made of routers. The switch at the edge takes each frame, which is a chunk of network data, wraps it in an extra layer with a label saying which private network it belongs to, and sends it across the routed network to the other edge switch, which unwraps it. The label allows about 16 million separate private networks, compared with about 4,000 for older VLANs. Think of shipping containers: each has a tag showing whose goods are inside, and trucks just carry containers between depots without caring what is inside.",
  "body": [
   "VXLAN (Virtual Extensible LAN) is an encapsulation that carries Layer 2 Ethernet frames across a Layer 3 IP network. It solves two problems of traditional VLANs. First, the 12-bit VLAN ID allows only about 4,000 segments, which is not enough for large data centers and multitenant clouds. Second, stretching VLANs across a network requires Layer 2 trunks and spanning tree, which limit scale, block redundant links and create large failure domains where one loop can affect everything. VXLAN lets you build Layer 2 segments on top of a routed network instead. It is the data plane of Cisco SD-Access (Software-Defined Access) and of most modern data center fabrics.",
   "Each VXLAN segment is identified by a VNI (VXLAN network identifier), a 24-bit value, giving about 16 million possible segments. A VNI plays the role a VLAN ID plays in a traditional network, and a switch typically maps a local VLAN to a VNI at the edge. Two kinds of VNI appear in fabric designs. A Layer 2 VNI represents a bridged segment, so hosts in it share a broadcast domain. A Layer 3 VNI is used for routed traffic between segments that belong to the same VRF (virtual routing and forwarding instance), so tenants keep their routing separate across the fabric.",
   "The device that does the work is the VTEP (VXLAN tunnel endpoint). A VTEP can be a physical switch, such as a leaf switch or an SD-Access edge node, or a software switch in a hypervisor. It has an IP address in the underlay, usually a loopback. When a host sends a frame, the VTEP builds the encapsulation from the inside out: an 8-byte VXLAN header containing the VNI, then a UDP header, then an outer IP header from its own address to the destination VTEP's address, and finally an outer Ethernet header for the next hop. The standard destination UDP port is 4789. The source UDP port is usually derived from a hash of the inner frame's headers, which gives the underlay's equal-cost multipath (ECMP) load balancing some entropy, so different flows between the same two VTEPs spread across different paths.",
   "That encapsulation has a cost you must plan for. The total overhead is about 50 bytes: 14 for the outer Ethernet header, 20 for outer IPv4, 8 for UDP and 8 for VXLAN. A host sending a full 1500-byte packet therefore produces an outer packet that will not fit a standard 1500-byte underlay link. VXLAN frames are not supposed to be fragmented, so the underlay MTU (maximum transmission unit) must be raised, for example to 9000 for jumbo frames or at least about 1550, on every underlay link. Forgetting one link produces the classic symptom of small pings succeeding while large transfers fail.",
   "This design creates a clean split between underlay and overlay. The underlay is the physical routed IP network, often a spine-leaf fabric running OSPF (Open Shortest Path First), IS-IS (Intermediate System to Intermediate System) or BGP (Border Gateway Protocol), whose only job is to deliver packets between VTEP addresses, ideally across multiple equal-cost paths. The overlay is the set of VXLAN segments that hosts see, with their own MAC and IP addresses, independent of the underlay topology. You can add a segment, move a workload or create a new tenant without touching underlay routing, and an underlay link failure simply reroutes VTEP-to-VTEP traffic.",
   "VTEPs also need to learn which remote VTEP a destination MAC address lives behind, and they must handle broadcast, unknown unicast and multicast (BUM) traffic. The original VXLAN approach used flood-and-learn: BUM traffic was sent to an underlay multicast group per VNI, and VTEPs learned remote MAC addresses from the source of the traffic they received, much like a traditional switch. Modern fabrics use a control plane instead. BGP EVPN (Ethernet VPN) is used in most data centers to advertise MAC and IP reachability between VTEPs. LISP is used in SD-Access, where edge nodes query the control plane node. A control plane reduces flooding, speeds convergence and enables features such as distributed anycast gateways, where every leaf acts as the default gateway for a segment.",
   "Remember that VXLAN itself provides no encryption; it is purely an encapsulation. Traffic between VTEPs crosses the underlay readable by anyone who can capture it, so where confidentiality matters, encryption must come from somewhere else, such as MACsec on links or IPsec. In a packet capture, you would see an outer Ethernet and IP header between two loopbacks, UDP destination port 4789, a VXLAN header with the VNI, and then the complete original Ethernet frame, readable in clear text."
  ],
  "analogy": "VXLAN works like a shipping container network. The VTEP is a port depot that packs each customer's goods (the Ethernet frame) into a container labeled with a customer number (the VNI) and an address of the destination depot (the outer IP header). Trucks and highways (the underlay) only read depot addresses and can use any of several roads (ECMP). The receiving depot unpacks the goods unchanged. The analogy stops at security: VXLAN containers have no lock, so anyone on the road can look inside.",
  "terms": [
   [
    "VXLAN",
    "An encapsulation that carries Ethernet frames inside UDP over an IP network."
   ],
   [
    "VNI",
    "VXLAN network identifier: a 24-bit segment ID, allowing about 16 million segments."
   ],
   [
    "VTEP",
    "VXLAN tunnel endpoint: the device that encapsulates and decapsulates VXLAN traffic, identified by an underlay IP address."
   ],
   [
    "UDP 4789",
    "The IANA-assigned destination port for VXLAN."
   ],
   [
    "BGP EVPN",
    "A control plane that advertises MAC and IP reachability between VTEPs, reducing flood-and-learn behavior."
   ],
   [
    "BUM traffic",
    "Broadcast, unknown unicast and multicast traffic that must reach multiple VTEPs in a segment."
   ]
  ],
  "example": "Two servers in the same application tier sit on leaves in different racks. Server A sends a frame to server B's MAC in VNI 10100. Leaf 1, acting as VTEP, encapsulates it in UDP port 4789 toward leaf 4's loopback, the spines route it using ECMP, and leaf 4 decapsulates it and delivers the original frame, so both servers believe they share a LAN.",
  "mistakes": [
   [
    "The VNI is 12 bits like a VLAN ID, so VXLAN only helps with spanning tree, not scale.",
    "The VNI is 24 bits, giving about 16 million segments compared with about 4,000 VLANs."
   ],
   [
    "VXLAN encrypts traffic between VTEPs because it is a tunnel.",
    "VXLAN is encapsulation only. Use MACsec or IPsec where confidentiality is required."
   ],
   [
    "VXLAN uses TCP so that frames are delivered reliably.",
    "VXLAN uses UDP with destination port 4789; the variable source port helps ECMP spread flows."
   ],
   [
    "The default 1500-byte MTU is fine on the underlay.",
    "VXLAN adds about 50 bytes, so the underlay MTU must be raised (jumbo frames or at least about 1550) to avoid drops."
   ]
  ],
  "tryit": [
   [
    "At Cedar Valley Credit Union, a new VXLAN fabric passes pings between servers in VNI 20010, but database replication between the same servers stalls on large transfers. All leaf-to-spine links were raised to MTU 9216 except one link added last week, which is still at 1500. What is the problem?",
    "VXLAN adds about 50 bytes, so full-size frames encapsulated over the 1500-byte link exceed its MTU and are dropped, while small pings fit. Raise that link's MTU to match the rest of the underlay."
   ],
   [
    "An architect must choose how VTEPs learn remote MAC addresses in a large data center and wants to minimize flooding and support a distributed anycast gateway. What should she choose?",
    "A control plane such as BGP EVPN, which advertises MAC and IP reachability between VTEPs, rather than flood-and-learn with underlay multicast."
   ]
  ],
  "tip": "Know the numbers: VNI is 24 bits (about 16 million segments) versus 12-bit VLAN IDs, VXLAN uses UDP destination port 4789, and it adds about 50 bytes, so raise the underlay MTU.",
  "check": [
   [
    "What does a VTEP add to an Ethernet frame?",
    "A VXLAN header with the VNI, a UDP header (destination 4789), an outer IP header between VTEP addresses and an outer Ethernet header."
   ],
   [
    "Why is the VXLAN UDP source port usually variable?",
    "It is derived from a hash of the inner frame's headers so the underlay's ECMP can spread different flows across multiple paths."
   ],
   [
    "Which control plane does SD-Access use for VXLAN, and which do most data centers use?",
    "SD-Access uses LISP; most data center fabrics use BGP EVPN."
   ]
  ]
 },
 {
  "t": "Layer 2: static and dynamic 802.1Q trunking (DTP), allowed VLANs and native VLAN",
  "hook": "Halfway through a Tuesday maintenance window at Riverbend School District, Sam types one command to add the new security camera VLAN to an uplink. Seconds later the help desk lights up: teachers in two buildings have lost network access. Sam stares at the configuration and sees the problem, then notices something else that worries him more. The switch log shows repeated warnings about a native VLAN mismatch on another link, and a classroom port is negotiating as a trunk with a device a student plugged in. Sam is responsible for every one of those settings. What makes a link a trunk, which VLANs ride on it, and how did one command cut off two buildings?",
  "simple": "A trunk is a cable between switches that carries traffic for many separate virtual networks, called VLANs, at once. To keep them apart, each piece of traffic gets a small label saying which VLAN it belongs to. One VLAN, the native VLAN, travels without a label, so both ends must agree on which VLAN that is, or traffic ends up in the wrong place. Switches can figure out on their own whether a cable should be a trunk, but that convenience can be abused, so it is safer to set it by hand. It is like a building's shared elevator carrying visitors from several companies: each visitor wears a badge, and the doorman must know which company the unbadged visitors belong to.",
  "body": [
   "A trunk is a switch link that carries traffic for multiple VLANs (virtual LANs). On a trunk, IEEE 802.1Q inserts a 4-byte tag into each Ethernet frame, containing the 12-bit VLAN ID and the 3-bit CoS (class of service) priority. The receiving switch reads the tag and places the frame in the correct VLAN, then removes the tag before delivering the frame to an access port. Trunks connect switches to each other, to routers doing router-on-a-stick, and to hypervisors, wireless LAN controllers and other devices that must reach several VLANs over one link.",
   "The simplest and most predictable trunk is a static one. You make a trunk with `switchport mode trunk`. Many Catalyst switches that also support the old Cisco ISL (Inter-Switch Link) encapsulation require `switchport trunk encapsulation dot1q` first, and they reject the trunk mode command until it is set; newer platforms support only 802.1Q and do not need it. A port set to `switchport mode access` is never a trunk and carries one VLAN untagged, which is exactly what a user port should do.",
   "Cisco's Dynamic Trunking Protocol (DTP) negotiates trunking automatically. `switchport mode dynamic desirable` actively tries to form a trunk; `switchport mode dynamic auto` forms a trunk only if the other side asks. The results follow from who initiates. Desirable with desirable, auto or trunk makes a trunk, because at least one side is asking. Auto with auto stays an access link, because neither side initiates. Trunk with access is a misconfiguration that causes problems, because one side tags frames that the other does not expect. The default mode varies by platform, with many current Catalyst switches defaulting to dynamic auto, so never assume what an unconfigured port will do.",
   "Best practice is to disable negotiation entirely. Hard-code trunks with `switchport mode trunk` plus `switchport nonegotiate`, which stops the port from sending DTP frames, and hard-code user ports with `switchport mode access`. This avoids surprises and prevents an attacker from negotiating a trunk from an access port, an attack called switch spoofing, in which a device pretends to be a switch to gain access to every VLAN on the trunk. Verify the result with `show interfaces trunk`, which lists only operational trunks, and `show interfaces gi1/0/1 switchport`, which shows both the administrative mode you configured and the operational mode the port actually reached, plus whether negotiation is on.",
   "By default a trunk carries all VLANs, which is rarely what you want. Restrict it with `switchport trunk allowed vlan 10,20,30` so that only the VLANs a downstream switch needs cross the link, reducing unnecessary broadcast traffic and limiting the reach of problems. Be careful when editing: typing that command again with a different list replaces the whole list, which is a common way to cut off production VLANs, as Sam just discovered. Use `switchport trunk allowed vlan add 40` or `switchport trunk allowed vlan remove 40` to change it incrementally. `show interfaces trunk` shows three lists for each trunk: the allowed VLANs, the VLANs allowed and active in the management domain, and those in spanning tree forwarding state and not pruned.",
   "The native VLAN is the one VLAN whose frames cross the trunk untagged. By default it is VLAN 1. Both ends must agree; if they don't, untagged frames from one side's native VLAN arrive in a different VLAN on the other side, silently leaking traffic between VLANs and breaking connectivity for hosts in both. Cisco Discovery Protocol (CDP) detects this and reports a native VLAN mismatch in the log, which is the warning Sam saw. Change it with `switchport trunk native vlan 999`, configured identically on both ends.",
   "The native VLAN also matters for security. In a VLAN hopping attack by double tagging, an attacker on an access port in the native VLAN sends a frame with two 802.1Q tags. The first switch strips the outer tag, because it matches the native VLAN and native frames leave the trunk untagged, and forwards the frame with the inner tag still present onto the trunk. The next switch reads that inner tag and places the frame in the victim VLAN. The attack is one-way, but it can still deliver traffic where it should never go. Defenses are to set the native VLAN to an unused VLAN with no users, avoid using VLAN 1 for anything, or tag the native VLAN with `vlan dot1q tag native` so no frames cross untagged. Also shut down unused ports and place them in an unused VLAN, and disable DTP on access ports to stop switch spoofing."
  ],
  "analogy": "A trunk is like a shared hotel shuttle carrying guests from several hotels, each wearing a hotel badge (the 802.1Q tag). The native VLAN is the rule for guests without badges: both drivers must agree which hotel they belong to, or unbadged guests get dropped at the wrong hotel. DTP is like letting anyone at the curb claim to be a shuttle driver; safer hotels hire drivers by name instead. The analogy stops at the badge itself: a real guest cannot wear two badges to sneak in, but a double-tagged frame can.",
  "terms": [
   [
    "802.1Q",
    "The IEEE trunking standard that inserts a 4-byte tag with a 12-bit VLAN ID into Ethernet frames."
   ],
   [
    "DTP",
    "Dynamic Trunking Protocol: Cisco protocol that negotiates whether a link becomes a trunk."
   ],
   [
    "Native VLAN",
    "The VLAN whose frames are sent untagged on an 802.1Q trunk; must match on both ends."
   ],
   [
    "Allowed VLAN list",
    "The set of VLANs permitted to cross a trunk, set with switchport trunk allowed vlan."
   ],
   [
    "Switchport nonegotiate",
    "Disables DTP frames on a port."
   ],
   [
    "Switch spoofing",
    "An attack in which a device negotiates a trunk with a switch port to reach multiple VLANs."
   ]
  ],
  "example": "An engineer needs to add VLAN 50 to an uplink and types `switchport trunk allowed vlan 50`. Immediately, users in VLANs 10 and 20 on that switch lose connectivity, because the command replaced the allowed list. The fix is `switchport trunk allowed vlan 10,20,50`, and in future `switchport trunk allowed vlan add 50`.",
  "mistakes": [
   [
    "Two ports set to dynamic auto will form a trunk because both support trunking.",
    "Auto only responds; neither side initiates, so the link stays access. At least one side must be desirable or trunk."
   ],
   [
    "switchport trunk allowed vlan 50 adds VLAN 50 to the trunk.",
    "Without the add keyword it replaces the entire allowed list with only VLAN 50."
   ],
   [
    "A native VLAN mismatch just causes a harmless log message.",
    "Untagged frames land in different VLANs on each side, leaking traffic between VLANs and breaking connectivity."
   ],
   [
    "Leaving the native VLAN as VLAN 1 is fine as long as it matches.",
    "Matching avoids the mismatch, but double-tagging attacks rely on a user-reachable native VLAN. Use an unused native VLAN or tag the native VLAN."
   ]
  ],
  "tryit": [
   [
    "At Lakeview Library, a patron plugs a small device into a public desk port. Minutes later the switch shows that port operating as a trunk. The port configuration contains only `switchport access vlan 30`. What happened, and what would you configure?",
    "The port was left in a dynamic DTP mode (its platform default), and the device negotiated a trunk, which is switch spoofing. Configure `switchport mode access` (and optionally `switchport nonegotiate`), keep the access VLAN, and consider shutting unused ports."
   ],
   [
    "Switch A has native VLAN 1 on its uplink; switch B has native VLAN 99 on the same link. Hosts in VLAN 1 on A report odd connectivity, and CDP logs a warning. What is the fix?",
    "Configure the same native VLAN on both ends, ideally an unused VLAN such as 999 with `switchport trunk native vlan 999`, so untagged frames land in the same VLAN on each side."
   ]
  ],
  "tip": "Two dynamic auto ports never form a trunk. Without the add keyword, switchport trunk allowed vlan replaces the whole list. A native VLAN mismatch leaks traffic between VLANs and triggers CDP warnings.",
  "check": [
   [
    "What happens when both ends of a link are set to dynamic auto?",
    "No trunk forms; the link stays in access mode because neither side actively initiates trunking."
   ],
   [
    "How do you mitigate double-tagging VLAN hopping?",
    "Set the native VLAN to an unused VLAN (or tag the native VLAN), keep users out of it and out of VLAN 1, and disable DTP on access ports."
   ],
   [
    "Which command adds VLAN 40 to an existing trunk without removing others?",
    "switchport trunk allowed vlan add 40"
   ],
   [
    "Which command shows both the administrative and operational trunking mode of a port?",
    "show interfaces <interface> switchport"
   ]
  ]
 },
 {
  "t": "EtherChannel: LACP, PAgP and static; member consistency; load balancing",
  "hook": "It is Monday morning at Cedar Valley Hospital and Marcus, the campus network engineer, is looking at an uplink graph that makes no sense. Over the weekend a contractor added two more fiber links between the imaging building's access switch and the distribution switch, so there are now four. Yet the graph shows one link pinned near full while the other three sit almost idle, and radiologists are complaining that large scans load slowly. The contractor insists the links are \"bundled.\" Marcus runs one show command and sees letters he has to decode: I, s, P, SU. Are the extra links actually helping, and if they are bundled, why is all the traffic squeezed onto just one of them?",
  "simple": "EtherChannel lets you take several cables between the same two switches and make them act like one fatter cable. If one cable fails, the others keep working. The two switches usually agree on the bundle by chatting with a small protocol, either an open standard one or a Cisco-only one, or you can force the bundle with no chat at all. All the cables in a bundle must be set up the same way, or the switch refuses to use the odd one out. Traffic is not chopped up across cables. Instead, each conversation is assigned to one cable, a bit like a grocery store assigning each shopper to one checkout lane. More lanes help many shoppers, but one shopper still uses one lane.",
  "body": [
   "EtherChannel bundles two or more physical Ethernet links between the same two devices into one logical link, called a port channel. It does two jobs at once. It increases total bandwidth, and it provides redundancy: if one member link fails, traffic moves to the surviving members without a topology change and without waiting for any routing or spanning tree reconvergence. Just as important for campus design, Spanning Tree Protocol (STP) treats the whole bundle as a single link. Without EtherChannel, four parallel links between two switches would form a loop, and STP would block three of them, wasting the bandwidth you paid for. With EtherChannel, all four members forward.",
   "There are three ways to form a bundle, chosen per physical interface with `channel-group <number> mode <mode>`. The first is LACP (Link Aggregation Control Protocol), originally IEEE 802.3ad and now part of IEEE 802.1AX, which is the open standard and works between different vendors. LACP has two modes: `active`, which sends LACP packets to start negotiation, and `passive`, which only responds. Active with active or active with passive forms a bundle, but passive with passive does not, because neither side ever starts the conversation. The second is PAgP (Port Aggregation Protocol), which is Cisco proprietary. Its modes are `desirable`, which initiates, and `auto`, which only responds. Desirable with desirable or desirable with auto forms a bundle, and auto with auto does not, for the same reason as passive with passive.",
   "The third method is static mode, `on`, which forces the bundle without any negotiation protocol. `on` only works with `on` at the other end. Because nothing is exchanged, the switch cannot detect a misconfiguration: if one side is `on` and the other side is not bundling, or the cabling goes to two different switches, the result can be a loop or black-holed traffic. You also cannot mix methods. LACP will not bundle with PAgP, and neither negotiates with `on`. LACP is usually the preferred choice because it is standard and supports extra features, such as a configurable maximum number of active links with additional members waiting in standby, ready to take over if an active member fails.",
   "Member consistency is where most bundles fail in real networks and in exam scenarios. All member ports must match in speed and duplex, in switchport mode (all access or all trunk), in access VLAN, or in trunk allowed VLAN list and native VLAN, and they should have consistent spanning tree settings. If one member differs, the switch suspends that member, or the channel does not form at all. A dependable habit is to configure the physical interfaces identically first, create the channel, and then make all later changes on the `interface port-channel` interface, which pushes them down to the members. Editing one member directly is a common way to break a working bundle.",
   "Verification centers on `show etherchannel summary`. Its flags tell the story: P means the port is bundled in the port channel, s means suspended (usually a consistency mismatch), I means stand-alone (no negotiation partner, so the port acts as an ordinary individual link), and D means down. For the port channel itself, SU means a Layer 2 channel that is in use, and RU means a Layer 3 channel that is in use. Use `show lacp neighbor` or `show pagp neighbor` to see whether the partner is negotiating, and `show interfaces port-channel 1` to see the combined bandwidth.",
   "Load balancing is the part people most often misunderstand. EtherChannel does not split a single flow across links, because doing so would deliver packets out of order. Instead, the switch runs a hash on selected fields of each frame and uses the result to pick a member link. Every frame of the same conversation produces the same hash, so it always uses the same link. The fields are chosen globally with `port-channel load-balance`, with options such as `src-mac`, `dst-mac`, `src-dst-mac`, `src-ip`, `dst-ip`, `src-dst-ip`, and on many platforms Layer 4 port options as well. Check the current method with `show etherchannel load-balance`.",
   "The choice of hash inputs matters a great deal. If most traffic flows from many clients to a single router or server, hashing only on destination MAC or destination IP sends everything down one link, because every frame has the same destination. Including both source and destination, for example `src-dst-ip`, spreads the flows far better. This is exactly the problem in a scenario where one member is saturated while the rest are idle. Also remember that a single large flow, such as one file transfer, can never use more than one member's bandwidth. Because of how the hash buckets are divided, bundles distribute most evenly with power-of-two member counts, such as 2, 4 or 8 links.",
   "Finally, EtherChannel works at Layer 3 too. A Layer 3 EtherChannel is created by using `no switchport` on the port-channel interface and its members and placing the IP address on the port-channel interface, not on the physical ports. The routing protocol then sees one routed link, and a member failure does not cause a routing adjacency to drop."
  ],
  "analogy": "Think of a highway with four lanes between two cities. A toll operator assigns each car to a lane based on its license plate, and every car with that plate always uses the same lane. Many cars spread out across all lanes, but one car never drives in two lanes at once, and if every car has nearly the same plate, they all pile into one lane. The analogy stops at negotiation: real lanes do not need both cities to agree they exist, but LACP and PAgP do.",
  "mnemonic": "Who starts the conversation: \"Active and Desirable Do the asking.\" LACP active and PAgP desirable initiate; passive and auto only answer, so two answerers never form a bundle.",
  "terms": [
   [
    "Port channel",
    "The logical interface that represents an EtherChannel bundle; configuration applied here is pushed to members."
   ],
   [
    "LACP",
    "Link Aggregation Control Protocol, the IEEE standard for negotiating EtherChannel; modes active and passive."
   ],
   [
    "PAgP",
    "Port Aggregation Protocol, the Cisco proprietary EtherChannel negotiation protocol; modes desirable and auto."
   ],
   [
    "Mode on",
    "Static EtherChannel with no negotiation protocol; must be on at both ends and cannot detect misconfiguration."
   ],
   [
    "Load-balancing hash",
    "The per-frame calculation on address or port fields that chooses which member link carries a flow."
   ],
   [
    "Suspended (s)",
    "A member flag in show etherchannel summary meaning the port is excluded, usually because its settings do not match."
   ]
  ],
  "example": "Two switches are connected with four links configured as `channel-group 1 mode passive` on both sides. `show etherchannel summary` shows every member as I (stand-alone) and spanning tree blocks three of them. Changing one side to `mode active` lets LACP negotiate, the members show P, and the port channel shows SU with all four links forwarding. Later, traffic from hundreds of clients to one server still lands on a single member until the global hash is changed from `dst-ip` to `src-dst-ip`.",
  "mistakes": [
   [
    "Passive on both ends (or auto on both ends) is fine because both sides support the protocol.",
    "Passive and auto only respond. With no side initiating, no bundle forms and the ports run as stand-alone links, with STP blocking the extras."
   ],
   [
    "Four 1 Gbps members let a single file transfer run at 4 Gbps.",
    "Each flow is hashed to one member, so a single flow is limited to one link's speed. The aggregate only helps when there are many flows."
   ],
   [
    "LACP active can bundle with PAgP desirable, since both initiate.",
    "LACP and PAgP are different protocols and do not negotiate with each other. Both ends must use the same method."
   ],
   [
    "Mode on is the safest choice because nothing can fail to negotiate.",
    "Mode on has no way to detect a mismatch or miscabling, so errors can cause loops or black holes. LACP active is generally preferred."
   ]
  ],
  "tryit": [
   [
    "You add a fourth member to a working LACP bundle. The new port shows s in `show etherchannel summary`, and the other three show P. On inspection, the new port is an access port in VLAN 1 while the port channel is a trunk. What should you do?",
    "The s flag means suspended because of a consistency mismatch. Make the new port match the others, ideally by defaulting it and applying the same channel-group command so it inherits trunk settings from the port channel. Once it matches, it shows P and joins the bundle."
   ],
   [
    "A branch distribution switch has an EtherChannel to the WAN router, and nearly all traffic goes from about 300 users to that one router. Graphs show one member is busy and the others are nearly idle. The global method is `dst-mac`. What change helps most?",
    "Every frame has the router's MAC as its destination, so the hash always selects the same member. Change to a method that includes the source, such as `src-mac`, `src-dst-mac` or `src-dst-ip`, so the many client addresses spread across members."
   ]
  ],
  "tip": "Passive-passive (LACP) and auto-auto (PAgP) never form a channel. On does not negotiate and only pairs with on. Protocols never mix. A single flow never uses more than one member link's bandwidth, and a lopsided bundle usually means the hash inputs are wrong.",
  "check": [
   [
    "Will LACP active on one side bundle with PAgP desirable on the other?",
    "No; the protocols are different and cannot negotiate with each other."
   ],
   [
    "Traffic from 200 clients to one server all uses one member link. What should you check?",
    "The load-balance method; if it hashes only on destination MAC or IP, all traffic to one server picks the same link, so use a source-and-destination method."
   ],
   [
    "Name three settings that must match on all member ports.",
    "Speed and duplex, switchport mode, and access VLAN or trunk allowed and native VLANs."
   ],
   [
    "What do the flags I and SU mean in show etherchannel summary?",
    "I means a member is stand-alone because it is not negotiating with a partner; SU means the port channel is Layer 2 and in use."
   ]
  ]
 },
 {
  "t": "Spanning tree: RSTP and MST, port roles, root placement, BPDU guard, root guard, loop guard",
  "hook": "It is 2:40 p.m. at Brightwater Community College when the help desk phones light up all at once. Wi-Fi is down in the library, the registration office cannot reach the student system, and the switch CPU graphs in the network closet are maxed out. Jordan, the junior network engineer, walks into a classroom and finds that someone has plugged both ends of a patch cable into two wall jacks to \"test\" them, and a small desktop switch is blinking furiously under a desk next door. Within seconds of unplugging the cable, everything recovers. Jordan's manager asks the obvious question: the campus runs spanning tree, so why did a single cable nearly take down the network, and what should have stopped it?",
  "simple": "Switches are often connected in loops on purpose, so that if one cable breaks, there is another way through. But a loop is dangerous for switches: a message can circle forever, multiplying until the network jams. Spanning tree is the rule set switches use to avoid that. They pick one switch as the leader, called the root, and then switch off just enough extra links so that there is exactly one path between any two places. If a link fails, a switched-off link is turned back on. Think of a city closing some side streets so traffic never goes around in circles, while keeping the closed streets ready to reopen if a main road is blocked. Extra safety features stop people from plugging in devices that confuse the leader choice.",
  "body": [
   "Redundant Layer 2 links create loops, and Ethernet frames have no time-to-live (TTL) field to make them expire. A loop therefore causes broadcast storms, duplicate frames and constant MAC address table changes that can take down a network in seconds. Spanning Tree Protocol (STP) prevents loops by electing a root bridge and blocking redundant ports, leaving a loop-free tree. ENCOR focuses less on the original IEEE 802.1D standard and more on the faster modern versions and the features that protect the tree from mistakes.",
   "The election works on bridge IDs. A bridge ID is a priority (default 32768, configurable only in steps of 4096) plus the system ID extension, which is the VLAN or instance number, plus the switch MAC address. The lowest bridge ID wins and becomes root. Every other switch then picks one root port, its best path to the root, using lowest path cost first, then lowest sender bridge ID, then lowest sender port ID. With the default short cost method, a 100 Mbps link costs 19 and a 1 Gbps link costs 4. On each segment, one designated port forwards traffic for that segment, chosen by the best path to root. Every remaining port is non-designated and does not forward.",
   "Rapid STP (RSTP, IEEE 802.1w) gives clearer names to these roles. The root port and designated port keep their meanings. An alternate port is a discarding port that offers a different path to the root, a ready replacement for the root port. A backup port is a redundant port to a segment the switch already serves through a designated port, which is rare and usually involves a shared hub. RSTP also reduces the port states to three: discarding, learning and forwarding, where classic STP had blocking, listening, learning and forwarding.",
   "RSTP converges much faster than 802.1D because it does not rely on timers to decide when a port is safe. On point-to-point links, a designated port uses a proposal and agreement handshake with its neighbor and can move to forwarding almost immediately. When a root port fails, an alternate port takes over quickly. Edge ports, configured with PortFast, go straight to forwarding because they connect to end hosts. Cisco's implementation is Rapid PVST+ (Per-VLAN Spanning Tree Plus), which runs one RSTP instance for each VLAN, so each VLAN can have its own root.",
   "MST (Multiple Spanning Tree, IEEE 802.1s) solves the cost of running hundreds of instances. It maps many VLANs to a few instances, so a switch with hundreds of VLANs might run two or three trees instead of hundreds, while still allowing different VLAN groups to use different roots. Switches belong to the same MST region only if they share the same region name, revision number and VLAN-to-instance mapping. Any difference, even a single VLAN mapped differently, makes them separate regions. Instance 0, the IST (internal spanning tree), represents the region when interacting with other regions and with switches running other STP versions.",
   "Root placement should always be deliberate. Make the distribution or core switch that hosts the default gateway the root, using `spanning-tree vlan 10 priority 4096` or the macro `spanning-tree vlan 10 root primary`, which sets a priority low enough to win, and configure a second switch with `root secondary` as the backup. If you leave every switch at the default, the switch with the lowest MAC address wins, which is often the oldest and slowest switch in the building. When a first hop redundancy protocol (FHRP) such as HSRP provides the gateway, align the STP root and the active gateway on the same switch for each VLAN, so traffic takes the most direct path.",
   "Protection features keep the tree stable. PortFast (`spanning-tree portfast`) puts access ports straight into forwarding. BPDU guard err-disables a PortFast port if it receives any bridge protocol data unit (BPDU), which stops a user from plugging in a switch or looping two jacks together; enable it per port or globally with `spanning-tree portfast bpduguard default`. The port stays down until an administrator bounces it or errdisable recovery is configured. Root guard, configured with `spanning-tree guard root` on designated ports facing switches that should never become root, puts the port into root-inconsistent (blocking) state if it receives a superior BPDU, and it recovers automatically once those BPDUs stop.",
   "Loop guard handles a different failure. It protects root and alternate ports against unidirectional links: if a non-designated port stops receiving BPDUs, perhaps because one fiber strand failed, normal STP would assume the path is gone and make the port designated and forwarding, creating a loop. With loop guard (`spanning-tree guard loop` or globally with `spanning-tree loopguard default`), the port moves to loop-inconsistent (blocking) instead and recovers when BPDUs return. UDLD (Unidirectional Link Detection) complements loop guard by detecting one-way fiber links at Layer 2. In logs you will see messages naming the inconsistent state or the err-disable cause, which tells you which feature acted."
  ],
  "analogy": "Picture a school fire drill with one principal at the front office. Every classroom finds its single best route to the office, and doors that would create circular routes stay closed but unlocked. BPDU guard is a rule that anyone claiming to be a principal at a classroom door gets the door locked. Root guard lets a classroom stay in the drill but ignores a fake principal, and loop guard keeps a door closed if the office goes silent rather than assuming the route is gone. Unlike a real school, the principal is simply the lowest ID, not the most capable.",
  "mnemonic": "Root port tie-breakers in order: \"Cost, Bridge, Port\" (lowest path Cost to root, then lowest sender Bridge ID, then lowest sender Port ID).",
  "terms": [
   [
    "Bridge ID",
    "Priority (multiple of 4096) plus system ID extension plus MAC address; the lowest becomes root."
   ],
   [
    "Root port",
    "The port on a non-root switch with the best path to the root bridge."
   ],
   [
    "Designated port",
    "The forwarding port on each segment toward that segment, chosen by best path to root."
   ],
   [
    "Alternate port",
    "An RSTP discarding port with an alternative path to the root, ready to replace the root port."
   ],
   [
    "MST region",
    "A group of switches with identical region name, revision number and VLAN-to-instance mapping."
   ],
   [
    "BPDU guard",
    "Err-disables a PortFast port that receives a BPDU."
   ],
   [
    "Root guard",
    "Blocks a designated port that receives a superior BPDU, preventing an unwanted switch from becoming root."
   ],
   [
    "Loop guard",
    "Blocks a non-designated port that stops receiving BPDUs, preventing loops from unidirectional links."
   ]
  ],
  "example": "A contractor plugs a small switch with a low bridge priority into a conference room port. Because the access port has PortFast and BPDU guard, the port err-disables as soon as the first BPDU arrives, the log records the err-disable event, and the campus root bridge is never challenged. On the distribution switches, root guard on the downlinks would have blocked the same superior BPDU if it had arrived through an access switch instead.",
  "mistakes": [
   [
    "Root guard and BPDU guard do the same thing.",
    "BPDU guard err-disables the port on any BPDU and needs manual or configured recovery. Root guard reacts only to superior BPDUs, blocks the port as root-inconsistent, and recovers automatically."
   ],
   [
    "Loop guard belongs on access ports facing users.",
    "Loop guard protects root and alternate (non-designated) ports on switch-to-switch links against unidirectional failures. User-facing ports use PortFast with BPDU guard."
   ],
   [
    "Two switches with the same MST region name and the same VLAN mapping are in one region even if revision numbers differ.",
    "Name, revision and VLAN-to-instance mapping must all match exactly; any difference creates separate regions."
   ],
   [
    "The newest, fastest switch will become root automatically.",
    "Root is the lowest bridge ID. With default priorities the lowest MAC address wins, often an older switch, so set priorities deliberately."
   ]
  ],
  "tryit": [
   [
    "A distribution switch runs Rapid PVST+ and connects down to several access switches. An access-layer switch with priority 0 is accidentally connected, and you want the distribution switch to stay root without err-disabling the uplink permanently. Which feature do you apply, and where?",
    "Root guard on the distribution switch's designated downlink ports. When a superior BPDU arrives, the port goes root-inconsistent (blocking) and returns to forwarding automatically once the superior BPDUs stop, so the root does not move."
   ],
   [
    "After a fiber patch panel is reworked, an access switch's alternate port to the secondary distribution switch stops receiving BPDUs, although the link still shows up. A loop and broadcast storm follow. What feature would have prevented this?",
    "Loop guard on the root and alternate ports, often with UDLD on fiber. Loop guard would have put the port in loop-inconsistent blocking state instead of letting it become designated and forward."
   ]
  ],
  "tip": "BPDU guard shuts the port (err-disabled) on any BPDU; root guard blocks only on superior BPDUs and recovers by itself; loop guard acts when BPDUs stop arriving. MST regions must match name, revision and VLAN mapping exactly. Priority changes in steps of 4096.",
  "check": [
   [
    "Which three values must match for two switches to be in the same MST region?",
    "Region name, revision number and VLAN-to-instance mapping."
   ],
   [
    "Where should root guard be configured?",
    "On designated ports facing switches that should never become root, typically distribution ports toward access switches."
   ],
   [
    "What problem does loop guard prevent?",
    "A blocked port becoming designated and forwarding after it stops receiving BPDUs, usually because of a unidirectional link failure."
   ],
   [
    "What is the RSTP name for a discarding port that provides a backup path to the root bridge?",
    "An alternate port; it can quickly replace the root port if the root port fails."
   ]
  ]
 },
 {
  "t": "EIGRP vs OSPF: algorithms, metrics, path selection, load balancing, summarization",
  "hook": "At Northfield Logistics, two companies have just merged and Ana, the senior network engineer, is in a design review. One side ran OSPF everywhere; the other ran EIGRP. The CIO wants one interior routing protocol by next quarter and asks for a clear comparison. Meanwhile a ticket arrives: traffic between two warehouses is taking a 1 Gbps link even though a 10 Gbps link sits right next to it, and a colleague wants to know why OSPF will not let him summarize routes on a router in the middle of an area. Ana realizes both problems come from how the two protocols think about the network. How do they really differ, and which differences drive design decisions?",
  "simple": "Routers need to find the best path to every network in a company. EIGRP and OSPF are two common ways they do this, and they think very differently. OSPF works like everyone sharing the same complete map: each router tells all the others about its own roads, so every router has an identical map and calculates the best routes itself. EIGRP works more like asking your neighbors for directions: each router hears how far a place is from its neighbors and picks the best, while also keeping a safe backup route ready. They measure distance differently, they share traffic across paths differently, and they let you shorten long lists of routes in different places.",
  "body": [
   "EIGRP and OSPF are the two interior gateway protocols (IGPs) that ENCOR tests, and many questions ask you to compare them. Both reach the same goal, loop-free best paths inside one organization, but they use very different methods. Understanding why they differ, not just memorizing a table, makes the scenario questions much easier.",
   "OSPF (Open Shortest Path First) is an open-standard link-state protocol. Each router describes its own links and neighbors in link-state advertisements (LSAs) and floods them to every router in the area. As a result, every router in the area has an identical link-state database (LSDB), effectively a full map of the area. Each router then runs Dijkstra's shortest path first (SPF) algorithm on that map to compute a tree of best paths with itself at the top. You can see the map with `show ip ospf database`, and you can see neighbors reach the FULL state with `show ip ospf neighbor`.",
   "EIGRP (Enhanced Interior Gateway Routing Protocol) was originally Cisco proprietary and was later published as an informational Request for Comments (RFC). It is an advanced distance vector protocol. A router does not see the whole map; it knows only what its neighbors tell it, namely each destination's distance as reported by that neighbor. EIGRP uses DUAL (Diffusing Update Algorithm) to choose loop-free paths. The best path is the successor, and a backup path is a feasible successor if the neighbor's reported distance is lower than the current best total distance, called the feasible distance. That feasibility condition guarantees the backup cannot loop back through you, so EIGRP can switch to it immediately. `show ip eigrp topology` lists successors and feasible successors.",
   "Metrics differ as well. OSPF uses cost, which by default is the reference bandwidth divided by interface bandwidth. The default reference bandwidth is 100 Mbps, so every link of 100 Mbps or faster gets cost 1, and OSPF cannot tell a 1 Gbps link from a 10 Gbps link. The fix is `auto-cost reference-bandwidth` set to the same value on every router, because mismatched values produce inconsistent paths. EIGRP uses a composite metric built from bandwidth and delay by default, controlled by the K values K1 and K3; load and reliability also exist but are turned off by default. In that formula, bandwidth is the minimum along the path and delay is the sum along the path. Named mode EIGRP adds a wide metric that scales better to high-speed links.",
   "Path selection happens in layers. When both protocols offer the same prefix, the router first compares administrative distance (AD), a measure of trust in the source, and the lower value wins before any metric is compared: internal EIGRP is 90, OSPF is 110, and external EIGRP is 170. Within OSPF, the path type matters before cost. Intra-area routes beat inter-area routes, which beat external type 1 routes, which beat external type 2 routes, regardless of cost. An intra-area path with a high cost still wins over an inter-area path with a low cost.",
   "Load balancing is another key distinction. Both protocols perform equal-cost multipath (ECMP) across several paths with the same metric, by default up to four paths on many IOS versions, adjustable with `maximum-paths`. Only EIGRP supports unequal-cost load balancing, using the `variance` command. With variance 2, for example, any feasible successor whose metric is less than twice the best metric is also installed, and traffic is shared in proportion to the metrics. A path that fails the feasibility condition is never used for unequal-cost load balancing, no matter what the variance is.",
   "Summarization follows from each protocol's design. EIGRP can summarize on any interface of any router with `ip summary-address eigrp` in classic mode or `summary-address` in named mode, and it automatically creates a route to Null0 for the summary to prevent loops. OSPF can summarize only at area borders and domain boundaries: `area X range` on an area border router (ABR) for inter-area routes, and `summary-address` on an autonomous system boundary router (ASBR) for external routes. The reason is fundamental: all routers in an area must have the same LSDB, so you cannot hide detail inside an area, only between areas.",
   "Other differences round out the comparison. OSPF uses a hierarchical design with a backbone area 0 that all other areas attach to, and it scales by dividing the network into areas. EIGRP has no areas and scales through summarization and stub routing, which limits how far queries travel when a route is lost. OSPF sends hellos to multicast 224.0.0.5 (all OSPF routers) and 224.0.0.6 (designated routers) and runs directly over IP protocol 89. EIGRP uses multicast 224.0.0.10 and IP protocol 88, with its own reliable transport. Firewall rules and access lists between routers must allow the right protocol number, or adjacencies will not form."
  ],
  "analogy": "OSPF is like every driver in a city carrying the same detailed map and planning routes themselves; EIGRP is like asking neighbors how far each destination is from them and trusting the shortest answer, while noting a neighbor who is definitely closer to the goal as a safe backup. The analogy fails on summarization: you might expect the map users to compress anything, but OSPF can only compress at area borders because everyone inside an area must hold an identical map.",
  "mnemonic": "OSPF path type order runs from closest to farthest: \"Inside the room, inside the building, outside counted, outside flat\" = intra-area, inter-area, external type 1 (internal cost added), external type 2 (external cost only).",
  "terms": [
   [
    "Link-state",
    "A routing approach where routers share topology and each computes paths with SPF from a full map."
   ],
   [
    "Advanced distance vector",
    "EIGRP's approach, learning distances from neighbors and using DUAL to keep paths loop-free."
   ],
   [
    "Feasible successor",
    "An EIGRP backup path whose reported distance is lower than the feasible distance, so it is guaranteed loop-free."
   ],
   [
    "Administrative distance",
    "Trust value for choosing between routing sources: EIGRP internal 90, OSPF 110, EIGRP external 170."
   ],
   [
    "Reference bandwidth",
    "OSPF's value divided by interface bandwidth to get cost; defaults to 100 Mbps."
   ],
   [
    "Unequal-cost load balancing",
    "Sharing traffic across paths with different metrics, supported only by EIGRP through variance."
   ]
  ],
  "example": "A network has 1 Gbps and 10 Gbps links, but OSPF sends traffic over the slower path. Both links show cost 1 because the default reference bandwidth is 100 Mbps. Setting `auto-cost reference-bandwidth 100000` on every router makes the 10 Gbps link cost 10 and the 1 Gbps link cost 100, and the correct path is chosen.",
  "mistakes": [
   [
    "OSPF can summarize on any router, just like EIGRP.",
    "OSPF summarizes only on ABRs (area range) and ASBRs (summary-address), because routers inside an area must share an identical LSDB. EIGRP can summarize on any interface."
   ],
   [
    "OSPF always picks the lowest-cost path to a prefix.",
    "OSPF first prefers path type: intra-area, then inter-area, then external type 1, then external type 2. Cost only breaks ties within the same type."
   ],
   [
    "Variance lets EIGRP use any path within the multiplier.",
    "Only feasible successors qualify. A path whose reported distance is not lower than the feasible distance is never used, regardless of variance."
   ],
   [
    "If a prefix is learned by both OSPF and EIGRP, the one with the better metric is used.",
    "Metrics from different protocols are not compared. The lower administrative distance wins: internal EIGRP (90) beats OSPF (110), but OSPF beats external EIGRP (170)."
   ]
  ],
  "tryit": [
   [
    "A router learns 10.50.0.0/16 from OSPF as an intra-area route and the same prefix as an external EIGRP route redistributed elsewhere. The EIGRP metric looks much better. Which route is installed, and why?",
    "The OSPF route, because route selection between protocols uses administrative distance first. OSPF is 110 and external EIGRP is 170, so OSPF wins, and the metrics are never compared."
   ],
   [
    "An EIGRP router has a successor with metric 1,000,000 and a second path with metric 1,800,000 whose reported distance is 900,000. You want both used. What do you configure, and does it work?",
    "Configure `variance 2`, which installs paths with a metric below 2,000,000. It works because the second path's reported distance (900,000) is lower than the feasible distance (1,000,000), so it is a feasible successor; traffic is then shared in proportion to the metrics."
   ]
  ],
  "tip": "OSPF: link-state, SPF, cost, summarize only on ABR or ASBR, equal-cost only, path type before cost. EIGRP: DUAL, bandwidth plus delay, summarize anywhere, unequal-cost with variance for feasible successors. Lower administrative distance wins before metric is compared.",
  "check": [
   [
    "Where can OSPF summarize routes, and why not elsewhere?",
    "Only on ABRs (area range) and ASBRs (summary-address), because every router within an area must share the same link-state database."
   ],
   [
    "An OSPF inter-area route has cost 10 and an intra-area route to the same prefix has cost 50. Which is used?",
    "The intra-area route, because OSPF prefers intra-area over inter-area paths before comparing cost."
   ],
   [
    "Which default EIGRP metric components are used?",
    "Bandwidth (minimum along the path) and delay (cumulative)."
   ],
   [
    "Why do a 1 Gbps and a 10 Gbps link both show OSPF cost 1 by default?",
    "The default reference bandwidth is 100 Mbps, and any link at or above that speed gets the minimum cost of 1; raise the reference bandwidth on all routers."
   ]
  ]
 },
 {
  "t": "EIGRP: feasible successors, variance, stub routing",
  "hook": "It is 2:10 a.m. and your phone buzzes. The monitoring console at Juniper Valley Logistics shows that the hub router in the main warehouse just logged a burst of 'stuck in active' messages, and three branch sites dropped their EIGRP neighbors for a few seconds before coming back. Nothing was changed tonight except a single flapping link at a small branch. How did one small link at the edge shake the whole hub? And why did one branch, the one whose second WAN link has a lower metric, never notice anything at all? The answers live in a few numbers EIGRP keeps for every route.",
  "simple": "EIGRP is a way routers share directions to networks. For every destination, a router remembers its best path and, when it can, a spare path that is guaranteed safe to use. A spare path counts as safe only when the neighbor offering it is closer to the destination than you are, so it cannot be sending traffic back through you. If the best path breaks and a safe spare exists, the router switches instantly. If not, it has to ask its neighbors for help and wait for answers. Think of driving to work: if you already know a back road that does not loop past your house, you take it right away. If you do not, you have to stop and phone around for directions. Variance lets the router use the spare path at the same time, and stub routing tells the hub not to bother phoning small branch offices.",
  "body": [
   "EIGRP (Enhanced Interior Gateway Routing Protocol) gets its speed and stability from DUAL, the Diffusing Update Algorithm. DUAL decides which paths are safe to use, when a router may switch paths on its own, and when it must ask its neighbors for help. To understand feasible successors, variance and stub routing you need two distances that EIGRP tracks for every path it learns.",
   "The first distance is the reported distance (RD), also called the advertised distance. It is the metric from the neighbor to the destination, exactly as the neighbor reports it in its update. The second is the feasible distance (FD), your total metric to the destination through that neighbor: the neighbor's reported distance plus the cost of your own link to that neighbor. Every path has its own computed distance, and the path with the lowest total becomes the successor. The successor is installed in the routing table, and its distance is remembered as the feasible distance for the route. That remembered value matters, because it is the yardstick for judging every backup.",
   "A feasible successor is a backup path that is guaranteed loop-free. The rule, called the feasibility condition, is that a neighbor's reported distance must be strictly less than your current feasible distance. The logic is simple geometry: if the neighbor is closer to the destination than you are, its path cannot run back through you. Equal is not good enough; an RD equal to the FD fails the test. When the successor fails and a feasible successor exists, the router switches to it immediately without asking anyone, which is why EIGRP can converge in well under a second. The route stays passive the whole time, meaning stable and usable.",
   "If there is no feasible successor, the route goes active. The router sends queries to all its neighbors asking for an alternative path and must wait for a reply from every one of them before it can choose a new successor. Those neighbors may in turn query their own neighbors if they also lack a backup, so in a large, flat network a single failure can trigger queries that ripple across many routers. If a router does not receive all replies within the active timer (three minutes by default), the route becomes stuck in active (SIA) and the neighbor relationship with the router that did not answer may be reset. That reset is exactly the kind of collateral damage seen in the hook: a far-away problem tears down healthy adjacencies.",
   "You can see all of this on the router. `show ip eigrp topology` lists each prefix with a state code (P for passive, A for active), the number of successors, and the feasible distance, followed by each path shown as '(FD/RD)' with the neighbor address and outgoing interface. Only successors and feasible successors appear in the default output. Paths that fail the feasibility condition are still known, but they appear only with `show ip eigrp topology all-links`. When you suspect a missing backup, compare the RD in parentheses to the FD at the top of the entry; that single comparison answers most exam questions on this topic.",
   "Variance enables unequal-cost load balancing, something OSPF (Open Shortest Path First) cannot do. By default EIGRP installs only equal-cost paths. With `variance 2` under the routing process, EIGRP also installs any feasible successor whose FD is less than 2 times the successor's FD. Traffic is shared in proportion to the metrics, so the better path still carries more of the load. The crucial detail is that only feasible successors qualify. A path that fails the feasibility condition is never installed, even if its metric falls within the variance multiplier, because using it could create a loop. The `maximum-paths` command still caps how many paths go into the routing table, so check it if you expect more paths than you see.",
   "Stub routing controls query scope, which is the main defense against SIA problems at hub sites. A remote branch router with a single hub connection should never be a transit path, and any query sent to it is wasted, since it cannot know another way to reach the rest of the network. Configuring `eigrp stub` on the branch (under `router eigrp` in classic mode, or under the address family in named mode) tells neighbors it is a stub, so the hub does not send it queries. By default a stub advertises connected and summary routes, the same as `eigrp stub connected summary`. Other options include `static`, `redistributed`, `receive-only` and `leak-map`. A stub also does not advertise routes learned from one neighbor to another neighbor, which prevents a dual-homed branch from becoming an accidental transit path between two hubs. The stub setting is configured only on the stub router itself; the hub learns it from the hello exchange.",
   "Summarization is the other tool for limiting query scope. A query stops at any router that does not have the specific prefix in its topology table, for example one that only knows a summary covering it. That router replies that it has no path and does not propagate the query further. Good EIGRP design therefore combines stub routing at the edge with summarization at distribution boundaries, so a failure deep in one part of the network is contained instead of rippling everywhere.",
   "For the exam, keep the chain of reasoning clear. FD is your total; RD is the neighbor's view. The feasibility condition is RD strictly less than FD. A feasible successor gives instant failover; no feasible successor means the route goes active and queries go out. Variance only ever uses feasible successors. Stub routing and summarization both shrink the area that queries can reach."
  ],
  "analogy": "Picture asking for directions to a stadium. A friend who says 'I am two miles from the stadium' when you are five miles away cannot be routing you back through your own house; following them is safe. A friend who is seven miles away might be, so you do not trust them blindly. That is the feasibility condition. Stub routing is putting a sign on a cul-de-sac house saying 'do not ask us, we only know our own street.' The analogy stops working on one point: EIGRP compares the friend's reported distance to your best known total, not to your current distance after a failure.",
  "terms": [
   [
    "Feasible distance",
    "The router's total metric to a destination through the best path: the neighbor's reported distance plus the cost of the link to that neighbor."
   ],
   [
    "Reported distance",
    "The metric to the destination as advertised by a neighbor; also called advertised distance."
   ],
   [
    "Successor",
    "The neighbor on the lowest-metric path, installed in the routing table."
   ],
   [
    "Feasibility condition",
    "A neighbor's reported distance must be strictly less than the current feasible distance for it to be a feasible successor."
   ],
   [
    "Feasible successor",
    "A guaranteed loop-free backup path kept in the topology table for instant failover."
   ],
   [
    "Stuck in active",
    "A route whose queries were not all answered within the active timer, which can reset the neighbor relationship."
   ],
   [
    "Variance",
    "A multiplier that allows EIGRP to install feasible successors with higher metrics for unequal-cost load balancing."
   ],
   [
    "Stub router",
    "An EIGRP router that tells neighbors not to query it and advertises only selected route types."
   ]
  ],
  "example": "Router R1 reaches 10.5.0.0/16 via R2 with FD 3000 (RD 1000) and via R3 with FD 5000 (RD 2500). R3's RD of 2500 is less than R1's FD of 3000, so R3 is a feasible successor. With `variance 2`, R1 installs both paths because 5000 is less than 2 times 3000, sharing traffic roughly in proportion to the metrics. If a third path via R4 had FD 4000 but RD 3200, it would not be installed at any variance, because 3200 is not less than 3000.",
  "mistakes": [
   [
    "A backup path qualifies as a feasible successor if its reported distance equals the feasible distance.",
    "The condition is strictly less than. An RD equal to the FD fails, and that path appears only in the all-links output."
   ],
   [
    "Variance lets EIGRP use any path whose metric falls within the multiplier.",
    "Variance considers only feasible successors. A path that fails the feasibility condition is never installed, no matter how close its metric is."
   ],
   [
    "You compare the backup's feasible distance to the successor's feasible distance to decide if it is a feasible successor.",
    "The test uses the backup neighbor's reported distance against your current feasible distance. The backup's total metric matters only for variance."
   ],
   [
    "The hub must be configured with eigrp stub to stop querying branches.",
    "The stub command goes on the branch (stub) router. It announces its stub status to neighbors, and the hub then stops sending it queries."
   ]
  ],
  "tryit": [
   [
    "You manage a hub router with 60 single-homed branch routers. During a WAN failure last week, the hub logged SIA messages and reset adjacencies with several branches that were not involved. The branches only need to advertise their connected LANs. What single change would you make on the branches, and why?",
    "Configure `eigrp stub` (default connected and summary) on each branch router. The hub then stops sending queries to the branches, so a failure no longer waits on 60 replies, which shrinks query scope and SIA risk. The branches still advertise their LANs and never become transit paths."
   ],
   [
    "R1 has a successor with FD 2000. Neighbor R5 advertises the same prefix with RD 1500 and R1's total through R5 is 4500. The engineer sets `variance 2` but R5's path does not appear in the routing table. Why?",
    "R5 is a feasible successor, because 1500 is less than 2000, but its FD of 4500 is more than 2 times 2000 (4000). It falls outside the variance. A variance of 3 would include it, as long as maximum-paths allows."
   ]
  ],
  "tip": "Feasible successor test: RD of the backup less than FD of the successor, strictly less. Variance only ever uses feasible successors. Stub routing, configured on the branch, is the main fix for stuck-in-active problems at hub sites, and summarization also stops queries.",
  "check": [
   [
    "A backup path has RD 3000 and the current FD is 3000. Is it a feasible successor?",
    "No; the reported distance must be strictly less than the feasible distance."
   ],
   [
    "What happens when a successor fails and there is no feasible successor?",
    "The route goes active and the router queries its neighbors for an alternative path, waiting for replies before reconverging."
   ],
   [
    "Why configure eigrp stub on branch routers?",
    "So hubs do not send them queries, reducing query scope and stuck-in-active risk, and so the branch never becomes a transit path."
   ],
   [
    "Which command shows EIGRP paths that do not meet the feasibility condition?",
    "show ip eigrp topology all-links; the default topology output lists only successors and feasible successors."
   ]
  ]
 },
 {
  "t": "OSPFv2 and OSPFv3: multi-area, adjacencies, network types, area types (stub, totally stubby, NSSA), summarization and filtering",
  "hook": "Priya, the new network engineer at Cedar Ridge Health, opens a ticket on her first Monday. The small clinic routers keep running out of memory, and their routing tables carry thousands of external routes they will never use, all pointing toward the same data center exit. Meanwhile, the router at the new imaging center will not form an adjacency with its neighbor; `show ip ospf neighbor` shows it sitting in ExStart, minute after minute. Her manager asks two questions: can the clinics carry less, and why is the imaging link stuck? Both answers come from how OSPF divides, trims and builds its world.",
  "simple": "OSPF is a way routers share a full map of the network so each one can work out the shortest path on its own. A big map is hard to carry, so OSPF splits the network into areas, like the districts of a city. Every district connects to a central district, called area 0. Inside a district, every router has the same detailed map. Between districts, routers pass along short summaries instead of every street. Small edge districts can be told to carry even less, keeping only a 'go this way for everything else' sign, which is called a default route. Before two routers share maps, they go through a short getting-to-know-you process, and they must agree on a few settings, such as timers and packet size, or they get stuck partway.",
  "body": [
   "OSPF (Open Shortest Path First) is a link-state protocol: every router builds a link-state database (LSDB) from link-state advertisements (LSAs) and runs the SPF (shortest path first) algorithm to calculate routes. OSPF scales by dividing the network into areas. Area 0 is the backbone, and every other area must connect to it, either directly or through a virtual link. Routers inside an area share an identical LSDB, which is why areas limit both the scope of LSA flooding and the number of routers that rerun SPF after a change.",
   "Several router roles and LSA types follow from that design. An ABR (area border router) has interfaces in area 0 and another area and passes information between them as type 3 summary LSAs. An ASBR (autonomous system boundary router) redistributes external routes, for example static routes or routes from another protocol, which appear as type 5 LSAs (with type 4 LSAs telling other areas how to reach the ASBR). Inside an area, type 1 router LSAs describe each router's links and type 2 network LSAs, generated by the designated router, describe multiaccess segments. In `show ip route`, intra-area routes appear as O, inter-area routes as O IA, and externals as O E2 (the default external type) or O E1.",
   "Adjacencies progress through a fixed set of states: Down, Init (a hello was received), 2-Way (each router sees its own router ID in the other's hello), ExStart and Exchange (the routers agree on who leads and swap database descriptions), Loading (requesting missing LSAs) and Full. To become neighbors, routers must match the area ID, the subnet and mask on the link, the hello and dead timers, authentication, and the stub area flags, and they must have unique router IDs. The MTU (maximum transmission unit) must also match; an MTU mismatch typically leaves the neighbors stuck in ExStart or Exchange, because the database description packets from the side with the larger MTU are rejected. A quick `show ip ospf interface` on both ends usually reveals the timer or area mismatch, and `debug ip ospf adj` shows mismatches as they happen.",
   "Network types control how hellos are sent and whether a designated router is elected. Broadcast, the default on Ethernet, elects a DR (designated router) and BDR (backup designated router) to reduce the number of full adjacencies on a shared segment. The highest interface priority wins, then the highest router ID, and the election is not preemptive: a better router that boots later does not take over. A priority of 0 means the router never becomes DR or BDR. Other routers, called DROTHERs, stay in 2-Way with each other, which is normal, and are Full only with the DR and BDR. Point-to-point has no DR and suits links with exactly two routers, including Ethernet links between two routers, where `ip ospf network point-to-point` skips the election and speeds adjacency formation. Non-broadcast and point-to-multipoint exist for NBMA (nonbroadcast multiaccess) and hub-and-spoke designs. Hello and dead timers default to 10 and 40 seconds on broadcast and point-to-point networks.",
   "Area types reduce LSDB size at the edge. A stub area blocks type 5 external LSAs; the ABR injects a default route instead. A totally stubby area, a Cisco feature, also blocks type 3 inter-area summaries, leaving only intra-area routes and a default. It is configured with `area 1 stub` on every router in the area and `area 1 stub no-summary` on the ABR. A stub area cannot contain an ASBR. An NSSA (not-so-stubby area) solves that: it blocks type 5 but allows an ASBR inside the area to redistribute externals as type 7 LSAs, which the ABR translates into type 5 for the rest of the domain. A totally NSSA also blocks type 3 summaries. Note that an NSSA ABR does not inject a default route automatically unless you add `default-information-originate` to the `area nssa` command, while a totally NSSA gets one automatically. All routers in an area must agree on the stub or NSSA flag, or they will not become neighbors.",
   "Summarization happens only at boundaries, because inside an area every router must hold the same detailed LSDB. On an ABR, `area 1 range 10.1.0.0 255.255.0.0` summarizes the area's type 1 and 2 information into one type 3 LSA. On an ASBR, `summary-address` summarizes external routes. Summaries shrink tables elsewhere and hide flapping inside the area, since the summary stays up as long as any component route exists.",
   "Filtering options differ in what they actually stop. `area X filter-list prefix` on an ABR filters type 3 LSAs entering or leaving an area, so the routes truly disappear from the other side. The `not-advertise` keyword on `area range` suppresses the summary and its components. A `distribute-list in` under the OSPF process only prevents routes from entering the local routing table; it does not stop LSA flooding, so neighbors still learn the routes. That difference is a favorite exam trap.",
   "OSPFv3 is the version that supports IPv6. It runs per link rather than per subnet, uses link-local addresses as neighbor addresses and next hops, and relies on IPsec or a built-in authentication trailer rather than the authentication fields in the OSPFv2 header. It adds new LSA types, the link LSA (type 8) and the intra-area prefix LSA (type 9), so that topology and prefixes are carried separately; type 1 and 2 LSAs no longer carry addresses. It still uses a 32-bit router ID, which must be set manually if the router has no IPv4 addresses. With address families, OSPFv3 can carry IPv4 as well. Configuration happens on the interface, for example `ospfv3 1 ipv6 area 0`, rather than with network statements. Areas, area types, DR elections and adjacency states work the same way as in OSPFv2."
  ],
  "analogy": "Think of a country divided into states. Every state connects to a central federal hub (area 0). Inside a state, every town has the full local road atlas. At state borders, officials (ABRs) hand out a one-page summary of the state instead of the atlas. A stub state refuses foreign travel brochures (type 5) and just posts a sign: 'for anywhere abroad, head to the border.' An NSSA is a stub state that has its own small port, so it accepts its own imports (type 7) and the border official relabels them for the rest of the country. The analogy breaks on one point: OSPF routers inside an area must hold an identical atlas, which real towns never do.",
  "mnemonic": "Adjacency states in order, Down, Init, 2-Way, ExStart, Exchange, Loading, Full: 'Don't Invite Two EXtroverted EXes to Lunch Friday.' The first EX word is ExStart, the second is Exchange.",
  "terms": [
   [
    "ABR",
    "Area border router: connects area 0 to other areas and generates type 3 summary LSAs."
   ],
   [
    "ASBR",
    "Autonomous system boundary router: redistributes external routes into OSPF as type 5 LSAs (type 7 in an NSSA)."
   ],
   [
    "DR and BDR",
    "Designated and backup designated router elected on broadcast networks to reduce adjacencies; the election is not preemptive."
   ],
   [
    "Stub area",
    "An area that blocks type 5 external LSAs and receives a default route from the ABR."
   ],
   [
    "Totally stubby area",
    "An area that blocks type 3 and type 5 LSAs and receives only a default route from the ABR."
   ],
   [
    "NSSA",
    "Not-so-stubby area: blocks type 5 LSAs but allows local externals as type 7 LSAs, translated to type 5 by the ABR."
   ],
   [
    "LSDB",
    "Link-state database: the set of LSAs a router uses to run SPF; identical for all routers in an area."
   ]
  ],
  "example": "A branch area has a router that redistributes a partner's static routes, and the design team wants to keep the branch LSDB small. A stub area is impossible because it forbids an ASBR, so they configure NSSA: the partner routes enter as type 7, the ABR translates them to type 5 for the backbone, and the branch never receives other external LSAs. Later they change it to totally NSSA with `area 2 nssa no-summary` on the ABR so the branch also drops inter-area routes and relies on a default.",
  "mistakes": [
   [
    "Two OSPF routers stuck in 2-Way on an Ethernet segment indicate a problem.",
    "Between two DROTHERs on a broadcast segment, 2-Way is the normal final state. They go Full only with the DR and BDR. Stuck in ExStart or Exchange is the real red flag, usually an MTU mismatch."
   ],
   [
    "A stub area blocks type 3 LSAs.",
    "A stub area blocks type 5. Blocking type 3 as well makes it totally stubby, configured with no-summary on the ABR."
   ],
   [
    "A distribute-list in under OSPF stops routes from being flooded to other routers.",
    "It only filters what enters the local routing table. LSAs still flood. To truly filter inter-area routes, use area filter-list on the ABR."
   ],
   [
    "You can summarize routes on any OSPF router inside an area.",
    "OSPF summarization only works at the ABR (area range) or the ASBR (summary-address), because routers within an area must keep identical LSDBs."
   ]
  ],
  "tryit": [
   [
    "A hospital's branch area holds a router that redistributes routes to a lab instrument network. Branch routers have little memory, and the team wants them to carry only intra-area routes plus a default. Which area type fits, and where is the key command entered?",
    "Totally NSSA. A stub or totally stubby area is ruled out because the area contains an ASBR. Configure `area X nssa` on all routers in the area and `area X nssa no-summary` on the ABR, which blocks type 3 and type 5, allows the local type 7 externals and injects a default."
   ],
   [
    "After a new router replaces an old one, `show ip ospf neighbor` shows the adjacency stuck in ExStart. Area, timers and authentication match. What do you check next?",
    "The interface MTU on both sides. A mismatch stops database description exchange, leaving the neighbors in ExStart or Exchange. Make the MTUs match; `ip ospf mtu-ignore` is a workaround, not a fix."
   ]
  ],
  "tip": "Stub blocks type 5; totally stubby blocks 3 and 5; NSSA blocks type 5 but allows type 7 from a local ASBR. Neighbors stuck in ExStart or Exchange usually mean an MTU mismatch; routers stuck in 2-Way on Ethernet are normal between DROTHERs. Summarize only at the ABR or ASBR.",
  "check": [
   [
    "Which LSA type does an ASBR inside an NSSA generate, and what happens to it at the ABR?",
    "Type 7, which the ABR translates to type 5 for other areas."
   ],
   [
    "Two OSPF routers stay in ExStart. What is the likely cause?",
    "An interface MTU mismatch between them."
   ],
   [
    "Why might you set ip ospf network point-to-point on an Ethernet link between two routers?",
    "To skip the DR/BDR election and form the adjacency faster, since only two routers share the link."
   ],
   [
    "What does OSPFv3 use as the neighbor and next-hop address?",
    "The IPv6 link-local address of the neighbor's interface."
   ]
  ]
 },
 {
  "t": "eBGP between directly connected neighbors: neighbor states and best-path selection",
  "hook": "It is Friday afternoon at Lakeshore Outfitters, and the second internet circuit you ordered months ago is finally live. You type the BGP neighbor command, save, and wait. `show ip bgp summary` says Active. A minute later it says Idle, then Active again. Meanwhile the CFO asks why the new, faster circuit is carrying no traffic while the old one stays pegged. The provider's engineer on the phone insists everything on their side is fine. Is the session broken, or is it up and simply losing every path selection contest? To answer, you need to read BGP's neighbor states and understand the ordered list BGP walks when it picks a best path.",
  "simple": "BGP is the system networks use to tell each other which addresses they can reach, the way post offices in different countries agree on how to forward mail. Two routers have to be introduced to each other by hand and then go through a short handshake before they trust each other. Only when the handshake finishes, a state called Established, do they swap route lists. When a router hears about the same destination from two neighbors, it does not just pick the fastest one. It walks down a fixed checklist, such as 'did my admin mark one as preferred' and 'which path passes through fewer networks', and the first item that breaks the tie decides. It is like choosing a flight: first your company's preferred airline, then the fewest stops, then the cheapest.",
  "body": [
   "BGP (Border Gateway Protocol) is the routing protocol of the internet and the usual way enterprises connect to service providers. It is a path-vector protocol: rather than advertising a simple metric, each route carries a set of attributes, including the AS_PATH, the list of autonomous systems (AS) it has crossed. External BGP (eBGP) runs between routers in different autonomous systems; internal BGP (iBGP) runs between routers inside the same AS. The ENCOR exam focuses on eBGP between directly connected neighbors and on how BGP chooses one best path when it hears several.",
   "Unlike OSPF (Open Shortest Path First) or EIGRP (Enhanced Interior Gateway Routing Protocol), BGP does not discover neighbors automatically. You configure each peer by address and AS number, and BGP uses TCP port 179 for reliable transport, so ordinary TCP rules apply: the session needs reachability in both directions and no filter blocking port 179. A basic configuration looks like this:",
   "```\nrouter bgp 65001\n bgp router-id 1.1.1.1\n neighbor 203.0.113.1 remote-as 65100\n network 198.51.100.0 mask 255.255.255.0\n```",
   "The `network` command in BGP works differently from the IGP version. It does not enable BGP on interfaces; it advertises a prefix, and only if an exact match, with the same prefix and mask, already exists in the routing table. That is why engineers sometimes add a static route to Null0 for an aggregate they want to announce. For eBGP, the neighbor must be directly connected by default because eBGP packets are sent with a TTL (time to live) of 1. Peering between loopback addresses would need `ebgp-multihop` (or `disable-connected-check`) plus `update-source` so the session is sourced from the loopback. When a router advertises a route to an eBGP peer, it sets itself as the next hop and prepends its own AS number to the AS_PATH. A router that receives a route already containing its own AS in the AS_PATH rejects it, which is BGP's basic loop prevention.",
   "Neighbor states tell you exactly where a session is stuck. Idle means BGP is not trying to connect, either because it was just configured or because it is waiting after an error. Connect means it is attempting the TCP connection. Active, despite its cheerful name, means the TCP attempt failed and the router is retrying and listening; it is not a healthy state. OpenSent means TCP is up and an OPEN message has been sent. OpenConfirm means an OPEN was received with acceptable parameters and the router is waiting for a KEEPALIVE. Established means the session is up and UPDATE messages carrying routes are flowing. In `show ip bgp summary`, an Established neighbor shows a number, the count of received prefixes, in the State/PfxRcd column instead of a state name, so a number there is good news.",
   "A neighbor flapping between Idle and Active usually means one of two things. Either TCP cannot complete, because of a wrong neighbor address, missing reachability or an ACL (access control list) blocking TCP 179, or TCP completes but the peer rejects the OPEN, most often because the `remote-as` value does not match the AS the peer actually uses. A rejected OPEN typically produces a notification and a log message on at least one side, which is a good first place to look.",
   "Once routes arrive, BGP must choose. When it has several paths to the same prefix, it picks a single best path by walking an ordered list of attributes, stopping at the first one that differs. First, the next hop must be reachable; a path whose next hop is not in the routing table is ignored. Then, in Cisco order: highest weight (Cisco specific, local to the router, default 0 for learned routes); highest local preference (shared within the AS, default 100); prefer locally originated routes; shortest AS_PATH; lowest origin type (IGP before EGP before incomplete); lowest MED (multi-exit discriminator, a hint from a neighboring AS about which entry point to use, compared by default only between paths from the same neighboring AS); eBGP over iBGP; lowest IGP metric to the next hop; then tie-breakers such as the oldest eBGP path and the lowest router ID. Notice the direction of each test: weight and local preference are high-wins, while AS_PATH length, origin and MED are low-wins.",
   "The attributes also split neatly by which direction of traffic they influence. Weight and local preference affect outbound traffic, meaning which exit your own routers use to leave the AS. Weight applies only on the router where it is set, while local preference is carried to every iBGP peer, which makes it the tool for an AS-wide exit policy. AS_PATH prepending and MED influence inbound traffic, meaning how other networks choose to reach you, and both are only suggestions the other side may override with its own policy.",
   "Verification ties it together. `show ip bgp` lists every path in the BGP table, with '>' marking the best path that BGP offers to the routing table and '*' marking valid paths. The columns show the next hop, MED (Metric), local preference, weight and AS_PATH with an origin code at the end, so you can walk the selection list yourself and see which attribute decided. In the Lakeshore case, a session cycling between Idle and Active is not up at all, while an Established session with paths that never win would point instead to attributes such as local preference or a longer AS_PATH."
  ],
  "analogy": "BGP path selection is like a hiring committee with a strict rubric. Candidates are compared on the first criterion, say internal referral; only if they tie does the committee look at the next one, such as years of experience, and so on down the list. A candidate who wins on criterion two is hired even if a rival would have won easily on criterion five. The analogy stops working in one way: some BGP criteria, such as weight, are known only to one router, as if one committee member kept a private scorecard nobody else sees.",
  "mnemonic": "'We Love Oranges AS Oranges Mean Pure Refreshment': Weight, Local preference, Originated locally, AS_PATH, Origin, MED, Paths (eBGP over iBGP), Router ID. The order is right, but it skips the next-hop check at the start and the IGP metric and oldest-path steps near the end.",
  "terms": [
   [
    "eBGP",
    "BGP between routers in different autonomous systems; packets use TTL 1 by default, so peers are expected to be directly connected."
   ],
   [
    "Established",
    "The BGP state in which the session is up and UPDATE messages are exchanged."
   ],
   [
    "Active state",
    "A BGP state meaning the TCP connection attempt failed and the router is retrying; it does not mean the session is healthy."
   ],
   [
    "Weight",
    "Cisco-specific, router-local attribute; the highest value is preferred and it is checked first."
   ],
   [
    "Local preference",
    "AS-wide attribute used to choose the exit point; the highest value wins, default 100."
   ],
   [
    "AS_PATH",
    "The list of autonomous systems a route has crossed, used for loop prevention and as a path-length tie-breaker."
   ],
   [
    "MED",
    "Multi-exit discriminator: a lower value suggests a preferred entry point into the advertising AS."
   ]
  ],
  "example": "An enterprise with two ISPs wants outbound traffic to use ISP A. It sets local preference 200 on routes received from ISP A, so every router in the AS prefers that exit. To steer inbound traffic toward ISP A as well, it prepends its own AS twice on advertisements to ISP B, making that path look longer to the rest of the internet. `show ip bgp` then shows '>' on the ISP A paths with LocPrf 200.",
  "mistakes": [
   [
    "A neighbor in the Active state is up and working.",
    "Active means the TCP connection failed and BGP is retrying. Only Established, shown as a prefix count in show ip bgp summary, means the session is up."
   ],
   [
    "BGP picks the path with the most bandwidth or lowest delay.",
    "BGP does not measure link speed. It walks the attribute list in order: weight, local preference, locally originated, AS_PATH length, origin, MED, eBGP over iBGP and so on."
   ],
   [
    "Lowest weight and lowest local preference win.",
    "Both are high-wins. AS_PATH length, origin and MED are the low-wins attributes."
   ],
   [
    "The BGP network command enables BGP on an interface, like in OSPF.",
    "In BGP it advertises a prefix, and only when an exact prefix and mask match exists in the routing table."
   ]
  ],
  "tryit": [
   [
    "You configure a new eBGP peer to your ISP. The state keeps cycling between Idle and Active. You can ping the ISP router's address, and no ACL on your router mentions port 179. The ISP confirms its side expects AS 65001, but your router runs `router bgp 65010`. What is wrong and how will it look once fixed?",
    "An AS mismatch: the ISP's `remote-as` for you is 65001, so it rejects your OPEN and the session falls back to Idle. Either the ISP updates its configuration or you use the AS number agreed with the ISP. When fixed, show ip bgp summary shows a prefix count instead of a state name."
   ],
   [
    "Your AS has two exits. You want all internal routers to leave through Router A's ISP for every prefix. A colleague suggests setting weight 500 on Router A. Will that achieve the goal?",
    "No. Weight is local to the router where it is set, so only Router A would be affected. Set a higher local preference on routes learned at Router A instead; local preference is shared with all iBGP peers and is checked right after weight."
   ]
  ],
  "tip": "Idle or Active means the session is not up; Active does not mean healthy. Remember the order Weight, Local preference, Originated, AS_PATH, Origin, MED, eBGP over iBGP. Weight and local preference are high-wins; AS_PATH length and MED are low-wins. Weight and local preference steer outbound traffic; prepending and MED steer inbound.",
  "check": [
   [
    "A BGP neighbor cycles between Active and Idle. Name two likely causes.",
    "The TCP session on port 179 cannot complete because of a wrong neighbor address, no route, or an ACL blocking TCP 179; or TCP completes but the OPEN is rejected because of a remote-as mismatch."
   ],
   [
    "Which attribute would you change to influence outbound path choice for the whole AS?",
    "Local preference, because it is shared among iBGP peers and higher is preferred."
   ],
   [
    "Why does a network statement sometimes fail to advertise a prefix?",
    "The exact prefix and mask must exist in the routing table; without a matching route it is not advertised."
   ],
   [
    "Why do two loopback-to-loopback eBGP peers fail to form a session by default?",
    "eBGP uses TTL 1 and expects a directly connected neighbor; you need ebgp-multihop or disable-connected-check plus update-source."
   ]
  ]
 },
 {
  "t": "Policy-based routing with route maps",
  "hook": "At Birchwood Public Library, the branch has two WAN links: an MPLS circuit for staff systems and a cheap broadband line that sits mostly idle. Every afternoon, patrons streaming video on guest Wi-Fi fill the MPLS link, and the circulation desk's checkout system slows to a crawl. Your manager, Tomás, asks for a simple fix: guests out the broadband line, staff on MPLS, and no surprises if the broadband line dies. The routing table only knows destinations, and both groups visit the same websites. How do you make the router care about who is sending the traffic, not just where it is going?",
  "simple": "Normally a router forwards a packet by looking only at where it is going, like a mail carrier who reads just the delivery address. Policy-based routing lets you add your own rules that look at other things, such as who sent the packet, and choose a different road for it. You write the rules as a numbered list. The router checks each rule in order, and the first one that fits decides what happens. If no rule fits, the packet simply follows the normal road. For example, a library could say: 'Anything from the guest network goes out the cheap internet line; everything else goes the usual way.' A good setup also checks that the cheap line is actually working, so guest traffic is not sent down a dead road.",
  "body": [
   "Normal routing looks only at the destination address. Policy-based routing (PBR) lets you override that decision based on other criteria, such as the source address, the application or the packet size. Typical uses include sending guest traffic out a cheap internet link while corporate traffic uses MPLS (Multiprotocol Label Switching), steering a specific server's backups over a dedicated path, or pushing traffic from one department through a security appliance. The key idea is that PBR acts before the routing table: for matching packets, your policy decides the next hop, and the routing table is consulted only when the policy does not apply.",
   "PBR is built with a route map. A route map is an ordered list of statements, each with a sequence number, an action (permit or deny) and optional `match` and `set` clauses. Statements are evaluated in sequence order, and the first statement whose match clauses all succeed is applied; later statements are not checked. In PBR, the actions have specific meanings. A permit statement that matches means 'apply the set actions to this packet'. A deny statement that matches means 'do not policy-route this packet; use normal destination-based routing'. Packets that match no statement are also routed normally, because the implicit deny at the end of a route map, in the PBR context, simply means normal forwarding rather than dropping. This is very different from an interface ACL (access control list), where the implicit deny discards traffic.",
   "Match criteria usually reference an ACL. `match ip address 101` matches packets permitted by ACL 101, and that ACL is only a classifier: a deny entry in it means the packet does not match this route map statement, not that the packet is dropped. You can also match on packet length with `match length`, for example to send small interactive packets one way and large transfers another.",
   "The set clause decides what happens to matching packets. `set ip next-hop 192.0.2.1` sends the packet to that next hop if it is directly connected and reachable, overriding whatever the routing table says. `set ip default next-hop` is gentler: it is used only if the routing table has no explicit route to the destination other than the default route, so specific routes still win. `set interface` sends the packet out a specific interface, which suits point-to-point links where there is no next-hop address to resolve. Some platforms also let you set markings, such as `set ip precedence` or DSCP (Differentiated Services Code Point), so PBR can classify traffic for QoS (quality of service) as well as steer it.",
   "Here is a complete guest-traffic policy:",
   "```\naccess-list 110 permit ip 10.10.50.0 0.0.0.255 any\n!\nroute-map GUEST-OUT permit 10\n match ip address 110\n set ip next-hop 198.51.100.1\n!\ninterface GigabitEthernet0/2\n ip policy route-map GUEST-OUT\n```",
   "Placement matters. The policy is applied inbound on the interface where traffic arrives, with `ip policy route-map NAME`; it acts on packets as they enter, before the routing decision is made. Applying it to the outbound WAN interface does nothing useful, because by the time a packet reaches the exit interface, the routing decision has already been made. Traffic generated by the router itself, such as pings, syslog or routing protocol packets it originates, is not affected by interface policies. To policy-route that local traffic, use `ip local policy route-map NAME` in global configuration.",
   "The biggest operational risk is black-holing traffic. If the configured next hop fails but the interface toward it stays up, as often happens when a provider's equipment beyond your link fails, PBR may keep sending traffic there and users see an outage while the routing table looks fine. The fix is `set ip next-hop verify-availability` combined with object tracking, for example an IP SLA (service-level agreement) probe that pings a target through the broadband line. When the tracked object goes down, the router skips that next hop and falls back to another listed next hop or to normal routing. On most Catalyst switches PBR is processed in hardware using TCAM (ternary content-addressable memory), so it runs at line rate, but complex policies with many entries can consume those limited resources.",
   "Verification closes the loop. `show route-map` lists each statement with its match and set clauses and, importantly, counters of how many packets and bytes matched, which quickly shows whether traffic is hitting the policy at all. `show ip policy` lists which interfaces have which route map applied. In a lab, `debug ip policy` shows each packet's policy decision, noting whether it was policy-routed or sent to normal forwarding. When traffic is not being policy-routed, check in this order: is the policy on the correct ingress interface, does the ACL actually match the real source addresses, and is the next hop reachable and tracked as up."
  ],
  "analogy": "PBR is like a hotel concierge standing at the front door with a short list of special instructions: 'Guests with a conference badge take the shuttle; guests heading to the airport use the car service.' Everyone not on the list is pointed to the usual taxi stand, not turned away. That is why a non-matching packet is routed normally rather than dropped. The analogy stops working on placement: the concierge must stand at the entrance where guests arrive, because PBR only works inbound on the ingress interface.",
  "terms": [
   [
    "Policy-based routing",
    "Forwarding packets based on criteria other than the destination, defined by a route map and applied before the routing table lookup."
   ],
   [
    "Route map",
    "An ordered list of permit or deny statements with match and set clauses; the first fully matching statement applies."
   ],
   [
    "set ip next-hop",
    "A PBR action that forwards matching packets to a specific directly connected next hop, overriding the routing table."
   ],
   [
    "set ip default next-hop",
    "A PBR action used only when the routing table has no explicit route for the destination other than the default route."
   ],
   [
    "ip policy route-map",
    "Interface command that applies PBR to packets arriving on that interface."
   ],
   [
    "ip local policy",
    "Global command that applies PBR to traffic generated by the router itself."
   ],
   [
    "verify-availability",
    "An option that ties a PBR next hop to a tracked object so the router stops using it when the object goes down."
   ]
  ],
  "example": "A branch wants guest Wi-Fi (10.10.50.0/24) to use the broadband link while everything else follows OSPF over MPLS. The engineer matches the guest subnet in ACL 110, sets the broadband gateway as next hop with verify-availability tied to an IP SLA track, and applies the route map inbound on the guest subinterface. `show route-map` shows the match counters climbing. When broadband fails, the track goes down and guest traffic falls back to normal routing over MPLS.",
  "mistakes": [
   [
    "A packet that matches no route map statement in PBR is dropped by the implicit deny.",
    "In PBR the implicit deny means 'route normally'. The packet follows the routing table."
   ],
   [
    "PBR should be applied outbound on the WAN interface the traffic should leave from.",
    "PBR is applied inbound on the interface where traffic enters, because it must act before the routing decision."
   ],
   [
    "set ip default next-hop overrides the routing table just like set ip next-hop.",
    "set ip default next-hop is used only when there is no explicit route for the destination other than a default route; set ip next-hop overrides the routing table."
   ],
   [
    "An interface PBR policy also steers pings and syslog sent by the router itself.",
    "Locally generated traffic needs ip local policy route-map in global configuration."
   ]
  ],
  "tryit": [
   [
    "A consultant applies a PBR route map to the router's broadband-facing interface so backup traffic from the server VLAN will leave that way. The route map matches the server subnet and sets the broadband gateway as next hop. `show route-map` shows zero matches after an hour of backups. What is wrong?",
    "The policy is on the wrong interface. PBR acts on packets entering an interface, so it must be applied with ip policy route-map on the server VLAN interface where the backup traffic arrives. Once moved, the match counters should increase."
   ],
   [
    "Your PBR next hop is a broadband modem. Last night the provider's network failed, but the Ethernet link to the modem stayed up, and guest users lost internet access for three hours while staff were fine. What change prevents a repeat?",
    "Use set ip next-hop verify-availability with a track object based on an IP SLA probe through the broadband path. When the probe fails, the track goes down and guest traffic falls back to normal routing instead of being sent into a dead path."
   ]
  ],
  "tip": "PBR is applied inbound on the ingress interface and is checked before the routing table. A packet that matches a deny statement or no statement is routed normally, not dropped. Use ip local policy for router-generated traffic and verify-availability with tracking to avoid black holes.",
  "check": [
   [
    "What happens to a packet that does not match any statement in a PBR route map?",
    "It is forwarded using the normal routing table."
   ],
   [
    "What is the difference between set ip next-hop and set ip default next-hop?",
    "set ip next-hop overrides the routing table; set ip default next-hop is used only when there is no explicit route for the destination."
   ],
   [
    "On which interface and direction is PBR applied?",
    "Inbound, on the interface where the traffic enters the router."
   ],
   [
    "Which command shows whether packets are matching each route map statement?",
    "show route-map, which displays match counters for each statement."
   ]
  ]
 },
 {
  "t": "IP services: NTP and PTP, NAT and PAT, HSRP and VRRP",
  "hook": "At 7:40 a.m. the help desk at Granite Falls School District lights up: teachers at the high school cannot reach the internet. Overnight a storm knocked out power, and both core switches rebooted. The backup switch took over as the default gateway, but its uplink is the slow one. Worse, when you open the logs to see what happened, the timestamps on the two switches disagree by eleven minutes, so you cannot even tell which one failed first. Then a teacher mentions that the new web server in the library cannot be reached from home. Three small IP services, all quietly misconfigured. Which ones, and why?",
  "simple": "This lesson covers three helper services that keep a network running smoothly. First, clocks: NTP keeps every device's clock in step by asking a trusted time source, the way you set your watch by an official clock. PTP does the same job with far more precision for special uses like factory machines. Second, address translation: NAT swaps private inside addresses for a public one at the edge, like a company switchboard where outsiders call one main number. PAT lets hundreds of devices share one public address by keeping track of which conversation belongs to whom. Third, gateway backup: HSRP and VRRP let two routers share one gateway address, so if one fails the other answers in its place and devices never notice the change.",
  "body": [
   "Accurate time underpins logging, certificates, authentication and troubleshooting. NTP (Network Time Protocol, UDP port 123) synchronizes device clocks to a reference. Its hierarchy is measured in stratum: stratum 0 is a reference clock such as GPS (Global Positioning System) or an atomic clock, a server directly attached to it is stratum 1, and each hop away adds one. A lower stratum is closer to the source, and stratum 16 means unsynchronized. On Cisco IOS, `ntp server 192.0.2.10` makes the device a client of that server, and `ntp master` makes it an authoritative source using its own internal clock, which is useful in an isolated lab but not as accurate as a real reference. Protect NTP with authentication (`ntp authenticate`, `ntp authentication-key`, `ntp trusted-key`) so an attacker cannot feed devices false time, and verify with `show ntp status`, which shows whether the clock is synchronized and at what stratum, and `show ntp associations`, which lists servers with an asterisk beside the one in use.",
   "NTP typically achieves millisecond-level accuracy, which is plenty for logs and certificates. PTP (Precision Time Protocol, IEEE 1588) goes much further, down to sub-microsecond accuracy, by using hardware timestamping in network interfaces so software delays do not blur the measurement. PTP elects a grandmaster clock using the best master clock algorithm, and switches along the path can act as boundary clocks, which synchronize to the upstream clock and serve time downstream, or transparent clocks, which measure their own forwarding delay and correct the timing messages. PTP matters where tiny timing errors cause real problems: industrial automation, broadcast audio and video, and financial trading.",
   "NAT (Network Address Translation) rewrites IP addresses as packets cross a router, most often so hosts using private RFC 1918 addresses can reach the internet. Cisco uses four address terms, and exam questions depend on them. Inside local is the host's real private address. Inside global is the address the outside world sees for that host. Outside global is the remote host's real address. Outside local is how the remote host appears to inside hosts, usually the same as outside global. A simple memory aid: local is how things look from inside, global is how they look from outside.",
   "There are three common NAT forms. Static NAT maps one inside address permanently to one global address, used for servers that must be reachable from outside, such as the library web server in the opening scene. Dynamic NAT maps inside hosts to addresses from a pool on demand, one to one, so when the pool runs out, new hosts cannot get out. PAT (Port Address Translation), also called NAT overload, maps many inside hosts to one global address by also translating source ports, and is how most networks share a single public address. A typical PAT configuration marks the interfaces and ties an ACL (access control list) of inside sources to the outside interface address:",
   "```\ninterface Gi0/0\n ip nat inside\ninterface Gi0/1\n ip nat outside\n!\naccess-list 1 permit 10.0.0.0 0.255.255.255\nip nat inside source list 1 interface Gi0/1 overload\n```",
   "Verify with `show ip nat translations`, which lists each mapping with its inside local, inside global, outside local and outside global addresses (and ports, for PAT), and `show ip nat statistics`, which shows hit counts and which interfaces are inside and outside. The most common mistakes are reversed inside and outside interface roles, an ACL that does not match the hosts' real source addresses, and a missing static entry for a server that must accept inbound connections.",
   "First hop redundancy protocols (FHRPs) solve a different problem. Hosts usually have one default gateway configured, so if that router fails, they are cut off even when another router is available. HSRP (Hot Standby Router Protocol) and VRRP (Virtual Router Redundancy Protocol) let two or more routers share a virtual IP address and virtual MAC address that hosts use as their gateway. HSRP is Cisco proprietary: one router is active and forwards traffic, and one is standby, ready to take over. HSRP version 1 uses multicast 224.0.0.2 and virtual MAC 0000.0c07.acXX, where XX is the group number in hexadecimal. Version 2 uses 224.0.0.102, supports more groups and IPv6, and uses MAC 0000.0c9f.fXXX.",
   "Priority and preemption decide who leads. The default HSRP priority is 100 and the highest priority wins, but preemption is disabled by default. That means a recovered router with a higher priority does not reclaim the active role unless you configure `standby 1 preempt`, which is exactly what happened at the school district after the power cut. VRRP, an open standard defined in an RFC, uses the terms master and backup, multicast 224.0.0.18 and virtual MAC 0000.5e00.01XX. It allows the virtual IP to be a real interface address on one router, and preemption is enabled by default. Both protocols support tracking, so an uplink failure lowers the router's priority and triggers failover to a router with a working uplink. Check status with `show standby brief` or `show vrrp brief`, which show the group, priority, preemption flag, state and virtual IP."
  ],
  "analogy": "An FHRP is like a store's main phone number that rings at whichever front desk is staffed. Customers always dial the same number (the virtual IP) and never need to know which clerk answers. HSRP preemption is the rule about shift changes: by default, the senior clerk returning from a break does not take the phone back from the junior clerk, so you must say so explicitly. The analogy stops working with load: one HSRP group has only one active router forwarding traffic, while a store could staff both desks at once.",
  "terms": [
   [
    "Stratum",
    "NTP's distance from the reference clock; lower is more accurate, 16 means unsynchronized."
   ],
   [
    "PTP",
    "Precision Time Protocol (IEEE 1588): hardware-timestamped time sync with sub-microsecond accuracy, using a grandmaster clock."
   ],
   [
    "Inside local and inside global",
    "The host's real private address and the translated address the outside sees."
   ],
   [
    "Static NAT",
    "A permanent one-to-one mapping between an inside local and an inside global address, used for servers reachable from outside."
   ],
   [
    "PAT",
    "NAT overload: many inside hosts share one global address using different source ports."
   ],
   [
    "Virtual IP",
    "The shared gateway address that HSRP or VRRP routers present to hosts."
   ],
   [
    "Preemption",
    "Allows a higher-priority FHRP router to take back the active or master role; off by default in HSRP, on in VRRP."
   ]
  ],
  "example": "After a power cut, the original HSRP active router reboots with priority 110 but stays in standby, and traffic keeps flowing through the backup router's slower uplink. The engineer adds `standby 10 preempt` on the primary, which then reclaims the active role once it is up. While there, the engineer configures both switches with `ntp server` pointing at the district's time source so future log timestamps agree, and adds a static NAT entry for the library web server.",
  "mistakes": [
   [
    "A higher-priority HSRP router automatically takes back the active role when it comes back online.",
    "HSRP preemption is off by default; configure standby preempt. VRRP preempts by default."
   ],
   [
    "Inside global is the private address of the inside host.",
    "Inside local is the real private address. Inside global is the translated address the outside world sees."
   ],
   [
    "A lower NTP stratum means a less trustworthy clock.",
    "Lower stratum is closer to the reference clock. Stratum 1 is attached directly to a reference; 16 means unsynchronized."
   ],
   [
    "PTP is just a newer name for NTP with the same accuracy.",
    "PTP uses hardware timestamping and boundary or transparent clocks to reach sub-microsecond accuracy; NTP is typically millisecond class."
   ]
  ],
  "tryit": [
   [
    "A clinic's internal users can browse the internet through PAT, but a patient portal server at 10.1.1.20 cannot be reached from outside. `show ip nat translations` shows only dynamic entries with port numbers. What is missing and why?",
    "A static NAT mapping for the server, such as ip nat inside source static 10.1.1.20 with a public address. PAT creates translations only for connections started from inside, so outside clients have no mapping to reach the server until a static entry exists."
   ],
   [
    "Two distribution switches run a gateway redundancy protocol for a VLAN. Your company uses gear from several vendors and wants the virtual IP to be the real interface address of the primary switch, with the primary always reclaiming the role after a reboot without extra commands. Which protocol fits?",
    "VRRP. It is an open standard, allows the virtual IP to match a real interface address, and has preemption enabled by default. HSRP is Cisco proprietary and needs preempt configured."
   ]
  ],
  "tip": "HSRP preemption is off by default; VRRP preemption is on. HSRP v1 uses 224.0.0.2, v2 uses 224.0.0.102, VRRP uses 224.0.0.18. In NAT, inside local is the real private address and inside global is what the internet sees. NTP is millisecond class; PTP uses hardware timestamps for sub-microsecond accuracy.",
  "check": [
   [
    "What is the difference between static NAT and PAT?",
    "Static NAT is a permanent one-to-one mapping; PAT maps many inside hosts to one address by translating ports."
   ],
   [
    "Which FHRP is the open standard and what multicast address does it use?",
    "VRRP, using 224.0.0.18."
   ],
   [
    "What does a device with stratum 3 tell you?",
    "It is three hops from a reference clock: synchronized to a stratum 2 server."
   ],
   [
    "Which commands confirm a NAT configuration is working?",
    "show ip nat translations to see the mappings and show ip nat statistics to see hits and the inside and outside interfaces."
   ]
  ]
 },
 {
  "t": "Multicast: IGMPv2/v3, PIM sparse mode, RP, RPF check, SSM",
  "hook": "The quarterly all-hands at Northwind Mutual Insurance starts in ten minutes, streamed live as multicast video to every office. The headquarters auditorium sees the test pattern fine. The Denver office sees a black screen. On the Denver router, `show ip igmp groups` lists the group, so the viewers clearly asked for it. Upstream, the rendezvous point shows the stream arriving from the source. Somewhere between the two, the packets vanish, and nothing is shown as down. Marcus from facilities keeps asking whether he should reboot something. What is silently throwing the video away, and how do you find it before the CEO starts talking?",
  "simple": "Multicast is a way to send one stream to many viewers without making a separate copy for each one, like a radio station broadcasting to everyone tuned to a channel. Viewers 'tune in' by telling their local router they want a channel, which is called joining a group. Routers then build a delivery tree so the stream is copied only where paths split toward interested viewers. Often the routers use a meeting point, called the rendezvous point, where senders and listeners find each other. To stop packets from looping, each router checks that a stream arrives from the direction it expects, back toward the sender, and throws it away if not. A simpler style, called source-specific multicast, lets viewers name the exact sender, so no meeting point is needed.",
  "body": [
   "Multicast sends one stream to many receivers without the source sending a separate copy to each. Receivers join a group, identified by a class D address in 224.0.0.0/4, and the network replicates packets only where paths toward interested receivers diverge. Common uses are video distribution, financial market data and software imaging, where unicast would multiply the load on the source and the links near it. Multicast has two halves that the exam keeps separate: hosts telling their local router they want a group, and routers building distribution trees between sources and receivers.",
   "IGMP (Internet Group Management Protocol) handles the first half, running between hosts and their first-hop router. In IGMPv2, a host sends a membership report to join a group, and the router periodically sends general queries to check whether members are still present. When a host is finished, it sends a leave message; the router responds with a group-specific query and, if no one else answers, stops forwarding quickly. IGMPv2 joins are (*,G), meaning 'any source for group G'. IGMPv3 adds source filtering: a host can ask for traffic to a group from a specific source, (S,G), or ask to exclude certain sources. IGMPv3 is required for Source-Specific Multicast. On switches, IGMP snooping listens to these host messages so the switch forwards multicast only to ports with interested receivers instead of flooding every port in the VLAN, which would otherwise treat the stream like broadcast.",
   "PIM (Protocol Independent Multicast) handles the second half, between routers. It is called protocol independent because it has no topology protocol of its own; it uses whatever unicast routing table already exists, whether built by OSPF, EIGRP, BGP or static routes. PIM sparse mode (PIM-SM) assumes receivers are sparse and uses explicit joins: nothing is forwarded down a branch until someone asks for it. The older PIM dense mode floods traffic everywhere and then prunes branches with no receivers, and is rarely used today.",
   "Sparse mode relies on a rendezvous point (RP), a router where sources and receivers meet. When a receiver joins, its router, the last-hop router, sends a (*,G) PIM join hop by hop toward the RP, building a shared tree, also called the RPT (rendezvous point tree). When a source starts sending, its first-hop router registers the traffic with the RP by encapsulating it in unicast PIM register messages. The RP then joins a tree toward the source so traffic can flow natively, and forwards it down the shared tree. Once traffic flows, the last-hop router usually switches to the shortest path tree (SPT) by sending an (S,G) join directly toward the source, which can give a more efficient path that no longer passes through the RP. Every router must agree on which router is the RP for a group. It can be configured statically with `ip pim rp-address`, or learned dynamically with Auto-RP (Cisco) or BSR (bootstrap router, the standards-based method).",
   "The RPF (reverse path forwarding) check is how multicast prevents loops, and it is the most common reason multicast silently fails. Unicast routing looks at where a packet is going; RPF looks at where it came from. When a multicast packet arrives, the router checks its unicast routing table: is this the interface I would use to reach the source (or the RP, for shared tree traffic)? If yes, the packet passes and is forwarded down the tree. If not, it is dropped. RPF failures usually happen because unicast routing is asymmetric, or because PIM is not enabled on the interface that unicast routing prefers toward the source. In `show ip mroute`, an RPF problem often shows up as an incoming interface of Null for an (S,G) entry, and `show ip rpf <source>` reveals which interface the router expects.",
   "SSM (Source-Specific Multicast) simplifies the whole picture. Receivers use IGMPv3 to specify both the source and the group, so the last-hop router already knows where the stream comes from and builds an (S,G) shortest path tree directly to the source. No RP is needed, which removes a potential single point of failure and the register process entirely. SSM uses the 232.0.0.0/8 range by default and is enabled with `ip pim ssm default`. It suits one-to-many applications where the source is known, such as a video channel or a market data feed.",
   "Configuration is short. Enable multicast routing globally with `ip multicast-routing`, then `ip pim sparse-mode` on every interface that should carry multicast, including the ones facing receivers and the links between routers. For verification, `show ip mroute` displays the (*,G) and (S,G) entries with their incoming interface and outgoing interface list, `show ip pim neighbor` confirms PIM adjacencies, `show ip igmp groups` shows which groups receivers have joined on each interface, and `show ip rpf <source>` explains the RPF decision. Reading them in order, from receivers up to the source, is a reliable troubleshooting path."
  ],
  "analogy": "Think of a newspaper delivery network. Readers sign up at their local depot (IGMP). Depots order bundles from the regional warehouse (the RP), and the warehouse arranges pickup from the printer (register). Once deliveries flow, a depot may arrange a direct route from the printer (the shortest path tree). The RPF check is the depot only accepting bundles from the truck on its expected route, so duplicates looping around are refused. SSM is a reader who names the exact printer, so no warehouse is needed. The analogy fails on copying: routers duplicate packets at branch points, which real newspapers cannot do.",
  "terms": [
   [
    "IGMP",
    "The protocol hosts use to join and leave multicast groups with their local router; IGMPv3 adds source filtering."
   ],
   [
    "IGMP snooping",
    "A switch feature that listens to IGMP messages so multicast is forwarded only to ports with interested receivers."
   ],
   [
    "PIM sparse mode",
    "A multicast routing protocol that forwards only after explicit joins, using an RP for shared trees."
   ],
   [
    "Rendezvous point",
    "The router where multicast sources register and receivers join the shared (*,G) tree."
   ],
   [
    "Shortest path tree",
    "An (S,G) tree rooted at the source, built with joins sent directly toward the source."
   ],
   [
    "RPF check",
    "Forwarding a multicast packet only if it arrived on the interface the unicast table uses to reach its source or RP."
   ],
   [
    "SSM",
    "Source-Specific Multicast: receivers request (S,G) with IGMPv3, trees go directly to the source, no RP; range 232.0.0.0/8."
   ]
  ],
  "example": "A video stream reaches the RP but not a remote site. `show ip mroute` on the remote router shows the (S,G) incoming interface as Null, and `show ip rpf` for the source points out an interface where PIM is not enabled. Enabling `ip pim sparse-mode` on that interface lets the RPF check pass and the stream flows.",
  "mistakes": [
   [
    "IGMP runs between routers to build multicast trees.",
    "IGMP runs between hosts and their first-hop router. PIM runs between routers."
   ],
   [
    "SSM needs a rendezvous point like regular sparse mode.",
    "SSM receivers name the source with IGMPv3, so routers build (S,G) trees directly to the source without an RP."
   ],
   [
    "The RPF check compares the packet's destination group with the routing table.",
    "RPF checks the source: the packet must arrive on the interface the unicast table would use to reach the source, or the RP for shared tree traffic."
   ],
   [
    "A switch without IGMP snooping sends multicast only to joined ports.",
    "Without snooping, a switch floods multicast to all ports in the VLAN. Snooping limits it to ports with receivers."
   ]
  ],
  "tryit": [
   [
    "A trading firm wants receivers to get a market data feed from one known server. Leadership wants to avoid depending on a single meeting-point router, and the receiving hosts support IGMPv3. Which multicast model fits, and what range should the group use?",
    "SSM. Receivers request (S,G) with IGMPv3, routers build trees straight to the source and no RP is needed. Use a group in 232.0.0.0/8 and enable ip pim ssm default."
   ],
   [
    "A new link was added between two campus routers and made the preferred unicast path back to a video source. Since then, one building lost the stream, though IGMP groups still show receivers. Only `ip address` was configured on the new link. What is the likely cause?",
    "An RPF failure. The unicast table now points toward the source through the new link, but PIM is not enabled there, so the stream arrives on the old interface, fails the RPF check and is dropped. Enable ip pim sparse-mode on the new link."
   ]
  ],
  "tip": "IGMP is host to router; PIM is router to router. (*,G) means shared tree through the RP; (S,G) means source tree. SSM needs IGMPv3 and no RP, using 232.0.0.0/8. When multicast silently fails, check RPF first with show ip rpf.",
  "check": [
   [
    "Why does SSM not need a rendezvous point?",
    "Receivers specify the source with IGMPv3, so routers can build (S,G) trees directly toward it without a meeting point."
   ],
   [
    "A multicast packet arrives on an interface that is not the router's best path back to the source. What happens?",
    "It fails the RPF check and is dropped."
   ],
   [
    "What does IGMP snooping do on a switch?",
    "It listens to IGMP messages so it forwards multicast only to ports with interested receivers instead of flooding the VLAN."
   ],
   [
    "How does a source's first-hop router deliver traffic to the RP in PIM sparse mode?",
    "It encapsulates the multicast in unicast PIM register messages sent to the RP."
   ]
  ]
 },
 {
  "t": "Diagnose problems with debugs, conditional debugs, ping and traceroute",
  "hook": "It is 4:55 p.m. at Riverbend Credit Union, and the new branch in Oakdale cannot reach the loan server at headquarters. From the branch router you ping the server and get five exclamation points, so the network looks fine. The branch manager, Denise, insists her staff still cannot connect. A colleague suggests turning on `debug ip packet` on the headquarters core router to see what is going on. The core router is carrying traffic for 40 branches at the end of the business day. Is that a good idea? And why did your ping succeed when users' traffic fails?",
  "simple": "When something on a network breaks, you need tools to see what is happening. Ping is like knocking on a door and waiting for an answer: it tells you whether a device replies. Traceroute is like asking for each stop along a bus route, so you can see where the trip ends early. Debugs are like turning on a live microphone inside the router that reports everything a part of it is doing; very useful, but if you open the microphone too wide on a busy router, the reporting itself can overload it. Conditional debugs narrow the microphone to one connection or one device. A key trick is choosing where your test starts from: knocking from the back door can work even when the front door path is broken.",
  "body": [
   "Troubleshooting on the ENCOR exam combines simple reachability tests with detailed protocol inspection. The skill being tested is choosing the right tool for the question you are asking and using it safely on a production device. Ping answers 'can I reach it', traceroute answers 'where does the path go and where does it stop', show commands answer 'what state is the device in', and debugs answer 'what is happening right now'.",
   "Ping sends ICMP (Internet Control Message Protocol) echo requests and waits for echo replies. On Cisco IOS, each result is shown as a character. An exclamation point is a reply. A period is a timeout, meaning nothing came back in time. 'U' means a router returned a destination unreachable message, which tells you a device along the way actively rejected the packet. 'Q' means source quench, 'M' means the packet could not be fragmented, and '?' is an unknown packet type. The difference between '.' and 'U' is useful: a timeout could be a missing route or a silent filter, while 'U' points to a specific device that knows it cannot deliver the packet.",
   "The extended ping is where much of the diagnostic value lies. Type `ping` alone to be prompted, or use keywords, to set the source interface, packet size, repeat count and the DF (don't fragment) bit. By default, a router sources a ping from the interface it uses to send the packet, often the WAN interface, and the far end usually has a route back to that WAN subnet. Sourcing from a LAN or loopback interface, as in `ping 10.2.2.2 source Loopback0`, tests whether the return path exists for that subnet, which is exactly what users on the LAN depend on. That is why the Oakdale ping succeeded while users failed. Using `size 1500 df-bit` is how you find MTU (maximum transmission unit) problems, such as on tunnels where encapsulation overhead means full-size packets cannot pass without fragmentation; the 'M' result or timeouts at larger sizes give it away.",
   "Traceroute shows the path hop by hop. Cisco IOS sends UDP probes with an increasing TTL (time to live), starting at 1. Each router that decrements the TTL to 0 discards the probe and returns an ICMP time exceeded message, which identifies that router. When a probe finally reaches the destination, the destination returns ICMP port unreachable, because nothing listens on the high UDP port used, and that ends the trace. Windows `tracert` uses ICMP echo requests instead of UDP. In IOS output, an asterisk means no reply within the timeout. That can indicate a filter or a router that rate-limits ICMP rather than a real failure, so a single row of asterisks in the middle of an otherwise complete trace is not alarming. A trace that stops at a specific hop and shows only asterisks afterward points to where to look next: the last responding router or the one just past it. Both ping and traceroute accept `vrf NAME` when you work inside a VRF (virtual routing and forwarding) instance, because otherwise they use the global routing table.",
   "Debugs show real-time events from a process, such as `debug ip ospf adj` for OSPF adjacency changes or `debug ip bgp updates` for BGP routing updates. They are powerful but dangerous. Debug output is processed by the CPU, and on a busy router a broad debug such as `debug ip packet` can drive CPU to 100 percent and cause an outage, which is why the colleague's suggestion in the opening scene is risky. Good practice follows a few rules. Prefer show commands first, because they are cheap and often answer the question. Send debug output to the log buffer rather than the console, with `no logging console` and `logging buffered 64000 debugging`, and read it with `show logging`. Use `terminal monitor` to see messages in an SSH session. Enable `service timestamps debug datetime msec` so events are timestamped to the millisecond. Scope the debug as narrowly as possible, and always know how to stop it with `undebug all`, abbreviated `u all`, which is worth typing in advance in another session on a fragile device.",
   "Conditional debugging restricts output to what you care about. `debug condition interface GigabitEthernet0/1` limits supported debugs to that interface, and `debug condition ip 10.1.1.10` limits them to traffic involving one host. Many debugs also accept an ACL (access control list): `debug ip packet 100 detail` shows only packets matching ACL 100. Note that `debug ip packet` only shows process-switched packets, those handled by the CPU, not packets switched by CEF (Cisco Express Forwarding), so most transit traffic never appears in it. Remove conditions with `undebug condition all` or `no debug condition all` when finished, or later debugs may seem mysteriously silent.",
   "A structured method keeps all of this purposeful: define the problem, gather information with show commands, ping and traceroute, form a hypothesis, test it (perhaps with a narrow debug), fix, verify and document. Many ENCOR scenarios follow the OSI (Open Systems Interconnection) model bottom up, confirming physical and data link layers before looking at routing. In the Oakdale case, a sourced ping fails, `show ip route` at headquarters shows no route to the new branch LAN, and the fix is advertising the missing subnet. No broad debug was ever needed."
  ],
  "analogy": "Using debugs on a busy router is like asking a receptionist to write down every word spoken in the lobby during rush hour. The notes would be complete, but the receptionist would stop answering phones. A conditional debug is asking them to write down only what one visitor says. The sourced ping is like testing a delivery route by mailing a letter from the customer's address instead of the post office: only then do you learn whether the reply can find its way back.",
  "terms": [
   [
    "Extended ping",
    "A ping that lets you choose the source interface, size, count and don't-fragment bit."
   ],
   [
    "Traceroute",
    "A tool that increments TTL on probes to list each Layer 3 hop to a destination; IOS uses UDP probes."
   ],
   [
    "ICMP time exceeded",
    "The message a router returns when it decrements a packet's TTL to zero, which traceroute uses to identify each hop."
   ],
   [
    "Conditional debug",
    "Debugging limited to a specific interface, address or other condition."
   ],
   [
    "logging buffered",
    "Stores log and debug messages in RAM so they can be read with show logging instead of flooding the console."
   ],
   [
    "undebug all",
    "Command that turns off all debugging immediately."
   ]
  ],
  "example": "Users in a branch cannot reach a server, but a ping from the branch router's WAN interface succeeds. The engineer runs `ping 10.9.9.9 source Gi0/1` from the LAN interface and it fails, revealing that the headquarters router has no route back to the branch LAN because the new subnet was never advertised.",
  "mistakes": [
   [
    "A successful ping from the router proves users on the LAN can reach the destination.",
    "A default ping is sourced from the outgoing interface. Source it from the LAN interface to prove the far end has a return route to the user subnet."
   ],
   [
    "A row of asterisks in a traceroute always means the path is broken at that hop.",
    "Many routers rate-limit or filter ICMP. If later hops reply, the path works; only asterisks that continue to the end point to a real stop."
   ],
   [
    "debug ip packet shows all traffic passing through the router.",
    "It shows only process-switched packets, not CEF-switched transit traffic, and it can overload the CPU if not limited with an ACL or condition."
   ],
   [
    "Debug output is best viewed on the console so you see it immediately.",
    "Console output is slow and can overwhelm the CPU. Send debugs to the log buffer and read them with show logging, or use terminal monitor in SSH."
   ]
  ],
  "tryit": [
   [
    "A GRE tunnel between two sites is up and small pings succeed, but file transfers stall and some web pages never finish loading. Which ping test would confirm your suspicion, and what result would you expect?",
    "Suspect an MTU problem. Run an extended ping with size 1500 and the df-bit set across the tunnel. Expect 'M' results or timeouts at large sizes while small sizes succeed, showing full-size packets cannot cross without fragmentation."
   ],
   [
    "You need to see OSPF adjacency events for one flapping neighbor on a core router that has dozens of OSPF neighbors and high CPU. What do you configure before enabling the debug?",
    "Send debugs to the buffer (no logging console, logging buffered with debugging level), add timestamps, then restrict output with debug condition interface for the neighbor's interface before running debug ip ospf adj. Have undebug all ready."
   ]
  ],
  "tip": "Always prefer show commands, send debug output to the buffer, scope debugs with conditions or ACLs, and know undebug all. In ping output, '.' is a timeout and 'U' is an unreachable message returned by a router. Source pings from the LAN interface to test the return path.",
  "check": [
   [
    "Why source a ping from a LAN interface when testing branch connectivity?",
    "It tests that the far end has a route back to the LAN subnet, which a ping sourced from the WAN interface does not prove."
   ],
   [
    "How does IOS traceroute discover each hop?",
    "It sends UDP probes with increasing TTL; each router where TTL expires returns ICMP time exceeded, and the destination returns port unreachable."
   ],
   [
    "How can you limit debug output to one interface?",
    "Use debug condition interface followed by the interface name before enabling the debug."
   ],
   [
    "What does a 'U' in IOS ping output mean?",
    "A device along the path returned an ICMP destination unreachable message."
   ]
  ]
 },
 {
  "t": "SNMP versions (v2c vs v3 authPriv), traps and polling",
  "hook": "The external auditor at Silverpine Hospital slides a printout across the table. It is a packet capture from the management VLAN, and in the middle, in plain readable text, is the word 'public', followed by a request to change a switch interface setting. The auditor asks Aisha, the network lead, two questions: why can anyone on that VLAN read and change your switch settings, and why did the monitoring system miss the core link failure last Tuesday? Aisha knows both answers point to how the hospital uses SNMP. Which version should they move to, and what changes would make sure the next link failure is not missed?",
  "simple": "SNMP is how a central monitoring computer keeps an eye on network devices. It works in two directions. The monitoring computer can ask each device questions on a schedule, such as 'how busy is your processor', which is called polling. A device can also speak up on its own when something happens, such as a cable being unplugged, which is called a notification. Older versions protect this with a shared password, called a community string, that travels unprotected, so anyone listening can read it, like shouting a door code across a lobby. The newest version, SNMPv3, uses real usernames, proves who sent each message and can scramble the contents so eavesdroppers learn nothing. Its strongest setting, authPriv, does both: it checks identity and encrypts.",
  "body": [
   "SNMP (Simple Network Management Protocol) lets a network management system (NMS) monitor devices. Each device runs an SNMP agent that exposes data organized in a MIB (Management Information Base), a tree of objects each identified by an OID (object identifier), a dotted number that points to one piece of information, such as an interface's byte counter or the CPU utilization. SNMP remains the most widely supported monitoring protocol across vendors, and ENCOR tests its versions, its security levels and the difference between its message types.",
   "Information flows in two ways. In polling, the NMS sends Get, GetNext or GetBulk requests to UDP port 161 on the agent and receives responses, usually on a schedule such as every five minutes, which builds regular performance graphs and trends. A Set request changes a value on the device, which is why write access is dangerous and should be avoided or tightly controlled. In notifications, the agent sends an unsolicited message to the NMS on UDP port 162 when an event happens, such as a link going down or a power supply failing. Notifications give fast alerts, since waiting for the next five-minute poll would delay detection, and polling gives trends. Most deployments use both.",
   "Notifications come in two forms, and the difference matters for reliability. A trap is sent once with no acknowledgment. If the network is congested or the very link that failed was on the path to the NMS, the trap can simply be lost, and nobody knows. An inform, available from SNMPv2c onward, is acknowledged by the NMS and resent if no acknowledgment arrives, making it reliable at the cost of more overhead on the device, which must keep it in memory until confirmed. For critical events, informs are the safer choice, which is one reason a missed link-down alert is a classic audit finding.",
   "SNMPv1 and SNMPv2c authenticate with a community string sent in clear text. Anyone who captures a packet learns the string, as the auditor's capture showed, and a read-write community lets them change configuration. SNMPv2c improves functionality without improving security: it adds GetBulk for retrieving large tables efficiently, informs, and 64-bit counters. The 64-bit counters are important on fast interfaces, where 32-bit counters wrap around to zero quickly and make graphs inaccurate. If you must use v2c, use read-only communities, restrict them with an ACL (access control list) so only the NMS can query, and never use default strings such as public or private.",
   "SNMPv3 adds real security through the user-based security model, with named users instead of shared community strings. It defines three security levels. noAuthNoPriv uses a username only, with no real protection. authNoPriv adds authentication with a hash, using HMAC (hash-based message authentication code) with SHA or MD5, where the SHA variants are preferred; this proves who sent the message and that it was not changed in transit, but the contents are still readable. authPriv adds privacy, encrypting the payload with AES (Advanced Encryption Standard), or DES in old deployments. authPriv is the recommended level because it provides authentication, integrity and confidentiality together. SNMPv3 also uses views to restrict which parts of the MIB a group can read or write, so a monitoring account can be limited to exactly the data it needs.",
   "A typical SNMPv3 authPriv configuration builds a view, a group, a user and a notification target:",
   "```\nsnmp-server view NMS-VIEW iso included\nsnmp-server group NMS-GRP v3 priv read NMS-VIEW access 10\nsnmp-server user nmsuser NMS-GRP v3 auth sha AuthPass123 priv aes 128 PrivPass123\nsnmp-server host 10.0.0.50 version 3 priv nmsuser\nsnmp-server enable traps\n```",
   "Here the group uses the `priv` keyword, which means authPriv, and ACL 10 limits which hosts can query the agent. The `snmp-server host` line sends notifications to the NMS using the same user and security level; adding the `informs` keyword to that command sends informs instead of traps. SNMPv3 users do not appear in the running configuration, a deliberate security measure, so verify them with `show snmp user` and groups with `show snmp group`. When SNMPv3 polling fails, the usual causes are a mismatch between the NMS and the device on username, authentication protocol, privacy protocol or passwords, or a firewall or ACL along the path blocking UDP 161 for polling or UDP 162 for notifications. For the hospital, the remedy is clear: move to SNMPv3 authPriv, remove the old communities, restrict access to the NMS subnet, and send critical events as informs."
  ],
  "analogy": "SNMPv2c is like a building where everyone uses the same door code and announces it out loud at the entrance; anyone nearby can learn it. SNMPv3 authPriv is like individual badges plus a sealed envelope: the badge proves who you are, and the envelope keeps your message private. Traps are postcards dropped in the mail with no receipt; informs are certified letters that are re-sent until someone signs for them. The analogy breaks slightly with views, which are more like badges that open only certain rooms.",
  "terms": [
   [
    "MIB and OID",
    "The structured database of manageable objects and the numeric identifier for each object."
   ],
   [
    "Polling",
    "The NMS requesting data from an agent with Get, GetNext or GetBulk on UDP 161, usually on a schedule."
   ],
   [
    "Community string",
    "The clear-text shared password used by SNMPv1 and v2c."
   ],
   [
    "Trap",
    "An unacknowledged notification sent by the agent to the NMS on UDP 162."
   ],
   [
    "Inform",
    "An acknowledged notification, retransmitted if the NMS does not confirm it."
   ],
   [
    "authNoPriv",
    "The SNMPv3 security level with hash-based authentication and integrity but no encryption."
   ],
   [
    "authPriv",
    "The SNMPv3 security level with both authentication and encryption."
   ]
  ],
  "example": "An audit finds routers using SNMPv2c with the community public and read-write access. The team migrates to SNMPv3 authPriv with SHA and AES, restricts polling to the monitoring server subnet with an ACL, removes the old communities, and changes link-down notifications to informs so alerts are not lost during congestion.",
  "mistakes": [
   [
    "SNMPv2c is secure because it requires a community string.",
    "The community string is sent in clear text and can be captured. Only SNMPv3 provides real authentication and encryption."
   ],
   [
    "authNoPriv encrypts SNMP messages.",
    "authNoPriv authenticates and protects integrity with a hash but does not encrypt. Encryption requires authPriv."
   ],
   [
    "Traps are sent from the NMS to the device on UDP 161.",
    "Traps and informs go from the agent to the NMS on UDP 162. Polling goes from the NMS to the agent on UDP 161."
   ],
   [
    "SNMPv3 users are missing from the running configuration, so the configuration failed.",
    "SNMPv3 users are intentionally hidden. Verify with show snmp user."
   ]
  ],
  "tryit": [
   [
    "A retailer's monitoring team says it missed a WAN outage alert. The device logs show the link-down trap was sent, but the WAN link was congested at the time. What change improves the chance that such alerts arrive?",
    "Send critical notifications as informs instead of traps. Informs are acknowledged by the NMS and resent until confirmed, so a single lost packet does not mean a lost alert."
   ],
   [
    "Your security policy requires that monitoring traffic be both authenticated and unreadable to anyone capturing packets. A colleague configures SNMPv3 with `snmp-server group MON v3 auth`. Does this meet the policy?",
    "No. The auth keyword gives authNoPriv, which authenticates but does not encrypt. Use the priv keyword for authPriv, with a privacy protocol such as AES configured on the user."
   ]
  ],
  "tip": "Polling is NMS to agent on UDP 161; traps and informs are agent to NMS on UDP 162. Only SNMPv3 authPriv both authenticates and encrypts. Informs are acknowledged; traps are not. SNMPv3 users are hidden from the running configuration; use show snmp user.",
  "check": [
   [
    "What does SNMPv3 authNoPriv provide that noAuthNoPriv does not, and what does it still lack?",
    "It adds message authentication and integrity with a hash, but it does not encrypt the payload."
   ],
   [
    "Why might an inform be preferred over a trap?",
    "Informs are acknowledged and resent if lost, so critical events are more reliably delivered."
   ],
   [
    "Which UDP port does an NMS use to poll an agent?",
    "UDP 161; notifications go to the NMS on UDP 162."
   ],
   [
    "Why are 64-bit counters important on fast interfaces?",
    "32-bit counters wrap quickly at high speeds, making utilization data inaccurate; SNMPv2c and v3 support 64-bit counters."
   ]
  ]
 },
 {
  "t": "Syslog severity levels and logging configuration",
  "hook": "Every afternoon around 3 p.m., users at Maple Grove Manufacturing lose their connection for a few seconds, and by the time anyone looks, everything is fine again. Jordan, the engineer on duty, logs into the distribution switch, but the log buffer has already rolled over. The central syslog server shows almost nothing, because someone set it to receive only critical messages. And the few entries from different switches have timestamps that disagree by several minutes, so there is no way to line them up. The answer is hiding in messages the switches are generating right now. How do you make sure they are captured, timestamped and kept where you can read them?",
  "simple": "Syslog is the way network devices keep a diary of what happens to them: a cable unplugged, a neighbor router lost, someone changing the settings. Each diary entry gets an importance number from 0 to 7, where 0 is 'the device is unusable' and 7 is 'detailed debugging chatter'. Lower numbers are more serious. You decide where entries go: the screen, the device's own short-term memory, or a central server that keeps them safely. For each place you pick a cutoff level, and the device sends everything at that level and everything more serious. It is like telling an assistant: 'Only interrupt me for level 3 or worse, but write everything down in the log book.' Clocks must agree, or entries from different devices cannot be compared.",
  "body": [
   "Syslog is the standard way network devices report events: interfaces going up or down, routing neighbors changing state, configuration changes, security violations and hardware problems. Messages can be kept locally or sent to a central syslog server, where they can be searched, correlated across devices and kept for audit. The ENCOR exam expects you to know the severity levels by number and name and how to configure where messages go and at what level.",
   "Every message has a severity from 0 to 7, where lower numbers are more serious:",
   "```\n0 Emergencies    system is unusable\n1 Alerts         immediate action needed\n2 Critical       critical conditions\n3 Errors         error conditions\n4 Warnings       warning conditions\n5 Notifications  normal but significant\n6 Informational  informational messages\n7 Debugging      debug messages\n```",
   "The most important rule is how a configured level behaves. When you set a logging level for a destination, the device sends messages at that level and every more severe level, meaning every lower number. For example, `logging trap warnings` (or `logging trap 4`) sends levels 0 through 4 to the syslog server, and messages at levels 5, 6 and 7 are not sent there. Real messages illustrate the scale: an interface changing state is typically a level 3 message (LINK-3-UPDOWN), while a line protocol change is level 5 (LINEPROTO-5-UPDOWN). So a server configured with `logging trap errors` would see the interface event but miss the line protocol change.",
   "Reading a message is easier once you know its parts. A Cisco message looks like `*Sep 25 10:15:02.123: %LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/1, changed state to down`. It begins with a timestamp, then, after the percent sign, the facility, meaning the component that generated it (here LINEPROTO), the severity number (5), a mnemonic that names the event type (UPDOWN), and finally a plain description. A sequence number can be added at the start with `service sequence-numbers`, which helps detect gaps if messages are lost. The asterisk before the timestamp on many platforms indicates the clock is not considered authoritative, a hint that NTP (Network Time Protocol) is not synchronized.",
   "Messages can go to several destinations, each with its own level. The console (`logging console <level>`) is on by default at the debugging level, which can overwhelm a slow console line during a busy event and even slow the device, so many engineers raise the level or disable console logging. The monitor destination (`logging monitor <level>`) sends messages to VTY (virtual terminal) sessions, such as SSH, but only sessions that have run `terminal monitor` actually display them. The buffer (`logging buffered <size> <level>`) keeps messages in RAM, viewed with `show logging`; it is quick to check but limited in size, older entries roll off, and it is lost on reload. The syslog server is set with `logging host 10.0.0.60`, and its level with `logging trap <level>`, which defaults to informational. Syslog to a server uses UDP port 514 by default, and some platforms support TCP or TLS (Transport Layer Security) transport for reliability and security.",
   "A few habits turn syslog from noise into evidence. Make timestamps meaningful with `service timestamps log datetime msec localtime show-timezone`, and synchronize clocks with NTP; otherwise correlating events across devices is guesswork, as Jordan discovered. Set a consistent source address with `logging source-interface Loopback0` so the server sees one stable identity per device, regardless of which interface the message leaves from. Send informational or notifications-level messages to a central server, keep a local buffer for quick checks, and avoid sending debugging level to the server in production, where it can flood both the device and the server. The `logging facility` command sets the syslog facility value, such as local7, that the server uses to sort messages from different device types into different files or views. Note that this syslog facility is different from the Cisco component name like LINEPROTO shown in each message. Use `show logging` to see the current configuration, message counters per destination and the buffer contents.",
   "Finally, remember the limits of the transport. Syslog over UDP is unacknowledged and unencrypted, so messages can be lost during congestion and read by anyone who captures them. For important records, combine syslog with SNMP (Simple Network Management Protocol) notifications such as informs, use reliable transport where the platform supports it, and protect the management network that carries this traffic."
  ],
  "analogy": "Syslog levels work like a hospital triage desk. Every patient gets a number, and the lower the number, the more urgent. Each destination is a staff member with an instruction: the on-call surgeon is paged only for levels 0 to 2, while the records clerk writes down everyone up to level 6. Setting a level means 'this and anything more urgent'. The analogy stops working on volume: debugging-level messages can arrive so fast that, unlike patients, they can overwhelm the device itself.",
  "mnemonic": "'Every Awesome Cisco Engineer Will Need Ice cream Daily': Emergencies (0), Alerts (1), Critical (2), Errors (3), Warnings (4), Notifications (5), Informational (6), Debugging (7).",
  "terms": [
   [
    "Syslog severity",
    "A 0 to 7 scale where 0 is emergencies and 7 is debugging; lower is more severe."
   ],
   [
    "logging trap",
    "Sets the maximum severity level sent to syslog servers; the default is informational."
   ],
   [
    "logging buffered",
    "Stores log messages in device RAM for viewing with show logging; lost on reload."
   ],
   [
    "terminal monitor",
    "Displays log and debug messages in the current SSH or Telnet session."
   ],
   [
    "logging source-interface",
    "Sets the source address of syslog messages so the server sees a consistent identity per device."
   ],
   [
    "Facility",
    "The component or category of a message, such as LINEPROTO or OSPF, or the syslog facility like local7 used by the server to sort messages."
   ]
  ],
  "example": "An engineer investigating intermittent outages sets `logging trap notifications` and `logging host 10.0.0.60` on every switch, with NTP and millisecond timestamps. The syslog server then shows LINK-3-UPDOWN messages on the same distribution uplink across several switches within the same second, pointing to a failing optic.",
  "mistakes": [
   [
    "Setting logging trap 4 sends levels 4 through 7.",
    "A level includes itself and every more severe level, so logging trap 4 sends levels 0 through 4."
   ],
   [
    "Level 7 is the most severe syslog level.",
    "Level 0, emergencies, is the most severe. Level 7 is debugging."
   ],
   [
    "Log messages appear automatically in every SSH session.",
    "VTY sessions show log messages only after terminal monitor is entered."
   ],
   [
    "The log buffer is a safe long-term record.",
    "The buffer lives in RAM, is limited in size and is lost on reload. Send important messages to a syslog server."
   ]
  ],
  "tryit": [
   [
    "A company wants its syslog server to receive interface up and down events (LINK-3) and line protocol changes (LINEPROTO-5), but not informational chatter or debugs. Which logging trap level should it configure?",
    "logging trap notifications (level 5). It sends levels 0 through 5, which includes both LINK-3 and LINEPROTO-5 messages and excludes informational (6) and debugging (7)."
   ],
   [
    "After a reload, an engineer cannot find yesterday's log messages on a router, and the syslog server shows the router's messages arriving from three different IP addresses. Which two configuration changes address these issues?",
    "Messages were only in the RAM buffer, which is lost on reload, so configure logging host and a suitable logging trap level to keep them centrally. Add logging source-interface Loopback0 so all messages arrive from one consistent address."
   ]
  ],
  "tip": "Setting a level includes every lower number. logging trap 4 (warnings) sends 0 to 4. Level 7 is debugging and level 0 is emergencies. Syslog uses UDP 514 by default, logging trap defaults to informational, and terminal monitor is needed to see logs in SSH.",
  "check": [
   [
    "Which severity levels are sent with logging trap errors?",
    "Levels 0 to 3: emergencies, alerts, critical and errors."
   ],
   [
    "Why should you configure NTP when using syslog?",
    "So timestamps across devices are accurate and events can be correlated."
   ],
   [
    "You are connected by SSH and see no log messages. What command is missing?",
    "terminal monitor."
   ],
   [
    "In %LINEPROTO-5-UPDOWN, what do LINEPROTO, 5 and UPDOWN represent?",
    "The facility (component), the severity level and the mnemonic for the event type."
   ]
  ]
 },
 {
  "t": "Flexible NetFlow: flow records, exporters and monitors",
  "hook": "Every weekday at 2 p.m., the WAN link at Cobalt Engineering's design office hits 100 percent and stays there for an hour. The SNMP graphs prove it, in a neat red plateau, but they cannot say who or what is filling the pipe. Rachel, the office manager, suspects the new video conferencing tool. Lee from security quietly wonders about something worse. You need more than a count of bytes; you need to know which hosts were talking to which addresses, on which ports, and how much each conversation carried. The router can tell you, if you ask it in the right way. How?",
  "simple": "Interface counters tell you how much traffic passed through a link, like a tollbooth counting cars. NetFlow tells you what that traffic was, like a tollbooth that also notes each car's starting town, destination and how many trips it made. The router groups packets that share the same details, such as the same sender, receiver and application port, into a 'flow', keeps a running tally for each one, and periodically sends a summary to an analysis server called a collector. With Flexible NetFlow you choose which details define a flow and which extra numbers to count. You set it up in three pieces: what to record, where to send it, and a piece that ties the two together and is attached to an interface.",
  "body": [
   "SNMP (Simple Network Management Protocol) tells you how much traffic crossed an interface; NetFlow tells you what that traffic was: who talked to whom, on which ports, and how many packets and bytes each conversation carried. A flow is a set of packets sharing the same key fields. Classically these were source and destination IP address, source and destination port, protocol, type of service and input interface. The device tracks each flow as an entry in a cache, updating counters as packets arrive, and exports summarized flow records to a collector for storage and analysis. NetFlow is used for capacity planning, application visibility, billing and security, such as detecting scans, data exfiltration or unusual traffic patterns that a simple utilization graph would hide.",
   "Traditional NetFlow used a fixed set of key fields, which made it simple but inflexible. Flexible NetFlow (FNF) lets you define exactly which fields identify a flow and which fields you collect about it, so you can build a record for security analysis, another for application usage and another for IPv6. FNF is built from three components, configured in order and then applied to an interface.",
   "The flow record defines the fields. `match` statements define key fields: a packet with a different value in any key field creates a new flow entry in the cache. `collect` statements define non-key fields gathered for each flow, such as byte and packet counters and first and last seen timestamps; a different value in a collect field never creates a new flow, it is just recorded. Choosing keys carefully matters. Adding many key fields creates more, smaller flows and a larger cache, while too few keys merge conversations you wanted to see separately. Cisco also provides predefined records, such as one matching traditional IPv4 NetFlow, for quick deployments.",
   "The flow exporter defines where and how records are sent: the collector's destination address, the source interface the export packets come from, the transport, which is UDP, and port, and the export format. NetFlow version 9 is template-based, meaning the exporter first sends a template describing which fields the records contain, and that is what makes flexible records possible. IPFIX (IP Flow Information Export) is the IETF standard based on version 9. Collectors commonly listen on UDP ports such as 2055 or 9996, but there is no single required port, so you must configure the port the collector actually expects; a mismatch is a common reason flows never appear.",
   "The flow monitor ties them together. It references one record and one or more exporters and sets cache parameters, such as the active and inactive timeouts. The inactive timeout exports a flow that has been idle for that period, freeing its cache entry. The active timeout periodically exports long-running flows, such as a large file transfer, so the collector sees them while they are still going instead of only after they end. Finally, you apply the monitor to an interface in a direction, input or output. Here is a complete example:",
   "```\nflow record REC-APP\n match ipv4 source address\n match ipv4 destination address\n match transport source-port\n match transport destination-port\n match ipv4 protocol\n collect counter bytes\n collect counter packets\n!\nflow exporter EXP-COLL\n destination 10.0.0.70\n source Loopback0\n transport udp 2055\n export-protocol netflow-v9\n!\nflow monitor MON-APP\n record REC-APP\n exporter EXP-COLL\n!\ninterface GigabitEthernet0/1\n ip flow monitor MON-APP input\n```",
   "The configuration order follows the dependencies: the monitor refers to the record and exporter by name, so they are normally defined first, and the interface refers to the monitor. Using a loopback as the export source gives the collector a stable device identity even if physical interfaces change.",
   "Verification checks each piece. `show flow monitor MON-APP cache` displays the flows currently in the device's cache, with their key fields and counters, which proves the monitor is applied and seeing traffic. `show flow exporter statistics` confirms records are being sent and shows any export errors, which separates a device-side problem from a collector-side one. `show flow record` lists the fields in each record. If the cache is full of flows but the collector shows nothing, check the exporter destination, UDP port, source interface and any ACL (access control list) or firewall between them. On very high-speed links, sampled NetFlow reduces load by examining only a fraction of packets, trading some precision for scalability. In the Cobalt Engineering case, the cache would quickly reveal the top talker and its destination port."
  ],
  "analogy": "Flexible NetFlow is like setting up a survey at a store entrance. The flow record is the survey form: the questions that define a customer group (match) and the totals to tally (collect). The exporter is the mailing address for completed surveys. The monitor is the clipboard holding a form and an address, placed at a specific door. The analogy stops working with key fields: changing one answer on the form does not create a new customer, but changing a key field value in NetFlow does create a new flow.",
  "mnemonic": "Build order R-E-M: Record (what to track), Exporter (where to send it), Monitor (ties record and exporter together and is applied to the interface).",
  "terms": [
   [
    "Flow",
    "A set of packets that share the same values in the defined key fields."
   ],
   [
    "Flow record",
    "Defines key fields (match) and non-key fields (collect) for Flexible NetFlow."
   ],
   [
    "Key field",
    "A match field; a different value creates a new flow entry in the cache."
   ],
   [
    "Flow exporter",
    "Defines the collector destination, source, transport port and export format."
   ],
   [
    "Flow monitor",
    "Links a record and exporters with cache settings and is applied to an interface in a direction."
   ],
   [
    "Active and inactive timeouts",
    "Cache timers that export long-running flows periodically and idle flows after a period of inactivity."
   ],
   [
    "IPFIX",
    "The IETF standard flow export protocol based on NetFlow version 9."
   ]
  ],
  "example": "A WAN link keeps saturating every afternoon. SNMP graphs only show that it is full. After applying a Flexible NetFlow monitor, the collector shows that most of the traffic is a single host sending large volumes to an unfamiliar external address on an unusual port, which the security team investigates as possible data exfiltration.",
  "mistakes": [
   [
    "collect fields define what makes a flow unique.",
    "match fields are the keys that define a flow. collect fields only gather data such as counters and do not create new flows."
   ],
   [
    "The flow record or exporter is applied to the interface.",
    "Only the flow monitor is applied to an interface, with ip flow monitor NAME input or output."
   ],
   [
    "NetFlow and SNMP interface counters provide the same information.",
    "SNMP counters show volume on an interface. NetFlow shows who talked to whom, on which ports and protocols, and how much."
   ],
   [
    "Flows are exported only when they end, so long transfers show up immediately.",
    "Without the active timeout, long flows would be reported only at the end; the active timeout exports them periodically while they run."
   ]
  ],
  "tryit": [
   [
    "After configuring Flexible NetFlow on a branch router, `show flow monitor cache` shows hundreds of flows, but the collector team sees nothing from the branch. Their collector listens on UDP 9996. Your exporter uses `transport udp 2055`. What do you change and how do you confirm?",
    "Change the exporter to transport udp 9996 to match the collector. Confirm with show flow exporter statistics that records are being sent, and ask the collector team to verify arrival. The full cache already proves the monitor and record work."
   ],
   [
    "A security analyst wants to see each distinct conversation between internal hosts and external servers, including the destination port, plus how many bytes each carried. Which fields belong in match statements and which in collect?",
    "Match the source and destination IPv4 addresses, the transport source and destination ports and the protocol so each conversation is a separate flow. Collect counter bytes and counter packets, and optionally timestamps, since those describe a flow without defining it."
   ]
  ],
  "tip": "Order of building: record, then exporter, then a monitor that references both, then apply the monitor to an interface. Match fields are keys that define a flow; collect fields are just gathered data. NetFlow v9 is template-based, and IPFIX is the IETF standard built on it.",
  "check": [
   [
    "What is the difference between match and collect in a flow record?",
    "match defines key fields that distinguish flows; collect gathers additional data such as counters without creating new flows."
   ],
   [
    "Which component is applied directly to an interface?",
    "The flow monitor, with ip flow monitor NAME input or output."
   ],
   [
    "What does the active timeout do?",
    "It periodically exports records for long-running flows so the collector sees them before they end."
   ],
   [
    "Which command confirms that flow records are being sent to the collector?",
    "show flow exporter statistics."
   ]
  ]
 },
 {
  "t": "SPAN, RSPAN and ERSPAN",
  "hook": "Phone calls from the Westbrook branch of Evergreen Dental keep sounding choppy, and the voice vendor says the network is dropping packets. Your network says it is not. To settle it you need the actual packets from the phone's switch port, but the only analyzer laptop with the right software is at headquarters, three routed hops away, and nobody can drive to Westbrook today. You plug a laptop into a spare port at the branch over a remote session and see nothing but broadcasts. How do you get a copy of exactly that phone's traffic delivered to a machine in another building, across a routed network, without touching the call itself?",
  "simple": "A switch sends each frame only to the port where the destination lives, so a laptop plugged into a random port cannot see other people's traffic. Port mirroring tells the switch to make a copy of the traffic on chosen ports and send the copy to a port where an analyzer is listening, like a security camera feed sent to a monitor room. Cisco calls this SPAN. If the analyzer is on the same switch, that is plain SPAN. If it is on a different switch connected by ordinary switch links, the copies travel in a special VLAN, which is RSPAN. If the analyzer is somewhere reachable only through routers, the copies are wrapped in a tunnel and sent across, which is ERSPAN. The original traffic is never changed.",
  "body": [
   "Sometimes counters and logs are not enough and you need to see actual packets: to troubleshoot an application, to feed an IDS (intrusion detection system) or to record traffic for analysis. On a switched network, a device plugged into a random port only sees traffic addressed to it, plus broadcasts and flooded frames. Port mirroring solves this by copying traffic from one or more sources to a destination port where a packet analyzer is connected. Cisco calls the feature SPAN (Switched Port Analyzer) and offers three variants, chosen by where the analyzer sits relative to the traffic you want to see.",
   "Local SPAN copies traffic from source ports or source VLANs to a destination port on the same switch. You choose the direction to copy: `rx` for traffic received on the source, `tx` for traffic transmitted, or `both`. A session is identified by a number, and the source and destination are configured as part of that session:",
   "```\nmonitor session 1 source interface Gi1/0/5 both\nmonitor session 1 destination interface Gi1/0/48\n```",
   "The destination port stops acting as a normal switch port. By default it does not forward traffic it receives and does not participate in spanning tree, so it is dedicated to the analyzer and cannot be used for ordinary connectivity at the same time. If the analyzer needs to send traffic back into the network, for example an IDS sending TCP resets to stop a suspicious connection, some platforms allow `ingress` options on the destination. Capacity is the other concern. Mirroring a busy VLAN, or several gigabit ports in both directions, to a single gigabit destination can oversubscribe it, and excess copies are dropped. In that case the analyzer sees gaps that look like network loss but are actually mirroring loss, a trap when diagnosing problems like the Westbrook calls.",
   "RSPAN (Remote SPAN) carries mirrored traffic across a Layer 2 network to an analyzer on another switch. You create a special VLAN and mark it with the `remote-span` command in its VLAN configuration, and that VLAN must be allowed on every trunk between the source switch and the destination switch. On the source switch, the session's destination is `remote vlan <id>`, so copies are placed into the RSPAN VLAN instead of out a local port. On the destination switch, the session's source is `remote vlan <id>` and its destination is the port where the analyzer is connected. Because the copies travel as ordinary frames in a VLAN, RSPAN only works across a Layer 2 path, and the RSPAN VLAN consumes trunk bandwidth along the way, so plan capacity, especially if you mirror busy sources.",
   "ERSPAN (Encapsulated Remote SPAN) carries mirrored traffic across a Layer 3 network by encapsulating the copies in GRE (Generic Routing Encapsulation). This is the answer when the analyzer is in a different building or data center reachable only through routing, as in the opening scene. On the source device you configure an ERSPAN source session with the source ports, an ERSPAN ID, the destination IP address and an origin IP address used as the tunnel source. The destination IP can be a far device or an analyzer that can decapsulate GRE directly. On the far end, an ERSPAN destination session with the matching ERSPAN ID decapsulates the traffic and sends it out a local port to the analyzer, or a capable analyzer receives the GRE stream itself. Because the encapsulation adds GRE and ERSPAN headers to every mirrored frame, watch the MTU (maximum transmission unit) along the path, or large mirrored frames may be fragmented or dropped.",
   "Some behaviors apply to all three types. Mirroring creates a copy, so it has no effect on the original flow; users never notice the session. It does consume switch resources and bandwidth, and the number of sessions a switch supports is limited and platform specific. Mirrored copies of corrupted frames may not be forwarded, and SPAN is not guaranteed to be lossless under heavy load, so a capture that shows loss should be interpreted carefully. Verify sessions with `show monitor session 1` or `show monitor session all`, which list each session's type, sources with direction and destinations. Many IOS XE devices also offer Embedded Packet Capture (`monitor capture`), which captures traffic on the device itself and saves it to a file, useful when there is no analyzer available at all.",
   "The decision rule for the exam is simple and worth memorizing in terms of where the analyzer is. Same switch: SPAN. Different switch across Layer 2 trunks: RSPAN with a remote-span VLAN. Across a routed network: ERSPAN with GRE. For Evergreen Dental, an ERSPAN session from the branch switch to headquarters delivers the phone's traffic to the analyzer without anyone traveling."
  ],
  "analogy": "Think of a security camera system. Local SPAN is a camera wired directly to a monitor in the same room. RSPAN is the camera feed sent over a dedicated cable that runs through the building's hallways, so every hallway it passes must have room for that cable. ERSPAN is the feed packaged and sent over the internet to a monitoring center in another city. In every case the camera only watches; it never stops people walking through. The analogy stops working on capacity: a camera feed does not grow with crowd size, but mirrored traffic does.",
  "terms": [
   [
    "SPAN",
    "Switched Port Analyzer: local mirroring of source ports or VLANs to a destination port on the same switch."
   ],
   [
    "Source and direction",
    "The ports or VLANs being mirrored and whether received (rx), transmitted (tx) or both directions are copied."
   ],
   [
    "RSPAN",
    "Remote SPAN: mirrored traffic carried in a dedicated remote-span VLAN across Layer 2 trunks."
   ],
   [
    "RSPAN VLAN",
    "A VLAN marked with remote-span that carries mirrored frames and must be allowed on every trunk in the path."
   ],
   [
    "ERSPAN",
    "Encapsulated Remote SPAN: mirrored traffic carried in GRE across a routed Layer 3 network, identified by an ERSPAN ID."
   ],
   [
    "Destination port",
    "The port that receives mirrored copies for the analyzer; it no longer forwards normal traffic."
   ]
  ],
  "example": "Voice quality complaints come from a branch whose only analyzer is at headquarters, several routed hops away. The engineer configures an ERSPAN source session on the branch switch for the IP phone port and sends it to the headquarters switch, which decapsulates the GRE stream to a port with Wireshark attached, revealing heavy jitter from a misconfigured QoS policy.",
  "mistakes": [
   [
    "RSPAN can carry mirrored traffic to an analyzer on the other side of a router.",
    "RSPAN uses a VLAN and only works across a Layer 2 path. Across a routed network, use ERSPAN with GRE."
   ],
   [
    "The SPAN destination port can still connect a normal user device.",
    "By default the destination port does not forward normal traffic or take part in spanning tree; it is dedicated to the analyzer."
   ],
   [
    "Mirroring adds latency or affects the traffic being monitored.",
    "SPAN sends copies, so the original flow is unaffected. The cost is switch resources and bandwidth for the copies."
   ],
   [
    "Any loss seen in a SPAN capture proves the network dropped packets.",
    "An oversubscribed destination or heavy load can drop mirrored copies. SPAN is not guaranteed lossless, so confirm before blaming the network."
   ]
  ],
  "tryit": [
   [
    "An IDS appliance sits on a switch in the same wiring closet as the access switch whose user ports you want to monitor. The two switches are connected by an 802.1Q trunk, with no router in between. Which mirroring type do you use, and what must you configure on the trunk?",
    "RSPAN. Create a VLAN with the remote-span keyword, allow it on the trunk between the switches, send the source session to remote vlan on the access switch, and use remote vlan as the source with the IDS port as destination on the other switch."
   ],
   [
    "An engineer mirrors four busy gigabit server ports, both directions, to one gigabit SPAN destination. The capture shows frequent gaps, and the server team now claims the network is losing packets. What do you tell them?",
    "The gaps are likely mirroring loss: up to eight gigabits of copies cannot fit through a one-gigabit destination, so excess copies are dropped. Reduce the sources or direction, or use a faster destination, before drawing conclusions about network loss."
   ]
  ],
  "tip": "Same switch: SPAN. Different switch across Layer 2: RSPAN with a remote-span VLAN allowed on trunks. Across a routed network: ERSPAN with GRE, matching ERSPAN IDs and an eye on MTU. The SPAN destination port is dedicated to the analyzer, and SPAN is not guaranteed lossless.",
  "check": [
   [
    "Which SPAN type works when the analyzer is on the other side of a router?",
    "ERSPAN, because it encapsulates mirrored traffic in GRE for routing across Layer 3."
   ],
   [
    "What must you configure on the trunks for RSPAN to work?",
    "The RSPAN VLAN, created with the remote-span keyword, must be allowed on every trunk between source and destination switches."
   ],
   [
    "What does the both keyword in a SPAN source mean?",
    "Traffic received and transmitted on the source port is copied."
   ],
   [
    "Why should you watch MTU along an ERSPAN path?",
    "GRE and ERSPAN headers increase frame size, so large mirrored frames may be fragmented or dropped."
   ]
  ]
 },
 {
  "t": "IP SLA probes and object tracking",
  "hook": "It is 2 a.m. and your phone buzzes. The Lakeside branch of Harbor Credit Union says nobody can reach the core banking app, yet your monitoring dashboard shows every interface on the branch router green. Priya on the night shift logs in and confirms it: GigabitEthernet0/0 to the cable modem is up/up, the default route still points at the primary ISP, and the LTE backup sits idle with nothing flowing through it. Somewhere past that modem the provider's network has failed, and the router has no idea. The backup link was paid for exactly for nights like this. Why didn't the router use it, and what would let it notice on its own next time?",
  "simple": "A router normally believes a path works as long as its cable is plugged in and the light is on. But the problem can be further away, inside the provider's network, where the router cannot see it. IP SLA fixes this by having the router send small test messages, such as pings, to a faraway address every few seconds and check whether replies come back. Object tracking then turns that result into a simple up or down signal that other features can act on, such as removing the main route so a backup route takes over. Think of calling a friend's house every few minutes to make sure the phone line still works, instead of just checking that your own phone has a dial tone.",
  "body": [
   "IP SLA (Internet Protocol service level agreement) is a Cisco IOS feature that generates synthetic traffic to measure network performance continuously. The router itself creates test packets and measures reachability, round-trip time, jitter, packet loss and even application responses such as DNS (Domain Name System) lookups or HTTP (Hypertext Transfer Protocol) requests. Because the router actively probes instead of waiting for user traffic, you can detect problems before users do, and you can make routing decisions based on actual path health rather than only on link state. That last point is why IP SLA shows up in the ENCOR (Implementing and Operating Cisco Enterprise Network Core Technologies) blueprint: it is the glue between measurement and automatic failover.",
   "An IP SLA operation defines what to send, where to send it and how often. The most common type is `icmp-echo`, which pings a target and records whether a reply arrived and how long it took. The `udp-jitter` operation sends a stream of UDP (User Datagram Protocol) packets and measures delay, jitter and loss in each direction, which makes it ideal for judging whether a path can carry voice. It needs an IP SLA responder on the far Cisco device, enabled with `ip sla responder`, so that the far end can add timestamps and the measurements account for processing time. Other operation types include `tcp-connect`, `http`, `dns` and `udp-echo`, each testing a different layer of the path.",
   "Here is a typical dual-ISP branch configuration. Read it from top to bottom: the probe, its schedule, the track object, and then the two static routes that depend on it.",
   "```\nip sla 10\n icmp-echo 203.0.113.1 source-interface GigabitEthernet0/0\n frequency 10\n threshold 500\n timeout 1000\nip sla schedule 10 life forever start-time now\n!\ntrack 1 ip sla 10 reachability\n delay down 10 up 30\n!\nip route 0.0.0.0 0.0.0.0 203.0.113.1 track 1\nip route 0.0.0.0 0.0.0.0 198.51.100.1 10\n```",
   "This probe pings the primary ISP's gateway at 203.0.113.1 every 10 seconds, sourced from the interface facing that ISP. The `threshold` of 500 milliseconds marks a reply as too slow for the state check, and the `timeout` of 1000 milliseconds is how long the router waits before declaring the probe lost. An operation does nothing until it is scheduled, which is one of the most frequent lab mistakes: without `ip sla schedule`, the configuration looks perfect but no packets are ever sent. Results appear in `show ip sla statistics`, which shows the latest return code (for example OK or Timeout), the latest round-trip time and the number of successes and failures. The configured parameters appear in `show ip sla configuration`.",
   "Object tracking connects measurements to actions. A track object watches something and reports a simple state of up or down. It can follow an IP SLA operation's `reachability`, which is up whenever the operation succeeds, or its `state`, which is up only if the return code is OK and, for some operations, the result is within the threshold. A track can also watch an interface's line protocol (`track 2 interface Gi0/1 line-protocol`) or whether a route is present in the routing table (`track 3 ip route 10.0.0.0 255.0.0.0 reachability`). Several tracks can be combined with Boolean logic, for example `track 10 list boolean and`, which is up only when all member tracks are up. The `delay` command dampens flapping: in the example, the track waits 10 seconds of continuous failure before going down and 30 seconds of continuous success before coming back up, so one lost ping does not trigger a failover and a recovering link has to prove itself before traffic returns.",
   "Many features can be clients of a track object. Static routes are the classic case: a route with the `track` keyword is installed only while the track is up, and when the track goes down the route is removed, letting a floating static route with a higher administrative distance take over. In the example, the backup default route through 198.51.100.1 has an administrative distance of 10, so it stays hidden until the tracked primary disappears. HSRP (Hot Standby Router Protocol) and VRRP (Virtual Router Redundancy Protocol) can decrement a router's priority when a tracked uplink or remote target fails, so the peer router becomes active. PBR (policy-based routing) can use `set ip next-hop verify-availability` with a track so it stops sending traffic to a dead next hop. EEM (Embedded Event Manager) applets can also react to track state changes, for example by sending a syslog message or running commands.",
   "The key insight for the exam is that an interface can stay up while the path beyond it is broken. A broadband modem, for instance, keeps its Ethernet port up even when the ISP's network has failed, and a provider switch in the middle of a metro Ethernet service can do the same. Tracking the interface alone would miss that failure; tracking an IP SLA probe to a remote target catches it. Choose a target that truly represents the path, such as the ISP's next hop or a well-known remote address that is reachable only through that link, and source the probe from the correct interface. If the probe can also leave through the backup link, it may keep succeeding after the primary fails and the failover will never happen. Check the result with `show track`, which lists each object's current state, how many times it has changed and which clients, such as a static route, depend on it."
  ],
  "analogy": "IP SLA with tracking is like a lighthouse keeper who does not just check that the lamp is switched on, but rows a small boat out every few minutes to confirm the light can actually be seen from the sea. If the boat cannot see it, the keeper raises a flag, and the harbor redirects ships to a second lighthouse. The analogy stops working in one place: the router's test only proves the path to the chosen target, so a badly chosen target gives false confidence.",
  "terms": [
   [
    "IP SLA operation",
    "A configured synthetic probe, such as icmp-echo or udp-jitter, that measures reachability or performance of a path."
   ],
   [
    "IP SLA responder",
    "A Cisco device feature, enabled with ip sla responder, that answers and timestamps probes such as udp-jitter for accurate measurements."
   ],
   [
    "Track object",
    "An object whose up or down state follows an IP SLA operation, an interface or a route and is used by other features."
   ],
   [
    "Floating static route",
    "A backup static route with a higher administrative distance that is used only when the primary route disappears."
   ],
   [
    "Reachability versus state",
    "Track options for IP SLA: reachability is up when the probe succeeds; state is up only when the return code is OK and, for some operations, within the threshold."
   ],
   [
    "delay up/down",
    "Track command that waits a set number of seconds before changing state, to dampen flapping."
   ]
  ],
  "example": "A branch router's primary ISP link stays physically up during a provider outage, so traffic is black-holed. After adding an icmp-echo IP SLA to the ISP gateway, a track object and a tracked default route, the router removes the primary default within seconds of the outage and the floating static route via the LTE backup takes over. When the provider recovers, the `delay up 30` setting makes the router wait until the probe has succeeded continuously for 30 seconds before moving traffic back.",
  "mistakes": [
   [
    "Configuring the IP SLA operation is enough for it to start probing.",
    "An operation does nothing until it is scheduled with ip sla schedule, for example life forever start-time now. Check show ip sla statistics to confirm probes are running."
   ],
   [
    "Interface tracking is just as good as IP SLA tracking for an internet uplink.",
    "The interface to a modem or provider switch can stay up while the provider path is down. Only a probe to a remote target detects that end-to-end failure."
   ],
   [
    "udp-jitter works against any IP address.",
    "udp-jitter needs an IP SLA responder on the far Cisco device to timestamp packets. For a simple reachability test to a non-Cisco target, use icmp-echo."
   ],
   [
    "The backup static route should have the same administrative distance as the primary.",
    "The backup must have a higher administrative distance so it floats, staying out of the routing table until the tracked primary route is removed."
   ]
  ],
  "tryit": [
   [
    "Your HSRP active router at a branch has its LAN and WAN interfaces up, but its WAN provider has a fault two hops away. Users behind it lose internet access while the standby router's path through a second provider is healthy. You want the standby router to take over automatically. What do you configure on the active router?",
    "Create an icmp-echo IP SLA to a target reachable only through the first provider, schedule it, create a track object on its reachability, and add a tracked object to HSRP that decrements priority enough to drop below the standby router. The standby router also needs preempt so it actually takes over when its priority becomes higher."
   ],
   [
    "You have a working IP SLA and tracked default route, but during testing the failover flaps every time a single ping is lost on the busy link. What change reduces the flapping without hiding real outages?",
    "Add or lengthen delay down and delay up under the track object, for example delay down 10 up 30, so the track changes state only after a sustained failure or recovery. You might also review the probe frequency and timeout so a single slow reply is not treated as a failure."
   ]
  ],
  "tip": "IP SLA operations must be scheduled with ip sla schedule or they never run. Tracking an interface misses failures beyond the link; tracking an IP SLA detects them. Remember the chain: probe, schedule, track, client (static route, HSRP, VRRP, PBR or EEM).",
  "check": [
   [
    "Why use IP SLA tracking instead of interface tracking for an internet uplink?",
    "The interface can stay up while the provider path is down; an IP SLA probe to a remote target detects end-to-end failure."
   ],
   [
    "Which IP SLA operation measures jitter for voice, and what does it need on the far end?",
    "udp-jitter, which needs an IP SLA responder on the far Cisco device."
   ],
   [
    "How does a tracked static route provide failover?",
    "When the track goes down, the tracked route is removed from the routing table and a floating static route with higher administrative distance becomes active."
   ],
   [
    "What is the purpose of delay down 10 up 30 under a track object?",
    "It dampens flapping by requiring 10 seconds of continuous failure before the track goes down and 30 seconds of continuous success before it comes back up."
   ]
  ]
 },
 {
  "t": "Catalyst Center (formerly DNA Center) workflows: assurance, health scores, AI-driven insights",
  "hook": "Monday, 9:40 a.m. A ticket lands in your queue at Northwind Medical Group: a nurse on the third floor of the east clinic says her tablet could not get on the wireless at 9:15 and now it works fine. No error message, no screenshot, and the problem is gone. Ten years ago you would have closed the ticket as could not reproduce. Today Daniel, your new hire, asks whether there is a way to look back at exactly what that tablet experienced at 9:15, which access point it tried, and whether anyone else on that floor had the same trouble. Is there, and how would you find the cause without waiting for it to happen again?",
  "simple": "Catalyst Center is a central program that watches over a company's network from one screen. One of its main jobs, called assurance, is to answer a simple question: is the network actually working well for the people and apps using it? It gathers information from every switch, access point and router, then turns it into easy scores, like a grade from 1 to 10, for devices, users and applications. When something goes wrong, it explains the problem and suggests fixes. It can also rewind time to show what happened to one user's laptop earlier in the day. It is a bit like a car dashboard that does not just show a warning light but tells you which part is failing and keeps a trip log you can replay.",
  "body": [
   "Cisco Catalyst Center, formerly Cisco DNA (Digital Network Architecture) Center, is the controller and management platform for enterprise campus and branch networks. It automates configuration, runs SD-Access (Software-Defined Access), manages software images and, the focus of this lesson, provides assurance. Assurance is continuous monitoring and analytics that tells you how well the network is serving users and applications, rather than only whether devices are up. A switch can answer every ping while clients connected to it fail to get addresses; assurance is designed to surface exactly that kind of gap.",
   "The main workflows in the Catalyst Center interface follow a lifecycle, and the exam expects you to know the names and what each one does. Design builds the network hierarchy of areas, buildings and floors, and defines network settings such as DNS (Domain Name System), DHCP (Dynamic Host Configuration Protocol), NTP (Network Time Protocol) and AAA (authentication, authorization and accounting) servers, along with IP address pools, software image standards and configuration templates. Policy defines group-based access, virtual networks and application QoS (quality of service). Provision assigns devices to sites, pushes configuration and templates and sets up fabric roles. Assurance monitors everything and helps you troubleshoot. Platform functions expose APIs (application programming interfaces) and integrations with other systems. A useful way to remember the split is that Design, Policy and Provision express intent and push configuration, while Assurance checks whether reality matches that intent.",
   "Assurance depends on data, and it collects telemetry from many sources at once. These include model-driven streaming telemetry, SNMP (Simple Network Management Protocol), syslog, NetFlow, and data from wireless controllers and Cisco ISE (Identity Services Engine). The value is in correlation: a client's failed login seen by ISE, a DHCP timeout logged by a switch and a high channel utilization reported by an access point can be tied together as one story instead of three unrelated alarms in three different tools.",
   "Catalyst Center presents this correlated data as health scores. Network health summarizes device health across the network, and each device gets a score based on factors such as CPU and memory utilization, interface errors, link status and control plane reachability. Client health rates wired and wireless clients, for example by onboarding success (association, authentication and obtaining an IP address) and connection quality such as signal strength. Application health uses metrics such as latency, jitter and packet loss for business applications. Scores are shown on a scale, commonly 1 to 10, with color coding, so you can start from a site with poor health and drill down to the specific building, device, client or interface responsible. In practice, a dashboard might show that most wireless clients are healthy overall while one floor sits well below that, which tells you where to look first.",
   "Issues are the detected problems behind poor scores, such as a device with high CPU, a client failing DHCP or an interface accumulating errors. Each issue comes with its impact (how many clients or which sites are affected), context and suggested actions, so a junior engineer has a starting point instead of a blank screen. Catalyst Center also offers guided troubleshooting tools. Path trace calculates the path between two endpoints through the network and highlights where ACLs (access control lists) or interfaces may block traffic. Device 360 and Client 360 views show a timeline of an entity's history, letting you look back in time to what happened when a user reported a problem. This time travel is what turns a vague ticket about something that happened an hour ago into a concrete event you can inspect: which access point the client tried, at which step onboarding failed and what else was happening on that device.",
   "AI-driven features, often grouped as AI network analytics, go beyond fixed thresholds. A traditional monitoring system alerts only when a value crosses a static number, such as CPU above 80 percent. That approach misses problems that are abnormal but below the line and generates noise for values that are high but normal in a particular place. Instead, machine learning builds a dynamic baseline of what is normal for each site, time of day and device, then raises an issue when behavior deviates from that baseline. A lecture hall that sees hundreds of onboarding attempts at 8 a.m. on weekdays should not trigger an alarm for that, while the same volume at 3 a.m. on a Sunday probably should. Other capabilities include comparative insights, which show how one site's performance compares with similar sites or peers, trend detection and root cause suggestions.",
   "Specific feature names and what is included depend on licensing and software release, so focus on the concepts the exam tests: baselines, anomaly detection and correlation. For the exam, remember that assurance measures experience, correlates many telemetry sources, and presents health scores and actionable issues, while the Design, Policy and Provision workflows handle intent and configuration. When a question describes looking back at a past event, think Client 360 or Device 360. When it describes finding where traffic is blocked between two hosts, think path trace. When it contrasts learned normal behavior with fixed limits, think AI baselines."
  ],
  "analogy": "Assurance works like a family doctor with a full medical history. A basic monitoring tool is a thermometer: it says whether you have a fever right now. The doctor combines blood tests, history and symptoms into an overall picture, knows what is normal for you specifically rather than for everyone, and can look back at last month's results. The analogy stops working in that Catalyst Center cannot fix configuration on its own from assurance alone; remediation still happens through provisioning or an engineer.",
  "mnemonic": "Do People Plan Ahead: Design, Policy, Provision, Assurance, the order of the main Catalyst Center workflows from building the site hierarchy to monitoring the result.",
  "terms": [
   [
    "Assurance",
    "Catalyst Center's monitoring and analytics function that measures network, client and application health."
   ],
   [
    "Health score",
    "A rating, commonly 1 to 10, that summarizes the condition of a device, client, site or application from many metrics."
   ],
   [
    "Issue",
    "A detected problem in assurance, shown with impact, context and suggested actions."
   ],
   [
    "Path trace",
    "A tool that computes the path between two endpoints and highlights blocking ACLs or problem interfaces."
   ],
   [
    "Client 360 / Device 360",
    "Views that show an entity's details and a timeline of its history, allowing you to look back to a past point in time."
   ],
   [
    "Dynamic baseline",
    "A machine-learned model of normal behavior used to detect anomalies instead of fixed thresholds."
   ]
  ],
  "example": "A help desk ticket says a user could not join the network at 9:15. The engineer opens Client 360 for the user's MAC address, scrolls the timeline back to 9:15 and sees repeated DHCP timeouts on one access switch. The issue list already flagged that the switch lost connectivity to the DHCP server because of an ACL change, and a path trace from the client's subnet to the DHCP server highlights the ACL entry that blocks it.",
  "mistakes": [
   [
    "Assurance is just a faster way to see whether devices are up or down.",
    "Assurance measures user and application experience by correlating many telemetry sources, so it can show problems such as onboarding failures on devices that are fully reachable."
   ],
   [
    "Health scores come from a single metric such as CPU.",
    "Device scores combine several factors such as CPU, memory, interface errors, link status and control plane reachability; client and application scores use onboarding and quality metrics."
   ],
   [
    "AI baselines just apply a lower static threshold.",
    "A dynamic baseline learns what is normal for each site, time and device, and flags deviations from that, so it can catch abnormal behavior below a fixed limit and ignore high but normal values."
   ],
   [
    "Provision is where you monitor and troubleshoot.",
    "Provision pushes configuration and assigns devices to sites and fabric roles. Monitoring and troubleshooting live in Assurance."
   ]
  ],
  "tryit": [
   [
    "A school district's Catalyst Center shows that one high school has a low wireless client health score every weekday between 8:00 and 8:15, but no static thresholds are crossed on any device. Students say logins are slow at the start of the day. Which assurance capabilities would you use to investigate and why?",
    "Start from the site health view and drill to the affected floors, then review issues raised by AI baselines, which compare current behavior with what is normal for that site and time. Open Client 360 for a few affected clients to see at which onboarding step they slow down, such as authentication or DHCP. Static thresholds miss this because the values are abnormal for the context but not above fixed limits."
   ]
  ],
  "tip": "Know the lifecycle names: Design, Policy, Provision, Assurance. Assurance questions revolve around health scores, issues with suggested actions, 360 views with time travel, path trace and AI baselines rather than static thresholds.",
  "check": [
   [
    "What advantage does a machine-learned baseline have over a static threshold?",
    "It learns what is normal for each context, so it detects unusual behavior that stays under fixed thresholds and avoids alerts for behavior that is normal there."
   ],
   [
    "Which Catalyst Center tool shows where an ACL blocks traffic between two hosts?",
    "Path trace."
   ],
   [
    "Which workflow defines the site hierarchy and network settings such as DNS, DHCP and NTP servers?",
    "Design."
   ],
   [
    "Name three factors that can contribute to a device health score.",
    "Any three of CPU utilization, memory utilization, interface errors, link status and control plane reachability."
   ]
  ]
 },
 {
  "t": "NETCONF and RESTCONF for configuration and operational data",
  "hook": "The overnight upgrade at Cedar Valley Logistics went smoothly, until the 6 a.m. report showed half the distribution switches with blank interface counters. Omar, who wrote the reporting script three years ago, finds the cause over coffee: the new software release added a column to `show interfaces`, and his script, which counts spaces to find numbers, now reads the wrong field. Every major upgrade has broken it the same way. Your manager wants a fix that will not break again, and she also wants to push a new NTP server to 300 devices without leaving half of them changed if something fails midway. Is there a way to talk to devices in structured data instead of scraping text?",
  "simple": "Engineers used to automate networks by having scripts type commands and read the text that came back, the same way a person would. That breaks easily when the text layout changes. NETCONF and RESTCONF are two ways for programs to talk to network devices using neatly organized data instead. A shared rulebook called a YANG model describes exactly what each piece of data is called and where it lives, like labeled boxes in a warehouse. NETCONF is the careful, heavy-duty option: it can lock a device, prepare changes and apply them all at once or not at all. RESTCONF is the lighter option that works like a website, so you can read or change settings with ordinary web requests.",
  "body": [
   "Screen-scraping CLI (command-line interface) output is fragile. A script that parses `show` command text depends on column positions and wording, so a new software version that changes a column breaks it. Model-driven programmability replaces that approach with structured data defined by YANG (Yet Another Next Generation) data models. A YANG model describes the structure of configuration and state, including names, types and hierarchy, so a program knows that an interface has a name, a description and an enabled flag, and where to find each one. NETCONF and RESTCONF are the two protocols the ENCOR exam expects you to know for reading and changing that data on Cisco IOS XE devices.",
   "Both protocols work with two kinds of data. Configuration data is what you can set: interfaces, routing protocols, VLANs (virtual LANs), NTP servers and so on. Operational data is read-only state that the device reports: interface counters, neighbor tables, CPU utilization. YANG models describe both kinds, and both protocols encode the data according to those models. This is why the same information looks structurally identical whichever protocol you use; only the transport and the encoding change.",
   "NETCONF (Network Configuration Protocol, defined in RFC 6241) runs over SSH (Secure Shell) on TCP port 830. It encodes messages in XML (Extensible Markup Language) and uses RPCs (remote procedure calls): the client sends an rpc element naming an operation, and the device answers with an rpc-reply. A session starts with both sides exchanging hello messages that list their capabilities, including the YANG models the device supports. That capabilities exchange is how a client discovers what it can ask for before sending any request. The main operations are `get`, which retrieves configuration and operational data; `get-config`, which retrieves configuration from a specified datastore; `edit-config`, which changes configuration; `copy-config` and `delete-config`; `lock` and `unlock`, which prevent other sessions from changing a datastore while you work; and `commit` and `discard-changes` where a candidate datastore is supported.",
   "Datastores are a central NETCONF idea. The running datastore holds the active configuration, startup holds the configuration loaded at boot, and candidate is a scratch copy that you edit, validate and then commit to running in one step. Changes can be transactional: if any part of an edit fails, the whole change can be rejected, so the device is never left half configured. On IOS XE, NETCONF is enabled with the global command `netconf-yang`, and the connecting user needs privilege level 15. The usual Python client is the ncclient library, which handles the SSH session, the hello exchange and the XML framing for you.",
   "RESTCONF (defined in RFC 8040) provides a REST-like (representational state transfer) HTTP interface to the same YANG data. It runs over HTTPS (HTTP Secure), encodes data in JSON (JavaScript Object Notation) or XML, and maps operations to HTTP methods: GET to read, POST to create, PUT to create or replace, PATCH to merge changes into existing data, and DELETE to remove. Resources are addressed by URLs built from the YANG model path. For example, the path `/restconf/data/ietf-interfaces:interfaces/interface=GigabitEthernet1` on the device's HTTPS address refers to one interface in the standard ietf-interfaces model. To work in JSON, set the `Accept` and `Content-Type` headers to `application/yang-data+json`. On IOS XE, enable RESTCONF with the `restconf` command together with the HTTPS server (`ip http secure-server`) and an authentication method. Because it is plain HTTPS, RESTCONF is easy to use from any HTTP tool, such as curl, Postman or the Python requests library.",
   "The difference between PUT and PATCH is a favorite exam detail. PUT replaces the target resource with what you send, so anything you leave out of the body can be removed. PATCH merges what you send into what already exists, which makes it the safer choice when you want to change one leaf, such as an interface description, without touching the rest.",
   "Choosing between the two protocols comes down to the job. NETCONF has richer transaction features, including the candidate datastore, locking, confirmed commits and validation, so it is favored by orchestration systems that must change many devices reliably. RESTCONF is simpler, stateless and familiar to web developers, and it is ideal for quick reads and single changes, but it has no locking and no candidate datastore. Both use the same YANG models, so the data looks the same whichever protocol you use, and many teams use both: NETCONF for controlled changes, RESTCONF for dashboards and quick lookups.",
   "A related technology is model-driven telemetry, in which the device streams YANG-modeled operational data to a collector on a schedule (periodic) or when a value changes (on change), instead of being polled. It complements NETCONF and RESTCONF: they are request and response protocols, while telemetry pushes data continuously."
  ],
  "analogy": "Think of YANG as the catalog for a large warehouse, where every item has an exact shelf and label. NETCONF is a loading crew with a work order: it can lock the aisle, stage everything on a cart, check it and then shelve it all at once, or put it all back if something is missing. RESTCONF is a pickup window where you hand over a slip with a shelf address and get one item back or drop one off. The analogy stops working for speed: neither is inherently faster; the difference is transactions and convenience.",
  "terms": [
   [
    "YANG",
    "A data modeling language that defines the structure, names and types of configuration and operational data."
   ],
   [
    "NETCONF",
    "An XML-based network management protocol over SSH port 830 that uses RPC operations and datastores."
   ],
   [
    "RESTCONF",
    "An HTTPS interface using GET, POST, PUT, PATCH and DELETE on YANG-modeled data encoded in JSON or XML."
   ],
   [
    "Datastore",
    "A copy of configuration, such as running, startup or candidate, that NETCONF operations act on."
   ],
   [
    "Capabilities exchange",
    "The NETCONF hello exchange in which each side lists the features and models it supports."
   ],
   [
    "edit-config",
    "The NETCONF operation that changes configuration in a datastore."
   ]
  ],
  "example": "An engineer writes a Python script with ncclient that connects to 200 switches on port 830, locks each candidate datastore, applies a new NTP server with edit-config, validates and commits. For a quick dashboard, a second script uses RESTCONF GET requests with JSON to read interface counters from the ietf-interfaces model. When the next software upgrade arrives, neither script breaks, because the YANG paths did not change.",
  "mistakes": [
   [
    "NETCONF runs over HTTPS and RESTCONF runs over SSH.",
    "It is the other way around: NETCONF uses SSH on TCP port 830 with XML, and RESTCONF uses HTTPS with JSON or XML."
   ],
   [
    "PUT and PATCH both just update a setting.",
    "PUT creates or replaces the whole target resource, which can remove anything left out. PATCH merges the change into existing data."
   ],
   [
    "RESTCONF supports locking and a candidate datastore like NETCONF.",
    "RESTCONF is stateless and has no locking or candidate datastore. Use NETCONF when you need transactional, coordinated changes."
   ],
   [
    "NETCONF and RESTCONF return different data because they use different models.",
    "Both use the same YANG models; only the transport and encoding differ."
   ]
  ],
  "tryit": [
   [
    "Your team needs a nightly job that changes the SNMP community and syslog server on 400 IOS XE routers. Management insists that no router be left with only half the change, and no other administrator should be able to edit a router while the job runs. Which protocol and features do you choose?",
    "NETCONF, using lock on the candidate datastore, edit-config for both changes, validation and then commit, and unlock. The lock blocks concurrent edits and the candidate with commit applies both changes together or not at all. RESTCONF lacks locking and a candidate datastore."
   ],
   [
    "A developer wants to change only the description on GigabitEthernet2 through RESTCONF, but his test PUT request wiped out the interface's IP address. What happened and what should he use?",
    "PUT replaced the entire interface resource with the body he sent, which contained only the description, so other settings were removed. He should use PATCH, which merges the description into the existing configuration."
   ]
  ],
  "tip": "NETCONF: SSH, port 830, XML, RPC operations, datastores and locking. RESTCONF: HTTPS, JSON or XML, HTTP verbs, no candidate datastore or locking. Both are driven by YANG models. PATCH merges; PUT replaces.",
  "check": [
   [
    "Which port and transport does NETCONF use?",
    "TCP port 830 over SSH."
   ],
   [
    "Which HTTP method would you use in RESTCONF to merge a change into existing configuration without replacing it?",
    "PATCH."
   ],
   [
    "Name one capability NETCONF offers that RESTCONF lacks.",
    "Datastore locking or a candidate datastore with commit, allowing transactional changes."
   ],
   [
    "What happens at the very start of a NETCONF session?",
    "Both sides exchange hello messages listing their capabilities, including supported YANG models."
   ]
  ]
 },
 {
  "t": "Device access control: line and local user authentication, SSH-only VTY access",
  "hook": "Thursday afternoon, an outside auditor sits across from you at Pinecrest County Schools with a laptop open to a packet capture. She took it from a classroom data jack in five minutes, and on the screen, in plain text, is the word Telnet followed by the shared password every network technician has used on every switch for six years. Then she asks the question you were dreading: when someone changed the core switch configuration last spring, which person was it? Nobody knows, because everyone logs in the same way. You have one week to fix both problems. What has to change on every device, and in what order, so you do not lock yourself out halfway?",
  "simple": "Network devices such as routers and switches have their own front doors for administrators: a cable port for someone standing next to the device, and remote doors for people logging in over the network. Each door needs a lock. The weakest lock is one shared password for everybody, which means nobody can tell who did what. A better lock gives each person their own username and password, stored in a scrambled form that cannot easily be turned back into the original. For remote doors, the connection itself should be scrambled too, using SSH (Secure Shell), so nobody listening on the network can read the password. It is like replacing one office key that everyone copies with individual badges that log every entry.",
  "body": [
   "Every router and switch must be protected against unauthorized administrative access, because anyone who reaches privileged mode can read, change or erase the configuration. The ENCOR (Implementing and Operating Cisco Enterprise Network Core Technologies) exam tests the basic building blocks on Cisco IOS and IOS XE: how the console and VTY (virtual terminal) lines authenticate users, how passwords are stored, and how to allow only SSH (Secure Shell) for remote sessions. These are also the controls you fall back on when central authentication is unavailable, so they matter even in large networks.",
   "Cisco devices expose administrative access through lines. The console line, `line con 0`, is for direct serial access with a cable plugged into the device. The VTY lines, `line vty 0 4` or `line vty 0 15` on many platforms, accept remote Telnet or SSH sessions, one session per line. The simplest protection is a line password: `password` plus `login` under the line. Everyone shares one password and there is no accountability, so it is suitable only for labs. A better method is local user accounts. The command `username admin privilege 15 secret <password>` creates a user, and `login local` under the line makes the device prompt for a username and password and check them against its local database. Each administrator gets an individual account, so logs and `show users` output can record who was connected and who made changes.",
   "Password storage is the next layer. Protect privileged EXEC mode with `enable secret`, which is stored as a hash, rather than the old `enable password`, which is stored in clear text or as weak type 7. Use the `secret` keyword for usernames as well, never `password`. Modern IOS XE supports strong hashing types: type 8, which is PBKDF2 (Password-Based Key Derivation Function 2) with SHA-256, and type 9, which is scrypt, selected with `algorithm-type sha256` or `algorithm-type scrypt`. Type 5 is MD5-based and older. Type 7, produced by `service password-encryption` for plain `password` commands, is a weak reversible encoding that only stops someone reading the configuration over your shoulder; free tools reverse it instantly. When you see `secret 9` followed by a long string in `show running-config`, the password is properly hashed; when you see `password 7`, treat it as readable by anyone with the file.",
   "Telnet sends everything, including usernames and passwords, in clear text, so SSH should be the only remote access method. Enabling SSH on IOS requires a hostname other than the default `Router` or `Switch`, a domain name, and an RSA key pair, because the key is named from the hostname and domain. You also need a user authentication method. The following configuration shows a complete SSH-only setup:",
   "```\nhostname R1\nip domain name example.com\ncrypto key generate rsa modulus 2048\nip ssh version 2\nusername admin privilege 15 algorithm-type scrypt secret <password>\n!\nline vty 0 15\n login local\n transport input ssh\n exec-timeout 10 0\n access-class 10 in\n```",
   "Each line in that block has a purpose. `transport input ssh` blocks Telnet on the VTY lines, so a Telnet attempt is refused even though the line exists. `ip ssh version 2` disables the weaker SSHv1. `crypto key generate rsa modulus 2048` creates the key pair; smaller keys are weaker, and very small keys are not accepted for SSH version 2, so 2048 bits is a sensible modern choice. `exec-timeout 10 0` logs out a session idle for 10 minutes and 0 seconds, so an unattended terminal does not stay logged in. `access-class 10 in` applies a standard ACL (access control list) that limits which source addresses may connect to the VTY lines, typically only the management network. Note the command: on lines you use `access-class`, while on interfaces you use `ip access-group`.",
   "Several further hardening commands appear in exam questions and audits. `login block-for 120 attempts 5 within 60` slows down password guessing by temporarily blocking logins after repeated failures. `security passwords min-length` refuses short passwords. Disabling unused services, such as the HTTP server with `no ip http server` if web management is not needed, reduces the attack surface. A login banner with `banner login` or `banner motd` warns that access is restricted, which supports legal action against misuse.",
   "Privilege levels range from 0 to 15. Level 1 is user EXEC, the prompt ending in `>`, and level 15 is full privileged access, the prompt ending in `#`. Intermediate levels can be assigned specific commands with `privilege exec level`, although role-based access through AAA (authentication, authorization and accounting) or role-based CLI views is generally cleaner to maintain. A local user created with `privilege 15` lands directly in privileged mode after logging in; one created without it lands at level 1 and must use `enable`.",
   "Do not forget the console. Apply `login local` and an `exec-timeout` to `line con 0` too, since physical access is also a risk in shared wiring closets. Verify your work with `show ip ssh`, which shows whether SSH is enabled and which version is running, `show ssh`, which lists active SSH sessions, and `show users`, which lists who is connected on which line. Finally, remember that local accounts remain important even after you deploy central AAA with TACACS+ or RADIUS: a local emergency account is the fallback when the servers cannot be reached, which is why it is usually listed last in an authentication method list."
  ],
  "analogy": "Securing device access is like securing an office building. A line password is a single door code shared with everyone, so the logbook can never say who came in. Local accounts are individual badges. Type 7 encoding is writing the door code on the back of the badge in pig Latin, while a type 9 secret is keeping only a fingerprint of the code. SSH is a covered walkway so nobody outside can watch you type, and access-class is the guard who only lets in people from the management wing. The analogy stops where badges are centrally managed: on a single device, local accounts live only on that device.",
  "terms": [
   [
    "VTY lines",
    "Virtual terminal lines used for remote Telnet or SSH management sessions."
   ],
   [
    "login local",
    "Line command that authenticates users against the device's local username database."
   ],
   [
    "enable secret",
    "The hashed password protecting privileged EXEC mode."
   ],
   [
    "transport input ssh",
    "Line command that permits only SSH for incoming remote sessions."
   ],
   [
    "access-class",
    "Applies an ACL to VTY lines to restrict which source addresses can connect."
   ],
   [
    "Type 7 versus type 8 and 9",
    "Type 7 is a reversible encoding; type 8 (PBKDF2 with SHA-256) and type 9 (scrypt) are strong one-way hashes."
   ],
   [
    "exec-timeout",
    "Line command that disconnects an idle session after a set number of minutes and seconds."
   ]
  ],
  "example": "A security review finds switches reachable by Telnet from the user VLAN with a shared line password. The team first creates individual local accounts with scrypt secrets and confirms one works from the console, then sets a hostname and domain name, generates 2048-bit RSA keys, enables `ip ssh version 2`, sets `transport input ssh`, applies an `access-class` permitting only the management subnet and adds `exec-timeout 10 0` to every VTY and console line. A follow-up Telnet test from the user VLAN is refused, and `show users` now displays each engineer's own username.",
  "mistakes": [
   [
    "service password-encryption makes stored passwords secure.",
    "It only applies reversible type 7 encoding to plain password commands. Use secret with type 8 or type 9 hashing instead."
   ],
   [
    "Applying ip access-group to the VTY lines restricts who can SSH in.",
    "Lines use access-class. ip access-group is for interfaces, and applying an interface ACL to block management access is broader and easier to get wrong."
   ],
   [
    "Generating RSA keys is enough to enable SSH.",
    "SSH also needs a non-default hostname and a domain name to name the key, plus a user authentication method such as local accounts with login local. transport input ssh then restricts the lines to SSH."
   ],
   [
    "Only the VTY lines need protection; the console is safe because it is physical.",
    "Wiring closets are often shared or unlocked. Apply login local and exec-timeout to the console too."
   ]
  ],
  "tryit": [
   [
    "You are converting a branch switch from Telnet with a line password to SSH-only access over a remote session. Your current session is itself Telnet. In what order should you make the changes so you never lose access?",
    "Create the local username with a secret first, set the hostname and domain name, generate the RSA keys and enable SSH version 2, then open a second session using SSH and log in with the new account to prove it works. Only then change the VTY lines to login local and transport input ssh, and apply the access-class after confirming your own address is permitted. Changing the lines first would drop or block your Telnet session before a working alternative exists."
   ],
   [
    "An engineer shows you a configuration line, username netops privilege 15 password 7 0822455D0A16. She says it is encrypted, so it is fine. What do you tell her?",
    "Type 7 is a reversible encoding, not a hash, and can be decoded in seconds. Replace it with username netops privilege 15 algorithm-type scrypt secret followed by a new password, and treat the old password as exposed because anyone with the configuration file could have read it."
   ]
  ],
  "tip": "SSH needs a hostname, domain name, RSA keys and a login method. Use access-class (not ip access-group) to filter VTY access. Type 7 passwords are reversible; prefer secret with type 8 or type 9 hashing. transport input ssh blocks Telnet.",
  "check": [
   [
    "What four things must be in place before SSH works on IOS?",
    "A non-default hostname, an IP domain name, an RSA key pair and a user authentication method such as a local username with login local."
   ],
   [
    "Which command limits VTY access to the management subnet?",
    "access-class with a standard ACL applied inbound under line vty."
   ],
   [
    "Why should you use enable secret rather than enable password?",
    "enable secret is stored as a one-way hash, while enable password is clear text or weak reversible type 7."
   ],
   [
    "What does exec-timeout 10 0 do on a line?",
    "It disconnects a session that has been idle for 10 minutes and 0 seconds."
   ]
  ]
 },
 {
  "t": "AAA with TACACS+ and RADIUS, method lists and fallback",
  "hook": "It is 11 p.m. and the WAN link to the Riverbend clinic of Meadowbrook Health has just come back after a fiber cut. Jamal needs to log into the branch router to clean up a routing change, but earlier in the outage he could not reach it at all and had to drive over with a console cable. Now the link is up, he types his password quickly, mistypes it, and is rejected. He tries the old local emergency account instead, the one that worked over the console, and is rejected again. He is sure the router is broken. Is it, or is it behaving exactly as its AAA method list says it should?",
  "simple": "AAA stands for three questions a network asks about anyone who wants in: who are you, what are you allowed to do, and what did you do. Instead of storing usernames on every device, devices ask a central server, which keeps one list and records everything. Two languages carry these questions. TACACS+ is used mostly for administrators logging into devices, because it can approve each command separately. RADIUS is used mostly for users and laptops joining the network. A method list tells a device where to check, in order, such as the central server first and its own local list second. It only moves to the second choice if the first does not answer at all, not if it answers no. It is like calling head office to check a visitor: if nobody picks up, you check your own list, but if head office says no, the answer is no.",
  "body": [
   "Local accounts on every device do not scale. Adding or removing an administrator means touching hundreds of routers and switches, and somebody always gets missed. AAA centralizes this work. It stands for authentication, which asks who you are; authorization, which asks what you may do; and accounting, which records what you did. Devices send AAA requests to a central server, such as Cisco ISE (Identity Services Engine), which checks credentials against a directory such as Active Directory, returns decisions and logs activity. When a contractor leaves, you disable one account in the directory and every device stops accepting it.",
   "Two protocols carry AAA, and the exam expects you to compare them precisely. TACACS+ (Terminal Access Controller Access-Control System Plus) was developed by Cisco and is now documented as an informational RFC (Request for Comments). It runs over TCP (Transmission Control Protocol) port 49, encrypts the entire packet body, and separates authentication, authorization and accounting into distinct exchanges. That separation lets you authorize each individual command an administrator types and log each command, which makes TACACS+ the preferred choice for device administration. RADIUS (Remote Authentication Dial-In User Service) is an open standard that runs over UDP (User Datagram Protocol), commonly port 1812 for authentication and 1813 for accounting; older implementations used 1645 and 1646. RADIUS encrypts only the password field, combines authentication and authorization in one response, and has extensive support for network access, so it is the protocol for 802.1X, VPN (virtual private network) and wireless user access. A useful summary is TACACS+ for administrators logging into devices, RADIUS for users and endpoints accessing the network.",
   "Configuration starts with `aaa new-model`. This single command enables AAA and immediately changes how lines authenticate: if no default method list is defined, remote VTY sessions start checking the local username database, so if no local user exists you can be locked out of remote sessions. Create a local account before you type it. Then define the servers, group them, and build method lists that say in what order to try authentication sources, as in this example:",
   "```\naaa new-model\ntacacs server ISE1\n address ipv4 10.0.0.20\n key <shared-key>\naaa group server tacacs+ ADMIN-TAC\n server name ISE1\n!\naaa authentication login VTY-AUTH group ADMIN-TAC local\naaa authorization exec VTY-AUTH group ADMIN-TAC local\naaa authorization commands 15 VTY-AUTH group ADMIN-TAC local\naaa accounting commands 15 VTY-AUTH start-stop group ADMIN-TAC\n!\nline vty 0 15\n login authentication VTY-AUTH\n authorization exec VTY-AUTH\n authorization commands 15 VTY-AUTH\n accounting commands 15 VTY-AUTH\n```",
   "Read the example in layers. The `tacacs server ISE1` block defines one server with its address and shared key, which must match the key configured for this device on ISE. The `aaa group server tacacs+ ADMIN-TAC` block groups servers so you can add a second ISE node for redundancy without changing any method list. The four `aaa` lines create named lists for login authentication, EXEC authorization (whether you get a shell and at what privilege), command authorization at level 15 and command accounting. Finally, the line configuration applies each named list to the VTY lines. Without those line commands, a named list does nothing.",
   "A method list is a named or `default` ordered list of methods. The `default` list applies automatically to all lines and interfaces that do not specify a named list; a named list applies only where it is referenced. Methods are tried left to right, but fallback happens only on an error, meaning no response from the server, for example because it is down or unreachable. If the TACACS+ server is reachable and rejects the password, that is a failure, and the device does not try the next method; the login is denied. In the example, `local` is used only when every server in ADMIN-TAC is unreachable. This is exactly what happened to Jamal: once the WAN returned, the server answered, so both his mistyped password and the local-only account were rejected by ISE, and the local database was never consulted.",
   "Common trailing methods are `local`, which checks the device's username database; `enable`, which accepts the enable secret; and, dangerously, `none`, which allows access with no authentication at all when the earlier methods error out. `none` is sometimes seen on console lists in labs, but in production it means that anyone who can make the server unreachable gets in freely.",
   "Protect your own access. Many designs use a named list for VTY lines and keep the console on `local`, or on a list with local fallback, so a network failure never locks you out of the device that is down. Set a source interface for AAA traffic, such as `ip tacacs source-interface Loopback0`, so requests always come from the address registered on the server; otherwise a reroute could change the source address and ISE would reject the device as unknown. On the server side, ISE needs a network device entry with the matching address and shared key.",
   "Verification commands round out the topic. `show aaa servers` displays each server's state, such as UP or DEAD, along with request and failure counters. `test aaa group ADMIN-TAC user pass legacy` sends a test authentication from the device so you can confirm the shared key and account without logging out. In a lab, `debug aaa authentication` and `debug tacacs` show each step, including whether the server returned PASS, FAIL or ERROR, which is the clearest way to see the difference between a rejection and an unreachable server."
  ],
  "analogy": "A method list works like a store clerk checking a large check. The clerk first calls the bank. If the bank answers and says the account has no funds, the clerk refuses the check; she does not then look at the store's own list of trusted customers. She uses her own list only when the bank's phone just rings with no answer. The analogy fits fallback exactly, and it also shows the trade-off: the local list is a backup for outages, not a second chance for a rejected request.",
  "terms": [
   [
    "AAA",
    "Authentication, authorization and accounting: identifying users, controlling their actions and logging activity."
   ],
   [
    "TACACS+",
    "Cisco-developed AAA protocol on TCP 49 that encrypts the whole body and separates the three A's; best for device administration."
   ],
   [
    "RADIUS",
    "Open-standard AAA protocol on UDP 1812/1813 that encrypts only the password and combines authentication and authorization; used for network access."
   ],
   [
    "Method list",
    "An ordered list of authentication, authorization or accounting sources, applied by name or as default."
   ],
   [
    "Fallback",
    "Moving to the next method in a list, which happens only when a method returns an error such as no server response."
   ],
   [
    "Server group",
    "A named set of AAA servers referenced by method lists, allowing redundancy without changing the lists."
   ]
  ],
  "example": "During a WAN outage, a branch router cannot reach the TACACS+ servers. Because its VTY method list is `group ADMIN-TAC local`, the router falls back to the local break-glass account and the engineer can still log in. When the servers are reachable again, a colleague who mistypes her password is rejected outright rather than falling back to local, and `show aaa servers` shows the ISE node back in the UP state.",
  "mistakes": [
   [
    "If the TACACS+ server rejects a password, the device tries the local database next.",
    "Fallback happens only on an error, such as no response. A rejection is a final failure and access is denied."
   ],
   [
    "RADIUS encrypts the whole packet like TACACS+.",
    "RADIUS encrypts only the password attribute. TACACS+ encrypts the entire body."
   ],
   [
    "RADIUS is better for device administration because it is an open standard.",
    "TACACS+ is preferred for device administration because it separates authorization and can authorize and account each command. RADIUS is preferred for network access such as 802.1X, VPN and wireless."
   ],
   [
    "A named method list applies to all lines automatically.",
    "Only the default list applies automatically. A named list must be referenced under the line, for example login authentication VTY-AUTH."
   ]
  ],
  "tryit": [
   [
    "Your company wants every command typed by network engineers on core switches to be approved centrally and logged with the engineer's name. A colleague proposes RADIUS because the company already uses it for wireless. What do you recommend, and which AAA commands are involved?",
    "Use TACACS+, because it separates authorization from authentication and supports per-command authorization and accounting. Configure aaa authorization commands 15 and aaa accounting commands 15 with a TACACS+ server group, and apply them to the VTY lines. RADIUS combines authentication and authorization in one response and is not designed for per-command checks."
   ],
   [
    "A junior engineer configures aaa authentication login default group ADMIN-TAC none so that logins never fail during outages. What is the risk, and what should the list look like?",
    "With none as the fallback, anyone can log in without credentials whenever the TACACS+ servers are unreachable, and an attacker could cause that condition deliberately. Replace none with local and keep a strong local emergency account, so outages still require a valid credential."
   ]
  ],
  "tip": "Fallback to the next method happens only on error (no response), never on a rejected password. TACACS+ equals TCP 49, full-body encryption, per-command authorization; RADIUS equals UDP 1812/1813, password-only encryption, 802.1X. Create a local user before typing aaa new-model.",
  "check": [
   [
    "The TACACS+ server rejects a user's password. Will the device try the local database next?",
    "No; a rejection is a failure, not an error, so the method list stops and access is denied."
   ],
   [
    "Why is TACACS+ preferred for device administration?",
    "It separates authorization from authentication so every command can be authorized and accounted individually, and it encrypts the whole payload."
   ],
   [
    "What is the risk of typing aaa new-model without preparation?",
    "Line authentication immediately switches to AAA defaults, which can lock you out if no local user or method list is configured."
   ],
   [
    "Which transport and ports does RADIUS use?",
    "UDP, commonly 1812 for authentication and 1813 for accounting, with 1645 and 1646 on older implementations."
   ]
  ]
 },
 {
  "t": "Infrastructure security: standard and extended ACLs, placement and order",
  "hook": "Tuesday morning at Bayview Manufacturing, Elena gets a ticket from the security team: a contractor laptop on the plant floor VLAN can still open a Telnet session to the payroll server, even though she added a deny line for exactly that last week. She checks the router and the deny is right there in the access list, typed correctly, applied to the right interface. The hit counter next to it reads zero. Two lines above it, another entry has thousands of matches. How can a correct line never match, and what does that tell you about how a router reads an access list?",
  "simple": "An access list is a list of rules a router checks to decide whether to let a packet through. The router reads the list from the top and stops at the first rule that fits, so the order of the rules matters a great deal. If nothing fits, an invisible last rule says no. A standard list can only look at where a packet came from. An extended list can also look at where it is going and what kind of traffic it is, such as web or email. Think of a bouncer reading a guest list from top to bottom: the first line that mentions you decides whether you get in, and if your name is not there at all, you stay outside.",
  "body": [
   "ACLs (access control lists) are ordered lists of permit and deny statements that routers and switches use to filter traffic. They are the most basic infrastructure security tool, protecting device access and separating network segments, and the same matching logic is reused to classify traffic for QoS (quality of service), NAT (Network Address Translation), PBR (policy-based routing) and route filtering. The ENCOR exam tests how ACLs are built, how they are processed and where to apply them, and the processing rules are the part that causes the most real-world mistakes.",
   "There are two basic types. A standard ACL matches only the source IP address. Numbered standard ACLs use 1 to 99 and the expanded range 1300 to 1999. An extended ACL matches the protocol, source and destination addresses, source and destination ports, and other fields such as TCP (Transmission Control Protocol) flags or ICMP (Internet Control Message Protocol) message types. Numbered extended ACLs use 100 to 199 and the expanded range 2000 to 2699. Named ACLs, created with `ip access-list standard NAME` or `ip access-list extended NAME`, are clearer to read and let you insert or delete individual entries by sequence number, so they are preferred in modern configurations. Here is a small named extended ACL protecting a web server:",
   "```\nip access-list extended WEB-IN\n 10 permit tcp any host 10.1.1.10 eq 443\n 20 permit icmp any host 10.1.1.10 echo\n 30 deny ip any any log\n!\ninterface GigabitEthernet0/1\n ip access-group WEB-IN in\n```",
   "This ACL permits HTTPS (TCP port 443) and ICMP echo requests to the server at 10.1.1.10, then explicitly denies everything else and logs it. The explicit `deny ip any any log` is not required for blocking, since the implicit deny would drop the traffic anyway, but adding it gives you a hit counter and syslog messages for the denied traffic, which helps when troubleshooting.",
   "Addresses are matched with wildcard masks, where a 0 bit means the corresponding address bit must match and a 1 bit means ignore it. The entry `10.1.1.0 0.0.0.255` matches the whole 10.1.1.0/24 network. The keyword `host 10.1.1.10` is shorthand for that address with a wildcard of 0.0.0.0, and `any` matches every address, equivalent to 0.0.0.0 255.255.255.255. A quick way to build a wildcard for a contiguous subnet is to subtract the subnet mask from 255.255.255.255: a /26 mask of 255.255.255.192 gives a wildcard of 0.0.0.63.",
   "Processing order is critical. Entries are checked from top to bottom and the first match wins; nothing further is checked for that packet. Every ACL ends with an invisible implicit `deny any`, or `deny ip any any` for extended ACLs, so any traffic not explicitly permitted is dropped. An ACL containing only deny statements therefore blocks everything, which surprises people who meant to block one host and allow the rest. Put more specific entries before more general ones. If `permit ip 10.0.0.0 0.255.255.255 any` comes before `deny ip host 10.1.1.50 any`, the deny is never reached, because the broader permit matches that host first. This is exactly the zero hit counter Elena saw. Named ACLs number entries in steps of 10 by default, so you can insert entry 15 between 10 and 20 without rebuilding the list, and `ip access-list resequence` can renumber a crowded list.",
   "Direction and quantity also matter. An interface can have one ACL per protocol per direction, so one IPv4 ACL inbound and one outbound. Inbound ACLs are checked as packets arrive, before the routing decision, which saves the router from routing traffic it will drop anyway. Outbound ACLs are checked after routing, as packets leave. Outbound ACLs do not filter traffic generated by the router itself, such as its own routing updates or pings, which is a common exam trap.",
   "Placement follows a simple rule with a clear reason. Put extended ACLs as close to the source as possible, because they are specific enough to block only the unwanted traffic, and stopping it early avoids wasting bandwidth across the network. Put standard ACLs as close to the destination as possible, because they match only the source; placed near the source, a standard ACL would block that source from reaching everything downstream, not just the one destination you meant to protect.",
   "ACLs also protect the devices themselves. Apply `access-class` on VTY lines to limit management access, and deploy infrastructure ACLs at the network edge that block traffic addressed to your infrastructure addresses, such as router loopbacks and link addresses, while permitting required protocols such as BGP (Border Gateway Protocol) from known peers. Remember that ACLs used for filtering are stateless. Return traffic needs its own permit, or you can use the `established` keyword for TCP, which matches packets with the ACK or RST flag set, or move to a stateful firewall that tracks sessions.",
   "Verification is straightforward. `show access-lists` displays each entry with its hit counter, which tells you which line is actually matching traffic. `show ip interface` shows which ACLs are applied to an interface and in which direction. When a rule seems to be ignored, compare the counters: a busy entry above a silent one is the usual sign of an ordering problem."
  ],
  "analogy": "An ACL is like airport security reading a printed list of rules from top to bottom for each traveler and acting on the first rule that applies. If rule 2 says all passengers with boarding passes may proceed, a later rule 9 that says this specific person must be stopped is never read. And if no rule mentions a traveler, the final unwritten rule sends them back. The analogy stops working for state: airport security remembers who passed through, but a standard router ACL does not, so return traffic must be permitted separately.",
  "terms": [
   [
    "Standard ACL",
    "Matches only the source IP address; numbered 1-99 and 1300-1999."
   ],
   [
    "Extended ACL",
    "Matches protocol, source, destination and ports; numbered 100-199 and 2000-2699."
   ],
   [
    "Wildcard mask",
    "A mask where 0 bits must match and 1 bits are ignored."
   ],
   [
    "Implicit deny",
    "The invisible final entry in every ACL that drops anything not permitted."
   ],
   [
    "First match",
    "ACL processing stops at the first entry that matches the packet."
   ],
   [
    "Sequence number",
    "The number on each named ACL entry that lets you insert or remove individual lines."
   ]
  ],
  "example": "An engineer adds `deny tcp any host 10.1.1.10 eq 23` to the end of an ACL whose earlier entry permits all TCP to that host, and Telnet still works. Because the first match wins, the permit catches the traffic first. Re-adding the deny as entry 5 so it sits above the permit fixes it, and the hit counters in `show access-lists` confirm that the deny now increments while Telnet attempts fail.",
  "mistakes": [
   [
    "An ACL with only deny statements blocks just the listed traffic.",
    "The implicit deny at the end drops everything not permitted, so a deny-only ACL blocks all traffic. Add a permit for the traffic you want to allow."
   ],
   [
    "Standard ACLs should be placed near the source to stop traffic early.",
    "Standard ACLs match only the source, so near the source they would block that source from every destination. Place standard ACLs near the destination and extended ACLs near the source."
   ],
   [
    "An outbound ACL on an interface filters pings the router sends from that interface.",
    "Outbound ACLs do not filter traffic generated by the router itself."
   ],
   [
    "The router checks every ACL entry and applies the most specific one.",
    "Processing stops at the first match. Order entries from most specific to most general."
   ]
  ],
  "tryit": [
   [
    "Users in 10.20.0.0/16 should reach a file server at 10.50.1.5 only on TCP 445, while all their other traffic is allowed. The network has three routers between the user building and the data center. What type of ACL do you write, which entries in what order, and where do you apply it?",
    "Use an extended ACL applied inbound on the router interface closest to the users. Entry 10 permits TCP from 10.20.0.0 0.0.255.255 to host 10.50.1.5 eq 445, entry 20 denies IP from 10.20.0.0 0.0.255.255 to host 10.50.1.5, and entry 30 permits ip any any so other traffic is not caught by the implicit deny. Placing it near the source stops unwanted traffic before it crosses the network."
   ],
   [
    "A colleague applies an inbound ACL on a WAN interface that permits only TCP 443 to the web server and nothing else. Shortly afterward, the router's BGP session with the ISP drops. Why?",
    "The implicit deny blocks the BGP traffic (TCP 179) arriving from the ISP because no entry permits it. Add an entry permitting TCP 179 between the router and the ISP peer address, placed before any broad deny."
   ]
  ],
  "tip": "First match wins and every ACL ends with an implicit deny. Extended ACLs go near the source; standard ACLs go near the destination. Use access-class for VTY lines and ip access-group for interfaces. Outbound ACLs do not filter router-generated traffic.",
  "check": [
   [
    "Why should a standard ACL be placed close to the destination?",
    "It matches only the source, so placing it near the source would block that source from reaching every destination, not just the intended one."
   ],
   [
    "An ACL contains only deny statements. What does it do to other traffic?",
    "It blocks all traffic, because the implicit deny at the end drops everything not explicitly permitted."
   ],
   [
    "What does the wildcard 0.0.0.255 match with 172.16.5.0?",
    "Any address from 172.16.5.0 to 172.16.5.255."
   ],
   [
    "Which command shows which entry in an ACL is matching traffic?",
    "show access-lists, which displays hit counters for each entry."
   ]
  ]
 },
 {
  "t": "Control Plane Policing (CoPP)",
  "hook": "At 3:10 a.m. the core router at Summit Regional Hospital starts dropping OSPF neighbors one after another, and the on-call phone will not stop ringing. Keisha connects over the console because SSH has stopped responding, and `show processes cpu` shows the route processor pinned near its limit. The culprit turns out to be a newly installed monitoring server, misconfigured to poll the router thousands of times per second. No attacker, no exploit, just one noisy device, and yet the router that carries every clinical application nearly fell over. What should have kept that flood away from the processor while routing kept working?",
  "simple": "A router has two kinds of work. Most packets just pass through it, handled by fast hardware. A smaller set of packets is meant for the router itself, such as messages from neighboring routers or an administrator logging in, and those go to the router's brain, its main processor. That processor is not very big, so if too many packets arrive for it at once, it gets overwhelmed and stops talking to its neighbors. Control Plane Policing, or CoPP, is a speed limit on traffic heading to the processor. Important messages get a wide lane, management gets a medium lane and everything else gets a narrow one. It is like a receptionist who answers calls from doctors first and lets only a few sales calls through per hour.",
  "body": [
   "The route processor CPU handles the control plane: routing protocols such as OSPF (Open Shortest Path First) and BGP (Border Gateway Protocol), management sessions such as SSH and SNMP (Simple Network Management Protocol), and any packet punted from the data plane because the hardware cannot handle it, such as packets with IP options or packets needing an ICMP (Internet Control Message Protocol) error reply. The CPU has limited capacity compared with the forwarding hardware, so a flood of traffic aimed at the device, whether from an attack, a misconfiguration or a Layer 2 loop, can overwhelm it. When the CPU is saturated, hello packets are not processed in time, routing adjacencies drop and the network can fail even though the forwarding hardware is idle. CoPP (Control Plane Policing) protects the CPU by applying a QoS (quality of service) policy to traffic headed to the control plane, limiting each category of traffic to a safe rate.",
   "CoPP uses the MQC (Modular QoS CLI) you already know from QoS lessons. You classify control plane traffic with ACLs (access control lists) and class maps, define a policy map with a police action per class, and attach the policy to the special `control-plane` configuration mode instead of a physical interface. A complete example looks like this:",
   "```\nip access-list extended COPP-ROUTING\n permit ospf any any\n permit tcp any any eq bgp\n permit tcp any eq bgp any\nip access-list extended COPP-MGMT\n permit tcp 10.99.0.0 0.0.0.255 any eq 22\n permit udp 10.99.0.0 0.0.0.255 any eq snmp\n!\nclass-map match-all CM-ROUTING\n match access-group name COPP-ROUTING\nclass-map match-all CM-MGMT\n match access-group name COPP-MGMT\n!\npolicy-map PM-COPP\n class CM-ROUTING\n  police 1000000 conform-action transmit exceed-action transmit\n class CM-MGMT\n  police 500000 conform-action transmit exceed-action drop\n class class-default\n  police 200000 conform-action transmit exceed-action drop\n!\ncontrol-plane\n service-policy input PM-COPP\n```",
   "Read the example from the bottom up to see the logic. The `control-plane` mode with `service-policy input PM-COPP` attaches the policy to all traffic entering the route processor. The policy map has three classes. CM-ROUTING matches OSPF and BGP and is policed at 1,000,000 bits per second, but its exceed action is transmit, so routing traffic is measured and never dropped. CM-MGMT matches SSH and SNMP only from the 10.99.0.0/24 management subnet and drops anything above 500,000 bits per second. Everything else falls into `class-default`, which is held to 200,000 bits per second with drops above that.",
   "Design classes by importance. Critical traffic such as routing protocols gets a generous rate, and some designs even transmit its excess so adjacencies are never harmed. Management traffic from trusted sources gets a moderate rate. Anything that does not match a defined class lands in class-default, which is policed tightly. Traffic you never expect to reach the CPU, such as management protocols from untrusted sources, can be placed in its own class and dropped entirely. In the hospital scenario, SNMP from an unexpected source would land in class-default, and SNMP from the management subnet would be held to the management rate, so in either case the flood would be trimmed before it reached the processor.",
   "One detail trips up many candidates. In CoPP classification ACLs, `permit` means this traffic belongs to the class, and `deny` means this traffic is not in this class, so evaluation continues with the next class. The action, such as transmit or drop, comes from the policy map, not from the ACL. A deny entry in a CoPP ACL does not block anything by itself.",
   "Choosing rates requires knowing your baseline. Rates that are too low will drop legitimate hello packets during normal bursts, such as after a link flap when many routing updates arrive at once; rates that are too high give no protection. A safe approach is to deploy with every exceed action set to transmit, watch the counters with `show policy-map control-plane`, which reports conformed and exceeded packets and bytes per class, and learn the normal traffic levels over days or weeks. Then tighten the rates and change exceed actions to drop for the classes that should be limited.",
   "Platform differences matter. On many Catalyst IOS XE switches, a system-defined CoPP policy called `system-cpp-policy` is applied by default with preconfigured classes and hardware rate limiters, and you adjust its rates rather than building your own policy from scratch. Because it is on by default, a switch already has some CPU protection out of the box, and your job is mostly to verify and tune it for your traffic. On routers, CoPP is typically configured manually, as in the example.",
   "CoPP works alongside other controls rather than replacing them. Infrastructure ACLs at the network edge block unwanted traffic before it ever reaches the device. The `access-class` command restricts which addresses may open VTY sessions. Routing protocol authentication protects the protocols themselves from spoofed neighbors. CoPP is the last line of defense that keeps the CPU responsive when something gets through the other layers, which is why exam questions often describe a symptom like high CPU with dropped adjacencies and ask which feature would have prevented it."
  ],
  "analogy": "CoPP is like the triage desk at an emergency room. Every arriving patient is sorted: ambulances go straight through, scheduled appointments wait in a moderate line, and walk-ins without appointments are seen only a few at a time. The doctors, like the CPU, are never swamped, so critical patients always get care. The analogy stops working for dropping: a hospital never turns patients away, but CoPP really does discard excess packets in policed classes.",
  "terms": [
   [
    "CoPP",
    "Control Plane Policing: an MQC policy applied to the control-plane interface that rate-limits traffic to the CPU."
   ],
   [
    "control-plane",
    "The special configuration mode representing the route processor, where the CoPP service policy is attached."
   ],
   [
    "class-default",
    "The catch-all class for traffic that matches no defined class, usually policed tightly in CoPP."
   ],
   [
    "Exceed action",
    "What a policer does with traffic above the configured rate, such as drop or transmit."
   ],
   [
    "Punted traffic",
    "Packets the forwarding hardware sends up to the CPU for processing, including traffic addressed to the device."
   ],
   [
    "system-cpp-policy",
    "The default, system-defined CoPP policy on many Catalyst IOS XE switches, whose rates you can tune."
   ]
  ],
  "example": "A misconfigured monitoring server starts sending thousands of SNMP requests per second to a core router, and CPU climbs. Because CoPP polices SNMP in its management class and class-default, excess requests are dropped at the control plane, CPU stays moderate and OSPF adjacencies remain stable while the team fixes the server. Afterward, `show policy-map control-plane` shows a large exceeded count in the management class, confirming where the flood came from.",
  "mistakes": [
   [
    "CoPP is applied to the physical interfaces where attack traffic arrives.",
    "CoPP is attached under control-plane with service-policy input, so it protects the route processor regardless of which interface traffic arrived on."
   ],
   [
    "A deny entry in a CoPP ACL drops the traffic.",
    "In CoPP ACLs, deny only means the traffic does not belong to that class. The policy map's police action decides whether traffic is dropped."
   ],
   [
    "The tightest possible rates give the best protection.",
    "Rates set too low drop legitimate routing hellos during bursts and can cause the very outage CoPP should prevent. Baseline traffic first, then tighten."
   ],
   [
    "CoPP replaces infrastructure ACLs and VTY access-class.",
    "CoPP is the last line of defense. Edge infrastructure ACLs, access-class and routing protocol authentication are still needed."
   ]
  ],
  "tryit": [
   [
    "You are rolling out CoPP to 50 distribution routers that carry OSPF and BGP. You have no data on normal control plane traffic levels, and the change board is nervous about outages. How do you deploy?",
    "Deploy the policy with every class's exceed action set to transmit so nothing is dropped, then collect show policy-map control-plane counters over a representative period to learn normal rates per class. Set rates comfortably above observed peaks, change exceed actions to drop for management and class-default, and keep routing generous or transmit on exceed so adjacencies are protected."
   ],
   [
    "After a CoPP change, engineers report they can no longer SSH to a router from a new jump host at 10.120.5.20, although SSH works from 10.99.0.15. CPU is normal. What is the likely cause?",
    "The CoPP management class matches SSH only from 10.99.0.0/24, so SSH from 10.120.5.20 falls into class-default or a drop class and is policed heavily or dropped. Add the new jump host's address to the management ACL, and check that the VTY access-class also permits it."
   ]
  ],
  "tip": "CoPP is applied with service-policy input under control-plane. ACL permit only classifies traffic into a class; the police action decides whether it is dropped. Baseline first with exceed-action transmit, then tighten. Catalyst switches ship with system-cpp-policy.",
  "check": [
   [
    "Where is a CoPP policy attached?",
    "Under the control-plane configuration mode, with service-policy input."
   ],
   [
    "In a CoPP classification ACL, what does a deny entry mean?",
    "The traffic does not match that class and is evaluated against the next class; it is not dropped by the ACL."
   ],
   [
    "Why start CoPP deployment with exceed-action transmit?",
    "To measure normal control plane traffic without dropping anything, so rates can be set safely before enforcing drops."
   ],
   [
    "What symptom suggests a router needed CoPP?",
    "Very high route processor CPU caused by traffic aimed at the device, with routing adjacencies dropping and management sessions becoming unresponsive."
   ]
  ]
 },
 {
  "t": "REST API security: HTTPS, tokens, secret handling",
  "hook": "Friday at 4:45 p.m., a message arrives from the security team at Granite Peak Insurance: an automated scanner found the network controller's administrator password in a public code repository. It sits in plain text on line 12 of a Python script that Sam, a summer intern, wrote to pull interface reports, and he pushed it to his personal account to show a friend. Sam has already deleted the file and says the problem is solved. Your manager asks you two things: is it really solved, and how do you build automation so a password never ends up in a script again?",
  "simple": "Network controllers and many devices can be controlled by other programs through an API, which is a door for software instead of people. Anyone who has the right key to that door can change the whole network, so the keys need careful handling. First, the conversation must be scrambled, using HTTPS, so nobody in the middle can read it. Second, instead of sending a password every time, a program usually trades it once for a temporary pass called a token that expires. Third, passwords and tokens should never be written inside scripts or shared code; they belong in a locked safe made for secrets. It is like a hotel: you show your ID once at the front desk, get a key card that stops working at checkout, and never tape your ID to the door.",
  "body": [
   "Controllers such as Catalyst Center and SD-WAN Manager, and devices running RESTCONF, expose REST (representational state transfer) APIs (application programming interfaces) that can read and change the entire network. Whoever holds valid API credentials effectively holds administrator access, often to hundreds of devices at once, and unlike a person at a keyboard, a script with stolen credentials can make changes very quickly. The ENCOR exam expects you to understand how these APIs are protected and how to handle credentials safely in automation, which comes down to four layers: transport security, authentication, authorization and secret handling.",
   "Transport security comes first. APIs should be reachable only over HTTPS (HTTP Secure), which uses TLS (Transport Layer Security) to encrypt requests and responses and to prove the server's identity with a certificate. Plain HTTP would expose credentials and tokens to anyone on the path, including a compromised switch or a rogue device on the same segment. Clients should validate the server certificate against a trusted CA (certificate authority). Disabling verification, for example with `verify=False` in the Python requests library, is common in labs with self-signed certificates, and the warning it prints is easy to ignore. In production it allows man-in-the-middle attacks, because the client will accept any certificate, including one presented by an attacker who intercepts the connection. The better fix is to install a certificate from your enterprise CA on the controller or device, or to point the client at the correct CA bundle so verification succeeds.",
   "Authentication methods vary, and the exam expects you to recognize them. HTTP Basic authentication sends a base64-encoded username and password in the `Authorization` header on every request. Base64 is encoding, not encryption, so anyone who captures the header can decode it instantly; Basic authentication is acceptable only over HTTPS. Most controllers use token-based authentication instead. The client sends credentials once to an authentication endpoint and receives a token, then includes the token in subsequent requests. Catalyst Center, for example, returns a token from its authentication endpoint that you pass in the `X-Auth-Token` header. Tokens expire after a set time, limiting the damage if one leaks. Other schemes include API keys, which are long-lived secrets identifying an application; OAuth 2.0 bearer tokens, sent as `Authorization: Bearer <token>` and often limited by scopes; and session cookies combined with CSRF (cross-site request forgery) tokens, which SD-WAN Manager uses. Whatever the scheme, remember that a bearer token works for whoever holds it, so it must be protected like a password.",
   "Authorization should follow least privilege. Create dedicated service accounts for automation with only the roles they need, such as read-only for monitoring and reporting scripts, rather than reusing a personal administrator account. Controllers support RBAC (role-based access control) for this purpose. A dedicated account also makes logs meaningful: when the audit trail shows that the reporting account changed a configuration, you know something is wrong. Log and review API activity, and apply rate limiting and source address restrictions where the platform allows, so a stolen credential used from an unexpected network stands out.",
   "Secret handling is where most real-world failures happen. Never hard-code passwords, tokens or keys in scripts, and never commit them to version control. A secret pushed to a repository should be considered compromised and rotated, even if the file is deleted later, because the commit history keeps the old content and copies may already exist in clones, forks or scanners. In the opening scenario, deleting the file did not solve anything; the password must be changed. Instead of hard-coding, read secrets at runtime from environment variables, a protected configuration file excluded from the repository with a `.gitignore` entry, or, best, a secrets manager or vault that provides access control, auditing and rotation.",
   "Good habits extend beyond storage. Mask secrets in logs and error messages, so a debug printout of a request does not reveal a token. Rotate credentials periodically and immediately when someone leaves the team or a leak is suspected. Store tokens only in memory for the length of the job, and request a fresh one when they expire rather than writing them to disk. Use pre-commit secret scanning where available, so a mistake is caught before it leaves a laptop.",
   "Finally, validate input and handle errors correctly, because response codes tell you which layer failed. A 401 Unauthorized response means authentication failed or the token expired, so the script should obtain a new token and retry once. A 403 Forbidden response means the identity is authenticated but not permitted to perform that action, which is a signal to check roles rather than retry; hammering a 403 in a loop only fills logs and may trigger lockouts. Treat data returned by an API as untrusted input too, validating it before using it to build the next request."
  ],
  "analogy": "API security works like a concert venue. HTTPS is the enclosed entrance hall where nobody outside can see what you show the staff. Logging in once and getting a token is trading your ticket for a wristband that is valid only for tonight. Least privilege is a wristband color that admits you to the floor but not backstage. Hard-coding a password in a script is leaving a photo of your ticket on a public notice board: tearing the photo down later does not help if someone already copied it. The analogy stops working in one way: a wristband is hard to copy, but a token is just text, so anyone who sees it can reuse it until it expires.",
  "terms": [
   [
    "HTTPS",
    "HTTP protected by TLS, encrypting traffic and authenticating the server with a certificate."
   ],
   [
    "Token authentication",
    "Exchanging credentials once for a time-limited token that is sent with later requests."
   ],
   [
    "Bearer token",
    "A token presented in the Authorization header; whoever holds it can use it."
   ],
   [
    "Basic authentication",
    "Sending a base64-encoded username and password in the Authorization header; encoded, not encrypted, so it requires HTTPS."
   ],
   [
    "Least privilege",
    "Granting an account only the permissions its task requires."
   ],
   [
    "Secrets manager",
    "A system that stores credentials securely with access control, auditing and rotation."
   ]
  ],
  "example": "A developer's script for Catalyst Center contains an administrator password in plain text and is pushed to a shared Git repository. The team rotates the password, creates a read-only service account for the script, stores its credentials in the company vault, and changes the script to fetch them at runtime and request a fresh token for each run. They also replace `verify=False` with the path to the enterprise CA bundle and add a pre-commit secret scan to the repository.",
  "mistakes": [
   [
    "Basic authentication is safe because the credentials are base64-encoded.",
    "Base64 is reversible encoding, not encryption. Basic authentication is acceptable only inside HTTPS."
   ],
   [
    "Deleting a file that contained a password from the repository fixes the leak.",
    "The secret remains in commit history and in any copies already made. Treat it as compromised and rotate it."
   ],
   [
    "A 403 response means the token expired, so the script should log in again.",
    "401 means authentication failed or the token expired. 403 means the identity is authenticated but lacks permission, so check roles instead of retrying."
   ],
   [
    "verify=False is fine in production as long as the controller is internal.",
    "Disabling certificate validation allows anyone on the path to impersonate the controller and capture credentials. Install a trusted certificate or point the client at the correct CA bundle."
   ]
  ],
  "tryit": [
   [
    "Your team is building a nightly job that reads device inventory and health from Catalyst Center and emails a report. Three engineers will maintain the code in a shared repository. A teammate suggests using his own administrator login in a config.py file that everyone shares. What do you propose instead?",
    "Create a dedicated read-only service account for the job, store its credentials in the company secrets manager or at least in environment variables on the job server, and keep config files with secrets out of the repository. The script obtains a token at runtime, keeps it in memory and requests a new one on a 401. A read-only account limits damage if the credential leaks, and a dedicated account makes the audit trail clear."
   ],
   [
    "A script that has worked for months suddenly gets 403 responses from the SD-WAN Manager API on configuration calls, while read calls still succeed. Someone suggests adding a loop that retries every five seconds. Is that the right fix?",
    "No. A 403 means the account is authenticated but not authorized for that action, most likely because its role changed. Retrying will keep failing and may trigger alerts or lockouts. Check the account's role assignment and confirm whether it should still have write access."
   ]
  ],
  "tip": "Basic authentication is only encoded, not encrypted, so it needs HTTPS. 401 means authenticate again; 403 means you lack permission. A leaked secret must be rotated, not just deleted from the file. Catalyst Center tokens go in the X-Auth-Token header.",
  "check": [
   [
    "Why is verify=False dangerous in production scripts?",
    "It disables certificate validation, allowing a man-in-the-middle to impersonate the API server and capture credentials or tokens."
   ],
   [
    "Why do token-based APIs improve on sending credentials with every request?",
    "Credentials are sent once; the token is time-limited and can be scoped, reducing exposure if it leaks."
   ],
   [
    "Name two safe places to keep API secrets for a script.",
    "Environment variables or, preferably, a secrets manager or vault; not in the script or repository."
   ],
   [
    "Which HTTP header carries the Catalyst Center token on API requests?",
    "X-Auth-Token."
   ]
  ]
 },
 {
  "t": "Network security design: threat defense, endpoint security, next-generation firewall",
  "hook": "Monday, 8:20 a.m. at Copperline Credit Union. Over the weekend, Rosa from accounting worked from a hotel and clicked a link in an email that looked like it came from the shared-drive service. This morning her laptop is back on the office network, and the new firewall at the internet edge, the one the board approved last year, has logged nothing unusual. Your director asks the obvious question in the hallway: we bought the best firewall available, so why are we even worried? What else should have been watching Rosa's laptop, and what is still watching it now that it is inside?",
  "simple": "No single tool can keep a network safe, just as one lock cannot protect a house that also has windows and a back door. Good security uses layers. A next-generation firewall at the network's edge checks traffic more carefully than an old firewall: it recognizes which app is talking, which person is using it, and whether the traffic looks like a known attack. Endpoint security runs on each laptop and phone, so the device is protected even at a hotel or coffee shop. Other layers block dangerous websites, scan email, control who can plug in and watch for strange behavior inside the network. If one layer misses something, another can catch it. It is like a bank that has a guard at the door, cameras inside, locked drawers and alarms on the vault.",
  "body": [
   "No single product secures a network. Modern security design layers several controls so that if an attacker gets past one, others detect or stop them, an approach called defense in depth. The ENCOR exam asks you to understand the roles of the main components in Cisco's enterprise security architecture and how they fit together, rather than to configure each product. Expect scenario questions that describe a threat and ask which component would prevent or detect it.",
   "Threat defense covers the whole attack continuum, usually described as before, during and after an attack. Before an attack, you reduce exposure through segmentation, device hardening, access control and patching, so there is less to attack. During an attack, you detect and block it with firewalls, intrusion prevention, and web and email security. After an attack, you investigate, contain and remediate, using telemetry and forensic data to understand what happened and to clean up. A key design principle is to assume a breach will happen. A determined attacker, a careless click or a compromised supplier will eventually get something inside, so visibility into what is happening inside the network matters as much as the strength of the perimeter.",
   "NGFWs (next-generation firewalls) go beyond traditional stateful firewalls, which filter by addresses, ports and connection state. An NGFW adds application visibility and control, identifying applications regardless of the port they use, so a file-sharing app tunneling over TCP port 443 can be recognized and blocked even though web browsing on the same port is allowed. It adds user identity awareness, so policies can be written by user or group, often learned from Cisco ISE (Identity Services Engine) or Active Directory, instead of only by IP address. It includes an integrated IPS (intrusion prevention system) that inspects traffic inline for exploit signatures and anomalous behavior, URL filtering by category and reputation, and advanced malware protection that checks files against threat intelligence and can send unknown files to a sandbox for analysis. Many NGFWs can also decrypt TLS (Transport Layer Security) traffic for inspection where policy and privacy rules allow, since much malicious traffic is now encrypted. Cisco's current NGFW line is Cisco Secure Firewall, managed by a management center. NGFWs are placed at the internet edge, between data center segments and increasingly at branch sites.",
   "Endpoint security protects the devices themselves, because users can be attacked through email, web browsing or removable media wherever they are, including places where the corporate firewall never sees their traffic. Endpoint protection platforms combine antivirus, host firewalls and exploit prevention. EDR (endpoint detection and response) goes further by recording endpoint activity, such as processes started, files written and network connections made, so it can detect suspicious behavior and support investigation and containment, for example by isolating an infected laptop from the network with one action. Cisco's offering is Cisco Secure Endpoint, formerly AMP (Advanced Malware Protection) for Endpoints. Endpoint posture checks, enforced through network access control with ISE, can ensure a device has current patches and active protection before it receives full access.",
   "Several other pieces complete the architecture. Network access control with 802.1X and MAB (MAC Authentication Bypass), using ISE, decides who and what may connect and assigns them to segments. Segmentation with VLANs (virtual LANs), VRFs (virtual routing and forwarding instances) and TrustSec limits lateral movement, so a compromised printer cannot reach the finance servers. DNS-layer security and secure web gateways, such as Cisco Umbrella, block malicious domains before a connection is even made, which works for roaming users too. Email security blocks phishing and malicious attachments before they reach inboxes.",
   "Visibility and correlation tie the layers together. Network telemetry analysis, such as Cisco Secure Network Analytics, formerly Stealthwatch, uses NetFlow records from switches and routers to baseline normal traffic and detect anomalies inside the network, such as a workstation suddenly sending large volumes of data to an unusual external address, which may indicate data exfiltration. SIEM (security information and event management) platforms collect and correlate logs, and XDR (extended detection and response) platforms correlate alerts across endpoints, network, email and cloud, so analysts see one incident instead of dozens of disconnected alerts.",
   "When designing, combine these components in layers, share context between them and plan for visibility and response as well as prevention. Context sharing is what makes the whole stronger than the parts: ISE identity can feed firewall policy so rules refer to groups such as Contractors, and an EDR detection can trigger ISE to move a device into a quarantine segment. Zero trust principles tie it together: verify every user and device, grant least privilege and inspect continuously, rather than trusting anything simply because it is inside the perimeter. In the opening scenario, the perimeter firewall never saw the hotel traffic, so DNS-layer security, EDR on the laptop, posture checks on reconnection and NetFlow analytics are the layers that matter."
  ],
  "analogy": "Layered security is like protecting a museum. The front entrance has guards who check tickets and bags, which is the NGFW. Each valuable painting has its own alarm and case, which is endpoint security, useful even when a painting is loaned to another gallery. Internal doors keep visitors to the public wings, which is segmentation, and cameras throughout record movement, which is telemetry and EDR. The analogy stops working for speed: a museum guard can take time, but network controls must make decisions in milliseconds, which is why automation and shared context matter.",
  "mnemonic": "Before, During, After: reduce exposure before an attack, detect and block during it, investigate and remediate after it, the three phases of the attack continuum in order.",
  "terms": [
   [
    "Defense in depth",
    "Layering multiple security controls so the failure of one does not expose the whole network."
   ],
   [
    "NGFW",
    "Next-generation firewall: a stateful firewall with application awareness, user identity, IPS, URL filtering and malware protection."
   ],
   [
    "IPS",
    "Intrusion prevention system: inspects traffic inline and blocks known attack patterns and anomalies."
   ],
   [
    "EDR",
    "Endpoint detection and response: records endpoint activity to detect, investigate and contain threats."
   ],
   [
    "Zero trust",
    "A model that never assumes trust based on network location and continuously verifies users and devices."
   ],
   [
    "Network telemetry analytics",
    "Using flow data such as NetFlow to baseline traffic and detect anomalies inside the network."
   ]
  ],
  "example": "A user clicks a phishing link. DNS-layer security blocks the malicious domain for most users, but one laptop connected through a hotel network is infected. Its EDR agent flags suspicious behavior and isolates it; when it later connects to the office, ISE posture assessment places it in a quarantine segment, and NetFlow analytics confirm no data left the network. The security team uses the EDR timeline to see which file started the infection and blocks its hash across all endpoints.",
  "mistakes": [
   [
    "A strong perimeter firewall is enough to protect the network.",
    "Users work outside the perimeter and threats arrive through email, web and removable media. Defense in depth adds endpoint security, segmentation, DNS-layer security and internal visibility."
   ],
   [
    "An NGFW is just a stateful firewall with a faster processor.",
    "An NGFW adds application identification, user identity-based policy, integrated IPS, URL filtering and malware protection on top of stateful filtering."
   ],
   [
    "Blocking by port is enough to stop unwanted applications.",
    "Many applications use common ports such as TCP 443. Application visibility and control identifies the application regardless of port."
   ],
   [
    "Once traffic is inside the network, it can be trusted.",
    "Zero trust assumes breach. Segmentation, continuous verification and internal telemetry detect lateral movement and exfiltration."
   ]
  ],
  "tryit": [
   [
    "A hospital wants to stop staff from using an unapproved file-sharing application, but it must allow normal web browsing. Both use TCP port 443. A colleague proposes an ACL blocking port 443 to the file-sharing provider's addresses, which change often. What do you recommend?",
    "Use NGFW application visibility and control, which identifies the file-sharing application from its traffic regardless of port or changing addresses, and block that application while permitting web browsing. Optionally tie the rule to user identity from ISE so an approved group can still use it. Port and address ACLs cannot reliably separate applications on the same port."
   ],
   [
    "Security analysts notice that a finance workstation has been sending a few gigabytes per night to an unfamiliar external address for a week. The perimeter firewall allowed it because outbound HTTPS is permitted. Which components should have detected this, and what should happen next?",
    "Network telemetry analytics using NetFlow should flag the unusual volume and destination compared with the workstation's baseline, and EDR on the workstation can show which process is sending the data. Next, contain the host, for example by isolating it with EDR or moving it to a quarantine segment through ISE, and investigate using EDR and SIEM data."
   ]
  ],
  "tip": "The NGFW's distinguishing features are application awareness, identity-based policy and integrated IPS and malware inspection, on top of stateful filtering. Questions about an infected laptop outside the office point to endpoint security, not the perimeter firewall. Unusual internal traffic patterns point to NetFlow-based analytics.",
  "check": [
   [
    "What does an NGFW add beyond a stateful firewall?",
    "Application identification and control, user identity-based policy, integrated IPS, URL filtering and malware protection."
   ],
   [
    "Why is endpoint security needed if you already have a strong perimeter firewall?",
    "Users and devices work outside the perimeter and threats arrive through email, web and removable media, so protection and detection must also run on the endpoint itself."
   ],
   [
    "Which technology uses NetFlow to detect anomalies such as data exfiltration inside the network?",
    "Network telemetry analytics, such as Cisco Secure Network Analytics."
   ],
   [
    "What are the three phases of the attack continuum?",
    "Before (reduce exposure), during (detect and block) and after (investigate, contain and remediate)."
   ]
  ]
 },
 {
  "t": "Cisco TrustSec (SGT, SGACL) and MACsec",
  "hook": "The quarterly review at Lantern Foods is not going well. The network team at the distribution center maintains an access list with more than 2,000 lines, built up over years to keep the warehouse scanners, office laptops, contractor devices and payment terminals apart. Every time a subnet changes, someone edits a dozen switches and hopes they did not open a hole. Meanwhile, the auditor has a second question: the uplinks between buildings run through a shared ceiling space with other tenants, so what stops someone from tapping a cable? Ravi, the lead engineer, thinks both problems have answers in the same family of features. Which ones, and how would policy stop depending on IP addresses?",
  "simple": "Normally, network rules say things like this address may talk to that address. When devices move or addresses change, the rules break and pile up. Cisco TrustSec changes the question to which group are you in. When a device joins the network, it gets a group label, called a tag, such as Employee, Contractor or Payment Terminal. The network carries that label along with the traffic, and a short table of rules decides which groups may talk to which. MACsec is a related but separate feature that scrambles traffic on each cable between two network devices, so someone tapping the wire sees nothing useful. It is like a building that gives everyone a colored badge and lets each door check the color, while the corridors between rooms are also covered so nobody can peek in.",
  "body": [
   "Traditional access control ties policy to IP addresses and VLANs (virtual LANs). As users move, addresses change and ACLs (access control lists) multiply, and the policy becomes hard to manage and easy to get wrong. Cisco TrustSec replaces this with group-based segmentation: users and devices are classified into groups, and policy is written between groups rather than between addresses. TrustSec is the policy plane of SD-Access (Software-Defined Access), but it can also be deployed in a traditional campus network without a fabric.",
   "TrustSec has three functions, classification, propagation and enforcement, and exam questions often ask which function a given feature performs. Classification assigns an SGT (Scalable Group Tag, also called a Security Group Tag), a 16-bit number, to traffic from a user or device. Dynamic classification happens during 802.1X, MAB (MAC Authentication Bypass) or WebAuth authentication, when Cisco ISE (Identity Services Engine) returns the SGT as part of the authorization result, along with or instead of a VLAN. Static classification maps an SGT to an IP address or subnet, a VLAN or a port, which is useful for servers and devices that cannot authenticate, such as a data center server farm.",
   "Propagation carries the SGT from the point where traffic enters the network to the point where policy is enforced, which may be several hops away. Inline tagging inserts the SGT into each frame in a Cisco metadata (CMD) field between switches whose hardware supports it, and in SD-Access the tag rides in the VXLAN (Virtual Extensible LAN) header. Where hardware cannot tag inline, the SXP (SGT Exchange Protocol) sends IP-to-SGT mappings over a TCP (Transmission Control Protocol) connection from a device that knows them, such as an access switch or ISE, to one that must enforce, such as a firewall or a data center switch. The enforcing device can then look up the source's group from the packet's source IP address.",
   "Enforcement applies an SGACL (Scalable Group Access Control List), which is written as a policy between a source group and a destination group, for example Contractors to Finance-Servers deny, or Employees to Web-Servers permit HTTPS. These policies form a matrix, with source groups on one axis and destination groups on the other, defined centrally in ISE, or in Catalyst Center with SD-Access, and downloaded to network devices. Enforcement usually happens at the egress point, near the destination, where the device knows both the source SGT carried with the packet and the destination group of the attached server or host. Firewalls can also use SGTs in their rules, so a firewall policy can say Contractors may not reach Payroll without listing any subnets.",
   "The payoff is scale and stability. Because policy refers to groups, it does not change when addresses change: a contractor laptop that moves to another floor and gets a new address keeps its Contractor tag and the same rules. The matrix is also much smaller than equivalent IP ACLs. Ten groups produce at most a hundred cells, many of them simply using a default permit or deny, while the IP-based equivalent might need thousands of lines across many devices.",
   "MACsec (IEEE 802.1AE) is a different but related TrustSec feature. It encrypts traffic at Layer 2, hop by hop, on each Ethernet link. Each frame is encrypted and integrity-protected using AES-GCM (Advanced Encryption Standard in Galois/Counter Mode) between two directly connected devices, then decrypted at the next device, which can inspect it, apply QoS (quality of service) and SGACLs, and re-encrypt it on the next link. MACsec protects against wiretapping and tampering on cables and against man-in-the-middle insertion on a link, such as a device spliced into an uplink running through a shared space.",
   "Keys are negotiated with MKA (MACsec Key Agreement), defined in IEEE 802.1X-2010. Between switches, keys can come from a pre-shared key or from 802.1X authentication. Between a host and a switch, 802.1X authentication with ISE drives key agreement, which requires a MACsec-capable supplicant on the endpoint. Because MACsec works hop by hop at line rate in hardware, it does not hide traffic from the network devices themselves, unlike end-to-end encryption such as IPsec (Internet Protocol Security) or TLS (Transport Layer Security). That is a feature, not a flaw, for an enterprise campus: switches can still inspect and enforce policy while the cables between them stay protected.",
   "Summarize the pair this way: SGT and SGACL control who can talk to whom, and MACsec protects the confidentiality and integrity of frames on each link. They are often deployed together, and inline SGT tagging between switches can itself be protected by MACsec so the tag cannot be altered on the wire."
  ],
  "analogy": "TrustSec is like a conference where every attendee gets a colored badge at registration: blue for staff, yellow for vendors, red for press. Room doors check badge colors against one posted chart, so nobody needs a list of individual names, and attendees can move between rooms freely. MACsec is like covered walkways between buildings: anyone inside a building can still see you, but nobody outside can watch or interfere while you walk between them. The analogy stops working for propagation: a badge is always visible, while an SGT must be carried inline or shared through SXP.",
  "mnemonic": "Classify, Carry, Check: classification assigns the SGT, propagation carries it inline or with SXP, and enforcement checks the SGACL, the three TrustSec functions in order.",
  "terms": [
   [
    "SGT",
    "Scalable (Security) Group Tag: a 16-bit identifier that represents a user or device group."
   ],
   [
    "SGACL",
    "Scalable Group ACL: a permit or deny policy between a source SGT and a destination group."
   ],
   [
    "SXP",
    "SGT Exchange Protocol: shares IP-to-SGT mappings over TCP where inline tagging is not supported."
   ],
   [
    "Inline tagging",
    "Carrying the SGT inside each frame, in a Cisco metadata field or the VXLAN header, between capable devices."
   ],
   [
    "MACsec",
    "IEEE 802.1AE hop-by-hop Layer 2 encryption and integrity protection on Ethernet links."
   ],
   [
    "MKA",
    "MACsec Key Agreement: the protocol that negotiates and distributes MACsec keys."
   ]
  ],
  "example": "A retailer must keep point-of-sale terminals away from guest and office devices across 100 stores. ISE assigns the POS SGT when terminals authenticate with MAB, older branch switches that cannot tag inline send mappings to the data center firewall with SXP, and a single SGACL policy blocks all other groups from reaching POS systems, while MACsec encrypts the uplinks between switches in shared wiring closets. When a store renumbers its subnets, the group policy does not change at all.",
  "mistakes": [
   [
    "SGACLs are written between IP subnets, like traditional ACLs.",
    "SGACLs are written between source and destination groups. That is why policy does not change when addresses change."
   ],
   [
    "SXP encrypts traffic between switches that cannot tag inline.",
    "SXP shares IP-to-SGT mappings over TCP so a device can enforce policy. It does not carry or encrypt the user traffic."
   ],
   [
    "MACsec provides end-to-end encryption between two hosts.",
    "MACsec is hop by hop. Frames are decrypted and re-encrypted at each device, so it protects links, not the whole path. Use IPsec or TLS for end-to-end protection."
   ],
   [
    "SGTs are only enforced at the access switch where the user connects.",
    "Enforcement usually happens at egress, near the destination, where both the source tag and the destination group are known."
   ]
  ],
  "tryit": [
   [
    "A university wants research lab servers reachable only by faculty and lab staff, regardless of which building or wireless network they connect from. Addresses are assigned dynamically, and some older distribution switches cannot tag traffic inline. How would you use TrustSec?",
    "Have ISE assign SGTs such as Faculty and Lab-Staff during 802.1X, and statically classify the lab server subnet as Research-Servers. Where older switches cannot tag inline, use SXP to send IP-to-SGT mappings to the switch or firewall in front of the servers. Define an SGACL matrix that permits Faculty and Lab-Staff to Research-Servers and denies other groups, enforced at egress near the servers."
   ],
   [
    "An auditor asks how the company protects traffic on fiber uplinks that run through a ceiling shared with another tenant. The switches at both ends support MACsec. A colleague suggests IPsec tunnels between every pair of switches instead. What do you recommend and why?",
    "Enable MACsec on the uplinks, with keys from MKA using a pre-shared key or 802.1X. It encrypts and integrity-protects every frame on the link at line rate in hardware, which addresses wiretapping on that cable, while letting each switch still inspect and enforce policy. IPsec tunnels between every pair of switches would add complexity and overhead for a problem that is specifically about the physical link."
   ]
  ],
  "tip": "Classification assigns the SGT, propagation carries it (inline tag or SXP), enforcement applies the SGACL, usually at egress. MACsec is hop-by-hop Layer 2 encryption using MKA for keys, not end-to-end.",
  "check": [
   [
    "How does an enforcing switch learn the source SGT when upstream devices cannot tag inline?",
    "Through SXP, which sends IP-to-SGT mappings so the switch can derive the SGT from the source IP address."
   ],
   [
    "What does MACsec protect, and what does it not?",
    "It encrypts and integrity-protects frames on each link between devices, but traffic is decrypted inside each device, so it is not end-to-end encryption."
   ],
   [
    "How is an SGT dynamically assigned to a user?",
    "ISE returns it in the authorization result after 802.1X, MAB or WebAuth authentication."
   ],
   [
    "Where is SGACL enforcement usually performed, and why?",
    "At egress near the destination, where the device knows both the source SGT and the destination group."
   ]
  ]
 },
 {
  "t": "Network access control: 802.1X, MAB and WebAuth",
  "hook": "During a routine walk-through at Oakridge Community College, Tomas notices a small black box plugged into a wall jack behind a vending machine in the student center, its cable running to an open port on the access switch. Nobody knows who put it there or how long it has been on the network. The next morning, the dean asks how a stranger's device got a network address in the first place, and whether the same thing could happen in the library, the labs or the faculty offices. Every port on campus is live by default. How do you make each port ask who is connecting before it lets anything through, without breaking every printer and phone on campus?",
  "simple": "Without network access control, any device plugged into a wall jack or joined to the Wi-Fi gets on the network. Network access control makes the network ask who or what you are first. The best method, 802.1X, has the device prove its identity with a username and password or a digital certificate, and a central server says yes or no. Some devices, such as printers or cameras, cannot do that, so the switch checks their hardware address instead, which is called MAB. Visitors are sent to a login web page, called WebAuth. After approval, the server tells the switch which part of the network the device belongs in. It is like a building where staff swipe a badge, deliveries are checked against a list of expected vans and visitors sign in at the front desk.",
  "body": [
   "Network access control decides who and what may connect to a switch port or wireless network, and what access they receive once connected. Without it, anyone who plugs into a wall jack joins the network with the same reach as an employee. Cisco's solution uses Cisco ISE (Identity Services Engine) as the policy server, with three authentication methods on switches: 802.1X, MAB (MAC Authentication Bypass) and WebAuth (web authentication). The ENCOR exam focuses on the roles, the message flow, when to use each method and how ports behave before and after authentication.",
   "IEEE 802.1X defines port-based access control with three roles. The supplicant is the software on the endpoint, built into Windows, macOS, Linux and mobile phones. The authenticator is the switch or wireless controller that controls the port. The authentication server is a RADIUS (Remote Authentication Dial-In User Service) server such as ISE. The supplicant and switch exchange EAP (Extensible Authentication Protocol) messages directly over the LAN, a format called EAPOL (EAP over LAN). The switch relays them inside RADIUS messages to ISE, so the switch never needs to understand the credentials themselves. Until authentication succeeds, the port allows only EAPOL traffic, so the endpoint cannot get an address or reach anything else.",
   "When ISE approves, it returns a RADIUS Access-Accept with authorization attributes such as a VLAN (virtual LAN), a downloadable ACL (access control list) or an SGT (Scalable Group Tag), and the switch applies them to the session. A rejection returns an Access-Reject, and the switch can then try another method or leave the port unauthorized. EAP methods determine how the endpoint proves its identity. PEAP (Protected EAP) sends a username and password inside a TLS (Transport Layer Security) tunnel. EAP-TLS uses certificates on both sides and is the strongest common option, because there is no password to steal or guess. EAP-FAST (Flexible Authentication via Secure Tunneling) is a Cisco-developed tunneled method.",
   "Many devices, such as printers, cameras, badge readers and older IoT (Internet of Things) devices, have no supplicant at all. MAB handles them. When the port gets no EAPOL response after a timeout, the switch learns the device's MAC (media access control) address from its first frame and sends it to ISE as the username in a RADIUS request. ISE checks the address against an endpoint list or profiling data and authorizes it with an appropriate policy. MAB is weak authentication, because MAC addresses are easy to spoof, so give MAB devices narrow access, such as only the print servers for a printer, and use ISE profiling, which examines attributes such as DHCP options and traffic behavior, to detect a device that claims a printer's MAC address but behaves like a laptop.",
   "WebAuth redirects the user's browser to a login page and is used mainly for guests and devices without supplicants. Local WebAuth serves the portal from the switch itself. Central WebAuth, or CWA, is more common. It runs MAB first; ISE, seeing an unknown MAC address, returns a redirect URL and a redirect ACL, so the switch sends the browser to the ISE guest portal. After the guest logs in or accepts the terms of use, ISE issues a CoA (change of authorization) telling the switch to reapply the session, this time with guest access such as internet only.",
   "On the switch, configuration begins with AAA (authentication, authorization and accounting) pointing to RADIUS servers, and the global command `dot1x system-auth-control`. Ports are then configured with `authentication port-control auto`, `dot1x pae authenticator` and `mab`. Order and priority decide which method runs first and which may interrupt another; the common approach tries 802.1X first, then falls back to MAB after the 802.1X timeout expires with no response. Host modes control how many devices a port allows. Single-host allows one device. Multi-host lets the first device authenticate for all devices on the port. Multi-domain allows one data device and one voice device, which is typical for an IP phone with a PC plugged in behind it. Multi-auth requires each device to authenticate separately. Newer IOS XE releases use IBNS (Identity-Based Networking Services) 2.0 policy maps to express this logic as events and actions.",
   "Roll out carefully, because enforcing on day one usually breaks devices nobody knew about. Monitor mode, also called open authentication, runs authentication and logs results but lets everyone through, so you can see what would fail without blocking anyone. Low-impact mode then permits limited traffic, such as DHCP and DNS, before authentication through a pre-authentication ACL, and gives full access after success. Closed mode enforces strictly, allowing nothing but EAPOL until a device authenticates. Verify sessions with `show access-session interface Gi1/0/5 details`, which shows the MAC address, the method that succeeded (dot1x or mab), the host mode, the assigned VLAN or ACL and the session status."
  ],
  "analogy": "Network access control works like the front desk of an office building. Employees swipe a badge that the central security office checks, which is 802.1X. Delivery vans without badges are checked against a list of expected license plates, which is MAB, and plates can be faked, so vans only get as far as the loading dock. Visitors sign in at a kiosk and get a guest sticker, which is WebAuth. The analogy stops working for timing: the desk sees everyone at once, but a switch waits for an 802.1X timeout before it tries MAB.",
  "terms": [
   [
    "Supplicant",
    "The 802.1X client software on the endpoint."
   ],
   [
    "Authenticator",
    "The switch or wireless controller that controls the port and relays EAP to the RADIUS server."
   ],
   [
    "EAPOL",
    "EAP over LAN: carries EAP messages between the supplicant and the switch."
   ],
   [
    "MAB",
    "MAC Authentication Bypass: authenticates devices without supplicants using their MAC address."
   ],
   [
    "Change of authorization",
    "A RADIUS message from ISE that tells the switch to re-authenticate or apply new policy to an active session."
   ],
   [
    "Host mode",
    "The port setting (single-host, multi-host, multi-domain or multi-auth) that controls how many devices may authenticate and how."
   ]
  ],
  "example": "A conference room port is configured for 802.1X with MAB fallback and multi-domain mode. An IP phone authenticates by MAB into the voice domain, an employee laptop behind it uses PEAP and lands in the corporate VLAN, and a visitor's laptop without credentials fails 802.1X, falls back to MAB, and is redirected to the ISE guest portal through Central WebAuth. After the visitor accepts the terms, ISE sends a CoA and the session is reapplied with internet-only access.",
  "mistakes": [
   [
    "The switch checks the user's password itself during 802.1X.",
    "The switch is the authenticator and relays EAP inside RADIUS to ISE, which makes the decision. EAPOL runs between endpoint and switch; RADIUS runs between switch and ISE."
   ],
   [
    "MAB is as secure as 802.1X because ISE approves the device.",
    "MAB uses only the MAC address, which is easy to spoof. Give MAB devices narrow access and use profiling to detect impostors."
   ],
   [
    "Multi-host mode authenticates every device on the port separately.",
    "Multi-host lets the first device authenticate for all. Multi-auth authenticates each device separately, and multi-domain allows one voice and one data device."
   ],
   [
    "Turning on closed mode across campus on day one is the safest rollout.",
    "Closed mode blocks every device that fails, including unknown printers and phones. Start in monitor mode, move to low-impact, then closed."
   ]
  ],
  "tryit": [
   [
    "A hospital ward has wall ports used by nurse workstations with corporate certificates, infusion pumps that have no supplicant, and IP phones with PCs behind them. Security wants strong authentication where possible and no outages for medical devices. How would you configure the ports and roll out?",
    "Configure 802.1X first with MAB fallback, using EAP-TLS for the workstations, MAB with ISE profiling and a narrow authorization policy for the infusion pumps, and multi-domain host mode where phones and PCs share a port. Roll out in monitor mode first to find every device that would fail, fix profiles and endpoint lists, then move to low-impact and finally closed mode."
   ],
   [
    "A port in closed mode shows a device authorized through MAB as a printer, but ISE profiling now reports it sending traffic typical of a laptop browsing the web. What is likely happening and what should ISE do?",
    "Someone has probably spoofed the printer's MAC address on a laptop. ISE can change the endpoint's profile and issue a CoA to reauthorize the session into a restricted or quarantine policy, and the team should investigate the port and device."
   ]
  ],
  "tip": "Know the three 802.1X roles: supplicant, authenticator, authentication server. EAPOL runs between endpoint and switch; RADIUS runs between switch and ISE. MAB is for devices with no supplicant and is weak because MACs can be spoofed. CWA uses MAB, a redirect and then CoA.",
  "check": [
   [
    "What traffic does an 802.1X port allow before authentication?",
    "Only EAPOL in closed mode; in low-impact mode, also limited traffic defined by a pre-authentication ACL."
   ],
   [
    "Which host mode supports an IP phone with a PC connected behind it?",
    "Multi-domain authentication, which allows one voice device and one data device."
   ],
   [
    "Why is MAB considered weak?",
    "MAC addresses can be easily spoofed, so MAB devices should get restricted access and be verified with profiling."
   ],
   [
    "What does ISE send to the switch after a guest logs in through Central WebAuth?",
    "A RADIUS change of authorization (CoA), so the switch reapplies the session with guest access."
   ]
  ]
 },
 {
  "t": "Layer 2 protections: DHCP snooping, dynamic ARP inspection, IP source guard",
  "hook": "It is Monday morning at Ridgeview Medical Group and the help desk queue is filling fast. Nurses on the third floor can reach each other's computers but not the patient records system. Tomas, the network engineer on duty, runs `ipconfig` on one workstation and sees an address in 192.168.1.0/24, a range the clinic has never used, with a default gateway he does not recognize. Somewhere on that floor, a device is answering DHCP requests faster than the real server. Ten minutes later a security analyst asks a sharper question: if a rogue device can become everyone's gateway, could another one quietly read their traffic through forged ARP replies? Tomas has three switch features available. Which one stops which attack, and in what order must he turn them on?",
  "simple": "When a computer joins a network, it shouts \"Who can give me an address?\" and trusts whoever answers first. It also asks \"Who has this address?\" to find neighbors and trusts any reply. Nobody checks identity, so a troublemaker can answer with lies. Cisco switches can act like a careful receptionist. DHCP snooping lets only the approved address server answer and writes down who received which address. Dynamic ARP inspection checks every \"I have that address\" reply against that written list. IP source guard checks that each device only sends traffic using the address it was given. It is like a hotel front desk that hands out room keys, keeps a guest list, and then lets the elevator open only for the floor on your key.",
  "body": [
   "Layer 2 protocols such as DHCP (Dynamic Host Configuration Protocol) and ARP (Address Resolution Protocol) were designed for trusted networks and have no authentication. Any device on an access port can send DHCP server messages or ARP replies, and other hosts will believe them. An attacker can exploit that in three common ways. A rogue DHCP server can hand out itself as the default gateway so client traffic flows through it. ARP spoofing, also called ARP poisoning, sends forged replies that map the gateway's IP address to the attacker's MAC address, creating a man-in-the-middle position. IP spoofing makes an attacker's packets appear to come from another host's address. Cisco switches provide three features that build on each other to stop these attacks, and ENCOR expects you to know what each one checks and how they depend on each other.",
   "DHCP snooping is the foundation and acts as a firewall for DHCP. You enable it globally and per VLAN, then mark ports as trusted or untrusted. Trusted ports are uplinks toward legitimate DHCP servers or relay agents; every other port is untrusted by default once snooping is on. On untrusted ports the switch drops DHCP server messages, such as DHCPOFFER and DHCPACK, so a home router plugged into a user port cannot answer clients. The switch can also rate-limit DHCP messages on untrusted ports, which stops starvation attacks in which a tool sends a flood of DISCOVER messages with fake MAC addresses to exhaust the address pool. If the rate is exceeded, the port is placed in the err-disabled state and a log message names it.",
   "The most important by-product of DHCP snooping is the binding table. As clients successfully obtain leases through the switch, it records each client's MAC address, IP address, VLAN, port and lease time. This table is the switch's trusted record of who should be using which address on which port, and it is what the other two features rely on. You can view it with `show ip dhcp snooping binding`. A typical configuration looks like this:",
   "```\nip dhcp snooping\nip dhcp snooping vlan 10,20\ninterface GigabitEthernet1/0/48\n ip dhcp snooping trust\ninterface range GigabitEthernet1/0/1 - 24\n ip dhcp snooping limit rate 15\n```",
   "Dynamic ARP inspection (DAI) validates ARP packets on untrusted ports. For each ARP request or reply, the switch compares the sender's IP-to-MAC pairing with the DHCP snooping binding table and drops packets that do not match, which blocks ARP spoofing and poisoning before the forged mapping ever reaches the victim's ARP cache. Devices with static addresses, such as printers or servers, never appear in the binding table because they never used DHCP, so you must permit them with ARP ACLs applied to the VLAN; otherwise DAI drops their legitimate ARP traffic. Uplinks between switches are usually marked trusted with `ip arp inspection trust` so that ARP traffic already inspected by a neighbor is not checked again against a table that does not contain those hosts. You enable DAI per VLAN with `ip arp inspection vlan 10,20`. Optional validation, configured with `ip arp inspection validate src-mac dst-mac ip`, adds checks that the MAC and IP addresses in the ARP body are consistent with the Ethernet header and are not invalid values. DAI also rate-limits ARP packets on untrusted ports, and a port that exceeds the limit can be err-disabled.",
   "IP source guard (IPSG) closes the last gap by filtering ordinary IP traffic on untrusted access ports. With `ip verify source` on an interface, the switch installs a per-port filter that permits only traffic whose source IP address matches a binding for that port, taken from the DHCP snooping table or from static bindings you configure. With `ip verify source port-security`, it checks both the source IP and the source MAC address. Everything else is dropped in hardware, so a host that manually changes its address to impersonate a neighbor or a server simply stops being able to send. IPSG is typically applied only on access ports facing end hosts, not on trunks.",
   "The dependency chain is the single most testable point. DAI and IP source guard both need the DHCP snooping binding table, so DHCP snooping must be enabled on the relevant VLANs first. If snooping is off, DAI has nothing to compare against and drops ARP from DHCP clients, and IPSG has no bindings to permit, so hosts lose connectivity. Turning the features on in the wrong order in production is a classic way to cause an outage.",
   "A few troubleshooting patterns appear again and again in labs and exam scenarios. If clients stop getting addresses right after you enable snooping, check first that the uplink toward the DHCP server or relay is marked trusted. The second common cause is option 82, the relay agent information option: by default the switch inserts it into client requests, and some servers or upstream relays reject packets that carry option 82 with a zero gateway address. The fix, where appropriate, is `no ip dhcp snooping information option`. Verify the features with `show ip dhcp snooping`, `show ip dhcp snooping binding`, `show ip arp inspection` and `show ip verify source`. Violations appear in the log, for example a DAI message reporting an invalid ARP on a specific port and VLAN, which gives you the exact location of the offending device.",
   "Together the three features turn an access layer that trusts everyone into one that knows which address belongs on which port. They are local switch features, so they complement rather than replace identity-based controls such as 802.1X, and they matter most where end users can plug in devices you do not control."
  ],
  "analogy": "Think of a hotel. DHCP snooping is the front desk: only staff behind the desk may hand out room keys, and the desk keeps a register of which guest has which room. Dynamic ARP inspection is a hallway guard who checks anyone claiming \"I am room 214\" against the register. IP source guard is the elevator that only goes to the floor on your key. The analogy stops where static devices come in: a printer with a fixed address never visited the desk, so you must add it by hand with an ARP ACL or static binding.",
  "mnemonic": "Snoop first, then the rest read the list: Snooping Builds the binding table; ARP inspection and source Guard only read it. If you remember that the binding table is built before it is read, you will enable DHCP snooping before DAI and IPSG.",
  "terms": [
   [
    "DHCP snooping",
    "Blocks DHCP server messages on untrusted ports, can rate-limit DHCP on them, and builds a binding table of legitimate leases."
   ],
   [
    "Binding table",
    "The DHCP snooping record of MAC address, IP address, VLAN, port and lease time for each client lease."
   ],
   [
    "Dynamic ARP inspection (DAI)",
    "Drops ARP packets on untrusted ports whose IP-to-MAC mapping does not match the binding table or an ARP ACL."
   ],
   [
    "IP source guard (IPSG)",
    "Filters traffic on access ports so only source IP addresses (and optionally MAC addresses) matching the port's binding are allowed."
   ],
   [
    "Trusted port",
    "A port, usually an uplink or server-facing port, exempt from DHCP snooping and DAI checks."
   ],
   [
    "ARP ACL",
    "A list of permitted IP-to-MAC pairs used by DAI for hosts with static addresses that are not in the binding table."
   ],
   [
    "Option 82",
    "The DHCP relay agent information option that a snooping switch inserts by default; some servers reject it."
   ]
  ],
  "example": "A user plugs a home router into an office port and its DHCP server starts handing out 192.168.1.x addresses. With DHCP snooping enabled, the switch drops its offers on the untrusted port, and clients keep receiving correct leases from the real server through the trusted uplink. Later, a tool on another machine sends forged ARP replies claiming the gateway's IP address. DAI drops them because the MAC address does not match the binding table, and a log message identifies the port and VLAN so the engineer can find the machine.",
  "mistakes": [
   [
    "Enabling DAI or IP source guard first and adding DHCP snooping later.",
    "Both features read the DHCP snooping binding table. Without it, legitimate DHCP clients have no bindings, so their ARP and IP traffic is dropped. Enable snooping on the VLANs first and confirm bindings exist."
   ],
   [
    "Assuming DHCP snooping drops all DHCP traffic on untrusted ports.",
    "Only server messages, such as offers and acknowledgments, are dropped on untrusted ports. Client messages such as DISCOVER and REQUEST are allowed, subject to the rate limit, so clients can still obtain leases."
   ],
   [
    "Forgetting about hosts with static IP addresses.",
    "Printers and servers with static addresses are not in the binding table. DAI needs an ARP ACL for them and IPSG needs a static binding, or their traffic is dropped."
   ],
   [
    "Choosing port security as the answer to ARP poisoning.",
    "Port security limits which or how many MAC addresses may use a port; it does not check IP-to-MAC claims inside ARP packets. Dynamic ARP inspection is the feature that stops ARP spoofing."
   ]
  ],
  "tryit": [
   [
    "You enable `ip dhcp snooping` and `ip dhcp snooping vlan 30` on an access switch. Within minutes, every client in VLAN 30 fails to renew its lease, while VLAN 40, which is not snooped, works normally. The DHCP server sits two hops away in the data center and the switch has a single uplink, Gi1/0/48. What is the most likely cause and the first fix?",
    "The uplink toward the DHCP server is still untrusted, so the switch drops the server's offers and acknowledgments arriving on it. Configure `ip dhcp snooping trust` on Gi1/0/48. If clients still fail, check whether the server or relay is rejecting the option 82 information the switch inserts."
   ],
   [
    "A security review finds that one workstation in VLAN 10 changed its IP address manually to match the payroll server's address. DHCP snooping and DAI are already enabled on VLAN 10. Which additional feature would have stopped that host from sending traffic with the spoofed address, and where should it be applied?",
    "IP source guard, configured with `ip verify source` (or `ip verify source port-security` to check MAC addresses too) on the untrusted access ports. It permits only source addresses that match the port's binding, so the spoofed source is dropped. DAI alone checks ARP packets, not ordinary IP traffic."
   ]
  ],
  "tip": "DHCP snooping comes first because DAI and IP source guard both use its binding table. Mark uplinks toward DHCP servers and other switches as trusted, or DHCP and ARP will break. Snooping stops rogue DHCP servers, DAI stops ARP spoofing, IPSG stops IP spoofing.",
  "check": [
   [
    "What happens to a DHCP offer received on an untrusted port with DHCP snooping enabled?",
    "The switch drops it, because DHCP server messages are allowed only on trusted ports."
   ],
   [
    "Which feature stops ARP poisoning, and what does it check against?",
    "Dynamic ARP inspection, which validates ARP IP-to-MAC pairs against the DHCP snooping binding table, or against ARP ACLs for static hosts."
   ],
   [
    "Why must DHCP snooping be enabled before IP source guard?",
    "IP source guard permits traffic based on bindings from the DHCP snooping table (or static bindings); without that table, legitimate DHCP clients would be blocked."
   ]
  ]
 },
 {
  "t": "Python basics: variables, loops, functions, dictionaries, the requests library",
  "hook": "It is Thursday afternoon at Pinecrest School District and Aisha, the only network engineer for fourteen schools, has a deadline. The superintendent wants a list of every switch still running an old software image before Friday's board meeting. Logging into 180 switches one by one would take the rest of the week. A colleague emails her a twenty-line Python script that supposedly asks the controller for the whole inventory in seconds, but it is full of square brackets, colons and indented blocks she has never read closely. Before she runs anything against production, she needs to know what each line does and what it will print. Can she read this script well enough to trust it?",
  "simple": "Python is a programming language that reads almost like plain English, which is why network engineers use it to automate boring, repetitive jobs. A variable is a labeled box that holds a value, such as a switch name. A list is a numbered row of boxes, and the numbering starts at zero. A dictionary is like a contact card: each piece of information has a label, such as \"hostname\" or \"ip\", and you look things up by the label. A loop repeats the same steps for every item, such as every switch in a list. A function is a recipe you write once and use many times. The requests library lets Python visit a web address and bring back the answer, the same way your browser does, so a script can ask a controller for data.",
  "body": [
   "Python is the most common language for network automation because it is readable, runs on every major operating system, and has mature libraries for SSH, NETCONF (Network Configuration Protocol) and REST (representational state transfer) APIs (application programming interfaces). ENCOR does not expect you to be a developer, but it does expect you to read a short script and predict what it does, especially one that calls a REST API and pulls values out of the response. Treat this lesson as learning to read, not to write from scratch.",
   "Variables hold values and do not need declared types; Python works out the type from the value you assign. Common types are strings (`hostname = \"R1\"`), integers (`vlan = 10`), floats (`cpu = 12.5`), booleans (`True` and `False`, capitalized), lists and dictionaries. A list is an ordered collection in square brackets, such as `vlans = [10, 20, 30]`. Lists are indexed from 0, so `vlans[0]` is 10 and `vlans[2]` is 30, and asking for `vlans[3]` raises an `IndexError`. Indentation is part of the syntax rather than decoration: the lines inside a loop, function or `if` statement must be indented consistently, usually by four spaces, and a line that is indented differently either ends the block or causes an `IndentationError`.",
   "A dictionary stores key-value pairs in curly braces and is how Python represents JSON (JavaScript Object Notation) objects, which is why it matters so much for API work. You read a value by putting its key in square brackets, and you can nest dictionaries and lists inside each other. Reading nested data is a chain of lookups from left to right: a key for a dictionary, a number for a list.",
   "```python\ndevice = {\"hostname\": \"SW1\", \"ip\": \"10.0.0.11\", \"vlans\": [10, 20]}\nprint(device[\"hostname\"])      # SW1\nprint(device[\"vlans\"][1])      # 20\ndevice[\"site\"] = \"Branch-5\"     # add a key\nprint(device.get(\"model\", \"unknown\"))  # unknown\n```",
   "Notice the last line. Asking for a key that does not exist with square brackets raises a `KeyError` and stops the script, while the `get()` method returns a default value you choose instead. Scripts that handle real API data, where some devices may be missing a field, often use `get()` for that reason. With data access covered, the next building blocks are loops, conditions and functions, which control what the script does with that data. A `for` loop iterates over each item in a list, or over the keys of a dictionary; a `while` loop repeats as long as a condition stays true. Conditions use `if`, `elif` and `else`, and comparisons use `==` for equal and `!=` for not equal. Functions package reusable logic: you define one with `def`, give it parameters, and use `return` to hand a result back to the caller. Read the following example carefully and predict the output before checking the comments.",
   "```python\ndef describe(dev):\n    return dev[\"hostname\"] + \" at \" + dev[\"ip\"]\n\ninventory = [{\"hostname\": \"R1\", \"ip\": \"10.0.0.1\"},\n             {\"hostname\": \"R2\", \"ip\": \"10.0.0.2\"}]\nfor dev in inventory:\n    if dev[\"hostname\"] != \"R2\":\n        print(describe(dev))    # R1 at 10.0.0.1\nfor key, value in inventory[0].items():\n    print(key, value)\n```",
   "The inventory is a list of dictionaries, the same shape most controller APIs return. The first loop visits each dictionary, skips R2 and prints only the R1 line. The second loop uses `items()` to walk through the key-value pairs of the first device, printing `hostname R1` and then `ip 10.0.0.1`.",
   "The `requests` library makes HTTP calls simple, and it is the library ENCOR examples use. `requests.get(url, headers=..., auth=..., verify=...)` sends a GET request; `requests.post(url, json=payload)` sends a POST with a JSON body built from a Python dictionary. The returned response object has `status_code` (such as 200), `text` (the raw body as a string), `json()` (the body parsed into Python dictionaries and lists) and `headers`. Calling `raise_for_status()` raises an exception for 4xx and 5xx codes so the script does not carry on with bad data. In the example below, the username and password come from environment variables rather than being hard-coded, and `verify` points to a CA (certificate authority) certificate file so the server's identity is checked instead of being skipped.",
   "```python\nimport os, requests\nBASE = os.environ[\"DEVICE_URL\"]  # the device's HTTPS address\nuser, password = os.environ[\"API_USER\"], os.environ[\"API_PASS\"]\nurl = BASE + \"/restconf/data/ietf-interfaces:interfaces\"\nheaders = {\"Accept\": \"application/yang-data+json\"}\nresp = requests.get(url, headers=headers, auth=(user, password), verify=\"ca.pem\")\nif resp.status_code == 200:\n    for intf in resp.json()[\"ietf-interfaces:interfaces\"][\"interface\"]:\n        print(intf[\"name\"], intf[\"enabled\"])\n```",
   "Reading this script is a good exam-style exercise. It builds a RESTCONF URL, asks for JSON with the `Accept` header, sends a GET with basic credentials, and only if the call returned 200 does it parse the body. It then reads the outer key `ietf-interfaces:interfaces`, takes the `interface` list inside it, and loops over each interface dictionary to print its name and enabled state. When an exam question shows code like this, trace the data shape step by step rather than guessing from the variable names."
  ],
  "analogy": "Think of a dictionary as a filing cabinet with labeled drawers and a list as a numbered stack of folders inside one drawer. `resp.json()[\"devices\"][0][\"hostname\"]` means: open the drawer labeled devices, take the top folder, numbered 0, and read the line labeled hostname. The analogy breaks a little because real cabinets do not care about order, while Python lists do, and the first folder is always number 0, not 1.",
  "terms": [
   [
    "Variable",
    "A name bound to a value; Python infers its type from the value assigned."
   ],
   [
    "List",
    "An ordered, zero-indexed collection written in square brackets."
   ],
   [
    "Dictionary",
    "A collection of key-value pairs written in braces, equivalent to a JSON object."
   ],
   [
    "Function",
    "A reusable block defined with def that takes parameters and can return a value."
   ],
   [
    "for loop",
    "A loop that runs its indented block once for each item in a list or dictionary."
   ],
   [
    "requests",
    "A Python library for sending HTTP requests and handling responses through attributes such as status_code and the json() method."
   ]
  ],
  "example": "An engineer needs to know which of 50 switches run an outdated image. A short script loops over a list of device dictionaries, calls the controller's REST API for each with requests.get, checks that status_code is 200, reads the software version from resp.json(), and prints the hostnames whose version does not match the approved standard. The whole check takes under a minute and can be rerun before every change window.",
  "mistakes": [
   [
    "Treating the first element of a list as index 1.",
    "Python lists start at 0. In vlans = [10, 20, 30], vlans[1] is 20, not 10, and vlans[3] raises an IndexError."
   ],
   [
    "Thinking response.text and response.json() are the same thing.",
    "text is the raw body as one string; json() parses that string into dictionaries and lists so you can index into it with keys and numbers."
   ],
   [
    "Assuming a dictionary lookup on a missing key just returns nothing.",
    "Square-bracket lookup on a missing key raises a KeyError. Use dict.get(key, default) when a key might be absent."
   ],
   [
    "Ignoring indentation when reading code.",
    "Indentation defines which lines belong to a loop, function or if block. A print statement indented under an if runs only when the condition is true; the same line unindented runs every time."
   ]
  ],
  "tryit": [
   [
    "A colleague's script contains `data = {\"site\": \"HQ\", \"switches\": [{\"name\": \"A1\", \"ports\": 48}, {\"name\": \"A2\", \"ports\": 24}]}` followed by `for s in data[\"switches\"]:` and an indented `if s[\"ports\"] > 24: print(s[\"name\"])`. Before running it, your manager asks exactly what it will print. What do you tell them?",
    "It prints only A1. The loop visits each dictionary in the switches list; A1 has 48 ports, which is greater than 24, so its name prints, while A2 has exactly 24, which fails the greater-than test."
   ],
   [
    "Your script calls `requests.get()` against a controller and then immediately does `resp.json()[\"response\"]`. Today it crashes with an error about a missing key, and the controller's admin says your account password was changed overnight. What should the script have checked first, and how?",
    "It should check the status code before parsing the body, for example with `if resp.status_code == 200:` or `resp.raise_for_status()`. The call most likely returned 401 with an error body that has no response key, so indexing it failed."
   ]
  ],
  "tip": "Know how to index nested data: resp.json()['key'][0]['name'] means dictionary key, then first list element, then another key. List indexes start at 0. response.json() parses the body; response.status_code gives the HTTP code. Trace the data shape line by line before choosing an answer.",
  "check": [
   [
    "Given data = {'vlans': [10, 20, 30]}, what does data['vlans'][2] return?",
    "30, because list indexes start at 0."
   ],
   [
    "Which requests attribute tells you whether an API call succeeded?",
    "status_code, for example 200 for success (or call raise_for_status to raise an exception on 4xx and 5xx errors)."
   ],
   [
    "What does resp.json() return?",
    "The response body parsed from JSON into Python dictionaries and lists."
   ],
   [
    "What is the difference between device['model'] and device.get('model', 'unknown') when the key is missing?",
    "The first raises a KeyError; the second returns the default value 'unknown'."
   ]
  ]
 },
 {
  "t": "JSON syntax and parsing JSON in Python",
  "hook": "It is 6:40 p.m. at Lakeshore Logistics and Devon's change window opens in twenty minutes. His script is supposed to send one small payload to the controller to add a new VLAN at the Toledo warehouse. Every time he runs it, the controller answers 400 Bad Request and nothing else. The URL is right, the token is fresh, and the payload looks fine on screen: a couple of keys, a number, a true flag. His teammate leans over, squints at the terminal and says, \"That is not JSON. That only looks like JSON.\" Devon has twenty minutes to find out what the difference is, and what rule he broke that the controller refuses to forgive.",
  "simple": "JSON is a simple, agreed way of writing data as text so that two programs can swap information without confusion. It has only a few building blocks. Curly braces hold labeled values, like a form with fields: the label goes in double quotes, then a colon, then the value. Square brackets hold an ordered list of values. Values can be text in double quotes, plain numbers, true or false in lowercase, null meaning empty, or another set of braces or brackets. Programs are strict readers: one wrong quote mark or one extra comma and the whole message is rejected. Python has a built-in tool, the json module, that turns this text into Python data you can work with, and turns Python data back into text. Think of it as a shipping label format that every courier agrees to read the same way.",
  "body": [
   "JSON (JavaScript Object Notation) is the most common data format for REST (representational state transfer) APIs (application programming interfaces), including RESTCONF, Catalyst Center and SD-WAN Manager. It is plain text, easy for people to read and easy for programs to parse, which is why nearly every modern network controller speaks it. ENCOR questions often show a JSON snippet and ask either whether it is valid or how to extract a particular value from it, so you need to be fluent in both the syntax rules and the Python code that reads them.",
   "JSON has a small set of rules, and the exam tests them precisely. An object is an unordered set of key-value pairs inside curly braces `{}`. Keys must be strings in double quotes, each followed by a colon and a value, and pairs are separated by commas. An array is an ordered list of values inside square brackets `[]`, also separated by commas. A value can be a string (always in double quotes, never single), a number (no quotes, such as 10 or 1.5), a boolean (`true` or `false`, all lowercase), `null`, an object or an array. Because objects and arrays are themselves values, they can nest inside each other to any depth. The document below describes a switch with two interfaces and uses every value type.",
   "```json\n{\n  \"hostname\": \"core-sw1\",\n  \"managed\": true,\n  \"uptimeDays\": 142,\n  \"interfaces\": [\n    {\"name\": \"Gi1/0/1\", \"vlan\": 10, \"status\": \"up\"},\n    {\"name\": \"Gi1/0/2\", \"vlan\": null, \"status\": \"down\"}\n  ]\n}\n```",
   "Reading that document from the outside in is good practice. The outer braces make it an object with four keys. `hostname` holds a string, `managed` a boolean, `uptimeDays` a number and `interfaces` an array. Each element of that array is another object with three keys, and the second interface's `vlan` is `null`, meaning no value. Notice that `142` and `10` have no quotes; if they were written as `\"142\"`, they would be strings, which is still valid JSON but a different type, and an API expecting a number might reject it.",
   "Exam questions build invalid examples out of a predictable list of mistakes. Watch for single quotes around strings or keys, a trailing comma after the last item in an object or array, a missing comma between two pairs, unquoted keys, comments (JSON has no comment syntax at all), and Python-style `True`, `False` or `None` instead of `true`, `false` and `null`. Whitespace, line breaks and indentation, on the other hand, do not affect validity; the whole document could sit on one line and still be correct. When a controller rejects a request body with 400 Bad Request, one of these errors is often the reason, and a JSON validator or `json.loads` will point to the line and column where parsing failed.",
   "Python's built-in `json` module converts between JSON text and Python objects, and the function names follow a simple pattern. `json.loads(text)` parses a JSON string into Python data; the trailing s stands for string. `json.load(file)` does the same from an open file object. In the other direction, `json.dumps(obj, indent=2)` turns Python data into a JSON string, with `indent` making it readable, and `json.dump(obj, file)` writes it into a file. The type mapping is just as important: an object becomes a dict, an array a list, a string a str, a number an int or float, `true` and `false` become `True` and `False`, and `null` becomes `None`.",
   "```python\nimport json\ndata = json.loads(raw_text)  # raw_text holds the JSON document above as a string\nprint(data[\"hostname\"])                 # core-sw1\nprint(data[\"interfaces\"][1][\"status\"])   # down\nup = [i[\"name\"] for i in data[\"interfaces\"] if i[\"status\"] == \"up\"]\nprint(up)                               # ['Gi1/0/1']\nprint(json.dumps({\"vlan\": 10, \"active\": True}))  # {\"vlan\": 10, \"active\": true}\n```",
   "Walk through that code line by line. After `json.loads`, `data` is an ordinary Python dictionary, so `data[\"hostname\"]` returns the string. `data[\"interfaces\"]` is a list, `[1]` picks its second element, and `[\"status\"]` reads a key from that dictionary. The list comprehension loops over every interface and keeps only the names whose status is up. The last line shows the reverse trip: Python's `True` is written out as JSON's lowercase `true`, which is exactly why building payloads with `json.dumps` is safer than typing JSON strings by hand.",
   "When you use the requests library, `response.json()` performs the `json.loads` step for you, and passing a dictionary with the `json=` parameter of `requests.post` performs the `json.dumps` step and sets the `Content-Type: application/json` header. To navigate nested data in a response, read from the outside in: find the key of the outer object, notice whether its value is a list (use an index or a loop) or another object (use a key), and repeat until you reach the value you need. If you ask for a key that does not exist, Python raises a `KeyError`, while `dict.get()` returns a default instead, which is useful when some devices in a response lack an optional field."
  ],
  "analogy": "JSON is like a strict customs form. Every field label must be printed in the official way (double quotes), every box is separated from the next by a line (comma), and nothing is allowed after the last box. A customs officer does not guess what you meant: one handwritten note in the margin, which is like a comment, gets the whole form sent back. Python's json module is the clerk who copies the form into the office filing system and back again. The analogy stops at whitespace: JSON, unlike a picky clerk, does not care how neatly you space or indent it.",
  "terms": [
   [
    "JSON object",
    "Key-value pairs in curly braces with double-quoted string keys; maps to a Python dict."
   ],
   [
    "JSON array",
    "An ordered list of values in square brackets; maps to a Python list."
   ],
   [
    "json.loads",
    "Parses a JSON string into Python objects; json.load reads from a file instead."
   ],
   [
    "json.dumps",
    "Serializes Python objects into a JSON string; json.dump writes to a file instead."
   ],
   [
    "null",
    "JSON's empty value, which becomes None in Python."
   ],
   [
    "Trailing comma",
    "A comma after the last item in an object or array; allowed in Python but invalid in JSON."
   ]
  ],
  "example": "A script that builds a JSON payload for a controller fails with a 400 Bad Request. Printing the payload shows the engineer built the string by hand with single quotes and a trailing comma. Replacing it with a Python dictionary passed through json.dumps (or requests' json= parameter) produces valid JSON and the call succeeds.",
  "mistakes": [
   [
    "Accepting {'name': 'R1'} as valid JSON because it works in Python.",
    "That is a valid Python dictionary but invalid JSON. JSON requires double quotes around every key and every string value."
   ],
   [
    "Writing True, False or None in a JSON document.",
    "Those are Python spellings. JSON uses lowercase true and false, and null for an empty value. json.dumps converts them for you."
   ],
   [
    "Mixing up loads and load, or dumps and dump.",
    "The s versions work with strings; the versions without s work with file objects. json.loads(text) parses a string, json.load(f) parses an open file."
   ],
   [
    "Thinking indentation or line breaks can make JSON invalid.",
    "Whitespace is ignored by JSON parsers. Validity depends on quotes, commas, brackets and value spellings, not layout."
   ]
  ],
  "tryit": [
   [
    "A teammate pastes this payload into a ticket: {\"vlanId\": 30, \"name\": \"VOICE\", \"enabled\": True, \"ports\": [\"Gi1/0/5\", \"Gi1/0/6\",]}. The controller returns 400 Bad Request. Before you change anything else, which parts of the payload would you fix, and why?",
    "Two problems. True must be lowercase true in JSON, and the trailing comma after \"Gi1/0/6\" must be removed. Everything else is valid: keys and strings are double-quoted and 30 is an unquoted number. Building the payload as a Python dict and sending it with json= would avoid both errors."
   ],
   [
    "Your script receives {\"response\": [{\"hostname\": \"edge-1\", \"tags\": [\"branch\", \"retail\"]}]} from an API and you need the word retail. Which Python expression returns it after data = resp.json()?",
    "data[\"response\"][0][\"tags\"][1]. The outer object's response key holds a list, index 0 picks the first device dictionary, tags is a list, and index 1 is its second element."
   ]
  ],
  "tip": "Valid JSON uses double quotes only, lowercase true, false and null, and no trailing commas or comments. loads and dumps work with strings; load and dump work with files. Object becomes dict, array becomes list, null becomes None.",
  "check": [
   [
    "Is {'name': 'R1'} valid JSON?",
    "No; JSON strings and keys must use double quotes."
   ],
   [
    "What Python type does a JSON array become after json.loads?",
    "A list."
   ],
   [
    "Given the example document, how do you get the vlan of the first interface?",
    "data['interfaces'][0]['vlan'], which returns 10."
   ],
   [
    "What does json.dumps({'up': None}) produce?",
    "The string {\"up\": null}, because Python None is written as JSON null."
   ]
  ]
 },
 {
  "t": "YANG data models and how NETCONF and RESTCONF use them",
  "hook": "At Bayview Credit Union, Priya inherited a script that sets interface descriptions on 60 branch routers by sending CLI commands over SSH and then scraping the text output to confirm the change. After a software upgrade, one line of output moved, the scraper misread it, and the script reported success on routers it had never touched. Her manager wants a version that cannot be fooled by a reformatted screen. A colleague says the answer is to stop talking to the CLI at all and talk to the model instead, through NETCONF or RESTCONF. Priya nods, then quietly wonders what a model actually is, and how a URL can point to a single description on a single interface.",
  "simple": "A YANG model is a blueprint that describes what settings a network device has and what each one is allowed to hold, much like a paper form that says \"Name: text\" and \"Age: a number from 0 to 120\". The blueprint holds no actual settings itself; it just defines the shape. Because a program and the device both agree on the blueprint, the program can say \"set the description on this interface to Lobby\" and both sides know exactly which box is being filled in. NETCONF and RESTCONF are two different delivery services that carry the filled-in data back and forth. NETCONF writes it in a format called XML and travels over SSH, a secure remote login channel. RESTCONF writes it in JSON or XML and travels over HTTPS, the secure web protocol.",
  "body": [
   "YANG (Yet Another Next Generation, defined in RFC 7950) is a data modeling language. A YANG model does not hold configuration itself. Instead, it defines the structure, names, data types and constraints of configuration and operational data, much like a database schema. Because every tool agrees on the model, a script can set an interface description through NETCONF (Network Configuration Protocol) or RESTCONF and know exactly which field it is changing and which values are valid, without screen-scraping CLI (command-line interface) text that may change between software releases. That shift, from parsing human-oriented output to exchanging structured data, is the core reason model-driven programmability exists.",
   "YANG models are built from a few node types, and ENCOR expects you to recognize each one. A container groups related nodes and has no value itself, like a folder. A leaf holds a single value of a defined type, such as a string, integer, boolean or enumeration. A leaf-list holds multiple values of one type, such as a list of DNS (Domain Name System) server addresses. A list holds multiple entries of a set of nodes, and each entry is identified by a key leaf, such as a list of interfaces keyed by name. Beyond the node types, models also define reusable types with `typedef`, reusable groups of nodes with `grouping` and `uses`, constraints such as numeric ranges and string patterns, and whether data is configuration (`config true`) that you can write, or state (`config false`), the read-only operational data such as counters and oper-status.",
   "```\ncontainer interfaces {\n  list interface {\n    key \"name\";\n    leaf name { type string; }\n    leaf description { type string; }\n    leaf enabled { type boolean; default true; }\n  }\n}\n```",
   "Read the snippet the way a tool would. `interfaces` is a container, so it only groups things. Inside it, `interface` is a list, and the statement `key \"name\"` means every entry is uniquely identified by its name leaf, so there can be one GigabitEthernet1 and one GigabitEthernet2 but never two entries with the same name. Each entry has three leaves: a string name, a string description, and a boolean enabled flag that defaults to true if you do not set it. If a script tried to set enabled to the word maybe, the device would reject it, because the model declares a boolean. That built-in validation is a big part of why model-driven changes are safer than pushing raw CLI lines.",
   "Several families of models exist, and the trade-off between them is a common exam point. IETF (Internet Engineering Task Force) models are standards-based and vendor-neutral, such as `ietf-interfaces` and `ietf-ip`. OpenConfig models are written by a group of network operators to be vendor-neutral and operationally focused. Native, or vendor, models such as Cisco's `Cisco-IOS-XE-native` cover every feature the platform supports, including features the standard models do not define. Standard models make scripts portable across vendors; native models give complete coverage on one platform. Devices advertise which models they support, and you can explore them with tools such as pyang, which prints a model as an indented tree, or Cisco's YANG Suite, which lets you browse a model and build requests from it.",
   "NETCONF and RESTCONF are the protocols that carry data defined by YANG, and they differ in transport and encoding. NETCONF encodes data in XML (Extensible Markup Language) inside RPCs (remote procedure calls) over SSH (Secure Shell), conventionally on TCP port 830, and XML namespaces identify which model each element belongs to. When a NETCONF session opens, both sides exchange hello messages listing their capabilities, and the device's capabilities include the models it supports. A NETCONF `get-config` with a subtree filter selects only part of a model, such as one interface, and operations such as `edit-config` change it. NETCONF also has the concept of datastores, such as running and, on some platforms, candidate.",
   "RESTCONF encodes data in JSON or XML over HTTPS, and its URLs mirror the model tree directly. The path is `/restconf/data/` followed by the module name, a colon and the top-level node, then child nodes separated by slashes, with list keys given after an equals sign. For example, `/restconf/data/ietf-interfaces:interfaces/interface=GigabitEthernet1/description` addresses the description leaf of one interface. In a JSON body or response, the top-level key is qualified with the module name, as in `\"ietf-interfaces:interfaces\"`. You select the encoding with the `Accept` and `Content-Type` headers, for example `application/yang-data+json`, and you use HTTP methods such as GET, PUT, PATCH and DELETE to read or change data.",
   "The key idea for ENCOR is the separation of concerns. YANG is the model, describing what the data looks like. XML or JSON is the encoding, describing how the data is written on the wire. NETCONF or RESTCONF is the protocol, describing how the data is transported and which operations are allowed. When an exam question mixes these, for example asking which component defines that a VLAN ID must be an integer, the answer is the YANG model, not the protocol and not the encoding."
  ],
  "analogy": "Think of YANG as the architectural blueprint of a building: it shows that each floor has numbered rooms and each room has exactly one door color, but it contains no furniture. NETCONF and RESTCONF are two moving companies that deliver furniture to the rooms the blueprint defines; one packs everything in XML crates and drives the SSH road, the other can use JSON or XML boxes on the HTTPS road. The analogy stops where operational data comes in: a building blueprint does not describe live readings, but YANG also models read-only state such as counters.",
  "terms": [
   [
    "YANG",
    "A data modeling language (RFC 7950) that defines the structure and types of network configuration and state data."
   ],
   [
    "Container",
    "A YANG node that groups other nodes and holds no value itself."
   ],
   [
    "Leaf",
    "A YANG node holding a single typed value."
   ],
   [
    "Leaf-list",
    "A YANG node holding several values of the same type, such as multiple DNS servers."
   ],
   [
    "List",
    "A YANG node with multiple entries, each identified by a key leaf."
   ],
   [
    "Native model",
    "A vendor-specific YANG model covering all platform features, such as Cisco-IOS-XE-native."
   ],
   [
    "config false",
    "Marks YANG nodes as read-only operational state rather than writable configuration."
   ]
  ],
  "example": "An engineer wants to disable an interface through RESTCONF. Looking at the ietf-interfaces tree in pyang, she sees interfaces is a container, interface is a list keyed by name, and enabled is a boolean leaf. She sends a PATCH to /restconf/data/ietf-interfaces:interfaces/interface=GigabitEthernet2 with the JSON body setting enabled to false.",
  "mistakes": [
   [
    "Thinking a YANG model stores the device's configuration.",
    "YANG only defines the structure, types and constraints. The configuration lives in the device's datastores; YANG describes its shape."
   ],
   [
    "Saying NETCONF uses JSON over HTTPS and RESTCONF uses XML over SSH.",
    "The pairings are reversed. NETCONF uses XML over SSH, and RESTCONF uses JSON or XML over HTTPS."
   ],
   [
    "Confusing a list with a leaf-list.",
    "A leaf-list is several values of one simple type. A list is several entries, each containing its own set of nodes and identified by a key leaf, such as interfaces keyed by name."
   ],
   [
    "Assuming IETF models are always the best choice.",
    "IETF and OpenConfig models are portable but may not cover every feature. Native models cover everything the platform supports, at the cost of portability."
   ]
  ],
  "tryit": [
   [
    "Your team writes one script to read interface descriptions from Cisco and non-Cisco routers. A colleague suggests building it on Cisco-IOS-XE-native because it has every feature. Another prefers ietf-interfaces. Which model fits this script better, and what is the trade-off?",
    "ietf-interfaces, because it is a vendor-neutral standard model that both vendors can support, so the same paths and structure work everywhere. The trade-off is coverage: if you later need a Cisco-only feature, you would need the native model for that part."
   ],
   [
    "You need to read only the enabled state of GigabitEthernet3 through RESTCONF using the ietf-interfaces model. Write the URL path you would request after the device address.",
    "/restconf/data/ietf-interfaces:interfaces/interface=GigabitEthernet3/enabled. The path follows the model tree: module name and container, then the list with its key after an equals sign, then the leaf."
   ]
  ],
  "tip": "Remember the layers: YANG is the model, XML or JSON is the encoding, NETCONF or RESTCONF is the transport. NETCONF means XML over SSH; RESTCONF means JSON or XML over HTTPS with URLs that follow the model tree. A list needs a key; a container does not.",
  "check": [
   [
    "What is the difference between a leaf and a leaf-list?",
    "A leaf holds one value; a leaf-list holds multiple values of the same type."
   ],
   [
    "How is a specific list entry identified in a RESTCONF URL?",
    "By appending an equals sign and the key value to the list name, for example interface=GigabitEthernet1."
   ],
   [
    "Why might you use a native model instead of an IETF model?",
    "Native models cover every platform feature, including ones the vendor-neutral models do not define."
   ],
   [
    "Where does a NETCONF client learn which YANG models a device supports?",
    "From the capabilities the device sends in its hello message when the session opens."
   ]
  ]
 },
 {
  "t": "REST API methods and response codes (200, 201, 204, 400, 401, 403, 404, 500)",
  "hook": "At Granite Ridge University, Marcus runs a nightly script that creates guest VLANs for weekend events through the campus controller's API. Saturday morning his phone shows three overnight alerts. The first call returned 201. The second, an hour later, returned 401. The third, a cleanup call to delete an old site, returned 403. His teammate texts back, \"Just rerun it with a new password, it is all the same login problem.\" Marcus is not so sure. Three different numbers usually mean three different stories. Before he touches anything, he needs to know which of these codes a fresh token will fix, which one it will not, and what the first one was telling him all along.",
  "simple": "A REST API is a way for one program to ask another program to do things over the web, using a small set of standard verbs. GET means show me something. POST means create something new. PUT means replace this whole thing. PATCH means change just these parts. DELETE means remove it. Every reply comes back with a three-digit number that tells you how it went. Numbers in the 200s mean it worked. Numbers in the 400s mean you, the caller, did something wrong, such as sending a garbled request, not logging in, or asking for something you are not allowed to touch. Numbers in the 500s mean the server itself broke. It is like ordering at a restaurant counter: the receipt tells you whether your order went in, was unclear, or the kitchen had a problem.",
  "body": [
   "REST (representational state transfer) is an architectural style for APIs (application programming interfaces) built on HTTP (Hypertext Transfer Protocol). Resources, such as devices, sites or interfaces, are identified by URLs, and you act on them with standard HTTP methods. The server replies with a status code that tells you what happened, usually alongside a body with data or an error message. REST APIs are stateless: each request carries everything the server needs to process it, including authentication, so the server does not remember earlier requests from the same client. That is why every call in a script includes a token or credentials, not just the first one.",
   "The main methods map to CRUD (create, read, update, delete) operations, and ENCOR expects you to choose the right one for a scenario. GET reads a resource and should not change anything on the server. POST creates a new resource, usually inside a collection such as `/devices`, or triggers an action; the server often assigns the new resource's identifier. PUT creates or replaces a resource at a known URL with the full representation you send, so any fields you omit may be removed or reset. PATCH partially updates a resource, merging only the fields you send and leaving the rest untouched. DELETE removes a resource.",
   "Idempotency is the property that separates these methods in exam questions. A method is idempotent when sending the same request many times has the same effect as sending it once. GET, PUT and DELETE are idempotent: reading twice changes nothing, replacing a resource with the same content twice leaves it in the same state, and deleting something that is already gone leaves it gone. POST is not idempotent, because sending the same create request twice may create two resources. That matters for retries: a script that times out on a PUT can safely resend it, while resending a POST may produce a duplicate. PATCH is not guaranteed to be idempotent by the HTTP standard, although many APIs implement it that way.",
   "A request has four parts. There is the method, the URL (often with query parameters after a `?`, such as `?family=Switches` to filter results), the headers and, for POST, PUT and PATCH, a body. The headers that matter most are `Content-Type`, which declares the format of the body you are sending, for example `application/json`; `Accept`, which says what format you want back; and authentication headers such as `Authorization` or a vendor-specific header like `X-Auth-Token`. A mismatched `Content-Type` is a common reason a correctly built body is rejected.",
   "Status codes come in classes, and the first digit tells you the category. 2xx means success. 200 OK is the general success code with a body, typical for GET. 201 Created means a new resource was created, typical for POST, often with a `Location` header pointing to the new resource's URL. 202 Accepted means the request was accepted for asynchronous processing but is not finished yet; Catalyst Center uses this for long-running tasks. 204 No Content means success with no body, typical for DELETE or some PUT and PATCH calls. 3xx codes are redirects, telling the client to look somewhere else.",
   "4xx codes mean the client did something wrong, and each points to a different fix. 400 Bad Request means the server could not understand the request, often malformed JSON or a missing required field, so fix the body. 401 Unauthorized means authentication is missing, invalid or expired, so get a new token or fix the credentials. 403 Forbidden means the server knows who you are but you are not allowed to perform this action, a permissions or role problem, and re-authenticating with the same account will not help. 404 Not Found means the URL or resource does not exist, often a typo in the path or a wrong identifier. Other client errors you may see include 405 Method Not Allowed, when the resource exists but does not support that method, and 409 Conflict, when the request clashes with the current state, such as creating something that already exists.",
   "5xx codes mean the server failed. 500 Internal Server Error is a generic server-side fault, and 503 Service Unavailable means the service is temporarily unable to handle requests, perhaps because it is overloaded or restarting. With 5xx errors, the request itself may be perfectly valid; the problem lies on the server, so the right response is usually to log it, retry later with a delay, and contact the platform owner if it persists, rather than rewriting the request.",
   "Good scripts turn this knowledge into behavior. They check the status code before using the body, handle 401 by refreshing the token and retrying once, treat 403 as a permissions issue to report rather than retry, and log every 4xx and 5xx response along with the error message the API returns in its body. With the `requests` library, `response.status_code` gives the number, and `response.raise_for_status()` raises an exception for any 4xx or 5xx code so the script does not continue with bad data."
  ],
  "analogy": "Think of a hotel front desk. GET is asking what is in your room, POST is booking a new room, PUT is swapping your whole booking for a new one, PATCH is changing only the checkout date, and DELETE is canceling. The replies match: 201 is a new key card handed over, 401 is the clerk saying they cannot see any ID, 403 is the clerk recognizing you but refusing access to the penthouse, 404 is asking for a room number that does not exist, and 500 is the booking system crashing. The analogy breaks on statelessness: a real clerk remembers you, but a REST server expects your ID with every request.",
  "mnemonic": "For the 4xx codes in order, think \"Bad, Unknown, Forbidden, Found nothing\": 400 Bad Request, 401 you are Unknown (not authenticated), 403 Forbidden (known but not allowed), 404 Not Found.",
  "terms": [
   [
    "CRUD",
    "Create, read, update, delete: the basic operations mapped to POST, GET, PUT or PATCH, and DELETE."
   ],
   [
    "Idempotent",
    "Repeating the request has the same effect as sending it once; true of GET, PUT and DELETE, not of POST."
   ],
   [
    "201 Created",
    "Success status indicating a new resource was created, often with a Location header."
   ],
   [
    "204 No Content",
    "Success status with no response body, common for DELETE."
   ],
   [
    "401 vs 403",
    "401 means not authenticated or token invalid; 403 means authenticated but not permitted."
   ],
   [
    "Content-Type",
    "The header declaring the format of the request or response body, such as application/json."
   ]
  ],
  "example": "A script creating VLANs through a controller API receives 201 for the first call, then 401 an hour later. The token has expired, so the script requests a new token and retries. A later call to delete a site returns 403 because the service account has only the observer role, so the team adjusts the role instead of retrying.",
  "mistakes": [
   [
    "Treating 401 and 403 as the same login problem.",
    "401 means you are not authenticated or your token is invalid or expired, so re-authenticate. 403 means the server knows who you are but you lack permission, so a new token will not help; the role or permissions must change."
   ],
   [
    "Using PUT to change one field.",
    "PUT replaces the whole resource, so fields you leave out may be removed or reset. Use PATCH to change only the fields you send."
   ],
   [
    "Assuming POST is safe to retry blindly.",
    "POST is not idempotent; resending it may create a duplicate resource. GET, PUT and DELETE are idempotent and safe to repeat."
   ],
   [
    "Rewriting a request because it returned 500.",
    "5xx codes point to a server-side fault. The request may be valid; log the error, retry later and involve the platform owner. 400 is the code that tells you to fix the request."
   ]
  ],
  "tryit": [
   [
    "Your script sends a PATCH to update a device's location. It returns 404. A colleague insists the device exists because she can see it in the GUI. The URL in the script ends with /network-device/ followed by the device's hostname. What is the most likely problem and fix?",
    "404 means the URL or resource was not found, so the path is probably wrong. Many APIs identify a device by an ID, not its hostname, in the URL. Look up the device's ID with a GET filtered by hostname and use that ID in the PATCH path."
   ],
   [
    "A DELETE call to remove an old SSID returns 204 with an empty body, and your script then crashes trying to parse the JSON response. Did the delete fail, and how should the script handle it?",
    "The delete succeeded: 204 No Content means success with no body. The script should check the status code first and only call json() when the response is expected to contain a body, such as 200."
   ]
  ],
  "tip": "200 OK, 201 Created, 204 No Content; 400 malformed request, 401 authentication problem, 403 permission problem, 404 wrong URL or resource, 500 server fault. PUT replaces, PATCH merges. GET, PUT and DELETE are idempotent; POST is not.",
  "check": [
   [
    "A POST that creates a new device record succeeds. Which status code is most appropriate?",
    "201 Created."
   ],
   [
    "What is the practical difference between receiving 401 and 403?",
    "401 means you must authenticate or refresh your token; 403 means you are authenticated but lack permission, so retrying with the same identity will not help."
   ],
   [
    "Which method should you use to change one field of a resource without sending the whole object?",
    "PATCH."
   ],
   [
    "Which of GET, POST, PUT and DELETE is not idempotent, and why does it matter?",
    "POST; sending it twice may create two resources, so it is not safe to retry automatically."
   ]
  ]
 },
 {
  "t": "Catalyst Center Intent APIs: token authentication and common calls",
  "hook": "At Northwind Health Partners, the operations manager has a standing request: every morning at 7:30, before the clinics open, someone should check the health of all 42 sites and run a few show commands at any site that looks unwell. For months, Elena on the early shift has done it by hand, clicking through dashboards and copying output into the team chat. Today she wants a script to do it. She knows Catalyst Center already has all the data. What she does not know is how a script proves who it is, which URLs return health and inventory, and why her first attempt to run a show command came back instantly with an ID instead of any output at all.",
  "simple": "Catalyst Center is Cisco's central management system for campus and branch networks. Besides its web screens, it has a programming doorway, the Intent API, that lets a script ask the same questions you would ask by clicking around, such as \"list all my switches\" or \"how healthy is each site\". First the script logs in once with a username and password and receives a temporary pass, called a token. It then shows that pass with every request, like a wristband at an event. When the pass expires, the script asks for a new one. Some jobs, such as running commands on switches, take time, so Catalyst Center replies right away with a ticket number. The script checks back with that ticket number until the job is done, like waiting for your order number at a counter.",
  "body": [
   "Catalyst Center exposes a northbound REST (representational state transfer) API (application programming interface) called the Intent API. It lets scripts and other systems do what you can do in the GUI (graphical user interface): list devices, read health scores, query clients, run commands and provision. It is called intent-based because you describe the outcome you want, such as \"give me the health of all sites\", and Catalyst Center works out how to collect it from the devices. Northbound means the API faces upward toward applications and scripts, as opposed to the southbound protocols Catalyst Center uses to talk to network devices. The API is documented inside the product, in its platform section, and on Cisco's developer site.",
   "Authentication uses a token, and the sequence is short. First, you send a POST request to the authentication endpoint, `/dna/system/api/v1/auth/token`, using HTTP Basic authentication with a Catalyst Center username and password. The response is a JSON (JavaScript Object Notation) object containing a `Token` value, a long string. For every following request, you send that token in the `X-Auth-Token` header rather than sending the password again. The token is valid for a limited time, documented by Cisco as about one hour by default, after which the API returns 401 Unauthorized and your script must request a new token. Note the two different path prefixes: `/dna/system/` for authentication and `/dna/intent/` for the Intent API calls themselves.",
   "```python\nimport os, requests\nfrom requests.auth import HTTPBasicAuth\nBASE = os.environ[\"CC_URL\"]  # Catalyst Center HTTPS address\nuser, password = os.environ[\"CC_USER\"], os.environ[\"CC_PASS\"]\nr = requests.post(BASE + \"/dna/system/api/v1/auth/token\",\n                  auth=HTTPBasicAuth(user, password), verify=\"ca.pem\")\ntoken = r.json()[\"Token\"]\nheaders = {\"X-Auth-Token\": token, \"Content-Type\": \"application/json\"}\ndevs = requests.get(BASE + \"/dna/intent/api/v1/network-device\",\n                    headers=headers, verify=\"ca.pem\").json()\nfor d in devs[\"response\"]:\n    print(d[\"hostname\"], d[\"managementIpAddress\"], d[\"softwareVersion\"])\n```",
   "Read the script as an exam question would expect. It pulls the address and credentials from environment variables so no secrets sit in the code. It posts to the token endpoint with Basic authentication and validates the server certificate against a CA (certificate authority) file. It reads the `Token` key from the JSON response and builds a headers dictionary with `X-Auth-Token`. It then sends a GET to the inventory endpoint, parses the body, and loops over the list under the `response` key, printing each device's hostname, management IP address and software version. If the token had expired between calls, the GET would return 401, and a production script would catch that and authenticate again.",
   "Intent API paths start with `/dna/intent/api/v1/`, and a handful of endpoints come up repeatedly. `network-device` returns the inventory and accepts query parameters to filter by hostname, family or platform; each device record includes an ID that other calls use. `site` returns the site hierarchy of areas, buildings and floors. `network-health` and `site-health` return assurance health scores, and `client-health` and `client-detail` describe client experience. Topology endpoints describe physical and Layer 2 or Layer 3 topology, and interface endpoints describe ports. Most responses wrap their results in a `response` key, so you read `json()[\"response\"]` first and then work with the list or object inside it.",
   "Some operations take time and are handled asynchronously. Running CLI (command-line interface) commands with the command runner (`network-device-poller/cli/read-request`), provisioning a device or deploying a template cannot finish in the time a single HTTP request should take. For these, the API replies immediately, often with 202 Accepted, and returns a `taskId`. You then poll the task endpoint, `/dna/intent/api/v1/task/{taskId}`, every few seconds until it reports completion or an error. For the command runner, the finished task points to a file ID, and you fetch the actual command output from the file endpoint. Scripts must be designed to wait and poll rather than assuming the work finished the moment the first response arrived.",
   "Beyond the Intent API, Catalyst Center offers event notifications, also called webhooks, that push assurance issues and other events to external systems such as ITSM (IT service management) tools, so a ticket can open automatically when a site's health drops. It also provides integration APIs for connecting with other platforms. These complement the Intent API: the Intent API is something your script pulls from, while event notifications push to a receiver you set up.",
   "Security practices apply to every API client. Use a dedicated service account with the minimum role needed, for example an observer role for a reporting script that never makes changes. Keep credentials and tokens out of source code and logs, read them from environment variables or a secrets store, and validate the server certificate rather than disabling verification. Exact endpoints and fields evolve between Catalyst Center releases, so check the API documentation for your version before relying on a path."
  ],
  "analogy": "Using the Intent API is like visiting a large concert venue. At the entrance, you show your ID once (Basic authentication to the token endpoint) and receive a wristband (the token). From then on, you just show the wristband at every bar and booth (the X-Auth-Token header) until it expires and you return to the entrance. Ordering a custom meal (a command runner job) gets you a pager number (the taskId), and you check back until it buzzes. The analogy stops at the pager: Catalyst Center never buzzes you for a task; your script must keep asking.",
  "terms": [
   [
    "Intent API",
    "Catalyst Center's northbound REST API for querying and configuring the network in terms of desired outcomes."
   ],
   [
    "X-Auth-Token",
    "The HTTP header that carries the Catalyst Center token on each API request."
   ],
   [
    "Token endpoint",
    "POST /dna/system/api/v1/auth/token with Basic authentication, returning a time-limited token."
   ],
   [
    "taskId",
    "The identifier returned by an asynchronous operation, polled via the task API to get its status and result."
   ],
   [
    "Northbound API",
    "An interface that faces applications and scripts above the controller, as opposed to southbound protocols toward devices."
   ],
   [
    "Command runner",
    "The Intent API feature that runs read-only CLI commands on devices asynchronously and returns output through a file."
   ]
  ],
  "example": "Every morning a script authenticates to Catalyst Center, calls the site-health endpoint, and posts any site with a health score below target to the operations chat channel. When a site looks bad, it runs a show command on that site's switches through the command runner, polls the returned taskId and attaches the output.",
  "mistakes": [
   [
    "Sending the username and password with every Intent API call.",
    "Credentials go only to the token endpoint. Every later call carries the token in the X-Auth-Token header."
   ],
   [
    "Expecting the command runner to return command output in its first response.",
    "The command runner is asynchronous. It returns a taskId; you poll the task endpoint until it completes, then fetch the output from the file endpoint."
   ],
   [
    "Mixing up the Catalyst Center and SD-WAN Manager authentication methods.",
    "Catalyst Center uses a token from /dna/system/api/v1/auth/token in X-Auth-Token. SD-WAN Manager uses a JSESSIONID session cookie plus an X-XSRF-TOKEN header for changes."
   ],
   [
    "Treating a 401 halfway through a long script as a permissions problem.",
    "A 401 after the script has been running a while usually means the token expired. Request a new token and retry. A permissions problem appears as 403."
   ]
  ],
  "tryit": [
   [
    "Your reporting script runs for 90 minutes, walking through thousands of client-detail calls. It works for most of the run, then every call starts returning 401. The account and password have not changed. What is happening and how should the script be changed?",
    "The token has expired, since tokens are time-limited with a default of about one hour. The script should catch 401 responses, request a new token from /dna/system/api/v1/auth/token, update the X-Auth-Token header and retry the failed call."
   ],
   [
    "A new engineer writes a script that calls the command runner to run show version on 20 switches, then immediately reads the response and prints it. The output is just a small JSON object with a taskId and a URL. What should the script do instead?",
    "It should poll /dna/intent/api/v1/task/{taskId} until the task reports completion, read the file ID from the finished task, and download the command output from the file endpoint. The first response only confirms the job was accepted."
   ]
  ],
  "tip": "Token first: POST to /dna/system/api/v1/auth/token with Basic auth, then send X-Auth-Token on every call. Intent API paths start with /dna/intent/api/v1/, and results usually sit under a response key. Long-running actions return a taskId to poll, not the final result.",
  "check": [
   [
    "Which header carries the Catalyst Center token?",
    "X-Auth-Token."
   ],
   [
    "A command runner request returns immediately with a taskId. What do you do next?",
    "Poll the task endpoint with that taskId until it completes, then retrieve the result, such as the output file."
   ],
   [
    "Which HTTP method and authentication type does the token request use?",
    "POST with HTTP Basic authentication using a Catalyst Center username and password."
   ],
   [
    "In most Intent API responses, which top-level key holds the results?",
    "response."
   ]
  ]
 },
 {
  "t": "SD-WAN Manager REST APIs",
  "hook": "At Coastal Grocers, 260 stores connect to headquarters over an SD-WAN fabric, and the security team has a new rule: every WAN Edge must run the approved software version by the end of the quarter. Jordan is asked to produce a weekly report of any router that is unreachable or out of date. He already wrote a Catalyst Center script last month, so he copies it, changes the address, and points it at SD-WAN Manager. The login call returns 200, which looks like success, yet the next call returns a web page full of HTML instead of device data. Nothing in his old script explains it. What does SD-WAN Manager expect that Catalyst Center did not?",
  "simple": "SD-WAN Manager is the central control panel for a Cisco SD-WAN network, the system that links many branch offices over the internet and private lines. Instead of logging in to hundreds of branch routers, you manage them all from this one place, and a script can do the same through its API, a doorway for programs. Logging in works like visiting a members-only club. You sign in at the front desk with your username and password, and the club gives you a stamp on your hand, a session cookie, that you show on every later visit. If you want to change anything, not just look, you also need a second slip, a safety token, which you pick up from a separate desk. If your login fails, the club may still smile and hand you the sign-in form again, so you must check what you actually received.",
  "body": [
   "Cisco Catalyst SD-WAN Manager, formerly called vManage, exposes a REST (representational state transfer) API (application programming interface) that covers nearly everything in its GUI (graphical user interface): device inventory, monitoring statistics, alarms and events, templates and configuration groups, policies and software upgrades. It is the single programmable entry point to the whole SD-WAN (software-defined wide area network) fabric, because WAN Edge routers are managed through the Manager rather than individually. A script that wants to know the state of 500 branches asks the Manager once rather than connecting to 500 routers.",
   "API paths start with `/dataservice/` on the Manager's HTTPS address, and authentication is session-based rather than relying on a single token header. The flow has two steps, and the exam expects you to know both. First, you send a POST to `/j_security_check` with form-encoded fields named `j_username` and `j_password`, not a JSON body. If the login succeeds, the Manager returns a session cookie named JSESSIONID, which the client must send on every later request. In Python, a `requests.Session` object stores and resends cookies automatically, which is why SD-WAN scripts almost always use one.",
   "Second, for any request that changes something, such as POST, PUT or DELETE, you also need a CSRF (cross-site request forgery) token, which Cisco calls an XSRF token. You obtain it by sending a GET to `/dataservice/client/token`, and you include the returned value in an `X-XSRF-TOKEN` header on change requests. The token protects against a malicious web page tricking a logged-in browser into sending unwanted changes, since a forged request would carry the cookie but not the token. Some newer releases also support other token-based authentication methods, but the session cookie plus XSRF token pattern is the one to know for ENCOR.",
   "```python\nimport os, requests\ns = requests.Session()\nBASE = os.environ[\"MANAGER_URL\"]  # SD-WAN Manager HTTPS address\nuser, password = os.environ[\"MANAGER_USER\"], os.environ[\"MANAGER_PASS\"]\ns.post(BASE + \"/j_security_check\",\n       data={\"j_username\": user, \"j_password\": password}, verify=\"ca.pem\")\nxsrf = s.get(BASE + \"/dataservice/client/token\", verify=\"ca.pem\").text\ns.headers.update({\"X-XSRF-TOKEN\": xsrf, \"Content-Type\": \"application/json\"})\ndevices = s.get(BASE + \"/dataservice/device\", verify=\"ca.pem\").json()\nfor d in devices[\"data\"]:\n    print(d[\"host-name\"], d[\"system-ip\"], d[\"reachability\"])\n```",
   "Walk through that script. It creates a Session so the JSESSIONID cookie is kept. It posts the credentials as form data with `data=`, not `json=`, because `j_security_check` expects a form. It fetches the XSRF token as plain text and adds it to the session's default headers, so every later request carries both the cookie and the token. Finally, it reads `/dataservice/device`, parses the JSON, and loops over the list under the `data` key, printing each device's host name, system IP address and reachability. Credentials come from environment variables and the server certificate is validated against a CA (certificate authority) file.",
   "Several details trip people up. A failed login often still returns HTTP 200, but the body is an HTML login page instead of an authenticated session, so a script must check the response content or the presence of the cookie, not just the status code. Most monitoring responses wrap their results in a `data` key, unlike Catalyst Center's `response` key, and field names use hyphens, such as `host-name` and `system-ip`, which means you must use bracket lookups rather than attribute-style names. When the script finishes, it should log out, using an endpoint such as `/logout`, to free the session, because the Manager limits the number of concurrent sessions and abandoned ones count against that limit.",
   "The API is organized into areas. Monitoring endpoints return device status, interface statistics, BFD (Bidirectional Forwarding Detection) session and tunnel health, control connections and OMP (Overlay Management Protocol) state for a device identified by its system IP. Alarm and event endpoints report problems across the fabric. Configuration endpoints manage templates, configuration groups and policies, and device action endpoints trigger operations such as software upgrades or reboots; these actions are asynchronous and return an ID you check for status. Real-time queries are passed through the Manager to the device itself, so they add load and should be used sparingly. The Manager includes built-in API documentation, often reachable from its help menu, that lists the endpoints for your exact release, and it is the authoritative reference because paths change between versions.",
   "Typical automation uses include pulling inventory into a CMDB (configuration management database), exporting tunnel performance to a reporting system, auditing that every edge runs the approved software version, and feeding alarms into a ticketing system. Follow the same security practices as for any API: use dedicated least-privilege accounts, keep secrets out of code, validate certificates rather than disabling verification, and always log out when finished."
  ],
  "analogy": "SD-WAN Manager authentication is like a members-only club. You sign in at the front desk (j_security_check) and get a hand stamp (the JSESSIONID cookie) that lets you walk around and look at anything. To order from the bar, which changes something, you also need a numbered slip from a second desk (the XSRF token from /dataservice/client/token). Catalyst Center is a different venue that hands out a wristband (X-Auth-Token) and needs nothing else. The analogy breaks at failed sign-ins: a real club tells you no, but the Manager may simply return the sign-in page with a 200.",
  "terms": [
   [
    "/dataservice",
    "The base path of SD-WAN Manager REST API endpoints."
   ],
   [
    "j_security_check",
    "The login endpoint that accepts form-encoded username and password and returns a JSESSIONID cookie."
   ],
   [
    "JSESSIONID",
    "The session cookie that authenticates subsequent SD-WAN Manager API calls."
   ],
   [
    "X-XSRF-TOKEN",
    "Header carrying the CSRF token from /dataservice/client/token, required for POST, PUT and DELETE."
   ],
   [
    "requests.Session",
    "A Python object that keeps cookies and default headers across requests, used to hold the SD-WAN session."
   ],
   [
    "System IP",
    "The unique identifier of a WAN Edge in the SD-WAN fabric, used to select a device in monitoring calls."
   ]
  ],
  "example": "An operations team wants a nightly report of WAN Edges that are unreachable or on an old software version. A script logs in through j_security_check, reads /dataservice/device, filters the data list on reachability and version, writes a CSV and logs out, without anyone opening the GUI.",
  "mistakes": [
   [
    "Sending an X-Auth-Token header to SD-WAN Manager.",
    "X-Auth-Token is the Catalyst Center method. SD-WAN Manager uses the JSESSIONID cookie from j_security_check, plus X-XSRF-TOKEN for changes."
   ],
   [
    "Trusting a 200 from j_security_check as proof of login.",
    "A failed login can return 200 with an HTML login page. Check that a session cookie was set or that a follow-up call returns JSON."
   ],
   [
    "Posting the login credentials as a JSON body.",
    "j_security_check expects form-encoded fields named j_username and j_password, which requests sends with data=, not json=."
   ],
   [
    "Fetching the XSRF token only for GET requests.",
    "GET requests work with just the session cookie. The XSRF token is needed for requests that change state, such as POST, PUT and DELETE."
   ]
  ],
  "tryit": [
   [
    "Your read-only inventory script against SD-WAN Manager works fine. You add one call that attaches a device template, a POST, and it fails with a 403-style rejection even though the account has the right role. The script reuses the session cookie correctly. What is the likely missing piece?",
    "The XSRF token. Change requests need the value from GET /dataservice/client/token in an X-XSRF-TOKEN header. Fetch it after logging in and add it to the session headers before the POST."
   ],
   [
    "A scheduled audit script runs every 15 minutes and never calls logout. After a few hours, administrators report they cannot log in to the GUI. What is the most likely link, and how do you fix the script?",
    "Each run leaves an open session, and the Manager limits concurrent sessions, so abandoned sessions pile up. The script should log out at the end, for example through the logout endpoint, and ideally reuse a single session within a run."
   ]
  ],
  "tip": "SD-WAN Manager uses a session cookie (JSESSIONID from j_security_check) plus an X-XSRF-TOKEN for changes; Catalyst Center uses X-Auth-Token. Paths start with /dataservice/, results sit under a data key, and a 200 from login is not proof of success.",
  "check": [
   [
    "What two credentials does a script need to send a POST to SD-WAN Manager?",
    "The JSESSIONID session cookie from logging in via j_security_check and the XSRF token in the X-XSRF-TOKEN header."
   ],
   [
    "Why check the content of the login response and not only its status code?",
    "A failed login can return HTTP 200 with an HTML login page instead of a valid session."
   ],
   [
    "Where does a script get the XSRF token?",
    "From a GET to /dataservice/client/token after logging in."
   ],
   [
    "Why should a script log out when finished?",
    "The Manager limits concurrent sessions, so leaving sessions open can block other users and scripts."
   ]
  ]
 },
 {
  "t": "Embedded Event Manager (EEM) applets",
  "hook": "At Summit Valley Water Authority, the main pumping station's uplink has dropped four times this month, always around 3 a.m., always for less than a minute. By the time Kenji on the overnight shift gets the alert and logs in, the link is back up and the routing table looks perfect, so nobody can see what happened in that minute. His lead asks for evidence the next time it fails, captured at the exact second it fails, even if nobody is awake. There is no budget for a new monitoring server. Kenji has only the router itself. Can a router watch its own logs, notice the failure and collect the proof on its own?",
  "simple": "Embedded Event Manager, or EEM, is a small automation tool built into Cisco routers and switches. It lets the device watch for something to happen and then do something about it, all by itself, with no outside computer needed. You write simple rules called applets. Each applet has one trigger, such as a certain message appearing in the log, a clock time arriving or a link going down, and a short list of steps to run when it fires, such as typing a few commands, saving output to a file or sending a log message. It works like a smart home rule: when the front door opens after midnight, turn on the hallway light and send a text. The device follows the rule instantly, even at 3 a.m. when nobody is watching.",
  "body": [
   "Embedded Event Manager (EEM) is automation that runs on a Cisco IOS or IOS XE device itself. It watches for events and responds with actions, without needing an external server, a script host or a network connection to a controller. That makes it useful in three situations: reacting instantly to a problem, collecting diagnostic data at the moment something happens rather than minutes later, and enforcing simple local rules. EEM supports two kinds of policies, applets written directly in configuration mode and Tcl (Tool Command Language) scripts stored on the device; ENCOR focuses on applets.",
   "An applet has three parts: a name, exactly one event that acts as the trigger, and a set of actions. The event comes from an event detector, and you should recognize the common ones. `event syslog pattern` fires when a log message matches a regular expression. `event timer` fires on time, with `watchdog` for a repeating interval, `countdown` for a one-time delay and `cron` for a calendar schedule. `event track` fires when a tracked object changes state, such as an IP SLA (service level agreement) probe failing. `event interface` fires when an interface counter crosses a threshold, and `event snmp` fires when an SNMP (Simple Network Management Protocol) object crosses a threshold. `event cli pattern` fires when someone types a matching command, and it can even block that command from running. Finally, `event none` means the applet runs only when you start it manually with `event manager run NAME`.",
   "Actions are where the work happens, and their ordering has a classic trap. Each action has a label, and EEM runs actions in the sorted order of those labels, compared as strings rather than numbers. That means labels such as 1.0, 2.0 and 10.0 can sort unexpectedly, because the string 10.0 comes before 2.0. Many engineers avoid the problem with fixed-width labels such as 010, 020 and 030, which also leave room to insert steps later. Useful actions include `cli command` to run an EXEC or configuration command, `syslog msg` to write a log message, `mail` to send an email, `snmp-trap` to send a trap, `wait` to pause for a number of seconds, and control flow with `if`, `foreach` and variables. When an applet runs CLI (command-line interface) commands, it starts in user EXEC mode, so the first CLI action is usually `enable` to reach privileged mode.",
   "```\nevent manager applet UPLINK-DOWN\n event syslog pattern \"Interface GigabitEthernet0/1, changed state to down\"\n action 010 cli command \"enable\"\n action 020 cli command \"show ip route | redirect flash:uplink-down.txt\"\n action 030 syslog priority critical msg \"Uplink Gi0/1 down, routing table saved\"\n```",
   "Read that applet line by line. The name is UPLINK-DOWN. The single event watches the log for the exact message a router writes when GigabitEthernet0/1 goes down. When that message appears, action 010 enters privileged mode, action 020 runs `show ip route` and redirects the output into a file on flash, and action 030 writes a critical syslog message that a monitoring system will pick up. Because the labels are fixed-width, they run in the intended order. The result is a snapshot of the routing table taken within moments of the failure, which is exactly the evidence an engineer arriving later would otherwise miss.",
   "Two other patterns come up often. Scheduled work uses a cron timer, for example `event timer cron cron-entry \"0 2 * * *\"` with actions that copy the running configuration to a server every night at 02:00, giving you a simple backup without an external scheduler. Reactive failover uses tracking: with `event track 1 state down`, an applet can bring up a backup interface, shut a primary one or change a route when an IP SLA probe tied to track object 1 fails, and a second applet watching for the up state can reverse the change.",
   "Security and verification deserve attention. If AAA (authentication, authorization and accounting) command authorization is configured, commands run by EEM are authorized too, so the applet can fail silently unless you configure `event manager session cli username NAME` with an account that is authorized to run those commands. To test and verify, run `event none` applets with `event manager run`, list registered applets with `show event manager policy registered`, review past triggers with `show event manager history events`, and in a lab use `debug event manager action cli` to watch each command the applet executes. Avoid running heavy debug commands on production devices.",
   "EEM is best for local, fast and simple reactions on a single device. For fleet-wide configuration, complex logic or anything that needs data from many devices at once, use off-box tools such as Ansible or Python with NETCONF and RESTCONF. The two approaches complement each other: an off-box tool can even deploy the same EEM applet to hundreds of devices, and each device then reacts locally in real time."
  ],
  "analogy": "An EEM applet is like a smart home rule. The event is the sensor, such as the front door opening or the clock reaching 2 a.m., and the actions are the routine that follows: turn on a light, take a camera snapshot, send a notification. Each rule has one trigger and a list of steps. The analogy breaks on step ordering: a smart home app runs steps top to bottom, but EEM runs actions by sorting their labels as text, so 10.0 can run before 2.0 unless you use labels such as 010 and 020.",
  "terms": [
   [
    "EEM",
    "Embedded Event Manager: on-device automation that runs actions when defined events occur."
   ],
   [
    "Applet",
    "An EEM policy written in configuration mode with one event and a set of actions."
   ],
   [
    "Event detector",
    "The EEM component that triggers an applet, such as syslog, timer, track, interface, snmp, cli or none."
   ],
   [
    "action cli command",
    "An EEM action that runs a CLI command on the device; usually preceded by an enable action."
   ],
   [
    "Action label",
    "The identifier on each action; actions run in sorted string order of their labels."
   ],
   [
    "event manager session cli username",
    "Sets the user account EEM uses for CLI actions when AAA command authorization is enabled."
   ]
  ],
  "example": "A router's CPU spikes for a few seconds every afternoon, and nobody is watching when it happens. The engineer creates an applet with an SNMP event on CPU utilization that runs `show processes cpu sorted` and `show interfaces` into a file on flash and writes a syslog message. The next day, the file shows exactly which process was busy.",
  "mistakes": [
   [
    "Labeling actions 1, 2, 3 ... 10 and expecting numeric order.",
    "Labels are sorted as strings, so 10 runs before 2. Use fixed-width labels such as 010, 020 and 030."
   ],
   [
    "Leaving out the enable action before privileged commands.",
    "An applet's CLI session starts in user EXEC mode. Without an enable action first, privileged show and configuration commands fail."
   ],
   [
    "Assuming an applet can have several events in one simple applet.",
    "A basic applet has exactly one event. For a different trigger, create another applet. (Advanced correlation syntax exists, but ENCOR's model is one event plus actions.)"
   ],
   [
    "Blaming the applet logic when CLI actions do nothing on a device with AAA.",
    "If AAA command authorization is on, EEM's commands are authorized too. Configure event manager session cli username with an authorized account."
   ]
  ],
  "tryit": [
   [
    "A colleague writes an applet with actions labeled 1.0 enable, 2.0 configure terminal, 3.0 interface Gi0/2, and 10.0 no shutdown. In testing, the no shutdown seems to fail with an error about invalid input. What is wrong and how do you fix it?",
    "Labels sort as strings, so 10.0 runs right after 1.0 and before configure terminal, where no shutdown is invalid. Relabel with fixed-width labels such as 010, 020, 030 and 040 so the actions run in the intended order."
   ],
   [
    "You need a device to save its running configuration to a TFTP server every night at 01:30 without any external scheduler. Which event detector do you use and what would the trigger line look like?",
    "A timer event with cron, for example event timer cron cron-entry \"30 1 * * *\", followed by actions starting with enable and then the copy command to the server."
   ]
  ],
  "tip": "Every applet needs exactly one event and at least one action. Action labels run in sorted string order, so use 010, 020, 030. Start CLI actions with enable, and watch for AAA command authorization blocking EEM commands. Use event none plus event manager run to test on demand.",
  "check": [
   [
    "Which event detector triggers an applet when a specific log message appears?",
    "event syslog pattern with a regular expression matching the message."
   ],
   [
    "How do you run an applet on demand?",
    "Configure it with event none and run it with event manager run followed by the applet name."
   ],
   [
    "Which timer type would you use for a one-time delay rather than a repeating interval?",
    "countdown; watchdog repeats on an interval and cron follows a calendar schedule."
   ],
   [
    "Which command shows which applets have fired recently?",
    "show event manager history events."
   ]
  ]
 },
 {
  "t": "Orchestration tools: agent-based (Puppet, Chef) vs agentless (Ansible)",
  "hook": "At Brightwater County Schools, the server team has used an agent-based configuration tool for years, and every Linux server checks in on its own and quietly fixes any drift. Now the network team, led by Rosa, must change the SNMP settings on 400 Catalyst switches before an audit next month. The server team's lead says, \"Just use our tool. Install the agent on the switches and you are done.\" Rosa checks the switch documentation and finds no supported way to install that agent. A contractor suggests a different tool that needs nothing installed at all. Rosa has to choose, and defend the choice to both teams. What actually separates these tools?",
  "simple": "When you manage hundreds of devices, you do not want to log in to each one by hand. Configuration management tools let you write down how every device should be set up in a file, then apply that file to all of them at once. They come in two styles. In the first style, each device runs a small helper program, an agent, that regularly calls a central server and asks \"How should I be set up?\", then fixes itself. Puppet and Chef work this way. In the second style, nothing is installed on the devices; a central computer reaches out over connections the devices already support, such as SSH, a secure remote login, and makes the changes. Ansible works this way. It is the difference between employees who check the company handbook every morning and a manager who visits each desk with instructions.",
  "body": [
   "Configuration management and orchestration tools let you describe the desired state of many devices in files, keep those files in version control such as Git, and apply them consistently. Instead of logging in to 300 switches and typing the same commands, you change one file, review it, and run the tool. This brings the habits of software development, such as peer review, history and repeatable deployments, to infrastructure. The main distinction ENCOR tests is how a tool reaches its targets: with an agent installed on each managed device, or without one.",
   "Agent-based tools install software on every managed node, and Puppet is the classic example. A Puppet agent runs on each node and periodically contacts a Puppet server, which is a pull model because the node initiates the conversation. The agent sends facts about itself, such as its operating system and interfaces, receives a compiled catalog describing its desired state, and enforces that state locally, correcting anything that has drifted. Policies are written in Puppet's own declarative DSL (domain-specific language) in files called manifests, which are grouped into modules for reuse.",
   "Chef follows the same agent-based, pull pattern with different vocabulary. Its agent is the Chef client, also called the Chef Infra client, which pulls configuration from a Chef server. Configurations are written as recipes, and related recipes are grouped into cookbooks, using a Ruby-based language. Agent-based tools are strong for servers because the agent checks in on a schedule and continuously corrects drift even when no administrator is watching. Their drawback for networking is significant: many network devices cannot run a third-party agent at all, and where they can, you must install, secure, update and monitor that agent on every device. SaltStack, or Salt, is another tool that typically uses agents called minions controlled by a master, though it also offers an agentless SSH mode.",
   "Ansible is agentless, and that single fact explains most of its popularity in networking. A control node, which can be a Linux server or a laptop, connects to managed devices over protocols they already support, SSH (Secure Shell) for Linux and network devices, and also NETCONF or HTTPS APIs (application programming interfaces), and pushes tasks to them. This is a push model, because the control node initiates every change. Nothing extra is installed on the targets. You describe the work in playbooks written in YAML (YAML Ain't Markup Language). A playbook contains one or more plays; each play targets a group of hosts listed in an inventory file, and each play contains tasks that call modules such as `cisco.ios.ios_config`, `cisco.ios.ios_vlans` or `cisco.ios.ios_command`.",
   "```yaml\n- name: Ensure NTP server on branch routers\n  hosts: branch_routers\n  gather_facts: false\n  tasks:\n    - name: Configure NTP\n      cisco.ios.ios_config:\n        lines:\n          - ntp server 10.0.0.10\n```",
   "Read that playbook from the top. It contains one play, named for its purpose, that targets the `branch_routers` group defined in the inventory. Fact gathering is turned off, which is common for network devices to save time. The single task uses the `ios_config` module to make sure the line `ntp server 10.0.0.10` is present in each router's configuration. Many Ansible modules are idempotent: they check the current state first and change only what differs, so running the playbook a second time reports no changes rather than adding duplicate lines. Variables and Jinja2 templates extend this further, letting one playbook generate a different configuration for each device from the same template.",
   "Because network devices already support SSH and APIs and usually cannot host agents, Ansible has become the most widely used of these tools for network automation. It also has a gentle learning curve, since YAML is readable and the tool needs no server infrastructure to get started. Its weaknesses are the mirror image of the agent-based strengths. Ansible acts only when you run it, so there is no continuous enforcement unless you schedule runs, for example with a controller such as Ansible Automation Platform, and performance over SSH can be slower at very large scale because the control node must connect to every device.",
   "For the exam, keep a compact comparison in mind. Puppet and Chef are agent-based and pull; Puppet uses manifests written in its declarative language, and Chef uses recipes and cookbooks written in a Ruby-based language. Ansible is agentless and push, uses YAML playbooks, inventory files and modules, and connects over SSH or APIs. When a question describes network devices that cannot run additional software, Ansible is almost always the expected answer."
  ],
  "analogy": "Agent-based tools are like employees who each check the company handbook every morning and correct anything they are doing differently; the handbook is the central server and every employee needs training (the agent). Ansible is like a manager who walks to each desk with written instructions and makes sure they are followed, with no training needed for staff. The analogy shows the trade-off: the handbook model keeps fixing drift daily on its own, while the manager model only fixes things on days the manager walks around, unless someone schedules those walks.",
  "mnemonic": "\"Puppets and Chefs Pull; Ansible Arrives.\" Puppet and Chef use agents and pull from a server; Ansible arrives at the device, agentless, and pushes.",
  "terms": [
   [
    "Agent-based",
    "Management where software on each target pulls and enforces its configuration from a central server."
   ],
   [
    "Agentless",
    "Management where a control node connects over existing protocols such as SSH and pushes changes."
   ],
   [
    "Playbook",
    "An Ansible YAML file of plays and tasks applied to hosts from an inventory."
   ],
   [
    "Inventory",
    "The Ansible file that lists managed hosts and groups them, such as by site or role."
   ],
   [
    "Manifest",
    "A Puppet file that declares desired state in Puppet's language."
   ],
   [
    "Cookbook and recipe",
    "Chef's units of configuration, written in a Ruby-based language."
   ],
   [
    "Idempotent module",
    "An Ansible module that changes only what differs from the desired state, so repeated runs give the same result."
   ]
  ],
  "example": "A team needs to update SNMP settings on 400 Catalyst switches that cannot run third-party agents. They write an Ansible playbook with the ios_config module, list the switches in an inventory grouped by site, run it against one site as a test, then against all sites, and commit the playbook to Git for review.",
  "mistakes": [
   [
    "Saying Ansible uses a pull model.",
    "Ansible is push: the control node connects to devices and sends tasks. Puppet and Chef are pull: agents contact the server."
   ],
   [
    "Thinking Ansible playbooks are written in Python or Ruby.",
    "Playbooks are YAML. Ansible itself is written in Python, and Chef recipes use a Ruby-based language, which is where the confusion comes from."
   ],
   [
    "Matching manifests to Chef or cookbooks to Puppet.",
    "Puppet uses manifests grouped into modules. Chef uses recipes grouped into cookbooks."
   ],
   [
    "Believing Ansible continuously enforces state like an agent.",
    "Ansible acts only when a playbook runs. Continuous enforcement requires scheduling runs, for example through a controller such as Ansible Automation Platform."
   ]
  ],
  "tryit": [
   [
    "A company has 600 Linux servers that must stay compliant at all times, even if an administrator changes a file by hand at night, and 300 Catalyst switches that cannot run extra software. The architect wants one recommendation for each group. What do you suggest and why?",
    "An agent-based tool such as Puppet or Chef suits the servers, because agents check in on a schedule and continuously correct drift. Ansible suits the switches, because it is agentless and connects over SSH or APIs the switches already support. Ansible could also manage the servers if runs are scheduled."
   ],
   [
    "You run an Ansible playbook that adds a logging server to 50 routers. A colleague worries that running it again tomorrow will add the line a second time. What do you tell them?",
    "Modules such as ios_config are idempotent: they compare the desired line with the current configuration and change only what differs, so a second run reports no changes rather than adding duplicates."
   ]
  ],
  "tip": "Ansible: agentless, push, YAML playbooks, inventory, SSH or API. Puppet: agent, pull, manifests. Chef: agent, pull, Ruby recipes and cookbooks. For network devices that cannot host agents, Ansible is the usual answer.",
  "check": [
   [
    "Why is Ansible popular for network automation?",
    "It is agentless, connecting over SSH or APIs that network devices already support, so nothing has to be installed on the devices."
   ],
   [
    "What language are Ansible playbooks written in?",
    "YAML."
   ],
   [
    "Which tools use a pull model with an agent?",
    "Puppet and Chef (and Salt in its usual minion mode)."
   ],
   [
    "What does a Puppet agent receive from the Puppet server after sending its facts?",
    "A compiled catalog describing the node's desired state, which the agent then enforces."
   ]
  ]
 },
 {
  "t": "AI in network operations: baselining, anomaly detection, AI-assisted troubleshooting and safe guardrails",
  "hook": "It is 8:15 a.m. at Meridian Insurance, and the AI assistant built into the team's network dashboard has posted a message: wireless onboarding failures at the Riverside branch tripled after 8:00, and it recommends a command to fix the DHCP configuration. It also offers a button labeled Apply. Sam, two months into the job, has never seen this branch fail before and the assistant sounds very sure. The command looks plausible. His senior engineer is in a meeting. The button is right there, and forty employees are waiting to get on the network. Should Sam trust the analysis, the command, both or neither, and what should happen before anything touches a production device?",
  "simple": "Modern networks produce far more numbers and messages than any person can read. AI tools help by learning what normal looks like for each part of the network, at each time of day, and then pointing out when something looks unusual, the way your bank notices a strange purchase on your card. Newer AI assistants also let you ask questions in plain language, such as \"Why are people at the Riverside office not getting online?\", and they summarize data and suggest fixes. These tools are helpful but not perfect. They can be confidently wrong, even inventing commands that do not exist. So a person must check their suggestions, approve any change through the normal process, and give the tool only as much access as it truly needs. AI is a sharp assistant, not the boss.",
  "body": [
   "Networks produce far more telemetry than people can watch: interface counters, flow records, logs, client connection events and application performance data, from thousands of devices every few seconds. AI (artificial intelligence) and ML (machine learning) help turn that volume into useful signals. ENCOR v1.2 added AI to the automation domain, so you should understand what these techniques do, where they help, and how to use them safely. The exam focuses on concepts and good practice rather than on any particular algorithm.",
   "Baselining is the foundation of AI-driven monitoring. Instead of a fixed threshold such as \"alert at 80 percent utilization\", an ML model learns what is normal for each metric in its context: this site, this device, this time of day and this day of the week. A link that normally runs at 70 percent on Monday mornings is fine at 70 percent, while the same link at 40 percent at 3 a.m. may be unusual, perhaps a backup job running at the wrong time or a host sending data it should not. A static threshold would ignore the 3 a.m. event and might alert every Monday for nothing. Dynamic baselines adapt as patterns change, such as a new office opening, and reduce both false alarms and missed problems.",
   "Anomaly detection flags behavior that deviates significantly from the baseline. Examples include a spike in DHCP (Dynamic Host Configuration Protocol) failures at one site, unusual latency on one WAN (wide area network) path, or a host suddenly sending large volumes of traffic to a destination it has never contacted. Detection is statistical, so it produces some false positives, which are alerts for harmless events, and some false negatives, which are real problems it misses. Tuning sensitivity and feeding back which alerts were real improves results over time.",
   "Several related capabilities build on the same data. Trend forecasting predicts when a link, a DHCP pool or a storage resource will run out of capacity, so you can act before users notice. Correlation groups many alerts that share one root cause into a single issue; when a distribution switch fails, you want one issue explaining the outage, not two hundred separate access-port alarms. Peer comparison compares a site with similar sites, so a branch with three times the authentication failures of its peers stands out. Catalyst Center assurance and SD-WAN analytics apply these ideas to campus and WAN telemetry.",
   "AI-assisted troubleshooting increasingly uses generative AI, such as an LLM (large language model) assistant, so engineers can ask questions in natural language: \"Why are clients at the Denver site failing to onboard?\" A good assistant can summarize open issues, explain likely causes, retrieve relevant telemetry and documentation, and suggest show commands or configuration changes. This speeds up investigation, especially for less experienced staff who might not know where to look, and it can draft documentation or change records from the findings.",
   "These tools must be used with guardrails, and exam answers consistently favor them. LLMs can produce confident but wrong answers, called hallucinations, such as nonexistent commands, incorrect syntax for a platform or the wrong root cause. Every recommendation must therefore be verified against real data and vendor documentation. Keep a human in the loop for changes: AI can propose, but a qualified engineer approves, ideally through the normal change process with peer review, testing in a lab or on a limited scope first, and a rollback plan ready.",
   "Access and data need the same discipline. Grant AI tools least-privilege access, starting read-only, and never give an assistant unrestricted write access to production devices. Protect data: do not paste credentials, keys or sensitive configuration into external AI services unless your organization has approved them and understands where the data goes and how it is retained. Keep audit logs of what the AI suggested and what was actually done, so changes can be reviewed and traced later.",
   "One newer risk deserves its own mention. Prompt injection is an attack in which malicious text hidden in logs, tickets, device descriptions or documents tries to steer an AI agent into harmful actions, for example an interface description that contains instructions telling the assistant to disable a port. An AI that reads untrusted data and can also act on devices is exposed to this risk. Restricted permissions and mandatory human approval are the main defenses, because even a manipulated assistant cannot make a change it is not allowed to make.",
   "The right mental model is that AI augments engineers rather than replacing them. It handles scale and pattern recognition across data no person could read, while people provide judgment, context and accountability for what changes in the network."
  ],
  "analogy": "An AI operations assistant is like a very fast junior analyst who has read every log in the building. They notice patterns you would miss and draft a sensible-sounding plan within seconds. But you would not give a new junior analyst the keys to the data center on day one, and you would check their plan before anyone touched production. The analogy has one important limit: a human junior usually says \"I am not sure\", while an LLM can state a made-up command with complete confidence, so verification matters even more.",
  "terms": [
   [
    "Baseline",
    "A learned model of normal behavior for a metric in its context, such as time of day and site."
   ],
   [
    "Anomaly detection",
    "Identifying behavior that deviates significantly from the baseline."
   ],
   [
    "Correlation",
    "Grouping many related alerts that share one root cause into a single issue."
   ],
   [
    "Hallucination",
    "A confident but incorrect or fabricated output from a generative AI model."
   ],
   [
    "Human in the loop",
    "Requiring a qualified person to review and approve AI recommendations before changes are made."
   ],
   [
    "Prompt injection",
    "Malicious instructions hidden in input data that attempt to manipulate an AI system's behavior."
   ]
  ],
  "example": "An AI assistant reviewing assurance data reports that wireless onboarding failures at one branch rose sharply after 08:00 and suggests a DHCP scope may be exhausted. The engineer confirms in the DHCP server that the pool is full, rejects the assistant's suggested command because it does not exist on that platform, and expands the scope through the normal change process.",
  "mistakes": [
   [
    "Choosing a static threshold as the better way to detect unusual behavior.",
    "Static thresholds ignore context, so they miss unusual values under the limit and alert on normal busy periods. Dynamic baselines learn what is normal for each site, device and time."
   ],
   [
    "Letting an AI assistant apply changes directly to production because it is usually right.",
    "Generative AI can hallucinate. Changes should be verified and approved by a qualified engineer through the change process, with testing and a rollback plan."
   ],
   [
    "Giving an AI tool full administrator access so it can be more helpful.",
    "Start with read-only, least-privilege access. Broad write access increases the damage from hallucinations and prompt injection."
   ],
   [
    "Assuming anomaly detection is always correct once deployed.",
    "It is statistical and produces false positives and false negatives. Tuning and feedback on which alerts were real improve it over time."
   ]
  ],
  "tryit": [
   [
    "Your monitoring tool alerts whenever any WAN link exceeds 85 percent. Staff ignore the alerts because two links hit 90 percent every weekday during backups. Last month a link sat at 60 percent all night because of an unexpected data transfer, and nobody noticed. What change would address both problems?",
    "Move from a static threshold to dynamic baselining with anomaly detection. A learned baseline knows the 90 percent backup window is normal for those links, so it stops alerting on it, and it flags 60 percent at night as unusual for that link and time."
   ],
   [
    "A ticket arrives from an external partner, and your AI assistant, which can read tickets and also has write access to switches, starts proposing to shut down a core uplink. The ticket text contains an unusual sentence addressed to 'the assistant'. What is likely happening, and which guardrails would have limited the risk?",
    "Likely prompt injection, where text in untrusted input tries to steer the AI. Limiting the assistant to read-only or least-privilege access, requiring human approval for every change, and logging its suggestions would have prevented harm and made the attempt visible."
   ]
  ],
  "tip": "Exam answers favor dynamic baselines over static thresholds, and human review, least privilege and verification over letting AI make unreviewed production changes. Treat AI output as a recommendation, not an authority, and protect sensitive data and credentials.",
  "check": [
   [
    "Why is a dynamic baseline better than a static threshold for alerting?",
    "It learns normal behavior for each context, so it catches unusual values that stay under a fixed threshold and avoids alerts for levels that are normal at that time or place."
   ],
   [
    "Name three guardrails for using an AI assistant in network operations.",
    "Keep a human in the loop to approve changes, give the tool least-privilege (initially read-only) access, and verify its output against real data; also protect sensitive data and log actions."
   ],
   [
    "What is a hallucination in generative AI?",
    "A confident but incorrect or fabricated output, such as a command that does not exist on the platform."
   ],
   [
    "How does correlation help during a large outage?",
    "It groups many alerts with a shared root cause into one issue, so engineers focus on the cause rather than hundreds of symptoms."
   ]
  ]
 }
], {"reviewed":"2026-10-06"});
