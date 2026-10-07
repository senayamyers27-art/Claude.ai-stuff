/* Teacher edition for ISC2 Certified in Cybersecurity (2026 outline): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("isc2-cc", [
 {
  "t": "Cybersecurity concepts: confidentiality, integrity, availability",
  "objectives": [
   "Students will be able to define confidentiality, integrity and availability in their own words.",
   "Students will be able to classify a described incident by the CIA goal that was primarily lost.",
   "Students will be able to match common controls such as encryption, hashing and backups to the goal each mainly supports.",
   "Students will be able to explain one trade-off between confidentiality and availability."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect three or four answers on the whiteboard without judging them. Point out that the answers already fall into three groups."
   ],
   [
    12,
    "Teach",
    "Draw a triangle labeled C, I and A. Define each goal with one everyday example and one workplace example. Add the DAD triad around the outside and show how each attacker action breaks one side. Close with the trade-off idea."
   ],
   [
    18,
    "Activity",
    "Run the incident card sort described in the activity. Circulate and ask groups to justify any card they placed on more than one side."
   ],
   [
    5,
    "Discuss",
    "Take the discussion questions. Focus on ransomware and on how too much security can harm availability."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them on the door as they leave."
   ]
  ],
  "warmup": "Think about the last time an app or website you rely on let you down. Was the problem that someone saw something they should not, that something was wrong, or that it simply did not work?",
  "activity": {
   "title": "CIA incident card sort",
   "materials": "Whiteboard with a large triangle drawn on it, sticky notes, and 15 printed incident cards prepared by the teacher (for example: misdirected email with customer data, changed invoice number, server room flood, shoulder surfing, deleted virtual machine, forged email from the CEO, ransomware with data theft).",
   "steps": [
    "Split the class into groups of three or four and give each group five incident cards.",
    "Groups decide which CIA goal each incident primarily affects and write the reason on a sticky note attached to the card.",
    "Each group places its cards on the matching side of the triangle on the whiteboard; cards that hit two goals go on a corner.",
    "For each card, the group names one control that would have prevented or reduced the harm.",
    "The teacher reviews any disputed cards with the class and confirms the primary goal."
   ]
  },
  "discussion": [
   "Is it possible to have perfect confidentiality and perfect availability at the same time? Why or why not?",
   "Which of the three goals matters most for a hospital, an online store and a news website, and does the answer change?"
  ],
  "exit": [
   [
    "A disgruntled employee deletes the only copy of a project folder. Which CIA goal is primarily affected?",
    "Availability, because authorized users can no longer access the data."
   ],
   [
    "Which goal does a file hash mainly support?",
    "Integrity, because a changed hash shows the file was altered."
   ],
   [
    "Give one example of a control that helps confidentiality but can slow down availability.",
    "Encryption or multiple approval steps, because they add effort or delay before legitimate users reach data."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-column cheat card with a one-word cue for each goal (secret, correct, working) and let them sort only the clearer incident cards first.",
   "Extend: Ask fast finishers to pick one incident card and write a short paragraph explaining how it could affect all three goals depending on what the attacker did next."
  ]
 },
 {
  "t": "Authentication, authorization and accounting (AAA), non-repudiation, privacy",
  "objectives": [
   "Students will be able to distinguish identification, authentication, authorization and accounting and place them in order.",
   "Students will be able to explain why shared accounts break accountability and non-repudiation.",
   "Students will be able to compare privacy with confidentiality using a concrete example.",
   "Students will be able to identify which AAA element is involved in a short login or access scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about a building visit and list the steps students describe on the board. Label each step later in the lesson."
   ],
   [
    12,
    "Teach",
    "Walk through the hotel analogy, writing identify, authenticate, authorize and account as a flow on the board. Add non-repudiation with the shared-account story and finish with the privacy versus confidentiality distinction."
   ],
   [
    18,
    "Activity",
    "Run the log detective activity. Pairs read the printed log excerpt and answer the questions, then share findings."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect shared accounts and over-collection of data to real workplaces students know."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "When you visit an office building as a guest, what happens between walking in the front door and reaching the meeting room? List every step.",
  "activity": {
   "title": "Log detective",
   "materials": "Printed one-page log excerpt prepared by the teacher showing about 15 entries (successful and failed logins, an access denied event, a file change by a shared account named ops-admin, and a signed approval), plus a question sheet and pens. A projector to show the same excerpt.",
   "steps": [
    "Pairs receive the log excerpt and question sheet.",
    "For each highlighted entry, pairs label it as identification, authentication, authorization or accounting evidence.",
    "Pairs find the entry that cannot be traced to one person and explain why it fails non-repudiation.",
    "Pairs propose two changes that would restore accountability for that entry.",
    "The teacher projects the log and pairs take turns presenting one finding each."
   ]
  },
  "discussion": [
   "Why might a busy team argue for a shared account, and how could you meet their need without losing accountability?",
   "Can you think of an app that keeps your data safe but still uses it in ways you did not expect? Is that a privacy problem?"
  ],
  "exit": [
   [
    "A user enters a correct password and a code from an app. Which AAA step just happened?",
    "Authentication, because the user proved the claimed identity."
   ],
   [
    "Why does a shared administrator account weaken non-repudiation?",
    "Actions cannot be tied to one specific person, so anyone who used it can deny responsibility."
   ],
   [
    "Give one example of a privacy violation that is not a confidentiality breach.",
    "Collecting more personal data than needed, or using it for a purpose the person did not agree to, without any disclosure to outsiders."
   ]
  ],
  "differentiation": [
   "Support: Provide a four-row flow chart with the questions who do you claim to be, prove it, what may you do and what did you do, and let students match terms to each row before reading the log.",
   "Extend: Ask fast finishers to design a login process for a shared factory-floor terminal that is fast for workers but still keeps individual accountability, and explain which AAA elements it uses."
  ]
 },
 {
  "t": "Authentication factors and multi-factor authentication",
  "objectives": [
   "Students will be able to classify authentication methods as knowledge, possession or inherence factors.",
   "Students will be able to determine whether a given login combination is true multi-factor authentication.",
   "Students will be able to explain the difference between false acceptance and false rejection and identify which is more dangerous for high security.",
   "Students will be able to rank common MFA methods by resistance to phishing."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and tally on the board how many students use a password only, a code, or a fingerprint or face to unlock their phone."
   ],
   [
    12,
    "Teach",
    "Introduce the three factor types with the know, have, are chart. Show why password plus PIN is still one factor. Explain SIM swapping, push fatigue and phishing-resistant keys at a recognition level. Sketch the FAR and FRR curves crossing at the CER."
   ],
   [
    18,
    "Activity",
    "Run the factor or fake card game in teams, then the quick biometric tuning discussion at the end of the activity."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to talk about trade-offs between security and convenience."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "How do you unlock your phone? If someone stole your phone and watched you unlock it once, could they get in?",
  "activity": {
   "title": "Factor or fake: MFA card game",
   "materials": "Printed cards prepared by the teacher, each describing a login combination (for example: password plus PIN, smart card plus PIN, fingerprint plus face scan, password plus texted code, security key plus password, password plus security question). Whiteboard with columns labeled single-factor and multi-factor. Sticky notes.",
   "steps": [
    "Divide the class into teams of three and give each team a stack of combination cards.",
    "For each card, teams label every element as know, have or are on a sticky note.",
    "Teams place each card in the single-factor or multi-factor column on the board.",
    "Teams then rank the multi-factor cards from weakest to strongest against phishing and justify the top and bottom choices.",
    "The teacher reviews the board, corrects misplacements and asks one team to explain how a SIM swap would affect the texted-code card."
   ]
  },
  "discussion": [
   "Why do some organizations still allow text message codes even though stronger methods exist?",
   "Should a fingerprint ever be the only factor for a sensitive system? What would make you comfortable with that?"
  ],
  "exit": [
   [
    "Is a smart card plus a PIN single-factor or multi-factor, and why?",
    "Multi-factor, because it combines something you have with something you know."
   ],
   [
    "What is a Type II biometric error?",
    "False acceptance: the system accepts an impostor."
   ],
   [
    "Name one phishing-resistant MFA method.",
    "A hardware security key or a passkey, because the credential is bound to the genuine website."
   ]
  ],
  "differentiation": [
   "Support: Give students a three-column reference card with pictures (a brain, a key, a fingerprint) and two worked examples before the card game.",
   "Extend: Ask fast finishers to write a short recommendation for a small clinic choosing between text codes, an authenticator app and hardware keys, covering cost, usability and phishing resistance."
  ]
 },
 {
  "t": "Risk terms: asset, threat, vulnerability, likelihood, impact",
  "objectives": [
   "Students will be able to define asset, threat, vulnerability, likelihood and impact.",
   "Students will be able to separate the asset, threat and vulnerability in a written scenario.",
   "Students will be able to explain why risk depends on both likelihood and impact.",
   "Students will be able to complete a basic risk register row for a given scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and write students' answers in one mixed list on the board without sorting them."
   ],
   [
    10,
    "Teach",
    "Define each term using the home burglary analogy, then return to the warm-up list and sort it into assets, threats and vulnerabilities with the class. Introduce likelihood times impact and show a sample risk register row."
   ],
   [
    20,
    "Activity",
    "Run the risk register build. Groups complete rows from scenario cards and place them on a likelihood and impact grid on the board."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on why we rarely control threats."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the exit questions on paper."
   ]
  ],
  "warmup": "Name something at school or work that you would hate to lose, and something that could cause you to lose it.",
  "activity": {
   "title": "Build a mini risk register",
   "materials": "Printed scenario cards prepared by the teacher (for example: unencrypted laptop in a car, basement server near pipes, shared admin password, untrained receptionist and phishing), a printed blank risk register with columns for asset, threat, vulnerability, likelihood, impact, owner and suggested treatment, and a whiteboard grid with likelihood on one axis and impact on the other.",
   "steps": [
    "Groups of three receive two scenario cards and a blank register.",
    "Groups fill one row per scenario, rating likelihood and impact as low, medium or high.",
    "Groups write each risk on a sticky note and place it on the likelihood and impact grid on the board.",
    "Groups suggest one change that reduces the vulnerability or the impact, and note which one it is.",
    "The class looks at the grid together and agrees which two risks should be handled first and why."
   ]
  },
  "discussion": [
   "Why do organizations usually focus on vulnerabilities and impact instead of trying to stop threats?",
   "Can you think of a risk that is very unlikely but would be so damaging that it is worth preparing for anyway?"
  ],
  "exit": [
   [
    "A phishing email campaign targeting staff is an example of which risk term?",
    "A threat, because it is a potential cause of harm."
   ],
   [
    "Staff who have never had phishing training represent which risk term?",
    "A vulnerability, because it is a weakness the threat can exploit."
   ],
   [
    "Why might a rare event still be rated a high risk?",
    "Because its impact would be severe, and risk combines likelihood with impact."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a sentence frame for each scenario: The ___ (asset) could be harmed by ___ (threat) because of ___ (vulnerability).",
   "Extend: Ask fast finishers to add a column for existing controls to their register and explain how one control changes the likelihood or impact rating."
  ]
 },
 {
  "t": "Risk assessment (qualitative vs quantitative) and treatment: avoid, mitigate, transfer, accept",
  "objectives": [
   "Students will be able to compare qualitative and quantitative risk assessment and name a strength and weakness of each.",
   "Students will be able to calculate SLE and ALE from asset value, exposure factor and ARO.",
   "Students will be able to classify a described response as avoidance, mitigation, transference or acceptance.",
   "Students will be able to explain why residual risk must be formally accepted and why accountability cannot be transferred."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sort students' answers into four columns on the board without naming them yet. Reveal the column headings avoid, mitigate, transfer and accept."
   ],
   [
    12,
    "Teach",
    "Show a simple heat map for qualitative assessment, then work the AV, EF, SLE, ARO and ALE example step by step on the board. Explain the four treatments, stressing that insurance transfers cost but not accountability, and define inherent and residual risk."
   ],
   [
    18,
    "Activity",
    "Run the risk committee role-play described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to debate when spending more than the ALE might still be justified."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Your phone could be dropped, stolen or run out of battery. What do people actually do about each of those risks?",
  "activity": {
   "title": "Risk committee role-play",
   "materials": "Printed risk cards prepared by the teacher, each giving an asset value, exposure factor, ARO and a control cost (for example: laptop theft, website outage, flood in a basement server room, vendor data breach). Calculators or student laptops with a browser calculator. Whiteboard.",
   "steps": [
    "Form groups of four with roles: analyst, finance lead, business owner and risk owner.",
    "The analyst calculates SLE and ALE for the group's two risk cards while the others check the math.",
    "The group compares the ALE with the control cost and debates a treatment, with the business owner arguing for convenience and the finance lead for cost.",
    "The risk owner records the chosen treatment and writes a one-sentence acceptance statement for any residual risk.",
    "Each group presents one risk, its numbers and its treatment to the class; the teacher checks the calculation and the treatment label."
   ]
  },
  "discussion": [
   "When might an organization spend more on a control than the ALE it prevents? Think about safety, law and reputation.",
   "Why might leaders prefer qualitative ratings even when numbers are available?"
  ],
  "exit": [
   [
    "AV is 20,000 dollars, EF is 50 percent and ARO is 0.5. What is the ALE?",
    "SLE = 10,000 dollars; ALE = 10,000 x 0.5 = 5,000 dollars per year."
   ],
   [
    "A company outsources payroll to a provider and signs a contract making the provider pay for breaches. Which treatment is this, and who remains accountable?",
    "Transference; the company remains accountable to its employees and regulators."
   ],
   [
    "Name one strength of quantitative assessment.",
    "It expresses risk in money, which supports cost-benefit decisions and budgets."
   ]
  ],
  "differentiation": [
   "Support: Provide a formula card with SLE = AV x EF and ALE = SLE x ARO, plus one fully worked example, and pair struggling students with a confident calculator during the role-play.",
   "Extend: Ask fast finishers to calculate how much a control would have to reduce the ARO or EF to justify its annual cost, and present that as a recommendation."
  ]
 },
 {
  "t": "Security controls: administrative, technical, physical; preventive, detective, corrective, deterrent",
  "objectives": [
   "Students will be able to classify a control by type as administrative, technical or physical.",
   "Students will be able to classify a control by function as preventive, detective, corrective or deterrent.",
   "Students will be able to explain why some controls serve several functions and choose the primary one in context.",
   "Students will be able to identify gaps in a set of controls using a type and function grid."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the board. Leave the list up for later classification."
   ],
   [
    12,
    "Teach",
    "Draw a grid with types as rows and functions as columns. Explain each axis with the house analogy, show the attack timeline for functions, and classify the warm-up list together. Briefly introduce compensating controls."
   ],
   [
    18,
    "Activity",
    "Run the control grid audit described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore multi-function controls and defense in depth."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "List every security measure you noticed on your way into this building today, from signs to locks to people.",
  "activity": {
   "title": "Control grid audit",
   "materials": "Whiteboard grid with three rows (administrative, technical, physical) and four columns (deterrent, preventive, detective, corrective). Printed control cards prepared by the teacher (for example: fence, background check, firewall rule, IDS alert, backup restore, warning sign, guard, login banner, door lock, antivirus quarantine, training, CCTV review). Sticky notes.",
   "steps": [
    "Give each pair four control cards.",
    "Pairs decide the type and primary function of each control and write their reasoning on a sticky note.",
    "Pairs place each card in the matching cell of the board grid.",
    "The class reviews the grid; the teacher challenges any card that could fit more than one function and asks pairs to defend the primary choice.",
    "The class identifies empty cells and suggests a control that would fill one gap for a fictional school data room."
   ]
  },
  "discussion": [
   "Which single control in your daily life serves the most functions, and which function is primary?",
   "Why is a strong policy not enough on its own? What does it need to be effective?"
  ],
  "exit": [
   [
    "Classify a firewall rule that blocks inbound remote desktop traffic by type and function.",
    "Technical by type, preventive by function."
   ],
   [
    "Is a warning sign on a fence preventive or deterrent?",
    "Deterrent, because it discourages an attempt but does not physically stop one."
   ],
   [
    "What is a compensating control?",
    "An alternative control used when the preferred control is not feasible, such as extra monitoring on an unpatchable system."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference card with one clear example per cell of the grid and let them classify only type first, then function.",
   "Extend: Ask fast finishers to design a layered set of controls for a fictional small clinic's medicine cabinet, covering all four functions and all three types."
  ]
 },
 {
  "t": "ISC2 Code of Ethics: preamble and four canons",
  "objectives": [
   "Students will be able to list the four ISC2 canons in priority order.",
   "Students will be able to explain the meaning of 'adhere, and be seen to adhere' in the preamble.",
   "Students will be able to apply the canon order to resolve an ethical conflict in a workplace scenario.",
   "Students will be able to identify which canon a described behavior supports or violates."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up dilemma aloud and take a quick hand vote. Record the split on the board without commenting."
   ],
   [
    10,
    "Teach",
    "Present the preamble in paraphrase and highlight be seen to adhere. Write the four canons as a numbered ladder on the board and explain that higher rungs win in a conflict. Walk through one example where canon one beats canon three."
   ],
   [
    20,
    "Activity",
    "Run the ethics ladder scenario rounds described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, returning to the warm-up vote to see whether opinions changed."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your manager asks you to stay quiet about a security flaw until after a big sales launch next month. The flaw could expose customer data. Do you agree to wait? Why or why not?",
  "activity": {
   "title": "Ethics ladder scenario rounds",
   "materials": "Printed scenario cards prepared by the teacher (for example: hiding a breach, sharing an employer's data with a friend, accepting a vendor gift during a purchase decision, overstating your skills to win a contract, a colleague publishing unverified threat claims, a request to skip a safety patch). A large four-rung ladder drawn on the whiteboard labeled with the canons. Sticky notes.",
   "steps": [
    "Groups of three draw two scenario cards.",
    "For each card, the group identifies which canons are involved and places a sticky note on the highest rung affected.",
    "The group writes the action that best respects the canon order and one action that would violate it.",
    "Groups present one scenario each; classmates may challenge the rung choice.",
    "The teacher summarizes the patterns, emphasizing that the earliest canon usually decides the conflict."
   ]
  },
  "discussion": [
   "Why do you think ISC2 put protecting society ahead of serving your employer?",
   "Is reporting a problem through proper channels always enough? When might you need to escalate further?"
  ],
  "exit": [
   [
    "List the four canons in order.",
    "Protect society, the common good, public trust and the infrastructure; act honorably, honestly, justly, responsibly and legally; provide diligent and competent service to principals; advance and protect the profession."
   ],
   [
    "A client asks you to omit a serious safety finding from your report. Which canon outranks the client's wishes?",
    "The first canon, protecting society and the infrastructure, and the second on honesty, both outrank duty to principals."
   ],
   [
    "Accepting a large gift from a vendor while choosing between vendors most directly conflicts with which canon?",
    "The second canon, acting honorably and honestly, because it creates a conflict of interest."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a ladder card with a short plain-language label for each canon (public, honest and legal, employer, profession) to use during the scenarios.",
   "Extend: Ask fast finishers to write their own scenario where two canons conflict in a subtle way, along with a model answer explaining which canon wins."
  ]
 },
 {
  "t": "CIA applied to AI systems: data poisoning, transparency and bias",
  "objectives": [
   "Students will be able to map AI-specific risks such as data poisoning, data leakage and service overload to the CIA triad.",
   "Students will be able to describe at least three defenses against data poisoning.",
   "Students will be able to explain why transparency and human accountability matter for AI decisions.",
   "Students will be able to identify signs of algorithmic bias and suggest ways to reduce it."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect examples of AI tools students have used. Note which ones make decisions about people."
   ],
   [
    12,
    "Teach",
    "Explain how models learn from data using the binder analogy. Map poisoning and bias to integrity, leakage and prompt injection to confidentiality, and overload to availability. Discuss explainability and human accountability."
   ],
   [
    18,
    "Activity",
    "Run the poisoned training set activity described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore accountability and acceptable use policies."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Name an app or service you use that makes a decision or recommendation for you. How would you know if it had learned something wrong?",
  "activity": {
   "title": "The poisoned training set",
   "materials": "Printed sheets prepared by the teacher with 20 simple labeled examples (for example, short email subject lines labeled spam or not spam), where about four labels have been deliberately flipped and one group of examples is underrepresented. Highlighters and a whiteboard.",
   "steps": [
    "Pairs receive the training sheet and are told a model will learn rules from it.",
    "Pairs write two simple rules a model might learn from the data as given.",
    "Pairs then hunt for suspicious labels and highlight any they think were poisoned, explaining why.",
    "Pairs identify which kind of example is underrepresented and predict how that could cause biased results.",
    "The class shares findings and the teacher lists defenses on the board: source validation, provenance, change control, benchmark testing, drift monitoring and diverse data."
   ]
  },
  "discussion": [
   "If an AI system makes a harmful decision, who should be held responsible, and why?",
   "What rules would you put in an acceptable use policy for staff using public AI tools at work?"
  ],
  "exit": [
   [
    "Data poisoning primarily threatens which CIA goal?",
    "Integrity."
   ],
   [
    "Give one reason explainability helps security teams.",
    "It makes it possible to audit outputs and spot errors, poisoning or bias, because people can see why the model decided as it did."
   ],
   [
    "Name one way to reduce algorithmic bias.",
    "Use diverse, reviewed training data, test outcomes across groups, or require human review of high-impact decisions."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-column chart labeled confidentiality, integrity and availability with one AI example already filled in for each, and let them add the rest.",
   "Extend: Ask fast finishers to draft a one-paragraph AI risk entry for a risk register, covering asset, threat, vulnerability, likelihood, impact and a treatment for a poisoned fraud model."
  ]
 },
 {
  "t": "Governance, risk and compliance (GRC) and the role of leadership",
  "objectives": [
   "Students will be able to define governance, risk management and compliance and explain how they connect.",
   "Students will be able to explain why compliance does not guarantee security.",
   "Students will be able to distinguish the responsibilities of senior management, the CISO, data owners, custodians and users.",
   "Students will be able to classify actions as due care or due diligence."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers. Point out that passing a test and being fully prepared are not the same."
   ],
   [
    12,
    "Teach",
    "Define each part of GRC with the school example. Draw an accountability pyramid on the board from the board of directors down to users, labeling owners and custodians. Explain due care and due diligence with the vendor example."
   ],
   [
    18,
    "Activity",
    "Run the who is accountable role cards activity described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to examine the compliance versus security distinction."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Have you ever passed a test or inspection but still felt unprepared for the real thing? What does that tell you about checklists?",
  "activity": {
   "title": "Who is accountable: role cards",
   "materials": "Printed role cards prepared by the teacher (board member, CEO, CISO, data owner, data custodian, user, auditor) and printed situation cards (for example: approving a policy exception, setting a dataset's classification, running nightly backups, reporting a phishing email, accepting residual risk, reviewing a vendor's security report, configuring access rights). Whiteboard with the role names written across the top.",
   "steps": [
    "Distribute one role card to each student in groups of seven, or several roles per student in smaller groups.",
    "The teacher reads a situation card aloud; each group decides which role is responsible for doing it and which is accountable for it.",
    "Groups place the situation card under the role on the board and note whether it is due care or due diligence where relevant.",
    "After all cards are placed, the teacher reviews them, correcting common mix-ups between owners and custodians.",
    "Groups write one sentence explaining why the board remains accountable even when tasks are delegated."
   ]
  },
  "discussion": [
   "Why might an organization focus on passing audits rather than reducing real risk, and what are the dangers of that?",
   "How can a CISO help senior leaders make good risk decisions without taking over their accountability?"
  ],
  "exit": [
   [
    "Who is ultimately accountable for information security in an organization?",
    "Senior management and the board of directors."
   ],
   [
    "A system administrator runs backups as instructed by the data owner. Which role is the administrator playing?",
    "Data custodian."
   ],
   [
    "Reviewing a vendor's security report before signing a contract is due care or due diligence?",
    "Due diligence, because it investigates and verifies before acting."
   ]
  ],
  "differentiation": [
   "Support: Provide a simple chart that lists each role with a one-line plain-language job description and an everyday comparison (for example, the owner decides, the custodian does).",
   "Extend: Ask fast finishers to write a short memo to a board explaining the difference between compliance and security, using a fictional audit that missed a real risk."
  ]
 },
 {
  "t": "Policies, standards, procedures, baselines and guidelines",
  "objectives": [
   "Students will be able to define policy, standard, procedure, baseline and guideline.",
   "Students will be able to classify a written statement into the correct document type using specificity and mandatory language.",
   "Students will be able to explain how the documents link together, from policy to procedure, for one security topic.",
   "Students will be able to identify which document type is optional and who approves policies."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up statements on the projector and ask students which ones they would be in trouble for ignoring."
   ],
   [
    10,
    "Teach",
    "Draw a pyramid on the board with laws and regulations above it, policy at the top, standards and baselines in the middle and procedures at the base, with guidelines off to the side. Walk through the remote access thread as an example and highlight must versus should."
   ],
   [
    20,
    "Activity",
    "Run the document sort and build activity described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore why organizations separate documents this way."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Which of these would get you in trouble if you ignored it: 'Students must not share login details', 'Consider using a different password for each site', 'To reset your password, open the portal and select Forgot password'?",
  "activity": {
   "title": "Document sort and build",
   "materials": "Printed statement cards prepared by the teacher (about 20 sentences, each written as a policy, standard, baseline, procedure or guideline), whiteboard with five labeled columns, sticky notes, and blank paper.",
   "steps": [
    "Groups of three sort their statement cards into the five columns on the board, using specificity and must or should language as clues.",
    "The teacher reviews the columns with the class and moves any misplaced cards, explaining why.",
    "Each group picks a topic (for example, email, laptops or visitor access) and writes one statement of each type that fits together as a chain.",
    "Groups swap papers with another group, which labels each statement without seeing the original labels.",
    "Groups compare and discuss any statement that was labeled differently."
   ]
  },
  "discussion": [
   "Why do organizations keep policies free of technical details while putting specific settings in standards and baselines?",
   "What problems might arise if every security rule were written as an optional guideline?"
  ],
  "exit": [
   [
    "Which document type gives step-by-step instructions?",
    "A procedure."
   ],
   [
    "'Users should report suspicious emails promptly' uses which document type's language?",
    "A guideline, because should signals a recommendation."
   ],
   [
    "Where do laws and regulations sit relative to an organization's policies?",
    "Above them; internal documents must comply with laws and regulations."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a clue card listing signal words (must or shall for mandatory, should or consider for guidelines, numbered steps for procedures, settings lists for baselines) to use during the sort.",
   "Extend: Ask fast finishers to take a real-sounding policy statement and write the matching standard, baseline and procedure, making sure each level adds detail without contradicting the one above."
  ]
 },
 {
  "t": "Laws, regulations and contractual requirements (e.g. GDPR, HIPAA, PCI DSS)",
  "objectives": [
   "Students will be able to distinguish laws, regulations, contractual requirements and voluntary standards by their source and method of enforcement.",
   "Students will be able to identify when GDPR, HIPAA or PCI DSS applies to a described organization.",
   "Students will be able to explain how jurisdiction determines which requirements apply.",
   "Students will be able to describe how one control set can be mapped to several obligations."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect three or four answers on the whiteboard, sorting them informally into who makes the rule and who enforces it."
   ],
   [
    15,
    "Teach",
    "Explain the four sources (law, regulation, contract, voluntary standard) with a simple table on the board: who creates it, who enforces it, consequence of breaking it. Then introduce GDPR, HIPAA and PCI DSS, stressing GDPR's reach to non-EU organizations, HIPAA's business associates and PCI DSS as a contract. Close with jurisdiction."
   ],
   [
    15,
    "Activity",
    "Run the Which Rule Applies card sort described in the activity section. Circulate and ask each group to justify one placement aloud."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the activity to real control mapping. Emphasize that legal teams decide applicability while security teams implement and evidence controls."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand them in at the door."
   ]
  ],
  "warmup": "Name one rule your workplace or school must follow that it did not choose for itself. Who made that rule, and what happens if it is broken?",
  "activity": {
   "title": "Which Rule Applies card sort",
   "materials": "Printed scenario cards (about 10 per group), three column headers taped to desks or the whiteboard (GDPR, HIPAA, PCI DSS) plus a fourth for Other or none, sticky notes.",
   "steps": [
    "Prepare cards in advance, each describing a fictional organization, for example: a US hospital's outsourced billing firm; a Brazilian online game that sells subscriptions to players in Germany; a food truck that takes credit cards; a US fitness blog with no payment or health provider ties.",
    "In groups of three or four, students place each card under every requirement that applies. Some cards belong under more than one column.",
    "For each placement, the group writes on a sticky note whether the requirement is a law, regulation or contract, and who would enforce it.",
    "Groups swap tables and review another group's sort, marking any placement they disagree with.",
    "Debrief as a class, focusing on the cards with disagreements, especially non-EU companies and business associates."
   ]
  },
  "discussion": [
   "Why might a company treat a contractual requirement with the same seriousness as a law?",
   "If two jurisdictions impose different breach notification rules on the same incident, how should a security team plan its response?",
   "What are the benefits and risks of building one control set to satisfy several obligations?"
  ],
  "exit": [
   [
    "Is PCI DSS a law, a regulation or a contractual requirement?",
    "A contractual requirement created by the card brands and enforced through contracts with banks and processors."
   ],
   [
    "A US-based app with no European office tracks the behavior of users in the EU. Could GDPR apply, and why?",
    "Yes. GDPR applies to organizations that offer goods or services to, or monitor, people in the EU, regardless of where the organization is located."
   ],
   [
    "A cloud company stores patient records for a hospital. Which HIPAA term describes the cloud company?",
    "A business associate, because it handles PHI on behalf of a covered entity."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page reference card with the three regulations, who they apply to and how each is enforced, and let them use it during the card sort.",
   "Extend: Ask fast finishers to build a small compliance matrix for the Canadian online shop example, listing five controls and marking which of GDPR, PCI DSS and home-country privacy law each supports."
  ]
 },
 {
  "t": "Risk appetite, risk tolerance and ownership of risk",
  "objectives": [
   "Students will be able to define risk appetite, risk tolerance and risk capacity and explain how they relate.",
   "Students will be able to convert a broad appetite statement into a measurable tolerance.",
   "Students will be able to identify the appropriate risk owner for a described risk.",
   "Students will be able to explain why the security team advises on risk but does not accept it for the business."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question. Take a few answers and point out that people have different comfort levels with risk, just like organizations."
   ],
   [
    12,
    "Teach",
    "Write appetite, tolerance, capacity and ownership on the board as a ladder. Give a hospital appetite statement, then show how it becomes a tolerance with a number. Explain the risk owner role and why security advises rather than accepts. Show a sample risk register row."
   ],
   [
    18,
    "Activity",
    "Run the Who Owns It role-play described in the activity section."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, drawing out examples from the role-play where groups disagreed about ownership."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Would you lend a friend 20 dollars without asking when they will pay you back? What about 2,000? Where is your limit, and who in your household gets to decide?",
  "activity": {
   "title": "Who Owns It role-play",
   "materials": "Printed role cards (business owner, security analyst, executive), printed risk scenario cards, whiteboard for a shared risk register.",
   "steps": [
    "Draw a simple risk register on the whiteboard with columns for risk, owner, current rating, tolerance, decision.",
    "In groups of three, students take the roles of a business manager, a security analyst and an executive. Each group gets two scenario cards, such as a sales team wanting an unapproved messaging app, or a lab running an unsupported operating system.",
    "The analyst presents the risk and options in plain business language. The business manager decides whether to treat, accept, avoid or transfer it. The executive checks the decision against a printed appetite statement and tolerance.",
    "Each group writes its result as a row in the class risk register, naming the owner by job title.",
    "The teacher reviews each row, highlighting any where the analyst ended up accepting risk and asking the class to correct it."
   ]
  },
  "discussion": [
   "What could go wrong in an organization where nobody is named as the owner of a risk?",
   "Why might two organizations in the same industry set different risk appetites?",
   "How should a security analyst respond if a manager pressures them to sign off on a risky exception?"
  ],
  "exit": [
   [
    "Give one example of a risk appetite statement and one matching risk tolerance.",
    "Appetite: we have a low appetite for customer-facing outages. Tolerance: the online portal may be unavailable no more than a set number of hours per month."
   ],
   [
    "Who should accept the residual risk of an unpatched system used by the finance department?",
    "The finance leader who owns the system or process, not the security team."
   ],
   [
    "What is risk capacity and how should it relate to appetite?",
    "The maximum risk the organization can absorb before failing; it should be greater than appetite."
   ]
  ],
  "differentiation": [
   "Support: Provide a fill-in template that pairs each appetite statement with a blank tolerance line and a list of possible owners to choose from.",
   "Extend: Ask students to write a short policy exception request for an unsupported system, including compensating controls, an owner, and a review date."
  ]
 },
 {
  "t": "Third-party and vendor risk",
  "objectives": [
   "Students will be able to explain why accountability remains with the organization when work is outsourced.",
   "Students will be able to list due diligence steps and contract clauses that control vendor risk.",
   "Students will be able to distinguish an SLA from an NDA and a right-to-audit clause.",
   "Students will be able to describe supply chain risk and two defenses against it."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers. Point out that each answer is a third party that could affect the organization."
   ],
   [
    12,
    "Teach",
    "Walk through the vendor lifecycle on the board as a timeline: select and assess, contract, monitor, offboard. Add key clauses (security controls, breach notification, right to audit, data return, subcontractors, SLA, NDA). Finish with supply chain risk and fourth parties."
   ],
   [
    18,
    "Activity",
    "Run the Red-Pen the Contract exercise described in the activity section."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, connecting answers back to the contract gaps students found."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "List every outside company your school or workplace relies on to function for a single day. Which of them could see personal information?",
  "activity": {
   "title": "Red-Pen the Contract",
   "materials": "A one-page printed fictional vendor agreement (written by the teacher) with deliberate gaps, red pens, a projector to show the same page.",
   "steps": [
    "Write a short fictional agreement between a clinic and a cloud scheduling vendor that includes price, a vague uptime promise and payment terms, but omits breach notification, right to audit, data return, data location and subcontractor rules.",
    "In pairs, students mark up the agreement in red, adding each missing clause in their own words and noting why it matters.",
    "Pairs then classify each clause they added as due diligence, contract control, monitoring or offboarding.",
    "Project the agreement and build a combined class version, taking one clause from each pair.",
    "Close by asking which single clause the class would least want to lose and why."
   ]
  },
  "discussion": [
   "Why might a small business accept more vendor risk than a large bank, and is that reasonable?",
   "How would you find out whether a vendor's own subcontractors are handling your data safely?",
   "What makes a supply chain attack harder to detect than a direct attack?"
  ],
  "exit": [
   [
    "Your vendor suffers a breach that exposes your customers' data. Who is accountable to the customers?",
    "Your organization, because accountability cannot be outsourced."
   ],
   [
    "Name two clauses that should be in a vendor contract before signing.",
    "Any two of: required security controls, breach notification timeline, right to audit, data return or destruction, data location, subcontractor disclosure."
   ],
   [
    "What is a supply chain attack?",
    "An attack that compromises a trusted supplier's product or service, such as a software update, in order to reach its customers."
   ]
  ],
  "differentiation": [
   "Support: Give students a checklist of possible clauses to look for while marking up the agreement, so they focus on identifying gaps rather than recalling terms.",
   "Extend: Ask students to design a simple vendor tiering scheme with three tiers, explaining what checks each tier requires and how often each is reassessed."
  ]
 },
 {
  "t": "Security awareness training and cybersecurity culture",
  "objectives": [
   "Students will be able to distinguish awareness, training and education.",
   "Students will be able to identify phishing, spear phishing, whaling, smishing, vishing, pretexting and business email compromise in scenarios.",
   "Students will be able to choose meaningful metrics for an awareness program and interpret report rates.",
   "Students will be able to describe features of a positive security culture and classify training as an administrative, preventive control."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Collect answers about what made a scam message convincing and write the cues on the board: urgency, authority, familiarity."
   ],
   [
    13,
    "Teach",
    "Explain awareness versus training versus education. Define each social engineering type with a one-line example. Discuss simulated phishing, metrics including report rate, and the difference between supportive and punitive cultures."
   ],
   [
    17,
    "Activity",
    "Run the Spot the Lure exercise described in the activity section."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reflect on culture and how people respond to mistakes."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of a scam text, call or email you or someone you know has received. What made it seem believable, even for a moment?",
  "activity": {
   "title": "Spot the Lure",
   "materials": "Printed packets of eight fictional messages (emails, texts and call transcripts written by the teacher, using fictional company names), highlighters, a projector.",
   "steps": [
    "Prepare eight short fictional messages: some legitimate, and some showing phishing, spear phishing, whaling, smishing, vishing transcripts, pretexting and business email compromise. Use made-up organizations and domains.",
    "In pairs, students highlight the warning signs in each message and label it with the attack type, or as legitimate.",
    "For each malicious message, pairs write the correct response: do not click, verify through a known channel, report.",
    "Project each message and have pairs reveal their labels; discuss any disagreements, especially between phishing and spear phishing or BEC and whaling.",
    "End by asking pairs to design one short awareness poster tagline that encourages reporting rather than blaming."
   ]
  },
  "discussion": [
   "What would make you hesitate to report that you clicked a suspicious link at work, and how could an organization remove that hesitation?",
   "Is a 0 percent click rate on phishing simulations a realistic goal? What else should be measured?",
   "How can leaders show by example that security rules apply to them too?"
  ],
  "exit": [
   [
    "Which group should receive awareness, and which should receive role-based training?",
    "Awareness is for everyone; role-based training is for people whose jobs need specific security skills, such as help-desk or developers."
   ],
   [
    "An attacker texts an employee pretending to be the bank and asks them to confirm a code. What is this attack called?",
    "Smishing, phishing by text message."
   ],
   [
    "Why is a rising phishing report rate a good sign?",
    "It means staff recognize and report threats, giving the security team earlier warning to respond."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference strip listing each social engineering term with a one-line clue (for example, voice equals vishing) to use during the activity.",
   "Extend: Ask students to design a three-month awareness plan for a small business, including two metrics they would track and how they would respond to results."
  ]
 },
 {
  "t": "Measuring the program: metrics, key risk indicators (KRIs), dashboards and reports",
  "objectives": [
   "Students will be able to define metric, KPI and KRI and classify examples of each.",
   "Students will be able to explain why KRIs need thresholds linked to risk tolerance.",
   "Students will be able to compare operational and executive dashboards.",
   "Students will be able to rewrite a raw technical number into a business-focused statement for leaders."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. List student answers and ask which numbers would actually change what they do."
   ],
   [
    12,
    "Teach",
    "Define metric, KPI and KRI using the car dashboard analogy. Show how a KRI gets green, amber and red thresholds tied to tolerance. Contrast operational and executive dashboards, and explain the so-what habit for reports."
   ],
   [
    18,
    "Activity",
    "Run the Build the Board Slide activity described in the activity section."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reflect on which measurements were most useful and why."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you could see only three numbers about your health, your car or your bank account each month, which three would you choose and why?",
  "activity": {
   "title": "Build the Board Slide",
   "materials": "Printed sets of about 15 metric cards (teacher-made, each with a measure and a value), sticky notes in green, yellow and red, whiteboard or chart paper.",
   "steps": [
    "Prepare cards such as: firewall blocked 1.2 million connections; training completion 92 percent; critical patches within 14 days 81 percent; admin accounts up from 8 to 15; mean time to respond 6 hours; overdue access reviews 12.",
    "In groups, students sort the cards into KPI, KRI or weak metric piles.",
    "For each KRI, groups propose a green, amber and red threshold and mark the current status with a colored sticky note.",
    "Groups then choose the five cards that belong on a one-page executive dashboard and write a single so-what sentence for each.",
    "Each group presents its slide in one minute; the class votes on which slide would best help a board make a decision."
   ]
  },
  "discussion": [
   "Why might a team keep reporting a metric that no longer leads to any decision?",
   "How could a metric be manipulated to look good while risk actually grows?",
   "What is the danger of putting too many metrics in front of senior leaders?"
  ],
  "exit": [
   [
    "Is mean time to respond a KPI or a KRI, and why?",
    "A KPI, because it measures past performance of the incident response process against a target."
   ],
   [
    "Give one example of a KRI and what its threshold should be tied to.",
    "For example, the number of unpatched internet-facing systems; its thresholds should be tied to risk tolerance."
   ],
   [
    "What should a report to executives include that a raw count does not?",
    "Context in business terms: how risk compares with appetite and tolerance, why it matters, what is being done and what decisions are needed."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column sorting mat labeled Looks back (KPI) and Looks ahead (KRI) with one worked example in each column.",
   "Extend: Ask students to design both an operational dashboard for SOC analysts and an executive dashboard for the board from the same data, explaining each design choice."
  ]
 },
 {
  "t": "Identification, authentication, authorization and accounting",
  "objectives": [
   "Students will be able to list identification, authentication, authorization and accounting in order and define each.",
   "Students will be able to classify actions in a scenario as one of the four steps.",
   "Students will be able to distinguish subjects from objects.",
   "Students will be able to explain how unique identities and protected, synchronized logs provide accountability."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Map student answers about entering a building onto four columns on the board without naming them yet, then reveal the four step names."
   ],
   [
    12,
    "Teach",
    "Define each step with an everyday and an IT example. Introduce subject and object. Explain why shared accounts break accountability, why logs must be protected and why clocks are synchronized. Show a short fictional log excerpt on the projector."
   ],
   [
    18,
    "Activity",
    "Run the Read the Log activity described in the activity section."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the log reading to accountability."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Describe every check you pass through from the street to your seat in this classroom or your desk at work. Which checks ask who you are, which ask you to prove it, and which decide where you can go?",
  "activity": {
   "title": "Read the Log",
   "materials": "Printed fictional log excerpts (one page per pair) showing logins, failed attempts, permission denied events and file accesses, including one shared account; highlighters in four colors.",
   "steps": [
    "Prepare a fictional log with about 20 lines, such as: 08:01 user mlopez login success from WS-12; 08:03 user mlopez read /finance/q3.xlsx denied; 08:05 user billing-desk login success; repeated failed logins for user admin followed by lockout.",
    "Pairs color-code each line by step: identification and authentication events, authorization decisions and the fact that each line is itself accounting.",
    "Pairs answer three questions on the sheet: which account shows a possible password-guessing attempt, which access was blocked by authorization, and which entries cannot be traced to one person.",
    "Pairs propose one fix for each problem they found, such as replacing the shared account with individual accounts.",
    "Debrief as a class, focusing on the shared account and why it defeats accountability."
   ]
  },
  "discussion": [
   "Why might an organization be tempted to use shared accounts, and what is a better alternative?",
   "What could an attacker do if they were able to edit or delete logs after an intrusion?",
   "Should an error message tell users whether their username or their password was wrong? Why or why not?"
  ],
  "exit": [
   [
    "A user types her username and scans her fingerprint. Which steps are these?",
    "Typing the username is identification; scanning the fingerprint is authentication."
   ],
   [
    "A user is logged in but gets access denied when opening a folder. Which step blocked her?",
    "Authorization."
   ],
   [
    "What two things together make accountability possible?",
    "Unique identities for every user and logging (accounting) of their actions, with logs protected from alteration."
   ]
  ],
  "differentiation": [
   "Support: Give students a card with the four steps, each paired with a hotel check-in example, to refer to while color-coding the log.",
   "Extend: Ask students to write a short logging policy for a small clinic covering what to log, where logs are stored, who can access them and how clocks are synchronized."
  ]
 },
 {
  "t": "Least privilege, need to know and separation of duties",
  "objectives": [
   "Students will be able to define least privilege, need to know and separation of duties and explain how they differ.",
   "Students will be able to identify which principle applies in short workplace scenarios.",
   "Students will be able to explain how collusion defeats separation of duties and how job rotation and mandatory vacations help detect it.",
   "Students will be able to redesign a process to enforce separation of duties."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about house keys. Use answers to introduce the idea of giving only the access needed."
   ],
   [
    12,
    "Teach",
    "Define each principle with a workplace example. Draw a three-step finance process on the board and show how splitting it enforces separation of duties. Introduce collusion, dual control, job rotation and mandatory vacations."
   ],
   [
    18,
    "Activity",
    "Run the Break the Process activity described in the activity section."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore trade-offs between security and convenience."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If a plumber is coming to fix your kitchen sink while you are at work, which keys and codes would you give them, and which would you keep back?",
  "activity": {
   "title": "Break the Process",
   "materials": "Printed process cards for three fictional workflows (supplier payments, code deployment, payroll changes), each showing one person doing every step; sticky notes; whiteboard.",
   "steps": [
    "In groups, students receive one workflow card that shows a single employee performing every step, for example creating a supplier, entering an invoice and approving payment.",
    "Groups first play the attacker for five minutes: they describe, in plain words, how one dishonest person could misuse the process. No technical attack steps are needed, only the business misuse.",
    "Groups then redesign the workflow on sticky notes, assigning steps to different roles and adding least privilege and need-to-know limits.",
    "Each group adds one control that would help catch collusion, such as job rotation, mandatory vacations or a periodic review.",
    "Groups present their redesigned process in two minutes and the class identifies which principle each change enforces."
   ]
  },
  "discussion": [
   "How would you apply separation of duties in a very small business with only three employees?",
   "When does least privilege become so strict that it hurts productivity, and how should an organization balance that?",
   "Why might long-serving, trusted employees resist mandatory vacation policies?"
  ],
  "exit": [
   [
    "A nurse can use the records system but should only open charts of patients she is treating. Which principle is this?",
    "Need to know."
   ],
   [
    "What is collusion and which principle does it defeat?",
    "Two or more people cooperating to bypass a control; it defeats separation of duties."
   ],
   [
    "Name two controls that help detect fraud hidden by one person or by collusion.",
    "Job rotation and mandatory vacations."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-column chart with simple definitions and one example of each principle for students to consult during the activity.",
   "Extend: Ask students to design a quarterly access review process for a finance department, including who reviews, what they check and what happens to inappropriate access."
  ]
 },
 {
  "t": "Identity lifecycle: provisioning, role changes, deprovisioning, privilege creep",
  "objectives": [
   "Students will be able to describe the joiner, mover and leaver stages and the actions required at each.",
   "Students will be able to explain how privilege creep develops and how access reviews detect it.",
   "Students will be able to determine the correct timing for disabling access in voluntary and involuntary departures.",
   "Students will be able to identify orphaned accounts and explain why non-human identities need lifecycle management."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a gym card or library card. Connect answers to joining, changing plans and leaving."
   ],
   [
    12,
    "Teach",
    "Draw the joiner, mover, leaver timeline on the board. At each stage list the key actions. Explain privilege creep with a person moving through three roles, then access reviews, the timing rule for terminations and disable-before-delete. Mention service accounts and orphaned accounts."
   ],
   [
    18,
    "Activity",
    "Run the Career Timeline activity described in the activity section."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore why organizations struggle with role changes."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When you changed classes, jobs or apartments, did any old keys, passwords or accounts keep working long after you left? What could someone have done with them?",
  "activity": {
   "title": "Career Timeline",
   "materials": "Printed career cards for a fictional employee showing five events over several years (hired, promoted, transferred, contractor added, terminated), printed access lists, sticky notes in two colors.",
   "steps": [
    "Give each group a career card for a fictional employee, for example: hired into customer support, moved to billing, temporary project access to finance reports, moved to sales, involuntarily terminated.",
    "At each event, groups use one sticky note color for access to add and another for access to remove, placing them on a timeline drawn on paper.",
    "Groups then compare with a printed access list showing what the employee actually had at termination, and circle every item that represents privilege creep.",
    "For the termination event, groups write the exact deprovisioning checklist, including timing, equipment recovery, shared passwords and file ownership.",
    "Groups share one surprising finding with the class, and the teacher records common gaps on the board."
   ]
  },
  "discussion": [
   "Why are managers quick to request new access but slow to request removal of old access?",
   "What are the risks if HR does not tell IT promptly about a role change or termination?",
   "Who should own a service account, and what should happen to it when that person leaves?"
  ],
  "exit": [
   [
    "An employee is being involuntarily terminated at 2 p.m. When should their access be disabled?",
    "At or before 2 p.m., the moment they are informed, not afterward."
   ],
   [
    "What usually causes privilege creep?",
    "Role changes where new access is added but old access is not removed."
   ],
   [
    "Why disable an account before deleting it?",
    "To block access immediately while keeping records and file ownership for investigations, audits and handover."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially filled timeline with the first two events completed as models before students do the rest.",
   "Extend: Ask students to design an automated joiner, mover, leaver workflow starting from the HR system, and identify two systems that automation might miss and how a review would catch them."
  ]
 },
 {
  "t": "Access models: DAC, MAC, RBAC and rule-based",
  "objectives": [
   "Students will be able to identify who makes the access decision in DAC, MAC, RBAC and rule-based access control.",
   "Students will be able to classify scenarios by access model, including systems that combine models.",
   "Students will be able to compare the flexibility and restrictiveness of each model and name one weakness of each.",
   "Students will be able to describe how ABAC differs by evaluating multiple attributes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Sort student answers into owner decides, labels decide, job decides and rule decides on the board."
   ],
   [
    12,
    "Teach",
    "Present each model with the who decides question, an everyday example and an IT example. Show a Windows Security tab screenshot or a Linux permission string for DAC, a classification label for MAC, a group list for RBAC and a short firewall rule table for rule-based. Briefly introduce ABAC."
   ],
   [
    18,
    "Activity",
    "Run the Who Decides card sort described in the activity section."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore trade-offs between flexibility and control."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of three things you can access: your phone photos, a building, and a website. In each case, who decides whether someone else can get in?",
  "activity": {
   "title": "Who Decides card sort",
   "materials": "Printed scenario cards (about 12 per group), four header cards (DAC, MAC, RBAC, rule-based) and one optional ABAC card, tape or sticky notes.",
   "steps": [
    "Prepare scenario cards such as: a user shares a spreadsheet from her cloud drive with a colleague; logins are blocked outside 7 a.m. to 7 p.m. for everyone; new pharmacists automatically get dispensing permissions; a Secret file cannot be opened by a Confidential-cleared user; a firewall denies inbound traffic on a port.",
    "In groups, students place each card under the model that best fits and write the who decides answer on a sticky note attached to the card.",
    "Add two combined scenarios that need more than one model, such as a file server with groups, owner shares and a network rule, and have groups split them into parts.",
    "Groups rotate to check another group's sort and flag any disagreements.",
    "Debrief as a class, focusing on role-based versus rule-based confusion and the MAC owner-cannot-override point."
   ]
  },
  "discussion": [
   "Why would most businesses not use MAC for everyday documents, even though it is the most restrictive?",
   "What problems might a company face if it keeps creating new roles for every special case?",
   "When might ABAC be worth its extra complexity?"
  ],
  "exit": [
   [
    "In which model can a file's owner choose who else can access it?",
    "Discretionary access control (DAC)."
   ],
   [
    "A rule blocks all logins between midnight and 5 a.m. for every user. Which model is this?",
    "Rule-based access control."
   ],
   [
    "Which model is most restrictive, and what does it use to make decisions?",
    "Mandatory access control, which compares subject clearances with object labels set centrally."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-line prompt card for each model (owner, labels, job, rule) to use while sorting scenarios.",
   "Extend: Ask students to design the access approach for a small clinic using at least two models, explaining which resources use which model and why."
  ]
 },
 {
  "t": "Privileged access management and separate admin accounts",
  "objectives": [
   "Students will be able to explain why privileged accounts are high-value targets and why admins need separate everyday and admin accounts.",
   "Students will be able to describe just-in-time access, password vaults, session recording and break-glass accounts.",
   "Students will be able to identify monitoring events that should trigger alerts for privileged activity.",
   "Students will be able to recommend PAM improvements for a described environment."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about master keys. Collect ideas on how to protect a key that opens everything."
   ],
   [
    12,
    "Teach",
    "Explain what makes an account privileged. Walk through separate accounts, minimizing standing privilege with just-in-time access, sudo and UAC, password vaults, session recording, approval workflows, break-glass accounts and monitoring. Stress service accounts."
   ],
   [
    18,
    "Activity",
    "Run the PAM Makeover activity described in the activity section."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore the convenience trade-offs administrators face."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A building has one key that opens every door, including the safe. Where should that key live, who should be able to use it, and how would you know if someone used it?",
  "activity": {
   "title": "PAM Makeover",
   "materials": "Printed one-page description of a fictional organization's admin practices (shared admin account, passwords in a spreadsheet, admins browsing with admin rights, an old service account with broad rights), sticky notes, whiteboard.",
   "steps": [
    "Hand each group the fictional organization description and give them five minutes to list every privileged access problem they can find on sticky notes.",
    "Groups cluster their notes on the whiteboard under four headings: account separation, standing privilege, credential management and monitoring.",
    "For each problem, groups write a specific fix, such as separate admin accounts with MFA, just-in-time elevation, a vault with rotation, or alerts for new admin accounts.",
    "Groups rank their top three fixes by risk reduction and justify the ranking in one sentence each.",
    "Each group presents its top fix; the class compares rankings and the teacher highlights why account separation and MFA usually come first."
   ]
  },
  "discussion": [
   "Administrators often say separate accounts slow them down. How could an organization make the secure way also the easy way?",
   "Why is the use of a break-glass account always worth investigating, even when it was legitimate?",
   "What could happen if a service account with broad rights is never reviewed?"
  ],
  "exit": [
   [
    "Why should an administrator not read email while logged in with an admin account?",
    "A malicious attachment or link would run with full privileges, letting an attacker take over systems."
   ],
   [
    "What is just-in-time access?",
    "Granting elevated rights only for a specific task and time window, then removing them, to reduce standing privilege."
   ],
   [
    "Name one event involving privileged accounts that should trigger an alert.",
    "For example, creation of a new admin account, a user added to a privileged group, an admin login at an unusual time or any use of a break-glass account."
   ]
  ],
  "differentiation": [
   "Support: Provide a checklist of PAM controls with short definitions so students can match each problem in the scenario to a control.",
   "Extend: Ask students to write a one-page break-glass procedure covering where the credentials are stored, who may use them, what happens after use and how the password is reset."
  ]
 },
 {
  "t": "Single sign-on and federation basics",
  "objectives": [
   "Students will be able to explain how an identity provider and service providers work together to deliver single sign-on.",
   "Students will be able to compare SSO within one organization with federation across organizations.",
   "Students will be able to identify the purpose of SAML, OAuth, OpenID Connect and Kerberos at a recognition level.",
   "Students will be able to evaluate the security benefits and single-point-of-failure risks of SSO and recommend mitigations."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to count how many separate passwords they used in the last week. Collect a few numbers on the board and ask what problems that creates for users and for IT."
   ],
   [
    12,
    "Teach",
    "Draw a user, an identity provider and three applications. Walk through the redirect, authentication with MFA and token flow. Then add a second organization's portal and show federation as a trust line. Introduce SAML, OAuth, OIDC and Kerberos with one sentence each."
   ],
   [
    15,
    "Activity",
    "Run the role-play 'The Trusted Gate' described below, with students acting as user, IdP and service providers, then repeating it as a federation."
   ],
   [
    8,
    "Discuss",
    "Lead a discussion on the risks the role-play exposed: stolen tokens, IdP outage, offboarding. Ask which controls fix each risk."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "If you could sign in once in the morning and reach every app you use at school or work, what would get better, and what new danger would you be creating?",
  "activity": {
   "title": "The Trusted Gate role-play",
   "materials": "Index cards labeled User, IdP, Email App, Files App, Payroll App and Partner Portal; a marker; sticky notes to act as signed tokens; whiteboard.",
   "steps": [
    "Assign roles. The IdP sits at a desk with a 'stamp' (the teacher's initials) and asks the User for a password and a second factor (for example, a code written on a card).",
    "The User walks to each app. Each app refuses entry and sends the User to the IdP. The IdP issues a stamped sticky note token; apps accept only stamped tokens.",
    "Simulate offboarding: the IdP stops stamping for that User. Ask the class how many apps the User can still reach (none once tokens expire).",
    "Now add the Partner Portal from another organization. It agrees to trust the IdP's stamp but decides itself which 'rooms' the User may enter. Point out that it never sees the password.",
    "Finally, simulate an IdP outage (the IdP student leaves the desk) and a stolen token (another student grabs a sticky note). Have groups write one mitigation for each on the board."
   ]
  },
  "discussion": [
   "Is concentrating authentication in one identity provider a net gain or a net risk for a small organization, and what would change your answer?",
   "Why might a partner organization prefer federation over issuing its own accounts to outside users?",
   "Where in your own online life have you seen an OAuth consent screen, and did you read what access you were granting?"
  ],
  "exit": [
   [
    "What role does the identity provider play in SSO?",
    "It authenticates the user and issues signed assertions or tokens that service providers trust."
   ],
   [
    "In federation, who authenticates the user and who authorizes access?",
    "The home organization authenticates the user; the partner (service provider) applies its own authorization."
   ],
   [
    "Name one SSO risk and one mitigation.",
    "Compromised SSO credential, mitigated by strong MFA and session timeouts; or IdP outage, mitigated by high availability and break-glass accounts."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page flow diagram with blanks for IdP, service provider and token, and let them fill it in during the role-play instead of tracking it mentally.",
   "Extend: Ask fast finishers to write a short comparison of SAML and OpenID Connect for a manager choosing how to connect a new SaaS tool, focusing on purpose rather than technical detail."
  ]
 },
 {
  "t": "Physical access controls: badges, access control vestibules, guards, CCTV, tailgating",
  "objectives": [
   "Students will be able to describe layered physical security from perimeter to sensitive interior rooms.",
   "Students will be able to distinguish tailgating from piggybacking and select controls that defeat each.",
   "Students will be able to classify badges, vestibules, guards, CCTV, locks and alarms as preventive, detective or deterrent.",
   "Students will be able to apply the life-safety priority by choosing fail-safe or fail-secure designs for a given door."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: when did you last hold a door for a stranger? Tally hands and ask whether that was kind, risky or both."
   ],
   [
    12,
    "Teach",
    "Sketch a building from fence to data center on the board, adding controls layer by layer. Explain badges and logs, tailgating versus piggybacking, vestibules, guards, CCTV and fail-safe versus fail-secure."
   ],
   [
    15,
    "Activity",
    "Groups complete the 'Walk the Floor Plan' activity, marking weaknesses and controls on a printed floor plan."
   ],
   [
    8,
    "Discuss",
    "Groups present one weakness and fix. Push on control types and on any design that would trap people in a fire."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions in writing."
   ]
  ],
  "warmup": "A friendly person carrying a heavy box asks you to hold a secure door. What do you do, and what would you want your company to tell you to do?",
  "activity": {
   "title": "Walk the Floor Plan",
   "materials": "A simple printed floor plan the teacher draws (parking lot, main entrance, side door, lobby, offices, server room, loading dock, fire exits), colored markers, sticky notes.",
   "steps": [
    "Give each group of three or four the floor plan and a list of incidents: a person in a courier vest followed an employee in through the side door; a visitor wandered into the server room; the loading dock door was propped open.",
    "Groups mark on the plan where each incident happened and which layer failed.",
    "Groups place sticky notes for controls (badge reader, badge plus PIN, vestibule, turnstile, guard, camera, alarm, bollards, visitor badges) and label each preventive, detective or deterrent.",
    "Each group marks every emergency exit and writes fail-safe or fail-secure for each door they lock, justifying the choice with life safety.",
    "Groups swap plans and look for one gap the other group missed."
   ]
  },
  "discussion": [
   "Why does a culture of challenging unbadged strangers matter as much as the hardware at the door?",
   "When might a guard be worth the cost over additional cameras, and when not?",
   "How do you balance a friendly workplace with a rule against holding secure doors?"
  ],
  "exit": [
   [
    "Which control best prevents tailgating into a server room?",
    "An access control vestibule or turnstile that admits one authenticated person at a time."
   ],
   [
    "Is CCTV preventive, detective or deterrent?",
    "Mainly detective and deterrent; it cannot physically stop entry."
   ],
   [
    "Should a fire exit be fail-safe or fail-secure, and why?",
    "Fail-safe, because human life safety always outranks protecting assets."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-column card sort (preventive, detective, deterrent) with each control on a printed card so students can sort physically before working on the floor plan.",
   "Extend: Ask fast finishers to write a short visitor procedure covering sign-in, temporary badges, escorts and badge return, and explain which risk each step reduces."
  ]
 },
 {
  "t": "Periodic access reviews",
  "objectives": [
   "Students will be able to explain why access drifts over time and why reviews are a detective control.",
   "Students will be able to identify privilege creep, orphaned and dormant accounts, excessive privileges and separation of duties conflicts in an access report.",
   "Students will be able to justify why data owners or managers, not IT administrators, approve access.",
   "Students will be able to recommend ways to prevent rubber-stamping and set review frequency by risk."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to list everyone who has ever had a key or code to their home, and how many of those people still need it."
   ],
   [
    10,
    "Teach",
    "Explain access drift, the review process (report, owner decision, IT action, evidence), frequency by risk, the problems reviews find and rubber-stamping."
   ],
   [
    18,
    "Activity",
    "Pairs complete the 'Red Pen Review' using a printed access report."
   ],
   [
    7,
    "Discuss",
    "Pairs share findings; tally how many issues each pair caught and discuss what a rubber-stamping reviewer would have missed."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of every person who has had a key or door code to your home in the last five years. How many still need it, and how would you find out?",
  "activity": {
   "title": "Red Pen Review",
   "materials": "A printed fictional access report for a payments system (about 15 rows with name, current job title, department, entitlement, date granted, last used), red pens, a short 'org chart' handout listing current roles and leavers.",
   "steps": [
    "The teacher prepares rows that include a mover with old approval rights, a leaver still active, an account unused for ten months, a generic shared account, a vendor account with no owner, a user who can both create and approve payments, and several correct entries.",
    "Pairs act as the finance manager and mark each row approve, modify or revoke with a one-line reason.",
    "Pairs label each problem: privilege creep, orphaned, dormant, excessive privilege, separation of duties conflict or shared account.",
    "Pairs decide how often this system should be reviewed and who must sign off, and write it at the bottom.",
    "Reveal the answer key and have pairs count misses; discuss which misses would most hurt in an audit."
   ]
  },
  "discussion": [
   "Why is it risky for the same administrator who grants access to also confirm it is correct?",
   "What would make a busy manager take a review seriously instead of clicking approve on everything?",
   "How could a pattern found in reviews point to a problem in the joiner, mover or leaver process?"
  ],
  "exit": [
   [
    "Is an access review preventive or detective?",
    "Detective, because it finds inappropriate access that already exists."
   ],
   [
    "Who should approve whether a user keeps access to a dataset?",
    "The data owner or the user's manager."
   ],
   [
    "Name one cause of rubber-stamping and one fix.",
    "Long, cryptic lists; fix with business-friendly descriptions, highlighting risky items or role-based access to shorten lists."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a glossary card defining each problem type with a one-line example to match against the report rows.",
   "Extend: Ask fast finishers to design a review schedule for five systems of different sensitivity and explain the frequency and reviewer chosen for each."
  ]
 },
 {
  "t": "OSI and TCP/IP models, IP addressing, common ports (22, 25, 53, 80, 443, 3389)",
  "objectives": [
   "Students will be able to name the seven OSI layers in order and map them to the four TCP/IP layers.",
   "Students will be able to place switches, routers, MAC addresses, IP addresses and TCP or UDP ports at the correct layer.",
   "Students will be able to classify an IPv4 address as private or public and explain the role of NAT.",
   "Students will be able to identify the services on ports 22, 25, 53, 80, 443 and 3389 and state the security concern for each."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the firewall log line from the lesson on the projector and ask students to circle anything they recognize."
   ],
   [
    12,
    "Teach",
    "Build the OSI stack on the board using the mnemonic, then draw the TCP/IP columns beside it. Explain TCP versus UDP, private ranges and NAT, and the six exam ports with their security notes."
   ],
   [
    15,
    "Activity",
    "Run the 'Layer and Port Card Sort' in small groups."
   ],
   [
    8,
    "Discuss",
    "Review the trickiest cards, then decode two more log lines as a class."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Here is a log line: ALLOW TCP 203.0.113.8:51522 -> 10.20.4.15:3389. What can you tell about who is talking to whom, and should it worry you?",
  "activity": {
   "title": "Layer and Port Card Sort",
   "materials": "Printed cards the teacher makes (switch, router, MAC address, IP address, TCP, UDP, cable, Wi-Fi signal, encryption, HTTP, DNS, SSH, RDP, SMTP, 192.168.5.5, 8.8.4.4, 172.31.0.9, port 23, port 3389), a whiteboard with seven OSI rows drawn, sticky notes.",
   "steps": [
    "Groups place each device, protocol or concept card on the correct OSI layer row and write the matching TCP/IP layer on a sticky note beside it.",
    "Groups sort the IP address cards into private and public piles and state which private range each belongs to.",
    "For each service card, groups write its port number and one sentence on its main security concern (clear text, exposure to password guessing, spam relay and so on).",
    "Groups rotate to another table and check the other team's placements, marking disagreements with a question mark.",
    "The teacher resolves disagreements and highlights the layer 2 versus layer 3 confusion."
   ]
  },
  "discussion": [
   "Why is a reference model like OSI still useful if real networks use the TCP/IP model?",
   "If NAT hides private addresses, why do organizations still need firewalls?",
   "Which of the six exam ports would you never expose directly to the internet, and what would you do instead?"
  ],
  "exit": [
   [
    "At which OSI layer do switches and MAC addresses operate?",
    "Layer 2, Data Link."
   ],
   [
    "Is 192.168.10.4 public or private?",
    "Private, within 192.168.0.0/16."
   ],
   [
    "What runs on port 3389 and how should it be protected?",
    "RDP; reach it only through a VPN or gateway with MFA rather than exposing it to the internet."
   ]
  ],
  "differentiation": [
   "Support: Provide a pre-filled OSI chart with the layer names and one example each, so students focus on placing new cards rather than recalling the order.",
   "Extend: Have fast finishers write three firewall log lines of their own using private and public addresses and well-known ports, then trade with a partner to decode and assess the risk."
  ]
 },
 {
  "t": "Network threats: DoS/DDoS, man-in-the-middle, malware, spoofing, side-channel",
  "objectives": [
   "Students will be able to describe DoS/DDoS, man-in-the-middle, malware types, spoofing and side-channel attacks at a recognition level.",
   "Students will be able to map each threat to the CIA element it primarily affects.",
   "Students will be able to distinguish virus, worm, Trojan, ransomware, spyware and rootkit by behavior.",
   "Students will be able to select an appropriate defense for a described network threat scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to describe the last suspicious thing they saw online (a warning, odd email, slow site) and guess what might have caused it."
   ],
   [
    12,
    "Teach",
    "Present each threat category with a one-line definition, the CIA element and two defenses. Build a table on the board as you go."
   ],
   [
    15,
    "Activity",
    "Groups play 'Symptom Detective' with scenario cards."
   ],
   [
    8,
    "Discuss",
    "Review the cards groups disagreed on, especially MITM versus spoofing and virus versus worm."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A website you use every day suddenly shows a certificate warning while you are on hotel Wi-Fi. Do you click through, and what might be going on?",
  "activity": {
   "title": "Symptom Detective",
   "materials": "About 12 printed scenario cards the teacher writes (for example: thousands of sources flood a web server; a browser certificate warning on café Wi-Fi; files encrypted with a payment note; an email from the CEO's address asking for gift cards; a free game that installs a keylogger; malware spreading with no user clicks; a timing measurement used to infer a key), a whiteboard table with columns Threat, CIA element, Defense.",
   "steps": [
    "Give each group a stack of scenario cards face down.",
    "Groups turn over one card at a time, name the threat type, the CIA element mainly affected and one defense, and write it in the table.",
    "Groups that finish swap three cards with another group and check each other's answers.",
    "The teacher reveals the answer key and asks groups to explain any differences.",
    "Each group writes one new scenario card for another group to solve."
   ]
  },
  "discussion": [
   "Why might an attacker launch a DDoS attack at the same time as a quieter attack elsewhere?",
   "Why do users click through certificate warnings, and how could an organization change that habit?",
   "Which of these threats would be hardest for a small business to defend against alone, and why?"
  ],
  "exit": [
   [
    "Which CIA element does a DDoS attack target?",
    "Availability."
   ],
   [
    "What is the key difference between a worm and a virus?",
    "A worm spreads on its own without user action; a virus needs a user or program to run an infected file."
   ],
   [
    "Name the main defense against on-path attacks.",
    "Encryption with authentication, such as TLS with valid certificates or a VPN."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference strip listing each threat with its CIA element so they can focus on recognizing scenarios before memorizing the mapping.",
   "Extend: Ask fast finishers to explain why spoofing often enables other attacks, using IP spoofing in reflection floods and email spoofing in phishing as examples."
  ]
 },
 {
  "t": "Defenses: firewalls, IDS/IPS, antivirus, VPN",
  "objectives": [
   "Students will be able to explain the function and placement of packet-filtering, stateful, next-generation and host-based firewalls and the role of implicit deny.",
   "Students will be able to compare IDS and IPS and signature-based versus anomaly-based detection.",
   "Students will be able to distinguish false positives from false negatives and explain which is more dangerous.",
   "Students will be able to describe what a VPN protects and identify its limits regarding compromised endpoints."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: if you had to protect a house with only one device, which would you choose and what would it miss?"
   ],
   [
    12,
    "Teach",
    "Draw a network: internet, firewall, IPS, internal switch, laptops with antivirus, and a remote user with a VPN tunnel. Explain each tool's job, what it cannot do, and the detection and error types."
   ],
   [
    15,
    "Activity",
    "Groups complete 'Read the Rules', working through a printed firewall rule table and alert list."
   ],
   [
    8,
    "Discuss",
    "Debrief answers and connect each gap to defense in depth."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your home has a locked front door. List three ways a problem could still get inside without breaking the lock.",
  "activity": {
   "title": "Read the Rules",
   "materials": "Printed handout with a six-line firewall rule table (allow 443 to web server, allow 25 to mail relay, allow established return traffic, allow 22 from admin subnet, allow 3389 from any, implicit deny) and five alert descriptions; pens; projector for the answer key.",
   "steps": [
    "Groups trace four sample connections through the rule table, top to bottom, and decide allow or deny for each.",
    "Groups identify the riskiest rule (3389 from any) and rewrite it safely.",
    "For each of the five alerts, groups decide whether it is a true positive, false positive or a hint of a false negative, and whether an IDS or IPS would act on it.",
    "Groups list one thing antivirus would catch that the firewall would not, and one thing a VPN would not prevent.",
    "The teacher projects the answer key and groups score themselves."
   ]
  },
  "discussion": [
   "Why might an organization run an IPS in detect-only mode at first?",
   "Is it better to tolerate more false positives or risk more false negatives, and who should decide?",
   "What should an organization require before allowing a device to connect over its VPN?"
  ],
  "exit": [
   [
    "Which device sits inline and can block traffic, an IDS or an IPS?",
    "An IPS."
   ],
   [
    "What is a false negative?",
    "A real attack that the detection system fails to detect."
   ],
   [
    "What does a VPN protect, and what does it not protect?",
    "It protects data in transit across an untrusted network; it does not protect against a compromised endpoint."
   ]
  ],
  "differentiation": [
   "Support: Provide a matching worksheet pairing each tool with its one-line job and one limitation before students tackle the rule table.",
   "Extend: Ask fast finishers to explain why a firewall may not see an attack inside encrypted traffic and what options an organization has to address that."
  ]
 },
 {
  "t": "Network design: segmentation, VLANs, DMZ, micro-segmentation, defense in depth",
  "objectives": [
   "Students will be able to explain how segmentation limits lateral movement and the spread of malware.",
   "Students will be able to describe how VLANs separate traffic and why inter-VLAN traffic passes through a layer 3 device.",
   "Students will be able to design a simple network placing public-facing servers in a DMZ and sensitive devices in isolated segments.",
   "Students will be able to compare segmentation with micro-segmentation and relate both to defense in depth."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: why do ships have watertight compartments, and what might the network equivalent be?"
   ],
   [
    10,
    "Teach",
    "Draw a flat network and show an infection spreading. Redraw it with segments, VLANs, a DMZ and firewalls, and explain micro-segmentation, NAC and defense in depth."
   ],
   [
    20,
    "Activity",
    "Groups whiteboard a redesign in 'Redesign the Flat Network'."
   ],
   [
    5,
    "Discuss",
    "Groups present designs; class tests each with an infected guest device scenario."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If a virus lands on one computer in a building where every computer can talk to every other, how far can it go? What would you change?",
  "activity": {
   "title": "Redesign the Flat Network",
   "materials": "Whiteboard or large paper per group, markers, a printed scenario card describing a small clinic (public website, email relay, staff PCs, medical devices, payment terminal, cameras, guest Wi-Fi, a database server).",
   "steps": [
    "Groups draw the clinic's current flat network with every device connected to one switch.",
    "Groups redraw it with zones: DMZ, staff, servers, clinical devices, payment, IoT and guest. They assign a VLAN number to each internal zone.",
    "Groups add firewalls and write two or three allow rules between zones, ending with implicit deny.",
    "The teacher announces an incident (a staff PC is infected, or the web server is compromised) and groups trace where it can and cannot spread.",
    "Groups list at least four layers of defense in depth in their design, including one non-technical layer."
   ]
  },
  "discussion": [
   "What is the cost of segmentation in complexity, and how would you convince a manager it is worth it?",
   "Why are IoT devices often given their own segment?",
   "How does micro-segmentation support the idea of not trusting internal traffic by default?"
  ],
  "exit": [
   [
    "Where should a public web server be placed?",
    "In the DMZ, or screened subnet."
   ],
   [
    "What must traffic between two VLANs pass through?",
    "A router or layer 3 device, where rules can be enforced."
   ],
   [
    "What is the main security benefit of segmentation?",
    "Limiting lateral movement and the spread of attacks between zones."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed diagram with zones already drawn so students only place devices and write rules.",
   "Extend: Ask fast finishers to describe how they would apply micro-segmentation to the clinic's virtual servers and how NAC would handle an unknown laptop plugged into a wall port."
  ]
 },
 {
  "t": "Zero trust: never trust, always verify",
  "objectives": [
   "Students will be able to explain why the perimeter (castle-and-moat) model fails in modern environments.",
   "Students will be able to state and apply the zero trust principles of verify explicitly, least privilege and assume breach.",
   "Students will be able to describe the roles of the policy decision point, policy enforcement point and device posture in an access decision.",
   "Students will be able to compare ZTNA with a traditional remote-access VPN."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students whether a building that checks badges only at the front door is secure, and what happens once someone is inside."
   ],
   [
    12,
    "Teach",
    "Contrast castle-and-moat with zero trust on the board. Explain the three principles, the PDP and PEP, device posture, continuous evaluation and ZTNA versus VPN."
   ],
   [
    15,
    "Activity",
    "Run 'Policy Decision Point' role-play with request cards."
   ],
   [
    8,
    "Discuss",
    "Debrief decisions that split the class and connect them to least privilege and segmentation."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If an attacker steals one employee's password, how much of your organization should that password be able to reach? Why?",
  "activity": {
   "title": "Policy Decision Point role-play",
   "materials": "Printed request cards the teacher writes (each lists user, role, device type, device patch status, location, time and requested application), a printed policy sheet with five simple rules, a whiteboard to tally decisions.",
   "steps": [
    "Split the class into small groups, each acting as a policy decision point with the same policy sheet.",
    "A volunteer acting as the policy enforcement point reads a request card aloud; each group decides allow, deny or allow with step-up MFA and gives a reason.",
    "Include tricky cards: a correct password from an unmanaged tablet, an office desktop missing patches, a valid user requesting an app outside their role, and a session that suddenly appears from another country.",
    "Tally decisions on the board and discuss disagreements, linking each to verify explicitly, least privilege or assume breach.",
    "Groups rewrite one policy rule to be clearer or safer and explain the change."
   ]
  },
  "discussion": [
   "Why might a zero trust rollout start with identity and MFA rather than with network changes?",
   "What frustrations might users feel under zero trust, and how could an organization reduce them without weakening security?",
   "How does assuming breach change how you design monitoring and segmentation?"
  ],
  "exit": [
   [
    "What does network location contribute to trust in a zero trust model?",
    "Nothing by itself; every request is verified regardless of location."
   ],
   [
    "Name the three core zero trust principles.",
    "Verify explicitly, least privilege and assume breach."
   ],
   [
    "How does ZTNA limit lateral movement compared with a traditional VPN?",
    "It connects the user only to specific approved applications rather than placing them on the whole internal network."
   ]
  ],
  "differentiation": [
   "Support: Give students a decision flowchart (identity verified? device healthy? role allows app?) to use during the role-play.",
   "Extend: Ask fast finishers to outline a three-phase zero trust adoption plan for a small company, naming what each phase adds and what risk it reduces."
  ]
 },
 {
  "t": "Cloud characteristics (on-demand, elasticity, measured service) and service models (IaaS, PaaS, SaaS)",
  "objectives": [
   "Students will be able to define on-demand self-service, broad network access, resource pooling, rapid elasticity and measured service.",
   "Students will be able to classify a described cloud offering as IaaS, PaaS or SaaS.",
   "Students will be able to compare how responsibility for the operating system, application and data shifts across the three service models.",
   "Students will be able to explain security risks arising from cloud characteristics, such as misconfiguration, sprawl and hijacked accounts."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to list cloud services they used today and guess whether they manage any part of them."
   ],
   [
    12,
    "Teach",
    "Explain the NIST characteristics with everyday examples, then draw a responsibility stack (data, application, runtime, OS, virtualization, hardware, facility) with three columns for IaaS, PaaS and SaaS and shade who manages each layer."
   ],
   [
    15,
    "Activity",
    "Groups complete 'Who Patches What?' with scenario cards."
   ],
   [
    8,
    "Discuss",
    "Review the Harborview hook scenario as a class: which characteristic was abused and who was responsible."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Name three cloud services you used today. For each one, who do you think installs updates, and who decides who can see your data?",
  "activity": {
   "title": "Who Patches What?",
   "materials": "Printed scenario cards (for example: a company rents VMs and installs Linux; a team deploys code to a managed runtime; staff use a web-based office suite; a shop scales servers for a sale; a monthly bill shows usage by hour), a whiteboard responsibility grid, sticky notes.",
   "steps": [
    "Groups read each service card and label it IaaS, PaaS or SaaS.",
    "For each, groups place sticky notes on the grid showing whether the customer or provider handles OS patching, application code, data and user access.",
    "Groups read each characteristic card and name the NIST characteristic it shows.",
    "Groups write one security risk linked to a characteristic (for example, elasticity leading to unmanaged resources) and one control that addresses it.",
    "Groups compare grids with a neighbor and resolve differences, noting that data and access are always the customer's."
   ]
  },
  "discussion": [
   "Why might an organization choose IaaS despite its greater responsibility?",
   "How could the convenience of on-demand self-service become a security problem in a large organization?",
   "Why is customer misconfiguration such a common cause of cloud breaches?"
  ],
  "exit": [
   [
    "A team deploys its code to a managed runtime and does not manage servers. Which model is this?",
    "PaaS."
   ],
   [
    "Which characteristic allows paying only for what you use?",
    "Measured service."
   ],
   [
    "In which service model does the customer patch the operating system?",
    "IaaS."
   ]
  ],
  "differentiation": [
   "Support: Provide the pizza analogy (kitchen, take-and-bake, delivery) as a printed card linked to IaaS, PaaS and SaaS to anchor the classification.",
   "Extend: Ask fast finishers to write a short cloud hygiene checklist for a small business covering access keys, MFA, budget alerts and inventory, linking each item to a cloud characteristic."
  ]
 },
 {
  "t": "Deployment models: public, private, community, hybrid",
  "objectives": [
   "Students will be able to define public, private, community and hybrid cloud deployment models.",
   "Students will be able to classify a scenario by deployment model based on who shares and controls the infrastructure.",
   "Students will be able to compare the cost, control and security trade-offs of each model.",
   "Students will be able to distinguish hybrid cloud from multi-cloud and explain key hybrid security challenges."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to compare living in an apartment, a house and a co-op. What do you control in each, and what do you share?"
   ],
   [
    12,
    "Teach",
    "Present the four models with the housing analogy, emphasizing that private means exclusive use rather than location. Add multi-cloud and cloud bursting, and list the questions that stay constant: who controls, who accesses, where data lives."
   ],
   [
    15,
    "Activity",
    "Groups work through 'Advise the Board' with client profile cards."
   ],
   [
    8,
    "Discuss",
    "Groups present recommendations; class challenges any that ignore governance or data location."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Apartment, private house or co-op: which gives you the most control, which is cheapest, and which needs the most agreement with neighbors?",
  "activity": {
   "title": "Advise the Board",
   "materials": "Printed client profile cards the teacher writes (a startup with spiky traffic; a defense contractor with strict control needs; five hospitals with shared compliance rules; a retailer with on-premises systems needing holiday capacity; a company using two public providers), whiteboard, markers.",
   "steps": [
    "Each group receives two client profiles.",
    "For each profile, the group chooses a deployment model and writes two reasons tied to cost, control, compliance or flexibility.",
    "The group lists one security risk of their chosen model and one control to address it.",
    "Groups label any profile that combines models as hybrid and identify the multi-cloud profile, explaining the difference.",
    "Groups present one recommendation in under a minute while the class votes agree or challenge."
   ]
  },
  "discussion": [
   "Why might a highly regulated organization still choose public cloud for some workloads?",
   "What could go wrong in a community cloud if members disagree on security priorities?",
   "Why does a hybrid environment often need a single identity provider and central monitoring?"
  ],
  "exit": [
   [
    "Several agencies with the same compliance needs share cloud infrastructure. Which model?",
    "Community cloud."
   ],
   [
    "Can a private cloud be hosted by a third party?",
    "Yes; private means dedicated to one organization, not located on its premises."
   ],
   [
    "How does hybrid cloud differ from multi-cloud?",
    "Hybrid combines different deployment models; multi-cloud uses more than one public provider."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-question decision aid (Is it shared? If so, with whom?) to help students classify each profile.",
   "Extend: Ask fast finishers to draft a short list of governance agreements five organizations would need before launching a community cloud."
  ]
 },
 {
  "t": "Shared responsibility model and on-premises data center considerations",
  "objectives": [
   "Students will be able to explain the difference between security of the cloud and security in the cloud.",
   "Students will be able to assign common security tasks to the provider or the customer for IaaS, PaaS and SaaS.",
   "Students will be able to describe the power, HVAC, fire suppression and physical security needs of an on-premises data center.",
   "Students will be able to justify why the customer always remains responsible for data and access."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up prompt and take three or four quick answers. Write students' guesses about who is responsible on the board without correcting them yet."
   ],
   [
    12,
    "Teach",
    "Draw a stack on the board: facility, hardware, network, hypervisor, operating system, runtime, application, data, identities. Shade who owns each layer for on-premises, IaaS, PaaS and SaaS. Stress that data and access stay with the customer in every column, and that physical security stays with the provider in every cloud column."
   ],
   [
    5,
    "Teach",
    "Walk through on-premises needs: utility power, UPS versus generator, HVAC with temperature and humidity, fire detection and suppression suited to electronics, layered physical security and secure disposal."
   ],
   [
    15,
    "Activity",
    "Run the card sort described in the activity. Circulate and ask each group to defend one placement aloud."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the activity to real decisions about cloud versus on-premises."
   ],
   [
    3,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your school moves its grading system to an online service. A teacher accidentally shares a gradebook link with the whole internet. Whose fault is it: the service company or the school? Why?",
  "activity": {
   "title": "Who owns it? Responsibility card sort",
   "materials": "Printed task cards (about 16 per group), a four-column grid drawn on the whiteboard or on chart paper labeled On-premises, IaaS, PaaS, SaaS, sticky notes or tape.",
   "steps": [
    "Before class, print task cards such as: patch guest operating system, replace failed hard drive, enable MFA for users, configure virtual firewall rules, maintain generators, classify customer data, patch the runtime platform, review who has admin access, control physical badge access, fix a bug in the company's own app code.",
    "In groups of three or four, students place each card in each column under Provider or Customer. A card may appear in more than one column with different owners, so give each group duplicate sets or sticky notes.",
    "Groups compare their grid with one neighboring group and mark disagreements with a question mark.",
    "The teacher reveals the answer key, focusing on the cards that caused disagreement, and highlights that data classification and access review are Customer in every column.",
    "Each group writes one sentence starting 'The thing that surprised us most was...' and shares it."
   ]
  },
  "discussion": [
   "Why might a hospital or a government agency choose to keep some systems on-premises even though cloud is cheaper to start?",
   "If a SaaS provider offers MFA but leaves it turned off by default, who is responsible when an account is taken over, and what should the customer have done?",
   "What should an organization ask a provider before signing a contract so that it can leave later without losing or exposing data?"
  ],
  "exit": [
   [
    "In PaaS, who is responsible for patching the operating system?",
    "The provider; the customer handles its application code, configuration, data and access."
   ],
   [
    "Name two responsibilities that stay with the customer in every cloud service model.",
    "Its data (including classification) and identity and access management; also compliance accountability."
   ],
   [
    "Why does an on-premises data center need both a UPS and a generator?",
    "The UPS supplies instant battery power for short interruptions and bridges the gap while the generator starts; the generator covers long outages."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially completed grid with the On-premises and SaaS columns filled in so they only need to reason about IaaS and PaaS, and pair them with a peer who can explain the apartment rental analogy.",
   "Extend: Ask fast finishers to draft a one-page responsibility matrix for a fictional company that uses one IaaS server, one PaaS web app and one SaaS email service, naming who patches, monitors, backs up and manages access for each."
  ]
 },
 {
  "t": "Data security: classification, labeling, retention and secure destruction",
  "objectives": [
   "Students will be able to explain why data is classified and who decides the classification.",
   "Students will be able to describe how labeling, retention policies and legal holds support data handling.",
   "Students will be able to select an appropriate sanitization method (clear, purge, destroy) for a given media type and classification.",
   "Students will be able to trace a piece of data through its lifecycle from creation to destruction."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question. Collect answers on the board, then ask whether a deleted file is really gone and let students debate briefly."
   ],
   [
    15,
    "Teach",
    "Draw the data lifecycle as a circle: create, store, use, share, archive, destroy. Add classification levels and the data owner's role, then labeling and DLP, retention and legal holds, and finally clear, purge and destroy with the SSD versus degaussing distinction."
   ],
   [
    15,
    "Activity",
    "Run the Closet Cleanout activity. Groups decide how each item should be handled and justify it."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore trade-offs between keeping and deleting data."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions individually on paper."
   ]
  ],
  "warmup": "If you delete a photo from your phone and empty the recently deleted folder, could someone still recover it? What would it take to be sure it is gone?",
  "activity": {
   "title": "Closet Cleanout: decide, label, keep or destroy",
   "materials": "Printed item cards (one set per group), a whiteboard grid with columns Classification, Keep or Destroy, Method, and sticky notes.",
   "steps": [
    "Prepare about ten item cards describing things found in a fictional office closet, for example: printed payroll reports from eight years ago, an unlabeled backup tape, five laptops with encrypted SSDs, a printed lunch menu, client files tied to a case with an active legal hold, a USB stick from a departed employee.",
    "Give each group the firm's simple retention rules on a slip of paper, such as payroll records kept seven years and client files kept five years after case closure unless on legal hold.",
    "Groups assign a classification to each item, decide keep or destroy, and pick a method (cross-cut shred, clear, cryptographic erase, degauss, physical destruction) with a one-line reason.",
    "Each group posts two of its decisions on the whiteboard grid with sticky notes. The class checks for errors such as degaussing an SSD or destroying legally held files.",
    "The teacher closes by asking who in a real company would have to sign off on the classification decisions, reinforcing the data owner role."
   ]
  },
  "discussion": [
   "What are the risks of keeping data forever, and what are the risks of deleting it too soon?",
   "Why might two companies classify the same type of document differently?",
   "If a shredding vendor gives you a certificate of destruction, how much should you trust it, and what else could you check?"
  ],
  "exit": [
   [
    "Who decides a dataset's classification?",
    "The data owner."
   ],
   [
    "Name an effective way to sanitize an encrypted SSD.",
    "Cryptographic erase (destroying the encryption keys) or physical destruction such as shredding."
   ],
   [
    "What overrides a retention schedule and requires data to be preserved?",
    "A legal hold."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card listing each sanitization method with the media it works on, and let students use it during the activity. Reduce the item set to six cards.",
   "Extend: Ask fast finishers to write a short retention schedule for three data types at a fictional school (student grades, visitor logs, cafeteria menus), including retention period, storage location and disposal method, with a reason for each."
  ]
 },
 {
  "t": "Encryption (symmetric vs asymmetric) and hashing",
  "objectives": [
   "Students will be able to distinguish symmetric encryption, asymmetric encryption and hashing by purpose and properties.",
   "Students will be able to identify which key is used to encrypt for confidentiality and which is used to create a digital signature.",
   "Students will be able to explain why secure protocols combine asymmetric and symmetric encryption.",
   "Students will be able to verify file integrity by comparing hash values."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers. Point out any answers that mix up keeping a secret and proving something was not changed."
   ],
   [
    15,
    "Teach",
    "Use a three-column board: symmetric, asymmetric, hashing. Fill in key count, speed, purpose and examples (AES, RSA and ECC, SHA-256). Draw the mailbox analogy for public and private keys, then sketch the HTTPS hybrid handshake in simple boxes. Show the n(n-1)/2 key count for 4 and 10 people."
   ],
   [
    15,
    "Activity",
    "Run the Hash Detective and Key Choice activity in pairs on laptops and paper."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reinforce why each tool exists."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "You need to send a friend a secret note through a classmate you do not fully trust. How would you make sure the classmate cannot read it, and how would your friend know you wrote it and nobody changed it?",
  "activity": {
   "title": "Hash Detective and Key Choice",
   "materials": "Student laptops with a browser and a built-in terminal or PowerShell, a projector, printed scenario cards (eight per pair).",
   "steps": [
    "On the projector, show the teacher creating a short text file and running `sha256sum` (Linux or macOS) or `Get-FileHash` (Windows PowerShell). Students do the same with a file containing one sentence and record the hash.",
    "Students change one character, recompute the hash and compare. Pairs write one sentence describing what they observed and why it matters for integrity.",
    "Hand out scenario cards such as: encrypt a laptop disk, prove an email came from the CFO, send a file only the auditor can open, store passwords, check a downloaded installer, exchange a session key with a website. For each, pairs choose symmetric, asymmetric (and which key) or hashing.",
    "Pairs swap cards with another pair and check each other's answers, marking any they disagree on.",
    "The teacher reviews disputed cards with the whole class, emphasizing recipient's public key for confidentiality and sender's private key for signatures."
   ]
  },
  "discussion": [
   "If hashing cannot be reversed, how can a website check your password at login?",
   "Why is it important that encryption algorithms are public, and what does that tell you about where the real secret lies?",
   "What could go wrong if a browser trusted any certificate without checking who issued it?"
  ],
  "exit": [
   [
    "Which type of encryption is fastest and used for bulk data?",
    "Symmetric encryption, such as AES."
   ],
   [
    "Which key does a sender use to create a digital signature?",
    "The sender's own private key; others verify it with the sender's public key."
   ],
   [
    "What security goal does hashing support?",
    "Integrity: detecting whether data has been changed."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page cheat sheet with the mailbox analogy and a table of which key does what, and let them work the scenario cards with the sheet open. Start with only four cards.",
   "Extend: Ask fast finishers to explain in writing why adding a unique salt to each password defeats precomputed hash tables, and why MD5 collisions undermine its use for verifying software."
  ]
 },
 {
  "t": "Logging, monitoring and SIEM; event triage",
  "objectives": [
   "Students will be able to identify what a useful security log entry contains and why logs must be centralized and protected.",
   "Students will be able to explain how a SIEM normalizes and correlates events from multiple sources.",
   "Students will be able to distinguish an event, an alert and an incident.",
   "Students will be able to triage a set of alerts by validity and severity using context."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers. Steer the conversation toward the idea that we need records to know what happened."
   ],
   [
    12,
    "Teach",
    "Show a sample log line on the projector and label who, what, when, where and result. Explain NTP and why time matters, log protection, then draw a SIEM as a funnel: collect, normalize, store, correlate, alert. Define event, alert and incident with a quick example of each."
   ],
   [
    18,
    "Activity",
    "Run the Night Shift Triage activity. Groups sort alert cards and justify their decisions."
   ],
   [
    5,
    "Discuss",
    "Groups share how they ranked the top alerts and the class discusses differences."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Someone ate the last slice of cake from the staff room fridge overnight. What records or clues would you look for to figure out who did it, and what would make those clues unreliable?",
  "activity": {
   "title": "Night Shift Triage",
   "materials": "Printed alert cards (about ten per group) with short log excerpts, a context sheet listing critical systems, privileged accounts, traveling employees and approved scan windows, and a whiteboard with columns False positive, Benign true positive, Incident.",
   "steps": [
    "Give each group the context sheet and the alert cards. Example cards: weekly scanner port scan at the approved time, one failed login for a receptionist, admin login to payroll at 3 a.m. from an unknown external address, antivirus quarantining a known test file, a new mail forwarding rule to an outside address on a finance account, a firewall block of inbound traffic from the internet.",
    "Groups classify each card as false positive, benign true positive or incident, using the context sheet to look for corroboration.",
    "For alerts classified as incidents, groups assign a severity of high, medium or low and write one next action, such as disable the account or escalate per the incident response plan.",
    "Groups pick their top two alerts and post them on the whiteboard with a one-line reason.",
    "The teacher reveals a suggested ranking, pointing out how asset criticality, privilege and correlation drove the decisions, and asks which noisy rule the team would tune first."
   ]
  },
  "discussion": [
   "Why might an attacker who gains administrator access try to change system clocks or clear logs?",
   "How could too many alerts make an organization less secure rather than more secure?",
   "Which logs would you want first if you suspected a stolen password, and why?"
  ],
  "exit": [
   [
    "Name three things a useful log entry should record.",
    "Any three of: who (account), what (action), when (timestamp), where (source and destination), and the result."
   ],
   [
    "What does correlation in a SIEM do?",
    "Links related events from different sources to reveal patterns, such as failed logins followed by an unusual success and data download."
   ],
   [
    "An alert fires for an approved weekly vulnerability scan. How should it be classified?",
    "As a benign true positive; the activity is real but authorized, and the rule may be tuned."
   ]
  ],
  "differentiation": [
   "Support: Give students a decision flowchart (Is it authorized? Is the system critical? Is the account privileged? Is there corroboration?) to use while sorting cards, and reduce the set to six alerts.",
   "Extend: Ask fast finishers to write a plain-language correlation rule for detecting a likely compromised account using three different log sources, and to describe one way it could produce false positives."
  ]
 },
 {
  "t": "System hardening, configuration management, patching and change management",
  "objectives": [
   "Students will be able to list common hardening actions that reduce a system's attack surface.",
   "Students will be able to explain how baselines and drift detection keep systems in a known state.",
   "Students will be able to sequence the patch management cycle from identification to verification.",
   "Students will be able to complete a change request that includes risks, testing and a rollback plan, and explain how emergency changes differ."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and collect answers about what went wrong. List them on the board under four blank headings you will name later."
   ],
   [
    12,
    "Teach",
    "Name the four headings: hardening, configuration management, patching, change management. Sort the warm-up answers under them. Explain attack surface, baselines and drift, the patch cycle (identify, assess, test, deploy, verify) and the change request with CAB review, standard changes and emergency changes."
   ],
   [
    18,
    "Activity",
    "Run the Change Request Workshop. Groups write and review change requests."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to examine trade-offs between speed and control."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A school's projector stopped working Monday because someone changed its settings Friday to fix a different problem and did not tell anyone. What process could have prevented this?",
  "activity": {
   "title": "Change Request Workshop",
   "materials": "Printed blank change request forms (fields: what, why, systems affected, risk, test plan, schedule, rollback plan, approver), printed scenario cards, whiteboard.",
   "steps": [
    "Give each group one scenario card, such as: apply a critical patch to an internet-facing web server that is under active attack, disable an unused file-sharing service on all office laptops, add a new user to an existing group, upgrade the database server's operating system.",
    "Groups decide whether their scenario is a standard, normal or emergency change and fill out the change request form.",
    "Groups swap forms with another group, which acts as the CAB. The CAB marks anything missing, especially weak test or rollback plans, and decides approve, reject or request more information.",
    "Forms return to the original group to revise based on CAB feedback.",
    "The teacher debriefs: which scenario was the emergency change, what still had to happen after it was implemented, and how the hardening and baseline would be updated afterward."
   ]
  },
  "discussion": [
   "Why might a well-meaning administrator resist change management, and how can an organization make it less painful?",
   "What risks does an organization accept if it never tests patches before deploying them? What risks does it accept if it tests too slowly?",
   "How does configuration management help during incident recovery?"
  ],
  "exit": [
   [
    "What is the attack surface, and how does hardening affect it?",
    "All the points where an attacker could get in or extract data; hardening reduces it by removing unneeded services, accounts and software and applying secure settings."
   ],
   [
    "Put these patch steps in order: deploy, test, verify, identify, assess.",
    "Identify, assess, test, deploy, verify."
   ],
   [
    "What must still happen after an emergency change is implemented?",
    "It must be documented and reviewed, typically by the CAB, after the fact."
   ]
  ],
  "differentiation": [
   "Support: Provide a completed sample change request for a simple scenario that students can model their own on, and give the group a standard change to start with.",
   "Extend: Ask fast finishers to draft a short hardening baseline for a classroom laptop (at least six settings) and describe how they would detect drift from it each week."
  ]
 },
 {
  "t": "Vulnerability management and security testing basics",
  "objectives": [
   "Students will be able to describe the vulnerability management cycle from inventory to verification.",
   "Students will be able to prioritize vulnerabilities using CVSS together with asset value, exposure and active exploitation.",
   "Students will be able to distinguish a vulnerability scan from a penetration test and credentialed from non-credentialed scans.",
   "Students will be able to identify what authorization and rules of engagement a penetration test requires."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect a few answers, then ask what they would fix first if they could only fix one thing."
   ],
   [
    12,
    "Teach",
    "Draw the cycle on the board: inventory, identify, prioritize, remediate or accept, verify. Explain CVE and CVSS, why severity is not the same as priority, credentialed versus non-credentialed scans, false positives, and scan versus penetration test with rules of engagement and black, white and gray box."
   ],
   [
    18,
    "Activity",
    "Run the Patch Triage Board activity in groups."
   ],
   [
    5,
    "Discuss",
    "Groups compare their top three and the class discusses why rankings differ."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "A home inspector gives you a list of 40 problems with a house you just bought. You have money to fix five this month. How do you decide which five?",
  "activity": {
   "title": "Patch Triage Board",
   "materials": "Printed finding cards (about twelve per group) each showing a fictional system, its CVSS score, whether it is internet facing, the data it holds, and whether exploitation is reported; a whiteboard with columns Fix this week, Fix this month, Accept or compensate.",
   "steps": [
    "Groups receive the finding cards and a capacity limit, for example only four fixes this week.",
    "Groups sort each card into a column, writing a one-line justification on a sticky note that mentions at least two factors beyond the CVSS score.",
    "The teacher announces a twist: one finding is confirmed as a false positive, and one system turns out to be missing from the asset inventory. Groups adjust and discuss what each twist means for the process.",
    "Groups write a short rules-of-engagement outline for an imaginary penetration test of their highest-risk system: scope, timing, allowed methods, what is off limits and who signs the authorization.",
    "Each group posts its Fix this week column, and the teacher highlights how exposure and active exploitation changed rankings."
   ]
  },
  "discussion": [
   "Why might an organization choose to formally accept a vulnerability instead of fixing it, and who should be allowed to make that decision?",
   "What could go wrong if a penetration tester's scope is vague?",
   "Why is an accurate asset inventory the first step of vulnerability management?"
  ],
  "exit": [
   [
    "List the five steps of the vulnerability management cycle in order.",
    "Inventory assets, identify vulnerabilities, prioritize, remediate or accept, verify and report."
   ],
   [
    "Name two factors besides CVSS that affect remediation priority.",
    "Any two of: asset value or criticality, internet exposure, active exploitation, sensitivity of the data."
   ],
   [
    "What two things must be agreed before a penetration test starts?",
    "Written authorization and rules of engagement defining scope, timing and methods."
   ]
  ],
  "differentiation": [
   "Support: Give students a simple scoring sheet that adds points for high CVSS, internet facing, sensitive data and active exploitation so they can rank cards mechanically before discussing exceptions.",
   "Extend: Ask fast finishers to explain when a black box, white box or gray box penetration test would give the most value for a fictional company, and to justify the trade-off between realism and coverage."
  ]
 },
 {
  "t": "Incident response lifecycle: preparation, detection and analysis, containment, eradication, recovery, lessons learned",
  "objectives": [
   "Students will be able to list the six incident response phases in the correct order.",
   "Students will be able to classify response actions into the correct phase.",
   "Students will be able to explain why isolation is preferred over powering off and why chain of custody matters.",
   "Students will be able to describe how lessons learned feeds back into preparation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list the steps students suggest on the board in the order they give them."
   ],
   [
    10,
    "Teach",
    "Rewrite the board list as the six phases in order with the mnemonic. For each phase, give two example actions. Stress contain before eradicate, isolate rather than power off, chain of custody, and that lessons learned loops back to preparation."
   ],
   [
    20,
    "Activity",
    "Run the tabletop exercise described in the activity, with injects revealed every few minutes."
   ],
   [
    5,
    "Discuss",
    "Debrief the tabletop using the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "The fire alarm goes off in the school. List, in order, everything that should happen from the moment it sounds until classes resume the next day.",
  "activity": {
   "title": "Tabletop: Thursday afternoon ransomware",
   "materials": "Printed role cards (IR lead, IT administrator, communications lead, legal advisor, business owner, note taker), printed inject cards the teacher reveals in sequence, whiteboard for the incident timeline.",
   "steps": [
    "Form groups of five or six and hand out role cards. The note taker records a timeline on paper with times and decisions.",
    "Inject 1: a staff member reports a ransom note and encrypted files on a shared drive. Groups decide what to verify and who to notify, and name the phase they are in.",
    "Inject 2: two more offices report the same symptoms, and someone proposes powering off all servers. Groups choose a containment approach and justify it, considering evidence and business impact.",
    "Inject 3: analysis shows the attacker entered through an unpatched remote access service with a stolen password. Groups list eradication and recovery steps, including which backups to trust.",
    "Inject 4: the incident is closed. Groups hold a five-minute lessons-learned meeting and write three improvements, each labeled with the phase of the next cycle it improves.",
    "Each group reads its improvements aloud, and the teacher maps the decisions onto the six phases on the board."
   ]
  },
  "discussion": [
   "Which decision in the tabletop felt hardest, and what information would have made it easier?",
   "Why do many organizations skip lessons learned, and how could a team make sure it happens?",
   "Who outside the IT team needed to be involved, and why should their contact details be ready during preparation?"
  ],
  "exit": [
   [
    "List the six incident response phases in order.",
    "Preparation, detection and analysis, containment, eradication, recovery, lessons learned."
   ],
   [
    "An analyst disables a compromised account and blocks the attacker's IP address. Which phase is this?",
    "Containment."
   ],
   [
    "Why is isolating a system usually better than powering it off?",
    "Powering off destroys volatile memory evidence; isolation stops spread while preserving evidence."
   ]
  ],
  "differentiation": [
   "Support: Give students a printed phase strip with the six phases and two example actions each to reference during the tabletop, and assign them the note taker role so they track decisions against the strip.",
   "Extend: Ask fast finishers to write a one-page playbook for a lost or stolen company laptop, covering actions in each phase and who must be notified."
  ]
 },
 {
  "t": "Business continuity and disaster recovery: BIA, RTO, RPO, backups and alternate sites",
  "objectives": [
   "Students will be able to distinguish a business continuity plan from a disaster recovery plan.",
   "Students will be able to define MTD, RTO and RPO and derive them from a business impact analysis scenario.",
   "Students will be able to compare full, incremental and differential backups by backup speed and restore requirements.",
   "Students will be able to select a hot, warm or cold site that meets a given RTO and justify the cost trade-off."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and have students call out answers. Highlight the difference between how fast you can get going again and how much work you lose."
   ],
   [
    12,
    "Teach",
    "Define BCP versus DRP. Draw a timeline on the board with the disaster in the middle: to the left, mark the last backup and label the gap RPO; to the right, mark service restored and label the gap RTO, with MTD further right. Then draw a week of backups to compare full, incremental and differential restores, and finish with hot, warm and cold sites and the 3-2-1 rule."
   ],
   [
    18,
    "Activity",
    "Run the Recovery Planner activity in groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare groups' choices and costs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Your laptop dies the night before a big assignment is due. What two things determine how bad this is for you?",
  "activity": {
   "title": "Recovery Planner",
   "materials": "Printed scenario sheets for a fictional business with three functions (online orders, payroll, marketing website), a printed price list showing relative costs of backup options and site types (in made-up budget points, not real prices), whiteboard, markers.",
   "steps": [
    "Groups read the scenario, which describes the impact of each function being down for 1 hour, 1 day and 1 week, and decide on an MTD for each function.",
    "Groups set an RTO and RPO for each function, making sure each RTO is shorter than its MTD.",
    "Using a fixed budget of points, groups choose a backup approach (full, incremental, differential, replication) and an alternate site type for each function, justifying how it meets the RTO and RPO.",
    "The teacher announces a disaster on a Thursday afternoon. Groups state which backups they would restore and how much data each function loses.",
    "Groups present one function's plan in under a minute, and the class checks whether the RTO and RPO were actually met."
   ]
  },
  "discussion": [
   "Why might a business accept a long RTO for one system and demand a very short one for another?",
   "How does ransomware change the way organizations should store backups?",
   "Why are full interruption tests rare, even though they are the most realistic?"
  ],
  "exit": [
   [
    "A hospital decides its patient records system must be back online within two hours of an outage. Which objective is this?",
    "The recovery time objective (RTO)."
   ],
   [
    "Which backup type is fastest to create but needs the most pieces to restore?",
    "Incremental backup: the last full plus every incremental since."
   ],
   [
    "Which alternate site type is cheapest, and what is its main drawback?",
    "A cold site; it can take weeks to become operational because equipment and data must be brought in and set up."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled timeline diagram showing RPO, RTO and MTD around a disaster, plus a backup restore table, and let students fill in values for one function only.",
   "Extend: Ask fast finishers to calculate the restore sets for a schedule of a Sunday full with daily differentials versus daily incrementals for a failure on Friday, and to argue which schedule better fits an RTO of two hours."
  ]
 },
 {
  "t": "Best-practice policies (AUP, BYOD, password, privacy) and security awareness",
  "objectives": [
   "Students will be able to describe the typical contents and purpose of an AUP, BYOD policy, password policy and privacy policy.",
   "Students will be able to apply modern password guidance to evaluate a proposed password rule.",
   "Students will be able to explain how a BYOD policy balances company data protection with employee privacy.",
   "Students will be able to explain why security awareness and periodic review are needed for policies to work."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect examples of rules students have agreed to without reading. Ask what would happen if they broke one."
   ],
   [
    12,
    "Teach",
    "Walk through the four policies with a two-column board: what it covers and a key exam point (AUP signed before access and warns of monitoring; BYOD with MDM, containers and remote wipe of work data; password length, breached-password checks, MFA, no arbitrary forced changes; privacy notice versus internal policy). Close with awareness and annual review."
   ],
   [
    18,
    "Activity",
    "Run the Policy Match and Fix activity in groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore balance between security and usability."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Think of the last time you clicked 'I agree' on terms of service. What did you agree to, and would it matter if you had broken those rules?",
  "activity": {
   "title": "Policy Match and Fix",
   "materials": "Printed situation cards (about twelve per group), a printed weak sample password policy, whiteboard with four columns labeled AUP, BYOD, Password, Privacy.",
   "steps": [
    "Groups sort situation cards into the policy that governs each, for example: an employee installs a game on a work laptop, a lost personal phone with work email, a customer asks what data the company holds about her, a user wants to reuse his streaming-service password, a manager emails a spreadsheet of customer addresses to a personal account.",
    "For each card, groups write the action the policy would require on a sticky note and place it in the correct column.",
    "Groups receive the weak sample password policy (short minimum length, complex character rules, forced change every 30 days, no MFA) and rewrite it in five lines using modern guidance.",
    "Groups exchange rewritten policies and check them against a teacher-provided checklist: length, breached-password check, change on compromise only, password manager, MFA, no sharing, default passwords changed.",
    "The teacher closes by asking how the company would make sure every employee actually knows these rules, leading into awareness training and annual review."
   ]
  },
  "discussion": [
   "Where should the line be between an organization's right to protect its data on a personal phone and an employee's right to privacy?",
   "Why might forcing frequent password changes make security worse rather than better?",
   "What makes security awareness training effective rather than something people click through?"
  ],
  "exit": [
   [
    "When should a user accept the AUP?",
    "Before being granted access to organizational systems."
   ],
   [
    "Name two modern password practices.",
    "Any two of: long passphrases, checking against compromised-password lists, MFA, password managers, change only when compromise is suspected, no reuse."
   ],
   [
    "How can a BYOD policy protect company data without erasing personal data on a lost phone?",
    "By using MDM or a managed work container so IT can remotely wipe only work apps and data."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page summary card for each policy with three key points, and reduce the sort to six situation cards before moving to the password rewrite.",
   "Extend: Ask fast finishers to draft a short BYOD policy for a fictional small business that lists five requirements and two explicit statements of what the company will not access on personal devices."
  ]
 }
]);
