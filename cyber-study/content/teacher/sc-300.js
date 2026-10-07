/* Teacher edition for Microsoft Certified: Identity and Access Administrator Associate (SC-300 (skills outline of April 27, 2026)): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("sc-300", [
 {
  "t": "Tenant setup: custom domain names and DNS verification, company branding, tenant properties and user settings",
  "objectives": [
   "Students will be able to describe the steps to add and verify a custom domain using a TXT or MX record.",
   "Students will be able to explain why a custom domain cannot be deleted and identify the blocking objects.",
   "Students will be able to identify which tenant properties are permanent, including the initial domain and country or region.",
   "Students will be able to recommend user settings that apply least privilege in a new tenant."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: how could Microsoft know you really own a web address? Collect two or three guesses on the whiteboard and point out any that involve changing something only the owner can change."
   ],
   [
    12,
    "Teach",
    "Walk through the domain lifecycle on the projector: initial onmicrosoft.com domain, add custom domain, publish TXT or MX record, verify, set primary, and remove. Then cover company branding, tenant properties and the main user settings, stressing the words permanent and fixed at creation."
   ],
   [
    18,
    "Activity",
    "Run the Tenant Setup Ticket Sort. Pairs sort ticket cards into actions and explain each decision aloud to another pair."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions, focusing on which defaults favor collaboration over control and why that matters."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your company just bought a web address. Without logging in to anything, how could a cloud provider confirm the address is really yours?",
  "activity": {
   "title": "Tenant Setup Ticket Sort",
   "materials": "Printed ticket cards (12 short help-desk tickets the teacher writes), sticky notes, whiteboard with four columns: DNS record, Branding, Tenant properties, User settings.",
   "steps": [
    "Hand each pair a set of 12 ticket cards, for example: domain verify fails after 5 minutes, logo missing on sign-in page, intern created an app registration, cannot delete old domain, region chosen wrong at setup.",
    "Pairs place each card in the correct column and write the fix on a sticky note attached to it.",
    "Each pair flags any card where the answer is that it cannot be done (such as changing the country or deleting the onmicrosoft.com domain).",
    "Pairs swap boards with a neighbor pair and challenge one decision they disagree with.",
    "The teacher reveals the answer key and highlights the two most common mix-ups."
   ]
  },
  "discussion": [
   "Why do you think Microsoft makes the onmicrosoft.com domain permanent?",
   "Which default user setting would you change first in a new tenant, and what risk does it reduce?",
   "How does company branding help users notice a phishing page, and where does that protection end?"
  ],
  "exit": [
   [
    "Which two DNS record types can verify a custom domain in Entra?",
    "TXT (most common) or MX, containing the MS=ms value."
   ],
   [
    "Name one thing that must happen before you can delete a custom domain.",
    "Rename or remove every user, group and app that still uses the domain."
   ],
   [
    "Which tenant property can never be changed after creation?",
    "The country or region, which determines data location."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a one-page flowchart of the domain lifecycle (add, verify, primary, remove) and let them sort only the DNS tickets first.",
   "Extend: ask fast finishers to draft a five-item hardening checklist for user settings in a new tenant, with one sentence of justification per item."
  ]
 },
 {
  "t": "Microsoft Entra built-in roles, custom roles and least-privilege role assignment",
  "objectives": [
   "Students will be able to distinguish Microsoft Entra roles from Azure RBAC roles in a scenario.",
   "Students will be able to select the least-privileged built-in role for a described administrative task.",
   "Students will be able to identify the three parts of a role assignment and choose an appropriate scope.",
   "Students will be able to explain when a custom role or a role-assignable group is appropriate and its key constraints."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take a quick show of hands: Global Admin, User Admin, or something smaller. Leave the votes on the board to revisit."
   ],
   [
    12,
    "Teach",
    "Draw two boxes, Entra roles and Azure RBAC, and list examples in each. Then walk through the common built-in roles, the Who-What-Where of assignments, custom role limits, and role-assignable groups."
   ],
   [
    18,
    "Activity",
    "Run Least-Privilege Auction: teams bid the smallest role and scope that solve each task card, and the class judges whether the bid works."
   ],
   [
    5,
    "Discuss",
    "Revisit the warm-up votes and lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A help-desk technician needs to reset ordinary users' passwords. Would you give them Global Administrator, User Administrator, or something smaller, and why?",
  "activity": {
   "title": "Least-Privilege Auction",
   "materials": "Printed task cards (10 admin tasks), printed role cards listing about 12 built-in roles with one-line descriptions, whiteboard for scoring.",
   "steps": [
    "Split the class into teams of three and give each team a full set of role cards.",
    "The teacher reads a task card aloud, such as reset a Global Administrator's MFA phone number, or manage only the payroll app's secrets.",
    "Each team writes its bid: role, scope (tenant, administrative unit or single resource) and whether it should be eligible or active.",
    "The class checks the lowest bid: if the role cannot do the task, the next lowest bid wins the point.",
    "After all cards, the teacher reviews any task where teams chose an Azure RBAC role by mistake."
   ]
  },
  "discussion": [
   "Why might Privileged Role Administrator be treated as dangerous as Global Administrator?",
   "When would a custom role be better than the closest built-in role, and what limits might stop you?",
   "What could go wrong if lower-level admins could change membership of groups that hold roles?"
  ],
  "exit": [
   [
    "Which role can manage authentication methods for Global Administrators?",
    "Privileged Authentication Administrator."
   ],
   [
    "Name the three parts of an Entra role assignment.",
    "Principal, role definition and scope."
   ],
   [
    "Can a subscription Owner reset an Entra user's password through that Azure role?",
    "No. Azure RBAC roles manage Azure resources, not directory objects; an Entra role is required."
   ]
  ],
  "differentiation": [
   "Support: give students a two-column cheat card of 8 common roles with what each can and cannot do, and let them use it during the auction.",
   "Extend: ask fast finishers to design a custom role for a team that only updates app registration credentials, naming the permissions they would look for and the scope they would assign."
  ]
 },
 {
  "t": "Administrative units, including restricted management administrative units, to scope admin roles",
  "objectives": [
   "Students will be able to explain how an administrative unit limits the reach of a scoped role assignment.",
   "Students will be able to predict what an AU-scoped admin can and cannot manage when groups are added to an AU.",
   "Students will be able to compare normal and restricted management administrative units and choose between them.",
   "Students will be able to identify licensing and creation-time constraints for administrative units."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and ask pairs to suggest how they would keep each faculty's IT team inside its own lane."
   ],
   [
    12,
    "Teach",
    "Draw a tenant as a large rectangle with smaller boxes for AUs, showing overlap and no nesting. Explain scoped roles, the group-versus-members rule, which roles can be AU-scoped, licensing, then add a locked box for a restricted management AU and explain who can and cannot reach it."
   ],
   [
    18,
    "Activity",
    "Run the Boxes and Keys role-play using a floor map of the classroom divided into AUs."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions, focusing on where restricted management stops protecting."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A university has twelve faculties sharing one directory. How would you stop one faculty's IT technician from resetting passwords in another faculty?",
  "activity": {
   "title": "Boxes and Keys",
   "materials": "Masking tape or whiteboard drawings to mark three AU zones (one restricted), name cards for users, group cards, role cards for students acting as admins, and a set of request cards.",
   "steps": [
    "Mark two normal AU zones and one restricted management AU zone on the floor or whiteboard; place user and group cards inside them, with one user in two AUs.",
    "Give some students tenant-wide role cards and others AU-scoped role cards.",
    "The teacher reads request cards such as reset the password of a user in the Science AU, or change membership of the protected payroll group.",
    "Each admin student says whether their role allows it and why; the class confirms or corrects.",
    "Finish with a twist card: a group is in the AU but its members are not; ask who can reset a member's password."
   ]
  },
  "discussion": [
   "Why is a restricted management AU described as a guard rather than an absolute wall?",
   "What kinds of accounts in your own organization would you put in a restricted management AU?",
   "What are the advantages of dynamic AU membership over assigned membership, and what new risk does it introduce?"
  ],
  "exit": [
   [
    "A group is added to an AU. Can the AU-scoped Helpdesk Administrator reset its members' passwords?",
    "No. The member users must be added to the AU too."
   ],
   [
    "What stops a tenant-wide User Administrator from editing an executive's account?",
    "Placing the executive in a restricted management administrative unit."
   ],
   [
    "Can you make an existing normal AU restricted?",
    "No. Restricted management is chosen when the AU is created."
   ]
  ],
  "differentiation": [
   "Support: provide a two-row comparison card (normal AU versus restricted management AU) with who can manage objects in each, and let students use it during the role-play.",
   "Extend: ask fast finishers to design an AU plan for a company with three regions and an executive team, including dynamic rules, scoped roles and which AU should be restricted."
  ]
 },
 {
  "t": "Users and groups: security vs Microsoft 365 groups, assigned vs dynamic membership rules, bulk operations",
  "objectives": [
   "Students will be able to compare security groups and Microsoft 365 groups by purpose, membership and restore behavior.",
   "Students will be able to write and validate a simple dynamic membership rule for users or devices.",
   "Students will be able to troubleshoot a missing dynamic group member by checking source attributes.",
   "Students will be able to choose between portal bulk operations and Graph PowerShell for large changes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student ideas for keeping access lists current."
   ],
   [
    12,
    "Teach",
    "Use a two-column table on the whiteboard for security versus Microsoft 365 groups, then explain assigned versus dynamic membership, show the sample rule on the projector, and finish with bulk operations and their results page."
   ],
   [
    18,
    "Activity",
    "Run Rule Writers: pairs write dynamic rules for scenario cards and test them against a printed list of fictional users."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A company has 500 employees who change jobs often. What is the problem with adding people to access groups by hand, and how could the list maintain itself?",
  "activity": {
   "title": "Rule Writers",
   "materials": "Printed sheet of 15 fictional users with department, country and jobTitle values (including a few typos), scenario cards, whiteboard, student laptops or paper.",
   "steps": [
    "Give each pair three scenario cards, such as all Sales staff in Canada, or everyone whose job title starts with Nurse.",
    "Pairs write a dynamic rule for each card using operators like -eq, -startsWith and -and.",
    "Pairs validate by hand against the printed user list, marking who would be included, just as Validate Rules would.",
    "Pairs spot the users who should be included but are not because of attribute typos, and decide the fix.",
    "Two pairs present one rule each; the class checks whether it mixes user and device attributes or targets the wrong group type."
   ]
  },
  "discussion": [
   "When would assigned membership still be the better choice than dynamic membership?",
   "Why do you think Microsoft 365 groups cannot contain devices or nested groups?",
   "What risks come with a dynamic rule based on an attribute that anyone in HR can edit?"
  ],
  "exit": [
   [
    "Which group type can contain devices?",
    "Security groups."
   ],
   [
    "A user is missing from a dynamic group. What do you fix?",
    "The attribute the rule evaluates, or the rule itself; manual add is not possible."
   ],
   [
    "Which deleted objects can be restored within 30 days?",
    "Users and Microsoft 365 groups; deleted security groups cannot be restored."
   ]
  ],
  "differentiation": [
   "Support: give students a rule syntax card with three worked examples and a list of the common operators, and start them on single-condition rules.",
   "Extend: ask fast finishers to write a rule using -in or -match and to plan a CSV bulk create for 60 new hires, listing the required columns and how they would handle failed rows."
  ]
 },
 {
  "t": "Licenses: direct vs group-based licensing and resolving license assignment errors",
  "objectives": [
   "Students will be able to compare direct and group-based licensing, including how inherited and direct assignments interact.",
   "Students will be able to identify the cause of common license assignment errors from a description.",
   "Students will be able to sequence the steps to fix a license error and reprocess the assignment.",
   "Students will be able to plan a migration from direct to group-based licensing without losing service."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up and collect answers on how a company would know who still needs a paid seat."
   ],
   [
    12,
    "Teach",
    "Draw a license as a box containing service plans, then contrast direct and group paths to a user. Walk through the five common errors with a short real-world cause for each and end with Reprocess."
   ],
   [
    18,
    "Activity",
    "Run License Error Clinic: small groups diagnose printed user license panels and write the fix plus the retry step."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A company pays for every license seat each month. How would it know which seats are assigned to people who no longer need them?",
  "activity": {
   "title": "License Error Clinic",
   "materials": "Printed mock license panels the teacher creates (user name, usage location, assignments marked Direct or Inherited, error text), sticky notes, whiteboard.",
   "steps": [
    "Give each group of three a set of six mock panels, each showing one problem such as a missing usage location or a direct plus inherited assignment.",
    "Groups write the error cause and the fix on a sticky note for each panel.",
    "Groups add the final step, Reprocess, wherever it is needed and note any case where it is not.",
    "Each group presents one panel; the class votes on whether the fix is correct.",
    "Close by having groups write a four-step plan to migrate a department from direct to group-based licensing."
   ]
  },
  "discussion": [
   "Why might an organization keep some direct assignments even after moving to group-based licensing?",
   "How does pairing group-based licensing with dynamic groups change the role of HR data quality?",
   "What evidence would you show an auditor to explain who removed a license?"
  ],
  "exit": [
   [
    "What must be set before a license can be assigned to a user?",
    "The usage location."
   ],
   [
    "A user left a licensing group but kept the license. Why?",
    "They also have a direct assignment of the same product."
   ],
   [
    "What action retries a failed group license assignment after you fix the cause?",
    "Reprocess."
   ]
  ],
  "differentiation": [
   "Support: provide an error-to-fix matching card listing the five error names and their typical fixes, and let students match before diagnosing panels.",
   "Extend: ask fast finishers to design a group-based licensing plan where one department needs a license with one service plan disabled, explaining how they would avoid conflicting service plans."
  ]
 },
 {
  "t": "Devices: Microsoft Entra registered, Microsoft Entra joined and Microsoft Entra hybrid joined; device settings",
  "objectives": [
   "Students will be able to classify a device scenario as Microsoft Entra registered, joined or hybrid joined.",
   "Students will be able to explain how hybrid join is configured through Microsoft Entra Connect and the SCP.",
   "Students will be able to recommend device settings, including join permissions, device limits, local admins and LAPS.",
   "Students will be able to distinguish a compliant device from a hybrid joined device in Conditional Access."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sort student answers into personal and company-owned on the board."
   ],
   [
    12,
    "Teach",
    "Draw three icons for registered, joined and hybrid joined with owner, sign-in account and where each is configured. Then walk through the device settings page on the projector and contrast compliant with hybrid joined."
   ],
   [
    18,
    "Activity",
    "Run Device Identity Sort: groups sort device scenario cards into the three join types and attach a device setting or Conditional Access requirement to each."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "List three devices you used today to reach school or work resources. Who owns each one, and should your organization treat them the same way?",
  "activity": {
   "title": "Device Identity Sort",
   "materials": "Printed scenario cards (12 devices described in one or two sentences), whiteboard with three columns, sticky notes for settings.",
   "steps": [
    "Give each group of three a set of 12 scenario cards, such as a teller desktop on the domain with Group Policy, a new Autopilot laptop, or a manager's personal iPhone.",
    "Groups place each card under Registered, Joined or Hybrid joined.",
    "For each card, groups add a sticky note with one control, such as require compliant device, browser-only access, or LAPS.",
    "Groups trade boards and mark any card they would move, with a reason.",
    "The teacher reviews the cards that caused disagreement and highlights the compliant versus hybrid joined distinction."
   ]
  },
  "discussion": [
   "Why might an organization stay on hybrid join for years instead of moving to Microsoft Entra join?",
   "What risks come from letting the user who joins a device become its local administrator?",
   "Should personal devices ever get full access to sensitive apps? What controls would make you comfortable?"
  ],
  "exit": [
   [
    "A contractor adds their work account to a personal laptop. Which identity type is this?",
    "Microsoft Entra registered."
   ],
   [
    "Where is hybrid join configured?",
    "In Microsoft Entra Connect, which creates the service connection point."
   ],
   [
    "Does hybrid joined prove a device is encrypted and patched?",
    "No. That is what Intune compliance checks."
   ]
  ],
  "differentiation": [
   "Support: give students a three-question flowchart (personal or company? Windows? on-premises AD required?) that leads to the right join type.",
   "Extend: ask fast finishers to design a Conditional Access approach for the three device types in the warm-up scenario, including what each type is allowed to reach."
  ]
 },
 {
  "t": "External identities: B2B collaboration, guest invitations and redemption, external collaboration settings",
  "objectives": [
   "Students will be able to describe how a B2B guest is invited, redeems and authenticates.",
   "Students will be able to select the correct guest invite setting and guest access level for a scenario.",
   "Students will be able to configure collaboration restrictions with an allow list or deny list.",
   "Students will be able to recommend governance controls for guest accounts."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list the risks of creating accounts for outsiders on the board."
   ],
   [
    12,
    "Teach",
    "Draw the invitation flow: invite, email, redemption, guest object, access. Then show the authentication order, the three guest access levels, the four invite settings and collaboration restrictions."
   ],
   [
    18,
    "Activity",
    "Run the Front Desk Rules role-play: groups set the external collaboration settings for a fictional company and test them against visitor scenario cards."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A partner company's designers need access to your project files for three months. What could go wrong if you just create accounts and passwords for them?",
  "activity": {
   "title": "Front Desk Rules",
   "materials": "A printed settings sheet listing guest access levels, invite settings and collaboration restriction options; printed visitor scenario cards; whiteboard.",
   "steps": [
    "Give each group a company brief, for example a hospital that must not collaborate with a named competitor and wants only a partner team to invite.",
    "Groups choose one option for guest access, guest invite settings and collaboration restrictions, and record why.",
    "The teacher reads visitor cards such as an intern tries to invite a friend, or a guest tries to browse the staff list.",
    "Groups say whether their settings allow or block each case, and adjust if the result conflicts with the brief.",
    "Groups finish by naming one governance control (access review, access package or sign-in log check) for their guests."
   ]
  },
  "discussion": [
   "Why is it safer for a partner to sign in with their own identity than with an account you create?",
   "When would you prefer an allow list over a deny list for collaboration?",
   "How would you find and clean up guests who no longer need access?"
  ],
  "exit": [
   [
    "What does Pending acceptance mean on a guest account?",
    "The guest has not yet redeemed the invitation."
   ],
   [
    "Which role lets non-admins invite guests when invitations are restricted to admin roles?",
    "Guest Inviter."
   ],
   [
    "Which setting limits guests to seeing only their own profile?",
    "The most restrictive guest user access level, restricted to their own directory objects."
   ]
  ],
  "differentiation": [
   "Support: give students a ladder diagram showing the three guest access levels and four invite levels from most to least inclusive.",
   "Extend: ask fast finishers to compare B2B collaboration with B2B direct connect and predict which they would choose for a Teams shared channel with a partner."
  ]
 },
 {
  "t": "Cross-tenant access settings (inbound/outbound, trust settings), B2B direct connect and cross-tenant synchronization",
  "objectives": [
   "Students will be able to explain inbound and outbound cross-tenant access and why both sides must allow a connection.",
   "Students will be able to identify when inbound trust settings or automatic redemption solve a collaboration problem.",
   "Students will be able to compare B2B collaboration, B2B direct connect and cross-tenant synchronization.",
   "Students will be able to describe where cross-tenant synchronization is configured in each tenant."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about two schools sharing students and capture the rules students suggest."
   ],
   [
    12,
    "Teach",
    "Draw two tenant boxes with inbound and outbound arrows on each side. Add trust settings as a badge accepted at the door, B2B direct connect as a shared room between them, and cross-tenant sync as a one-way conveyor from source to target."
   ],
   [
    18,
    "Activity",
    "Run Two-Tenant Handshake: pairs play the admins of two tenants and must configure matching settings to solve scenario cards."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Two neighboring schools want some students to attend classes at both. What rules would each school need to agree on, and what should happen to a hall pass issued at the other school?",
  "activity": {
   "title": "Two-Tenant Handshake",
   "materials": "Printed configuration sheets for Tenant A and Tenant B (inbound, outbound, trust, direct connect, sync), scenario cards, sticky notes.",
   "steps": [
    "Pair students; one is the Tenant A admin and the other the Tenant B admin, each with a blank configuration sheet.",
    "The teacher reads a scenario card, such as share a Teams channel without guests, or partner users keep re-registering MFA.",
    "Each admin fills in only their own sheet without looking at their partner's, then they compare.",
    "The pair decides whether the scenario now works and, if not, which side's setting is missing.",
    "After three scenarios, pairs write which tenant configures cross-tenant synchronization and which one only allows it."
   ]
  },
  "discussion": [
   "Why is B2B direct connect off by default, when B2B collaboration is not?",
   "What are the risks of trusting another tenant's compliant device claims, and when is it worth it?",
   "Why would a company synchronize users as members rather than guests between its own tenants?"
  ],
  "exit": [
   [
    "Which setting lets partner users satisfy your MFA requirement with MFA done at home?",
    "Inbound trust settings, trusting MFA from that tenant."
   ],
   [
    "What must both organizations do for B2B direct connect?",
    "Enable it inbound and outbound for each other."
   ],
   [
    "In which tenant is the cross-tenant synchronization job configured?",
    "The source tenant."
   ]
  ],
  "differentiation": [
   "Support: give students a three-row table (B2B collaboration, B2B direct connect, cross-tenant sync) with columns for guest object created, who configures it, and typical use.",
   "Extend: ask fast finishers to design two-way synchronization between three sister tenants, counting how many configurations are needed and which settings each tenant must allow."
  ]
 },
 {
  "t": "Hybrid identity: Microsoft Entra Connect Sync vs Microsoft Entra Cloud Sync, filtering and sync scheduling",
  "objectives": [
   "Students will be able to compare Microsoft Entra Connect Sync and Cloud Sync by architecture, high availability and features.",
   "Students will be able to choose the right sync tool for a scenario, including disconnected forests.",
   "Students will be able to describe filtering options and the accidental deletes threshold.",
   "Students will be able to select delta or initial sync cycles and explain when each is needed."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list what could go wrong if every account in a building's directory were copied to the cloud."
   ],
   [
    12,
    "Teach",
    "Draw Connect Sync as a server with a database and a standby server, and Cloud Sync as several small agents talking to the cloud. List feature differences, filtering options, the deletes threshold and the scheduler commands on the projector."
   ],
   [
    18,
    "Activity",
    "Run Pick the Sync Engine: groups receive company profile cards and design a sync architecture, then defend it to another group."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you copied every account from an office directory to the cloud, including test accounts and old service accounts, what problems might follow?",
  "activity": {
   "title": "Pick the Sync Engine",
   "materials": "Printed company profile cards (forests, connectivity, needs like hybrid join or PTA), whiteboard or chart paper, markers.",
   "steps": [
    "Give each group of three two company profile cards, one simple and one with multiple disconnected forests.",
    "Groups sketch the sync design: which tool per forest, how many servers or agents, and how they get high availability.",
    "Groups add a filtering plan, naming what they will exclude and how (OU, domain, attribute or group).",
    "Each group explains its design to another group, which must find one requirement the design misses.",
    "The teacher closes by asking which PowerShell cycle each group would run after changing its filter."
   ]
  },
  "discussion": [
   "Why might an organization keep Connect Sync even though Microsoft positions Cloud Sync as the future?",
   "What risks arise if Connect Sync and Cloud Sync scopes overlap?",
   "Why is a deletion threshold a useful safety feature, and could it ever get in the way?"
  ],
  "exit": [
   [
    "How often does Connect Sync run a delta sync by default?",
    "Every 30 minutes."
   ],
   [
    "Which tool suits a disconnected forest after a merger?",
    "Microsoft Entra Cloud Sync."
   ],
   [
    "Which command forces a full sync after a filter change?",
    "Start-ADSyncSyncCycle -PolicyType Initial."
   ]
  ],
  "differentiation": [
   "Support: provide a feature comparison card listing five features with a check under Connect Sync, Cloud Sync or both, and let students use it while designing.",
   "Extend: ask fast finishers to plan a migration of one forest from Connect Sync to Cloud Sync, identifying features they would lose and how they would avoid overlapping scope during the cutover."
  ]
 },
 {
  "t": "Sign-in methods for hybrid users: password hash sync, pass-through authentication, federation, Seamless SSO, staged rollout",
  "objectives": [
   "Students will be able to explain where the password is validated in PHS, PTA and federation.",
   "Students will be able to select a hybrid sign-in method from scenario requirements such as resilience, on-premises policy enforcement and leaked credential detection.",
   "Students will be able to describe how Seamless SSO works and which methods it supports.",
   "Students will be able to plan a migration from federation to cloud authentication using staged rollout."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario and ask students to list everything that must be working for a federated user to sign in."
   ],
   [
    12,
    "Teach",
    "Draw three sign-in paths side by side: PHS ending in the cloud, PTA with a queue and agents, and federation with a redirect to AD FS. Add Seamless SSO under PHS and PTA, then show staged rollout as a pilot group moving between paths."
   ],
   [
    18,
    "Activity",
    "Run Follow the Password: groups act out each sign-in path with role cards, then solve requirement cards by choosing a method."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A single server in your data center fails at 6 a.m. Which sign-in method would stop everyone from reaching email, and which would not be affected?",
  "activity": {
   "title": "Follow the Password",
   "materials": "Role cards (User, Entra ID, PTA agent, Domain controller, AD FS server), a paper token to pass around, printed requirement cards, whiteboard.",
   "steps": [
    "Assign role cards to five volunteers per group and have them act out a PHS sign-in, a PTA sign-in and a federated sign-in, passing the paper token along the path.",
    "For each path, the group removes one role (for example, the PTA agent goes offline) and notes who can still sign in.",
    "Groups receive requirement cards such as logon hours must apply, no extra servers, or third-party MFA server in the path, and choose a method for each.",
    "Groups write a three-step staged rollout plan for moving a federated company to PHS.",
    "Groups share answers and the teacher corrects any pairing of Seamless SSO with federation."
   ]
  },
  "discussion": [
   "Why do many organizations enable password hash sync even if they use PTA or federation?",
   "What are the security trade-offs of storing password hashes in the cloud versus checking passwords on-premises?",
   "What would make you keep federation instead of moving to cloud authentication?"
  ],
  "exit": [
   [
    "Which method enforces on-premises logon hours at sign-in without storing hashes in the cloud?",
    "Pass-through authentication."
   ],
   [
    "Which methods can use Seamless SSO?",
    "Password hash synchronization and pass-through authentication, not federation."
   ],
   [
    "What type of group must you use for staged rollout?",
    "Directly assigned security groups, not nested or dynamic groups."
   ]
  ],
  "differentiation": [
   "Support: give students a decision table with three rows (PHS, PTA, federation) and columns for where the password is checked, on-premises dependency and key benefit.",
   "Extend: ask fast finishers to write a cutover plan from AD FS to PHS that includes backup authentication, pilot group selection, monitoring and the final domain conversion."
  ]
 },
 {
  "t": "Monitoring sync health with Microsoft Entra Connect Health and troubleshooting sync errors",
  "objectives": [
   "Students will be able to describe what Microsoft Entra Connect Health monitors and how alerts reach administrators.",
   "Students will be able to identify common synchronization error categories from a report excerpt.",
   "Students will be able to explain hard match and soft match, including the admin-account protection.",
   "Students will be able to apply a troubleshooting sequence that fixes errors at the source of authority."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student ideas for noticing a background process that fails silently."
   ],
   [
    12,
    "Teach",
    "Show the parts of Connect Health (agents, alerts, notifications), then project five short error excerpts and name each category. Explain hard and soft match with a two-box drawing and finish with the Read-Identify-Fix-Sync sequence."
   ],
   [
    18,
    "Activity",
    "Run Sync Error Detectives: pairs work through printed error report excerpts and AD object cards to find and fix each conflict."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A process copies new accounts to the cloud every 30 minutes, and one day it starts failing for a single user. How would anyone find out, and how long might it take?",
  "activity": {
   "title": "Sync Error Detectives",
   "materials": "Printed error report excerpts (five cases the teacher writes, such as duplicate proxyAddresses or invalid UPN characters), printed AD object cards showing attributes, sticky notes, whiteboard.",
   "steps": [
    "Give each pair five error excerpts and a stack of AD object cards that include the conflicting objects.",
    "Pairs label each excerpt with its error category and find the object cards involved.",
    "Pairs write the fix on a sticky note, stating where the change is made (on-premises AD or not) and the command to resync.",
    "Include one case with no errors where the server is in staging mode; pairs must explain why nothing exports.",
    "Pairs compare answers with another pair and the teacher reviews the staging mode and soft match cases."
   ]
  },
  "discussion": [
   "Why is editing a synced attribute in the cloud a bad idea even if the portal lets you try?",
   "Why do you think Microsoft blocks soft matching to cloud admin accounts?",
   "Who on a team should receive Connect Health alert emails, and why?"
  ],
  "exit": [
   [
    "What causes a duplicate attribute error?",
    "Two objects share a value that must be unique, such as UPN or proxyAddresses."
   ],
   [
    "Where should you fix a synced user's incorrect attribute?",
    "In the source of authority, usually on-premises AD, then run a delta sync."
   ],
   [
    "Sync stopped with no errors. Name one thing to check.",
    "Whether the scheduler is disabled or the server is in staging mode, using Get-ADSyncScheduler."
   ]
  ],
  "differentiation": [
   "Support: give students a reference card listing the five error categories with a one-line cause and fix for each, and start them on the duplicate attribute cases.",
   "Extend: ask fast finishers to write a short runbook for a new admin covering Connect Health notifications, the troubleshooting sequence, IdFix before onboarding a new domain, and when to use the Connect wizard's troubleshooting task."
  ]
 },
 {
  "t": "Authentication methods policy: Microsoft Authenticator, passkeys (FIDO2), Windows Hello for Business, certificate-based authentication, Temporary Access Pass, SMS/voice",
  "objectives": [
   "Students will be able to rank Entra authentication methods by strength and identify which are phishing-resistant.",
   "Students will be able to explain how number matching defeats MFA fatigue and how passkeys defeat phishing.",
   "Students will be able to configure targeting, attestation and AAGUID restrictions in the Authentication methods policy for a scenario.",
   "Students will be able to choose Temporary Access Pass, CBA or SMS for onboarding, smart card and fallback scenarios."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up question. Collect three or four answers and write the methods students name on the whiteboard without ranking them yet."
   ],
   [
    15,
    "Teach",
    "Walk through the Authentication methods policy: targeting, the Configure tab, then each method. Draw the strength ladder and move the board items onto it. Explain number matching, why passkeys only answer the real domain, TPM binding for Windows Hello, CBA binding rules, and TAP as the bootstrap."
   ],
   [
    15,
    "Activity",
    "Run the Method Match card sort in pairs. Circulate and ask each pair to justify one placement aloud."
   ],
   [
    5,
    "Discuss",
    "Pose the discussion questions. Push students to separate what the policy enables from what Conditional Access requires."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Think of the last time you signed in to something with a code sent by text message. How could an attacker get that code without touching your phone?",
  "activity": {
   "title": "Method Match",
   "materials": "Printed scenario cards (eight per pair) and method cards (Authenticator push, passkey, Windows Hello for Business, CBA, TAP, SMS, OATH token, email OTP); whiteboard for the class ladder.",
   "steps": [
    "Give each pair the method cards and have them arrange them as a ladder from strongest to weakest, marking phishing-resistant methods with a star.",
    "Hand out scenario cards such as a new hire with no methods, a defense contractor with smart cards, a user without a smartphone, executives who must resist phishing, and a team that keeps approving random prompts.",
    "Pairs place each scenario next to the best method and write the policy setting involved, such as AAGUID restriction or number matching.",
    "Each pair presents one scenario; the class challenges any answer that confuses enabling a method with requiring it."
   ]
  },
  "discussion": [
   "Why might an organization keep SMS enabled even though it is the weakest method, and how would you limit the risk?",
   "Who in an organization should be allowed to issue Temporary Access Passes, and what could go wrong if anyone could?"
  ],
  "exit": [
   [
    "Name the three phishing-resistant method families in Entra.",
    "Passkeys (FIDO2), Windows Hello for Business and certificate-based authentication."
   ],
   [
    "A new user has no registered methods and must go passwordless. What do you issue?",
    "A Temporary Access Pass, ideally one-time use with a short lifetime."
   ],
   [
    "How do you allow only one approved security key model?",
    "Enforce attestation and restrict by that model's AAGUID in the passkey (FIDO2) settings."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pre-drawn three-rung ladder labeled phishing-resistant, app-based and phone-based, so they only need to sort methods into rungs before tackling scenarios.",
   "Extend: Ask fast finishers to design the method policy for a company with frontline workers on shared devices, office staff with laptops and contractors, naming the targeting groups and settings for each method."
  ]
 },
 {
  "t": "Registration campaigns, combined security info registration and system-preferred MFA",
  "objectives": [
   "Students will be able to explain the role of combined registration, registration campaigns and system-preferred MFA in moving users to stronger methods.",
   "Students will be able to design a Conditional Access policy on the Register security information user action to protect method registration.",
   "Students will be able to predict which method system-preferred MFA will prompt for given a user's registered methods.",
   "Students will be able to use registration reports to measure progress toward strong authentication."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and tally answers on the board. Point out that most people rarely revisit their default sign-in method."
   ],
   [
    15,
    "Teach",
    "Draw the lifecycle as four boxes: register, protect registration, nudge, prefer strongest. Explain each feature, the snooze behavior, and the Register security information user action. Show where the User registration details report fits."
   ],
   [
    15,
    "Activity",
    "Run the Rollout Planner in groups of three. Each group drafts a plan on chart paper or the whiteboard."
   ],
   [
    5,
    "Discuss",
    "Groups compare plans. Use the discussion questions to surface trade-offs between strictness and help desk load."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on paper."
   ]
  ],
  "warmup": "When did you last change the default way an app verifies you, such as a text code or an app prompt? What would make you bother to change it?",
  "activity": {
   "title": "Rollout Planner",
   "materials": "Printed one-page scenario describing a company with 60 percent SMS users, a recent rogue MFA registration and a P1 license; chart paper or whiteboard sections; markers.",
   "steps": [
    "Groups read the scenario and list the three problems it describes: weak methods, unprotected registration and old SMS defaults.",
    "For each problem, groups name the Entra feature that fixes it and write the key settings, such as included groups, snooze days or the CA conditions for registration.",
    "Groups add a measurement line naming the report they would show leadership each month.",
    "The teacher reads two twist cards aloud, such as guests who cannot meet device conditions or users without smartphones, and groups adjust their plans."
   ]
  },
  "discussion": [
   "How long should users be allowed to snooze a registration campaign before it becomes mandatory, and what factors would change your answer?",
   "Why is the moment of registration such an attractive target for attackers?"
  ],
  "exit": [
   [
    "Which feature uses a sign-in prompt to move SMS users to Authenticator?",
    "The registration campaign (nudge)."
   ],
   [
    "What Conditional Access target protects method registration?",
    "The Register security information user action."
   ],
   [
    "A user has SMS (default) and Authenticator push registered. What does system-preferred MFA prompt for?",
    "Authenticator push, the stronger registered method."
   ]
  ],
  "differentiation": [
   "Support: Provide a matching worksheet with the three features on one side and plain-language problem statements on the other, so students connect each feature to its purpose before designing a plan.",
   "Extend: Ask fast finishers to sequence the rollout over three months, deciding when to switch from nudging to requiring an authentication strength in Conditional Access and which group to pilot first."
  ]
 },
 {
  "t": "Self-service password reset (SSPR): methods, registration, and password writeback for hybrid users",
  "objectives": [
   "Students will be able to configure SSPR scope, number of methods and allowed methods for a given requirement.",
   "Students will be able to explain why administrators follow a fixed two-method SSPR policy.",
   "Students will be able to describe the prerequisites for password writeback, including license, sync tool setting, portal setting and connector permissions.",
   "Students will be able to troubleshoot a hybrid user whose cloud reset does not reach on-premises AD."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Note answers about help desk waits and security questions on the board."
   ],
   [
    15,
    "Teach",
    "Walk through the Password reset blade: scope, methods, registration, notifications. Highlight the admin policy. Draw cloud and on-premises boxes, show password hash sync flowing up and writeback flowing down, and list the three parts of writeback setup."
   ],
   [
    15,
    "Activity",
    "Run Ticket Triage in pairs using printed help desk tickets and log snippets."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions, drawing on the tickets students solved."
   ],
   [
    5,
    "Exit ticket",
    "Students write answers to the three exit questions."
   ]
  ],
  "warmup": "Have you ever had to call someone to reset a password? How did they confirm it was really you, and could an attacker have fooled them?",
  "activity": {
   "title": "Ticket Triage",
   "materials": "Printed set of six help desk ticket cards, each with a short symptom description and a configuration or log excerpt; whiteboard for the shared checklist.",
   "steps": [
    "Pairs receive tickets such as an admin who cannot use security questions, a user whose cloud reset does not unlock a laptop, a pilot group question, and an access denied event on the sync server.",
    "For each ticket, pairs identify the root cause and the exact setting or permission to change.",
    "Pairs build a writeback troubleshooting checklist from their findings and the class merges them into one list on the whiteboard.",
    "The teacher reveals the model answers and asks pairs to explain any ticket they solved differently."
   ]
  },
  "discussion": [
   "Should an organization allow security questions for regular users at all? What would you need to know first?",
   "Why might it be helpful to notify all admins when another admin resets their password?"
  ],
  "exit": [
   [
    "Name the three SSPR scope options.",
    "None, Selected and All."
   ],
   [
    "List two prerequisites for password writeback besides enabling it in the portal.",
    "Microsoft Entra ID P1 or higher and writeback enabled in Entra Connect Sync or Cloud Sync; also correct connector account permissions."
   ],
   [
    "Can a Global Administrator use security questions to reset a password?",
    "No, admins always require two methods and cannot use security questions."
   ]
  ],
  "differentiation": [
   "Support: Give students a labeled diagram with the cloud, the sync server and AD, and have them draw arrows for hash sync and writeback before working the tickets.",
   "Extend: Ask fast finishers to compare how writeback setup differs between Entra Connect Sync and Cloud Sync and to write a two-sentence recommendation for a small branch with no full sync server."
  ]
 },
 {
  "t": "Microsoft Entra Password Protection: global and custom banned password lists, smart lockout, on-premises DC agent and proxy",
  "objectives": [
   "Students will be able to distinguish the global and custom banned password lists and explain how normalization and scoring evaluate a password.",
   "Students will be able to explain how smart lockout differs from classic lockout and set hybrid lockout values correctly.",
   "Students will be able to place the DC agent and proxy service correctly in an on-premises deployment and describe Audit versus Enforced mode."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to write the warm-up guesses anonymously on sticky notes. Read a few aloud and note how predictable they are."
   ],
   [
    15,
    "Teach",
    "Explain spraying versus brute force. Cover the global and custom lists, then work one scoring example on the board step by step. Explain smart lockout and the hybrid threshold rule. Draw DCs, member servers and the internet to place the DC agent and proxy."
   ],
   [
    15,
    "Activity",
    "Run Score the Password in pairs, then the deployment diagram challenge."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the scoring rule to user behavior and passphrases."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Without sharing a real password, write down the password you think is most common at a company named after our town. Why do you think attackers try that first?",
  "activity": {
   "title": "Score the Password",
   "materials": "Printed sheet with a sample custom banned list and twelve candidate passwords; a blank network diagram handout showing domain controllers, member servers and an internet cloud; pencils.",
   "steps": [
    "Pairs normalize each candidate password by lowercasing and reversing common substitutions, then circle any banned term including one-edit fuzzy matches.",
    "Pairs score each password using one point per banned term and one point per remaining character, marking pass if it reaches five.",
    "On the network handout, pairs draw where the DC agents and proxies go and the path policy takes from Entra to SYSVOL.",
    "The teacher reviews answers and asks pairs to explain the most surprising result."
   ]
  },
  "discussion": [
   "Why does a short custom list of about a dozen well-chosen terms often work better than trying to list every bad password?",
   "What would you tell users about passphrases after seeing how the scoring rule works?"
  ],
  "exit": [
   [
    "Which banned list can an admin edit, and what license does it need?",
    "The custom banned password list, which requires Microsoft Entra ID P1."
   ],
   [
    "Where do you install the Password Protection proxy, and does the DC agent need internet access?",
    "On member servers with outbound internet access; DC agents do not need internet access."
   ],
   [
    "How should the Entra smart lockout threshold compare to the AD lockout threshold?",
    "Lower than AD's, with a longer duration, so cloud lockout triggers first."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a worked example with each scoring step filled in and have them complete only the final scoring for the remaining passwords.",
   "Extend: Ask fast finishers to write a one-page rollout plan from Audit to Enforced, including how they would communicate with users and which event log entries they would review."
  ]
 },
 {
  "t": "Security defaults vs Conditional Access, and emergency access (break-glass) accounts",
  "objectives": [
   "Students will be able to compare security defaults and Conditional Access by protections, flexibility and licensing.",
   "Students will be able to describe the steps to move from security defaults to Conditional Access without leaving a protection gap.",
   "Students will be able to list the recommended properties of emergency access accounts and justify each one.",
   "Students will be able to design monitoring and testing for break-glass accounts."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and ask for quick answers. List the ideas on the board."
   ],
   [
    15,
    "Teach",
    "Build a two-column comparison of security defaults and Conditional Access on the board. Walk through the migration order. Then cover break-glass account properties one by one, asking students what failure each property guards against."
   ],
   [
    15,
    "Activity",
    "Run the Lockout Drill role-play in groups of four."
   ],
   [
    5,
    "Discuss",
    "Debrief the drill with the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "An administrator turns on a policy that locks every admin out of the tenant on a Friday evening. What would you want to have prepared the week before?",
  "activity": {
   "title": "Lockout Drill",
   "materials": "Printed role cards (administrator, auditor, help desk, security analyst), printed incident cards describing different lockout causes, sticky notes and the whiteboard.",
   "steps": [
    "Each group draws an incident card, such as a bad CA policy, a federation outage or the only admin leaving the company.",
    "The administrator explains how they would regain access; the auditor checks each break-glass property (cloud-only, onmicrosoft.com, permanent Global Administrator, strong method, exclusion) and challenges any gap.",
    "The security analyst describes how the sign-in would be detected and who would be alerted; the help desk explains what they would tell users meanwhile.",
    "Groups write their final break-glass design on sticky notes and post it on the board for a class comparison."
   ]
  },
  "discussion": [
   "Excluding accounts from policies creates a gap by design. How do you balance that risk against the risk of total lockout?",
   "When would a small organization outgrow security defaults?"
  ],
  "exit": [
   [
    "Can security defaults and Conditional Access policies be enabled together?",
    "No, they are mutually exclusive; disable security defaults before enabling CA."
   ],
   [
    "Give three recommended properties of an emergency access account.",
    "Any three: cloud-only, onmicrosoft.com domain, permanent Global Administrator, not tied to a person, strong phishing-resistant authentication, excluded from blocking policies, monitored with alerts."
   ],
   [
    "Which tenants are best suited to security defaults?",
    "Organizations without P1 licenses that need baseline protection with no customization."
   ]
  ],
  "differentiation": [
   "Support: Provide a fill-in table with each break-glass property and a blank column for the failure it prevents, so students reason one property at a time.",
   "Extend: Ask fast finishers to describe the alert logic in plain language and a quarterly test procedure for the break-glass accounts, including who signs off on the test."
  ]
 },
 {
  "t": "Conditional Access: assignments, conditions (locations, device platforms, client apps, filters for devices, risk), grant and session controls",
  "objectives": [
   "Students will be able to identify the assignments, conditions, grant controls and session controls in a Conditional Access policy.",
   "Students will be able to predict the result when multiple policies apply to the same sign-in.",
   "Students will be able to choose the correct condition and control for requirements such as blocking legacy authentication or restricting admins to specific devices.",
   "Students will be able to explain the difference between Require all and Require one of the selected controls."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up sticky-note requirements and ask students to guess which part of a policy each requirement uses."
   ],
   [
    15,
    "Teach",
    "Draw the if-then structure: Who, What, When, Then. Fill each box with its options. Emphasize no ordering and block wins, then show a filter for devices rule and explain Require all versus Require one with a two-column truth table."
   ],
   [
    15,
    "Activity",
    "Run Build-a-Policy with printed component cards in groups of three."
   ],
   [
    5,
    "Discuss",
    "Groups share one policy each; ask the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your manager says: block old mail apps, require MFA outside the office, and keep admins on secure workstations. Which of these is about who, which is about where, and which is about what device?",
  "activity": {
   "title": "Build-a-Policy",
   "materials": "Printed cards for each policy component (user types, apps, each condition, each grant and session control), four printed requirement cards, and sign-in scenario cards for testing.",
   "steps": [
    "Each group draws a requirement card and assembles a policy from component cards in four rows: users, target resources, conditions, controls.",
    "Groups add an exclusion card for break-glass accounts and justify any other exclusion.",
    "The teacher deals sign-in scenario cards, each describing a user, device, location and app; groups decide which of the class's posted policies apply and the combined result.",
    "Groups explain any scenario where two policies interacted, highlighting block wins and combined controls."
   ]
  },
  "discussion": [
   "Why might Microsoft have chosen to combine all matching policies rather than using a priority order?",
   "When is it risky to use a condition like device platform or location as the only thing protecting an app?"
  ],
  "exit": [
   [
    "Policy A requires MFA; Policy B requires a compliant device; both apply. What must the user satisfy?",
    "Both MFA and a compliant device, because applicable policies combine."
   ],
   [
    "Which condition and control block legacy authentication?",
    "Client apps (Exchange ActiveSync and other clients) with grant Block."
   ],
   [
    "What does Require one of the selected controls mean with MFA and compliant device selected?",
    "The user may satisfy either one: a compliant device or MFA."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups a partly completed policy card layout with users and resources filled in so they focus only on choosing conditions and controls.",
   "Extend: Ask fast finishers to write a filter for devices rule for a scenario and to design an authentication context policy for a confidential SharePoint site."
  ]
 },
 {
  "t": "Named locations, authentication strengths, sign-in frequency, persistent browser session and token protection",
  "objectives": [
   "Students will be able to create named locations for IP ranges and countries and explain trusted locations.",
   "Students will be able to select the correct built-in or custom authentication strength for a requirement.",
   "Students will be able to configure sign-in frequency and persistent browser session for unmanaged devices and state the all-cloud-apps constraint.",
   "Students will be able to explain the token theft problem that token protection addresses and its current limitations."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the airport kiosk and collect answers."
   ],
   [
    15,
    "Teach",
    "Cover each building block with the five questions: where, how strongly, how often, does the browser remember, can it be replayed. Show the three built-in strengths in a table and draw a simple token replay diagram for token protection."
   ],
   [
    15,
    "Activity",
    "Run the Gap Finder exercise in pairs using printed incident summaries."
   ],
   [
    5,
    "Discuss",
    "Discuss the trade-offs between security and user prompts."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You stay signed in to your email on a shared computer at a library and walk away. What could happen next, and what setting would have prevented it?",
  "activity": {
   "title": "Gap Finder",
   "materials": "Printed incident summaries (foreign-country sign-ins, a shared kiosk session, an MFA-relaying phishing kit, an admin using SMS, a long-lived session on an unmanaged phone); a reference card listing the five building blocks.",
   "steps": [
    "Pairs read each incident and identify which question it represents: where, how strongly, how often, browser memory or replay.",
    "Pairs choose the building block and write exact settings, such as Phishing-resistant MFA strength or Never persistent with all cloud apps targeted.",
    "Pairs note one limitation or prerequisite for each fix, such as registered methods for strengths or platform support for token protection.",
    "The teacher calls on pairs to present and the class votes on whether each fix fully closes the gap."
   ]
  },
  "discussion": [
   "Every extra sign-in prompt costs users time. How would you decide which groups deserve a short sign-in frequency?",
   "Why is IP-based location a weaker signal than device compliance or a phishing-resistant method?"
  ],
  "exit": [
   [
    "Which methods satisfy the built-in Phishing-resistant MFA strength?",
    "Passkeys (FIDO2), Windows Hello for Business and certificate-based multifactor authentication."
   ],
   [
    "What scoping requirement applies to the persistent browser session control?",
    "The policy must target all cloud apps."
   ],
   [
    "What does token protection bind a session token to?",
    "The device it was issued to, using the device's primary refresh token."
   ]
  ],
  "differentiation": [
   "Support: Provide a cheat sheet mapping each of the five questions to its control so students can focus on reading the incidents.",
   "Extend: Ask fast finishers to design a custom authentication strength for contractors and explain how cross-tenant access settings affect whether external users can satisfy it."
  ]
 },
 {
  "t": "Testing policies with report-only mode and the What If tool; troubleshooting with sign-in logs",
  "objectives": [
   "Students will be able to distinguish when to use report-only mode, the What If tool and the sign-in logs.",
   "Students will be able to interpret report-only results and Conditional Access tab entries in a sign-in log.",
   "Students will be able to follow a troubleshooting sequence from error code to verified fix."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sort answers into before, during and after on the whiteboard."
   ],
   [
    15,
    "Teach",
    "Present the three tools on a timeline: report-only for the future using real traffic, What If for one imagined sign-in, sign-in logs for the past. Project a mock sign-in log entry and walk through each tab, error codes 53003 and 50126, and the correlation ID."
   ],
   [
    15,
    "Activity",
    "Run Log Detectives in pairs with printed sign-in log excerpts."
   ],
   [
    5,
    "Discuss",
    "Ask the discussion questions and connect answers to rollout planning."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you changed a rule that affects everyone at school, how would you find out whether it caused problems before, during and after the change?",
  "activity": {
   "title": "Log Detectives",
   "materials": "Printed mock sign-in log entries (basic info, authentication details and Conditional Access tabs) for five cases, a printed What If input form, and pens.",
   "steps": [
    "Pairs receive five cases, each with a user complaint and a mock log entry showing status, error code and policy results.",
    "Pairs identify the cause for each case, naming the policy and the unsatisfied control or the non-CA error.",
    "For each CA case, pairs fill in the What If form with the inputs they would use to test their proposed fix.",
    "Pairs swap answers with another pair, who checks whether the fix and What If inputs are correct."
   ]
  },
  "discussion": [
   "How long should a policy stay in report-only before you turn it on, and what events would you want it to observe first?",
   "What are the limits of the What If tool compared with real traffic?"
  ],
  "exit": [
   [
    "Which tool would you use to see whether a planned policy would have blocked anyone last week?",
    "Report-only mode, reviewing the sign-in logs or the insights workbook."
   ],
   [
    "What does error code 53003 indicate?",
    "The sign-in was blocked by Conditional Access."
   ],
   [
    "Which tool confirms a fix for a single user's scenario before they retry?",
    "The What If tool."
   ]
  ],
  "differentiation": [
   "Support: Give struggling pairs a highlighted log entry showing exactly where the status, error code and Conditional Access tab are, before they solve cases on their own.",
   "Extend: Ask fast finishers to describe what they would look for in the Conditional Access insights workbook before switching a policy from report-only to On, and to draft a rollback plan."
  ]
 },
 {
  "t": "Microsoft Entra ID Protection: user risk vs sign-in risk, risk detections, remediation and risk-based Conditional Access",
  "objectives": [
   "Students will be able to distinguish sign-in risk from user risk and classify common risk detections.",
   "Students will be able to match each risk type to its self-remediation method and describe admin remediation actions.",
   "Students will be able to design a pair of risk-based Conditional Access policies with appropriate controls and exclusions.",
   "Students will be able to state the licensing and prerequisites for ID Protection, including P2 and MFA registration."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about bank fraud alerts and collect two or three stories."
   ],
   [
    15,
    "Teach",
    "Draw two columns, sign-in risk and user risk. Sort detections into them, then add the remediation row: MFA versus password change. Show the recommended CA policy pair and explain why MFA registration comes first."
   ],
   [
    15,
    "Activity",
    "Run Risk Sort and Respond in groups of three with printed detection cards."
   ],
   [
    5,
    "Discuss",
    "Discuss block versus self-remediate using the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your bank texts you about an unusual purchase. In another case, it mails you a new card without asking. What is the difference between those two situations?",
  "activity": {
   "title": "Risk Sort and Respond",
   "materials": "Printed detection cards (anonymous IP address, atypical travel, leaked credentials, password spray, unfamiliar sign-in properties, threat intelligence, malicious IP address, anomalous token) and printed user story cards; a two-column sorting mat drawn on the whiteboard or paper.",
   "steps": [
    "Groups sort detection cards into sign-in risk and user risk columns.",
    "Groups draw a user story card, such as a traveling employee or an account in a breach dump, and decide the risk level and the remediation, self-service or admin.",
    "Groups write the CA policy that would handle their story, including the risk condition, grant control, sign-in frequency and exclusions.",
    "Groups present one story; the class checks whether the remediation matches the risk type."
   ]
  },
  "discussion": [
   "When would you choose to block high-risk users rather than allow them to self-remediate?",
   "Why does admin feedback such as confirm safe or confirm compromised matter beyond the single case?"
  ],
  "exit": [
   [
    "Leaked credentials raise which risk type?",
    "User risk."
   ],
   [
    "How does a user self-remediate sign-in risk?",
    "By successfully completing MFA."
   ],
   [
    "Which license is required for risk-based Conditional Access?",
    "Microsoft Entra ID P2."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups a reference card defining each detection in one plain sentence so they can focus on sorting and remediation.",
   "Extend: Ask fast finishers to explain how risk detection for workload identities differs and what remediation might look like for a compromised service principal."
  ]
 },
 {
  "t": "Continuous access evaluation (CAE) and session revocation",
  "objectives": [
   "Students will be able to explain the token expiry gap and how CAE closes it with critical events and claims challenges.",
   "Students will be able to list the five critical events and describe how location policy is enforced through CAE.",
   "Students will be able to perform and explain session revocation in the portal and with Microsoft Graph PowerShell.",
   "Students will be able to sequence incident response steps for a compromised or terminated user."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about hotel key cards and list ideas on the board."
   ],
   [
    15,
    "Teach",
    "Draw a timeline showing a one-hour token and a disable event at minute ten. Then redraw it with CAE: event, claims challenge, return to Entra, denial. List the critical events, explain 28-hour tokens and strict location enforcement, and show the Revoke-MgUserSignInSession command."
   ],
   [
    15,
    "Activity",
    "Run the Token Timeline role-play in groups of four."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to link CAE to resilience and incident response."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You check out of a hotel at 9 a.m., but your key card is programmed to work until noon. What could go wrong, and how would you fix it?",
  "activity": {
   "title": "Token Timeline",
   "materials": "Printed role cards (Entra ID, Exchange Online as a CAE resource, a third-party non-CAE app, the client laptop), printed event cards, sticky notes and a long timeline drawn on the whiteboard.",
   "steps": [
    "Groups assign roles; the client holds a paper token card marked with an expiry time.",
    "The teacher reads an event card, such as account disabled, password reset or IP address changed, and the Entra student decides whether to notify resources.",
    "The resource students decide whether to accept the token or issue a claims challenge; the non-CAE app must keep accepting until expiry. Groups place sticky notes on the timeline for each outcome.",
    "Groups write an incident checklist for a terminated user and compare it with the class."
   ]
  },
  "discussion": [
   "Why might Microsoft accept longer token lifetimes as part of a design meant to improve security?",
   "What should an organization do about important apps that don't support CAE?"
  ],
  "exit": [
   [
    "List three CAE critical events.",
    "Any three of: account disabled or deleted, password changed or reset, MFA enabled, refresh tokens revoked, high user risk."
   ],
   [
    "What happens to a non-CAE app's access after you revoke a user's sessions?",
    "It keeps its current access token until expiry, then fails to renew."
   ],
   [
    "Which Graph PowerShell cmdlet revokes a user's sessions?",
    "Revoke-MgUserSignInSession."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially filled timeline showing the old token model so students only need to add the CAE events and outcomes.",
   "Extend: Ask fast finishers to explain how strict location enforcement interacts with split-tunnel VPNs and propose a network design that avoids false denials."
  ]
 },
 {
  "t": "Global Secure Access: Microsoft Entra Internet Access and Private Access, traffic forwarding profiles",
  "objectives": [
   "Students will be able to distinguish Microsoft Entra Internet Access from Microsoft Entra Private Access and match each to business requirements.",
   "Students will be able to compare Quick Access and per-app access and choose between them.",
   "Students will be able to name the three traffic forwarding profiles and the two ways traffic is acquired.",
   "Students will be able to explain the role of private network connectors, universal tenant restrictions and source IP restoration."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about VPN frustrations and collect answers on the board."
   ],
   [
    15,
    "Teach",
    "Draw a user, Microsoft's edge, the internet and a data center. Add Internet Access on the outward path and Private Access with connectors on the inward path. Cover Quick Access versus per-app access, the three forwarding profiles, client versus remote networks, and source IP restoration."
   ],
   [
    15,
    "Activity",
    "Run Design the Edge in groups of three on the whiteboard or chart paper."
   ],
   [
    5,
    "Discuss",
    "Discuss the discussion questions with reference to the group designs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Have you ever used a VPN for school or work? What was annoying about it, and what could someone do once they were connected?",
  "activity": {
   "title": "Design the Edge",
   "materials": "Printed company scenario (VPN retirement, a sensitive SSH server, a contractor data leak, branch offices without clients), whiteboard sections or chart paper, markers and printed component cards (client, remote network, connector, Quick Access, per-app app, each forwarding profile, tenant restrictions, web filtering).",
   "steps": [
    "Groups read the scenario and list each requirement as either outward-facing (internet, SaaS, Microsoft 365) or inward-facing (private apps).",
    "Groups draw a design placing component cards: connectors near private apps, Quick Access or per-app access for each app, and the forwarding profiles to enable.",
    "Groups decide how each site's traffic reaches the service, client or remote network, and label any CA policy tied to per-app access.",
    "Each group presents in two minutes while another group checks that every requirement in the scenario is covered."
   ]
  },
  "discussion": [
   "What risks does a traditional VPN create that per-app access reduces?",
   "Why does passing the user's original IP address back to Entra matter for the rest of your identity security?"
  ],
  "exit": [
   [
    "Which service replaces a VPN for private apps, and what component does it install near those apps?",
    "Microsoft Entra Private Access, using private network connectors."
   ],
   [
    "Name the three traffic forwarding profiles.",
    "Microsoft traffic, Private Access and Internet Access."
   ],
   [
    "Which feature stops users on corporate devices from signing in to personal or other external tenants?",
    "Universal tenant restrictions, part of Microsoft Entra Internet Access."
   ]
  ],
  "differentiation": [
   "Support: Provide a pre-drawn diagram with labeled boxes for the user, edge, internet and data center, so students only place component cards and arrows.",
   "Extend: Ask fast finishers to plan a phased migration from Quick Access to per-app access over three months, deciding which apps move first and which CA policies they need."
  ]
 },
 {
  "t": "Managed identities: system-assigned vs user-assigned, and assigning them Azure RBAC roles",
  "objectives": [
   "Students will be able to explain how managed identities remove stored secrets from Azure workloads.",
   "Students will be able to compare system-assigned and user-assigned managed identities by lifecycle and sharing.",
   "Students will be able to choose the correct Azure RBAC role and narrowest scope for a managed identity.",
   "Students will be able to identify the roles needed to create and assign user-assigned identities."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers on the whiteboard. Point out that every answer involves a secret someone must protect."
   ],
   [
    12,
    "Teach",
    "Explain managed identities, then draw two columns: system-assigned and user-assigned. Fill in lifecycle, sharing and typical use. Show the role assignment CLI command on the projector and stress data-plane roles and scope."
   ],
   [
    15,
    "Activity",
    "Run the scenario card sort in pairs. Circulate and ask each pair to justify one choice aloud."
   ],
   [
    8,
    "Discuss",
    "Review the cards as a class, focusing on disagreements and the scope chosen for each role assignment."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "If an app running in the cloud needs to read files from a storage account, how does it prove who it is today in most code you have seen?",
  "activity": {
   "title": "Identity type and role card sort",
   "materials": "Printed scenario cards (8 to 10), whiteboard with three columns labeled System-assigned, User-assigned, Not a managed identity, sticky notes.",
   "steps": [
    "Give each pair a set of scenario cards, such as one Function reading one key vault, 30 VMs in a scale set, a GitHub runner outside Azure, and a VM rebuilt monthly.",
    "Pairs place each card in a column and write on a sticky note the Azure RBAC role and scope they would assign.",
    "Pairs swap with a neighbor and mark any placement they disagree with.",
    "The teacher reveals answers, explaining why outside workloads need federation or an app registration instead."
   ]
  },
  "discussion": [
   "What risks remain even after you replace a stored secret with a managed identity?",
   "When might a team prefer one shared user-assigned identity, and when is sharing a bad idea for least privilege?"
  ],
  "exit": [
   [
    "What happens to a system-assigned managed identity when its resource is deleted?",
    "It is deleted automatically with the resource."
   ],
   [
    "Which identity type fits 20 VMs that need identical storage access?",
    "A user-assigned managed identity attached to all of them."
   ],
   [
    "What role and scope let an identity read blobs in one storage account?",
    "Storage Blob Data Reader scoped to that storage account."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page comparison table of the two identity types and let them use it during the card sort.",
   "Extend: Ask fast finishers to explain how a managed identity would be granted a Microsoft Graph application permission and why the portal's API permissions page cannot be used."
  ]
 },
 {
  "t": "Service principals and app registrations: application objects, client secrets vs certificates vs federated credentials",
  "objectives": [
   "Students will be able to distinguish an application object from a service principal and say where each is managed.",
   "Students will be able to count application objects and service principals for single-tenant and multitenant apps.",
   "Students will be able to compare client secrets, certificates and federated identity credentials by risk.",
   "Students will be able to recommend the right credential type for a given workload."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and let three students answer. Link their answers to the idea of a template and its copies."
   ],
   [
    15,
    "Teach",
    "Draw one home tenant and two customer tenants on the whiteboard. Place the application object and service principals, then compare the three credential types in a table, ending with the preference order."
   ],
   [
    15,
    "Activity",
    "Run the credential consultant role-play in groups of three."
   ],
   [
    5,
    "Discuss",
    "Ask groups to share their hardest scenario and how they decided."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "When a software company sells the same app to many customers, what stays at the company and what gets copied into each customer's environment?",
  "activity": {
   "title": "Credential consultant role-play",
   "materials": "Printed scenario cards describing workloads (an Azure VM, a source-control pipeline, a Kubernetes cluster in another cloud, a legacy on-premises script, a multitenant SaaS app), whiteboard.",
   "steps": [
    "In groups of three, one student is the developer reading a scenario card, one is the identity consultant, and one is the auditor.",
    "The consultant recommends a credential type and says whether it is configured on the application object or service principal.",
    "The auditor challenges the choice with one risk question, such as what happens if the value leaks.",
    "Rotate roles for each card and record the final recommendation on the whiteboard."
   ]
  },
  "discussion": [
   "Why might a team keep using client secrets even when better options exist, and how would you persuade them to change?",
   "What could go wrong in a multitenant app without app instance property lock?"
  ],
  "exit": [
   [
    "Where do you manage the service principal for an app?",
    "Under Enterprise applications in the Microsoft Entra admin center."
   ],
   [
    "A multitenant app is used in three customer tenants and its home tenant. How many application objects exist?",
    "One, in the home tenant."
   ],
   [
    "Which credential type removes stored secrets for a pipeline outside Azure?",
    "A federated identity credential (workload identity federation)."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of one home tenant and two customer tenants that students can annotate during the lecture.",
   "Extend: Ask fast finishers to write the issuer, subject and audience they would configure for a pipeline that deploys only from the main branch, in words rather than real values."
  ]
 },
 {
  "t": "API permissions: delegated vs application permissions, user consent settings, admin consent and the admin consent workflow",
  "objectives": [
   "Students will be able to distinguish delegated and application permissions and describe each one's effective access.",
   "Students will be able to compare user consent settings and identify the Microsoft-recommended option.",
   "Students will be able to explain how the admin consent workflow handles requests from blocked users.",
   "Students will be able to investigate consent grants using enterprise app permissions and audit logs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about phone app permissions and list examples on the whiteboard."
   ],
   [
    15,
    "Teach",
    "Explain delegated versus application permissions with a Venn diagram of app permission and user rights. Walk through the three user consent settings and the admin consent workflow screens on the projector."
   ],
   [
    15,
    "Activity",
    "Run the consent request triage in pairs."
   ],
   [
    5,
    "Discuss",
    "Discuss which requests pairs approved, denied or blocked, and why."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Think of the last time an app on your phone asked for permission to read your contacts or location. How did you decide whether to say yes?",
  "activity": {
   "title": "Admin consent request triage",
   "materials": "Printed request cards, each listing an app name, publisher verified or not, permissions requested (delegated or application), and the user's justification; whiteboard with Approve, Deny, Block columns.",
   "steps": [
    "Pairs act as consent reviewers and read each request card.",
    "For each card they label every permission as delegated or application and decide whether admin consent is required.",
    "They choose Approve, Deny or Block and write a one-line reason on a sticky note placed in the matching column.",
    "The class reviews the board, and the teacher highlights cards that look like illicit consent grants."
   ]
  },
  "discussion": [
   "How strict should user consent be in a school or small business compared with a hospital?",
   "What signals in an app's consent screen should make a user suspicious?"
  ],
  "exit": [
   [
    "Which permission type is used by a background service with no signed-in user?",
    "Application permission, which requires admin consent."
   ],
   [
    "Which user consent setting does Microsoft recommend?",
    "Allow user consent for apps from verified publishers, for selected (low-impact) permissions."
   ],
   [
    "What feature lets blocked users ask an admin to approve an app?",
    "The admin consent workflow."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-row cheat card: user present means delegated; no user means application and admin consent.",
   "Extend: Ask fast finishers to outline how they would investigate and contain an illicit consent grant, naming the pages and log events they would check."
  ]
 },
 {
  "t": "App roles, the roles claim, and 'Assignment required' on enterprise applications",
  "objectives": [
   "Students will be able to explain where app roles are defined and where users and groups are assigned to them.",
   "Students will be able to predict the contents of the roles claim for a user, including nested group cases.",
   "Students will be able to compare the effects of Assignment required and Visible to users.",
   "Students will be able to choose the correct access layer for a scenario: assignment, app roles or Conditional Access."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about festival tickets and wristbands, then map it to the topic."
   ],
   [
    12,
    "Teach",
    "Show an app registration's App roles page and an enterprise app's Users and groups page on the projector. Draw a token on the whiteboard with a roles claim, then explain Assignment required and Visible to users."
   ],
   [
    18,
    "Activity",
    "Run the token prediction exercise in pairs."
   ],
   [
    5,
    "Discuss",
    "Review predictions, focusing on the nested group and unassigned user cases."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions."
   ]
  ],
  "warmup": "At a concert, what is the difference between the ticket that gets you through the gate and the wristband that gets you backstage?",
  "activity": {
   "title": "Predict the token",
   "materials": "Printed handout showing an app's roles, its group assignments (including a nested group), the Assignment required and Visible to users settings, and a list of six users with their group memberships.",
   "steps": [
    "Pairs read the handout and, for each user, predict whether sign-in succeeds and what the roles claim contains.",
    "Pairs repeat the prediction after the teacher flips Assignment required from No to Yes.",
    "Each pair writes one user's result on the whiteboard and explains it.",
    "The teacher corrects misconceptions, especially nested groups and the Visible to users setting."
   ]
  },
  "discussion": [
   "Why might a developer prefer app roles over checking group membership?",
   "Should Assignment required be turned on for every enterprise app? What are the trade-offs?"
  ],
  "exit": [
   [
    "Where do you assign a group to an app role?",
    "On the enterprise application under Users and groups."
   ],
   [
    "With Assignment required set to Yes, what happens to an unassigned user?",
    "They are blocked at sign-in and receive no token."
   ],
   [
    "Does a member of a nested group get the app role assigned to the parent group?",
    "No, only direct members of the assigned group get it."
   ]
  ],
  "differentiation": [
   "Support: Give students a flowchart: is the user assigned, directly or by a direct group, then which role values appear in the token.",
   "Extend: Ask fast finishers to describe how an API would expose an app-only permission using an app role with the Applications member type, and what consent it needs."
  ]
 },
 {
  "t": "Enterprise application single sign-on: SAML (Identifier, Reply URL, signing certificate) and OpenID Connect",
  "objectives": [
   "Students will be able to identify the purpose of the Identifier, Reply URL, Sign on URL and NameID in SAML configuration.",
   "Students will be able to diagnose common SAML errors from their symptoms.",
   "Students will be able to describe a safe signing certificate rollover sequence.",
   "Students will be able to compare SAML and OpenID Connect and where each is configured."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about letters of introduction and seals, and connect it to signed assertions."
   ],
   [
    15,
    "Teach",
    "Project a screenshot-style diagram of the SAML-based Sign-on page and label each section. Draw the SAML flow between user, Entra and app, then contrast OIDC with ID and access tokens."
   ],
   [
    15,
    "Activity",
    "Run the SAML error doctor exercise in pairs."
   ],
   [
    5,
    "Discuss",
    "Review each error card and agree on the field to fix."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you mailed a sealed letter of introduction for a friend, what three things would have to be right for the recipient to trust it?",
  "activity": {
   "title": "SAML error doctor",
   "materials": "Printed error cards with a symptom (an error message paraphrase or user report) and a mock configuration excerpt, plus a blank fix sheet for each pair.",
   "steps": [
    "Pairs read each error card and identify which SAML setting is the likely cause: Identifier, Reply URL, NameID or signing certificate.",
    "They write the correction and how they would verify it, such as Test single sign-on or the sign-in logs.",
    "One card describes a certificate expiring next month; pairs write the rollover steps in order.",
    "The teacher reveals answers and asks two pairs to explain their reasoning."
   ]
  },
  "discussion": [
   "Why do many organizations still use SAML for SaaS apps when OIDC is the modern default?",
   "Who should receive certificate expiry notifications, and what happens if nobody does?"
  ],
  "exit": [
   [
    "What is the Reply URL?",
    "The Assertion Consumer Service URL at the app where Entra posts the SAML response."
   ],
   [
    "What should you do before making a new SAML signing certificate active?",
    "Give the new certificate to the app so it trusts it."
   ],
   [
    "Which OIDC token identifies the user to the app?",
    "The ID token."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled flow diagram with blanks for Identifier, Reply URL and certificate that students fill in during the lecture.",
   "Extend: Ask fast finishers to design a claims configuration that sends email as NameID and adds department, and explain when a claim transformation is needed."
  ]
 },
 {
  "t": "Automatic user provisioning to SaaS apps with SCIM, scoping filters and provisioning logs",
  "objectives": [
   "Students will be able to explain how SCIM provisioning automates joiner, mover and leaver changes in SaaS apps.",
   "Students will be able to configure scope using assignment and scoping filters, applying AND and OR logic correctly.",
   "Students will be able to troubleshoot a missing account using provision on demand and provisioning logs.",
   "Students will be able to recognize a quarantined provisioning job and its likely causes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about orphaned accounts and collect guesses about how they happen."
   ],
   [
    12,
    "Teach",
    "Walk through the Provisioning page on the projector: Admin Credentials, mappings, scope settings and scoping filters. Draw AND within a group and OR between groups on the whiteboard."
   ],
   [
    18,
    "Activity",
    "Run the scoping filter and log reading exercise in pairs."
   ],
   [
    5,
    "Discuss",
    "Review the answers and discuss which log reasons were hardest to interpret."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If an employee leaves and IT disables their main account, which of their other accounts might still work, and why?",
  "activity": {
   "title": "Who gets provisioned",
   "materials": "Printed handout with ten fictional users and their attributes (department, employeeType, group membership), a scoping filter configuration, and five mock provisioning log entries with status and reason.",
   "steps": [
    "Pairs apply the assignment and scoping filter rules to decide which of the ten users are in scope.",
    "The teacher changes the filter by adding a second scoping filter group, and pairs redo the decision.",
    "Pairs read the five log entries and write the fix for each failure or skip.",
    "The class compares answers, and the teacher explains each AND and OR result."
   ]
  },
  "discussion": [
   "Should a leaver's app account be disabled or deleted, and what business factors affect that choice?",
   "What risks come from choosing the wrong matching attribute on the first provisioning cycle?"
  ],
  "exit": [
   [
    "What two values are usually entered as Admin Credentials for SCIM?",
    "The Tenant URL (SCIM endpoint) and a Secret Token, or an OAuth connection."
   ],
   [
    "How are multiple scoping filter groups combined?",
    "With OR; a user matching any one group is in scope."
   ],
   [
    "Which tool tests provisioning for one user immediately?",
    "Provision on demand."
   ]
  ],
  "differentiation": [
   "Support: Give students a truth-table template to work through each user's attributes against each clause.",
   "Extend: Ask fast finishers to write, in words, a Switch expression that maps three department codes to app values with a default."
  ]
 },
 {
  "t": "Microsoft Entra application proxy and private network connectors for on-premises web apps",
  "objectives": [
   "Students will be able to explain how private network connectors provide access without inbound firewall ports.",
   "Students will be able to choose the correct pre-authentication and SSO method for a published on-premises app.",
   "Students will be able to design connector groups for availability and network segmentation.",
   "Students will be able to troubleshoot common application proxy connectivity and KCD problems."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch the VPN approach on the whiteboard."
   ],
   [
    15,
    "Teach",
    "Draw the application proxy flow: user, cloud service, outbound connector connection, internal app. Add pre-authentication, connector groups and the SSO methods, highlighting KCD."
   ],
   [
    15,
    "Activity",
    "Groups whiteboard a publishing design for a scenario."
   ],
   [
    5,
    "Discuss",
    "Groups present designs; the class checks for inbound ports, pre-authentication and SSO choice."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "How do employees at most organizations reach internal websites from home today, and what goes wrong with that approach?",
  "activity": {
   "title": "Whiteboard a published app",
   "materials": "Whiteboard or large paper per group, markers, printed scenario cards (a Windows-authenticated intranet in two data centers, a header-based legacy app, an app in an isolated network segment).",
   "steps": [
    "Each group draws the user, the application proxy cloud service, connectors and the internal app, with arrows showing which side starts each connection.",
    "Groups label the internal URL, external URL, pre-authentication choice, connector groups and SSO method.",
    "Groups list two things that could break the design and how they would detect them.",
    "Groups rotate to review another group's drawing and leave one sticky-note question."
   ]
  },
  "discussion": [
   "When might an organization still need a VPN even after adopting application proxy?",
   "What are the security implications of choosing Passthrough instead of Microsoft Entra ID pre-authentication?"
  ],
  "exit": [
   [
    "What firewall change is needed for connectors?",
    "Only outbound HTTPS (443) to the cloud service; no inbound ports."
   ],
   [
    "Which SSO method supports apps using Integrated Windows Authentication?",
    "Kerberos constrained delegation."
   ],
   [
    "Why install two or more connectors in a group?",
    "For high availability and load balancing."
   ]
  ],
  "differentiation": [
   "Support: Give students a partially completed flow diagram with arrows already drawn and ask them to label each component.",
   "Extend: Ask fast finishers to list the Active Directory delegation settings and SPN checks they would verify when KCD SSO fails."
  ]
 },
 {
  "t": "Microsoft Defender for Cloud Apps: cloud discovery, app governance and Conditional Access app control session policies",
  "objectives": [
   "Students will be able to describe the three ways to feed cloud discovery and how apps are sanctioned or unsanctioned.",
   "Students will be able to explain what app governance monitors and how it complements Entra consent settings.",
   "Students will be able to configure Conditional Access app control with access and session policies for unmanaged devices.",
   "Students will be able to match a scenario to cloud discovery, app governance or Conditional Access app control."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers about unapproved apps on the whiteboard."
   ],
   [
    15,
    "Teach",
    "Explain the CASB role, then cover each capability with a projected diagram: logs flowing into discovery, OAuth apps under governance, and the reverse proxy path for session control."
   ],
   [
    15,
    "Activity",
    "Run the three-tool scenario sort in small groups."
   ],
   [
    5,
    "Discuss",
    "Groups share any scenario they argued about and the class settles it."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Name a cloud app you have used at school or work that IT probably never approved. What could go wrong with it?",
  "activity": {
   "title": "Which tool answers it",
   "materials": "Printed scenario cards (12), three labeled areas on the whiteboard: Cloud discovery, App governance, Conditional Access app control; sticky notes.",
   "steps": [
    "Groups of three read each card, such as find unapproved file-sharing apps or block printing from personal laptops.",
    "Groups place each card under the right capability and add a sticky note naming the specific feature, such as log collector, policy alert or session policy.",
    "Two cards are deliberately ambiguous; groups must write which extra fact would decide them.",
    "The teacher reviews the board and corrects misplacements with a short explanation."
   ]
  },
  "discussion": [
   "How should an organization balance blocking shadow IT with keeping employees productive?",
   "Why might monitoring sessions raise privacy concerns, and how should that be communicated to users?"
  ],
  "exit": [
   [
    "Which session control routes traffic through Defender for Cloud Apps?",
    "Use Conditional Access App Control."
   ],
   [
    "Which capability flags an overprivileged OAuth app?",
    "App governance."
   ],
   [
    "Name one way to feed cloud discovery.",
    "Manual log upload, a log collector, or Defender for Endpoint integration."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-line definition card for each capability to use during the sort.",
   "Extend: Ask fast finishers to design both Conditional Access policies and the session policy for a managed versus unmanaged device scenario, listing every setting."
  ]
 },
 {
  "t": "Monitoring and securing workload identities: Workload ID Premium, risky workload identities, Conditional Access for workload identities",
  "objectives": [
   "Students will be able to explain why workload identities are attractive targets and how they differ from user identities.",
   "Students will be able to list the features included in Workload ID Premium and identify those that need no premium license.",
   "Students will be able to design a Conditional Access policy for workload identities within its limits.",
   "Students will be able to interpret risky workload identity detections and plan remediation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list ways an app could be impersonated."
   ],
   [
    15,
    "Teach",
    "Present workload identities, Workload ID Premium features, Conditional Access limits (single-tenant service principals, block only) and the risk detections. Show where service principal sign-ins appear in logs."
   ],
   [
    15,
    "Activity",
    "Run the incident timeline exercise in pairs."
   ],
   [
    5,
    "Discuss",
    "Pairs share the control they think would have stopped the incident earliest."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "An app cannot answer a phone prompt or notice a strange sign-in. How would you know if someone else was using its identity?",
  "activity": {
   "title": "Workload incident timeline",
   "materials": "Printed incident timeline with fictional log excerpts: a secret committed to a repository, a credential-added audit event, service principal sign-ins from a new IP range, and a leaked credentials detection; highlighters.",
   "steps": [
    "Pairs read the timeline and highlight each event that should have triggered an alert.",
    "For each highlighted event they write the log or report where it appears and the control that would have helped.",
    "Pairs draft a Conditional Access policy for workload identities in words, stating target, condition and control.",
    "Pairs write a five-step remediation plan and compare it with another pair."
   ]
  },
  "discussion": [
   "Who in an organization should own the response when a service principal is compromised?",
   "Why can't Conditional Access require MFA for a workload, and what other protections compensate?"
  ],
  "exit": [
   [
    "Can Conditional Access for workload identities target managed identities?",
    "No, only single-tenant service principals."
   ],
   [
    "What grant control is available for workload identity policies?",
    "Block, based on location or service principal risk."
   ],
   [
    "Which license provides risky workload identity detections?",
    "Microsoft Entra Workload ID Premium."
   ]
  ],
  "differentiation": [
   "Support: Provide a checklist of the four Workload ID Premium features and the two policy conditions for students to reference.",
   "Extend: Ask fast finishers to write the alert logic, in words, for detecting a new credential added to a privileged app in a Log Analytics workspace."
  ]
 },
 {
  "t": "Reviewing and removing unused or over-permissioned applications and expiring credentials",
  "objectives": [
   "Students will be able to identify unused applications using sign-in logs, usage reports and Entra recommendations.",
   "Students will be able to evaluate an application's permissions and recommend least-privileged alternatives.",
   "Students will be able to describe ways to track and control expiring app credentials.",
   "Students will be able to sequence the safe removal of an application, including recovery options."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about old keys and connect it to forgotten apps."
   ],
   [
    12,
    "Teach",
    "Show the Permissions page, Certificates and secrets page and recommendations on the projector. Explain disable-before-delete and the 30-day restore window."
   ],
   [
    18,
    "Activity",
    "Run the app inventory triage in groups."
   ],
   [
    5,
    "Discuss",
    "Groups share their riskiest app and justify their action."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you found an unlabeled key on your key ring, what would you do before throwing it away?",
  "activity": {
   "title": "App inventory triage",
   "materials": "Printed inventory sheet of 12 fictional apps listing last sign-in date, owner, permissions, credential type and expiry; colored sticky notes for Keep, Reduce, Renew, Disable.",
   "steps": [
    "Groups read the inventory and tag each app with one or more sticky notes.",
    "For each Reduce tag, groups name a narrower permission or scope.",
    "For each Disable tag, groups write the removal sequence and the monitoring period.",
    "Groups present two decisions, and the teacher adds the 30-day restore and multitenant re-consent points where relevant."
   ]
  },
  "discussion": [
   "Who should approve deleting an app when its owner has left the organization?",
   "Would you block new client secrets tenant-wide? What would break, and how would you manage the change?"
  ],
  "exit": [
   [
    "What is the safest first step before deleting an app?",
    "Set Enabled for users to sign-in to No and monitor for impact."
   ],
   [
    "Where do you see an enterprise app's granted permissions?",
    "On its Permissions page, showing admin and user consent."
   ],
   [
    "How long can a deleted app registration be restored?",
    "For 30 days."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision flowchart: used recently, owner known, permissions needed, credential expiring, then the action.",
   "Extend: Ask fast finishers to describe, in words, a Graph query approach that lists all app credentials expiring within 30 days and how they would schedule it."
  ]
 },
 {
  "t": "Entitlement management: catalogs, access packages, assignment policies, approvals, expiration and separation of duties",
  "objectives": [
   "Students will be able to explain the relationship between catalogs, resources, access packages and policies.",
   "Students will be able to design an assignment policy with requestor scope, approval stages and expiration.",
   "Students will be able to configure separation of duties using incompatible access packages or groups.",
   "Students will be able to identify the delegated roles and licensing needed for entitlement management."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about joining a new project and count the tickets students imagine."
   ],
   [
    12,
    "Teach",
    "Draw nested boxes on the whiteboard: catalog containing resources and access packages, each package with policies. Walk through approval, expiration, reviews and separation of duties."
   ],
   [
    18,
    "Activity",
    "Groups design an access package on paper for a scenario."
   ],
   [
    5,
    "Discuss",
    "Groups present one policy decision and the class checks it against the requirements."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When you join a new project or club, how many different systems do you need access to, and who remembers to remove that access when you leave?",
  "activity": {
   "title": "Design an access package",
   "materials": "Printed scenario cards (new project team, external partner auditors, finance roles needing separation of duties), blank design templates with boxes for catalog, resources, roles, policies, approval, expiration and incompatible packages.",
   "steps": [
    "Groups of three choose a scenario card and fill in the design template.",
    "Each group writes at least one policy with requestor scope, approval stages, expiration and extension settings.",
    "Groups add any separation of duties rules and name who owns the catalog.",
    "Groups swap templates and check each other's design against the scenario requirements, writing one improvement."
   ]
  },
  "discussion": [
   "What are the risks of setting access package expiration to never?",
   "How should approval differ for internal employees and users from connected organizations?"
  ],
  "exit": [
   [
    "What must happen before a resource can be used in an access package?",
    "It must be added to the package's catalog."
   ],
   [
    "Which setting stops a user with package A from requesting package B?",
    "Listing package A as an incompatible access package in package B."
   ],
   [
    "Name two expiration options for an assignment.",
    "Any two of: a specific date, a number of days, a number of hours, or never."
   ]
  ],
  "differentiation": [
   "Support: Give students a completed sample access package design to model their own on.",
   "Extend: Ask fast finishers to add a custom extension to their design and describe what the Logic App should do at assignment and at removal."
  ]
 },
 {
  "t": "Connected organizations and access packages for external users",
  "objectives": [
   "Students will be able to explain the difference between a connected organization identified by tenant and one identified by domain.",
   "Students will be able to compare the Configured and Proposed states and predict which access package scopes include each.",
   "Students will be able to design an access package policy for external users with approval, expiration and sponsor approvers.",
   "Students will be able to configure the external user lifecycle settings and state which guests they affect."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students how many guest accounts they think a mid-sized company accumulates and who removes them. Collect answers on the whiteboard and circle the word 'nobody'."
   ],
   [
    15,
    "Teach",
    "Walk through connected organizations (tenant vs domain, sponsors), the Configured and Proposed states, the three external policy scopes, the My Access link flow, and the external user lifecycle settings. Draw the request flow from partner user to guest account to cleanup on the whiteboard."
   ],
   [
    15,
    "Activity",
    "Run the partner request simulation card activity in groups of four."
   ],
   [
    5,
    "Discuss",
    "Debrief which requests failed and why, focusing on proposed organizations and blocked cross-tenant settings."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes and post them by the door."
   ]
  ],
  "warmup": "Your company has 300 guest accounts and nobody knows which are still needed. What process would stop this from happening again?",
  "activity": {
   "title": "Partner request simulation",
   "materials": "Printed cards describing partner organizations (tenant-based, domain-based, unknown), printed access package policy cards with different scopes, a whiteboard, and markers.",
   "steps": [
    "Give each group three policy cards: one scoped to specific connected organizations, one to all configured connected organizations, and one to all users.",
    "Deal partner request cards one at a time. For each, the group decides whether the request is allowed, who approves it, and whether a new connected organization is created and in which state.",
    "Add twist cards, such as 'cross-tenant access blocks inbound B2B from this tenant' or 'last assignment expired 10 days ago', and have groups state the outcome.",
    "Each group records its decisions in a table on the whiteboard, and the class compares results."
   ]
  },
  "discussion": [
   "When would you deliberately use an all users policy, and what risks does it introduce?",
   "Why might an organization leave some partners in the Proposed state indefinitely?"
  ],
  "exit": [
   [
    "A policy targets all configured connected organizations. Can a user from a Proposed organization request the package?",
    "No. Proposed organizations are excluded until an administrator changes their state to Configured."
   ],
   [
    "How should a partner that uses Microsoft Entra be identified as a connected organization?",
    "By its Entra tenant, which covers all of its domains."
   ],
   [
    "Which guests do the external user lifecycle settings block and remove?",
    "Only guests created or managed through entitlement management, after their last access package assignment ends."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page flow diagram showing request, approval, guest creation, expiration, block and removal, and let students trace each card along it before deciding.",
   "Extend: Ask students to design a two-stage approval policy with an external sponsor first and an internal sponsor second, and explain how they would combine it with a recurring access review."
  ]
 },
 {
  "t": "Access reviews: groups, apps, access packages and Entra roles; reviewers, recurrence, auto-apply and inactive-user recommendations",
  "objectives": [
   "Students will be able to identify where to create access reviews for groups, applications, access packages and privileged roles.",
   "Students will be able to choose appropriate reviewers, including fallback reviewers and multi-stage designs, for a given scenario.",
   "Students will be able to explain how auto apply and the If reviewers don't respond setting combine to determine outcomes.",
   "Students will be able to apply decision helpers such as inactive-user recommendations to reduce reviewer effort."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the auditor question from the warm-up and ask students to list every kind of access a company would need to recheck. Group their answers into groups, apps, packages and roles on the whiteboard."
   ],
   [
    15,
    "Teach",
    "Explain review targets and where each is created, reviewer options, recurrence and duration, upon-completion settings, and recommendations. Use a two-by-two grid on the board: auto apply on or off against each no-response option."
   ],
   [
    15,
    "Activity",
    "Run the review design challenge in pairs."
   ],
   [
    5,
    "Discuss",
    "Compare pair designs and debate strict versus cautious no-response settings."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "An auditor asks who confirmed that a former contractor still needs access to a finance app. What evidence would you want to be able to show?",
  "activity": {
   "title": "Review design challenge",
   "materials": "Printed scenario cards (guest cleanup, finance app, privileged roles, access package for partners), a blank review design worksheet with fields for target, scope, reviewers, recurrence, duration, auto apply, no-response and helpers, and pens.",
   "steps": [
    "Pairs draw two scenario cards and fill in a design worksheet for each.",
    "For each design, pairs write where in the admin center the review is created (Access reviews, the access package policy, or PIM).",
    "Pairs swap worksheets with another pair, who predicts the outcome for three sample users: one denied, one unreviewed and active, one unreviewed and inactive.",
    "The original pair confirms or corrects the predictions, and the teacher highlights common errors on the board."
   ]
  },
  "discussion": [
   "What are the risks of setting If reviewers don't respond to remove access in a large organization?",
   "When is a self-review a reasonable control, and when is it too weak?"
  ],
  "exit": [
   [
    "Where do you create a review of Azure resource role assignments?",
    "In Privileged Identity Management."
   ],
   [
    "Auto apply is on and no-response is set to no change. What happens to a user nobody reviewed?",
    "Nothing; the user keeps access, because auto apply only acts on decisions."
   ],
   [
    "Why configure a fallback reviewer in a manager review?",
    "So users without a manager in the directory still get reviewed."
   ]
  ],
  "differentiation": [
   "Support: Provide a completed sample worksheet for a simple guest cleanup review so students can model their own designs on it, and a flowchart of how outcomes are decided.",
   "Extend: Ask students to design a three-stage review for a sensitive app and justify which decisions pass between stages and which completion settings they would choose."
  ]
 },
 {
  "t": "Lifecycle workflows for joiner, mover and leaver tasks (employeeHireDate, employeeLeaveDateTime)",
  "objectives": [
   "Students will be able to describe the trigger, execution conditions and tasks of a lifecycle workflow.",
   "Students will be able to match onboarding and offboarding scenarios to employeeHireDate or employeeLeaveDateTime with an appropriate offset.",
   "Students will be able to explain how custom task extensions use Azure Logic Apps to reach systems outside Entra.",
   "Students will be able to distinguish lifecycle workflows from HR-driven provisioning and entitlement management."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to describe the worst first day or last day they have seen at a job, then list which identity tasks were missed."
   ],
   [
    15,
    "Teach",
    "Present the three parts of a workflow, the templates, built-in tasks, custom task extensions, the source and sensitivity of the two date attributes, UTC timing, scheduling and on-demand testing."
   ],
   [
    15,
    "Activity",
    "Run the hire-to-retire timeline build in small groups."
   ],
   [
    5,
    "Discuss",
    "Discuss which tasks belong to provisioning, entitlement management or lifecycle workflows."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions individually."
   ]
  ],
  "warmup": "HR knows exactly when people start and leave. List three identity tasks that should happen automatically around those two dates.",
  "activity": {
   "title": "Hire-to-retire timeline",
   "materials": "A long strip of paper or the whiteboard drawn as a timeline, sticky notes in two colors, and printed task cards (generate TAP, send welcome email, add to groups, enable account, disable account, remove from all groups, remove licenses, delete user, custom task extension).",
   "steps": [
    "Groups draw a timeline marked with employeeHireDate and employeeLeaveDateTime and their offsets in days.",
    "Groups place task cards on the timeline in the right workflow and order, using one sticky note color for triggers and another for scope rules.",
    "The teacher adds a twist card, such as 'the ticketing system must be updated' or 'the user is in a time zone 10 hours ahead of UTC', and groups adjust their design.",
    "Each group presents one workflow, naming its trigger, scope and tasks."
   ]
  },
  "discussion": [
   "Why is employeeLeaveDateTime protected by an extra permission, and what could happen without it?",
   "How would you handle an urgent termination that cannot wait for the scheduled run?"
  ],
  "exit": [
   [
    "Which attribute and offset would run a pre-hire workflow a week before the start date?",
    "employeeHireDate with an offset of minus seven days."
   ],
   [
    "What workflow task lets a lifecycle workflow update an external ticketing system?",
    "A custom task extension that calls an Azure Logic App."
   ],
   [
    "Which feature creates the user accounts that lifecycle workflows act on?",
    "HR-driven inbound provisioning (or another account creation process); lifecycle workflows do not create accounts."
   ]
  ],
  "differentiation": [
   "Support: Give students a partially completed onboarding workflow with the trigger filled in and ask them only to choose the scope and order the tasks.",
   "Extend: Ask students to design a mover workflow triggered by a department attribute change and explain how they would avoid removing access the user still needs."
  ]
 },
 {
  "t": "Terms of use and Conditional Access",
  "objectives": [
   "Students will be able to explain why terms of use require a Conditional Access policy to take effect.",
   "Students will be able to compare expire consents with duration before re-acceptance and choose the right one for a scenario.",
   "Students will be able to design a Conditional Access policy that enforces terms of use for a target group and set of apps.",
   "Students will be able to locate evidence of acceptance in terms of use reports and the audit log."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students when they last clicked Accept on a document without reading it, and what the company gained from that click. Use the answers to introduce proof of acceptance."
   ],
   [
    15,
    "Teach",
    "Cover creating terms of use, languages, expand and per-device settings, the two re-acceptance settings, enforcement through a Conditional Access grant control, troubleshooting, reporting and versioning. Draw the flow: sign-in, Conditional Access evaluation, terms prompt, accept or decline."
   ],
   [
    15,
    "Activity",
    "Run the legal request role-play in groups of three."
   ],
   [
    5,
    "Discuss",
    "Review the groups' policies and identify any that would not prompt users and why."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "A lawyer asks you to prove that a specific guest agreed to your NDA last March. What would you need to show?",
  "activity": {
   "title": "Legal request role-play",
   "materials": "Printed request cards from a fictional legal team (guest NDA, annual employee policy, country-specific notice, per-device acceptance), a policy design worksheet, and a projector showing a blank Conditional Access policy layout.",
   "steps": [
    "In each group, one student plays the lawyer reading a request card, one plays the identity admin, and one plays the auditor.",
    "The admin designs the terms of use settings and the Conditional Access policy on the worksheet, asking the lawyer clarifying questions.",
    "The auditor checks the design by asking where proof of acceptance would be found and what happens when a new version is uploaded.",
    "Groups rotate roles and repeat with a second card, then share one design with the class."
   ]
  },
  "discussion": [
   "What are the trade-offs of requiring consent on every device?",
   "Should terms of use be combined with MFA in the same policy, or kept separate, and why?"
  ],
  "exit": [
   [
    "A terms of use object exists, but users are never prompted. What is the most likely cause?",
    "No enabled Conditional Access policy uses it as a grant control for those users and apps."
   ],
   [
    "Which setting makes all users reaccept every year starting on a chosen date?",
    "Expire consents."
   ],
   [
    "Where can you find who declined the terms?",
    "In the terms of use report details and the audit log."
   ]
  ],
  "differentiation": [
   "Support: Provide a side-by-side table comparing expire consents and duration before re-acceptance with a calendar example for two users.",
   "Extend: Ask students to design terms of use for a multinational company with three languages and two separate policies, and explain how they would roll out a new version without locking out partners."
  ]
 },
 {
  "t": "Privileged Identity Management (PIM): eligible vs active assignments, activation settings, approval, alerts",
  "objectives": [
   "Students will be able to distinguish eligible from active assignments and permanent from time-bound assignments.",
   "Students will be able to configure per-role activation settings including duration, MFA or authentication context, justification, ticket and approval.",
   "Students will be able to describe the approval workflow and plan for approver availability.",
   "Students will be able to interpret PIM alerts and recommend fixes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students what would happen if every staff member carried a master key all day, and who would they want to hold it instead."
   ],
   [
    15,
    "Teach",
    "Draw a two-by-two grid of eligible or active against permanent or time-bound and place example users in each cell. Then walk through activation from My roles, per-role settings, approvals, notifications and alerts."
   ],
   [
    15,
    "Activity",
    "Run the role settings design and activation role-play in pairs."
   ],
   [
    5,
    "Discuss",
    "Discuss approver availability and emergency access accounts."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on sticky notes."
   ]
  ],
  "warmup": "An attacker steals a help desk lead's password at 2 a.m. What difference would it make if that person's admin role was off by default?",
  "activity": {
   "title": "Role settings design and activation role-play",
   "materials": "Printed role cards (Global Administrator, Security Administrator, Exchange Administrator, Helpdesk Administrator), a blank role settings worksheet, sticky notes, and a whiteboard drawn with the eligible/active grid.",
   "steps": [
    "Pairs pick two role cards and fill in role settings: maximum duration, MFA or authentication context, justification, ticket, approval and approvers, and assignment rules.",
    "One student plays an admin requesting activation and the other plays PIM, checking each requirement and saying what is missing.",
    "Where approval is required, a third pair acts as approvers and must decide with a justification.",
    "The teacher reveals an alerts card listing risky findings, and pairs propose a fix for each."
   ]
  },
  "discussion": [
   "How would you keep a role that needs approval usable during a weekend incident?",
   "Why should even eligibility be time-bound for most admins?"
  ],
  "exit": [
   [
    "A user is eligible for Exchange Administrator but has not activated. Can they manage mailboxes as an admin?",
    "No. Eligible users have no role permissions until they activate."
   ],
   [
    "What is the allowed range for maximum activation duration?",
    "1 to 24 hours."
   ],
   [
    "Which accounts should keep active permanent Global Administrator assignments?",
    "Emergency access (break-glass) accounts."
   ]
  ],
  "differentiation": [
   "Support: Provide a filled-in role settings example for Helpdesk Administrator and a checklist of activation requirements students can tick off during the role-play.",
   "Extend: Ask students to design an authentication context and matching Conditional Access policy for Global Administrator activation and explain how it differs from simply requiring MFA."
  ]
 },
 {
  "t": "PIM for Groups and PIM for Azure resource roles",
  "objectives": [
   "Students will be able to explain how PIM for Groups provides just-in-time access to everything a group grants.",
   "Students will be able to identify which groups are and are not supported by PIM for Groups.",
   "Students will be able to describe discovery and onboarding and RBAC inheritance for PIM for Azure resources.",
   "Students will be able to choose between Entra role PIM, PIM for Groups and PIM for Azure resources for a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to list everything a single group membership can grant in a Microsoft cloud tenant, and write the list on the board."
   ],
   [
    15,
    "Teach",
    "Explain PIM for Groups (eligible member and owner, supported groups, role-assignable groups and their protection), then PIM for Azure resources (onboarding, scopes, inheritance, key roles). Draw the Azure hierarchy from management group down to resource."
   ],
   [
    15,
    "Activity",
    "Run the scope sorting card activity in groups."
   ],
   [
    5,
    "Discuss",
    "Discuss edge cases where more than one scope could work."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the exit questions."
   ]
  ],
  "warmup": "Your admins must activate three separate roles every time they fix one kind of problem. How could you reduce that to one request without giving them standing access?",
  "activity": {
   "title": "Which PIM scope fits",
   "materials": "Printed scenario cards, three labeled areas on the whiteboard (Entra role, PIM for Groups, PIM for Azure resources), a printed Azure hierarchy diagram, and sticky notes.",
   "steps": [
    "Groups read each scenario card and place it under the PIM scope they would use, writing a one-line reason on a sticky note.",
    "For cards placed under PIM for Groups, groups must state whether the group type is supported (security, Microsoft 365, dynamic, on-premises synced).",
    "For cards placed under PIM for Azure resources, groups mark on the hierarchy diagram the narrowest scope for the assignment and note any onboarding step.",
    "The class reviews the board, and the teacher resolves disagreements with the selection rule from the lesson."
   ]
  },
  "discussion": [
   "What risks come from bundling many roles into one PIM-managed group?",
   "Why is User Access Administrator treated as a high-value role even though it cannot change resources directly?"
  ],
  "exit": [
   [
    "Name two kinds of groups that PIM for Groups does not support.",
    "Dynamic membership groups and groups synchronized from on-premises AD."
   ],
   [
    "What step comes before creating an eligible Owner assignment on a subscription in PIM?",
    "Discovering and onboarding the subscription in PIM for Azure resources."
   ],
   [
    "An eligible Contributor role is assigned at a management group. Which scopes can the user change after activation?",
    "Every subscription, resource group and resource under that management group, because RBAC inherits downward."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision flowchart (directory admin, group-based access, or Azure resource) and a reference card of supported group types for students to use during sorting.",
   "Extend: Ask students to design a least-privilege PIM layout for a company with two management groups and four subscriptions, including which roles are eligible at which scopes and who approves them."
  ]
 },
 {
  "t": "Sign-in, audit and provisioning logs; default retention and diagnostic settings to Log Analytics, storage or Event Hubs",
  "objectives": [
   "Students will be able to match investigative questions to sign-in, audit or provisioning logs.",
   "Students will be able to state default portal retention for Free and P1/P2 tenants.",
   "Students will be able to choose diagnostic setting destinations for querying, archiving and SIEM streaming.",
   "Students will be able to identify the separate sign-in categories that must be selected for export."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up scenario and ask students which log they would open first and why."
   ],
   [
    15,
    "Teach",
    "Explain the three log types and sign-in categories, walk through a sample sign-in entry and audit entry on the projector (written by the teacher), cover retention numbers, diagnostic setting categories and the three destinations."
   ],
   [
    15,
    "Activity",
    "Run the log detective activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Debrief the destination design question and common category mistakes."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "A user's MFA phone number changed six weeks ago and nobody knows who did it. Which log would show this, and would it still be available?",
  "activity": {
   "title": "Log detective",
   "materials": "Printed, teacher-made log excerpts (an interactive sign-in failure with a Conditional Access result, a non-interactive sign-in, an Update user audit entry with old and new values, a provisioning failure), question cards, and a whiteboard.",
   "steps": [
    "Pairs receive a stack of question cards, such as 'Who added this user to the Finance group?' and 'Why was this sign-in blocked?', and match each to the correct log excerpt.",
    "For each match, pairs underline the fields in the excerpt that answer the question (initiator, target, modified properties, error code, policy result).",
    "Pairs then receive a requirements card (keep two years, alert on break-glass sign-ins, feed a SIEM) and sketch diagnostic settings with categories and destinations on the whiteboard.",
    "The teacher reviews designs and checks that non-interactive and service principal categories were included where needed."
   ]
  },
  "discussion": [
   "Why might an organization send the same logs to more than one destination?",
   "What is lost if a company relies only on portal retention?"
  ],
  "exit": [
   [
    "Which log shows the Conditional Access policies applied to a specific sign-in?",
    "The sign-in log entry, in its Conditional Access details."
   ],
   [
    "How long does a Free tenant keep activity reports in the portal?",
    "7 days."
   ],
   [
    "Which destination is best for keeping logs cheaply for several years?",
    "An Azure storage account."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page table mapping common questions to logs and destinations to purposes for students to use while matching.",
   "Extend: Ask students to estimate which sign-in category generates the most volume and propose a design that balances cost and investigative value across destinations."
  ]
 },
 {
  "t": "Workbooks, KQL queries in Log Analytics, Identity Secure Score and Microsoft Entra recommendations",
  "objectives": [
   "Students will be able to select an appropriate Entra workbook template for a monitoring scenario.",
   "Students will be able to read and modify a simple KQL query on SigninLogs and interpret ResultType.",
   "Students will be able to explain how a saved KQL query becomes an Azure Monitor alert rule.",
   "Students will be able to compare Identity Secure Score with Microsoft Entra recommendations and prioritize actions from them."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: if you had a million sign-in records, what three questions would you want answered first? Write them on the board for later."
   ],
   [
    15,
    "Teach",
    "Show workbook templates and their purposes, walk line by line through the sample KQL query on the projector, explain ResultType and alert rules, then compare Identity Secure Score and Entra recommendations."
   ],
   [
    15,
    "Activity",
    "Run the query rewrite and prioritization activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Revisit the warm-up questions and decide which tool answers each."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "You need to block legacy authentication next month without breaking anything. What would you want to know first, and where would you look?",
  "activity": {
   "title": "Query rewrite and prioritization",
   "materials": "A projector showing the sample KQL query, printed query cards with blanks, a printed mock list of secure score improvement actions and recommendations written by the teacher, and student laptops with a browser or plain paper.",
   "steps": [
    "Pairs edit the sample query on paper or in a text editor to answer new questions: failures in the last hour, successes only, results for one user, and top applications by failures.",
    "Pairs swap their queries with another pair, who explains in plain words what each query returns.",
    "Pairs then rank five mock improvement actions and recommendations by priority, writing a one-line reason for each.",
    "The class compares rankings and the teacher discusses why admin MFA and legacy authentication blocking usually come first."
   ]
  },
  "discussion": [
   "When is it acceptable to mark a Secure Score action as risk accepted?",
   "What identity events deserve a real-time alert rather than a weekly report?"
  ],
  "exit": [
   [
    "What does ResultType 0 mean in SigninLogs?",
    "The sign-in succeeded."
   ],
   [
    "A workbook shows no data. What is the first thing to check?",
    "Whether a diagnostic setting is sending the relevant logs to the Log Analytics workspace."
   ],
   [
    "Which tool gives a percentage score of identity posture?",
    "Identity Secure Score."
   ]
  ],
  "differentiation": [
   "Support: Provide a KQL operator cheat sheet (where, summarize, project, order by) with one example each, and pair struggling students with a partner for query edits.",
   "Extend: Ask students to write a query that finds emergency access account sign-ins and describe the alert rule settings they would choose, including frequency and threshold."
  ]
 },
 {
  "t": "Licensing: Microsoft Entra ID P1, P2 and Microsoft Entra ID Governance features",
  "objectives": [
   "Students will be able to list the key features of Microsoft Entra ID Free, P1, P2 and ID Governance.",
   "Students will be able to determine the minimum license for a scenario that combines several features.",
   "Students will be able to explain the per-user licensing principle and apply it to Conditional Access and governance features.",
   "Students will be able to identify when Workload ID Premium is required instead of P2."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to guess which tier includes Conditional Access, PIM and lifecycle workflows, and record the guesses on the board to revisit."
   ],
   [
    15,
    "Teach",
    "Build a four-column table on the whiteboard (Free, P1, P2, ID Governance) and fill it in together, then add Workload ID Premium and External ID. Explain the per-user principle and the minimum-license method."
   ],
   [
    15,
    "Activity",
    "Run the feature card sort and budget challenge in small groups."
   ],
   [
    5,
    "Discuss",
    "Revisit the warm-up guesses and discuss which ones were wrong and why."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions individually."
   ]
  ],
  "warmup": "Your company already pays for Microsoft 365 E3. Which of these do you think it already has: Conditional Access, PIM, access reviews, lifecycle workflows?",
  "activity": {
   "title": "Feature card sort and budget challenge",
   "materials": "Printed feature cards (Conditional Access, dynamic groups, group-based licensing, SSPR writeback, app proxy, administrative units, ID Protection, PIM, access reviews, entitlement management, lifecycle workflows, workload identity Conditional Access), tier labels taped to tables or the whiteboard, and printed scenario cards.",
   "steps": [
    "Groups sort the feature cards under Free, P1, P2, ID Governance or Workload ID Premium.",
    "The teacher reveals the correct sort, and groups note any cards they misplaced.",
    "Groups draw scenario cards that describe a company's current plan and wanted features, then write the minimum additional license and which users need it.",
    "Groups present one scenario, and other groups challenge the answer if they think a lower tier would work."
   ]
  },
  "discussion": [
   "Why does Microsoft license most features per benefiting user rather than per administrator?",
   "How would you explain to a finance director why Microsoft 365 E3 does not cover everything the security team wants?"
  ],
  "exit": [
   [
    "What is the minimum license for risk-based Conditional Access for users?",
    "Microsoft Entra ID P2."
   ],
   [
    "A scenario needs administrative units and named locations. What is the minimum tier?",
    "Microsoft Entra ID P1."
   ],
   [
    "Which license covers Conditional Access for service principals?",
    "Microsoft Entra Workload ID Premium."
   ]
  ],
  "differentiation": [
   "Support: Give students a pre-filled tier table with a few blanks to complete, and let them use it during the scenario challenge.",
   "Extend: Ask students to write two tricky minimum-license questions with distractors and swap them with another group to solve."
  ]
 }
]);
