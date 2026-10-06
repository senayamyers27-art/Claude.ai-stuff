/* Teacher edition for CompTIA Security+ (SY0-701): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("security-plus", [
 {
  "t": "Control categories: technical, managerial, operational, physical",
  "objectives": [
   "Students will be able to define the four SY0-701 control categories: technical, managerial, operational and physical.",
   "Students will be able to classify a given security control into the correct category and justify the choice by who or what implements it.",
   "Students will be able to distinguish a control category from a control type and reject answer choices that mix the two lists.",
   "Students will be able to identify which category is missing from a scenario and propose a control to fill the gap."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up prompt. Give students two minutes to list controls individually, then collect a few answers on the whiteboard without labeling them yet. Say: 'Hold on to this list; by the end of class you will sort it like an auditor.'"
   ],
   [
    12,
    "Teach",
    "Introduce category as 'how is it implemented and by whom' and contrast it with type ('what does it do'). Walk through technical, managerial, operational and physical with two examples each. Use the 'policy decides, people do' test for managerial versus operational, and stress that badge readers and cameras are physical. Finish with the stolen-laptop walk-through showing one risk covered by all four categories."
   ],
   [
    18,
    "Activity",
    "Run the control-sorting card activity in groups of three or four. Circulate and ask groups to defend any card they hesitated on, especially training, badge readers and policies. In the final five minutes, give each group a scenario card and ask which category is missing."
   ],
   [
    6,
    "Discuss",
    "Bring the class together. Ask each group to share one card they argued about and how they resolved it. Use the discussion questions to connect categories to defense in depth and audit findings."
   ],
   [
    4,
    "Exit ticket",
    "Hand out the three exit questions on a half sheet. Collect them at the door and review them before the next class to spot students who still mix categories and types."
   ]
  ],
  "warmup": "Think about the building you are in right now. List as many things as you can that protect people, equipment or information here. Include anything: rules, people, locks, software.",
  "activity": {
   "title": "Control sort: four categories, one risk",
   "materials": "Printed cards (about 24 per group), each naming one control such as 'firewall rule', 'acceptable use policy', 'guard checks badges', 'bollards', 'awareness training session', 'risk assessment', 'CCTV camera', 'full disk encryption', 'backup testing procedure'; four category header cards per group; three scenario cards; whiteboard for the class tally.",
   "steps": [
    "Give each group the four category header cards (technical, managerial, operational, physical) and the shuffled control cards.",
    "Groups place each control card under one category, writing a short reason on a sticky note for any card they disagree about.",
    "Slip two decoy cards into each deck that read 'preventive' and 'detective'. Groups must recognize these are control types, not categories, and set them aside.",
    "Each group receives a scenario card describing an organization that has controls in only three categories. They identify the missing category and write one specific control to fill it.",
    "Groups report their scenario answers, and the teacher records the missing category and proposed control on the whiteboard."
   ]
  },
  "discussion": [
   "Why might an organization with excellent technical controls still fail an audit?",
   "Where is the line between a managerial and an operational control in your own school or workplace?",
   "Can a single control ever reasonably fit two categories? How should you choose on an exam?"
  ],
  "exit": [
   [
    "A rule says all visitors must be escorted, and the receptionist walks each visitor to their meeting. Which category is each?",
    "The rule is managerial; the receptionist escorting visitors is operational."
   ],
   [
    "A camera watches the server room door. Technical or physical? Why?",
    "Physical, because its main purpose is to monitor a physical space, even though it is electronic."
   ],
   [
    "A company has firewalls, guards and locked doors, but no risk assessment or security policy. Which category is missing?",
    "Managerial."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page reference card with the four categories, a question for each ('Is it software? Is it a document? Is it a person doing a task? Is it something you can touch?') and two worked examples, and let them sort a smaller deck of 10 cards first.",
   "Extend: Ask fast finishers to pick one risk, such as ransomware or a lost USB drive, and design a layered set of controls with at least one control in each category, then label each control's type as well."
  ]
 },
 {
  "t": "Control types: preventive, deterrent, detective, corrective, compensating, directive",
  "objectives": [
   "Students will be able to define the six SY0-701 control types: preventive, deterrent, detective, corrective, compensating and directive.",
   "Students will be able to classify a control by type based on the purpose described in a scenario.",
   "Students will be able to compare deterrent with preventive controls and directive with deterrent controls.",
   "Students will be able to recommend a compensating control when a preferred control cannot be implemented."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about a house. Take four or five answers and write them on the board in a single unlabeled column."
   ],
   [
    13,
    "Teach",
    "Present the six types with clue words for each. Contrast fence (preventive) with warning sign (deterrent), IDS (detective) with restore from backup (corrective), and policy (directive) with a sign threatening prosecution (deterrent). Explain compensating controls using the unpatched legacy device example and stress that compensating replaces a control that cannot be used."
   ],
   [
    17,
    "Activity",
    "Run the incident timeline activity. Groups map controls along a ransomware timeline and label each with its type, then solve a compensating-control challenge card."
   ],
   [
    6,
    "Discuss",
    "Ask groups to explain any control they gave two types, such as visible cameras or guards. Use the discussion questions to reinforce reading the purpose in the question."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "You want to protect your home from burglars. Name one thing that stops a burglar, one that discourages them, one that tells you a burglary happened, and one that helps you recover afterward.",
  "activity": {
   "title": "Incident timeline: label every control",
   "materials": "Whiteboard or large paper divided into three columns labeled Before, During and After; sticky notes; printed control cards (email filter, login banner, acceptable use policy, EDR alert, restore from backup, firewall isolation of legacy server, visible camera, IPS terminating a session); two compensating-control challenge cards.",
   "steps": [
    "Describe a ransomware scenario at a fictional company and draw the Before, During and After columns on the board.",
    "Groups place each control card in the correct column and write its type on a sticky note attached to the card.",
    "For any control with more than one possible type, the group writes the sentence from the scenario that decides the best fit.",
    "Each group draws a challenge card describing a control that cannot be implemented (for example, MFA cannot be enabled on a legacy app) and proposes a compensating control plus how it would be documented.",
    "Groups present their compensating control; the class votes on whether it addresses the same risk to a similar degree."
   ]
  },
  "discussion": [
   "Why does a deterrent control fail against a determined attacker while a preventive control does not?",
   "When should an organization accept a compensating control instead of insisting on the preferred one, and who should sign off?",
   "Can you think of a control that is both detective and corrective? How would an exam question signal which one it wants?"
  ],
  "exit": [
   [
    "A login banner warns that unauthorized access will be prosecuted. What type of control is it?",
    "Deterrent."
   ],
   [
    "An IDS alerts on suspicious traffic but does not block it. What type is it, and what device could prevent the traffic instead?",
    "Detective; an inline IPS could prevent it."
   ],
   [
    "A legacy server cannot be patched, so it is moved to an isolated network segment with strict firewall rules. What type of control is the isolation?",
    "Compensating."
   ]
  ],
  "differentiation": [
   "Support: Provide a clue-word chart (stop/block = preventive, warn/discourage = deterrent, alert/log = detective, restore/fix = corrective, cannot/alternative = compensating, policy/must = directive) and have students highlight the clue word in each scenario before answering.",
   "Extend: Challenge fast finishers to take five controls from the previous lesson's category sort and label each with both a category and a type, then write one exam-style question that deliberately offers a distractor from the wrong list."
  ]
 },
 {
  "t": "CIA triad, AAA, non-repudiation",
  "objectives": [
   "Students will be able to explain confidentiality, integrity and availability and map an incident to the goal it harms.",
   "Students will be able to sequence identification, authentication, authorization and accounting in a login scenario.",
   "Students will be able to explain why digital signatures provide non-repudiation while shared keys and logs do not.",
   "Students will be able to match common controls such as encryption, hashing and redundancy to the CIA goal they support."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up headlines on the projector. Students decide individually which one is 'worst' and why, then share with a partner."
   ],
   [
    14,
    "Teach",
    "Define each CIA goal with a control family and an attack that harms it, then introduce DAD as the opposite. Walk through the jsmith login, pausing at each AAA step. Finish with non-repudiation, using the disputed wire transfer example to show why a private-key signature beats a shared password or log entry."
   ],
   [
    16,
    "Activity",
    "Run the incident triage cards activity in pairs, followed by the AAA line-up."
   ],
   [
    6,
    "Discuss",
    "Use the discussion questions to explore trade-offs between goals and the limits of logs as evidence."
   ],
   [
    4,
    "Exit ticket",
    "Students complete the three exit questions on index cards."
   ]
  ],
  "warmup": "Here are three fictional headlines: 'Clinic's patient records posted online', 'Payroll amounts changed overnight', 'Online store down all weekend'. Which is worst for the business, and what exactly was lost in each case?",
  "activity": {
   "title": "Incident triage and the AAA line-up",
   "materials": "Printed incident cards (12 short scenarios such as a DDoS, a leaked spreadsheet, altered prices, a denied folder access, a disputed approval); four large printed signs reading Identification, Authentication, Authorization and Accounting; whiteboard.",
   "steps": [
    "Pairs draw incident cards and label each with the CIA goal harmed and one control that would have helped.",
    "Pairs flag any card where the issue is proving who did something; these go to a separate 'non-repudiation' pile with a note on what evidence would be needed.",
    "Four volunteers hold the AAA signs at the front. The teacher reads login events aloud (for example 'typed username', 'approved push notification', 'opened finance share but not HR share', 'file server logged the access'), and the class tells each event to stand behind the correct sign.",
    "The class reviews the non-repudiation pile together and decides whether a log, a shared key or a digital signature would hold up if the user denied the action."
   ]
  },
  "discussion": [
   "A hospital chooses availability over strict access control for bedside systems. When is that the right trade-off, and what risks does it accept?",
   "Why might a user still deny an action even when the logs show their username?",
   "Which of the CIA goals matters most for a public website, and which for a medical records database?"
  ],
  "exit": [
   [
    "A ransomware attack stops staff from opening shared files. Which CIA goal is harmed?",
    "Availability."
   ],
   [
    "A user logs in successfully but cannot open the HR folder. Which AAA function blocked them?",
    "Authorization."
   ],
   [
    "Why does a digital signature provide non-repudiation when a shared secret key does not?",
    "Only the signer holds the private key, while a shared key is held by both parties, so either could have created the message."
   ]
  ],
  "differentiation": [
   "Support: Give students a three-column table (Goal, What is harmed, Typical control) partly filled in, plus a four-box flow diagram for identification, authentication, authorization and accounting to complete during the line-up.",
   "Extend: Ask fast finishers to write a short scenario in which encryption protects confidentiality but tampering still goes undetected, then explain which additional control would detect the change."
  ]
 },
 {
  "t": "Zero trust: control plane vs data plane, policy engine, PEP",
  "objectives": [
   "Students will be able to explain why zero trust removes implicit trust based on network location.",
   "Students will be able to identify the policy engine, policy administrator and policy enforcement point and place each in the control plane or data plane.",
   "Students will be able to trace an access request through a zero trust architecture, including continuous re-evaluation and revocation.",
   "Students will be able to describe adaptive identity and threat scope reduction with an example."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the school or office building. Collect answers and highlight where trust is granted once and never checked again."
   ],
   [
    13,
    "Teach",
    "Contrast perimeter security with zero trust using a VPN example. Draw the two planes on the whiteboard, place the policy engine and administrator in the control plane and the PEP in the data plane. Walk through the contractor request, including the mid-session revocation when EDR reports malware."
   ],
   [
    17,
    "Activity",
    "Run the zero trust role-play with students acting as each component and the teacher feeding risk signals."
   ],
   [
    6,
    "Discuss",
    "Use the discussion questions to compare zero trust with the perimeter model and address the 'product you can buy' misconception."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions and hand them in."
   ]
  ],
  "warmup": "Once you get past the front entrance of this building, which rooms can you walk into without anyone checking again? What could go wrong with that?",
  "activity": {
   "title": "Role-play: the request that gets revoked",
   "materials": "Printed role cards (User, Device, Policy Engine, Policy Administrator, PEP, Resource); printed signal cards (MFA passed, device patched, unusual location, malware detected, firewall disabled, role allows read-only); masking tape or chalk to mark a control plane zone and a data plane zone; whiteboard.",
   "steps": [
    "Mark two zones on the floor or board labeled Control Plane and Data Plane. Assign students to the six roles and ask them to stand in the correct zone; correct any misplacement and explain why.",
    "The User requests access to the Resource. The PEP passes the request to the Policy Engine, which reads the current signal cards and announces grant, deny or revoke with a reason.",
    "The Policy Administrator tells the PEP to open or close the path, and the PEP physically steps aside or blocks the User.",
    "Midway through, the teacher hands the Policy Engine a new signal card such as 'malware detected'. The chain repeats and the session is revoked.",
    "Rotate roles and repeat with a new set of signals, asking observers to call out which component performed each action."
   ]
  },
  "discussion": [
   "Why does a stolen VPN session cause more damage in a perimeter model than in a zero trust model?",
   "If a vendor says its product 'is zero trust', what questions would you ask?",
   "How small should an implicit trust zone be, and what are the costs of making it very small?"
  ],
  "exit": [
   [
    "Which zero trust component decides whether to grant, deny or revoke access?",
    "The policy engine, in the control plane."
   ],
   [
    "In which plane does the policy enforcement point live, and what does it do?",
    "The data plane; it allows, monitors and terminates connections based on control plane instructions."
   ],
   [
    "A user's laptop becomes non-compliant in the middle of a session. What should a zero trust system do?",
    "Re-evaluate the session and revoke or restrict access, with the administrator instructing the PEP to cut or limit the connection."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram with blank boxes for the policy engine, policy administrator and PEP, and a word bank of their functions ('decides', 'sets up or tears down the path', 'sits in the traffic path'), to complete before the role-play.",
   "Extend: Ask fast finishers to sketch how the company in the lesson could replace its VPN with access proxies, listing which existing systems (identity provider, endpoint management, EDR) feed signals to the policy engine."
  ]
 },
 {
  "t": "Physical security and deception tech (honeypots, honeynets, honeytokens)",
  "objectives": [
   "Students will be able to describe layered physical controls from perimeter to rack, including bollards, vestibules, lighting, cameras and sensors.",
   "Students will be able to distinguish tailgating from piggybacking and select the control that stops both.",
   "Students will be able to compare honeypots, honeynets and honeytokens and explain why they produce few false positives.",
   "Students will be able to recommend a physical or deception control that matches a stated goal."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up prompt and have students sketch quick answers individually, then share two with the class."
   ],
   [
    13,
    "Teach",
    "Draw concentric rings on the whiteboard (perimeter, building, restricted area, rack) and place controls in each ring. Define tailgating and piggybacking and show why a vestibule beats a badge reader. Then introduce deception: honeypot, honeynet, honeytoken and DNS sinkhole, stressing that they are detective and need monitoring."
   ],
   [
    17,
    "Activity",
    "Run the site defense design activity in groups using a printed floor plan."
   ],
   [
    6,
    "Discuss",
    "Use the discussion questions, focusing on safety trade-offs and the risks of a poorly isolated honeypot."
   ],
   [
    4,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "If you wanted to know whether someone had broken into your school's network without them knowing you were watching, what fake thing could you leave out as bait?",
  "activity": {
   "title": "Defend the data center: rings and decoys",
   "materials": "Printed floor plan of a fictional office with a parking lot, lobby, open office, server room and loading dock (one per group); colored markers or sticky notes; a printed list of available controls (bollards, fencing, lighting, CCTV, guards, badge readers, access control vestibule, infrared and pressure sensors, locking racks, honeypot, honeytoken account, honeyfile, DNS sinkhole).",
   "steps": [
    "Groups receive the floor plan and a fictional budget of eight controls they may place.",
    "Groups mark each chosen physical control on the plan in the correct ring and write its purpose (deter, delay, detect or prevent) beside it.",
    "Groups add at least two deception controls to the network side of the plan and write the alert rule each would trigger.",
    "The teacher reads two incidents aloud (a van approaching the lobby at speed, and a tailgater at the server room). Each group explains which of its controls would respond.",
    "Groups swap plans and identify one gap in another group's design."
   ]
  },
  "discussion": [
   "Why must some secured doors fail open in a fire, and how does that affect your physical design?",
   "What could go wrong if a honeypot is placed on the same network as production systems without isolation?",
   "Is deploying deception technology ever a waste of money? What makes it worthwhile?"
  ],
  "exit": [
   [
    "Which control stops a person following an employee through a secure door, with or without permission?",
    "An access control vestibule (mantrap)."
   ],
   [
    "What is the difference between a honeypot and a honeytoken?",
    "A honeypot is a fake system; a honeytoken is a fake piece of data such as an account, record or file."
   ],
   [
    "Why do honeypots generate very few false positives?",
    "They have no legitimate use, so any interaction is likely malicious."
   ]
  ],
  "differentiation": [
   "Support: Provide a matching sheet pairing each control with a picture or one-line description, and let students match before placing controls on the floor plan.",
   "Extend: Ask fast finishers to write a one-paragraph plan for monitoring their deception controls: where alerts go, who investigates and how they keep the honeypot isolated from real systems."
  ]
 },
 {
  "t": "Change management: approval, CAB, impact analysis, backout plan, maintenance window",
  "objectives": [
   "Students will be able to describe the steps of a change management process from request through documentation.",
   "Students will be able to explain the roles of the change advisory board, owner and stakeholders.",
   "Students will be able to distinguish impact analysis, testing, backout plans and maintenance windows.",
   "Students will be able to diagnose which change management element was missing in a failed-change scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about an unplanned change. Take a few stories and note the consequences on the board."
   ],
   [
    12,
    "Teach",
    "Walk through the change lifecycle on the whiteboard: request, owner, stakeholders, impact analysis, test, approval, schedule, implement, verify, document. Explain the CAB's role, backout plans and maintenance windows, then cover the SY0-701 technical implications such as allow lists, restarts, legacy applications and dependencies."
   ],
   [
    18,
    "Activity",
    "Run the CAB meeting role-play with student-prepared change requests."
   ],
   [
    6,
    "Discuss",
    "Use the discussion questions to connect change management to security and incident investigation."
   ],
   [
    4,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Think of a time a website, app or game you use changed suddenly and something broke. What do you think the company forgot to do before making the change?",
  "activity": {
   "title": "Role-play: the CAB meeting",
   "materials": "Printed change request templates with fields for description, reason, systems affected, owner, stakeholders, impact analysis, test results, backout plan and proposed window; four printed scenario cards (a firewall rule change, a TLS library upgrade, a switch configuration change, an emergency patch); whiteboard.",
   "steps": [
    "Split the class into requester teams and one CAB panel of four or five students representing operations, security, the application owner and the business.",
    "Each requester team receives a scenario card and fills in the change request template, deliberately leaving one field weak if the teacher's card tells them to.",
    "Requester teams present to the CAB in three minutes each. The CAB asks questions, focusing on dependencies, testing and the backout plan.",
    "The CAB approves, rejects or sends back each request, stating which element was missing or adequate.",
    "The teacher reveals which field each team was told to weaken, and the class checks whether the CAB caught it."
   ]
  },
  "discussion": [
   "Why is change management considered a security control and not just an IT process?",
   "How should an organization handle an emergency change without losing control of its environment?",
   "What happens to an incident investigation when changes are not documented?"
  ],
  "exit": [
   [
    "A change causes an outage, and the team cannot quickly return to the previous state. What was missing?",
    "A backout plan."
   ],
   [
    "An update breaks a dependent application nobody considered. Which step was skipped or done poorly?",
    "Impact analysis."
   ],
   [
    "Who approves significant changes, and who implements them?",
    "The change advisory board approves; technical staff or the system owner's team implement."
   ]
  ],
  "differentiation": [
   "Support: Give students a completed sample change request to model their own on, with each field annotated with a one-line explanation of why it matters.",
   "Extend: Ask fast finishers to write a short post-incident review for the unticketed switch change in the lesson example, listing each missing element and the specific process fix."
  ]
 },
 {
  "t": "Symmetric vs asymmetric encryption, key exchange",
  "objectives": [
   "Students will be able to compare symmetric and asymmetric encryption in terms of keys, speed and typical uses.",
   "Students will be able to explain how hybrid encryption in TLS uses asymmetric cryptography to establish a symmetric session key.",
   "Students will be able to explain the purpose of Diffie-Hellman key exchange and perfect forward secrecy.",
   "Students will be able to select the correct key (recipient's public or sender's private) for confidentiality and for signing."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up puzzle about sharing a secret in a crowded room. Collect ideas without judging them."
   ],
   [
    14,
    "Teach",
    "Present symmetric encryption (AES, block versus stream, key distribution problem, n(n-1)/2 keys) and asymmetric encryption (RSA, ECC, public and private keys, signatures). Walk through the simplified TLS handshake on the whiteboard, highlighting where ECDHE creates the shared secret and where AES takes over. Explain perfect forward secrecy."
   ],
   [
    16,
    "Activity",
    "Run the key-pair envelope exercise and the scenario sort."
   ],
   [
    6,
    "Discuss",
    "Use the discussion questions to address the common mistakes about private-key encryption and symmetric strength."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You need to agree on a secret code word with a classmate on the other side of a crowded room, and everyone can hear anything you shout. How could you do it?",
  "activity": {
   "title": "Lockboxes and keys: which key goes where",
   "materials": "Printed cards labeled 'Alice public key', 'Alice private key', 'Bob public key', 'Bob private key' and 'shared session key' for each pair; envelopes; printed scenario cards (encrypt a full disk, send a confidential email, sign a contract, connect a sensor with a small key, protect past sessions if the server key leaks); whiteboard.",
   "steps": [
    "Pairs take the roles of Alice and Bob and receive their key cards. Each keeps the private key card face down.",
    "The teacher announces tasks such as 'Alice sends Bob a secret message' and 'Bob signs a document'. Pairs place the correct key card on the envelope and explain why.",
    "Pairs then model the hybrid approach: use asymmetric cards to protect or agree on a 'shared session key' card, then use only the session key for the remaining messages.",
    "Pairs sort the scenario cards into symmetric, asymmetric, ECC, Diffie-Hellman or perfect forward secrecy, writing the clue word that decided each one.",
    "The class reviews any scenarios where pairs disagreed."
   ]
  },
  "discussion": [
   "If AES-256 is so strong, why do we need asymmetric encryption at all?",
   "Why does encrypting a message with your own private key not keep it secret?",
   "Why might an organization prefer ECC over RSA for mobile or embedded devices?"
  ],
  "exit": [
   [
    "Which type of encryption should protect a large database backup, and why?",
    "Symmetric encryption such as AES, because it is fast and suited to bulk data."
   ],
   [
    "To send a confidential message to Bob, which key do you use?",
    "Bob's public key."
   ],
   [
    "What does perfect forward secrecy protect?",
    "Past recorded sessions, if the server's long-term private key is later compromised."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column comparison chart (symmetric versus asymmetric: keys, speed, uses, example algorithms) and a simple flow diagram of the hybrid TLS process to annotate during the teach segment.",
   "Extend: Ask fast finishers to calculate how many symmetric keys 10, 50 and 100 people would need using n(n-1)/2, and explain in two sentences how asymmetric keys change the key management burden."
  ]
 },
 {
  "t": "Hashing, salting, key stretching",
  "objectives": [
   "Students will be able to explain the properties of a cryptographic hash and why hashing provides integrity rather than confidentiality.",
   "Students will be able to identify current and deprecated hash algorithms and describe the purpose of HMAC.",
   "Students will be able to explain how salting defeats rainbow tables and how key stretching slows brute force.",
   "Students will be able to recommend an appropriate password storage approach and integrity check for a given scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about proving a file has not changed. Take a few answers."
   ],
   [
    13,
    "Teach",
    "Define hashing and its properties, then cover SHA-2, SHA-3, MD5 and SHA-1, and HMAC. Demonstrate on the projector, if a laptop is available, computing a file's hash, changing one character and rehashing to show the avalanche effect. Then explain password storage, rainbow tables, salts, key stretching (PBKDF2, bcrypt, scrypt, Argon2) and peppers."
   ],
   [
    17,
    "Activity",
    "Run the stolen password table analysis activity."
   ],
   [
    6,
    "Discuss",
    "Use the discussion questions to reinforce the difference between hashing and encryption and the role of each control."
   ],
   [
    4,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "A friend emails you a large file. How could you be confident that it arrived exactly as they sent it, without them sending the whole file a second time?",
  "activity": {
   "title": "Breach review: what does the stolen table reveal",
   "materials": "Three printed fictional password tables per group: Table A with plaintext passwords, Table B with unsalted hashes where some values repeat, Table C with a salt column, unique hashes and an algorithm label of bcrypt; sticky notes; whiteboard.",
   "steps": [
    "Give each group the three tables and explain that each was stolen from a different fictional company.",
    "Groups list what an attacker immediately learns from each table, such as which users share a password in Table B.",
    "Groups identify which attack (rainbow table, fast offline guessing) works against each table and which control blocks it.",
    "Groups write a one-paragraph recommendation for fixing Tables A and B, naming a key stretching algorithm and a per-user salt.",
    "The teacher records each group's conclusions on the whiteboard and corrects any group that suggests 'decrypting' the hashes."
   ]
  },
  "discussion": [
   "Why is a fast hash a good thing for file integrity but a bad thing for password storage?",
   "If a salt is stored right next to the hash, how can it still improve security?",
   "When would you use an HMAC instead of a plain hash?"
  ],
  "exit": [
   [
    "What does a salt defeat?",
    "Precomputed rainbow tables, and it makes identical passwords produce different hashes."
   ],
   [
    "Which control makes each password guess slower? Give an example algorithm.",
    "Key stretching, such as bcrypt, PBKDF2, scrypt or Argon2."
   ],
   [
    "Which CIA goal does hashing a downloaded file support?",
    "Integrity."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-row summary card (hash = integrity, salt = unique hashes and defeats rainbow tables, key stretching = slow guesses) and let students refer to it during the activity.",
   "Extend: Ask fast finishers to explain how a forensic investigator uses hashing to support chain of custody, and why vendors sign releases in addition to publishing hashes."
  ]
 },
 {
  "t": "Encryption levels: full disk, partition, file, database, record",
  "objectives": [
   "Students will be able to describe what full disk, partition or volume, file, database (TDE) and record-level encryption each protect and when data is decrypted at each level.",
   "Students will be able to compare encryption levels by the attacker they stop, including why full disk encryption does not stop malware on a logged-in system.",
   "Students will be able to select the narrowest appropriate encryption level for a given threat scenario and justify the choice.",
   "Students will be able to explain why encryption at rest must be paired with transport encryption and sound key management."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up question. Give students one minute to write an answer alone, then take three quick responses without correcting them yet. Say: 'Keep your answer; we will test it in twenty minutes.'"
   ],
   [
    15,
    "Teach",
    "Draw a vertical ladder on the whiteboard from 'whole disk' at the top to 'single field' at the bottom. For each rung, say what is encrypted, when it is decrypted, and who can still see plaintext. Walk the healthcare example aloud, adding TLS as a separate arrow for data in motion. Close by stating the rule: identify the attacker and their access, then pick the narrowest level that stops them."
   ],
   [
    15,
    "Activity",
    "Run 'Who gets in?' (see activity). Circulate and ask each group to justify one placement out loud, pressing on any card placed under full disk encryption that involves a logged-in attacker."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions. Draw out the trade-off between broad, easy encryption and narrow, complex encryption, and the role of key storage."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a half sheet and hand it in at the door."
   ]
  ],
  "warmup": "Your company laptop has full disk encryption. You are logged in and you open an email attachment that turns out to be malware. Can the malware read your files? Why or why not?",
  "activity": {
   "title": "Who gets in? Matching attackers to encryption levels",
   "materials": "Printed scenario cards (about 12, one threat per card), whiteboard divided into six columns labeled Full disk, Volume, File, Database (TDE), Record/column, Transport, and sticky notes.",
   "steps": [
    "Before class, write scenario cards such as 'laptop left in a taxi', 'backup tape copied by a vendor', 'DBA browsing card numbers', 'spreadsheet emailed to a partner', 'traffic sniffed on hotel Wi-Fi', 'cloud data volume detached and copied'.",
    "Split the class into groups of three or four and give each group three cards. Each group decides the narrowest level that stops the attacker on each card.",
    "Groups place their cards in a column on the whiteboard and add a sticky note naming one level that would NOT stop that attacker, with a reason.",
    "Review the board as a class. For each column, ask: when is the data decrypted here, and does this attacker have access at that moment?",
    "Finish by having each group pick one card and describe a layered design that covers it with two levels."
   ]
  },
  "discussion": [
   "If full disk encryption is so limited once a user logs in, why do nearly all organizations still require it?",
   "What business costs might stop a company from adding column-level encryption to every sensitive field, and how would you decide which fields deserve it?",
   "Where should the keys live for each level, and what happens to the protection if they are stored next to the data?"
  ],
  "exit": [
   [
    "A laptop is stolen while powered off. Which encryption level protects its data?",
    "Full disk encryption, because without the key the whole drive, including the operating system and temporary files, is unreadable."
   ],
   [
    "Why does transparent data encryption not stop a malicious database administrator?",
    "The database engine decrypts data automatically for any authorized query, so an administrator with query access sees plaintext. Field or record-level encryption with keys outside the database is needed."
   ],
   [
    "A file is copied from an FDE-protected laptop to a USB stick. Is it still protected, and what would protect it?",
    "No; FDE only protects that disk. File-level encryption, or encryption on the USB drive, would protect the copy."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column cheat card listing each level with 'decrypted when...' and 'stops...' filled in for two levels, and have them complete the rest before sorting scenario cards.",
   "Extend: Ask fast finishers to design encryption for a small online store end to end (servers, database, backups, card field, browser traffic) and explain where each key is stored and who can use it."
  ]
 },
 {
  "t": "Obfuscation: steganography, tokenization, data masking",
  "objectives": [
   "Students will be able to define steganography, tokenization, and static and dynamic data masking.",
   "Students will be able to compare these techniques with encryption and hashing in terms of reversibility and purpose.",
   "Students will be able to choose the appropriate obfuscation technique for a business scenario, including reducing PCI DSS scope.",
   "Students will be able to identify indicators that steganography may be in use for data exfiltration."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up prompt and have students discuss with a partner for two minutes. Collect a few ideas and write them on the board under 'ways to hide data'."
   ],
   [
    12,
    "Teach",
    "Draw a table with columns Technique, What is hidden, Reversible?, Typical use. Fill it in for encryption, hashing, tokenization, static masking, dynamic masking and steganography while explaining each. Walk the online store example aloud, pointing to the row each step uses."
   ],
   [
    18,
    "Activity",
    "Run 'Pick the disguise' (see activity). Give each group time to argue before revealing the answer, and require them to name the runner-up technique and why it loses."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore why tokenization reduces PCI DSS scope and why steganography is mostly a detection concern for defenders."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually and hand them in."
   ]
  ],
  "warmup": "A customer service agent needs to confirm a caller's identity. What is the least information about the caller's card number that the agent's screen should show, and why?",
  "activity": {
   "title": "Pick the disguise: scenario sort",
   "materials": "Printed scenario cards (10 to 12), four labeled paper signs (Steganography, Tokenization, Static masking, Dynamic masking) taped around the room, and a whiteboard for scoring.",
   "steps": [
    "Before class, write scenarios such as 'test database for developers', 'recurring monthly subscription charges', 'support agents see last four digits', 'images uploaded with odd file sizes', 'proving ownership of product photos', 'analysts need regional sales data without customer names'.",
    "Read one scenario aloud. Students walk to the sign they think fits. Give one person at each sign 30 seconds to defend the choice.",
    "Reveal the answer and explain the deciding clue, especially whether the original value must be recoverable later.",
    "After six rounds, switch to small groups: each group writes one new scenario card for another group to solve.",
    "End by asking which of the scenarios would be better served by encryption instead, and why."
   ]
  },
  "discussion": [
   "Why is a stolen token worthless to an attacker, while a stolen encrypted card number might not be?",
   "Dynamic masking hides data on screen. What other controls must still protect the stored data?",
   "If steganography is weak as a protection, why do defenders need to understand it at all?"
  ],
  "exit": [
   [
    "A merchant must charge a customer again next month without storing the card number. Which technique fits?",
    "Tokenization, because the provider's vault can map the stored token back to the card for authorized charges."
   ],
   [
    "How does steganography differ from encryption?",
    "Encryption hides what a message says; steganography hides the fact that a message exists."
   ],
   [
    "A team needs realistic data for testing with no real customer details. Static or dynamic masking?",
    "Static masking, which permanently replaces real values in the test copy."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-question decision aid on a card: 'Must the original be recovered later? Yes means tokenization or encryption; No means masking. Is the goal to hide that data exists? Then steganography.' Let students use it during the sort.",
   "Extend: Have fast finishers sketch how a payment flow with tokenization changes which systems fall under PCI DSS, labeling which components store tokens and which touch real card numbers."
  ]
 },
 {
  "t": "Public/private keys, key escrow",
  "objectives": [
   "Students will be able to identify which key (sender's or recipient's, public or private) is used to encrypt, decrypt, sign and verify.",
   "Students will be able to describe the stages of the key lifecycle from generation to destruction.",
   "Students will be able to explain the purpose and risks of key escrow and why signing keys should not be escrowed.",
   "Students will be able to recommend dual control or M of N control to protect key recovery."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question. Ask for a show of hands for each option, record the vote on the board, and say you will return to it."
   ],
   [
    12,
    "Teach",
    "Draw Alice and Bob on the board, each with a padlock (public key) and a key (private key). Act out confidentiality (Alice uses Bob's padlock) and signing (Alice uses her own key, anyone checks with her padlock). Then explain the lifecycle and escrow using the departed-employee example, stressing why only the encryption key was escrowed."
   ],
   [
    18,
    "Activity",
    "Run 'Key role-play' (see activity). Rotate roles so every student acts at least once, and pause to correct any wrong key choice immediately."
   ],
   [
    5,
    "Discuss",
    "Revisit the warm-up vote and lead the discussion questions on escrow risk and non-repudiation."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on paper."
   ]
  ],
  "warmup": "Maria wants to send Jamal a secret file using public key cryptography. Whose key does she use to encrypt it: her public key, her private key, Jamal's public key, or Jamal's private key?",
  "activity": {
   "title": "Key role-play: who uses which key?",
   "materials": "Index cards labeled 'Alice public', 'Alice private', 'Bob public', 'Bob private' (one set per group of four), envelopes, printed task cards, and the whiteboard.",
   "steps": [
    "Give each group a set of key cards. Two students play Alice and Bob and hold their private key cards face down; public key cards go face up in the middle of the table.",
    "Draw a task card such as 'send Bob a secret', 'prove to Bob this came from Alice', 'do both', 'Bob reads the secret', 'Bob checks Alice's message'. The group places the correct key card on the envelope.",
    "The third student acts as an auditor who checks each choice against a rule sheet; the fourth acts as an escrow officer.",
    "Add escrow tasks: 'Alice leaves the company; Legal needs her encrypted mail' and 'Legal wants to send a signed message as Alice'. The escrow officer must decide which request to allow and explain why.",
    "Debrief: each group states one rule it will remember about signing keys and escrow."
   ]
  },
  "discussion": [
   "An escrow system makes recovery possible. What makes it an attractive target, and how would you protect it?",
   "Why does escrowing a signing key undermine non-repudiation, even if nobody ever misuses it?",
   "Which stage of the key lifecycle do you think organizations most often neglect, and what goes wrong as a result?"
  ],
  "exit": [
   [
    "Which key verifies Alice's digital signature?",
    "Alice's public key."
   ],
   [
    "An employee leaves and her encrypted files must be read. What makes this possible?",
    "Key escrow or key recovery of her encryption key, ideally performed under dual control and logged."
   ],
   [
    "Name one control that prevents a single administrator from misusing escrowed keys.",
    "Dual control or M of N control, requiring several authorized people to approve a recovery, plus audit logging."
   ]
  ],
  "differentiation": [
   "Support: Give students a four-box grid (encrypt, decrypt, sign, verify) with a sentence starter in each box, such as 'To sign, use the ___'s ___ key', and let them keep it during the role-play.",
   "Extend: Ask fast finishers to write a one-paragraph key recovery procedure for their organization that includes who can request, who must approve, what is logged, and how keys are rotated afterward."
  ]
 },
 {
  "t": "Certificates: CA, CSR, root of trust, self-signed, wildcard, SAN",
  "objectives": [
   "Students will be able to describe how a certificate chain is validated from a server certificate through intermediates to a trusted root.",
   "Students will be able to explain the contents and purpose of a certificate signing request and why the private key is never sent.",
   "Students will be able to compare self-signed, internal CA, wildcard and SAN certificates and choose one for a scenario.",
   "Students will be able to diagnose common certificate warnings such as name mismatch and missing intermediate."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a browser certificate viewer screenshot (or open any HTTPS site on the projector and click the padlock). Ask students to find the subject, issuer and validity dates."
   ],
   [
    13,
    "Teach",
    "Draw the chain of trust on the board: root (offline, preinstalled), intermediate, server certificate. Then walk through the CSR process step by step, circling 'private key stays here'. Finish with a table comparing self-signed, internal CA, wildcard and SAN, including what *.example.com does and does not match."
   ],
   [
    17,
    "Activity",
    "Run 'Certificate help desk' (see activity). Let groups work through tickets, then review the trickiest ones as a class."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions on wildcard risk and self-signed certificates."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions and hand them in."
   ]
  ],
  "warmup": "Open the padlock on any website you use. Who issued its certificate, and how do you think your browser decided to trust that issuer?",
  "activity": {
   "title": "Certificate help desk: diagnose the ticket",
   "materials": "Printed help-desk ticket cards (8 to 10), each describing a symptom and showing a simplified certificate (subject, SAN list, issuer, dates); whiteboard; optional student laptops with a browser to inspect real certificates.",
   "steps": [
    "Before class, write tickets such as 'rooms.example.com shows a name mismatch; cert is *.example.com plus example.com' (should be fine), 'a.b.example.com shows mismatch with a wildcard', 'phones say issuer untrusted, desktops fine', 'internal lab app uses self-signed cert', 'we need example.com and example.net on one cert'.",
    "In pairs, students take a ticket, identify the cause, and write the fix in one sentence on the ticket.",
    "Pairs swap tickets with another pair and check each other's answers, marking agreement or disagreement.",
    "Bring disagreements to the whiteboard and resolve them together, referring back to the chain diagram and the wildcard rule.",
    "If laptops are available, each pair inspects one real site's certificate and lists its SAN entries and chain."
   ]
  },
  "discussion": [
   "A wildcard certificate is convenient. What risk does it create if its private key is stolen from one server?",
   "When is a self-signed certificate an acceptable choice, and what should an organization do instead for internal systems used by many employees?",
   "Why might certificate expiration cause more outages than attacks do, and how would you prevent it?"
  ],
  "exit": [
   [
    "Does *.example.com cover example.com and dev.app.example.com?",
    "No; it covers only one level of subdomain, such as www.example.com."
   ],
   [
    "What does a CSR contain, and what does it never contain?",
    "It contains the public key and identity details, signed by the requester; it never contains the private key."
   ],
   [
    "Desktops trust a site but phones report an untrusted issuer. What is the likely cause?",
    "The server is not sending the intermediate certificate, so phones cannot complete the chain to a trusted root."
   ]
  ],
  "differentiation": [
   "Support: Give students a printed chain diagram with blank labels to fill in (root, intermediate, server) and a list of three example host names to test against *.example.com before starting the tickets.",
   "Extend: Ask fast finishers to explain certificate transparency and pinning in their own words and describe one situation where pinning could cause an outage."
  ]
 },
 {
  "t": "Revocation: CRL vs OCSP, OCSP stapling",
  "objectives": [
   "Students will be able to explain why certificates are revoked and how revocation differs from expiration and suspension.",
   "Students will be able to compare CRL and OCSP in terms of timeliness, performance and privacy.",
   "Students will be able to describe how OCSP stapling works and why a server cannot forge a stapled response.",
   "Students will be able to state the correct response sequence when a certificate's private key is compromised."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and have students jot down their first two actions. Collect a few answers on the board."
   ],
   [
    13,
    "Teach",
    "Draw three panels on the board: CRL (CA publishes a list, client downloads it), OCSP (client asks CA responder per certificate), stapling (server asks, then hands signed answer to client). Under each, list timeliness, load and privacy. Explain soft fail and must-staple. Show the openssl commands from the lesson on the projector without running them against anything."
   ],
   [
    17,
    "Activity",
    "Run 'Act out the handshake' (see activity), repeating each mode twice, the second time with a 'revoked' certificate."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect soft fail to real risk."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "At 2 a.m. you learn the private key for your company's website certificate was exposed in a public backup. The certificate does not expire for eight months. What are your first two actions?",
  "activity": {
   "title": "Act out the handshake: CRL, OCSP and stapling",
   "materials": "Printed role badges (Browser, Web server, CA, OCSP responder), a printed 'CRL' sheet listing serial numbers, small slips of paper for OCSP responses with a 'CA stamp' drawn on them, and a timer.",
   "steps": [
    "Choose four volunteers per round to wear badges; the rest of the class are observers who time each round and count messages.",
    "Round 1 (CRL): the Browser walks to the CA, collects the full CRL sheet, and searches for the server's serial number. Observers note time and that the list was printed hours ago.",
    "Round 2 (OCSP): the Browser asks the OCSP responder about one serial and gets a stamped slip. Observers note that the CA now knows which site the Browser visited.",
    "Round 3 (stapling): the Web server fetches a stamped slip in advance and hands it to the Browser with its certificate. The Browser checks the CA stamp. Observers compare time and messages across rounds.",
    "Repeat with the server's certificate revoked, and have the Web server try to hand over an unstamped 'good' slip; the class explains why the Browser rejects it. Finally, block the OCSP responder in Round 2 and discuss soft fail."
   ]
  },
  "discussion": [
   "Many browsers soft fail when they cannot reach an OCSP responder. Why might vendors choose that behavior, and what risk does it create?",
   "What are the trade-offs of the must-staple flag for a busy website?",
   "Revocation only helps clients that check. What else can an organization do to limit damage from a stolen key?"
  ],
  "exit": [
   [
    "Why might a CRL not show a certificate revoked this morning?",
    "CRLs are published periodically, so the revocation may not appear until the next publication."
   ],
   [
    "In OCSP stapling, who signs the status response, and who delivers it?",
    "The CA (its OCSP responder) signs it; the web server delivers it in the TLS handshake."
   ],
   [
    "A server's private key is compromised. What two actions are required?",
    "Revoke the existing certificate and issue a replacement certificate with a newly generated key pair."
   ]
  ],
  "differentiation": [
   "Support: Give students a three-row comparison table with the rows labeled (CRL, OCSP, stapling) and columns for 'who asks', 'who answers', 'how current' to fill in during the role-play.",
   "Extend: Ask fast finishers to explain why certificate suspension exists alongside revocation and to describe a situation where a hold would be preferable."
  ]
 },
 {
  "t": "Digital signatures",
  "objectives": [
   "Students will be able to describe the signing and verification process, including the role of hashing.",
   "Students will be able to identify which key signs and which key verifies a digital signature.",
   "Students will be able to explain which security goals a digital signature provides and why it does not provide confidentiality.",
   "Students will be able to distinguish digital signatures from plain hashes and HMACs with respect to non-repudiation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up question. Students answer on a sticky note and post it on the board under 'proves' or 'does not prove'."
   ],
   [
    13,
    "Teach",
    "Draw the signing pipeline: message, hash, sign with private key, send message plus signature. Then draw verification: hash again, check with public key, compare. Change one letter of the message on the board and show the hash changing. Contrast with HMAC (shared secret) and plain hashes."
   ],
   [
    17,
    "Activity",
    "Run 'Seal and check' (see activity). Circulate and ensure verifiers actually recompute the checksum rather than trusting the sender."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions on key theft and what signatures do and do not prove."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Someone pastes a scanned image of their handwritten signature into a PDF contract. What does that actually prove about who sent it or whether it was changed?",
  "activity": {
   "title": "Seal and check: a paper model of signing",
   "materials": "Printed short messages (one per pair), a simple paper 'hash' rule (for example, sum of letter positions modulo 100) printed on a handout, colored pens or stamps representing each pair's private key, and the whiteboard.",
   "steps": [
    "Explain that the paper hash rule stands in for a real hash function and the colored pen stands in for a private key; the class has a public chart showing which color belongs to which pair (the 'public key').",
    "Each pair computes the hash of its message, writes the number, and 'signs' it by circling it in their secret color. They pass message and signature to another pair.",
    "Receiving pairs recompute the hash, compare it with the signed number, and check the color against the public chart. They record 'valid' or 'invalid'.",
    "The teacher secretly alters one message in transit and gives another pair a message signed in the wrong color. Groups must detect both and explain which property (integrity or origin) failed.",
    "Debrief on the model's limits: real hashes are not reversible or easy to collide, and real private keys cannot be copied by looking at a signature."
   ]
  },
  "discussion": [
   "If an attacker steals a vendor's code-signing key, what can they do, and why would users trust the result?",
   "Why does an HMAC not give non-repudiation even though it uses a secret key?",
   "A finance team requires signed payment instructions. What behavior change does that ask of staff when a message arrives unsigned?"
  ],
  "exit": [
   [
    "Which key creates a digital signature, and which key verifies it?",
    "The signer's private key creates it; the signer's public key verifies it."
   ],
   [
    "Why is a message hashed before it is signed?",
    "Asymmetric operations are slow, so signing a short fixed-length digest is far more efficient than signing the whole message."
   ],
   [
    "Does a digital signature make an email confidential?",
    "No; it provides integrity, authentication and non-repudiation. Confidentiality requires encryption with the recipient's public key."
   ]
  ],
  "differentiation": [
   "Support: Provide a step-by-step flowchart handout with blanks for 'hash', 'private key', 'public key' and 'compare', and pair struggling students with a partner who reads each step aloud.",
   "Extend: Ask fast finishers to explain how a certificate chain is used when verifying a code-signing signature and what should happen if the signing certificate has been revoked."
  ]
 },
 {
  "t": "TPM, HSM, secure enclave, key management system",
  "objectives": [
   "Students will be able to describe the purpose of a TPM, an HSM, a secure enclave and a key management system.",
   "Students will be able to compare a TPM and an HSM by scope, performance and typical use.",
   "Students will be able to select the right key protection technology for a scenario using exam clue words.",
   "Students will be able to explain why hardware key protection still requires access control and monitoring of key use."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take quick answers. Write students' suggestions on the board, then circle any that store the key in a file."
   ],
   [
    12,
    "Teach",
    "Draw four boxes on the board: TPM (one laptop), HSM (data center appliance serving many apps), secure enclave (inside a phone processor), KMS (cloud console managing keys). For each, write who uses it, what it protects and one clue word. Draw an arrow from KMS to HSM labeled 'often stored in'. Walk through the online bank design."
   ],
   [
    18,
    "Activity",
    "Run 'Architecture review' (see activity). Give groups time to present their picks and challenge each other."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to address the misuse-of-authorized-access point."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Your web server needs a private key to run HTTPS. Where could that key be stored, and what happens if malware copies it?",
  "activity": {
   "title": "Architecture review: assign the key protection",
   "materials": "Printed requirement cards (8 to 10), four labeled sticky-note colors or columns on the whiteboard (TPM, HSM, Secure enclave, KMS), and a projector to show the lesson's clue-word list after the round.",
   "steps": [
    "Before class, write requirement cards such as 'disk key released only if boot is untampered', 'sign payment transactions at high volume', 'store fingerprint template on a phone', 'rotate database keys yearly and log every use', 'protect data while it is being processed in the cloud', 'prove a laptop's boot state before network access'.",
    "In groups of three or four, students act as an architecture review board and assign each card to one technology, writing a one-line justification.",
    "Each group presents two cards; other groups may challenge a placement, and the presenting group must defend or change it.",
    "Introduce a twist card: 'an attacker compromised the payment application that is authorized to use the HSM'. Groups list what the HSM does and does not protect against and which additional controls apply.",
    "Close by projecting the clue-word list and letting groups correct any remaining placements."
   ]
  },
  "discussion": [
   "If keys in an HSM can never be exported, how can an attacker still cause damage with them?",
   "Why might an organization use a cloud KMS backed by HSMs instead of buying its own HSMs?",
   "What does a secure enclave add for data in use that disk encryption cannot provide?"
  ],
  "exit": [
   [
    "Which component seals a disk encryption key to the boot measurements of one laptop?",
    "The TPM."
   ],
   [
    "A company must protect its CA signing keys and perform thousands of signatures per hour. What should it use?",
    "A hardware security module."
   ],
   [
    "How does a KMS differ from an HSM?",
    "A KMS manages keys through their lifecycle (creation, rotation, access policy, auditing); an HSM is the hardened hardware that stores and uses keys, often underneath a KMS."
   ]
  ],
  "differentiation": [
   "Support: Give students a four-row reference card with each technology, 'scope' (one device, many systems, inside a processor, management layer) and two clue words, to use while sorting.",
   "Extend: Ask fast finishers to design key protection for a small online clinic, naming where each key lives (laptops, patient app, signing, cloud database) and how use of each key is monitored."
  ]
 },
 {
  "t": "OSI layers and where attacks happen",
  "objectives": [
   "Students will be able to list the seven OSI layers in order and state the main function of each.",
   "Students will be able to explain encapsulation and why different security devices see different parts of traffic.",
   "Students will be able to classify common attacks by the OSI layer they target.",
   "Students will be able to match a control to an attack by inspection depth, such as a WAF for SQL injection or port security for MAC flooding."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to write the warm-up answer, then poll the room. Introduce the mnemonic and have the class say the layers aloud from 1 to 7."
   ],
   [
    13,
    "Teach",
    "Draw the seven layers as a stack on the whiteboard. Next to each, write the addressing or unit (bits, frames and MAC, packets and IP, segments and ports, then application data) and one device. Demonstrate encapsulation by nesting labeled envelopes or drawing nested boxes. Then add attacks on the left of the stack and controls on the right, reading the lesson's examples aloud."
   ],
   [
    17,
    "Activity",
    "Run 'Build the stack' (see activity), followed by the troubleshooting walk-through as a whole class."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reinforce matching controls to layers."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A company's firewall only allows web traffic on port 443, yet attackers stole data through the website's search box. How is that possible?",
  "activity": {
   "title": "Build the stack: attacks and controls by layer",
   "materials": "Seven large paper signs labeled Layer 1 through Layer 7 taped along a wall or whiteboard, printed cards with attacks (ARP poisoning, MAC flooding, SYN flood, IP spoofing, SQL injection, HTTP flood, jamming, VLAN hopping, TLS stripping, port scanning) and controls (port security, dynamic ARP inspection, ACL on router, stateful firewall, WAF, 802.1X, cable locks, CDN challenge).",
   "steps": [
    "Hand each student or pair two attack cards and one control card.",
    "Students tape each card under the layer where it belongs. Attack cards go on the left side of the sign, control cards on the right.",
    "As a class, check each layer: does every attack have a control at the same layer that could stop it? Move any misplaced cards with an explanation.",
    "Present the troubleshooting scenario from the lesson one clue at a time (link lights, router volumes, SYN rates, HTTP logs). Students point to the layer being ruled out after each clue and name the final control.",
    "Finish with a speed round: call out a clue word ('MAC', 'port', 'URL', 'router') and students point to the layer."
   ]
  },
  "discussion": [
   "Why can't a firewall that filters on IP addresses and ports stop an HTTP flood that uses legitimate-looking requests?",
   "TLS encrypts application data. What information about a connection is still visible on the network, and why might that matter?",
   "Why is the OSI model useful even though real protocols do not always fit neatly into one layer?"
  ],
  "exit": [
   [
    "At which layer does ARP poisoning occur?",
    "Layer 2, the data link layer, because it manipulates IP-to-MAC address mappings on the local network."
   ],
   [
    "A server is overwhelmed by half-open TCP connections. Which layer is targeted and what is the attack called?",
    "Layer 4, the transport layer; it is a SYN flood."
   ],
   [
    "Which control can stop SQL injection that arrives on an allowed web port, and why?",
    "A web application firewall (along with secure coding), because it inspects the HTTP payload at Layer 7, which a port-based firewall cannot see."
   ]
  ],
  "differentiation": [
   "Support: Give students a printed stack with each layer's name, unit and one example device already filled in, so they can focus on placing attacks and controls.",
   "Extend: Ask fast finishers to trace a single web request through encapsulation, writing what header is added at each layer and which security device could inspect it at that point."
  ]
 },
 {
  "t": "Secure vs insecure protocols: SSH/Telnet, SFTP/FTP, LDAPS/LDAP, HTTPS/HTTP, SNMPv3",
  "objectives": [
   "Students will be able to name the secure replacement and port for Telnet, FTP, HTTP, LDAP and SNMPv1/v2c.",
   "Students will be able to distinguish SFTP from FTPS and LDAPS from LDAP with StartTLS.",
   "Students will be able to explain the three protections secure protocols add: confidentiality, integrity and authentication.",
   "Students will be able to recommend a hardening plan for a network device that disables insecure management services."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up prompt. Ask two or three students what they would expect to see in a packet capture of a Telnet login, then reveal that the password appears as readable text."
   ],
   [
    12,
    "Teach",
    "Walk through the pairs on the whiteboard as a two-column table: insecure protocol and port on the left, secure replacement and port on the right. Stress SFTP versus FTPS, StartTLS on 389, and the SNMPv3 privacy level. Say: 'If a protocol has a version with TLS, SSH or built-in crypto, the exam wants that version.'"
   ],
   [
    18,
    "Activity",
    "Run the Port Pair Match activity. Circulate, listen for SFTP and FTPS confusion, and ask groups to justify each pairing aloud."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the activity to real hardening work, especially why the old service must be disabled."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them on the door as they leave."
   ]
  ],
  "warmup": "If you could see every packet crossing the office network, which kinds of traffic do you think would show passwords in readable text, and why would anyone design a protocol that way?",
  "activity": {
   "title": "Port Pair Match and Hardening Plan",
   "materials": "Printed cards the teacher makes (one card per protocol name, one per port number, one per short description), sticky notes, whiteboard.",
   "steps": [
    "Split the class into groups of three or four and give each group a shuffled deck of protocol, port and description cards (Telnet, SSH, FTP, SFTP, FTPS, HTTP, HTTPS, LDAP, LDAPS, SNMPv2c, SNMPv3, and ports 20/21, 22, 23, 80, 161/162, 389, 443, 636, 990).",
    "Groups sort the cards into insecure-to-secure pairs with matching ports and descriptions, then place FTPS separately and explain how it differs from SFTP.",
    "Show a short projected scenario: a switch with Telnet, HTTP and SNMPv2c 'public' enabled. Each group writes a three-step hardening plan on sticky notes (what to disable, what to enable, how to verify).",
    "Groups post their plans on the whiteboard; the class compares them and the teacher highlights plans that include verification, such as rescanning for ports 23 and 80."
   ]
  },
  "discussion": [
   "Why might an organization leave Telnet enabled after turning on SSH, and what would you say to convince them to disable it?",
   "HTTPS protects the connection, so why can a phishing site still show a padlock?",
   "When would you choose LDAP with StartTLS on 389 instead of LDAPS on 636?"
  ],
  "exit": [
   [
    "What is the secure replacement for Telnet, and on what port does it run?",
    "SSH on TCP 22."
   ],
   [
    "How does SFTP differ from FTPS?",
    "SFTP runs over SSH on port 22; FTPS is FTP with TLS added and keeps FTP's separate control and data channels."
   ],
   [
    "Which SNMP version and setting encrypt management traffic?",
    "SNMPv3 configured at the privacy level (authPriv), which adds encryption on top of authentication."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially completed pair table with the insecure column filled in, and let them use the port cards as a reference while they fill in the secure column.",
   "Extend: Ask fast finishers to add email (IMAP/IMAPS, POP3/POP3S) and voice (RTP/SRTP) pairs to the table and explain which protection each secure version adds."
  ]
 },
 {
  "t": "Key ports: 22, 25, 53, 80, 443, 389, 636, 3389",
  "objectives": [
   "Students will be able to identify the service and protocol for ports 22, 25, 53, 80, 443, 389, 636 and 3389.",
   "Students will be able to interpret a port scan or firewall log line and decide whether each open port should be reachable.",
   "Students will be able to recommend controls for exposed management ports such as 3389 and 22.",
   "Students will be able to explain why port numbers alone cannot prove what service or traffic is present."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect guesses on the whiteboard. Point out that ports are how firewalls, scanners and logs describe services."
   ],
   [
    12,
    "Teach",
    "Present the eight core ports in groups: encrypted (22, 443, 636), cleartext counterparts (80, 389), infrastructure (25, 53) and high-value remote access (3389). Show the sample scan output on the projector and reason through each line aloud."
   ],
   [
    18,
    "Activity",
    "Run the Firewall Rule Review activity in pairs. Circulate and ask pairs to defend each allow or deny decision."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to address obscurity and tunneling."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "When a firewall alert names only a port number, such as 3389 or 25, what can you already guess about what is happening, and what can you not know yet?",
  "activity": {
   "title": "Firewall Rule Review",
   "materials": "Printed sheet of 10 fictional firewall rules and log lines the teacher prepares (for example 'allow any to 10.0.5.20 TCP 3389', 'workstation 10.0.8.14 outbound TCP 25 to many hosts', 'allow any to web server TCP 443'), pens, whiteboard.",
   "steps": [
    "Pairs read each rule or log line and write the service name next to the port.",
    "For each rule, pairs decide keep, restrict or remove, and write a one-line reason (for example 'remove: RDP should not face the internet; use VPN and jump server').",
    "Pairs flag any log line that suggests compromise, such as outbound 25 from a workstation or heavy DNS to one domain, and name the likely cause.",
    "The teacher calls on pairs to share one decision each and records the class consensus on the whiteboard, correcting any port mix-ups such as 389 versus 636."
   ]
  },
  "discussion": [
   "An administrator says moving RDP to port 50000 solved their brute-force problem. What happened, and why is it not a real fix?",
   "If attackers can tunnel traffic over 443 and 53, why do we still bother writing port-based firewall rules?",
   "Which ports in this lesson would you never expose to the internet, and what would you put in front of them instead?"
  ],
  "exit": [
   [
    "Which service uses port 3389, and how should it be protected?",
    "RDP; keep it off the internet and require a VPN or jump server with MFA."
   ],
   [
    "A scan shows 389 open on a domain controller. What is the encrypted alternative and its port?",
    "LDAPS on 636 (or LDAP upgraded with StartTLS)."
   ],
   [
    "A workstation sends outbound traffic on TCP 25 to many external hosts. What is the likely explanation?",
    "Spam-sending malware, since workstations normally send mail through the company mail server."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card with the eight core ports grouped by category and let struggling students use it during the activity, then remove it for the exit ticket.",
   "Extend: Ask fast finishers to add the secure email pairs (143/993, 110/995) and SMB 445 to the rule sheet and write a rule set for a small office that allows only what is needed."
  ]
 },
 {
  "t": "ARP, DNS, DHCP and their attacks",
  "objectives": [
   "Students will be able to explain how ARP, DNS and DHCP normally work, including the DORA lease process.",
   "Students will be able to identify ARP poisoning, DNS poisoning, rogue DHCP and DHCP starvation from symptoms.",
   "Students will be able to match each attack to its primary defense: dynamic ARP inspection, DNSSEC, DHCP snooping and port security.",
   "Students will be able to interpret an `arp -a` output that shows duplicate MAC addresses."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let students describe what their laptop does when it joins Wi-Fi. List their steps on the whiteboard and label them DHCP, ARP and DNS."
   ],
   [
    12,
    "Teach",
    "Draw a simple network (client, switch, gateway, resolver) and walk through normal ARP, DNS and DHCP traffic. Then add an attacker and show each attack in turn, naming the symptom and the defense. Project the `arp -a` example and ask the class what is wrong."
   ],
   [
    18,
    "Activity",
    "Run the Symptom Detective activity in small groups. Circulate and push groups to cite the specific clue that decided each case."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on why TLS turns silent interception into visible warnings."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards or paper."
   ]
  ],
  "warmup": "When your laptop joins a new Wi-Fi network and you type a website name, what has to happen before the page loads, and who does your laptop trust along the way?",
  "activity": {
   "title": "Symptom Detective",
   "materials": "Printed case cards the teacher makes (six short help desk scenarios with symptoms such as 'duplicate MAC for gateway', 'wrong IP range', 'pool exhausted', 'wrong site for everyone on one resolver'), a printed defense card set (DAI, DHCP snooping, port security, DNSSEC, TLS), whiteboard.",
   "steps": [
    "Give each group of three or four a set of case cards and defense cards.",
    "For each case, groups name the attack, write the deciding clue, and place the best defense card beside it.",
    "Groups then pick one case and draw the attack path on the whiteboard, showing where the attacker sits and where the defense stops them.",
    "The teacher reviews answers, highlighting common mix-ups such as rogue DHCP versus DNS poisoning and port security versus DHCP snooping."
   ]
  },
  "discussion": [
   "Why do you think these core protocols were designed without authentication, and why is it hard to add it now?",
   "If TLS already protects the content, why should a network team still bother deploying DAI and DHCP snooping?",
   "How would you explain to a user why clicking past a certificate warning is dangerous during an ARP poisoning attack?"
  ],
  "exit": [
   [
    "Users see a gateway MAC address that matches another workstation. Which attack is this and what switch feature prevents it?",
    "ARP poisoning; dynamic ARP inspection."
   ],
   [
    "What do the letters in DORA stand for?",
    "Discover, Offer, Request, Acknowledge."
   ],
   [
    "Does DNSSEC provide confidentiality? Explain.",
    "No; it signs records for integrity and authenticity. DNS over HTTPS or TLS provides confidentiality."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-row table (ARP, DNS, DHCP) with columns for normal job, attack and defense, partly filled in, to complete during the activity.",
   "Extend: Ask fast finishers to explain why DHCP snooping must be enabled for dynamic ARP inspection to work well, and to describe how DNS tunneling might appear in DNS logs."
  ]
 },
 {
  "t": "Actors: nation-state, organized crime, hacktivist, insider, unskilled attacker, shadow IT",
  "objectives": [
   "Students will be able to describe each threat actor type using the attributes internal or external, resources and funding, and sophistication.",
   "Students will be able to identify the most likely threat actor from an incident scenario by its goal, method and resources.",
   "Students will be able to distinguish malicious from unintentional insider threats and explain why shadow IT is a risk.",
   "Students will be able to explain why the target alone does not determine the actor."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers on the whiteboard. Group the answers loosely into who attacks and why."
   ],
   [
    12,
    "Teach",
    "Draw a grid on the whiteboard with actor types as rows and columns for internal or external, resources, sophistication and typical goal. Fill it in with the class, giving a short fictional example for each row."
   ],
   [
    18,
    "Activity",
    "Run the Attribution Board activity in groups. Circulate and ask groups which clue was decisive and which clue was a distraction."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore blurred lines between actor types."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes and place them on the grid by actor type."
   ]
  ],
  "warmup": "If you ran security for a small town's water utility, who do you think would want to attack it, and would they all want the same thing?",
  "activity": {
   "title": "Attribution Board",
   "materials": "Printed incident cards the teacher makes (eight short fictional incident summaries, one per actor type plus two ambiguous ones), sticky notes, whiteboard with six labeled actor columns.",
   "steps": [
    "Groups of three or four receive four incident cards each.",
    "For each card, groups underline the clues about goal, method and resources, decide the most likely actor and write a one-sentence justification on a sticky note.",
    "Groups place their sticky notes under the matching actor column on the whiteboard.",
    "The teacher reviews each column, discusses the two ambiguous cards as a class, and highlights decisions based on behavior rather than target."
   ]
  },
  "discussion": [
   "How should a defender treat an attack where the methods look like organized crime but the target and timing suggest a nation-state?",
   "What makes insider threats harder to detect than external attacks?",
   "How can an organization reduce shadow IT without making employees feel punished for trying to get their work done?"
  ],
  "exit": [
   [
    "Which actor type is most associated with APT campaigns and zero-day exploits?",
    "Nation-state actors."
   ],
   [
    "An employee misconfigures a cloud storage bucket and exposes data. What type of threat is this?",
    "An unintentional insider threat."
   ],
   [
    "Name the three attributes used to describe threat actors.",
    "Internal or external, resources and funding, and sophistication and capability."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a clue-word reference sheet (for example 'ransom' points to organized crime, 'protest' to hacktivist) to use during the activity.",
   "Extend: Ask fast finishers to write their own ambiguous incident card that could fit two actor types, then explain what extra evidence would settle it."
  ]
 },
 {
  "t": "Motivations: espionage, financial, disruption, ideology",
  "objectives": [
   "Students will be able to list the SY0-701 attacker motivations and give an example of each.",
   "Students will be able to infer the most likely motivation from what an attacker did after gaining access.",
   "Students will be able to distinguish motivation from actor type.",
   "Students will be able to explain how motivation changes incident response priorities."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the silent file theft and collect hypotheses on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Present the motivations in four groups: secrets (espionage, data exfiltration), money (financial gain, blackmail), harm (service disruption, chaos, war) and beliefs or grievances (ideology, ethical reasons, revenge). For each, describe what the attacker typically does after getting in."
   ],
   [
    18,
    "Activity",
    "Run the What Happened Next sort. Circulate and ask groups to point to the specific action that revealed the motive."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect motivation to response planning."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Someone steals a folder of product designs and never makes contact. What are three different reasons they might have done it, and what would you expect to happen next in each case?",
  "activity": {
   "title": "What Happened Next",
   "materials": "Printed scenario cards the teacher makes (ten short incidents, each ending with what the attacker did after access), printed motivation labels, sticky notes, whiteboard.",
   "steps": [
    "Groups of three or four receive the scenario cards and motivation labels.",
    "Groups sort each scenario under a motivation label and circle the action that decided it.",
    "The teacher then hands out 'twist' cards that change the ending of three scenarios (for example, a ransom note appears), and groups re-sort those cards and explain the change.",
    "Groups share one re-sorted card with the class, and the teacher records which actions most reliably reveal each motive."
   ]
  },
  "discussion": [
   "Why might an attacker's stated motivation differ from their real one, and how would that affect your response?",
   "If ransomware's goal is money, why do some organizations still treat it mainly as a disruption problem?",
   "Which motivations should your own organization or school plan for most, and why?"
  ],
  "exit": [
   [
    "Data is stolen and a demand arrives to pay or it will be published. What is the motivation?",
    "Financial gain through blackmail or extortion."
   ],
   [
    "What is the difference between an actor type and a motivation?",
    "Actor type is who is attacking; motivation is why they are attacking."
   ],
   [
    "Wiper malware destroys data with no ransom demand. Which motivation fits best?",
    "Service disruption, since destruction rather than payment is the goal."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page chart that pairs each motivation with a typical after-access action, and let struggling students use it during the sort.",
   "Extend: Ask fast finishers to write a short scenario in which the same actor type has two different motivations at different times, and describe how the response would differ."
  ]
 },
 {
  "t": "Threat vectors: email, SMS, voice, removable media, supply chain, open ports",
  "objectives": [
   "Students will be able to define threat vector and attack surface and explain how they relate.",
   "Students will be able to identify the vector in a scenario, including message-based, removable media, unsecured network, unsupported system, open port, default credential and supply chain vectors.",
   "Students will be able to distinguish a vector from a vulnerability and a threat actor.",
   "Students will be able to recommend controls that remove or restrict vectors rather than only monitoring them."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list every entry point students suggest on the whiteboard. Tell them this list is the school's attack surface."
   ],
   [
    12,
    "Teach",
    "Group the list into the SY0-701 vector categories, adding any missing ones (supply chain, unsupported systems, default credentials). For each, give one defense. Stress the difference between vector, vulnerability and actor with one worked example."
   ],
   [
    18,
    "Activity",
    "Run the Attack Surface Map activity. Circulate and challenge groups whose controls only monitor rather than remove."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on supply chain trust."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "List every way someone outside this building could get malicious software or a stranger's commands onto a school computer. How many different doorways can you find?",
  "activity": {
   "title": "Attack Surface Map",
   "materials": "Whiteboard or large paper, sticky notes in two colors, printed floor plan of a fictional small office the teacher draws (lobby, server closet, reception, a vendor remote access note, a legacy PC).",
   "steps": [
    "Groups of three or four study the fictional office plan and write each threat vector they find on a sticky note of the first color, placing it on the plan.",
    "For each vector, groups write a control on a second-color sticky note and mark it R if it removes the vector or M if it only monitors it.",
    "Each group picks the single most dangerous vector and the two controls they would fund first, with a one-sentence justification.",
    "Groups present their top choice; the teacher compares answers and highlights supply chain and default credential vectors if any group missed them."
   ]
  },
  "discussion": [
   "Why can a trusted vendor be a more dangerous vector than an unknown attacker on the internet?",
   "Removable media sounds old-fashioned. Why does it remain on the exam and in real incidents?",
   "When would monitoring a vector be acceptable instead of removing it?"
  ],
  "exit": [
   [
    "What is the difference between a threat vector and an attack surface?",
    "A vector is one path an attacker can use; the attack surface is the total set of vectors available."
   ],
   [
    "An MSP's remote tool is used to push ransomware to its clients. Which vector is this?",
    "Supply chain."
   ],
   [
    "Name a control that reduces the attack surface for an internet-facing device with a default password.",
    "Remove its internet exposure and change the default credentials (closing the port and setting strong unique credentials)."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a checklist of the vector categories to look for on the floor plan, so they can match items rather than generate the categories themselves.",
   "Extend: Ask fast finishers to explain how a software bill of materials would help an organization respond when a widely used library is found to be vulnerable."
  ]
 },
 {
  "t": "Social engineering: phishing, vishing, smishing, pretexting, BEC, watering hole, typosquatting",
  "objectives": [
   "Students will be able to identify phishing, spear phishing, whaling, vishing, smishing, pretexting, BEC, watering hole and typosquatting from a scenario.",
   "Students will be able to explain the psychological principles, such as authority and urgency, that make social engineering work.",
   "Students will be able to distinguish whaling from BEC and pretexting from impersonation.",
   "Students will be able to recommend process and technical controls, especially out-of-band verification for payment requests."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up prompt aloud and have students vote on whether they would comply. Ask a few to explain what made them hesitate or not."
   ],
   [
    12,
    "Teach",
    "List the psychological principles on the whiteboard, then introduce each technique with a one-line fictional example and the channel it uses. Spend extra time on BEC and on why out-of-band verification works."
   ],
   [
    18,
    "Activity",
    "Run the Help Desk Role-Play. Circulate and coach callers to use realistic pressure without real names of companies or people."
   ],
   [
    5,
    "Discuss",
    "Debrief the role-play with the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "You get a text from your 'manager' asking you to buy gift cards for a client meeting and send the codes right away because she is stuck in a meeting. Would you do it? What feels off, and what feels convincing?",
  "activity": {
   "title": "Help Desk Role-Play",
   "materials": "Printed role cards the teacher makes (attacker scripts using fictional organizations, defender cards with a simple verification policy, observer checklists listing the psychological principles), whiteboard.",
   "steps": [
    "Form groups of three: one attacker, one defender (help desk or finance clerk) and one observer. Give each the matching role card.",
    "The attacker uses the script to attempt a pretext by voice or a read-aloud email for three minutes; the defender must follow the verification policy; the observer ticks each principle the attacker used and names the technique.",
    "Rotate roles twice so every student plays each part, using a different script (vishing help desk reset, BEC bank change, smishing delivery fee).",
    "Observers report which principles were most effective and which defender actions stopped the attack; the teacher records the winning defenses on the whiteboard."
   ]
  },
  "discussion": [
   "Which psychological principle was hardest to resist during the role-play, and why?",
   "How can an organization encourage staff to verify requests without making them afraid of offending executives?",
   "Why do watering hole attacks bypass most awareness training, and what controls help instead?"
  ],
  "exit": [
   [
    "A finance clerk receives an email asking to change a supplier's bank details today. What is the best control?",
    "Out-of-band verification using a known phone number from the vendor file, plus dual approval for the change."
   ],
   [
    "What is the difference between pretexting and impersonation?",
    "Pretexting is the invented scenario justifying the request; impersonation is pretending to be a specific person or role."
   ],
   [
    "A text message urges you to pay a customs fee through a link. Which technique is this?",
    "Smishing."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a technique matching sheet with channel and goal columns, and let them play the observer role first before acting as attacker or defender.",
   "Extend: Ask fast finishers to design a short verification policy for a finance team that would stop the attack chain in the lesson, including who approves what and which channel is used for call-backs."
  ]
 },
 {
  "t": "OWASP Top 10: broken access control, injection, misconfiguration, integrity failures, SSRF",
  "objectives": [
   "Students will be able to describe broken access control, injection, security misconfiguration, software and data integrity failures, and SSRF.",
   "Students will be able to classify a vulnerable web application behavior into the correct OWASP Top 10 category.",
   "Students will be able to recommend the primary defense for each category, such as server-side authorization checks and parameterized queries.",
   "Students will be able to distinguish SSRF from CSRF and explain why a WAF does not replace fixing code."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up scenario and ask students to guess what the developer forgot. Collect answers on the whiteboard."
   ],
   [
    13,
    "Teach",
    "Introduce OWASP and the Top 10. Cover the five categories in this lesson with one fictional example and one defense each. Project the invoice code review example and walk through both the access control and injection flaws."
   ],
   [
    17,
    "Activity",
    "Run the Bug Report Triage activity. Circulate and ask groups to justify each category and defense."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to address WAFs and client-side checks."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A banking site hides other customers' accounts from its menus, but a user changes one number in the address bar and sees someone else's statement. What did the developers rely on, and what should they have done instead?",
  "activity": {
   "title": "Bug Report Triage",
   "materials": "Printed bug report cards the teacher makes (ten short fictional findings, two per category, written as a tester would report them), printed category and defense labels, whiteboard.",
   "steps": [
    "Groups of three or four receive the bug report cards and lay out the five category labels.",
    "Groups place each bug report under its category and write the primary defense on the card.",
    "Each group ranks its three most urgent findings and explains the ranking in one sentence each.",
    "The class compares placements on the whiteboard; the teacher resolves disagreements and points out the SSRF versus CSRF and validation versus parameterization distinctions."
   ]
  },
  "discussion": [
   "Why do developers so often enforce access control in the user interface instead of on the server?",
   "If a WAF can block many injection attempts, why should a team still spend time fixing the code?",
   "How might a compromised build pipeline affect every customer of a software vendor?"
  ],
  "exit": [
   [
    "What is the primary defense against SQL injection?",
    "Parameterized queries (prepared statements), supported by input validation and least-privilege database accounts."
   ],
   [
    "A server fetches a user-supplied URL that points to the cloud metadata service. Which category is this?",
    "Server-side request forgery (SSRF)."
   ],
   [
    "Why are hidden form fields not a valid access control?",
    "The user controls the browser and can change or bypass them; authorization must be checked on the server for every request."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a clue-word sheet that links phrases such as 'changed the ID' or 'verbose error' to categories, and pair them with a confident partner for the triage.",
   "Extend: Ask fast finishers to pick one of the other Top 10 categories, such as cryptographic failures or vulnerable and outdated components, and write a bug report card and defense for it."
  ]
 },
 {
  "t": "SQL injection, XSS (stored/reflected), CSRF",
  "objectives": [
   "Students will be able to explain how SQL injection, XSS and CSRF each abuse trust in a web application.",
   "Students will be able to distinguish stored, reflected and DOM-based XSS from a scenario description.",
   "Students will be able to match each attack to its primary defense: parameterized queries, output encoding with CSP, and anti-CSRF tokens with SameSite cookies.",
   "Students will be able to identify log and behavior clues that indicate each attack."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up question. Take three or four answers and write the words 'data' and 'browser' on the board as the two things these attacks abuse."
   ],
   [
    15,
    "Teach",
    "Walk through each attack with a simple diagram: user, browser, web server, database. Show the vulnerable and parameterized query side by side. For XSS, draw the difference between a payload saved in the database (stored) and one bounced back from a link (reflected). For CSRF, draw a malicious page causing the browser to send a request with the cookie attached. Finish with a three-column board: attack, clue words, primary defense."
   ],
   [
    15,
    "Activity",
    "Run the 'Which attack, which fix' card sort described below in groups of three or four."
   ],
   [
    5,
    "Discuss",
    "Pull the class together and use the discussion questions, focusing on why HTTPS and client-side validation do not solve these attacks."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note or slip and hand it in at the door."
   ]
  ],
  "warmup": "If a website shows you a page, who decides what code runs in your browser: you, the website, or anyone who typed into that website? Jot one sentence before we start.",
  "activity": {
   "title": "Which attack, which fix",
   "materials": "Printed scenario cards (about 12, made by the teacher), printed defense cards, sticky notes, whiteboard.",
   "steps": [
    "Before class, write 12 short scenario cards: for example, 'a comment containing script runs for every visitor', 'a login form returns a database error after a quote', 'a hidden form on another site changes a user's email address', 'a crafted link in a chat message runs script once for the clicker'.",
    "Give each group a set of scenario cards and a set of defense cards (parameterized queries, output encoding, CSP, HttpOnly cookie, anti-CSRF token, SameSite cookie, least-privilege database account, re-authentication, WAF).",
    "Groups label each scenario as SQLi, stored XSS, reflected XSS, DOM-based XSS or CSRF and attach the best primary defense plus one supporting control.",
    "Each group posts two of its hardest cards on the whiteboard and explains the clue word that decided the answer.",
    "The teacher reveals the intended answers and highlights any card where groups chose a WAF or HTTPS as the main fix, explaining why that is a distractor."
   ]
  },
  "discussion": [
   "Why do you think frameworks that encode output by default have reduced XSS, and what happens when developers turn that behavior off?",
   "If you could fund only one control for a legacy web app this quarter, would you pick a WAF or a code fix, and how would you justify it to a manager?",
   "Why does the attacker in CSRF never need to see the response for the attack to be harmful?"
  ],
  "exit": [
   [
    "A script saved in a product review runs for every shopper who reads it. Name the attack and its primary defense.",
    "Stored XSS; output encoding (supported by CSP and HttpOnly cookies)."
   ],
   [
    "What makes parameterized queries effective against SQL injection?",
    "The query structure is fixed and input is passed only as data, so input cannot change the command."
   ],
   [
    "A hidden form on a malicious site changes a logged-in user's email address. What attack is this and name one defense.",
    "CSRF; an anti-CSRF token, SameSite cookies or re-authentication for sensitive changes."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page chart with three rows (SQLi, XSS, CSRF) and columns for 'what is abused', 'clue words' and 'main fix', and let them use it during the card sort.",
   "Extend: Ask fast finishers to write two new scenario cards that combine attacks, such as an XSS flaw used to defeat CSRF tokens, and explain which control breaks the chain."
  ]
 },
 {
  "t": "Buffer overflow, race conditions (TOCTOU), memory injection",
  "objectives": [
   "Students will be able to explain how a buffer overflow overwrites adjacent memory and why that can lead to a crash or code execution.",
   "Students will be able to describe a TOCTOU race condition and identify atomic operations and locking as its fix.",
   "Students will be able to recognize memory injection, including DLL injection and process hollowing, from EDR-style observations.",
   "Students will be able to match DEP, ASLR, stack canaries, memory-safe languages, EDR and allow listing to the flaws they mitigate."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect answers. Steer toward the idea that programs trust sizes and timing they never verified."
   ],
   [
    15,
    "Teach",
    "Draw a row of boxes on the board as memory: a small buffer, then a saved return address. Show long input spilling across. Explain DEP, ASLR and canaries as ways to make that spill harder to exploit. Then draw a timeline with 'check' and 'use' and mark the gap for TOCTOU. Finish with a box labeled 'trusted process' and an arrow from another process writing into it for memory injection."
   ],
   [
    15,
    "Activity",
    "Run the 'Mind the gap' role-play and evidence sort described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the activity to patching and compensating controls."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A ticket gate checks your ticket, then the gate opens three seconds later. What could someone do in those three seconds, and how would you redesign the gate?",
  "activity": {
   "title": "Mind the gap: role-play a race, then sort the evidence",
   "materials": "Whiteboard, a printed 'permission slip' and a printed 'secret file' card, printed evidence cards (made by the teacher), sticky notes.",
   "steps": [
    "Pick three volunteers: a 'program', a 'user' and an 'attacker'. The program checks that the user's card says 'user file', turns around for a slow count of five, then acts on whatever card is in the user's hand.",
    "During the count, the attacker swaps the card for the 'secret file' card. Ask the class what went wrong and how to fix it; guide them to 'check and act in one step without turning around' (atomic) and 'hold the card while checking' (locking or file handle).",
    "Hand groups eight evidence cards, such as 'crash after a 5,000-character header', 'process writes memory into another process and starts a thread', 'two withdrawals both pass the balance check', 'no file on disk, antivirus clean'.",
    "Groups label each card buffer overflow, race condition or memory injection and add the best defense on a sticky note.",
    "Groups compare answers on the board; the teacher corrects any card where DEP or ASLR was listed as a fix for a race condition."
   ]
  },
  "discussion": [
   "If DEP and ASLR are on by default in modern operating systems, why do buffer overflows still matter to defenders?",
   "Why might an organization choose a memory-safe language for new code even if its developers already know C well?",
   "What should an analyst do before rebooting a host suspected of memory injection, and why?"
  ],
  "exit": [
   [
    "What does ASLR do to make a buffer overflow harder to exploit?",
    "It randomizes memory addresses so the attacker cannot reliably predict where to redirect execution."
   ],
   [
    "A program checks a file's permissions, then opens it by name a moment later. Name the flaw and one fix.",
    "A TOCTOU race condition; make the check and use atomic, for example by checking the already-opened file handle or using locking."
   ],
   [
    "An EDR alert shows code running inside a trusted process with no file on disk. What is this and which control detects it best?",
    "Memory injection; behavior-based EDR."
   ]
  ],
  "differentiation": [
   "Support: Give students a three-row reference card (overflow: size; race: timing; injection: someone else's process) with one clue word and one defense per row to use during the sort.",
   "Extend: Ask fast finishers to explain why a stack canary and ASLR together are stronger than either alone, and to describe one scenario where neither would help."
  ]
 },
 {
  "t": "Threat modeling",
  "objectives": [
   "Students will be able to apply the four-question threat modeling approach to a simple data flow diagram.",
   "Students will be able to classify threats using all six STRIDE categories and name the security property each violates.",
   "Students will be able to compare MITRE ATT&CK, the Cyber Kill Chain and the Diamond Model by purpose.",
   "Students will be able to identify trust boundaries and explain why they attract threats."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the board, then group them roughly into STRIDE categories without naming STRIDE yet."
   ],
   [
    12,
    "Teach",
    "Introduce the four questions. Draw a small data flow diagram (user, web app, API, database) and mark trust boundaries with dashed lines. Reveal STRIDE and show how the warm-up answers already fit its six categories. Briefly contrast ATT&CK, Kill Chain and Diamond Model with one sentence each."
   ],
   [
    18,
    "Activity",
    "Run the 'STRIDE the diagram' workshop described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, especially how a threat model becomes backlog work with owners."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Your school is launching an app where students check grades from their phones. Name three things that could go wrong, from any angle you like.",
  "activity": {
   "title": "STRIDE the diagram",
   "materials": "Whiteboard or large paper per group, six colors of sticky notes (one per STRIDE letter), printed one-page data flow diagram of a food-delivery app (made by the teacher).",
   "steps": [
    "Hand each group the printed data flow diagram: customer phone, restaurant tablet, ordering API, payment provider, order database, driver app.",
    "Groups first mark every trust boundary with a dashed line and agree on which one is most exposed.",
    "For that boundary, groups write at least one threat per STRIDE letter on the matching color sticky note.",
    "On the back of each sticky note, groups write one mitigation and a hypothetical owner (developer, operations, security, vendor).",
    "Groups rotate to another group's diagram for three minutes and add one threat that group missed.",
    "The teacher reviews a few threats per letter and asks which ones would be cheapest to fix now versus after launch."
   ]
  },
  "discussion": [
   "Why do you think developers should be in the threat modeling meeting rather than only security staff?",
   "How would your threat model change if the biggest risk were an insider rather than an outside attacker?",
   "When would you reach for an attack tree instead of STRIDE?"
  ],
  "exit": [
   [
    "A user denies submitting a refund request and there is no log entry tying it to them. Which STRIDE category is this and what control helps?",
    "Repudiation; audit logging tied to authenticated identity, or digital signatures."
   ],
   [
    "What is a trust boundary?",
    "A point where data crosses between areas with different levels of trust, such as from the internet to an internal server."
   ],
   [
    "Which framework would you use to map your detections against real attacker techniques?",
    "MITRE ATT&CK."
   ]
  ],
  "differentiation": [
   "Support: Provide a STRIDE reference strip that lists each letter, its meaning, the property it violates and one example threat, and let students work in pairs on just two letters first.",
   "Extend: Ask fast finishers to draw an attack tree for the goal 'get free food from the delivery app' and identify the cheapest branch for an attacker and the control that cuts it."
  ]
 },
 {
  "t": "Malware: ransomware, trojan, worm, spyware, rootkit, logic bomb, keylogger, fileless",
  "objectives": [
   "Students will be able to identify ransomware, trojans, worms, viruses, spyware, rootkits, logic bombs, keyloggers and fileless malware from a description of their behavior.",
   "Students will be able to distinguish a virus from a worm and a trojan from other malware by how each spreads.",
   "Students will be able to select appropriate defenses for each malware type, such as offline backups for ransomware and EDR for fileless malware.",
   "Students will be able to explain why rootkits and fileless malware evade traditional antivirus."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect a few answers. Write 'how it gets in', 'what it does' and 'how it hides' as three headings on the board."
   ],
   [
    12,
    "Teach",
    "Go through each malware type under the three headings, giving one defining behavior and one defense for each. Spend extra time on virus versus worm and on why rootkits and fileless malware defeat signature scans."
   ],
   [
    18,
    "Activity",
    "Run the 'Malware mystery cards' game described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, especially the ransom payment question."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you had to explain to a family member the difference between a computer 'virus' and other malware, what would you say? Write one sentence.",
  "activity": {
   "title": "Malware mystery cards",
   "materials": "Printed symptom cards (about 16, made by the teacher), a printed answer key, whiteboard, sticky notes for scoring.",
   "steps": [
    "Before class, write symptom cards describing one defining behavior each, for example 'files renamed and a payment note in every folder', 'free PDF tool that opens a remote connection', 'servers infected overnight with no logins', 'deletes data when a named account is removed', 'antivirus clean but hidden drivers found from boot USB', 'Word launches PowerShell and nothing is written to disk'.",
    "Split the class into teams. The teacher reads a card aloud; teams have 30 seconds to write the malware type and one defense on a sticky note.",
    "Score one point for the correct type and one point for a defense that fits that type.",
    "After every four cards, pause and ask one team to explain the clue word that decided their answer.",
    "Finish with two 'combo' cards that describe more than one behavior, and ask teams which behavior is the defining one an exam question would key on."
   ]
  },
  "discussion": [
   "Why might an organization still consider paying a ransom, and what does that tell you about the importance of tested backups?",
   "Which malware types point most strongly to insider involvement, and what controls reduce that risk?",
   "If antivirus cannot see fileless malware, what evidence would you look for instead?"
  ],
  "exit": [
   [
    "Malware infects many servers in minutes without any user action. What type is it?",
    "A worm."
   ],
   [
    "Why is reimaging recommended after a rootkit infection?",
    "The rootkit can hide from the operating system and its tools, so the system cannot be trusted to clean or report on itself."
   ],
   [
    "Name the best defense for recovering from ransomware without paying.",
    "Offline or immutable backups that are regularly tested."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a matching worksheet with the malware names on one side and one-line behaviors on the other before they join the team game.",
   "Extend: Ask fast finishers to write a short incident timeline in which one sample shows three malware behaviors, then identify the controls that would have broken the chain at each step."
  ]
 },
 {
  "t": "Password attacks: spraying, brute force, credential stuffing",
  "objectives": [
   "Students will be able to distinguish brute force, dictionary, password spraying, credential stuffing and offline cracking by the pattern of attempts.",
   "Students will be able to analyze an authentication log excerpt and identify the password attack it shows.",
   "Students will be able to explain why account lockout works against online brute force but not against spraying or offline cracking.",
   "Students will be able to justify MFA, breached-password screening and key stretching as defenses."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Tally hands for 'yes' and 'no' and leave the result on the board to revisit."
   ],
   [
    12,
    "Teach",
    "Draw a grid with 'passwords tried' on one axis and 'accounts targeted' on the other. Place brute force (many passwords, one account), spraying (one password, many accounts) and stuffing (real pairs, many accounts) on it. Explain offline cracking separately and why lockout does not apply. End with MFA and modern password guidance."
   ],
   [
    18,
    "Activity",
    "Run the 'Read the sign-in log' analysis described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions and return to the warm-up tally."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you reuse the same password on a gaming site and your work email, and only the gaming site gets breached, is your work email at risk? Why?",
  "activity": {
   "title": "Read the sign-in log",
   "materials": "Projector, printed or projected log excerpts (four short tables made by the teacher), whiteboard, sticky notes.",
   "steps": [
    "Prepare four short log excerpts with columns for time, username, source IP address, result and a masked password label (for example 'P1', 'P2'): one brute force, one spray, one stuffing, and one showing successful logins from new countries after a known hash theft with no failures.",
    "In pairs, students label each excerpt with the attack name and circle the columns that gave it away.",
    "Pairs then write the single best control and one supporting control for each excerpt on sticky notes.",
    "The teacher asks pairs to place their sticky notes on the board under each excerpt, then discusses disagreements, especially anyone who picked lockout for the spray or offline case.",
    "As a closing step, pairs write one SIEM alert rule in plain English that would catch the spray, such as 'more than 50 accounts with one failure each from the same source in an hour'."
   ]
  },
  "discussion": [
   "Why do you think current guidance moved away from forcing regular password changes?",
   "How would passwordless login with passkeys change which of these attacks are possible?",
   "What is the risk of setting account lockout too aggressively?"
  ],
  "exit": [
   [
    "One password is tried once against 3,000 accounts. Name the attack.",
    "Password spraying."
   ],
   [
    "Why does account lockout fail against offline brute force?",
    "The attacker guesses against stolen hashes on their own hardware, never touching the login system that enforces lockout."
   ],
   [
    "What single control best reduces the impact of spraying, brute force and credential stuffing?",
    "Multifactor authentication."
   ]
  ],
  "differentiation": [
   "Support: Give students the passwords-versus-accounts grid as a handout and have them place each log excerpt on the grid before naming the attack.",
   "Extend: Ask fast finishers to compare the time an offline attacker needs against a fast unsalted hash versus a slow salted hash in qualitative terms, and explain how key stretching changes the attacker's economics."
  ]
 },
 {
  "t": "Crypto attacks: downgrade, collision, birthday",
  "objectives": [
   "Students will be able to explain how a downgrade attack and SSL stripping exploit protocol negotiation, and name the configuration defenses including HSTS.",
   "Students will be able to define a hash collision and explain why it enables signature forgery.",
   "Students will be able to apply the birthday paradox to estimate collision resistance as about 2 to the power of n/2 for an n-bit hash.",
   "Students will be able to distinguish a collision from a preimage attack."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up birthday question, have students write a guess, and record the range of guesses on the board."
   ],
   [
    12,
    "Teach",
    "Reveal the answer (about 23) and explain pairs. Connect to hashes and 2^(n/2). Then explain collisions and why signatures over a hash can be reused. Finish with downgrade attacks: draw a client and server negotiating, with an attacker in the middle crossing out the strong options, and show HSTS and disabled legacy versions as the fix."
   ],
   [
    18,
    "Activity",
    "Run the 'Birthday in the room' experiment and the downgrade negotiation role-play described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the activity to real configuration choices."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "How many people do you think need to be in a room before there is about a 50 percent chance that two of them share a birthday? Write your guess.",
  "activity": {
   "title": "Birthday in the room, then negotiate a downgrade",
   "materials": "Whiteboard, sticky notes, printed 'cipher menu' cards listing strong and weak options (made by the teacher), student laptops with a browser optional.",
   "steps": [
    "Each student writes their birth month and day on a sticky note and posts it on a whiteboard calendar grid. The class checks for any shared date and discusses how many pairs a class of this size creates.",
    "Students compute, in pairs, the approximate collision work for 128-bit and 256-bit hashes using 2^(n/2), and write what each means for MD5 and SHA-256.",
    "Set up a role-play with three students: a 'client' and a 'server' each holding a cipher menu card with strong and weak options, and an 'attacker' who passes messages between them.",
    "The attacker crosses out the strong options on each message so both sides settle on the weak one. The class identifies the downgrade.",
    "Repeat with the server's card showing only strong options. The class explains why the attack now fails and relates it to disabling TLS 1.0 and 1.1 and enabling HSTS."
   ]
  },
  "discussion": [
   "Why might an organization leave an old protocol enabled, and how would you argue for turning it off?",
   "Why are signatures made over a hash rather than the whole document, and what does that mean when a hash algorithm weakens?",
   "Why does doubling the hash length matter so much more than it sounds?"
  ],
  "exit": [
   [
    "What is the best defense against downgrade attacks on a web server?",
    "Disable legacy protocol versions and weak ciphers so there is nothing weaker to negotiate, and use HSTS to prevent SSL stripping."
   ],
   [
    "Roughly how many attempts does a birthday attack need against a 160-bit hash?",
    "About 2 to the power of 80."
   ],
   [
    "Why is a hash collision dangerous for code signing?",
    "A signature over one file's hash is also valid for a different file with the same hash, so a malicious file could carry a valid signature."
   ]
  ],
  "differentiation": [
   "Support: Give students a worked table showing hash length, birthday work (n/2), and an example algorithm for 128, 160 and 256 bits, so they can focus on the concept rather than the arithmetic.",
   "Extend: Ask fast finishers to explain why TLS 1.3 is harder to downgrade than earlier versions and why HSTS preload lists protect the first visit while a normal HSTS header cannot."
  ]
 },
 {
  "t": "Indicators: impossible travel, account lockout, resource consumption, missing logs",
  "objectives": [
   "Students will be able to identify impossible travel, concurrent sessions, account lockout, blocked content, out-of-cycle logging, resource consumption, resource inaccessibility and missing logs from scenario descriptions.",
   "Students will be able to explain likely causes and common false positives for each indicator.",
   "Students will be able to correlate multiple indicators into a single incident hypothesis.",
   "Students will be able to choose an appropriate verify-and-contain first step."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect answers, writing them on the board as 'clues'."
   ],
   [
    12,
    "Teach",
    "Present each indicator with one example and one false positive. Emphasize missing logs as an indicator and the difference between IoCs and behavioral indicators. Model correlation by walking through the finance-user triage example on the board."
   ],
   [
    18,
    "Activity",
    "Run the 'SOC shift' alert triage described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reflect on false positives and alert fatigue."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You come home and notice something is slightly off, but nothing is obviously broken. What small clues would make you suspect someone had been inside?",
  "activity": {
   "title": "SOC shift: triage the alert queue",
   "materials": "Printed alert cards (about 15, made by the teacher, each with a time, user or host, and a short description), whiteboard divided into columns, sticky notes, projector for the debrief.",
   "steps": [
    "Prepare alert cards that include related clusters (for example impossible travel, new MFA device and a forwarding rule for the same user; high overnight CPU and outbound traffic for one server) plus a few benign cards (a user locked out after a password change, a sign-in from the corporate VPN).",
    "Groups act as a SOC shift. They sort cards into 'benign', 'needs verification' and 'incident' columns on the board.",
    "For each card, groups name the indicator type on a sticky note.",
    "Groups then link related cards with lines to build at least one incident story and write a one-sentence hypothesis.",
    "Each group states its first containment action for its strongest incident; the teacher debriefs which clusters were real and which benign cards were traps."
   ]
  },
  "discussion": [
   "How can a SOC reduce false positives from impossible travel without missing real compromises?",
   "Why might an attacker clear logs even though doing so is itself suspicious?",
   "What baselines would you need before you could reliably say a server's resource use is unusual?"
  ],
  "exit": [
   [
    "A user signs in from two countries 15 minutes apart. Name the indicator and one false-positive cause.",
    "Impossible travel; a VPN, cloud proxy or mobile network could cause it."
   ],
   [
    "Why is a Windows 'audit log was cleared' event important?",
    "Attackers clear logs to hide their activity, so it is a strong indicator that someone may be covering their tracks."
   ],
   [
    "A server's CPU is at 100 percent overnight with an unknown process and outbound connections. What is a likely cause?",
    "A cryptominer or other malware using the server's resources."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students an indicator reference card listing each indicator, one example and one false positive, and have them start by sorting only the benign cards.",
   "Extend: Ask fast finishers to write plain-English SIEM correlation rules that would combine two or more indicators into a single high-priority alert, and explain how each rule reduces false positives."
  ]
 },
 {
  "t": "Segmentation and isolation",
  "objectives": [
   "Students will be able to explain how segmentation limits lateral movement and why a flat network increases breach impact.",
   "Students will be able to compare VLANs, screened subnets, microsegmentation, air gaps and sandboxes by purpose.",
   "Students will be able to design a simple deny-by-default segment plan with firewall rules between zones.",
   "Students will be able to apply isolation as an incident response and compensating control for unpatchable systems."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch the students' ideas of how a building limits who goes where."
   ],
   [
    12,
    "Teach",
    "Draw a flat network, then redraw it with zones and a firewall between them. Explain VLANs versus filtering, screened subnets, north-south versus east-west traffic, microsegmentation, air gaps, sandboxes and quarantine. Show the pseudo-configuration rules and read them aloud."
   ],
   [
    18,
    "Activity",
    "Run the 'Draw the zones' design exercise described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on rule drift and temporary exceptions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "In a school or office building, which rooms can anyone walk into, which need a key, and which are locked to almost everyone? Why is it designed that way?",
  "activity": {
   "title": "Draw the zones and break the attack",
   "materials": "Whiteboard or large paper per group, markers, printed device cards (made by the teacher), sticky notes in two colors.",
   "steps": [
    "Give each group device cards for a fictional company: employee laptops, file server, web server, payroll database, printers, smart thermostats, guest Wi-Fi, payment terminals, backup server, switch management interfaces.",
    "Groups draw zones and place each device card in a zone, including a screened subnet and a cardholder data zone.",
    "Groups write deny-by-default rules between zones on one color of sticky note, in plain English such as 'laptops to web app on 443 only'.",
    "The teacher announces an attack: 'a laptop in marketing is infected and starts scanning'. Groups trace with a marker where the attacker can and cannot reach, using the other color of sticky note to mark any rule that lets it through.",
    "Groups fix one weakness and present how their design contains the attack and where they would use isolation instead of segmentation."
   ]
  },
  "discussion": [
   "Why do temporary firewall exceptions tend to become permanent, and how would you prevent that?",
   "When would you choose an air gap over strict segmentation, and what new risks does an air gap introduce?",
   "How does microsegmentation change what an attacker can do after compromising one server?"
  ],
  "exit": [
   [
    "Why are VLANs alone not enough to secure traffic between zones?",
    "Without ACLs or firewall rules filtering traffic between VLANs, devices can still route freely to each other."
   ],
   [
    "What type of traffic does lateral movement create, and which control targets it?",
    "East-west traffic; internal segmentation and microsegmentation."
   ],
   [
    "What is the best control for a legacy system that cannot be patched?",
    "Segmentation or isolation as a compensating control, limiting what can reach it and what it can reach."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed zone diagram with three zones already drawn so struggling students focus on placing devices and writing two or three rules.",
   "Extend: Ask fast finishers to translate their plain-English rules into the pseudo-configuration format shown in class and explain how they would log and alert on denied east-west traffic."
  ]
 },
 {
  "t": "Least privilege, access control lists",
  "objectives": [
   "Students will be able to explain least privilege and how it limits the blast radius of a compromise.",
   "Students will be able to trace traffic through a network ACL using top-down, first-match processing and implicit deny.",
   "Students will be able to distinguish least privilege, need to know, separation of duties and just-in-time access in scenarios.",
   "Students will be able to recommend access reviews and role-based provisioning to correct privilege creep."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the whiteboard. Point out that every answer limits what a single key or person can do, which is the core of least privilege."
   ],
   [
    12,
    "Teach",
    "Define least privilege, need to know, separation of duties and just-in-time access with one workplace example each. Project the three-line database ACL and read it aloud top to bottom, stressing first match wins and the implicit deny. Contrast with NTFS, where an explicit deny overrides allows."
   ],
   [
    18,
    "Activity",
    "Run the ACL tracing activity in pairs, then have pairs fix the broken ACL and present their reordered version."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect ACL design to privilege creep and access reviews."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your apartment building gives every resident one key that opens every unit, the roof and the boiler room. What could go wrong, and how would you redesign the keys?",
  "activity": {
   "title": "Packet tracer on paper",
   "materials": "Whiteboard, printed cards each showing one packet (source IP, destination IP, protocol, port), and a printed handout with two short ACLs: one correct and one with a broad permit above a specific deny.",
   "steps": [
    "Give each pair the handout and a stack of eight packet cards.",
    "For each card, pairs trace the correct ACL from the top, write the line number that matches and the result (permit, deny, or implicit deny).",
    "Pairs repeat with the broken ACL and circle every packet whose result changes.",
    "Each pair rewrites the broken ACL so it enforces least privilege, keeping specific rules above general ones.",
    "Two pairs present their fixed ACLs on the whiteboard; the class checks them against two tricky packet cards."
   ]
  },
  "discussion": [
   "Why do service accounts so often end up with more access than any human user, and who should own reviewing them?",
   "If access reviews are just managers clicking 'approve all', what would make them meaningful?"
  ],
  "exit": [
   [
    "An ACL has 'permit any any' on line 1 and 'deny host 10.1.1.5' on line 2. Is 10.1.1.5 blocked?",
    "No. Line 1 matches first, so the deny is never reached."
   ],
   [
    "An employee who moved from HR to marketing still has HR payroll access. Name the problem and the control that fixes it.",
    "Privilege creep; fixed by periodic access reviews and role-based deprovisioning."
   ],
   [
    "One clerk can both create a vendor and approve payments to it. Which principle is violated?",
    "Separation of duties."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page flowchart (start at line 1, does it match, if yes act and stop, if no go to the next line, end means deny) to use while tracing packets.",
   "Extend: Ask fast finishers to write a minimal ACL for a web server that allows HTTPS from anywhere and SSH only from an admin subnet, then explain how they would log denied attempts."
  ]
 },
 {
  "t": "Application allow listing",
  "objectives": [
   "Students will be able to contrast allow listing with deny listing and explain why allow listing stops unknown malware.",
   "Students will be able to compare hash, publisher and path rules and choose an appropriate rule type for a given application.",
   "Students will be able to outline a safe deployment sequence using inventory, audit mode and enforcement.",
   "Students will be able to explain why living off the land requires controls beyond allow listing."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Sort student answers on the whiteboard into two columns, 'list of who is banned' and 'list of who is allowed', and name them deny list and allow list."
   ],
   [
    12,
    "Teach",
    "Explain default-deny for software. Draw a three-column table for hash, publisher and path rules with rows for precision, survives updates and main weakness. Walk through inventory, audit mode, review, enforce."
   ],
   [
    18,
    "Activity",
    "Run the rule-builder card activity in groups of three, followed by a quick share-out."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, steering toward living off the land and the need for EDR alongside allow listing."
   ],
   [
    5,
    "Exit ticket",
    "Students write answers to the three exit questions and hand them in."
   ]
  ],
  "warmup": "A school wants to keep strangers out of the building. Is it easier to keep a list of every dangerous person in the city, or a list of every student and staff member? Which list fails when a brand-new stranger shows up?",
  "activity": {
   "title": "Build the allow list",
   "materials": "Printed cards describing software found on a finance workstation (a commercial office suite updated monthly, an in-house script that never changes, a browser that auto-updates, an unknown executable in Downloads, a remote access tool a user installed, a built-in scripting tool), plus a whiteboard.",
   "steps": [
    "Give each group a set of cards and a sheet with three boxes: hash rule, publisher rule, block.",
    "Groups place each card in a box and write a one-line justification on a sticky note.",
    "Groups list two things they would expect to see in audit-mode logs during the first week.",
    "The teacher reveals a twist card: the office suite just released an update. Groups check whether any of their rules break.",
    "Groups share placements for the scripting tool card and debate whether to block it, restrict it or monitor it."
   ]
  },
  "discussion": [
   "Developers say a strict allow list stops them from working. How would you balance their needs with security without exempting them entirely?",
   "Why might an attacker prefer to use built-in tools rather than bringing their own malware to a system with allow listing?"
  ],
  "exit": [
   [
    "What does an allow list do with a program that is not on the list?",
    "Blocks it by default, whether or not it is known to be malicious."
   ],
   [
    "Which rule type survives software updates: hash or publisher?",
    "Publisher, because the vendor's signature stays the same while the file hash changes."
   ],
   [
    "What is the purpose of audit mode?",
    "To log what would be blocked without enforcing, so legitimate software can be added before enforcement causes outages."
   ]
  ],
  "differentiation": [
   "Support: Provide a simple decision tree (does it change often? is it signed by a trusted vendor? is it in a folder users can write to?) to guide rule choices during the activity.",
   "Extend: Ask fast finishers to design an exception request process that is fast enough for users but still reviewed, and to name what information the request form should collect."
  ]
 },
 {
  "t": "Patching, encryption, monitoring",
  "objectives": [
   "Students will be able to describe the patch management cycle from asset inventory through verification.",
   "Students will be able to select compensating controls when a system cannot be patched.",
   "Students will be able to explain what encryption at rest and in transit protect, and what they do not.",
   "Students will be able to identify which of patching, encryption or monitoring was missing in an incident scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up prompt aloud and ask students to vote by raising hands. Record the vote, then explain that each control does a different job: prevent, limit, detect."
   ],
   [
    12,
    "Teach",
    "Draw the patch cycle as a circle on the whiteboard (inventory, identify, prioritize, test, deploy, verify). List compensating controls for unpatchable systems. Explain at rest versus in transit and the running-server limit of disk encryption. Finish with what makes monitoring useful: tuning, routing, playbooks, time sync."
   ],
   [
    18,
    "Activity",
    "Run the incident autopsy in groups of three or four, then have each group report its findings."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the three controls."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A company has budget for only one of these this year: a patching program, full disk encryption on laptops, or a monitored SIEM. Which would you pick, and what risk are you accepting by skipping the other two?",
  "activity": {
   "title": "Incident autopsy",
   "materials": "Printed one-page incident summaries (three different fictional incidents: a stolen unencrypted laptop, an exploited unpatched VPN appliance, an attacker active for months with no alerts), sticky notes in three colors, whiteboard.",
   "steps": [
    "Give each group one incident summary.",
    "Groups use one sticky color for 'what failed to prevent', one for 'what failed to limit damage', and one for 'what failed to detect', and place notes on the summary.",
    "Groups decide which single control (patching, encryption or monitoring) would have helped most and write a one-sentence justification.",
    "Groups list two specific actions for the remediation plan, including any compensating controls.",
    "Each group presents in two minutes while the teacher maps the answers onto the prevent, limit, detect columns on the whiteboard."
   ]
  },
  "discussion": [
   "Why do so many breaches involve vulnerabilities that had patches available for months?",
   "If logs are collected but nobody looks at them, is that better than not collecting them at all?"
  ],
  "exit": [
   [
    "What is the first step of patch management?",
    "Maintaining an accurate asset inventory."
   ],
   [
    "A legacy system cannot be patched. Name one compensating control.",
    "Segmentation, virtual patching with an IPS or WAF rule, disabling the vulnerable feature, or increased monitoring."
   ],
   [
    "A powered-off laptop with full disk encryption is stolen. Is the data likely safe? Why?",
    "Yes, likely; without the key the disk contents are unreadable, as long as the key was not stored with the device."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-row reference card: patching prevents known exploits, encryption limits what stolen data reveals, monitoring detects activity, with one example clue word each.",
   "Extend: Ask fast finishers to design an update ring plan for 500 laptops, naming the pilot group, how long each ring waits, and what metric would stop the rollout."
  ]
 },
 {
  "t": "Hardening: disable ports/services, change defaults, remove unused software",
  "objectives": [
   "Students will be able to define attack surface and explain how disabling services, closing ports and removing software reduce it.",
   "Students will be able to identify default credentials and insecure default settings that must be changed before deployment.",
   "Students will be able to explain the role of secure baselines such as CIS Benchmarks and how drift is detected.",
   "Students will be able to apply a hardening checklist to a described device or server."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the whiteboard. Circle any that involve changing locks or removing things, and introduce the word hardening."
   ],
   [
    12,
    "Teach",
    "Define attack surface. Walk through the three headline steps: disable ports and services (stop versus disable), change defaults (every interface), remove unused software. Show the Linux command snippet on the projector and explain each line. Introduce secure baselines, CIS Benchmarks and drift."
   ],
   [
    18,
    "Activity",
    "Run the hardening sprint in groups of three, then compare checklists as a class."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore the tension between hardening and usability."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "You just bought a used car. Before you drive it every day, what would you check, change or remove, and why?",
  "activity": {
   "title": "Hardening sprint",
   "materials": "Printed 'device spec sheets' for three fictional devices (a security camera, a small office router, a new file server) listing enabled services, open ports, default accounts and installed software; a blank checklist template; markers.",
   "steps": [
    "Give each group one device spec sheet and a blank checklist.",
    "Groups cross out every service, port and piece of software they would disable or remove, with a reason for each.",
    "Groups list every credential that must be changed, including on secondary interfaces.",
    "Groups add three baseline settings they would check monthly for drift.",
    "Groups swap sheets with another group, who looks for one thing that was missed, then the class reviews the most commonly missed items."
   ]
  },
  "discussion": [
   "What happens to security when hardening is so strict that it breaks a business application, and how can teams avoid that outcome?",
   "Should organizations refuse to buy devices that cannot have their default passwords changed? What would that cost?"
  ],
  "exit": [
   [
    "What is the usual first hardening step for a new IoT device?",
    "Change the default credentials (and update firmware) before putting it on the network."
   ],
   [
    "A service is stopped but still set to start at boot. Is it hardened?",
    "No; it will come back at reboot, so it must be disabled or removed."
   ],
   [
    "What is configuration drift, and how do you detect it?",
    "Settings moving away from the approved baseline over time; detect it by regularly scanning systems against the baseline."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a starter checklist with three headings (turn off, change, remove) and one example under each to model the reasoning.",
   "Extend: Ask fast finishers to explain how infrastructure as code or configuration management could apply their checklist automatically to 100 servers and alert on drift."
  ]
 },
 {
  "t": "Cloud: IaaS/PaaS/SaaS and shared responsibility",
  "objectives": [
   "Students will be able to distinguish IaaS, PaaS and SaaS by what the customer manages.",
   "Students will be able to assign security responsibilities to provider or customer for a given service model using the shared responsibility model.",
   "Students will be able to explain why data, identities and access remain customer responsibilities in every model.",
   "Students will be able to compare public, private, community, hybrid and multicloud deployment models and identify when a CASB or CSPM applies."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the pizza options. Draw four columns on the whiteboard (home, rented kitchen, take-and-bake, restaurant) and record who does what."
   ],
   [
    12,
    "Teach",
    "Relabel the pizza columns as on premises, IaaS, PaaS and SaaS. Draw a layer stack (facilities, hardware, hypervisor, OS, runtime, application, data, identity) and shade provider versus customer for each model. Stress security of the cloud versus in the cloud. Briefly cover deployment models, CASB and CSPM."
   ],
   [
    18,
    "Activity",
    "Run the responsibility sort with printed cards, then the breach blame round."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to address the 'it's the provider's fault' instinct."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "You want pizza tonight. You can make it from scratch, rent a kitchen, buy a take-and-bake pizza, or eat at a restaurant. For each option, who is responsible if the pizza is burned? Who is responsible if your wallet goes missing?",
  "activity": {
   "title": "Responsibility sort and breach blame",
   "materials": "Printed cards with one responsibility each (patch guest OS, secure data center doors, configure storage access, enable MFA for users, patch database engine, write secure application code, maintain hypervisor, classify data, remove departed employees); a whiteboard grid with rows IaaS, PaaS, SaaS and columns Provider and Customer; sticky notes.",
   "steps": [
    "Give each group a full set of responsibility cards.",
    "For each service model row, groups place every card under Provider or Customer on their own copy of the grid.",
    "The teacher reveals the answer key on the projector; groups mark any differences and explain their reasoning for one disagreement.",
    "Breach blame round: the teacher reads three short breach scenarios (unpatched IaaS VM, public storage bucket, hypervisor flaw exposing another tenant). Groups hold up a sticky note reading Provider or Customer for each.",
    "Discuss any split votes and connect each to the layer stack on the whiteboard."
   ]
  },
  "discussion": [
   "Why do so many people assume the cloud provider is responsible for a breach, and how would you explain the shared responsibility model to a non-technical executive?",
   "What are the security trade-offs of a multicloud strategy compared with using a single provider?"
  ],
  "exit": [
   [
    "In IaaS, who patches the guest operating system?",
    "The customer."
   ],
   [
    "Name one responsibility that stays with the customer in every service model.",
    "Its data, its user identities and access (such as MFA and removing leavers), or its configuration choices."
   ],
   [
    "Which tool gives visibility and control over employees' use of SaaS applications?",
    "A cloud access security broker (CASB)."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a printed layer-stack diagram with the provider's portion already shaded for IaaS, so they only need to extend the shading for PaaS and SaaS.",
   "Extend: Ask fast finishers to write a short responsibility matrix for a hybrid setup where an on-premises directory syncs identities to a SaaS email service, noting who protects the sync connection."
  ]
 },
 {
  "t": "IaC, serverless, microservices, containers",
  "objectives": [
   "Students will be able to describe IaC, serverless, microservices and containers and identify each from a scenario.",
   "Students will be able to explain the main security advantage and the main new risk of each architecture.",
   "Students will be able to compare container isolation with virtual machine isolation, citing the shared kernel.",
   "Students will be able to recommend pipeline controls such as template scanning, image scanning and least-privilege function roles."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers. Point out that a copied mistake is the central risk of automation, which ties all four architectures together."
   ],
   [
    13,
    "Teach",
    "Define each architecture with a one-line picture on the whiteboard: a template file (IaC), a lightning bolt triggering a function (serverless), many small boxes with arrows (microservices), apartments sharing a foundation (containers). Show the IaC snippet on the projector and ask students to spot what a reviewer checks. For each, name one advantage and one risk."
   ],
   [
    17,
    "Activity",
    "Run the architecture risk match, then the pipeline gate design."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A restaurant chain sends the same recipe card to 200 locations. What is great about that, and what happens if the card has a mistake?",
  "activity": {
   "title": "Architecture risk match and pipeline gates",
   "materials": "Printed scenario cards (eight short descriptions such as 'function has full storage access', 'base image has outdated library', 'template opens database to 0.0.0.0/0', 'search service can call payment service with no authentication'), a whiteboard with four columns labeled IaC, Serverless, Microservices, Containers, and sticky notes.",
   "steps": [
    "Groups draw scenario cards and tape each under the correct architecture column on the whiteboard.",
    "For each card, groups write one control on a sticky note and attach it next to the card.",
    "The teacher draws a simple pipeline on the whiteboard: code commit, build, test, deploy.",
    "Groups decide at which pipeline stage each of their controls belongs (for example, template scanning before deploy, image scanning at build) and move their sticky notes there.",
    "The class reviews the finished pipeline and identifies one control that cannot live in the pipeline, such as runtime monitoring."
   ]
  },
  "discussion": [
   "If containers are less isolated than virtual machines, why do so many organizations run them, and when would you choose a VM instead?",
   "Who should be allowed to approve infrastructure template changes, and how is that like a change advisory board?"
  ],
  "exit": [
   [
    "What is the key isolation risk of containers compared with VMs?",
    "Containers share the host kernel, so a kernel flaw or escape can affect all containers on that host."
   ],
   [
    "Name one security responsibility the customer keeps in serverless.",
    "Function code, dependencies, permissions, input validation or the data handled."
   ],
   [
    "What is the main risk of an insecure IaC template?",
    "The same misconfiguration is replicated everywhere the template is used."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a four-row table with the architecture name, a picture cue and one risk filled in for the first row, so they complete the remaining rows by pattern.",
   "Extend: Ask fast finishers to explain how immutable infrastructure changes incident response, for example what evidence is lost when a compromised container is simply replaced."
  ]
 },
 {
  "t": "Virtualization risks: VM escape, sprawl",
  "objectives": [
   "Students will be able to compare Type 1 and Type 2 hypervisors and explain which has the smaller attack surface.",
   "Students will be able to explain VM escape and identify its primary mitigations.",
   "Students will be able to describe VM sprawl and propose governance controls that prevent it.",
   "Students will be able to recognize resource reuse and snapshot risks in a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Collect answers and highlight the two themes that emerge: breaking through the walls, and forgotten rooms nobody manages."
   ],
   [
    12,
    "Teach",
    "Draw two stacks on the whiteboard: hardware, hypervisor, VMs (Type 1) and hardware, host OS, hypervisor, VMs (Type 2). Explain VM escape with an arrow from a guest into the hypervisor layer and list mitigations. Explain VM sprawl, resource reuse and snapshot risks with one example each."
   ],
   [
    18,
    "Activity",
    "Run the inventory reconciliation activity in pairs, then share decisions as a class."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Imagine a storage facility with hundreds of rented units. What could go wrong if the walls between units were weak? What could go wrong if nobody kept track of who rents which units?",
  "activity": {
   "title": "Inventory reconciliation",
   "materials": "Two printed lists per pair: a 'hypervisor console export' of 25 fictional VMs (name, power state, operating system, internet-facing yes or no, last patched date) and an 'asset inventory' of 17 VMs with owners; highlighters; whiteboard.",
   "steps": [
    "Pairs compare the two lists and highlight every VM that appears in the console but not the inventory.",
    "For each unmatched VM, pairs choose an action: find the owner, shut down and archive, or delete securely, and note why.",
    "Pairs flag the three highest-risk VMs (for example, internet-facing and running an end-of-life operating system) and justify the ranking.",
    "Pairs write three policy rules that would prevent the gap from reappearing.",
    "The class combines the best policy rules on the whiteboard into a single VM lifecycle policy."
   ]
  },
  "discussion": [
   "Why are organizations often reluctant to delete old VMs even when no one claims them, and how can a process address that fear?",
   "If you were a cloud customer, what would you want to know about how your provider handles resource reuse and hypervisor patching?"
  ],
  "exit": [
   [
    "Which hypervisor type runs directly on hardware?",
    "Type 1 (bare-metal)."
   ],
   [
    "What is the primary mitigation for VM escape?",
    "Patching the hypervisor promptly, supported by removing unneeded virtual hardware and guest-to-host features."
   ],
   [
    "An audit finds dozens of unowned, unpatched test VMs. Name the risk and one control.",
    "VM sprawl; controls include owner tags, expiration dates and regular reconciliation against the inventory."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column cheat card (VM escape: technical, fix with patching and minimal virtual hardware; VM sprawl: governance, fix with ownership and lifecycle) for students to reference during the activity.",
   "Extend: Ask fast finishers to compare VM escape with container escape and explain why the shared kernel makes container escape a bigger concern."
  ]
 },
 {
  "t": "ICS/SCADA, IoT, embedded, RTOS",
  "objectives": [
   "Students will be able to define ICS, SCADA, PLC, HMI, IoT, embedded systems and RTOS and identify each from a scenario.",
   "Students will be able to explain why availability and safety outrank confidentiality in industrial environments.",
   "Students will be able to list the constraints that make these systems hard to secure, such as limited compute, inability to patch and vendor control.",
   "Students will be able to recommend compensating controls such as segmentation, data diodes, jump hosts and passive monitoring for unpatchable devices."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Record answers and point out that physical consequences change which security goal comes first."
   ],
   [
    12,
    "Teach",
    "Draw a simple SCADA diagram on the whiteboard: field PLCs, an HMI, a central server, and a firewall separating it from the office network. Define each term. Introduce IoT, embedded systems and RTOS with everyday examples. List the constraints and contrast CIA priorities with AIC in the plant."
   ],
   [
    18,
    "Activity",
    "Run the defend-the-plant whiteboard exercise in groups of four."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "If a hacker steals your email, you lose privacy. If a hacker takes over a water treatment plant's controls, what could happen? Which matters more in that plant: keeping data secret or keeping the process running safely?",
  "activity": {
   "title": "Defend the plant",
   "materials": "Whiteboard or large paper per group, markers, and printed constraint cards (PLCs cannot be patched without vendor certification; scanners have crashed devices before; engineers need remote access at night; 50 IoT cameras with default passwords; plant data must reach the business office).",
   "steps": [
    "Each group draws a simple network with an office zone, a plant zone and the internet.",
    "Groups draw one constraint card at a time and add a control to their diagram that addresses it, such as a firewall, data diode, jump host with MFA, IoT VLAN or passive monitor.",
    "After all cards are placed, groups trace one attack path (a phished office PC trying to reach a PLC) and mark every control that would stop or detect it.",
    "Groups label any control that serves as a compensating control for an unpatchable device.",
    "Two groups present their diagrams, and the class identifies one weakness in each."
   ]
  },
  "discussion": [
   "Should manufacturers be required to support device updates for a set period? Who bears the cost if they do not?",
   "How would you persuade a plant supervisor that convenient remote access is worth controlling, without making engineers' jobs impossible?"
  ],
  "exit": [
   [
    "Which security goal usually comes first in an ICS environment?",
    "Availability, along with safety."
   ],
   [
    "What is the best compensating control for a PLC that cannot be patched?",
    "Segmentation or isolation of the device on a restricted network, with tightly controlled access paths."
   ],
   [
    "What defines an RTOS?",
    "It responds to events within strict, predictable time limits."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a labeled SCADA diagram with blanks for PLC, HMI, server and firewall to fill in before the activity, plus a word bank of controls.",
   "Extend: Ask fast finishers to explain how a data diode differs from a firewall, and to identify one situation where a one-way connection would not be enough."
  ]
 },
 {
  "t": "On-prem vs cloud vs hybrid trade-offs",
  "objectives": [
   "Students will be able to explain the control, cost, responsibility and resilience trade-offs of on-premises, cloud and hybrid architectures.",
   "Students will be able to compare architectures using the SY0-701 considerations, including availability, scalability, risk transference, inability to patch and data sovereignty.",
   "Students will be able to recommend and justify an architecture for a scenario by identifying its deciding requirement.",
   "Students will be able to identify the security risks a hybrid design introduces and propose controls that reduce them."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take three or four quick answers. Write 'it depends on...' on the board and collect the factors students name."
   ],
   [
    12,
    "Teach",
    "Walk through on premises, cloud and hybrid using a three-column table on the whiteboard (control, cost, responsibility, resilience, compliance). Add the SY0-701 consideration list and define data sovereignty and risk transference, stressing that accountability never transfers."
   ],
   [
    18,
    "Activity",
    "Run 'Where does it live?' in groups of three or four. Groups place each scenario card on a wall chart labeled on premises, cloud or hybrid, and write the deciding requirement and one risk on a sticky note."
   ],
   [
    6,
    "Discuss",
    "Each group defends one placement. Challenge any card where groups disagree and ask which consideration tipped the decision."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions on an index card or paper slip and hand it in on the way out."
   ]
  ],
  "warmup": "Your manager says, 'Let's move everything to the cloud, because it is more secure.' Is that statement true, false, or 'it depends'? Name one thing it depends on.",
  "activity": {
   "title": "Where does it live?",
   "materials": "Whiteboard divided into three columns (on premises, cloud, hybrid), eight printed scenario cards per group (for example: a legacy unpatchable lab system, a seasonal ticketing website, a hospital EHR tied to on-site devices, citizen records that must stay in-country, a startup with no IT staff, a disaster recovery site), sticky notes and markers.",
   "steps": [
    "Give each group a set of scenario cards and a pad of sticky notes.",
    "For each card, groups decide where the workload should run and tape the card in that column.",
    "On a sticky note next to each card, groups write the deciding requirement (for example 'elastic scaling' or 'inability to patch') and one security risk of their choice.",
    "For any card placed in hybrid, groups must also name one control that closes a hybrid gap, such as a single identity provider or a SIEM collecting logs from both environments.",
    "Groups rotate once to review another group's wall and add a sticky note if they disagree with a placement."
   ]
  },
  "discussion": [
   "When might a small company actually be more secure in the cloud than on premises, and when might the opposite be true?",
   "If a cloud provider has an outage that takes your service down, who is accountable to your customers, and what could you have designed differently?",
   "Why do hybrid environments so often have monitoring blind spots, and who should own closing them?"
  ],
  "exit": [
   [
    "A regulator says patient data may not leave the country. Name two architecture options that satisfy this.",
    "Keep the data on premises in that country, or use a cloud provider region located within that country (data sovereignty)."
   ],
   [
    "Does moving a workload to the cloud transfer compliance accountability? Explain briefly.",
    "No. Contracts and SLAs transfer some operational risk, but the organization stays accountable for its data and compliance."
   ],
   [
    "Name the main security drawback of a hybrid architecture and one control that reduces it.",
    "Complexity and inconsistent policy or visibility across two environments; controls include a single identity provider with MFA, a SIEM collecting logs from both, and tightly scoped site-to-site links."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page clue-word sheet ('full control' means on premises, 'rapid scaling' means cloud, 'legacy plus new' means hybrid) and let them sort the scenario cards using it before explaining their reasoning aloud.",
   "Extend: Ask fast finishers to write a one-paragraph recommendation to a fictional chief financial officer for the hospital scenario, covering cost (CapEx versus OpEx), egress and lock-in, data sovereignty, and how the design stays available if one cloud region fails."
  ]
 },
 {
  "t": "Firewalls (L4/L7, NGFW), WAF, UTM",
  "objectives": [
   "Students will be able to explain the difference between stateless, stateful Layer 4 and Layer 7 firewalls in terms of what each can inspect.",
   "Students will be able to compare NGFW, WAF and UTM by purpose, placement and typical customer.",
   "Students will be able to select the appropriate firewall type for a given threat scenario and justify the choice.",
   "Students will be able to evaluate a short rule set for ordering problems and the effect of the implicit deny."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up scenario on the projector and collect answers by show of hands: 'blocked' or 'allowed'. Leave the question open."
   ],
   [
    12,
    "Teach",
    "Draw the OSI stack on the board and mark where each firewall type looks. Explain stateful tracking with a simple state table, then NGFW, WAF and UTM. Resolve the warm-up: the attack rode in on an allowed port."
   ],
   [
    15,
    "Activity",
    "Groups work through 'Which firewall stops it?' cards and then fix a printed rule set that has ordering errors."
   ],
   [
    8,
    "Discuss",
    "Groups share their answers for the hardest cards and the rule set fixes. Discuss TLS inspection trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions individually on paper."
   ]
  ],
  "warmup": "A web server sits behind a firewall that allows only TCP port 443 from the internet. An attacker sends a SQL injection string in a search request to that server. Does the firewall block it? Why or why not?",
  "activity": {
   "title": "Which firewall stops it?",
   "materials": "Printed threat cards (about ten per group, for example: SQL injection on port 443, unsolicited inbound connection to port 3389, staff uploading to personal cloud storage, a small office needing VPN plus antivirus plus filtering, XSS against a customer portal, malware download over HTTPS), a printed six-line rule set with a broad 'allow any' rule placed too high, whiteboard and markers.",
   "steps": [
    "In groups of three, students sort each threat card under one heading on their desk: stateless filter, stateful Layer 4, NGFW, WAF or UTM, choosing the least complex device that actually stops the threat.",
    "For each card, groups write one sentence explaining what the device sees that makes it effective.",
    "Groups then read the printed rule set top-down, applying first match wins, and identify which intended block is overridden by an earlier rule.",
    "Groups rewrite the rule set in the correct order, add a business reason to each rule, and note where the implicit deny applies.",
    "One volunteer from each group writes their corrected rule order on the whiteboard for comparison."
   ]
  },
  "discussion": [
   "TLS inspection lets an NGFW see threats inside encrypted traffic. What privacy and trust problems does it create, and which categories of traffic might you exempt?",
   "Why would a bank buy both NGFWs and a separate WAF instead of one UTM?",
   "If a WAF can virtually patch a flaw, why should developers still fix the code?"
  ],
  "exit": [
   [
    "Which firewall type is designed to block SQL injection and XSS against a hosted web application?",
    "A web application firewall (WAF)."
   ],
   [
    "What does a stateful firewall track that a stateless packet filter does not?",
    "The state of connections, so return traffic for established sessions is allowed automatically and unsolicited inbound traffic is blocked."
   ],
   [
    "A small business wants firewall, VPN, antivirus and web filtering in one box. Name the device and one drawback.",
    "A UTM appliance; drawbacks include being a single point of failure and reduced performance with all features enabled."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card showing each firewall type next to 'what it can see' (addresses and ports, connection state, applications and users, HTTP requests) and have struggling students match threats by asking 'where does this attack live?'",
   "Extend: Have fast finishers sketch a network diagram for a mid-size online retailer showing perimeter firewall, screened subnet, WAF, internal segmentation firewall and host-based firewalls, and label which threat each layer stops."
  ]
 },
 {
  "t": "IDS vs IPS, inline vs tap",
  "objectives": [
   "Students will be able to explain the difference between an IDS and an IPS in terms of placement (passive versus inline) and action (alert versus block).",
   "Students will be able to compare signature-based and anomaly-based detection, including which can detect zero-day attacks and the false positive trade-off.",
   "Students will be able to classify alert outcomes as true positive, false positive, false negative or true negative.",
   "Students will be able to recommend a sensor placement (tap, SPAN, inline, host-based) for a given scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the security camera versus the guard and take a few answers to surface the alert-versus-block idea."
   ],
   [
    12,
    "Teach",
    "Draw two network diagrams: one with a tap feeding an IDS off to the side, one with an IPS in the path. Explain SPAN versus tap, network versus host-based sensors, then signature versus anomaly detection. Draw a two-by-two grid for the four outcomes."
   ],
   [
    15,
    "Activity",
    "Groups run the 'Alert triage' card sort, classifying alert outcomes and deciding what each sensor could have done."
   ],
   [
    8,
    "Discuss",
    "Review the trickiest cards, then discuss when to move from IDS to IPS and how to choose a failure mode."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A store has a security camera with a guard watching the monitors, and a second guard standing at the door. Which one can actually stop a shoplifter from leaving, and what does the other one contribute?",
  "activity": {
   "title": "Alert triage",
   "materials": "Printed event cards (about twelve per group), each describing an event and what the sensor did (for example: 'nightly backup flagged as data exfiltration', 'known exploit signature matched and dropped', 'ransomware spread with no alert', 'normal login, no alert'); a printed two-by-two grid labeled true positive, false positive, false negative, true negative; whiteboard and markers.",
   "steps": [
    "In groups of three or four, students place each event card in the correct square of the outcome grid.",
    "For each card, groups note whether the sensor was acting as an IDS or IPS and whether it was fed by a tap, SPAN port, inline placement or host agent.",
    "For every false positive, groups propose a tuning change that would not create a false negative, such as narrowing the rule's scope.",
    "For every false negative, groups name a sensor type or detection method that might have caught it (for example host-based detection for encrypted traffic, or anomaly-based detection for a new attack).",
    "Groups pick their single most dangerous card and explain why on the whiteboard."
   ]
  },
  "discussion": [
   "If an IPS blocks legitimate customer traffic for an hour, who should decide whether to keep blocking mode on, and what information do they need?",
   "Why might an organization run an IDS and an IPS at the same time on different segments?",
   "How does widespread encryption change where you would place intrusion sensors?"
  ],
  "exit": [
   [
    "A sensor receives a copy of traffic from a SPAN port. Is it an IDS or an IPS, and can it block traffic?",
    "An IDS; it cannot block because the original packets reach their destination regardless."
   ],
   [
    "Which detection method can find a zero-day attack, and what is its main downside?",
    "Anomaly-based (behavior-based) detection; it tends to produce more false positives."
   ],
   [
    "Ransomware spreads through a network and the IDS raises no alert. Name this outcome and say why it is the most dangerous.",
    "A false negative; it is most dangerous because nobody knows the attack is happening, so nobody responds."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference strip with the two-by-two grid filled in with plain words ('real attack, alert fired' and so on) and let them classify cards with it, then explain one card aloud using the correct term.",
   "Extend: Ask fast finishers to write a short staged rollout plan for moving a sensor from passive IDS to inline IPS, including a tuning period, which rules go to blocking first, the chosen failure mode and how the team will be alerted if the IPS fails."
  ]
 },
 {
  "t": "Fail-open vs fail-closed",
  "objectives": [
   "Students will be able to explain the difference between fail-open and fail-closed and the availability versus security trade-off each represents.",
   "Students will be able to distinguish fail-safe and fail-secure physical locks and apply the life safety rule.",
   "Students will be able to recommend and justify a failure mode for network devices, physical doors and software access checks in a given scenario.",
   "Students will be able to describe how redundancy and monitoring reduce the cost of either failure mode."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the store's electric doors during a blackout and collect answers. Write 'open' and 'locked' on the board and note the reasons students give."
   ],
   [
    10,
    "Teach",
    "Define fail-open and fail-closed for inline network devices, then cover fail-safe and fail-secure doors, stressing that fail-safe means unlocked. Add software failure modes with a login example. Finish with redundancy and monitoring."
   ],
   [
    18,
    "Activity",
    "Run the 'Lights out' role-play: groups act as a risk committee assigning failure modes to scenario cards and defending them."
   ],
   [
    7,
    "Discuss",
    "Compare group decisions, focusing on cards where groups disagreed. Ask what redundancy or monitoring would change."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "The power goes out in a shopping mall. Should the electronic doors at the main exit stay locked or unlock? What about the door to the jewelry store's safe room? Why might the answers differ?",
  "activity": {
   "title": "Lights out: the failure mode committee",
   "materials": "Printed scenario cards (about eight per group: an IPS on a hospital clinical network, a firewall in front of a payment segment, a fire exit door, a data center cage door, a login service that cannot reach its identity provider, a WAF in front of a revenue-critical store, a badge reader on a server room, a guest Wi-Fi IPS), printed role cards (system owner, security lead, facilities or safety officer, business manager), sticky notes, whiteboard.",
   "steps": [
    "Form groups of four and hand out one role card per student. Each role argues for its priority: the business manager for availability, the security lead for confidentiality, the safety officer for life safety, the system owner for the final call.",
    "For each scenario card, the group debates for about two minutes and the system owner records the chosen failure mode (fail-open, fail-closed, fail-safe or fail-secure) on a sticky note.",
    "Under each decision, the group writes one compensating measure, such as a high-availability pair, a bypass alert to the SOC, or an inside push bar on a fail-secure door.",
    "Groups post their sticky notes on the whiteboard grid by scenario so the class can see where decisions differ.",
    "The teacher reveals the expected answer for each card and asks one group to defend any card that differs."
   ]
  },
  "discussion": [
   "Why is it dangerous to leave a failure mode at the vendor default rather than deciding it through a risk assessment?",
   "Can you think of a situation where failing closed would actually create a safety risk rather than reduce one?",
   "How would you prove to an auditor that a fail-open device does not go unnoticed when it fails?"
  ],
  "exit": [
   [
    "Which failure mode favors availability, and which favors confidentiality?",
    "Fail-open favors availability; fail-closed favors confidentiality and integrity."
   ],
   [
    "Should a fire exit door's electronic lock be fail-safe or fail-secure, and what happens on power loss?",
    "Fail-safe; it unlocks on power loss so people can escape, because life safety wins."
   ],
   [
    "Name one way to reduce the outage risk of a fail-closed firewall.",
    "Deploy redundant firewalls as a high-availability pair (or cluster) so one can fail while the other keeps passing traffic."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-question decision aid: 'Could someone be hurt if this stays locked or blocked?' then 'Which is worse here, downtime or exposure?' and have them apply it to each scenario card.",
   "Extend: Ask fast finishers to review a short pseudocode login function the teacher writes on the board, find the error path that fails open, and rewrite it to fail closed, then explain how they would test the behavior."
  ]
 },
 {
  "t": "802.1X, NAC, port security",
  "objectives": [
   "Students will be able to identify the supplicant, authenticator and authentication server in an 802.1X exchange and explain what each does.",
   "Students will be able to compare EAP-TLS with PEAP and EAP-TTLS, including why server certificate validation matters.",
   "Students will be able to explain how NAC posture assessment and quarantine work, and distinguish persistent, dissolvable and agentless approaches.",
   "Students will be able to evaluate the strengths and weaknesses of port security and design an edge access policy that combines all three tools."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up about the unlabeled box in the conference room jack and list students' ideas for stopping it on the board."
   ],
   [
    12,
    "Teach",
    "Explain 802.1X roles with a three-box diagram and arrows, then EAP methods. Add NAC posture checks and the remediation VLAN, then port security, showing the sample switch configuration on the projector."
   ],
   [
    16,
    "Activity",
    "Run the 'Who gets in?' 802.1X role-play, then have groups route device cards through the NAC decision."
   ],
   [
    7,
    "Discuss",
    "Debrief the role-play and discuss weaknesses: MAC spoofing, PEAP without certificate validation, live unused jacks."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Someone plugs an unknown device into a live wall jack in your conference room. List every way you can think of that the network could stop it from getting access.",
  "activity": {
   "title": "Who gets in? An 802.1X and NAC role-play",
   "materials": "Printed role badges (supplicant, authenticator, RADIUS server, NAC policy engine), printed device cards describing each device (company laptop with valid certificate and current patches; company laptop with expired patches; contractor's personal laptop; printer with no 802.1X support; device with a spoofed printer MAC address), sticky notes, and three areas of the room labeled corporate VLAN, remediation VLAN and guest VLAN.",
   "steps": [
    "Assign four students to the roles. The supplicant holds a device card and may only speak to the authenticator, who may only pass EAP messages to the RADIUS server.",
    "The RADIUS server checks the card's credentials against a printed 'directory' list and returns accept or reject; the NAC policy engine then checks posture and names the VLAN.",
    "The authenticator walks the supplicant to the correct area of the room. Repeat with each device card, rotating students through the roles.",
    "For the printer and spoofed-MAC cards, the class discusses what port security can and cannot catch and what compensating controls would help.",
    "Each group writes one sticky note naming the weakest point they found in the design and posts it on the board."
   ]
  },
  "discussion": [
   "Why do printers, cameras and other devices that cannot run 802.1X create a weak spot, and how would you limit the damage if one is spoofed?",
   "What is the trade-off between requiring EAP-TLS certificates for every device and allowing PEAP with passwords?",
   "Should a laptop that fails posture checks be denied completely or sent to a remediation network? What are the consequences of each?"
  ],
  "exit": [
   [
    "Name the three 802.1X roles and give an example of each.",
    "Supplicant (a laptop or its client software), authenticator (a switch or wireless access point), authentication server (usually a RADIUS server)."
   ],
   [
    "A company laptop missing critical patches connects to the network. What does NAC typically do?",
    "Places it in a quarantine or remediation network that can reach only update servers until it is compliant, then moves it to the normal network."
   ],
   [
    "Why is port security weaker than 802.1X for authenticating devices?",
    "Port security relies on MAC addresses, which are easy to spoof, while 802.1X authenticates with credentials or certificates checked by a RADIUS server."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students the three-box diagram with blanks and a word bank (supplicant, authenticator, authentication server, RADIUS, EAP) to label, and let them play the supplicant role first since it has the simplest script.",
   "Extend: Ask fast finishers to read the sample port security configuration and explain each line, then propose how to change it for a printer port that should allow exactly one known device and only log violations instead of shutting down."
  ]
 },
 {
  "t": "VPN, IPsec, TLS, SD-WAN, SASE, jump servers, proxies",
  "objectives": [
   "Students will be able to compare site-to-site and remote access VPNs and explain the security trade-off between full and split tunneling.",
   "Students will be able to distinguish IPsec AH from ESP and transport mode from tunnel mode, and explain when a TLS VPN is preferred.",
   "Students will be able to explain how SD-WAN and SASE change branch and remote traffic routing and security.",
   "Students will be able to select a jump server, forward proxy or reverse proxy for a given access scenario and justify the choice."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up help-desk ticket aloud and take a quick vote: approve split tunneling or not. Record the reasons on the board without judging them yet."
   ],
   [
    14,
    "Teach",
    "Draw headquarters, a branch, a remote worker and a cloud service on the board. Add a site-to-site tunnel, a remote access tunnel (full versus split), then explain IPsec AH, ESP and the two modes using the envelope analogy. Add SD-WAN and SASE, then a jump server and both proxy types."
   ],
   [
    15,
    "Activity",
    "Groups play 'Draw the path', annotating printed network maps to solve connection scenarios."
   ],
   [
    7,
    "Discuss",
    "Groups present one scenario each. Return to the warm-up vote and see whether anyone changed their mind."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A help-desk ticket reads: 'The VPN is slow when I watch training videos. Can you turn on split tunneling?' Would you approve it? What would you gain and what would you lose?",
  "activity": {
   "title": "Draw the path",
   "materials": "Printed network maps (one per group) showing headquarters, two branches, a home worker, a cloud application and a production server segment; printed scenario cards (connect a new branch, remote worker behind a restrictive hotel firewall, administrators reaching production servers, protecting a public web application, filtering staff browsing, replacing costly branch circuits with broadband plus cloud security); colored markers.",
   "steps": [
    "Give each group a map and three or four scenario cards.",
    "For each scenario, groups draw the traffic path on the map in a different color and label the technology used (site-to-site IPsec in tunnel mode with ESP, TLS remote access VPN, jump server, forward proxy, reverse proxy, SD-WAN, SASE).",
    "Next to each path, groups write one sentence on what the technology protects and one weakness or risk it introduces.",
    "Groups swap maps with a neighbor, who checks the labels against the exam clue words and circles anything they disagree with.",
    "The teacher collects one disputed path per group to resolve during the discussion."
   ]
  },
  "discussion": [
   "If a SASE provider enforces security in its cloud, what new dependencies and risks does the organization take on?",
   "Why is a jump server both a strong control and a high-value target? How would you protect it?",
   "When might an organization accept split tunneling despite its risks, and what compensating controls could it use?"
  ],
  "exit": [
   [
    "Which IPsec protocol provides encryption, and which provides integrity only?",
    "ESP provides encryption plus integrity and authentication; AH provides integrity and authentication without encryption."
   ],
   [
    "Which IPsec mode encrypts the entire original packet, and where is it typically used?",
    "Tunnel mode; it is used between gateways in site-to-site VPNs."
   ],
   [
    "A server sits in front of web servers, load balancing inbound requests and terminating TLS. What is it?",
    "A reverse proxy."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column cheat card (AH versus ESP, transport versus tunnel, full versus split, forward versus reverse) with one plain-language line each, and pair struggling students with a partner to label the map together.",
   "Extend: Ask fast finishers to write a short design for a company with 30 branches and many remote workers that uses SD-WAN, SASE and a jump server, explaining where encryption begins and ends on each path and where traffic is inspected."
  ]
 },
 {
  "t": "Data types and classifications",
  "objectives": [
   "Students will be able to identify common data types, including regulated data, PII, PHI, financial information, trade secrets, intellectual property and legal information.",
   "Students will be able to compare commercial and government classification schemes and order their levels by sensitivity.",
   "Students will be able to explain the roles of data owner, custodian and user in a classification program.",
   "Students will be able to apply a classification scheme to sample data and link each label to appropriate handling controls."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up question on the projector and have students jot their ranking privately before sharing with a neighbor."
   ],
   [
    12,
    "Teach",
    "Walk through data types with quick examples, then the commercial and government label ladders drawn on the board. Explain owner versus custodian and the reclassification idea. Highlight combined identifiers using the postcode, birth date and gender example."
   ],
   [
    16,
    "Activity",
    "Groups run the 'Label the drive' sort, classifying printed file cards and attaching handling rules."
   ],
   [
    7,
    "Discuss",
    "Groups compare labels for disputed cards and discuss who would have the authority to decide."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Rank these from least to most sensitive and be ready to explain: the company's lunch menu, an employee's salary, the customer email list, the secret sauce recipe, next quarter's unreleased earnings.",
  "activity": {
   "title": "Label the drive",
   "materials": "Printed file cards (about fifteen per group) describing files on a fictional company's shared drive, such as a public price list, an employee handbook, a customer database, payroll records, a patient intake form, proprietary source code, signed contracts, a press release draft, a survey export with postcode, birth date and gender; sticky notes in four colors for public, internal, confidential and restricted; a whiteboard grid.",
   "steps": [
    "Groups of three or four sort each file card by data type (PII, PHI, financial, trade secret, intellectual property, legal, or none) and write the type on the card.",
    "Groups then assign a classification label by attaching a colored sticky note.",
    "For each confidential or restricted card, groups write two handling rules, such as encryption at rest and in transit, MFA, or DLP monitoring.",
    "Groups name who would be the data owner for three of the cards (for example the head of HR for payroll) and who would be the custodian.",
    "Groups pick one card whose label should change over time and describe the event that triggers reclassification."
   ]
  },
  "discussion": [
   "What happens in practice when a company has six or seven classification levels? How would you know whether staff are labeling consistently?",
   "Why should a business leader rather than IT decide a data set's classification? What could go wrong if IT decides?",
   "How does knowing where data is stored change your response if it is exposed?"
  ],
  "exit": [
   [
    "Who decides a data set's classification, and who implements the controls?",
    "The data owner decides; the data custodian (often IT) implements the controls."
   ],
   [
    "Put these government levels in order from lowest to highest: secret, unclassified, top secret, confidential.",
    "Unclassified, confidential, secret, top secret."
   ],
   [
    "Why can a data set without names still be PII? Give an example.",
    "Combinations of attributes can identify people, such as postcode plus date of birth plus gender."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference sheet with each data type, a one-line definition and an example, plus the four-level commercial ladder, and let them sort only the first eight cards before joining the group discussion.",
   "Extend: Ask fast finishers to draft a one-page data handling standard for the fictional company that maps each classification level to rules for storage, transmission, sharing, retention and disposal."
  ]
 },
 {
  "t": "Data states: at rest, in transit, in use",
  "objectives": [
   "Students will be able to define data at rest, in transit and in use and identify the state described in a scenario.",
   "Students will be able to match each data state with appropriate controls, such as FDE and database encryption, TLS, VPN and SSH, and masking, access control and secure enclaves.",
   "Students will be able to trace a single piece of data through all three states and identify the control at each step.",
   "Students will be able to analyze a breach scenario to determine which state was unprotected and which control would have prevented it."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about where a credit card number lives during a purchase and list student answers on the board."
   ],
   [
    12,
    "Teach",
    "Draw three columns for at rest, in transit and in use. Fill in examples, threats and controls for each. Stress the common confusions: FDE on a running laptop, TLS after arrival, and why data in use is hardest. Introduce confidential computing briefly."
   ],
   [
    16,
    "Activity",
    "Groups run 'Follow the data', tracing a data journey with sticky notes and then diagnosing breach cards."
   ],
   [
    7,
    "Discuss",
    "Groups share their breach diagnoses and discuss which state organizations most often neglect."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "You buy a coffee with a card. List every place the card number exists, even for a fraction of a second, between the tap of your card and your bank statement.",
  "activity": {
   "title": "Follow the data",
   "materials": "Whiteboard or chart paper with a journey drawn as a row of boxes (customer browser, network, web server memory, database, backup, offsite copy, staff screen), sticky notes in three colors for at rest, in transit and in use, and printed breach cards (stolen laptop, public Wi-Fi interception, memory-scraping malware on point-of-sale terminals, exposed storage bucket, shoulder surfing at a front desk, downgrade attack).",
   "steps": [
    "Groups of three or four place a colored sticky note on each box in the journey to mark the data state at that step.",
    "On each sticky note, groups write one control that protects the data at that step, such as TLS, column-level encryption, encrypted backups or masking.",
    "Groups then draw three breach cards and, for each, identify the state that was attacked and the control that would have prevented or limited it.",
    "Groups check each other's work by swapping breach cards with a neighboring group and comparing answers.",
    "Each group writes its most surprising finding on the whiteboard in one sentence."
   ]
  },
  "discussion": [
   "Why do so many organizations protect data at rest and in transit carefully but neglect data in use?",
   "A backup tape on a truck is moving. Is it in transit or at rest, and why does the answer matter for the control you choose?",
   "Zero trust encourages encrypting internal traffic. What are the costs of doing that, and are they worth it?"
  ],
  "exit": [
   [
    "Which data state does memory-scraping malware on a point-of-sale terminal target?",
    "Data in use."
   ],
   [
    "Name one control for each state: at rest, in transit, in use.",
    "At rest: full disk or database encryption; in transit: TLS, VPN or SSH; in use: access control, masking, endpoint protection or secure enclaves."
   ],
   [
    "Does full disk encryption protect files on a laptop that is powered on and logged in? Explain.",
    "No; FDE protects data at rest when the device is off or locked. Once unlocked, files are readable by the user and any malware running as the user."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-column reference card with clue words (stored, network, memory) and two example controls per state, and let them place sticky notes on the first four journey boxes with a partner before working alone.",
   "Extend: Ask fast finishers to explain how point-to-point encryption in a card reader changes which states the card number passes through on the terminal, and to research the idea of confidential computing well enough to explain its purpose to the class in two minutes without naming specific products."
  ]
 },
 {
  "t": "Protection: encryption, hashing, masking, tokenization, DLP",
  "objectives": [
   "Students will be able to explain the difference between reversible (encryption, tokenization) and irreversible (hashing) data protection methods.",
   "Students will be able to compare masking, tokenization and encryption and state when each is the best fit.",
   "Students will be able to select the correct data protection method for a written business requirement.",
   "Students will be able to describe how endpoint, network and cloud DLP detect and act on sensitive data."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up prompt on the projector. Give students two minutes to write an answer, then take three or four responses without correcting them yet. Say: by the end of class you will have a one-question test that sorts all of these methods."
   ],
   [
    15,
    "Teach",
    "Draw a decision tree on the whiteboard starting with 'Must the original come back?' Branch to encryption (yes, key holders), tokenization (yes, vault only), hashing (no, just verify) and masking (just hide on screen). Add DLP as a separate box labeled 'stop it leaving'. Walk through the customer support system example from the lesson, filling in each requirement. Explicitly contrast dynamic and static masking and stress that tokens have no mathematical link to the original."
   ],
   [
    15,
    "Activity",
    "Run the 'Method Match' card sort described in the activity. Circulate and ask groups to justify each placement out loud, especially for cards that could fit two methods."
   ],
   [
    5,
    "Discuss",
    "Bring the class together and pose the discussion questions. Focus on the trade-off between DLP blocking and business disruption."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note or index card and hand it in at the door."
   ]
  ],
  "warmup": "Your bank shows only the last four digits of your card on its website, yet it charges your card every month without asking for the number again. How do you think it can do both? Write your best guess.",
  "activity": {
   "title": "Method Match card sort",
   "materials": "Printed requirement cards (about 12 per group, made by the teacher), five header cards (Encryption, Hashing, Masking, Tokenization, DLP), tape or a table surface, whiteboard for the class tally.",
   "steps": [
    "Before class, write 12 short requirement cards, for example 'Developers need realistic test data', 'Verify a downloaded installer was not altered', 'Stop USB copies of files labeled Confidential', 'Backups must be restorable but unreadable if stolen', 'Charge a card monthly without storing it'.",
    "Put students in groups of three or four and give each group the five header cards and a shuffled deck of requirement cards.",
    "Groups place each requirement under one header and write a one-sentence reason on the back of the card.",
    "Each group swaps tables with another group, reviews their placements, and flags any they disagree with using a sticky note.",
    "Debrief as a class: tally placements on the whiteboard, resolve the flagged cards, and connect each answer to the decision tree."
   ]
  },
  "discussion": [
   "If DLP blocks an executive from sending a legitimate file to a partner, who should decide whether the rule stays, and how would you balance security against getting work done?",
   "Tokenization moves risk into the token vault. Is that a good trade, and what would you do to protect the vault?",
   "Why might an organization use both masking and encryption on the same database column?"
  ],
  "exit": [
   [
    "A system must store passwords so it can check them but never recover them. Which method?",
    "Salted hashing with key stretching, because it is one-way."
   ],
   [
    "What is the key difference between tokenization and encryption?",
    "A token has no mathematical link to the original and no key can reverse it; only the vault maps it back. Encryption is reversed with a key."
   ],
   [
    "Name one action endpoint DLP can control that network DLP cannot see.",
    "Copying files to USB drives or printing on the local device."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a printed version of the decision tree to use during the card sort, and pair them with a peer who can talk through each card aloud.",
   "Extend: Ask fast finishers to design a protection plan for a fictional online pharmacy, assigning at least four methods to specific data and explaining where TLS inspection would be needed for network DLP."
  ]
 },
 {
  "t": "Resilience: HA, clustering, load balancing, RAID",
  "objectives": [
   "Students will be able to identify single points of failure in a simple system diagram.",
   "Students will be able to compare active-active and active-passive clustering and explain the role of load balancers and health checks.",
   "Students will be able to state the redundancy and minimum disk count of RAID 0, 1, 5, 6 and 10.",
   "Students will be able to explain why RAID and high availability do not replace backups or disaster recovery."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect quick answers. Write the failures students name on the left side of the whiteboard."
   ],
   [
    15,
    "Teach",
    "Explain single points of failure, then introduce each building block and draw it next to the failure it fixes: RAID next to disk failure, load balancing and clustering next to server failure, UPS and generators next to power failure, geographic dispersion next to site failure. Draw RAID 0, 1, 5 and 6 as simple disk boxes and ask students how many can fail in each. End by writing 'Ransomware' on the board and asking which building block stops it; the answer is none of them, which leads into backups."
   ],
   [
    15,
    "Activity",
    "Run the 'Find the weak link' design exercise. Groups mark up a diagram and present one fix each."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect cost to the business impact analysis."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Think about the last time a website or app you rely on went down. List every component you can think of that might have failed to cause it.",
  "activity": {
   "title": "Find the weak link",
   "materials": "Printed one-page diagram of a fictional online store (one load balancer, two web servers, one database server with a single disk, one power feed), colored markers, whiteboard.",
   "steps": [
    "Hand each group of three a copy of the diagram and ask them to circle every single point of failure in red.",
    "For each circled item, groups write the building block that would remove it (for example, a second load balancer, RAID 1, database cluster, UPS).",
    "Groups estimate which fixes are most important for a store whose BIA says one hour of downtime is acceptable versus one where five minutes is too much.",
    "Each group presents one fix to the class and names the failure it does not cover.",
    "The teacher closes by asking which fix on the board would help if an employee deleted the product database, reinforcing that backups are separate."
   ]
  },
  "discussion": [
   "Each additional 'nine' of availability costs more. How would you convince a manager that a system does or does not need 99.99 percent uptime?",
   "Why might an organization deliberately use two different firewall vendors or two cloud providers, and what new problems does that create?",
   "Where is the line between high availability and disaster recovery in your own words?"
  ],
  "exit": [
   [
    "Which RAID level survives two simultaneous disk failures, and what is its minimum disk count?",
    "RAID 6, with a minimum of four disks."
   ],
   [
    "In an active-passive cluster, what does the passive node do?",
    "It stands by, monitoring the active node through heartbeats, and takes over if the active node fails."
   ],
   [
    "Name one threat that RAID, clustering and load balancing do not protect against.",
    "Ransomware, accidental deletion or data corruption; backups are needed for these."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card with each RAID level drawn as disk boxes and labeled with failures survived, and let students use it during the activity.",
   "Extend: Ask advanced students to calculate how many servers an active-active pool needs so that losing any one server still leaves enough capacity at peak load, and explain their assumptions."
  ]
 },
 {
  "t": "Backups, sites (hot/warm/cold), RPO/RTO",
  "objectives": [
   "Students will be able to define RPO, RTO, MTBF and MTTR and distinguish RPO from RTO in a scenario.",
   "Students will be able to compare full, incremental and differential backups and identify which sets a restore requires.",
   "Students will be able to compare hot, warm and cold sites by readiness and cost and select one to meet a given RTO.",
   "Students will be able to explain why offline or immutable backups and restore testing are essential against ransomware."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Take a few answers and write 'how much lost' and 'how long down' on the whiteboard as two columns."
   ],
   [
    12,
    "Teach",
    "Label the two columns RPO and RTO and draw a timeline: last backup, disaster, service restored. Mark RPO as the gap backward and RTO as the gap forward. Then draw a week of backup boxes (Sunday full, Monday to Saturday) and shade what incremental and differential each copy. Finish with a three-row table for hot, warm and cold sites with readiness and cost. Mention 3-2-1 and immutability."
   ],
   [
    18,
    "Activity",
    "Run the 'Disaster cards' activity. Groups choose backup methods and sites to meet objectives and defend them."
   ],
   [
    5,
    "Discuss",
    "Pose the discussion questions, focusing on how a BIA turns business needs into numbers."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on an index card."
   ]
  ],
  "warmup": "Imagine your laptop died right now and could not be repaired. How much of your work would be lost, and how long would it take you to be productive again? What would change those two answers?",
  "activity": {
   "title": "Disaster cards",
   "materials": "Printed system cards (each listing a fictional system with its RPO and RTO and budget level), printed disaster cards (ransomware, flood, accidental deletion, disk failure), whiteboard, markers.",
   "steps": [
    "Give each group of three or four two system cards, for example an online ordering system (RPO 5 minutes, RTO 1 hour, high budget) and an internal wiki (RPO 24 hours, RTO 3 days, low budget).",
    "Groups design a recovery plan for each system: backup type and frequency, where copies are stored (applying 3-2-1), and which recovery site type they would use.",
    "The teacher draws a disaster card and reads it aloud. Each group explains whether their plan meets the RPO and RTO for that disaster and which backup sets they would restore.",
    "Draw a second disaster card (always include ransomware at some point) and repeat, prompting groups to check whether their backups were reachable by the attacker.",
    "Groups revise their plans and share one change they made and why."
   ]
  },
  "discussion": [
   "Who in a business should set the RPO and RTO for a system, IT or the business owner, and why?",
   "Why do so many organizations discover their backups do not work only during an incident, and how would you prevent that?",
   "When might a cloud-based recovery environment be a better choice than a traditional warm site?"
  ],
  "exit": [
   [
    "A system can be offline for no more than six hours. Is that RPO or RTO?",
    "RTO, the maximum acceptable downtime."
   ],
   [
    "A full backup runs Sunday and incrementals run nightly. The server fails Wednesday morning. Which sets are needed?",
    "Sunday's full plus the Monday and Tuesday incrementals, applied in order."
   ],
   [
    "Which recovery site has hardware ready but requires data to be restored?",
    "A warm site."
   ]
  ],
  "differentiation": [
   "Support: Give students a printed timeline template with RPO and RTO arrows already drawn, and a backup week chart they can shade during the activity.",
   "Extend: Ask students to compare the storage used and restore steps for a week of incremental versus differential backups for a server where 5 percent of the data changes each day, and recommend one."
  ]
 },
 {
  "t": "Secure baselines, mobile (MDM, BYOD, COPE, CYOD)",
  "objectives": [
   "Students will be able to describe the establish, deploy and maintain lifecycle of a secure baseline and identify configuration drift.",
   "Students will be able to compare BYOD, COPE and CYOD by ownership, control and privacy.",
   "Students will be able to select MDM controls such as containerization, selective wipe and jailbreak detection for a given scenario.",
   "Students will be able to explain the risks of jailbreaking, rooting and sideloading."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and have students discuss with a neighbor for two minutes, then share a few answers."
   ],
   [
    15,
    "Teach",
    "Introduce secure baselines with a short story about forty laptops configured by hand, then write Establish, Deploy, Maintain on the board with an example tool or source for each. Move to mobile: list MDM controls on the board, then draw a three-column table for BYOD, COPE and CYOD with rows for who owns it, who chooses it, personal use, and wipe type. Explain containerization and selective wipe, and jailbreaking, rooting and sideloading."
   ],
   [
    15,
    "Activity",
    "Run the 'Policy committee' role-play. Groups draft a mobile policy for an assigned department."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore privacy versus control."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Would you let your employer install software on your personal phone that could erase it? What would they have to promise you first?",
  "activity": {
   "title": "Policy committee role-play",
   "materials": "Printed role cards (security lead, department manager, employee representative, legal/privacy officer), printed department scenario cards, sticky notes, whiteboard.",
   "steps": [
    "Form groups of four and give each student a role card describing their priorities, for example the employee representative cares about privacy and the security lead cares about wiping lost devices.",
    "Give each group a department scenario card, such as field sales who travel constantly, a research lab handling trade secrets, or part-time retail staff.",
    "Groups choose a deployment model (BYOD, COPE, CYOD or fully corporate-owned) and list at least five MDM controls, writing each on a sticky note.",
    "Each group must also state how they will keep the baseline current (the maintain step) and what happens to jailbroken or rooted devices.",
    "Groups post their sticky notes on the whiteboard under their department and present their choice in one minute; the class asks one challenge question per group."
   ]
  },
  "discussion": [
   "Where should the line be between protecting company data and respecting an employee's privacy on a BYOD phone?",
   "If a baseline breaks an important business application, who should decide whether to change the baseline or the application?",
   "Why might an organization choose CYOD instead of letting employees bring any device they like?"
  ],
  "exit": [
   [
    "A company buys phones for staff and allows personal use. Which model is this?",
    "COPE (corporate-owned, personally enabled)."
   ],
   [
    "What lets a company remove work data from a lost BYOD phone without touching personal photos?",
    "Containerization with a selective wipe of the work container."
   ],
   [
    "A scan shows servers no longer match the approved configuration. What is this called, and which baseline step handles it?",
    "Configuration drift, handled in the maintain step by re-applying or updating the baseline."
   ]
  ],
  "differentiation": [
   "Support: Provide a filled-in example of the BYOD/COPE/CYOD comparison table and a short list of MDM controls students can choose from during the role-play.",
   "Extend: Ask fast finishers to write three baseline settings for a new mobile OS release and explain how they would test them on a pilot group before deploying to everyone."
  ]
 },
 {
  "t": "Wireless: WPA3, SAE, RADIUS, EAP",
  "objectives": [
   "Students will be able to explain why WPA2-Personal is vulnerable to offline cracking and how SAE in WPA3 prevents it.",
   "Students will be able to describe the roles of the supplicant, authenticator and RADIUS server in 802.1X enterprise Wi-Fi.",
   "Students will be able to compare EAP-TLS, PEAP and EAP-TTLS and choose one for a scenario.",
   "Students will be able to identify rogue access points and evil twins and the controls that detect or prevent them."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about coffee shop Wi-Fi and collect a few answers on the whiteboard."
   ],
   [
    15,
    "Teach",
    "Draw a WEP to WPA to WPA2 to WPA3 timeline. Explain the four-way handshake capture problem in plain words, then SAE's 'every guess must be live' fix and forward secrecy. Next, draw the 802.1X triangle: laptop (supplicant), access point (authenticator), RADIUS server (with directory behind it). Add EAP as the conversation flowing along the lines, and list EAP-TLS, PEAP, EAP-TTLS and EAP-FAST with what each needs. Close with captive portals, rogue APs and evil twins."
   ],
   [
    15,
    "Activity",
    "Run the '802.1X human network' role-play, then the evil twin variation."
   ],
   [
    5,
    "Discuss",
    "Pose the discussion questions about trade-offs in enterprise versus personal mode."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You connect to a coffee shop's Wi-Fi. The password is written on the menu board. What can other customers on the same network potentially do, and what would make you feel safer?",
  "activity": {
   "title": "802.1X human network",
   "materials": "Printed role cards (Supplicant, Authenticator, RADIUS server, Directory, Evil Twin), printed 'certificate' and 'password' cards, a printed 'VLAN assignment' card, whiteboard for the diagram.",
   "steps": [
    "Pick five volunteers and give them role cards; arrange them across the front of the room to match the 802.1X diagram on the board.",
    "The Supplicant asks to join. The Authenticator must not decide; it passes the request to the RADIUS server, which checks with the Directory and returns accept or reject plus a VLAN assignment card. The class narrates each step.",
    "Repeat using EAP-TLS (Supplicant and RADIUS both show certificate cards) and then PEAP (only RADIUS shows a certificate; the Supplicant hands over a password card inside the 'tunnel').",
    "Introduce the Evil Twin, who stands closer and claims to be the network with an unofficial certificate card. Run PEAP once with a Supplicant who checks the certificate and once with one who does not, and let the class see where the password ends up.",
    "In pairs, students write down which control stopped or would have stopped the evil twin, then share."
   ]
  },
  "discussion": [
   "Many IoT devices only support personal mode. How would you connect them safely without weakening the rest of the network?",
   "Why might an organization choose PEAP over EAP-TLS despite EAP-TLS being stronger, and what risks does that accept?",
   "Is a captive portal useful for security at all? What does it actually accomplish?"
  ],
  "exit": [
   [
    "What WPA3 feature prevents offline dictionary attacks against a captured handshake?",
    "Simultaneous Authentication of Equals (SAE)."
   ],
   [
    "In 802.1X, which component makes the access decision?",
    "The RADIUS (authentication) server, which checks credentials against a directory; the access point only relays."
   ],
   [
    "Which EAP method uses certificates on both the client and the server?",
    "EAP-TLS."
   ]
  ],
  "differentiation": [
   "Support: Give students a labeled 802.1X diagram and a one-page comparison chart of EAP methods to annotate during the role-play.",
   "Extend: Ask fast finishers to write a short wireless design for a fictional hospital with staff, medical devices that only support personal mode, and guests, specifying security mode, authentication method and VLAN for each."
  ]
 },
 {
  "t": "Asset management and disposal (sanitize, destroy, certify)",
  "objectives": [
   "Students will be able to describe the stages of the asset lifecycle from acquisition to disposal, including ownership, classification and enumeration.",
   "Students will be able to compare sanitization methods (overwriting, secure erase, cryptographic erase, degaussing) and identify which suit HDDs and SSDs.",
   "Students will be able to choose between sanitization and destruction based on reuse and data sensitivity.",
   "Students will be able to explain the purpose of a certificate of destruction and how legal holds affect disposal."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let students share answers aloud. Note how many assume deleting is enough."
   ],
   [
    15,
    "Teach",
    "Draw the asset lifecycle as a circle on the whiteboard: acquire, assign and classify, monitor and track (enumeration), dispose. Explain why each stage matters using the lost-laptop story from the lesson. Then make a two-column chart: Sanitize (reuse) and Destroy (no reuse or very sensitive), listing methods under each. Highlight SSD wear leveling and why degaussing does not work on SSDs. Finish with certificates of destruction and legal holds."
   ],
   [
    15,
    "Activity",
    "Run the 'Disposal desk' sorting activity with printed device cards."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about hidden storage and vendor trust."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you sold your old phone tomorrow, what would you do to make sure the buyer could not see your photos and messages? Do you think deleting them is enough?",
  "activity": {
   "title": "Disposal desk",
   "materials": "Printed device cards (about 10 per group, made by the teacher), printed method cards (Overwrite, Secure erase, Cryptographic erase, Degauss, Shred, Hold), sticky notes, whiteboard.",
   "steps": [
    "Prepare device cards that each describe an item and its future, for example 'Encrypted SSD laptop, will be donated', 'HDD from payroll server, will be scrapped', 'Backup tapes, will be scrapped', 'Office copier, returning to leasing company', 'Laptop of employee named in a lawsuit'.",
    "Groups of three or four match each device card to the best method card and write a one-sentence reason on a sticky note.",
    "For each device leaving the building, groups also list what information should appear on the certificate they would demand from a vendor.",
    "Groups rotate to check another group's matches and mark any they would change.",
    "Debrief as a class, focusing on the copier (hidden storage), the SSD (no degaussing, no simple overwrite) and the legal hold card."
   ]
  },
  "discussion": [
   "Why do you think devices like copiers and printers are so often forgotten in disposal processes?",
   "Some organizations keep failed drives instead of returning them under warranty. When is that worth the cost?",
   "How much should you trust a disposal vendor, and what would you check before signing a contract?"
  ],
  "exit": [
   [
    "A drive will be reused by another department. Should it be sanitized or destroyed?",
    "Sanitized, because the media will be reused and sanitization removes data while keeping the drive usable."
   ],
   [
    "Why does degaussing not work on SSDs?",
    "SSDs store data in flash memory cells, not magnetically, so a magnetic field does not erase them."
   ],
   [
    "What should a certificate of destruction include?",
    "Each asset (for example by serial number), the method used, the date and who performed it."
   ]
  ],
  "differentiation": [
   "Support: Provide a simple flowchart (Will it be reused? Is it magnetic? Is the data highly sensitive? Is there a legal hold?) that students can follow for each device card.",
   "Extend: Ask fast finishers to draft a one-page disposal procedure for a small business, including inventory updates, chain of custody and how cloud storage and virtual machines are decommissioned."
  ]
 },
 {
  "t": "Vulnerability scanning: credentialed, false positives, CVSS, CVE",
  "objectives": [
   "Students will be able to compare credentialed, non-credentialed and agent-based scans and explain why credentialed scans are more accurate.",
   "Students will be able to distinguish false positives, false negatives and true positives and explain how to validate findings.",
   "Students will be able to explain the difference between a CVE identifier and a CVSS score and map scores to severity ratings.",
   "Students will be able to prioritize scan findings using exposure, asset value and active exploitation in addition to CVSS."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up prompt. Take a few answers and connect them to the idea of inside versus outside views."
   ],
   [
    12,
    "Teach",
    "Explain the vulnerability management cycle on the whiteboard. Contrast non-credentialed and credentialed scans with the home inspector comparison. Draw a 2x2 grid (reported or not, real or not) and label true positive, false positive, false negative and true negative. Write a sample CVE identifier and a CVSS scale from 0 to 10 with the rating bands, stressing that one names and the other scores. Project the sample scanner output from the lesson and read it line by line."
   ],
   [
    18,
    "Activity",
    "Run the 'Triage the report' activity with printed findings."
   ],
   [
    5,
    "Discuss",
    "Pose the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A doctor can examine you by looking at you from across the room, or by running blood tests. Which finds more problems, and which might also raise more false alarms or fewer? How might this relate to scanning computers?",
  "activity": {
   "title": "Triage the report",
   "materials": "Printed mock scan report (10 to 12 fictional findings with host role, exposure, CVSS score, exploit status and a note such as 'vendor backport confirmed'), highlighters, whiteboard for a shared priority list.",
   "steps": [
    "Before class, create a mock report using placeholder identifiers such as CVE-YYYY-0001, with a mix of internet-facing and internal hosts, some findings marked as having public exploits, and two that are actually false positives due to backported fixes.",
    "Groups of three highlight any findings they believe are false positives and write the evidence that supports their decision.",
    "Groups rank the remaining findings from first to last for remediation and write a one-line justification for their top three that mentions something other than the CVSS score.",
    "Each group writes its top three on the whiteboard. The class compares rankings and discusses differences.",
    "Close by asking each group what they would do after the server team reports a fix is applied (rescan to verify)."
   ]
  },
  "discussion": [
   "Credentialed scans need an account that can log in to many systems. How would you protect that account, and what is the risk if it is stolen?",
   "If a team is overwhelmed by thousands of findings, what would you tell them to do first?",
   "When is it reasonable to formally accept the risk of a vulnerability instead of fixing it?"
  ],
  "exit": [
   [
    "What is the difference between CVE and CVSS?",
    "CVE is a unique identifier for a known vulnerability; CVSS is a 0.0 to 10.0 score of its severity."
   ],
   [
    "A scanner reports a vulnerability that turns out not to exist. What is this called?",
    "A false positive."
   ],
   [
    "Name two factors besides the CVSS score that affect remediation priority.",
    "Any two of: internet exposure, asset value or data sensitivity, active exploitation or public exploit, compensating controls, risk tolerance."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page reference with the 2x2 positive/negative grid, the CVSS rating bands and a three-question priority checklist (exposed? exploited? valuable?) to use during triage.",
   "Extend: Ask fast finishers to write a short scanning policy covering scan frequency, credentialed versus non-credentialed use, handling fragile systems, and metrics to report to management."
  ]
 },
 {
  "t": "Pen testing and recon: passive vs active",
  "objectives": [
   "Students will be able to classify reconnaissance techniques as passive or active and justify the classification.",
   "Students will be able to explain the purpose of rules of engagement and written authorization in a penetration test.",
   "Students will be able to compare known, unknown and partially known environment tests and red, blue and purple teams.",
   "Students will be able to outline the phases of a penetration test from reconnaissance through cleanup and reporting."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let students discuss in pairs for two minutes before sharing."
   ],
   [
    13,
    "Teach",
    "Start with authorization: write 'Same actions + signature = test; same actions - signature = crime' on the board. Explain rules of engagement and what they contain. Draw a spectrum for known, partially known and unknown environments with old names underneath. Draw a line down the board labeled Passive and Active and list examples on each side. Finish with a simple phase diagram: recon, scanning, initial access, post-exploitation, cleanup, report."
   ],
   [
    17,
    "Activity",
    "Run the 'Rules of engagement' scenario cards activity."
   ],
   [
    5,
    "Discuss",
    "Pose the discussion questions on ethics and scope."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A locksmith picks the lock on a house. In one case it is legal and in another it is a crime. What is the difference? List everything that might need to be agreed before the locksmith starts.",
  "activity": {
   "title": "Rules of engagement scenario cards",
   "materials": "Printed technique cards (OSINT search, job posting review, certificate transparency lookup, port scan, banner grab, ping sweep, phishing email, social media review), printed scenario cards describing fictional rules of engagement, sticky notes, whiteboard.",
   "steps": [
    "Draw two columns on the whiteboard labeled Passive and Active. Hand each group a set of technique cards and have them sort the cards into the two columns, justifying any they argue about.",
    "Give each group a scenario card describing a fictional engagement, for example 'External test of web apps only, no social engineering, testing window starts Monday 9 a.m.'.",
    "The teacher reads out events one at a time (for example, 'It is Sunday night and you want to run a port scan', 'You discover a server owned by a partner company', 'You find customer data'). Groups decide on a sticky note whether the action is allowed under their rules of engagement and what they should do.",
    "Groups also choose whether their scenario describes a known, unknown or partially known environment test and explain why.",
    "Debrief by reviewing the trickiest events and linking each answer to authorization and scope."
   ]
  },
  "discussion": [
   "Is it ethical for a pen tester to use phishing against employees who did not know about the test? What safeguards should apply?",
   "Why might an organization prefer a purple team exercise over a traditional red team test?",
   "What should testers do if they find evidence that a real attacker is already inside the network?"
  ],
  "exit": [
   [
    "Is a ping sweep passive or active reconnaissance?",
    "Active, because it sends traffic directly to the target's systems."
   ],
   [
    "What document defines what may be tested, when and how?",
    "The rules of engagement, backed by written authorization."
   ],
   [
    "What is an unknown-environment test, and what was it formerly called?",
    "A test where testers start with little or no information, simulating an outside attacker; formerly black box."
   ]
  ],
  "differentiation": [
   "Support: Provide a printed checklist of what rules of engagement contain and a passive/active example list students can consult during the scenario activity.",
   "Extend: Ask fast finishers to draft a one-page set of rules of engagement for a fictional small business test, including scope, exclusions, window, permitted techniques, data handling and emergency contacts."
  ]
 },
 {
  "t": "Logs, SIEM correlation, alerting, SCAP, NetFlow",
  "objectives": [
   "Students will be able to describe how a SIEM aggregates, normalizes and correlates logs from multiple sources to generate alerts.",
   "Students will be able to explain why centralized, protected and NTP-synchronized logging is required for reliable investigations.",
   "Students will be able to compare NetFlow metadata with full packet capture and identify which fits a given scenario.",
   "Students will be able to identify SCAP as a set of standards for automated configuration compliance checking and distinguish it from a scanner."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up question. Give students two minutes to write an answer, then take three responses. Point out that each log source on its own is incomplete, which is the problem this lesson solves."
   ],
   [
    15,
    "Teach",
    "Draw the SIEM pipeline on the whiteboard: sources on the left, then aggregate, normalize, correlate, alert. Show one failed-login line from a Windows log and one from a Linux auth log and ask what fields they share. Explain alert fatigue and tuning. Then contrast NetFlow (call records) with packet capture (the recording of the call) using the sample flow record, and finish with SCAP as the common language for compliance checks."
   ],
   [
    15,
    "Activity",
    "Run the Build-a-Correlation activity in groups of three or four. Circulate and ask each group which fields they used to link events and why the clock-skewed card caused trouble."
   ],
   [
    5,
    "Discuss",
    "Ask the discussion questions. Draw out that tuning is an ongoing job, not a one-time setup."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them on the door as they leave."
   ]
  ],
  "warmup": "Your laptop, the office firewall and your email provider each keep their own log. If someone logged in as you from another country last night, which of those logs would show it, and would any one of them show the whole story?",
  "activity": {
   "title": "Build-a-Correlation",
   "materials": "Printed log cards (about 12 per group, each with one event from a firewall, VPN, file server, endpoint agent or DNS server, including timestamp, user and IP address; one card has a clock four minutes off), sticky notes, whiteboard markers.",
   "steps": [
    "Give each group a shuffled set of log cards. Explain that the cards come from five different systems in different formats.",
    "Groups normalize the cards by writing the user, source IP, action and time for each on a sticky note.",
    "Groups sort the sticky notes into a timeline and look for a chain of events that indicates an attack.",
    "Each group writes one correlation rule in plain English, for example: if the same account has five failed VPN logins and then a success from a new country within 30 minutes, raise a high-severity alert.",
    "Reveal that one card's source had an unsynchronized clock. Groups discuss how it distorted their timeline and what control would prevent it (NTP).",
    "One group shares its rule; the class suggests how it could cause false positives and how to tune it."
   ]
  },
  "discussion": [
   "If you were the SOC manager and your analysts were ignoring alerts, what would you change first, and how would you know it worked?",
   "When would you accept the storage cost of full packet capture instead of relying on NetFlow alone?"
  ],
  "exit": [
   [
    "What does correlation in a SIEM do?",
    "It links related events from different log sources to reveal a pattern, such as an account compromise, that no single log shows."
   ],
   [
    "An analyst can see that a host sent 4 GB to an external IP but not what was sent. What data source is this, and what would show the content?",
    "NetFlow or another flow format; full packet capture would show the content."
   ],
   [
    "What is SCAP?",
    "A set of NIST standards for expressing and automating security checks, such as configuration benchmarks, CVE identifiers and CVSS scores, so compatible tools produce consistent compliance results."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a partially completed normalization table with column headings (time, user, source IP, action) and highlight the matching user on related cards.",
   "Extend: ask fast finishers to write a second rule that detects beaconing from flow records alone, and to explain what false positives it might produce and how to suppress them."
  ]
 },
 {
  "t": "Email security: SPF, DKIM, DMARC",
  "objectives": [
   "Students will be able to explain what SPF, DKIM and DMARC each check and where each record is published.",
   "Students will be able to trace how a receiving mail server evaluates an incoming message using SPF, DKIM and DMARC alignment.",
   "Students will be able to compare the DMARC policies none, quarantine and reject and recommend a rollout sequence.",
   "Students will be able to identify threats these standards do not stop, such as lookalike domains, and name complementary controls."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up prompt. Ask two students to share. Reveal that the From line is just text and can be anything, which is the problem today's standards address."
   ],
   [
    15,
    "Teach",
    "Project the three sample DNS records. Explain SPF as a list of allowed servers, DKIM as a signature with the public key in DNS, and DMARC as alignment plus policy plus reporting. Walk through the receiving server's steps on the whiteboard as a flowchart. End with what they do not do: no encryption, no protection against lookalike domains."
   ],
   [
    15,
    "Activity",
    "Run the Mailroom Verdict role-play. Check that each group applies alignment, not just SPF or DKIM pass, before deciding."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the activity to rollout decisions and user training."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "If you received an email that showed your school's or employer's exact address in the From line, how would you know it was real? Write down one thing you would check.",
  "activity": {
   "title": "Mailroom Verdict",
   "materials": "Printed message cards (8 to 10), each listing the visible From domain, the envelope sender domain, the connecting IP address, whether a DKIM signature is present and for which domain; a printed DNS sheet with the SPF, DKIM and DMARC records for two fictional domains; whiteboard.",
   "steps": [
    "Divide the class into groups of three: one student plays SPF checker, one DKIM checker, one DMARC decision maker.",
    "For each message card, the SPF checker compares the IP with the SPF record and announces pass or fail; the DKIM checker announces whether the signature is valid and for which domain.",
    "The DMARC decision maker checks alignment with the visible From domain and applies the domain's policy: deliver, quarantine or reject.",
    "Include at least one forwarded message (SPF fails, DKIM passes), one spoofed message (both fail) and one lookalike-domain message (all pass for the attacker's own domain).",
    "Groups record verdicts on the whiteboard; the class compares results and discusses any disagreements, especially the lookalike case."
   ]
  },
  "discussion": [
   "Why might an organization be nervous about moving straight to p=reject, and what information helps them move safely?",
   "If all three records pass for a lookalike domain, which other controls would you rely on, and who in the organization owns them?"
  ],
  "exit": [
   [
    "Which standard publishes a public key in DNS so receivers can verify a signature on the message?",
    "DKIM."
   ],
   [
    "A forwarded message fails SPF but its DKIM signature is valid and aligned with the From domain. Does it pass DMARC?",
    "Yes; DMARC passes if either SPF or DKIM passes with alignment."
   ],
   [
    "Name one threat SPF, DKIM and DMARC do not stop.",
    "Phishing from a lookalike domain the attacker controls, or mail from a compromised legitimate account; they also do not encrypt email."
   ]
  ],
  "differentiation": [
   "Support: give students a one-page reference card with three rows (SPF lists servers, DKIM signs, DMARC decides and reports) and a simple decision flowchart to follow during the activity.",
   "Extend: ask fast finishers to design a rollout plan from p=none to p=reject for a company that uses three third-party email services, including how they would use aggregate reports at each step."
  ]
 },
 {
  "t": "EDR/XDR, DLP, UEBA",
  "objectives": [
   "Students will be able to explain why behavior-based tools are needed to detect fileless attacks and misuse of valid credentials.",
   "Students will be able to compare EDR, XDR, DLP and UEBA by the question each one answers and the data each one uses.",
   "Students will be able to select the most appropriate tool for a given security scenario and justify the choice.",
   "Students will be able to describe how the four tools contribute to detecting and containing a single incident."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect a few answers. Use them to show that attackers who use real accounts and built-in tools leave no malware file for antivirus to find."
   ],
   [
    12,
    "Teach",
    "Write four questions on the board: What is happening on this device? What is happening across everything? Is sensitive data leaving? Is this user acting normally? Match each to EDR, XDR, DLP and UEBA, with one concrete detection example each. Briefly contrast XDR with SIEM."
   ],
   [
    18,
    "Activity",
    "Run Which Tool Sees It card sort, then the incident timeline extension. Circulate and challenge groups to justify any card they placed under two tools."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions, focusing on false positives and privacy."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on an index card."
   ]
  ],
  "warmup": "An attacker logs in with a real employee's stolen password and uses only programs already installed on the computer. What would traditional antivirus see?",
  "activity": {
   "title": "Which Tool Sees It",
   "materials": "Printed scenario cards (about 16, for example 'Word launches PowerShell', 'card numbers copied to USB', 'login from two continents in one hour', 'phishing email linked to cloud sign-in'), four header cards (EDR, XDR, DLP, UEBA), tape or sticky notes, whiteboard.",
   "steps": [
    "Put the four header cards on the whiteboard or on group tables.",
    "In groups of three or four, students sort each scenario card under the tool that would best detect or stop it, writing a one-line reason on a sticky note.",
    "Groups compare with a neighboring group and resolve any disagreements, noting where two tools could both apply and which is the best exam answer.",
    "Hand each group a shuffled set of five events from a single incident. Groups put them in time order and label which tool raised each signal.",
    "Each group states one containment action and the tool that would perform it, such as EDR isolating the host or the identity system disabling the account."
   ]
  },
  "discussion": [
   "UEBA watches how employees behave. Where should an organization draw the line between security monitoring and employee privacy?",
   "What happens to a SOC if DLP and UEBA produce many false positives, and how would you reduce them without losing real detections?"
  ],
  "exit": [
   [
    "Which tool is the best choice to detect fileless malware running on employee laptops?",
    "EDR, because it records process, memory and command-line behavior on endpoints and can isolate the host."
   ],
   [
    "What makes XDR different from EDR?",
    "XDR correlates telemetry from endpoints plus network, email, identity and cloud sources into unified incidents."
   ],
   [
    "A user who normally downloads ten files a day downloads 5,000 files at midnight. Which tool flags this, and what does it compare against?",
    "UEBA, comparing the activity against the user's behavioral baseline."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a key-word strip for each tool (EDR: endpoint agent, isolate; XDR: many sources, correlate; DLP: sensitive data, block leaving; UEBA: baseline, unusual user) to use during the card sort.",
   "Extend: ask fast finishers to write two new scenario cards that are genuinely ambiguous between tools, then write the reasoning that identifies the single best answer for each."
  ]
 },
 {
  "t": "IAM: provisioning, SSO, SAML, OAuth, OpenID Connect, LDAP",
  "objectives": [
   "Students will be able to describe the identity lifecycle from provisioning to deprovisioning and explain the risk of orphaned accounts.",
   "Students will be able to explain how SSO and federation work and identify the benefit and risk of a central identity provider.",
   "Students will be able to compare SAML, OAuth 2.0 and OpenID Connect by purpose and token format, and distinguish authorization from authentication.",
   "Students will be able to explain the role of LDAP in directory queries and why LDAPS or StartTLS should be used."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect quick answers. Note how many different logins students have, and ask what happens to them when someone leaves a job."
   ],
   [
    15,
    "Teach",
    "Draw the lifecycle as a loop on the whiteboard: proof, provision, manage, review, deprovision. Then draw three boxes (user, IdP, app) and act out a SAML redirect with arrows. Contrast with OAuth using the hotel key card analogy, then add OIDC as the name badge. Finish with LDAP as the directory lookup and the port 389 versus 636 point."
   ],
   [
    15,
    "Activity",
    "Run the Identity Relay role-play. Make sure each group plays both the SAML flow and the OAuth plus OIDC flow."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the role-play back to the audit scenario."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a half sheet."
   ]
  ],
  "warmup": "Count how many different apps or websites you logged into this week. If you left your job or school tomorrow, who would make sure all of those logins stopped working?",
  "activity": {
   "title": "Identity Relay",
   "materials": "Printed role cards (User, Identity Provider, Service Provider, Resource Server, Directory), printed token cards labeled 'SAML assertion (XML, signed)', 'Access token (scope: read receipts)' and 'ID token (JWT: who the user is)', masking tape to mark stations on the floor or desks, whiteboard.",
   "steps": [
    "Set up stations for each role around the room and assign students to them in groups of five.",
    "Scenario 1: the User tries to open a cloud HR app. Students physically walk the redirect to the IdP, the IdP checks with the Directory (LDAP), and the IdP hands a signed SAML assertion card back to the Service Provider, which grants access.",
    "Scenario 2: the User lets an expense app read receipts. The Resource Server issues an access token card with a limited scope; the IdP also issues an ID token card so the app knows who the user is. Students label which token is OAuth and which is OIDC.",
    "Scenario 3: the User leaves the company. The IdP student tears up the User's identity card; groups check which apps can still be reached (none if all are behind SSO) and add a sticky note for any local account that would survive.",
    "Groups write one sentence on the whiteboard explaining the difference between the access token and the ID token."
   ]
  },
  "discussion": [
   "SSO puts a lot of trust in one system. What protections would you insist on for the identity provider, and what happens if it goes down?",
   "Why do you think so many people, including vendors, describe OAuth as a way to log in? What problems could that confusion cause?"
  ],
  "exit": [
   [
    "Which standard sends signed XML assertions from an identity provider to a service provider?",
    "SAML."
   ],
   [
    "Is OAuth 2.0 used for authentication or authorization, and what adds the other?",
    "Authorization; OpenID Connect adds authentication with an ID token."
   ],
   [
    "What is the risk of delayed deprovisioning, and which IAM approach reduces it?",
    "Orphaned accounts that former staff or attackers can use; centralizing access through SSO with an IdP tied to HR-driven provisioning lets one disable action remove all access."
   ]
  ],
  "differentiation": [
   "Support: provide a three-column comparison sheet (SAML, OAuth, OIDC) with rows for purpose, token format and typical use, partially filled in, for students to complete during the role-play.",
   "Extend: ask fast finishers to explain how federation would let a partner company's staff use the HR app, which organization's IdP would authenticate them, and what the service provider must trust."
  ]
 },
 {
  "t": "MFA factors, PAM, just-in-time access",
  "objectives": [
   "Students will be able to classify authentication methods into the factor categories something you know, have, are and somewhere you are, and determine whether a combination is true MFA.",
   "Students will be able to rank common MFA methods by strength and explain MFA fatigue, SIM swapping and phishing resistance.",
   "Students will be able to explain the features of PAM, including vaulting, rotation and session recording, and how just-in-time access removes standing privileges.",
   "Students will be able to interpret FAR, FRR and CER to compare biometric systems."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and take a quick hand vote. Ask students who voted yes to explain, then reveal that both items are something you know."
   ],
   [
    12,
    "Teach",
    "Draw four columns on the whiteboard for the factor categories. Then draw a strength ladder from SMS to TOTP to push with number matching to FIDO2 and passkeys, explaining the attack that defeats each lower rung. Sketch a FAR and FRR graph and mark the CER. Finish with PAM and JIT using the safe deposit analogy."
   ],
   [
    18,
    "Activity",
    "Run the Factor Sort and Privilege Walk activity. Circulate during the sort and challenge any card placed in the wrong category."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions on usability versus security."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Your bank asks for your password and then your mother's maiden name. Is that multifactor authentication? Vote yes or no and be ready to explain.",
  "activity": {
   "title": "Factor Sort and Privilege Walk",
   "materials": "Printed cards with authentication methods (password, PIN, smart card, fingerprint, face scan, GPS location, SMS code, authenticator app code, hardware security key, security question), printed combination cards (for example 'password + PIN', 'smart card + PIN'), sticky notes, whiteboard.",
   "steps": [
    "In pairs, students sort the method cards into the four factor categories on their desks.",
    "Pairs then evaluate each combination card and label it MFA or not MFA, writing the reason on a sticky note.",
    "Pairs rank the second-factor cards from weakest to strongest and write one attack that defeats each weaker option.",
    "Switch to the Privilege Walk: the teacher reads out the database administrator's emergency patch scenario step by step. At each step, pairs write which control is in play (MFA, PAM vault, session recording, JIT expiry, rotation).",
    "Ask pairs what an attacker who compromised the administrator's laptop the day before would find, and compare answers for a world with standing privileges versus JIT."
   ]
  },
  "discussion": [
   "Phishing-resistant keys are stronger but cost money and can be lost. How would you decide which staff get them first?",
   "If just-in-time access makes administrators wait for approval during an outage, how would you design the process so it stays secure without slowing urgent work too much?"
  ],
  "exit": [
   [
    "Is a smart card plus a PIN multifactor authentication? Why?",
    "Yes; the smart card is something you have and the PIN is something you know, two different categories."
   ],
   [
    "What attack is happening when a user receives dozens of unexpected push prompts, and what feature helps defend against it?",
    "MFA fatigue; number matching, or phishing-resistant methods such as FIDO2, help defend against it."
   ],
   [
    "What are standing privileges, and which control removes them?",
    "Permanently assigned elevated rights; just-in-time access removes them by granting privileges only temporarily when needed."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a factor category reference strip with two examples per category, and let them complete the sort before attempting combinations.",
   "Extend: ask fast finishers to explain why FIDO2 resists phishing proxies when TOTP does not, and to describe how PAM should handle an application's service account password."
  ]
 },
 {
  "t": "IR process: preparation, detection, analysis, containment, eradication, recovery, lessons learned",
  "objectives": [
   "Students will be able to list the SY0-701 incident response phases in order and describe the purpose of each.",
   "Students will be able to classify specific response actions into the correct phase.",
   "Students will be able to explain why containment precedes eradication and how containment choices affect evidence.",
   "Students will be able to apply the process to a scenario and identify the next appropriate action."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up dilemma. Let students argue briefly for wiping or isolating, then hold the answer until the teaching segment."
   ],
   [
    12,
    "Teach",
    "Write the seven phases down the whiteboard. For each, give two concrete actions and one exam clue word. Spend extra time on the containment versus eradication boundary and on evidence preservation. Share the mnemonic."
   ],
   [
    18,
    "Activity",
    "Run the Phase Sort and Incident Timeline activity. Watch for groups placing patching under recovery or isolation under eradication, and ask them to justify."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions on pressure and communication during incidents."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Ransomware is encrypting a file server right now. Your manager says: wipe it and restore from backup immediately. What could go wrong if you do exactly that?",
  "activity": {
   "title": "Phase Sort and Incident Timeline",
   "materials": "Printed action cards (about 20, for example 'write ransomware playbook', 'EDR alert on mass renames', 'confirm scope of compromised accounts', 'isolate workstation', 'disable account', 'remove scheduled task', 'reimage laptop', 'restore files from backup', 'post-incident meeting'), seven phase header sheets, tape, whiteboard.",
   "steps": [
    "Tape the seven phase header sheets across the whiteboard in random order. Ask a volunteer group to rearrange them into the correct sequence.",
    "Give each group of three or four a shuffled set of action cards. Groups sort every card under a phase.",
    "Groups compare their sort with another group and discuss any card they placed differently, recording the final decision and reason.",
    "Read a short account takeover scenario aloud in stages. After each stage, groups hold up the phase card they think comes next and one action they would take.",
    "Close by asking each group to name one preparation step that would have made the scenario easier to handle."
   ]
  },
  "discussion": [
   "Why do people under pressure tend to skip containment and jump to cleanup, and how can a playbook help prevent that?",
   "Who outside the IT team needs to be involved during analysis, and what decisions can only they make?"
  ],
  "exit": [
   [
    "Put these phases in order: recovery, containment, preparation, lessons learned, eradication, analysis, detection.",
    "Preparation, detection, analysis, containment, eradication, recovery, lessons learned."
   ],
   [
    "Removing a malicious scheduled task and patching the exploited flaw belong to which phase?",
    "Eradication."
   ],
   [
    "Why might isolating a server be preferred over powering it off during containment?",
    "Isolation stops the spread while preserving volatile memory evidence that a power-off would destroy."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a phase reference sheet listing each phase with a one-sentence purpose and two example actions, and let them use the mnemonic card during the sort.",
   "Extend: ask fast finishers to write a one-page playbook outline for a lost unencrypted laptop, listing at least one action per phase and the people who must be notified."
  ]
 },
 {
  "t": "Tabletop exercises and simulations",
  "objectives": [
   "Students will be able to describe tabletop exercises, walkthroughs, simulations, parallel processing tests and failover tests.",
   "Students will be able to compare exercise types by cost, risk and the level of confidence they provide.",
   "Students will be able to select an appropriate exercise type for a given organizational goal and constraint.",
   "Students will be able to apply the structure of a good exercise, including objectives, injects and an after-action review."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Take three answers and connect them to the idea that untested plans fail."
   ],
   [
    10,
    "Teach",
    "Draw a ladder on the whiteboard with rungs labeled tabletop, walkthrough, simulation, parallel test, failover test. Next to each rung, note what is touched, the cost and the risk. Explain injects and the after-action review."
   ],
   [
    20,
    "Activity",
    "Run a mini tabletop exercise in groups using the hospital ransomware scenario. The teacher acts as facilitator and reads injects every four minutes."
   ],
   [
    5,
    "Discuss",
    "Groups share their top two gaps; lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Think of a fire drill at school or work. What problems has a drill revealed that would have been dangerous to discover during a real fire?",
  "activity": {
   "title": "Run a Mini Tabletop",
   "materials": "Printed role cards (incident lead, IT analyst, legal counsel, communications manager, executive, clinical lead), printed scenario sheet, four printed inject cards held by the teacher, a printed one-page simplified response plan with a deliberately outdated contact and a missing decision owner, sticky notes, whiteboard.",
   "steps": [
    "Form groups of five or six and hand out role cards. Each group receives the simplified response plan and the opening scenario: ransomware encrypts the hospital's health record system on a Saturday night.",
    "Groups spend three minutes deciding their first actions using only the plan, with one student acting as recorder.",
    "Every four minutes the teacher reads an inject, such as 'backups are also encrypted', 'a reporter calls', 'the on-call engineer's number is disconnected', 'regulators ask when you will file a notification'. Groups decide how to respond and who decides.",
    "Recorders note every point where the plan was unclear, wrong or silent on a sticky note.",
    "Groups hold a three-minute after-action review, choose their top two gaps, and assign each an owner and a fix."
   ]
  },
  "discussion": [
   "Why is it important that a tabletop feels safe for participants to admit they do not know something?",
   "When would an organization be justified in running a full failover test despite the risk, and what would you do to reduce that risk?"
  ],
  "exit": [
   [
    "Which exercise type is discussion-based, touches no systems and has the lowest cost and risk?",
    "A tabletop exercise."
   ],
   [
    "What is the difference between a parallel processing test and a failover test?",
    "A parallel test runs recovery systems alongside production without interrupting it; a failover test actually switches operations to the backup."
   ],
   [
    "What should be the output of an after-action review?",
    "A documented list of gaps and improvements, each with an owner and a deadline, fed back into the plan."
   ]
  ],
  "differentiation": [
   "Support: give struggling students the ladder diagram as a handout with cost and risk already filled in, and pair them with a student playing the incident lead during the tabletop.",
   "Extend: ask fast finishers to design two new injects for the scenario that would test legal and communications decisions, and to write the exercise objective each inject supports."
  ]
 },
 {
  "t": "Forensics: order of volatility, chain of custody, legal hold, acquisition",
  "objectives": [
   "Students will be able to arrange common evidence sources in order of volatility and justify collecting memory before disk.",
   "Students will be able to explain the acquisition process, including write blockers, bit-by-bit imaging and hash verification.",
   "Students will be able to complete and evaluate a chain of custody record and explain how gaps affect admissibility.",
   "Students will be able to explain when a legal hold applies and how it affects normal retention and deletion policies."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up scenario. Collect two or three suggestions and note any that would destroy evidence, without correcting yet."
   ],
   [
    12,
    "Teach",
    "Draw a volatility staircase on the whiteboard from registers and cache down to archival media. Explain acquisition with a write blocker diagram and show the sample hash commands on the projector. Describe chain of custody with a sample form, then legal hold and e-discovery."
   ],
   [
    18,
    "Activity",
    "Run the Evidence Locker activity. Circulate and check that every handoff in each group's custody log has a name, time, purpose and signature."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions, connecting back to the warm-up suggestions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A coworker's computer is suspected of being used to steal company files. It is still on. Write down the first thing you would do and the first thing you would definitely not do.",
  "activity": {
   "title": "Evidence Locker",
   "materials": "Printed evidence source cards (CPU cache, RAM, ARP cache, swap file, hard drive, remote syslog server, network diagram, backup tape), printed blank chain of custody forms, envelopes or paper bags to act as evidence bags, sticky labels, a printed 'evidence log' with two deliberately broken custody records, whiteboard.",
   "steps": [
    "In groups of three or four, students arrange the evidence source cards from most to least volatile and explain their reasoning for any pair they argued about.",
    "Each group receives a sealed envelope representing a laptop drive. One student plays the collecting analyst, labels the bag and starts a chain of custody form.",
    "The envelope passes to two other students in turn (transport officer, evidence locker custodian). Each records name, date, time, purpose and signature.",
    "Groups swap the provided evidence log containing two broken records and identify what is missing and how a defense lawyer might use each gap.",
    "Read a short scenario in which a lawsuit is announced and email auto-deletes after 90 days. Groups write the legal hold instruction they would send, naming what data it covers."
   ]
  },
  "discussion": [
   "If an incident responder must stop an active attack and preserve evidence at the same time, how should they balance the two?",
   "Why might an organization follow forensic procedures carefully even for an internal investigation that is unlikely to reach court?"
  ],
  "exit": [
   [
    "Which should be collected first from a running system: the hard drive, RAM or backup tapes? Why?",
    "RAM, because it is the most volatile of the three and its contents are lost when the system shuts down."
   ],
   [
    "How does an investigator prove a forensic image is identical to the original drive?",
    "By computing a cryptographic hash, such as SHA-256, of both and showing the values match."
   ],
   [
    "What does a legal hold require an organization to do?",
    "Preserve all relevant data when litigation or investigation is reasonably expected, suspending normal deletion and retention policies for that data."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a partially completed volatility staircase with the top and bottom rungs filled in, and a chain of custody form with column headings explained.",
   "Extend: ask fast finishers to explain how acquisition differs for a cloud virtual machine, what snapshots and provider logs provide, and what chain of custody challenges arise when the provider controls the hardware."
  ]
 },
 {
  "t": "Automation and SOAR playbooks",
  "objectives": [
   "Students will be able to explain the difference between automation, orchestration and SOAR.",
   "Students will be able to compare a playbook with a runbook and identify which steps of a playbook should require human approval.",
   "Students will be able to list at least three benefits and three considerations of security automation from the SY0-701 objectives.",
   "Students will be able to apply clue words to identify guard rails, technical debt and single points of failure in exam-style scenarios."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up prompt. Give students two minutes to write an answer, then ask three volunteers to share. Write their repetitive tasks on the board; you will return to them during the activity."
   ],
   [
    12,
    "Teach",
    "Explain automation, orchestration and SOAR using the phishing playbook walkthrough. Draw SOAR in the center of the board with arrows to SIEM, EDR, email gateway, firewall and ticketing. Define playbook versus runbook and guard rails. Say clearly: low-risk steps run automatically, high-impact steps wait for approval."
   ],
   [
    8,
    "Teach",
    "Present benefits and considerations as a two-column table: efficiency, consistency, reaction time, scaling, retention versus complexity, cost, single points of failure, technical debt, supportability. Ask students to suggest a real-world example for each consideration."
   ],
   [
    12,
    "Activity",
    "Run the 'Build a playbook' activity in groups of three or four."
   ],
   [
    4,
    "Discuss",
    "Have each group share one step they kept manual and why. Use the discussion questions to draw out the approval-versus-speed trade-off."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note or index card and hand it in at the door."
   ]
  ],
  "warmup": "Think of a task at school or work that you do the same way every time and that bores you. What would go wrong if a computer did it for you without anyone checking?",
  "activity": {
   "title": "Build a playbook: automatic or approve?",
   "materials": "Whiteboard or chart paper per group, sticky notes in two colors, printed card listing 10 possible response steps for a suspicious email alert.",
   "steps": [
    "Give each group the card of 10 steps, such as extract URLs, check reputation, search all mailboxes, delete the message, block the domain, reset user passwords, disable an executive's account, isolate a laptop, open a ticket, and notify the user.",
    "Groups order the steps into a playbook flow on their chart paper, writing each step on a sticky note.",
    "Groups mark each step green (fully automatic) or yellow (requires analyst approval), and write a one-line reason for every yellow step.",
    "Groups add one guard rail and identify one single point of failure in their design.",
    "The teacher walks around and challenges choices, for example asking what happens if threat intelligence returns a false positive on a partner's domain."
   ]
  },
  "discussion": [
   "Where would you draw the line between speed and safety for automatic actions, and does that line change for workstations versus production servers?",
   "If automation removes routine tasks, how should a security team make sure new analysts still learn the basics?"
  ],
  "exit": [
   [
    "What is the difference between automation and orchestration?",
    "Automation performs individual tasks without manual effort; orchestration coordinates multiple tools and tasks into one workflow."
   ],
   [
    "Name one step in a phishing playbook that should usually require human approval and explain why.",
    "For example, resetting user passwords, disabling an account or isolating a server, because a false positive could disrupt users or cause an outage."
   ],
   [
    "A response script breaks after a tool upgrade and nobody knows how it works. Which automation consideration is this?",
    "Technical debt and ongoing supportability."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially completed playbook with five steps already placed and colored, and have them place the remaining five; provide a glossary card for SOAR, playbook, runbook and guard rail.",
   "Extend: Ask fast finishers to write a one-paragraph runbook for one automated step in their playbook and to list how they would monitor the playbook so a broken integration is detected within an hour."
  ]
 },
 {
  "t": "Investigation data sources",
  "objectives": [
   "Students will be able to identify which data source (firewall, application, endpoint, OS security, IDS/IPS, network, metadata, vulnerability scan, packet capture) answers a given investigation question.",
   "Students will be able to compare packet captures with flow data and logs in terms of detail, storage and the effect of encryption.",
   "Students will be able to build a simple incident timeline by correlating entries from several log excerpts.",
   "Students will be able to explain why log collection, retention and time synchronization must be planned before an incident."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question. Collect answers on the board in a 'what we would need to know' column."
   ],
   [
    12,
    "Teach",
    "Walk through each data source with one sample line projected for each. For every source, ask 'what question does this answer?' and write the clue phrase beside it. Emphasize that firewall logs do not show processes and that encryption limits packet captures."
   ],
   [
    3,
    "Teach",
    "Project the four-line log excerpt from the lesson (proxy, EDR, DNS, firewall) and read it aloud as a story, stressing the timestamps."
   ],
   [
    15,
    "Activity",
    "Run the 'Timeline detectives' activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Groups present their timelines; discuss which source was most useful and what evidence was missing."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions individually."
   ]
  ],
  "warmup": "A teacher's laptop starts acting strangely after she opens an email attachment. If you were investigating, what three questions would you want answered first, and where might that information be recorded?",
  "activity": {
   "title": "Timeline detectives",
   "materials": "Printed log cards made by the teacher (about 12 single-line entries from email gateway, proxy, EDR, DNS, DHCP, firewall, OS security and NetFlow, shuffled and with fictional addresses), tape or a whiteboard, markers.",
   "steps": [
    "Give each pair a shuffled set of log cards describing one fictional incident.",
    "Pairs label each card with its data source type and the question it answers.",
    "Pairs arrange the cards in time order on the whiteboard or desk to build the incident timeline.",
    "Include one card with a skewed timestamp; pairs must spot it and explain what clock synchronization problem it suggests.",
    "Pairs write a two-sentence summary: how the attack started, what ran, and whether data left the network, naming the source that proves each claim."
   ]
  },
  "discussion": [
   "If your organization could afford to keep only three log sources for a year, which would you choose and why?",
   "Encryption protects users but limits what packet captures show. How should defenders adapt their investigations?"
  ],
  "exit": [
   [
    "Which data source best shows which process launched on a workstation?",
    "Endpoint logs, typically from EDR."
   ],
   [
    "Give two reasons packet captures are not always practical.",
    "They need large amounts of storage and are kept only briefly, and encrypted traffic hides the content."
   ],
   [
    "Why must clocks be synchronized across systems before an incident happens?",
    "So events from different sources can be placed in a reliable timeline; skewed clocks can make effects appear before causes."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card that matches each data source to its clue phrase, and give struggling pairs a smaller set of six cards with source labels already printed.",
   "Extend: Ask fast finishers to identify one investigation question the provided cards cannot answer, name the missing data source, and propose a retention period for it with a justification."
  ]
 },
 {
  "t": "Policies, standards, procedures, guidelines",
  "objectives": [
   "Students will be able to define policies, standards, procedures and guidelines and state which are mandatory.",
   "Students will be able to classify sample governance statements into the correct document type.",
   "Students will be able to explain why specific technical settings belong in standards and procedures rather than policies.",
   "Students will be able to trace a high-level policy to a supporting standard, procedure and guideline for one security topic."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Use the warm-up prompt about school rules. List student examples on the board and ask which ones are rules versus advice."
   ],
   [
    12,
    "Teach",
    "Introduce the four document types as a pyramid on the board. For each, give the definition, a password example and whether it is mandatory. Cover the AUP and other policy examples from the objectives, then governance roles and the review cycle."
   ],
   [
    15,
    "Activity",
    "Run the 'Sort the statements' card sort followed by the 'trace one topic' extension."
   ],
   [
    8,
    "Discuss",
    "Review contested cards as a class; use the discussion questions to explore why details are kept out of policies."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think about your school or workplace. Name one rule you must follow and one piece of advice you are given but do not have to follow. What makes one a rule and the other advice?",
  "activity": {
   "title": "Sort the statements",
   "materials": "Printed cards (made by the teacher) with 16 governance statements, a whiteboard divided into four columns labeled Policy, Standard, Procedure and Guideline, tape or magnets.",
   "steps": [
    "Give each group of three or four a stack of 16 cards, such as 'All remote access must be secured', 'VPN connections must use MFA and TLS 1.2 or higher', 'Step 1: open the VPN client and select your certificate', and 'Consider using a privacy screen when traveling'.",
    "Groups sort the cards into the four columns and must agree on each placement.",
    "Each group picks one policy card and finds, or writes, the matching standard, procedure and guideline to form a complete chain.",
    "Groups place two cards they disagreed about in a 'debate' area for the class discussion."
   ]
  },
  "discussion": [
   "What problems would an organization face if its policy named a specific product and that product were discontinued?",
   "Why might an organization choose a guideline instead of a mandatory rule for a behavior it cares about?"
  ],
  "exit": [
   [
    "Which of the four document types is optional?",
    "A guideline."
   ],
   [
    "Classify this statement: 'All laptops must use AES-256 full disk encryption.'",
    "A standard, because it is a specific, measurable mandatory requirement."
   ],
   [
    "Why should specific technical settings stay out of policies?",
    "Technology changes often; keeping settings in standards and procedures lets them be updated without rewriting leadership-approved policies."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page cue sheet with the question to ask for each card: Is it optional? Is it step-by-step? Is it a specific measurable requirement? Otherwise, is it high-level intent?",
   "Extend: Ask fast finishers to draft a short acceptable use policy statement and a matching standard and procedure for one topic, such as personal devices, and to note who should approve each document."
  ]
 },
 {
  "t": "Risk: register, appetite, tolerance, SLE/ARO/ALE",
  "objectives": [
   "Students will be able to calculate SLE, ARO and ALE from a scenario and determine whether a control is cost-effective.",
   "Students will be able to distinguish risk appetite, risk tolerance and risk threshold.",
   "Students will be able to describe the fields of a risk register entry, including the risk owner and key risk indicators.",
   "Students will be able to compare qualitative and quantitative risk assessment and explain inherent versus residual risk."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about a lost phone and work through rough numbers aloud with students to preview the formulas."
   ],
   [
    10,
    "Teach",
    "Define risk, likelihood and impact, qualitative versus quantitative assessment, inherent versus residual risk, and appetite versus tolerance. Show a sample risk register row on the projector and label each field."
   ],
   [
    8,
    "Teach",
    "Write AV, EF, SLE, ARO and ALE on the board. Work the $400,000 database example step by step, then the control comparison. Stress: SLE first, then ALE; ARO can be greater than 1."
   ],
   [
    14,
    "Activity",
    "Run the 'Risk register workshop' in groups."
   ],
   [
    4,
    "Discuss",
    "Groups report which control they would fund and why; discuss appetite and tolerance using the discussion questions."
   ],
   [
    4,
    "Exit ticket",
    "Students complete the three exit questions individually, showing their working."
   ]
  ],
  "warmup": "Your phone is worth $800 and you crack the screen about once every two years, which costs $200 to fix. Roughly how much do screen repairs cost you per year, and would a $40-a-year case that halves the breakage be worth buying?",
  "activity": {
   "title": "Risk register workshop",
   "materials": "Printed scenario cards (made by the teacher) for four fictional risks with asset values, exposure factors and frequencies; a printed blank risk register table; calculators or student laptops with a browser calculator; whiteboard.",
   "steps": [
    "Give each group one scenario card and a blank risk register row.",
    "Groups calculate SLE and ALE for their risk and fill in description, owner, likelihood, impact, existing controls and one key risk indicator.",
    "Each card also lists a proposed control with an annual cost and a new ARO; groups calculate the new ALE and decide whether the control is cost-effective.",
    "Groups write their completed row on the shared whiteboard register so the class can see all four risks side by side.",
    "The class ranks the four risks and decides which fall outside a stated 'conservative' appetite."
   ]
  },
  "discussion": [
   "What are the limits of ALE when the frequency of a cyber attack is hard to estimate?",
   "How might a startup and a hospital set different risk appetites, and what would that change about their registers?"
  ],
  "exit": [
   [
    "A server worth $60,000 would lose 50 percent of its value in an incident expected three times a year. What are the SLE and ALE?",
    "SLE = $60,000 × 0.5 = $30,000; ALE = $30,000 × 3 = $90,000 per year."
   ],
   [
    "What is the difference between risk appetite and risk tolerance?",
    "Appetite is the overall amount of risk the organization is willing to accept; tolerance is the acceptable deviation for a specific risk before action is required."
   ],
   [
    "Why does each risk register entry have an owner?",
    "So a specific person is accountable for monitoring the risk and ensuring its treatment is carried out."
   ]
  ],
  "differentiation": [
   "Support: Provide a formula card with AV × EF = SLE and SLE × ARO = ALE and a filled-in worked example; pair struggling students with a confident calculator and have them explain each step aloud.",
   "Extend: Ask fast finishers to design a key risk indicator and threshold for their risk and to explain what action should be triggered when the threshold is crossed."
  ]
 },
 {
  "t": "Risk treatment: accept, avoid, transfer, mitigate",
  "objectives": [
   "Students will be able to identify accept, avoid, transfer and mitigate from scenario descriptions.",
   "Students will be able to explain why transfer through insurance or contracts does not transfer accountability.",
   "Students will be able to describe what a valid risk acceptance requires, including documentation and an owner with authority.",
   "Students will be able to apply combined treatments and exceptions with compensating controls to a realistic risk."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about flood risk. Record answers on the board and group them into four unlabeled clusters, then reveal the names."
   ],
   [
    12,
    "Teach",
    "Teach each strategy with definition, example and exam clue words. Connect mitigation to the ALE calculation. Explain exceptions and exemptions and who may accept risk."
   ],
   [
    15,
    "Activity",
    "Run the 'Risk committee role-play' in groups."
   ],
   [
    8,
    "Discuss",
    "Each committee presents one decision; challenge decisions where transfer was treated as removing responsibility or acceptance lacked an owner."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You live near a river that sometimes floods. List every way you could deal with that risk. Which options cost money, which change where you live, and which simply accept it?",
  "activity": {
   "title": "Risk committee role-play",
   "materials": "Printed role cards (chief financial officer, security lead, business owner, legal counsel), printed risk cards for five fictional risks, sticky notes, whiteboard with a four-column table labeled Accept, Avoid, Transfer, Mitigate.",
   "steps": [
    "Form groups of four; each student takes a role card describing that person's priorities.",
    "The group reviews five risk cards, such as an unpatchable legacy system, an unnecessary data collection feature, a low-impact website defacement, ransomware and a vendor outage.",
    "For each risk the committee agrees on one or more treatments, writes them on sticky notes and places them in the correct columns.",
    "For any accepted risk or exception, the group names the approver, the compensating controls and a review date.",
    "The teacher circulates and asks probing questions such as 'Who is accountable if the insurer pays but customers' data was exposed?'"
   ]
  },
  "discussion": [
   "Is it ever responsible to accept a high risk? What conditions would need to be true?",
   "Why do insurers often require certain controls before they will cover a cyber incident, and what does that tell you about the link between transfer and mitigation?"
  ],
  "exit": [
   [
    "A company stops collecting customers' dates of birth because it does not need them. Which treatment is this?",
    "Avoidance."
   ],
   [
    "Does buying cyber insurance transfer accountability for a breach?",
    "No; it transfers some financial impact, but accountability, regulatory duties and reputational harm remain with the organization."
   ],
   [
    "What must accompany a decision to accept a risk?",
    "Formal documentation in the risk register, approval by an owner with appropriate authority, and periodic review."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision flowchart: Can we stop the activity? (avoid) Can we add controls? (mitigate) Can someone else carry the financial impact? (transfer) Is what remains within appetite? (accept).",
   "Extend: Ask fast finishers to calculate whether a proposed mitigation is cost-effective using given SLE, ARO and control cost values, and to write a one-paragraph exception request with compensating controls and an expiry date."
  ]
 },
 {
  "t": "Third-party risk: SLA, MOU, MSA, SOW, NDA, right to audit",
  "objectives": [
   "Students will be able to match SLA, MOU, MOA, MSA, SOW, NDA and BPA to their purposes.",
   "Students will be able to explain the value of a right-to-audit clause and other key security contract clauses.",
   "Students will be able to describe the vendor risk life cycle from due diligence through monitoring and offboarding.",
   "Students will be able to apply risk tiering to decide how much assessment a vendor needs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Use the warm-up question about hiring a contractor; list student answers and connect them to agreement types."
   ],
   [
    12,
    "Teach",
    "Present the vendor life cycle on the board: due diligence, contracting, monitoring, offboarding. Introduce each agreement type with its clue phrase and the MSA-SOW relationship. Highlight right to audit and breach notification clauses."
   ],
   [
    5,
    "Teach",
    "Explain vendor tiering with two contrasting examples: a payroll provider and an office supply company."
   ],
   [
    13,
    "Activity",
    "Run the 'Contract matching and vendor review' activity."
   ],
   [
    5,
    "Discuss",
    "Discuss which clauses groups added and why; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you hired someone to renovate your kitchen, what would you want written down before they started work? List at least four things.",
  "activity": {
   "title": "Contract matching and vendor review",
   "materials": "Printed cards (made by the teacher) with seven agreement names and seven purpose descriptions, a printed one-page fictional vendor contract summary with missing clauses, highlighters, whiteboard.",
   "steps": [
    "In pairs, students match each agreement name card (SLA, MOU, MOA, MSA, SOW, NDA, BPA) to its purpose card.",
    "Pairs join into groups of four and read the fictional contract summary for a cloud payroll vendor.",
    "Groups highlight what is present and list what is missing, such as right to audit, breach notification timeline, data location, subcontractor rules and data return at termination.",
    "Groups assign the vendor a risk tier and list the due diligence evidence they would request.",
    "Each group writes its top three missing clauses on the whiteboard for comparison."
   ]
  },
  "discussion": [
   "Why might a large, well-known vendor resist a right-to-audit clause, and what alternative evidence could satisfy you?",
   "What could go wrong if a company never offboards vendors properly when contracts end?"
  ],
  "exit": [
   [
    "A contract promises 99.9 percent uptime and service credits if missed. What type of agreement is this?",
    "A service level agreement (SLA)."
   ],
   [
    "How do an MSA and a SOW relate?",
    "The MSA sets the general terms for the relationship, and each SOW defines the specific work, deliverables, timeline and cost for a project under it."
   ],
   [
    "Why include a right-to-audit clause?",
    "It gives the customer the contractual ability to verify the vendor's security controls instead of relying only on the vendor's claims."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference table with each agreement, its purpose and one clue phrase; let struggling students complete the matching with the table before attempting the contract review.",
   "Extend: Ask fast finishers to draft a vendor offboarding checklist and three reassessment triggers, such as a merger, a reported breach or a change in data location."
  ]
 },
 {
  "t": "Compliance, privacy roles (controller, processor), audits",
  "objectives": [
   "Students will be able to identify the data controller, data processor and data subject in a scenario.",
   "Students will be able to explain privacy concepts including the right to be forgotten, data minimization, data inventory and retention.",
   "Students will be able to compare internal audits, self-assessments, external audits and attestations.",
   "Students will be able to describe the consequences of non-compliance and the difference between due diligence and due care."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up question about a shopping app and ask students to guess who is responsible for their data."
   ],
   [
    10,
    "Teach",
    "Define compliance, consequences of non-compliance, due diligence and due care. Draw the controller-processor-subject relationship on the board with arrows showing instructions and data flow. Introduce the DPO, data owner and custodian."
   ],
   [
    5,
    "Teach",
    "Cover the right to be forgotten, minimization, retention and inventory, then the audit types on a spectrum from self-assessment to external audit and attestation."
   ],
   [
    15,
    "Activity",
    "Run the 'Who is responsible?' scenario stations."
   ],
   [
    5,
    "Discuss",
    "Review answers to the trickiest stations and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You order shoes from an online store, which uses a separate company to send its emails and another to deliver packages. If you wanted all your data deleted, who would you contact, and who should make sure it happens everywhere?",
  "activity": {
   "title": "Who is responsible? scenario stations",
   "materials": "Six printed scenario cards (made by the teacher) placed around the room, answer sheets, a projector for reviewing answers.",
   "steps": [
    "Place six station cards around the room, each describing a fictional organization handling personal data or seeking audit evidence.",
    "Groups rotate every two minutes, recording for each station the controller, processor and data subject, or the type of audit or assessment described.",
    "Two stations involve a right-to-be-forgotten request; groups list the steps the controller must take, including instructing processors and noting legal retention exceptions.",
    "One station asks groups to rank three pieces of audit evidence by the weight they carry with a customer.",
    "Groups compare answers with one other group before the class review."
   ]
  },
  "discussion": [
   "Can an organization be fully compliant and still be breached? What does that say about how leaders should view compliance?",
   "Why might a deletion request conflict with other legal duties, and how should an organization handle that conflict?"
  ],
  "exit": [
   [
    "A retailer uses a marketing platform to email its customers. Who is the controller and who is the processor?",
    "The retailer is the controller; the marketing platform is the processor acting on its instructions."
   ],
   [
    "Which carries more weight with customers: a self-assessment or an external audit? Why?",
    "An external audit, because it is performed by an independent third party with no stake in the result."
   ],
   [
    "What is data minimization?",
    "Collecting and keeping only the personal data necessary for a specific purpose."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-line test for each role: who decides why and how (controller), who follows instructions (processor), who is the data about (subject); allow them to use it at each station.",
   "Extend: Ask fast finishers to write the steps a processor should take when it receives a deletion request directly from a data subject rather than from the controller, and to explain why the controller must be involved."
  ]
 },
 {
  "t": "Security awareness and phishing simulations",
  "objectives": [
   "Students will be able to describe the components of an effective security awareness program, including role-based and just-in-time training.",
   "Students will be able to explain how phishing simulations work and why they should educate rather than shame.",
   "Students will be able to compare awareness metrics and justify why reporting rate and speed are strong measures of effectiveness.",
   "Students will be able to identify common phishing warning signs in a sample message."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up prompt and a fictional suspicious email. Students list every warning sign they notice in two minutes."
   ],
   [
    12,
    "Teach",
    "Cover program content, delivery methods (onboarding, recurring, role-based, just-in-time), how simulations work, and metrics. Show the year-long program walkthrough numbers on the board and ask which number matters most."
   ],
   [
    15,
    "Activity",
    "Run the 'Design a simulation campaign' activity in groups."
   ],
   [
    8,
    "Discuss",
    "Groups present their campaign and metrics; discuss ethics and tone using the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Look at the email on the screen. List every clue that suggests it might be phishing. Then answer: if you clicked by mistake, what would make you more or less likely to tell someone?",
  "activity": {
   "title": "Design a simulation campaign",
   "materials": "Printed fictional phishing email samples (made by the teacher, using invented organizations and domains), chart paper, markers, sticky notes.",
   "steps": [
    "Assign each group a fictional department, such as finance, IT administrators, front-office staff or executives.",
    "Groups choose a realistic lure for that department, list the warning signs a trained person should spot, and decide its difficulty level.",
    "Groups write the just-in-time lesson a clicker would see and the positive message a reporter would see.",
    "Groups choose three metrics they will track and set a target for each after six months, explaining why reporting rate and time to report are included.",
    "Groups list one role-based training topic for their department and one technical control that should back up the training."
   ]
  },
  "discussion": [
   "Where is the line between a realistic simulation and one that is unfair or harmful to employee trust?",
   "If click rates never reach zero, why invest in awareness at all, and how should it work alongside technical controls?"
  ],
  "exit": [
   [
    "Why is the reporting rate often a better measure of program success than training completion?",
    "It measures real behavior; fast reports let the security team remove phishing from all mailboxes before others are harmed, while completion only shows the training was viewed."
   ],
   [
    "What is just-in-time training?",
    "A short lesson delivered at the moment a user makes a mistake, such as clicking a simulated phishing link."
   ],
   [
    "Why should simulations avoid shaming people who click?",
    "Shaming discourages reporting of real mistakes, which delays the response to genuine attacks."
   ]
  ],
  "differentiation": [
   "Support: Provide a checklist of common phishing warning signs and a template for the campaign plan with blanks for lure, warning signs, feedback messages and metrics.",
   "Extend: Ask fast finishers to analyze a fictional set of six-month results with a falling click rate but flat reporting rate, diagnose possible causes, and propose two program changes."
  ]
 }
]);
