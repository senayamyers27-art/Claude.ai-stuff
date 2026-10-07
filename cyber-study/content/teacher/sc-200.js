/* Teacher edition for Microsoft Certified: Security Operations Analyst Associate (SC-200): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("sc-200", [
 {
  "t": "Defender XDR settings: incident and alert email notifications, alert tuning (suppression) rules, portal RBAC and device groups",
  "objectives": [
   "Students will be able to explain what incident email notification rules, alert tuning rules, unified RBAC and device groups each control in the Microsoft Defender portal.",
   "Students will be able to compare alert tuning with allow indicators and exclusions and justify which preserves protection.",
   "Students will be able to determine which device group a device joins based on rank and matching rules.",
   "Students will be able to choose the least-privilege access option (Entra role versus custom unified RBAC role versus device group access) for a given SOC scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up prompt and collect three or four answers. Steer toward the idea that settings, not detections, decide who sees what."
   ],
   [
    12,
    "Teach",
    "Walk through the four settings in the order of the portal: email notifications, alert tuning, permissions (Entra roles and unified RBAC), device groups. For each, say what it changes and what it never changes. Emphasize that tuning does not touch protection and that rank decides device group membership."
   ],
   [
    18,
    "Activity",
    "Run the 'Settings desk' card sort described below. Circulate and ask each pair to justify one choice aloud."
   ],
   [
    5,
    "Discuss",
    "Ask the discussion questions and have pairs share any card they disagreed on."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note or in a short form and hand them in."
   ]
  ],
  "warmup": "Your SOC gets 200 alerts a day from the same harmless backup job. List every way you can think of to make them stop, then circle the one you think is safest.",
  "activity": {
   "title": "Settings desk: match the request to the setting",
   "materials": "Printed request cards (about 12, one scenario per card), four labeled zones on the whiteboard (Email notification, Alert tuning, RBAC, Device group), sticky notes, a projector for the answer key.",
   "steps": [
    "Before class, write 12 short requests on cards, for example 'The CISO wants email only for high-severity identity incidents', 'Hide the nightly backup alert on two servers', 'EU analysts must only see EU laptops', 'A team should triage email alerts but not change settings'. Include two device group rank puzzles with two matching groups.",
    "In pairs, students draw cards, decide which setting fixes the request, and place the card in the right whiteboard zone with a sticky note naming the exact configuration (filter, scope, rank or role).",
    "For the rank puzzles, pairs must state which group the device joins and why.",
    "Add one 'trap' card asking to silence an alert with an allow indicator; pairs must explain why they would reject it and what they would do instead.",
    "Reveal the answer key on the projector and let pairs move any misplaced cards, explaining the correction."
   ]
  },
  "discussion": [
   "When might a SOC reasonably accept the risk of a broader tuning rule, and how would you limit that risk over time?",
   "Why do you think Microsoft offers unified RBAC in addition to Entra roles, rather than relying only on tenant-wide roles?"
  ],
  "exit": [
   [
    "What does an alert tuning rule change, and what does it leave alone?",
    "It hides or auto-resolves matching alerts; protection, blocking and data collection keep running."
   ],
   [
    "A laptop matches the rules of a rank 1 group and a rank 3 group. Which does it join?",
    "The rank 1 group, because the highest-ranked matching group wins."
   ],
   [
    "A team must triage only Defender for Office 365 alerts. What access do you give them?",
    "A custom unified RBAC role with security operations permissions scoped to the email and collaboration data source."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page table with the four settings, where each lives in the portal, and one sentence on what it controls, and let them use it during the card sort.",
   "Extend: Ask fast finishers to design a full device group layout for a fictional company with three regions and a server tier, including ranks, tags, automation levels and access groups, and explain how a mis-ranked group would cause problems."
  ]
 },
 {
  "t": "Defender for Endpoint configuration: onboarding, device groups, tamper protection, attack surface reduction rules (audit, warn, block), indicators and network protection, device discovery",
  "objectives": [
   "Students will be able to describe at least three onboarding methods for Defender for Endpoint and how to verify a device is reporting.",
   "Students will be able to explain the difference between ASR audit, warn and block modes and sequence a safe rollout.",
   "Students will be able to identify when network protection is required for IP and URL indicators to take effect.",
   "Students will be able to distinguish tamper protection and device discovery from other hardening features in a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about an attacker with admin rights and list student answers on the board."
   ],
   [
    13,
    "Teach",
    "Present the lifecycle on the board as a left-to-right line: onboard and verify, discover gaps, lock settings (tamper protection), reduce attack surface (ASR modes), block known bad (indicators plus network protection). Show the sample hunting query for ASR events on the projector and explain what an audited event means."
   ],
   [
    17,
    "Activity",
    "Run the 'ASR rollout war room' exercise below in groups of three or four."
   ],
   [
    5,
    "Discuss",
    "Groups share their rollout timeline and the one exclusion they chose to add; challenge any exclusion that is too broad."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "An attacker has gained local administrator rights on a laptop and wants to turn off antivirus before running ransomware. What should stop them?",
  "activity": {
   "title": "ASR rollout war room",
   "materials": "Printed handout with a mock two-week ASR audit report (rule names, device names, process paths and event counts the teacher writes), a short list of three help-desk tickets, whiteboard, markers.",
   "steps": [
    "Give each group the mock audit report. Most events for one rule come from a single legitimate line-of-business app; a few look suspicious.",
    "Groups decide which events are business-critical and write a narrow exclusion for each (a specific file path, not a folder), and flag events that look malicious for investigation.",
    "Groups draw a rollout timeline on the whiteboard: audit, exclusions, pilot block, full block, noting where warn mode could help if the rule supports it.",
    "Hand out the help-desk tickets (a Chrome user reaching a blocked domain, an unknown laptop on the network, an admin who disabled real-time protection) and have groups name the setting that fixes each.",
    "Each group presents its timeline and ticket answers in one minute."
   ]
  },
  "discussion": [
   "What is the business cost of staying in audit mode too long versus moving to block too early, and who should make that call?",
   "Why might an organization prefer a narrow file-path exclusion over a certificate-based or folder-based exclusion, and what risk does each carry?"
  ],
  "exit": [
   [
    "Put these ASR rollout steps in order: block for all, audit, add exclusions, pilot block.",
    "Audit, add exclusions, pilot block, block for all."
   ],
   [
    "A domain block indicator works only in Edge. What must be enabled?",
    "Network protection in block mode and the custom network indicators advanced feature."
   ],
   [
    "Which feature stops a local administrator from disabling real-time protection?",
    "Tamper protection."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-column cheat card (feature, what it stops or finds, where it is configured) and pair struggling students with a partner who reads the mock report aloud.",
   "Extend: Ask fast finishers to write the advanced hunting query that would list devices with the most ASR audit events in the last seven days and explain how they would use the result to plan exclusions."
  ]
 },
 {
  "t": "Defender for Cloud: foundational CSPM vs paid workload protection plans (Servers, Storage, Databases), connecting AWS and GCP accounts, Defender for Endpoint integration for servers",
  "objectives": [
   "Students will be able to distinguish cloud security posture management from cloud workload protection and give an example output of each.",
   "Students will be able to compare foundational CSPM with the paid Defender CSPM plan.",
   "Students will be able to select the correct workload protection plan (Servers, Storage or Databases) for a described threat.",
   "Students will be able to outline how AWS and GCP environments are connected and how Defender for Servers onboards the Defender for Endpoint sensor."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sort student answers into two columns on the board without labeling them yet; later reveal the labels Posture and Detection."
   ],
   [
    12,
    "Teach",
    "Explain CSPM versus workload protection with the inspector-and-alarm analogy. List what foundational CSPM includes, what Defender CSPM adds, and the main workload plans. Sketch the AWS connector (CloudFormation) and GCP connector (Cloud Shell script) flows and the Arc and Defender for Endpoint integration path."
   ],
   [
    18,
    "Activity",
    "Run the 'Posture or alarm' sorting game and connector whiteboard below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect cost decisions to risk."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Your cloud dashboard shows a secure score of 85 percent. Does that mean nobody is attacking you right now? Why or why not?",
  "activity": {
   "title": "Posture or alarm",
   "materials": "About 16 printed cards, each with one Defender for Cloud output or need (for example 'storage account allows public access', 'SQL injection attempt detected', 'attack path from internet to database', 'malware uploaded to blob'), whiteboard divided into Foundational CSPM, Defender CSPM, Defender for Servers, Defender for Storage, Defender for Databases.",
   "steps": [
    "Pairs receive a shuffled stack of cards and place each in the whiteboard column that provides it.",
    "For each workload plan card, pairs must write on a sticky note the scope where it is turned on (subscription, AWS account or GCP project).",
    "Next, small groups draw on the whiteboard the steps to connect an AWS account and a GCP project, including where Azure Arc and the Defender for Endpoint sensor fit.",
    "Give one 'mystery' scenario: secure score is fine but no alerts from EC2 servers. Groups diagnose and write the fix.",
    "Review the board as a class, moving any misplaced card and explaining why."
   ]
  },
  "discussion": [
   "If budget allows only one paid plan this year, how would you decide between Defender CSPM and Defender for Servers?",
   "Why might a cloud team and a SOC team disagree about whether secure score is a good security metric?"
  ],
  "exit": [
   [
    "Name one feature included in foundational CSPM and one that requires Defender CSPM.",
    "Foundational: secure score or recommendations; Defender CSPM: attack path analysis or cloud security explorer."
   ],
   [
    "Which plan raises alerts about brute-force logins to Azure SQL?",
    "A Defender for Databases plan (Defender for Azure SQL)."
   ],
   [
    "What do you deploy to connect an AWS account?",
    "The CloudFormation template generated by the Defender for Cloud AWS connector."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-color card set in advance (blue for posture outputs, red for alerts) so the first sort is guided, then remove the colors for a second round.",
   "Extend: Challenge fast finishers to explain how a missing patch found by the Defender for Endpoint sensor becomes a Defender for Cloud recommendation, and which team would act on it."
  ]
 },
 {
  "t": "Defender for Identity sensors on domain controllers and AD FS/AD CS servers; Defender for Office 365 Safe Links and Safe Attachments",
  "objectives": [
   "Students will be able to list every server type that needs a Defender for Identity sensor and explain the blind spot a missing sensor creates.",
   "Students will be able to describe the Directory Service account and why a gMSA is recommended.",
   "Students will be able to compare Safe Links and Safe Attachments and choose the right one for a phishing scenario.",
   "Students will be able to explain Safe Attachments actions, including Dynamic Delivery, and how preset policies take precedence over custom ones."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and take quick votes on the answer."
   ],
   [
    12,
    "Teach",
    "Draw a simple AD network on the board with domain controllers, AD FS, AD CS and Entra Connect. Mark where sensors go and show how a missing sensor creates a blind spot. Then contrast Safe Links (URLs, time of click) with Safe Attachments (files, sandbox) and list the Safe Attachments actions and policy precedence."
   ],
   [
    18,
    "Activity",
    "Run the 'Find the blind spot' map and phishing triage described below."
   ],
   [
    5,
    "Discuss",
    "Pose the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions."
   ]
  ],
  "warmup": "An email link pointed to a harmless page when it arrived at 9 a.m. and to a fake login page at 11 a.m. Which control would catch it at 11:05, when the user clicks?",
  "activity": {
   "title": "Find the blind spot",
   "materials": "Printed network maps of a fictional company (several domain controllers, AD FS, AD CS, Entra Connect, file servers) with some sensors marked, printed phishing scenario cards, whiteboard, markers.",
   "steps": [
    "Groups receive a network map and a mock Sensors page list showing which servers have sensors and which have health issues.",
    "Groups circle every server missing a sensor, mark unhealthy ones, and write the fix for each (install sensor, fix audit policy with `Set-MDIConfiguration`, switch the Directory Service account to a gMSA).",
    "Next, groups sort six phishing cards (delayed attachment complaint, link weaponized after delivery, unknown malware in a PDF, malicious file in Teams, custom policy ignored, need to see who clicked) into Safe Links, Safe Attachments, global setting, or policy precedence.",
    "Each group explains one card choice to the class.",
    "The teacher reveals the answer key and highlights the preset-over-custom rule."
   ]
  },
  "discussion": [
   "Why do attackers specifically target AD FS and AD CS servers, and what could they do if those servers were unmonitored?",
   "Should users be allowed to click through Safe Links warning pages? What are the trade-offs for a busy organization?"
  ],
  "exit": [
   [
    "Besides domain controllers, which three server types need a Defender for Identity sensor?",
    "AD FS, AD CS and Microsoft Entra Connect servers."
   ],
   [
    "Which MDO feature uses sandbox detonation?",
    "Safe Attachments."
   ],
   [
    "A user is in the Strict preset and also in a custom Safe Links policy. Which applies?",
    "The Strict preset, because presets take precedence over custom policies."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a labeled reference diagram showing each server type and a two-line definition of Safe Links and Safe Attachments to use during the activity.",
   "Extend: Ask fast finishers to write an advanced hunting query idea using UrlClickEvents to find every user who clicked a specific malicious URL, and explain how the results feed incident response."
  ]
 },
 {
  "t": "Sentinel workspace design: Log Analytics workspace, Sentinel roles (Reader, Responder, Contributor, Automation Contributor), onboarding to the Defender portal",
  "objectives": [
   "Students will be able to explain the relationship between Microsoft Sentinel and a Log Analytics workspace.",
   "Students will be able to justify when to use one workspace versus several, citing data residency, billing or tenant isolation.",
   "Students will be able to assign the least-privilege Sentinel role (Reader, Responder, Contributor, Automation Contributor, Playbook Operator) for a described job.",
   "Students will be able to describe what changes and what stays the same when a workspace is onboarded to the Defender portal."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list student ideas; highlight any that mention legal or regional rules."
   ],
   [
    12,
    "Teach",
    "Draw Sentinel sitting on top of a workspace. Explain the one-workspace default and valid split reasons. Build a role ladder on the board (Reader, Responder, Contributor) and place Automation Contributor off to the side as a service role. Finish with what onboarding to the Defender portal changes."
   ],
   [
    18,
    "Activity",
    "Run the 'Badge office' role-play described below."
   ],
   [
    5,
    "Discuss",
    "Ask the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you could put all your security logs in one place or split them across several, what would make you choose to split?",
  "activity": {
   "title": "Badge office",
   "materials": "Printed job cards (Tier-1 analyst, detection engineer, auditor, automation engineer, MSSP manager, the Sentinel service itself), printed badge cards for each role, a whiteboard for a workspace design sketch.",
   "steps": [
    "Split the class into small groups and give each group one fictional company brief (for example, offices in two regions with residency rules, or a single-region retailer).",
    "Groups first sketch the workspace design on the whiteboard: how many workspaces, which regions, which is primary in the Defender portal.",
    "Each group then acts as a badge office. The teacher or other students present job cards and request access; the group hands over the least-privilege badge and explains why in one sentence.",
    "Include trick requests, such as an analyst asking for Contributor to close incidents or an engineer asking for Automation Contributor, and have the group push back with the correct role.",
    "Groups present their design and one tricky badge decision."
   ]
  },
  "discussion": [
   "What risks does a SOC take on when everyone has Contributor, even if nobody intends harm?",
   "How might moving Sentinel into the Defender portal change the daily work of a Tier-1 analyst?"
  ],
  "exit": [
   [
    "Where does Sentinel store the data it ingests?",
    "In tables in an Azure Monitor Log Analytics workspace."
   ],
   [
    "Which role should a Tier-1 analyst who closes incidents receive?",
    "Microsoft Sentinel Responder."
   ],
   [
    "Who receives the Automation Contributor role, and on what?",
    "The Sentinel service, on the resource group that holds the playbooks."
   ]
  ],
  "differentiation": [
   "Support: Provide a role ladder handout listing each role with its allowed verbs (view, manage incidents, edit content, run playbooks) for students to reference during the role-play.",
   "Extend: Ask fast finishers to write a cross-workspace KQL query that counts failed sign-ins in two workspaces and explain how resource-context RBAC could limit what a regional analyst sees."
  ]
 },
 {
  "t": "Data retention and cost: analytics tier vs Sentinel data lake tier, table plans, summary rules, SOC optimization recommendations",
  "objectives": [
   "Students will be able to compare the analytics tier and the Sentinel data lake tier in terms of cost, query features and detection support.",
   "Students will be able to explain the trade-offs of the Analytics, Basic and Auxiliary table plans.",
   "Students will be able to design a summary rule that keeps a detection signal from low-cost data.",
   "Students will be able to interpret SOC optimization data value and coverage recommendations."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up prompt and let students guess which logs are 'fridge' and which are 'freezer'."
   ],
   [
    12,
    "Teach",
    "Use the fridge and freezer analogy to introduce the two tiers and three table plans. Walk through the summary rule KQL on the projector line by line. Show what a data value and a coverage recommendation would say for a fictional workspace."
   ],
   [
    18,
    "Activity",
    "Run the 'Budget triage' exercise below in groups."
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
  "warmup": "List five kinds of security logs. For each, would you rather have it fast to search or cheap to keep for years?",
  "activity": {
   "title": "Budget triage",
   "materials": "A printed mock table inventory (table name, daily volume, which rules and workbooks use it, retention requirement), printed SOC optimization recommendation cards, whiteboard, markers.",
   "steps": [
    "Give each group the mock inventory of eight tables, such as SigninLogs, SecurityEvent, firewall flows, proxy logs and a custom app table, with usage notes.",
    "Groups assign each table to the analytics tier, a Basic or Auxiliary plan, or the data lake tier, and must check the usage notes so no active rule breaks.",
    "For at least one high-volume table, groups write a summary rule idea on the whiteboard: what to aggregate, by which columns, how often, and which rule would use the result.",
    "Hand out two SOC optimization cards (one data value, one coverage). Groups explain what action each suggests and whether it saves money, improves security or both.",
    "Groups present their tier map and summary rule, and the class checks for any broken rule dependency."
   ]
  },
  "discussion": [
   "Who in an organization should decide how long logs are kept: the SOC, compliance, finance, or all three? Why?",
   "What could go wrong if a team cuts cost by dropping a data source entirely instead of moving it to a cheaper tier?"
  ],
  "exit": [
   [
    "Which tier must hold data for a standard scheduled analytics rule to run on it?",
    "The analytics tier."
   ],
   [
    "What does a summary rule do?",
    "It runs a scheduled KQL query that aggregates detailed data and writes the results to an analytics-tier table."
   ],
   [
    "Which SOC optimization recommendation type points out tables you pay for but do not use?",
    "Data value recommendations."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision flowchart (Is it used by a rule or workbook? Is it high volume? Must it be kept for years?) that leads to a tier choice.",
   "Extend: Ask fast finishers to modify the sample summary query to also count distinct destination IPs and to describe the scheduled rule that would alert on it."
  ]
 },
 {
  "t": "Data connectors and Content hub solutions; Windows Security Events and CEF/Syslog through the Azure Monitor Agent and data collection rules (DCRs); the Logs Ingestion API for custom sources",
  "objectives": [
   "Students will be able to explain what a Content hub solution contains and why installing it does not configure the connector.",
   "Students will be able to describe the three parts of a data collection rule and how AMA uses it.",
   "Students will be able to map Windows events, Syslog, CEF and custom API data to their destination tables.",
   "Students will be able to design an ingestion path for a Windows server, a network appliance and a custom application."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch student answers as arrows on the board."
   ],
   [
    12,
    "Teach",
    "Draw three data paths: Windows server with AMA and DCR to SecurityEvent; firewall to Linux forwarder with AMA to CommonSecurityLog or Syslog; custom app through the Logs Ingestion API to a _CL table. Show the XPath example and a transformation on the projector."
   ],
   [
    18,
    "Activity",
    "Run the 'Data plumber' whiteboard design below in pairs."
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
  "warmup": "A firewall cannot have software installed on it. How could its logs still reach a cloud SIEM?",
  "activity": {
   "title": "Data plumber",
   "materials": "Printed source cards (domain controller, Linux web server, firewall sending CEF, switch sending Syslog, in-house HR app, Microsoft Entra ID), printed component cards (AMA, DCR, Linux forwarder, Content hub solution, Logs Ingestion API, managed identity), whiteboard, markers.",
   "steps": [
    "Each pair draws two source cards and must build the full path to Sentinel on the whiteboard using the component cards and arrows.",
    "For each path, pairs label the destination table and write one DCR setting they would use to control cost (event set, facility and severity filter, or transformation).",
    "Pairs swap boards with a neighbor, who checks for a missing piece (for example, no forwarder, no role on the DCR, wrong table).",
    "The teacher presents one 'broken pipe' scenario per pair (solution installed but empty table, authorization error from the API, bill doubled) and pairs diagnose it.",
    "Close with a quick class review of the format-to-table mapping."
   ]
  },
  "discussion": [
   "What is the risk of filtering too aggressively in a DCR transformation, and how would you decide what is safe to drop?",
   "Why might a vendor ship parsers and analytics rules in the same Content hub solution as its connector?"
  ],
  "exit": [
   [
    "Which table receives CEF data?",
    "CommonSecurityLog."
   ],
   [
    "Name the three things a DCR defines.",
    "The data sources to collect, an optional ingestion-time transformation, and the destination workspace and table."
   ],
   [
    "What role does an app identity need to send data through the Logs Ingestion API?",
    "Monitoring Metrics Publisher on the DCR."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partly filled path diagram for each source type, with blanks for the component and table names.",
   "Extend: Ask fast finishers to write an XPath query for a different set of event IDs, such as account creation and group membership changes, and a transformation that removes one column they consider unnecessary."
  ]
 },
 {
  "t": "Analytics rules: scheduled, near-real-time (NRT), Microsoft incident creation, anomaly and Fusion; entity mapping, alert grouping, custom details",
  "objectives": [
   "Students will be able to compare scheduled, NRT, Microsoft security, anomaly and Fusion rules and choose one for a scenario.",
   "Students will be able to configure query frequency and lookback so no events are missed.",
   "Students will be able to explain how entity mapping, custom details and alert details improve analyst workflow.",
   "Students will be able to apply alert grouping to reduce duplicate incidents."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up timeline question and let students sketch the gap on mini whiteboards or paper."
   ],
   [
    12,
    "Teach",
    "Introduce the five rule types with one use case each. Draw a timeline showing frequency versus lookback, including a gap and an overlap. Walk through the sample KQL query and show where entity mapping, custom details and alert grouping are set in the rule wizard."
   ],
   [
    18,
    "Activity",
    "Run the 'Rule clinic' pair exercise below."
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
  "warmup": "A rule runs every hour and looks back 30 minutes. Draw a timeline of three runs. What happens to an event at minute 45?",
  "activity": {
   "title": "Rule clinic",
   "materials": "Printed 'patient' cards describing badly configured rules (for example, a 60-minute frequency with a 20-minute lookback, no entity mapping, every alert a new incident, a heavy query on NRT), printed scenario cards for rule-type selection, sticky notes, projector.",
   "steps": [
    "Pairs receive three patient cards. For each, they diagnose the problem and write a prescription: the exact setting to change and the new value.",
    "Pairs then receive six scenario cards (break-glass sign-in, multistage attack, Defender for Cloud alert incidents in an Azure-portal workspace, unusual login volume baseline, nightly report of new admins, and repeat incidents for one user) and label each with the right rule type or setting.",
    "Pairs exchange answers with another pair and resolve any disagreement.",
    "The teacher projects the sample rule and asks the class to call out which columns to map to which entities and which to surface as custom details.",
    "Wrap up by noting which fixes improve detection and which improve analyst efficiency."
   ]
  },
  "discussion": [
   "When is it better to have one alert per result row instead of one alert for all results?",
   "How could aggressive alert grouping accidentally hide a second, unrelated attack?"
  ],
  "exit": [
   [
    "Which rule type should detect a break-glass account sign-in as quickly as possible?",
    "A near-real-time (NRT) rule."
   ],
   [
    "A rule runs every 15 minutes. What is the minimum sensible lookback?",
    "15 minutes, ideally a little more to cover ingestion delay."
   ],
   [
    "What setting stops one account from generating dozens of separate incidents?",
    "Alert grouping, for example grouping alerts by the mapped Account entity within a time window."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page rule-type chart with a trigger phrase for each (for example, 'within a minute' for NRT) to use during the clinic.",
   "Extend: Ask fast finishers to rewrite the sample query so it also returns the source IP, map it as an IP entity, and propose an alert name template that uses both account and IP."
  ]
 },
 {
  "t": "Custom detection rules in Defender XDR advanced hunting; MITRE ATT&CK coverage of your rules",
  "objectives": [
   "Students will be able to identify the required columns a custom detection query must return for device, email and identity tables.",
   "Students will be able to describe the custom detection wizard settings, including frequency, impacted entities and automatic actions.",
   "Students will be able to distinguish MITRE ATT&CK tactics from techniques and tag a rule correctly.",
   "Students will be able to evaluate detection coverage using the MITRE ATT&CK page and SOC optimization, and explain why coverage is not prevention."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers about turning a hunt into an automated detection."
   ],
   [
    12,
    "Teach",
    "Project the sample KQL query and highlight the required columns. Walk through the wizard steps: details, frequency, impacted entities, actions. Then draw a small ATT&CK matrix fragment on the board and explain tactics as columns and techniques as cells."
   ],
   [
    18,
    "Activity",
    "Run the 'Promote the hunt' exercise below."
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
  "warmup": "You found an attack with a search query today. How would you make sure the same search runs every hour from now on, even when you are not at work?",
  "activity": {
   "title": "Promote the hunt",
   "materials": "Printed KQL query excerpts (some missing required columns), a printed blank ATT&CK grid fragment with a handful of tactics and techniques, colored markers, sticky notes, projector.",
   "steps": [
    "Pairs receive four query excerpts. They mark which ones would be rejected by the custom detection wizard and add the missing columns.",
    "For each fixed query, pairs fill in a mini wizard card: name, frequency, impacted entity column, and one automatic action, justifying whether the action is safe for that rule's confidence level.",
    "Pairs tag each rule with a tactic and a technique, then color the matching cells on the printed ATT&CK grid.",
    "As a class, compare grids and identify techniques that remain uncolored; discuss whether those are covered by prevention controls instead.",
    "Finish with one pair explaining why a colored cell does not guarantee good detection."
   ]
  },
  "discussion": [
   "What level of confidence should a rule reach before it is allowed to isolate devices or disable users automatically, and who should approve that?",
   "Is it better to have one rule for each of many techniques or several strong rules for a few critical techniques? Why?"
  ],
  "exit": [
   [
    "A custom detection query on DeviceProcessEvents cannot be saved. Which columns should you check for?",
    "Timestamp, DeviceId and ReportId."
   ],
   [
    "Is 'credential access' a tactic or a technique?",
    "A tactic, because it describes the attacker's goal."
   ],
   [
    "Which views show which ATT&CK techniques lack detections?",
    "The Sentinel MITRE ATT&CK page and SOC optimization coverage recommendations."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card listing required columns per table family and a short list of example tactics and techniques with IDs.",
   "Extend: Ask fast finishers to write a custom detection query for an email scenario, naming the identifier columns it must return and the automatic action they would choose."
  ]
 },
 {
  "t": "Automation: automation rules vs Logic Apps playbooks, triggers, incident tasks; watchlists, workbooks, UEBA and threat intelligence connectors",
  "objectives": [
   "Students will be able to compare automation rules and Logic Apps playbooks and choose the right one for a scenario.",
   "Students will be able to identify the three Microsoft Sentinel playbook trigger types and when each is used.",
   "Students will be able to explain how incident tasks, watchlists, workbooks and UEBA each support SOC work.",
   "Students will be able to describe how STIX/TAXII and other threat intelligence connectors bring indicators into Sentinel."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list the repetitive chores students name."
   ],
   [
    12,
    "Teach",
    "Draw a flow on the board: incident created, automation rules run in order, one calls an incident-trigger playbook that reaches external systems. Then add side boxes for incident tasks, watchlists (show the _GetWatchlist query), workbooks, UEBA and threat intelligence connectors, each with a one-line purpose."
   ],
   [
    18,
    "Activity",
    "Run the 'Automate the morning' design challenge below."
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
  "warmup": "Think of a SOC analyst's first hour of the day. Which chores could a computer do safely without a human, and which should always have a human check?",
  "activity": {
   "title": "Automate the morning",
   "materials": "Printed list of ten SOC chores (assign phishing incidents, look up URL reputation, post to Teams, raise severity for executives, add a checklist, open a ticket, show weekly trends, flag unusual sign-ins, import a partner's threat feed, auto-close a known-benign alert for two weeks), whiteboard, sticky notes in two colors.",
   "steps": [
    "Groups label each chore with the tool that should handle it: automation rule, playbook, incident task, watchlist, workbook, UEBA or threat intelligence connector.",
    "For each playbook chore, groups pick the trigger type (incident, alert or entity) and note the permission Sentinel needs.",
    "Groups arrange their automation rules in order on the whiteboard and check that no later rule undoes an earlier one.",
    "Groups write one watchlist-based KQL idea on a sticky note, such as filtering sign-in failures to VIP users.",
    "Each group presents its morning workflow and the class votes on the cleanest design."
   ]
  },
  "discussion": [
   "What are the risks of automatically closing incidents, even known-benign ones, and how would you limit them?",
   "How could UEBA insights change the way an analyst prioritizes two incidents that look identical at first?"
  ],
  "exit": [
   [
    "Which tool should change an incident's owner when it is created?",
    "An automation rule."
   ],
   [
    "Which playbook trigger is recommended for use with automation rules?",
    "The incident trigger."
   ],
   [
    "What is the difference between STIX and TAXII?",
    "STIX is the format for threat intelligence; TAXII is the protocol that transports it."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision card: 'Does it touch an outside system? Playbook. Only in-Sentinel fields? Automation rule.' plus one-line definitions of the other tools.",
   "Extend: Ask fast finishers to sketch a playbook with an approval step before disabling a user and explain how they would keep it from running on false positives."
  ]
 },
 {
  "t": "Defender portal incident queue: triage, assignment, attack story, alert correlation, linking alerts and merging incidents, classification and determination",
  "objectives": [
   "Students will be able to explain the difference between an alert and an incident and how Defender XDR correlates alerts using shared entities and timing.",
   "Students will be able to prioritize a set of incidents using severity, breadth of sources, asset value and tags.",
   "Students will be able to decide when to link an alert versus merge incidents.",
   "Students will be able to choose the correct classification and determination when resolving an incident, including for an authorized penetration test."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up question on the projector and take three or four answers. Write the words alert and incident on the board and ask students to define each in one sentence."
   ],
   [
    12,
    "Teach",
    "Walk through the incident queue: filters, triage factors, assignment and status. Open a sketch of an attack story on the board (timeline, incident graph, assets, evidence). Then explain linking versus merging and the three classifications with example determinations."
   ],
   [
    16,
    "Activity",
    "Run the alert card sort in groups of three or four, then have each group present one decision about linking or merging and one closing classification."
   ],
   [
    7,
    "Discuss",
    "Lead the discussion questions, focusing on why a red-team detection should not be marked false positive and what happens to tuning if it is."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand them in at the door."
   ]
  ],
  "warmup": "If two alerts fire ten minutes apart, one for a phishing email and one for strange PowerShell on a laptop, how would you decide whether they are the same attack?",
  "activity": {
   "title": "Alert card sort: build the incidents",
   "materials": "Printed alert cards (12 to 15 per group) that each list a time, alert name, user, device, IP address and source product; sticky notes; whiteboard.",
   "steps": [
    "Give each group a shuffled deck of alert cards that secretly describe three separate attacks plus two misleading cards that share only a busy file server.",
    "Groups cluster the cards into incidents using shared entities and timing, writing the shared entity on a sticky note above each cluster.",
    "The teacher announces that one cluster was split by the system into two incidents; groups decide whether to merge them or link a single alert, and justify it.",
    "Groups rank their incidents for triage and name who would be assigned each one.",
    "Each group writes a classification and determination for every incident, including one cluster that turns out to be an approved penetration test."
   ]
  },
  "discussion": [
   "Why might marking a red-team exercise as a false positive cause harm months later?",
   "When is sharing an entity, such as a file server, not enough evidence to merge two incidents?"
  ],
  "exit": [
   [
    "An alert in one incident clearly belongs to another incident. What action do you take?",
    "Link the alert to the correct incident from the alert page; merge only if the whole incidents are the same attack."
   ],
   [
    "How do you classify an alert caused by an authorized penetration test?",
    "Informational expected activity with a security testing determination (benign positive in Sentinel)."
   ],
   [
    "Name two factors besides severity that raise an incident's triage priority.",
    "Alerts from multiple products, sensitive assets such as domain controllers or executives, or an Attack Disruption tag."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a two-column cheat card that lists the three classifications with two example determinations each, and pre-sort half their alert cards so they only cluster the remainder.",
   "Extend: ask fast finishers to write the Sentinel equivalents (true positive, benign positive, false positive, undetermined) for each of their closing decisions and explain any case where the mapping is not obvious."
  ]
 },
 {
  "t": "Defender for Endpoint response: isolate device, restrict app execution, run antivirus scan, collect investigation package, live response, stop and quarantine file, file indicators, device timeline",
  "objectives": [
   "Students will be able to compare isolation and restrict app execution and choose between them from a scenario.",
   "Students will be able to explain what an investigation package and live response provide and the settings and permissions live response requires.",
   "Students will be able to choose between stop and quarantine file and a file indicator for containing a malicious file.",
   "Students will be able to use a device timeline excerpt to identify what happened before an alert."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list student answers on the board under two headings: stop the threat and keep the user working."
   ],
   [
    12,
    "Teach",
    "Present each response action with the clue words that point to it. Draw a two-by-two grid on the board: contain versus investigate, one device versus tenant-wide. Place each action in the grid with the class."
   ],
   [
    15,
    "Activity",
    "Run the response-action role-play with scenario cards, rotating roles each round."
   ],
   [
    8,
    "Discuss",
    "Discuss trade-offs between containment and disruption, including isolating a critical server and coordinating with its owner."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If a laptop is infected but its owner must keep working tonight, what would you be willing to block, and what would you leave running?",
  "activity": {
   "title": "Response desk role-play",
   "materials": "Printed scenario cards (8 to 10) describing infected devices and constraints; printed action cards naming each Defender for Endpoint response action; a projected device timeline excerpt written by the teacher.",
   "steps": [
    "Put students in groups of three: an incident lead, a responder and a device owner who argues for staying productive.",
    "The incident lead draws a scenario card and reads it aloud; the responder picks one or two action cards and explains the choice.",
    "The device owner pushes back with the business constraint, and the group agrees on a final action set and the order.",
    "After three rounds, groups read the projected device timeline excerpt and write down the first suspicious event and the evidence they would collect before reimaging.",
    "Groups share one scenario where they chose a file indicator over quarantine and explain why."
   ]
  },
  "discussion": [
   "When might isolating a device cause more harm than the threat itself, and how should an analyst handle that?",
   "Why do organizations limit live response and isolation to certain roles or device groups?"
  ],
  "exit": [
   [
    "Which action keeps a device online but allows only Microsoft-signed code to run?",
    "Restrict app execution."
   ],
   [
    "What should you collect before a compromised device is reimaged?",
    "An investigation package, which preserves processes, connections, autoruns and logs."
   ],
   [
    "How do you stop a malicious file from running on every device in the tenant?",
    "Add a file hash indicator with block execution or block and remediate."
   ]
  ],
  "differentiation": [
   "Support: give students a one-page clue-word table (for example, C2 traffic means isolate) to use during the role-play, and let them pick from only four action cards in the first round.",
   "Extend: ask fast finishers to write the advanced hunting table they would query to find the same file on other devices and describe what the query should filter on, without writing a full query."
  ]
 },
 {
  "t": "Action center: pending and completed remediation actions; automatic attack disruption of compromised users and devices",
  "objectives": [
   "Students will be able to explain the difference between the Action center Pending and History tabs and when each is used.",
   "Students will be able to relate a device group's automation level to whether remediation runs automatically or waits for approval.",
   "Students will be able to describe what automatic attack disruption does, which threats it targets and what prerequisites it needs.",
   "Students will be able to plan the post-disruption steps, including releasing containment and configuring exclusions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers by show of hands: always automatic, always human, or it depends."
   ],
   [
    12,
    "Teach",
    "Explain the Action center tabs, automation levels per device group and the actions you can approve, reject or undo. Then explain attack disruption: target threats, containment actions, the Attack Disruption tag, prerequisites and exclusions."
   ],
   [
    15,
    "Activity",
    "Run the shift handover simulation in pairs using the printed Action center sheets."
   ],
   [
    8,
    "Discuss",
    "Discuss the balance between automatic containment speed and business disruption, and who should own the exclusion list."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Should security software ever disable a user's account without asking a person first? When would that be worth the risk?",
  "activity": {
   "title": "Shift handover: what is really contained?",
   "materials": "Printed mock Action center sheets the teacher makes (a Pending list and a History list with times, devices, actions and approvers); a short incident summary; highlighters; whiteboard.",
   "steps": [
    "Pairs receive an incident summary saying ransomware was detected overnight and an Attack Disruption tag was applied.",
    "Using the mock Pending and History sheets, pairs highlight what is already contained, what is still waiting for approval and what has been undone.",
    "Pairs decide which pending actions to approve or reject and write one sentence of justification for each.",
    "Pairs list the steps needed before releasing the contained device and re-enabling the disabled user.",
    "Each pair writes a three-line handover note for the next shift, and two pairs read theirs aloud for class critique."
   ]
  },
  "discussion": [
   "What would you say to a business owner whose critical account was disabled by attack disruption?",
   "Why might an organization choose semi-automated remediation for servers but full remediation for workstations?"
  ],
  "exit": [
   [
    "An automated investigation proposed quarantining a file but the file is still on the device. Where do you look first?",
    "The Action center Pending tab; the device group's automation level probably requires approval."
   ],
   [
    "Name two containment actions automatic attack disruption can take.",
    "Contain a device, and disable or contain a compromised user account."
   ],
   [
    "How do you stop a critical service account from being disabled automatically?",
    "Add it to the automated response exclusions for attack disruption."
   ]
  ],
  "differentiation": [
   "Support: provide a labeled diagram of the Action center with the two tabs and the meaning of each status, and let students work with a shorter Pending list.",
   "Extend: ask fast finishers to propose automation levels for four device groups (workstations, servers, executives, kiosks) and defend each choice in two sentences."
  ]
 },
 {
  "t": "Defender for Office 365: Threat Explorer, removing delivered phishing, user-reported messages and Submissions",
  "objectives": [
   "Students will be able to use Threat Explorer filters to scope a phishing campaign and choose the right remediation action.",
   "Students will be able to compare soft delete, hard delete and zero-hour auto purge.",
   "Students will be able to describe how user-reported messages reach the Submissions page and how admin submissions work for false positives and false negatives.",
   "Students will be able to identify follow-up steps for users who clicked a malicious link."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up prompt and have pairs estimate the answer before sharing."
   ],
   [
    12,
    "Teach",
    "Show the Threat Explorer workflow: views, filters, delivery location, URL click data and Take action options. Contrast Plan 1 and Plan 2 tools, soft versus hard delete and ZAP. Explain the Report button, the user reported settings and admin submissions."
   ],
   [
    16,
    "Activity",
    "Run the campaign table exercise with the printed mock Explorer results."
   ],
   [
    7,
    "Discuss",
    "Lead the discussion questions about evidence and false positives."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If three people report a phishing email, how many people do you think actually received it, and how would you find out?",
  "activity": {
   "title": "Scope and clean the payroll phish",
   "materials": "Printed mock Threat Explorer results table (40 rows with recipient, delivery location, subject, sender domain, URL and click verdict), a printed user-report summary, highlighters, student laptops with a browser for note-taking.",
   "steps": [
    "Groups receive the three user reports and the mock Explorer table, and highlight every row that belongs to the campaign using sender domain and subject.",
    "Groups count copies by delivery location (inbox, junk, quarantine) and decide which copies need action.",
    "Groups choose soft delete or hard delete and write one sentence explaining the choice.",
    "Using the click column, groups list the users needing an identity investigation and the first log they would check.",
    "Groups write the Tenant Allow/Block List entries and the Submissions action they would take, then compare with another group."
   ]
  },
  "discussion": [
   "Why might an analyst prefer soft delete even for a message that is clearly malicious?",
   "How should a SOC respond to users who report many legitimate emails as phishing?"
  ],
  "exit": [
   [
    "Which tool finds and removes every copy of a phishing email in an organization with Defender for Office 365 Plan 2?",
    "Threat Explorer, using Take action."
   ],
   [
    "What is the difference between soft delete and hard delete?",
    "Soft delete moves the message to Recoverable Items where it can be restored; hard delete removes it completely."
   ],
   [
    "Where do messages reported with the Outlook Report button appear for analysts?",
    "On the Submissions page under the User reported tab, and in the reporting mailbox if configured."
   ]
  ],
  "differentiation": [
   "Support: give students a filled-in example row and a short list of filter names to use, and let them work with a 15-row version of the table.",
   "Extend: ask fast finishers to describe, in plain words, the EmailEvents and UrlClickEvents filters they would use to confirm their findings in advanced hunting."
  ]
 },
 {
  "t": "Defender for Identity alerts: DCSync, Golden Ticket, pass-the-hash; lateral movement paths; KRBTGT reset",
  "objectives": [
   "Students will be able to recognize DCSync, Golden Ticket and pass-the-hash alerts from their signatures in Defender for Identity.",
   "Students will be able to explain why KRBTGT must be reset twice with replication in between and why the attacker must be removed first.",
   "Students will be able to interpret a lateral movement path and recommend controls that reduce it.",
   "Students will be able to outline the containment steps for a pass-the-hash alert."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect ideas on the board."
   ],
   [
    13,
    "Teach",
    "Explain Kerberos tickets and the KRBTGT account at a high level with a whiteboard sketch. Present each attack's signature and response, then explain lateral movement paths with a drawing of users, devices and sessions."
   ],
   [
    15,
    "Activity",
    "Run the lateral movement path whiteboard exercise in groups."
   ],
   [
    7,
    "Discuss",
    "Discuss why identity attacks are treated as domain recovery rather than single-device incidents."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If someone stole the stamp used to mark every pass into a building, what would you have to change, and why might changing it once not be enough?",
  "activity": {
   "title": "Map and break the lateral movement path",
   "materials": "Whiteboard or large paper per group, printed cards for users, groups, workstations and servers with notes on who is local admin and who has logged on where, markers, sticky notes.",
   "steps": [
    "Groups lay out the cards and draw arrows for local admin rights and for logged-on sessions.",
    "Groups trace every path from a low-privilege helpdesk user to a domain admin and mark the shortest one.",
    "Groups propose controls (remove local admin rights, LAPS, tiered admin, privileged access workstations) and cross out the arrows each control removes.",
    "The teacher reveals an alert card: Suspected DCSync from one of the workstations. Groups write the response steps in order, including the double KRBTGT reset.",
    "Groups present their shortest path and the single change that breaks it."
   ]
  },
  "discussion": [
   "Why is a Golden Ticket considered a full domain compromise rather than an account compromise?",
   "What disruption might a KRBTGT reset cause, and how would you communicate it to the business?"
  ],
  "exit": [
   [
    "What signature identifies a DCSync attack?",
    "A replication request from a device that is not a domain controller, using an account with replication rights."
   ],
   [
    "Why reset KRBTGT twice?",
    "Active Directory accepts tickets signed with the current or previous KRBTGT password; reset twice with replication in between."
   ],
   [
    "Name two controls that reduce lateral movement paths.",
    "Remove unnecessary local admin rights, deploy LAPS, use tiered administration or keep privileged accounts off ordinary workstations."
   ]
  ],
  "differentiation": [
   "Support: give students a pre-drawn partial graph with two paths already traced and a glossary card for KRBTGT, TGT, NTLM and LSASS.",
   "Extend: ask fast finishers to list which advanced hunting tables (for example IdentityLogonEvents and DeviceLogonEvents) would help trace where a stolen account was used and what they would look for."
  ]
 },
 {
  "t": "Microsoft Entra ID Protection: risky users and sign-ins, confirm user compromised, revoking sessions; MFA fatigue response",
  "objectives": [
   "Students will be able to distinguish sign-in risk from user risk and classify example detections.",
   "Students will be able to choose between Confirm user compromised, Confirm safe and Dismiss user risk.",
   "Students will be able to explain why sessions must be revoked after a password reset for a compromised account.",
   "Students will be able to describe the response and preventive controls for MFA fatigue."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and note answers on the board."
   ],
   [
    12,
    "Teach",
    "Explain the two risk types with examples, risk levels and real-time versus offline detections. Walk through analyst actions and their effects, revoking sessions, risk-based Conditional Access and MFA fatigue defenses."
   ],
   [
    16,
    "Activity",
    "Run the risk sorting and response cards activity in pairs."
   ],
   [
    7,
    "Discuss",
    "Discuss why feedback actions matter to the risk model and the cost of dismissing real compromises."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If someone stole your house key and you changed the lock, but they had already copied your garage remote, would you be safe? What does that suggest about account compromise?",
  "activity": {
   "title": "Sign-in risk or user risk? Then respond",
   "materials": "Printed detection cards (for example leaked credentials, anonymous IP address, unfamiliar location, repeated MFA prompts reported by the user), printed scenario cards with investigation outcomes, sticky notes, whiteboard with two columns.",
   "steps": [
    "Pairs sort the detection cards into sign-in risk and user risk columns on the whiteboard.",
    "Each pair draws three scenario cards and writes the analyst action (Confirm compromised, Confirm safe, Dismiss) on a sticky note with a one-line reason.",
    "For each compromised scenario, pairs list the containment steps in order: reset password, revoke sessions, review sign-ins, MFA methods and mailbox rules.",
    "Pairs design one risk-based Conditional Access rule in plain words that would have handled their scenario automatically.",
    "The class reviews the board and corrects any misplaced cards together."
   ]
  },
  "discussion": [
   "Should users who approve an MFA fatigue prompt be disciplined, or does the responsibility lie with the controls?",
   "What might go wrong if analysts routinely dismiss risk instead of confirming compromise?"
  ],
  "exit": [
   [
    "Is a leaked credentials detection sign-in risk or user risk?",
    "User risk, because it suggests the account itself is compromised."
   ],
   [
    "Why revoke sessions after resetting a compromised user's password?",
    "Existing refresh tokens and session cookies may still work; revoking forces re-authentication."
   ],
   [
    "Which control most directly defeats MFA fatigue?",
    "Number matching, ideally alongside phishing-resistant methods such as passkeys or FIDO2 keys."
   ]
  ],
  "differentiation": [
   "Support: provide a reference card listing each analyst action and its effect on risk, and give students pre-sorted examples for the first two detections.",
   "Extend: ask fast finishers to describe which Sentinel tables (AADUserRiskEvents and AADRiskyUsers) they would use to report on risky users over a month and what columns they would expect to need."
  ]
 },
 {
  "t": "Defender for Cloud Apps: impossible travel and other anomaly alerts, OAuth app risk and revoking app consent",
  "objectives": [
   "Students will be able to explain how anomaly detection policies work and identify common anomaly alerts, including impossible travel.",
   "Students will be able to reduce impossible travel false positives by tagging IP ranges and tuning sensitivity.",
   "Students will be able to explain consent phishing and why password resets do not remove OAuth app access.",
   "Students will be able to choose the correct response and prevention steps for a malicious OAuth app."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the valet key and take answers."
   ],
   [
    12,
    "Teach",
    "Explain Defender for Cloud Apps as a CASB, the anomaly detections and their learning period, impossible travel false positives, then OAuth consent, consent phishing, the OAuth app fields and response options."
   ],
   [
    16,
    "Activity",
    "Run the app review board activity with printed app profiles."
   ],
   [
    7,
    "Discuss",
    "Discuss how to balance user freedom to add apps against consent phishing risk."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you gave a valet your car key and later changed your house locks, could the valet still drive your car? How does that relate to online accounts?",
  "activity": {
   "title": "OAuth app review board",
   "materials": "Printed app profile cards (8 to 10) showing app name, publisher verification, permission level, number of consenting users and community use; a printed impossible travel alert with IP details; sticky notes; whiteboard.",
   "steps": [
    "Groups act as an app review board and sort the app profiles into approve, investigate and ban piles.",
    "For each ban, groups write the response steps: ban the app, review accessed data, clean up related changes.",
    "Groups review the impossible travel alert, decide whether the second IP belongs to the corporate VPN, and write how they would tune the policy.",
    "Groups draft a one-paragraph user consent policy for the tenant using verified publishers and the admin consent workflow.",
    "Groups compare their ban piles and debate any app placed differently."
   ]
  },
  "discussion": [
   "Why might attackers prefer consent phishing over stealing passwords?",
   "What would you lose if you disabled the impossible travel policy entirely instead of tuning it?"
  ],
  "exit": [
   [
    "Why doesn't a password reset remove a malicious OAuth app's access?",
    "The app holds its own consented tokens, which stay valid until consent is revoked."
   ],
   [
    "What is a common false-positive cause for impossible travel, and how do you reduce it?",
    "VPNs or corporate proxies; tag their IP ranges and tune the policy's sensitivity."
   ],
   [
    "Which action revokes an app's permissions for every user and blocks new consent?",
    "Ban the app in Defender for Cloud Apps."
   ]
  ],
  "differentiation": [
   "Support: give students a checklist of four warning signs for OAuth apps (high permissions, unverified publisher, rare community use, lookalike name) to use while sorting.",
   "Extend: ask fast finishers to describe in plain words what a CloudAppEvents search for consent events should return and how they would use it to find other affected users."
  ]
 },
 {
  "t": "Microsoft Purview: DLP and insider risk alerts in the Defender portal; Purview Audit (unified audit log) searches",
  "objectives": [
   "Students will be able to distinguish DLP alerts, insider risk alerts and Purview Audit searches by purpose.",
   "Students will be able to explain why insider risk alerts are pseudonymized and why viewing DLP content requires specific roles.",
   "Students will be able to plan a unified audit log search to answer who did what and when, including using MailItemsAccessed.",
   "Students will be able to compare Audit (Standard) and Audit (Premium)."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and gather answers."
   ],
   [
    12,
    "Teach",
    "Explain DLP alerts and where they appear, insider risk management with policy templates, indicators, HR connector data and pseudonymization, and Purview Audit: what it records, Standard versus Premium, MailItemsAccessed and search tips."
   ],
   [
    16,
    "Activity",
    "Run the which-tool investigation cards activity followed by planning one audit search."
   ],
   [
    7,
    "Discuss",
    "Discuss privacy and fairness in insider risk investigations."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If a coworker who just resigned downloaded a lot of files, what would you want to know before accusing them of anything?",
  "activity": {
   "title": "Which tool answers this question?",
   "materials": "Printed question cards (12) such as 'Who created this inbox rule?', 'Was confidential data shared externally?' and 'Is a departing employee taking data?'; three labeled areas on the whiteboard (DLP, Insider risk, Audit); a printed sample audit search form the teacher draws with fields for dates, users, activities and record types.",
   "steps": [
    "Groups place each question card under the tool that best answers it and note any card that needs two tools.",
    "The teacher reviews placements with the class and resolves disagreements.",
    "Groups pick one Audit card and fill in the sample search form: date range, user, activity names and record type.",
    "Groups list what they would hand to HR and legal and who should be allowed to see each item.",
    "One group presents its audit search plan and the class suggests how to narrow it."
   ]
  },
  "discussion": [
   "Why is pseudonymization important in insider risk investigations, and who should be allowed to reveal identity?",
   "How would you decide whether a DLP alert needs education or escalation?"
  ],
  "exit": [
   [
    "Which Purview tool answers who created an inbox rule and when?",
    "Purview Audit, by searching the unified audit log for inbox rule activities."
   ],
   [
    "Why are users pseudonymized in insider risk alerts?",
    "To protect privacy until an authorized investigator needs to reveal identity."
   ],
   [
    "Which audit event shows which emails an attacker read?",
    "MailItemsAccessed."
   ]
  ],
  "differentiation": [
   "Support: provide a one-line purpose statement for each tool on a reference card and let students start with six question cards instead of twelve.",
   "Extend: ask fast finishers to explain what Audit (Premium) adds and to describe a scenario where longer retention would change the outcome of an investigation."
  ]
 },
 {
  "t": "Defender for Cloud security alerts: alert details, the Take action tab, triggering automation",
  "objectives": [
   "Students will be able to identify the information in a Defender for Cloud alert's details, including severity, status, entities and MITRE ATT&CK tactics.",
   "Students will be able to choose the correct Take action section for a given need.",
   "Students will be able to compare Trigger automated response, workflow automation and continuous export.",
   "Students will be able to explain when to use a suppression rule instead of dismissing an alert or disabling a plan."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up question and collect answers."
   ],
   [
    12,
    "Teach",
    "Project a sketch of an alert with its details tab and Take action sections and walk through each section. Explain workflow automation, continuous export, suppression rules and the difference between dismiss and resolve."
   ],
   [
    16,
    "Activity",
    "Run the Take action matching game followed by designing one workflow automation."
   ],
   [
    7,
    "Discuss",
    "Discuss the risks of broad suppression rules and how to govern them."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When a smoke alarm keeps going off because of burnt toast, what are your options, and which one is dangerous?",
  "activity": {
   "title": "Match the need to the Take action section",
   "materials": "Printed need cards (12) such as 'Run a Logic App on this alert now' and 'Look at logs around the alert time'; whiteboard divided into Inspect, Mitigate, Prevent, Trigger, Suppress, Workflow automation and Continuous export; markers.",
   "steps": [
    "Groups place each need card under the matching section or feature on the whiteboard.",
    "The teacher reviews answers, emphasizing the difference between Trigger automated response and workflow automation.",
    "Groups design a workflow automation on paper: scope, trigger type, conditions (severity, alert name) and what the Logic App does.",
    "Groups write a suppression rule for an authorized scanner, including the conditions and an expiration date.",
    "Two groups present their designs and the class checks scope and permissions."
   ]
  },
  "discussion": [
   "What could happen if a suppression rule with no expiration matched too broadly?",
   "Why might an organization send alerts both to Sentinel and to Event Hubs?"
  ],
  "exit": [
   [
    "Which Take action section lists recommendations to stop an alert recurring?",
    "Prevent future attacks."
   ],
   [
    "How do you run a Logic App automatically for every high-severity alert?",
    "Create a workflow automation with a severity condition that triggers the Logic App."
   ],
   [
    "Does dismissing an alert remediate the threat?",
    "No. It only changes the status; the threat must still be mitigated."
   ]
  ],
  "differentiation": [
   "Support: give students the I Might Prevent The Spread memory card and a partially completed whiteboard with two sections already filled.",
   "Extend: ask fast finishers to explain how they would test their workflow automation with sample alerts and what permissions the Logic App would need to isolate a VM."
  ]
 },
 {
  "t": "Sentinel incidents: investigation graph, entity pages and UEBA insights, running playbooks on demand, incident tasks, closing with the right classification",
  "objectives": [
   "Students will be able to use the investigation graph and exploration queries to expand an incident's scope and explain why entity mapping is required.",
   "Students will be able to interpret UEBA insights on an entity page, including investigation priority and peer comparison.",
   "Students will be able to choose the right playbook trigger for an on-demand action and identify the roles needed to run it.",
   "Students will be able to close a Sentinel incident with the correct classification, including benign positive for an approved test."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect quick answers."
   ],
   [
    12,
    "Teach",
    "Walk through a Sentinel incident page, the investigation graph and exploration queries, entity pages with UEBA insights, on-demand playbooks by trigger type and roles, incident tasks and the four closing classifications."
   ],
   [
    16,
    "Activity",
    "Run the corkboard investigation activity with printed entity cards and string or drawn lines."
   ],
   [
    7,
    "Discuss",
    "Discuss how classification choices feed rule tuning and reporting."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If a backup service account suddenly logged on to ten servers like a person would, what would you want to know first?",
  "activity": {
   "title": "Corkboard investigation",
   "materials": "Printed entity cards (accounts, hosts, IP addresses, alerts) with short notes; a printed UEBA insight sheet; whiteboard or large paper; markers or string and tape; printed playbook cards labeled incident, entity and alert trigger.",
   "steps": [
    "Groups start with two cards from the incident (the service account and one server) and place them on the board.",
    "Each time a group asks for an exploration query (for example related alerts on the account), the teacher hands over the matching cards, which groups add and connect.",
    "Groups read the UEBA insight sheet and mark which activities are first-time or unusual for the account and its peers.",
    "Groups choose playbook cards for disabling the account and posting the incident to a ticket system, naming the trigger type and the role needed.",
    "Groups write a closing classification and comment, then the teacher reveals that one variant was an approved red-team test and groups revise if needed."
   ]
  },
  "discussion": [
   "Why is closing an approved test as false positive harmful to detection engineering?",
   "How do UEBA peer comparisons help separate unusual-but-legitimate activity from real threats?"
  ],
  "exit": [
   [
    "Why might an incident's investigation graph show no hosts?",
    "The analytics rule did not map any Host entities."
   ],
   [
    "Which playbook trigger lets you disable one user from its entity page?",
    "An entity-trigger playbook run on demand."
   ],
   [
    "What Sentinel classification fits an approved red-team exercise the rule correctly detected?",
    "Benign positive."
   ]
  ],
  "differentiation": [
   "Support: give students a reference card with the four classifications and the three playbook trigger types, and start them with a partly completed corkboard.",
   "Extend: ask fast finishers to explain what the BehaviorAnalytics columns InvestigationPriority and ActivityInsights tell them and how they would use them to rank which accounts to look at first."
  ]
 },
 {
  "t": "Microsoft Security Copilot embedded in the Defender portal: incident summaries, guided response, script analysis",
  "objectives": [
   "Students will be able to identify which embedded Security Copilot feature (incident summary, guided response, script analysis, incident report, natural-language to KQL) fits a described analyst need.",
   "Students will be able to explain why guided response differs from automatic attack disruption.",
   "Students will be able to describe how Copilot respects role-based access control and consumes security compute units.",
   "Students will be able to apply a verification routine to Copilot output before taking response actions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect three or four answers on the whiteboard. Point out that speed and trust pull in different directions."
   ],
   [
    12,
    "Teach",
    "Project a mock incident page and walk through the Copilot panel: summary, guided response cards, script analysis, incident report and natural-language to KQL. Stress that the analyst decides and that Copilot sees only what the user can see."
   ],
   [
    15,
    "Activity",
    "Run the 'Need to Feature' card sort described below, in pairs, then have pairs check a printed Copilot summary against printed evidence."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to compare guided response with automatic attack disruption and to talk about accountability."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "If an AI assistant wrote a summary of a security incident for you in ten seconds, what would you still want to check yourself before isolating a manager's laptop?",
  "activity": {
   "title": "Need to Feature, then Verify",
   "materials": "Printed cards with analyst requests (for example 'explain this encoded command', 'what should I do next', 'brief the next shift', 'write a hunting query for encoded PowerShell'), printed feature labels, one printed fictional Copilot summary with a deliberate error, a matching one-page evidence sheet, whiteboard.",
   "steps": [
    "Give each pair a shuffled deck of request cards and the five feature labels. Pairs match each request to a feature in five minutes.",
    "Reveal the answers on the projector and discuss any card that more than one pair placed differently.",
    "Hand out the fictional Copilot summary and the evidence sheet. Pairs find the statement in the summary that the evidence does not support, for example a wrong device name or a claim that a password was already reset.",
    "Each pair writes one sentence on the whiteboard describing how they would catch that kind of error in real work."
   ]
  },
  "discussion": [
   "Who is accountable when an analyst follows a Copilot recommendation that turns out to be wrong, and why?",
   "Why might a SOC choose not to let Copilot summarize every incident automatically, even though it saves time?",
   "How does Copilot staying within the user's permissions protect the organization?"
  ],
  "exit": [
   [
    "An analyst needs an obfuscated PowerShell command explained. Which feature?",
    "Script analysis."
   ],
   [
    "Does guided response isolate devices on its own?",
    "No. It recommends actions; the analyst chooses whether to run them. Automatic attack disruption is the feature that acts without waiting."
   ],
   [
    "What unit measures Security Copilot capacity?",
    "Security compute units (SCUs)."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page reference card listing each feature with a single example request, and let them use it during the card sort.",
   "Extend: Ask fast finishers to write a short SOC policy paragraph stating when Copilot output may be used, what must be verified, and how capacity use is monitored."
  ]
 },
 {
  "t": "KQL basics: where, project, extend, summarize, count, bin, ago(), order by, take, render",
  "objectives": [
   "Students will be able to explain how a KQL pipeline passes rows from one operator to the next.",
   "Students will be able to compare project with extend, take with top, and == with =~.",
   "Students will be able to write a query that filters with ago(), aggregates with summarize and bin(), and sorts the result.",
   "Students will be able to choose the correct time column for Sentinel and Defender XDR tables."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up and let students describe in plain words how they would find the answer in a spreadsheet."
   ],
   [
    12,
    "Teach",
    "Project the sample failed-logon query and build it line by line, explaining where, ago(), summarize, bin(), order by and render. Contrast project with extend and take with top on the board."
   ],
   [
    18,
    "Activity",
    "Run the 'Human Pipeline' activity below, then let pairs try queries in the free Log Analytics demo environment if laptops and access allow."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about operator order and performance."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "You have a spreadsheet of one million logon attempts. Describe, in plain steps, how you would find which account failed the most in the last day.",
  "activity": {
   "title": "Human Pipeline",
   "materials": "About 30 printed 'event rows' on index cards (time, account, event ID 4624 or 4625, computer), operator cards (where, project, extend, summarize, order by, take), whiteboard, optional student laptops with a browser.",
   "steps": [
    "Line up five or six students, each holding one operator card with a written condition, for example 'where EventID == 4625' or 'summarize count() by Account'.",
    "Pass the stack of event cards down the line. Each student applies only their operator and passes the result on, writing new cards where summarize creates groups.",
    "Swap the order of two operators (for example, summarize before where) and run it again. Discuss what broke and why.",
    "Insert 'take 5' early in the line and show how the final count becomes wrong.",
    "Pairs then write the same pipeline as KQL on the whiteboard, using the correct time column."
   ]
  },
  "discussion": [
   "Why does the order of operators change both the result and the cost of a query?",
   "When would you prefer project-away over project?",
   "What would you look for first if a query that worked in Sentinel returns nothing in advanced hunting?"
  ],
  "exit": [
   [
    "Write the line that keeps only the last seven days in a Sentinel table.",
    "`where TimeGenerated > ago(7d)`"
   ],
   [
    "What is the difference between project and extend?",
    "project keeps only the listed columns; extend adds a calculated column and keeps all existing ones."
   ],
   [
    "How do you count events per hour?",
    "`summarize count() by bin(TimeGenerated, 1h)`"
   ]
  ],
  "differentiation": [
   "Support: Provide a cheat sheet that pairs each operator with a one-line plain-English meaning and an example, and let students build queries by arranging printed lines in order.",
   "Extend: Ask fast finishers to modify the failed-logon query to show distinct accounts per source computer with dcount() and to chart it with render timechart, then explain each change."
  ]
 },
 {
  "t": "KQL for hunting: has vs contains, in and has_any, let statements and dynamic lists, join kinds, union, parse_json and mv-expand, make-series with anomaly functions",
  "objectives": [
   "Students will be able to explain why has is faster than contains and when to use in versus has_any.",
   "Students will be able to compare join kinds (innerunique, inner, leftouter, leftanti, leftsemi) with union.",
   "Students will be able to write a let statement with a dynamic list and reuse it in a filter.",
   "Students will be able to describe how parse_json, mv-expand and make-series with series_decompose_anomalies support hunting."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up and record answers. Introduce the idea of an index of whole words."
   ],
   [
    12,
    "Teach",
    "Walk through has versus contains, in versus has_any, let with dynamic(), then join kinds and union using two small tables drawn on the board."
   ],
   [
    16,
    "Activity",
    "Run the 'Join Kind Venn' activity below in groups of three."
   ],
   [
    7,
    "Discuss",
    "Show the make-series query on the projector and discuss what each line produces, then use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A book index lists whole words with page numbers. Why is it fast to find 'mimikatz' in an index but slow to find every page containing the letters 'katz'?",
  "activity": {
   "title": "Join Kind Venn",
   "materials": "Two sets of printed cards: 'Devices with suspicious tools' (left table, including one duplicated device) and 'Approved admin hosts' (right table); large paper or whiteboard with two overlapping circles; sticky notes labeled with each join kind and union.",
   "steps": [
    "Groups lay out the left and right cards in the two circles, placing matching device names in the overlap.",
    "For each sticky note (inner, innerunique, leftouter, leftanti, leftsemi, union), the group writes which cards would appear in the output and how many rows there would be.",
    "Point out the duplicated left device and ask how inner and innerunique differ for it.",
    "Each group writes a short KQL line that uses a let dynamic list and has_any to build the left table, then the correct join kind to find unapproved devices."
   ]
  },
  "discussion": [
   "Why does putting the smaller table on the left and filtering both sides by time improve join performance?",
   "When might an anomaly found by series_decompose_anomalies be perfectly normal business activity?",
   "What are the risks of relying on the default join kind in a detection?"
  ],
  "exit": [
   [
    "Which join kind returns left rows with no match on the right?",
    "leftanti."
   ],
   [
    "Which operator stacks rows from several tables?",
    "union."
   ],
   [
    "Why use has instead of contains for a whole word?",
    "has uses the term index and is faster; contains scans every character for substrings."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-column card that pairs each goal phrase ('records with no match', 'any of these terms', 'one row per array element') with its operator, and let them use it during the activity.",
   "Extend: Ask fast finishers to write a hunt that uses make-series and series_decompose_anomalies on DeviceNetworkEvents per device and to explain how they would filter out expected spikes such as patch nights."
  ]
 },
 {
  "t": "Advanced hunting schema: DeviceProcessEvents, DeviceNetworkEvents, DeviceLogonEvents, EmailEvents, EmailUrlInfo, IdentityLogonEvents, CloudAppEvents, AlertInfo and AlertEvidence",
  "objectives": [
   "Students will be able to identify the advanced hunting table that holds a described kind of evidence.",
   "Students will be able to explain the join keys NetworkMessageId (email tables) and AlertId (alert tables).",
   "Students will be able to distinguish DeviceLogonEvents from IdentityLogonEvents and DeviceProcessEvents from DeviceNetworkEvents.",
   "Students will be able to outline a multi-table hunt that follows a phishing email from delivery to process execution."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up and list student guesses on the board."
   ],
   [
    12,
    "Teach",
    "Project a diagram of the table groups (device, email, identity, cloud app, alert) and highlight key columns and join keys. Note the Timestamp column and the roughly 30-day retention."
   ],
   [
    16,
    "Activity",
    "Run the 'Evidence to Table' relay below in teams."
   ],
   [
    7,
    "Discuss",
    "Walk through the phishing worked example as a chain of tables, then use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on index cards."
   ]
  ],
  "warmup": "A user clicked a phishing link and a script ran on their laptop. List every piece of evidence you would want, and guess where each might be recorded.",
  "activity": {
   "title": "Evidence to Table Relay",
   "materials": "Printed evidence cards (for example 'parent process of encoded PowerShell', 'remote port 4444 connection', 'NTLM logon to a domain controller', 'all recipients of a URL', 'inbox rule created in Exchange Online', 'entities in a high-severity alert'), table name signs taped to the wall, whiteboard.",
   "steps": [
    "Split the class into teams. Each team gets a shuffled stack of evidence cards.",
    "One student at a time takes a card, walks to the correct table sign and tapes it there, then returns and tags the next teammate.",
    "After all cards are placed, review each sign together and move any misplaced cards, explaining why.",
    "Each team writes on the whiteboard the join needed for one two-table card, naming the key column."
   ]
  },
  "discussion": [
   "Why do vendors split events into many narrow tables rather than one large one?",
   "How would you continue an investigation that needs data older than advanced hunting retention?",
   "Why is summarize count() by ActionType a good first query on an unfamiliar table?"
  ],
  "exit": [
   [
    "Which table holds command lines and parent processes?",
    "DeviceProcessEvents, using the InitiatingProcess columns for the parent."
   ],
   [
    "Which column joins EmailEvents to EmailUrlInfo?",
    "NetworkMessageId."
   ],
   [
    "Where would you find NTLM authentication to an on-premises domain controller?",
    "IdentityLogonEvents."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page table map that lists each table, three key columns and its join key, and let students keep it during the relay.",
   "Extend: Ask fast finishers to write the full KQL for the phishing chain: EmailEvents joined to EmailUrlInfo, then UrlClickEvents, then DeviceProcessEvents within an hour of the click."
  ]
 },
 {
  "t": "Turning a hunting query into a custom detection rule; Security Copilot help with writing KQL",
  "objectives": [
   "Students will be able to explain why successful hunts should become detection rules.",
   "Students will be able to convert a hunting query into a detection-ready query by adding identifier and entity columns and removing take, limit and render.",
   "Students will be able to describe noise testing and choose a sensible frequency and automated action policy.",
   "Students will be able to evaluate Copilot-generated KQL against a review checklist."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up and connect answers to the idea of permanent coverage."
   ],
   [
    12,
    "Teach",
    "Project a raw hunting query and transform it on screen into the detection-ready sample query, naming each change. Then show a natural-language request and a generated query and model the review checklist."
   ],
   [
    16,
    "Activity",
    "Run the 'Fix the Rule' pair exercise described below."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions about noise, automation and trust in generated KQL."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You found an attacker technique once by hand. What could go wrong if your team relies on someone remembering to search for it again?",
  "activity": {
   "title": "Fix the Rule",
   "materials": "Printed handout with four flawed queries (one ends in summarize count() by DeviceName, one contains take 100, one uses TimeGenerated in a Defender table, one is a 'Copilot-generated' query that searches the wrong table), a review checklist, projector.",
   "steps": [
    "Pairs receive the handout and the checklist and identify what is wrong with each query.",
    "For each query, pairs rewrite the problem lines on the handout so the query would save and alert correctly.",
    "Pairs decide a run frequency and whether any automated action is appropriate, writing one sentence of justification.",
    "Two or three pairs present a fix on the projector while the class checks it against the checklist."
   ]
  },
  "discussion": [
   "How many alerts per week would make a rule useful versus ignored in your view, and what drives that number?",
   "When, if ever, should a new rule be allowed to isolate devices automatically?",
   "How should a team record that a Copilot-generated query was reviewed before it became a rule?"
  ],
  "exit": [
   [
    "Name two things to remove from a hunting query before saving it as a detection.",
    "take or limit, and render."
   ],
   [
    "How can a summarized query still produce actionable alerts?",
    "Use arg_max(Timestamp, *) (or similar) so each row keeps the event identifiers and entity columns."
   ],
   [
    "What must an analyst do with KQL generated by Security Copilot?",
    "Review the tables, columns, filters and time range, then run it and inspect the results before relying on it."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a filled-in example of a before-and-after query with each change annotated, and let them mirror it on one handout query.",
   "Extend: Ask fast finishers to draft the full rule settings for the sample query: name, description, severity, MITRE ATT&CK technique, impacted entity, frequency and recommended actions."
  ]
 },
 {
  "t": "Sentinel hunting: hunting queries, hunts, bookmarks, livestream, notebooks with MSTICPy",
  "objectives": [
   "Students will be able to describe the Sentinel hunting flow from hypothesis to incident and detection.",
   "Students will be able to choose between hunting queries, hunts, bookmarks, livestream and notebooks for a described need.",
   "Students will be able to explain how bookmarks move hunting findings into incidents.",
   "Students will be able to state what MSTICPy provides and that notebook compute is billed separately."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up and collect ideas about what makes a hunt different from responding to an alert."
   ],
   [
    12,
    "Teach",
    "Draw the hunting flow on the whiteboard as a row of boxes: hypothesis, hunting queries, bookmarks, livestream, notebook, incident and analytics rule. Describe what each tool does and when to stop using it."
   ],
   [
    16,
    "Activity",
    "Run the 'Case File' role-play below in groups of four."
   ],
   [
    7,
    "Discuss",
    "Groups share how their hunt ended, then use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "If no alert has fired all week, does that mean no attacker is present? What would you do to find out?",
  "activity": {
   "title": "Case File Role-Play",
   "materials": "Printed scenario sheets with a hypothesis (credential dumping on servers), a printed 'query result' table with ten rows, sticky notes in three colors (bookmark, livestream, notebook), a blank 'hunt record' sheet, whiteboard.",
   "steps": [
    "Assign roles in each group: hunter, note-taker, incident responder and detection engineer.",
    "The hunter reviews the query result and marks suspicious rows with bookmark sticky notes, writing the entities to map on each.",
    "The group decides what to watch with livestream and what deeper question needs a notebook, writing each on the matching sticky note.",
    "The incident responder explains how the bookmarks become an incident; the detection engineer writes one sentence describing the analytics rule the hunt should produce.",
    "The note-taker completes the hunt record with hypothesis, outcome and next steps."
   ]
  },
  "discussion": [
   "Why is a hypothesis important, and what happens to hunts without one?",
   "How would you decide when a livestream has done its job?",
   "What kinds of analysis justify the extra cost of notebooks?"
  ],
  "exit": [
   [
    "How do you save evidence from a hunting query so it can enter an incident?",
    "Create a bookmark with notes and mapped entities, then create or add to an incident from it."
   ],
   [
    "Which tool watches new data for matches without creating an analytics rule?",
    "Livestream."
   ],
   [
    "What is MSTICPy?",
    "An open-source Python library for security investigations in notebooks, with query providers, enrichment such as threat intelligence lookups, and visualizations."
   ]
  ],
  "differentiation": [
   "Support: Give students a matching worksheet that pairs each hunting tool with a single example need, and let them complete it before the role-play.",
   "Extend: Ask fast finishers to outline the cells of an MSTICPy notebook for the credential dumping hunt: data query, enrichment, visualization and conclusion."
  ]
 },
 {
  "t": "Long-term data: search jobs, restore, Sentinel data lake KQL jobs",
  "objectives": [
   "Students will be able to explain why long-term and data lake data cannot be used directly by analytics rules.",
   "Students will be able to choose between a search job, a restore and a KQL job for a described investigation need.",
   "Students will be able to identify results tables by their _SRCH and _RST suffixes.",
   "Students will be able to describe cost-control practices for searching and restoring data."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up and connect answers to the cost of keeping data searchable."
   ],
   [
    12,
    "Teach",
    "Draw the analytics tier and the long-term/data lake tier on the whiteboard. Add three arrows labeled search job (_SRCH), restore (_RST) and KQL job, and describe what each returns and costs."
   ],
   [
    15,
    "Activity",
    "Run the 'Pick the Tool' scenario sort below in small groups."
   ],
   [
    8,
    "Discuss",
    "Review group answers and use the discussion questions about cost and scope."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Why might a company keep only a few months of logs in fast, searchable storage, even though breaches are often discovered much later?",
  "activity": {
   "title": "Pick the Tool",
   "materials": "Eight printed scenario cards (for example 'every event mentioning one IP across the past year', 'full week of sign-ins with joins', 'daily indicator matches from the data lake for a rule', 'monthly aggregation into the analytics tier'), three labeled sorting areas on desks plus an 'other' area, whiteboard.",
   "steps": [
    "Groups sort each scenario card into search job, restore, KQL job or other, writing a one-line reason on the back.",
    "For each card placed in restore, groups add a note on how to limit cost (narrow time range, delete afterward).",
    "For each search job card, groups name the results table, for example SigninLogs_SRCH.",
    "The teacher reveals answers and highlights the summary rules card that belongs in 'other'."
   ]
  },
  "discussion": [
   "How would you explain the cost difference between a search job and a restore to a finance manager?",
   "What risks come from keeping too little data in any tier?",
   "Why might a team prefer a scheduled KQL job over repeated manual searches?"
  ],
  "exit": [
   [
    "You need every event mentioning one domain over the past year. Which tool?",
    "A search job."
   ],
   [
    "What suffix do restore tables use?",
    "_RST."
   ],
   [
    "Where do KQL job results go?",
    "Into an analytics-tier table, where rules, workbooks and hunting can use them."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision flowchart with three questions (specific records or whole period, one-time or scheduled, data lake or long-term retention) for students to follow during the sort.",
   "Extend: Ask fast finishers to write a short investigation plan for the advisory scenario, naming each tool, the tables involved, the time range and the cost-control steps."
  ]
 },
 {
  "t": "Normalized hunting with ASIM parsers across vendors",
  "objectives": [
   "Students will be able to explain the problem ASIM solves in a multi-vendor environment.",
   "Students will be able to distinguish source-specific from unifying parsers and _Im_ filtering parsers from _ASim_ parameter-less parsers.",
   "Students will be able to write a normalized query that passes time filters to a unifying parser.",
   "Students will be able to describe how new sources join existing ASIM-based hunts."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show three vendor log lines for the same allowed connection and ask the warm-up question."
   ],
   [
    12,
    "Teach",
    "Draw the ASIM layers on the board: vendor tables, source-specific parsers, unifying parser, query. Explain schemas, normalized values, and the _Im_ versus _ASim_ naming."
   ],
   [
    16,
    "Activity",
    "Run the 'Be the Parser' normalization exercise below in pairs."
   ],
   [
    7,
    "Discuss",
    "Discuss trade-offs of query-time versus ingestion-time normalization using the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "Here are three log lines from three firewalls describing the same allowed RDP connection. How many queries would you need to find all three today, and what would make that easier?",
  "activity": {
   "title": "Be the Parser",
   "materials": "Printed log excerpts from three fictional firewall vendors with different column names and values (src_ip/SourceAddress/srcaddr, accept/permit/allow), a printed blank ASIM-style table with columns SrcIpAddr, DstIpAddr, DstPortNumber and EventResult, whiteboard.",
   "steps": [
    "Each pair takes one vendor's excerpt and fills in the normalized table, translating column names and values (for example accept becomes Success).",
    "Pairs combine their tables on the whiteboard to represent the unifying parser's output.",
    "The class writes one KQL query against the combined table to find successful sessions to port 3389, calling _Im_NetworkSession with starttime and endtime.",
    "Add a fourth vendor excerpt without a translation and ask what happens to the query result until a parser is written."
   ]
  },
  "discussion": [
   "What are the costs of normalizing at query time, and when might ingestion-time normalization be worth it?",
   "How could a missing or broken parser create a silent detection gap, and how would you notice?",
   "Why do many Sentinel analytics rule templates build on ASIM?"
  ],
  "exit": [
   [
    "What is a unifying parser?",
    "A parser that calls all source-specific parsers for a schema and unions the results into one normalized output."
   ],
   [
    "How do you improve the performance of a normalized query?",
    "Use an _Im_ filtering parser and pass parameters such as starttime and endtime so filters apply inside each source parser."
   ],
   [
    "What normalized value would replace a vendor's 'permit' in EventResult?",
    "Success."
   ]
  ],
  "differentiation": [
   "Support: Give students a translation key that lists each vendor column next to its ASIM column so they can focus on the concept rather than memorizing names.",
   "Extend: Ask fast finishers to write a query that joins _Im_Authentication failures with _Im_NetworkSession RDP sessions on the source IP address and explain why it works across vendors."
  ]
 },
 {
  "t": "Threat intelligence: TI indicators, TAXII feeds, threat analytics reports in Defender XDR",
  "objectives": [
   "Students will be able to distinguish indicators of compromise from finished intelligence.",
   "Students will be able to explain the roles of STIX and TAXII and configure the TAXII connector inputs.",
   "Students will be able to describe how TI map analytics rules turn indicators into alerts and why expiration matters.",
   "Students will be able to use a threat analytics report to prioritize work based on exposure and mitigations."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up and sort answers into 'clues' and 'stories' on the board."
   ],
   [
    12,
    "Teach",
    "Diagram the indicator flow: feed provider, TAXII connector or upload API, threat intelligence page, TI map rule, alert. Then show the sections of a threat analytics report, emphasizing exposure and mitigations."
   ],
   [
    16,
    "Activity",
    "Run the 'Feed to Finding' role-play below in groups of four."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions about confidence, expiry and prioritization."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A friend warns you about a scam caller's phone number, and a news article explains how the scam works. Which is more useful today, which is more useful next year, and why?",
  "activity": {
   "title": "Feed to Finding",
   "materials": "Printed role cards (feed provider, Sentinel engineer, SOC analyst, threat analytics reader), a printed mock indicator list with confidence and expiry dates (some expired), a short printed log excerpt of DNS lookups, a one-page mock threat analytics report with an exposure section, whiteboard.",
   "steps": [
    "The feed provider hands the engineer a card listing an API root, a collection ID and a credential. The engineer writes the connector settings on the board.",
    "The engineer removes expired indicators from the list and explains why.",
    "The analyst compares the remaining indicators with the DNS log excerpt, as a TI map rule would, and flags matches with notes on confidence.",
    "The threat analytics reader uses the mock report's exposure section to name which devices need patching first.",
    "Groups present their decision on what to do in the next hour."
   ]
  },
  "discussion": [
   "How should a team weigh a low-confidence indicator match against a high-confidence one?",
   "What problems could arise from importing large free feeds without review?",
   "How can threat analytics change a team's priorities for the week?"
  ],
  "exit": [
   [
    "Which is the format and which is the transport: STIX or TAXII?",
    "STIX is the format; TAXII is the transport protocol."
   ],
   [
    "What makes imported indicators generate alerts in Sentinel?",
    "Threat intelligence matching (TI map) analytics rules that compare indicators with log data."
   ],
   [
    "Which threat analytics section shows whether your devices have the relevant patches?",
    "Exposure and mitigations."
   ]
  ],
  "differentiation": [
   "Support: Give students a labeled diagram of the indicator flow with blanks to fill in (connector, page, rule, alert) during the teach segment.",
   "Extend: Ask fast finishers to write a hunting query that joins current, unexpired domain indicators with DnsEvents and to explain how they would handle low-confidence matches."
  ]
 },
 {
  "t": "Graph-based hunting: Sentinel graph and hunting graphs with blast radius",
  "objectives": [
   "Students will be able to explain graph concepts (nodes, edges, paths) and why they suit relationship questions.",
   "Students will be able to describe what Sentinel graph, hunting graphs and blast radius analysis provide.",
   "Students will be able to use blast radius findings to prioritize containment and scope an investigation.",
   "Students will be able to propose preventive changes that reduce future blast radius."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up and sketch one student's answer as dots and lines on the board."
   ],
   [
    10,
    "Teach",
    "Introduce nodes, edges and paths. Explain Sentinel graph, hunting graphs and blast radius, and contrast relationship questions with event questions answered by KQL."
   ],
   [
    18,
    "Activity",
    "Run the 'String Map' blast radius exercise below in groups."
   ],
   [
    7,
    "Discuss",
    "Groups compare containment priorities, then use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If someone stole your house key, which rooms, cabinets and other keys could they reach from there? How would you decide what to change first?",
  "activity": {
   "title": "String Map Blast Radius",
   "materials": "Large paper or a whiteboard, sticky notes for nodes (users, laptops, groups, build server, key vault, domain controller, kiosk), markers or string for edges labeled 'member of', 'admin of', 'signed in to', 'has permission to', a printed scenario card.",
   "steps": [
    "Groups build a small environment map from the scenario card, placing sticky notes and drawing labeled edges between them.",
    "The teacher announces that one laptop is compromised. Groups trace every path from it to the critical assets and mark them in a different color.",
    "Groups rank containment actions based on the paths they found, and list which logs they would query to check whether each path was actually used.",
    "Each group removes one edge (for example a standing permission) and explains how the blast radius shrinks."
   ]
  },
  "discussion": [
   "Why might the identity on a compromised device matter more than the device itself?",
   "What happens to graph analysis if important data sources are missing?",
   "When is a simple KQL query a better tool than a graph?"
  ],
  "exit": [
   [
    "What question does blast radius analysis answer?",
    "Which critical assets an attacker could reach from a compromised user or device, and by which paths."
   ],
   [
    "Does a path in a hunting graph prove the attacker used it?",
    "No. It shows what is possible; logs confirm what happened."
   ],
   [
    "Name one way to reduce future blast radius.",
    "Remove excess permissions or standing admin rights, for example using just-in-time elevation, fix misconfigurations, or protect critical assets."
   ]
  ],
  "differentiation": [
   "Support: Provide a pre-drawn partial map so students only need to add a few edges and trace paths, with a key explaining each edge label.",
   "Extend: Ask fast finishers to write the KQL checks they would run along each path, naming the tables (for example sign-in logs, device logon events and key vault access logs) and time range."
  ]
 }
]);
