/* Teacher edition for Cisco CCNP Enterprise core exam (ENCOR) (350-401 v1.2): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("ccnp-encor", [
 {
  "t": "Enterprise design: two-tier (collapsed core) and three-tier campus, fabric/spine-leaf, cloud vs on-premises",
  "objectives": [
   "Students will be able to describe the role of the access, distribution and core layers in a campus design.",
   "Students will be able to compare two-tier collapsed core and three-tier designs and choose one for a given site.",
   "Students will be able to explain why spine-leaf fabrics suit east-west data center traffic.",
   "Students will be able to compare on-premises and cloud deployments in terms of cost, control and dependency."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect three or four answers on the whiteboard without judging them."
   ],
   [
    15,
    "Teach",
    "Draw the three campus layers and list each layer's jobs. Collapse distribution and core into one pair and discuss when that is enough. Then draw a spine-leaf fabric, trace a server-to-server path and count hops. Close with a two-column on-premises versus cloud comparison."
   ],
   [
    15,
    "Activity",
    "Run the design card activity below in groups of three or four."
   ],
   [
    5,
    "Discuss",
    "Have each group present one scenario and defend its choice; use the discussion questions to challenge them."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand them in."
   ]
  ],
  "warmup": "Your school opens a second campus across town. Should every building connect to every other building directly, or is there a better way? What could go wrong with each approach?",
  "activity": {
   "title": "Pick the design",
   "materials": "Printed scenario cards (one per group), whiteboard markers or large paper, sticky notes.",
   "steps": [
    "Give each group four scenario cards: a single-building office, a five-building university, a server room for a web application, and a startup with no IT staff and remote workers.",
    "For each card, groups choose collapsed core, three-tier, spine-leaf, cloud or hybrid, and sketch the topology in a few boxes.",
    "Groups write one benefit and one risk of their choice on a sticky note and attach it to the sketch.",
    "Swap sketches with another group, which must find one weakness and suggest a fix."
   ]
  },
  "discussion": [
   "At what point does a growing campus justify the cost of a dedicated core?",
   "What would make an organization keep a workload on-premises even when the cloud is cheaper on paper?"
  ],
  "exit": [
   [
    "Which campus layer usually hosts the default gateways and applies policy?",
    "The distribution layer."
   ],
   [
    "What is a collapsed core?",
    "A two-tier design where one pair of switches performs both the core and distribution roles."
   ],
   [
    "Why does spine-leaf give predictable latency?",
    "Every leaf connects to every spine, so any two servers on different leaves are always two hops apart."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a labeled template with the three layers already drawn and a word bank of layer functions to place.",
   "Extend: Ask fast finishers to count links needed for a full mesh of eight distribution pairs versus connecting them to a core, and explain the result."
  ]
 },
 {
  "t": "High availability: redundancy, first hop redundancy protocols, stateful switchover (SSO)",
  "objectives": [
   "Students will be able to explain why endpoints need a first hop redundancy protocol.",
   "Students will be able to compare HSRP, VRRP and GLBP by standard, roles and load-sharing ability.",
   "Students will be able to predict the effect of priority, preemption and tracking on the active gateway.",
   "Students will be able to explain how SSO and NSF together keep forwarding during a supervisor failure."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and let pairs discuss for two minutes, then hear a few answers."
   ],
   [
    15,
    "Teach",
    "Draw two routers and a PC on the whiteboard. Show the virtual IP and MAC, then fail the active router. Compare HSRP, VRRP and GLBP in a three-column table. Finish with a chassis drawing showing SSO between supervisors and NSF keeping neighbors calm."
   ],
   [
    15,
    "Activity",
    "Run the gateway role-play below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the role-play to design choices."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Your laptop knows exactly one gateway address. If the router behind that address dies, how would the laptop find another way out? Can it?",
  "activity": {
   "title": "Who answers the gateway",
   "materials": "Printed role cards (Router A, Router B, PC, Core uplink), a sign reading the virtual IP and MAC, sticky notes for priority values.",
   "steps": [
    "Assign students to play two routers, several PCs and the core uplink. Give each router a priority card, for example 110 and 100.",
    "PCs send 'packets' (sticky notes) to whoever holds the virtual IP sign. The active router passes them to the core uplink.",
    "The teacher announces failures one at a time: Router A powers off, Router A comes back, Router A's uplink fails. Students decide who holds the sign after each event, first without preemption and tracking, then with them.",
    "Repeat once as GLBP, where the active gateway hands different PCs different MAC cards so both routers forward."
   ]
  },
  "discussion": [
   "When might you deliberately leave preemption disabled?",
   "Why is it important that SSO is paired with NSF rather than used alone?"
  ],
  "exit": [
   [
    "Which FHRP is an open standard?",
    "VRRP."
   ],
   [
    "Router A has priority 110, Router B has 100, and B is currently active. A comes back online but does not take over. Why?",
    "Preemption is not enabled on A, so it does not reclaim the active role."
   ],
   [
    "What does NSF add to SSO?",
    "It keeps the device forwarding with the existing forwarding table, and with graceful restart on neighbors keeps routes in place, while routing protocols rebuild after the switchover."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page comparison chart of HSRP, VRRP and GLBP with blanks to fill in during the teach segment.",
   "Extend: Ask fast finishers to design HSRP groups for four VLANs across two distribution switches so both switches carry traffic, aligning each active router with the spanning tree root."
  ]
 },
 {
  "t": "SD-WAN control and data plane: Manager, Validator, Controllers, WAN Edges, OMP and IPsec tunnels",
  "objectives": [
   "Students will be able to match each SD-WAN component, by old and new name, to its plane.",
   "Students will be able to describe the onboarding sequence of a new WAN Edge.",
   "Students will be able to explain what OMP carries and why it runs only between Edges and Controllers.",
   "Students will be able to predict the effect of a Manager or Controller outage on user traffic."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student ideas on the board."
   ],
   [
    15,
    "Teach",
    "Draw four columns labeled management, orchestration, control and data. Place each component with old and new names. Walk through a new router onboarding with arrows. Explain OMP route types and key distribution, then show IPsec tunnels with BFD between Edges."
   ],
   [
    15,
    "Activity",
    "Run the onboarding card sort below."
   ],
   [
    5,
    "Discuss",
    "Debrief with the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you shipped a router to a store with no IT staff, what would it need to know to safely join your company network on its own?",
  "activity": {
   "title": "Onboarding card sort",
   "materials": "Printed cards, one per step and one per component name (old and new), tape, whiteboard.",
   "steps": [
    "Give each group a shuffled set of step cards: contact Validator, authenticate certificate, learn Controller and Manager addresses, download configuration, form OMP sessions, receive routes and keys, build IPsec tunnels, start BFD.",
    "Groups order the steps and tape them in a line, placing the matching component card above each step.",
    "The teacher then calls out failure events (Manager offline, both Controllers offline, Validator unreachable for a new site) and groups mark which steps are affected for existing and new sites.",
    "Groups compare their sequences with a neighboring group and resolve differences."
   ]
  },
  "discussion": [
   "Why might Cisco have designed OMP to run through Controllers instead of directly between Edges?",
   "What risks does a long controller outage create even if traffic keeps flowing?"
  ],
  "exit": [
   [
    "What is the new name for vSmart, and which plane is it in?",
    "SD-WAN Controller, in the control plane."
   ],
   [
    "What is a TLOC made of?",
    "System IP, color and encapsulation."
   ],
   [
    "Does user traffic stop if the Manager fails?",
    "No. Only management and monitoring are affected; Edges keep forwarding."
   ]
  ],
  "differentiation": [
   "Support: Give a reference card listing old names, new names and planes for students to use during the card sort.",
   "Extend: Ask fast finishers to explain how centralized control policy could build a hub-and-spoke topology and what happens to spoke-to-spoke traffic."
  ]
 },
 {
  "t": "SD-WAN benefits and limitations compared with traditional WAN",
  "objectives": [
   "Students will be able to list the main benefits of SD-WAN over a traditional WAN.",
   "Students will be able to explain how application-aware routing differs from metric-based routing.",
   "Students will be able to identify the limitations and new risks SD-WAN introduces.",
   "Students will be able to evaluate vendor claims about SD-WAN for accuracy."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up claim aloud and take a quick show of hands: true, false or partly true."
   ],
   [
    15,
    "Teach",
    "Sketch a traditional hub-and-spoke MPLS WAN with backhauled internet, then redraw it as SD-WAN with two transports per branch and local breakout. Walk through transport independence, central management, application-aware routing and security, then list the limitations."
   ],
   [
    15,
    "Activity",
    "Run the vendor claims debate below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to summarize."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "A salesperson says: 'With SD-WAN, your cheap internet links will perform exactly like private circuits.' True, false or partly true? Why?",
  "activity": {
   "title": "Vendor claims: fact or spin",
   "materials": "Printed claim cards (about eight), sticky notes in two colors, whiteboard divided into Accurate, Partly true and Misleading.",
   "steps": [
    "Prepare claim cards such as 'SD-WAN uses all links actively', 'SD-WAN guarantees call quality', 'SD-WAN removes the need for security at branches', 'New sites can be provisioned with no engineer on site', 'SD-WAN always lowers costs'.",
    "Groups receive the cards, place each in a category on the whiteboard and write a one-sentence justification on a sticky note.",
    "Each group defends one placement to the class while others can challenge with a counterexample.",
    "The teacher confirms the correct category and links each to the lesson content."
   ]
  },
  "discussion": [
   "If SD-WAN cannot guarantee internet performance, why do so many organizations adopt it?",
   "How does moving internet breakout to the branch change the job of the security team?"
  ],
  "exit": [
   [
    "What measures path quality for application-aware routing?",
    "BFD running inside each IPsec tunnel, measuring loss, latency and jitter."
   ],
   [
    "Name one way SD-WAN improves cloud application performance.",
    "Direct internet access at the branch instead of backhauling traffic through the data center."
   ],
   [
    "Name one limitation of SD-WAN.",
    "No provider SLA on internet transports, encryption overhead, controller dependency, licensing cost, new skills or a larger attack surface with local breakout."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column table (traditional WAN versus SD-WAN) with row headings for cost, management, path selection, security and cloud access for students to complete.",
   "Extend: Ask fast finishers to write a short SLA policy in plain words for voice, video and bulk traffic, including what happens when no path meets the voice SLA."
  ]
 },
 {
  "t": "SD-Access: control plane (LISP), data plane (VXLAN), policy plane (TrustSec), fabric node roles",
  "objectives": [
   "Students will be able to match LISP, VXLAN and TrustSec to the control, data and policy planes.",
   "Students will be able to describe the role of control plane, edge, border and intermediate nodes.",
   "Students will be able to explain how an endpoint move is handled using EID and RLOC.",
   "Students will be able to distinguish macro-segmentation from micro-segmentation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and discuss how the post office finds people who move."
   ],
   [
    15,
    "Teach",
    "Draw a small fabric: two edges, one border with co-located control plane, two intermediate switches. Show an endpoint registering, a remote edge querying, and a VXLAN packet with the SGT field. Finish with virtual networks versus groups."
   ],
   [
    15,
    "Activity",
    "Run the fabric packet walk below."
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
  "warmup": "If you move to a new apartment but keep your phone number, how do callers still reach you? What has to change, and where is that recorded?",
  "activity": {
   "title": "Fabric packet walk",
   "materials": "Printed role signs (Control plane node, Edge 1, Edge 2, Border, Intermediate), envelopes, index cards for EID and RLOC values, colored stickers for SGTs.",
   "steps": [
    "Students take role signs and stand in a line representing the fabric. Two students play endpoints with assigned groups shown by sticker color.",
    "Endpoint A connects to Edge 1, which writes an EID-to-RLOC card and hands it to the control plane node.",
    "Endpoint B on Edge 2 sends traffic to A: Edge 2 asks the control plane node, puts the inner packet and an SGT sticker in an envelope addressed to Edge 1, and passes it through the intermediate node, who may read only the outer address.",
    "Edge 1 checks the policy matrix on the whiteboard before delivering. Then move endpoint A to Edge 2 and repeat to show only the mapping changes."
   ]
  },
  "discussion": [
   "Why is it useful that intermediate nodes know nothing about the overlay?",
   "When would you choose a separate virtual network over a separate group?"
  ],
  "exit": [
   [
    "Which protocol is the SD-Access data plane?",
    "VXLAN (the VXLAN-GPO variant carrying the SGT)."
   ],
   [
    "What does an edge node do when an endpoint connects?",
    "Registers the endpoint's EID with its own RLOC at the control plane node, and serves as the endpoint's anycast gateway."
   ],
   [
    "What provides micro-segmentation in SD-Access?",
    "Scalable Group Tags with SGACLs enforced between groups within a virtual network."
   ]
  ],
  "differentiation": [
   "Support: Give a labeled diagram with each role and its protocol, and a glossary card for EID, RLOC, VNI and SGT.",
   "Extend: Ask fast finishers to explain what an internal border and an external border each handle, and why traffic to the internet uses the external border."
  ]
 },
 {
  "t": "Traditional campus vs SD-Access: underlay and overlay, group-based policy from Catalyst Center",
  "objectives": [
   "Students will be able to contrast traditional VLAN and ACL segmentation with SD-Access virtual networks and groups.",
   "Students will be able to define underlay and overlay and state what each provides.",
   "Students will be able to explain how an anycast gateway removes the need for stretched VLANs.",
   "Students will be able to describe the Catalyst Center design, policy, provision and assurance workflow."
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
    "Draw a traditional campus with a VLAN stretched across three buildings and ACLs on each distribution switch. Redraw the same campus with a routed underlay and an overlay with anycast gateways. Introduce the group policy matrix and the four Catalyst Center workflows."
   ],
   [
    15,
    "Activity",
    "Run the ACL versus matrix activity below."
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
  "warmup": "If your school's access rules were written using locker numbers, what would happen every time students switched lockers?",
  "activity": {
   "title": "ACL list versus policy matrix",
   "materials": "Projector or printed handout with a sample IP ACL of about 15 entries covering four groups, blank grid paper, markers.",
   "steps": [
    "Show the sample ACL. Groups identify which entries apply to Guests, Employees, Cameras and Servers.",
    "Groups rewrite the same intent as a four-by-four policy matrix with permit or deny in each cell.",
    "The teacher announces a change: the server subnet is renumbered. Groups count how many ACL lines change versus how many matrix cells change.",
    "Groups write one sentence on the operational benefit and one on what the matrix approach depends on, such as ISE and authentication."
   ]
  },
  "discussion": [
   "What skills would a traditional network team need to learn before running an SD-Access fabric?",
   "Why might an organization keep a traditional campus at some small sites?"
  ],
  "exit": [
   [
    "What is the job of the SD-Access underlay?",
    "Provide routed IP reachability between fabric node loopbacks (RLOCs)."
   ],
   [
    "What feature lets a subnet exist on every edge switch with the same gateway?",
    "The anycast gateway."
   ],
   [
    "Who assigns the SGT to a user in SD-Access?",
    "Cisco ISE, during 802.1X or MAB authentication."
   ]
  ],
  "differentiation": [
   "Support: Provide a side-by-side diagram with labels for VLAN, trunk, ACL, underlay, overlay and anycast gateway to annotate during the lesson.",
   "Extend: Ask fast finishers to write a short migration plan for moving one building from traditional to SD-Access while other buildings stay traditional."
  ]
 },
 {
  "t": "QoS components: classification and marking (DSCP, CoS), policing, shaping, queuing (CBWFQ, LLQ), WRED",
  "objectives": [
   "Students will be able to compare CoS and DSCP markings, including field size, value range and where each survives.",
   "Students will be able to distinguish policing from shaping by behavior, direction and effect on delay and drops.",
   "Students will be able to explain how CBWFQ, LLQ and WRED each manage a congested interface.",
   "Students will be able to apply QoS tools in the correct order to a branch WAN scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the whiteboard, steering toward the idea that the link is busy, not broken."
   ],
   [
    15,
    "Teach",
    "Draw a packet's journey from phone to WAN router. Mark it at the trust boundary, show CoS in the 802.1Q tag disappearing at the routed hop while DSCP survives. Draw a policer as a cliff and a shaper as a bucket. Finish with an interface queue: LLQ priority on top, CBWFQ classes below, and WRED trimming the default queue."
   ],
   [
    15,
    "Activity",
    "Run the 'Busy checkout' simulation below."
   ],
   [
    5,
    "Discuss",
    "Connect the simulation to real configuration using the discussion questions and one projected `show policy-map interface` style excerpt the teacher writes on the board."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Phone calls sound broken only when someone runs a big upload. The link is not down. What is actually happening to the voice packets, and would a faster link be the only fix?",
  "activity": {
   "title": "Busy checkout",
   "materials": "Colored sticky notes or paper slips (red for voice, yellow for video, white for bulk data), a table or desk as the 'interface', masking tape or whiteboard lines to draw three queues, a timer.",
   "steps": [
    "Hand each student a stack of slips in one color. Students arrive at the 'router' table at random and the teacher, acting as the interface, can send only one slip every two seconds.",
    "Round one uses a single first-in, first-out line. Record how long red slips wait. Then announce that red slips older than ten seconds are useless.",
    "Round two adds three queues: red always goes first but only up to a fixed number per round (LLQ with implicit policing), yellow gets a guaranteed share (CBWFQ), white gets the rest. A student acting as WRED removes random white slips when the white line passes a marked point.",
    "Round three adds a 'provider' student at the exit who tears up any slip beyond the rate (policer). Groups decide where to add a shaper and explain why, then compare red wait times across the rounds."
   ]
  },
  "discussion": [
   "Why should a network trust markings from an IP phone but not from the PC plugged into it?",
   "If QoS cannot create bandwidth, how do you decide when the right answer is a bigger circuit instead of a better policy?"
  ],
  "exit": [
   [
    "Which marking survives across routed hops: CoS or DSCP?",
    "DSCP, because it is in the IP header; CoS is in the 802.1Q tag and is lost at routed hops and on untagged links."
   ],
   [
    "A tool drops excess traffic immediately and can be applied inbound. Is it a policer or a shaper?",
    "A policer."
   ],
   [
    "What does LLQ add to CBWFQ, and what keeps it from starving other classes?",
    "A strict-priority queue serviced first; it is implicitly policed to its configured rate during congestion."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column card comparing policing and shaping, and a DSCP cheat sheet with EF 46, AF41 and default 0, to use during the activity.",
   "Extend: Ask fast finishers to write the class-map, policy-map and service-policy structure in pseudo-configuration for a hierarchical policy that shapes to 50 Mbps with LLQ and CBWFQ in a child policy."
  ]
 },
 {
  "t": "Hardware and software switching: process switching, CEF, FIB, RIB, adjacency table",
  "objectives": [
   "Students will be able to describe how process switching, fast switching and CEF make forwarding decisions.",
   "Students will be able to explain the relationship among the RIB, the FIB and the adjacency table.",
   "Students will be able to identify special adjacency types such as glean, punt, drop and null.",
   "Students will be able to choose the right show command to locate a forwarding problem."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect ideas about how a router could possibly look up millions of packets per second."
   ],
   [
    15,
    "Teach",
    "Draw the control plane above the data plane. Show routing protocols filling the RIB, an arrow to the FIB, and ARP filling the adjacency table. Walk one packet through a FIB lookup and adjacency rewrite. Contrast with process switching and with fast switching's first-packet cache. End with the special adjacency types and the three show commands."
   ],
   [
    15,
    "Activity",
    "Run the 'Build the tables' card activity below in pairs."
   ],
   [
    5,
    "Discuss",
    "Debrief using the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A router may forward millions of packets every second. If it had to read its whole routing table for every packet, what would happen? How might it avoid that?",
  "activity": {
   "title": "Build the tables",
   "materials": "Printed cards: five route entries (connected, static, OSPF), three ARP entries and four sample packets with destination addresses; whiteboard or blank paper for each pair.",
   "steps": [
    "Pairs sort the route cards into a RIB, choosing the best route where two cards cover the same prefix.",
    "Pairs build a FIB from the RIB, resolving the static route's recursive next hop to an outgoing interface, and build an adjacency table from the ARP cards.",
    "For each sample packet, pairs perform a longest-match lookup in the FIB, find the adjacency and write the rewritten destination MAC.",
    "One packet's next hop has no ARP card. Pairs decide what adjacency state results, where that packet goes and which show command would reveal it."
   ]
  },
  "discussion": [
   "Why might a routing table look correct while users still see slow forwarding?",
   "What risks did fast switching's on-demand cache create during network events, and how does CEF avoid them?"
  ],
  "exit": [
   [
    "Which table does CEF build from ARP and ND?",
    "The adjacency table."
   ],
   [
    "What is the relationship between the RIB and the FIB?",
    "The FIB is CEF's lookup-optimized copy of the best routes in the RIB, with recursive next hops resolved."
   ],
   [
    "Which command shows how a single destination prefix will be forwarded by CEF?",
    "`show ip cef <prefix> detail`."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram showing RIB to FIB and ARP to adjacency with arrows, and let students fill in a blank copy during the teach segment.",
   "Extend: Ask fast finishers to explain how CEF load-shares across two equal-cost paths per destination and why that keeps packets in a flow in order."
  ]
 },
 {
  "t": "CAM and TCAM tables and what each stores",
  "objectives": [
   "Students will be able to explain how CAM and TCAM differ in the kinds of matches they support.",
   "Students will be able to state which tables and features use CAM and which use TCAM.",
   "Students will be able to explain how don't-care bits and entry order allow longest-prefix and first-match lookups.",
   "Students will be able to diagnose symptoms of TCAM exhaustion and propose remedies."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take quick answers; aim for the idea of exact versus pattern matches."
   ],
   [
    15,
    "Teach",
    "Draw a MAC address table with VLAN, MAC and port columns and show learning, aging and flooding. Then write a TCAM entry as value and mask for 10.1.1.0/24, showing don't-care bits. Show ordering for longest prefix and ACL first match. Close with SDM templates and what happens when a region fills."
   ],
   [
    15,
    "Activity",
    "Run the 'Match or miss' card activity below in groups of three."
   ],
   [
    5,
    "Discuss",
    "Debrief using the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Your phone can find a contact instantly if you type the full name, and it can also show everyone whose number starts with a certain area code. Are those the same kind of search? Which would be harder to do in hardware?",
  "activity": {
   "title": "Match or miss",
   "materials": "Printed CAM cards (MAC, VLAN, port), printed TCAM cards with 8-bit binary values and masks written using 0, 1 and X, a set of lookup slips with binary keys, whiteboard.",
   "steps": [
    "Groups receive a small CAM table and five lookup slips with destination MAC and VLAN. For each, they record hit and port, or miss and flood.",
    "Groups receive a TCAM rack of six entries containing X bits, deliberately shuffled. They put the entries in the correct order so the most specific entry comes first.",
    "Groups run five binary keys through the ordered TCAM and record which entry matches first, then repeat with the original shuffled order and note any wrong answers.",
    "The teacher removes two TCAM slots to simulate a full region. Groups decide which entries could be combined into one masked entry so the rules still fit."
   ]
  },
  "discussion": [
   "Why do vendors not simply build switches with enough TCAM for every possible feature?",
   "How could a correct configuration still produce incorrect forwarding behavior on a switch?"
  ],
  "exit": [
   [
    "Which memory type stores the MAC address table?",
    "CAM, because MAC lookups are exact matches."
   ],
   [
    "What does the 'ternary' in TCAM refer to?",
    "Each bit can be matched as 0, 1 or don't care."
   ],
   [
    "Name two possible effects when a TCAM region fills.",
    "New entries fail to program in hardware with a log error, and affected traffic may be punted to the CPU or dropped, depending on platform."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a decimal version of the TCAM activity, using digits and X instead of binary, before moving them to binary keys.",
   "Extend: Ask fast finishers to write the value and mask for 172.16.0.0/12 and explain how many addresses match it in a single lookup."
  ]
 },
 {
  "t": "Punted traffic and its effect on the control plane CPU",
  "objectives": [
   "Students will be able to distinguish the data, control and management planes and where each runs.",
   "Students will be able to list common causes of punted traffic, both legitimate and problematic.",
   "Students will be able to explain how excessive punting leads to adjacency loss, loops and FHRP flapping.",
   "Students will be able to interpret CPU output and recommend protections such as CoPP."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let a few students answer."
   ],
   [
    15,
    "Teach",
    "Draw a switch as a fast hardware box with a small CPU on top. Sort example packets into 'stays in hardware' and 'punted'. Show what a saturated CPU stops doing: hellos, BPDUs, FHRP, SSH. Write the CPU five-second line on the board and explain the interrupt number. Finish with CoPP and good hygiene."
   ],
   [
    15,
    "Activity",
    "Run the 'Read the CPU' troubleshooting activity below in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect punting to both operations and security."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A switch has a powerful forwarding chip and a much slower general-purpose processor. What jobs do you think only the slow processor can do, and what happens to those jobs if it gets too busy?",
  "activity": {
   "title": "Read the CPU",
   "materials": "Printed incident packets for each pair: a CPU utilization line, a short sorted process list, a punt cause summary written by the teacher, a recent change log and a symptom description; highlighters.",
   "steps": [
    "Pairs read the symptom description and the CPU line and decide whether the load looks interrupt-driven or process-driven.",
    "Pairs examine the punt cause summary and highlight the cause with the largest count.",
    "Pairs match that cause to an entry in the change log, such as an ACL line with `log`, a new MTU setting or a large route import, and explain the link.",
    "Pairs write a two-part fix: remove or correct the cause, and add or tune a CoPP class so a similar surge cannot starve routing protocols. Swap with another pair to review."
   ]
  },
  "discussion": [
   "Why can punt-related outages be misdiagnosed as routing or cabling problems?",
   "How would you balance the security team's wish to log traffic with the risk to the control plane?"
  ],
  "exit": [
   [
    "What is punting?",
    "The data plane sending a packet up to the CPU for software handling instead of forwarding it in hardware."
   ],
   [
    "Give two examples of traffic that is legitimately punted.",
    "Routing protocol hellos and updates addressed to the device, and SSH or SNMP sessions to the device; pings to the device's address also qualify."
   ],
   [
    "Which feature rate-limits traffic headed to the CPU by class?",
    "Control Plane Policing (CoPP)."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column sorting sheet labeled 'hardware' and 'CPU' with ten packet descriptions to classify before the activity.",
   "Extend: Ask fast finishers to design CoPP classes for an edge router, naming which traffic goes in each class and which classes get the tightest limits and why."
  ]
 },
 {
  "t": "Hypervisors: type 1 vs type 2, virtual machines and virtual switching",
  "objectives": [
   "Students will be able to compare type 1 and type 2 hypervisors and classify common examples.",
   "Students will be able to describe the components of a virtual machine and what live migration requires.",
   "Students will be able to explain how a virtual switch connects VMs to each other and to the physical network.",
   "Students will be able to specify the physical switch configuration needed for a hypervisor host."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers about running more than one operating system on a computer."
   ],
   [
    15,
    "Teach",
    "Draw two stacks side by side: hardware, hypervisor, VMs for type 1; hardware, host OS, hypervisor app, VMs for type 2. Sort the example products onto them. Then draw a host with a virtual switch, VMs in two VLANs, and two physical NICs trunked to two switches. Trace same-VLAN and cross-VLAN traffic."
   ],
   [
    15,
    "Activity",
    "Run the 'Where does the frame go' whiteboard activity below in groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect virtualization to network operations."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "Have you ever run a second operating system on your own computer? What was underneath it, and what happened to it when your main computer restarted?",
  "activity": {
   "title": "Where does the frame go",
   "materials": "Whiteboard or large paper per group, markers, printed scenario cards describing a host with VMs in VLANs 110 and 120 and two uplinks, sticky notes.",
   "steps": [
    "Groups draw the host, its virtual switch, four VMs in two VLANs and the uplinks to two physical switches.",
    "For each scenario card, such as web to web on the same host, web to database, and web to the internet, groups trace the frame path in a different marker color and note whether the physical switch sees it.",
    "Groups write the configuration intent for the physical switch ports: trunk or access, allowed VLANs, and whether link aggregation is used, matching the host's NIC teaming.",
    "The teacher announces a live migration to a second host whose uplinks only allow VLAN 110. Groups predict which VMs break after moving and how to fix it."
   ]
  },
  "discussion": [
   "What visibility and security challenges arise when traffic never leaves a host?",
   "Who should own the virtual switch configuration, the server team or the network team, and why?"
  ],
  "exit": [
   [
    "Classify ESXi and VirtualBox by hypervisor type.",
    "ESXi is type 1 (bare metal); VirtualBox is type 2 (hosted)."
   ],
   [
    "What connects a VM's vNIC to the physical network?",
    "A virtual switch in the hypervisor, using the host's physical NICs as uplinks."
   ],
   [
    "How should a physical switch port facing a host with VMs in several VLANs normally be configured?",
    "As an 802.1Q trunk allowing the required VLANs, with link aggregation configured consistently with the host's NIC teaming."
   ]
  ],
  "differentiation": [
   "Support: Provide a pre-drawn host diagram with labels for VM, vNIC, virtual switch, port group, physical NIC and trunk, so students only trace paths during the activity.",
   "Extend: Ask fast finishers to explain how a mismatch between host NIC teaming and switch EtherChannel settings could cause MAC address flapping, and how to prevent it."
  ]
 },
 {
  "t": "Containers compared with virtual machines",
  "objectives": [
   "Students will be able to explain the difference between hardware virtualization (VMs) and operating system virtualization (containers) in terms of the kernel.",
   "Students will be able to compare containers and VMs on size, start time, isolation and operating system compatibility.",
   "Students will be able to choose a VM, a container or IOS XE application hosting for a given scenario and justify the choice.",
   "Students will be able to describe the role of namespaces, cgroups and an orchestrator such as Kubernetes."
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
    "Draw two stacks side by side: hardware, hypervisor, guest OS plus app for VMs; hardware, host OS kernel, container engine, apps for containers. Point to the kernel in each and say, 'Every difference we discuss comes back to this box.' Cover namespaces, cgroups, images, Kubernetes and IOS XE application hosting and Guest Shell."
   ],
   [
    18,
    "Activity",
    "Run the workload sorting activity in groups of three."
   ],
   [
    5,
    "Discuss",
    "Pull the class back together and use the discussion questions, focusing on cards where groups disagreed."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your laptop can run a Linux VM and a Docker container. Which one do you think starts faster, and why?",
  "activity": {
   "title": "Workload sorting: VM, container or on-box",
   "materials": "Printed cards (one workload per card), whiteboard divided into three columns: VM, Container, IOS XE app hosting or Guest Shell; sticky notes.",
   "steps": [
    "Prepare about 12 cards, such as 'legacy Windows accounting server', 'microservice updated daily', 'Python script that reacts to interface events on a switch', 'tenant workloads that must be strongly separated', 'packet capture agent on a Catalyst switch', 'CI pipeline test runner'.",
    "Groups sort the cards into the three columns and write one sentence on a sticky note explaining each placement using the word kernel, isolation or start time.",
    "Each group presents two placements; other groups may challenge with a reason.",
    "Reveal a reference sort and highlight cards that could reasonably fit two columns, such as containers inside a VM."
   ]
  },
  "discussion": [
   "Why might a security team insist that containers from different customers run in separate VMs?",
   "What practical problems does running a tool directly on a switch solve, and what new risks might it add?"
  ],
  "exit": [
   [
    "What is the key architectural difference between a VM and a container?",
    "A VM runs its own guest OS kernel on virtual hardware; containers share the host's kernel."
   ],
   [
    "Name one advantage and one disadvantage of containers compared with VMs.",
    "Advantage: smaller and faster to start, higher density. Disadvantage: weaker isolation and must match the host OS family."
   ],
   [
    "Which IOS XE feature lets you run Python scripts in a Linux environment on the device?",
    "Guest Shell."
   ]
  ],
  "differentiation": [
   "Support: give struggling students the house versus apartment analogy card and a partially completed comparison table (size, start time, isolation, OS choice) to fill in before the sort.",
   "Extend: ask fast finishers to sketch how a Kubernetes cluster running inside VMs on two hosts would connect containers across hosts, and name where an overlay network appears."
  ]
 },
 {
  "t": "VRF and VRF-Lite: separate routing tables, overlapping addresses, per-VRF routing",
  "objectives": [
   "Students will be able to explain how VRFs create separate routing and forwarding tables and allow overlapping addresses.",
   "Students will be able to compare VRF-Lite with MPLS Layer 3 VPNs in terms of how VRFs are carried between routers.",
   "Students will be able to read and correct an IOS XE VRF configuration, including the order of vrf forwarding and IP addressing.",
   "Students will be able to apply VRF-aware troubleshooting commands such as show ip route vrf and ping vrf."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take quick answers. Steer toward the idea of separate tables."
   ],
   [
    13,
    "Teach",
    "Draw one router with three colored routing tables: CORP, GUEST, ACQ. Show 10.10.0.0/16 in two tables. Then draw two routers joined by one trunk with subinterfaces .10 and .20 to show VRF-Lite, and contrast with an MPLS cloud carrying everything via MP-BGP. Project the sample configuration and walk through each line."
   ],
   [
    17,
    "Activity",
    "Run the broken configuration hunt in pairs."
   ],
   [
    5,
    "Discuss",
    "Review answers and use the discussion questions about leaking and scale."
   ],
   [
    5,
    "Exit ticket",
    "Collect three written answers on a half sheet."
   ]
  ],
  "warmup": "If a router has only one routing table, what happens when two different networks both use 10.10.0.0/16 and both connect to it?",
  "activity": {
   "title": "Broken VRF configuration hunt",
   "materials": "Projector or printed handout with three short IOS XE configurations and matching show command output; whiteboard for answers.",
   "steps": [
    "Give pairs three scenarios: (1) an interface where ip address appears before vrf forwarding and show ip interface brief shows it unassigned, (2) a technician using ping and show ip route without the vrf keyword, (3) an EIGRP configuration missing the per-VRF address family.",
    "Pairs identify the fault in each and write the corrected commands.",
    "Each pair also writes the static route that would give VRF GUEST a default route toward 10.1.99.1.",
    "Pairs swap with neighbors to check answers, then the teacher reveals the reference configurations."
   ]
  },
  "discussion": [
   "Route leaking makes shared services possible. How would you decide which routes are safe to leak from a guest VRF?",
   "At what point would VRF-Lite become too hard to manage, and what would you move to instead?"
  ],
  "exit": [
   [
    "Why can the same prefix exist in two VRFs on one router?",
    "Each VRF has its own independent routing and CEF table."
   ],
   [
    "What happens to an interface's IP address when you apply vrf forwarding?",
    "It is removed, so you must configure the IP address after assigning the VRF."
   ],
   [
    "Write the command to view the routing table of VRF GUEST.",
    "show ip route vrf GUEST"
   ]
  ],
  "differentiation": [
   "Support: provide a one-page diagram showing a router as three stacked mini routers with color-coded interfaces, and a command card listing each troubleshooting command with and without the vrf keyword.",
   "Extend: ask fast finishers to explain why a route distinguisher alone does not control which VRFs import a route in MPLS VPNs, and what role route targets play."
  ]
 },
 {
  "t": "GRE tunnels: configuration, keepalives, recursive routing problems, MTU and MSS",
  "objectives": [
   "Students will be able to configure a GRE tunnel interface with an overlay address, tunnel source and tunnel destination.",
   "Students will be able to explain why a GRE tunnel can be up/up with a dead peer and how keepalives change that.",
   "Students will be able to diagnose recursive routing from a log message and routing table and propose a fix.",
   "Students will be able to calculate GRE overhead and choose matching ip mtu and ip tcp adjust-mss values."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the envelope warm-up question and connect answers to encapsulation."
   ],
   [
    12,
    "Teach",
    "Draw two routers with an internet cloud. Label underlay addresses in one color and overlay tunnel and LAN subnets in another. Walk through the configuration, then animate recursive routing with arrows: the route to 203.0.113.2 flips to Tunnel0 and the tunnel drops. Finish with the overhead arithmetic: 1500, minus 24, then why 1400 and 1360."
   ],
   [
    18,
    "Activity",
    "Run the tunnel triage stations in pairs."
   ],
   [
    5,
    "Discuss",
    "Debrief the three stations using the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions individually."
   ]
  ],
  "warmup": "If you put a letter inside a second envelope addressed to another office, what does the mail carrier see, and what problem might the extra envelope cause if there is a weight limit?",
  "activity": {
   "title": "Tunnel triage stations",
   "materials": "Three printed station cards with log excerpts and show command output, whiteboard, student laptops with a browser optional for a free online subnet calculator.",
   "steps": [
    "Station 1 shows a log with repeated recursive routing messages and an EIGRP configuration with network 0.0.0.0. Pairs identify the cause and rewrite the network statements.",
    "Station 2 shows a tunnel that is up/up while the far router is powered off. Pairs explain why and add the keepalive command.",
    "Station 3 describes uploads stalling while pings work. Pairs compute overhead and write the ip mtu and adjust-mss commands, then show the df-bit ping that proves the fix.",
    "Pairs rotate every five minutes, then compare answers with another pair before the debrief."
   ]
  },
  "discussion": [
   "Why is a routing protocol's hello often a better failure detector for a tunnel than GRE keepalives alone?",
   "Why do many designs choose an MTU of 1400 even before IPsec is added?"
  ],
  "exit": [
   [
    "What three things does a basic GRE tunnel interface need?",
    "A tunnel IP address, a tunnel source and a tunnel destination."
   ],
   [
    "How do you prevent recursive routing on a GRE tunnel?",
    "Keep the underlay (tunnel source and destination networks) out of the routing protocol running over the tunnel, for example with filtering, separate processes or static underlay routes."
   ],
   [
    "A tunnel uses ip mtu 1380. What adjust-mss value matches it?",
    "1340, the MTU minus 40 bytes."
   ]
  ],
  "differentiation": [
   "Support: give students a color-coded diagram template with underlay and overlay labeled, and a worked overhead calculation they can follow step by step.",
   "Extend: ask fast finishers to calculate how the overhead changes if IPsec is added and explain why a single fixed MTU value is used in practice rather than an exact calculation."
  ]
 },
 {
  "t": "IPsec: IKE phases, tunnel vs transport mode, crypto maps vs tunnel protection",
  "objectives": [
   "Students will be able to describe what IKE phase 1 and phase 2 each negotiate and identify which phase failed from show command output.",
   "Students will be able to compare ESP and AH, including behavior through NAT and the ports used by IKE and NAT-T.",
   "Students will be able to distinguish tunnel mode from transport mode and choose the right one for a scenario.",
   "Students will be able to contrast crypto maps with tunnel protection and explain which supports routing protocols."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student ideas about what two strangers need to agree on before sharing secrets."
   ],
   [
    13,
    "Teach",
    "Draw a timeline between two routers: phase 1 messages building the IKE SA, then phase 2 inside it building two one-way IPsec SAs. Then draw two packet diagrams for tunnel and transport mode with the new header highlighted. Finish with a two-column table: crypto map versus tunnel protection."
   ],
   [
    17,
    "Activity",
    "Run the negotiation role-play followed by the output reading cards."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the role-play to real troubleshooting."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Two people who have never met need to send each other secret messages through a public mailroom. What do they need to agree on before the first secret message is sent?",
  "activity": {
   "title": "IKE negotiation role-play and output reading",
   "materials": "Printed proposal cards (encryption, hash, authentication, DH group, lifetime values), printed show crypto output cards, whiteboard.",
   "steps": [
    "Pairs play two routers. Each receives a set of proposal cards; some pairs are secretly given one mismatched value such as a different DH group.",
    "Pairs compare cards aloud as phase 1. If everything matches they write 'IKE SA up, QM_IDLE' on a sticky note; if not, they write the state they would see and the mismatched value.",
    "Matching pairs continue to phase 2 by agreeing on a transform set and mirror-image traffic ACLs, then draw the two one-way SAs.",
    "Groups then read four output cards (MM_NO_STATE, QM_IDLE with no IPsec SAs, encaps rising with decaps at zero, healthy counters) and name the likely fault for each."
   ]
  },
  "discussion": [
   "Why are IPsec SAs one-directional, and what does that mean when you read encrypt and decrypt counters?",
   "When might an organization still keep a crypto map instead of moving to tunnel protection?"
  ],
  "exit": [
   [
    "What does IKE phase 1 create, and what does phase 2 create?",
    "Phase 1 creates the authenticated IKE (ISAKMP) SA control channel; phase 2 creates the IPsec SAs that protect user data."
   ],
   [
    "Why does AH fail through NAT?",
    "AH's integrity check covers the outer IP header, which NAT changes, so the check fails."
   ],
   [
    "Which configuration method encrypts everything routed into a tunnel interface?",
    "Tunnel protection with an IPsec profile."
   ]
  ],
  "differentiation": [
   "Support: provide a fill-in timeline handout with the phase names, message counts and SA types partly completed, and a glossary card for ESP, AH, NAT-T and SA.",
   "Extend: ask fast finishers to compare the IKEv1 exchange with the IKEv2 IKE_SA_INIT and IKE_AUTH exchange and explain what IKEv2 accomplishes in four messages."
  ]
 },
 {
  "t": "GRE over IPsec and virtual tunnel interfaces for routing protocols over VPNs",
  "objectives": [
   "Students will be able to explain why routing protocols fail across classic crypto maps and succeed across GRE over IPsec or a VTI.",
   "Students will be able to compare GRE over IPsec with a static VTI on overhead, protocol support and multipoint capability.",
   "Students will be able to read a VTI configuration and identify the lines that make it a VTI rather than GRE over IPsec.",
   "Students will be able to choose between a VTI, GRE over IPsec and DMVPN for a given site design."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and recap: what does GRE give us, and what does IPsec give us?"
   ],
   [
    12,
    "Teach",
    "Draw three packet stacks on the board: crypto map (ESP around original packet), GRE over IPsec (ESP around GRE around original packet), VTI (ESP around original packet, but on a tunnel interface). Project the VTI configuration and ask students which single line would turn it into GRE over IPsec."
   ],
   [
    18,
    "Activity",
    "Run the design consultancy activity in small groups."
   ],
   [
    5,
    "Discuss",
    "Groups share their recommendations; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "GRE gives us routing over a tunnel and IPsec gives us encryption. What would you need to do to get both at once?",
  "activity": {
   "title": "VPN design consultancy",
   "materials": "Printed client brief cards (four different companies), whiteboard or poster paper, markers.",
   "steps": [
    "Give each group a client brief: one site pair with IPv4 only and QoS needs; one pair that must carry IPv4 and IPv6 on a single tunnel; a hub with 60 remote peers that should not each need hub configuration; 30 branches needing direct spoke-to-spoke tunnels.",
    "Groups choose static VTI, GRE over IPsec, dynamic VTI or DMVPN, and sketch the packet stack and tunnel layout.",
    "Each group writes the key tunnel interface lines for their choice and lists two verification commands.",
    "Groups present for two minutes each; others ask one question about overhead or protocol support."
   ]
  },
  "discussion": [
   "Why might an organization accept the extra overhead of GRE over IPsec instead of using a VTI?",
   "What still has to be configured correctly for IKE even when you use tunnel protection, and why is that easy to forget?"
  ],
  "exit": [
   [
    "Which design has less overhead, GRE over IPsec or a static VTI, and why?",
    "A static VTI, because it has no GRE header."
   ],
   [
    "Name one thing GRE over IPsec can do that a VTI cannot.",
    "Carry multiple protocols over one tunnel or support multipoint GRE for DMVPN."
   ],
   [
    "Which command shows whether packets are being encrypted and decrypted across the tunnel?",
    "show crypto ipsec sa"
   ]
  ],
  "differentiation": [
   "Support: give struggling students a matching card set pairing each design with its packet stack diagram and a one-line description before the design activity.",
   "Extend: ask fast finishers to explain how a dynamic VTI on a hub reduces configuration compared with static VTIs and what must still be unique per remote peer."
  ]
 },
 {
  "t": "LISP: EID, RLOC, map server and map resolver, ITR and ETR",
  "objectives": [
   "Students will be able to explain the difference between an EID and an RLOC and why separating them helps mobility and scale.",
   "Students will be able to describe the roles of the map server, map resolver, ITR, ETR, xTR, PITR and PETR.",
   "Students will be able to sequence the Map-Register, Map-Request and Map-Reply messages in a packet flow.",
   "Students will be able to state LISP's role as the SD-Access control plane and VXLAN's role as its data plane."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers about what changes when someone moves house."
   ],
   [
    12,
    "Teach",
    "Draw two sites with hosts, edge routers labeled with RLOC loopbacks, an underlay cloud and a mapping system box labeled MS/MR. Walk through registration first, then a lookup and encapsulated packet, using arrows numbered in order. End with a host moving between sites."
   ],
   [
    18,
    "Activity",
    "Run the human LISP role-play."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the role-play to SD-Access."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three questions on index cards."
   ]
  ],
  "warmup": "When you move to a new apartment, your name stays the same but your address changes. How do friends find you, and what would happen if your name and address were the same thing?",
  "activity": {
   "title": "Human LISP role-play",
   "materials": "Name badges or sticky notes for roles (two hosts, ITR, ETR, map server, map resolver), index cards as packets and messages, a whiteboard to act as the map server's table.",
   "steps": [
    "Assign roles. The ETR walks to the map server and hands over a Map-Register card listing its EID prefix and RLOC; the map server writes the mapping on the whiteboard.",
    "A host hands a packet card addressed to a remote EID to its ITR. The ITR checks its empty map cache, sends a Map-Request card to the map resolver, which relays it, and receives a Map-Reply.",
    "The ITR writes the RLOC on the outside of a larger envelope, places the packet card inside and walks it to the ETR, which opens it and delivers it to the host.",
    "Move a host to a new ETR and have the class work out which messages must happen next and who updates whom."
   ]
  },
  "discussion": [
   "How is LISP's pull model similar to DNS, and how is it different from how OSPF shares routes?",
   "Why does keeping EIDs out of the underlay make the core network more stable?"
  ],
  "exit": [
   [
    "What does an RLOC identify?",
    "The location: the underlay address of the LISP router the endpoint sits behind."
   ],
   [
    "Which device sends Map-Requests, and to which component?",
    "The ITR, to the map resolver."
   ],
   [
    "In SD-Access, which protocol is the control plane and which is the data plane?",
    "LISP is the control plane; VXLAN is the data plane."
   ]
  ],
  "differentiation": [
   "Support: give students a two-column card listing 'who' (EID) and 'where' (RLOC) with examples, and a numbered flow diagram with blank message names to fill in.",
   "Extend: ask fast finishers to explain the role of a PITR and PETR when a LISP site must reach a non-LISP network, and compare it to an SD-Access border node."
  ]
 },
 {
  "t": "VXLAN: VNI, VTEP, UDP encapsulation, overlay vs underlay",
  "objectives": [
   "Students will be able to explain the two VLAN limitations VXLAN solves.",
   "Students will be able to describe the VXLAN encapsulation built by a VTEP, including the VNI size and UDP port 4789.",
   "Students will be able to calculate why the underlay MTU must be raised and identify the symptom of an MTU mismatch.",
   "Students will be able to distinguish underlay from overlay and compare flood-and-learn with BGP EVPN and LISP control planes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about running out of VLANs and the risks of stretching them."
   ],
   [
    12,
    "Teach",
    "Draw a spine-leaf fabric with two leaves as VTEPs and loopback addresses. Build the packet on the board from the inside out: original frame, VXLAN header with VNI, UDP 4789, outer IP, outer Ethernet. Add up the overhead to about 50 bytes. Label the underlay and the overlay in different colors."
   ],
   [
    18,
    "Activity",
    "Run the build-a-packet card activity and MTU puzzle."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare control planes."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A company has used VLAN IDs for 15 years and now needs thousands more segments across many rooms. What limits will it hit with VLANs and trunks?",
  "activity": {
   "title": "Build a VXLAN packet",
   "materials": "Printed header cards (original Ethernet frame, VXLAN header with VNI field, UDP header with port fields, outer IP header, outer Ethernet header) with byte sizes written on them, tape, whiteboard.",
   "steps": [
    "Groups receive shuffled header cards and must tape them in the correct order from outermost to innermost as a VTEP would send them.",
    "Groups fill in the fields for a scenario: VNI 10100, source VTEP 10.0.0.1, destination VTEP 10.0.0.4, destination UDP port, and explain how the source port is chosen.",
    "Groups add the overhead bytes and decide the minimum underlay MTU for a host sending 1500-byte packets.",
    "Present the MTU puzzle: one underlay link left at 1500. Groups predict which traffic fails and why, then share answers."
   ]
  },
  "discussion": [
   "Why does a control plane such as BGP EVPN reduce flooding compared with flood-and-learn?",
   "VXLAN has no encryption. Where would you add confidentiality in a fabric, and what would it cost?"
  ],
  "exit": [
   [
    "How many bits is a VNI, and roughly how many segments does it allow?",
    "24 bits, about 16 million segments."
   ],
   [
    "What is the VXLAN destination UDP port?",
    "4789."
   ],
   [
    "Why must the underlay MTU be larger than 1500?",
    "VXLAN adds about 50 bytes of headers, and full-size frames would otherwise exceed the link MTU."
   ]
  ],
  "differentiation": [
   "Support: provide a partially completed packet diagram with the header order shown and only the field values and byte counts left blank.",
   "Extend: ask fast finishers to explain what a Layer 3 VNI is used for and how a distributed anycast gateway changes where routing happens in the fabric."
  ]
 },
 {
  "t": "Layer 2: static and dynamic 802.1Q trunking (DTP), allowed VLANs and native VLAN",
  "objectives": [
   "Students will be able to explain how 802.1Q tagging carries multiple VLANs over a trunk and the role of the native VLAN.",
   "Students will be able to predict the trunking result for any combination of DTP modes.",
   "Students will be able to modify an allowed VLAN list safely using add and remove.",
   "Students will be able to apply defenses against switch spoofing and double-tagging VLAN hopping."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about one cable serving many VLANs and record ideas."
   ],
   [
    10,
    "Teach",
    "Draw a frame and insert the 4-byte tag, labeling VLAN ID and CoS bits. Draw a DTP mode grid on the board (trunk, desirable, auto, access on both axes) and fill in two cells together. Show the allowed vlan replace pitfall live on the projector with sample output, then draw the double-tagging path across two switches."
   ],
   [
    20,
    "Activity",
    "Run the DTP grid and change-request activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions and review the security defenses."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three questions on a sticky note."
   ]
  ],
  "warmup": "Two switches in different buildings must both carry VLANs 10, 20 and 30, but there is only one cable between them. How could one cable keep the three VLANs separate?",
  "activity": {
   "title": "DTP grid and change requests",
   "materials": "Printed blank DTP result grid, printed change-request cards with current show interfaces trunk output, whiteboard.",
   "steps": [
    "Pairs complete the full DTP grid (trunk, dynamic desirable, dynamic auto, access) predicting trunk, access or misconfiguration for each pair, then compare with another pair.",
    "Pairs receive three change-request cards, for example 'add VLAN 50 to an uplink that carries 10 and 20', 'remove VLAN 30', 'change the native VLAN to 999 on both ends', and write the exact commands.",
    "Pairs read a log excerpt showing a CDP native VLAN mismatch and identify which side to change.",
    "Pairs write a hardened configuration for one user port and one trunk port, including nonegotiate and an unused native VLAN, and the teacher reviews two examples on the projector."
   ]
  },
  "discussion": [
   "Why would Cisco make DTP available at all if best practice is to turn it off?",
   "Double tagging is a one-way attack. Why is it still a real risk worth defending against?"
  ],
  "exit": [
   [
    "What is the result of dynamic desirable on one end and dynamic auto on the other?",
    "A trunk forms, because the desirable side initiates."
   ],
   [
    "Which command adds VLAN 60 to a trunk without removing existing VLANs?",
    "switchport trunk allowed vlan add 60"
   ],
   [
    "Name two defenses against VLAN hopping attacks.",
    "Disable DTP with switchport mode access or nonegotiate; set the native VLAN to an unused VLAN or tag the native VLAN; keep users out of VLAN 1."
   ]
  ],
  "differentiation": [
   "Support: provide a partially filled DTP grid with the rule 'at least one side must ask' printed on it, and a command card showing allowed vlan, add and remove side by side.",
   "Extend: ask fast finishers to explain the three VLAN lists shown by show interfaces trunk and give a reason a VLAN could be allowed but not forwarding."
  ]
 },
 {
  "t": "EtherChannel: LACP, PAgP and static; member consistency; load balancing",
  "objectives": [
   "Students will be able to predict whether a bundle forms for any combination of LACP, PAgP and on modes.",
   "Students will be able to list the settings that must match on member ports and interpret the flags in show etherchannel summary.",
   "Students will be able to explain hash-based load balancing and choose a load-balance method for a given traffic pattern.",
   "Students will be able to describe how a Layer 3 EtherChannel is configured."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show two switches joined by four cables on the board and ask what STP does to those links. Collect answers and confirm that three would be blocked without EtherChannel."
   ],
   [
    12,
    "Teach",
    "Explain the three methods and the initiate-or-respond logic, building a 5 by 5 mode grid (active, passive, desirable, auto, on) on the board with the class. Then cover member consistency, the summary flags, and hashing, stressing that one flow uses one link."
   ],
   [
    16,
    "Activity",
    "Run the bundle detective activity in pairs, then review answers as a class."
   ],
   [
    7,
    "Discuss",
    "Lead the discussion questions, drawing out why static mode is risky and why hash choice depends on traffic direction."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "If you connect two switches with four cables to get more bandwidth and do nothing else, how many of those cables actually forward traffic, and why?",
  "activity": {
   "title": "Bundle detective",
   "materials": "Printed case cards the teacher prepares (each with a short configuration snippet for both switches and a show etherchannel summary excerpt), whiteboard, markers.",
   "steps": [
    "Give each pair six case cards, for example: passive on both sides; active and passive; desirable and active; on and active; one member in a different access VLAN; a bundle with hash dst-ip carrying traffic from many clients to one server.",
    "For each card, pairs decide whether the bundle forms, which flags they expect (P, s, I, SU), and what single change would fix any problem.",
    "Pairs write the corrected command for each broken case, such as channel-group 1 mode active or port-channel load-balance src-dst-ip.",
    "Two pairs compare answers and resolve disagreements, then the teacher reveals the answers on the board and asks one pair per card to explain the reasoning."
   ]
  },
  "discussion": [
   "Why might a team choose mode on despite its risks, and what safeguards would you want if they did?",
   "If one large backup flow must run faster than a single member link, what options other than EtherChannel could help?"
  ],
  "exit": [
   [
    "Does LACP passive on both sides form a bundle?",
    "No; passive only responds, so with no initiator the ports stay stand-alone."
   ],
   [
    "A member shows s in show etherchannel summary. What is the most likely cause?",
    "It is suspended because a setting such as speed, duplex, switchport mode or VLANs does not match the other members."
   ],
   [
    "Most traffic goes from many clients to one router over a bundle. Which load-balance method is better, dst-mac or src-dst-ip?",
    "src-dst-ip, because it includes the varying source addresses, so flows spread across members instead of all hashing to one link."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a printed mode grid with the rule 'at least one side must initiate, and protocols must match' at the top, and let them fill it in before attempting the case cards.",
   "Extend: ask fast finishers to explain why bundles with three members can distribute traffic unevenly, and to design a Layer 3 EtherChannel configuration between two distribution switches."
  ]
 },
 {
  "t": "Spanning tree: RSTP and MST, port roles, root placement, BPDU guard, root guard, loop guard",
  "objectives": [
   "Students will be able to elect the root bridge and assign root, designated and alternate port roles in a small topology.",
   "Students will be able to explain how RSTP converges faster than 802.1D and how MST maps VLANs to instances and forms regions.",
   "Students will be able to configure deliberate root placement for a VLAN.",
   "Students will be able to choose between BPDU guard, root guard and loop guard for a given port and failure."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and let students discuss with a neighbor before sharing answers."
   ],
   [
    12,
    "Teach",
    "Walk through bridge ID, root election and the Cost, Bridge, Port tie-breakers on a three-switch triangle. Introduce RSTP roles and states, the proposal and agreement idea, MST regions, and root placement commands."
   ],
   [
    15,
    "Activity",
    "Run the human spanning tree and guard selection activity."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to compare the three guard features and the risk of default priorities."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Ethernet frames have no time-to-live field. What do you think happens if a broadcast frame enters a loop of three switches?",
  "activity": {
   "title": "Human spanning tree and guard selection",
   "materials": "Printed name cards for four switches showing a priority and MAC address, string or tape to mark links on the floor or a large whiteboard diagram, sticky notes in three colors, a printed list of six port scenarios.",
   "steps": [
    "Four volunteers hold switch cards and stand in a square with a diagonal link; the teacher writes link costs on the board, such as 4 for 1 Gbps and 19 for 100 Mbps.",
    "The class elects the root by lowest bridge ID, then each switch chooses its root port using cost, then sender bridge ID, then sender port ID. Students place sticky notes on each link end: green for root port, blue for designated, red for alternate.",
    "The teacher cuts one link and asks which alternate port takes over and why RSTP can do this quickly.",
    "Pairs then read six port scenarios (user desk jack, distribution downlink to access switch, access uplink to secondary distribution over fiber, and so on) and assign BPDU guard, root guard or loop guard to each, writing the interface command.",
    "The class reviews answers, and the teacher asks two pairs to change the root to a distribution switch using root primary and root secondary."
   ]
  },
  "discussion": [
   "Why is leaving all bridge priorities at their defaults a risk, even if the network works today?",
   "When would MST be a better choice than Rapid PVST+, and what operational discipline does MST require?"
  ],
  "exit": [
   [
    "Two switches have priority 32768. Switch A's MAC ends in 00AA and switch B's ends in 00BB. Which is root?",
    "Switch A, because with equal priority the lower MAC address gives the lower bridge ID."
   ],
   [
    "Which feature err-disables a port when it receives any BPDU, and where is it used?",
    "BPDU guard, on PortFast access ports facing end hosts."
   ],
   [
    "What happens when a port with loop guard stops receiving BPDUs?",
    "It moves to loop-inconsistent (blocking) instead of becoming designated, and recovers when BPDUs return."
   ]
  ],
  "differentiation": [
   "Support: provide a step-by-step election worksheet with blanks for bridge IDs, path costs and the tie-breaker used, plus a one-line card for each guard feature describing its trigger and its reaction.",
   "Extend: ask fast finishers to design an MST configuration with two instances that load-shares VLANs across two distribution switches, listing exactly what must match on every switch in the region."
  ]
 },
 {
  "t": "EIGRP vs OSPF: algorithms, metrics, path selection, load balancing, summarization",
  "objectives": [
   "Students will be able to explain the difference between link-state SPF in OSPF and DUAL in EIGRP, including feasible successors.",
   "Students will be able to compare OSPF cost and the EIGRP composite metric and fix an OSPF reference bandwidth problem.",
   "Students will be able to predict the installed route using administrative distance and OSPF path type order.",
   "Students will be able to state where each protocol can summarize and which supports unequal-cost load balancing."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers in two columns labeled map and directions."
   ],
   [
    13,
    "Teach",
    "Contrast LSAs, the LSDB and SPF with DUAL, successors and the feasibility condition. Cover metrics and the reference bandwidth trap, then administrative distance, OSPF path type order, ECMP versus variance, and summarization locations."
   ],
   [
    15,
    "Activity",
    "Run the route selection card sort in small groups."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions, connecting design choices to the merger scenario."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Would you rather navigate a city with a complete map that everyone shares, or by asking each neighbor how far they are from your destination? What are the trade-offs of each?",
  "activity": {
   "title": "Route selection card sort",
   "materials": "Printed scenario cards the teacher prepares, a two-column comparison grid on the whiteboard (OSPF and EIGRP), sticky notes, markers.",
   "steps": [
    "Groups of three sort 12 statement cards into OSPF, EIGRP or both, for example 'uses SPF', 'uses DUAL', 'summarizes only on ABR or ASBR', 'supports variance', 'IP protocol 88', 'IP protocol 89', 'equal-cost multipath', 'default reference bandwidth 100 Mbps'.",
    "Groups then solve four route selection cards, each showing the same prefix from two sources or path types, and write which route is installed and the rule that decided it.",
    "One card shows an EIGRP topology table with a successor and two other paths; groups determine which paths are feasible successors and what variance value would use them.",
    "Groups post their sticky notes on the board grid, and the teacher reviews any disagreements with the whole class."
   ]
  },
  "discussion": [
   "In a merger like the one in the hook, what factors besides technical features might push a team toward OSPF or EIGRP?",
   "Why does OSPF's requirement for an identical LSDB inside an area make it more predictable to troubleshoot, and what does it cost in flexibility?"
  ],
  "exit": [
   [
    "Which protocol supports unequal-cost load balancing, and with which command?",
    "EIGRP, with the variance command, using only feasible successors."
   ],
   [
    "A prefix is learned from internal EIGRP and from OSPF. Which is installed?",
    "Internal EIGRP, because its administrative distance of 90 is lower than OSPF's 110."
   ],
   [
    "On which OSPF routers can you summarize, and with what commands?",
    "On ABRs with area range for inter-area routes and on ASBRs with summary-address for external routes."
   ]
  ],
  "differentiation": [
   "Support: give students a one-page comparison table with blanks to fill (algorithm, metric, AD, summarization location, load balancing, protocol number, multicast address) before the card sort.",
   "Extend: ask fast finishers to calculate OSPF costs for 100 Mbps, 1 Gbps and 10 Gbps links with a reference bandwidth of 100000 and explain what happens if one router is left at the default."
  ]
 },
 {
  "t": "EIGRP: feasible successors, variance, stub routing",
  "objectives": [
   "Students will be able to calculate feasible distance and identify the successor from a topology table.",
   "Students will be able to apply the feasibility condition to decide which backup paths are feasible successors.",
   "Students will be able to predict which paths a given variance value installs.",
   "Students will be able to explain how eigrp stub and summarization limit query scope and stuck-in-active risk."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect two or three answers. Note on the board any answers that mention 'closer' or 'loop', since they lead straight to the feasibility condition."
   ],
   [
    15,
    "Teach",
    "Draw a four-router diagram with metrics. Walk through RD versus FD, mark the successor, then test each other path with the rule 'RD strictly less than FD'. Show a sample `show ip eigrp topology` entry and point out the (FD/RD) pairs. Then explain active routes, queries and SIA, and finish with variance and stub routing."
   ],
   [
    15,
    "Activity",
    "Run the topology-table card sort described in the activity. Circulate and ask each group to justify one decision aloud."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the math to design choices at hub sites."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on a sticky note before leaving."
   ]
  ],
  "warmup": "Your car's navigation suggests a detour. How could you tell, without seeing a map, that the detour will not send you back past your own starting point?",
  "activity": {
   "title": "Feasible or not: topology table card sort",
   "materials": "Printed cards, each showing one destination with a successor FD and three or four candidate paths listed as (FD/RD); whiteboard; markers.",
   "steps": [
    "Form groups of three and give each group a set of six cards.",
    "For each card, groups mark the successor, label each other path as feasible successor or not, and write the reason using the RD versus FD comparison.",
    "Teacher announces a variance value (for example 2, then 3). Groups mark which paths would be installed and check maximum-paths limits printed on the card.",
    "Teacher reveals one card where a non-feasible path has a metric inside the variance; groups explain why it is still not installed.",
    "Each group draws one hub-and-branch scenario on the whiteboard and marks where they would place eigrp stub and summarization."
   ]
  },
  "discussion": [
   "Why does EIGRP insist on strictly less than instead of less than or equal in the feasibility condition?",
   "What are the tradeoffs of unequal-cost load balancing with variance compared with simply adding bandwidth to the primary link?",
   "In a network with hundreds of branches, what would happen during a hub link failure if no branch were configured as a stub?"
  ],
  "exit": [
   [
    "A backup path shows (6000/2800) and the successor FD is 3000. Is the backup a feasible successor?",
    "Yes; its RD of 2800 is strictly less than the FD of 3000."
   ],
   [
    "With variance 2 and a successor FD of 3000, would that backup be installed?",
    "No; its FD of 6000 is not less than 2 times 3000."
   ],
   [
    "Where is eigrp stub configured, and what problem does it reduce?",
    "On the branch router; it stops the hub from querying it, which reduces query scope and stuck-in-active events."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column worksheet with RD and FD already filled in so they only perform the comparison, and repeat the 'neighbor closer than me' sentence as an anchor.",
   "Extend: Ask fast finishers to design a topology where a route goes active, then show how adding a summary on a distribution router stops the queries from reaching the far side."
  ]
 },
 {
  "t": "OSPFv2 and OSPFv3: multi-area, adjacencies, network types, area types (stub, totally stubby, NSSA), summarization and filtering",
  "objectives": [
   "Students will be able to identify ABRs, ASBRs and the LSA types each generates in a multi-area diagram.",
   "Students will be able to troubleshoot adjacency problems by matching a stuck state to its likely cause.",
   "Students will be able to compare stub, totally stubby, NSSA and totally NSSA areas by the LSA types they block.",
   "Students will be able to choose the correct summarization or filtering command and explain where it applies."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the board as 'things a small router does not need to know'."
   ],
   [
    15,
    "Teach",
    "Draw area 0 with two attached areas and label ABR and ASBR. Add LSA types 1, 2, 3, 5 and 7 with arrows. Walk through the adjacency states and the matching parameters, then compare network types. Finish with a table of area types and the LSAs each blocks, and contrast area range, filter-list and distribute-list."
   ],
   [
    15,
    "Activity",
    "Run the area design challenge in pairs, then have two pairs present."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to probe design reasoning and OSPFv3 differences."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "If you work in a small branch office, which details about the rest of the company network does your router truly need, and which could it replace with a single 'send everything else to headquarters' rule?",
  "activity": {
   "title": "Area design challenge and stuck-neighbor clinic",
   "materials": "Projector or printed handout with a five-area topology; printed 'neighbor symptom' cards; whiteboard; markers.",
   "steps": [
    "Pairs receive the topology handout, which shows one area with a redistributing router and three areas without one.",
    "Pairs choose an area type for each non-backbone area, writing which LSA types will be present and where the no-summary keyword goes.",
    "Pairs mark the best place for a summary (area range or summary-address) and one place where a filter-list would be appropriate.",
    "Teacher hands each pair three neighbor symptom cards (for example 'stuck in ExStart', 'stuck in Init', '2-Way between two non-DR routers'); pairs write the likely cause and the show command they would use.",
    "Two pairs present their designs; the class challenges any area type that conflicts with an ASBR."
   ]
  },
  "discussion": [
   "Why does OSPF require every non-backbone area to connect to area 0?",
   "When would you accept the extra complexity of an NSSA instead of simply moving the redistributing router into area 0?",
   "What practical differences would you notice when moving a site from OSPFv2 to OSPFv3?"
  ],
  "exit": [
   [
    "Which LSA types are blocked in a totally stubby area?",
    "Type 3 and type 5; only intra-area routes and a default remain."
   ],
   [
    "Two routers sit in ExStart. What is the most likely mismatch?",
    "MTU."
   ],
   [
    "Which command on an ABR prevents specific inter-area routes from reaching another area?",
    "area X filter-list prefix, which filters type 3 LSAs."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page reference grid of LSA types and area types with blanks for students to fill in during the lecture, and pair them with a confident partner for the activity.",
   "Extend: Ask advanced students to explain what happens to a default route in an NSSA versus a totally NSSA, and to write the commands needed to give a plain NSSA a default route."
  ]
 },
 {
  "t": "eBGP between directly connected neighbors: neighbor states and best-path selection",
  "objectives": [
   "Students will be able to describe the BGP neighbor states from Idle to Established and what each indicates.",
   "Students will be able to diagnose a session stuck in Idle or Active by naming likely causes.",
   "Students will be able to apply the BGP best-path order to choose the winning path from a list of candidates.",
   "Students will be able to select the attribute that influences outbound versus inbound traffic."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Collect answers and point out that people use ordered tie-breakers every day, which is exactly what BGP does."
   ],
   [
    15,
    "Teach",
    "Project the sample configuration and explain TCP 179, TTL 1 and the exact-match network command. Draw the state sequence on the board and stress that Active is a failure state. Then write the best-path list vertically, marking each attribute as high-wins or low-wins, and show a sample show ip bgp output with the '>' marker."
   ],
   [
    15,
    "Activity",
    "Run the best-path tournament described in the activity. Circulate and ask groups which attribute decided each round."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect attributes to real two-ISP designs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually and hand them in."
   ]
  ],
  "warmup": "You are choosing between two flights with the same price. What ordered list of questions do you use to decide, and what happens when the first question already gives a clear winner?",
  "activity": {
   "title": "Best-path tournament",
   "materials": "Printed path cards, each listing next hop reachability, weight, local preference, origin source, AS_PATH, origin code and MED for one BGP path; whiteboard; markers.",
   "steps": [
    "Form groups of three. Give each group five rounds, each round being two or three path cards for the same prefix.",
    "For each round, groups walk the best-path list from the top and circle the first attribute that differs, then name the winner.",
    "Include at least one round where a path with a much shorter AS_PATH loses on local preference, and one where MED from two different neighboring ASes should not be compared.",
    "Add a final card showing show ip bgp summary output with one neighbor in Active and one with a prefix count; groups decide which session is up and list two causes for the other.",
    "Groups write their answers on the board and the class resolves any disagreements by pointing to the exact step in the list."
   ]
  },
  "discussion": [
   "Why might an ISP ignore your MED or prepending, and what does that tell you about controlling inbound traffic?",
   "When would weight be the right tool instead of local preference?",
   "What logs or show commands would you gather before calling your provider about a session that will not establish?"
  ],
  "exit": [
   [
    "What does the Active state mean for a BGP neighbor?",
    "The TCP connection attempt failed and the router is retrying; the session is not up."
   ],
   [
    "Path A has local preference 150 and AS_PATH length 4. Path B has local preference 100 and AS_PATH length 1. Weights are equal. Which wins?",
    "Path A, because local preference is checked before AS_PATH length and higher wins."
   ],
   [
    "Which attributes influence inbound traffic into your AS?",
    "AS_PATH prepending and MED."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a laminated strip with the best-path order and arrows showing high-wins or low-wins, and let them use it during the tournament.",
   "Extend: Ask fast finishers to design a two-ISP policy that sends outbound traffic through ISP A but prefers inbound traffic through ISP B, naming each attribute and where it is applied."
  ]
 },
 {
  "t": "Policy-based routing with route maps",
  "objectives": [
   "Students will be able to explain how a route map's sequence, permit and deny statements and implicit deny behave in PBR.",
   "Students will be able to compare set ip next-hop, set ip default next-hop and set interface.",
   "Students will be able to apply a PBR policy to the correct interface and direction, including local traffic.",
   "Students will be able to prevent black-holing with verify-availability and object tracking."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list student ideas on the board. Highlight any that depend on who is sending, not where traffic goes."
   ],
   [
    12,
    "Teach",
    "Walk through route map structure using the guest configuration on the projector. Trace three sample packets through the statements, including one that matches nothing. Contrast the set clauses and explain inbound placement and ip local policy."
   ],
   [
    18,
    "Activity",
    "Run the packet-tracing relay described in the activity, then review the black-hole scenario together."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore design and risk."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on index cards."
   ]
  ],
  "warmup": "A small office has a fast expensive link and a slow cheap link. Which traffic would you send over each, and what information about a packet would you need to make that decision?",
  "activity": {
   "title": "Packet-tracing relay",
   "materials": "Printed route map with three statements and two ACLs; a stack of printed packet cards showing source, destination, size and ingress interface; a printed routing table; whiteboard.",
   "steps": [
    "Form teams of four and give each team the route map, ACLs, routing table and ten packet cards.",
    "Each team member in turn draws a packet card, traces it through the route map statements in sequence order, and writes the chosen next hop and the reason on the board.",
    "Include cards that match a deny statement, cards that match nothing, a card generated by the router itself and a card arriving on an interface without the policy.",
    "Teacher then announces that the PBR next hop's provider network has failed while the link stays up; teams decide what happens to matching packets with and without verify-availability.",
    "Teams compare answers and correct any that treated the implicit deny as a drop."
   ]
  },
  "discussion": [
   "What are the risks of using PBR widely instead of designing the routing protocol to make the right choices?",
   "How would you document a PBR policy so the next engineer is not surprised by traffic that ignores the routing table?",
   "When might set ip default next-hop be safer than set ip next-hop?"
  ],
  "exit": [
   [
    "A packet matches a deny statement in a PBR route map. What happens to it?",
    "It is routed normally using the routing table, not dropped."
   ],
   [
    "Where do you apply a PBR policy for traffic from the guest VLAN?",
    "Inbound on the guest VLAN interface with ip policy route-map."
   ],
   [
    "What feature keeps PBR from sending traffic to a failed next hop?",
    "set ip next-hop verify-availability with a tracked object such as an IP SLA probe."
   ]
  ],
  "differentiation": [
   "Support: Provide a flowchart card showing the decision steps (policy on this interface, first matching statement, permit or deny, set action or routing table) for students to follow while tracing.",
   "Extend: Ask fast finishers to write a route map that sends small packets out one link and large packets out another using match length, with a fallback that avoids black holes."
  ]
 },
 {
  "t": "IP services: NTP and PTP, NAT and PAT, HSRP and VRRP",
  "objectives": [
   "Students will be able to explain NTP stratum and compare NTP with PTP in accuracy and use cases.",
   "Students will be able to identify inside local, inside global, outside local and outside global addresses in a NAT translation.",
   "Students will be able to choose between static NAT, dynamic NAT and PAT for a scenario.",
   "Students will be able to compare HSRP and VRRP, including default preemption, multicast addresses and virtual MACs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about clocks. Use answers to explain why consistent time matters for logs and certificates."
   ],
   [
    15,
    "Teach",
    "Spend about five minutes each on NTP and PTP, NAT and PAT, and HSRP and VRRP. Draw a NAT diagram with the four address terms labeled, and project a show standby brief output to point out priority, preemption and state."
   ],
   [
    15,
    "Activity",
    "Run the three-station rotation described in the activity, five minutes per station."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the three services to an outage story."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If every clock in this building showed a different time, what problems would you have reconstructing the order of events after a fire alarm?",
  "activity": {
   "title": "Three-station IP services rotation",
   "materials": "Three printed station sheets: an NTP associations output with questions, a NAT translations table with blank labels, and an HSRP and VRRP scenario card; sticky notes; whiteboard.",
   "steps": [
    "Divide the class into three groups and place one station sheet at each of three tables.",
    "Station 1: groups read a show ntp associations and show ntp status excerpt and decide which server is in use, the device's stratum and whether it is synchronized.",
    "Station 2: groups label each address in a NAT translation table with inside local, inside global, outside local or outside global, and decide whether each entry is static NAT or PAT.",
    "Station 3: groups read a two-router power-cut scenario and decide which router is active after recovery under HSRP defaults and under VRRP defaults, then write the command to change the HSRP behavior.",
    "Rotate every five minutes; at the end, each group posts one answer per station on the board for whole-class review."
   ]
  },
  "discussion": [
   "Why would an organization pay for PTP-capable switches when NTP is free and widely supported?",
   "What are the security implications of NTP without authentication?",
   "When might you deliberately leave HSRP preemption disabled?"
  ],
  "exit": [
   [
    "In a NAT table, which address is the host's real private address?",
    "Inside local."
   ],
   [
    "After a reboot, a higher-priority HSRP router stays in standby. Why, and what fixes it?",
    "HSRP preemption is off by default; configure standby group preempt."
   ],
   [
    "Which provides sub-microsecond time accuracy, NTP or PTP, and how?",
    "PTP, by using hardware timestamping and boundary or transparent clocks."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a NAT address card that pairs each term with a picture of which side of the router it describes, and a two-row HSRP versus VRRP comparison table to fill in.",
   "Extend: Ask fast finishers to design gateway redundancy with object tracking so an uplink failure triggers failover, and explain how the priority change causes it."
  ]
 },
 {
  "t": "Multicast: IGMPv2/v3, PIM sparse mode, RP, RPF check, SSM",
  "objectives": [
   "Students will be able to distinguish the roles of IGMP, IGMP snooping and PIM.",
   "Students will be able to describe how PIM sparse mode builds a shared tree through the RP and switches to a shortest path tree.",
   "Students will be able to apply the RPF check to decide whether a router forwards or drops a multicast packet.",
   "Students will be able to compare SSM with RP-based sparse mode, including IGMPv3 and the 232.0.0.0/8 range."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and contrast one phone call per listener with a single radio broadcast."
   ],
   [
    15,
    "Teach",
    "Draw a source, an RP, three routers and two receivers. Walk through IGMP joins, the (*,G) join toward the RP, the register, and the switch to the SPT. Then demonstrate the RPF check with arrows and finish with SSM."
   ],
   [
    15,
    "Activity",
    "Run the human multicast tree role-play described in the activity."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect RPF and SSM to design choices."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If you had to deliver the same live lecture to 500 laptops across five buildings, why would sending 500 separate copies be a problem, and where would the copies best be made?",
  "activity": {
   "title": "Human multicast tree",
   "materials": "Printed name cards (Source, RP, R1 to R4, Receiver A and B), string or masking tape for links, a printed unicast routing table card for each router, sticky notes as packets.",
   "steps": [
    "Assign students to roles and lay out the topology on the floor with tape, with each router holding its routing table card.",
    "Receivers send IGMP join sticky notes to their routers; routers pass (*,G) join notes hop by hop toward the RP, marking the shared tree with tape.",
    "The source sends a register note to the RP; the RP forwards packet notes down the shared tree. Then the last-hop router sends an (S,G) join toward the source, and the class marks the new path.",
    "Teacher hands one router a packet note arriving on the wrong interface; that router checks its routing table card and drops it, explaining the RPF check aloud.",
    "Repeat in SSM mode: receivers name the source in their join, and the class sees that the RP is never used."
   ]
  },
  "discussion": [
   "Why is the RPF check based on the unicast routing table, and what problems does that create when routing is asymmetric?",
   "What are the operational benefits of SSM compared with running an RP, and what does it require from receivers?",
   "Where in a campus would you expect IGMP snooping to make the biggest difference?"
  ],
  "exit": [
   [
    "Which protocol does a host use to join a multicast group?",
    "IGMP."
   ],
   [
    "A packet arrives on an interface that is not the best path back to the source. What does the router do?",
    "It drops the packet because it fails the RPF check."
   ],
   [
    "Name two requirements for SSM.",
    "IGMPv3 on receivers (to request a specific source) and a group in the SSM range, 232.0.0.0/8 by default, with ip pim ssm enabled; no RP is needed."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram showing which protocol runs on each link (IGMP at the edge, PIM between routers) and a two-question RPF checklist: where did it arrive, and where is the source in my routing table.",
   "Extend: Ask fast finishers to read a sample show ip mroute entry and explain the incoming interface, outgoing interface list and whether the router is on the shared tree or the shortest path tree."
  ]
 },
 {
  "t": "Diagnose problems with debugs, conditional debugs, ping and traceroute",
  "objectives": [
   "Students will be able to interpret IOS ping result characters and traceroute output, including asterisks.",
   "Students will be able to use extended ping options such as source interface and df-bit to test return paths and MTU.",
   "Students will be able to explain the risks of debugging on production devices and list safe practices.",
   "Students will be able to restrict debug output with conditional debugs and ACLs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers. Steer toward the idea that where a test starts from changes what it proves."
   ],
   [
    12,
    "Teach",
    "Project sample ping and traceroute outputs and decode each character. Draw the branch scenario showing why a WAN-sourced ping succeeds. Then list safe debug practices on the board and show debug condition syntax."
   ],
   [
    18,
    "Activity",
    "Run the troubleshooting ticket triage described in the activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reinforce safe practice."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Your phone can call a friend's phone, but your friend's calls to you never arrive. What does that tell you, and how would you test it?",
  "activity": {
   "title": "Troubleshooting ticket triage",
   "materials": "Printed ticket cards, each with a symptom and one or two output excerpts (ping, traceroute or show logging); a projector; whiteboard.",
   "steps": [
    "Pair students and give each pair five ticket cards, for example a WAN-sourced ping that succeeds while users fail, a traceroute with one row of asterisks mid-path, a tunnel where large transfers stall, and a high-CPU router where someone wants to run debug ip packet.",
    "For each ticket, pairs decide the next command to run and justify why, writing the exact command syntax.",
    "For any ticket that calls for a debug, pairs must also write the safety steps: logging destination, timestamps, condition or ACL, and the command to stop it.",
    "Pairs swap tickets with a neighboring pair and review each other's answers, marking any unsafe step.",
    "Teacher projects model answers and the class discusses differences."
   ]
  },
  "discussion": [
   "Why might a broad debug on a busy router cause more harm than the problem you are trying to solve?",
   "When is a traceroute misleading, and what other tools would you use to confirm a hop is actually failing?",
   "How does a structured troubleshooting method save time compared with jumping straight to debugs?"
  ],
  "exit": [
   [
    "In IOS ping output, what is the difference between '.' and 'U'?",
    "'.' is a timeout with no reply; 'U' means a device returned destination unreachable."
   ],
   [
    "What extended ping options would you use to test for an MTU problem?",
    "A large size such as 1500 with the df-bit set."
   ],
   [
    "Name two practices that make debugging safer on a production router.",
    "Any two of: send output to the buffer instead of the console, use conditional debugs or ACLs, add timestamps, prefer show commands first, and have undebug all ready."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card of ping characters and a short checklist for safe debugging, and let struggling students work on only three tickets with a partner.",
   "Extend: Ask fast finishers to write a complete safe debug procedure for an intermittent BGP flap, including logging, timestamps, conditions, the debug itself and cleanup commands."
  ]
 },
 {
  "t": "SNMP versions (v2c vs v3 authPriv), traps and polling",
  "objectives": [
   "Students will be able to explain polling and notifications, including the UDP ports used.",
   "Students will be able to compare traps and informs in reliability and overhead.",
   "Students will be able to compare SNMPv2c with SNMPv3 and identify the protections of each SNMPv3 security level.",
   "Students will be able to read an SNMPv3 configuration and identify the security level and access restrictions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect answers to scheduled checks (polling) versus alarms (notifications)."
   ],
   [
    15,
    "Teach",
    "Draw an NMS and three devices with arrows for UDP 161 polling and UDP 162 notifications. Contrast traps and informs. Build a three-row table of SNMPv3 security levels, then walk through the sample configuration line by line."
   ],
   [
    15,
    "Activity",
    "Run the audit role-play described in the activity."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore tradeoffs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "How would you keep track of the health of 200 devices: by calling each one every few minutes, by waiting for them to call you when something goes wrong, or both? Why?",
  "activity": {
   "title": "SNMP security audit role-play",
   "materials": "Printed device configuration excerpts (some SNMPv2c with read-write communities, some SNMPv3 with auth only, one with authPriv); auditor checklist cards; whiteboard.",
   "steps": [
    "Split the class into small audit teams and give each team four configuration excerpts and a checklist.",
    "Teams identify the SNMP version, community or user, security level and whether access is restricted by an ACL for each excerpt.",
    "Teams flag each finding as high, medium or low risk and write one remediation per finding, including whether notifications should be informs.",
    "One team member plays the network lead and defends the current configuration while another plays the auditor and asks for evidence.",
    "Teams present their top finding to the class, and the teacher confirms or corrects the security level reading."
   ]
  },
  "discussion": [
   "Why do many organizations still run SNMPv2c, and how can they reduce the risk while they migrate?",
   "What are the costs of using informs everywhere instead of traps?",
   "How do SNMP polling and notifications complement newer approaches such as streaming telemetry?"
  ],
  "exit": [
   [
    "Which SNMPv3 security level provides both authentication and encryption?",
    "authPriv."
   ],
   [
    "On which UDP port does an NMS receive traps and informs?",
    "UDP 162."
   ],
   [
    "What is the key difference between a trap and an inform?",
    "A trap is unacknowledged; an inform is acknowledged by the NMS and resent if not confirmed."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page diagram of polling and notification arrows with ports and a color-coded table of SNMPv3 security levels for students to reference during the audit.",
   "Extend: Ask fast finishers to write a complete SNMPv3 authPriv configuration with a restricted view and informs to an NMS, and explain what show commands they would use to verify it."
  ]
 },
 {
  "t": "Syslog severity levels and logging configuration",
  "objectives": [
   "Students will be able to recall the eight syslog severity levels by number and name.",
   "Students will be able to predict which messages a destination receives for a configured logging level.",
   "Students will be able to parse a Cisco syslog message into timestamp, facility, severity, mnemonic and description.",
   "Students will be able to configure logging destinations, timestamps and source interface following best practice."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about urgency and collect answers. Introduce the idea of a numbered urgency scale."
   ],
   [
    12,
    "Teach",
    "Write the 0 to 7 table on the board with the mnemonic. Demonstrate the 'this level and lower' rule with two examples. Parse a sample message on the projector, then list each destination and its command and default."
   ],
   [
    18,
    "Activity",
    "Run the severity line-up and message sort described in the activity."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect logging choices to real investigations."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Your phone gets 200 notifications a day. If you could rank them from 'drop everything' to 'just for the record', how many levels would you need, and which ones would you let interrupt you?",
  "activity": {
   "title": "Severity line-up and message sort",
   "materials": "Eight large cards showing severity numbers and names; about twenty printed syslog message slips with different facilities and levels; tape; whiteboard.",
   "steps": [
    "Hand the eight severity cards to eight volunteers, shuffled; the class directs them to line up in order from 0 to 7 without notes.",
    "Give pairs a stack of message slips; they identify the severity number in each message and tape it under the matching volunteer.",
    "Teacher announces destination settings, for example logging trap warnings and logging buffered informational; pairs decide which slips reach each destination.",
    "Pairs then write a best-practice logging configuration for a switch: server, level, source interface, timestamps and console setting.",
    "Two pairs read their configurations aloud and the class checks them against the defaults and good practice."
   ]
  },
  "discussion": [
   "Why is leaving console logging at debugging level risky on a busy device?",
   "What could go wrong in an investigation if devices log to a server without NTP synchronization?",
   "Since syslog over UDP is unreliable, which events would you also send by another method, and why?"
  ],
  "exit": [
   [
    "Which levels are sent with logging trap warnings?",
    "Levels 0 through 4."
   ],
   [
    "What is severity level 6 called?",
    "Informational."
   ],
   [
    "Name two best practices for syslog configuration.",
    "Any two of: synchronize clocks with NTP and use detailed timestamps, set logging source-interface, send an appropriate level to a central server, avoid debugging level to the server, and limit console logging."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a printed severity ladder with numbers, names and an arrow labeled 'more severe' to keep on their desks, and let them sort messages with a partner.",
   "Extend: Ask fast finishers to design logging for a campus with different levels per destination and explain how they would use logging facility values to separate core and access switch messages on the server."
  ]
 },
 {
  "t": "Flexible NetFlow: flow records, exporters and monitors",
  "objectives": [
   "Students will be able to explain what a flow is and how NetFlow differs from SNMP interface statistics.",
   "Students will be able to distinguish key (match) and non-key (collect) fields in a flow record.",
   "Students will be able to describe the roles of the flow record, exporter and monitor and the order in which they are configured and applied.",
   "Students will be able to troubleshoot missing flow data using show commands for the cache and exporter."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and contrast a count of visitors with a list of who visited and why."
   ],
   [
    12,
    "Teach",
    "Project the sample configuration and color-code record, exporter, monitor and interface. Explain match versus collect with a small table of packets, and describe the timeouts and the verification commands."
   ],
   [
    18,
    "Activity",
    "Run the flow cache simulation described in the activity."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect NetFlow to security and capacity planning."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A store counter tells you 500 people entered today. What questions could you not answer with that number, and what extra information would you want to record about each visit?",
  "activity": {
   "title": "Flow cache simulation",
   "materials": "A printed list of about 25 packets (source, destination, ports, protocol, size); a printed blank flow cache table; two different printed flow record definitions; whiteboard.",
   "steps": [
    "Pair students and give each pair the packet list and the first flow record, which matches source and destination address, ports and protocol and collects bytes and packets.",
    "Pairs process the packets in order, creating a new cache row when any key field differs and updating counters otherwise.",
    "Give pairs the second record, which matches only source and destination address; they repeat the process and compare the number of flows.",
    "Pairs answer: which record would help a security analyst find a host scanning many ports, and which would be better for a simple top-talkers report.",
    "Finally, project an exporter configuration with a wrong UDP port and a show flow exporter statistics excerpt; pairs identify why the collector sees nothing."
   ]
  },
  "discussion": [
   "How could NetFlow help detect data exfiltration or a port scan that SNMP graphs would miss?",
   "What are the tradeoffs of adding more key fields to a flow record?",
   "When would sampled NetFlow be acceptable, and when would you need every packet counted?"
  ],
  "exit": [
   [
    "Which flow record statement creates a new flow when its value changes?",
    "match, which defines key fields."
   ],
   [
    "Name the three Flexible NetFlow components in configuration order.",
    "Flow record, flow exporter, flow monitor (then apply the monitor to an interface)."
   ],
   [
    "The cache shows flows but the collector receives nothing. Name one likely cause.",
    "A wrong exporter destination or UDP port, a wrong source interface, or an ACL or firewall blocking the export traffic."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-box diagram showing record, exporter and monitor with arrows to the interface and collector, and a partially filled flow cache for the simulation.",
   "Extend: Ask fast finishers to design two flow records, one for security and one for capacity planning, and justify each match and collect field."
  ]
 },
 {
  "t": "SPAN, RSPAN and ERSPAN",
  "objectives": [
   "Students will be able to explain why port mirroring is needed on a switched network.",
   "Students will be able to choose between SPAN, RSPAN and ERSPAN based on where the analyzer is located.",
   "Students will be able to read a SPAN or RSPAN configuration and identify sources, direction and destination.",
   "Students will be able to identify limitations of mirroring, including destination oversubscription, the dedicated destination port and ERSPAN MTU."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about watching traffic on a switch, and confirm that switches forward unicast frames only to the destination port."
   ],
   [
    12,
    "Teach",
    "Draw three scenarios on the board: analyzer on the same switch, on another switch across a trunk, and across a router. Walk through the local SPAN configuration, the RSPAN VLAN steps on both switches and the ERSPAN source and destination sessions."
   ],
   [
    18,
    "Activity",
    "Run the mirror-the-ticket design exercise described in the activity."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore tradeoffs and security."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If you plug a laptop running a packet analyzer into any free port on a switch, what traffic will you see, and why will you probably not see the conversation you care about?",
  "activity": {
   "title": "Mirror-the-ticket design exercise",
   "materials": "Printed ticket cards describing troubleshooting requests and network layouts; printed blank session templates; whiteboard; markers.",
   "steps": [
    "Form groups of three and give each group four ticket cards, such as a server on the same switch as an analyzer, an IDS one trunk away, a branch phone three routed hops from headquarters, and a request to monitor four busy ports with one gigabit destination.",
    "For each ticket, groups choose SPAN, RSPAN or ERSPAN and justify the choice in one sentence.",
    "Groups fill in a session template with sources, direction and destination, including the RSPAN VLAN and trunk changes or the ERSPAN ID, destination IP and origin IP as needed.",
    "For the oversubscription ticket, groups propose how to reduce the mirrored load.",
    "Groups trade templates with another group to check for missing steps, then the teacher reviews one answer per ticket."
   ]
  },
  "discussion": [
   "What security risks come with mirroring traffic, and who should be allowed to configure SPAN sessions?",
   "When would Embedded Packet Capture be a better choice than SPAN?",
   "How might mirrored traffic affect trunk or WAN capacity in an RSPAN or ERSPAN design?"
  ],
  "exit": [
   [
    "The analyzer is on the same switch as the source port. Which mirroring type do you use?",
    "Local SPAN."
   ],
   [
    "What special VLAN configuration does RSPAN require?",
    "A VLAN marked with remote-span, allowed on every trunk between the source and destination switches."
   ],
   [
    "What encapsulation does ERSPAN use to cross a routed network?",
    "GRE."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a decision flowchart (same switch, Layer 2 path, routed path) and a completed SPAN example to model their templates on.",
   "Extend: Ask fast finishers to calculate whether a set of mirrored ports in both directions will oversubscribe a given destination, and to propose a design that avoids mirroring loss."
  ]
 },
 {
  "t": "IP SLA probes and object tracking",
  "objectives": [
   "Students will be able to explain why an IP SLA probe detects path failures that interface tracking misses.",
   "Students will be able to configure and schedule an icmp-echo IP SLA operation and a track object that follows it.",
   "Students will be able to apply a track object to a static route with a floating backup, and to HSRP or VRRP priority.",
   "Students will be able to interpret show ip sla statistics and show track output to confirm failover behavior."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the branch with a green interface and no internet. Collect a few answers on the whiteboard without correcting them yet."
   ],
   [
    15,
    "Teach",
    "Walk through the dual-ISP configuration on the projector line by line: operation, schedule, track with delay, tracked route, floating static. Stress that an unscheduled probe never runs and that the backup needs a higher administrative distance. Briefly list other track clients: HSRP, VRRP, PBR and EEM."
   ],
   [
    15,
    "Activity",
    "Run the failover storyboard activity in pairs. Circulate and ask each pair to explain which line of configuration causes each change in the routing table."
   ],
   [
    5,
    "Discuss",
    "Bring the class together and use the discussion questions, especially how to choose a good probe target and why delay values matter."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand it in at the door."
   ]
  ],
  "warmup": "A branch router shows every interface up/up, but users cannot reach anything on the internet and the backup link carries no traffic. What could be broken, and why does the router not notice?",
  "activity": {
   "title": "Failover storyboard",
   "materials": "Printed copies of the dual-ISP configuration from the lesson, a printed timeline of events (ISP fault at 02:00:00, recovery at 02:20:00), whiteboard or paper, pens.",
   "steps": [
    "Give each pair the configuration and the timeline. Ask them to draw a routing table snapshot before the fault, showing which default route is installed.",
    "Have pairs draw snapshots at 02:00:05, 02:00:15 and 02:00:30, using the frequency, timeout and delay down values to decide when the track goes down and the floating route appears.",
    "Repeat for the recovery at 02:20:00, applying delay up 30 to find when traffic returns to the primary ISP.",
    "Introduce a twist: the probe has no source-interface and can leave through the LTE link. Ask pairs what happens to failover and how to fix it.",
    "Each pair writes the show track and show ip sla statistics output they would expect to see at 02:01:00."
   ]
  },
  "discussion": [
   "What makes a good IP SLA target for an internet uplink, and what could go wrong if you ping a public address reachable through either ISP?",
   "When would you choose state instead of reachability for a track object, and what does the threshold add?",
   "How would you combine two tracks with Boolean logic to fail over only when both a gateway and a remote server are unreachable?"
  ],
  "exit": [
   [
    "What command must be added for a configured IP SLA operation to start sending probes?",
    "ip sla schedule, for example ip sla schedule 10 life forever start-time now."
   ],
   [
    "A tracked default route is removed when its track goes down. What makes the backup route take over?",
    "A floating static route with a higher administrative distance that was hidden while the primary existed is now installed."
   ],
   [
    "Why can interface tracking fail to detect an ISP outage?",
    "The interface to the modem or provider equipment can stay up while the provider network beyond it is down; only an end-to-end probe sees that."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially completed timeline with the first snapshot filled in, and a one-line glossary card for operation, schedule, track and floating static.",
   "Extend: Ask fast finishers to redesign the solution for an HSRP pair, including the track decrement value and preempt, and to add a udp-jitter probe that fails over voice when jitter is too high."
  ]
 },
 {
  "t": "Catalyst Center (formerly DNA Center) workflows: assurance, health scores, AI-driven insights",
  "objectives": [
   "Students will be able to name the Catalyst Center workflows Design, Policy, Provision and Assurance and describe the role of each.",
   "Students will be able to explain how network, client and application health scores are derived from correlated telemetry.",
   "Students will be able to choose the right assurance tool, such as Client 360, Device 360 or path trace, for a described troubleshooting task.",
   "Students will be able to compare AI-driven dynamic baselines with static thresholds."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up ticket aloud and ask students how they would investigate a problem that already disappeared. List their ideas."
   ],
   [
    15,
    "Teach",
    "Introduce the four workflows with a simple lifecycle drawing. Explain telemetry sources and correlation, then health scores, issues, 360 views, path trace and AI baselines. Use the lecture hall example to contrast baselines with static thresholds."
   ],
   [
    15,
    "Activity",
    "Run the ticket triage card sort. Groups match tickets to the workflow and tool, then justify choices."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect assurance with the intent set in Design, Policy and Provision."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on paper."
   ]
  ],
  "warmup": "A user says the wireless did not work for ten minutes this morning, but it works now. What information would you need to find out what really happened, and where would you get it today?",
  "activity": {
   "title": "Ticket triage card sort",
   "materials": "Printed cards: eight short help desk or engineering scenarios, plus cards labeled Design, Policy, Provision, Assurance, Client 360, Device 360, Path trace, AI baseline issue. Tape or a whiteboard.",
   "steps": [
    "Split the class into groups of three or four and give each group the full card set.",
    "Groups read each scenario card (for example: add a new building and its DHCP server; find why a host cannot reach a server; see what a laptop experienced at 9:15; CPU spikes that are unusual for a branch at night) and place it under the matching workflow and tool.",
    "Each group writes one sentence per card explaining why that tool fits better than the others.",
    "Groups swap boards with a neighbor and mark any placement they disagree with.",
    "The teacher reviews the disputed cards with the whole class and confirms the correct matches."
   ]
  },
  "discussion": [
   "Why is correlating data from ISE, switches and wireless controllers more useful than looking at each tool separately?",
   "What are the risks of relying only on static thresholds in a network with very different sites?",
   "If assurance shows a problem caused by a bad template, which workflow would you use to fix it, and why?"
  ],
  "exit": [
   [
    "Which Catalyst Center workflow monitors health and helps troubleshoot?",
    "Assurance."
   ],
   [
    "A user reports a failure that happened an hour ago. Which view lets you look back at that moment?",
    "Client 360, which shows a timeline of the client's history."
   ],
   [
    "How does an AI-driven baseline differ from a static threshold?",
    "It learns normal behavior per site, time and device and flags deviations, rather than alerting only when a fixed value is crossed."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference sheet listing each workflow and tool with a one-line description, and let struggling students sort only four scenario cards first.",
   "Extend: Ask fast finishers to write two new scenario cards that are deliberately ambiguous between two tools, along with an answer key explaining the deciding detail."
  ]
 },
 {
  "t": "NETCONF and RESTCONF for configuration and operational data",
  "objectives": [
   "Students will be able to explain why model-driven programmability with YANG is more reliable than screen-scraping CLI output.",
   "Students will be able to compare NETCONF and RESTCONF by transport, port, encoding, operations and transaction support.",
   "Students will be able to map RESTCONF HTTP methods to actions, including the difference between PUT and PATCH.",
   "Students will be able to choose the appropriate protocol for a given automation scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a short CLI output excerpt on the projector and ask what would happen to a script that reads the fourth column if a new column were added."
   ],
   [
    15,
    "Teach",
    "Introduce YANG as the shared model, then NETCONF (SSH 830, XML, RPCs, hello, datastores, lock, commit) and RESTCONF (HTTPS, JSON or XML, verbs). Show a sample XML edit-config and a sample JSON body side by side and point out that the data structure is the same."
   ],
   [
    15,
    "Activity",
    "Run the protocol match-up in pairs using printed request snippets."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore when each protocol fits."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a half sheet."
   ]
  ],
  "warmup": "A script reads interface counters by counting columns in show interfaces output. After a software upgrade it reports nonsense. Why, and how could the script avoid depending on text layout?",
  "activity": {
   "title": "Protocol match-up",
   "materials": "Printed cards each showing a short request snippet (an XML rpc with edit-config, a hello message, a RESTCONF GET path, a JSON PATCH body, a PUT body, a lock rpc), a blank comparison table on the whiteboard, pens.",
   "steps": [
    "Give each pair a set of snippet cards and a blank table with columns for protocol, transport and port, encoding, and what the request does.",
    "Pairs identify each snippet as NETCONF or RESTCONF and fill in the table row.",
    "For the PUT and PATCH cards, pairs predict what the device configuration looks like afterward, given a starting configuration printed on the card.",
    "Pairs choose which snippets they would use to change 300 devices safely and explain why.",
    "The teacher reveals answers and asks two pairs to explain their PUT versus PATCH predictions."
   ]
  },
  "discussion": [
   "Why might an organization use NETCONF for changes and RESTCONF for dashboards at the same time?",
   "What risks does a stateless protocol without locking introduce when several automation tools touch the same device?",
   "How does model-driven telemetry change monitoring compared with polling devices through RESTCONF GET requests?"
  ],
  "exit": [
   [
    "What transport, port and encoding does NETCONF use?",
    "SSH on TCP port 830 with XML encoding."
   ],
   [
    "Which RESTCONF method merges a change, and which replaces the resource?",
    "PATCH merges; PUT creates or replaces."
   ],
   [
    "Why are both protocols more robust than screen-scraping?",
    "They exchange structured data defined by YANG models, so changes in CLI text layout do not break scripts."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a filled-in example row for one NETCONF and one RESTCONF card and a glossary of datastore, RPC and YANG.",
   "Extend: Ask fast finishers to write the sequence of NETCONF operations, in order, for a safe multi-device change including lock, edit-config, validate, commit and unlock, and to explain what happens if commit fails."
  ]
 },
 {
  "t": "Device access control: line and local user authentication, SSH-only VTY access",
  "objectives": [
   "Students will be able to compare line passwords with local user accounts and explain why individual accounts provide accountability.",
   "Students will be able to identify weak and strong password storage types (type 7 versus type 8 and 9) in a running configuration.",
   "Students will be able to configure SSH-only VTY access, including hostname, domain name, RSA keys, transport input ssh, exec-timeout and access-class.",
   "Students will be able to plan a safe order of changes that avoids locking out the administrator."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up prompt aloud. Ask students to list on the whiteboard everything wrong with a shared Telnet password, then group their answers into confidentiality and accountability."
   ],
   [
    15,
    "Teach",
    "Project the SSH-only configuration and explain each line. Show sample running-config lines with password 7, secret 5 and secret 9 and ask which ones are safe. Emphasize access-class for lines versus ip access-group for interfaces, and the console line."
   ],
   [
    15,
    "Activity",
    "Run the configuration audit in pairs using printed running-config excerpts. Circulate and ask pairs to justify each finding."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on change order and why local accounts still matter with AAA."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Every network technician at a school district logs into every switch with Telnet and the same password. List every risk you can think of. Which risks are about secrecy, and which are about knowing who did what?",
  "activity": {
   "title": "Running-config audit",
   "materials": "Three printed running-config excerpts the teacher prepares (one with a shared line password and Telnet, one with service password-encryption and username password 7, one nearly correct but missing access-class and exec-timeout on the console), highlighters, a findings sheet per pair.",
   "steps": [
    "Give each pair the three excerpts and a findings sheet with columns for finding, risk and corrected command.",
    "Pairs highlight every weakness they can find, such as transport input telnet, password 7, enable password, missing domain name or missing exec-timeout.",
    "For each finding, pairs write the corrected command, for example transport input ssh or username admin privilege 15 algorithm-type scrypt secret.",
    "Pairs then write the order in which they would apply their fixes over a remote session so they never lose access.",
    "Two pairs present their change order, and the class decides whether either plan would have caused a lockout."
   ]
  },
  "discussion": [
   "Why does individual accountability matter even in a small team where everyone trusts each other?",
   "If an organization uses central AAA servers, why should every device still keep at least one local account?",
   "What are the trade-offs of a very short exec-timeout for engineers doing long troubleshooting sessions?"
  ],
  "exit": [
   [
    "Which line command permits only SSH and blocks Telnet on VTY lines?",
    "transport input ssh."
   ],
   [
    "A configuration shows username ops password 7 followed by a string. Is the password protected?",
    "No. Type 7 is reversible encoding; replace it with a secret using type 8 or type 9 hashing."
   ],
   [
    "Which command restricts VTY access to the management subnet, and where is it applied?",
    "access-class with a standard ACL, applied inbound under line vty."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference card that pairs each weak setting with its strong replacement, and let them audit only the first excerpt before moving on.",
   "Extend: Ask fast finishers to add login block-for, a login banner and a role-based approach with privilege levels or CLI views for a read-only help desk account, and to explain how each control would appear in show running-config."
  ]
 },
 {
  "t": "AAA with TACACS+ and RADIUS, method lists and fallback",
  "objectives": [
   "Students will be able to explain the three functions of AAA and why centralizing them improves security and administration.",
   "Students will be able to compare TACACS+ and RADIUS by transport, port, encryption, separation of functions and typical use.",
   "Students will be able to interpret a method list and predict whether fallback to the next method occurs.",
   "Students will be able to apply named method lists to VTY lines while protecting console access."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up scenario of an engineer rejected by both the server and the local account. Take a quick vote on whether the router is broken."
   ],
   [
    15,
    "Teach",
    "Draw a TACACS+ versus RADIUS comparison table on the whiteboard. Walk through the configuration example layer by layer, then explain default versus named lists and the error versus failure rule. Revisit the warm-up vote."
   ],
   [
    15,
    "Activity",
    "Run the method list role-play in groups of three."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions on none, console protection and source interfaces."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "An engineer types the wrong password on a router that uses a central AAA server first and a local account second. The server is up. Then he tries the local emergency account and is rejected again. Is the router broken? Vote yes or no and give one reason.",
  "activity": {
   "title": "Method list role-play",
   "materials": "Printed role cards (Router, AAA Server, Engineer), printed scenario cards with a method list and a situation, a whiteboard to record outcomes.",
   "steps": [
    "Form groups of three and hand out role cards. The Router holds a method list card such as group ADMIN-TAC local.",
    "The teacher reads a scenario aloud, for example server up and password wrong, server down and local password correct, or server down and list ending in none.",
    "The Engineer attempts a login, the Router asks the AAA Server, and the AAA Server responds with accept, reject or silence according to the scenario.",
    "The Router decides whether to move to the next method and announces the outcome. Groups record each outcome on the whiteboard.",
    "Rotate roles and repeat with four scenarios, then compare outcomes across groups and resolve disagreements as a class."
   ]
  },
  "discussion": [
   "Why might an attacker try to make an AAA server unreachable, and how does the choice of trailing method affect the result?",
   "Why is it common to keep the console on local authentication even when VTY lines use TACACS+?",
   "What could go wrong if AAA traffic leaves the router from different interfaces at different times?"
  ],
  "exit": [
   [
    "Name two differences between TACACS+ and RADIUS.",
    "Any two: TCP 49 versus UDP 1812/1813; full-body encryption versus password-only; separate authorization versus combined authentication and authorization; device administration versus network access."
   ],
   [
    "A method list is group ADMIN-TAC local. The server is reachable and rejects the password. What happens?",
    "Access is denied; the local database is not tried because a rejection is not an error."
   ],
   [
    "How does a named method list take effect on VTY lines?",
    "It must be referenced under the lines, for example login authentication VTY-AUTH; only the default list applies automatically."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a flowchart card that shows the decision at each method: accept, reject or no response, and let them trace each scenario on the card.",
   "Extend: Ask fast finishers to design method lists for a site with two ISE nodes, a console that must never be locked out, and per-command accounting, and to write the show and test commands they would use to verify it."
  ]
 },
 {
  "t": "Infrastructure security: standard and extended ACLs, placement and order",
  "objectives": [
   "Students will be able to compare standard and extended ACLs by matching fields and numbered ranges.",
   "Students will be able to predict the outcome of an ACL using first-match processing and the implicit deny.",
   "Students will be able to calculate wildcard masks for hosts and subnets.",
   "Students will be able to choose correct ACL placement and direction for a given filtering requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up of a correct deny line with zero hits. Ask students to guess why before teaching anything."
   ],
   [
    15,
    "Teach",
    "Cover standard versus extended ACLs, number ranges, named ACLs and sequence numbers, wildcard masks with two worked examples, first match and implicit deny, inbound versus outbound, and placement rules. Return to the warm-up and resolve it."
   ],
   [
    15,
    "Activity",
    "Run the human packet walk using printed ACL cards and packet cards."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about placement and stateless filtering."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "A router has a deny entry that is typed perfectly and applied to the right interface, but its hit counter shows zero while an entry above it shows thousands of matches. What might be happening?",
  "activity": {
   "title": "Human packet walk",
   "materials": "Printed ACL entry cards (one entry per card, including a card labeled implicit deny), printed packet cards listing protocol, source, destination and port, tape for the whiteboard.",
   "steps": [
    "Tape one ACL's entry cards to the whiteboard in sequence order, ending with the implicit deny card.",
    "Give each student a packet card. One at a time, students walk their packet down the list and stop at the first matching entry, announcing permit or deny.",
    "After all packets pass, the teacher asks the class to reorder the cards so a specific packet that was wrongly permitted is now denied, without blocking others.",
    "Swap to a second ACL that is standard, and ask pairs to decide where on a printed three-router diagram it should be applied and in which direction.",
    "Pairs write the wildcard mask for two subnets on the cards, and the teacher checks them aloud."
   ]
  },
  "discussion": [
   "Why does the placement rule differ between standard and extended ACLs?",
   "What problems arise because router ACLs are stateless, and when would you choose a stateful firewall instead?",
   "When is it worth adding an explicit deny ip any any log even though the implicit deny already exists?"
  ],
  "exit": [
   [
    "What happens to a packet that matches no entry in an ACL?",
    "It is dropped by the implicit deny at the end of the list."
   ],
   [
    "Where should an extended ACL be placed, and why?",
    "Close to the source, because it is specific enough to block only unwanted traffic and stops it before it uses bandwidth."
   ],
   [
    "What is the wildcard mask for the subnet 192.168.10.64/26?",
    "0.0.0.63."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a wildcard mask conversion chart for common prefix lengths and a short ACL with only three entries for the first packet walk.",
   "Extend: Ask fast finishers to design an infrastructure ACL for an internet edge router that permits BGP from one peer, SSH from the management network and ICMP needed for path MTU discovery, and blocks all other traffic to router addresses."
  ]
 },
 {
  "t": "Control Plane Policing (CoPP)",
  "objectives": [
   "Students will be able to explain why traffic destined to the route processor can disrupt routing even when forwarding hardware is idle.",
   "Students will be able to interpret a CoPP configuration built with ACLs, class maps, a policy map and the control-plane service policy.",
   "Students will be able to distinguish the role of ACL permit and deny in classification from the police action in the policy map.",
   "Students will be able to plan a safe CoPP rollout using baselining and exceed actions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Describe the warm-up scenario of a router dropping OSPF neighbors under a flood of polling traffic. Ask students which component is failing and why."
   ],
   [
    15,
    "Teach",
    "Draw the data plane and control plane on the whiteboard with an arrow for punted traffic. Walk through the CoPP configuration from ACLs to control-plane. Stress the permit means member of the class rule and the baseline-then-tighten method. Mention system-cpp-policy on Catalyst switches."
   ],
   [
    15,
    "Activity",
    "Run the CoPP class design workshop in small groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect CoPP with other layers of device protection."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A router's forwarding hardware is barely busy, yet its routing neighbors keep dropping and SSH will not respond. Which part of the router is in trouble, and what kind of traffic might cause that?",
  "activity": {
   "title": "CoPP class design workshop",
   "materials": "Printed list of traffic types that reach a router's CPU (OSPF hellos, BGP from two peers, SSH from management, SSH from user subnets, SNMP from the monitoring server, ICMP echo from anywhere, unknown traffic), printed sample show policy-map control-plane counters, sticky notes, whiteboard.",
   "steps": [
    "In groups of three or four, students sort each traffic type onto sticky notes under one of four headings: critical, management, limited, drop.",
    "Groups write a short class map and ACL description for each heading, remembering that permit means membership in the class.",
    "Groups read the printed counters and choose a police rate and exceed action for each class, justifying rates against the observed peaks.",
    "The teacher announces an event, a link flap that triples routing traffic for a minute, and groups check whether their routing class would drop hellos.",
    "Each group shares one design decision they changed after the event and why."
   ]
  },
  "discussion": [
   "Why might a designer choose transmit as the exceed action for routing protocol traffic instead of drop?",
   "How do infrastructure ACLs, access-class and CoPP work together, and what happens if only one is deployed?",
   "What risks come with adjusting the default system-cpp-policy on a switch without baselining first?"
  ],
  "exit": [
   [
    "Under which configuration mode is the CoPP service policy applied, and in which direction?",
    "Under control-plane, with service-policy input."
   ],
   [
    "A CoPP ACL contains a deny entry for SNMP from 10.5.5.5. Is that SNMP traffic dropped by the ACL?",
    "No. It is simply not a member of that class and is evaluated against the next class, often ending in class-default."
   ],
   [
    "Why is baselining important before enforcing CoPP drops?",
    "Rates set without knowing normal traffic levels can drop legitimate routing or management traffic and cause outages."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially completed policy map with the classes already named, so they focus on choosing rates and exceed actions.",
   "Extend: Ask fast finishers to add a class that drops management protocols from untrusted sources, and to explain how they would verify on a live router that legitimate SSH is still conforming."
  ]
 },
 {
  "t": "REST API security: HTTPS, tokens, secret handling",
  "objectives": [
   "Students will be able to explain why REST APIs must use HTTPS with certificate validation.",
   "Students will be able to compare Basic authentication, token-based authentication, API keys and bearer tokens.",
   "Students will be able to apply least privilege and safe secret handling practices to an automation script.",
   "Students will be able to interpret 401 and 403 responses and choose the correct follow-up action."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario about a password found in a public repository. Ask students whether deleting the file solves the problem, and collect reasons."
   ],
   [
    15,
    "Teach",
    "Present the four layers: transport, authentication, authorization and secrets. Decode a sample base64 Basic header on the projector with a browser-based decoder to show it is not encryption. Explain tokens, X-Auth-Token, bearer tokens and CSRF tokens, then 401 versus 403."
   ],
   [
    15,
    "Activity",
    "Run the script code review in pairs using a printed insecure Python script."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about leaks and service accounts."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a half sheet."
   ]
  ],
  "warmup": "An intern pushed a script containing the network controller's admin password to a public repository, then deleted the file an hour later. Is the problem solved? What else would you do?",
  "activity": {
   "title": "Insecure script code review",
   "materials": "A printed short Python script the teacher writes containing a hard-coded password, verify=False, an administrator account, printing the token to the console, and a retry loop on any error. Red pens and a review checklist with the four layers.",
   "steps": [
    "Give each pair the printed script and the checklist. Pairs circle every security problem they find and label it with the layer it belongs to.",
    "For each problem, pairs write a fix in the margin, such as reading credentials from a vault or environment variable, removing verify=False and pointing to a CA bundle, or using a read-only service account.",
    "Pairs rewrite the error handling as pseudocode that treats 401 and 403 differently.",
    "Pairs swap scripts with another pair and check whether any problem was missed.",
    "The teacher reviews the full list on the whiteboard and asks which single fix reduces risk the most, and why."
   ]
  },
  "discussion": [
   "Why should a secret pushed to a repository be rotated even if the repository was private?",
   "What are the trade-offs between environment variables and a dedicated secrets manager for small teams?",
   "How does a dedicated service account improve both security and troubleshooting?"
  ],
  "exit": [
   [
    "Why is Basic authentication acceptable only over HTTPS?",
    "Base64 encoding is reversible, so the credentials are readable to anyone who captures the request unless TLS encrypts it."
   ],
   [
    "A script receives a 401 response. What does it mean, and what should the script do?",
    "Authentication failed or the token expired; obtain a new token and retry once."
   ],
   [
    "Name two practices that prevent secrets from leaking through version control.",
    "Any two: never hard-code secrets; read them from environment variables or a vault; exclude secret files with .gitignore; use pre-commit secret scanning."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students the checklist with one example finding already filled in for each layer, and a glossary card for TLS, token, bearer and CSRF.",
   "Extend: Ask fast finishers to design a token refresh strategy for a long-running job, including how to detect expiry, how to keep tokens out of logs and how the job should behave if the vault is unreachable."
  ]
 },
 {
  "t": "Network security design: threat defense, endpoint security, next-generation firewall",
  "objectives": [
   "Students will be able to explain defense in depth and the before, during and after phases of the attack continuum.",
   "Students will be able to compare an NGFW with a traditional stateful firewall.",
   "Students will be able to describe the role of endpoint protection and EDR in a layered design.",
   "Students will be able to select the security component that best addresses a described threat scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up about the phishing click at a hotel and ask what the perimeter firewall could and could not see."
   ],
   [
    15,
    "Teach",
    "Draw concentric layers on the whiteboard: endpoint, access control, segmentation, NGFW, DNS and email security, telemetry. Explain each layer's role, the NGFW feature list and EDR. Close with context sharing and zero trust."
   ],
   [
    15,
    "Activity",
    "Run the attack chain card game in groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions on assume breach and context sharing."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "An employee clicks a phishing link on a hotel network, then brings the laptop back to the office. Which security tools could have helped at each point, and which ones never saw the traffic at all?",
  "activity": {
   "title": "Attack chain card game",
   "materials": "Printed attack step cards (phishing email arrives, user clicks link, malware downloads, malware runs on laptop, laptop connects to office, malware scans internal network, data sent outside), printed defense cards (email security, DNS-layer security, NGFW, EDR, ISE posture, segmentation, NetFlow analytics, SIEM or XDR), tape, whiteboard.",
   "steps": [
    "In groups of four, students lay out the attack step cards in order as a chain.",
    "Groups place each defense card next to every attack step where it could prevent or detect the attack, and write one sentence explaining how.",
    "The teacher removes one defense, such as the NGFW, and groups identify which steps are still covered by other layers.",
    "Groups mark each defense as before, during or after on the attack continuum.",
    "Each group presents the step with the fewest defenses and proposes an improvement."
   ]
  },
  "discussion": [
   "What does it mean in practice to design as if a breach has already happened?",
   "How does sharing identity from ISE with a firewall change the way firewall rules are written?",
   "What privacy and policy questions arise when an NGFW decrypts TLS traffic for inspection?"
  ],
  "exit": [
   [
    "Name three capabilities an NGFW adds to stateful filtering.",
    "Any three: application visibility and control, user identity-based policy, integrated IPS, URL filtering, malware protection."
   ],
   [
    "A laptop is infected while on a hotel network. Which layer is best placed to detect it at that moment?",
    "Endpoint security, such as an EDR agent on the laptop, because the corporate perimeter does not see that traffic."
   ],
   [
    "Which phase of the attack continuum includes segmentation and patching?",
    "Before, because they reduce exposure ahead of an attack."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page reference that lists each defense with a one-line role, and let them place only four defense cards first.",
   "Extend: Ask fast finishers to design how an EDR detection could automatically trigger network containment through ISE, and to identify what information each system would need to share."
  ]
 },
 {
  "t": "Cisco TrustSec (SGT, SGACL) and MACsec",
  "objectives": [
   "Students will be able to explain the three TrustSec functions: classification, propagation and enforcement.",
   "Students will be able to compare inline tagging with SXP for propagating SGTs.",
   "Students will be able to build a simple SGACL policy matrix for a described organization.",
   "Students will be able to contrast MACsec hop-by-hop encryption with end-to-end encryption such as IPsec or TLS."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a long IP-based ACL excerpt on the projector and ask what happens to it when the contractor subnet changes."
   ],
   [
    15,
    "Teach",
    "Explain classification (dynamic from ISE, static by subnet or port), propagation (inline CMD or VXLAN, SXP), and enforcement with an SGACL matrix at egress. Then cover MACsec, MKA and hop-by-hop versus end-to-end."
   ],
   [
    15,
    "Activity",
    "Run the group policy matrix workshop in groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about scale, legacy hardware and MACsec."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A company's access list is 2,000 lines long and lists subnets for contractors, staff and payment terminals. The contractor subnet is about to change. How many devices and lines might need editing, and what could go wrong?",
  "activity": {
   "title": "Group policy matrix workshop",
   "materials": "Printed organization profile (groups such as Employees, Contractors, Guests, POS-Terminals, Finance-Servers, Web-Servers), a blank matrix grid on the whiteboard or paper, a printed network diagram with one older switch that cannot tag inline, markers.",
   "steps": [
    "In groups of three or four, students read the organization profile and decide how each group is classified, dynamically through ISE or statically by subnet or port.",
    "Groups fill in the matrix with permit, deny or a specific protocol for each source and destination group pair.",
    "On the network diagram, groups mark where tags are propagated inline, where SXP is needed and where enforcement happens.",
    "Groups identify which links should use MACsec and how keys would be negotiated.",
    "The teacher changes the contractor subnet and asks groups which parts of their design need editing, leading to the conclusion that the matrix does not change."
   ]
  },
  "discussion": [
   "Why does writing policy between groups scale better than writing it between subnets?",
   "When would you still need SXP in a modern network, and what are its limitations compared with inline tagging?",
   "Why might an organization use MACsec on links even when application traffic already uses TLS?"
  ],
  "exit": [
   [
    "Name the three TrustSec functions and what each does.",
    "Classification assigns the SGT, propagation carries it to the enforcement point, and enforcement applies the SGACL."
   ],
   [
    "What does SXP share, and over which transport?",
    "IP-to-SGT mappings, over TCP."
   ],
   [
    "Why is MACsec described as hop by hop?",
    "Frames are encrypted on each link and decrypted at each device before being re-encrypted on the next link."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially filled matrix and a card that lists the three TrustSec functions with one example each.",
   "Extend: Ask fast finishers to design how a firewall at the data center edge would use SGTs learned through SXP in its rules, and to explain what happens to policy when a group of servers moves to a new subnet."
  ]
 },
 {
  "t": "Network access control: 802.1X, MAB and WebAuth",
  "objectives": [
   "Students will be able to identify the supplicant, authenticator and authentication server and the protocols between them.",
   "Students will be able to compare 802.1X, MAB and WebAuth and choose the right method for a given device type.",
   "Students will be able to select the correct host mode for a described port, such as a phone with a PC behind it.",
   "Students will be able to plan a phased rollout using monitor, low-impact and closed modes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Describe the unknown device found behind a vending machine and ask students how a network could have stopped it from getting an address."
   ],
   [
    15,
    "Teach",
    "Draw the three 802.1X roles on the whiteboard with EAPOL on one side and RADIUS on the other. Explain EAP methods, MAB and its weakness, Central WebAuth with CoA, host modes and the three rollout modes."
   ],
   [
    15,
    "Activity",
    "Run the authentication role-play with student roles for supplicant, switch and ISE."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about rollout and device types."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "Someone plugged an unknown device into a wall jack in a public area and it got a network address. What would the switch need to do differently so that the device had to identify itself first?",
  "activity": {
   "title": "Port authentication role-play",
   "materials": "Printed role cards (Supplicant, Switch, ISE), printed device cards (corporate laptop with certificate, printer with no supplicant, visitor laptop, IP phone with PC, laptop spoofing a printer MAC), printed message cards (EAPOL start, EAP identity, RADIUS Access-Request, Access-Accept with VLAN, Access-Reject, redirect, CoA), whiteboard.",
   "steps": [
    "Form groups of three and assign roles. The Supplicant draws a device card.",
    "The group passes message cards in the correct order to complete authentication for that device, choosing 802.1X, MAB or Central WebAuth as appropriate.",
    "ISE decides the authorization result, such as a VLAN, a downloadable ACL or a redirect, and the Switch announces what the port now allows.",
    "Rotate roles and repeat for at least three device cards, including the phone with a PC, where the group must choose a host mode.",
    "The class compares results for the spoofed printer card and discusses how profiling and CoA would respond."
   ]
  },
  "discussion": [
   "Why is EAP-TLS considered stronger than PEAP, and what extra work does it require?",
   "What kinds of devices are likely to break if an organization moves straight to closed mode?",
   "How should authorization for MAB devices differ from authorization for 802.1X users?"
  ],
  "exit": [
   [
    "Name the three 802.1X roles and the protocol used between the endpoint and the switch.",
    "Supplicant, authenticator and authentication server; EAPOL runs between the endpoint and the switch."
   ],
   [
    "Which method would you use for a network camera with no 802.1X support, and what is its weakness?",
    "MAB; it relies on the MAC address, which can be spoofed."
   ],
   [
    "What is the purpose of monitor mode in an 802.1X rollout?",
    "It runs authentication and logs results without blocking anyone, so failures can be found and fixed before enforcement."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a sequence diagram card with the message order for 802.1X already printed, so they focus on choosing the method for each device.",
   "Extend: Ask fast finishers to describe how IBNS 2.0 policy maps would express 802.1X first with MAB fallback, and how they would verify a session with show access-session interface details."
  ]
 },
 {
  "t": "Layer 2 protections: DHCP snooping, dynamic ARP inspection, IP source guard",
  "objectives": [
   "Students will be able to explain which Layer 2 attack each of DHCP snooping, dynamic ARP inspection and IP source guard prevents.",
   "Students will be able to describe the DHCP snooping binding table and why DAI and IP source guard depend on it.",
   "Students will be able to identify which ports should be trusted and configure the basic commands for each feature.",
   "Students will be able to troubleshoot common failures such as an untrusted uplink, option 82 rejection and static hosts missing from the binding table."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list student answers on the whiteboard under the headings 'DHCP' and 'ARP'."
   ],
   [
    13,
    "Teach",
    "Draw an access switch with a DHCP server on the uplink, three clients and an attacker. Walk through a rogue DHCP offer, a forged ARP reply and a spoofed source address. For each, add the feature that stops it and draw the binding table in the middle with arrows from DAI and IPSG to it. Say: 'Two of these three features are blind without the table.' Show the configuration snippet and the four show commands."
   ],
   [
    17,
    "Activity",
    "Run the packet judge role-play described below in groups of four."
   ],
   [
    5,
    "Discuss",
    "Bring the class together and work through the discussion questions, focusing on any packets groups disagreed about."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card or sticky note before leaving."
   ]
  ],
  "warmup": "When your laptop joins a network and asks for an address, how does it know the answer came from the real DHCP server and not from someone else's device?",
  "activity": {
   "title": "Packet judge: allow or drop",
   "materials": "Printed binding table (MAC, IP, VLAN, port) for one switch, a printed port list showing which ports are trusted, about 15 printed packet cards (DHCP offers, DHCP discovers, ARP replies, IP packets with source addresses and ingress port), sticky notes, whiteboard.",
   "steps": [
    "Give each group the binding table, the trust list and a shuffled deck of packet cards. One student plays the switch and the others are the DHCP snooping, DAI and IPSG checkers.",
    "For each card, the switch reads the packet aloud and the checkers decide which feature examines it, compare it with the table or trust list, and rule allow or drop with a one-sentence reason on a sticky note.",
    "Include tricky cards: a DHCP offer arriving on the trusted uplink, an ARP reply from a static-address printer with no ARP ACL, a DISCOVER flood that exceeds the rate limit, and an IP packet whose source matches a binding on a different port.",
    "Groups then imagine the teacher turns off DHCP snooping and re-judge three ARP cards, noting what changes.",
    "Reveal the answer key and have each group explain one card they got wrong."
   ]
  },
  "discussion": [
   "Why do you think switch-to-switch uplinks are usually trusted for DAI, and what risk does that create if a downstream switch is not running DAI?",
   "In what environments would you deploy these features first, and what operational work do static hosts create?"
  ],
  "exit": [
   [
    "Which feature stops a rogue DHCP server, and how?",
    "DHCP snooping; it drops DHCP server messages such as offers and acknowledgments received on untrusted ports."
   ],
   [
    "Name the two features that depend on the DHCP snooping binding table.",
    "Dynamic ARP inspection and IP source guard."
   ],
   [
    "After enabling DHCP snooping, clients stop getting addresses. Give the most likely cause.",
    "The uplink toward the DHCP server or relay is not marked trusted (option 82 rejection is a second possible cause)."
   ]
  ],
  "differentiation": [
   "Support: give struggling students the hotel analogy card (front desk, hallway guard, elevator) and a three-row table matching each feature to the attack it stops and what it checks, to fill in before the activity.",
   "Extend: ask fast finishers to write the full configuration for a switch with a server on Gi1/0/48, clients on Gi1/0/1-24 in VLANs 10 and 20, and one static printer at a known IP and MAC, including the ARP ACL and its application to the VLAN."
  ]
 },
 {
  "t": "Python basics: variables, loops, functions, dictionaries, the requests library",
  "objectives": [
   "Students will be able to identify Python strings, integers, booleans, lists and dictionaries and predict the result of indexing into nested data.",
   "Students will be able to trace a for loop, an if statement and a function call and state the printed output.",
   "Students will be able to explain what requests.get returns and use status_code and json() correctly.",
   "Students will be able to read a short REST API script and describe step by step what it does."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up snippet and ask students to write their prediction on a sticky note before anyone speaks."
   ],
   [
    12,
    "Teach",
    "Live-annotate the device dictionary example on the projector, circling keys and list indexes. Then step through the loop and function example line by line, asking 'What is dev right now?' at each pass. Finish with the requests example, pointing out status_code, json() and why credentials come from environment variables."
   ],
   [
    18,
    "Activity",
    "Run the 'be the interpreter' trace activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Review the trickiest trace cards and work through the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "Project `vlans = [10, 20, 30]` and `print(vlans[1])`. What do you think prints, and why might someone guess wrong?",
  "activity": {
   "title": "Be the interpreter: trace the script",
   "materials": "Printed trace cards, each with a 5 to 12 line Python snippet using dictionaries, lists, loops, a function or a mocked requests response; a printed sample JSON response; whiteboard; optional student laptops with a free browser-based Python runner to check answers.",
   "steps": [
    "Pairs receive six trace cards ordered from easy (single dictionary lookup) to hard (loop over a mocked resp.json() with an if filter and a function).",
    "One partner reads each line aloud and the other writes the value of every variable on scrap paper, then together they write the exact predicted output.",
    "After each card, pairs check their answer with the browser-based runner if laptops are available, or against an answer sheet the teacher reveals.",
    "For any wrong prediction, pairs write one sentence naming the mistake, such as off-by-one index or misread indentation.",
    "Finish with a card that has a deliberate bug (a missing key or wrong index); pairs must fix it and explain the error message Python would show."
   ]
  },
  "discussion": [
   "Why is it safer to read credentials from environment variables than to type them into the script?",
   "When would you prefer dict.get() over square-bracket lookup in a script that processes data from hundreds of devices?"
  ],
  "exit": [
   [
    "Given d = {'sw': [{'name': 'A1'}, {'name': 'A2'}]}, what does d['sw'][1]['name'] return?",
    "A2, because index 1 is the second element of the list."
   ],
   [
    "Which requests attribute holds the HTTP status code?",
    "status_code."
   ],
   [
    "What does a for loop over a list of device dictionaries do on each pass?",
    "It assigns the next dictionary in the list to the loop variable and runs the indented block once for it."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a reference card showing a nested JSON structure drawn as boxes with arrows labeled by key or index, and start them on the three easiest trace cards only.",
   "Extend: ask fast finishers to write a function that takes a list of device dictionaries and a target version and returns the hostnames that do not match, then test it in the browser-based runner."
  ]
 },
 {
  "t": "JSON syntax and parsing JSON in Python",
  "objectives": [
   "Students will be able to identify the JSON value types and the rules for objects and arrays.",
   "Students will be able to determine whether a JSON snippet is valid and name the specific error when it is not.",
   "Students will be able to explain the difference between json.loads, json.load, json.dumps and json.dump and the JSON-to-Python type mapping.",
   "Students will be able to write the Python expression that extracts a value from nested JSON."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up snippet and ask students to vote by show of hands whether it is valid JSON, then ask two volunteers to defend opposite answers."
   ],
   [
    12,
    "Teach",
    "Write the six value types on the whiteboard. Annotate the core-sw1 document on the projector, labeling each object, array and value type. List the classic validity errors and show json.loads failing on a trailing comma. Finish by tracing data['interfaces'][1]['status'] with arrows from outside to inside."
   ],
   [
    18,
    "Activity",
    "Run the JSON doctor card activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Go over the hardest cards and the discussion questions as a class."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post it by the door."
   ]
  ],
  "warmup": "Project {'site': 'HQ', 'active': True, 'floors': [1, 2, 3,]}. Is this valid JSON? Write down every problem you can see.",
  "activity": {
   "title": "JSON doctor",
   "materials": "Printed cards, each with a short JSON snippet (about half valid, half containing one or two errors), printed extraction cards showing a nested API-style response with a target value circled, whiteboard, optional student laptops with a browser-based JSON validator or Python runner.",
   "steps": [
    "Pairs receive eight diagnosis cards. For each, they mark it healthy or sick, and for sick cards name every error and write the corrected version.",
    "Include cards with single quotes, a trailing comma, a missing comma, an unquoted key, a comment, Python True and None, and one valid card that is unusually indented to test whether students wrongly flag whitespace.",
    "Pairs then take three extraction cards and write the exact Python expression that returns the circled value after data = resp.json().",
    "If laptops are available, pairs paste their corrected JSON into a validator or run json.loads in a browser Python runner to confirm.",
    "Each pair presents one card to the class and explains the rule it tests."
   ]
  },
  "discussion": [
   "Why is building a payload as a Python dictionary and serializing it safer than writing a JSON string by hand?",
   "When might an API reject JSON that is technically valid, for example a number sent as a string?"
  ],
  "exit": [
   [
    "Name two reasons {'vlan': 10, 'up': True,} is not valid JSON.",
    "Single quotes instead of double quotes, Python-style True instead of true, and a trailing comma (any two)."
   ],
   [
    "Which function parses a JSON string into Python data, and which turns Python data into a JSON string?",
    "json.loads parses a string; json.dumps produces a string."
   ],
   [
    "Given data = {\"devices\": [{\"ip\": \"10.1.1.1\"}]}, write the expression for the IP address.",
    "data[\"devices\"][0][\"ip\"]"
   ]
  ],
  "differentiation": [
   "Support: give struggling students a one-page checklist of the six JSON value types and the six common errors, and pair them with a partner who reads each card aloud while they tick the checklist.",
   "Extend: ask fast finishers to write a short Python script that loads a JSON file of devices with json.load, prints the hostnames whose status is down, and writes the result to a new file with json.dump and indent=2."
  ]
 },
 {
  "t": "YANG data models and how NETCONF and RESTCONF use them",
  "objectives": [
   "Students will be able to describe what a YANG model defines and identify containers, leaves, leaf-lists and lists in a model snippet.",
   "Students will be able to compare IETF, OpenConfig and native models in terms of portability and coverage.",
   "Students will be able to contrast how NETCONF and RESTCONF transport and encode YANG-modeled data.",
   "Students will be able to build a RESTCONF URL that addresses a specific list entry or leaf from a model tree."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers on the whiteboard, steering toward the idea that a form defines fields without containing the answers."
   ],
   [
    13,
    "Teach",
    "Draw a three-layer stack on the whiteboard labeled model, encoding and protocol. Annotate the interfaces YANG snippet on the projector, labeling each node type. Compare IETF, OpenConfig and native models in a small table. Show the same description leaf as a NETCONF XML element and as a RESTCONF URL with a JSON body."
   ],
   [
    17,
    "Activity",
    "Run the model-to-URL tree walk in groups of three."
   ],
   [
    5,
    "Discuss",
    "Work through the discussion questions, focusing on when portability matters more than coverage."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "A paper job application has fields labeled Name, Phone and Start date. Does the blank form contain any information about a person? What does it tell you?",
  "activity": {
   "title": "Tree walk: from model to URL",
   "materials": "Printed pyang-style tree printouts of a simplified interfaces model and a simplified VLAN model (teacher-made), printed task cards, sticky notes in two colors, whiteboard.",
   "steps": [
    "Groups label every node on the tree printout as container, list (circling its key), leaf or leaf-list using sticky notes, and mark which nodes are config false.",
    "Each group draws task cards such as 'read the description of GigabitEthernet2' or 'disable GigabitEthernet4' and writes the RESTCONF URL path and the HTTP method they would use.",
    "For two of the cards, groups also write which protocol, encoding and transport NETCONF would use for the same task.",
    "Groups swap answers with a neighboring group, which checks each URL against the tree and marks any missing module prefix or key.",
    "The teacher reveals the answer key and each group explains one correction."
   ]
  },
  "discussion": [
   "Why does model-driven programmability reduce the risk of a script misreading device output after an upgrade?",
   "If a vendor-neutral model lacks a feature you need, what are the costs of switching part of your automation to a native model?"
  ],
  "exit": [
   [
    "Which layer defines that a VLAN ID must be an integer in a certain range: YANG, JSON or RESTCONF?",
    "YANG, because the model defines types and constraints."
   ],
   [
    "State the transport and encoding of NETCONF and of RESTCONF.",
    "NETCONF uses XML over SSH; RESTCONF uses JSON or XML over HTTPS."
   ],
   [
    "Write the RESTCONF path for the description of GigabitEthernet1 in ietf-interfaces.",
    "/restconf/data/ietf-interfaces:interfaces/interface=GigabitEthernet1/description"
   ]
  ],
  "differentiation": [
   "Support: give struggling students the blueprint and moving-company analogy on a card, plus a color-coded legend (folder icon for container, single box for leaf, stacked boxes for leaf-list, keyed folders for list) to use while labeling the tree.",
   "Extend: ask fast finishers to write a short YANG snippet for a list of VLANs keyed by ID with a name leaf and a leaf-list of ports, then write the RESTCONF URL to read the name of VLAN 20 from their own model."
  ]
 },
 {
  "t": "REST API methods and response codes (200, 201, 204, 400, 401, 403, 404, 500)",
  "objectives": [
   "Students will be able to match GET, POST, PUT, PATCH and DELETE to CRUD operations and explain idempotency.",
   "Students will be able to interpret status codes 200, 201, 204, 400, 401, 403, 404 and 500 and state the likely cause of each.",
   "Students will be able to distinguish 401 from 403 and PUT from PATCH in troubleshooting scenarios.",
   "Students will be able to choose the correct script response to a given status code."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect answers, then reveal that HTTP status codes work the same way."
   ],
   [
    12,
    "Teach",
    "Build a two-column table on the whiteboard: method, CRUD operation, idempotent yes or no. Then draw three boxes labeled 2xx, 4xx and 5xx and place each exam code inside with a one-line meaning. Spend extra time on 401 versus 403 and PUT versus PATCH with a concrete device example."
   ],
   [
    18,
    "Activity",
    "Run the API help desk role-play in pairs."
   ],
   [
    5,
    "Discuss",
    "Discuss which tickets were hardest to diagnose and work through the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "When you order food through an app, what different messages can you get back, and how does each one change what you do next?",
  "activity": {
   "title": "API help desk",
   "materials": "Printed ticket cards, each describing an API request (method, URL, short body) and the response code and message received; printed code reference sheet for the support version only; whiteboard; sticky notes.",
   "steps": [
    "In pairs, one student plays the developer who reads a ticket aloud, and the other plays the API help desk who must diagnose the cause and recommend the next action.",
    "Tickets include a POST returning 201, a GET returning 401 after an hour, a DELETE returning 403 for an observer account, a PATCH returning 404 with a hostname in the path, a POST with a trailing comma returning 400, a DELETE returning 204, and a GET returning 500.",
    "The help desk writes the diagnosis and action on a sticky note: fix body, refresh token, change role, fix URL, retry later, or no action needed.",
    "After six tickets, partners swap roles for the remaining cards.",
    "The class compares sticky notes on the whiteboard, and the teacher resolves any disagreements."
   ]
  },
  "discussion": [
   "Why might an API return 404 instead of 403 when you ask for a resource you are not allowed to see?",
   "How should a script decide whether to retry a failed request automatically?"
  ],
  "exit": [
   [
    "Your token expired. Which code do you expect, and what should the script do?",
    "401 Unauthorized; request a new token and retry."
   ],
   [
    "What is the difference between PUT and PATCH?",
    "PUT replaces the entire resource with what you send; PATCH updates only the fields you send."
   ],
   [
    "A DELETE returns 204. Did it work?",
    "Yes; 204 No Content means success with no response body."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a color-coded code card (green 2xx, yellow 4xx, red 5xx) with one plain-language sentence for each exam code, and let them use it during the role-play.",
   "Extend: ask fast finishers to write pseudocode or Python for a function that sends a request and handles 200, 201, 204, 401 (refresh and retry once), 403 (log and stop), 404 and 5xx (wait and retry up to three times)."
  ]
 },
 {
  "t": "Catalyst Center Intent APIs: token authentication and common calls",
  "objectives": [
   "Students will be able to describe the Catalyst Center token authentication flow, including the endpoint, method and header used.",
   "Students will be able to identify common Intent API endpoints and the data each returns.",
   "Students will be able to explain how asynchronous operations use a taskId and polling.",
   "Students will be able to read a short Intent API script and predict its behavior, including what happens when the token expires."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about wristbands and collect answers, connecting the idea of a temporary pass to tokens."
   ],
   [
    13,
    "Teach",
    "Draw a sequence diagram on the whiteboard: script, token endpoint, Intent API. Show the POST with Basic auth, the Token in the response, then GET calls with X-Auth-Token. Walk through the Python script on the projector. Add a second diagram for the command runner showing 202, taskId, polling and the file fetch. List the common endpoints."
   ],
   [
    17,
    "Activity",
    "Run the 'be the API' role-play in groups of three."
   ],
   [
    5,
    "Discuss",
    "Work through the discussion questions, focusing on token expiry and least privilege."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "At a festival you show ID once and get a wristband. Why do organizers use wristbands instead of checking ID at every booth, and what happens when the wristband expires?",
  "activity": {
   "title": "Be the API: tokens and tasks",
   "materials": "Printed role cards (script, Catalyst Center API, network devices), paper 'token' slips with a written expiry time, printed request cards showing method, path and headers, printed mock JSON responses, a classroom clock or timer, whiteboard.",
   "steps": [
    "In each group, one student is the script, one is the Catalyst Center API and one plays the devices. The API student holds the mock responses.",
    "The script must first send a token request card with Basic credentials; the API checks it and hands over a token slip with an expiry time five minutes ahead.",
    "The script then sends inventory and site-health requests with the token slip attached; the API returns the matching mock response, and the script reads values from the response key aloud.",
    "The script sends a command runner request; the API returns only a taskId slip. The script must poll with task requests until the devices student signals completion, then fetch the file response.",
    "When the five minutes pass, the API starts returning 401 cards, and the script must recognize the cause and get a new token. Groups then write a one-paragraph summary of the full flow."
   ]
  },
  "discussion": [
   "Why is it better for a reporting script to use an observer-role account rather than an administrator account?",
   "When would you prefer Catalyst Center event notifications over a script that polls the Intent API on a schedule?"
  ],
  "exit": [
   [
    "What endpoint and method does a script use to get a Catalyst Center token?",
    "POST to /dna/system/api/v1/auth/token with HTTP Basic authentication."
   ],
   [
    "How does each later API call prove its identity?",
    "By sending the token in the X-Auth-Token header."
   ],
   [
    "A provisioning call returns 202 and a taskId. What does that mean?",
    "The request was accepted for asynchronous processing; the script must poll the task endpoint with that taskId to learn the result."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a printed flowchart with four boxes (get token, call API with header, check for 401, poll taskId) and let them place request cards on it during the role-play.",
   "Extend: ask fast finishers to write Python that wraps API calls in a function which refreshes the token automatically on 401 and polls a taskId with a short delay until the task reports completion or a time limit is reached."
  ]
 },
 {
  "t": "SD-WAN Manager REST APIs",
  "objectives": [
   "Students will be able to describe the SD-WAN Manager authentication flow using j_security_check, the JSESSIONID cookie and the X-XSRF-TOKEN header.",
   "Students will be able to contrast SD-WAN Manager and Catalyst Center API authentication.",
   "Students will be able to read a short SD-WAN Manager script and predict its output, including the data key and hyphenated field names.",
   "Students will be able to identify common failure causes such as a silent failed login, a missing XSRF token and unclosed sessions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list answers on the whiteboard."
   ],
   [
    13,
    "Teach",
    "Draw the two-step login on the whiteboard: POST form data to j_security_check, receive JSESSIONID, GET /dataservice/client/token, attach X-XSRF-TOKEN. Next to it, draw the Catalyst Center flow for contrast. Walk through the Python script on the projector, pointing out Session, data= versus json=, the data key and hyphenated names. Cover monitoring, alarms, configuration and device action areas briefly."
   ],
   [
    17,
    "Activity",
    "Run the 'which controller' sort and debug activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Work through the discussion questions as a class."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "You have a script that works against one controller's API. Why might it fail against another vendor product even if both are REST APIs using JSON?",
  "activity": {
   "title": "Which controller, and what is broken",
   "materials": "Printed cards with authentication details (X-Auth-Token, JSESSIONID, j_security_check, /dna/system/api/v1/auth/token, X-XSRF-TOKEN, /dataservice/, response key, data key), printed broken-script cards with short SD-WAN Manager code excerpts, two whiteboard columns labeled Catalyst Center and SD-WAN Manager, tape.",
   "steps": [
    "Pairs sort the detail cards into the Catalyst Center or SD-WAN Manager column and tape them up, then compare with another pair.",
    "Each pair receives four broken-script cards: credentials sent with json=, no XSRF token before a POST, a 200 login check with no content check, and a missing logout in a loop.",
    "For each card, pairs write the symptom they would expect, the cause and the corrected line of code.",
    "Pairs present one card each to the class while the teacher confirms or corrects.",
    "Finish by having each pair write the full SD-WAN Manager login sequence from memory in four lines."
   ]
  },
  "discussion": [
   "Why does a CSRF token protect against attacks that a session cookie alone does not stop?",
   "Why should real-time device queries through the Manager be used sparingly in automation?"
  ],
  "exit": [
   [
    "Which endpoint does a script use to log in to SD-WAN Manager, and how are credentials sent?",
    "POST to /j_security_check with form-encoded j_username and j_password."
   ],
   [
    "Which header is required for POST, PUT and DELETE, and where does its value come from?",
    "X-XSRF-TOKEN, with the value from GET /dataservice/client/token."
   ],
   [
    "Which authentication header belongs to Catalyst Center, not SD-WAN Manager?",
    "X-Auth-Token."
   ]
  ],
  "differentiation": [
   "Support: give struggling students the members-only club analogy card and a side-by-side table comparing the two controllers' login steps, and let them use it during the sort.",
   "Extend: ask fast finishers to extend the sample script so it detects a failed login by checking for the JSESSIONID cookie, filters devices whose reachability is not reachable, writes them to a CSV file and logs out in a finally block."
  ]
 },
 {
  "t": "Embedded Event Manager (EEM) applets",
  "objectives": [
   "Students will be able to describe the structure of an EEM applet and identify common event detectors.",
   "Students will be able to predict the execution order of actions from their labels and fix ordering problems.",
   "Students will be able to write a simple applet that reacts to a syslog message or a timer.",
   "Students will be able to troubleshoot an applet that fails because of a missing enable action or AAA command authorization."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about smart home rules and write three student examples on the whiteboard as trigger and steps."
   ],
   [
    13,
    "Teach",
    "Map one student example onto applet syntax. Annotate the UPLINK-DOWN applet on the projector. List the event detectors in a table with a one-line use case each. Demonstrate the string-sorting trap by writing 1.0, 2.0 and 10.0 on the board and asking the class to sort them as text. Cover AAA, event manager session cli username and the show commands."
   ],
   [
    17,
    "Activity",
    "Run the applet builder and debugger activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Work through the discussion questions as a class."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "Think of a smart home or phone automation rule you know, such as 'when I arrive home, turn on the lights'. What is the trigger and what are the steps?",
  "activity": {
   "title": "Applet builder and debugger",
   "materials": "Printed scenario cards, printed broken-applet cards, blank applet templates (name line, one event line, numbered action lines), whiteboard, optional student laptops with a text editor.",
   "steps": [
    "Pairs draw two scenario cards, such as 'save the routing table when Gi0/1 goes down', 'back up the configuration nightly at 02:00' or 'log a warning when someone enters configure terminal', and write a complete applet for each on the template.",
    "Pairs swap their applets with another pair, who checks for exactly one event, an enable action first, correct event detector choice and fixed-width labels.",
    "Each pair then receives three broken-applet cards: string-sorted labels, a missing enable, and a device with AAA command authorization but no session cli username. They identify each fault and write the fix.",
    "Pairs pick one of their applets and write which show command they would use to confirm it is registered and which to confirm it fired.",
    "Two pairs present their best applet on the projector for class feedback."
   ]
  },
  "discussion": [
   "When is on-box EEM a better choice than an off-box Python or Ansible script, and when is it worse?",
   "What risks come with an applet that blocks or changes configuration automatically, and how would you limit them?"
  ],
  "exit": [
   [
    "How many events and how many actions can a basic applet have?",
    "Exactly one event and one or more actions."
   ],
   [
    "In what order do actions labeled 2.0, 10.0 and 1.0 run?",
    "1.0, 10.0, 2.0, because labels sort as strings."
   ],
   [
    "An applet's CLI actions fail on a router with AAA command authorization. What do you configure?",
    "event manager session cli username with an account authorized to run the commands."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a fill-in-the-blank applet template with the event detector choices listed and the enable action pre-printed, and start them with the syslog scenario only.",
   "Extend: ask fast finishers to design two cooperating applets using event track that bring up a backup interface when an IP SLA tracked object goes down and restore normal operation when it comes back up, including syslog messages for each change."
  ]
 },
 {
  "t": "Orchestration tools: agent-based (Puppet, Chef) vs agentless (Ansible)",
  "objectives": [
   "Students will be able to explain the difference between agent-based pull and agentless push configuration management.",
   "Students will be able to match Puppet, Chef and Ansible to their architecture, file types and languages.",
   "Students will be able to read a simple Ansible playbook and describe its play, hosts, tasks and module.",
   "Students will be able to recommend an appropriate tool for a given environment and justify the choice."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect answers, steering toward the idea of each person checking versus someone visiting."
   ],
   [
    12,
    "Teach",
    "Draw two diagrams on the whiteboard: a server with arrows coming in from agents (pull) and a control node with arrows going out to devices (push). Fill in a comparison table for Puppet, Chef and Ansible with agent, model, file type and language. Annotate the NTP playbook on the projector and explain idempotency."
   ],
   [
    18,
    "Activity",
    "Run the tool-matching card sort and consultant scenario in groups of three or four."
   ],
   [
    5,
    "Discuss",
    "Work through the discussion questions as a class."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "A company wants every office to follow the same rules. Is it better for each office to read the rulebook every morning, or for an inspector to visit each office when rules change? What are the pros and cons?",
  "activity": {
   "title": "Tool match and consultant pitch",
   "materials": "Printed cards with terms (agent, agentless, pull, push, manifest, module, recipe, cookbook, playbook, inventory, YAML, Ruby-based, catalog, control node, minion), three column headers (Puppet, Chef, Ansible) taped to the whiteboard, printed scenario cards describing different environments, sticky notes.",
   "steps": [
    "Groups sort the term cards under Puppet, Chef or Ansible, placing cards that fit more than one under each relevant tool using sticky-note copies.",
    "The teacher reviews the sort and corrects any misplaced cards with a one-sentence reason.",
    "Each group receives a scenario card, such as 'switches that cannot run extra software', 'servers needing continuous drift correction' or 'a small team new to automation', and decides which tool fits best.",
    "Groups prepare a two-minute consultant pitch naming the tool, the architecture and one weakness they would mitigate.",
    "Groups present while the class asks one challenge question per pitch."
   ]
  },
  "discussion": [
   "What does continuous drift correction give you, and what could go wrong if an agent keeps reverting changes made during an emergency?",
   "Why is storing playbooks in version control as important as the tool itself?"
  ],
  "exit": [
   [
    "Is Ansible push or pull, and does it need an agent?",
    "Push, and no agent is needed; it connects over SSH or APIs."
   ],
   [
    "Which tool uses manifests, and which uses recipes and cookbooks?",
    "Puppet uses manifests; Chef uses recipes and cookbooks."
   ],
   [
    "In a playbook, what does the hosts line refer to?",
    "A host or group defined in the Ansible inventory that the play targets."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a partially completed comparison table with the agent and model rows filled in, so they only need to add file types and languages during the card sort.",
   "Extend: ask fast finishers to write a playbook with two tasks that configures an NTP server and a logging host on a group named access_switches, using a variable for the NTP address, and explain why running it twice makes no further changes."
  ]
 },
 {
  "t": "AI in network operations: baselining, anomaly detection, AI-assisted troubleshooting and safe guardrails",
  "objectives": [
   "Students will be able to explain baselining and contrast dynamic baselines with static thresholds.",
   "Students will be able to describe anomaly detection, trend forecasting, correlation and peer comparison and give a network example of each.",
   "Students will be able to identify the risks of AI-assisted troubleshooting, including hallucinations and prompt injection.",
   "Students will be able to apply guardrails such as human in the loop, least privilege, data protection and audit logging to a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about bank fraud alerts and collect answers, linking them to the idea of learned normal behavior."
   ],
   [
    12,
    "Teach",
    "Sketch a week of utilization on the whiteboard with a flat static threshold line and a wavy baseline band, and mark one event each approach misses. Define anomaly detection, forecasting, correlation and peer comparison with one example each. Then show a sample AI assistant answer on the projector containing a plausible but invented command and ask the class how they would verify it. Finish with the guardrail list."
   ],
   [
    18,
    "Activity",
    "Run the AI change advisory board role-play in groups of four."
   ],
   [
    5,
    "Discuss",
    "Work through the discussion questions as a class."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "How does your bank decide that a card purchase looks suspicious, even when the amount is small? What would happen if it used one fixed dollar limit for everyone?",
  "activity": {
   "title": "AI change advisory board",
   "materials": "Printed scenario cards, each showing an AI assistant's finding and recommended action (some sound, some with invented commands, one containing a prompt injection, one requesting broad access), printed guardrail checklist, role cards (requester, AI output reader, approver, security reviewer), sticky notes, whiteboard.",
   "steps": [
    "Each group assigns roles. The AI output reader reads a scenario card aloud, and the requester argues for applying the recommendation.",
    "The approver and security reviewer use the guardrail checklist to question it: Is the finding verified against real data? Does the command exist on this platform? Is there a test and rollback plan? Is access least privilege? Is any sensitive data exposed? Could the input contain injected instructions?",
    "The group decides approve, approve with conditions, or reject, and writes the decision and the main reason on a sticky note.",
    "Rotate roles and repeat for at least three cards.",
    "Groups post their sticky notes on the whiteboard, and the teacher highlights the prompt injection and hallucination cards for whole-class discussion."
   ]
  },
  "discussion": [
   "Where should the line sit between tasks an AI tool can perform automatically and tasks that always need human approval?",
   "What data from your network would you be comfortable sharing with an external AI service, and what would you never share?"
  ],
  "exit": [
   [
    "Give one reason a dynamic baseline beats a static threshold.",
    "It learns what is normal for each context, so it catches unusual low values and avoids alerts for normal busy periods."
   ],
   [
    "An AI assistant suggests a command you cannot find in the platform documentation. What do you do?",
    "Treat it as a possible hallucination; do not apply it, and verify the correct command against documentation and real data before any change goes through the change process."
   ],
   [
    "What is prompt injection, and name one defense.",
    "Malicious instructions hidden in input data that try to steer an AI; defenses include least-privilege access and requiring human approval for changes."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a two-column card listing 'what AI is good at' and 'what humans must do', and a simplified guardrail checklist with four yes or no questions to use during the role-play.",
   "Extend: ask fast finishers to write a one-page AI usage policy for a network team that covers access levels, approval steps, data handling, logging and how to report a suspected prompt injection."
  ]
 }
]);
