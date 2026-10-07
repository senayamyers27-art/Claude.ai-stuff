/* Teacher edition for ISC2 CISSP (2024 outline): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("cissp", [
 {
  "t": "Professional ethics: ISC2 Code of Ethics canons and organizational ethics",
  "objectives": [
   "Students will be able to list the four ISC2 Code of Ethics canons in priority order.",
   "Students will be able to explain how the ranking resolves conflicts between duty to principals and duty to society or the law.",
   "Students will be able to apply the canons to a workplace dilemma and choose a measured, internal-first response.",
   "Students will be able to distinguish the ISC2 code from an organization's own code of conduct."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take three or four quick answers. Write recurring words such as 'loyalty' and 'safety' on the board without judging them."
   ],
   [
    12,
    "Teach",
    "Present the preamble and the four canons in order. Stress 'be seen to adhere' and the rule that a higher canon wins. Walk through the water utility example from the lesson, naming the canon at each decision point, and cover who may file a complaint under each canon."
   ],
   [
    15,
    "Activity",
    "Run the dilemma card sort described below. Circulate and ask each group which canon outranks which in their card."
   ],
   [
    8,
    "Discuss",
    "Have two groups present their hardest card. Use the discussion questions to draw out the difference between internal escalation and dramatic external action."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post it by the door."
   ]
  ],
  "warmup": "Your manager asks you to leave a serious security finding out of a report until after a big product launch. You like your manager and want to keep your job. What would you do, and why?",
  "activity": {
   "title": "Canon ranking dilemma sort",
   "materials": "Printed dilemma cards (eight short scenarios), four header cards labeled Canon 1 to Canon 4, sticky notes, whiteboard.",
   "steps": [
    "Put students in groups of three or four and give each group the header cards and a shuffled set of dilemma cards, such as a client asking to falsify a report, a vendor offering a gift, a colleague practicing without qualifications and an employer hiding a public safety flaw.",
    "For each card, groups decide which canons are in tension and place it under the canon that should win, writing the losing canon on a sticky note attached to the card.",
    "Groups then write one sentence describing the first appropriate action, such as escalating to higher management or declining a gift, and avoid dramatic answers unless internal channels are exhausted.",
    "Groups swap tables, review another group's placements and mark any they disagree with for the class discussion."
   ]
  },
  "discussion": [
   "When, if ever, is going outside the organization, such as to a regulator, the right next step for a CISSP?",
   "Why might the mere appearance of a conflict of interest matter as much as an actual one?",
   "How does tone at the top affect whether staff feel safe reporting ethical problems?"
  ],
  "exit": [
   [
    "List the four canons in priority order.",
    "Protect society and infrastructure; act honorably, honestly, justly, responsibly and legally; provide diligent and competent service to principals; advance and protect the profession."
   ],
   [
    "A client asks you to omit a finding that affects public safety. Which canon governs, and what do you do first?",
    "Canon one outranks canon three. Report accurately, explain the risk and escalate to higher management rather than going to the media."
   ],
   [
    "Who can file an ethics complaint about a breach of canon three?",
    "Only principals, meaning the employers, clients or customers the member served."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page reference card with the canons, clue words for each and a decision flow (Is the public at risk? Is it dishonest or illegal? Then serve the principal).",
   "Extend: Ask fast finishers to write their own dilemma in which canons two and three conflict without any public safety issue, and to explain the best first action and the canon that wins."
  ]
 },
 {
  "t": "Security concepts: CIA triad, authenticity, non-repudiation",
  "objectives": [
   "Students will be able to define confidentiality, integrity, availability, authenticity and non-repudiation.",
   "Students will be able to classify a control or attack by the security goal it protects or harms.",
   "Students will be able to compare hashes, HMACs and digital signatures in terms of integrity, authentication and non-repudiation.",
   "Students will be able to explain why a shared private key destroys non-repudiation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up prompt and collect answers. Note which students name confidentiality only, which shows why the other goals need teaching."
   ],
   [
    12,
    "Teach",
    "Define each goal with clue words, then build a three-column table on the board for hash, HMAC and digital signature showing what each provides. Use the purchasing manager example to show why only the signature gives non-repudiation. Briefly introduce DAD and the Parkerian hexad."
   ],
   [
    15,
    "Activity",
    "Run the goal-matching relay described below."
   ],
   [
    8,
    "Discuss",
    "Review contested cards and use the discussion questions to explore trade-offs between goals."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions individually on paper."
   ]
  ],
  "warmup": "Your bank's mobile app is down for a whole day, but no money is stolen and no data leaks. Has there been a security incident? Why or why not?",
  "activity": {
   "title": "Which goal is it? relay",
   "materials": "Printed cards with 16 short scenarios or controls (for example 'ransomware encrypts records', 'file integrity monitoring alert', 'signed purchase order', 'shoulder surfing'), whiteboard divided into five columns labeled C, I, A, Authenticity, Non-repudiation, tape.",
   "steps": [
    "Split the class into two teams and place the shuffled cards face down at the front.",
    "One student from each team at a time draws a card, tapes it under the goal most directly protected or harmed and explains in one sentence why.",
    "The other team may challenge a placement; if the challenge is correct, they win the point and the card moves.",
    "Finish by asking each team to pick one card that harms two goals at once and explain which is primary in that scenario."
   ]
  },
  "discussion": [
   "Should a hospital and a bank rank the three CIA goals the same way? What drives the difference?",
   "If a company stores its signing key on several servers for convenience, what has it gained and what has it lost?"
  ],
  "exit": [
   [
    "Which control provides non-repudiation: a hash, an HMAC or a digital signature?",
    "A digital signature, because only the signer holds the private key; HMACs use a shared secret and anyone can compute a hash."
   ],
   [
    "A server room floods and systems go offline. Which goal is harmed?",
    "Availability."
   ],
   [
    "What are the three parts of the DAD triad, and what does each oppose?",
    "Disclosure opposes confidentiality, alteration opposes integrity and destruction opposes availability."
   ]
  ],
  "differentiation": [
   "Support: Provide a clue-word cheat sheet (leak, tampered, outage, cannot deny) and let students use it during the relay.",
   "Extend: Ask students to design a process for approving large payments that provides confidentiality, integrity and non-repudiation, naming the specific mechanism for each and the condition each depends on."
  ]
 },
 {
  "t": "Security governance: alignment with business strategy, roles, due care vs due diligence",
  "objectives": [
   "Students will be able to explain why security governance must be top-down and aligned with business strategy.",
   "Students will be able to identify who holds ultimate responsibility and describe the roles of the CISO, steering committee, data owners and custodians.",
   "Students will be able to distinguish due care from due diligence in scenarios.",
   "Students will be able to match strategic, tactical and operational plans to their time horizons."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and tally answers on the board (CISO, IT, CEO, board, everyone)."
   ],
   [
    12,
    "Teach",
    "Cover top-down governance, planning horizons and roles. Explain why CISO independence matters. Teach due diligence ('do detect') versus due care ('do correct') with the acquisition example. Mention COBIT, ISO/IEC 27000 and the NIST Cybersecurity Framework Govern function."
   ],
   [
    15,
    "Activity",
    "Run the boardroom role-play described below."
   ],
   [
    8,
    "Discuss",
    "Debrief the role-play using the discussion questions, linking each decision to a role and to due care or due diligence."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "If a company suffers a major breach, who should answer to regulators and shareholders: the IT team, the CISO or the board? Commit to one answer.",
  "activity": {
   "title": "Acquisition boardroom role-play",
   "materials": "Printed role cards (board chair, chief executive, CISO, CIO, data owner, auditor), a one-page scenario about acquiring a smaller company with unencrypted customer data, whiteboard.",
   "steps": [
    "Form groups of six and hand out role cards with each role's goals and concerns.",
    "Groups hold a ten-minute meeting to decide whether and how to proceed with the acquisition, recording each action on the board as either due diligence or due care.",
    "The auditor in each group notes who made each decision and whether it matched that role's authority.",
    "Each group writes a two-sentence summary of who accepted the residual risk and why."
   ]
  },
  "discussion": [
   "What risks arise when the CISO reports to the CIO, and what might justify that arrangement anyway?",
   "Can an organization show due care without first doing due diligence? Why or why not?",
   "How should security be presented to a board so that it is seen as an enabler rather than a cost center?"
  ],
  "exit": [
   [
    "Who holds ultimate responsibility for an organization's security?",
    "Senior management and the board; they can delegate tasks but not accountability."
   ],
   [
    "Reviewing a cloud provider's audit report before signing is due care or due diligence?",
    "Due diligence, because it is research and assessment before acting."
   ],
   [
    "Which planning horizon covers a one-year project to deploy multifactor authentication?",
    "Tactical planning."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-column sheet with 'research and verify' versus 'implement and maintain' and example actions to sort before the role-play.",
   "Extend: Ask students to sketch an organization chart that keeps the CISO independent and write a short justification for the board explaining the reporting line."
  ]
 },
 {
  "t": "Legal and regulatory issues: cybercrime, privacy law, intellectual property, transborder data flow",
  "objectives": [
   "Students will be able to distinguish criminal, civil and administrative law by who brings the case and what remedies apply.",
   "Students will be able to match an asset to the correct form of intellectual property protection.",
   "Students will be able to explain key GDPR obligations, including extraterritorial scope and transfer mechanisms.",
   "Students will be able to identify when a security professional must involve legal counsel."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up and have students vote by raising hands for each IP type."
   ],
   [
    12,
    "Teach",
    "Explain the three categories of law, cybercrime and jurisdiction, GDPR and US sector-based privacy laws, the four IP types and transborder data flow. Emphasize that PCI DSS is a contractual standard and that legal decisions belong to counsel."
   ],
   [
    15,
    "Activity",
    "Run the legal triage stations described below."
   ],
   [
    8,
    "Discuss",
    "Bring groups together to compare answers and work through the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on paper."
   ]
  ],
  "warmup": "A company has a secret recipe, a famous logo, a new kind of mixer it invented and the text of its cookbook. Which of these would you patent, and which would you never want to patent?",
  "activity": {
   "title": "Legal triage stations",
   "materials": "Four printed station cards (IP, privacy, cybercrime, transborder data) each with three short scenarios, answer sheets, whiteboard.",
   "steps": [
    "Set up four stations around the room and divide the class into four groups.",
    "Groups spend about three and a half minutes at each station, deciding for each scenario the category of law or IP type involved, the key obligation and whether counsel must be involved.",
    "At the transborder station, groups must name one lawful transfer mechanism and one localization concern.",
    "Groups record answers on a shared sheet; the teacher marks common errors to address in discussion."
   ]
  },
  "discussion": [
   "Why do cross-border cybercrime cases often go unprosecuted, and what helps?",
   "Should security teams ever make breach notification decisions without legal counsel? What could go wrong?"
  ],
  "exit": [
   [
    "A proprietary algorithm protected only by NDAs and access controls is what form of IP?",
    "A trade secret, lasting as long as reasonable steps keep it confidential."
   ],
   [
    "Is PCI DSS a law?",
    "No. It is an industry standard enforced by contract, though some laws reference it."
   ],
   [
    "Name a GDPR mechanism for transferring personal data out of the EU.",
    "An adequacy decision, standard contractual clauses or binding corporate rules."
   ]
  ],
  "differentiation": [
   "Support: Provide a matching chart of IP types with a one-word cue (code, logo, invention, secret) and law categories with cue words (prosecuted, damages, agency).",
   "Extend: Have students draft a one-paragraph memo to a CEO explaining which legal obligations apply when a US company starts serving EU customers from a US cloud region."
  ]
 },
 {
  "t": "Investigation types: administrative, criminal, civil, regulatory",
  "objectives": [
   "Students will be able to compare administrative, criminal, civil and regulatory investigations by who runs them, standard of proof and outcome.",
   "Students will be able to explain why evidence handling must be rigorous from the start of any investigation.",
   "Students will be able to describe chain of custody, legal holds and the role of hashing forensic images.",
   "Students will be able to identify who should decide to involve law enforcement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list the students' first steps on the board."
   ],
   [
    12,
    "Teach",
    "Teach the four investigation types with a comparison table on the board covering who runs it, standard of proof and outcome. Explain chain of custody, write blockers, hashing, legal holds, EDRM and the best evidence rule. Walk through the DLP example as it escalates."
   ],
   [
    15,
    "Activity",
    "Run the escalating case activity described below."
   ],
   [
    8,
    "Discuss",
    "Revisit the warm-up list and mark which first steps would have harmed later cases. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions individually."
   ]
  ],
  "warmup": "You find evidence on a coworker's computer that suggests he is stealing customer data. What are the first three things you would do?",
  "activity": {
   "title": "The escalating case",
   "materials": "Four printed case update cards revealed one at a time, blank chain-of-custody forms (teacher-made), whiteboard.",
   "steps": [
    "Groups of three receive the first card: an internal policy alert about an employee. They decide the investigation type and fill out a chain-of-custody entry for a laptop.",
    "Reveal card two (the employee has joined a competitor) and card three (the files are export-controlled). After each, groups state the new or additional investigation type and the standard of proof.",
    "Reveal card four, which describes a mistake made at the start (someone opened files on the original drive). Groups decide how it affects each case.",
    "Each group writes one rule they would put in an incident procedure to prevent that mistake."
   ]
  },
  "discussion": [
   "What does an organization give up when it involves law enforcement, and when is it worth it?",
   "How can an organization balance a fast internal response with preserving evidence for possible court use?"
  ],
  "exit": [
   [
    "Which investigation type uses 'preponderance of the evidence'?",
    "Civil."
   ],
   [
    "Why hash a forensic image?",
    "To prove the copy is identical to the original and unchanged since collection."
   ],
   [
    "Who should normally decide whether to call law enforcement?",
    "Senior management, advised by legal counsel."
   ]
  ],
  "differentiation": [
   "Support: Provide a filled-in comparison table template with blanks for students to complete during the teach segment.",
   "Extend: Ask students to map the EDRM stages onto the escalating case and identify where the organization's legal hold should have started."
  ]
 },
 {
  "t": "Policies, standards, procedures, baselines and guidelines",
  "objectives": [
   "Students will be able to define policies, standards, baselines, procedures and guidelines.",
   "Students will be able to identify which document types are mandatory and which is optional.",
   "Students will be able to classify document excerpts by type.",
   "Students will be able to describe a formal exception process and why policies should be technology-neutral."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up excerpt and ask students what is wrong with it."
   ],
   [
    10,
    "Teach",
    "Present the hierarchy with the restaurant comparison. Emphasize that guidelines are the only optional type, that baselines are mandatory minimums and that product names belong in standards. Cover document review cycles and the exception process."
   ],
   [
    17,
    "Activity",
    "Run the document sort and rewrite described below."
   ],
   [
    8,
    "Discuss",
    "Have groups share their rewritten policy and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on a sticky note."
   ]
  ],
  "warmup": "Here is a sentence from a company policy signed by the CEO: 'All laptops must run Product X antivirus version 7.2.' What problem will this cause next year?",
  "activity": {
   "title": "Document sort and rewrite",
   "materials": "Printed strips with 15 document excerpts (for example 'Step 4: select Encrypt drive', 'Staff are encouraged to use a password manager', 'Servers must meet the hardened build image'), five labeled envelopes, whiteboard.",
   "steps": [
    "In pairs, students sort the strips into envelopes labeled Policy, Standard, Baseline, Procedure and Guideline.",
    "Pairs mark each strip as mandatory or optional and check against the answer key the teacher reveals.",
    "Each pair takes one badly written policy excerpt that names a product and rewrites it as a technology-neutral policy plus a matching standard.",
    "Pairs write a one-line exception request for a team that cannot meet the standard, including a compensating control and an expiry date."
   ]
  },
  "discussion": [
   "Why do unenforced policies weaken an organization's legal position?",
   "How often should policies be reviewed, and what events should trigger an early review?"
  ],
  "exit": [
   [
    "Which document type is optional?",
    "Guidelines."
   ],
   [
    "What is the difference between a standard and a baseline?",
    "A standard sets a specific mandatory requirement; a baseline is the minimum security configuration a type of system must meet."
   ],
   [
    "List the elements of a proper policy exception.",
    "A documented request, risk assessment, compensating controls, approval by the right authority and an expiry date."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-line definition card for each document type with a cue question (Why? Which specifics? Minimum? How? Suggested?).",
   "Extend: Have students draft a complete small set for one topic, such as remote work: a policy sentence, a standard, a baseline item, a three-step procedure and a guideline."
  ]
 },
 {
  "t": "Business continuity: BIA, RTO/RPO/MTD, BCP scope",
  "objectives": [
   "Students will be able to describe the purpose of a business impact analysis and how it differs from a risk assessment.",
   "Students will be able to define MTD, RTO, RPO and WRT and explain how they relate.",
   "Students will be able to evaluate whether a proposed recovery plan meets its MTD and RPO.",
   "Students will be able to compare recovery site types and BCP test types by cost and risk."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect estimates. Point out that the class just guessed values a BIA should determine."
   ],
   [
    12,
    "Teach",
    "Explain BCP versus DR, project scope, the BIA and the time values. Draw a timeline on the board showing the disruption, RPO backward to the last good copy, then RTO and WRT forward, all inside MTD. Cover hot, warm and cold sites and the range of test types."
   ],
   [
    15,
    "Activity",
    "Run the recovery timeline challenge described below."
   ],
   [
    8,
    "Discuss",
    "Have groups present one process and defend their site choice. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on paper."
   ]
  ],
  "warmup": "If your school's student records system went down right now, how long could the school operate before serious harm? How much recent data could it afford to lose?",
  "activity": {
   "title": "Recovery timeline challenge",
   "materials": "Printed process cards (online orders, payroll, email archive, patient records, training portal) listing impact over time and backup frequency, strips of paper for timelines, markers, whiteboard.",
   "steps": [
    "Groups of three receive two process cards and determine the MTD and required RPO for each from the impact data.",
    "Groups draw a timeline showing a proposed RTO and WRT and check that RTO plus WRT fits inside the MTD.",
    "Groups check whether the current backup frequency meets the RPO and, if not, propose replication or more frequent backups.",
    "Groups choose a hot, warm or cold site for each process and write one sentence justifying the cost."
   ]
  },
  "discussion": [
   "Why should business units, not IT, set recovery priorities?",
   "When would you justify a full interruption test, and who must approve it?"
  ],
  "exit": [
   [
    "A process has an MTD of 12 hours. Is an RTO of 16 hours acceptable?",
    "No. The RTO must be shorter than the MTD."
   ],
   [
    "Backups run nightly at midnight. What RPO does that support?",
    "Up to 24 hours of data loss."
   ],
   [
    "What is the first priority in any disaster?",
    "The safety of people."
   ]
  ],
  "differentiation": [
   "Support: Provide a timeline template with labeled boxes for last backup, disruption, RTO, WRT and MTD so students only fill in values.",
   "Extend: Ask students to design a test schedule for one year that moves from a read-through to a parallel test, explaining what each stage proves."
  ]
 },
 {
  "t": "Personnel security: screening, onboarding, transfers, termination, vendor agreements",
  "objectives": [
   "Students will be able to describe security controls at each stage of the employment life cycle.",
   "Students will be able to compare separation of duties, job rotation and mandatory vacation and identify which detect and which prevent fraud.",
   "Students will be able to explain privilege creep and how access reviews and transfer procedures prevent it.",
   "Students will be able to list security terms a vendor contract should include."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up and collect ideas on sticky notes posted on the board."
   ],
   [
    12,
    "Teach",
    "Walk the life cycle: job descriptions and screening, onboarding, controls during employment, transfers, termination and vendor agreements. Use the finance clerk example to show privilege creep, and stress the timing rule for involuntary terminations."
   ],
   [
    15,
    "Activity",
    "Run the life cycle gap hunt described below."
   ],
   [
    8,
    "Discuss",
    "Groups share their most serious gap. Use the discussion questions to address fairness and collusion."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions individually."
   ]
  ],
  "warmup": "A cashier has worked the same register alone for ten years and never takes a vacation. Should her manager be pleased or worried? Why?",
  "activity": {
   "title": "Life cycle gap hunt",
   "materials": "A printed one-page employee history for a fictional worker (hiring, two transfers, a dismissal) with a matching access list, highlighters, whiteboard.",
   "steps": [
    "In pairs, students read the history and highlight every point where a personnel security control was missing or late.",
    "For each gap, pairs name the control that should have applied, such as role-based screening, access removal on transfer or disabling access before notification.",
    "Pairs identify any toxic combination of access in the final access list and state which separation of duties rule it breaks.",
    "Pairs write three lines for a vendor contract that would have covered the contractor mentioned in the history."
   ]
  },
  "discussion": [
   "How can an organization screen candidates thoroughly while staying fair and legal?",
   "If separation of duties cannot stop collusion, what other controls reduce that risk?"
  ],
  "exit": [
   [
    "Fraud is discovered while an employee is on a required two-week leave. Which control worked?",
    "Mandatory vacation."
   ],
   [
    "What should happen to existing access when a user transfers?",
    "Old access is removed and new access is granted for the new role only."
   ],
   [
    "When should access be disabled for an involuntary termination?",
    "At or just before the moment the person is notified."
   ]
  ],
  "differentiation": [
   "Support: Give students a life cycle diagram with the stage names and one example control per stage to reference during the gap hunt.",
   "Extend: Ask students to design an automated joiner-mover-leaver process driven by the HR system and identify two points where human review is still needed."
  ]
 },
 {
  "t": "Risk management: identification, assessment (qualitative and quantitative), response, frameworks",
  "objectives": [
   "Students will be able to define risk, threat, vulnerability, exposure and safeguard precisely.",
   "Students will be able to calculate SLE, ALE and the value of a safeguard.",
   "Students will be able to choose and justify a risk response: mitigate, transfer, avoid or accept.",
   "Students will be able to list the steps of the NIST Risk Management Framework in order."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up and have students label each item as threat, vulnerability or asset."
   ],
   [
    12,
    "Teach",
    "Define the core terms, contrast qualitative and quantitative analysis, and work the flood barrier example on the board step by step. Present the four responses and the RMF steps. Stress that business owners accept risk and ignoring risk is never valid."
   ],
   [
    15,
    "Activity",
    "Run the risk calculation workshop described below."
   ],
   [
    8,
    "Discuss",
    "Groups present their recommendation. Use the discussion questions to explore non-financial factors."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions with calculators allowed."
   ]
  ],
  "warmup": "Sort these three items: a hacker group, an unpatched web server and a customer database. Which is the threat, which is the vulnerability and which is the asset?",
  "activity": {
   "title": "Risk calculation workshop",
   "materials": "Printed scenario cards with asset value, exposure factor, ARO, control cost and post-control ARO; calculators or student laptops with a spreadsheet; whiteboard.",
   "steps": [
    "Groups of three each receive two scenario cards.",
    "Groups calculate SLE, ALE before and after the control, and the safeguard value for each scenario, showing their work.",
    "Groups recommend a response (mitigate, transfer, avoid or accept) and name who in the organization must sign off.",
    "Groups add one qualitative factor, such as reputation or regulatory exposure, that might change the recommendation."
   ]
  },
  "discussion": [
   "When is qualitative analysis more useful than quantitative analysis?",
   "What consequences remain with an organization after it buys cyber insurance?",
   "Why should risk assessment be continuous rather than a one-time project?"
  ],
  "exit": [
   [
    "An asset worth $500,000 has an EF of 40 percent and an ARO of 0.2. What is the ALE?",
    "SLE = $200,000; ALE = $40,000 per year."
   ],
   [
    "A company stops offering a risky service. Which response is this?",
    "Risk avoidance."
   ],
   [
    "Who should formally accept residual risk?",
    "The business owner or senior manager accountable for the asset."
   ]
  ],
  "differentiation": [
   "Support: Provide a formula card (SLE = AV x EF, ALE = SLE x ARO, value = ALE before - ALE after - annual cost) and a partly worked example.",
   "Extend: Ask students to build a small spreadsheet that calculates safeguard value for any inputs and test how sensitive the decision is to the ARO estimate."
  ]
 },
 {
  "t": "Threat modeling methodologies (STRIDE, PASTA) and supply chain risk management",
  "objectives": [
   "Students will be able to decompose a system into a data flow diagram and identify trust boundaries.",
   "Students will be able to apply STRIDE and map each category to the property it violates.",
   "Students will be able to compare STRIDE and PASTA and choose one for a given goal.",
   "Students will be able to describe supply chain risk management practices, including SBOMs and code signing."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up and collect answers quickly."
   ],
   [
    12,
    "Teach",
    "Present the four threat modeling questions and DFD elements. Teach STRIDE with its property mapping, then PASTA's seven stages, and briefly DREAD, attack trees and ATT&CK. Cover SCRM threats, fourth-party risk, SBOMs and code signing."
   ],
   [
    18,
    "Activity",
    "Run the whiteboard threat model described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect design threats to supplier risks."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on paper."
   ]
  ],
  "warmup": "You are building a food delivery app. Name one thing that could go wrong that has nothing to do with code your team writes.",
  "activity": {
   "title": "Whiteboard threat model",
   "materials": "Whiteboard or large paper per group, markers in two colors, printed STRIDE reference cards, a one-paragraph system description for a mobile payments feature with a third-party service.",
   "steps": [
    "Groups of four draw a data flow diagram of the system, marking external entities, processes, data stores, flows and trust boundaries in a second color.",
    "Groups walk each flow that crosses a trust boundary and record at least one STRIDE threat per category where it applies.",
    "Groups propose one control for each threat and note which security property it restores.",
    "Groups list two supply chain controls for the third-party service, such as reviewing audit reports, contract clauses or SBOM entries."
   ]
  },
  "discussion": [
   "Why is threat modeling cheaper during design than after release?",
   "How much assurance can you realistically get about your suppliers' suppliers?"
  ],
  "exit": [
   [
    "Which STRIDE category covers gaining administrator rights from a normal account, and what property does it violate?",
    "Elevation of privilege, which violates authorization."
   ],
   [
    "What distinguishes PASTA from STRIDE?",
    "PASTA is a seven-stage, risk-centric process tied to business objectives and impact; STRIDE categorizes threats."
   ],
   [
    "What does an SBOM help you do?",
    "Quickly find where a newly disclosed vulnerable component is used."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups a partly drawn diagram with trust boundaries already marked so they can focus on applying STRIDE.",
   "Extend: Ask fast finishers to build a short attack tree for one goal, such as fraudulent transfers, and score two branches with DREAD."
  ]
 },
 {
  "t": "Security awareness, education and training program effectiveness",
  "objectives": [
   "Students will be able to distinguish awareness, training and education by audience, depth and goal.",
   "Students will be able to design role-based content for different groups.",
   "Students will be able to select behavior-based metrics that show program effectiveness.",
   "Students will be able to explain why a reporting-friendly culture matters."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up and record answers in two columns: activity metrics and outcome metrics."
   ],
   [
    10,
    "Teach",
    "Present the three levels with examples, role-based tailoring, engaging methods and common topics. Contrast completion rates with click rates, report rates and time to report."
   ],
   [
    17,
    "Activity",
    "Run the program redesign activity described below."
   ],
   [
    8,
    "Discuss",
    "Groups present their metrics dashboard. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions individually."
   ]
  ],
  "warmup": "Your company says 100 percent of staff finished security training this year. What other number would you want before believing the training worked?",
  "activity": {
   "title": "Program redesign",
   "materials": "A printed one-page description of a weak program (annual video, completion-only reporting, public shaming of clickers), sticky notes in three colors, whiteboard.",
   "steps": [
    "Groups of three read the weak program and list its problems on sticky notes.",
    "Groups redesign it, writing one awareness activity, one role-specific training module and one education opportunity, each on a different color.",
    "Groups choose three behavior metrics and sketch how each should trend over a year if the program works.",
    "Groups write one sentence explaining how leadership will visibly support the program."
   ]
  },
  "discussion": [
   "How difficult should phishing simulations be, and what happens if they are too tricky?",
   "Should contractors receive the same awareness program as employees? How would you enforce it?"
  ],
  "exit": [
   [
    "A help desk team learns a caller verification procedure. Is this awareness, training or education?",
    "Training."
   ],
   [
    "Why is completion rate a weak effectiveness metric?",
    "It shows attendance, not behavior change."
   ],
   [
    "Name one behavior-based metric for an awareness program.",
    "Phishing report rate, click rate trend, time to first report or human-error incident trend."
   ]
  ],
  "differentiation": [
   "Support: Provide a table with the three levels and example activities so students can pick from it during the redesign.",
   "Extend: Ask students to write a one-paragraph proposal to leadership using projected metric trends to justify the program's budget."
  ]
 },
 {
  "t": "Identifying and classifying information and assets",
  "objectives": [
   "Students will be able to explain why asset identification and inventory come before protection.",
   "Students will be able to identify who decides classification and the role of custodians.",
   "Students will be able to apply the rule that assets inherit the highest classification of data they hold.",
   "Students will be able to compare government and commercial classification schemes and explain the risks of over-classification."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up and discuss which items students would protect most."
   ],
   [
    12,
    "Teach",
    "Cover asset types, discovery, owner-driven classification, government and commercial schemes, inheritance of the highest classification, categorization by impact, and declassification. Use the manufacturer example."
   ],
   [
    15,
    "Activity",
    "Run the data discovery sort described below."
   ],
   [
    8,
    "Discuss",
    "Groups share decisions on mixed-data assets. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on sticky notes."
   ]
  ],
  "warmup": "If your phone holds family photos, a banking app and grocery lists, how carefully should you protect the whole phone? What decides that?",
  "activity": {
   "title": "Data discovery sort",
   "materials": "Printed cards describing discovered data (customer PII in spreadsheets, product designs, salary data, public brochures, old quarterly results) and storage locations, a four-level commercial scheme poster, sticky notes.",
   "steps": [
    "Groups of three play the role of data owners and assign each data card a classification level, noting the reason.",
    "Groups place the data cards on their storage location cards and decide the classification of each location by the highest data it holds.",
    "Groups identify one item that should be declassified and describe the approval process.",
    "Groups list two cleanup actions, such as consolidating spreadsheet copies or restricting a shared folder, and name the custodian who would carry them out."
   ]
  },
  "discussion": [
   "What happens to a classification program when there are too many levels?",
   "Should automated tools be allowed to assign classification labels on their own? Who stays accountable?"
  ],
  "exit": [
   [
    "Who decides a data set's classification?",
    "The data owner, a senior business manager accountable for the data."
   ],
   [
    "A server stores one confidential database and many public files. What level is the server?",
    "Confidential, because assets inherit the highest classification of the data they hold."
   ],
   [
    "Give one harm of over-classification.",
    "It raises costs, slows work and teaches people to ignore labels."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision aid with three questions (What harm if leaked? Any legal rules? Who owns it?) for students to use while classifying.",
   "Extend: Ask students to write a short classification scheme with level definitions, examples and minimum handling rules for storage, transmission and destruction."
  ]
 },
 {
  "t": "Information and asset handling requirements (marking, labeling, storage)",
  "objectives": [
   "Students will be able to distinguish marking from labeling and give an example of each.",
   "Students will be able to explain how metadata labels allow DLP, email gateways and MAC systems to enforce handling rules automatically.",
   "Students will be able to apply handling requirements to storage, transmission, use, sharing and disposal for a given classification level.",
   "Students will be able to justify the correct response to unlabeled media and to backup copies of classified data."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Hold up an unlabeled USB drive (or a picture of one) and ask the warm-up question. Collect three or four answers on the whiteboard without judging them."
   ],
   [
    12,
    "Teach",
    "Define handling requirements as the bridge between classification and daily behavior. Draw two columns, Labeling (on media) and Marking (in content), and fill them with examples. Explain metadata labels and how DLP and MAC use them. Close with the rules for unlabeled media and backups."
   ],
   [
    18,
    "Activity",
    "Run the handling-matrix build described in the activity. Circulate and push groups to make rules proportional rather than maximal."
   ],
   [
    5,
    "Discuss",
    "Pick two groups' matrices and compare them. Use the discussion questions to explore workarounds and over-strict rules."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "You find an unlabeled USB drive in a meeting room at work. What do you do with it, and why?",
  "activity": {
   "title": "Build a handling matrix",
   "materials": "Whiteboard or chart paper, markers, printed scenario cards the teacher prepares (one per group), sticky notes.",
   "steps": [
    "Put students in groups of three or four and give each group a fictional organization (a clinic, a law firm, a school district) with three classification levels: Public, Internal and Confidential.",
    "Each group draws a grid with the levels as rows and Storage, Transmission, Use, Sharing and Disposal as columns, then fills every cell with a concrete rule.",
    "Groups add one example of a label and one example of a marking for the Confidential row.",
    "Hand each group a scenario card (a found unlabeled drive, a backup tape going off-site, a staff member wanting to work from home) and have them use their matrix to decide the correct action.",
    "Groups swap matrices and mark any rule they think is so strict that staff would bypass it."
   ]
  },
  "discussion": [
   "Where is the line between a handling rule that protects data and one that pushes people toward workarounds?",
   "Should a label on a lost tape ever reveal what is on it? What are the trade-offs?"
  ],
  "exit": [
   [
    "Give one example of labeling and one of marking.",
    "Labeling: a classification sticker on a backup tape or drive. Marking: a classification header or footer on each page of a document."
   ],
   [
    "How should staff treat a found, unlabeled drive?",
    "As if it holds the highest classification in use until its contents are verified, and report it."
   ],
   [
    "What classification does a backup copy of Confidential data carry?",
    "The same classification, Confidential, so it needs the same protection, including off site."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially completed handling matrix with the Storage column filled in, and a two-item cheat card showing 'label = on the container, marking = in the content'.",
   "Extend: Ask fast finishers to write a DLP rule in plain English that uses a metadata label, then list two ways it could produce false positives and how they would tune it."
  ]
 },
 {
  "t": "Provisioning resources securely and asset inventory",
  "objectives": [
   "Students will be able to explain why asset inventory is a foundational control for vulnerability management and incident response.",
   "Students will be able to list the steps of secure provisioning from procurement through deployment.",
   "Students will be able to describe how infrastructure as code and automated discovery keep cloud inventories accurate.",
   "Students will be able to identify shadow IT from a reconciliation of inventory sources."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about a newly announced vulnerability and ask students how long it would take their school or workplace to answer it."
   ],
   [
    12,
    "Teach",
    "Walk through what an inventory records, why it comes first, and the provisioning steps: trusted procurement, integrity checks, baseline image, default credentials removed, patching, enrollment in management. Introduce IaC and reconciliation."
   ],
   [
    18,
    "Activity",
    "Run the reconciliation exercise. Each pair compares the printed lists and flags discrepancies."
   ],
   [
    5,
    "Discuss",
    "Groups report what they found and how they would prevent each discrepancy in future."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A critical flaw is announced in a product your organization might use. What is the very first thing you need to know before you can act?",
  "activity": {
   "title": "Find the ghosts: inventory reconciliation",
   "materials": "Printed handouts the teacher prepares: a CMDB extract, a network scan result, a cloud resource list and a purchase list for a fictional company, each about 15 rows; highlighters.",
   "steps": [
    "Pairs receive the four printed lists. Some devices appear in all four, some only in the scan, some only in the CMDB, some only in purchases.",
    "Pairs highlight every item that does not appear consistently and label it: possible shadow IT, possibly lost or retired, missing owner, or recording error.",
    "For each flagged item, pairs write the next action (investigate, assign owner, sanitize and remove, update record).",
    "Pairs write one provisioning rule that would have prevented the most serious discrepancy."
   ]
  },
  "discussion": [
   "Why might teams create shadow IT even when they know the rules, and how can the security team make the approved path easier?",
   "What would change if the inventory were updated automatically every hour instead of yearly?"
  ],
  "exit": [
   [
    "Why must asset inventory come before vulnerability management?",
    "You cannot patch or scan assets you do not know exist, and you need owners to act on findings."
   ],
   [
    "Name three secure provisioning steps for a new server.",
    "Apply an approved baseline image, change or remove default credentials, disable unneeded services; also patch and enroll in monitoring."
   ],
   [
    "What does a device found in a scan but missing from the CMDB indicate?",
    "A possible shadow IT or unrecorded asset that needs investigation, an owner and management, or removal."
   ]
  ],
  "differentiation": [
   "Support: Reduce each list to eight rows and provide a sorting sheet with the four labels already printed so students only need to classify each discrepancy.",
   "Extend: Ask fast finishers to sketch the tags an IaC template should apply to every cloud resource and a guardrail rule that blocks resources missing them."
  ]
 },
 {
  "t": "Data lifecycle: create, store, use, share, archive, destroy",
  "objectives": [
   "Students will be able to name the six phases of the data life cycle in order and describe each.",
   "Students will be able to match appropriate security controls to each phase.",
   "Students will be able to explain why destruction must reach every copy and when a legal hold stops it.",
   "Students will be able to identify the planning needed to keep archives readable."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers about where their own photos or messages live."
   ],
   [
    12,
    "Teach",
    "Present the six phases on the whiteboard as a loop with copies branching off. For each phase, name its main risks and controls. Emphasize classifying at creation, data in use, archive readability and legal holds."
   ],
   [
    18,
    "Activity",
    "Run the record-tracing activity in small groups."
   ],
   [
    5,
    "Discuss",
    "Groups share the gap they found most surprising, then work through the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of a photo you took three years ago. List every place a copy of it might still exist today.",
  "activity": {
   "title": "Trace one record from birth to destruction",
   "materials": "Chart paper, markers, sticky notes in two colors, a printed scenario card describing a fictional online clinic's appointment record.",
   "steps": [
    "Groups draw the six phases across the chart paper and trace one appointment record through the clinic's systems and partners.",
    "On sticky notes of one color, groups write the control used at each phase (for example, encryption at rest in the store phase).",
    "On sticky notes of the other color, groups mark gaps: copies with no owner, phases with no control, missing destruction steps.",
    "Groups swap posters and add one gap the other group missed, then decide what would happen if a legal hold arrived."
   ]
  },
  "discussion": [
   "Why is the cheapest data to protect the data you never kept?",
   "Who should decide how long data is kept: the security team, IT or the business owner? Why?"
  ],
  "exit": [
   [
    "List the six data life cycle phases in order.",
    "Create, store, use, share, archive, destroy."
   ],
   [
    "When should data ideally be classified?",
    "At creation, because classification drives every later control."
   ],
   [
    "What must be preserved to read an encrypted archive years later?",
    "The encryption keys, plus the software, formats and hardware needed to retrieve and read the data."
   ]
  ],
  "differentiation": [
   "Support: Provide a phase-to-control matching card set so students sort printed controls into the six phases before writing their own.",
   "Extend: Ask fast finishers to design a deletion request process that propagates to backups, analytics and a partner, including how they would prove it was done."
  ]
 },
 {
  "t": "Data roles: owner, controller, processor, custodian, steward, subject",
  "objectives": [
   "Students will be able to identify the owner, custodian, steward, user and system owner from a description of duties.",
   "Students will be able to distinguish a data controller from a data processor using the 'purposes and means' test.",
   "Students will be able to explain how a processor becomes a controller.",
   "Students will be able to describe the data subject's position and the DPO's independent role."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the moving company and capture who decides versus who does the work."
   ],
   [
    12,
    "Teach",
    "Present the two vocabularies side by side: organizational roles (owner, custodian, steward, user, system owner) and privacy roles (controller, processor, subject, DPO). Use the clinic example to show one organization holding roles from both."
   ],
   [
    18,
    "Activity",
    "Run the role card sort and scenario round."
   ],
   [
    5,
    "Discuss",
    "Review contested cards and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "When you hire movers, who decides what gets packed and where it goes, and who does the lifting? Who is responsible if a box is lost?",
  "activity": {
   "title": "Who am I? Data role card sort",
   "materials": "Printed cards the teacher prepares: ten role-name cards and twenty duty cards (for example, 'runs nightly backups', 'decides why customer data is collected', 'maintains data definitions'), plus four short scenario cards.",
   "steps": [
    "In groups of three, students match each duty card to the correct role card.",
    "Groups flag any duty that could belong to two roles and write why.",
    "Each group draws a scenario card (a payroll service, a marketing platform, a hospital lab, a retailer) and labels every party in it with both an organizational and a privacy role.",
    "Groups present one scenario and explain the purposes-and-means reasoning."
   ]
  },
  "discussion": [
   "Why should the DPO not also be the person deciding how data is processed?",
   "If a cloud provider suffers a breach, why does the customer still have to answer to regulators and data subjects?"
  ],
  "exit": [
   [
    "Which role determines the purposes and means of processing personal data?",
    "The data controller."
   ],
   [
    "Who decides the classification of a data set, the owner or the custodian?",
    "The owner; the custodian implements the protections the owner requires."
   ],
   [
    "What happens when a processor uses personal data for its own purposes?",
    "It becomes a controller for that processing and takes on controller obligations."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-line test for each role (for example, 'decides why and how = controller') printed on the back of each role card.",
   "Extend: Ask fast finishers to map the roles for a scenario with two joint controllers and a sub-processor, and list what the contracts between them must cover."
  ]
 },
 {
  "t": "Data collection limitation, location and maintenance",
  "objectives": [
   "Students will be able to explain collection limitation, data minimization and purpose limitation and recognize violations in a scenario.",
   "Students will be able to describe why data location matters for law, government access and incident response.",
   "Students will be able to list data maintenance activities that keep personal data accurate and protected.",
   "Students will be able to explain why removing names does not guarantee anonymity."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a long fictional sign-up form on the projector and ask the warm-up question."
   ],
   [
    12,
    "Teach",
    "Explain collection limitation and purpose limitation with the OECD background, then data location (sovereignty, localization, transfers, replicas) and maintenance (accuracy, correction, patching, access review, deletion)."
   ],
   [
    18,
    "Activity",
    "Run the form-trimming workshop in pairs."
   ],
   [
    5,
    "Discuss",
    "Ask pairs to share the field they cut that the business would push back on hardest, then use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Look at this sign-up form. Which fields does the app actually need to create an account, and which would you remove?",
  "activity": {
   "title": "Trim the form, map the data",
   "materials": "Printed copies of a fictional app sign-up form with about twelve fields and a one-paragraph description of the app's features; a blank data map template the teacher prints with columns for field, purpose, location, retention and owner.",
   "steps": [
    "Pairs cross out every field the described features do not need, writing a one-line justification for each field they keep.",
    "For each kept field, pairs complete the data map columns, including which country or region the data will be stored in.",
    "The teacher announces a twist: European customers were promised in-region storage, and a backup replica sits outside the region. Pairs record how they would detect and fix it.",
    "Pairs identify one maintenance task for their data map, such as a quarterly check for inactive accounts."
   ]
  },
  "discussion": [
   "Why do product teams often want to collect 'just in case' data, and how can security and privacy teams respond constructively?",
   "If storage is cheap, why is keeping everything still expensive?"
  ],
  "exit": [
   [
    "A company uses receipt email addresses to build advertising profiles with no new basis. Which principle is violated?",
    "Purpose limitation, part of collection limitation and data minimization."
   ],
   [
    "Give two reasons data location matters.",
    "Local laws and localization rules, government access powers, transfer restrictions and breach notification duties depend on where data is stored and processed."
   ],
   [
    "Why is removing names not enough to anonymize data?",
    "Remaining fields can be combined to re-identify individuals."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a version of the form with each field already tagged with the feature that might use it, so they only judge whether that feature needs it.",
   "Extend: Ask fast finishers to propose a pseudonymization approach for an analytics use of the data and explain what separately held information must be protected."
  ]
 },
 {
  "t": "Data retention and end-of-life (EOL/EOS) assets",
  "objectives": [
   "Students will be able to explain the purpose of a retention policy and schedule and the risks of keeping data too long or too briefly.",
   "Students will be able to describe how a legal hold overrides retention and define spoliation.",
   "Students will be able to distinguish EOL from EOS and explain the security risk of unsupported assets.",
   "Students will be able to recommend compensating controls and risk acceptance for an EOS system that must remain in service."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about household paperwork and list what students keep versus shred."
   ],
   [
    12,
    "Teach",
    "Cover retention policy and schedule, legal holds and spoliation, copies in backups and third parties, then EOL versus EOS and the replace, isolate, extend or accept options."
   ],
   [
    18,
    "Activity",
    "Run the two-part decision exercise in groups."
   ],
   [
    5,
    "Discuss",
    "Review group decisions and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Which papers at home do you keep for years, and which do you shred right away? What makes the difference?",
  "activity": {
   "title": "Hold, delete or isolate?",
   "materials": "Printed scenario cards the teacher prepares (six retention cards and four end-of-support cards), a whiteboard divided into 'Keep', 'Delete', 'Hold' and 'Isolate and accept' zones, sticky notes.",
   "steps": [
    "Groups receive the retention cards, each describing a record type, its age, its retention period and any legal notices, and decide whether each record should be kept, deleted or placed on hold.",
    "Groups then receive the end-of-support cards and decide whether each asset should be replaced, isolated with compensating controls, covered by extended support or formally accepted as a risk.",
    "Groups place sticky notes summarizing each decision in the matching whiteboard zone.",
    "For one isolate decision, groups write a short risk acceptance statement naming the owner, the controls and a review date."
   ]
  },
  "discussion": [
   "Why should the business owner, not the security team, sign a risk acceptance for an unsupported system?",
   "How could an organization prove in court that it deleted records properly rather than to hide them?"
  ],
  "exit": [
   [
    "What happens to scheduled deletion when a legal hold is issued?",
    "Deletion of the relevant data is suspended until counsel lifts the hold."
   ],
   [
    "What is the main security concern with an end-of-support system?",
    "It no longer receives security patches, so new vulnerabilities remain exploitable."
   ],
   [
    "Name two compensating controls for an EOS system that must stay in service.",
    "Network isolation or segmentation, restricted and monitored access, removal of unneeded services, plus documented risk acceptance."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a decision flowchart (Is there a legal hold? Has the retention period ended? Is the asset still patched?) to apply to each card.",
   "Extend: Ask fast finishers to draft a retention schedule entry for one record type, including owner, period, legal source placeholder and disposition method, and explain how backups will honor it."
  ]
 },
 {
  "t": "Data remanence and sanitization: clearing, purging, destruction",
  "objectives": [
   "Students will be able to define data remanence and explain why deletion and formatting do not sanitize media.",
   "Students will be able to distinguish clearing, purging and destruction as defined in NIST SP 800-88.",
   "Students will be able to select a sanitization method based on data sensitivity, media type and destination.",
   "Students will be able to describe how sanitization should be verified and documented."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about selling an old phone and record student answers."
   ],
   [
    12,
    "Teach",
    "Explain remanence, the three NIST SP 800-88 levels, media differences (magnetic versus flash versus optical), cryptographic erase for cloud and the decision flow: classification, destination, method, verify."
   ],
   [
    18,
    "Activity",
    "Run the sanitization decision card game."
   ],
   [
    5,
    "Discuss",
    "Review the hardest cards and the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You are selling your old phone online. What would you do to make sure the buyer cannot recover your photos and messages?",
  "activity": {
   "title": "Choose the right wipe",
   "materials": "Printed device cards the teacher prepares (laptop with SSD, backup tape, failed hard drive, leased server drive, cloud storage bucket, multifunction printer, USB flash drive, phone), each with data sensitivity and destination; a whiteboard grid with columns Clear, Purge and Destroy.",
   "steps": [
    "Groups draw device cards and decide which level fits each, then the specific method (for example, sanitize command, degauss then shred, cryptographic erase).",
    "Groups place each card in the whiteboard column and write the method on a sticky note beside it.",
    "The teacher challenges any card where degaussing was chosen for flash media or clearing for sensitive media leaving the organization.",
    "Each group writes the fields a sanitization certificate should contain for one of its devices."
   ]
  },
  "discussion": [
   "When might destruction be cheaper than purging and verifying, even for reusable media?",
   "Why does an accurate media inventory matter as much as the sanitization method itself?"
  ],
  "exit": [
   [
    "What are the three sanitization levels in NIST SP 800-88?",
    "Clear, purge and destroy."
   ],
   [
    "Why does degaussing not work on an SSD?",
    "SSDs store data electronically in flash cells, not magnetically."
   ],
   [
    "Which method fits cloud storage you cannot physically access?",
    "Cryptographic erase: destroying every copy of the encryption keys."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-question decision tree (Is the media magnetic? Is it leaving the organization with sensitive data?) printed on each group's table.",
   "Extend: Ask fast finishers to write a short procedure for sanitizing devices that contain hidden storage, such as printers and network appliances, including verification and documentation."
  ]
 },
 {
  "t": "Data security controls for data at rest, in transit and in use",
  "objectives": [
   "Students will be able to define data at rest, in transit and in use and give an example of each.",
   "Students will be able to match controls such as encryption, TLS, IPsec, SSH, masking and confidential computing to the correct data state.",
   "Students will be able to explain why key management determines the strength of encryption at rest.",
   "Students will be able to distinguish tokenization from encryption and explain how it reduces compliance scope."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about protecting cash and map student answers to vault, truck and teller."
   ],
   [
    12,
    "Teach",
    "Walk through each state with its controls, then key management and envelope encryption, then tokenization, masking and DLP as cross-cutting controls."
   ],
   [
    18,
    "Activity",
    "Run the follow-the-card-number tracing exercise."
   ],
   [
    5,
    "Discuss",
    "Review the weakest point each group found and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A bank moves cash from a vault, in a truck, to a teller who counts it. What protection does the cash need at each stage?",
  "activity": {
   "title": "Follow the card number",
   "materials": "Whiteboard, markers, a printed data flow diagram the teacher prepares of a fictional online store (browser, web server, payment service, database, backup, customer service screen), sticky notes in three colors for the three states.",
   "steps": [
    "Groups trace a card number through the diagram and mark each point with a sticky note color for at rest, in transit or in use.",
    "For each point, groups write the control they would apply (for example, TLS between browser and web server, column encryption in the database, masking on the service screen).",
    "Groups circle the point where the real number could be replaced by a token and explain which systems leave audit scope as a result.",
    "Groups identify where the encryption keys live and who can use them."
   ]
  },
  "discussion": [
   "Why is data in use the hardest state to protect, and what are the trade-offs of newer technologies such as homomorphic encryption?",
   "If a database is encrypted but the application account can read everything, what has encryption actually protected against?"
  ],
  "exit": [
   [
    "Which data state is typically hardest to protect, and why?",
    "Data in use, because it usually must be decrypted in memory to be processed."
   ],
   [
    "Name a control for each data state.",
    "At rest: encryption with managed keys. In transit: TLS, IPsec or SSH. In use: least privilege, masking or confidential computing."
   ],
   [
    "How does tokenization reduce compliance scope?",
    "Systems that store only tokens hold no real sensitive values, so fewer systems fall within audit requirements."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-column reference card listing typical controls for each data state so students match rather than recall.",
   "Extend: Ask fast finishers to compare full-disk encryption, database encryption and application-level encryption for the same data and explain which threats each does and does not address."
  ]
 },
 {
  "t": "Scoping, tailoring and standards selection; DRM, DLP and CASB",
  "objectives": [
   "Students will be able to distinguish standards selection, scoping and tailoring and apply each to a control baseline.",
   "Students will be able to explain why scoping and tailoring decisions must be documented.",
   "Students will be able to compare DRM, DLP and CASB and select the right one for a scenario.",
   "Students will be able to describe CASB inline and API deployment modes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the cookbook warm-up question and connect answers to choosing, skipping and adjusting."
   ],
   [
    12,
    "Teach",
    "Explain standards selection driven by obligations, scoping versus tailoring with examples, the documented rationale, then DRM, DLP and CASB with their deployment options."
   ],
   [
    18,
    "Activity",
    "Run the baseline-trimming exercise followed by the tool-matching round."
   ],
   [
    5,
    "Discuss",
    "Review contested decisions and the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You have a cookbook with a thousand recipes and guests arriving tonight. How do you decide what to cook, and what changes do you make to the recipes you choose?",
  "activity": {
   "title": "Trim the baseline, pick the tool",
   "materials": "Printed handout the teacher prepares with a fictional company profile and a list of twenty simplified controls, printed scenario cards describing six data protection problems, pens.",
   "steps": [
    "Groups read the company profile and mark each control as Out (scoped out, with a one-line reason), Keep, or Keep and adjust (tailored, with the new parameter).",
    "Groups compare decisions with another group and resolve any control one group scoped out and the other kept.",
    "Groups then match each scenario card to DRM, DLP or CASB, noting the deployment mode where relevant.",
    "Each group writes a short justification for its hardest call."
   ]
  },
  "discussion": [
   "What could go wrong if a team scopes out controls without recording why?",
   "When would you want both DRM and DLP protecting the same documents?"
  ],
  "exit": [
   [
    "Which process removes controls that do not apply to a system?",
    "Scoping."
   ],
   [
    "Which technology lets an owner revoke access to a document already sent outside the company?",
    "DRM or IRM, because the protection travels with the file."
   ],
   [
    "What are the two main CASB deployment modes?",
    "Inline proxy, which can block in real time, and API integration, which scans and acts on data stored in cloud services."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reduced list of ten controls and a sentence starter for each decision ('This control is out because...').",
   "Extend: Ask fast finishers to map two controls from their list to equivalent requirements in a second framework and explain how mapping reduces duplicated audits."
  ]
 },
 {
  "t": "Secure design principles: least privilege, defense in depth, secure defaults, fail securely, zero trust, privacy by design, SASE",
  "objectives": [
   "Students will be able to identify least privilege, defense in depth, secure defaults, fail securely, zero trust, privacy by design and SASE from a description.",
   "Students will be able to distinguish fail secure from fail safe and explain the life-safety exception.",
   "Students will be able to explain the core ideas of zero trust and the components SASE combines.",
   "Students will be able to recognize which principle a design follows or violates in a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the power failure and the two doors."
   ],
   [
    12,
    "Teach",
    "Present each principle with a one-line definition and a real-looking design example. Spend extra time on fail secure versus fail safe, zero trust components and SASE's building blocks."
   ],
   [
    18,
    "Activity",
    "Run the design review role-play."
   ],
   [
    5,
    "Discuss",
    "Debrief the violations found and work through the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "The power fails in an office building. Should the door to the server room unlock or stay locked? What about the fire exit door? Why the difference?",
  "activity": {
   "title": "Design review board",
   "materials": "Printed design brief the teacher prepares for a fictional expense application with ten deliberately flawed design statements, a whiteboard, sticky notes, a list of the principles on the projector.",
   "steps": [
    "Groups act as a design review board and read the brief, which includes flaws such as 'if the authorization service is unavailable, allow the request' and 'all employees get administrator rights during onboarding'.",
    "For each flaw, groups name the violated principle and write the corrected design on a sticky note.",
    "Groups post their sticky notes under the matching principle on the whiteboard.",
    "Each group presents one flaw and its fix, and the class checks whether the fix introduces a new problem."
   ]
  },
  "discussion": [
   "Why is human safety allowed to override fail-secure design, and how can an organization keep the server hall protected anyway?",
   "What does 'assume breach' change about how you design an internal network?"
  ],
  "exit": [
   [
    "An authorization service crashes and the application lets everyone in. Which principle is violated?",
    "Fail securely; the failure should have resulted in denied access."
   ],
   [
    "What is the core idea of zero trust?",
    "No implicit trust based on network location; every request is authenticated, authorized and evaluated in context."
   ],
   [
    "Name two services SASE combines.",
    "SD-WAN networking with cloud-delivered security such as secure web gateway, CASB, ZTNA or firewall as a service."
   ]
  ],
  "differentiation": [
   "Support: Provide a matching sheet pairing each principle with a simple everyday example before students tackle the design flaws.",
   "Extend: Ask fast finishers to map the expense application's corrected design onto NIST zero trust components, identifying the policy decision point and policy enforcement point."
  ]
 },
 {
  "t": "Security models: Bell-LaPadula, Biba, Clark-Wilson, Brewer-Nash",
  "objectives": [
   "Students will be able to state the rules of Bell-LaPadula and Biba and identify which property each protects.",
   "Students will be able to describe Clark-Wilson's elements: TPs, CDIs, UDIs, IVPs and access triples.",
   "Students will be able to explain how Brewer-Nash prevents conflicts of interest using access history.",
   "Students will be able to select the appropriate model for a business scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about leaking secrets versus corrupting the record, and map answers to confidentiality and integrity."
   ],
   [
    12,
    "Teach",
    "Draw two vertical ladders on the whiteboard with arrows for Bell-LaPadula and Biba. Then explain Clark-Wilson with a bank example and Brewer-Nash with a consulting example. Stress 'simple equals read, star equals write'."
   ],
   [
    18,
    "Activity",
    "Run the human lattice role-play followed by the scenario sort."
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
  "warmup": "One person wants to stop secrets from leaking out; another wants to stop rumors from corrupting the official record. How would each of them set the rules for who can read and write?",
  "activity": {
   "title": "Human lattice",
   "materials": "Printed level cards the teacher prepares (Top Secret, Secret, Confidential, Unclassified, and High, Medium, Low integrity), paper 'documents' labeled with levels, six printed scenario cards, whiteboard.",
   "steps": [
    "Volunteers wear level cards and stand in a line from highest to lowest. The class calls out read and write attempts, and the group decides whether Bell-LaPadula allows each one.",
    "Repeat with integrity cards using Biba, noting how every answer flips.",
    "In small groups, students sort the scenario cards (a bank ledger, a military archive, a consultancy, a lab results system, a payroll approval flow, a government wiki) to the best-fit model.",
    "Each group explains one sort using the exam clue words in the scenario."
   ]
  },
  "discussion": [
   "Why might a business choose Clark-Wilson over Biba even though both address integrity?",
   "What weakness of Bell-LaPadula do covert channels exploit, and which models address it?"
  ],
  "exit": [
   [
    "Which Bell-LaPadula rule prevents a Secret user from copying data into an Unclassified file?",
    "The star property, no write down."
   ],
   [
    "What are Biba's two main rules?",
    "Simple integrity, no read down, and star integrity, no write up."
   ],
   [
    "Which model changes access based on what a user has already accessed?",
    "Brewer-Nash, the Chinese Wall model."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page chart with two ladders and arrows showing allowed and blocked directions for Bell-LaPadula and Biba.",
   "Extend: Ask fast finishers to design a small Clark-Wilson access triple table for a payroll system and identify one IVP the system should run."
  ]
 },
 {
  "t": "Controls based on system security requirements; evaluation criteria (Common Criteria)",
  "objectives": [
   "Students will be able to derive controls from system security requirements and classify controls by type and function.",
   "Students will be able to explain the Common Criteria terms TOE, protection profile, security target and EAL.",
   "Students will be able to interpret what an EAL does and does not guarantee.",
   "Students will be able to distinguish certification from accreditation or authorization and identify who grants authorization."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the crash-test warm-up question and record what students think a rating guarantees."
   ],
   [
    12,
    "Teach",
    "Cover requirements-first control selection, the type and function grid, Common Criteria history and vocabulary, EAL1 to EAL7 and certification versus authorization."
   ],
   [
    18,
    "Activity",
    "Run the control grid sort and the security target reading exercise."
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
  "warmup": "A car has a top crash-test rating. Does that mean you cannot be hurt in it? What would make the rating meaningless?",
  "activity": {
   "title": "Grid sort and read the fine print",
   "materials": "Whiteboard grid with rows Administrative, Technical, Physical and columns Preventive, Detective, Corrective, Deterrent, Recovery, Directive, Compensating; printed control cards the teacher prepares; a one-page fictional security target excerpt with an evaluated configuration section.",
   "steps": [
    "Groups place control cards (guard, camera, backup restore, acceptable use policy, firewall rule, warning sign, intrusion detection alert) on the grid, using more than one column where a control serves several functions.",
    "Groups read the fictional security target excerpt and list which features were inside and outside the evaluated configuration.",
    "Groups compare the excerpt with a planned deployment the teacher describes and identify any deviation that would need documented risk acceptance.",
    "Groups decide who in the fictional organization should sign the authorization to operate and why."
   ]
  },
  "discussion": [
   "Why might an organization prefer protection profile conformance over a high EAL?",
   "Why can only management, not technical staff, accept residual risk?"
  ],
  "exit": [
   [
    "What is the difference between a protection profile and a security target?",
    "A protection profile states requirements for a product category from the customer's side; a security target describes a specific vendor product's security claims."
   ],
   [
    "Does an EAL7 product guarantee security?",
    "No. It means the design was formally verified and tested, but it must still be deployed and managed correctly."
   ],
   [
    "Who grants authorization to operate a system?",
    "A senior manager or authorizing official who formally accepts the residual risk."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a glossary card with TOE, PP, ST and EAL defined in one line each and an example of a control filled in on the grid.",
   "Extend: Ask fast finishers to build a short traceability table linking three system requirements to controls and the evidence that would prove each control works."
  ]
 },
 {
  "t": "Security capabilities of information systems: TPM, memory protection, HSM",
  "objectives": [
   "Students will be able to explain the roles of a TPM, an HSM and a hardware root of trust in building a chain of trust.",
   "Students will be able to compare TPM and HSM by scope, typical use and protection features.",
   "Students will be able to identify memory protection techniques (process isolation, protection rings, DEP, ASLR) from scenario descriptions.",
   "Students will be able to state the three required properties of a reference monitor and relate them to the TCB and security kernel."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the whiteboard without correcting them yet."
   ],
   [
    15,
    "Teach",
    "Draw a chain of trust from root of trust through firmware, bootloader, kernel and applications. Mark where secure boot checks signatures and where measured boot records hashes into PCRs. Then contrast TPM and HSM in a two-column table, and finish with protection rings, DEP, ASLR, TCB and the reference monitor."
   ],
   [
    15,
    "Activity",
    "Run the card sort described below in small groups, then have each group defend two placements to the class."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect hardware capabilities to management decisions about cost and risk."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand it in at the door."
   ]
  ],
  "warmup": "If an attacker steals a laptop and pulls out the drive, what stops them from reading the data, and what stops them from modifying the boot software so it captures the user's PIN next time?",
  "activity": {
   "title": "Which hardware protects this? Card sort",
   "materials": "Printed scenario cards (12 per group), three header cards labeled TPM, HSM and Memory protection, whiteboard for group results.",
   "steps": [
    "Give each group the header cards and a shuffled stack of scenario cards, such as 'certificate authority root key', 'stack marked non-executable', 'laptop disk key released only if boot is unchanged' and 'payment PIN encryption for thousands of transactions per second'.",
    "Groups place each card under a header and write a one-line reason on the back.",
    "Add two challenge cards, 'mediates every access by subjects to objects' and 'all components that enforce security policy', and ask groups to name the concept (reference monitor and TCB).",
    "Each group presents its two hardest placements; the teacher confirms or corrects using exam clue words."
   ]
  },
  "discussion": [
   "When would the cost of an HSM be hard to justify, and what would you use instead?",
   "Why does a smaller trusted computing base make a system easier to trust?"
  ],
  "exit": [
   [
    "What does it mean when a TPM seals a key?",
    "The key is released only if current boot measurements match the expected values, so tampering prevents release."
   ],
   [
    "A certificate authority needs to protect its signing key used by many services. TPM or HSM?",
    "HSM, because it serves keys and cryptographic operations for many systems with strong tamper resistance and dual control."
   ],
   [
    "Name the three properties a reference monitor must have.",
    "Tamperproof, always invoked and small enough to verify."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page glossary with a picture of a motherboard chip (TPM) beside a rack appliance (HSM), and let them sort only the TPM and HSM cards first.",
   "Extend: Ask fast finishers to design key protection for a company with laptops, a certificate authority and a cloud application, explaining where TPM, HSM and secure enclaves each fit and why."
  ]
 },
 {
  "t": "Vulnerabilities in architectures: client, server, database, cloud, IoT, ICS/OT, virtualization, containers, serverless",
  "objectives": [
   "Students will be able to identify the characteristic vulnerabilities of client, server, database, cloud, IoT, ICS/OT, virtualized, container and serverless architectures.",
   "Students will be able to distinguish aggregation from inference and select database countermeasures such as polyinstantiation and cell suppression.",
   "Students will be able to explain the shared responsibility model and attribute a cloud failure to the correct party.",
   "Students will be able to recommend availability-safe controls for ICS/OT environments."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers by architecture type on the board."
   ],
   [
    12,
    "Teach",
    "Walk through each architecture with one weakness and one mitigation each, spending extra time on aggregation versus inference, shared responsibility and the OT priority order of safety and availability."
   ],
   [
    18,
    "Activity",
    "Groups complete the architecture triage stations described below, rotating every four minutes."
   ],
   [
    5,
    "Discuss",
    "Debrief the OT station first, since it carries the most common exam trap, then take the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Collect the three exit questions on paper."
   ]
  ],
  "warmup": "Your plant manager says a vulnerability scan once stopped a pump. Should you still scan the plant network tonight? Why or why not?",
  "activity": {
   "title": "Architecture triage stations",
   "materials": "Four printed scenario sheets placed around the room (database, cloud, OT, containers and serverless), sticky notes, a timer on the projector.",
   "steps": [
    "Divide the class into four groups and assign each a starting station.",
    "At each station, groups read a short scenario, write the vulnerability name on one sticky note and the best control on another, and stick them on the sheet.",
    "Rotate every four minutes; later groups may add a note disagreeing with an earlier one, with a reason.",
    "Finish by reviewing each sheet as a class and circling the answer an exam would accept."
   ]
  },
  "discussion": [
   "Why does shared responsibility never shift accountability for your data, even when the provider runs the infrastructure?",
   "What makes OT security decisions different from IT decisions, and who should have the final say on downtime?"
  ],
  "exit": [
   [
    "A user deduces a secret merger from budget entries they are allowed to read. What is this called?",
    "Inference."
   ],
   [
    "Why are containers less isolated than virtual machines?",
    "They share the host operating system kernel, so a kernel flaw or privileged container can affect all of them."
   ],
   [
    "What is the preferred first control for unpatchable PLCs connected to the corporate network?",
    "Network segmentation between IT and OT, with controlled remote access and passive monitoring."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column reference card listing each architecture with one typical weakness, and let struggling students complete the database and cloud stations with a partner.",
   "Extend: Ask fast finishers to write a one-paragraph risk briefing for a utility board explaining why the team will segment rather than patch controllers this quarter."
  ]
 },
 {
  "t": "Cryptographic solutions: symmetric, asymmetric, hashing, PKI, key management lifecycle",
  "objectives": [
   "Students will be able to compare symmetric, asymmetric and hashing algorithms by the security services they provide.",
   "Students will be able to choose the correct key for encryption and for signing in an asymmetric scenario.",
   "Students will be able to calculate the number of keys needed for symmetric and asymmetric communication among n users.",
   "Students will be able to describe PKI components and the stages of the key management lifecycle."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let pairs argue for one minute before sharing."
   ],
   [
    15,
    "Teach",
    "Build a services table (confidentiality, integrity, authentication, non-repudiation) and fill it for symmetric, asymmetric, hashing, HMAC and digital signatures. Show the key count formulas with a worked example, then sketch PKI trust from root CA to intermediate to end entity and list the key lifecycle stages."
   ],
   [
    15,
    "Activity",
    "Run the key-passing role-play described below."
   ],
   [
    5,
    "Discuss",
    "Ask the discussion questions, steering toward key management as the real weak point."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If you want to send a classmate a secret note that only they can read, but you have never met to agree on a password, how could that possibly work?",
  "activity": {
   "title": "Key-passing role-play",
   "materials": "Envelopes, index cards labeled with names such as 'Alice public key', 'Alice private key', 'Bob public key', 'Bob private key', 'session key', and a whiteboard to record each step.",
   "steps": [
    "Assign roles: Alice, Bob, a certificate authority, and an eavesdropper who may see anything passed openly.",
    "Alice must send Bob a confidential message: students decide which key card locks the envelope, and the eavesdropper checks whether they could open it.",
    "Repeat for a signed message and then for a hybrid exchange in which a session key card travels inside an envelope locked with Bob's public key.",
    "Finish by having the certificate authority 'sign' Bob's public key card and discuss what happens if that card is revoked."
   ]
  },
  "discussion": [
   "Why do most real cryptographic failures come from key handling rather than broken algorithms?",
   "What would make an organization need cryptographic agility in the next few years?"
  ],
  "exit": [
   [
    "Alice wants Bob alone to read her message. Which key encrypts it?",
    "Bob's public key."
   ],
   [
    "How many keys do 20 people need for pairwise symmetric communication, and how many with asymmetric keys?",
    "Symmetric: 20 x 19 / 2 = 190. Asymmetric: 2 x 20 = 40."
   ],
   [
    "Which control ensures no single administrator can export a critical private key alone?",
    "Split knowledge and dual control, often enforced by an HSM quorum."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a color-coded key chart (public keys green, private keys red) and have them complete only the confidentiality and signing rows first.",
   "Extend: Ask fast finishers to map each step of a TLS connection to the services it provides and explain where forward secrecy comes from."
  ]
 },
 {
  "t": "Cryptanalytic attacks: brute force, side channel, man-in-the-middle, pass the hash, ransomware",
  "objectives": [
   "Students will be able to classify an attack scenario as brute force, analytic, implementation, side-channel, on-path, replay, pass the hash or ransomware.",
   "Students will be able to match each attack category to its most effective defense.",
   "Students will be able to explain why salting and slow hashing defeat different password attacks.",
   "Students will be able to recommend a management-level ransomware response centered on tested backups and incident response."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up prompt aloud and take a quick show of hands, then ask two students to explain their vote."
   ],
   [
    12,
    "Teach",
    "Present each attack family with one recognizable sign in logs or behavior and one defense. Emphasize that attackers rarely break modern math and that the exam wants the defense that fits the category."
   ],
   [
    18,
    "Activity",
    "Run the attack and defense matching game described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, especially the ransomware payment debate, framing it as a senior management decision."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on index cards."
   ]
  ],
  "warmup": "If your organization's files were encrypted by ransomware tonight, would you pay? What would you need to know first?",
  "activity": {
   "title": "Attack and defense matching game",
   "materials": "Two sets of printed cards per group: eight attack scenario cards written as short log or incident excerpts, and eight defense cards. A whiteboard grid for the final answers.",
   "steps": [
    "Give each group the shuffled cards. Attack cards describe what was observed, such as 'same hash used on 40 hosts, no failed logons' or 'key recovered from power measurements'.",
    "Groups name the attack on each card and pair it with the best defense card, writing one sentence of reasoning.",
    "Add a twist card halfway through: 'the team proposes doubling the key length' and ask which attack card it would help, if any.",
    "Groups post their pairs on the whiteboard grid; the class resolves any disagreements using exam clue words."
   ]
  },
  "discussion": [
   "Why do you think attackers so often target credentials and implementations instead of algorithms?",
   "Who in an organization should decide whether to pay a ransom, and what information do they need?"
  ],
  "exit": [
   [
    "What does salting defeat, and what slows down each individual guess?",
    "Salting defeats rainbow tables and precomputation; slow hashing functions raise the cost of each guess."
   ],
   [
    "An attacker reuses a captured hash to log in without cracking it. Name the attack.",
    "Pass the hash."
   ],
   [
    "What is the most important control for recovering from ransomware?",
    "Offline or immutable backups that are tested regularly, used within a practiced incident response plan."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference strip listing each attack with a one-word clue (guessing, precomputed, timing, middle, resend, hash reuse, extortion) to use during the game.",
   "Extend: Ask fast finishers to write a short detection rule in plain language for pass the hash activity and explain which log sources it would need."
  ]
 },
 {
  "t": "Secure site and facility design",
  "objectives": [
   "Students will be able to list site selection factors and explain why physical security is cheapest during design.",
   "Students will be able to describe and identify the CPTED strategies of natural access control, natural surveillance and territorial reinforcement.",
   "Students will be able to apply layered design (deter, detect, delay, respond) and recommend a server room location.",
   "Students will be able to prioritize life safety when evaluating physical controls such as locks and vestibules."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up prompt and have students jot two observations before sharing."
   ],
   [
    12,
    "Teach",
    "Cover site selection, CPTED with photographs or sketches of each strategy, layered design from perimeter to server room, entry controls and the life safety rule. Draw the outside-in layers as concentric rectangles."
   ],
   [
    18,
    "Activity",
    "Groups complete the floor plan red-team review described below."
   ],
   [
    5,
    "Discuss",
    "Groups share their top finding, then take the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think about the entrance to this school or building. What makes it easy or hard for a stranger to walk in unnoticed?",
  "activity": {
   "title": "Floor plan red-team review",
   "materials": "A printed, simple floor plan per group (teacher-drawn) showing a building with a ground-floor server room on an exterior wall, two entrances, a parking lot, landscaping and an emergency exit; colored markers.",
   "steps": [
    "Groups mark every physical weakness they can find in red, such as poor sight lines, a server room on an exterior wall, a second unguarded entrance, or walls stopping at a drop ceiling.",
    "In green, groups propose fixes and label each as a CPTED strategy or a layer in deter, detect, delay, respond.",
    "Each group checks its design against life safety: can everyone still exit during a fire?",
    "Groups rank their top three changes by risk reduction and present them in one minute."
   ]
  },
  "discussion": [
   "Why are accidents and natural disasters often a bigger physical risk than intruders?",
   "How would you persuade a facilities manager to move a server room when the current space is cheaper?"
  ],
  "exit": [
   [
    "Name the three core CPTED strategies.",
    "Natural access control, natural surveillance and territorial reinforcement."
   ],
   [
    "Where should a server room be located in a multi-story building?",
    "An interior room on a middle floor, away from exterior walls, basements, top floors and public areas."
   ],
   [
    "A proposed lock would stop staff leaving during a fire. What do you recommend?",
    "Reject or redesign it, because life safety always takes priority over protecting assets."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a checklist of eight things to look for on the floor plan so they can focus on spotting rather than recalling.",
   "Extend: Ask fast finishers to compare two candidate sites for a backup data center and explain how distance from the primary site affects shared regional risk."
  ]
 },
 {
  "t": "Site and facility controls: wiring closets, server rooms, utilities, HVAC, fire suppression, environmental",
  "objectives": [
   "Students will be able to define the power quality terms fault, blackout, sag, brownout, spike, surge, inrush and noise.",
   "Students will be able to compare UPS and generator roles and explain HVAC and humidity requirements.",
   "Students will be able to match fire classes to suppression methods and select the appropriate sprinkler type for a scenario.",
   "Students will be able to prioritize personnel safety when evaluating fire suppression and emergency controls."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record answers in two columns, equipment risks and people risks."
   ],
   [
    13,
    "Teach",
    "Draw a two-by-two grid for power terms (low or high voltage by momentary or prolonged). Then explain UPS versus generator, humidity effects, hot and cold aisles, the fire tetrahedron, fire classes and the four sprinkler types with a simple pipe diagram."
   ],
   [
    17,
    "Activity",
    "Run the server room walkthrough audit described below."
   ],
   [
    5,
    "Discuss",
    "Share findings and use the discussion questions to stress personnel safety."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If the air conditioning in a server room failed on a hot night, how long do you think it would take for problems to start, and who would notice?",
  "activity": {
   "title": "Server room walkthrough audit",
   "materials": "Projector showing a teacher-drawn sketch of a server room with labeled problems (cardboard storage, wet pipe sprinkler, a single UPS, no leak sensors, a propped door, walls to a drop ceiling), printed audit checklists, pens.",
   "steps": [
    "Pairs review the sketch and use the checklist to record each finding under access, power, HVAC, fire or monitoring.",
    "For each finding, pairs write the specific control or term that fixes it, such as pre-action sprinkler, generator with load testing, or leak sensors.",
    "Give pairs three 'incident cards' read aloud (prolonged low voltage, freezing warehouse, false smoke alarm) and have them name the term or control in under 30 seconds each.",
    "Pairs share one finding each until all findings are covered on the whiteboard."
   ]
  },
  "discussion": [
   "Why must gas suppression systems include warning alarms and evacuation time?",
   "Who should be responsible for responding to environmental alerts at night, and how would you test that the alert path works?"
  ],
  "exit": [
   [
    "What is the difference between a sag and a brownout?",
    "Both are low voltage; a sag is momentary and a brownout is prolonged."
   ],
   [
    "Which sprinkler type is usually recommended for data centers and why?",
    "Pre-action, because water flows only after both detection and an opened head, reducing accidental discharge."
   ],
   [
    "What problem does very low humidity cause?",
    "Increased static electricity, which can damage electronic components."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students the power-term grid pre-labeled with axes and ask them to place the eight terms with a partner.",
   "Extend: Ask fast finishers to design environmental monitoring and alerting for a small server room, including which sensors, thresholds in general terms, who is paged and how the path is tested."
  ]
 },
 {
  "t": "Information system lifecycle: stakeholder needs through retirement",
  "objectives": [
   "Students will be able to sequence the information system lifecycle stages from stakeholder needs through retirement.",
   "Students will be able to write specific, testable security requirements and explain traceability.",
   "Students will be able to distinguish verification from validation in scenarios.",
   "Students will be able to describe the security activities in authorization, operations and retirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and ask students to estimate when a security flaw is cheapest to fix."
   ],
   [
    12,
    "Teach",
    "Draw the lifecycle as a loop on the whiteboard and attach one security activity to each stage. Contrast verification and validation with the 'built it right versus built the right thing' phrasing and explain authorization as senior risk acceptance."
   ],
   [
    18,
    "Activity",
    "Groups run the requirement rewrite and trace exercise described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on why retirement is often neglected."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Imagine finding a major security flaw in an app the week after it launches versus while it is still a drawing on a whiteboard. How different would the cost and effort be?",
  "activity": {
   "title": "Requirement rewrite and trace",
   "materials": "Printed cards with vague requirements (for example 'the system must be secure', 'data should be protected', 'only the right people get in'), sticky notes in three colors, whiteboard columns labeled Need, Requirement, Design, Test.",
   "steps": [
    "Each group draws three vague requirement cards and rewrites each into a specific, testable security requirement.",
    "Using sticky notes, groups trace each requirement across the whiteboard: the stakeholder need it serves, a design element that implements it and a test that verifies it.",
    "The teacher reads two scenarios, one where the system meets the specification but users reject it and one where a test fails a requirement, and groups label each as a validation or verification finding.",
    "Groups add one retirement task for their system and share it with the class."
   ]
  },
  "discussion": [
   "Why do organizations so often skip formal authorization or retirement planning, and what risks result?",
   "How should the lifecycle change when an organization buys a cloud service instead of building software?"
  ],
  "exit": [
   [
    "When should security requirements first be defined?",
    "At the beginning, during stakeholder needs and requirements analysis."
   ],
   [
    "A system meets every written requirement but users cannot do their jobs with it. Which activity found the gap?",
    "Validation."
   ],
   [
    "Name two security tasks during retirement.",
    "Archive or migrate data per retention rules and sanitize media; also remove accounts, certificates and firewall rules."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed lifecycle loop with stage names and ask struggling students to add one security activity per stage from a word bank.",
   "Extend: Ask fast finishers to write a short reauthorization policy stating which changes trigger a new risk acceptance decision and why."
  ]
 },
 {
  "t": "OSI and TCP/IP models and where controls apply",
  "objectives": [
   "Students will be able to name and order the seven OSI layers and map them to the four TCP/IP layers.",
   "Students will be able to describe encapsulation and the data unit at each layer.",
   "Students will be able to place common devices, protocols and attacks at the correct layer.",
   "Students will be able to select a control that operates at the layer where a given attack lives."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect guesses about what a firewall can and cannot see."
   ],
   [
    12,
    "Teach",
    "Draw the OSI and TCP/IP models side by side, add data units, devices and one protocol per layer, and demonstrate encapsulation by wrapping a paper note in successive labeled envelopes."
   ],
   [
    18,
    "Activity",
    "Run the human protocol stack activity described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect layers to defense in depth."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A firewall allows only web traffic on port 443. Could a harmful request still get through to the web server? Why?",
  "activity": {
   "title": "Human protocol stack",
   "materials": "Seven name cards for the OSI layers, envelopes and sticky notes for headers, a set of printed attack and control cards, whiteboard.",
   "steps": [
    "Seven volunteers stand in a line holding layer cards. A message starts at Application, and each student adds a labeled sticky-note header and passes it down; a second line unwraps it in reverse.",
    "The rest of the class receives attack and control cards (ARP spoofing, SYN flood, IP spoofing, XSS, WAF, port security, ACL, stateful firewall) and must hand each card to the correct layer student.",
    "Each layer student reads out the cards they received; the class challenges any misplacements.",
    "Close by asking which layer students could see the SQL injection payload and which could not."
   ]
  },
  "discussion": [
   "Why is it useful for a security team and a network team to describe problems using layer numbers?",
   "What are the trade-offs of inspecting traffic at layer 7 compared with layer 3?"
  ],
  "exit": [
   [
    "At which OSI layer does ARP spoofing occur?",
    "Layer 2, Data Link."
   ],
   [
    "Which TCP/IP layer covers OSI layers 5 to 7?",
    "The Application layer."
   ],
   [
    "Why can't a packet filter stop SQL injection?",
    "It sees only addresses and ports at layers 3 and 4, not the application content at layer 7."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a printed layer chart with one device and one protocol pre-filled per layer, and pair them during the card placement.",
   "Extend: Ask fast finishers to explain where a next-generation firewall, TLS and a VPN each operate and why a single product can span several layers."
  ]
 },
 {
  "t": "IPv4/IPv6, secure protocols (TLS, IPsec, SSH, SNMPv3) and their uses",
  "objectives": [
   "Students will be able to compare IPv4 and IPv6 in security-relevant terms, including NAT, SLAAC and dual-stack risks.",
   "Students will be able to explain the roles of TLS, IPsec (AH, ESP, IKE, transport and tunnel mode), SSH and SNMPv3.",
   "Students will be able to select the secure replacement for a given cleartext protocol.",
   "Students will be able to recommend a protocol and mode for a described connectivity scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up question and take answers from three students."
   ],
   [
    13,
    "Teach",
    "Compare IPv4 and IPv6 on the board, then build an IPsec table (AH versus ESP, transport versus tunnel). Cover TLS and forward secrecy, SSH, and the SNMP versions, ending with a list of cleartext protocols and their secure replacements."
   ],
   [
    17,
    "Activity",
    "Groups complete the protocol upgrade workshop described below."
   ],
   [
    5,
    "Discuss",
    "Review answers and take the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If someone captured all the traffic on our network for an hour, which kinds of passwords or data do you think they could read in plain text?",
  "activity": {
   "title": "Protocol upgrade workshop",
   "materials": "A printed 'packet capture summary' sheet per group listing observed traffic (Telnet, SNMPv2c with community 'public', FTP, HTTP login page, LDAP binds, an IPsec AH tunnel between sites, IPv6 traffic not covered by firewall rules), pens, whiteboard.",
   "steps": [
    "Groups read the capture summary and circle every item that exposes data or credentials.",
    "For each circled item, groups write the secure replacement or configuration change, such as SSH, SNMPv3 authPriv, SFTP, HTTPS, LDAPS, ESP instead of AH, and IPv6 firewall rules.",
    "Groups prioritize their list by risk and note any item where a replacement might need a migration period.",
    "Each group presents its top two changes; the class compiles a master upgrade plan on the whiteboard."
   ]
  },
  "discussion": [
   "Why might an organization keep using an insecure protocol even after a safer one is available, and how would you change that?",
   "Should an organization disable IPv6 where it is not used, or secure it fully? What are the trade-offs?"
  ],
  "exit": [
   [
    "Which IPsec protocol provides confidentiality?",
    "ESP."
   ],
   [
    "Which IPsec mode is typically used for a site-to-site VPN?",
    "Tunnel mode."
   ],
   [
    "What is wrong with SNMPv2c, and what fixes it?",
    "It sends community strings in cleartext; SNMPv3 adds authentication, integrity and encryption."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column card listing insecure protocols on the left and shuffled secure replacements to match on the right.",
   "Extend: Ask fast finishers to explain how a TLS 1.3 handshake achieves forward secrecy and why that matters to an organization that records traffic for monitoring."
  ]
 },
 {
  "t": "Converged protocols: iSCSI, VoIP, InfiniBand, Fibre Channel over Ethernet",
  "objectives": [
   "Students will be able to explain what converged protocols are and why convergence creates new security risks.",
   "Students will be able to distinguish iSCSI, Fibre Channel, FCoE, FCIP and InfiniBand by how they carry traffic and whether they are routable.",
   "Students will be able to recommend isolation, authentication and encryption controls for storage and VoIP traffic.",
   "Students will be able to identify VoIP threats such as eavesdropping, toll fraud and vishing and their mitigations."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student ideas about what changes when phones run over the data network."
   ],
   [
    13,
    "Teach",
    "Draw a before-and-after diagram: separate phone, storage and data networks versus one converged network. Then cover iSCSI with CHAP and LUN masking, Fibre Channel, FCoE versus FCIP, InfiniBand and RDMA, and VoIP with SIP, RTP, SRTP and voice VLANs."
   ],
   [
    17,
    "Activity",
    "Groups complete the converged network design challenge described below."
   ],
   [
    5,
    "Discuss",
    "Groups compare designs; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your office replaces its old phone system with phones that plug into the same network as your laptops. What could go wrong that could not go wrong before?",
  "activity": {
   "title": "Converged network design challenge",
   "materials": "Whiteboard or large paper per group, markers, a printed scenario describing a small company with VoIP phones, iSCSI storage for virtualization hosts, staff laptops and a guest network.",
   "steps": [
    "Groups draw the network with each traffic type (voice, storage, user, guest) in a different color.",
    "Groups add segmentation (VLANs or separate networks), authentication (CHAP, phone credentials) and encryption (SRTP, SIP over TLS, IPsec where needed) and label each control.",
    "The teacher announces an event: 'a staff laptop is infected' and groups trace whether the malware can reach storage or the PBX management interface.",
    "A second event, 'power cut to the network closet', makes groups check whether phones and emergency calling still work, and add UPS backup if not."
   ]
  },
  "discussion": [
   "How should a manager weigh the cost savings of convergence against the new single points of failure?",
   "Why do so many industrial protocols carried over IP lack authentication, and what can you do about it?"
  ],
  "exit": [
   [
    "Name three controls for iSCSI on a shared network.",
    "A dedicated VLAN or network, CHAP authentication and LUN masking, with IPsec encryption where needed."
   ],
   [
    "Why can FCoE not be routed across an IP WAN?",
    "It encapsulates Fibre Channel directly in Ethernet at layer 2 and has no IP header."
   ],
   [
    "Which protocols protect VoIP signaling and media?",
    "SIP over TLS for signaling and SRTP for media."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially drawn network diagram with traffic types labeled so struggling students focus on placing controls.",
   "Extend: Ask fast finishers to explain RDMA's security implications and how InfiniBand partitioning and a protected subnet manager reduce them."
  ]
 },
 {
  "t": "Micro-segmentation, SDN, VXLAN, VPC and software-defined perimeters",
  "objectives": [
   "Students will be able to explain micro-segmentation and how it limits lateral movement compared with traditional segmentation.",
   "Students will be able to describe SDN's separation of control and data planes and the security importance of the controller.",
   "Students will be able to identify VXLAN, VPC and SDP characteristics, including that VXLAN does not encrypt.",
   "Students will be able to design a basic segmented VPC with appropriate security groups and network ACLs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and ask students how far malware could spread on a flat network."
   ],
   [
    12,
    "Teach",
    "Draw a flat network, then the same network with micro-segmentation. Explain SDN control and data planes with northbound and southbound interfaces, VXLAN overlays, VPC components (subnets, route tables, security groups, network ACLs, flow logs) and SDP."
   ],
   [
    18,
    "Activity",
    "Groups complete the VPC whiteboard design described below."
   ],
   [
    5,
    "Discuss",
    "Groups present designs and take the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If one server in a data center is infected, what decides whether the infection reaches one more server or a hundred?",
  "activity": {
   "title": "Three-tier VPC whiteboard design",
   "materials": "Whiteboard or large paper per group, markers, a printed brief describing a web store with load balancers, web, application and database servers, and administrators who need access.",
   "steps": [
    "Groups draw a VPC with public and private subnets and place each tier in the right subnet.",
    "Groups write security group rules as short allow lists (source, destination, port) for each tier, and note where a stateless network ACL would need a return-traffic rule.",
    "Groups decide how administrators reach servers, choosing between a VPN and an SDP broker with MFA, and justify the choice.",
    "The teacher announces 'the web server is compromised' and groups trace which systems the attacker can now reach under their rules."
   ]
  },
  "discussion": [
   "What risks come with managing network policy as code, and how do you control them?",
   "Why might an organization keep a VPN alongside an SDP during a transition?"
  ],
  "exit": [
   [
    "What does SDN separate?",
    "The control plane, which decides where traffic goes, from the data plane, which forwards it."
   ],
   [
    "Does VXLAN encrypt traffic?",
    "No. It provides encapsulation and segmentation; encryption such as IPsec or MACsec must be added."
   ],
   [
    "Which technology keeps applications invisible until a user authenticates?",
    "A software-defined perimeter (zero trust network access)."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a VPC template with subnets already drawn so they focus on placing servers and writing one rule per tier.",
   "Extend: Ask fast finishers to describe how they would protect an SDN controller, covering authentication, API protection, high availability, change control and monitoring."
  ]
 },
 {
  "t": "Wireless networks: Wi-Fi security (WPA3), Bluetooth, Zigbee, cellular/5G",
  "objectives": [
   "Students will be able to trace the evolution of Wi-Fi security from WEP to WPA3 and explain what SAE adds.",
   "Students will be able to compare Personal and Enterprise modes and select an appropriate EAP method.",
   "Students will be able to identify wireless threats including rogue access points, evil twins, deauthentication and Bluetooth attacks, and their defenses.",
   "Students will be able to describe security considerations for Zigbee and cellular or 5G networks."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and have students share what they check before joining public Wi-Fi."
   ],
   [
    13,
    "Teach",
    "Build a timeline of WEP, WPA with TKIP, WPA2 with AES-CCMP and WPA3 with SAE. Contrast Personal and Enterprise modes with a diagram of client, access point and RADIUS server, then cover EAP methods, wireless threats, Bluetooth attacks, Zigbee key management and 5G improvements."
   ],
   [
    17,
    "Activity",
    "Run the evil twin role-play described below."
   ],
   [
    5,
    "Discuss",
    "Debrief the role-play and take the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You are in a coffee shop and see two networks with the same name. How would you decide which one to join, and could you even tell?",
  "activity": {
   "title": "Evil twin role-play",
   "materials": "Name cards for roles (client laptop, legitimate access point, RADIUS server, evil twin, wireless intrusion sensor), printed 'certificate' cards, a whiteboard to record outcomes.",
   "steps": [
    "Students act out a client connecting to a legitimate Enterprise network: the access point forwards to the RADIUS server, which presents its certificate card, and the client checks it before sending credentials.",
    "Replay the scene with an evil twin shouting the same network name louder. First the client does not check the certificate and hands over credentials; then the client checks and refuses.",
    "Add the intrusion sensor, who must spot the duplicate network name and a burst of 'deauthentication' calls and raise an alert.",
    "Groups write the three controls that stopped the attack and compare them with weak controls such as SSID hiding and MAC filtering."
   ]
  },
  "discussion": [
   "Why does removing shared secrets make wireless security easier to manage over time?",
   "What responsibilities remain with an organization that relies on a cellular carrier or private 5G for its devices?"
  ],
  "exit": [
   [
    "What does SAE in WPA3-Personal protect against?",
    "Offline dictionary attacks against a captured handshake; it also provides forward secrecy."
   ],
   [
    "What is the strongest common EAP method for enterprise Wi-Fi?",
    "EAP-TLS, with certificates on both client and server."
   ],
   [
    "Why is MAC filtering not an effective control?",
    "MAC addresses are visible in traffic and easily spoofed."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a timeline card with blanks for each Wi-Fi generation and its encryption to fill in during the teach segment.",
   "Extend: Ask fast finishers to write a migration plan from WPA2-Personal to WPA3-Enterprise for a campus, including transition mode, onboarding profiles and guest access with Enhanced Open."
  ]
 },
 {
  "t": "Content distribution networks and traffic flows (north-south, east-west)",
  "objectives": [
   "Students will be able to explain how a CDN improves availability and performance and identify the trust, caching and supply chain risks it introduces.",
   "Students will be able to classify a described traffic flow as north-south or east-west.",
   "Students will be able to select appropriate controls for each flow direction, including origin lockdown, micro-segmentation and internal monitoring.",
   "Students will be able to justify why east-west visibility drives zero trust architecture."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the whiteboard without correcting them yet."
   ],
   [
    12,
    "Teach",
    "Draw a CDN with edge servers, an origin and users. Walk through DDoS absorption, edge TLS termination and origin lockdown. Then draw a three-tier application and label north-south and east-west arrows, asking which existing controls see each arrow."
   ],
   [
    18,
    "Activity",
    "Run the flow-sorting card activity in pairs, then have each pair place one control card per flow."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the activity to zero trust and supplier risk."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper or a quick form."
   ]
  ],
  "warmup": "If an attacker is already inside your network on one web server, which of your security tools would notice when they start connecting to the database?",
  "activity": {
   "title": "Which way is it flowing?",
   "materials": "Printed cards with traffic flow descriptions, a second set of control cards (edge firewall, CDN with WAF, micro-segmentation rule, mutual TLS, flow monitoring, origin allow-list), whiteboard with two columns labeled North-south and East-west.",
   "steps": [
    "Give each pair ten flow cards, such as 'customer browser loads home page', 'app server queries database', 'container calls payment microservice', 'server downloads updates from vendor'.",
    "Pairs sort each card into North-south or East-west and tape it under the right column on the whiteboard.",
    "Pairs then attach one control card to each flow that best protects it, and write one sentence explaining why.",
    "The teacher reviews disagreements with the class, highlighting cloud cases where the line blurs and asking which control actually sees the flow."
   ]
  },
  "discussion": [
   "A CDN provider can see decrypted traffic at the edge. What contract terms and technical controls would make you comfortable with that?",
   "Why do modern applications generate more east-west traffic than north-south, and what does that mean for where security budgets go?"
  ],
  "exit": [
   [
    "Name two availability benefits of a CDN.",
    "It absorbs volumetric DDoS traffic with distributed capacity and reduces latency and load on the origin by serving cached content near users."
   ],
   [
    "A web server querying an internal database is which flow direction, and what control best limits abuse of it?",
    "East-west; micro-segmentation or internal firewall rules allowing only the application tier to reach the database, with internal flow monitoring."
   ],
   [
    "What must be true of the origin server for a CDN to protect it from direct attack?",
    "It must accept traffic only from the CDN, for example through address allow-lists plus a secret header or certificate, and its real address should not be publicly discoverable."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a simple building floor plan where the front door is the perimeter and rooms are servers, and have them trace each flow card on it before using technical terms.",
   "Extend: Ask fast finishers to design a CDN plus micro-segmentation architecture for a three-tier app, listing every allowed flow and the control that enforces it, and to note one supplier risk clause for the CDN contract."
  ]
 },
 {
  "t": "Network components: firewalls, IDS/IPS, NAC, proxies, transmission media, endpoint security",
  "objectives": [
   "Students will be able to distinguish packet-filtering, stateful, application-level, circuit-level and next-generation firewalls by the layer and depth of their inspection.",
   "Students will be able to compare IDS and IPS, and signature-based with anomaly-based detection, including false positive and false negative trade-offs.",
   "Students will be able to explain the roles of NAC, forward proxies, reverse proxies and endpoint security in a layered design.",
   "Students will be able to rank transmission media by resistance to tapping and interference."
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
    "Introduce the two framing questions: at which layer does the device decide, and can it only watch or also block. Walk through firewalls, IDS and IPS, NAC, proxies, media and endpoint tools using a single network diagram."
   ],
   [
    17,
    "Activity",
    "Run the 'Build the clinic network' design activity in small groups."
   ],
   [
    5,
    "Discuss",
    "Groups compare designs and debate fail-open versus fail-closed for the IPS."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "What is the difference between a security camera and a security guard, and which one would you want at the door of a data center?",
  "activity": {
   "title": "Build the clinic network",
   "materials": "Whiteboard or large paper per group, sticky notes labeled with components (packet filter, stateful firewall, NGFW, WAF, NIDS, NIPS, HIDS, NAC, forward proxy, reverse proxy, EDR, fiber, UTP), a printed scenario sheet describing a small clinic.",
   "steps": [
    "Hand each group the clinic scenario: one flat network, a public patient portal, staff laptops, and contractors who plug into wall jacks.",
    "Groups draw the network and place sticky notes where each component belongs, writing on each note whether it watches or blocks and at which layer it decides.",
    "Groups must address three named risks on the sheet: an unmanaged laptop, an injection attack on the portal, and a new malware strain with no signature.",
    "Each group presents in two minutes; the class challenges any component placed where it cannot see the traffic it is supposed to protect."
   ]
  },
  "discussion": [
   "When would you choose to let an IPS fail open rather than fail closed, and who in the organization should make that decision?",
   "With staff working from home and cloud services, why are endpoints often considered the new front line?"
  ],
  "exit": [
   [
    "What is the key difference between an IDS and an IPS?",
    "An IDS monitors and alerts, typically out of band; an IPS sits inline and can block or drop malicious traffic."
   ],
   [
    "Which detection approach is better at catching a never-before-seen attack, and what is its downside?",
    "Anomaly or behavior-based detection, which compares activity to a baseline; its downside is a higher rate of false positives."
   ],
   [
    "Which transmission medium is most resistant to tapping, and why?",
    "Fiber optic cable, because it does not emit electromagnetic signals and is difficult to tap without detection."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column cheat card listing each component with 'watches' or 'blocks' and its layer, and let struggling students use it during the design activity.",
   "Extend: Ask fast finishers to write a short policy decision memo on fail-open versus fail-closed for an inline IPS protecting a hospital network, weighing availability against security."
  ]
 },
 {
  "t": "Secure communication channels: voice, video, remote access, data communications, third-party connectivity",
  "objectives": [
   "Students will be able to identify the main risks of voice, video and collaboration, remote access, data communications and third-party channels.",
   "Students will be able to select controls for each channel, including callback verification, MFA, encryption, segmentation and session logging.",
   "Students will be able to compare RADIUS and TACACS+ and explain the trade-off of split tunneling.",
   "Students will be able to explain why third-party connections need both contractual controls such as an ISA and technical controls."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up prompt aloud and take a quick show of hands, then ask two students to justify their vote."
   ],
   [
    12,
    "Teach",
    "Walk through the five channel types with one risk and two controls each, then cover RADIUS versus TACACS+ and split versus full tunneling with a simple diagram."
   ],
   [
    18,
    "Activity",
    "Run the vendor access negotiation role-play."
   ],
   [
    5,
    "Discuss",
    "Debrief the role-play using the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You get a video call from someone who looks exactly like your manager asking you to buy gift cards for a client today. What do you do, and why is the video not proof?",
  "activity": {
   "title": "Negotiating vendor access",
   "materials": "Printed role cards (vendor technician, IT security lead, facilities manager, procurement officer), a printed scenario about a building controls vendor, whiteboard for recording the agreed design.",
   "steps": [
    "Split the class into groups of four and hand out role cards. The vendor wants always-on access with one shared login; security wants minimal access; facilities wants quick fixes; procurement owns the contract.",
    "Groups have ten minutes to agree on an access design and list which elements are contractual (ISA, notification clause, security standards) and which are technical (segmentation, MFA, ZTNA, time-bound enablement, recording).",
    "Each group writes its design on the board in two columns: contractual and technical.",
    "The teacher compares designs and points out any group missing either column."
   ]
  },
  "discussion": [
   "Should privileged administrators ever be allowed to use split tunneling? What would you require if they were?",
   "Your organization remains accountable for data a partner handles. How does that change what you ask of the partner before connecting?"
  ],
  "exit": [
   [
    "Which AAA protocol encrypts the full payload and supports per-command authorization?",
    "TACACS+, which also separates authentication, authorization and accounting; RADIUS encrypts only the password."
   ],
   [
    "What document defines the technical and security requirements for connecting two organizations' networks?",
    "An interconnection security agreement (ISA)."
   ],
   [
    "What is the best defense against a phone or video request that appears to come from an executive?",
    "Verify through a callback to a known, independently obtained number, supported by staff training and a policy requiring verification for payments."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page table with each channel, its top risk and two controls, and ask them to match scenario cards to rows before the role-play.",
   "Extend: Ask fast finishers to draft the key clauses of an ISA for the building controls vendor, including connection method, encryption, MFA, logging, notification timelines and termination steps."
  ]
 },
 {
  "t": "Network attacks and mitigations: DDoS, spoofing, on-path, DNS attacks",
  "objectives": [
   "Students will be able to describe volumetric, protocol, application-layer and reflection or amplification DDoS attacks and match each to mitigations.",
   "Students will be able to distinguish ingress and egress filtering and explain how they reduce IP spoofing.",
   "Students will be able to explain how on-path attacks and SSL stripping work at a recognition level and choose defenses such as HSTS and certificate validation.",
   "Students will be able to state what DNSSEC does and does not protect and identify DNS tunneling in logs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and record the class's guesses about where to stop a flood."
   ],
   [
    13,
    "Teach",
    "Use the three weak spots framing (finite capacity, unverified addresses, unchecked identities) to introduce DDoS, spoofing, on-path and DNS attacks with one symptom and one control each."
   ],
   [
    17,
    "Activity",
    "Run the symptom-to-control matching activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Discuss why DDoS response is arranged in advance and who owns the provider relationship."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your office internet connection is completely full of junk traffic. If you add a block rule on your own firewall, will the website come back? Why or why not?",
  "activity": {
   "title": "Symptom to control",
   "materials": "Printed symptom cards with short log or monitoring excerpts written by the teacher (for example, a rising half-open connection count, large responses from port 53 with no matching queries, long random subdomains in DNS logs, a gateway MAC address change, a bank site loading without HTTPS), printed control cards, tape and whiteboard.",
   "steps": [
    "Give each pair a set of eight symptom cards and twelve control cards, including some distractors such as 'add more firewall rules' and 'enable DNSSEC to encrypt queries'.",
    "Pairs name the attack shown by each symptom and attach the best control card, writing a one-line reason.",
    "Pairs must set aside the distractor cards and explain on a sticky note why each is wrong.",
    "The teacher reviews answers on the whiteboard, focusing on DNSSEC versus DoH and DoT, and on ingress versus egress filtering."
   ]
  },
  "discussion": [
   "Why is DDoS resilience mostly a matter of contracts and preparation rather than technical heroics during the attack?",
   "Your organization's open resolver was used to attack someone else. What responsibility, if any, do you have toward that victim?"
  ],
  "exit": [
   [
    "What does DNSSEC provide, and what does it not provide?",
    "It provides authenticity and integrity of DNS answers through digital signatures; it does not encrypt queries or responses."
   ],
   [
    "Which filtering stops your hosts from sending packets with forged source addresses to the internet?",
    "Egress filtering, which drops outbound packets whose source addresses do not belong to your network."
   ],
   [
    "Logs show thousands of half-open TCP connections. Name the attack and one mitigation.",
    "A SYN flood; mitigations include SYN cookies, rate limiting and upstream filtering."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference sheet that maps each attack to one plain-language symptom and one control, and let struggling students match only the four core attacks first.",
   "Extend: Ask fast finishers to write a one-page DDoS response playbook outline covering provider contacts, scrubbing activation, communication with customers and post-incident review."
  ]
 },
 {
  "t": "Monitoring and management: network observability, capacity, logging",
  "objectives": [
   "Students will be able to match monitoring data sources (syslog, SNMP, flow data, packet capture) to the questions each answers.",
   "Students will be able to explain why baselines and capacity management support both availability and threat detection.",
   "Students will be able to describe log management practices that preserve evidence, including central collection, NTP synchronization, integrity protection and retention.",
   "Students will be able to recommend protections for management traffic, such as out-of-band networks, SSH, SNMPv3 and centralized AAA."
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
    "Introduce the four data sources with the phone bill analogy, then cover baselines, capacity headroom for failover, log forwarding, NTP and management plane protection."
   ],
   [
    18,
    "Activity",
    "Run the timeline reconstruction activity in groups of three."
   ],
   [
    5,
    "Discuss",
    "Debrief the activity and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "If three witnesses describe a car accident but each one's watch shows a different time, what problems will the investigator have?",
  "activity": {
   "title": "Rebuild the timeline",
   "materials": "Printed log excerpts written by the teacher from a firewall, a file server, a directory server and a flow collector for a fictional incident, with one source's clock deliberately offset by eleven minutes; scissors, tape and whiteboard.",
   "steps": [
    "Give each group the printed excerpts and ask them to cut out each event and arrange them in order on the desk.",
    "Groups will notice that the order does not make sense; ask them to find which source's clock is off and by how much, using a shared event that appears in two sources.",
    "Groups correct the offset, rebuild the timeline and write a two-sentence summary of what the attacker did.",
    "Each group lists which data source revealed each step (flow data, syslog, authentication log) and one control that would have made the investigation easier."
   ]
  },
  "discussion": [
   "What should happen when a critical log source suddenly goes silent at 2 a.m., and why might it be more than a technical fault?",
   "How would you decide how long to keep flow data versus full packet capture?"
  ],
  "exit": [
   [
    "Which data source shows who talked to whom and how much, even for encrypted traffic?",
    "Flow data such as NetFlow or IPFIX."
   ],
   [
    "Why must all devices be synchronized with NTP?",
    "So timestamps are consistent and events from different systems can be correlated into an accurate timeline."
   ],
   [
    "Why should a redundant pair of firewalls not each run at 70 percent of capacity?",
    "If one fails, the survivor must carry the combined load, which exceeds its capacity and causes an outage; planning must include failover headroom."
   ]
  ],
  "differentiation": [
   "Support: Provide a version of the activity where the offset source is highlighted and students only need to adjust times and reorder events.",
   "Extend: Ask fast finishers to write two SIEM correlation rule ideas in plain language that would have detected this incident early, and to propose retention periods for each data source with a short justification."
  ]
 },
 {
  "t": "Controlling physical and logical access to information, systems, devices, facilities and applications",
  "objectives": [
   "Students will be able to define subject and object and explain how an access decision is framed.",
   "Students will be able to classify controls by type (administrative, technical, physical) and by function (preventive, detective, corrective, deterrent, recovery, directive, compensating).",
   "Students will be able to apply least privilege, need to know, separation of duties, defense in depth and default deny to a scenario.",
   "Students will be able to explain why physical and logical access controls depend on each other."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question, then reveal that a guard can be three functions at once."
   ],
   [
    12,
    "Teach",
    "Define subject and object, the five asset kinds, physical versus logical controls, the type and function grid, and the core principles with a quick example for each."
   ],
   [
    18,
    "Activity",
    "Run the control classification grid activity."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect classification to audit evidence."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Is a security guard at a building entrance a preventive, detective or deterrent control? Can it be more than one?",
  "activity": {
   "title": "The type and function grid",
   "materials": "Whiteboard with a grid of three rows (administrative, technical, physical) and seven columns (preventive, detective, corrective, deterrent, recovery, directive, compensating), sticky notes with about twenty controls written on them (background check, badge reader, log review, backup restore, dummy camera, acceptable use policy, firewall rule, jump host for legacy system, fire extinguisher, security awareness training).",
   "steps": [
    "Distribute the sticky notes so each small group holds three or four controls.",
    "Groups place each sticky note in the grid cell that best fits its type and primary function, and add a second dot if it serves another function too.",
    "Groups then pick one control from another group they disagree with and argue for a different cell.",
    "The teacher resolves disagreements, emphasizing the dummy camera (deterrent only) and the jump host for a legacy system (compensating)."
   ]
  },
  "discussion": [
   "Who should approve access to a dataset: the IT administrator or the data owner, and why?",
   "How would you prove to an auditor that least privilege is actually in place, not just written in a policy?"
  ],
  "exit": [
   [
    "An employee with sufficient clearance is denied access to a file for a project she is not assigned to. Which principle applies?",
    "Need to know."
   ],
   [
    "Classify a background check by type and function.",
    "Administrative type, preventive function."
   ],
   [
    "Why might full-disk encryption be needed in a locked data room?",
    "Because physical access to a server can bypass logical controls, for example by removing the drive; encryption protects data if physical controls fail."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a simplified grid with only the three types and three functions (preventive, detective, corrective) first, then add the remaining functions once they are confident.",
   "Extend: Ask fast finishers to design a layered access control plan for a small data room using at least one control of each type and four different functions, and to identify which control is compensating and why."
  ]
 },
 {
  "t": "Identification, authentication and authorization; MFA and passwordless",
  "objectives": [
   "Students will be able to put identification, authentication, authorization and accountability in order and give an example of each.",
   "Students will be able to classify authentication factors by category and determine whether a combination is true MFA.",
   "Students will be able to compare SMS, TOTP, push and FIDO2 methods by phishing resistance and explain how FIDO2 passwordless authentication works.",
   "Students will be able to state current password guidance, including length over complexity and changing passwords on evidence of compromise."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and tally votes on the board."
   ],
   [
    13,
    "Teach",
    "Walk through IAAA with the airport analogy, the factor categories, the ranking of second factors, then draw the FIDO2 challenge and signature exchange on the board."
   ],
   [
    17,
    "Activity",
    "Run the factor sort and MFA verdict card game."
   ],
   [
    5,
    "Discuss",
    "Discuss account recovery as part of authentication using the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A website asks for your password and then the name of your first pet. Is that two-factor authentication? Vote yes or no.",
  "activity": {
   "title": "Is it really MFA?",
   "materials": "Printed cards with authentication items (password, PIN, smart card, hardware security key, phone with authenticator app, fingerprint, face scan, security question, SMS code, typing rhythm), whiteboard with three columns labeled know, have, are.",
   "steps": [
    "Pairs sort the item cards into the know, have and are columns, discussing borderline cases such as an SMS code (proves possession of a phone number) and typing rhythm (behavioral, usually a contextual signal).",
    "The teacher then reads out ten combinations, such as 'password plus PIN' or 'smart card plus PIN', and pairs hold up a card saying MFA or not MFA.",
    "For each true MFA combination, pairs rate it as phishing-resistant or not and justify the rating.",
    "The class finishes by ordering four methods from weakest to strongest against real-time phishing: SMS, TOTP, push with number matching, FIDO2 key."
   ]
  },
  "discussion": [
   "If your login uses a FIDO2 key but the help desk will reset it for anyone who knows an employee's birthday, how strong is your authentication really?",
   "Why do shared accounts destroy accountability even when the shared password is very strong?"
  ],
  "exit": [
   [
    "Put these in order and name each: the system logs the file deletion; the user enters a username; the user taps a security key; the system grants read access.",
    "Enter username (identification), tap key (authentication), grant read access (authorization), log the deletion (accountability)."
   ],
   [
    "Is a smart card plus a PIN multifactor? Explain.",
    "Yes, because the smart card is something you have and the PIN is something you know, two different categories."
   ],
   [
    "Why can a phishing site not use a FIDO2 credential?",
    "The credential is bound to the legitimate site's origin, so the authenticator will not produce a valid signature for a look-alike domain, and no reusable secret is sent."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a factor reference card with two examples for each category, and let them complete only the sorting step before attempting the verdict round.",
   "Extend: Ask fast finishers to design an authentication policy for three account types (standard staff, remote contractors, domain administrators), naming the method and recovery process for each and justifying the strength."
  ]
 },
 {
  "t": "Identity management implementation: groups, roles, AAA, session management, registration and proofing",
  "objectives": [
   "Students will be able to explain registration and identity proofing and match proofing strength to risk using assurance levels.",
   "Students will be able to justify assigning permissions to groups and roles rather than individuals and recognize role explosion and privilege creep.",
   "Students will be able to describe centralized AAA with RADIUS or TACACS+ and the value of accounting records.",
   "Students will be able to apply session management controls, including regeneration at login, secure cookies, and idle and absolute timeouts."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and gather examples from students."
   ],
   [
    12,
    "Teach",
    "Walk the identity lifecycle from registration and proofing through role assignment, AAA and sessions to deprovisioning, using the key cabinet analogy."
   ],
   [
    18,
    "Activity",
    "Run the access cleanup activity using a printed access report."
   ],
   [
    5,
    "Discuss",
    "Share findings and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "What would you ask someone to prove before giving them a library card? A bank account? A key to the hospital pharmacy? Why are the answers different?",
  "activity": {
   "title": "Clean up the access report",
   "materials": "A printed fictional access report (about 25 rows) listing user, department, job title, employment status, permissions and how each was granted (role, group or direct), plus a printed role catalog; highlighters and sticky notes.",
   "steps": [
    "Small groups review the report and highlight every problem they find: leavers with active accounts, direct grants, users holding roles from previous jobs, and one account with no proofing record.",
    "Groups propose a fix for each problem on a sticky note, such as move to role, disable, or re-proof.",
    "Groups redesign access for three users using only roles from the catalog, noting any role that seems too broad or any need for a new role.",
    "The teacher leads a quick tally of problem types and links each to the lifecycle stage that failed."
   ]
  },
  "discussion": [
   "How short should an idle session timeout be for a hospital records system versus a news website, and who should decide?",
   "What are the warning signs that an organization has created too many roles?"
  ],
  "exit": [
   [
    "What prevents session fixation?",
    "Regenerating the session identifier after successful authentication."
   ],
   [
    "Why assign permissions to roles instead of individual accounts?",
    "Moving a user between roles updates access consistently and makes reviews simple, avoiding scattered individual grants and privilege creep."
   ],
   [
    "Which AAA protocol provides accounting of individual administrator commands on network devices?",
    "TACACS+, which separates authentication, authorization and accounting and can authorize and log each command."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a version of the access report with a key showing the four problem types, and ask them to find one example of each.",
   "Extend: Ask fast finishers to write a short joiner, mover and leaver procedure that names the authoritative source, the approvals required, the timing of removal and the evidence an auditor would ask to see."
  ]
 },
 {
  "t": "Federated identity with third parties: SAML, OAuth 2.0, OIDC",
  "objectives": [
   "Students will be able to explain the roles of the identity provider and the service provider or relying party in a federation.",
   "Students will be able to distinguish SAML 2.0, OAuth 2.0 and OIDC by purpose, data format and typical use.",
   "Students will be able to identify the checks an SP must perform on an assertion or token, including signature, audience and expiry.",
   "Students will be able to assess federation as a third-party risk, including IdP dependency and attribute release."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about sign-in-with buttons and collect answers."
   ],
   [
    12,
    "Teach",
    "Draw the IdP and SP with a redirect flow for SAML, then the OAuth roles (resource owner, client, authorization server, resource server), then show how OIDC adds an ID token."
   ],
   [
    18,
    "Activity",
    "Run the federation flow role-play with students acting as the parties."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore trust and risk."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When you click 'Sign in with' a large provider on a website, does that website ever learn your password? What does it learn instead?",
  "activity": {
   "title": "Act out the flow",
   "materials": "Name placards (User, Browser, Identity Provider, Service Provider, Authorization Server, Resource Server, Client App), index cards to serve as assertions and tokens, markers, a projector showing the three scenarios.",
   "steps": [
    "Assign placards to volunteers and run the first scenario, SAML SP-initiated sign-in to a SaaS app: the User visits the SP, is redirected to the IdP, authenticates, and carries a signed 'assertion' card back.",
    "The SP volunteer must read aloud the three checks before accepting the card (signature, audience, validity time); the teacher secretly gives one card a wrong audience to see whether the SP catches it.",
    "Run the second scenario, an OAuth photo printing app requesting read access to one album, with a 'token' card listing only that scope; then run OIDC by adding an 'ID token' card stating who the user is.",
    "Seated students record, for each scenario, which standard was used, which party authenticated the user and what data was shared."
   ]
  },
  "discussion": [
   "If your identity provider goes down for four hours, what happens to every federated application, and how would you plan for it?",
   "What personal attributes should a university release to a research partner's portal, and who should decide?"
  ],
  "exit": [
   [
    "A calendar app wants to read your schedule without your password. Which standard, and is it authentication or authorization?",
    "OAuth 2.0, which provides delegated authorization."
   ],
   [
    "What does OIDC add to OAuth 2.0?",
    "An identity layer: a signed ID token, a JWT, that tells the relying party who authenticated, who issued the token, for which client and when it expires."
   ],
   [
    "Name three things a service provider must verify in a SAML assertion.",
    "The digital signature, the intended audience and the validity period."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page comparison table (purpose, format, typical use, key token or assertion) for SAML, OAuth 2.0 and OIDC that struggling students can reference during the role-play.",
   "Extend: Ask fast finishers to list the failure points in the OAuth authorization code flow (redirect address, state, PKCE, token storage) and describe what control protects each."
  ]
 },
 {
  "t": "Credential management systems and single sign-on",
  "objectives": [
   "Students will be able to describe the credential lifecycle from issuance to revocation and identify weaknesses such as hard-coded secrets and weak recovery.",
   "Students will be able to select the right storage for a credential: password vault, privileged vault, secrets manager, PKI, HSM or TPM.",
   "Students will be able to explain the benefits of SSO and its single point of compromise and failure risks, with mitigations.",
   "Students will be able to distinguish SSO from password synchronization."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and count how many logins students use each week."
   ],
   [
    12,
    "Teach",
    "Present the credential lifecycle, the types of credential stores, then SSO benefits and risks with the master key analogy, and a short Kerberos ticket diagram."
   ],
   [
    18,
    "Activity",
    "Run the secrets triage activity with printed code and configuration excerpts."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to weigh SSO risk."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "How many different passwords do you use in a week, and how many of them are truly unique? What do people do when they have too many?",
  "activity": {
   "title": "Secrets triage",
   "materials": "Printed excerpts written by the teacher: a configuration file with a database password, a script with an API key, a spreadsheet of shared admin passwords, a sticky note on a monitor, and a description of a help desk reset process that only asks for an employee ID; a printed menu of solutions (password vault, privileged vault with rotation, secrets manager, HSM, SSO with MFA, strong reset verification).",
   "steps": [
    "Small groups examine each excerpt and identify the credential, who uses it (person or machine) and what could go wrong.",
    "Groups assign the best solution from the menu to each item and write one sentence on how rotation and revocation would work.",
    "Groups rank the five problems from most to least urgent and justify the top choice.",
    "The class compares rankings, and the teacher highlights that the weak reset process undermines every other control."
   ]
  },
  "discussion": [
   "SSO concentrates risk. Under what circumstances is that trade-off clearly worth it?",
   "If the identity platform is down, how should a hospital keep critical systems usable without creating a permanent back door?"
  ],
  "exit": [
   [
    "What is the main security disadvantage of SSO, and the main mitigation?",
    "A single point of compromise (and failure); mitigate with strong, preferably phishing-resistant, MFA at the SSO point plus high availability and monitoring."
   ],
   [
    "How does SSO differ from password synchronization?",
    "SSO authenticates once and passes tickets or tokens; password synchronization keeps the same password on separate systems that each still prompt for it."
   ],
   [
    "Where should an application's database password be stored?",
    "In a secrets manager or vault that supplies it at runtime, rotates it and logs access, not in code or configuration files."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a matching worksheet that pairs each credential type with its best storage before they attempt the triage excerpts.",
   "Extend: Ask fast finishers to sketch the Kerberos exchange (login, TGT, service ticket) and explain why protecting the KDC's keys is critical."
  ]
 },
 {
  "t": "Just-in-time access and privileged access management",
  "objectives": [
   "Students will be able to explain why privileged accounts are high-value targets and list the main types, including service accounts.",
   "Students will be able to describe PAM capabilities: discovery, vaulting, checkout with approval, rotation, session brokering and recording.",
   "Students will be able to explain standing privilege and how just-in-time access, just-enough administration and zero standing privilege reduce it.",
   "Students will be able to specify controls for break-glass accounts."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list what an attacker could do with an administrator account."
   ],
   [
    12,
    "Teach",
    "Present discovery, separate admin accounts and privileged access workstations, PAM vault features, JIT and standing privilege, and break-glass rules."
   ],
   [
    18,
    "Activity",
    "Run the privilege audit and redesign activity."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore resistance to JIT."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If an attacker stole the password of a domain administrator, list everything they could do in the next hour. Now, what if that administrator had no rights until they asked for them?",
  "activity": {
   "title": "Privilege audit and redesign",
   "materials": "A printed fictional privileged account inventory (about 15 rows: human admins, service accounts, a vendor account, local admin accounts, two emergency accounts) with columns for rights, standing or not, last password change, and how it is used; sticky notes and the whiteboard.",
   "steps": [
    "Small groups review the inventory and flag every risk, such as standing owner rights, admins browsing with privileged accounts, unrotated service account passwords and an emergency account tied to SSO.",
    "For each flagged account, groups choose controls from a list on the board: vault, rotation, JIT, just-enough administration, session recording, deny interactive logon, privileged access workstation, break-glass controls.",
    "Groups write a short target state for the environment and identify which three changes give the biggest risk reduction first.",
    "Each group presents its top three, and the class compares priorities."
   ]
  },
  "discussion": [
   "Engineers often resist JIT because they fear delays during outages. How would you design the process to address that concern?",
   "Why are service accounts so often forgotten, and how would you discover them?"
  ],
  "exit": [
   [
    "What problem does just-in-time access solve?",
    "Standing privilege; elevated rights exist only when approved and needed, for a limited time, so a stolen account usually holds no admin rights."
   ],
   [
    "What makes a vaulted privileged password useless after a session ends?",
    "Automatic rotation of the credential after each checkout."
   ],
   [
    "Name three controls for break-glass accounts.",
    "Any three of: keep them few, store strong credentials securely (possibly split between custodians), make them independent of normal identity systems, alert on every use, and review after each use."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a smaller inventory of five accounts with one obvious risk each, and a matching list of controls.",
   "Extend: Ask fast finishers to write a one-page break-glass procedure covering storage, custodians, independence from SSO, alerting, use logging and post-use review."
  ]
 },
 {
  "t": "Authorization mechanisms: RBAC, rule-based, MAC, DAC, ABAC, risk-based",
  "objectives": [
   "Students will be able to identify DAC, MAC, role-based, rule-based, ABAC and risk-based access control by who decides and what the decision is based on.",
   "Students will be able to explain the strengths and weaknesses of each model, including DAC's exposure to malware and MAC's rigidity.",
   "Students will be able to select an appropriate model, or combination of models, for a described scenario.",
   "Students will be able to distinguish role-based from rule-based access control despite the shared acronym."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record answers as owner, system, job or rule."
   ],
   [
    12,
    "Teach",
    "Introduce the two questions (who decides, based on what) and build a comparison table of the six models on the board with one example each."
   ],
   [
    18,
    "Activity",
    "Run the 'Who decides?' scenario card sort in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore mixing models."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of three places you have access to: your phone, your school or work building and a shared online document. Who decided you could get in, and on what basis?",
  "activity": {
   "title": "Who decides?",
   "materials": "Printed scenario cards (about 14), each describing an access decision, such as a user sharing her own file, a firewall blocking port 23 for everyone, a nurse limited to her ward during her shift, a Secret-cleared engineer denied a document from another compartment, a login from a new country requiring a hardware key, a new hire gaining access by being placed in the accounts payable role; a whiteboard with six labeled zones.",
   "steps": [
    "Pairs read each card, answer 'who decides?' and 'based on what?' on the back, then name the model.",
    "Pairs tape each card into the matching zone on the whiteboard.",
    "The teacher adds two cards that combine models, such as a hospital using RBAC plus ABAC plus a rule-based firewall, and pairs identify each layer.",
    "The class reviews any misplaced cards, especially rule-based versus role-based and DAC versus MAC."
   ]
  },
  "discussion": [
   "Why might a hospital choose RBAC for most access but ABAC for patient records? What does each cost to run?",
   "Risk-based access can block legitimate users who travel. How should an organization balance security against frustration?"
  ],
  "exit": [
   [
    "A user grants a colleague access to her own file. Which model is this?",
    "Discretionary access control, because the owner decides."
   ],
   [
    "A firewall denies port 23 for every user. Which model is this, and why is it not role-based?",
    "Rule-based access control; the rule applies globally regardless of identity or job role."
   ],
   [
    "Which model compares a subject's clearance with an object's classification label, and can users change the labels?",
    "Mandatory access control; no, the system enforces the labels and users cannot change them."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference strip with the six models and their 'who decides' answer, and start them with six single-model cards before the combined scenarios.",
   "Extend: Ask fast finishers to write an ABAC policy in plain language for a scenario of their choice, naming the subject, object, action and environment attributes, and to describe one way the policy could accidentally grant too much access."
  ]
 },
 {
  "t": "Identity and access provisioning lifecycle: account access review, provisioning and deprovisioning",
  "objectives": [
   "Students will be able to describe the joiner, mover and leaver stages and name the main risk at each stage.",
   "Students will be able to explain how privilege creep develops and identify the preventive and detective controls that address it.",
   "Students will be able to apply correct deprovisioning steps, including timing for hostile terminations and disable-before-delete.",
   "Students will be able to evaluate an access review for signs of rubber-stamping and recommend improvements."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the whiteboard. Point out that almost every answer involves something left behind after a change."
   ],
   [
    12,
    "Teach",
    "Draw a timeline labeled Joiner, Mover, Leaver. For each stage, explain the correct process, the authoritative source (HR) and the common failure: copied access, privilege creep, orphaned accounts. Add access reviews above the timeline as the detective layer. Stress disable-before-delete and timing for hostile terminations."
   ],
   [
    18,
    "Activity",
    "Run the access audit activity in small groups. Circulate and ask each group which control would have prevented each finding, not just detected it."
   ],
   [
    6,
    "Discuss",
    "Groups report their top two findings. Use the discussion questions to connect findings to exam wording such as privilege creep, recertification and deprovisioning failure."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Think of a time you kept access to something after you no longer needed it: an old school login, a former job's shared drive, a streaming account from a past roommate. Why did that access survive, and who should have noticed?",
  "activity": {
   "title": "Audit the access roster",
   "materials": "Printed one-page roster of 12 fictional employees with job history, current role and current entitlements; printed HR leaver list; highlighters; whiteboard.",
   "steps": [
    "Give each group of three the roster and the HR leaver list for a fictional company. Include planted problems: a mover with old access, a leaver with an active account that logged in recently, a service account with no owner, a contractor with no expiry date and a new hire whose access was copied from a senior colleague.",
    "Groups highlight every problem and label it with the lifecycle stage where it originated (joiner, mover, leaver, or no owner).",
    "For each problem, groups write one preventive control and one detective control on the sheet.",
    "Groups decide which finding should be escalated as a security incident rather than an administrative fix, and explain why.",
    "Each group drafts two improvements to the access review report so reviewers are less likely to rubber-stamp."
   ]
  },
  "discussion": [
   "Why do organizations so often remove access slowly for movers but grant new access quickly, and how would you change the incentives?",
   "When is it acceptable for a transferring employee to keep some old access, and what conditions should apply?",
   "Who should be accountable for an access review: the security team, the manager or the data owner, and why?"
  ],
  "exit": [
   [
    "A long-serving employee has access from three previous jobs. What is this called, and which control detects it?",
    "Privilege creep (access aggregation); periodic access reviews or recertification detect it."
   ],
   [
    "When should access be disabled for a hostile termination?",
    "Before or at the moment the employee is notified."
   ],
   [
    "Why disable an account first rather than delete it immediately?",
    "Disabling removes access while preserving audit trails, data and ownership for investigation and retention."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-column card (Joiner, Mover, Leaver) with the risk and control already written for one row, and have them complete the remaining rows before the roster activity.",
   "Extend: Ask fast finishers to design an automated HR-driven workflow for a mover event, including approvals, overlap time limits and how SaaS applications outside SSO would be handled."
  ]
 },
 {
  "t": "Authentication systems: Kerberos, RADIUS, TACACS+",
  "objectives": [
   "Students will be able to describe the Kerberos ticket flow using the terms KDC, AS, TGS, TGT and service ticket.",
   "Students will be able to compare RADIUS and TACACS+ on transport protocol, encryption scope and separation of AAA functions.",
   "Students will be able to explain why Kerberos depends on time synchronization and how the KDC creates a single point of failure.",
   "Students will be able to select the appropriate protocol for a given network access or device administration scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers. Connect them to the idea of proving identity once and being trusted afterward."
   ],
   [
    15,
    "Teach",
    "Whiteboard the Kerberos flow in four arrows: client to AS, AS returns TGT, client to TGS for a service ticket, client to server. Explain timestamps and the KDC as a crown jewel. Then draw a two-column comparison table for RADIUS and TACACS+ covering UDP versus TCP, password-only versus full encryption, and combined versus separated AAA."
   ],
   [
    15,
    "Activity",
    "Run the Kerberos role-play, then the protocol sort with scenario cards."
   ],
   [
    6,
    "Discuss",
    "Use the discussion questions to connect the role-play to golden tickets, time skew and design decisions."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "At a concert or theme park, how do staff know you paid without checking your ID at every entrance? What would happen if someone stole the machine that prints the wristbands?",
  "activity": {
   "title": "Act out Kerberos, then sort the protocols",
   "materials": "Index cards labeled Client, Authentication Service, Ticket-Granting Service and File Server; sticky notes to act as tickets with a time written on them; a wall clock; printed scenario cards; whiteboard.",
   "steps": [
    "Assign four students the roles of Client, Authentication Service, Ticket-Granting Service and File Server. The Client asks the AS for a TGT; the AS writes a sticky note with the time and \"TGT\" and hands it over.",
    "The Client takes the TGT to the TGS and receives a second sticky note labeled \"Service ticket: File Server\" with the time. The File Server accepts it only if the time is within five minutes of the wall clock.",
    "Repeat with the File Server's clock set ten minutes ahead and let the class observe the failure. Then have a student play an attacker who has stolen the TGS's stamp and can write any ticket, and ask the class what that represents.",
    "In pairs, students sort eight scenario cards (Wi-Fi login, VPN access, per-command switch control, file share SSO, mobile carrier signaling and others) into Kerberos, RADIUS, TACACS+ or Diameter, writing one reason on each card.",
    "Pairs compare answers with a neighboring pair and resolve any disagreements using the comparison table on the board."
   ]
  },
  "discussion": [
   "Centralized authentication makes control easier but creates high-value targets. How would you balance availability and protection for domain controllers or TACACS+ servers?",
   "If RADIUS encrypts only the password, why is it still widely used for Wi-Fi, and what makes it acceptable there?",
   "What should happen on a switch if the TACACS+ servers become unreachable during an outage?"
  ],
  "exit": [
   [
    "Name two differences between RADIUS and TACACS+.",
    "RADIUS uses UDP and encrypts only the password, combining authentication and authorization; TACACS+ uses TCP, encrypts the full payload and separates authentication, authorization and accounting."
   ],
   [
    "Users can log in but cannot reach one server, and its logs show clock skew errors. Which protocol is involved and what is the fix?",
    "Kerberos; restore time synchronization, for example with NTP, so the server's clock matches the domain controllers."
   ],
   [
    "What does a golden ticket attack require, and what does it give the attacker?",
    "The stolen key that signs TGTs; it lets the attacker forge valid TGTs and gain broad access."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed Kerberos flow diagram with blank labels for TGT, service ticket, AS and TGS, and a word bank, so students can focus on the order of steps.",
   "Extend: Ask fast finishers to explain how pass the ticket and Kerberoasting differ from a golden ticket, and to propose one detection and one prevention control for each."
  ]
 },
 {
  "t": "Access control attacks and biometrics: FAR, FRR, CER",
  "objectives": [
   "Students will be able to distinguish brute force, dictionary, password spraying and credential stuffing by their log patterns and name a defense for each.",
   "Students will be able to define Type I and Type II biometric errors and link them to FRR and FAR.",
   "Students will be able to explain the crossover error rate and use it to compare two biometric systems.",
   "Students will be able to recommend a sensitivity setting based on the value of the protected asset."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about phone face unlock and collect experiences of being rejected. Ask whether anyone has heard of a phone unlocking for the wrong person."
   ],
   [
    13,
    "Teach",
    "Present the four password attacks with a one-line log signature for each. Then draw a graph on the whiteboard: sensitivity on the horizontal axis, error rate on the vertical, FAR falling and FRR rising, and mark the crossing as the CER. Label Type I and Type II clearly."
   ],
   [
    17,
    "Activity",
    "Run the threshold game and the log-reading cards."
   ],
   [
    6,
    "Discuss",
    "Use the discussion questions to connect tuning choices to business value and user acceptance."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Has your phone's face or fingerprint unlock ever refused to recognize you? Would you rather it refused you more often or let someone else in now and then? Why?",
  "activity": {
   "title": "The threshold game and the log detective",
   "materials": "Printed sheet of 20 simple face sketches with small variations, a printed reference face; printed log excerpt cards for four password attacks; whiteboard; markers.",
   "steps": [
    "Show the reference face. Students act as the biometric matcher in pairs: for each of the 20 sketches (some are the enrolled person with small changes, some are impostors with subtle differences), they mark accept or reject using a strict rule, then again using a relaxed rule.",
    "The teacher reveals which sketches were genuine. Pairs count their false rejections and false acceptances under each rule and plot both points on a class graph on the whiteboard.",
    "The class finds roughly where the two error lines cross and names that point the CER. Ask which rule a bank vault should use and which a gym locker should use.",
    "Hand each pair four log excerpt cards: many failures on one account, one failure each on hundreds of accounts, first-try successes from unusual networks, and a stolen hash file. Pairs name the attack on each card and write one control that stops it.",
    "Pairs swap cards with another pair to check answers."
   ]
  },
  "discussion": [
   "Why is a false acceptance usually considered worse than a false rejection, and can you think of a situation where frequent false rejections create a security problem of their own?",
   "A biometric template is stolen. What makes this worse than a stolen password, and how should organizations store templates?",
   "How should user acceptance influence the choice between retina, iris, face and fingerprint systems?"
  ],
  "exit": [
   [
    "A legitimate employee is denied by a fingerprint reader. What type of error is this and which rate measures it?",
    "A Type I error, measured by the false rejection rate (FRR)."
   ],
   [
    "Vendor A has a CER of 3 percent and Vendor B has a CER of 1 percent. Which is more accurate?",
    "Vendor B, because a lower CER indicates a more accurate system."
   ],
   [
    "Logs show one failed login on each of 400 accounts using the same password. What attack is this and why does lockout not stop it?",
    "Password spraying; it stays below each account's lockout threshold by trying very few passwords per account."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-row card that reads \"Type I = FRR = real user rejected\" and \"Type II = FAR = impostor accepted\" with the Owner Out and Thief Through memory aid, and let them use it during the activity.",
   "Extend: Ask fast finishers to explain how session hijacking and pass the hash bypass MFA protections, and to propose detective controls that would reveal each."
  ]
 },
 {
  "t": "Designing and validating assessment, test and audit strategies (internal, external, third party)",
  "objectives": [
   "Students will be able to distinguish a security test, a security assessment and an audit.",
   "Students will be able to compare internal, external and third-party audits on independence, cost and frequency.",
   "Students will be able to design a basic testing calendar that ties activities, frequency and assessor type to risk.",
   "Students will be able to identify events that should trigger revalidation of an assessment strategy."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about restaurant inspections and list the answers on the board under Self-check and Inspector."
   ],
   [
    12,
    "Teach",
    "Define test, assessment and audit with one example each. Draw the independence ladder from system owner to regulator. Explain scope, objectives, methods, frequency, authorization and reporting as the parts of a strategy, and when to revalidate."
   ],
   [
    18,
    "Activity",
    "Groups build a testing calendar for a fictional company and present it."
   ],
   [
    6,
    "Discuss",
    "Use the discussion questions to probe the trade-offs groups made."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A restaurant checks its own fridge temperatures every day, but a health inspector also visits. Why is the inspector's visit more convincing to customers, and why does the restaurant still need its own daily checks?",
  "activity": {
   "title": "Build the testing calendar",
   "materials": "Printed company profile for a fictional online pharmacy (systems, regulations, customers, recent cloud move); blank calendar grid with columns for activity, scope, frequency, assessor type, reported to; sticky notes; whiteboard.",
   "steps": [
    "In groups of four, students read the company profile and list its obligations and highest-risk systems.",
    "Using sticky notes, groups place activities on the calendar grid: vulnerability scans, configuration reviews, penetration test, internal audit, external audit and vendor assessments. Each note must state the assessor type (internal, external or third party).",
    "Groups justify each frequency choice in one sentence tied to risk or regulation.",
    "The teacher announces a change event (an acquisition of a smaller company with its own network). Groups revise the calendar and note what revalidation they would do.",
    "Each group presents its calendar in two minutes; the class identifies any activity where independence was insufficient for its audience."
   ]
  },
  "discussion": [
   "Why should an internal audit function report to the audit committee rather than to the chief information officer?",
   "What would convince you that a testing strategy is working, beyond the number of tests performed?",
   "How should a small organization with a limited budget decide where independent assessment is worth paying for?"
  ],
  "exit": [
   [
    "What is the key difference between an audit and an assessment?",
    "An audit is a formal, independent evaluation against defined criteria that results in an opinion; an assessment is a broader review to find and fix weaknesses."
   ],
   [
    "A regulator wants an objective opinion on your controls. Which assessor type best fits?",
    "An external or third-party auditor, because they are independent of the control owners."
   ],
   [
    "Name two events that should trigger revalidation of a testing strategy.",
    "Examples: a cloud migration, an acquisition, a major system change, a new regulation, or evidence that findings are not being fixed."
   ]
  ],
  "differentiation": [
   "Support: Provide a pre-filled independence ladder card and a list of six activities with their typical assessor type so students can focus on placing them by frequency and risk.",
   "Extend: Ask fast finishers to define two metrics that would show leadership whether the testing program is effective, and explain how each would be collected."
  ]
 },
 {
  "t": "Vulnerability assessment and penetration testing (rules of engagement, testing knowledge levels)",
  "objectives": [
   "Students will be able to contrast a vulnerability assessment with a penetration test in purpose, depth and risk.",
   "Students will be able to list the essential elements of rules of engagement and explain why written authorization comes first.",
   "Students will be able to classify a test as black, gray or white box and as announced, blind or double-blind.",
   "Students will be able to explain the difference between false positives and false negatives and why credentialed scans reduce both."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about hiring someone to test home security and collect what students would want agreed in advance."
   ],
   [
    13,
    "Teach",
    "Compare scans and penetration tests in a two-column table. Walk through the four phases: planning, discovery, attack, reporting. List RoE elements on the board. Draw a grid with knowledge level on one axis and defender awareness on the other."
   ],
   [
    17,
    "Activity",
    "Groups draft rules of engagement and classify test scenarios."
   ],
   [
    6,
    "Discuss",
    "Use the discussion questions to explore authorization, scope and third-party systems."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you hired someone to test whether a burglar could get into your home, what would you want agreed in writing before they started?",
  "activity": {
   "title": "Write the rules of engagement",
   "materials": "Printed scenario for a fictional regional credit union wanting a test of its online banking portal; blank RoE template with headings; printed set of eight test-description cards; whiteboard.",
   "steps": [
    "In groups of three, students read the scenario and fill out the RoE template: authorizing official, scope in and out (the portal is in; the third-party card processor is out), testing window, permitted and forbidden techniques, emergency contact, stop procedure, data handling and critical-finding reporting.",
    "Each group swaps its RoE with another group, which looks for missing items or ambiguous scope and writes two questions in the margin.",
    "Groups then sort the eight test-description cards onto the whiteboard grid by knowledge level (black, gray, white) and defender awareness (announced, blind, double-blind).",
    "Groups classify three short scan results as true positive, false positive or false negative using a provided answer key of actual system versions.",
    "The class reviews the grid together and corrects misplaced cards."
   ]
  },
  "discussion": [
   "Why can identical technical actions be legal in one case and a crime in another?",
   "When would you choose a white-box test over a black-box test, even though black box seems more realistic?",
   "If your application runs on a cloud provider's infrastructure, what extra permissions or policies must you check before testing?"
  ],
  "exit": [
   [
    "What is the single most important requirement before a penetration test begins?",
    "Written authorization from someone with authority over the systems, along with agreed rules of engagement."
   ],
   [
    "Testers are given source code and network diagrams. What knowledge level is this?",
    "White box (full knowledge)."
   ],
   [
    "A scanner fails to report a vulnerability that is really present. What is this called and why is it dangerous?",
    "A false negative; it creates false confidence that the system is secure."
   ]
  ],
  "differentiation": [
   "Support: Provide a completed sample RoE for a different scenario so students can model their own on it, and a word bank for knowledge levels.",
   "Extend: Ask fast finishers to compare red, blue and purple team exercises and argue which would most improve detection for a small security team."
  ]
 },
 {
  "t": "Log reviews, synthetic transactions and breach and attack simulation",
  "objectives": [
   "Students will be able to explain the role of a SIEM, clipping levels and statistical sampling in log review.",
   "Students will be able to distinguish synthetic transactions from real user monitoring.",
   "Students will be able to describe how breach and attack simulation validates detection and how it differs from penetration testing.",
   "Students will be able to interpret a quiet log period and decide whether it signals safety or a monitoring failure."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the smoke alarm warm-up question and collect answers. Draw out the idea that silence is not proof."
   ],
   [
    13,
    "Teach",
    "Explain SIEM centralization, high-value review targets, statistical sampling and clipping levels with a failed-login example. Contrast synthetic transactions with RUM. Describe BAS and its mapping to MITRE ATT&CK, and why it complements human testing."
   ],
   [
    17,
    "Activity",
    "Pairs analyze a printed log-volume chart and a set of monitoring scenarios."
   ],
   [
    6,
    "Discuss",
    "Use the discussion questions to explore clipping level trade-offs and running simulations in production."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your smoke alarm has been silent for a year. How do you know whether that means no fires or a dead battery? What would you do to find out?",
  "activity": {
   "title": "Is it quiet or is it broken?",
   "materials": "Printed chart of daily event counts from six fictional log sources over 14 days (one source drops to near zero on day 10); printed failed-login excerpt; eight scenario cards; whiteboard.",
   "steps": [
    "In pairs, students study the event-count chart and identify the anomaly. They write two possible causes and the first action they would take.",
    "Using the failed-login excerpt, pairs propose a clipping level (for example, alert at five failures in five minutes) and then identify which events in the excerpt would be hidden by a much higher threshold.",
    "Pairs sort eight scenario cards into log review, synthetic transaction, real user monitoring or BAS, writing a one-line reason on each.",
    "Pairs design one synthetic transaction for a fictional school portal that checks a security control, stating its steps, schedule and what result would trigger an alert.",
    "Two pairs share their synthetic transaction designs with the class for feedback."
   ]
  },
  "discussion": [
   "How would you choose a clipping level that reduces noise without hiding a slow attack?",
   "What risks come with running breach and attack simulation in production, and how should they be managed?",
   "What metrics from these techniques would be most meaningful to a board of directors?"
  ],
  "exit": [
   [
    "What is the difference between synthetic transactions and real user monitoring?",
    "Synthetic transactions are scripted and scheduled and run even without users; RUM passively observes real users."
   ],
   [
    "What is a clipping level and what is its risk?",
    "A threshold below which events are not flagged; if set too high, real attacks can hide below it."
   ],
   [
    "A log source that normally sends thousands of events a day sends none. What should you suspect?",
    "A failed, misconfigured or tampered log source, leaving activity unmonitored."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page glossary card with SIEM, clipping level, statistical sampling, synthetic transaction, RUM and BAS, each with a short example, for students to use during sorting.",
   "Extend: Ask fast finishers to choose three MITRE ATT&CK tactics and describe what a BAS test for each would check and what log evidence a successful detection should produce."
  ]
 },
 {
  "t": "Code review and testing: static, dynamic, fuzzing, misuse case, test coverage, interface testing",
  "objectives": [
   "Students will be able to compare static and dynamic testing in timing, required inputs and type of findings.",
   "Students will be able to explain fuzzing and distinguish mutation from generation fuzzing.",
   "Students will be able to write a misuse case for a given feature.",
   "Students will be able to explain why test coverage does not equal security and select the right technique for a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the recipe warm-up question and map answers to proofreading (static) and tasting (dynamic)."
   ],
   [
    13,
    "Teach",
    "Build a comparison table on the whiteboard: code review, SAST, DAST, fuzzing, misuse cases, coverage, interface testing. Columns: needs running code, needs source, finds what, when in SDLC. Briefly describe Fagan inspection roles."
   ],
   [
    17,
    "Activity",
    "Groups write misuse cases for a feature and match techniques to scenario cards."
   ],
   [
    6,
    "Discuss",
    "Use the discussion questions to explore layering and the limits of automation."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Before serving a new dish, you can proofread the recipe or taste the food. What mistakes can each one catch that the other cannot?",
  "activity": {
   "title": "Think like an abuser, then pick the tool",
   "materials": "Printed one-page description of a fictional online gift card store (buy card, apply coupon, transfer balance, refund); sticky notes; eight printed scenario cards; whiteboard.",
   "steps": [
    "In groups of three, students read the gift card store description and write the normal use case for one feature on a sticky note.",
    "Each group writes at least three misuse cases for that feature, such as transferring a negative balance or applying a coupon twice in parallel, and states the expected secure behavior.",
    "Groups post their misuse cases on the board under the feature name; the class votes on the most dangerous one.",
    "Groups match eight scenario cards (no source code available, early in development, malformed file input, percentage of branches tested, partner API token checks and others) to the correct technique, writing one reason each.",
    "The teacher reveals answers and asks groups to explain any card they matched differently."
   ]
  },
  "discussion": [
   "If you could afford only two testing techniques for a payment feature, which would you choose and why?",
   "Why do developers sometimes ignore SAST results, and how would you keep the tool useful?",
   "What kinds of flaws can only a human reviewer or a misuse case reveal?"
  ],
  "exit": [
   [
    "Name one advantage of SAST over DAST and one advantage of DAST over SAST.",
    "SAST can run early without a running build and points to the exact line; DAST tests the running application from an attacker's view and needs no source code."
   ],
   [
    "What does fuzzing look for, and is it static or dynamic?",
    "Crashes, hangs and errors caused by malformed input; it is dynamic."
   ],
   [
    "Why is 95 percent coverage not proof of security?",
    "It measures how much code ran, not whether tests checked for security flaws."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed comparison table with the needs running code column filled in, and two example misuse cases as models.",
   "Extend: Ask fast finishers to explain the difference between statement and branch coverage with a short pseudo-code example, and to propose where each technique should run in a build pipeline."
  ]
 },
 {
  "t": "Compliance checks",
  "objectives": [
   "Students will be able to explain why compliance is necessary but not sufficient for security.",
   "Students will be able to distinguish technical configuration compliance checks from procedural compliance checks and give an example of each.",
   "Students will be able to describe the role of SCAP, its XCCDF and OVAL components, and CSPM tools.",
   "Students will be able to build a simple control matrix and handle an unmet requirement through compensating controls and formal risk acceptance."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the driving test warm-up question and list answers. Connect them to compliance versus security."
   ],
   [
    12,
    "Teach",
    "Explain the sources of requirements, compliance versus security, automated configuration scans against baselines, SCAP components, CSPM, procedural checks with sampling, control matrices and the exception path."
   ],
   [
    18,
    "Activity",
    "Groups build a mini control matrix and handle an exception."
   ],
   [
    6,
    "Discuss",
    "Use the discussion questions to probe the compliance versus security distinction."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Passing a driving test proves you met the requirements on one day. Does it prove you are a safe driver? What else would you want to know?",
  "activity": {
   "title": "Build the control matrix",
   "materials": "Printed list of six fictional requirements (for example: strong TLS, audit logging enabled, annual security training, approved changes, quarterly access reviews, no public storage); printed evidence packet with a scan report excerpt, training roster, change log and cloud configuration summary; blank matrix template; whiteboard.",
   "steps": [
    "In groups of three, students fill in the matrix for each requirement: control, owner, evidence source, check type (technical or procedural) and frequency.",
    "Groups review the evidence packet and mark each requirement pass or fail, citing the specific evidence line.",
    "For one failing requirement that cannot be fixed quickly, groups write a short exception request: gap, risk, compensating control, approving authority and expiry date.",
    "Groups identify which requirements could be checked continuously with automation (SCAP scanning or CSPM) and which need sampling.",
    "Each group shares its exception request; the class judges whether the approving authority is appropriate."
   ]
  },
  "discussion": [
   "Can you think of a situation where an organization is secure in practice but noncompliant? What should it do?",
   "Why does mapping one control to several frameworks save effort, and what risk does it carry?",
   "Who in an organization should be allowed to accept the risk of an unmet compliance requirement?"
  ],
  "exit": [
   [
    "Why is compliance described as a floor, not a ceiling?",
    "Requirements set a minimum and may not cover all threats, so risk management must go beyond them."
   ],
   [
    "What does a configuration compliance scan compare systems against?",
    "An approved baseline or benchmark, such as CIS Benchmarks or an internal hardening standard."
   ],
   [
    "What four steps apply when a requirement cannot be met?",
    "Document the gap, assess the risk, apply compensating controls, and obtain formal risk acceptance from an empowered authority."
   ]
  ],
  "differentiation": [
   "Support: Provide a matrix with the control and owner columns already filled for three requirements, so students focus on evidence and check type.",
   "Extend: Ask fast finishers to map two of the requirements to a second framework of their choice and explain where the two frameworks' wording differs."
  ]
 },
 {
  "t": "Collecting security process data: account management, management review, KPIs and KRIs, backup verification, training, DR/BC",
  "objectives": [
   "Students will be able to distinguish KPIs from KRIs and classify example metrics correctly.",
   "Students will be able to identify the strongest evidence for account management, backup, training and DR/BC processes.",
   "Students will be able to explain why management review records demonstrate due care.",
   "Students will be able to rewrite raw technical counts as trended, business-focused metrics for leadership."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the car dashboard warm-up question and sort student answers into performance and warning signs."
   ],
   [
    12,
    "Teach",
    "Walk through each process area with one weak and one strong piece of evidence: account management, management review, KPIs and KRIs, backup verification, training and DR/BC. Define RTO and RPO briefly."
   ],
   [
    18,
    "Activity",
    "Groups sort metric cards and rewrite a weak executive report."
   ],
   [
    6,
    "Discuss",
    "Use the discussion questions to explore what leaders really need from metrics."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "On a car dashboard, which gauges tell you how well you have been driving, and which warn you that trouble is coming? Why do you need both?",
  "activity": {
   "title": "Fix the board report",
   "materials": "Printed set of 14 metric cards (mix of KPIs, KRIs and weak vanity metrics); printed one-page fictional quarterly security report full of raw counts; whiteboard divided into KPI, KRI and Weak evidence columns; sticky notes.",
   "steps": [
    "In groups of three, students sort the 14 metric cards onto the whiteboard columns: KPI, KRI or Weak evidence.",
    "For each weak evidence card (such as backup jobs succeeded or 100 percent attendance), groups write a stronger replacement on a sticky note (such as test restore within RTO or phishing report rate trend).",
    "Groups read the fictional quarterly report and rewrite three of its lines as trended metrics with a target or threshold, in business language.",
    "Groups add one line describing what management review evidence should be recorded after the report is presented.",
    "Two groups read their rewritten report lines aloud and the class gives feedback on clarity for a non-technical board."
   ]
  },
  "discussion": [
   "Why might a security team prefer to report impressive raw numbers, and what harm does that cause?",
   "How would you choose a threshold for a KRI so that it triggers escalation at the right time?",
   "What should happen when a metric is collected every quarter but nobody acts on it?"
  ],
  "exit": [
   [
    "Classify this metric: percentage of critical patches applied within 14 days compared with a 95 percent target.",
    "A KPI, because it measures performance against a defined goal."
   ],
   [
    "What is the best evidence that backups are effective?",
    "A documented, successful test restore within the recovery time objective."
   ],
   [
    "What records show that leadership is governing security?",
    "Management review evidence such as steering committee minutes, signed risk acceptances, policy approvals and assigned actions."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference card with one clear KPI and one clear KRI example and the phrases \"against a goal\" and \"early warning\" to guide their sorting.",
   "Extend: Ask fast finishers to design a one-page dashboard for a board with no more than six metrics, pairing each KPI with a related KRI and stating its threshold."
  ]
 },
 {
  "t": "Analyzing test output and generating reports; exception handling and remediation",
  "objectives": [
   "Students will be able to validate and prioritize findings using business context in addition to CVSS scores.",
   "Students will be able to identify root causes behind groups of related findings.",
   "Students will be able to structure a report with an executive summary and technical findings for different audiences.",
   "Students will be able to evaluate an exception request for required elements and appropriate approval authority."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about emergency room triage and connect it to prioritization by context."
   ],
   [
    12,
    "Teach",
    "Walk through the pipeline on the whiteboard: validate, prioritize, find root causes, report, remediate, retest, or raise an exception. Show how CVSS combines with asset criticality and exploitation. List the four elements of an exception and who approves it."
   ],
   [
    18,
    "Activity",
    "Groups triage a findings list, write an executive summary and judge exception requests."
   ],
   [
    6,
    "Discuss",
    "Use the discussion questions to explore accountability and report sensitivity."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "In an emergency room, why might a patient with a lower-looking number on their chart be treated before someone with a higher one? What else does the doctor consider?",
  "activity": {
   "title": "Triage, report, decide",
   "materials": "Printed list of 15 fictional findings with CVSS scores, asset names, exposure (internet-facing or internal) and exploitation status, including two false positives marked by a provided host inventory; printed asset criticality list; two printed exception requests (one complete, one flawed); whiteboard.",
   "steps": [
    "In groups of three, students use the host inventory to remove false positives, then rank the remaining findings by business risk using CVSS, criticality, exposure and exploitation.",
    "Groups look for a pattern that suggests a root cause (for example, several findings from the same outdated server build) and write it down.",
    "Each group writes a five-sentence executive summary for leadership: overall risk, top three findings, root cause and decisions needed.",
    "Groups review the two exception requests and list what is missing or wrong in each, including who should approve.",
    "Groups share their top three rankings; the class discusses any differences and the reasons behind them."
   ]
  },
  "discussion": [
   "Why might a security team be tempted to approve exceptions itself, and why is that a problem?",
   "How should the length of an exception be decided, and what should happen when it expires?",
   "What would you do if a business owner refused to either fix a critical finding or sign an exception?"
  ],
  "exit": [
   [
    "Name two factors besides the CVSS score that should influence prioritization.",
    "Examples: asset criticality, internet exposure, known active exploitation, compensating controls or data sensitivity."
   ],
   [
    "How do you confirm that a finding has been remediated?",
    "Retest or rescan to verify it no longer exists."
   ],
   [
    "Who should approve a risk exception, and what must it include?",
    "Someone with authority to accept the risk, not the requester; it must include the issue, business justification, compensating controls and an expiry date."
   ]
  ],
  "differentiation": [
   "Support: Provide a simple scoring grid that adds points for internet exposure, active exploitation and high asset criticality to the CVSS band, so students can rank findings step by step.",
   "Extend: Ask fast finishers to draft a remediation service-level policy with different deadlines by risk level and explain how they would handle findings that miss their deadline."
  ]
 },
 {
  "t": "Conducting or facilitating security audits: SOC 1/SOC 2/SOC 3, Type I vs Type II",
  "objectives": [
   "Students will be able to match SOC 1, SOC 2 and SOC 3 to their purpose and audience.",
   "Students will be able to contrast Type I and Type II reports and explain why Type II gives more assurance.",
   "Students will be able to name the five Trust Services Criteria and identify which is always included.",
   "Students will be able to review a SOC 2 excerpt for period, scope, opinion, exceptions, CUECs and carve-outs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the restaurant inspection warm-up question and connect one visit versus repeated visits to Type I versus Type II."
   ],
   [
    12,
    "Teach",
    "Build a grid on the whiteboard: rows SOC 1, SOC 2, SOC 3; columns purpose, audience, detail level. Add a Type I versus Type II comparison. List the Trust Services Criteria with the memory aid. Explain CUECs and carve-outs."
   ],
   [
    18,
    "Activity",
    "Groups match needs to reports and review a mock SOC 2 excerpt."
   ],
   [
    6,
    "Discuss",
    "Use the discussion questions to connect report choice to accountability."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Would you trust a restaurant more if an inspector visited once and found everything set up correctly, or visited several times over six months and saw staff following the rules each time? Why?",
  "activity": {
   "title": "Which report, and what does it say?",
   "materials": "Eight printed need cards (for example: financial statement auditor needs assurance about payroll; marketing page badge; evaluate SaaS security; startup's first audit); a two-page mock SOC 2 Type II excerpt written by the teacher with a report period, scope, an unqualified opinion, two exceptions, a CUEC list and a carve-out note; whiteboard.",
   "steps": [
    "In pairs, students match each need card to SOC 1, SOC 2 or SOC 3 and to Type I or Type II where relevant, writing one reason per card.",
    "Pairs read the mock SOC 2 excerpt and record: the report period, the Trust Services Criteria in scope, the opinion type, each exception and management's response.",
    "Pairs list every CUEC and write which team in their own organization would be responsible for it.",
    "Pairs identify the carved-out subservice organization and state what additional evidence they would request.",
    "Pairs write a three-sentence recommendation to procurement on whether the vendor's assurance is sufficient, and share with another pair."
   ]
  },
  "discussion": [
   "If a vendor has only a Type I report, under what conditions would you still sign a contract?",
   "Why does outsourcing a service not outsource accountability for it?",
   "What risks remain even after you receive a clean SOC 2 Type II?"
  ],
  "exit": [
   [
    "Which SOC report addresses controls relevant to a customer's financial reporting?",
    "SOC 1."
   ],
   [
    "What is the difference between Type I and Type II?",
    "Type I evaluates control design at a point in time; Type II evaluates design and operating effectiveness over a period."
   ],
   [
    "What are CUECs and why do they matter?",
    "Complementary user entity controls are controls the customer must operate; if the customer does not perform them, the provider's controls may not be effective."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page reference card summarizing SOC 1, 2 and 3 and Type I and II in a table, and highlight the sections of the mock excerpt students should read first.",
   "Extend: Ask fast finishers to explain how a bridge letter is used when a SOC report period ended several months ago, and what limits it has as evidence."
  ]
 },
 {
  "t": "Location of audits: on premises, cloud, hybrid",
  "objectives": [
   "Students will be able to explain how the shared responsibility model divides audit scope across IaaS, PaaS and SaaS.",
   "Students will be able to identify appropriate evidence sources for on-premises, cloud provider and cloud customer controls.",
   "Students will be able to recognize audit gaps at hybrid seams such as identity synchronization and log collection.",
   "Students will be able to explain why data residency and right-to-audit clauses matter in cloud audits."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the storage unit warm-up question and record what students could and could not inspect themselves."
   ],
   [
    12,
    "Teach",
    "Draw a stacked diagram (facility, hardware, virtualization, operating system, application, data, identities) with three columns for IaaS, PaaS and SaaS, shading the provider's part. Explain attestations, CSPM, right-to-audit clauses, data residency and hybrid seams."
   ],
   [
    18,
    "Activity",
    "Groups build an audit evidence map for a fictional hybrid company."
   ],
   [
    6,
    "Discuss",
    "Use the discussion questions to explore accountability and evidence limits."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you rent a storage unit, which parts of its security can you check yourself and which do you have to trust? What would make you trust the parts you cannot see?",
  "activity": {
   "title": "Map the evidence",
   "materials": "Printed profile of a fictional company with one on-premises system, one SaaS application and one IaaS workload, plus a directory synchronized to the cloud; blank evidence map with columns for control, location, who operates it, evidence source; 12 printed control cards (physical access, OS patching, user access reviews, encryption keys, storage permissions, log collection, leaver deprovisioning and others); whiteboard.",
   "steps": [
    "In groups of three, students place each control card on the evidence map for each relevant system, recording who operates the control (customer or provider) under that service model.",
    "For every control, groups name the evidence source: direct inspection, provider attestation, console or API review, CSPM report, or contract clause.",
    "Groups identify at least two hybrid seams in the company profile and describe a test for each, such as sampling leavers against cloud sign-in logs.",
    "Groups note one data residency question they would ask and where the answer would be found.",
    "Groups compare maps with a neighbor and resolve any control assigned to different owners, using the shared responsibility diagram on the board."
   ]
  },
  "discussion": [
   "Why do large cloud providers refuse on-site audits by individual customers, and is that a reasonable position?",
   "How should an organization respond if a provider's SOC 2 report does not cover a service it uses?",
   "What makes the connections in a hybrid environment harder to audit than either side alone?"
  ],
  "exit": [
   [
    "How does a customer gain assurance about a large cloud provider's physical controls?",
    "Through third-party attestations such as SOC 2 Type II reports or ISO/IEC 27001 certification."
   ],
   [
    "A storage bucket in the customer's cloud account is publicly readable. Whose responsibility is that under the shared responsibility model?",
    "The customer's, because configuration of its own resources and data access is the customer's side of the model."
   ],
   [
    "Give one example of a hybrid seam an auditor should test.",
    "Identity synchronization or federation, such as checking that cloud sessions end when an on-premises account is disabled; other examples are log collection gaps or data flows over VPN links."
   ]
  ],
  "differentiation": [
   "Support: Provide a pre-shaded shared responsibility diagram and a list of evidence sources with one example each, so students can focus on matching controls.",
   "Extend: Ask fast finishers to draft a right-to-audit clause for a small SaaS vendor contract, stating what evidence the vendor must provide and how often."
  ]
 },
 {
  "t": "Investigations: evidence collection and handling, chain of custody, digital forensics tools and techniques",
  "objectives": [
   "Students will be able to sequence evidence collection from a running system according to the order of volatility.",
   "Students will be able to explain how write blockers, hashing and chain of custody protect evidence integrity and admissibility.",
   "Students will be able to compare the standards of proof for administrative, civil, criminal and regulatory investigations.",
   "Students will be able to distinguish entrapment from enticement in a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question. Collect a few answers and write 'turn it off', 'look at the files' and 'call someone' on the board without judging them yet."
   ],
   [
    13,
    "Teach",
    "Explain the four evidence requirements and the evidence types, then the standards of proof. Draw the order of volatility as a staircase from registers and memory down to archived media. Show how a write blocker and matching hashes prove an image is unaltered, and display a blank chain of custody form."
   ],
   [
    15,
    "Activity",
    "Run the evidence handling relay described below. Circulate and ask each group which data would be lost if their steps were reversed."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions. Revisit the warm-up board and label each original answer as safe or unsafe for admissibility."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand it in at the door."
   ]
  ],
  "warmup": "Your manager suspects a coworker of stealing customer data and wants to open the coworker's laptop right now to check. What could go wrong if the case later ends up in court?",
  "activity": {
   "title": "Evidence handling relay",
   "materials": "Printed action cards (capture memory, photograph screen, isolate from network, image disk with write blocker, hash original and image, bag and label, sign custody form, notify legal counsel, power off), printed blank chain of custody forms, envelopes to act as evidence bags, whiteboard.",
   "steps": [
    "Put students in groups of four and give each group a shuffled set of action cards describing a workstation caught sending archives to an unknown site.",
    "Groups place the cards in the order they would perform them, then justify any card they would skip or delay, such as powering off.",
    "Each group fills in a chain of custody form as the 'laptop' envelope passes between members playing responder, analyst and evidence custodian, signing and timing every handoff.",
    "The teacher secretly removes one signature row from one group's form, and another group must spot the gap and explain how opposing counsel would use it."
   ]
  },
  "discussion": [
   "When might isolating a system be better than leaving it connected to watch the attacker, and who should make that call?",
   "Why does involving legal counsel early help even if the matter never goes to court?",
   "How would you handle evidence that lives only in a cloud provider's systems?"
  ],
  "exit": [
   [
    "Put these in collection order: disk image, memory, archived backup tapes.",
    "Memory first, then the disk image, then archived backup tapes, following the order of volatility."
   ],
   [
    "What two things together prove a forensic image is an unaltered copy?",
    "Imaging through a write blocker so the original is not changed, and matching cryptographic hashes of the original and the image."
   ],
   [
    "A police officer persuades a reluctant person to break into a system so they can arrest them. Entrapment or enticement?",
    "Entrapment, because the person was induced to commit a crime they would not otherwise have committed."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference card showing the order of volatility as a staircase and a one-line purpose for each tool (write blocker prevents changes, hash proves a match, custody form shows who handled it).",
   "Extend: Ask fast finishers to write the collection plan for a compromised cloud virtual machine, explaining which evidence they can capture themselves and which requires provider logs or cooperation."
  ]
 },
 {
  "t": "Logging and monitoring: SIEM, SOAR, continuous monitoring, UEBA, threat intelligence and hunting",
  "objectives": [
   "Students will be able to explain how a SIEM collects, normalizes and correlates events, and why time synchronization and tuning matter.",
   "Students will be able to compare the roles of SIEM, SOAR and UEBA in detection and response.",
   "Students will be able to distinguish threat hunting from alert-driven monitoring and describe the hunting cycle.",
   "Students will be able to classify threat intelligence as strategic, operational, tactical or technical."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and tally answers on the board. Point out that 'more alerts' is rarely the fix."
   ],
   [
    12,
    "Teach",
    "Draw a pipeline on the whiteboard: log sources, SIEM (normalize, store, correlate), SOAR playbooks, analyst. Add UEBA as a side feed and threat hunting as a loop that produces new rules. Explain continuous monitoring and the four intelligence levels with one example each."
   ],
   [
    15,
    "Activity",
    "Run the log correlation desk exercise below. Circulate and ask groups which single log would have looked harmless on its own."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions, then have each group name the tool that best fits each clue in a quick round of exam-style prompts."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Your security team receives 2,000 alerts a day and can investigate about 50. What would you change first, and why?",
  "activity": {
   "title": "Log correlation desk",
   "materials": "Printed log excerpt cards from four fictional sources (firewall, directory sign-ins, endpoint, file server) with timestamps, one source card with a skewed clock, sticky notes, whiteboard.",
   "steps": [
    "Give each group of three a shuffled stack of about 20 log cards covering one evening at a fictional company, most of them routine.",
    "Groups act as the SIEM: they normalize the cards by user and time, lay them on a timeline, and write a correlation rule on a sticky note that would have caught the suspicious pattern.",
    "Reveal that one source's clock was 40 minutes slow; groups adjust and discuss how the false timeline would have misled them.",
    "Groups write a three-step SOAR playbook for their rule and mark which step needs human approval, then write one hunting hypothesis the story suggests."
   ]
  },
  "discussion": [
   "Which response actions should a SOAR playbook never take without a human approving them, and why?",
   "How could UEBA produce false positives during a company reorganization, and how would you handle them?",
   "Why would an attacker target the logging system, and how do you protect it?"
  ],
  "exit": [
   [
    "A tool must automatically quarantine phishing emails across all mailboxes. SIEM or SOAR?",
    "SOAR, because it orchestrates and automates response actions through playbooks."
   ],
   [
    "What is the starting point of a threat hunt?",
    "A hypothesis about attacker activity, often drawn from threat intelligence or a known technique, not an alert."
   ],
   [
    "A list of malicious file hashes and domains is which level of threat intelligence?",
    "Technical intelligence, made up of indicators of compromise."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column clue card mapping phrases such as 'correlate', 'playbook', 'baseline' and 'hypothesis' to SIEM, SOAR, UEBA and threat hunting.",
   "Extend: Ask fast finishers to design a tuning plan for a noisy rule, including what data they would review, who approves the change and how they would confirm real attacks are still detected."
  ]
 },
 {
  "t": "Configuration management: provisioning, baselining, automation",
  "objectives": [
   "Students will be able to explain the role of inventory, configuration items and a CMDB in configuration management.",
   "Students will be able to describe how golden images and infrastructure as code support secure provisioning.",
   "Students will be able to use a baseline to identify configuration drift and choose an appropriate response.",
   "Students will be able to distinguish configuration management from change management."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect two or three answers about how a chain keeps stores consistent."
   ],
   [
    12,
    "Teach",
    "Walk through the CM cycle on the board: inventory, baseline, golden image, provision, scan, detect drift, investigate, update through change management. Show a short fictional baseline table and explain immutable infrastructure and securing the automation platform."
   ],
   [
    15,
    "Activity",
    "Run the drift detective exercise below. Circulate and challenge groups that want to revert changes without asking why."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions and have groups share which drift item they rated most suspicious."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "A coffee chain wants every store to make the same drink the same way. What would they need to write down, and how would they check that stores follow it?",
  "activity": {
   "title": "Drift detective",
   "materials": "Printed baseline sheet for a fictional web server (about 12 settings), printed scan results for five servers with several differences, printed list of approved change tickets, highlighters, whiteboard.",
   "steps": [
    "Give each pair the baseline, the five scan results and the change ticket list.",
    "Pairs highlight every setting that differs from the baseline, then check each difference against the change tickets.",
    "For each unexplained difference, pairs decide whether it looks like a process lapse or a possible intrusion and write the next action: investigate as an incident, codify through change management, or restore.",
    "Pairs then propose one update to the baseline or golden image that would have prevented the most common difference, and note who would need to approve it."
   ]
  },
  "discussion": [
   "What are the risks of allowing automation to correct drift without a person reviewing it?",
   "Why might an attacker target the configuration automation server, and how should it be protected?",
   "When is a documented exception to a benchmark setting the right decision?"
  ],
  "exit": [
   [
    "What is configuration drift?",
    "Divergence of a system's actual configuration from its approved baseline, whether accidental or malicious."
   ],
   [
    "A new local administrator account appears with no change ticket. What should happen first?",
    "Investigate it as a possible security incident before restoring the approved configuration."
   ],
   [
    "Which approach replaces servers from an updated image instead of patching them in place?",
    "Immutable infrastructure."
   ]
  ],
  "differentiation": [
   "Support: Provide a flowchart card: Does it match the baseline? If not, is there an approved change? If not, treat it as a possible incident.",
   "Extend: Ask fast finishers to write a short policy-as-code rule in plain language that would block an IaC template exposing an administrative port, and explain where in the pipeline it should run."
  ]
 },
 {
  "t": "Foundational operations concepts: need to know, least privilege, separation of duties, job rotation, SLAs",
  "objectives": [
   "Students will be able to distinguish need to know from least privilege using workplace examples.",
   "Students will be able to identify separation of duties failures and explain how collusion defeats them.",
   "Students will be able to classify job rotation, mandatory vacations and separation of duties as detective or preventive.",
   "Students will be able to describe the purpose of SLAs and OLAs and the security terms they should contain."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student ideas on the board, grouping them as 'stop it' or 'catch it'."
   ],
   [
    12,
    "Teach",
    "Define each principle with one workplace example. Draw a two-column chart labeled Preventive and Detective and place separation of duties, least privilege, job rotation, mandatory vacation and monitoring. Explain SLAs, OLAs and MOUs with a cloud provider example."
   ],
   [
    15,
    "Activity",
    "Run the principle match card game below. Circulate and press groups on whether each control prevents or detects."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions, ending with the question of how to apply these principles in a very small organization."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "A small charity has one volunteer who collects donations, deposits them and keeps the books. What could go wrong, and how would you fix it without hiring anyone?",
  "activity": {
   "title": "Principle match",
   "materials": "Printed scenario cards (about 12 short workplace situations), printed principle cards (need to know, least privilege, separation of duties, collusion, job rotation, mandatory vacation, privilege creep, SLA), whiteboard.",
   "steps": [
    "Give groups of three a set of scenario cards and principle cards.",
    "Groups match each scenario to the principle it shows being followed or violated, for example a clerk who can create and pay vendors, or two tellers who cooperate to skim cash.",
    "For each violation, groups write one corrective control and label it preventive or detective.",
    "Groups pick one SLA scenario card and list three security terms they would add to that contract before signing."
   ]
  },
  "discussion": [
   "How can a small team with only three IT staff apply separation of duties realistically?",
   "Why might strong employees resist mandatory vacations, and how should managers respond?",
   "What should a customer do if its own monitoring shows a provider missed an SLA but the provider disagrees?"
  ],
  "exit": [
   [
    "An analyst with a top-level clearance is denied access to files from a project she is not assigned to. Which principle applies?",
    "Need to know, because access to specific information depends on current duties, not clearance alone."
   ],
   [
    "Two employees work together to bypass a dual-approval control. What is this called?",
    "Collusion."
   ],
   [
    "Is a mandatory vacation mainly a preventive or a detective control?",
    "Detective, because a stand-in performing the duties may uncover hidden fraud."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-line memory card for each principle: need to know limits information, least privilege limits rights, separation of duties splits a task, rotation and vacations catch fraud.",
   "Extend: Ask fast finishers to design an access review process for a company of 500 people, including who reviews, how often and what happens to rights nobody confirms."
  ]
 },
 {
  "t": "Resource protection: media management, backups",
  "objectives": [
   "Students will be able to explain data remanence and why deletion and formatting do not remove data.",
   "Students will be able to select clearing, purging or destruction based on data sensitivity, media type and destination.",
   "Students will be able to describe media handling controls such as labeling, inventory, encryption and secure transport.",
   "Students will be able to design a backup approach using the 3-2-1 rule with an immutable or offline copy and regular test restores."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and take a quick show of hands on whether deleting files makes them unrecoverable."
   ],
   [
    13,
    "Teach",
    "Explain the media lifecycle and handling controls. Draw a three-step ladder for clearing, purging and destruction with example methods on each rung, and mark which do not apply to SSDs. Then explain RPO, RTO, the 3-2-1 rule, immutable copies, separate backup credentials and test restores."
   ],
   [
    15,
    "Activity",
    "Run the sanitization decision cards exercise below. Circulate and ask groups where each device goes next."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions and connect backup protection to the ransomware example in the lesson."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "You sell your old phone online after deleting your photos and doing a factory reset. Is your data gone? What would make you more confident?",
  "activity": {
   "title": "Sanitization decision cards",
   "materials": "Printed device cards (magnetic hard drive, SSD laptop, backup tape, USB stick, optical disc, printer with internal drive, damaged drive, paper records) each with a data sensitivity and destination, whiteboard with three columns labeled Clear, Purge and Destroy.",
   "steps": [
    "Give each group of three a set of eight device cards.",
    "Groups decide the minimum appropriate sanitization level and a specific method for each card, writing the reason on the back, and flag any card where degaussing would fail.",
    "Each group posts two of its cards in the matching column on the whiteboard and explains one decision to the class.",
    "Groups then sketch a 3-2-1 backup plan for a small office on paper, marking which copy is immutable or offline and how often restores are tested."
   ]
  },
  "discussion": [
   "Why might an organization choose destruction even when purging would technically be enough?",
   "What makes backup systems an attractive target for ransomware operators, and how do you reduce that risk?",
   "Which everyday devices in this building might contain storage media people forget about?"
  ],
  "exit": [
   [
    "Which sanitization level fits drives being reused by another department inside the company?",
    "Clearing, because the media stay within organizational control."
   ],
   [
    "Name one method that does not work on SSDs and one that does.",
    "Degaussing does not work; built-in sanitize commands, cryptographic erase or physical destruction do."
   ],
   [
    "What single practice proves backups can actually be recovered?",
    "Regular test restores."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision flow card: Is the media leaving the organization? If no, clear. If yes, purge. Is it highly sensitive or damaged? Destroy. Is it an SSD? Do not degauss.",
   "Extend: Ask fast finishers to write a one-paragraph media handling procedure for sending backup tapes to an offsite vault, covering labeling, encryption, courier, custody log and retention."
  ]
 },
 {
  "t": "Incident management: detection, response, mitigation, reporting, recovery, remediation, lessons learned",
  "objectives": [
   "Students will be able to distinguish an event from an incident using defined criteria.",
   "Students will be able to sequence the CISSP incident management steps and explain why containment usually comes first after confirmation.",
   "Students will be able to differentiate recovery from remediation in a scenario.",
   "Students will be able to explain who should be involved in reporting and why lessons learned should be blameless."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record the class's proposed first steps on the board."
   ],
   [
    12,
    "Teach",
    "Define event and incident. Write the seven CISSP steps across the board with preparation before them, and map the NIST lifecycle phases underneath. Use the ransomware worked example to label each step, emphasizing containment versus evidence and recovery versus remediation."
   ],
   [
    16,
    "Activity",
    "Run the incident timeline tabletop described below. Inject each new card every three minutes."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions and have each group report one decision they would change."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "You come home and find water pouring from a burst pipe in your kitchen. List the first four things you would do, in order.",
  "activity": {
   "title": "Incident timeline tabletop",
   "materials": "Printed inject cards (initial alert, spread to a second host, regulator deadline reminder, executive asking for immediate restore, root cause clue), printed role cards (incident lead, analyst, legal counsel, communications, business owner), whiteboard for a shared timeline.",
   "steps": [
    "Form groups of five and hand out role cards; each group receives the initial alert card describing files being encrypted on a shared drive.",
    "Groups decide whether it is an incident, assign severity and write their first three actions on the timeline, labeling each with a CISSP step.",
    "The teacher releases new inject cards every few minutes; groups must respond in role, including deciding what to report, to whom, and with whose approval.",
    "Groups finish by writing two remediation actions and one lessons-learned improvement with an owner, then compare timelines with a neighboring group."
   ]
  },
  "discussion": [
   "When might a team deliberately delay containment, and who should approve that decision?",
   "Why should legal counsel guide external notifications rather than the technical team alone?",
   "What makes a lessons-learned meeting productive instead of a blame session?"
  ],
  "exit": [
   [
    "An analyst confirms malware is spreading between hosts. What is the usual next priority?",
    "Containment, such as isolating affected hosts, to limit further damage."
   ],
   [
    "Patching the vulnerability that allowed the attack is which step?",
    "Remediation, because it fixes the root cause."
   ],
   [
    "A user reports a failed login attempt with no other signs. Event or incident?",
    "An event, unless further analysis shows actual or potential harm or a policy violation."
   ]
  ],
  "differentiation": [
   "Support: Give students a step card listing the seven CISSP steps with a one-sentence example for each from the ransomware scenario.",
   "Extend: Ask fast finishers to draft a one-page ransomware playbook outline with decision points, approvers and notification triggers."
  ]
 },
 {
  "t": "Detective and preventive measures: firewalls, IDS/IPS, allow and deny lists, sandboxing, honeypots, anti-malware, ML/AI tools",
  "objectives": [
   "Students will be able to classify firewalls, IDS, IPS, sandboxes, honeypots and anti-malware as preventive, detective or both.",
   "Students will be able to compare signature-based and anomaly-based detection in terms of new attacks and false positives.",
   "Students will be able to explain why allow lists are stronger than deny lists and when each is practical.",
   "Students will be able to recommend a layered set of controls for a scenario while weighing the business impact of false positives."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sort student answers into 'stops it' and 'tells you about it' on the board."
   ],
   [
    12,
    "Teach",
    "Sketch a network on the whiteboard with internet, firewall, DMZ, internal network and endpoints. Place each control where it typically sits, mark inline versus passive, and explain signature versus anomaly detection, allow versus deny lists, sandboxing, honeypots, EDR and the limits of ML and AI."
   ],
   [
    15,
    "Activity",
    "Run the defense layer design activity below. Circulate and ask groups what happens if each inline control produces a false positive."
   ],
   [
    8,
    "Discuss",
    "Groups present their designs; use the discussion questions to compare choices."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A smoke detector and a sprinkler system both deal with fire. What is the difference, and when would you want only one of them?",
  "activity": {
   "title": "Defense layer design",
   "materials": "Printed scenario cards (small medical clinic, online store, water utility control network), printed control cards (packet filter, stateful firewall, NGFW, WAF, NIDS, NIPS, HIDS, allow list, deny list, sandbox, honeypot, EDR, ML-based analytics), large paper or whiteboard space, markers.",
   "steps": [
    "Give each group of three one scenario card and the full set of control cards.",
    "Groups sketch the environment and place the controls they would use, labeling each preventive, detective or both, and marking which sit inline.",
    "For each inline control, groups write the consequence of a false positive and decide whether the risk is acceptable for that environment.",
    "Groups list one attack their design would still miss and the additional layer that would catch it."
   ]
  },
  "discussion": [
   "Why might an organization choose an IDS over an IPS even though the IPS can block attacks?",
   "What would make application allow listing hard to maintain on general office laptops, and how could you manage that?",
   "How should a team decide how much to trust alerts produced by an ML-based tool?"
  ],
  "exit": [
   [
    "Which device sits inline and can block traffic: IDS or IPS?",
    "IPS."
   ],
   [
    "Which detection method is more likely to catch a zero-day attack, and what is its drawback?",
    "Anomaly-based detection; it produces more false positives."
   ],
   [
    "Why is a honeypot an example of enticement rather than entrapment?",
    "It only offers an opportunity to someone already intent on attacking; it does not induce an otherwise unwilling person to commit a crime."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference table listing each control with columns for preventive or detective, inline or passive, and one main weakness.",
   "Extend: Ask fast finishers to explain how an attacker might try to evade a sandbox or poison an ML model, and which complementary controls reduce that risk, without describing specific attack code."
  ]
 },
 {
  "t": "Patch and vulnerability management; change management",
  "objectives": [
   "Students will be able to describe the vulnerability management cycle from inventory through verification.",
   "Students will be able to prioritize vulnerabilities using severity, asset criticality, exposure and active exploitation.",
   "Students will be able to sequence the patch management and change management steps, including emergency changes.",
   "Students will be able to explain why an unauthorized change should be investigated as a possible incident."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list the risks of both patching immediately and waiting."
   ],
   [
    12,
    "Teach",
    "Draw the vulnerability management cycle as a circle on the board. Then draw the change management flow from request to post-implementation review, with branches for standard and emergency changes. Explain why CVSS alone is not enough using two contrasting findings."
   ],
   [
    15,
    "Activity",
    "Run the patch triage board exercise below. Circulate and ask groups to justify their top priority using exposure and exploitation, not just score."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions and have groups compare their top three priorities."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Your phone says a security update is ready, but you have an important video call in ten minutes. Do you install it now, later today or next week? What information would change your answer?",
  "activity": {
   "title": "Patch triage board",
   "materials": "Printed vulnerability cards (about ten findings, each with a severity score, asset description, exposure and an exploitation note), printed blank change request forms, sticky notes, whiteboard divided into Today, This week, Next cycle and Compensating control.",
   "steps": [
    "Give each group of three the vulnerability cards and ask them to place each card in a column on the whiteboard, writing their reasoning on a sticky note.",
    "Each group picks its top-priority finding and fills in a change request form: description, justification, test plan, rollback plan, approver, and whether it is standard, normal or emergency.",
    "For any finding with no patch available, groups choose a compensating control and how they would monitor it.",
    "The teacher reveals one new card describing an unexplained configuration change; groups decide the next step and explain why."
   ]
  },
  "discussion": [
   "What are the risks of an organization that patches very quickly but tests very little, and of one that tests thoroughly but patches slowly?",
   "Which kinds of changes would you pre-approve as standard changes, and why?",
   "How can separation of duties be maintained in a small IT team that handles both development and deployment?"
  ],
  "exit": [
   [
    "What is the first step in vulnerability management?",
    "Building and maintaining an accurate asset inventory."
   ],
   [
    "What must still happen to an emergency change after it is implemented?",
    "It must be fully documented and reviewed, typically by the change advisory board."
   ],
   [
    "Name two factors beyond CVSS score that affect vulnerability priority.",
    "Any two of asset criticality, internet exposure and evidence of active exploitation."
   ]
  ],
  "differentiation": [
   "Support: Provide a priority checklist card: Is it exposed to the internet? Is it being exploited? Is the asset critical? Is there a patch? Use the answers to rank findings.",
   "Extend: Ask fast finishers to design a metrics dashboard for management showing vulnerability program health, choosing three metrics and explaining what decision each supports."
  ]
 },
 {
  "t": "Recovery strategies: backup types, recovery sites, resilience, high availability",
  "objectives": [
   "Students will be able to explain RTO, RPO and MTD and the relationship between RTO and MTD.",
   "Students will be able to determine which backup sets are needed to restore under full, incremental and differential schemes.",
   "Students will be able to select a recovery site type that meets stated objectives at the lowest reasonable cost.",
   "Students will be able to compare RAID levels, clustering and fault tolerance and explain why RAID is not a backup."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record answers about acceptable downtime and lost work."
   ],
   [
    13,
    "Teach",
    "Draw a timeline showing RPO before the disruption and RTO and MTD after it. Draw a week of backups and show restore sets for incremental and differential schemes. List recovery site types on a cost versus speed line. Explain clustering, load balancing and RAID 0, 1, 5 and 6."
   ],
   [
    15,
    "Activity",
    "Run the recovery strategy consultants exercise below. Circulate and ask groups to prove their choice meets the RTO and RPO."
   ],
   [
    7,
    "Discuss",
    "Groups share their recommendations; use the discussion questions to probe cost and risk trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "If your phone broke today, how many days could you manage without it, and how many days of photos could you stand to lose? How would those answers change what you pay for?",
  "activity": {
   "title": "Recovery strategy consultants",
   "materials": "Printed client brief cards (each with a business function, MTD, RTO, RPO and budget level), printed option cards (backup types, recovery site types, replication, RAID levels, clustering), whiteboard, markers.",
   "steps": [
    "Give each group of three a client brief card, such as a payroll service, a small online shop or a hospital records system.",
    "Groups choose a backup scheme, recovery site and availability design from the option cards, and write a one-paragraph justification showing how each meets the RTO and RPO.",
    "The teacher announces a disruption, such as a storage failure on Thursday afternoon; groups list exactly which backup sets they would restore and estimate whether they meet the RTO.",
    "Groups identify one single point of failure remaining in their design and propose the least costly fix."
   ]
  },
  "discussion": [
   "Who should decide the RTO and RPO for a business function, and why not the IT team alone?",
   "When might a cold site still be the right answer for a critical organization?",
   "What risks does cloud-based recovery introduce that a company-owned hot site does not?"
  ],
  "exit": [
   [
    "Full backup Sunday, incrementals Monday through Thursday. What do you restore on Friday?",
    "Sunday's full backup and the Monday, Tuesday, Wednesday and Thursday incrementals, in order."
   ],
   [
    "Which recovery site is cheapest but slowest?",
    "A cold site."
   ],
   [
    "Why is replication not a backup?",
    "It copies deletions, corruption and ransomware encryption to the replica, so it cannot restore data to a clean earlier point."
   ]
  ],
  "differentiation": [
   "Support: Provide a backup restore chart showing a week of full, incremental and differential jobs with the restore sets shaded for each day.",
   "Extend: Ask fast finishers to calculate how a change from nightly to hourly backups affects the RPO and to argue whether the added cost is justified for their client."
  ]
 },
 {
  "t": "Disaster recovery processes and DR plan testing (read-through, walkthrough, simulation, parallel, full interruption)",
  "objectives": [
   "Students will be able to describe the DR process from declaration through return to the primary site.",
   "Students will be able to order the five DR test types by realism and disruption and describe each.",
   "Students will be able to select an appropriate DR test for a stated business constraint.",
   "Students will be able to explain why the least critical functions return to the primary site first and why plans must be updated after tests."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect fire drills to DR testing."
   ],
   [
    12,
    "Teach",
    "Explain declaration, roles, communications, restoration priority and the return to primary. Draw a ladder of the five test types with realism and risk increasing upward, and give one example of what each test can and cannot prove."
   ],
   [
    15,
    "Activity",
    "Run the mini tabletop and test selection exercise below. Act as facilitator, injecting one complication halfway through."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions and have groups share the most important gap their tabletop found."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Your school runs fire drills. What would be the difference between reading the evacuation map, talking through a drill as a class, and actually evacuating the building? What does each one prove?",
  "activity": {
   "title": "Mini tabletop and test selection",
   "materials": "A printed two-page DR plan excerpt for a fictional company with deliberate gaps (outdated contact, unclear declaration authority, plan stored only in the data center), printed scenario card for a data center flood, printed constraint cards, whiteboard.",
   "steps": [
    "In groups of four, students first do a five-minute individual read-through of the plan excerpt, each noting any problems on sticky notes.",
    "The group then runs a tabletop walkthrough of the flood scenario, stepping through declaration, roles, communications and restoration order, and records every gap found.",
    "The teacher injects a complication, such as the DR coordinator being unreachable, and groups decide how the plan handles it.",
    "Each group draws two constraint cards, such as 'cannot risk any production impact' or 'board wants maximum certainty', and chooses the DR test that fits each, with a reason."
   ]
  },
  "discussion": [
   "Why might senior management refuse a full-interruption test, and is that a reasonable decision?",
   "What did the individual read-through catch that the group walkthrough did not, or the reverse?",
   "Where should copies of a DR plan be kept so they are available during a disaster?"
  ],
  "exit": [
   [
    "List the five DR test types from least to most disruptive.",
    "Read-through (checklist), walkthrough (tabletop), simulation, parallel, full interruption."
   ],
   [
    "Which test activates the recovery site while production continues at the primary?",
    "A parallel test."
   ],
   [
    "When returning to the primary site, which functions move first, and why?",
    "The least critical functions, so the restored primary is proven before critical functions are moved back."
   ]
  ],
  "differentiation": [
   "Support: Provide a test ladder card with each test's name, who participates, whether systems are touched, and whether production is affected.",
   "Extend: Ask fast finishers to write a one-year DR test schedule for a mid-size company that justifies which tests run when and what results would trigger a plan update."
  ]
 },
 {
  "t": "Business continuity participation, physical security and personnel safety (travel, duress, emergency management)",
  "objectives": [
   "Students will be able to explain how security operations contribute to business continuity without owning it.",
   "Students will be able to describe layered physical security controls from perimeter to internal zones.",
   "Students will be able to distinguish fail-safe from fail-secure and apply the life-safety-first principle.",
   "Students will be able to recommend personnel safety measures for travel, duress and emergencies."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and note how many students would grab belongings before leaving."
   ],
   [
    12,
    "Teach",
    "Draw concentric rings on the whiteboard for perimeter, building entry, internal zones and sensitive rooms, and place controls in each. Explain fail-safe versus fail-secure, life safety first, travel security, duress codes and occupant emergency plans."
   ],
   [
    15,
    "Activity",
    "Run the facility walk and safety review below. Circulate and challenge any recommendation that trades safety for asset protection."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions and connect the activity back to how security supports continuity after an emergency."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "The fire alarm goes off right now. Your laptop and phone are on the desk. What do you take, and what should you leave? Would your answer change if the laptop held company secrets?",
  "activity": {
   "title": "Facility safety review",
   "materials": "A printed floor plan of a fictional office with a server room, lobby, loading dock and two exits, printed issue cards (propped fire door, fail-secure lock on an exit, no assembly point, tailgating at the dock, executive traveling abroad, receptionist with no duress signal), colored markers.",
   "steps": [
    "In groups of three, students mark the perimeter, entry, internal and sensitive zones on the floor plan and add controls they would place in each.",
    "Groups receive the issue cards and, for each one, write the risk and a fix, labeling whether the fix protects people, assets or both.",
    "Groups decide the lock behavior (fail-safe or fail-secure) for each door on the plan and justify it, making sure every occupied space has safe egress.",
    "Groups write a short plan for the morning after a fire: who activates continuity, and which security controls must be confirmed at the alternate site before systems go live."
   ]
  },
  "discussion": [
   "How can a server room stay secure against intruders while still letting people inside escape in an emergency?",
   "Why do attackers target organizations during crises, and what security controls matter most during recovery?",
   "What should a duress procedure include so that employees remember it under stress?"
  ],
  "exit": [
   [
    "What is always the top priority in an emergency?",
    "Protecting human life and safety."
   ],
   [
    "A server room door must stay locked during a power failure. Fail-safe or fail-secure?",
    "Fail-secure, while still allowing people inside to exit safely."
   ],
   [
    "What device practice suits travel to a high-risk country?",
    "Use loaner devices with minimal, encrypted data and treat them as untrusted on return."
   ]
  ],
  "differentiation": [
   "Support: Give students a priority card: people first, then continuity of critical functions, then assets, with security maintained throughout, plus a one-line definition of fail-safe and fail-secure.",
   "Extend: Ask fast finishers to draft a one-page travel security briefing for staff visiting a high-risk destination, covering before, during and after the trip."
  ]
 },
 {
  "t": "Security in the SDLC: waterfall, agile, DevOps, DevSecOps, scaled agile",
  "objectives": [
   "Students will be able to name the SDLC phases and the security activity that belongs in each.",
   "Students will be able to compare waterfall, spiral, agile, DevOps and scaled agile in terms of how security is integrated.",
   "Students will be able to explain shift left and describe DevSecOps pipeline controls.",
   "Students will be able to recommend security practices for a team using a given methodology."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect estimates of the cost of a late fix versus an early fix."
   ],
   [
    12,
    "Teach",
    "Draw the SDLC phases as a horizontal line and write a security activity under each. Then sketch waterfall as steps, spiral as a loop with risk analysis, agile as repeating sprints, and a CI/CD pipeline with security checks at commit, build, test and deploy. Explain scaled agile release trains."
   ],
   [
    15,
    "Activity",
    "Run the secure pipeline build exercise below. Circulate and ask groups which flaws their pipeline would still miss."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions and compare where groups placed threat modeling."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "You are building a treehouse. Would you rather discover that the main branch cannot hold the weight while drawing the plan, or after the floor is built? How does that apply to software?",
  "activity": {
   "title": "Secure pipeline build",
   "materials": "Printed activity cards (threat modeling, security user story, abuse case, secure coding training, code review, static analysis, dependency scanning, secrets scanning, dynamic testing, container scanning, policy-as-code check, runtime monitoring, secure disposal), large paper with SDLC phases and a CI/CD pipeline drawn across it, tape or sticky notes.",
   "steps": [
    "Give each group of three the activity cards and the large paper.",
    "Groups place each card at the earliest phase or pipeline stage where it fits, and mark which are automated and which need people.",
    "The teacher reads out three flaws (a hard-coded password, a vulnerable third-party library, a broken authorization design); groups identify which card would catch each and how early.",
    "Groups write two security items they would add to a team's definition of done and one security requirement to set at the scaled agile program level."
   ]
  },
  "discussion": [
   "Why can automated tools not replace threat modeling, and when is threat modeling most valuable?",
   "How does the role of the security team change when an organization adopts DevSecOps?",
   "What security risks appear at the disposal phase that teams often forget?"
  ],
  "exit": [
   [
    "When is the most cost-effective time to address a security flaw?",
    "During requirements or design, the earliest phases."
   ],
   [
    "Which model includes risk analysis in every iteration?",
    "The spiral model."
   ],
   [
    "Give two examples of shift-left controls in a DevSecOps pipeline.",
    "Any two of threat modeling in design, secrets scanning on commit, static analysis on pull requests, dependency scanning or policy-as-code checks on templates."
   ]
  ],
  "differentiation": [
   "Support: Provide a matching sheet pairing each methodology with a one-line description and the main way security fits into it.",
   "Extend: Ask fast finishers to write three security user stories and one abuse case for a password reset feature, each with acceptance criteria."
  ]
 },
 {
  "t": "Maturity models: CMM, SAMM; operations, maintenance and change management",
  "objectives": [
   "Students will be able to list the five CMM levels in order and identify an organization's level from a description.",
   "Students will be able to name SAMM's five business functions and contrast prescriptive SAMM with descriptive BSIMM.",
   "Students will be able to describe the steps of a secure software change management process, including regression testing and rollback.",
   "Students will be able to explain why operations and maintenance activities belong in the software security program."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the whiteboard, grouping them into 'depends on people' and 'depends on process'."
   ],
   [
    12,
    "Teach",
    "Draw a five-step staircase and label the CMM levels with a one-line description each. Point out the CMMI naming trap for Managed. Then sketch SAMM's five business functions as columns, explain levels one to three per practice, and contrast SAMM with BSIMM."
   ],
   [
    8,
    "Teach",
    "Walk through a change management flow on the board: request, impact and security analysis, approval, version control, testing with regression, release, rollback. Add the operations tasks that continue after release: monitoring, patching, vulnerability handling, certificate and secret renewal, end of life."
   ],
   [
    12,
    "Activity",
    "Run the 'Place the Team' card sort described below."
   ],
   [
    4,
    "Discuss",
    "Use the discussion questions to debate whether every team should aim for the top level."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand it in at the door."
   ]
  ],
  "warmup": "Think of a group project or job where things went well. Was success because of one person, or because of how the group worked? Would it go just as well next time without that person?",
  "activity": {
   "title": "Place the Team",
   "materials": "Printed scenario cards (10 to 12, each describing a fictional team's practices in two or three sentences), a whiteboard staircase labeled with the five CMM levels, sticky notes or tape.",
   "steps": [
    "Split the class into groups of three or four and give each group three or four scenario cards, such as 'Every team follows the same documented release checklist' or 'A senior developer fixes problems at night and nobody else knows how'.",
    "Groups decide which CMM level each card describes and write one sentence of justification that cites the key clue (individuals, repeatable projects, standardized, measured, continuous improvement).",
    "Each group tapes its cards on the staircase and reads one justification aloud; the class challenges any placement that seems wrong.",
    "Hand out two bonus cards describing a change made without testing and a team tracking SAMM scores; groups name the missing change management steps or the SAMM function involved.",
    "Close by asking each group which single improvement would move one of its teams up a level."
   ]
  },
  "discussion": [
   "Should a small internal application be held to the same maturity target as a public payment service? Why or why not?",
   "What goes wrong in an organization that measures everything (level 4) but never changes its process based on the numbers?",
   "How should emergency changes be handled so speed does not destroy control?"
  ],
  "exit": [
   [
    "List the five CMM levels in order.",
    "Initial, Repeatable, Defined, Managed, Optimizing."
   ],
   [
    "A model that reports what many real organizations actually do is called what, and is it prescriptive or descriptive?",
    "BSIMM, which is descriptive."
   ],
   [
    "Why is regression testing required before releasing a change?",
    "To confirm the change did not break previously working functions, including security controls."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page cheat sheet with each CMM level and a signal phrase (heroics, repeat, standard, metrics, improve), and let them sort only five cards, one per level.",
   "Extend: Ask fast finishers to draft a one-page SAMM improvement plan for a fictional company, choosing two practices, current and target levels, and a justification based on risk."
  ]
 },
 {
  "t": "Integrated product teams and security in the development ecosystem",
  "objectives": [
   "Students will be able to explain what an integrated product team is and why including security early reduces cost and risk.",
   "Students will be able to describe the role of security champions and the support they need.",
   "Students will be able to identify the components of the development ecosystem and give examples of software supply chain attacks.",
   "Students will be able to recommend controls such as SBOMs, contract terms and repository protections for a given ecosystem risk."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the board under 'early' and 'late'."
   ],
   [
    12,
    "Teach",
    "Explain IPTs and their origins, then security champions. Draw the development ecosystem as a chain: developer laptop, IDE, repository, package manager, build server, registry, cloud. Mark where supply chain attacks occur and the control for each link."
   ],
   [
    16,
    "Activity",
    "Run the 'Team Huddle' role-play described below."
   ],
   [
    7,
    "Discuss",
    "Debrief the role-play using the discussion questions, focusing on who owns risk acceptance."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If you were building a treehouse with friends, when would you want the person who knows about safety to join: at the first sketch, or after it is built? What changes depending on the answer?",
  "activity": {
   "title": "Team Huddle",
   "materials": "Printed role cards (developer, tester, operations engineer, product owner, privacy officer, security champion, contractor lead), a one-page fictional product brief for a smart door lock and its mobile app, whiteboard or chart paper, markers.",
   "steps": [
    "Form groups of five to seven and hand out role cards; each card lists that role's priorities and one concern.",
    "Groups read the product brief and hold a ten-minute design kickoff in character, producing a list of at least five security requirements and the role that raised each one.",
    "Each group then draws its development ecosystem as a chain on chart paper and marks two links an attacker might target, with one control for each.",
    "Groups name who in the team can accept residual risk and write it on the paper.",
    "Two groups present briefly; the teacher highlights requirements that would have been costly to add late."
   ]
  },
  "discussion": [
   "What happens when a security champion disagrees with the product owner about a deadline? Who decides?",
   "Why might attackers prefer to target a build server or a popular library instead of the finished application?",
   "Which ecosystem link in your role-play would be hardest to secure, and why?"
  ],
  "exit": [
   [
    "What is the main security advantage of an integrated product team?",
    "Security requirements and risks are addressed from the start, when they are cheapest to fix, rather than at a final review."
   ],
   [
    "Name two parts of the development ecosystem besides the application code.",
    "Any two of: repositories, build systems or CI/CD pipelines, package managers and libraries, container registries, developer workstations and IDEs, cloud services, contractors."
   ],
   [
    "Which artifact helps an organization quickly find every product that uses a newly vulnerable component?",
    "A software bill of materials (SBOM)."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially filled ecosystem chain diagram with the links labeled, so students only need to add one attack and one control per link.",
   "Extend: Ask students to draft the security clauses for the contractor agreement in the role-play, including right to review, remediation timelines and access removal."
  ]
 },
 {
  "t": "Development ecosystem controls: languages, libraries, toolsets, IDE, runtime, CI/CD, SCM, code repositories",
  "objectives": [
   "Students will be able to explain why memory-safe languages reduce certain vulnerability classes and what they do not prevent.",
   "Students will be able to identify library risks such as typosquatting and dependency confusion and select controls including SCA and internal mirrors.",
   "Students will be able to recommend repository and CI/CD controls such as MFA, branch protection, secrets managers, approval gates and artifact signing.",
   "Students will be able to map a described ecosystem risk to the most appropriate control."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up prompt and take quick answers; write each named tool on the board."
   ],
   [
    13,
    "Teach",
    "Walk the ecosystem left to right: language, libraries, IDE and workstation, repository, pipeline, runtime. For each, state the main risk and the main control, using the risk-to-control phrases from the lesson."
   ],
   [
    15,
    "Activity",
    "Run the 'Risk Meets Control' matching game described below."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions; emphasize separation of duties in the pipeline."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "List every tool a developer touches between typing a line of code and that code running for customers. Which one would you attack if you wanted to reach the most customers at once?",
  "activity": {
   "title": "Risk Meets Control",
   "materials": "Two sets of printed cards: 10 risk cards (for example 'cloud key committed to repository', 'malicious IDE extension', 'public package with the same name as an internal one', 'build server tampered') and 10 control cards (SCA, branch protection, secrets manager, artifact signing, internal mirror, extension allow list, and others). Tape and a whiteboard.",
   "steps": [
    "Shuffle and deal risk cards to half the pairs and control cards to the other half.",
    "Students circulate to find their match, then pair up and agree on a one-sentence explanation of why the control fits the risk.",
    "Each pair tapes its match on the whiteboard under the ecosystem layer it belongs to (language, library, IDE, repository, pipeline, runtime).",
    "The teacher reveals two 'wild' risks with no single match, such as a compromised developer account, and asks pairs to combine controls.",
    "Class reviews the board and corrects any mismatches."
   ]
  },
  "discussion": [
   "Why do attackers increasingly target pipelines and libraries rather than production servers?",
   "How would you balance developer speed with mandatory reviews and approval gates?",
   "If a team must use C for firmware, what compensating controls would you require?"
  ],
  "exit": [
   [
    "Which tool finds known vulnerabilities in third-party libraries?",
    "Software composition analysis (SCA)."
   ],
   [
    "Where should pipeline credentials be stored?",
    "In a secrets manager, ideally issuing short-lived credentials, not in code or pipeline files."
   ],
   [
    "Name two controls that stop one developer from merging and deploying code alone.",
    "Branch protection requiring reviewed pull requests and an approval gate for production deployment."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference table listing each ecosystem layer with its main risk, so they focus on choosing controls rather than recalling risks.",
   "Extend: Ask students to write a short pipeline policy for a fictional team that lists required security gates, who approves production releases and how artifacts are verified."
  ]
 },
 {
  "t": "Application security testing: SAST, DAST, SCA, IAST",
  "objectives": [
   "Students will be able to describe how SAST, DAST, SCA and IAST each work and what each examines.",
   "Students will be able to compare the strengths and blind spots of each testing type, including white-box versus black-box.",
   "Students will be able to place each tool at the right stage of a development pipeline.",
   "Students will be able to distinguish IAST from RASP."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up and collect answers, steering toward 'look at plans' versus 'test the real thing'."
   ],
   [
    13,
    "Teach",
    "Draw a pipeline: commit, build, deploy to staging, production. Place SAST and SCA at commit, DAST and IAST at staging, RASP in production. For each, list what it sees, what it misses and an exam signal phrase."
   ],
   [
    15,
    "Activity",
    "Run the 'Which Tool Found It' finding sort described below."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions, focusing on triage and false positives."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you wanted to know whether a new bridge is safe, would you rather check the blueprints, drive a truck across it, or check that the steel came from a supplier without recalls? What does each method miss?",
  "activity": {
   "title": "Which Tool Found It",
   "materials": "Printed cards, each showing a short fictional finding report (for example 'line 88: user input concatenated into SQL query', 'response missing Secure flag on session cookie', 'library version has known critical vulnerability', 'agent confirmed tainted data reached file write in method saveUpload'). A whiteboard with four columns: SAST, DAST, SCA, IAST.",
   "steps": [
    "Give each pair five or six finding cards.",
    "Pairs decide which tool most likely produced each finding and note the clue (line number, HTTP response, component version, agent trace).",
    "Pairs place cards in the columns on the board.",
    "The teacher adds two trick cards, such as a business logic flaw no tool flagged and a finding in code no test exercised, and asks which tools could miss them and why.",
    "Class reviews placements and agrees on one reason each tool needs the others."
   ]
  },
  "discussion": [
   "A SAST tool reports 300 findings and developers start ignoring it. How would you restore trust in the results?",
   "When source code is unavailable, such as with a purchased product, which tools remain and what extra controls might you add?",
   "Should a critical SCA finding always block a release? What factors would change your answer?"
  ],
  "exit": [
   [
    "Which testing type requires no running application and points to exact lines of code?",
    "SAST."
   ],
   [
    "Which testing type identifies vulnerable open-source components and license issues?",
    "SCA."
   ],
   [
    "What is the difference between IAST and RASP?",
    "IAST instruments an application during testing to report vulnerabilities; RASP instruments a production application to block attacks."
   ]
  ],
  "differentiation": [
   "Support: Provide a four-row comparison table with blanks for 'what it examines', 'needs running app?' and 'shows code line?', and let students fill it before the card sort.",
   "Extend: Ask students to design a pipeline policy for a fictional team specifying which tools run at which stage, which severity levels block release and who triages findings."
  ]
 },
 {
  "t": "Assessing effectiveness of software security: auditing, logging, risk analysis",
  "objectives": [
   "Students will be able to explain how process, technical and change audits provide evidence of software security effectiveness.",
   "Students will be able to specify what a security log entry should contain and what it must exclude.",
   "Students will be able to apply STRIDE and likelihood-and-impact reasoning to prioritize application risks and identify who accepts residual risk.",
   "Students will be able to select metrics that show whether a software security program is improving."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student proposals for evidence on the board."
   ],
   [
    12,
    "Teach",
    "Cover auditing types with sampling, then the two roles of logging (generate and review), the who-what-when-where-outcome rule and what never to log. Introduce STRIDE, likelihood and impact, residual risk acceptance, and a short list of useful metrics."
   ],
   [
    16,
    "Activity",
    "Run the 'Log Detective' exercise described below."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions; focus on who owns risk acceptance and on meaningful metrics."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your manager asks you to prove the company's apps are more secure than last year. What evidence would you bring, and what evidence would not convince you?",
  "activity": {
   "title": "Log Detective",
   "materials": "A projected or printed excerpt of about 15 fictional application log lines (some good entries, some missing timestamps or user IDs, one containing a password, one showing a burst of authorization failures), printed STRIDE cards, and a simple likelihood-by-impact grid drawn on the whiteboard.",
   "steps": [
    "Pairs read the log excerpt and mark each line as useful, incomplete or dangerous, writing the reason (for example 'no outcome recorded' or 'contains a password').",
    "Pairs identify the suspicious pattern in the excerpt and describe what it suggests is happening.",
    "Each pair classifies the suspected threat with a STRIDE card and places it on the likelihood-by-impact grid with a one-line justification.",
    "Pairs propose one logging fix and one metric that would show whether the fix worked.",
    "The class compares grid placements and agrees who in the fictional company should accept any remaining risk."
   ]
  },
  "discussion": [
   "Why is insufficient logging and monitoring considered a weakness in its own right?",
   "If a metric looks good but the same weakness types keep recurring, what does that tell you?",
   "What could go wrong if developers are allowed to accept the risk of unfixed vulnerabilities?"
  ],
  "exit": [
   [
    "What five elements should a security log entry capture?",
    "Who or what initiated it, what happened, when, where and the outcome."
   ],
   [
    "Name two things that must never be written to logs.",
    "Any two of: passwords, session tokens, full payment card numbers, encryption keys or other secrets."
   ],
   [
    "Who should formally accept residual risk for an application?",
    "The business or system owner with authority to accept risk."
   ]
  ],
  "differentiation": [
   "Support: Provide a checklist card listing the five log elements and the forbidden items, so students can tick through each log line.",
   "Extend: Ask students to design a quarterly software security dashboard with four metrics, the target trend for each and the action to take if it moves the wrong way."
  ]
 },
 {
  "t": "Security impact of acquired software: COTS, open source, third party, managed services (SaaS, PaaS, IaaS)",
  "objectives": [
   "Students will be able to compare the security risks and controls for COTS, open-source, third-party developed and managed-service software.",
   "Students will be able to assign security responsibilities between customer and provider for IaaS, PaaS and SaaS.",
   "Students will be able to recommend due diligence evidence and contract terms, including source code escrow, for an acquisition.",
   "Students will be able to explain why accountability for data never transfers to a vendor or provider."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and note answers; highlight any that assume the vendor is fully responsible."
   ],
   [
    12,
    "Teach",
    "Present the four acquisition sources with one key risk and control each. Draw a shared responsibility stack (facilities, hardware, virtualization, OS, runtime, application, data, identities) and shade provider versus customer duties for IaaS, PaaS and SaaS. Cover due diligence evidence and escrow."
   ],
   [
    15,
    "Activity",
    "Run the 'Whose Job Is It' responsibility sort described below."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions, ending on accountability."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When you rent an apartment, which security tasks belong to the landlord and which are still yours? Does that change if you rent a hotel room instead?",
  "activity": {
   "title": "Whose Job Is It",
   "materials": "A whiteboard grid with three columns (IaaS, PaaS, SaaS) and two rows (Provider, Customer); sticky notes pre-written with tasks such as 'patch guest OS', 'secure the data center', 'manage user accounts', 'configure sharing settings', 'patch the runtime', 'classify data'; printed acquisition scenario cards for COTS, open source and contractors.",
   "steps": [
    "Teams of three receive a set of task sticky notes and place each one in the correct cell of the grid for every model where it applies.",
    "The teacher reviews the grid with the class, correcting placements and pointing out which tasks stay with the customer in all three columns.",
    "Teams then draw one acquisition scenario card, such as a startup COTS vendor or an outsourced developer, and list three due diligence checks and two contract clauses.",
    "Each team reads its list aloud; the class adds anything missing, such as escrow, right to audit or data deletion at exit.",
    "Close by having each team write one sentence on why accountability stays with the customer."
   ]
  },
  "discussion": [
   "If a SaaS provider suffers a breach of your customers' data, who notifies the customers and who answers to regulators?",
   "What makes an open-source dependency trustworthy enough to use in a critical system?",
   "Why should due diligence continue after a contract is signed?"
  ],
  "exit": [
   [
    "Who patches the guest operating system in IaaS?",
    "The customer."
   ],
   [
    "Which contract mechanism protects a customer if a COTS vendor goes out of business?",
    "Source code escrow."
   ],
   [
    "Name three things a customer always manages in SaaS.",
    "Its data, user identities and access, and the service configuration."
   ]
  ],
  "differentiation": [
   "Support: Hand out a pre-shaded responsibility stack for IaaS so students only need to adjust it for PaaS and SaaS.",
   "Extend: Ask students to write a one-page vendor security questionnaire for a SaaS provider, grouping questions by data protection, identity, incident response and exit."
  ]
 },
 {
  "t": "Secure coding guidelines and standards: source code weaknesses, API security, secure coding practices",
  "objectives": [
   "Students will be able to name major secure coding references such as the OWASP Top 10, ASVS, CWE, SEI CERT and NIST SSDF and describe their purpose.",
   "Students will be able to identify common source code weaknesses, including maintenance hooks and improper error handling, from a description or code review note.",
   "Students will be able to apply core practices such as server-side allow-list validation, output encoding, parameterized queries and failing securely.",
   "Students will be able to recognize API risks such as BOLA and excessive data exposure and recommend controls."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up scenario and take guesses about what went wrong."
   ],
   [
    12,
    "Teach",
    "Introduce the standards briefly, then the weakness categories, then the matching practices as a two-column list on the board. Finish with API security: BOLA, excessive data exposure, rate limits, scoped tokens and API inventory."
   ],
   [
    16,
    "Activity",
    "Run the 'Code Review Desk' exercise described below."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions, focusing on how standards become enforced practice."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A user of an app changes one number in a web address and suddenly sees a stranger's profile. Nobody hacked a password. What do you think went wrong in the code?",
  "activity": {
   "title": "Code Review Desk",
   "materials": "Printed review packets with six short fictional code review notes or pseudocode snippets (for example, a query built by joining strings, an error page printing a stack trace, a comment saying 'temporary admin bypass', an API returning any record by ID, a login check done only in the browser, an API key in a config file). Highlighters and a whiteboard.",
   "steps": [
    "Pairs act as code reviewers and highlight the weakness in each snippet, without writing any attack.",
    "For each snippet, pairs name the weakness category and the secure coding practice that fixes it.",
    "Pairs mark which snippets are API-specific and explain why APIs make the issue more exposed.",
    "Each pair writes one checklist item that would catch its hardest snippet in future reviews.",
    "The class combines the items into a shared code review checklist on the whiteboard."
   ]
  },
  "discussion": [
   "Why does a standard that exists only as a document rarely change how code is written?",
   "How would you decide which secure coding standard to adopt for a team that writes both web apps and APIs?",
   "Why might old API versions be more dangerous than current ones?"
  ],
  "exit": [
   [
    "Where must security input validation be enforced, and why?",
    "On the server, because an attacker controls the client and can bypass client-side checks."
   ],
   [
    "What API weakness lets a user read another user's record by changing its identifier?",
    "Broken object-level authorization (BOLA)."
   ],
   [
    "What does failing securely mean?",
    "On error, deny access and show a generic message while logging details internally."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card matching each weakness to its fix so students can focus on recognizing the weakness in each snippet.",
   "Extend: Ask students to map their class checklist items to OWASP Top 10 or CWE categories and propose which items could be automated with static analysis rules."
  ]
 },
 {
  "t": "Software-defined security",
  "objectives": [
   "Students will be able to explain the separation of the control plane and data plane and why it enables centralized security policy.",
   "Students will be able to describe micro-segmentation, infrastructure as code, policy as code and software-defined perimeters.",
   "Students will be able to evaluate the benefits and main risks of software-defined security, especially control plane compromise and fast-propagating errors.",
   "Students will be able to recommend controls that protect the control plane and policy pipeline."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch student ideas on the board."
   ],
   [
    12,
    "Teach",
    "Draw a controller above many switches and workloads; label control and data planes. Add labeled workloads and write a label-based policy. Explain IaC, policy as code, SDP and orchestration quarantine. List benefits on one side and risks on the other."
   ],
   [
    16,
    "Activity",
    "Run the 'Policy Room' whiteboard exercise described below."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions, ending on how to protect the control plane."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Imagine a building where servers appear and disappear every few minutes. How would a security guard who checks a printed list of room numbers keep up? What would work better?",
  "activity": {
   "title": "Policy Room",
   "materials": "Whiteboard, sticky notes in three colors (workloads, policies, threats), printed scenario sheet describing a fictional shop with web, order, payment and reporting services, markers.",
   "steps": [
    "Groups place workload sticky notes on the board and give each a label by function, such as web or payment.",
    "Groups write three to five allow rules using labels only, such as 'web may reach order on port 443', on policy notes, with everything else denied.",
    "The teacher posts a threat note: the web service is compromised. Groups trace which services the attacker can reach under their rules and tighten any that are too broad.",
    "The teacher posts a second threat note: an engineer pushes a rule allowing any source to reach payment. Groups write one policy-as-code test that would block it and one process control for the controller.",
    "Groups compare their designs and identify the single most sensitive component in the system."
   ]
  },
  "discussion": [
   "Why is a mistake in software-defined security often worse than a mistake on a single hardware firewall?",
   "How does micro-segmentation support a zero trust approach?",
   "Who should be allowed to change policy code, and what approvals should be required?"
  ],
  "exit": [
   [
    "Which plane makes policy decisions and which forwards traffic?",
    "The control plane decides; the data plane forwards."
   ],
   [
    "Why are label-based policies preferred over IP-based rules in container environments?",
    "Workload IP addresses change constantly, while labels follow the workload as it scales or moves."
   ],
   [
    "What is the main risk of centralized software-defined control?",
    "Compromise of or errors in the controller or pipeline affect every enforcement point at once."
   ]
  ],
  "differentiation": [
   "Support: Give students a starter set of three labeled workloads and one sample rule so they can model the remaining rules on it.",
   "Extend: Ask students to write a short change control procedure for policy code, including review, automated tests, staged rollout and rollback."
  ]
 },
 {
  "t": "Common weaknesses: injection, XSS, CSRF, buffer overflow, race conditions, insecure deserialization",
  "objectives": [
   "Students will be able to recognize injection, XSS, CSRF, buffer overflow, race conditions and insecure deserialization from a scenario description.",
   "Students will be able to explain the root cause of each weakness and name its primary defense.",
   "Students will be able to distinguish XSS from CSRF and the three forms of XSS.",
   "Students will be able to explain why platform protections such as ASLR and DEP reduce but do not eliminate buffer overflow risk."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up and collect answers; connect them to the idea of mixing data and instructions."
   ],
   [
    13,
    "Teach",
    "Present each weakness in two minutes: root cause, recognizable symptom, primary defense. Draw a side-by-side for XSS (user trusts site) and CSRF (site trusts browser). Show the parameterized query snippet and explain why data cannot change the query structure."
   ],
   [
    15,
    "Activity",
    "Run the 'Symptom to Fix' card match described below."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions, emphasizing root-cause fixes over symptom patches."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A restaurant takes orders on slips of paper and the kitchen follows whatever is written. What could go wrong if a customer writes 'and also give me everything in the cash drawer' on their slip?",
  "activity": {
   "title": "Symptom to Fix",
   "materials": "Three sets of printed cards: 12 symptom cards (short fictional descriptions such as 'two withdrawals both succeed on an account with funds for one', 'a forum comment runs script for every viewer', 'logged-in user's email changed after visiting another site'), weakness name cards and defense cards. Tape and a whiteboard with six columns.",
   "steps": [
    "Groups of three receive four symptom cards and the full set of weakness and defense cards.",
    "For each symptom, groups choose the weakness name and the primary defense, writing one sentence explaining the clue that gave it away.",
    "Groups tape their triples into the matching column on the whiteboard.",
    "The teacher reads two contrast pairs aloud (stored versus reflected XSS; XSS versus CSRF) and groups must explain the difference in their own words.",
    "The class reviews the board and corrects any mismatches, noting which defenses address root causes and which only reduce impact."
   ]
  },
  "discussion": [
   "Why are parameterized queries considered a root-cause fix while input filtering is only supporting?",
   "If a team cannot rewrite legacy C code, what combination of controls would you require to reduce buffer overflow risk?",
   "Why is data stored in a user's own cookie not trustworthy?"
  ],
  "exit": [
   [
    "What is the primary defense against SQL injection?",
    "Parameterized queries (prepared statements)."
   ],
   [
    "In one sentence each, what trust do XSS and CSRF abuse?",
    "XSS abuses the user's trust in the site; CSRF abuses the site's trust in the user's browser."
   ],
   [
    "Do ASLR and DEP eliminate buffer overflows? Explain.",
    "No, they make exploitation harder; the bug must still be fixed with bounds checking, safe functions or memory-safe languages."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page table with each weakness, a plain-language description and its defense, and let students use it during the card match.",
   "Extend: Ask students to write a code review checklist item for each of the six weaknesses and identify which could be caught by SAST, DAST or SCA."
  ]
 }
]);
