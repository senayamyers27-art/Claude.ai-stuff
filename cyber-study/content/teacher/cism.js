/* Teacher edition for ISACA Certified Information Security Manager (CISM) (2026 exam content outline): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("cism", [
 {
  "t": "Enterprise governance and the role of the information security manager",
  "objectives": [
   "Students will be able to distinguish governance (evaluate, direct, monitor) from management (plan, build, run, monitor).",
   "Students will be able to explain the difference between accountability and responsibility and state where each sits for information security.",
   "Students will be able to list the outcomes of effective security governance, including strategic alignment, risk management and value delivery.",
   "Students will be able to choose the CISM-preferred action in a scenario where a business initiative carries security risk."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up prompt. Collect three or four answers and write \"decides\" and \"advises\" as two columns on the board, sorting the roles students mention."
   ],
   [
    12,
    "Teach",
    "Explain governance versus management with the COBIT EDM and plan-build-run-monitor split. Walk through the governance loop, then the CISO's position between governance and management. Stress: accountability cannot be delegated. Close with the governance outcomes and senior management commitment."
   ],
   [
    18,
    "Activity",
    "Run the \"Who decides?\" card sort described below. Circulate and ask each group to justify one placement aloud."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the card sort to exam clue words such as \"ultimately accountable\" and \"gain support.\""
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your company's sales team wants to launch a risky new app next month. Who should make the final call on whether it launches: the security manager, the sales director, or someone else? Why?",
  "activity": {
   "title": "Who decides? Governance and management card sort",
   "materials": "Printed cards (one set per group of three or four), whiteboard or large paper with three columns labeled Board/Senior management, Information security manager, Business risk owner.",
   "steps": [
    "Give each group a set of about 12 cards, each describing an action, such as \"Approve the risk appetite statement,\" \"Present residual risk in business terms,\" \"Sign off residual risk for the claims process,\" \"Run the quarterly security report,\" \"Approve the security strategy and budget.\"",
    "Groups place each card under the role that should own it, and mark each card D (decides/accountable) or R (responsible for doing the work).",
    "Add two trap cards, such as \"Quietly accept a high risk to avoid delaying a launch\" and \"Buy a security tool before understanding the business need.\" Groups must decide that no one should do these and explain why.",
    "Each group presents one card it argued about. The teacher confirms the CISM answer and links it to accountability versus responsibility."
   ]
  },
  "discussion": [
   "Why might a CISO who says no to every risky project actually weaken security in the long run?",
   "What visible behaviors from executives would convince you that senior management is truly committed to security?"
  ],
  "exit": [
   [
    "Who is ultimately accountable for information security?",
    "The board and senior management; the CISO is responsible for running the program."
   ],
   [
    "Governance answers which question, and management answers which?",
    "Governance: are we doing the right things? Management: are we doing things right?"
   ],
   [
    "What is the most important factor for a successful security program?",
    "Senior management commitment, shown through approved strategy, funding and personal example."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column cheat sheet (Decides / Advises and does) with three filled-in examples before the card sort, and pair them with a confident partner.",
   "Extend: Ask fast finishers to draft a one-paragraph note from the CISO to the executive committee about a risky initiative that presents options and residual risk without making the business decision."
  ]
 },
 {
  "t": "Organizational culture and its effect on security behavior",
  "objectives": [
   "Students will be able to identify observable signs of a weak or strong security culture in a workplace scenario.",
   "Students will be able to explain how tone at the top and middle management shape security behavior.",
   "Students will be able to propose culture-based responses, such as control redesign, security champions and blame-free reporting, to routine non-compliance.",
   "Students will be able to select appropriate measures for assessing culture beyond training completion rates."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. List student examples of rules people ignore and, next to each, the reason they gave."
   ],
   [
    12,
    "Teach",
    "Define security culture and its visible signs. Explain assessment sources (surveys, interviews, reporting speed, exception trends). Cover tone at the top, middle managers, security champions and blame-free reporting. Emphasize: find the cause before adding enforcement."
   ],
   [
    18,
    "Activity",
    "Run the \"Workaround detective\" case analysis below in groups of three."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, steering toward the exam pattern: workaround clue words point to cause and leadership, not punishment."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions individually on paper."
   ]
  ],
  "warmup": "Think of a rule at school or work that most people quietly ignore. Why do they ignore it, and what would actually get them to follow it?",
  "activity": {
   "title": "Workaround detective",
   "materials": "Printed case cards (four short scenarios), sticky notes, whiteboard.",
   "steps": [
    "Give each group one case card, for example: staff share one login because sign-in is slow; developers self-approve code under deadline pressure; employees stop reporting phishing after a colleague was disciplined; an executive has a permanent exception to MFA.",
    "Groups write on sticky notes: the likely root cause, the evidence they would collect to confirm it, and one culture-based fix.",
    "Each group also writes the \"distractor\" answer an exam might offer, such as more logging or disciplinary action, and why it is weaker.",
    "Groups post notes on the board under Cause, Evidence, Fix and Distractor, and the teacher reviews patterns across all four cases."
   ]
  },
  "discussion": [
   "When is enforcement or discipline the right response, and how do you know you have already addressed the cause?",
   "How would you measure whether a culture change actually worked six months later?"
  ],
  "exit": [
   [
    "Why can a technically sound policy still fail?",
    "Because it clashes with culture or lacks leadership support, so people work around it."
   ],
   [
    "What is the strongest influence on security culture?",
    "Senior management's visible commitment and example, the tone at the top."
   ],
   [
    "Staff hide small security mistakes. What should the manager encourage?",
    "Blame-free reporting, so problems surface early and can be contained."
   ]
  ],
  "differentiation": [
   "Support: Provide a sentence frame for the activity (\"People do X because Y; we could check by Z; a better fix is W\") and assign the clearest case card.",
   "Extend: Ask fast finishers to design a five-question anonymous culture survey and explain which answer patterns would worry them."
  ]
 },
 {
  "t": "Legal, regulatory and contractual requirements",
  "objectives": [
   "Students will be able to distinguish legal, regulatory and contractual requirements and explain why each is binding.",
   "Students will be able to describe the steps to build and maintain a compliance register and map obligations to controls.",
   "Students will be able to choose the correct response when local law conflicts with corporate policy.",
   "Students will be able to explain why outsourcing does not transfer accountability and which contract clauses help."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and record answers. Highlight the difference between rules imposed on you and promises you choose to make."
   ],
   [
    12,
    "Teach",
    "Cover sources of obligations, the compliance register, mapping to controls, gap assessment and evidence. Explain specific versus principle-based requirements, compliance as a floor, conflicts with local law and flow-down of obligations to providers."
   ],
   [
    18,
    "Activity",
    "Run the \"Build the register\" exercise below in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reinforce first-step thinking: identify requirements and impact before choosing controls."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "Your company signs a contract promising a customer it will report any incident within 24 hours. Nobody passed a law requiring this. Does the company still have to do it? What happens if it does not?",
  "activity": {
   "title": "Build the register",
   "materials": "Printed one-page fictional scenario (a payroll company expanding to a new country and signing a bank client), blank register templates with columns Source, Requirement, Scope, Mapped controls, Owner, Evidence, Last reviewed; student laptops or paper.",
   "steps": [
    "Pairs read the scenario and identify at least four obligations, labeling each as law, regulation or contract.",
    "For each, they fill in one register row, naming a plausible control and the evidence they would show an auditor.",
    "The teacher reveals a twist: a local data localization rule conflicts with the group's central hosting policy. Pairs write the correct handling steps.",
    "A second twist: the company's cloud provider contract allows 72 hours to report incidents. Pairs explain the problem with the 24-hour bank clause and what contract change they would seek."
   ]
  },
  "discussion": [
   "Why do you think regulators hold organizations accountable for what their vendors do with data?",
   "Can an organization be fully compliant and still carry unacceptable risk? Give an example."
  ],
  "exit": [
   [
    "What is the first step when the business enters a new jurisdiction?",
    "Identify the applicable legal and regulatory requirements and assess their impact."
   ],
   [
    "Local law conflicts with group policy. What should happen?",
    "Document the conflict, get legal advice and approve a formal local standard or exception with the risk understood."
   ],
   [
    "Does outsourcing transfer legal accountability?",
    "No. Obligations flow to the provider by contract, but accountability stays with the organization."
   ]
  ],
  "differentiation": [
   "Support: Pre-fill two register rows as models and give struggling pairs a list of candidate obligations to classify rather than find.",
   "Extend: Ask fast finishers to identify which obligations are principle-based and explain how the organization would justify its controls as appropriate using a risk assessment."
  ]
 },
 {
  "t": "Organizational structures, roles and responsibilities (board, steering committee, CISO, data owners)",
  "objectives": [
   "Students will be able to describe the responsibilities of the board, executive management, steering committee, CISO, data owners, custodians, users and internal audit.",
   "Students will be able to build a RACI chart with exactly one accountable party per activity.",
   "Students will be able to identify conflicts of interest in reporting lines and independence problems for internal audit.",
   "Students will be able to assign a scenario action, such as classifying data or approving access, to the correct role."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers. Note how often students name IT as the owner."
   ],
   [
    10,
    "Teach",
    "Walk through each role. Explain why the steering committee must be cross-functional, why CISO reporting lines matter, and why audit must stay independent. Show the RACI extract from the lesson on the projector."
   ],
   [
    20,
    "Activity",
    "Run the \"RACI relay\" activity below in groups of four."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions and map the answers to exam clue words."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "A hospital's patient records live on servers run by the IT department. Who should decide which staff can see a patient's records: IT, the head of nursing, the security team, or someone else? Why?",
  "activity": {
   "title": "RACI relay",
   "materials": "Whiteboard or large paper with a blank RACI grid (activities down the side; Data owner, CISO, IT custodian, Internal audit, Steering committee across the top), marker pens, printed list of six activities.",
   "steps": [
    "Each group receives six activities, such as classify customer data, approve an access request, configure backups, test access controls, prioritize next year's security initiatives, and accept residual risk on a business process.",
    "Group members take turns filling one cell at a time with R, A, C or I, explaining their choice aloud to the group.",
    "Groups check their grid: every activity must have exactly one A, and internal audit must not be R for operating any control.",
    "The teacher presents two problem cases (a CISO reporting to IT operations whose findings are softened; audit offering to fix access itself), and groups identify the structural fix for each."
   ]
  },
  "discussion": [
   "What could go wrong if two different managers were both accountable for approving access to the same system?",
   "If the CISO must stay under the CIO for practical reasons, what safeguards could protect the independence of security reporting?"
  ],
  "exit": [
   [
    "Who should classify a customer database?",
    "The business data owner."
   ],
   [
    "Who implements backups and access settings the owner approves?",
    "The data custodian, usually IT."
   ],
   [
    "Why must internal audit not operate the controls it audits?",
    "It would lose independence, so its assurance to the board could not be trusted."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a role card summary (one line per role) to keep beside the grid, and start them with the two easiest activities.",
   "Extend: Ask fast finishers to draft a short steering committee charter covering purpose, membership, decision rights, meeting frequency and upward reporting."
  ]
 },
 {
  "t": "Information security strategy: current state, desired state and gap analysis",
  "objectives": [
   "Students will be able to explain why a security strategy must start from business objectives.",
   "Students will be able to describe current state, desired state and gap analysis using a maturity scale.",
   "Students will be able to prioritize gaps by business risk, cost, effort and dependencies to produce a roadmap.",
   "Students will be able to state the correct strategy sequence and when a strategy must be revisited."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Run the warm-up prompt and record two or three student answers about how they plan a big goal."
   ],
   [
    12,
    "Teach",
    "Present the sequence: business objectives, current state, desired state, gap analysis, roadmap, approval, monitoring. Explain maturity models and why targets differ by process. Cover constraints, dependencies and why the strategy is a living document."
   ],
   [
    18,
    "Activity",
    "Run the \"Gap to roadmap\" whiteboard exercise below in groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to tie the exercise to \"first\" and \"most important input\" exam questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "You want to run a 10-kilometer race in a year. What two things do you need to know before you can make a training plan?",
  "activity": {
   "title": "Gap to roadmap",
   "materials": "Printed fictional profile of an organization with business goals and current maturity scores for five capabilities; whiteboard or large paper; sticky notes in two colors.",
   "steps": [
    "Groups read the business goals (for example, launching an online service handling health data within eighteen months) and set a target maturity for each of the five capabilities, justifying each target from the goals.",
    "Groups calculate the gap for each capability and write each gap on a sticky note with its business risk rated high, medium or low.",
    "Groups arrange the sticky notes on a timeline, respecting dependencies (for example, asset inventory before incident response), and add an owner and a rough cost class to each.",
    "Each group presents its roadmap in two minutes as if to the executive committee. The teacher then announces an acquisition, and groups say which step they would revisit first."
   ]
  },
  "discussion": [
   "Why might a CISO choose a lower target maturity for some processes on purpose?",
   "What makes a strategy look generic, and how would an executive spot it?"
  ],
  "exit": [
   [
    "What is the most important input to a security strategy?",
    "The business strategy and objectives."
   ],
   [
    "Should every desired state be the highest maturity level?",
    "No. It should be the level the business needs for its risk, since higher maturity costs more."
   ],
   [
    "What should drive the priority of roadmap initiatives?",
    "The business risk of each gap, balanced with cost, effort and dependencies."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed gap table with targets filled in for two capabilities, so struggling students focus on calculating gaps and ordering them.",
   "Extend: Ask fast finishers to write two measurable success metrics for their top roadmap initiative and one stated assumption leadership should know about."
  ]
 },
 {
  "t": "Governance frameworks and standards: COBIT, ISO/IEC 27001, NIST CSF 2.0",
  "objectives": [
   "Students will be able to state the purpose of COBIT, ISO/IEC 27001, ISO/IEC 27002 and NIST CSF 2.0.",
   "Students will be able to name the six NIST CSF 2.0 functions and identify Govern as the function added in 2.0.",
   "Students will be able to explain which framework is certifiable and the role of the statement of applicability.",
   "Students will be able to select a suitable framework for a stated business need."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and write student answers on the board."
   ],
   [
    12,
    "Teach",
    "Present each framework's purpose: COBIT (EDM plus APO, BAI, DSS, MEA, goals cascade), ISO/IEC 27001 (ISMS, clauses, SoA, certification), ISO/IEC 27002 (control guidance, not certifiable), NIST CSF 2.0 (six functions, profiles, tiers, voluntary). Briefly mention SP 800-53, CIS Controls and ITIL."
   ],
   [
    18,
    "Activity",
    "Run the \"Match the need\" card game described below in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to emphasize that business needs drive framework choice."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "A customer says they will only sign a contract if your company has an independent security certificate. What do you think that certificate proves, and what does it not prove?",
  "activity": {
   "title": "Match the need",
   "materials": "Printed need cards (about ten) and framework cards (COBIT, ISO/IEC 27001, ISO/IEC 27002, NIST CSF 2.0, NIST SP 800-53, CIS Controls) for each pair.",
   "steps": [
    "Pairs receive need cards such as \"Customers demand certification,\" \"Board wants a simple current and target posture view,\" \"Clarify decision rights between IT and business units,\" \"Guidance on implementing a specific control.\"",
    "Pairs match each need to the best framework and write the clue word that led them there, such as certification, goals cascade or profile.",
    "Pairs check one trap card, \"Get certified against ISO/IEC 27002,\" and explain why it is impossible.",
    "The class reviews answers together; the teacher records the clue words on the board as a revision list."
   ]
  },
  "discussion": [
   "Why might an organization use more than one framework at the same time, and what is the risk of doing so?",
   "Why does adopting a framework not guarantee security?"
  ],
  "exit": [
   [
    "Which standard can an organization be certified against: ISO/IEC 27001 or 27002?",
    "ISO/IEC 27001."
   ],
   [
    "Name the six functions of NIST CSF 2.0.",
    "Govern, Identify, Protect, Detect, Respond and Recover."
   ],
   [
    "Which framework addresses governance and management of enterprise IT with a goals cascade?",
    "COBIT."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page framework summary with a single-line purpose for each, and reduce the need cards to the five clearest ones.",
   "Extend: Ask fast finishers to sketch how one control, such as access review, would appear in ISO/IEC 27001 Annex A, NIST CSF 2.0 and COBIT, and explain why organizations map controls between frameworks."
  ]
 },
 {
  "t": "Strategic planning: business cases, budgets and resource allocation",
  "objectives": [
   "Students will be able to outline the structure of a security business case tied to business objectives.",
   "Students will be able to distinguish CapEx from OpEx and explain total cost of ownership.",
   "Students will be able to calculate return on security investment from annualized loss expectancy figures.",
   "Students will be able to justify resource allocation decisions based on risk reduction, dependencies and reserve capacity."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Use the warm-up prompt and list student arguments on the board, sorting them into features versus benefits."
   ],
   [
    12,
    "Teach",
    "Present the business case outline, CapEx and OpEx, TCO, budget drivers, people as resources, reserve capacity and the ROSI formula. Work the lesson's ROSI example on the board."
   ],
   [
    18,
    "Activity",
    "Run the \"Pitch to the CFO\" role-play described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the role-play to exam clue words like \"obtain funding\" and \"justify.\""
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions, including one ROSI calculation."
   ]
  ],
  "warmup": "You want your family to pay for a new home security system. Write down the one sentence most likely to convince them.",
  "activity": {
   "title": "Pitch to the CFO",
   "materials": "Printed scenario cards with fictional figures (current estimated annual loss, two or three options with annual cost and expected loss after), calculators or student laptops, whiteboard.",
   "steps": [
    "In groups of three, students receive a scenario such as shared administrator passwords on plant systems, with options including doing nothing, a process-only fix and a tool purchase.",
    "Groups calculate ROSI for each option and list TCO items they would add beyond the purchase price.",
    "Groups write a one-minute pitch: business problem, options, recommendation, assumptions and success metric.",
    "One student per group plays the CFO for another group and asks two challenging questions, such as \"What are your assumptions?\" or \"What happens if we do nothing?\" Groups then refine their pitch."
   ]
  },
  "discussion": [
   "Why might an honest range of estimates persuade an executive more than a single precise number?",
   "What are the risks of planning every hour of the security team's time in advance?"
  ],
  "exit": [
   [
    "What should a security business case emphasize most?",
    "How the investment reduces risk to business objectives, or enables them, relative to cost."
   ],
   [
    "A control costs 40,000 a year and reduces ALE from 160,000 to 80,000. What is the ROSI?",
    "(160,000 - 80,000 - 40,000) / 40,000 = 1, or 100 percent."
   ],
   [
    "Why is a peer benchmark not enough to set a security budget?",
    "It ignores the organization's own assets, threats and risk appetite."
   ]
  ],
  "differentiation": [
   "Support: Provide a fill-in business case template and a worked ROSI example with each step labeled.",
   "Extend: Ask fast finishers to compare outsourcing a capability to a managed service with hiring staff, including what responsibility stays with the organization."
  ]
 },
 {
  "t": "Risk appetite, risk tolerance and aligning security with business objectives",
  "objectives": [
   "Students will be able to define risk appetite, risk tolerance and risk capacity and explain how they relate.",
   "Students will be able to identify who sets risk appetite and who may accept residual risk.",
   "Students will be able to translate an appetite statement into measurable tolerances and treatment priorities.",
   "Students will be able to choose the correct escalation response when residual risk exceeds appetite."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and draw three nested circles on the board labeled with the students' own words before introducing the formal terms."
   ],
   [
    12,
    "Teach",
    "Define appetite, tolerance and capacity. Show how appetite becomes tolerances, KRIs and acceptance criteria in policy. Explain escalation when residual risk exceeds appetite and why appetite must be reviewed as conditions change."
   ],
   [
    18,
    "Activity",
    "Run the \"Inside the lines\" scenario sort described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reinforce that the security manager never self-accepts or re-rates risk."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "In your household budget, what is one kind of spending you are relaxed about going a little over, and one where even a small slip is unacceptable?",
  "activity": {
   "title": "Inside the lines",
   "materials": "Printed fictional appetite statement for a hospital or retailer, eight scenario cards, whiteboard divided into three zones: Within tolerance, Breaches tolerance (escalate), Exceeds appetite (senior management decision).",
   "steps": [
    "Groups read the appetite statement, which sets different appetites for categories such as patient safety, regulatory, payment data and administrative outages.",
    "Groups convert two appetite lines into measurable tolerances, such as maximum downtime per quarter or zero unencrypted card numbers in storage.",
    "Groups place each scenario card in a zone and write who should decide and what action follows.",
    "The teacher reveals one card where a developer suggests lowering a risk rating so it fits; groups explain why this is wrong and what should happen instead."
   ]
  },
  "discussion": [
   "What might happen to an organization whose appetite is near zero for every risk?",
   "What events should prompt the security manager to ask leadership to review the appetite statement?"
  ],
  "exit": [
   [
    "Who sets risk appetite?",
    "The board and senior management."
   ],
   [
    "How does tolerance differ from appetite?",
    "Appetite is the broad level of acceptable risk; tolerance is the acceptable deviation for a specific objective, often a measurable threshold."
   ],
   [
    "Residual risk still exceeds appetite after treatment. What should the security manager do?",
    "Escalate to senior management for further treatment or formal acceptance at the right level."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students the highway analogy card (road edge, lane, rumble strip) and let them sort scenarios using it before using formal terms.",
   "Extend: Ask fast finishers to write two key risk indicators that would warn leadership before a tolerance is breached."
  ]
 },
 {
  "t": "Emerging risk and the threat landscape",
  "objectives": [
   "Students will be able to describe the main threat actor groups and their typical motives.",
   "Students will be able to distinguish strategic, operational and tactical threat intelligence and match each to an audience.",
   "Students will be able to apply the relevance, exposure and control effectiveness sequence to a new threat report.",
   "Students will be able to identify internal sources of emerging risk and explain why security should be involved early."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list students' first reactions. Mark which reactions involve checking facts and which involve spending money."
   ],
   [
    12,
    "Teach",
    "Cover threat actor groups, external and internal emerging risk, the three levels of threat intelligence with IOCs and MITRE ATT&CK, ISACs as a source, and the relevance-exposure-control sequence. Mention horizon scanning."
   ],
   [
    18,
    "Activity",
    "Run the \"Advisory triage\" exercise described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to link the activity to exam wording such as \"a new threat has been reported.\""
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "You hear on the news that thieves are targeting one model of car. What do you check before you spend any money on new locks?",
  "activity": {
   "title": "Advisory triage",
   "materials": "Three printed fictional threat advisories, a one-page fictional organization profile (industry, region, technologies in use, key controls), whiteboard with columns Relevance, Exposure, Control effectiveness, Decision.",
   "steps": [
    "Groups read the organization profile, then work through each advisory one at a time.",
    "For each advisory, they record whether it is relevant to the industry or region, whether the organization uses the affected technology, and whether current controls would prevent or detect the technique.",
    "Groups decide an action for each: no change, update the risk register, change controls or priorities, or brief risk owners. They write who the risk owner would be.",
    "Groups then classify one extra item, \"Marketing has started using a public AI writing tool,\" as an internal emerging risk and propose an early-involvement response."
   ]
  },
  "discussion": [
   "Why is a feed of technical indicators alone not enough for a security program?",
   "Which new business initiative in your own workplace or school might create a risk nobody has assessed yet?"
  ],
  "exit": [
   [
    "What should you do first with a new threat report?",
    "Assess relevance and whether the organization is exposed to the techniques described."
   ],
   [
    "Which type of threat intelligence is most useful for the board?",
    "Strategic intelligence about trends and actor motives."
   ],
   [
    "When should security be involved in adopting a new technology?",
    "Early, during planning, when requirements are cheapest to add."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-question checklist card (Does it target us? Do we use it? Would our controls stop it?) and start struggling groups with the simplest advisory.",
   "Extend: Ask fast finishers to write a five-sentence strategic intelligence summary for the board based on all three advisories, avoiding technical indicators."
  ]
 },
 {
  "t": "Vulnerability and control deficiency analysis",
  "objectives": [
   "Students will be able to explain why a CVSS score is not the same as business risk and list the context factors that change priority.",
   "Students will be able to describe the steps of a vulnerability management cycle.",
   "Students will be able to distinguish design deficiencies from operating deficiencies in control scenarios.",
   "Students will be able to choose an appropriate response, including compensating controls and owner decisions, for a vulnerability that cannot be fixed."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect quick answers. Point out that the location of the weakness changes how serious it is."
   ],
   [
    12,
    "Teach",
    "Define vulnerabilities (technical and non-technical), CVE and CVSS, and the business context factors. Walk the vulnerability management cycle. Explain design versus operating deficiencies, compensating controls and validating scan coverage."
   ],
   [
    18,
    "Activity",
    "Run the \"Rank the findings\" exercise described below in groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect to exam patterns such as \"a penetration test reports a critical vulnerability.\""
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "Which is more urgent: a broken window in a locked backyard shed, or a slightly loose lock on your front door? Why?",
  "activity": {
   "title": "Rank the findings",
   "materials": "Printed set of eight fictional findings (mix of scan results with CVSS-style ratings, audit findings and process gaps) with short asset descriptions, sticky notes, whiteboard.",
   "steps": [
    "Groups first rank the findings by technical rating alone and record that order.",
    "The teacher reveals business context for each finding: asset value, internet exposure, whether exploitation is active and existing compensating controls. Groups re-rank by business risk and note what changed.",
    "Groups label each control-related finding as a design deficiency or an operating deficiency, using the definitions on the board.",
    "For one unpatchable legacy system, groups propose compensating controls and name who should make the final risk decision. Each group shares its top three findings and reasoning."
   ]
  },
  "discussion": [
   "Why might a people or process gap, such as no second approver for payments, carry more risk than a missing patch?",
   "What could make a vulnerability scan come back clean even though weaknesses exist?"
  ],
  "exit": [
   [
    "Why is a CVSS score alone not enough to prioritize remediation?",
    "It ignores asset value, exposure, active exploitation and existing controls."
   ],
   [
    "A documented access review is performed, but reviewers approve everything without checking. Which type of deficiency is this?",
    "An operating deficiency: the control is designed well but not performed correctly."
   ],
   [
    "What should happen when a vulnerability cannot be fixed?",
    "Analyze the risk, evaluate compensating controls and present options to the business owner for a documented decision."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a context checklist (value, exposure, exploitation, existing controls) to apply to each finding, and reduce the set to five findings.",
   "Extend: Ask fast finishers to draft a remediation policy table with deadlines by severity and exposure, and describe how the exception process would work."
  ]
 },
 {
  "t": "Risk assessment methods: qualitative, quantitative and semi-quantitative",
  "objectives": [
   "Students will be able to calculate SLE and ALE from asset value, exposure factor and annualized rate of occurrence.",
   "Students will be able to compare qualitative, quantitative and semi-quantitative risk analysis, including the main weakness of each.",
   "Students will be able to determine whether a control is financially justified by comparing ALE reduction with annual control cost.",
   "Students will be able to select the most suitable assessment method for a described business situation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the whiteboard, grouping them into words, scores and money."
   ],
   [
    12,
    "Teach",
    "Walk through the three methods using a simple table on the board. Derive SLE = AV x EF and ALE = SLE x ARO, then work the 500,000 example aloud, stressing that once every N years means ARO = 1/N."
   ],
   [
    15,
    "Activity",
    "Run the risk calculator relay described below in groups of three."
   ],
   [
    8,
    "Discuss",
    "Ask groups to share which method they would use for each scenario card and why, and correct any ARO or SLE errors publicly without naming groups."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your manager says a laptop theft risk is \"medium.\" Another manager says it is \"a 12 out of 25.\" A third says \"we expect to lose about 3,000 a year.\" Which statement would help you most when asking for budget, and why?",
  "activity": {
   "title": "Risk calculator relay",
   "materials": "Printed scenario cards (each with an asset value, exposure factor, frequency and a proposed control cost), whiteboard, calculators or phone calculators, sticky notes.",
   "steps": [
    "Give each group of three one scenario card. Student A converts the frequency into an ARO and calculates SLE.",
    "Student B calculates ALE before and after the proposed control using the new ARO on the card.",
    "Student C decides whether the control is justified and writes a one-sentence recommendation for a risk owner.",
    "Groups swap cards with a neighbor and check each other's arithmetic, flagging any SLE-versus-ALE or multiply-versus-divide errors.",
    "Finally, each group reads a second card describing a situation with little data and names the method they would use instead of a calculation."
   ]
  },
  "discussion": [
   "When might a precise-looking quantitative result be more misleading than a simple qualitative rating?",
   "Why do many organizations use semi-quantitative scoring for their full register but quantitative analysis only for a few top risks?"
  ],
  "exit": [
   [
    "An asset worth 200,000 has an EF of 50% and the event happens once every 5 years. What is the ALE?",
    "SLE = 100,000; ARO = 0.2; ALE = 20,000 per year."
   ],
   [
    "What is the main weakness of qualitative analysis?",
    "Subjectivity: different people may rate the same risk differently, and ratings do not express monetary loss."
   ],
   [
    "A control costs 15,000 a year and reduces ALE from 40,000 to 30,000. Is it justified?",
    "No. It removes 10,000 of expected loss for 15,000 a year, so it costs more than it saves."
   ]
  ],
  "differentiation": [
   "Support: Provide a formula card with a worked example and a frequency-to-ARO conversion table (once a year = 1, every 2 years = 0.5, every 10 years = 0.1) for students who struggle with the arithmetic.",
   "Extend: Ask fast finishers to rework one scenario using a range of exposure factors (for example 20 to 60 percent) and explain how the spread of ALE values would change a board's view of the decision."
  ]
 },
 {
  "t": "Risk scenarios, likelihood and impact",
  "objectives": [
   "Students will be able to write a complete risk scenario that includes a threat, vulnerability, asset and business consequence.",
   "Students will be able to distinguish inherent risk from residual risk and explain what a large gap between them implies.",
   "Students will be able to identify evidence sources for estimating likelihood and express impact in business terms.",
   "Students will be able to compare top-down and bottom-up approaches to building scenarios."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up aloud and let pairs decide which statement is more useful. Record the reasons on the board."
   ],
   [
    12,
    "Teach",
    "Introduce the scenario template on the board, then explain likelihood, impact tables, and inherent versus residual risk using the ransomware manufacturer example."
   ],
   [
    15,
    "Activity",
    "Run the scenario builder card exercise described below."
   ],
   [
    8,
    "Discuss",
    "Groups present one finished scenario. The class judges whether impact is in business terms and whether controls were considered."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on paper."
   ]
  ],
  "warmup": "Which tells a manager more: \"Our risk is cyber attack\" or \"A criminal uses a stolen password to change a supplier's bank details and diverts a 250,000 payment\"? What does the second statement contain that the first does not?",
  "activity": {
   "title": "Scenario builder",
   "materials": "Four colors of printed cards (threats, vulnerabilities, assets, business consequences), a printed impact table with minor, moderate and severe definitions, sticky notes, whiteboard.",
   "steps": [
    "Give each group a shuffled set of the four card colors and ask them to assemble two plausible scenarios, one card of each color, using the template \"Actor, through method, exploits weakness in asset, causing effect, leading to business consequence.\"",
    "Groups list one or two existing controls for each scenario on sticky notes.",
    "Using the impact table, groups rate inherent likelihood and impact, then residual likelihood and impact after the controls, writing one sentence of evidence for each likelihood rating.",
    "Each group identifies which of its scenarios relies most heavily on controls and states what that means for control testing.",
    "Groups swap with another group and check that each scenario has all four elements and business-term impact."
   ]
  },
  "discussion": [
   "Why might process owners give better impact estimates than the security team?",
   "How many scenarios is too many for an organization to maintain, and what are the signs a library has grown unmanageable?"
  ],
  "exit": [
   [
    "Name the four elements of a complete risk scenario.",
    "Threat, vulnerability, affected asset and business consequence."
   ],
   [
    "A scenario has high inherent risk and low residual risk. What should the organization do about its controls?",
    "Provide strong assurance and monitoring of those controls, because if they fail, risk returns toward the inherent level."
   ],
   [
    "Rewrite \"server encrypted\" as a business-term impact.",
    "For example: order processing stops for three days, losing about 600,000 in sales and incurring late delivery penalties."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed scenario template with the threat and asset already filled in so students only need to add the vulnerability and business consequence.",
   "Extend: Ask fast finishers to build one top-down scenario starting from a stated business objective and compare it with a bottom-up scenario starting from a known vulnerability, noting what each approach revealed."
  ]
 },
 {
  "t": "Risk treatment options: mitigate, transfer, avoid, accept",
  "objectives": [
   "Students will be able to identify mitigate, transfer, avoid and accept responses from scenario descriptions.",
   "Students will be able to explain why transfer never moves accountability and why insurance does not reduce likelihood.",
   "Students will be able to state who selects risk treatment and what a valid acceptance decision requires.",
   "Students will be able to recommend a combination of responses that brings residual risk within appetite."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sort student answers into four columns on the board without labeling them yet."
   ],
   [
    10,
    "Teach",
    "Label the four columns as the treatment options, explain each with an example, emphasize the risk owner's role and the requirements for formal acceptance."
   ],
   [
    17,
    "Activity",
    "Run the treatment card sort and the risk owner role-play described below."
   ],
   [
    8,
    "Discuss",
    "Debrief the role-play: who decided, whether acceptance was documented, and where the security manager overstepped or stayed in role."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You own a bicycle you ride to school. List every way you could deal with the risk of it being stolen.",
  "activity": {
   "title": "Treatment card sort and risk owner role-play",
   "materials": "Printed action cards (such as \"buy cyber insurance\", \"stop collecting date of birth\", \"enable MFA\", \"sign off a risk with a review date\", \"ignore the audit finding\"), four labeled areas on the whiteboard, role cards for risk owner, security manager and insurer.",
   "steps": [
    "In pairs, students sort the action cards into mitigate, transfer, avoid and accept. A card that is not a valid response, such as ignoring a finding, goes into a separate \"not a response\" pile.",
    "Reveal the answers and discuss any card that pairs placed differently.",
    "In groups of three, students take role cards. The security manager presents three treatment options with costs and residual risk for a shared scenario printed on the role card.",
    "The risk owner chooses a combination and states it aloud; the insurer explains what the policy would and would not cover.",
    "The group writes a two-line treatment plan entry with the decision, owner, actions and review date."
   ]
  },
  "discussion": [
   "When is accepting a risk the most responsible choice, rather than a lazy one?",
   "Why might an insurer refuse a claim even when the organization has paid its premiums?"
  ],
  "exit": [
   [
    "A company stops storing card numbers and uses a payment provider's tokens instead. Which response is this?",
    "Avoidance of the card-storage risk, because the activity creating the risk has stopped."
   ],
   [
    "Does cyber insurance transfer accountability for a data breach?",
    "No. It transfers some financial impact; the organization stays accountable to regulators, customers and the public."
   ],
   [
    "What makes a risk acceptance valid?",
    "It is informed, documented, made by someone with the authority to accept that level of risk and has a review date."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page reference with each option, a plain-language definition and one example, and let them sort only eight cards instead of the full set.",
   "Extend: Ask fast finishers to design a treatment plan for a ransomware scenario that uses all four responses together and explain the residual risk left after each step."
  ]
 },
 {
  "t": "Risk and control ownership",
  "objectives": [
   "Students will be able to distinguish the responsibilities of a risk owner from those of a control owner.",
   "Students will be able to identify the appropriate risk owner for a described business process.",
   "Students will be able to explain when and how a risk should be escalated beyond its owner's acceptance authority.",
   "Students will be able to justify role-based ownership in a risk register."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take quick votes, then reveal that ownership is the theme of the lesson."
   ],
   [
    12,
    "Teach",
    "Draw a risk on the board linked to three controls, label the risk owner and control owners, and explain acceptance limits and escalation with the payroll example."
   ],
   [
    15,
    "Activity",
    "Run the ownership matching exercise described below."
   ],
   [
    8,
    "Discuss",
    "Review the trickiest matches as a class, focusing on why IT and security are usually control owners rather than risk owners."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the exit questions individually."
   ]
  ],
  "warmup": "A security analyst discovers that the sales team's customer database could be leaked. Who should decide whether to spend money fixing it: the analyst, the IT manager or the head of sales? Why?",
  "activity": {
   "title": "Who owns it",
   "materials": "Printed risk cards (each describing a business risk), printed control cards, printed role cards (head of sales, payroll manager, IT access team, CISO, finance supervisor, executive committee), a printed acceptance-limit chart, tape and whiteboard.",
   "steps": [
    "Groups match each risk card to the role that should own it and tape them together on the whiteboard.",
    "Groups attach the relevant control cards to each risk and assign a control owner role to each control, noting where one control serves several risks.",
    "Using the acceptance-limit chart, groups check each risk's residual rating against its owner's authority and mark any risk that must be escalated, writing to whom.",
    "The teacher announces a reorganization that removes one role; groups reassign the affected risks and controls by role and explain how the register should change.",
    "Each group writes one register line showing risk owner, control owners, residual rating and next review."
   ]
  },
  "discussion": [
   "Why does assigning a risk to a committee often lead to no action at all?",
   "How should a control owner's report about a failing control reach the risk owner, and why does that path matter?"
  ],
  "exit": [
   [
    "Who should own the risk of fraudulent online orders?",
    "The business manager accountable for online sales, not IT or security."
   ],
   [
    "What does a control owner provide that a risk owner relies on?",
    "Evidence that the control is designed, operating and effective, such as attestations and test results."
   ],
   [
    "A risk's residual rating is above its owner's acceptance authority. What happens?",
    "It is escalated to the level of management authorized to accept it or fund more treatment."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column chart labeled \"decides and accepts\" and \"operates and proves\" so students can sort responsibilities before matching roles.",
   "Extend: Ask fast finishers to draft a short ownership policy section defining acceptance limits for low, medium and high risks and the escalation path above appetite."
  ]
 },
 {
  "t": "Risk registers, key risk indicators and risk monitoring",
  "objectives": [
   "Students will be able to describe the essential fields of a risk register entry and the purpose of the register.",
   "Students will be able to distinguish a key risk indicator from a key performance indicator and leading from lagging indicators.",
   "Students will be able to design a KRI with a data source, thresholds and a defined action for a given risk.",
   "Students will be able to explain what should happen when a KRI crosses its threshold."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up list on the projector and have pairs classify each metric quickly."
   ],
   [
    12,
    "Teach",
    "Project the sample register entry, walk through each field, then explain KRIs, thresholds, KPIs and leading versus lagging indicators."
   ],
   [
    15,
    "Activity",
    "Run the KRI design workshop described below."
   ],
   [
    8,
    "Discuss",
    "Groups share their KRIs and the class challenges whether each is truly linked to its risk and predictive."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Sort these into \"warns that risk is rising\" or \"shows how well a process performs\": percentage of tickets closed on time; number of admin accounts not reviewed in 90 days; number of firewalls owned; failed backup jobs for critical data.",
  "activity": {
   "title": "KRI design workshop",
   "materials": "Projector showing the sample register entry, printed blank register templates and KRI design sheets (risk, signal, data source, frequency, owner, green, amber and red thresholds, action), sticky notes.",
   "steps": [
    "Assign each group a risk scenario printed on a card, such as stale accounts, unpatched internet-facing systems or expired vendor assessments.",
    "Groups complete a register entry for the scenario, including owner, controls with owners, residual rating, response and review frequency.",
    "Groups brainstorm candidate metrics on sticky notes, then choose the one that is most linked to the risk, measurable and leading.",
    "Groups fill in the KRI design sheet with thresholds and the action at each level.",
    "The teacher reads out a new data value for each group's KRI; groups state which threshold was crossed and what happens next."
   ]
  },
  "discussion": [
   "What signs would tell you a risk register has become a compliance document rather than a management tool?",
   "Can the same metric be both a KPI and a KRI? Give an example and explain which question it answers in each role."
  ],
  "exit": [
   [
    "What is the primary purpose of a risk register?",
    "To record identified risks with owners, ratings, responses and status in one place for monitoring and reporting."
   ],
   [
    "Is \"percentage of incidents closed within the SLA\" a KRI or a KPI?",
    "A KPI, because it measures process performance against a target."
   ],
   [
    "A KRI turns red. What should happen?",
    "The risk owner is alerted, the risk is reassessed and the predefined action or escalation is triggered."
   ]
  ],
  "differentiation": [
   "Support: Provide a list of six candidate metrics for the group's risk so students choose and justify rather than invent one from scratch.",
   "Extend: Ask fast finishers to design a second KRI for the same risk that measures impact rather than likelihood, and explain how the two together give a fuller picture."
  ]
 },
 {
  "t": "Reporting risk to senior management and the board",
  "objectives": [
   "Students will be able to tailor risk information to the board, executives, risk owners and operational teams.",
   "Students will be able to build a one-page board risk summary with top risks in business terms, trends, appetite position and decision requests.",
   "Students will be able to explain the purpose of predefined escalation criteria.",
   "Students will be able to evaluate whether a given metric is suitable for senior management."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers, then point out how many are activity counts rather than risk measures."
   ],
   [
    10,
    "Teach",
    "Present the audience ladder (board, executives, risk owners, operational teams) and the five-part board report structure, using the order platform outage sentence as a model."
   ],
   [
    18,
    "Activity",
    "Run the one-page board report rewrite described below."
   ],
   [
    7,
    "Discuss",
    "Two groups present their one-page reports while the class plays the board and asks one question each."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you had two minutes to tell a school principal whether the school's computers are safe, what three facts would you share?",
  "activity": {
   "title": "One-page board report rewrite",
   "materials": "A printed, deliberately overloaded \"security report\" handout the teacher prepares (scan counts, blocked email totals, a vulnerability list, a supplier assessment backlog, a recovery test result, an incident summary), blank one-page templates, colored pens, whiteboard.",
   "steps": [
    "Groups read the overloaded report and highlight items that show risk to business objectives in one color and activity metrics in another.",
    "Groups select no more than five top risks and rewrite each in business terms, adding a trend arrow and whether it is within appetite.",
    "Groups add the status of major treatment work and one clear decision request.",
    "Groups list which items they moved to an appendix or operational report and which audience should receive them.",
    "The teacher announces an urgent new event during the activity; groups decide whether it meets escalation criteria and should go to leadership before the next meeting."
   ]
  },
  "discussion": [
   "Why can reporting only good news become dangerous for both the board and the security manager?",
   "How can board questions help a security manager adjust risk appetite or strategy?"
  ],
  "exit": [
   [
    "Name three things a board risk report should emphasize.",
    "Any three of: top risks in business terms, trends, position against appetite, status of major treatment programs, decisions needed."
   ],
   [
    "Why is \"number of blocked attacks\" a weak board metric?",
    "It shows activity, not whether risk to objectives is within appetite."
   ],
   [
    "A material risk emerges two months before the next board meeting. What should happen?",
    "It should be escalated immediately under the predefined escalation criteria."
   ]
  ],
  "differentiation": [
   "Support: Give students a fill-in template with labeled boxes for each of the five report parts and a bank of example business-impact phrases.",
   "Extend: Ask fast finishers to prepare a 60-second verbal briefing of their report and a one-line answer to a likely director question about uncertainty in their estimates."
  ]
 },
 {
  "t": "Program resources: people, processes, tools and technology",
  "objectives": [
   "Students will be able to describe the people, process, technology and budget resources of an information security program.",
   "Students will be able to diagnose whether a program gap stems from people, process or technology.",
   "Students will be able to compare build, buy and borrow options for closing a capability gap.",
   "Students will be able to explain why accountability remains with the organization when security services are outsourced."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect quick answers, steering toward the idea that the tool alone was not the problem."
   ],
   [
    10,
    "Teach",
    "Explain the four resource types, the skills inventory, and the planning sequence from strategy capabilities to roadmap, using the managed detection example."
   ],
   [
    17,
    "Activity",
    "Run the program gap clinic described below."
   ],
   [
    8,
    "Discuss",
    "Groups share diagnoses and recommendations; the class compares the cost, time and risk trade-offs of each option."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A company spent a large sum on a security monitoring tool, and six months later it has caught almost nothing. List possible reasons.",
  "activity": {
   "title": "Program gap clinic",
   "materials": "Printed case cards describing small organizations with a strategy requirement and a current situation, a printed people/process/technology diagnosis grid, sticky notes, whiteboard.",
   "steps": [
    "Each group receives a case card and reads the strategy requirement and current resources.",
    "Groups place sticky notes on the diagnosis grid identifying gaps under people, process and technology.",
    "For each gap, groups choose build (train or hire), buy (purchase a tool or service) or borrow (outsource or contract) and note cost, time and risk.",
    "For any outsourced option, groups write two oversight requirements, such as a service level and a named internal owner.",
    "Groups present a three-line recommendation suitable for the program roadmap."
   ]
  },
  "discussion": [
   "When is outsourcing a security function the right choice, and what must the organization keep in-house?",
   "Why might certifications on a resume not prove that a person can do the job the program needs?"
  ],
  "exit": [
   [
    "A new tool is delivering little value. What should be examined first?",
    "Whether defined processes and skilled staff with time exist to operate and tune it."
   ],
   [
    "What stays with the organization when monitoring is outsourced?",
    "Accountability for the risk and for overseeing the provider."
   ],
   [
    "What should drive decisions about which skills to build or buy?",
    "The capabilities required by the security strategy and risk priorities, weighed against cost and time."
   ]
  ],
  "differentiation": [
   "Support: Provide a completed example diagnosis grid for a different case so students can model their own analysis on it.",
   "Extend: Ask fast finishers to draft three metrics that would show, after six months, whether their recommended resources are delivering what the strategy needs."
  ]
 },
 {
  "t": "Information asset identification, valuation and classification",
  "objectives": [
   "Students will be able to explain why an asset inventory with owners must come before classification and handling controls.",
   "Students will be able to value information assets by the business impact of losing confidentiality, integrity or availability.",
   "Students will be able to apply a classification scheme and its handling rules, including to combined data.",
   "Students will be able to distinguish the roles of data owner, data custodian, user and information security manager."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers by how they decided what mattered most."
   ],
   [
    10,
    "Teach",
    "Explain the sequence of inventory, valuation, classification and handling, introduce a four-level scheme, and define owner and custodian roles."
   ],
   [
    18,
    "Activity",
    "Run the classify-the-office exercise described below."
   ],
   [
    7,
    "Discuss",
    "Review contested classifications and the combined-data rule as a class."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your house is on fire and you can save five things. How did you decide which five, and who in your family would get the final say?",
  "activity": {
   "title": "Classify the office",
   "materials": "Printed asset cards (customer list, published price sheet, payroll file, product launch plan, cafeteria menu, merged report combining internal and confidential data, shadow IT file-sharing account), a printed four-level classification scheme with handling rules, role cards for data owner and custodian, whiteboard.",
   "steps": [
    "Groups review the asset cards and identify which ones lack a known owner, noting how they would find one.",
    "For each asset, groups rate the impact of losing confidentiality, integrity and availability as low, medium or high.",
    "Groups assign a classification level based on the highest impact and list two handling rules that apply.",
    "Groups decide the level of the merged report and explain the highest-level rule.",
    "One student plays the data owner and another the custodian; the custodian must ask the owner to approve one access request and explain which decisions belong to each role."
   ]
  },
  "discussion": [
   "What problems arise when an organization classifies almost everything as confidential?",
   "How should classification change when a product plan becomes public after launch?"
  ],
  "exit": [
   [
    "What must be completed first when building a classification program?",
    "An inventory of information assets with identified owners."
   ],
   [
    "Who assigns an asset's classification level?",
    "The data owner, using the scheme designed with the security manager."
   ],
   [
    "A report combines internal and restricted data. What level does it take?",
    "Restricted, the highest level of its parts."
   ]
  ],
  "differentiation": [
   "Support: Provide a CIA impact worksheet with guiding questions for each dimension, such as \"Who would be harmed if this leaked?\"",
   "Extend: Ask fast finishers to write handling rules for one classification level covering labeling, storage, transmission, sharing, retention and disposal."
  ]
 },
 {
  "t": "Industry standards and control frameworks for building the program",
  "objectives": [
   "Students will be able to compare ISO/IEC 27001 and 27002, NIST SP 800-53, the CIS Controls, PCI DSS and SOC 2 by purpose and typical use.",
   "Students will be able to explain tailoring and the role of the statement of applicability.",
   "Students will be able to build a simple control mapping that satisfies several frameworks with one internal control.",
   "Students will be able to identify false claims about frameworks, such as guaranteed security or transferred liability."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let a few students answer, connecting the idea of a checklist to frameworks."
   ],
   [
    12,
    "Teach",
    "Present a comparison table of the major frameworks on the projector, then explain tailoring, the statement of applicability and control mapping with the fintech example."
   ],
   [
    15,
    "Activity",
    "Run the test-once-comply-many mapping exercise described below."
   ],
   [
    8,
    "Discuss",
    "Groups share their mappings and their excluded controls, and the class challenges whether each exclusion is justified."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If three different teachers each asked for proof that you studied, how could you produce one piece of evidence that satisfies all three?",
  "activity": {
   "title": "Test once, comply many",
   "materials": "Printed requirement cards paraphrasing generic requirements from three frameworks (for example access reviews, backups, supplier assessments, secure development), printed blank mapping tables, a short company profile handout, whiteboard.",
   "steps": [
    "Groups read the company profile, which states what the company does and does not do, such as whether it develops software in-house.",
    "Groups cluster requirement cards that ask for essentially the same thing and write one internal control that covers each cluster.",
    "Groups complete a mapping table listing the internal control, its owner, the matching requirement from each framework and where evidence would be stored.",
    "Groups identify one requirement that does not apply to the company and write a justification as it would appear in a statement of applicability.",
    "Groups present which framework they would choose as their backbone and why, based on the profile."
   ]
  },
  "discussion": [
   "Why might adopting a framework because a competitor uses it be a weak reason?",
   "What would you say to an executive who believes ISO/IEC 27001 certification means the company cannot be breached?"
  ],
  "exit": [
   [
    "What determines which framework controls an organization implements?",
    "Its risk assessment, together with legal, regulatory and contractual obligations."
   ],
   [
    "Which framework offers prioritized technical safeguards grouped into implementation groups?",
    "The CIS Critical Security Controls."
   ],
   [
    "What does control mapping achieve?",
    "It shows one internal control satisfies requirements in several frameworks, reducing duplicated effort."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed mapping table with one row filled in as a model and fewer requirement cards.",
   "Extend: Ask fast finishers to map a new, invented regulatory requirement to existing controls and identify the gaps that would need new work."
  ]
 },
 {
  "t": "Enterprise architecture and information security architecture",
  "objectives": [
   "Students will be able to describe the business, data, application and technology layers of enterprise architecture.",
   "Students will be able to explain how security architecture uses reference patterns and shared services to deliver consistent security.",
   "Students will be able to apply principles such as defense in depth, least privilege, segmentation and zero trust to a design.",
   "Students will be able to describe how an architecture review board handles deviations as documented exceptions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and gather answers about why cities use building codes and shared utilities."
   ],
   [
    10,
    "Teach",
    "Draw the four architecture layers on the board, map shared security services onto them, and explain the key design principles and the role of the review board."
   ],
   [
    18,
    "Activity",
    "Run the architecture review board role-play described below."
   ],
   [
    7,
    "Discuss",
    "Debrief decisions made by each board, focusing on early review and documented exceptions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Why do cities require new buildings to connect to shared water and power systems and follow standard fire codes, instead of letting each builder decide?",
  "activity": {
   "title": "Architecture review board",
   "materials": "Printed project proposal cards (each a short design for a new application, some following the approved pattern and some deviating), a printed reference pattern sheet (central sign-on, logs to the SIEM, secrets in the approved vault, segmentation), role cards, whiteboard.",
   "steps": [
    "Groups of four form review boards with roles: security manager, enterprise architect, project lead and risk owner.",
    "The project lead presents a proposal card; the board compares it with the reference pattern and lists each deviation.",
    "For each deviation, the board decides to require the standard pattern or grant a documented exception with compensating controls, a risk owner sign-off and a review date.",
    "The board identifies which architecture layer each deviation affects and which principle, such as defense in depth or zero trust, it weakens.",
    "Groups record their decision in a two-line board minute and present it to the class."
   ]
  },
  "discussion": [
   "Why is a design change during planning so much cheaper than the same change after the system is built?",
   "Why is it misleading to say an organization has bought zero trust?"
  ],
  "exit": [
   [
    "Name the four layers of enterprise architecture.",
    "Business, data (information), application and technology."
   ],
   [
    "Which approach verifies every access request regardless of network location?",
    "Zero trust."
   ],
   [
    "How should a project that cannot follow an approved pattern be handled?",
    "As a documented exception with risk analysis, risk owner approval and a review date."
   ]
  ],
  "differentiation": [
   "Support: Provide a checklist version of the reference pattern so students can tick each element when reviewing a proposal.",
   "Extend: Ask fast finishers to sketch a staged roadmap toward zero trust for a small organization, naming the first two steps and why they come first."
  ]
 },
 {
  "t": "Information security policies, standards, procedures and guidelines",
  "objectives": [
   "Students will be able to classify statements as policy, standard, baseline, procedure or guideline using clue words.",
   "Students will be able to explain why policies avoid specific technologies and where their authority comes from.",
   "Students will be able to describe the elements of a sound policy exception process.",
   "Students will be able to recommend the CISM-preferred response when staff repeatedly bypass a standard."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the swimming pool rules from the warm-up prompt and ask students which rules feel 'big' and which feel 'detailed'. Collect answers on the whiteboard in two columns."
   ],
   [
    12,
    "Teach",
    "Draw a four-level pyramid: policy, standard (with baseline), procedure, guideline. For each level, state the audience, who approves it, how often it changes and whether it is mandatory. Walk through the life cycle: owner, approval, communication, acknowledgment, exceptions, review."
   ],
   [
    15,
    "Activity",
    "Run the 'Split the Mega-Policy' card sort in groups of three to four."
   ],
   [
    8,
    "Discuss",
    "Groups report their trickiest card. Discuss the exception scenario and the repeated-bypass scenario, steering toward risk-based answers."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "A swimming pool posts four signs: 'Keep everyone safe', 'No running on the deck', 'Lifeguard rescue checklist', and 'Drink water every hour'. Which of these could the pool owner change without asking anyone, and which would need the owner's sign-off?",
  "activity": {
   "title": "Split the Mega-Policy",
   "materials": "Printed cards (about 16 per group), each with one statement taken from a fictional 40-page 'security policy'; four labeled sheets of paper (Policy, Standard, Procedure, Guideline); a whiteboard.",
   "steps": [
    "Give each group a shuffled set of statement cards, such as 'Data must be protected according to classification', 'Laptops must use full-disk encryption', 'Step 3: verify the caller's employee ID', and 'Consider using a password manager'.",
    "Groups place each card on the correct sheet and underline the clue word that decided it, such as 'must', 'step', or 'consider'.",
    "Add two challenge cards: an exception request and a statement that names a retired product. Groups decide how to handle each.",
    "Each group writes the header (owner, approver, review frequency) they would put on their Policy and Standard sheets.",
    "The teacher reveals an answer key and groups score themselves, noting any disagreements for discussion."
   ]
  },
  "discussion": [
   "Why might a well-written standard still be ignored by staff, and what should the security manager learn from that?",
   "Who should approve an exception to a standard, and why is it usually not the person asking for it?"
  ],
  "exit": [
   [
    "'Servers must disable remote root login.' Which document type is this?",
    "A standard or baseline, because it is a specific, mandatory technical requirement."
   ],
   [
    "What gives an information security policy its authority?",
    "Approval by senior management or the board."
   ],
   [
    "Name three elements of a sound exception process.",
    "Any three of: formal request, risk assessment, approval by the appropriate risk owner, time limit, compensating controls, tracking in a register."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a clue-word reference card ('intent' means policy, 'must plus a value' means standard, 'step' means procedure, 'should consider' means guideline) and let them sort only eight cards first.",
   "Extend: Ask fast finishers to rewrite two misplaced statements so they fit their correct document type, and draft a one-paragraph exception process for the organization."
  ]
 },
 {
  "t": "Information security program metrics: KPIs, KRIs and maturity",
  "objectives": [
   "Students will be able to distinguish KPIs, KRIs, KGIs and maturity ratings and give an example of each.",
   "Students will be able to match metrics to operational, management and strategic audiences.",
   "Students will be able to design a SMART metric with a data source, threshold, owner and triggered action.",
   "Students will be able to explain why maturity ratings must be combined with outcome metrics."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the bakery prompt and collect student ideas on the whiteboard, then circle the ones that warn of future trouble."
   ],
   [
    12,
    "Teach",
    "Present the three audience layers, then define KPI, KRI and KGI with one example each. Show a sample dashboard row with value, thresholds, trend, owner and action. Briefly explain maturity levels and why maturity is not effectiveness."
   ],
   [
    15,
    "Activity",
    "Run 'Fix the Board Deck' in pairs."
   ],
   [
    8,
    "Discuss",
    "Pairs present one replacement metric. The class challenges whether it supports a real decision and whether its threshold is sensible."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "You run a small bakery. List three numbers you could track. Which one would warn you about a problem before customers notice?",
  "activity": {
   "title": "Fix the Board Deck",
   "materials": "A projected or printed 'board slide' of vanity metrics for a fictional company (blocked emails, firewall hits, training completion, scan counts), a short description of the company's top three business risks, blank metric template cards (question, data source, calculation, target or threshold, owner, action).",
   "steps": [
    "Pairs read the fictional company profile and its top three business risks.",
    "They label each metric on the existing slide as operational, management or strategic, and as KPI, KRI or activity count.",
    "Using the template cards, pairs design two replacement metrics for the board, at least one of which must be a KRI with amber and red thresholds.",
    "Pairs swap cards with another pair, who checks each metric against SMART and asks 'what action would a red value trigger?'.",
    "Pairs revise their cards based on the feedback."
   ]
  },
  "discussion": [
   "Why might a security team keep reporting vanity metrics even when they know the board does not use them?",
   "How could a metric encourage the wrong behavior if it is chosen carelessly?"
  ],
  "exit": [
   [
    "Is 'percentage of critical patches applied within 14 days' a KPI or a KRI?",
    "A KPI, because it measures process performance against a target."
   ],
   [
    "Which kind of metric is most useful to the board?",
    "Metrics tied to business risk, trends against risk appetite and business objectives, with any decisions needed."
   ],
   [
    "Why is a maturity rating alone not enough to show a control works?",
    "Maturity shows how well a process is defined and managed; a mature process can still fail, so outcome metrics are needed to show effectiveness."
   ]
  ],
  "differentiation": [
   "Support: Provide a partly completed metric card with the question and data source filled in, so students only add the threshold, owner and action.",
   "Extend: Ask fast finishers to build a three-tier set of metrics for one risk, showing the operational, management and board version and how they roll up."
  ]
 },
 {
  "t": "Control design and selection: types, categories and control objectives",
  "objectives": [
   "Students will be able to classify controls by both category (administrative, technical, physical) and function (preventive, detective, corrective, deterrent, recovery, directive, compensating).",
   "Students will be able to write a control objective derived from a stated risk.",
   "Students will be able to evaluate candidate controls on effectiveness, cost relative to risk, business impact and testability.",
   "Students will be able to judge whether a proposed compensating control is acceptable."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the home-protection question and list student answers on the whiteboard without labels."
   ],
   [
    12,
    "Teach",
    "Return to the list and label each answer by category and function using a two-axis grid on the whiteboard. Explain control objectives and the selection sequence, then define compensating controls and their conditions."
   ],
   [
    16,
    "Activity",
    "Run the 'Control Grid' card sort followed by a short design challenge."
   ],
   [
    7,
    "Discuss",
    "Compare group designs for the payment fraud risk and debate which controls are most cost-effective."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Name four different things you could do to protect your home from burglary. Which of them stop a break-in, and which only help after it happens?",
  "activity": {
   "title": "Control Grid",
   "materials": "Printed cards each describing one control (for example: background checks, firewall rule, badge reader, daily log review, backup restore, warning banner, acceptable use policy, file integrity monitoring), a three-by-six grid drawn on the whiteboard or on large paper, sticky notes.",
   "steps": [
    "Groups place each control card in the grid cell that matches its category (columns) and function (rows); some cards may fit two functions and groups must justify their choice.",
    "The teacher reveals a fictional risk: fraudulent changes to supplier bank details.",
    "Each group writes a one-sentence control objective for the risk on a sticky note.",
    "Groups select at least one preventive, one detective and one corrective control for the objective and note the rough cost and business impact of each.",
    "Groups add one compensating control for a scenario where the finance system cannot enforce dual approval, and state who must approve it."
   ]
  },
  "discussion": [
   "When might a control that costs more than the loss it prevents still be justified, for example because of regulation?",
   "Why do automated controls still need monitoring, and what happens when a detective control silently stops working?"
  ],
  "exit": [
   [
    "A weekly review of changed supplier bank details is which function and category of control?",
    "A detective administrative (or managerial) control, because a person reviews changes after they occur."
   ],
   [
    "What should drive control selection?",
    "Control objectives derived from the risk assessment, weighed against cost, business impact and risk appetite."
   ],
   [
    "Give two conditions a compensating control must meet.",
    "Any two of: meets the intent of the original requirement, provides comparable protection, is documented, is approved by the risk owner, is reviewed periodically."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference strip with one plain-language question per function ('Does it stop it? Find it? Fix it? Discourage it? Restore it? Tell people what to do?') to use while sorting.",
   "Extend: Ask fast finishers to identify a single point of failure in their design and add a control that removes it, explaining the change in residual risk."
  ]
 },
 {
  "t": "Control implementation, integration and change management",
  "objectives": [
   "Students will be able to describe the steps of change management, including risk assessment, testing, approval, backout planning and recording.",
   "Students will be able to explain how emergency and standard changes differ from normal changes.",
   "Students will be able to identify what integrating a control with operations requires, including ownership, logging and monitoring.",
   "Students will be able to justify addressing security in the requirements and design phases of the SDLC."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the kitchen warm-up prompt aloud and have students call out what could go wrong."
   ],
   [
    10,
    "Teach",
    "Walk through the life of a change on the whiteboard: request, assess, test, approve, schedule, implement, verify, record. Contrast normal, standard and emergency changes. Explain integration: owner, SIEM feed, alert routing, documentation. Show the cost-of-fixing curve across SDLC phases."
   ],
   [
    17,
    "Activity",
    "Run the 'Mock CAB' role-play in groups of five."
   ],
   [
    8,
    "Discuss",
    "Groups share their decisions and the reasons. Compare how groups treated the emergency request."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A restaurant decides to change how orders are sent to the kitchen in the middle of a busy Saturday night. What could go wrong, and how would you have done it differently?",
  "activity": {
   "title": "Mock CAB",
   "materials": "Three printed change request cards (a new email device-compliance policy, an emergency patch for an exploited gateway flaw, and a firewall rule submitted with no backout plan), role cards (change manager, security lead, IT operations lead, business owner, service desk lead), a whiteboard for recording decisions.",
   "steps": [
    "Each student takes a role card describing their priorities and concerns.",
    "The group reviews the first change request together and asks questions from their role's point of view about impact, testing, timing and rollback.",
    "The group decides to approve, approve with conditions, or reject, and records the reason and any conditions on the whiteboard.",
    "Repeat for the other two requests, handling the urgent one through the emergency path.",
    "For the approved device-compliance change, the group names the control owner, where its logs go and who receives its alerts."
   ]
  },
  "discussion": [
   "Why do some security teams see change management as an obstacle, and how could they work with it instead?",
   "What signs would tell you that a control has quietly stopped working?"
  ],
  "exit": [
   [
    "How should a critical patch that must go in tonight be handled?",
    "Through the emergency change process, with expedited approval, a backout plan and review afterward, not by bypassing change management."
   ],
   [
    "Name two things that integrating a new control with operations includes.",
    "Any two of: feeding its logs to the SIEM or monitoring, routing alerts to a responsible team, connecting to central services such as identity, assigning and documenting an owner."
   ],
   [
    "When is it most cost-effective to address security in a new system?",
    "In the requirements and design phases of the SDLC."
   ]
  ],
  "differentiation": [
   "Support: Give students a checklist of questions a CAB member should ask (what changes, who is affected, was it tested, how do we undo it, who checks it worked) to use during the role-play.",
   "Extend: Ask fast finishers to write a one-paragraph rule defining which security changes qualify as pre-approved standard changes and why."
  ]
 },
 {
  "t": "Control testing and evaluation",
  "objectives": [
   "Students will be able to distinguish design effectiveness from operating effectiveness.",
   "Students will be able to rank inquiry, observation, inspection and reperformance by strength of evidence.",
   "Students will be able to plan a sample-based test of a control and evaluate the exceptions it finds.",
   "Students will be able to describe the actions that follow a failed control test, including updating the risk register."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the fire door prompt and rank student answers from weakest to strongest proof on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Define design and operating effectiveness. Present the four methods with the mnemonic, then the steps of a sample-based test and the qualities of reliable evidence. Explain who tests (self-assessment, internal audit, external audit, continuous monitoring)."
   ],
   [
    15,
    "Activity",
    "Run 'Evidence Detectives' in groups of three."
   ],
   [
    8,
    "Discuss",
    "Groups present their conclusions on the sample, including whether the exceptions are isolated or systemic."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your school claims every fire door is checked weekly. List all the ways you could find out whether that is true, then rank them from least to most convincing.",
  "activity": {
   "title": "Evidence Detectives",
   "materials": "A printed packet for a fictional company: a quarterly access review procedure, four signed review reports, a list of 20 leavers with leaving dates and a printout of the current active account list from the finance system; highlighters.",
   "steps": [
    "Groups read the procedure and decide whether the control is well designed to meet the objective 'leavers lose finance access within one week'.",
    "They label each item in the packet as inquiry, observation, inspection or reperformance evidence.",
    "Groups reperform the review by comparing the leaver list with the active account list and highlighting any leavers who still have access.",
    "They decide whether exceptions are isolated or systemic and write a one-paragraph conclusion on design and operating effectiveness.",
    "Each group writes one remediation action with an owner and date, and notes what should change in the risk register."
   ]
  },
  "discussion": [
   "Why might a control owner sincerely believe a control is working when it is not?",
   "How should testing effort be divided between high-risk and low-risk controls?"
  ],
  "exit": [
   [
    "Which testing method gives the strongest evidence?",
    "Reperformance, because the tester independently executes the control and checks the result."
   ],
   [
    "A control owner shows a well-written procedure. What does that prove?",
    "Only that the control appears to be designed; it does not show the control operates consistently over time."
   ],
   [
    "What should happen after a key control fails testing?",
    "Rate the deficiency by risk, assign an owner and remediation date, update the risk register and retest after the fix."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column table (evidence item, method) with the first two rows completed, and reduce the leaver list to ten names.",
   "Extend: Ask fast finishers to redesign the access review control so it is harder to sign without checking, and explain how they would test the new design."
  ]
 },
 {
  "t": "Security awareness and training programs",
  "objectives": [
   "Students will be able to distinguish awareness, training and education and match each to an audience.",
   "Students will be able to state the primary objective of an awareness program in behavioral terms.",
   "Students will be able to select outcome metrics, such as click rate, report rate and time to report, over activity metrics.",
   "Students will be able to explain why a supportive, non-punitive culture improves incident reporting."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect responses, then highlight answers that describe behavior rather than knowledge."
   ],
   [
    12,
    "Teach",
    "Present the awareness, training and education levels with examples. Walk through the program-building sequence: needs analysis, behavioral objectives, content, delivery, measurement. Show a sample dashboard comparing completion rate with click and report rates."
   ],
   [
    15,
    "Activity",
    "Run 'Design a Campaign' in groups of three or four."
   ],
   [
    8,
    "Discuss",
    "Groups present their campaign and metrics. Discuss how to handle repeat clickers fairly."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of a safety rule you actually follow every day, such as wearing a seatbelt. Why do you follow it? Was it a poster, a lesson, a habit or something else?",
  "activity": {
   "title": "Design a Campaign",
   "materials": "Printed fictional incident summaries for one company (two payment fraud attempts, one misdirected email containing customer data, one reported phishing email), a role list (finance, service desk, developers, executives, all staff), large paper and markers.",
   "steps": [
    "Groups read the incident summaries and identify the highest-risk behaviors and roles (needs analysis).",
    "They write two behavioral objectives, such as 'finance staff verify bank detail changes by calling a known number'.",
    "Groups choose content and delivery for each audience, marking which items are awareness, training or education.",
    "They select three metrics that show behavior change and set a target for each, avoiding completion rate as the main measure.",
    "Groups write a two-sentence plan for how they will treat staff who click simulations."
   ]
  },
  "discussion": [
   "How could a phishing simulation program damage trust between staff and the security team, and how can that be prevented?",
   "Why do executives need targeted briefings rather than only the standard training?"
  ],
  "exit": [
   [
    "What is the primary objective of a security awareness program?",
    "Behavior change that reduces risk, such as recognizing and reporting threats, not just completing training records."
   ],
   [
    "Which pair of metrics best shows an awareness program is working?",
    "A falling phishing simulation click rate together with a rising report rate."
   ],
   [
    "When should new employees receive initial security training?",
    "Before or at the time they receive system access."
   ]
  ],
  "differentiation": [
   "Support: Provide a campaign template with headings (risk, audience, objective, content, channel, metric) and one completed example row.",
   "Extend: Ask fast finishers to design a phishing simulation policy covering frequency, difficulty, data privacy and follow-up coaching, and explain how it supports a reporting culture."
  ]
 },
 {
  "t": "Managing external services: vendors, cloud providers and fourth parties",
  "objectives": [
   "Students will be able to describe the stages of the third-party risk management life cycle from classification to offboarding.",
   "Students will be able to identify key security clauses for vendor contracts and explain why they must be agreed before signing.",
   "Students will be able to explain the shared responsibility model and how it changes between IaaS and SaaS.",
   "Students will be able to define fourth-party risk and explain how flow-down clauses address it."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the babysitter prompt and collect the checks students would make before, during and after."
   ],
   [
    12,
    "Teach",
    "Map the warm-up answers onto the TPRM life cycle on the whiteboard: classify, due diligence, contract, monitor, offboard. Explain how to read a SOC 2 report's scope and exceptions, the shared responsibility split for IaaS and SaaS, and fourth parties."
   ],
   [
    15,
    "Activity",
    "Run 'Red-Pen the Contract' in pairs."
   ],
   [
    8,
    "Discuss",
    "Pairs share the most important missing clause they found and discuss the shadow IT scenario."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You are hiring a babysitter for a week. What would you check before hiring, what rules would you agree in advance, and what would you make sure happens when the week ends?",
  "activity": {
   "title": "Red-Pen the Contract",
   "materials": "A printed two-page fictional vendor agreement for a cloud payroll service with several missing or weak security clauses, a printed one-page summary of the vendor's assurance report (scope, period, two exceptions, complementary user entity controls), red pens.",
   "steps": [
    "Pairs classify the vendor's risk tier using the data and access described.",
    "They read the assurance report summary and note whether its scope covers the payroll service and what the exceptions mean.",
    "Pairs mark up the contract, adding missing clauses such as breach notification time, right to audit, subcontractor disclosure and flow-down, data location and data return or deletion.",
    "They list which security tasks remain the customer's responsibility under the shared responsibility model and the report's complementary controls.",
    "Pairs write a one-line monitoring plan describing what they will review each year."
   ]
  },
  "discussion": [
   "Why does an organization's leverage over a vendor drop so sharply after the contract is signed?",
   "How can a security team reduce shadow IT without becoming the department that always says no?"
  ],
  "exit": [
   [
    "When should security requirements be built into a vendor relationship?",
    "Before the contract is signed, through due diligence and specific contract clauses."
   ],
   [
    "Your SaaS provider's hosting company is breached. What kind of risk is this, and how is it managed?",
    "Fourth-party risk, managed by requiring vendors to disclose key subcontractors and flow down equivalent security obligations."
   ],
   [
    "Does moving a service to the cloud transfer accountability for the data?",
    "No. The organization remains accountable; the shared responsibility model divides tasks, and the customer still secures its data, identities and configuration."
   ]
  ],
  "differentiation": [
   "Support: Give students a checklist of ten common contract clauses to tick off as they read, rather than generating them from memory.",
   "Extend: Ask fast finishers to compare customer responsibilities for the same payroll workload delivered as IaaS versus SaaS and present the difference as a two-column table."
  ]
 },
 {
  "t": "Program communications and reporting to stakeholders",
  "objectives": [
   "Students will be able to identify the information needs of key stakeholder groups, including the board, executives, IT, auditors and employees.",
   "Students will be able to rewrite a technical finding in business language with options and a recommendation.",
   "Students will be able to explain the role of a reporting rhythm and escalation triggers.",
   "Students will be able to choose the CISM-preferred way to gain senior management support for the program."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the doctor prompt and collect how the message changes for each listener."
   ],
   [
    10,
    "Teach",
    "Build a stakeholder map on the whiteboard (group, interest, influence, channel, frequency). Explain business language, the one-page board report structure, reporting rhythm and escalation triggers, and the value of listening."
   ],
   [
    18,
    "Activity",
    "Run 'Ninety-Second Briefing' in groups of three."
   ],
   [
    7,
    "Discuss",
    "Compare briefings and identify which ones produced a clear decision. Discuss when to escalate outside the schedule."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A doctor must explain the same test results to another doctor, to the patient's family and to the hospital manager. How would each conversation be different?",
  "activity": {
   "title": "Ninety-Second Briefing",
   "materials": "A printed technical finding for a fictional company (unsupported operating systems on billing servers, with version numbers, vulnerability counts and patch status), a short company profile with business objectives, index cards, a timer on the projector.",
   "steps": [
    "Groups read the technical finding and the company profile.",
    "They identify the business impact: which customers, revenue, operations or regulations are affected.",
    "Groups write a 90-second board briefing on index cards: the risk in business terms, its trend against appetite, two options with rough costs and a recommendation.",
    "One student presents while the other two groups play board members who may ask one question each.",
    "Groups then write a short note describing what technical detail they would send to the IT operations team instead."
   ]
  },
  "discussion": [
   "How can a security manager deliver bad news to executives without damaging trust?",
   "What business events should the security manager hear about early, and how can they make sure they do?"
  ],
  "exit": [
   [
    "What should a board-level security report focus on?",
    "Top risks and trends against appetite, program progress in business terms and decisions the board must make."
   ],
   [
    "What is the most effective way to gain executive support for the security program?",
    "Link the program to business objectives and the risks to them, in business language."
   ],
   [
    "A key risk crosses tolerance two weeks after the quarterly report. What should the manager do?",
    "Escalate promptly using the defined escalation triggers rather than waiting for the next scheduled report."
   ]
  ],
  "differentiation": [
   "Support: Give students a sentence frame for the briefing: 'The risk is ... which could affect ... It is currently ... compared with our appetite. We recommend ... because ...'.",
   "Extend: Ask fast finishers to draft a complete stakeholder map for the fictional company with at least six groups, including channel and frequency for each."
  ]
 },
 {
  "t": "Incident response plan and incident management team structure",
  "objectives": [
   "Students will be able to state the primary purpose of an incident response plan in CISM terms.",
   "Students will be able to list the essential contents of an IRP, including severity levels, roles, decision authority and contact lists.",
   "Students will be able to design an incident management team that includes both technical and business functions.",
   "Students will be able to compare permanent, virtual and hybrid team models and recommend one for a given organization."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the 2 a.m. warm-up prompt and list the questions students say the analyst would have."
   ],
   [
    12,
    "Teach",
    "Show how each warm-up question maps to a section of the IRP. Present the phases with the mnemonic, a sample severity matrix, team roles and team models. Stress decision authority and offline copies."
   ],
   [
    16,
    "Activity",
    "Run 'Who Decides?' in groups of four or five."
   ],
   [
    7,
    "Discuss",
    "Groups compare their decision-authority tables and debate any decision they assigned differently."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "At 2 a.m. an analyst sees ransomware spreading across file shares. Write down three questions she will need answered in the next ten minutes.",
  "activity": {
   "title": "Who Decides?",
   "materials": "Printed role cards (incident manager, technical lead, legal counsel, communications lead, HR, privacy officer, business owner, chief operating officer), printed decision cards (declare a critical incident, disable a compromised account, take the order system offline, notify a regulator, contact law enforcement, issue a customer statement, engage the external retainer firm), a blank severity matrix template, whiteboard.",
   "steps": [
    "Groups lay out the role cards and assign each decision card to the role that should hold that authority, noting which decisions can be pre-authorized.",
    "They complete a three- or four-level severity matrix with criteria and who is notified at each level.",
    "The teacher reads a short incident inject (a ransomware outbreak spreading at night); groups classify its severity and list who is paged.",
    "A second inject reveals customer data may be involved; groups identify which new roles and decisions come into play.",
    "Groups note where printed or offline copies of the plan should be kept."
   ]
  },
  "discussion": [
   "What could go wrong if the most senior person available makes every decision during an incident?",
   "How should an incident response plan connect to business continuity and disaster recovery plans?"
  ],
  "exit": [
   [
    "What is the primary purpose of an incident response plan?",
    "To enable a timely, coordinated response that minimizes business impact."
   ],
   [
    "Name three non-technical functions that belong on the incident management team.",
    "Any three of: legal, communications, human resources, privacy, affected business owners, senior management."
   ],
   [
    "Why must decision authority be defined before an incident?",
    "So critical decisions such as taking systems offline or notifying regulators are made quickly by the right people instead of debated during a crisis."
   ]
  ],
  "differentiation": [
   "Support: Provide a partly completed decision-authority table with three decisions already assigned and a short explanation for each.",
   "Extend: Ask fast finishers to write a one-page playbook outline for a business email compromise incident, mapping steps to the response phases and naming who decides at each step."
  ]
 },
 {
  "t": "Business impact analysis: critical processes, RTO, RPO and MTD",
  "objectives": [
   "Students will be able to explain the purpose of a business impact analysis and why it precedes recovery strategy selection.",
   "Students will be able to define and distinguish MTD, RTO, RPO, WRT and SDO.",
   "Students will be able to calculate whether proposed recovery targets fit within the MTD.",
   "Students will be able to explain how BIA results drive the cost of recovery solutions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the household outage prompt and rank items on the whiteboard by how quickly the impact becomes serious."
   ],
   [
    12,
    "Teach",
    "Explain the BIA process and dependencies. Draw a timeline on the whiteboard marking the disruption, RPO looking back, RTO and WRT looking forward and MTD as the outer limit. Introduce SDO, criticality tiers and the cost-versus-downtime curve."
   ],
   [
    16,
    "Activity",
    "Run 'Recovery Targets Workshop' in groups of three or four."
   ],
   [
    7,
    "Discuss",
    "Groups present their tiers and targets. Challenge any RTO plus WRT that exceeds MTD and any target set without business input."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your home loses one of these for three days: internet, refrigerator, heating in winter, television. Rank them by how quickly the problem becomes serious, and explain your ranking.",
  "activity": {
   "title": "Recovery Targets Workshop",
   "materials": "Printed BIA interview notes for five processes at a fictional retailer (order processing, payroll, warehouse dispatch, customer email support, marketing analytics), each with impact descriptions over time, data change rates and dependencies; a blank BIA worksheet; whiteboard timeline template.",
   "steps": [
    "Groups read the interview notes and record each process's impact at one hour, one day and one week.",
    "They set an MTD for each process and identify at least one hidden dependency, such as the identity system or a supplier file transfer.",
    "Groups set RTO, RPO and WRT for each process, checking that RTO plus WRT fits within MTD.",
    "They assign each process to a criticality tier and suggest a recovery approach suitable for its targets, such as replication or nightly backups.",
    "Groups list who should approve their targets and why."
   ]
  },
  "discussion": [
   "Why might every department claim its process is the most critical, and how does a BIA resolve that?",
   "How does a BIA differ from a risk assessment, and why does the continuity program need both?"
  ],
  "exit": [
   [
    "A process can lose no more than 30 minutes of data. Which objective is this?",
    "The recovery point objective (RPO)."
   ],
   [
    "An MTD is 8 hours and work recovery time is 2 hours. What is the longest acceptable RTO?",
    "6 hours, because RTO plus WRT must fit within the MTD."
   ],
   [
    "What must be completed before choosing a recovery site strategy?",
    "The business impact analysis, which identifies critical processes and sets the RTO and RPO the strategy must meet."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled timeline diagram with the disruption point marked and blank boxes for RPO, RTO, WRT and MTD for students to fill in before the workshop.",
   "Extend: Ask fast finishers to sketch the cost-of-recovery versus cost-of-downtime curves for order processing and explain where they would place the RTO and why."
  ]
 },
 {
  "t": "Business continuity plan (BCP) development",
  "objectives": [
   "Students will be able to put the stages of BCP development in the correct order, starting with senior management support and the BIA.",
   "Students will be able to distinguish the purpose and ownership of a BCP from those of a DRP.",
   "Students will be able to select suitable continuity strategies for a critical process given its recovery targets.",
   "Students will be able to identify the contents a usable BCP must include and the events that should trigger a review."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list student answers on the whiteboard under three headings: people, places, suppliers. Point out how few answers involve computers."
   ],
   [
    12,
    "Teach",
    "Draw the six-stage sequence as a staircase on the board, from sponsorship to test and maintain. Explain why each step depends on the one before. Contrast BCP and DRP in a two-column table, and stress that BCP and DRP recovery targets must match."
   ],
   [
    15,
    "Activity",
    "Run the sequence and strategy card sort described below in groups of three or four."
   ],
   [
    8,
    "Discuss",
    "Ask groups to present the strategy they chose for one process and defend it against cost and recovery time. Raise the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand them in at the door."
   ]
  ],
  "warmup": "Your school building is suddenly closed for a week because of a burst pipe. Which activities absolutely must keep going, which can wait, and what would you need to make the urgent ones happen?",
  "activity": {
   "title": "Sequence and strategy card sort",
   "materials": "Printed cards showing the six BCP development stages in random order, printed process cards (for example payroll, customer phone line, marketing newsletter) each with an RTO, sticky notes, whiteboard.",
   "steps": [
    "Give each group the shuffled stage cards and ask them to arrange the stages in order, then check against the board.",
    "Hand each group three process cards. For each, the group writes on a sticky note one continuity strategy that meets the RTO, such as remote work, a manual workaround or a second supplier.",
    "Ask groups to name who in the business should be able to activate the plan for each process and who their deputy would be.",
    "Give each group a change card (for example 'new logistics supplier' or 'office relocation') and have them list which parts of their plan must now be reviewed.",
    "Groups swap their sticky notes with a neighbor, who checks that each strategy actually fits the RTO and flags any that rely on the same building or person."
   ]
  },
  "discussion": [
   "Why might a plan written entirely by the IT department fail even if every system is restored on time?",
   "How would you persuade a busy executive team that continuity planning needs ongoing budget rather than a one-time project?"
  ],
  "exit": [
   [
    "What comes first in developing a BCP?",
    "Senior management support and approval of policy and scope, followed by the BIA."
   ],
   [
    "A process has a four-hour RTO but the DRP restores its application in two days. What is the problem?",
    "The BCP and DRP recovery targets are not aligned, so the continuity objective cannot be met."
   ],
   [
    "Name two events that should trigger a BCP review outside the yearly schedule.",
    "Any two of a reorganization, relocation, merger, new system or new supplier."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially completed staircase diagram with two stages filled in and a glossary card defining BIA, RTO and RPO in plain words.",
   "Extend: Ask fast finishers to draft the one-page activation checklist for one process, including activation criteria, a deputy, contact methods that work without the office, and the return-to-normal step."
  ]
 },
 {
  "t": "Disaster recovery plan (DRP) and recovery site strategies",
  "objectives": [
   "Students will be able to compare hot, warm, cold, mirrored and reciprocal recovery options by recovery time and cost.",
   "Students will be able to select a recovery strategy that meets a given RTO and RPO from a BIA.",
   "Students will be able to explain the restore requirements of full, incremental and differential backups.",
   "Students will be able to justify restore testing, geographic separation and dependency ordering in a DRP."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up prompt aloud and take quick answers, writing the trade-off 'speed versus cost' on the board."
   ],
   [
    12,
    "Teach",
    "Draw a horizontal scale from cold to mirrored, marking typical recovery time below and cost above. Explain incremental versus differential backups with a week-long calendar on the board, showing which sets a Thursday restore needs."
   ],
   [
    15,
    "Activity",
    "Run the recovery strategy match described below in pairs."
   ],
   [
    8,
    "Discuss",
    "Have pairs share their most difficult scenario and how they justified the choice. Raise the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on paper and hand them in."
   ]
  ],
  "warmup": "If your phone was lost tonight, how quickly would you need a working replacement, and how many days of photos could you afford to lose? What would you pay to make both numbers smaller?",
  "activity": {
   "title": "Recovery strategy match",
   "materials": "Printed scenario cards, each describing a system with an RTO, RPO, budget level and location detail; a printed restore-order puzzle card listing six components (application, database, directory, network, name resolution, reporting); whiteboard.",
   "steps": [
    "Give each pair four scenario cards. For each, the pair chooses a recovery site type and a data protection method (nightly backup, replication or snapshots) that meets both RTO and RPO.",
    "Pairs flag any scenario detail that breaks the design, such as a recovery site in the same flood zone or backups using the same administrator credentials as production.",
    "Hand out the restore-order puzzle card and have pairs number the components in the order they must be restored, explaining each dependency.",
    "Pairs swap answers with a neighboring pair, who checks one choice and asks 'how would you prove this works?' The answer must describe a restore test.",
    "Collect two contrasting answers on the board and resolve them as a class."
   ]
  },
  "discussion": [
   "Why might an organization keep a cold site for some systems even when it can afford a hot site?",
   "What could go wrong at failback, and why do plans often forget it?"
  ],
  "exit": [
   [
    "A system can be down for up to two weeks and the budget is minimal. Which site fits?",
    "A cold site, which is cheapest and acceptable for days to weeks of recovery time."
   ],
   [
    "A full backup runs Sunday night and incremental backups run Monday through Saturday nights. What is needed to restore on Thursday morning?",
    "The Sunday full backup plus every incremental from Monday through Wednesday night."
   ],
   [
    "Restoration of an application fails because nobody can sign in. What was likely missed?",
    "The dependency on identity or directory services, which should be restored before the application."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card summarizing each site type with a time range and relative cost, and a filled-in example of an incremental versus differential restore.",
   "Extend: Ask fast finishers to design a DRP outline for two systems with very different RTOs and RPOs, including how they would protect backups from ransomware and how often they would test restores."
  ]
 },
 {
  "t": "Incident classification, categorization and severity",
  "objectives": [
   "Students will be able to distinguish an event, an alert, an incident and a breach.",
   "Students will be able to assign a category and a severity level to an incident using a severity matrix based on business impact.",
   "Students will be able to explain why severity is reassessed and how upgrades should be recorded and escalated.",
   "Students will be able to identify distractor criteria, such as alert count or malware family, that should not drive severity."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and sort student examples into event, alert, incident and breach on the board."
   ],
   [
    10,
    "Teach",
    "Present the four definitions, then project a simple four-level severity matrix with criteria and required notifications. Emphasize that business impact drives severity and that ratings change as facts emerge."
   ],
   [
    17,
    "Activity",
    "Run the triage desk role-play described below in groups of four."
   ],
   [
    8,
    "Discuss",
    "Compare the ratings groups gave the same cards and discuss why they differed. Raise the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "Your smoke alarm goes off while you are making toast. Your neighbor's alarm goes off and you smell smoke in the hallway. Are both the same kind of situation? How do you decide what to do?",
  "activity": {
   "title": "Triage desk role-play",
   "materials": "Printed severity matrix handout, printed incident cards in two parts (an initial report and a sealed update card revealing new facts), sticky notes in two colors, whiteboard.",
   "steps": [
    "In each group, assign roles: two analysts, an incident manager and a recorder. Give each group five initial incident cards.",
    "Analysts decide for each card whether it is an event, alert, incident or breach, then assign a category and a severity using the matrix. The recorder writes the rating and reason on a sticky note.",
    "The teacher hands out update cards for two of the incidents, revealing new facts such as access to a customer database or a contained device.",
    "The group reassesses severity, records the change with time and reason on a second-color sticky note, and the incident manager states who must now be notified according to the matrix.",
    "Groups post their notes on the board under the incident names so the class can compare ratings."
   ]
  },
  "discussion": [
   "When might calling an incident a breach too early cause problems, and when might calling it too late cause problems?",
   "How could poor categorization in the ticketing system mislead management about where to invest?"
  ],
  "exit": [
   [
    "What should primarily determine incident severity?",
    "Business impact: criticality of affected processes, data sensitivity, scope and legal or safety implications."
   ],
   [
    "What makes an incident a breach?",
    "Confirmed unauthorized access to or disclosure of data."
   ],
   [
    "A low-severity malware case turns out to involve stolen administrator credentials used on a payroll server. What should happen?",
    "Upgrade the severity, record the reason and time, and escalate according to the severity matrix."
   ]
  ],
  "differentiation": [
   "Support: Give students who struggle a one-page flowchart with yes or no questions (is it confirmed, is data accessed, is a critical process affected) that leads to a classification and severity.",
   "Extend: Ask fast finishers to design their own four-level severity matrix for a small online retailer, including criteria, notification times and who leads each level."
  ]
 },
 {
  "t": "Incident management training, testing and exercises",
  "objectives": [
   "Students will be able to order test types from least to most disruptive and identify each from a description.",
   "Students will be able to plan a tabletop exercise with objectives, a scenario and injects.",
   "Students will be able to write after-action improvements that have an owner and a due date.",
   "Students will be able to explain who needs training and when plans should be tested beyond the regular schedule."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect what students learned from fire drills or sports practice that they could not have learned from reading instructions."
   ],
   [
    10,
    "Teach",
    "Draw a ladder of test types from checklist to full interruption, labeling disruption and realism. Walk through the exercise cycle: objectives, scenario, briefing, run, debrief, after-action report, tracking."
   ],
   [
    20,
    "Activity",
    "Run the mini tabletop described below, with the teacher as facilitator."
   ],
   [
    5,
    "Discuss",
    "Groups read out their best improvement action. Check each has an owner and date. Raise one discussion question."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Think of a fire drill, a sports practice or a rehearsal you have taken part in. What did you discover during practice that you would never have learned just by reading the instructions?",
  "activity": {
   "title": "Mini tabletop with injects",
   "materials": "Projector or whiteboard for the scenario, printed role cards (incident manager, security lead, legal, communications, finance, business owner), five printed inject cards, an after-action report template on paper.",
   "steps": [
    "Split the class into groups of six and hand out role cards. State the objective: test decisions on escalation, outside help and communication during a ransomware scenario.",
    "Present the opening scenario. Every four minutes, read an inject aloud, such as 'the communications lead is unreachable' or 'a journalist calls the front desk'.",
    "Each group discusses and writes its decision for each inject, noting who made it and any gap in the plan they uncovered. One student in each group acts as observer and records times and problems.",
    "After the last inject, run a three-minute debrief in each group using the observer's notes.",
    "Each group completes the after-action template with at least three improvement actions, each with an owner role and a due date."
   ]
  },
  "discussion": [
   "Why might executives resist taking part in exercises, and how would you persuade them?",
   "What are the risks of inviting a key vendor to an exercise, and what are the benefits?"
  ],
  "exit": [
   [
    "Which exercise type is discussion-based and touches no systems?",
    "A tabletop exercise."
   ],
   [
    "Put these in order from least to most disruptive: parallel test, walkthrough, full interruption, tabletop.",
    "Walkthrough, tabletop, parallel test, full interruption."
   ],
   [
    "Rewrite this action so it is effective: 'Improve the contact list.'",
    "For example: 'The security manager will verify and update all incident contacts, including deputies, by the end of next month.' It needs an owner, a specific task and a date."
   ]
  ],
  "differentiation": [
   "Support: Give students a printed ladder diagram with each test type, a one-line description and a disruption rating, and pair them with a confident peer for the tabletop roles.",
   "Extend: Ask fast finishers to design a one-year exercise program for a mid-sized company that increases realism over time, explaining which plans are tested when and what approvals each needs."
  ]
 },
 {
  "t": "Incident management tools and techniques: SIEM, SOAR and playbooks",
  "objectives": [
   "Students will be able to match SIEM, SOAR, EDR, XDR and UEBA to their primary functions.",
   "Students will be able to explain why logging and time synchronization are prerequisites for detection and investigation.",
   "Students will be able to outline a playbook for a common incident type, including where human approval is required.",
   "Students will be able to select metrics such as MTTD, MTTR and false positive rate to judge whether tools are effective."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and note answers about too many alerts and ignored alarms on the board."
   ],
   [
    12,
    "Teach",
    "Draw the flow from log sources to SIEM to analyst to SOAR playbook to action. Explain each tool's role, the need for NTP, and why validation comes first. Show a short sample of three log lines with mismatched times to illustrate the timeline problem."
   ],
   [
    15,
    "Activity",
    "Run the phishing playbook build described below in groups of three."
   ],
   [
    8,
    "Discuss",
    "Groups compare where they placed human approval steps and which metrics they chose. Raise the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a half sheet of paper."
   ]
  ],
  "warmup": "Imagine your phone buzzed with a notification every thirty seconds, all day. How long before you stopped looking? What would you change so you only saw the important ones?",
  "activity": {
   "title": "Build a phishing playbook",
   "materials": "Sticky notes, large sheets of paper or whiteboard space for each group, printed cards listing candidate steps (extract links, check threat intelligence, search mailboxes, remove copies, block sender, reset credentials, notify user, open ticket), markers in two colors.",
   "steps": [
    "Give each group the step cards and ask them to arrange the steps into a phishing response playbook from 'user reports email' to 'ticket closed'.",
    "Groups mark each step in one color if it can be fully automated by SOAR and in the other color if it needs a human decision or approval.",
    "Groups add any missing steps on sticky notes, including validation of the report before action.",
    "Each group names which tool supplies the data or action at each step: SIEM, EDR, mail system or threat intelligence.",
    "Finally, groups pick two metrics they would report to management to show the playbook is working and write them at the bottom of the sheet."
   ]
  },
  "discussion": [
   "What could go wrong if a SOAR playbook disabled accounts automatically without any human approval?",
   "If analysts ignore most SIEM alerts, should the manager buy a better tool or change something else first?"
  ],
  "exit": [
   [
    "Which tool correlates logs from many sources and raises alerts?",
    "A SIEM."
   ],
   [
    "What is the first thing an analyst should do when a high-priority alert fires?",
    "Validate it to confirm whether it is a real incident before escalating or containing."
   ],
   [
    "Why does a SIEM depend on synchronized time across systems?",
    "Without consistent timestamps, events cannot be correlated or placed in the right order on an incident timeline."
   ]
  ],
  "differentiation": [
   "Support: Provide a matching card that pairs each tool acronym with its full name and one verb (collects, automates, isolates, baselines) for students who confuse the tools.",
   "Extend: Ask fast finishers to write a second playbook for a lost laptop, and to propose how they would measure whether SIEM tuning reduced the false positive rate over a quarter."
  ]
 },
 {
  "t": "Incident investigation, evaluation and evidence handling",
  "objectives": [
   "Students will be able to explain the purpose of investigation and evaluation in incident management.",
   "Students will be able to order evidence collection according to the order of volatility.",
   "Students will be able to describe how hashing and chain of custody preserve the integrity and admissibility of evidence.",
   "Students will be able to identify actions that destroy evidence and choose evidence-preserving alternatives."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about a crime scene and list what detectives do before touching anything."
   ],
   [
    12,
    "Teach",
    "Present the order of volatility as a vertical list on the board. Show the hash example on the projector and explain that changing one bit changes the hash. Walk through a sample chain of custody form column by column."
   ],
   [
    18,
    "Activity",
    "Run the evidence relay described below in groups of four."
   ],
   [
    5,
    "Discuss",
    "Ask groups where their chain broke and what that would mean in court. Raise one discussion question."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "On crime shows, why do detectives put on gloves, take photographs and bag items before anyone moves anything? What would happen in court if they skipped those steps?",
  "activity": {
   "title": "Evidence relay",
   "materials": "Envelopes labeled as evidence items (memory capture, disk image, firewall log, USB drive), printed chain of custody forms, printed volatility cards to sort, a student laptop with a browser to show that an online hash calculator gives a different value when one character of text changes.",
   "steps": [
    "Give each group a set of shuffled volatility cards and ask them to sort them from most to least volatile, then check against the board.",
    "Hand the group an evidence envelope and a chain of custody form. The first student records the item, time, a pretend hash value and their name, then passes it to the next student.",
    "The teacher secretly instructs one student in some groups to 'take a quick look inside' or to pass the envelope without signing.",
    "At the end, groups audit their chain of custody form and identify any gap or undocumented handling.",
    "Demonstrate on the projector how changing one character of text changes its hash completely, and ask groups to explain how this proves an image was not altered."
   ]
  },
  "discussion": [
   "When might business safety justify acting on the original system before evidence is fully preserved, and who should make that call?",
   "Why might an organization engage an outside forensic firm through legal counsel rather than directly?"
  ],
  "exit": [
   [
    "Which should be collected first: a disk image, memory contents or archived backups?",
    "Memory contents, because they are the most volatile and are lost on shutdown."
   ],
   [
    "What two things together show that evidence has not been altered and who handled it?",
    "Matching cryptographic hashes and a complete chain of custody record."
   ],
   [
    "A compromised server may be needed as evidence. Should you power it off or isolate it from the network?",
    "Isolate it from the network, so the attack is contained while volatile evidence is preserved for capture."
   ]
  ],
  "differentiation": [
   "Support: Give students who struggle a card listing the order of volatility with an everyday comparison for each level, and a partly completed chain of custody form to finish.",
   "Extend: Ask fast finishers to write a one-page evidence handling procedure for the incident response plan, including who to call, which retainers to have, and when legal counsel must be involved."
  ]
 },
 {
  "t": "Incident containment, eradication and recovery",
  "objectives": [
   "Students will be able to sequence containment, eradication and recovery actions and explain why the order matters.",
   "Students will be able to distinguish pre-authorized technical actions from disruptive actions that need business owner approval.",
   "Students will be able to list the checks required before restoring from backup.",
   "Students will be able to diagnose why an attacker returned after cleanup."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and write the three steps students suggest for a burst pipe on the board, then relabel them containment, eradication and recovery."
   ],
   [
    10,
    "Teach",
    "Explain each phase with two concrete actions. Highlight business trade-offs, pre-authorized actions, coordinated containment, rebuild versus clean, the checks before restore, and why ransom payment is a senior management decision."
   ],
   [
    18,
    "Activity",
    "Run the response action card sort described below in groups of three."
   ],
   [
    7,
    "Discuss",
    "Groups present their sequence and their approval decisions. Raise the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "A pipe bursts in your kitchen and water is spreading across the floor. What are the first three things you do, in order, and what happens if you start mopping before anything else?",
  "activity": {
   "title": "Response action card sort",
   "materials": "Printed action cards (for example isolate host with EDR, disconnect site link, disable admin account, rebuild from known-good image, patch remote access gateway, reset service account credentials, verify backup predates compromise, restore database, monitor for reinfection, business owner confirms normal operation), three column headings on the whiteboard, colored dots or markers.",
   "steps": [
    "Give each group a shuffled set of action cards from a ransomware scenario and ask them to sort them into containment, eradication and recovery columns.",
    "Within each column, groups put the cards in the order they would perform them, noting dependencies such as restoring identity before applications.",
    "Groups mark each card with a dot showing whether it is pre-authorized for the technical team or needs business owner approval.",
    "Hand out a 'twist' card: the attacker returned a week later. Groups identify which missing or misplaced card most likely explains the return.",
    "Groups photograph or copy their final layout on the board for the class discussion."
   ]
  },
  "discussion": [
   "How would you decide between disconnecting a revenue-generating system and accepting the risk of further spread for an hour?",
   "Why might a capable attacker become more destructive if containment happens one foothold at a time?"
  ],
  "exit": [
   [
    "Ransomware is spreading across file servers. What should happen first?",
    "Containment, such as isolating affected servers and disabling compromised accounts."
   ],
   [
    "Name two checks before restoring systems from backup.",
    "Confirm the backups are clean and predate the compromise, and confirm the exploited weakness has been fixed."
   ],
   [
    "Who should approve taking a critical revenue system offline?",
    "The business owner or the authority named in the incident response plan."
   ]
  ],
  "differentiation": [
   "Support: Give students who struggle a three-column template with one example card already placed in each column and a short definition of each phase at the top.",
   "Extend: Ask fast finishers to draft the pre-authorized actions section of an incident response plan, listing which actions the technical team may take alone and which need approval, with reasons."
  ]
 },
 {
  "t": "Incident communications: escalation, notification and regulatory reporting",
  "objectives": [
   "Students will be able to distinguish internal escalation from external notification and give examples of each.",
   "Students will be able to identify who decides on external notification and the roles of legal counsel, privacy and communications.",
   "Students will be able to explain why out-of-band channels and designated spokespeople are used during incidents.",
   "Students will be able to outline the contents of a regulatory notification matrix."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list the people students say should hear first and who should speak publicly."
   ],
   [
    10,
    "Teach",
    "Draw the notification sequence on the board: facts, legal and privacy assessment, senior management decision, communications drafts, designated sender. Explain escalation by severity, out-of-band channels, spokespeople and the notification matrix, using the GDPR 72-hour rule as one example."
   ],
   [
    20,
    "Activity",
    "Run the communications role-play described below in groups of five."
   ],
   [
    5,
    "Discuss",
    "Groups report which pressure card was hardest and how they handled it. Raise one discussion question."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "Your school discovers that a list of students' home addresses was emailed to the wrong people. Who should hear about it first, who should decide what to tell families, and who should talk to a local reporter who calls?",
  "activity": {
   "title": "Communications under pressure role-play",
   "materials": "Printed role cards (incident manager, legal counsel, privacy officer, communications lead, chief executive), printed pressure cards (reporter calls a store manager, engineer drafts a message to a regulator, insurer asks for notice, team chat may be compromised, regulator deadline approaching), a blank notification matrix handout, whiteboard.",
   "steps": [
    "Give each group a short scenario: customer names and addresses were accessed from a database. Assign roles.",
    "Every three minutes, the teacher hands each group a pressure card. The group decides who acts, what they say or do and through which channel, and records it on the matrix handout.",
    "The legal and privacy roles must state which obligations they would check and what facts they need from responders.",
    "The chief executive role makes the notification decision only after hearing legal advice, and the communications role drafts a three-sentence initial customer notice that states what is known and what customers can do.",
    "Groups swap draft notices with another group, who checks for speculation, inconsistency or blame and suggests one improvement."
   ]
  },
  "discussion": [
   "What is the risk of notifying regulators too early with incomplete facts, and how do initial reports with later updates address it?",
   "Why might a contact center script be as important as the official press statement?"
  ],
  "exit": [
   [
    "Who decides whether to notify a regulator about a breach?",
    "Senior management, on the advice of legal counsel, following the incident response plan."
   ],
   [
    "A journalist calls an employee about an incident. What should the employee do?",
    "Politely refer the journalist to the designated spokesperson or communications team without commenting."
   ],
   [
    "Why might an incident team use a separate phone bridge instead of company chat?",
    "The attacker may be monitoring chat or email, or those systems may be unavailable, so out-of-band communication is safer."
   ]
  ],
  "differentiation": [
   "Support: Give students who struggle a flowchart of the notification sequence with each role's responsibility in one sentence, and a sentence-starter template for the initial customer notice.",
   "Extend: Ask fast finishers to build a sample regulatory notification matrix for a company operating in two jurisdictions, using placeholder obligations and showing trigger, recipient, deadline and owner columns, without inventing specific legal values."
  ]
 },
 {
  "t": "Post-incident review and lessons learned",
  "objectives": [
   "Students will be able to explain the primary purpose of a post-incident review and why it should be blameless.",
   "Students will be able to apply the five whys technique to move from an immediate trigger to a root cause.",
   "Students will be able to write improvement actions that are specific, owned and dated.",
   "Students will be able to interpret repeated incidents of the same type as evidence of unimplemented lessons."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect examples of reviewing a game, project or test result, noting which led to real change."
   ],
   [
    10,
    "Teach",
    "Explain timing, attendance, facilitator role, structured questions and the blameless principle. Demonstrate the five whys on the board with the phishing example, ending at missing MFA."
   ],
   [
    18,
    "Activity",
    "Run the five whys and action-writing workshop described below in groups of four."
   ],
   [
    7,
    "Discuss",
    "Groups share their root cause and best action. The class checks each action for owner, task and date. Raise the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Think about the last time you reviewed something that went wrong, such as a lost game, a failed test or a group project. Did the review lead to a real change? Why or why not?",
  "activity": {
   "title": "Five whys and action-writing workshop",
   "materials": "Printed incident timeline handouts (a short phishing-led mailbox compromise with timestamps), sticky notes, large paper or whiteboard sections, a printed checklist for good actions (specific task, named owner role, due date, how completion is checked).",
   "steps": [
    "Give each group the timeline handout. Groups list on sticky notes what went well and what went poorly, using only facts from the timeline.",
    "Groups pick the most serious problem and apply the five whys, writing each answer on a new sticky note in a vertical chain until they reach a systemic root cause.",
    "Groups check that their chain does not stop at a person, such as 'the user clicked', and rewrite any step that blames an individual.",
    "Each group writes three improvement actions using the checklist, then swaps with another group to score each action against the checklist.",
    "Groups decide which action they would report to senior management and why, and write one sentence on how they would confirm it was completed."
   ]
  },
  "discussion": [
   "Where is the line between a blameless review and holding people accountable, and why keep those processes separate?",
   "Why do improvement actions so often disappear after a review, and what can a security manager do about it?"
  ],
  "exit": [
   [
    "What is the primary purpose of a post-incident review?",
    "To improve controls, processes and the response plan so similar incidents are less likely or less harmful, not to assign blame."
   ],
   [
    "Rewrite 'improve monitoring' as an effective action.",
    "For example: 'The security operations lead will route mailbox rule alerts to the monitored queue and test the rule by the end of next month.' It needs a specific task, owner and date."
   ],
   [
    "The same kind of incident has happened three times this year. What does that suggest?",
    "The root cause remains unfixed and lessons from earlier reviews were not implemented or tracked."
   ]
  ],
  "differentiation": [
   "Support: Provide a five whys template with the first two answers filled in and an example of a well-written action next to a vague one.",
   "Extend: Ask fast finishers to design a one-page dashboard for senior management that tracks lessons-learned actions and incident metrics across a year, explaining which trends would prompt further investment."
  ]
 }
]);
