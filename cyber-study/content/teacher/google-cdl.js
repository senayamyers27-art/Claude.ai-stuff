/* Teacher edition for Google Cloud Certified Cloud Digital Leader (Cloud Digital Leader): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("google-cdl", [
 {
  "t": "What cloud computing is and why it drives digital transformation",
  "objectives": [
   "Students will be able to define cloud computing and list the five NIST characteristics.",
   "Students will be able to distinguish a simple migration from digital transformation using a business scenario.",
   "Students will be able to explain how cloud capabilities such as self-service, managed services and global infrastructure enable new business outcomes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to write one sentence that defines 'the cloud' on a sticky note. Collect and read a few aloud, noting the variety."
   ],
   [
    15,
    "Teach",
    "Present the NIST definition and the five characteristics with one business consequence each. Then contrast migration with transformation using the pizza shop and insurer examples."
   ],
   [
    15,
    "Activity",
    "Run the 'Migration or transformation' card sort in small groups, then have each group justify two of its placements to the class."
   ],
   [
    5,
    "Discuss",
    "Lead a short discussion on why organizations often stop at migration and what leaders can do about it."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "If you could rent any piece of technology by the minute instead of buying it, what would you choose and how would it change what you do?",
  "activity": {
   "title": "Migration or transformation card sort",
   "materials": "Printed scenario cards (about 12), whiteboard divided into two columns, markers.",
   "steps": [
    "Prepare cards describing changes, such as 'Moved payroll server to a cloud VM with no other change' or 'Launched same-day delivery using real-time inventory data in the cloud.'",
    "Groups of three sort each card into 'Migration' or 'Transformation' and note which NIST characteristic made the change possible.",
    "Each group places two cards on the whiteboard and explains its reasoning.",
    "The class challenges any placement it disagrees with, and the teacher resolves borderline cases by asking what changed for customers or staff."
   ]
  },
  "discussion": [
   "Why might an organization stop at migration and never reach transformation?",
   "Which NIST characteristic do you think matters most to a small business, and why?"
  ],
  "exit": [
   [
    "List the five NIST characteristics of cloud computing.",
    "On-demand self-service, broad network access, resource pooling, rapid elasticity, measured service."
   ],
   [
    "A bank moves its servers to the cloud with no change to products or processes. Is this transformation?",
    "No. It is a migration; transformation changes how the business operates or creates value."
   ],
   [
    "Give one way the cloud speeds up experimentation.",
    "Teams can create resources in minutes and delete them when done, paying only for use, so failed ideas cost little."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page table pairing each NIST characteristic with an everyday example, and let them sort cards with a partner first.",
   "Extend: Ask fast finishers to write a short transformation proposal for a local business, naming which cloud capabilities it would rely on and what would change for its customers."
  ]
 },
 {
  "t": "Business benefits of the cloud: scalability, elasticity, agility, reliability and strategic value",
  "objectives": [
   "Students will be able to define scalability, elasticity, agility, reliability and strategic value.",
   "Students will be able to distinguish scaling up from scaling out and scalability from elasticity.",
   "Students will be able to match a business scenario to the cloud benefit that solves it."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about a store on Black Friday and take three or four answers."
   ],
   [
    15,
    "Teach",
    "Walk through each benefit with a short scenario, drawing scale-up versus scale-out on the whiteboard and sketching a traffic graph with autoscaled capacity following it."
   ],
   [
    15,
    "Activity",
    "Run the 'Benefit match' relay: teams race to match scenario cards to benefits, then defend one choice."
   ],
   [
    5,
    "Discuss",
    "Discuss which benefits a hospital, a startup and a government agency would value most."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A small online store sells ten times its normal volume on one day each year. If you ran its IT, what would you do about servers for that day and for the rest of the year?",
  "activity": {
   "title": "Benefit match relay",
   "materials": "Printed scenario cards (about 15), five whiteboard columns labeled Scalability, Elasticity, Agility, Reliability, Strategic value, sticky notes.",
   "steps": [
    "Divide the class into teams and give each team a shuffled set of scenario cards.",
    "One student at a time from each team posts a card under the benefit column they think fits, then tags the next teammate.",
    "When all cards are posted, review each column as a class and move any misplaced cards, asking which keyword in the scenario gave the clue.",
    "Each team picks one card it found hardest and explains the distinction it tested, such as scalability versus elasticity."
   ]
  },
  "discussion": [
   "Is cost savings a good primary reason for a company to move to the cloud? Why or why not?",
   "How does agility change the way a company thinks about failure?"
  ],
  "exit": [
   [
    "What is the difference between scalability and elasticity?",
    "Scalability is the ability to grow capacity; elasticity is automatically adding and removing capacity as demand changes."
   ],
   [
    "A company adds more VMs behind a load balancer to handle growth. Is this scaling up or scaling out?",
    "Scaling out (horizontal scaling)."
   ],
   [
    "Which benefit lets a startup test an idea for a week and delete everything if it fails?",
    "Agility."
   ]
  ],
  "differentiation": [
   "Support: Provide a keyword cheat sheet linking clue words (spike, outage, slow launch, focus) to each benefit, and pair struggling students with a partner during the relay.",
   "Extend: Ask fast finishers to write two scenario cards of their own that are deliberately tricky, such as one that tests scalability versus elasticity, and swap them with another group."
  ]
 },
 {
  "t": "CapEx vs OpEx and total cost of ownership (TCO) when moving to the cloud",
  "objectives": [
   "Students will be able to define CapEx, OpEx and TCO and classify common IT costs.",
   "Students will be able to identify hidden on-premises costs and one-time migration costs in a TCO comparison.",
   "Students will be able to explain why OpEx needs active cost management and when commitments make sense."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about buying versus leasing a car and list answers on the board under 'up front' and 'ongoing.'"
   ],
   [
    15,
    "Teach",
    "Define CapEx and OpEx, explain depreciation briefly, then build a TCO list together. Close with cost controls: budgets, rightsizing and committed use discounts."
   ],
   [
    15,
    "Activity",
    "Run the 'Hidden cost hunt' with cost cards, then have groups recompare on-premises and cloud totals."
   ],
   [
    5,
    "Discuss",
    "Discuss why finance and IT might see the same project differently."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "When you buy a phone, what costs do you pay after the purchase price? Which of those are easy to forget?",
  "activity": {
   "title": "Hidden cost hunt",
   "materials": "Printed cost cards (hardware, licenses, power, cooling, floor space, maintenance contract, staff time, migration labor, training, parallel running, monthly usage, support plan), whiteboard with a two-column table, markers.",
   "steps": [
    "Give each group a set of cost cards with rough made-up amounts and a starting comparison of only 'server price' versus 'cloud monthly usage times 60 months.'",
    "Groups decide whether each card belongs to the on-premises side, the cloud side or both, and whether it is CapEx or OpEx.",
    "Groups recompute both totals and write them on the whiteboard.",
    "The class compares results and discusses which cards changed the outcome most and why they are often left out."
   ]
  },
  "discussion": [
   "Why might a company still choose CapEx-heavy on-premises IT even when the TCO favors the cloud?",
   "Who in an organization should own the cloud bill, and why?"
  ],
  "exit": [
   [
    "Is a monthly cloud invoice CapEx or OpEx?",
    "OpEx."
   ],
   [
    "Name three costs often missing from an on-premises TCO.",
    "Any three of power, cooling, floor space, hardware refresh, maintenance contracts, physical security, staff time."
   ],
   [
    "What pricing option suits a workload that runs steadily for years?",
    "A committed use discount, which lowers the price in exchange for a usage commitment."
   ]
  ],
  "differentiation": [
   "Support: Provide a pre-labeled worksheet with CapEx and OpEx definitions and two worked examples, and let students classify cards with a partner before the group step.",
   "Extend: Ask fast finishers to list three intangible benefits, such as faster delivery, that a TCO spreadsheet struggles to price, and suggest how a leader could still present them to a finance committee."
  ]
 },
 {
  "t": "Deployment options: on-premises, private cloud, public cloud, hybrid cloud and multicloud",
  "objectives": [
   "Students will be able to define on-premises, private cloud, public cloud, hybrid cloud and multicloud.",
   "Students will be able to identify the deployment model described in a short scenario.",
   "Students will be able to explain at least two business reasons for choosing hybrid or multicloud."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about where students keep photos and files, and map answers to the five models on the board."
   ],
   [
    15,
    "Teach",
    "Define each model with a one-line scenario, draw a simple diagram showing on-premises connected to Google Cloud and a second public cloud, and highlight the hybrid versus multicloud distinction."
   ],
   [
    15,
    "Activity",
    "Run 'Name that model': groups label scenario cards and draw a quick diagram for one of them."
   ],
   [
    5,
    "Discuss",
    "Discuss the trade-offs of multicloud, including complexity and skills."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "Where do you keep your photos: on your phone, on a computer, in one online service or in several? What made you choose that mix?",
  "activity": {
   "title": "Name that model",
   "materials": "Printed scenario cards (10 to 12), whiteboard or large paper, markers.",
   "steps": [
    "Give each group a set of scenario cards, such as 'A retailer keeps store systems on-site and runs analytics in Google Cloud.'",
    "Groups label each card with one or more models (on-premises, private, public, hybrid, multicloud) and underline the clue words.",
    "Each group draws a simple box-and-arrow diagram for one scenario showing where each workload runs and how they connect.",
    "Groups present their diagram, and the class checks whether the label matches the clues."
   ]
  },
  "discussion": [
   "What risks does a company take on when it becomes multicloud?",
   "Why might a hospital or bank prefer a hybrid model even if public cloud is cheaper?"
  ],
  "exit": [
   [
    "A company uses Google Cloud and another public cloud and has no data center. Which model?",
    "Multicloud."
   ],
   [
    "What two kinds of infrastructure does hybrid cloud combine?",
    "On-premises or private cloud infrastructure with a public cloud, connected to work together."
   ],
   [
    "Give one reason a company might keep a workload on-premises.",
    "Regulations or contracts, recent hardware investment, low-latency needs at a local site, or a gradual migration."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference card with each model, a picture and two clue words, and let them start with the clearest scenarios.",
   "Extend: Ask fast finishers to propose how GKE Enterprise or BigQuery Omni would help one of the hybrid or multicloud scenarios, and what challenge would remain."
  ]
 },
 {
  "t": "Cloud service models: IaaS, PaaS, SaaS and serverless, and what the customer manages in each",
  "objectives": [
   "Students will be able to describe IaaS, PaaS, SaaS and serverless in terms of what the provider and customer manage.",
   "Students will be able to map Google Cloud products such as Compute Engine, App Engine, Cloud Run and Google Workspace to service models.",
   "Students will be able to recommend a service model for a scenario based on control, effort and cost needs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Use the warm-up food question and sketch the four answers as columns on the board."
   ],
   [
    15,
    "Teach",
    "Draw the stack from facilities to data and shade what the provider manages for IaaS, PaaS, SaaS and serverless. Place Google Cloud products on the diagram."
   ],
   [
    15,
    "Activity",
    "Run the 'Who manages it' card sort with stack-layer cards, then a quick product placement round."
   ],
   [
    5,
    "Discuss",
    "Discuss why a company might use all four models at once."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Tonight you want pizza. You could cook from scratch, use a kit, order delivery or go to a pay-per-slice bar. What do you control and what do you give up in each case?",
  "activity": {
   "title": "Who manages it card sort",
   "materials": "Printed layer cards (facilities, hardware, network, virtualization, operating system, runtime, application, data and access), four columns on the whiteboard labeled IaaS, PaaS, SaaS, Serverless, two colors of sticky notes, product name cards.",
   "steps": [
    "Groups lay out the layer cards as a stack for each of the four models.",
    "For each layer, groups place a sticky note in one color for 'provider manages' or another for 'customer manages.'",
    "Groups then place product cards (Compute Engine, App Engine, Cloud Run, Cloud Run functions, BigQuery, Google Workspace) on the matching model.",
    "The teacher reveals a reference stack and groups correct their work, noting that data and access are always customer-managed."
   ]
  },
  "discussion": [
   "Why might a team choose IaaS for one application and serverless for another in the same company?",
   "What skills change for an IT team as it moves from IaaS toward serverless?"
  ],
  "exit": [
   [
    "Which service model is Compute Engine?",
    "IaaS."
   ],
   [
    "Name the three defining traits of serverless.",
    "No servers to provision or manage, automatic scaling often to zero, and paying for actual use."
   ],
   [
    "What does the customer always manage, whatever the model?",
    "Its data and who can access it (plus its own settings)."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed stack diagram for IaaS so students can see the pattern before completing the others, and allow product cards to be placed with a partner.",
   "Extend: Ask fast finishers to explain where GKE and Cloud SQL fit and why they do not fall neatly into a single category."
  ]
 },
 {
  "t": "The shared responsibility model and how it changes with the service model",
  "objectives": [
   "Students will be able to state which responsibilities always belong to Google and which always belong to the customer.",
   "Students will be able to explain how the responsibility line moves across IaaS, PaaS, serverless and SaaS.",
   "Students will be able to assign responsibility for a security incident scenario and describe Google Cloud's shared fate approach."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the apartment and list landlord versus tenant duties on the board."
   ],
   [
    15,
    "Teach",
    "Draw the layered stack with a movable line for each service model. Emphasize the fixed ends: infrastructure for Google; data, access and configuration for the customer. Introduce shared fate."
   ],
   [
    15,
    "Activity",
    "Run 'Whose fault is it' incident cards in pairs, then report back."
   ],
   [
    5,
    "Discuss",
    "Discuss why customers often misunderstand where the line sits."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You rent an apartment. Which security tasks belong to the landlord and which to you? What happens if each side assumes the other is handling the front door?",
  "activity": {
   "title": "Whose fault is it",
   "materials": "Printed incident cards (8 to 10), a projected stack diagram, sticky notes in two colors.",
   "steps": [
    "Pairs receive incident cards, such as 'Unpatched OS on a Compute Engine VM is exploited' or 'An employee shares a Workspace file publicly by mistake.'",
    "For each card, pairs decide whether the responsibility is Google's or the customer's, and which service model the scenario uses.",
    "Pairs place a colored sticky note for each card on the projected or whiteboard stack at the affected layer.",
    "The class reviews the board, and the teacher highlights that data, access and configuration incidents always land on the customer side."
   ]
  },
  "discussion": [
   "Why might customers assume the provider handles more security than it does?",
   "How should a security team's work change when an organization moves from IaaS to serverless?"
  ],
  "exit": [
   [
    "Who patches the guest operating system on a Compute Engine VM?",
    "The customer."
   ],
   [
    "Name two responsibilities that stay with the customer in every model.",
    "Its data, identities and access, and the configuration of services (any two)."
   ],
   [
    "What does Google Cloud mean by shared fate?",
    "Google actively helps customers secure their part with secure defaults, blueprints, guidance and tools."
   ]
  ],
  "differentiation": [
   "Support: Give students a pre-drawn stack with the always-Google and always-customer layers already shaded, so they only decide the middle layers for each model.",
   "Extend: Ask fast finishers to write a one-paragraph incident summary for the hook scenario that assigns responsibility and recommends two preventive controls."
  ]
 },
 {
  "t": "Google Cloud global infrastructure: regions, zones, edge points of presence and Google's private network",
  "objectives": [
   "Students will be able to define regions, zones, multi-regions and edge points of presence.",
   "Students will be able to choose zonal, regional or multi-regional designs to meet a stated reliability requirement.",
   "Students will be able to explain how region choice affects latency, data residency, price and carbon footprint."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a power cut and collect ideas."
   ],
   [
    15,
    "Teach",
    "Draw a world map sketch with two regions, three zones each, and PoP dots. Explain failure domains, service scopes and Google's private network, including the Premium and Standard tiers."
   ],
   [
    15,
    "Activity",
    "Run 'Design the footprint' in groups using requirement cards and the whiteboard map."
   ],
   [
    5,
    "Discuss",
    "Discuss the cost and complexity trade-offs of multi-region designs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If the power went out in this building, which services you use every day would stop, and which would keep working? Why?",
  "activity": {
   "title": "Design the footprint",
   "materials": "Whiteboard world map sketch or projected blank map, requirement cards, colored markers or sticky notes.",
   "steps": [
    "Give each group a requirement card, such as 'survive a zone failure, users in one country' or 'survive a regional disaster, users on three continents, data must stay in one economic area.'",
    "Groups mark regions and zones on the map with sticky notes and note where Cloud CDN or a global load balancer would help.",
    "Each group states which failures its design survives and which it does not.",
    "The class compares designs and discusses which were over- or under-engineered for their requirements."
   ]
  },
  "discussion": [
   "When is running in a single zone acceptable for a business?",
   "How should a leader balance reliability, cost and data residency when choosing regions?"
  ],
  "exit": [
   [
    "What is the minimum design to survive one zone failing?",
    "Run in at least two zones in the same region."
   ],
   [
    "What does a point of presence do?",
    "It is an edge location where user traffic enters Google's network, and where content can be cached close to users."
   ],
   [
    "Name three factors affected by region choice.",
    "Latency, data residency, price and carbon footprint (any three)."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram showing one region with three zones and two PoPs, and let students annotate it before tackling requirement cards.",
   "Extend: Ask fast finishers to compare Premium and Standard network tiers for a global video service and justify which they would choose."
  ]
 },
 {
  "t": "Network performance basics: bandwidth, latency and choosing locations close to users",
  "objectives": [
   "Students will be able to distinguish bandwidth, latency and throughput.",
   "Students will be able to diagnose whether a slowness scenario is caused by latency or bandwidth.",
   "Students will be able to recommend Google Cloud options such as closer regions, Cloud CDN, global load balancing, Cloud VPN, Cloud Interconnect or Transfer Appliance."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and take answers about lag versus slow downloads."
   ],
   [
    15,
    "Teach",
    "Use the highway analogy on the whiteboard. Show a live `ping` to a nearby and a distant site from a laptop, then explain fixes for each problem."
   ],
   [
    15,
    "Activity",
    "Run 'Latency or bandwidth' diagnosis in pairs with symptom cards."
   ],
   [
    5,
    "Discuss",
    "Discuss how to choose a region when users are spread worldwide."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your video call freezes, but a large file downloads fine. Another day the call is smooth, but the download crawls. What might be different?",
  "activity": {
   "title": "Latency or bandwidth diagnosis",
   "materials": "Printed symptom cards (10), whiteboard with two columns labeled Latency and Bandwidth, a projector or student laptops with a browser.",
   "steps": [
    "Pairs read symptom cards, such as 'Servers at 10 percent load, users abroad report slow clicks' or 'Nightly backup to the cloud never finishes.'",
    "Pairs place each card under Latency or Bandwidth and write one recommended fix on a sticky note.",
    "Optionally, pairs run a browser-based speed test and note both the latency and download figures to see them as separate numbers.",
    "The class reviews the board, and the teacher maps fixes to Google Cloud options."
   ]
  },
  "discussion": [
   "Why does a fast home connection not guarantee a fast experience with a distant server?",
   "When would a company pay for Cloud Interconnect instead of using Cloud VPN?"
  ],
  "exit": [
   [
    "Define latency in one sentence.",
    "The time it takes for data to travel between two points, usually measured in milliseconds."
   ],
   [
    "Users far from your region see slow pages but servers are idle. Name one fix.",
    "Deploy in a closer region, use Cloud CDN, or use a global load balancer to reach the nearest backend."
   ],
   [
    "Which connection type offers private, high-bandwidth, predictable connectivity to Google Cloud?",
    "Cloud Interconnect."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-row comparison chart (pipe width versus pipe length) and let students work through the first three cards with the teacher.",
   "Extend: Ask fast finishers to design network connectivity for a company with a large one-time migration and steady ongoing hybrid traffic, justifying each choice."
  ]
 },
 {
  "t": "Open source, open standards and avoiding vendor lock-in",
  "objectives": [
   "Students will be able to define vendor lock-in, open source, open standards and portability.",
   "Students will be able to name Google-originated open source projects and Google Cloud managed open source services.",
   "Students will be able to evaluate a design for portability and recommend open technologies that reduce lock-in."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about switching phones and list what makes switching hard."
   ],
   [
    15,
    "Teach",
    "Define lock-in and its sources, then show how open source, open standards, containers and Kubernetes reduce it. Map open source projects to Google Cloud managed services on the board."
   ],
   [
    15,
    "Activity",
    "Run 'Exit plan review': groups assess a fictional architecture and rate each component's portability."
   ],
   [
    5,
    "Discuss",
    "Discuss when accepting some lock-in is a sensible trade-off."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "What would make it hard for you to switch from one phone brand to another? Which of those barriers are about technology and which are about habits or contracts?",
  "activity": {
   "title": "Exit plan review",
   "materials": "Printed one-page architecture description of a fictional company (components such as containers on GKE, Cloud SQL for PostgreSQL, a proprietary data format, a provider-specific AI feature, CSV exports), red, yellow and green sticky notes, whiteboard.",
   "steps": [
    "Groups read the architecture and list every component on the whiteboard.",
    "For each component, groups place a green, yellow or red sticky note for easy, moderate or hard to move, with one sentence of reasoning.",
    "Groups propose one change that would turn a red component yellow or green, such as switching to an open format.",
    "Groups share their exit plan, and the class discusses whether each proposed change would cost agility or value."
   ]
  },
  "discussion": [
   "Is some lock-in acceptable? When would you choose a provider-specific service anyway?",
   "Why might a regulator care whether a company can leave its cloud provider?"
  ],
  "exit": [
   [
    "What is vendor lock-in?",
    "Dependence on one provider that makes switching costly or difficult."
   ],
   [
    "Name one open source project that began at Google.",
    "Kubernetes (or TensorFlow, or the model behind Apache Beam)."
   ],
   [
    "Name a Google Cloud managed service based on open source software.",
    "Cloud SQL (MySQL, PostgreSQL), Dataproc (Spark, Hadoop), GKE (Kubernetes) or Memorystore (Redis)."
   ]
  ],
  "differentiation": [
   "Support: Provide a matching sheet pairing open source projects with their Google Cloud managed services, and let students complete it before the architecture review.",
   "Extend: Ask fast finishers to write a half-page exit plan for one critical system, including data export, data transfer time and skills needed."
  ]
 },
 {
  "t": "Leading digital transformation: culture, skills and change management in a cloud adoption",
  "objectives": [
   "Students will be able to explain why culture, skills and team structure determine the success of a cloud adoption.",
   "Students will be able to describe the role of a cloud center of excellence and blameless postmortems.",
   "Students will be able to recommend people and process changes for a stalled cloud transformation scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a new tool that nobody used and collect reasons."
   ],
   [
    15,
    "Teach",
    "Contrast siloed IT with cross-functional teams on the whiteboard, introduce DevOps, blameless postmortems, the cloud center of excellence and the four themes of the Google Cloud Adoption Framework."
   ],
   [
    15,
    "Activity",
    "Run the 'Stalled transformation' role-play in groups of four."
   ],
   [
    5,
    "Discuss",
    "Discuss how leaders should handle resistance to change."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of a time a new tool or system arrived at school or work and people kept using the old way. Why did that happen?",
  "activity": {
   "title": "Stalled transformation role-play",
   "materials": "Printed role cards (chief executive, operations manager, developer, security officer) and a printed scenario sheet describing a company with modern cloud tools but slow releases, whiteboard.",
   "steps": [
    "Groups of four each take a role card that lists that person's concerns and goals.",
    "Groups hold a ten-minute meeting in character to agree on three changes that would speed up results.",
    "Each group writes its three changes on the whiteboard and labels each as culture, skills, structure or process.",
    "The class compares lists and the teacher highlights common answers such as training, cross-functional teams, automation and a cloud center of excellence."
   ]
  },
  "discussion": [
   "How can a leader make it safe for teams to experiment and fail?",
   "What should a cloud center of excellence avoid doing so it does not become a new bottleneck?"
  ],
  "exit": [
   [
    "What does a cloud center of excellence do?",
    "Sets standards and best practices, builds shared foundations and helps other teams adopt the cloud."
   ],
   [
    "Why do blameless postmortems support transformation?",
    "People share failures openly, so systems improve and experimentation is encouraged."
   ],
   [
    "A company has modern cloud tools but slow releases. What kind of fix is most likely needed?",
    "A people or process fix: training, team structure, automation of approvals or culture change."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a role card with suggested phrases and a short list of possible changes to choose from during the role-play.",
   "Extend: Ask fast finishers to place the fictional company on the tactical, strategic or transformational phase for each Adoption Framework theme and justify their assessment."
  ]
 },
 {
  "t": "Why data matters: using data to drive decisions, products and innovation",
  "objectives": [
   "Students will be able to explain how data creates value through decisions, customer experiences, operations and new products.",
   "Students will be able to identify common obstacles to using data, including silos, quality and timing.",
   "Students will be able to describe the stages of the data journey and how cloud services support each one."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about apps that seem to know what you want and collect examples."
   ],
   [
    15,
    "Teach",
    "Present the four ways data creates value, then draw the data journey (ingest, store, process, analyze, machine learning) across the whiteboard and discuss silos, quality, timing and data types."
   ],
   [
    15,
    "Activity",
    "Run 'From data to decision' in groups using a fictional business data inventory."
   ],
   [
    5,
    "Discuss",
    "Discuss the balance between governance and accessibility."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Name an app or store that seems to know what you want. What data do you think it uses, and where might that data come from?",
  "activity": {
   "title": "From data to decision",
   "materials": "Printed data inventory sheets for a fictional grocery chain (tills, loyalty app, warehouse, weather feed, supplier spreadsheets, customer emails), sticky notes, whiteboard with the data journey drawn across it.",
   "steps": [
    "Groups read the inventory and label each source as structured, semi-structured or unstructured.",
    "Groups choose one business question, such as 'Which stores run out of seasonal items?', and list which sources must be combined to answer it.",
    "Groups place sticky notes on the data journey showing where each source enters and where the main bottleneck is today.",
    "Each group presents its question, the data needed and the action leaders could take with the answer."
   ]
  },
  "discussion": [
   "Why might employees not trust or use data even when it is available?",
   "What risks come with combining data from many sources, and how can governance help?"
  ],
  "exit": [
   [
    "Give three ways data creates business value.",
    "Better decisions, better customer experiences, more efficient operations, new products or business models (any three)."
   ],
   [
    "What is a data silo and why does it reduce value?",
    "Data held by one team or system that others cannot easily access; it prevents a complete picture and leads to missed or inconsistent insights."
   ],
   [
    "Name two stages of the data journey.",
    "Any two of ingest, store, process, analyze and visualize, and use in machine learning."
   ]
  ],
  "differentiation": [
   "Support: Provide pre-labeled examples of structured, semi-structured and unstructured data, and let struggling students start with a business question chosen by the teacher.",
   "Extend: Ask fast finishers to sketch which Google Cloud services might support each stage of the data journey for their chosen question, and identify one governance rule the chain would need."
  ]
 },
 {
  "t": "Structured, semi-structured and unstructured data",
  "objectives": [
   "Students will be able to define structured, semi-structured and unstructured data and give two examples of each.",
   "Students will be able to classify a described data source into the correct type and justify the choice.",
   "Students will be able to match each data type to a suitable Google Cloud storage service such as Cloud SQL, Firestore, BigQuery or Cloud Storage.",
   "Students will be able to explain how AI APIs turn unstructured data into structured, queryable results."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show three items on the projector: a spreadsheet row, a short JSON snippet and a photo. Ask students which one a computer could search most easily and why."
   ],
   [
    15,
    "Teach",
    "Define the three types with the schema idea at the center. Walk through where each type usually lives in Google Cloud and show how Vision, Speech-to-Text and Natural Language convert unstructured content into structured fields."
   ],
   [
    15,
    "Activity",
    "Run the 'Data shape sort' card activity in groups of three, then have groups place cards on the whiteboard."
   ],
   [
    5,
    "Discuss",
    "Discuss borderline cases such as log files and email, and why real projects combine all three types."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Think of all the data your phone holds about you today. Which of it would fit neatly in a spreadsheet, and which would not?",
  "activity": {
   "title": "Data shape sort",
   "materials": "About 15 printed cards describing data sources, whiteboard split into three columns, markers, sticky notes.",
   "steps": [
    "Prepare cards such as 'Bank transaction table', 'Mobile app events in JSON', 'Recorded support calls', 'Scanned invoices', 'Product catalog in XML' and 'Inventory counts per warehouse'.",
    "Groups of three sort each card into structured, semi-structured or unstructured and write on a sticky note the Google Cloud service where it would usually be stored.",
    "For each unstructured card, groups name an AI API that could extract structured facts from it.",
    "Groups post their cards on the whiteboard columns, and the class challenges any placement it disagrees with while the teacher resolves borderline cases."
   ]
  },
  "discussion": [
   "Why do you think unstructured data is often called the biggest untapped opportunity for organizations?",
   "Is email structured, semi-structured or unstructured? Can it be more than one at once?"
  ],
  "exit": [
   [
    "Give one example each of structured, semi-structured and unstructured data.",
    "For example: a customer table; a JSON event log; a video file."
   ],
   [
    "Where would you usually store thousands of product photos in Google Cloud?",
    "In Cloud Storage, as objects in a bucket."
   ],
   [
    "How can recorded support calls become data you can query in BigQuery?",
    "Transcribe them with Speech-to-Text, optionally analyze sentiment with the Natural Language API, and store the results as structured fields."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference sheet with one clear example of each type and a yes/no question flow (fixed columns? labels? neither?) to use while sorting.",
   "Extend: Ask fast finishers to design a data layout for a support center that uses all three types, naming the storage service for each and how results reach a BigQuery dashboard."
  ]
 },
 {
  "t": "Databases, data warehouses and data lakes: what each is for",
  "objectives": [
   "Students will be able to explain the purpose of a database, a data warehouse and a data lake.",
   "Students will be able to compare OLTP and OLAP workloads and schema on write with schema on read.",
   "Students will be able to choose the right store and Google Cloud service for a business scenario.",
   "Students will be able to describe how a lakehouse combines lake and warehouse ideas."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students where a supermarket records each sale at the checkout and where head office would look to compare sales across all stores for a year. Collect answers on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Present the three stores with the restaurant analogy. Contrast OLTP and OLAP, then schema on write and schema on read. Map each store to Cloud SQL or Spanner, BigQuery and Cloud Storage."
   ],
   [
    18,
    "Activity",
    "Run the 'Which store?' scenario relay in teams, then review answers together."
   ],
   [
    5,
    "Discuss",
    "Discuss why lakes can turn into swamps and how the lakehouse idea responds."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Your favorite shopping app records every purchase instantly. Where do you think the company goes to figure out what sold best last holiday season, and is it the same place?",
  "activity": {
   "title": "Which store? scenario relay",
   "materials": "Printed scenario cards (about 12), whiteboard with three columns labeled Database, Warehouse and Lake, markers.",
   "steps": [
    "Prepare scenario cards such as 'Save a customer's new shipping address', 'Compare quarterly revenue by region for five years', 'Keep raw drone images for a future ML project' and 'Check seat availability during booking'.",
    "Split the class into teams. One member at a time takes a card, discusses it with the team for 30 seconds and places it in a column, writing the Google Cloud service beside it.",
    "After all cards are placed, each team explains one placement using the words OLTP, OLAP or schema on read.",
    "The teacher reviews any disputed cards and highlights cases where data flows from one store to another."
   ]
  },
  "discussion": [
   "What happens to a data lake when nobody records what is in it or who owns it?",
   "Why might a company copy the same data into both a lake and a warehouse?"
  ],
  "exit": [
   [
    "What kind of workload is a database optimized for?",
    "OLTP: many small, fast reads and writes of current data that run an application."
   ],
   [
    "A team wants to keep raw sensor files, images and logs cheaply for future ML. Which store and service?",
    "A data lake on Cloud Storage."
   ],
   [
    "Why should heavy reporting not run on an application's database?",
    "It competes with the application's transactions and slows it down; a warehouse such as BigQuery is built for analytical queries."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-row comparison table (purpose, data shape, example question, Google Cloud service) that students can consult during the relay.",
   "Extend: Ask fast finishers to sketch a data flow for an online store showing how an order moves from database to lake to warehouse, labeling each step with a service."
  ]
 },
 {
  "t": "Cloud Storage and its storage classes: Standard, Nearline, Coldline and Archive",
  "objectives": [
   "Students will be able to describe Cloud Storage buckets, objects and location types.",
   "Students will be able to state the intended access frequency and minimum storage duration of each storage class.",
   "Students will be able to recommend a storage class and lifecycle rule for a given data set.",
   "Students will be able to explain why a colder class can cost more for frequently read data."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to list three things they keep at home in very different places (wallet, winter coat, old tax papers) and why. Link the answer to access frequency."
   ],
   [
    15,
    "Teach",
    "Introduce buckets, objects and location types. Present the four classes as a table of access pattern and minimum duration, stressing that Archive is fast but costly to read. Show lifecycle rules and Autoclass."
   ],
   [
    15,
    "Activity",
    "Run the 'Storage class advisor' pair exercise, then compare recommendations."
   ],
   [
    5,
    "Discuss",
    "Discuss the law firm scenario from the lesson and what went wrong."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If a storage unit were cheaper per month but charged you every time you opened it, what would you keep there and what would you never keep there?",
  "activity": {
   "title": "Storage class advisor",
   "materials": "Printed client briefs (8 to 10), a class reference table on the projector, whiteboard, markers.",
   "steps": [
    "Prepare client briefs such as 'Product images on a busy website', 'Monthly database backups kept for one year', 'Quarterly disaster recovery copies', 'Medical records kept ten years and rarely read'.",
    "In pairs, students choose a starting storage class for each brief and write a lifecycle rule in plain words (action plus condition).",
    "Each pair flags one brief where a wrong choice would increase cost and explains why, using retrieval fees or minimum duration.",
    "Pairs share answers on the whiteboard, and the class agrees on the best recommendation for each brief, noting where Autoclass would also fit."
   ]
  },
  "discussion": [
   "When would you choose Autoclass instead of writing lifecycle rules yourself?",
   "Why might an organization choose a multi-region bucket even though it can cost more?"
  ],
  "exit": [
   [
    "Which class fits data accessed about once a month, and what is its minimum duration?",
    "Nearline, with a 30-day minimum."
   ],
   [
    "Is Archive data slower to read than Standard data in Cloud Storage?",
    "No. Both return data in milliseconds; Archive costs more per read and has a 365-day minimum."
   ],
   [
    "Write a lifecycle rule in plain words for logs that should move to Coldline after 90 days.",
    "Action: set storage class to Coldline. Condition: object age greater than 90 days."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a card with the four classes, their access patterns and minimum durations, and let them work through two briefs with the teacher before pairing.",
   "Extend: Ask fast finishers to design a full lifecycle for a seven-year retention requirement, including versioning or a retention policy, and justify each transition."
  ]
 },
 {
  "t": "Relational databases on Google Cloud: Cloud SQL, AlloyDB and Spanner",
  "objectives": [
   "Students will be able to explain what a relational database and a transaction are.",
   "Students will be able to compare Cloud SQL, AlloyDB and Spanner by engine, scaling model and typical use.",
   "Students will be able to select the right relational service for a business scenario and justify it.",
   "Students will be able to describe the benefit of a managed database service."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: if you transfer money to a friend and the app crashes halfway, what should happen? Use answers to introduce transactions."
   ],
   [
    15,
    "Teach",
    "Explain managed versus self-managed. Present Cloud SQL, AlloyDB and Spanner with the vehicle analogy, emphasizing vertical versus horizontal scaling and strong consistency."
   ],
   [
    15,
    "Activity",
    "Run the 'Database consultant' role-play in groups of three."
   ],
   [
    5,
    "Discuss",
    "Discuss why Spanner is not the default answer and when Cloud SQL is enough."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Two people on opposite sides of the world click 'buy' on the last concert ticket at the same second. What should the system do, and what could go wrong?",
  "activity": {
   "title": "Database consultant role-play",
   "materials": "Printed client cards (6 to 8), a one-page service comparison sheet, whiteboard, markers.",
   "steps": [
    "Prepare client cards such as 'Local clinic with an existing SQL Server app', 'Global game with millions of players and a shared leaderboard', 'Retailer on PostgreSQL that needs live reporting without slowing orders'.",
    "In groups of three, one student plays the client and reads the card, one plays the consultant and asks two clarifying questions, and one records the recommendation.",
    "The consultant recommends Cloud SQL, AlloyDB or Spanner and gives one reason tied to engine, scale or consistency.",
    "Rotate roles for each card. Groups post one recommendation on the whiteboard, and the class discusses any disagreements."
   ]
  },
  "discussion": [
   "What does a team gain, and what does it still own, when it moves to a managed database?",
   "Why is horizontal scaling hard for relational databases, and how does Spanner change that?"
  ],
  "exit": [
   [
    "Name the three engines Cloud SQL supports.",
    "MySQL, PostgreSQL and SQL Server."
   ],
   [
    "Which service fits a PostgreSQL app needing higher performance for both transactions and analytics?",
    "AlloyDB for PostgreSQL."
   ],
   [
    "A global inventory system must never show different stock levels in different regions. Which service and why?",
    "Spanner, because it scales horizontally across regions while keeping strong consistency."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a decision flowchart (existing engine? global or horizontal scale? PostgreSQL with heavy performance needs?) to use during the role-play.",
   "Extend: Ask fast finishers to plan a two-stage journey for a growing company, starting on Cloud SQL and later moving to Spanner, naming the signals that would trigger the move and the migration tool."
  ]
 },
 {
  "t": "Non-relational databases on Google Cloud: Firestore and Bigtable",
  "objectives": [
   "Students will be able to explain what NoSQL means and name two NoSQL data models.",
   "Students will be able to compare Firestore and Bigtable by data model, scale and typical use.",
   "Students will be able to choose between Firestore, Bigtable, a relational database and BigQuery for a scenario.",
   "Students will be able to explain why the row key matters in Bigtable."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students what happens in their favorite messaging app when they send a message with no signal, then reconnect. Link this to offline sync."
   ],
   [
    15,
    "Teach",
    "Introduce NoSQL models. Present Firestore (documents, collections, real-time, offline) and Bigtable (row keys, column families, throughput), using the index card and logbook analogy."
   ],
   [
    15,
    "Activity",
    "Run the 'Two engineers' scenario sort and row key design in pairs."
   ],
   [
    5,
    "Discuss",
    "Discuss why one product may use several databases at once."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Your notes app keeps working on a plane and syncs when you land. How do you think it does that, and why would a database need to support it?",
  "activity": {
   "title": "Two engineers scenario sort",
   "materials": "Printed scenario cards (about 10), whiteboard with four columns (Firestore, Bigtable, Relational, BigQuery), sticky notes, markers.",
   "steps": [
    "Prepare cards such as 'Chat app messages that appear instantly on all devices', 'Stock price ticks for every trade', 'Quarterly revenue report across regions', 'Bank transfers between accounts'.",
    "In pairs, students place each card in a column and write a one-line reason on a sticky note.",
    "For two Bigtable cards, pairs propose a row key, such as device ID plus timestamp, and explain how it supports the main lookup.",
    "Pairs present one placement and one row key to the class, and the teacher corrects misconceptions such as using Bigtable for SQL reports."
   ]
  },
  "discussion": [
   "What do NoSQL databases give up compared with relational databases, and when is that trade worth it?",
   "Why might a poor row key design cause problems in Bigtable?"
  ],
  "exit": [
   [
    "Which database would you choose for a mobile app that must work offline and sync later?",
    "Firestore."
   ],
   [
    "Which database fits trillions of time-series readings with low-latency reads by key?",
    "Bigtable."
   ],
   [
    "Where should SQL analytics across large data sets run instead of Firestore or Bigtable?",
    "BigQuery."
   ]
  ],
  "differentiation": [
   "Support: Provide a keyword sheet (phone, real-time, offline = Firestore; sensors, time series, billions, HBase = Bigtable) and let students sort the first three cards with the teacher.",
   "Extend: Ask fast finishers to design the full data layout for a ride-sharing app, choosing Firestore, Bigtable, a relational database and BigQuery for different parts and explaining each choice."
  ]
 },
 {
  "t": "BigQuery: serverless data warehouse and analytics",
  "objectives": [
   "Students will be able to describe BigQuery as a serverless data warehouse and explain the separation of storage and compute.",
   "Students will be able to explain how columnar storage and partitioning affect query cost.",
   "Students will be able to list BigQuery capabilities such as streaming, external tables, BigQuery ML and BI connections.",
   "Students will be able to distinguish when BigQuery is the right choice versus an operational database."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students how long it would take to count every red car in a city's traffic photos by hand, then how they would split the job among 1,000 helpers. Link to on-demand compute."
   ],
   [
    15,
    "Teach",
    "Explain serverless, separation of storage and compute, columnar storage and pricing. Show a slide of a sample query estimate and how it changes with fewer columns and a partition filter. Cover BigQuery ML, streaming and BI connections."
   ],
   [
    15,
    "Activity",
    "Run the 'Bytes detective' paper exercise or, if laptops are available, a guided sandbox query on a public dataset."
   ],
   [
    5,
    "Discuss",
    "Discuss why BigQuery is not used for application transactions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If you paid for a search by the number of pages read, how would you change the way you ask questions?",
  "activity": {
   "title": "Bytes detective",
   "materials": "Printed sheet showing a table with 10 columns and column sizes, a date-partition diagram, and four sample queries; optional student laptops with a browser for the BigQuery sandbox.",
   "steps": [
    "Give pairs the printed table: column names with an approximate size per column for one year of data, partitioned by month.",
    "Pairs estimate the relative bytes each of four queries would process, from a full `SELECT *` to a query selecting two columns for one month.",
    "Pairs rank the queries from most to least expensive under on-demand pricing and explain why, using the words columnar and partition.",
    "If laptops are available, pairs open the sandbox, select a public dataset, and watch the bytes-processed estimate change as they edit a query, without running anything expensive."
   ]
  },
  "discussion": [
   "Why is separating storage and compute good for a company whose analysis needs spike at month-end?",
   "What are the benefits of training ML models inside BigQuery rather than exporting the data?"
  ],
  "exit": [
   [
    "What does serverless mean for a BigQuery user?",
    "There are no servers, clusters or indexes to manage; Google allocates capacity automatically."
   ],
   [
    "Name two ways to reduce on-demand query cost.",
    "Select only the needed columns, and filter on partitioned columns so fewer bytes are processed."
   ],
   [
    "Should an online store run its checkout transactions on BigQuery? Why?",
    "No. BigQuery is built for analytics (OLAP); checkout needs an operational database such as Cloud SQL or Spanner."
   ]
  ],
  "differentiation": [
   "Support: Pair struggling students with a worked example of one query estimate before they attempt the ranking, and give them a glossary of serverless, columnar and partition.",
   "Extend: Ask fast finishers to sketch an end-to-end design where app data flows from Cloud SQL into BigQuery, a churn model is built with BigQuery ML, and results appear in Looker Studio."
  ]
 },
 {
  "t": "Streaming and processing data: Pub/Sub, Dataflow and Dataproc",
  "objectives": [
   "Students will be able to distinguish batch processing from streaming and give a business reason for each.",
   "Students will be able to explain how Pub/Sub decouples publishers from subscribers.",
   "Students will be able to compare Dataflow and Dataproc and choose between them for a scenario.",
   "Students will be able to describe the Pub/Sub to Dataflow to BigQuery streaming pattern."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: what is the difference between getting your bank statement once a month and getting a phone alert the moment your card is used? Use it to introduce batch and streaming."
   ],
   [
    15,
    "Teach",
    "Present Pub/Sub topics and subscriptions, Dataflow pipelines with Apache Beam, and Dataproc short-lived clusters. Draw the Pub/Sub to Dataflow to BigQuery pattern on the whiteboard."
   ],
   [
    15,
    "Activity",
    "Run the 'Human pipeline' role-play, then the scenario matching round."
   ],
   [
    5,
    "Discuss",
    "Discuss when streaming is worth the extra effort and when batch is enough."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Think of a situation where knowing something 24 hours late is useless. What would a business need to know within seconds?",
  "activity": {
   "title": "Human pipeline role-play",
   "materials": "Sticky notes, markers, three labeled desks or tables (Topic, Pipeline, Warehouse), printed scenario cards for the second round.",
   "steps": [
    "Assign roles: several 'publishers' write ride-request events (neighborhood and time) on sticky notes and drop them at the Topic desk without waiting; two 'subscribers' collect notes from the Topic desk at their own pace.",
    "One subscriber acts as the Dataflow pipeline, tallying requests per neighborhood every minute and posting totals to the Warehouse desk (the BigQuery board on the whiteboard).",
    "Pause one subscriber for a minute to show that notes pile up at the Topic desk rather than being lost, illustrating decoupling.",
    "Finish with scenario cards in pairs, matching each to Pub/Sub, Dataflow or Dataproc, such as 'existing Spark jobs', 'serverless real-time aggregation' and 'collect app events from millions of phones'."
   ]
  },
  "discussion": [
   "What would happen in the role-play if publishers had to hand each note directly to a busy subscriber?",
   "Why might a company keep some batch jobs even after building streaming pipelines?"
  ],
  "exit": [
   [
    "What is the role of Pub/Sub in a streaming architecture?",
    "It ingests and delivers messages asynchronously, decoupling publishers from subscribers and holding messages if a subscriber is slow."
   ],
   [
    "Which service runs serverless streaming and batch pipelines written with Apache Beam?",
    "Dataflow."
   ],
   [
    "When is Dataproc the better choice than Dataflow?",
    "When the organization has existing Spark or Hadoop jobs to move with minimal changes."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-box diagram labeled 'carry', 'transform', 'run existing Spark/Hadoop' to fill in with service names before the scenario round.",
   "Extend: Ask fast finishers to design a pipeline for a retailer that needs both real-time stock alerts and a nightly sales report, naming every service and explaining which parts are streaming and which are batch."
  ]
 },
 {
  "t": "Business intelligence with Looker and Looker Studio",
  "objectives": [
   "Students will be able to define business intelligence and explain its role at the end of a data pipeline.",
   "Students will be able to explain what a semantic layer is and why LookML produces consistent metrics.",
   "Students will be able to choose between Looker and Looker Studio for a given audience and requirement.",
   "Students will be able to describe how BI tools connect to BigQuery and other sources."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask each student to write their own definition of 'an active customer' for a streaming service on a sticky note. Read several aloud to show how definitions differ."
   ],
   [
    15,
    "Teach",
    "Define BI. Explain the semantic layer using the recipe book analogy and show a short, simple LookML-style definition on a slide. Contrast Looker and Looker Studio by audience, governance and cost."
   ],
   [
    15,
    "Activity",
    "Run the 'Same data, different answers' exercise in groups."
   ],
   [
    5,
    "Discuss",
    "Discuss how natural language AI assistants depend on good metric definitions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Two teams look at the same sales data and report different growth numbers. List as many reasons as you can for how that could happen.",
  "activity": {
   "title": "Same data, different answers",
   "materials": "A printed table of 20 sample orders with columns for date, amount, refund flag and customer type; calculators or student laptops; whiteboard.",
   "steps": [
    "Give each group the same printed order table but a different secret instruction card, such as 'include refunds', 'exclude refunds', 'only count business customers'.",
    "Each group calculates 'total revenue for March' and writes its number on the whiteboard without explaining its rules.",
    "The class compares the different results and identifies the hidden rule behind each one.",
    "Together, the class writes one agreed definition of revenue, as a plain-language 'semantic layer' entry, and the teacher links this to LookML and to when Looker Studio would still be the right quick tool."
   ]
  },
  "discussion": [
   "Why might a company use both Looker and Looker Studio instead of choosing one?",
   "If an AI assistant answers 'What was revenue last quarter?', what must be true for that answer to be trustworthy?"
  ],
  "exit": [
   [
    "What is LookML used for?",
    "Defining business metrics, dimensions and relationships once in Looker's semantic layer so all reports use them consistently."
   ],
   [
    "A marketing analyst wants a free dashboard from Google Sheets today. Which tool?",
    "Looker Studio."
   ],
   [
    "Give two reasons an enterprise would choose Looker.",
    "Consistent governed metrics through a semantic layer, controlled access, direct queries to BigQuery, scheduled reports or embedded analytics (any two)."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column comparison card for Looker and Looker Studio and walk struggling groups through the first revenue calculation together.",
   "Extend: Ask fast finishers to write plain-language definitions for three more metrics (active customer, churn rate, average order value) and identify which teams would most likely disagree about each."
  ]
 },
 {
  "t": "Moving data to Google Cloud: Database Migration Service, BigQuery Data Transfer Service, Storage Transfer Service and Transfer Appliance",
  "objectives": [
   "Students will be able to state the purpose, source and destination of each of the four transfer services.",
   "Students will be able to explain how continuous replication minimizes downtime during a database migration.",
   "Students will be able to choose the right transfer service from clues about data type, size, bandwidth and schedule.",
   "Students will be able to combine several transfer services into a simple migration plan."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students how they would send a friend 5 photos, 5,000 photos, and every photo they have ever taken. Draw out the idea that volume and bandwidth change the method."
   ],
   [
    15,
    "Teach",
    "Present the four services with the house-moving analogy. Explain continuous replication and cutover step by step on the whiteboard, and show why transfer time grows with volume and shrinks with bandwidth."
   ],
   [
    15,
    "Activity",
    "Run the 'Migration planner' group exercise using a fictional company brief."
   ],
   [
    5,
    "Discuss",
    "Discuss what risks remain at cutover and how teams test before switching."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "You need to move everything from your old phone to a new one. What would you copy over the network, and when would plugging in a cable or drive be faster?",
  "activity": {
   "title": "Migration planner",
   "materials": "A printed one-page company brief listing six data sources with sizes, locations, network speed and downtime limits; sticky notes in four colors (one per service); whiteboard.",
   "steps": [
    "Give each group the brief for a fictional company, including items such as 'MySQL order database, max 10 minutes downtime', '300 TB archive, slow link', 'daily YouTube channel reports', 'files in another cloud copied nightly'.",
    "Groups assign one service to each data source using the colored sticky notes and write one reason per choice.",
    "Groups sketch a timeline on the whiteboard showing which transfers start first and where the database cutover happens.",
    "Each group presents its plan in two minutes, and the class identifies any source assigned to the wrong service."
   ]
  },
  "discussion": [
   "Why might shipping a physical device be faster than a high-speed network for very large data?",
   "What should a team check before performing the cutover in a database migration?"
  ],
  "exit": [
   [
    "Which service loads Google Ads data into BigQuery every day automatically?",
    "BigQuery Data Transfer Service."
   ],
   [
    "How does Database Migration Service keep downtime short?",
    "It copies existing data and then continuously replicates changes while the source stays in use, so only a brief cutover is needed."
   ],
   [
    "Which service moves files from on-premises file systems into Cloud Storage over the network?",
    "Storage Transfer Service, using agents installed on-premises."
   ]
  ],
  "differentiation": [
   "Support: Provide a clue-to-service table (database plus minimal downtime, scheduled into BigQuery, files into Cloud Storage, huge data plus slow link) for students to use while planning.",
   "Extend: Ask fast finishers to estimate roughly whether a given data volume would take days or months over a stated connection, and explain at what point they would switch to Transfer Appliance."
  ]
 },
 {
  "t": "Data governance: quality, security, access control and cataloging",
  "objectives": [
   "Students will be able to define data governance and name its main parts.",
   "Students will be able to explain how IAM, BigQuery column-level and row-level security and least privilege control access to data.",
   "Students will be able to describe the role of a data catalog, data lineage and Sensitive Data Protection.",
   "Students will be able to recommend governance measures for a scenario involving sensitive data."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: you find three files named 'final', 'final_v2' and 'final_REAL' on a shared drive. Which do you trust, and how would you decide? Collect answers."
   ],
   [
    15,
    "Teach",
    "Present the parts of governance with the library analogy. Explain IAM levels, column-level and row-level security and least privilege. Introduce Sensitive Data Protection, Dataplex and lineage."
   ],
   [
    15,
    "Activity",
    "Run the 'Auditor's visit' role-play in groups."
   ],
   [
    5,
    "Discuss",
    "Discuss how governance can enable data use instead of blocking it."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If you could see every piece of data your school or employer holds about you, which pieces would you want protected most, and who do you think should be allowed to see them?",
  "activity": {
   "title": "The auditor's visit",
   "materials": "Printed auditor question cards (6), a printed one-page 'data estate' sheet describing a fictional company's datasets, copies and access, whiteboard, markers.",
   "steps": [
    "Give each group the data estate sheet, which deliberately includes problems such as duplicate customer tables, an exported spreadsheet, broad access to a salary column and no recorded owners.",
    "One student plays the auditor and asks questions from the cards, such as 'Where are credit card numbers stored?' and 'Who can see salaries?'; the others try to answer from the sheet.",
    "Groups list every question they could not answer and match each gap to a governance capability: catalog, lineage, column-level security, Sensitive Data Protection, ownership or lifecycle rules.",
    "Each group presents its top three fixes on the whiteboard, and the class ranks them by impact."
   ]
  },
  "discussion": [
   "What happens when governance rules are so strict that people cannot get the data they need?",
   "Who in an organization, besides IT, should be responsible for data governance?"
  ],
  "exit": [
   [
    "What is data lineage?",
    "A record of where data came from and how it was transformed."
   ],
   [
    "Which BigQuery feature lets only HR see the salary column?",
    "Column-level security using policy tags."
   ],
   [
    "Which Google Cloud capability discovers and masks sensitive data such as card numbers?",
    "Sensitive Data Protection."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a matching card that pairs each governance part with a one-line library example before the role-play.",
   "Extend: Ask fast finishers to write a short governance policy for one dataset, naming the owner, sensitivity level, who gets access, retention period and how quality will be checked."
  ]
 },
 {
  "t": "Artificial intelligence, machine learning and generative AI: definitions and differences",
  "objectives": [
   "Students will be able to define AI, ML, deep learning and generative AI and explain how they are nested.",
   "Students will be able to distinguish supervised, unsupervised and reinforcement learning with an example of each.",
   "Students will be able to classify a business use case as rules-based, predictive ML or generative AI.",
   "Students will be able to explain what a foundation model and a prompt are."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to name three things they use every day that they believe use AI. List them on the whiteboard to revisit later."
   ],
   [
    15,
    "Teach",
    "Draw nested circles for AI, ML, deep learning and generative AI. Explain rules versus learning from data, the three kinds of ML, and foundation models and prompts. Contrast predictive output with generated content."
   ],
   [
    15,
    "Activity",
    "Run the 'Rules, predict or create?' card sort in small groups."
   ],
   [
    5,
    "Discuss",
    "Revisit the warm-up list and reclassify each item using the new vocabulary."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Your email app moves some messages to spam and also suggests replies. Do you think those two features work the same way? Why or why not?",
  "activity": {
   "title": "Rules, predict or create? card sort",
   "materials": "About 15 printed use-case cards, a whiteboard with three columns (Rules-based, Predictive ML, Generative AI), sticky notes, markers.",
   "steps": [
    "Prepare cards such as 'Apply a 10 percent discount to orders over a set amount', 'Predict delivery delays from weather and traffic history', 'Draft a reply to a customer complaint', 'Group shoppers into segments by behavior', 'Generate an image for an ad from a description'.",
    "Groups of three sort each card into a column and, for predictive ML cards, label the kind of learning (supervised or unsupervised) on a sticky note.",
    "For each generative AI card, groups write an example prompt someone might use.",
    "Groups post cards on the whiteboard; the class challenges placements, and the teacher highlights cards that combine predictive ML and generative AI."
   ]
  },
  "discussion": [
   "Why might a business choose a simple rule instead of machine learning, even if ML is available?",
   "What risks come with generative AI output that do not apply to a fixed rule?"
  ],
  "exit": [
   [
    "Put these in order from broadest to narrowest: ML, generative AI, AI, deep learning.",
    "AI, ML, deep learning, generative AI."
   ],
   [
    "A model predicts next month's sales from historical data. Which kind of ML is it?",
    "Supervised learning (regression), a form of predictive ML."
   ],
   [
    "What is a prompt?",
    "An instruction or question in natural language given to a generative AI model."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students the nested-circle diagram with one example written in each ring, and let them sort five cards with the teacher before working in groups.",
   "Extend: Ask fast finishers to design one business solution that combines predictive ML and generative AI, describing what each part produces and what data it needs."
  ]
 },
 {
  "t": "Business problems machine learning can solve, and when ML is not the right tool",
  "objectives": [
   "Students will be able to identify the main families of business problems that ML solves well, such as forecasting, classification, recommendation and anomaly detection.",
   "Students will be able to explain at least three situations in which ML is not the right tool.",
   "Students will be able to apply a short checklist (problem, success measure, data, existing service) to decide whether a proposed ML project is worth pursuing.",
   "Students will be able to describe why deployed models need monitoring and retraining."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write four requests on the board, including calculating sales tax and predicting churn. Ask students to vote on which need ML and keep the votes for later."
   ],
   [
    12,
    "Teach",
    "Explain the two conditions for ML (complex pattern, enough relevant data), walk through the problem families with one business example each, then cover the four warning signs: exact rules, little data, unrepresentative data, and questions a dashboard answers. Close with model drift."
   ],
   [
    15,
    "Activity",
    "Run the card sort described below in groups of three or four."
   ],
   [
    8,
    "Discuss",
    "Groups report their hardest card. Revisit the warm-up votes and ask who would change their vote and why."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand it in."
   ]
  ],
  "warmup": "Your manager wants to use machine learning to calculate employee overtime pay. Is that a good idea? Write one sentence explaining your answer.",
  "activity": {
   "title": "ML or not ML card sort",
   "materials": "Printed cards (about 12 per group), each with a short business request; whiteboard divided into three columns: Good fit for ML, Not ML, Need more information.",
   "steps": [
    "Give each group a deck of cards with requests such as forecasting ice cream demand, calculating payroll tax, flagging unusual logins, counting last month's returns, routing support emails, and predicting sales for a product launching next month.",
    "Groups place each card in a column and write one reason on a sticky note attached to it, naming the problem family or the warning sign.",
    "For every card in the Good fit column, groups must name the data they would need and one success measure.",
    "For every card in Need more information, groups write the question they would ask the business owner.",
    "Each group moves to another group's board and marks any placement they disagree with, then the teacher resolves disagreements with the whole class."
   ]
  },
  "discussion": [
   "Why might a business leader push for ML even when a dashboard would answer the question?",
   "Who should decide when a model's accuracy has drifted far enough to need retraining?"
  ],
  "exit": [
   [
    "Name two problem families where ML adds value.",
    "Any two of forecasting, classification, recommendation, anomaly detection, understanding unstructured data, or generative tasks."
   ],
   [
    "Why is ordinary code better than ML for calculating shipping cost from a rate table?",
    "The rule is known and exact, so code is cheaper, always correct and easy to audit; a model would only approximate it."
   ],
   [
    "What is model drift?",
    "A drop in accuracy over time because real-world data changes away from the data the model was trained on."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-question flowchart (Is there an exact rule? Is there lots of relevant past data?) to use on each card before discussing families.",
   "Extend: Ask fast finishers to pick one Good fit card and write a one-paragraph project charter with the business goal, success metric, data source and monitoring plan."
  ]
 },
 {
  "t": "Data quality for machine learning: accuracy, completeness, representativeness and bias",
  "objectives": [
   "Students will be able to define the data quality dimensions of accuracy, completeness, consistency, timeliness, relevance and representativeness.",
   "Students will be able to explain three ways bias can enter training data: historical, collection and labeling.",
   "Students will be able to diagnose, from a short scenario, which data quality problem is the most likely cause of poor model performance.",
   "Students will be able to recommend practical steps to improve data quality before and after deployment."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a tiny projected table with a mislabeled row, a blank field, mixed date formats and an outdated year. Ask students to spot everything wrong."
   ],
   [
    12,
    "Teach",
    "Name each quality dimension using the warm-up table, then explain representativeness and the three sources of bias with one example each. Stress that compute does not fix bad data."
   ],
   [
    15,
    "Activity",
    "Run the data detective activity below in pairs."
   ],
   [
    8,
    "Discuss",
    "Pairs share their diagnoses. Ask which problems would be hardest to notice without measuring accuracy per group."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If you trained a model to recognize dogs using only photos of golden retrievers, what would happen when it saw a dachshund?",
  "activity": {
   "title": "Data detective",
   "materials": "Printed one-page dataset excerpts (about 15 rows each, made by the teacher) with planted problems; printed scenario cards describing how the model behaved after launch; highlighters.",
   "steps": [
    "Give each pair one dataset excerpt and its matching scenario card, for example a hiring dataset drawn mostly from one university, or a sensor dataset with temperatures in two different units.",
    "Pairs highlight every problem they find in the rows and label each with a quality dimension.",
    "Pairs read the scenario card and decide which problem best explains the model's behavior after launch.",
    "Pairs write two fixes: one before training, such as rebalancing or relabeling, and one after deployment, such as monitoring accuracy per group.",
    "Pairs swap excerpts with a neighboring pair and check whether they found the same problems."
   ]
  },
  "discussion": [
   "Should a company ever use historical decision data that it knows contains past unfairness? What would it need to do first?",
   "Who in an organization should own data quality: the data team, the business owner, or both?"
  ],
  "exit": [
   [
    "What does representative training data mean?",
    "Data that covers the full range of cases and groups the model will face in real use."
   ],
   [
    "Give one way historical data can introduce bias.",
    "Past decisions recorded in the data were unfair, so the model learns and repeats them."
   ],
   [
    "A model works well for one region but poorly for another. What is the most likely cause and fix?",
    "Unrepresentative training data for the weaker region; collect and add good examples from that region, retrain, and measure accuracy per region."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card listing each quality dimension with a one-line example, so students can match problems to names during the activity.",
   "Extend: Ask fast finishers to find a proxy feature in their dataset excerpt and explain how removing a sensitive column alone would fail to remove bias."
  ]
 },
 {
  "t": "Responsible AI: Google's AI Principles, fairness, explainability, privacy and accountability",
  "objectives": [
   "Students will be able to describe the main themes of Google's AI Principles without relying on a memorized list.",
   "Students will be able to distinguish fairness, explainability, privacy, accountability and safety, and match each to a business scenario.",
   "Students will be able to recommend safeguards, such as human in the loop and monitoring across groups, for a high-impact AI use case.",
   "Students will be able to explain Google Cloud's commitment about customer data in enterprise AI services."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect a few answers on the board."
   ],
   [
    12,
    "Teach",
    "Introduce the AI Principles as themes, then define each theme with a short example. Explain human in the loop and why responsible AI spans the lifecycle. End with the customer data commitment."
   ],
   [
    15,
    "Activity",
    "Run the ethics review board role-play below."
   ],
   [
    8,
    "Discuss",
    "Each board reports its decision. Compare how different boards weighed the same risk."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Would you accept a decision about your job application from an AI system if nobody could explain why it made that decision? Why or why not?",
  "activity": {
   "title": "AI review board",
   "materials": "Printed case cards describing proposed AI uses (for example a tenant screening tool, a school essay grader, a hospital triage assistant); printed role cards; whiteboard.",
   "steps": [
    "Form groups of five and give each person a role card: product owner, affected customer, data scientist, privacy officer, compliance lead.",
    "Each group receives one case card and has five minutes to list the risks from their role's point of view, tagging each risk with a theme (fairness, explainability, privacy, accountability, safety).",
    "The group agrees on a decision: approve, approve with conditions, or reject, and writes the conditions, such as human review, per-group testing or data masking.",
    "Each group writes its decision and top two conditions on the whiteboard under its case name.",
    "The teacher picks one condition from each board and asks the class which theme it addresses."
   ]
  },
  "discussion": [
   "When, if ever, is it acceptable to use an AI model whose decisions cannot be explained?",
   "How should an organization balance the speed benefits of automation against the need for human review?"
  ],
  "exit": [
   [
    "A model gives different approval rates to equally qualified groups. Which theme is at risk?",
    "Fairness."
   ],
   [
    "What does human in the loop mean?",
    "A person reviews or approves the AI output before an important action is taken."
   ],
   [
    "What does Google Cloud state about customer data in its enterprise AI services?",
    "It is not used to train Google's models without the customer's permission."
   ]
  ],
  "differentiation": [
   "Support: Give students a matching sheet with five short scenarios and the five theme names to connect before the role-play.",
   "Extend: Ask fast finishers to write a one-paragraph responsible AI policy for their case that covers ownership, testing before launch and monitoring after launch."
  ]
 },
 {
  "t": "Pre-trained AI APIs: Vision, Natural Language, Speech-to-Text, Text-to-Speech and Translation",
  "objectives": [
   "Students will be able to describe what the Vision, Natural Language, Speech-to-Text, Text-to-Speech and Translation APIs do.",
   "Students will be able to match a business scenario to the correct pre-trained API based on the data type and task.",
   "Students will be able to explain when a pre-trained API is not enough and a custom model is needed.",
   "Students will be able to design a simple pipeline that chains two or more pre-trained APIs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show four items on the projector: a photo of a street sign, a short angry review, an audio icon, and a paragraph in French. Ask students what a computer would need to do with each."
   ],
   [
    12,
    "Teach",
    "Walk through each API with one concrete use. Emphasize that the Vision API detects but does not identify faces, contrast OCR with text meaning, introduce Document AI, and close with when a custom model is needed."
   ],
   [
    15,
    "Activity",
    "Run the API matching relay below."
   ],
   [
    8,
    "Discuss",
    "Review the pipeline designs. Ask which steps would break if the business had unusual jargon or product names."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of an app on your phone that turns your voice into text or translates a sign through the camera. What do you think is happening behind the scenes?",
  "activity": {
   "title": "Pre-trained API matching relay",
   "materials": "Printed scenario cards (about 16), printed API name cards (Vision, Video Intelligence, Natural Language, Speech-to-Text, Text-to-Speech, Translation, Document AI, Not a pre-trained API task); whiteboard; sticky notes.",
   "steps": [
    "Put the API name cards along the whiteboard as column headings.",
    "Teams of four line up. One student at a time takes a scenario card, places it under the API they think fits, and returns to tag the next teammate.",
    "After all cards are placed, each team gets two minutes to move any card they now think is wrong, writing the reason on a sticky note.",
    "The teacher reviews each column and explains any trick cards, such as identifying a person by face or recognizing a company-specific defect.",
    "Each team then picks two scenario cards and designs a pipeline that chains at least two APIs, drawing it on paper."
   ]
  },
  "discussion": [
   "What risks should a business consider before sending customer call recordings to any cloud API?",
   "Why might a company start with a pre-trained API even if it expects to need a custom model later?"
  ],
  "exit": [
   [
    "Which API would you use to add captions to training videos?",
    "Speech-to-Text."
   ],
   [
    "What does the Vision API not do with faces?",
    "It does not identify who the person is; it only detects faces and some attributes."
   ],
   [
    "When is a pre-trained API not enough?",
    "When the task is specific to your business, such as your own product defects or specialized terms, so you need a custom model trained on your own labeled data."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page table with each API, its input type and its output, for students to use during the relay.",
   "Extend: Ask fast finishers to write the clues in an exam question that would make AutoML, not a pre-trained API, the correct answer."
  ]
 },
 {
  "t": "BigQuery ML: building and using models with SQL where the data already lives",
  "objectives": [
   "Students will be able to explain what BigQuery ML is and who it is designed for.",
   "Students will be able to describe the roles of CREATE MODEL, ML.EVALUATE and ML.PREDICT.",
   "Students will be able to match common business problems to BigQuery ML model types such as linear regression, logistic regression, k-means and time-series forecasting.",
   "Students will be able to explain when Vertex AI is a better choice than BigQuery ML."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask how many students know some SQL, then pose the warm-up question about why data export slows projects down."
   ],
   [
    12,
    "Teach",
    "Project the CREATE MODEL example and read it line by line. Explain the label column, then ML.EVALUATE and ML.PREDICT. Map each model type to a business question and cover the limits that point to Vertex AI."
   ],
   [
    15,
    "Activity",
    "Run the model type match and query reading activity below."
   ],
   [
    8,
    "Discuss",
    "Discuss which teams in a company could benefit most from BigQuery ML and what governance would still be needed."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If your analysis tools are in one building and your data is in another, what problems do you face every time you want to answer a new question?",
  "activity": {
   "title": "Read the query, pick the model",
   "materials": "Projector; printed handouts with three short BigQuery ML snippets (CREATE MODEL with different model types) and eight business question cards; optional student laptops with a browser to explore the BigQuery sandbox.",
   "steps": [
    "In pairs, students read each printed snippet and write in plain words what the model will predict and which column is the label.",
    "Pairs then sort the eight business question cards by model type: linear regression, logistic regression, k-means clustering, time-series forecasting, or Not a BigQuery ML task.",
    "For each card, pairs write whether the answer would be used through ML.PREDICT in a weekly report or dashboard.",
    "The teacher reveals answers and highlights the card that should go to Vertex AI, such as recognizing defects in product photos.",
    "If laptops and accounts are available, the teacher demonstrates querying a public dataset in the BigQuery sandbox to show where models would be created."
   ]
  },
  "discussion": [
   "What new risks appear when many analysts, not just data scientists, can build models?",
   "How would you decide whether a BigQuery ML model is good enough to use for business decisions?"
  ],
  "exit": [
   [
    "Which statement trains a model in BigQuery ML?",
    "CREATE MODEL."
   ],
   [
    "Give two benefits of BigQuery ML.",
    "Analysts use SQL they already know, and data stays in BigQuery with no export, which saves time and keeps access controls."
   ],
   [
    "Name a case where Vertex AI is a better fit than BigQuery ML.",
    "Highly customized deep learning, unusual architectures or unstructured data like images and audio, where full control is needed."
   ]
  ],
  "differentiation": [
   "Support: Give students a glossary card explaining label, feature, training and prediction with a simple churn example before they read the snippets.",
   "Extend: Ask fast finishers to write the ML.PREDICT query that would apply the churn model to a table of current customers, in pseudo-SQL."
  ]
 },
 {
  "t": "Vertex AI: the unified ML platform, AutoML and custom training",
  "objectives": [
   "Students will be able to explain why a unified ML platform like Vertex AI helps organizations.",
   "Students will be able to compare AutoML and custom training by data, skills, control and effort.",
   "Students will be able to identify at least four MLOps capabilities in Vertex AI and the problem each solves.",
   "Students will be able to recommend AutoML or custom training for a given business scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list student answers about what happens after a model is built."
   ],
   [
    12,
    "Teach",
    "Explain the stitched-together tools problem, then contrast AutoML and custom training in a two-column table on the board. Walk through the ML lifecycle and place each MLOps tool on it."
   ],
   [
    15,
    "Activity",
    "Run the lifecycle map activity below."
   ],
   [
    8,
    "Discuss",
    "Groups share their maps. Discuss which lifecycle step organizations most often forget to fund."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Suppose a model predicts sales perfectly in January. What could cause it to get worse by July, and how would you notice?",
  "activity": {
   "title": "Map the ML lifecycle",
   "materials": "Whiteboard or large paper per group; sticky notes in two colors; printed capability cards (Workbench, AutoML, custom training, Pipelines, Model Registry, endpoints, batch prediction, feature management, evaluation, explanations, model monitoring).",
   "steps": [
    "Each group draws the lifecycle as a loop: prepare data, train, evaluate, deploy, monitor, retrain.",
    "Groups place each capability card on the step where it is used and write on a sticky note the problem it solves.",
    "The teacher hands each group a scenario card, such as a small retailer with labeled product photos or a bank building a strategic risk model.",
    "Groups mark the path their scenario would take, choosing AutoML or custom training with a second-color sticky note explaining why.",
    "Groups rotate to view another map and leave one question or correction on a sticky note."
   ]
  },
  "discussion": [
   "Why might a company start with AutoML and later move to custom training?",
   "What could go wrong if a team deploys a model to an endpoint and never monitors it?"
  ],
  "exit": [
   [
    "When is AutoML a better choice than custom training?",
    "When the team has its own labeled data but limited ML expertise and needs a good custom model quickly."
   ],
   [
    "Name two MLOps capabilities in Vertex AI.",
    "Any two of pipelines, model registry, endpoints, batch prediction, feature management, evaluation, explanations, model monitoring."
   ],
   [
    "What is the main difference between AutoML and a pre-trained API?",
    "AutoML trains a custom model on your own labeled data; a pre-trained API needs no training and handles common tasks."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed lifecycle loop with three capability cards already placed as examples.",
   "Extend: Ask fast finishers to describe a retraining pipeline in four steps, including what triggers it and how the new model version is tracked."
  ]
 },
 {
  "t": "Choosing an AI approach: pre-trained API, BigQuery ML, AutoML or custom model",
  "objectives": [
   "Students will be able to compare pre-trained APIs, BigQuery ML, AutoML and custom training by problem type, data, skills and time to value.",
   "Students will be able to select the most appropriate AI approach for a business scenario and justify the choice using its clues.",
   "Students will be able to explain the ladder of effort for both predictive ML and generative AI.",
   "Students will be able to describe the build versus buy trade-off."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the four Fairway Grocers proposals from the hook aloud and ask students to guess whether they need the same tool."
   ],
   [
    12,
    "Teach",
    "Draw the ladder of effort on the board with the four rungs and the clue words for each. Add the generative AI ladder alongside and explain build versus buy."
   ],
   [
    15,
    "Activity",
    "Run the AI consulting desk activity below."
   ],
   [
    8,
    "Discuss",
    "Compare recommendations across groups for the same client and resolve disagreements by pointing to the clues."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you needed a website translated by next week and had no programmers, would you train your own translation model? What would you do instead?",
  "activity": {
   "title": "AI consulting desk",
   "materials": "Printed client brief cards (about 10) describing a business, its data, its team skills and its deadline; printed recommendation forms; whiteboard with the effort ladder drawn on it.",
   "steps": [
    "Groups of three act as consultants and receive three client brief cards each.",
    "For each client, the group underlines the clues about problem type, data location, skills and deadline.",
    "The group fills in a recommendation form naming the approach, the main clue that decided it, and the rung they would move to if the first choice proved insufficient.",
    "Each group places its client cards on the matching rung of the ladder on the whiteboard.",
    "The teacher reviews any cards placed on the wrong rung, asking the group to point to the clue they relied on."
   ]
  },
  "discussion": [
   "Why might a company be tempted to start with custom training even when a pre-trained API would work?",
   "When does buying a finished AI product make more sense than building one, and what do you give up?"
  ],
  "exit": [
   [
    "SQL analysts want to forecast demand from sales tables in BigQuery. Which approach?",
    "BigQuery ML."
   ],
   [
    "What is the key clue that points to AutoML?",
    "The team has its own labeled data for a business-specific problem but limited ML expertise."
   ],
   [
    "Why start at the bottom of the ladder of effort?",
    "It delivers value fastest with the least cost and skill; higher rungs are justified only when lower ones cannot meet the need."
   ]
  ],
  "differentiation": [
   "Support: Give students a decision flowchart with four yes or no questions (common task, data in BigQuery with SQL analysts, own labeled data, unique strategic problem with data scientists).",
   "Extend: Ask fast finishers to write two exam-style scenarios where the clues are mixed and the best answer is not obvious, with a justified answer key."
  ]
 },
 {
  "t": "Generative AI on Google Cloud: Gemini models, Vertex AI Model Garden and Vertex AI Studio",
  "objectives": [
   "Students will be able to describe Gemini as Google's family of multimodal foundation models and give business uses.",
   "Students will be able to distinguish the roles of Gemini, Vertex AI Model Garden and Vertex AI Studio.",
   "Students will be able to apply prompt engineering techniques to improve a weak prompt.",
   "Students will be able to explain the enterprise controls and data commitments that address business concerns about generative AI."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect examples of generative AI students have used."
   ],
   [
    10,
    "Teach",
    "Explain foundation models and multimodality, then draw three boxes on the board labeled Gemini (the models), Model Garden (choose) and Vertex AI Studio (prototype). Cover the enterprise controls and the customer data commitment."
   ],
   [
    18,
    "Activity",
    "Run the prompt makeover activity below."
   ],
   [
    7,
    "Discuss",
    "Share the best rewritten prompts and discuss which elements made the biggest difference."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Have you ever asked an AI chatbot for something and received a vague answer? What could you have told it to get a better one?",
  "activity": {
   "title": "Prompt makeover",
   "materials": "Printed weak prompt cards (for example 'summarize this', 'write an email to the customer'); a printed prompt checklist (instruction, context, role, format, examples); student laptops with a browser and any free generative AI chat tool if available, otherwise paper only.",
   "steps": [
    "Pairs receive two weak prompt cards tied to a business task, such as summarizing a claim file or drafting a delay notice.",
    "Using the checklist, pairs rewrite each prompt to include a clear instruction, context, a role, an output format and an example.",
    "If laptops and a tool are available, pairs run both the weak and the improved prompt and note the differences; otherwise they predict what each would produce.",
    "Pairs label which Google Cloud tool they would use at each stage: choosing a model, testing the prompt, and deploying behind an app.",
    "Two pairs present their before and after prompts to the class."
   ]
  },
  "discussion": [
   "What kinds of business information should never be put into a consumer AI tool, and why does an enterprise platform change that?",
   "When would a company prefer an open model from Model Garden over a fully managed Google model?"
  ],
  "exit": [
   [
    "What does multimodal mean?",
    "The model can take in and reason over several data types, such as text, images, audio and video, in the same request."
   ],
   [
    "Where would a team compare Google, partner and open models?",
    "Vertex AI Model Garden."
   ],
   [
    "Name two elements of a well-engineered prompt.",
    "Any two of clear instruction, context, a role, the desired format and examples."
   ]
  ],
  "differentiation": [
   "Support: Provide a fill-in-the-blank prompt template with labeled slots for role, task, context and format.",
   "Extend: Ask fast finishers to outline when prompt engineering would not be enough and the team should ground or tune the model, with a reason for each."
  ]
 },
 {
  "t": "Grounding, agents and AI-powered search and conversation for business",
  "objectives": [
   "Students will be able to explain what hallucinations are and why foundation models produce them.",
   "Students will be able to describe grounding and the steps of retrieval-augmented generation.",
   "Students will be able to distinguish a question-answering chatbot, enterprise search and an AI agent.",
   "Students will be able to recommend safeguards for AI agents that take actions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and discuss answers briefly."
   ],
   [
    12,
    "Teach",
    "Explain hallucinations, then draw the RAG flow on the board: question, search knowledge source, retrieve passages, model answers with citations. Contrast enterprise search with keyword search and introduce agents and their safeguards."
   ],
   [
    15,
    "Activity",
    "Run the human RAG role-play below."
   ],
   [
    8,
    "Discuss",
    "Debrief the role-play, then discuss which actions an agent should never take without human approval."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If someone asked you a question about a company you had never worked for, and you had to answer confidently, what might go wrong?",
  "activity": {
   "title": "Human RAG role-play",
   "materials": "A printed one-page fictional company policy sheet (returns, shipping, warranty); printed customer question cards; sticky notes; whiteboard.",
   "steps": [
    "Form groups of four: a customer, a retriever, a writer and an auditor.",
    "Round one: the writer answers a customer question from memory without seeing the policy sheet, and the auditor notes any errors.",
    "Round two: the retriever finds and highlights the relevant passages on the policy sheet and passes them to the writer, who answers using only those passages and cites the line used.",
    "Round three: the customer asks for an action, such as starting a return; the group decides which actions the writer, acting as an agent, may take alone and which need a manager's approval, writing rules on sticky notes.",
    "Groups post their agent rules on the whiteboard and compare them with other groups."
   ]
  },
  "discussion": [
   "What could go wrong if the documents used for grounding are themselves outdated or wrong?",
   "How much autonomy should a customer service agent have before a human must be involved?"
  ],
  "exit": [
   [
    "What is a hallucination in generative AI?",
    "A confident but incorrect or made-up output from a model."
   ],
   [
    "Briefly describe how RAG works.",
    "The system retrieves relevant content from a trusted source and gives it to the model with the question, so the answer is based on that content."
   ],
   [
    "How is an AI agent different from a chatbot that only answers questions?",
    "An agent plans and takes actions through tools and APIs to complete tasks, such as updating a booking, not just generating text."
   ]
  ],
  "differentiation": [
   "Support: Provide a numbered diagram of the RAG flow with blanks for students to label during the teach segment.",
   "Extend: Ask fast finishers to design an agent for an employee help desk, listing its tools, its permissions, the actions needing human approval and what it should log."
  ]
 },
 {
  "t": "AI infrastructure: GPUs and Tensor Processing Units (TPUs)",
  "objectives": [
   "Students will be able to explain why ML workloads need accelerators rather than relying only on CPUs.",
   "Students will be able to compare GPUs and TPUs, including that TPUs are Google's custom ASICs for ML.",
   "Students will be able to identify when accelerators matter to a customer and when Google manages them.",
   "Students will be able to explain the business benefit of renting AI infrastructure in the cloud."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Run the warm-up race described in the warm-up prompt and discuss why the group was faster."
   ],
   [
    12,
    "Teach",
    "Explain matrix math in simple terms, then compare CPU, GPU and TPU. Cover TPU pods, where accelerators are available in Google Cloud, training versus inference, and when Google manages the hardware."
   ],
   [
    15,
    "Activity",
    "Run the infrastructure advisor card activity below."
   ],
   [
    8,
    "Discuss",
    "Discuss the rent versus buy decision and why hardware ownership is risky for AI."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "One student solves twenty simple additions alone while twenty students each solve one at the same time. Which finishes first, and what does that tell us about computer chips?",
  "activity": {
   "title": "Infrastructure advisor",
   "materials": "Printed scenario cards (about 10) describing AI projects, such as calling the Translation API, fine-tuning an open model, training a large model for weeks, or serving a chatbot; whiteboard with three columns: No accelerator decision needed, GPU or TPU decision needed, Unclear.",
   "steps": [
    "Groups of three receive a stack of scenario cards.",
    "For each card, the group decides whether the customer must think about accelerators at all, placing it in a column on the whiteboard.",
    "For cards in the GPU or TPU column, the group writes whether the work is training or inference and whether renting short-term or running long-term fits better.",
    "Groups note any card where a TPU pod might help, explaining why.",
    "The class reviews the columns together, and the teacher corrects any card where Google actually manages the infrastructure."
   ]
  },
  "discussion": [
   "Why might a company prefer to rent accelerators even if it uses them often?",
   "Why do you think Google chose to design its own ML chips instead of relying only on GPUs?"
  ],
  "exit": [
   [
    "What is a TPU?",
    "A Tensor Processing Unit, Google's custom ASIC designed to accelerate ML training and inference."
   ],
   [
    "Why are accelerators faster than CPUs for ML?",
    "They perform huge numbers of math operations in parallel, which is what ML training and inference mostly consist of."
   ],
   [
    "When does a customer not need to think about accelerators?",
    "When using pre-trained APIs or managed generative models through Vertex AI, because Google runs the infrastructure."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-row comparison table (CPU, GPU, TPU) with columns for original purpose, strength and typical use, partially filled in.",
   "Extend: Ask fast finishers to explain why inference costs can exceed training costs over a model's lifetime and how hardware choice might differ between the two."
  ]
 },
 {
  "t": "Why modernize: benefits of moving infrastructure and applications to the cloud",
  "objectives": [
   "Students will be able to explain the benefits of infrastructure modernization and of application modernization, and distinguish the two.",
   "Students will be able to define technical debt and explain how modernization reduces it.",
   "Students will be able to describe modernization techniques such as managed services, containers, microservices, serverless and CI/CD.",
   "Students will be able to justify why organizations assess their application portfolio before choosing an approach per application."
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
    "Draw two columns, where it runs and how it is built. Place infrastructure benefits in the first and application techniques in the second. Define technical debt with the interest metaphor and introduce portfolio assessment and Migration Center."
   ],
   [
    15,
    "Activity",
    "Run the portfolio triage activity below."
   ],
   [
    8,
    "Discuss",
    "Groups explain their priority order and the reasoning behind their top pick."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of an old phone or laptop you kept using too long. What problems did it cause, and why did you delay replacing it?",
  "activity": {
   "title": "Portfolio triage",
   "materials": "Printed application profile cards (about 8 per group) listing business value, change frequency, support status and dependencies; whiteboard with columns Retire, Move as is, Modernize; sticky notes.",
   "steps": [
    "Groups of three read each fictional application profile card.",
    "Groups place each card in a column on the whiteboard and write a one-line justification on a sticky note referring to value, fit, dependencies or cost.",
    "For each card in Modernize, the group names at least one technique, such as managed database, containers, serverless or CI/CD, and the benefit it brings.",
    "Groups rank their cards by priority and identify which one carries the most technical debt.",
    "The teacher leads a quick comparison of columns across groups and highlights cards placed differently."
   ]
  },
  "discussion": [
   "Why might a company move an application as it is first and modernize it later, rather than rebuilding it straight away?",
   "What non-technical obstacles, such as skills or culture, can slow application modernization?"
  ],
  "exit": [
   [
    "Give two benefits of infrastructure modernization.",
    "Any two of no hardware to buy or refresh, capacity on demand, global locations, built-in redundancy, pay-as-you-go pricing."
   ],
   [
    "What is technical debt?",
    "The accumulated future cost of outdated technology and shortcuts that make change harder and slower."
   ],
   [
    "Why assess the portfolio before migrating?",
    "To choose the right approach for each application based on business value, fit, dependencies and cost rather than treating all of them the same way."
   ]
  ],
  "differentiation": [
   "Support: Provide a glossary card with plain definitions of monolith, microservice, container, serverless and CI/CD for use during the activity.",
   "Extend: Ask fast finishers to sketch how one monolith card could be split into three microservices and explain which part they would modernize first and why."
  ]
 },
 {
  "t": "Migration approaches: retire, retain, rehost (lift and shift), replatform, refactor and reimagine",
  "objectives": [
   "Students will be able to define retire, retain, rehost, replatform, refactor and reimagine in their own words.",
   "Students will be able to compare the approaches on speed, effort, risk and cloud-native benefit.",
   "Students will be able to select an appropriate migration approach for a given application scenario and justify it.",
   "Students will be able to explain why organizations combine approaches, such as rehosting first and modernizing later."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the moving-house question on the board and take three or four answers. Point out that students naturally treat different belongings differently, which is exactly what migration planning does."
   ],
   [
    12,
    "Teach",
    "Draw a horizontal line from 'fast, low change' to 'slow, high benefit' and place each approach on it while defining it. Use the insurer example to show all six in one migration. Emphasize the Google phrases lift and shift, move and improve, and refactor."
   ],
   [
    18,
    "Activity",
    "Run the application card sort described below in groups of three or four, then have each group report two of its harder decisions."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore why 'rehost first, modernize later' is common and what risks it carries."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on a slip of paper."
   ]
  ],
  "warmup": "You are moving to a new apartment next month. Name one thing you would throw away, one you would leave behind for now, one you would move exactly as it is, and one you would replace or rebuild. How did you decide?",
  "activity": {
   "title": "Migration triage card sort",
   "materials": "Printed cards, each describing one application (purpose, age, how often it changes, constraints such as deadlines or regulations); six column headers on the whiteboard or on sheets of paper; sticky notes.",
   "steps": [
    "Give each group a set of 10 to 12 application cards and the six column headers: Retire, Retain, Rehost, Replatform, Refactor, Reimagine.",
    "Tell groups the organization must leave its data center in six months with a limited budget. They place each card under one heading and write a one-line reason on a sticky note attached to it.",
    "Halfway through, announce a twist: the budget for the year doubled but the deadline is unchanged. Groups decide whether any cards move and why.",
    "Each group presents two decisions they argued about. The teacher confirms or corrects them using clue words such as deadline, managed database, microservices and unused."
   ]
  },
  "discussion": [
   "What risks does an organization take on if it rehosts everything and never gets around to modernizing?",
   "Who outside the IT department should be involved in a reimagine decision, and why?",
   "When might retaining an application on-premises be the most responsible choice?"
  ],
  "exit": [
   [
    "A company must close its data center in four months and has no time to change code. Which approach fits most applications?",
    "Rehost (lift and shift), because it is fastest and requires no code changes."
   ],
   [
    "What distinguishes replatform from refactor?",
    "Replatform makes targeted changes, such as adopting Cloud SQL, without redesigning the app; refactor changes the code and architecture to be cloud native."
   ],
   [
    "Give one reason an organization might retain an application.",
    "A recent hardware investment, a regulation requiring it to stay on-premises, an unsupported vendor product or an unready dependency."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference strip listing each approach with one clue word (unused, not yet, as is, managed service, rewrite, new process) and start them with the four most obvious cards.",
   "Extend: Ask fast finishers to sequence their migration over 18 months, showing which rehosted applications they would replatform or refactor later and what business value justifies each step."
  ]
 },
 {
  "t": "Virtual machines with Compute Engine: machine types, managed instance groups and autoscaling",
  "objectives": [
   "Students will be able to describe Compute Engine as IaaS and explain what the customer still manages.",
   "Students will be able to compare machine type families and explain when a custom machine type saves money.",
   "Students will be able to explain how instance templates, managed instance groups, autoscaling, autohealing and regional MIGs improve scalability and availability.",
   "Students will be able to choose Compute Engine and MIG features for a given workload scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the ticket sale and list students' ideas on the board without judging them."
   ],
   [
    15,
    "Teach",
    "Explain Compute Engine as IaaS, then machine families and custom types. Draw a load balancer in front of a regional MIG spread across three zones, and label the instance template, autoscaler and health check. Walk through what happens during a traffic surge and a VM crash."
   ],
   [
    15,
    "Activity",
    "Run the MIG role-play described below, with students acting as VMs, the load balancer and the autoscaler."
   ],
   [
    5,
    "Discuss",
    "Debrief the role-play with the discussion questions, linking each event to the matching MIG feature."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on paper."
   ]
  ],
  "warmup": "A website expects ten times its normal traffic for one hour next Friday and almost nothing on Sunday night. If you were renting servers by the second, how would you want the number of servers to change, and what should happen if one server crashes mid-sale?",
  "activity": {
   "title": "Human managed instance group",
   "materials": "Index cards labeled 'request', a printed instance template card, name tags for roles (Load balancer, Autoscaler, Health checker), a whiteboard to track VM count and a timer.",
   "steps": [
    "Choose one student as the load balancer, one as the autoscaler and one as the health checker. Start with three students as VMs, each holding a copy of the instance template card. The rest of the class are users who will send requests.",
    "Users hand request cards to the load balancer, who passes them to VMs. When any VM holds more than three cards, the autoscaler 'creates' a new VM by bringing in another student with a template card, up to a maximum written on the board.",
    "Midway, the teacher quietly tells one VM to stop responding. The health checker notices it ignoring a ping and the group replaces it with a fresh student, while the load balancer stops sending it requests.",
    "Slow the requests so VMs sit idle and have the autoscaler remove VMs down to the minimum. Finish by asking which roles map to autoscaling, autohealing, the health check, the template and the load balancer."
   ]
  },
  "discussion": [
   "Why must every VM in the group be built from the same template, and what would go wrong if one were configured by hand?",
   "What would change if all three starting VMs were in the same zone and that zone failed?",
   "When would a team accept the management work of Compute Engine instead of choosing a serverless service?"
  ],
  "exit": [
   [
    "What is the difference between autoscaling and autohealing?",
    "Autoscaling changes the number of VMs based on load; autohealing recreates individual VMs that fail a health check."
   ],
   [
    "Why would a company choose a regional MIG over a zonal MIG?",
    "A regional MIG spreads VMs across zones so the application survives the failure of a single zone."
   ],
   [
    "Name one reason to choose Compute Engine over a serverless option.",
    "Full control of the operating system, specific licensed software, a lift-and-shift migration or special hardware such as GPUs."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of a load balancer, regional MIG and health check, and a matching worksheet pairing each feature with a one-sentence 'what problem it solves'.",
   "Extend: Ask fast finishers to recommend a cost strategy for a web tier that runs steadily all year plus a nightly batch job, explaining where committed use discounts and Spot VMs would each fit."
  ]
 },
 {
  "t": "Keeping existing platforms: Google Cloud VMware Engine and Bare Metal Solution",
  "objectives": [
   "Students will be able to describe Google Cloud VMware Engine and Bare Metal Solution and the problems each solves.",
   "Students will be able to explain the division of responsibility between Google and the customer in VMware Engine.",
   "Students will be able to choose between VMware Engine, Bare Metal Solution and standard Compute Engine for a given scenario.",
   "Students will be able to explain how these services act as a stepping stone toward later modernization."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about moving without retraining. Collect answers and note that speed and familiarity often compete with modernization."
   ],
   [
    13,
    "Teach",
    "Introduce the problem of platform-bound workloads. Explain VMware Engine with its components and responsibility split, then Bare Metal Solution and why Oracle licensing matters. Draw both next to a Google Cloud region with links to BigQuery and Compute Engine."
   ],
   [
    17,
    "Activity",
    "Run the consultant pitch activity described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore the stepping-stone idea and its risks."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions individually."
   ]
  ],
  "warmup": "Imagine your team has used the same set of tools for fifteen years and must move everything to a new building in nine months. Would you rather learn new tools first or move with the old ones and learn later? What are the risks of each?",
  "activity": {
   "title": "Migration consultant pitch",
   "materials": "Printed client briefs (one per group) describing an organization's platform, deadline and constraints; a whiteboard; sticky notes for votes.",
   "steps": [
    "Divide the class into groups of three. Give each group a client brief, such as a VMware-heavy bank, a company with an Oracle database, a startup with a few Linux servers, or a firm that wants full modernization.",
    "Groups have eight minutes to choose VMware Engine, Bare Metal Solution, Compute Engine or a combination, and to prepare a one-minute pitch explaining the choice, what the client still manages and what they would modernize next.",
    "Each group pitches. The rest of the class acts as the client's board and asks one challenging question, for example about skills, licensing or long-term cost.",
    "The teacher summarizes which clue words in each brief pointed to which service and corrects any misconceptions."
   ]
  },
  "discussion": [
   "If moving to VMware Engine is fast and familiar, what might stop an organization from ever modernizing afterward?",
   "Why does software licensing sometimes drive infrastructure decisions as much as technical needs do?",
   "How could new cloud services, such as BigQuery, add value to systems that were moved largely unchanged?"
  ],
  "exit": [
   [
    "A company with thousands of VMware VMs wants to move quickly and keep its existing tools. Which service fits?",
    "Google Cloud VMware Engine."
   ],
   [
    "Which service provides dedicated physical servers for workloads such as Oracle databases?",
    "Bare Metal Solution."
   ],
   [
    "Why are these services described as a stepping stone?",
    "They let organizations move the platform quickly and exit data centers first, then modernize applications over time while connecting them to native Google Cloud services."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column comparison card (VMware Engine versus Bare Metal Solution) with rows for 'what it is', 'who it is for', 'what Google manages' and a clue word, and let students fill it in during the teach segment.",
   "Extend: Ask fast finishers to write a two-year roadmap for the retailer example, stating which workloads they would move off VMware Engine first and to which Google Cloud service, with a business reason for each."
  ]
 },
 {
  "t": "Containers: what they are and why they make applications portable",
  "objectives": [
   "Students will be able to define a container and explain how it solves the 'works on my machine' problem.",
   "Students will be able to compare containers and virtual machines on size, startup time, efficiency and isolation.",
   "Students will be able to distinguish a container image, a container and a registry such as Artifact Registry.",
   "Students will be able to explain why containers need orchestration and name Kubernetes, GKE and Cloud Run as options."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a recipe that fails in a friend's kitchen and connect it to software environments."
   ],
   [
    15,
    "Teach",
    "Draw two stacks side by side: hardware, hypervisor, guest OS, app for VMs; hardware, host OS, container runtime, containers for containers. Explain images, containers and registries using the recipe and meal comparison. Close with why orchestration is needed."
   ],
   [
    15,
    "Activity",
    "Run the build-ship-run paper simulation described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to link containers to microservices, CI/CD and multicloud."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions individually."
   ]
  ],
  "warmup": "You share a cake recipe with a friend, and their cake comes out completely different. List three reasons why, without blaming the recipe. How might you guarantee the same result every time?",
  "activity": {
   "title": "Build, ship, run with paper containers",
   "materials": "Envelopes, index cards, markers and a printed 'environment' card for each of three stations (Laptop, Test, Production) listing slightly different installed library versions.",
   "steps": [
    "In pairs, students first write an 'application' card that lists the library versions it needs, then try to 'run' it at each station. Where the station's library versions differ, the run fails; students record the failures.",
    "Next, pairs build a 'container image': an envelope holding the application card plus cards for each library version it needs. They label the envelope with a name and version tag, such as booking:1.0, and place it in a shared box representing Artifact Registry.",
    "Pairs pull the envelope from the registry and run it at each station. Because the envelope carries its own libraries, it runs the same everywhere. The teacher points out that every station still provides the 'kernel', represented by the table it sits on.",
    "Finally, the teacher announces version 1.1 has a bug. Pairs roll back by pulling booking:1.0 from the box, illustrating immutable, versioned images."
   ]
  },
  "discussion": [
   "Why does packaging each microservice as its own container make independent releases easier?",
   "If containers are lighter than VMs, why do many organizations still run containers on top of VMs?",
   "How does running the same image in every environment change the way testing and releases work?"
  ],
  "exit": [
   [
    "Why are containers smaller and faster to start than VMs?",
    "They share the host OS kernel and do not boot a full guest operating system."
   ],
   [
    "What is Artifact Registry used for?",
    "Storing and managing container images and other build artifacts so they can be pulled and run anywhere."
   ],
   [
    "Why do large container deployments need orchestration?",
    "Something must schedule containers onto machines, restart failures, scale copies and handle networking; Kubernetes, GKE or Cloud Run provide this."
   ]
  ],
  "differentiation": [
   "Support: Give students a fill-in diagram of the VM and container stacks with a word bank (hardware, hypervisor, guest OS, host OS, kernel, app, libraries) and let them complete it with a partner.",
   "Extend: Ask fast finishers to write, in plain language, the steps a Dockerfile would describe for a simple web app, and to explain how an immutable image supports rollback in a CI/CD pipeline."
  ]
 },
 {
  "t": "Google Kubernetes Engine (GKE): managed Kubernetes in Standard and Autopilot modes",
  "objectives": [
   "Students will be able to explain what Kubernetes does and describe desired state, clusters, nodes and pods.",
   "Students will be able to explain what GKE manages compared with self-managed Kubernetes.",
   "Students will be able to compare GKE Standard and Autopilot on responsibility, control and billing.",
   "Students will be able to recommend GKE Standard, GKE Autopilot or Cloud Run for a given scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Use the thermostat warm-up to introduce declaring what you want rather than giving step-by-step instructions."
   ],
   [
    15,
    "Teach",
    "Draw a cluster with a control plane and three nodes holding pods. Show desired state by erasing a node and asking what Kubernetes does. Then draw a responsibility table with rows for control plane, nodes and pods, and columns for self-managed, GKE Standard and GKE Autopilot."
   ],
   [
    15,
    "Activity",
    "Run the desired-state game described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare the two modes and Cloud Run."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "When you set a thermostat to 21 degrees, you do not tell the heater when to switch on and off. What does the thermostat do instead, and why is that easier than giving step-by-step instructions?",
  "activity": {
   "title": "Desired state game",
   "materials": "Sticky notes in two colors (pods and nodes), a whiteboard divided into three node boxes, a printed 'desired state' card and printed responsibility cards for the sorting step.",
   "steps": [
    "One student plays the control plane and holds a desired state card: 'checkout: 5 pods, search: 3 pods'. Other students place pod sticky notes in the node boxes as the control plane directs.",
    "The teacher erases one node box, removing its pods. The control plane compares the board with the card and directs students to reschedule the missing pods onto the remaining nodes. Then the teacher changes the card to 'checkout: 8 pods' and the class scales out.",
    "In pairs, students sort responsibility cards (patch node OS, upgrade control plane, choose machine types, define pod resource requests, pay for idle node capacity) into GKE Standard customer, GKE Autopilot customer or Google.",
    "The class reviews the sort together, and the teacher highlights that Google runs the control plane in both modes."
   ]
  },
  "discussion": [
   "Why might a large enterprise with an experienced platform team still choose Autopilot?",
   "What does a team give up by choosing Autopilot over Standard, and when would that matter?",
   "When would you steer a team away from GKE altogether and toward Cloud Run?"
  ],
  "exit": [
   [
    "Who manages the control plane in GKE Standard and in GKE Autopilot?",
    "Google manages it in both modes."
   ],
   [
    "How is Autopilot billed differently from Standard?",
    "Autopilot bills for the CPU, memory and storage pods request; Standard bills for the node VMs whether or not they are fully used."
   ],
   [
    "What does Kubernetes do when a node fails?",
    "It notices the actual state no longer matches the desired state and reschedules the lost pods onto healthy nodes."
   ]
  ],
  "differentiation": [
   "Support: Give students a pre-filled responsibility table with two blanks per column and a glossary card for cluster, node, pod and control plane.",
   "Extend: Ask fast finishers to argue, in a short paragraph, whether a company with 40 microservices and spiky traffic should choose GKE Autopilot or Cloud Run, naming at least two deciding factors."
  ]
 },
 {
  "t": "Serverless computing: Cloud Run, Cloud Run functions and App Engine",
  "objectives": [
   "Students will be able to define serverless computing and its three key characteristics.",
   "Students will be able to compare Cloud Run, Cloud Run functions and App Engine and the workloads each suits.",
   "Students will be able to identify workloads for which serverless is a poor fit and explain why.",
   "Students will be able to match event-driven and request-driven scenarios to the appropriate serverless service."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the car-ownership warm-up question and list the costs and chores of owning a car versus ride-hailing."
   ],
   [
    13,
    "Teach",
    "Define serverless with its three characteristics and explain scale to zero and cold starts. Introduce each service with one example, and draw an event flow: photo upload to Cloud Storage triggers a function that writes a thumbnail, while a Cloud Run API serves the website."
   ],
   [
    17,
    "Activity",
    "Run the trigger-and-service matching relay described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore limits of serverless."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "List everything you pay for and worry about when you own a car. Now list what you pay for and worry about when you use a ride-hailing app. Which costs disappear, and what do you give up?",
  "activity": {
   "title": "Serverless matching relay",
   "materials": "Printed scenario cards (about 15) describing workloads, three labeled baskets or whiteboard zones (Cloud Run, Cloud Run functions, App Engine) plus a fourth zone labeled 'Not serverless', and a timer.",
   "steps": [
    "Split the class into teams of four and give each team an identical shuffled deck of scenario cards, such as 'resize images when uploaded', 'containerized partner API with spiky traffic', 'licensed software that needs a custom kernel' and 'existing web app using traffic splitting'.",
    "Teams take turns sending one member to place a card in a zone and say one reason out loud. Teammates may challenge and move a card once.",
    "After all cards are placed, the teacher reveals the answers. Teams score a point for each correct placement and a bonus point for a correct reason on the 'Not serverless' cards.",
    "Close by asking each team for one clue word they will use on exam day, and list them on the board."
   ]
  },
  "discussion": [
   "Why does scale to zero matter so much for small organizations and spiky workloads?",
   "What design changes might an application need before it can run well on a serverless platform?",
   "If Cloud Run is often the default for new services, why do some teams still choose App Engine or GKE?"
  ],
  "exit": [
   [
    "Name the three characteristics of serverless computing.",
    "No servers to manage, automatic scaling including to zero, and pay-per-use pricing."
   ],
   [
    "A team wants to run a small piece of code whenever a file lands in a Cloud Storage bucket. Which service?",
    "Cloud Run functions."
   ],
   [
    "Give one workload for which serverless is a poor fit.",
    "One needing full OS or kernel control, special hardware, server-bound licensing or constant always-on heavy processing."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision flowchart with three questions (Is it triggered by an event? Is it a container? Does it need OS control?) that leads to the right service, and pair struggling students with a partner for the relay.",
   "Extend: Ask fast finishers to design an event-driven order pipeline for an online store using Cloud Run, Cloud Run functions, Pub/Sub and Cloud Storage, and explain how each piece scales independently."
  ]
 },
 {
  "t": "Choosing compute for a workload: VMs vs containers vs serverless",
  "objectives": [
   "Students will be able to place Compute Engine, GKE and serverless options on the control-versus-management spectrum.",
   "Students will be able to list requirements that point to VMs, to GKE and to serverless.",
   "Students will be able to apply the 'most managed option that meets the requirements' rule to workload scenarios.",
   "Students will be able to justify a mixed compute strategy for an organization with several workloads."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the housing warm-up question and draw a line from 'own a house' to 'stay in a hotel' with student answers placed along it."
   ],
   [
    12,
    "Teach",
    "Redraw the line as the compute spectrum: Compute Engine, GKE Standard, GKE Autopilot, Cloud Run, Cloud Run functions. Under each, list the signals that point to it. Introduce the three-question decision sequence and the specialist options."
   ],
   [
    18,
    "Activity",
    "Run the architecture review board activity described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to examine trade-offs and mixed strategies."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If you were moving to a new city for one week, one year or the rest of your life, would you choose a hotel, an apartment or a house? What changes your answer?",
  "activity": {
   "title": "Architecture review board",
   "materials": "Printed workload cards (each listing requirements such as licensing, traffic pattern, team size, need for portability), a large printed or whiteboard compute spectrum, sticky notes and markers.",
   "steps": [
    "Form groups of four. Each group receives four workload cards and must place each one on the compute spectrum using sticky notes that state the deciding requirement.",
    "Groups then swap cards with a neighboring group, which acts as a review board and must either approve each placement or challenge it with a specific requirement the first group missed.",
    "Challenged groups respond in one sentence, defending or changing their choice, using the 'most managed option that meets the requirements' rule.",
    "The teacher reviews any contested cards with the whole class, highlighting clue phrases such as 'kernel', 'licensed per server', 'microservices across clouds' and 'spiky traffic'."
   ]
  },
  "discussion": [
   "Why might choosing a more managed option save money even if its unit price looks higher?",
   "What are the risks of choosing a platform because it is popular rather than because the workload needs it?",
   "How might a workload move along the compute spectrum over several years?"
  ],
  "exit": [
   [
    "A workload needs a custom kernel setting. Which compute option fits?",
    "Compute Engine VMs, because they provide full OS control."
   ],
   [
    "When is GKE a better choice than Cloud Run?",
    "When the application needs Kubernetes features, such as many cooperating microservices, complex networking, stateful workloads or portability using Kubernetes across environments."
   ],
   [
    "State the general rule for choosing compute.",
    "Use the most managed option that meets the requirements."
   ]
  ],
  "differentiation": [
   "Support: Give students the three-question decision sequence as a printed flowchart and let them work through their workload cards with it before the review board swap.",
   "Extend: Ask fast finishers to take one workload and describe how it could move across the spectrum over three years, from VMs to GKE to Cloud Run, naming what would have to change at each step."
  ]
 },
 {
  "t": "Monoliths vs microservices and application modernization",
  "objectives": [
   "Students will be able to describe monolithic and microservices architectures and the problems large monoliths cause.",
   "Students will be able to compare the benefits and costs of microservices and decide when each architecture fits.",
   "Students will be able to explain the strangler pattern for gradual modernization.",
   "Students will be able to explain how CI/CD, infrastructure as code and DevOps support modernization goals."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the group project warm-up question and record answers about bottlenecks when everyone must finish before anyone can submit."
   ],
   [
    13,
    "Teach",
    "Draw a monolith as one large box with features inside, then the same features as separate boxes connected by API arrows. Walk through deploying a fix and a single feature failing in each. List the costs of microservices. Then draw the strangler pattern in three stages."
   ],
   [
    17,
    "Activity",
    "Run the strangler pattern whiteboard exercise described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to weigh when microservices are worth their complexity."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "In a group project where everyone's work is stapled into one report, what happens when one person is late or makes a mistake? How would things change if each person submitted their own section separately?",
  "activity": {
   "title": "Strangle the monolith",
   "materials": "Whiteboard or large paper per group, sticky notes in two colors, markers and a printed one-page description of a fictional monolithic online store with six features and their pain points.",
   "steps": [
    "In groups of three or four, students draw the monolith as one big box and write each feature on a sticky note inside it. They mark the features that change most often or cause the most outages.",
    "Groups draw an API layer in front of the monolith and decide the order in which to carve features out into new services, moving sticky notes outside the box one at a time and drawing routing arrows. They must justify the first two moves with business reasons.",
    "For each extracted service, groups choose where it will run (Cloud Run or GKE) and note one new operational cost it introduces, such as monitoring or network calls.",
    "Groups present their sequence in one minute. The teacher highlights common good choices, such as starting with a frequently changing, loosely connected feature."
   ]
  },
  "discussion": [
   "Why might a company decide to keep part of its monolith running for years?",
   "Which is harder to change in an organization: the architecture or the release practices and culture? Why?",
   "How would you explain the business value of microservices to a finance director in two sentences?"
  ],
  "exit": [
   [
    "Name two benefits of microservices.",
    "Independent deployment, independent scaling and fault isolation (any two)."
   ],
   [
    "What does the strangler pattern do?",
    "It gradually moves features from a legacy system into new services until the old system can be retired."
   ],
   [
    "Why is CI/CD important for modernization?",
    "It automates building, testing and deploying each change, so teams can release small changes frequently and safely."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed strangler diagram with the API layer and first extracted service already drawn, and a word bank of benefits and costs.",
   "Extend: Ask fast finishers to identify which feature in the fictional store should stay in the monolith longest and explain the data or dependency reasons."
  ]
 },
 {
  "t": "APIs and API management with Apigee",
  "objectives": [
   "Students will be able to define an API and explain how APIs support digital transformation.",
   "Students will be able to list the main capabilities of API management.",
   "Students will be able to explain how Apigee works as a proxy layer and why decoupling supports modernization.",
   "Students will be able to identify scenarios in which Apigee is the appropriate solution."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Use the restaurant warm-up and draw the customer, waiter, menu and kitchen, labeling them consumer, API, contract and back end."
   ],
   [
    13,
    "Teach",
    "Explain the three business roles of APIs. Then add a reception desk in front of the kitchen and list the API management capabilities one by one. Show how the kitchen can be rebuilt behind the desk without customers noticing."
   ],
   [
    17,
    "Activity",
    "Run the API gateway role-play described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore API business models and governance."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "When you order food at a restaurant, why don't you walk into the kitchen and cook it yourself? What does the menu and the waiter do for you and for the kitchen?",
  "activity": {
   "title": "API gateway role-play",
   "materials": "Printed request slips, printed 'API key' cards for some students, a whiteboard tally for quotas and analytics, and a simple printed policy sheet (valid keys, three requests per minute per partner).",
   "steps": [
    "Assign roles: one student is the legacy back end that can answer only one request every ten seconds, two students are the Apigee proxy with the policy sheet, and the rest are partner apps, some with valid API keys and some without.",
    "Partners send request slips to the proxy. The proxy rejects requests without valid keys, enforces the per-partner quota, tallies usage on the whiteboard and passes allowed requests to the back end.",
    "Run a second round with no proxy, letting all partners go straight to the back end, and observe the overload. Then restore the proxy.",
    "Finally, swap the back-end student for a new one representing a modernized system while the proxy stays the same. Debrief on which API management capability each step demonstrated and why partners did not notice the swap."
   ]
  },
  "discussion": [
   "What new business opportunities could a company you know create by offering APIs to partners?",
   "What risks does an organization take on when it exposes APIs to outside developers, and how does API management reduce them?",
   "Why might stable API contracts be more important to partners than new features?"
  ],
  "exit": [
   [
    "What is an API?",
    "A defined way for one piece of software to request data or actions from another."
   ],
   [
    "Name three capabilities of API management.",
    "Security, rate limiting and quotas, analytics, versioning, developer portals and monetization (any three)."
   ],
   [
    "A company wants to share services securely with partners, limit their request rates and analyze usage. Which Google Cloud product fits?",
    "Apigee."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled picture of the restaurant analogy mapped to API terms, and a matching card set pairing each API management capability with a short scenario.",
   "Extend: Ask fast finishers to design a three-tier API product for a fictional company, specifying quotas, who can sign up, what analytics they would watch and how the API protects a legacy back end."
  ]
 },
 {
  "t": "Hybrid and multicloud with GKE Enterprise (formerly Anthos)",
  "objectives": [
   "Students will be able to define hybrid cloud and multicloud and give business reasons for each.",
   "Students will be able to explain how GKE Enterprise provides consistent management through fleets, policy as code and service mesh.",
   "Students will be able to distinguish GKE Enterprise from connectivity services such as Cloud Interconnect and Cloud VPN and from BigQuery Omni.",
   "Students will be able to recommend GKE Enterprise for appropriate hybrid and multicloud scenarios."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the multiple-houses warm-up question and collect the problems students list."
   ],
   [
    13,
    "Teach",
    "Draw four environments (data center, Google Cloud, another cloud, factory edge) each with its own cluster. Show the inconsistency problem, then draw GKE Enterprise above them with a fleet, a Git repository of policies feeding every cluster and a service mesh between services. Finish with Interconnect, VPN and BigQuery Omni as related but different tools."
   ],
   [
    17,
    "Activity",
    "Run the policy drift audit described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the technology to business strategy."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Imagine your family owns four houses in different towns, each with a different alarm system, lock type and house rules. What problems would you run into keeping them all safe, and what would you want from a single control system?",
  "activity": {
   "title": "Policy drift audit",
   "materials": "Printed cluster cards (about eight) each listing a location and its current settings, one printed 'central policy' sheet, highlighters and a whiteboard.",
   "steps": [
    "Give each group of three a set of cluster cards representing factories, a data center, Google Cloud and another cloud. Some cards deliberately violate the central policy, for example missing encryption between services or an outdated configuration.",
    "Groups act as auditors, highlighting every setting that differs from the central policy and timing how long the manual audit takes.",
    "The teacher then explains that with GKE Enterprise, the central policy lives in a Git repository and every cluster in the fleet is reconciled to it automatically. Groups rewrite one violating card as it would look after reconciliation.",
    "Groups list on the whiteboard which GKE Enterprise capability addresses each violation (fleet visibility, policy as code, service mesh) and the teacher confirms or corrects."
   ]
  },
  "discussion": [
   "What business reasons might lead a company to use more than one cloud provider, and what does that cost in operations?",
   "Why is storing policies in a Git repository better than configuring each cluster by hand?",
   "When might a company choose not to adopt hybrid or multicloud at all?"
  ],
  "exit": [
   [
    "Which Google Cloud platform provides consistent management of Kubernetes clusters across on-premises and multiple clouds?",
    "GKE Enterprise (formerly Anthos)."
   ],
   [
    "What is policy as code?",
    "Defining configuration and security policies in version-controlled files that are applied automatically to every cluster."
   ],
   [
    "A company needs a private network connection between its data center and Google Cloud. Which service fits, and why is it not GKE Enterprise?",
    "Cloud Interconnect (or Cloud VPN); it provides connectivity, while GKE Enterprise manages clusters and policies."
   ]
  ],
  "differentiation": [
   "Support: Provide a sorting sheet with scenarios to label as 'management' (GKE Enterprise), 'connectivity' (Interconnect or VPN) or 'analytics across clouds' (BigQuery Omni) before the audit activity.",
   "Extend: Ask fast finishers to write a short recommendation to a CIO explaining how GKE Enterprise would support integrating a newly acquired company running in another cloud, including one risk and how to manage it."
  ]
 },
 {
  "t": "Core security concepts: confidentiality, integrity, availability, privacy, control and compliance",
  "objectives": [
   "Students will be able to define confidentiality, integrity and availability and classify incidents by the property affected.",
   "Students will be able to distinguish privacy from security and explain why secure data can still violate privacy.",
   "Students will be able to explain what control means in the cloud and name Google Cloud features that support it.",
   "Students will be able to explain why compliance is necessary but not sufficient for security."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the three Summit Ridge incidents aloud and ask students to guess what each has in common and how each is different."
   ],
   [
    12,
    "Teach",
    "Draw the CIA triangle and add one incident and two controls to each corner. Then add three boxes beside it for privacy, control and compliance, each with a definition and a Google Cloud or legal example. Stress that compliance is a floor, not a finish line."
   ],
   [
    18,
    "Activity",
    "Run the incident classification card sort described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore privacy versus security and compliance versus security."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A customer sees someone else's bank statement, a payment amount changes overnight, and staff cannot log in to the loan system. Are these the same kind of problem? Write one word that describes what went wrong in each.",
  "activity": {
   "title": "Incident and requirement card sort",
   "materials": "Printed cards with short incidents and requirements (about 18), six labeled zones on the whiteboard (Confidentiality, Integrity, Availability, Privacy, Control, Compliance), and sticky notes.",
   "steps": [
    "In pairs, students sort cards such as 'storage bucket readable by anyone', 'invoice total altered', 'website flooded with traffic', 'customer data kept years after account closure', 'regulator requires customer-held encryption keys' and 'annual PCI DSS assessment' into the six zones.",
    "For each card, pairs write one control or Google Cloud feature on a sticky note that would prevent or address it, such as least-privilege access, audit logs, multi-zone redundancy, a data retention policy, customer-managed keys or an audit report.",
    "Include two cards that belong to more than one zone, such as ransomware that steals and encrypts data. Pairs must place them on a boundary and explain why.",
    "The class reviews the board together. The teacher corrects misplacements and highlights the privacy and compliance cards, asking whether strong security alone would have solved them."
   ]
  },
  "discussion": [
   "Can you think of a situation where an organization is fully compliant but still not secure? What would cause that gap?",
   "Why might privacy failures damage customer trust even when no attacker was involved?",
   "Why do regulated organizations care so much about who holds the encryption keys?"
  ],
  "exit": [
   [
    "A configuration file is changed without authorization. Which CIA property is affected?",
    "Integrity."
   ],
   [
    "Give an example of data that is secure but whose use violates privacy.",
    "Well-protected personal data that is shared with advertisers or kept longer than allowed without the individuals' consent."
   ],
   [
    "Name one Google Cloud feature that increases customer control over data.",
    "Customer-managed encryption keys, data location choices or Access Transparency."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page reference with each term, a one-line definition, a question it answers (Who can see it? Has it changed? Can we use it?) and one example, to use during the card sort.",
   "Extend: Ask fast finishers to write a short board briefing for the Summit Ridge scenario that classifies each incident, names one control for each and explains why passing an audit would not have prevented them."
  ]
 },
 {
  "t": "Cloud security vs on-premises security, and shared responsibility for security",
  "objectives": [
   "Students will be able to list the security layers an on-premises organization must handle itself.",
   "Students will be able to explain which security responsibilities Google holds and which always remain with the customer.",
   "Students will be able to compare how customer responsibilities change across IaaS, PaaS and SaaS.",
   "Students will be able to describe what Google Cloud means by shared fate."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the whiteboard, grouping them into physical, technical and people tasks."
   ],
   [
    12,
    "Teach",
    "Draw a stack from building and hardware up to data and identities. Shade the layers Google owns, then show how the shading changes for IaaS, PaaS and SaaS. Explain identity as the new perimeter and introduce shared fate."
   ],
   [
    18,
    "Activity",
    "Run the responsibility sort described below, then review each group's grid against the teacher's key."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore why misconfiguration remains common even on a secure platform."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If your school moved all of its files to a cloud provider tomorrow, which security jobs would the school's IT staff no longer need to do, and which would they still have?",
  "activity": {
   "title": "Who owns this task? Responsibility sort",
   "materials": "Printed task cards (about 15), a whiteboard grid with columns IaaS, PaaS/serverless and SaaS and rows Google and Customer, sticky tape or sticky notes.",
   "steps": [
    "Prepare cards such as 'Guard the data center entrance', 'Patch the guest OS', 'Decide who can read the sales data', 'Replace failed disks', 'Set sharing settings on documents', 'Write firewall rules for VMs'.",
    "In groups of three or four, students place each card in the correct cell for each service model, writing on sticky notes when a card belongs in more than one column.",
    "Groups compare their grid with a neighboring group and flag any disagreements.",
    "The teacher reveals the key and asks groups to explain why data, identity and configuration cards stayed on the customer row in every column."
   ]
  },
  "discussion": [
   "If Google's infrastructure is so well protected, why do cloud data exposures still happen?",
   "How might a security team's daily work change after moving from a data center to the cloud?"
  ],
  "exit": [
   [
    "Name two security responsibilities that always stay with the customer.",
    "Its data, identities and access, and the configuration of the services it uses (any two)."
   ],
   [
    "A team moves from Compute Engine to Cloud Run. Which responsibility moves to Google?",
    "Securing and patching the operating system and runtime."
   ],
   [
    "What is shared fate?",
    "Google Cloud's approach of actively helping customers secure their workloads with secure defaults, blueprints, recommendations and tools such as Security Command Center."
   ]
  ],
  "differentiation": [
   "Support: Give students a partially completed grid with the Google row already filled in for IaaS, so they only need to reason about how it changes for the other models.",
   "Extend: Ask fast finishers to write a one-paragraph briefing for a board explaining why moving to the cloud does not end the need for a security team."
  ]
 },
 {
  "t": "Common cloud threats: misconfiguration, compromised credentials, phishing, malware and ransomware",
  "objectives": [
   "Students will be able to define misconfiguration, compromised credentials, phishing, malware and ransomware.",
   "Students will be able to identify the threat type from a short incident description.",
   "Students will be able to match each threat to its most effective defenses, such as organization policies, keyless authentication, security keys and protected backups.",
   "Students will be able to explain why most cloud incidents arise on the customer side of shared responsibility."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers. Point out how many involve people and settings rather than broken technology."
   ],
   [
    12,
    "Teach",
    "Walk through each threat with one realistic example and one or two defenses. Emphasize that these sit on the customer side of the shared responsibility line."
   ],
   [
    18,
    "Activity",
    "Run the incident triage cards activity below, with each group presenting one card."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare people-focused and technology-focused defenses."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Think of a time you or someone you know received a suspicious email or text. What made it look real, and what gave it away?",
  "activity": {
   "title": "Incident triage cards",
   "materials": "Printed incident cards (about 10), a whiteboard table with columns Threat type, Early warning sign and Best defense, markers.",
   "steps": [
    "Prepare short fictional incident cards, such as 'Bill spikes overnight after code pushed to a public repository' or 'Files on a shared drive renamed and a payment note appears'.",
    "Groups of three draw two cards each and decide the threat type, the first sign someone could have noticed, and the defense that would most reduce the damage.",
    "Each group writes its answers for one card in the whiteboard table and explains them in under a minute.",
    "The teacher highlights cards where more than one threat applies, such as phishing leading to ransomware, to show why defense in depth matters."
   ]
  },
  "discussion": [
   "Is it better for an organization to spend more on technology controls or on staff training against phishing, and why?",
   "Why might an organization be tempted to pay a ransom, and what preparation removes that temptation?"
  ],
  "exit": [
   [
    "A storage bucket is accidentally left publicly readable. Which threat category is this?",
    "Misconfiguration."
   ],
   [
    "What makes security keys more effective than passwords alone against phishing?",
    "They only authenticate to the genuine site, so a password captured by a fake page is not enough to sign in."
   ],
   [
    "Name the defense that lets an organization recover from ransomware without paying.",
    "Backups that attackers cannot alter or delete."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference sheet with each threat, a one-line definition and its top defense so students can match cards to it during the activity.",
   "Extend: Ask fast finishers to write a short fictional incident that chains two threats together, then list the layered controls that would have broken the chain."
  ]
 },
 {
  "t": "Zero trust and defense in depth",
  "objectives": [
   "Students will be able to explain why the castle-and-moat perimeter model fits poorly with cloud and remote work.",
   "Students will be able to describe how a zero trust access decision uses identity, device and context.",
   "Students will be able to identify Google's zero trust offerings, including BeyondCorp, Identity-Aware Proxy and Chrome Enterprise Premium.",
   "Students will be able to design a set of independent defense-in-depth layers for a cloud workload."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch a castle and moat on the board as students answer."
   ],
   [
    12,
    "Teach",
    "Contrast the perimeter model with zero trust using the phished laptop scenario. Walk through a single IAP access decision step by step, then introduce defense in depth with a layered diagram."
   ],
   [
    18,
    "Activity",
    "Run the layered defense build described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to probe trade-offs between security and convenience."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "In a castle protected by a moat and a single gate, what happens once an enemy gets past the gate? How is that like a company network?",
  "activity": {
   "title": "Peel the onion: layered defense build",
   "materials": "Whiteboard, sticky notes in two colors, printed attacker cards describing an attacker's next move.",
   "steps": [
    "Draw concentric rings on the whiteboard around a box labeled 'Customer data'.",
    "In groups, students write one Google Cloud control per sticky note, such as 2SV, IAM least privilege, firewall rules, Cloud Armor, encryption, VPC Service Controls, audit logs and backups, and place each on a ring.",
    "The teacher reads attacker cards such as 'Attacker has stolen a password' or 'Attacker bypassed the firewall'. Groups point to the next layer that still stops the attacker.",
    "Groups add a second-color sticky note wherever a layer depends on the same weakness as another, and discuss how to make the layers more independent."
   ]
  },
  "discussion": [
   "What might employees find inconvenient about zero trust, and how could an organization reduce that friction?",
   "Can an organization have too many layers of defense? What would be the signs?"
  ],
  "exit": [
   [
    "What does 'never trust, always verify' mean in zero trust?",
    "No request is trusted because of network location; every request is checked using identity, device state and context."
   ],
   [
    "Which Google Cloud service checks identity and context before allowing access to an application or VM?",
    "Identity-Aware Proxy (IAP)."
   ],
   [
    "An attacker steals a password but cannot sign in because of a security key. Which principle does this illustrate?",
    "Defense in depth, since a second independent layer stopped the attacker after the first failed."
   ]
  ],
  "differentiation": [
   "Support: Provide a pre-labeled list of controls for the activity so students focus on placing and ordering layers rather than recalling names.",
   "Extend: Ask fast finishers to write the policy for a single IAP access decision in plain English, naming the identity, device and context conditions it would require."
  ]
 },
 {
  "t": "Google's secure infrastructure: data centers, custom hardware, Titan chips and the private network",
  "objectives": [
   "Students will be able to name the main layers of Google's infrastructure security, from physical to operational.",
   "Students will be able to explain what a hardware root of trust is and the role of the Titan chip.",
   "Students will be able to describe how Shielded VMs extend boot integrity to customer VMs.",
   "Students will be able to explain to a non-technical stakeholder which protections a customer inherits and which it must still provide."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student ideas for protecting a building full of servers."
   ],
   [
    13,
    "Teach",
    "Present the layers bottom-up: physical, hardware and boot (Titan), service and network, operational, storage. For each, give one concrete detail and one reason it matters to a customer."
   ],
   [
    17,
    "Activity",
    "Run the auditor role-play described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect inherited protections to customer responsibilities."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "If you were in charge of protecting a building full of computers that held millions of people's data, what would you put in place, from the fence to the hard drives?",
  "activity": {
   "title": "Answer the auditor role-play",
   "materials": "Printed auditor question cards (about 8), a projector showing a simple layer diagram, paper for notes.",
   "steps": [
    "Prepare auditor cards such as 'Who can enter the server floor?', 'How do you know a server has not been tampered with?', 'What happens to a failed drive?' and 'Does our traffic cross the public internet?'.",
    "Pair students: one plays the auditor and reads a card, the other answers as the bank's cloud lead in plain language, naming the infrastructure layer involved.",
    "Pairs swap roles after four cards.",
    "The teacher closes by reading a final card, 'So our data is completely secure, then?', and asks the class to explain what remains the bank's responsibility."
   ]
  },
  "discussion": [
   "Why might a company trust hardware it designed itself more than hardware it bought off the shelf?",
   "Which of these infrastructure protections would be hardest for a small company to provide on its own, and why?"
  ],
  "exit": [
   [
    "What is a hardware root of trust?",
    "A trusted hardware component, such as the Titan chip, that verifies the system boots with legitimate, unmodified firmware and software."
   ],
   [
    "Name two physical security measures at Google data centers.",
    "Perimeter fencing, guards, vehicle barriers, cameras, badges, biometric checks or restricted access to sensitive areas (any two)."
   ],
   [
    "Which Compute Engine feature provides secure boot and integrity monitoring?",
    "Shielded VMs."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page layer diagram with a key phrase for each layer to use during the role-play.",
   "Extend: Ask fast finishers to write a short memo to a board explaining how inherited infrastructure protections change what the company's own security budget should focus on."
  ]
 },
 {
  "t": "Encryption at rest and in transit, and key management with Cloud KMS",
  "objectives": [
   "Students will be able to distinguish encryption at rest from encryption in transit and state that both are on by default in Google Cloud.",
   "Students will be able to explain envelope encryption in plain language.",
   "Students will be able to compare Google-managed keys, CMEK, Cloud HSM, Cloud EKM and CSEK by where the key lives and who controls it.",
   "Students will be able to recommend a key option for a scenario and explain the trade-off between control and risk."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers about who should hold the spare key."
   ],
   [
    12,
    "Teach",
    "Explain at rest versus in transit with examples. Draw envelope encryption as a locked box inside another locked box. Then draw the key spectrum from Google-managed to CSEK on the board, noting where each key lives."
   ],
   [
    18,
    "Activity",
    "Run the key option match-up described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to examine the trade-off between control and risk."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "If you lock your bike with a combination lock, who else should know the combination? What happens if you forget it and nobody else knows?",
  "activity": {
   "title": "Who holds the key? Scenario match-up",
   "materials": "Printed scenario cards (about 8), five column headers on the whiteboard (Google-managed, CMEK, Cloud HSM, Cloud EKM, CSEK), sticky tape.",
   "steps": [
    "Prepare scenario cards such as 'A startup with no special regulations', 'A bank that must rotate keys every 90 days and be able to disable them', 'An agency that forbids the provider from ever holding keys' and 'A firm that requires keys in tamper-resistant hardware'.",
    "In pairs, students tape each card under the key option that fits best and write one sentence of justification on it.",
    "The class reviews each column; the teacher asks for each card where the key lives and who could make the data unreadable.",
    "Finish by asking pairs to name the scenario where too much control would create unnecessary risk, and why."
   ]
  },
  "discussion": [
   "Why might most organizations choose the default Google-managed keys even if they could manage their own?",
   "Who inside an organization should be allowed to destroy an encryption key, and what checks should be in place?"
  ],
  "exit": [
   [
    "Is encryption at rest on by default in Google Cloud?",
    "Yes. All customer data is encrypted at rest by default with no action needed."
   ],
   [
    "Which option lets a customer control rotation and disable keys while keeping them in Google Cloud?",
    "Customer-managed encryption keys (CMEK) in Cloud KMS."
   ],
   [
    "What happens if a customer destroys a CMEK key that protects a dataset?",
    "The data protected by that key becomes unreadable and cannot be recovered, even by Google."
   ]
  ],
  "differentiation": [
   "Support: Provide a simple table with columns 'Where the key lives' and 'Who manages it' for each option, and let students use it during the match-up.",
   "Extend: Ask fast finishers to draft a short key management policy for a fictional hospital covering which data uses CMEK, rotation frequency and who may disable keys."
  ]
 },
 {
  "t": "Identity and access management: principals, roles, least privilege and two-step verification",
  "objectives": [
   "Students will be able to identify the types of principals in Google Cloud, including users, groups and service accounts.",
   "Students will be able to distinguish basic, predefined and custom roles and explain how roles are granted through allow policies.",
   "Students will be able to apply least privilege to choose a role and scope for a given job.",
   "Students will be able to explain why phishing-resistant 2SV, such as security keys, is the strongest second factor."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and note examples of access that was too broad or too narrow."
   ],
   [
    12,
    "Teach",
    "Introduce principal, role and resource with the hotel key card example. Show the three role types and how inheritance in the resource hierarchy works. Finish with 2SV options ranked by phishing resistance."
   ],
   [
    18,
    "Activity",
    "Run the least-privilege access review described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore the tension between convenience and least privilege."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Have you ever had access to something at school or work that you did not need, or been blocked from something you did need? What went wrong in each case?",
  "activity": {
   "title": "Least-privilege access review",
   "materials": "Printed 'current access' sheets listing fictional people, their jobs and their current roles and scopes; a printed list of example predefined roles; whiteboard.",
   "steps": [
    "Hand each group a sheet listing grants such as 'Ana, data analyst: Editor on the organization' or 'Billing app: Owner on the production project'.",
    "Groups mark each grant as appropriate or excessive and rewrite excessive ones with a narrower role, a smaller scope and, where sensible, a group as the principal.",
    "Groups also flag which accounts should be required to use a security key.",
    "Each group presents two rewrites; the class votes on whether each truly follows least privilege, and the teacher highlights any that rely on basic roles."
   ]
  },
  "discussion": [
   "Teams often grant broad roles because it is faster. How could an organization make least privilege easier to follow?",
   "Why might service accounts be a bigger risk than human accounts in some organizations?"
  ],
  "exit": [
   [
    "Name the three kinds of IAM roles.",
    "Basic, predefined and custom."
   ],
   [
    "A contractor needs to view objects in one bucket. What grant follows least privilege?",
    "A predefined role such as Storage Object Viewer on that bucket only, preferably through a group, removed when no longer needed."
   ],
   [
    "Why do security keys resist phishing?",
    "They only authenticate to the genuine site, so a fake page cannot capture a usable second factor."
   ]
  ],
  "differentiation": [
   "Support: Provide a cheat sheet mapping common jobs to example predefined roles so students can focus on scope and principal choices.",
   "Extend: Ask fast finishers to design a separation-of-duties rule for production deployments and explain which groups would hold which roles."
  ]
 },
 {
  "t": "Network and perimeter security: firewall rules, Cloud Armor and VPC Service Controls",
  "objectives": [
   "Students will be able to explain the purpose of VPC firewall rules and apply deny-by-default thinking.",
   "Students will be able to describe how Cloud Armor provides DDoS protection and WAF capabilities at Google's edge.",
   "Students will be able to explain how VPC Service Controls reduces data exfiltration risk beyond what IAM provides.",
   "Students will be able to select the right network control for a given threat scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record the different 'gates' students suggest."
   ],
   [
    12,
    "Teach",
    "Draw a simple architecture: users, Cloud Armor, external load balancer, VMs in a VPC, and BigQuery inside a dashed service perimeter. Explain what each control blocks, and contrast IAM with a service perimeter."
   ],
   [
    18,
    "Activity",
    "Run the place-the-control architecture exercise described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect network controls to zero trust and defense in depth."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "A concert venue has fans, staff, performers and delivery drivers arriving. How many different kinds of gates or checks would you set up, and why not just one?",
  "activity": {
   "title": "Place the control: architecture exercise",
   "materials": "Projector or whiteboard showing a simple architecture diagram, printed control cards (firewall rules, Cloud Armor, VPC Service Controls, Private Google Access, Cloud VPN), printed threat cards.",
   "steps": [
    "Show an architecture with a public website, VMs running an app, BigQuery holding customer data and an on-premises office.",
    "Groups draw threat cards such as 'Flood of traffic from many addresses', 'SQL injection in a search form', 'Stolen credential copying tables to a personal project', 'SSH open to the whole internet' and 'Office needs encrypted connection to the VPC'.",
    "For each threat, groups place the matching control card on the diagram at the point where it acts and write one sentence explaining why.",
    "The teacher reviews placements and asks which threats would still succeed if only IAM were in place."
   ]
  },
  "discussion": [
   "If identity is the main perimeter in zero trust, why do organizations still invest in network controls?",
   "What might go wrong for legitimate users if a service perimeter is drawn too tightly?"
  ],
  "exit": [
   [
    "Which Google Cloud service provides DDoS protection and a web application firewall for apps behind external load balancers?",
    "Cloud Armor."
   ],
   [
    "A stolen but valid credential is used to copy BigQuery data to an outside project. Which control would block this?",
    "VPC Service Controls."
   ],
   [
    "What should a firewall rule allowing all ports from every internet address be replaced with?",
    "Narrow rules that allow only the needed ports from the needed sources, with everything else denied by default."
   ]
  ],
  "differentiation": [
   "Support: Give students a three-row reference table (firewall rules, Cloud Armor, VPC Service Controls) with 'protects what' and 'from what' columns to use during the activity.",
   "Extend: Ask fast finishers to sketch a layered design for a healthcare app using at least five network and identity controls and justify the order in which an attacker would meet them."
  ]
 },
 {
  "t": "Security operations: Security Command Center, audit logs and Google Security Operations",
  "objectives": [
   "Students will be able to describe the four kinds of findings Security Command Center provides.",
   "Students will be able to distinguish the four types of Cloud Audit Logs and state which is always on.",
   "Students will be able to explain what SIEM and SOAR mean and how Google Security Operations combines them.",
   "Students will be able to choose the right tool to answer an investigation question."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list students' ideas for the evidence they would want after an incident."
   ],
   [
    12,
    "Teach",
    "Present Security Command Center's four categories with examples, then the four audit log types in a table, highlighting that Admin Activity cannot be disabled. Close with SIEM, SOAR and Google Security Operations."
   ],
   [
    18,
    "Activity",
    "Run the night-shift log investigation described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore logging costs and automation."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "If something went missing from your classroom overnight, what records or evidence would you want to look at the next morning?",
  "activity": {
   "title": "Night-shift log investigation",
   "materials": "Printed fictional Security Command Center findings and a page of simplified audit log entries (principal, method, resource, time), highlighters, whiteboard.",
   "steps": [
    "Give pairs a scenario: a bucket became public and a VM started cryptomining overnight, plus a findings sheet and a page of about 15 simplified log entries.",
    "Pairs highlight the entries that explain the incident, identify the account responsible, and label each entry with its audit log type.",
    "Pairs write a three-line incident summary: what happened, who or what did it, and the first containment steps.",
    "The class compares summaries; the teacher asks what evidence would be missing if Data Access logs had been off, and when a SOAR playbook could have responded automatically."
   ]
  },
  "discussion": [
   "Data Access audit logs can be large and costly to keep. How should an organization decide where to enable them?",
   "Which response steps would you be comfortable automating with SOAR, and which should always involve a person?"
  ],
  "exit": [
   [
    "Which audit log type records IAM policy changes and is always on?",
    "Admin Activity audit logs."
   ],
   [
    "Name two kinds of findings in Security Command Center.",
    "Misconfigurations, vulnerabilities, threats or asset inventory (any two)."
   ],
   [
    "What is Google Security Operations?",
    "A cloud-native security operations platform that combines SIEM and SOAR across cloud, on-premises and other sources, enriched with Google threat intelligence."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled example of one audit log entry with each field explained before students start the investigation.",
   "Extend: Ask fast finishers to write a simple SOAR playbook in plain English for the cryptomining finding, listing triggers, automated steps and the point where a person approves action."
  ]
 },
 {
  "t": "Data residency, data sovereignty and Assured Workloads",
  "objectives": [
   "Students will be able to distinguish data residency from data sovereignty.",
   "Students will be able to explain how region selection and the resource locations organization policy constraint control and enforce residency.",
   "Students will be able to list the controls Assured Workloads applies for regulated workloads.",
   "Students will be able to recommend residency and sovereignty controls for a regulated scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and note answers about laws, location and control."
   ],
   [
    12,
    "Teach",
    "Define residency and sovereignty with the safe-deposit box analogy. Show region selection, then the resource locations constraint inherited down the hierarchy. Present Assured Workloads and its three main control types."
   ],
   [
    18,
    "Activity",
    "Run the compliance requirements mapping described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore trade-offs of strict sovereignty controls."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "If you stored your diary in a friend's house in another country, whose rules would apply to it, and who could read it?",
  "activity": {
   "title": "Requirement to control mapping",
   "materials": "Printed requirement cards from fictional contracts and regulations, a whiteboard with columns Region choice, Resource locations policy, Encryption key control, Personnel access controls and Assured Workloads, markers.",
   "steps": [
    "Prepare cards such as 'Data must stay in Australia', 'No new project may store data outside the EU', 'The provider must never hold our keys' and 'Only support staff in approved countries may access systems'.",
    "Groups of three place each card under the control that satisfies it, adding notes when more than one control applies.",
    "Each group labels every card as a residency or a sovereignty requirement.",
    "The teacher reviews the board and asks which combination of cards would justify using Assured Workloads rather than separate settings."
   ]
  },
  "discussion": [
   "What might an organization give up, such as access to some products or faster support, in exchange for strict sovereignty controls?",
   "Why is enforcing residency centrally safer than relying on each team to choose the right region?"
  ],
  "exit": [
   [
    "What is the difference between data residency and data sovereignty?",
    "Residency is where data is stored and processed; sovereignty adds which laws apply and who controls and can access the data."
   ],
   [
    "Which organization policy restricts where resources can be created?",
    "The resource locations constraint."
   ],
   [
    "Name two controls Assured Workloads can apply.",
    "Data location restrictions, product restrictions and limits on which Google personnel can provide support (any two)."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column chart with 'Where' (residency) and 'Where plus who and which laws' (sovereignty) to help students classify requirement cards.",
   "Extend: Ask fast finishers to write a short recommendation for a fictional ministry explaining which Google Cloud controls it should combine and why each is needed."
  ]
 },
 {
  "t": "Compliance and transparency: compliance reports, Access Transparency and Google's trust principles",
  "objectives": [
   "Students will be able to explain how third-party audits and Compliance Reports Manager provide evidence of Google Cloud's controls.",
   "Students will be able to summarize Google Cloud's trust principles.",
   "Students will be able to distinguish Access Transparency from Access Approval.",
   "Students will be able to explain why provider certifications do not make a customer automatically compliant."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list what evidence students say they would want."
   ],
   [
    12,
    "Teach",
    "Present the three needs: proof, commitments and visibility. Map each to Compliance Reports Manager, trust principles, and Access Transparency and Access Approval. Draw a timeline showing 'before access' and 'after access'."
   ],
   [
    18,
    "Activity",
    "Run the compliance officer's evidence file activity described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to examine the limits of provider certifications."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "If you were choosing a babysitter for a younger sibling, what evidence would you want before trusting them, and what would you want to know afterward?",
  "activity": {
   "title": "The compliance officer's evidence file",
   "materials": "Printed question cards from a fictional hospital board, printed one-line descriptions of Compliance Reports Manager, the trust principles, Access Transparency and Access Approval, whiteboard.",
   "steps": [
    "Prepare board questions such as 'Has an independent auditor checked their security?', 'Will they use our data for advertising?', 'Will we know if their engineers view patient records?' and 'Can we stop access until we agree?'.",
    "Groups of three match each question to the tool or document that answers it and write the answer as the compliance officer would say it to the board.",
    "Add a trap card: 'Since they are HIPAA-ready, we are compliant, right?' Groups must write a correct response.",
    "Groups read their answers aloud; the teacher corrects any confusion between Access Transparency and Access Approval."
   ]
  },
  "discussion": [
   "Why might a customer choose Access Transparency only and not also turn on Access Approval?",
   "What responsibilities does a customer still have after reviewing a provider's audit reports?"
  ],
  "exit": [
   [
    "Which feature requires customer approval before Google personnel access content?",
    "Access Approval."
   ],
   [
    "Where do customers download Google Cloud certifications and audit reports?",
    "Compliance Reports Manager."
   ],
   [
    "Does running on a PCI DSS-certified platform make a customer's payment system compliant? Why?",
    "No. The certification covers the provider's part; the customer must still configure and operate its own workload compliantly."
   ]
  ],
  "differentiation": [
   "Support: Give students a before-and-after timeline graphic showing where Access Approval and Access Transparency act, to use while matching cards.",
   "Extend: Ask fast finishers to draft a one-page vendor assessment checklist that a hospital could use when evaluating any cloud provider, referencing the kinds of evidence covered in the lesson."
  ]
 },
 {
  "t": "Cloud financial governance and FinOps: shared accountability for cloud cost",
  "objectives": [
   "Students will be able to explain why cloud spending requires continuous governance compared with on-premises purchasing.",
   "Students will be able to describe FinOps as shared accountability among finance, technology and business teams.",
   "Students will be able to name the Inform, Optimize and Operate phases and give an action for each.",
   "Students will be able to identify Google Cloud tools that support FinOps, such as labels, billing reports, budgets and Active Assist recommendations."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and discuss how shared bills create both waste and arguments."
   ],
   [
    12,
    "Teach",
    "Contrast up-front hardware purchasing with pay-as-you-go cloud spending. Introduce FinOps and its three phases with examples, and stress value per dollar over lowest cost."
   ],
   [
    18,
    "Activity",
    "Run the FinOps cycle sort and cost review described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore culture and trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Imagine five roommates share one electricity bill and nobody can see who uses what. What problems would you expect, and how would you fix them?",
  "activity": {
   "title": "FinOps cycle sort and cost review",
   "materials": "Printed action cards (about 15), a whiteboard drawn as a three-part cycle labeled Inform, Optimize and Operate, and a printed fictional monthly cost summary for three teams.",
   "steps": [
    "Groups sort action cards such as 'Add team labels to all projects', 'Delete idle test VMs', 'Buy commitments for the steady database', 'Set a budget alert at 80 percent' and 'Build a cost dashboard per product' into the three phases.",
    "Groups then review the fictional cost summary and identify one likely source of waste and one cost increase that might be worth it because of business value.",
    "Each group recommends one action per phase for the company and assigns an owner from finance, engineering or the business.",
    "The teacher closes by asking which recommendations would have been impossible without the Inform phase."
   ]
  },
  "discussion": [
   "Why might engineers resist seeing the cost of their decisions, and how could leaders make it feel helpful rather than punitive?",
   "When is spending more on the cloud the right business decision?"
  ],
  "exit": [
   [
    "Name the three FinOps phases in order.",
    "Inform, Optimize, Operate."
   ],
   [
    "What does shared accountability mean in FinOps?",
    "Finance, technology and business teams all share responsibility for cloud cost and value, rather than leaving it to one department."
   ],
   [
    "Which Google Cloud feature lets you group costs by team or environment across resources?",
    "Labels, used with billing reports or billing export."
   ]
  ],
  "differentiation": [
   "Support: Provide a phase definition card with two example actions each, so students can compare new cards against the examples while sorting.",
   "Extend: Ask fast finishers to propose a unit cost metric for a fictional tutoring company and explain how it would change a debate about a rising cloud bill."
  ]
 },
 {
  "t": "The Google Cloud resource hierarchy: organization, folders, projects and resources",
  "objectives": [
   "Students will be able to list the four levels of the Google Cloud resource hierarchy in order and describe the purpose of each.",
   "Students will be able to explain why every resource belongs to exactly one project and what a project controls (APIs, billing, IAM, quotas).",
   "Students will be able to compare the project name, project ID and project number.",
   "Students will be able to design a simple hierarchy for a fictional company that supports isolation, access control and cost visibility."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect three or four answers on the whiteboard. Point out that the messy answers describe exactly the problem a hierarchy solves."
   ],
   [
    12,
    "Teach",
    "Draw the tree on the board: organization at the top, folders, projects, resources. For each level, say what it represents and what it controls. Spend extra time on projects: APIs, billing link, IAM, quotas, and the three identifiers. Stress that the project ID is permanent and globally unique."
   ],
   [
    18,
    "Activity",
    "Run the card-sort design activity in groups of three or four. Circulate and ask each group why they placed a policy or project where they did."
   ],
   [
    5,
    "Discuss",
    "Have two groups present their trees. Use the discussion questions to compare choices, especially folder-by-department versus folder-by-environment."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Imagine a company where every employee can create cloud projects under their own account, with no central structure. What problems will the company have in a year?",
  "activity": {
   "title": "Build the hierarchy: card-sort design",
   "materials": "Printed cards (or sticky notes) labeled with an organization, eight to ten folder names, twelve project names and about twenty resources; a short printed scenario for a fictional company; whiteboard or large paper.",
   "steps": [
    "Give each group the scenario: a fictional company with three departments, each running production and development workloads, a security rule that all data must stay in one country, and a finance request to see costs by department.",
    "Groups arrange the cards into a tree on paper, drawing lines from parent to child, and must place every resource under exactly one project.",
    "Groups mark with a colored sticky note where they would set the location rule and where they would grant each department's access.",
    "Groups write two sentences explaining how finance will see costs by department in their design.",
    "Swap trees with a neighboring group, who checks for rule breaks such as a resource with two parents or a folder below a project."
   ]
  },
  "discussion": [
   "When would you organize folders by environment first and department second, and when the other way around?",
   "What risks come from granting a powerful role at the organization level instead of at a folder or project?",
   "Why might a company regret a poorly chosen project ID?"
  ],
  "exit": [
   [
    "List the resource hierarchy levels from top to bottom.",
    "Organization, folders, projects, resources."
   ],
   [
    "Name two things that are configured at the project level.",
    "Any two of: enabled APIs and services, the linked billing account, IAM policies, quotas."
   ],
   [
    "Which project identifier is globally unique and cannot be changed?",
    "The project ID."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially completed tree with the organization and folders already placed, so they only need to add projects and resources, and provide a one-line definition card for each level.",
   "Extend: Ask fast finishers to add a second requirement, such as a shared networking team that must manage networks for all departments, and explain where they would place that team's project and access."
  ]
 },
 {
  "t": "Policy inheritance: IAM allow policies and organization policies through the hierarchy",
  "objectives": [
   "Students will be able to explain how policies set on a node are inherited by all descendants in the resource hierarchy.",
   "Students will be able to determine a principal's effective access by combining grants from a resource and its ancestors.",
   "Students will be able to distinguish IAM allow policies, IAM deny policies and organization policies by purpose.",
   "Students will be able to choose the right mechanism for a given governance requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up puzzle, collect a few guesses on the board, and tell students the lesson will settle which guess is right."
   ],
   [
    12,
    "Teach",
    "Draw a hierarchy on the board. Add an Editor grant on a folder and trace it down with arrows. Show that removing the user at the project changes nothing. Introduce deny policies as the exception. Then contrast organization policies: what can be done versus who can do it, with examples such as region restriction and blocking public buckets."
   ],
   [
    18,
    "Activity",
    "Run the effective-access tracing activity in pairs, then have pairs sort requirement cards into allow, deny or organization policy."
   ],
   [
    5,
    "Discuss",
    "Review the trickiest scenario cards and work through the discussion questions as a class."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A user was removed from a project's permissions an hour ago but can still edit files in it. Without knowing anything about Google Cloud, what are some possible reasons?",
  "activity": {
   "title": "Trace the access, then pick the tool",
   "materials": "Projector or printed handout showing a hierarchy diagram with IAM grants and organization policies written beside nodes; a deck of printed requirement cards; whiteboard.",
   "steps": [
    "Show the diagram: an organization with a region restriction, two folders with different group grants, and four projects with their own grants.",
    "Pairs answer six questions on the handout, such as 'Can Group A edit Project 3?' and 'Can the Project 4 owner create a VM in a forbidden region?', writing which node each answer comes from.",
    "Reveal answers and have pairs correct their work, explaining any errors aloud.",
    "Hand out requirement cards (for example 'No public buckets anywhere', 'Auditors read everything', 'Only the platform team may delete projects') and ask pairs to label each card Allow, Deny or Organization policy and say where in the hierarchy it should be set.",
    "Pairs compare labels with another pair and resolve disagreements."
   ]
  },
  "discussion": [
   "Why would a company prefer to set guardrails at the organization node rather than in each project?",
   "What could go wrong if broad roles such as Editor are granted at the organization level?",
   "When might a folder need an exception to an organization-wide policy, and how would you control that exception?"
  ],
  "exit": [
   [
    "A group has Viewer on a folder. Can it view a project created in that folder next week?",
    "Yes. Policies are inherited by all current and future descendants."
   ],
   [
    "Which mechanism would prevent anyone, including project owners, from creating resources outside approved regions?",
    "An organization policy with a resource location constraint."
   ],
   [
    "Can an allow policy on a project remove access granted on its parent folder?",
    "No. Allow policies are additive; remove the grant at the folder or use a deny policy."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column reference card ('Who can act' = IAM; 'What is allowed' = organization policy) and let struggling students trace access on a simpler three-node diagram first.",
   "Extend: Ask fast finishers to write two original requirement cards that are deliberately ambiguous, then explain which mechanism or combination of mechanisms best satisfies each."
  ]
 },
 {
  "t": "Controlling costs: billing accounts, budgets and alerts, quotas, labels and billing export",
  "objectives": [
   "Students will be able to describe the purpose of billing accounts, budgets, quotas, labels and billing export.",
   "Students will be able to explain why a budget alert does not stop spending and how automation can add an automatic response.",
   "Students will be able to match a cost-management goal to the correct Google Cloud tool.",
   "Students will be able to design a basic cost-control setup for a fictional organization."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Write students' ideas on the board in two columns: 'warns me' and 'stops me'."
   ],
   [
    12,
    "Teach",
    "Walk through each tool with one sentence of purpose and one sentence of what it does not do. Emphasize: budgets alert, quotas limit, labels allocate, export analyzes. Sketch the budget-to-Pub/Sub-to-function flow for automatic action."
   ],
   [
    18,
    "Activity",
    "Run the 'Surprise invoice' investigation in groups."
   ],
   [
    5,
    "Discuss",
    "Groups share their prevention plans; use the discussion questions to challenge choices."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your phone carrier offers two features: a text when you reach 80% of your data, and a hard cutoff when you reach 100%. Which would you want on your own phone, and which on a teenager's? Why?",
  "activity": {
   "title": "The surprise invoice",
   "materials": "Printed one-page case file per group with a fictional invoice summary, a list of projects, and short notes from three teams; a set of tool cards (Billing account, Budget, Quota, Label, Billing export, Pricing Calculator, Pub/Sub automation); whiteboard.",
   "steps": [
    "Groups read the case file: a fictional company's bill tripled, one sandbox ran a forgotten load test, and half the charges cannot be attributed to a team.",
    "Groups identify which tool, if configured beforehand, would have warned them, which would have limited the damage, and which would have shown who spent what, placing tool cards next to each problem.",
    "Groups write a five-line prevention plan that uses at least four tools, noting for each whether it warns, limits, allocates or analyzes.",
    "Each group marks one place where an automatic shutdown would be acceptable and one where it would not, with a reason.",
    "Groups trade plans and check each other for the common mistake of expecting a budget to stop spending."
   ]
  },
  "discussion": [
   "Why might a company choose not to automatically disable billing on a project even when it exceeds budget?",
   "What makes a labeling strategy succeed or fail in a large organization?",
   "When is a separate project a better cost boundary than a label?"
  ],
  "exit": [
   [
    "What happens when a budget's 100% threshold is reached?",
    "An alert notification is sent; resources keep running unless separate automation acts on the notification."
   ],
   [
    "Which tool would let analysts query detailed cost data with SQL?",
    "Cloud Billing export to BigQuery."
   ],
   [
    "A team wants costs grouped by environment across many projects. What should they apply?",
    "Labels such as env=prod and env=dev, then group billing reports or exported data by that label."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a matching worksheet that pairs each tool with a one-line goal before they attempt the case file, and let them work with the tool cards' purpose written on the back.",
   "Extend: Ask fast finishers to sketch the event flow for an automatic budget response (budget, Pub/Sub topic, function, action) and list two risks of that automation."
  ]
 },
 {
  "t": "Pricing models and discounts: pay-as-you-go, sustained use discounts, committed use discounts and Spot VMs",
  "objectives": [
   "Students will be able to describe pay-as-you-go, sustained use discounts, committed use discounts and Spot VMs.",
   "Students will be able to explain the trade-off each discount requires, such as commitment or interruptibility.",
   "Students will be able to recommend a pricing option for a workload based on its steadiness and fault tolerance.",
   "Students will be able to identify additional cost levers such as rightsizing, autoscaling and scaling to zero."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about taxis, transit passes and standby seats. Let students explain which they would choose for different trips."
   ],
   [
    12,
    "Teach",
    "Draw a two-axis chart on the board: steady versus variable workload on one axis, interruptible versus must-stay-up on the other. Place each pricing option in its region and state the trade-off for each. Add the other cost levers at the end."
   ],
   [
    18,
    "Activity",
    "Run the workload-pricing card sort in pairs."
   ],
   [
    5,
    "Discuss",
    "Review contested cards and the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You travel to work every day for the next three years, take an occasional unplanned trip, and sometimes fly on a flexible schedule. When would you pay per ride, buy a long-term pass, or take a cheap standby seat?",
  "activity": {
   "title": "Price the workload card sort",
   "materials": "Printed workload cards (twelve short descriptions such as 'nightly report that can rerun', 'payroll database used for years', 'hackathon prototype for one week'); four large sticky notes labeled Pay-as-you-go, Sustained use, Committed use, Spot VMs; whiteboard.",
   "steps": [
    "Pairs read each workload card and underline the words that reveal how steady and how interruptible it is.",
    "Pairs place each card under one of the four pricing labels and write a one-line reason on the back.",
    "For any workload that could use two options together, such as a committed baseline plus pay-as-you-go peaks, pairs mark it with a star.",
    "Pairs join another pair and compare placements, resolving disagreements by pointing to the underlined words.",
    "Each group shares one card they found hardest and how they decided."
   ]
  },
  "discussion": [
   "What risks does a company take on when it buys a three-year commitment?",
   "How would you redesign a batch job so it could safely use Spot VMs?",
   "Why might the cheapest pricing option still not be the best business choice?"
  ],
  "exit": [
   [
    "Which option suits a fault-tolerant batch job that can restart from checkpoints?",
    "Spot VMs, because interruptions are acceptable and the discount is large."
   ],
   [
    "What is the main drawback of a committed use discount?",
    "You pay for the committed resources or spend for the full term even if you use less."
   ],
   [
    "Name one cost lever that is not a discount.",
    "Any of: rightsizing, autoscaling, scaling to zero with serverless, choosing the right storage class, deleting idle resources, choosing a lower-priced region."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a decision flow card with two questions (Can it be interrupted? Will it run steadily for years?) that leads to an answer, and start them on the clearest cards.",
   "Extend: Ask fast finishers to design a mixed pricing plan for a company with three workloads and explain how they would size a commitment to avoid paying for unused capacity."
  ]
 },
 {
  "t": "DevOps and Site Reliability Engineering (SRE) principles",
  "objectives": [
   "Students will be able to explain the developer-versus-operations tension that DevOps and SRE address.",
   "Students will be able to describe core DevOps practices, including CI/CD, infrastructure as code and small frequent releases.",
   "Students will be able to identify SRE principles such as SLOs, error budgets, toil reduction and blameless postmortems.",
   "Students will be able to apply SRE ideas to recommend improvements for a fictional team's operations."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let two or three students share a story. Draw out the theme of blame versus learning."
   ],
   [
    12,
    "Teach",
    "Describe the old wall between developers and operations. Introduce DevOps as culture plus practices, then SRE as Google's concrete implementation. List SRE principles on the board with a one-line example each: SLOs, error budgets, toil, user-focused monitoring, gradual rollouts, blameless postmortems."
   ],
   [
    18,
    "Activity",
    "Run the blameless postmortem role-play in groups of four."
   ],
   [
    5,
    "Discuss",
    "Groups read their top action items aloud; lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of a time a group project or team effort went wrong. Did the group focus on who was at fault or on what to change? Which approach led to a better result?",
  "activity": {
   "title": "Blameless postmortem role-play",
   "materials": "Printed incident packet per group (a fictional outage timeline with a skipped manual deployment step, a missing alert and a slow rollback); role cards (facilitator, developer, operator, note-taker); a printed postmortem template with sections for summary, impact, timeline, root causes and action items.",
   "steps": [
    "Assign roles. The facilitator reminds everyone that the goal is to find system causes, not to blame anyone.",
    "The group reads the timeline aloud and the note-taker fills in summary, impact and timeline.",
    "The group identifies at least two root causes, rewriting any statement that names a person as a statement about a process or tool.",
    "The group proposes three action items and labels each as automation (toil reduction), safer change (gradual rollout or rollback) or monitoring.",
    "Groups swap templates and check each other's for any blaming language."
   ]
  },
  "discussion": [
   "Why might engineers hide mistakes in a blame-focused culture, and what does that cost the company?",
   "How does using managed cloud services change the amount of toil a team carries?",
   "Can a company buy DevOps? Why or why not?"
  ],
  "exit": [
   [
    "What is the relationship between DevOps and SRE?",
    "SRE is often described as Google's specific implementation of DevOps principles, applying software engineering to operations."
   ],
   [
    "Give an example of toil.",
    "Any manual, repetitive task that scales with the service, such as manually restarting servers or copying logs every day."
   ],
   [
    "What is the main goal of a blameless postmortem?",
    "To understand an incident's causes and prevent recurrence by fixing systems and processes, without punishing individuals."
   ]
  ],
  "differentiation": [
   "Support: Provide a glossary card with the six SRE keywords and an example of each, and give struggling groups a timeline with the root causes already highlighted.",
   "Extend: Ask fast finishers to estimate how the team's release frequency and toil might change over a year after their action items, and explain which metrics they would track to prove it."
  ]
 },
 {
  "t": "SLIs, SLOs, SLAs and error budgets",
  "objectives": [
   "Students will be able to define SLI, SLO, SLA and error budget and explain how they relate.",
   "Students will be able to calculate an error budget from an SLO.",
   "Students will be able to explain why an SLA is usually looser than the corresponding SLO and why SLOs are not set at 100%.",
   "Students will be able to apply an error budget policy to decide whether a team should release new features."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the pizza delivery warm-up question and map students' answers onto the three terms on the board without naming them yet, then reveal the names."
   ],
   [
    12,
    "Teach",
    "Define SLI, SLO and SLA in order with a running example. Show the error budget calculation for 99.9% and 99.5% over 30 days on the board (30 days is 43,200 minutes; 0.1% is about 43 minutes). Explain the error budget policy: ship while budget remains, focus on reliability when it is gone."
   ],
   [
    18,
    "Activity",
    "Run the error budget simulation game in small groups."
   ],
   [
    5,
    "Discuss",
    "Groups compare their release decisions and reasons; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A pizza shop promises delivery in 30 minutes or the pizza is free. What should the shop measure, what goal should it set for itself, and why might it set its own goal stricter than its public promise?",
  "activity": {
   "title": "Error budget simulation",
   "materials": "Printed scenario sheet per group with a service, an SLO, an SLA and a 30-day month; a stack of printed event cards (outages of various lengths, feature launch requests, a dependency failure); calculators or student laptops; whiteboard for a class tally.",
   "steps": [
    "Each group calculates its service's monthly error budget in minutes from the SLO on its sheet.",
    "The teacher reveals event cards one at a time; groups subtract any downtime from their budget and record what remains.",
    "When a feature launch card appears, each group decides whether to launch, delay or launch gradually, writing a one-sentence justification based on remaining budget.",
    "After all cards, groups check whether they missed their SLO, their SLA, both or neither.",
    "Groups write a three-line error budget policy they would adopt next month based on what happened."
   ]
  },
  "discussion": [
   "Who in a company should agree on an SLO, and why should it not be set by engineers alone?",
   "What is the risk of setting an SLO much higher than users need?",
   "How does an error budget change the relationship between developers and operators?"
  ],
  "exit": [
   [
    "What is the error budget for a 99.95% SLO?",
    "0.05% of requests or time in the measurement period."
   ],
   [
    "Put SLI, SLO and SLA in order from measurement to contract and define each in a few words.",
    "SLI is the measurement, SLO is the internal target for it, SLA is the external contract with consequences."
   ],
   [
    "The error budget is exhausted. What does SRE practice recommend?",
    "Slow or freeze feature releases and focus on reliability work until the service is back within its SLO."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a worked example of the error budget calculation and a fill-in-the-blank chain diagram (measure, target, contract) to complete before the simulation.",
   "Extend: Ask fast finishers to propose two SLIs and SLOs for a fictional video streaming service, justify the numbers from a user's perspective, and design a burn-rate alert rule in plain words."
  ]
 },
 {
  "t": "Reliability and disaster recovery: redundancy across zones and regions, backups, RTO and RPO",
  "objectives": [
   "Students will be able to distinguish high availability from disaster recovery.",
   "Students will be able to define RTO and RPO and identify which one a business requirement describes.",
   "Students will be able to explain what multi-zone and multi-region designs protect against.",
   "Students will be able to recommend a DR pattern (backup and restore, warm standby, active-active) for a workload based on its RTO, RPO and cost tolerance."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list students' answers. Sort them into 'keep running' and 'recover afterward' to preview HA versus DR."
   ],
   [
    12,
    "Teach",
    "Sketch a region with three zones and a second region. Explain HA with a managed instance group and HA Cloud SQL. Define RTO and RPO on a timeline drawing: failure point in the middle, RPO looking back, RTO looking forward. Show the three DR patterns on a cost-versus-recovery line. Stress testing backups and that replication copies mistakes."
   ],
   [
    18,
    "Activity",
    "Run the DR consultant activity in groups."
   ],
   [
    5,
    "Discuss",
    "Groups present one recommendation each; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your phone falls in a lake. How much would you lose, and how long would it take to get back to normal? What could you have done beforehand to make both answers smaller?",
  "activity": {
   "title": "DR consultants",
   "materials": "Printed client cards for four fictional organizations, each listing a system, its business impact per hour of downtime, how much data loss is tolerable and a budget level; a printed timeline template showing a failure point; whiteboard.",
   "steps": [
    "Each group takes one client card and marks the RTO and RPO on the timeline template from the client's description.",
    "The group chooses HA measures (zones) and a DR pattern (backup and restore, warm standby or active-active) and justifies it against the budget.",
    "The group lists where backups will live and how access to them will be restricted.",
    "The group writes a one-paragraph test plan describing how and how often they will rehearse recovery.",
    "Groups swap cards and critique each other's design for one gap, such as backups in the same project or multi-zone presented as protection against a regional outage."
   ]
  },
  "discussion": [
   "Why might a business accept a long RTO for one system but demand a short one for another?",
   "What would convince leadership to pay for regular DR tests?",
   "How does infrastructure as code help with disaster recovery?"
  ],
  "exit": [
   [
    "A requirement says the service must be back within 30 minutes. Is this RTO or RPO?",
    "RTO, because it describes acceptable downtime."
   ],
   [
    "What protects against a whole-region outage: multiple zones or multiple regions?",
    "Multiple regions, because zones are all within one region."
   ],
   [
    "Why does a replicated database still need backups?",
    "Replication copies deletions and corruption to all replicas, so backups are needed to restore to a point before the problem."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a timeline card with RPO drawn to the left of the failure and RTO to the right, plus a three-row table summarizing each DR pattern's cost and recovery speed.",
   "Extend: Ask fast finishers to design a tiered DR strategy for a company with five systems of different importance and estimate which tier each system belongs in, explaining the trade-offs."
  ]
 },
 {
  "t": "Google Cloud Observability: Cloud Monitoring, Cloud Logging, Cloud Trace and Error Reporting",
  "objectives": [
   "Students will be able to define observability and distinguish metrics, logs and traces.",
   "Students will be able to describe the main purpose of Cloud Monitoring, Cloud Logging, Cloud Trace and Error Reporting.",
   "Students will be able to select the right observability tool for a troubleshooting or compliance scenario.",
   "Students will be able to explain how log sinks route logs for retention and analysis."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list students' answers. Group them into numbers, written records and step-by-step journeys."
   ],
   [
    12,
    "Teach",
    "Introduce metrics, logs and traces with the phrase 'something is wrong, what happened, where time went.' Present each service with one exam keyword: Monitoring (dashboards, alerts, uptime checks), Logging (Logs Explorer, audit logs, sinks), Trace (latency across services), Error Reporting (grouped errors). Draw a sink routing logs to Storage, BigQuery and Pub/Sub."
   ],
   [
    18,
    "Activity",
    "Run the incident detective activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Review the investigation order pairs chose and lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your car starts making a strange noise. What information would you want from the dashboard, from a record of recent repairs, and from a mechanic following the problem step by step?",
  "activity": {
   "title": "Incident detective",
   "materials": "Projector or printed packet with fictional evidence: a latency chart with a spike, a trace timeline showing one slow span, a short log excerpt with timeout errors, and an error summary showing a new error after a deployment; tool-name cards; whiteboard.",
   "steps": [
    "Pairs receive the evidence pieces shuffled and label each with the tool that would produce it.",
    "Pairs put the evidence in the order an on-call engineer would use it, from first alert to root cause.",
    "Pairs write a two-sentence incident summary naming the slow service and the likely cause.",
    "Pairs answer two follow-up prompts: how to keep these logs for five years cheaply, and how to be alerted automatically if the error appears again.",
    "Two pairs present their order and the class compares it with the Monitoring, Trace, Logging, Error Reporting flow."
   ]
  },
  "discussion": [
   "Why is alerting on user-facing symptoms, such as latency, often better than alerting on every high CPU reading?",
   "What kinds of questions can audit logs answer for a security or compliance team?",
   "How do microservices make troubleshooting harder, and how does tracing help?"
  ],
  "exit": [
   [
    "Which service provides dashboards, uptime checks and alerting policies?",
    "Cloud Monitoring."
   ],
   [
    "Complete the phrase: metrics tell you something is wrong, logs tell you ___, traces show ___.",
    "Logs tell you what happened; traces show where time went in a request."
   ],
   [
    "How would you send logs to BigQuery for SQL analysis?",
    "Create a log sink in Cloud Logging with BigQuery as the destination."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a four-row table with each tool, its data type and an everyday comparison, and let them label evidence with the table in hand.",
   "Extend: Ask fast finishers to design an alerting plan for a fictional online store, choosing two SLIs, the alert conditions in plain words, and which logs they would route to which destination and why."
  ]
 },
 {
  "t": "Google Cloud Customer Care: support plans and when to use them",
  "objectives": [
   "Students will be able to describe what basic support includes and what it does not.",
   "Students will be able to explain how paid support tiers differ in response, coverage and proactive services.",
   "Students will be able to identify the role of a Technical Account Manager in the top support tier.",
   "Students will be able to recommend a support level for an organization based on workload criticality and risk."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about choosing a phone or car warranty. Collect reasons people pay for more coverage."
   ],
   [
    12,
    "Teach",
    "Draw a ladder on the board: basic support at the bottom, then a lower paid tier, a middle tier for production, and Premium Support at the top. For each rung, list what it adds. Explain the TAM, proactive reviews and event support. Cover case priority and Access Transparency briefly. Remind students not to memorize response times."
   ],
   [
    18,
    "Activity",
    "Run the support plan pitch role-play in small groups."
   ],
   [
    5,
    "Discuss",
    "Groups share their recommendations and the counterarguments they heard; lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When you buy a laptop, would you pay extra for a support plan? What would make that extra cost worth it for you, and would the answer change if the laptop ran your whole business?",
  "activity": {
   "title": "Support plan pitch",
   "materials": "Printed organization cards for four fictional companies (a hobby developer, a small startup in development, a mid-sized online store in production, an enterprise with a major launch); role cards for an infrastructure lead and a skeptical finance officer; whiteboard.",
   "steps": [
    "Each group draws an organization card and identifies how critical its workloads are and what an hour of downtime might cost.",
    "The group chooses a support level and lists three specific benefits that justify it.",
    "One student plays the skeptical finance officer and raises two objections; the others respond using the benefits.",
    "The group writes one well-formed support case for a sample problem, choosing an appropriate priority and including key details such as project ID and error messages.",
    "Groups present their choice in one minute each while the class checks it against the criticality of the organization."
   ]
  },
  "discussion": [
   "How would you estimate whether a higher support tier is worth its cost for a business?",
   "Why might regulated industries care about Access Transparency during support cases?",
   "What sources of help exist beyond Customer Care, and when would you use them?"
  ],
  "exit": [
   [
    "Does basic support include technical support cases for most problems?",
    "No. It covers billing and account questions, documentation, forums and status information."
   ],
   [
    "What is a Technical Account Manager?",
    "A named Google adviser in the top support tier who knows the customer's environment and coordinates help and proactive guidance."
   ],
   [
    "A company runs business-critical systems and is planning a major launch. Which tier fits?",
    "The top tier, Premium Support, for fastest critical response, a TAM and event planning help."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a ladder diagram handout listing each tier's key features, and pair them with a peer for the role-play.",
   "Extend: Ask fast finishers to write a short decision guide that maps three business signals (criticality, team size, upcoming events) to a support level, without using any specific prices or response times."
  ]
 },
 {
  "t": "Sustainability: Google's carbon-free energy goals, low-carbon regions and the Carbon Footprint tool",
  "objectives": [
   "Students will be able to explain the difference between annual renewable matching and 24/7 carbon-free energy.",
   "Students will be able to describe how CFE% and low CO2 region indicators help customers choose regions.",
   "Students will be able to describe what the Carbon Footprint tool reports and how organizations use it.",
   "Students will be able to recommend lower-carbon choices for workloads while respecting latency and compliance requirements."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers. Highlight that the source of electricity, not only the amount, determines emissions."
   ],
   [
    12,
    "Teach",
    "Present Google's milestones: carbon neutral in 2007, annual renewable matching since 2017, and the 2030 goals of 24/7 carbon-free energy and net zero. Draw a 24-hour chart showing solar output dropping at night to explain hourly matching. Then cover customer tools: CFE% by region, the low CO2 indicator and the Carbon Footprint tool, plus efficiency practices."
   ],
   [
    18,
    "Activity",
    "Run the green region planner activity in groups."
   ],
   [
    5,
    "Discuss",
    "Groups share their placements and trade-offs; lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Two houses use exactly the same amount of electricity in a year. Could one still be responsible for much more carbon than the other? How?",
  "activity": {
   "title": "Green region planner",
   "materials": "Printed table of four fictional regions with made-up labels (Region A to D), each with an illustrative carbon-free percentage, a low CO2 marker yes or no, and a country; printed workload cards with latency and residency requirements; whiteboard.",
   "steps": [
    "Explain that the region data is fictional and only for practice, then give each group the table and five workload cards.",
    "Groups place each workload in a region, first eliminating regions that break latency or residency requirements, then choosing the lowest-carbon remaining option.",
    "For each placement, groups write one sentence explaining the trade-off they made.",
    "Groups list two efficiency actions, such as rightsizing or scaling to zero, that would cut emissions regardless of region.",
    "Groups describe how they would use the Carbon Footprint tool to show the board the effect of their changes next quarter."
   ]
  },
  "discussion": [
   "Why might a company not move a workload to the lowest-carbon region even if it wants to reduce emissions?",
   "How can sustainability goals and cost goals support each other in the cloud?",
   "Why do investors and regulators increasingly ask companies about emissions from their cloud providers?"
  ],
  "exit": [
   [
    "What is Google's 2030 energy goal for its operations?",
    "To run on 24/7 carbon-free energy on every grid where it operates."
   ],
   [
    "Which tool shows a customer the estimated emissions of its Google Cloud usage?",
    "The Carbon Footprint tool."
   ],
   [
    "What two things in the console help a team choose a lower-carbon region?",
    "The published carbon-free energy percentage (CFE%) for each region and the low CO2 indicator on regions with low grid carbon intensity."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a step card for placement (check requirements first, then pick the lowest carbon option) and a glossary of CFE%, low CO2 and Carbon Footprint.",
   "Extend: Ask fast finishers to write a one-page sustainability memo for a fictional company that combines region choices, scheduling of flexible jobs and efficiency practices, and explains how progress would be measured."
  ]
 }
]);
