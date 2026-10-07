/* Teacher edition for ISC2 SSCP (Oct 2025 outline): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("sscp", [
 {
  "t": "ISC2 Code of Ethics: preamble and the four canons, in priority order",
  "objectives": [
   "Students will be able to state the four canons of the ISC2 Code of Ethics in priority order.",
   "Students will be able to explain the two key ideas of the preamble: being seen to adhere and adherence as a condition of certification.",
   "Students will be able to resolve a workplace dilemma by identifying which canons conflict and which one takes priority.",
   "Students will be able to identify who may file an ethics complaint for each canon."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take three or four quick answers. Do not correct anyone yet; write the competing loyalties students mention (boss, customers, the law, coworkers) on the board."
   ],
   [
    12,
    "Teach",
    "Present the preamble and the four canons on one slide. Emphasize the order and say: when two canons conflict, the lower number wins. Walk through two short examples: hiding a safety flaw for a boss (canon one beats three) and covering for a colleague (canon two beats four). Briefly explain complaint standing per canon."
   ],
   [
    18,
    "Activity",
    "Run the dilemma card sort in groups of three or four. Circulate and ask each group to name the specific canons in conflict, not just the answer."
   ],
   [
    5,
    "Discuss",
    "Bring the class together and have two groups present their hardest card. Use the discussion questions to explore where 'proper channels' end and personal action begins."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note or slip of paper and hand it in at the door."
   ]
  ],
  "warmup": "Your manager asks you to keep quiet about a security problem that could hurt customers, and reminds you that you could lose your job. Who do you owe loyalty to, and in what order?",
  "activity": {
   "title": "Dilemma card sort",
   "materials": "Printed cards (one dilemma per card, eight to ten cards per group), four column headers labeled Canon 1 to Canon 4, whiteboard or table space, sticky notes.",
   "steps": [
    "Give each group a set of dilemma cards, for example: a client asks you to delete logs before an audit; a vendor offers you concert tickets during a product evaluation; a colleague uses a pirated tool on a client network; your employer wants a vulnerability hidden until after launch.",
    "For each card, the group places a sticky note naming the two canons that are in tension, then places the card under the canon that should win.",
    "The group writes one sentence per card describing the proper-channel action a certified professional would take.",
    "Groups rotate to another table, review the other group's sort, and add a sticky note wherever they disagree.",
    "The teacher reviews disagreements with the whole class, confirming the priority order each time."
   ]
  },
  "discussion": [
   "When internal escalation fails, how should a professional decide whether to go to a regulator or another outside party?",
   "Why might ISC2 care about how your conduct looks, not only about what you actually did?"
  ],
  "exit": [
   [
    "List the four canons in priority order.",
    "Protect society, the common good, public trust and the infrastructure; act honorably, honestly, justly, responsibly and legally; provide diligent and competent service to principals; advance and protect the profession."
   ],
   [
    "Your client asks you to leave a known breach out of your report. Which canons conflict, and which wins?",
    "Canon three (serve the principal) conflicts with canons one and two (protect society, act honestly); the higher canons win, so the breach must be reported."
   ],
   [
    "What does 'be seen to adhere' in the preamble mean?",
    "Members must avoid even the appearance of unethical behavior, such as undisclosed conflicts of interest, not just actual wrongdoing."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page canon ladder with each canon paraphrased in plain words, and have them work on four of the simplest cards first, naming only which canon wins.",
   "Extend: Ask fast finishers to write their own dilemma in which three canons are involved, with a model answer explaining the priority, to be used in the next class."
  ]
 },
 {
  "t": "CIA triad, authenticity, non-repudiation and privacy",
  "objectives": [
   "Students will be able to define confidentiality, integrity, availability, authenticity, non-repudiation and privacy.",
   "Students will be able to classify a security incident or control by the goal it threatens or supports.",
   "Students will be able to explain why HMAC provides authenticity but not non-repudiation, while a private-key signature provides both.",
   "Students will be able to distinguish a privacy violation from a confidentiality breach."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Collect answers on the board in two columns: 'someone saw it' and 'something else went wrong'. Point out that the second column needs more vocabulary."
   ],
   [
    12,
    "Teach",
    "Define the six goals with one example each. Spend extra time on the HMAC versus digital signature distinction by drawing two people sharing one key versus one person holding a private key. Close by contrasting privacy and confidentiality with the marketing-list example."
   ],
   [
    18,
    "Activity",
    "Run the incident sorting race in pairs, then review answers together, focusing on cards where pairs chose different goals."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore overlap: why a single control can serve several goals."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on paper."
   ]
  ],
  "warmup": "Your phone is stolen. List every bad thing that could happen as a result. Which of those are about someone seeing your data, and which are about something else?",
  "activity": {
   "title": "Incident sorting race",
   "materials": "Printed incident cards (about 15), six labeled envelopes or whiteboard columns for the six goals, a timer on the projector.",
   "steps": [
    "Pairs receive a shuffled stack of incident and control cards, such as 'cloud bucket left public', 'wire amount altered', 'website flooded with traffic', 'manager denies approving a payment', 'customer emails sold without consent', 'smart card signature on contracts'.",
    "In eight minutes, pairs place each card under the goal it most directly threatens or supports and write a one-line reason on the back.",
    "Pairs swap stacks with a neighboring pair and mark any placement they disagree with.",
    "The teacher reveals the intended answers, and pairs score themselves, discussing any card that could fit two goals."
   ]
  },
  "discussion": [
   "Can a company protect confidentiality perfectly and still violate privacy? What would that look like?",
   "Why does non-repudiation depend on more than cryptography, such as key protection and logging?"
  ],
  "exit": [
   [
    "A web server is knocked offline by a flood of traffic. Which goal is affected?",
    "Availability."
   ],
   [
    "Which provides non-repudiation: HMAC or a digital signature with a private key? Why?",
    "The digital signature, because only the signer holds the private key; with HMAC both parties share the key, so either could have created the code."
   ],
   [
    "A hospital's staff read a celebrity's records out of curiosity using valid accounts. Is this only a confidentiality issue?",
    "It is also a privacy violation, because personal data was used for a purpose not authorized, and it reflects misuse by people with legitimate access."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-sentence 'question to ask' for each goal (for example, 'Was it changed?' for integrity) and let struggling students use it as a checklist while sorting.",
   "Extend: Ask fast finishers to design a single system feature, such as an online contract signing flow, and label which controls in it support each of the six goals."
  ]
 },
 {
  "t": "Least privilege, need to know, separation of duties, job rotation, mandatory vacation",
  "objectives": [
   "Students will be able to define least privilege, need to know, separation of duties, job rotation and mandatory vacation.",
   "Students will be able to distinguish least privilege from need to know using a concrete example.",
   "Students will be able to classify each principle as mainly preventive or mainly detective.",
   "Students will be able to recommend a compensating control when separation of duties is not feasible."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the school or workplace cash box. Write student ideas on the board and point out which ones split duties and which ones rely on someone else checking later."
   ],
   [
    12,
    "Teach",
    "Introduce each principle with a one-line definition and an example. Draw a two-column chart: preventive (least privilege, need to know, separation of duties) and detective (job rotation, mandatory vacation). Explain privilege creep and access reviews."
   ],
   [
    18,
    "Activity",
    "Run the fraud investigation role-play in groups of four, then debrief which principle would have prevented or detected the scheme."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on small organizations and the trade-off between convenience and control."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a slip of paper."
   ]
  ],
  "warmup": "A school club collects cash at a bake sale. Design a simple process so that no single student could take money without someone noticing.",
  "activity": {
   "title": "Fraud investigation role-play",
   "materials": "Printed case packets (a short story, a fake vendor list, an access list and a log excerpt), sticky notes, whiteboard.",
   "steps": [
    "Each group receives a case packet describing an organization where a fraud or data leak occurred, such as a clerk who created and paid a fake vendor, or an analyst who browsed case files outside their assignment.",
    "Group members take roles: investigator, auditor, manager and the accused employee, who explains how their access allowed the act.",
    "The group identifies every principle that was violated and writes each on a sticky note attached to the evidence that shows it.",
    "The group proposes fixes, labeling each as preventive or detective, and one compensating control if the organization is too small for full separation.",
    "Groups present their top fix to the class in one minute."
   ]
  },
  "discussion": [
   "How can a small team with only two or three people achieve the goals of separation of duties?",
   "Why might employees resist mandatory vacation, and how should management explain its purpose?"
  ],
  "exit": [
   [
    "An analyst with top clearance is denied access to a case she is not assigned to. Which principle is applied?",
    "Need to know."
   ],
   [
    "Which principles are mainly detective, and why?",
    "Job rotation and mandatory vacation, because they put someone else in the role who may discover hidden irregularities."
   ],
   [
    "A payroll clerk can add employees and approve paychecks. What principle is violated and what is the fix?",
    "Separation of duties; assign adding employees and approving pay to different people so fraud would require collusion."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a matching sheet pairing each principle with a short everyday example before they start the role-play.",
   "Extend: Ask fast finishers to map a real-looking role matrix for a five-person IT team, identify any toxic combinations of permissions, and propose a redesign."
  ]
 },
 {
  "t": "Defense in depth, due care vs due diligence",
  "objectives": [
   "Students will be able to explain defense in depth and why layers should be diverse and independent.",
   "Students will be able to design a layered set of controls for a given asset, mixing categories and types.",
   "Students will be able to distinguish due care from due diligence in workplace scenarios.",
   "Students will be able to explain how negligence relates to due care."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about protecting a home. List answers on the board, then group them into layers from street to safe."
   ],
   [
    12,
    "Teach",
    "Present the layer model from data outward. Stress diversity and pairing preventive with detective controls. Then define due care and due diligence with the payroll outsourcing example and the phrase 'do detect, do correct'."
   ],
   [
    18,
    "Activity",
    "Run the layer-the-asset whiteboard design in groups, followed by a quick due care or due diligence card round."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions and connect evidence of diligence to legal defensibility."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "You are leaving home for a month. What are all the things you would do to protect your house, from the street to the most valuable item inside?",
  "activity": {
   "title": "Layer the asset",
   "materials": "Whiteboard or large paper per group, markers, sticky notes in three colors (technical, administrative, physical), printed due care or due diligence cards.",
   "steps": [
    "Assign each group an asset, such as a patient records database, a payroll system or a research lab's prototype designs.",
    "Groups draw concentric rings from the asset outward (data, application, host, network, perimeter, physical, policy) and place at least one control per ring on colored sticky notes.",
    "Groups mark each control as preventive or detective and check that both appear across the design.",
    "Another group plays attacker, picks one control and declares it has failed; the designing group explains which layer still protects the asset.",
    "Finish with a rapid card round: the teacher reads ten actions and groups hold up 'care' or 'diligence'."
   ]
  },
  "discussion": [
   "At what point do extra layers cost more in complexity than they add in protection?",
   "What evidence would you want to show a regulator to prove both due care and due diligence after a breach?"
  ],
  "exit": [
   [
    "Why does defense in depth require diversity among layers?",
    "So that one flaw, product weakness or stolen credential cannot defeat every layer at once."
   ],
   [
    "Reviewing a cloud provider's audit report before signing is due care or due diligence?",
    "Due diligence, because it is research and verification."
   ],
   [
    "What is negligence in this context?",
    "Failure to exercise due care, which can create legal liability."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially completed ring diagram with one control in each layer filled in, so they only need to add a second control and label types.",
   "Extend: Ask fast finishers to write a one-paragraph incident timeline in which one layer fails and two others detect and contain the attack, naming each control's category and type."
  ]
 },
 {
  "t": "Control categories (technical, administrative, physical) and types (preventive, detective, corrective, deterrent, compensating, directive)",
  "objectives": [
   "Students will be able to name the three control categories and give an example of each.",
   "Students will be able to define the six control types and distinguish deterrent from preventive.",
   "Students will be able to classify any control by both category and type.",
   "Students will be able to explain when a compensating control is appropriate."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a photo or sketch of a building entrance and ask the warm-up question. List every control students spot."
   ],
   [
    12,
    "Teach",
    "Draw a grid with categories as rows and types as columns. Place the warm-up controls in the grid with the class. Explain deterrent versus preventive and the compensating control for an unpatchable system."
   ],
   [
    18,
    "Activity",
    "Run the control grid card sort in pairs, then review the most debated cards."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect classification to finding coverage gaps."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Look at the entrance to this building, or a picture of one. List every security measure you can see or imagine. What is each one actually for?",
  "activity": {
   "title": "Control grid card sort",
   "materials": "Printed cards naming about 20 controls (firewall, guard, policy, backup restore, warning sign, badge reader, log review, background check, fence, IDS, antivirus quarantine), a grid drawn on the whiteboard or large paper with 3 rows and 6 columns.",
   "steps": [
    "Pairs receive a stack of control cards and a printed copy of the grid.",
    "For each card, they write the category and every type that applies, then place it on the grid.",
    "Pairs pick two cards that could fit more than one type and write a short justification.",
    "The teacher calls out cards and pairs place them on the class grid; disagreements are resolved by asking what the control actually does in a specific scenario.",
    "The class looks at the finished grid and identifies an empty cell, then suggests a control that would fill it."
   ]
  },
  "discussion": [
   "Why is a risk covered only by preventive controls dangerous?",
   "Should a compensating control ever become permanent? What should happen if it does?"
  ],
  "exit": [
   [
    "Classify a locked server room door.",
    "Physical and preventive."
   ],
   [
    "What is the difference between a deterrent and a preventive control?",
    "A deterrent only discourages an attacker, who can ignore it; a preventive control actually stops the action."
   ],
   [
    "An unpatchable machine is isolated on its own network segment with extra monitoring. What type of control is this?",
    "Compensating, because it stands in for the primary control (patching) that is not feasible."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference card with one-word cues for each type (stop, notice, fix, scare, tell, substitute) and start them on cards with a single obvious type.",
   "Extend: Ask fast finishers to take one risk, such as stolen credentials, and build a complete set of controls that includes at least one control of every type, labeling each category."
  ]
 },
 {
  "t": "Documenting and verifying functional security controls, baselines",
  "objectives": [
   "Students will be able to explain what a security baseline is and how it is used to build and measure systems.",
   "Students will be able to list the elements of good control documentation, including exceptions.",
   "Students will be able to distinguish a test of a control's function from a check of its existence.",
   "Students will be able to decide the correct response to a baseline deviation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the smoke detector and discuss why installation is not the same as working."
   ],
   [
    12,
    "Teach",
    "Explain documentation fields (purpose, owner, scope, configuration, evidence, exceptions). Introduce baselines, CIS Benchmarks and golden images. Contrast existence checks with functional tests, and show the two acceptable outcomes for a deviation."
   ],
   [
    18,
    "Activity",
    "Run the baseline scan report review in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about verification schedules and exceptions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your home has a smoke detector on the ceiling. How do you know it would actually work tonight? What would you write down to prove it to someone else?",
  "activity": {
   "title": "Baseline scan report review",
   "materials": "Printed one-page baseline (about 10 settings for a Linux server) and a printed mock scan report for three servers showing passes and failures, highlighters, projector.",
   "steps": [
    "Pairs compare the scan report against the baseline and highlight every failed setting.",
    "For each failure, pairs decide whether it should be corrected or treated as an exception, and write what documentation the exception would need (justification, approver, expiry).",
    "Pairs identify one setting in the report that only checks existence and rewrite it as a functional test.",
    "Pairs draft a short verification schedule for the servers.",
    "The teacher projects the report and pairs share their decisions, with the class challenging any exception that lacks a strong justification."
   ]
  },
  "discussion": [
   "Why might an organization start from a public hardening guide instead of writing its own baseline from scratch?",
   "What risks arise when exceptions have no expiry date?"
  ],
  "exit": [
   [
    "What is configuration drift?",
    "The gradual divergence of a system's actual settings from its approved baseline."
   ],
   [
    "Give an example of a functional test of a firewall.",
    "Attempting a connection that the rules should block and confirming it is denied."
   ],
   [
    "A server fails a baseline setting. What are the two acceptable responses?",
    "Correct it back to the baseline through change management, or document an approved exception with a risk owner and expiry date."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a mock report with only five settings and a decision flowchart (fail, then fix or exception, then document).",
   "Extend: Ask fast finishers to write three automated check descriptions that would detect drift for the failed settings, describing what each check reads and what counts as a pass."
  ]
 },
 {
  "t": "Asset management lifecycle: inventory, ownership, classification, retention, secure disposal",
  "objectives": [
   "Students will be able to describe the stages of the asset management lifecycle in order.",
   "Students will be able to identify who is accountable for classifying an asset and approving access.",
   "Students will be able to explain the risks of keeping data too briefly and too long, and the effect of a legal hold.",
   "Students will be able to identify gaps in an asset inventory and propose process fixes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the old phone. Collect answers and highlight the data still on it."
   ],
   [
    12,
    "Teach",
    "Walk through the lifecycle on a whiteboard timeline: acquire and inventory, assign owner, classify, use and retain, dispose and retire. At each stage, give one thing that goes wrong if it is skipped. Explain retention schedules and legal holds."
   ],
   [
    18,
    "Activity",
    "Run the inventory audit exercise in small groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions on retention and shadow IT."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think about your last old phone. Where is it now? What data is still on it, and who would know if it went missing?",
  "activity": {
   "title": "Inventory audit",
   "materials": "Printed mock asset inventory (about 15 rows with some blank owners, missing classifications, retired devices with no disposal record, and one device not on the list but found in a network scan), highlighters, sticky notes.",
   "steps": [
    "Groups review the inventory and highlight every row with a lifecycle gap.",
    "For each gap, they write on a sticky note which lifecycle stage failed and what risk it creates.",
    "Groups compare the inventory with a short network scan printout and identify the unknown device, then decide how to handle it.",
    "Groups propose two process changes, such as linking disposal records to inventory closure or linking purchasing to inventory entry.",
    "Each group presents its most serious finding and fix to the class."
   ]
  },
  "discussion": [
   "Who should decide how long data is kept, and what happens if nobody does?",
   "Why do employees adopt shadow IT, and how can an organization reduce it without simply banning everything?"
  ],
  "exit": [
   [
    "List the lifecycle stages covered in this lesson in order.",
    "Inventory, ownership, classification, retention and secure disposal."
   ],
   [
    "Who is accountable for an information asset and decides its classification?",
    "The asset or data owner, a business role."
   ],
   [
    "Why can keeping data longer than required be harmful?",
    "It raises storage cost, legal discovery exposure and the amount of data at risk in a breach."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a lifecycle diagram with the stage names filled in and ask them to match each inventory problem to a stage before discussing fixes.",
   "Extend: Ask fast finishers to draft a short retention schedule for three record types (job applications, server logs, signed contracts), noting what kind of requirement would drive each period without inventing specific legal values."
  ]
 },
 {
  "t": "Data roles: owner, custodian, user; media sanitization (clear, purge, destroy)",
  "objectives": [
   "Students will be able to describe the responsibilities of the data owner, custodian and user.",
   "Students will be able to assign a decision or task in a scenario to the correct data role.",
   "Students will be able to distinguish clear, purge and destroy and choose the right level for a situation.",
   "Students will be able to explain why degaussing and overwriting are unsuitable for solid-state drives."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about selling a used phone. List methods students suggest and ask which ones they are sure work."
   ],
   [
    12,
    "Teach",
    "Introduce owner, custodian and user with the phrase 'owners decide, custodians implement'. Briefly mention controller and processor. Then present clear, purge and destroy with examples, and explain media type differences for magnetic versus solid-state storage."
   ],
   [
    18,
    "Activity",
    "Run the who-decides and how-to-wipe scenario stations."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about verification and accountability."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You are selling your old phone online. What would you do to make sure the buyer cannot see your photos and messages? How sure are you that it works?",
  "activity": {
   "title": "Who decides and how to wipe",
   "materials": "Printed scenario cards at four stations around the room, a role answer sheet, and a sanitization decision table printed for each student.",
   "steps": [
    "Station one: groups read access-request scenarios and label each action with owner, custodian or user.",
    "Station two: groups match devices (magnetic hard drive, SSD, USB flash drive, backup tape) with sanitization methods that actually work on them.",
    "Station three: groups decide clear, purge or destroy for scenarios such as internal reuse, leased equipment return, and failed drives that cannot power on.",
    "Station four: groups list the fields a sanitization record should include.",
    "Groups rotate every four minutes; the teacher reviews answers from each station at the end."
   ]
  },
  "discussion": [
   "Why should the business owner, rather than IT, set the sanitization requirement for a device?",
   "If a drive fails and cannot power on, what sanitization options remain, and why?"
  ],
  "exit": [
   [
    "Who approves access to a sales database: the sales director or the database administrator?",
    "The sales director, as data owner; the database administrator implements it as custodian."
   ],
   [
    "A leased laptop with an SSD is being returned. Name a suitable method.",
    "Purge with cryptographic erase or the manufacturer's sanitize command, or physical destruction if allowed."
   ],
   [
    "Why is degaussing useless on an SSD?",
    "SSDs store data as electrical charge in flash cells, not magnetically, so a magnetic field does not erase them."
   ]
  ],
  "differentiation": [
   "Support: Provide a simple flowchart: Is the media leaving our control? Is it magnetic or solid-state? Then point to the correct method, and let struggling students use it at stations two and three.",
   "Extend: Ask fast finishers to write a one-page sanitization procedure for a small company, covering roles, methods by media type, verification and record keeping."
  ]
 },
 {
  "t": "Change and configuration management: request, impact analysis, approval, backout, emergency changes",
  "objectives": [
   "Students will be able to put the steps of a change management process in order and explain the purpose of each.",
   "Students will be able to write a basic request for change that includes impact analysis and a backout plan.",
   "Students will be able to explain how emergency changes differ from normal changes and what they still require.",
   "Students will be able to explain how a CMDB helps detect unauthorized changes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the surprise change. Collect stories and ask what would have prevented each problem."
   ],
   [
    10,
    "Teach",
    "Walk through request, impact analysis, testing, approval, scheduling, implementation and verification, and closure. Explain the CAB, standard changes, backout plans and emergency changes. Show how a CMDB supports impact analysis and drift detection."
   ],
   [
    20,
    "Activity",
    "Run the mock change advisory board: groups write RFCs and present them to a student CAB."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about emergency changes and process overhead."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of a time an app, game or website you use changed overnight and broke something you relied on. What should the people who made the change have done first?",
  "activity": {
   "title": "Mock change advisory board",
   "materials": "Printed RFC templates (fields: description, reason, systems affected, impact analysis, test plan, schedule, backout plan), scenario cards, whiteboard for CAB decisions.",
   "steps": [
    "Groups receive a change scenario, such as enabling multifactor authentication for the VPN, upgrading the email server, or adding a firewall rule for a new partner.",
    "Groups complete the RFC template, paying special attention to dependencies, security impact and a specific backout trigger.",
    "Three or four students act as the CAB (technical, business and security representatives) and question each group for two minutes.",
    "The CAB approves, rejects or requests changes, writing the reason on the board.",
    "The teacher announces a surprise emergency (an actively exploited flaw) and the class walks through the emergency change steps together."
   ]
  },
  "discussion": [
   "What does a high number of emergency changes suggest about an organization?",
   "How can change management avoid becoming so slow that people bypass it?"
  ],
  "exit": [
   [
    "Put these steps in order: approval, impact analysis, request, implementation.",
    "Request, impact analysis, approval, implementation."
   ],
   [
    "What must still happen for an emergency change?",
    "Authorization by a designated approver, and full documentation and review after the change."
   ],
   [
    "How does a CMDB help security?",
    "It records approved configurations and relationships, so comparing live systems against it reveals unauthorized changes and supports impact analysis."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially completed RFC with the description and systems filled in, so they focus on impact analysis and the backout plan.",
   "Extend: Ask fast finishers to design a short policy defining standard, normal and emergency changes for a small company, including who approves each type."
  ]
 },
 {
  "t": "Security awareness and training: phishing simulations, measuring effectiveness",
  "objectives": [
   "Students will be able to distinguish security awareness, training and education.",
   "Students will be able to list the prerequisites and ethical guidelines for running a phishing simulation.",
   "Students will be able to select behavioral metrics that measure program effectiveness and explain why completion rates are insufficient.",
   "Students will be able to interpret simulation results and recommend program adjustments."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and tally on the board how many students would report versus delete a suspicious message. Ask why people do not report."
   ],
   [
    12,
    "Teach",
    "Define awareness, training and education with examples. Cover the rules for phishing simulations (authorization, coordination, no harm, private just-in-time teaching). Present the metrics list and stress report rate and time to first report."
   ],
   [
    18,
    "Activity",
    "Run the metrics dashboard analysis in small groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about culture and the ethics of simulations."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You receive an email that looks a little off, asking you to log in to view a shared document. What do you do with it, and why do you think many people simply delete such messages instead of reporting them?",
  "activity": {
   "title": "Metrics dashboard analysis",
   "materials": "Printed mock dashboards for four fictional departments showing completion rate, click rate, credential-submission rate, report rate and time to first report over six months; sticky notes; whiteboard.",
   "steps": [
    "Groups study the dashboards and rank the four departments from most to least prepared for a real phishing attack, writing their reasoning on sticky notes.",
    "Groups identify one department with high completion but poor behavior and explain the gap.",
    "Groups propose two targeted program changes, such as role-specific training for finance or making the report button easier to find.",
    "Groups write a three-sentence summary for management describing the trend in plain terms.",
    "The class compares rankings, and the teacher highlights why report rate and time to first report often matter more than click rate alone."
   ]
  },
  "discussion": [
   "Where is the line between a realistic phishing simulation and one that is unfair or harmful to employees?",
   "How can an organization encourage people to admit they clicked something, rather than hide it?"
  ],
  "exit": [
   [
    "Give an example of role-based training rather than general awareness.",
    "Teaching help desk staff to verify a caller's identity before resetting a password, or finance staff to confirm bank detail changes by calling a known number."
   ],
   [
    "Why is training completion rate a weak metric?",
    "It shows who attended, not whether behavior changed."
   ],
   [
    "Name two requirements before launching a phishing simulation.",
    "Management authorization and coordination with email, help desk and security teams, with a design that causes no real harm."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a glossary card for each metric with a one-line 'higher is better' or 'lower is better' note, and pair them with a peer for the ranking step.",
   "Extend: Ask fast finishers to design a twelve-month awareness program for a small company, including onboarding, refreshers, simulation cadence, role-based training and the metrics they would report each quarter."
  ]
 },
 {
  "t": "Physical security operations: perimeter, badges, access control vestibules, CCTV, visitor logs",
  "objectives": [
   "Students will be able to describe layered physical security from perimeter to sensitive interior areas.",
   "Students will be able to explain how an access control vestibule counters tailgating and piggybacking.",
   "Students will be able to choose fail-safe or fail-secure locking for a door and justify it with life-safety principles.",
   "Students will be able to state the operational requirements for CCTV and visitor logs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and have students sketch, in one minute, how they entered the building today and what checked them."
   ],
   [
    12,
    "Teach",
    "Draw concentric rings: perimeter, entrance, interior, sensitive room. Place controls in each ring. Explain tailgating, vestibules, fail-safe versus fail-secure, CCTV time synchronization and retention, and visitor procedures."
   ],
   [
    18,
    "Activity",
    "Run the facility walkthrough audit using a printed floor plan."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about social pressure and life safety."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "How did you get into this building today? Who or what checked that you belonged here, and could someone have followed you in without anyone noticing?",
  "activity": {
   "title": "Facility walkthrough audit",
   "materials": "Printed floor plan of a fictional small data center office (parking lot, lobby, offices, server room, loading dock, emergency exits), colored pens, a printed incident narrative involving a tailgater.",
   "steps": [
    "Groups mark every existing control on the floor plan and label each by layer (perimeter, entrance, interior, sensitive area).",
    "Groups find at least four weaknesses, such as an unmonitored loading dock, a server room door without logging, or a camera blind spot.",
    "Groups choose fail-safe or fail-secure for each marked door and justify the choice.",
    "Groups read the tailgating incident narrative and list what the badge log, CCTV and visitor log should show, noting where time synchronization matters.",
    "Groups present their top three fixes, and the class votes on which fix gives the most risk reduction."
   ]
  },
  "discussion": [
   "Why do polite employees hold doors for strangers, and how can training and design reduce this without making the workplace hostile?",
   "How should an organization balance camera coverage with employee privacy?"
  ],
  "exit": [
   [
    "Which lock type belongs on an emergency exit door, and why?",
    "Fail-safe, or one allowing free exit from inside, because life safety comes first and people must be able to escape when power fails."
   ],
   [
    "How does an access control vestibule prevent tailgating?",
    "Its two interlocking doors let only one person through at a time; the second door will not open until the first has closed."
   ],
   [
    "Name two operational requirements for CCTV.",
    "Coverage of entrances and sensitive areas with adequate lighting, synchronized timestamps, defined retention, protection of recordings from tampering, and monitoring or review of footage."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a checklist of controls to look for on the floor plan (fence, lighting, badge reader, camera, vestibule, reception, visitor log) so they can tick them off before finding gaps.",
   "Extend: Ask fast finishers to write a short visitor management procedure covering sign-in fields, badge design, escort rules, badge return and log review, and explain how it supports an emergency headcount."
  ]
 },
 {
  "t": "Authentication factors: know, have, are; MFA vs multi-step",
  "objectives": [
   "Students will be able to classify authentication methods as something you know, have or are.",
   "Students will be able to determine whether a given login flow is multifactor or only multi-step.",
   "Students will be able to compare the strength of SMS codes, push notifications, TOTP and hardware security keys.",
   "Students will be able to explain the order of identification, authentication and authorization."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list every way students prove who they are during a normal day. Sort the list into three columns without naming them yet."
   ],
   [
    12,
    "Teach",
    "Name the three columns as know, have and are. Explain identification, authentication and authorization. Define MFA and multi-step, then rank common methods by phishing resistance and explain SIM swapping and push fatigue."
   ],
   [
    18,
    "Activity",
    "Run the login flow lab: pairs classify flows and, optionally, set up TOTP on a practice account in a browser-based demo or authenticator app."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about usability and phishing resistance."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "List every way you proved who you were today: unlocking your phone, entering a building, logging into a school or work account, paying for something. How could someone pretend to be you for each one?",
  "activity": {
   "title": "Is it really MFA",
   "materials": "Printed cards describing ten login flows (for example: password then PIN; badge then fingerprint; password then SMS code; password then security question; passkey on a phone unlocked by face), whiteboard with columns 'MFA' and 'Not MFA', projector.",
   "steps": [
    "Pairs read each login flow card and write the factor type of every piece of evidence in it.",
    "Pairs place each card in the MFA or Not MFA column and justify their choice by counting distinct factor types.",
    "For the MFA cards, pairs rank them from weakest to strongest against phishing and explain the ranking.",
    "The teacher projects a TOTP setup screen (or students set up TOTP on a practice account) and the class discusses why the QR code is a shared secret and why clocks matter.",
    "The class reviews any disputed cards together."
   ]
  },
  "discussion": [
   "Why might an organization keep SMS codes for some users even though stronger options exist?",
   "How should a user be taught to respond to an unexpected MFA prompt?"
  ],
  "exit": [
   [
    "Is a smart card plus a PIN multifactor? Explain.",
    "Yes. The smart card is something you have and the PIN is something you know, which are two different factor types."
   ],
   [
    "A login asks for a password and then a security question. MFA or multi-step?",
    "Multi-step only; both are something you know, so it is single-factor."
   ],
   [
    "What attack does number matching help prevent?",
    "Push fatigue, where an attacker floods a user with prompts hoping they approve one."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-picture reference card (head for know, hand for have, fingerprint for are) and start them with the five simplest login flow cards.",
   "Extend: Ask fast finishers to design an authentication policy for three user groups (general staff, administrators, remote contractors), choosing methods for each and justifying the choice by risk and phishing resistance."
  ]
 },
 {
  "t": "Biometrics: FAR, FRR, CER",
  "objectives": [
   "Students will be able to define FRR and FAR and classify each as a Type I or Type II error.",
   "Students will be able to explain how changing a biometric threshold shifts FAR and FRR in opposite directions.",
   "Students will be able to use the crossover error rate to compare biometric systems and justify an operating point for a given asset.",
   "Students will be able to identify non-accuracy factors such as throughput, acceptability, liveness detection and template privacy."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect three or four answers. Write \"too picky\" and \"too relaxed\" on the board and ask which one a thief would prefer."
   ],
   [
    12,
    "Teach",
    "Explain enrollment, templates and the similarity threshold. Define FRR (Type I) and FAR (Type II). Sketch the two curves crossing and label the CER. Stress that lower CER is better and that the operating point can differ from the CER."
   ],
   [
    15,
    "Activity",
    "Run the threshold card activity in small groups. Circulate and ask each group to explain why its chosen threshold suits its door."
   ],
   [
    8,
    "Discuss",
    "Groups report their chosen thresholds. Use the discussion questions to draw out acceptability, liveness detection and why biometrics pair well with another factor."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your phone fails to recognize your face once in a while. Would you rather it failed more often, or occasionally unlocked for your sibling? Why?",
  "activity": {
   "title": "Tune the threshold",
   "materials": "Printed cards showing a small table of FAR and FRR values at five threshold settings for two readers (the teacher can invent round numbers that cross at different points), scenario cards (data center, school cafeteria, hospital pharmacy, gym), whiteboard.",
   "steps": [
    "Give each group the two reader tables. Ask them to find each reader's CER by locating where FAR and FRR are equal, and decide which reader is more accurate overall.",
    "Hand each group one scenario card. Ask them to choose a threshold setting for that location and write one sentence justifying the trade-off between FAR and FRR.",
    "Ask each group to name one non-accuracy concern for its scenario, such as throughput at the cafeteria or acceptability at the gym, and one second factor they would add.",
    "Groups write their choice on the board so the class can compare high-security and convenience-focused settings."
   ]
  },
  "discussion": [
   "Why might an organization deliberately operate a reader at a stricter setting than its CER, and what does that cost?",
   "What makes a stolen biometric template a different kind of problem from a stolen password?"
  ],
  "exit": [
   [
    "Which error type is false acceptance, and why is it the security-critical one?",
    "Type II; it lets an unauthorized person in, often without any visible alarm."
   ],
   [
    "Reader X has a CER of 4 percent and reader Y has a CER of 1.5 percent. Which is more accurate?",
    "Reader Y, because a lower CER means fewer errors overall."
   ],
   [
    "If you raise sensitivity, what happens to FRR?",
    "FRR increases, because more legitimate users fail to match the stricter threshold."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column card, \"wrong person let in\" and \"right person kept out,\" and have them sort examples into it before mapping each column to FAR or FRR.",
   "Extend: Ask fast finishers to design a two-factor entry for the hospital pharmacy and explain how adding a badge changes the impact of a false acceptance."
  ]
 },
 {
  "t": "Single sign-on, Kerberos, device authentication",
  "objectives": [
   "Students will be able to explain the benefits and the single-point-of-compromise risk of single sign-on.",
   "Students will be able to sequence the Kerberos flow from login to service access, naming the AS, TGS, TGT and service ticket.",
   "Students will be able to diagnose clock skew and KDC availability as causes of Kerberos authentication failures.",
   "Students will be able to describe how 802.1X, certificates and TPMs authenticate devices."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question. List student answers on the board under \"convenient\" and \"risky\"."
   ],
   [
    12,
    "Teach",
    "Introduce SSO benefits and risks. Draw the KDC with its AS and TGS halves, then walk through the four Kerberos steps with arrows. Emphasize timestamps, the five-minute default skew in Active Directory, and redundancy. Close with 802.1X roles: supplicant, authenticator, RADIUS server."
   ],
   [
    15,
    "Activity",
    "Run the Kerberos role-play. Repeat it once with a clock deliberately set wrong."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to connect the role-play to real troubleshooting and to device authentication."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "You log in once in the morning and never type your password again all day. What makes that convenient, and what would an attacker who stole that one login be able to do?",
  "activity": {
   "title": "Kerberos ticket role-play",
   "materials": "Index cards labeled TGT, Service Ticket and Authenticator; a marker; sticky notes for timestamps; a printed wall clock face for each role.",
   "steps": [
    "Assign roles: client, authentication service, ticket-granting service, file server, and an observer who checks timestamps. Each role holds a clock face set to the same time.",
    "The client asks the AS for a TGT; the AS writes a timestamp and expiry on a TGT card and hands it over. The client takes the TGT to the TGS and receives a service ticket for the file server, then presents it to the file server, which checks the timestamp.",
    "Run it again, but secretly set the file server's clock eight minutes ahead. Ask the class to explain why the file server now rejects a valid ticket.",
    "Finish by having one student act as an unknown laptop at a switch port and the class explain what an 802.1X authenticator and RADIUS server would do."
   ]
  },
  "discussion": [
   "If you were designing Kerberos for a company with ten branch offices, what would you do to keep authentication available and accurate?",
   "Why is knowing which device someone connects from useful even when you already know who the user is?"
  ],
  "exit": [
   [
    "What does the client present to the TGS to obtain a service ticket?",
    "The ticket-granting ticket (TGT)."
   ],
   [
    "A whole office fails Kerberos logins with correct passwords. What is the most likely cause?",
    "Clock skew beyond the allowed limit, typically from a failed NTP time source."
   ],
   [
    "Name the three roles in 802.1X.",
    "Supplicant (the device), authenticator (the switch or access point) and authentication server (usually RADIUS)."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed Kerberos flow diagram with blanks for AS, TGS, TGT and service ticket for students to fill in during the role-play.",
   "Extend: Ask fast finishers to list three signs in authentication logs that might indicate stolen or forged Kerberos tickets and a defense for each."
  ]
 },
 {
  "t": "Federation and trust: SAML, OAuth 2.0, OpenID Connect, one-way/two-way and transitive trusts",
  "objectives": [
   "Students will be able to explain the roles of an identity provider and a service provider in federation.",
   "Students will be able to compare SAML, OAuth 2.0 and OpenID Connect, distinguishing authentication from delegated authorization.",
   "Students will be able to determine who can access whose resources in one-way, two-way, transitive and non-transitive trusts.",
   "Students will be able to recommend controls that reduce the risk of relying on an IdP."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Note answers, then point out that some describe identity and some describe permission."
   ],
   [
    12,
    "Teach",
    "Draw the SAML flow: browser, SP, IdP, signed assertion. Contrast OAuth's access token and scope with OIDC's ID token. Then draw arrows for trusts and show that access flows opposite to trust; demonstrate transitive versus non-transitive with three domains."
   ],
   [
    15,
    "Activity",
    "Run the trust arrows card activity, then the protocol sort."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions; connect to offboarding through the IdP and IdP compromise risk."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions on paper."
   ]
  ],
  "warmup": "When an app asks, \"Allow this app to see your contacts?\", is it asking who you are, or what it may do? How is that different from \"Sign in with your work account\"?",
  "activity": {
   "title": "Trust arrows and protocol sort",
   "materials": "Printed domain cards (A, B, C, D), string or whiteboard markers for arrows, printed scenario cards describing login or access needs, sticky notes labeled SAML, OAuth 2.0 and OIDC.",
   "steps": [
    "Groups lay out the domain cards and the teacher calls out trusts, such as \"A trusts B, one-way, non-transitive\" and \"B trusts C, transitive.\" Groups draw arrows and answer questions like \"Can C's users reach A?\"",
    "Swap in a second set of trust conditions and have groups explain each answer in one sentence that uses the words trusting and trusted.",
    "Hand out scenario cards (enterprise web SSO to a cloud HR app, a printing app that needs read access to a photo library, a mobile app with a sign-in button). Groups place the best-fit protocol sticky note on each and justify it.",
    "Groups compare answers with a neighboring group and resolve disagreements before the debrief."
   ]
  },
  "discussion": [
   "If an organization's IdP were compromised, what would an attacker gain, and what controls would limit the damage?",
   "When might a two-way transitive trust be reasonable, and when would it be a poor choice?"
  ],
  "exit": [
   [
    "Which protocol issues an ID token in JWT format?",
    "OpenID Connect."
   ],
   [
    "Is OAuth 2.0 an authentication or an authorization framework?",
    "Authorization; it delegates scoped access without establishing who the user is on its own."
   ],
   [
    "X trusts Y. Whose users can be given access to whose resources?",
    "Y's users can be given access to X's resources."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference card stating \"trusting domain = resources, trusted domain = accounts\" and a worked example before the card activity.",
   "Extend: Ask fast finishers to list the checks a relying party should perform on a SAML assertion or an OIDC ID token and explain what attack each check prevents."
  ]
 },
 {
  "t": "Internetwork trust: extranets, third-party connections, zero trust",
  "objectives": [
   "Students will be able to distinguish an intranet from an extranet and explain why extranets are segmented.",
   "Students will be able to identify the purpose of an ISA, MOU or MOA, and SLA in third-party connections.",
   "Students will be able to select operational controls for vendor remote access.",
   "Students will be able to explain zero trust principles and the roles of the policy engine, policy administrator and policy enforcement point."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect quick answers about who has visited the school or office for repairs and what they were allowed to touch."
   ],
   [
    12,
    "Teach",
    "Draw a perimeter network with a vendor VPN landing inside, then redraw it with an extranet segment and gateway. Explain ISA, MOU or MOA, SLA, breach notification and right to audit. Introduce zero trust and sketch the control plane and data plane."
   ],
   [
    15,
    "Activity",
    "Run the vendor access redesign in pairs."
   ],
   [
    8,
    "Discuss",
    "Pairs share designs; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "A repair contractor needs to fix the building's heating system. Should they get a key to the whole building, or something more limited? What would you want written down before they start?",
  "activity": {
   "title": "Redesign the vendor connection",
   "materials": "Printed one-page scenario describing a vendor with an always-on VPN into a flat network and a shared account, blank network diagram handouts, colored markers, whiteboard.",
   "steps": [
    "Pairs read the scenario and circle every risk they can find, such as the shared account, no MFA, flat network and no end date.",
    "Pairs redraw the network with an extranet or isolated segment and a gateway, labeling where the policy enforcement point sits.",
    "Pairs list the written agreements they would require and one clause each should contain.",
    "Pairs list operational controls (named accounts, MFA, time windows, session recording, offboarding) and swap with another pair to critique."
   ]
  },
  "discussion": [
   "Why do so many breaches start at a trusted third party rather than at the target directly?",
   "What would be hardest about moving an existing organization toward zero trust, and where would you start?"
  ],
  "exit": [
   [
    "Which document specifies the technical security requirements for connecting two organizations' systems?",
    "An interconnection security agreement (ISA)."
   ],
   [
    "Under zero trust, does being on the internal network grant access?",
    "No. Every request is verified based on identity, device and context regardless of location."
   ],
   [
    "Give one reason vendor staff should have unique named accounts.",
    "So actions can be traced to an individual for accountability, and access can be removed person by person."
   ]
  ],
  "differentiation": [
   "Support: Provide a checklist of possible risks for students to tick while reading the scenario, and a partially labeled network diagram to complete.",
   "Extend: Ask fast finishers to write a short access policy the policy engine might evaluate for the vendor, combining identity, device health and time."
  ]
 },
 {
  "t": "Identity lifecycle: provisioning, proofing, maintenance, entitlement, deprovisioning",
  "objectives": [
   "Students will be able to sequence the identity lifecycle stages from proofing to deprovisioning.",
   "Students will be able to explain why provisioning and deprovisioning should be driven by an authoritative HR source.",
   "Students will be able to identify the control failure behind privilege creep and orphaned accounts.",
   "Students will be able to apply correct deprovisioning practice, including disable-then-delete and handling involuntary terminations."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record examples of accounts students forgot to close."
   ],
   [
    12,
    "Teach",
    "Walk through the lifecycle with the joiner, mover, leaver model on the board. Explain proofing strength, HR-driven provisioning, role-based entitlements, mover failures and complete deprovisioning, including disable before delete."
   ],
   [
    15,
    "Activity",
    "Run the employee timeline card sort."
   ],
   [
    8,
    "Discuss",
    "Groups present one failure they found; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "Think of an online account you stopped using years ago. Is it still open? What could someone do with it, and who would notice?",
  "activity": {
   "title": "Follow the employee timeline",
   "materials": "Printed event cards for one fictional employee (hired, proofed, role assigned, moved to new department, password reset, contract ends), printed action cards (approve, grant, revoke, disable, delete, verify), sticky notes, whiteboard.",
   "steps": [
    "Groups place the employee event cards in lifecycle order and label each with its stage name.",
    "For each event, groups attach the action cards that should happen and note who approves or triggers them.",
    "The teacher reveals a twist card for each group, such as \"the old department's access was never removed\" or \"the cloud billing account was not on the checklist.\" Groups identify the resulting risk.",
    "Groups write one process improvement on a sticky note and post it on the board under the stage it fixes."
   ]
  },
  "discussion": [
   "Why do organizations handle the mover stage worse than the joiner and leaver stages?",
   "What would you check to be confident no orphaned accounts remain after a large layoff?"
  ],
  "exit": [
   [
    "What stage comes before provisioning, and why?",
    "Identity proofing, so the account is created for a verified, real person."
   ],
   [
    "What is privilege creep?",
    "The accumulation of excess access when old entitlements are not removed as roles change."
   ],
   [
    "For an involuntary termination, when should access be disabled?",
    "Before or during the notification meeting."
   ]
  ],
  "differentiation": [
   "Support: Provide a lifecycle diagram with the five stage names already printed so students only match events and actions to it.",
   "Extend: Ask fast finishers to design a monthly report that would detect orphaned accounts and describe what data sources it compares."
  ]
 },
 {
  "t": "Access reviews, recertification and privilege creep",
  "objectives": [
   "Students will be able to explain how privilege creep develops and why it weakens least privilege and separation of duties.",
   "Students will be able to describe the steps of an effective access review, from data extraction to verified removal.",
   "Students will be able to identify who should recertify access and how often privileged access should be reviewed.",
   "Students will be able to recognize rubber-stamping and propose countermeasures."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect examples of keys, passwords or memberships students still hold but no longer need."
   ],
   [
    10,
    "Teach",
    "Define privilege creep with the finance, procurement, IT example. Walk through the review steps on the board, stressing extraction from real systems and verified removal. Introduce rubber-stamping and special cases such as dormant and service accounts."
   ],
   [
    20,
    "Activity",
    "Run the mock access review. Give groups a strict time limit to simulate reviewer pressure."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare how groups handled the cryptic list versus the clear list."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "How many keys, cards or passwords do you have for places you no longer go? Why do people tend to keep them?",
  "activity": {
   "title": "Mock access review",
   "materials": "Two printed versions of the same short access list for six fictional employees: one with cryptic group codes only, one with plain descriptions, job titles and last-used dates. Red and green pens.",
   "steps": [
    "Give groups the cryptic version and three minutes to approve or revoke every line. Record how many they revoked.",
    "Give groups the clear version and seven minutes to review again. Ask them to circle any separation-of-duties conflicts and any access unused for months.",
    "Groups compare their two results and list what made the second review more accurate.",
    "Groups write the follow-up steps needed after sign-off, including who removes access and how removal is verified."
   ]
  },
  "discussion": [
   "Why might a busy manager rubber-stamp a review even when they care about security?",
   "Who should review a service account that no single manager owns?"
  ],
  "exit": [
   [
    "Is an access review a preventive or a detective control?",
    "Detective; it finds inappropriate access after it exists."
   ],
   [
    "Name one countermeasure for rubber-stamping.",
    "Show last-used dates, highlight risky entitlements, use plain descriptions, keep batches small, or sample decisions."
   ],
   [
    "What must happen after a reviewer marks access for revocation?",
    "The access must actually be removed and the removal verified."
   ]
  ],
  "differentiation": [
   "Support: Pair struggling students with a partner and give them a short glossary card explaining each group code before the first round.",
   "Extend: Ask fast finishers to propose a review schedule for standard, privileged and service accounts and justify each frequency."
  ]
 },
 {
  "t": "Privileged access management, service accounts",
  "objectives": [
   "Students will be able to identify privileged accounts and explain why they need stronger controls.",
   "Students will be able to describe PAM controls, including account separation, just-in-time access, vaulting, session recording and break-glass procedures.",
   "Students will be able to explain the specific risks of service accounts.",
   "Students will be able to apply a hardening checklist to a poorly managed service account."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the master key and list student ideas for protecting it."
   ],
   [
    12,
    "Teach",
    "Define privileged accounts, then cover separate admin accounts, least privilege, JIT versus standing privileges, vaults, jump servers and session recording, MFA, tamper-resistant logging and break-glass accounts. Then introduce service accounts and why they are targeted."
   ],
   [
    15,
    "Activity",
    "Run the service account rescue activity in pairs."
   ],
   [
    8,
    "Discuss",
    "Pairs share fixes; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "If a building had one key that opened every door, including the room with the security cameras, how would you want that key stored, handed out and returned?",
  "activity": {
   "title": "Service account rescue",
   "materials": "Printed profile cards for three fictional service accounts showing rights, password age, owner (often blank), logon type and where the credential is stored; a blank hardening checklist handout.",
   "steps": [
    "Pairs read each profile card and circle every risk, such as excessive rights, an old password, no owner, interactive logon allowed or a password in a script.",
    "Pairs complete the hardening checklist for each account: owner, purpose, minimum rights, logon restrictions, credential storage and rotation, monitoring.",
    "Pairs decide which of the three accounts to fix first and justify the choice by potential impact.",
    "Each pair writes one alert rule that would detect misuse of their highest-risk account."
   ]
  },
  "discussion": [
   "Why do service accounts so often end up with far more rights than they need?",
   "What should happen, and who should be told, when a break-glass account is used?"
  ],
  "exit": [
   [
    "What is the main benefit of just-in-time access over standing privileges?",
    "Elevated rights exist only for a short, approved window, reducing the time a compromised account is dangerous."
   ],
   [
    "Name two controls for a service account.",
    "A named owner, least privilege, denied interactive logon, vaulted and rotated credentials, managed service accounts, or monitoring (any two)."
   ],
   [
    "What should be done with a password found hard-coded in a script?",
    "Treat it as exposed, rotate it and change the script to retrieve the secret from a vault."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a completed checklist for one account as a model before they attempt the other two.",
   "Extend: Ask fast finishers to sketch a privileged session flow from request and approval through vault checkout, jump server and automatic rotation."
  ]
 },
 {
  "t": "Access control models: DAC, MAC, RBAC, rule-based, ABAC",
  "objectives": [
   "Students will be able to identify DAC, MAC, RBAC, rule-based and ABAC from scenario descriptions.",
   "Students will be able to compare the strengths and weaknesses of each model.",
   "Students will be able to distinguish role-based from rule-based access control when both are abbreviated RBAC.",
   "Students will be able to recommend an appropriate model for a given environment."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sort student answers by who made the decision."
   ],
   [
    12,
    "Teach",
    "Introduce subject, object and action. Present each model with one example and its main weakness. Write the \"who decides?\" guide on the board."
   ],
   [
    15,
    "Activity",
    "Run the who-decides card sort."
   ],
   [
    8,
    "Discuss",
    "Review tricky cards and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "Think of three places you are allowed or not allowed to enter: your friend's home, an airport gate, a concert. Who decided whether you could go in, and based on what?",
  "activity": {
   "title": "Who decides? card sort",
   "materials": "Printed scenario cards (about fifteen short access decisions), five column headers on the whiteboard labeled DAC, MAC, role-based, rule-based and ABAC, tape or sticky tack.",
   "steps": [
    "Groups receive a stack of scenario cards and, for each, write who or what makes the decision on the back.",
    "Groups tape each card under the model column they choose.",
    "The teacher reveals answers one column at a time; groups explain any card they placed differently.",
    "Each group picks one card and rewrites the scenario so it fits a different model, then trades with another group to classify."
   ]
  },
  "discussion": [
   "Why do most commercial operating systems default to DAC even though MAC is stronger?",
   "What problems might an organization hit if it tried to replace all its roles with ABAC policies?"
  ],
  "exit": [
   [
    "Which model uses labels and clearances that users cannot change?",
    "Mandatory access control (MAC)."
   ],
   [
    "A policy allows access only from managed devices during business hours for contractors. Which model?",
    "Attribute-based access control (ABAC)."
   ],
   [
    "Are firewall rules role-based or rule-based?",
    "Rule-based, because they apply uniformly to all matching traffic."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-line clue card for each model (owner, label, job, uniform rule, attributes) to use during the sort.",
   "Extend: Ask fast finishers to design access control for a school's grade system that combines at least two models and explain which decision each model handles."
  ]
 },
 {
  "t": "Physical vs logical access controls",
  "objectives": [
   "Students will be able to classify controls as physical or logical with examples of each.",
   "Students will be able to explain how physical access can defeat logical controls and how logical weaknesses can defeat physical controls.",
   "Students will be able to map identification, authentication, authorization and accountability to both a door and a login.",
   "Students will be able to recommend combined controls for a given scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers in two columns without labeling them yet; then reveal the labels physical and logical."
   ],
   [
    10,
    "Teach",
    "Present physical and logical control examples. Explain how physical access defeats passwords and why encryption and port controls matter. Show that badge systems are IT systems. Map the four access principles to a badge reader and a login."
   ],
   [
    20,
    "Activity",
    "Run the walk-through audit in small groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect findings to defense in depth."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "List everything that stands between a stranger on the street and the grades stored on this school's computers. Which items are things you can touch, and which are not?",
  "activity": {
   "title": "Walk-through audit",
   "materials": "A printed floor plan of a fictional small office marked with doors, a reception desk, an unlocked wiring closet, open network jacks, a server under a desk and a badge reader; sticky notes in two colors; projector to show the plan.",
   "steps": [
    "Groups study the floor plan and mark each weakness with a sticky note, using one color for physical gaps and another for logical gaps.",
    "For each weakness, groups write the attack it enables in one short phrase, such as \"plug in a rogue device\" or \"steal the server's drive.\"",
    "Groups propose one physical and one logical control for each of their top three weaknesses.",
    "Groups present one weakness where a single type of control would not be enough and explain how the two layers work together."
   ]
  },
  "discussion": [
   "Should the people who run building security and the people who run IT security report to the same leader? Why or why not?",
   "What could go wrong if a badge system was reachable from the internet?"
  ],
  "exit": [
   [
    "Is an 802.1X-protected network port a physical or a logical control?",
    "Logical, because the switch and authentication server enforce it in software and protocol."
   ],
   [
    "Name one way physical access can defeat a strong password.",
    "Booting from removable media, removing the drive, resetting the device, or installing a hardware keylogger."
   ],
   [
    "In the badge-and-PIN example, which step does the PIN provide?",
    "Authentication."
   ]
  ],
  "differentiation": [
   "Support: Provide a word bank of controls for students to sort into physical and logical columns before they start the floor plan audit.",
   "Extend: Ask fast finishers to describe an integrated alert that combines badge data and login data, and explain what suspicious event it would catch."
  ]
 },
 {
  "t": "Risk terms: asset, threat, vulnerability, likelihood, impact",
  "objectives": [
   "Students will be able to define asset, threat, threat actor, threat vector, vulnerability, exploit, likelihood, impact and risk.",
   "Students will be able to classify items in a scenario using correct risk vocabulary.",
   "Students will be able to explain how controls reduce risk by lowering likelihood, impact or both.",
   "Students will be able to prioritize two risks by reasoning about likelihood and impact."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the bike and write student words on the board, then attach the formal terms to them."
   ],
   [
    12,
    "Teach",
    "Define each term with one IT example. Show risk = likelihood x impact as a concept and threat x vulnerability x asset value as another view. Explain exposure, controls and risk appetite."
   ],
   [
    15,
    "Activity",
    "Run the label-the-scenario card game."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions; review any labels groups disagreed on."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "You park your expensive bike outside a busy train station overnight with a cheap lock. What could go wrong, how likely is it, and how bad would it be?",
  "activity": {
   "title": "Label the scenario",
   "materials": "Printed cards each containing one item (for example, \"customer database,\" \"ransomware gang,\" \"default admin password,\" \"phishing email,\" \"nightly backups,\" \"two days of downtime\"), header cards for asset, threat actor, threat vector, vulnerability, impact and control, a short printed scenario for prioritizing.",
   "steps": [
    "Groups sort the item cards under the correct header cards.",
    "For each control card, groups note whether it lowers likelihood, impact or both.",
    "Groups read a short scenario with two risks and rate each one low, medium or high for likelihood and impact.",
    "Groups decide which risk to treat first and write a one-sentence risk statement joining threat, vulnerability, asset and impact."
   ]
  },
  "discussion": [
   "Why is a long list of vulnerabilities from a scanner not the same as a list of risks?",
   "Can a single control reduce both likelihood and impact? Give an example."
  ],
  "exit": [
   [
    "Is a default password a threat or a vulnerability?",
    "A vulnerability."
   ],
   [
    "Which does a tested backup reduce: likelihood or impact?",
    "Impact."
   ],
   [
    "What is risk appetite?",
    "The amount and type of risk an organization is willing to accept in pursuit of its goals."
   ]
  ],
  "differentiation": [
   "Support: Provide a glossary strip with each term and a one-line everyday example for students to keep beside them during the card sort.",
   "Extend: Ask fast finishers to write three risk statements for the school's own systems and rank them, justifying likelihood and impact."
  ]
 },
 {
  "t": "Qualitative vs quantitative analysis: SLE, ARO, ALE",
  "objectives": [
   "Students will be able to compare qualitative and quantitative risk analysis, including the Delphi technique and risk matrices.",
   "Students will be able to calculate SLE, ARO and ALE from a scenario, converting frequencies correctly.",
   "Students will be able to determine whether a safeguard is cost-justified using ALE before, ALE after and annual cost.",
   "Students will be able to explain the limitations of quantitative inputs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the phone insurance warm-up and let students argue briefly before revealing the expected-loss reasoning."
   ],
   [
    12,
    "Teach",
    "Draw a five-by-five heat map and explain qualitative ratings and the Delphi technique. Then write AV, EF, SLE, ARO and ALE on the board and work the warehouse example. Show the safeguard value formula with the flood barrier."
   ],
   [
    18,
    "Activity",
    "Run the risk budget challenge in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to address input quality and hybrid approaches."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the exit questions without notes."
   ]
  ],
  "warmup": "You break your 600-dollar phone about once every three years. Phone insurance costs 300 a year and covers the full replacement. Should you buy it? Show your reasoning.",
  "activity": {
   "title": "Risk budget challenge",
   "materials": "Printed scenario cards with asset value, exposure factor, frequency and a proposed safeguard with annual cost and its effect; calculators or student laptops with a browser calculator; whiteboard for a class leaderboard.",
   "steps": [
    "Pairs receive three scenario cards and compute SLE, ARO and ALE for each before any safeguard.",
    "Pairs compute the ALE after each proposed safeguard and the safeguard's annual value.",
    "Pairs are given a fixed budget and choose which safeguards to fund, explaining their choice.",
    "Pairs swap one card with another pair to check each other's math, then the class compares choices on the board."
   ]
  },
  "discussion": [
   "If two experts disagree by a factor of ten on how often an event happens, what does that do to the ALE, and how should you handle it?",
   "When would you choose qualitative analysis even if you had time for quantitative?"
  ],
  "exit": [
   [
    "An event expected once every 10 years has what ARO?",
    "0.1."
   ],
   [
    "Asset value 100,000, EF 0.3, ARO 0.5. What is the ALE?",
    "SLE = 30,000; ALE = 30,000 x 0.5 = 15,000."
   ],
   [
    "A control reduces ALE from 20,000 to 8,000 and costs 15,000 a year. Is it justified financially?",
    "No. Its value is 20,000 - 8,000 - 15,000 = -3,000 a year."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a fill-in template with labeled boxes for AV, EF, SLE, ARO, ALE before, ALE after, cost and value.",
   "Extend: Ask fast finishers to identify a hidden cost (such as staff time or productivity loss) in one scenario and recalculate whether the safeguard is still justified."
  ]
 },
 {
  "t": "Risk treatment: avoid, mitigate, transfer, accept; residual risk and risk registers",
  "objectives": [
   "Students will be able to classify actions as risk avoidance, mitigation, transfer or acceptance.",
   "Students will be able to explain why transfer does not move accountability and why acceptance must be documented by an authorized person.",
   "Students will be able to distinguish inherent risk from residual risk.",
   "Students will be able to complete a risk register entry with owner, treatment and residual risk."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sort student answers into four unlabeled columns on the board; then reveal the labels avoid, mitigate, transfer and accept."
   ],
   [
    12,
    "Teach",
    "Define each treatment with an IT example, stressing that insurance does not transfer accountability and that ignoring is not accepting. Explain inherent and residual risk and show a sample risk register row on the projector."
   ],
   [
    15,
    "Activity",
    "Run the risk committee role-play using register cards."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to review the committee decisions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "Your school wants to hold an outdoor festival, but it might rain. List every possible way to deal with that risk.",
  "activity": {
   "title": "Risk committee role-play",
   "materials": "Printed blank risk register rows (description, asset, owner, likelihood, impact, inherent risk, treatment, controls, residual risk, accepted by, review date), printed risk scenario cards, role cards (risk owner, IT lead, finance, compliance).",
   "steps": [
    "Each group takes a risk scenario card and assigns roles. The IT lead proposes controls, finance comments on cost and insurance, compliance raises obligations, and the risk owner decides.",
    "The group chooses one or more treatments and fills in the register row, including inherent and residual risk ratings.",
    "The risk owner states aloud whether the residual risk is within appetite and signs the \"accepted by\" field, or sends it back for more treatment.",
    "The teacher hands each group a change card (for example, the system becomes internet-facing) and the group updates its register row."
   ]
  },
  "discussion": [
   "Why would an insurer want to see controls in place before selling cyber insurance?",
   "What could go wrong if a risk register were updated only once a year?"
  ],
  "exit": [
   [
    "Applying MFA to reduce the chance of account takeover is which treatment?",
    "Mitigation."
   ],
   [
    "Who can accept a significant risk?",
    "Someone with authority to accept that level of risk, such as the risk owner or senior management, with the decision documented."
   ],
   [
    "What is the difference between inherent and residual risk?",
    "Inherent risk is before controls; residual risk is what remains after controls."
   ]
  ],
  "differentiation": [
   "Support: Provide a sorting sheet of twelve short actions for struggling students to label with one of the four treatments before the role-play.",
   "Extend: Ask fast finishers to combine treatments for one complex risk and explain how each treatment changes likelihood, impact or who bears the financial loss."
  ]
 },
 {
  "t": "Frameworks: NIST RMF / SP 800-30, ISO 27005",
  "objectives": [
   "Students will be able to list the seven NIST RMF steps in order and state the purpose of each.",
   "Students will be able to describe the four-step NIST SP 800-30 risk assessment process.",
   "Students will be able to compare the RMF, SP 800-30 and ISO/IEC 27005 by scope and purpose.",
   "Students will be able to map ISO 27005 treatment terms to mitigate, accept, avoid and transfer."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect three or four answers on the whiteboard. Point out that everyone used a different method, which is the problem frameworks solve."
   ],
   [
    15,
    "Teach",
    "Walk through the RMF steps using the restaurant-permit analogy, writing each step on the board. Stress categorize before select and assess before authorize, and who signs the ATO. Then contrast SP 800-30 as the assessment engine and ISO 27005 as the international ISMS companion, ending with the treatment-term mapping."
   ],
   [
    15,
    "Activity",
    "Run the card sort described below. Circulate and ask groups to justify any card placement that looks shaky."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the frameworks to real organizational choices."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand it in at the door."
   ]
  ],
  "warmup": "Your manager asks you to decide whether a new web app is safe enough to launch. Write down the first three things you would do. Would a colleague in another office do the same three things?",
  "activity": {
   "title": "Framework card sort and sequence",
   "materials": "Printed cards (one set per group of three or four), whiteboard, markers, tape.",
   "steps": [
    "Give each group a shuffled deck containing the seven RMF steps, the four SP 800-30 steps, the ISO 27005 process stages and the eight treatment terms (modify, retain, avoid, share, mitigate, accept, avoid, transfer).",
    "Groups first separate the cards into three framework columns, then put each column in order.",
    "Groups pair each ISO 27005 treatment term with its common equivalent.",
    "Each group tapes one column on the whiteboard; the class compares and corrects any ordering errors.",
    "Finish by asking one group to explain why categorize must come before select and another why assess comes before authorize."
   ]
  },
  "discussion": [
   "Why do you think the RMF requires a senior official, rather than the security team, to accept residual risk?",
   "A company with offices in the US and Europe must satisfy both federal customers and an ISO 27001 auditor. How could it use these frameworks together without doing the work twice?"
  ],
  "exit": [
   [
    "List the seven RMF steps in order.",
    "Prepare, categorize, select, implement, assess, authorize, monitor."
   ],
   [
    "What is the purpose of NIST SP 800-30?",
    "To guide the conduct of risk assessments: prepare, conduct, communicate and maintain."
   ],
   [
    "Match ISO 27005 'share' and 'modify' to common treatment terms.",
    "Share is transfer; modify is mitigate."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially completed RMF sequence with the mnemonic printed on it, and have them fill in only the missing steps before attempting the full sort.",
   "Extend: Ask fast finishers to write a one-paragraph scenario for a fictional system and identify which RMF step, SP 800-30 activity and ISO 27005 stage each sentence of their scenario represents."
  ]
 },
 {
  "t": "Legal and regulatory concerns: privacy laws, breach notification, data residency",
  "objectives": [
   "Students will be able to define PII and explain the controller and processor roles under GDPR.",
   "Students will be able to explain why breach notification timelines make early legal involvement essential.",
   "Students will be able to distinguish data residency from data sovereignty and identify cloud residency risks.",
   "Students will be able to choose the appropriate practitioner action, preserve and escalate, in a legal scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take a quick show of hands, then ask two students to defend opposite answers."
   ],
   [
    15,
    "Teach",
    "Explain PII and privacy principles, controller versus processor, and sector laws such as HIPAA and GLBA, noting PCI DSS is contractual. Cover breach notification with emphasis on the clock starting at awareness and the effect of encryption. Finish with residency, sovereignty and the hidden-backup problem in cloud services."
   ],
   [
    15,
    "Activity",
    "Run the breach-clock role-play below, keeping strict time on each round."
   ],
   [
    5,
    "Discuss",
    "Debrief the role-play using the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on paper."
   ]
  ],
  "warmup": "A company in another country collects email addresses from people where you live. Do your local privacy laws apply to that company? Why or why not?",
  "activity": {
   "title": "The breach clock role-play",
   "materials": "Printed scenario cards, a projector or whiteboard with a visible countdown timer, sticky notes.",
   "steps": [
    "Split the class into small teams, each assigned a role: security analyst, legal counsel, privacy officer and communications lead.",
    "Project the first scenario card: a misconfigured cloud bucket exposed customer records, some of them EU residents, and backups are stored in another region.",
    "In a five-minute round, each role writes on sticky notes the actions they would take and the questions they need answered, placing them on a shared timeline on the whiteboard.",
    "Reveal a twist card: the data was encrypted, but the key was stored in the same bucket. Teams adjust their actions in a second round.",
    "Close by having each team identify the moment the notification clock started and who should decide on notification."
   ]
  },
  "discussion": [
   "Why might an organization prefer that only legal counsel decide whether a breach must be reported?",
   "What practical steps would you take to be sure regulated data and all of its copies stay in the required region?"
  ],
  "exit": [
   [
    "What is the difference between a data controller and a data processor?",
    "The controller decides why and how personal data is processed; the processor processes it on the controller's behalf."
   ],
   [
    "Why should legal counsel be involved early in a suspected breach?",
    "Notification deadlines often run from awareness, and counsel must determine obligations and timelines."
   ],
   [
    "Define data sovereignty.",
    "The principle that data is subject to the laws of the country where it is stored."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page glossary of PII, controller, processor, residency and sovereignty with a simple example for each, and pair students with a partner during the role-play.",
   "Extend: Ask advanced students to draft a short incident response plan section listing the steps, owners and decision points for a suspected personal data breach, without naming specific deadlines other than the GDPR example."
  ]
 },
 {
  "t": "Security assessments: vulnerability scanning (credentialed vs non-credentialed), pen testing, audits",
  "objectives": [
   "Students will be able to compare credentialed and non-credentialed scans by accuracy, false positives and viewpoint.",
   "Students will be able to distinguish vulnerability scanning, penetration testing and audits by purpose and depth.",
   "Students will be able to list the essential elements of rules of engagement.",
   "Students will be able to classify pen tests as black, white or gray box."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up prompt and let pairs discuss for two minutes, then share answers."
   ],
   [
    15,
    "Teach",
    "Use the house-inspector analogy to explain non-credentialed versus credentialed scans, then penetration testing with rules of engagement and black, white and gray box, then audits and independence. Emphasize written authorization every time."
   ],
   [
    15,
    "Activity",
    "Run the report comparison and rules-of-engagement exercise below."
   ],
   [
    5,
    "Discuss",
    "Lead a discussion with the questions provided."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "You want to know whether your house is safe from burglars. Would you rather have someone check the outside, check the inside with a key, actually try to break in, or review whether you followed your insurance policy's rules? What does each tell you?",
  "activity": {
   "title": "Two reports and a permission slip",
   "materials": "Projector, two printed fictional scan report excerpts (one non-credentialed, one credentialed, same host), blank rules-of-engagement template handout.",
   "steps": [
    "Project or hand out the two short report excerpts for the same fictional server. Groups list what the credentialed report found that the non-credentialed one missed, and any finding that looks like a false positive.",
    "Groups explain in one sentence why the results differ.",
    "Hand out the blank rules-of-engagement template. Groups fill it in for a fictional gray-box test of the college web portal: scope, exclusions, techniques allowed, time window, emergency contact, data handling and who signs.",
    "Two groups read out their rules of engagement; the class identifies anything missing.",
    "Close by asking which assessment type would answer the board's question 'Do we comply with our own policy?' (an audit)."
   ]
  },
  "discussion": [
   "Why might an organization still run non-credentialed external scans if credentialed scans are more accurate?",
   "What could go wrong during a penetration test that rules of engagement are designed to prevent?"
  ],
  "exit": [
   [
    "Which scan type gives fewer false positives and why?",
    "Credentialed, because it reads installed software and configuration directly instead of inferring from network responses."
   ],
   [
    "What does a penetration test show that a vulnerability scan does not?",
    "Whether weaknesses can actually be exploited and what real impact an attacker could achieve."
   ],
   [
    "Name four items that belong in rules of engagement.",
    "Any four of: scope, targets, exclusions, permitted techniques, timing, emergency contacts, stop procedure, data handling, authorizing signature."
   ]
  ],
  "differentiation": [
   "Support: Give students a three-column chart (scan, pen test, audit) with rows for purpose, who performs it, depth and risk, and let them fill it in during the teach segment.",
   "Extend: Have fast finishers write a short memo to the dean explaining why the vendor's unauthenticated scan result is not proof of good security and recommending a balanced assessment program."
  ]
 },
 {
  "t": "Vulnerability management: CVE/CVSS, prioritization, false positives, remediation tracking",
  "objectives": [
   "Students will be able to explain the difference between CVE identifiers and CVSS scores.",
   "Students will be able to prioritize vulnerabilities using severity, asset value, exposure and active exploitation.",
   "Students will be able to describe how to handle false positives and false negatives.",
   "Students will be able to outline remediation tracking steps from ticket to verified closure."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up prompt and have students vote on which car problem to fix first, then reveal it depends on context."
   ],
   [
    15,
    "Teach",
    "Walk through the vulnerability management cycle, CVE versus CVSS with the rating bands, prioritization factors, false positives and negatives, mitigation versus remediation, and tracking metrics."
   ],
   [
    15,
    "Activity",
    "Run the triage-the-backlog exercise below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to debrief group choices."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You own two cars. One has a serious engine recall but is in storage with no keys. The other has a moderate brake recall and you drive it every day. Which do you fix first, and what does that tell you about severity scores?",
  "activity": {
   "title": "Triage the backlog",
   "materials": "Printed cards for ten fictional findings (each with host, CVSS score, exposure, data type, exploit status and any compensating control), whiteboard, markers.",
   "steps": [
    "Give each group the same ten finding cards and tell them the patch team can only handle four this week.",
    "Groups first sort the cards by CVSS score alone, then re-sort them using risk factors, and note how the order changes.",
    "Two cards are marked 'disputed by owner.' Groups decide how they would validate them and what they would document if they are false positives.",
    "For one finding with no patch available, groups write a mitigation plan, a risk acceptance owner and an expiration date.",
    "Each group posts its top four on the whiteboard and justifies its choices; the class compares rankings."
   ]
  },
  "discussion": [
   "What risks come from suppressing scanner findings, and how can documentation reduce those risks?",
   "Which metric would you show an executive to prove the program is improving, and why?"
  ],
  "exit": [
   [
    "Does a CVE entry tell you how severe a vulnerability is?",
    "No. CVE identifies it; severity comes from CVSS scoring."
   ],
   [
    "Name three factors besides CVSS that affect remediation priority.",
    "Any three of: asset value or data sensitivity, exposure such as internet-facing, active exploitation or exploit availability, compensating controls, business impact."
   ],
   [
    "What should happen before a remediation ticket is closed?",
    "A rescan or other verification confirming the vulnerability is fixed."
   ]
  ],
  "differentiation": [
   "Support: Provide a simple scoring worksheet that adds points for internet exposure, sensitive data and active exploitation to help students rank the cards consistently.",
   "Extend: Ask advanced students to draft a remediation policy table with timelines by severity and asset criticality, and explain how they would handle exceptions."
  ]
 },
 {
  "t": "Monitoring platforms: SIEM, log sources, time synchronization, log integrity",
  "objectives": [
   "Students will be able to describe the SIEM functions of collection, normalization, correlation and alerting.",
   "Students will be able to identify at least five valuable log sources and what each reveals.",
   "Students will be able to explain why NTP time synchronization is essential to correlation and evidence.",
   "Students will be able to list controls that protect log integrity."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch student answers as a timeline on the board."
   ],
   [
    15,
    "Teach",
    "Explain SIEM functions with the security-desk analogy, survey key log sources, then cover NTP and UTC with the Harbor Credit Union timeline, and finish with log integrity controls and monitoring the monitoring."
   ],
   [
    15,
    "Activity",
    "Run the timeline reconstruction exercise below."
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
  "warmup": "Three witnesses describe a car accident, but each one's watch is set to a different time. How would you figure out what really happened first?",
  "activity": {
   "title": "Rebuild the timeline",
   "materials": "Printed log excerpt cards from four fictional sources (VPN, domain controller, firewall, file server), with one source's clock offset by several minutes and one source showing a gap; whiteboard; sticky notes.",
   "steps": [
    "Give each group the four sets of log excerpt cards and tell them the VPN's clock is known to be seven minutes slow.",
    "Groups copy each event onto a sticky note, correct the offset, and arrange all events on a single whiteboard timeline.",
    "Groups identify what pattern a correlation rule should detect, such as failed logins followed by a success and a large file transfer.",
    "Groups notice the file server gap and propose which integrity controls would have preserved the missing events.",
    "Each group presents its corrected timeline in one minute; the class agrees on the most likely sequence."
   ]
  },
  "discussion": [
   "If your budget only allowed five log sources in the SIEM, which would you choose and why?",
   "Who should have permission to delete logs in your organization, and why should it not be the system administrators?"
  ],
  "exit": [
   [
    "Name two things a SIEM does to raw logs before alerting.",
    "Normalizes them into common fields and correlates events across sources."
   ],
   [
    "What protocol keeps clocks aligned, and why does it matter?",
    "NTP; without aligned time, correlation fails and timelines and evidence become unreliable."
   ],
   [
    "Give two log integrity controls.",
    "Any two of: prompt central forwarding, restricted access, immutable storage, hashing or signing, encryption in transit, alerting on cleared logs or missing sources."
   ]
  ],
  "differentiation": [
   "Support: Pre-sort the log cards by source and give struggling groups the corrected time for the first event as a model.",
   "Extend: Ask fast finishers to write a plain-language correlation rule (conditions, time window, threshold) for the attack pattern they found and to explain one way it could produce false positives."
  ]
 },
 {
  "t": "Baselines, anomalies and alert tuning",
  "objectives": [
   "Students will be able to explain how to build and maintain a representative monitoring baseline.",
   "Students will be able to compare anomaly-based and signature-based detection by strengths and weaknesses.",
   "Students will be able to classify alert outcomes as true or false positives and negatives.",
   "Students will be able to propose narrow, documented tuning changes that reduce noise without creating blind spots."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a car alarm and list student reactions on the board."
   ],
   [
    15,
    "Teach",
    "Cover baselines and representative periods, anomaly versus signature detection, the four alert outcomes with a two-by-two grid on the board, alert fatigue, and tuning techniques with the smoke-detector analogy."
   ],
   [
    15,
    "Activity",
    "Run the tune-this-rule workshop below."
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
  "warmup": "A car alarm on your street goes off every night for no reason. After a week, what do you and your neighbors do when you hear it? What happens the night a thief actually tries the door?",
  "activity": {
   "title": "Tune this rule",
   "materials": "Printed handout with a fictional week of alert data for one noisy rule (time, account, host, outcome), whiteboard, markers.",
   "steps": [
    "Groups review the alert data and classify a sample of ten alerts as true positive or false positive.",
    "Groups identify patterns behind the false positives, such as a scanner address, a shift team or a scheduled job.",
    "Groups write one or two tuning changes in plain language, specifying exactly which accounts, hosts and times are excluded, the justification and a review date.",
    "Groups swap proposals with another group, which tries to describe how an attacker could hide inside the proposed exclusion.",
    "Groups refine their tuning based on the critique and share their final rule with the class."
   ]
  },
  "discussion": [
   "Who should approve tuning changes in a security operations center, and why should it not be only the analyst who is tired of the alerts?",
   "How often should baselines be reviewed, and what business events should trigger an update?"
  ],
  "exit": [
   [
    "What is a false negative?",
    "A real attack that the detection did not alert on."
   ],
   [
    "Give one strength and one weakness of anomaly-based detection.",
    "Strength: can detect new or unknown attacks. Weakness: more false positives because unusual is not always malicious."
   ],
   [
    "Why must exclusions be narrow and documented?",
    "Broad or undocumented exclusions create blind spots attackers can exploit and cannot be reviewed or revisited."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-by-two outcome grid template and a list of tuning techniques for students to choose from while working on the handout.",
   "Extend: Ask fast finishers to define two metrics for alert quality, explain how each would reveal over-tuning or under-tuning, and propose a monthly review process."
  ]
 },
 {
  "t": "Analyzing and reporting monitoring results; escalation",
  "objectives": [
   "Students will be able to triage an alert by gathering context and classifying the outcome.",
   "Students will be able to document an alert decision with observation, evidence, reasoning and timestamps.",
   "Students will be able to apply defined escalation criteria and choose an appropriate channel.",
   "Students will be able to tailor a monitoring report to technical and executive audiences."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about calling for help and collect reasons people hesitate."
   ],
   [
    15,
    "Teach",
    "Walk through triage and context gathering, the three outcomes, documentation standards with a good and a bad note side by side on the projector, SOC tiers and escalation criteria, out-of-band channels, and audience-appropriate reporting."
   ],
   [
    15,
    "Activity",
    "Run the SOC shift simulation below."
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
  "warmup": "Think of a time you were unsure whether to ask for help at work or school. What made you hesitate, and what happened? How might that hesitation play out for a security analyst at midnight?",
  "activity": {
   "title": "SOC shift simulation",
   "materials": "Printed alert cards (six fictional alerts with context clues), a printed escalation criteria sheet, a projector, sticky notes.",
   "steps": [
    "Pairs play tier 1 analysts and receive six alert cards and the escalation criteria sheet.",
    "For each alert, pairs decide false positive, benign true positive or suspicious, and write a two-sentence case note including what they checked.",
    "Pairs mark which alerts meet escalation criteria and which channel they would use to escalate.",
    "Pick one escalated alert; each pair writes a three-sentence summary for an executive audience.",
    "Project a few case notes and executive summaries; the class critiques them for completeness and audience fit."
   ]
  },
  "discussion": [
   "How can a SOC build a culture where analysts are not afraid to escalate something that turns out to be benign?",
   "What should a report to executives leave out, and why?"
  ],
  "exit": [
   [
    "What are the three common outcomes of alert triage?",
    "False positive, benign true positive, or suspicious or malicious activity requiring action."
   ],
   [
    "You are unsure whether an alert is serious and it involves sensitive data. What do you do?",
    "Document it and escalate according to the defined procedure."
   ],
   [
    "When should you use out-of-band communication?",
    "When the normal channel, such as corporate email, may be compromised or monitored by an attacker."
   ]
  ],
  "differentiation": [
   "Support: Provide a case note template with fields for observed, checked, evidence, conclusion, reasoning, action and time, and let students fill in the fields for each alert.",
   "Extend: Ask fast finishers to draft escalation criteria for a fictional small business SOC with only two analysts, including after-hours contacts and backup paths."
  ]
 },
 {
  "t": "Incident lifecycle: preparation, detection & analysis, containment, eradication, recovery, lessons learned",
  "objectives": [
   "Students will be able to list the incident response phases in order and explain the purpose of each.",
   "Students will be able to classify response actions into the correct phase.",
   "Students will be able to justify why containment precedes eradication and eradication precedes recovery.",
   "Students will be able to describe how lessons learned feeds back into preparation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a kitchen fire and write student steps on the board in the order given."
   ],
   [
    15,
    "Teach",
    "Walk through each phase with the burst-pipe analogy and the Oakmont Library ransomware story, emphasizing isolate versus power off, scoping before eradication, verified clean backups, and the cycle back to preparation."
   ],
   [
    15,
    "Activity",
    "Run the action card sort below."
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
  "warmup": "There is a small fire on your stove. List, in order, everything you would do from before it started to the day after.",
  "activity": {
   "title": "Which phase is it?",
   "materials": "Printed action cards (about 20 fictional response actions), six phase header cards, tape, whiteboard.",
   "steps": [
    "Tape the six phase header cards across the whiteboard in random order and ask the class to put them in the correct sequence.",
    "Give each group a shuffled set of action cards such as 'block the C2 domain,' 'write the phishing playbook,' 'restore from verified backup,' 'remove malicious scheduled task' and 'update training after review.'",
    "Groups place each card under the correct phase and must agree on any disputed card.",
    "Introduce a wrinkle: one card says 'wipe the first infected laptop immediately.' Groups decide whether it is acceptable and where it might belong later.",
    "Review placements as a class, asking groups to explain one card each."
   ]
  },
  "discussion": [
   "Why do you think preparation is the most neglected phase in many organizations?",
   "How can a team keep a lessons-learned meeting blameless while still holding people accountable?"
  ],
  "exit": [
   [
    "List the incident response phases in order.",
    "Preparation, detection and analysis, containment, eradication, recovery, lessons learned."
   ],
   [
    "Disabling a compromised account belongs to which phase?",
    "Containment (short-term)."
   ],
   [
    "Why must you identify every affected system before eradication?",
    "If the attacker remains on any system, they can reinfect cleaned systems."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students the phase order with the mnemonic printed on their desk and a short definition of each phase to refer to while sorting cards.",
   "Extend: Ask fast finishers to write a one-page playbook outline for a lost unencrypted laptop incident, showing the actions they would take in each phase."
  ]
 },
 {
  "t": "Events vs incidents, triage and escalation",
  "objectives": [
   "Students will be able to distinguish events, adverse events, incidents and breaches.",
   "Students will be able to assign a severity level using functional impact, information impact and recoverability.",
   "Students will be able to differentiate functional and hierarchical escalation and choose the right one.",
   "Students will be able to explain why severity is re-evaluated as facts emerge."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sort student answers into 'normal' and 'emergency' columns on the board."
   ],
   [
    15,
    "Teach",
    "Define event, adverse event, incident and breach using nested circles on the board. Explain triage factors, categories and severity levels, then functional versus hierarchical escalation using the emergency room analogy."
   ],
   [
    15,
    "Activity",
    "Run the triage desk exercise below."
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
  "warmup": "Name three things that happen on your phone every day that are completely normal, and one thing that would make you worry your phone had been hacked. What makes that one different?",
  "activity": {
   "title": "The triage desk",
   "materials": "Printed scenario cards (twelve short fictional situations), a printed severity matrix with four levels, sticky notes in two colors, whiteboard.",
   "steps": [
    "Give each group the scenario cards and the severity matrix.",
    "Groups label each card as event, adverse event, incident or breach.",
    "For each incident, groups assign a severity level using functional impact, information impact and recoverability, writing their reasoning on a sticky note.",
    "Groups mark which incidents need functional escalation, hierarchical escalation or both, using different colored sticky notes.",
    "Hand out two update cards that add new facts to earlier scenarios; groups re-evaluate severity and explain the change to the class."
   ]
  },
  "discussion": [
   "What could go wrong if each analyst used their own judgment instead of a shared severity matrix?",
   "Can you think of a situation where an incident should be downgraded? What evidence would justify that?"
  ],
  "exit": [
   [
    "Define a security incident.",
    "A violation or imminent threat of violation of security policy or practice, or an event that jeopardizes confidentiality, integrity or availability."
   ],
   [
    "Name the three NIST-style impact factors used in triage.",
    "Functional impact, information impact and recoverability."
   ],
   [
    "A case needs approval to take a revenue system offline. Which kind of escalation is that?",
    "Hierarchical escalation."
   ]
  ],
  "differentiation": [
   "Support: Provide a flowchart with yes or no questions (Is there a negative consequence? Is a policy violated or CIA threatened? Is protected data confirmed exposed?) to help students classify each card.",
   "Extend: Ask fast finishers to design their own four-level severity matrix for a small hospital, with one example incident and the required notification list for each level."
  ]
 },
 {
  "t": "Incident response plan, roles and communications",
  "objectives": [
   "Students will be able to list the key components of an incident response plan.",
   "Students will be able to describe core and extended CSIRT roles and their responsibilities.",
   "Students will be able to apply communication rules, including out-of-band channels and authorized spokespeople.",
   "Students will be able to explain the purpose of tabletop and functional exercises."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a school fire drill and list the roles students name."
   ],
   [
    15,
    "Teach",
    "Present IRP components, then core and extended team roles using the theater run-sheet analogy, then internal and external communication rules, and finish with exercise types and plan maintenance."
   ],
   [
    15,
    "Activity",
    "Run the tabletop exercise below."
   ],
   [
    5,
    "Discuss",
    "Debrief using the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "During a school fire drill, who does what? Who talks to parents if a reporter shows up? What happens if the intercom stops working?",
  "activity": {
   "title": "Mini tabletop: the compromised mailbox",
   "materials": "Printed role cards (incident commander, analyst, legal counsel, HR, communications, scribe, executive), printed scenario injects, a projector or whiteboard for the timeline.",
   "steps": [
    "Divide the class into teams of six or seven and hand out role cards with a short description of each role's responsibilities.",
    "Read the opening inject: executive mailboxes have been accessed by an unknown party for a week.",
    "Every three minutes, read a new inject: a reporter calls, a technician starts deleting evidence, the CEO wants to email all staff. Each role states what they would do; the scribe records decisions with times.",
    "After the final inject, teams review their scribe's log and identify one gap in their plan, such as unclear authority or missing contacts.",
    "Each team shares its gap and the plan change they would make."
   ]
  },
  "discussion": [
   "Why is it dangerous for well-meaning staff to take action on their own during an incident?",
   "What should an incident response plan say about who may contact law enforcement, and why?"
  ],
  "exit": [
   [
    "Name three components of an incident response plan.",
    "Any three of: purpose and scope, definitions and severity levels, team authority, roles, escalation and contacts, communication guidelines, playbooks, evidence handling, metrics, testing and maintenance."
   ],
   [
    "What does the scribe do?",
    "Keeps a timestamped record of actions, findings and decisions during the response."
   ],
   [
    "A reporter calls a help desk technician about an incident. What should the technician do?",
    "Politely refer the reporter to the authorized spokesperson or communications team without confirming details."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a role card with three specific example actions they might take, so they can participate confidently in the tabletop.",
   "Extend: Ask fast finishers to write a one-page communication section for an IRP, covering internal updates, out-of-band channels, external statements, law enforcement and regulator notifications."
  ]
 },
 {
  "t": "Forensics: order of volatility, evidence handling, chain of custody",
  "objectives": [
   "Students will be able to arrange common evidence sources according to the order of volatility.",
   "Students will be able to explain why memory capture often precedes shutdown.",
   "Students will be able to describe proper evidence handling practices for a first responder.",
   "Students will be able to complete a chain of custody record and identify gaps that threaten admissibility."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a crime scene in the snow and collect answers."
   ],
   [
    15,
    "Teach",
    "Present the RFC 3227 order of volatility with the mnemonic, explain why RAM matters, cover first responder evidence handling practices, then chain of custody and admissibility with a sample form on the projector."
   ],
   [
    15,
    "Activity",
    "Run the evidence relay activity below."
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
  "warmup": "Police arrive at a crime scene during a snowstorm. There are footprints in the snow, a broken window and a security camera recording. What would you document first, and why?",
  "activity": {
   "title": "Evidence relay and custody audit",
   "materials": "Printed cards naming evidence sources (registers, RAM, swap, disk, remote logs, network topology, backup tapes), sealed envelopes as mock evidence, blank chain of custody forms, a timer.",
   "steps": [
    "Groups race to arrange the evidence source cards in order of volatility; the first correct group explains its reasoning.",
    "Give each group a sealed envelope labeled as a seized hard drive and a blank chain of custody form.",
    "The envelope passes through four students in roles (first responder, transporter, evidence custodian, examiner); each fills in their transfer line with name, date, time, location and purpose.",
    "The teacher secretly arranges for one group's envelope to sit unattended for a moment without a logged transfer.",
    "Groups swap forms and audit another group's chain, identifying any gaps and explaining how a defense lawyer might use them."
   ]
  },
  "discussion": [
   "When might it be reasonable to shut down a compromised system rather than keep it running for memory capture?",
   "Why should organizations apply chain of custody even to internal investigations that may never reach court?"
  ],
  "exit": [
   [
    "Put these in order of volatility: disk, RAM, backup tapes.",
    "RAM, disk, backup tapes."
   ],
   [
    "Give two evidence handling practices for a first responder.",
    "Any two of: use trusted tools from external media, photograph the scene, note system time offset, record every action, bag and tag items, work only on verified copies."
   ],
   [
    "What can make otherwise valid evidence inadmissible?",
    "A broken or incomplete chain of custody that leaves its integrity in doubt."
   ]
  ],
  "differentiation": [
   "Support: Provide a pre-labeled volatility ladder graphic with two items already placed, and let students place the rest before attempting it from memory.",
   "Extend: Ask fast finishers to write a one-page first responder checklist for a suspected compromised server, in the correct order, including what they would document at each step."
  ]
 },
 {
  "t": "Forensic imaging, write blockers, hash verification",
  "objectives": [
   "Students will be able to explain why a bit-for-bit forensic image is required instead of a file copy.",
   "Students will be able to describe how write blockers protect evidence and compare hardware and software types.",
   "Students will be able to use hash values to verify an image's integrity and interpret a mismatch.",
   "Students will be able to justify the use of master and working copies."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about photocopying and record student ideas."
   ],
   [
    15,
    "Teach",
    "Explain forensic images, unallocated and slack space, write blockers, raw versus E01 formats, master and working copies, and hash verification with SHA-256 versus MD5 and SHA-1, using the museum manuscript analogy."
   ],
   [
    15,
    "Activity",
    "Run the hash it yourself lab below."
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
  "warmup": "If you photocopied a contract and someone later claimed you altered the copy, how could you prove it was identical to the original?",
  "activity": {
   "title": "Hash it yourself",
   "materials": "Student laptops with a browser and a built-in command line, or any browser-based SHA-256 text hashing tool the teacher has checked in advance; projector; printed short paragraph of text.",
   "steps": [
    "Students type the printed paragraph exactly into a text file or the hashing tool and compute its SHA-256 value.",
    "Pairs compare their hashes; any mismatch leads them to find the typo, showing how one character changes the whole value.",
    "Each student changes a single letter and recomputes, noting how different the new hash is.",
    "On the projector, show two printed custody records for an image, one with matching source and image hashes and one with a mismatch. Pairs decide which image is usable and what the examiner should do about the other.",
    "Close with a whiteboard sketch of the imaging workflow: original drive, write blocker, workstation, master image, working copy, hash recorded at each step."
   ]
  },
  "discussion": [
   "Why might a court trust an image verified with SHA-256 more than one verified only with MD5?",
   "What could happen to a case if an examiner analyzed the original drive directly instead of a working copy?"
  ],
  "exit": [
   [
    "What does a forensic image capture that a file copy does not?",
    "Unallocated space, slack space and deleted file remnants, along with an exact bit-level copy that does not alter metadata."
   ],
   [
    "What is the purpose of a write blocker?",
    "To allow reading from evidence media while preventing any writes that could alter it."
   ],
   [
    "The source and image hashes do not match. Can the image be used as evidence?",
    "No. It is not an exact copy; the examiner should investigate, re-image and verify again."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of the imaging workflow with blanks for students to fill in the device or step names, and pair them with a partner for the hashing lab.",
   "Extend: Ask fast finishers to explain in writing what a hash collision is, why it weakens MD5 for evidence, and why recording multiple hash algorithms is sometimes done."
  ]
 },
 {
  "t": "Legal considerations in investigations",
  "objectives": [
   "Students will be able to distinguish administrative, criminal, civil and regulatory investigations and state the standard of proof for criminal and civil cases.",
   "Students will be able to explain how acceptable use policies, logon banners and consent establish authority to monitor and search.",
   "Students will be able to apply legal hold, chain of custody and evidence admissibility concepts to a workplace scenario.",
   "Students will be able to differentiate enticement from entrapment with examples."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the whiteboard without judging them. Say: by the end of class you will know which of these steps could get the company sued."
   ],
   [
    12,
    "Teach",
    "Walk through the four investigation types with a table on the board: who leads, standard of proof, typical outcome. Then cover authority (AUP, banners, consent, court orders), rules of evidence and chain of custody, and finish with legal hold, eDiscovery, enticement versus entrapment and breach notification."
   ],
   [
    18,
    "Activity",
    "Run the Stop or Go card sort described below. Circulate and ask groups to justify each placement out loud."
   ],
   [
    5,
    "Discuss",
    "Bring the class together and debate the two discussion questions, steering toward the idea that legal counsel is the first call when privacy or litigation is involved."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand it in at the door."
   ]
  ],
  "warmup": "Your manager says a coworker is stealing customer lists and asks you to go through her work laptop, her company email and her personal phone today. Which of these would you feel comfortable doing, and what would you want to have first?",
  "activity": {
   "title": "Stop or Go: investigation action card sort",
   "materials": "Printed cards (one action per card), whiteboard divided into Go, Stop and ask legal, and Never columns, sticky notes.",
   "steps": [
    "Prepare about 14 cards, such as: review company email under an acknowledged AUP; image a personal phone without consent; suspend mailbox deletion after a lawsuit threat; run a honeypot file share; persuade a suspect to download a file so you can catch him; hand the original disk to an analyst without logging it; work from a hashed forensic image.",
    "In groups of three or four, students sort each card into Go, Stop and ask legal, or Never, writing a one-line reason on a sticky note for each.",
    "Each group places two of its most debated cards on the class board and explains the reasoning.",
    "The teacher reveals the expected placement, highlighting where authority, privacy, chain of custody or entrapment drove the answer."
   ]
  },
  "discussion": [
   "Why should evidence from a routine HR policy case be handled as carefully as evidence in a criminal case?",
   "Where should an organization draw the line on monitoring personal devices used for work, and how should that be communicated to staff?"
  ],
  "exit": [
   [
    "Which standard of proof applies to a civil lawsuit over stolen trade secrets?",
    "Preponderance of the evidence: the claim is more likely true than not."
   ],
   [
    "What two documents typically establish an organization's right to monitor company systems?",
    "An acknowledged acceptable use policy and logon banners stating there is no expectation of privacy."
   ],
   [
    "A company leaves an unprotected fake server online to observe attackers. Is this enticement or entrapment?",
    "Enticement, because it only offers an opportunity and does not induce anyone to commit a crime."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page reference table of investigation types, standards of proof and key terms to use during the card sort, and pair them with a confident partner.",
   "Extend: Ask fast finishers to draft a short logon banner and a three-step legal hold procedure for their own organization, then explain how each supports admissibility."
  ]
 },
 {
  "t": "Business impact analysis: MTD, RTO, RPO",
  "objectives": [
   "Students will be able to describe the purpose and main steps of a business impact analysis.",
   "Students will be able to define MTD, RTO, RPO and WRT and explain who sets each one.",
   "Students will be able to calculate whether a proposed RTO fits within an MTD after accounting for WRT.",
   "Students will be able to select a backup or replication frequency that satisfies a given RPO."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list the class's answers on the board, then group them into downtime answers and lost-data answers."
   ],
   [
    12,
    "Teach",
    "Draw a horizontal timeline with the failure in the middle. Mark RPO to the left (last good data) and RTO, WRT and MTD to the right. Explain each term, who owns it, and the rule RTO plus WRT must not exceed MTD. Briefly contrast MTBF and MTTR."
   ],
   [
    18,
    "Activity",
    "Run the Mini BIA workshop described below. Circulate and check that groups justify their MTDs in business terms."
   ],
   [
    5,
    "Discuss",
    "Groups share their most expensive objective and discuss whether the business would really pay for it."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on paper."
   ]
  ],
  "warmup": "If the school's or your workplace's main system went down right now, how long could everyone cope before it became a real crisis, and how much recent work could you afford to lose?",
  "activity": {
   "title": "Mini BIA workshop for a fictional company",
   "materials": "Printed one-page profile of a fictional small business listing five processes (online orders, payroll, email, customer support phone line, marketing website), whiteboard, markers, sticky notes.",
   "steps": [
    "In groups of three or four, students read the profile and rank the five processes by business impact if each stopped for one hour, one day and one week.",
    "For each process, the group proposes an MTD with a one-sentence business reason, an RPO, an estimated WRT and an RTO that fits the rule RTO plus WRT not exceeding MTD.",
    "Each group writes its numbers on a shared board table, then suggests one backup or replication approach that would meet each RPO.",
    "The teacher compares tables across groups, highlighting where different MTDs came from different business assumptions and correcting any RTO that breaks the MTD rule."
   ]
  },
  "discussion": [
   "Why might two departments argue about the MTD of the same system, and who should settle the argument?",
   "When is it reasonable for management to accept a longer RTO or RPO than the business would ideally like?"
  ],
  "exit": [
   [
    "An order system has an MTD of 12 hours and a WRT of 3 hours. What is the longest acceptable RTO?",
    "9 hours, because RTO plus WRT must not exceed MTD."
   ],
   [
    "Which objective determines how often you back up data?",
    "The RPO, because it sets the maximum acceptable data loss."
   ],
   [
    "Who is responsible for setting MTD, and why?",
    "Senior management or business owners, because it reflects business tolerance for disruption rather than a technical limit."
   ]
  ],
  "differentiation": [
   "Support: Provide a pre-drawn timeline template with labeled boxes for RPO, RTO, WRT and MTD so students can place values before calculating.",
   "Extend: Ask fast finishers to add dependencies, such as a payment provider or a shared database, and explain how a dependency's RTO constrains the processes that rely on it."
  ]
 },
 {
  "t": "BCP vs DRP; recovery sites: hot, warm, cold, cloud",
  "objectives": [
   "Students will be able to explain the difference in scope between a business continuity plan and a disaster recovery plan.",
   "Students will be able to compare hot, warm, cold, mobile, mirrored, reciprocal and cloud recovery options by cost and recovery time.",
   "Students will be able to select an appropriate recovery site for a system given its RTO, RPO and budget.",
   "Students will be able to identify the main components of a BCP and a DRP, including failback."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question. Sort student answers on the board into technology needs and people or business needs."
   ],
   [
    12,
    "Teach",
    "Draw two nested circles: BCP outside, DRP inside. List components of each. Then draw a cost versus recovery time line and place mirrored, hot, cloud, warm, mobile, cold and reciprocal along it, explaining trade-offs and geographic separation."
   ],
   [
    18,
    "Activity",
    "Run the Pick the Site matching activity below, with groups defending their choices."
   ],
   [
    5,
    "Discuss",
    "Lead a short debate on the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions individually."
   ]
  ],
  "warmup": "Imagine our building is closed for a month starting tomorrow. List everything that would need to happen for work to continue. Which items involve computers, and which do not?",
  "activity": {
   "title": "Pick the Site: matching systems to recovery options",
   "materials": "Printed scenario cards describing six fictional systems with RTO, RPO and budget notes; printed option cards for hot, warm, cold, mobile, mirrored, reciprocal and cloud DRaaS; whiteboard.",
   "steps": [
    "Groups of three receive the six scenario cards, such as a trading platform with a 15-minute RTO, an HR archive with a 3-week RTO and a small budget, and a field office hit regularly by storms.",
    "Groups match each scenario to the most suitable recovery option and write one sentence on cost, recovery speed and any risk such as shared regional exposure.",
    "For one scenario, each group lists three BCP items that are not technology, such as staff relocation or customer messaging.",
    "Groups present one match each; the teacher confirms or corrects, emphasizing the RTO-to-site mapping and the limits of reciprocal agreements."
   ]
  },
  "discussion": [
   "Why might an organization choose a cloud DRaaS solution over a traditional hot site, and what new risks does that choice introduce?",
   "Why is failback sometimes harder than failover, and how should a DRP prepare for it?"
  ],
  "exit": [
   [
    "Which plan covers employee relocation and customer communications during a disaster?",
    "The business continuity plan."
   ],
   [
    "A system has a 3-day RTO and a tight budget. Which site type is the best fit?",
    "A warm site, which balances cost against recovery within hours to days; a cold site may be too slow."
   ],
   [
    "Name one weakness of a reciprocal agreement.",
    "It is hard to enforce, or the partner may lack spare capacity or be affected by the same disaster."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference strip that lists each site type with its typical recovery time and relative cost, to use during matching.",
   "Extend: Ask fast finishers to design a mixed recovery strategy for the whole fictional company and estimate which systems would share a site, justifying the choices with the BIA objectives."
  ]
 },
 {
  "t": "Backup types (full, incremental, differential) and restore testing",
  "objectives": [
   "Students will be able to compare full, incremental and differential backups by backup time, storage use and restore requirements.",
   "Students will be able to determine which backup sets are needed to restore data on a given day.",
   "Students will be able to explain the 3-2-1 rule and why snapshots are not a complete backup strategy.",
   "Students will be able to design a basic restore testing routine that verifies data against the RTO."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and take a quick show of hands, then ask one student who answered no to explain why."
   ],
   [
    12,
    "Teach",
    "Draw a Sunday-to-Saturday calendar on the board. Show full, incremental and differential schedules with colored blocks, and work through which sets restore Thursday. Cover the archive bit, snapshots, synthetic fulls, 3-2-1, immutable copies, grandfather-father-son and why restore testing matters."
   ],
   [
    18,
    "Activity",
    "Run the Restore Relay activity described below."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions, drawing out real-world reasons restore tests get skipped."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card or sticky note."
   ]
  ],
  "warmup": "Have you ever lost a file you thought was backed up, or found that a backup or cloud sync did not have what you expected? What went wrong?",
  "activity": {
   "title": "Restore Relay",
   "materials": "Printed calendar cards for three fictional backup schedules (full nightly; full Sunday plus incrementals; full Sunday plus differentials), sticky notes, whiteboard.",
   "steps": [
    "Divide the class into teams of three. Each team gets the three schedule cards and a failure scenario card, such as a server failing Friday morning.",
    "Teams list exactly which backup sets they need to restore under each schedule and in what order, writing each set on a sticky note and lining them up.",
    "The teacher then adds a twist card, such as Tuesday's incremental is corrupted or the backup server was encrypted by ransomware, and teams explain the impact and which control (monitoring, synthetic fulls, an offsite or immutable copy) would have helped.",
    "Each team drafts a three-line restore test plan for its schedule, stating what to restore, how often, and how they will check against the RTO."
   ]
  },
  "discussion": [
   "Why do organizations often skip restore testing even though they spend heavily on backups?",
   "How should the 3-2-1 rule adapt for organizations worried about ransomware that targets backup systems?"
  ],
  "exit": [
   [
    "A full backup runs Sunday and differentials run nightly. What do you need to restore after Wednesday night's backup?",
    "Sunday's full and Wednesday's differential."
   ],
   [
    "Which backup type is fastest to create, and which is fastest to restore?",
    "Incremental is fastest to create; full is fastest to restore."
   ],
   [
    "What does the 3-2-1 rule recommend?",
    "Three copies of data on two different types of media with one copy offsite."
   ]
  ],
  "differentiation": [
   "Support: Give students a color-coded calendar template where each backup type has its own color, so they can trace which blocks are needed by following the colors back to the last full.",
   "Extend: Ask fast finishers to calculate how much storage each schedule uses in a week if 5 percent of a 1 TB data set changes daily, and explain how a synthetic full would change the incremental restore chain."
  ]
 },
 {
  "t": "Plan testing: checklist, tabletop, simulation, parallel, full interruption",
  "objectives": [
   "Students will be able to list the five plan test types in order from least to most disruptive.",
   "Students will be able to explain what each test type can and cannot prove about a continuity or recovery plan.",
   "Students will be able to recommend an appropriate test type for a given organizational constraint.",
   "Students will be able to describe the after-action review process and how it drives plan maintenance."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about fire drills and collect what makes a drill realistic versus disruptive."
   ],
   [
    10,
    "Teach",
    "Draw a ladder on the board with five rungs labeled checklist to full interruption. For each rung, note what participants do, what it proves, cost and risk. Close with the after-action review and plan maintenance."
   ],
   [
    20,
    "Activity",
    "Run a short tabletop exercise as described below, with the teacher as facilitator."
   ],
   [
    5,
    "Discuss",
    "Debrief the tabletop as an after-action review, then raise the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "Think about a fire drill. What does a drill prove, and what does it not prove about how people would act in a real fire?",
  "activity": {
   "title": "Run a live tabletop exercise",
   "materials": "A projector or whiteboard for the scenario, printed role cards (IT lead, communications lead, business owner, help desk, executive), printed inject cards the teacher prepares, sticky notes for gaps.",
   "steps": [
    "Form groups of five and hand out role cards. Project a fictional scenario: a ransomware outbreak at a regional retailer at the start of a holiday weekend.",
    "Every three to four minutes the teacher reads an inject, such as backups are also encrypted, a reporter calls, or the person named in the plan is on vacation, and each role states its action.",
    "Groups record every gap they discover on sticky notes, such as unclear authority or missing contacts.",
    "Each group picks its two most serious gaps and decides which higher-level test type (simulation, parallel or full interruption) would best verify the fix."
   ]
  },
  "discussion": [
   "Why might an organization never perform a full interruption test, and is that an acceptable risk decision?",
   "What made the tabletop feel realistic or unrealistic, and how could a facilitator improve it?"
  ],
  "exit": [
   [
    "Put these in order from least to most disruptive: parallel, checklist, full interruption, tabletop, simulation.",
    "Checklist, tabletop, simulation, parallel, full interruption."
   ],
   [
    "Which test verifies recovery systems actually work without affecting production?",
    "The parallel test."
   ],
   [
    "What should follow every plan test?",
    "An after-action review that documents lessons learned, updates the plan and assigns owners for fixes."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page ladder diagram with each test type, a one-line description and a cost and risk rating to keep in front of students during the tabletop.",
   "Extend: Ask fast finishers to write two new injects for the scenario that would test communications and decision authority, and explain which plan section each inject targets."
  ]
 },
 {
  "t": "Why cryptography: confidentiality, integrity, authentication, non-repudiation; data at rest, in transit, in use",
  "objectives": [
   "Students will be able to define confidentiality, integrity, authentication and non-repudiation and name a cryptographic tool for each.",
   "Students will be able to explain why non-repudiation requires asymmetric digital signatures rather than shared keys.",
   "Students will be able to classify data as at rest, in transit or in use and recommend an appropriate protection.",
   "Students will be able to identify the limits of cryptography, including availability and compromised accounts."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the board under headings for secrecy, tampering and proof of sender."
   ],
   [
    12,
    "Teach",
    "Introduce the four goals with a table: goal, threat it addresses, tool. Emphasize why shared keys cannot give non-repudiation. Then draw a data flow from laptop to network to server memory and label at rest, in transit and in use with example controls. Finish with Kerckhoffs's principle and what cryptography does not do."
   ],
   [
    18,
    "Activity",
    "Run the Goal and State sorting activity described below."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions, focusing on where encryption gives false confidence."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions individually."
   ]
  ],
  "warmup": "If you mailed a postcard with your bank details on it, what could go wrong? List as many different problems as you can.",
  "activity": {
   "title": "Goal and State: scenario sorting",
   "materials": "Printed scenario cards (about 12), a whiteboard grid with four goal columns and three data state rows, sticky notes.",
   "steps": [
    "In pairs, students draw scenario cards such as a stolen backup tape, a forged invoice email, a tampered software download, an eavesdropper on hotel wireless, or a cloud provider administrator reading memory.",
    "For each card, pairs decide which security goal is at stake and which data state is involved, then place the card on the grid.",
    "Pairs write the cryptographic control that addresses the problem on a sticky note, such as full-disk encryption, digital signature, hash verification, TLS or a trusted execution environment.",
    "The class reviews the grid together; the teacher highlights any card where cryptography is not the answer, such as an outage needing availability controls or a phished account."
   ]
  },
  "discussion": [
   "If an organization encrypts everything at rest and in transit, what risks still remain?",
   "Why do security professionals distrust proprietary encryption algorithms even from reputable vendors?"
  ],
  "exit": [
   [
    "Which security goal requires a digital signature made with a private key?",
    "Non-repudiation."
   ],
   [
    "Data being processed by an application in memory is in which state?",
    "Data in use."
   ],
   [
    "Name one security goal cryptography does not provide.",
    "Availability."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference card that maps each goal to its main tool (encryption, hash or MAC, key possession, digital signature) and each data state to an example control.",
   "Extend: Ask fast finishers to explain why a MAC provides authentication but not non-repudiation, and describe a business situation where that difference would matter legally."
  ]
 },
 {
  "t": "Symmetric (AES) vs asymmetric (RSA, ECC) and hybrid key exchange",
  "objectives": [
   "Students will be able to compare symmetric and asymmetric cryptography by speed, key distribution, scalability and support for non-repudiation.",
   "Students will be able to calculate the number of keys required for symmetric and asymmetric communication among n users.",
   "Students will be able to identify which key to use for confidentiality and which for a digital signature.",
   "Students will be able to explain how a hybrid system such as TLS combines key exchange with symmetric encryption."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and discuss how the class would share the secret code without being overheard."
   ],
   [
    12,
    "Teach",
    "Compare symmetric and asymmetric side by side on the board. Work the key count formulas with 4 and 10 users. Name AES, DES, 3DES, ChaCha20, RSA, ECC and Diffie-Hellman. Then draw the TLS hybrid flow and the digital envelope."
   ],
   [
    18,
    "Activity",
    "Run the Paper Envelope role-play described below."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions and connect the role-play back to TLS."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You and a friend across a crowded room want to agree on a secret code word, but everyone can hear anything you say out loud. How could you do it?",
  "activity": {
   "title": "Paper Envelope: acting out hybrid encryption",
   "materials": "Envelopes, index cards, sticky notes labeled Public key and Private key for each student, a small padlock or a drawing of one on cards, whiteboard.",
   "steps": [
    "Each student receives a Public key sticky note to post on the board with their name and keeps a Private key card at their desk. Explain that only the matching private key can open an envelope sealed with that public key.",
    "In pairs, Student A writes a long message, then writes a short random session code on a separate card. A seals the session code card in an envelope labeled with B's public key and passes it over; B opens it with B's private key.",
    "Both students now use the session code (for example a simple letter-shift) to encode and decode a few more lines, representing fast symmetric encryption.",
    "Groups count how many envelopes would be needed if every pair in the class used only shared session codes delivered in person, versus using public keys, and compare with the formulas n(n-1)/2 and 2n."
   ]
  },
  "discussion": [
   "Why don't we simply use asymmetric encryption for everything if it solves key distribution?",
   "What would happen to a hybrid system if an attacker could predict the random session keys?"
  ],
  "exit": [
   [
    "How many keys do 6 users need for pairwise symmetric communication, and how many for asymmetric?",
    "15 symmetric keys (6 x 5 / 2) and 12 asymmetric keys (2 x 6)."
   ],
   [
    "Which key does a sender use to create a digital signature?",
    "The sender's own private key."
   ],
   [
    "In TLS, what is the asymmetric step used for, and what protects the bulk data?",
    "The asymmetric step agrees on and authenticates a session key; a symmetric cipher such as AES protects the bulk data."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-column comparison chart (symmetric versus asymmetric) with blanks to fill in during the teach segment, and a worked key-count example.",
   "Extend: Ask fast finishers to explain why Diffie-Hellman alone is vulnerable to an on-path attacker unless the exchange is authenticated, and how certificates fix that in TLS."
  ]
 },
 {
  "t": "Hashing, salting, HMAC and digital signatures",
  "objectives": [
   "Students will be able to describe the properties of a cryptographic hash function and identify current and deprecated algorithms.",
   "Students will be able to explain how salting and key stretching protect stored passwords.",
   "Students will be able to compare hashes, HMACs and digital signatures by the security goals each provides.",
   "Students will be able to trace the steps of creating and verifying a digital signature."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect ideas about how to detect a changed file."
   ],
   [
    12,
    "Teach",
    "Demonstrate the avalanche effect by projecting a free browser-based hash calculator and hashing two sentences that differ by one character. Explain salting, rainbow tables and slow password hashes. Build a three-row table on the board: hash, HMAC, digital signature, with columns for integrity, authentication and non-repudiation."
   ],
   [
    18,
    "Activity",
    "Run the Hash Lab described below."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions, connecting the lab results to the table."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "You download a large file from a website. How could you be sure it is exactly the file the publisher intended, and not one that was changed on the way?",
  "activity": {
   "title": "Hash Lab: fingerprints, salts and signatures",
   "materials": "Student laptops with a browser and any free online or built-in hash calculator, printed worksheet, whiteboard.",
   "steps": [
    "In pairs, students hash a short sentence with SHA-256, then change one letter and hash again, recording how much of the digest changed.",
    "Students hash the password sunflower twice and confirm identical output, then hash it with two different salt values appended (for example sunflower plus a random string) and record the different outputs. They explain on the worksheet why this defeats rainbow tables.",
    "On paper, pairs act out a digital signature: Student A writes a message, writes its hash, and marks the hash with a symbol representing A's private key; Student B verifies with A's public key symbol and recomputes the hash.",
    "Pairs complete a worksheet table indicating which of hash, HMAC and digital signature provide integrity, authentication and non-repudiation, with one-line reasons."
   ]
  },
  "discussion": [
   "If salts are stored right next to the hashes, why are they still useful?",
   "Why might a company choose HMAC for its internal API but digital signatures for documents sent to customers?"
  ],
  "exit": [
   [
    "What does a salt protect against?",
    "Precomputed attacks such as rainbow tables, and it ensures identical passwords produce different hashes."
   ],
   [
    "Which tool provides integrity and authentication but not non-repudiation?",
    "HMAC, because the key is shared."
   ],
   [
    "What key verifies a digital signature?",
    "The sender's public key."
   ]
  ],
  "differentiation": [
   "Support: Provide a filled-in example worksheet showing a hash before and after a one-letter change, and a step diagram of signing and verifying.",
   "Extend: Ask fast finishers to explain why a slow password hashing function hurts attackers far more than legitimate users, using a rough comparison of one login versus billions of guesses."
  ]
 },
 {
  "t": "Key management: generation, distribution, storage, rotation, escrow, destruction; HSM and TPM",
  "objectives": [
   "Students will be able to list the stages of the key management lifecycle in order and describe a control for each.",
   "Students will be able to explain split knowledge, dual control, cryptoperiods and crypto-shredding.",
   "Students will be able to compare an HSM with a TPM and choose the right one for a scenario.",
   "Students will be able to identify key management failures in a short case and recommend fixes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student ideas about physical key control on the board."
   ],
   [
    12,
    "Teach",
    "Draw the lifecycle as a circle: generation, distribution, storage and use, rotation, escrow and recovery, destruction. For each stage, give one failure and one control. Then compare HSM and TPM in a two-column table."
   ],
   [
    18,
    "Activity",
    "Run the Key Failure Detective activity described below."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions, emphasizing that most crypto failures are key handling failures."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A building manager controls the master key to every apartment. What rules would you set for how that key is made, stored, shared, replaced and eventually thrown away?",
  "activity": {
   "title": "Key Failure Detective",
   "materials": "Printed case cards describing six fictional key management incidents, a printed lifecycle diagram per group, sticky notes, whiteboard.",
   "steps": [
    "Groups of three receive case cards such as: a key generated from the system clock; an API key committed to a code repository; one administrator holding the entire master key; a certificate that expired unnoticed; a former employee's encrypted laptop with no recovery key; retired keys still present on backup tapes.",
    "For each case, the group identifies which lifecycle stage failed and places a sticky note on that stage of their diagram.",
    "Groups write one control that would have prevented each failure, such as a secure random generator, a secrets vault, split knowledge and dual control, expiry monitoring, escrow, or secure destruction and crypto-shredding.",
    "Each group decides whether an HSM, a TPM or neither would have helped in two of its cases and presents its reasoning to the class."
   ]
  },
  "discussion": [
   "How should an organization balance the need for key escrow against the risk that escrowed keys become a target?",
   "Why is crypto-shredding especially valuable for data stored with a cloud provider?"
  ],
  "exit": [
   [
    "Name the lifecycle stage in which keys are replaced at the end of their authorized use period, and the term for that period.",
    "Rotation; the period is the cryptoperiod."
   ],
   [
    "Which control requires two authorized people to perform a sensitive key operation?",
    "Dual control."
   ],
   [
    "A laptop needs to protect its disk encryption key and verify its boot process. HSM or TPM?",
    "TPM, because it is built into the device and supports measured or secure boot."
   ]
  ],
  "differentiation": [
   "Support: Provide a lifecycle diagram with each stage already labeled and a word bank of controls students can match to the case cards.",
   "Extend: Ask fast finishers to draft a one-paragraph key management policy for a small company covering generation, cryptoperiods, storage location and destruction."
  ]
 },
 {
  "t": "Secure protocols: TLS, SSH, IPsec, S/MIME, SFTP",
  "objectives": [
   "Students will be able to match common insecure protocols to their secure replacements and typical ports.",
   "Students will be able to distinguish channel protection (TLS, IPsec) from message protection (S/MIME, PGP).",
   "Students will be able to explain the difference between SFTP and FTPS and the purpose of SSH host key verification.",
   "Students will be able to recommend a secure protocol for a given business requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and discuss what an eavesdropper on shared wireless could see."
   ],
   [
    12,
    "Teach",
    "Build a replacement table on the board: Telnet to SSH, FTP to SFTP or FTPS, HTTP to HTTPS, SNMPv1/v2c to SNMPv3, plain email to S/MIME, with ports. Explain TLS handshake basics, SSH host keys, IPsec with IKE, AH and ESP, and channel versus message protection."
   ],
   [
    18,
    "Activity",
    "Run the Protocol Audit activity described below."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "When you use public wireless at a coffee shop, what could another person on that network see about what you are doing? What changes when a site shows the padlock icon?",
  "activity": {
   "title": "Protocol Audit",
   "materials": "Printed audit sheet listing ten fictional findings from a network scan of a small company (for example Telnet on switches, FTP to a vendor, SNMPv2c with a default community string, HTTP admin page, unencrypted email to a law firm, LDAP on port 389), whiteboard.",
   "steps": [
    "In pairs, students read each finding and identify the risk, such as cleartext credentials or tampering.",
    "For each finding, pairs choose the secure replacement protocol and its typical port and note whether it protects the channel or the message.",
    "Pairs flag any finding where two answers are possible, such as SFTP versus FTPS, and write when each would be chosen.",
    "The class reviews answers together; the teacher highlights the email finding to reinforce why TLS alone does not protect stored messages."
   ]
  },
  "discussion": [
   "Why might an organization keep an insecure protocol running even after a secure replacement is available, and how should security handle that exception?",
   "When would you choose a VPN using IPsec rather than relying on each application to use TLS?"
  ],
  "exit": [
   [
    "What protocol replaces Telnet, and what is its usual port?",
    "SSH on TCP port 22."
   ],
   [
    "Which protects an email message while it is stored on a mail server: TLS or S/MIME?",
    "S/MIME, because it protects the message itself rather than the connection."
   ],
   [
    "What is SFTP built on?",
    "SSH."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed replacement table with ports filled in, so students focus on matching protocols and understanding channel versus message protection.",
   "Extend: Ask fast finishers to explain how an SSH host key warning could reveal an on-path attack and write the steps an administrator should take before accepting a changed key."
  ]
 },
 {
  "t": "Forward secrecy and cipher suite choices",
  "objectives": [
   "Students will be able to explain forward secrecy and why ephemeral key exchange provides it while RSA key transport does not.",
   "Students will be able to decode the components of a TLS 1.2 cipher suite name and identify weak components.",
   "Students will be able to recommend a cipher suite configuration that favors authenticated encryption and forward secrecy.",
   "Students will be able to describe downgrade attacks and how removing weak options prevents them."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about recorded traffic and stolen keys, and take a quick vote on whether old sessions are safe."
   ],
   [
    12,
    "Teach",
    "Contrast RSA key transport with ephemeral ECDHE using a simple drawing. Write a TLS 1.2 suite name on the board and label its four parts, then show a TLS 1.3 suite name. List strong and weak choices and explain downgrade attacks and documented exceptions."
   ],
   [
    18,
    "Activity",
    "Run the Suite Decoder card activity described below."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Suppose someone records all your encrypted messages for a year and then steals the server's key. Should your old messages now be readable? What would have to be true for them to stay safe?",
  "activity": {
   "title": "Suite Decoder",
   "materials": "Printed cards each showing one cipher suite name (a mix of strong and weak, TLS 1.2 and TLS 1.3), printed decoding grid, whiteboard, highlighters.",
   "steps": [
    "In pairs, students receive eight suite cards, such as TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384, TLS_RSA_WITH_3DES_EDE_CBC_SHA, TLS_DH_anon_WITH_AES_128_CBC_SHA, TLS_RSA_WITH_NULL_SHA256 and TLS_AES_128_GCM_SHA256.",
    "For each card, pairs fill in the grid columns: key exchange, authentication, bulk cipher and mode, hash, forward secrecy (yes or no), keep or disable.",
    "Pairs highlight the exact part of each name that made them disable it, such as RSA key exchange, 3DES, NULL or anon.",
    "Pairs write an ordered allow list of the suites they would keep for a public website, and the class compares lists, discussing any legacy exception they would document."
   ]
  },
  "discussion": [
   "How should an organization decide when supporting an old client is worth keeping a weak cipher suite enabled?",
   "Why does the record-now-decrypt-later threat make forward secrecy and post-quantum planning relevant even for traffic sent today?"
  ],
  "exit": [
   [
    "Which key exchange methods provide forward secrecy?",
    "Ephemeral Diffie-Hellman methods: DHE and ECDHE."
   ],
   [
    "In TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384, what is the bulk encryption cipher?",
    "AES with a 256-bit key in GCM mode."
   ],
   [
    "What is a downgrade attack?",
    "An attack that manipulates negotiation so both sides use a weaker protocol version or cipher suite."
   ]
  ],
  "differentiation": [
   "Support: Give students a color-coded example suite name with each of the four parts labeled, plus a short list of weak keywords (NULL, EXPORT, RC4, DES, 3DES, MD5, anon, RSA key exchange) to look for.",
   "Extend: Ask fast finishers to explain why TLS 1.3 suite names no longer include the key exchange or authentication algorithm, and what that means for forward secrecy in TLS 1.3."
  ]
 },
 {
  "t": "PKI: CAs, certificates, CSRs, chain of trust, CRL and OCSP",
  "objectives": [
   "Students will be able to describe the contents of an X.509 certificate and the roles of CAs and RAs.",
   "Students will be able to explain the CSR process and why the private key is never sent to the CA.",
   "Students will be able to trace a chain of trust from a leaf certificate to a root and diagnose a missing intermediate.",
   "Students will be able to compare CRL, OCSP and OCSP stapling for checking revocation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about passports and list what makes a passport trustworthy."
   ],
   [
    12,
    "Teach",
    "Project a real public website's certificate details using the browser's padlock icon, pointing out subject, SANs, issuer, validity, serial number and the chain. Then draw the CSR flow and the root, intermediate and leaf hierarchy. Finish with CRL, OCSP and stapling."
   ],
   [
    18,
    "Activity",
    "Run the Certificate Inspector activity described below."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When a border agent looks at your passport, why do they trust it? What would they check, and how would they know if it had been reported stolen?",
  "activity": {
   "title": "Certificate Inspector",
   "materials": "Student laptops with a browser, printed worksheet, whiteboard; optional printed paper certificate cards for groups without laptops.",
   "steps": [
    "In pairs, students open two or three well-known public websites and use the browser's padlock or site information panel to view each certificate.",
    "For each site, pairs record the subject, at least two SANs, issuer, validity dates and the full chain from leaf to intermediate to root on the worksheet.",
    "Pairs then work through three printed troubleshooting cards: an error only on some devices (missing intermediate), a name mismatch (SAN missing), and a certificate whose key was leaked (revocation needed), writing the cause and fix for each.",
    "Pairs explain to another pair how a client would learn about the revoked certificate using a CRL, OCSP and OCSP stapling."
   ]
  },
  "discussion": [
   "Why do organizations accept the risk of wildcard certificates, and when would you avoid them?",
   "What are the privacy and performance reasons OCSP stapling was introduced?"
  ],
  "exit": [
   [
    "What does a CSR contain, and what does it never contain?",
    "It contains the public key and identity information, signed with the private key; it never contains the private key."
   ],
   [
    "A site works on some devices but not others, with chain errors. What is the most likely cause?",
    "The server is not sending the intermediate CA certificate."
   ],
   [
    "Which revocation method lets a client query the status of a single certificate in near real time?",
    "OCSP."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled screenshot printout of a certificate details panel so students can match fields before inspecting live sites.",
   "Extend: Ask fast finishers to explain why root CAs are kept offline and what would happen to the chain of trust if a root key were compromised, then propose how an organization's internal PKI should protect its root."
  ]
 },
 {
  "t": "Web of trust vs hierarchical trust",
  "objectives": [
   "Students will be able to explain how trust flows in hierarchical X.509 PKI from root CA to end-entity certificate.",
   "Students will be able to describe how the PGP web of trust establishes key validity without a central authority.",
   "Students will be able to compare the strengths and weaknesses of hierarchical trust, web of trust, cross-certification and trust on first use.",
   "Students will be able to choose an appropriate trust model for a given organizational scenario and justify the choice."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect three or four answers on the whiteboard, sorting them into 'someone official vouched' and 'someone I know vouched'."
   ],
   [
    13,
    "Teach",
    "Draw a root-intermediate-leaf chain on the left of the board and a web of key signatures on the right. Walk through how a browser validates a chain, then how a PGP user decides a key is valid. Add cross-certification and TOFU as two short side notes with one example each."
   ],
   [
    17,
    "Activity",
    "Run the 'Who do you trust?' card sort described below, then have groups present one placement they argued about."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to draw out concentration risk versus scalability."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them on the door as they leave."
   ]
  ],
  "warmup": "Think of the last time you trusted a stranger's identity, such as a delivery driver, a new coworker or a website. What made you believe them: an official document, or someone you already knew vouching for them?",
  "activity": {
   "title": "Who do you trust? Trust model card sort",
   "materials": "Printed scenario cards (about 12 per group), whiteboard divided into four columns labeled Hierarchical PKI, Web of trust, Cross-certification and TOFU, tape or sticky notes.",
   "steps": [
    "Prepare cards with short scenarios, such as 'public shopping website', 'open source maintainer signing a release', 'first SSH login to a new server', 'two agencies sharing signed email', 'company code signing', 'journalist exchanging encrypted email with a source they met'.",
    "In groups of three or four, students place each card in the column that best fits and write one sentence on the back explaining why.",
    "Give each group one 'compromise' card, for example 'a CA is caught issuing certificates for domains it should not' or 'a PGP user loses their private key', and ask them to explain what happens in that model and how revocation would work.",
    "Groups move to another group's board, mark any placement they disagree with, and the teacher resolves disagreements with the whole class."
   ]
  },
  "discussion": [
   "Why does the internet rely on hierarchical PKI even though it concentrates trust in a relatively small number of organizations?",
   "In what situations would you accept the risk of trust on first use, and when would it be unacceptable?",
   "What makes revocation harder in a web of trust, and how might a community work around it?"
  ],
  "exit": [
   [
    "Which trust model is used by PGP and has no central authority?",
    "The web of trust."
   ],
   [
    "What is the main risk of hierarchical trust?",
    "A compromised or careless CA can issue fraudulent certificates that all relying parties trust."
   ],
   [
    "How can two separate organizational PKIs trust each other's certificates?",
    "Cross-certification, where the CAs sign each other's certificates, or a shared bridge CA."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column comparison table with row labels (central authority, scalability, revocation, typical use) already filled in so they only complete the cells.",
   "Extend: Ask fast finishers to inspect a website's certificate chain in their browser's certificate viewer, list each certificate in the chain, and explain which one their browser already trusted and why."
  ]
 },
 {
  "t": "OSI and TCP/IP models, common ports and protocols, IPv4/IPv6",
  "objectives": [
   "Students will be able to name the seven OSI layers in order and map them to the four TCP/IP layers.",
   "Students will be able to identify the default ports of common protocols and their secure replacements.",
   "Students will be able to compare IPv4 and IPv6 addressing, including private ranges, loopback and link-local addresses.",
   "Students will be able to explain why unmanaged IPv6 creates a security gap on an IPv4-focused network."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up prompt and list student guesses for what each port is on the whiteboard without correcting them yet."
   ],
   [
    15,
    "Teach",
    "Draw the OSI and TCP/IP stacks side by side, teach the mnemonic, and walk through encapsulation with a sample packet capture projected. Cover TCP versus UDP, the key ports with their secure replacements, then IPv4 versus IPv6 with example addresses."
   ],
   [
    15,
    "Activity",
    "Run the 'Firewall log detective' pair activity below."
   ],
   [
    5,
    "Discuss",
    "Revisit the warm-up guesses, correct them, and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on paper."
   ]
  ],
  "warmup": "Here are five numbers from a firewall log: 22, 23, 53, 443, 3389. Without looking anything up, which ones do you recognize, and which one would worry you most if it were open to the internet?",
  "activity": {
   "title": "Firewall log detective",
   "materials": "A printed or projected mock firewall log excerpt of about 15 lines (teacher-made, using documentation address ranges), a blank OSI layer chart per pair, pens.",
   "steps": [
    "Give each pair the log excerpt containing a mix of protocols and ports (for example TCP 23, UDP 161, TCP 445, TCP 636, an IPv6 fe80 source and an IPv4 192.168 source).",
    "Pairs label each line with the protocol name, whether it is TCP or UDP, the OSI layer of the protocol, and whether it is cleartext or encrypted.",
    "Pairs flag the three lines that most concern them and write the control they would apply, including any IPv6 rule that is missing.",
    "Two pairs compare answers and agree on a final top three, which they share with the class."
   ]
  },
  "discussion": [
   "Why might an organization keep a cleartext protocol such as Telnet or plain LDAP running, and how would you make the case to replace it?",
   "What evidence would convince you that IPv6 is active on a network that claims to be IPv4 only?",
   "How does knowing a protocol's layer help you choose which security device can inspect it?"
  ],
  "exit": [
   [
    "List the OSI layers from 1 to 7.",
    "Physical, Data Link, Network, Transport, Session, Presentation, Application."
   ],
   [
    "What are the secure alternatives to Telnet and LDAP, and their ports?",
    "SSH on TCP 22 and LDAPS on TCP 636."
   ],
   [
    "What does an address beginning with fe80:: indicate?",
    "An IPv6 link-local address, which shows IPv6 is enabled on that interface."
   ]
  ],
  "differentiation": [
   "Support: Provide a port reference card with the protocol names in one column so students only need to match port numbers, and pair them with a confident partner.",
   "Extend: Ask fast finishers to convert 2001:0db8:0000:0000:0000:0000:0000:0001 to its shortest form and explain the rule for using the double colon only once."
  ]
 },
 {
  "t": "Network attacks: ARP poisoning, DNS poisoning, DoS/DDoS, SYN flood, on-path, spoofing",
  "objectives": [
   "Students will be able to explain the protocol weakness abused by ARP poisoning, DNS poisoning and spoofing.",
   "Students will be able to identify an attack from described symptoms such as changed ARP entries, certificate warnings or half-open connections.",
   "Students will be able to distinguish DoS, DDoS, amplification and SYN flood attacks.",
   "Students will be able to describe how attackers achieve an on-path position."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers; note any that involve trusting information without checking."
   ],
   [
    15,
    "Teach",
    "Draw a small LAN with a gateway and show ARP poisoning step by step, then DNS resolution and how a poisoned cache redirects users. Cover on-path, replay, DoS, DDoS, amplification and the SYN flood handshake on the board."
   ],
   [
    15,
    "Activity",
    "Run the 'Symptom triage' role-play below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect each attack to the trust assumption it abuses."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A coworker says the company benefits website shows a certificate warning, but only on their floor. List three possible explanations, from harmless to serious.",
  "activity": {
   "title": "Symptom triage role-play",
   "materials": "Teacher-made symptom cards (one per scenario), a whiteboard with columns for each attack type, a timer.",
   "steps": [
    "One student per group plays a help-desk caller and reads a symptom card, for example 'gateway MAC changed in ARP table', 'thousands of SYN_RECEIVED connections', 'site name is right but IP is unfamiliar'.",
    "The other students act as analysts and may ask up to three yes or no questions before naming the attack.",
    "The group records the attack, the protocol weakness abused and one sign they would look for in logs.",
    "Rotate roles until each student has been the caller, then groups post their answers in the matching whiteboard column for class review."
   ]
  },
  "discussion": [
   "Why were protocols like ARP and DNS designed without authentication, and what does that teach us about legacy protocols?",
   "How would you explain to users why they should report rather than click through certificate warnings?",
   "Why does a DDoS attack often require help from outside the organization to stop?"
  ],
  "exit": [
   [
    "Why does ARP poisoning require local network access?",
    "ARP operates within a single broadcast domain and does not cross routers."
   ],
   [
    "What symptom indicates a SYN flood?",
    "Many half-open connections in SYN_RECEIVED waiting for ACKs that never arrive."
   ],
   [
    "What makes an amplification attack effective?",
    "Small spoofed requests to third-party services cause much larger replies to be sent to the victim."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page attack-to-symptom matching sheet with the symptoms already worded so they focus on recognition first.",
   "Extend: Ask fast finishers to write a short detection rule idea, in plain words, for spotting ARP poisoning or SYN floods in logs, including what normal looks like."
  ]
 },
 {
  "t": "Countermeasures: DAI, DNSSEC, SYN cookies, rate limiting",
  "objectives": [
   "Students will be able to match ARP poisoning, DNS poisoning, SYN floods and brute-force floods to their primary countermeasures.",
   "Students will be able to explain how DAI uses the DHCP snooping table to drop forged ARP replies.",
   "Students will be able to explain what DNSSEC protects and what it does not protect.",
   "Students will be able to describe how SYN cookies and rate limiting preserve availability."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and write the attacks from last lesson down the left side of the board."
   ],
   [
    15,
    "Teach",
    "Next to each attack, build out the matching control and explain the mechanism: the DAI lookup against DHCP snooping, a DNSSEC signature chain, a SYN cookie handshake drawn as a timeline, and rate limiting with an example login threshold. Close with ingress and egress filtering."
   ],
   [
    15,
    "Activity",
    "Run the 'Attack and defense matching' card game below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on why distractor controls fail."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Last lesson we saw ARP poisoning, DNS poisoning and SYN floods. For each, what single fact about the protocol made the attack possible?",
  "activity": {
   "title": "Attack and defense matching",
   "materials": "Two decks of printed cards per group, one with attack scenarios and one with controls (including distractors such as 'full disk encryption' and 'antivirus'), a whiteboard for scoring.",
   "steps": [
    "Groups receive both decks shuffled and match each attack card to the best control card.",
    "For each match, the group writes one sentence explaining the mechanism, for example 'DAI drops ARP replies that do not match the DHCP snooping binding'.",
    "The teacher reveals the answers; groups earn a point for each correct match and a bonus point for correctly explaining why a distractor would not work.",
    "Each group picks one attack and proposes a second, layered control that would still help if the first failed."
   ]
  },
  "discussion": [
   "Why might an organization delay deploying DNSSEC even though it addresses cache poisoning?",
   "What are the risks of setting rate limits too low on a login page or API?",
   "Which of today's controls depend on another control being in place first, and why does that matter for deployment order?"
  ],
  "exit": [
   [
    "Which control is the best defense against ARP poisoning on a switched network?",
    "Dynamic ARP Inspection, usually with DHCP snooping."
   ],
   [
    "What security property does DNSSEC add, and which one does it not add?",
    "It adds integrity and origin authentication; it does not add confidentiality."
   ],
   [
    "Why do spoofed SYNs consume no server memory when SYN cookies are on?",
    "The server stores no state until a valid ACK returns, and spoofed sources never send that ACK."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed attack-to-control table with the mechanism column started so students finish each sentence.",
   "Extend: Ask fast finishers to design a defense-in-depth plan for a public login page that combines rate limiting, account lockout thresholds, MFA and monitoring, and explain how each layer limits a brute-force attack."
  ]
 },
 {
  "t": "Network access control: 802.1X, RADIUS/TACACS+, NAC posture checks, port security",
  "objectives": [
   "Students will be able to identify the supplicant, authenticator and authentication server in an 802.1X exchange.",
   "Students will be able to compare RADIUS and TACACS+ by transport, encryption scope and typical use.",
   "Students will be able to explain how NAC posture assessment and remediation VLANs work.",
   "Students will be able to evaluate when port security is sufficient and when 802.1X is required."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up scenario about an unknown device in a wall jack and list student ideas for stopping it."
   ],
   [
    13,
    "Teach",
    "Diagram the 802.1X flow with three boxes and arrows. Build a RADIUS versus TACACS+ comparison table on the board row by row. Finish with posture assessment outcomes and port security violation modes."
   ],
   [
    17,
    "Activity",
    "Run the '802.1X human network' role-play below."
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
  "warmup": "Someone plugs an unknown device into a wall jack in the lobby. On most networks it gets an address and full access within seconds. What would you want the network to check before allowing that device in?",
  "activity": {
   "title": "802.1X human network",
   "materials": "Printed role cards (Supplicant, Authenticator, RADIUS server, Remediation server), index cards to act as credentials and posture reports, a whiteboard showing VLANs as zones on the floor or board.",
   "steps": [
    "Assign roles in groups of four. The supplicant holds a credential card and a posture card (for example 'patched: yes, antimalware: out of date').",
    "Act out the exchange: the supplicant can only speak to the authenticator, who relays messages to the RADIUS server; the server decides and tells the authenticator which VLAN to open.",
    "Run three rounds with different cards: valid and healthy, valid but unhealthy (sent to remediation), and a spoofed MAC with no credentials (blocked, or allowed only if MAC authentication bypass is on).",
    "After each round, the group writes what the switch logged and which protocol carried each message."
   ]
  },
  "discussion": [
   "What devices in a typical office cannot run an 802.1X supplicant, and how should they be handled safely?",
   "When would an organization accept port security instead of deploying full 802.1X?",
   "Why does separating authorization from authentication matter so much for network administrators?"
  ],
  "exit": [
   [
    "In 802.1X, which component makes the access decision?",
    "The authentication server, usually a RADIUS server."
   ],
   [
    "Give two differences between RADIUS and TACACS+.",
    "RADIUS uses UDP and encrypts only the password; TACACS+ uses TCP 49, encrypts the full payload, and separates authentication, authorization and accounting."
   ],
   [
    "Why is port security weaker than 802.1X?",
    "It relies on MAC addresses, which can be spoofed, rather than real credentials or certificates."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled 802.1X diagram with blank arrows so students fill in which message flows where, and a RADIUS versus TACACS+ table with row headings.",
   "Extend: Ask fast finishers to design an access policy for a hospital with staff laptops, guest phones, medical devices without supplicants and network admins, naming the control and VLAN outcome for each."
  ]
 },
 {
  "t": "Segmentation: VLANs, DMZ/screened subnets, micro-segmentation, zero trust",
  "objectives": [
   "Students will be able to explain how segmentation limits lateral movement and supports compliance.",
   "Students will be able to describe VLANs, VLAN hopping risks and their defenses.",
   "Students will be able to design a screened subnet that places public services correctly and restricts DMZ-to-internal traffic.",
   "Students will be able to distinguish micro-segmentation and zero trust from traditional perimeter segmentation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up scenario and ask students to sketch where an attacker could go next on a flat network."
   ],
   [
    13,
    "Teach",
    "Draw a flat network, then progressively add VLANs with a router ACL, a DMZ with a three-interface firewall, micro-segmentation inside a server cluster, and finally zero trust access paths. Explain north-south versus east-west at each step."
   ],
   [
    17,
    "Activity",
    "Run the 'Draw the walls' whiteboard design challenge below."
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
  "warmup": "An attacker controls one receptionist's computer on a network with no internal segmentation. List everything they might be able to reach next.",
  "activity": {
   "title": "Draw the walls: segmentation design challenge",
   "materials": "Whiteboard or large paper per group, markers, a printed asset list for a fictional company (web server, mail relay, POS terminals, payment server, HR database, staff laptops, guest Wi-Fi, IP cameras).",
   "steps": [
    "Groups draw a network that places each asset into a zone: screened subnet, user VLAN, server VLAN, payment VLAN, guest network or IoT VLAN.",
    "Groups write at least five firewall or ACL rules between zones, stating source, destination and port, and mark everything else as denied.",
    "The teacher announces an incident, such as 'a staff laptop is compromised', and each group traces which assets the attacker can and cannot reach in their design.",
    "Groups add one micro-segmentation rule and one zero trust control that would further limit the attacker, then present their design in two minutes."
   ]
  },
  "discussion": [
   "Why might an organization keep a flat network despite the risks, and how would you build the case for segmentation?",
   "What changes for users and help-desk staff when an organization moves from VPN access to zero trust network access?",
   "How does segmentation make detection easier, not just prevention?"
  ],
  "exit": [
   [
    "What traffic does micro-segmentation primarily control?",
    "East-west traffic between workloads inside the data center or cloud."
   ],
   [
    "Where should a public web server be placed?",
    "In a screened subnet (DMZ), with tightly limited access into the internal network."
   ],
   [
    "What is the core principle of zero trust?",
    "No implicit trust based on network location; every request is verified with least privilege and continuous evaluation."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups a partially drawn network with zones already labeled so they focus on placing assets and writing rules.",
   "Extend: Ask fast finishers to explain how double tagging works conceptually and which two switch configuration changes prevent it."
  ]
 },
 {
  "t": "VPNs and IPsec (AH vs ESP, tunnel vs transport)",
  "objectives": [
   "Students will be able to compare site-to-site and remote access VPNs and explain full versus split tunneling.",
   "Students will be able to state what AH and ESP each provide and why ESP is used in most deployments.",
   "Students will be able to distinguish IPsec tunnel mode from transport mode and choose the correct mode for a scenario.",
   "Students will be able to describe the role of IKE and security associations in establishing IPsec connections."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record answers about what 'encrypted VPN' means to students."
   ],
   [
    15,
    "Teach",
    "Draw site-to-site and remote access VPNs, then full and split tunnels. Explain IKE and SAs. Draw an IP packet and show, with colored markers, which parts AH authenticates, which parts ESP encrypts, and how transport and tunnel modes differ."
   ],
   [
    15,
    "Activity",
    "Run the 'Build the packet' paper activity below."
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
  "warmup": "If a vendor tells you their VPN 'uses IPsec,' is that enough to know your data is encrypted? What else would you want to ask?",
  "activity": {
   "title": "Build the packet: IPsec modes and protocols",
   "materials": "Colored paper strips labeled 'Original IP header', 'TCP header', 'Data', 'New IP header', 'AH header', 'ESP header', 'ESP trailer', 'ESP auth'; tape; colored markers to shade encrypted and authenticated parts.",
   "steps": [
    "In pairs, students assemble four packets on their desks: AH transport, AH tunnel, ESP transport and ESP tunnel.",
    "Students shade encrypted portions in one color and authenticated portions in another, then compare with the teacher's projected answer.",
    "For each packet, pairs answer: are internal addresses hidden, is the data confidential, and will it work through NAT.",
    "Pairs choose the correct packet for three scenarios the teacher reads aloud, such as 'branch to headquarters', 'server to management host' and 'integrity only, no NAT'."
   ]
  },
  "discussion": [
   "Why has AH become rare in practice even though it protects part of the IP header?",
   "What would make you choose a full tunnel over a split tunnel for remote staff, and what are the costs?",
   "Why are VPN gateways such attractive targets for attackers, and how should they be protected?"
  ],
  "exit": [
   [
    "Which IPsec protocol should you choose when confidentiality is required?",
    "ESP, because AH provides no encryption."
   ],
   [
    "Which mode hides internal IP addresses, and where is it used?",
    "Tunnel mode, used between gateways in site-to-site VPNs and for most remote access."
   ],
   [
    "Why does a two-way IPsec connection need two security associations?",
    "Each SA is one-way, so one is needed for each direction."
   ]
  ],
  "differentiation": [
   "Support: Provide a completed diagram of ESP tunnel mode as a model so students can build the other three packets by comparison.",
   "Extend: Ask fast finishers to explain why pre-shared keys are weaker than certificates for IKE authentication across many branches, and how certificate revocation would help if a branch firewall were stolen."
  ]
 },
 {
  "t": "Security devices: firewalls (packet, stateful, NGFW, WAF), IDS/IPS, proxies, load balancers",
  "objectives": [
   "Students will be able to compare packet-filtering, stateful, next-generation and web application firewalls by what they inspect.",
   "Students will be able to distinguish IDS from IPS by placement, actions and failure impact.",
   "Students will be able to explain the roles of forward proxies, reverse proxies and load balancers.",
   "Students will be able to select and place appropriate security devices in a network design."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers about what a 'firewall' does."
   ],
   [
    15,
    "Teach",
    "Use a comparison table on the board with columns for device, layer, inspects, placement and typical use. Fill it in for each device, pausing on stateful tables, IDS versus IPS failure modes, and forward versus reverse proxies."
   ],
   [
    15,
    "Activity",
    "Run the 'Place the devices' network diagram activity below."
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
  "warmup": "If a company's firewall allows only web traffic on port 443 to its website, is the website safe from attackers? Why or why not?",
  "activity": {
   "title": "Place the devices",
   "materials": "Printed blank network diagrams of a fictional online store (internet, perimeter, screened subnet, web servers, internal users, database), sticky notes labeled with each device type, markers.",
   "steps": [
    "In groups of three, students place sticky notes for NGFW, WAF, IPS, IDS, forward proxy, reverse proxy and load balancer on the diagram.",
    "For each device, students write on the sticky note what it inspects and one attack or problem it addresses.",
    "The teacher reads three incidents (SQL injection attempt, malware download by an employee, web server crash during a sale) and groups identify which device would detect or prevent each.",
    "Groups compare diagrams with a neighbor and justify any differences in placement."
   ]
  },
  "discussion": [
   "When would you configure an IPS to fail open, and when to fail closed?",
   "What are the privacy and performance trade-offs of TLS inspection on an NGFW or forward proxy?",
   "Why do many organizations still deploy a separate IDS even when they have an IPS?"
  ],
  "exit": [
   [
    "Which firewall type tracks sessions and allows replies to established connections?",
    "A stateful firewall."
   ],
   [
    "Which device best protects a web application from cross-site scripting?",
    "A web application firewall."
   ],
   [
    "Where is an IDS typically connected, and why can it not block traffic?",
    "Out of band on a SPAN port or tap; it only sees copies of traffic, so it can alert but not drop packets."
   ]
  ],
  "differentiation": [
   "Support: Provide a device comparison table with the layer and placement columns completed so students focus on what each device inspects.",
   "Extend: Ask fast finishers to write two sample WAF or IPS alert descriptions in plain words, one true positive and one likely false positive, and explain how they would tell them apart."
  ]
 },
 {
  "t": "Firewall rule design and implicit deny",
  "objectives": [
   "Students will be able to explain implicit deny and first-match rule processing.",
   "Students will be able to identify shadowed, overly broad and stale rules in a short rule base.",
   "Students will be able to write specific ingress and egress rules that apply least privilege.",
   "Students will be able to describe rule management practices such as ownership, change control, expiry dates and periodic review."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up guest list puzzle and have students predict who gets in."
   ],
   [
    12,
    "Teach",
    "Project the sample rule list from the lesson. Trace three packets through it aloud. Explain implicit deny, shadowing, specificity and egress filtering, then summarize rule management practices on the board."
   ],
   [
    18,
    "Activity",
    "Run the 'Packet tracer on paper' pair activity below."
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
  "warmup": "A door list says: line 1, 'Anyone from the sales department may enter.' Line 2, 'Jordan from sales may not enter.' Line 3, 'Nobody else may enter.' Does Jordan get in? Why?",
  "activity": {
   "title": "Packet tracer on paper",
   "materials": "A printed rule base of about ten rules (teacher-made, containing one shadowed rule, one rule with any-any, one stale temporary rule, and no egress controls), printed packet cards describing source, destination, protocol and port, pens.",
   "steps": [
    "Pairs trace eight packet cards through the rule base top down and record which rule each packet matches and the result.",
    "Pairs identify the shadowed rule, the overly broad rule and the stale rule, and explain the risk of each.",
    "Pairs rewrite the rule base: reorder rules, narrow broad entries, add two egress rules, add an explicit logged deny, and add owner and expiry comments.",
    "Pairs swap rewritten rule bases with another pair and trace the same packets again to confirm the intended outcome."
   ]
  },
  "discussion": [
   "Why do firewall rule bases grow so large over time, and what organizational habits cause it?",
   "Who should own a firewall rule: the network team or the business requester? Why?",
   "What risks come with removing a rule that has zero hits, and how would you remove it safely?"
  ],
  "exit": [
   [
    "What does first-match processing mean?",
    "Rules are evaluated top down and the first matching rule determines the action."
   ],
   [
    "What is a shadowed rule?",
    "A rule that never takes effect because an earlier, broader rule always matches first."
   ],
   [
    "Name two rule management practices that keep a rule base clean.",
    "Any two of: documented owner and justification, change management, expiry dates on temporary rules, periodic review using hit counts, backups and logging."
   ]
  ],
  "differentiation": [
   "Support: Give students a shorter rule base of five rules and a worked example of tracing one packet before they start.",
   "Extend: Ask fast finishers to write an egress policy for a small office that allows only the traffic needed for web browsing through a proxy, DNS through internal resolvers and email through the mail server, and explain what attacks it would hinder."
  ]
 },
 {
  "t": "Wireless security: WPA2/WPA3, enterprise vs personal, rogue APs and evil twins",
  "objectives": [
   "Students will be able to rank WEP, WPA, WPA2 and WPA3 by security and explain the key weakness of each older protocol.",
   "Students will be able to compare personal and enterprise Wi-Fi authentication and recommend the right mode for a scenario.",
   "Students will be able to distinguish rogue access points from evil twins.",
   "Students will be able to select layered defenses against wireless attacks, including WIPS, 802.1X and certificate validation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about public Wi-Fi and collect answers."
   ],
   [
    14,
    "Teach",
    "Build a timeline of WEP to WPA3 on the board with one weakness or improvement per protocol. Contrast personal and enterprise modes with a shared code versus badges example. Draw a rogue AP plugged into a jack and an evil twin outside the building."
   ],
   [
    16,
    "Activity",
    "Run the 'Wireless incident triage' group activity below."
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
  "warmup": "You are at a coffee shop and see two networks with the same name as the shop, one with a stronger signal. How would you decide which one to join, and what could go wrong?",
  "activity": {
   "title": "Wireless incident triage",
   "materials": "Printed incident cards (for example: unknown AP in the parking lot broadcasting the corporate SSID; employee router in a conference room; shared passphrase known to former staff; legacy device that supports only WPA2; WPS enabled on a branch router), a whiteboard with columns for Problem type, Risk and Fix.",
   "steps": [
    "Groups of three receive four incident cards and classify each as rogue AP, evil twin, weak authentication or weak protocol.",
    "For each card, groups write the risk in one sentence and the best fix, naming specific controls such as WPA3-Enterprise, 802.1X on wired ports, WIPS or disabling WPS.",
    "Groups rank their four incidents from most to least urgent and justify the top choice.",
    "Each group presents one incident; the class challenges any fix that would not actually address the problem."
   ]
  },
  "discussion": [
   "Why do many organizations still run WPA2 or transition mode, and what risks does that leave?",
   "How would you balance user convenience with security for a guest Wi-Fi network?",
   "What should a policy say about employees bringing their own access points or hotspots to work?"
  ],
  "exit": [
   [
    "What attack does WPA3's SAE make much harder?",
    "Offline dictionary attacks against a captured handshake."
   ],
   [
    "What is the difference between a rogue AP and an evil twin?",
    "A rogue AP is an unauthorized AP connected to your network; an evil twin impersonates your SSID to lure clients."
   ],
   [
    "Which client setting prevents devices from authenticating to an evil twin on an enterprise network?",
    "Validating the RADIUS server certificate against the trusted CA and server name."
   ]
  ],
  "differentiation": [
   "Support: Provide a protocol comparison card listing each protocol's cipher and main weakness so students can refer to it during triage.",
   "Extend: Ask fast finishers to write a short wireless security standard for a small company covering protocol, authentication mode, guest network, WPS and monitoring requirements."
  ]
 },
 {
  "t": "Converged networks and VoIP security",
  "objectives": [
   "Students will be able to explain what a converged network is and the risks convergence introduces.",
   "Students will be able to distinguish VoIP signaling (SIP) from media (RTP) and name the protection for each.",
   "Students will be able to identify common VoIP threats including eavesdropping, toll fraud, caller ID spoofing and DoS.",
   "Students will be able to recommend layered controls for a converged network, such as voice VLANs, QoS, SBCs and call monitoring."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list everything students think runs over an office network."
   ],
   [
    14,
    "Teach",
    "Draw a converged office network with phones, laptops, cameras and badge readers. Trace a SIP call setup, then the RTP media flow. List threats beside each part of the diagram and add the matching controls in a second color."
   ],
   [
    16,
    "Activity",
    "Run the 'Phone bill investigation' group activity below."
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
  "warmup": "Besides computers, what devices in this building do you think send data over the network? What would happen if the network went down?",
  "activity": {
   "title": "Phone bill investigation",
   "materials": "A printed mock call detail record of about 20 lines (teacher-made, fictional numbers and times, including a cluster of overnight international calls from one extension), a printed one-page description of the fictional company's phone setup, highlighters.",
   "steps": [
    "Groups highlight suspicious entries in the call records and describe the pattern they see.",
    "Using the setup description (internet-facing PBX, default admin password, phones on data VLAN, no SRTP), groups identify how the attacker likely got in and what kind of attack this is.",
    "Groups write a remediation plan with at least five controls, labeling each as preventive or detective.",
    "Groups trade plans with another group, which checks that signaling, media, fraud and segmentation are all addressed."
   ]
  },
  "discussion": [
   "What are the benefits and risks of moving building systems like cameras and badge readers onto the same network as office computers?",
   "Why do many organizations encrypt VoIP signaling but forget the media, and how would you detect that gap?",
   "How should staff be trained to handle a call that appears to come from an internal number asking for sensitive information?"
  ],
  "exit": [
   [
    "Which protocol sets up VoIP calls, and which carries the audio?",
    "SIP sets up calls; RTP carries the audio."
   ],
   [
    "How do you encrypt VoIP media?",
    "Use Secure RTP (SRTP)."
   ],
   [
    "Name two controls that reduce toll fraud.",
    "Any two of: change default passwords, place the PBX behind an SBC, restrict international and premium-rate dialing, strong SIP authentication, and monitor call records for unusual patterns."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram showing signaling and media paths so students can attach threats and controls to the correct part.",
   "Extend: Ask fast finishers to explain why QoS settings are a security consideration for converged networks, connecting availability to the CIA triad."
  ]
 },
 {
  "t": "Malware types: virus, worm, trojan, ransomware, rootkit, logic bomb, fileless",
  "objectives": [
   "Students will be able to identify virus, worm, trojan, ransomware, rootkit, logic bomb and fileless malware from a description of behavior.",
   "Students will be able to explain how each malware type spreads and hides.",
   "Students will be able to recommend appropriate detection and prevention controls for each type.",
   "Students will be able to explain why rootkits and fileless malware require different detection approaches from traditional antivirus."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers about malware they have heard of."
   ],
   [
    13,
    "Teach",
    "Build a table on the board with columns for type, how it spreads, how it hides, what it does and key defense. Fill in each row with a short fictional example, emphasizing virus versus worm and trojan versus virus."
   ],
   [
    17,
    "Activity",
    "Run the 'Name that malware' card game below."
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
  "warmup": "Think of a time a computer or phone you used acted strangely. What did you notice, and what do you think caused it?",
  "activity": {
   "title": "Name that malware",
   "materials": "Printed behavior cards (about 16, two per type including bots and cryptominers as extras), printed defense cards, a whiteboard scoreboard, a timer.",
   "steps": [
    "Teams take turns drawing a behavior card, such as 'spreads to every server on port 445 overnight' or 'a script deletes files when a certain account is disabled', and have 30 seconds to name the malware type.",
    "If correct, the team then picks the best defense card from a shared pile for an extra point and explains why it fits.",
    "The teacher adds 'combo' cards describing multi-stage attacks, and teams must name every type involved in order.",
    "End with each team writing one new behavior card of their own for another team to solve."
   ]
  },
  "discussion": [
   "Why do attackers increasingly prefer living off the land techniques over traditional malware files?",
   "What makes logic bombs particularly hard to detect, and whose responsibility is it to catch them?",
   "If backups do not solve double-extortion ransomware, what else must an organization prepare?"
  ],
  "exit": [
   [
    "A program spreads across the network by exploiting an unpatched service with no user involvement. What type is it?",
    "A worm."
   ],
   [
    "What is the safest remediation for a kernel-mode rootkit, and why?",
    "Wipe and rebuild from known-good media, because the rootkit can make the operating system's own tools lie."
   ],
   [
    "Which tools and logs help detect fileless malware?",
    "EDR, behavior monitoring, PowerShell script block logging and command-line auditing."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-line definition card for each malware type that students may use during the game until they are confident.",
   "Extend: Ask fast finishers to describe a realistic multi-stage attack that uses at least three malware types and list one control that would break each stage."
  ]
 },
 {
  "t": "Malicious activity and indicators: beaconing, persistence, privilege escalation",
  "objectives": [
   "Students will be able to identify beaconing in proxy, DNS or firewall log excerpts by its timing, destination and size patterns.",
   "Students will be able to list at least four persistence mechanisms and the artifacts each leaves on Windows or Linux hosts.",
   "Students will be able to distinguish vertical from horizontal privilege escalation and name log indicators of each.",
   "Students will be able to describe the correct first response to an indicator: validate, escalate and preserve evidence."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up question. Collect three or four answers on the whiteboard and point out that most describe behavior, not files."
   ],
   [
    15,
    "Teach",
    "Walk through IoCs versus indicators of attack, then beaconing (periodicity, jitter, DNS tunneling), persistence (run keys, scheduled tasks, cron, services, SSH keys, web shells) and privilege escalation (vertical versus horizontal, group changes, sudo use). Close with lateral movement and the MITRE ATT&CK tactic names."
   ],
   [
    15,
    "Activity",
    "Run the log-hunt activity in pairs. Circulate and ask each pair which ATT&CK tactic each finding maps to."
   ],
   [
    5,
    "Discuss",
    "Ask pairs to share one benign explanation they considered and how they ruled it out. Emphasize validation before action."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "If an attacker broke into a laptop last week and the antivirus never alerted, what clues might still be left behind in logs or settings?",
  "activity": {
   "title": "Log hunt: find the beacon, the backdoor and the master key",
   "materials": "Printed log excerpt sheets the teacher prepares (a proxy log with one host contacting a single domain every 60 seconds plus normal browsing noise, a short list of Windows scheduled tasks and autostart entries, and a security log with a group membership change), highlighters, whiteboard.",
   "steps": [
    "Hand each pair the three excerpts and ask them to highlight anything suspicious.",
    "Pairs label each highlighted item as beaconing, persistence, privilege escalation or benign, and write one sentence of reasoning.",
    "Each pair writes the first three response actions they would take, in order.",
    "Reveal the answer key on the projector, including one deliberate red herring such as a software updater that checks in hourly, and discuss why it is benign."
   ]
  },
  "discussion": [
   "Why might an attacker choose DNS or a popular cloud service for command and control instead of a direct connection?",
   "What are the risks of immediately rebooting or reimaging a host when you see one indicator?"
  ],
  "exit": [
   [
    "A host contacts one rare domain every 58 to 62 seconds, all night. What is this most likely?",
    "Beaconing to a command and control server, with jitter."
   ],
   [
    "Name two persistence mechanisms on Linux.",
    "Cron jobs, systemd services, or added SSH authorized keys."
   ],
   [
    "A user reads a coworker's mailbox using a flaw in the mail app. Vertical or horizontal escalation?",
    "Horizontal, because the access is to another account at a similar privilege level."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page reference card with the three behaviors, two example artifacts for each, and a simple decision flow (regular outbound traffic, new autostart item, new admin rights) to use during the log hunt.",
   "Extend: Ask fast finishers to map every finding to its MITRE ATT&CK tactic and propose one SIEM detection rule, described in plain words, that would have caught the beacon earlier."
  ]
 },
 {
  "t": "Countermeasures: antimalware, sandboxing, allow-listing, user training",
  "objectives": [
   "Students will be able to compare signature-based, heuristic and behavior-based antimalware detection and their trade-offs.",
   "Students will be able to explain how sandboxing works and describe at least two ways malware evades it.",
   "Students will be able to contrast allow-listing with deny-listing and rank hash, publisher and path rules by strength.",
   "Students will be able to select the most appropriate countermeasure for a given malware scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list student answers on the whiteboard as 'stops known' or 'stops unknown'."
   ],
   [
    15,
    "Teach",
    "Explain the four countermeasures in order, using the nightclub analogy. Draw a simple table on the board with columns for known threats, unknown threats, false positives and admin effort, and fill it in with the class."
   ],
   [
    15,
    "Activity",
    "Run the control-matching card sort in groups of three. Circulate and challenge each group to justify one choice."
   ],
   [
    5,
    "Discuss",
    "Groups share a scenario where two controls seemed equally good and explain how they decided. Highlight that the exam rewards matching the control to the gap."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on paper."
   ]
  ],
  "warmup": "Your antivirus is fully up to date. Name one kind of malicious software it might still miss, and why.",
  "activity": {
   "title": "Control matching card sort",
   "materials": "Two sets of printed cards per group: eight scenario cards (for example a kiosk that must never run new software, an unknown PDF attachment, a known ransomware family, a phishing email that reached inboxes) and control cards (signature antimalware, behavior-based detection, sandbox, allow-listing, deny-listing, user training and reporting). Whiteboard for results.",
   "steps": [
    "Groups match each scenario card with the single best control card and a backup control.",
    "For each match, groups write the main weakness of their chosen control on a sticky note.",
    "Groups post their matches on the whiteboard grid.",
    "The class compares grids, and the teacher reveals the intended answers and explains any disagreement."
   ]
  },
  "discussion": [
   "Why might an organization accept the overhead of allow-listing on servers but not on developer laptops?",
   "How would you measure whether security awareness training is actually working?"
  ],
  "exit": [
   [
    "Which control best stops unknown malware on a point-of-sale terminal?",
    "Application allow-listing, because anything not approved cannot execute."
   ],
   [
    "Give one way malware can evade a sandbox.",
    "It can detect a virtual or analysis environment, or delay its actions until after the analysis window."
   ],
   [
    "What is the main weakness of signature-based detection?",
    "It cannot detect new or modified malware until signatures are created and distributed."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed comparison table with the known and unknown threat columns filled in, so struggling students focus on matching controls to scenarios.",
   "Extend: Ask fast finishers to design a layered malware defense for a small law office with a limited budget, naming which layer handles delivery, execution, detection and recovery."
  ]
 },
 {
  "t": "Endpoint security: HIDS/HIPS, EDR, host firewalls, hardening, patch management",
  "objectives": [
   "Students will be able to distinguish HIDS, HIPS and EDR by what each detects, blocks and records.",
   "Students will be able to explain how a host firewall limits lateral movement and protects roaming devices.",
   "Students will be able to list key hardening steps and the purpose of a secure configuration baseline.",
   "Students will be able to sequence the steps of a patch management process, including exception handling."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and write answers on the board. Steer toward the idea that laptops leave the network perimeter."
   ],
   [
    15,
    "Teach",
    "Use the apartment building analogy to introduce HIDS, HIPS, FIM, EDR and XDR, then host firewalls, hardening baselines and the patch process. Label each control as preventive, detective or corrective on the board."
   ],
   [
    15,
    "Activity",
    "Run the patch process and incident role-play in groups of four."
   ],
   [
    5,
    "Discuss",
    "Groups report where their process broke down, such as a missing inventory or a failed test, and the class discusses compensating controls."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on index cards."
   ]
  ],
  "warmup": "A company has an excellent network firewall and intrusion detection at headquarters. Name two situations where an attack on a laptop would never pass through either.",
  "activity": {
   "title": "Patch Tuesday and the alerting laptop",
   "materials": "Printed role cards (asset owner, security analyst, change manager, help desk), a printed scenario sheet describing a critical patch, an old server that cannot be patched, and an EDR alert on one laptop, sticky notes, whiteboard.",
   "steps": [
    "Groups put the patch steps, written on sticky notes in random order, into the correct sequence on the whiteboard.",
    "Each role explains what they need before the patch can be deployed, and the group decides how to handle the unpatchable server with compensating controls.",
    "Midway, the teacher reads out the EDR alert; the analyst decides whether to isolate the laptop and the group names which other endpoint controls should have limited the damage.",
    "Groups write a two-sentence summary of their decisions to share."
   ]
  },
  "discussion": [
   "Should everyday users ever have local administrator rights? What are the trade-offs?",
   "How would you convince a manager that patch compliance is worth measuring and reporting?"
  ],
  "exit": [
   [
    "Which control alerts on suspicious host activity but does not block it?",
    "A HIDS."
   ],
   [
    "Name one remote response action EDR provides.",
    "Isolating the host from the network, killing a process or collecting files."
   ],
   [
    "What should you do when a critical server cannot be patched?",
    "Document the exception and apply compensating controls such as isolation and extra monitoring."
   ]
  ],
  "differentiation": [
   "Support: Give students a three-column chart (prevent, detect, respond) with each control named on a card so they can sort them physically before the role-play.",
   "Extend: Ask fast finishers to draft a one-paragraph host firewall policy for standard workstations, stating which inbound connections are allowed and why."
  ]
 },
 {
  "t": "Mobile device management: MDM/UEM, BYOD vs COPE, containerization, remote wipe",
  "objectives": [
   "Students will be able to describe common MDM policy controls and explain how MAM and UEM differ from MDM.",
   "Students will be able to compare BYOD, COPE, COBO and CYOD by ownership, control and privacy.",
   "Students will be able to explain how containerization supports BYOD security and privacy.",
   "Students will be able to choose between a full wipe and a selective wipe for a given device scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question by show of hands, then ask two volunteers to explain their reasoning."
   ],
   [
    15,
    "Teach",
    "Present MDM controls, then MAM and UEM. Draw a two-axis chart on the board (who owns the device, how much control) and place BYOD, CYOD, COPE and COBO on it. Explain containerization with the rented-room analogy and contrast full and selective wipe."
   ],
   [
    15,
    "Activity",
    "Run the policy negotiation role-play in groups of four."
   ],
   [
    5,
    "Discuss",
    "Groups share the clause they argued about most. Connect their decisions back to exam answers such as containerization plus selective wipe for BYOD."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a half sheet."
   ]
  ],
  "warmup": "Would you let your employer install software on your personal phone so you could read work email? What would you want the employer to be unable to see or do?",
  "activity": {
   "title": "Writing a mobile policy together",
   "materials": "Printed role cards (security manager, HR representative, employee representative, help desk lead), a printed one-page blank policy template with headings for deployment model, required controls, monitoring, loss and departure, user responsibilities, whiteboard.",
   "steps": [
    "Each group receives a fictional company profile, such as a small accounting firm or a delivery company with field tablets.",
    "Students in role negotiate and fill in the policy template, choosing a deployment model and listing required MDM controls.",
    "Groups must state exactly what happens on loss and on resignation, including the wipe type.",
    "The teacher presents a surprise event, such as a jailbroken phone or a phone lost abroad, and groups check whether their policy handles it."
   ]
  },
  "discussion": [
   "Where should the line be between an organization's need to protect data and an employee's right to privacy on a personal device?",
   "Why might an organization choose COBO for some roles even though employees find it inconvenient?"
  ],
  "exit": [
   [
    "An employee using a personal phone leaves the company. What type of wipe is appropriate?",
    "A selective (enterprise) wipe that removes only corporate data and apps."
   ],
   [
    "Which deployment model has the organization owning the device while allowing personal use?",
    "COPE, corporate-owned, personally enabled."
   ],
   [
    "Why are encryption and a screen lock still needed if remote wipe is available?",
    "A wipe only works if the device connects to a network; encryption protects data on a device that never does."
   ]
  ],
  "differentiation": [
   "Support: Provide a matching worksheet that pairs each acronym (MDM, MAM, UEM, BYOD, COPE, COBO, CYOD) with a one-line definition and a picture cue before the role-play.",
   "Extend: Ask fast finishers to write a conditional access rule in plain language that blocks non-compliant devices, listing the compliance checks it requires and what the user sees when blocked."
  ]
 },
 {
  "t": "Cloud models and shared responsibility (IaaS, PaaS, SaaS)",
  "objectives": [
   "Students will be able to list the five NIST essential characteristics of cloud computing.",
   "Students will be able to compare IaaS, PaaS and SaaS by which layers the customer and provider manage.",
   "Students will be able to assign responsibility for a given security failure under the shared responsibility model.",
   "Students will be able to distinguish public, private, community, hybrid and multi-cloud deployments."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect quick answers. Note any that assume the provider handles everything."
   ],
   [
    15,
    "Teach",
    "Draw a stack on the board (facilities, hardware, virtualization, OS, runtime, application, data, identity) with three columns for IaaS, PaaS and SaaS. Shade the provider's layers in each column with the class. Then cover the NIST characteristics and deployment models."
   ],
   [
    15,
    "Activity",
    "Run the 'whose fault is it' card sort in pairs."
   ],
   [
    5,
    "Discuss",
    "Review the hardest cards together and highlight that data, identity and configuration stay with the customer."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "Your company's email moves to a cloud provider. If an employee's account is taken over because it had no MFA, whose responsibility was that?",
  "activity": {
   "title": "Whose fault is it? A shared responsibility card sort",
   "materials": "Printed incident cards the teacher makes (for example an unpatched VM OS, a power failure in the data center, a public SaaS sharing link, a database engine flaw on a PaaS service, a weak admin password, a failed hypervisor), a printed three-column mat labeled IaaS, PaaS, SaaS with rows for customer and provider, whiteboard.",
   "steps": [
    "Pairs place each incident card on the mat, deciding the service model and whether the customer or provider was responsible.",
    "Pairs mark any card where the answer changes depending on the service model.",
    "The teacher calls on pairs to defend one placement each.",
    "The class builds a single agreed chart on the whiteboard."
   ]
  },
  "discussion": [
   "Why do you think most cloud breaches come from customer misconfiguration rather than provider failures?",
   "When might an organization choose a private or community cloud over public cloud despite the higher cost?"
  ],
  "exit": [
   [
    "In PaaS, who patches the database engine?",
    "The provider."
   ],
   [
    "Name one responsibility the customer keeps in every cloud model.",
    "Their data, identity and access management, or the configuration of the services they use."
   ],
   [
    "What is the difference between hybrid cloud and multi-cloud?",
    "Hybrid combines deployment models such as on-premises and public; multi-cloud uses several public providers."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students the rental analogy (unfurnished apartment, furnished apartment, hotel) printed next to the stack diagram so they can map each layer to something familiar.",
   "Extend: Ask fast finishers to list five questions they would ask a SaaS vendor before signing, covering audit reports, data location, breach notification and exit."
  ]
 },
 {
  "t": "Cloud security: IAM, encryption, CSPM, misconfigured storage, data residency",
  "objectives": [
   "Students will be able to describe cloud IAM best practices, including root account protection, MFA, roles and temporary credentials.",
   "Students will be able to compare provider-managed keys, customer-managed keys and BYOK or HYOK.",
   "Students will be able to differentiate CSPM, CWPP and CASB and match each to a problem.",
   "Students will be able to explain data residency and data sovereignty and how region choice and replication affect them."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and gather answers. Lead students toward credentials and configuration as the cloud perimeter."
   ],
   [
    15,
    "Teach",
    "Use the self-storage analogy to walk through IAM, encryption key options, misconfigured storage, CSPM versus CASB, and data residency. Write a short 'tool for the job' table on the board."
   ],
   [
    15,
    "Activity",
    "Run the configuration review activity in groups of three."
   ],
   [
    5,
    "Discuss",
    "Each group names its single most dangerous finding and the control that should have prevented it."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If a company has no physical servers and everything is in the cloud, what is the 'front door' an attacker tries to open?",
  "activity": {
   "title": "Spot the misconfigurations",
   "materials": "A printed one-page fictional cloud account summary the teacher prepares (a user list with MFA status and attached permissions, a storage bucket list with public flags and regions, a key list with ages, logging status and a replication setting), highlighters, sticky notes, whiteboard.",
   "steps": [
    "Groups highlight every risky setting they can find on the account summary.",
    "For each finding, groups write on a sticky note the risk, the fix, and whether CSPM, CASB or an IAM review would catch it.",
    "Groups identify any data residency problem caused by replication or backup settings.",
    "The teacher reveals the answer key and tallies which group found the most issues."
   ]
  },
  "discussion": [
   "Should developers ever be allowed to create publicly accessible storage? What guardrails would make that safe?",
   "What are the trade-offs of holding your own encryption keys outside the cloud provider?"
  ],
  "exit": [
   [
    "Which tool continuously detects misconfigurations such as public storage in cloud accounts?",
    "CSPM."
   ],
   [
    "Why should temporary credentials be preferred over access keys?",
    "They expire automatically, so a leaked credential has limited value."
   ],
   [
    "Name one setting that can undermine data residency even when the primary region is correct.",
    "Cross-region replication, backups or disaster recovery copies stored elsewhere."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a checklist of six things to look for on the account summary (MFA, root use, public flags, key age, logging, replication region) so they can work through it systematically.",
   "Extend: Ask fast finishers to write two policy rules in plain language for an organization-wide guardrail, one blocking public storage and one restricting resources to approved regions."
  ]
 },
 {
  "t": "Virtualization: hypervisors, VM escape, VM sprawl, snapshots",
  "objectives": [
   "Students will be able to compare Type 1 and Type 2 hypervisors and explain how containers differ from VMs.",
   "Students will be able to explain VM escape and list defenses including patching and workload separation.",
   "Students will be able to identify causes of VM sprawl and propose lifecycle controls to prevent it.",
   "Students will be able to explain why snapshots are not backups and the security risks of reverting."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and have students vote. Use the results to introduce shared infrastructure risk."
   ],
   [
    15,
    "Teach",
    "Draw a host with a hypervisor and several VMs on the board. Label Type 1 and Type 2, then mark where VM escape occurs, where the management console sits, and how a snapshot relates to the disk. Discuss sprawl with the apartment analogy."
   ],
   [
    15,
    "Activity",
    "Run the cluster audit activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Pairs present their top three recommendations, and the class ranks them by risk reduction."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If ten companies rent apartments in the same building and one tenant digs through a wall, who is at risk? How does that relate to servers?",
  "activity": {
   "title": "Virtualization cluster audit",
   "materials": "A printed fictional VM inventory the teacher prepares (VM names, owner tags, last patch dates, snapshot ages, which host each runs on and its sensitivity level), plus a short description of the management console setup; highlighters and the whiteboard.",
   "steps": [
    "Pairs highlight VMs that show signs of sprawl, such as missing owners or very old patch dates.",
    "Pairs flag any host that mixes high-sensitivity and internet-facing VMs and any snapshot older than a reasonable window.",
    "Pairs evaluate the management console description and list weaknesses.",
    "Pairs write three prioritized recommendations and post them on the whiteboard."
   ]
  },
  "discussion": [
   "Why might teams keep snapshots for months even though they know snapshots are not backups?",
   "How would you persuade a busy development team to tag and expire their test VMs?"
  ],
  "exit": [
   [
    "Which hypervisor type runs directly on hardware?",
    "Type 1, or bare-metal."
   ],
   [
    "Give two controls that reduce VM sprawl.",
    "Owner and expiry tagging, automated inventory, formal provisioning tied to change management, or regular reviews and decommissioning."
   ],
   [
    "Why are snapshots not backups?",
    "They usually live on the same storage and depend on the original disk, so a storage failure can destroy both."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of a host, hypervisor, VMs and management console that students can annotate during the audit instead of starting from a blank page.",
   "Extend: Ask fast finishers to write a short VM lifecycle standard covering request, approval, tagging, patching, snapshot limits and decommissioning."
  ]
 },
 {
  "t": "Secure application basics: input validation, OWASP Top 10",
  "objectives": [
   "Students will be able to explain why input validation must be server-side and why allow-listing is stronger than deny-listing.",
   "Students will be able to describe at least six OWASP Top 10 risk categories with an example of each.",
   "Students will be able to match SQL injection, XSS, CSRF and broken access control to their primary defenses.",
   "Students will be able to identify where SAST, DAST, SCA and a WAF fit in secure development."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and ask students what they think went wrong. Write their guesses on the board."
   ],
   [
    15,
    "Teach",
    "Explain the trust boundary and input validation, then walk through OWASP Top 10 categories at the concept level. Cover SQL injection, XSS, CSRF and broken access control using the restaurant analogy, focusing on recognition and defense only."
   ],
   [
    15,
    "Activity",
    "Run the vulnerability triage card game in groups of three."
   ],
   [
    5,
    "Discuss",
    "Groups share the card they found hardest and why. Emphasize that WAFs and client-side checks are not the primary fix."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "A shopping site shows your order at an address ending in order=1001. You change it to 1002 and see a stranger's order. Is that the user's fault, the browser's fault, or the application's fault?",
  "activity": {
   "title": "Vulnerability triage card game",
   "materials": "Printed scenario cards the teacher makes, each describing a symptom in plain words (for example a search term appearing unencoded on the page, a detailed database error shown to users, an old library with a known flaw, an admin page reachable without login, a form that changes account email with no token), printed defense cards (parameterized queries, output encoding, server-side authorization checks, anti-CSRF tokens, patching components, generic error messages, MFA), whiteboard.",
   "steps": [
    "Groups sort the scenario cards into OWASP categories written on the whiteboard.",
    "Groups pair each scenario with its primary defense card and one supporting control.",
    "Groups rank the scenarios by severity and justify the top choice.",
    "The teacher reveals the answer key and discusses any category that changed name across OWASP editions."
   ]
  },
  "discussion": [
   "If you are not a developer, how can you still help an organization reduce application vulnerabilities?",
   "Why is a WAF considered a compensating control rather than a fix?"
  ],
  "exit": [
   [
    "What is the primary defense against SQL injection?",
    "Parameterized queries, also called prepared statements."
   ],
   [
    "Why is client-side validation insufficient?",
    "Attackers can bypass the browser and send requests directly to the server."
   ],
   [
    "Which testing method analyzes source code without running it?",
    "Static application security testing (SAST)."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page sheet listing each attack with a plain-language symptom and its defense, so they can refer to it during the card game.",
   "Extend: Ask fast finishers to review a short printed pseudo-code snippet that builds a query from user input and explain, in words, how a parameterized version would differ."
  ]
 }
]);
