/* Teacher edition for CompTIA Cloud+ (CV0-004): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("cloud-plus", [
 {
  "t": "Cloud service models (IaaS, PaaS, SaaS, FaaS) and the shared responsibility model",
  "objectives": [
   "Students will be able to explain the differences between IaaS, PaaS, SaaS and FaaS in terms of which layers the provider manages.",
   "Students will be able to classify a cloud service into the correct service model from a short description.",
   "Students will be able to assign a given security or operations task to the provider or the customer under the shared responsibility model.",
   "Students will be able to justify why data, identity and configuration remain customer responsibilities in every model."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect three or four answers on the whiteboard without correcting them yet. Tell students they will revisit their answers at the end."
   ],
   [
    12,
    "Teach",
    "Draw a stack of layers on the board: facility, hardware, hypervisor, OS, runtime, application, data and identity. Draw four columns for IaaS, PaaS, SaaS and FaaS and shade who manages each layer. Stress the fixed provider layers at the bottom and the fixed customer layers at the top."
   ],
   [
    15,
    "Activity",
    "Run the responsibility card sort described below in groups of three or four. Circulate and ask each group to defend one card they argued about."
   ],
   [
    8,
    "Discuss",
    "Bring the class together. Go through the disputed cards and connect each one to the two-step method: identify the model, then locate the layer."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your company pays a cloud provider every month. A hacker reads your customer list because a storage folder was left public. Who should take the blame, and why?",
  "activity": {
   "title": "Who owns it? Responsibility card sort",
   "materials": "Printed task cards (about 20, each with one task such as patch guest OS, replace a failed disk, enable MFA for users, set function timeout, configure backups on a managed database), four column labels on the whiteboard (IaaS, PaaS, SaaS, FaaS), and sticky notes in two colors for provider and customer.",
   "steps": [
    "Give each group a set of task cards and two colors of sticky notes, one color for provider and one for customer.",
    "For each card, the group decides who is responsible under each of the four models and marks it with the right color in each column.",
    "Groups place their cards on the board under the columns, so the class can see where responsibility shifts from customer to provider.",
    "Each group picks one card that caused disagreement and explains its final decision to the class in one minute.",
    "The teacher highlights cards that never change color, such as data classification and physical security, and names them as the fixed layers."
   ]
  },
  "discussion": [
   "Why do you think data and identity never move to the provider, even when the provider runs everything else?",
   "If PaaS removes OS patching work, what new risks or limits might a team accept in exchange?",
   "How would you explain the shared responsibility model to a manager who believes the provider handles all security?"
  ],
  "exit": [
   [
    "In IaaS, who patches the guest operating system?",
    "The customer."
   ],
   [
    "A SaaS user account has no MFA and is compromised. Whose responsibility is it?",
    "The customer's, because identity and access stay with the customer in every model."
   ],
   [
    "Which model bills per invocation and runs code in response to events?",
    "FaaS (serverless functions)."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially filled layer chart with the provider and customer fixed layers already shaded, so they only decide the middle layers for each model.",
   "Extend: Ask fast finishers to write a one-paragraph responsibility matrix for a containerized app on a managed Kubernetes service and explain which layers it shares with IaaS and which with PaaS."
  ]
 },
 {
  "t": "Deployment models: public, private, hybrid, community and multicloud",
  "objectives": [
   "Students will be able to define public, private, hybrid, community and multicloud deployment models.",
   "Students will be able to distinguish hybrid cloud from multicloud using a scenario.",
   "Students will be able to identify the deployment model or models present in a described organization.",
   "Students will be able to evaluate the trade-offs of each model in cost, control, compliance and skills."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take a quick show of hands for each answer. Note the split on the board."
   ],
   [
    12,
    "Teach",
    "Draw a simple diagram of each model on the board: one provider with many tenants, one organization alone, a link between private and public, several organizations around one platform, and one organization with two providers. Contrast service model versus deployment model."
   ],
   [
    15,
    "Activity",
    "Run the scenario-matching activity in pairs. Pairs label each scenario card and note at least one trade-off."
   ],
   [
    8,
    "Discuss",
    "Review cards that could carry two labels, such as hybrid and multicloud, and discuss why the exam may want the most specific one."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A company uses servers in its own building and also rents virtual machines from two different cloud providers. How many different cloud words could describe that setup?",
  "activity": {
   "title": "Name that deployment",
   "materials": "Printed scenario cards (about 10 short organization descriptions), whiteboard with five labeled zones for the models, and sticky notes.",
   "steps": [
    "Pairs receive a stack of scenario cards, for example a state agency consortium, a startup on one provider, a bank with an on-premises core and cloud web tier.",
    "For each card, the pair writes the deployment model or models on a sticky note and one trade-off the organization accepts.",
    "Pairs place the cards in the matching zone on the whiteboard, overlapping zones when a card has two labels.",
    "The teacher picks three cards and asks the pairs who placed them to explain the clues that led to their choice.",
    "The class corrects any misplaced cards together and lists the clue words for each model on the board."
   ]
  },
  "discussion": [
   "When might an organization become multicloud without ever planning to, and what problems would that create?",
   "Why might a hospital accept the higher cost of a private cloud for some systems?",
   "What would need to be agreed before several organizations could share a community cloud?"
  ],
  "exit": [
   [
    "A company links its on-premises data center to one public cloud. Which model is this?",
    "Hybrid cloud."
   ],
   [
    "A company uses two public cloud providers and nothing on premises. Which model is this?",
    "Multicloud."
   ],
   [
    "What is cloud bursting?",
    "Sending overflow demand from a private environment to a public cloud when local capacity runs out."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card listing each model with one clue phrase, such as many unrelated tenants for public, so students can match clues to models during the activity.",
   "Extend: Ask fast finishers to write a short recommendation for the hospital in the hook, naming the models involved and one risk and one mitigation for each."
  ]
 },
 {
  "t": "Regions, availability zones, edge locations and designing for high availability",
  "objectives": [
   "Students will be able to describe the relationship between regions, availability zones and edge locations.",
   "Students will be able to identify single points of failure in a simple cloud architecture diagram.",
   "Students will be able to design a multi-AZ architecture for a web application with a load balancer and a database.",
   "Students will be able to distinguish high availability from disaster recovery and choose the right scope for a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up prompt aloud and give students one minute to write an answer. Ask two volunteers to share."
   ],
   [
    12,
    "Teach",
    "Draw nested boxes on the whiteboard: a region containing three zones, and small edge dots spread outside. Place a web app in one zone, then redraw it across two zones with a load balancer and a database standby. Explain what each change protects against."
   ],
   [
    15,
    "Activity",
    "Run the failure drill activity in small groups. Each group fixes a fragile architecture and tests it against failure cards."
   ],
   [
    8,
    "Discuss",
    "Compare group designs. Ask which failures multi-AZ survives and which require multi-region, and discuss the cost of each step."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your favorite streaming service stays online even when a storm knocks out power to one of its data centers. What do you think its engineers did to make that possible?",
  "activity": {
   "title": "Failure drill: find and fix the single points of failure",
   "materials": "A printed or projected diagram of a web app with one web server, one database and one NAT gateway in a single zone; failure cards (zone power loss, instance crash, region outage, database corruption); whiteboard markers or paper for redesigns.",
   "steps": [
    "Groups study the fragile diagram and circle every single point of failure they can find.",
    "Each group redraws the architecture to survive a single zone failure, labeling zones, the load balancer, standby database and per-zone NAT gateways.",
    "The teacher draws a failure card and each group explains whether its design survives it and how traffic and data recover.",
    "Repeat with two more failure cards, including a region outage, so groups see where multi-AZ stops protecting them.",
    "Groups write one sentence on what extra component or plan would be needed for the failures they did not survive."
   ]
  },
  "discussion": [
   "How would you decide whether a service is worth the cost of a multi-region design?",
   "Why might synchronous replication work between zones but be a poor idea between distant regions?",
   "Which hidden single points of failure are easy to overlook in a cloud design?"
  ],
  "exit": [
   [
    "What makes availability zones independent of each other?",
    "Each has its own power, cooling and networking in physically separate facilities."
   ],
   [
    "A whole region becomes unavailable. Does a multi-AZ design keep the service running?",
    "No. Multi-AZ stays within one region; surviving a regional outage needs a second region and a DR plan."
   ],
   [
    "Where should you look first to reduce latency for static images delivered to distant users?",
    "A CDN that caches content at edge locations."
   ]
  ],
  "differentiation": [
   "Support: Give students a template diagram with zone boxes already drawn and component icons to place, so they can focus on where redundancy goes rather than drawing.",
   "Extend: Ask fast finishers to estimate which components multiply into the overall availability of their design and explain how one non-redundant component limits the whole."
  ]
 },
 {
  "t": "Virtualization and compute: hypervisors, instance families, dedicated hosts and multitenancy",
  "objectives": [
   "Students will be able to compare type 1 and type 2 hypervisors and state where each is used.",
   "Students will be able to select an appropriate instance family from a workload's resource profile.",
   "Students will be able to explain when a dedicated host or dedicated instance is required instead of shared multitenant hardware.",
   "Students will be able to describe oversubscription and recognize noisy-neighbor symptoms."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect ideas about how one computer could act as many. Write key words on the board."
   ],
   [
    12,
    "Teach",
    "Draw a host with a type 1 hypervisor and several guests, then a laptop with a host OS and a type 2 hypervisor. Show a table of instance families with one example workload each. Explain multitenancy, dedicated instances, dedicated hosts and oversubscription."
   ],
   [
    15,
    "Activity",
    "Run the right-size the workload activity with printed monitoring snapshots. Pairs choose a family and justify it."
   ],
   [
    8,
    "Discuss",
    "Review choices, emphasizing the licensing scenario and the burstable instance trap. Ask students what evidence they used."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A single physical server in a cloud data center may run dozens of separate customers' computers at once. How do you think it keeps them from seeing each other's data?",
  "activity": {
   "title": "Right-size the workload",
   "materials": "Printed cards showing simple monitoring snapshots (CPU percent, memory percent, disk wait, notes such as licensed per core), a projected table of instance families, and sticky notes.",
   "steps": [
    "Pairs receive six workload cards, each with a short description and a monitoring snapshot.",
    "For each card, the pair picks an instance family or hosting option, such as memory-optimized, compute-optimized, burstable or dedicated host, and writes the reason on a sticky note.",
    "Pairs swap cards with a neighboring pair and review each other's choices, marking any they disagree with.",
    "The teacher reveals the intended answers and asks pairs that disagreed to explain their reasoning.",
    "The class lists the clue in each snapshot that pointed to the right choice."
   ]
  },
  "discussion": [
   "What trade-offs does a provider make when it oversubscribes hosts, and how might it protect customers from noisy neighbors?",
   "Why might a company accept the higher cost and planning work of a dedicated host?",
   "When would a type 2 hypervisor still be the better tool for an IT professional?"
  ],
  "exit": [
   [
    "Which hypervisor type runs directly on hardware?",
    "Type 1 (bare metal)."
   ],
   [
    "A database license is counted per physical core. Which compute option helps prove compliance?",
    "A dedicated host."
   ],
   [
    "A cache workload is short on memory but its CPU is idle. Which instance family fits?",
    "Memory-optimized."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-line rule for each family, such as CPU high and memory low means compute-optimized, to use as a lookup during the activity.",
   "Extend: Ask fast finishers to explain how CPU steal time could appear in monitoring and what steps they would take to confirm and fix a noisy-neighbor problem."
  ]
 },
 {
  "t": "Containers, orchestration and serverless compared with virtual machines",
  "objectives": [
   "Students will be able to compare VMs, containers and serverless functions in isolation, startup time, control and cost.",
   "Students will be able to explain the roles of pods, deployments and services in Kubernetes orchestration.",
   "Students will be able to select the best compute model for a described workload and justify the choice.",
   "Students will be able to identify the limits of serverless, including execution time limits and cold starts."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers in three columns without labeling them yet."
   ],
   [
    12,
    "Teach",
    "Draw three stacks side by side: VM with guest OS, containers sharing one kernel, and a function triggered by an event. Then draw a small Kubernetes cluster with pods, a deployment and a service. Label the earlier warm-up columns VM, container and serverless."
   ],
   [
    15,
    "Activity",
    "Run the workload auction activity. Groups bid their compute model on each workload card and defend their bid."
   ],
   [
    8,
    "Discuss",
    "Discuss workloads where groups chose differently and the clues that should decide them."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of three tasks a company's software might do: run all day, run only when a customer uploads a file, and run an old program that only works on one version of Windows. Should they all run the same way?",
  "activity": {
   "title": "Workload auction",
   "materials": "Printed workload cards (eight short descriptions), three paddle signs per group labeled VM, Container and Serverless (paper is fine), and a whiteboard scoreboard.",
   "steps": [
    "Divide the class into groups and give each group three paddle signs.",
    "The teacher reads a workload card aloud, such as a nightly report that runs four hours or a webhook handler that runs for one second.",
    "Groups have thirty seconds to agree and raise one paddle. The teacher records each group's choice on the board.",
    "One group that chose differently from the majority explains its reasoning, and the teacher confirms the best fit and the deciding clue.",
    "After all cards, groups write a one-sentence rule of thumb for each compute model."
   ]
  },
  "discussion": [
   "Why might a company keep some workloads on VMs even after adopting containers everywhere else?",
   "What new operational skills does a team need when it moves from VMs to Kubernetes?",
   "When could serverless end up more expensive than a container running all the time?"
  ],
  "exit": [
   [
    "What do containers share that VMs do not?",
    "The host operating system kernel."
   ],
   [
    "Name one limit of serverless functions.",
    "A maximum execution time, cold-start latency or limited control over the environment."
   ],
   [
    "Which Kubernetes object gives a group of pods a stable network address?",
    "A service."
   ]
  ],
  "differentiation": [
   "Support: Provide a comparison grid with rows for startup time, isolation, control and billing, partly filled, for students to complete before the auction.",
   "Extend: Ask fast finishers to sketch a design that uses all three models for one application and explain the hand-off between each part."
  ]
 },
 {
  "t": "Microservices, event-driven architecture, message queues and API gateways",
  "objectives": [
   "Students will be able to contrast monolithic and microservices architectures, including the operational costs of microservices.",
   "Students will be able to distinguish a message queue from a pub/sub topic and state when to use each.",
   "Students will be able to explain the role of a dead-letter queue in reliable messaging.",
   "Students will be able to list the cross-cutting functions an API gateway provides and identify scenarios that call for one."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the restaurant and take a few answers. Connect them to software teams."
   ],
   [
    12,
    "Teach",
    "Draw a monolith box, then split it into services. Add an API gateway in front, a queue between order and warehouse, and a topic fanning out to email, billing and analytics. Add a dead-letter queue beside the main queue."
   ],
   [
    15,
    "Activity",
    "Run the human message bus role-play described below, first with direct calls and then with a queue and topic."
   ],
   [
    8,
    "Discuss",
    "Ask what changed when the queue was added and what happened to the slow warehouse. Connect to loose coupling and asynchronous processing."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "In a busy restaurant, what would happen if every waiter had to stand next to the cook and wait until each dish was finished before taking the next order?",
  "activity": {
   "title": "Human message bus",
   "materials": "Index cards or sticky notes as messages, a shoebox or marked area on a desk as the queue, a second marked area as the dead-letter queue, and role labels (Order service, Warehouse, Email, Billing, Analytics, Gateway).",
   "steps": [
    "Assign roles. In round one, the order student must hand each order card directly to the warehouse student and wait while the warehouse student slowly copies it.",
    "Time how many orders get through in two minutes and note how the order service is blocked.",
    "In round two, the order student drops cards into the queue box and keeps going, while the warehouse student pulls cards at their own pace. Add a second warehouse student halfway through to show scaling consumers.",
    "Add a pub/sub step: the teacher calls out each order as an event and the email, billing and analytics students each record it.",
    "Slip in a card with an unreadable order. After two failed attempts the warehouse student moves it to the dead-letter area, and the class discusses why."
   ]
  },
  "discussion": [
   "What new problems did the microservices version create that the monolith did not have?",
   "When should a service still call another service directly and wait for the answer?",
   "Why is it useful to have authentication and rate limiting in a gateway rather than in each service?"
  ],
  "exit": [
   [
    "A message must be processed by exactly one worker from a pool. Queue or pub/sub?",
    "Queue."
   ],
   [
    "One event must trigger email, billing and analytics at the same time. Queue or pub/sub?",
    "Pub/sub (a topic that fans out to all subscribers)."
   ],
   [
    "Which component provides a single entry point with authentication and rate limiting for many APIs?",
    "An API gateway."
   ]
  ],
  "differentiation": [
   "Support: Give students a labeled diagram of the final design to annotate during the role-play, so they can match each role to a component.",
   "Extend: Ask fast finishers to describe how distributed tracing would follow one order through the gateway, the queue and three subscribers, and what a trace identifier is for."
  ]
 },
 {
  "t": "Cloud storage types: block, file and object; storage tiers and performance (IOPS, throughput)",
  "objectives": [
   "Students will be able to distinguish block, file and object storage by access method and typical use.",
   "Students will be able to recommend a storage tier and lifecycle policy for data with a described access pattern.",
   "Students will be able to explain the difference between IOPS, throughput and latency.",
   "Students will be able to diagnose whether a slow workload is IOPS-bound or throughput-bound from simple metrics."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sort answers into three groups on the board: things one person uses, things a team shares, and things kept for a long time."
   ],
   [
    12,
    "Teach",
    "Draw the three storage types with icons: a disk attached to one VM, a share mounted by many VMs, and a bucket accessed through an API. Show hot, cool and archive tiers as a staircase with storage cost going down and retrieval cost going up. Define IOPS, throughput and latency with a simple example."
   ],
   [
    15,
    "Activity",
    "Run the storage matchmaker card activity. Groups match workloads to storage types and tiers, then diagnose two metric snapshots."
   ],
   [
    8,
    "Discuss",
    "Review matches and the metric diagnoses, focusing on common traps such as databases on object storage."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of everything you store: things on your desk, files your class shares, and old papers in a box at home. Why might each need a different kind of storage?",
  "activity": {
   "title": "Storage matchmaker",
   "materials": "Printed workload cards (ten short scenarios), three storage type cards and three tier cards per group, two printed metric snapshots showing IOPS, MB/s and latency, and a whiteboard.",
   "steps": [
    "Groups receive workload cards such as a boot disk, a shared home directory, video archives kept for ten years and a data lake for analytics.",
    "Groups match each workload to block, file or object storage and, for object data, choose a tier.",
    "Each group writes one lifecycle rule for any workload whose access drops over time.",
    "Groups examine the two metric snapshots and decide which is IOPS-bound and which is throughput-bound, writing their evidence.",
    "The teacher reviews answers, and groups correct any mismatches on the board."
   ]
  },
  "discussion": [
   "How would you explain to a finance manager why cheaper storage tiers can sometimes cost more?",
   "What risks come with storing important data only on one block volume in one availability zone?",
   "Why might upgrading a storage volume not fix a slow application?"
  ],
  "exit": [
   [
    "Which storage type is reached through HTTP APIs and stores data with keys and metadata?",
    "Object storage."
   ],
   [
    "A database performs many small random reads and writes. Which metric matters most?",
    "IOPS."
   ],
   [
    "What automatically moves aging objects to cheaper tiers?",
    "A lifecycle policy."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-column cheat sheet listing each storage type's access method, sharing ability and typical uses to consult during the matching.",
   "Extend: Ask fast finishers to estimate throughput from given IOPS and block sizes and explain why large-block workloads hit throughput limits first."
  ]
 },
 {
  "t": "Virtual networks: VPC/VNet design, CIDR planning, subnets, route tables, NAT and internet gateways",
  "objectives": [
   "Students will be able to calculate the number of addresses in a CIDR block and plan non-overlapping ranges.",
   "Students will be able to design a VPC with public and private subnets across two availability zones.",
   "Students will be able to explain how route tables, internet gateways and NAT gateways determine whether a subnet is public or private.",
   "Students will be able to troubleshoot common connectivity problems such as missing NAT routes and overlapping ranges."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about street addresses and let two students answer. Link duplicate addresses to overlapping CIDR ranges."
   ],
   [
    12,
    "Teach",
    "Work through CIDR math on the board: /16, /20, /24, showing how each bit doubles or halves the range. Draw a VPC with two zones, public and private subnets, an internet gateway, NAT gateways and two route tables. Trace a packet from a private instance to the internet."
   ],
   [
    15,
    "Activity",
    "Run the whiteboard VPC design activity in pairs, followed by a route table repair challenge."
   ],
   [
    8,
    "Discuss",
    "Review two pairs' designs on the projector and discuss how each would handle a zone failure and a future VPN."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If two houses in a city had exactly the same street address, what would happen to the mail? How might that relate to connecting two networks?",
  "activity": {
   "title": "Design and repair a VPC",
   "materials": "Whiteboard or large paper per pair, markers, a printed requirements sheet (VPC range, two zones, public and private tiers, office range to avoid), and a printed broken route table excerpt.",
   "steps": [
    "Pairs read the requirements and choose a VPC CIDR that does not overlap the office range.",
    "Pairs carve four /24 subnets, one public and one private per zone, writing each range on their drawing.",
    "Pairs write the route table for public and private subnets, including the local route and the correct 0.0.0.0/0 targets.",
    "The teacher hands out a broken route table excerpt where a private subnet points 0.0.0.0/0 to the internet gateway and another has no default route. Pairs identify and correct both problems.",
    "Two pairs present their designs and repairs to the class."
   ]
  },
  "discussion": [
   "Why is it hard to change a VPC's address range after workloads are running?",
   "What are the costs and benefits of one NAT gateway per zone compared with a single shared one?",
   "How would you keep many teams from choosing overlapping ranges in a large organization?"
  ],
  "exit": [
   [
    "What makes a subnet public?",
    "A route table entry sending 0.0.0.0/0 to an internet gateway."
   ],
   [
    "Where must a NAT gateway be placed?",
    "In a public subnet with a route to the internet gateway."
   ],
   [
    "How many addresses are in a /16?",
    "65,536."
   ]
  ],
  "differentiation": [
   "Support: Provide a CIDR reference chart from /16 to /28 with address counts so students can focus on the design rather than the math.",
   "Extend: Ask fast finishers to split a /22 into four equal subnets, list each subnet's range, and explain how many addresses remain usable after provider reservations."
  ]
 },
 {
  "t": "Hybrid connectivity: site-to-site VPN, dedicated interconnects, peering and transit hubs",
  "objectives": [
   "Students will be able to compare site-to-site VPNs and dedicated interconnects in bandwidth, latency, cost, security and setup time.",
   "Students will be able to explain why VPC peering is not transitive and calculate how full-mesh peering grows.",
   "Students will be able to design a hub-and-spoke network using a transit hub for many VPCs and on-premises sites.",
   "Students will be able to select the right connectivity option for a described business requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch the student suggestions as roads between two buildings."
   ],
   [
    12,
    "Teach",
    "Draw an office and a cloud VPC. Add a VPN tunnel across an internet cloud, then a dedicated line through a colocation box. Draw three VPCs with peering and show that A cannot reach C. Redraw with a transit hub in the middle. Explain BGP failover between the interconnect and the VPN."
   ],
   [
    15,
    "Activity",
    "Run the string mesh activity, then pairs choose connectivity for four scenario cards."
   ],
   [
    8,
    "Discuss",
    "Discuss the scenario choices and the security question of encryption over private links."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your company has an office and a set of servers in the cloud. What are some ways you could connect them, and what would you worry about with each?",
  "activity": {
   "title": "String mesh versus hub",
   "materials": "Ball of yarn or string, sticky notes labeled VPC A through VPC F, one sticky note labeled Hub, and printed scenario cards for the second half.",
   "steps": [
    "Six students each hold a VPC sticky note. Using string, the class connects every pair directly, counting the connections as they go, and observes the tangle.",
    "Ask what happens to the string count when a seventh VPC joins, and write the formula on the board.",
    "Rebuild with one student as the hub. Each VPC connects only to the hub, and the class compares the number of strings.",
    "Demonstrate non-transitivity: with peering strings only between A-B and B-C, ask whether a message can pass from A to C, and explain why not.",
    "In pairs, students read four scenario cards and choose site-to-site VPN, point-to-site VPN, dedicated interconnect, peering or transit hub, writing one reason each."
   ]
  },
  "discussion": [
   "When would the cost and lead time of a dedicated interconnect be clearly worth it?",
   "Why might a security team still require encryption over a private link?",
   "What new risks does a central transit hub introduce, and how could you reduce them?"
  ],
  "exit": [
   [
    "Which option gives consistent latency without crossing the public internet?",
    "A dedicated interconnect."
   ],
   [
    "Is VPC peering transitive?",
    "No. Each pair that must communicate needs its own peering, or a transit hub."
   ],
   [
    "What is a common backup for a dedicated interconnect?",
    "A site-to-site VPN, with BGP for automatic failover."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision flowchart with questions such as Do you need it this week? and Is the traffic between clouds or to an office? to guide scenario choices.",
   "Extend: Ask fast finishers to design route tables on a transit hub that let development and production spokes reach shared services but not each other."
  ]
 },
 {
  "t": "Load balancing, DNS routing and content delivery networks",
  "objectives": [
   "Students will be able to compare layer 4 and layer 7 load balancers and choose one for a scenario.",
   "Students will be able to describe weighted, latency-based, geolocation and failover DNS routing policies.",
   "Students will be able to explain how TTL caching affects DNS failover and CDN content freshness.",
   "Students will be able to design a traffic path that combines DNS routing, load balancing and a CDN."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect ideas on how a site survives a sudden rush."
   ],
   [
    12,
    "Teach",
    "Draw a user, DNS, two regions with a load balancer and server pools each, and a CDN edge near the user. Trace a request through each layer. Contrast layer 4 and layer 7 using an envelope analogy: layer 4 reads only the address, layer 7 opens the letter."
   ],
   [
    15,
    "Activity",
    "Run the traffic cop role-play, then groups solve symptom cards by naming the responsible layer and fix."
   ],
   [
    8,
    "Discuss",
    "Review the symptom cards, focusing on TTL caching and path routing."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When a huge news story breaks, millions of people visit the same website at once. What do you think stops the website from falling over?",
  "activity": {
   "title": "Traffic cop role-play and symptom cards",
   "materials": "Sticky notes as requests labeled with paths (/api, /images, /video), three students as servers with signs, one student as the load balancer, one as a CDN edge with a few pre-made image notes, and printed symptom cards.",
   "steps": [
    "The load balancer student receives request notes and hands them to server students, first by round robin, then by path rules to show layer 7 routing.",
    "Mid-round, one server student sits down to simulate a failed health check, and the load balancer must stop sending notes to them.",
    "Requests for images go first to the CDN student, who answers from stock if available and sends misses to the servers, showing cache hits and misses.",
    "In groups, students read symptom cards such as old image still showing, failover slow for some users, or video traffic slowing the whole site, and name the layer and the fix.",
    "Groups share answers and the teacher confirms each one."
   ]
  },
  "discussion": [
   "What are the trade-offs of setting a very low DNS TTL all the time?",
   "Why might a team decide to terminate TLS at the load balancer rather than on every server?",
   "How could a CDN help during an attack that floods a site with traffic?"
  ],
  "exit": [
   [
    "Which load balancer type can route by URL path?",
    "Layer 7 (application)."
   ],
   [
    "Why can DNS failover take minutes to reach all users?",
    "Clients and resolvers cache the old answer until the TTL expires."
   ],
   [
    "What service caches static content at edge locations close to users?",
    "A CDN."
   ]
  ],
  "differentiation": [
   "Support: Give students a labeled diagram showing where each service sits in the request path, to use when solving the symptom cards.",
   "Extend: Ask fast finishers to plan a region migration using weighted DNS and TTL changes, writing the order of steps and the TTL values they would choose and why."
  ]
 },
 {
  "t": "Disaster recovery architectures: backup and restore, pilot light, warm standby, multisite active-active; RPO and RTO",
  "objectives": [
   "Students will be able to define RPO and RTO and calculate a worst-case RPO from a backup schedule.",
   "Students will be able to order the four cloud DR patterns by cost and recovery speed.",
   "Students will be able to select the cheapest DR pattern that meets stated RPO and RTO targets.",
   "Students will be able to explain why DR plans must be tested and why replication does not replace backups."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list answers, then point out which answers are about lost work and which are about downtime."
   ],
   [
    12,
    "Teach",
    "Draw a timeline with the disaster in the middle: RPO stretching back to the last good copy and RTO stretching forward to service restored. Draw the four patterns as a staircase with cost rising and RTO falling. Give one example system for each."
   ],
   [
    15,
    "Activity",
    "Run the DR design challenge in groups using system cards with RPO, RTO and budget notes."
   ],
   [
    8,
    "Discuss",
    "Groups present one choice each. Discuss a ransomware scenario to show why backups remain essential."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If your laptop died right now, how much of your work would you lose, and how long would it take you to get working again on a new one?",
  "activity": {
   "title": "DR design challenge",
   "materials": "Printed system cards (for example a payroll system, a public website, an internal wiki, a payments platform) each listing an RPO, an RTO and a budget level; the four pattern names written on the whiteboard; sticky notes.",
   "steps": [
    "Groups receive four system cards and read the RPO, RTO and budget for each.",
    "For each system, the group chooses the cheapest DR pattern that meets both targets and places a sticky note under that pattern on the board.",
    "Groups write one failover step and one test they would run for each system.",
    "The teacher introduces a twist card: ransomware encrypted data two hours ago and replication copied it. Groups explain how each of their designs would recover.",
    "Groups compare placements and adjust any that do not meet the targets."
   ]
  },
  "discussion": [
   "Who in an organization should set RPO and RTO, and why should it not be only the IT team?",
   "What would you expect to go wrong the first time a team tests a full failover?",
   "How should a company decide when to fail back to its original region?"
  ],
  "exit": [
   [
    "What does RTO measure?",
    "The maximum acceptable time to restore service after an incident."
   ],
   [
    "Order the DR patterns from cheapest to most expensive.",
    "Backup and restore, pilot light, warm standby, active-active."
   ],
   [
    "Backups run every 6 hours. What is the worst-case RPO?",
    "About 6 hours."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference table showing each pattern's typical RTO range, RPO and relative cost for students to consult while choosing.",
   "Extend: Ask fast finishers to write a short failover and failback runbook for a warm standby design, including who declares the disaster and how DNS is switched."
  ]
 },
 {
  "t": "Cloud cost models: on-demand, reserved and committed use, spot, tagging for showback and chargeback",
  "objectives": [
   "Students will be able to compare on-demand, reserved or committed, and spot pricing models.",
   "Students will be able to recommend a pricing mix for a workload with a described usage pattern.",
   "Students will be able to explain how tags or account structure enable cost allocation.",
   "Students will be able to distinguish showback from chargeback and describe the prerequisites for each."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about transportation choices and record answers on the board."
   ],
   [
    12,
    "Teach",
    "Draw a usage graph over a week with a steady baseline, daily rises and a short spike. Shade the baseline as committed, the daily rise as on-demand and the spike as spot. Then show a short tagged billing table and explain showback versus chargeback."
   ],
   [
    15,
    "Activity",
    "Run the cut the bill activity using a printed resource list. Groups choose pricing models, find waste and allocate costs by tag."
   ],
   [
    8,
    "Discuss",
    "Compare groups' savings decisions and discuss risks they accepted, such as spot interruptions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you had to get to school every day for three years, would you take a taxi each day, buy a yearly pass or wait for free rides that sometimes do not come? What about a one-time trip to the airport?",
  "activity": {
   "title": "Cut the bill",
   "materials": "A printed mock resource list (about 15 rows with resource type, hours running, usage notes such as steady, nightly batch or idle since March, and tags, some missing), a calculator or student laptops, and highlighters.",
   "steps": [
    "Groups review the resource list and mark each row as baseline, variable, interruptible or waste.",
    "For each row, the group chooses on-demand, committed or spot, or recommends shutting down, scheduling or rightsizing, and writes a one-line reason.",
    "Groups highlight every untagged resource and propose a tagging standard with three required keys.",
    "Using the tagged rows, groups total costs by cost center and decide whether the organization is ready for showback or chargeback.",
    "Each group shares its biggest saving and its biggest risk with the class."
   ]
  },
  "discussion": [
   "What risks does a company take on when it signs a three-year commitment?",
   "Why might showback reduce waste even though no one is billed?",
   "How should shared costs such as networking or a shared cluster be split between departments?"
  ],
  "exit": [
   [
    "Which pricing model best fits a steady production database that runs all the time?",
    "Reserved or committed use pricing."
   ],
   [
    "Which pricing model fits a fault-tolerant batch job that must be as cheap as possible?",
    "Spot (preemptible) instances."
   ],
   [
    "What is the difference between showback and chargeback?",
    "Showback reports costs to teams; chargeback actually bills them to their budgets."
   ]
  ],
  "differentiation": [
   "Support: Give students a decision card with three questions: Does it run all the time? Can it be interrupted? Is it short-term? Each answer points to a pricing model.",
   "Extend: Ask fast finishers to design a tagging policy with enforcement rules and a monthly budget alert plan for three departments, including how they would handle untagged resources."
  ]
 },
 {
  "t": "Deployment strategies: blue-green, canary, rolling, in-place and A/B releases, with rollback plans",
  "objectives": [
   "Students will be able to describe how in-place, rolling, blue-green, canary and A/B releases replace an old version.",
   "Students will be able to compare the strategies by downtime, extra capacity needed and rollback speed.",
   "Students will be able to select the best strategy for a scenario that states a constraint such as zero downtime or no spare capacity.",
   "Students will be able to write a basic rollback plan with triggers, steps and an approver."
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
    "Draw each strategy as boxes and arrows on the board: servers, load balancer, traffic share. For each, ask the class where downtime, extra cost and rollback speed fall. Finish by contrasting canary and A/B testing by purpose."
   ],
   [
    18,
    "Activity",
    "Run the strategy matching card sort in small groups, then have each group justify one scenario aloud."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect strategies to rollback plans and database changes."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "You run a food truck that is changing its whole menu tomorrow. Would you close for a day, change one dish at a time, park a second truck next to the first, or offer the new menu to a few regulars first? What could go wrong with each?",
  "activity": {
   "title": "Strategy match and rollback plan",
   "materials": "Printed scenario cards (one constraint per card), printed strategy cards for the five strategies, sticky notes, whiteboard.",
   "steps": [
    "Give each group of three or four a set of eight scenario cards, such as 'must roll back in seconds', 'no budget for extra servers, short outage acceptable' and 'marketing wants to compare two homepages'.",
    "Groups match each scenario to one strategy card and write the deciding clue word on a sticky note.",
    "Each group picks one of its scenarios and writes a four-line rollback plan: trigger, steps, approver, data reversal.",
    "Groups swap rollback plans and mark anything missing, then the teacher reviews two plans on the projector or board."
   ]
  },
  "discussion": [
   "Why might a team choose rolling over blue-green even though blue-green rolls back faster?",
   "What makes database changes the hardest part of any rollback, and how can a team design around it?"
  ],
  "exit": [
   [
    "Which strategy gives the fastest rollback and what does it cost?",
    "Blue-green; it requires running two full environments, roughly double capacity during the release."
   ],
   [
    "A team sends 5 percent of traffic to a new version and watches error rates. What is this called?",
    "A canary release."
   ],
   [
    "Name two items a rollback plan must contain.",
    "Any two of: trigger conditions, exact steps, approver, data reversal method, location of the previous artifact."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-column table (downtime, extra capacity, rollback speed) pre-filled for two strategies so they complete the rest before the card sort.",
   "Extend: Ask fast finishers to design an expand-and-contract database change that lets blue and green run against the same database during a blue-green release."
  ]
 },
 {
  "t": "Migration strategies: rehost, replatform, refactor, repurchase, retire and retain",
  "objectives": [
   "Students will be able to define each of the six migration strategies and the optional seventh, relocate.",
   "Students will be able to identify the strategy described in a scenario from its clue words.",
   "Students will be able to compare rehost, replatform and refactor by effort, risk and cloud benefit.",
   "Students will be able to recommend a strategy for an application and justify it with business constraints."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the moving-house warm-up question and list student answers on the board in six loose groups without naming them yet."
   ],
   [
    12,
    "Teach",
    "Reveal the six R names and map them to the students' groups. Draw a ladder for rehost, replatform, refactor showing effort and benefit rising. Give one clear example of each."
   ],
   [
    18,
    "Activity",
    "Run the portfolio triage exercise in small groups."
   ],
   [
    5,
    "Discuss",
    "Groups compare decisions on the contested cards and discuss the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions individually on paper."
   ]
  ],
  "warmup": "You are moving across the country in a month. Think of five things you own. For each, would you move it as is, fix it up first, replace it, throw it out or leave it with a friend? Why?",
  "activity": {
   "title": "Portfolio triage",
   "materials": "Printed application cards (name, description, age, users, constraints), six large sticky notes labeled with the R names, whiteboard or table space.",
   "steps": [
    "Give each group of three or four a deck of twelve application cards, such as 'payroll tool replaced next year', 'custom booking app that must scale for summer peaks' and 'on-premises CRM with an equivalent SaaS product'.",
    "Groups place each card under one of the six labeled sticky notes and write a one-line reason on the card.",
    "The teacher calls out a deadline change, such as 'the data center closes in four months', and groups must move any cards that no longer fit.",
    "Each group presents its two hardest decisions and explains which constraint drove them."
   ]
  },
  "discussion": [
   "Why do many organizations rehost first and refactor later instead of refactoring everything at once?",
   "What risks come with retiring an application, and how would you reduce them?"
  ],
  "exit": [
   [
    "Which strategy moves an application unchanged and is fastest?",
    "Rehost (lift and shift)."
   ],
   [
    "A team switches its self-managed database to a managed service with no code changes. Name the strategy.",
    "Replatform."
   ],
   [
    "Give one reason an organization might choose retain.",
    "Any of: recent hardware investment, specialized hardware dependency, compliance or residency constraints, planned replacement, or not worth moving yet."
   ]
  ],
  "differentiation": [
   "Support: Provide a clue-word reference card listing typical phrases for each strategy, such as 'as is' for rehost and 'SaaS' for repurchase, for students to use during the triage.",
   "Extend: Ask fast finishers to sequence their portfolio into a two-phase plan that rehosts first and names which applications should be replatformed or refactored afterward and why."
  ]
 },
 {
  "t": "Migration planning: discovery, dependency mapping, pilot waves, cutover and validation",
  "objectives": [
   "Students will be able to sequence the migration phases from discovery to decommissioning.",
   "Students will be able to explain why dependency mapping determines move groups.",
   "Students will be able to identify which skipped phase explains a described migration failure.",
   "Students will be able to draft a cutover checklist with a go or no-go point and rollback path."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about planning a move and collect ideas on the board."
   ],
   [
    12,
    "Teach",
    "Walk through the five phases using the Copperline example: slow app, database left behind. At each phase ask what data the team would collect and what could go wrong if it were skipped."
   ],
   [
    18,
    "Activity",
    "Run the dependency map and wave planning exercise in groups."
   ],
   [
    5,
    "Discuss",
    "Groups share their pilot choice and cutover checklist; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on index cards."
   ]
  ],
  "warmup": "Your school is moving to a new building over spring break. What would you need to know about every room and every piece of equipment before you start packing?",
  "activity": {
   "title": "Map it, then wave it",
   "materials": "Printed system cards (ten systems with short descriptions and listed connections), string or whiteboard markers for drawing lines, sticky notes, whiteboard.",
   "steps": [
    "Give each group a set of ten system cards, such as web front end, order database, reporting server, file share, internal wiki and directory service, each listing what it connects to.",
    "Groups lay out the cards and draw lines between dependent systems, then circle clusters that must move together as move groups.",
    "Groups choose a pilot wave of one or two low-risk systems and schedule the remaining move groups into two later waves, noting why.",
    "Each group writes a five-line cutover checklist for its biggest wave, including freeze, final sync, DNS switch, go or no-go owner and rollback step."
   ]
  },
  "discussion": [
   "What kinds of dependencies are hardest to discover automatically, and how would you find them?",
   "How long should a team keep the old servers after cutover, and what decides that?"
  ],
  "exit": [
   [
    "Put these in order: cutover, discovery, validation, pilot wave, dependency mapping.",
    "Discovery, dependency mapping, pilot wave, cutover, validation."
   ],
   [
    "An app migrated to the cloud is slow, and its database is still on premises. Which phase was weak?",
    "Dependency mapping."
   ],
   [
    "Why does discovery collect weeks of utilization data?",
    "To right-size cloud resources based on real usage, including peaks, rather than configured specifications."
   ]
  ],
  "differentiation": [
   "Support: Give students a partially completed dependency map with two clusters already circled so they focus on choosing the pilot and waves.",
   "Extend: Ask fast finishers to add a hidden dependency card revealed mid-activity, such as a licensing server, and revise their waves and cutover plan to handle it."
  ]
 },
 {
  "t": "Online vs offline data transfer, transfer appliances and database migration with minimal downtime",
  "objectives": [
   "Students will be able to calculate approximate transfer time from data size and bandwidth.",
   "Students will be able to choose between online transfer and a transfer appliance for a given scenario.",
   "Students will be able to explain how an initial load plus change data capture minimizes database downtime.",
   "Students will be able to distinguish homogeneous from heterogeneous database migrations."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and let students guess; write guesses on the board to revisit after the math."
   ],
   [
    12,
    "Teach",
    "Model the bytes-to-bits conversion with 100 TB over 1 Gbps on the board. Introduce transfer appliances, then draw the three database stages: initial load, CDC, cutover. Contrast homogeneous and heterogeneous migrations."
   ],
   [
    18,
    "Activity",
    "Run the transfer decision relay in pairs."
   ],
   [
    5,
    "Discuss",
    "Revisit the warm-up guesses and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If you had to send 50 TB of files to a friend across the country, would it be faster to upload them over your home internet or to mail a box of hard drives? Make a guess before we do any math.",
  "activity": {
   "title": "Transfer decision relay",
   "materials": "Printed scenario cards with data size, bandwidth, deadline and database details; calculators or student laptops with a browser calculator; whiteboard.",
   "steps": [
    "Give each pair six scenario cards, such as '20 TB, 1 Gbps dedicated link, two weeks' and '250 TB, 200 Mbps shared link, one month'.",
    "Pairs convert each data size to megabits, divide by bandwidth, convert seconds to days and decide online or offline.",
    "For the two database cards, pairs write the three-stage plan and note whether schema conversion is needed.",
    "Pairs post answers on the board; the class checks one calculation together and discusses any disagreements."
   ]
  },
  "discussion": [
   "Why should planners assume less than the full bandwidth of a link when estimating transfer time?",
   "What could go wrong during a database cutover, and how would you prepare a fallback?"
  ],
  "exit": [
   [
    "About how many megabits are in 1 TB?",
    "About 8,000,000 megabits (1 TB is 1,000,000 MB, times 8)."
   ],
   [
    "When is a transfer appliance the better choice?",
    "When the data set is large and the available bandwidth would take weeks or months, or the link is expensive, shared or unreliable."
   ],
   [
    "What keeps the target database current during a low-downtime migration?",
    "Continuous replication or change data capture after the initial load."
   ]
  ],
  "differentiation": [
   "Support: Provide a worked conversion template (TB to MB, times 8, divide by Mbps, divide by 86,400 for days) that students fill in for each scenario.",
   "Extend: Ask fast finishers to recalculate their scenarios assuming only 60 percent of the link is usable and explain whether any decisions change."
  ]
 },
 {
  "t": "Provisioning compute: choosing instance size and type, images and templates, golden images",
  "objectives": [
   "Students will be able to match workload profiles to instance families.",
   "Students will be able to explain the difference between an image, a golden image and a launch template.",
   "Students will be able to justify why golden images must be rebuilt on a schedule.",
   "Students will be able to compare baking and bootstrapping and recommend a balance."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the laptop ordering warm-up question and record answers."
   ],
   [
    12,
    "Teach",
    "Present instance families with one example workload each. Draw the chain base image, golden image pipeline, launch template, autoscaling group on the board. Explain baking versus bootstrapping."
   ],
   [
    18,
    "Activity",
    "Run the workload matching and golden image pipeline exercise."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect golden images to audit and security."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on sticky notes."
   ]
  ],
  "warmup": "Your company is buying laptops for a video editor, a receptionist and a data analyst. Would you buy them all the same model? What would you install on every laptop before handing it out?",
  "activity": {
   "title": "Right size, right image",
   "materials": "Printed workload cards with utilization figures, printed instance family cards, sticky notes, whiteboard.",
   "steps": [
    "Give each group eight workload cards showing measured CPU, memory, disk and GPU needs, such as 'video transcoding, CPU pinned, modest memory'.",
    "Groups match each workload to an instance family card and note whether a burstable type would fit.",
    "Groups then design a golden image pipeline on the whiteboard: list what gets baked in, what gets bootstrapped, how often it rebuilds and how old versions are retired.",
    "Groups trade pipelines and spot one risk in another group's design, such as no vulnerability scan or no rebuild schedule."
   ]
  },
  "discussion": [
   "How does a golden image help answer an auditor who asks whether every server is patched and hardened?",
   "When would you choose to bootstrap more at launch instead of baking more into the image?"
  ],
  "exit": [
   [
    "Name the instance family for a batch job that keeps CPU near 100 percent but needs little memory.",
    "Compute-optimized."
   ],
   [
    "What is a golden image?",
    "An organization-approved, patched and hardened image used as the standard starting point for new instances."
   ],
   [
    "Why must golden images be rebuilt regularly?",
    "Because new patches are released constantly, so an old image launches unpatched instances."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference sheet pairing each instance family with its key resource and two typical workloads before the matching task.",
   "Extend: Ask fast finishers to write the steps an image pipeline would run, in order, including patching, hardening, agent install, scanning, versioning and template update."
  ]
 },
 {
  "t": "Provisioning storage: volume types, thin vs thick provisioning, replication and encryption settings",
  "objectives": [
   "Students will be able to select an appropriate volume type for a workload's I/O pattern.",
   "Students will be able to explain thin versus thick provisioning and the risk of overcommitment.",
   "Students will be able to compare synchronous and asynchronous replication by RPO, latency and distance.",
   "Students will be able to justify provider-managed or customer-managed encryption keys."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the storage unit warm-up question and collect answers."
   ],
   [
    12,
    "Teach",
    "Draw a storage pool with several thin disks on the board and show it filling. Then cover volume types, persistent versus ephemeral storage, the two replication modes and key management options."
   ],
   [
    18,
    "Activity",
    "Run the thin pool simulation and the provisioning decision cards."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, linking the simulation back to monitoring and alerts."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on paper."
   ]
  ],
  "warmup": "A storage building has 100 units but rents out 150, betting that many renters will never use their full space. Is that a good business idea? What could go wrong, and how would the owner know trouble is coming?",
  "activity": {
   "title": "Fill the pool",
   "materials": "Whiteboard with a drawn 1,000-unit pool, sticky notes representing VMs, printed growth cards, printed provisioning decision cards.",
   "steps": [
    "Assign each student a VM sticky note with a 200-unit thin disk; eight students share the 1,000-unit pool, so it is overcommitted.",
    "Each round, students draw a growth card and add that amount to their usage; the teacher totals the pool on the board and calls out when it crosses 75 and 90 percent.",
    "When the pool fills, discuss what each VM would experience and which alert or action would have prevented it.",
    "In pairs, students complete four provisioning decision cards choosing volume type, thin or thick, replication mode and key type for described workloads."
   ]
  },
  "discussion": [
   "Why might an organization accept the risk of thin provisioning, and what controls make it acceptable?",
   "Why is replication not a substitute for backups?"
  ],
  "exit": [
   [
    "Which replication mode gives zero data loss, and what is its limitation?",
    "Synchronous replication; it adds write latency, so it is limited to short distances."
   ],
   [
    "A database needs consistent low latency on random reads and writes. Which volume type fits?",
    "A provisioned-performance (provisioned IOPS) SSD volume."
   ],
   [
    "Name one benefit of customer-managed keys.",
    "Control over rotation, access policies, or the ability to disable or revoke the key."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-column comparison sheet for thin versus thick and synchronous versus asynchronous to reference during the decision cards.",
   "Extend: Ask fast finishers to calculate the overcommitment ratio for the simulation and propose an alert threshold and expansion plan with reasons."
  ]
 },
 {
  "t": "Deploying managed services: managed databases, read replicas, caches and managed Kubernetes",
  "objectives": [
   "Students will be able to list what the provider manages and what the customer still manages for a managed database.",
   "Students will be able to distinguish a multi-AZ standby from a read replica by purpose and replication type.",
   "Students will be able to explain the cache-aside pattern and the role of TTL.",
   "Students will be able to identify the provider's and customer's responsibilities in managed Kubernetes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the apartment versus house warm-up question and list landlord and tenant duties on the board."
   ],
   [
    12,
    "Teach",
    "Draw a primary database with a multi-AZ standby and two read replicas, labeling sync and async arrows. Add a cache in front and walk through a cache hit and miss. Finish with a control plane and node pool diagram for managed Kubernetes."
   ],
   [
    18,
    "Activity",
    "Run the responsibility sort and the fix-the-bottleneck scenarios."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reinforce shared responsibility."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the exit questions."
   ]
  ],
  "warmup": "If you rent an apartment, what does the landlord fix and what is still your responsibility? What happens if you assume the landlord handles something they do not?",
  "activity": {
   "title": "Who owns it, and what fixes it",
   "materials": "Printed task cards (for example 'patch the engine', 'create database users', 'upgrade cluster version'), two labeled areas on the whiteboard for Provider and Customer, printed problem scenario cards.",
   "steps": [
    "Groups sort fifteen task cards into Provider or Customer columns for a managed database and managed Kubernetes.",
    "The teacher reveals the answers and groups discuss any cards they placed wrongly.",
    "Groups receive five problem cards, such as 'primary overloaded by catalog browsing' or 'need automatic failover if a zone fails', and choose read replica, cache, multi-AZ or a node pool change.",
    "Each group explains one choice and one trade-off, such as replica lag or cache staleness."
   ]
  },
  "discussion": [
   "Why is shared responsibility easy to misunderstand with managed services, and what incidents can result?",
   "When would you choose a cache over a read replica, or use both?"
  ],
  "exit": [
   [
    "What replication does a read replica use, and what side effect follows?",
    "Asynchronous replication, so reads can lag slightly behind the primary."
   ],
   [
    "Name two things the customer still manages for a managed database.",
    "Any two of: users and permissions, schema and queries, network access, encryption choices, backup retention settings."
   ],
   [
    "In cache-aside, what happens on a cache miss?",
    "The application reads from the database, returns the result and stores it in the cache for future requests."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of primary, standby, replicas and cache that students can annotate during the problem cards.",
   "Extend: Ask fast finishers to describe what happens to the database when the cache restarts empty and propose a way to soften that load spike."
  ]
 },
 {
  "t": "Infrastructure as code for deployment: templates, parameters, state and repeatable environments",
  "objectives": [
   "Students will be able to explain the roles of templates, parameters, outputs and state in IaC.",
   "Students will be able to describe how one parameterized template produces multiple consistent environments.",
   "Students will be able to identify drift and choose the correct remediation.",
   "Students will be able to justify remote state storage with locking and protection."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the recipe warm-up question and collect answers."
   ],
   [
    12,
    "Teach",
    "Project a short, readable template excerpt with a parameter, a resource and an output. Walk through plan and apply, showing how state is compared with code and reality. Introduce drift with the Bluewater story."
   ],
   [
    18,
    "Activity",
    "Run the template reading and drift hunt exercise in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect IaC to auditing and disaster recovery."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on sticky notes."
   ]
  ],
  "warmup": "If your favorite dish is cooked by three different people from memory, will it taste the same each time? What would make it come out the same every time, even in a different kitchen?",
  "activity": {
   "title": "Read the template, hunt the drift",
   "materials": "Printed pseudo-template excerpts (parameters, resources, outputs), printed 'current cloud' sheets for dev and prod, highlighters, whiteboard.",
   "steps": [
    "Give each pair a one-page pseudo-template with parameters for environment, instance size and count, plus two parameter files for dev and prod.",
    "Pairs predict what resources each environment will contain and write the prediction on the sheet.",
    "Hand out 'current cloud' sheets that include two drifted items, such as a manually added firewall rule in prod; pairs highlight the drift.",
    "Pairs write the correct fix for each drifted item and one control, such as restricted console access or scheduled drift detection, to prevent recurrence."
   ]
  },
  "discussion": [
   "Why might an organization restrict console write access in production once it adopts IaC?",
   "What else besides templates is needed to rebuild an environment in another region after a disaster?"
  ],
  "exit": [
   [
    "What is a parameter in an IaC template?",
    "An input value, such as instance size or environment name, that lets one template deploy different environments."
   ],
   [
    "Why should IaC state be stored remotely with locking?",
    "So everyone shares one accurate record and two applies cannot run at once and corrupt it."
   ],
   [
    "A manual change in production is found by a drift check. What is the right fix?",
    "Add the change to the code, review it and reapply, or reapply the code to remove the unapproved change."
   ]
  ],
  "differentiation": [
   "Support: Provide a glossary card with template, parameter, output, state and drift defined in one line each, plus an annotated example.",
   "Extend: Ask fast finishers to rewrite part of the pseudo-template as a reusable module and explain how two environments would call it with different inputs."
  ]
 },
 {
  "t": "Immutable infrastructure and environment separation: development, test, staging and production",
  "objectives": [
   "Students will be able to contrast mutable and immutable infrastructure and explain configuration drift.",
   "Students will be able to describe the purpose of development, test, staging and production environments.",
   "Students will be able to recommend controls that separate environments, including accounts, access and data masking.",
   "Students will be able to explain why the same artifact is promoted through environments."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the matching desks warm-up question and discuss briefly."
   ],
   [
    12,
    "Teach",
    "Draw two timelines on the board: a mutable server patched in place for years, and immutable instances replaced by new image versions. Then draw four environment boxes with promotion arrows and note access and data rules for each."
   ],
   [
    18,
    "Activity",
    "Run the pipeline and controls design exercise in groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, referring back to the Hollowell story."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "Thirty desks in a classroom started identical. Over five years students repaired and modified them in different ways. What problems would that cause when a desk breaks? What would be a better way to handle improvements?",
  "activity": {
   "title": "Design the promotion path",
   "materials": "Whiteboard or large paper, sticky notes in four colors (one per environment), printed scenario card describing a small web application, markers.",
   "steps": [
    "Groups receive the scenario card and draw four environment boxes, labeling each with its purpose and who has access.",
    "Groups add sticky notes for controls in each environment: separate account or network, access level, data type (masked, synthetic or real) and change approval.",
    "Groups draw how one container image moves from test to production and mark where a patch would enter as a new image version.",
    "The teacher reads out an incident, such as 'a test script deleted production data', and each group identifies which of its controls would have prevented it."
   ]
  },
  "discussion": [
   "What changes for a team's daily habits when nobody is allowed to log in to production servers?",
   "How close to production does staging need to be, and how do teams balance that against cost?"
  ],
  "exit": [
   [
    "What is configuration drift?",
    "Gradual, undocumented differences between servers that should be identical, usually from manual changes."
   ],
   [
    "Which environment should mirror production most closely?",
    "Staging (pre-production)."
   ],
   [
    "What must happen to real customer data before it is used in a test environment?",
    "It must be masked or anonymized, or replaced with synthetic data."
   ]
  ],
  "differentiation": [
   "Support: Provide a completed example for one environment box so students can model the remaining three.",
   "Extend: Ask fast finishers to explain how immutable infrastructure supports a blue-green deployment and what must live outside the instances for it to work."
  ]
 },
 {
  "t": "Post-deployment validation: smoke tests, health checks, performance baselines and documentation",
  "objectives": [
   "Students will be able to distinguish smoke tests, regression tests and health checks.",
   "Students will be able to explain the trade-off between shallow and deep health checks and between readiness and liveness probes.",
   "Students will be able to use a performance baseline to identify a regression after a release.",
   "Students will be able to list the documentation that should be updated after a deployment."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the car repair warm-up question and collect answers."
   ],
   [
    10,
    "Teach",
    "Introduce smoke tests, health checks, readiness and liveness probes, baselines and documentation with a simple diagram of a load balancer probing instances. Show a sample before-and-after metrics table."
   ],
   [
    20,
    "Activity",
    "Run the release review exercise with printed metrics and log excerpts."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect validation to rollback decisions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "When a mechanic finishes repairing your car, what should they check before handing back the keys? How would you know if the car drives worse than before?",
  "activity": {
   "title": "Release review board",
   "materials": "Printed release packets (smoke test results, a baseline versus new metrics table, a short health check log excerpt, a change record template), projector, whiteboard.",
   "steps": [
    "Groups receive a release packet in which smoke tests pass but the 95th percentile latency for one page has doubled compared with the baseline.",
    "Groups decide go, monitor or roll back, and write their reasoning citing specific numbers.",
    "Groups read a health check log excerpt and identify whether a shallow or deep check would have caught the problem, and whether it should affect routing.",
    "Groups complete the change record template with version, time, validation results, decision and documentation updates, then one group presents."
   ]
  },
  "discussion": [
   "Why might a team decide to roll back even though every smoke test passed?",
   "What would happen to a service if its liveness probe checked the database and the database went down briefly?"
  ],
  "exit": [
   [
    "What is a smoke test?",
    "A quick check of critical functions right after deployment to confirm the system basically works."
   ],
   [
    "Why is a performance baseline needed to detect a regression?",
    "Without a record of normal behavior there is nothing to compare new metrics against."
   ],
   [
    "Name two documents to update after a deployment.",
    "Any two of: architecture diagram, configuration and version inventory, runbooks, change record, monitoring and alerting notes."
   ]
  ],
  "differentiation": [
   "Support: Provide a highlighted metrics table showing which column is the baseline and which is the new release, with a guiding question for each row.",
   "Extend: Ask fast finishers to write a rollback trigger rule based on the baseline, for example a latency or error rate threshold and duration, and justify the values."
  ]
 },
 {
  "t": "Observability: metrics, logs and traces; dashboards, baselines and alert thresholds",
  "objectives": [
   "Students will be able to distinguish metrics, logs and traces and choose the right one for a question.",
   "Students will be able to design a service dashboard around the four golden signals.",
   "Students will be able to write an alert rule with a threshold, duration and severity that avoids alert fatigue.",
   "Students will be able to explain how baselines and anomaly detection improve thresholds."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the smoke alarm warm-up question and discuss."
   ],
   [
    12,
    "Teach",
    "Show a sample metric graph, a structured log line and a trace waterfall on the projector or board. Explain which question each answers. Introduce the golden signals and static versus baseline thresholds."
   ],
   [
    18,
    "Activity",
    "Run the alert tuning workshop in groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about alert fatigue and ownership."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "Imagine a smoke alarm that goes off every time you make toast. What do people in that house eventually do? How would you design a better alarm?",
  "activity": {
   "title": "Tune the pager",
   "materials": "Printed sheet listing twelve existing alerts with how often each fired last month and whether action was taken, printed dashboard sketch template, sticky notes, whiteboard.",
   "steps": [
    "Groups review the alert list and mark each alert keep, tune (change threshold, duration or severity) or delete, writing a reason.",
    "For each kept alert, groups write a one-line runbook first step and assign an owner.",
    "Groups add one missing user-facing alert, such as checkout error rate, with a threshold and duration.",
    "Groups sketch a dashboard using the template with the four golden signals at the top, then compare designs with another group."
   ]
  },
  "discussion": [
   "Why is it better to alert on symptoms users feel than on every possible cause?",
   "When would a static threshold work well, and when would anomaly detection be better?"
  ],
  "exit": [
   [
    "Which telemetry type records individual events with detailed context?",
    "Logs."
   ],
   [
    "Name the four golden signals.",
    "Latency, traffic, errors and saturation."
   ],
   [
    "What is alert fatigue, and one way to prevent it?",
    "Ignoring alerts because too many are non-actionable; prevent it with sustained durations, symptom-based alerts, severity levels or regular alert reviews."
   ]
  ],
  "differentiation": [
   "Support: Give students a sorting card with sample questions (such as 'which service was slow?') and the three telemetry types to match before the workshop.",
   "Extend: Ask fast finishers to propose a structured log format with field names that would make correlating logs with traces easy."
  ]
 },
 {
  "t": "Log aggregation, retention and synthetic monitoring for user-facing services",
  "objectives": [
   "Students will be able to explain why log aggregation is essential for autoscaled and ephemeral cloud resources.",
   "Students will be able to draft a retention policy that balances troubleshooting, compliance and cost.",
   "Students will be able to describe how to protect retained logs from tampering.",
   "Students will be able to compare synthetic monitoring with real user monitoring."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the disappearing notebook warm-up question and discuss."
   ],
   [
    12,
    "Teach",
    "Draw instances, agents and a central log platform on the board, then show an instance being terminated with and without aggregation. Cover UTC, structured logs and correlation IDs, then retention tiers and immutability. Finish with synthetic monitoring versus RUM."
   ],
   [
    18,
    "Activity",
    "Run the retention policy and synthetic script design exercise."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about cost and privacy."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "If every temporary worker at a company kept their notes in a notebook they took home on their last day, what would happen when something went wrong last month? How would you fix that?",
  "activity": {
   "title": "Keep it, protect it, test it",
   "materials": "Printed log type cards (debug, application error, load balancer access, API audit, firewall, flow logs), printed compliance requirement card, sticky notes, whiteboard with a hot, warm and archive storage timeline.",
   "steps": [
    "Groups place each log type card on the storage timeline, deciding how long it stays searchable and how long it is archived, using the compliance card.",
    "Groups write two protections for the audit logs, such as a separate account, restricted access or immutability settings.",
    "Groups design a synthetic transaction for a fictional ticketing site: list the steps, how often it runs, from which regions and what counts as a failure.",
    "Groups explain one thing RUM would show that their synthetic script cannot, then compare designs with another group."
   ]
  },
  "discussion": [
   "What are the risks of keeping logs too long, and of keeping them too briefly?",
   "Why should applications avoid writing sensitive data such as passwords or full card numbers into logs?"
  ],
  "exit": [
   [
    "Why must logs from autoscaled instances be shipped centrally?",
    "Because instances can be terminated at any time and their local logs are lost with them."
   ],
   [
    "Name one way to protect retained audit logs from tampering.",
    "Any of: separate account or storage, restricted access, immutability or WORM settings."
   ],
   [
    "What is the key difference between synthetic monitoring and RUM?",
    "Synthetic monitoring generates scheduled test traffic and works with no users; RUM measures real users' experience and needs actual visitors."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially filled retention table with suggested ranges for two log types so students complete the others with guidance.",
   "Extend: Ask fast finishers to design a correlation ID scheme and show how one request would appear in web, API and database logs."
  ]
 },
 {
  "t": "Scaling: horizontal vs vertical, autoscaling policies (target tracking, scheduled, step) and cooldowns",
  "objectives": [
   "Students will be able to compare vertical and horizontal scaling, including their limits and availability impact.",
   "Students will be able to select target tracking, step or scheduled autoscaling policies for a given workload pattern.",
   "Students will be able to explain why cooldowns and warm-up periods prevent flapping.",
   "Students will be able to identify statelessness as a requirement for horizontal scaling."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a graph of web traffic over one week with a daily curve and one sudden spike. Ask students how many servers they would buy and what happens on the spike."
   ],
   [
    15,
    "Teach",
    "Explain scaling up versus scaling out using the grocery checkout picture, then autoscaling groups with minimum, maximum and desired counts. Walk through target tracking, step and scheduled policies with one example each, and draw a flapping graph to introduce cooldowns."
   ],
   [
    15,
    "Activity",
    "Run the Scaling Policy Match activity. Circulate and ask each group to justify its policy choice out loud."
   ],
   [
    5,
    "Discuss",
    "Groups share their hardest scenario. Close by asking what has to be true about the application before horizontal scaling works."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your company's website has 10 users at 3 a.m. and 10,000 at noon. If you had to pick one fixed number of servers to run all day, what number would you choose, and what goes wrong with your choice?",
  "activity": {
   "title": "Scaling Policy Match",
   "materials": "Printed scenario cards (eight workloads), printed policy cards (vertical, horizontal, target tracking, step, scheduled, cooldown fix), whiteboard, markers.",
   "steps": [
    "Prepare eight scenario cards, such as: a payroll app busy weekdays 8 to 6; a store with unpredictable flash sales; a single-server licensed database out of memory; a group launching and terminating instances every few minutes; a portal that logs users out after scaling; a ticket site with known on-sale time.",
    "In groups of three or four, students match each scenario to one or more policy cards and write one sentence explaining why.",
    "For two scenarios of their choice, groups sketch a simple capacity-over-time graph showing how their policy would behave.",
    "Each group posts one graph on the whiteboard; the teacher highlights differences between proactive (scheduled) and reactive (metric-based) policies."
   ]
  },
  "discussion": [
   "When would you deliberately choose vertical scaling even though horizontal scaling is more resilient?",
   "How should a team decide the maximum size of an autoscaling group, and who should be involved in that decision?"
  ],
  "exit": [
   [
    "Name one advantage and one disadvantage of vertical scaling.",
    "Advantage: no application changes needed. Disadvantage: a size ceiling, usually a restart, and a single point of failure."
   ],
   [
    "A workload spikes every weekday at 8 a.m. Which policy is the best fit?",
    "Scheduled scaling, ideally combined with target tracking for unexpected changes."
   ],
   [
    "What problem does a cooldown period prevent?",
    "Flapping or thrashing: repeated scale out and in because new instances have not yet taken effect."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page chart with the three policy types, a plain description and a picture (thermostat, rule card, calendar), and let them use it during the match activity.",
   "Extend: Ask fast finishers to design a full scaling configuration for a ticket-sale site, with minimum, maximum, policies and warm-up time, and to justify how it protects both availability and budget."
  ]
 },
 {
  "t": "Backup types (full, incremental, differential, snapshots), retention and the 3-2-1 rule",
  "objectives": [
   "Students will be able to distinguish full, incremental and differential backups by what they copy and what a restore requires.",
   "Students will be able to explain the difference between crash-consistent and application-consistent snapshots.",
   "Students will be able to explain why replication is not a backup.",
   "Students will be able to apply the 3-2-1 rule and a retention policy to a cloud scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers on the whiteboard without correcting them yet."
   ],
   [
    12,
    "Teach",
    "Draw a week calendar. Under each day, shade what a full, incremental and differential backup would copy. Then explain snapshots, consistency, retention and 3-2-1, and state clearly that replication is not a backup."
   ],
   [
    18,
    "Activity",
    "Run Restore the Week. Groups work through restore cards and present one answer each."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect retention to legal and cost needs."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on paper."
   ]
  ],
  "warmup": "If you accidentally deleted a folder an hour ago, and your files are copied to a second drive every second, can you get the folder back? Why or why not?",
  "activity": {
   "title": "Restore the Week",
   "materials": "Printed calendar sheets for one week, printed restore scenario cards, colored markers, whiteboard.",
   "steps": [
    "Give each group a calendar showing a Sunday full backup and nightly jobs. Half the groups get incremental schedules, half get differential schedules.",
    "Hand out scenario cards: the server fails on a given day, or one night's job is marked as corrupted.",
    "Groups color the backup sets they would restore, in order, and count them. For corrupted-job cards, they state what data is lost.",
    "Pair an incremental group with a differential group to compare restore lists and agree on the trade-off in one sentence.",
    "As a final step, each group designs a 3-2-1 layout for a cloud file share on the back of the sheet."
   ]
  },
  "discussion": [
   "Who in an organization should decide how long backups are kept, and what information do they need?",
   "What risks remain if all your backups are in the same cloud account as production?"
  ],
  "exit": [
   [
    "Fulls on Sunday, differentials nightly, failure Thursday morning. What do you restore?",
    "Sunday's full and Wednesday night's differential."
   ],
   [
    "Why should a database be backed up with an application-consistent method?",
    "Crash-consistent copies may miss in-memory transactions; application-consistent backups quiesce or flush first so the data is complete."
   ],
   [
    "Give a cloud example of meeting 3-2-1.",
    "Production data, a backup in the same region in a backup vault, and a copy in another region or account."
   ]
  ],
  "differentiation": [
   "Support: Provide a pre-filled example calendar for one schedule and have students complete the other schedule by following the pattern before attempting scenario cards.",
   "Extend: Ask students to design a grandfather-father-son retention schedule for a firm that must keep records seven years, and estimate how many backup sets exist at any time."
  ]
 },
 {
  "t": "Restore testing, immutable and cross-account backups, and protecting backups from ransomware",
  "objectives": [
   "Students will be able to explain why restore testing is required and what it should measure.",
   "Students will be able to describe how immutable (WORM) and cross-account backups resist ransomware.",
   "Students will be able to recommend supporting controls such as MFA on deletion, role separation and alerting.",
   "Students will be able to choose an appropriate restore point after a ransomware incident."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take a quick show of hands."
   ],
   [
    12,
    "Teach",
    "Explain how backups fail silently and what a restore test checks. Describe how ransomware operators target backups, then present immutability, cross-account copies and supporting controls."
   ],
   [
    18,
    "Activity",
    "Run the Ransomware Tabletop. Read the injects aloud every few minutes and let teams respond."
   ],
   [
    5,
    "Discuss",
    "Debrief what each team's design would have saved and what it would have lost."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions individually."
   ]
  ],
  "warmup": "Your phone says it has backed up your photos every night for a year. How confident are you that you could get them all back on a new phone today, and how would you find out?",
  "activity": {
   "title": "Ransomware Tabletop",
   "materials": "Printed company profile, printed inject cards, sticky notes, whiteboard, timer on the projector.",
   "steps": [
    "Give teams a one-page profile of a fictional company with its current backup setup: snapshots in the production account, admins shared across production and backups, no restore tests.",
    "Read inject 1: an admin's credentials are phished. Teams write on sticky notes what the attacker can now reach.",
    "Read inject 2: all snapshots are deleted and file servers are encrypted. Teams decide whether they can recover and how long it takes.",
    "Teams redesign the backup setup using immutability, a separate account, MFA on delete, alerting and restore tests, then replay injects 1 and 2 against the new design.",
    "Read inject 3: investigators find the attacker first signed in nine days before encryption. Teams choose a restore point and justify it."
   ]
  },
  "discussion": [
   "What is the downside of a compliance-mode lock that nobody can shorten, and how would you manage that risk?",
   "How often should an organization run restore tests, and who should see the results?"
  ],
  "exit": [
   [
    "What does WORM mean and why does it help against ransomware?",
    "Write once, read many; backups cannot be altered or deleted until retention ends, even by an attacker with admin rights (in strict mode)."
   ],
   [
    "Name two things a restore test should measure.",
    "Data completeness and application function, and restore time compared with the RTO (also data age against RPO)."
   ],
   [
    "Give two controls besides immutability that protect backups.",
    "Separate backup account, MFA on delete, separate backup roles, alerts on deletions or retention changes, air-gapped copy (any two)."
   ]
  ],
  "differentiation": [
   "Support: Give students a checklist of the five main protections with one-line descriptions to use during the tabletop redesign.",
   "Extend: Ask students to write a one-page restore test procedure for a database, including environment, validation steps, timing and how results are reported to auditors."
  ]
 },
 {
  "t": "Patch and update management for VMs, images, containers and managed services",
  "objectives": [
   "Students will be able to describe the stages of a patch management process for IaaS VMs.",
   "Students will be able to explain how immutable infrastructure and containers are patched by rebuilding images.",
   "Students will be able to identify customer responsibilities for patching managed services.",
   "Students will be able to apply emergency change and compensating controls to an urgent vulnerability."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the board."
   ],
   [
    12,
    "Teach",
    "Present the patch stages for VMs, then contrast mutable and immutable patching with a diagram of an image pipeline. Cover containers and managed services, and finish with emergency changes."
   ],
   [
    18,
    "Activity",
    "Run Who Patches What. Groups sort assets and plan the response to an advisory."
   ],
   [
    5,
    "Discuss",
    "Discuss what slows patching down in real organizations."
   ],
   [
    5,
    "Exit ticket",
    "Collect answers to the three exit questions."
   ]
  ],
  "warmup": "Your phone asks to install an update tonight. What could go wrong if you install it, and what could go wrong if you never do?",
  "activity": {
   "title": "Who Patches What",
   "materials": "Printed asset cards, a printed security advisory, sticky notes, whiteboard divided into three columns.",
   "steps": [
    "Draw three columns on the whiteboard: Patch in place, Rebuild and redeploy, Provider patches (we schedule).",
    "Give each group asset cards: a hand-built VM, an autoscaling web tier from a golden image, a container image, a managed database, a managed Kubernetes control plane, a SaaS email service.",
    "Groups place each card in a column and write one sentence of justification on a sticky note.",
    "Read a fictional advisory about a critical, exploited library flaw. Each group writes a numbered response plan covering inventory, priority, testing, rollout and rollback, including any emergency change steps.",
    "Groups swap plans and mark one strength and one gap in the other group's plan."
   ]
  },
  "discussion": [
   "Why do some organizations still patch servers in place even after adopting containers?",
   "How would you balance the speed of an emergency patch against the risk of breaking production?"
  ],
  "exit": [
   [
    "What is a patch baseline?",
    "The defined set of patch classifications and severities that instances must have installed to be compliant."
   ],
   [
    "A container image has a vulnerable base image. What are the steps to fix it?",
    "Update the base image, rebuild, rescan, push with a new tag and redeploy."
   ],
   [
    "What remains the customer's job for patching a managed database?",
    "Choosing the maintenance window, handling reconnection, and planning and testing major version upgrades."
   ]
  ],
  "differentiation": [
   "Support: Provide a flowchart template with the six patch stages as empty boxes that students fill in during the teach segment.",
   "Extend: Ask students to design an image pipeline for a web tier, naming each stage from base image update to rolling deployment and rollback."
  ]
 },
 {
  "t": "Resource lifecycle: provider deprecations, version upgrades, end of support and decommissioning",
  "objectives": [
   "Students will be able to explain what deprecation and end of support mean and their operational consequences.",
   "Students will be able to plan a major version upgrade with testing, backup and rollback.",
   "Students will be able to list the steps and attached resources involved in a clean decommission.",
   "Students will be able to describe how inventory and notifications prevent lifecycle surprises."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about an old phone and discuss briefly."
   ],
   [
    12,
    "Teach",
    "Draw the lifecycle as a circle: plan, deploy, operate, upgrade, retire. Explain deprecations, minor versus major upgrades, irreversible upgrades and decommissioning, including subdomain takeover."
   ],
   [
    18,
    "Activity",
    "Run Decommission Detective with the printed inventory."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to talk about ownership and process."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on paper."
   ]
  ],
  "warmup": "Your old phone no longer gets software updates. Is it still safe to use for online banking? What would you do before giving it away?",
  "activity": {
   "title": "Decommission Detective",
   "materials": "Printed fictional resource inventory (30 rows with names, types, tags, attached-to, last activity), printed provider deprecation notice, highlighters.",
   "steps": [
    "Give pairs a printed inventory for a fictional company where one application, Legacy Reports, is being retired, and a notice that a runtime version is being deprecated.",
    "Pairs highlight every resource that belongs to Legacy Reports, including disks, snapshots, IPs, DNS records, security groups and service accounts.",
    "Pairs write a decommission checklist in order, including confirming disuse, notifying owners and final backup.",
    "Pairs then find every resource on the deprecated runtime and write a backlog ticket for one of them with an owner and target date.",
    "Reveal the answer key; pairs count anything they missed and discuss why it was easy to overlook."
   ]
  },
  "discussion": [
   "Who should own the job of reading provider deprecation notices, and how should they reach the right team?",
   "Why do organizations often skip parts of decommissioning, and what process changes would help?"
  ],
  "exit": [
   [
    "What can happen after a provider's end-of-support date?",
    "No more patches, inability to create or update resources, and possibly automatic upgrade or shutdown by the provider."
   ],
   [
    "Give two parts of a rollback plan for an irreversible database upgrade.",
    "A pre-upgrade backup to restore from, and keeping the old instance running (blue-green) until the new one is proven."
   ],
   [
    "List four items to clean up when retiring an application.",
    "Volumes, snapshots, IP addresses, DNS records, load balancers, firewall rules, credentials, monitoring, CMDB entries (any four)."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed decommission checklist with blanks for students to fill in during the activity.",
   "Extend: Ask students to design a monthly automated report that finds orphaned or untagged resources and explain which signals they would use."
  ]
 },
 {
  "t": "Right-sizing, capacity planning and storage lifecycle policies to control cost",
  "objectives": [
   "Students will be able to use utilization data, including peaks and memory, to make right-sizing decisions.",
   "Students will be able to explain why capacity planning matters in the cloud, including quotas and commitments.",
   "Students will be able to design a storage lifecycle policy that matches access patterns.",
   "Students will be able to identify when cooler storage tiers increase costs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about phone plans and discuss briefly."
   ],
   [
    12,
    "Teach",
    "Explain pay-for-provisioned pricing, right-sizing steps and patterns, capacity planning outputs, and lifecycle policies with retrieval fees and minimum durations."
   ],
   [
    18,
    "Activity",
    "Run Cut the Bill with printed utilization tables and storage access data."
   ],
   [
    5,
    "Discuss",
    "Discuss the trade-offs groups made between savings and risk."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your phone plan includes 50 GB of data a month, but you use about 4 GB, except during one vacation each year when you use 30. Which plan should you choose, and what information did you need to decide?",
  "activity": {
   "title": "Cut the Bill",
   "materials": "Printed utilization tables for ten fictional VMs (average and peak CPU and memory, with a month-end column), printed storage access summary for three buckets, calculators or laptops, whiteboard.",
   "steps": [
    "Groups review each VM's average and peak CPU and memory and decide: keep, downsize, change family, or schedule off-hours stop. They write one reason for each.",
    "Point out one VM whose month-end peak is high; groups check whether they shrank it too far.",
    "For the three buckets, groups design a lifecycle policy with transition days, target tiers and expiry, based on how often data is read.",
    "One bucket's data is read daily for a year; groups decide whether any transition makes sense given retrieval fees.",
    "Groups present their biggest saving and the risk they avoided."
   ]
  },
  "discussion": [
   "Who should approve resizing a production server: the cloud team, the application owner, or finance? Why?",
   "How could a lifecycle policy conflict with legal retention requirements, and how would you prevent that?"
  ],
  "exit": [
   [
    "What data should you collect before right-sizing?",
    "CPU, memory, disk I/O and network over a representative period including peaks; memory may need an agent."
   ],
   [
    "Give two outputs of cloud capacity planning.",
    "Commitment or reservation purchases, quota increase requests, regional capacity checks, budgets (any two)."
   ],
   [
    "Why might an archive tier cost more than standard storage for some data?",
    "Retrieval fees, request costs and minimum storage durations when data is read often or deleted early."
   ]
  ],
  "differentiation": [
   "Support: Give students a decision flowchart: low CPU and memory means downsize, high memory and low CPU means memory-optimized, and so on, to use during the activity.",
   "Extend: Ask students to estimate monthly savings for their right-sizing plan using relative prices the teacher provides, and to write a short business case for finance."
  ]
 },
 {
  "t": "Service level agreements, SLOs and availability math (99.9% vs 99.99%)",
  "objectives": [
   "Students will be able to distinguish SLIs, SLOs and SLAs, including what remedies SLAs typically provide.",
   "Students will be able to convert availability percentages into allowed downtime per year and per month.",
   "Students will be able to calculate combined availability for serial and parallel components.",
   "Students will be able to explain how an error budget guides release decisions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect guesses on the board."
   ],
   [
    13,
    "Teach",
    "Define SLI, SLO and SLA with one example. Work through the downtime conversions on the board, then the serial and parallel formulas with numbers. Introduce error budgets."
   ],
   [
    17,
    "Activity",
    "Run Nines on the Whiteboard. Groups calculate and then redesign an architecture."
   ],
   [
    5,
    "Discuss",
    "Discuss the cost of each extra nine."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions with calculators."
   ]
  ],
  "warmup": "A website promises 99.9 percent uptime. Guess how many minutes it can be down each month without breaking that promise.",
  "activity": {
   "title": "Nines on the Whiteboard",
   "materials": "Whiteboard, markers, calculators or student laptops, printed architecture diagrams with availability numbers on each component.",
   "steps": [
    "Each group gets a diagram with components in series (DNS, load balancer, app VM, database) and their availability percentages.",
    "Groups calculate the combined availability and convert it to minutes of downtime per month.",
    "Groups compare the result with a customer promise printed on the card and decide whether it is met.",
    "Groups redesign the weakest link with redundancy and recalculate using the parallel formula, noting the independence assumption.",
    "Each group writes its before and after numbers on the board; the class discusses which change gave the largest gain."
   ]
  },
  "discussion": [
   "If service credits rarely cover the real cost of an outage, why do businesses still care about provider SLAs?",
   "How should a team behave differently when its error budget is nearly used up?"
  ],
  "exit": [
   [
    "Roughly how much downtime per month does 99.99 percent allow?",
    "About 4.3 minutes per month (about 52.6 minutes per year)."
   ],
   [
    "Calculate the availability of three components in series at 99.9 percent each.",
    "About 99.7 percent (0.999 cubed ≈ 0.997)."
   ],
   [
    "What is the error budget for a 99.5 percent SLO?",
    "0.5 percent of the period, roughly 3.65 hours in a 730-hour month."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card with the downtime table and the two formulas, plus one fully worked example, and pair struggling students with a calculator buddy.",
   "Extend: Ask fast finishers to calculate the availability of two redundant app tiers that both depend on a single shared database, and explain why the shared component limits the result."
  ]
 },
 {
  "t": "Operational automation: scheduled start and stop, runbooks and self-healing",
  "objectives": [
   "Students will be able to design a tag-based scheduled start and stop for non-production resources and identify residual costs.",
   "Students will be able to write a runbook that includes checks, verification and escalation.",
   "Students will be able to give examples of self-healing and explain why it must notify and log.",
   "Students will be able to distinguish manual, scheduled and event-driven automation triggers."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list repetitive chores students named."
   ],
   [
    12,
    "Teach",
    "Explain scheduled start and stop with tags and residual costs, then runbooks and what makes their automation safe, then self-healing examples and the risk of hiding problems."
   ],
   [
    18,
    "Activity",
    "Run Write the Runbook in pairs."
   ],
   [
    5,
    "Discuss",
    "Discuss where automation should stop and a human should take over."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of a chore you do the same way every week. If a robot did it for you, what could go wrong, and how would you know?",
  "activity": {
   "title": "Write the Runbook",
   "materials": "Printed alert scenario cards (disk full, expired certificate, stuck service, failed health check), blank runbook templates, whiteboard.",
   "steps": [
    "Each pair draws an alert card and fills in a runbook template: trigger, pre-checks, steps, verification, escalation and logging.",
    "Pairs mark which steps could be automated and choose a trigger type: manual, scheduled or event-driven.",
    "Pairs add one safe limit to prevent the automation from causing harm.",
    "Pairs swap runbooks with another pair, who role-play a 3 a.m. on-call engineer following it exactly and note any unclear step.",
    "The teacher collects one example and highlights strong escalation paths on the projector."
   ]
  },
  "discussion": [
   "When could self-healing make an outage worse instead of better?",
   "How would you decide that a recurring alert deserves a permanent fix rather than more automation?"
  ],
  "exit": [
   [
    "Name two costs that remain when a VM is stopped.",
    "Attached block storage and reserved or static public IP addresses."
   ],
   [
    "What should a self-healing action always do besides fixing the problem?",
    "Notify people and log what it did so recurring issues are investigated."
   ],
   [
    "Give one example each of a scheduled and an event-driven automation trigger.",
    "Scheduled: stop test servers at 7 p.m. Event-driven: run a disk cleanup runbook when a disk alarm fires."
   ]
  ],
  "differentiation": [
   "Support: Provide a completed sample runbook for a different alert so students can model their own on it.",
   "Extend: Ask students to design an event-driven workflow diagram from alarm to automation to notification to ticket creation, including safe limits."
  ]
 },
 {
  "t": "Identity and access management: users, groups, roles, policies and least privilege",
  "objectives": [
   "Students will be able to distinguish users, groups, roles and policies and explain when to use each.",
   "Students will be able to identify the parts of a policy statement and read a simple policy.",
   "Students will be able to apply least privilege to write a narrow permission for a given request.",
   "Students will be able to explain separation of duties, default deny and privilege creep."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about school keys and discuss briefly."
   ],
   [
    12,
    "Teach",
    "Explain identities (users, groups, roles), then policy structure with a projected sample policy. Cover identity-based versus resource-based, provider vocabulary, least privilege, access reviews and separation of duties."
   ],
   [
    18,
    "Activity",
    "Run Least Privilege Rewrite with printed policies."
   ],
   [
    5,
    "Discuss",
    "Discuss the tension between speed and least privilege."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If every student in this school had a key that opened every door, including the principal's office and the server closet, what could go wrong even if every student were honest?",
  "activity": {
   "title": "Least Privilege Rewrite",
   "materials": "Printed pseudo-policy cards written in plain text (effect, actions, resources, conditions), printed access request cards, red and green pens.",
   "steps": [
    "Give each group four access requests, such as: read one bucket, restart one app's VMs, view billing, rotate one database password.",
    "Give each group the overly broad policy that was actually granted for each request, such as allow all actions on all resources.",
    "Groups rewrite each policy in plain-text form with a narrow effect, actions, resources and at least one condition, using green pen.",
    "Groups decide whether each grant should go to a group, a role or a user, and justify it.",
    "Groups exchange rewrites and try to find a needed action that was left out or an unneeded one that remains."
   ]
  },
  "discussion": [
   "When a manager says access is needed urgently, how can an administrator stay fast without granting too much?",
   "Which tasks in a cloud team should require separation of duties, and why?"
  ],
  "exit": [
   [
    "What is the difference between a group and a role?",
    "A group collects users who share permissions; a role is a set of permissions assumed temporarily, giving short-lived credentials."
   ],
   [
    "Name the four parts of a policy statement.",
    "Effect, actions, resources and conditions."
   ],
   [
    "Rewrite this grant using least privilege: storage admin on all buckets, to read one report bucket.",
    "Allow read and list actions on the single report bucket only, via a group or role."
   ]
  ],
  "differentiation": [
   "Support: Provide a fill-in-the-blank policy template with labeled boxes for effect, actions, resources and conditions.",
   "Extend: Ask students to explain how an explicit deny in one policy interacts with an allow in another, and to design a deny that prevents anyone from deleting backups."
  ]
 },
 {
  "t": "Federation and single sign-on (SAML, OpenID Connect), MFA and protecting the root or global admin account",
  "objectives": [
   "Students will be able to explain how federation and SSO work, including the roles of the IdP and SP.",
   "Students will be able to compare SAML 2.0, OpenID Connect and OAuth 2.0.",
   "Students will be able to classify authentication factors and rank MFA methods by strength.",
   "Students will be able to list controls that protect the root or global administrator account."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask how many passwords students use and what happens when they forget one."
   ],
   [
    13,
    "Teach",
    "Draw an IdP in the center connected to several SPs. Walk through a SAML redirect flow, then contrast OIDC and OAuth. Cover MFA factor categories and method strength, then the root account checklist."
   ],
   [
    17,
    "Activity",
    "Run the Federation Flow Role-Play followed by the factor sort."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about single points of failure."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "How many different passwords do you use in a week? What happens to all those accounts if you leave a job or a school?",
  "activity": {
   "title": "Federation Flow Role-Play",
   "materials": "Name cards (User, Browser, Service Provider, Identity Provider), envelopes labeled Assertion, sticky notes, printed factor cards, whiteboard.",
   "steps": [
    "Four volunteers take the User, Browser, Service Provider and Identity Provider cards and stand in a line.",
    "The class directs them through a SAML sign-in: the user requests the SP, the browser is redirected to the IdP, the IdP authenticates and hands a signed Assertion envelope back through the browser to the SP.",
    "Repeat with an offboarded user: the IdP refuses, and every SP is closed. Ask the class what changed and where.",
    "In pairs, students sort printed factor cards (password, PIN, security question, authenticator app, hardware key, SMS code, fingerprint) into know, have and are, then rank the have methods by phishing resistance.",
    "Pairs draft a five-item checklist for protecting the root account and compare with a neighbor."
   ]
  },
  "discussion": [
   "Federation makes the identity provider a single point of failure and a prime target. How do break-glass accounts and strong MFA address that?",
   "Why do some organizations still allow SMS codes, and when is that a reasonable compromise?"
  ],
  "exit": [
   [
    "Which standard uses XML assertions, and which uses JSON Web Tokens?",
    "SAML 2.0 uses XML assertions; OpenID Connect uses JWT ID tokens."
   ],
   [
    "Name the three MFA factor categories with one example each.",
    "Something you know (password), something you have (security key), something you are (fingerprint)."
   ],
   [
    "Give three controls for protecting the root account.",
    "Strong MFA, no access keys, no routine use, alerting on sign-in, limited global admins, break-glass procedures (any three)."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of the SAML flow with numbered arrows for students to annotate during the role-play.",
   "Extend: Ask students to explain how OIDC workload federation lets a CI pipeline deploy without stored keys, and draw the token exchange."
  ]
 },
 {
  "t": "Workload identities: instance roles, managed identities and service accounts instead of stored keys",
  "objectives": [
   "Students will be able to explain why long-lived access keys are risky and how workload identities remove them.",
   "Students will be able to compare AWS instance roles, Azure managed identities (system- and user-assigned) and Google Cloud service accounts.",
   "Students will be able to describe how SSRF threatens the metadata service and how IMDSv2 mitigates it.",
   "Students will be able to recommend workload identity federation for workloads outside the cloud."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about spare keys and gather answers."
   ],
   [
    12,
    "Teach",
    "Show where access keys leak, then explain workload identities and short-lived credentials. Compare the three providers' terms, then cover metadata protection and OIDC workload federation."
   ],
   [
    18,
    "Activity",
    "Run Find the Secret with printed configuration excerpts."
   ],
   [
    5,
    "Discuss",
    "Discuss why teams still create long-lived keys."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Where do people hide spare house keys, and why do burglars usually find them? What would be a better way to let a dog walker in?",
  "activity": {
   "title": "Find the Secret",
   "materials": "Printed excerpts of fictional configuration files, Dockerfiles, pipeline settings and application logs (some containing fake placeholder keys like EXAMPLE-KEY-123), highlighters, whiteboard.",
   "steps": [
    "Give pairs six printed excerpts. Pairs highlight every place a long-lived secret appears.",
    "For each finding, pairs write which workload identity replaces it: instance role, managed identity, service account or OIDC federation for an external pipeline.",
    "Pairs write the least-privilege permission the new identity needs, in plain language.",
    "Pairs read one excerpt describing a web feature that fetches arbitrary URLs and list the defenses against SSRF reaching the metadata service.",
    "Groups share answers on the whiteboard; the teacher confirms the mapping for each provider."
   ]
  },
  "discussion": [
   "Why might a team keep using long-lived keys even when workload identities are available, and how would you persuade them to switch?",
   "If a temporary credential is stolen, what limits the damage, and what does not?"
  ],
  "exit": [
   [
    "What replaces a hard-coded access key for an app running on a cloud VM?",
    "An instance role, managed identity or service account attached to the VM, with least-privilege permissions."
   ],
   [
    "When would you choose a user-assigned managed identity over a system-assigned one?",
    "When several resources need the same identity or the identity must survive deletion of a resource."
   ],
   [
    "How can a CI system outside the cloud deploy without stored keys?",
    "Workload identity federation with OIDC, exchanging a signed token for temporary credentials."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-column comparison table (AWS, Azure, Google Cloud) with blank cells for students to fill in during the teach segment.",
   "Extend: Ask students to design an organization policy that blocks creation of service account keys, and list the exceptions process for rare cases that still need them."
  ]
 },
 {
  "t": "Secrets and key management: KMS, HSMs, customer-managed keys, rotation and secrets managers",
  "objectives": [
   "Students will be able to explain envelope encryption and the role of a KMS.",
   "Students will be able to compare provider-managed keys, customer-managed keys, BYOK and dedicated HSMs and select one for a requirement.",
   "Students will be able to describe how key rotation and key deletion affect encrypted data.",
   "Students will be able to explain how a secrets manager and workload identities replace secrets in code."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and discuss where people keep passwords."
   ],
   [
    13,
    "Teach",
    "Draw envelope encryption step by step. Compare key control levels in a table on the board, explain HSMs, rotation versus deletion, and secrets managers with runtime retrieval."
   ],
   [
    17,
    "Activity",
    "Run Key Control Match and the envelope role-play."
   ],
   [
    5,
    "Discuss",
    "Discuss the trade-off between control and responsibility."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Where do people you know keep their passwords: a notebook, a phone note, a password manager? Which is safest, and why?",
  "activity": {
   "title": "Key Control Match",
   "materials": "Envelopes, small paper slips, a lockable box or a box labeled KMS, printed requirement cards, whiteboard.",
   "steps": [
    "Envelope role-play: one student is KMS holding the master key card. Others write data on paper, seal it in an envelope (data key), and ask KMS to wrap the envelope's key. Show that disabling the master key stops every envelope opening.",
    "Give groups requirement cards, such as: no key work wanted; must revoke access instantly; must generate keys on-premises; regulator requires single-tenant hardware; database password must rotate monthly.",
    "Groups match each card to provider-managed key, customer-managed key, BYOK or external key store, dedicated cloud HSM, or secrets manager, and justify the choice.",
    "Groups answer a scenario: an unowned key is about to be deleted. They write the safe procedure.",
    "Groups share one match on the whiteboard and the teacher resolves any disagreements."
   ]
  },
  "discussion": [
   "BYOK and external key stores give more control. What new risks and responsibilities come with that control?",
   "How would you prove to an auditor who can access a secret, and who did access it last month?"
  ],
  "exit": [
   [
    "Which key option lets you set the key policy, rotate and disable the key yourself?",
    "A customer-managed key in KMS."
   ],
   [
    "What happens to existing data when a KMS key is automatically rotated?",
    "Nothing breaks; old versions remain to decrypt existing data and new data uses the new version."
   ],
   [
    "Where should an application get its database password, and how?",
    "From a secrets manager at runtime, using its workload identity with least-privilege access."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page chart ranking key options from least to most control with a plain sentence about each.",
   "Extend: Ask students to design an automated rotation for a database password in a secrets manager and explain how the application picks up the new value without downtime."
  ]
 },
 {
  "t": "Data protection: encryption at rest and in transit, tokenization, data classification and DLP",
  "objectives": [
   "Students will be able to explain how data classification drives encryption, location, access and retention decisions.",
   "Students will be able to compare encryption at rest, encryption in transit, tokenization, masking and hashing, including what each does not protect against.",
   "Students will be able to select the correct data protection control for a described risk scenario.",
   "Students will be able to describe how DLP detects and responds to sensitive data leaving approved locations."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list student answers on the whiteboard. Do not correct them yet; circle any answer that mentions encryption so you can return to it."
   ],
   [
    12,
    "Teach",
    "Walk through classification first, then draw a simple diagram: user, load balancer, application, database, backups. Mark where encryption in transit and at rest apply. Show a card number turning into a token with a vault off to the side, and contrast with a masked and a hashed value. Finish with DLP watching the exits: email, shares and uploads."
   ],
   [
    15,
    "Activity",
    "Run the control-matching card activity described below in groups of three."
   ],
   [
    8,
    "Discuss",
    "Bring groups together, resolve disputed cards and return to the circled warm-up answers to show where encryption alone falls short."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your company encrypts every disk in the cloud. A developer with database access exports all customer records to a personal file share. Did encryption help? What would have?",
  "activity": {
   "title": "Threat-to-control matching",
   "materials": "Printed cards: eight threat cards and seven control cards (classification, encryption at rest, encryption in transit, tokenization, masking, hashing, DLP), whiteboard.",
   "steps": [
    "Give each group a shuffled set of threat cards, such as a lost backup drive, traffic sniffed on public Wi-Fi, a support agent who only needs the last four digits, an analytics system that should never hold card numbers, an employee emailing a customer list, and storage nobody knew held personal data.",
    "Groups place each threat next to the control that best addresses it and write one sentence explaining why on the back.",
    "Each group then picks one card where the obvious answer is wrong, such as encryption at rest against an insider, and explains the gap.",
    "Groups rotate to another table, review that group's matches and leave one sticky note agreeing or challenging a placement."
   ]
  },
  "discussion": [
   "If customer-managed keys cost more effort than provider-managed keys, when is that effort worth it?",
   "How would you find sensitive data that someone stored in the wrong place without anyone noticing?",
   "Why might an auditor treat encrypted card numbers differently from tokenized ones?"
  ],
  "exit": [
   [
    "Name one threat encryption at rest does not protect against.",
    "An authorized user or compromised application reading data through the normal service."
   ],
   [
    "What makes a token different from encrypted data?",
    "A token has no mathematical relationship to the original and can only be mapped back by the vault; encrypted data can be decrypted with the key."
   ],
   [
    "Which control would catch a file of card numbers being uploaded to an unapproved share?",
    "DLP, which inspects content for sensitive patterns."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page table with each control, what it protects, and what it does not protect, and let them use it during the card activity.",
   "Extend: Ask fast finishers to design the data protection plan for a fictional clinic, naming classification levels, encryption choices, where tokenization applies and two DLP policies."
  ]
 },
 {
  "t": "Network security controls: security groups vs network ACLs, WAF, DDoS protection and private endpoints",
  "objectives": [
   "Students will be able to compare security groups and network ACLs by statefulness, scope, rule types and rule ordering.",
   "Students will be able to diagnose a connectivity failure caused by a missing stateless return rule or rule-order conflict.",
   "Students will be able to explain why a WAF, not a network firewall, stops layer 7 attacks such as SQL injection.",
   "Students will be able to recommend private endpoints and DDoS protection for described requirements."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Take two or three answers and write the words stateful and stateless on the board as they come up."
   ],
   [
    13,
    "Teach",
    "Draw a VPC with a public subnet and a private subnet. Add a NACL at each subnet edge and a security group around each instance. Trace one HTTPS request in and its reply out, marking which controls check the reply. Then add a WAF and DDoS protection in front of the load balancer and a private endpoint to object storage, explaining what each one sees."
   ],
   [
    15,
    "Activity",
    "Run the packet-tracing troubleshooting activity described below in pairs."
   ],
   [
    7,
    "Discuss",
    "Review each scenario as a class. Ask pairs to explain the exact rule they would add or change and why."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a half sheet and hand it in."
   ]
  ],
  "warmup": "You allowed a visitor into your house through the front door. Should you need separate permission for them to leave? How would a firewall that forgets every visitor behave?",
  "activity": {
   "title": "Trace the packet",
   "materials": "Printed scenario sheets showing a simple network diagram with security group and NACL rule tables, colored pens, projector for review.",
   "steps": [
    "Give each pair four scenario sheets. Each shows rule tables for one security group and one NACL plus a symptom, such as clients timing out on 443, one attacker range still getting through, or a SQL injection reaching the app.",
    "Pairs trace the request and the reply hop by hop with a colored pen, marking where the packet is allowed or dropped.",
    "For each scenario, pairs write the single change that fixes it and name the control type that should own the fix.",
    "Two pairs compare answers; where they disagree, they must agree on a final answer before the class review."
   ]
  },
  "discussion": [
   "Why might a team keep NACLs mostly open and rely on security groups for detailed control?",
   "What could go wrong if you disable a storage service's public access before DNS points to the private endpoint?",
   "When would advanced DDoS protection be worth paying for instead of relying on basic protection and autoscaling?"
  ],
  "exit": [
   [
    "Which control is stateless and evaluates numbered rules in order: security group or NACL?",
    "NACL."
   ],
   [
    "Inbound 443 is allowed on a NACL and clients still time out. What rule is usually missing?",
    "An outbound rule allowing return traffic to ephemeral ports, commonly 1024-65535."
   ],
   [
    "Which control blocks cross-site scripting in web requests?",
    "A web application firewall (WAF)."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column comparison card for security groups and NACLs (stateful or stateless, scope, allow or deny, ordering) that students keep beside them while tracing packets.",
   "Extend: Ask fast finishers to design rules for a three-tier app using security group references only, then add one NACL rule to block a malicious range and justify its rule number."
  ]
 },
 {
  "t": "Zero trust and segmentation for cloud workloads",
  "objectives": [
   "Students will be able to explain the zero trust principles of verify explicitly, least privilege and assume breach.",
   "Students will be able to contrast perimeter-based security with identity-based zero trust access.",
   "Students will be able to design a segmented cloud network that limits east-west traffic between tiers.",
   "Students will be able to identify microsegmentation tools such as security group references, Kubernetes network policies and service mesh mTLS."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch a castle with a moat on the board as students answer."
   ],
   [
    12,
    "Teach",
    "Contrast the castle model with zero trust. List the three principles. Draw a flat subnet with web, app, file and database servers all connected, then redraw it with tiers in separate subnets and arrows only for required flows. Introduce east-west versus north-south traffic, microsegmentation and ZTNA."
   ],
   [
    16,
    "Activity",
    "Run the segmentation redesign activity described below in groups of three or four."
   ],
   [
    7,
    "Discuss",
    "Groups present their allowed-flow lists. Challenge any arrow that is not strictly needed."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on an index card."
   ]
  ],
  "warmup": "If a burglar gets through the front door of an office building, what stops them from reaching every office? What would you change about the building?",
  "activity": {
   "title": "Flatten, then segment",
   "materials": "Whiteboard or poster paper, markers, a printed scenario describing a flat network that was breached through a public web server, sticky notes.",
   "steps": [
    "Hand out the scenario: one subnet containing a web server, an API server, a database, a file server and an admin jump box, with all internal traffic allowed.",
    "Groups list every flow the application actually needs on sticky notes, with source, destination and port.",
    "Groups redraw the environment with separate subnets or groups for each tier and draw arrows only for the listed flows. Everything else is denied.",
    "Groups replace the admin jump box VPN access with a ZTNA or identity-aware proxy design and write two conditions it should check before granting access."
   ]
  },
  "discussion": [
   "What is the cost of zero trust in terms of user friction and administrative effort, and how can teams reduce it?",
   "Why do flow logs of east-west traffic matter for detecting an intruder?",
   "If you could apply zero trust to only one system first, which would you pick and why?"
  ],
  "exit": [
   [
    "List the three zero trust principles.",
    "Verify explicitly, use least privilege and assume breach."
   ],
   [
    "A compromised web server reached a file server in the same subnet. What design principle was missing?",
    "Segmentation or microsegmentation limiting east-west traffic."
   ],
   [
    "How does ZTNA differ from a traditional VPN?",
    "ZTNA grants access to specific applications after identity and device checks; a VPN places the user on the whole network."
   ]
  ],
  "differentiation": [
   "Support: Give students a partially completed flow table with the first two required flows filled in, so they can follow the pattern for the rest.",
   "Extend: Ask fast finishers to write a Kubernetes-style default-deny policy description and two allow policies in plain language, naming pod labels and ports."
  ]
 },
 {
  "t": "Vulnerability management: scanning hosts, container images and IaC; CSPM for misconfigurations",
  "objectives": [
   "Students will be able to describe the vulnerability management cycle of find, prioritize, fix and verify.",
   "Students will be able to match host scanning, image scanning, IaC scanning and CSPM to the problems each detects.",
   "Students will be able to prioritize findings using CVSS plus exposure, exploitability and data sensitivity.",
   "Students will be able to explain why images must be rescanned and why console changes require CSPM."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and tally student guesses on the board."
   ],
   [
    12,
    "Teach",
    "Draw a pipeline from template and code to image to running host to live account. Label where IaC scanning, image scanning, host scanning and CSPM each apply. Explain CVE and CVSS with a sample finding line, then show why context changes priority. Close with the remediation loop and exceptions with expiry dates."
   ],
   [
    15,
    "Activity",
    "Run the findings triage activity described below in groups of three."
   ],
   [
    8,
    "Discuss",
    "Groups share their top three priorities and justify them. Highlight any group that ranked by score alone and discuss what they missed."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "If a scanner hands you 2,000 findings on Monday, how would you decide which ten to fix first?",
  "activity": {
   "title": "Findings triage board",
   "materials": "Printed finding cards (twelve, each with a CVE placeholder, CVSS score, host role, internet exposure, exploit status and data type), whiteboard divided into Fix today, This week, This month and Accept with expiry.",
   "steps": [
    "Give each group the twelve finding cards. Include cards from all four sources: host scan, image scan, IaC scan and CSPM.",
    "Groups first label each card with the tool that would have produced it.",
    "Groups place each card in a priority column and write a one-line reason, using exposure, exploitability, fix availability and data sensitivity.",
    "For any card in Accept with expiry, groups write the owner, reason and expiry date they would record."
   ]
  },
  "discussion": [
   "Why might a team allow a build to pass with a critical finding that has no fix available yet?",
   "Should CSPM tools automatically fix misconfigurations, or only alert? What are the risks of each?",
   "How would you measure whether a vulnerability management program is getting better over time?"
  ],
  "exit": [
   [
    "Which tool catches an unencrypted storage bucket in a template before deployment?",
    "IaC scanning in the pipeline."
   ],
   [
    "Why can a CVSS 6 finding outrank a CVSS 9 finding?",
    "Context such as internet exposure, active exploitation and sensitive data can make the lower-scored finding the higher real risk."
   ],
   [
    "What does a credentialed scan provide that an unauthenticated scan does not?",
    "A complete view of installed software, versions and local settings because it logs in to the host."
   ]
  ],
  "differentiation": [
   "Support: Provide a priority checklist card with four yes or no questions (internet-facing, exploited, fix available, sensitive data) that students apply to each finding card.",
   "Extend: Ask fast finishers to write a short remediation policy with target timeframes per severity and an exception process, and explain how they would report progress to management."
  ]
 },
 {
  "t": "Compliance and governance: data sovereignty, regulatory frameworks, policy enforcement and audit logs",
  "objectives": [
   "Students will be able to distinguish governance from compliance and data sovereignty from data residency.",
   "Students will be able to identify which framework (GDPR, HIPAA, PCI DSS, SOC 2, ISO/IEC 27001, FedRAMP) applies to a described organization.",
   "Students will be able to classify governance controls as preventive or detective and propose policy-as-code guardrails.",
   "Students will be able to describe how audit logs should be collected, protected and retained."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers. Write 'certified provider' on the board and ask whether that settles the matter."
   ],
   [
    12,
    "Teach",
    "Define governance and compliance, then sovereignty and residency. Show a table of the six frameworks with one line each. Draw the shared responsibility split for compliance. Explain preventive versus detective guardrails with region restriction and unencrypted volume examples, then audit logs flowing to a separate logging account."
   ],
   [
    15,
    "Activity",
    "Run the framework-and-guardrail matching activity described below."
   ],
   [
    8,
    "Discuss",
    "Groups explain their guardrail choices. Ask which ones they made preventive and why."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Your cloud provider has every major compliance certification. A developer copies real customer data into an unapproved region. Whose problem is it, and why?",
  "activity": {
   "title": "Who must comply, and how do we enforce it",
   "materials": "Printed organization profile cards (six fictional organizations with industry, location and data types), framework cards, whiteboard divided into Preventive and Detective columns.",
   "steps": [
    "Each group receives two organization profiles, such as a US hospital billing service, an EU online retailer, or a SaaS vendor selling to US federal agencies.",
    "Groups pick every framework card that applies to each organization and write one sentence explaining why.",
    "For each organization, groups write two guardrails as plain-language policy statements, such as 'deny resources outside EU regions', and place each in the Preventive or Detective column on the board.",
    "Groups describe where audit logs will be stored, who can access them and how they are protected from alteration."
   ]
  },
  "discussion": [
   "When would you choose a detective control over a preventive one, even for something important?",
   "How could a disaster recovery plan accidentally violate data residency requirements?",
   "What evidence would you show an auditor to prove a region restriction is actually enforced?"
  ],
  "exit": [
   [
    "What is data residency?",
    "The requirement or choice to keep data in a specific geographic location."
   ],
   [
    "Which framework applies to protected health information in the United States?",
    "HIPAA."
   ],
   [
    "Is a policy that denies creating resources outside approved regions preventive or detective?",
    "Preventive, because it blocks the action before it happens."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page framework reference with each framework's full name, who it applies to and the type of data it covers, for use during the activity.",
   "Extend: Ask fast finishers to design a landing zone baseline for a new account, listing at least four guardrails, the logging setup and how exceptions would be approved."
  ]
 },
 {
  "t": "Hardening: CIS benchmarks, secure baselines, disabling unused services and endpoint protection",
  "objectives": [
   "Students will be able to explain how hardening reduces attack surface and why default configurations are insecure.",
   "Students will be able to compare CIS Level 1 and Level 2 profiles and describe how a secure baseline is derived from a benchmark.",
   "Students will be able to list typical hardening steps for a cloud VM.",
   "Students will be able to distinguish antivirus, EDR and file integrity monitoring."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers about what is risky on a new laptop or phone."
   ],
   [
    12,
    "Teach",
    "Define attack surface. Introduce CIS Benchmarks with Level 1 and Level 2. Draw the flow from benchmark to baseline to golden image to running instance to drift scan. Show sample SSH configuration lines and a pass or fail scan line. Finish with antivirus, EDR, FIM and runtime security."
   ],
   [
    15,
    "Activity",
    "Run the hardening audit activity described below in pairs."
   ],
   [
    8,
    "Discuss",
    "Pairs share their top three fixes and explain which they would build into the golden image."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "You just unboxed a new home router. What settings would you change before connecting it to the internet, and why are they set that way by default?",
  "activity": {
   "title": "Audit the default server",
   "materials": "Printed 'server snapshot' handouts listing running services, open ports, SSH settings, local accounts, agent status and metadata service settings for a fictional VM; a printed short excerpt of benchmark-style recommendations written by the teacher; highlighters.",
   "steps": [
    "Pairs read the server snapshot and highlight every item that conflicts with the recommendations excerpt.",
    "For each highlighted item, pairs write the fix and whether it belongs in the golden image, the IaC template or a runtime agent.",
    "Pairs mark any recommendation they would make an exception for, with a reason and owner, as they would in a baseline document.",
    "Pairs swap sheets with another pair and check for anything missed."
   ]
  },
  "discussion": [
   "Why is replacing a drifted instance from a golden image often better than fixing it in place?",
   "What problems could come from applying a strict hardening profile to a production application without testing?",
   "How would you make sure no instance ever runs without an endpoint agent?"
  ],
  "exit": [
   [
    "Which CIS profile level is intended for most systems with minimal impact on function?",
    "Level 1."
   ],
   [
    "Name two hardening steps for SSH on a cloud VM.",
    "Disable password authentication, disable root login, use keys or a session manager with no open inbound port (any two)."
   ],
   [
    "What does EDR do that traditional antivirus does not?",
    "It records process, file and network activity, detects suspicious behavior and supports remote response such as isolating the host."
   ]
  ],
  "differentiation": [
   "Support: Give students a checklist of six common hardening categories (services, ports, SSH, accounts, logging, agents) to work through the server snapshot one category at a time.",
   "Extend: Ask fast finishers to write a short baseline document for a web server type, including three benchmark settings, one documented exception and how drift will be detected."
  ]
 },
 {
  "t": "Cloud incident response: containment, evidence preservation with snapshots and logs, and recovery",
  "objectives": [
   "Students will be able to list the incident response phases in order and describe the cloud-specific work in each.",
   "Students will be able to choose correct containment actions for a compromised instance and for leaked credentials.",
   "Students will be able to explain how snapshots, exported logs, hashes and chain of custody preserve evidence.",
   "Students will be able to justify recovering from known-good images and backups instead of cleaning a compromised host."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take a quick show of hands: terminate or keep. Ask two students from each side to explain."
   ],
   [
    12,
    "Teach",
    "Write the phases across the board. Under preparation, list central logs, a forensics account, break-glass roles and runbooks. Under containment, draw an instance swapping to an isolation security group and being detached from autoscaling. Under evidence, draw snapshots copied to the forensics account with a hash and a custody log. Under recovery, draw new instances from the golden image."
   ],
   [
    17,
    "Activity",
    "Run the tabletop incident exercise described below in groups of four."
   ],
   [
    6,
    "Discuss",
    "Groups compare their action timelines. Highlight any group that terminated early or forgot persistence."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "An instance is talking to a known malicious server at 2 a.m. You can terminate it with one click and autoscaling will replace it. Would you? What might you lose?",
  "activity": {
   "title": "Tabletop: the 2 a.m. alert",
   "materials": "Printed inject cards revealed one at a time (initial alert, flow log excerpt, audit log excerpt showing a new access key, legal asks for evidence, manager asks when service is back), role cards (incident lead, cloud engineer, scribe, communications), whiteboard timeline.",
   "steps": [
    "Assign roles in each group. The scribe records every decision with a timestamp on the whiteboard timeline.",
    "Reveal the first inject card. Groups decide their containment actions and write them down before the next card is revealed.",
    "Reveal the remaining cards every three minutes. Groups adjust, add evidence preservation steps, handle the new access key as persistence and plan recovery.",
    "Each group writes a custody record for one piece of evidence and three lessons-learned improvements with owners."
   ]
  },
  "discussion": [
   "What preparation steps would have made your group's response faster or more confident?",
   "When might the business pressure to restore service conflict with preserving evidence, and how do you handle it?",
   "Why is a blameless lessons-learned review more useful than finding someone to blame?"
  ],
  "exit": [
   [
    "Name two containment steps for a compromised instance that preserve evidence.",
    "Apply an isolation security group, remove it from the load balancer, detach it from the autoscaling group or tag it as under investigation (any two)."
   ],
   [
    "What does chain of custody document?",
    "Who collected each piece of evidence, when and how, where it was stored and everyone who handled it since."
   ],
   [
    "How should service be recovered after a compromise?",
    "By redeploying from a known-good golden image and IaC and restoring backups from before the compromise, not by cleaning the infected host."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups a partially filled runbook template with the phase headings and one example action under each, so they can focus on choosing the next step.",
   "Extend: Ask fast finishers to write a one-page runbook for leaked access keys, including detection sources, containment, persistence checks, evidence to export and recovery verification."
  ]
 },
 {
  "t": "Source control with Git: branches, pull requests, merges and tagging releases",
  "objectives": [
   "Students will be able to describe the basic Git cycle of add, commit, push, pull and clone.",
   "Students will be able to explain how branches, pull requests and branch protection provide isolation, review and an audit trail.",
   "Students will be able to identify the cause of a merge conflict and how it is resolved.",
   "Students will be able to explain why releases are tagged with semantic versions and why committed secrets must be rotated."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect stories about lost or overwritten files."
   ],
   [
    12,
    "Teach",
    "Draw a main line with commits as dots. Branch off a feature line, add commits, then draw a pull request arrow back with review and CI checks. Show a merge commit versus a squash merge. Add a tag flag on a commit labeled v1.2.0. Finish with the committed-secret warning."
   ],
   [
    16,
    "Activity",
    "Run the paper Git simulation described below in groups of four."
   ],
   [
    7,
    "Discuss",
    "Groups describe the conflict they hit and how they resolved it, and how branch protection changed their process."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "Have you ever had two people edit the same document and lose someone's changes? How would you design a system to stop that happening?",
  "activity": {
   "title": "Paper Git: branch, review, merge, tag",
   "materials": "A printed one-page configuration file (for example a short list of firewall rules) as the 'main branch', sticky notes as commits, colored markers, a 'branch protection rules' card.",
   "steps": [
    "Each group tapes the main configuration to the whiteboard. Two students each take a copy as their feature branch and make one change each on sticky notes with a commit message and author.",
    "Both students make a change to the same line on purpose. They open a 'pull request' by presenting their diff to the group, who act as reviewers and must approve before merging.",
    "The second pull request now conflicts. The group resolves it together, writes the resolved line and records a resolution commit.",
    "The group adds a tag flag such as v1.1.0 to the merged version, then reads the branch protection card and lists which of their steps it would have enforced."
   ]
  },
  "discussion": [
   "Why should infrastructure changes go through the same pull request process as application code?",
   "What are the trade-offs between squash merging and keeping every commit with a merge commit?",
   "If someone commits a secret to a private repository, is it still a problem? Why?"
  ],
  "exit": [
   [
    "Which Git command records staged changes into the history?",
    "git commit."
   ],
   [
    "What does branch protection on main typically require?",
    "Pull requests with approvals and passing checks, and no direct pushes."
   ],
   [
    "A secret was committed and then deleted in the next commit. What must you do?",
    "Rotate the secret, because it remains in the repository history."
   ]
  ],
  "differentiation": [
   "Support: Provide a command reference card mapping add, commit, push, pull, clone, switch, merge and tag to one-sentence meanings, and pair struggling students with a confident partner for the simulation.",
   "Extend: Ask fast finishers to compare trunk-based development with a long-lived develop and release branch model and recommend one for a team releasing infrastructure changes daily."
  ]
 },
 {
  "t": "Continuous integration: automated builds, unit tests and artifact creation",
  "objectives": [
   "Students will be able to explain the purpose of continuous integration and why frequent merging reduces integration problems.",
   "Students will be able to sequence the typical steps of a CI pipeline from trigger to artifact.",
   "Students will be able to distinguish unit tests from integration tests.",
   "Students will be able to justify versioned artifacts and the build once, deploy many principle."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record student estimates of how painful a month-long merge would be."
   ],
   [
    12,
    "Teach",
    "Draw a repository with a webhook arrow to a CI service and runners. List pipeline steps in order on the board. Contrast a unit test with a mocked database against an integration test with a real one. Draw an artifact tagged with a commit hash moving unchanged through test, staging and production."
   ],
   [
    15,
    "Activity",
    "Run the pipeline card-sequencing and log-reading activity described below in pairs."
   ],
   [
    8,
    "Discuss",
    "Pairs share their sequences and their diagnosis of the failing log. Discuss why the pipeline stopped where it did."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Imagine eight people writing one report, each working alone for a month, then combining everything the night before it is due. What goes wrong? How would you avoid it?",
  "activity": {
   "title": "Build the pipeline, read the failure",
   "materials": "Printed step cards (trigger, checkout, install dependencies, compile, lint, unit tests, security scan, build image, push to registry with version tag), a printed short CI log excerpt showing a failing unit test, student laptops with a browser optional for viewing a sample pipeline YAML on the projector.",
   "steps": [
    "Pairs arrange the step cards in the order a CI pipeline would run them and mark which steps could run in parallel.",
    "Pairs read the printed log excerpt, find the failing step and the failing test name, and write what the developer should do next.",
    "Pairs decide how the resulting artifact should be tagged and write the tag format they would use.",
    "Pairs list two changes that would make the pipeline faster without reducing safety, such as caching or parallel tests."
   ]
  },
  "discussion": [
   "Why might a team decide that fixing a broken main build is more important than any new feature work?",
   "What problems do flaky tests cause, and what should a team do about them?",
   "When would you choose a self-hosted runner over a hosted one?"
  ],
  "exit": [
   [
    "What is the main goal of continuous integration?",
    "To find integration problems quickly by merging small changes frequently and automatically building and testing each one."
   ],
   [
    "Which test type uses mocked dependencies and runs in seconds?",
    "Unit tests."
   ],
   [
    "Why should the same artifact be promoted through every environment?",
    "Rebuilding could introduce differences, so the tested artifact might not match what is deployed."
   ]
  ],
  "differentiation": [
   "Support: Give struggling pairs the first and last step cards already placed, plus a glossary card for webhook, runner, artifact and registry.",
   "Extend: Ask fast finishers to sketch a pipeline that runs unit tests on every pull request but integration tests only on merges to main, and explain the trade-off."
  ]
 },
 {
  "t": "Continuous delivery vs continuous deployment, approval gates and pipeline stages",
  "objectives": [
   "Students will be able to distinguish continuous delivery from continuous deployment by the presence of a manual production approval.",
   "Students will be able to sequence typical pipeline stages from source to post-deployment smoke tests.",
   "Students will be able to compare manual approval gates with automated gates and give examples of each.",
   "Students will be able to recommend pipeline security practices such as secrets stores, least privilege per stage and approval logging."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Write 'CD' on the board and ask students what the D stands for. Collect both answers."
   ],
   [
    12,
    "Teach",
    "Draw a pipeline of boxes from source to production. Mark one approval gate before production and explain that removing it changes continuous delivery into continuous deployment. Add automated gate examples beside other arrows. Describe canary, blue-green and feature flags as the safety tools continuous deployment depends on. End with pipeline security."
   ],
   [
    15,
    "Activity",
    "Run the pipeline design activity described below in groups of three or four."
   ],
   [
    8,
    "Discuss",
    "Groups present their pipelines and explain each gate. Ask the class to label each design delivery or deployment."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Two companies both say they do CD. One has a manager approve every production release; the other does not. Are they doing the same thing?",
  "activity": {
   "title": "Design the pipeline for the client",
   "materials": "Printed client profile cards (a regulated bank, a startup marketing site, a mobile game backend, a hospital scheduling system), stage cards, gate cards (manual approval, tests passed, no critical vulnerabilities, change ticket approved, no active alerts, deployment window), whiteboard or poster paper.",
   "steps": [
    "Each group draws a client profile card and reads its constraints, such as regulatory sign-off or a need for many releases per day.",
    "Groups lay out stage cards in order and place gate cards between stages, deciding where a manual approval belongs, if anywhere.",
    "Groups label their design as continuous delivery or continuous deployment and write two sentences justifying the choice for that client.",
    "Groups add one safety mechanism for production, such as a canary step, smoke tests or feature flags, and one pipeline security control."
   ]
  },
  "discussion": [
   "What would a team need to improve before moving from continuous delivery to continuous deployment?",
   "Can a manual approval gate become a rubber stamp? How would you keep it meaningful?",
   "Why is editing a pipeline definition a sensitive change that needs review?"
  ],
  "exit": [
   [
    "What is the single difference between continuous delivery and continuous deployment?",
    "Continuous delivery requires a manual approval before production; continuous deployment releases every passing change automatically."
   ],
   [
    "Give one example each of a manual gate and an automated gate.",
    "Manual: a change manager approves production. Automated: all tests pass, no critical vulnerabilities, no active alerts or a change ticket is approved."
   ],
   [
    "What runs right after a production deployment to confirm key functions work?",
    "Smoke tests."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups a pre-ordered list of stages with blanks only where gates go, so they can focus on choosing gates.",
   "Extend: Ask fast finishers to design an automated canary analysis gate, naming the metrics it compares and the thresholds that would trigger rollback, without using specific product names."
  ]
 },
 {
  "t": "Infrastructure as code tools: declarative vs imperative, Terraform, CloudFormation, ARM/Bicep",
  "objectives": [
   "Students will be able to contrast declarative and imperative infrastructure as code and explain why declarative templates are idempotent.",
   "Students will be able to describe the Terraform workflow of init, plan and apply and the role of the state file.",
   "Students will be able to compare Terraform, CloudFormation, ARM templates and Bicep by provider scope and state management.",
   "Students will be able to select an appropriate IaC tool for a described organization."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let two volunteers act it out: one follows step-by-step directions twice, the other is given an address twice."
   ],
   [
    12,
    "Teach",
    "Write 'what' and 'how' as column headings for declarative and imperative. Show a short declarative description of a network and a short imperative script side by side and ask what happens on a second run. Walk through init, plan and apply with a sample plan summary line. Fill in a comparison table for Terraform, CloudFormation, ARM and Bicep: provider scope, language, state handling."
   ],
   [
    15,
    "Activity",
    "Run the tool-selection consulting activity described below in groups of three."
   ],
   [
    8,
    "Discuss",
    "Groups present their recommendations. Push back on any group that chose a single-provider tool for a multicloud client."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "If you give a friend turn-by-turn directions to your house and they follow them twice from your doorstep, where do they end up? What if you give them your address instead?",
  "activity": {
   "title": "IaC consultants",
   "materials": "Printed client briefs (an AWS-only startup, an Azure-only hospital, a retailer on AWS and Azure with an external DNS provider, a team running a fragile shell script), the comparison table from the teach segment on the projector, poster paper and markers.",
   "steps": [
    "Each group receives two client briefs and identifies whether the client's current approach is declarative or imperative.",
    "Groups recommend an IaC tool for each client and list two reasons tied to provider scope, state management or team skills.",
    "For any client choosing Terraform, groups describe where the state file will live and how it will be protected and locked.",
    "Groups write the plan-review step they would add to the client's pull request process."
   ]
  },
  "discussion": [
   "What are the risks of managing some resources with IaC and changing others by hand in the console?",
   "Why might a company use both a multi-provider tool and a provider-native tool at the same time?",
   "What sensitive information could end up in a state file, and how should it be protected?"
  ],
  "exit": [
   [
    "Which IaC style describes the desired end state?",
    "Declarative."
   ],
   [
    "Which tool is multi-provider and requires a state file?",
    "Terraform."
   ],
   [
    "Which Azure language compiles to ARM templates?",
    "Bicep."
   ]
  ],
  "differentiation": [
   "Support: Provide a filled-in comparison table card for the four tools and a short decision flowchart: one cloud or many, then state file preference.",
   "Extend: Ask fast finishers to explain how drift detection works in CloudFormation and how Terraform's plan reveals drift, and recommend a process for handling manual changes."
  ]
 },
 {
  "t": "Configuration management: Ansible, Puppet and Chef; agent vs agentless; idempotency",
  "objectives": [
   "Students will be able to distinguish configuration management from infrastructure as code provisioning.",
   "Students will be able to compare Ansible, Puppet and Chef by agent model, push or pull operation and configuration language.",
   "Students will be able to explain idempotency and identify a non-idempotent task.",
   "Students will be able to recommend an agent-based or agentless approach for a described environment."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let students describe what happens when you press an elevator call button several times."
   ],
   [
    12,
    "Teach",
    "Draw IaC creating servers and configuration management configuring inside them. Draw an Ansible control node pushing to hosts over SSH, then a Puppet server with agents pulling every 30 minutes. Fill in a table: tool, agent or agentless, push or pull, language. Show an idempotent task and a non-idempotent shell append side by side."
   ],
   [
    15,
    "Activity",
    "Run the idempotency detective activity described below in pairs."
   ],
   [
    8,
    "Discuss",
    "Pairs share which tasks they flagged and their tool recommendation for each scenario."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Pressing an elevator call button five times does not call five elevators. Why is that a useful property for a tool that configures hundreds of servers?",
  "activity": {
   "title": "Idempotency detective",
   "materials": "Printed task sheets with ten plain-language configuration tasks (some idempotent, such as 'ensure package nginx is present', some not, such as 'append this line to the config file' or 'create a new user'), three printed environment scenarios, highlighters.",
   "steps": [
    "Pairs read each task and mark it idempotent or not, writing what would happen if it ran three times.",
    "For each non-idempotent task, pairs rewrite it as a desired-state statement that would be safe to rerun.",
    "Pairs read the three environment scenarios, such as no inbound access allowed, a small team wanting quick adoption, or a large fleet needing continuous enforcement, and choose agent-based or agentless with a reason.",
    "Pairs name a tool that fits each scenario and the language its configuration would be written in."
   ]
  },
  "discussion": [
   "When would baking configuration into a golden image be better than applying it with configuration management after launch?",
   "What are the security trade-offs of a central control node holding SSH keys to every server?",
   "How could nightly configuration runs serve as evidence for auditors?"
  ],
  "exit": [
   [
    "Which tool is agentless and uses YAML playbooks?",
    "Ansible."
   ],
   [
    "How do Puppet agents receive configuration?",
    "They pull it from a central server on a schedule, typically every 30 minutes by default."
   ],
   [
    "Why is appending a line with a raw shell command risky in configuration management?",
    "It is not idempotent, so each run adds another copy of the line."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-row comparison card for Ansible, Puppet and Chef and a simple test question for idempotency: what happens on the second run?",
   "Extend: Ask fast finishers to outline a combined design that uses IaC to launch instances from a golden image and configuration management to enforce a security baseline, and explain which tool handles drift."
  ]
 },
 {
  "t": "APIs, webhooks and data formats (JSON, YAML) for cloud automation",
  "objectives": [
   "Students will be able to interpret common HTTP status codes (200, 201, 400, 401, 403, 404, 429, 5xx) returned by cloud APIs and choose the right response.",
   "Students will be able to compare webhooks with polling and describe how to secure a webhook receiver.",
   "Students will be able to convert a small data structure between JSON and YAML and spot syntax errors in each.",
   "Students will be able to explain when exponential backoff is appropriate and when retrying will not help."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Put the warm-up question on the board and take three or four answers. Note that the console, CLI and scripts all call the same API."
   ],
   [
    12,
    "Teach",
    "Walk through a REST request: method, endpoint, headers, body. Build a status code table on the board with students supplying meanings. Contrast 401 and 403 with the 'who are you' versus 'you may not' framing, then explain backoff. Draw polling versus webhook arrows and add signature verification."
   ],
   [
    15,
    "Activity",
    "Run Status Code Triage and the YAML repair cards in pairs. Circulate and ask pairs to say aloud whether a retry would help."
   ],
   [
    8,
    "Discuss",
    "Review the trickiest cards as a class, especially 403 versus 401 and the YAML card where indentation moves a key."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "When you click Create in a cloud console, what do you think actually happens behind the scenes, and would it be any different if a script did it?",
  "activity": {
   "title": "Status Code Triage and YAML Repair",
   "materials": "Printed cards (made by the teacher) each showing an API scenario with a status code and response snippet, plus four short YAML and JSON snippets with one error each; whiteboard; markers.",
   "steps": [
    "Give each pair a set of eight scenario cards, such as a 429 during a bulk create, a 403 on a delete, a 401 after a token expired and a 503 from the provider.",
    "For each card, pairs write the meaning of the code, the likely cause, and whether to retry with backoff, fix credentials, fix permissions or fix the input.",
    "Hand out the four snippets: a JSON body with a trailing comma, JSON with single quotes, YAML with a tab and YAML with a list item indented under the wrong key.",
    "Pairs mark each error, correct it, and rewrite one YAML snippet as JSON to prove the structure is the same.",
    "Pairs swap answers with a neighboring pair to check, then flag any disagreements for the class discussion."
   ]
  },
  "discussion": [
   "Why might a provider return 404 instead of 403 for a resource you are not allowed to see?",
   "What could go wrong if a webhook receiver acted on requests without checking the signature?",
   "When would polling still be a reasonable choice over a webhook?"
  ],
  "exit": [
   [
    "A call returns 401. What is the most likely cause?",
    "Missing, invalid or expired authentication, such as an expired token."
   ],
   [
    "Which status codes should a script retry with exponential backoff?",
    "429 Too Many Requests and 5xx server errors."
   ],
   [
    "Name two rules JSON enforces that YAML does not.",
    "JSON allows no comments and requires double-quoted keys and strings with no trailing commas; YAML allows comments with # and unquoted keys."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page status code reference card and pre-sort the scenario cards into 'success', 'client error' and 'server error' piles before they decide on actions.",
   "Extend: Ask fast finishers to sketch, in pseudocode, a retry loop with exponential backoff, jitter and a maximum retry count, and to explain how it would honor a Retry-After header."
  ]
 },
 {
  "t": "Container images, registries, tagging and promoting one build through environments",
  "objectives": [
   "Students will be able to explain how image layers, base images and multi-stage builds affect image size and security.",
   "Students will be able to distinguish mutable tags from immutable digests and justify which to use in production.",
   "Students will be able to describe a build-once, promote-everywhere pipeline and why rebuilding per environment is risky.",
   "Students will be able to identify registry controls such as scanning, tag immutability, signing and admission policies."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect a few answers, steering toward the idea that the label is not the content."
   ],
   [
    12,
    "Teach",
    "Project the sample Dockerfile and read it line by line, noting layers, caching order, non-root user and no secrets. Explain registries and repositories, then tags versus digests. Draw the pipeline: build once, test, staging, production."
   ],
   [
    18,
    "Activity",
    "Run the Promotion Pipeline Walk. Groups move a paper image card through environment stations and handle the surprise event cards."
   ],
   [
    5,
    "Discuss",
    "Groups report which event card broke their pipeline and which control would have stopped it."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If a shipping label on a box says 'Version 2', how could you be sure the box you receive is the same one your colleague inspected yesterday?",
  "activity": {
   "title": "Promotion Pipeline Walk",
   "materials": "Whiteboard divided into Build, Registry, Test, Staging and Production zones; index cards representing images, each with a tag and a short made-up digest; sticky notes for tags; printed event cards.",
   "steps": [
    "Each group 'builds' an image card in the Build zone, writing a version tag and a short pretend digest, then places it in the Registry zone.",
    "The group moves the same card through Test, Staging and Production, adding a sticky-note tag at each step, and records the digest each environment runs.",
    "The teacher deals event cards, such as 'Someone pushes a new image with the tag latest', 'A rebuild pulls a newer base image', 'A developer deploys an unsigned image' and 'Bug found, roll back'.",
    "For each event, the group decides whether its production environment is affected and which control (digests, tag immutability, signing, admission policy, keeping old versions) prevents or fixes the problem.",
    "Groups write their controls on the board next to the relevant zone."
   ]
  },
  "discussion": [
   "What is the trade-off between deploying by digest and deploying by version tag for the people operating the system?",
   "Why should environment-specific settings live outside the image?",
   "How long should old image versions be kept in the registry, and what drives that decision?"
  ],
  "exit": [
   [
    "What is the difference between an image tag and an image digest?",
    "A tag is a movable human-readable label; a digest is an immutable content hash that always identifies the same image."
   ],
   [
    "Why should an image not be rebuilt for production after passing staging?",
    "A rebuild may pull different base images or dependencies, producing an untested artifact; promoting the same image guarantees what was tested is what runs."
   ],
   [
    "Name two registry or cluster controls that ensure only trusted images run.",
    "Any two of vulnerability scanning on push, tag immutability, image signing and admission policies."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of image layers and a two-column tag versus digest comparison chart, and let students work the pipeline walk with the event cards' answers on the back.",
   "Extend: Ask fast finishers to rewrite a provided bloated single-stage Dockerfile as a multi-stage build in pseudocode and list each security improvement they made."
  ]
 },
 {
  "t": "Scripting for cloud administration: CLI tools, Bash, PowerShell and Python",
  "objectives": [
   "Students will be able to select Bash, PowerShell, Python or a provider CLI for a described administration task and justify the choice.",
   "Students will be able to read a short CLI or Bash snippet and explain what it does.",
   "Students will be able to explain the difference between text-based and object-based pipelines.",
   "Students will be able to apply safe scripting practices: no hard-coded credentials, dry runs, logging, pagination and least privilege."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the board as 'tasks that should be scripted'."
   ],
   [
    12,
    "Teach",
    "Introduce the provider CLIs and how they authenticate. Project the Bash loop and the PowerShell one-liner side by side to show text versus objects. Describe when Python wins. Finish with the safe-scripting checklist."
   ],
   [
    15,
    "Activity",
    "Run Pick the Tool, Fix the Script. Groups sort task cards to tools, then mark up a flawed script."
   ],
   [
    8,
    "Discuss",
    "Groups share the most dangerous flaw they found and how they fixed it."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "What is a cloud task you would hate to do by clicking in a console 200 times, and what could go wrong if you automated it carelessly?",
  "activity": {
   "title": "Pick the Tool, Fix the Script",
   "materials": "Printed task cards (teacher-made) describing ten administration jobs; a printed flawed script excerpt per group; highlighters; whiteboard.",
   "steps": [
    "Groups sort the ten task cards into Bash, PowerShell, Python or CLI one-off piles, writing a one-sentence justification on each card.",
    "Hand each group a printed script that deletes old snapshots but contains flaws: a hard-coded access key, no set -euo pipefail, no dry-run flag, no pagination and no logging.",
    "Groups highlight each flaw and write the fix in the margin.",
    "Each group writes the safe-scripting checklist they would require before any script runs in production.",
    "Groups post their checklists on the board and compare them."
   ]
  },
  "discussion": [
   "When does a script become important enough that it should be converted into infrastructure as code or a proper application?",
   "How would you decide what permissions a scheduled clean-up script should have?",
   "What are the risks of running scripts from a personal laptop instead of a cloud shell or a pipeline?"
  ],
  "exit": [
   [
    "Which tool passes objects rather than text through its pipeline?",
    "PowerShell."
   ],
   [
    "Name the best fit for complex logic involving several APIs, retries and data processing.",
    "Python with the provider SDKs."
   ],
   [
    "Give two safe-scripting practices for a script that deletes resources.",
    "Any two of: no hard-coded credentials (use workload identity or profiles), a dry-run mode, least privilege, logging, testing in non-production, storing in Git."
   ]
  ],
  "differentiation": [
   "Support: Give students a tool comparison chart with one example command for each tool and let them sort task cards using the chart.",
   "Extend: Ask fast finishers to write pseudocode for a Python clean-up function that handles pagination, retries throttled calls with backoff and supports a --confirm flag."
  ]
 },
 {
  "t": "The troubleshooting methodology applied to cloud incidents",
  "objectives": [
   "Students will be able to list the seven steps of the CompTIA troubleshooting methodology in order.",
   "Students will be able to classify cloud troubleshooting actions into the correct methodology step.",
   "Students will be able to explain why verification and preventive measures come before closing an incident.",
   "Students will be able to apply the methodology to a cloud incident scenario and identify the next correct step."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect stories. Point out where people jumped to a fix too early."
   ],
   [
    12,
    "Teach",
    "Write the seven steps on the board. For each, give a cloud example: audit log and scope for identify, request-path thinking for theory, flow logs for test, change records for plan, and so on. Share the mnemonic."
   ],
   [
    15,
    "Activity",
    "Run the Incident Card Sort. Groups place action cards into the seven columns, then role-play the next step."
   ],
   [
    8,
    "Discuss",
    "Review cards groups placed differently, especially questioning users and verifying functionality."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of a time something broke, at home or at work, and someone 'fixed' it without understanding the cause. What happened next?",
  "activity": {
   "title": "Incident Card Sort",
   "materials": "Printed action cards (teacher-made) describing actions from one cloud outage, such as 'Check audit log for recent changes', 'Restore the security group rule via the pipeline', 'Confirm users can log in'; whiteboard with seven labeled columns; tape or magnets.",
   "steps": [
    "Shuffle the 14 action cards and give one set to each group.",
    "Groups place each card under the correct methodology step on their section of the board.",
    "The teacher announces a twist, such as 'the theory was wrong', and groups decide which cards must move or which new action is needed.",
    "Each group writes a two-sentence ticket documentation entry summarizing the incident.",
    "Groups compare boards with a neighboring group and resolve any differences."
   ]
  },
  "discussion": [
   "Why is it tempting to skip testing the theory during a high-pressure outage, and what is the cost?",
   "When should you escalate to the cloud provider rather than continue investigating yourself?",
   "What makes a post-incident review blameless, and why does that matter for future incidents?"
  ],
  "exit": [
   [
    "List the seven steps of the methodology in order.",
    "Identify the problem; establish a theory; test the theory; plan of action and effects; implement or escalate; verify and prevent; document."
   ],
   [
    "In which step do you check the audit log for recent configuration changes?",
    "Identify the problem (gathering information and asking what changed)."
   ],
   [
    "Why is 'the error went away' not enough to close an incident?",
    "You must verify full functionality, confirming users can complete tasks and monitoring is normal, and add preventive measures where applicable."
   ]
  ],
  "differentiation": [
   "Support: Give students a printed seven-step strip with a one-line description and cloud example under each step to keep at their desks during the card sort.",
   "Extend: Ask fast finishers to write a short incident scenario with a deliberately misleading obvious cause and trade it with another group to solve using the methodology."
  ]
 },
 {
  "t": "Network troubleshooting: routes, security groups, NACLs, DNS, NAT and peering problems",
  "objectives": [
   "Students will be able to trace a packet's path through DNS, route tables, NACLs, security groups and host firewalls to locate a failure.",
   "Students will be able to distinguish stateful security group behavior from stateless NACL behavior when diagnosing blocked traffic.",
   "Students will be able to interpret flow log ACCEPT and REJECT entries to identify the failing layer.",
   "Students will be able to diagnose NAT gateway, DNS resolution and peering misconfigurations from a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up prompt and have students list everything that could stop a connection. Group the answers by layer on the board."
   ],
   [
    12,
    "Teach",
    "Draw a two-VPC diagram with public and private subnets, an internet gateway, a NAT gateway and a peering link. Walk a packet through it, stopping at DNS, routes, NACLs, security groups and host firewall. Show sample flow log lines with ACCEPT and REJECT."
   ],
   [
    18,
    "Activity",
    "Run Broken Network Detectives in pairs using the printed diagrams and log excerpts."
   ],
   [
    5,
    "Discuss",
    "Pairs explain one case, naming the evidence that pointed to the layer."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "An app cannot connect to a database. List as many places as you can where that connection could be stopped between the two.",
  "activity": {
   "title": "Broken Network Detectives",
   "materials": "Printed case sheets (teacher-made), each with a small network diagram, route tables, security group and NACL rules and a few flow log lines; projector for the reference diagram; whiteboard.",
   "steps": [
    "Give each pair four case sheets: a private subnet without a NAT route, a NACL missing outbound ephemeral ports, a peering link with no route on one side, and a private DNS zone not associated with the VPC.",
    "Pairs follow the packet path on each diagram and mark the exact component that fails.",
    "For each case, pairs write which evidence (route table, rule, flow log line, dig output) proves it, and the fix.",
    "The teacher then reveals a fifth bonus case with overlapping CIDRs and transitive peering for pairs that finish early.",
    "Pairs compare answers with another pair and agree on one fix per case."
   ]
  },
  "discussion": [
   "Why is 'the security group is open' rarely enough information to close a connectivity ticket?",
   "When would you reach for a reachability analyzer instead of reading flow logs?",
   "How would you design a network to avoid overlapping CIDR problems as the company grows?"
  ],
  "exit": [
   [
    "Flow logs show REJECT for traffic to your database port. Which layers are likely responsible?",
    "A security group or network ACL."
   ],
   [
    "Private instances cannot reach the internet. Name the route and component to check.",
    "The private route table's 0.0.0.0/0 route to a NAT gateway, and that the NAT gateway is in a public subnet routed to an internet gateway and is available."
   ],
   [
    "Why can't VPC A reach VPC C when both are peered only with VPC B?",
    "Peering is not transitive; A needs a direct peering with C or a transit hub."
   ]
  ],
  "differentiation": [
   "Support: Provide a laminated path checklist (DNS, routes, NACL in and out, security group, host firewall, app) that students tick through for each case.",
   "Extend: Ask fast finishers to design a hub-and-spoke layout for five networks with non-overlapping CIDR ranges and explain how hybrid DNS forwarding would work."
  ]
 },
 {
  "t": "Access and permission failures: policy evaluation, explicit deny, expired credentials and certificates",
  "objectives": [
   "Students will be able to explain the cloud IAM evaluation order of explicit deny, allow and implicit deny.",
   "Students will be able to identify the sources of explicit denies, including resource policies, permission boundaries and organization guardrails.",
   "Students will be able to distinguish permission failures from expired credentials, expired certificates and clock skew using error messages.",
   "Students will be able to select the right diagnostic tool, such as caller identity checks, audit logs or policy simulators."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and discuss answers using the field trip example."
   ],
   [
    12,
    "Teach",
    "Draw the evaluation flowchart: explicit deny anywhere, then allow, else implicit deny. List deny sources around it. Then contrast error messages: access denied versus token expired, invalid signature and certificate errors."
   ],
   [
    18,
    "Activity",
    "Run Allowed or Denied, and Why. Groups evaluate request cards against printed policy sets."
   ],
   [
    5,
    "Discuss",
    "Review the administrator-in-a-blocked-region card and the clock skew card."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If a school gives you a signed permission slip but the principal cancels all field trips that day, do you go? How might that apply to computer permissions?",
  "activity": {
   "title": "Allowed or Denied, and Why",
   "materials": "Printed request cards and matching simplified policy sets (identity policy, resource policy, boundary, organization policy) made by the teacher; printed error message cards; whiteboard with the evaluation flowchart.",
   "steps": [
    "Give each group eight request cards, each describing who is calling, what action and which resource, with a set of simplified policies.",
    "Groups walk each request through the flowchart and record Allowed or Denied and the exact policy statement that decided it.",
    "Hand out six error message cards, such as 'token expired', 'invalid signature', 'certificate has expired' and 'explicit deny in service control policy'.",
    "Groups classify each message as permission, credential, certificate or clock problem and write the first thing they would check.",
    "Groups present one card they found surprising."
   ]
  },
  "discussion": [
   "Why do organizations use guardrails that even administrators cannot override?",
   "How could a team avoid outages caused by expiring certificates and secrets?",
   "What risks come from fixing access errors by granting broad permissions?"
  ],
  "exit": [
   [
    "An identity policy allows an action, and a resource policy explicitly denies it. What is the result?",
    "Denied; an explicit deny overrides any allow."
   ],
   [
    "Name two sources of explicit deny besides the user's own policy.",
    "Any two of resource policies, permission boundaries, session policies and organization guardrails such as service control policies."
   ],
   [
    "A server's requests all fail with invalid signature errors, though its credentials are new. What should you check?",
    "Clock skew; synchronize the server's clock with NTP."
   ]
  ],
  "differentiation": [
   "Support: Provide the evaluation flowchart as a printed handout with a worked example, and pair students so one reads policies while the other follows the flowchart.",
   "Extend: Ask fast finishers to write a simplified policy set in which a user can list a bucket but not read its objects, then explain which resource identifiers cause the difference."
  ]
 },
 {
  "t": "Deployment failures: quotas and service limits, template errors, capacity and image problems",
  "objectives": [
   "Students will be able to classify a deployment error as a quota, template, capacity or image problem from its message.",
   "Students will be able to distinguish a quota limit from a provider capacity shortage and choose the correct fix for each.",
   "Students will be able to explain why template rollbacks require reading the first failure event.",
   "Students will be able to plan DR readiness checks for quotas and regional images."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect answers to the four categories."
   ],
   [
    12,
    "Teach",
    "Present the four categories with a real-sounding error message for each. Draw a rollback event list on the board and circle the first failure. Contrast quota versus capacity with the rental car example."
   ],
   [
    15,
    "Activity",
    "Run the Error Message Sort and the DR readiness checklist build."
   ],
   [
    8,
    "Discuss",
    "Groups share their DR checklist items and the trickiest error card."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You try to book ten hotel rooms and are refused. List every reason the hotel might say no. Which ones could you fix by calling a manager?",
  "activity": {
   "title": "Error Message Sort",
   "materials": "Printed error message cards (teacher-made) with realistic but generic deployment errors; a printed rollback event log excerpt; four labeled zones on the whiteboard; sticky notes.",
   "steps": [
    "Groups receive twelve error cards, such as 'vCPU limit exceeded', 'insufficient capacity in zone b', 'image not found', 'circular dependency detected', 'bucket name already exists' and 'ImagePullBackOff'.",
    "Groups sort each card into Quota, Template, Capacity or Image on the board and write the fix on a sticky note.",
    "Hand out the rollback log excerpt; groups find the first failure event and explain why the later messages are not the cause.",
    "Each group writes five items for a DR readiness checklist that would prevent these failures in a secondary region.",
    "Groups compare checklists and combine the best items into one class list."
   ]
  },
  "discussion": [
   "Why might a secondary DR region have lower quotas than the primary, and how would you keep them aligned?",
   "What are the trade-offs of reserving capacity for workloads that may never need it?",
   "How can templates be written to be more resilient to capacity and image differences between regions?"
  ],
  "exit": [
   [
    "A deployment fails with 'insufficient capacity'. Will a quota increase fix it? Why?",
    "No; it is a provider-side shortage in that zone. Change zone or instance type, or reserve capacity."
   ],
   [
    "Why should you read the first failure event in a rolled-back deployment?",
    "It names the real cause; the later rollback messages are consequences."
   ],
   [
    "What must you do before launching a machine image in a new region?",
    "Copy the image to that region and use its regional image ID."
   ]
  ],
  "differentiation": [
   "Support: Give students a keyword guide that links error words such as 'limit', 'capacity', 'not found' and 'invalid' to the four categories.",
   "Extend: Ask fast finishers to sketch how a template could look up the latest approved image ID per region by parameter, and how a pipeline could check quotas before deploying."
  ]
 },
 {
  "t": "Performance problems: resource contention, throttling and API rate limits, latency and bottlenecks",
  "objectives": [
   "Students will be able to identify the bottleneck tier from CPU, memory, storage and network metrics.",
   "Students will be able to recognize throttling and rate limiting from flat-lined metrics and HTTP 429 errors and choose a response.",
   "Students will be able to explain why p95 and p99 latency reveal problems that averages hide.",
   "Students will be able to match a performance bottleneck to an appropriate fix, such as scaling, caching, changing volume type or adding indexes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Run the warm-up calculation on the board and compare the average with the slowest requests."
   ],
   [
    12,
    "Teach",
    "Walk through the four resources with the key metric for each, including steal time and CPU credits. Explain throttling at API, storage, database and serverless layers. Draw a trace with spans to show per-hop latency."
   ],
   [
    18,
    "Activity",
    "Run Find the Bottleneck using printed metric snapshots."
   ],
   [
    5,
    "Discuss",
    "Groups present one case and defend their fix."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Ten requests take these times in milliseconds: 100, 100, 100, 100, 100, 100, 100, 100, 100, 5000. What is the average, and does it describe what the slowest user experienced?",
  "activity": {
   "title": "Find the Bottleneck",
   "materials": "Printed metric snapshot sheets (teacher-made) showing simple line graphs for CPU, memory, IOPS, network, latency percentiles and error codes for each case; colored pens; whiteboard.",
   "steps": [
    "Give each group five case sheets: a volume pinned at provisioned IOPS, a burstable instance out of credits, a script receiving 429s, a function at its concurrency limit, and a cross-region database call.",
    "Groups circle the metric that reveals the bottleneck in each case and label it contention, throttling or latency.",
    "For each case, groups choose a fix and explain why scaling the web tier would or would not help.",
    "Groups rank their five fixes from cheapest to most expensive and discuss which they would try first.",
    "Each group writes one alert rule that would have warned them earlier for one case."
   ]
  },
  "discussion": [
   "Why do teams so often add servers first when an application is slow?",
   "How would you build a baseline for a new application that has no history?",
   "When is it better to change application design, such as caching or batching, rather than buy bigger resources?"
  ],
  "exit": [
   [
    "A database volume's IOPS graph is flat at exactly its provisioned value during slowdowns. What is happening?",
    "The volume is being throttled at its provisioned IOPS limit; move to a higher-performance volume type or size or reduce I/O."
   ],
   [
    "What should a script do when it receives HTTP 429 responses?",
    "Retry with exponential backoff and jitter, and reduce request volume with caching or batching or request a higher limit."
   ],
   [
    "Why is p99 latency more useful than the average for user experience?",
    "It shows how the slowest one percent of requests perform, which averages hide."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page metric guide that pairs each resource with its warning sign (high utilization, steal time, credit balance, flat IOPS, 429s) for students to use during the activity.",
   "Extend: Ask fast finishers to sketch a distributed trace for a slow checkout request and propose two design changes that remove the largest spans."
  ]
 },
 {
  "t": "Cost and billing anomalies: orphaned resources, data egress charges and runaway autoscaling",
  "objectives": [
   "Students will be able to identify common orphaned resources and explain why they continue to generate charges.",
   "Students will be able to explain which data transfers incur egress charges and propose ways to reduce them.",
   "Students will be able to describe causes of runaway autoscaling and the guardrails that limit its cost.",
   "Students will be able to configure a detection strategy using budgets, anomaly detection, cost reports and tagging."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list household 'leaks' on the board, then map each to a cloud equivalent."
   ],
   [
    12,
    "Teach",
    "Cover detection first: budgets, anomaly detection, tagging. Then the three causes with examples, using the utility bill analogy. Draw a diagram showing where egress is and is not charged."
   ],
   [
    18,
    "Activity",
    "Run the Bill Detective activity with printed cost reports."
   ],
   [
    5,
    "Discuss",
    "Groups present their top finding and the guardrail they would add."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your household electricity bill doubled this month, but nobody remembers doing anything different. Where would you look first?",
  "activity": {
   "title": "Bill Detective",
   "materials": "Printed simplified cost reports (teacher-made) grouped by service, region and tag, a short audit log excerpt and a list of resources with status; highlighters; sticky notes.",
   "steps": [
    "Give each group a cost report showing a month-over-month spike, plus the audit log excerpt and resource list.",
    "Groups highlight the line items that grew and classify each as orphaned resource, egress or runaway scaling.",
    "Using the audit log, groups find the change that lines up with each spike in time.",
    "Groups write a fix and a preventive guardrail for each cause on sticky notes, such as a lifecycle policy, a CDN, a private endpoint or a maximum instance count.",
    "Groups design a budget alert plan with thresholds and recipients and post it on the board."
   ]
  },
  "discussion": [
   "Who should own cloud costs in an organization: finance, engineering or both?",
   "How do you balance deleting orphaned resources quickly with the risk of deleting something someone needs?",
   "When is cross-region replication worth its egress cost?"
  ],
  "exit": [
   [
    "Name two orphaned resources that keep billing after a VM is terminated.",
    "Any two of unattached volumes, old snapshots, unused static or elastic IP addresses, idle load balancers."
   ],
   [
    "Is data coming into a cloud provider usually charged? What about data leaving to the internet?",
    "Ingress is generally free; egress to the internet is charged."
   ],
   [
    "Which setting limits the cost of a runaway scaling group?",
    "A sensible maximum instance count (or concurrency limit for functions), with alarms and budget alerts."
   ]
  ],
  "differentiation": [
   "Support: Give students a three-column sorting sheet labeled Orphaned, Egress and Scaling with one worked example in each column.",
   "Extend: Ask fast finishers to draft a tagging policy with required keys and an expiry rule, and describe how automation could use it to clean up temporary resources."
  ]
 },
 {
  "t": "Using logs, metrics, traces and provider health dashboards to find root cause",
  "objectives": [
   "Students will be able to match metrics, logs, traces, audit logs and provider health dashboards to the questions each answers.",
   "Students will be able to narrow the scope of an incident by splitting metrics by zone, instance, version or endpoint.",
   "Students will be able to build an incident timeline that links a change to a symptom.",
   "Students will be able to apply the 5 whys technique to move from an immediate cause to contributing factors."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and contrast fixing the symptom with fixing the cause."
   ],
   [
    10,
    "Teach",
    "Present the five data sources with the question each answers: when and where, what, where in the chain, what changed, is it the provider. Show how splitting a metric by zone or version narrows scope."
   ],
   [
    20,
    "Activity",
    "Run Build the Timeline with printed evidence cards from one fictional incident."
   ],
   [
    5,
    "Discuss",
    "Groups present their timeline and 5 whys chain."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your car overheats, so you add coolant and it is fine for a day. What have you fixed, and what have you not?",
  "activity": {
   "title": "Build the Timeline",
   "materials": "Printed evidence cards (teacher-made) from one fictional incident: metric graph snippets, log lines with timestamps, a trace summary, audit log entries and a health dashboard screenshot description; string or tape; whiteboard.",
   "steps": [
    "Give each group a shuffled set of about fifteen evidence cards, including a few red herrings.",
    "Groups label each card with its data source and the question it answers.",
    "Groups arrange the relevant cards in time order on the whiteboard to form a timeline and circle the change that came just before the first symptom.",
    "Groups write a 5 whys chain from the symptom to at least two contributing factors.",
    "Each group proposes one fix for the root cause and one preventive measure for a contributing factor."
   ]
  },
  "discussion": [
   "Why are recent changes the most common cause of incidents?",
   "What makes a post-incident review blameless, and how does that improve future investigations?",
   "Which data source would you want if you could only have one during an outage, and why?"
  ],
  "exit": [
   [
    "Which data source shows what changed just before an incident?",
    "The control plane audit log."
   ],
   [
    "Errors appear in only one availability zone. What does that suggest, and what would you check?",
    "An infrastructure issue in that zone; check the provider's health dashboard and zone-specific changes."
   ],
   [
    "What does a distributed trace show that individual service logs do not easily show?",
    "Where in the chain of services a single request spent its time or failed."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card listing each data source with its guiding question, and pre-sort the evidence cards by source before students build the timeline.",
   "Extend: Ask fast finishers to design an alert that would have caught the incident earlier and explain which metric and threshold they would use."
  ]
 },
 {
  "t": "Automation and integration failures: broken pipelines, expired tokens, version and dependency mismatches",
  "objectives": [
   "Students will be able to diagnose a broken pipeline by reading logs from the first error and comparing with the last successful run.",
   "Students will be able to distinguish expired credential failures from permission failures using error messages.",
   "Students will be able to explain how version pinning and lock files prevent dependency mismatches.",
   "Students will be able to troubleshoot webhook integration failures using sender delivery logs and receiver request logs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and gather answers about things that 'just stopped working'."
   ],
   [
    12,
    "Teach",
    "Walk through the three failure categories with example error messages. Contrast 401 and 403. Show a pinned dependency file next to an unpinned one. Explain workload identity federation in plain terms."
   ],
   [
    18,
    "Activity",
    "Run Pipeline Post-Mortems with printed failing logs."
   ],
   [
    5,
    "Discuss",
    "Groups share the root cause and the permanent fix for one log."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Something you use every day, such as an app or a printer, worked on Friday and fails on Monday, and you did not touch it. What could have changed?",
  "activity": {
   "title": "Pipeline Post-Mortems",
   "materials": "Printed pipeline log excerpts (teacher-made) for four failures, each with a last-successful-run excerpt for comparison; a printed webhook delivery log; highlighters; whiteboard.",
   "steps": [
    "Give each group four failing log excerpts: an expired client secret (401), a provider upgrade removing an argument, an agent out of disk space, and a YAML indentation error in the pipeline file.",
    "Groups highlight the first real error in each log and compare it with the last successful run to spot what changed.",
    "For each failure, groups write a short-term fix and a permanent prevention, such as workload identity federation, version pinning or agent monitoring.",
    "Hand out the webhook delivery log showing a run of 401 responses after a secret rotation; groups diagnose it and write the fix.",
    "Groups post their fixes on the board under 'Credentials', 'Versions', 'Pipeline' and 'Integration'."
   ]
  },
  "discussion": [
   "What are the trade-offs between pinning versions strictly and staying current with security patches?",
   "Why do long-lived secrets keep causing outages, and what makes teams slow to remove them?",
   "How should a team handle a flaky test that blocks releases?"
  ],
  "exit": [
   [
    "A pipeline that worked yesterday fails today with no code change. Name two likely causes.",
    "Any two of an expired or rotated credential or certificate, an unpinned dependency or tool update, an updated agent image, or a platform API change."
   ],
   [
    "What error code usually indicates an expired credential rather than a missing permission?",
    "401 Unauthorized (missing permissions typically return 403)."
   ],
   [
    "How does a lock file prevent dependency mismatches?",
    "It records exact dependency versions so every build installs the same ones until they are deliberately updated."
   ]
  ],
  "differentiation": [
   "Support: Provide a symptom-to-cause table linking common error messages (401, unknown argument, no space left, YAML parse error) to their categories for students to use while reading logs.",
   "Extend: Ask fast finishers to outline how they would migrate a pipeline from a stored client secret to workload identity federation, listing what must be configured on each side."
  ]
 }
]);
