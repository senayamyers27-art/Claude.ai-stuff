/* Teacher edition for ISACA Certified Information Systems Auditor (CISA) (2024 job practice): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("cisa", [
 {
  "t": "IS audit standards, guidelines and the ISACA Code of Professional Ethics",
  "objectives": [
   "Students will be able to distinguish ITAF standards, guidelines, and tools and techniques, and state which are mandatory.",
   "Students will be able to identify independence threats such as self-review, management participation, familiarity and personal interest in a scenario.",
   "Students will be able to explain the role of the audit charter in granting authority and access.",
   "Students will be able to apply the ISACA Code of Professional Ethics to choose the correct response when pressured to omit a finding."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the referee. Take three or four answers and write the key words (bias, disclose, step aside) on the board."
   ],
   [
    12,
    "Teach",
    "Walk through ITAF: general, performance and reporting standards, then the mandatory versus optional distinction. Explain the audit charter, organizational independence versus independence in fact and appearance, and the four common threats. Summarize the Code of Ethics principles in plain words."
   ],
   [
    16,
    "Activity",
    "Run the 'Independence or not' card sort described below in groups of three."
   ],
   [
    7,
    "Discuss",
    "Bring groups together. Ask each group to defend one hard card. Use the discussion questions to draw out why disclosure, not quiet self-management, is the standard answer."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "A football referee discovers that her brother plays for one of the teams in tomorrow's match. She is sure she can be fair. What should she do, and why does it matter even if she really would be fair?",
  "activity": {
   "title": "Independence or not: scenario card sort",
   "materials": "Printed scenario cards (about 12 per group) made by the teacher, three header cards labeled 'No issue', 'Disclose and reassign or disclose in report' and 'Ethics breach', whiteboard.",
   "steps": [
    "Prepare cards with short scenarios, for example: auditor designed the role model last year; auditor recommends adding a review step; auditor's spouse runs the audited department; CIO asks to drop a finding; auditor is asked to operate the backup job while staff are on leave; auditor declines a gift from the auditee.",
    "In groups of three, students place each card under a header and write the threat type (self-review, management participation, familiarity, personal interest) on the card.",
    "For each card, groups write one sentence naming the standard or ethics principle that applies and the correct next step, such as 'disclose to audit manager'.",
    "Groups swap tables, review another group's sort and mark any card they would move with a sticky note explaining why.",
    "The teacher reveals the intended placements and resolves disagreements using the lesson's distinctions, especially advice versus taking ownership."
   ]
  },
  "discussion": [
   "Why does the standard care about independence in appearance, not only in fact?",
   "Where exactly is the line between helpful advice and management participation?",
   "If the audit charter is weak or out of date, what practical problems might an auditor face during an engagement?"
  ],
  "exit": [
   [
    "Which ITAF element is mandatory?",
    "Standards. Guidelines explain how to apply them and departures must be justified; tools and techniques are practical aids."
   ],
   [
    "An auditor realizes they designed the control under test. What should they do?",
    "Disclose the self-review threat to audit management so the work is reassigned or the impairment is disclosed."
   ],
   [
    "The CIO asks the auditor to omit a significant finding. What does the Code of Ethics require?",
    "The finding stays in the report with management's response, because the code requires revealing all significant facts to appropriate parties."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page table listing the four independence threats with a plain example of each, and let them sort only six cards with a partner before joining the full activity.",
   "Extend: Ask fast finishers to draft a short audit charter clause on access rights and a paragraph explaining how they would use it if an auditee refused access to system logs."
  ]
 },
 {
  "t": "Types of audits, assessments and reviews: IS, compliance, financial, operational, integrated, forensic",
  "objectives": [
   "Students will be able to classify an engagement as financial, compliance, operational, IS, integrated or forensic from a short description.",
   "Students will be able to explain why control self-assessment supplements but does not replace independent audit.",
   "Students will be able to describe why chain of custody and evidence preservation come first in a forensic investigation.",
   "Students will be able to compare the assurance level of an audit, a review and an agreed-upon procedures engagement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the car. Collect answers and map each garage to an audit type on the board."
   ],
   [
    12,
    "Teach",
    "Define each engagement type with its question, criteria and typical reader. Cover CSA, risk assessment, reviews and agreed-upon procedures, stressing assurance levels. Explain forensic evidence handling and chain of custody at a recognition level."
   ],
   [
    16,
    "Activity",
    "Run the 'Which audit is it?' clue-word relay below."
   ],
   [
    7,
    "Discuss",
    "Debrief the trickiest cards and use the discussion questions, focusing on why CSA cannot replace audit."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Your car goes to three places in one week: a roadworthiness test, a fuel-efficiency check and an accident investigator. What question is each one asking, and would they use the same tools?",
  "activity": {
   "title": "Which audit is it? Clue-word relay",
   "materials": "Printed request cards (one engagement request per card), six labeled zones on the whiteboard for the engagement types plus one for CSA, sticky notes.",
   "steps": [
    "Prepare about 14 request cards written as emails from executives, such as 'Are we following the card industry standard our bank requires?' or 'Someone may be steering contracts to a relative.'",
    "Split the class into teams. One student at a time takes a card, reads it to the team, and the team agrees which zone it belongs in and underlines the clue words.",
    "The student places the card in the zone and writes on a sticky note the criteria the audit would use and who would read the report.",
    "For any forensic card, the team must also write the first two actions, such as preserving and imaging evidence and involving legal counsel, before interviews.",
    "The teacher reviews placements with the class, moving any misplaced cards and explaining the clue word that decides it."
   ]
  },
  "discussion": [
   "Why might an organization prefer CSA for some areas even though it gives less assurance?",
   "What could go wrong if a forensic investigation started by confronting the suspect?",
   "When does combining work into an integrated audit give the board a better picture than separate audits?"
  ],
  "exit": [
   [
    "An engagement asks whether the help desk resolves tickets efficiently and meets targets. What type is it?",
    "An operational audit, because it evaluates efficiency and effectiveness."
   ],
   [
    "Can control self-assessment replace independent audit? Why?",
    "No. The process owners assess themselves, so it is not independent; it supplements audit and builds ownership."
   ],
   [
    "Why is chain of custody central to forensic work?",
    "Evidence may be used in legal or disciplinary proceedings, so the organization must show who handled it and that it was not altered."
   ]
  ],
  "differentiation": [
   "Support: Give students a clue-word cheat sheet (efficiency means operational, regulations means compliance, fairly presented means financial, chain of custody means forensic) to use during the relay.",
   "Extend: Ask fast finishers to write their own ambiguous request card that could fit two types, then explain what extra information would decide it."
  ]
 },
 {
  "t": "Risk-based audit planning: audit universe, risk assessment, annual plan and engagement scope",
  "objectives": [
   "Students will be able to explain how the audit universe and risk factors are used to build a risk-based annual audit plan.",
   "Students will be able to distinguish inherent, control and detection risk and identify which one the auditor controls.",
   "Students will be able to explain why IS materiality is not purely a monetary threshold.",
   "Students will be able to set engagement objectives and scope after understanding the business process."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the triage warm-up question and link answers to the idea of ranking by risk."
   ],
   [
    12,
    "Teach",
    "Explain the two levels of planning, the audit universe and common risk factors, the audit committee's approval role and the need to revise the plan. Teach the audit risk model and materiality with examples."
   ],
   [
    18,
    "Activity",
    "Run the 'Twenty audits, sixty areas' planning exercise below."
   ],
   [
    5,
    "Discuss",
    "Groups compare their top five and explain one scoring decision. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "An emergency department has twenty patients waiting and three doctors. How should the staff decide who is seen first, and what information do they need before deciding?",
  "activity": {
   "title": "Twenty audits, sixty areas: build a risk-based plan",
   "materials": "Printed audit universe sheet listing about 15 fictional auditable areas with facts (last audited, recent changes, data sensitivity, regulatory exposure), whiteboard, student laptops with a spreadsheet tool or paper scoring grids.",
   "steps": [
    "Give each group the universe sheet and a simple scoring grid with four risk factors rated 1 to 3.",
    "Groups score each area, total the scores and select the top five for the annual plan, noting the reason for each.",
    "The teacher announces a mid-year event, such as a ransomware incident or acquisition, and groups decide how the plan changes and who must approve the change.",
    "Each group writes a one-paragraph scope for its highest-ranked engagement, naming systems, processes and period, and states what the auditor would do first.",
    "Groups label, for that engagement, one example each of inherent risk, control risk and detection risk."
   ]
  },
  "discussion": [
   "Why is rotating audits alphabetically or repeating last year's plan risky?",
   "How would you respond if an auditee asked you to remove the riskiest part of the process from scope?"
  ],
  "exit": [
   [
    "Which component of audit risk can the auditor directly influence?",
    "Detection risk, by changing the nature, timing and extent of testing."
   ],
   [
    "What should an auditor do first when planning an engagement?",
    "Understand the business process and assess its risks before choosing tests, samples or tools."
   ],
   [
    "Why can a low-dollar error be material in an IS audit?",
    "It can reveal a systemic control failure, such as bypassed approvals or exposed sensitive data, affecting many transactions."
   ]
  ],
  "differentiation": [
   "Support: Provide pre-scored values for half of the areas so struggling students focus on ranking and justifying rather than scoring everything.",
   "Extend: Ask fast finishers to add weighting to the risk factors and show how a different weighting changes the top five, then argue which weighting best fits the organization."
  ]
 },
 {
  "t": "Types of controls: preventive, detective, corrective, compensating; general vs application controls",
  "objectives": [
   "Students will be able to classify controls as preventive, detective, corrective, deterrent, directive or compensating.",
   "Students will be able to explain why application controls depend on effective IT general controls.",
   "Students will be able to determine the evidence needed to test automated, manual and IT-dependent manual controls.",
   "Students will be able to evaluate whether a proposed compensating control adequately addresses a segregation of duties gap."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the house-protection warm-up and sort student answers into stop, spot and fix columns on the board."
   ],
   [
    12,
    "Teach",
    "Teach control functions with examples, then general versus application controls and the dependency between them. Cover automated, manual and IT-dependent manual controls, and design versus operating effectiveness."
   ],
   [
    16,
    "Activity",
    "Run the 'Control classification and reliance' card sort below."
   ],
   [
    7,
    "Discuss",
    "Discuss the small-team compensating control scenario and the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "List every way your home or apartment is protected against burglary. Which of these stop a break-in, which tell you it happened, and which help you recover afterward?",
  "activity": {
   "title": "Control classification and reliance card sort",
   "materials": "Printed control cards (about 16), a sorting grid on the whiteboard with function across the top and general versus application down the side, sticky notes.",
   "steps": [
    "Prepare cards such as three-way match, weekly override report review, restore from backup, quarterly access review, input edit check, warning banner, change approval workflow and log review by an independent manager.",
    "In pairs, students place each card on the grid by function and scope, and mark whether it is automated, manual or IT-dependent manual.",
    "For each automated application control, pairs write which ITGC must be tested first and why.",
    "Pairs then receive a scenario: a two-person IT team where one administrator also runs backups. They propose a compensating control and state who should perform it and what evidence the auditor would test.",
    "The class reviews the grid together, correcting misplacements and comparing compensating control proposals."
   ]
  },
  "discussion": [
   "Why is prevention usually preferred over detection, and when might detection be the better choice?",
   "What makes a compensating control genuinely compensating rather than just an extra activity?"
  ],
  "exit": [
   [
    "Is a daily bank reconciliation preventive, detective or corrective?",
    "Detective, because it identifies discrepancies after transactions occur."
   ],
   [
    "What should the auditor test before relying on automated application controls?",
    "IT general controls, especially change management and access controls, to confirm the configuration was not altered."
   ],
   [
    "What two things must be tested for an IT-dependent manual control?",
    "The performance of the manual review and the completeness and accuracy of the system-generated report it relies on."
   ]
  ],
  "differentiation": [
   "Support: Give students the three verbs stop, spot and fix printed on their grid and start them with eight clearly worded cards before adding the harder ones.",
   "Extend: Ask fast finishers to design a layered control set for vendor bank account changes that includes a preventive, a detective and a corrective control, and explain how each would be tested."
  ]
 },
 {
  "t": "Audit project management: objectives, audit program, fieldwork, resourcing and independence",
  "objectives": [
   "Students will be able to sequence the phases of an audit engagement from planning to follow-up.",
   "Students will be able to explain the purpose of the audit program, engagement letter and workpapers.",
   "Students will be able to state what an auditor must evaluate before relying on another expert's work.",
   "Students will be able to apply the correct response to a scope limitation imposed during fieldwork."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the renovation warm-up and list the project documents students mention on the board."
   ],
   [
    12,
    "Teach",
    "Walk through the engagement phases, the audit program, workpaper content and review, resourcing and using other experts, supervision and protecting independence. Explain scope limitations and the escalation path."
   ],
   [
    16,
    "Activity",
    "Run the 'Engagement curveballs' role-play below."
   ],
   [
    7,
    "Discuss",
    "Groups share their responses to the curveballs. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "You are renovating a kitchen with a contractor. What documents and checks would you want in place so the work finishes on time, matches what you asked for and can be inspected later?",
  "activity": {
   "title": "Engagement curveballs: audit manager role-play",
   "materials": "Printed curveball cards made by the teacher, a sample one-page audit program and workpaper template, whiteboard.",
   "steps": [
    "Give each group of four a short engagement brief, a sample audit program and a blank workpaper template. Assign roles: audit manager, lead auditor, staff auditor and auditee.",
    "The teacher hands out curveball cards one at a time, such as 'auditee says audit access cannot be granted until next quarter', 'nobody on the team understands the container platform', 'staff auditor offers to help fix a control and then test it'.",
    "For each card, the group role-plays a two-minute conversation and the lead auditor records the response in the workpaper template, including date, action and escalation.",
    "Groups check their responses against the lesson: document and escalate scope limitations, evaluate an expert's competence and independence, and avoid self-review.",
    "Each group exchanges workpapers with another group, which acts as reviewer and writes one review note on whether the record would let an outsider follow the reasoning."
   ]
  },
  "discussion": [
   "What happens to the quality of an audit when the team falls behind schedule, and how should a manager respond?",
   "Why does the IS auditor still own the conclusion when an outside expert did much of the technical work?"
  ],
  "exit": [
   [
    "What must an auditor evaluate before relying on an outside expert's work?",
    "The expert's competence, independence and objectivity, and whether the scope and results of their work are adequate."
   ],
   [
    "The auditee delays access to a key system indefinitely. What should the auditor do?",
    "Document the scope limitation, escalate to audit management and, if unresolved, report it and its effect on the conclusion."
   ],
   [
    "Which document lists the detailed procedures for an engagement?",
    "The audit program; scope, timing and access terms belong in the engagement letter."
   ]
  ],
  "differentiation": [
   "Support: Provide a response menu card listing possible actions (document, escalate, reassign, evaluate expert, report limitation) so struggling students choose and justify rather than generate from scratch.",
   "Extend: Ask fast finishers to write a one-page audit program for the curveball engagement, mapping each key risk to a procedure, evidence and test type."
  ]
 },
 {
  "t": "Audit testing and sampling: compliance vs substantive tests, statistical and non-statistical sampling",
  "objectives": [
   "Students will be able to distinguish compliance tests from substantive tests and explain how their results interact.",
   "Students will be able to select attribute, variable, monetary unit, stop-or-go or discovery sampling for a given objective.",
   "Students will be able to identify factors that increase or decrease sample size.",
   "Students will be able to explain why population completeness must be confirmed before sampling."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the soup warm-up question and connect answers to random selection and representativeness."
   ],
   [
    13,
    "Teach",
    "Teach compliance versus substantive testing, statistical versus judgmental sampling, selection methods and the main sampling methods. Explain confidence, tolerable error, expected error, precision and stratification."
   ],
   [
    17,
    "Activity",
    "Run the 'Sampling stations' exercise below."
   ],
   [
    5,
    "Discuss",
    "Discuss results from the stations and the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "You are cooking a large pot of soup and want to know if it needs salt. How do you decide without eating the whole pot, and how could your test give you the wrong answer?",
  "activity": {
   "title": "Sampling stations",
   "materials": "Four printed station sheets, a printed list of 100 numbered fictional change tickets with approval status hidden on a separate answer sheet, dice or a browser random number generator on student laptops, whiteboard.",
   "steps": [
    "Station 1: students read four audit objectives and match each to compliance or substantive testing and to a sampling method, writing their reasoning.",
    "Station 2: students use a random number generator to select 10 tickets from the list of 100, then check the answer sheet for approval and calculate the deviation rate.",
    "Station 3: students are given a list that is missing some tickets and must explain how they would detect the gap before sampling, such as reconciling to deployment records.",
    "Station 4: students rank five scenarios by required sample size, using confidence, tolerable error and expected error, and explain each ranking.",
    "Groups rotate every four minutes and record answers on a single group sheet that the teacher reviews during the discussion."
   ]
  },
  "discussion": [
   "When would a targeted judgmental sample be more useful than a statistical one, and what do you give up?",
   "If a data analytics tool can test every transaction, is sampling still needed?"
  ],
  "exit": [
   [
    "An auditor wants the percentage of access requests lacking approval. Which sampling method fits?",
    "Attribute sampling, because it estimates the rate of a control deviation."
   ],
   [
    "Compliance tests show a control is weak. What happens to substantive testing?",
    "It is extended, because the auditor cannot rely on the control and must test the data directly."
   ],
   [
    "Name two changes that increase sample size.",
    "A higher confidence level and a lower tolerable error rate; a higher expected error rate also increases it."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-column decision card: 'how often' leads to attribute sampling, 'how much money' leads to variable or monetary unit sampling, 'find one' leads to discovery sampling.",
   "Extend: Ask fast finishers to design a stratified sample for expense claims with three value bands and justify the selection approach for each band."
  ]
 },
 {
  "t": "Audit evidence collection: sufficiency, reliability, relevance; inquiry, observation, inspection, reperformance",
  "objectives": [
   "Students will be able to define sufficient, reliable and relevant evidence and apply each to a scenario.",
   "Students will be able to rank evidence by reliability using source, method and form.",
   "Students will be able to compare inquiry, observation, inspection, reperformance, confirmation and walkthroughs.",
   "Students will be able to describe how to confirm the completeness and integrity of electronic evidence."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the homework warm-up and list answers from weakest to strongest proof on the board."
   ],
   [
    12,
    "Teach",
    "Explain sufficiency, relevance and reliability, the reliability rules of thumb, each collection technique and its limits, and handling electronic evidence, including record count reconciliation and hashing."
   ],
   [
    16,
    "Activity",
    "Run the 'Evidence ladder' ranking activity below."
   ],
   [
    7,
    "Discuss",
    "Discuss conflicting evidence and the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "A student says they finished their homework. List three different ways a teacher could check, and rank them from least to most convincing.",
  "activity": {
   "title": "Evidence ladder",
   "materials": "Printed evidence cards for three audit objectives, a ladder drawn on the whiteboard with rungs from weakest to strongest, sticky notes.",
   "steps": [
    "Prepare three sets of evidence cards, each tied to one objective, such as 'terminated users lose access promptly'. Cards include an interview, an undated screenshot, observation of one termination, an HR extract obtained by the auditor, a directory export with record counts and a reperformed match.",
    "In groups, students rank each set from weakest to strongest and write the reliability rule that justifies each step up.",
    "Groups mark any card that is not relevant to the objective, explaining what it would be relevant to instead.",
    "Each group places its strongest card for one objective on the whiteboard ladder and explains what it would do to confirm the extract is complete.",
    "The teacher reviews the rankings and presents one case of conflicting evidence, asking the class which conclusion the stronger evidence supports."
   ]
  },
  "discussion": [
   "Why is inquiry still useful even though it is weak evidence on its own?",
   "How should an auditor respond when what staff say contradicts what the system records show?"
  ],
  "exit": [
   [
    "Which is more reliable: a bank confirmation sent directly to the auditor or a statement provided by the auditee?",
    "The direct confirmation, because it comes from an independent source straight to the auditor."
   ],
   [
    "What should the auditor do after an interview explains how a control works?",
    "Corroborate it with stronger evidence such as inspection, reperformance or system data."
   ],
   [
    "Before analyzing a data extract, what must the auditor confirm?",
    "That it is complete and accurate, for example by reconciling record counts and control totals to the source."
   ]
  ],
  "differentiation": [
   "Support: Give students a short list of the five reliability rules of thumb to keep beside them while ranking cards.",
   "Extend: Ask fast finishers to write a workpaper entry for an electronic extract that records source, query, date, record count reconciliation and hash, and explain why each item matters."
  ]
 },
 {
  "t": "Audit data analytics and CAATs, continuous auditing and continuous monitoring",
  "objectives": [
   "Students will be able to describe common data analytics tests and explain the advantage of testing whole populations.",
   "Students will be able to distinguish test data, parallel simulation, integrated test facility and embedded audit modules.",
   "Students will be able to contrast continuous auditing with management's continuous monitoring.",
   "Students will be able to identify controls an auditor must apply when using analytics, such as completeness checks and read-only access."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the security-camera warm-up and connect it to whole-population testing."
   ],
   [
    12,
    "Teach",
    "Cover analytics tests, CAATs that test program logic, continuous auditing techniques and continuous monitoring ownership. Stress completeness checks, read-only access and treating exceptions as leads."
   ],
   [
    18,
    "Activity",
    "Run the 'Spot the exceptions' data analysis below."
   ],
   [
    5,
    "Discuss",
    "Discuss which exceptions are likely real issues and the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "A store manager can either glance at twenty receipts at the end of the month or have the till flag every unusual sale as it happens. What are the advantages and risks of each approach?",
  "activity": {
   "title": "Spot the exceptions",
   "materials": "A small fictional payments dataset (about 60 rows) and vendor master list prepared by the teacher, shared as a spreadsheet file or printed, student laptops with a browser-based spreadsheet tool, whiteboard.",
   "steps": [
    "Give pairs the payments dataset and vendor list, plus a control total for the period. First, pairs confirm the dataset is complete by checking row count and total against the control total.",
    "Pairs sort and filter to find possible duplicate payments, payments on weekends and amounts just below a stated approval limit.",
    "Pairs compare vendor bank account numbers with a short employee bank account list to find matches.",
    "For each exception, pairs write whether it is a lead needing follow-up and what question they would ask management.",
    "Finally, pairs match four short descriptions to test data, parallel simulation, ITF and embedded audit module, and state who owns continuous monitoring."
   ]
  },
  "discussion": [
   "Why should an exception from an analytics script not be reported as a finding straight away?",
   "What risks does an integrated test facility create, and how would you control them?"
  ],
  "exit": [
   [
    "What distinguishes parallel simulation from test data?",
    "Parallel simulation runs real production data through the auditor's program; test data runs dummy transactions through the production program."
   ],
   [
    "Who owns continuous monitoring?",
    "Management. The auditor may evaluate and rely on it, but it is a management control."
   ],
   [
    "What must the auditor do first with an extracted dataset?",
    "Verify its completeness and accuracy, such as reconciling record counts and totals to the source system."
   ]
  ],
  "differentiation": [
   "Support: Provide step-by-step instructions for sorting and filtering in the spreadsheet tool and pre-highlight the columns to compare.",
   "Extend: Ask fast finishers to write, in plain words or simple pseudo-logic, a rule for detecting split purchases and describe how they would tune it to reduce false positives."
  ]
 },
 {
  "t": "Audit reporting, follow-up and quality assurance of the audit function",
  "objectives": [
   "Students will be able to write a finding using condition, criteria, cause, effect and recommendation.",
   "Students will be able to explain how to handle management disagreement and risk acceptance.",
   "Students will be able to describe follow-up procedures that verify corrective actions.",
   "Students will be able to identify components of quality assurance for the audit function."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the home inspection warm-up and draw out the idea of returning to verify the repair."
   ],
   [
    12,
    "Teach",
    "Teach the five parts of a finding, ratings, exit meetings, handling disagreement, interim reporting of urgent issues, follow-up, risk acceptance escalation and quality assurance."
   ],
   [
    16,
    "Activity",
    "Run the 'Write it, defend it' finding workshop below."
   ],
   [
    7,
    "Discuss",
    "Discuss the role-play outcomes and the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "A home inspector finds a leaking roof. The owner promises to fix it. What should the inspector write in the report, and what should happen before the issue is marked resolved?",
  "activity": {
   "title": "Write it, defend it: finding workshop",
   "materials": "Printed fact sheets describing three audit observations, a five-box finding template, whiteboard, sticky notes.",
   "steps": [
    "Give each pair a fact sheet, for example untested database restores, shared administrator accounts or missing quarterly access reviews.",
    "Pairs complete the five-box template: condition, criteria, cause, effect in business terms and recommendation, and assign a rating with a one-line justification.",
    "Pairs join another pair. One pair plays management and challenges the finding at a mock exit meeting; the other pair responds using evidence and records management's response.",
    "The teacher hands out a follow-up card for each finding, such as 'manager emails that it is done'. Pairs write what evidence they would require before closing it.",
    "Several pairs read their effect statements aloud and the class votes on which ones a board member would act on, discussing why."
   ]
  },
  "discussion": [
   "Why is the cause the most important part of a finding for a lasting fix?",
   "When management accepts a risk the auditor thinks is too high, why should the audit committee know?"
  ],
  "exit": [
   [
    "Management strongly disputes a well-supported finding. What should the auditor do?",
    "Re-examine the evidence; if the finding stands, keep it in the report with management's response."
   ],
   [
    "How does an auditor confirm a finding has been fixed?",
    "By performing follow-up procedures that test the corrective action, not by relying on management's statement."
   ],
   [
    "Which part of a finding explains why the condition occurred?",
    "The cause."
   ]
  ],
  "differentiation": [
   "Support: Provide a completed example finding for a different topic and sentence starters for each of the five boxes.",
   "Extend: Ask fast finishers to propose three metrics the audit committee could use to judge the audit function's quality and explain what each would reveal."
  ]
 },
 {
  "t": "Laws, regulations and industry standards affecting the organization",
  "objectives": [
   "Students will be able to explain how laws, regulations, contracts and industry standards become audit criteria.",
   "Students will be able to identify the first audit step when a new requirement arises.",
   "Students will be able to describe how conflicting legal requirements should be resolved.",
   "Students will be able to evaluate a compliance management process using a compliance register and gap assessment."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the moving-country warm-up and list the steps students suggest in order."
   ],
   [
    12,
    "Teach",
    "Cover types of obligations, the compliance register and gap assessment, the correct order of identifying then implementing, conflicting requirements, voluntary frameworks versus binding contracts, and who is accountable."
   ],
   [
    16,
    "Activity",
    "Run the 'Compliance register review' exercise below."
   ],
   [
    7,
    "Discuss",
    "Discuss the gaps groups found and the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Your family is moving to a new country and plans to drive there. What do you need to find out first, and what would go wrong if you bought a car before learning the local rules?",
  "activity": {
   "title": "Compliance register review",
   "materials": "A printed fictional compliance register with eight entries (some missing owners, review dates or mapped controls), a short scenario sheet about a company expanding into a new region, whiteboard.",
   "steps": [
    "Groups read the scenario and the register and identify which new obligations the expansion creates that are missing from the register.",
    "Groups mark each register entry as complete or deficient, noting missing owners, outdated review dates or requirements with no mapped controls.",
    "Groups identify one conflicting requirement in the scenario, such as retention versus deletion, and write how it should be resolved and documented.",
    "Groups classify each obligation as law, regulation, contract or voluntary standard and note how any voluntary standard could become binding.",
    "Each group presents its single most significant finding and states what an auditor would review first."
   ]
  },
  "discussion": [
   "Why might passing a compliance assessment still leave an organization exposed to real risk?",
   "Who should be accountable for legal compliance, and what is IT's role?"
  ],
  "exit": [
   [
    "A new privacy regulation applies. What should the auditor look for first?",
    "Evidence that management identified the regulation and assessed its applicability and impact, such as a register entry and gap analysis."
   ],
   [
    "Is ISO/IEC 27001 always mandatory?",
    "No. It is voluntary unless a law, regulator or contract requires it."
   ],
   [
    "How can an industry standard be binding without being a law?",
    "Through contracts, such as merchant agreements with card brands and acquiring banks, that require compliance and impose penalties."
   ]
  ],
  "differentiation": [
   "Support: Give students a checklist of what a complete register entry contains (requirement, source, owner, controls, status, last review) to compare against each entry.",
   "Extend: Ask fast finishers to draft a short process for monitoring regulatory changes, including who scans for changes, how impact is assessed and how owners are assigned."
  ]
 },
 {
  "t": "IT governance, organizational structure and IT strategy: board, steering committee, business alignment",
  "objectives": [
   "Students will be able to distinguish governance from management and identify who is ultimately accountable.",
   "Students will be able to compare the roles of the board, audit committee, IT strategy committee and IT steering committee.",
   "Students will be able to evaluate evidence of business alignment in IT strategy and investment decisions.",
   "Students will be able to identify organizational structures that create conflicts of interest."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the renovation warm-up and separate 'deciding' from 'doing' on the board."
   ],
   [
    12,
    "Teach",
    "Teach governance versus management, the roles of board and committees, CIO and CISO, IT strategic planning, signs of poor alignment and structural conflicts, with examples."
   ],
   [
    16,
    "Activity",
    "Run the 'Governance evidence file' review below."
   ],
   [
    7,
    "Discuss",
    "Discuss what the evidence shows and the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "A family plans a home renovation with a contractor. Who should decide what gets built and how much to spend, and who should do the building? What goes wrong if the contractor decides everything?",
  "activity": {
   "title": "Governance evidence file",
   "materials": "Printed evidence packets for a fictional company: a steering committee charter, a year of meeting minutes summaries, a project list with sponsors, an outdated strategic plan excerpt and an organization chart; whiteboard.",
   "steps": [
    "Groups read the charter and minutes and note whether the committee meets and decides as chartered.",
    "Groups trace each project on the list back to a business objective in the strategic plan, marking projects with no sponsor or no clear link.",
    "Groups review the organization chart and identify any reporting line that creates a conflict, such as security reporting to infrastructure.",
    "Groups write two findings in plain words, each with the evidence that supports it, and one recommendation.",
    "Groups match each role card (board, audit committee, IT strategy committee, IT steering committee) to its main responsibility on the whiteboard."
   ]
  },
  "discussion": [
   "Why is a committee charter not enough evidence that governance works?",
   "What would you look for to judge whether IT is measured on business value and not only technical metrics?"
  ],
  "exit": [
   [
    "Who is ultimately accountable for IT governance?",
    "The board of directors."
   ],
   [
    "What is the main role of an IT steering committee?",
    "To prioritize and approve IT investments, monitor major projects and resolve resource conflicts, with business and IT leaders participating."
   ],
   [
    "What is the best evidence of business alignment?",
    "IT plans and projects that trace to business objectives, with active business participation in decisions."
   ]
  ],
  "differentiation": [
   "Support: Give students a role-matching card with one-line descriptions of each governance body to refer to during the evidence review.",
   "Extend: Ask fast finishers to draft a short balanced scorecard for IT with one measure in each of four perspectives and explain how it would show alignment."
  ]
 },
 {
  "t": "IT policies, standards, procedures and governance frameworks such as COBIT",
  "objectives": [
   "Students will be able to distinguish policies, standards, procedures, guidelines and baselines.",
   "Students will be able to describe the policy lifecycle and the formal exception process.",
   "Students will be able to name the COBIT governance domain and four management domains.",
   "Students will be able to explain how COBIT relates to ITIL, ISO/IEC 27001 and the NIST Cybersecurity Framework."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the school rules warm-up and sort answers into broad principles and specific steps."
   ],
   [
    12,
    "Teach",
    "Teach the document hierarchy, top-down versus bottom-up development, the policy lifecycle and exceptions, COBIT domains, design factors and capability levels, and how other frameworks fit."
   ],
   [
    16,
    "Activity",
    "Run the 'Document hierarchy sort and exception review' below."
   ],
   [
    7,
    "Discuss",
    "Discuss the exception case and the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Think of your school or workplace. Give one example of a broad rule, one specific required rule and one set of step-by-step instructions. How are they connected?",
  "activity": {
   "title": "Document hierarchy sort and exception review",
   "materials": "Printed statement cards (about 15), five header cards (policy, standard, procedure, guideline, baseline), a printed exception scenario, whiteboard.",
   "steps": [
    "Prepare cards such as 'information must be protected according to classification', 'all remote access requires multifactor authentication', 'step 1: open the request ticket', 'consider using a password manager', and 'servers must disable unused services'.",
    "Pairs sort each card under the right header and circle any card that puts technical detail into a policy.",
    "Pairs read the exception scenario, an old machine that cannot meet a logging standard, and list the steps a proper exception requires.",
    "Pairs map five short process descriptions to COBIT domains EDM, APO, BAI, DSS and MEA.",
    "The class reviews the sort and the exception steps together, correcting errors."
   ]
  },
  "discussion": [
   "Why should policies be short and technology-neutral?",
   "Why does COBIT expect organizations to tailor it rather than adopt every objective?"
  ],
  "exit": [
   [
    "Which document type is mandatory and specific, such as requiring multifactor authentication for remote access?",
    "A standard."
   ],
   [
    "Which COBIT domain represents governance rather than management?",
    "Evaluate, Direct and Monitor (EDM)."
   ],
   [
    "A system cannot meet a standard. What should happen?",
    "A formal exception is requested, risk-assessed, approved, time-limited and tracked, ideally with compensating controls."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-line definition beside each header card and start them with clearly worded statement cards.",
   "Extend: Ask fast finishers to map one access management requirement through policy, standard, procedure and baseline, and identify which COBIT domain covers its review."
  ]
 },
 {
  "t": "Enterprise architecture and enterprise risk management (ERM)",
  "objectives": [
   "Students will be able to explain the purpose of enterprise architecture and name its four common views (business, data, application and technology).",
   "Students will be able to distinguish risk appetite, risk tolerance and risk capacity, and inherent risk from residual risk.",
   "Students will be able to classify scenarios into the four risk responses and identify who may accept residual risk.",
   "Students will be able to evaluate whether IT risk is integrated with ERM using evidence such as risk registers and board reports."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the whiteboard without judging them; promise to return to them at the end."
   ],
   [
    12,
    "Teach",
    "Draw a four-layer EA diagram of a fictional company (business, data, application, technology) and point to an architecture exception. Then explain ERM vocabulary: appetite, tolerance, capacity, inherent and residual risk, the four responses and who accepts risk. Say plainly that auditors never accept risk and that transfer never moves accountability."
   ],
   [
    18,
    "Activity",
    "Run the risk response card sort. Circulate and ask each group to justify the risk owner they chose, not only the response."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions, drawing out the link between architecture exceptions and residual risk."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on a slip of paper."
   ]
  ],
  "warmup": "Your family decides to keep driving a car with worn brakes for six more months instead of replacing them. Who should make that decision, and what could you do to make the risk smaller in the meantime?",
  "activity": {
   "title": "Risk response card sort",
   "materials": "About 12 teacher-made scenario cards, four column headers on the whiteboard (Mitigate, Transfer, Avoid, Accept), sticky notes and markers.",
   "steps": [
    "Prepare cards with short scenarios from a fictional company, such as buying cyber insurance, shutting down a legacy file-sharing service, adding multifactor authentication, or documenting acceptance of a minor vulnerability.",
    "In groups of three or four, students place each card under one of the four responses and write on a sticky note who should own and approve that decision.",
    "Each group picks one card and states the inherent risk, the response chosen and the residual risk that remains.",
    "Groups compare their board with a neighboring group and resolve disagreements; the teacher reveals intended answers and highlights any card where a group named IT or the auditor as the acceptor."
   ]
  },
  "discussion": [
   "Why might an IT risk register drift away from the enterprise risk register over time, and what governance would stop that?",
   "When an architecture exception has no expiry date, who is effectively carrying the risk, and how would you show that to the board?"
  ],
  "exit": [
   [
    "Which risk response is buying cyber insurance, and what does it not transfer?",
    "Risk transfer; it does not transfer accountability."
   ],
   [
    "Who should accept residual risk for a business system?",
    "The business or risk owner with authority to do so, within the risk appetite, not IT or the auditor."
   ],
   [
    "Name the four common views of enterprise architecture.",
    "Business, data, application and technology."
   ]
  ],
  "differentiation": [
   "Support: give students a one-page glossary of appetite, tolerance, capacity, inherent and residual risk, each with a household example, and let them do the card sort in pairs with the glossary open.",
   "Extend: ask fast finishers to draft three risk appetite statements for different risk categories of the fictional company and propose a KRI that would show the company drifting outside one of them."
  ]
 },
 {
  "t": "Privacy programs and privacy principles",
  "objectives": [
   "Students will be able to explain the difference between privacy and security using an example.",
   "Students will be able to identify which privacy principle is at stake in a given scenario.",
   "Students will be able to describe the main components of a privacy program and state when a privacy impact assessment should be performed.",
   "Students will be able to select appropriate audit evidence for testing whether a privacy program works in practice."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list on the whiteboard which fields students think the app really needs."
   ],
   [
    12,
    "Teach",
    "Explain privacy versus security with the lock and house rules image, then walk through the principles (lawfulness, purpose limitation, minimization, accuracy, storage limitation, integrity and confidentiality, rights, accountability), program components, PIAs and the difference between pseudonymization and anonymization."
   ],
   [
    18,
    "Activity",
    "Run the principle detective activity in small groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect principles to accountability and ownership."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A coffee shop app asks for your birth date, home address and contacts list just so you can order a latte. Which of these does it actually need, and how would you feel if it shared them with someone else?",
  "activity": {
   "title": "Principle detective",
   "materials": "Teacher-made scenario cards (about 10), a printed list of privacy principles for each group, sticky notes and a whiteboard.",
   "steps": [
    "Give each group of three or four a set of short scenario cards, such as keeping job applicant files forever, reusing support call recordings for sales, or collecting national ID numbers for a newsletter.",
    "Groups match each scenario to the principle most at stake and write a one-line fix on a sticky note.",
    "Each group then chooses one scenario and lists two pieces of audit evidence they would request, such as request logs, PIA records, retention job reports or contract clauses.",
    "Groups post their sticky notes on the whiteboard under each principle, and the class reviews any scenario placed under more than one principle."
   ]
  },
  "discussion": [
   "Can data be perfectly secure and still be handled in a way that breaks privacy principles? Give an example.",
   "Who should own a decision to reuse customer data for a new purpose: the privacy officer, the business owner or IT, and why?"
  ],
  "exit": [
   [
    "A company keeps customer records for many years with no business reason. Which principle is broken?",
    "Storage limitation."
   ],
   [
    "When should a privacy impact assessment be performed?",
    "Before a new system or significant change that processes personal data is implemented, ideally during design."
   ],
   [
    "Is pseudonymized data still personal data?",
    "Yes, because it can be re-linked to individuals using the separately held key."
   ]
  ],
  "differentiation": [
   "Support: provide each principle with a one-sentence everyday example (such as the pizza delivery number) and let struggling students match scenarios to those examples first.",
   "Extend: ask fast finishers to sketch a simple data flow map for the fitness app scenario, marking where a PIA would flag risks and where a cross-border transfer might occur."
  ]
 },
 {
  "t": "Data governance and data classification",
  "objectives": [
   "Students will be able to distinguish the roles of data owner, data custodian, data steward and user.",
   "Students will be able to explain why data is classified and how classification drives handling rules and controls.",
   "Students will be able to apply a classification scheme to sample data and justify the level chosen, including the effect of aggregation and time.",
   "Students will be able to identify audit tests that confirm classification labels are matched by technical controls."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sort student answers into decide versus do on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Explain the four roles with the homeowner and property manager image, then classification levels and handling rules, the classification lifecycle, aggregation, data quality and lineage. Model one audit test: sample a data set, check its label, then check its controls."
   ],
   [
    18,
    "Activity",
    "Run the classify and assign activity in groups."
   ],
   [
    5,
    "Discuss",
    "Work through the discussion questions, focusing on why IT is usually not the owner."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "In your household, who decides who may borrow the car, and who actually keeps the keys and fills the tank? Are those always the same person?",
  "activity": {
   "title": "Classify and assign",
   "materials": "Teacher-made cards describing data sets of a fictional company (payroll, press releases, customer contact lists, draft quarterly results, source code and so on), a four-level classification table printed or projected, sticky notes.",
   "steps": [
    "Groups of three or four receive about eight data set cards and the classification table (public, internal, confidential, restricted) with handling rules.",
    "For each card, groups assign a classification level, name the likely data owner by job title, and name the custodian.",
    "Groups flag any card whose level should change over time or when combined with another card, and explain why.",
    "Each group presents one card; the class checks whether the owner chosen is a business manager rather than IT, and the teacher reveals model answers."
   ]
  },
  "discussion": [
   "What goes wrong in an organization where IT ends up deciding who can access every data set?",
   "Why is a label with no matching control sometimes worse than no label at all?"
  ],
  "exit": [
   [
    "Who should approve access to payroll data?",
    "The data owner, the business manager responsible for payroll."
   ],
   [
    "What does a data custodian do?",
    "Implements and operates the controls the owner specifies, such as backups, access settings and encryption."
   ],
   [
    "Give one reason classification should be reviewed periodically.",
    "Sensitivity changes over time or through aggregation, so protection must be adjusted."
   ]
  ],
  "differentiation": [
   "Support: give students a role cheat card (owner decides, custodian implements, steward maintains quality, user follows rules) and start them with four cards instead of eight.",
   "Extend: ask fast finishers to design a simple test plan for checking that files labeled restricted are actually encrypted and excluded from broad sharing, including the sample and evidence."
  ]
 },
 {
  "t": "IT resource management: segregation of duties, staffing, budgeting and portfolio management",
  "objectives": [
   "Students will be able to identify incompatible duties in both business and IT roles using an SoD matrix.",
   "Students will be able to recommend compensating controls when full segregation of duties is not possible.",
   "Students will be able to explain how personnel controls such as mandatory vacation, job rotation and prompt termination reduce risk.",
   "Students will be able to compare chargeback with showback and describe the purpose of IT portfolio management."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the bake sale and collect ideas for splitting jobs."
   ],
   [
    12,
    "Teach",
    "Present the four incompatible business duties and common IT conflicts, show a small SoD matrix on the projector, explain compensating controls, personnel lifecycle controls, chargeback versus showback and portfolio management."
   ],
   [
    18,
    "Activity",
    "Run the SoD matrix hunt in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to debate realistic compensating controls in small teams."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "At a school bake sale, one volunteer takes the money, counts it, records the total and checks the total. What could go wrong, and how would you split the jobs if you only had two volunteers?",
  "activity": {
   "title": "SoD matrix hunt",
   "materials": "A printed SoD matrix of about eight permissions with conflicts marked, a printed user access list for ten fictional users, highlighters, and the whiteboard.",
   "steps": [
    "Pairs receive the matrix (for example, create vendor, approve payment, develop code, deploy to production, administer security, administer systems) and the user access list.",
    "Pairs highlight every user whose permissions combine a marked conflict and record which conflict it is.",
    "For each conflict, pairs decide whether to remove access or keep it with a compensating control, and name who independent would perform that control.",
    "The teacher collects findings on the whiteboard; the class checks whether any proposed compensating control is performed by the conflicted person."
   ]
  },
  "discussion": [
   "In a five-person IT team, which conflicts would you insist on separating, and which would you cover with compensating controls?",
   "Why might an organization resist mandatory vacation for its most trusted administrator, and how would you answer that?"
  ],
  "exit": [
   [
    "What is the most common IT segregation of duties conflict?",
    "The same person developing code and moving it into production."
   ],
   [
    "What makes a compensating control effective when duties cannot be separated?",
    "It is performed by someone independent of the conflict, such as an independent review of logged privileged activity."
   ],
   [
    "What is the difference between chargeback and showback?",
    "Chargeback bills business units for IT use; showback reports the costs without billing."
   ]
  ],
  "differentiation": [
   "Support: give struggling pairs a matrix with only four permissions and two marked conflicts, plus a sentence starter such as 'This is a conflict because one person could...'.",
   "Extend: ask fast finishers to identify a conflict that only appears when two harmless-looking roles are combined, and propose how the organization could prevent it at the role design stage."
  ]
 },
 {
  "t": "IT vendor management: outsourcing, contracts, right to audit and SOC reports",
  "objectives": [
   "Students will be able to explain why outsourcing transfers work but not accountability.",
   "Students will be able to identify key contract terms for outsourcing, including SLAs, right to audit, breach notification, subcontracting limits, exit terms and source code escrow.",
   "Students will be able to distinguish SOC 1 from SOC 2 and Type 1 from Type 2 reports.",
   "Students will be able to review a SOC report summary for scope, period, carve-outs, exceptions and complementary user entity controls."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about hiring a babysitter and list the checks students would make before, during and after."
   ],
   [
    12,
    "Teach",
    "Walk through the vendor lifecycle from due diligence to exit, key contract terms and source code escrow, then SOC 1, SOC 2 and SOC 3, Type 1 versus Type 2, carve-out versus inclusive, bridge letters and CUECs."
   ],
   [
    18,
    "Activity",
    "Run the SOC report reading activity in groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore reliance and accountability."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "You are hiring a babysitter for a Saturday night. What would you check before hiring, what rules would you agree in advance, and what would you still do yourself?",
  "activity": {
   "title": "Read the SOC report",
   "materials": "A teacher-written two-page fictional SOC 1 Type 2 summary (opinion, period, scope, a carved-out hosting provider, two exceptions, a list of CUECs), plus a one-page description of the customer's own practices; highlighters.",
   "steps": [
    "Groups of three read the summary and highlight the period, the services in scope, any carve-outs and the exceptions.",
    "Groups compare the CUEC list with the customer's practices and mark any CUEC the customer is not performing.",
    "Groups decide what extra evidence they need, such as the subservice organization's report or a bridge letter, and write it down.",
    "Each group states its main finding in one sentence; the class agrees on which findings belong to the vendor and which to the customer."
   ]
  },
  "discussion": [
   "If a vendor has a clean SOC 2 Type 2 report, why might the customer still suffer a breach involving that service?",
   "When would a right-to-audit clause be more useful than a SOC report, and when would it be impractical?"
  ],
  "exit": [
   [
    "Who remains accountable for data processed by an outsourced provider?",
    "The customer organization."
   ],
   [
    "What does a Type 2 report add over a Type 1 report?",
    "Testing of operating effectiveness over a period, not just design at a point in time."
   ],
   [
    "What are complementary user entity controls?",
    "Controls the customer must perform for the service organization's controls to be effective."
   ]
  ],
  "differentiation": [
   "Support: give students a checklist of five items to find in the SOC summary (opinion, period, scope, exceptions, CUECs) with page hints.",
   "Extend: ask fast finishers to draft three contract clauses for a high-risk cloud vendor, covering breach notification, subcontractors and exit, in plain language."
  ]
 },
 {
  "t": "IT performance monitoring, reporting and quality management: KPIs, balanced scorecard, maturity",
  "objectives": [
   "Students will be able to distinguish KPIs, key goal indicators and KRIs and judge whether a metric is meaningful.",
   "Students will be able to name the four perspectives of the IT balanced scorecard and place sample measures in each.",
   "Students will be able to explain how SLAs, OLAs and underpinning contracts fit together.",
   "Students will be able to explain the purpose of capability and maturity assessments and why the highest level is not always the target."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a dashboard of activity-only numbers on the projector and ask the warm-up question."
   ],
   [
    12,
    "Teach",
    "Explain KPIs versus KRIs, the four metric questions (objective, target, owner, data source), the four balanced scorecard perspectives, SLA, OLA and underpinning contracts, quality assurance versus quality control and capability or maturity levels."
   ],
   [
    18,
    "Activity",
    "Run the dashboard redesign activity in groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to discuss gaming of metrics and maturity targets."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A dashboard shows that the IT team closed more tickets and wrote more code than ever this month. Does that tell you whether the business got what it needed? What would you want to see instead?",
  "activity": {
   "title": "Dashboard redesign",
   "materials": "A projected or printed fictional IT dashboard with activity-only metrics, a blank four-quadrant balanced scorecard template drawn on the whiteboard or printed, sticky notes.",
   "steps": [
    "Groups of three or four review the fictional dashboard and list what it fails to tell leaders.",
    "Groups write replacement measures on sticky notes, at least two per scorecard perspective, each with a target and an owner.",
    "Groups add one KRI and state what action a breach of its threshold would trigger.",
    "Groups place their notes on the class scorecard; the teacher challenges any measure whose data source would be unreliable."
   ]
  },
  "discussion": [
   "How might a team game a metric such as tickets closed or mean time to restore, and how would an auditor detect it?",
   "Why might an organization deliberately choose a lower capability target for some processes?"
  ],
  "exit": [
   [
    "What is the difference between a KPI and a KRI?",
    "A KPI measures how well a process achieves its goal; a KRI signals rising exposure to a risk."
   ],
   [
    "Name the four perspectives of the IT balanced scorecard.",
    "Business contribution, user orientation, operational excellence and future orientation."
   ],
   [
    "What must exist before an IT balanced scorecard can be implemented effectively?",
    "Clearly defined business and IT objectives to link the measures to."
   ]
  ],
  "differentiation": [
   "Support: give struggling groups a bank of ten sample measures to sort into the four perspectives before they write their own.",
   "Extend: ask fast finishers to describe how they would validate the data behind one KPI, including the source records they would sample and recalculate."
  ]
 },
 {
  "t": "Project governance and management: roles, steering, earned value and project risk",
  "objectives": [
   "Students will be able to describe the roles of sponsor, steering committee, project manager, PMO and IS auditor in a project.",
   "Students will be able to calculate CV, SV, CPI and SPI from planned value, earned value and actual cost and interpret the results.",
   "Students will be able to identify the critical path in a simple task network and explain the effect of delays.",
   "Students will be able to explain how formal change control and honest status reporting support project governance."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up painting question and work out the answer together on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Explain project roles and the auditor's advisory limit, then planning tools (WBS, CPM, PERT, Gantt, timeboxing, function points). Write the earned value formulas on the whiteboard and work one example with students."
   ],
   [
    18,
    "Activity",
    "Run the project rescue activity in groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to examine status reporting pressure."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A painter agreed to paint a house in ten days for 10,000 dollars. On day five, the house is 40 percent painted and 6,000 dollars has been spent. Is the job on schedule? On budget?",
  "activity": {
   "title": "Project rescue",
   "materials": "A printed fictional project status pack (PV, EV and AC figures for three months, a simple task network with durations, a list of informally approved scope changes), calculators or student laptops, whiteboard.",
   "steps": [
    "Groups of three calculate CV, SV, CPI and SPI for each month and plot whether the trend is improving or worsening.",
    "Groups find the critical path in the task network and identify which delayed task actually moves the end date.",
    "Groups review the scope change list and decide which changes should have gone to the steering committee.",
    "Each group writes a three-sentence briefing for the steering committee, and the class compares conclusions."
   ]
  },
  "discussion": [
   "Why do projects often report green until they suddenly turn red, and what would you change to prevent it?",
   "How can an IS auditor add value during a project without compromising independence later?"
  ],
  "exit": [
   [
    "If EV is 200 and AC is 250, what is the cost variance and what does it mean?",
    "CV = -50, so the project is over budget for the work completed."
   ],
   [
    "Who is accountable for the business case and benefits?",
    "The project sponsor."
   ],
   [
    "What happens if a task on the critical path is delayed?",
    "The whole project's completion date is delayed unless the plan is changed."
   ]
  ],
  "differentiation": [
   "Support: give students a formula card with each formula and a plain-language meaning (negative means bad, below 1 means bad) and a partly completed first calculation.",
   "Extend: ask fast finishers to calculate a PERT estimate for three tasks and explain how changing the pessimistic estimate affects the expected duration."
  ]
 },
 {
  "t": "Business case and feasibility analysis",
  "objectives": [
   "Students will be able to describe the contents and purpose of a business case and who sponsors it.",
   "Students will be able to name and apply the five feasibility dimensions to a proposal.",
   "Students will be able to compare options using TCO, payback period and NPV concepts, and explain the limits of payback.",
   "Students will be able to explain why sunk costs should not drive decisions and when a business case must be revisited."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up phone question and list hidden costs students think of."
   ],
   [
    12,
    "Teach",
    "Explain the business case, the five feasibility dimensions (TELOS), ROI, NPV, payback and TCO with the Option A and Option B example, the buy versus build path and RFP evaluation, and the sunk cost trap."
   ],
   [
    18,
    "Activity",
    "Run the business case challenge activity in groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to examine sunk costs and sponsorship."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Two phones cost the same in the shop. One needs an expensive monthly plan and a case; the other works with your current plan. Which is cheaper, and what other costs might you be missing?",
  "activity": {
   "title": "Business case challenge",
   "materials": "A printed two-page fictional business case with three options (do nothing, buy, subscribe), cost tables over five years and a list of assumptions; calculators or laptops; whiteboard.",
   "steps": [
    "Groups of three or four calculate the five-year TCO of each option from the cost tables, including support, training and retirement.",
    "Groups test the business case against TELOS and note any dimension it ignores.",
    "Groups receive a change card (for example, a key license price doubles) and decide whether the recommendation still holds.",
    "Each group presents a recommendation to the sponsor, played by the teacher, who pushes back with a sunk cost argument that the group must answer."
   ]
  },
  "discussion": [
   "Why do organizations find it so hard to stop a project after spending a lot on it?",
   "Who should write and own a business case, and what goes wrong when IT writes it alone?"
  ],
  "exit": [
   [
    "Why is TCO better than purchase price for comparing options?",
    "It includes all costs over the solution's life, such as support, licensing, training and retirement."
   ],
   [
    "What should happen when a project's expected benefits drop significantly?",
    "Revisit the business case so the sponsor and steering committee can decide whether to continue, change or stop."
   ],
   [
    "What is the first step in selecting a commercial software package?",
    "Defining and prioritizing the business and control requirements."
   ]
  ],
  "differentiation": [
   "Support: give students a TCO worksheet with the cost categories already listed so they only need to add the numbers.",
   "Extend: ask fast finishers to explain, without detailed calculation, why a positive payback within two years could still be the worse investment, using NPV reasoning."
  ]
 },
 {
  "t": "System development methodologies: SDLC, agile, DevOps, prototyping and RAD",
  "objectives": [
   "Students will be able to describe the phases of the traditional SDLC and where its control points lie.",
   "Students will be able to compare waterfall, agile, DevOps, prototyping and RAD in terms of strengths and control risks.",
   "Students will be able to identify where controls and audit evidence appear in agile and DevOps environments.",
   "Students will be able to explain how segregation of duties is achieved in a CI/CD pipeline."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record the class's first impressions of daily releases."
   ],
   [
    12,
    "Teach",
    "Walk through waterfall phases and the V-model, then agile roles and ceremonies, DevOps and CI/CD gates, prototyping, RAD and low-code risks. Show a simple pipeline rule on the projector (protected main branch, one independent reviewer, deploy only after tests pass)."
   ],
   [
    18,
    "Activity",
    "Run the find the control activity in groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare evidence across methods."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A team releases software to customers every day and never signs a phase completion document. Does that mean they have no controls? Where might their controls be hiding?",
  "activity": {
   "title": "Find the control",
   "materials": "Teacher-made cards describing evidence items (a user story with security acceptance criteria, a definition of done, a pull request with an approving reviewer, a pipeline log showing a blocked deploy, a waterfall design sign-off, a prototype screenshot), a whiteboard divided into Waterfall, Agile, DevOps and Prototyping columns.",
   "steps": [
    "Groups of three or four sort the evidence cards into the method each most likely comes from.",
    "For each card, groups write which control objective it supports, such as authorized change, adequate testing or business acceptance.",
    "Groups receive a weakness card (for example, two developers can bypass branch protection) and decide what finding they would write and to whom.",
    "The class reviews the board and agrees which controls appear in every method in different forms."
   ]
  },
  "discussion": [
   "Is a daily-release DevOps team more or less risky than a yearly waterfall release? What does the answer depend on?",
   "Why is a prototype that users love both a success and a risk?"
  ],
  "exit": [
   [
    "What is the main control risk of prototyping?",
    "That an uncontrolled prototype moves into production without proper security, documentation and testing."
   ],
   [
    "In agile, where should security requirements be captured?",
    "In the product backlog as user stories or acceptance criteria, and in the definition of done."
   ],
   [
    "How is segregation of duties achieved in a DevOps pipeline?",
    "Through mandatory independent code review, protected branches and restricted deployment permissions."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a one-page comparison table of the methods with blanks for key features and risks to fill in during the teach segment.",
   "Extend: ask fast finishers to write a short list of pipeline configuration settings they would request as audit evidence and explain what each proves."
  ]
 },
 {
  "t": "Control identification and design: input, processing and output application controls",
  "objectives": [
   "Students will be able to classify application controls as input, processing or output controls.",
   "Students will be able to select the correct edit check (validity, range, limit, existence, check digit, completeness, duplicate) for a described error.",
   "Students will be able to distinguish record counts, control totals and hash totals and explain error handling through suspense files.",
   "Students will be able to map business risks in a process to preventive and detective application controls."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up online ordering question and list the checks students name."
   ],
   [
    12,
    "Teach",
    "Explain the input, processing and output families with examples, the edit checks, batch controls, run-to-run totals, three-way match, data file controls and output distribution. Clarify preventive, detective and corrective, and the auditor's advisory role."
   ],
   [
    18,
    "Activity",
    "Run the match the control activity in pairs, followed by a short design challenge."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore overrides and layered controls."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "When you order food online, what checks does the site make before, during and after you pay? What would go wrong without each one?",
  "activity": {
   "title": "Match the control, then design one",
   "materials": "Teacher-made error cards (transposed account digits, invalid department code, a missing timesheet in a batch, a duplicate invoice, a report sent to the wrong person, totals lost between steps) and control cards; a printed outline of a vendor payment process; sticky notes.",
   "steps": [
    "Pairs match each error card to the control card that would catch it and label the control input, processing or output.",
    "Pairs mark each control as preventive, detective or corrective.",
    "Pairs take the vendor payment outline and list the four main risks (fictitious vendor, wrong amount, duplicate payment, diverted funds), then place at least one preventive and one detective control against each on sticky notes.",
    "Two pairs compare designs and the teacher highlights any risk left without a detective control."
   ]
  },
  "discussion": [
   "Why should users who can override an input edit have their overrides logged and reviewed by someone else?",
   "Why is it risky to rely on a single preventive control for a high-value payment process?"
  ],
  "exit": [
   [
    "Which control detects a transposition error in an account number at data entry?",
    "A check digit."
   ],
   [
    "What is the difference between a hash total and a control total?",
    "A control total sums a meaningful amount; a hash total sums a non-meaningful field purely to detect changes or omissions."
   ],
   [
    "What should happen to transactions rejected by input edits?",
    "They go to a suspense file or error queue, are corrected and resubmitted by authorized staff, and are tracked until cleared."
   ]
  ],
  "differentiation": [
   "Support: give students a reference sheet with each edit check and a one-line example, and start them with four error cards instead of six.",
   "Extend: ask fast finishers to explain how a weakness in IT general controls, such as uncontrolled configuration changes, could silently disable an application control they designed."
  ]
 },
 {
  "t": "System readiness and implementation testing: unit, integration, system, UAT and regression",
  "objectives": [
   "Students will be able to put unit, integration, system and user acceptance testing in order and describe who performs each.",
   "Students will be able to explain the purpose of regression, stress, sociability, alpha, beta and pilot testing.",
   "Students will be able to distinguish black-box, white-box and gray-box testing and design boundary value test cases.",
   "Students will be able to evaluate a test sign-off pack for proper UAT ownership, defect acceptance and test data protection."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up bicycle question and draw the test levels as a ladder on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Explain each testing level, regression and non-functional testing, black-box versus white-box, boundary values (for a field accepting 1 to 100, test 0, 1, 100 and 101), test documentation and traceability, data masking and go/no-go criteria."
   ],
   [
    18,
    "Activity",
    "Run the sign-off pack review in groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore schedule pressure and acceptance."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "You are building a bicycle for a friend's race. In what order would you test it, and who should take the final test ride?",
  "activity": {
   "title": "Sign-off pack review",
   "materials": "A teacher-made fictional test sign-off pack (test plan summary, a short traceability table with one requirement untested, a defect log with open high-severity items, a UAT sign-off signed by IT, a note that test data is a production copy); highlighters.",
   "steps": [
    "Groups of three or four read the pack and highlight every issue they would raise before go-live.",
    "For each issue, groups name the correct owner (business owner, project manager, developers, data owner) and the fix.",
    "Groups write boundary test cases for one field described in the pack.",
    "Each group shares its top two issues; the class builds a go/no-go recommendation on the whiteboard."
   ]
  },
  "discussion": [
   "When a deadline is fixed and defects remain open, who should decide whether to go live, and what should they be told?",
   "Why do test environments often have weaker controls than production, and what does that mean for test data?"
  ],
  "exit": [
   [
    "Who should perform and sign off user acceptance testing?",
    "Business users and the system owner."
   ],
   [
    "What is the purpose of regression testing?",
    "To confirm that changes or fixes have not broken functions that previously worked."
   ],
   [
    "Why should production personal data be masked before use in test?",
    "Test environments usually have weaker controls, so unmasked data creates privacy and confidentiality risk."
   ]
  ],
  "differentiation": [
   "Support: give students a checklist of five things to look for in the sign-off pack (UAT owner, open defects, traceability gaps, test data, sign-off authority).",
   "Extend: ask fast finishers to draft go/no-go criteria for the loan system, including how open defects may be formally accepted."
  ]
 },
 {
  "t": "Implementation configuration and release management; changeover approaches",
  "objectives": [
   "Students will be able to explain the purpose of configuration management, the CMDB and version control in implementation.",
   "Students will be able to describe release management controls, including deploying the tested artifact and segregation of duties.",
   "Students will be able to compare parallel, phased, pilot and direct changeover by risk and cost and recommend one for a scenario.",
   "Students will be able to identify controls that verify data conversion accuracy and completeness."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up moving house question and list the four ways students suggest."
   ],
   [
    12,
    "Teach",
    "Explain configuration items, baselines and the CMDB, version control and tags, release management and checksum verification, data conversion reconciliation, the four changeover approaches with their risk and cost, rollback plans and post-implementation review."
   ],
   [
    18,
    "Activity",
    "Run the cutover decision activity in groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore who decides on go-live."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Your family is moving house. List every way you could make the move, from safest to fastest. What would make you choose the fastest one?",
  "activity": {
   "title": "Cutover decision",
   "materials": "Teacher-made system profile cards (a core banking system, a room booking tool, a multi-site inventory system, a payroll system) with notes on criticality, staffing and fallback; a printed conversion reconciliation table with one mismatch; whiteboard.",
   "steps": [
    "Each group of three or four receives one system profile card and chooses a changeover approach, justifying it by risk, cost and staffing.",
    "Groups write three go/no-go criteria and one rollback trigger for their system.",
    "Groups examine the reconciliation table, find the mismatch and state what must happen before go-live.",
    "Groups present their choice; the class challenges any group that chose direct cutover for a critical system or parallel running for a trivial one."
   ]
  },
  "discussion": [
   "Why might a project team be tempted to rebuild code just before release, and what could go wrong?",
   "Who should have the authority to call no-go on cutover day, and why?"
  ],
  "exit": [
   [
    "Which changeover approach carries the highest risk, and why?",
    "Direct cutover, because everything switches at once with no easy fallback."
   ],
   [
    "How can an auditor confirm the deployed release is the version that was tested?",
    "By comparing version identifiers or checksums of the deployed build with the tested build using configuration and release records."
   ],
   [
    "Name two controls that verify data conversion.",
    "Reconciling record counts and control or hash totals between old and new systems, and user verification of samples."
   ]
  ],
  "differentiation": [
   "Support: give students a simple table rating each changeover approach on risk, cost and fallback, to use while choosing.",
   "Extend: ask fast finishers to outline a post-implementation review for their system, including when it should happen, who should do it and which measures it should check."
  ]
 },
 {
  "t": "System migration, infrastructure deployment and data conversion",
  "objectives": [
   "Students will be able to explain the purpose of record counts, control totals and hash totals in reconciling a data conversion.",
   "Students will be able to identify who should sign off converted data and justify why.",
   "Students will be able to compare parallel, phased and direct cutover strategies by risk and fallback needs.",
   "Students will be able to apply change management and the shared responsibility model to infrastructure deployment and cloud migration."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about moving house. Take three or four answers and write the ideas students raise (count boxes, check contents, keep the old key) on the board."
   ],
   [
    12,
    "Teach",
    "Walk through the conversion sequence: identify owners, clean, map, trial convert, reconcile, sign off, final convert, retain old data. Explain each reconciliation total with a small numeric example on the board. Contrast cutover strategies and cover IaC review and shared responsibility."
   ],
   [
    18,
    "Activity",
    "Run the 'Reconcile the migration' exercise below in pairs."
   ],
   [
    5,
    "Discuss",
    "Debrief which errors each total caught and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper or in a shared form."
   ]
  ],
  "warmup": "You are moving house with 60 boxes. How would you know, once you arrive, that nothing was lost, broken or swapped with a neighbor's box?",
  "activity": {
   "title": "Reconcile the migration",
   "materials": "Printed handout with two small tables (source and target, about 12 account records each with account number, name and balance), calculators or student laptops with a spreadsheet, whiteboard.",
   "steps": [
    "Prepare the handout so the target table contains three planted errors: one negative balance loaded as positive, two account numbers swapped between records, and one record with a dropped leading zero.",
    "Pairs calculate the record count, the control total of balances and a hash total of account numbers for both tables and record the differences.",
    "Pairs identify which planted errors each total detected and which needed a field-by-field comparison to find.",
    "Each pair writes a short sign-off memo stating whether the data owner should approve the conversion, and what must be fixed first.",
    "The teacher reveals the planted errors and asks pairs to explain why a matching record count alone would have passed this migration."
   ]
  },
  "discussion": [
   "Why might a project team push back on keeping the old system read-only for months, and how would you respond?",
   "When would a direct cutover be acceptable despite its higher risk?",
   "How does reviewing infrastructure templates change the auditor's work compared with inspecting servers one by one?"
  ],
  "exit": [
   [
    "Record counts and the balance total match, but two account numbers were swapped. Which control would detect this?",
    "A hash total of account numbers or a field-level sample, because counts and amount totals do not change when records are swapped."
   ],
   [
    "Who should sign off that converted data is complete and accurate?",
    "The data owner or business user management, because they are accountable for the data and know what correct looks like."
   ],
   [
    "What is the greatest risk of a direct cutover, and the key control for it?",
    "Everything switches at once with no old system running, so a failure stops the business; the key control is a tested fallback plan."
   ]
  ],
  "differentiation": [
   "Support: Give students a worked example of each total on a three-record table before the activity, and a checklist of the conversion sequence to follow.",
   "Extend: Ask fast finishers to design a reconciliation plan for a cloud migration of a customer database, including who signs off, what is retained and which cloud settings the customer must configure."
  ]
 },
 {
  "t": "Post-implementation review and benefits realization",
  "objectives": [
   "Students will be able to explain the purpose and correct timing of a post-implementation review.",
   "Students will be able to identify the approved business case as the reference point for a PIR.",
   "Students will be able to rewrite a vague benefit as a measurable one with a baseline, target, owner and date.",
   "Students will be able to evaluate a PIR for missing elements such as control testing, independence and tracked actions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a big purchase. Collect answers and link them to timing, a reference point and ownership."
   ],
   [
    12,
    "Teach",
    "Explain PIR timing, the steps of a PIR, who performs it and why independence matters. Introduce benefits realization with a measurable benefit example on the board, separating outputs from benefits."
   ],
   [
    16,
    "Activity",
    "Run the 'Fix the benefits register' activity below in small groups."
   ],
   [
    7,
    "Discuss",
    "Groups share one rewritten benefit and one finding from the PIR excerpt. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of something expensive you or your family bought because it promised to save time or money. When would you check whether it actually did, and how would you measure it?",
  "activity": {
   "title": "Fix the benefits register",
   "materials": "Printed cards with six vague benefit statements, a one-page printed PIR excerpt with planted gaps, sticky notes, whiteboard.",
   "steps": [
    "Give each group the six vague benefit cards, such as 'better reporting' or 'happier customers'.",
    "Groups rewrite each benefit with a baseline, a target, a benefit owner, a date and a data source, and mark whether it is an output or a benefit.",
    "Hand out the PIR excerpt, which was performed one week after go-live by the project manager, compares results with a revised target and has no control testing or action log.",
    "Groups list every weakness they find on sticky notes and place them on the board under timing, reference point, independence, controls and follow-up.",
    "The teacher reviews the board and confirms which weaknesses would be audit findings."
   ]
  },
  "discussion": [
   "Why might a project team prefer to measure results against a revised business case, and how should an auditor respond?",
   "How can an organization make sure lessons learned actually reach the next project team?",
   "What should happen if a benefit is clearly not going to be realized?"
  ],
  "exit": [
   [
    "When should a full PIR be performed?",
    "After the system has operated long enough for benefits and steady-state performance to be measured, typically several months after go-live."
   ],
   [
    "What is the main reference point for a PIR?",
    "The approved business case, including its promised costs, benefits and objectives."
   ],
   [
    "Rewrite 'faster invoicing' as a measurable benefit.",
    "For example: reduce average invoice processing time from five days to two within twelve months, owned by the accounts payable manager and measured from the system."
   ]
  ],
  "differentiation": [
   "Support: Provide a fill-in template with columns for baseline, target, owner, date and data source, and work through one benefit together before groups start.",
   "Extend: Ask fast finishers to draft a benefits tracking report for a fictional project, including one benefit that is behind target and the corrective action they recommend."
  ]
 },
 {
  "t": "IT components and IT asset management: hardware, software, inventory and licensing",
  "objectives": [
   "Students will be able to describe the stages of the IT asset lifecycle and the control needed at each stage.",
   "Students will be able to distinguish testing for completeness from testing for existence of an asset inventory.",
   "Students will be able to explain the risks of license over-deployment and end-of-life systems.",
   "Students will be able to choose an appropriate media sanitization method and the evidence it should produce."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the wedding guest list and collect the two directions of checking students suggest."
   ],
   [
    12,
    "Teach",
    "Walk through the asset lifecycle, the role of the CMDB or register, automated discovery, SAM and license models, EOL risk and sanitization methods. Draw two arrows on the board labeled existence and completeness."
   ],
   [
    17,
    "Activity",
    "Run the 'Three lists' reconciliation activity below in pairs."
   ],
   [
    6,
    "Discuss",
    "Debrief findings and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You are checking the guest list at a wedding. How would you find people who are on the list but missing, and how would you find people who are present but not on the list?",
  "activity": {
   "title": "Three lists: register, scan and purchase records",
   "materials": "Printed handout with three short lists (an asset register of about 15 items, a network discovery scan of about 18 devices, and a purchase record list), a license summary card, highlighters.",
   "steps": [
    "Prepare the lists so the scan includes devices missing from the register, one register entry is no longer found, one device runs an unsupported operating system and the license card shows more installations than licenses.",
    "Pairs trace from the scan and purchase records to the register and highlight items missing from the register.",
    "Pairs trace from the register to the scan and mark items that could not be found.",
    "Pairs label each issue as a completeness, existence, EOL or license finding and write one recommendation for each.",
    "Pairs share findings and the teacher confirms which direction of testing revealed each one."
   ]
  },
  "discussion": [
   "Why do cloud resources slip out of asset registers so easily, and what controls help?",
   "When might isolating an end-of-life system be more realistic than replacing it?",
   "Who should own the asset register: IT, finance or both?"
  ],
  "exit": [
   [
    "How do you test whether an asset register is complete?",
    "Start from independent evidence such as discovery scans or purchase records and confirm each item appears in the register."
   ],
   [
    "What risk does an end-of-life operating system create?",
    "It no longer receives security updates, so vulnerabilities stay open; it should be upgraded, replaced or isolated with compensating controls."
   ],
   [
    "Why is cryptographic erase or destruction often preferred for solid-state drives?",
    "Simple overwriting does not always reliably reach all data on solid-state drives, so destroying the key or the media is more dependable."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-column template labeled 'start here, look for it there' for each direction of testing before they begin tracing.",
   "Extend: Ask fast finishers to compare per-device, per-user and concurrent license models for a fictional design tool and calculate which model leaves the organization compliant."
  ]
 },
 {
  "t": "Job scheduling, production process automation and system interfaces",
  "objectives": [
   "Students will be able to explain why access to the production job scheduler must be restricted and changes controlled.",
   "Students will be able to select completeness controls for interfaces, including reconciliation of counts and totals and sequence numbers.",
   "Students will be able to describe how controlled restart procedures and rerun log review prevent duplicate processing.",
   "Students will be able to specify the access setup for a robotic process automation bot."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the postal service and list student ideas on the board."
   ],
   [
    12,
    "Teach",
    "Explain job scheduling and dependencies with the crontab example, scheduler access controls, restart from checkpoints and rerun logs. Then cover interface completeness and security controls and RPA bot accounts."
   ],
   [
    17,
    "Activity",
    "Run the 'Night shift detective' log-reading activity below."
   ],
   [
    6,
    "Discuss",
    "Groups present their root causes and controls. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A courier sends 100 parcels a day from one warehouse to another. How would the receiving warehouse know if one parcel went missing or arrived twice?",
  "activity": {
   "title": "Night shift detective",
   "materials": "Printed packet per group: a short job schedule, an overnight job log, a rerun log, and an interface reconciliation report, each with planted issues; whiteboard.",
   "steps": [
    "Prepare the packet so it contains a job rerun from the start without approval, an interface reconciliation showing a count difference, a job reporting success with zero records processed and a schedule change made by a developer account.",
    "Groups read the packet and list every anomaly they find with the line or entry where it appears.",
    "For each anomaly, groups name the risk (duplicate posting, missing records, unauthorized change, silent failure) and the control that should have prevented or detected it.",
    "Groups write their top finding on the whiteboard as a one-sentence audit finding with a recommendation.",
    "The teacher reviews each finding and connects it to the exam phrasing in the lesson."
   ]
  },
  "discussion": [
   "Why might operations teams resist restart procedures that slow down recovery from a failed job?",
   "Who should own an interface: the sending team, the receiving team or both?",
   "What could go wrong if a bot keeps running after the process it automates has changed?"
  ],
  "exit": [
   [
    "What control best confirms an interface transferred all records?",
    "Reconciliation of record counts and control totals at sending and receiving ends, with differences investigated."
   ],
   [
    "What risk does reviewing rerun logs address?",
    "Duplicate or unauthorized processing, such as transactions posted twice after an improper restart."
   ],
   [
    "How should an RPA bot's access be configured?",
    "With a dedicated service account, least privilege, credentials in a vault and changes to its logic under change control."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups a checklist of four risk types to look for in the packet and a sample finding sentence to model.",
   "Extend: Ask fast finishers to design a monitoring dashboard for the overnight batch, listing which metrics beyond job completion they would alert on and why."
  ]
 },
 {
  "t": "End-user computing and shadow IT",
  "objectives": [
   "Students will be able to define end-user computing and shadow IT and explain the key risks of each.",
   "Students will be able to risk-rate an EUC tool using how its output is used, its complexity and the value involved.",
   "Students will be able to recommend proportionate controls for high-risk EUC tools.",
   "Students will be able to identify discovery sources for shadow IT, including a CASB, and explain why discovery precedes blocking."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about workarounds at work or school. Note on the board why people build their own tools."
   ],
   [
    12,
    "Teach",
    "Define EUC and shadow IT, list typical risks, explain the EUC inventory and risk rating, proportionate controls, discovery sources and the CASB. Stress that discovery comes before blocking."
   ],
   [
    17,
    "Activity",
    "Run the 'Rate the tools' card sort below in small groups."
   ],
   [
    6,
    "Discuss",
    "Groups defend their highest-rated tool. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Have you ever used an app or built a spreadsheet to get around a slow official system at work or school? What made you do it, and what could go wrong?",
  "activity": {
   "title": "Rate the tools",
   "materials": "About ten printed cards, each describing an EUC tool or a discovered cloud service; a three-column grid on the whiteboard labeled low, medium and high risk; sticky notes.",
   "steps": [
    "Prepare cards such as a team lunch rota spreadsheet, a reserves model feeding financial statements, a personal file-sharing account holding contracts, and an unapproved survey tool holding customer emails.",
    "Groups rate each card by output use, complexity and value involved, then place it in the low, medium or high column.",
    "For each high-risk card, groups write two or three proportionate controls on sticky notes, or for cloud services, whether to govern, replace or block after assessment.",
    "Groups note which discovery source would have found each shadow IT card, such as expense reports, proxy logs, identity provider sign-ins or a CASB.",
    "The teacher reviews placements and challenges any group that recommended a blanket ban without discovery."
   ]
  },
  "discussion": [
   "What does the existence of shadow IT tell IT leadership about its own services?",
   "How would you persuade a busy analyst that independent review of her spreadsheet is worth the time?",
   "When should a high-risk EUC tool be rebuilt as a formal application?"
  ],
  "exit": [
   [
    "What is the first step in managing shadow IT?",
    "Discover which services are in use, through sources such as expense records, proxy logs or a CASB, and then assess their risk."
   ],
   [
    "Name three factors used to rate the risk of an EUC tool.",
    "How its output is used, its complexity and the amount of data or money involved."
   ],
   [
    "Give two controls for a high-risk spreadsheet.",
    "Any two of: controlled storage with backup and version history, restricted edit access, locked formulas, independent review and testing of changes, reconciliation to source systems, documentation."
   ]
  ],
  "differentiation": [
   "Support: Provide a simple scoring sheet that gives one to three points for each of use, complexity and value, so students can total a score before placing cards.",
   "Extend: Ask fast finishers to draft a one-page EUC policy outline covering inventory, risk rating, minimum controls per tier and the approval path for new cloud services."
  ]
 },
 {
  "t": "Systems availability and capacity management",
  "objectives": [
   "Students will be able to distinguish MTBF and MTTR and explain how each affects availability.",
   "Students will be able to explain why capacity management is proactive and which inputs a forecast uses.",
   "Students will be able to identify single points of failure and techniques that improve availability.",
   "Students will be able to evaluate whether an organization's monitoring, thresholds and capacity plan are effective."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the restaurant on a holiday weekend and record student ideas."
   ],
   [
    12,
    "Teach",
    "Define availability and capacity management, reliability, maintainability and resilience, MTBF and MTTR. Show the downtime arithmetic for 99, 99.9 and 99.99 percent. Cover redundancy, failover, SLAs, the three levels of capacity management and auto-scaling limits."
   ],
   [
    17,
    "Activity",
    "Run the 'Forecast the crash' activity below in pairs."
   ],
   [
    6,
    "Discuss",
    "Pairs share their forecast date and plan. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A restaurant is fully booked every Friday. Next month there is a holiday weekend and a food festival in town. What should the manager do now, and what happens if she waits?",
  "activity": {
   "title": "Forecast the crash",
   "materials": "Printed sheet with six months of storage utilization figures for a database, a short business calendar listing a planned promotion, a simple architecture diagram with a hidden single point of failure; calculators or laptops with a spreadsheet.",
   "steps": [
    "Pairs plot or tabulate the monthly utilization and calculate the average monthly growth.",
    "Pairs forecast the month in which storage will reach 100 percent, then adjust the forecast for the promotion on the calendar.",
    "Pairs propose actions and timing, such as expansion in a maintenance window or archiving per retention policy, and set an alert threshold.",
    "Pairs examine the architecture diagram, mark any single point of failure and suggest a redundancy fix.",
    "The teacher reveals the expected forecast and discusses which pairs ignored the business calendar."
   ]
  },
  "discussion": [
   "Why do organizations so often treat capacity management as reactive, even when they have monitoring tools?",
   "Should planned maintenance count against an availability target? Who should decide?",
   "What limits would you set on cloud auto-scaling, and who should be alerted when they are reached?"
  ],
  "exit": [
   [
    "What is the difference between MTBF and MTTR?",
    "MTBF is the average time a component runs between failures (reliability); MTTR is the average time to restore it after failure (maintainability)."
   ],
   [
    "Besides current utilization, what should a capacity forecast use?",
    "Historical trends and business plans such as growth, launches, seasonal peaks and new regulatory requirements."
   ],
   [
    "Monitoring is in place, but outages from full disks keep happening. What is the likely weakness?",
    "Alerts and trend reports are not reviewed and acted on, so capacity management is reactive."
   ]
  ],
  "differentiation": [
   "Support: Give students a partly completed table with growth already calculated for the first three months so they can focus on the forecast and actions.",
   "Extend: Ask fast finishers to calculate the availability of a service from given MTBF and MTTR values, then show how halving MTTR changes the result."
  ]
 },
 {
  "t": "Problem and incident management",
  "objectives": [
   "Students will be able to distinguish incident management from problem management by goal and outcome.",
   "Students will be able to describe the incident process steps, including prioritization by impact and urgency and functional versus hierarchical escalation.",
   "Students will be able to explain known errors, the KEDB and how permanent fixes reach production through change management.",
   "Students will be able to analyze ticket data to identify missing problem management."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the leaking roof and write the two kinds of response on the board."
   ],
   [
    12,
    "Teach",
    "Define incident and problem, walk through the incident steps and the impact and urgency matrix, explain functional and hierarchical escalation, root cause techniques, known errors, the KEDB and the link to change management."
   ],
   [
    17,
    "Activity",
    "Run the 'Ticket trend hunt' activity below in small groups."
   ],
   [
    6,
    "Discuss",
    "Groups present their problem records. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your roof leaks every time it rains. You can put a bucket under it or fix the roof. Which do you do first, which matters more in the long run, and what happens if you only ever do one?",
  "activity": {
   "title": "Ticket trend hunt",
   "materials": "Printed list of about 25 short incident tickets (date, service, symptom, priority, resolution), sticky notes, whiteboard.",
   "steps": [
    "Prepare the ticket list so it includes a recurring incident pattern, one ticket with an obviously wrong priority, a ticket closed without user confirmation and a pattern of lockouts that should go to security.",
    "Groups sort tickets to find recurring patterns and mark tickets with questionable priority or closure.",
    "For the recurring pattern, groups write a problem record: symptom, suspected cause using a five whys chain, workaround to record as a known error and the change request for the permanent fix.",
    "Groups identify any ticket that should have been handed to the security team and explain why.",
    "The teacher compares group findings and highlights how complete logging made the patterns visible."
   ]
  },
  "discussion": [
   "Why might a service desk with excellent resolution metrics still be a weak point for the organization?",
   "How should an organization balance speed of restoring service with preserving evidence when an incident might be security-related?",
   "Who should own a problem record, and what keeps problem records from staying open forever?"
  ],
  "exit": [
   [
    "What is the main goal of incident management?",
    "To restore normal service as quickly as possible and minimize business impact, even with a workaround."
   ],
   [
    "What is a known error?",
    "A problem whose root cause is identified and documented, usually with a workaround, but not yet permanently fixed."
   ],
   [
    "The same incident keeps recurring. What is most likely missing?",
    "Problem management, meaning root cause analysis and a permanent fix through change management."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-column card listing incident words (restore, workaround, ticket, escalate) and problem words (root cause, known error, permanent fix) to refer to during the activity.",
   "Extend: Ask fast finishers to draw a fishbone diagram for the recurring incident in the ticket list, with at least four cause categories."
  ]
 },
 {
  "t": "IT change, configuration, release and patch management",
  "objectives": [
   "Students will be able to describe the steps of a controlled change process, including standard and emergency changes.",
   "Students will be able to explain why segregation of duties matters in change management and identify compensating controls.",
   "Students will be able to choose the correct sampling direction to detect unauthorized changes.",
   "Students will be able to define configuration drift and explain how patch deployment is prioritized and verified."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about building permits and list the controls students suggest."
   ],
   [
    12,
    "Teach",
    "Walk through the change process, standard and emergency changes, segregation of duties, CI/CD pipeline controls, configuration management and drift, release management and patch management with verification."
   ],
   [
    17,
    "Activity",
    "Run the 'Trace the changes' activity below in pairs."
   ],
   [
    6,
    "Discuss",
    "Pairs share findings and explain why the sampling direction mattered. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A neighbor builds an extension without a permit. If the city only checks the permits it has issued, will it ever find this extension? How would it find it?",
  "activity": {
   "title": "Trace the changes",
   "materials": "Two printed lists per pair: a change ticket register of about 12 approved changes and a production deployment log of about 15 entries; a patch compliance summary; highlighters.",
   "steps": [
    "Prepare the lists so the deployment log has three entries with no matching ticket, one ticket approved after implementation, one ticket where the author also approved and deployed and one emergency change with no later review.",
    "Pairs first sample five tickets from the register and trace them to the log, noting what they find.",
    "Pairs then trace every log entry back to the register and highlight entries without tickets or with weak approvals.",
    "Pairs review the patch summary, identify systems outside the policy timeframe and decide which to remediate first based on exposure.",
    "Pairs write two audit findings with recommendations, and the teacher asks why the first sampling direction missed the worst issues."
   ]
  },
  "discussion": [
   "How do automated pipelines strengthen change control, and what new risks do they introduce?",
   "When is it reasonable to treat a patch as a standard change?",
   "What would you accept as evidence that an emergency change was properly reviewed?"
  ],
  "exit": [
   [
    "What is the best way to detect unauthorized production changes?",
    "Sample from system logs, version control or deployment records and trace each change back to an approved ticket."
   ],
   [
    "What makes an emergency change acceptable?",
    "It is logged, uses controlled access and is reviewed and approved as soon as possible after implementation."
   ],
   [
    "What is configuration drift?",
    "Divergence of a system's actual settings from its approved baseline, detected by comparing systems with the baseline or CMDB."
   ]
  ],
  "differentiation": [
   "Support: Give pairs a direction arrow card showing 'production log to ticket' versus 'ticket to production log' with a one-line explanation of what each proves.",
   "Extend: Ask fast finishers to list the pipeline settings they would inspect to confirm that no deployment can reach production without an approval from someone other than the author."
  ]
 },
 {
  "t": "Operational log management and IT service level management",
  "objectives": [
   "Students will be able to identify which events should be logged and what a complete log entry contains.",
   "Students will be able to explain why centralized, protected log storage, time synchronization and retention matter.",
   "Students will be able to distinguish SLAs, OLAs and underpinning contracts.",
   "Students will be able to select trustworthy evidence for verifying reported SLA performance."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the delivery company's tracking and discuss who should produce the evidence."
   ],
   [
    12,
    "Teach",
    "Cover what to log, the five Ws of a log entry, NTP, central forwarding and SIEM, retention and review evidence. Then define the service catalog, SLA, OLA and underpinning contract and explain why independent measurement matters."
   ],
   [
    17,
    "Activity",
    "Run the 'Can we trust this evidence?' activity below in small groups."
   ],
   [
    6,
    "Discuss",
    "Groups share their verdicts. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A delivery company promises next-day delivery and says it hit the target 100 percent of the time last month. What evidence would convince you, and whose records would you trust?",
  "activity": {
   "title": "Can we trust this evidence?",
   "materials": "Printed packet: six short log excerpts from three systems with mismatched timestamps and one vague entry, a provider's SLA report and a page of independent monitoring results showing two outages, a one-paragraph SLA definition; highlighters.",
   "steps": [
    "Groups examine the log excerpts and mark which entries answer all five Ws and which do not.",
    "Groups try to order the events across the three systems and note where clock differences make this impossible.",
    "Groups compare the provider's SLA report with the independent monitoring and the SLA definition, and recalculate availability.",
    "Groups write a verdict for each piece of evidence (reliable, unreliable, needs corroboration) with a reason.",
    "The teacher reviews verdicts and links each to a control: NTP, log content standards, central storage, independent measurement."
   ]
  },
  "discussion": [
   "Who should be allowed to delete logs, and who should review the activity of the people who review logs?",
   "How would you decide how long to keep logs if policy, contracts and regulations say different things?",
   "Why might an SLA that promises too much be worse than one with modest targets?"
  ],
  "exit": [
   [
    "Why should logs be forwarded to a central store?",
    "So administrators or intruders on the source system cannot alter or delete them, and so events can be correlated and retained."
   ],
   [
    "What is the difference between an SLA and an OLA?",
    "An SLA is with the customer and sets service targets; an OLA is an internal agreement between IT teams that supports the SLA."
   ],
   [
    "What is the best evidence that SLA targets were met?",
    "Reliable, independent measurement compared with the agreed targets and definitions, not the provider's own summary."
   ]
  ],
  "differentiation": [
   "Support: Give students a five Ws checklist card and a glossary card for SLA, OLA and underpinning contract to use during the activity.",
   "Extend: Ask fast finishers to draft three measurable SLA targets for an online banking service, including a precise definition of planned downtime."
  ]
 },
 {
  "t": "Database management: DBMS controls, integrity, normalization and DBA duties",
  "objectives": [
   "Students will be able to explain entity integrity and referential integrity using primary and foreign keys.",
   "Students will be able to describe the purpose of normalization and the ACID properties of transactions.",
   "Students will be able to identify the risks of DBA privileges and recommend compensating controls.",
   "Students will be able to evaluate a direct data fix process for approval, logging and review."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the building manager's master key and list controls students propose."
   ],
   [
    12,
    "Teach",
    "Explain tables, primary and foreign keys, entity and referential integrity, normalization with the duplicated address example, ACID with a funds transfer, DBA duties and compensating controls, views, roles, DAM and point-in-time recovery."
   ],
   [
    17,
    "Activity",
    "Run the 'Break the database' paper exercise below in pairs."
   ],
   [
    6,
    "Discuss",
    "Pairs share their DBA control recommendations. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A building manager has one master key to every apartment. What rules would you want around that key, and who should check that they are followed?",
  "activity": {
   "title": "Break the database",
   "materials": "Printed customers and orders tables with planted issues, a one-page DBA access and logging description, whiteboard.",
   "steps": [
    "Prepare the tables so they contain a duplicate primary key, an order pointing to a nonexistent customer and the same customer address stored inconsistently on several orders.",
    "Pairs find each issue and label it as an entity integrity, referential integrity or redundancy and normalization problem.",
    "Pairs redesign the tables on paper so each fact is stored once and links use foreign keys.",
    "Pairs read the DBA description, which includes a shared admin account, logs the DBAs can delete and data fixes without tickets, and list the control weaknesses with fixes.",
    "The teacher reviews answers on the board and connects each to the exam phrasing in the lesson."
   ]
  },
  "discussion": [
   "Why is it hard for a small organization to separate DBA duties, and what compensating controls are realistic?",
   "When is denormalization justified, and what controls keep the copies consistent?",
   "Who should approve a direct data fix: IT, the data owner or both?"
  ],
  "exit": [
   [
    "What does referential integrity prevent?",
    "Foreign keys pointing to records that do not exist, such as orders for a customer not in the customer table."
   ],
   [
    "What does atomicity guarantee?",
    "All steps of a transaction complete or none do, so there is never a partial update."
   ],
   [
    "Name two compensating controls for DBA access.",
    "Any two of: named accounts, logging to a store DBAs cannot modify, independent log review, change management for schema changes, data owner approval of data fixes, limiting the number of DBAs."
   ]
  ],
  "differentiation": [
   "Support: Give students a labeled diagram of two linked tables showing which column is the primary key and which is the foreign key before they start the activity.",
   "Extend: Ask fast finishers to write the schema rule that would enforce referential integrity for their redesigned tables and explain what happens when someone tries to delete a customer with open orders."
  ]
 },
 {
  "t": "Business impact analysis: criticality, RTO, RPO and MTD",
  "objectives": [
   "Students will be able to explain the purpose of a BIA and why it precedes choosing recovery strategies.",
   "Students will be able to define and distinguish MTD, RTO, RPO and SDO.",
   "Students will be able to classify processes into critical, vital, sensitive and nonsensitive tiers.",
   "Students will be able to evaluate whether proposed recovery capabilities meet BIA objectives."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a power cut at home and rank household items on the board by how long they can wait."
   ],
   [
    12,
    "Teach",
    "Explain BIA methods, dependencies, impact over time, management approval, then MTD, RTO, RPO and SDO and how RTO drives site choice while RPO drives backup frequency. Present the four criticality tiers."
   ],
   [
    17,
    "Activity",
    "Run the 'BIA workshop' role-play below in small groups."
   ],
   [
    6,
    "Discuss",
    "Groups present their objectives and recovery choices. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your home loses power. Rank these by how long they can wait: fridge, freezer, internet router, guest-room lamp, medical device. What decides the order?",
  "activity": {
   "title": "BIA workshop role-play",
   "materials": "Printed role cards for process owners (order desk, warehouse, payroll, marketing website) with impact-over-time notes, a BIA worksheet per group, whiteboard.",
   "steps": [
    "Assign one student per group as the BIA facilitator and others as process owners holding role cards.",
    "The facilitator interviews each owner about dependencies, impact after an hour, a day and a week, manual workarounds and tolerable data loss, and records answers on the worksheet.",
    "The group proposes an MTD, RTO and RPO for each process and assigns a criticality tier, checking that each RTO is shorter than its MTD.",
    "The group chooses a recovery approach for each process, such as replication and hot site or nightly backup and cold site, and justifies it by cost and objectives.",
    "The teacher plays senior management, questions one group's choices and approves or sends them back."
   ]
  },
  "discussion": [
   "What should happen when two department heads both insist their process is the most critical?",
   "Why might an organization accept a higher RPO for some systems even though data loss is unpleasant?",
   "How often should a BIA be updated, and what events should trigger an update?"
  ],
  "exit": [
   [
    "What does the RPO determine in practice?",
    "How often data must be backed up or replicated, because it sets the maximum acceptable data loss."
   ],
   [
    "Why must the RTO be shorter than the MTD?",
    "The MTD is the absolute limit; the RTO needs a margin for detection, decisions and verification before that limit is reached."
   ],
   [
    "Which tier describes a process that can be performed manually for a brief period?",
    "Vital."
   ]
  ],
  "differentiation": [
   "Support: Give students a timeline card that marks the disruption point, shows RPO stretching back in time and RTO and MTD stretching forward, to refer to while setting values.",
   "Extend: Ask fast finishers to sketch the cost of recovery capability against the cost of disruption over time and mark the sensible investment point for one process."
  ]
 },
 {
  "t": "System resiliency and data backup, storage and restoration",
  "objectives": [
   "Students will be able to explain why redundancy such as RAID and replication does not replace backups.",
   "Students will be able to compare full, incremental and differential backups by backup speed, storage and restore requirements.",
   "Students will be able to recommend backup storage practices, including the 3-2-1 approach and offline or immutable copies.",
   "Students will be able to identify the best evidence of recoverability and link backup frequency to the RPO."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the spare house key and draw out the ideas of separation and testing."
   ],
   [
    12,
    "Teach",
    "Cover single points of failure, RAID levels, fault tolerance versus high availability, synchronous and asynchronous replication, backup types with a weekly timeline, 3-2-1, immutability, rotation and restore testing."
   ],
   [
    17,
    "Activity",
    "Run the 'Restore race' whiteboard activity below in small groups."
   ],
   [
    6,
    "Discuss",
    "Groups present their redesigned backup strategy. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You keep a spare house key. Where should you keep it so that losing your main keys does not also lose the spare, and how would you know the spare actually works?",
  "activity": {
   "title": "Restore race",
   "materials": "Printed scenario cards describing a backup schedule and a failure day, a weekly calendar grid drawn on the whiteboard, sticky notes in two colors, a short case of a firm with weak backup practices.",
   "steps": [
    "Give each group a scenario card, for example a Sunday full backup with nightly incrementals and a Thursday failure, or the same with differentials.",
    "Groups place sticky notes on the calendar for every backup set needed to restore, and state how much data is lost.",
    "Groups compare results to see which scheme needs fewer sets to restore and which uses less storage during the week.",
    "Groups read the weak-practice case (backups on the same network, same credentials, no restore tests) and redesign it using 3-2-1, an immutable or offline copy and a restore test schedule matched to the RTO and RPO.",
    "The teacher reviews designs and asks each group what evidence an auditor would request."
   ]
  },
  "discussion": [
   "Why might an organization keep relying on green backup status reports instead of running restore tests?",
   "When would synchronous replication be worth its distance limits and cost?",
   "How far away should an offsite copy be, and what else besides distance makes it safe?"
  ],
  "exit": [
   [
    "What is needed to restore from differential backups?",
    "The last full backup and the most recent differential."
   ],
   [
    "Why is RAID not a substitute for backups?",
    "It protects against disk failure but copies deletions, corruption and ransomware encryption instantly, so it cannot restore earlier data."
   ],
   [
    "What is the best evidence that backups are effective?",
    "Documented, successful restore tests of files, systems and applications within the required recovery time."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference card that lists for each backup type what it copies and what a restore needs, to use during the activity.",
   "Extend: Ask fast finishers to design a grandfather-father-son rotation for a small office and calculate how many backup sets it keeps at any time."
  ]
 },
 {
  "t": "Business continuity and disaster recovery plans: recovery sites, testing and maintenance",
  "objectives": [
   "Students will be able to distinguish a business continuity plan from a disaster recovery plan and explain why the BIA comes first.",
   "Students will be able to select an appropriate recovery site (hot, warm, cold, mirrored, cloud, reciprocal) for a given RTO and budget.",
   "Students will be able to order BCP and DRP test types from least to most disruptive and identify which test fits a scenario.",
   "Students will be able to evaluate a plan's maintenance and test evidence and state the correct auditor finding."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect three answers. Write 'how fast' and 'how much it costs' on the board as the two forces every recovery decision balances."
   ],
   [
    13,
    "Teach",
    "Explain BCP versus DRP, the BIA as the first step, RTO and RPO, the recovery site spectrum from mirrored to cold, why reciprocal agreements are weak, and the five test types in order. Close with maintenance: link change management to plan updates."
   ],
   [
    15,
    "Activity",
    "Run the 'Match the site, pick the test' card activity in groups of three."
   ],
   [
    7,
    "Discuss",
    "Groups report one hard match. Use the discussion questions to reinforce that strategy follows the RTO and that failed tests lead to plan updates and retests."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "Your family's car breaks down the night before a long road trip. What are your options for still leaving on time, and how does each option trade money against speed?",
  "activity": {
   "title": "Match the site, pick the test",
   "materials": "Printed business profile cards (8 per group, each with a process, RTO and budget note), printed site cards (hot, warm, cold, mirrored, cloud DR, reciprocal), five test-type cards, whiteboard.",
   "steps": [
    "The teacher prepares profile cards such as 'online trading, RTO minutes', 'payroll, RTO three days', 'archive search, RTO four weeks', 'small charity with a nearby partner'.",
    "Groups match each profile to the most cost-effective site that still meets the RTO and write one sentence of justification on the card.",
    "Groups then place the five test-type cards in order of disruption and choose which test each profile should run next, given that it has only done a checklist review.",
    "The teacher reads out a failed-test scenario (restore took 30 hours against a 12-hour RTO) and each group writes the three next steps.",
    "Groups compare answers with a neighboring group and the teacher resolves disagreements."
   ]
  },
  "discussion": [
   "Why might management choose a slower recovery site than IT recommends, and who should formally accept that risk?",
   "What practical steps keep a recovery plan current in an organization that makes hundreds of IT changes a year?",
   "When, if ever, is a full interruption test worth its risk?"
  ],
  "exit": [
   [
    "What must be completed before choosing a recovery strategy?",
    "The business impact analysis, which sets priorities, RTOs and RPOs."
   ],
   [
    "Which test brings up recovery systems and processes real data without stopping production?",
    "A parallel test."
   ],
   [
    "A DR test misses the RTO. What should happen next?",
    "Document the gaps, fix the causes, update the plan and retest."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page ladder diagram showing site types from mirrored to cold with speed and cost arrows, and let them match only four profiles with a partner.",
   "Extend: Ask fast finishers to list the clauses they would require in a commercial hot site contract and explain why the number of subscribers matters during a regional disaster."
  ]
 },
 {
  "t": "Information asset security policies, frameworks, standards and guidelines",
  "objectives": [
   "Students will be able to classify a security document as a policy, standard, baseline, procedure or guideline and state whether it is mandatory.",
   "Students will be able to identify who approves, owns and implements security documents, including data owner and custodian roles.",
   "Students will be able to describe the purpose of ISO/IEC 27001, the NIST Cybersecurity Framework, CIS Controls and COBIT.",
   "Students will be able to evaluate a policy exception and list what makes it well controlled."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. List student answers on the board in two columns: 'must' and 'should'. Point out that organizations make the same split."
   ],
   [
    12,
    "Teach",
    "Draw the document pyramid: policy, supporting policies, standards and baselines, procedures, with guidelines to the side as advisory. Explain why technical detail stays out of policy, the exception process, the four frameworks, and owner versus custodian."
   ],
   [
    15,
    "Activity",
    "Run the 'Sort the documents' card sort in pairs, followed by the exception review."
   ],
   [
    8,
    "Discuss",
    "Ask pairs to explain one card they disagreed on. Use the discussion questions to connect document design to auditability."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Think about the rules at a part-time job or a sports team you have been on. Which rules were absolute, which were just good advice, and who had the authority to set them?",
  "activity": {
   "title": "Sort the documents",
   "materials": "Printed cards with 14 short document excerpts made by the teacher, header cards (Policy, Standard, Baseline, Procedure, Guideline), three printed exception requests, whiteboard.",
   "steps": [
    "The teacher prepares excerpts such as 'The company is committed to protecting customer information' (policy), 'Passwords must be at least 14 characters' (standard), 'Step 3: open the HR ticket and disable the account' (procedure), 'Consider using a password manager' (guideline), 'PermitRootLogin must be set to no' (baseline).",
    "Pairs place each excerpt under a header and mark it M (mandatory) or A (advisory).",
    "Pairs then read three exception requests, one well formed, one missing an expiry date and one approved by the requester's own team, and decide approve, reject or fix, naming what is missing.",
    "Pairs swap results with another pair and flag disagreements with sticky notes.",
    "The teacher reviews the intended answers and highlights the owner-decides, custodian-implements rule."
   ]
  },
  "discussion": [
   "What goes wrong when a policy contains technical settings that change every year?",
   "Why might a framework certificate give management too much comfort?",
   "How would you persuade a busy team to retire outdated documents that contradict the current standard?"
  ],
  "exit": [
   [
    "Which document type is advisory rather than mandatory?",
    "A guideline."
   ],
   [
    "Who decides the classification of a customer data set?",
    "The data owner, a business manager; IT as custodian implements the controls."
   ],
   [
    "Name three elements of a well-controlled policy exception.",
    "Any three of: formal request, risk assessment, approval by an appropriate owner, compensating controls, expiry date, tracking in a register."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference strip with one plain example of each document type and let them sort only eight cards first.",
   "Extend: Ask fast finishers to map one control, such as quarterly access reviews, to where it would appear in ISO/IEC 27001, the NIST Cybersecurity Framework functions and COBIT, and explain the benefit of mapping."
  ]
 },
 {
  "t": "Physical and environmental controls",
  "objectives": [
   "Students will be able to classify physical controls as preventive, detective or deterrent and choose the control that prevents tailgating.",
   "Students will be able to compare wet-pipe, dry-pipe, pre-action, clean agent and carbon dioxide fire suppression and select one for a given room.",
   "Students will be able to explain the different roles of a UPS, a generator, HVAC and water detection.",
   "Students will be able to list the evidence an auditor gathers to assess physical and environmental controls."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Record answers on the board and label each as prevents, detects or deters."
   ],
   [
    12,
    "Teach",
    "Walk through layered physical access, mantraps, visitor handling, the prevent-detect-deter distinction, power protection, HVAC and water sensors, then the fire suppression options with the life safety trade-off."
   ],
   [
    16,
    "Activity",
    "Run the 'Audit walkthrough' floor plan exercise in groups of three."
   ],
   [
    7,
    "Discuss",
    "Groups present their top three findings. Use the discussion questions to compare prevention with detection."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "How is your home or school building protected against a stranger walking in, a power cut and a small kitchen fire? Which of those protections would actually stop something, and which would only tell you it happened?",
  "activity": {
   "title": "Audit walkthrough: find the gaps on the floor plan",
   "materials": "A printed or projected floor plan of a fictional data center drawn by the teacher with about 10 planted issues, a printed one-page 'maintenance log' excerpt, sticky notes, whiteboard.",
   "steps": [
    "The teacher draws a floor plan showing, for example, a single badge door with a 'door held open' note, a camera with no recorder, a server room under a rooftop water tank, carbon dioxide suppression in a staffed operations room, a network closet marked unlocked and a visitor desk with only a sign-in sheet.",
    "Groups mark each issue with a sticky note, classify the current control as prevent, detect or deter, and write the better control.",
    "Groups read the maintenance log excerpt (UPS last tested 20 months ago, generator never load tested, water sensor fault open) and add environmental findings.",
    "Each group ranks its findings by risk and drafts one audit recommendation for the top item.",
    "The teacher reveals the planted issues and discusses any the groups found that were not planned."
   ]
  },
  "discussion": [
   "Why do people hold secure doors open even after training, and what controls work with human behavior rather than against it?",
   "How does an organization gain assurance over physical controls at a cloud provider's data center it can never visit?",
   "When should life safety outweigh protecting equipment in a design decision?"
  ],
  "exit": [
   [
    "Does a camera prevent tailgating? What does?",
    "No, a camera detects and deters; a mantrap or access control vestibule prevents it."
   ],
   [
    "Which fire suppression system is usually best for a staffed data center and why?",
    "Pre-action, because it needs detection before water enters the pipes, reducing accidental discharge while staying safe for people."
   ],
   [
    "What is the difference between a UPS and a generator?",
    "A UPS gives instant short-term battery power and conditions power; a generator supplies power for long outages after it starts."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-column reference card (prevent, detect, deter) with two examples in each column, and let students work on half the floor plan first.",
   "Extend: Ask fast finishers to write an audit test step for each of three controls (UPS, access list, suppression system), stating the evidence they would request and the sample they would take."
  ]
 },
 {
  "t": "Identity and access management: authentication, authorization, provisioning and access reviews",
  "objectives": [
   "Students will be able to distinguish identification, authentication, authorization and accountability and identify factor types in an MFA scenario.",
   "Students will be able to explain least privilege, RBAC and segregation of duties in role design.",
   "Students will be able to describe controls for joiners, movers, leavers and privileged accounts, including PAM.",
   "Students will be able to design an audit test that compares HR leaver data with active accounts and evaluates access reviews."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the hotel key card. Map student answers onto the four stages written on the board."
   ],
   [
    12,
    "Teach",
    "Explain the four stages and factor types with MFA examples, then RBAC and least privilege, the joiner-mover-leaver cycle, PAM for admins and why owners perform reviews."
   ],
   [
    16,
    "Activity",
    "Run the 'Leaver reconciliation' data exercise in pairs."
   ],
   [
    7,
    "Discuss",
    "Pairs share root causes they identified. Use the discussion questions on automation and meaningful reviews."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "When you check into a hotel, what happens from the moment you walk up to the desk to the moment your key card stops working? Which steps protect the hotel, and which protect you?",
  "activity": {
   "title": "Leaver reconciliation and access review",
   "materials": "Two printed lists made by the teacher: an HR leaver list of 20 names with leave dates, and an account export of 40 accounts with status and last login date; a printed access review sheet for a finance role; highlighters.",
   "steps": [
    "Pairs compare the HR leaver list with the account export and highlight any leaver whose account is still enabled.",
    "For each match, pairs check the last login date against the leave date and flag any login after departure as a potential incident.",
    "Pairs then read the access review sheet, which shows one user with both 'create supplier' and 'release payment' and a reviewer who is an IT administrator, and write two findings.",
    "Each pair drafts a root cause and one preventive and one detective recommendation.",
    "The teacher reveals the planted issues and discusses why automated deprovisioning beats periodic reviews for leavers."
   ]
  },
  "discussion": [
   "Why do access reviews so often end with every line approved, and how could the review be designed to make real decisions easier?",
   "What new risks does single sign-on introduce even as it reduces password problems?",
   "How would you handle service accounts that nobody claims to own?"
  ],
  "exit": [
   [
    "A user enters a password and then a code from a hardware token. Which factor types are used?",
    "Something you know and something you have, so it is MFA."
   ],
   [
    "Who should review user access to a finance application?",
    "The application or data owner in the business, not IT."
   ],
   [
    "What is the best preventive control for leavers' access?",
    "Automated deprovisioning triggered by HR termination events."
   ]
  ],
  "differentiation": [
   "Support: Provide shorter lists (8 leavers, 15 accounts) and a worked first row so students see exactly how to compare dates.",
   "Extend: Ask fast finishers to design PAM controls for a team of database administrators, covering account structure, elevation, logging and review frequency."
  ]
 },
 {
  "t": "Network and endpoint security: firewalls, segmentation, IDS/IPS, remote access and EDR",
  "objectives": [
   "Students will be able to read a short firewall rule set, apply first-match processing and identify overly broad and shadowed rules.",
   "Students will be able to distinguish IDS from IPS and signature-based from anomaly-based detection.",
   "Students will be able to explain how segmentation, a DMZ and zero trust limit the spread of a compromise.",
   "Students will be able to list remote access and endpoint controls, including EDR, and the evidence an auditor reviews for each."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the bouncer. Write 'first match wins' on the board."
   ],
   [
    12,
    "Teach",
    "Cover firewall types, rule order, deny by default and rule hygiene; segmentation and the DMZ; IDS versus IPS; remote access with MFA and posture checks; endpoint controls and EDR coverage."
   ],
   [
    16,
    "Activity",
    "Run the 'Rule set review' exercise in pairs with a printed rule set."
   ],
   [
    7,
    "Discuss",
    "Pairs share findings. Use the discussion questions to move from configuration to operation."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A bouncer reads a guest list from top to bottom and acts on the first line that matches. What happens if the second line says 'let in everyone'?",
  "activity": {
   "title": "Firewall rule set review",
   "materials": "A printed rule set of about 12 rules made by the teacher (with source, destination, port, action, owner and logging columns), a simple network diagram showing internet, DMZ, internal and payment zones, highlighters.",
   "steps": [
    "The teacher builds a rule set that includes a broad 'allow any any' at rule 3, a shadowed deny lower down, a supplier remote desktop rule with logging off, two rules with no owner and a final deny all.",
    "Pairs trace three sample connections through the rules and record which rule matches each one.",
    "Pairs highlight broad, shadowed, unowned and unlogged rules and write the risk of each in one sentence.",
    "Using the diagram, pairs decide whether the web server is correctly placed and whether payment systems are segmented.",
    "Pairs write two audit recommendations and compare them with another pair before the teacher reviews the planted issues."
   ]
  },
  "discussion": [
   "Why do temporary firewall rules so often become permanent, and what process stops this?",
   "If an organization moves fully to zero trust, does segmentation still matter?",
   "What is more valuable to an auditor: a list of tools installed, or evidence of alerts handled?"
  ],
  "exit": [
   [
    "Which system only alerts and which can block?",
    "An IDS only alerts; an IPS sits inline and can block."
   ],
   [
    "What is a shadowed rule?",
    "A rule that never matches because an earlier rule already catches its traffic."
   ],
   [
    "Where should an internet-facing web server be placed?",
    "In a DMZ, separated from both the internet and the internal network."
   ]
  ],
  "differentiation": [
   "Support: Give students a rule set of six rules with one connection traced as a worked example before they try the others.",
   "Extend: Ask fast finishers to rewrite the rule set in the correct order with deny by default and to propose segment rules for an IoT zone."
  ]
 },
 {
  "t": "Data loss prevention and data encryption",
  "objectives": [
   "Students will be able to match network, endpoint and cloud DLP to the data movements each controls and explain why classification comes first.",
   "Students will be able to compare symmetric encryption, asymmetric encryption and hashing and state the typical use of each.",
   "Students will be able to identify key management weaknesses and recommend controls such as an HSM or KMS, rotation and separation of keys from data.",
   "Students will be able to evaluate whether a DLP deployment is operating effectively."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the safe combination. Lead students to the idea that the key matters more than the lock."
   ],
   [
    13,
    "Teach",
    "Cover how DLP finds data, the three DLP types and actions, monitor versus block mode; then symmetric versus asymmetric, hybrid use, data at rest versus in transit, hashing, tokenization and key management."
   ],
   [
    15,
    "Activity",
    "Run the 'Pick the protection' scenario cards in groups of three."
   ],
   [
    7,
    "Discuss",
    "Groups present one scenario each. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "You buy the strongest safe on the market and tape the combination to the door. How safe is what is inside? What does that tell you about encryption?",
  "activity": {
   "title": "Pick the protection",
   "materials": "Printed scenario cards (10 per group) made by the teacher, a reference sheet listing network DLP, endpoint DLP, cloud DLP, symmetric encryption, asymmetric encryption, hashing, tokenization and HSM or KMS, sticky notes.",
   "steps": [
    "The teacher prepares scenarios such as 'stop card numbers being emailed out', 'block copying to USB', 'prove a downloaded file was not altered', 'encrypt a 2 TB backup quickly', 'exchange a session key with a partner', 'give testers realistic but fake customer data', 'key stored in a config file on the database server'.",
    "Groups choose the best control for each card from the reference sheet and write one sentence of reasoning.",
    "For the key storage card, groups write a short audit finding with condition, risk and recommendation.",
    "Groups read a printed DLP status summary (monitor mode for two years, 4,000 unreviewed alerts) and list three operating weaknesses.",
    "The teacher reviews answers and highlights the hashing versus encryption distinction."
   ]
  },
  "discussion": [
   "Why might an organization leave DLP in monitor mode, and how long is too long?",
   "Who should hold access to encryption keys, and who should not?",
   "What can encryption never protect against, and which controls fill that gap?"
  ],
  "exit": [
   [
    "Which type of encryption is used for fast bulk data protection?",
    "Symmetric encryption, such as AES."
   ],
   [
    "Is hashing a form of encryption? Explain.",
    "No. Hashing is one-way and verifies integrity; encryption is reversible with a key and protects confidentiality."
   ],
   [
    "What must happen before DLP rules can be effective?",
    "Data classification, so the organization knows which data is sensitive."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column cheat sheet that pairs each control with one plain-language example, and let students work through five cards with a partner first.",
   "Extend: Ask fast finishers to outline a key lifecycle policy covering generation, storage, access, rotation, backup and destruction for a payment database."
  ]
 },
 {
  "t": "Public key infrastructure (PKI) and digital signatures",
  "objectives": [
   "Students will be able to describe the roles of the CA, RA, root and intermediate CAs, and explain the chain of trust.",
   "Students will be able to state which key is used to sign, verify, encrypt and decrypt in a given scenario.",
   "Students will be able to explain how a digital signature provides integrity, origin authentication and non-repudiation.",
   "Students will be able to identify PKI control weaknesses such as slow revocation, unmonitored expiry and unprotected private keys."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the padlock. Let students argue which direction gives secrecy and which gives proof."
   ],
   [
    12,
    "Teach",
    "Explain certificates and X.509 fields, CA and RA, the offline root and chain of trust, CRL versus OCSP, then the signature process step by step and the confidentiality direction."
   ],
   [
    16,
    "Activity",
    "Run the 'Key direction role-play' with colored cards in groups of four."
   ],
   [
    7,
    "Discuss",
    "Debrief common errors from the role-play. Use the discussion questions on operational PKI risks."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You can hand out as many open padlocks as you like, but only you have the key. How could someone use your padlock to send you a secret? Could the padlock ever prove a message came from you?",
  "activity": {
   "title": "Key direction role-play",
   "materials": "Colored index cards made by the teacher: for each of two students (sender and recipient), one 'public key' card and one 'private key' card in their color; envelopes; scenario slips; whiteboard.",
   "steps": [
    "In groups of four, two students play sender and recipient, one plays the CA and one plays an observer who checks the rules.",
    "For each scenario slip (send a secret, prove origin, do both, verify a disputed order), the sender physically picks the key card to use, and the recipient picks the key to open or verify.",
    "The CA student must issue a 'certificate' (a slip binding the sender's name to the public key card) only after checking the sender's ID card, acting as RA too.",
    "The observer records each key choice and flags any error, such as signing with the recipient's public key.",
    "Groups run a final scenario where a private key card is 'lost' and must decide how revocation is communicated, then the teacher reviews the correct directions on the board."
   ]
  },
  "discussion": [
   "Why do certificate expirations still cause outages at well-run organizations, and what controls prevent them?",
   "What would be the impact if an issuing CA's private key were stolen, and why does an offline root help?",
   "Is a digital signature on a document as strong as the process used to issue the signer's certificate?"
  ],
  "exit": [
   [
    "Which key creates a digital signature and which verifies it?",
    "The sender's private key creates it; the sender's public key verifies it."
   ],
   [
    "To keep a message confidential, which key encrypts it?",
    "The recipient's public key."
   ],
   [
    "Which protocol checks a single certificate's revocation status in real time?",
    "OCSP, the online certificate status protocol."
   ]
  ],
  "differentiation": [
   "Support: Give students a four-row table (sign, verify, encrypt, decrypt) to fill in with whose key and which type before the role-play.",
   "Extend: Ask fast finishers to draft an audit program for a company's internal PKI covering root CA protection, RA identity checks, revocation timeliness and certificate inventory."
  ]
 },
 {
  "t": "Cloud, virtualized, mobile, wireless and IoT environments",
  "objectives": [
   "Students will be able to divide security responsibilities between provider and customer for IaaS, PaaS and SaaS.",
   "Students will be able to explain the main risks of virtualization and containers, including hypervisor compromise and VM sprawl.",
   "Students will be able to evaluate reliance on a provider's SOC 2 report, including complementary user entity controls.",
   "Students will be able to recommend controls for mobile devices, wireless networks and IoT devices."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about renting versus owning. List responsibilities in landlord and tenant columns."
   ],
   [
    12,
    "Teach",
    "Cover hypervisors, VM sprawl and containers; the shared responsibility model across IaaS, PaaS and SaaS; provider assurance and user entity controls; MDM and BYOD; wireless; IoT."
   ],
   [
    16,
    "Activity",
    "Run the 'Whose job is it?' responsibility grid in groups."
   ],
   [
    7,
    "Discuss",
    "Groups defend contested cells on the grid. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When you rent an apartment, what does the landlord take care of, and what is still your job? Does that change if you stay in a hotel instead?",
  "activity": {
   "title": "Whose job is it? Shared responsibility grid",
   "materials": "A large grid drawn on the whiteboard or printed (rows: physical security, hypervisor, operating system patching, application code, network settings, user access, data classification, encryption settings; columns: IaaS, PaaS, SaaS), sticky notes in two colors for provider and customer, three short incident cards.",
   "steps": [
    "Groups place a provider or customer sticky note in each cell of the grid.",
    "The teacher reveals the expected answers and groups note any cells they got wrong and why.",
    "Groups read three incident cards (public storage bucket, former employee's SaaS account still active, hypervisor console exposed at the provider) and decide whose responsibility each failure was.",
    "For each incident, groups write one control and the evidence an auditor would request.",
    "Groups finish by listing two complementary user entity controls they would expect to see in a SaaS provider's SOC 2 report."
   ]
  },
  "discussion": [
   "Why do so many cloud incidents come from customer settings rather than provider failures?",
   "How should an organization balance staff privacy with control over business data on personal phones?",
   "What makes IoT devices harder to secure than ordinary laptops?"
  ],
  "exit": [
   [
    "In SaaS, who manages user access?",
    "The customer."
   ],
   [
    "What is the greatest risk unique to virtualization?",
    "Compromise of the hypervisor or its management console, which affects all guest VMs."
   ],
   [
    "Name two controls for IoT devices.",
    "Any two of: inventory, change default credentials, isolate in a separate segment, update where possible, monitor traffic."
   ]
  ],
  "differentiation": [
   "Support: Give students a partly completed grid with the physical security and user access rows filled in as anchors.",
   "Extend: Ask fast finishers to write three audit test steps for a company's IaaS account, covering public storage, unused access keys and logging."
  ]
 },
 {
  "t": "Security awareness training and information system attack methods",
  "objectives": [
   "Students will be able to identify social engineering types, including phishing, spear phishing, whaling, vishing, smishing, BEC and pretexting, from short scenarios.",
   "Students will be able to match technical attack families such as ransomware, credential stuffing, DDoS and SQL injection to their primary defenses.",
   "Students will be able to design the core elements of a role-based awareness program.",
   "Students will be able to choose behavior-based metrics to evaluate awareness program effectiveness."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up prompt and ask students what made them suspicious of a message they once received. Write the red flags on the board."
   ],
   [
    12,
    "Teach",
    "Cover social engineering types, the main technical attack families and their defenses, then awareness program design, reporting culture and behavior-based metrics."
   ],
   [
    16,
    "Activity",
    "Run the 'Spot it, stop it' scenario card activity in pairs, followed by the metrics exercise."
   ],
   [
    7,
    "Discuss",
    "Debrief the hardest scenarios and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Think of a text, email or call you received that you suspected was a scam. What made you suspicious, and what did you do next?",
  "activity": {
   "title": "Spot it, stop it",
   "materials": "Printed scenario cards (12 per pair) made by the teacher, each describing a short fictional incident in plain text with no real links; a printed metrics table showing two years of awareness data; whiteboard.",
   "steps": [
    "The teacher writes scenarios such as a fake supplier bank change, a text claiming a parcel delivery fee, a call from 'IT' asking for a code, a USB stick in the car park, thousands of logins with leaked passwords, a web form error revealing database text.",
    "Pairs label each card with the attack type and the single best control, choosing from a list on the board.",
    "Pairs read the metrics table (completion 100 percent both years, click rate flat, report rate low) and write a two-sentence assessment of program effectiveness.",
    "Pairs propose two changes to the program and one metric they would track.",
    "The teacher reviews answers, stressing call-back verification on known numbers and MFA for credential attacks."
   ]
  },
  "discussion": [
   "Why might a program with perfect completion rates still fail to change behavior?",
   "How do you build a reporting culture where people admit they clicked?",
   "Which roles in an organization deserve extra training, and why?"
  ],
  "exit": [
   [
    "An email that appears to come from the CEO asks finance to wire funds urgently. What is the attack and the best control?",
    "Business email compromise; independent verification by calling back on known contact details."
   ],
   [
    "What is the best control against credential stuffing?",
    "Multifactor authentication."
   ],
   [
    "Which metric best shows awareness training is working?",
    "Behavior trends, such as rising phishing report rates and falling click rates, not completion rates."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page glossary of attack types with a one-line example each, and have them work through six cards first.",
   "Extend: Ask fast finishers to draft a one-page awareness plan for a help desk team, including scenarios to practice, a verification procedure and two metrics."
  ]
 },
 {
  "t": "Security testing tools and techniques: vulnerability scanning, penetration testing and configuration review",
  "objectives": [
   "Students will be able to distinguish vulnerability scanning, penetration testing, red team exercises and configuration review by purpose and output.",
   "Students will be able to explain why authenticated scans and risk-based prioritization give better results.",
   "Students will be able to list the elements of written authorization and rules of engagement required before a penetration test.",
   "Students will be able to evaluate a remediation tracker against policy timeframes and recommend audit actions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the building inspector and the hired professional. Contrast 'listing problems' with 'proving impact'."
   ],
   [
    12,
    "Teach",
    "Cover scanning, authenticated versus unauthenticated, CVSS plus exposure, remediation and rescanning; penetration testing knowledge levels and red teams; authorization and rules of engagement; SAST, DAST and configuration review."
   ],
   [
    16,
    "Activity",
    "Run the 'Audit the testing program' document review in groups of three."
   ],
   [
    7,
    "Discuss",
    "Groups share their top finding. Use the discussion questions on scope and independence."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A building inspector walks every floor with a checklist. A hired professional tries to actually get into the vault. What does each one tell the owner that the other does not?",
  "activity": {
   "title": "Audit the testing program",
   "materials": "A printed packet made by the teacher: a one-page scan summary, a remediation tracker excerpt with dates, a penetration test scope letter and a blank rules of engagement checklist; highlighters.",
   "steps": [
    "The teacher prepares a packet in which scans are unauthenticated, 15 of 40 critical findings exceed the 30-day policy, the scope letter excludes the most exposed system at the system owner's request, and the approval is an email from the IT manager.",
    "Groups compare the tracker dates with the policy and calculate how many findings are overdue.",
    "Groups check the scope letter against the rules of engagement checklist and mark missing items such as emergency contacts and data handling.",
    "Groups write three findings with condition, risk and recommendation.",
    "Groups swap findings with another group, give one piece of feedback, and the teacher reviews the planted issues."
   ]
  },
  "discussion": [
   "Who should decide the scope of a penetration test, and why should system owners not be able to exclude their own systems?",
   "When is a black box test more useful than a white box test, and when is it a waste of time?",
   "How should an organization handle a critical vulnerability that cannot be patched?"
  ],
  "exit": [
   [
    "Which test demonstrates what an attacker could actually achieve?",
    "A penetration test."
   ],
   [
    "What must exist before a penetration test starts?",
    "Written authorization from appropriate management with an agreed scope and rules of engagement."
   ],
   [
    "Why are authenticated scans more accurate?",
    "They log in and can see installed software and settings, not just what is exposed on the network."
   ]
  ],
  "differentiation": [
   "Support: Provide a highlighted example of one overdue finding and a partly filled rules of engagement checklist to guide students.",
   "Extend: Ask fast finishers to design a risk-based testing calendar for a year, deciding which systems get scans, authenticated scans, penetration tests and a red team exercise, and why."
  ]
 },
 {
  "t": "Security monitoring: logs, SIEM and alert management",
  "objectives": [
   "Students will be able to explain how a SIEM collects, normalizes and correlates logs, and how UEBA and SOAR extend it.",
   "Students will be able to identify causes of alert fatigue and propose tuning and prioritization steps.",
   "Students will be able to test SIEM coverage by reconciling log sources with an asset inventory.",
   "Students will be able to evaluate a sample of alerts for evidence of proper triage and escalation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the home alarm. Write 'coverage', 'noise' and 'response' on the board."
   ],
   [
    12,
    "Teach",
    "Explain log sources, SIEM normalization and correlation with the failed-login example, UEBA and SOAR, use cases, tuning and alert fatigue, SOC procedures, MTTD and MTTR, and log source health monitoring."
   ],
   [
    16,
    "Activity",
    "Run the 'Coverage and alert sample' exercise in pairs."
   ],
   [
    7,
    "Discuss",
    "Pairs report findings. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your home alarm has sensors on most doors and goes off for no reason twice a day. What would you do after a week of this, and what does that teach us about security alerts?",
  "activity": {
   "title": "Coverage and alert sample",
   "materials": "Printed sheets made by the teacher: an asset inventory of 15 systems marked by criticality, a SIEM log source list of 12 systems with last-received times, and a table of 10 sampled alerts with severity, status and closure notes; highlighters.",
   "steps": [
    "Pairs compare the inventory with the log source list and highlight critical systems that are missing or have not sent logs recently.",
    "Pairs review the 10 sampled alerts and mark any closed without notes, closed too slowly for their severity or never opened.",
    "Pairs read three short log lines (many failed logins, then a success from a new country, then a large download) and write the correlation rule that would catch the pattern in plain words.",
    "Pairs write two audit findings with recommendations.",
    "The teacher reviews the planted gaps and asks pairs to rank the findings by risk."
   ]
  },
  "discussion": [
   "Why might a SOC team resist having its own activity monitored, and why is it still necessary?",
   "How do you decide which use cases to build first when you cannot detect everything?",
   "What are the risks of letting a SOAR playbook disable accounts automatically?"
  ],
  "exit": [
   [
    "What does correlation in a SIEM mean?",
    "Linking related events from different sources to reveal a suspicious pattern no single log shows."
   ],
   [
    "What is alert fatigue and how is it reduced?",
    "Desensitization from too many, often false, alerts; reduced by tuning rules, risk-based use cases and automating routine triage."
   ],
   [
    "How does an auditor test SIEM coverage?",
    "Reconcile active log sources with the asset inventory, focusing on critical systems, and check for log source health alerts."
   ]
  ],
  "differentiation": [
   "Support: Give students a smaller inventory (8 systems) and a worked example of one missing source before they continue.",
   "Extend: Ask fast finishers to map three use cases to attacker techniques and describe the log sources each needs."
  ]
 },
 {
  "t": "Security incident response management, evidence collection and forensics",
  "objectives": [
   "Students will be able to sequence the incident response lifecycle phases and give an example action for each.",
   "Students will be able to order evidence sources by volatility and explain why isolation is preferred to powering off.",
   "Students will be able to explain how hashes, write blockers and chain of custody preserve evidence integrity.",
   "Students will be able to evaluate an incident response plan's preparation elements, including legal notification and exercises."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the fire brigade. List what happens before, during and after a fire."
   ],
   [
    12,
    "Teach",
    "Walk through the six lifecycle phases, legal notification and out-of-band communication, order of volatility, forensic imaging with hashes and write blockers, and chain of custody."
   ],
   [
    16,
    "Activity",
    "Run the 'Ransomware Monday' timeline sort in groups of four."
   ],
   [
    7,
    "Discuss",
    "Groups compare their timelines. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A fire brigade arrives at a burning building. What did they do long before the fire started, what do they do first on arrival, and what happens after the fire is out?",
  "activity": {
   "title": "Ransomware Monday timeline sort",
   "materials": "Printed action cards (about 16 per group) made by the teacher, six phase header cards, a blank chain of custody form, sticky notes, whiteboard.",
   "steps": [
    "The teacher prepares action cards such as 'isolate server from network', 'capture memory', 'image the disk and record hashes', 'pull the power cord', 'restore last night's backup', 'remove hidden admin accounts', 'confirm backups predate intrusion', 'legal assesses notification', 'hold lessons-learned review', 'run tabletop exercise last quarter'.",
    "Groups place each action under the correct lifecycle phase and in order, and set aside any action that should not be done, writing why on a sticky note.",
    "Groups order the evidence cards (memory, running processes, temporary files, disk, remote logs, archived backups) by volatility.",
    "Each group fills in the chain of custody form for the disk image, including who, when, where and the hash value placeholder.",
    "Groups compare timelines with another group and the teacher reviews the correct sequence, highlighting why restore comes after eradication."
   ]
  },
  "discussion": [
   "Why do people under pressure so often want to restore or wipe systems immediately, and how can a plan counter that instinct?",
   "Who should own the decision to notify regulators or customers, and why must that be decided before an incident?",
   "What value does a lessons-learned review add if the incident was handled well?"
  ],
  "exit": [
   [
    "List the incident response phases in order.",
    "Preparation, detection and analysis, containment, eradication, recovery, post-incident review."
   ],
   [
    "Which should be collected first, memory or disk? Why?",
    "Memory, because it is more volatile and is lost when power is removed."
   ],
   [
    "How do you prove a forensic image has not been altered?",
    "Hash the original and the copy and show they match, and keep chain of custody records for every transfer and access."
   ]
  ],
  "differentiation": [
   "Support: Give students the six phase cards already in order and ask them only to place the action cards under each phase.",
   "Extend: Ask fast finishers to draft a one-page ransomware playbook listing decision points, who makes each decision and when legal counsel and forensic specialists are engaged."
  ]
 }
]);
