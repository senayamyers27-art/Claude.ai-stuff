/* Teacher edition for Microsoft Certified: Windows Server Administrator Associate (exam AZ-802: Administering Windows Server) (AZ-802): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("az-802", [
 {
  "t": "Deploying domain controllers: Install-ADDSForest / Install-ADDSDomainController, install from media (IFM), read-only DCs, DCs on Azure VMs (static private IP on the NIC, NTDS on a data disk with host caching off)",
  "objectives": [
   "Students will be able to choose between Install-ADDSForest, Install-ADDSDomainController and Install-ADDSDomain for a given scenario.",
   "Students will be able to explain when install from media and a read-only domain controller reduce bandwidth use and security risk.",
   "Students will be able to describe how an RODC Password Replication Policy limits cached credentials.",
   "Students will be able to configure the Azure-specific settings for a DC VM: static private IP on the NIC and NTDS on a data disk with host caching None."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the whiteboard without judging them."
   ],
   [
    12,
    "Teach",
    "Walk through the two-step deployment (install role, then promote) and the three promotion cmdlets. Then explain IFM, RODCs and the Password Replication Policy, and finish with the two Azure rules, drawing an Azure VM with an OS disk and a data disk."
   ],
   [
    18,
    "Activity",
    "Run the Pick the Build card activity in groups of three, then have each group defend one card choice to the class."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the choices to physical security and bandwidth."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "If a thief walked out of a branch office with the domain controller under their arm, what exactly would they have, and what would you need to do next?",
  "activity": {
   "title": "Pick the Build",
   "materials": "Printed scenario cards (about eight), a whiteboard, sticky notes in two colors.",
   "steps": [
    "Prepare cards describing sites: a new forest for a startup, a second DC at headquarters, a branch with a slow link, an unlocked branch closet, a DC in Azure, a new child domain for a subsidiary, and so on.",
    "Each group draws two cards and writes on sticky notes: the cmdlet, whether to use IFM, whether to use an RODC, and any Azure settings.",
    "For Azure cards, groups must sketch where the static IP is set and which disk holds NTDS and its caching setting.",
    "Groups post their notes on the board under each card; the class flags any choice it disagrees with and the group defends or revises it."
   ]
  },
  "discussion": [
   "Why might an organization still choose a writable DC for a branch office, even with weak physical security?",
   "What risks come with carrying IFM media between sites, and how would you control them?"
  ],
  "exit": [
   [
    "Which cmdlet adds a second DC to an existing domain?",
    "Install-ADDSDomainController."
   ],
   [
    "Where do you make the IP address of an Azure DC static?",
    "On the Azure network interface (NIC) resource, not inside the guest OS."
   ],
   [
    "What decides which passwords an RODC caches?",
    "Its Password Replication Policy (allowed and denied lists)."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page decision flow (new forest, new domain or extra DC; slow link; unsecured site; Azure) and let them use it during the card activity.",
   "Extend: Ask fast finishers to write the full Install-ADDSDomainController command for an RODC at a branch, including IFM and separate database and SYSVOL paths, and to explain what they would do if that RODC were stolen."
  ]
 },
 {
  "t": "FSMO roles (schema master, domain naming master, RID master, PDC emulator, infrastructure master): placement, transfer vs seize",
  "objectives": [
   "Students will be able to name the five FSMO roles and classify each as forest-wide or domain-wide.",
   "Students will be able to explain the job of each role and predict the symptom when its holder is offline.",
   "Students will be able to decide whether to transfer or seize a role in a given scenario and state the consequences of seizing.",
   "Students will be able to calculate the total number of FSMO roles in a multi-domain forest."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student ideas about jobs that only one person should do at a time."
   ],
   [
    12,
    "Teach",
    "Introduce multi-master replication, then each of the five roles with a one-line job description and outage symptom. Show netdom query fsmo output on the projector and the Move-ADDirectoryServerOperationMasterRole commands for transfer and seizure."
   ],
   [
    18,
    "Activity",
    "Run the Outage Detective activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions below, emphasizing why a seized-from DC must not return."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on paper."
   ]
  ],
  "warmup": "In a busy restaurant kitchen, which jobs can any cook do, and which jobs must only one person do at a time? Why?",
  "activity": {
   "title": "Outage Detective",
   "materials": "Printed symptom cards (one symptom per card), a whiteboard with five role columns, student laptops or paper for notes.",
   "steps": [
    "Give each pair six symptom cards, for example: clocks drift and Kerberos errors appear; new users cannot be created after a while; you cannot add a child domain; an Exchange schema update fails; cross-domain group members show stale names; lockouts do not take effect quickly.",
    "Pairs match each symptom to the role whose holder is offline and place the card in the right column on the board.",
    "For each card, pairs decide whether they would transfer or seize if the holder was down for an hour, a week, or forever, and write their reasoning.",
    "Debrief by reviewing any misplaced cards and asking pairs to explain one seizure decision aloud."
   ]
  },
  "discussion": [
   "Why might a small company keep all five roles on one DC, and when does that stop being a good idea?",
   "What could go wrong if a DC whose RID master role was seized came back online with its old data?"
  ],
  "exit": [
   [
    "Name the two forest-wide FSMO roles.",
    "Schema master and domain naming master."
   ],
   [
    "How many FSMO roles are in a forest with four domains?",
    "14: two forest-wide plus three per domain (2 + 12)."
   ],
   [
    "The current PDC emulator is healthy but being retired. Transfer or seize?",
    "Transfer, because both DCs are online and can hand over cleanly."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card listing each role, its scope and a one-line job, and let students use the restaurant analogy to explain each before matching symptoms.",
   "Extend: Have fast finishers write the PowerShell to transfer the PDC emulator and RID master to DC2, then the commands to seize all roles if DC1 is lost, and describe the metadata cleanup step."
  ]
 },
 {
  "t": "Sites, subnets, site links, link cost and bridging; replication health with repadmin and dcdiag",
  "objectives": [
   "Students will be able to explain how subnets map clients to sites and how that affects DC selection.",
   "Students will be able to calculate the preferred replication path from site link costs and explain the effect of site link bridging.",
   "Students will be able to compare intra-site and inter-site replication in timing and compression.",
   "Students will be able to choose the right repadmin or dcdiag command to diagnose a replication problem."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch a two-office network on the board from student answers."
   ],
   [
    13,
    "Teach",
    "Explain sites, subnets and DC locator, then site links (cost, interval, schedule) and bridging. Show sample repadmin /replsummary and dcdiag output on the projector and point out the largest delta and failure columns."
   ],
   [
    17,
    "Activity",
    "Run the Cheapest Road whiteboard design activity in groups of three or four."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions, connecting design choices to real complaints like slow logons."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a half sheet."
   ]
  ],
  "warmup": "You walk into a branch office and your laptop signs in through a server 2,000 miles away. What might Active Directory not know about this office?",
  "activity": {
   "title": "Cheapest Road",
   "materials": "Whiteboard or large paper per group, markers, printed scenario cards with site names, subnets and link speeds, and a printed excerpt of repadmin /replsummary output.",
   "steps": [
    "Give each group a scenario with four or five sites, their subnets, link speeds and one firewall restriction.",
    "Groups draw sites, add subnet labels, draw site links and assign costs, then calculate the preferred path between two named sites.",
    "Groups decide whether Bridge all site links should stay on, and if not, which explicit bridges they would create.",
    "Hand out the repadmin excerpt: groups identify the failing DC, guess the most likely cause, and name the next command they would run (for example dcdiag /test:dns).",
    "Each group presents its preferred path and troubleshooting step in one minute."
   ]
  },
  "discussion": [
   "Why does AD replicate differently inside a site than between sites, and what trade-off does that make?",
   "What are the risks of designating preferred bridgehead servers?"
  ],
  "exit": [
   [
    "Two paths connect Site A and Site C: A-C direct cost 250, or A-B (100) plus B-C (100). Which does AD prefer with bridging on?",
    "The A-B-C path, because its total cost of 200 is lower than 250."
   ],
   [
    "What is the most likely cause of slow logons when a new branch DC is healthy?",
    "The branch subnet is missing or not associated with the branch site in AD."
   ],
   [
    "Which command focuses on DNS registration problems on a DC?",
    "dcdiag /test:dns."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed diagram with costs already filled in and ask students only to sum paths and pick the lowest, before moving to bridging decisions.",
   "Extend: Ask fast finishers to write the PowerShell to create a subnet, a site and a site link with a cost and interval, and to explain how they would detect clients from unmapped subnets."
  ]
 },
 {
  "t": "Forest, external, shortcut and realm trusts; transitivity and direction; selective authentication; SID filtering",
  "objectives": [
   "Students will be able to explain trust direction and correctly identify which side's users can access which side's resources.",
   "Students will be able to compare forest, external, shortcut and realm trusts by scope and transitivity.",
   "Students will be able to choose selective authentication for scenarios that require limited exposure.",
   "Students will be able to explain how SID filtering blocks SID history abuse and when it is temporarily relaxed."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and draw two buildings with an arrow, asking students which way people walk."
   ],
   [
    12,
    "Teach",
    "Define trusting and trusted, then cover transitivity and the four manual trust types with a table on the board. Finish with selective authentication and SID filtering, showing Get-ADTrust output on the projector."
   ],
   [
    18,
    "Activity",
    "Run the Arrow Directions role-play in groups of four."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions, emphasizing acquisitions and partner risk."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "If your building agrees to accept another company's badges, who is trusting whom, and which way do people walk?",
  "activity": {
   "title": "Arrow Directions",
   "materials": "Printed domain name cards on lanyards or sticky notes, string or tape to make arrows on the floor or whiteboard, printed scenario cards.",
   "steps": [
    "Assign each student a domain or realm card (for example two forests with two domains each and one Kerberos realm).",
    "Read a scenario aloud, such as a partner needing access to one server. Students holding the relevant cards physically form the trust with string or a drawn arrow pointing from trusting to trusted.",
    "Another student acting as a user walks from their domain to a resource and the class checks whether the trust and its transitivity allow it.",
    "Add twists: enable selective authentication (the user must hold an Allowed to authenticate card for that server) and SID filtering (a forged privilege card is confiscated at the boundary).",
    "Groups record each scenario's trust type, direction and settings on the board."
   ]
  },
  "discussion": [
   "Why might a security team prefer two separate one-way trusts over a single two-way trust?",
   "What would you need to see before agreeing to relax SID filtering during a migration?"
  ],
  "exit": [
   [
    "If Domain X trusts Domain Y, which users can access which resources?",
    "Users in Y can be granted access to resources in X."
   ],
   [
    "Which manual trust types are always transitive?",
    "Forest trusts (within the two forests) and shortcut trusts."
   ],
   [
    "What setting limits trusted users to specific computers?",
    "Selective authentication, with Allowed to authenticate granted on each computer object."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference card with a picture of two buildings, the arrow from trusting to trusted, and the phrase users walk against the arrow, plus a four-row trust table to fill in.",
   "Extend: Ask fast finishers to design trusts for a three-forest merger where only one forest should reach both others, explaining why forest trusts do not chain and which settings they would apply."
  ]
 },
 {
  "t": "Users, groups (domain local, global, universal), OUs and delegation of control; group managed service accounts and the KDS root key",
  "objectives": [
   "Students will be able to compare domain local, global and universal groups by allowed members and where they can be used.",
   "Students will be able to apply the AGDLP nesting strategy to a resource access scenario.",
   "Students will be able to delegate a specific task on an OU to a group using the Delegation of Control wizard.",
   "Students will be able to explain the gMSA workflow, including the one-time KDS root key prerequisite."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers about who should hold the keys to a shared supply closet."
   ],
   [
    13,
    "Teach",
    "Explain OUs versus containers, the three group scopes with a comparison table, AGDLP, and delegation. Then demonstrate (or show screenshots of) New-ADServiceAccount and the KDS root key error."
   ],
   [
    17,
    "Activity",
    "Run the AGDLP Card Sort in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect group design and gMSAs to audit findings."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Forty people need access to a shared folder, and people join and leave every month. How would you set permissions so you rarely have to touch the folder itself?",
  "activity": {
   "title": "AGDLP Card Sort",
   "materials": "Printed cards for users, global groups, domain local groups, universal groups and resources (file share, printer), plus a whiteboard or table space for each pair.",
   "steps": [
    "Give each pair a scenario: two domains, several departments, and three resources with access requirements.",
    "Pairs arrange cards into nesting chains (account to global to domain local to permission), adding universal groups where users come from both domains.",
    "Pairs swap layouts with another pair and check for scope violations, such as a global group containing a user from another domain.",
    "Finish by having pairs write one delegation statement (which group, which OU, which task) and one gMSA statement (which hosts may retrieve the password)."
   ]
  },
  "discussion": [
   "Why delegate to groups instead of individual users, even when only one person needs the right today?",
   "What risks does a service account with a never-changing password create, and how does a gMSA reduce them?"
  ],
  "exit": [
   [
    "Which group scope can contain users from any domain in the forest?",
    "Universal."
   ],
   [
    "In AGDLP, which group gets the permission on the resource?",
    "The domain local group."
   ],
   [
    "What prerequisite is created once before the first gMSA?",
    "A KDS root key (Add-KdsRootKey)."
   ]
  ],
  "differentiation": [
   "Support: Provide a scope table with blanks for members and usage, and let students fill it in before the card sort; pair them with a peer for the first chain.",
   "Extend: Ask fast finishers to write the full PowerShell for a gMSA used by a three-server web farm and explain why Test-ADServiceAccount might return False on one server."
  ]
 },
 {
  "t": "Default Domain Policy vs fine-grained password policies (PSOs); AD Recycle Bin",
  "objectives": [
   "Students will be able to explain why the domain-linked GPO is the only source of domain-wide password policy and what OU-linked password settings actually affect.",
   "Students will be able to determine the resultant password policy for a user given several PSOs, precedence values and links.",
   "Students will be able to describe the requirements and irreversibility of the AD Recycle Bin.",
   "Students will be able to sequence the restoration of a deleted OU and its child objects."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and take a quick show of hands on how many password rules a domain can have."
   ],
   [
    12,
    "Teach",
    "Explain the Default Domain Policy, then PSOs, precedence rules and the shadow group workaround. Show ADAC screenshots of the Password Settings Container and Deleted Objects. Explain tombstones versus the Recycle Bin and the restore order."
   ],
   [
    18,
    "Activity",
    "Run the Who Gets Which Policy puzzle in pairs, followed by the restore-order sequencing challenge."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions about irreversibility and protection from accidental deletion."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your boss wants admins to have longer passwords than everyone else. Can one domain have more than one password rule? Make a guess and explain why.",
  "activity": {
   "title": "Who Gets Which Policy",
   "materials": "Printed user profile cards (each listing group memberships and any direct PSO link), a printed table of PSOs with precedence values, and sequencing cards for a deleted OU scenario.",
   "steps": [
    "Give each pair six user cards and the PSO table. Pairs determine the resultant policy for each user and write the reason (direct link, lowest precedence, or domain policy fallback).",
    "Include a trap card where a PSO is linked to an OU; pairs must spot that it has no effect and propose a shadow group.",
    "Hand out shuffled sequencing cards (enable Recycle Bin, deletion occurs, restore OU, restore users by lastKnownParent, enable accidental deletion protection) and have pairs put them in order.",
    "Review answers on the projector, asking pairs to explain one tricky card."
   ]
  },
  "discussion": [
   "Why might Microsoft have made enabling the Recycle Bin irreversible, and does that change when you would enable it?",
   "What are the pros and cons of keeping shadow groups in sync with a scheduled script?"
  ],
  "exit": [
   [
    "A user gets PSOs with precedence 10 and 15 through groups. Which applies?",
    "Precedence 10, the lowest value."
   ],
   [
    "Can a PSO be applied to an OU?",
    "No. PSOs apply only to users and global security groups."
   ],
   [
    "What forest functional level is required for the AD Recycle Bin?",
    "Windows Server 2008 R2 or higher."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-step flowchart: is a PSO linked directly to the user, if not which group PSO has the lowest precedence, if none use the domain policy.",
   "Extend: Ask fast finishers to write PowerShell that creates a PSO, links it to a group, verifies the resultant policy, and restores a deleted OU and its children using lastKnownParent."
  ]
 },
 {
  "t": "Hybrid identity: Entra Connect Sync (including staging mode) vs Entra Cloud Sync; password hash sync, pass-through authentication, seamless SSO",
  "objectives": [
   "Students will be able to compare Entra Connect Sync and Entra Cloud Sync and choose one for a given scenario.",
   "Students will be able to explain the purpose and behavior of a Connect Sync server in staging mode.",
   "Students will be able to compare password hash sync and pass-through authentication by where validation occurs and outage behavior.",
   "Students will be able to describe how Seamless SSO works and that it complements PHS or PTA."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and note answers about where a password should be checked."
   ],
   [
    13,
    "Teach",
    "Draw on-premises AD, a sync server and Entra ID on the whiteboard. Add Connect Sync with a staging server, then Cloud Sync agents for a second forest. Then trace a sign-in under PHS, under PTA and with Seamless SSO."
   ],
   [
    17,
    "Activity",
    "Run the Design Review role-play in groups of three."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to weigh outage resilience against instant enforcement."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "An employee is disabled in the office directory at 4:55 p.m. Should they still be able to sign in to cloud email at 5:05 p.m.? What would have to be true for that to be blocked?",
  "activity": {
   "title": "Design Review",
   "materials": "Printed requirement cards for four fictional organizations, whiteboard space or large paper per group, markers.",
   "steps": [
    "Assign roles in each group: architect, security reviewer and operations reviewer.",
    "Each group draws a requirement card (for example: instant enforcement of logon hours; survive a datacenter outage; three disconnected forests; need device writeback).",
    "The architect sketches sync tool, sign-in method, Seamless SSO decision and resilience plan; the reviewers challenge it against their concerns.",
    "Groups revise and post their final design, labeling the staging server or agent count and any fallback method.",
    "Groups rotate to review one other design and leave one sticky-note question."
   ]
  },
  "discussion": [
   "Why might an organization enable password hash sync even if it uses pass-through authentication day to day?",
   "What risks come with having only one sync server or one PTA agent, and how would you explain them to a manager?"
  ],
  "exit": [
   [
    "Which sign-in method enforces on-premises logon hours at the moment of sign-in?",
    "Pass-through authentication."
   ],
   [
    "What does staging mode prevent a Connect Sync server from doing?",
    "Exporting changes to Entra ID or AD DS."
   ],
   [
    "Which sync tool fits several disconnected forests with minimal on-premises infrastructure?",
    "Microsoft Entra Cloud Sync."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-column comparison chart (Connect Sync vs Cloud Sync; PHS vs PTA) with prompts such as where it runs and what happens in an outage, to fill in before the role-play.",
   "Extend: Ask fast finishers to write a failover runbook for switching a staging server to active, and to explain how they would rotate the AZUREADSSOACC Kerberos key on a schedule."
  ]
 },
 {
  "t": "Group Policy processing (LSDOU), Enforced and Block Inheritance, security filtering, loopback processing, Central Store, backup and restore",
  "objectives": [
   "Students will be able to predict the winning setting for an object given GPO links, link order, Enforced and Block Inheritance.",
   "Students will be able to configure security filtering correctly, including the Read permission required for computers.",
   "Students will be able to choose loopback Replace or Merge for shared-computer scenarios.",
   "Students will be able to distinguish Restore-GPO from Import-GPO and explain the purpose of the Central Store."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list rule layers students already live under."
   ],
   [
    12,
    "Teach",
    "Draw an OU tree with linked GPOs and walk through LSDOU, link order, Block Inheritance and Enforced. Then cover security filtering with the Read permission, loopback modes, the Central Store and GPO backup cmdlets. Show a sample gpresult /r output on the projector."
   ],
   [
    18,
    "Activity",
    "Run the Who Wins tree puzzle in pairs."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions on overusing Enforced and Block Inheritance."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your city, your landlord and your roommate each set a rule about noise after 10 p.m. If they disagree, whose rule wins, and could any of them override the others?",
  "activity": {
   "title": "Who Wins",
   "materials": "Printed OU tree diagrams with GPOs, link orders, padlock (Enforced) and blocked icons, colored pens, and a printed gpresult /r excerpt.",
   "steps": [
    "Give each pair a tree with five GPOs that conflict on two settings (screen saver timeout and a desktop wallpaper), including one Enforced link and one Block Inheritance.",
    "Pairs determine the winning value for a user and computer in two different OUs, writing the reason for each.",
    "Add a twist card: a GPO's security filtering was changed to the Finance group only and Authenticated Users removed entirely; pairs predict the result and the fix.",
    "Add a kiosk card: pairs choose Replace or Merge and justify it.",
    "Pairs compare their answers to the gpresult excerpt and explain any differences."
   ]
  },
  "discussion": [
   "Why do experienced administrators try to avoid Enforced and Block Inheritance, and what would you use instead?",
   "Why is it important to record GPO links separately from GPO backups?"
  ],
  "exit": [
   [
    "In LSDOU, which level applies last?",
    "The OU closest to the object (the lowest OU in the path)."
   ],
   [
    "What permission must remain for Authenticated Users or Domain Computers when you filter a GPO to a group?",
    "Read (without Apply)."
   ],
   [
    "Which cmdlet returns an existing GPO to a backed-up state?",
    "Restore-GPO."
   ]
  ],
  "differentiation": [
   "Support: Provide a step-by-step checklist (list GPOs in LSDOU order, remove blocked unless Enforced, apply in order, Enforced wins last) and walk through the first tree together.",
   "Extend: Ask fast finishers to design a GPO structure for a school with labs, kiosks and staff laptops, including a WMI filter and a migration table plan for copying GPOs to a second domain."
  ]
 },
 {
  "t": "Migrating AD objects between domains and forests with ADMT and SID history; domain and forest functional levels when upgrading DCs",
  "objectives": [
   "Students will be able to explain how SID history preserves resource access during a migration and why security translation is still needed.",
   "Students will be able to list the prerequisites for SID history migration and password migration with ADMT.",
   "Students will be able to sequence an ADMT migration from groups through security translation.",
   "Students will be able to determine whether a functional level can be raised and outline the add-new-DC upgrade path."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about moving to a new building with new badges and note ideas on the board."
   ],
   [
    13,
    "Teach",
    "Explain new SIDs, sIDHistory and the prerequisites (auditing, SOURCE$$$, SID filtering, PES). Show the migration order, then functional levels, the oldest-DC rule and the upgrade path including DFSR."
   ],
   [
    17,
    "Activity",
    "Run the Migration Runbook sequencing activity in groups of three."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to discuss risk and cleanup."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You move to a new office and get a new badge number, but all the old doors only know your old number. How could you keep getting in while the doors are reprogrammed?",
  "activity": {
   "title": "Migration Runbook",
   "materials": "Printed step cards (about fourteen) for an acquisition migration and DC upgrade, tape or a whiteboard, sticky notes for prerequisites.",
   "steps": [
    "Give each group shuffled step cards such as create trust, enable auditing, create SOURCE$$$, relax SID filtering, install PES, migrate groups, migrate users, migrate service accounts, migrate computers, security translation, clear SID history, re-enable SID filtering, add new DCs, raise functional levels.",
    "Groups arrange the cards into a runbook on the board, marking prerequisites with sticky notes.",
    "Introduce a problem card (users get access denied on old file servers) and have groups locate the step they skipped or the setting to check.",
    "Groups add a second track for the DC upgrade (add DCs, move FSMO roles, update DNS and DHCP, demote old DCs, raise DFL and FFL) and note where DFSR fits."
   ]
  },
  "discussion": [
   "Why is leaving SID history in place long after a migration a security concern?",
   "What business reasons might delay raising a functional level even after all old DCs are gone?"
  ],
  "exit": [
   [
    "What attribute lets a migrated user keep access to resources that reference their old SID?",
    "sIDHistory (SID history)."
   ],
   [
    "What must run on a source DC to migrate passwords with ADMT?",
    "The Password Export Server (PES) service."
   ],
   [
    "Can the domain functional level be raised above the version of the oldest DC?",
    "No. Replace or demote the oldest DC first."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed runbook with every third step filled in and the badge analogy printed at the top as a reference.",
   "Extend: Ask fast finishers to write a rollback plan for the user migration phase and to explain how they would verify, with PowerShell, the current domain and forest modes and SYSVOL replication state."
  ]
 },
 {
  "t": "Windows Admin Center: desktop vs gateway mode, extensions, Kerberos constrained delegation, Windows Admin Center for Azure VMs and Arc-enabled servers",
  "objectives": [
   "Students will be able to compare WAC desktop mode and gateway mode and choose one for a scenario.",
   "Students will be able to explain the double-hop problem and configure resource-based Kerberos constrained delegation for a WAC gateway.",
   "Students will be able to describe how extensions add functionality and who can manage them.",
   "Students will be able to explain how WAC is used for Azure VMs and Arc-enabled servers, including Entra ID sign-in and Azure RBAC."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about errands and helpers and connect it to acting on someone's behalf."
   ],
   [
    12,
    "Teach",
    "Draw desktop mode and gateway mode on the board, then trace a Kerberos double hop and show the Set-ADComputer delegation command. Explain extensions and gateway roles, then show the portal paths for Azure VMs and Arc-enabled servers."
   ],
   [
    18,
    "Activity",
    "Run the Ticket Triage pair troubleshooting activity."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions about centralizing management and security."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you ask a friend to pick up a package for you, what would the shop need before handing it over? How is that like a server acting on your behalf?",
  "activity": {
   "title": "Ticket Triage",
   "materials": "Printed help-desk ticket cards describing WAC problems, a printed diagram of a gateway and three servers, whiteboard.",
   "steps": [
    "Give each pair five tickets, such as: credential prompt for every server; a single admin wants WAC on a laptop; on-premises servers must be managed from the portal with no inbound ports; a vendor firmware tool is missing; Test-WSMan fails on one server.",
    "Pairs write the cause and fix for each ticket, naming the setting, mode, cmdlet or service involved.",
    "For the delegation ticket, pairs mark on the diagram which computer object gets the setting and which account it names.",
    "Pairs swap tickets with another pair to check answers, then the class reviews the two most disputed tickets."
   ]
  },
  "discussion": [
   "What are the security benefits and risks of centralizing server management through one WAC gateway?",
   "Why might an organization require Entra ID authentication for its WAC gateway?"
  ],
  "exit": [
   [
    "Which WAC mode suits a single administrator on a Windows 11 laptop?",
    "Desktop mode."
   ],
   [
    "On which computer object do you configure resource-based constrained delegation for a WAC gateway?",
    "On each managed server, naming the gateway's computer account."
   ],
   [
    "How does WAC reach Arc-enabled servers from the portal without inbound internet ports?",
    "Through Azure Arc, which brokers the connection over the Connected Machine agent's outbound connection."
   ]
  ],
  "differentiation": [
   "Support: Provide the concierge analogy diagram labeled with gateway, managed server and user, and a fill-in-the-blank version of the Set-ADComputer command.",
   "Extend: Ask fast finishers to write a PowerShell loop that configures delegation for every computer in a Servers OU and to describe how they would make the gateway highly available."
  ]
 },
 {
  "t": "PowerShell remoting: Enter-PSSession vs Invoke-Command, Just Enough Administration (JEA) role capability and session configuration files",
  "objectives": [
   "Students will be able to choose between Enter-PSSession, Invoke-Command and New-PSSession for a given task.",
   "Students will be able to explain deserialized results and the second-hop problem, and select a safe fix.",
   "Students will be able to distinguish the contents and placement of a JEA role capability file and session configuration file.",
   "Students will be able to read a JEA configuration and predict what a connecting user can do."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about giving someone limited access and collect ideas."
   ],
   [
    12,
    "Teach",
    "Demonstrate or show screenshots of Enter-PSSession and Invoke-Command against several servers, then explain deserialization and the second hop. Introduce JEA with the two-file model and walk through the sample .pssc on the projector."
   ],
   [
    18,
    "Activity",
    "Run the Build the Menu JEA design activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions about what makes a JEA endpoint unsafe."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A plumber needs to fix one sink in your building. What is the least access you could give them, and how would you know what they did?",
  "activity": {
   "title": "Build the Menu",
   "materials": "Printed JEA scenario cards, blank printed templates for a .psrc and a .pssc (key names with empty values), student laptops with a browser for reference, sticky notes.",
   "steps": [
    "Give each pair a scenario: help desk restarts two services and reads event logs; DNS team clears the DNS cache and views zones; backup operators start a backup job.",
    "Pairs fill in the .psrc template with VisibleCmdlets and any parameter restrictions, and the .pssc template with session type, run-as identity, transcript folder and role definitions.",
    "Pairs swap templates with another pair, who act as auditors and try to find a way the endpoint gives too much power, writing findings on sticky notes.",
    "Pairs revise their files and state where the .psrc must be stored and the command a user would run to connect."
   ]
  },
  "discussion": [
   "Which kinds of commands should never appear in a JEA role capability, and why?",
   "When is an interactive session the better choice than a one-to-many command, even for experienced admins?"
  ],
  "exit": [
   [
    "Which cmdlet opens an interactive session with a single remote server?",
    "Enter-PSSession."
   ],
   [
    "Which JEA file defines the allowed commands?",
    "The role capability file (.psrc)."
   ],
   [
    "Which JEA setting records everything a user does in a session?",
    "TranscriptDirectory in the session configuration file (.pssc)."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column chart (what versus who and how) to sort JEA settings into .psrc or .pssc before filling the templates.",
   "Extend: Ask fast finishers to write the commands to create, test and register the endpoint on 20 servers with Invoke-Command, and to use Get-PSSessionCapability to verify one user's access."
  ]
 },
 {
  "t": "Azure Arc-enabled servers: Connected Machine agent (azcmagent), at-scale onboarding with a service principal, extensions, tags and RBAC",
  "objectives": [
   "Students will be able to explain how the Connected Machine agent connects a non-Azure server to Azure using outbound HTTPS only.",
   "Students will be able to select the right azcmagent command for connecting, checking status, testing connectivity and configuring local settings.",
   "Students will be able to design an at-scale onboarding using a least-privilege service principal.",
   "Students will be able to apply tags, RBAC roles and extensions to Arc-enabled servers and explain the limits of Azure RBAC."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch servers in three locations on the board."
   ],
   [
    12,
    "Teach",
    "Explain what Arc is, the agent components and outbound-only connectivity. Walk through azcmagent commands, then at-scale onboarding with a service principal and the onboarding role. Finish with extensions, tags, Azure Policy and RBAC roles, projecting a sample azcmagent show output."
   ],
   [
    18,
    "Activity",
    "Run the Rollout Plan whiteboard design activity in groups of three."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions about secrets and the RBAC boundary."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You manage servers in your office, in a store back room and in another cloud provider. What would you want from a single dashboard, and what would the network team worry about?",
  "activity": {
   "title": "Rollout Plan",
   "materials": "Whiteboard or large paper per group, markers, printed requirement cards (number of servers, locations, proxy use, compliance needs), printed role list.",
   "steps": [
    "Each group draws a requirement card, for example 250 servers across 30 stores with a proxy and a no-inbound-ports rule.",
    "Groups draw the onboarding flow: service principal, its role and scope, the deployment tool, and the azcmagent connect step with tags.",
    "Groups add post-onboarding management: which extensions, deployed how, and which RBAC roles for which teams.",
    "Hand each group a failure card (for example eight servers fail behind a proxy, or a secret is leaked); groups write the troubleshooting command or containment step.",
    "Groups present for two minutes; classmates check for over-privileged roles or inbound port mistakes."
   ]
  },
  "discussion": [
   "Why is the Azure Connected Machine Onboarding role safer for a script than Contributor, and what can still go wrong if its secret leaks?",
   "Where does Azure RBAC stop and local server permissions begin for an Arc-enabled server?"
  ],
  "exit": [
   [
    "Which port and direction does the Connected Machine agent use?",
    "TCP 443, outbound only."
   ],
   [
    "Which azcmagent command tests connectivity to required endpoints?",
    "azcmagent check."
   ],
   [
    "Which built-in role lets a service principal onboard but not manage Arc servers?",
    "Azure Connected Machine Onboarding."
   ]
  ],
  "differentiation": [
   "Support: Provide a command reference card (connect, show, check, disconnect, config) and a simple flow diagram of agent to Azure to help students complete the rollout plan.",
   "Extend: Ask fast finishers to design an Azure Policy approach that tags and deploys the Azure Monitor Agent to every new Arc server, and to plan secret expiry and rotation for the onboarding service principal."
  ]
 },
 {
  "t": "Azure Policy and machine configuration for Arc-enabled and Azure servers; audit vs deploy effects",
  "objectives": [
   "Students will be able to distinguish the Audit, AuditIfNotExists, Deny, Modify, Append, DeployIfNotExists and Disabled effects and choose one for a stated requirement.",
   "Students will be able to explain why DeployIfNotExists and Modify assignments need a managed identity and a remediation task for existing resources.",
   "Students will be able to compare Azure Policy resource checks with machine configuration in-guest checks for Azure VMs and Arc-enabled servers.",
   "Students will be able to select the correct machine configuration mode (Audit, ApplyAndMonitor, ApplyAndAutoCorrect) for a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up prompt and collect three or four answers. Write the verbs students use (report, stop, fix) on the board; they map to effects later."
   ],
   [
    13,
    "Teach",
    "Walk through definition, initiative, assignment and scope. Present each effect with a one-line example. Emphasize that DINE and Modify fix only new or updated resources until a remediation task runs, and that they need a managed identity. Then contrast Azure Policy (outside the machine) with machine configuration (inside the OS) and its three modes."
   ],
   [
    17,
    "Activity",
    "Run the effect card sort described in the activity. Circulate and ask each group to justify one card aloud."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to talk about rollout strategy and the risks of Deny."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your manager says: every server must have antivirus, nobody may create servers in unapproved regions, and we need a list of servers missing a cost-center tag. For each sentence, would you want Azure to report, prevent or fix?",
  "activity": {
   "title": "Effect and mode card sort",
   "materials": "Printed cards (one requirement per card, about 14 cards per group), a whiteboard divided into columns labeled Audit, AuditIfNotExists, Deny, Modify, DeployIfNotExists, Machine configuration Audit, ApplyAndMonitor, ApplyAndAutoCorrect; sticky notes.",
   "steps": [
    "Form groups of three or four and hand each group a deck of requirement cards, such as 'Block storage accounts that allow public access', 'Install the Azure Monitor Agent on every Arc server', 'Add a missing environment tag', 'Report servers whose local Guest account is enabled' and 'Keep the TLS registry setting enforced even if an admin changes it'.",
    "Groups place each card under the correct column and write on a sticky note any prerequisite it needs, such as a managed identity, a remediation task or the machine configuration extension.",
    "Each group then picks one card where an existing fleet of 100 servers is involved and writes the full rollout sequence: Audit first, review, switch effect, remediate.",
    "Reveal the answer key on the projector and let groups correct their boards, discussing any card that two groups placed differently."
   ]
  },
  "discussion": [
   "Why might an organization assign a policy as Audit for weeks before switching it to DeployIfNotExists or Deny?",
   "What could go wrong if a Deny policy is assigned at a management group without warning application teams?",
   "When would you choose ApplyAndMonitor rather than ApplyAndAutoCorrect for an in-guest setting?"
  ],
  "exit": [
   [
    "A DINE policy installs an extension on new servers but older servers stay noncompliant. What step is missing?",
    "A remediation task for the existing resources."
   ],
   [
    "Which tool checks whether a registry setting inside Windows is configured: Azure Policy alone or machine configuration?",
    "Machine configuration, because plain Azure Policy only sees Azure Resource Manager properties."
   ],
   [
    "Which effect blocks a noncompliant resource from being created?",
    "Deny."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page table with each effect, a plain verb (report, block, adjust, deploy) and one example, and let them use it during the card sort.",
   "Extend: Ask fast finishers to sketch the JSON structure of a policy rule with an if condition and a then effect, and to explain which parameter they would use to switch an assignment from Audit to DeployIfNotExists without redefining it."
  ]
 },
 {
  "t": "Azure Update Manager: assessments, one-time updates, maintenance configurations; hotpatching for Windows Server",
  "objectives": [
   "Students will be able to explain the role of assessment and periodic assessment in Azure Update Manager for Azure VMs and Arc-enabled servers.",
   "Students will be able to choose between a one-time update and a maintenance configuration for a given patching requirement.",
   "Students will be able to configure the targeting of a maintenance configuration with static machines and dynamic scopes, and identify the Customer Managed Schedules prerequisite.",
   "Students will be able to describe the hotpatch cycle of baseline and hotpatch months and where hotpatching is available."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list student answers on the board under 'now' and 'every month'."
   ],
   [
    13,
    "Teach",
    "Introduce Update Manager as the replacement for Automation Update Management. Cover assessment and periodic assessment, then one-time updates versus maintenance configurations, dynamic scopes and pre/post events. Stress Customer Managed Schedules on Azure VMs. Finish with the hotpatch cycle drawn as a 12-month calendar with four baseline months marked."
   ],
   [
    17,
    "Activity",
    "Groups design a patch plan for the fictional organization in the activity and present it."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions on reboot risk and automation."
   ],
   [
    5,
    "Exit ticket",
    "Collect the three exit questions on paper."
   ]
  ],
  "warmup": "If a critical security fix came out this afternoon and your next patch window is in two weeks, what would you do, and how would you know which servers actually need it?",
  "activity": {
   "title": "Design the patch calendar",
   "materials": "Whiteboard or chart paper per group, markers, a printed scenario sheet listing 30 fictional servers (Azure VMs and Arc-enabled servers) with tags, roles and reboot constraints, and a printed blank 12-month calendar.",
   "steps": [
    "Hand each group the scenario sheet for the fictional Riverbend Clinic: web servers, database servers that may only reboot on Sundays, and four Azure Edition servers enrolled in hotpatching.",
    "Groups decide which maintenance configurations they need, their windows and recurrence, and whether each uses static machines or a dynamic scope based on tags. They write the reboot setting for each.",
    "On the calendar, groups mark the quarterly baseline months for the hotpatch servers and explain when those servers will restart.",
    "Introduce a surprise: an urgent advisory on a Wednesday. Groups write the exact steps they would take, from Check for updates to a one-time update.",
    "Each group presents in two minutes; the class checks whether every Azure VM was set to Customer Managed Schedules."
   ]
  },
  "discussion": [
   "What are the risks of choosing 'always reboot' versus 'never reboot' in a maintenance configuration?",
   "How do dynamic scopes based on tags change the way a team onboards new servers, and what happens if someone forgets a tag?",
   "Hotpatching reduces restarts. What operational benefits and limits does that bring for a team that runs critical services?"
  ],
  "exit": [
   [
    "Which Update Manager feature would you use for a recurring monthly window on all servers tagged Env=Prod?",
    "A maintenance configuration with a dynamic scope on that tag."
   ],
   [
    "An Azure VM ignores its maintenance configuration and patches on its own. What setting should you check?",
    "Its patch orchestration mode; it must be Customer Managed Schedules."
   ],
   [
    "How many planned reboots per year does a hotpatch-enabled server typically have, and why?",
    "About four, because quarterly baseline months install a full cumulative update that requires a restart."
   ]
  ],
  "differentiation": [
   "Support: Provide a flowchart with two branches, 'urgent now' leading to one-time update and 'recurring' leading to maintenance configuration, plus a checklist of prerequisites to tick off during the activity.",
   "Extend: Ask fast finishers to design pre- and post-maintenance events for a load-balanced web tier, describing what each script must do to drain and restore a node, and how they would verify success."
  ]
 },
 {
  "t": "Azure Automation runbooks and hybrid runbook workers",
  "objectives": [
   "Students will be able to describe the components of Azure Automation: Automation account, runbook types, draft and published versions, schedules, webhooks and shared assets.",
   "Students will be able to explain why the Azure sandbox cannot reach on-premises resources and how a hybrid runbook worker solves this.",
   "Students will be able to plan an extension-based hybrid worker deployment on Arc-enabled servers, including worker groups, credentials and modules.",
   "Students will be able to troubleshoot common runbook failures such as unpublished changes, missing modules and insufficient permissions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list chores on the board; circle the ones that touch on-premises systems."
   ],
   [
    12,
    "Teach",
    "Explain the Automation account, runbook types, draft versus published, start methods and shared assets. Show `Connect-AzAccount -Identity` and explain why Run As is gone. Then draw the sandbox outside the corporate network and a hybrid worker inside, pulling jobs over outbound HTTPS. Cover worker groups, extension-based deployment through Arc, Local System versus hybrid worker credentials, and local modules."
   ],
   [
    18,
    "Activity",
    "Run the pair troubleshooting exercise with printed job logs."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions about security and resilience."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Name one administrative chore you or an IT team might repeat every week. If a script did it automatically, what would that script need access to?",
  "activity": {
   "title": "Runbook failure clinic",
   "materials": "Printed cards, each with a short fictional job log excerpt and runbook settings (run on: Azure or a worker group, published or draft, credentials, modules); whiteboard; sticky notes.",
   "steps": [
    "Pair students and give each pair four failure cards, for example: a runbook that still shows last week's behavior after an edit; a sandbox job that cannot resolve an on-premises server name; a worker job failing with an unrecognized AD cmdlet; a worker job getting access denied in AD.",
    "Pairs diagnose each card, write the root cause and the fix on a sticky note, and name the feature involved (publishing, hybrid worker, local modules, hybrid worker credentials).",
    "Pairs swap one card with a neighboring pair and verify each other's answer.",
    "The teacher reviews the cards on the projector and builds a class troubleshooting checklist on the board."
   ]
  },
  "discussion": [
   "What are the security implications of a webhook URL, and how should a team store and rotate it?",
   "Why might an organization prefer two hybrid workers in a group instead of one, and what else must be identical on both?",
   "When would you run a runbook in the sandbox rather than on a hybrid worker?"
  ],
  "exit": [
   [
    "A runbook must restart a service on an on-premises server every night. Where should it run?",
    "On a hybrid runbook worker group whose members can reach the server."
   ],
   [
    "What has replaced Run As accounts for runbook authentication to Azure?",
    "The Automation account's managed identity."
   ],
   [
    "A runbook change is not reflected in scheduled runs. What is the likely cause?",
    "The runbook was saved as a draft but not published."
   ]
  ],
  "differentiation": [
   "Support: Give students a labeled diagram showing the Automation account, sandbox, Arc-enabled worker and on-premises servers, with arrows for the outbound HTTPS connection, to reference during the activity.",
   "Extend: Ask fast finishers to write pseudocode for a runbook that uses a credential asset and the managed identity in the same job, explaining which resources each identity is used for and why."
  ]
 },
 {
  "t": "Storage Migration Service: inventory, transfer and cut over of file servers, including identity takeover",
  "objectives": [
   "Students will be able to identify the orchestrator, source and destination roles in Storage Migration Service and the requirements for each.",
   "Students will be able to sequence the inventory, transfer and cut over phases and explain what each phase moves.",
   "Students will be able to explain how cut over transfers the source's name and IP address and what happens to the source.",
   "Students will be able to plan a file server replacement that minimizes downtime using delta transfers."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect what would break if a file server simply disappeared and was replaced."
   ],
   [
    13,
    "Teach",
    "Draw orchestrator, source and destination on the board with the WAC console. Cover requirements: Windows Server 2019 or later orchestrator, admin rights, firewall rule groups, optional proxy. Walk through the three phases and spend extra time on cut over, showing before-and-after names and IP addresses for both servers."
   ],
   [
    17,
    "Activity",
    "Run the cutover role-play described in the activity."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reflect on risk and rollback."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions."
   ]
  ],
  "warmup": "If your school's file server were replaced tonight by a new machine with a different name, what would break for users tomorrow morning?",
  "activity": {
   "title": "Cutover role-play",
   "materials": "Name cards for students (OLD server, NEW server, Orchestrator, three Client PCs, Domain Controller), sticky notes showing names and IP addresses, whiteboard for the timeline.",
   "steps": [
    "Assign roles. OLD wears a sticky note 'FS01, 10.0.0.20'; NEW wears 'TEMP-NEW, 10.0.0.50'. Clients hold cards saying 'Mapped drive: \\\\FS01\\Projects'.",
    "The Orchestrator student narrates inventory, asking OLD to read out its shares and local groups, which another student records on the board.",
    "Simulate transfer and a later delta transfer, with the class discussing why the second pass is shorter.",
    "Perform cut over: OLD and NEW swap sticky notes as the narrator explains, OLD receives a new random name and IP, and both 'restart' by sitting down and standing up. Clients then try their mapped drive and confirm they reach NEW.",
    "Groups write on the board one thing that could go wrong at each phase and its fix, such as blocked firewall rules or locked files."
   ]
  },
  "discussion": [
   "Why might an administrator choose to stop after transfer and not run cut over?",
   "How long should the old server be kept after cut over, and what should be checked before decommissioning it?",
   "What risks remain even with a perfect SMS run, for example with applications that store data in unusual places?"
  ],
  "exit": [
   [
    "What minimum Windows Server version must the SMS orchestrator run?",
    "Windows Server 2019."
   ],
   [
    "During cut over, what does the destination take from the source?",
    "The source's computer name, AD computer identity and IP addresses."
   ],
   [
    "How can you keep the final outage short for a busy file server?",
    "Run the bulk transfer early, then a delta transfer just before cut over."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-column handout labeled Inventory, Transfer, Cut over with blanks to fill in what each phase does, and let struggling students complete it during the role-play.",
   "Extend: Ask fast finishers to compare SMS with Azure File Sync and describe a design that uses SMS to migrate to an Azure VM and then enables cloud tiering, listing what each tool is responsible for."
  ]
 },
 {
  "t": "Azure Migrate: discovery and assessment, server migration of Hyper-V, VMware and physical servers to Azure",
  "objectives": [
   "Students will be able to describe the Azure Migrate project, appliance, discovery and dependency analysis.",
   "Students will be able to compare performance-based and as on-premises sizing and interpret assessment readiness categories.",
   "Students will be able to select the correct migration method and components for VMware, Hyper-V and physical servers.",
   "Students will be able to sequence the replication, test migration, migration and Complete migration steps."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about moving house and connect answers to discovery, assessment and migration."
   ],
   [
    13,
    "Teach",
    "Present the Azure Migrate project and its two tools. Explain the appliance and its credentials per source, dependency analysis and CSV import. Show a sample assessment readiness table and contrast sizing criteria. Then draw a three-row table for VMware, Hyper-V and physical showing method and components, and walk through the workflow."
   ],
   [
    17,
    "Activity",
    "Groups complete the migration planning matrix and dependency grouping exercise."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions on cost and risk."
   ],
   [
    5,
    "Exit ticket",
    "Collect the three exit answers."
   ]
  ],
  "warmup": "If you were moving to a new home, what would you do before the truck arrives so that nothing gets lost and you do not pay for a truck that is too big?",
  "activity": {
   "title": "Plan the move: matrix and dependency map",
   "materials": "Printed fictional server list (about 15 servers with source type, allocated size, average utilization and observed connections), whiteboard or chart paper, markers, sticky notes.",
   "steps": [
    "Give each group the server list for the fictional Harborview Logistics with VMware, Hyper-V and physical servers mixed together.",
    "Groups fill in a matrix: for each source type, the discovery credentials, the migration method (agentless or agent-based) and what gets installed where.",
    "Using the listed connections, groups draw a dependency map with sticky notes and circle the servers that must move together as one migration group.",
    "For two servers, groups compare as on-premises sizing with what performance-based sizing would suggest from the utilization numbers, and explain the cost difference.",
    "Each group writes its migration sequence for one group: replicate, test migration, migrate, Complete migration, post-migration tasks."
   ]
  },
  "discussion": [
   "What risks arise if a team skips dependency analysis and migrates servers one by one?",
   "When might as on-premises sizing be the safer choice despite higher cost?",
   "Why is a test migration into an isolated network valuable, and what should the team verify during it?"
  ],
  "exit": [
   [
    "What does a Hyper-V migration require on the hosts?",
    "The Azure Site Recovery provider and Recovery Services agent."
   ],
   [
    "Which component must be installed on each physical server for migration?",
    "The Mobility service agent, with a replication appliance."
   ],
   [
    "What is the final step in the Azure Migrate workflow that stops replication?",
    "Complete migration."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed matrix with the VMware row filled in as a model, so students can follow the pattern for Hyper-V and physical servers.",
   "Extend: Ask fast finishers to identify which assessment settings (region, reserved instances, Azure Hybrid Benefit, VM series) would most change the cost estimate for the scenario and justify their choices."
  ]
 },
 {
  "t": "Upgrading and migrating server roles (in-place upgrade paths, migrating DHCP, print and IIS workloads)",
  "objectives": [
   "Students will be able to compare in-place upgrade and migration and state the main in-place upgrade restrictions.",
   "Students will be able to sequence the steps to migrate DHCP with Export-DhcpServer, Import-DhcpServer and Add-DhcpServerInDC, including relay updates.",
   "Students will be able to describe print server migration with printbrm and IIS migration with Web Deploy, including certificates and service accounts.",
   "Students will be able to apply the general role migration pattern to a new scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about renovating versus moving and record pros and cons on the board."
   ],
   [
    13,
    "Teach",
    "Contrast in-place upgrade with migration, list upgrade restrictions (installation option, edition, upgrade matrix, DISM Set-Edition). Then walk through DHCP, print and IIS migration with the key commands on the projector, and finish with the general pattern."
   ],
   [
    17,
    "Activity",
    "Groups sequence migration runbook strips for each role."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions on rollback and risk."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Would you rather renovate your house while living in it or build a new one next door and move? What are the risks of each?",
  "activity": {
   "title": "Migration runbook strips",
   "materials": "Printed strips, each holding one migration step (for example 'Run Export-DhcpServer -Leases', 'Update IP helper on routers', 'printbrm -r on new server', 'Import PFX certificate'), envelopes per group, whiteboard.",
   "steps": [
    "Give each group three envelopes, one each for DHCP, print and IIS, with steps shuffled and two distractor steps that do not belong.",
    "Groups arrange the strips in the correct order and remove the distractors, then tape them to the whiteboard.",
    "Groups mark with a sticky note the step most likely to be forgotten in each role and what symptom users would report.",
    "The teacher reviews each sequence aloud, and groups correct their boards."
   ]
  },
  "discussion": [
   "Why does keeping the old server available make migration safer than an in-place upgrade?",
   "What should be tested before switching clients to a new DHCP or print server?",
   "How would you decide between an in-place upgrade and a migration for a small, low-risk utility server?"
  ],
  "exit": [
   [
    "What must you do in AD so a migrated DHCP server can lease addresses?",
    "Authorize it with Add-DhcpServerInDC."
   ],
   [
    "Name two things Web Deploy does not move automatically for an IIS site.",
    "TLS certificates with private keys and service accounts (also required role services)."
   ],
   [
    "Name one change an in-place upgrade cannot make.",
    "Switching between Server Core and Desktop Experience, or going from Datacenter to Standard edition."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card listing each command with a plain-language description, and let students use it while sequencing strips.",
   "Extend: Ask fast finishers to plan the migration of a DHCP failover pair, describing how they would reconfigure the failover relationship and avoid duplicate leases during the switch."
  ]
 },
 {
  "t": "Hyper-V VM configuration: generation 1 vs 2, dynamic memory, integration services, enhanced session mode, Secure Boot and virtual TPM",
  "objectives": [
   "Students will be able to compare generation 1 and generation 2 VMs and choose the right generation for a guest.",
   "Students will be able to explain each dynamic memory setting and when static memory is preferable.",
   "Students will be able to identify the purpose of each integration service and the requirements for enhanced session mode.",
   "Students will be able to configure Secure Boot templates and a vTPM with a key protector to meet a security requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student guesses about why old and new VMs would differ."
   ],
   [
    13,
    "Teach",
    "Draw a two-column comparison of generation 1 and 2. Explain dynamic memory using a bar diagram with startup, minimum, maximum and buffer. List integration services with one example each, then enhanced session mode, Secure Boot templates and vTPM with the PowerShell lines on the projector."
   ],
   [
    17,
    "Activity",
    "Run the VM configuration ticket triage described below."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions about trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on paper."
   ]
  ],
  "warmup": "If you buy a car today, what features does it have that a car from 2005 does not? Which of those could you add to the old car afterward?",
  "activity": {
   "title": "Hyper-V ticket triage",
   "materials": "Printed help-desk ticket cards (eight to ten) each describing a symptom and the VM's current settings, a projector showing a reference table, sticky notes, whiteboard.",
   "steps": [
    "Pairs receive ticket cards such as 'Ubuntu VM shows Secure Boot violation', 'Cannot enable BitLocker in a generation 1 VM', 'Copy-VMFile fails', 'DC clock drifts with host', 'VMConnect cannot paste text' and 'Database vendor requires fixed memory'.",
    "For each card, pairs write the root cause and the fix, naming the exact setting or cmdlet where possible.",
    "Pairs flag any ticket that requires building a new VM rather than changing a setting, and explain why.",
    "Pairs present two tickets to the class; the teacher confirms or corrects using the reference table."
   ]
  },
  "discussion": [
   "What are the trade-offs of dynamic memory on a densely packed host?",
   "Why is a key protector important for a vTPM, and what problem do shielded VMs solve in production?",
   "When, if ever, would you still create a generation 1 VM today?"
  ],
  "exit": [
   [
    "Which generation must a VM be to use Secure Boot and a vTPM?",
    "Generation 2."
   ],
   [
    "What does the memory buffer setting control?",
    "The percentage of extra memory Hyper-V tries to keep available above the VM's current demand."
   ],
   [
    "Which Secure Boot template suits most Linux distributions?",
    "Microsoft UEFI Certificate Authority."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision tree that starts with 'Is the guest 32-bit or does it need legacy PXE?' and leads to generation and security settings, to use during triage.",
   "Extend: Ask fast finishers to explain how dynamic memory, memory weight and the buffer interact when two VMs compete for memory on a full host, using a worked numeric example they invent."
  ]
 },
 {
  "t": "Nested virtualization requirements; PowerShell Direct",
  "objectives": [
   "Students will be able to list the host and VM requirements for nested virtualization.",
   "Students will be able to explain the purpose of ExposeVirtualizationExtensions, static memory and MAC address spoofing in a nested lab.",
   "Students will be able to describe when and how to use PowerShell Direct with -VMName and guest credentials.",
   "Students will be able to troubleshoot common nested virtualization and PowerShell Direct failures."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect ideas about building a cluster lab with no extra hardware."
   ],
   [
    12,
    "Teach",
    "Explain nested virtualization uses and requirements, then walk through the three PowerShell lines and what each fixes. Switch to PowerShell Direct: VMBus, cmdlets, and the requirements (same host, running VM, supported guest, guest credentials)."
   ],
   [
    18,
    "Activity",
    "Run the nested lab build-sheet exercise in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "You need to practice building a two-server cluster but you only have one laptop. What would you need the laptop to be able to do?",
  "activity": {
   "title": "Nested lab build sheet and fault finding",
   "materials": "Printed build-sheet template, printed fault cards with short error messages, projector with the three PowerShell commands, whiteboard.",
   "steps": [
    "Pairs fill in a build sheet for a two-node nested cluster lab: host CPU requirements, VM power state, processor setting, memory type and size, and network approach (MAC spoofing or NAT).",
    "Hand out fault cards such as 'Hyper-V cannot be installed: virtualization support missing', 'Inner VMs get no DHCP address', 'Set-VMProcessor fails because the VM is running' and 'Enter-PSSession -VMName fails from a workstation'. Pairs diagnose each.",
    "Pairs write the PowerShell Direct commands they would use to rename and configure a freshly deployed VM that has no network, including where they run them and which credentials they supply.",
    "The class compiles a combined checklist on the whiteboard."
   ]
  },
  "discussion": [
   "Why is nested virtualization appropriate for labs but usually not for heavy production workloads?",
   "What security implications does PowerShell Direct have, given that it bypasses the network?",
   "When would you choose a NAT switch inside the outer VM instead of MAC address spoofing?"
  ],
  "exit": [
   [
    "Which cmdlet and parameter pass virtualization extensions into a VM?",
    "Set-VMProcessor -ExposeVirtualizationExtensions $true."
   ],
   [
    "What memory configuration must a nested Hyper-V VM use?",
    "Static memory (dynamic memory disabled)."
   ],
   [
    "Where must you run PowerShell Direct, and what credentials does it need?",
    "On the Hyper-V host running the VM, with credentials valid inside the guest."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of a laptop host, an outer VM and two inner VMs with arrows showing where each setting applies, for students to annotate.",
   "Extend: Ask fast finishers to design a script that uses PowerShell Direct to rename, set an IP address and join a newly created VM to a domain, describing the credential objects needed at each step."
  ]
 },
 {
  "t": "Virtual disks: VHD vs VHDX, fixed, dynamic and differencing disks; shared VHDX / VHD Set",
  "objectives": [
   "Students will be able to compare VHD and VHDX formats, including size limits and resilience features.",
   "Students will be able to choose between fixed, dynamically expanding and differencing disks for a scenario and explain the risks of each.",
   "Students will be able to use the main virtual disk cmdlets (New-VHD, Convert-VHD, Resize-VHD, Merge-VHD, Optimize-VHD) appropriately.",
   "Students will be able to select a VHD Set over shared VHDX for guest clustering and state its storage requirements."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about storage units versus expanding bags and connect it to disk types."
   ],
   [
    13,
    "Teach",
    "Compare VHD and VHDX in a table. Explain fixed, dynamic and differencing types with a diagram of a parent and three children. Show the cmdlets on the projector. Finish with guest clustering: shared VHDX limits and the VHD Set, its files and requirements."
   ],
   [
    17,
    "Activity",
    "Groups complete the storage design challenge."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions on trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Collect the three exit answers."
   ]
  ],
  "warmup": "If you had to store clothes for a year, would you rent the biggest storage unit now or buy bags that expand as you add clothes? What could go wrong with each?",
  "activity": {
   "title": "Storage design challenge",
   "materials": "Printed scenario cards (six to eight), whiteboard, sticky notes in three colors (format, type, sharing), projector with a summary table.",
   "steps": [
    "Give groups scenario cards such as 'Production SQL Server data disk of 3 TB', '30 identical classroom VMs on a small SSD', 'Two-node guest file server cluster that must be backed up at host level', 'Old appliance that only reads VHD'.",
    "For each card, groups place sticky notes stating the format, the disk type and any sharing option, with a one-sentence reason.",
    "Groups write the PowerShell command they would use to create or convert the disk in two of the scenarios.",
    "Groups identify one scenario where a wrong choice could pause VMs or break disks and explain the failure.",
    "The teacher reveals recommended answers and discusses any disagreements."
   ]
  },
  "discussion": [
   "When is the space saving of dynamic disks worth the monitoring burden?",
   "Why do long differencing chains hurt performance, and how would you keep chains short?",
   "What new capabilities does a VHD Set bring compared with shared VHDX, and why do they matter for operations teams?"
  ],
  "exit": [
   [
    "Which format must a 4 TB virtual disk use?",
    "VHDX."
   ],
   [
    "What is the main risk of overcommitted dynamic disks?",
    "They can fill the host volume, which pauses VMs."
   ],
   [
    "Which shared disk format supports online resize and Hyper-V Replica for guest clusters?",
    "VHD Set (.vhds)."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page comparison chart of formats and types with icons, and let struggling students start with the two simplest scenario cards.",
   "Extend: Ask fast finishers to calculate the space used by 20 differencing VMs (each with a 4 GB child) versus 20 full copies of a 40 GB image, then discuss when they would merge children back."
  ]
 },
 {
  "t": "Checkpoints: production vs standard; why checkpoints are not backups",
  "objectives": [
   "Students will be able to explain how checkpoints use AVHDX differencing disks and what happens when a checkpoint is applied or deleted.",
   "Students will be able to compare standard and production checkpoints and choose the right checkpoint type setting.",
   "Students will be able to justify, with at least three reasons, why checkpoints are not backups.",
   "Students will be able to describe how virtualization-aware domain controllers use VM-GenerationID."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about video game save points and spare keys; record answers."
   ],
   [
    13,
    "Teach",
    "Draw a VHDX with an AVHDX chain growing as checkpoints are taken. Compare standard and production checkpoints and the CheckpointType options. Explain apply versus delete and merge. Spend time on the four reasons checkpoints are not backups and finish with VM-GenerationID."
   ],
   [
    17,
    "Activity",
    "Run the 'checkpoint or backup' debate cards activity."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions."
   ]
  ],
  "warmup": "In a video game, a save point lets you go back. If the console's hard drive failed, would your save points help you? What would you need instead?",
  "activity": {
   "title": "Checkpoint or backup: scenario cards",
   "materials": "Printed scenario cards (about 10), whiteboard divided into 'Standard checkpoint', 'Production checkpoint', 'Backup', and 'Neither or both'; sticky notes.",
   "steps": [
    "Give groups cards such as 'Test a registry change for one hour', 'Keep 90 days of history for compliance', 'Survive a host RAID failure', 'Return a lab VM to the exact screen state students left', 'Restore point for a database before an upgrade' and 'Roll back a domain controller'.",
    "Groups place each card in a column and write a one-line justification on a sticky note.",
    "Each group picks one card and role-plays explaining their choice to a skeptical manager, played by another group.",
    "The teacher reviews the board, correcting placements and highlighting the reasons checkpoints are not backups."
   ]
  },
  "discussion": [
   "Why might a team drift into using checkpoints as backups, and how would you prevent it?",
   "When is a standard checkpoint more useful than a production checkpoint?",
   "What could go wrong if a domain controller were reverted without VM-GenerationID protection?"
  ],
  "exit": [
   [
    "What file does Hyper-V create when a checkpoint is taken?",
    "An AVHDX differencing disk that receives new writes."
   ],
   [
    "Which checkpoint type gives an application-consistent restore point without memory?",
    "A production checkpoint."
   ],
   [
    "Name one reason a checkpoint cannot replace a backup.",
    "It lives on the same storage as the VM (or depends on the parent disk, lacks retention, or degrades performance)."
   ]
  ],
  "differentiation": [
   "Support: Give students a visual of a disk chain with labeled parent and AVHDX files, and a sentence frame: 'A checkpoint is not a backup because ...'.",
   "Extend: Ask fast finishers to describe how a backup product might use a production checkpoint internally, step by step, and what happens to the AVHDX after the backup completes."
  ]
 },
 {
  "t": "Hyper-V virtual switches (external, internal, private) and Switch Embedded Teaming",
  "objectives": [
   "Students will be able to compare external, internal and private virtual switches and choose one for a scenario.",
   "Students will be able to configure VM adapter protections such as VLAN ID, DHCP guard and router guard.",
   "Students will be able to explain why Switch Embedded Teaming replaces LBFO for Hyper-V hosts and state its rules.",
   "Students will be able to read a SET configuration in PowerShell and describe what each command does."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch student answers as rooms and doors on the board."
   ],
   [
    12,
    "Teach",
    "Draw a host with three switches and show who can talk to whom. Cover the management OS sharing option and NAT with an internal switch. List adapter settings. Then contrast LBFO and SET, cover the eight-adapter, identical-NIC and switch-independent rules, load-balancing algorithms, and walk through the PowerShell block."
   ],
   [
    18,
    "Activity",
    "Groups whiteboard network designs for three scenarios and peer review."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Collect the three exit answers."
   ]
  ],
  "warmup": "Picture an office building with rooms: some open to the street, some only connected to the manager's office, and some sealed. Which would you use for a confidential meeting, and why?",
  "activity": {
   "title": "Whiteboard the host network",
   "materials": "Whiteboard or chart paper, markers, printed scenario cards, sticky notes for VMs and adapters.",
   "steps": [
    "Give each group three scenario cards: an isolated malware lab, a developer laptop where VMs need internet through the host only, and a production host with two RDMA NICs needing management, storage and live migration networks.",
    "Groups draw the host, physical NICs, virtual switches and VMs for each scenario, labeling switch types and any host vNICs.",
    "For the production host, groups write the PowerShell commands to create a SET switch and add host vNICs, and choose a load-balancing algorithm with a reason.",
    "Groups rotate to review another group's drawing and leave one sticky note with a question or correction.",
    "The teacher reviews common errors, such as using an internal switch for isolation or adding LACP to SET."
   ]
  },
  "discussion": [
   "Why is it risky to clear the management OS sharing option on a host with a single physical NIC?",
   "What problems do DHCP guard and router guard prevent, and why are they disabled by default?",
   "What does a converged SET design gain, and what new risks does putting all traffic on one team create?"
  ],
  "exit": [
   [
    "Which switch type should an isolated lab use if even the host must not reach the VMs?",
    "A private switch."
   ],
   [
    "Name two rules of Switch Embedded Teaming.",
    "Up to eight identical adapters; switch-independent mode only (no LACP)."
   ],
   [
    "Which adapter setting stops a VM from acting as a rogue DHCP server?",
    "DHCP guard."
   ]
  ],
  "differentiation": [
   "Support: Provide a reachability table with columns VM-to-VM, VM-to-host and VM-to-physical network for students to fill in for each switch type before the activity.",
   "Extend: Ask fast finishers to compare the Hyper-V Port and Dynamic load-balancing algorithms for a host running one very busy VM versus many small VMs, and recommend one for each."
  ]
 },
 {
  "t": "Live migration and storage migration between Hyper-V hosts; Kerberos vs CredSSP authentication",
  "objectives": [
   "Students will be able to describe how live migration copies memory iteratively and compare clustered, shared-nothing and storage migration.",
   "Students will be able to list the prerequisites for non-clustered live migration, including processor vendor and compatibility mode.",
   "Students will be able to compare CredSSP and Kerberos authentication and diagnose a migration that fails from a remote console.",
   "Students will be able to configure Kerberos constrained delegation for cifs and Microsoft Virtual System Migration Service."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about moving a running service and collect ideas."
   ],
   [
    12,
    "Teach",
    "Draw the iterative memory copy as shrinking arrows. Compare the three migration forms with their cmdlets. List prerequisites and performance options. Then explain CredSSP versus Kerberos with a diagram of the double hop, and show the delegation dialog steps and the Set-VMHost command."
   ],
   [
    18,
    "Activity",
    "Pairs work through the delegation role-play and troubleshooting cards."
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
  "warmup": "How could you move a running online store from one server to another without customers noticing? What would have to be copied, and in what order?",
  "activity": {
   "title": "Double hop role-play and migration troubleshooting",
   "materials": "Name cards (Admin laptop, HV01, HV02, Domain Controller), printed 'credential' cards and 'delegation permission' slips listing cifs and Microsoft Virtual System Migration Service, printed troubleshooting cards, whiteboard.",
   "steps": [
    "Four students take the roles. The Admin laptop tries to pass a credential card to HV01, which must pass it on to HV02. Under CredSSP rules, HV02 refuses unless the Admin stands at HV01 (signed in locally).",
    "Switch to Kerberos rules: the Domain Controller hands HV01 and HV02 delegation slips naming each other's cifs and migration service. The Admin now succeeds from the laptop. Then remove the cifs entry and show that a shared-nothing move with storage fails.",
    "Pairs work through troubleshooting cards, such as 'Move fails from laptop, works on host console', 'Intel to AMD move fails', 'Move fails between Intel generations' and 'Need to move disks to new LUN without downtime', writing cause and fix.",
    "The class reviews answers together, building a symptom-to-fix table on the whiteboard."
   ]
  },
  "discussion": [
   "Why is Kerberos constrained delegation safer than allowing a host to delegate to any service?",
   "When would you choose the SMB performance option over Compression?",
   "Why does clustered live migration not need the same delegation setup as shared-nothing migration?"
  ],
  "exit": [
   [
    "A migration works when you RDP to the source host but fails from your workstation. Why?",
    "The hosts use CredSSP, which requires starting the migration while signed in to the source host."
   ],
   [
    "Which services must be listed in constrained delegation for Kerberos live migration?",
    "cifs and Microsoft Virtual System Migration Service."
   ],
   [
    "Which cmdlet moves a running VM's storage to a new location on the same host?",
    "Move-VMStorage."
   ]
  ],
  "differentiation": [
   "Support: Provide a flowchart that starts with 'Is the VM clustered?' and branches through authentication type, processor vendor and storage needs to the correct action.",
   "Extend: Ask fast finishers to design a host maintenance procedure for a two-host stand-alone environment that uses Kerberos, SMB performance options and simultaneous migration limits, and explain how they would verify it before a real patch night."
  ]
 },
 {
  "t": "Hyper-V Replica: primary and replica servers, replication frequency, recovery points, planned and unplanned failover, test failover",
  "objectives": [
   "Students will be able to describe the roles of the primary server, replica server and Hyper-V Replica Broker and configure authentication and firewall settings for each scenario.",
   "Students will be able to compare test, planned and unplanned failover by where each starts and whether it can lose data.",
   "Students will be able to choose a replication frequency and recovery point settings that meet a stated data loss requirement.",
   "Students will be able to select the correct failover action for a given outage scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the whiteboard. Point out that the answers differ by whether there was warning and whether data loss is acceptable."
   ],
   [
    15,
    "Teach",
    "Walk through setup on the replica side then the primary side, including Kerberos versus certificate authentication and the firewall rule. Draw a timeline showing replication cycles at 30 seconds, 5 minutes and 15 minutes and mark where data loss would fall. Explain recovery points and VSS consistency, then contrast the three failover types in a table: where it runs, whether replication stops, whether data can be lost."
   ],
   [
    15,
    "Activity",
    "Run the failover card sort described below. Circulate and ask each pair to justify one placement aloud."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the card sort to real recovery planning and testing schedules."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your branch server room is flooding right now. Is what you do different from what you would do if you knew about the flood a week in advance? Why?",
  "activity": {
   "title": "Failover card sort",
   "materials": "Printed scenario cards (8 to 10 per pair), a whiteboard divided into three columns labeled Test, Planned and Unplanned, sticky notes.",
   "steps": [
    "Give each pair a set of scenario cards, such as 'quarterly DR drill with no downtime allowed', 'host motherboard fails without warning', 'scheduled power work this weekend' and 'auditor wants proof the replica boots'.",
    "Pairs place each card in a column and write on a sticky note which server they start the action on and whether data can be lost.",
    "Add two setup cards, such as 'replica host is in a workgroup' and 'replica is a three-node cluster', and have pairs write the required configuration (certificate authentication, Hyper-V Replica Broker).",
    "Pairs compare with a neighboring pair and resolve any disagreements, then the teacher reveals the answers and discusses any card that split the room."
   ]
  },
  "discussion": [
   "How would you decide between a 30-second and a 15-minute replication frequency for a business with a slow internet link?",
   "Why might an organization keep 24 hours of recovery points even though it costs storage?",
   "How often should a test failover be run, and who should be in the room when it happens?"
  ],
  "exit": [
   [
    "Which failover type runs on the replica server and may lose data?",
    "Unplanned failover."
   ],
   [
    "Your hosts are in two untrusted forests. Which authentication and port does Hyper-V Replica need?",
    "Certificate-based authentication over HTTPS on port 443."
   ],
   [
    "Does a test failover stop replication?",
    "No. It creates a temporary test VM on the replica server while replication continues."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page table with three rows (test, planned, unplanned) and three columns (where it starts, replication impact, data loss) to fill in during the teach segment and use during the card sort.",
   "Extend: Ask fast finishers to write the PowerShell sequence for an unplanned failover and reversal (Start-VMFailover, Complete-VMFailover, Set-VMReplication -Reverse) and explain what Complete-VMFailover discards."
  ]
 },
 {
  "t": "Azure Site Recovery for Hyper-V and Azure VMs: recovery plans, test failover, RPO and failback",
  "objectives": [
   "Students will be able to define RPO and RTO and explain which ASR settings influence each.",
   "Students will be able to list the components and steps required to replicate Hyper-V VMs and Azure VMs with ASR.",
   "Students will be able to design a recovery plan with ordered groups, scripts and manual actions for a multi-tier application.",
   "Students will be able to sequence test failover, failover, commit, reprotect and failback correctly."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Record answers in two columns on the whiteboard, one for 'how much data lost' and one for 'how long down', then label the columns RPO and RTO."
   ],
   [
    12,
    "Teach",
    "Explain the vault, then the two scenarios: Hyper-V to Azure (Provider and MARS agent, Hyper-V site or VMM cloud, replication policy) and Azure to Azure (Mobility extension, cache storage account, target region). Show recovery plans with groups, runbooks and manual actions, and draw the failback cycle: failover, commit, reprotect, fail back, commit, reprotect."
   ],
   [
    18,
    "Activity",
    "Run the recovery plan whiteboard design activity below. Each group presents its plan in one minute."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to talk about testing culture and cost."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If our school's student records system disappeared right now, how much recent data could we afford to lose, and how long could we wait for it to come back? Are those the same question?",
  "activity": {
   "title": "Design a recovery plan",
   "materials": "Whiteboard or large paper per group, markers, a printed one-page scenario describing a four-tier application (domain controller, SQL Server, app servers, web servers) with an RPO and RTO, sticky notes in two colors.",
   "steps": [
    "Groups read the scenario and write the RPO and RTO at the top of their board, noting which ASR setting affects each.",
    "Groups draw recovery plan groups in order, placing each server on a sticky note, and justify the order by dependency.",
    "Using the second color of sticky note, groups add at least one scripted action (such as a DNS update runbook) and one manual action, marking whether each is a pre-action or post-action.",
    "Groups write the full lifecycle for a real disaster underneath: test failover, failover, commit, reprotect, failback, and note which steps happen in an isolated network.",
    "Each group presents for one minute while others check the order of the lifecycle steps."
   ]
  },
  "discussion": [
   "Why might an organization skip test failovers, and what risk does that create?",
   "When would you pick Hyper-V Replica to a second site instead of ASR to Azure?",
   "Which of your recovery plan steps would you trust to automation, and which need a human decision?"
  ],
  "exit": [
   [
    "A design must lose no more than 5 minutes of data. Is that an RPO or an RTO?",
    "An RPO, because it measures acceptable data loss in time."
   ],
   [
    "What two components are installed on each Hyper-V host that is not managed by VMM?",
    "The Azure Site Recovery Provider and the Microsoft Azure Recovery Services agent."
   ],
   [
    "Put these in order: fail back, reprotect, commit.",
    "Commit, reprotect, then fail back."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed recovery plan diagram with group numbers already drawn, so struggling students only need to place servers and choose one script.",
   "Extend: Ask fast finishers to compare the failback process for Hyper-V to Azure with Azure to Azure, including the option to synchronize only changes before final shutdown."
  ]
 },
 {
  "t": "Azure VMs running Windows Server: Azure Hybrid Benefit, Sysprep and Azure Compute Gallery, extensions, Azure Edition hotpatching",
  "objectives": [
   "Students will be able to explain when Azure Hybrid Benefit applies and how to enable it on a Windows Server VM.",
   "Students will be able to describe the steps to generalize a VM with Sysprep and publish it as an image version in Azure Compute Gallery.",
   "Students will be able to choose an appropriate VM extension or Run Command for a post-deployment task.",
   "Students will be able to identify Azure Edition hotpatching as the solution for reboot-free monthly security updates."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let students vote by show of hands. Reveal that the answer depends on license ownership, setting up Azure Hybrid Benefit."
   ],
   [
    15,
    "Teach",
    "Cover Azure Hybrid Benefit and how to enable it, then the image pipeline: build VM, Sysprep /generalize /oobe /shutdown, capture, gallery definition, version, regional replication. Contrast generalized and specialized. Then list common extensions and Run Command, and finish with Azure Edition hotpatching and quarterly baselines."
   ],
   [
    15,
    "Activity",
    "Run the image pipeline sequencing activity below."
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
  "warmup": "If you already own a car, would you pay a rental company for a car and its parking space, or just the parking space? How might that apply to software licenses in the cloud?",
  "activity": {
   "title": "Image pipeline sequencing and matching",
   "materials": "Printed step cards for the image pipeline (shuffled), printed scenario cards for extensions, tape, whiteboard.",
   "steps": [
    "Give each pair shuffled cards such as 'install roles and updates', 'run sysprep /generalize /oobe /shutdown', 'wait for Stopped', 'capture to gallery', 'create image definition', 'publish version 1.0.0', 'replicate to second region', 'deploy new VM'. Pairs tape them in order on the whiteboard.",
    "Add one distractor card, 'start the source VM and use it in production', and ask pairs to explain why it does not belong.",
    "Hand out scenario cards (run a setup script after deploy, rotate certificates from Key Vault, collect logs, fix a firewall rule with no network access, avoid monthly reboots, stop paying for licenses twice) and have pairs match each to Custom Script Extension, Key Vault extension, Azure Monitor Agent, Run Command, Azure Edition hotpatching or Azure Hybrid Benefit.",
    "Review answers as a class, asking one pair to defend each match."
   ]
  },
  "discussion": [
   "What risks come with sharing a gallery image across tenants, and how would you control them?",
   "Why might a team still schedule reboots even when using hotpatching?",
   "Who in an organization should be responsible for confirming Azure Hybrid Benefit license eligibility?"
  ],
  "exit": [
   [
    "What Sysprep switch removes the SID so an image can be deployed many times?",
    "/generalize."
   ],
   [
    "You want monthly security updates on an Azure VM without restarts. What do you deploy?",
    "Windows Server Datacenter: Azure Edition from a supported image, with hotpatching managed by Azure Update Manager."
   ],
   [
    "What license type value enables Azure Hybrid Benefit for Windows Server with PowerShell or the CLI?",
    "Windows_Server."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a flow diagram with blank boxes for the image pipeline and a word bank, and pair them with a confident partner for the matching round.",
   "Extend: Ask fast finishers to explain when they would choose a specialized image over a generalized one, and how they would roll out version 1.1.0 while keeping 1.0.0 available for rollback."
  ]
 },
 {
  "t": "DNS zones: primary, secondary, stub and AD-integrated; replication scope; secure dynamic updates",
  "objectives": [
   "Students will be able to distinguish primary, secondary, stub and AD-integrated zones by storage location, writability and replication method.",
   "Students will be able to choose the correct replication scope for an AD-integrated zone given which DCs need it.",
   "Students will be able to explain how Secure only dynamic updates prevent record hijacking and why they require AD integration.",
   "Students will be able to select an appropriate zone type for a branch, partner or merger scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the hijacked record. Collect guesses and park them on the whiteboard to revisit at the end."
   ],
   [
    15,
    "Teach",
    "Draw the four zone types as boxes showing storage (file or AD), writable or read-only, and how copies move (zone transfer or AD replication). Then draw the forest with two domains and shade which DCs receive a zone for each replication scope. Finish with dynamic update options and aging and scavenging."
   ],
   [
    15,
    "Activity",
    "Run the zone type role-play below."
   ],
   [
    5,
    "Discuss",
    "Return to the warm-up guesses and correct them, then use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A student's laptop registered itself in DNS with the same name as the school's grade book server, and now everyone is sent to the laptop. What setting do you think allowed that?",
  "activity": {
   "title": "Zone type role-play",
   "materials": "Printed role cards (Primary DNS server, Secondary DNS server, Stub zone server, Domain controller A, Domain controller B, Rogue laptop, Domain-joined PC), index cards to act as DNS records, a marker.",
   "steps": [
    "Assign roles to students and give the primary and DCs a few index-card records. Students physically pass index cards to act out a zone transfer from the primary to the secondary, then an AD replication between DC A and DC B.",
    "Ask the secondary to try to change a record and have the class explain why it cannot.",
    "The rogue laptop tries to replace the grade book server's card. Run it twice: once with Nonsecure and secure (it succeeds) and once with Secure only on an AD-integrated zone (the owning DC refuses because the laptop is not authenticated and does not own the record).",
    "The stub zone server keeps only cards labeled SOA, NS and glue A for a partner zone, and refreshes them when the partner adds a name server.",
    "Debrief by writing on the whiteboard which zone types can be AD-integrated and which update setting they would choose."
   ]
  },
  "discussion": [
   "Why would anyone still use file-based primary and secondary zones in a domain environment?",
   "What could go wrong if you enabled scavenging with very short intervals?",
   "When would a custom application directory partition be worth the extra planning?"
  ],
  "exit": [
   [
    "Can a secondary zone be AD-integrated?",
    "No. Only primary and stub zones can be AD-integrated."
   ],
   [
    "Which dynamic update setting stops unauthenticated devices from overwriting records?",
    "Secure only, available on AD-integrated zones."
   ],
   [
    "Which replication scope would you pick so every DC that runs DNS in the whole forest gets a zone?",
    "To all DNS servers running on domain controllers in this forest (ForestDnsZones)."
   ]
  ],
  "differentiation": [
   "Support: Provide a comparison grid with rows for each zone type and columns for storage, writable, replication method and can be AD-integrated, partially filled in, for students to complete.",
   "Extend: Ask fast finishers to write the PowerShell commands to create an AD-integrated primary zone with domain scope, a stub zone and a secondary zone, and to explain what the zone transfer setting on the master must be for the secondary."
  ]
 },
 {
  "t": "Forwarders, conditional forwarders and root hints; DNS policies and zone scopes",
  "objectives": [
   "Students will be able to explain the difference between forwarders, conditional forwarders and root hints and state the order in which they are used.",
   "Students will be able to configure an AD-integrated conditional forwarder for a partner or Azure private endpoint scenario.",
   "Students will be able to describe how DNS policies, client subnets and zone scopes implement geo-location routing and split-brain DNS.",
   "Students will be able to choose the correct resolution tool for a given scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and have students talk with a neighbor for one minute before sharing."
   ],
   [
    15,
    "Teach",
    "Draw a DNS server in the middle of the whiteboard with arrows to a forwarder, a partner's DNS servers and the root servers. Walk a query through the resolution order. Then explain DNS policies with client subnets and zone scopes, projecting the PowerShell example and reading it line by line."
   ],
   [
    15,
    "Activity",
    "Run the trace-the-query activity below."
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
  "warmup": "If you call a big company's main number and ask for someone in a department they do not have, what are the receptionist's options? How might a DNS server have the same options?",
  "activity": {
   "title": "Trace the query",
   "materials": "Projector showing a simple diagram of a DNS server with a local zone, a cache, a conditional forwarder for partner.example, a forwarder and root hints; printed query cards; whiteboard.",
   "steps": [
    "Give each pair query cards such as 'hr.corp.contoso.com (local zone)', 'app.partner.example', 'news site on the internet', 'same news site again a minute later' and 'internet name when the forwarder is down and root hints are enabled'.",
    "Pairs write the path each query takes through the server, in order, and which component finally answers.",
    "Next, give pairs a split-brain scenario card: internal subnet 10.0.0.0/8 should receive 10.1.1.20 for portal.contoso.com, everyone else 203.0.113.20. Pairs write the four objects they need (client subnet, zone scope, record in scope, query resolution policy) and which address stays in the default scope.",
    "Pairs swap papers with another pair to check, then the teacher reviews the trickiest card as a class."
   ]
  },
  "discussion": [
   "What are the security benefits of sending all branch DNS traffic through central forwarders?",
   "Why might it matter that DNS policies are configured per server rather than replicated?",
   "When could time-of-day DNS policies help, and when might caching undermine them?"
  ],
  "exit": [
   [
    "You need queries for one partner domain sent to that partner's DNS servers. What do you configure?",
    "A conditional forwarder for that domain."
   ],
   [
    "Which is tried first: forwarders or root hints?",
    "Forwarders; root hints are the fallback."
   ],
   [
    "What two DNS features combine to give different answers for the same name based on client subnet?",
    "DNS policies (query resolution policies with client subnets) and zone scopes."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a printed flowchart of the resolution order with blanks to fill in, and let them trace queries with a finger before writing.",
   "Extend: Ask fast finishers to design a recursion policy and recursion scope that allows recursion only for internal subnets on a server that also answers public queries."
  ]
 },
 {
  "t": "DNSSEC signing, trust anchors and the Name Resolution Policy Table (NRPT)",
  "objectives": [
   "Students will be able to explain what DNSSEC protects against and what it does not protect.",
   "Students will be able to identify the purpose of RRSIG, DNSKEY, NSEC/NSEC3 and DS records and the roles of the KSK and ZSK.",
   "Students will be able to describe how trust anchors and the Key Master support validation and key rollover in Windows Server DNS.",
   "Students will be able to plan a staged rollout that uses an NRPT rule to make Windows clients require validation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Steer the discussion toward the idea that verification needs a signature and a trusted reference."
   ],
   [
    15,
    "Teach",
    "Explain cache poisoning at a recognition level. Draw the chain of trust from root to .com to the zone with DS and DNSKEY records. Explain KSK and ZSK, then signing in Windows (wizard, Key Master, AD replication), trust anchors and the Trust Points folder, and finally the NRPT and why clients are non-validating."
   ],
   [
    15,
    "Activity",
    "Run the chain of trust envelope activity below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, ending on the staged rollout."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you got a letter claiming to be from your bank, what would convince you it was real? What would you need to already know to check?",
  "activity": {
   "title": "Chain of trust envelopes",
   "materials": "Envelopes, index cards labeled with record types (RRSIG, DNSKEY, NSEC3, DS, A), colored stickers to represent key signatures, one card labeled Trust anchor, a whiteboard.",
   "steps": [
    "Split the class into three groups representing the root zone, a parent zone and the child zone corp.contoso.com. Each group gets cards and two sticker colors (KSK and ZSK).",
    "The child zone group places ZSK stickers on its A and NSEC3 cards (making RRSIGs) and a KSK sticker on its DNSKEY card. It hands a DS card describing its KSK to the parent group, which signs it with the parent's ZSK.",
    "A student acting as the validating DNS server receives only the Trust anchor card and must trace, aloud, how they verify an A record by following DS and DNSKEY back to the anchor.",
    "The teacher then swaps in a forged A card with no valid sticker and the validator must reject it. Repeat with a client student holding an NRPT rule card who accepts only answers the validator marks as verified.",
    "Debrief on the whiteboard: which steps happen on the authoritative server, which on the resolver and which on the client."
   ]
  },
  "discussion": [
   "Why does DNSSEC not stop someone on the network from seeing which sites you look up?",
   "What could break if a KSK rolls over but trust anchors are not updated?",
   "How would you choose a pilot group for NRPT enforcement, and what would you monitor?"
  ],
  "exit": [
   [
    "Does DNSSEC provide confidentiality?",
    "No. It provides authenticity and integrity only."
   ],
   [
    "Which record in the parent zone links to the child zone's key?",
    "The DS (delegation signer) record."
   ],
   [
    "What Group Policy feature makes Windows clients require DNSSEC validation for a namespace?",
    "The Name Resolution Policy Table (NRPT)."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a labeled chain of trust diagram and a matching sheet pairing each record type with a one-line purpose before the activity.",
   "Extend: Ask fast finishers to compare NSEC and NSEC3 and explain why separating the KSK and ZSK reduces work with the parent zone during rollover."
  ]
 },
 {
  "t": "Azure DNS private zones, virtual network links and auto-registration; Azure DNS Private Resolver",
  "objectives": [
   "Students will be able to explain how private DNS zones, virtual network links and auto-registration provide name resolution for Azure VMs.",
   "Students will be able to identify which Private Resolver component, inbound endpoint or outbound endpoint with ruleset, handles each direction of hybrid resolution.",
   "Students will be able to design DNS for private endpoints so on-premises clients resolve private IP addresses.",
   "Students will be able to troubleshoot a hybrid name resolution failure by tracing the query path."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch two buildings on the whiteboard to anchor the discussion."
   ],
   [
    15,
    "Teach",
    "Explain Azure-provided DNS and why 168.63.129.16 is internal only. Introduce private zones, links and auto-registration with the one-zone limit. Explain private endpoints and privatelink zones. Then draw the Private Resolver with inbound and outbound endpoints in delegated subnets, a conditional forwarder on-premises and a ruleset linked to spokes."
   ],
   [
    15,
    "Activity",
    "Run the whiteboard query path activity below."
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
  "warmup": "Two office buildings each have their own internal phone directory. How could someone in one building look up a person in the other without merging the directories?",
  "activity": {
   "title": "Draw the query path",
   "materials": "Whiteboard or large paper per group, markers in two colors, printed scenario cards, sticky notes.",
   "steps": [
    "Each group draws a base diagram: an on-premises network with two DCs running DNS, a site-to-site VPN, a hub VNet with a Private Resolver (inbound and outbound endpoints in separate subnets), and a spoke VNet with app VMs.",
    "Give each group three scenario cards: an on-premises client resolving app01.azure.contoso.internal, a spoke VM resolving sql.contoso.local, and an on-premises server resolving a storage account private endpoint.",
    "For each card, groups draw the query path in one color, labeling each hop, and write on sticky notes every configuration item required (private zone link, auto-registration, conditional forwarder, ruleset rule, ruleset link).",
    "Groups then receive a break card, such as 'the ruleset is not linked to the spoke' or 'auto-registration already enabled on another zone', and mark in the second color where the failure occurs and how to fix it.",
    "Each group explains one path to the class."
   ]
  },
  "discussion": [
   "What are the operational benefits of Private Resolver over forwarder VMs, and are there any trade-offs?",
   "Why is private endpoint DNS the most common source of hybrid connectivity tickets?",
   "How would your design change if all VMs used domain controllers as custom DNS servers?"
  ],
  "exit": [
   [
    "Which Private Resolver endpoint do on-premises DNS servers forward to?",
    "The inbound endpoint."
   ],
   [
    "How many private zones per VNet can have auto-registration enabled?",
    "One."
   ],
   [
    "What must you link to a spoke VNet so its VMs use forwarding rules to on-premises?",
    "The DNS forwarding ruleset."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pre-drawn diagram with numbered hops and a word bank of components so they can focus on direction rather than drawing.",
   "Extend: Ask fast finishers to design DNS for a hub and spoke network where some VNets use custom DNS servers on domain controllers in Azure, explaining where 168.63.129.16 fits."
  ]
 },
 {
  "t": "DHCP scopes, reservations, options and relay; authorization in AD",
  "objectives": [
   "Students will be able to describe the DORA exchange and explain why DHCP relies on broadcasts.",
   "Students will be able to configure scopes, exclusions, reservations and options and predict which option value a client receives.",
   "Students will be able to explain how a relay agent and giaddr let one DHCP server serve remote subnets.",
   "Students will be able to troubleshoot a DHCP server that leases no addresses, including authorization in AD."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the 169.254 address and list possible causes on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Act out DORA with two volunteers. Draw a scope with exclusions and a reservation. Show the option precedence ladder. Draw two subnets with a router and show the relay converting a broadcast to unicast and stamping giaddr. Finish with authorization and the post-install security groups."
   ],
   [
    18,
    "Activity",
    "Run the DHCP troubleshooting pairs activity below."
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
  "warmup": "A computer shows an IP address starting with 169.254. What does that tell you, and what could have gone wrong?",
  "activity": {
   "title": "DHCP troubleshooting pairs",
   "materials": "Printed trouble tickets with short console excerpts (scope settings, option values, router configuration line with or without an IP helper, Get-DhcpServerInDC output), whiteboard, sticky notes.",
   "steps": [
    "Give each pair four tickets: a remote VLAN with no relay configured, a new server not shown in Get-DhcpServerInDC output, a scope that exists but is inactive, and a client receiving an unexpected DNS server because of a reservation option.",
    "Pairs read each excerpt, identify the root cause, and write the fix and the PowerShell cmdlet or console step on a sticky note.",
    "For the option ticket, pairs draw the precedence ladder (server, server policy, scope, scope policy, reservation) and circle the level that wins.",
    "Pairs swap one ticket with another pair and check each other's answers.",
    "The teacher reviews the authorization ticket as a class, asking which group membership is needed and why."
   ]
  },
  "discussion": [
   "Why do you think Microsoft made authorization a forest-wide, Enterprise Admins task rather than a local one?",
   "When would you use a reservation instead of a static IP typed into the device?",
   "What are the pros and cons of one central DHCP server with relays versus a DHCP server in every site?"
  ],
  "exit": [
   [
    "Which DHCP option number sets the default gateway?",
    "003 Router."
   ],
   [
    "What field does a relay agent fill in so the server can choose the right scope?",
    "giaddr, the gateway IP address of the interface that received the request."
   ],
   [
    "What default group membership do you need to authorize a DHCP server in AD?",
    "Enterprise Admins."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a DORA diagram and an option precedence ladder printed on a card to keep in front of them during the tickets.",
   "Extend: Ask fast finishers to design a DHCP policy that gives IP phones (identified by vendor class) a separate address range and DNS server, and explain where its options sit in precedence."
  ]
 },
 {
  "t": "DHCP high availability: failover in load balance and hot standby modes; IPAM",
  "objectives": [
   "Students will be able to compare load balance and hot standby failover modes and choose one for a given site design.",
   "Students will be able to explain which DHCP data synchronizes automatically in a failover relationship and how to replicate configuration changes.",
   "Students will be able to describe the roles of the MCLT and the state switchover interval during a partner failure.",
   "Students will be able to describe what IPAM provides, how managed servers are provisioned and where IPAM can be installed."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record answers about what happens over time when a DHCP server fails."
   ],
   [
    15,
    "Teach",
    "Contrast the 80/20 split scope with failover. Draw two servers with a lease replication arrow and a dashed arrow for manual configuration replication. Explain both modes with default percentages, then walk through the state timeline: normal, communication interrupted, partner down, MCLT wait, full takeover. Finish with IPAM features, provisioning and installation rules."
   ],
   [
    15,
    "Activity",
    "Run the design-and-defend activity below."
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
  "warmup": "Our only DHCP server dies at 6 p.m. Friday with an 8-day lease time. When do users start to notice, and why not immediately?",
  "activity": {
   "title": "Design and defend a DHCP failover plan",
   "materials": "Printed site maps for three fictional organizations (single datacenter, hub with five branches, two sites with a fast link), whiteboard, markers, sticky notes.",
   "steps": [
    "Assign each group one site map. Groups decide which servers pair in failover relationships, which mode each uses and the percentage or reserve, and draw it on the whiteboard.",
    "Groups write a short runbook on sticky notes for two events: changing the DNS server option on all scopes, and a partner server failing without a state switchover interval set.",
    "Groups add where IPAM would be installed and how managed servers would be provisioned.",
    "Each group defends its design in two minutes while another group acts as the review board and asks one challenge question, such as 'what about the IPv6 scopes?'",
    "The teacher closes by listing the most common errors seen across groups."
   ]
  },
  "discussion": [
   "Why might an organization still choose hot standby even within one site?",
   "What are the risks of setting a very short state switchover interval?",
   "How does IPAM's audit capability change how quickly you can answer security questions?"
  ],
  "exit": [
   [
    "What is the default failover mode and split?",
    "Load balance, 50/50."
   ],
   [
    "Does DHCP failover support IPv6 scopes?",
    "No. It supports IPv4 scopes only."
   ],
   [
    "Name one way to provision managed servers for IPAM.",
    "Group Policy provisioning with Invoke-IpamGpoProvisioning, or manual configuration of the same permissions and firewall rules."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column comparison card (load balance versus hot standby) and a timeline strip of failover states to annotate during the teach segment.",
   "Extend: Ask fast finishers to write the PowerShell to create a hot standby relationship with a 10 percent reserve and to replicate a relationship after option changes, and explain how MCLT affects lease length during communication interrupted."
  ]
 },
 {
  "t": "Azure VNet addressing and static private IPs set on the NIC",
  "objectives": [
   "Students will be able to plan non-overlapping VNet address spaces and subnets for a hybrid design.",
   "Students will be able to calculate usable addresses in an Azure subnet, accounting for the five reserved addresses.",
   "Students will be able to configure a static private IP on a NIC and explain why the guest OS stays on DHCP.",
   "Students will be able to configure custom DNS servers on a VNet for domain-joined VMs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let students argue briefly before revealing that Azure reserves five addresses."
   ],
   [
    12,
    "Teach",
    "Draw a VNet with address space and three subnets, including GatewaySubnet. List the five reserved addresses for 10.20.1.0/24 on the whiteboard. Show the NIC IP configuration blade on the projector (or a screenshot) and explain dynamic versus static. Stress the rule of setting static IP on the NIC and DNS on the VNet."
   ],
   [
    18,
    "Activity",
    "Run the subnet math and planning relay below."
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
  "warmup": "How many hosts fit in a /24 subnet? Would your answer change if the network were in Azure?",
  "activity": {
   "title": "Subnet math and planning relay",
   "materials": "Printed worksheets with an on-premises range (for example 10.0.0.0/16) and requirements for an Azure hub and two spokes, whiteboard, markers.",
   "steps": [
    "In teams of three, student one calculates usable addresses for a list of subnet sizes (/24, /26, /27, /28, /29) in Azure and passes the sheet on.",
    "Student two proposes non-overlapping address spaces for the hub and two spokes that avoid the on-premises range, and assigns subnets including GatewaySubnet and two delegated subnets for a DNS Private Resolver.",
    "Student three picks static private IPs for two domain controllers in the hub, writes where each is configured (NIC IP configuration) and what the Windows adapter setting should be, and lists the VNet DNS server settings.",
    "Teams swap sheets with another team and check for overlaps, wrong usable counts or reserved addresses used as static IPs.",
    "The teacher reviews one completed plan on the whiteboard."
   ]
  },
  "discussion": [
   "Why do you think Azure manages addresses through its own DHCP even for static IPs?",
   "What problems might you face years later if you choose a VNet address space that is too small?",
   "How would you recover a VM that lost connectivity after a guest network change, and what tools depend on the VM agent?"
  ],
  "exit": [
   [
    "How many usable addresses does a /28 subnet provide in Azure?",
    "11 (16 minus 5 reserved)."
   ],
   [
    "Where do you configure a static private IP for an Azure VM?",
    "On the NIC's IP configuration in Azure, with the guest OS left on DHCP."
   ],
   [
    "Where do you set custom DNS servers so all VMs in a VNet receive them?",
    "On the VNet's DNS servers setting (a NIC setting can override it)."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a table of subnet sizes with total addresses filled in, so they only subtract the five reserved addresses, and a reminder card of the five reserved positions.",
   "Extend: Ask fast finishers to write the PowerShell sequence to convert a NIC's IP configuration from dynamic to static and explain what happens to the VM's network connection when it is applied."
  ]
 },
 {
  "t": "Hybrid connectivity: site-to-site and point-to-site VPN, ExpressRoute, Azure Network Adapter",
  "objectives": [
   "Students will be able to compare site-to-site VPN, point-to-site VPN, ExpressRoute and Azure Network Adapter by scope, path and encryption.",
   "Students will be able to list the Azure resources needed for a site-to-site VPN and describe what each stores.",
   "Students will be able to explain why ExpressRoute is private but not encrypted by default and how to add encryption.",
   "Students will be able to select the correct hybrid connectivity option for a stated business requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect transportation analogies from students on the whiteboard."
   ],
   [
    15,
    "Teach",
    "Draw on-premises and Azure side by side. Build a site-to-site VPN resource by resource: GatewaySubnet, virtual network gateway, local network gateway, connection with shared key. Add P2S clients with authentication options. Draw ExpressRoute as a separate path through a provider, labeling private and Microsoft peering and the 'not encrypted by default' fact. Finish with Azure Network Adapter in Windows Admin Center."
   ],
   [
    15,
    "Activity",
    "Run the requirement matching role-play below."
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
  "warmup": "If you needed to get a whole town, one person, or a shipment that must never touch public roads to the same city, what transportation would you choose for each?",
  "activity": {
   "title": "Stakeholder requirement role-play",
   "materials": "Printed stakeholder cards (compliance officer, network manager, remote admin, branch admin with one server, CFO), printed option cards (S2S VPN, P2S VPN, ExpressRoute, ExpressRoute plus IPsec, Azure Network Adapter), whiteboard.",
   "steps": [
    "Some students take stakeholder cards, each stating a requirement in plain business language, such as 'traffic must never cross the internet' or 'just my one server, no firewall changes'.",
    "The rest of the class works in small consulting teams. Each stakeholder presents their need in 30 seconds and teams hold up the option card they recommend.",
    "Teams must justify their pick and name at least one Azure resource involved, such as local network gateway or GatewaySubnet.",
    "The compliance officer adds a follow-up requirement, 'and it must be encrypted', and teams must revise their recommendation.",
    "Finish by drawing one combined design on the whiteboard that satisfies all stakeholders, such as ExpressRoute with S2S VPN backup plus P2S for admins."
   ]
  },
  "discussion": [
   "Why might an organization keep a site-to-site VPN even after deploying ExpressRoute?",
   "What are the trade-offs of letting a single admin connect a server with Azure Network Adapter rather than going through the network team?",
   "How does gateway deployment time affect project planning?"
  ],
  "exit": [
   [
    "What must the subnet for a VPN gateway be named?",
    "GatewaySubnet."
   ],
   [
    "Is ExpressRoute encrypted by default?",
    "No. It is private but not encrypted; add IPsec or MACsec if needed."
   ],
   [
    "Which option connects a single Windows Server to a VNet from Windows Admin Center?",
    "Azure Network Adapter, which sets up a point-to-site VPN."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a four-row comparison table (scope, path, encryption, typical use) to complete during the teach segment and keep during the role-play.",
   "Extend: Ask fast finishers to design a resilient hybrid network with ExpressRoute and a site-to-site VPN failover, explaining which resources are shared and how traffic fails over."
  ]
 },
 {
  "t": "Azure File Sync: sync groups, cloud and server endpoints, cloud tiering policies",
  "objectives": [
   "Students will be able to describe the hierarchy of Storage Sync Service, registered servers, sync groups, cloud endpoints and server endpoints and the limits at each level.",
   "Students will be able to explain how cloud tiering uses the volume free space and date policies and which takes precedence.",
   "Students will be able to predict how changes made on a server endpoint and directly in the Azure file share propagate.",
   "Students will be able to design an Azure File Sync deployment for a multi-branch organization."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect answers to the idea of keeping popular items local."
   ],
   [
    15,
    "Teach",
    "Draw the hierarchy on the whiteboard as nested boxes: Storage Sync Service, sync group, one cloud endpoint, several server endpoints on registered servers. Mark the limits with red notes. Explain cloud tiering with the two policies and precedence, then the change detection delay, the system volume rule and backup guidance."
   ],
   [
    15,
    "Activity",
    "Run the build-a-sync-topology card activity below."
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
  "warmup": "Your phone has limited storage but you can see every photo you have ever taken. How might that work, and what happens when you open an old photo?",
  "activity": {
   "title": "Build a sync topology",
   "materials": "Printed cards for Storage Sync Service, sync groups, Azure file shares, servers and server endpoint paths (including a C: path and a nested path as traps), a large sheet of paper or whiteboard per group, tape.",
   "steps": [
    "Give each group a scenario: three branch offices with Sales and Engineering shares, branch servers with small D: volumes, and a requirement to keep 20 percent free space and tier files untouched for 90 days.",
    "Groups tape cards into a valid topology: one Storage Sync Service, one sync group per share, one cloud endpoint each, and server endpoints on each branch server.",
    "Groups must reject the trap cards (a second file share in one sync group, a C: system volume endpoint with tiering, a nested path on the same volume, a server registered to two services) and write why on a sticky note.",
    "Groups write the tiering settings for each server endpoint and answer: a 30-day-old file on a nearly full volume, will it be tiered?",
    "Groups present their topology and the teacher confirms or corrects each trap explanation."
   ]
  },
  "discussion": [
   "What could go wrong if antivirus software on a tiering server does not respect the offline attribute?",
   "Why should backups target the Azure file share rather than the branch servers?",
   "How would you explain the roughly daily delay for direct share changes to users who upload through the portal?"
  ],
  "exit": [
   [
    "How many cloud endpoints can a sync group have?",
    "Exactly one."
   ],
   [
    "If the volume free space policy and date policy conflict, which wins?",
    "The volume free space policy."
   ],
   [
    "Can you enable cloud tiering on a server endpoint on the system volume?",
    "No. Cloud tiering is not supported on the system volume."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pre-drawn nested box diagram with labels missing and a list of limits to attach to each level.",
   "Extend: Ask fast finishers to plan the replacement of a failed branch server with minimal downtime, including registration, server endpoint creation and how recall works on first access."
  ]
 },
 {
  "t": "Azure Files with AD DS authentication; share-level RBAC vs NTFS permissions",
  "objectives": [
   "Students will be able to describe the steps to enable AD DS authentication for an Azure file share, including Join-AzStorageAccount and the sync requirement.",
   "Students will be able to compare the three Storage File Data SMB Share roles and explain the default share-level permission.",
   "Students will be able to calculate effective access from a share-level role and an NTFS ACL.",
   "Students will be able to distinguish management-plane roles from SMB data access roles in troubleshooting scenarios."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students how a traditional Windows share combines share permissions and NTFS permissions. Collect answers on the board and confirm that the most restrictive wins."
   ],
   [
    12,
    "Teach",
    "Walk through the storage account key problem, the Join-AzStorageAccount process and the Entra sync requirement. Draw the two gates on the board: Azure RBAC share roles, then NTFS ACLs. Stress that Owner and Contributor do not grant data access."
   ],
   [
    18,
    "Activity",
    "Run the effective access card sort in pairs. Circulate and ask each pair to say which layer decided the result."
   ],
   [
    5,
    "Discuss",
    "Debrief tricky cards, especially the Owner and unsynced-user cases, and connect them to the troubleshooting order."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand it in at the door."
   ]
  ],
  "warmup": "Your company gives every employee the same master key to the file share. What could go wrong, and what would you need to replace it with?",
  "activity": {
   "title": "Two-gate effective access card sort",
   "materials": "Printed cards (about 12) each describing a user, their share-level role or lack of one, their sync status and their NTFS permission; whiteboard; markers.",
   "steps": [
    "Give each pair a stack of user cards and three column headers: No access, Read only, Read and write.",
    "Pairs place each card in a column and write on the card which layer (network, sync, share role or NTFS) decided the outcome.",
    "Include trap cards such as a subscription Owner with no share role and a user from an unsynced OU.",
    "Pairs swap stacks with a neighbor pair and check each other's placements, flagging disagreements.",
    "The teacher resolves the flagged cards at the board using the troubleshooting order."
   ]
  },
  "discussion": [
   "When would you choose a default share-level permission instead of per-group role assignments, and what risk does it carry?",
   "Why do you think Microsoft separates management-plane roles from data-plane access, and how does that help security?"
  ],
  "exit": [
   [
    "What must be true about a user's account before you can give them a share-level role that works with AD DS authentication?",
    "It must exist in AD and be synced to Microsoft Entra ID, for example by Entra Connect."
   ],
   [
    "A user has Share Contributor and Read in NTFS. What is their effective access?",
    "Read only, because the most restrictive layer wins."
   ],
   [
    "Does the Owner role on the storage account let a user open files on the share with their domain account?",
    "No. Owner is a management-plane role; they need a Storage File Data SMB Share role or a default share-level permission."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column template labeled Gate 1 (Azure role) and Gate 2 (NTFS) and have them fill each column before deciding the result.",
   "Extend: Ask fast finishers to write the full troubleshooting checklist for a failed mapping, including the Test-NetConnection and Debug-AzStorageAccountAuth steps, and explain what each check rules out."
  ]
 },
 {
  "t": "SMB security: encryption, signing, SMB over QUIC, removing SMBv1",
  "objectives": [
   "Students will be able to distinguish SMB signing from SMB encryption by the threats each addresses.",
   "Students will be able to explain the requirements of SMB over QUIC, including UDP 443, TLS 1.3 and a server certificate.",
   "Students will be able to sequence the audit, disable and remove steps for SMBv1 with the correct cmdlets.",
   "Students will be able to choose the right SMB control for a given threat scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list student answers about what can go wrong with file traffic on a network."
   ],
   [
    12,
    "Teach",
    "Map four threats to four controls on the board: eavesdropping to encryption, tampering and relay to signing, blocked 445 to SMB over QUIC, legacy exploits to SMBv1 removal. Show the key cmdlets on the projector."
   ],
   [
    18,
    "Activity",
    "Run the threat-to-control matching game in small groups, then have each group present one scenario and defend its choice."
   ],
   [
    5,
    "Discuss",
    "Discuss why auditing before removal matters and how to handle a legacy device that cannot be upgraded."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions individually on paper."
   ]
  ],
  "warmup": "If you could watch every packet on the office network, what would you be able to learn or change about the files people open?",
  "activity": {
   "title": "Threat-to-control matching",
   "materials": "Printed scenario cards (8 to 10) describing SMB threats or requirements, printed control cards (encryption, signing, SMB over QUIC, SMBv1 audit, SMBv1 removal, RejectUnencryptedAccess), whiteboard.",
   "steps": [
    "Groups of three receive the scenario and control cards face up.",
    "Groups match each scenario to the best control and write the cmdlet or Group Policy setting they would use on the back.",
    "Include distractor scenarios where signing sounds right but encryption is needed, and the reverse.",
    "Each group presents one match to the class and explains why the alternative control would not work.",
    "The teacher records the final matches on the board as a reference table."
   ]
  },
  "discussion": [
   "An old medical device only speaks SMBv1 and the vendor no longer exists. How would you reduce the risk if you cannot remove it right away?",
   "Should every share be encrypted, or only sensitive ones? What are the tradeoffs?"
  ],
  "exit": [
   [
    "Which control stops an attacker on the network from reading file contents: signing or encryption?",
    "Encryption; signing only protects integrity and authenticity."
   ],
   [
    "Name the transport, port and encryption used by SMB over QUIC.",
    "QUIC over UDP port 443 with TLS 1.3."
   ],
   [
    "What should you do before disabling SMBv1 on a production file server?",
    "Enable SMBv1 access auditing and review the SMBServer/Audit log to find clients that still use it."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page reference with each control, what it protects (confidentiality, integrity, reachability, legacy risk) and its main cmdlet, and let students use it during the matching game.",
   "Extend: Ask fast finishers to draft a rollout plan for a 20-server estate covering SMBv1 audit duration, signing via Group Policy, encryption scope and SMB over QUIC certificate management."
  ]
 },
 {
  "t": "File Server Resource Manager quotas and file screens; DFS Namespaces and DFS Replication",
  "objectives": [
   "Students will be able to differentiate hard and soft quotas, regular and auto apply quotas, and active and passive file screens.",
   "Students will be able to explain how DFS namespaces use referrals and site costs to direct clients to the nearest folder target.",
   "Students will be able to describe DFSR components, initial replication behavior and its conflict limitations.",
   "Students will be able to design a file service solution that combines FSRM, DFS-N and DFSR for a multi-site scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch the students' ideas for keeping a shared drive under control."
   ],
   [
    12,
    "Teach",
    "Cover FSRM quotas, templates, auto apply quotas and file screens, then draw a two-site map showing a namespace, two folder targets, a referral and DFSR between them."
   ],
   [
    18,
    "Activity",
    "Groups whiteboard a design for the multi-campus college scenario, then trade boards for peer review."
   ],
   [
    5,
    "Discuss",
    "Discuss where DFSR would be a poor fit and what the alternatives are."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "One person just filled the shared drive with personal videos. What kinds of rules would you want the server to enforce automatically so this cannot happen again?",
  "activity": {
   "title": "Whiteboard a two-campus file service",
   "materials": "Whiteboard or large paper per group, markers, a printed scenario sheet describing two campuses, home folders, a video ban and shared departmental folders.",
   "steps": [
    "Groups read the scenario and list each requirement on their board.",
    "Groups draw the namespace path, folder targets, replication group and topology, and label the primary member for initial sync.",
    "Groups add FSRM settings: quota type and template for home folders, file screen type and any exceptions.",
    "Boards rotate to another group, which marks any requirement not met or any DFSR conflict risk with a sticky note.",
    "The original group responds to the sticky notes and the teacher highlights common gaps."
   ]
  },
  "discussion": [
   "Why might an organization start with passive file screens and soft quotas before switching to active and hard ones?",
   "What kinds of data are a poor fit for DFSR, and what would you use instead?"
  ],
  "exit": [
   [
    "What is the difference between a hard quota and a soft quota?",
    "A hard quota blocks writes at the limit; a soft quota only notifies."
   ],
   [
    "A user in Site B opens a namespace folder with targets in Sites A and B. Which target does the referral list first?",
    "The Site B target, because targets in the client's own site are listed first."
   ],
   [
    "Why is DFSR a risky choice for a spreadsheet edited at the same time by users in two sites?",
    "DFSR has no distributed file locking, so simultaneous edits conflict and last writer wins, moving the other version to ConflictAndDeleted."
   ]
  ],
  "differentiation": [
   "Support: Give students a fill-in diagram with blanks for namespace path, folder targets, replication group members and quota type, so they focus on choices rather than drawing.",
   "Extend: Ask fast finishers to write the PowerShell cmdlets they would use for the quota template, auto apply quota and file screen, and to explain how they would monitor DFSR backlog."
  ]
 },
 {
  "t": "Storage Spaces resiliency and provisioning; ReFS vs NTFS; Data Deduplication",
  "objectives": [
   "Students will be able to compare simple, two-way mirror, three-way mirror and parity resiliency by fault tolerance, disk minimums and efficiency.",
   "Students will be able to explain the benefits and risks of thin versus fixed provisioning.",
   "Students will be able to select ReFS or NTFS based on workload features such as Hyper-V, boot, EFS and quotas.",
   "Students will be able to describe how Data Deduplication works and choose the correct usage type."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students what they would do if one of eight disks in a server failed, and how they would know."
   ],
   [
    12,
    "Teach",
    "Draw disks on the board and show a pool, then shade copies for simple, two-way and three-way mirror and parity. Compare ReFS and NTFS in a two-column table, then explain the dedup optimization job and chunk store."
   ],
   [
    18,
    "Activity",
    "Groups play the workload-to-design matching game and justify each choice in one sentence."
   ],
   [
    5,
    "Discuss",
    "Discuss thin provisioning risk and how to monitor a pool."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the exit questions on paper."
   ]
  ],
  "warmup": "You have eight identical disks and one server. How would you arrange them if you cared most about speed? Most about safety? Most about space?",
  "activity": {
   "title": "Design the volume",
   "materials": "Printed workload cards (VDI host, archive scans, SQL database VM, general file share, boot volume, backup target), printed option cards for resiliency, provisioning, file system and dedup usage type, sticky notes.",
   "steps": [
    "Each group of three receives the workload cards and option cards.",
    "For each workload, the group selects one resiliency, one provisioning type, one file system and a dedup choice (including none).",
    "Groups write a one-sentence justification on a sticky note for each workload.",
    "The teacher reveals the trap cases, such as the boot volume (NTFS, no dedup) and the database VM (mirror, not parity).",
    "Groups compare answers and correct any mismatches with a different-color note."
   ]
  },
  "discussion": [
   "Why might an organization accept the risk of thin provisioning, and what process would you put in place to manage it?",
   "If ReFS is more resilient, why is NTFS still the default for so many volumes?"
  ],
  "exit": [
   [
    "Which resiliency type survives two disk failures on a single server, and how many disks does it need?",
    "A three-way mirror, needing at least five disks."
   ],
   [
    "Name two features NTFS supports that ReFS does not.",
    "Any two of: booting Windows, file compression, EFS and per-user disk quotas."
   ],
   [
    "Why does Data Deduplication not slow down files as they are being written?",
    "It works post-process; files are written normally and a scheduled optimization job chunks them later, skipping files newer than the minimum age."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference table of resiliency types with columns for copies, failures tolerated, minimum disks and efficiency, partially filled in.",
   "Extend: Ask fast finishers to write the full PowerShell sequence to pool eligible disks, create a thin two-way mirror virtual disk, format it ReFS and enable dedup with the HyperV usage type."
  ]
 },
 {
  "t": "Failover clustering: validation, cluster networks, quorum models and witnesses (disk, file share, cloud), Cluster-Aware Updating",
  "objectives": [
   "Students will be able to explain the purpose of cluster validation and the role of the cluster name object.",
   "Students will be able to assign appropriate roles to cluster networks.",
   "Students will be able to calculate whether a cluster keeps quorum after failures and select a suitable witness type.",
   "Students will be able to compare CAU self-updating and remote-updating modes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the committee voting warm-up and let students reason about ties."
   ],
   [
    12,
    "Teach",
    "Cover validation, cluster creation and network roles, then draw node and witness votes on the board and walk through dynamic quorum and the three witness types. Close with the CAU sequence."
   ],
   [
    18,
    "Activity",
    "Run the quorum vote-counting role-play with students acting as nodes and witnesses."
   ],
   [
    5,
    "Discuss",
    "Discuss which witness each scenario needed and why CAU requires spare capacity."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on sticky notes."
   ]
  ],
  "warmup": "A committee of four must approve every decision by majority. If they are split into two rooms of two with no phone, what happens? How could you fix it?",
  "activity": {
   "title": "Quorum role-play",
   "materials": "Printed name cards (Node 1 to Node 5, Disk witness, File share witness, Cloud witness), a rope or tape line to represent a network split, whiteboard for vote tallies.",
   "steps": [
    "Volunteers hold node cards and stand on either side of the tape line; one holds a witness card in a chosen location.",
    "The teacher announces events: a node fails, the link breaks, the witness becomes unreachable from one side.",
    "The class counts votes on each side aloud and decides which side keeps running or whether the whole cluster stops.",
    "Repeat with different node counts and witness types, including a multi-site layout where the disk witness is impossible.",
    "Students record each scenario's outcome and the witness choice they would recommend."
   ]
  },
  "discussion": [
   "Why might an organization prefer a cloud witness over a file share witness, and when would the file share witness still be better?",
   "What could go wrong if CAU starts patching a cluster that is already running near full capacity?"
  ],
  "exit": [
   [
    "A three-node cluster with a file share witness loses two nodes at the same time. Can it keep running, and why?",
    "No. One surviving node holds at most two of four votes (itself plus the witness), which is not more than half. Dynamic quorum helps only with sequential, not simultaneous, failures."
   ],
   [
    "Which witness type would you choose for a two-site cluster with no third site and no shared storage?",
    "A cloud witness."
   ],
   [
    "What does CAU do to each node in turn?",
    "Drains its roles, installs updates, restarts if needed, brings roles back, then moves to the next node."
   ]
  ],
  "differentiation": [
   "Support: Give students a vote-counting worksheet with boxes for total votes, votes on each side and the majority threshold, to fill in before deciding.",
   "Extend: Ask fast finishers to explain dynamic witness with a worked example of how the witness vote changes as nodes go offline in a four-node cluster."
  ]
 },
 {
  "t": "Storage Spaces Direct: minimum nodes, cache, resiliency; Scale-Out File Server for application data",
  "objectives": [
   "Students will be able to state the node minimums for S2D, two-way mirror, three-way mirror and dual parity.",
   "Students will be able to predict which drives become cache and whether the cache handles reads, writes or both.",
   "Students will be able to compare hyper-converged and converged S2D deployments.",
   "Students will be able to choose between Scale-Out File Server and File Server for general use for a given workload."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to list problems with buying a dedicated SAN for a small company, and record answers."
   ],
   [
    12,
    "Teach",
    "Draw four nodes with local drives, show the pool and CSVs, color the cache drives, and fill a table of resiliency types with node minimums and efficiency. Contrast SOFS with File Server for general use."
   ],
   [
    18,
    "Activity",
    "Groups size and design clusters from requirement cards, presenting one design each."
   ],
   [
    5,
    "Discuss",
    "Discuss hyper-converged versus converged tradeoffs and where nested resiliency fits."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on paper."
   ]
  ],
  "warmup": "If every server already has fast drives inside it, why might a company still buy a separate storage box? What would you need to make internal drives just as safe?",
  "activity": {
   "title": "Size the S2D cluster",
   "materials": "Printed requirement cards (node count, drive mix, workload type, failure tolerance, growth pattern), printed blank design sheets, calculators or student laptops with a browser calculator.",
   "steps": [
    "Each group draws a requirement card, such as three nodes with NVMe and HDD running SQL VMs, or two branch nodes that must survive a node and drive failure.",
    "Groups decide the cache and capacity roles of the drives and whether the cache will handle reads, writes or both.",
    "Groups choose a resiliency for each volume, check the node minimum, and estimate usable capacity from raw capacity.",
    "Groups decide whether the workload needs SOFS, File Server for general use or neither.",
    "One member presents the design while another group challenges one decision."
   ]
  },
  "discussion": [
   "What clues in a business requirement tell you to choose a converged rather than hyper-converged design?",
   "Why do you think the cache behaves differently with SSD capacity than with HDD capacity?"
  ],
  "exit": [
   [
    "What is the minimum number of nodes for dual parity in S2D?",
    "Four nodes."
   ],
   [
    "In a node with NVMe cache and SSD capacity drives, does the cache handle reads?",
    "No, only writes, because reads from SSD are already fast."
   ],
   [
    "Which clustered file server role suits Hyper-V VHDX files with no downtime during node failure?",
    "Scale-Out File Server, with continuously available SMB shares on CSVs."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page cheat sheet of node minimums and cache behavior so students can focus on matching workloads to designs.",
   "Extend: Ask fast finishers to compare usable capacity for the same raw drives under two-way mirror, three-way mirror and dual parity on a four-node cluster, and explain which they would choose for a mixed workload."
  ]
 },
 {
  "t": "Storage Replica: synchronous vs asynchronous, server-to-server and stretch cluster; guest clustering with shared VHDX",
  "objectives": [
   "Students will be able to compare synchronous and asynchronous replication in terms of RPO, latency and distance.",
   "Students will be able to identify the requirements of Storage Replica, including log volumes, equal partition sizes and Test-SRTopology.",
   "Students will be able to distinguish server-to-server, cluster-to-cluster and stretch cluster scenarios, including which supports automatic failover.",
   "Students will be able to design shared storage for a Hyper-V guest cluster using VHD Sets."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask how much data a business could lose if its building lost power right now, and introduce RPO."
   ],
   [
    12,
    "Teach",
    "Draw source and destination with log and data volumes, animate the write path for synchronous and asynchronous modes, then sketch the three scenarios and a guest cluster with a VHD Set on a CSV."
   ],
   [
    18,
    "Activity",
    "Groups solve the replication design challenge cards and present their choices."
   ],
   [
    5,
    "Discuss",
    "Discuss how latency and RPO tolerance drive the mode decision."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions individually."
   ]
  ],
  "warmup": "Your company's main office floods at noon. Which is worse: losing the last five seconds of work, or every save in the building taking twice as long all year? Why?",
  "activity": {
   "title": "Replication design challenge",
   "materials": "Printed scenario cards giving distance, latency, RPO tolerance, server type (standalone or clustered) and failover expectations; whiteboard; markers.",
   "steps": [
    "Groups of three draw two scenario cards.",
    "For each card, groups choose synchronous or asynchronous, the scenario type, and whether failover is automatic or manual.",
    "Groups list the prerequisites they would check: log volumes, matching partition sizes, edition limits and a Test-SRTopology run.",
    "One card in the deck asks for guest clustering; that group must specify the VHD Set location and controller type.",
    "Groups present one design each while classmates check it against the rules on the board."
   ]
  },
  "discussion": [
   "Why might an organization run both synchronous and asynchronous replication at the same time?",
   "When would host clustering be enough, and when do you need a guest cluster as well?"
  ],
  "exit": [
   [
    "Two sites are 900 km apart and the business can tolerate a small data loss. Which Storage Replica mode fits?",
    "Asynchronous, because long distance adds latency and the RPO does not need to be zero."
   ],
   [
    "Which Storage Replica scenario provides automatic failover?",
    "A stretch cluster."
   ],
   [
    "What file format and storage location are recommended for a Hyper-V guest cluster's shared disk?",
    "A VHD Set (.vhds) on a Cluster Shared Volume or Scale-Out File Server share, attached via SCSI."
   ]
  ],
  "differentiation": [
   "Support: Give students a decision flowchart with two questions, distance or latency and RPO tolerance, leading to synchronous or asynchronous.",
   "Extend: Ask fast finishers to design a three-site solution combining a synchronous stretch cluster with asynchronous replication to a distant site, and to explain the failover steps in each case."
  ]
 },
 {
  "t": "Security baselines: OSConfig on Windows Server 2025, Microsoft Security Compliance Toolkit baselines, drift control",
  "objectives": [
   "Students will be able to explain what a security baseline is and why organizations apply one.",
   "Students will be able to identify the components of the Security Compliance Toolkit, including GPO backups, Policy Analyzer and LGPO.exe.",
   "Students will be able to apply and check an OSConfig scenario and choose the correct role scenario.",
   "Students will be able to describe drift control and choose between OSConfig and SCT for a given environment."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student ideas about how settings drift over time."
   ],
   [
    12,
    "Teach",
    "Show the SCT package contents and the purpose of Policy Analyzer and LGPO.exe. Project the OSConfig commands for applying and checking a scenario, then explain drift control with a before-and-after example."
   ],
   [
    18,
    "Activity",
    "Groups play the auditor role-play using printed compliance reports, choosing tools and remediation."
   ],
   [
    5,
    "Discuss",
    "Discuss how to handle exceptions a business app needs and why one tool should own each setting."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on paper."
   ]
  ],
  "warmup": "You configure 40 servers perfectly today. List three ways their settings might be different six months from now.",
  "activity": {
   "title": "Auditor role-play",
   "materials": "Printed mock compliance outputs (a Policy Analyzer style difference list and an OSConfig style compliance table), printed server inventory cards (version, domain or workgroup, role), whiteboard.",
   "steps": [
    "Split the class into auditors and admin teams; give each admin team three server inventory cards.",
    "Admin teams choose a baseline tool and scenario for each server and write the command or tool they would use.",
    "Auditors hand each team a mock compliance report showing drifted settings and ask how the team will fix and prevent the drift.",
    "Teams explain their remediation, including whether drift control or Group Policy refresh would correct the setting.",
    "Swap roles once, then the teacher summarizes the decision rules on the board."
   ]
  },
  "discussion": [
   "What are the risks of applying a baseline straight to production without a pilot?",
   "How would you document an exception, such as allowing a legacy protocol, so an auditor accepts it?"
  ],
  "exit": [
   [
    "Which tool would you use to apply Microsoft's baseline to a Windows Server 2025 workgroup server with automatic drift remediation?",
    "OSConfig with the WorkgroupMember security baseline scenario."
   ],
   [
    "What is the purpose of LGPO.exe?",
    "To import or export local Group Policy settings, for example applying a baseline to a non-domain machine."
   ],
   [
    "What happens when someone changes a setting managed by an OSConfig baseline?",
    "Drift control detects it at the next periodic check and reverts it to the desired value."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column comparison sheet for SCT and OSConfig with rows for supported versions, domain requirement, tools and drift behavior, partly completed.",
   "Extend: Ask fast finishers to outline how they would report baseline compliance for a mix of on-premises Windows Server 2025 machines using Azure Arc and Azure Policy, and what evidence they would give an auditor."
  ]
 },
 {
  "t": "Credential Guard and virtualization-based security; LSA protection",
  "objectives": [
   "Students will be able to explain how pass-the-hash and pass-the-ticket attacks rely on LSASS memory, at a defensive level.",
   "Students will be able to describe how VBS and Credential Guard isolate secrets in LSAIso and list VBS platform requirements.",
   "Students will be able to configure LSA protection with RunAsPPL and explain its audit mode.",
   "Students will be able to choose Credential Guard, LSA protection or both for member servers and domain controllers."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Run the warm-up discussion about why an attacker would rather reuse a credential than crack it."
   ],
   [
    12,
    "Teach",
    "Draw the normal OS, the hypervisor and Virtual Secure Mode as layers, place LSASS and LSAIso, and compare with LSASS running as a PPL. List requirements and limitations in a two-column table."
   ],
   [
    18,
    "Activity",
    "Pairs complete the protection planning worksheet for a mixed server estate and read a sample msinfo32 summary."
   ],
   [
    5,
    "Discuss",
    "Discuss why neither feature replaces tiered administration."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on sticky notes."
   ]
  ],
  "warmup": "If an attacker becomes administrator on one server, why might they be more interested in what is in memory than in the password database on disk?",
  "activity": {
   "title": "Protect the estate",
   "materials": "Printed server inventory sheet (DCs, file servers, app servers with hardware details such as TPM, UEFI and Secure Boot status), a printed sample msinfo32 VBS section, pens.",
   "steps": [
    "Pairs review the inventory and mark which servers meet VBS requirements.",
    "For each server, pairs choose Credential Guard, LSA protection, both or neither, and write the reason.",
    "Pairs read the sample msinfo32 excerpt and decide whether Credential Guard is configured and running.",
    "Pairs list one legacy compatibility risk to test for each choice, such as NTLMv1 or an unsigned LSA plug-in.",
    "The teacher reviews the domain controller rows with the class to reinforce the DC rule."
   ]
  },
  "discussion": [
   "Why would Microsoft choose not to support Credential Guard on domain controllers, and what does that imply for how you protect DCs?",
   "What are the tradeoffs of enabling these features with UEFI lock?"
  ],
  "exit": [
   [
    "Which process holds NTLM hashes and TGTs when Credential Guard is running?",
    "LSAIso, inside Virtual Secure Mode."
   ],
   [
    "Which feature can protect LSASS on a domain controller?",
    "LSA protection (RunAsPPL)."
   ],
   [
    "Name two requirements for VBS.",
    "Any two of: 64-bit CPU with virtualization extensions and SLAT, UEFI with Secure Boot, and a TPM (recommended)."
   ]
  ],
  "differentiation": [
   "Support: Give students a labeled diagram with LSASS, LSAIso, the hypervisor and the normal kernel, and have them color which parts each feature protects.",
   "Extend: Ask fast finishers to explain how HVCI differs from Credential Guard even though both use VBS, and which attack each one makes harder."
  ]
 },
 {
  "t": "App Control for Business (WDAC) policies and audit mode; AppLocker differences",
  "objectives": [
   "Students will be able to explain why allow-list application control is effective on servers.",
   "Students will be able to compare App Control rule types, including signer, hash, path and managed installer.",
   "Students will be able to describe the audit-to-enforce workflow and interpret events 3076, 3077, 8003 and 8004.",
   "Students will be able to choose App Control, AppLocker or both for a given server scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to compare a blocklist and a guest list as ways to control a party, and connect it to antivirus versus allow listing."
   ],
   [
    12,
    "Teach",
    "Present App Control rule types and templates, base and supplemental policies, deployment options and the audit workflow. Build a comparison table with AppLocker covering scope, kernel drivers, per-user rules, service dependency and events."
   ],
   [
    18,
    "Activity",
    "Pairs work through a printed CodeIntegrity log excerpt, decide which rules to add and whether the policy is ready to enforce."
   ],
   [
    5,
    "Discuss",
    "Discuss rollback planning and when AppLocker is still the right addition."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on paper."
   ]
  ],
  "warmup": "Is it easier to list every person who should not enter a building, or every person who should? Which approach is safer, and what is the catch?",
  "activity": {
   "title": "Read the audit log and tune the policy",
   "materials": "Printed excerpts of mock CodeIntegrity events (3076 and 3077 entries with file names, publishers and paths), a printed rule-type reference card, pens and highlighters.",
   "steps": [
    "Pairs highlight each 3076 event and classify the file as legitimate (backup agent, monitoring tool) or suspicious (unknown tool in a temp folder).",
    "For each legitimate file, pairs choose the best rule type and justify it, for example signer rather than hash.",
    "Pairs decide whether the policy is ready to enforce or needs more audit time, citing evidence such as missing monthly jobs.",
    "Pairs swap sheets with a neighbor pair to check classifications.",
    "The class builds a shared rule list on the board and notes which events would become 3077 after enforcement."
   ]
  },
  "discussion": [
   "What could go wrong if a policy blocks a boot-critical driver, and how would you plan a safe rollback?",
   "Why might Microsoft keep AppLocker supported but stop adding features to it?"
  ],
  "exit": [
   [
    "Which event ID shows code that would have been blocked in App Control audit mode?",
    "3076 in the CodeIntegrity/Operational log."
   ],
   [
    "Which technology controls kernel-mode drivers: App Control for Business or AppLocker?",
    "App Control for Business."
   ],
   [
    "When would you choose AppLocker in addition to App Control?",
    "When different users or groups on the same machine need different allowed apps, such as on a Remote Desktop Session Host."
   ]
  ],
  "differentiation": [
   "Support: Provide a flowchart that asks: does it involve drivers or all users (App Control) or per-group rules (AppLocker), then audit or enforce, to guide decisions.",
   "Extend: Ask fast finishers to design a base policy plus two supplemental policies for different server teams and explain how a managed installer reduces maintenance."
  ]
 },
 {
  "t": "Windows LAPS: backing up local admin passwords to AD DS or Entra ID, rotation and retrieval permissions",
  "objectives": [
   "Students will be able to explain the risk of shared local admin passwords and how Windows LAPS mitigates it.",
   "Students will be able to sequence the AD DS setup cmdlets and choose between AD DS and Entra ID backup.",
   "Students will be able to configure retrieval permissions, including encryption decryptors, and retrieve a password.",
   "Students will be able to force rotation and describe post-authentication actions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and discuss what one shared password across 50 servers means for an attacker."
   ],
   [
    12,
    "Teach",
    "Draw a server, the directory and the help desk on the board. Add arrows for the self-write permission and the read permission, then cover encryption, DSRM backup, rotation and post-authentication actions with the matching cmdlets on the projector."
   ],
   [
    18,
    "Activity",
    "Groups complete the LAPS setup sequencing and troubleshooting cards."
   ],
   [
    5,
    "Discuss",
    "Discuss AD DS versus Entra ID backup for a mixed environment."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on index cards."
   ]
  ],
  "warmup": "If every server in a company had the same local administrator password, what is the fastest way an attacker could take over all of them after breaking into one?",
  "activity": {
   "title": "Sequence and troubleshoot LAPS",
   "materials": "Printed cmdlet cards (Update-LapsADSchema, Set-LapsADComputerSelfPermission, Set-LapsADReadPasswordPermission, Get-LapsADPassword, Reset-LapsPassword, Set-LapsADPasswordExpirationTime, Invoke-LapsPolicyProcessing), printed symptom cards, tape.",
   "steps": [
    "Groups arrange the setup cmdlet cards in the correct order on their desk and tape them down.",
    "Groups receive symptom cards, such as backup errors in the LAPS log, help desk cannot see passwords, or a password must rotate now.",
    "For each symptom, groups pick the cmdlet or setting that fixes it and explain the cause.",
    "One symptom card involves encryption and decryptors; groups must identify both permissions needed.",
    "Groups share answers and the teacher confirms the correct sequence on the board."
   ]
  },
  "discussion": [
   "What are the tradeoffs between letting the help desk retrieve passwords freely and requiring a security team to retrieve them?",
   "In a hybrid environment, how would you decide which devices back up to AD DS and which to Entra ID?"
  ],
  "exit": [
   [
    "List the three AD DS setup cmdlets in order.",
    "Update-LapsADSchema, Set-LapsADComputerSelfPermission, Set-LapsADReadPasswordPermission."
   ],
   [
    "Where can a domain controller's DSRM password be backed up by Windows LAPS?",
    "Only to AD DS."
   ],
   [
    "Name one way to force a LAPS password rotation immediately.",
    "Run Reset-LapsPassword on the device, or set the expiration with Set-LapsADPasswordExpirationTime and run Invoke-LapsPolicyProcessing."
   ]
  ],
  "differentiation": [
   "Support: Give students the mnemonic Schema, Self, Staff and a partially filled flow diagram of write and read permissions.",
   "Extend: Ask fast finishers to plan a migration from legacy Microsoft LAPS to Windows LAPS, including how to avoid both managing the same account and how encryption changes who can read passwords."
  ]
 },
 {
  "t": "Hardening domain controllers: tiered administration, Protected Users, privileged access workstations, restricting who can log on to DCs",
  "objectives": [
   "Students will be able to classify systems into Tier 0, Tier 1 and Tier 2 and explain why credentials must not flow down tiers.",
   "Students will be able to list the protections applied to Protected Users members and identify accounts that should not be added.",
   "Students will be able to describe the purpose and characteristics of a privileged access workstation.",
   "Students will be able to configure allow and deny logon rights to enforce tiering on DCs and lower-tier machines."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up scenario about one admin account used everywhere and collect risks on the board."
   ],
   [
    12,
    "Teach",
    "Draw three tiers as stacked boxes and show credentials moving down as red arrows to be blocked. Cover Protected Users effects, PAWs and the user rights to configure on DCs versus lower-tier machines, plus authentication policy silos."
   ],
   [
    18,
    "Activity",
    "Groups run the tier sort and logon-rights card activity, then design a GPO."
   ],
   [
    5,
    "Discuss",
    "Discuss the usability cost of these controls and how to win admin buy-in."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on paper."
   ]
  ],
  "warmup": "An admin uses one Domain Admins account to check email, fix printers and manage domain controllers. Where are all the places that account's credentials could be stolen?",
  "activity": {
   "title": "Sort the tiers and lock the doors",
   "materials": "Printed system cards (DC, Entra Connect server, CA, file server, SQL server, help desk laptop, user PC, PAW), printed account cards (Domain Admins, server admins, help desk, service account), printed user-rights cards, a whiteboard with three tier columns.",
   "steps": [
    "Groups place each system card in Tier 0, 1 or 2 on the whiteboard and justify any debated placements such as the CA or Entra Connect.",
    "Groups decide which account cards may sign in to each tier and draw blocked arrows where credentials would flow down.",
    "Groups select user-rights cards for a GPO on lower-tier OUs and for the DC allow rights, writing which groups go in each.",
    "Groups decide which account cards belong in Protected Users and explain why the service account does not.",
    "Each group presents its GPO design and the class checks it against the rule that deny rights go on lower tiers."
   ]
  },
  "discussion": [
   "These controls make admins' daily work slower. How would you convince a busy team to adopt separate accounts and PAWs?",
   "Why are systems like Entra Connect or backup servers that touch DCs considered Tier 0 even though they are not DCs?"
  ],
  "exit": [
   [
    "Which tier contains domain controllers and certificate authorities?",
    "Tier 0."
   ],
   [
    "Name two reasons not to add a service account to Protected Users.",
    "Any two: it loses NTLM, cannot be delegated, has no cached credentials and gets short TGTs, which can break the service."
   ],
   [
    "Where do you link the GPO that denies logon rights to Domain Admins?",
    "To the OUs containing lower-tier machines (member servers and workstations), not to the Domain Controllers OU."
   ]
  ],
  "differentiation": [
   "Support: Give students a pre-labeled tier diagram with examples already placed in each tier and have them add the remaining systems and the allowed accounts.",
   "Extend: Ask fast finishers to design an authentication policy silo for Tier 0 accounts, specifying which hosts may request tickets and what TGT lifetime they would set, and explain the domain functional level required."
  ]
 },
 {
  "t": "Windows Defender Firewall profiles, rules and connection security (IPsec) rules",
  "objectives": [
   "Students will be able to explain how Network Location Awareness selects the Domain, Private or Public firewall profile and diagnose a server stuck on the wrong profile.",
   "Students will be able to predict the outcome when allow, block and allow-if-secure rules match the same traffic.",
   "Students will be able to compare the five connection security rule types and choose an IPsec authentication method for domain and non-domain hosts.",
   "Students will be able to design a phased domain isolation rollout using request, exemptions, require and allow-if-secure rules."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the non-domain laptop reaching payroll. Collect two or three answers and write the words firewall, profile and IPsec on the board."
   ],
   [
    15,
    "Teach",
    "Walk through profiles and NLA, then rule actions and precedence, showing the New-NetFirewallRule example on the projector. Finish with connection security rule types, request versus require, and authentication methods. Stress that block wins and preshared keys are for labs."
   ],
   [
    15,
    "Activity",
    "Run the rule-precedence card sort described below in pairs, then have each pair design a domain isolation rollout for the payroll server on a sticky-note timeline."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare pairs' rollout plans, focusing on why request comes before require and which hosts need exemptions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper or a quick form and hand them in."
   ]
  ],
  "warmup": "A laptop that is not in the domain is plugged into the finance network and can open the payroll server's login page. The server's firewall is on. List two reasons that could happen and one thing you would change.",
  "activity": {
   "title": "Who wins? Firewall rule precedence and isolation design",
   "materials": "Printed scenario cards (one traffic flow and two or three matching rules per card), sticky notes, whiteboard, projector.",
   "steps": [
    "Before class, make ten cards. Each describes a connection (source, destination port, profile) and the rules that match it, for example an allow rule for TCP 445 from any address plus a block rule for 10.0.9.0/24, or an allow-if-secure rule with override block rules plus a block rule.",
    "Pairs sort the cards into three piles: allowed, blocked, allowed only if IPsec succeeds. They write one sentence on each card explaining the deciding rule.",
    "Reveal answers on the projector and resolve disagreements, emphasizing block precedence and the override exception.",
    "Each pair then builds a four-step sticky-note timeline for isolating a payroll server: pilot isolation rule with request, exemptions for DCs, DNS and DHCP, switch to require inbound, and an allow-if-secure rule limited to a Finance-PCs group.",
    "Pairs post their timelines on the board and mark which authentication method each step uses."
   ]
  },
  "discussion": [
   "Why might an organization keep an isolation rule on request for weeks before switching to require?",
   "When is it reasonable to disable local rule merging on servers, and what support problems could it cause?",
   "What would you look at first if IPsec security associations never appear after deploying an isolation GPO?"
  ],
  "exit": [
   [
    "A block rule and an allow rule both match inbound TCP 3389 traffic. Is the traffic allowed?",
    "No. Block rules take precedence unless the allow rule is allow-if-secure with override block rules set."
   ],
   [
    "Which authentication method should two non-domain servers in a perimeter network use for IPsec?",
    "Computer certificates from a trusted certification authority; Kerberos needs domain membership and preshared keys are for testing only."
   ],
   [
    "Why would a domain-joined server use the Public profile?",
    "Network Location Awareness could not authenticate to a domain controller on that network, for example due to DNS or connectivity problems at startup."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page flowchart: does a block rule match, is there override block rules, does an allow rule match, otherwise apply the profile default. Have them trace three cards with the flowchart before working alone.",
   "Extend: Ask fast finishers to write the PowerShell for one rule in their design, such as New-NetFirewallRule with -Authentication Required, and to explain how they would verify it with Get-NetIPsecMainModeSA."
  ]
 },
 {
  "t": "Microsoft Defender for Servers via Defender for Cloud: onboarding Arc and Azure servers, recommendations, just-in-time VM access",
  "objectives": [
   "Students will be able to explain how Azure VMs and on-premises servers are onboarded to Defender for Servers, including the role of Azure Arc.",
   "Students will be able to compare Defender for Servers Plan 1 and Plan 2 and choose the plan a scenario requires.",
   "Students will be able to interpret Defender for Cloud recommendations and describe how they affect secure score.",
   "Students will be able to describe how just-in-time VM access changes NSG rules and where it does not apply."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list students' ideas for protecting RDP on the board, grouping them into always closed, always open and sometimes open."
   ],
   [
    15,
    "Teach",
    "Present posture management versus workload protection, Plan 1 versus Plan 2, onboarding Azure VMs by subscription and on-premises servers through Arc, recommendations and secure score, then JIT with a drawn NSG rule table showing deny and temporary allow rules."
   ],
   [
    15,
    "Activity",
    "Run the JIT role-play below: one group plays Defender for Cloud and the NSG, others play engineers requesting access."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the role-play back to Arc servers and plan choice."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Engineers need RDP to a few Azure VMs about once a week. Should the port be open all the time, closed all the time, or something else? What could go wrong with each choice?",
  "activity": {
   "title": "Role-play: the just-in-time door",
   "materials": "Whiteboard drawn as an NSG rule table (priority, port, source, action), sticky notes in two colors, printed request cards with engineer name, role, source IP and requested hours, a timer.",
   "steps": [
    "Split the class into an NSG/Defender for Cloud team, a few engineer pairs and one auditor.",
    "The Defender team enables JIT: they add a deny sticky for 3389 and 22 to the rule table.",
    "Engineers present request cards. The Defender team checks a printed RBAC list; approved requests get a temporary allow sticky with the engineer's source IP and an end time, placed above the deny rule. Denied requests are explained aloud.",
    "The teacher advances the clock; expired allow stickies are removed. The auditor records every request in an activity log column.",
    "Finally, hand the Defender team a card for an on-premises Arc server and ask them to place it. They should explain why they cannot edit its firewall."
   ]
  },
  "discussion": [
   "Why might an organization still enable Plan 2 on a subscription even if it has no plans to use JIT?",
   "What are the trade-offs of exempting a recommendation instead of fixing it?",
   "How would you protect RDP on on-premises servers that JIT cannot cover?"
  ],
  "exit": [
   [
    "What must be installed on an on-premises server before Defender for Servers can protect it?",
    "The Azure Connected Machine agent, onboarding it to Azure Arc in a subscription with the plan enabled."
   ],
   [
    "A scenario requires file integrity monitoring. Which plan is needed?",
    "Defender for Servers Plan 2."
   ],
   [
    "What happens to the NSG when an approved JIT request expires?",
    "The temporary allow rule for the requester's IP is removed, leaving the deny rule in place."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column chart of Plan 1 and Plan 2 features and a three-box onboarding diagram (Azure VM, Arc server, plan enabled) that students fill in during the teach segment.",
   "Extend: Ask students to write a short runbook for responding to a high-severity recommendation that management ports are open on a VM, including how they would verify the fix and the secure score change."
  ]
 },
 {
  "t": "Encryption: BitLocker on servers and Azure VM disk encryption options; SMB signing and encryption",
  "objectives": [
   "Students will be able to explain how BitLocker protects server volumes, including TPM protectors, recovery passwords and Network Unlock.",
   "Students will be able to compare server-side encryption, customer-managed keys, encryption at host and Azure Disk Encryption by where encryption happens.",
   "Students will be able to distinguish SMB signing from SMB encryption and choose the right one for a requirement.",
   "Students will be able to apply these options to design layered encryption for a sensitive file server."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up about the stolen branch server and collect answers. Draw two columns on the board: at rest and in transit."
   ],
   [
    15,
    "Teach",
    "Explain BitLocker with TPM and recovery passwords, then draw a diagram of an Azure VM: guest OS, Hyper-V host, storage. Place ADE in the guest, encryption at host on the host and SSE in storage. Finish with SMB signing versus encryption."
   ],
   [
    15,
    "Activity",
    "Run the where-does-it-encrypt layer matching activity below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to debate trade-offs such as key control and operational overhead."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A server was stolen from a branch office. Which data on it can a thief read, and what could have prevented that? Now imagine the same files being copied across the network. Is the risk the same?",
  "activity": {
   "title": "Where does it encrypt? Layer matching",
   "materials": "A large layered diagram on the whiteboard (guest OS, Hyper-V host, Azure Storage, network wire, on-premises disk), printed requirement cards, sticky notes labeled BitLocker, ADE, encryption at host, SSE platform keys, SSE customer-managed keys, SMB signing, SMB encryption.",
   "steps": [
    "Groups of three receive eight requirement cards, such as must control and rotate the key, temp disk must be encrypted, stolen branch server must be unreadable, stop SMB relay attacks, file contents must be unreadable on the network.",
    "For each card, the group places the matching sticky note on the correct layer of the diagram and writes the card number next to it.",
    "Groups rotate to another group's board and mark any placement they disagree with.",
    "The teacher reviews disputed placements with the class, reinforcing where each type of encryption happens.",
    "Each group writes a one-sentence layered design for a sensitive file server that uses at least three of the notes."
   ]
  },
  "discussion": [
   "Why might an organization choose customer-managed keys even though platform-managed keys are already secure?",
   "What operational risks come with BitLocker on servers, and how do recovery passwords and Network Unlock reduce them?",
   "When would requiring SMB encryption cause problems for older clients, and how would you plan for that?"
  ],
  "exit": [
   [
    "Which Azure disk encryption option encrypts on the Hyper-V host and covers the temporary disk?",
    "Encryption at host."
   ],
   [
    "What does SMB signing protect, and what does it not protect?",
    "It protects integrity and prevents relay or tampering, but it does not keep the contents confidential."
   ],
   [
    "Why must you back up a BitLocker recovery password on a server?",
    "If TPM measurements change, for example after a firmware or hardware change, the volume cannot unlock without the recovery password."
   ]
  ],
  "differentiation": [
   "Support: Give students a three-row cheat card that says storage equals SSE, host equals encryption at host, guest equals ADE, and have them annotate the diagram before attempting requirement cards.",
   "Extend: Ask students to write the PowerShell to enable BitLocker with a TPM protector, add a recovery password and require SMB encryption on one share, and explain how they would verify each with manage-bde and Get-SmbShare."
  ]
 },
 {
  "t": "Performance Monitor counters and data collector sets; baselines; Resource Monitor",
  "objectives": [
   "Students will be able to identify the key processor, memory, disk and network counters and explain what high or low values indicate.",
   "Students will be able to configure a user-defined data collector set and a performance counter alert.",
   "Students will be able to explain why baselines are needed and use one to locate a bottleneck.",
   "Students will be able to choose between Performance Monitor and Resource Monitor for a given troubleshooting question."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and ask students to vote on the cause. Record the votes to revisit at the end."
   ],
   [
    15,
    "Teach",
    "Show counter naming (object, instance, counter), the core counter list, data collector sets and alerts, baselines, and Resource Monitor's handle search and wait chain. If a lab server or student Windows laptops are available, demonstrate perfmon and resmon live."
   ],
   [
    15,
    "Activity",
    "Run the find-the-bottleneck data reading activity below."
   ],
   [
    5,
    "Discuss",
    "Revisit the warm-up votes and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A server is slow every morning for about an hour. Your manager suggests buying more memory. What information would you want before agreeing?",
  "activity": {
   "title": "Find the bottleneck from the recording",
   "materials": "Printed counter tables (teacher-prepared) for four servers, each showing baseline and problem-period values for % Processor Time, Processor Queue Length, Available MBytes, Pages/sec, Avg. Disk sec/Read, Avg. Disk sec/Write and Bytes Total/sec, plus a short Resource Monitor process snapshot; highlighters; whiteboard.",
   "steps": [
    "In pairs, students receive one server's tables and highlight every counter that differs meaningfully from its baseline.",
    "Pairs name the bottleneck (CPU, memory, disk or network) and write one sentence of evidence citing at least two counters.",
    "Using the Resource Monitor snapshot, pairs name the process most likely responsible and propose a fix.",
    "Pairs swap tables with another pair and check each other's conclusion.",
    "The class compiles a whiteboard chart: bottleneck, telltale counters, Resource Monitor evidence."
   ]
  },
  "discussion": [
   "Why is a counter value meaningless without a baseline, and how often should baselines be refreshed?",
   "When would you use a performance counter alert instead of a scheduled data collector set?",
   "What problems could Resource Monitor reveal that Performance Monitor never could?"
  ],
  "exit": [
   [
    "Which counters would you check first for a suspected disk bottleneck?",
    "PhysicalDisk Avg. Disk sec/Read and Avg. Disk sec/Write, compared with the baseline."
   ],
   [
    "You need to capture performance every weekday from 7:45 to 9:30. What do you create?",
    "A user-defined data collector set with the needed counters and a schedule and stop condition."
   ],
   [
    "Which tool shows which process is holding a TCP port right now?",
    "Resource Monitor, on the Network tab (listening ports and TCP connections)."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page counter reference with each counter's resource and what a worrying change looks like, and let students work through one server table together with the teacher before working in pairs.",
   "Extend: Have fast finishers write the logman command to create and start a counter collection and the relog command to convert the result to CSV, then explain how they would schedule it."
  ]
 },
 {
  "t": "Event logs, custom views and event subscriptions (Windows Event Forwarding)",
  "objectives": [
   "Students will be able to navigate Windows and Applications and Services logs and identify key event IDs such as 4624, 4625 and 4740.",
   "Students will be able to build a custom view or Get-WinEvent filter for a specific troubleshooting need.",
   "Students will be able to compare collector-initiated and source-initiated subscriptions and choose one for a scenario.",
   "Students will be able to list the configuration and permissions needed for Windows Event Forwarding to work."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the lockout warm-up and ask how long it would take to check 120 servers manually. Write students' estimates on the board."
   ],
   [
    15,
    "Teach",
    "Tour Event Viewer on the projector, showing log folders, levels and IDs. Build a custom view for 4625 and show the equivalent Get-WinEvent command. Then draw WEF: sources, WinRM, collector, Forwarded Events, and compare the two subscription types."
   ],
   [
    15,
    "Activity",
    "Run the build-the-pipeline card sequencing activity below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on scale and permissions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "An account keeps locking out and you manage 120 servers. Where would you look first, and how long would it take to check every server by hand?",
  "activity": {
   "title": "Build the forwarding pipeline",
   "materials": "Printed cards for each setup step (wecutil qc on collector, enable WinRM on sources, create subscription, GPO Configure target Subscription Manager, add collector to Event Log Readers, grant Network Service Security log access, allow computers by group, create custom view), two scenario sheets, whiteboard.",
   "steps": [
    "Groups of three receive the full card set and Scenario A: collect System errors from four fixed servers, no Group Policy access.",
    "Groups pick only the cards they need and arrange them in order on their desk, then photograph or list the sequence.",
    "Hand out Scenario B: collect Security events 4625 and 4740 from 300 changing member servers. Groups build a new sequence.",
    "Groups compare the two sequences and circle the cards that differ, explaining why.",
    "The teacher reveals model sequences and asks groups to name the subscription type for each scenario."
   ]
  },
  "discussion": [
   "Why might an organization forward only selected event IDs instead of entire logs?",
   "What are the risks of relying on local event logs alone during a security investigation?",
   "When would Minimize Latency delivery be worth the extra network traffic?"
  ],
  "exit": [
   [
    "Which event ID records an account lockout?",
    "4740."
   ],
   [
    "Which subscription type uses the Group Policy setting Configure target Subscription Manager?",
    "Source-initiated."
   ],
   [
    "In a collector-initiated subscription, which group should the collector's account be added to on each source?",
    "The Event Log Readers group."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of the WEF pipeline with blanks for push or pull, WinRM, Forwarded Events and Event Log Readers that students complete during the teach segment.",
   "Extend: Ask fast finishers to write an XPath query for a custom view that shows only 4625 events for one account, and the matching Get-WinEvent command."
  ]
 },
 {
  "t": "Windows Admin Center alerts and System Insights predictive capacity",
  "objectives": [
   "Students will be able to explain what Windows Admin Center shows for servers and clusters and why it must be paired with Azure Monitor for always-on alerting.",
   "Students will be able to name the four default System Insights capabilities and interpret their five statuses.",
   "Students will be able to use the System Insights PowerShell cmdlets to run a forecast, view results and attach a capability action.",
   "Students will be able to assign the correct role to WAC, System Insights and Azure Monitor in a monitoring design."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up about the full archive volume and ask who or what should have noticed. Sketch students' answers on the board."
   ],
   [
    15,
    "Teach",
    "Show WAC's server overview and cluster health concepts, explain its console limitation and the Azure Monitor connection. Then present System Insights: local machine learning, four capabilities, five statuses and the cmdlets, highlighting Set-InsightsCapabilityAction."
   ],
   [
    15,
    "Activity",
    "Run the status-to-action matching activity below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare local prediction with cloud alerting."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A file server filled its disk on a weekend even though it had been filling steadily for two months. What would have needed to exist for someone to be warned in time?",
  "activity": {
   "title": "Forecast, status, action",
   "materials": "Printed capability result cards (capability name, status, short forecast text), printed action cards (run cleanup script, open a ticket, wait for more data, investigate the failure, no action), a three-column whiteboard labeled System Insights, WAC, Azure Monitor.",
   "steps": [
    "Pairs receive eight result cards, such as Volume consumption forecasting Warning, CPU capacity forecasting None, Networking capacity forecasting Error.",
    "Pairs match each result card to the best action card and write the cmdlet they would use, such as Set-InsightsCapabilityAction or Get-InsightsCapabilityResult.",
    "Next, pairs place requirement strips (forecast disk growth offline, email the on-call team at night, view cluster drive faults, run a forecast now) in the correct whiteboard column.",
    "The class reviews placements together, correcting any that put alerting in WAC or cloud upload in System Insights.",
    "Each pair writes a two-sentence monitoring design that uses all three tools."
   ]
  },
  "discussion": [
   "Why might an organization prefer a local prediction engine over a cloud analytics service?",
   "What could go wrong if a capability action automatically deletes files, and how would you limit the risk?",
   "How would you make sure someone is notified when System Insights returns Critical?"
  ],
  "exit": [
   [
    "What does a None status on a System Insights capability usually mean?",
    "There is not yet enough data to make a prediction."
   ],
   [
    "Which tool provides always-on alerting with email notifications for hybrid servers?",
    "Azure Monitor, with alert rules and action groups, often set up from Windows Admin Center."
   ],
   [
    "Which cmdlet runs a System Insights forecast immediately?",
    "Invoke-InsightsCapability."
   ]
  ],
  "differentiation": [
   "Support: Give students a status card listing OK, Warning, Critical, Error and None with a plain-language meaning and a typical action for each, and a list of the cmdlets with one-line descriptions.",
   "Extend: Ask fast finishers to write the PowerShell to attach a script to the Critical status of volume consumption forecasting and to change the capability's schedule, then explain which account the script should run under."
  ]
 },
 {
  "t": "Azure Monitor agent, data collection rules, VM insights and Log Analytics queries for hybrid servers",
  "objectives": [
   "Students will be able to explain the roles of Azure Arc, the Azure Monitor agent, data collection rules and the Log Analytics workspace in hybrid monitoring.",
   "Students will be able to design data collection rules that meet team requirements while controlling ingestion cost.",
   "Students will be able to read and write simple KQL queries against the Event, Perf and Heartbeat tables.",
   "Students will be able to choose between log search alerts and metric alerts and connect them to action groups."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the silent branch server warm-up and ask students how they would have detected it. List their ideas on the board."
   ],
   [
    15,
    "Teach",
    "Draw the pipeline: server (Azure VM or Arc), AMA, DCR, workspace, KQL, alert, action group. Explain why MMA answers are wrong, how DCR filtering controls cost, what VM insights adds, and walk through both KQL queries line by line on the projector."
   ],
   [
    15,
    "Activity",
    "Run the DCR design and KQL reading activity below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about cost and alert design."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A branch server went silent overnight and nobody knew until morning. What signal would tell you a server has stopped reporting, and who should be told?",
  "activity": {
   "title": "Design the DCRs, read the queries",
   "materials": "Printed team requirement sheets (operations, security, application owner), blank DCR template cards (sources, filters, destination, associated machines), printed KQL snippets with blanks, whiteboard, projector.",
   "steps": [
    "Groups of three receive the requirement sheets: operations wants System and Application errors plus CPU and memory counters; security wants only events 4625 and 4740; the app owner wants one text log.",
    "Groups fill in one DCR card per team, writing the source, any XPath filter in plain words, and the destination workspace.",
    "Groups exchange cards and estimate which DCR would ingest the most data and how to reduce it.",
    "Each group completes three KQL snippets with blanks, such as filling in Heartbeat, max(TimeGenerated) and ago(15m), then predicts the output.",
    "Groups pick one query and describe the log search alert and action group they would build from it."
   ]
  },
  "discussion": [
   "What are the risks of collecting too little data to save cost, and how would you decide where the line is?",
   "Why might an organization use Azure Policy rather than installing agents manually?",
   "When is a metric alert a better choice than a log search alert?"
  ],
  "exit": [
   [
    "Why can't you install the Azure Monitor agent on a non-Arc on-premises server for Azure Monitor?",
    "AMA is deployed as an extension on an Azure resource, so the on-premises server must first be an Arc-enabled server."
   ],
   [
    "What Azure resource decides which events and counters AMA collects?",
    "A data collection rule associated with the machine."
   ],
   [
    "Which table and condition find servers that stopped reporting?",
    "The Heartbeat table, finding computers whose latest TimeGenerated is older than a threshold such as 15 minutes."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled pipeline diagram and a KQL operator cheat card (where, summarize, bin, project, sort by, ago) with a one-line example of each.",
   "Extend: Ask fast finishers to write a KQL query that counts 4625 events per computer in the last 24 hours and sorts by count, and to describe the alert threshold they would set."
  ]
 },
 {
  "t": "Troubleshooting connectivity and name resolution (Test-NetConnection, Resolve-DnsName, ipconfig /flushdns)",
  "objectives": [
   "Students will be able to apply a structured troubleshooting order: configuration, IP reachability, port test, name resolution.",
   "Students will be able to interpret Test-NetConnection results, including the difference between PingSucceeded and TcpTestSucceeded.",
   "Students will be able to use Resolve-DnsName options to query specific servers and record types and explain how it differs from nslookup.",
   "Students will be able to explain the DNS client cache, negative caching and the hosts file, and clear stale entries."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the FILES01 IS DOWN ticket and ask students for their first three commands. Write them on the board to compare later."
   ],
   [
    15,
    "Teach",
    "Present the order Config, IP, Name, DNS. Demonstrate ipconfig /all, Test-NetConnection with and without -Port, Resolve-DnsName with -Server and -Type SRV, and the cache commands, using a student laptop or projector screenshots. Contrast nslookup with Resolve-DnsName."
   ],
   [
    15,
    "Activity",
    "Run the pair troubleshooting cards activity below."
   ],
   [
    5,
    "Discuss",
    "Revisit the warm-up commands and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A ticket says a file server is down. It answers on its own console. Write the first three commands you would run from a user's PC, and what each one would tell you.",
  "activity": {
   "title": "Pair troubleshooting: read the output",
   "materials": "Printed output cards (teacher-made) showing ipconfig /all, Test-NetConnection, Resolve-DnsName and nslookup results for six broken scenarios, plus a hidden answer sheet; whiteboard.",
   "steps": [
    "In pairs, one student is the user and holds a scenario's output cards face down; the other is the admin.",
    "The admin asks for one command at a time. The user reveals only the matching output card.",
    "The admin must name the problem category (local config, network or firewall, service down, DNS) using as few commands as possible and propose a fix.",
    "Pairs switch roles for the next scenario. Scenarios include APIPA address, ICMP blocked but port open, stale DNS on one server, negative cache on client, hosts file override and a port that is not listening.",
    "The class tallies how many commands each pair needed and discusses which first command saved the most time."
   ]
  },
  "discussion": [
   "Why is testing the actual service port more reliable than ping?",
   "How could a hosts file entry or an NRPT rule make one computer behave differently from its neighbors?",
   "Why might you query each DNS server separately during an incident?"
  ],
  "exit": [
   [
    "Ping to a server fails, but Test-NetConnection to port 445 succeeds. What does this mean?",
    "ICMP is blocked, but the SMB service is reachable; the server is not down."
   ],
   [
    "Why can nslookup give a different answer from what an application gets?",
    "nslookup queries a DNS server directly and bypasses the client cache and hosts file, which applications use."
   ],
   [
    "After fixing a DNS record, a client still fails. What command do you run on the client?",
    "ipconfig /flushdns or Clear-DnsClientCache to remove stale or negative cached entries."
   ]
  ],
  "differentiation": [
   "Support: Provide a flowchart card that follows Config, IP, Name, DNS with the command and the meaning of a pass or fail at each step, and let struggling pairs use it during the activity.",
   "Extend: Ask fast finishers to write a short PowerShell snippet that runs Resolve-DnsName for one name against a list of DNS servers and displays each server's answer for comparison."
  ]
 },
 {
  "t": "Windows Update, time service (w32tm) and Kerberos troubleshooting; Arc agent and extension troubleshooting (azcmagent check)",
  "objectives": [
   "Students will be able to troubleshoot failed Windows updates using error codes, Get-WindowsUpdateLog, service checks and DISM and SFC repairs.",
   "Students will be able to describe the AD time hierarchy and use w32tm to find and fix a misconfigured time source.",
   "Students will be able to diagnose Kerberos failures by checking time, DNS and SPNs, using klist and setspn.",
   "Students will be able to use azcmagent show, check and logs to troubleshoot a disconnected Arc server."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the three Monday tickets and ask students whether they could be related. Record hypotheses on the board."
   ],
   [
    15,
    "Teach",
    "Cover Windows Update logs and repairs, then draw the time hierarchy from external source to forest root PDC emulator to DCs to members. Explain the five-minute Kerberos tolerance, klist and setspn, then the azcmagent commands and Arc services."
   ],
   [
    15,
    "Activity",
    "Run the troubleshooting station rotation below."
   ],
   [
    5,
    "Discuss",
    "Revisit the warm-up hypotheses and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Three tickets arrive on the same morning: an update failure, Kerberos errors at one site and Arc servers showing Disconnected. Could they share a cause? What single setting would you check that might explain more than one?",
  "activity": {
   "title": "Troubleshooting stations",
   "materials": "Four printed station sheets with command output excerpts (WindowsUpdate.log lines, w32tm /query /source and /status output, klist and setspn -X output, azcmagent show and check output), sticky notes, a timer, whiteboard.",
   "steps": [
    "Set up four stations around the room: Updates, Time, Kerberos and Arc. Each sheet shows real-looking output with one problem in it.",
    "Groups spend about three minutes at each station, writing on a sticky note the problem they see and the next command or fix.",
    "At the Time station the output shows a DC using VM IC Time Synchronization Provider; at Kerberos, a duplicate SPN; at Arc, unreachable endpoints behind a proxy; at Updates, a wrong WSUS address.",
    "After rotating, groups post their notes on the board under each station.",
    "The teacher reviews each station, highlighting the command that would have found the issue fastest."
   ]
  },
  "discussion": [
   "Why does Kerberos enforce a time tolerance at all, and what would happen without it?",
   "What risks come with letting every DC sync from an external time source?",
   "Why is it important to fix the underlying cause before reinstalling a failed Arc extension?"
  ],
  "exit": [
   [
    "What is the default maximum clock skew Kerberos tolerates?",
    "Five minutes."
   ],
   [
    "A DC's time source shows VM IC Time Synchronization Provider. What should you change?",
    "Disable Hyper-V time synchronization for that DC so it follows the domain hierarchy, then resync with w32tm /resync."
   ],
   [
    "Which command collects Arc agent logs into a zip file for analysis?",
    "azcmagent logs."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference card with each area's first two commands (Get-WindowsUpdateLog and DISM; w32tm /query /source and /resync; klist purge and setspn -X; azcmagent show and check) to use at the stations.",
   "Extend: Ask fast finishers to write the w32tm configuration for the forest root PDC emulator and explain what happens to the hierarchy if the PDC emulator role is moved to another DC."
  ]
 },
 {
  "t": "Azure VM troubleshooting: boot diagnostics, Serial Console, Run Command, redeploy",
  "objectives": [
   "Students will be able to use boot diagnostics output to decide whether an unreachable Azure VM has an operating system problem or a network or RDP problem.",
   "Students will be able to compare Serial Console and Run Command, including the prerequisites of each.",
   "Students will be able to explain what redeploy and reapply do and identify the side effects of redeploy.",
   "Students will be able to choose the least disruptive troubleshooting tool for a given Azure VM scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up scenario on the projector and ask students to list what they would do first if the server were in the building, then what they would do if it were in Azure."
   ],
   [
    15,
    "Teach",
    "Walk through the four tools in order. Show example boot diagnostics screenshots described on slides (stop error, stuck update, sign-in screen). Explain SAC, cmd and ch -si 1, Run Command's dependence on the VM agent, the RDP reset options and redeploy versus reapply. Write the prerequisites of each tool in a table on the board."
   ],
   [
    15,
    "Activity",
    "Run the tool-picking card game below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect choices to risk and downtime."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A server in your building stops answering on the network. What would you do first? Now imagine the same server is an Azure VM you can only reach through a web portal. What would you need Azure to give you instead?",
  "activity": {
   "title": "Pick the tool",
   "materials": "Printed scenario cards (one scenario each, with a described boot diagnostics screenshot, VM agent status and NSG result), four tool cards per group (Serial Console, Run Command, Redeploy, RDP reset), whiteboard.",
   "steps": [
    "Put students in groups of three and give each group a stack of eight scenario cards and a set of tool cards.",
    "For each scenario, the group places the tool card they would use first and writes one sentence explaining why and one prerequisite they must confirm.",
    "Include traps: a scenario where the agent is Not Ready (Run Command fails), one with important data on D: (redeploy risk), one with an NSG blocking 3389 (no in-guest tool will help) and one with a stuck update (wait or repair offline).",
    "Groups swap card stacks with a neighbor and check each other's choices, marking any disagreements.",
    "The teacher reviews the disagreements on the whiteboard and confirms the best answer for each."
   ]
  },
  "discussion": [
   "Why might an admin prefer Run Command over Serial Console when both are available?",
   "What are the risks of using redeploy as a reflex whenever a VM misbehaves?",
   "How could you design a VM so that troubleshooting it later is easier?"
  ],
  "exit": [
   [
    "Which tool shows you a screenshot of the VM's screen during boot?",
    "Boot diagnostics."
   ],
   [
    "Run Command fails because the VM agent is Not Ready. What do you use instead to get a command prompt?",
    "Serial Console, which connects through the serial port to SAC and does not need the agent."
   ],
   [
    "Name two side effects of redeploying an Azure VM.",
    "Data on the temporary disk is lost, and dynamic IP addresses on the network interface may change."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page reference table listing each tool, what it needs (boot diagnostics, VM agent, role, password) and what it changes, to use during the card game.",
   "Extend: Ask fast finishers to describe the offline repair process with a rescue VM and explain when they would choose it over Serial Console, including what az vm repair automates."
  ]
 },
 {
  "t": "AD DS recovery: Directory Services Restore Mode, authoritative vs non-authoritative restore, authoritative SYSVOL (DFSR) restore",
  "objectives": [
   "Students will be able to explain what DSRM is, how to enter it and why AD database restores require it.",
   "Students will be able to compare non-authoritative and authoritative restores and choose the right one for a scenario.",
   "Students will be able to describe the ntdsutil authoritative restore steps, including the LDIF import for back-linked group memberships.",
   "Students will be able to outline the non-authoritative and authoritative SYSVOL (DFSR) restore procedures using msDFSR-Enabled and msDFSR-Options."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about restoring a deleted OU and take a quick hand vote: will the users come back after a normal restore? Record the vote on the board."
   ],
   [
    15,
    "Teach",
    "Draw three DCs replicating. Show what happens to a restored DC in a non-authoritative restore, then how raised version numbers make an authoritative restore win. Cover DSRM entry with bcdedit, the ntdsutil commands, LDIF files, tombstone lifetime and the Recycle Bin alternative. Finish with the separate SYSVOL DFSR procedures."
   ],
   [
    15,
    "Activity",
    "Run the replication role-play below."
   ],
   [
    5,
    "Discuss",
    "Revisit the warm-up vote and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Someone deleted an OU with 140 users, and the deletion has already replicated to every domain controller. You restore one DC from last night's backup and reboot it normally. Do the users come back and stay? Why or why not?",
  "activity": {
   "title": "Replication role-play",
   "materials": "Index cards labeled with object names and version numbers, sticky notes, markers, whiteboard, a printed procedure card for SYSVOL restore.",
   "steps": [
    "Choose four students to act as DCs. Each holds cards for the same objects (for example User1 v5, User2 v5, Sales OU v3). Hand everyone a 'deleted' sticky note for the Sales OU at version 4 to show the deletion has replicated.",
    "Restore one DC: give it back the old cards without the deletion. Have DCs compare versions out loud; the higher version wins, and the class sees the deletion return. This is the non-authoritative result.",
    "Repeat, but this time the restored DC adds a large number to the version on the Sales OU card before comparing. The class sees the restored OU win and spread. Then show that a group card held elsewhere still lacks the member link, motivating the LDIF import.",
    "Hand groups the SYSVOL procedure card with the steps shuffled; they put the steps in order and mark which DC each step applies to.",
    "The teacher confirms the correct order on the board and highlights event 4602 on the authoritative DC."
   ]
  },
  "discussion": [
   "Why might Microsoft recommend enabling the AD Recycle Bin even though authoritative restore exists?",
   "What could go wrong if you marked an entire domain partition as authoritative from a week-old backup?",
   "Why does SYSVOL use a separate replication engine, and what does that mean for disaster recovery planning?"
  ],
  "exit": [
   [
    "A DC's database is corrupt, but nothing was deleted and the other DCs are fine. Which restore do you perform?",
    "A non-authoritative restore in DSRM, letting the DC catch up from its partners."
   ],
   [
    "After an authoritative restore of an OU, users are missing from groups in other OUs. What fixes this?",
    "Import the LDIF file ntdsutil generated, using ldifde, to restore the back-linked group memberships."
   ],
   [
    "In an authoritative SYSVOL restore, what value goes into msDFSR-Options on the authoritative DC?",
    "1, with msDFSR-Enabled set to FALSE first and back to TRUE after AD replication and a DFSR restart."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision flowchart card: Was something deleted? If yes and Recycle Bin is on, use Restore-ADObject; if not, authoritative restore. If no, and one DC is broken, non-authoritative. Is the problem in SYSVOL? Use the DFSR procedure.",
   "Extend: Ask fast finishers to compare the ntdsutil authoritative restore with recovering the same OU through the AD Recycle Bin, listing which attributes and links each approach recovers and the downtime each requires."
  ]
 },
 {
  "t": "Backup: Windows Server Backup, bare-metal and system state backup, Azure Backup with the MARS agent and MABS",
  "objectives": [
   "Students will be able to configure and describe Windows Server Backup targets and backup types, including system state and bare-metal recovery.",
   "Students will be able to compare the MARS agent and MABS by what they protect, where they store data and whether they are application-aware.",
   "Students will be able to choose the right backup tool for a given server and recovery requirement.",
   "Students will be able to explain how passphrases, soft delete and offsite copies protect backups from loss and ransomware."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up prompt and have pairs list everything on a domain controller they would need to get back after a total failure. Collect answers on the board."
   ],
   [
    15,
    "Teach",
    "Sort the warm-up list into system state, BMR and full server. Explain Windows Server Backup targets and wbadmin, then MARS (vault credentials, passphrase, three times a day, not app-aware) and MABS (DPM-based, local disk plus Azure, no tape). Close with soft delete and ransomware."
   ],
   [
    15,
    "Activity",
    "Run the backup design challenge below."
   ],
   [
    5,
    "Discuss",
    "Groups share designs and the class uses the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your only domain controller's disk dies tonight. What exactly would you need to have saved to get it back tomorrow, and where should that copy live?",
  "activity": {
   "title": "Backup design challenge",
   "materials": "Printed company profile cards (servers, roles, data and recovery needs), sticky notes in three colors (Windows Server Backup, MARS, MABS), whiteboard or chart paper, markers.",
   "steps": [
    "Give each group a company profile listing about six servers, for example two DCs, a file server, a SQL Server, a Hyper-V host and a branch file server, with recovery needs for each.",
    "Groups place a colored sticky note on each server showing the tool they choose and write the backup type (system state, BMR, files, application) and the target.",
    "Each group adds one sentence on how they protect the backups themselves, such as passphrase storage or soft delete.",
    "Groups trade designs and look for mismatches, such as MARS chosen for SQL Server or a network share target where multiple versions were required.",
    "The teacher reviews common mismatches on the board and confirms the reasoning for each correct choice."
   ]
  },
  "discussion": [
   "Why are high availability features not a substitute for backups?",
   "What are the trade-offs between keeping recovery points on local disk and keeping them only in Azure?",
   "Where should an organization store the MARS passphrase, and who should be able to reach it?"
  ],
  "exit": [
   [
    "What does a bare-metal recovery backup contain that a system state backup does not?",
    "All volumes needed to boot the operating system, so the server can be rebuilt on new hardware or a blank disk."
   ],
   [
    "Name one thing MABS can protect that the MARS agent cannot protect in an application-consistent way.",
    "SQL Server, Exchange or SharePoint databases, or whole Hyper-V or VMware VMs."
   ],
   [
    "How many versions does a network share target in Windows Server Backup keep?",
    "Only the latest backup, because each run overwrites the previous one."
   ]
  ],
  "differentiation": [
   "Support: Give students a three-column comparison card (Windows Server Backup, MARS, MABS) with rows for what it protects, where data goes, app-awareness and key limits to use during the design challenge.",
   "Extend: Ask fast finishers to write the wbadmin commands to back up system state to drive E: and list available versions, then explain how they would recover AD from that backup in DSRM."
  ]
 }
]);
