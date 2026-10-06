/* Teacher edition for AWS Certified Cloud Practitioner (CLF-C02): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("aws-cloud-practitioner", [
 {
  "t": "Benefits of the AWS Cloud: pay-as-you-go pricing, economies of scale, agility, elasticity and global reach",
  "objectives": [
   "Students will be able to define pay-as-you-go pricing, economies of scale, agility, elasticity and global reach in their own words.",
   "Students will be able to distinguish agility from elasticity and pay-as-you-go from economies of scale using scenario clue words.",
   "Students will be able to match a short business scenario to the single AWS Cloud benefit that best addresses it.",
   "Students will be able to explain why the cloud is not automatically cheaper and why data stays in the Region chosen."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up prompt. Ask three volunteers to share one problem they would expect a growing online shop to have with its own servers. Write their answers on the board for later."
   ],
   [
    12,
    "Teach",
    "Walk through the five benefits with one sentence and one clue phrase each. Map each warm-up answer on the board to a benefit. Spend extra time on the two confusing pairs: agility versus elasticity, and pay-as-you-go versus economies of scale."
   ],
   [
    15,
    "Activity",
    "Run the scenario card sort described in the activity. Circulate and ask groups to justify any card they placed under agility or elasticity."
   ],
   [
    8,
    "Discuss",
    "Groups report their hardest card. Use the discussion questions to address the misconception that the cloud is always cheaper and that data moves between Regions automatically."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them on the door as they leave."
   ]
  ],
  "warmup": "Imagine you run a small online shop on servers in a back room. List two problems you might face when your shop suddenly becomes popular, and one problem you face on a quiet day.",
  "activity": {
   "title": "Benefit card sort",
   "materials": "Printed cards (about 15) each with a one- or two-sentence business scenario, five header cards with the benefit names, tape or a whiteboard to sort onto.",
   "steps": [
    "Before class, write 15 short scenarios, three per benefit, using clue words such as 'no up-front cost', 'launch in minutes', 'traffic doubles on weekends', 'customers in Asia complain of slow pages' and 'lower prices from aggregated usage'.",
    "Put students in groups of three or four and give each group a shuffled set of scenario cards and the five header cards.",
    "Groups sort each scenario under one benefit and must underline the clue word that decided it.",
    "Swap sorts between neighboring groups; each group checks the other's work and flags any card they disagree with.",
    "Review flagged cards as a class, emphasizing that all five are real benefits and only one fits each scenario best."
   ]
  },
  "discussion": [
   "If pay-as-you-go means you only pay for what you use, how could a company's cloud bill end up higher than its old data center costs?",
   "Why might a company deliberately keep its customer data in one Region instead of spreading it worldwide?",
   "Which benefit do you think matters most to a start-up, and which to a large established company? Why might they differ?"
  ],
  "exit": [
   [
    "A team can create a test environment in minutes and delete it after an hour. Which benefit is this?",
    "Agility, because resources can be provisioned and discarded quickly for experimentation."
   ],
   [
    "What is the difference between pay-as-you-go pricing and economies of scale?",
    "Pay-as-you-go is the billing model, paying for what you consume; economies of scale explain why AWS's unit prices are low, through aggregated usage of many customers."
   ],
   [
    "Capacity grows automatically during a sale and shrinks afterward. Which benefit is this?",
    "Elasticity, capacity automatically following demand in both directions."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page clue-word sheet listing each benefit next to two phrases that signal it, and let them use it during the card sort.",
   "Extend: Ask fast finishers to write two original exam-style scenarios where two benefits seem plausible, then explain which one is the best answer and why."
  ]
 },
 {
  "t": "The six advantages of cloud computing, including trading fixed expense for variable expense and no longer guessing capacity",
  "objectives": [
   "Students will be able to list the six advantages of cloud computing using AWS's exact phrasing.",
   "Students will be able to explain the difference between capital expense and operational expense and connect it to 'trade fixed expense for variable expense'.",
   "Students will be able to distinguish 'stop guessing capacity' from 'benefit from massive economies of scale' in a cost scenario.",
   "Students will be able to reject distractor advantages that are not on the AWS list."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take four or five quick answers. Write each on the board without judging it yet."
   ],
   [
    12,
    "Teach",
    "Present the six advantages one at a time with a one-line business example each. Explain CapEx versus OpEx with a household example such as buying versus leasing a car. Return to the warm-up answers and label each with an advantage, crossing out any that are not on the list."
   ],
   [
    15,
    "Activity",
    "Run the manager role-play described in the activity. Keep time on each round and listen for correct use of the exact phrases."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions. Highlight why 'eliminate security responsibility' and 'zero downtime' are distractors."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "If you were the finance director of a company that owns its own data center, what would annoy you most about it? Give one reason in money terms and one in time terms.",
  "activity": {
   "title": "Convince the CFO role-play",
   "materials": "Printed complaint cards (one complaint per card, about 12), a printed list of the six advantages per pair, whiteboard for scoring.",
   "steps": [
    "Before class, write 12 complaint cards in a CFO's voice, two per advantage, such as 'We bought a storage array for growth that never came' or 'Our engineers spent the weekend fixing the cooling'. Add two cards with tempting distractors, such as 'Can the cloud take over all our security?'.",
    "Pair students. One plays the CFO and reads a complaint; the other has 30 seconds to name the matching advantage using AWS's exact phrase and explain it in one sentence.",
    "Partners swap roles after every three cards.",
    "For distractor cards, the responder must explain why the cloud does not deliver that promise.",
    "End with each pair writing on the board the one complaint they found hardest to match and the answer they agreed on."
   ]
  },
  "discussion": [
   "Why might a company still choose a long-term commitment discount even though the cloud's default model is variable expense?",
   "Which of the six advantages would matter least to a company whose demand is perfectly steady all year? Why?",
   "How could a company accidentally lose the benefit of 'stop guessing capacity' even after moving to AWS?"
  ],
  "exit": [
   [
    "Name all six advantages of cloud computing.",
    "Trade fixed expense for variable expense; benefit from massive economies of scale; stop guessing capacity; increase speed and agility; stop spending money running and maintaining data centers; go global in minutes."
   ],
   [
    "Is buying servers up front a capital expense or an operational expense?",
    "A capital expense; paying for cloud resources as they are used is an operational expense."
   ],
   [
    "Servers bought for a forecast peak sit 60 percent idle. Which advantage addresses this?",
    "Stop guessing capacity."
   ]
  ],
  "differentiation": [
   "Support: Give students a matching worksheet with the six phrases on one side and six simple plain-language descriptions on the other before the role-play, so they can practice the vocabulary first.",
   "Extend: Ask fast finishers to write a 100-word memo to a skeptical CFO that uses all six advantages correctly and also names one thing the cloud does not remove, such as security responsibility."
  ]
 },
 {
  "t": "High availability, fault tolerance, scalability and elasticity: what each term means and how AWS delivers it",
  "objectives": [
   "Students will be able to define high availability, fault tolerance, scalability and elasticity precisely.",
   "Students will be able to compare high availability with fault tolerance and scalability with elasticity.",
   "Students will be able to identify vertical versus horizontal scaling in a scenario.",
   "Students will be able to design a basic highly available, elastic web tier using multiple Availability Zones, a load balancer and Auto Scaling."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers. Point out that students already have intuitions about backup plans and crowds."
   ],
   [
    13,
    "Teach",
    "Draw a Region with three AZs on the whiteboard. Add one instance, then explain why it is a single point of failure. Build up to an Auto Scaling group across AZs behind a load balancer, labeling each part with the term it delivers. Contrast RDS Multi-AZ failover (high availability) with S3's redundant storage (fault tolerance)."
   ],
   [
    15,
    "Activity",
    "Run the whiteboard design challenge described in the activity, with groups rotating to critique each other's diagrams."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions to address the cost of fault tolerance and why vertical scaling is not elastic."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "Think about a school bus route. What is the difference between having a spare bus parked at the depot and having two buses always running the same route? Which costs more?",
  "activity": {
   "title": "Fix the fragile architecture",
   "materials": "Whiteboard or large paper per group, markers, four printed requirement cards.",
   "steps": [
    "Give each group the same starting diagram: one EC2 instance and one database in a single AZ.",
    "Hand each group a different requirement card: 'must survive an AZ failure with at most a short blip', 'must handle five times traffic on Black Friday and shrink afterward', 'storage must never lose data if a facility fails', or 'must handle steady growth over two years'.",
    "Groups redraw the architecture to meet their requirement and label which of the four terms it delivers.",
    "Groups rotate clockwise and leave one sticky-note critique on the next group's design, such as 'still a single point of failure here'.",
    "Each group returns, reads the critique and explains in one minute to the class which term their design delivers and why."
   ]
  },
  "discussion": [
   "Why would a business choose high availability over fault tolerance for most of its systems?",
   "Is a system that scales out automatically but never scales in truly elastic? What does that cost?",
   "Why is horizontal scaling usually preferred over vertical scaling in the cloud?"
  ],
  "exit": [
   [
    "A requirement says 'no interruption at all if a component fails'. Which term is this?",
    "Fault tolerance."
   ],
   [
    "Upgrading from a medium to a large instance is which type of scaling?",
    "Vertical scaling (scaling up)."
   ],
   [
    "Name two AWS components that together make a web tier highly available.",
    "Instances spread across multiple Availability Zones and an Elastic Load Balancing load balancer with health checks (often managed by an Auto Scaling group)."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column table with each term, a one-line definition and a picture cue (spare bus, extra lanes, add lanes, automatic lanes) for students to keep during the activity.",
   "Extend: Ask fast finishers to identify which parts of their design are only highly available and what it would take, and cost, to make those parts fault tolerant."
  ]
 },
 {
  "t": "AWS Well-Architected Framework: the six pillars and what each one is responsible for",
  "objectives": [
   "Students will be able to name all six pillars of the AWS Well-Architected Framework.",
   "Students will be able to explain the focus of each pillar and give one example practice for each.",
   "Students will be able to classify a described practice into the correct pillar, including overlapping cases such as cost optimization versus sustainability.",
   "Students will be able to explain that the framework is guidance involving trade-offs, not a compliance standard."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up prompt. Ask students to call out what they would check, and group their answers loosely on the board."
   ],
   [
    12,
    "Teach",
    "Introduce the six pillars and relabel the warm-up groups with pillar names. Give two example practices per pillar. Spend time on the overlapping pairs: reliability versus performance efficiency, and cost optimization versus sustainability."
   ],
   [
    15,
    "Activity",
    "Run the pillar sorting race described in the activity."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions, focusing on trade-offs between pillars."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "You are about to move into a new apartment. Make a quick list of everything you would want an inspector to check before you sign the lease.",
  "activity": {
   "title": "Pillar sorting race",
   "materials": "Six large header sheets with pillar names taped around the room, about 24 printed practice cards, sticky tack.",
   "steps": [
    "Before class, write 24 practice cards, four per pillar, such as 'Alert on root user sign-in', 'Restore a backup every month as a test', 'Use cost allocation tags', 'Switch to a managed service to get better performance', 'Deploy small reversible changes', 'Stop idle test servers to reduce energy use'.",
    "Split the class into teams of four and deal each team six cards face down.",
    "On 'go', teams flip their cards, discuss briefly and stick each card under the pillar header they choose.",
    "When all cards are posted, the class walks the room. Any student may challenge a card's placement by explaining why another pillar fits better.",
    "Resolve challenges together, emphasizing the stated goal in each card as the deciding factor."
   ]
  },
  "discussion": [
   "Adding a third Availability Zone improves reliability but raises cost. How should a team decide whether it is worth it?",
   "Can you think of a change that improves one pillar but hurts another?",
   "Why might AWS have added sustainability as a separate pillar instead of folding it into cost optimization?"
  ],
  "exit": [
   [
    "Name the six pillars of the Well-Architected Framework.",
    "Operational excellence, security, reliability, performance efficiency, cost optimization and sustainability."
   ],
   [
    "Enabling logging of all API activity and alerting on unusual sign-ins supports which pillar?",
    "Security, through traceability."
   ],
   [
    "Which pillar includes automatically recovering from failure and testing recovery procedures?",
    "Reliability."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pillar reference card with each pillar's guiding question, such as 'Does it recover?' for reliability, to use during the sorting race.",
   "Extend: Ask fast finishers to pick one practice card and write how it affects at least two other pillars, positively or negatively."
  ]
 },
 {
  "t": "Cloud design principles: loose coupling, designing for failure, automation and operations as code",
  "objectives": [
   "Students will be able to explain loose coupling and identify tight coupling in an architecture description.",
   "Students will be able to compare Amazon SQS and Amazon SNS and choose the right one for buffering or fan-out.",
   "Students will be able to describe at least three design-for-failure practices, including treating servers as disposable.",
   "Students will be able to explain operations as code and identify AWS CloudFormation as the AWS infrastructure as code service."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Take two or three stories and connect them to the idea of one slow part blocking everything."
   ],
   [
    12,
    "Teach",
    "Draw a tightly coupled web tier and processing tier, then insert a queue between them. Contrast SQS (pull) and SNS (push to many) with a quick sketch. Explain design for failure and disposable servers, then show the CloudFormation deploy command on the projector and explain why a template beats a wiki page."
   ],
   [
    15,
    "Activity",
    "Run the human queue simulation described in the activity."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to connect the simulation to real architectures."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Think of a time you were stuck waiting in line because one person ahead of you had a problem. How could the process have been designed so everyone else could keep moving?",
  "activity": {
   "title": "Human queue simulation",
   "materials": "Sticky notes, a marked area of desk or a box to act as the queue, a timer, the whiteboard.",
   "steps": [
    "Round 1, tightly coupled: three 'web servers' each hand an 'order' sticky note directly to one 'worker', and must wait until the worker writes 'done' on it before taking the next order. Slow the worker down by asking them to copy a sentence onto each note. Time how many orders are accepted in two minutes.",
    "Round 2, loosely coupled: web servers drop orders into the queue box and immediately take the next one. Workers pull orders from the box at their own pace. Time it again.",
    "Round 3, design for failure: during the run, tap one worker on the shoulder to 'fail'. Observe that orders stay safely in the queue; then add a replacement worker.",
    "Record the results on the whiteboard and ask students to name which AWS service the box represents (SQS) and what the replacement worker represents (Auto Scaling replacing an unhealthy instance).",
    "Finish by asking how SNS would change round 2 if every order had to go to the worker, the billing team and the email system at once."
   ]
  },
  "discussion": [
   "Is there any downside to putting a queue between every pair of components?",
   "Why might a team resist treating servers as disposable, and how would you persuade them?",
   "What could go wrong if staging and production are built by hand instead of from the same template?"
  ],
  "exit": [
   [
    "Which AWS service would you use to buffer requests between a web tier and a slower processing tier?",
    "Amazon SQS."
   ],
   [
    "What is the main difference between SQS and SNS?",
    "SQS stores messages until consumers pull them; SNS pushes each message to many subscribers at once."
   ],
   [
    "Which AWS service creates identical environments from JSON or YAML templates?",
    "AWS CloudFormation."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a labeled diagram showing a producer, a queue and a consumer, and a second showing a topic fanning out to three subscribers, to annotate during the simulation.",
   "Extend: Ask fast finishers to sketch an architecture where an upload triggers an SNS topic that fans out to two SQS queues, and explain which principles each part demonstrates."
  ]
 },
 {
  "t": "The AWS Well-Architected Tool and running a Well-Architected review",
  "objectives": [
   "Students will be able to describe the steps of a Well-Architected review: define a workload, apply lenses, answer questions, review risks and save milestones.",
   "Students will be able to explain what high-risk issues, improvement plans, milestones and lenses are.",
   "Students will be able to distinguish the Well-Architected Tool from AWS Trusted Advisor and AWS Config.",
   "Students will be able to explain why reviews are repeated over time."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect two or three answers about questionnaires that led to advice."
   ],
   [
    12,
    "Teach",
    "Walk through a review on the projector using screenshots or a live console if available: define workload, lens, questions, risks, improvement plan, milestone. Then draw a three-column table comparing the Well-Architected Tool, Trusted Advisor and AWS Config by input (answers versus real resources) and output."
   ],
   [
    15,
    "Activity",
    "Run the mock review role-play described in the activity."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions, focusing on honesty in answers and why reviews are repeated."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Have you ever filled out a questionnaire, such as a health or career survey, that gave you advice based on your answers? What would happen if you answered dishonestly?",
  "activity": {
   "title": "Mock Well-Architected review",
   "materials": "A printed one-page description of a fictional workload with some deliberate weaknesses, a printed set of eight review questions (a few per pillar), sticky notes in two colors, whiteboard.",
   "steps": [
    "Before class, write a one-page workload description, such as a small online store running in one Availability Zone with a shared admin login and no tested backups, plus eight simple review questions modeled on the Well-Architected Tool.",
    "In groups of four, students play the workload team. They read the description and answer each question honestly, ticking which best practices are followed.",
    "For each gap, the group writes a sticky note: one color for a high-risk issue, another for a medium-risk issue, with the pillar named.",
    "Groups prioritize their sticky notes into a top-three improvement plan on the whiteboard.",
    "The teacher announces 'three months later' and changes two facts in the scenario; groups re-answer the affected questions and explain how a saved milestone would show the improvement."
   ]
  },
  "discussion": [
   "Why do reviews work best when the people who build and run the workload answer together?",
   "Why might a team deliberately accept a high-risk issue, and how should they record that decision?",
   "If Trusted Advisor already checks resources automatically, why would anyone bother with a Well-Architected review?"
  ],
  "exit": [
   [
    "Does the Well-Architected Tool inspect your deployed resources?",
    "No. It records the team's answers; Trusted Advisor and AWS Config inspect actual resources."
   ],
   [
    "What is a milestone used for?",
    "To save a snapshot of a review so later answers can be compared to show progress."
   ],
   [
    "A company wants extra review questions specific to its industry or internal standards. What should it use?",
    "A lens, either an AWS-provided lens or a custom lens."
   ]
  ],
  "differentiation": [
   "Support: Provide a simple flowchart of the review steps and a comparison card for the Well-Architected Tool, Trusted Advisor and AWS Config for students to refer to during the activity.",
   "Extend: Ask fast finishers to draft three questions for a custom lens their own school or workplace might use, and explain which pillar each relates to."
  ]
 },
 {
  "t": "AWS Cloud Adoption Framework (AWS CAF): the six perspectives and the business benefits of adoption",
  "objectives": [
   "Students will be able to name the six AWS CAF perspectives and classify them as business or technical.",
   "Students will be able to match a concern or stakeholder to the correct perspective, including Governance versus Operations.",
   "Students will be able to list the four phases of the CAF journey and the business outcomes of adoption.",
   "Students will be able to explain how the CAF differs from the Well-Architected Framework."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up prompt and list student answers on the board under 'technical' and 'non-technical'."
   ],
   [
    12,
    "Teach",
    "Introduce the six perspectives with their stakeholders, mapping each warm-up answer to a perspective. Cover the four journey phases and the four business outcomes. Contrast the CAF (organization) with Well-Architected (workload)."
   ],
   [
    15,
    "Activity",
    "Run the stakeholder role-play described in the activity."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to explore why cloud programs fail for non-technical reasons."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your school decides to replace every paper process with online systems over one summer. Besides buying the software, what else has to change for this to succeed?",
  "activity": {
   "title": "Steering committee role-play",
   "materials": "Printed role cards for six stakeholders (CFO, HR director, CIO, CTO, CISO, operations manager), printed concern cards (about 18), a large sheet with six perspective columns.",
   "steps": [
    "Before class, write role cards that describe each stakeholder's priorities, and 18 concern cards such as 'Our engineers have never used AWS', 'Nobody owns the cloud budget', 'Who gets paged at 3 a.m.?', 'How do we federate identities?'.",
    "Form groups of six and give each student one role card. Shuffle the concern cards and place them face down in the middle.",
    "Students take turns drawing a concern card and reading it aloud. The student whose role owns that concern claims it and places it in the matching perspective column, explaining why in one sentence.",
    "If two roles claim the same card, the group debates and records the final decision and reason.",
    "Each group shares one contested card with the class, and the teacher confirms the CAF perspective."
   ]
  },
  "discussion": [
   "Why might a cloud migration fail even when the technology works perfectly?",
   "Where is the line between Governance and Operations in your own words?",
   "Why does the CAF describe the journey as iterative rather than a one-time project?"
  ],
  "exit": [
   [
    "Name the six AWS CAF perspectives.",
    "Business, People, Governance, Platform, Security and Operations."
   ],
   [
    "Which perspective covers cloud financial management and portfolio management?",
    "Governance."
   ],
   [
    "What are the four phases of the CAF journey, in order?",
    "Envision, align, launch and scale."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a perspective cheat sheet listing each perspective with two typical stakeholders and three keywords to use while sorting concerns.",
   "Extend: Ask fast finishers to write a short scenario for each of the four journey phases for a fictional company, and name the business outcome each phase aims to deliver."
  ]
 },
 {
  "t": "Migration strategies (the 7 Rs): rehost, replatform, refactor, repurchase, retire, retain and relocate",
  "objectives": [
   "Students will be able to name and define all seven migration strategies.",
   "Students will be able to distinguish rehost, replatform and refactor by how much the application changes.",
   "Students will be able to distinguish retain from retire and relocate from rehost.",
   "Students will be able to assign an appropriate strategy to each application in a sample portfolio and justify the choice."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up prompt about moving house and collect answers on the board in loose groups."
   ],
   [
    12,
    "Teach",
    "Introduce the seven Rs, mapping the warm-up groups to them. Draw a horizontal line from 'no change' to 'complete redesign' and place rehost, replatform and refactor along it. Discuss retain versus retire and relocate versus rehost. Explain migrate first, then modernize."
   ],
   [
    15,
    "Activity",
    "Run the portfolio planning exercise described in the activity."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions about trade-offs between speed and modernization."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You are moving to a new apartment next month. For your belongings, what different decisions might you make besides 'pack it and bring it'?",
  "activity": {
   "title": "Data center exit portfolio",
   "materials": "Printed portfolio cards (about 14), each describing one application with its constraints, seven strategy headers on the whiteboard, sticky tack.",
   "steps": [
    "Before class, write 14 application cards with realistic constraints, such as 'Email server, company wants to stop managing it', 'Reporting tool, no logins in a year', 'Mainframe billing, replacement project planned for next year', 'Order system that crashes at peak, strong business case for redesign', 'VMware cluster of 80 VMs, operations team wants no change'.",
    "Groups of three receive the full set and a deadline: the data center closes in nine months.",
    "Groups assign each card a strategy and write a one-line justification on a sticky note.",
    "Groups post their cards under the strategy headers on the whiteboard. Where groups disagree, cards are placed between columns.",
    "Discuss each disputed card as a class, focusing on the phrase in the card that decides the strategy."
   ]
  },
  "discussion": [
   "Why might a company rehost an application now even though it plans to refactor it later?",
   "What risks come with refactoring an application under a tight deadline?",
   "What reasons might justify retaining an application on premises indefinitely?"
  ],
  "exit": [
   [
    "An on-premises database is moved to Amazon RDS with no changes to the application. Which strategy?",
    "Replatform."
   ],
   [
    "What is the difference between retain and retire?",
    "Retain keeps the application where it is for now; retire decommissions it."
   ],
   [
    "A monolith is rebuilt as microservices using containers and serverless functions. Which strategy?",
    "Refactor (re-architect)."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page chart with each R, its nickname, a one-line definition and one example, to use during the portfolio activity.",
   "Extend: Ask fast finishers to pick three applications from the portfolio and describe how each might move to a different strategy two years later, such as rehost now and refactor later."
  ]
 },
 {
  "t": "Migration tools: AWS Application Migration Service, AWS DMS with the Schema Conversion Tool, and AWS DataSync",
  "objectives": [
   "Students will be able to match servers, databases and file shares to AWS Application Migration Service, AWS DMS and AWS DataSync.",
   "Students will be able to explain when the AWS Schema Conversion Tool is needed by distinguishing homogeneous from heterogeneous migrations.",
   "Students will be able to explain how continuous replication and change data capture minimize downtime.",
   "Students will be able to recognize when an offline Snow Family device is more appropriate than network transfer."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up prompt and list the 'cargo types' students suggest."
   ],
   [
    12,
    "Teach",
    "Draw three columns on the board: servers, databases, files. Place Application Migration Service, DMS plus SCT, and DataSync in each, describing the flow of each (agent, staging, test, cutover; full load plus CDC; agent, locations, task). Add Snow Family for bandwidth limits and Migration Hub for tracking."
   ],
   [
    15,
    "Activity",
    "Run the migration dispatcher exercise described in the activity."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions about downtime and test launches."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you were moving across the country, would you use the same method to move a piano, a filing cabinet full of documents and a box of photos? Why or why not?",
  "activity": {
   "title": "Migration dispatcher",
   "materials": "Printed job tickets (about 12), each describing something to migrate with a constraint, a printed tool menu, whiteboard.",
   "steps": [
    "Before class, write 12 job tickets such as '80 Linux VMs, minimal downtime', 'MySQL to Aurora MySQL, database must stay online', 'Oracle to Aurora PostgreSQL with stored procedures', '25 TB NFS share to EFS, sync nightly', '2 PB archive, slow internet link'.",
    "Pairs act as migration dispatchers. Each pair draws a ticket, chooses the tool or tools from the menu and writes a one-sentence justification.",
    "Pairs also note whether a database ticket is homogeneous or heterogeneous and whether SCT is needed.",
    "Pairs post tickets on the board under the chosen tool; the class reviews any ticket placed under more than one tool.",
    "Close by asking students to name which ticket was the hardest and which clue word resolved it."
   ]
  },
  "discussion": [
   "Why is the ability to launch test instances before cutover valuable in a server migration?",
   "What could go wrong if a team skips the SCT assessment report in a heterogeneous migration?",
   "How would you decide between DataSync and a Snow Family device for a large dataset?"
  ],
  "exit": [
   [
    "Which AWS service is the primary tool for lift-and-shift server migration?",
    "AWS Application Migration Service."
   ],
   [
    "When do you need the AWS Schema Conversion Tool?",
    "When source and target database engines differ (a heterogeneous migration), to convert the schema and code objects."
   ],
   [
    "Which service copies an on-premises NFS share to Amazon S3 over the network?",
    "AWS DataSync."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a decision card: 'Is it a server? Application Migration Service. A database? DMS, plus SCT if engines differ. Files? DataSync. Too big for the network? Snow Family.'",
   "Extend: Ask fast finishers to write a cutover plan for a company migrating servers, a heterogeneous database and a file share, ordering the steps and explaining how downtime is minimized."
  ]
 },
 {
  "t": "Cloud economics: fixed vs variable costs, total cost of ownership and the costs that move to AWS",
  "objectives": [
   "Students will be able to distinguish fixed from variable costs and direct from indirect costs with examples.",
   "Students will be able to explain total cost of ownership and list cost categories it includes beyond purchase price.",
   "Students will be able to identify which costs largely move to AWS and which the customer still carries.",
   "Students will be able to choose between the AWS Pricing Calculator and AWS Migration Evaluator for a cost task."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about owning a car and list every cost students name on the board."
   ],
   [
    12,
    "Teach",
    "Sort the warm-up list into fixed and variable, then direct and indirect. Translate the categories to an on-premises server. Explain TCO, which costs move to AWS and which remain, and the roles of the Pricing Calculator and Migration Evaluator."
   ],
   [
    15,
    "Activity",
    "Run the TCO sorting exercise described in the activity."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions about hidden costs and why variable is not always cheaper."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "What does it really cost to own a car for five years? List every cost you can think of, not just the purchase price.",
  "activity": {
   "title": "Who pays after the move",
   "materials": "Printed cost cards (about 16), a three-column sheet per group labeled 'Moves to AWS', 'Customer still pays', 'Depends', whiteboard.",
   "steps": [
    "Before class, write 16 cost cards such as 'Server hardware refresh', 'Data center lease', 'Electricity and cooling', 'Physical security guards', 'Developer salaries', 'Application licenses you own', 'Data transfer out to the internet', 'Database patching (on Amazon RDS)', 'Security group configuration', 'Hardware maintenance contract'.",
    "In groups of three or four, students sort each card into one of the three columns.",
    "For each card, groups also mark it direct or indirect and fixed or variable.",
    "Groups compare sorts with a neighboring group and discuss any differences, especially cards in 'Depends'.",
    "The teacher reviews answers, emphasizing that physical infrastructure moves to AWS while workload design, security configuration and staff remain with the customer, and that managed services shift extra work such as patching."
   ]
  },
  "discussion": [
   "Why do on-premises costs such as power and space often get left out of comparisons?",
   "How can a company end up paying more in AWS than on premises, and how would you prevent it?",
   "Why might reducing indirect costs, such as engineers' time spent on maintenance, matter more than reducing direct costs?"
  ],
  "exit": [
   [
    "Name two costs that largely move to AWS when a workload migrates.",
    "Any two of: hardware purchase and refresh, data center space, power and cooling, physical security, hardware maintenance."
   ],
   [
    "What does total cost of ownership measure?",
    "The full lifetime cost of owning and running a system, including hidden costs such as power, space, maintenance and staff time."
   ],
   [
    "Which tool estimates the cost of a planned AWS architecture?",
    "The AWS Pricing Calculator."
   ]
  ],
  "differentiation": [
   "Support: Provide a worked example table showing a single on-premises server's five-year costs broken into categories, so students can see what TCO looks like before sorting cards.",
   "Extend: Ask fast finishers to build a simple TCO comparison on a spreadsheet for a fictional ten-server workload using made-up but labeled assumptions, and explain which assumptions most affect the result."
  ]
 },
 {
  "t": "Licensing strategies (bring your own license vs license included) and rightsizing to cut waste",
  "objectives": [
   "Students will be able to compare license included and bring your own license and choose one for a given scenario.",
   "Students will be able to explain why some BYOL scenarios require Amazon EC2 Dedicated Hosts and how they differ from Dedicated Instances.",
   "Students will be able to identify AWS License Manager, AWS Compute Optimizer and Cost Explorer by their roles.",
   "Students will be able to interpret simple utilization data to make a rightsizing recommendation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about phone plans and gather a few answers on what students pay for but do not use."
   ],
   [
    12,
    "Teach",
    "Explain license included versus BYOL with a two-column comparison. Introduce Dedicated Hosts for socket- or core-based licenses and contrast them with Dedicated Instances. Explain License Manager. Then introduce rightsizing, show the Compute Optimizer and Cost Explorer commands on the projector, and stress that rightsizing is continuous."
   ],
   [
    15,
    "Activity",
    "Run the rightsizing and licensing clinic described in the activity."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions, focusing on vendor terms and metrics beyond CPU."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think about a phone or streaming plan. Are you paying for more than you use? How would you find out, and what would you change?",
  "activity": {
   "title": "Rightsizing and licensing clinic",
   "materials": "Printed server cards (about 10), each showing an instance size, average and peak CPU and memory utilization, the software it runs and any license terms; a printed recommendation sheet per pair.",
   "steps": [
    "Before class, write 10 server cards with made-up but plausible data, for example 'Large instance, average CPU 8 percent, memory 20 percent, Windows Server, no existing licenses' or 'Database server, average CPU 30 percent, memory 85 percent, vendor licenses counted per physical core'.",
    "Pairs act as cost consultants. For each card they choose a licensing model (license included, BYOL on shared tenancy, or BYOL on a Dedicated Host) and justify it.",
    "Pairs then decide whether to downsize, keep or change the instance family, considering both CPU and memory.",
    "Pairs name the AWS tool that would give them this data and recommendations in real life (Compute Optimizer, Cost Explorer, License Manager).",
    "Review the cards together, highlighting the memory-constrained server as a trap for CPU-only rightsizing and the per-core license as the Dedicated Host case."
   ]
  },
  "discussion": [
   "Why should a company read the software vendor's license terms before choosing BYOL in the cloud?",
   "What risks come from rightsizing based only on CPU data?",
   "Who in an organization should own regular rightsizing reviews, and how often should they happen?"
  ],
  "exit": [
   [
    "A short-lived project needs a Windows server and the company has no spare licenses. Which licensing model fits?",
    "License included."
   ],
   [
    "Licenses counted per physical core point to which EC2 option?",
    "Amazon EC2 Dedicated Hosts with bring your own license."
   ],
   [
    "Which AWS service analyzes utilization and recommends better-sized instances?",
    "AWS Compute Optimizer (Cost Explorer also offers EC2 rightsizing recommendations)."
   ]
  ],
  "differentiation": [
   "Support: Provide a simple decision tree: 'Own licenses? If no, license included. If yes, do terms require dedicated hardware or count physical cores? If yes, Dedicated Host.' plus a rightsizing rule of thumb that checks both CPU and memory.",
   "Extend: Ask fast finishers to estimate, using made-up hourly rates they clearly label as assumptions, how much the clinic's recommendations would save per month, and to list one risk of each change."
  ]
 },
 {
  "t": "The AWS shared responsibility model: security of the cloud vs security in the cloud",
  "objectives": [
   "Students will be able to explain the difference between security of the cloud and security in the cloud.",
   "Students will be able to classify common security tasks as AWS, customer or shared responsibilities.",
   "Students will be able to identify shared and inherited controls and give an example of each.",
   "Students will be able to apply the model to a misconfiguration incident and state who must fix it."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up question. Collect three or four answers aloud and write them under two headings on the board, AWS and Customer, without correcting yet."
   ],
   [
    12,
    "Teach",
    "Present the model: AWS secures facilities, hardware, network and hypervisor; the customer secures data, IAM, guest OS, applications and network settings. Introduce shared controls (patch, configuration, training) and inherited controls. Return to the warm-up board and correct the placements together."
   ],
   [
    18,
    "Activity",
    "Run the card sort described below. Circulate and ask each group to justify one card out loud."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the sort to real incidents, emphasizing that settings you can change are yours."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your company moves its website to AWS and a hacker reads customer records. Who failed: AWS or the company? What would you need to know to decide?",
  "activity": {
   "title": "Who owns it? Responsibility card sort",
   "materials": "Printed cards (about 20 per group) each naming one task, three sticky-note column headers (AWS, Customer, Shared), a whiteboard for the class summary.",
   "steps": [
    "Before class, print cards such as: physical guards at data centers, destroying failed disks, hypervisor isolation, patching the guest OS on EC2, writing security group rules, granting IAM permissions, encrypting customer data, classifying data, patch management, configuration management, employee awareness training, global network cabling.",
    "In groups of three, students sort the cards into AWS, Customer and Shared columns, agreeing on a one-sentence reason for each placement.",
    "Groups swap tables and check another group's sort, marking any card they disagree with using a sticky note.",
    "Reconvene and resolve disputed cards on the board. Highlight the rule of thumb: if you can see and change the setting, it is probably yours.",
    "Finish by having each group write one example of an inherited control they could show an auditor."
   ]
  },
  "discussion": [
   "Why do you think so many cloud data leaks come from customer settings rather than from attacks on the provider?",
   "If a managed service takes more work off your plate, which responsibilities can it never take away, and why?"
  ],
  "exit": [
   [
    "Who patches the guest operating system on an EC2 instance?",
    "The customer."
   ],
   [
    "Name one responsibility that always belongs to AWS.",
    "Any of: physical data center security, hardware disposal, the global network, the hypervisor."
   ],
   [
    "Why is patch management called a shared control?",
    "AWS patches its infrastructure and managed services, while the customer patches its guest operating systems and applications."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column cheat card with the phrases \"physical or below the hypervisor = AWS\" and \"you can change the setting = customer\" and let them sort only the clearest cards first.",
   "Extend: Ask fast finishers to write a short incident report for a public S3 bucket leak that names the root cause, the responsible party and three customer-side controls that would have prevented it."
  ]
 },
 {
  "t": "How responsibilities shift across Amazon EC2, Amazon RDS, AWS Lambda and Amazon S3",
  "objectives": [
   "Students will be able to describe how the responsibility line moves from Amazon EC2 to Amazon RDS to AWS Lambda and Amazon S3.",
   "Students will be able to state who patches the operating system and database engine for each of the four services.",
   "Students will be able to identify the responsibilities that remain with the customer in every service.",
   "Students will be able to recommend a service change that reduces a team's patching burden and explain what duties remain."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers. Point out that the answer depends on the service, which is today's topic."
   ],
   [
    12,
    "Teach",
    "Draw a stack on the board from facilities at the bottom to data at the top. For EC2, RDS, Lambda and S3, draw a horizontal line where AWS stops. Walk through who patches the OS, the engine and the runtime, and stress what never moves: data, identities and configuration."
   ],
   [
    18,
    "Activity",
    "Run the layered-stack whiteboard activity below in groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, drawing on group posters."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A critical operating system vulnerability is announced. Your company runs servers on EC2 and a database on RDS. Which one do you have to patch yourself?",
  "activity": {
   "title": "Draw the line: responsibility stacks for four services",
   "materials": "Whiteboard or large paper per group, markers in two colors, a printed list of layers (facilities, hardware, network, hypervisor, guest OS, database engine or runtime, application code and dependencies, network settings, IAM, data).",
   "steps": [
    "Assign each group one service: EC2, RDS, Lambda or S3 (repeat services if there are more than four groups).",
    "Each group draws the layer stack and colors AWS layers in one color and customer layers in the other, writing one concrete customer task beside each customer layer.",
    "Groups post their stacks side by side in order EC2, RDS, Lambda, S3 so the class can see the line rising.",
    "Do a gallery walk: each student leaves one sticky note correcting or questioning a placement on another group's poster.",
    "Groups respond to the notes, then the class agrees on the layers that are customer-owned on every poster."
   ]
  },
  "discussion": [
   "Why might a team choose EC2 even though it means more security work?",
   "If S3 blocks public access by default, why are public buckets still a customer responsibility?"
  ],
  "exit": [
   [
    "Who patches the database engine on Amazon RDS?",
    "AWS, during the customer's chosen maintenance window."
   ],
   [
    "Name two responsibilities a customer keeps when using AWS Lambda.",
    "Any two of: function code and dependencies, the IAM execution role, configuration and environment variables, secrets handling, the data processed."
   ],
   [
    "Which responsibility stays with the customer for all four services?",
    "Protecting data and managing identities, permissions and access configuration."
   ]
  ],
  "differentiation": [
   "Support: Provide a partly completed stack for EC2 as a model and let struggling students fill in RDS by changing only the layers that move.",
   "Extend: Ask fast finishers to add Amazon DynamoDB or AWS Fargate to the comparison and argue where the line sits, citing which layers AWS manages."
  ]
 },
 {
  "t": "Compliance and governance: AWS Artifact, AWS Audit Manager, AWS Config and where to find compliance information",
  "objectives": [
   "Students will be able to distinguish AWS Artifact, AWS Audit Manager and AWS Config by the need each one meets.",
   "Students will be able to explain why compliance in the cloud is shared between AWS and the customer.",
   "Students will be able to locate where to find which AWS services are in scope for a compliance program.",
   "Students will be able to select the correct service for a given compliance scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect answers. Draw a line down the board labeled AWS's evidence and Our evidence."
   ],
   [
    12,
    "Teach",
    "Explain Artifact Reports and Agreements, Audit Manager assessments and evidence, and Config rules, history and conformance packs. Mention Services in Scope and governance tools (Organizations SCPs, Control Tower). Contrast Config with CloudTrail."
   ],
   [
    18,
    "Activity",
    "Run the auditor request role-play below."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions individually."
   ]
  ],
  "warmup": "An auditor asks you to prove your cloud provider's data centers are secure. You have never been inside one. How could you possibly provide that proof?",
  "activity": {
   "title": "The auditor's requests: a role-play",
   "materials": "Printed request cards (about 10), three table signs reading Artifact, Audit Manager and Config, a whiteboard for scoring.",
   "steps": [
    "Prepare request cards such as: \"Give me AWS's latest SOC 2 report\", \"Show me that you signed a BAA\", \"Show me every time this security group changed\", \"Prove all EBS volumes are encrypted\", \"Show a year of evidence mapped to PCI DSS\", \"Which services are HIPAA eligible?\"",
    "Split the class into three service teams sitting at the signed tables, and choose two students to act as auditors.",
    "Auditors read one card at a time. The team that believes it owns the request stands and explains in one sentence how its service answers it.",
    "If no team or the wrong team stands, the class discusses and the teacher reveals the answer, including cards answered by Services in Scope or CloudTrail.",
    "Close by having each team write its service's one-line purpose on the board."
   ]
  },
  "discussion": [
   "Why might an organization still fail an audit even though AWS passed all of its own?",
   "How does continuous evidence collection change the way a team prepares for audits compared with gathering screenshots at the last minute?"
  ],
  "exit": [
   [
    "Which service provides AWS's SOC and PCI reports?",
    "AWS Artifact."
   ],
   [
    "Which service evaluates your resources against rules and tracks configuration changes?",
    "AWS Config."
   ],
   [
    "Does Audit Manager certify that you are compliant?",
    "No. It collects and organizes evidence to help you prepare; auditors determine compliance."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-row table with a keyword per service (Artifact = AWS's documents, Config = your settings, Audit Manager = evidence binder) to use during the role-play.",
   "Extend: Ask fast finishers to design a conformance pack for a small clinic, listing five Config rules they would include and why."
  ]
 },
 {
  "t": "Encryption at rest and in transit: AWS KMS, AWS CloudHSM and AWS Certificate Manager",
  "objectives": [
   "Students will be able to differentiate encryption at rest from encryption in transit with examples.",
   "Students will be able to compare AWS KMS and AWS CloudHSM in terms of control and operational effort.",
   "Students will be able to explain the role of AWS Certificate Manager in providing HTTPS.",
   "Students will be able to choose among KMS, CloudHSM and ACM for a given requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a browser padlock icon on the projector and ask the warm-up question. Note answers on the board."
   ],
   [
    12,
    "Teach",
    "Define at rest and in transit. Explain KMS key types (AWS owned, AWS managed, customer managed), key policies and CloudTrail logging; CloudHSM as single-tenant hardware under customer control; ACM for TLS certificates with automatic renewal on integrated services."
   ],
   [
    18,
    "Activity",
    "Run the requirement matching activity below."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "The padlock in your browser says the connection is secure. Does that mean the website stores your data securely too? Why or why not?",
  "activity": {
   "title": "Match the requirement to the service",
   "materials": "Printed requirement cards (12), a three-column grid on the whiteboard labeled KMS, CloudHSM and ACM, sticky notes.",
   "steps": [
    "Prepare requirement cards such as: \"encrypt an EBS volume with one setting\", \"HTTPS for an Application Load Balancer\", \"keys must be in single-tenant hardware\", \"audit every decrypt call\", \"stop certificates from expiring\", \"application uses PKCS#11\", \"control which role can use the key\".",
    "Pairs draw three cards, decide the service for each and write whether the requirement is about at rest or in transit.",
    "Each pair places its cards in the grid on the board and explains one choice to the class.",
    "The class challenges any placement they disagree with; the teacher confirms using the exam keywords.",
    "Pairs finish by writing a two-sentence encryption plan for a small online store using at least two of the services."
   ]
  },
  "discussion": [
   "Why would a company accept the extra work of CloudHSM instead of using KMS?",
   "How does automatic certificate renewal change operational risk for a small team?"
  ],
  "exit": [
   [
    "Which service provides TLS certificates with automatic renewal for a load balancer?",
    "AWS Certificate Manager (ACM)."
   ],
   [
    "A requirement says keys must be in dedicated hardware that AWS cannot access. Which service?",
    "AWS CloudHSM."
   ],
   [
    "Where is each use of a KMS key recorded?",
    "In AWS CloudTrail."
   ]
  ],
  "differentiation": [
   "Support: Provide a keyword strip for struggling students: \"integrated keys = KMS\", \"dedicated hardware = CloudHSM\", \"certificates/HTTPS = ACM\".",
   "Extend: Ask fast finishers to explain why rotating a KMS key does not require re-encrypting existing data immediately, researching the concept in AWS documentation on student laptops if available."
  ]
 },
 {
  "t": "Protecting the root user: MFA, no access keys, and the tasks that require root credentials",
  "objectives": [
   "Students will be able to explain why the root user must be protected and rarely used.",
   "Students will be able to list the recommended root user protections: MFA, no access keys and monitoring.",
   "Students will be able to identify tasks that require root credentials and distinguish them from tasks that do not.",
   "Students will be able to propose an alternative to root for everyday administration."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a master key and take a few answers."
   ],
   [
    12,
    "Teach",
    "Explain what the root user is, why policies cannot limit it in a standalone account, MFA options, why root access keys must not exist, monitoring root sign-ins with CloudTrail and alarms, and the pattern of root-only tasks. Show `aws iam get-account-summary` output fields on the projector."
   ],
   [
    18,
    "Activity",
    "Run the root or not card game below."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If your building had one master key that opens every door and cannot be changed, where would you keep it, and who would be allowed to use it?",
  "activity": {
   "title": "Root or not? Task card game and hardening checklist",
   "materials": "Printed task cards (16), two table signs reading Root required and Not root, a printed blank checklist per pair.",
   "steps": [
    "Prepare task cards such as: close the account, change the root email address, restore IAM permissions after the only admin is locked out, register as a Reserved Instance Marketplace seller, enable MFA delete on an S3 bucket, create an IAM user, launch an EC2 instance, view Cost Explorer, create an IAM role, attach a policy to a group.",
    "Pairs sort the cards into Root required and Not root, then compare with a neighboring pair.",
    "Review answers as a class, emphasizing that root-only tasks concern the account itself.",
    "Each pair then writes a five-step hardening checklist for a new account's root user (for example: enable MFA, register a backup MFA device, confirm no access keys, set an alert on root sign-ins, create admin access in IAM Identity Center).",
    "Two pairs read their checklists aloud, and the class merges them into one on the whiteboard."
   ]
  },
  "discussion": [
   "Why do attackers target long-term access keys rather than trying to guess passwords?",
   "Who in a small organization should have access to the root credentials, and how would you document that?"
  ],
  "exit": [
   [
    "Name two best practices for protecting the root user.",
    "Enable MFA and ensure no root access keys exist (also: use it only for root-only tasks, monitor root sign-ins)."
   ],
   [
    "Does creating an IAM user require the root user?",
    "No. Any IAM identity with the right permissions can create IAM users."
   ],
   [
    "Give one task that requires root user credentials.",
    "Any of: closing the account, changing the root email or account name, restoring locked-out IAM permissions, enabling MFA delete on an S3 bucket."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a short list headed \"Root = account itself\" with three examples to refer to during the card game.",
   "Extend: Ask fast finishers to explain how service control policies and centralized root access in AWS Organizations change root user risk for member accounts."
  ]
 },
 {
  "t": "IAM users, groups, roles and policies, and the principle of least privilege",
  "objectives": [
   "Students will be able to define IAM users, groups, roles and policies and explain how they relate.",
   "Students will be able to read a simple IAM policy and state what it allows.",
   "Students will be able to explain policy evaluation: default deny, explicit Allow and explicit Deny override.",
   "Students will be able to apply least privilege by choosing the right IAM building block for a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list ideas for limiting the damage."
   ],
   [
    12,
    "Teach",
    "Introduce users, groups, roles (with STS temporary credentials) and policies. Project the sample JSON policy and walk through Effect, Action and Resource. Explain default deny and explicit Deny override, then least privilege and IAM Access Analyzer."
   ],
   [
    18,
    "Activity",
    "Run the policy reading and access design activity below."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Every employee at a company has the master password to every system. What could go wrong, and what would you change first?",
  "activity": {
   "title": "Read the policy, then design the access",
   "materials": "Projector, three printed policy excerpts (an S3 read-only Allow, an Allow plus an explicit Deny on delete, an overly broad `\"Action\": \"*\"` policy), whiteboard, sticky notes.",
   "steps": [
    "Pairs receive the three printed policy excerpts and write in plain English what each one allows or denies.",
    "For the Allow plus Deny excerpt, pairs decide whether a delete request succeeds and explain why.",
    "Pairs mark the overly broad policy as a least-privilege violation and rewrite its Action and Resource lines on a sticky note to be narrower.",
    "Present a scenario on the board: five analysts need read access to one bucket, a nightly EC2 job needs the same, and an auditor needs read-only access for a week. Pairs choose user, group, role or policy for each need.",
    "Pairs share answers; the teacher confirms group for the analysts, role for the EC2 job and a role with temporary credentials for the auditor."
   ]
  },
  "discussion": [
   "Why does AWS now recommend roles and temporary credentials over long-term IAM user access keys?",
   "How would you convince a team that least privilege will not slow them down?"
  ],
  "exit": [
   [
    "An EC2 instance needs to read from S3. Which IAM building block should you use?",
    "An IAM role attached to the instance."
   ],
   [
    "One policy allows an action and another explicitly denies it. What is the result?",
    "The action is denied; explicit Deny always wins."
   ],
   [
    "Ten developers need identical permissions. What is the best way to grant them?",
    "Put them in an IAM group and attach the policy to the group."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a policy decoder card that labels Effect, Action, Resource and Condition with a one-line meaning each.",
   "Extend: Ask fast finishers to add a Condition to the sample policy that requires MFA or limits access to a corporate IP range and explain how it narrows access."
  ]
 },
 {
  "t": "Workforce single sign-on with AWS IAM Identity Center and customer sign-in with Amazon Cognito",
  "objectives": [
   "Students will be able to distinguish workforce identity from customer identity.",
   "Students will be able to explain how IAM Identity Center uses an identity source and permission sets to grant access across accounts.",
   "Students will be able to compare a Cognito user pool with a Cognito identity pool.",
   "Students will be able to select IAM Identity Center or Amazon Cognito for a given scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sort answers on the board into Staff and Customers."
   ],
   [
    12,
    "Teach",
    "Explain IAM Identity Center: identity sources, the AWS access portal, permission sets that become IAM roles, temporary credentials and integration with AWS Organizations. Then explain Cognito user pools (sign-up, sign-in, MFA, social and enterprise federation, tokens) and identity pools (temporary AWS credentials)."
   ],
   [
    18,
    "Activity",
    "Run the two-desk role-play below."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think about how you log in at work or school versus how you log in to a shopping app. What is different about who manages those accounts?",
  "activity": {
   "title": "Two front desks: staff entrance or customer counter",
   "materials": "Printed persona cards (12), two table signs reading IAM Identity Center and Amazon Cognito, sticky notes, whiteboard.",
   "steps": [
    "Prepare persona cards such as: a new contractor who needs three AWS accounts, a shopper signing in with Google, a finance analyst who needs read-only billing access in every account, a mobile gamer uploading screenshots to S3, a developer using the CLI with corporate credentials, a guest user browsing an app.",
    "Two students staff the desks. The rest of the class receives persona cards and lines up at the desk they believe serves them.",
    "Each desk staffer asks the persona to explain why they belong there, and redirects anyone at the wrong desk with a reason.",
    "For each Cognito persona, the class decides whether a user pool, an identity pool or both are involved, and writes it on a sticky note.",
    "Summarize on the board: workforce and AWS accounts on one side, app customers and social sign-in on the other."
   ]
  },
  "discussion": [
   "Why is it risky to create individual IAM users for every contractor in every account?",
   "What would go wrong if a company stored its app customers in the same directory as its employees?"
  ],
  "exit": [
   [
    "Employees need one sign-in for many AWS accounts. Which service?",
    "AWS IAM Identity Center."
   ],
   [
    "An app needs customer sign-up with social identity providers. Which service?",
    "Amazon Cognito (a user pool)."
   ],
   [
    "What does a Cognito identity pool provide?",
    "Temporary AWS credentials in exchange for a signed-in (or guest) identity."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-question decision card: \"Works for us? Identity Center. Uses our app? Cognito.\"",
   "Extend: Ask fast finishers to sketch the sign-in flow for a mobile app that uploads to S3, labeling where the user pool, tokens, identity pool and IAM role appear."
  ]
 },
 {
  "t": "Storing credentials safely: AWS Secrets Manager and AWS Systems Manager Parameter Store",
  "objectives": [
   "Students will be able to explain why hard-coded credentials are dangerous.",
   "Students will be able to compare AWS Secrets Manager and Systems Manager Parameter Store on rotation, cost and use cases.",
   "Students will be able to distinguish secret stores from AWS KMS.",
   "Students will be able to choose a secret storage service for a scenario and apply least privilege to its access."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a fictional code snippet on the projector with `DB_PASSWORD = \"Summer2024\"` and ask the warm-up question."
   ],
   [
    12,
    "Teach",
    "Explain where secrets leak from, then Secrets Manager (storage, KMS encryption, CloudTrail logging, automatic rotation, cost per secret and per call) and Parameter Store (hierarchy, String, StringList, SecureString, standard parameters at no additional charge, no built-in rotation). Contrast both with KMS."
   ],
   [
    18,
    "Activity",
    "Run the find-and-fix code review below."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "This line of code contains a database password. List every place that password might end up copied to over the next year.",
  "activity": {
   "title": "Find and fix: a secrets code review",
   "materials": "Printed one-page fictional configuration file and application snippet containing a database password, an API key, a database hostname and two feature flags; highlighters; whiteboard.",
   "steps": [
    "Pairs highlight every value in the printed files and label each as secret or non-secret configuration.",
    "For each value, pairs choose Secrets Manager or Parameter Store and write a parameter path or secret name, such as `/prod/orders/db-host` or `prod/orders/db`.",
    "Pairs mark which secrets need automatic rotation and justify the choice of service.",
    "Pairs write a one-sentence least-privilege rule for the application's IAM role (which secrets and paths it may read).",
    "Two pairs present their redesign; the class compares choices and the teacher confirms the rotation and cost clues."
   ]
  },
  "discussion": [
   "Why does rotation only help if applications fetch the current value instead of caching it forever?",
   "When might a team choose Parameter Store over Secrets Manager even for a sensitive value?"
  ],
  "exit": [
   [
    "Which service provides built-in automatic rotation for RDS credentials?",
    "AWS Secrets Manager."
   ],
   [
    "Which service offers hierarchical parameters, with standard parameters at no additional charge?",
    "AWS Systems Manager Parameter Store."
   ],
   [
    "What does AWS KMS do in relation to these services?",
    "It manages the encryption keys that protect the stored secret values; it does not store the secrets itself."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-clue card: \"rotation = Secrets Manager\", \"configuration at no extra cost = Parameter Store\".",
   "Extend: Ask fast finishers to describe how a rotation for a third-party API key would work using a Lambda rotation function, at a conceptual level."
  ]
 },
 {
  "t": "Network protection: security groups vs network ACLs, AWS WAF, AWS Shield Standard and Advanced, AWS Firewall Manager",
  "objectives": [
   "Students will be able to compare security groups and network ACLs on level, rule types and statefulness.",
   "Students will be able to explain what AWS WAF inspects and which attacks it helps block.",
   "Students will be able to distinguish Shield Standard from Shield Advanced.",
   "Students will be able to select the right network protection service, including Firewall Manager, for a given threat."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch the layers students suggest on the board."
   ],
   [
    12,
    "Teach",
    "Draw traffic flowing from the internet through Shield, WAF, the network ACL and the security group. Compare security groups (instance level, stateful, allow-only) and network ACLs (subnet level, stateless, allow and deny, ordered). Explain WAF web ACLs and managed rule groups, Shield Standard and Advanced, and Firewall Manager."
   ],
   [
    18,
    "Activity",
    "Run the rule-table troubleshooting activity below."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A building has a fence, a front desk, locked office doors and a mailroom. Which of those would stop a burglar, a crowd blocking the entrance and a letter bomb?",
  "activity": {
   "title": "Fix the firewall: reading rule tables in pairs",
   "materials": "Printed handout with one security group rule table and one network ACL rule table (numbered rules, including an allow-all rule placed before a deny rule and a missing outbound ephemeral port rule), a list of four threat scenarios, pens, whiteboard.",
   "steps": [
    "Pairs read the security group table and state which traffic is allowed and whether replies are permitted.",
    "Pairs read the network ACL table, find why the deny rule for a bad address range never applies (it comes after an allow-all rule) and renumber it.",
    "Pairs find why HTTPS connections fail (no outbound rule for return traffic) and write the missing rule.",
    "For each threat scenario (SQL injection in a search box, a large traffic flood, one probing IP range, the need for one WAF rule set across 15 accounts), pairs choose the right service.",
    "Review on the board, stressing statefulness, rule order and the layer each service works at."
   ]
  },
  "discussion": [
   "Why do many teams rely mainly on security groups and use network ACLs only as a coarse backstop?",
   "When would the cost protection and response team in Shield Advanced be worth paying for?"
  ],
  "exit": [
   [
    "Which firewall is stateless and supports deny rules?",
    "A network ACL."
   ],
   [
    "Which service blocks SQL injection in web requests?",
    "AWS WAF."
   ],
   [
    "Which DDoS protection is included for all customers at no additional cost?",
    "AWS Shield Standard."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a comparison table template with rows for level, rule types, statefulness and rule order to fill in for security groups and network ACLs.",
   "Extend: Ask fast finishers to design a layered protection plan for a public web application in three accounts, naming each service and where it attaches."
  ]
 },
 {
  "t": "Threat detection and posture: Amazon GuardDuty, Amazon Inspector, Amazon Macie, Amazon Detective and AWS Security Hub",
  "objectives": [
   "Students will be able to state the question each of GuardDuty, Inspector, Macie, Detective and Security Hub answers.",
   "Students will be able to distinguish threat detection, vulnerability assessment, data discovery, investigation and posture management.",
   "Students will be able to sequence how the services work together during an incident.",
   "Students will be able to select the correct service from an exam-style description."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and write the five roles students name on the board."
   ],
   [
    12,
    "Teach",
    "Present each service as an answer to one question: is something bad happening (GuardDuty), what is vulnerable (Inspector), where is sensitive data (Macie), what happened (Detective), what is my posture (Security Hub). Note data sources for GuardDuty and scan targets for Inspector. Stress that none of them block traffic."
   ],
   [
    18,
    "Activity",
    "Run the incident timeline role-play below."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A hospital has a night guard, a building inspector, a records officer, an investigator and a security office. What is each one's job, and which would you call first after a break-in?",
  "activity": {
   "title": "Incident timeline: five services, one story",
   "materials": "Five role cards (GuardDuty, Inspector, Macie, Detective, Security Hub), a printed set of eight fictional finding cards for a cryptocurrency mining incident, whiteboard with a timeline drawn across it, sticky notes.",
   "steps": [
    "Groups of five each take a role card. Distribute the finding cards face down in the middle of each group.",
    "Students turn over finding cards one at a time; the student whose service would produce or answer that finding claims it and explains why in one sentence.",
    "Groups place their claimed cards on the whiteboard timeline in the order they would be discovered and acted on.",
    "The Security Hub student summarizes the incident for the group using all the claimed findings, and the group decides which finding to fix first.",
    "Debrief as a class, pointing out any card claimed by the wrong service and naming which tool would actually block the attack (for example a security group or WAF)."
   ]
  },
  "discussion": [
   "Why might an organization enable these services across every account rather than only in production?",
   "If all five services are detection and assessment tools, what has to happen for an organization to actually be safer?"
  ],
  "exit": [
   [
    "Which service finds known CVEs in container images?",
    "Amazon Inspector."
   ],
   [
    "Which service discovers PII in S3 buckets?",
    "Amazon Macie."
   ],
   [
    "Which service aggregates findings and checks accounts against security standards?",
    "AWS Security Hub."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students the one-line memory aid (GuardDuty guards, Inspector inspects, Macie finds data, Detective investigates, Security Hub is the hub) on a card to use during the activity.",
   "Extend: Ask fast finishers to map which log sources GuardDuty analyzes and explain why it needs no agent for its foundational data sources."
  ]
 },
 {
  "t": "Logging and monitoring for security: AWS CloudTrail, Amazon CloudWatch and AWS Trusted Advisor security checks",
  "objectives": [
   "Students will be able to distinguish CloudTrail, CloudWatch and Trusted Advisor by the question each answers.",
   "Students will be able to explain CloudTrail Event history, trails and data events, including the 90-day default.",
   "Students will be able to describe how CloudTrail and CloudWatch combine to alert on security events.",
   "Students will be able to identify Trusted Advisor security checks and the support plans that unlock the full set."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record answers in three columns on the board."
   ],
   [
    12,
    "Teach",
    "Explain CloudTrail (API calls, Event history for 90 days, trails to S3, data events, integrity validation, organization trails), CloudWatch (metrics, logs, dashboards, alarms, SNS, metric filters on CloudTrail logs) and Trusted Advisor (check categories, security checks, support plan levels). Show a sample CloudTrail event record on the projector."
   ],
   [
    18,
    "Activity",
    "Run the log detective activity below."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your shop's back door was found unlocked this morning. What three different kinds of information would help you find out what happened and stop it from happening again?",
  "activity": {
   "title": "Log detective: who, how and what next",
   "materials": "Printed excerpts of three fictional CloudTrail event records (for example an AuthorizeSecurityGroupIngress call, a DeleteBucket call and a root ConsoleLogin), a printed fictional CloudWatch CPU graph with a threshold line, a printed fictional Trusted Advisor security check summary, highlighters.",
   "steps": [
    "In groups of three, students highlight the event name, time, identity and source IP address in each CloudTrail record and write a one-line story of what happened.",
    "Groups look at the CloudWatch graph and decide what alarm threshold and notification they would set.",
    "Groups read the Trusted Advisor summary, list the two most urgent security issues and say who must act on them.",
    "Groups design one alert that combines CloudTrail and CloudWatch for the security group change they found, naming each piece (log group, metric filter, alarm, SNS topic).",
    "Each group shares one finding; the class labels each answer CloudTrail, CloudWatch or Trusted Advisor on the board."
   ]
  },
  "discussion": [
   "Why is mixing up CloudTrail and CloudWatch such a common mistake, and what wording helps you tell them apart?",
   "What risks does an organization take if it relies only on the 90-day Event history?"
  ],
  "exit": [
   [
    "Which service records who made an API call and from where?",
    "AWS CloudTrail."
   ],
   [
    "Which service raises an alarm when CPU utilization crosses a threshold?",
    "Amazon CloudWatch."
   ],
   [
    "Which support plans unlock the full set of Trusted Advisor checks?",
    "Business, Enterprise On-Ramp or Enterprise."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-word key: \"Trail = who\", \"Watch = how it runs\", \"Advisor = what to improve\".",
   "Extend: Ask fast finishers to compare CloudTrail with AWS Config for the same security group change and explain what each one would show."
  ]
 },
 {
  "t": "Where to get security help: AWS security documentation, AWS Knowledge Center, AWS Marketplace security products and AWS Partners",
  "objectives": [
   "Students will be able to identify the purpose of AWS security documentation, the Security Pillar, Security Bulletins, the Knowledge Center and re:Post.",
   "Students will be able to explain when AWS Marketplace is the right source for a security product and how it is billed.",
   "Students will be able to distinguish APN partners, AWS Professional Services, AWS Artifact and the AWS Trust & Safety team.",
   "Students will be able to match a short security help scenario to the correct AWS resource."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers on the whiteboard in four columns the class will later label read, search, buy and hire."
   ],
   [
    12,
    "Teach",
    "Walk through the four shelves: documentation and the Security Pillar, Knowledge Center and re:Post, Marketplace, and APN partners and Professional Services. Add Artifact and Trust & Safety as special contacts. Stress the clue words for each."
   ],
   [
    18,
    "Activity",
    "Run the help-desk card sort in groups, then have each group defend two of its hardest placements."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to surface confusions between Marketplace and Artifact, and between partners and Professional Services."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on paper or sticky notes."
   ]
  ],
  "warmup": "When you get stuck on a problem with your phone or laptop, where do you go first: the manual, a forum, a store or a repair person? Why that choice?",
  "activity": {
   "title": "Security help desk card sort",
   "materials": "Printed scenario cards (about 14), six labeled envelopes or whiteboard zones: Documentation, Knowledge Center or re:Post, Marketplace, APN Partner or Professional Services, AWS Artifact, Trust & Safety.",
   "steps": [
    "Prepare cards such as 'Need SOC 2 report for auditor', 'Buy a known SIEM product billed to AWS', 'Report phishing site on an AWS IP address', 'How does S3 encryption work', 'Common IAM Access Denied error', 'Hire a firm to design a landing zone'.",
    "In groups of three or four, students sort each card into one zone and write the clue word that decided it on the back.",
    "Groups swap and check another group's sort, marking any disagreement with a sticky note.",
    "The teacher reviews disputed cards with the class, linking each answer to its clue word."
   ]
  },
  "discussion": [
   "Why might an organization choose a third-party firewall from Marketplace instead of building controls with AWS WAF and security groups?",
   "What are the risks of relying only on community answers from re:Post for a production security decision?"
  ],
  "exit": [
   [
    "An auditor wants AWS's ISO certification. Where do you get it?",
    "AWS Artifact."
   ],
   [
    "A company wants to keep its current endpoint protection vendor and pay through AWS. Which resource?",
    "AWS Marketplace."
   ],
   [
    "Who do you contact to report spam sent from an AWS-hosted server?",
    "The AWS Trust & Safety team."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page clue-word table (read, search, buy, hire, reports, abuse) to use during the card sort, and pair them with a confident partner.",
   "Extend: Ask fast finishers to write two tricky scenario cards that could fool a classmate, with an explanation of the correct answer and the tempting wrong one."
  ]
 },
 {
  "t": "Ways to use AWS: AWS Management Console, AWS CLI, SDKs, APIs and infrastructure as code with AWS CloudFormation",
  "objectives": [
   "Students will be able to explain that the console, CLI and SDKs are all front ends to the same AWS APIs.",
   "Students will be able to choose between the Management Console, AWS CLI, CloudShell and SDKs for a described task.",
   "Students will be able to describe how AWS CloudFormation provisions a stack from a template and why that is repeatable.",
   "Students will be able to distinguish CloudFormation from Elastic Beanstalk and the CDK."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about building the same thing many times and collect ideas."
   ],
   [
    15,
    "Teach",
    "Draw one box labeled AWS APIs and four arrows into it: console, CLI, SDK, CloudFormation. Explain each with a short demo or screenshot, show the three-line CLI example, and project a tiny YAML template to show declarative style."
   ],
   [
    15,
    "Activity",
    "Run the recipe card build: groups write a plain-language template, swap, and build each other's design on paper."
   ],
   [
    5,
    "Discuss",
    "Discuss why written templates beat clicking for production and what can go wrong when a stack is deleted."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you had to set up twenty identical laptops for new staff, would you click through the settings on each one, or find another way? What could go wrong with clicking?",
  "activity": {
   "title": "Recipe card infrastructure",
   "materials": "Index cards or paper, markers, whiteboard, projector showing a short sample CloudFormation YAML template.",
   "steps": [
    "Each group of three writes a plain-language 'template' on a card listing resources and settings for a small web app (network, two servers, a database, a load balancer), including names and sizes.",
    "Groups swap cards and draw the environment exactly as written, without asking questions.",
    "Groups compare drawings with the original intent and list every ambiguity or missing setting.",
    "The teacher connects the results to IaC: a precise template removes ambiguity, can be reviewed like code and produces the same result every time, while verbal or click-by-click instructions drift."
   ]
  },
  "discussion": [
   "When is it perfectly reasonable to use the console instead of a template?",
   "Why might a security team prefer CloudShell or single sign-on over long-term access keys on laptops?"
  ],
  "exit": [
   [
    "Which tool lets application code call AWS with request signing and retries handled?",
    "An AWS SDK."
   ],
   [
    "Which service deploys resources as a stack from a JSON or YAML template?",
    "AWS CloudFormation."
   ],
   [
    "What do the console, CLI and SDKs have in common?",
    "They all make calls to the same AWS service APIs, which CloudTrail can record."
   ]
  ],
  "differentiation": [
   "Support: Provide a four-row matching sheet (task on the left, tool on the right) and have struggling students complete it before the card activity.",
   "Extend: Ask fast finishers to sketch, in pseudo-YAML, a template with a parameter for environment name, and explain how it lets one template serve development, test and production."
  ]
 },
 {
  "t": "Deployment models (cloud, hybrid and on-premises) and one-time vs repeatable provisioning",
  "objectives": [
   "Students will be able to define cloud, hybrid and on-premises deployment models and identify each from a scenario.",
   "Students will be able to explain at least two reasons an organization chooses a hybrid model.",
   "Students will be able to compare one-time and repeatable provisioning and justify repeatable provisioning for production.",
   "Students will be able to recognize that multi-Region designs are cloud, not hybrid, and that Outposts supports hybrid."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sort student answers into three columns on the board without labeling them yet."
   ],
   [
    13,
    "Teach",
    "Label the columns cloud, hybrid and on-premises. Explain each with an example, the CapEx versus OpEx difference, and the hybrid services (VPN, Direct Connect, Outposts, Storage Gateway, Systems Manager). Then contrast one-time and repeatable provisioning."
   ],
   [
    17,
    "Activity",
    "Run the model-spotting scenario sort in pairs and then a quick whole-class vote on the trickiest cards."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore why hybrid can be permanent and why templates matter for recovery."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Where do you keep your photos: only on your phone, only in an online service, or both and synced? Why did you choose that?",
  "activity": {
   "title": "Spot the deployment model",
   "materials": "Printed scenario cards (about 12), sticky notes in three colors for cloud, hybrid and on-premises, whiteboard.",
   "steps": [
    "Hand each pair a set of scenario cards, including traps such as 'runs in four AWS Regions', 'Outposts rack in the hospital basement' and 'virtualization cluster in our own building'.",
    "Pairs attach a colored sticky note to each card and underline the clue words that decided it.",
    "For each card, pairs also mark whether the environment described was provisioned one-time or repeatably, if the card says.",
    "The teacher reveals answers, focusing on the trap cards and asking pairs to explain their reasoning aloud."
   ]
  },
  "discussion": [
   "What kinds of organizations might stay hybrid for many years, and why?",
   "If a Region failed tonight, how would a team with templates recover differently from a team that clicked everything by hand?"
  ],
  "exit": [
   [
    "A company keeps its ERP system in its data center and runs its website on AWS, connected by VPN. Which model?",
    "Hybrid."
   ],
   [
    "Is a design spread across two AWS Regions hybrid?",
    "No, it is cloud, because nothing runs on premises."
   ],
   [
    "Give one reason production should use repeatable provisioning.",
    "It produces consistent, reviewable environments that can be rebuilt quickly after a failure."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-question flowchart: Does anything run in your own building? Does anything run in the cloud? Are they connected? Use it with each card.",
   "Extend: Ask fast finishers to design a hybrid architecture for a hospital on the whiteboard, naming the connection service and one AWS hybrid service, and to explain which parts would be templated."
  ]
 },
 {
  "t": "AWS global infrastructure: Regions, Availability Zones, edge locations, Local Zones, Wavelength Zones and AWS Outposts",
  "objectives": [
   "Students will be able to describe the relationship between Regions and Availability Zones.",
   "Students will be able to explain why deploying across multiple AZs provides high availability and multiple Regions provide disaster recovery.",
   "Students will be able to identify the purpose of edge locations, Local Zones, Wavelength Zones and Outposts.",
   "Students will be able to select the right infrastructure component for a latency, availability or residency requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect the answers to the idea of not keeping everything in one place."
   ],
   [
    15,
    "Teach",
    "Draw a world map on the board with one Region as a large circle containing three AZ boxes. Add edge location dots in many cities, a Local Zone near one city, a cell tower for Wavelength and a building for Outposts. Explain each and what failure or latency problem it solves."
   ],
   [
    15,
    "Activity",
    "Run the outage simulation: groups place an app on the whiteboard map, then the teacher announces failures and groups check whether they survive."
   ],
   [
    5,
    "Discuss",
    "Discuss the trade-off between cost and resilience, and when multiple Regions are worth it."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If your school stored every student record on one computer in one room, what events could wipe them out? How would you protect them?",
  "activity": {
   "title": "Outage simulation",
   "materials": "Whiteboard map with one or two Regions and their AZs drawn, sticky notes to represent servers, databases and backups, printed event cards.",
   "steps": [
    "Each group gets a budget of six sticky notes and places its web servers, database and backups on the map for a shopping site.",
    "The teacher draws event cards one at a time: 'Power loss in AZ b', 'Flood takes out the whole Region', 'Users in another continent report slow images', '5G app needs ultra-low latency'.",
    "After each event, groups decide whether their design survives or meets the need and, if not, which component (another AZ, another Region, CloudFront, Wavelength, Local Zone) would fix it.",
    "Groups redesign once and explain their final placement to the class."
   ]
  },
  "discussion": [
   "Why might a small business accept running in multiple AZs but not multiple Regions?",
   "How does the Region choice connect to laws about where data must be stored?"
  ],
  "exit": [
   [
    "What does deploying across multiple Availability Zones protect against?",
    "The failure of a single data center or AZ within a Region."
   ],
   [
    "Which option runs AWS services inside a customer's own data center?",
    "AWS Outposts."
   ],
   [
    "Which infrastructure does CloudFront use to cache content near viewers?",
    "Edge locations."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a labeled nesting diagram (Region contains AZs contains data centers) and a short glossary card for the six components to keep during the simulation.",
   "Extend: Ask fast finishers to explain which services are global rather than Regional and why IAM being global matters when you switch Regions in the console."
  ]
 },
 {
  "t": "Choosing a Region: compliance and data residency, latency to users, service availability and price",
  "objectives": [
   "Students will be able to list the four factors for choosing a Region: compliance, latency, service availability and price.",
   "Students will be able to explain why compliance and data residency usually override the other factors.",
   "Students will be able to apply the factors in order to recommend a Region for a scenario.",
   "Students will be able to name tools that support the decision, such as the Regional Services list, the Pricing Calculator and SCPs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list the students' factors on the board, then group them into the four AWS factors."
   ],
   [
    12,
    "Teach",
    "Explain each factor with a concrete example, present the mnemonic, and show why compliance acts as a filter while the others rank. Mention cross-Region data transfer costs and SCPs that block Regions."
   ],
   [
    18,
    "Activity",
    "Run the Region consulting challenge in groups with fictional company profiles and a fictional Region fact sheet."
   ],
   [
    5,
    "Discuss",
    "Groups share one recommendation each and the class challenges the reasoning."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your family is choosing a new home. What would you check first, and what would you only consider at the end?",
  "activity": {
   "title": "Region consulting challenge",
   "materials": "Printed fictional company profiles (four or five), a printed fictional Region fact sheet listing made-up Regions with country, relative price level and which services are offered, whiteboard.",
   "steps": [
    "Give each group one company profile, such as a national health service that must keep data in-country, a gaming startup with users on one continent, or a research lab needing a specific service.",
    "Groups use the fictional fact sheet to eliminate Regions factor by factor, writing which factor removed each Region.",
    "Each group writes a one-sentence recommendation and names any control, such as an SCP, it would add.",
    "Groups present, and the teacher highlights any group that let price override compliance."
   ]
  },
  "discussion": [
   "When could service availability become more important than latency?",
   "How can an organization stop staff from accidentally creating resources in a non-approved Region?"
  ],
  "exit": [
   [
    "Name the four Region selection factors.",
    "Compliance and data residency, proximity to users (latency), service availability, and price."
   ],
   [
    "A cheaper Region exists abroad, but law requires data to stay in-country. What do you choose?",
    "A compliant Region in the required country, because compliance overrides price."
   ],
   [
    "Which tool compares estimated costs of a design across Regions?",
    "The AWS Pricing Calculator."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a four-step checklist card in order (compliance, latency, services, price) with a yes or no column for each Region on the fact sheet.",
   "Extend: Ask fast finishers to design a two-Region setup for a global company with a strict residency rule for one country, explaining how Route 53 and SCPs fit in."
  ]
 },
 {
  "t": "Amazon EC2 instance families, AMIs, Elastic Load Balancing and Amazon EC2 Auto Scaling",
  "objectives": [
   "Students will be able to match the five EC2 instance family categories to suitable workloads.",
   "Students will be able to explain what an AMI contains and why custom AMIs support automation.",
   "Students will be able to compare the Application, Network and Gateway Load Balancers.",
   "Students will be able to explain how ELB and EC2 Auto Scaling work together to provide elasticity and high availability."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a busy shop and draw the students' ideas as a simple diagram."
   ],
   [
    15,
    "Teach",
    "Present the five families with the mnemonic, decode one instance type name, explain AMIs and launch templates, then draw users, an ALB, and an Auto Scaling group spanning two AZs. Show how target tracking adds and removes instances."
   ],
   [
    15,
    "Activity",
    "Run the human load balancer role-play, then the workload-to-family matching cards."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the role-play to cost and resilience."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A bakery has two cashiers. On Saturday morning the line is out the door, and on Tuesday afternoon there is nobody. What would you do about staffing, and how would you decide who serves which customer?",
  "activity": {
   "title": "Human load balancer and Auto Scaling role-play",
   "materials": "Sticky notes as customer requests, a timer, printed cards labeled 'instance', one card labeled 'load balancer', one labeled 'Auto Scaling', workload cards for matching.",
   "steps": [
    "Two students act as instances, one as the load balancer and one as Auto Scaling. The rest of the class hands sticky-note requests to the load balancer, which passes each to an instance.",
    "The teacher speeds up the requests. When instances fall behind, Auto Scaling 'launches' a new student instance using the same instructions card (the AMI); later, the teacher slows requests and Auto Scaling removes instances.",
    "The teacher secretly tells one instance to stop responding; the load balancer must notice through a health check and stop sending it work, and Auto Scaling replaces it.",
    "In pairs, students then sort workload cards (in-memory cache, video transcoding, ML training, web server, data warehouse on local disks) into the five families."
   ]
  },
  "discussion": [
   "What would happen in the role-play if all instances were in one AZ and that AZ failed?",
   "Why does scaling in matter as much as scaling out for a business?"
  ],
  "exit": [
   [
    "Which instance family fits machine learning training with GPUs?",
    "Accelerated computing."
   ],
   [
    "Which load balancer supports path-based HTTP routing?",
    "The Application Load Balancer."
   ],
   [
    "What does EC2 Auto Scaling do that ELB does not?",
    "It adds, removes and replaces instances to match demand and health; ELB only distributes traffic."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a picture card for each family with one example workload, and let them use it during the matching cards.",
   "Extend: Ask fast finishers to write a scaling plan for a site with a predictable Monday peak and random spikes, specifying minimum, maximum and the policies they would use."
  ]
 },
 {
  "t": "Containers and serverless compute: Amazon ECS, Amazon EKS, AWS Fargate, AWS Lambda and AWS Elastic Beanstalk",
  "objectives": [
   "Students will be able to explain what a container is and why it needs an orchestrator.",
   "Students will be able to distinguish ECS, EKS and Fargate, including that Fargate is compute capacity for ECS and EKS.",
   "Students will be able to identify workloads suited to AWS Lambda, including its 15-minute limit and pay-per-use model.",
   "Students will be able to choose Elastic Beanstalk for a team that wants to upload code and let AWS manage the environment."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about packing for a trip and link it to containers bundling everything an app needs."
   ],
   [
    15,
    "Teach",
    "Draw a spectrum from EC2 (you manage most) to Lambda (you manage least). Place ECS and EKS with EC2 capacity, ECS and EKS with Fargate, Elastic Beanstalk and Lambda on it. Explain clue words and the 15-minute Lambda limit."
   ],
   [
    15,
    "Activity",
    "Run the 'which team needs what' matching with team persona cards, then a quick challenge round."
   ],
   [
    5,
    "Discuss",
    "Discuss what responsibilities remain with the customer even with serverless services."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When you pack a bag for a weekend away, why do you put everything you need in one bag instead of hoping the hotel has it? How might that idea apply to software?",
  "activity": {
   "title": "Which team needs what",
   "materials": "Printed team persona cards (about 10), whiteboard divided into ECS, EKS, Fargate (with ECS or EKS), Lambda, Elastic Beanstalk and ECR zones, sticky notes.",
   "steps": [
    "Write persona cards such as 'we love Kubernetes', 'we refuse to patch servers but use containers', 'code runs when a file lands in S3', 'two-hour nightly batch job', 'small web app, no infrastructure skills', 'need somewhere to store container images'.",
    "Pairs place each persona in a zone and write a one-line justification on a sticky note.",
    "The teacher calls out two trap cards (the two-hour job and 'store images') and asks pairs to defend their choices.",
    "Finish with a lightning round where the teacher reads a clue word and students hold up the service name."
   ]
  },
  "discussion": [
   "If AWS manages the servers for Lambda and Fargate, what security responsibilities still belong to you?",
   "Why might a company choose ECS over EKS even if Kubernetes is popular?"
  ],
  "exit": [
   [
    "Which service runs Kubernetes with an AWS-managed control plane?",
    "Amazon EKS."
   ],
   [
    "What is the maximum run time of a single Lambda invocation?",
    "15 minutes."
   ],
   [
    "Which service lets you upload application code and automatically provisions load balancing and scaling?",
    "AWS Elastic Beanstalk."
   ]
  ],
  "differentiation": [
   "Support: Provide a responsibility spectrum handout showing who manages servers for each service, and let struggling students use it during matching.",
   "Extend: Ask fast finishers to whiteboard an event-driven design that uses S3, Lambda, SQS and ECS on Fargate together, explaining why each piece is chosen."
  ]
 },
 {
  "t": "Databases: Amazon RDS and Aurora, Amazon DynamoDB, Amazon ElastiCache, Amazon Redshift and other purpose-built databases",
  "objectives": [
   "Students will be able to distinguish relational, NoSQL, in-memory cache and data warehouse databases on AWS.",
   "Students will be able to compare RDS Multi-AZ deployments with read replicas.",
   "Students will be able to match a workload description to RDS, Aurora, DynamoDB, ElastiCache, Redshift, Neptune, DocumentDB or Timestream.",
   "Students will be able to explain what AWS manages and what the customer still owns for managed databases."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch the students' storage ideas on the board."
   ],
   [
    15,
    "Teach",
    "Introduce purpose-built databases with a four-quadrant board: relational, key-value, cache, warehouse, plus a niche corner for graph, document and time series. Draw Multi-AZ versus read replicas side by side and stress OLTP versus OLAP."
   ],
   [
    15,
    "Activity",
    "Run the database matchmaker card game in small groups."
   ],
   [
    5,
    "Discuss",
    "Discuss shared responsibility for managed databases versus a database on EC2."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of how you store things at home: a filing cabinet, a junk drawer, a fridge, a photo album. Why not put everything in one place?",
  "activity": {
   "title": "Database matchmaker",
   "materials": "Printed workload cards (about 12) and service cards (RDS, Aurora, DynamoDB, ElastiCache, Redshift, Neptune, DocumentDB, Timestream), whiteboard for scoring.",
   "steps": [
    "Write workload cards such as 'shopping carts at massive scale', 'bank transfers needing transactions', 'weekly sales trend reports over five years', 'sensor readings every second', 'speed up repeated product page queries', 'fraud ring detection through relationships', 'app built on MongoDB'.",
    "Groups match each workload to a service and note the clue word that decided it.",
    "Add two bonus cards: 'survive an AZ failure for RDS' and 'offload reporting reads from RDS'. Groups must choose Multi-AZ or read replica.",
    "Groups score a point for each correct match and explain one tricky match to the class."
   ]
  },
  "discussion": [
   "What do you gain and lose by running a database yourself on EC2 instead of using RDS?",
   "Why might a single application use three or four different databases?"
  ],
  "exit": [
   [
    "Which RDS feature provides automatic failover to another AZ?",
    "Multi-AZ deployment."
   ],
   [
    "Which service is a data warehouse for analytics?",
    "Amazon Redshift."
   ],
   [
    "Which service is a serverless NoSQL key-value database?",
    "Amazon DynamoDB."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a keyword cheat card (SQL or transactions, key-value, cache, warehouse, graph, time series) linked to each service for the matchmaker game.",
   "Extend: Ask fast finishers to design the data layer for a food delivery app using at least three AWS databases, justifying each choice and noting which use Multi-AZ."
  ]
 },
 {
  "t": "Networking: Amazon VPC, subnets, internet and NAT gateways, Route 53, CloudFront, Site-to-Site VPN and Direct Connect",
  "objectives": [
   "Students will be able to explain how route tables make a subnet public or private.",
   "Students will be able to compare internet gateways and NAT gateways, and security groups and network ACLs.",
   "Students will be able to describe the roles of Route 53 and CloudFront.",
   "Students will be able to choose between Site-to-Site VPN and Direct Connect for a hybrid connectivity scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and relate a building's doors and mail room to network paths."
   ],
   [
    15,
    "Teach",
    "Draw a VPC with two AZs, a public and private subnet in each, an internet gateway, a NAT gateway and route tables. Trace a patch download and a blocked inbound request. Add Route 53, CloudFront, VPN and Direct Connect around the diagram."
   ],
   [
    15,
    "Activity",
    "Run the packet path tracing exercise in pairs using printed route tables."
   ],
   [
    5,
    "Discuss",
    "Discuss the discussion questions on encryption and the VPN versus Direct Connect choice."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "In a big office building, how do mail and visitors get in and out? Which rooms should visitors never be able to walk into directly?",
  "activity": {
   "title": "Trace the packet",
   "materials": "Projector or whiteboard with a VPC diagram, printed route tables for a public and a private subnet, printed traffic scenario cards, markers.",
   "steps": [
    "Give each pair the diagram and route tables: the public table has `0.0.0.0/0 -> igw`, the private table has `0.0.0.0/0 -> nat`.",
    "Pairs trace each scenario card with a marker: 'web user reaches load balancer', 'database server downloads a patch', 'attacker tries to connect to the database from the internet', 'office user reaches the VPC over VPN'.",
    "For each scenario, pairs write whether it succeeds and which component allowed or blocked it.",
    "The teacher then removes the NAT route on the board and asks pairs to predict what breaks, and finally asks which service would answer the DNS lookup for the store's domain."
   ]
  },
  "discussion": [
   "Why is it a good idea to keep databases in private subnets even if a security group already restricts access?",
   "When would a company keep a Site-to-Site VPN even after installing Direct Connect?"
  ],
  "exit": [
   [
    "Where must a NAT gateway be placed?",
    "In a public subnet."
   ],
   [
    "Which connection option is a dedicated private line that does not traverse the internet?",
    "AWS Direct Connect."
   ],
   [
    "Which service caches content at edge locations to reduce latency?",
    "Amazon CloudFront."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pre-labeled VPC diagram and a two-column table (component, what it allows) to fill in before tracing packets.",
   "Extend: Ask fast finishers to design a VPC CIDR plan with four subnets across two AZs and explain which route table each subnet uses."
  ]
 },
 {
  "t": "Storage: Amazon S3 and its storage classes, Amazon EBS, instance store, Amazon EFS, Amazon FSx, AWS Storage Gateway and AWS Backup",
  "objectives": [
   "Students will be able to distinguish object, block and file storage and name the AWS service for each.",
   "Students will be able to choose an S3 storage class based on access frequency and retrieval time.",
   "Students will be able to compare EBS and instance store persistence and EFS and FSx use cases.",
   "Students will be able to identify when to use Storage Gateway and AWS Backup."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about where students keep different kinds of belongings and how quickly they can get them."
   ],
   [
    15,
    "Teach",
    "Draw three columns for object, block and file. Place S3, EBS and instance store, and EFS and FSx. Draw an S3 class ladder from Standard down to Deep Archive with arrows for lifecycle rules. Finish with Storage Gateway and AWS Backup."
   ],
   [
    15,
    "Activity",
    "Run the storage ladder sort and the 'what survives a stop' quick check in groups."
   ],
   [
    5,
    "Discuss",
    "Discuss the trade-off between storage price and retrieval time and the risk of instance store."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Where do you keep things you use every day, things you use once a year, and things you are keeping only just in case? How long would it take to get each one?",
  "activity": {
   "title": "Storage ladder sort",
   "materials": "Printed data cards (about 12), a large ladder drawn on the whiteboard with rungs for each S3 class, and three side boxes for EBS, EFS or FSx, and instance store.",
   "steps": [
    "Write data cards such as 'website images viewed constantly', 'tax records kept seven years, never read', 'old medical scans needed within milliseconds occasionally', 'logs with unknown access patterns', 'database boot disk', 'scratch files for a render job', 'shared Linux project folder', 'Windows team share with company logins'.",
    "Groups place each card on the correct ladder rung or side box and write the deciding clue.",
    "The teacher announces 'every instance has just stopped' and asks groups which cards lost data.",
    "Groups finish by naming which service would replace a tape library and which would centrally schedule backups."
   ]
  },
  "discussion": [
   "Why would anyone choose S3 One Zone-IA if it does not survive an AZ failure?",
   "How would you explain to a manager why instance store is not a place for important data?"
  ],
  "exit": [
   [
    "Which service provides a shared NFS file system for many Linux instances?",
    "Amazon EFS."
   ],
   [
    "Which S3 class is the lowest-cost option with retrieval in hours?",
    "S3 Glacier Deep Archive."
   ],
   [
    "Does data on an EBS volume survive an instance stop?",
    "Yes. EBS volumes persist independently of the instance; instance store data does not."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-picture card (warehouse for object, hard drive for block, shared folder for file) and a simplified S3 class list with 'how fast can I get it back' for each.",
   "Extend: Ask fast finishers to write a lifecycle policy in plain language for a video company, with transitions and an expiration, and justify each class."
  ]
 },
 {
  "t": "AI and machine learning services: Amazon SageMaker AI, Amazon Bedrock, Amazon Q, and task-specific AI services such as Rekognition, Textract, Comprehend, Transcribe, Polly and Lex",
  "objectives": [
   "Students will be able to describe the three levels of AWS AI and ML services: custom models, foundation models and task-specific services.",
   "Students will be able to match use cases to Rekognition, Textract, Comprehend, Transcribe, Polly and Lex.",
   "Students will be able to distinguish SageMaker AI, Amazon Bedrock and Amazon Q.",
   "Students will be able to explain that customers remain responsible for data and for checking AI output."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list everyday AI the students have used."
   ],
   [
    12,
    "Teach",
    "Draw a three-layer pyramid: task-specific services at the top, Bedrock and Amazon Q in the middle, SageMaker AI at the base. Give one use case per service and stress the Transcribe and Polly, Textract and Comprehend pairs."
   ],
   [
    18,
    "Activity",
    "Run the AI pipeline design activity in groups, then a quick gallery walk of the designs."
   ],
   [
    5,
    "Discuss",
    "Discuss responsibility for accuracy and bias, and when to build versus buy."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Name three times this week a computer understood your voice, recognized an image or wrote something for you. Which of those felt like magic, and which felt like a tool?",
  "activity": {
   "title": "Design an AI pipeline",
   "materials": "Printed service cards (SageMaker AI, Bedrock, Amazon Q, Rekognition, Textract, Comprehend, Transcribe, Polly, Lex, Translate), large paper or whiteboard sections, markers, printed scenario sheets.",
   "steps": [
    "Give each group a fictional scenario, such as a hospital intake line, a school accessibility project, an insurance claims flow or a retailer's customer feedback system.",
    "Groups lay service cards in order on their paper to build a pipeline, drawing arrows that show what data flows into and out of each service.",
    "Each group must justify any use of SageMaker AI by explaining why no ready-made service fits.",
    "Groups post their designs and do a two-minute gallery walk, leaving a sticky note on another group's design that names one swap or improvement."
   ]
  },
  "discussion": [
   "If an AI service gives a wrong answer that harms a customer, who is responsible and why?",
   "When might a company choose to build a custom model even though a ready-made service exists?"
  ],
  "exit": [
   [
    "Which service converts text into lifelike speech?",
    "Amazon Polly."
   ],
   [
    "Which service gives API access to foundation models for building generative AI applications?",
    "Amazon Bedrock."
   ],
   [
    "A team needs a model trained on its own unique historical data. Which service?",
    "Amazon SageMaker AI."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pairs card that highlights the two common swaps (Transcribe speech to text versus Polly text to speech; Textract extracts versus Comprehend understands) to keep during the activity.",
   "Extend: Ask fast finishers to explain how retrieval augmented generation and guardrails in Bedrock would improve a staff assistant, and when Amazon Q Business would be simpler."
  ]
 },
 {
  "t": "Analytics services: Amazon Athena, AWS Glue, Amazon Kinesis, Amazon EMR and Amazon OpenSearch Service",
  "objectives": [
   "Students will be able to describe the primary job of Athena, Glue, Kinesis, EMR and OpenSearch Service.",
   "Students will be able to distinguish Athena from Redshift and Glue from Athena using exam cue words.",
   "Students will be able to select the correct analytics service for a short business scenario.",
   "Students will be able to explain why columnar formats and partitioning lower Athena cost."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up prompt. Take three answers and list the 'jobs' students name (store, clean, query, stream, search) on the board without naming services yet."
   ],
   [
    13,
    "Teach",
    "Walk through the four jobs: query in place (Athena), catalog and transform (Glue), stream (Kinesis and Firehose), big batch (EMR), search and dashboards (OpenSearch, QuickSight). Write one cue phrase under each. Stress Athena versus Redshift and that Glue does not query."
   ],
   [
    15,
    "Activity",
    "Run the 'Pipeline Builder' card activity in groups of three, then have two groups present their pipelines."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions to surface trade-offs, such as when EMR is overkill and why Parquet saves money."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them on the door."
   ]
  ],
  "warmup": "A company has a mountain of website click logs. List every separate thing someone might want to do with that data, from the moment a click happens to the moment an executive sees a chart.",
  "activity": {
   "title": "Pipeline Builder",
   "materials": "Printed service cards (Athena, Glue, Kinesis Data Streams, Data Firehose, EMR, OpenSearch Service, QuickSight, Redshift, S3), printed scenario cards, whiteboard or large paper, markers.",
   "steps": [
    "Give each group a full set of service cards and one scenario card, such as 'a ride-share app needs live surge pricing and monthly driver reports'.",
    "Groups lay the service cards left to right to build a pipeline from data arriving to insight delivered, drawing arrows on paper and labeling each step with the job it does.",
    "Each group must include at least one card they rejected and write one sentence on why it was the wrong fit.",
    "Two groups present; the class checks each choice against the cue words on the board and the teacher corrects any Athena versus Redshift or Glue versus Athena confusion."
   ]
  },
  "discussion": [
   "When would a team choose EMR over Athena even though Athena is simpler?",
   "Why does AWS charge Athena users by data scanned, and how does that change how teams store their data?",
   "What risks come from treating OpenSearch Service like a data warehouse?"
  ],
  "exit": [
   [
    "Which service runs SQL directly on files in S3 with no servers to manage?",
    "Amazon Athena."
   ],
   [
    "What does a Glue crawler produce?",
    "Table definitions (schemas) in the AWS Glue Data Catalog that other services can use."
   ],
   [
    "A company needs to load streaming data into S3 with no custom code. Which service?",
    "Amazon Data Firehose."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page cue-word sheet pairing each service with two trigger phrases, and let them use it during the card activity.",
   "Extend: Ask fast finishers to redesign their pipeline to cut cost by half and justify each change, for example Parquet conversion or replacing EMR with Athena."
  ]
 },
 {
  "t": "Application integration, monitoring and other services: Amazon SQS, Amazon SNS, Amazon EventBridge, Amazon CloudWatch, AWS Systems Manager and AWS IoT Core",
  "objectives": [
   "Students will be able to explain tight coupling and how SQS and SNS reduce it.",
   "Students will be able to compare SQS (pull, one consumer) with SNS (push, many subscribers) and describe fan-out.",
   "Students will be able to match EventBridge, CloudWatch, Systems Manager and IoT Core to their exam cue words.",
   "Students will be able to distinguish CloudWatch from CloudTrail."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up prompt about the sandwich shop and collect ideas on how the cashier avoids waiting on the kitchen."
   ],
   [
    12,
    "Teach",
    "Draw a web tier calling a print service directly, then insert an SQS queue. Next draw one SNS topic fanning out to three queues. Finish with a quick tour of EventBridge rules, CloudWatch alarms, Systems Manager Session Manager and Patch Manager, and IoT Core, writing a cue phrase for each."
   ],
   [
    15,
    "Activity",
    "Run the 'Human Message Bus' role-play described below."
   ],
   [
    8,
    "Discuss",
    "Debrief the role-play with the discussion questions, linking what students felt to the exam distinctions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in at the door."
   ]
  ],
  "warmup": "A sandwich shop cashier takes orders much faster than the kitchen can make sandwiches. How can the shop keep the line moving without losing any orders?",
  "activity": {
   "title": "Human Message Bus",
   "materials": "Sticky notes, markers, three chairs labeled Payment, Warehouse and Email, a shoebox or tray labeled Queue, and a whiteboard.",
   "steps": [
    "Round one (tight coupling): one student is the Website and hands order sticky notes directly to a slow Printer student, who processes one every ten seconds. The Website must wait for each one; the class times how long ten orders take.",
    "Round two (SQS): place the Queue tray between them. The Website drops notes and returns immediately; the Printer takes notes when ready. Note that orders pile up but none are lost.",
    "Round three (SNS fan-out): a student acts as the SNS topic and copies each order onto three notes, dropping one into each of three trays for Payment, Warehouse and Email. Make the Warehouse student step out for a minute and observe that its tray simply grows.",
    "Finish by asking a student to play CloudWatch, raising a hand (an alarm) when any tray holds more than five notes, and connect this to CloudWatch alarms on queue depth."
   ]
  },
  "discussion": [
   "In round three, what would have happened if the Warehouse student had been called directly instead of through a tray?",
   "When might the occasional duplicate delivery of a standard SQS queue cause a real problem, and how would a FIFO queue help?",
   "Why might a security team prefer Session Manager over SSH even inside a private network?"
  ],
  "exit": [
   [
    "Which service pushes one message to many subscribers at once?",
    "Amazon SNS."
   ],
   [
    "Which service records API calls for auditing, as opposed to CloudWatch's metrics and alarms?",
    "AWS CloudTrail."
   ],
   [
    "Which service routes events to targets based on rules that match event content?",
    "Amazon EventBridge."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column chart, Pull versus Push, with SQS and SNS characteristics already filled in, and let students add EventBridge and CloudWatch with a partner.",
   "Extend: Have fast finishers whiteboard an order system that uses SNS fan-out, a dead-letter queue, a CloudWatch alarm on queue depth and an EventBridge rule, and explain what happens when one consumer fails."
  ]
 },
 {
  "t": "EC2 purchase options: On-Demand, Reserved Instances, Savings Plans, Spot Instances, Dedicated Hosts and Dedicated Instances",
  "objectives": [
   "Students will be able to describe On-Demand, Reserved Instances, Savings Plans, Spot, Dedicated Hosts and Dedicated Instances.",
   "Students will be able to compare Compute Savings Plans with Reserved Instances in terms of flexibility and discount.",
   "Students will be able to select the most cost-effective purchase option for a described workload.",
   "Students will be able to explain why rightsizing should come before a commitment purchase."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the car rental warm-up question and list the ways students name to 'pay for a car' on the board."
   ],
   [
    12,
    "Teach",
    "Map each car option to an EC2 purchase option. Build a table on the board with columns: commitment, interruption risk, flexibility, best for. Highlight the Dedicated Host versus Dedicated Instance distinction and the two-minute Spot warning."
   ],
   [
    15,
    "Activity",
    "Run the 'Workload Auction' card sort described below."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to explore blended strategies and the risk of over-committing."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions individually on a half sheet."
   ]
  ],
  "warmup": "List every way you could pay to use a car for a while, from a one-day rental to owning it. What do you give up in exchange for a lower price?",
  "activity": {
   "title": "Workload Auction",
   "materials": "Printed workload cards (about 12, for example 'CI build runners', 'payroll database running for five years', 'one-week marketing site', 'legacy software licensed per physical core', 'web tier baseline plus holiday spikes'), printed option cards for each purchase option, tape, whiteboard.",
   "steps": [
    "Split the class into pairs and give each pair three workload cards and a full set of option cards.",
    "Pairs choose the cheapest option that still meets each workload's needs and write one sentence of justification naming the deciding clue, such as 'can be interrupted'.",
    "Pairs tape their workload cards under the matching option column on the board; the class reviews each column and challenges any misplaced card.",
    "For the 'baseline plus spikes' card, guide the class to a blended answer: Savings Plan or RIs for the baseline and On-Demand for the spikes."
   ]
  },
  "discussion": [
   "Why might a company choose On-Demand for a workload even though it could save money with a three-year commitment?",
   "What design choices make a workload a good fit for Spot Instances?",
   "Why does AWS generally steer customers toward Savings Plans rather than Reserved Instances today?"
  ],
  "exit": [
   [
    "A fault-tolerant batch job needs the lowest price. Which option?",
    "Spot Instances."
   ],
   [
    "Which Savings Plan applies across EC2 families and Regions and also to Fargate and Lambda?",
    "A Compute Savings Plan."
   ],
   [
    "Which option supports bring-your-own-license software licensed per physical core?",
    "Dedicated Hosts."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a decision flowchart (Can it be interrupted? Is it steady for a year or more? Does it need per-core licensing?) to use during the card sort.",
   "Extend: Ask fast finishers to design a purchase mix for a company with a steady baseline, seasonal spikes, nightly batch processing and one licensed database, and explain the order in which they would rightsize and commit."
  ]
 },
 {
  "t": "Data transfer and storage pricing: inbound vs outbound traffic, cross-Region traffic and S3 storage class costs",
  "objectives": [
   "Students will be able to state which data transfer directions are generally free and which are charged.",
   "Students will be able to explain the trade-off between S3 storage price and retrieval cost across storage classes.",
   "Students will be able to identify common hidden costs such as NAT gateway processing, cross-AZ traffic and unattached EBS volumes.",
   "Students will be able to recommend a cost reduction such as CloudFront, a gateway endpoint or a lifecycle rule for a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the shipping company and gather guesses about what costs money."
   ],
   [
    12,
    "Teach",
    "Draw a map with the internet, two Regions and two AZs. Mark arrows with 'free' or 'charged'. Add a NAT gateway and a gateway endpoint. Then draw a staircase of S3 classes showing storage price going down and retrieval cost going up. Close with EBS provisioned billing."
   ],
   [
    15,
    "Activity",
    "Run the 'Bill Detective' activity described below."
   ],
   [
    8,
    "Discuss",
    "Groups share their biggest saving and the class debates the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "A shipping company does not charge you to drop off packages at its warehouse, but charges you to ship them out. Why might a cloud provider price data the same way?",
  "activity": {
   "title": "Bill Detective",
   "materials": "A printed one-page mock monthly bill for a fictional company (made by the teacher) with line items for EC2, data transfer out, inter-AZ transfer, inter-Region transfer, NAT gateway processing, S3 Standard-IA retrievals and unattached EBS volumes, plus a short architecture description; highlighters.",
   "steps": [
    "In groups of three, students highlight every line item that looks avoidable or oversized.",
    "For each highlighted line, the group writes the cause in plain words and one specific fix, such as 'add CloudFront', 'use an S3 gateway endpoint', 'move frequently read data back to Standard' or 'delete unattached volumes'.",
    "Groups rank their fixes by likely impact and note any fix that would reduce resilience, such as removing multi-AZ.",
    "Each group shares its top fix; the teacher records them on the board and confirms which are correct and why."
   ]
  },
  "discussion": [
   "Is it worth paying cross-AZ transfer charges for a multi-AZ design? How would you explain that to a finance manager?",
   "Why do you think AWS makes inbound data transfer free?",
   "How would you decide between Standard-IA and Intelligent-Tiering for a dataset?"
  ],
  "exit": [
   [
    "Which direction of data transfer is generally free: into AWS from the internet, or out of AWS to the internet?",
    "Into AWS from the internet (ingress) is generally free."
   ],
   [
    "Why can moving frequently read data to Glacier increase costs?",
    "Glacier classes charge retrieval fees and have minimum storage durations, which frequent access quickly outweighs."
   ],
   [
    "What lets private instances reach S3 without NAT gateway processing charges?",
    "A VPC gateway endpoint for S3."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card with the 'in free, out fee' rule and the S3 class staircase so students can annotate the mock bill against it.",
   "Extend: Ask fast finishers to estimate, in relative terms, which fix saves most for a site whose traffic doubles, and to explain how tiered egress pricing affects their answer."
  ]
 },
 {
  "t": "AWS Free Tier offers and how to avoid unexpected charges",
  "objectives": [
   "Students will be able to explain that the Free Tier is an allowance, not an automatic spending cap.",
   "Students will be able to distinguish Always Free offers from short-term trials and time-limited new-account offers.",
   "Students will be able to configure, in words, a zero-spend budget and Free Tier usage alerts.",
   "Students will be able to list common resources that cause charges after a lab and how to clean them up."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the free sample warm-up question and take a quick show of hands on whether AWS stops resources at the free limit."
   ],
   [
    12,
    "Teach",
    "Explain allowance versus cap, the types of Free Tier offers (noting AWS changed new-account offers in 2025, so check the current page), common surprise charges, and the safety habits: budgets, Free Tier alerts, MFA, tagging, CloudFormation clean-up, checking every Region."
   ],
   [
    15,
    "Activity",
    "Run the 'Lab Leftovers' scavenger hunt described below."
   ],
   [
    8,
    "Discuss",
    "Discuss the questions, focusing on why habits beat memory for avoiding surprise bills."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on paper."
   ]
  ],
  "warmup": "A grocery store offers free samples. What happens if you take a full bag of the sample item to the register? How might a cloud provider's free offer work the same way?",
  "activity": {
   "title": "Lab Leftovers",
   "materials": "Printed 'console snapshot' cards made by the teacher showing a fictional account's resources across two Regions (running and stopped instances, unattached EBS volumes, snapshots, an Elastic IP, a NAT gateway, a load balancer, an S3 bucket), sticky notes in two colors.",
   "steps": [
    "Pairs receive the snapshot cards and are told the lab ended a week ago and the learner believes everything was free.",
    "Pairs place a red sticky note on every resource that is still costing money and a green one on anything that is likely free, writing a one-line reason on each.",
    "Pairs write a three-step clean-up plan, including checking the second Region and deleting the CloudFormation stack, plus a prevention plan with a zero-spend budget and Free Tier alerts.",
    "The class compares answers; the teacher reveals the full list, emphasizing stopped instances with EBS charges and the NAT gateway."
   ]
  },
  "discussion": [
   "Why might a 'Free Tier eligible' label in a tutorial give learners false confidence?",
   "How do account security and cost control connect?",
   "What habits would you build into every lab so you never rely on memory to clean up?"
  ],
  "exit": [
   [
    "On a standard paid account, what happens to usage beyond a Free Tier limit?",
    "It is billed at normal rates; resources are not stopped."
   ],
   [
    "Which AWS Budgets template alerts you as soon as any money is spent?",
    "The zero-spend budget."
   ],
   [
    "Name one resource that keeps charging after you stop an EC2 instance.",
    "Its EBS volumes (or snapshots, or an associated Elastic IP address)."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a checklist titled 'Before, During, After a lab' with blanks to fill in from the lesson, and pair them with a confident partner for the activity.",
   "Extend: Ask fast finishers to write a one-page sandbox account policy for a study group, covering MFA, budgets, tagging, Region restrictions and who deletes what."
  ]
 },
 {
  "t": "Estimating and tracking cost: AWS Pricing Calculator, AWS Cost Explorer and AWS Budgets",
  "objectives": [
   "Students will be able to distinguish the Pricing Calculator, Cost Explorer and AWS Budgets by when in the cost life cycle each is used.",
   "Students will be able to describe what Cost Explorer can group and filter by, and why cost allocation tags must be activated.",
   "Students will be able to explain budget alerts versus budget actions.",
   "Students will be able to select the correct cost tool, including Cost Anomaly Detection, for a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the three money moments and write 'Before', 'After' and 'While' across the board."
   ],
   [
    12,
    "Teach",
    "Place each tool under its column: Pricing Calculator (Before), Cost Explorer (After, with forecast), Budgets and Anomaly Detection (While). Show an example investigation path in Cost Explorer: group by service, then filter and group by usage type. Explain alerts versus actions."
   ],
   [
    15,
    "Activity",
    "Run the 'Which Tool Relay' described below, optionally letting students open the public Pricing Calculator in a browser."
   ],
   [
    8,
    "Discuss",
    "Lead the discussion questions and connect them back to the timeline columns."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card or sticky note."
   ]
  ],
  "warmup": "Think about money in your own life. What tool or habit do you use before you buy something big, after you have spent money, and while you are spending to avoid going over?",
  "activity": {
   "title": "Which Tool Relay",
   "materials": "Printed scenario strips (about 15, each a one-sentence cost question), three labeled boxes or wall areas for Pricing Calculator, Cost Explorer and Budgets, plus a fourth for Cost Anomaly Detection; optional student laptops with a browser.",
   "steps": [
    "Split the class into two teams lined up at the back of the room; place the scenario strips face down at the front.",
    "One student per team at a time flips a strip, reads it aloud, and places it in the correct tool area, explaining the timeline clue in one sentence.",
    "The opposing team may challenge; the teacher rules and awards a point for each correct placement and each correct challenge.",
    "If laptops are available, finish with five minutes in the public Pricing Calculator: each pair estimates one small EC2 instance in two Regions and notes the difference."
   ]
  },
  "discussion": [
   "Why is a Pricing Calculator estimate often wrong after launch, and what should a team do about it?",
   "Should a startup turn on budget actions that stop instances automatically? What could go wrong?",
   "How would you give a finance analyst access to cost data without letting them change infrastructure?"
  ],
  "exit": [
   [
    "Which tool estimates the cost of an architecture before it is deployed?",
    "The AWS Pricing Calculator."
   ],
   [
    "Which tool would you use to find which service drove last month's increase?",
    "AWS Cost Explorer."
   ],
   [
    "By default, what does AWS Budgets do when a threshold is crossed, and what must you configure for it to do more?",
    "It sends alerts; budget actions must be configured to apply policies or stop instances."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-column organizer (Before, After, While) with one example already filled in for each, which students can use during the relay.",
   "Extend: Ask fast finishers to write a cost governance plan for a new project that uses all four tools, including the alert thresholds and who receives them."
  ]
 },
 {
  "t": "Detailed billing data: the Billing and Cost Management console, Cost and Usage Reports and data exports, and cost allocation tags",
  "objectives": [
   "Students will be able to identify the tasks performed in the Billing and Cost Management console.",
   "Students will be able to explain when to use Cost and Usage Reports or Data Exports instead of Cost Explorer.",
   "Students will be able to describe the activation step that turns a tag into a cost allocation tag.",
   "Students will be able to design a simple tagging strategy that supports showback or chargeback."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the shared credit card warm-up question and collect ideas on how a family could split one statement fairly."
   ],
   [
    12,
    "Teach",
    "Tour the three layers: the console (bills, invoices, payment), Cost Explorer (summaries), and CUR or Data Exports to S3 (line items queried with Athena). Then explain tags, the activation step, case sensitivity and tag policies, ending with showback versus chargeback."
   ],
   [
    15,
    "Activity",
    "Run the 'Split the Bill' line-item exercise described below."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to explore shared costs and enforcement."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Four roommates share one credit card for groceries and utilities. When the statement arrives, how could they figure out who owes what? What would make it easy or hard?",
  "activity": {
   "title": "Split the Bill",
   "materials": "A printed mock line-item report (about 20 rows made by the teacher) with columns for account, service, usage type, cost and tag values, where some rows use `Project`, some `project`, and some have no tag; calculators or student laptops with a spreadsheet; highlighters.",
   "steps": [
    "In pairs, students total the cost per project using the tag column, writing down each problem they hit (missing tags, inconsistent spelling).",
    "Pairs propose rules for the untagged and shared rows, such as splitting a shared NAT gateway by usage share.",
    "Pairs write a three-rule tagging standard (required keys, exact spelling, allowed values) and name the AWS feature that enforces it.",
    "The teacher reveals that one tag key was never activated, so it would not have appeared at all, and the class discusses what changes once it is activated."
   ]
  },
  "discussion": [
   "How should an organization split costs that no single team owns, such as shared networking?",
   "Is showback or chargeback a better first step for a company new to cloud cost management? Why?",
   "What could go wrong if tagging is optional?"
  ],
  "exit": [
   [
    "Which source gives the most granular, resource-level billing data?",
    "The Cost and Usage Report, delivered through Data Exports to Amazon S3."
   ],
   [
    "A tag is applied to resources but missing from cost reports. What is the most likely reason?",
    "It has not been activated as a cost allocation tag in the billing console."
   ],
   [
    "Which AWS Organizations feature standardizes tag keys and values across accounts?",
    "Tag policies."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially completed project-total table and a glossary card for tags, CUR, Data Exports and cost allocation tags.",
   "Extend: Ask fast finishers to sketch how they would query the CUR data with Athena to produce a monthly per-team report, described in plain steps, and how Cost Categories could simplify it."
  ]
 },
 {
  "t": "AWS Organizations: consolidated billing, combined volume discounts and shared Reserved Instance and Savings Plans discounts",
  "objectives": [
   "Students will be able to describe the structure of AWS Organizations: management account, member accounts, OUs and root.",
   "Students will be able to explain the two ways consolidated billing saves money: combined volume tiers and shared RI and Savings Plans discounts.",
   "Students will be able to explain why SCPs limit but never grant permissions.",
   "Students will be able to choose between Organizations features and AWS Control Tower for a governance scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the family phone plan warm-up question and list the benefits students name."
   ],
   [
    12,
    "Teach",
    "Draw the organization tree: root, OUs, accounts, management account. Explain consolidated billing and its two savings with a simple tiered-pricing staircase. Then explain SCPs as a ceiling, using an overlapping circles diagram for IAM allow and SCP allow."
   ],
   [
    15,
    "Activity",
    "Run the 'Build the Org' whiteboard design described below."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to examine trade-offs of sharing and central control."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Why might a family switch from separate phone plans to one family plan? What do they gain, and what does the person paying the bill now control?",
  "activity": {
   "title": "Build the Org",
   "materials": "Whiteboard or large paper, sticky notes in three colors (accounts, OUs, policies), printed company profile cards for a fictional company with ten accounts and three business needs.",
   "steps": [
    "In groups of four, students read the company profile, which lists accounts, which ones bought Savings Plans, and rules such as 'sandbox must only use one Region'.",
    "Groups arrange account sticky notes under OU sticky notes on the board, with the management account at the top and no workloads in it.",
    "Groups attach policy sticky notes (SCPs, tag policies) to the right level and write the effect of each in one sentence, checking that no SCP is expected to grant anything.",
    "Groups annotate where shared discounts and combined volume tiers will save money, then present in two minutes each."
   ]
  },
  "discussion": [
   "When might a business unit want to turn off discount sharing, and is that fair to the rest of the organization?",
   "Why is it risky to run workloads in the management account?",
   "What are the advantages of Control Tower over setting up Organizations by hand?"
  ],
  "exit": [
   [
    "Name the two ways consolidated billing can reduce costs.",
    "Combined usage reaches volume pricing tiers sooner, and RI and Savings Plans discounts are shared across accounts."
   ],
   [
    "Can an SCP grant a user permission to launch EC2 instances?",
    "No. SCPs only set maximum permissions; an IAM policy must grant the action."
   ],
   [
    "Which account pays the consolidated bill?",
    "The management account."
   ]
  ],
  "differentiation": [
   "Support: Provide a pre-drawn organization tree template with blank boxes and a word bank (root, OU, management account, member account, SCP) for students to fill in.",
   "Extend: Ask fast finishers to write, in plain English, three SCP statements for a regulated company and explain how each interacts with IAM permissions in member accounts."
  ]
 },
 {
  "t": "Cost optimization tools: AWS Trusted Advisor, AWS Compute Optimizer and rightsizing recommendations",
  "objectives": [
   "Students will be able to list the Trusted Advisor check categories and explain which Support plans unlock the full set.",
   "Students will be able to describe what Compute Optimizer analyzes and the recommendations it produces.",
   "Students will be able to explain rightsizing and why it should precede commitment purchases.",
   "Students will be able to choose between Trusted Advisor, Compute Optimizer, Cost Explorer rightsizing and Cost Optimization Hub for a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the moving truck warm-up question and gather examples of paying for more than you need."
   ],
   [
    12,
    "Teach",
    "Present Trusted Advisor (six categories, green/yellow/red, full checks with Business Support or higher), Compute Optimizer (ML, over/under-provisioned, performance risk), Cost Explorer rightsizing and Cost Optimization Hub. Write the action order on the board: delete idle, rightsize, commit, schedule."
   ],
   [
    15,
    "Activity",
    "Run the 'Utilization Clinic' graph-reading activity described below."
   ],
   [
    8,
    "Discuss",
    "Discuss the questions, emphasizing that tools suggest and people decide."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Have you ever paid for something much bigger than you needed, like a large phone data plan you never used? How would you notice, and what would you change first?",
  "activity": {
   "title": "Utilization Clinic",
   "materials": "Printed 'patient charts' made by the teacher, each showing a fictional server's weekly CPU and memory graph and its instance size; a printed mock Trusted Advisor summary with green, yellow and red checks; markers.",
   "steps": [
    "In pairs, students read four server charts and label each as over-provisioned, under-provisioned or optimized, with one sentence of evidence.",
    "Pairs read the mock Trusted Advisor summary and list which findings are cost, security or quota issues, and what a yellow versus red status means.",
    "Pairs put their proposed actions in order (delete idle, rightsize, commit, schedule) and note any risk, such as a seasonal peak the graphs do not show.",
    "Two pairs present; the teacher confirms which tool would have produced each finding."
   ]
  },
  "discussion": [
   "Why might a team ignore a Compute Optimizer recommendation even when it shows large savings?",
   "What are the risks of committing to a three-year Savings Plan before rightsizing?",
   "How would you build a monthly cost review habit for a small team?"
  ],
  "exit": [
   [
    "Which service gives broad best-practice checks across cost, security, performance, fault tolerance, quotas and operational excellence?",
    "AWS Trusted Advisor."
   ],
   [
    "Which service uses ML on utilization history to recommend instance sizes?",
    "AWS Compute Optimizer."
   ],
   [
    "What is the minimum Support plan for the full set of Trusted Advisor checks?",
    "Business Support."
   ]
  ],
  "differentiation": [
   "Support: Provide a reading guide for the server charts with labeled thresholds (for example, 'consistently low' and 'often near maximum') and a tool-matching card.",
   "Extend: Ask fast finishers to estimate the relative saving from rightsizing then committing versus committing alone, and explain the difference to a manager in three sentences."
  ]
 },
 {
  "t": "AWS Support plans and what each includes, including Technical Account Managers and AWS Health",
  "objectives": [
   "Students will be able to list the Support plans in order and state what each adds.",
   "Students will be able to identify the minimum plan that meets a requirement such as 24/7 phone support or a designated TAM.",
   "Students will be able to distinguish a pool of TAMs (Enterprise On-Ramp) from a designated TAM (Enterprise).",
   "Students will be able to explain what the AWS Health Dashboard provides and how it differs from Trusted Advisor."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the roadside assistance warm-up question and list what students would expect at each price level."
   ],
   [
    12,
    "Teach",
    "Build a ladder on the board: Basic, Developer, Business, Enterprise On-Ramp, Enterprise. For each rung write contact method, hours, critical response target and key extras. Note that plan names evolve and to check the current page. Close with AWS Health versus Trusted Advisor."
   ],
   [
    15,
    "Activity",
    "Run the 'Support Desk Match' role-play described below."
   ],
   [
    8,
    "Discuss",
    "Discuss the questions, focusing on choosing the lowest-cost plan that meets the need."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "If you bought roadside assistance for your car, what would you expect from a free plan, a cheap plan and the most expensive plan?",
  "activity": {
   "title": "Support Desk Match",
   "materials": "Printed customer profile cards (about 10, for example 'student testing on weekends', 'production app needing phone support at night', 'bank supplier wanting a named technical contact'), five labeled plan stations around the room, sticky notes.",
   "steps": [
    "Each student draws a customer card and reads its needs and budget constraints.",
    "Students walk to the station of the lowest-cost plan that meets every need and write their card's key requirement on a sticky note at that station.",
    "At each station, the gathered students check one another's cards and send anyone who over- or under-bought to the right station with a reason.",
    "The teacher reviews each station aloud, highlighting the Business threshold for 24/7 phone support and the pool versus designated TAM distinction."
   ]
  },
  "discussion": [
   "Why would a growing company stay on a lower plan longer than it should?",
   "How could a team use AWS Health events with EventBridge to reduce surprises?",
   "When is paying for Enterprise Support worth it compared with Business?"
  ],
  "exit": [
   [
    "What is the minimum plan with 24/7 phone technical support and full Trusted Advisor checks?",
    "Business Support."
   ],
   [
    "Which plan provides a designated Technical Account Manager?",
    "Enterprise Support."
   ],
   [
    "Is the AWS Health Dashboard a paid feature?",
    "No. It is available to all customers, including those on Basic Support."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pre-printed plan ladder with blanks for contact method and key extras to complete during the teach segment.",
   "Extend: Ask fast finishers to write a short recommendation memo for a startup's leadership explaining when to move from Developer to Business and later to Enterprise On-Ramp."
  ]
 },
 {
  "t": "Help and partner resources: AWS re:Post, Knowledge Center, AWS Marketplace, AWS Partner Network, AWS Professional Services and the AWS Trust & Safety team",
  "objectives": [
   "Students will be able to describe the purpose of re:Post, the Knowledge Center, AWS Marketplace, the APN, AWS Professional Services and the Trust & Safety team.",
   "Students will be able to distinguish APN partners from AWS Professional Services.",
   "Students will be able to explain where and how to report abuse involving AWS resources.",
   "Students will be able to choose the right help or partner resource for a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the shopping mall warm-up question and collect where students would go for different kinds of help."
   ],
   [
    12,
    "Teach",
    "Walk through each resource with one cue phrase: re:Post (community), Knowledge Center (common questions), Marketplace (third-party, on your AWS bill), APN (outside firms with competencies), Professional Services (AWS's own consultants), Trust & Safety (report abuse). Emphasize that abuse reports do not go to Support, Shield or GuardDuty."
   ],
   [
    15,
    "Activity",
    "Run the 'Help Desk Triage' sorting activity described below."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to reinforce the distinctions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "In a big shopping mall, where would you go to ask a quick question, buy something, hire a contractor for a renovation, or report someone causing trouble?",
  "activity": {
   "title": "Help Desk Triage",
   "materials": "Printed 'ticket' cards (about 18 short requests, such as 'need a SIEM tool billed through AWS', 'phishing site on an AWS IP', 'how do I recover SSH access to an instance', 'large migration needs AWS's own experts'), six labeled envelopes or wall areas, timer.",
   "steps": [
    "Groups of three receive a shuffled stack of ticket cards and six destination labels.",
    "Against a ten-minute timer, groups sort each ticket to the right destination and write the deciding clue word on the back.",
    "Groups swap stacks with a neighboring group and audit each other's sort, flagging any disagreements.",
    "The teacher resolves disagreements aloud, focusing on Trust & Safety versus Support and APN versus Professional Services."
   ]
  },
  "discussion": [
   "Why does AWS route abuse reports to a dedicated team rather than through normal Support cases?",
   "What are the advantages and risks of buying software through Marketplace instead of directly from a vendor?",
   "How would you decide between an APN partner and AWS Professional Services for a migration?"
  ],
  "exit": [
   [
    "Where do you report spam or attacks coming from AWS resources?",
    "The AWS Trust & Safety team, through the abuse reporting form."
   ],
   [
    "Which free resource lets anyone ask a technical question and get community answers?",
    "AWS re:Post."
   ],
   [
    "Which is part of AWS: APN consulting partners or AWS Professional Services?",
    "AWS Professional Services; APN partners are independent companies."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page matching sheet with each resource, its cue words and a picture icon, which students can use during the triage activity.",
   "Extend: Ask fast finishers to write a short internal help guide for a new employee explaining which AWS resource to use for six common situations, including what evidence to include in an abuse report."
  ]
 }
]);
