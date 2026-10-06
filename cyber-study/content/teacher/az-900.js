/* Teacher edition for Microsoft Certified: Azure Fundamentals (AZ-900): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("az-900", [
 {
  "t": "What cloud computing is, and the shared responsibility model across on-premises, IaaS, PaaS and SaaS",
  "objectives": [
   "Students will be able to define cloud computing and explain why the provider owns the physical layer.",
   "Students will be able to identify which responsibilities belong to Microsoft, to the customer, or are shared in IaaS, PaaS and SaaS.",
   "Students will be able to name the responsibilities that always stay with the customer and those that always belong to Microsoft.",
   "Students will be able to apply the shared responsibility model to a scenario such as patching or a stolen password."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect three or four answers on the board without correcting them yet. Tell students that by the end of class they will be able to settle the argument."
   ],
   [
    12,
    "Teach",
    "Draw the layer stack from physical datacenter up to information and data. Add four columns: on-premises, IaaS, PaaS, SaaS. Shade the provider's layers column by column while explaining that responsibility follows control. Stress the always-customer layers (data, devices, accounts) and the always-Microsoft layers (datacenter, physical network, physical hosts)."
   ],
   [
    18,
    "Activity",
    "Run the card sort described below. Circulate and ask each group to justify one placement aloud, especially any card placed in a shared cell."
   ],
   [
    5,
    "Discuss",
    "Review the hardest cards as a class, then return to the warm-up answers and correct them together."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper or a sticky note and hand them in at the door."
   ]
  ],
  "warmup": "Your company moves its payroll server to an Azure virtual machine. A month later, attackers get in through an unpatched operating system. Whose fault is it, and why?",
  "activity": {
   "title": "Who owns this layer? Card sort",
   "materials": "Printed cards (one task per card, about 16 cards per group), a whiteboard or large paper divided into a grid with columns IaaS, PaaS, SaaS and rows Microsoft, Customer, Shared, tape or sticky notes.",
   "steps": [
    "Split the class into groups of three or four and give each group a set of task cards, such as 'patch the guest OS', 'replace a failed disk in a host', 'require multifactor authentication', 'configure firewall rules on a database server', 'decide who can share files externally', 'secure the datacenter doors'.",
    "Groups place each card in the grid for each service type, writing the task three times if needed.",
    "Each group picks the card they argued about most and writes one sentence explaining their final choice.",
    "Groups rotate to another table, check its grid, and leave a sticky note on any placement they disagree with.",
    "Return to the original tables, resolve the sticky notes, and be ready to share one correction with the class."
   ]
  },
  "discussion": [
   "Why does Microsoft not simply patch the operating system inside customers' virtual machines for them?",
   "If SaaS gives the customer the least work, why do organizations still choose IaaS for some workloads?"
  ],
  "exit": [
   [
    "In IaaS, who patches the guest operating system?",
    "The customer, because Microsoft manages only the physical layers and the hypervisor in IaaS."
   ],
   [
    "Name the three responsibilities that stay with the customer in every service type.",
    "Information and data, devices, and accounts and identities."
   ],
   [
    "A sales manager in a company using Microsoft 365 gives away a password in a phishing email. Who is responsible for protecting that account?",
    "The customer, because accounts and identities are always the customer's responsibility, even in SaaS."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially completed grid with the always-Microsoft and always-customer rows filled in, so they only decide the middle layers.",
   "Extend: Ask fast finishers to write a one-paragraph explanation for a manager of why the same company can have three different responsibility splits for three workloads."
  ]
 },
 {
  "t": "Cloud models: public, private and hybrid cloud, plus multicloud and where Azure Arc fits",
  "objectives": [
   "Students will be able to describe public, private and hybrid cloud and identify each from a scenario.",
   "Students will be able to distinguish hybrid cloud from multicloud.",
   "Students will be able to compare the cost, control and complexity trade-offs of each cloud model.",
   "Students will be able to explain what Azure Arc does and how it differs from Azure Migrate."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up prompt on the projector and have students vote by raising hands for public, private, hybrid or multicloud. Record the vote."
   ],
   [
    12,
    "Teach",
    "Define each model with one clue phrase on the board: shared by many, single organization, private plus public, more than one public provider. Draw a simple diagram of an on-premises datacenter, Azure and another cloud, then draw Arc as a line projecting outside servers into the Azure portal. Contrast Arc with Azure Migrate."
   ],
   [
    18,
    "Activity",
    "Run the scenario matching activity below in pairs, then have pairs compare answers with another pair."
   ],
   [
    5,
    "Discuss",
    "Revisit the warm-up vote. Ask students who changed their answer to explain what clue they had missed."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions individually."
   ]
  ],
  "warmup": "A company keeps its payroll servers in its own building and runs its website in Azure. It also uses a second public cloud for analytics. What would you call this setup, and why?",
  "activity": {
   "title": "Name that cloud model",
   "materials": "Printed scenario cards (eight short company descriptions), a whiteboard with five columns labeled public, private, hybrid, multicloud and Azure Arc needed, sticky notes.",
   "steps": [
    "Give each pair a set of eight scenario cards, for example 'a startup with no datacenter running everything in Azure' or 'a bank that must keep records on hardware it owns but uses Azure for its mobile app'.",
    "Pairs decide the cloud model for each card and write the clue phrase that gave it away on a sticky note.",
    "For any scenario that mentions managing outside servers from Azure, pairs also mark whether Azure Arc or Azure Migrate fits and why.",
    "Pairs post their sticky notes in the matching column on the whiteboard.",
    "The class reviews any card that landed in more than one column and agrees on the answer, noting that some scenarios are both hybrid and multicloud."
   ]
  },
  "discussion": [
   "Why might a company deliberately choose multicloud even though it adds complexity?",
   "What would make an organization keep a private cloud instead of moving everything to a public cloud?"
  ],
  "exit": [
   [
    "A company uses Azure and another public cloud provider and has no datacenter. Which model is this?",
    "Multicloud, because there are two public providers and no private cloud."
   ],
   [
    "Which cloud model gives the most control over physical hardware?",
    "Private cloud, because the resources are dedicated to one organization that manages the hardware."
   ],
   [
    "What does Azure Arc do with an on-premises server?",
    "It projects the server into Azure Resource Manager so it can be managed with Azure tools such as Policy, RBAC and tags, while the server stays where it is."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page reference card with the four clue phrases and one example for each model to use during the activity.",
   "Extend: Ask fast finishers to design the cloud setup for a fictional company that is both hybrid and multicloud, and explain how Azure Arc would help its security team."
  ]
 },
 {
  "t": "The consumption-based model and pay-as-you-go pricing compared with buying hardware",
  "objectives": [
   "Students will be able to explain the consumption-based model and how it differs from buying hardware.",
   "Students will be able to describe how Azure meters resources and what stops each kind of charge.",
   "Students will be able to distinguish a stopped VM from a deallocated VM in billing terms.",
   "Students will be able to recommend pay-as-you-go or a reservation for a described workload."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question. Ask two volunteers to explain their answer, then leave the question unresolved on the board."
   ],
   [
    12,
    "Teach",
    "Compare the on-premises purchase cycle with pay-as-you-go. Show the three CLI commands from the lesson on the projector and walk through which meters run after each: create, deallocate, delete the resource group. Mention reservations and Spot as alternatives for steady or interruptible workloads."
   ],
   [
    18,
    "Activity",
    "Run the meter detective activity below in groups of three."
   ],
   [
    5,
    "Discuss",
    "Groups share their highest-cost finding and how they would stop it. Return to the warm-up question and answer it together."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "You turn off a cloud server by choosing Shut down inside Windows. Will your company still be charged for it tomorrow? Why or why not?",
  "activity": {
   "title": "Meter detective",
   "materials": "A printed one-page fictional monthly cost report per group (made by the teacher) listing resources, their state and charges, highlighters, a whiteboard.",
   "steps": [
    "Give each group the fictional cost report showing items such as a VM in the Stopped state, a deallocated VM with a disk, an orphaned public IP address and a function app with a few executions.",
    "Groups highlight every line that is still costing money and label why: allocated compute, existing storage, or usage.",
    "For each highlighted line, groups write the action that would stop the charge: deallocate, delete, or nothing because it is needed.",
    "Groups identify one workload on the report that would suit a reservation and one that suits pay-as-you-go, with a reason.",
    "Each group writes its single biggest saving on the whiteboard for the class to compare."
   ]
  },
  "discussion": [
   "Why does the ease of creating cloud resources make cost governance more important, not less?",
   "When could buying hardware still make more financial sense than pay-as-you-go?"
  ],
  "exit": [
   [
    "What upfront cost does the consumption-based model require?",
    "None; you pay only for what you use, as you use it."
   ],
   [
    "What must you do to stop compute charges for a VM?",
    "Deallocate it (or delete it); shutting it down from inside the OS leaves it allocated and billed."
   ],
   [
    "A workload runs at the same level all day, every day, for years. What purchase option might cost less than pay-as-you-go?",
    "A one-year or three-year reservation."
   ]
  ],
  "differentiation": [
   "Support: Provide a simple key that sorts resource states into 'billing for compute', 'billing for storage' and 'not billing' for students to use with the cost report.",
   "Extend: Ask fast finishers to write a short cleanup checklist that a team could follow at the end of every lab or test project to avoid leftover charges."
  ]
 },
 {
  "t": "Capital expenditure (CapEx) vs operational expenditure (OpEx) and how the cloud shifts spending",
  "objectives": [
   "Students will be able to define capital expenditure and operational expenditure.",
   "Students will be able to classify a described cost as CapEx or OpEx and justify the choice.",
   "Students will be able to explain why moving to the cloud shifts spending from CapEx toward OpEx.",
   "Students will be able to describe one benefit and one risk of the shift to OpEx."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and have students turn to a partner and decide which option they would choose and why."
   ],
   [
    12,
    "Teach",
    "Draw a two-column table on the board, CapEx and OpEx. Fill in rows for upfront cost, ownership, depreciation, flexibility and the cost of a wrong guess. Walk through the design agency example from the lesson, showing how losing a client affects each option."
   ],
   [
    18,
    "Activity",
    "Run the CapEx or OpEx sorting race below in teams."
   ],
   [
    5,
    "Discuss",
    "Discuss the cards teams disagreed on, especially reservations and on-premises electricity. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Your small business needs a server. You can buy one for a large one-time sum, or rent the same capacity in the cloud for a monthly fee. Which would you pick if you were not sure the business would still need it next year?",
  "activity": {
   "title": "CapEx or OpEx sorting race",
   "materials": "Printed cost cards (about 15 per team), a whiteboard with two columns labeled CapEx and OpEx, tape or magnets, a timer on the projector.",
   "steps": [
    "Divide the class into teams of four and give each team the same shuffled set of cost cards, such as 'buying a storage array', 'monthly Azure bill', 'software subscription', 'building a new server room', 'electricity for the datacenter', 'three-year Azure reservation'.",
    "Start a five-minute timer. Teams sort their cards into CapEx and OpEx piles on their desks.",
    "When time ends, each team sends one member to tape three cards onto the board and state the clue word that decided each one, for example 'owned' or 'monthly'.",
    "The class challenges any placement it disagrees with, and the team defends it.",
    "Finish by asking each team to write one sentence explaining why the cloud is described as an OpEx model."
   ]
  },
  "discussion": [
   "Why might some organizations still prefer the predictability of owning hardware?",
   "What new controls does a finance team need once most IT spending becomes a variable monthly bill?"
  ],
  "exit": [
   [
    "Is buying new servers for your datacenter CapEx or OpEx?",
    "CapEx, because it is an upfront purchase of physical assets that are owned and depreciated."
   ],
   [
    "Which expenditure model does Azure pay-as-you-go pricing represent?",
    "OpEx, because you pay for services as you use them, with no asset purchase."
   ],
   [
    "Give one benefit of shifting from CapEx to OpEx.",
    "No large upfront investment is needed, and spending can follow actual demand instead of a multi-year guess."
   ]
  ],
  "differentiation": [
   "Support: Give students a list of clue words for each column (owned, depreciated, upfront for CapEx; monthly, subscription, pay as you use for OpEx) to use during the sorting race.",
   "Extend: Ask fast finishers to write a short memo to a fictional board comparing a hardware refresh with a cloud migration, covering cash flow, risk and governance."
  ]
 },
 {
  "t": "High availability, service-level agreements (SLAs) and composite availability",
  "objectives": [
   "Students will be able to explain high availability and how redundancy removes single points of failure.",
   "Students will be able to describe what an SLA commits to and what a service credit is.",
   "Students will be able to calculate allowed monthly downtime from an SLA percentage.",
   "Students will be able to calculate a composite SLA and explain why it is lower than each component."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and take guesses for the minutes of downtime. Write the guesses on the board."
   ],
   [
    12,
    "Teach",
    "Define availability, high availability and SLA. Work through 43,200 minutes x 0.001 on the board to get 43.2 minutes, then do 99.99%. Show composite multiplication with two services, then the redundancy formula with two regions. Explain service credits and that previews usually have no SLA."
   ],
   [
    18,
    "Activity",
    "Run the SLA calculator relay below in pairs, using phone or laptop calculators."
   ],
   [
    5,
    "Discuss",
    "Compare answers to the relay, then compare them with the warm-up guesses. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A service promises 99.9% uptime. Guess how many minutes it could be down in a 30-day month without breaking that promise.",
  "activity": {
   "title": "SLA calculator relay",
   "materials": "Printed worksheets with four architecture sketches and fictional SLA figures, student laptops or phones with a calculator, a whiteboard.",
   "steps": [
    "Give each pair a worksheet with four designs: one service alone, a web app plus a database, a web app plus a database plus storage, and the same three-tier app deployed in two regions.",
    "Pairs calculate the allowed downtime per 30-day month for the single service.",
    "Pairs calculate the composite SLA for the two-service and three-service designs by multiplying, writing down whether each result is higher or lower than the weakest piece.",
    "Pairs calculate the two-region design using one minus the product of the unavailabilities, then note what extra component the two-region design needs.",
    "One pair per design writes its answer on the board, and the class checks the arithmetic together."
   ]
  },
  "discussion": [
   "If a service credit is small compared with the business loss of an outage, why do SLAs still matter when choosing a design?",
   "What costs and trade-offs come with deploying an application in a second region?"
  ],
  "exit": [
   [
    "About how much downtime does 99.99% allow in a 30-day month?",
    "About 4.3 minutes, because 43,200 x 0.0001 = 4.32."
   ],
   [
    "An app needs two services at 99.9% and 99.95%. Is the composite higher or lower than 99.9%?",
    "Lower, about 99.85%, because the SLAs are multiplied when both services are required."
   ],
   [
    "What do you usually receive when Microsoft misses an SLA?",
    "A service credit, a percentage discount on the affected service's bill that you must claim."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference table of SLA percentages with their allowed downtime and a worked multiplication example for students to follow step by step.",
   "Extend: Ask fast finishers to work out how many independent copies at 99% would be needed to exceed 99.99% availability, and explain the result."
  ]
 },
 {
  "t": "Scalability and elasticity: scaling up vs scaling out, manual vs automatic",
  "objectives": [
   "Students will be able to distinguish vertical scaling (up and down) from horizontal scaling (out and in).",
   "Students will be able to explain the difference between scalability and elasticity.",
   "Students will be able to describe how autoscale rules, schedules and minimum and maximum counts work.",
   "Students will be able to recommend a scaling approach for a described workload and state its trade-off."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and ask students to stand on one side of the room for one bigger server and the other side for more servers. Ask one person from each side to explain."
   ],
   [
    12,
    "Teach",
    "Draw one large box and several small boxes behind a load balancer. Label up, down, out and in. Show the autoscale CLI example on the projector and explain the CPU rule, the minimum and maximum counts, and the cool-down period. Define elasticity as automatic scaling in both directions."
   ],
   [
    18,
    "Activity",
    "Run the autoscale whiteboard design activity below in groups."
   ],
   [
    5,
    "Discuss",
    "Groups present their rules briefly. Use the discussion questions to compare designs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A website is slowing down because more people are visiting. Would you rather replace its server with one bigger server or add more servers of the same size? What could go wrong with each choice?",
  "activity": {
   "title": "Design the autoscale rules",
   "materials": "Printed traffic charts for three fictional workloads (made by the teacher), whiteboard sections or large paper, markers.",
   "steps": [
    "Give each group of three or four one traffic chart: a tax website with a yearly deadline spike, a news site with sudden unpredictable surges, and an office app busy only on weekday working hours.",
    "Groups decide whether the workload suits scaling up, scaling out or both, and write a one-sentence reason.",
    "Groups write autoscale settings in plain words: minimum count, maximum count, a metric rule or a schedule rule, and how cautiously to scale in.",
    "Groups mark on the chart where instances would be added and removed, and estimate when they would be paying for extra capacity.",
    "Groups swap charts with another group, check whether the rules would cope with the busiest point, and leave one suggestion."
   ]
  },
  "discussion": [
   "Why might a team still choose to scale up rather than out, even though scaling out can grow further?",
   "What could go wrong if an autoscale rule scales in too aggressively?"
  ],
  "exit": [
   [
    "Moving a VM to a size with more memory is which kind of scaling?",
    "Vertical scaling, also called scaling up."
   ],
   [
    "What distinguishes elasticity from scalability?",
    "Elasticity means capacity is added and removed automatically as demand changes; scalability is the general ability to change capacity, including manually."
   ],
   [
    "Why does an autoscale setting have a maximum instance count?",
    "To cap cost and prevent runaway scaling from a fault or an unexpected spike."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a filled-in example of autoscale settings for one workload to use as a model before they design their own.",
   "Extend: Ask fast finishers to explain how they would redesign a stateful application so it could scale out, and what they would store outside the servers."
  ]
 },
 {
  "t": "Reliability and predictability of performance and cost in the cloud",
  "objectives": [
   "Students will be able to define reliability and explain how zones, regions, backup and replication support it.",
   "Students will be able to distinguish performance predictability from cost predictability.",
   "Students will be able to choose between the Pricing Calculator, the TCO Calculator and Cost Management for a described need.",
   "Students will be able to explain what a budget does and does not do."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up prompt and have students list on a sticky note two things that could go wrong on launch night."
   ],
   [
    12,
    "Teach",
    "Sort the warm-up sticky notes into reliability, performance and cost on the board. Explain zones versus regions for reliability, autoscale and load balancing for performance predictability, and the three cost tools plus budgets for cost predictability."
   ],
   [
    18,
    "Activity",
    "Run the tool-match consulting activity below in groups."
   ],
   [
    5,
    "Discuss",
    "Groups share their recommendations. Emphasize that budgets alert and do not stop resources."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A charity's donation website will be shown on national television next month. What could go wrong that night, both for the website and for the charity's cloud bill?",
  "activity": {
   "title": "Cloud consultants: match the need to the tool",
   "materials": "Printed client request cards (about ten), a whiteboard with columns for reliability, performance predictability and cost predictability, sticky notes.",
   "steps": [
    "Give each group a stack of client request cards, such as 'we must survive the loss of a region', 'pages must stay fast during sales', 'estimate our planned deployment', 'compare our datacenter with Azure', 'warn us at 80% of budget'.",
    "Groups sort each card into the right benefit column on their desk.",
    "For each card, groups name the Azure feature or tool that meets it, such as availability zones, Azure Site Recovery, autoscale, load balancing, the Pricing Calculator, the TCO Calculator or a budget.",
    "Groups pick their two hardest cards and write a one-sentence justification for each on sticky notes.",
    "Groups post their sticky notes on the board, and the class resolves any disagreements."
   ]
  },
  "discussion": [
   "Why is reliability not automatic in the cloud even though Azure has many datacenters?",
   "If a budget only sends alerts, why might an organization choose not to automate shutting resources down when it is reached?"
  ],
  "exit": [
   [
    "Which tool estimates the cost of Azure resources you plan to deploy?",
    "The Pricing Calculator."
   ],
   [
    "Name two features that support performance predictability.",
    "Autoscaling and load balancing."
   ],
   [
    "Does reaching a budget threshold stop your resources?",
    "No; budgets send alerts, and stopping resources requires separate automation."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-row table that pairs each cost tool with the question it answers, for students to use during the activity.",
   "Extend: Ask fast finishers to sketch a design for the donation site that survives a datacenter failure and a regional failure, and list the cost controls they would add."
  ]
 },
 {
  "t": "Security, governance and manageability benefits of the cloud (management of the cloud vs in the cloud)",
  "objectives": [
   "Students will be able to describe security benefits of the cloud and how they vary by service type.",
   "Students will be able to explain governance and name Azure tools that support it, such as Azure Policy and resource locks.",
   "Students will be able to distinguish management of the cloud from management in the cloud.",
   "Students will be able to classify examples into security, governance or one of the two management categories."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up question. Collect answers and write them on the board under a heading 'problems'."
   ],
   [
    12,
    "Teach",
    "Map each warm-up problem to security, governance or manageability. Explain Azure Policy, locks and the hierarchy for governance. Draw two boxes labeled 'of' (acting on resources) and 'in' (tools to reach resources) and fill them with autoscale, templates, monitoring, alerts versus portal, CLI, PowerShell, Cloud Shell, APIs."
   ],
   [
    18,
    "Activity",
    "Run the of-or-in sorting game below."
   ],
   [
    5,
    "Discuss",
    "Review the tricky cards and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "An auditor finds servers in countries your company does not allow and a database someone deleted by accident. What kinds of controls would have prevented each problem?",
  "activity": {
   "title": "Of, in, or governance? Sorting game",
   "materials": "Printed example cards (about 18), three areas on the whiteboard labeled 'management of the cloud', 'management in the cloud' and 'governance', tape.",
   "steps": [
    "Give each group a shuffled deck with examples such as 'autoscale a web app', 'Azure PowerShell', 'require a cost-center tag', 'alert when CPU is high', 'Azure portal', 'delete lock on a database', 'deploy from a template', 'REST API call'.",
    "Groups sort the cards into the three categories.",
    "Groups pick one card per category and write a sentence explaining the clue that placed it there.",
    "Each group tapes three cards onto the board and reads its sentences.",
    "The class checks the board and moves any misplaced card, explaining why."
   ]
  },
  "discussion": [
   "Why can central policies in the cloud be easier to enforce than rules for physical servers?",
   "How could too many governance rules backfire for a development team?"
  ],
  "exit": [
   [
    "Is using Azure CLI to create a VM management of the cloud or in the cloud?",
    "Management in the cloud, because the CLI is a tool for reaching the environment."
   ],
   [
    "Is configuring autoscale management of the cloud or in the cloud?",
    "Management of the cloud, because it acts on the resources themselves."
   ],
   [
    "Which Azure service can block resources from being created outside approved regions?",
    "Azure Policy."
   ]
  ],
  "differentiation": [
   "Support: Give students a simple rule card: 'Is it a way to reach Azure? Then in. Does it act on resources? Then of. Is it a rule? Then governance.'",
   "Extend: Ask fast finishers to design a small governance plan for a fictional company, naming where in the hierarchy they would assign each policy and why."
  ]
 },
 {
  "t": "Infrastructure as a service (IaaS): what you manage and typical use cases such as lift-and-shift",
  "objectives": [
   "Students will be able to define IaaS and name typical Azure IaaS services.",
   "Students will be able to list the responsibilities that Microsoft and the customer each hold in IaaS.",
   "Students will be able to explain lift-and-shift migration and when IaaS is the right choice.",
   "Students will be able to recognize when PaaS would be a better choice than IaaS."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up scenario and ask pairs to list what they would still need to do after moving the server."
   ],
   [
    12,
    "Teach",
    "Show the three az commands from the lesson on the projector and point out every choice the customer makes: image, size, admin user, open port. Explain why opening RDP to the internet is risky and what Azure Bastion does. Describe lift-and-shift and other IaaS use cases, and contrast with PaaS."
   ],
   [
    18,
    "Activity",
    "Run the migration planning role-play below."
   ],
   [
    5,
    "Discuss",
    "Groups share their responsibility lists and their reasons for IaaS or PaaS. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your company moves a file server from its server room to an Azure virtual machine without changing anything. List three jobs your IT team still has to do after the move.",
  "activity": {
   "title": "Migration planning role-play",
   "materials": "Printed role cards (application owner, administrator, finance, security), printed workload descriptions for four fictional applications, whiteboard or large paper.",
   "steps": [
    "Form groups of four and hand out one role card per student and one set of workload descriptions per group, including a legacy app needing a custom driver, a new web app, a test lab for two weeks and an app needing administrator installs.",
    "For each workload, the group decides IaaS or PaaS, with each role adding one concern from its point of view.",
    "For every workload placed on IaaS, the administrator lists the customer's ongoing tasks: patching, backups, network rules, antivirus and access.",
    "The finance role notes how billing works for VMs and what to do with unused ones.",
    "Each group presents one workload to the class with its decision and responsibility list."
   ]
  },
  "discussion": [
   "Why do many organizations rehost first and modernize later, instead of rewriting everything before moving?",
   "What risks come with exposing a VM's remote desktop port to the internet, and how can they be reduced?"
  ],
  "exit": [
   [
    "Who patches the operating system of an Azure VM?",
    "The customer, because in IaaS the OS and everything above it are the customer's responsibility."
   ],
   [
    "What is lift-and-shift migration?",
    "Moving existing servers to cloud VMs with little or no change to the application."
   ],
   [
    "Give one reason to choose IaaS over PaaS.",
    "The workload needs full control of the operating system, custom or legacy software, or administrator-level installation."
   ]
  ],
  "differentiation": [
   "Support: Provide a checklist of customer responsibilities in IaaS that students can tick off for each workload during the role-play.",
   "Extend: Ask fast finishers to describe how they would modernize the legacy application in stages after a lift-and-shift, naming the PaaS services they would consider."
  ]
 },
 {
  "t": "Platform as a service (PaaS) and serverless: what the provider manages and typical use cases",
  "objectives": [
   "Students will be able to define PaaS and describe what Microsoft and the customer each manage.",
   "Students will be able to name examples of Azure PaaS services and their uses.",
   "Students will be able to explain serverless computing and distinguish Azure Functions from Logic Apps.",
   "Students will be able to choose between App Service, Azure Functions and Logic Apps for a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the board as 'server chores'."
   ],
   [
    12,
    "Teach",
    "Cross out the server chores that PaaS removes. Show the App Service CLI example on the projector. Introduce serverless with Azure Functions triggers and Logic Apps workflows, and explain the billing difference between an always-ready plan and per-execution billing."
   ],
   [
    18,
    "Activity",
    "Run the service matchmaker activity below in pairs."
   ],
   [
    5,
    "Discuss",
    "Pairs share their trickiest match. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you ran a website on your own server, what jobs would you have to do every month that have nothing to do with writing the website itself?",
  "activity": {
   "title": "Service matchmaker",
   "materials": "Printed requirement cards (about 12), three labeled envelopes or whiteboard columns for App Service, Azure Functions and Logic Apps, a fourth column labeled 'not PaaS', sticky notes.",
   "steps": [
    "Give each pair a set of requirement cards, such as 'run code when a file is uploaded', 'host an always-on company website', 'no-code approval workflow', 'app needs a custom OS driver', 'managed relational database'.",
    "Pairs place each card in a column, using the 'not PaaS' column for anything needing OS control.",
    "For each card, pairs write the clue words that decided it on a sticky note.",
    "Pairs join another pair and compare placements, resolving differences by pointing to the clue words.",
    "The class reviews any card with disagreement, and the teacher confirms the answer."
   ]
  },
  "discussion": [
   "What control do developers give up when they move from IaaS to PaaS, and when does that matter?",
   "Why might a team use App Service and Azure Functions together in one solution?"
  ],
  "exit": [
   [
    "In PaaS, who patches the operating system?",
    "Microsoft, because in PaaS the provider manages the OS and runtime."
   ],
   [
    "Which Azure service runs small pieces of code in response to events and bills per execution?",
    "Azure Functions."
   ],
   [
    "Which service builds low-code workflows that connect services?",
    "Azure Logic Apps."
   ]
  ],
  "differentiation": [
   "Support: Give students a clue-word list for each service (always-on website, event, no-code workflow) to use while matching cards.",
   "Extend: Ask fast finishers to sketch a small solution that combines App Service, Azure SQL Database, a function and a logic app, and label who manages each layer."
  ]
 },
 {
  "t": "Software as a service (SaaS) and choosing between IaaS, PaaS and SaaS for a scenario",
  "objectives": [
   "Students will be able to define SaaS and give examples.",
   "Students will be able to describe the customer's remaining responsibilities in SaaS.",
   "Students will be able to compare IaaS, PaaS and SaaS by control, flexibility and management effort.",
   "Students will be able to select the appropriate service type for a business scenario and justify it."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and take a quick show of hands for each option."
   ],
   [
    12,
    "Teach",
    "Define SaaS with Microsoft 365 and Dynamics 365 as examples. Draw a three-column comparison of IaaS, PaaS and SaaS with rows for who manages the OS, the app and the data, plus control and effort. Present the two deciding questions: how much control is needed, and who should do the operational work."
   ],
   [
    18,
    "Activity",
    "Run the IT advisor role-play below in small groups."
   ],
   [
    5,
    "Discuss",
    "Groups present one recommendation each. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your school needs email for all staff. Would you build an email server, rent a platform and write your own email software, or subscribe to a ready-made service? Why?",
  "activity": {
   "title": "IT advisor role-play",
   "materials": "Printed request cards from fictional departments (about eight), printed role cards for 'requester' and 'advisor', a whiteboard with IaaS, PaaS and SaaS columns.",
   "steps": [
    "In groups of three, one student plays a department requester reading a request card, such as 'sales needs a CRM next month' or 'finance must move a legacy app with a custom driver'.",
    "The other two act as advisors, ask up to three clarifying questions about control needs and in-house skills, and recommend a service type.",
    "Advisors state one responsibility the department will still have under their recommendation.",
    "Students rotate roles and repeat with new cards until each has advised at least twice.",
    "Each group writes its best recommendation in the matching whiteboard column with a one-line reason."
   ]
  },
  "discussion": [
   "Why might an organization pay for SaaS even when its own team could build the same application?",
   "What risks come from assuming SaaS needs no security configuration?"
  ],
  "exit": [
   [
    "A company needs email for staff without deploying or maintaining anything. Which service type fits?",
    "SaaS, such as Microsoft 365."
   ],
   [
    "Which service type requires the most customer management?",
    "IaaS."
   ],
   [
    "In SaaS, who decides whether files can be shared outside the organization?",
    "The customer, because configuration, data and accounts stay with the customer."
   ]
  ],
  "differentiation": [
   "Support: Provide a flowchart with the two deciding questions that leads students to IaaS, PaaS or SaaS during the role-play.",
   "Extend: Ask fast finishers to write a one-page proposal for a fictional company that uses all three service types, listing the shared responsibility split for each workload."
  ]
 },
 {
  "t": "Azure regions, region pairs and sovereign regions (Azure Government, Azure operated by 21Vianet in China)",
  "objectives": [
   "Students will be able to define an Azure region and a geography and list the factors for choosing a region.",
   "Students will be able to describe the benefits of region pairs.",
   "Students will be able to explain what sovereign regions are and identify Azure Government and Azure operated by 21Vianet.",
   "Students will be able to distinguish protection from a datacenter failure (zones) from protection from a regional failure (second region)."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers. Point out that each answer is a region-selection factor."
   ],
   [
    12,
    "Teach",
    "Project a world map and mark a few regions, grouping them into geographies. Draw two paired regions and list the pair benefits: prioritized recovery, staggered updates, data residency and built-in replication such as GRS. Explain sovereign regions with Azure Government and 21Vianet. Contrast zones and region pairs."
   ],
   [
    18,
    "Activity",
    "Run the region selection board activity below in groups."
   ],
   [
    5,
    "Discuss",
    "Groups present their choices. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you were launching a website for customers in Germany, what would you consider when choosing where in the world to host it?",
  "activity": {
   "title": "Region selection board",
   "materials": "A projected or printed world map, printed client brief cards (five fictional organizations with location, user base and compliance needs), sticky notes, markers.",
   "steps": [
    "Give each group a client brief, such as a German retailer with in-country data rules, a US state agency, a business needing to serve users in Asia quickly, or a company that must survive a regional disaster.",
    "Groups choose a primary region or cloud for their client and write the four selection factors (latency, service availability, cost, compliance) with a note on each.",
    "Groups decide how the client should handle a datacenter failure and a regional failure, naming zones or a second region.",
    "Groups place a sticky note on the map for each region they chose and draw a line for any pairing.",
    "Each group presents in one minute while the class checks for the common traps, such as using Azure Government for a commercial client."
   ]
  },
  "discussion": [
   "Why might an organization choose a region that is not the cheapest or the closest to its users?",
   "What trade-offs come with deploying across two regions instead of across zones in one region?"
  ],
  "exit": [
   [
    "Give two benefits of region pairs.",
    "Any two of: prioritized recovery of one region in each pair during a broad outage, staggered platform updates, and data replication such as GRS to the pair within the same geography."
   ],
   [
    "Who operates Azure in China?",
    "21Vianet, a separate company, rather than Microsoft directly."
   ],
   [
    "A company wants to survive the failure of one datacenter within a region. Is that a zone or a region-pair question?",
    "A zone question, because availability zones are separate datacenters within one region."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference sheet listing the four region selection factors and the pair benefits for students to use with their client brief.",
   "Extend: Ask fast finishers to compare the design for their client using zones only, a region pair, and both, and describe what each protects against."
  ]
 },
 {
  "t": "Availability zones and datacenters: zonal vs zone-redundant services",
  "objectives": [
   "Students will be able to describe the relationship between datacenters, availability zones and regions.",
   "Students will be able to distinguish zonal services from zone-redundant and non-regional services using examples.",
   "Students will be able to identify single points of failure in a described Azure design and propose zone-aware fixes.",
   "Students will be able to match a failure scope (rack, datacenter, region) to the Azure feature that protects against it."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the board without judging them. Point out that every answer is really about where copies are kept."
   ],
   [
    12,
    "Teach",
    "Draw a large circle labeled Region with three smaller circles labeled Zone 1, 2 and 3, each with a datacenter icon. Explain independent power, cooling and networking, the minimum of three zones, and that not every region has zones. Place a VM in zone 1 and say 'zonal'. Draw ZRS storage spanning all three and say 'zone-redundant'. Put Entra ID outside the region circle as non-regional. Finish with the ladder: availability set, zone, region."
   ],
   [
    18,
    "Activity",
    "Run the 'Pull the plug' design review in groups of three, as described in the activity."
   ],
   [
    5,
    "Discuss",
    "Groups report which components failed in their scenario. Draw out the idea that resilience is only as strong as the weakest zonal component."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper or a sticky note and hand them in."
   ]
  ],
  "warmup": "Your family photos are on one laptop. List every event that could destroy them, then say where you would keep a second copy so that no single event loses both.",
  "activity": {
   "title": "Pull the plug: zone failure design review",
   "materials": "Printed architecture cards (one per group) showing a small app with labeled components and their zone placement or redundancy setting, a set of 'outage' cards (Zone 1 down, Zone 2 down, Zone 3 down, Region down), whiteboard markers.",
   "steps": [
    "Give each group an architecture card. Example: web VMs in zones 1 and 2, a load balancer marked zone-redundant, one database VM in zone 3, storage marked LRS, DNS hosted in Azure DNS.",
    "Each group labels every component as zonal, zone-redundant or non-regional and writes the label on the card.",
    "The teacher draws an outage card and reads it aloud. Groups cross out every component that would fail and decide whether the app is still up.",
    "Repeat with two more outage cards, including 'Region down'.",
    "Groups redesign the card so the app survives any single zone outage, and write one sentence on what it would take to survive a regional outage."
   ]
  },
  "discussion": [
   "Why might a business accept a single-zone design even after seeing the risk?",
   "If zone redundancy costs more, how would you decide which components deserve it first?"
  ],
  "exit": [
   [
    "What is the difference between a zonal and a zone-redundant service?",
    "A zonal resource is pinned to one zone you choose and fails with it; a zone-redundant service is spread across zones by the platform and keeps running if one zone fails."
   ],
   [
    "How many availability zones does a zone-enabled region have at minimum?",
    "Three."
   ],
   [
    "Which protects against a full regional outage: availability zones or a second region?",
    "A second region, such as the paired region, because all zones are inside a single region."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column sort sheet with component names (VM in zone 1, ZRS storage, Azure Front Door, zone-redundant load balancer) and have them place each under 'stays in one zone' or 'spread for me' before the main activity.",
   "Extend: Ask fast finishers to add cost to their redesign, listing which changes add extra instances or inter-zone data transfer, and to argue which single change gives the most resilience for the money."
  ]
 },
 {
  "t": "Azure resources, resource groups, subscriptions and management groups: the hierarchy and what each is for",
  "objectives": [
   "Students will be able to order the four levels of the Azure hierarchy and state the purpose of each.",
   "Students will be able to explain how policies and role assignments inherit downward and identify that tags do not.",
   "Students will be able to choose the correct level for a billing, governance or lifecycle requirement.",
   "Students will be able to design a simple hierarchy for a described organization."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Sketch the students' answers as nested boxes on the board to preview the idea of containers within containers."
   ],
   [
    12,
    "Teach",
    "Build the hierarchy on the board from the bottom up: resource, resource group, subscription, management group, root. For each level, write one 'job' word: thing, lifecycle, billing, governance. Demonstrate inheritance by drawing a policy at the top and arrows flowing down. Call out the traps: no nested resource groups, one group per resource, location is metadata only, tags do not inherit."
   ],
   [
    18,
    "Activity",
    "Run the 'Build the org chart' sticky-note activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Two pairs present their hierarchies. Compare where they placed policies and subscriptions and why."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If your school had to send one bill to each department and also enforce one rule for every classroom, how would you organize the paperwork?",
  "activity": {
   "title": "Build the org chart with sticky notes",
   "materials": "Sticky notes in four colors (one per hierarchy level), a printed scenario card per pair, whiteboard or poster paper, markers.",
   "steps": [
    "Give each pair a scenario card, for example: a hospital with Clinical and Research divisions, each needing separate billing for production and test, a rule that data stays in one geography, and three applications that must be deleted independently.",
    "Pairs build the hierarchy on poster paper using one color per level, starting with the root management group.",
    "Pairs write each requirement on a plain note and stick it at the level where they would apply it (policy, budget, role assignment, delete).",
    "The teacher walks around and asks each pair to point to where billing is separated and where a policy would reach every subscription.",
    "Pairs swap posters with a neighbor, who checks for nested resource groups or resources in two groups and leaves one comment."
   ]
  },
  "discussion": [
   "What are the trade-offs of creating many subscriptions versus a few large ones?",
   "Why might Microsoft have decided that tags do not inherit automatically?"
  ],
  "exit": [
   [
    "List the four hierarchy levels from top to bottom.",
    "Management groups, subscriptions, resource groups, resources."
   ],
   [
    "A company needs separate invoices for its two departments. What should it create?",
    "A separate subscription for each department, because the subscription is the billing boundary."
   ],
   [
    "A Reader role is assigned at a subscription. Can the user read a storage account in a resource group in that subscription? Why?",
    "Yes, because role assignments are inherited by all child scopes."
   ]
  ],
  "differentiation": [
   "Support: Provide a partly completed hierarchy diagram with blanks for the level names and a word bank, and pair the student with a peer for the scenario.",
   "Extend: Ask students to add a second Entra tenant scenario (a merger) and explain why a subscription can trust only one tenant and what that means for their design."
  ]
 },
 {
  "t": "Compute: virtual machines, VM scale sets, availability sets and Azure Virtual Desktop",
  "objectives": [
   "Students will be able to describe when a VM is the right compute choice and what the customer manages on it.",
   "Students will be able to compare VM scale sets, availability sets and availability zones by what each protects against or provides.",
   "Students will be able to explain fault domains and update domains.",
   "Students will be able to identify scenarios that call for Azure Virtual Desktop."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list answers. Connect 'computer you rent' to VMs and 'use from anywhere' to Azure Virtual Desktop."
   ],
   [
    13,
    "Teach",
    "Draw one VM and list what the customer manages. Explain Stopped versus Stopped (deallocated) billing. Draw a scale set growing from 3 to 6 identical VMs under load. Draw two racks labeled fault domain 0 and 1 with VMs split across them, then color VMs by update domain. Finish with a laptop connecting to a cloud desktop for Azure Virtual Desktop and mention multi-session."
   ],
   [
    17,
    "Activity",
    "Run the 'Match the need' scenario card sort in groups of three."
   ],
   [
    5,
    "Discuss",
    "Review contested cards as a class, especially availability set versus availability zone."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "If you could rent a computer for one hour instead of buying it, what would you use it for, and what would you still have to take care of yourself?",
  "activity": {
   "title": "Match the need: compute card sort",
   "materials": "Printed scenario cards (about 12) and four header cards: Virtual machine, VM scale set, Availability set, Azure Virtual Desktop. One set per group.",
   "steps": [
    "Groups lay out the four header cards across a desk.",
    "Groups read each scenario card (for example, 'call center agents on personal tablets', 'web shop with evening peaks', 'two legacy servers that must not reboot together', 'custom software needing full OS control') and place it under a header.",
    "For each placement, the group writes on the back of the card the clue word that decided it.",
    "The teacher adds two 'trap' cards, such as 'protect against a whole datacenter outage', and groups must explain why none of the four headers is the best answer.",
    "Groups compare one placement with a neighboring group and resolve any differences."
   ]
  },
  "discussion": [
   "What are the risks of putting company data on contractors' personal laptops, and how does Azure Virtual Desktop change that?",
   "Why must an application be stateless to work well in a scale set?"
  ],
  "exit": [
   [
    "What does a fault domain protect against?",
    "A hardware failure such as a rack losing power or a network switch, because VMs are spread across hardware that does not share those components."
   ],
   [
    "Which service adds and removes identical VMs automatically based on demand?",
    "A virtual machine scale set with autoscale."
   ],
   [
    "A VM shows Stopped (deallocated). What are you still billed for?",
    "Its disks, but not compute."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page comparison table with blanks for 'what it is' and 'clue words' for each service to fill in during the teach segment and use during the card sort.",
   "Extend: Ask fast finishers to design compute for a company that needs both a scalable web tier and protection from a datacenter loss, and explain why combining scale sets with zones beats an availability set."
  ]
 },
 {
  "t": "Containers and serverless compute: Container Instances, Container Apps, AKS, Azure Functions and App Service",
  "objectives": [
   "Students will be able to explain how containers differ from virtual machines.",
   "Students will be able to compare Azure Container Instances, Azure Container Apps and AKS by complexity and control.",
   "Students will be able to distinguish Azure Functions from App Service by workload type and billing model.",
   "Students will be able to select the best compute service for a described scenario using clue words."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers. Use them to introduce the idea that the right tool depends on how often and how long the work runs."
   ],
   [
    13,
    "Teach",
    "Draw a VM stack (hardware, hypervisor, guest OS, app) beside a container stack (hardware, host OS, container runtime, apps) and point out the shared kernel. Draw a ladder from ACI to Container Apps to AKS, labeling each rung with 'what you manage'. Then contrast Functions (event, short, per execution) with App Service (always-on web app, deployment slots)."
   ],
   [
    17,
    "Activity",
    "Run the 'Service hiring panel' role-play in groups of five."
   ],
   [
    5,
    "Discuss",
    "Ask each group which candidate was hired most often and which was never hired, and why."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you needed to get across town once, would you buy a car, rent one or take a taxi? What changes your answer if you need to make the trip a hundred times a day?",
  "activity": {
   "title": "Service hiring panel",
   "materials": "Printed 'candidate' cards for ACI, Container Apps, AKS, Functions and App Service (each listing strengths and what the customer manages), printed 'job posting' cards describing workloads, sticky notes.",
   "steps": [
    "In each group of five, each student takes one candidate card and reads it for two minutes.",
    "The teacher reads a job posting aloud, for example 'run a container for 15 minutes each night, no orchestration needed' or 'host a company website with a staging environment'.",
    "Each candidate gets 20 seconds to pitch why they fit or honestly decline.",
    "The group hires one candidate per posting and writes the deciding clue word on a sticky note.",
    "After five postings, groups post their sticky notes on the board under each service name for a class-wide comparison."
   ]
  },
  "discussion": [
   "When would the extra control of AKS be worth the extra work compared with Container Apps?",
   "What are the risks of choosing a serverless option for a workload that runs constantly?"
  ],
  "exit": [
   [
    "What do containers share with their host that VMs do not?",
    "The host operating system kernel."
   ],
   [
    "A team needs microservices that scale to zero but has no Kubernetes experience. Which service fits?",
    "Azure Container Apps."
   ],
   [
    "Which service would host an always-on web API with deployment slots?",
    "Azure App Service."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision flowchart with yes or no questions (Is it a website? Is it triggered by an event? One container or many? Need Kubernetes control?) that leads to each service.",
   "Extend: Ask students to design the compute for a ride-sharing app using at least three of the services and justify each choice in one sentence."
  ]
 },
 {
  "t": "Virtual networks, subnets, peering, Azure DNS, and public vs private endpoints",
  "objectives": [
   "Students will be able to describe VNets, subnets and NSGs and how they isolate and filter traffic.",
   "Students will be able to explain the requirements and limits of VNet peering, including non-overlapping addresses and non-transitivity.",
   "Students will be able to state what Azure DNS does and does not do.",
   "Students will be able to compare public and private endpoints and explain how a private endpoint reduces exposure."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Relate the answers to private versus public addresses and to separate rooms with locked doors."
   ],
   [
    13,
    "Teach",
    "Draw two VNets as boxes with address spaces 10.1.0.0/16 and 10.2.0.0/16, each split into subnets. Add an NSG icon on the database subnet with one allow rule. Draw a peering line and then a third VNet to show non-transitivity. Add a cloud icon for Azure DNS and a registrar box. Finish by drawing a storage account outside the VNet with a public arrow, then a private endpoint inside the subnet, then crossing out the public arrow."
   ],
   [
    17,
    "Activity",
    "Run the 'Network detective' diagram troubleshooting activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Review the answers to each broken diagram and ask which mistake would be most dangerous in production."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your apartment building has a mailroom anyone can walk into and private mailboxes only residents can open. Which would you use for a package containing your passport, and why?",
  "activity": {
   "title": "Network detective",
   "materials": "Printed network diagrams (four per pair), each with one problem: overlapping address spaces on peered VNets, an expected transitive path, a private endpoint with public access still enabled, and a team trying to buy a domain in Azure DNS. Red pens.",
   "steps": [
    "Pairs receive the four diagrams face down and turn over the first one.",
    "Pairs read the short ticket at the top of each diagram (for example, 'Spoke A cannot reach Spoke B') and circle the problem in red.",
    "For each, pairs write the fix in one or two sentences directly on the diagram.",
    "After all four, pairs rank the problems by security impact, from most to least serious.",
    "The teacher projects each diagram and invites one pair to explain their fix."
   ]
  },
  "discussion": [
   "Why is it useful that VNets are isolated by default rather than connected by default?",
   "What could go wrong for users if you disable public access on a storage account before updating DNS?"
  ],
  "exit": [
   [
    "Name two requirements or limits of VNet peering.",
    "Address spaces must not overlap, and peering is not transitive (it also must be configured in both directions)."
   ],
   [
    "Does Azure DNS register domain names?",
    "No, it hosts DNS zones and records; you buy the domain from a registrar."
   ],
   [
    "What must you do, in addition to creating a private endpoint, to remove a storage account's internet exposure?",
    "Disable public network access on the storage account."
   ]
  ],
  "differentiation": [
   "Support: Give students a labeled 'house' diagram mapping VNet to house, subnet to room, NSG to door lock, peering to a hallway and private endpoint to a back door, and let them refer to it during the activity.",
   "Extend: Ask students to design a hub-and-spoke layout for three teams with non-overlapping address ranges and explain how they would let spokes reach each other."
  ]
 },
 {
  "t": "Hybrid connectivity: VPN Gateway (site-to-site, point-to-site) vs ExpressRoute",
  "objectives": [
   "Students will be able to explain how Azure VPN Gateway connects on-premises networks to Azure and what protocols secure it.",
   "Students will be able to distinguish site-to-site from point-to-site VPN connections.",
   "Students will be able to compare VPN Gateway and ExpressRoute on path, encryption, performance, cost and setup time.",
   "Students will be able to recommend a hybrid connectivity option for a described business requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sort answers into 'secure but public' and 'private'. Tell students today's lesson is about that exact difference."
   ],
   [
    13,
    "Teach",
    "Draw an office, the internet cloud and an Azure VNet. Draw a locked tunnel through the internet for site-to-site, then a single laptop tunnel for point-to-site, and label GatewaySubnet. Then draw a separate line from the office through a partner box to Microsoft, labeled ExpressRoute, avoiding the internet cloud. Build a comparison table on the board: path, encrypted by default, performance, cost, setup time."
   ],
   [
    17,
    "Activity",
    "Run the 'Consultant pitch' scenario activity in groups of three."
   ],
   [
    5,
    "Discuss",
    "Groups share their most debated scenario. Emphasize the 'private is not encrypted' point."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You need to send a valuable package across the country. Would you rather use a locked box sent by regular mail, or a private courier on a dedicated route? What would make you pay more for the courier?",
  "activity": {
   "title": "Consultant pitch: choosing hybrid connectivity",
   "materials": "Printed client brief cards (six), a blank comparison grid per group, whiteboard markers.",
   "steps": [
    "Each group draws two client brief cards, for example 'one remote auditor needs access for two weeks' or 'a stock exchange moving terabytes nightly under a no-internet rule'.",
    "Groups fill in the comparison grid for each brief: recommended option, connection type, why, and one risk or cost.",
    "Each group prepares a 60-second pitch for one client, including whether extra encryption is needed.",
    "The teacher plays the skeptical client and asks one follow-up question, such as 'is it encrypted?' or 'how fast can we start?'.",
    "Groups revise their recommendation if the follow-up exposed a gap."
   ]
  },
  "discussion": [
   "Why might an organization keep a site-to-site VPN even after buying ExpressRoute?",
   "How should a business weigh the higher cost of ExpressRoute against the risk of variable internet performance?"
  ],
  "exit": [
   [
    "What is the difference between site-to-site and point-to-site VPN?",
    "Site-to-site connects a whole on-premises network through a VPN device; point-to-site connects one computer using VPN client software."
   ],
   [
    "Which option keeps traffic off the public internet?",
    "ExpressRoute."
   ],
   [
    "True or false: ExpressRoute encrypts traffic by default. Explain.",
    "False. It is a private connection but not automatically encrypted; encryption such as MACsec or IPsec can be added."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-question decision card (Must it avoid the internet? One device or whole office? Tight budget or tight timeline?) for students to use during the activity.",
   "Extend: Ask students to design connectivity for a company with headquarters, 40 branches and remote staff, using all three of ExpressRoute, site-to-site and point-to-site, and explain the failover path."
  ]
 },
 {
  "t": "Azure Storage services (Blob, Files, Queue, Table, Disks), storage account types and access tiers (Hot, Cool, Cold, Archive)",
  "objectives": [
   "Students will be able to match Blob, Files, Queue, Table and Disks to appropriate data scenarios.",
   "Students will be able to identify Standard general-purpose v2 as the recommended account type and explain when Premium fits.",
   "Students will be able to compare Hot, Cool, Cold and Archive tiers by cost, minimum retention and access speed.",
   "Students will be able to explain rehydration and design a simple lifecycle management rule."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. List student answers and note how 'how often I need it' decided where they keep things."
   ],
   [
    13,
    "Teach",
    "Draw a storage account box containing five smaller boxes labeled Blob, Files, Queue, Table, Disks, with a one-line use case under each. Explain the naming rules and the general-purpose v2 recommendation. Then draw a staircase going down: Hot, Cool (30), Cold (90), Archive (180, offline). Show storage cost dropping and access cost rising. Explain rehydration and lifecycle rules."
   ],
   [
    17,
    "Activity",
    "Run the 'Data placement auction' card activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Pairs share any data card where they disagreed about the tier. Discuss the cost of choosing too cold a tier."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think about everything you own. What do you keep within arm's reach, what goes in a closet and what goes in long-term storage? What decides where each thing goes?",
  "activity": {
   "title": "Data placement auction",
   "materials": "Printed data cards (about 12) describing data, how often it is read and how quickly it is needed; a placement sheet with columns for service and tier; sticky notes.",
   "steps": [
    "Give each pair a stack of data cards, for example 'security camera footage kept 1 year, reviewed only after incidents', 'order messages between web and billing', 'shared department drive', 'tax records kept 7 years, two days allowed to retrieve'.",
    "Pairs decide the storage service for each card and, for blob data, the access tier.",
    "Pairs write a one-line lifecycle rule for any card whose access pattern changes over time.",
    "The teacher announces 'surprise requests', such as 'a regulator needs last year's camera footage in 10 minutes', and pairs check whether their tier choice survives.",
    "Pairs adjust placements and note what each change would cost or save."
   ]
  },
  "discussion": [
   "How would you explain to a finance team why the cheapest tier is not always the cheapest choice?",
   "Who in an organization should decide how long data stays in each tier, and why?"
  ],
  "exit": [
   [
    "Which storage service would you use to decouple two parts of an application with messages?",
    "Queue storage."
   ],
   [
    "List the minimum retention periods for Cool, Cold and Archive.",
    "Cool 30 days, Cold 90 days, Archive 180 days."
   ],
   [
    "Why can't you read an Archive blob immediately?",
    "Archive is offline; the blob must first be rehydrated to an online tier, which can take hours."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card with each service's clue words and the tier staircase with minimum days and online or offline labels.",
   "Extend: Ask students to design a complete lifecycle policy for a hospital imaging system across all four tiers, including deletion, and explain the risk of each threshold."
  ]
 },
 {
  "t": "Storage redundancy: LRS, ZRS, GRS, GZRS and read-access secondary options",
  "objectives": [
   "Students will be able to describe where LRS, ZRS, GRS and GZRS place copies of data and how many copies each keeps.",
   "Students will be able to explain the difference between geo-redundant and read-access geo-redundant options.",
   "Students will be able to explain why asynchronous replication can lose recent writes and what the last sync time means.",
   "Students will be able to select a redundancy option that matches a stated failure and cost requirement, and explain why redundancy is not backup."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and tally answers on the board. Highlight that each answer protects against a different size of disaster."
   ],
   [
    13,
    "Teach",
    "Draw two region boxes labeled Primary and Secondary, with three zone circles inside Primary. Place three dots in one datacenter for LRS, three dots across zones for ZRS, then add three dots in Secondary for GRS and GZRS. Draw a dashed arrow for asynchronous replication and label last sync time. Add an eye icon on the secondary for RA- variants. Finish with a slide on redundancy versus backup."
   ],
   [
    17,
    "Activity",
    "Run the 'Disaster dice' scenario game in groups of four."
   ],
   [
    5,
    "Discuss",
    "Groups share the choice they found hardest. Ask what a business loses if it overpays for redundancy it does not need."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You have one copy of an irreplaceable photo. Where would you put three backups so that a house fire, a city-wide flood and an accidental delete each leave at least one safe?",
  "activity": {
   "title": "Disaster dice",
   "materials": "One die per group, a printed disaster table (1 disk fails, 2 rack fails, 3 datacenter fire, 4 zone outage, 5 region outage, 6 someone deletes a file), printed requirement cards, a scoring sheet.",
   "steps": [
    "Each group draws a requirement card, for example 'lowest cost', 'must keep reading during a regional outage without failover' or 'must survive a zone loss with writes continuing'.",
    "The group chooses one redundancy option (LRS, ZRS, GRS, GZRS, RA-GRS or RA-GZRS) to meet the card.",
    "A student rolls the die and the group decides whether their data survives and stays readable, using the disaster table.",
    "Groups roll five times, recording outcomes. A roll of 6 should prompt them to note that no redundancy option protects against deletion.",
    "Groups write a final recommendation that combines a redundancy option with a protection feature such as soft delete or backup."
   ]
  },
  "discussion": [
   "Why do you think Microsoft does not make RA-GZRS the default for every account?",
   "How would you explain the difference between redundancy and backup to a non-technical manager?"
  ],
  "exit": [
   [
    "Which option keeps three copies across availability zones in one region?",
    "ZRS."
   ],
   [
    "What does the RA in RA-GRS add?",
    "Read access to the secondary region at any time, through a secondary endpoint, without a failover."
   ],
   [
    "Why is redundancy not a replacement for backup?",
    "Redundancy replicates every change, including accidental deletions and corruption, so you need soft delete, versioning or backup to recover earlier data."
   ]
  ],
  "differentiation": [
   "Support: Give students a printed grid with the six options down the side and columns for 'survives datacenter loss', 'survives region loss' and 'readable secondary without failover', to fill in during teaching.",
   "Extend: Ask students to explain what happens to data written in the minutes before a regional outage under GZRS, and how an application using RA-GZRS should handle possibly stale reads."
  ]
 },
 {
  "t": "Moving data and migrating: AzCopy, Storage Explorer, Azure File Sync, Azure Migrate and Azure Data Box",
  "objectives": [
   "Students will be able to describe the purpose of AzCopy, Storage Explorer, Azure File Sync, Azure Migrate and Azure Data Box.",
   "Students will be able to distinguish one-way copy and sync tools from continuous two-way file synchronization.",
   "Students will be able to explain when an offline transfer with Data Box is preferable to a network upload.",
   "Students will be able to select the right migration or transfer tool for a described scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list the methods students suggest. Map them loosely to carrying boxes, a moving truck and a surveyor."
   ],
   [
    13,
    "Teach",
    "Create a five-column table on the board: tool, interface or form, what it moves, direction, clue words. Fill it in for AzCopy, Storage Explorer, File Sync, Migrate and Data Box. Show the AzCopy commands on the projector and stress one-way sync. Draw a branch file server syncing both ways with an Azure file share, with cloud tiering shown as faded file icons."
   ],
   [
    17,
    "Activity",
    "Run the 'Migration planning desk' activity in groups of three."
   ],
   [
    5,
    "Discuss",
    "Groups compare plans and explain any tool they used that others did not."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You are moving to a new home in another city. What would you carry yourself, what would you put on a truck, and what would you want someone to inventory and quote first?",
  "activity": {
   "title": "Migration planning desk",
   "materials": "A printed company profile per group listing file servers, data volumes, servers and network speed; five tool cards; poster paper and markers.",
   "steps": [
    "Groups read their company profile, for example a museum with a 200-terabyte digitized collection, three branch file servers, ten VMs and a slow internet link.",
    "Groups break the profile into separate migration tasks and write each on the poster.",
    "For each task, groups place a tool card beside it and write the clue that justified the choice.",
    "Groups add a timeline showing the order they would use the tools, such as assess with Azure Migrate before moving servers.",
    "Groups trade posters with another group, who checks for one misuse such as AzCopy for two-way sync and leaves a sticky-note comment."
   ]
  },
  "discussion": [
   "Why might an organization choose Data Box even if a network upload is technically possible?",
   "What risks does cloud tiering introduce if a branch office loses its internet connection?"
  ],
  "exit": [
   [
    "Which tool provides continuous two-way sync between Windows file servers and Azure Files?",
    "Azure File Sync."
   ],
   [
    "Which service would you use to discover, assess and migrate on-premises servers?",
    "Azure Migrate."
   ],
   [
    "A site has 400 terabytes to move and a slow link. What should it use?",
    "Azure Data Box, for offline transfer on a physical device."
   ]
  ],
  "differentiation": [
   "Support: Provide a clue-word cheat sheet (command line, graphical, two-way and cache, assess servers, offline) next to each tool name for use during the activity.",
   "Extend: Ask students to estimate whether a network upload or Data Box is faster for a given data size and link speed, using simple arithmetic, and explain what else besides speed affects the decision."
  ]
 },
 {
  "t": "Microsoft Entra ID and Entra Domain Services; authentication methods: SSO, MFA and passwordless",
  "objectives": [
   "Students will be able to describe Microsoft Entra ID as a cloud identity and access management service and explain what a tenant is.",
   "Students will be able to distinguish Entra ID, Entra Domain Services and Entra Connect by purpose and protocols.",
   "Students will be able to compare SSO, MFA and passwordless authentication and classify sign-in evidence into know, have and are.",
   "Students will be able to recommend an identity service or sign-in method for a described scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students how many passwords they use each week and what happens when one leaks. Collect two or three answers on the board and connect them to the idea that identity is the new security perimeter."
   ],
   [
    15,
    "Teach",
    "Explain Entra ID, tenants and the old Azure AD name. Draw a hybrid diagram with on-premises AD, Entra Connect, Entra ID and an Entra Domain Services managed domain, labeling the protocols each side uses. Then define SSO, MFA and passwordless, stressing that SSO is convenience, not an extra factor."
   ],
   [
    15,
    "Activity",
    "Run the factor and service card sort described below in pairs. Circulate and ask each pair to justify one placement aloud."
   ],
   [
    5,
    "Discuss",
    "Review the cards that caused disagreement, especially password plus security question and SMS codes, and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Think of the last time you reset a password. How did the site prove the request was really you, and could an attacker have done the same thing?",
  "activity": {
   "title": "Sort the sign-in and the service",
   "materials": "Printed cards (one set per pair), whiteboard with three columns labeled Know, Have, Are and a second area labeled Entra ID, Entra Domain Services, Entra Connect.",
   "steps": [
    "Give each pair two decks. Deck A holds sign-in evidence: password, PIN, security question, Authenticator push, FIDO2 key, text message code, fingerprint, face scan.",
    "Pairs place each Deck A card under Know, Have or Are, then build three sign-in combinations and label each as single-factor, MFA or passwordless.",
    "Deck B holds requirements: sign in once to many apps, sync on-premises users, LDAP for an old app, Group Policy for Azure VMs, block phished passwords, cloud directory for Microsoft 365. Pairs match each to Entra ID, Entra Domain Services, Entra Connect, SSO, MFA or passwordless.",
    "Each pair posts its most debated card on the board with a one-sentence justification for the class to review."
   ]
  },
  "discussion": [
   "Why might an organization keep text message codes as an MFA option even though they are weaker than an app or a key?",
   "If SSO means one sign-in opens everything, does it make a stolen credential more dangerous, and what reduces that risk?"
  ],
  "exit": [
   [
    "Which service provides domain join, LDAP and Kerberos without you managing domain controllers?",
    "Microsoft Entra Domain Services."
   ],
   [
    "Is a password plus a PIN multifactor authentication? Why or why not?",
    "No. Both are something you know, so it is a single factor."
   ],
   [
    "What does Microsoft Entra Connect do?",
    "It synchronizes users and groups from on-premises Active Directory to Entra ID to create a hybrid identity."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference strip listing each service with one clue word (cloud directory, managed domain, sync) and the three factor categories with one example each, to use during the card sort.",
   "Extend: Ask fast finishers to design a sign-in plan for a hospital with nurses on shared workstations and remote administrators, choosing between SSO, MFA methods and passwordless options and explaining the phishing risk each choice addresses."
  ]
 },
 {
  "t": "External identities (B2B and customer identity) and Conditional Access",
  "objectives": [
   "Students will be able to distinguish B2B collaboration from customer identity by the type of user and directory involved.",
   "Students will be able to explain how guest users sign in without the host organization storing their passwords.",
   "Students will be able to identify Conditional Access signals and decisions and write a policy in if-then form.",
   "Students will be able to state the licensing requirement for Conditional Access and the purpose of report-only mode."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list student answers in two columns, people you work with and people you sell to, without naming the services yet."
   ],
   [
    12,
    "Teach",
    "Map the two columns to B2B collaboration and customer identity. Show the invite flow and the Guest user type, then introduce Conditional Access with a signals, decision, enforcement diagram and two sample if-then policies. Mention P1 licensing and report-only mode."
   ],
   [
    18,
    "Activity",
    "Run the policy-writing workshop described below in groups of three."
   ],
   [
    5,
    "Discuss",
    "Groups share one policy each; the class checks whether it is too strict or too loose and uses the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A company works with a design agency and also sells to the public online. Should the agency's staff and the public shoppers sign in the same way? Why or why not?",
  "activity": {
   "title": "Write the door rules",
   "materials": "Whiteboard, sticky notes in two colors, printed scenario cards the teacher prepares (six cards), student laptops optional for taking notes.",
   "steps": [
    "Give each group six scenario cards, such as: agency designers need one SharePoint site; shoppers sign up with social accounts; finance staff sign in from home; sign-ins from a country with no offices; contractors on personal laptops opening the admin portal; a new rule that might lock out the help desk.",
    "For each card, the group first decides whether it is B2B collaboration, customer identity or Conditional Access, writing the answer on a sticky note of the first color.",
    "For each Conditional Access card, the group writes an if-then policy on a sticky note of the second color, naming at least one signal and one control, for example if user is a guest and app is admin portal and device is not compliant, then block.",
    "Groups post their notes on the board and mark any policy they would launch in report-only mode first, with a one-line reason."
   ]
  },
  "discussion": [
   "What could go wrong if a Conditional Access policy that blocks foreign sign-ins were enforced on day one without report-only testing?",
   "Why is it safer for a company to let partners bring their own identity than to create accounts for them?"
  ],
  "exit": [
   [
    "A clinic's partner doctors need access to a scheduling app using their own hospital accounts. Which capability fits?",
    "B2B collaboration, inviting them as guest users."
   ],
   [
    "Write a Conditional Access policy in if-then form that requires MFA outside the office.",
    "If a user signs in from a location other than the trusted office network, then require MFA."
   ],
   [
    "What license is required for Conditional Access?",
    "Microsoft Entra ID P1 or higher."
   ]
  ],
  "differentiation": [
   "Support: Provide a sentence frame for policies (If [user or group] signs in from [location or device] to [app], then [allow, require MFA, require compliant device, or block]) and a three-word key: partner means B2B, public means customer identity, rule means Conditional Access.",
   "Extend: Ask fast finishers to design a small policy set for guests that balances security and usability, identify which conditions would need Entra ID P2 because they rely on risk, and explain how access reviews complement Conditional Access."
  ]
 },
 {
  "t": "Azure role-based access control (RBAC), Zero Trust, defense in depth and Microsoft Defender for Cloud",
  "objectives": [
   "Students will be able to describe the three parts of an Azure role assignment and explain how scope inheritance works.",
   "Students will be able to compare the Owner, Contributor, Reader and User Access Administrator roles and choose the least-privilege role for a task.",
   "Students will be able to state the three Zero Trust principles and place controls into the seven defense-in-depth layers.",
   "Students will be able to explain what Microsoft Defender for Cloud provides, including secure score and recommendations."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about who holds the keys at school. Steer answers toward the idea that different people need different access to different places."
   ],
   [
    15,
    "Teach",
    "Draw the hierarchy (management group, subscription, resource group, resource) and show a role assignment as principal plus role plus scope, with an arrow for inheritance. Compare the four fundamental roles in a small table. Then present Zero Trust principles, draw seven concentric rings for defense in depth, and describe Defender for Cloud and secure score."
   ],
   [
    15,
    "Activity",
    "Run the access review role-play described below in pairs or groups of three."
   ],
   [
    5,
    "Discuss",
    "Groups report the riskiest assignment they found and the fix, then use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "At this school, who has a key to every room, who has a key to just one room, and who can make new keys? What would go wrong if everyone had the master key?",
  "activity": {
   "title": "Audit the access list",
   "materials": "Printed access-list handout the teacher prepares (a fictional subscription with resource groups and about ten role assignments), printed defense-in-depth finding cards, whiteboard with seven concentric rings drawn.",
   "steps": [
    "Hand out the access list. It shows assignments such as an intern as Owner on the subscription, a developer group as Contributor on the web resource group, an individual auditor as Contributor, and a team lead as Contributor who needs to add colleagues.",
    "In pairs, one student plays the auditor and asks why each assignment exists; the other plays the administrator and proposes the least-privilege fix, changing the role, the scope or replacing individuals with groups.",
    "Pairs then draw five finding cards that represent Defender for Cloud recommendations (open remote desktop port, missing patches, unencrypted storage, no MFA for admins, secrets stored in app code) and tape each card onto the correct defense-in-depth ring on the board.",
    "Each pair labels one fix with the Zero Trust principle it supports: verify explicitly, least privilege or assume breach."
   ]
  },
  "discussion": [
   "Why is assigning roles to groups instead of individuals considered safer over time?",
   "If an organization adopts Zero Trust, does it still need defense in depth? How do the two ideas support each other?"
  ],
  "exit": [
   [
    "A user must create and manage VMs in one resource group but must not grant access to others. Which role and scope fit?",
    "Contributor (or Virtual Machine Contributor) at that resource group's scope."
   ],
   [
    "What are the three Zero Trust principles?",
    "Verify explicitly, use least privilege access, and assume breach."
   ],
   [
    "What does Defender for Cloud's secure score represent?",
    "A measure of security posture that rises as you complete its security recommendations."
   ]
  ],
  "differentiation": [
   "Support: Give students a role cheat card (Owner: everything plus access; Contributor: everything except access; Reader: view only; User Access Administrator: access only) and a printed hierarchy diagram with inheritance arrows to refer to during the audit.",
   "Extend: Ask fast finishers to explain how they would separate duties so no single person both deploys resources and grants access, and to describe when a custom role would be justified instead of a built-in one."
  ]
 },
 {
  "t": "Factors that affect cost in Azure: resource type, consumption, region, bandwidth, reservations and Azure Hybrid Benefit",
  "objectives": [
   "Students will be able to identify the main factors that affect Azure cost: resource type, consumption, region, bandwidth and Marketplace purchases.",
   "Students will be able to compare pay-as-you-go, Azure Reservations, savings plans for compute and Spot VMs and match each to a workload.",
   "Students will be able to explain how Azure Hybrid Benefit reduces cost and how it differs from a reservation.",
   "Students will be able to recommend cost reductions for a described scenario, including deallocation and reducing egress."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a mock monthly bill on the projector with line items for compute, disks, egress and storage. Ask: which line would you investigate first and why?"
   ],
   [
    15,
    "Teach",
    "Walk through each factor on the whiteboard: resource type, consumption models, region, ingress versus egress, Hybrid Benefit. Stress that stopped is not the same as deallocated, and that reservations and Hybrid Benefit stack."
   ],
   [
    15,
    "Activity",
    "Run the 'Cut the Bill' card sort in groups of three: students match workload cards to the best purchase option and explain their choice."
   ],
   [
    5,
    "Discuss",
    "Groups share one tricky card and the class debates the answer, focusing on Spot VM eviction and data residency."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three short questions on paper and hand them in at the door."
   ]
  ],
  "warmup": "Your home electricity bill doubled this month, but you did not buy any new appliances. List three things that might explain it. Now, what might be the cloud equivalents?",
  "activity": {
   "title": "Cut the Bill card sort",
   "materials": "Printed workload cards (8 to 10 per group), printed option cards (Pay-as-you-go, Reservation, Savings plan for compute, Spot VM, Azure Hybrid Benefit, Deallocate on schedule, Move to another region, Reduce egress), sticky notes, whiteboard.",
   "steps": [
    "Give each group a set of workload cards, such as 'database running 24/7 for three years', 'nightly video render that can restart', 'test lab used weekdays only', 'files downloaded by thousands of customers' and 'VMs with Windows Server licenses under Software Assurance'.",
    "Groups place one or more option cards next to each workload and write a one-sentence justification on a sticky note.",
    "Include one trap card, such as 'production web server, lowest possible price', and ask groups to explain why Spot is the wrong answer.",
    "Each group posts its sticky notes on the whiteboard under the matching option, and the teacher reviews any mismatches with the class."
   ]
  },
  "discussion": [
   "When would a savings plan for compute be a better choice than a reservation, and what do you give up for that flexibility?",
   "How should a team balance a cheaper region against latency and data-residency requirements?"
  ],
  "exit": [
   [
    "Which is generally free in Azure: ingress or egress?",
    "Ingress, data coming into Azure. Egress is billed."
   ],
   [
    "A company owns SQL Server licenses with Software Assurance. Which benefit reduces its Azure SQL or VM cost?",
    "Azure Hybrid Benefit, which removes the license portion of the price."
   ],
   [
    "What must you do to a VM to stop compute charges, and what still bills afterwards?",
    "Stop it so it is deallocated; its disks and any static public IP still bill."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column cheat card that pairs each clue phrase (for example 'one or three years', 'existing licenses', 'can be interrupted') with its matching option before starting the card sort.",
   "Extend: Ask fast finishers to design a cost plan for a company with steady, spiky and interruptible workloads, using at least four different cost options and explaining which ones can be combined."
  ]
 },
 {
  "t": "The Pricing Calculator vs the Total Cost of Ownership (TCO) Calculator",
  "objectives": [
   "Students will be able to explain the purpose of the Azure Pricing Calculator and the TCO Calculator.",
   "Students will be able to compare the two calculators by the question each answers and the inputs each needs.",
   "Students will be able to describe the three steps of the TCO Calculator and why its assumptions matter.",
   "Students will be able to choose the Pricing Calculator, TCO Calculator or Cost Management for a described scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the car-versus-rideshare question and collect answers on the whiteboard in two columns: costs of owning, costs of renting."
   ],
   [
    12,
    "Teach",
    "Explain each calculator, the inputs it takes and the question it answers. Draw a three-stage timeline: TCO for the business case, Pricing Calculator for design, Cost Management after go-live."
   ],
   [
    18,
    "Activity",
    "Students open both calculators in a browser and complete the 'Which tool, which number' task in pairs."
   ],
   [
    5,
    "Discuss",
    "Pairs report how much the estimate changed when they switched region or redundancy, and what TCO assumptions surprised them."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three scenario questions on paper."
   ]
  ],
  "warmup": "If you were deciding whether to sell your car and use rideshares instead, what costs would you need to add up? Which of those costs are easy to forget?",
  "activity": {
   "title": "Which tool, which number",
   "materials": "Student laptops with a browser, a projector, a printed scenario sheet per pair, whiteboard.",
   "steps": [
    "Pairs open the Azure Pricing Calculator, add one small Linux VM and one storage account in a chosen region, and record the monthly estimate.",
    "They clone or edit the estimate to change only the region, then only the storage redundancy from LRS to GRS, and record how each change moves the total.",
    "Pairs open the TCO Calculator, enter a small workload such as five servers and some storage, and note which assumptions it asks for in the second step, without needing to finish the report.",
    "Each pair reads four scenario cards from the printed sheet and labels each one Pricing Calculator, TCO Calculator or Cost Management, then compares answers with another pair."
   ]
  },
  "discussion": [
   "Why might two companies with identical servers get very different TCO savings reports?",
   "Who in an organization is the audience for each tool, and how would you present the results differently to them?"
  ],
  "exit": [
   [
    "A company with no on-premises servers wants a monthly estimate for a new web app. Which tool should it use?",
    "The Azure Pricing Calculator."
   ],
   [
    "Name the three steps of the TCO Calculator in order.",
    "Define your workloads, adjust assumptions, view the report."
   ],
   [
    "Which tool shows actual spending on deployed resources?",
    "Microsoft Cost Management; the calculators only estimate."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-line rule card ('Compare with on premises = TCO; price Azure services = Pricing Calculator; actual spend = Cost Management') and let students use it during the scenario step.",
   "Extend: Ask fast finishers to write two original exam-style scenarios, one for each calculator, that include a distractor detail designed to tempt the wrong answer."
  ]
 },
 {
  "t": "Microsoft Cost Management: cost analysis, budgets and alerts, and using tags to track spending",
  "objectives": [
   "Students will be able to describe what Microsoft Cost Management provides and how it differs from the pricing calculators.",
   "Students will be able to configure, on paper or in the portal, a budget with actual and forecast alert thresholds and explain that budgets alert rather than block.",
   "Students will be able to design a tagging scheme that supports reporting costs by department or project.",
   "Students will be able to explain that tags are not inherited by default and identify Azure Policy as the way to enforce them."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students how their bank or phone plan warns them before they overspend, and whether that warning stops the purchase."
   ],
   [
    12,
    "Teach",
    "Project a sample cost analysis chart and explain grouping, filtering and forecasting. Cover budgets, thresholds, action groups and the 'alerts, not caps' rule. Finish with tags and the inheritance trap."
   ],
   [
    18,
    "Activity",
    "Groups complete the 'Who spent it?' tagging exercise using printed resource cards and design a budget for the company."
   ],
   [
    5,
    "Discuss",
    "Groups present their tag names and budget thresholds and justify forecast versus actual alerts."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three questions on paper."
   ]
  ],
  "warmup": "Your phone carrier texts you when you have used 80% of your data. Does that text stop you from using more data? What would you need for it to actually stop you?",
  "activity": {
   "title": "Who spent it? Tagging and budgets",
   "materials": "Printed resource cards (about 15 per group, each listing a resource name, resource group, monthly cost and a short description of who uses it), sticky notes in three colors, markers, whiteboard.",
   "steps": [
    "Give each group the resource cards for a fictional company with Sales, Research and IT departments that share three resource groups.",
    "Groups agree on two or three tag names and values, such as CostCenter and Environment, and write a tag on a sticky note for every card.",
    "Groups total the monthly cost per CostCenter tag and compare it with what they would get by totaling per resource group, noting where the two disagree.",
    "Groups write a budget plan for the subscription: amount, period, at least two thresholds, whether each is actual or forecast, who is emailed, and whether any automated action is safe to add.",
    "Each group writes one sentence explaining how they would make sure every new resource gets the CostCenter tag, which should name Azure Policy."
   ]
  },
  "discussion": [
   "Should a budget ever automatically shut down resources? Which resources would be safe, and which would be dangerous?",
   "What problems arise when different teams invent their own tag names, and how could an organization prevent that?"
  ],
  "exit": [
   [
    "What happens when a subscription's spending passes 100% of its budget, if no action group is configured?",
    "Alerts are sent to the listed recipients, but nothing is stopped or blocked."
   ],
   [
    "How do you report costs per department when resources are spread across several resource groups?",
    "Tag the resources with a department or cost center tag and group by that tag in cost analysis."
   ],
   [
    "Which service can make sure every new resource carries a required tag?",
    "Azure Policy, using a policy that requires, adds or inherits the tag."
   ]
  ],
  "differentiation": [
   "Support: Pre-fill half of the resource cards with tags so struggling students see the pattern before completing the rest, and give them a budget template with blanks to fill in.",
   "Extend: Ask fast finishers to explain the difference between Azure Policy tag inheritance and the Cost Management tag inheritance setting, and when each is appropriate."
  ]
 },
 {
  "t": "Microsoft Purview for data governance, and the Service Trust Portal for compliance reports",
  "objectives": [
   "Students will be able to distinguish data governance from compliance and give an example of each.",
   "Students will be able to describe the main capabilities of Microsoft Purview, including discovery, classification, lineage and data loss prevention.",
   "Students will be able to explain what the Service Trust Portal provides and connect it to the shared responsibility model.",
   "Students will be able to choose Purview, the Service Trust Portal or Azure Policy for a described scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the storage-facility question and record student answers in two columns: proof about the building, proof about my stuff."
   ],
   [
    12,
    "Teach",
    "Define governance versus compliance. Explain Purview's scanning, classification, lineage and the two broad areas. Introduce the Service Trust Portal and its audit reports, then tie both to shared responsibility. Contrast with Azure Policy."
   ],
   [
    18,
    "Activity",
    "Groups run the 'Auditor's requests' role-play, sorting request cards and drawing a lineage diagram."
   ],
   [
    5,
    "Discuss",
    "Debrief the requests that groups disagreed on, especially those that needed Azure Policy."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three questions on paper."
   ]
  ],
  "warmup": "You rent a unit in a storage facility. What proof would you want that the building is safe? And what would you need to know about your own belongings if something went missing?",
  "activity": {
   "title": "The auditor's requests",
   "materials": "Printed request cards (10 to 12), three labeled zones on the whiteboard (Purview, Service Trust Portal, Azure Policy), sticky notes, markers.",
   "steps": [
    "One student per group plays the auditor and reads request cards aloud, such as 'Show me Microsoft's latest SOC 2 report', 'Where are credit card numbers stored across our systems?', 'Prove no resources are created outside Europe' and 'Which reports use data from the HR database?'.",
    "The other students decide which tool answers each request and place the card in the matching zone on the whiteboard, stating one sentence of justification.",
    "Each group then draws a simple lineage diagram on paper for a fictional dashboard, showing at least three hops from a source system to the report, and circles where sensitive data enters.",
    "The teacher reviews the whiteboard zones with the class and corrects any card that confuses Microsoft's evidence with the customer's own data."
   ]
  },
  "discussion": [
   "If Microsoft's datacenters pass every audit, what compliance work is still left for the customer?",
   "Why might lineage matter when someone asks a company to delete all of their personal data?"
  ],
  "exit": [
   [
    "Where would you download Microsoft's ISO/IEC 27001 audit report for Azure?",
    "The Service Trust Portal."
   ],
   [
    "Name two capabilities of Microsoft Purview.",
    "Any two of data discovery and scanning, classification of sensitive data, data lineage, data catalog, sensitivity labels and data loss prevention."
   ],
   [
    "A company must ensure resources are only created in approved regions. Purview, Service Trust Portal or Azure Policy?",
    "Azure Policy, because it governs resource configuration rather than data."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a sentence frame: 'If the evidence is about Microsoft, use ___; if it is about our own data, use ___; if it is about resource settings, use ___.'",
   "Extend: Ask fast finishers to map each request card to the shared responsibility model and explain which party, Microsoft or the customer, owns the control being tested."
  ]
 },
 {
  "t": "Azure Policy: definitions, initiatives, assignments and compliance",
  "objectives": [
   "Students will be able to explain how Azure Policy differs from RBAC and from resource locks.",
   "Students will be able to define policy definitions, effects, initiatives and assignments and describe how assignments inherit down the scope hierarchy.",
   "Students will be able to predict the outcome of Deny and Audit effects on new and existing resources.",
   "Students will be able to design a simple policy approach, choosing definitions, an initiative and an assignment scope for a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the building-permit question and connect 'permit' to RBAC and 'building code' to Azure Policy."
   ],
   [
    13,
    "Teach",
    "Project the simplified JSON rule and walk through the if and then blocks. Cover the main effects, initiatives, assignments, inheritance, the Compliance page and remediation. Stress that Owners are not exempt."
   ],
   [
    17,
    "Activity",
    "Groups play 'Policy inspector', evaluating request cards against an assigned initiative."
   ],
   [
    5,
    "Discuss",
    "Review surprising outcomes, especially existing resources under a new Deny and the Owner card."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three questions on paper."
   ]
  ],
  "warmup": "A contractor has a valid permit to build a house. Can the city still reject the plans? Why? What is the difference between the permit and the building code?",
  "activity": {
   "title": "Policy inspector",
   "materials": "Projector showing a fictional initiative (allowed locations: two regions, Deny; require CostCenter tag, Deny; allowed VM sizes, Audit), printed request cards (12 to 15), whiteboard with columns Allowed, Denied and Allowed but non-compliant.",
   "steps": [
    "Explain that the initiative is assigned at the company's management group, with one sandbox resource group excluded.",
    "Groups draw request cards, such as 'Owner creates a VM in an unapproved region', 'Contributor creates a storage account with a CostCenter tag in an approved region', 'existing untagged VM from last year' and 'GPU VM in the excluded sandbox'.",
    "For each card the group decides the outcome, places it in a whiteboard column and writes the effect that caused it.",
    "Groups then pick two non-compliant existing resources and describe how a remediation task with a Modify or DeployIfNotExists policy could fix them.",
    "The teacher reviews each column and corrects any card where the role of the user was wrongly assumed to matter."
   ]
  },
  "discussion": [
   "When would you choose Audit instead of Deny for a new rule, and why might an organization start with Audit first?",
   "What are the risks of assigning a strict Deny policy at the top management group?"
  ],
  "exit": [
   [
    "What is the difference between a policy definition and an assignment?",
    "A definition describes the rule and effect; an assignment applies it to a scope such as a management group, subscription or resource group."
   ],
   [
    "What happens when a non-compliant resource is created under an Audit effect?",
    "It is created but marked non-compliant in the compliance report."
   ],
   [
    "Does Azure Policy block an Owner who tries to deploy to a denied region?",
    "Yes. Policy applies regardless of the user's role."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students an effect reference card that pairs each effect (Deny, Audit, Modify, DeployIfNotExists) with a one-line plain-language meaning to use while sorting request cards.",
   "Extend: Ask fast finishers to write the if and then structure for a simple custom rule, such as denying public IP addresses, in pseudocode, and explain which effect they chose and why."
  ]
 },
 {
  "t": "Resource locks: CanNotDelete vs ReadOnly and how they inherit",
  "objectives": [
   "Students will be able to compare the CanNotDelete and ReadOnly lock levels and state what each one blocks.",
   "Students will be able to explain lock inheritance and determine the effective lock when several apply.",
   "Students will be able to explain why locks apply to Owners and which roles can remove them.",
   "Students will be able to distinguish control plane from data plane operations and predict whether a lock blocks a given action."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the museum question and sketch a bolted painting and a painting under glass on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Explain both lock levels, the scopes, inheritance and most-restrictive-wins, who can remove locks, and the control plane versus data plane distinction with the storage account example."
   ],
   [
    18,
    "Activity",
    "Pairs work through the 'Will it work?' lock scenarios using a scope tree on the whiteboard."
   ],
   [
    5,
    "Discuss",
    "Discuss the side effects of ReadOnly locks and when CanNotDelete is the better default."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three questions on paper."
   ]
  ],
  "warmup": "In a museum, some paintings are bolted to the wall and some are sealed behind glass. What can staff still do with each one? Which protection would you use for a painting that needs regular cleaning?",
  "activity": {
   "title": "Will it work? Lock scenarios",
   "materials": "Whiteboard showing a scope tree (subscription, two resource groups, several resources) with lock icons drawn on some nodes, printed action cards (12 to 15), sticky notes in two colors for 'works' and 'blocked'.",
   "steps": [
    "The teacher draws the scope tree: a CanNotDelete lock on rg-prod, a ReadOnly lock on rg-audit, and a CanNotDelete lock on one VM inside rg-audit.",
    "Pairs draw action cards, such as 'Contributor resizes a VM in rg-prod', 'Owner deletes rg-prod', 'user uploads a blob to a storage account in rg-audit', 'operator changes a setting on the VM with its own CanNotDelete lock in rg-audit' and 'Contributor removes the lock on rg-prod'.",
    "For each card, pairs place a 'works' or 'blocked' sticky note on the tree next to the target and write the reason: lock level, inheritance, most restrictive wins, role, or data plane.",
    "The class reviews any card where pairs disagreed, and the teacher highlights the data plane and role cards."
   ]
  },
  "discussion": [
   "Why might an organization choose CanNotDelete instead of ReadOnly for most production resource groups?",
   "Locks protect a resource from deletion but not the data inside it. What else would you need to protect the data?"
  ],
  "exit": [
   [
    "Which lock level still allows modification of a resource?",
    "CanNotDelete."
   ],
   [
    "A resource group has a ReadOnly lock and a resource inside has a CanNotDelete lock. What can a user do to that resource?",
    "Only read it, because the most restrictive inherited lock, ReadOnly, wins."
   ],
   [
    "Which built-in roles can remove a lock?",
    "Owner and User Access Administrator."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-row table (CanNotDelete, ReadOnly) with columns Read, Modify, Delete to fill in with yes or no before starting the scenarios.",
   "Extend: Ask fast finishers to write a short recommendation explaining how locks, Azure Policy and RBAC would work together to protect a production environment, naming what each one contributes."
  ]
 },
 {
  "t": "Tools for interacting with Azure: the portal, Azure Cloud Shell, Azure CLI and Azure PowerShell",
  "objectives": [
   "Students will be able to describe the Azure portal, Cloud Shell, Azure CLI, Azure PowerShell and the Azure mobile app.",
   "Students will be able to identify whether a command belongs to Azure CLI or Azure PowerShell from its syntax.",
   "Students will be able to explain why all tools produce the same results through Azure Resource Manager.",
   "Students will be able to choose the most suitable tool for a scenario involving repetition, installation limits or visual exploration."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the restaurant ordering question and map each ordering method to a tool on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Demonstrate the portal on the projector, open Cloud Shell from the toolbar if an account is available, and show the side-by-side CLI and PowerShell snippet. Emphasize Resource Manager as the common layer."
   ],
   [
    18,
    "Activity",
    "Pairs complete the 'Name that tool' command sort and the tool-choice scenarios."
   ],
   [
    5,
    "Discuss",
    "Discuss when the portal is the better choice and when scripting wins."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three questions on paper."
   ]
  ],
  "warmup": "You can order food at the counter, through an app or by phone. Does the kitchen care which way you ordered? What changes for you?",
  "activity": {
   "title": "Name that tool",
   "materials": "Printed command cards (about 16, a mix of az commands and Verb-AzNoun cmdlets, such as az group list, Get-AzResourceGroup, az vm start, Start-AzVM, az storage account create, New-AzStorageAccount), printed scenario cards (6), whiteboard with columns Azure CLI and Azure PowerShell.",
   "steps": [
    "Pairs sort the command cards into Azure CLI and Azure PowerShell columns and then match each CLI card with its PowerShell equivalent.",
    "Pairs underline the clue in each card that gave it away: the az prefix and double-dash options, or the Verb-AzNoun pattern and single-dash parameters.",
    "Pairs read the scenario cards, such as 'cannot install software', 'need a visual dashboard for the help desk' and 'repeat a deployment in five regions', and write the best tool for each.",
    "If a teacher demo account is available, the teacher runs one matched pair of commands in Cloud Shell on the projector to show both produce the same result."
   ]
  },
  "discussion": [
   "Your team has some Bash experts and some PowerShell experts. How would you decide which command-line tool to standardize on, or would you?",
   "What risks come from making the same change by hand in the portal across many environments?"
  ],
  "exit": [
   [
    "Which tool does az vm list belong to?",
    "Azure CLI."
   ],
   [
    "Which tool lets you run Azure commands from a browser with nothing installed locally?",
    "Azure Cloud Shell."
   ],
   [
    "Why can a resource created with PowerShell be edited in the portal?",
    "All tools send requests through Azure Resource Manager, so resources are the same regardless of the tool used."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a clue card showing the two patterns side by side ('az group verb --option' versus 'Verb-AzNoun -Parameter') to use during the sort.",
   "Extend: Ask fast finishers to write a three-line script in both Azure CLI and Azure PowerShell that creates a resource group and lists its contents, then explain which they found easier to read."
  ]
 },
 {
  "t": "Azure Arc for managing on-premises and multicloud resources",
  "objectives": [
   "Students will be able to explain what Azure Arc does and how it projects non-Azure resources into Azure Resource Manager.",
   "Students will be able to list the resource types Arc can manage and the Azure services that can then be applied to them.",
   "Students will be able to distinguish Azure Arc from Azure Migrate and Azure Stack.",
   "Students will be able to recommend Azure Arc for appropriate hybrid and multicloud governance scenarios."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask how students would manage settings on phones owned by family members who live in different houses, and whether the phones need to move."
   ],
   [
    12,
    "Teach",
    "Draw a diagram with a datacenter, a store, another cloud and Azure in the middle. Show the agent connecting outbound, the resources appearing in Resource Manager, and Policy, RBAC, Monitor, Defender and Update Manager applying to them. Contrast with Azure Migrate and Azure Stack."
   ],
   [
    18,
    "Activity",
    "Groups whiteboard a hybrid governance design for a fictional company using Arc."
   ],
   [
    5,
    "Discuss",
    "Groups present and the class checks each design for anything that wrongly moves workloads."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three questions on paper."
   ]
  ],
  "warmup": "Your family's tablets are in three different houses. You want the same parental controls and updates on all of them. Do you need to bring them all to one house? What would you need instead?",
  "activity": {
   "title": "Govern it where it lives",
   "materials": "Whiteboard or large paper per group, markers, printed scenario card describing a company with on-premises Windows servers, Linux servers in shops, a Kubernetes cluster in another cloud and a few Azure VMs, plus a printed list of Azure services (Azure Policy, RBAC, tags, Azure Monitor, Defender for Cloud, Azure Update Manager, Azure Migrate).",
   "steps": [
    "Groups draw each location on the board and mark which resources are inside Azure and which are outside.",
    "For each outside resource, groups write how it connects to Arc: Connected Machine agent for servers, Arc-enabled Kubernetes for the cluster.",
    "Groups draw arrows from Azure services to the resources they will govern, and label one requirement each service meets, such as patch compliance or a security baseline.",
    "Groups add one sentence explaining whether Azure Migrate belongs in their design and why, based on the scenario's statement that nothing will move this year.",
    "Each group does a 60-second walkthrough of its design for the class."
   ]
  },
  "discussion": [
   "Why might an organization keep some servers outside Azure permanently, and how does Arc help them?",
   "What are the advantages of using one permission model and one policy engine across every environment?"
  ],
  "exit": [
   [
    "Does Azure Arc move workloads into Azure?",
    "No. Arc manages resources where they run; Azure Migrate moves them."
   ],
   [
    "What is installed on a server to onboard it to Azure Arc?",
    "The Azure Connected Machine agent."
   ],
   [
    "A company wants to apply Azure Policy to Kubernetes clusters running in another cloud. Which service fits?",
    "Azure Arc, specifically Arc-enabled Kubernetes."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-word summary card ('Arc = manage, Migrate = move, Stack = run Azure on your hardware') and a partially drawn diagram to complete.",
   "Extend: Ask fast finishers to explain how Arc-enabled data services differ from Arc-enabled servers, and to describe a scenario where an organization would use Arc now and Azure Migrate later."
  ]
 },
 {
  "t": "Azure Resource Manager and infrastructure as code with ARM templates and Bicep",
  "objectives": [
   "Students will be able to explain the role of Azure Resource Manager as the single management layer for all Azure tools.",
   "Students will be able to define infrastructure as code and describe its benefits, including consistency and preventing configuration drift.",
   "Students will be able to compare ARM templates and Bicep and explain how Bicep relates to ARM JSON.",
   "Students will be able to explain the terms declarative and idempotent and apply them to a deployment scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Run the 'directions versus blueprint' prompt: one student gives step-by-step drawing directions, another describes the finished picture, and the class compares results."
   ],
   [
    12,
    "Teach",
    "Draw the request flow: tool, Resource Manager (authenticate, authorize, Policy, locks), resource provider. Explain IaC, declarative versus imperative, idempotency, and project the Bicep snippet, reading each line aloud."
   ],
   [
    18,
    "Activity",
    "Groups complete the 'Blueprint or directions' card sort and the redeploy simulation."
   ],
   [
    5,
    "Discuss",
    "Debrief the redeploy simulation and connect it to disaster recovery and drift."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three questions on paper."
   ]
  ],
  "warmup": "Would you rather give a friend turn-by-turn directions to your house, or the address for their map app? Which works better if they start from a different place, or if part of the road is already behind them?",
  "activity": {
   "title": "Blueprint or directions, then redeploy",
   "materials": "Printed statement cards (about 12), a printed one-page 'desired state' sheet listing a resource group, a virtual network, a storage account and a web app, sticky notes, whiteboard divided into Declarative and Imperative columns.",
   "steps": [
    "Groups sort statement cards such as 'create the network, then create the VM', 'the environment must contain one storage account with LRS', 'run these 12 commands in order' and 'describe the end state' into the Declarative and Imperative columns.",
    "For the redeploy simulation, one student acts as Resource Manager and is given the desired state sheet and a sticky-note 'current environment' that already contains the resource group and network.",
    "The group decides what Resource Manager must create, what it leaves alone and what order dependencies require, writing each decision on a sticky note.",
    "The teacher then adds a new line to the desired state sheet and asks groups to 'redeploy', confirming that only the new item is created, which demonstrates idempotency.",
    "Groups write one sentence explaining how Bicep and ARM JSON would represent the same desired state sheet."
   ]
  },
  "discussion": [
   "How does keeping infrastructure definitions in source control change the way a team reviews and approves changes?",
   "If someone makes a quick manual fix in the portal, what happens the next time the template is deployed, and why does that matter?"
  ],
  "exit": [
   [
    "Which service handles every create, update and delete request in Azure, regardless of the tool?",
    "Azure Resource Manager."
   ],
   [
    "What does idempotent mean for a template deployment?",
    "Running the same deployment repeatedly gives the same result without creating duplicates."
   ],
   [
    "How does Bicep relate to ARM templates?",
    "Bicep is a simpler language that transpiles to ARM JSON and is deployed by the same Resource Manager engine."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a glossary card with the four key terms (Resource Manager, declarative, idempotent, Bicep) each paired with a one-line everyday example, to use during the card sort.",
   "Extend: Ask fast finishers to add a parameter to the desired state sheet, such as environment name, and explain how one template could deploy development, test and production with different sizes."
  ]
 },
 {
  "t": "Azure Advisor recommendations and Azure Service Health (Azure status, Service Health, Resource Health)",
  "objectives": [
   "Students will be able to describe Azure Advisor and name its five recommendation categories.",
   "Students will be able to distinguish Azure status, Service Health and Resource Health by scope and the information each provides.",
   "Students will be able to choose between Advisor, Service Health and Resource Health for a described operational scenario.",
   "Students will be able to explain how Service Health alerts use action groups to notify a team."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a car breakdown and write students' answers in two columns on the whiteboard: 'my car' and 'the road'. Explain that Azure has tools for both."
   ],
   [
    12,
    "Teach",
    "Present Advisor and its five categories using the CROPS mnemonic. Then draw three nested circles labeled Azure status (everyone, global), Service Health (your services and regions) and Resource Health (one resource). Stress that a green status page does not rule out an issue affecting you, and that Advisor never acts on its own."
   ],
   [
    18,
    "Activity",
    "Run the 'Which screen do I open?' ticket triage in pairs, then review answers with the class."
   ],
   [
    5,
    "Discuss",
    "Ask pairs to share the ticket they argued about most and explain how they resolved it."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three questions on paper and hand them in."
   ]
  ],
  "warmup": "Your car will not start one morning. What questions would you ask to work out whether the problem is your car or something outside it, such as a power cut or a closed road? Who would you ask for advice on making the car more reliable next time?",
  "activity": {
   "title": "Which screen do I open? ticket triage",
   "materials": "Printed help-desk ticket cards (10 per pair) the teacher prepares in advance, a printed answer grid with columns for Advisor, Azure status, Service Health and Resource Health, a projector, whiteboard.",
   "steps": [
    "Give each pair a stack of ticket cards, such as 'Our VM is down and we want to know if Azure caused it', 'Finance wants ideas to cut spending', 'Is there a major outage across Azure right now?', 'Email us before maintenance in West Europe' and 'Our storage account is reachable from the internet; is that safe?'.",
    "Pairs place each card in one column of the answer grid and write the clue words that led them there.",
    "For each Advisor card, pairs also write which of the five categories the recommendation would fall under.",
    "Project the answer key and have pairs score themselves, then discuss any ticket where more than one view could help, such as checking both Service Health and Resource Health during an outage."
   ]
  },
  "discussion": [
   "Why might Microsoft keep the public Azure status page limited to widespread incidents rather than listing every small issue?",
   "Advisor recommendations sometimes conflict, for example adding redundancy raises cost. How should a team decide which recommendations to act on?"
  ],
  "exit": [
   [
    "Name the five Azure Advisor recommendation categories.",
    "Cost, reliability, operational excellence, performance and security."
   ],
   [
    "Which view shows outages and planned maintenance only for the services and regions you use?",
    "Service Health."
   ],
   [
    "A single database is unavailable. Which view tells you whether a platform event or a user action caused it?",
    "Resource Health."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference card with the three nested circles already drawn and labeled, plus the CROPS mnemonic, and let them use it during the triage activity.",
   "Extend: Ask fast finishers to design a complete notification plan for a company: which Service Health alert rules to create, which event types and regions to filter on, who the action group should notify, and how often to review Advisor."
  ]
 },
 {
  "t": "Azure Monitor: metrics, Log Analytics, alerts and Application Insights",
  "objectives": [
   "Students will be able to distinguish metrics from logs and give an example of each.",
   "Students will be able to explain the role of a Log Analytics workspace and read a simple KQL query.",
   "Students will be able to describe the parts of an alert rule and how action groups notify people or run automation.",
   "Students will be able to choose between metrics, Log Analytics, alerts, Application Insights and the activity log for a described monitoring need."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about a car dashboard and a trip diary. Collect answers and label them 'metrics' and 'logs' on the whiteboard."
   ],
   [
    13,
    "Teach",
    "Draw the Azure Monitor flow left to right: data sources (resources, VMs with the Azure Monitor Agent, apps with Application Insights), then metrics and the Log Analytics workspace, then uses (Metrics explorer, KQL queries, workbooks, alerts), then action groups. Walk through the Heartbeat KQL query line by line on the projector."
   ],
   [
    17,
    "Activity",
    "Run the 'Build the alarm' pair exercise using printed log excerpts and scenario cards."
   ],
   [
    5,
    "Discuss",
    "Pairs share one alert rule they designed and the class checks scope, condition, severity and action group."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three questions on paper."
   ]
  ],
  "warmup": "Your car's dashboard shows speed and fuel as numbers that change every second. A trip diary records each stop, who drove and what happened. Which would you use to notice you are running low on fuel? Which would you use to find out who scraped the bumper last week?",
  "activity": {
   "title": "Build the alarm",
   "materials": "Printed sheets with a short table of sample log rows (computer name, time, event, value) and a sample KQL query, printed scenario cards, a printed alert rule template with boxes for scope, condition, severity and action group, a projector, whiteboard.",
   "steps": [
    "Pairs read the sample KQL query on their sheet and, line by line, write in plain English what each line does and what the result would show for the sample log rows.",
    "Each pair draws three scenario cards, such as 'CPU on the web VMs above 85% for 15 minutes', 'any resource group deleted in production' and 'checkout page throwing exceptions'.",
    "For each card, pairs label the data source (metric, log query, activity log or Application Insights) and fill in an alert rule template with scope, condition, severity and an action group.",
    "Pairs swap templates with a neighboring pair, who checks that every rule has an action group and that the data type matches the condition, then returns written feedback."
   ]
  },
  "discussion": [
   "What problems could too many alerts cause for an on-call team, and how would you decide which conditions deserve an alert?",
   "Why might a team still need Application Insights when its infrastructure metrics all look healthy?"
  ],
  "exit": [
   [
    "Give one example of a metric and one example of a log.",
    "A metric is a number sampled over time, such as CPU percentage; a log is a detailed record, such as an activity log entry showing who deleted a resource."
   ],
   [
    "What do you use to query data in a Log Analytics workspace?",
    "Log Analytics with Kusto Query Language (KQL)."
   ],
   [
    "An alert fires but nobody is notified. What is most likely missing?",
    "An action group defining who to notify or what automation to run."
   ]
  ],
  "differentiation": [
   "Support: Provide a matching card that pairs common clue phrases ('near real-time number', 'KQL', 'exceptions and dependencies', 'who deleted it', 'send SMS') with the Azure Monitor feature each one points to, and let students use it during the activity.",
   "Extend: Ask fast finishers to write their own short KQL query on paper, for example counting events per computer over the last day, explain each line, and propose an alert that uses it."
  ]
 }
]);
