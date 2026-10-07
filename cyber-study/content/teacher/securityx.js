/* Teacher edition for CompTIA SecurityX (CAS-005): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("securityx", [
 {
  "t": "Security governance components: policies, standards, procedures, guidelines and governance frameworks",
  "objectives": [
   "Students will be able to distinguish policies, standards, procedures, guidelines and baselines by authority, specificity and whether they are mandatory.",
   "Students will be able to place a given security requirement at the correct level of the documentation hierarchy and justify the choice.",
   "Students will be able to describe the elements of a sound policy exception, including risk owner, compensating controls and expiry.",
   "Students will be able to explain how governance frameworks such as ISO/IEC 27001, NIST CSF and COBIT structure a security program."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up question. Take three or four answers and write them on the board without correcting them yet; return to them at the end."
   ],
   [
    12,
    "Teach",
    "Draw a pyramid: policy at the top, standards and baselines below, procedures at the base, guidelines off to the side marked optional. For each level, give the encryption example from the lesson and ask who approves changes and how often it changes. Close with the exception process and the governance frameworks."
   ],
   [
    15,
    "Activity",
    "Run the requirement sort described below. Circulate and ask groups to defend borderline cards aloud."
   ],
   [
    8,
    "Discuss",
    "Review the contested cards as a class, then pose the discussion questions. Revisit the warm-up answers and correct any misconceptions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on a sticky note or index card and hand them in at the door."
   ]
  ],
  "warmup": "Your school has a rule that phones must be put away during exams. Where would you write the exact steps a proctor follows to collect phones, and who should be able to change those steps?",
  "activity": {
   "title": "Requirement sort: policy, standard, procedure, guideline or exception",
   "materials": "Printed cards (one requirement per card, about 16 cards per group), a whiteboard divided into five columns, sticky notes or tape.",
   "steps": [
    "Prepare cards with statements such as 'All customer data must be encrypted', 'Use TLS 1.2 or later', 'Steps to rotate a service account key', 'Tips for creating a memorable passphrase', and 'Legacy billing app exempt from MFA until March with IP allow-listing'.",
    "In groups of three or four, students sort each card into one of five columns: policy, standard, procedure, guideline or exception.",
    "For each exception card, groups must add a sticky note naming the risk owner, a compensating control and an expiry date.",
    "Each group picks one card it argued about and explains its final decision to the class in under a minute.",
    "The teacher reveals an answer key and highlights the signal words: 'must' with no specifics (policy), specific values (standard), numbered steps (procedure), 'should consider' (guideline)."
   ]
  },
  "discussion": [
   "Why might an organization deliberately make policies hard to change but standards relatively easy to change?",
   "What happens to an organization's real risk when there is no formal exception process?",
   "If an auditor finds that daily practice differs from a written standard, should you change the practice or the standard? What would help you decide?"
  ],
  "exit": [
   [
    "Where should 'Passwords must be at least 14 characters' be documented, and why?",
    "In a standard, because it is a specific, measurable value that supports a policy and may change as technology changes."
   ],
   [
    "Name three elements every policy exception should include.",
    "Any three of: business justification, risk owner who accepts the risk, compensating controls, an expiry or review date, and documented approval."
   ],
   [
    "Which document type is optional?",
    "A guideline, which gives recommended advice rather than mandatory requirements."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference strip listing each document type with one example and its signal words, and let them sort only eight cards first.",
   "Extend: Ask fast finishers to rewrite an overly detailed policy statement into a short policy plus a supporting standard and procedure."
  ]
 },
 {
  "t": "Security program management: roles and responsibilities (RACI), awareness training, metrics and reporting to leadership",
  "objectives": [
   "Students will be able to build a RACI matrix for a security activity with exactly one Accountable party.",
   "Students will be able to distinguish the roles of data owner, data custodian, data steward, CISO and DPO.",
   "Students will be able to classify a security metric as a KPI or a KRI and explain the difference.",
   "Students will be able to design a short leadership report and a role-based awareness training plan."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect quick answers. Point out how often people name 'everyone' or 'IT' as the owner."
   ],
   [
    12,
    "Teach",
    "Walk through the role hierarchy from board to users, emphasizing owner versus custodian. Build a RACI for firewall changes on the board together. Then define KPIs and KRIs with one vulnerability management example each, and show why alert counts make poor board metrics."
   ],
   [
    15,
    "Activity",
    "Run the RACI and dashboard workshop below in small groups."
   ],
   [
    8,
    "Discuss",
    "Groups compare their RACI charts and dashboards. Use the discussion questions to draw out differences."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on paper."
   ]
  ],
  "warmup": "Think of a group project that went wrong. Was there ever a moment when everyone thought someone else had handled a task? What would have prevented it?",
  "activity": {
   "title": "RACI and one-page dashboard workshop",
   "materials": "Printed scenario sheet describing a company onboarding a new SaaS HR system, blank RACI grids, sticky notes, whiteboard or chart paper.",
   "steps": [
    "Give each group the scenario and a list of roles: CISO, HR director (data owner), IT administrator (custodian), procurement, legal, service desk, all staff.",
    "Groups complete a RACI grid for four activities: approving access to HR records, configuring single sign-on, assessing the vendor, and announcing the new system. Each row must have exactly one A.",
    "Next, groups write four sticky notes, each a candidate metric for this program, and label each as KPI or KRI.",
    "Groups choose the three metrics they would put on a one-page board dashboard and write one sentence explaining what decision each helps the board make.",
    "Groups post their charts; the teacher checks for multiple As and for metrics that are raw counts without business meaning."
   ]
  },
  "discussion": [
   "Why is it dangerous to have two people Accountable for the same task?",
   "Should a phishing simulation program publish the names of people who click? What are the trade-offs?",
   "What makes a metric useful to a board but useless to a security analyst, or the other way around?"
  ],
  "exit": [
   [
    "Who decides who may access the payroll database: the HR director or the database administrator?",
    "The HR director as data owner; the DBA is a custodian who implements the decision."
   ],
   [
    "Is 'percentage of critical patches applied within SLA' a KPI or a KRI?",
    "A KPI, because it measures how well the patching process performs."
   ],
   [
    "What does the C in RACI mean, and when does that role act?",
    "Consulted: they give input before the work is done or the decision is made."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed RACI grid with the Responsible column filled in, so students focus on choosing the single Accountable party.",
   "Extend: Ask fast finishers to identify a KRI threshold that would trigger escalation to the board and to write the escalation message in two sentences."
  ]
 },
 {
  "t": "Change, configuration and asset management governance, including CMDB and data inventory",
  "objectives": [
   "Students will be able to explain the purpose of asset management, a CMDB and a data inventory, and how they differ.",
   "Students will be able to compare standard, normal and emergency changes and describe how each is approved.",
   "Students will be able to use configuration item relationships to perform a simple impact analysis.",
   "Students will be able to identify an unauthorized change or configuration drift as a possible security incident."
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
    "Explain the three questions: what do we own, how should it be configured, who approved each change. Draw a small CMDB on the board with a web server, an application and a database linked together. Contrast standard, normal and emergency changes, and explain drift and data inventories."
   ],
   [
    18,
    "Activity",
    "Run the CMDB impact tabletop below."
   ],
   [
    5,
    "Discuss",
    "Pose the discussion questions and connect group findings to the lesson's root-cause theme."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If a news report announced a serious flaw in one specific app version tonight, how would your school or workplace find out which computers run it?",
  "activity": {
   "title": "CMDB impact tabletop",
   "materials": "Projector or printed handout showing a simple CMDB diagram (about ten configuration items with relationship lines), a printed change calendar, a short list of three alert messages, whiteboard markers.",
   "steps": [
    "Show the CMDB diagram, which includes web servers, an order application, a payment database, a backup service and an identity provider.",
    "Announce that a vulnerability affects the web server software version on two of the servers. Groups trace relationships to list every business service affected and rank which to patch first.",
    "Groups classify their patch request as standard, normal or emergency and state who approves it and what must happen afterward.",
    "Hand out the three alerts, such as a changed firewall rule at 3 a.m. Groups compare each against the change calendar and decide whether it is routine drift or a possible incident.",
    "Each group reports its patch order and one alert decision, with reasoning."
   ]
  },
  "discussion": [
   "Why is an automatically updated inventory more trustworthy than a manually maintained spreadsheet?",
   "When might configuration drift be harmless, and why should it still be reviewed?",
   "How does a data inventory help after a breach, beyond what a CMDB provides?"
  ],
  "exit": [
   [
    "What does a CMDB record that a simple asset list does not?",
    "Relationships between configuration items, which allow impact analysis."
   ],
   [
    "How is an emergency change approved and documented?",
    "A designated authority approves it quickly, it is implemented, and it is documented and reviewed by the CAB afterward."
   ],
   [
    "A firewall rule changed overnight with no matching change ticket. What should you suspect?",
    "A possible unauthorized change or compromise that should be investigated, not dismissed as routine drift."
   ]
  ],
  "differentiation": [
   "Support: Give students a version of the CMDB diagram with the affected path highlighted, and ask them only to name the services and the change type.",
   "Extend: Ask fast finishers to draft a complete change request for the emergency patch, including risk, test plan and back-out plan."
  ]
 },
 {
  "t": "Risk management activities: impact analysis, risk assessment, risk appetite and tolerance, risk treatment and risk registers",
  "objectives": [
   "Students will be able to calculate SLE, ARO and ALE and decide whether a control is cost-justified.",
   "Students will be able to distinguish inherent risk, residual risk, risk appetite and risk tolerance.",
   "Students will be able to select the appropriate risk treatment (mitigate, transfer, avoid, accept) for a scenario.",
   "Students will be able to complete a risk register entry with owner, scores and treatment."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the bicycle and collect answers that map to the four treatments without naming them yet."
   ],
   [
    13,
    "Teach",
    "Define risk, then compare qualitative and quantitative assessment. Work one ALE example on the board step by step. Explain appetite versus tolerance and inherent versus residual risk. Name the four treatments, mapping them to the warm-up answers."
   ],
   [
    17,
    "Activity",
    "Run the risk committee simulation below."
   ],
   [
    5,
    "Discuss",
    "Groups share their treatment decisions; use the discussion questions to probe who has authority to accept risk."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions, including one calculation."
   ]
  ],
  "warmup": "You ride an expensive bicycle to school. Name four different things you could do about the chance it gets stolen.",
  "activity": {
   "title": "Risk committee simulation",
   "materials": "Printed risk cards (four scenarios with asset value, exposure factor, frequency and control cost), blank risk register templates, calculators or student laptops with a browser calculator.",
   "steps": [
    "Give each group two risk cards, for example laptop theft, ransomware on a file server, a vendor outage and a website defacement.",
    "Groups calculate SLE, ARO and ALE for each risk and compare the ALE with the annual cost of the proposed control.",
    "Groups choose a treatment for each risk and fill in a risk register row: description, owner, inherent score, treatment, residual score and due date.",
    "One student in each group plays the executive who must accept any residual risk above appetite; they must state whether they accept and why.",
    "Groups present one risk to the class in under two minutes using a business-language sentence that names the cost, the appetite and the decision needed."
   ]
  },
  "discussion": [
   "Why does buying insurance not reduce the likelihood of a breach, and what does it actually change?",
   "When might an organization choose a control that is not cost-justified by ALE alone?",
   "Who should be allowed to accept a risk, and what could go wrong if anyone can?"
  ],
  "exit": [
   [
    "A server worth $50,000 loses 20 percent of its value per incident, and incidents occur twice a year. What is the ALE?",
    "$20,000 (SLE $10,000 multiplied by ARO 2)."
   ],
   [
    "Which risk treatment is buying cyber insurance?",
    "Transference, because it shifts financial impact while accountability stays with the organization."
   ],
   [
    "What is residual risk?",
    "The risk that remains after controls have been applied."
   ]
  ],
  "differentiation": [
   "Support: Provide a formula card showing SLE = AV x EF and ALE = SLE x ARO with one fully worked example, and pair students for the calculations.",
   "Extend: Ask fast finishers to rework a risk using a control that halves the ARO instead of reducing the exposure factor, and compare the residual ALE."
  ]
 },
 {
  "t": "Third-party and supply chain risk management: vendor assessments, SBOMs, contracts and right to audit",
  "objectives": [
   "Students will be able to tier vendors by data sensitivity, access and criticality and match assessment depth to the tier.",
   "Students will be able to compare evidence types, including questionnaires, SOC 2 Type I and Type II reports and ISO/IEC 27001 certificates.",
   "Students will be able to identify essential contract clauses for a vendor handling sensitive data.",
   "Students will be able to explain how SBOMs and other supply chain controls speed up response to a component vulnerability."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the food recall and connect it to software ingredients."
   ],
   [
    12,
    "Teach",
    "Explain vendor tiering and due diligence. Compare SOC 2 Type I and Type II on the board. List key contract clauses and agreement types (MSA, DPA, MOU, ISA). Introduce SBOMs and supply chain controls, and finish with offboarding."
   ],
   [
    16,
    "Activity",
    "Run the vendor review board activity below."
   ],
   [
    7,
    "Discuss",
    "Groups present their decisions; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When a food company recalls one ingredient, how does a grocery store know which products to pull from its shelves? What if the products had no ingredient labels?",
  "activity": {
   "title": "Vendor review board",
   "materials": "Printed vendor profile cards (four fictional vendors with data access, evidence provided and draft contract terms), a printed one-page SBOM excerpt listing components and versions, sticky notes, whiteboard.",
   "steps": [
    "Give each group the four vendor profiles: a payroll SaaS provider, a managed IT support company, a catering supplier and a marketing analytics tool.",
    "Groups assign each vendor a tier (high, medium, low) and list the evidence they would require for each tier.",
    "For the highest-risk vendor, groups mark which contract clauses are missing from its draft contract and write the missing clauses on sticky notes.",
    "Announce a fictional vulnerable library and version. Groups search the SBOM excerpt to decide whether the product is affected and what they would ask the vendor next.",
    "Groups report their tiering and one missing clause, and explain how they reached their SBOM conclusion."
   ]
  },
  "discussion": [
   "Why is a vendor's low price no guide to how risky it is?",
   "What can you learn from the exceptions section of a SOC 2 Type II report, and how should it change your decision?",
   "How would you manage risk from your vendor's own suppliers, the fourth parties you never contract with directly?"
  ],
  "exit": [
   [
    "Which is stronger evidence, a SOC 2 Type I or Type II report, and why?",
    "Type II, because it tests whether controls operated effectively over a period rather than only their design at one point in time."
   ],
   [
    "What document lets you quickly determine whether a product contains a vulnerable component?",
    "A software bill of materials (SBOM)."
   ],
   [
    "Name two steps in vendor offboarding.",
    "Revoke the vendor's accounts, credentials and network access, and retrieve or confirm destruction of the organization's data."
   ]
  ],
  "differentiation": [
   "Support: Provide a checklist of common contract clauses so students can tick off what is present rather than recalling the list from memory.",
   "Extend: Ask fast finishers to design vendor access architecture for the managed IT support company, including MFA, just-in-time access and segmentation."
  ]
 },
 {
  "t": "Business continuity and disaster recovery planning: BIA, RTO, RPO and plan testing",
  "objectives": [
   "Students will be able to define MTD, RTO, RPO and WRT and explain how they relate.",
   "Students will be able to choose a recovery site type and backup strategy that meets given recovery targets at reasonable cost.",
   "Students will be able to order DR test types from least to most disruptive and select the right test for a goal.",
   "Students will be able to identify people and communication elements that a BC/DR plan must include."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the lost essay and draw out the difference between time to recover and data lost."
   ],
   [
    12,
    "Teach",
    "Explain BC versus DR and the role of the BIA. Draw a timeline on the board marking the disruption, the RPO before it, and the RTO, WRT and MTD after it. Compare hot, warm and cold sites, cover 3-2-1 backups with an immutable copy, and list the test types in order."
   ],
   [
    18,
    "Activity",
    "Run the disaster tabletop below."
   ],
   [
    5,
    "Discuss",
    "Debrief the tabletop using the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Your laptop dies the night before an essay is due. What two separate things determine how bad this is?",
  "activity": {
   "title": "Disaster tabletop: the flooded server room",
   "materials": "Printed BIA summary for three fictional systems (with MTD and data loss tolerance), printed recovery option cards with costs and restore times, a projector for scenario injects, whiteboard.",
   "steps": [
    "Give each group the BIA summary for an online ordering system, an email system and an internal wiki.",
    "Groups set an RTO and RPO for each system that fits its MTD and data loss tolerance, and choose a recovery option card (hot, warm or cold site; replication or nightly backup) for each.",
    "The teacher projects a scenario: a burst pipe takes the primary data center offline at 3 a.m. Groups decide who declares the disaster, who authorizes failover, and how customers are informed.",
    "The teacher adds an inject: the ransomware gang that struck last month encrypted the online backups too. Groups explain how an immutable or offline copy would change the outcome.",
    "Groups recommend which test type they would run next quarter to validate their plan, and why."
   ]
  },
  "discussion": [
   "Why should process owners, not only IT, set the MTD for their processes?",
   "Why is a backup that has never been restored described as an assumption rather than a capability?",
   "When is a full interruption test worth its risk, and when is a parallel test enough?"
  ],
  "exit": [
   [
    "Backups run every six hours. What is the worst-case data loss, and which objective does that relate to?",
    "Up to six hours of data, which relates to the RPO."
   ],
   [
    "Can an RTO of 12 hours meet an MTD of 8 hours?",
    "No. The RTO, plus work recovery time, must fit within the MTD."
   ],
   [
    "Which test type is discussion only?",
    "A tabletop exercise (a checklist review is also non-technical)."
   ]
  ],
  "differentiation": [
   "Support: Give students a labeled timeline diagram showing where RPO, RTO, WRT and MTD fall relative to the disruption to use during the activity.",
   "Extend: Ask fast finishers to calculate whether a cheaper warm site still meets all targets if the work recovery time doubles, and justify their recommendation."
  ]
 },
 {
  "t": "Compliance and regulatory impacts: GDPR, HIPAA, PCI DSS, SOX, data sovereignty and industry frameworks",
  "objectives": [
   "Students will be able to match data types and organizations to GDPR, HIPAA, PCI DSS and SOX obligations.",
   "Students will be able to explain data sovereignty and data localization and their effect on cloud region and access design.",
   "Students will be able to propose architecture changes that reduce PCI DSS scope.",
   "Students will be able to describe how a unified control set satisfies multiple regulations with shared evidence."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about traveling with different road rules."
   ],
   [
    13,
    "Teach",
    "Cover each regulation with its data type, who it applies to and two key requirements. Emphasize that PCI DSS is an industry standard enforced by contract. Explain sovereignty, localization and cross-border transfers. End with the idea of mapping one control to many obligations."
   ],
   [
    17,
    "Activity",
    "Run the regulation matching and mapping exercise below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore the difference between compliant and secure."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "If you drive from one country to another, whose speed limits apply to you, and why? How might that idea apply to data stored in the cloud?",
  "activity": {
   "title": "Which rulebook applies? Matching and control mapping",
   "materials": "Printed scenario cards (eight short company descriptions), a printed control list (about ten controls such as access reviews, encryption, logging and segmentation), chart paper or whiteboard, sticky notes.",
   "steps": [
    "Give each group eight scenario cards, such as a US clinic, a French online retailer, a US public company's ledger system and a coffee shop taking card payments.",
    "Groups label each card with every regulation or standard that applies and note any data location concerns.",
    "On chart paper, groups draw a grid with controls down the side and regulations across the top, and mark which controls satisfy which obligations.",
    "Groups pick the scenario with card payments and sketch, on the board, one architecture change that would shrink PCI DSS scope.",
    "Each group shares one control that satisfies the most obligations and explains why."
   ]
  },
  "discussion": [
   "Can an organization be fully compliant and still be insecure? Give an example.",
   "Why might a company choose to keep all customer data in one country even where no law requires it?",
   "What are the risks of building a separate compliance program for each regulation?"
  ],
  "exit": [
   [
    "A US hospital's billing vendor handles patient records. Which law applies, and what agreement should they sign?",
    "HIPAA; the vendor is a business associate and should sign a business associate agreement (BAA)."
   ],
   [
    "Is PCI DSS a law? Explain.",
    "No. It is an industry standard from the card brands' council, enforced through contracts with banks and card brands."
   ],
   [
    "Give one way to reduce PCI DSS scope.",
    "Tokenize card data or outsource payment entry so systems never store card numbers, or segment the cardholder data environment."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page reference table listing each regulation, the data it covers and who it applies to, for use during the matching step.",
   "Extend: Ask fast finishers to outline how a US company could lawfully transfer EU customer data to a US data center, naming a transfer mechanism and a supplementary technical measure."
  ]
 },
 {
  "t": "Security frameworks and standards: NIST CSF, NIST SP 800-53, ISO/IEC 27001, CIS Controls and CSA CCM",
  "objectives": [
   "Students will be able to classify NIST CSF, NIST SP 800-53, ISO/IEC 27001, CIS Controls and CSA CCM as outcome frameworks, control catalogs or management system standards.",
   "Students will be able to list the six NIST CSF 2.0 functions in order and explain the role of Govern.",
   "Students will be able to select the most appropriate framework for a scenario using its signal words.",
   "Students will be able to explain how mapping controls across frameworks reduces duplicated effort."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about recipes, cookbooks and cooking certifications."
   ],
   [
    12,
    "Teach",
    "Introduce the three framework types. Present each framework with one sentence on what it is for. Write the CSF 2.0 functions in order and teach the mnemonic. Explain the statement of applicability, RMF steps and CIS implementation groups."
   ],
   [
    16,
    "Activity",
    "Run the framework matchmaker activity below."
   ],
   [
    7,
    "Discuss",
    "Review answers and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "What is the difference between a list of healthy-eating goals, a detailed cookbook, and a certificate proving a restaurant follows food safety processes? Which would you show an inspector?",
  "activity": {
   "title": "Framework matchmaker",
   "materials": "Printed client request cards (eight fictional organizations with a need), a framework summary sheet, a printed crosswalk excerpt showing one control mapped across several frameworks, whiteboard.",
   "steps": [
    "Give each group eight client request cards, for example 'needs certification for a European customer', 'federal agency pilot', 'three-person IT team wants a starting point', 'cloud provider assurance for a customer'.",
    "Groups match each card to the best framework and underline the signal words that drove their choice.",
    "Groups study the crosswalk excerpt and write down how many framework requirements one quarterly access review satisfies.",
    "Groups write the six CSF functions on sticky notes, scramble them, and race another group to place them in order.",
    "Groups present two of their matches and explain any card where they disagreed internally."
   ]
  },
  "discussion": [
   "Why might an organization use NIST CSF to report to its board even if it is certified against ISO/IEC 27001?",
   "What did adding Govern to the CSF change about how organizations think of cybersecurity?",
   "What are the risks of treating framework compliance as the goal rather than reducing real risk?"
  ],
  "exit": [
   [
    "Which framework can an organization be certified against by an accredited body?",
    "ISO/IEC 27001."
   ],
   [
    "List the six NIST CSF 2.0 functions in order.",
    "Govern, Identify, Protect, Detect, Respond, Recover."
   ],
   [
    "What ISO/IEC 27001 document lists which controls apply and why?",
    "The statement of applicability (SoA)."
   ]
  ],
  "differentiation": [
   "Support: Give students a sorting mat with the three framework types as columns and let them place each framework before attempting the client cards.",
   "Extend: Ask fast finishers to describe the RMF steps for a new federal system and identify where NIST SP 800-53 baselines are used."
  ]
 },
 {
  "t": "Legal and privacy considerations: data subject rights, breach notification, e-discovery and legal holds",
  "objectives": [
   "Students will be able to list the main data subject rights and explain what an organization needs to fulfill a DSAR.",
   "Students will be able to explain the GDPR 72-hour authority notification requirement and why counsel is involved early.",
   "Students will be able to describe when a legal hold is triggered and how IT implements it.",
   "Students will be able to define spoliation and identify actions that would cause it."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the referee's whistle and freezing play."
   ],
   [
    12,
    "Teach",
    "Cover data subject rights and the DSAR workflow, including identity verification. Explain breach notification timing with GDPR's 72 hours as the anchor. Walk through e-discovery steps and the legal hold, emphasizing that the duty begins when litigation is reasonably anticipated."
   ],
   [
    17,
    "Activity",
    "Run the legal inbox triage role-play below."
   ],
   [
    6,
    "Discuss",
    "Debrief the role-play with the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "In sports, what happens to the scene when a referee stops play to review a decision? Why is it important that nobody moves the ball?",
  "activity": {
   "title": "Legal inbox triage role-play",
   "materials": "Printed inbox cards (six messages: a DSAR, a lawsuit threat, a breach discovery, an erasure request for data under hold, an employee monitoring request, a routine retention job alert), role cards (security lead, legal counsel, privacy officer, IT administrator), whiteboard.",
   "steps": [
    "Form groups of four and assign each student a role card.",
    "Groups work through the inbox cards in order. For each, they decide who leads, the first action and any deadline that applies.",
    "For the lawsuit threat, the IT administrator lists the specific systems and custodians that the legal hold should cover and what deletion jobs must be paused.",
    "For the erasure request on data that is under legal hold, groups decide how to respond and explain the conflict.",
    "Groups report their decision on the breach discovery card, including when the GDPR clock started."
   ]
  },
  "discussion": [
   "Why must an organization verify identity before responding to a data subject access request?",
   "How can a routine, well-intentioned retention policy become a legal problem?",
   "What are the benefits of conducting an incident investigation at the direction of legal counsel?"
  ],
  "exit": [
   [
    "When does the duty to preserve evidence begin?",
    "When litigation is reasonably anticipated, not only when a lawsuit is filed."
   ],
   [
    "Within what time must a qualifying personal data breach generally be reported to a GDPR supervisory authority?",
    "Within 72 hours of becoming aware of it."
   ],
   [
    "What is spoliation?",
    "The destruction or alteration of evidence that should have been preserved, which can lead to court sanctions."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision flowchart (Is litigation expected? Is personal data involved? Is there a deadline?) that students follow for each inbox card.",
   "Extend: Ask fast finishers to draft a short legal hold notice to custodians, stating what must be preserved and what they must not do."
  ]
 },
 {
  "t": "Threat modeling methods: STRIDE, PASTA, attack trees, MITRE ATT&CK and attack surface analysis",
  "objectives": [
   "Students will be able to draw a data flow diagram and mark its trust boundaries.",
   "Students will be able to apply STRIDE to diagram elements and map each category to the property it violates and a mitigation.",
   "Students will be able to compare STRIDE, PASTA, attack trees and MITRE ATT&CK and choose one for a scenario.",
   "Students will be able to identify and propose reductions to a system's attack surface."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about protecting a house and list student ideas."
   ],
   [
    10,
    "Teach",
    "Introduce the four-step threat modeling loop. Draw a simple DFD with a trust boundary. Teach STRIDE with the property each category violates. Briefly contrast PASTA, attack trees, ATT&CK and attack surface analysis."
   ],
   [
    20,
    "Activity",
    "Run the whiteboard threat modeling session below."
   ],
   [
    5,
    "Discuss",
    "Groups share their top threats; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "If you were designing a house and wanted to keep burglars out, what would you look at first on the floor plan?",
  "activity": {
   "title": "Whiteboard threat modeling session",
   "materials": "Whiteboard or chart paper per group, markers, printed STRIDE reference cards, a one-paragraph system description of a fictional food delivery app (mobile app, API gateway, order service, payment processor, database).",
   "steps": [
    "Groups read the system description and draw a DFD with external entities, processes, data stores and data flows.",
    "Groups mark trust boundaries with dotted lines and circle every flow that crosses one.",
    "For each circled flow, groups apply STRIDE and write one threat and one mitigation on a sticky note per relevant category.",
    "Groups build a small attack tree for the goal 'place orders charged to another customer's card', marking OR and AND branches and the control that blocks the most branches.",
    "Groups list three ways to reduce the system's attack surface and present their highest-priority threat to the class."
   ]
  },
  "discussion": [
   "Why are threats most concentrated at trust boundaries?",
   "When would ATT&CK be more useful than STRIDE, and how do they complement each other?",
   "How often should a team revisit its threat model, and what events should trigger an update?"
  ],
  "exit": [
   [
    "Which STRIDE category is addressed by tamper-evident audit logs and digital signatures?",
    "Repudiation."
   ],
   [
    "Which threat modeling method is risk-centric with seven stages that start from business objectives?",
    "PASTA."
   ],
   [
    "What does MITRE ATT&CK describe?",
    "Real-world adversary tactics (goals) and techniques (methods) observed in actual intrusions."
   ]
  ],
  "differentiation": [
   "Support: Provide a pre-drawn DFD with trust boundaries already marked so students can focus on applying STRIDE.",
   "Extend: Ask fast finishers to map two of their threats to ATT&CK tactics and suggest a detection for each."
  ]
 },
 {
  "t": "AI adoption challenges: AI governance, data privacy, prompt injection, model poisoning and acceptable use",
  "objectives": [
   "Students will be able to describe the components of AI governance, including inventory, acceptable use policy and use-case review.",
   "Students will be able to distinguish direct prompt injection, indirect prompt injection, data poisoning and model inversion.",
   "Students will be able to design layered controls for an AI agent that takes actions on behalf of users.",
   "Students will be able to recommend data protection controls for employee use of AI tools."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the literal-minded new employee."
   ],
   [
    12,
    "Teach",
    "Explain why bans fail and the three pillars of safe adoption. Define each AI-specific attack with a simple, non-technical example. Emphasize that models cannot reliably separate instructions from data, so defenses must be layered and designed for containment."
   ],
   [
    16,
    "Activity",
    "Run the AI assistant design review below."
   ],
   [
    7,
    "Discuss",
    "Groups compare designs; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Imagine a new employee who follows every written instruction they find on their desk, no matter who wrote it. What could go wrong, and how would you protect the company?",
  "activity": {
   "title": "AI assistant design review",
   "materials": "Printed design brief for a fictional AI assistant that reads customer emails, searches a knowledge base and can issue refunds; printed attack cards describing scenarios in plain language (no working payloads); control cards; whiteboard.",
   "steps": [
    "Groups read the design brief and list every tool, data source and action the assistant can use.",
    "Groups draw a trust boundary around untrusted content (customer emails, uploaded files) and mark where it reaches the model.",
    "The teacher hands out attack cards: an email with hidden instructions, a poisoned knowledge base article, a user trying to reveal the system prompt, an employee pasting client data into a public chatbot. Groups name each attack type.",
    "Groups select control cards to counter each attack, such as least privilege, human approval for refunds, content sanitizing, output validation, DLP and logging, and justify each choice.",
    "Groups present their redesigned assistant and explain what would still happen if an injection succeeded."
   ]
  },
  "discussion": [
   "Why does banning AI tools often increase risk rather than reduce it?",
   "Which AI actions should always require a human to approve, and why?",
   "How is insecure output handling similar to classic injection attacks you already know?"
  ],
  "exit": [
   [
    "A web page the assistant summarizes contains hidden instructions to email data externally. What attack is this?",
    "Indirect prompt injection."
   ],
   [
    "Name two controls that limit damage if prompt injection succeeds.",
    "Any two of: least-privilege tool access, human approval for sensitive actions, output filtering and validation, isolation of untrusted content, logging and monitoring."
   ],
   [
    "What is the first governance step when employees paste confidential data into public AI tools?",
    "An AI acceptable use policy naming approved tools and permitted data, backed by technical controls such as DLP."
   ]
  ],
  "differentiation": [
   "Support: Give students a matching sheet with definitions of each AI attack type and one plain example, to use while naming attack cards.",
   "Extend: Ask fast finishers to describe how a retrieval-augmented assistant should enforce user permissions and how they would test it before launch."
  ]
 },
 {
  "t": "Resilient system design: high availability, redundancy, load balancing, geographic dispersion and graceful degradation",
  "objectives": [
   "Students will be able to identify single points of failure and shared dependencies in a system diagram.",
   "Students will be able to compare active-active and active-passive designs, and horizontal and vertical scaling, in terms of redundancy.",
   "Students will be able to choose between zone-level and region-level dispersion to meet a stated RTO and RPO.",
   "Students will be able to justify a fail-open or fail-closed setting for a given security control."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the whiteboard. Highlight any answer that names a shared dependency."
   ],
   [
    12,
    "Teach",
    "Walk through HA percentages, redundancy and shared failure, load balancer health checks, active-active versus active-passive, horizontal versus vertical scaling, zones versus regions, RPO and RTO, graceful degradation, and fail open versus fail closed. Draw a simple three-tier design and add redundancy layer by layer."
   ],
   [
    18,
    "Activity",
    "Run the Find the Hidden Single Point of Failure activity in groups of three or four."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare group findings and connect them to exam wording."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note or index card and hand them in."
   ]
  ],
  "warmup": "Your home has two internet routers for backup, but both plug into the same power strip. What happens in a power cut, and what does that teach us about redundancy?",
  "activity": {
   "title": "Find the Hidden Single Point of Failure",
   "materials": "Printed architecture diagrams (one per group) that the teacher draws in advance, sticky notes in two colors, whiteboard markers.",
   "steps": [
    "Give each group a diagram of an online store: two web servers, one load balancer, one database with a replica, two firewalls, all in one availability zone, using one DNS provider and one TLS certificate.",
    "Groups mark every single point of failure or shared dependency with a red sticky note, writing what event would break it.",
    "Groups then add green sticky notes proposing a fix for each red note, such as a second zone, a second region, a load balancer pair, or certificate expiry monitoring.",
    "Give each group a requirement card, such as 'survive a regional outage with under 15 minutes of data loss', and have them adjust their design to meet it.",
    "Each group decides whether its firewalls should fail open or fail closed and writes one sentence of justification.",
    "Groups present their top two findings to the class in one minute each."
   ]
  },
  "discussion": [
   "Which shared dependencies were hardest to spot, and why do they get missed in real designs?",
   "When would you accept a single region instead of paying for multi-region, and who should make that decision?",
   "Can you think of a control that should fail open for safety reasons, and how would you compensate for the risk?"
  ],
  "exit": [
   [
    "Name one reason two redundant servers might fail at the same time.",
    "They share a dependency such as power, rack, zone, region, configuration or an expiring certificate."
   ],
   [
    "Does vertical scaling add redundancy? Explain.",
    "No. It makes one instance bigger but leaves it a single point of failure; only additional instances add redundancy."
   ],
   [
    "A design must survive a regional cloud outage. What feature is required?",
    "Geographic dispersion across regions, with data replicated to meet the RPO and tested failover to meet the RTO."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a checklist of dependency categories (power, network, location, software version, certificates, people) to scan the diagram against, and pair them with a confident peer for the first two findings.",
   "Extend: Ask fast finishers to calculate the yearly downtime allowed at 99.9 and 99.99 percent and to argue which tier of the store actually needs the higher target and why."
  ]
 },
 {
  "t": "Secure network architecture: segmentation, microsegmentation, screened subnets, NAC and software-defined networking",
  "objectives": [
   "Students will be able to design zones for a small organization and state the permitted flows between them.",
   "Students will be able to distinguish north-south from east-west traffic and select microsegmentation for lateral movement scenarios.",
   "Students will be able to describe the three 802.1X roles and how NAC posture checks place devices.",
   "Students will be able to explain the security benefit and the main risk of software-defined networking."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch the flat network from the hook on the whiteboard."
   ],
   [
    13,
    "Teach",
    "Explain zones and least-privilege flows, screened subnets, microsegmentation and east-west traffic, 802.1X roles and posture checks, MAB limits, and SDN control versus data planes. Redraw the flat network as a segmented one as you go."
   ],
   [
    17,
    "Activity",
    "Run the Draw the Zones activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions; ask two pairs to compare where they put the same device."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A burglar gets through one ground-floor window of an office building. What would you want to be true about the building's internal doors?",
  "activity": {
   "title": "Draw the Zones",
   "materials": "Printed inventory cards (one set per pair) listing about 15 devices and services, whiteboard or large paper, markers.",
   "steps": [
    "Give each pair a card set for a fictional company: public website, mail relay, employee laptops, HR database, domain controller, printers, security cameras, guest Wi-Fi, a factory controller, admin jump server and more.",
    "Pairs group the cards into zones and draw them, labeling each zone's trust level.",
    "For each zone boundary, pairs write the allowed flows as simple rules (source, destination, port, reason) and a default deny.",
    "Pairs mark which devices would use 802.1X, which need MAB, and where noncompliant laptops land.",
    "Pairs circle one place where microsegmentation would stop a specific lateral movement path and explain it.",
    "Two pairs swap drawings and try to find one flow that is more open than needed."
   ]
  },
  "discussion": [
   "Where did pairs disagree about zone placement, and what business information would settle the disagreement?",
   "What makes microsegmentation harder to run than traditional segmentation, and how do tags or labels help?",
   "If an SDN controller were compromised, what could an attacker do, and how would you detect it?"
  ],
  "exit": [
   [
    "What type of traffic does microsegmentation mainly control?",
    "East-west traffic between workloads inside the network."
   ],
   [
    "Name the three 802.1X roles.",
    "Supplicant, authenticator and authentication server (usually RADIUS)."
   ],
   [
    "Why are devices using MAC authentication bypass placed in restricted segments?",
    "Because MAC addresses can be spoofed, so the network must limit what those devices can reach."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed zone diagram with three zones already drawn and ask struggling students to place the remaining cards and write two flow rules.",
   "Extend: Ask fast finishers to rewrite three of their IP-based rules as tag-based microsegmentation policies and explain what happens when a workload autoscales."
  ]
 },
 {
  "t": "Zero trust architecture: policy decision and enforcement points, continuous verification and least privilege",
  "objectives": [
   "Students will be able to explain how zero trust differs from perimeter-based trust.",
   "Students will be able to identify the roles of the policy engine, policy administrator and policy enforcement point in a scenario.",
   "Students will be able to describe how continuous verification responds to changes in context during a session.",
   "Students will be able to recommend practical first steps for a zero trust program."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers. Write 'Once you're in, you're in' on the board."
   ],
   [
    12,
    "Teach",
    "Present the zero trust principles, then draw the NIST logical model: subject, PEP, resource, with the PE and PA above as the PDP and signal sources feeding them. Walk through the contractor example step by step."
   ],
   [
    18,
    "Activity",
    "Run the Zero Trust Role-Play activity in groups of five."
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
  "warmup": "If someone gets past the front desk of your school or workplace, what can they reach? Should getting past the front desk be enough?",
  "activity": {
   "title": "Zero Trust Role-Play",
   "materials": "Printed role cards (Subject, Policy Engine, Policy Administrator, Enforcement Point, Signals), printed scenario cards the teacher writes, a simple policy sheet, sticky notes.",
   "steps": [
    "Form groups of five and hand out one role card per student plus a one-page policy sheet, such as 'finance app requires managed device and MFA; exports over 1,000 rows require step-up MFA'.",
    "The Subject reads a scenario card aloud, for example 'I want to open the finance app from my personal tablet.'",
    "The Signals student reads the relevant facts from the card (device status, location, risk score). The Policy Engine decides using the policy sheet and says the decision aloud with a reason.",
    "The Policy Administrator writes an instruction on a sticky note and hands it to the Enforcement Point, who allows or blocks the Subject.",
    "Midway through each scenario the teacher announces a change, such as 'EDR stopped reporting', and the group repeats the decision cycle.",
    "Rotate roles after each scenario so every student plays the decision and enforcement roles at least once."
   ]
  },
  "discussion": [
   "Which signals were most useful for decisions, and which would be hardest to collect in a real organization?",
   "How could too many step-up prompts hurt security instead of helping it?",
   "Why do most organizations start zero trust with identity rather than the network?"
  ],
  "exit": [
   [
    "Which zero trust component decides whether access is granted?",
    "The policy engine."
   ],
   [
    "What happens under continuous verification when a device falls out of compliance mid-session?",
    "The session is re-evaluated and access may be limited, require step-up authentication, or be terminated."
   ],
   [
    "Why is 'the request came from the internal network' not a valid reason to allow access under zero trust?",
    "Zero trust removes implicit trust based on location and evaluates identity, device and context for every request."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-line summary card for each role (PE decides, PA instructs, PEP acts) to keep in front of them during the role-play.",
   "Extend: Ask fast finishers to map three real control types in a typical organization (identity provider, EDR, ZTNA broker) onto the NIST components and identify which act as signals, decision points or enforcement points."
  ]
 },
 {
  "t": "Security in the software development life cycle: requirements, secure design reviews, SAST, DAST, SCA and CI/CD pipeline security",
  "objectives": [
   "Students will be able to place security activities in each phase of the SDLC.",
   "Students will be able to compare SAST, DAST, SCA, IAST, fuzzing and secret scanning by what they need and what they find.",
   "Students will be able to recommend controls that protect the integrity of a CI/CD pipeline.",
   "Students will be able to design a security gate policy that blocks critical findings without encouraging bypass."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect answers to the cost of late fixes."
   ],
   [
    12,
    "Teach",
    "Walk through requirements and abuse cases, threat modeling, then the testing tools in a comparison table on the whiteboard (needs code, needs running app, finds what). Finish with pipeline integrity controls and gate tuning."
   ],
   [
    18,
    "Activity",
    "Run the Pipeline Design card sort in groups of three."
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
  "warmup": "If you found a crack in a house's foundation, would you rather find it on the blueprint, during construction, or after the family moved in? Why?",
  "activity": {
   "title": "Pipeline Design Card Sort",
   "materials": "Printed cards the teacher makes: one set of stage cards (Requirements, Design, Commit/Pull request, Build, Test/Staging, Deploy, Operate) and one set of control cards (threat model, abuse cases, SAST, secret scanning, SCA, SBOM, DAST, IAST, fuzzing, branch protection, ephemeral runners, artifact signing, provenance check at deploy, pen test). A large sheet of paper or whiteboard per group.",
   "steps": [
    "Groups lay the stage cards out left to right as a pipeline.",
    "Groups place each control card under the stage where it fits best and write one sentence on a sticky note explaining what it catches.",
    "The teacher hands each group a finding card, such as 'critical SQL injection from SAST' or 'low-severity outdated library from SCA', and the group decides block, ticket or exception.",
    "The teacher then reads an attack card: 'An attacker modifies the workflow file to add a malicious build step.' Groups identify which controls on their board would prevent or detect it, and add any that are missing.",
    "Groups compare boards with a neighboring group and resolve one disagreement."
   ]
  },
  "discussion": [
   "Which testing tool would you add first to a team that has none, and why?",
   "How do you decide which findings should block a release?",
   "Why is a build server an attractive target compared with a single developer laptop?"
  ],
  "exit": [
   [
    "Which tool needs source code but not a running application?",
    "SAST."
   ],
   [
    "What does SCA find that SAST and DAST typically do not?",
    "Known vulnerabilities and license issues in third-party and open-source components, often producing an SBOM."
   ],
   [
    "Name two controls that protect the integrity of a CI/CD pipeline.",
    "Any two of: branch protection with required reviews, least-privilege secrets in a secrets manager, ephemeral runners, pinned dependencies, signed artifacts, provenance attestations."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-column cheat card (tool, what it needs, what it finds) for SAST, DAST and SCA before the card sort.",
   "Extend: Ask fast finishers to write a short gate policy covering severity thresholds, exception approval and expiry, and the metrics they would report monthly."
  ]
 },
 {
  "t": "Integrating security controls and troubleshooting: firewalls, WAF, proxies, IDS/IPS, SIEM and log collection",
  "objectives": [
   "Students will be able to predict the outcome of traffic against an ordered firewall rule base with an implicit deny.",
   "Students will be able to distinguish IDS from IPS and signature-based from anomaly-based detection.",
   "Students will be able to recommend a targeted fix for a false positive and a structured check for a false negative.",
   "Students will be able to diagnose common SIEM collection problems such as missing sources and time drift."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the smoke detector and toaster, and link it to false positives."
   ],
   [
    12,
    "Teach",
    "Cover rule order and implicit deny with a projected rule table, WAF and proxy roles, IDS versus IPS, detection methods, false positive and false negative handling, and SIEM issues."
   ],
   [
    18,
    "Activity",
    "Run the Troubleshooting Stations activity in pairs."
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
  "warmup": "Your smoke detector goes off every time you make toast. What are your options, and which one keeps you safest?",
  "activity": {
   "title": "Troubleshooting Stations",
   "materials": "Four printed station sheets the teacher prepares: a short firewall rule table, a WAF log excerpt, an IDS placement diagram, and two SIEM event lists with mismatched timestamps. Answer sheets for each pair.",
   "steps": [
    "Set up four stations around the room and have pairs rotate every four minutes.",
    "Station 1 (Firewall): pairs trace three sample connections through an ordered rule table and identify which rule matches and why syslog is being blocked.",
    "Station 2 (WAF): pairs read a log excerpt with rule ID, path and parameter, decide whether it is a false positive, and write the narrowest exception they can.",
    "Station 3 (IDS): pairs look at a diagram where the sensor only watches the internet link and explain why lateral movement between servers was missed, then propose a better placement.",
    "Station 4 (SIEM): pairs compare two event lists and identify time drift as the reason a correlation rule failed, then state the fix.",
    "Review answers as a class, asking one pair per station to explain their reasoning."
   ]
  },
  "discussion": [
   "Why is 'turn it off' such a common response to false positives, and how can a security team make tuning faster so people stop asking for it?",
   "What are the trade-offs of putting an IPS inline in front of a critical application?",
   "How would you detect that a log source has stopped sending data?"
  ],
  "exit": [
   [
    "A broad allow rule is above a specific deny. Which takes effect?",
    "The broad allow, because the first matching rule wins."
   ],
   [
    "A WAF blocks one legitimate form field. What is the correct fix?",
    "A narrow, documented exception for that rule, field and path, not disabling the WAF."
   ],
   [
    "Events from two sources appear out of order in the SIEM. What should you check first?",
    "Time synchronization (NTP) and time zone consistency between the sources."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a flowchart card for false negatives: Can it see the traffic? Is it decrypted? Are rules current? Is it blocking or alerting? Are logs collected?",
   "Extend: Ask fast finishers to rewrite the station 1 rule table so it meets the same business needs with the fewest rules and no rule shadowing another."
  ]
 },
 {
  "t": "Data security architecture: classification, labeling, DLP, data lifecycle, tokenization and masking",
  "objectives": [
   "Students will be able to design a simple classification scheme with handling rules for each level.",
   "Students will be able to explain how DLP protects data in motion, at rest and in use.",
   "Students will be able to choose between tokenization, static masking, dynamic masking, anonymization and pseudonymization for a stated need.",
   "Students will be able to identify a control for each stage of the data lifecycle."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list the places students say their own data might be copied."
   ],
   [
    13,
    "Teach",
    "Cover classification and owners, labeling, DLP in three states, the lifecycle with a control per stage, then a comparison table for tokenization, masking types, anonymization, pseudonymization and hashing."
   ],
   [
    17,
    "Activity",
    "Run the Match the Protection card sort in groups of three."
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
  "warmup": "When you give a store your phone number at checkout, how many places do you think that number ends up? Who should be able to see it?",
  "activity": {
   "title": "Match the Protection",
   "materials": "Printed scenario cards the teacher makes (about ten), printed technique cards (tokenization, static masking, dynamic masking, anonymization, pseudonymization, salted hashing, DLP block, crypto-shredding, classification label), sticky notes.",
   "steps": [
    "Give each group both card sets. Scenario examples: 'developers need realistic test data', 'analysts need to count repeat card customers', 'researchers need data that can never identify patients', 'agents should see only the last four digits', 'staff keep emailing claim files to personal accounts', 'archived cloud backups must be destroyed'.",
    "Groups match each scenario to the best technique and write a one-line reason on a sticky note.",
    "For each match, groups also name one technique that would be a wrong answer and why, mirroring exam distractors.",
    "Groups pick one dataset (for example, student records) and write a four-level classification scheme with one handling rule per level.",
    "Groups share two matches with the class, and the teacher resolves disagreements."
   ]
  },
  "discussion": [
   "Why do test and analytics copies often end up less protected than production, and how would you prevent that?",
   "When is it worth the effort to anonymize data rather than pseudonymize it?",
   "How can DLP rules become so strict that they push people toward riskier workarounds?"
  ],
  "exit": [
   [
    "Which technique lets analysts correlate records for the same card without seeing the number?",
    "Consistent tokenization."
   ],
   [
    "Is pseudonymized data still personal data? Why?",
    "Yes, because it can be re-identified using additional information held separately."
   ],
   [
    "Name the three data states DLP can inspect.",
    "Data in motion, data at rest and data in use."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-question decision aid: 'Do you ever need the original value back?' and 'Who needs to see it?' to help struggling students choose techniques.",
   "Extend: Ask fast finishers to explain how combining a few non-identifying fields, such as postal code, birth date and gender, can re-identify people, and what that means for anonymization claims."
  ]
 },
 {
  "t": "Identity and access architecture: federation (SAML, OIDC, OAuth 2.0), SSO, conditional access and privileged access management",
  "objectives": [
   "Students will be able to explain how SSO and federation centralize authentication through an identity provider.",
   "Students will be able to distinguish SAML, OIDC and OAuth 2.0 and select the right one for a scenario.",
   "Students will be able to design a conditional access policy using user, device, location and risk signals.",
   "Students will be able to recommend PAM and identity governance controls to remove standing privilege and privilege creep."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and count how many separate passwords students think they have."
   ],
   [
    13,
    "Teach",
    "Draw the SSO flow with IdP and service providers, then compare SAML, OIDC and OAuth 2.0 in a table (format, purpose, token). Cover PKCE, conditional access, phishing-resistant MFA, PAM practices and joiner-mover-leaver."
   ],
   [
    17,
    "Activity",
    "Run the Pick the Protocol and Fix the Access activity in pairs."
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
  "warmup": "If you left a job today, how many separate logins would someone need to remember to turn off? What could go wrong if they missed one?",
  "activity": {
   "title": "Pick the Protocol and Fix the Access",
   "materials": "Printed scenario cards the teacher writes (protocol scenarios and access review scenarios), a printed mock access report listing users, roles and entitlements, pens.",
   "steps": [
    "Part 1: give pairs six protocol cards, such as 'enterprise SaaS sign-in for employees', 'mobile app calling an API for the user', 'nightly batch job calling another service', and 'web app needs the user's name and email'. Pairs choose SAML, OIDC, OAuth authorization code with PKCE, or client credentials, and justify each.",
    "Part 2: give pairs a mock access report for a fictional company with about 15 users, including a leaver with active SaaS accounts, a mover with old finance rights, and three permanent admins.",
    "Pairs mark each problem and propose the control that fixes it (automated deprovisioning through the IdP, access review, just-in-time PAM, separate admin accounts).",
    "Pairs write one conditional access policy in plain language for the finance application, naming conditions and the resulting action.",
    "Two pairs compare answers and agree on the single highest-risk finding."
   ]
  },
  "discussion": [
   "Why is it dangerous to treat an OAuth access token as proof of who the user is?",
   "What are the risks of putting all authentication behind one identity provider, and how do you reduce them?",
   "How would you persuade administrators who resist giving up their permanent admin rights?"
  ],
  "exit": [
   [
    "Which standard issues an ID token describing the user?",
    "OpenID Connect."
   ],
   [
    "Which OAuth flow is recommended for mobile and single-page apps?",
    "The authorization code flow with PKCE."
   ],
   [
    "What problem does just-in-time privileged access solve?",
    "Standing privilege, where admin rights are always available and can be abused if the account is compromised."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-row reference card: SAML equals XML assertions for sign-in; OIDC equals ID token for sign-in; OAuth equals access token for API permission.",
   "Extend: Ask fast finishers to list the checks a relying party must perform on an ID token (signature, issuer, audience, expiry) and explain what attack each check prevents."
  ]
 },
 {
  "t": "Cloud security architecture: shared responsibility, CASB, SASE, cloud workload protection and CSPM",
  "objectives": [
   "Students will be able to assign security responsibilities to provider or customer for IaaS, PaaS and SaaS.",
   "Students will be able to distinguish CSPM, CWPP, CNAPP and CASB by what they protect.",
   "Students will be able to explain how SASE combines SD-WAN with security service edge components.",
   "Students will be able to recommend cloud architecture practices such as central logging and account separation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about renting and responsibilities."
   ],
   [
    12,
    "Teach",
    "Draw a shared responsibility grid with rows for physical, hypervisor, OS, runtime, application, identity and data, and columns for IaaS, PaaS and SaaS. Then cover CSPM versus CWPP, CNAPP, CASB modes and SASE/SSE components."
   ],
   [
    18,
    "Activity",
    "Run the Whose Job Is It and Which Tool activity in groups of three."
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
  "warmup": "If you rent a furnished apartment and a burglar gets in through a window you left open, whose fault is it? What if the building's main door lock was broken?",
  "activity": {
   "title": "Whose Job Is It and Which Tool",
   "materials": "Printed responsibility grid (blank) per group, a stack of printed task cards the teacher makes, a second stack of scenario cards, sticky notes.",
   "steps": [
    "Groups fill in the blank responsibility grid by placing task cards such as 'patch guest OS', 'replace failed disks', 'configure bucket access', 'manage user accounts', 'patch database engine' in the right cell for IaaS, PaaS and SaaS.",
    "Review the grid as a class, highlighting that data and identity are always the customer's job.",
    "Groups then draw scenario cards, such as 'public buckets in many accounts', 'malware running in a container', 'staff using unapproved file-sharing apps', 'branch offices backhaul all traffic', and match each to CSPM, CWPP, CASB or SASE with a one-line reason.",
    "Each group writes one policy-as-code rule in plain language that would have prevented the public bucket in the hook.",
    "Groups share one tricky card and how they decided."
   ]
  },
  "discussion": [
   "Why do misconfigurations, rather than provider failures, cause most cloud breaches?",
   "What are the trade-offs between API-based and inline CASB deployment?",
   "How does separating environments into different accounts limit damage from a compromise?"
  ],
  "exit": [
   [
    "In IaaS, who is responsible for patching the guest operating system?",
    "The customer."
   ],
   [
    "Which tool would find storage buckets that anyone can read across many cloud accounts?",
    "CSPM."
   ],
   [
    "What two broad things does SASE combine?",
    "Wide area networking (SD-WAN) and cloud-delivered security services (SSE)."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pre-filled grid with only the IaaS column complete and ask them to work out what moves to the provider in PaaS and SaaS.",
   "Extend: Ask fast finishers to design a multi-account structure for a company, naming which account holds central logs and which guardrails apply at the organization level."
  ]
 },
 {
  "t": "Container and serverless security: image scanning, orchestration hardening, secrets management and API gateways",
  "objectives": [
   "Students will be able to describe secure image practices including minimal bases, scanning, signing and non-root execution.",
   "Students will be able to recommend Kubernetes hardening controls such as RBAC, network policies, admission control and secret encryption.",
   "Students will be able to explain why secrets must be injected at run time and prefer workload identities.",
   "Students will be able to identify the customer's security responsibilities for serverless functions and the role of API gateways and service meshes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the layered sandwich, and reveal the hook scenario."
   ],
   [
    12,
    "Teach",
    "Draw an image as stacked layers and show why deleted files persist. Then cover scanning and signing, run-time settings, Kubernetes RBAC, namespaces, network policies, admission control, secret handling and workload identity, serverless responsibilities, API gateways and service meshes."
   ],
   [
    18,
    "Activity",
    "Run the Review the Manifest activity in pairs."
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
  "warmup": "If you write a password on a sheet of paper, then tape a blank sheet over it, is the password gone? What if you photocopy the stack and hand it out?",
  "activity": {
   "title": "Review the Manifest",
   "materials": "A projected or printed short container build file and a short Kubernetes deployment description the teacher writes in plain text, containing deliberate problems; highlighters.",
   "steps": [
    "Give each pair the printed build file with issues such as an unpinned large base image, a step that copies an environment file with a key and later deletes it, and no user instruction so it runs as root.",
    "Pairs highlight each problem and write the fix beside it (minimal pinned base, no secret in the build, run as a non-root user, multi-stage build).",
    "Give pairs the deployment description with issues such as privileged mode enabled, a host path mount, a service account with cluster-wide rights, no network policy and an image from an unknown registry.",
    "Pairs list fixes and name which control would catch each one automatically (admission control, pod security standards, RBAC review, network policy).",
    "Pairs write the three steps they would take in the first hour after finding the leaked key in the hook scenario.",
    "Review as a class, focusing on why rotation comes before cleanup."
   ]
  },
  "discussion": [
   "Why are short-lived workload credentials safer than a well-protected static key?",
   "What responsibilities remain with the customer when using serverless functions?",
   "When would you add a service mesh, and what does it add beyond network policies?"
  ],
  "exit": [
   [
    "A secret was added in one image layer and deleted in a later layer. Is it exposed?",
    "Yes. Earlier layers can be extracted, so the secret is exposed and must be rotated."
   ],
   [
    "Name two Kubernetes controls that limit the blast radius of a compromised pod.",
    "Any two of: network policies, least-privilege service accounts and RBAC, pod security standards blocking privileged pods, namespaces."
   ],
   [
    "What does an API gateway centralize for services behind it?",
    "Authentication, authorization, rate limiting, input validation and logging."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a checklist card with five image rules (minimal base, pinned version, scanned, signed, non-root) and five cluster rules to tick off while reviewing.",
   "Extend: Ask fast finishers to explain how a workload identity exchange works conceptually and why it removes the need to store long-lived keys anywhere."
  ]
 },
 {
  "t": "Hybrid and multicloud design: connectivity, key management, consistent policy and cloud-to-on-premises integration",
  "objectives": [
   "Students will be able to compare VPN and dedicated private connectivity and explain why routes should be limited.",
   "Students will be able to explain how federated identity and workload identities unify access across environments.",
   "Students will be able to compare provider-managed keys, BYOK and HYOK in terms of control and operational burden.",
   "Students will be able to recommend policy as code, central logging and a control matrix for consistent multicloud governance."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about running branches in different countries."
   ],
   [
    12,
    "Teach",
    "Draw on-premises plus two clouds connected through a hub. Cover connectivity options and route limits, federated identity and workload identity, the key management spectrum from provider-managed to BYOK to HYOK, policy as code, central logging and residency."
   ],
   [
    18,
    "Activity",
    "Run the Unify the Estate whiteboard design in groups of three or four."
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
  "warmup": "If a company had offices in three countries, each with its own rules and its own keys, what problems might the head office run into during an audit?",
  "activity": {
   "title": "Unify the Estate",
   "materials": "Whiteboard or large paper per group, markers, printed 'current state' cards the teacher writes describing a fictional company's three environments and their inconsistencies, and a printed requirement card.",
   "steps": [
    "Give each group a current-state card: on-premises with its own directory and HSM, Cloud A with local accounts and provider-managed keys, Cloud B with a shared static access key, logs going to two different places, and flat routing between environments.",
    "Groups draw the current state and mark every inconsistency or gap in red.",
    "Groups redraw a target design showing the connectivity (VPN or private link, encryption, hub), the single IdP, workload identities, a chosen key approach with justification, central SIEM and policy-as-code checkpoints.",
    "Give each group a requirement card, such as 'regulator requires the company to be able to revoke provider access to keys' or 'customer data must stay in one country', and have them adjust the design.",
    "Groups build a three-row control matrix showing how one requirement is implemented in each environment.",
    "Each group presents its key management choice and trade-off in one minute."
   ]
  },
  "discussion": [
   "When is BYOK enough, and when would you go to the effort of HYOK?",
   "How can data egress costs indirectly weaken security, and how would you address that with leadership?",
   "What are the risks of depending on a single identity provider for every environment?"
  ],
  "exit": [
   [
    "Is a dedicated private cloud connection encrypted by default?",
    "Not necessarily; encryption should be added where policy or regulation requires it."
   ],
   [
    "What is the main trade-off of HYOK?",
    "Maximum control and separation from the provider, at the cost of operational burden, availability risk and possible feature limits."
   ],
   [
    "Name two ways to keep policy consistent across clouds.",
    "Any two of: policy as code, common tagging and classification, central SIEM logging, multicloud posture management, a single identity provider."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a spectrum diagram from provider-managed keys to BYOK to HYOK labeled 'more convenience' on one end and 'more control and more work' on the other.",
   "Extend: Ask fast finishers to write two policy-as-code rules in plain language that would apply identically in both clouds, and explain how each provider's terminology differs for the same control."
  ]
 },
 {
  "t": "Secure architecture for remote access and collaboration: VPN, ZTNA, VDI and secure email gateways",
  "objectives": [
   "Students will be able to compare full-tunnel VPN, split-tunnel VPN, ZTNA and VDI by access scope and data exposure.",
   "Students will be able to select the right remote access model for a stated business requirement.",
   "Students will be able to explain the role of bastion hosts in administrative access.",
   "Students will be able to describe how secure email gateways and SPF, DKIM and DMARC protect email."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect it to the contractor ticket in the hook."
   ],
   [
    12,
    "Teach",
    "Draw four access models side by side: full-tunnel VPN, split-tunnel VPN, ZTNA and VDI, showing what the device can reach and where data lives. Then cover bastion hosts, secure email gateway functions and the SPF, DKIM, DMARC chain."
   ],
   [
    18,
    "Activity",
    "Run the Choose the Access Model card activity in groups of three."
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
  "warmup": "If a visitor to your building needed to attend one meeting, would you give them a master key, an escort to that room, or a window to watch from? When would each make sense?",
  "activity": {
   "title": "Choose the Access Model",
   "materials": "Printed requirement cards the teacher writes (about eight), printed model cards (full-tunnel VPN, split-tunnel VPN, ZTNA, VDI, bastion host, secure email gateway, DMARC reject), a printed sample email gateway log excerpt, sticky notes.",
   "steps": [
    "Give each group the requirement cards, such as 'contractors need two apps from personal laptops', 'data must never be stored on unmanaged devices', 'all employee web traffic must be inspected', 'admins must reach OT systems through one monitored point', 'stop spoofed mail from our own domain'.",
    "Groups match each requirement to one or more model cards and write a one-line reason, plus one tempting wrong answer and why it fails.",
    "Groups read the sample gateway log excerpt and identify which messages were quarantined, why, and which one shows a lookalike domain that SPF, DKIM and DMARC would not catch.",
    "Groups sketch a one-page design for the 200 new contractors from the hook, naming the access model, device checks and data controls.",
    "Each group presents its contractor design in one minute, and the class votes on the clearest justification."
   ]
  },
  "discussion": [
   "When would you still choose a VPN over ZTNA today?",
   "What risks remain even when contractors use VDI with clipboard and downloads disabled?",
   "Why is moving DMARC straight to reject risky, and how would you get there safely?"
  ],
  "exit": [
   [
    "Which model gives per-application access without placing the user on the network?",
    "ZTNA."
   ],
   [
    "What is the main security drawback of split tunneling?",
    "Loss of visibility and inspection of the device's direct internet traffic."
   ],
   [
    "Which email control tells receivers what to do when SPF or DKIM checks fail?",
    "DMARC."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-question decision card: 'Should the user be on the network?' and 'May data land on the device?' to guide their choice of model.",
   "Extend: Ask fast finishers to design a phased migration from VPN to ZTNA for a company with 2,000 users, including which user groups move first and how success is measured."
  ]
 },
 {
  "t": "Troubleshooting IAM: authentication failures, federation trust issues, certificate-based auth and MFA problems",
  "objectives": [
   "Students will be able to isolate the failing component in an authentication chain using the scope of impact and recent changes.",
   "Students will be able to explain how IdP signing certificate rotation, entity ID mismatches and missing claims break federation.",
   "Students will be able to diagnose certificate-based authentication failures involving validity, chain trust, extended key usage and revocation reachability.",
   "Students will be able to distinguish MFA configuration faults from MFA fatigue attacks and choose fixes that keep controls in place."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the whiteboard. Point out how many answers involve turning something off, and say that today is about fixing the broken link instead."
   ],
   [
    12,
    "Teach",
    "Draw the authentication chain on the board: account, credential, time, trust, policy. Walk through one failure at each link: locked account, Kerberos skew, IdP certificate rotation, CRL unreachable, conditional access block. Stress the scope rule: one user, one app, one machine, or everyone."
   ],
   [
    18,
    "Activity",
    "Run the Symptom Triage card activity in groups of three or four. Circulate and ask each group which log they would open first and what a bad fix would look like."
   ],
   [
    5,
    "Discuss",
    "Each group presents one card, its diagnosis and its fix. Use the discussion questions to compare risky shortcuts with proper fixes."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on paper or a sticky note and hand them in."
   ]
  ],
  "warmup": "Your boss says: users cannot sign in to one app, so just disable signature checking until Monday. What would you say back, and why?",
  "activity": {
   "title": "Symptom Triage Cards",
   "materials": "Printed scenario cards (one symptom and a short log excerpt each), sticky notes in two colors, whiteboard.",
   "steps": [
    "Prepare eight cards before class, such as: one kiosk fails Kerberos after a snapshot restore; one SaaS app shows invalid signature after an IdP certificate rotation; all Wi-Fi certificate logins fail after a server was decommissioned; one user gets repeated unexpected push prompts; a user is authenticated but the app cannot find the account; TOTP codes fail only against one RADIUS server; a traveling executive is blocked by a location policy; a renamed employee fails sign-in with an old UPN.",
    "Groups sort cards into the chain link that failed: account, time, trust or federation, certificate, MFA or policy.",
    "For each card, groups write the likely cause on one sticky note color and the correct fix on the other, plus one log source they would check.",
    "Groups mark any card that is an attack rather than a fault and list the response steps.",
    "Groups place their notes on the board under the matching chain link for comparison."
   ]
  },
  "discussion": [
   "When is it acceptable to grant a temporary MFA exemption, and what conditions should come with it?",
   "Why do apps configured by hand break during certificate rotation while metadata-driven apps keep working, and how would you prevent the next outage?"
  ],
  "exit": [
   [
    "Every federated app works except one, which shows a signature error after the weekend. What is the most likely cause?",
    "The IdP rotated its signing certificate and that app still trusts the old one; update its certificate or metadata."
   ],
   [
    "Why do valid smart card certificates fail for everyone when the CRL server goes offline?",
    "Revocation checking is required and fails closed when the CRL distribution point cannot be reached."
   ],
   [
    "A user gets push prompts she did not start. What does it indicate and what should happen?",
    "An MFA fatigue attempt with a compromised password; reset the password, review sign-in logs and enable number matching or phishing-resistant MFA."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page chain diagram with each link labeled and two example log lines per link, and let them match cards to the diagram before writing fixes.",
   "Extend: Ask fast finishers to write a short runbook for an IdP signing certificate rotation that prevents the outage entirely, including notification, dual-certificate overlap and verification steps."
  ]
 },
 {
  "t": "Endpoint and server hardening: secure baselines, application allow lists, EDR, host firewalls and patching",
  "objectives": [
   "Students will be able to describe what a secure baseline contains and how drift is detected and corrected at scale.",
   "Students will be able to compare application allow listing and block listing and select allow listing for fixed-function systems.",
   "Students will be able to explain how EDR, XDR and host firewalls detect threats and limit lateral movement.",
   "Students will be able to outline a risk-prioritized patch process that includes firmware, third-party software and unpatchable systems."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. List student answers and circle the ones that would still work across 4,000 machines."
   ],
   [
    12,
    "Teach",
    "Present the five layers: baseline, allow list, EDR, host firewall, patching. For each, show a short sample artifact on the projector: a baseline line item, an allow list rule, an EDR process tree, a firewall rule, a patch report."
   ],
   [
    18,
    "Activity",
    "Run the Hardening Plan Match activity. Groups receive system cards and build a layered plan for each."
   ],
   [
    5,
    "Discuss",
    "Groups compare plans. Highlight where groups chose allow listing versus EDR and why."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If you could change only three settings on every company laptop tomorrow, which would you choose and why?",
  "activity": {
   "title": "Hardening Plan Match",
   "materials": "Printed system cards, printed control cards, whiteboard, markers.",
   "steps": [
    "Give each group four system cards: point-of-sale terminal, public-facing web server, developer laptop, legacy file server that cannot be patched for six months.",
    "Give each group a deck of control cards: CIS baseline, allow listing (hash), allow listing (publisher), EDR, host firewall inbound rules, host firewall outbound rules, FIM, full-disk encryption, LAPS-style local admin passwords, isolation, risk acceptance.",
    "Groups assign the strongest three controls to each system and write one sentence justifying each choice.",
    "For the legacy server, groups must write a compensating control plan and name who formally accepts residual risk.",
    "Each group posts its plan on the board for comparison."
   ]
  },
  "discussion": [
   "Where does application allow listing become impractical, and what would you use instead on those systems?",
   "How should a patch team decide between a critical-score vulnerability on an internal server and a medium-score one being actively exploited on an internet-facing server?"
  ],
  "exit": [
   [
    "Which control best stops unknown malware on a kiosk?",
    "Application allow listing, because it blocks anything not approved, including malware with no known signature."
   ],
   [
    "What capability separates EDR from traditional antivirus?",
    "Behavioral detection using recorded activity such as process trees and command lines, plus response actions like isolating a host."
   ],
   [
    "A scan shows 80 servers no longer match the baseline. What is this called and how is it fixed at scale?",
    "Configuration drift; configuration management reapplies the baseline automatically and continuous scans report future drift."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column cheat sheet listing each control and the single problem it best solves, and pair struggling students with a partner for the card activity.",
   "Extend: Ask fast finishers to draft a rollout plan for allow listing across 900 stores, including audit mode duration, exception handling and how patches update the rules."
  ]
 },
 {
  "t": "Hardware security: TPM, HSM, secure boot, measured boot, secure enclaves and firmware integrity",
  "objectives": [
   "Students will be able to compare a TPM and an HSM by scope, purpose and typical use cases.",
   "Students will be able to distinguish Secure Boot, measured boot and remote attestation and explain how they work together.",
   "Students will be able to explain how secure enclaves and confidential computing protect data in use.",
   "Students will be able to recommend firmware integrity and supply chain controls for a device fleet."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers. Lead students to realize that software scanners depend on the layers beneath them."
   ],
   [
    12,
    "Teach",
    "Draw a vertical stack: hardware, firmware, bootloader, kernel, OS, apps. Place TPM, Secure Boot, measured boot, attestation and enclaves on the stack. Contrast TPM and HSM with a side-by-side table."
   ],
   [
    18,
    "Activity",
    "Run the Boot Chain Role-Play. Students act out a boot sequence and an attestation decision."
   ],
   [
    5,
    "Discuss",
    "Debrief the role-play using the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If malware loads before the operating system, can antivirus running inside the operating system ever find it? Why or why not?",
  "activity": {
   "title": "Boot Chain Role-Play",
   "materials": "Index cards labeled Firmware, Bootloader, Kernel, TPM, Verifier; a few cards marked 'signed' or 'unsigned'; whiteboard for the PCR log.",
   "steps": [
    "Assign roles: Firmware, Bootloader, Kernel, TPM (records hashes on the whiteboard), and Verifier (holds a known-good list).",
    "Round one, Secure Boot only: each component shows its signed card to the previous one before running. Hand the Bootloader an unsigned card and have Firmware refuse it.",
    "Round two, measured boot only: no blocking, but the TPM writes each component name on the board as it loads. Swap in an unsigned bootloader and let it run.",
    "Round three, attestation: the TPM signs the list and hands it to the Verifier, who compares it with the known-good list and grants or denies access.",
    "Groups write one sentence each on what was prevented, what was recorded and who made the final decision."
   ]
  },
  "discussion": [
   "Why might an organization want both Secure Boot and measured boot instead of choosing one?",
   "What supply chain risks could defeat a TPM or Secure Boot before a device is ever powered on, and how would you reduce them?"
  ],
  "exit": [
   [
    "What is the difference between Secure Boot and measured boot?",
    "Secure Boot blocks unsigned boot components; measured boot records hashes of what loaded into the TPM without blocking."
   ],
   [
    "Why is an HSM, not a TPM, used for a CA's signing key?",
    "An HSM is a tamper-resistant shared device built for high-volume key use by many applications with controlled administration; a TPM serves one device."
   ],
   [
    "What does a secure enclave protect that disk encryption does not?",
    "Data in use, during processing, even from the operating system or hypervisor."
   ]
  ],
  "differentiation": [
   "Support: Give students a three-row table (prevents, records, decides) to fill in during the role-play, with Secure Boot, measured boot and attestation pre-labeled.",
   "Extend: Ask fast finishers to design a device health policy for contractors that combines attestation, firmware passwords and conditional access, and to name what happens when attestation fails."
  ]
 },
 {
  "t": "Specialized and legacy systems: OT/ICS/SCADA, IoT, embedded systems and compensating controls",
  "objectives": [
   "Students will be able to identify SCADA, DCS, PLC and HMI components and explain why protocols like Modbus and DNP3 are risky.",
   "Students will be able to explain why safety and availability drive OT security decisions and why active scanning is risky.",
   "Students will be able to design segmentation using zones and conduits, an industrial DMZ and data diodes.",
   "Students will be able to select compensating controls for IoT and legacy systems and describe formal risk acceptance."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and discuss how priorities shift when physical safety is involved."
   ],
   [
    12,
    "Teach",
    "Draw a simplified Purdue stack on the board from process to enterprise. Place PLCs, HMIs, historian, industrial DMZ and corporate IT on it. Explain zones and conduits, data diodes and vendor jump hosts."
   ],
   [
    18,
    "Activity",
    "Run the Plant Network Redesign whiteboard activity in groups."
   ],
   [
    5,
    "Discuss",
    "Groups present one design decision each; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A hospital's infusion pump has a known vulnerability and no patch. Would you turn it off until it is fixed? What else could you do?",
  "activity": {
   "title": "Plant Network Redesign",
   "materials": "Printed flat-network diagram of a small plant (PLCs, HMIs, historian, engineering workstation, office PCs, vendor remote access tool, cameras, all on one network), whiteboard or large paper, markers.",
   "steps": [
    "Give each group the flat diagram and a requirement list: corporate needs historian data, vendors need occasional remote access, nothing on corporate may reach the PLCs, cameras must not reach the internet.",
    "Groups redraw the network into zones, label each conduit with the only allowed traffic and place an industrial DMZ.",
    "Groups choose where a data diode belongs and where a monitored jump host with MFA belongs.",
    "Groups list two compensating controls for the unpatchable HMIs and name who signs the risk acceptance.",
    "Groups mark where a passive monitoring sensor would watch traffic and name one alert it should raise."
   ]
  },
  "discussion": [
   "How would you convince plant engineers that a security change will not threaten uptime?",
   "What procurement requirements would prevent the next generation of IoT devices from becoming tomorrow's legacy risk?"
  ],
  "exit": [
   [
    "Name the ISA/IEC 62443 concept for grouping assets and controlling paths between them.",
    "Zones and conduits."
   ],
   [
    "Why is passive monitoring preferred over active scanning in OT?",
    "It observes traffic without sending packets to fragile devices, so it does not risk crashing controllers."
   ],
   [
    "What should vendor remote access to an HMI go through?",
    "A monitored jump host with MFA, time-limited approval and session recording."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed zone diagram with the industrial DMZ already drawn, so students focus on placing devices and labeling conduits.",
   "Extend: Ask fast finishers to write a one-paragraph compensating control memo for an unpatchable HMI, including residual risk, owner, review date and replacement plan."
  ]
 },
 {
  "t": "Security automation: scripting (PowerShell, Python, Bash), SOAR playbooks, infrastructure as code and configuration drift",
  "objectives": [
   "Students will be able to read a short PowerShell, Python or Bash snippet and explain what it does and what safety controls are missing.",
   "Students will be able to design a SOAR playbook with appropriate automated steps and human approval points.",
   "Students will be able to explain the security benefits of infrastructure as code and policy as code.",
   "Students will be able to identify configuration drift and describe how to detect and remediate it."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and tally how many repetitive tasks students name. Introduce the idea that automation amplifies both good and bad work."
   ],
   [
    12,
    "Teach",
    "Show two short scripts on the projector and read them line by line. Then draw a phishing playbook as a flowchart and mark where a human approves. Finish with an IaC template, a manual change and a drift report."
   ],
   [
    18,
    "Activity",
    "Run the Build a Playbook sticky-note activity in groups."
   ],
   [
    5,
    "Discuss",
    "Groups compare where they placed human approvals; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Name one security task you would hate to do by hand 200 times a week. What could go wrong if a script did it instead?",
  "activity": {
   "title": "Build a Playbook",
   "materials": "Sticky notes in three colors, whiteboard or large paper, printed scenario card for a reported phishing email.",
   "steps": [
    "Give each group the phishing scenario and three sticky colors: automated step, decision point, human approval.",
    "Groups lay out a playbook flow from report received to ticket closed, including indicator extraction, reputation check, mailbox search, quarantine, sender block and user notification.",
    "Groups must mark at least one step that requires human approval and justify why.",
    "Teacher introduces a twist: the reported email came from the CEO's account. Groups adjust the flow.",
    "Groups write two test cases they would run before turning the playbook on in production."
   ]
  },
  "discussion": [
   "Where is the line between helpful automation and dangerous automation in incident response?",
   "If an engineer makes a manual cloud change during an outage that fixes the problem, what should happen to that change afterward?"
  ],
  "exit": [
   [
    "What should you do before running a new account-disabling script in production?",
    "Peer review it, test with a dry run such as -WhatIf, add logging and error handling, and run with least privilege."
   ],
   [
    "A live firewall rule differs from the Terraform code. What is this and what is the fix?",
    "Configuration drift; reapply the declared state from code and route future changes through the pipeline."
   ],
   [
    "Name one action that should keep human approval in a SOAR playbook.",
    "Isolating a production server or disabling a critical account, because mistakes cause outages."
   ]
  ],
  "differentiation": [
   "Support: Give students an annotated version of the sample scripts with each line explained, and a playbook template with the first three steps filled in.",
   "Extend: Ask fast finishers to write pseudocode for a drift detection job that compares live security group rules with declared rules and opens a ticket for differences."
  ]
 },
 {
  "t": "Advanced cryptographic concepts: post-quantum cryptography, key stretching, forward secrecy, homomorphic encryption and envelope encryption",
  "objectives": [
   "Students will be able to explain why quantum computing threatens RSA, Diffie-Hellman and ECC more than symmetric algorithms, and describe harvest now, decrypt later.",
   "Students will be able to describe how salts and work factors in key stretching functions slow password guessing.",
   "Students will be able to explain how ephemeral key exchange provides forward secrecy.",
   "Students will be able to match scenarios to homomorphic encryption and envelope encryption and explain the benefits of each."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Collect guesses and note which students suspect old recordings are at risk."
   ],
   [
    12,
    "Teach",
    "Present the five concepts with one board sketch each: quantum threat table (asymmetric versus symmetric), salted slow hash, ephemeral key exchange per session, compute-on-ciphertext box, and DEK wrapped by KEK."
   ],
   [
    18,
    "Activity",
    "Run the Clue Match card sort in pairs, followed by a short envelope encryption role-play."
   ],
   [
    5,
    "Discuss",
    "Review contested cards and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If someone records your encrypted messages today but cannot read them, should you still worry? What would have to change for them to read those messages?",
  "activity": {
   "title": "Clue Match and Key Wrapping",
   "materials": "Printed clue cards and concept cards, envelopes, small paper slips, whiteboard.",
   "steps": [
    "Give each pair a set of 12 clue cards (for example: 'stolen server key, old sessions safe', 'cloud computes statistics on encrypted data', 'records must stay secret 30 years', 'rotate master key without re-encrypting', 'GPU cracking of password database') and five concept cards.",
    "Pairs match each clue to a concept and write the deciding word or phrase on the card.",
    "Envelope role-play: one student is the KMS holding a master envelope. Others write a short message (data), lock it with a paper slip key (DEK), and give the slip to the KMS to seal inside a labeled envelope (wrapping).",
    "The teacher announces a master key rotation. The KMS re-seals only the slip envelopes into a new outer envelope, showing that messages are untouched.",
    "Pairs write one sentence on why this is faster than re-encrypting everything."
   ]
  },
  "discussion": [
   "Which systems in a typical organization would you migrate to post-quantum algorithms first, and why?",
   "Why might a team choose hybrid classical plus post-quantum key exchange instead of switching entirely to new algorithms?"
  ],
  "exit": [
   [
    "What strategy makes post-quantum planning urgent today?",
    "Harvest now, decrypt later: attackers record encrypted data now to decrypt once quantum computers can break current public key algorithms."
   ],
   [
    "Why does ECDHE protect past sessions if the server's private key is stolen?",
    "Each session uses ephemeral keys that are discarded; the long-term key only authenticates the server."
   ],
   [
    "In envelope encryption, what is re-processed when the master key is rotated?",
    "Only the data keys are re-wrapped; the bulk data is not re-encrypted."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page clue glossary that pairs each concept with two trigger phrases, and let students use it during the card sort.",
   "Extend: Ask fast finishers to draft a crypto inventory template listing the fields they would collect (system, algorithm, key size, library, data lifetime, owner) and rank three sample systems for PQC migration."
  ]
 },
 {
  "t": "Cryptographic use cases: data at rest, in transit and in use, code signing, digital signatures and secure key exchange",
  "objectives": [
   "Students will be able to select encryption controls for data at rest, in transit and in use based on the threat and data state.",
   "Students will be able to explain how digital signatures provide integrity, authentication and non-repudiation, and which keys are used.",
   "Students will be able to describe the purpose of code signing and why signing keys need strong protection.",
   "Students will be able to distinguish ephemeral key exchange, hashing and HMAC by what each proves."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and sort student answers into hide, prove unchanged and prove who."
   ],
   [
    12,
    "Teach",
    "Draw a 3-by-4 grid: data states across the top, goals down the side. Fill in controls together: FDE, TDE, field-level, TLS, IPsec, SSH, enclaves, signatures, code signing, HMAC. Walk through signing and verifying with key labels."
   ],
   [
    18,
    "Activity",
    "Run the Auditor's Spreadsheet activity in groups."
   ],
   [
    5,
    "Discuss",
    "Groups defend one disputed row; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "What is the difference between locking a letter in a box and signing your name at the bottom? When would you need both?",
  "activity": {
   "title": "The Auditor's Spreadsheet",
   "materials": "Printed system worksheet (one row per system), projector, whiteboard.",
   "steps": [
    "Give each group a worksheet with eight systems: lost-prone sales laptops, customer database with bank numbers, public web portal, branch-to-HQ link, software update server, partner webhooks, contract approval workflow, cloud analytics on patient data.",
    "For each row, groups write the security goal, the data state and the control they would choose.",
    "Groups must name which key is used for any signature or encryption choice (signer's private, signer's public, recipient's public, shared secret).",
    "The teacher plays auditor and challenges two rows per group: why not TDE, why not HMAC, why not just TLS.",
    "Groups revise their worksheet and note the reason for each change."
   ]
  },
  "discussion": [
   "If a code-signing key were stolen, what would the publisher need to do, and why is that so damaging to customers?",
   "Why is protecting data in use harder than protecting data at rest or in transit, and how much should a typical organization invest in it?"
  ],
  "exit": [
   [
    "Which key creates a digital signature and which verifies it?",
    "The signer's private key creates it; the signer's public key verifies it."
   ],
   [
    "Which control hides bank account numbers from database administrators?",
    "Field-level or application-level encryption, because the database only ever stores ciphertext for those fields."
   ],
   [
    "Why does HMAC not provide non-repudiation?",
    "Both parties share the same secret key, so either could have generated the tag."
   ]
  ],
  "differentiation": [
   "Support: Provide a key-direction cheat card (encrypt for confidentiality: recipient public; sign: sender private; verify: sender public) and let students reference it throughout.",
   "Extend: Ask fast finishers to design a secure software release pipeline describing where signing happens, where the key lives, who can trigger signing and how customers verify."
  ]
 },
 {
  "t": "PKI engineering: certificate lifecycle, CA hierarchy, OCSP and CRLs, certificate pinning and mutual TLS",
  "objectives": [
   "Students will be able to design an offline root and online intermediate CA hierarchy and explain how it contains a CA compromise.",
   "Students will be able to sequence the certificate lifecycle and identify controls that prevent expiry outages.",
   "Students will be able to compare CRLs, OCSP and OCSP stapling, including fail-open and fail-closed behavior.",
   "Students will be able to explain the benefits and trade-offs of certificate pinning and mutual TLS."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and gather experiences of certificate warnings or expired certificates."
   ],
   [
    12,
    "Teach",
    "Draw the hierarchy tree on the board, then the lifecycle as a circle. Compare CRL, OCSP and stapling in a three-column table. Close with pinning and mTLS diagrams."
   ],
   [
    18,
    "Activity",
    "Run the PKI Incident Board activity with scenario cards and a whiteboard timeline."
   ],
   [
    5,
    "Discuss",
    "Review group answers; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Have you ever seen a browser warning that a connection is not private? What do you think the browser was checking?",
  "activity": {
   "title": "PKI Incident Board",
   "materials": "Printed incident cards, a printed sample certificate (fields listed in plain text: subject, SAN, issuer, validity, key usage, CRL distribution point, OCSP URL placeholder), whiteboard.",
   "steps": [
    "Give each group the sample certificate printout and four incident cards: portal certificate expired; name mismatch on a new hostname; VPN logins fail after a server decommission; issuing CA suspected compromised.",
    "For each incident, groups circle the certificate field involved and write the root cause.",
    "Groups write the immediate fix and the long-term prevention, such as ACME automation, inventory, SAN updates, highly available OCSP, or revoking an intermediate.",
    "Groups draw the CA hierarchy and show exactly which certificates must be reissued in the CA compromise scenario.",
    "Each group presents one incident to the class."
   ]
  },
  "discussion": [
   "Should revocation checking fail open or fail closed for a public website versus a VPN, and why?",
   "Is certificate pinning worth the operational cost for an internal application? What would change your answer?"
  ],
  "exit": [
   [
    "Why use an offline root with online intermediates?",
    "It protects the root key; a compromised intermediate can be revoked and replaced without changing clients' trust anchor."
   ],
   [
    "What advantage does OCSP stapling have over plain OCSP?",
    "The server attaches a signed status response to the handshake, which is faster and does not reveal the client's browsing to the responder."
   ],
   [
    "What breaks when an app pins a certificate and traffic passes through a TLS inspection proxy?",
    "The connection fails because the proxy's certificate does not match the pinned certificate or key."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of a certificate chain and a one-line definition of each certificate field before the activity.",
   "Extend: Ask fast finishers to write a certificate management policy outline covering inventory, maximum lifetimes, automation, alert recipients and revocation response times."
  ]
 },
 {
  "t": "Email and DNS security engineering: SPF, DKIM, DMARC, DNSSEC and S/MIME",
  "objectives": [
   "Students will be able to explain what SPF, DKIM and DMARC each verify, including envelope sender versus visible From and alignment.",
   "Students will be able to plan a staged DMARC rollout from p=none to p=reject using aggregate reports.",
   "Students will be able to distinguish DNSSEC from DoH and DoT by security goal.",
   "Students will be able to describe when S/MIME is needed instead of server-to-server TLS."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and show how easy it is to write any From address on a paper envelope."
   ],
   [
    12,
    "Teach",
    "Draw a message traveling from sender to receiver. Mark where SPF (connecting IP versus envelope sender), DKIM (signature header, DNS selector) and DMARC (alignment with From, policy, reports) are checked. Then contrast DNSSEC and DoH or DoT, and finish with S/MIME versus TLS."
   ],
   [
    18,
    "Activity",
    "Run the Header Detective activity with printed message headers and sample DNS records."
   ],
   [
    5,
    "Discuss",
    "Groups report verdicts; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If you mailed a letter with someone else's return address on it, would the post office stop you? How is email similar?",
  "activity": {
   "title": "Header Detective",
   "materials": "Printed message excerpts showing simplified Authentication-Results lines, From and Return-Path headers; printed sample SPF, DKIM and DMARC TXT records for a fictional domain; whiteboard.",
   "steps": [
    "Give each group four message excerpts: legitimate corporate mail, payroll vendor mail passing SPF only for the vendor's domain, a forwarded message where SPF fails but DKIM passes aligned, and a spoof using the company's From with an attacker's envelope domain.",
    "For each message, groups record SPF result, DKIM result, whether either aligns with the From domain and the DMARC outcome.",
    "Groups decide what each message would experience under p=none, p=quarantine and p=reject.",
    "Groups write the fix needed so the payroll vendor's mail passes DMARC.",
    "Groups draft a three-step rollout timeline for moving the fictional domain to p=reject."
   ]
  },
  "discussion": [
   "Why might a company hesitate to move to p=reject, and how do aggregate reports reduce that risk?",
   "Should an organization block DoH on corporate devices? What are the trade-offs between privacy and visibility?"
  ],
  "exit": [
   [
    "What does DMARC add that SPF and DKIM do not provide?",
    "Alignment with the visible From domain, a policy telling receivers how to handle failures, and reporting."
   ],
   [
    "What is the correct order of DMARC policies during rollout?",
    "p=none, then p=quarantine, then p=reject."
   ],
   [
    "Which technology prevents DNS cache poisoning, and which hides DNS queries from eavesdroppers?",
    "DNSSEC prevents forged answers; DoH or DoT encrypts queries."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision flowchart (SPF pass and aligned, or DKIM pass and aligned, then DMARC pass) for students to trace each message.",
   "Extend: Ask fast finishers to write DMARC, SPF and DKIM records for a fictional parked domain that never sends mail and explain each part."
  ]
 },
 {
  "t": "Mobile and endpoint management: MDM/UEM, containerization, device attestation and BYOD controls",
  "objectives": [
   "Students will be able to compare MDM, UEM and MAM by scope and select the right one for a deployment model.",
   "Students will be able to rank COBO, COPE, CYOD and BYOD by organizational control and privacy impact.",
   "Students will be able to explain how containerization and selective wipe protect corporate data on personal devices.",
   "Students will be able to describe how device attestation and conditional access block compromised devices."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and take a quick show of hands. Record reasons on the board under privacy and security."
   ],
   [
    12,
    "Teach",
    "Draw a phone split into personal and work halves. Explain MDM, MAM and UEM scope, then the four ownership models on a control spectrum. Finish with attestation feeding conditional access."
   ],
   [
    18,
    "Activity",
    "Run the Policy Negotiation role-play in groups of four."
   ],
   [
    5,
    "Discuss",
    "Groups share their negotiated policy; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Would you let your employer install software on your personal phone? What would they need to promise you first?",
  "activity": {
   "title": "Policy Negotiation Role-Play",
   "materials": "Printed role cards (security lead, HR representative, employee advocate, legal counsel), printed scenario sheet, whiteboard.",
   "steps": [
    "Give each group the scenario: a firm wants staff to access client files on personal phones, and a recent incident involved a rooted phone.",
    "Each student takes a role card with goals: security wants data protection, the employee advocate wants privacy, HR wants simple offboarding, legal wants defensible policy.",
    "Groups negotiate a BYOD policy covering management approach (MDM or MAM), containerization rules, attestation requirements, conditional access and what happens at offboarding.",
    "Groups must state explicitly what the company can and cannot see or do on the device.",
    "Each group writes its final policy as five short rules on the board."
   ]
  },
  "discussion": [
   "Where should the line be between protecting corporate data and respecting employee privacy on personal devices?",
   "Why is hardware-backed attestation more trustworthy than a compliance app reporting on its own device?"
  ],
  "exit": [
   [
    "Which approach fits personal phones where employees will not enroll the whole device?",
    "MAM with containerization, because it manages only corporate apps and data."
   ],
   [
    "What should IT do when a BYOD user leaves the company?",
    "Issue a selective wipe of corporate data and revoke access, leaving personal content intact."
   ],
   [
    "How is a jailbroken device prevented from reaching corporate email?",
    "Device attestation detects the compromise and conditional access blocks noncompliant devices."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page comparison table of MDM, MAM and UEM and a control spectrum graphic of the four ownership models for reference during the role-play.",
   "Extend: Ask fast finishers to write the conditional access rule set for three device states (compliant and attested, unmanaged, noncompliant) and the user-facing message for each."
  ]
 },
 {
  "t": "Secrets and key management: vaults, key rotation, KMS, hardware-backed keys and separation of duties",
  "objectives": [
   "Students will be able to explain how secrets vaults, dynamic secrets and workload identities keep credentials out of code.",
   "Students will be able to describe the role of a KMS and key hierarchies, and plan key rotation that preserves access to old data.",
   "Students will be able to outline the correct response to an exposed secret, including revocation, rotation and log review.",
   "Students will be able to apply separation of duties, dual control and split knowledge to key management roles."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Steer discussion toward the fact that once something is public, deleting it does not undo exposure."
   ],
   [
    12,
    "Teach",
    "Draw an application, a vault and a KMS on the board. Show dynamic secret issuance and workload identity. Then draw a key hierarchy and rotation timeline with old versions kept for decryption. Close with a roles table: key admin, key user, auditor."
   ],
   [
    18,
    "Activity",
    "Run the Leaked Key Tabletop and Roles Card Sort in groups."
   ],
   [
    5,
    "Discuss",
    "Groups share their response timeline and role assignments; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If you accidentally posted your house key's photo online and then deleted the post an hour later, would you still change your locks? Why?",
  "activity": {
   "title": "Leaked Key Tabletop and Roles Card Sort",
   "materials": "Printed tabletop inject cards, printed permission cards (create key, edit key policy, schedule deletion, encrypt, decrypt, read audit logs, approve ceremony), whiteboard, sticky notes.",
   "steps": [
    "Read the first inject aloud: a production access key has been found in a public repository and the developer has already deleted the commit.",
    "Groups write on sticky notes the ordered response steps: revoke, rotate, review logs for use during the exposure window, assess access scope, prevent recurrence. Place them on a timeline on the board.",
    "Read the second inject: logs show the key was used from an unknown address. Groups add incident response steps.",
    "Card sort: groups assign each permission card to key administrator, application identity or auditor, ensuring no role can both edit policy and decrypt.",
    "Groups design a root CA ceremony using dual control and split knowledge, stating how many custodians are needed."
   ]
  },
  "discussion": [
   "What makes teams keep secrets in code even when a vault exists, and how would you remove that temptation?",
   "Is automatic key rotation always a good idea? What could go wrong, and how would you plan for it?"
  ],
  "exit": [
   [
    "A key was pushed to a public repository and the commit deleted. What must still happen?",
    "Revoke and rotate the key, then review logs for any use during the exposure window."
   ],
   [
    "What separation of duties rule applies to KMS keys?",
    "Key administrators manage policies and rotation but cannot use keys to decrypt data; users of keys cannot change policies."
   ],
   [
    "What is the difference between dual control and split knowledge?",
    "Dual control requires multiple people to act together; split knowledge divides a secret so no one person knows all of it."
   ]
  ],
  "differentiation": [
   "Support: Provide a response checklist template (contain, revoke, rotate, review, prevent) and a pre-labeled roles table for the card sort.",
   "Extend: Ask fast finishers to design a migration plan that replaces static credentials in five services with dynamic secrets and workload identities, including rollout order and rollback steps."
  ]
 },
 {
  "t": "Secure configuration of network infrastructure: SNMPv3, SSH, management plane protection and secure routing",
  "objectives": [
   "Students will be able to distinguish the data, control and management planes and name a protective control for each.",
   "Students will be able to identify insecure management protocols in a device configuration and select secure replacements, including SNMPv3 authPriv.",
   "Students will be able to compare TACACS+ and RADIUS for administrator AAA and justify the choice for device administration.",
   "Students will be able to explain how routing protocol authentication, prefix filtering and RPKI route origin validation reduce routing attacks."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up question. Collect three or four answers on the whiteboard and circle any that mention Telnet, shared accounts or default passwords."
   ],
   [
    12,
    "Teach",
    "Draw a router with three horizontal layers labeled data, control and management. Walk through threats and controls for each plane: ACLs, jump hosts and out-of-band for management; CoPP and neighbor authentication for control. Then cover protocol replacements (SSH, HTTPS, SCP/SFTP, SNMPv3 levels) and TACACS+ versus RADIUS."
   ],
   [
    18,
    "Activity",
    "Run the configuration audit activity in pairs. Circulate and ask each pair which plane each finding belongs to."
   ],
   [
    6,
    "Discuss",
    "Pairs share their top three fixes. Use the discussion questions to explore trade-offs such as out-of-band cost and emergency accounts."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "If you could change one setting on your organization's core router without anyone noticing, what could you do to the people using the network? What would stop you?",
  "activity": {
   "title": "Hardening audit of a router configuration",
   "materials": "Printed one-page excerpt of a fictional router configuration (Telnet enabled on vty lines with no access class, HTTP server on, SNMP community 'public' read-write, a single local admin user, no NTP, OSPF without authentication, BGP neighbor with no prefix filter), highlighters, whiteboard.",
   "steps": [
    "Give each pair the printed configuration and ask them to highlight every insecure line.",
    "For each highlighted line, pairs write the plane it affects (data, control or management) and the risk in one sentence.",
    "Pairs write the secure replacement in plain words, for example 'SSHv2 only, access class allowing the jump host subnet' or 'SNMPv3 user at authPriv'.",
    "Pairs rank their fixes by risk reduction and pick the top three.",
    "Two pairs compare rankings and agree on a combined top three to share with the class."
   ]
  },
  "discussion": [
   "When is out-of-band management worth its extra cost, and what risks does it introduce if it is poorly secured?",
   "Why keep a local emergency account at all if TACACS+ is in place, and how would you keep it from becoming the weak point?",
   "Who should be responsible for RPKI: the organization that holds addresses, the networks that accept routes, or both?"
  ],
  "exit": [
   [
    "Which SNMPv3 security level provides both authentication and encryption?",
    "authPriv."
   ],
   [
    "Name one control that protects the management plane and one that protects the control plane.",
    "Management: ACLs limiting SSH to jump hosts, out-of-band management, or TACACS+. Control: control plane policing, OSPF/BGP neighbor authentication, or prefix filters."
   ],
   [
    "Why is TACACS+ usually preferred over RADIUS for router administration?",
    "It supports per-command authorization and accounting and encrypts the entire payload."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-column card (plane, insecure setting, secure replacement) with the first row filled in, and let them match printed replacement cards to findings instead of writing from scratch.",
   "Extend: Ask fast finishers to write a short change plan that migrates from SNMPv2c to SNMPv3 without losing monitoring, including how they would test it and roll back."
  ]
 },
 {
  "t": "Monitoring and response data: SIEM correlation, log aggregation, event parsing, baselines and alert tuning",
  "objectives": [
   "Students will be able to describe the pipeline from log aggregation through parsing, normalization, enrichment and correlation.",
   "Students will be able to diagnose why a detection fails to fire, considering log source health, parsing and time synchronization.",
   "Students will be able to propose narrowly scoped, documented tuning actions that reduce false positives without creating blind spots.",
   "Students will be able to select meaningful SOC metrics such as MTTD, MTTR and false-positive rate."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the smoke alarm question. Take a few answers and connect them to alert fatigue."
   ],
   [
    12,
    "Teach",
    "Draw the pipeline on the whiteboard: sources, collection, parsing and normalization, enrichment, correlation, alerting, analyst. At each stage ask 'what breaks here?' and write one failure mode. Explain baselines and UEBA, then tuning principles."
   ],
   [
    18,
    "Activity",
    "Run the 'Tune the queue' card activity in groups of three or four."
   ],
   [
    6,
    "Discuss",
    "Groups present one tuning decision each. Use the discussion questions to contrast good and bad tuning."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Your kitchen smoke alarm goes off every time you make toast. What are your options, and which one would leave you in danger during a real fire?",
  "activity": {
   "title": "Tune the queue",
   "materials": "Printed cards, each describing a fictional alert source and its weekly volume and outcome (for example: 'Rule: port scan detected, 1,400 alerts, all from the authorized scanner on Tuesdays'; 'Rule: VPN brute force, 0 alerts in 3 weeks, user field empty in 100 percent of VPN events'; 'Rule: admin logon outside hours, 60 alerts, 2 true positives'), sticky notes, whiteboard.",
   "steps": [
    "Give each group a set of eight alert cards.",
    "Groups sort cards into three piles: data problem (parsing, missing source, time), tuning problem (noise), and working as intended.",
    "For each tuning problem, groups write a specific exception or threshold change on a sticky note, including scope, owner and review date.",
    "For each data problem, groups write the check they would run and how they would monitor for it in future.",
    "Groups pick one card they would escalate to leadership and write the metric they would show."
   ]
  },
  "discussion": [
   "Who should approve a detection exception, and how often should exceptions be reviewed?",
   "Is it ever acceptable to drop a log source to reduce SIEM costs? What would you need to know first?",
   "How would you show a skeptical executive that the SOC's detection is improving?"
  ],
  "exit": [
   [
    "Why can a parsing failure be more dangerous than a noisy rule?",
    "It fails silently; rules depending on the empty field never fire, and nobody notices."
   ],
   [
    "Give an example of a well-scoped exception.",
    "Excluding the authorized scanner's specific IP address during its scheduled scan window, documented with an owner and review date."
   ],
   [
    "Name two metrics that show SOC effectiveness better than raw event counts.",
    "Any two of: mean time to detect, mean time to respond, false-positive rate per rule, coverage of critical assets."
   ]
  ],
  "differentiation": [
   "Support: Pre-sort two cards as examples (one data problem, one tuning problem) and give struggling groups a sentence frame: 'Exclude ___ only when ___ during ___, reviewed by ___.'",
   "Extend: Ask fast finishers to design a parsing-health dashboard: which fields they would monitor, what threshold would raise an alert, and who would receive it."
  ]
 },
 {
  "t": "Threat intelligence: sources, STIX/TAXII, indicators of compromise, TTPs and intelligence sharing",
  "objectives": [
   "Students will be able to distinguish strategic, operational and tactical intelligence and match each to its audience.",
   "Students will be able to rank indicator types using the Pyramid of Pain and explain why TTP-based detections last longer than IoCs.",
   "Students will be able to explain the roles of STIX, TAXII and a threat intelligence platform.",
   "Students will be able to apply Traffic Light Protocol labels to decide who may receive shared intelligence."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the burglar question and list answers in two columns on the whiteboard: 'easy to change' and 'hard to change'. Reveal that these columns are IoCs and TTPs."
   ],
   [
    12,
    "Teach",
    "Present intelligence levels and sources. Draw the Pyramid of Pain and place the warm-up answers on it. Explain STIX as format and TAXII as transport, the TIP's role, and the TLP levels with a slide showing each color."
   ],
   [
    18,
    "Activity",
    "Run the intelligence report triage activity in pairs."
   ],
   [
    6,
    "Discuss",
    "Pairs share what they would block, what they would detect and who they would share with. Use the discussion questions."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the exit questions on index cards."
   ]
  ],
  "warmup": "A burglar is working your neighborhood. Which facts about them would help you for a single night, and which would still help you a month from now?",
  "activity": {
   "title": "Intelligence report triage",
   "materials": "A printed one-page fictional ISAC report marked TLP:AMBER, listing several domains, IPs and hashes plus a paragraph describing the group's behavior (help desk impersonation calls, MFA reset requests, installation of a remote access tool), printed TLP scenario cards, whiteboard.",
   "steps": [
    "Pairs read the report and sort its content into IoCs and TTPs.",
    "Pairs place each item on a sketched Pyramid of Pain.",
    "For the IoCs, pairs decide which controls receive them and set an expiry period for each type.",
    "For the TTPs, pairs write two plain-language detection or process ideas, such as a help desk callback procedure or an alert on unapproved remote access tools.",
    "Pairs draw three TLP scenario cards (for example, 'Can I forward this to our managed SOC provider?') and decide whether sharing is allowed under the report's label."
   ]
  },
  "discussion": [
   "What makes your own incident data more valuable than a commercial feed, and what are its limits?",
   "How should an organization decide whether a paid intelligence feed is worth renewing?",
   "What could go wrong if organizations ignored TLP labels when sharing?"
  ],
  "exit": [
   [
    "Which sits higher on the Pyramid of Pain: a domain name or a tool?",
    "A tool; it is harder for attackers to change than a domain name."
   ],
   [
    "In one sentence, how do STIX and TAXII relate?",
    "STIX is the standard format for describing intelligence, and TAXII is the protocol that transports STIX data over HTTPS."
   ],
   [
    "A report is marked TLP:GREEN. May you post it on a public website?",
    "No. GREEN allows sharing within the community but not publicly; only TLP:CLEAR may be published."
   ]
  ],
  "differentiation": [
   "Support: Provide a pre-drawn pyramid with labeled layers and a word bank of report items so students can place items by matching rather than recalling layer names.",
   "Extend: Ask fast finishers to sketch, in plain words, the STIX objects and relationships the report would contain (threat actor, attack pattern, indicator, 'uses' and 'indicates' relationships)."
  ]
 },
 {
  "t": "Threat hunting: hypothesis-driven hunts, behavioral analytics, UEBA and hunting in endpoint telemetry",
  "objectives": [
   "Students will be able to write a testable hunting hypothesis and identify the data sources needed to test it.",
   "Students will be able to compare hypothesis-driven, intelligence-driven and data-driven hunts.",
   "Students will be able to apply stacking to a data set to identify outliers worth investigating.",
   "Students will be able to explain how UEBA detects misuse of valid credentials."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a quiet dashboard. Write 'quiet = safe?' on the board and collect opinions."
   ],
   [
    12,
    "Teach",
    "Explain the hunting mindset and the hunt loop: hypothesis, data, query, investigate, record, automate. Contrast hunt types. Show a sample stacking table and point out the long tail. Explain UEBA with the example of a service account logging in interactively."
   ],
   [
    18,
    "Activity",
    "Run the stacking exercise on a printed autorun table in pairs, followed by hypothesis writing."
   ],
   [
    6,
    "Discuss",
    "Pairs share their outliers and hypotheses. Use the discussion questions."
   ],
   [
    4,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Your security dashboard has shown no alerts for a month. Does that mean you are safe? What else could it mean?",
  "activity": {
   "title": "Find the long tail",
   "materials": "A printed table of fictional autorun entries from 2,000 hosts (name, path, signer, host count), with most entries on hundreds of hosts and a few on one to four hosts, including one unsigned binary in a temporary folder; printed hypothesis template; highlighters.",
   "steps": [
    "Pairs sort or scan the table by host count and highlight entries present on five hosts or fewer.",
    "For each highlighted entry, pairs note what makes it suspicious or benign (path, signer, name).",
    "Pairs choose the most suspicious entry and write the next three investigation steps.",
    "Using the template, pairs write a hypothesis for a follow-up hunt and list the data sources required.",
    "Pairs write one sentence describing the detection rule they would create if the entry proved malicious."
   ]
  },
  "discussion": [
   "How would you show leadership the value of a hunting program when most hunts find nothing malicious?",
   "What privacy concerns arise when UEBA profiles employee behavior, and how should they be handled?",
   "Which is more valuable for a small team: hypothesis-driven hunts or intelligence-driven hunts? Why?"
  ],
  "exit": [
   [
    "Write a testable hunting hypothesis about persistence.",
    "Example: 'An attacker may be creating new services on servers outside change windows to maintain access.'"
   ],
   [
    "Why does stacking work?",
    "Legitimate items are common across many hosts, so rare ones stand out for investigation."
   ],
   [
    "Why can UEBA catch what signature tools miss?",
    "It flags behavior that departs from a user's or host's baseline even when valid credentials are used."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed hypothesis template ('An attacker may be using ___ to ___ on ___; we will look in ___ data') and pre-highlight one outlier as a worked example.",
   "Extend: Ask fast finishers to map their hypothesis to an ATT&CK tactic and describe what a false positive for their proposed detection would look like and how to tune it."
  ]
 },
 {
  "t": "Vulnerability management: scanning, CVSS and EPSS prioritization, false positives and remediation tracking",
  "objectives": [
   "Students will be able to compare network, credentialed, agent-based and application scanning and their accuracy trade-offs.",
   "Students will be able to prioritize findings by combining CVSS, EPSS, KEV status, exposure and asset criticality.",
   "Students will be able to identify likely false positives such as backported fixes and describe how to verify them.",
   "Students will be able to design a remediation tracking process with SLAs, exceptions and verification."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the home repair question and record answers. Highlight answers that mention location or exposure, not just size of damage."
   ],
   [
    12,
    "Teach",
    "Walk through the cycle (discover, scan, prioritize, remediate, verify). Explain scan types, CVSS base metrics, EPSS and the KEV catalog. Show how backporting causes false positives. Cover SLAs, mitigations and risk acceptance."
   ],
   [
    18,
    "Activity",
    "Run the 'Twelve findings, five slots' prioritization activity in small groups."
   ],
   [
    6,
    "Discuss",
    "Groups compare their top five and explain disagreements. Use the discussion questions."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "Your house has a cracked window at the front door facing the street and a bigger crack in a window of a locked basement room. You can fix one this weekend. Which one, and why?",
  "activity": {
   "title": "Twelve findings, five slots",
   "materials": "Printed cards for twelve fictional findings, each showing CVSS score, EPSS value (low, medium, high), KEV status, asset name, exposure and data sensitivity; one card should be a likely backport false positive on a Linux server; whiteboard grid with five 'this week' slots.",
   "steps": [
    "Groups first sort the cards by CVSS alone and note the top five.",
    "Groups re-sort using all factors and agree on a new top five for the 'this week' slots.",
    "Groups identify any card they believe is a false positive and write how they would verify it.",
    "For one card that cannot be patched, groups write a mitigation and a risk acceptance with an owner and expiry date.",
    "Groups write the SLA they would assign to each priority level and post it on the board."
   ]
  },
  "discussion": [
   "Why might a system owner resist the security team's priorities, and how would you build agreement?",
   "What risks come from relying entirely on a single score, whether CVSS or EPSS?",
   "Which metric would you show the board to prove the vulnerability program is working?"
  ],
  "exit": [
   [
    "What does the KEV catalog tell you?",
    "That a vulnerability has confirmed exploitation in the wild."
   ],
   [
    "Why might a Linux server be flagged as vulnerable when it is patched?",
    "The distribution backported the fix without changing the upstream version number, and the scanner compared version strings."
   ],
   [
    "Why rescan after remediation?",
    "To verify the fix was applied successfully before closing the ticket."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups a simple scoring sheet that awards points for KEV status, high EPSS, internet exposure and critical asset, so they can rank cards with a clear method.",
   "Extend: Ask fast finishers to propose a written prioritization policy for the whole organization, including how it handles new KEV additions between scan cycles."
  ]
 },
 {
  "t": "Analyzing vulnerabilities and attacks: injection, deserialization, race conditions, memory safety and misconfigurations",
  "objectives": [
   "Students will be able to identify injection, deserialization, race condition, memory safety and misconfiguration flaws from short descriptions or code excerpts.",
   "Students will be able to explain the root cause of each vulnerability class.",
   "Students will be able to select the root-cause fix for each class and distinguish it from compensating controls.",
   "Students will be able to recognize SSRF, IDOR and CSRF from scenario descriptions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the ATM question and discuss how two simultaneous withdrawals could both succeed."
   ],
   [
    13,
    "Teach",
    "Use the 'where does untrusted data enter, what is assumed' framing. Walk through each class with a one-line pseudocode example on the board: concatenated query versus parameterized, check-then-act versus transaction. Summarize the root-cause fix table."
   ],
   [
    17,
    "Activity",
    "Run the 'Root cause match' card sort in groups."
   ],
   [
    6,
    "Discuss",
    "Groups explain one tricky card. Use the discussion questions about compensating controls."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "Two people share a bank account with 50 dollars left. They each try to withdraw 50 dollars at different ATMs at exactly the same second. How could both withdrawals succeed, and how should the bank prevent it?",
  "activity": {
   "title": "Root cause match",
   "materials": "Three sets of printed cards: scenario cards (short descriptions or pseudocode, for example a query built with string concatenation, a cookie holding a serialized object, a refund check followed by a separate update, a C function copying input into a fixed buffer, a storage bucket readable by anyone, an invoice ID in a URL), vulnerability class cards and fix cards. Whiteboard for a summary table.",
   "steps": [
    "Groups match each scenario card to a vulnerability class card.",
    "Groups match each class to its root-cause fix card.",
    "Teacher hands out 'tempting fix' cards (keyword blocklist, WAF rule, random IDs, hiding error messages only) and groups label each as root-cause fix or compensating control.",
    "Groups write one sentence per scenario explaining the broken assumption.",
    "Each group adds one row to the class summary table on the whiteboard."
   ]
  },
  "discussion": [
   "When is a compensating control such as a WAF the right short-term choice, and what keeps it from becoming permanent?",
   "Why do misconfigurations remain so common even in mature organizations?",
   "Should organizations require memory-safe languages for new projects? What are the trade-offs?"
  ],
  "exit": [
   [
    "What is the root-cause fix for SQL injection?",
    "Parameterized queries (prepared statements)."
   ],
   [
    "A coupon can be redeemed twice by sending two requests at once. Name the flaw and a fix.",
    "A race condition (TOCTOU); fix with an atomic transaction and locking or a unique constraint."
   ],
   [
    "Changing an ID in a URL shows another user's data. What is the flaw and fix?",
    "Broken access control (IDOR); fix with server-side authorization checks on each object."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups the class cards pre-matched to fix cards so they only need to match scenarios to classes, and provide a one-line definition on each class card.",
   "Extend: Ask fast finishers to write a short secure code review checklist with one question per vulnerability class."
  ]
 },
 {
  "t": "Malware and indicator analysis: static vs dynamic analysis, sandboxing, YARA rules and file hashing",
  "objectives": [
   "Students will be able to compare static and dynamic malware analysis, including the limits of each.",
   "Students will be able to explain sandbox evasion techniques and why a clean sandbox report is not proof of safety.",
   "Students will be able to explain the strengths and limits of cryptographic and fuzzy hashes.",
   "Students will be able to read a simple YARA rule and judge whether it is too broad or too narrow."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the package question and list what students would check before opening a suspicious parcel."
   ],
   [
    12,
    "Teach",
    "Map the warm-up list to static analysis. Explain dynamic analysis and sandboxes, then evasion. Demonstrate hashing by showing on a projector that changing one character in a text changes its SHA-256 hash completely (any browser-based hash tool or a laptop terminal). Show the sample YARA rule and explain strings and conditions."
   ],
   [
    18,
    "Activity",
    "Run the 'Analyst's notebook' activity in pairs using printed analysis excerpts."
   ],
   [
    6,
    "Discuss",
    "Pairs share their verdicts and proposed YARA strings. Use the discussion questions."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "A package arrives at your office with no return address and a ticking sound. What could you learn about it without opening it, and how would you open it safely if you had to?",
  "activity": {
   "title": "Analyst's notebook",
   "materials": "Printed fictional static analysis excerpt (hash, file type, strings list, imports), printed sandbox report excerpt (processes, registry changes, DNS lookups), three printed candidate YARA rules (one too broad, one too narrow, one balanced), whiteboard.",
   "steps": [
    "Pairs read the static excerpt and list three observations that suggest malice and one limitation.",
    "Pairs read the sandbox report and list the indicators they would send to the SIEM and EDR.",
    "Pairs decide whether the sandbox run could have missed behavior and why.",
    "Pairs review the three YARA rules and label each as too broad, too narrow or balanced, with a reason.",
    "Pairs write a verdict and three response actions in a short notebook entry."
   ]
  },
  "discussion": [
   "When would you decide not to upload a sample to a public scanning service?",
   "How much analysis is enough during an active incident, when speed matters?",
   "Why do attackers invest in sandbox evasion, and what does that tell defenders?"
  ],
  "exit": [
   [
    "Name one advantage of dynamic analysis over static analysis.",
    "It reveals behavior hidden by packing or obfuscation because the code must unpack to run."
   ],
   [
    "Why does a new build of the same malware evade hash blocking?",
    "Any change to the file produces a completely different cryptographic hash."
   ],
   [
    "What makes a YARA rule too broad?",
    "It matches strings or patterns common in legitimate files, causing many false positives."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column organizer (static clues, dynamic clues) and a glossary card for terms such as entropy, imports and packing.",
   "Extend: Ask fast finishers to rewrite the too-broad YARA rule in plain words so it remains useful but less noisy, explaining their choice of strings and condition."
  ]
 },
 {
  "t": "Incident response process: preparation, detection, containment, eradication, recovery and lessons learned",
  "objectives": [
   "Students will be able to sequence the incident response phases and explain why order matters.",
   "Students will be able to classify response actions as preparation, detection and analysis, containment, eradication, recovery or lessons learned.",
   "Students will be able to justify preserving evidence before destructive actions.",
   "Students will be able to apply the life cycle to a ransomware or business email compromise scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the burst pipe question and write the steps students suggest in order on the board."
   ],
   [
    10,
    "Teach",
    "Map the warm-up steps to the NIST life cycle. Explain each phase with concrete actions, stressing containment before eradication before recovery and the role of evidence preservation."
   ],
   [
    20,
    "Activity",
    "Run the ransomware tabletop with action cards in groups of four, with each student taking a role."
   ],
   [
    6,
    "Discuss",
    "Groups describe where they disagreed on order. Use the discussion questions."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "A pipe bursts in your kitchen at night. List the first five things you would do, in order.",
  "activity": {
   "title": "Saturday morning ransomware tabletop",
   "materials": "Printed scenario sheet (fictional clinic, ransomware alert on two file servers, VPN logs showing a suspicious login), printed action cards (isolate hosts, capture memory, disable service account, restore from backup, patch VPN, notify legal, remove scheduled tasks, monitor restored servers, hold review, rotate passwords), role cards (incident lead, IT operations, legal, communications), whiteboard timeline.",
   "steps": [
    "Groups read the scenario and assign roles.",
    "Groups place action cards on a timeline in the order they would perform them, labeling each with its phase.",
    "The teacher announces an inject at the halfway point ('the clinic manager demands an immediate restore'); groups decide how the incident lead responds and why.",
    "Groups identify one action that requires legal or communications input and note when it happens.",
    "Groups list two lessons-learned improvements they would propose."
   ]
  },
  "discussion": [
   "Who should have authority to take a critical system offline, and why decide that before an incident?",
   "How do you balance speed of recovery against preserving evidence?",
   "What makes a lessons-learned review blameless, and why does that matter?"
  ],
  "exit": [
   [
    "Put these in order: recovery, containment, eradication.",
    "Containment, eradication, recovery."
   ],
   [
    "Why is network isolation through EDR often preferred over powering off a host?",
    "It stops spread while keeping the machine running, preserving memory evidence."
   ],
   [
    "Give one eradication action besides deleting malware.",
    "Any of: removing persistence, deleting backdoor accounts, rotating stolen credentials, patching the exploited vulnerability."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups action cards color-coded by phase so they focus on ordering within and across phases rather than classifying from scratch.",
   "Extend: Ask fast finishers to write a one-page ransomware playbook outline with decision points, including when to involve the insurer and law enforcement."
  ]
 },
 {
  "t": "Digital forensics: order of volatility, chain of custody, memory and disk acquisition, and timeline analysis",
  "objectives": [
   "Students will be able to order evidence sources by volatility and justify collecting memory before disk.",
   "Students will be able to explain how hashes and chain of custody together demonstrate evidence integrity.",
   "Students will be able to describe safe memory and disk acquisition, including write blockers and cloud snapshots.",
   "Students will be able to build a simple incident timeline from multiple sources and spot signs of timestamp tampering."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the snowstorm question and collect answers about what disappears first."
   ],
   [
    12,
    "Teach",
    "Present the order of volatility as a vertical list on the board. Explain memory and disk acquisition, write blockers and snapshots. Demonstrate on the projector that a one-character change produces a different SHA-256 hash. Show a sample chain of custody form."
   ],
   [
    18,
    "Activity",
    "Run the timeline reconstruction activity in groups."
   ],
   [
    6,
    "Discuss",
    "Groups present their timeline and the suspicious entry. Use the discussion questions."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "Someone broke into a house overnight during a snowstorm. When investigators arrive in the morning, which clues will vanish first, and which will still be there next week?",
  "activity": {
   "title": "Rebuild the timeline",
   "materials": "Printed event cards from fictional sources (VPN log entries in UTC, Windows logon events in local time, file system timestamps, a memory artifact showing a process connection, an email header), one card with a deliberately impossible timestamp, a printed chain of custody form, string or tape and a wall or whiteboard.",
   "steps": [
    "Groups convert all card times to UTC using the time zone noted on each card.",
    "Groups arrange cards in chronological order on the board.",
    "Groups identify initial access, actions taken and possible data access, and label each card.",
    "Groups find the card that does not fit and explain whether it suggests timestomping.",
    "Groups fill in a chain of custody form for one evidence item, including a hash field and two transfers."
   ]
  },
  "discussion": [
   "When might an organization choose to skip memory acquisition, and what would it lose?",
   "How do cloud environments change forensic collection compared with physical servers?",
   "Why should a report separate facts from interpretation?"
  ],
  "exit": [
   [
    "Which should be collected first: disk image, RAM or backup tapes?",
    "RAM."
   ],
   [
    "What does a matching hash prove, and what does it not prove?",
    "It proves the evidence is unchanged since hashing; it does not show who handled it, which is the role of chain of custody."
   ],
   [
    "What is the purpose of a write blocker?",
    "To prevent any changes to the original media during acquisition."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups cards with times already converted to UTC so they can focus on ordering and interpretation.",
   "Extend: Ask fast finishers to write the forensic collection steps for a compromised cloud virtual machine, in order, with justification for each."
  ]
 },
 {
  "t": "Attack surface management and exposure reduction: asset discovery, external scanning and penetration test findings",
  "objectives": [
   "Students will be able to identify sources used for external asset discovery, including DNS and certificate transparency logs.",
   "Students will be able to recommend exposure reduction actions for common internet-facing risks.",
   "Students will be able to compare penetration testing, red teaming, purple teaming and bug bounties.",
   "Students will be able to turn penetration test findings into root-cause remediation with owners, priorities and retesting."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to list every way someone could get into the school building. Highlight forgotten doors."
   ],
   [
    12,
    "Teach",
    "Define attack surface, external and internal. Explain discovery sources, exposure reduction actions, testing types and rules of engagement, and root-cause handling of findings."
   ],
   [
    18,
    "Activity",
    "Run the 'Unknown assets and repeat findings' group activity."
   ],
   [
    6,
    "Discuss",
    "Groups share root causes they identified. Use the discussion questions."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "List every way a person could get into this building, including the ones most people forget about.",
  "activity": {
   "title": "Unknown assets and repeat findings",
   "materials": "Printed fictional discovery results (a list of hostnames from certificate logs with ports and services, some matching a printed inventory and some not), a printed excerpt of two years of fictional penetration test findings with repeats, sticky notes, whiteboard.",
   "steps": [
    "Groups compare the discovery list against the inventory and highlight unknown assets.",
    "For each unknown asset, groups choose an action: assign owner and protect, or decommission, with a reason.",
    "Groups rank the unknown assets by risk and pick the top two to address first.",
    "Groups review the penetration test excerpt, identify repeat findings and write a root cause for each on a sticky note.",
    "Groups post root causes on the whiteboard and cluster similar ones to find the process that most needs fixing."
   ]
  },
  "discussion": [
   "How should security work with business units that set up their own cloud services?",
   "What should a security team check about an acquired company before connecting its network?",
   "When is a bug bounty program a good idea, and when is an organization not ready for one?"
  ],
  "exit": [
   [
    "Name two sources for discovering an organization's internet-facing hostnames.",
    "Any two of: DNS records, certificate transparency logs, registrar data, passive DNS, cloud account inventories."
   ],
   [
    "What is the difference between red teaming and purple teaming?",
    "Red teaming emulates an adversary to test detection and response; purple teaming has red and blue teams collaborating openly to improve detections."
   ],
   [
    "What should happen after a penetration test finding is fixed?",
    "Retest to confirm the fix, and address the root cause so it does not recur."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups an inventory with fewer entries and a decision flowchart (known owner? needed? exposed admin?) to guide each asset decision.",
   "Extend: Ask fast finishers to draft rules of engagement for an external penetration test of the acquired companies, including scope, exclusions, timing and emergency contacts."
  ]
 },
 {
  "t": "Detection engineering: writing and testing detection rules, Sigma, MITRE ATT&CK coverage mapping and deception technologies",
  "objectives": [
   "Students will be able to describe the detection engineering life cycle from design through testing, deployment and maintenance.",
   "Students will be able to read a simple Sigma rule and identify its log source, selection logic and false-positive notes.",
   "Students will be able to match Sigma, YARA and Snort or Suricata rules to the data types they analyze.",
   "Students will be able to explain ATT&CK coverage mapping and why deception produces high-fidelity alerts."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the smoke detector question and connect answers to testing and maintaining detections."
   ],
   [
    12,
    "Teach",
    "Present the detection-as-code life cycle. Project the sample Sigma rule and walk through each section. Contrast Sigma, YARA and Snort or Suricata. Show a simple ATT&CK heat map sketch and explain deception types."
   ],
   [
    18,
    "Activity",
    "Run the 'Write, test, map' paper rule-writing activity in pairs."
   ],
   [
    6,
    "Discuss",
    "Pairs share their rules and test events. Use the discussion questions."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "Your building has smoke detectors in every room. How would you know they actually work, and how would you know which rooms are missing one?",
  "activity": {
   "title": "Write, test, map",
   "materials": "Printed sample Sigma rule, a printed sheet of fictional process creation log events (some matching suspicious behavior, some benign, including a benign approved macro), a simplified printed ATT&CK grid with ten techniques, colored markers, sticky notes.",
   "steps": [
    "Pairs read the sample Sigma rule and label its log source, selection, condition and false-positive section.",
    "Pairs test the rule on paper against the log events and mark which events match and whether each match is a true or false positive.",
    "Pairs write, in plain YAML-like text, a modification that reduces the false positive without hiding real activity.",
    "Pairs color the ATT&CK grid: green for techniques the class rules cover with data, yellow for partial, red for none.",
    "Pairs propose one deception control for a red technique and describe the alert it would raise."
   ]
  },
  "discussion": [
   "What are the risks of importing large community rule sets without testing them?",
   "How would you prove to leadership that detection coverage has improved over a year?",
   "Where should honeytokens be placed so attackers find them but normal users never do?"
  ],
  "exit": [
   [
    "Which rule format fits each data type: process logs, a file on disk, network packets?",
    "Sigma for logs, YARA for files, Snort or Suricata for network packets."
   ],
   [
    "Why is a rule without its data source not real coverage?",
    "It can never fire because the events it needs are not collected."
   ],
   [
    "Why are honeytoken alerts high-fidelity?",
    "Legitimate users have no reason to use them, so any use is suspicious."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of the Sigma rule sections and a pre-marked first log event so students can follow the matching process.",
   "Extend: Ask fast finishers to write a second Sigma-style rule in plain text for a new service installed from a temporary directory, including false-positive notes and an ATT&CK tag."
  ]
 }
]);
