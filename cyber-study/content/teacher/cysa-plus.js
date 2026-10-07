/* Teacher edition for CompTIA CySA+ (CS0-004): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("cysa-plus", [
 {
  "t": "System and network architecture: on-prem, cloud, hybrid, serverless, containers, segmentation, zero trust, SASE",
  "objectives": [
   "Students will be able to explain how responsibility for security controls shifts across on-premises, IaaS, PaaS, SaaS and hybrid environments.",
   "Students will be able to compare the visibility and main risks of serverless functions and containers.",
   "Students will be able to distinguish segmentation, microsegmentation, zero trust and SASE from scenario clue words.",
   "Students will be able to recommend architecture changes that limit lateral movement in a hybrid design."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question. Collect quick answers on the whiteboard in two columns, 'provider' and 'customer', and leave disagreements visible to revisit later."
   ],
   [
    15,
    "Teach",
    "Draw a stack (facilities, hardware, virtualization, operating system, application, data and identities) and shade who owns each layer for on-prem, IaaS, PaaS and SaaS. Then explain serverless and container risks, segmentation versus microsegmentation, the zero trust control and data planes, and the components of SASE. Stress that the customer always owns data and configuration."
   ],
   [
    15,
    "Activity",
    "Run 'Fix the Diagram' (below). Circulate and ask each group which log source would prove their control is working."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions. Have two groups present their top recommendation and let the class challenge it."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your company moves its email to a SaaS provider and a mailbox is found forwarding mail to an outside address because a user set a rule. Whose problem is that, the provider's or yours, and why?",
  "activity": {
   "title": "Fix the Diagram",
   "materials": "Whiteboard or large paper, markers, a printed one-page hybrid network diagram (web containers in a cloud, payroll on-prem, an any-to-any VPN, admins connecting from home), sticky notes.",
   "steps": [
    "Put students in groups of three or four and give each group the printed diagram.",
    "Ask them to mark, with sticky notes, every place an attacker who compromised one container could reach next.",
    "Have them label each component with who is responsible for securing it (provider or customer).",
    "Ask each group to propose three changes using the lesson's vocabulary: segmentation or microsegmentation, zero trust access, container hardening, or SASE.",
    "For each change, groups must name the log source that would show the control working, such as orchestration audit logs or policy engine decisions."
   ]
  },
  "discussion": [
   "When would SASE make more sense than building zero trust controls in your own data center?",
   "What do you lose as an analyst when a workload moves from a virtual machine to a serverless function, and how do you make up for it?"
  ],
  "exit": [
   [
    "In IaaS, who patches the guest operating system?",
    "The customer; the provider covers only facilities, hardware and virtualization."
   ],
   [
    "What does microsegmentation add beyond VLAN segmentation?",
    "Policy between individual workloads, limiting lateral movement even inside one zone."
   ],
   [
    "A scenario says 'never trust, always verify, regardless of network location.' Which model is it?",
    "Zero trust."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pre-filled responsibility table for IaaS, PaaS and SaaS with a few blanks, and let them use the clue-word list from the lesson's final paragraph during the activity.",
   "Extend: Ask fast finishers to redesign the diagram as a full zero trust architecture, labeling the policy engine, policy administrator and policy enforcement points, and explaining which logs each component would send to the SIEM."
  ]
 },
 {
  "t": "Identity and access: MFA, SSO, federation, PAM, just-in-time access, CASB",
  "objectives": [
   "Students will be able to explain the three MFA factor categories and why some MFA methods resist phishing better than others.",
   "Students will be able to compare SSO, federation, SAML, OAuth and OpenID Connect by their role in authentication or authorization.",
   "Students will be able to distinguish PAM, just-in-time access and CASB by the threat each addresses.",
   "Students will be able to interpret sign-in log evidence of MFA fatigue and list the containment steps."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and tally answers on the board. Use the disagreements to introduce factor categories."
   ],
   [
    15,
    "Teach",
    "Teach factor categories, weak and strong MFA methods, and MFA fatigue. Draw the federation flow: user, identity provider, signed assertion, service provider. Contrast SAML, OAuth and OpenID Connect. Finish with PAM, JIT and CASB, matching each to a threat."
   ],
   [
    15,
    "Activity",
    "Run the 'Read the Sign-in Log' activity (below). Circulate and ask each pair what the attacker can still do after the password reset."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, drawing on what pairs found in the log."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "Which of these is real multifactor authentication: a password and a PIN, a password and a fingerprint, or two different passwords? Defend your answer in one sentence.",
  "activity": {
   "title": "Read the Sign-in Log",
   "materials": "Projector or printed handout with a fictional 20-line sign-in log (many denied push prompts, one approval from a new country, a new MFA device registration, a new mailbox forwarding rule), pens, whiteboard.",
   "steps": [
    "Pair students and hand out the fictional log.",
    "Ask pairs to circle the first line where the attack becomes visible and the line where it succeeds.",
    "Have pairs name the attack and write the full containment list: disable account, revoke sessions and tokens, reset password, remove the new MFA device and forwarding rule, review accessed data.",
    "Ask each pair to choose one long-term control (number matching, FIDO2 keys, an alert on bursts of denied prompts) and justify it.",
    "Compare answers as a class and build one master response list on the whiteboard."
   ]
  },
  "discussion": [
   "SSO makes the identity provider a single point of failure. Is the trade-off worth it, and what would you do to protect the identity provider?",
   "Why might an organization keep SMS codes for some users even though stronger methods exist?"
  ],
  "exit": [
   [
    "What log pattern suggests MFA fatigue?",
    "Many denied push prompts in a short period followed by an approval, often at an odd hour or from an unusual location."
   ],
   [
    "Which protocol handles delegated authorization rather than authentication?",
    "OAuth 2.0."
   ],
   [
    "Which control removes standing admin rights?",
    "Just-in-time access."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column card set (control and the threat it counters) for students to match before the log activity, and highlight the key log lines for pairs that are stuck.",
   "Extend: Ask fast finishers to write a short SIEM detection rule in plain English for MFA fatigue, including the threshold and time window they would choose and how they would reduce false positives."
  ]
 },
 {
  "t": "Logging: log ingestion, time synchronization (NTP), log levels, Windows Event IDs, Sysmon, Linux auth logs",
  "objectives": [
   "Students will be able to explain why centralized log ingestion and NTP time synchronization are required for correlation.",
   "Students will be able to order the syslog severity levels and identify which is most severe.",
   "Students will be able to interpret common Windows Security event IDs, Sysmon event IDs and Linux auth log lines.",
   "Students will be able to distinguish brute force from password spraying using log evidence."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and let two or three students explain their reasoning. Introduce clock drift as the hidden cause."
   ],
   [
    15,
    "Teach",
    "Explain ingestion (push, pull, parse, normalize) and why logs must leave the host. Teach NTP and UTC, then the syslog levels with the mnemonic. Project a table of the key Windows IDs and Sysmon IDs, and show sample auth.log lines for failure and success."
   ],
   [
    15,
    "Activity",
    "Run 'Event ID Detective' (below). Circulate and ask each group what the logon type or parent process tells them."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions and connect answers back to the timeline groups built."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions and hand them in."
   ]
  ],
  "warmup": "A firewall says an attacker connected at 10:05. The server says the attacker logged on at 10:01. Both are in the same building. How is that possible?",
  "activity": {
   "title": "Event ID Detective",
   "materials": "Printed cards, each with one fictional log line (4625 bursts, a 4624 type 10, 4720, 4732, 1102, 7045, Sysmon 1 with Word as parent, Sysmon 10 on LSASS, auth.log 'Failed password for invalid user'), with timestamps from two devices, one offset by eight minutes; whiteboard.",
   "steps": [
    "Give each group of three a shuffled set of cards.",
    "Ask groups to correct the timestamps on the offset device's cards, then lay all cards in time order.",
    "Have them label each card with what it means in plain words.",
    "Ask each group to write a two-sentence story of the intrusion and identify whether the password attack was brute force or spraying.",
    "Groups compare stories; the teacher reveals the intended sequence."
   ]
  },
  "discussion": [
   "Debug logging gives the most detail. Why do most organizations avoid leaving it on in production?",
   "If an important log source suddenly stops sending events, what are the possible explanations and how would you tell them apart?"
  ],
  "exit": [
   [
    "Which syslog level is most severe, and what is it called?",
    "Level 0, emergency."
   ],
   [
    "What does event 4625 record, and what does event 1102 record?",
    "4625 is a failed logon; 1102 means the Security audit log was cleared."
   ],
   [
    "Where are SSH login failures recorded on an Ubuntu server?",
    "In /var/log/auth.log, or through journalctl on systemd hosts."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page reference sheet of the event IDs and syslog levels to use during the card activity, and pre-correct the timestamps for groups that are stuck.",
   "Extend: Ask fast finishers to identify which Sysmon events they would add to a configuration to detect credential dumping and lateral movement, and explain what noise each might create."
  ]
 },
 {
  "t": "Network indicators: beaconing, unusual bandwidth, irregular peer-to-peer traffic, rogue devices, scans, unexpected ports",
  "objectives": [
   "Students will be able to identify beaconing, exfiltration, irregular peer-to-peer traffic, rogue devices, scans and unexpected ports from traffic descriptions.",
   "Students will be able to explain why a baseline is required to judge network indicators.",
   "Students will be able to distinguish a port scan from a sweep using flow data.",
   "Students will be able to recommend a detection or control, such as NAC or DNS and proxy blocking, for each indicator."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question. Write students' guesses on the board and point out how many depend on knowing what is normal."
   ],
   [
    15,
    "Teach",
    "Explain baselines, then walk through each indicator with a sketch of what it looks like in flow or proxy data: regular beacon timeline with jitter, outbound-heavy byte counts, workstation-to-workstation SMB, rogue DHCP, scan versus sweep diagrams, and C2 over port 443."
   ],
   [
    15,
    "Activity",
    "Run 'Flow Record Sort' (below). Circulate and ask groups which column in the record gave them the answer."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions and connect them to the groups' findings."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "A laptop sends 300 bytes to the same website every five minutes, all weekend, with nobody logged in. Name two innocent explanations and one malicious one.",
  "activity": {
   "title": "Flow Record Sort",
   "materials": "Printed cards each showing a small fictional table of flow records (source, destination, port, bytes out, bytes in, time) illustrating beaconing, exfiltration, a sweep, a port scan, workstation SMB fan-out, a rogue DHCP server and normal web browsing; envelopes; whiteboard.",
   "steps": [
    "Give each group of three an envelope of cards.",
    "Ask groups to sort cards into labeled piles on the whiteboard: beaconing, exfiltration, lateral movement, rogue device, scan, sweep, normal.",
    "For each card, groups write the specific field values that justified their choice.",
    "Ask each group to pick one card and propose the next investigative step and one preventive control.",
    "Review as a class, focusing on any card groups placed differently."
   ]
  },
  "discussion": [
   "How would you build a baseline for a network that has never been monitored before, and how long would you collect data?",
   "Encryption hides traffic content. Which network indicators still work when everything is encrypted?"
  ],
  "exit": [
   [
    "What three clues together suggest beaconing?",
    "Regular intervals (even with jitter), consistent small sizes and a rare destination."
   ],
   [
    "What is the difference between a port scan and a sweep?",
    "A scan probes many ports on one host; a sweep probes one port across many hosts."
   ],
   [
    "Which control checks a device before admitting it to the network?",
    "Network access control (NAC)."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups a cheat card with one sentence per indicator describing its 'shape' in flow data, and reduce their envelope to four contrasting cards.",
   "Extend: Ask fast finishers to describe how they would compute a beaconing score in a SIEM using interval variance and destination rarity, and what legitimate software might produce false positives."
  ]
 },
 {
  "t": "Host indicators: unusual processes, masquerading binaries, unauthorized software, persistence (services, scheduled tasks, run keys)",
  "objectives": [
   "Students will be able to identify unusual processes using name, path, parent, user, signature and command line.",
   "Students will be able to explain common masquerading techniques and how to expose them.",
   "Students will be able to list Windows and Linux persistence locations and the event IDs that record them.",
   "Students will be able to apply an ordered host triage process that preserves evidence before remediation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up question on the projector and take a quick vote. Reveal that both processes could be malicious depending on path and parent."
   ],
   [
    15,
    "Teach",
    "Teach parent-child relationships with three examples (Word to PowerShell, web server to shell, services.exe to svchost). Cover masquerading tricks and how to expose them, then persistence on Windows (7045, 4697, 4698, Run keys, Autoruns) and Linux (cron, systemd, profiles, authorized_keys). Finish with the four-step triage order."
   ],
   [
    15,
    "Activity",
    "Run 'Spot the Impostor' (below). Circulate and ask pairs what evidence they would collect before removing anything."
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
  "warmup": "Two processes are both named svchost.exe. One runs from C:\\Windows\\System32 and the other from C:\\Users\\Public. Which would you investigate, and what else would you want to know?",
  "activity": {
   "title": "Spot the Impostor",
   "materials": "Printed fictional process listing (name, path, parent, user, signed or unsigned, command line) for one workstation with about 25 rows including three planted suspicious entries, plus a printed Autoruns-style list of autostart entries with two planted persistence items; highlighters.",
   "steps": [
    "Pair students and hand out both printouts.",
    "Ask pairs to highlight every process that fails a check on path, parent, user, signature or command line, and write which check it failed.",
    "Have pairs match suspicious processes to the autostart entries that would relaunch them.",
    "Ask pairs to write their response in order: evidence to collect, persistence to remove, fleet-wide search terms, and a detection rule to add.",
    "Reveal the planted items and discuss any false positives pairs flagged."
   ]
  },
  "discussion": [
   "Why might a company allow some unapproved software instead of blocking everything with an allow list?",
   "How would you decide whether to rebuild a compromised host rather than clean it?"
  ],
  "exit": [
   [
    "Which process normally starts svchost.exe, and from which folder does it run?",
    "services.exe, from C:\\Windows\\System32."
   ],
   [
    "What does Windows event 7045 record?",
    "A new service installed, recorded in the System log."
   ],
   [
    "Name two Linux persistence locations.",
    "Cron jobs and systemd service units; others include shell profile files and authorized_keys."
   ]
  ],
  "differentiation": [
   "Support: Give struggling pairs a checklist card of the five checks (name, path, parent, user, signature) and a short table of normal paths and parents for common Windows processes.",
   "Extend: Ask fast finishers to write a plain-English detection rule for 'Office application spawns a script interpreter', list legitimate cases that might trigger it, and explain how to tune them out."
  ]
 },
 {
  "t": "Application indicators: anomalous activity, new accounts, unexpected output, injection strings in web logs",
  "objectives": [
   "Students will be able to identify anomalous application activity, unexpected new accounts and unexpected output from log descriptions.",
   "Students will be able to recognize SQL injection, XSS, directory traversal and command injection attempts in decoded web log lines.",
   "Students will be able to use status codes, response sizes and database audit logs to judge whether an attack succeeded.",
   "Students will be able to recommend short-term and long-term responses to a likely successful injection."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up log line and ask students to guess what it means. Gather ideas without confirming."
   ],
   [
    15,
    "Teach",
    "Explain baselines for applications, then status codes (401, 403, 404, 500, 200) and what floods of each suggest. Show decoded examples of each injection family for recognition only. Emphasize 'attempt versus success' and the role of response size and database audit logs."
   ],
   [
    15,
    "Activity",
    "Run 'Attempt or Success' (below). Circulate and ask pairs which field changed their verdict."
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
  "warmup": "A log line shows a request ending in %2e%2e%2f%2e%2e%2fetc%2fpasswd with a 404 response. What do you think the visitor wanted, and did they get it?",
  "activity": {
   "title": "Attempt or Success",
   "materials": "Printed handout of about 15 fictional web access log lines with encoded query strings, status codes and response sizes, plus a short matching database audit excerpt; student laptops with a browser for decoding (CyberChef can run in the browser, or students can decode by hand from a percent-encoding table).",
   "steps": [
    "Pair students and hand out the log lines.",
    "Ask pairs to decode each query string and label the attack family, or 'normal'.",
    "Have pairs mark each line 'attempt' or 'likely success' based on status code and response size, and confirm against the database audit excerpt.",
    "Ask pairs to write one short-term action and one permanent fix for any likely success.",
    "Review as a class, discussing any line pairs judged differently."
   ]
  },
  "discussion": [
   "Why do developers sometimes leave detailed error messages turned on in production, and what risk does that create?",
   "If you could alert on only one application metric, which would you choose and why?"
  ],
  "exit": [
   [
    "What does %2e%2e%2f decode to, and what does it indicate?",
    "../, a directory traversal attempt."
   ],
   [
    "What log evidence suggests a SQL injection attempt succeeded?",
    "A change from errors to 200 responses with abnormally large sizes, confirmed by unusual queries in the database audit log."
   ],
   [
    "Why is an admin account created at 3 a.m. with no ticket an indicator of compromise?",
    "Attackers create accounts to keep access; legitimate accounts should match a change ticket or HR request."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card listing each injection family's tell-tale characters and a percent-encoding table, and reduce the handout to eight lines for pairs who need more time.",
   "Extend: Ask fast finishers to explain why parameterized queries prevent SQL injection while input filtering alone does not, and to describe one detection rule using response size per endpoint."
  ]
 },
 {
  "t": "Tools: SIEM, SOAR, EDR, Wireshark/tcpdump, sandboxing, CyberChef, reputation and WHOIS lookups",
  "objectives": [
   "Students will be able to match investigation tasks to SIEM, SOAR, EDR, Wireshark, tcpdump, sandboxes, CyberChef, reputation and WHOIS lookups.",
   "Students will be able to explain the limits of each tool, including sandbox evasion and encrypted traffic.",
   "Students will be able to sequence tools into a logical investigation workflow for a suspicious alert.",
   "Students will be able to identify data-handling risks when using public analysis services."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario and have students shout out the first tool they would open. List answers on the board."
   ],
   [
    15,
    "Teach",
    "Present each tool as 'the question it answers', with a one-slide example of its output. Demonstrate a tcpdump command and a Wireshark display filter on a projected screenshot. Highlight the SIEM versus SOAR distinction and sandbox limits."
   ],
   [
    15,
    "Activity",
    "Run 'Tool Relay' (below). Circulate and ask groups to justify each handoff."
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
  "warmup": "An alert says PowerShell ran a long encoded command on a laptop. Name the first tool you would open and the question you want it to answer.",
  "activity": {
   "title": "Tool Relay",
   "materials": "Printed tool cards (SIEM, SOAR, EDR, tcpdump, Wireshark, sandbox, CyberChef, reputation lookup, WHOIS), printed scenario cards with one fictional investigation each, sticky notes, whiteboard.",
   "steps": [
    "Give each group of four a set of tool cards and one scenario card.",
    "Groups lay out tool cards in the order they would use them, writing on a sticky note the question each tool answers and what output they expect.",
    "Groups mark any tool they would deliberately not use and why, such as not uploading a sensitive file to a public sandbox.",
    "Each group presents its sequence in two minutes while others note disagreements.",
    "The teacher reveals a model sequence and discusses alternatives that are also valid."
   ]
  },
  "discussion": [
   "When should a SOAR playbook require human approval before acting, and when is full automation acceptable?",
   "If WHOIS registrant details are hidden by a privacy service, which fields are still useful to an analyst?"
  ],
  "exit": [
   [
    "Which tool would automatically enrich an alert and disable a user account?",
    "A SOAR platform running a playbook."
   ],
   [
    "Why might a sandbox show nothing for real malware?",
    "It may detect the virtual environment, wait for user activity or delay execution."
   ],
   [
    "Which lookup shows when a domain was registered?",
    "WHOIS."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page table of each tool, the question it answers and an example output, and give struggling groups a scenario with only four relevant tools.",
   "Extend: Ask fast finishers to design a SOAR playbook for phishing reports as a flowchart, including decision points, approval gates and what gets logged."
  ]
 },
 {
  "t": "Email analysis: headers, SPF, DKIM, DMARC, impersonation and malicious attachments",
  "objectives": [
   "Students will be able to trace an email's path using Received headers and identify mismatches between From, Return-Path and Reply-To.",
   "Students will be able to explain what SPF, DKIM and DMARC each verify and the effect of DMARC policies.",
   "Students will be able to recognize impersonation forms, including display name spoofing, lookalike domains and business email compromise.",
   "Students will be able to describe safe handling of suspicious attachments and links."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up question and take a show of hands. Use the split to introduce the idea that the visible From line can be forged."
   ],
   [
    15,
    "Teach",
    "Project a fictional full header and walk through From, Return-Path, Reply-To and Received headers bottom up. Draw a three-box diagram of SPF, DKIM and DMARC with what each checks. Cover DMARC policies, impersonation types and safe attachment handling."
   ],
   [
    15,
    "Activity",
    "Run 'Header Autopsy' (below). Circulate and ask pairs which single line most changed their verdict."
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
  "warmup": "An email shows your company president's name and photo in the From line. Does that prove it came from the president? What would you check?",
  "activity": {
   "title": "Header Autopsy",
   "materials": "Three printed fictional email headers (a legitimate message, a lookalike-domain phish with SPF fail and an HTML attachment, and a compromised-account BEC that passes all checks), highlighters, a printed verdict sheet.",
   "steps": [
    "Pair students and give each pair all three headers.",
    "Pairs highlight the origin in the Received headers, then circle From, Return-Path and Reply-To and note any mismatch.",
    "Pairs record SPF, DKIM and DMARC results and explain what each result means.",
    "Pairs give a verdict (legitimate, phish, BEC) for each header with two pieces of evidence, plus a response step.",
    "The class compares verdicts, focusing on the BEC example that passes all checks."
   ]
  },
  "discussion": [
   "Why might a company keep its DMARC policy at p=none for months before moving to reject?",
   "What process controls, beyond technology, stop business email compromise payments?"
  ],
  "exit": [
   [
    "Which mechanism protects the visible From address, and how?",
    "DMARC, by requiring SPF or DKIM to pass with a domain aligned to the From domain."
   ],
   [
    "How do you find the originating server in Received headers?",
    "Read from the bottom up; the lowest header is the first hop."
   ],
   [
    "Why can a phishing email pass SPF, DKIM and DMARC?",
    "It may come from a compromised real account or an attacker-controlled lookalike domain configured correctly."
   ]
  ],
  "differentiation": [
   "Support: Give struggling pairs a labeled sample header with each field explained, and a three-row table summarizing SPF, DKIM and DMARC to keep beside them.",
   "Extend: Ask fast finishers to write SPF and DMARC records for a fictional domain that sends through one cloud mail service, and explain a safe rollout from p=none to p=reject."
  ]
 },
 {
  "t": "Threat intelligence: actor types, TTPs, confidence (timeliness, relevancy, accuracy), open vs closed sources, ISACs, STIX/TAXII",
  "objectives": [
   "Students will be able to classify threat actors by motivation and capability.",
   "Students will be able to explain TTPs and why they are more durable than indicators of compromise.",
   "Students will be able to evaluate intelligence using timeliness, relevancy and accuracy.",
   "Students will be able to distinguish open and closed sources, ISACs, and the roles of STIX and TAXII."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and let students argue briefly. Note that every good answer depends on age, relevance or source."
   ],
   [
    15,
    "Teach",
    "Cover actor types with one-line motives, then TTPs and the pyramid of pain. Teach the three confidence qualities with the mnemonic, then sources (open, closed, ISACs, TLP) and STIX versus TAXII with the 'stuff and taxi' line."
   ],
   [
    15,
    "Activity",
    "Run 'Intel Triage Board' (below). Circulate and ask groups which quality each card fails."
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
  "warmup": "You get a list of 10,000 'malicious' IP addresses with no date or source. Would you block them all on your firewall today? Why or why not?",
  "activity": {
   "title": "Intel Triage Board",
   "materials": "About 12 printed fictional intelligence cards (varying age, source, sector and corroboration), sticky notes, whiteboard divided into 'Act now', 'Monitor' and 'Discard'.",
   "steps": [
    "Give each group of three a set of intelligence cards and a short profile of a fictional organization (sector, key technologies, region).",
    "Groups rate each card on timeliness, relevancy and accuracy using sticky notes (high, medium, low).",
    "Groups place each card on the whiteboard in Act now, Monitor or Discard.",
    "For each 'Act now' card, groups name the actor type and one TTP they would hunt for rather than just blocking indicators.",
    "Compare boards across groups and discuss differences."
   ]
  },
  "discussion": [
   "What are the risks of sharing your own incident details with an ISAC, and how do TLP labels help?",
   "Why might an organization still block indicators even though TTPs are more durable?"
  ],
  "exit": [
   [
    "What are the three confidence qualities for judging intelligence?",
    "Timeliness, relevancy and accuracy."
   ],
   [
    "What is the relationship between STIX and TAXII?",
    "STIX structures threat information; TAXII transports it between systems."
   ],
   [
    "Which actor type is financially motivated and commonly runs ransomware?",
    "Organized crime."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups a rating guide with example phrases for high, medium and low on each quality, and fewer cards with clearer contrasts.",
   "Extend: Ask fast finishers to map one fictional actor's described behavior to MITRE ATT&CK tactics and techniques and propose one behavior-based detection for each."
  ]
 },
 {
  "t": "Threat hunting: hypotheses, IoC collection, focus areas, active defense and honeypots",
  "objectives": [
   "Students will be able to write a testable threat hunting hypothesis that names the expected behavior and data sources.",
   "Students will be able to explain IoC collection, stacking and the choice of focus areas.",
   "Students will be able to distinguish threat hunting from incident response and active defense from hack-back.",
   "Students will be able to describe honeypots, honeynets and honeytokens and why their alerts are high-confidence."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect answers. Steer toward the idea that quiet can mean blindness."
   ],
   [
    15,
    "Teach",
    "Define hunting versus incident response. Model writing a hypothesis from intelligence, then show a stacking table where four hosts out of 3,000 stand out. Cover focus areas, then active defense and the deception family, ending with the hack-back boundary and the hunt cycle."
   ],
   [
    15,
    "Activity",
    "Run 'Hunt Planning Sprint' (below). Circulate and push groups to make hypotheses testable."
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
  "warmup": "Your SIEM has had no critical alerts for a month. Does that mean the network is clean? Give one reason it might not be.",
  "activity": {
   "title": "Hunt Planning Sprint",
   "materials": "Printed intelligence snippet cards (one fictional actor behavior each), a printed stacking table for one card showing a persistence attribute across many hosts with a few outliers, a hunt-plan template (hypothesis, data, query idea, outcome, follow-up detection), whiteboard.",
   "steps": [
    "Give each group of three one intelligence card and the hunt-plan template.",
    "Groups write a testable hypothesis and list the data sources that would confirm or refute it.",
    "Hand out the stacking table; groups identify the outliers and decide what to investigate first.",
    "Groups propose one deception item (honeypot, honeytoken or honeyfile) suited to their scenario and explain where they would place it safely.",
    "Each group shares its hypothesis; the class rates it as testable or not and suggests improvements."
   ]
  },
  "discussion": [
   "How would you choose between hunting in your most critical assets and hunting where your visibility is weakest?",
   "Why is hack-back tempting after an attack, and what could go wrong?"
  ],
  "exit": [
   [
    "What makes a good hunting hypothesis?",
    "It is testable, states the expected attacker behavior and names the data that will confirm or refute it."
   ],
   [
    "How does stacking help a hunter?",
    "It counts occurrences across many systems so rare outliers stand out for investigation."
   ],
   [
    "Why do honeypot alerts have a low false positive rate?",
    "Legitimate users have no reason to interact with a decoy, so almost any activity is suspicious."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups a hypothesis sentence frame ('If [actor] is present, we will see [behavior] in [data source]') and a partially completed hunt plan.",
   "Extend: Ask fast finishers to map their hunt to a MITRE ATT&CK technique, write the detection rule they would add afterward, and explain how they would measure hunt coverage over a quarter."
  ]
 },
 {
  "t": "Process improvement: standardizing processes, automation and orchestration, tuning alerts, single pane of glass, safe use of AI assistants",
  "objectives": [
   "Students will be able to distinguish automation from orchestration and give a SOC example of each.",
   "Students will be able to explain why processes must be standardized before they are automated.",
   "Students will be able to recommend alert tuning methods that reduce false positives without creating false negatives.",
   "Students will be able to identify safe and unsafe uses of AI assistants in security operations."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect two or three answers on the whiteboard as a list of 'things that slow a SOC down'."
   ],
   [
    12,
    "Teach",
    "Walk through standardization, automation versus orchestration, alert tuning, single pane of glass and AI safety. Draw the phishing triage flow on the board and mark which steps are automation and where orchestration ties them together."
   ],
   [
    18,
    "Activity",
    "Run the playbook design activity in groups of three or four, then have one group present its flow on the projector."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to surface where humans must stay in the loop and how to measure success."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and leave it on the door."
   ]
  ],
  "warmup": "Imagine you are on a night shift with 600 alerts in the queue and 90 percent of them are false. What happens to the 10 percent that are real, and what would you change first?",
  "activity": {
   "title": "Design a phishing triage playbook",
   "materials": "Whiteboard or large paper, sticky notes in two colors, printed scenario card describing 400 phishing reports per week at 15 minutes each.",
   "steps": [
    "Give each group the scenario card. On yellow sticky notes, they list every manual step an analyst takes for one reported phishing email.",
    "Groups arrange the steps into a standard procedure and write the escalation criteria at the end.",
    "Using a second color, they mark which steps should be automated, which steps an orchestration playbook would chain together across tools, and which steps need human approval.",
    "Each group adds two metrics they would track to prove the playbook helped, such as MTTR or analyst minutes per report.",
    "Groups swap boards and look for one risk in the other group's design, such as an automatic mail purge with no approval."
   ]
  },
  "discussion": [
   "Which SOC actions should never be fully automated, and why?",
   "How would you know whether an alert tuning change made the SOC safer or just quieter?",
   "What rules would you write into an acceptable use policy for AI assistants in the SOC?"
  ],
  "exit": [
   [
    "What is the difference between automation and orchestration?",
    "Automation performs a single repetitive task; orchestration coordinates many tools and tasks into one workflow, often through SOAR."
   ],
   [
    "Why is suppressing alerts for an entire subnet a poor tuning choice?",
    "It can hide real attacks, creating false negatives; tuning should use narrow, documented exceptions."
   ],
   [
    "Name one safe practice for using an AI assistant during an investigation.",
    "Do not paste sensitive data into unapproved tools, or verify the output before acting on it."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed playbook with blanks for students to label as automation, orchestration or human step, and a one-page glossary of SOAR, MTTD and MTTR.",
   "Extend: Ask students to write measurable success criteria for the playbook and identify how a prompt injection hidden in a reported email could affect an AI-assisted triage step."
  ]
 },
 {
  "t": "Asset discovery and scan types: active vs passive, credentialed vs non-credentialed, agent vs agentless, internal vs external",
  "objectives": [
   "Students will be able to explain why asset discovery is the first step of vulnerability management and name at least three discovery sources.",
   "Students will be able to compare active and passive, credentialed and non-credentialed, agent and agentless, and internal and external scans.",
   "Students will be able to select the appropriate scan type for a described constraint."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the board as 'places an unknown device could hide'."
   ],
   [
    12,
    "Teach",
    "Present discovery sources, then draw a two-column table for each scan pair with strengths and limits. Emphasize the exam cue words for each type."
   ],
   [
    18,
    "Activity",
    "Run the scan-type matching card activity in pairs, then review answers together."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions, focusing on why credentialed scans need careful account protection."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on paper."
   ]
  ],
  "warmup": "If your company bought a new office last month, list every way you could find out which computers and devices are in it without walking around.",
  "activity": {
   "title": "Match the scan to the situation",
   "materials": "Printed cards: eight scenario cards and eight scan-type cards (active, passive, credentialed, non-credentialed, agent-based, agentless, internal, external).",
   "steps": [
    "Give each pair a shuffled set of scenario cards, such as 'laptops rarely on the VPN' or 'need to see what an internet attacker sees'.",
    "Pairs match each scenario to the best scan-type card and write one sentence justifying the match.",
    "Pairs then pick two scenarios where a second scan type would add value and explain why.",
    "Review as a class, with the teacher revealing the exam cue words for each match on the projector."
   ]
  },
  "discussion": [
   "What could go wrong if the credentialed scan account were stolen, and how would you limit the damage?",
   "Why might a CMDB and DHCP leases disagree, and which would you trust?"
  ],
  "exit": [
   [
    "Which scan type gives the most accurate patch information with the fewest false positives?",
    "A credentialed scan, because it reads installed software and patch levels directly."
   ],
   [
    "Which approach suits fragile systems that must not receive probes?",
    "Passive monitoring, which observes existing traffic without sending anything."
   ],
   [
    "What does an external scan show that an internal scan does not?",
    "The internet-facing attack surface as seen by an attacker outside the perimeter."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference sheet with each scan pair side by side and one example scenario for each before they start the card match.",
   "Extend: Have students design a quarterly scanning program for a company with an office network, remote laptops, network appliances and a public website, naming the scan type used for each."
  ]
 },
 {
  "t": "Special environments: OT/ICS, cloud, mobile and scanning without disrupting production",
  "objectives": [
   "Students will be able to explain why OT and ICS systems require different vulnerability assessment methods than ordinary IT systems.",
   "Students will be able to recommend appropriate assessment approaches for cloud workloads and mobile devices.",
   "Students will be able to list techniques that reduce the chance of a scan disrupting production."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up prompt and have students vote by show of hands, then ask two students to defend opposite answers."
   ],
   [
    12,
    "Teach",
    "Introduce OT terms (SCADA, PLC, HMI), why availability and safety come first, then cloud and mobile approaches. Finish with the list of safe scanning techniques."
   ],
   [
    18,
    "Activity",
    "Run the scan plan review: groups critique and rewrite a flawed scan plan."
   ],
   [
    5,
    "Discuss",
    "Debrief using the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions individually."
   ]
  ],
  "warmup": "A contractor wants to run the same vulnerability scan on the office printers and on the controllers that run a water treatment plant. Is that a good idea? Why or why not?",
  "activity": {
   "title": "Fix the dangerous scan plan",
   "materials": "Printed one-page scan plan (written by the teacher) that schedules a full active scan of all subnets, including OT, cloud and a mobile VLAN, at noon on a weekday with no notice to the SOC.",
   "steps": [
    "In groups, students circle every part of the plan that could cause disruption or miss assets.",
    "For each problem, groups write the safer alternative: passive monitoring, CSPM, agents, MDM, maintenance window, throttling, exclusions or notification.",
    "Groups rewrite the plan as a short numbered schedule on large paper.",
    "Two groups present their revised plans and the class compares choices."
   ]
  },
  "discussion": [
   "Why do OT environments put availability and safety ahead of confidentiality, and how does that change security decisions?",
   "Who should be told before a scan runs, and what could happen if they are not?"
  ],
  "exit": [
   [
    "What is the preferred way to gather vulnerability data from fragile ICS devices?",
    "Passive monitoring of traffic, such as a sensor on a SPAN port, plus vendor advisories."
   ],
   [
    "Why do point-in-time scans miss much of a cloud environment?",
    "Instances are created and destroyed automatically, so many do not exist when the scan runs."
   ],
   [
    "Name two ways to reduce the chance a scan disrupts production.",
    "Any two of: maintenance windows, throttling, disabling dangerous checks, excluding fragile hosts, testing policies in a lab, notifying owners and the SOC."
   ]
  ],
  "differentiation": [
   "Support: Provide a word bank of safe alternatives (passive monitoring, CSPM, MDM, throttling, maintenance window) for students to match to each flaw in the plan.",
   "Extend: Ask students to sketch a network diagram showing an IT zone, a DMZ and an OT zone, and describe which connections the firewalls should allow."
  ]
 },
 {
  "t": "Scanner and tool output: Nessus/OpenVAS reports, nmap, web app scanners, SAST, DAST, SCA, fuzzing, cloud posture tools",
  "objectives": [
   "Students will be able to interpret the key fields of a vulnerability scanner finding, including severity, CVSS, CVE references and evidence.",
   "Students will be able to read nmap output and distinguish open, closed and filtered port states.",
   "Students will be able to compare SAST, DAST, SCA and fuzzing by when and how each tests software.",
   "Students will be able to identify the kind of finding a cloud posture tool reports."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the nmap sample from the lesson and ask the warm-up question."
   ],
   [
    12,
    "Teach",
    "Walk through a mock scanner finding field by field, then nmap options and states, then the testing methods using the car inspection analogy."
   ],
   [
    18,
    "Activity",
    "Run the output detective stations activity in small groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect tools to the development pipeline."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Looking at this nmap output, what do you think the difference is between 'open' and 'filtered', and which port would an attacker care about most?",
  "activity": {
   "title": "Output detective stations",
   "materials": "Four printed station cards made by the teacher: a mock scanner finding with an evidence section, an nmap output excerpt, a pipeline summary with SAST, DAST and SCA results, and a CSPM finding list.",
   "steps": [
    "Place one card at each of four stations around the room. Groups rotate every four minutes.",
    "At each station, groups answer two questions on a worksheet, such as 'Is this finding based on a banner or an authenticated check?' or 'Which tool found the vulnerable library?'",
    "At the CSPM station, groups rank the misconfigurations by risk and justify the top choice.",
    "The teacher reviews answers on the projector and highlights exam cue words for each tool."
   ]
  },
  "discussion": [
   "Where in a development pipeline would you run SAST, SCA, DAST and fuzzing, and why in that order?",
   "How much should you trust a finding that is based only on a version banner?"
  ],
  "exit": [
   [
    "In nmap output, what does 'filtered' usually indicate?",
    "Probes were blocked or unanswered, usually by a firewall, so nmap cannot see whether a service is listening."
   ],
   [
    "Which method analyzes source code without running it?",
    "Static application security testing (SAST)."
   ],
   [
    "Which method identifies a vulnerable open-source library and can produce an SBOM?",
    "Software composition analysis (SCA)."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page cheat sheet of nmap port states and a four-row table describing SAST, DAST, SCA and fuzzing to use during the stations.",
   "Extend: Ask students to write a short triage note for the scanner finding, stating whether it needs validation and what evidence would confirm it."
  ]
 },
 {
  "t": "Validating results: true/false positives and negatives, backported patches",
  "objectives": [
   "Students will be able to define and classify true positives, false positives, true negatives and false negatives from scenarios.",
   "Students will be able to explain why backported patches cause banner-based false positives.",
   "Students will be able to describe at least three methods for validating a scanner finding."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the smoke alarm warm-up question and sketch a blank two-by-two grid on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Fill in the grid with the four outcomes, explain why false negatives are the most dangerous, then walk through backported patches and validation methods."
   ],
   [
    18,
    "Activity",
    "Run the four-box card sort in pairs, followed by the backport investigation using the printed changelog excerpt."
   ],
   [
    5,
    "Discuss",
    "Discuss how validation builds trust with system owners."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the exit questions."
   ]
  ],
  "warmup": "A smoke alarm can go off when there is no fire, or stay silent during a real fire. Which failure is worse, and why?",
  "activity": {
   "title": "Four-box sort and backport investigation",
   "materials": "Printed scenario cards (ten short detection outcomes), a large four-box grid on the whiteboard, and a printed mock finding with a matching mock package changelog and vendor advisory excerpt made by the teacher.",
   "steps": [
    "Pairs sort ten scenario cards into true positive, false positive, true negative and false negative.",
    "Pairs place their hardest card on the whiteboard grid and explain their reasoning to the class.",
    "Each pair receives the mock OpenSSH finding, changelog and advisory, and decides whether the finding is a true or false positive.",
    "Pairs write a two-sentence ticket note recording the evidence and a review date."
   ]
  },
  "discussion": [
   "How does sending false positives to system owners affect the security team's credibility?",
   "What process would you put in place to make sure a clean scan result is trustworthy?"
  ],
  "exit": [
   [
    "An attack happened and no alert fired. What is this outcome called?",
    "A false negative."
   ],
   [
    "Why might a fully patched Red Hat server be flagged by a banner-based scanner?",
    "The vendor backported the fix without changing the upstream version number, so the banner still looks vulnerable."
   ],
   [
    "Name two ways to validate a suspected false positive.",
    "Any two of: compare the installed package with the vendor advisory or changelog, run a credentialed scan, check configuration on the host, correlate with another tool, confirm with the system owner."
   ]
  ],
  "differentiation": [
   "Support: Provide a filled-in example for each box of the grid before the card sort, and highlight the key fields on the mock changelog.",
   "Extend: Ask students to explain how tuning an IDS to reduce false positives can increase false negatives, and propose a way to measure the balance."
  ]
 },
 {
  "t": "Prioritization: CVSS base metrics and vectors, EPSS, CISA KEV, asset value, exploitability, context",
  "objectives": [
   "Students will be able to decode a CVSS v3.x base vector string into plain language.",
   "Students will be able to distinguish what CVSS, EPSS and the CISA KEV catalog each measure.",
   "Students will be able to prioritize a set of findings using severity, likelihood, exploitation evidence and asset context."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the emergency room warm-up question and record the factors students name."
   ],
   [
    13,
    "Teach",
    "Decode the sample vector on the projector metric by metric, then explain EPSS, KEV and context. Show how changing AV or UI changes the meaning."
   ],
   [
    17,
    "Activity",
    "Run the prioritization triage activity in groups."
   ],
   [
    5,
    "Discuss",
    "Groups compare their top three and defend differences."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "In a hospital emergency room, who gets seen first: the patient with the most serious diagnosis, or the patient who is getting worse right now? What else would you want to know?",
  "activity": {
   "title": "Patch window triage",
   "materials": "Printed finding cards made by the teacher (eight findings, each with a CVSS vector and score, an EPSS value, a KEV yes or no, the asset name, its exposure and its business role), plus a whiteboard ranking column.",
   "steps": [
    "Each group decodes two assigned vectors into plain language and writes them on the back of the cards.",
    "Groups rank all eight findings for a patch window that fits only three fixes.",
    "Groups write a one-sentence justification for each of their top three, naming which factor decided it.",
    "Groups post their ranking on the whiteboard and the teacher highlights where KEV or exposure overrode raw CVSS."
   ]
  },
  "discussion": [
   "When, if ever, should a CVSS 9.8 finding wait behind a CVSS 7.5 finding?",
   "How would you explain to a manager why the 'critical' finding is not being fixed first this week?"
  ],
  "exit": [
   [
    "What does AV:N/PR:N/UI:N tell you about a vulnerability?",
    "It can be exploited remotely over the network by an unauthenticated attacker with no user interaction."
   ],
   [
    "Which source estimates the probability of exploitation in the near future?",
    "EPSS, the Exploit Prediction Scoring System."
   ],
   [
    "Why might a KEV-listed CVSS 7.5 finding be fixed before a CVSS 9.1 finding?",
    "KEV confirms active exploitation, and if the asset is exposed and critical that outweighs a higher severity score on a less important, isolated system."
   ]
  ],
  "differentiation": [
   "Support: Provide a vector decoding key listing every base metric abbreviation and value, and pair struggling students with a partner for the first two cards.",
   "Extend: Ask students to draft a short prioritization policy with remediation deadlines that differ for KEV-listed, internet-facing and internal findings."
  ]
 },
 {
  "t": "Common software vulnerabilities: injection, XSS, SSRF, IDOR, broken access control, buffer overflow, insecure cookies",
  "objectives": [
   "Students will be able to identify injection, XSS, SSRF, IDOR, broken access control, buffer overflow and insecure cookie issues from a short description or log excerpt.",
   "Students will be able to distinguish XSS from CSRF and SSRF from CSRF.",
   "Students will be able to explain whether a flaw is an authentication or authorization failure.",
   "Students will be able to describe what each cookie security flag protects against."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about changing a number in a web address and take a quick poll."
   ],
   [
    13,
    "Teach",
    "Present each vulnerability class with the hotel analogy, emphasizing who executes the payload and which check is missing. Show what each looks like in logs."
   ],
   [
    17,
    "Activity",
    "Run the log evidence card sort in pairs."
   ],
   [
    5,
    "Discuss",
    "Discuss which classes were hardest to tell apart and why."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You are logged in to a shopping site and change the order number in the address bar from 1001 to 1002. You see someone else's order. Was the site hacked, or did it just forget something? What did it forget?",
  "activity": {
   "title": "Name that vulnerability",
   "materials": "Printed evidence cards made by the teacher: ten short, defanged log lines or scenario descriptions (for example, sequential order IDs from one session, a script tag in a review field, a server connecting to an internal address, a crash after long input, a cookie without HttpOnly). No working payloads.",
   "steps": [
    "Pairs sort each evidence card under one of seven labeled headings on their desk: injection, XSS, SSRF, IDOR, broken access control, buffer overflow, insecure cookie.",
    "For each card, pairs write who or what executes the input, or which check is missing.",
    "Pairs pick the two cards they found most confusing and explain to another pair how they decided.",
    "The teacher reveals answers and calls out the exam cue phrase for each class."
   ]
  },
  "discussion": [
   "Why does the question 'who executes the payload' help separate injection, XSS and SSRF?",
   "Why do cloud environments make SSRF more serious than it used to be?"
  ],
  "exit": [
   [
    "Changing an ID in a request reveals another user's data. What is the flaw, and is it authentication or authorization?",
    "IDOR, an authorization failure, because the user is logged in but ownership of the object is not checked."
   ],
   [
    "What is the difference between SSRF and CSRF?",
    "In SSRF the server makes the request; in CSRF the victim's browser sends a forged request to a trusted site."
   ],
   [
    "Which cookie flag stops JavaScript from reading a session cookie?",
    "HttpOnly."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision flowchart with three questions (Does a database or shell run the input? Does another user's browser run it? Does the server make a request?) to guide the card sort.",
   "Extend: Ask students to write the detection logic in plain words for a SIEM alert that would flag likely IDOR enumeration in web logs."
  ]
 },
 {
  "t": "Recommending controls: input validation, output encoding, parameterized queries, memory protections, secure coding",
  "objectives": [
   "Students will be able to match common vulnerabilities to their primary remediation control.",
   "Students will be able to explain why parameterized queries prevent SQL injection and why output encoding prevents XSS.",
   "Students will be able to distinguish primary fixes from compensating layers such as WAFs and memory protections."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a 'bad character filter' and collect opinions."
   ],
   [
    12,
    "Teach",
    "Explain input validation, output encoding with the HTML example, parameterized queries using the code sample on the projector, memory protections and secure coding practices."
   ],
   [
    18,
    "Activity",
    "Run the fix-it pairing activity and the code reading task."
   ],
   [
    5,
    "Discuss",
    "Discuss why compensating layers are still useful even though they are not fixes."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the exit questions."
   ]
  ],
  "warmup": "A web team says it will stop all attacks by blocking a list of 'bad characters' typed into forms. What problems can you predict with that plan?",
  "activity": {
   "title": "Flaw-to-fix matching and code reading",
   "materials": "Printed cards made by the teacher: eight vulnerability cards and ten control cards (including distractors such as 'client-side validation' and 'hide the button'), plus the unsafe and safe query sample printed on paper or projected.",
   "steps": [
    "Pairs match each vulnerability card to its primary control card, then add any supporting controls.",
    "Pairs set aside the distractor cards and write one sentence explaining why each is not a real fix.",
    "Using the printed query sample, pairs annotate exactly why the first line is unsafe and the second is safe.",
    "The class reviews matches together, and the teacher records the correct pairings on the whiteboard."
   ]
  },
  "discussion": [
   "If a WAF does not fix a vulnerability, why do organizations still deploy one?",
   "Why must output encoding change depending on where the data is placed in a page?"
  ],
  "exit": [
   [
    "What is the primary control against SQL injection?",
    "Parameterized queries, also called prepared statements."
   ],
   [
    "What is the primary control against XSS?",
    "Context-aware output encoding, supported by a Content Security Policy."
   ],
   [
    "Name one memory protection and state whether it fixes buffer overflows.",
    "ASLR, DEP/NX or stack canaries; none of them fixes the flaw, they only make exploitation harder."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference table pairing each vulnerability with its primary control before the matching activity, and have students explain the table in their own words.",
   "Extend: Ask students to write a short remediation recommendation for a developer that includes the primary fix, supporting controls and how to verify the fix with testing."
  ]
 },
 {
  "t": "Compensating controls, segmentation and exceptions for systems that cannot be patched",
  "objectives": [
   "Students will be able to define a compensating control and judge whether a proposed control addresses the same threat.",
   "Students will be able to design a segmentation approach for an unpatchable system and describe how to verify it.",
   "Students will be able to list the elements of a risk exception and identify who should accept residual risk."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about a door lock that cannot be changed and collect ideas on the board."
   ],
   [
    12,
    "Teach",
    "Explain why some systems cannot be patched, what makes a valid compensating control, segmentation and air gaps, and the exception process with risk ownership."
   ],
   [
    18,
    "Activity",
    "Run the exception board role-play in groups of four."
   ],
   [
    5,
    "Discuss",
    "Debrief the role-play with the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "Your front door lock is broken and the locksmith cannot come for a year. What would you do in the meantime to protect your home, and who in the family gets to decide that is good enough?",
  "activity": {
   "title": "Risk exception board role-play",
   "materials": "Printed role cards (security analyst, system owner, IT network engineer, risk committee chair), a printed scenario about an unpatchable medical or industrial system, and a blank risk exception form drawn on the whiteboard or printed.",
   "steps": [
    "Groups read the scenario. The analyst proposes compensating controls, and the network engineer sketches the segmentation on paper.",
    "The system owner challenges any control that would disrupt operations, and the group adjusts the plan.",
    "The group completes the exception form: vulnerability, reason, controls, residual risk, risk owner and review date.",
    "The risk committee chair approves or rejects the form with a reason, and one group shares its form with the class."
   ]
  },
  "discussion": [
   "Why should the business owner, rather than the security team, accept residual risk?",
   "How would you know when a compensating control is no longer enough?"
  ],
  "exit": [
   [
    "What makes a compensating control valid?",
    "It addresses the same threat, gives comparable protection and is documented."
   ],
   [
    "Who accepts residual risk in a risk exception?",
    "The business or system owner with authority over that risk."
   ],
   [
    "What should you do after segmenting an unpatchable system?",
    "Test that the firewall rules block unauthorized access from other subnets, monitor the segment and review the exception before it expires."
   ]
  ],
  "differentiation": [
   "Support: Give students a checklist of the six exception fields and a short list of example compensating controls labeled with the threat each one addresses.",
   "Extend: Ask students to evaluate a proposed control that does not address the threat, such as MFA for an unauthenticated network flaw, and write a better alternative."
  ]
 },
 {
  "t": "Vulnerability response: patching, configuration management, change management, maintenance windows",
  "objectives": [
   "Students will be able to describe the stages of a mature patch management process, from tracking releases to verification.",
   "Students will be able to explain configuration baselines and configuration drift and how to control them.",
   "Students will be able to apply change management concepts, including emergency changes and rollback plans, to a vulnerability scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about an untested update and collect stories on the board."
   ],
   [
    12,
    "Teach",
    "Walk through the patch lifecycle, configuration baselines and drift, change types and the CAB, maintenance windows and verification metrics."
   ],
   [
    18,
    "Activity",
    "Run the change request workshop in groups."
   ],
   [
    5,
    "Discuss",
    "Discuss the tension between speed and stability using the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the exit questions."
   ]
  ],
  "warmup": "Have you ever installed an update that broke something on your phone or computer? What would have prevented it, and what would you do differently if a whole company depended on it?",
  "activity": {
   "title": "Write and review an emergency change request",
   "materials": "Printed scenario card describing a KEV-listed flaw on internet-facing web servers with the next maintenance window two weeks away, and a blank change request form printed or projected.",
   "steps": [
    "Groups fill in the change request: description, reason, affected systems, risk, testing done, implementation steps and rollback plan.",
    "Groups decide which systems get the emergency change and which wait for the normal window, and name an interim compensating control for the ones that wait.",
    "Groups swap forms and act as the CAB, marking anything missing, such as no rollback plan or no verification step.",
    "Groups return forms with feedback and the teacher reviews common gaps on the whiteboard."
   ]
  },
  "discussion": [
   "How should an organization balance the risk of an outage from patching against the risk of a breach from waiting?",
   "Why might repeated SLA misses on the same systems point to a process problem rather than a technical one?"
  ],
  "exit": [
   [
    "How do you confirm a vulnerability has been remediated?",
    "Rescan the system or directly verify the fixed version or configuration before closing the ticket."
   ],
   [
    "What is configuration drift?",
    "A system gradually changing away from its approved secure baseline."
   ],
   [
    "What two options exist when a critical exploited flaw cannot wait for the next maintenance window?",
    "An emergency change through the expedited process, or interim compensating controls until the patch can be deployed."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed change request with the rollback and verification fields highlighted, and a glossary of CAB, SLA and baseline.",
   "Extend: Ask students to propose remediation SLA tiers for critical, high, medium and low findings and explain how KEV listing would change them."
  ]
 },
 {
  "t": "Risk management: accept, avoid, transfer, mitigate; inhibitors to remediation (legacy systems, business process interruption, MOUs/SLAs)",
  "objectives": [
   "Students will be able to define accept, avoid, transfer and mitigate and classify a described action into the correct response.",
   "Students will be able to identify the inhibitor to remediation (legacy system, business process interruption, MOU, SLA, vendor contract) in a scenario.",
   "Students will be able to explain who may accept risk and what a documented risk acceptance contains.",
   "Students will be able to recommend a combined response with compensating controls for a vulnerability that cannot be patched."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the whiteboard. Point out that the class has already invented all four risk responses without the vocabulary."
   ],
   [
    12,
    "Teach",
    "Present the four responses with a clue-word table on the board (insurance means transfer, retire means avoid, controls mean mitigate, signed decision means accept). Explain residual risk and who owns acceptance. Then list the inhibitors and give a one-sentence example of each."
   ],
   [
    18,
    "Activity",
    "Run the card sort described below. Circulate and ask each group to justify one placement aloud, especially cards that could look like two answers."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions, steering toward the idea that the analyst informs the decision while the owner makes it."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your phone screen is cracked, but it still works. List every option you have for dealing with it. Which one would you pick, and why?",
  "activity": {
   "title": "Risk response and inhibitor card sort",
   "materials": "Printed scenario cards (about 16), four column headers (Accept, Avoid, Transfer, Mitigate), a second set of inhibitor header cards, tape or a whiteboard, markers.",
   "steps": [
    "Prepare cards in advance, each describing one action (for example: buy a cyber insurance policy; decommission an old FTP server; place an unpatchable device on an isolated VLAN; system owner signs a six-month exception) and some describing a blocked fix (for example: the vendor voids support if you patch; the contract promises near-continuous uptime).",
    "In groups of three or four, students sort action cards under the four response headers and blocked-fix cards under the matching inhibitor header.",
    "Each group picks one hard card and writes, on the back, a one-paragraph recommendation that combines a compensating control with a documented acceptance, naming who signs it.",
    "Groups swap boards and challenge one placement they disagree with; the teacher settles disputes using the clue-word table.",
    "Close by asking each group to read its recommendation aloud in under thirty seconds, as if briefing a manager."
   ]
  },
  "discussion": [
   "Why should an analyst not be the person who accepts a risk, even if they understand it best?",
   "Is buying insurance ever a substitute for fixing a vulnerability? What does it leave uncovered?",
   "How would you push back if a business owner wanted to accept a risk indefinitely with no review date?"
  ],
  "exit": [
   [
    "A company stops offering a risky file upload feature rather than securing it. Which response is this?",
    "Avoidance, because the activity that created the risk was eliminated."
   ],
   [
    "Patching a server would breach a contract's uptime promise. Name the inhibitor.",
    "A service level agreement (SLA)."
   ],
   [
    "What must a valid risk acceptance include, at minimum?",
    "A documented decision by an authorized risk owner, the justification and residual risk, and an expiry or review date."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students the clue-word table as a printed reference during the card sort and pair them with a partner who reads each card aloud before placing it.",
   "Extend: Ask fast finishers to write a full risk exception record for one card, listing finding, asset, owner, compensating controls, residual risk and review date, then explain how they would make the case for replacement funding."
  ]
 },
 {
  "t": "Attack frameworks: Cyber Kill Chain, Diamond Model, MITRE ATT&CK, OWASP Testing Guide, OSSTMM",
  "objectives": [
   "Students will be able to list the seven Cyber Kill Chain phases in order and explain the idea of breaking the chain.",
   "Students will be able to identify the four core features of the Diamond Model and describe pivoting between them.",
   "Students will be able to explain how MITRE ATT&CK tactics and techniques are used to map detection coverage.",
   "Students will be able to choose between the OWASP Web Security Testing Guide and OSSTMM for a described assessment."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up prompt and let pairs answer for two minutes. Collect a few answers and point out that each describes the attack in a different shape."
   ],
   [
    12,
    "Teach",
    "Draw the Kill Chain as a chain of seven links, the Diamond Model as a diamond with four labeled corners, and an ATT&CK matrix sketch with tactic columns. Contrast linear versus non-linear and spend one minute on OWASP versus OSSTMM."
   ],
   [
    18,
    "Activity",
    "Run the incident mapping activity below. Each group presents one mapping to the class."
   ],
   [
    5,
    "Discuss",
    "Ask the discussion questions and draw out which audience each framework serves best."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the exit questions individually on paper."
   ]
  ],
  "warmup": "Think of a heist movie you know. Describe the heist in three different ways: as a step-by-step story, as a list of the people and tools involved, and as a list of tricks the crew used. Which description would help a security guard most?",
  "activity": {
   "title": "One incident, three frameworks",
   "materials": "A printed one-page fictional incident narrative (a phishing email leads to malware, a registry Run key, a C2 domain and data theft), a printed simplified ATT&CK tactic list, whiteboard or poster paper, markers, sticky notes.",
   "steps": [
    "Give each group of three or four the same incident narrative.",
    "Group members split roles: one maps events to the seven Kill Chain phases, one fills in a Diamond Model (adversary, capability, infrastructure, victim), and one tags each event with an ATT&CK tactic from the printed list.",
    "On sticky notes, groups mark one place where a defensive control could have broken the chain and one tactic where they think the fictional company had no detection.",
    "The teacher adds a twist card: the same C2 domain appears in a second company's logs. Groups decide which framework helps most with that clue and why.",
    "Each group presents its three maps in two minutes, and the class compares where the frameworks agree and differ."
   ]
  },
  "discussion": [
   "Which framework would you use to brief executives, and which to brief detection engineers? Why?",
   "What kinds of attacks does the Kill Chain describe poorly, and how would you describe them instead?",
   "Can a framework alone improve security? What has to happen after mapping?"
  ],
  "exit": [
   [
    "What are the seven Cyber Kill Chain phases, in order?",
    "Reconnaissance, weaponization, delivery, exploitation, installation, command and control, and actions on objectives."
   ],
   [
    "Name the four core features of the Diamond Model.",
    "Adversary, capability, infrastructure and victim."
   ],
   [
    "You need to plan an assessment of a customer-facing web application. Which methodology fits?",
    "The OWASP Web Security Testing Guide."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed Kill Chain and Diamond Model template with the first two entries filled in, and let students use the mnemonic card for phase order.",
   "Extend: Ask fast finishers to pick one ATT&CK technique from the incident and write a short detection idea and a mitigation for it, then explain which Kill Chain phase that detection would break."
  ]
 },
 {
  "t": "IR lifecycle (NIST SP 800-61): preparation; detection and analysis; containment, eradication and recovery; post-incident activity",
  "objectives": [
   "Students will be able to name the four NIST SP 800-61 lifecycle phases in order.",
   "Students will be able to classify a described response action into the correct phase, including containment versus eradication versus recovery.",
   "Students will be able to distinguish precursors from indicators and events from incidents.",
   "Students will be able to explain why the lifecycle is a loop and how post-incident activity feeds preparation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and ask students to shout out what they would do first. Write answers on the board unsorted."
   ],
   [
    12,
    "Teach",
    "Draw the lifecycle as a circle with four boxes and arrows, including the loop between detection and analysis and the containment box. Sort the warm-up answers into phases together. Define event, incident, precursor and indicator."
   ],
   [
    18,
    "Activity",
    "Run the timeline sort below. Walk the room and ask groups to defend any card placed on a boundary between phases."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore loops and the cost of skipping post-incident work."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "Smoke is coming from the break room microwave. List everything you would do, from the moment you notice it until a week later. Which of those things should have happened before the smoke appeared?",
  "activity": {
   "title": "Ransomware timeline sort",
   "materials": "Printed action cards (about 20) from a fictional ransomware response, four phase header cards, tape or a whiteboard, markers.",
   "steps": [
    "Prepare cards such as: run a tabletop exercise; EDR alert on mass file renames; confirm the compromised account; isolate the workstation; disable the account; delete the malicious scheduled task; patch the remote access service; restore the share from backup; monitor for reinfection; hold a lessons learned meeting; add a detection rule; update the playbook.",
    "Groups of three or four place each card under preparation, detection and analysis, containment/eradication/recovery (with sub-labels), or post-incident activity.",
    "Groups draw arrows showing at least one loop, for example a recovery finding that sends the team back to analysis.",
    "Each group writes one precursor and one indicator for the scenario on separate sticky notes and labels them.",
    "The teacher reveals the reference placement, and groups score themselves and discuss any disagreements."
   ]
  },
  "discussion": [
   "Why do you think many organizations skip post-incident activity, and what does that cost them?",
   "When might it be better to keep analyzing before containing, and when must you contain immediately?",
   "Who outside the security team might need to be notified during an incident, and when?"
  ],
  "exit": [
   [
    "List the four NIST SP 800-61 phases in order.",
    "Preparation; detection and analysis; containment, eradication and recovery; post-incident activity."
   ],
   [
    "A responder removes a web shell and the attacker's new admin account. Which phase is this?",
    "Eradication, within the containment, eradication and recovery phase."
   ],
   [
    "A vendor announces a critical vulnerability in software you run. Is this a precursor or an indicator?",
    "A precursor, because it suggests an incident may happen in the future rather than showing one has occurred."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page phase summary with clue words (train, alert, isolate, remove, restore, review) to use while sorting cards.",
   "Extend: Ask fast finishers to rewrite the card set using SANS six-step names and explain where each NIST phase maps, then write one new card that would trigger a loop back to analysis."
  ]
 },
 {
  "t": "Detection and analysis: IoCs, scoping, impact, severity and triage",
  "objectives": [
   "Students will be able to distinguish IoCs from IoAs and give an example of each.",
   "Students will be able to describe how to scope an incident by pivoting on indicators and working backward to patient zero.",
   "Students will be able to rate an incident using functional impact, information impact and recoverability.",
   "Students will be able to classify alerts as false positive, benign true positive, true positive or false negative."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Run the warm-up and collect quick answers. Highlight that students naturally prioritize by impact and urgency."
   ],
   [
    12,
    "Teach",
    "Explain IoC versus IoA, then scoping as a spreading circle drawn on the board from one host outward and backward in time. Present the three NIST impact categories and the alert classification grid (alert or no alert, malicious or not)."
   ],
   [
    18,
    "Activity",
    "Run the alert triage board below. Visit each team and ask why its top-priority alert beats the second one."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on what happens when scoping is skipped."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on a half sheet."
   ]
  ],
  "warmup": "You come home to find five notifications on your phone: a low-battery warning, a bank fraud alert, a friend's message, a package delivery and a smoke alarm alert from your home camera. In what order do you deal with them, and what made you choose that order?",
  "activity": {
   "title": "Alert triage board",
   "materials": "Ten printed alert cards (each with timestamp, host, user, rule, process and destination), a printed asset list noting which hosts are critical or hold regulated data, a whiteboard with columns for false positive, benign true positive and true positive, sticky notes.",
   "steps": [
    "Teams of three receive the alert cards and the asset list. Two alerts share the same malicious domain, one is an approved scan, and one is a plain misconfiguration.",
    "Teams classify each alert in the whiteboard columns, writing a one-line reason on a sticky note.",
    "For the true positives, teams pick one field to pivot on (hash, domain, user or behavior) and write what they would search for to scope the incident.",
    "Teams rate each true positive with functional impact, information impact and recoverability, then rank them by priority.",
    "The teacher reveals a hidden card showing a third host contacting the same domain, and teams adjust their scope and priority."
   ]
  },
  "discussion": [
   "What could go wrong if a team cleans the first infected host immediately without scoping?",
   "Why might a benign true positive still be worth recording and reviewing?",
   "How should an analyst balance speed and thoroughness when the alert queue is long?"
  ],
  "exit": [
   [
    "Give one example of an IoC and one of an IoA.",
    "An IoC could be a known malicious file hash or domain; an IoA could be a process reading credential memory or mass file renames."
   ],
   [
    "You confirm one compromised host. What is the usual next step?",
    "Search for the same indicators and behaviors on other systems and accounts to determine scope."
   ],
   [
    "What are the three NIST impact categories used to prioritize incidents?",
    "Functional impact, information impact and recoverability."
   ]
  ],
  "differentiation": [
   "Support: Give struggling teams a printed two-by-two grid for alert classification and a checklist of pivot fields so they can work step by step.",
   "Extend: Ask fast finishers to write the earliest point in the timeline they would search for patient zero and explain which log sources they would need to have kept to find it."
  ]
 },
 {
  "t": "Evidence acquisition: order of volatility, chain of custody, legal hold, forensic imaging and hash validation",
  "objectives": [
   "Students will be able to order evidence sources from most to least volatile.",
   "Students will be able to explain the different purposes of chain of custody and hash validation.",
   "Students will be able to describe when a legal hold applies and what it requires of IT systems.",
   "Students will be able to outline a sound forensic imaging procedure using a write blocker and hash verification."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up and collect answers. Link 'what disappears first' to the order of volatility."
   ],
   [
    12,
    "Teach",
    "Write the order of volatility vertically on the board, then explain chain of custody, legal hold and imaging with a write blocker. Demonstrate hashing by showing on the projector how a one-character change to a text file produces a completely different hash, using any built-in command or a browser-based hash tool."
   ],
   [
    18,
    "Activity",
    "Run the evidence handling role-play below."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions on what can break admissibility."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions individually."
   ]
  ],
  "warmup": "A glass of ice water, a handwritten note and a sandcastle are all evidence at a beach crime scene, and the tide is coming in. Which do you document first, and why?",
  "activity": {
   "title": "Evidence locker role-play",
   "materials": "Paper bags or envelopes labeled as evidence items (a laptop, a USB drive, a printout of a log), printed blank chain of custody forms, tape, markers, a printed scenario card, and a list of pretend hash values.",
   "steps": [
    "Set up a scenario: an employee is suspected of data theft and their laptop is still on. Assign roles in groups of four: first responder, imaging technician, evidence custodian and defense attorney.",
    "The first responder writes the order in which they will collect evidence (memory, disk, remote logs, backups) and justifies it.",
    "The evidence passes from responder to technician to custodian. At each handoff, students fill in the chain of custody form with names, times and purpose, and seal and initial the envelope.",
    "The technician records an acquisition hash and a verification hash from the pretend list; the teacher secretly gives one group a mismatched verification hash.",
    "The defense attorney reviews the paperwork and tries to find gaps (missing times, unsigned transfers, mismatched hashes). Groups report what they found and how it would affect admissibility."
   ]
  },
  "discussion": [
   "When could pulling the power cord be the right call, despite the loss of memory evidence?",
   "Why do you think courts care so much about who handled evidence?",
   "What would your team need to have set up in advance to honor a legal hold within hours?"
  ],
  "exit": [
   [
    "Put these in order of volatility: disk, RAM, backups, remote logs.",
    "RAM, disk, remote logs, backups."
   ],
   [
    "What does chain of custody prove, and what does a matching hash prove?",
    "Chain of custody proves who handled the evidence and when; a matching hash proves the data is unchanged."
   ],
   [
    "Legal counsel expects a lawsuit and asks that all related email and logs be preserved. What is this called?",
    "A legal hold, which overrides normal retention and deletion schedules."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed chain of custody form as a model and a card listing the order of volatility for reference during the role-play.",
   "Extend: Ask fast finishers to adapt the procedure for a cloud virtual machine, listing which evidence they would collect (snapshots, provider logs, identity logs) and how they would preserve it."
  ]
 },
 {
  "t": "Memory and disk analysis basics: Volatility, FTK Imager, Autopsy",
  "objectives": [
   "Students will be able to match Volatility, FTK Imager and Autopsy to the forensic tasks each performs.",
   "Students will be able to interpret simplified Volatility output to identify suspicious parent-child processes, network connections and hidden processes.",
   "Students will be able to explain disk artifacts such as MAC times, deleted files, file carving and prefetch.",
   "Students will be able to explain why timestomping and rootkits require correlating multiple sources."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Run the warm-up and connect each answer to memory versus disk evidence."
   ],
   [
    12,
    "Teach",
    "Introduce the three tools with one slide each. Draw the normal Windows process tree on the board and show what a malicious branch looks like. Explain psscan versus pslist and list key disk artifacts."
   ],
   [
    18,
    "Activity",
    "Run the output-reading exercise below in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect findings across memory and disk."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you wanted to know what someone was doing on their computer yesterday afternoon, what would you look at? What could you learn only if you had seen the screen at that moment?",
  "activity": {
   "title": "Read the memory, find the intruder",
   "materials": "Printed, simplified excerpts of pstree, psscan, pslist and netscan output from a fictional infected host (teacher-made), a printed excerpt of an Autopsy-style timeline, highlighters, the projector for the reveal.",
   "steps": [
    "Give each pair the pstree excerpt. Pairs highlight any parent-child relationship that does not fit the normal tree drawn on the board.",
    "Hand out pslist and psscan excerpts. Pairs find the process that appears only in psscan and write two possible explanations.",
    "Hand out netscan output. Pairs link a process ID from step one to an external connection and note the time.",
    "Hand out the timeline excerpt. Pairs find the file that arrived just before the suspicious process started and note any artifact, such as a prefetch entry, that confirms execution.",
    "Pairs write a three-sentence finding naming the tool for each step, then the teacher walks through the full answer on the projector."
   ]
  },
  "discussion": [
   "Why might antivirus miss an attack that Volatility reveals?",
   "If memory and disk evidence disagree about timing, which would you trust, and how would you resolve it?",
   "What risks come from analyzing evidence with tools you have never tested?"
  ],
  "exit": [
   [
    "Which tool would you use to analyze a RAM capture for injected code?",
    "Volatility, for example with the malfind plugin."
   ],
   [
    "A process appears in psscan but not in pslist. What might that mean?",
    "A rootkit may have unlinked it from the active process list to hide it, or the process has terminated."
   ],
   [
    "Which tool would you use for keyword searches and a timeline of a disk image?",
    "Autopsy."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card showing the normal Windows process tree and a one-line description of each Volatility plugin used in the excerpts.",
   "Extend: Ask fast finishers to list which additional plugins or artifacts they would examine to confirm persistence, and to explain how they would detect timestomping by comparing sources."
  ]
 },
 {
  "t": "Containment strategies: isolation, segmentation, and when to watch before acting",
  "objectives": [
   "Students will be able to compare isolation, segmentation, account-level containment and sinkholing.",
   "Students will be able to select an appropriate containment strategy for a described incident using NIST criteria.",
   "Students will be able to explain when delayed containment is appropriate, who approves it and its risks.",
   "Students will be able to describe how to verify that containment worked."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Run the warm-up and ask students to argue both sides briefly."
   ],
   [
    12,
    "Teach",
    "Present the containment toolbox on the board in three columns: host (isolation), network (segmentation, blocking, sinkholing) and identity (disable accounts, revoke sessions). Then present the NIST decision criteria and the rules for delayed containment."
   ],
   [
    18,
    "Activity",
    "Run the containment decision stations below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, especially on who owns the delayed containment decision."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A friend tells you someone has been logging in to your social media account. Do you change the password right away, or first try to find out what they have been doing? What could go wrong with each choice?",
  "activity": {
   "title": "Containment decision stations",
   "materials": "Four printed incident cards placed around the room (active ransomware, stealthy espionage, worm spreading in one department, stolen cloud credentials), sticky notes, markers, a whiteboard for the final tally.",
   "steps": [
    "Split the class into four groups; each starts at one station and has four minutes per station.",
    "At each station, the group writes on sticky notes the containment action they would take, the evidence they must preserve first and whether to act now or watch first.",
    "Groups also write one way they would verify that the containment worked (for example, sinkhole logs or failed sign-ins).",
    "Groups rotate until every group has visited every station, reading earlier groups' notes and adding agreement or disagreement.",
    "The teacher reviews each station on the whiteboard, highlighting the stealthy espionage card as the only reasonable candidate for delayed containment and the need for management approval."
   ]
  },
  "discussion": [
   "What makes delayed containment dangerous, and how would you limit that danger?",
   "Why does a flat network make containment harder?",
   "How should a team decide when to lift a temporary containment block?"
  ],
  "exit": [
   [
    "Why is network isolation usually preferred over shutting a compromised host down?",
    "It stops the attacker's traffic while preserving volatile memory evidence."
   ],
   [
    "Ransomware is actively encrypting a file share. Act immediately or watch first?",
    "Act immediately; delayed containment is inappropriate during active destruction."
   ],
   [
    "An attacker logged in with a stolen password. What must accompany isolating the host?",
    "Disabling or resetting the account and revoking its sessions and tokens."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a decision flowchart (Is damage active? Is the footprint known? Is approval obtained?) to use at each station.",
   "Extend: Ask fast finishers to write a short containment plan for a compromised cloud virtual machine, including evidence preservation, access key handling and verification steps."
  ]
 },
 {
  "t": "Eradication and recovery: reimaging, removing persistence, restoring from clean backups, patching the entry point",
  "objectives": [
   "Students will be able to explain why reimaging is preferred over cleaning in place and when it is not enough.",
   "Students will be able to identify common persistence mechanisms on Windows, Linux and cloud platforms.",
   "Students will be able to choose a clean restore point using the time of initial compromise.",
   "Students will be able to describe the validation steps required before declaring recovery complete."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Run the warm-up and steer toward the idea that removing the visible problem is not the same as removing the cause."
   ],
   [
    12,
    "Teach",
    "Walk through the four pillars on the board: reimage, remove persistence and reset credentials, restore from clean backups, patch the entry point. Draw a timeline showing initial compromise, detection and the safe backup window. Mention KRBTGT and NIST SP 800-88 briefly."
   ],
   [
    18,
    "Activity",
    "Run the reinfection investigation below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions on trade-offs between data loss and safety."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "You had a bad cold, felt better for two days, then got sick again. What are some reasons that might happen? How is that like a computer that gets reinfected after cleanup?",
  "activity": {
   "title": "Why did it come back?",
   "materials": "A printed incident timeline (initial access date, detection date, backup dates, cleanup steps taken), printed persistence clue cards (a scheduled task, an extra VPN account, an inbox forwarding rule, an unpatched appliance), a whiteboard, markers.",
   "steps": [
    "Teams of three read a fictional first-response summary in which the malware returned two weeks after cleanup.",
    "Teams mark on the timeline when the compromise began and circle every backup that would be safe to restore.",
    "Teams receive the clue cards and decide which ones explain the reinfection, writing the eradication step for each (delete, reset, revoke, patch).",
    "Teams write a five-step eradication and recovery plan, including validation and monitoring, on poster paper.",
    "Each team presents its plan in two minutes; the class votes on the most complete plan and the teacher notes anything all teams missed."
   ]
  },
  "discussion": [
   "How would you explain to a business owner why you are restoring from an older backup and losing two weeks of data?",
   "Is reimaging always practical? What might stop a team from rebuilding a system?",
   "How long should heightened monitoring last after recovery, and what should determine that?"
  ],
  "exit": [
   [
    "Why is reimaging generally preferred over cleaning malware in place?",
    "Cleaning in place can miss components, rootkits and modified files, while a trusted image removes all attacker changes on that system."
   ],
   [
    "An attacker was present for a month before detection. Which backup should be restored?",
    "One taken before the initial compromise."
   ],
   [
    "Name two persistence mechanisms to check during eradication.",
    "Any two of: scheduled tasks, services, registry Run keys, WMI subscriptions, web shells, cron jobs, unauthorized SSH keys, new accounts, mailbox forwarding rules, OAuth grants."
   ]
  ],
  "differentiation": [
   "Support: Provide a checklist of persistence locations grouped by platform and a pre-drawn timeline with labeled dates for the backup exercise.",
   "Extend: Ask fast finishers to design a validation checklist for a rebuilt server, including scans, baseline comparison, logging checks and monitoring duration, and to justify each item."
  ]
 },
 {
  "t": "Preparation: IR plan, playbooks, tools, training, tabletop exercises, out-of-band communication",
  "objectives": [
   "Students will be able to list the core components of an incident response plan and explain why leadership approval matters.",
   "Students will be able to distinguish playbooks from runbooks and tabletop exercises from functional and full-scale exercises.",
   "Students will be able to identify the tools and logging that must exist before an incident.",
   "Students will be able to explain when and why to use out-of-band communication."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Run the warm-up, listing what students say on the board, then reveal that each item maps to a preparation element."
   ],
   [
    12,
    "Teach",
    "Cover the IR plan and policy, playbooks and runbooks, the jump bag and logging, training and the exercise types from tabletop to full-scale, and out-of-band communication."
   ],
   [
    18,
    "Activity",
    "Facilitate the tabletop exercise below, acting as the facilitator who releases injects."
   ],
   [
    5,
    "Discuss",
    "Hold a short after-action review using the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Your family is planning for a power outage that might last three days. What would you prepare in advance, and how would you contact each other if phones and internet were down?",
  "activity": {
   "title": "Classroom tabletop exercise",
   "materials": "A printed scenario and five inject cards prepared by the teacher (for example: file servers encrypted; email unavailable; the incident lead is unreachable; a reporter calls; the attacker posts that they are reading your chat), role cards (incident manager, IT lead, legal, communications, executive), a whiteboard for the gap list.",
   "steps": [
    "Assign roles in groups of five and give each group the starting scenario.",
    "Every three minutes, the teacher reads an inject aloud. Groups discuss and write what they would do, who decides and how they would communicate.",
    "Whenever a group realizes something was not prepared (no offline contact list, no authority, no playbook), they write it on a sticky note and post it under 'gaps' on the whiteboard.",
    "After the final inject, groups sort the gaps into plan, playbook, tools, training and communication categories.",
    "Each group proposes one concrete preparation fix with an owner, modeling an after-action review."
   ]
  },
  "discussion": [
   "Which gap on the board would hurt most in a real incident, and why?",
   "Why do tabletop exercises reveal so many problems even though nothing technical happens?",
   "How often should playbooks and contact lists be reviewed, and what should trigger an update?"
  ],
  "exit": [
   [
    "What makes an exercise a tabletop exercise?",
    "It is discussion-based; participants talk through a scenario without touching systems."
   ],
   [
    "Attackers may be monitoring corporate email. How should responders coordinate?",
    "Through prearranged out-of-band channels, such as a phone bridge or separate messaging platform."
   ],
   [
    "Why must logging be set up during preparation rather than during an incident?",
    "Logs that were never recorded cannot be collected later, so evidence would be missing."
   ]
  ],
  "differentiation": [
   "Support: Give students in key roles a short role card listing the questions their role usually asks, and provide a template for recording decisions during the tabletop.",
   "Extend: Ask fast finishers to draft a one-page phishing playbook with triggers, triage questions, containment options, notification list and escalation criteria."
  ]
 },
 {
  "t": "Post-incident activity: root cause analysis, lessons learned, updating playbooks and controls",
  "objectives": [
   "Students will be able to distinguish an immediate cause from a root cause using the five whys.",
   "Students will be able to organize contributing factors with a fishbone diagram.",
   "Students will be able to write corrective actions with owners, deadlines and verification.",
   "Students will be able to explain how post-incident activity updates playbooks and controls and feeds preparation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Run the warm-up and ask students to keep asking why for one example on the board."
   ],
   [
    10,
    "Teach",
    "Explain the purpose and timing of post-incident activity, the five whys and fishbone diagrams, blameless reviews and the parts of an incident report."
   ],
   [
    20,
    "Activity",
    "Run the root cause workshop below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore follow-through and culture."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You were late to class three times this month. What was the first reason each time? Now ask why at least four more times. What is the real fix?",
  "activity": {
   "title": "Root cause workshop",
   "materials": "A printed fictional incident summary (a public cloud storage bucket exposed customer records after an ignored alert), a large fishbone diagram drawn on the whiteboard or poster paper with people, process and technology branches, sticky notes, markers.",
   "steps": [
    "Groups of four read the incident summary and write the immediate cause on a sticky note.",
    "Groups run the five whys aloud, one person asking why and another answering, and record each answer on a new sticky note until they reach a fixable cause.",
    "Groups place all contributing factors on the fishbone branches for people, process and technology.",
    "Groups write three corrective actions, each with an owner role, a deadline and how completion will be verified, and name which playbook or control each updates.",
    "Groups present their top corrective action, and the class checks it against a simple rule: specific, owned, dated and verifiable."
   ]
  },
  "discussion": [
   "Why might people hide mistakes in an organization that blames individuals, and how does that hurt security?",
   "What would you do if management agreed with every recommendation but never funded them?",
   "How soon after an incident should lessons learned happen, and what is lost by waiting?"
  ],
  "exit": [
   [
    "A user opened a malicious attachment. Why is that usually not the root cause?",
    "It is the immediate trigger; root causes are the underlying gaps, such as enabled macros, missing EDR or missing MFA, that let it cause harm."
   ],
   [
    "What makes a corrective action effective?",
    "A specific owner, a deadline and a way to verify completion, tracked to closure."
   ],
   [
    "Which technique groups contributing factors into categories like people, process and technology?",
    "The fishbone, or Ishikawa, diagram."
   ]
  ],
  "differentiation": [
   "Support: Provide a five whys worksheet with five numbered boxes and an example worked through, and give groups a starter list of possible contributing factors to sort.",
   "Extend: Ask fast finishers to draft the executive summary of the incident report in under 150 words, stating impact, root cause and the decisions needed from leadership."
  ]
 },
 {
  "t": "Vulnerability reports: affected hosts, risk scores, mitigation, recurrence, prioritization",
  "objectives": [
   "Students will be able to list the elements of an actionable vulnerability report: affected hosts, risk scores, mitigation, recurrence, prioritization and trends.",
   "Students will be able to explain why exploitation data (KEV, EPSS) and exposure can rank a lower CVSS finding above a higher one.",
   "Students will be able to interpret recurring findings as signs of image, template or process problems.",
   "Students will be able to order a set of findings into immediate, within-SLA and lower-risk groups."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the whiteboard under the heading 'what makes a report get ignored'."
   ],
   [
    12,
    "Teach",
    "Walk through each report element using the lesson's worked example. Draw a sample finding row on the board with host, owner, score, KEV, EPSS, exposure, fix and due date, and explain which columns drive ordering."
   ],
   [
    18,
    "Activity",
    "Run the triage card sort in groups of three, then have two groups explain their top three and their recurrence finding."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare group orderings and the reasons for differences."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in at the door."
   ]
  ],
  "warmup": "Your inbox receives a 2,000-page scanner export with no owners and no ordering. What do you do with it, honestly, and what would have made you act on it today?",
  "activity": {
   "title": "Triage card sort: build the report",
   "materials": "Printed cards (one finding per card) showing host, owner, CVSS score, KEV yes or no, EPSS level, internet-facing yes or no, asset tier and months seen; whiteboard; sticky notes.",
   "steps": [
    "Give each group 12 finding cards, including a CVSS 9.8 on an isolated lab host, a KEV-listed 7.5 on an internet-facing payment server, and the same library flaw on several newly built servers.",
    "Groups sort cards into three columns on the desk: immediate action, due within SLA, lower risk or accepted exception.",
    "Groups regroup the cards by owner and write one sticky note per owner summarizing that team's list, with a specific fix and due date for the top item.",
    "Groups identify any recurrence pattern and write a one-sentence root cause recommendation.",
    "Each group writes one sentence explaining which score drives their ordering, as it would appear in the report."
   ]
  },
  "discussion": [
   "When would you rank a CVSS 9.8 finding below a CVSS 7.5, and how would you explain that to a skeptical system owner?",
   "Why might trends over six months tell leadership more than a single month's report?",
   "Where should accepted exceptions appear in the report, and why not leave them out?"
  ],
  "exit": [
   [
    "What does a recurring finding on newly built servers most likely indicate?",
    "An outdated golden image or build template that still contains the vulnerable component."
   ],
   [
    "Name three factors besides CVSS base score that affect prioritization.",
    "Any three of: KEV listing, EPSS probability, public exploit availability, internet exposure and asset value or criticality."
   ],
   [
    "What makes mitigation guidance actionable?",
    "A specific patch, version or configuration change referenced by CVE, or a workaround and compensating control if no fix exists, with an owner and due date."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a partially completed report template with column headings already filled in, and pair them with a peer to sort only six cards first.",
   "Extend: ask fast finishers to design a trend chart for the report showing new, fixed and open findings per month and write the one-sentence takeaway for leadership."
  ]
 },
 {
  "t": "Compliance reports, action plans, exceptions and compensating controls",
  "objectives": [
   "Students will be able to describe the contents of a compliance report and the evidence that supports each status.",
   "Students will be able to distinguish an action plan (POA&M), a compliance exception and a compensating control.",
   "Students will be able to evaluate whether a proposed compensating control meets the intent and rigor of the original requirement.",
   "Students will be able to match common regulations (PCI DSS, HIPAA, GDPR, SOX) to the data or activity they govern."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take quick votes on whether Daniel should mark the requirement as met."
   ],
   [
    12,
    "Teach",
    "Explain compliance reports, POA&M items, exceptions and compensating controls. Write the three-column comparison on the board: closes the gap, accepts the gap, reduces the risk of the gap."
   ],
   [
    18,
    "Activity",
    "Run the exception review board role-play in groups of four, then have each group announce its decision."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect compliance and real security."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on an index card."
   ]
  ],
  "warmup": "Your manager suggests marking a failed requirement as met because the servers are behind a firewall anyway. What could go wrong, and what would you propose instead?",
  "activity": {
   "title": "Exception review board",
   "materials": "Printed scenario cards describing a legacy system that cannot meet a requirement, a blank exception form template the teacher prints, and a whiteboard.",
   "steps": [
    "Assign roles in each group: analyst, system owner, risk approver and assessor.",
    "The analyst and system owner fill in the exception form: requirement, reason, risk, compensating controls, approver and expiry date.",
    "The assessor challenges each compensating control: does it meet the intent, go beyond existing requirements, and how will it be validated?",
    "The risk approver decides to approve, reject or approve with changes, and the group writes one matching action plan item with owner, milestones and target date.",
    "Groups post their forms on the wall and do a quick gallery walk looking for missing expiry dates or relabeled existing controls."
   ]
  },
  "discussion": [
   "Why can a system pass an audit and still be breached?",
   "What happens in an organization when exceptions never expire?",
   "How would you show an assessor that a compensating control actually works?"
  ],
  "exit": [
   [
    "What is the difference between an action plan and an exception?",
    "An action plan closes a gap with owners, milestones and dates; an exception formally accepts a gap for a limited time with approval and expiry."
   ],
   [
    "What makes a compensating control acceptable under PCI DSS?",
    "It meets the intent and rigor of the original requirement, goes beyond other existing requirements, and is documented and validated."
   ],
   [
    "Which regulation governs payment card data, and which governs US health information?",
    "PCI DSS for payment card data; HIPAA for US health information."
   ]
  ],
  "differentiation": [
   "Support: provide a matching worksheet that pairs short descriptions with the terms action plan, exception and compensating control before students attempt the role-play.",
   "Extend: ask fast finishers to write a compensating control for a second scenario and then argue as the assessor why it might fail validation."
  ]
 },
 {
  "t": "Metrics and KPIs: trends, top 10 lists, critical vulnerabilities, zero-days, SLA compliance",
  "objectives": [
   "Students will be able to distinguish a metric, a KPI and a vanity metric.",
   "Students will be able to choose the right metric (trend, top 10 list, critical count, zero-day exposure or SLA compliance) for a leadership question.",
   "Students will be able to explain how zero-day reporting differs from reporting on patchable vulnerabilities.",
   "Students will be able to identify ways metrics can be gamed and how rescans prevent it."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and write student suggestions on the board, marking which ones lead to a decision."
   ],
   [
    12,
    "Teach",
    "Cover trends and normalization, top 10 lists, critical tracking, zero-day exposure reporting and SLA compliance. Sketch a new-versus-remediated trend chart and explain how to read the gap."
   ],
   [
    18,
    "Activity",
    "Run the board-question match in pairs, then discuss the hardest card as a class."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore gaming and vanity metrics."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "You have five minutes with the board and forty charts. Which single number would you show to answer the question: are we getting safer?",
  "activity": {
   "title": "Match the metric to the question",
   "materials": "Printed question cards (such as 'Are we improving?', 'Where should we focus?', 'Are teams on schedule?', 'Are we exposed to the new zero-day?'), printed metric cards, and a projected sample dashboard.",
   "steps": [
    "Pairs receive eight question cards and ten metric cards, including two vanity metrics.",
    "Pairs match each question to the best metric and set aside metrics that answer nothing.",
    "For each match, pairs write one sentence on how the metric could be misleading and how to correct it, such as normalizing by asset count or verifying with rescans.",
    "Using the projected dashboard, pairs pick the three charts they would keep for a board slide and justify the choice.",
    "Pairs draft a two-sentence zero-day status update that reports exposure and compensating controls."
   ]
  },
  "discussion": [
   "How could a team improve its SLA compliance number without becoming more secure?",
   "Why might vulnerabilities per asset be fairer than a raw count?",
   "What would you report about a zero-day in the first hours after it is announced?"
  ],
  "exit": [
   [
    "What makes a metric a KPI?",
    "It is tied to an important goal and usually has a target that shows progress toward it."
   ],
   [
    "How do you report a zero-day before a patch exists?",
    "By exposure (how many assets run the affected software) and which compensating controls were applied and how quickly, then time to patch once a fix is released."
   ],
   [
    "Why verify remediation with rescans before counting SLA compliance?",
    "Teams may close tickets without fixing findings; rescans confirm the fix really happened."
   ]
  ],
  "differentiation": [
   "Support: give struggling pairs a reference sheet with one-line definitions of each metric type and reduce the card set to five questions.",
   "Extend: ask fast finishers to design a KPI with a target for scan coverage and explain how it protects other metrics from being misleading."
  ]
 },
 {
  "t": "Stakeholder identification and communication: technical teams, system owners, executives",
  "objectives": [
   "Students will be able to identify the stakeholders for a security issue using asset ownership records and a RACI chart.",
   "Students will be able to tailor a single finding into messages for technical teams, system owners and executives.",
   "Students will be able to explain why the system owner, not the analyst, accepts risk.",
   "Students will be able to distinguish the responsible and accountable roles in a RACI chart."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the hook scenario aloud and ask the warm-up question."
   ],
   [
    10,
    "Teach",
    "Explain stakeholder identification, RACI, and what each audience needs. Build a RACI chart for patching a payroll server on the whiteboard with the class."
   ],
   [
    20,
    "Activity",
    "Run the three-audience rewrite activity in groups of three, then read a few versions aloud."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to address risk acceptance and need to know."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on paper."
   ]
  ],
  "warmup": "You sent one email about a critical flaw to engineers, a business owner and the chief executive, and all three replied with different questions. Why, and what should you have done?",
  "activity": {
   "title": "One finding, three audiences",
   "materials": "A printed finding sheet (affected devices, versions, CVE number, active exploitation, required downtime, workaround), lined paper, and a projector to show sample answers.",
   "steps": [
    "Each group member takes one audience: technical team, system owner or executive.",
    "Each student writes their message from the same finding sheet, limiting the executive message to three sentences.",
    "Group members swap messages and check them against a checklist: right level of detail, clear ask, no unnecessary sensitive details.",
    "Groups fill in a RACI row for the remediation, naming exactly one accountable person.",
    "Two groups read their three messages aloud and the class identifies the decision being requested in each."
   ]
  },
  "discussion": [
   "Why should the analyst not decide to accept a risk, even when they understand it best?",
   "How does regular, predictable communication help when an urgent issue arrives?",
   "What details would you leave out of a message to a broad audience, and why?"
  ],
  "exit": [
   [
    "What does a system administrator need to remediate a finding?",
    "Affected hosts, CVE or finding details, evidence, the specific fix, a deadline and how verification will happen."
   ],
   [
    "Who accepts residual risk for a business application?",
    "The system or business owner accountable for it."
   ],
   [
    "In a RACI chart, what is the difference between responsible and accountable?",
    "Responsible does the work; accountable owns the outcome and signs off, usually one person."
   ]
  ],
  "differentiation": [
   "Support: give struggling students sentence starters for each audience, such as 'The business impact is...' and 'We need you to decide...'.",
   "Extend: ask fast finishers to build a full RACI chart for a monthly vulnerability review process covering at least four activities."
  ]
 },
 {
  "t": "Incident response communication: legal, HR, public relations, regulators, law enforcement, customers",
  "objectives": [
   "Students will be able to describe the role of legal, HR, PR, regulators, law enforcement and customers during incident response.",
   "Students will be able to decide which party should handle a given communication in an incident scenario.",
   "Students will be able to explain why analysts route media and regulatory communication through designated functions.",
   "Students will be able to apply need-to-know and out-of-band communication practices."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the reporter phone call scenario and ask students what Sam should say."
   ],
   [
    10,
    "Teach",
    "Walk through each party's role and the worked example, writing each party on the board with one key responsibility."
   ],
   [
    20,
    "Activity",
    "Run the incident inject role-play in groups of six, rotating injects every few minutes."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to debrief decisions that groups disagreed on."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A reporter calls the SOC and asks you to confirm a breach you know is real. What do you say, and who should actually answer?",
  "activity": {
   "title": "Incident inject role-play",
   "materials": "Printed role cards (legal, HR, PR, compliance, incident manager, analyst), printed inject cards the teacher reads aloud, and a whiteboard for the group's communication log.",
   "steps": [
    "Each group member takes a role card describing that function's responsibilities.",
    "The teacher reads injects one at a time: a journalist call, a ransom demand, a suspected employee, a regulator deadline question, a customer asking what to do.",
    "For each inject, the group decides who owns the communication and who must be consulted, and records it in a log on the board.",
    "The group decides how they will communicate internally if email may be compromised.",
    "Groups compare logs with another group and note any place where an analyst would have spoken out of turn."
   ]
  },
  "discussion": [
   "Why might an organization engage an outside forensic firm through its legal team?",
   "What are the trade-offs of involving law enforcement?",
   "How can delaying customer notification make an incident worse?"
  ],
  "exit": [
   [
    "A journalist calls an analyst about a breach. What should the analyst do?",
    "Decline to comment and refer the journalist to PR or corporate communications."
   ],
   [
    "Why involve HR in an insider threat case?",
    "To follow employment law and policy and coordinate interviews and terminations without tipping off the suspect."
   ],
   [
    "Who typically decides whether to involve law enforcement?",
    "Management, with advice from legal counsel."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a one-page table of each party with its main responsibility to use during the role-play.",
   "Extend: ask fast finishers to draft a short holding statement and list what legal would check before it is released."
  ]
 },
 {
  "t": "Incident declaration and escalation paths",
  "objectives": [
   "Students will be able to distinguish an event, an adverse event and a security incident.",
   "Students will be able to apply declaration criteria and severity factors to an alert scenario.",
   "Students will be able to distinguish functional escalation from hierarchical escalation.",
   "Students will be able to design an escalation path with conditions, contacts, backups and time frames."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers about when to wake someone up."
   ],
   [
    12,
    "Teach",
    "Define event, adverse event and incident, then explain severity levels, SOC tiers and the two escalation types. Draw an escalation ladder on the board."
   ],
   [
    18,
    "Activity",
    "Run the escalation path build in groups of four, then test each path with a teacher-read scenario."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore hesitation and documentation."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "It is 2 a.m. and you see something that might be an attack or might be an admin script. What would make you wake someone up, and who?",
  "activity": {
   "title": "Build and test an escalation path",
   "materials": "Large paper or whiteboard, sticky notes, printed list of fictional roles (tier 1, tier 2, tier 3, incident manager, CISO, legal, insurer hotline) and printed scenario cards.",
   "steps": [
    "Groups define three severity levels with one example, a response time and who is notified for each.",
    "Groups draw the escalation path, labeling each arrow as functional or hierarchical.",
    "Groups add escalation conditions, such as regulated data, privileged account compromise or failure to contain within a set time, and a backup for each role.",
    "The teacher reads a scenario card where severity rises midway; groups trace the path and record declaration time, person and reason.",
    "Groups swap papers and look for a missing backup, an unclear condition or a missing insurer notification."
   ]
  },
  "discussion": [
   "Why do junior analysts hesitate to escalate, and how can a plan reduce that hesitation?",
   "Why does the time of incident declaration matter outside the SOC?",
   "What should happen when severity changes in the middle of an investigation?"
  ],
  "exit": [
   [
    "What is the difference between an event and an incident?",
    "An event is any observable occurrence; an incident is a violation or imminent threat of violation of security policy or standard practice."
   ],
   [
    "A tier 1 analyst passes a case to a malware specialist. What type of escalation is that?",
    "Functional escalation, because it moves the case to greater expertise."
   ],
   [
    "Name two conditions that commonly trigger escalation.",
    "Any two of: regulated or personal data involved, privileged or executive account compromise, critical system outage, failure to contain within a set time."
   ]
  ],
  "differentiation": [
   "Support: provide a partly drawn escalation ladder with roles already placed so students only add conditions and arrow labels.",
   "Extend: ask fast finishers to add outside parties (managed security provider, outside counsel, insurer) and explain when each is contacted."
  ]
 },
 {
  "t": "Incident reports: executive summary, who/what/when/where/why, timeline, impact, scope, evidence, recommendations",
  "objectives": [
   "Students will be able to list the standard sections of an incident report and what each contains.",
   "Students will be able to explain why the executive summary is written last and kept non-technical.",
   "Students will be able to build a normalized timeline that separates attacker and responder actions.",
   "Students will be able to distinguish impact from scope and write specific recommendations with owners."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about three readers wanting different things from one report."
   ],
   [
    10,
    "Teach",
    "Walk through each report section using the VPN worked example, writing the section names down the board in order."
   ],
   [
    20,
    "Activity",
    "Run the report assembly activity in groups of three, then compare timelines on the projector."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to address attribution and neutral language."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "An executive, an insurer and a lawyer all want the same incident report. What does each care about most?",
  "activity": {
   "title": "Assemble the incident report",
   "materials": "Printed snippet cards (log lines with mixed time zones, impact facts, evidence hashes, systems found clean, draft recommendations), a blank report outline the teacher prints, and a whiteboard.",
   "steps": [
    "Groups sort snippet cards into report sections: timeline, impact, scope, evidence and recommendations.",
    "Groups convert all timeline entries to UTC and mark each as attacker or responder action.",
    "Groups rewrite one vague recommendation, such as 'improve security', into a specific action with an owner and deadline.",
    "Last, groups write a four-sentence executive summary from their completed sections.",
    "Groups exchange summaries and check whether a busy executive could make the needed decision from it alone."
   ]
  },
  "discussion": [
   "Why is speculative attribution risky in a report that lawyers and regulators may read?",
   "Why does stating what was found unaffected matter as much as stating what was affected?",
   "How does time synchronization during preparation affect the quality of the timeline?"
  ],
  "exit": [
   [
    "When should the executive summary be written, and why?",
    "Last, so it reflects the final verified findings rather than early assumptions."
   ],
   [
    "What is the difference between impact and scope?",
    "Impact is the effect on the business, data, finances and reputation; scope is the extent of systems, accounts and data involved, including what was ruled out."
   ],
   [
    "What should a timeline distinguish?",
    "Attacker actions from responder actions, with precise timestamps, sources and one consistent time zone."
   ]
  ],
  "differentiation": [
   "Support: give struggling groups a report outline with one example entry already filled in under each section.",
   "Extend: ask fast finishers to map three timeline entries to MITRE ATT&CK tactics and add a confidence level for any attribution statement."
  ]
 },
 {
  "t": "Root cause analysis and lessons learned feeding back into reporting",
  "objectives": [
   "Students will be able to apply the five whys technique to reach a fixable root cause.",
   "Students will be able to organize contributing factors with a fishbone diagram.",
   "Students will be able to write corrective and preventive actions with owners, dates and verification.",
   "Students will be able to explain how reports and metrics close the feedback loop after lessons learned."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list reasons lessons get lost on the board."
   ],
   [
    10,
    "Teach",
    "Demonstrate the five whys on the board using the unpatched server example, then sketch a fishbone with people, process, technology and environment branches."
   ],
   [
    20,
    "Activity",
    "Run the close-the-loop workshop in groups of four, then have each group present its new metric."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to contrast activity and outcome measures."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "Think of a problem at school or work that keeps coming back even though everyone agreed how to fix it. Why does it keep coming back?",
  "activity": {
   "title": "Close-the-loop workshop",
   "materials": "Printed incident summary cards (for example, repeated compromises through old contractor accounts), large paper for fishbone diagrams, sticky notes and markers.",
   "steps": [
    "Groups read the incident card and run the five whys aloud, writing each answer on a sticky note until they reach a process or control gap.",
    "Groups draw a fishbone and place additional contributing factors under people, process, technology and environment.",
    "Groups write two actions, one corrective and one preventive, each with an owner, due date and verification method.",
    "Groups define one outcome metric to add to the monthly security report and sketch what success would look like over six months.",
    "Groups present, and the class checks whether any root cause stopped at human error."
   ]
  },
  "discussion": [
   "Why is human error rarely an acceptable root cause?",
   "What is the difference between measuring activity and measuring outcomes after an incident?",
   "When should a report template itself be changed?"
  ],
  "exit": [
   [
    "What is the purpose of the five whys?",
    "To move past symptoms by repeatedly asking why until reaching a fixable underlying cause."
   ],
   [
    "What is the difference between corrective and preventive actions?",
    "Corrective actions fix the specific problem found; preventive actions stop similar problems elsewhere."
   ],
   [
    "How can reporting show a lessons learned action worked?",
    "By tracking the action's status in later reports and adding a metric or trend showing the targeted problem decreasing."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a five whys template with the first two answers filled in.",
   "Extend: ask fast finishers to apply the same method to a recurring vulnerability, such as repeated SLA misses by one team, and propose a metric."
  ]
 },
 {
  "t": "Response metrics: mean time to detect, respond and remediate; alert volume",
  "objectives": [
   "Students will be able to define MTTD, mean time to respond, mean time to remediate and mean time to acknowledge, including where each interval starts and ends.",
   "Students will be able to explain why MTTR must be defined in reports.",
   "Students will be able to interpret alert volume using ratios such as true positive rate and identify alert fatigue.",
   "Students will be able to explain why medians, percentiles and severity segmentation give a truer picture than means alone."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and take two or three answers."
   ],
   [
    12,
    "Teach",
    "Draw an incident timeline on the board marking first malicious activity, alert, acknowledgment, containment and remediation, and label each metric interval. Explain alert volume ratios and dwell time."
   ],
   [
    18,
    "Activity",
    "Run the SOC metrics calculation activity in pairs using the projected data set, then compare answers."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to examine how metrics can mislead."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "A provider says its mean time to respond is 20 minutes, but your worst critical alert waited two hours. How can both be true?",
  "activity": {
   "title": "Calculate and question the SOC metrics",
   "materials": "A projected or printed table of ten fictional incidents with timestamps for first activity, alert, acknowledgment, containment and remediation, plus severity; a printed alert summary by rule; student laptops or calculators.",
   "steps": [
    "Pairs calculate MTTD, mean time to contain and mean time to remediate across the ten incidents.",
    "Pairs calculate the median for each and note which incident skews the mean.",
    "Pairs segment results by severity and compare critical incidents with low-severity ones.",
    "Using the alert summary, pairs calculate the true positive rate per rule and choose one rule to tune or retire.",
    "Pairs write a two-sentence report entry that defines MTTR explicitly and states one improvement action."
   ]
  },
  "discussion": [
   "How could a SOC make its alert volume fall without becoming safer?",
   "Why is MTTD usually calculated only after an incident is closed?",
   "Which quality measures should always accompany speed metrics?"
  ],
  "exit": [
   [
    "What interval does MTTD measure?",
    "From the start of malicious activity to when the organization detected it."
   ],
   [
    "Why must a report define MTTR?",
    "It can mean mean time to respond, remediate, repair or recover, so readers may interpret it differently."
   ],
   [
    "A rule fires thousands of times with almost no true positives. What should be done?",
    "Tune or retire it, since it causes alert fatigue without adding detection value."
   ]
  ],
  "differentiation": [
   "Support: give struggling pairs a worked calculation for the first incident and a labeled timeline diagram to reference.",
   "Extend: ask fast finishers to calculate the 90th percentile response time for critical incidents and explain what a contract commitment based on it would guarantee."
  ]
 }
]);
