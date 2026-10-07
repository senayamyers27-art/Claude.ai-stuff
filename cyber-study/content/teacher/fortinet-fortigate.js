/* Teacher edition for Fortinet NSE 4 - FortiOS 7.6 Administrator (NSE4_FGT_AD-7.6): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("fortinet-fortigate", [
 {
  "t": "Initial setup: default management IP 192.168.1.99, admin account, forced password change, interface roles and access (HTTPS, SSH, ping)",
  "objectives": [
   "Students will be able to state the factory default management IP, protocol and admin credentials of a hardware FortiGate.",
   "Students will be able to explain why FortiOS forces a password change at first login and identify false distractors such as root or serial-number logins.",
   "Students will be able to distinguish interface roles from administrative access and from firewall policies.",
   "Students will be able to write or read an `allowaccess` CLI block and predict whether it will lock out the administrator."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Hold up a photo or drawing of a FortiGate front panel and ask: if this arrived today with no paperwork, how would you log in? Collect guesses on the board without correcting yet."
   ],
   [
    12,
    "Teach",
    "Walk through first login: cable to MGMT, laptop in 192.168.1.0/24, HTTPS to 192.168.1.99, admin with blank password, forced password change. Then explain interface roles (LAN, WAN, DMZ, Undefined) as display helpers, and Administrative Access as the list of services the box answers on each interface. Stress that neither one filters transit traffic."
   ],
   [
    18,
    "Activity",
    "Run the Lockout or Not card activity in pairs (see activity). Circulate and ask each pair to justify one 'lockout' verdict out loud."
   ],
   [
    5,
    "Discuss",
    "Debrief the trickiest cards, especially the `set` versus `append` case and the WAN-role card. Ask which protections they would use instead of opening HTTPS on a WAN port."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a slip of paper and hand it in at the door."
   ]
  ],
  "warmup": "A FortiGate arrives with no paperwork. Write down the exact steps you think you would take to log in for the first time, including the address and username.",
  "activity": {
   "title": "Lockout or Not",
   "materials": "Printed cards (one set per pair) each showing a short scenario or CLI snippet, whiteboard, markers.",
   "steps": [
    "Prepare 10 cards. Examples: 'Managing over HTTPS on port1, admin types set allowaccess ping ssh on port1'; 'Changes port2 role from LAN to WAN while managing on port1'; 'Uses append allowaccess snmp on port1'; 'Changes port1 IP from 192.168.1.99/24 to 10.0.0.1/24 while the laptop is at 192.168.1.50'.",
    "Pairs sort each card into Lockout, No lockout, or Partial (some service lost) and write one sentence explaining why.",
    "Each pair then picks one Lockout card and writes the recovery path (another interface, SSH, or console port) on a sticky note.",
    "The class compares sticky notes on the whiteboard and the teacher confirms the correct answers, highlighting that set replaces the list."
   ]
  },
  "discussion": [
   "Why would a vendor force a password change instead of shipping a unique random password on a sticker?",
   "What could go wrong if an organization allowed HTTPS and SSH administrative access on its internet-facing WAN interface?"
  ],
  "exit": [
   [
    "What is the default management IP and login of a factory hardware FortiGate?",
    "192.168.1.99 over HTTPS, user admin with a blank password, followed by a forced password change."
   ],
   [
    "Does assigning the WAN role to an interface block inbound traffic?",
    "No. Roles only tailor displayed settings; firewall policies decide what passes."
   ],
   [
    "An admin types set allowaccess ping on the port they manage over HTTPS. What happens?",
    "HTTPS and any other services are removed from the list, so the GUI session is lost; only ping is answered."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column reference card (Administrative Access = traffic to the box; Firewall policy = traffic through the box) and let them use it during the card sort.",
   "Extend: Ask fast finishers to design a hardened management plan for a branch unit using trusted hosts, a dedicated management interface and a VPN, and explain which allowaccess entries each interface would have."
  ]
 },
 {
  "t": "Administrator accounts: admin profiles, trusted hosts, MFA for admins, password policy",
  "objectives": [
   "Students will be able to match each of the four admin controls (profile, trusted hosts, MFA, password policy) to the question it answers.",
   "Students will be able to design a least-privilege admin profile for a given role such as an auditor.",
   "Students will be able to explain why trusted hosts must be configured on every admin account.",
   "Students will be able to choose the correct control for an exam-style scenario and reject plausible distractors."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the auditor's question from the warm-up and have students list on sticky notes every way they can think of to protect a firewall login."
   ],
   [
    12,
    "Teach",
    "Group the sticky notes into four columns on the whiteboard labelled What, Where, Who, How strong. Introduce admin profiles, trusted hosts, MFA and password policy as the FortiGate feature in each column. Show the CLI shape of trusthost1 and a custom profile with Read access to Log and Report."
   ],
   [
    18,
    "Activity",
    "Run the Auditor's Requests role-play (see activity). Pairs act as auditor and firewall admin and must name the control and setting for each request."
   ],
   [
    5,
    "Discuss",
    "Debrief common mix-ups, especially MFA versus trusted hosts and the per-account nature of trusted hosts."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on paper."
   ]
  ],
  "warmup": "An auditor asks you three questions about your firewall: who can change it, from where, and how do you know it is really them. Write one control you would point to for each question.",
  "activity": {
   "title": "The Auditor's Requests",
   "materials": "Printed request cards (8 per pair), a printed four-column answer sheet (Profile, Trusted hosts, MFA, Password policy), pens.",
   "steps": [
    "Pairs take turns: one reads a request card as the auditor, for example 'The contractor must only manage from the vendor jump box at 172.16.5.10' or 'Passwords must be at least 12 characters and expire every 90 days'.",
    "The other student, as the admin, names the control and describes the exact setting (for example trusted host 172.16.5.10/32 on the contractor account).",
    "The auditor checks the answer against the four-column sheet and challenges any answer that uses the wrong control.",
    "Swap roles halfway. Finish by having each pair write a complete hardened account plan for the contractor that uses all four controls."
   ]
  },
  "discussion": [
   "Why are shared admin accounts a problem for both security and accountability, even when the password is strong?",
   "If you could only implement one of the four controls this week, which would you pick for an internet-reachable FortiGate and why?"
  ],
  "exit": [
   [
    "Which control restricts the source subnet an admin can log in from?",
    "Trusted hosts configured on that admin account."
   ],
   [
    "What profile setup gives an auditor log visibility without change rights?",
    "A custom admin profile with Read access to Log and Report and None elsewhere."
   ],
   [
    "One admin account has trusted hosts and another does not. Is the FortiGate protected against logins from the internet?",
    "No. The account without trusted hosts can still log in from anywhere; trusted hosts must be set on every account."
   ]
  ],
  "differentiation": [
   "Support: Provide a sentence frame on the answer sheet, 'This request is about WHAT / WHERE / WHO / HOW STRONG, so the control is ___', and pre-fill the first two cards together.",
   "Extend: Ask fast finishers to compare local admin passwords with remote RADIUS or LDAP admin authentication and list one advantage and one risk of each."
  ]
 },
 {
  "t": "Firmware management: the upgrade path, config backups and restore",
  "objectives": [
   "Students will be able to explain why Fortinet publishes an upgrade path and what can happen if steps are skipped.",
   "Students will be able to sequence a safe upgrade workflow from planning to verification.",
   "Students will be able to compare plain and encrypted backups and state the limits of restoring across models or firmware.",
   "Students will be able to describe how an FGCP cluster performs a rolling upgrade."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: have you ever had a phone or laptop update go wrong? What would you have wanted beforehand? Collect answers that point toward backups and planning."
   ],
   [
    12,
    "Teach",
    "Explain the upgrade path with a drawn timeline of builds and arrows for required steps. Cover release notes, backups (plain versus encrypted, model specific), restore behavior (replace and reboot), and the rolling upgrade in an HA cluster."
   ],
   [
    18,
    "Activity",
    "Run the Change Window Plan activity in groups of three (see activity)."
   ],
   [
    5,
    "Discuss",
    "Groups share where they placed backup and verification steps and what their rollback trigger was."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You must update a device that an entire building depends on, and you have two hours overnight. List three things you would do before clicking Upgrade.",
  "activity": {
   "title": "Change Window Plan",
   "materials": "Printed step cards (shuffled), a printed fictional upgrade path sheet listing a starting build and two required intermediate builds, sticky notes, whiteboard.",
   "steps": [
    "Give each group a shuffled set of cards: check upgrade path, read release notes, take encrypted backup, store backup password, upgrade to intermediate build 1, verify health, upgrade to intermediate build 2, verify health, upgrade to target, verify health, restore previous config.",
    "Groups arrange the cards into a timeline for a two-hour window and decide where the restore card belongs as a rollback branch.",
    "Each group writes one specific rollback trigger on a sticky note, for example 'VPN tunnels not up within 10 minutes of reboot'.",
    "Groups post their timelines on the wall; the teacher walks the class through a model answer and highlights any group that skipped a step or omitted verification."
   ]
  },
  "discussion": [
   "Why might an administrator be tempted to skip the upgrade path, and how would you argue against that with a manager under time pressure?",
   "Where should backup files and their passwords be stored so they are available during an outage but not exposed to attackers?"
  ],
  "exit": [
   [
    "What is the purpose of the FortiOS upgrade path?",
    "To list intermediate builds that must be installed in order so the configuration converts cleanly between versions."
   ],
   [
    "Name one limitation of a configuration backup.",
    "It is model and often firmware specific, and an encrypted backup cannot be restored without its password."
   ],
   [
    "What does a restore do to the running configuration?",
    "It replaces it entirely and reboots the unit."
   ]
  ],
  "differentiation": [
   "Support: Give students a partially completed timeline with the first and last cards placed, and a glossary strip for upgrade path, backup and restore.",
   "Extend: Ask fast finishers to adapt the plan for an FGCP active-passive cluster and explain in which order the members are upgraded and when traffic fails over."
  ]
 },
 {
  "t": "VDOMs: what they separate, root VDOM, when to use multi-VDOM",
  "objectives": [
   "Students will be able to list what each VDOM separates: interfaces, routing table, policies, profiles and administrators.",
   "Students will be able to explain the role of the root VDOM and distinguish global from per-VDOM settings.",
   "Students will be able to decide between multi-VDOM and VLANs or zones for a given scenario.",
   "Students will be able to describe how an inter-VDOM link, routes and policies allow controlled traffic between VDOMs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to describe how an apartment building keeps tenants separate while sharing one structure. Map their answers to firewall ideas on the board."
   ],
   [
    12,
    "Teach",
    "Draw one FortiGate box divided into three VDOMs with their own interfaces and routing tables. Mark the root VDOM as management. Write Global and Per-VDOM columns and sort example settings into them. Show the inter-VDOM link as a drawn wire between two VDOMs with a policy on each side."
   ],
   [
    18,
    "Activity",
    "Run the VDOM or VLAN card sort (see activity) in small groups."
   ],
   [
    5,
    "Discuss",
    "Groups defend their most debated card. Emphasize overlapping addresses and separate administration as the clearest signals for VDOMs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "One building, many tenants. How does a landlord keep each tenant's space private while still controlling the electricity and elevators? Write two ideas.",
  "activity": {
   "title": "VDOM or VLAN",
   "materials": "Printed scenario cards (10 per group), two labelled sorting areas on desks or whiteboard (Multi-VDOM, VLANs/zones), sticky notes.",
   "steps": [
    "Groups read each scenario card, for example 'Two customers both using 192.168.10.0/24', 'Separate guest Wi-Fi for one company', 'A partner's admin must manage only their rules', 'Lab network for the same IT team'.",
    "Groups place each card under Multi-VDOM or VLANs/zones and write the deciding reason on a sticky note attached to the card.",
    "For every Multi-VDOM card, groups draw on the whiteboard whether an inter-VDOM link is needed and what policies it would require.",
    "The teacher reviews the sort, confirming that overlapping addresses and separate administration point to VDOMs while simple segmentation points to VLANs and zones."
   ]
  },
  "discussion": [
   "What are the operational costs of running many VDOMs on one appliance, and how might one tenant's traffic affect another?",
   "Why might a security team prefer split-task VDOM mode even when there is only one organization?"
  ],
  "exit": [
   [
    "Name three things that are separate in each VDOM.",
    "Any three of: interfaces, routing table, firewall policies, security profiles, administrators."
   ],
   [
    "Can the root VDOM be deleted, and what does it do by default?",
    "No. It always exists and by default is the management VDOM that carries the FortiGate's own management traffic."
   ],
   [
    "Two tenants use the same 10.1.0.0/16 network. VLANs or VDOMs, and why?",
    "VDOMs, because each VDOM has its own routing table, so overlapping addresses do not conflict."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page diagram of a FortiGate split into VDOMs with labelled routing tables, and let students refer to it during the sort.",
   "Extend: Ask fast finishers to design an inter-VDOM path that lets two tenant VDOMs reach a shared DNS server in a third VDOM, listing the links, routes and policies needed."
  ]
 },
 {
  "t": "FGCP HA: active-passive vs active-active, heartbeat links, primary election (monitored ports, uptime, priority, serial, override)",
  "objectives": [
   "Students will be able to compare active-passive and active-active FGCP modes.",
   "Students will be able to explain the purpose of heartbeat links and describe how split brain occurs.",
   "Students will be able to recite the primary election order with override disabled and enabled.",
   "Students will be able to predict the primary unit in a given cluster scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: if two equally qualified people both want to lead a project, what fair tie-break rules could you use? Write their ideas, then reveal that FGCP uses a fixed list."
   ],
   [
    12,
    "Teach",
    "Draw two FortiGates with two heartbeat cables and shared virtual MACs. Explain the two modes, split brain, monitored interfaces, and both election orders as two columns on the board. Highlight the swap of uptime and priority under override."
   ],
   [
    18,
    "Activity",
    "Run the Who Is Primary election game (see activity) in pairs."
   ],
   [
    5,
    "Discuss",
    "Review the scenarios that caused the most disagreement and ask why override is disabled by default."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Two co-leaders both claim to be in charge. Write down three tie-break rules you would use, in order.",
  "activity": {
   "title": "Who Is Primary",
   "materials": "Printed unit cards showing monitored ports up, HA uptime, priority and serial for two units, a printed rule sheet for both election orders, whiteboard.",
   "steps": [
    "Give each pair 8 scenario cards, each describing Unit A and Unit B plus whether override is enabled.",
    "Pairs work through the election criteria in order and record the winning unit and the deciding criterion for each card.",
    "Introduce event cards, such as 'Unit A WAN cable unplugged' or 'Unit B rebooted and returned', and have pairs re-run the election.",
    "The teacher reveals answers on the board; pairs score a point for the correct winner and another for naming the deciding criterion."
   ]
  },
  "discussion": [
   "Why might an organization choose not to enable override even though it wants a preferred primary unit?",
   "What design choices would you make to prevent split brain in a cluster spread across two server rooms?"
  ],
  "exit": [
   [
    "List the election order with override disabled.",
    "Monitored interfaces, HA uptime, device priority, serial number."
   ],
   [
    "What changes when override is enabled?",
    "Device priority is compared before HA uptime, so the higher-priority unit reclaims the primary role after recovery."
   ],
   [
    "What problem do two heartbeat links prevent?",
    "Split brain, where both units become primary after losing heartbeat contact."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students the rule sheet as a flowchart with yes or no arrows, and let them work the first two cards with the teacher.",
   "Extend: Ask fast finishers to explain what happens to established sessions during a failover with and without session pickup, and when an extra failover caused by override would hurt users."
  ]
 },
 {
  "t": "HA operations: session pickup, config sync, checksums, `get system ha status`, `execute ha manage`",
  "objectives": [
   "Students will be able to explain what session pickup does, why it is disabled by default, and how connectionless and delay options change it.",
   "Students will be able to describe configuration synchronization and how checksums reveal out-of-sync areas.",
   "Students will be able to select the correct HA command for a given troubleshooting need.",
   "Students will be able to interpret a simplified `get system ha status` output."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: in a relay race, what happens if the baton is dropped during the handoff? Link the idea to sessions during a failover."
   ],
   [
    12,
    "Teach",
    "Explain session pickup, its default state, connectionless and delay options. Explain config sync and which settings are not synchronized. Introduce checksums with a simple example of two lists producing different fingerprints. Show each command and what question it answers."
   ],
   [
    18,
    "Activity",
    "Run the Night Shift Troubleshooting pair activity (see activity) using a projected or printed simplified HA status output."
   ],
   [
    5,
    "Discuss",
    "Review which command each pair reached for first and why. Ask what risks come with enabling session pickup everywhere."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Two people share a to-do list on paper. How would you quickly check that both copies are identical without reading every line?",
  "activity": {
   "title": "Night Shift Troubleshooting",
   "materials": "Projector or printed handout with a simplified, teacher-written `get system ha status` output and a checksum comparison showing one mismatched area, printed symptom cards, whiteboard.",
   "steps": [
    "Pairs read the simplified HA status output and identify the primary, each unit's HA uptime and priority, and the sync state.",
    "Pairs draw symptom cards, for example 'SSH sessions dropped after failover', 'GUI shows out of sync', 'Need to check the secondary's interface counters', 'UDP voice calls cut during failover'.",
    "For each card, pairs write the command or setting they would use and one sentence explaining why.",
    "Pairs compare the checksum handout to identify which configuration area differs and propose the next step, then the teacher reviews answers on the board."
   ]
  },
  "discussion": [
   "What trade-offs should a team weigh before enabling session pickup and connectionless pickup on a busy cluster?",
   "Why is it important that some settings, like hostname and HA priority, are not synchronized?"
  ],
  "exit": [
   [
    "Users lose SSH sessions after every failover. What setting should you enable?",
    "Session pickup, which is disabled by default."
   ],
   [
    "Which command compares configuration checksums across cluster members?",
    "`diagnose sys ha checksum cluster`."
   ],
   [
    "What does `execute ha manage` let you do?",
    "Connect from one cluster member to another member's CLI over the heartbeat link."
   ]
  ],
  "differentiation": [
   "Support: Provide a command-to-question matching card (for example 'Who is primary?' maps to `get system ha status`) for students to use during the activity.",
   "Extend: Ask fast finishers to explain why proxy-inspected sessions may still reset with session pickup enabled and how they would set expectations with application owners."
  ]
 },
 {
  "t": "Security Fabric: root and downstream FortiGates, authorization, FortiAnalyzer/cloud logging requirement, Security Rating",
  "objectives": [
   "Students will be able to describe the roles of the Fabric root and downstream FortiGates.",
   "Students will be able to state the logging prerequisite for the Fabric root.",
   "Students will be able to sequence the steps to join and authorize a downstream FortiGate.",
   "Students will be able to explain what Security Rating evaluates and how its results are used."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students how a club or school checks that a new member is genuine before giving them access. Connect their answers to Fabric authorization."
   ],
   [
    12,
    "Teach",
    "Draw a tree with an HQ root and three downstream stores, plus a FortiAnalyzer or cloud icon attached to the root. Walk through the join handshake: downstream points to upstream IP, upstream interface allows Security Fabric Connection, root authorizes by serial. Show a sample Security Rating findings list written on the board."
   ],
   [
    18,
    "Activity",
    "Run the Join the Fabric sequencing and troubleshooting activity (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss why authorization matters and which Security Rating findings groups would fix first."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your school wants all four campuses to share one security dashboard. What would the central campus need, and how should it decide which campuses are allowed in?",
  "activity": {
   "title": "Join the Fabric",
   "materials": "Printed step cards, printed fault cards, a printed sample Security Rating findings list written by the teacher, whiteboard.",
   "steps": [
    "Groups order step cards for joining a store to the Fabric: configure logging on root, allow Security Fabric Connection on root interface, enable Fabric connection on store, enter root IP, authorize store serial on root, verify topology.",
    "Groups then draw fault cards, for example 'Store never appears as pending' or 'Root shows Fabric option unavailable', and identify the missing step.",
    "Groups read the sample Security Rating list and rank the top three findings to fix, giving a reason for each.",
    "Each group presents one fault and its fix; the teacher confirms correct answers."
   ]
  },
  "discussion": [
   "What could go wrong if any FortiGate could join a Fabric without authorization?",
   "How might a Security Rating score be misused if leadership treats it as the only measure of security?"
  ],
  "exit": [
   [
    "What logging destination does the Fabric root require?",
    "FortiAnalyzer or a cloud logging service such as FortiGate Cloud."
   ],
   [
    "Where and how is a downstream FortiGate authorized?",
    "On the root, by approving its serial number."
   ],
   [
    "What does Security Rating check?",
    "Device configurations against Fortinet best practices, producing a score and recommended fixes."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed flowchart of the join process with two blanks for students to fill in before the fault cards.",
   "Extend: Ask fast finishers to explain how a downstream FortiGate with its own downstream unit fits into the tree and what the root can see about the lower unit."
  ]
 },
 {
  "t": "Automation stitches: triggers and actions (email, webhook, CLI script, quarantine)",
  "objectives": [
   "Students will be able to distinguish triggers from actions in an automation stitch.",
   "Students will be able to select the correct trigger and action for a described scenario.",
   "Students will be able to explain how the quarantine action contains a compromised host.",
   "Students will be able to justify a stitch over scheduled reports or syslog forwarding for immediate response."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to name 'if this, then that' automations they use at home or on their phones. List a few on the board."
   ],
   [
    12,
    "Teach",
    "Introduce stitches as trigger plus actions. Sort example triggers (configuration change, failover, conserve mode, compromised host, schedule, incoming webhook) and actions (email, webhook, CLI script, quarantine) into two columns. Explain chaining and testing."
   ],
   [
    18,
    "Activity",
    "Run the Build-a-Stitch card match (see activity) in small groups."
   ],
   [
    5,
    "Discuss",
    "Debrief the designs and talk about the risks of automatic actions such as quarantine or CLI scripts."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of a smart home rule like 'if the front door opens after midnight, turn on the lights and text me'. Which part is the event, and which parts are the responses?",
  "activity": {
   "title": "Build-a-Stitch",
   "materials": "Printed trigger cards, printed action cards, printed request cards from fictional managers, sticky notes, whiteboard.",
   "steps": [
    "Give each group a deck of trigger cards and action cards, plus four request cards, for example 'Tell me instantly if anyone changes the config', 'Cut off any infected laptop automatically', 'Open a ticket when the cluster fails over'.",
    "Groups build a stitch for each request by laying out one trigger card followed by action cards in order.",
    "Groups write one sentence per stitch on a sticky note explaining why this beats a scheduled report or syslog forwarding.",
    "Groups swap designs with another group to review, then the teacher presents model answers."
   ]
  },
  "discussion": [
   "What could go wrong with an automatic quarantine or CLI script action, and how would you limit that risk?",
   "Which events in your organization would deserve an immediate stitch, and which are fine in a daily report?"
  ],
  "exit": [
   [
    "Name the two parts of an automation stitch.",
    "A trigger and one or more actions."
   ],
   [
    "A manager wants an immediate email whenever the configuration changes. What do you build?",
    "A stitch with a configuration change trigger and an email action."
   ],
   [
    "Which action isolates a compromised host?",
    "The quarantine action."
   ]
  ],
  "differentiation": [
   "Support: Color-code trigger cards and action cards differently so students can see the two categories at a glance.",
   "Extend: Ask fast finishers to design a stitch that chains a quarantine, a delay, and a webhook, and explain why order matters."
  ]
 },
 {
  "t": "Logging: log types (traffic, event, security), severity, memory/disk/FortiAnalyzer/FortiGate Cloud/syslog, log allowed traffic",
  "objectives": [
   "Students will be able to classify a described event as a traffic, event or security log.",
   "Students will be able to order the FortiOS severity levels and explain how severity filtering affects volume.",
   "Students will be able to compare memory, disk and remote log destinations for persistence.",
   "Students will be able to choose the correct Log allowed traffic setting for a given requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: if you had to prove what happened in a building last Friday, which records would you check? List answers and group them into visitors, maintenance and incidents."
   ],
   [
    12,
    "Teach",
    "Map the three groups to traffic, event and security logs. Write the severity order on the board. Draw the destinations with a lightning bolt over memory to show it is wiped on reboot. Explain Log allowed traffic options and implicit deny logging."
   ],
   [
    18,
    "Activity",
    "Run the Which Log, Where card sort (see activity) in pairs."
   ],
   [
    5,
    "Discuss",
    "Debrief the scenarios where logs were missing and what configuration would have preserved them."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "An auditor asks for proof of every connection a laptop made last Friday. Write down where you would look and what could make the record missing.",
  "activity": {
   "title": "Which Log, Where",
   "materials": "Printed event cards, a printed three-column sheet (Traffic, Event, Security), printed configuration cards describing log destinations and policy settings, pens.",
   "steps": [
    "Pairs sort 12 event cards into Traffic, Event or Security, for example 'Antivirus blocked a download', 'Admin jlee changed policy 7', 'Laptop connected to file server on port 445', 'HA failover occurred'.",
    "Pairs then read configuration cards, such as 'Diskless unit, memory logging only, rebooted yesterday' or 'Policy set to Security Events', and decide whether a given record would still exist.",
    "For each missing record, pairs write the configuration change that would have preserved it.",
    "The teacher reviews answers and highlights the memory wipe and Security Events gap."
   ]
  },
  "discussion": [
   "What are the trade-offs between logging All Sessions on every policy and logging only Security Events?",
   "Why is it valuable to keep a copy of logs off the FortiGate itself, beyond surviving reboots?"
  ],
  "exit": [
   [
    "Which log type records an admin configuration change?",
    "The event log."
   ],
   [
    "Why are memory logs unsuitable for investigations a week later?",
    "They are cleared on every reboot and the buffer is small, so history is lost."
   ],
   [
    "Which Log allowed traffic setting records every accepted session?",
    "All Sessions."
   ]
  ],
  "differentiation": [
   "Support: Give students a 'who acted?' prompt card: policy acted means traffic log, system acted means event log, security profile acted means security log.",
   "Extend: Ask fast finishers to design a logging plan for a diskless branch that balances volume and investigation needs using severity filters and two remote destinations."
  ]
 },
 {
  "t": "FortiGate-VM and cloud deployments: VM licensing, public cloud images, cloud-native firewall concepts",
  "objectives": [
   "Students will be able to explain how FortiGate-VM licensing caps vCPU use and why extra vCPUs do not add capacity.",
   "Students will be able to compare BYOL and PAYG marketplace licensing for a given scenario.",
   "Students will be able to describe how cloud route tables steer traffic to a FortiGate-VM.",
   "Students will be able to explain how cloud HA and SDN connectors differ from appliance HA and static address objects."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: what is the difference between owning a car and renting one by the hour? When does each make sense? Link to BYOL and PAYG."
   ],
   [
    12,
    "Teach",
    "Explain FortiGate-VM licensing with the vCPU cap, the evaluation license's shape, BYOL versus PAYG, cloud NICs and route tables, cloud HA through SDN connectors, and dynamic address objects."
   ],
   [
    18,
    "Activity",
    "Run the Whiteboard a Cloud Firewall design activity (see activity) in groups."
   ],
   [
    5,
    "Discuss",
    "Groups present their designs; the class checks for missing route tables or incorrect HA assumptions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You need a car for one weekend and another for the next five years. Would you rent or buy each, and why?",
  "activity": {
   "title": "Whiteboard a Cloud Firewall",
   "materials": "Whiteboard or large paper per group, markers, printed requirement cards.",
   "steps": [
    "Give each group a requirement card, for example 'Six-week project, servers scale often', 'Five-year production app, steady load', 'Must survive loss of one firewall instance'.",
    "Groups draw a virtual network with a public subnet, a private application subnet and a FortiGate-VM with two interfaces, and draw arrows showing which route tables point to the FortiGate.",
    "Groups label their licensing choice (BYOL or PAYG) and, where required, show how HA would work with an SDN connector or load balancer.",
    "Groups add a dynamic address object based on tags and explain how it covers new servers; the teacher reviews each design for route table and HA accuracy."
   ]
  },
  "discussion": [
   "What are the financial and operational trade-offs between BYOL and PAYG over the lifetime of a deployment?",
   "Why do dynamic address objects matter more in the cloud than on premises?"
  ],
  "exit": [
   [
    "A FortiGate-VM is licensed for 2 vCPUs but given 8. What happens to throughput?",
    "Nothing improves; FortiOS uses only the licensed 2 vCPUs."
   ],
   [
    "Which cloud licensing model bills the FortiGate license by the hour?",
    "PAYG (pay as you go, on-demand)."
   ],
   [
    "How does cloud HA move traffic to the new primary instead of using shared MACs?",
    "Through SDN connector API calls that update route tables or move public IPs, or by using cloud load balancers."
   ]
  ],
  "differentiation": [
   "Support: Provide a pre-drawn virtual network template with blanks for the route table next hop and licensing model.",
   "Extend: Ask fast finishers to compare FortiGate-VM in the cloud with FortiGate CNF and list what the customer manages in each."
  ]
 },
 {
  "t": "Diagnostics: `get system performance status`, `diagnose sys top`, conserve mode and av-failopen, `diagnose debug flow`, `diagnose sniffer packet`",
  "objectives": [
   "Students will be able to match each diagnostic command to the troubleshooting question it answers.",
   "Students will be able to explain conserve mode and compare the pass, off and one-shot av-failopen options.",
   "Students will be able to sequence the commands for a debug flow trace and identify why no output appears.",
   "Students will be able to interpret key debug flow lines, including the implicit deny message."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: when a computer feels slow, what do you check first, and how? Connect their answers to performance status and sys top."
   ],
   [
    12,
    "Teach",
    "Present the five tools as answers to five questions: how loaded, which process, what happens under memory pressure, why this session, are packets arriving. Explain conserve mode thresholds and the av-failopen options. Write the debug flow sequence on the board and show sample output lines."
   ],
   [
    18,
    "Activity",
    "Run the Command Match and Trace Reading pair activity (see activity)."
   ],
   [
    5,
    "Discuss",
    "Review the trace excerpts and discuss when to choose availability versus security with av-failopen."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your phone suddenly feels slow and hot. Write down two things you would check and what each would tell you.",
  "activity": {
   "title": "Command Match and Trace Reading",
   "materials": "Printed symptom cards, printed command cards, a printed set of short teacher-written debug flow excerpts (one ending in 'Denied by forward policy check (policy 0)', one showing 'Allowed by Policy-5'), pens.",
   "steps": [
    "Pairs match 8 symptom cards to command cards, for example 'Need current CPU and memory load' to `get system performance status` and 'Need to see if packets arrive on port2' to `diagnose sniffer packet`.",
    "Pairs put the shuffled debug flow command cards in the correct order and circle the command most often forgotten.",
    "Pairs read each trace excerpt and write the verdict: which policy matched or why the traffic was dropped.",
    "Pairs choose an av-failopen value for two scenario cards (a hospital that prioritizes scanning, a retail site that prioritizes uptime) and justify it; the teacher reviews answers."
   ]
  },
  "discussion": [
   "When would you choose av-failopen pass over off, and who in the organization should make that decision?",
   "Why should debugging be disabled after troubleshooting, and what risks come from leaving it running?"
  ],
  "exit": [
   [
    "Which command shows live CPU, memory and session load?",
    "`get system performance status`."
   ],
   [
    "What does av-failopen one-shot do?",
    "It bypasses AV scanning when conserve mode starts and keeps bypassing it until an admin changes the setting, even after memory recovers."
   ],
   [
    "A debug flow shows no output. What command is most likely missing?",
    "`diagnose debug enable`."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page cheat sheet that lists each command next to its question, and let students use it during the matching step.",
   "Extend: Ask fast finishers to explain how they would distinguish a routing problem from a policy problem using debug flow output and the sniffer."
  ]
 },
 {
  "t": "Firewall policy matching: incoming/outgoing interface, source (address, user, ISDB), destination, service, schedule; top-down first match; implicit deny (policy 0)",
  "objectives": [
   "Students will be able to list the criteria a FortiGate uses to match a session to a firewall policy.",
   "Students will be able to apply top-down first-match evaluation to predict which policy a session hits.",
   "Students will be able to explain the implicit deny (policy 0), its default logging behavior and how it appears in debug flow.",
   "Students will be able to diagnose and fix a policy order problem."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students how a bouncer with a guest list decides who gets in, and what happens if the list has 'no one in sneakers' above 'VIP: Alex (wears sneakers)'."
   ],
   [
    12,
    "Teach",
    "List the matching criteria on the board. Explain top-down first match, why ID is only a label, why profiles do not affect matching, and the implicit deny with its log default and debug flow message."
   ],
   [
    18,
    "Activity",
    "Run the Human Firewall role-play (see activity)."
   ],
   [
    5,
    "Discuss",
    "Debrief each packet card that hit the wrong policy and how reordering fixed it."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A guest list reads, from the top: 'No one wearing sneakers', then 'VIP: Alex'. Alex arrives wearing sneakers. Does Alex get in? Why?",
  "activity": {
   "title": "Human Firewall",
   "materials": "Printed policy cards large enough to tape on the whiteboard in order, printed packet cards (incoming interface, outgoing interface, source, destination, service, time), tape, markers.",
   "steps": [
    "Tape 5 policy cards on the whiteboard in a vertical list, including a broad deny above a specific allow and a policy 0 card at the bottom, with policy IDs that are deliberately out of numeric order.",
    "Students take turns drawing a packet card and walking it down the list, checking every criterion aloud until the first full match; the class records which policy matched.",
    "After several packets, groups identify any policy that can never be matched (shadowed) and propose a reorder.",
    "The teacher applies the reorder on the board and re-runs the problem packets to prove the fix."
   ]
  },
  "discussion": [
   "Why do you think FortiGate uses first match rather than best match, and what does that require from administrators?",
   "How would you keep a policy list with hundreds of rules understandable and free of shadowed policies?"
  ],
  "exit": [
   [
    "Name four criteria a session must match in a firewall policy.",
    "Any four of: incoming interface, outgoing interface, source, destination, service, schedule."
   ],
   [
    "Policy 40 sits above policy 2 in the list. Which is checked first?",
    "Policy 40, because list position decides order, not the ID."
   ],
   [
    "What does 'Denied by forward policy check (policy 0)' mean?",
    "No configured policy matched, so the implicit deny dropped the traffic."
   ]
  ],
  "differentiation": [
   "Support: Give students a checklist strip with the six criteria to tick off as they walk each packet down the list.",
   "Extend: Ask fast finishers to add a policy with an ISDB destination and a user group source, then write packet cards that test whether it matches."
  ]
 },
 {
  "t": "Address objects and groups, FQDN and geography objects, Internet Service Database (ISDB) entries",
  "objectives": [
   "Students will be able to describe the purpose of address objects, address groups, FQDN objects, geography objects and ISDB entries.",
   "Students will be able to compare the scope and limitations of FQDN, geography and ISDB objects.",
   "Students will be able to select the most appropriate object type for a given policy scenario and justify the choice."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the whiteboard without judging them yet."
   ],
   [
    15,
    "Teach",
    "Walk through each object type with a simple example on the board: a host and subnet address object, a group, an FQDN, a country, and an ISDB entry. Stress the narrowest-object rule and why an FQDN misses most of a large service."
   ],
   [
    15,
    "Activity",
    "Run the object-matching card sort in pairs, then have each pair defend one choice to the class."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the choices to maintenance effort and security risk."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your company needs to allow a cloud email service whose IP addresses change every few weeks. How would you write a firewall rule that does not break each time they change?",
  "activity": {
   "title": "Pick the right object",
   "materials": "Printed scenario cards (about 10), printed object-type cards (address, group, FQDN, geography, ISDB), whiteboard.",
   "steps": [
    "Give each pair a set of scenario cards, such as 'block inbound traffic from a country with no customers', 'allow access to one partner host whose IP changes', 'allow Microsoft 365', 'reference all three branch LANs in one rule'.",
    "Pairs place the best object-type card on each scenario and write a one-line reason.",
    "For two scenarios, pairs also write which wrong object a careless admin might pick and what would break.",
    "Each pair presents one card; the class votes and the teacher confirms the answer, correcting any FQDN-versus-ISDB confusion."
   ]
  },
  "discussion": [
   "Why might an organization prefer many small address objects grouped together rather than one large range object?",
   "What risks come with blocking or allowing traffic by country?"
  ],
  "exit": [
   [
    "Which object type should you use to allow Microsoft 365 without tracking its addresses?",
    "An ISDB entry, because FortiGuard keeps the service's addresses and ports current."
   ],
   [
    "Why is a single FQDN object a weak choice for a large cloud service?",
    "It covers only the addresses that one name resolves to, missing the service's other hostnames and endpoints."
   ],
   [
    "What happens to policies when you add a subnet to an address group they reference?",
    "Every policy using the group immediately includes the new subnet."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page chart listing each object type with one example and one limitation, and let them use it during the card sort.",
   "Extend: Ask fast finishers to design the objects for a small company with two branches, a DMZ web server and Microsoft 365, then explain which objects belong in groups."
  ]
 },
 {
  "t": "Policy logging, policy lookup tool, policy ID vs sequence, schedules",
  "objectives": [
   "Students will be able to explain the difference between the Security Events and All Sessions logging options and how to log implicit deny traffic.",
   "Students will be able to distinguish policy ID from sequence and determine which policy matches based on list order.",
   "Students will be able to describe how the policy lookup tool is used to verify policy matching.",
   "Students will be able to choose between a recurring and a one-time schedule for a time-based requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let students argue briefly about which rule wins."
   ],
   [
    15,
    "Teach",
    "Project a sample policy list with ID and sequence columns. Show how moving a policy changes sequence but not ID, explain the three logging options, demo or describe the policy lookup tool fields, and contrast recurring and one-time schedules."
   ],
   [
    15,
    "Activity",
    "Run the human policy list activity, then switch roles once."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about logging volume and schedules."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions in writing."
   ]
  ],
  "warmup": "A firewall has policy 3 that blocks a website and policy 15 that allows it. Which one wins? What extra information do you need before you can answer?",
  "activity": {
   "title": "Human policy list",
   "materials": "Large index cards, marker pens, sticky notes, whiteboard.",
   "steps": [
    "Write five policies on index cards, each with a policy ID, a short match condition, an action, a logging setting and a schedule (for example 'ID 22, LAN to any, streaming, allow, All Sessions, weekdays 12:00-13:00').",
    "Five students hold the cards at the front in a shuffled sequence. The teacher writes the sequence numbers on sticky notes and attaches them.",
    "The rest of the class acts as the policy lookup tool: the teacher reads a hypothetical session with a time of day, and students decide which card matches first and whether a log entry would be written.",
    "Reorder two students and repeat, pointing out that IDs stayed the same while the result changed."
   ]
  },
  "discussion": [
   "Why might an organization avoid logging All Sessions on every policy all the time?",
   "What could go wrong if a temporary contractor policy used a recurring schedule instead of a one-time schedule?"
  ],
  "exit": [
   [
    "Policy 40 is above policy 2 in the list and both match a session. Which applies?",
    "Policy 40, because sequence, not ID, determines matching order."
   ],
   [
    "A policy logs Security Events. Will an ordinary allowed web session appear in the log?",
    "No; only sessions a security profile acted on are logged. All Sessions is needed."
   ],
   [
    "What does the policy lookup tool need as input, and what does it return?",
    "Session parameters such as source interface, protocol, source and destination address and port; it returns the policy that would match."
   ]
  ],
  "differentiation": [
   "Support: Provide a printed policy list with sequence numbers already highlighted and a small flowchart: top of list, check match, check schedule, first match wins.",
   "Extend: Ask students to write a short troubleshooting runbook for 'user reached a blocked site' that uses the lookup tool, logging changes and schedule checks in order."
  ]
 },
 {
  "t": "Source NAT: outgoing interface address, IP pools (overload, one-to-one, fixed port range, port block allocation)",
  "objectives": [
   "Students will be able to explain how source NAT and port address translation let many private hosts share public addresses.",
   "Students will be able to compare overload, one-to-one, fixed port range and port block allocation IP pools.",
   "Students will be able to select the appropriate SNAT method for a scenario based on public IP count, user count and logging needs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch a home router on the board as students answer."
   ],
   [
    12,
    "Teach",
    "Draw a translation table on the board showing internal IP and port mapped to public IP and port. Introduce interface-address NAT, then each pool type, highlighting the one-to-one user cap and the logging benefit of fixed port range and PBA."
   ],
   [
    18,
    "Activity",
    "Run the NAT table simulation in groups of four."
   ],
   [
    5,
    "Discuss",
    "Ask the discussion questions and connect answers to compliance and capacity."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your home has many devices but your internet provider gives you one public address. How do replies from websites find the right device?",
  "activity": {
   "title": "NAT table simulation",
   "materials": "Printed blank translation tables, sticky notes representing hosts, whiteboard, markers.",
   "steps": [
    "Split the class into groups of four. Each group gets a pool type card (overload with 2 public IPs, one-to-one with 2 public IPs, port block allocation with 1 public IP and blocks of 4 ports).",
    "The teacher calls out hosts starting sessions one by one (for example 'Host A opens 2 sessions, Host B opens 1, Host C opens 1').",
    "Groups fill in their translation table for each session, marking when a session fails because no translation is available.",
    "Groups report how many hosts succeeded and how many log lines they would need to trace activity, then compare results across pool types."
   ]
  },
  "discussion": [
   "Why might an internet provider prefer port block allocation over overload, even though both share addresses?",
   "When is the user cap of a one-to-one pool acceptable, and when does it become a problem?"
  ],
  "exit": [
   [
    "A site has three public IPs and 500 users. Which pool type fits?",
    "Overload, because it shares the three addresses among many users with port translation."
   ],
   [
    "Why can a one-to-one pool of four addresses serve only four hosts at once?",
    "It maps each host to its own public address without port translation."
   ],
   [
    "What does port block allocation record instead of every session?",
    "The assignment of a port block to an internal host, which keeps logs small while allowing traceability."
   ]
  ],
  "differentiation": [
   "Support: Give students a pre-filled example translation table for interface-address NAT so they can model their own tables on it.",
   "Extend: Ask students to calculate how many hosts a fixed port range pool could serve if each host gets a set number of ports, and discuss what happens when a host needs more."
  ]
 },
 {
  "t": "Central SNAT table and when to use it",
  "objectives": [
   "Students will be able to explain how central SNAT differs from per-policy NAT.",
   "Students will be able to describe how central SNAT entries are matched and what happens when no entry matches.",
   "Students will be able to identify the consequences of enabling central NAT, including the change in how VIPs are referenced.",
   "Students will be able to recommend whether an environment should use central SNAT."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the board."
   ],
   [
    15,
    "Teach",
    "Draw two diagrams side by side: per-policy NAT with NAT settings on each policy, and central NAT with a separate SNAT table and a DNAT and Virtual IPs table. Walk through top-down matching, the no-match result, and the VIP reference change."
   ],
   [
    15,
    "Activity",
    "Run the migration planning exercise in small groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore when central SNAT is worth the change."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you had 100 firewall rules and each one set its own NAT, what problems might you run into when trying to understand or change NAT behavior?",
  "activity": {
   "title": "Plan the central NAT migration",
   "materials": "Printed list of six sample firewall policies with their per-policy NAT settings (interface address, two different pools, one VIP), blank SNAT table worksheets, whiteboard.",
   "steps": [
    "In groups of three, students read the six sample policies and note each one's current NAT behavior.",
    "Groups write the central SNAT table entries needed to reproduce that behavior, in the correct top-down order, placing specific entries above general ones.",
    "Groups identify which policy referencing a VIP must change and what its new destination will be.",
    "Each group swaps worksheets with another and checks for a missing entry that would leave traffic untranslated."
   ]
  },
  "discussion": [
   "What kinds of organizations benefit most from central SNAT, and which are better off with per-policy NAT?",
   "How would you reduce the risk of an outage when switching to central NAT?"
  ],
  "exit": [
   [
    "What happens to outbound traffic if central NAT is enabled and no SNAT entry matches it?",
    "It is not source-translated, so it leaves with a private address and typically fails."
   ],
   [
    "How are central SNAT entries evaluated?",
    "Top-down; the first matching entry decides the translation."
   ],
   [
    "Is destination NAT handled by the central SNAT table?",
    "No; DNAT still uses VIPs, applied centrally, and policies reference the mapped address."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed SNAT table with the general LAN to WAN entry filled in, so students only need to add the specific entries.",
   "Extend: Ask students to design an SNAT table for a site with two WAN links where one subnet must always use a specific pool on the second link, and explain the order."
  ]
 },
 {
  "t": "Destination NAT with VIPs: static NAT, port forwarding, VIP groups",
  "objectives": [
   "Students will be able to explain how a VIP performs destination NAT and how it is referenced in an inbound policy.",
   "Students will be able to compare static NAT VIPs and port-forwarding VIPs.",
   "Students will be able to design a VIP and VIP group configuration to publish multiple internal servers on one public address."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect ideas."
   ],
   [
    12,
    "Teach",
    "Draw the internet, the FortiGate and a DMZ server. Trace an inbound packet, showing the destination rewritten by the VIP and reversed on the reply. Contrast static NAT and port forwarding, and explain VIP groups and why service objects cannot translate ports."
   ],
   [
    18,
    "Activity",
    "Run the publish-the-servers whiteboard design in pairs."
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
  "warmup": "Your web server has a private address that cannot be reached from the internet. How could visitors still reach it using your public address?",
  "activity": {
   "title": "Publish the servers",
   "materials": "Whiteboard or large paper per pair, markers, a printed scenario card listing one public IP and three internal servers with their listening ports.",
   "steps": [
    "Each pair reads the scenario: one public IP, a web server on 443, a second web app that listens on 8080 but must be reached externally on 8443, and a mail server on 25.",
    "Pairs design the VIPs, writing external IP, external port, mapped IP and mapped port for each, and decide whether each is static NAT or port forwarding.",
    "Pairs draw the inbound policy, including source and destination interfaces, destination (VIP group), services and security profiles.",
    "Two pairs present; the class checks for common errors such as using the private IP as the destination or relying on a service object to change ports."
   ]
  },
  "discussion": [
   "Why should an inbound VIP policy allow only the specific services the server uses?",
   "What are the trade-offs of publishing a service on a nonstandard external port?"
  ],
  "exit": [
   [
    "What is the destination of an inbound policy that publishes a server in default NAT mode?",
    "The VIP (or VIP group), not the server's private IP."
   ],
   [
    "Which VIP type lets external port 8443 reach internal port 443?",
    "A port-forwarding VIP."
   ],
   [
    "What does a VIP group let you do?",
    "Reference several VIPs as the destination of a single inbound policy."
   ]
  ],
  "differentiation": [
   "Support: Give students a template table with columns for external IP, external port, mapped IP, mapped port and VIP type, plus one completed example row.",
   "Extend: Ask students to explain how the design would differ if the FortiGate used central NAT, including what the inbound policy's destination would become."
  ]
 },
 {
  "t": "Firewall authentication: local users, LDAP (regular bind), RADIUS and TACACS+ servers, user groups",
  "objectives": [
   "Students will be able to compare local users, LDAP, RADIUS and TACACS+ as FortiGate authentication sources.",
   "Students will be able to explain why regular bind is required for Active Directory group lookups.",
   "Students will be able to configure, on paper, a user group with a group match and attach it to a policy."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect answers to identity versus IP address."
   ],
   [
    15,
    "Teach",
    "Draw the chain: authentication source, user group, policy. Explain local users, LDAP bind types, RADIUS and TACACS+, and show a sample group match DN."
   ],
   [
    15,
    "Activity",
    "Run the identity chain card sort in groups."
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
  "warmup": "If two people share the same computer at different times, why might a firewall rule based on IP address not be good enough?",
  "activity": {
   "title": "Build the identity chain",
   "materials": "Printed cards for authentication sources (local user, LDAP anonymous bind, LDAP regular bind, LDAP simple bind, RADIUS, TACACS+), user group cards, policy cards and requirement cards; tape; whiteboard.",
   "steps": [
    "Give each group four requirement cards, such as 'only AD Finance members may reach payroll' or 'two lab accounts for a weekend workshop'.",
    "Groups build a chain on the whiteboard for each requirement: source card, then a user group card with any group match written on it, then the policy card.",
    "Groups place any cards that would fail (such as anonymous bind for AD) in a 'would break' column with a written reason.",
    "The teacher walks the room, then reviews one chain per group with the class."
   ]
  },
  "discussion": [
   "What are the security risks of the service account used for LDAP regular bind, and how could you limit them?",
   "When might local users still be the right choice in a large organization?"
  ],
  "exit": [
   [
    "Why does LDAP anonymous bind usually fail for AD group policies?",
    "AD rejects anonymous searches, so the FortiGate cannot read group memberships; regular bind is needed."
   ],
   [
    "What object goes into a policy's source to require authentication?",
    "A user group."
   ],
   [
    "Which AAA protocol is commonly used for device administration?",
    "TACACS+."
   ]
  ],
  "differentiation": [
   "Support: Give students a labeled diagram of the authentication chain with blanks to fill in, and a glossary card for DN, bind and AAA.",
   "Extend: Ask students to explain how they would troubleshoot a user who authenticates successfully but is still denied by the policy, listing each check in order."
  ]
 },
 {
  "t": "Active (captive portal) vs passive authentication, authentication timeouts, allowing DNS before login",
  "objectives": [
   "Students will be able to distinguish active (captive portal) authentication from passive authentication such as FSSO.",
   "Students will be able to explain the difference between idle and hard authentication timeouts.",
   "Students will be able to diagnose a captive-portal deadlock and correct the policy order by allowing DNS first."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about hotel Wi-Fi login pages."
   ],
   [
    12,
    "Teach",
    "Contrast active and passive authentication with two diagrams. Explain idle, hard and new-session timeouts. Then step through a browser's first actions on a new network to reveal why DNS must be allowed before the portal."
   ],
   [
    18,
    "Activity",
    "Run the role-play of the captive-portal deadlock, then fix it."
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
  "warmup": "Think about connecting to hotel or airport Wi-Fi. What happens before the login page appears, and what do you think the network has to allow for that page to show up?",
  "activity": {
   "title": "The portal that never appears",
   "materials": "Role cards (Browser, DNS server, FortiGate authentication policy, FortiGate DNS policy, Website), a printed policy list, whiteboard.",
   "steps": [
    "Assign students to roles. The Browser wants to visit a website and must first ask the DNS server for its address.",
    "Round one: the FortiGate has only the authentication policy. Students act out the DNS query being blocked, and the Browser never reaches the portal.",
    "Round two: add the FortiGate DNS policy student above the authentication policy. Students act out the DNS reply, the HTTP attempt, and the redirect to the login page.",
    "In pairs, students write the corrected policy list with order, services and user requirements, then compare with another pair."
   ]
  },
  "discussion": [
   "When would an organization choose active authentication even though passive authentication is more convenient for users?",
   "How should timeouts differ between a guest network and a staff network, and why?"
  ],
  "exit": [
   [
    "Users never see the captive portal and DNS is only allowed by the authentication policy. What is the fix?",
    "Add a DNS-allow policy with no user requirement above the authentication policy."
   ],
   [
    "Which authentication type uses FSSO?",
    "Passive authentication."
   ],
   [
    "A user is logged out exactly eight hours after login even though they were active. Which timeout type is in use?",
    "A hard timeout."
   ]
  ],
  "differentiation": [
   "Support: Give students a sequence strip showing a browser's steps on a new network (DNS lookup, HTTP request, redirect, login) to arrange in order before the role-play.",
   "Extend: Ask students to design a combined approach that uses passive authentication for corporate laptops and a captive portal for everyone else, including policy order."
  ]
 },
 {
  "t": "FSSO: collector agent, DC agent mode vs polling mode, group filters, `diagnose debug authd fsso list`",
  "objectives": [
   "Students will be able to describe the roles of the collector agent and the DC agent in FSSO.",
   "Students will be able to compare DC agent mode and polling mode and choose one for a given constraint.",
   "Students will be able to explain how group filters affect which groups reach the FortiGate.",
   "Students will be able to interpret output from diagnose debug authd fsso list to locate an FSSO problem."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and link answers to passive authentication."
   ],
   [
    13,
    "Teach",
    "Draw domain controllers, the collector agent and the FortiGate. Show DC agent mode with arrows pushing events, then polling mode with the collector reading logs. Explain the group filter and walk through sample diagnose output."
   ],
   [
    17,
    "Activity",
    "Run the FSSO troubleshooting stations in pairs."
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
  "warmup": "When you sign in to your work or school computer, how might a firewall find out it is you without asking you to log in again?",
  "activity": {
   "title": "FSSO troubleshooting stations",
   "materials": "Four printed station cards, each with a short scenario and a mock `diagnose debug authd fsso list` output; answer sheets; whiteboard.",
   "steps": [
    "Set up four stations: user missing from the list entirely; user present with wrong groups; user present with correct groups but still denied; Windows team refuses DC agents.",
    "Pairs rotate every four minutes, reading the mock output and writing the likely cause and next step for each station.",
    "At the station about DC agents, pairs must also name the mode they would recommend and one trade-off.",
    "The teacher reviews each station with the class, emphasizing collection versus group filter versus policy problems."
   ]
  },
  "discussion": [
   "Why might a Windows team resist installing agents on domain controllers, and how does that shape the FSSO design?",
   "What problems could arise when many users share one IP address, and why does FSSO struggle there?"
  ],
  "exit": [
   [
    "Which FSSO mode requires no software on domain controllers?",
    "Polling mode (collector polling or agentless polling on the FortiGate)."
   ],
   [
    "A user appears in diagnose debug authd fsso list but lacks a new group. What should you check?",
    "The group filter, to make sure the new group is selected and reported."
   ],
   [
    "What does the collector agent send to the FortiGate?",
    "User-to-IP-to-group mappings learned from domain logons."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled FSSO diagram and a three-step checklist (user present, group present, policy correct) to use at each station.",
   "Extend: Ask students to write a short recommendation memo comparing DC agent mode and polling mode for a large domain with many DCs, including risks of each."
  ]
 },
 {
  "t": "Two-factor authentication with FortiToken",
  "objectives": [
   "Students will be able to explain how two-factor authentication with a TOTP token reduces the risk of account takeover.",
   "Students will be able to compare FortiToken hardware and FortiToken Mobile.",
   "Students will be able to describe the steps to assign a FortiToken to a user or administrator account."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list examples of two-factor in daily life."
   ],
   [
    12,
    "Teach",
    "Explain the factors of authentication, how a TOTP code is generated from a shared seed and time, the two FortiToken forms, and the per-user assignment steps. Address the common distractors."
   ],
   [
    18,
    "Activity",
    "Run the token rollout role-play in groups of three."
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
  "warmup": "Where in your own life do you already use two different kinds of proof to get into something? What would an attacker need to steal to get past it?",
  "activity": {
   "title": "Token rollout role-play",
   "materials": "Printed role cards (Admin, User, Help desk), printed scenario cards, sticky notes, whiteboard. Students may optionally view a free TOTP demonstration in a browser.",
   "steps": [
    "In groups of three, students take roles. The Admin must roll out FortiToken to a user and an administrator account and lists the steps in order on sticky notes.",
    "The User receives an activation step and logs in with password plus code; the group writes what the user sees at each step.",
    "Scenario twist: the User loses their phone. The Help desk writes the process to verify identity, unassign the old token and assign a new one.",
    "Groups compare their step lists on the whiteboard and the teacher corrects any steps that rely on admin profiles or password rules."
   ]
  },
  "discussion": [
   "Two-factor authentication blocks stolen passwords, but what kinds of attacks can still succeed against users with tokens?",
   "Why is it especially important to require a second factor for administrator accounts?"
  ],
  "exit": [
   [
    "Where do you enable FortiToken two-factor for a firewall user?",
    "On that user's account, by enabling two-factor and assigning a specific token."
   ],
   [
    "What makes a captured FortiToken code useless soon after?",
    "It is a time-based one-time password that changes every 30 or 60 seconds."
   ],
   [
    "Name the two forms of FortiToken.",
    "FortiToken hardware (a keyfob) and FortiToken Mobile (a smartphone app)."
   ]
  ],
  "differentiation": [
   "Support: Give students a three-box diagram of the factors (know, have, are) with examples, and a numbered list of the assignment steps to reorder.",
   "Extend: Ask students to write a short policy for token loss, replacement and offboarding, including how to verify identity before reassigning a token."
  ]
 },
 {
  "t": "SSL/SSH inspection: certificate inspection vs deep inspection, CA trust, exemptions, certificate pinning, untrusted certificate handling",
  "objectives": [
   "Students will be able to compare certificate inspection and deep inspection, including what each can and cannot see.",
   "Students will be able to explain why clients must trust the FortiGate CA under deep inspection and how that trust is distributed.",
   "Students will be able to justify inspection exemptions for privacy-sensitive sites and certificate-pinned applications.",
   "Students will be able to choose an appropriate action for untrusted server certificates."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and gather opinions on privacy versus security."
   ],
   [
    15,
    "Teach",
    "Draw the TLS path with and without deep inspection, showing two TLS sessions and the re-signed certificate. Show a browser certificate viewer on the projector to point out the issuer field. Explain exemptions, pinning and untrusted certificate handling."
   ],
   [
    15,
    "Activity",
    "Run the inspect or exempt card sort in small groups."
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
  "warmup": "If a company firewall could read everything inside your encrypted web traffic at work, what would it protect against, and what would worry you?",
  "activity": {
   "title": "Inspect or exempt",
   "materials": "Printed traffic cards (for example a file download from an unknown site, an online banking session, a pinned mobile app, a health portal, a cloud storage upload, a site with an expired certificate), three labeled zones on the whiteboard, sticky notes.",
   "steps": [
    "Groups receive the traffic cards and three zones: Deep inspect, Exempt, Block or special handling.",
    "Groups place each card in a zone and write a one-sentence reason on a sticky note, naming the risk or constraint involved.",
    "For each card in Deep inspect, groups state what clients must trust for it to work without warnings.",
    "Groups compare placements; the teacher highlights pinned apps, privacy categories and untrusted certificates."
   ]
  },
  "discussion": [
   "How should an organization communicate to staff that encrypted traffic is being inspected, and why does that matter?",
   "Why might a guest network use certificate inspection even when the staff network uses deep inspection?"
  ],
  "exit": [
   [
    "Antivirus misses malware downloaded over HTTPS but catches it over HTTP. What should change?",
    "Switch the policy's SSL inspection profile from certificate inspection to deep inspection."
   ],
   [
    "What must clients trust for deep inspection to work without warnings?",
    "The FortiGate's signing CA certificate, distributed through GPO or MDM."
   ],
   [
    "How do you keep a certificate-pinned app working under deep inspection?",
    "Exempt its destinations from decryption."
   ]
  ],
  "differentiation": [
   "Support: Provide a simple two-column chart of what certificate inspection sees (SNI, certificate) versus what deep inspection sees (full content), to use during the card sort.",
   "Extend: Ask students to draft an SSL inspection rollout plan for a 500-person organization covering CA distribution, exemptions, pilot groups and user communication."
  ]
 },
 {
  "t": "Inspection modes: flow-based vs proxy-based, set per policy; profile-based vs policy-based NGFW mode",
  "objectives": [
   "Students will be able to compare flow-based and proxy-based inspection in terms of performance and features.",
   "Students will be able to state where the inspection mode is configured in profile-based NGFW mode.",
   "Students will be able to distinguish profile-based from policy-based NGFW mode.",
   "Students will be able to choose an inspection mode for a scenario requiring speed or features such as CDR."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about airport security lines."
   ],
   [
    12,
    "Teach",
    "Draw a two-by-two grid with flow and proxy on one axis and profile-based and policy-based on the other. Explain each engine and its trade-offs, then each rule style, stressing that the axes are independent and that inspection mode is per policy in profile-based mode."
   ],
   [
    18,
    "Activity",
    "Run the which-axis sorting game, then the scenario design."
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
  "warmup": "At an airport, some bags go straight through the scanner and others are pulled aside and opened. What are the trade-offs between the two approaches?",
  "activity": {
   "title": "Which axis is it",
   "materials": "Printed statement cards (about 12), a two-by-two grid drawn on the whiteboard, tape, printed scenario sheet.",
   "steps": [
    "Hand each group statement cards such as 'needs CDR', 'lowest latency', 'applications referenced directly in security policies', 'profiles attached to firewall policies', 'buffers the whole file'.",
    "Groups first decide whether each card is about the inspection engine or the rule style, then tape it to the correct side of the grid.",
    "Next, groups read a scenario with three policies (guest Wi-Fi, finance email, developer downloads) and choose flow or proxy for each with a reason.",
    "The class reviews any card placed on the wrong axis and the teacher explains the distinction again."
   ]
  },
  "discussion": [
   "Why might an organization accept lower throughput in exchange for proxy-based features on some policies?",
   "What might make a team prefer policy-based NGFW mode, and what would they need to plan for before switching?"
  ],
  "exit": [
   [
    "A policy must use content disarm and reconstruction. Which inspection mode does it need?",
    "Proxy-based."
   ],
   [
    "In profile-based NGFW mode, where do you choose flow or proxy?",
    "On each individual firewall policy."
   ],
   [
    "In policy-based NGFW mode, where are applications and URL categories referenced?",
    "Directly in security policies, with SSL inspection and NAT in separate policies."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference card with two short columns, Engine (flow, proxy) and Rule style (profile-based, policy-based), each with two key facts.",
   "Extend: Ask students to write a short recommendation for a branch office deciding between modes, considering throughput, required features and administrator familiarity."
  ]
 },
 {
  "t": "Web filtering: FortiGuard categories and actions (allow, monitor, warning, authenticate, block), static URL filter (exempt vs allow), rating errors, overrides",
  "objectives": [
   "Students will be able to describe the user experience of each FortiGuard category action: Allow, Monitor, Warning, Authenticate and Block.",
   "Students will be able to explain the evaluation order of the static URL filter and FortiGuard categories, and the difference between Exempt and Allow.",
   "Students will be able to configure rating error handling and explain its availability trade-off.",
   "Students will be able to recommend overrides for controlled, temporary exceptions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and note how students would handle the exception."
   ],
   [
    13,
    "Teach",
    "Draw the evaluation flow: request, static URL filter (Exempt exits, Allow continues), FortiGuard category action, decision. Describe each action from the user's point of view, then rating errors and overrides."
   ],
   [
    17,
    "Activity",
    "Run the web filter decision walk with request cards."
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
  "warmup": "Your school blocks all social media, but the principal needs the school's own social media page to load. How would you allow just that one page without opening the whole category?",
  "activity": {
   "title": "Web filter decision walk",
   "materials": "A printed web filter profile (category actions and a short static URL list with Exempt and Allow entries), printed request cards, a flowchart drawn on the whiteboard, sticky notes.",
   "steps": [
    "Groups receive the printed profile and eight request cards, such as a URL on the static list as Allow in a blocked category, a URL listed as Exempt, a site in a Warning category, and a lookup during a FortiGuard outage.",
    "For each card, groups walk the flowchart step by step and record the final result and what the user sees.",
    "Groups mark any card where the result surprised them and explain why on a sticky note.",
    "The class reviews the surprising cards together, focusing on Exempt versus Allow and rating errors."
   ]
  },
  "discussion": [
   "When might an organization prefer Monitor or Warning instead of Block for a category?",
   "Is it better for a web filter to fail open or fail closed during a FortiGuard outage? What factors decide it?"
  ],
  "exit": [
   [
    "A URL is in the static URL filter as Allow, but its category is blocked. What happens?",
    "It is still blocked, because Allow passes the URL to the category check."
   ],
   [
    "Which category action lets the user click through and continue?",
    "Warning."
   ],
   [
    "Which setting keeps sites loading when FortiGuard cannot be reached?",
    "Allow websites when a rating error occurs."
   ]
  ],
  "differentiation": [
   "Support: Give students a printed flowchart with the two stages labeled and Exempt and Allow arrows drawn in, to trace each request.",
   "Extend: Ask students to design a web filter profile for a school with different needs for students, teachers and guests, including when to use overrides."
  ]
 },
 {
  "t": "DNS filtering and safe search",
  "objectives": [
   "Students will be able to explain how a FortiGate DNS filter rates and acts on domains at lookup time using FortiGuard categories.",
   "Students will be able to compare DNS filtering with web filtering in terms of decryption needs, protocol coverage and granularity.",
   "Students will be able to identify ways DNS filtering can be bypassed and the policy controls that reduce bypass.",
   "Students will be able to choose between DNS-based and web-filter-based safe search enforcement given an inspection mode."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to list every step that happens between typing a website name and the page appearing. Write their steps on the board and circle the DNS lookup as the first point where a firewall could intervene."
   ],
   [
    13,
    "Teach",
    "Explain the DNS filter flow: query arrives, FortiGuard rating, action (allow, monitor, block, redirect to portal). Stress that no decryption is needed and that every application uses DNS. Then cover limits (no URL paths, no file scanning, bypass via hard-coded IPs or outside resolvers) and the two safe search methods."
   ],
   [
    17,
    "Activity",
    "Run the Which Filter Catches It card sort in small groups (see activity). Visit each group and ask them to defend one card where they chose DNS filtering."
   ],
   [
    5,
    "Discuss",
    "Debrief disputed cards, especially those mentioning certificate inspection and safe search. Ask how they would stop students from using an outside resolver."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper before leaving."
   ]
  ],
  "warmup": "You type a school website into a browser and press Enter. Write down, in order, everything you think happens before the page appears. Where could a firewall step in first?",
  "activity": {
   "title": "Which Filter Catches It",
   "materials": "Printed scenario cards (one set per group of three), sticky notes in two colors, whiteboard divided into columns DNS filter, Web filter, Neither or Both.",
   "steps": [
    "Prepare 10 to 12 cards, for example: 'Block a malware C&C domain used by any app', 'Block one page on an allowed news site', 'Enforce safe search, no deep inspection available', 'Stop a laptop that connects to a raw IP address', 'Block gambling sites on a smart TV with no certificate support'.",
    "Groups place each card in a column on their desk and note the inspection mode each choice needs on a sticky note.",
    "Each group moves its three most confident cards to the class whiteboard and explains them in one sentence each.",
    "The teacher reviews the board, correcting placements and highlighting the cards where DNS filtering cannot help."
   ]
  },
  "discussion": [
   "Why might an organization prefer DNS filtering even if it already has deep inspection enabled for web traffic?",
   "What privacy trade-offs are involved when a school chooses between DNS filtering and decrypting student traffic?"
  ],
  "exit": [
   [
    "Why does DNS filtering not need SSL deep inspection?",
    "It acts on the domain name in the DNS query, which is visible before any encrypted session is established."
   ],
   [
    "Name one thing web filtering can do that DNS filtering cannot.",
    "Act on full URL paths (or page content with deep inspection), such as blocking one page on an otherwise allowed site."
   ],
   [
    "Safe search through URL rewriting fails under certificate inspection. What alternative works without decryption?",
    "DNS-based safe search enforcement in a DNS filter profile."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a simple diagram of the DNS lookup followed by the HTTPS connection, labeled with which filter sees which step, to use during the card sort.",
   "Extend: Ask fast finishers to design firewall policies that force all client DNS through approved resolvers and explain how each policy reduces DNS filter bypass."
  ]
 },
 {
  "t": "Application control: sensors, categories, application overrides, filter overrides, need for deep inspection",
  "objectives": [
   "Students will be able to explain why signature-based application control identifies applications that hop ports or tunnel over HTTPS.",
   "Students will be able to configure, on paper, a sensor using category actions, an application override and a filter override for a given requirement.",
   "Students will be able to determine when deep inspection is required for application control to enforce an in-app action.",
   "Students will be able to distinguish application control from web filtering in a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: if you block port 6881, have you blocked BitTorrent? Take a quick show of hands and record reasons on the board."
   ],
   [
    12,
    "Teach",
    "Explain sensors attached to policies, category actions, application overrides and filter overrides, using the Facebook games example. Draw the TLS handshake and show what certificate inspection sees (SNI, certificate) versus deep inspection (payload) to explain in-app control."
   ],
   [
    18,
    "Activity",
    "Pairs complete the Build the Sensor worksheet (see activity). Circulate and ask each pair which requirements need deep inspection and why."
   ],
   [
    5,
    "Discuss",
    "Compare answers to the hardest requirement, usually the upload block. Ask when they would choose a filter override over a list of application overrides."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a slip of paper."
   ]
  ],
  "warmup": "An app keeps working even after you block the port it usually uses. Write two reasons why that might happen.",
  "activity": {
   "title": "Build the Sensor",
   "materials": "Printed worksheet with six business requirements and a blank sensor table (columns: Category actions, Application overrides, Filter overrides, Inspection mode needed), pens, projector for the answer reveal.",
   "steps": [
    "Hand out requirements such as: block all P2P; allow Social Media but block games inside it; block uploads to a cloud storage app; block all highest-risk apps including future ones; monitor Video/Audio without blocking.",
    "Pairs fill in the sensor table, placing each requirement in the right column and naming the inspection mode it needs.",
    "Pairs swap worksheets with another pair and mark any entry they disagree with.",
    "The teacher projects a model answer and the class discusses each disagreement, focusing on overrides versus categories and certificate versus deep inspection."
   ]
  },
  "discussion": [
   "What are the business risks of blocking an entire application category instead of using targeted overrides?",
   "When might an organization accept only certificate inspection even though it limits application control?"
  ],
  "exit": [
   [
    "Why does blocking the P2P category stop BitTorrent when it changes ports?",
    "Application control recognizes the app by signature from its traffic pattern, not by port."
   ],
   [
    "What override lets you block Facebook games while Social Media stays allowed?",
    "An application override on the Facebook games signature."
   ],
   [
    "Application control identifies a cloud app but cannot block uploads to it. What is missing?",
    "Deep inspection on the policy, so signatures can see actions inside the encrypted session."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page flowchart: Is it a named single app? Use an application override. Is it a group by attribute? Use a filter override. Is it an action inside an encrypted app? Add deep inspection.",
   "Extend: Ask fast finishers to write a short policy proposal combining application control and web filtering for a company, explaining which requirement each profile covers and why."
  ]
 },
 {
  "t": "Antivirus: flow vs proxy scanning, signature databases, FortiSandbox/cloud sandbox, content disarm and reconstruction (proxy), grayware",
  "objectives": [
   "Students will be able to compare flow-based and proxy-based antivirus scanning in terms of buffering, latency and supported features.",
   "Students will be able to explain the different roles of signature databases and sandboxing in detecting known and unknown malware.",
   "Students will be able to identify content disarm and reconstruction as a proxy-only feature and describe what it does.",
   "Students will be able to predict whether an AV profile will detect a file given the protocol and SSL inspection mode."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students how they would decide if a package is safe to open: by its label, by testing it, or by removing anything dangerous? Map their answers to signatures, sandbox and CDR on the board."
   ],
   [
    13,
    "Teach",
    "Explain flow versus proxy AV with a timeline drawing: flow holds the last packet; proxy buffers the whole file. Cover signature databases, sandbox behavior analysis, CDR (proxy only) and grayware. Close with why HTTPS needs deep inspection for AV."
   ],
   [
    17,
    "Activity",
    "Small groups run the EICAR Prediction Lab on paper (see activity), predicting log outcomes for each combination. Circulate and probe their reasoning on the HTTPS rows."
   ],
   [
    5,
    "Discuss",
    "Reveal the answers and discuss surprises, especially certificate inspection rows and the CDR row in flow mode."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You receive a package from an unknown sender. List three different ways you could decide whether it is safe to open.",
  "activity": {
   "title": "EICAR Prediction Lab",
   "materials": "Printed prediction table with rows for each test (EICAR over HTTP in flow mode; EICAR over HTTPS with certificate inspection; EICAR over HTTPS with deep inspection; unknown macro document in flow mode with sandbox; same document in proxy mode with CDR), projector, optionally an instructor demo FortiGate or screenshots of AV logs.",
   "steps": [
    "Groups fill in, for each row, whether the file is detected, what the user experiences (incomplete download, replacement page, clean document) and what the log shows.",
    "Groups mark the one feature or setting that made the difference for each row.",
    "The teacher reveals the expected outcomes using screenshots or a live demo, row by row.",
    "Groups correct their tables and write one rule of thumb they learned at the bottom."
   ]
  },
  "discussion": [
   "When would you accept the extra latency of proxy-based inspection, and when would you not?",
   "Why might CDR be preferable to sandboxing for email attachments, and what might users complain about?"
  ],
  "exit": [
   [
    "Which AV inspection mode holds only the last packet until a verdict?",
    "Flow-based inspection."
   ],
   [
    "What catches never-before-seen malware that signatures miss?",
    "Sending files to a sandbox (FortiSandbox or a cloud sandbox) for behavior analysis."
   ],
   [
    "An AV profile does not detect EICAR over HTTPS. The policy uses certificate inspection. Why?",
    "Certificate inspection does not decrypt the payload, so AV cannot see the file; deep inspection is required."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column card listing flow-mode traits and proxy-mode traits, with CDR and replacement messages clearly placed in the proxy column.",
   "Extend: Ask fast finishers to design an AV strategy for a company with a busy main office and a high-risk email gateway, explaining which policies use flow, which use proxy, and where CDR and sandboxing apply."
  ]
 },
 {
  "t": "IPS: sensors and signature filters, rate-based signatures, botnet C&C blocking, IP exemptions, fail-open",
  "objectives": [
   "Students will be able to build an IPS sensor using signature filters based on target, OS, application or protocol, and severity.",
   "Students will be able to select the least disruptive fix for an IPS false positive between specific hosts.",
   "Students will be able to explain botnet C&C blocking and rate-based signatures and when each applies.",
   "Students will be able to distinguish IPS fail-open from av-failopen and predict traffic behavior for each setting."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: if a smoke detector in the kitchen keeps going off when you make toast, what are your options? List answers from 'remove the battery' to 'move or tune the detector' and connect them to IPS false-positive choices."
   ],
   [
    12,
    "Teach",
    "Explain IPS sensors and signature filters with the DMZ Windows example, then rate-based signatures, botnet C&C blocking, IP exemptions and fail-open versus av-failopen. Show a sample IPS log line on the projector and label each field."
   ],
   [
    18,
    "Activity",
    "Pairs work through the IPS Tuning Desk log cards (see activity). Ask each pair to explain why their fix is narrower than turning the sensor off."
   ],
   [
    5,
    "Discuss",
    "Review the cards that caused disagreement, especially the overload and botnet cards."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A smoke detector goes off every time someone makes toast. List every way you could stop the false alarms, then rank them from most to least safe.",
  "activity": {
   "title": "IPS Tuning Desk",
   "materials": "Printed cards each showing a short IPS log excerpt or situation (signature name, severity, source, destination, action), answer sheet, whiteboard.",
   "steps": [
    "Prepare 8 cards, for example: a repeated block between two known internal servers; outbound connections from a workstation flagged as botnet; a sensor with all signatures enabled protecting Linux web servers; heavy CPU and traffic passing uninspected during peak load; many login attempts to SSH within seconds.",
    "Pairs decide for each card which feature or change is the right response: signature filter change, IP exemption, botnet blocking, rate-based signature, or fail-open setting.",
    "Pairs write the exact scope of their change (which signature, which hosts, which setting) on the answer sheet.",
    "The class compares answers on the whiteboard and the teacher highlights the narrowest correct fix for each card."
   ]
  },
  "discussion": [
   "Should a hospital enable or disable IPS fail-open, and how would the answer differ for a retail store?",
   "What risks come with leaving a signature group in monitor mode for too long while tuning?"
  ],
  "exit": [
   [
    "Which four attributes can signature filters use?",
    "Target (server or client), operating system, application or protocol, and severity."
   ],
   [
    "What is the narrowest fix for a false positive between hosts A and B on one signature?",
    "An IP exemption for A and B on that signature."
   ],
   [
    "Which setting controls behavior when the IPS engine is overloaded, and how does it differ from av-failopen?",
    "IPS fail-open controls the IPS engine; av-failopen controls proxy-based antivirus when the FortiGate is in conserve mode."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision tree card: Is it a false positive between known hosts? Use an IP exemption. Is it an infected host calling out? Use botnet blocking. Too much CPU from irrelevant signatures? Tighten filters.",
   "Extend: Ask fast finishers to write a full IPS sensor plan for a DMZ with Windows web servers and a Linux mail relay, including filters, actions, botnet settings and a fail-open recommendation with justification."
  ]
 },
 {
  "t": "DoS policies and anomaly thresholds",
  "objectives": [
   "Students will be able to explain why DoS policies are evaluated before firewall policies and why that matters for flood protection.",
   "Students will be able to match common anomaly types to the attack patterns they detect.",
   "Students will be able to propose a threshold-setting process that avoids blocking legitimate traffic.",
   "Students will be able to identify the limits of an on-box DoS policy against very large DDoS attacks."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: a shop's doorbell rings 500 times a minute and nobody is there. Where should the shop stop the problem, at the door or at the cash register? Link the answer to early evaluation."
   ],
   [
    13,
    "Teach",
    "Draw the FortiGate packet path on the board and mark the DoS policy at ingress before the firewall policy and profiles. Walk through anomaly types (floods, scans, session counts), thresholds, actions and logging. Explain baselining with monitor mode and the limits against link-saturating DDoS."
   ],
   [
    17,
    "Activity",
    "Groups complete the Set the Threshold exercise (see activity) using a printed traffic chart. Circulate and ask each group to justify their numbers."
   ],
   [
    5,
    "Discuss",
    "Compare thresholds chosen by different groups and discuss which would have blocked the sale-day spike."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A shop's doorbell rings 500 times a minute, but nobody comes in. Where should the shop deal with this: at the front door or at the cash register? Explain why.",
  "activity": {
   "title": "Set the Threshold",
   "materials": "Printed line chart (teacher-drawn) showing a week of new TCP SYN packets per second to a web server, including a normal daily peak, a sale-day spike and an attack spike; anomaly matching cards; pens.",
   "steps": [
    "Groups first match anomaly cards (tcp_syn_flood, tcp_port_scan, udp_flood, icmp_sweep, tcp_dst_session) to short attack descriptions.",
    "Using the chart, each group proposes a tcp_syn_flood threshold and writes whether it would block the normal peak, the sale-day spike and the attack spike.",
    "Groups write a two-step rollout plan (monitor, then block) with what they would look for in the anomaly logs.",
    "Groups present their threshold and the class votes on which plan best balances availability and protection."
   ]
  },
  "discussion": [
   "Who in a business should be consulted before DoS thresholds are tightened, and why?",
   "If an attack saturates the Internet link, what options does an organization have beyond the FortiGate?"
  ],
  "exit": [
   [
    "Where in packet processing are DoS policies evaluated?",
    "At the ingress interface, before firewall policy lookup and most inspection."
   ],
   [
    "What does the tcp_syn_flood anomaly measure?",
    "The rate of new TCP SYN packets, triggering its action when the threshold is exceeded."
   ],
   [
    "Why start anomalies in monitor mode?",
    "To observe normal traffic rates and set thresholds above typical peaks before blocking, avoiding false positives."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a labeled packet-flow diagram showing the DoS policy before the firewall policy, and a reference card pairing each anomaly name with a one-line description.",
   "Extend: Ask fast finishers to design separate DoS policies for a web server and a DNS server on the same WAN interface, choosing which anomalies to enable for each and explaining the differences."
  ]
 },
 {
  "t": "Security profile logs and troubleshooting (FortiGuard connectivity, `diagnose autoupdate versions`)",
  "objectives": [
   "Students will be able to interpret the key fields of a FortiGate security profile log entry.",
   "Students will be able to explain how FortiGuard connectivity and licensing affect signatures and category ratings.",
   "Students will be able to use diagnose autoupdate versions output to judge whether databases are current.",
   "Students will be able to apply a logical troubleshooting sequence to a security profile complaint."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a photo or drawing of an expired carton of milk next to a full fridge. Ask: how would you know if the food in the fridge is still good? Connect expiry dates to signature currency."
   ],
   [
    12,
    "Teach",
    "Project a sample security log entry and label its fields. Explain the preconditions for a log to appear. Explain FortiGuard dependency (downloaded signatures versus real-time ratings), licensing, and walk through sample diagnose autoupdate versions output, highlighting versions, last update times and contract status."
   ],
   [
    18,
    "Activity",
    "Pairs work the Help Desk Triage tickets (see activity), deciding what evidence to check first and what the likely cause is."
   ],
   [
    5,
    "Discuss",
    "Pairs share their triage order for the hardest ticket; agree a class troubleshooting sequence and write it on the board."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your fridge looks full, but you have been away for a month. How do you decide what is still safe to eat? Write two checks you would make.",
  "activity": {
   "title": "Help Desk Triage",
   "materials": "Printed ticket cards with short symptom descriptions, printed excerpts of security log entries and diagnose autoupdate versions output (teacher-prepared, including some with old update dates and an expired contract), highlighters.",
   "steps": [
    "Give each pair four tickets, for example: rating errors on many sites; virus over HTTPS not logged; phishing site reached with no log entry; new malware missed although old samples are caught.",
    "Pairs match each ticket with the evidence excerpt that explains it, highlighting the decisive field (action, inspection mode, last update time, contract status).",
    "Pairs write the fix for each ticket in one sentence.",
    "The teacher reviews answers and the class builds a three-step troubleshooting sequence: read the log, check updates, verify license and connectivity."
   ]
  },
  "discussion": [
   "Why can a FortiGate with expired signatures be more dangerous than one with obvious errors?",
   "How would you prove to an auditor that security profiles are working and up to date?"
  ],
  "exit": [
   [
    "What three pieces of information does diagnose autoupdate versions show for each database?",
    "The version, the last update time, and the contract or entitlement status."
   ],
   [
    "What does a web filter rating error usually indicate?",
    "The FortiGate cannot reach FortiGuard (or lacks a valid license) to categorize the site."
   ],
   [
    "A user says a blocked site should be allowed. Where do you look first?",
    "The security (web filter) log, to see which profile, category and policy produced the block."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled sample log entry and a labeled sample diagnose autoupdate versions output as reference sheets during the triage activity.",
   "Extend: Ask fast finishers to write a weekly health-check runbook for a FortiGate that covers FortiGuard status, database currency, license expiry and log review, with what to do when each check fails."
  ]
 },
 {
  "t": "Route lookup order: policy routes, then the routing table (longest match, distance, priority)",
  "objectives": [
   "Students will be able to state the order of FortiGate route selection from policy routes through ECMP.",
   "Students will be able to predict the outgoing interface for a destination given a set of policy routes and routing table entries.",
   "Students will be able to explain why longest prefix match takes precedence over administrative distance.",
   "Students will be able to use first-match logic and the stop policy routing action to design policy route exceptions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: you have directions to 'downtown' and directions to '42 Main Street, downtown'. Which do you use to reach 42 Main Street? Use the answer to introduce longest prefix match."
   ],
   [
    12,
    "Teach",
    "Draw the decision ladder on the board: policy routes (top down, first match), then routing table (longest match, distance, priority, ECMP). Work two quick examples aloud, including one where a more specific route with higher distance wins. Mention the stop policy routing action and session-based lookup."
   ],
   [
    18,
    "Activity",
    "Pairs play Route Race (see activity), predicting the egress interface for each destination card."
   ],
   [
    5,
    "Discuss",
    "Review the cards most pairs got wrong and ask which rung of the ladder decided each one."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You have two sets of directions: one to 'downtown' and one to '42 Main Street, downtown'. Which do you follow to reach 42 Main Street, and why?",
  "activity": {
   "title": "Route Race",
   "materials": "A printed 'FortiGate state' sheet per pair showing three policy routes (one with stop policy routing) and eight routing table entries with prefixes, distances and priorities; a stack of destination cards (source, destination, port); answer sheet; projector for the reveal.",
   "steps": [
    "Pairs draw a destination card and write the predicted outgoing interface plus the rule that decided it (policy route number, longest match, distance, priority or ECMP).",
    "After eight cards, pairs swap answer sheets with another pair and challenge any answer they disagree with.",
    "The teacher reveals the answers on the projector, walking down the decision ladder for each card.",
    "Pairs score themselves and write one sentence about the mistake they made most often."
   ]
  },
  "discussion": [
   "What operational risks come with having many policy routes on a FortiGate, and how would you document them?",
   "Why might a network designer choose priority instead of distance to control which of two static routes is preferred?"
  ],
  "exit": [
   [
    "What does a FortiGate check before the routing table?",
    "Policy routes, evaluated top down with the first match winning."
   ],
   [
    "A /24 route has distance 110 and a /16 route covering the same address has distance 10. Which is used?",
    "The /24 route, because longest prefix match is applied before distance."
   ],
   [
    "Two static routes to the same prefix have equal distance and priority. What happens?",
    "ECMP: both are active and sessions are shared between them."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a laminated decision ladder card listing each step with a yes or no question (Does a policy route match? Which route is most specific? Which has lowest distance? Which has lowest priority?).",
   "Extend: Ask fast finishers to design a set of policy routes and static routes for a branch with MPLS, broadband and a guest network, then write three destination test cases with expected results for a classmate to solve."
  ]
 },
 {
  "t": "Static routes: administrative distance, priority, ECMP and load-balancing methods",
  "objectives": [
   "Students will be able to explain how administrative distance determines whether a static route is installed in the routing table.",
   "Students will be able to explain how priority selects a preferred route among equal-distance routes and why the other routes stay active.",
   "Students will be able to design a floating static route and a hot-standby route for a given failover requirement.",
   "Students will be able to choose an ECMP load-balancing method that fits a business requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students the difference between being on a team roster and being in the starting lineup. Record answers and promise to connect them to two route settings."
   ],
   [
    12,
    "Teach",
    "Use a whiteboard table of two default routes. Change distance and show which route appears in the routing table versus the database. Then set equal distance and change priority to show both active. Finish with ECMP and the four load-balancing methods, stressing session-based balancing."
   ],
   [
    18,
    "Activity",
    "Small groups complete the Failover Designer cards (see activity), choosing distance and priority values and predicting the routing table."
   ],
   [
    5,
    "Discuss",
    "Groups present one design; the class checks whether it meets the requirement, especially the inbound-on-secondary-link case."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "What is the difference between a player who is on the team roster and a player in the starting lineup? Write one sentence for each.",
  "activity": {
   "title": "Failover Designer",
   "materials": "Printed requirement cards, a blank route table template (columns: route, gateway, distance, priority, in active table yes or no, preferred yes or no), whiteboard, markers.",
   "steps": [
    "Give each group four requirement cards, for example: cold backup over LTE; both ISPs active with ISP1 preferred; share load equally across two identical links; send overflow to a metered link only when the main link is busy.",
    "Groups fill in distance and priority values for each route and mark whether each appears in the active table and which is preferred.",
    "For ECMP cards, groups also choose a load-balancing method and justify it.",
    "Groups swap templates, check another group's design against the requirement, and the teacher resolves disagreements at the board."
   ]
  },
  "discussion": [
   "What are the trade-offs between a cold backup route and a hot-standby route for a small business?",
   "Why might per-packet load balancing cause problems for users, and how does session-based ECMP avoid them?"
  ],
  "exit": [
   [
    "How do you make a backup static route stay out of the routing table until the primary fails?",
    "Give it a higher administrative distance than the primary (a floating static route)."
   ],
   [
    "Two routes have equal distance and priorities 1 and 10. Which are active and which is preferred?",
    "Both are active; the priority-1 route is preferred."
   ],
   [
    "Name the default ECMP method and one alternative.",
    "Source IP based is the default; alternatives are source-destination IP, weighted and usage based (spillover)."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-row comparison card: Distance = in or out of the table; Priority = preferred among those in the table, with a small example for each.",
   "Extend: Ask fast finishers to design routes for three links (fiber, broadband, LTE) where fiber and broadband share load, LTE is a cold backup, and explain the expected routing table and database output for each failure."
  ]
 },
 {
  "t": "Routing table vs routing database: `get router info routing-table all` and `database`",
  "objectives": [
   "Students will be able to distinguish the active routing table from the routing database.",
   "Students will be able to select the correct CLI command to view active routes versus all known routes.",
   "Students will be able to interpret routing database output to identify selected, installed and inactive routes.",
   "Students will be able to use the database view to verify a backup route before a failover test."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: if you only saw a team's starting lineup on the scoreboard, how would you know whether they have a backup goalie? Collect ideas."
   ],
   [
    12,
    "Teach",
    "Project two mock outputs side by side: routing-table all and routing-table database for the same FortiGate. Point out the missing backup route in the first and the inactive entry in the second, the > and * markers, and the reasons a route can be inactive (higher distance, interface down, lost to another source)."
   ],
   [
    18,
    "Activity",
    "Pairs complete the Two Views Detective worksheet (see activity), answering questions from printed outputs."
   ],
   [
    5,
    "Discuss",
    "Discuss which reasons for inactivity were hardest to spot and how the database view would be used in a failover sign-off."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A team's scoreboard shows its starting lineup. How would you find out whether the team has a backup player ready? What would you need to see?",
  "activity": {
   "title": "Two Views Detective",
   "materials": "Printed teacher-made mock outputs of get router info routing-table all and get router info routing-table database for three scenarios (healthy backup, missing backup, route inactive because its interface is down), question sheet, highlighters.",
   "steps": [
    "Pairs compare each pair of outputs and highlight any route that appears in the database but not in the active table.",
    "For each highlighted route, pairs write the reason it is inactive and whether that is expected or a problem.",
    "Pairs answer the sign-off question for each scenario: will failover work if the primary fails, yes or no, and why?",
    "The teacher reviews answers on the projector and the class agrees on a two-command verification checklist."
   ]
  },
  "discussion": [
   "Why would a vendor design a router to keep inactive routes at all instead of discarding them?",
   "How would you explain to a non-technical manager that a backup route is ready even though it does not appear in the routing table?"
  ],
  "exit": [
   [
    "Which command shows inactive backup routes?",
    "get router info routing-table database."
   ],
   [
    "A distance-20 default route does not appear in routing-table all. Is that a problem?",
    "Not necessarily; it is a higher-distance backup that stays inactive in the database until the primary is removed."
   ],
   [
    "Name two reasons a static route can be inactive.",
    "A lower-distance route exists for the same prefix, or its outgoing interface is down."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a legend card explaining route codes (S, C, O), the bracket values for distance and metric, and the > and * markers, to use while reading the outputs.",
   "Extend: Ask fast finishers to write the expected output of both commands before and after the primary link fails in a three-route design, then explain each change."
  ]
 },
 {
  "t": "Reverse path forwarding (RPF) check",
  "objectives": [
   "Students will be able to explain the purpose of the reverse path forwarding check and when it is evaluated.",
   "Students will be able to diagnose an RPF failure from a debug flow message and propose the correct return route.",
   "Students will be able to compare feasible-path (loose) and strict RPF modes.",
   "Students will be able to explain why inactive backup routes do not satisfy RPF and how to design around it."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show an envelope with a return address from another country but a local postmark. Ask: would you trust this letter? Why or why not? Connect the idea to source address plausibility."
   ],
   [
    12,
    "Teach",
    "Draw a FortiGate with three interfaces and a routing table. Walk through a new session arriving on each interface and ask the class whether a route back exists through that interface. Explain loose versus strict modes, the role of the default route, and the debug flow message."
   ],
   [
    18,
    "Activity",
    "Pairs work the RPF Detective scenarios (see activity), deciding pass or fail and writing the fix."
   ],
   [
    5,
    "Discuss",
    "Discuss the backup-link scenario and why disabling src-check is rarely the right fix."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A letter arrives with a return address in another country but a postmark from your own town. Would you trust it? Write one reason why or why not.",
  "activity": {
   "title": "RPF Detective",
   "materials": "Printed network diagrams with a FortiGate routing table (one per scenario), a short debug flow excerpt for some scenarios, worksheet with columns Pass or Fail, Reason, Fix.",
   "steps": [
    "Give pairs six scenarios, for example: new subnet behind an internal router with no route; Internet traffic arriving on wan1 with a default route; inbound traffic on a backup link with a higher-distance route; same with equal distance and different priorities; strict mode with asymmetric paths.",
    "Pairs decide whether each new session passes or fails RPF and write the reason using the routing table.",
    "For each failure, pairs write the exact static route or routing change that fixes it without disabling RPF.",
    "The teacher walks through each scenario on the projector and the class compares fixes."
   ]
  },
  "discussion": [
   "When, if ever, would disabling RPF on an interface be an acceptable choice, and what would you document?",
   "How could a network change process help prevent RPF outages after new subnets are added?"
  ],
  "exit": [
   [
    "What debug flow message indicates an RPF drop, and what is the usual fix?",
    "A reverse path check failure; add a return route to the source subnet via the ingress interface."
   ],
   [
    "Which RPF mode is the FortiGate default?",
    "Feasible-path (loose) RPF."
   ],
   [
    "Does an inactive floating static route satisfy RPF?",
    "No, only active routes count for the RPF check."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-question checklist for each session: Which interface did it arrive on? What is the source address? Is there an active route to that source via that interface?",
   "Extend: Ask fast finishers to design routes for a dual-ISP site with a published server so inbound sessions pass RPF on both links, and explain how strict mode would change the outcome."
  ]
 },
 {
  "t": "Link health monitors and blackhole routes",
  "objectives": [
   "Students will be able to explain why a static route stays active when the path beyond its gateway fails.",
   "Students will be able to describe how a link health monitor detects failure and withdraws routes to trigger failover.",
   "Students will be able to design a blackhole route with an appropriate distance to prevent VPN traffic leaks.",
   "Students will be able to evaluate a failover design by asking what removes the primary route and where traffic goes when it is gone."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: a road sign points to a bridge that collapsed two miles away. The road in front of the sign is fine. Will the sign change by itself? Discuss what would need to happen."
   ],
   [
    12,
    "Teach",
    "Draw a FortiGate with two ISPs and an IPsec tunnel. Show the upstream failure that leaves wan1 up, then add a link monitor with a target beyond the gateway and show route withdrawal and promotion. Then remove the tunnel route and trace traffic falling to the default route, and fix it with a blackhole route at a higher distance."
   ],
   [
    18,
    "Activity",
    "Small groups run the Break the Network tabletop (see activity), predicting what happens in each failure and fixing the design."
   ],
   [
    5,
    "Discuss",
    "Groups share their final designs and explain their answers to the two check questions: what removes the route, and where does traffic go."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A road sign points to a bridge that collapsed two miles away, but the road right in front of the sign is fine. Will the sign change by itself? What would need to happen?",
  "activity": {
   "title": "Break the Network",
   "materials": "Large printed or whiteboard diagram of a branch FortiGate with wan1, wan2 and an IPsec tunnel; printed failure cards; sticky notes for routes; markers.",
   "steps": [
    "Groups place sticky notes for each route (primary default, backup default, tunnel route) with distances on the diagram.",
    "The teacher reads failure cards one at a time: ISP1 upstream outage with wan1 still up; tunnel down; wan1 cable unplugged. Groups predict where traffic goes for each.",
    "Groups add a link monitor and a blackhole route to their design, with the probe target and distance written on sticky notes.",
    "The teacher replays the failure cards and groups confirm their design now behaves correctly."
   ]
  },
  "discussion": [
   "What could go wrong if a link monitor's probe target is itself unreliable, and how would you choose a good one?",
   "Why is silently dropping traffic with a blackhole route considered safer than letting it follow the default route?"
  ],
  "exit": [
   [
    "When is a plain static route removed from the routing table?",
    "Only when its outgoing interface goes down (unless a link monitor withdraws it)."
   ],
   [
    "What does a link health monitor do when its probes fail?",
    "Marks the link dead and withdraws the static routes using that interface and gateway, letting backup routes take over."
   ],
   [
    "Where should a blackhole route sit relative to a tunnel route, and why?",
    "At a higher distance, so it activates only when the tunnel route is removed and drops traffic instead of leaking it."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-box summary card: Link monitor = detects and removes; Blackhole = catches and drops, with a simple diagram for each.",
   "Extend: Ask fast finishers to compare a link monitor with an SD-WAN performance SLA for a dual-ISP branch and write when they would recommend each."
  ]
 },
 {
  "t": "SD-WAN members and zones, and routes that point to the zone",
  "objectives": [
   "Students will be able to define SD-WAN members and zones and explain how they relate.",
   "Students will be able to explain why firewall policies must reference the SD-WAN zone instead of member interfaces.",
   "Students will be able to explain why a static route to the SD-WAN zone is required for SD-WAN to carry traffic.",
   "Students will be able to sequence the minimum configuration steps for a working SD-WAN deployment."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: a taxi company has ten excellent drivers but no published phone number. How many rides will it give? Use the answer to preview the route-to-zone requirement."
   ],
   [
    12,
    "Teach",
    "Draw two WAN links becoming members, grouped into a zone. Show a policy pointing at the zone and a default route pointing at the zone. Then erase the route and ask what happens. Mention the reference prerequisite and the default virtual-wan-link zone."
   ],
   [
    18,
    "Activity",
    "Groups complete the SD-WAN Build Order card sort and troubleshoot two broken configurations (see activity)."
   ],
   [
    5,
    "Discuss",
    "Groups compare their build orders and explain the fix for each broken configuration."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A taxi company has ten great drivers but no phone number customers can call. How many rides will it give today? Write one sentence explaining why.",
  "activity": {
   "title": "SD-WAN Build Order",
   "materials": "Printed step cards (remove old references, add members, create zone, set member gateways, add default route to zone, create policy using zone, add performance SLA, add SD-WAN rule), two printed broken-configuration summaries, whiteboard.",
   "steps": [
    "Groups arrange the step cards in a working order and mark which steps are required for basic traffic and which refine path selection.",
    "Groups read broken configuration A (members, SLA and rules exist but no route to the zone) and write the symptom and fix.",
    "Groups read broken configuration B (admin cannot add wan2 because a policy and route reference it) and write the fix sequence.",
    "The teacher reviews orders on the whiteboard, highlighting that the route makes traffic eligible and the rules choose the member."
   ]
  },
  "discussion": [
   "Why might Fortinet require policies to reference zones instead of individual member interfaces?",
   "What risks come with migrating a live site from plain dual-WAN routing to SD-WAN, and how would you plan the change window?"
  ],
  "exit": [
   [
    "What do firewall policies reference once an interface is an SD-WAN member?",
    "The SD-WAN zone containing that member."
   ],
   [
    "SD-WAN members, SLAs and rules are configured, but nothing reaches the Internet. What is the most likely missing piece?",
    "A static default route pointing to the SD-WAN zone."
   ],
   [
    "Why might the FortiGate refuse to add an interface as an SD-WAN member?",
    "Other configuration, such as policies or static routes, still references the interface."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a labeled diagram showing members inside a zone, with arrows from the policy and the default route both pointing at the zone, to use during the card sort.",
   "Extend: Ask fast finishers to design two zones, internet and overlay, for a branch with two broadband links and two IPsec tunnels, listing the routes and policies each zone needs."
  ]
 },
 {
  "t": "Performance SLAs: probes, latency, jitter, packet loss, SLA targets",
  "objectives": [
   "Students will be able to define latency, jitter and packet loss and explain how a performance SLA measures each with probes.",
   "Students will be able to determine whether an SD-WAN member meets an SLA target given its measurements and thresholds.",
   "Students will be able to justify a probe server and protocol choice that represents the real traffic path.",
   "Students will be able to distinguish a member that is dead from one that is alive but out of SLA."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the board. Point out that 'up' and 'good' are different words, and that today is about how a FortiGate tells them apart."
   ],
   [
    15,
    "Teach",
    "Walk through the probe cycle on the whiteboard: FortiGate, two WAN members, a probe server. Define latency, jitter and loss with a timeline of five probes and their reply times. Show a sample target (150 ms, 30 ms, 2 percent) and stress the 'all thresholds' rule. Separate dead or alive from SLA pass or fail. End by repeating that the SLA measures and rules decide."
   ],
   [
    15,
    "Activity",
    "Run the SLA judge card activity described below in pairs, then have two pairs share a tricky card."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect target choices to application needs and probe target placement."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your home internet light is green, but your video call keeps freezing. Is your internet working? How would you prove it one way or the other?",
  "activity": {
   "title": "SLA judge",
   "materials": "Printed cards (one per member scenario) listing probe results, a printed SLA target sheet, whiteboard.",
   "steps": [
    "Give each pair eight cards. Each card shows a member name, five probe reply times or timeouts, and the probe target used.",
    "Pairs calculate approximate latency, jitter (how much reply times vary) and loss for each card.",
    "Using the target sheet (voice: 150 ms, 30 ms, 1 percent; general: 250 ms, 50 ms, 5 percent), pairs mark each member pass or fail for both targets and circle the threshold that caused any failure.",
    "Two cards use the ISP gateway as the probe target; pairs must flag why those results might be misleading.",
    "One card shows every probe timing out; pairs decide whether that member is dead or only out of SLA, and what route effect that could have."
   ]
  },
  "discussion": [
   "Why might you want a strict target for voice and a looser one for backups, using the same probe data?",
   "What could go wrong if the only probe server you use goes offline for maintenance?"
  ],
  "exit": [
   [
    "A member shows 90 ms latency, 45 ms jitter and 0 percent loss against a target of 150 ms, 30 ms and 2 percent. Does it meet the SLA?",
    "No. Jitter exceeds the 30 ms threshold, and failing any threshold fails the target."
   ],
   [
    "Why is probing the ISP's local gateway a weak design?",
    "It only proves the first hop works, so loss or delay further along the path to the real destination goes undetected."
   ],
   [
    "Does a performance SLA move traffic by itself?",
    "No. It measures and judges; SD-WAN rules that reference it decide which member carries traffic."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pre-filled worked card showing how to compute jitter from five reply times, and let them use a calculator for averages.",
   "Extend: Ask fast finishers to design two SLA targets and a probe plan for a company with voice, a SaaS application and nightly backups, and explain which members would be eligible when one link shows 3 percent loss."
  ]
 },
 {
  "t": "SD-WAN rules: manual, best quality, lowest cost (SLA), maximize bandwidth (SLA); implicit rule",
  "objectives": [
   "Students will be able to describe how each of the four SD-WAN rule strategies selects a member.",
   "Students will be able to choose the correct strategy for a stated business intent such as cost saving, best path or aggregate throughput.",
   "Students will be able to explain the role of the implicit rule and top-down, first-match rule evaluation.",
   "Students will be able to predict which member a rule selects given member costs and SLA states."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list the students' decision styles on the board. Map each style to a strategy name as a preview."
   ],
   [
    12,
    "Teach",
    "Present the four strategies with one whiteboard row each: what it consults (order, metric, cost plus SLA, SLA pool) and when it moves traffic. Then draw the rule list as a stack with the implicit rule at the bottom and explain first match and skipping rules whose members are all down."
   ],
   [
    18,
    "Activity",
    "Run the strategy matching card sort below in groups of three, followed by the prediction round."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to surface trade-offs such as flapping and cost."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on paper."
   ]
  ],
  "warmup": "You can take a taxi, a bus or a bike to work. Describe three different rules you might use to decide which one to take each day.",
  "activity": {
   "title": "Strategy matching and prediction",
   "materials": "Printed intent cards, printed strategy cards (Manual, Best quality, Lowest cost (SLA), Maximize bandwidth (SLA), Implicit rule), a printed member status sheet, whiteboard.",
   "steps": [
    "Give each group ten intent cards, such as 'voice must always use the lowest-jitter link' or 'use broadband unless it fails quality, MPLS costs more'.",
    "Groups place each intent card under the matching strategy card and write one sentence of justification on a sticky note.",
    "Hand out the member status sheet: three members with configured costs and current SLA pass or fail values.",
    "For four sample rules, groups predict which member or members are selected, then change one member's SLA state and predict again.",
    "Review answers on the board, focusing on any group that chose best quality for a cost-saving intent."
   ]
  },
  "discussion": [
   "Why might a network team avoid best quality for general web browsing even though it always uses the best link?",
   "What risks come from relying only on the implicit rule for all traffic?"
  ],
  "exit": [
   [
    "A company wants cheap broadband used until it fails quality, then MPLS. Which strategy?",
    "Lowest cost (SLA), with a higher configured cost on MPLS."
   ],
   [
    "What happens to traffic that matches no explicit SD-WAN rule?",
    "It is handled by the implicit rule using the default load-balancing method, source IP unless changed."
   ],
   [
    "Does manual mode react to a link with high packet loss that is still alive?",
    "No. Manual ignores SLA measurements and uses members in configured order, skipping only dead members."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page chart listing each strategy with 'what it looks at' and 'when it moves traffic' columns for students to use during the card sort.",
   "Extend: Ask fast finishers to design a full rule list for a branch with voice, SaaS, backups and general web, specify rule order and costs, and explain what happens when broadband fails the SLA."
  ]
 },
 {
  "t": "SD-WAN monitoring and troubleshooting: `diagnose sys sdwan health-check`, `diagnose sys sdwan service`",
  "objectives": [
   "Students will be able to state what information `diagnose sys sdwan health-check` and `diagnose sys sdwan service` each display.",
   "Students will be able to interpret sample output to decide whether a member is alive, in SLA or selected by a rule.",
   "Students will be able to apply a measurement-then-decision troubleshooting flow to an SD-WAN path problem.",
   "Students will be able to identify when the cause lies in probe configuration, link quality or rule design."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up prompt and gather answers. Steer toward the idea of checking the evidence before the decision."
   ],
   [
    12,
    "Teach",
    "Project simplified sample output for each command (teacher-written, no real device needed). Annotate member state, loss, latency, jitter and the SLA map on the first; annotate rule mode, member order and the selected member on the second. Draw the two-step flow on the board."
   ],
   [
    18,
    "Activity",
    "Run the output detective activity below in pairs."
   ],
   [
    5,
    "Discuss",
    "Work through the discussion questions as a class."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Your GPS app takes you on a strange route. What would you look at first to understand why it chose that route?",
  "activity": {
   "title": "Output detective",
   "materials": "Printed packets of teacher-written sample health-check and service output (four cases), highlighters, whiteboard.",
   "steps": [
    "Give each pair four cases. Each case has a short symptom, a health-check excerpt and a service excerpt.",
    "Pairs highlight in the health-check excerpt any member that is dead or out of SLA, and note which metric caused it.",
    "Pairs highlight in the service excerpt which member each rule selected and whether that matches the stated design intent.",
    "For each case, pairs write one sentence naming the layer at fault (probe configuration, link quality or rule design) and the next command or change they would make.",
    "Pairs swap packets with a neighbor and check each other's conclusions before the class review."
   ]
  },
  "discussion": [
   "Why is it risky to change SD-WAN rules before checking the health-check output?",
   "How could a health check show a link as dead when users on that link can still browse?"
  ],
  "exit": [
   [
    "Which command would show that a broadband member has 6 percent packet loss?",
    "`diagnose sys sdwan health-check`."
   ],
   [
    "Health check is clean but a rule selects the wrong member. Which layer is at fault?",
    "The decision layer: rule strategy, member costs, referenced SLA target or rule order."
   ],
   [
    "What does `diagnose sys sdwan service` show for each rule?",
    "Its strategy and members in preference order, including SLA status and which member is currently selected."
   ]
  ],
  "differentiation": [
   "Support: Provide an annotated key for one case showing exactly which fields to read, and let struggling pairs complete that case first as a model.",
   "Extend: Ask fast finishers to write their own sample case, symptom plus both outputs, that hides a rule-order problem, and have another pair solve it."
  ]
 },
 {
  "t": "IPsec basics: IKEv1 vs IKEv2, phase 1 and phase 2, proposals, DH groups, PFS, UDP 500/4500 and NAT-T",
  "objectives": [
   "Students will be able to explain what phase 1 and phase 2 of IKE each establish.",
   "Students will be able to list which parameters must match in phase 1 and which in phase 2.",
   "Students will be able to compare IKEv1 and IKEv2 and explain the role of DH groups and PFS.",
   "Students will be able to identify the ports required for IPsec with and without NAT in the path."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up prompt about two strangers sharing a secret. Collect ideas and introduce the two-phase idea."
   ],
   [
    15,
    "Teach",
    "Draw two FortiGates with a NAT router between them. Walk through phase 1 (version, authentication, proposals, DH group) and phase 2 (proposals, PFS, selectors) as two boxes. Explain DH groups and PFS in plain terms, then show UDP 500 changing to UDP 4500 when NAT is detected."
   ],
   [
    15,
    "Activity",
    "Run the mismatch hunt role-play below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect symptoms to phases."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Two people who have never met need to agree on a secret code while everyone in the room can hear them. What would they need to do first before sharing anything private?",
  "activity": {
   "title": "Mismatch hunt",
   "materials": "Printed configuration cards for Peer A and Peer B (six pairs), whiteboard with a two-column phase 1 and phase 2 checklist.",
   "steps": [
    "Split the class into pairs; one student is Peer A, the other Peer B. Each receives a card listing IKE version, authentication, phase 1 proposals, DH groups, phase 2 proposals, PFS setting, selectors and whether NAT is in the path.",
    "Peers read their settings aloud in phase order. At the first mismatch, they stop and decide whether phase 1 fails or phase 1 succeeds and phase 2 fails.",
    "Pairs record the failing phase, the mismatched parameter and the fix on a sticky note.",
    "For cards with NAT in the path, pairs also list which ports a firewall between them must allow.",
    "Rotate cards three times, then review the trickiest card as a class."
   ]
  },
  "discussion": [
   "Why might an organization still have IKEv1 tunnels, and what would you check before converting one to IKEv2?",
   "What is the real-world benefit of PFS if keys are already long and strong?"
  ],
  "exit": [
   [
    "Phase 1 is up but phase 2 fails. Name two likely causes.",
    "Mismatched phase 2 proposals, mismatched PFS or DH group, or selectors that do not mirror each other."
   ],
   [
    "Which ports must be open when one peer is behind NAT?",
    "UDP 500 and UDP 4500."
   ],
   [
    "Which phase does PFS belong to, and what does it do?",
    "Phase 2; it performs a fresh DH exchange for each phase 2 key so one compromised key does not expose others."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a printed checklist that sorts each parameter under phase 1 or phase 2, and let them tick items off while reading the cards.",
   "Extend: Ask fast finishers to explain why aggressive mode exposes identities and why ESP needs NAT-T to cross a NAT device, using a whiteboard diagram."
  ]
 },
 {
  "t": "Route-based (interface-mode) vs policy-based IPsec",
  "objectives": [
   "Students will be able to describe how route-based and policy-based IPsec VPNs attach a tunnel to the FortiGate.",
   "Students will be able to explain which features (backup routes, dynamic routing, SD-WAN, ADVPN) require route-based mode.",
   "Students will be able to correct the misconception that route-based mode uses stronger encryption.",
   "Students will be able to identify the routes and policies a route-based tunnel needs before traffic flows."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and listen for ideas about named exits versus special passes."
   ],
   [
    12,
    "Teach",
    "Draw a FortiGate with LAN, WAN and a tunnel interface for the route-based case, and a FortiGate with an IPsec-action policy for the policy-based case. Show where routes and policies attach in each. List the features that need an interface. State plainly that encryption is identical."
   ],
   [
    18,
    "Activity",
    "Run the design review activity below in groups."
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
  "warmup": "If you wanted your phone's map app to be able to route you through a new private road, what would the road need to have?",
  "activity": {
   "title": "Design review board",
   "materials": "Printed requirement cards, whiteboard divided into Route-based and Policy-based columns, sticky notes.",
   "steps": [
    "Give each group six requirement cards, such as 'automatic failover to a second tunnel', 'a single tunnel to a partner with a fixed subnet', 'SD-WAN over two ISPs' and 'BGP across the VPN'.",
    "Groups decide which mode each requirement needs or allows and place a sticky note in the correct column with a one-line reason.",
    "Each group receives a short description of a route-based tunnel that is up but passes no traffic, and writes the missing configuration items.",
    "Groups present one card each; the class challenges any reasoning that relies on encryption strength.",
    "The teacher summarizes on the board which features depend on having a tunnel interface."
   ]
  },
  "discussion": [
   "Why do you think FortiOS hides policy-based VPN in feature visibility by default?",
   "What would a migration from policy-based to route-based tunnels involve for an existing branch network?"
  ],
  "exit": [
   [
    "Name two features that require a route-based VPN.",
    "Any two of: backup routes with different distances, dynamic routing across the tunnel, SD-WAN membership, ADVPN short-cuts."
   ],
   [
    "Which mode offers stronger encryption?",
    "Neither; both use the same proposals and algorithms."
   ],
   [
    "A route-based tunnel is up but no traffic passes. What two things should you check?",
    "A route for the remote subnet via the tunnel interface, and firewall policies in both directions between the LAN and the tunnel."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of both modes with arrows showing where routes and policies attach, for students to reference during the activity.",
   "Extend: Ask fast finishers to outline the configuration steps for converting a policy-based tunnel to route-based with minimal downtime, including routes, policies and testing."
  ]
 },
 {
  "t": "Site-to-site with static peers and dial-up (dynamic) peers",
  "objectives": [
   "Students will be able to distinguish static, dial-up and dynamic DNS remote gateway types in phase 1.",
   "Students will be able to determine which peer must initiate a tunnel given each side's addressing.",
   "Students will be able to explain why two dial-up peers cannot connect.",
   "Students will be able to describe how authentication and peer IDs protect and organize dial-up connections."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about phoning someone without their number and gather responses."
   ],
   [
    12,
    "Teach",
    "Draw HQ with a fixed address and a branch whose address changes. Show the static-static case first, then the dial-up case with the branch initiating. Show one dial-up phase 1 accepting many spokes, and mention dynamic DNS as an alternative. Emphasize that authentication is the gatekeeper."
   ],
   [
    18,
    "Activity",
    "Run the who calls whom role-play below."
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
  "warmup": "Your friend got a new phone number but did not tell you. They want to talk to you. Who has to make the call, and why?",
  "activity": {
   "title": "Who calls whom",
   "materials": "Printed site cards (each shows a site name and whether its public IP is static, dynamic or dynamic with a DNS name), sticky notes, whiteboard.",
   "steps": [
    "Hand each student a site card. Students pair up and treat each pairing as a proposed tunnel.",
    "Each pair decides the phase 1 remote gateway type on both sides (static, dial-up or dynamic DNS) and which side initiates, then writes it on a sticky note.",
    "Pairs that hold two dynamic cards without DNS must explain why their tunnel is impossible and propose a fix.",
    "Students holding hub cards gather the sticky notes of all spokes connecting to them and decide how many phase 1 entries the hub needs.",
    "The class reviews the board, checking that every dynamic-address site is the initiator."
   ]
  },
  "discussion": [
   "What are the trade-offs of using dynamic DNS instead of a dial-up configuration for a single small site?",
   "Why does the security of a dial-up phase 1 depend so heavily on authentication strength?"
  ],
  "exit": [
   [
    "A branch has a dynamic IP and HQ has a static IP. Which side initiates and what type is HQ's phase 1?",
    "The branch initiates; HQ uses a dial-up (dynamic) phase 1."
   ],
   [
    "Can two dial-up peers form a tunnel with each other?",
    "No; neither knows the other's address to send the first message."
   ],
   [
    "How does a hub with several dial-up phase 1 entries decide which one an incoming caller uses?",
    "By authentication details such as peer ID or certificate information that match the caller to the right phase 1."
   ]
  ],
  "differentiation": [
   "Support: Provide a simple decision flowchart: does the other side have a known fixed address? If yes, static; if no, the other side must call you through a dial-up phase 1.",
   "Extend: Ask fast finishers to design a hub that serves both branch offices and remote-access users, explaining how they would separate the two groups and assign addresses with mode-config."
  ]
 },
 {
  "t": "Routes and firewall policies needed for tunnel traffic",
  "objectives": [
   "Students will be able to list the routes and firewall policies a route-based tunnel requires on each side.",
   "Students will be able to explain why bidirectional policies are needed even though the FortiGate is stateful.",
   "Students will be able to justify disabling source NAT on tunnel policies and adding a blackhole route.",
   "Students will be able to diagnose an up-but-no-traffic tunnel from a description of its configuration."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about a finished bridge with no signs and gather answers."
   ],
   [
    12,
    "Teach",
    "Draw two sites with LAN, WAN and tunnel interfaces. Add, in order, the tunnel route, the blackhole route, the LAN-to-tunnel policy and the tunnel-to-LAN policy on each side. Explain stateful replies versus new sessions, and why NAT is disabled."
   ],
   [
    18,
    "Activity",
    "Run the broken tunnel clinic activity below in pairs."
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
  "warmup": "A town builds a new bridge but forgets to put up any road signs. What happens to the traffic, and what else might stop cars from crossing?",
  "activity": {
   "title": "Broken tunnel clinic",
   "materials": "Printed configuration excerpts for both FortiGates in five scenarios (teacher-written: routes, policies, NAT setting), red and green pens, whiteboard.",
   "steps": [
    "Give each pair five scenarios. Each lists the symptom (no traffic, one-way traffic, traffic leaking to the Internet when the tunnel drops) and both sites' routes and policies.",
    "Pairs mark missing or wrong items in red: absent tunnel route, missing policy direction, NAT enabled, missing blackhole route.",
    "Pairs write the corrected configuration items in green, naming which FortiGate each belongs on.",
    "Each pair explains one scenario to another pair, who must agree or challenge the fix.",
    "The teacher reviews the one-way traffic scenario on the board to reinforce stateful replies."
   ]
  },
  "discussion": [
   "Why do wizard-built tunnels work more often on the first try than manually built ones?",
   "What could go wrong if a tunnel policy used source NAT while the remote site's policy only allowed your real LAN subnet?"
  ],
  "exit": [
   [
    "List the minimum configuration for traffic over a route-based tunnel on one FortiGate.",
    "A route for the remote subnet via the tunnel interface, and policies from LAN to tunnel and tunnel to LAN, normally without source NAT."
   ],
   [
    "Traffic works from Site A to Site B but not B to A. What is likely missing?",
    "A policy for the B-initiated direction, tunnel-to-LAN on Site A or LAN-to-tunnel on Site B."
   ],
   [
    "What does a higher-distance blackhole route prevent?",
    "Traffic for the remote subnet leaking out the default route when the tunnel is down."
   ]
  ],
  "differentiation": [
   "Support: Provide a fill-in checklist with four boxes per site (tunnel route, blackhole route, outbound policy, inbound policy) for students to complete during the activity.",
   "Extend: Ask fast finishers to add a second remote subnet to one scenario and list every object that must change on both sides, including phase 2 selectors."
  ]
 },
 {
  "t": "Redundant VPNs: two tunnels, route distance/priority, DPD, tunnel monitoring",
  "objectives": [
   "Students will be able to describe the components of a redundant route-based VPN design.",
   "Students will be able to explain how route distance and priority select a primary and backup tunnel.",
   "Students will be able to explain why DPD or tunnel monitoring is required for failover.",
   "Students will be able to diagnose a failover failure from a description of tunnel and route state."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the backup generator question and collect answers, highlighting the need for a sensor."
   ],
   [
    12,
    "Teach",
    "Draw a branch with two ISPs and two tunnels to HQ. Add routes with distances 10 and 20, then show what happens on failure with and without DPD. Contrast distance versus priority. Mention link monitors and policies on both tunnels."
   ],
   [
    18,
    "Activity",
    "Run the failover timeline activity below in groups."
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
  "warmup": "A hospital has a backup generator. The power goes out, but the generator never starts. What part of the system might be missing?",
  "activity": {
   "title": "Failover timeline",
   "materials": "Printed event cards (for example 'primary ISP fiber cut', 'DPD retries exhausted', 'tunnel 1 down', 'route distance 10 withdrawn', 'route distance 20 active'), tape, whiteboard.",
   "steps": [
    "Give each group a shuffled deck of event cards for a design with DPD enabled.",
    "Groups tape the cards on the board in the correct order from failure to traffic restored, explaining each step.",
    "Hand each group a second scenario card stating DPD is disabled; groups remove the cards that would no longer happen and describe the resulting black hole.",
    "Hand out a third scenario where the backup tunnel has no firewall policy; groups identify the point where traffic fails.",
    "Groups write the full fix list on a sticky note and compare with another group."
   ]
  },
  "discussion": [
   "What are the risks of setting DPD retry values very aggressively for fast failover?",
   "When might a link monitor through the tunnel catch a failure that DPD would miss?"
  ],
  "exit": [
   [
    "Name the two mechanisms that together make VPN failover work.",
    "Route distance or priority to set the preferred tunnel, and DPD or tunnel monitoring to detect a dead tunnel and withdraw its route."
   ],
   [
    "With DPD disabled, what happens when the primary path fails?",
    "The tunnel can stay up, its route stays active, and traffic is black-holed instead of moving to the backup."
   ],
   [
    "Why must both tunnel interfaces be in firewall policies?",
    "Policies are per interface; without one for the backup tunnel, traffic is dropped once failover occurs."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups the first and last event cards already placed so they only need to order the middle steps.",
   "Extend: Ask fast finishers to redesign the solution using SD-WAN with both tunnels as members and a performance SLA, and explain what improves compared with distance plus DPD."
  ]
 },
 {
  "t": "Topologies: hub and spoke, full mesh, partial mesh, ADVPN short-cuts",
  "objectives": [
   "Students will be able to compare hub and spoke, full mesh, partial mesh and ADVPN in terms of tunnel count and traffic path.",
   "Students will be able to calculate the number of tunnels for hub-and-spoke and full-mesh designs.",
   "Students will be able to describe how ADVPN creates on-demand short-cut tunnels.",
   "Students will be able to recommend a topology for a given traffic pattern and scale."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about connecting friends by phone and count lines on the board."
   ],
   [
    10,
    "Teach",
    "Draw five sites as hub and spoke, then full mesh, counting tunnels aloud. Introduce partial mesh. Walk through the ADVPN sequence: first packets via hub, short-cut offer, direct tunnel, idle teardown. Mention route-based tunnels and BGP."
   ],
   [
    20,
    "Activity",
    "Run the string network activity below."
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
  "warmup": "Six friends each want to be able to call any other friend directly on a private line. How many private lines do they need? What if they all just called through one friend instead?",
  "activity": {
   "title": "String network",
   "materials": "Name cards for sites, a ball of yarn or string (or whiteboard markers if string is unavailable), a printed scenario sheet, calculators.",
   "steps": [
    "Five students stand as sites holding name cards; one is the hub. Connect each spoke to the hub with string and count the tunnels (4).",
    "Add string between every pair to form a full mesh and count again (10). Have the class compute the count for 12 sites with the formula.",
    "Remove the mesh strings. Act out ADVPN: a spoke passes a paper 'packet' to another spoke via the hub, the hub hands the sender a 'short-cut offer' note, and the two spokes then hold a temporary string between them. Remove it when they stop passing packets.",
    "In pairs, students use the scenario sheet (three organizations with different traffic patterns) to recommend a topology with a one-sentence reason.",
    "Pairs share recommendations and the class discusses disagreements."
   ]
  },
  "discussion": [
   "What new risks or dependencies does a hub create, and how could you reduce them?",
   "Why does ADVPN need a dynamic routing protocol rather than static routes?"
  ],
  "exit": [
   [
    "How many tunnels for a full mesh of 6 sites, and for hub and spoke with 6 sites?",
    "Full mesh: 6 x 5 / 2 = 15. Hub and spoke: 5."
   ],
   [
    "Describe how an ADVPN short-cut is created.",
    "First packets travel via the hub; the hub sends a short-cut offer; the spokes negotiate a direct tunnel and routes prefer it; it is removed when idle."
   ],
   [
    "Which topology suits many sites needing occasional direct spoke-to-spoke paths with minimal configuration?",
    "ADVPN."
   ]
  ],
  "differentiation": [
   "Support: Provide a table with site counts from 2 to 8 and blank cells for students to fill in tunnel counts for each design before the formula is introduced.",
   "Extend: Ask fast finishers to design a dual-hub ADVPN for twelve sites, explaining how spokes fail over between hubs and how routes are learned."
  ]
 },
 {
  "t": "Troubleshooting: `diagnose vpn ike gateway list`, `diagnose vpn tunnel list`, `diagnose debug application ike -1`",
  "objectives": [
   "Students will be able to state what each of the three VPN diagnostic commands displays.",
   "Students will be able to select the correct command for a given VPN symptom.",
   "Students will be able to interpret phase 2 packet counters to locate a fault.",
   "Students will be able to sequence a troubleshooting workflow from phase 1 through routes and policies."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about a car that will not move and capture students' step-by-step checks."
   ],
   [
    12,
    "Teach",
    "Project teacher-written sample output for each command. Annotate state and NAT-T port in the gateway list, selectors and counters in the tunnel list, and an error line in the IKE debug. Stress debug enable, disable and filtering. Draw the workflow as a flowchart."
   ],
   [
    18,
    "Activity",
    "Run the help desk triage role-play below in pairs."
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
  "warmup": "Your car will not move when you press the accelerator. In what order would you check things, and why that order?",
  "activity": {
   "title": "Help desk triage",
   "materials": "Printed ticket cards with symptoms, printed 'command result' cards the teacher hands out on request (teacher-written sample output), flowchart template, whiteboard.",
   "steps": [
    "In pairs, one student is the engineer and the other is the device. The engineer draws a ticket card describing a VPN symptom.",
    "The engineer chooses which command to run and asks for it by name; the device student hands over the matching result card for that scenario.",
    "The engineer interprets the output aloud and chooses the next command, continuing until the fault is identified.",
    "The pair records the commands used, in order, and the fault on the flowchart template.",
    "Students swap roles for a second ticket, then compare paths with another pair to see who reached the answer in fewer steps."
   ]
  },
  "discussion": [
   "Why is it important to filter and then disable debugs on a production FortiGate?",
   "How does knowing whether phase 1 or phase 2 failed change who you need to contact at the remote site?"
  ],
  "exit": [
   [
    "Which command shows encrypt and decrypt counters for a tunnel?",
    "`diagnose vpn tunnel list`."
   ],
   [
    "You run `diagnose debug application ike -1` and see nothing. What did you forget?",
    "`diagnose debug enable`."
   ],
   [
    "Phase 2 SAs are installed but counters stay at zero. Where is the problem likely to be?",
    "In routes or firewall policies feeding the tunnel, not in IKE negotiation."
   ]
  ],
  "differentiation": [
   "Support: Give struggling pairs a partially completed flowchart with the first decision (is phase 1 up?) and its two branches already filled in.",
   "Extend: Ask fast finishers to write a new ticket and matching result cards that lead to a NAT-T problem, where UDP 4500 is blocked, and test it on another pair."
  ]
 },
 {
  "t": "Remote access VPN on FortiOS 7.6: FortiClient dial-up IPsec, and the SSL VPN changes in later 7.6 builds (tunnel mode removed, web mode renamed agentless VPN)",
  "objectives": [
   "Students will be able to describe how FortiClient dial-up IPsec provides full remote access, including authentication and mode-config.",
   "Students will be able to state the SSL VPN changes in later FortiOS 7.6 builds: tunnel mode removed and web mode renamed agentless VPN.",
   "Students will be able to choose between FortiClient IPsec and agentless VPN for a given user need.",
   "Students will be able to outline a migration from SSL VPN tunnel mode to FortiClient IPsec."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about visitors versus staff in a building and collect answers."
   ],
   [
    12,
    "Teach",
    "Draw a remote laptop, the Internet and a FortiGate. Walk through the FortiClient IPsec flow: dial-up phase 1, user authentication (EAP or XAUTH against local, LDAP or RADIUS), mode-config address and split tunnel, policies. Then show a before-and-after table of SSL VPN modes in later 7.6 builds."
   ],
   [
    18,
    "Activity",
    "Run the migration planning activity below in groups."
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
  "warmup": "A building has staff who need to work at desks inside and visitors who only need to collect a document at reception. Should both groups get the same kind of access? Why or why not?",
  "activity": {
   "title": "Migration planning board",
   "materials": "Printed user persona cards, printed migration step cards in random order, whiteboard divided into FortiClient IPsec and Agentless VPN columns.",
   "steps": [
    "Give each group eight persona cards, such as 'engineer who needs file shares and SSH', 'contractor who needs one web app', 'executive traveling with a managed laptop'.",
    "Groups sort each persona into the FortiClient IPsec or agentless VPN column with a one-line reason.",
    "Groups receive shuffled migration step cards (inventory users, deploy FortiClient, build dial-up phase 1, configure authentication, set mode-config range, create policies, open UDP 500 and 4500, test, communicate to users) and arrange them in a sensible order.",
    "Each group identifies one risk in its plan, such as users without FortiClient installed, and a mitigation.",
    "Groups present their plans and the class compares step orders."
   ]
  },
  "discussion": [
   "What are the security trade-offs of enabling split tunneling for remote users?",
   "Why might a vendor steer customers from SSL VPN tunnel mode toward IPsec for full remote access?"
  ],
  "exit": [
   [
    "What full remote-access method replaces SSL VPN tunnel mode in later 7.6 builds?",
    "FortiClient dial-up IPsec."
   ],
   [
    "What is agentless VPN?",
    "The renamed SSL VPN web mode, giving browser-based, clientless access to specific internal resources."
   ],
   [
    "What does mode-config assign to a remote client?",
    "An IP address from a configured range, DNS settings and optional split-tunnel routes."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column comparison sheet of FortiClient IPsec and agentless VPN (client needed, access scope, typical users) to use during the sort.",
   "Extend: Ask fast finishers to design the firewall policies and user groups so that engineers reach servers over SSH while finance staff reach only the accounting application, and explain how split tunneling settings differ for each."
  ]
 }
]);
