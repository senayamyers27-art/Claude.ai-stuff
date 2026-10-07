/* Teacher edition for Microsoft Certified: Cloud and AI Security Engineer Associate (replaces Azure Security Engineer Associate / AZ-500) (SC-500): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("sc-500", [
 {
  "t": "Microsoft Entra built-in roles vs Azure RBAC roles, scopes (management group, subscription, resource group, resource) and least privilege",
  "objectives": [
   "Students will be able to distinguish Microsoft Entra roles from Azure RBAC roles and choose the correct system for a given task.",
   "Students will be able to describe the scope hierarchy and predict inherited and additive effective permissions.",
   "Students will be able to identify which built-in roles can assign Azure roles and explain the Global Administrator elevation setting.",
   "Students will be able to apply least privilege by selecting a specific role at the narrowest scope for a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect quick answers on the whiteboard in two columns labeled Directory and Resources without correcting yet."
   ],
   [
    15,
    "Teach",
    "Draw the two systems side by side. List common Entra and Azure RBAC built-in roles, then draw the scope ladder from management group to resource and show inheritance with arrows. Explain additive permissions, the three parts of a role assignment, which roles can assign roles, and the Access management for Azure resources bridge."
   ],
   [
    15,
    "Activity",
    "Run the role-and-scope card sort in small groups. Circulate and ask each group to justify one placement aloud using the words principal, role and scope."
   ],
   [
    5,
    "Discuss",
    "Return to the warm-up columns, fix any misplaced items as a class, and work through the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand it in at the door."
   ]
  ],
  "warmup": "Your manager asks you to give a new developer 'the top admin role' so he can restart two virtual machines. What is wrong with that request, and what would you ask before granting anything?",
  "activity": {
   "title": "Role and scope card sort",
   "materials": "Printed task cards (12 short requests such as 'reset a user's password', 'restart VMs in one resource group', 'view all resources in 20 subscriptions', 'grant a teammate access to a key vault'), printed role cards, a whiteboard with the scope ladder drawn on it, sticky notes.",
   "steps": [
    "Give each group a deck of task cards and role cards.",
    "For each task, the group decides whether it is a directory task or a resource task, picks the least-privileged role, and writes the scope on a sticky note.",
    "Groups place their cards on the whiteboard ladder at the chosen scope.",
    "Each group challenges one placement made by another group, arguing for a narrower role or scope.",
    "The teacher reveals a reference answer and highlights tasks where Contributor or Global Administrator was a tempting but wrong choice."
   ]
  },
  "discussion": [
   "Why might Microsoft have kept directory permissions and resource permissions in separate systems?",
   "When is it reasonable to assign a role at the subscription instead of the resource group?",
   "What risks remain even after you assign roles to groups instead of individuals?"
  ],
  "exit": [
   [
    "A user must create app registrations and manage users. Entra role or Azure RBAC role?",
    "Entra role, because users and app registrations are directory objects."
   ],
   [
    "A user has Reader at a management group and Contributor on one resource group beneath it. What are their effective permissions in that resource group?",
    "Contributor, because Azure RBAC is additive and inherited assignments combine."
   ],
   [
    "Name two built-in roles that can create Azure role assignments.",
    "Any two of Owner, User Access Administrator and Role Based Access Control Administrator."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page chart with the two systems in columns and the scope ladder pre-drawn, and let students sort only six task cards first before attempting the full deck.",
   "Extend: Ask students to design the role assignments for a three-subscription company with a management group, a help desk scoped by administrative unit and a break-glass plan, then explain each choice in terms of least privilege."
  ]
 },
 {
  "t": "Custom Azure RBAC roles: actions, notActions, dataActions and assignable scopes",
  "objectives": [
   "Students will be able to explain the purpose of Actions, NotActions, DataActions, NotDataActions and AssignableScopes in a custom role definition.",
   "Students will be able to classify a resource provider operation as control plane or data plane.",
   "Students will be able to explain why NotActions is not a deny and predict effective permissions when roles overlap.",
   "Students will be able to draft a least-privilege custom role for a stated job."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student ideas for how to grant 'restart only' access."
   ],
   [
    15,
    "Teach",
    "Project the built-in Contributor definition and walk through each property. Show provider operation strings and wildcards, contrast Actions with DataActions using a storage example, stress that NotActions is subtraction not deny, and explain AssignableScopes and the permission needed to create roles."
   ],
   [
    15,
    "Activity",
    "Pairs complete the role-definition repair exercise on printed JSON excerpts, then trade with another pair to check."
   ],
   [
    5,
    "Discuss",
    "Review the most common errors pairs found and discuss the questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "No built-in role lets operators restart VMs without also letting them delete VMs. What options do you have, and what are the risks of each?",
  "activity": {
   "title": "Fix the role definition",
   "materials": "Printed sheets with four short custom role JSON excerpts, each containing one deliberate mistake (a data operation under Actions, an over-broad wildcard, a NotActions used as if it were a deny, an AssignableScopes that misses the target subscription), highlighters, projector.",
   "steps": [
    "Pairs read each excerpt and the job description printed above it.",
    "They highlight the mistake and rewrite the affected lines by hand.",
    "For the NotActions excerpt, pairs write one sentence explaining how a user could still perform the excluded action.",
    "Pairs swap sheets with a neighbor pair and mark agreement or disagreement on each fix.",
    "The teacher projects corrected versions and asks two pairs to explain their reasoning."
   ]
  },
  "discussion": [
   "When is it better to accept a slightly broader built-in role than maintain a custom role?",
   "What could go wrong over time with a role that uses a provider-wide wildcard?",
   "How would you test a new custom role safely before giving it to a production team?"
  ],
  "exit": [
   [
    "Where does Microsoft.Storage/storageAccounts/blobServices/containers/blobs/read belong in a custom role?",
    "DataActions, because reading blob contents is a data-plane operation."
   ],
   [
    "A user's custom role excludes VM delete in NotActions, and they also hold Virtual Machine Contributor. Can they delete VMs?",
    "Yes, because NotActions only trims that role and Azure RBAC is additive."
   ],
   [
    "Why might assigning a custom role at a new subscription fail?",
    "The subscription is not in the role's AssignableScopes, so the definition must be updated first."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference card that labels each property of a role definition with a plain-English description and two example operation strings, one control plane and one data plane.",
   "Extend: Ask students to write a complete custom role for a backup operator who may read VM settings, trigger backups and read Key Vault secrets in one subscription only, and to explain which parts are Actions and which are DataActions."
  ]
 },
 {
  "t": "Privileged Identity Management: eligible vs active assignments, activation with MFA, approval and justification, access reviews",
  "objectives": [
   "Students will be able to explain the difference between eligible and active, and permanent and time-bound, PIM assignments.",
   "Students will be able to configure, on paper, PIM role settings for activation duration, MFA or authentication context, justification, ticket and approval.",
   "Students will be able to identify PIM alerts that reveal standing privilege and choose a remedy.",
   "Students will be able to design an access review that keeps a privileged role's membership small."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and have students vote on whether permanent Owner for eleven people is acceptable, recording reasons on the board."
   ],
   [
    15,
    "Teach",
    "Draw a timeline showing a user moving from eligible to active and back. Explain the licensing, the three role types PIM covers, the role settings applied at activation, the approval flow, alerts and audit history, and how access reviews integrate. Show screenshots or a live demo of the PIM blade if available."
   ],
   [
    15,
    "Activity",
    "Run the activation role-play in groups of three: requester, approver and auditor."
   ],
   [
    5,
    "Discuss",
    "Groups share where the process felt slow or weak and connect that to the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Eleven people hold permanent Owner on your production subscription, but most use it only during outages. What is the risk, and what would you change?",
  "activity": {
   "title": "Just-in-time activation role-play",
   "materials": "Printed role cards (requester, approver, auditor), printed PIM role-settings forms, printed scenario cards describing incidents of different urgency, sticky notes, a whiteboard timeline.",
   "steps": [
    "Each group first fills in a role-settings form for either Global Administrator or production Owner, choosing duration, MFA or authentication context, justification, ticket and approval requirements.",
    "The requester draws a scenario card and writes an activation request on a sticky note that meets the settings.",
    "The approver decides to approve or deny based on the justification and settings, explaining why aloud.",
    "The auditor records the request on the whiteboard timeline, including start time, expiry and approver.",
    "Rotate roles twice, then each group identifies one setting they would tighten or loosen and why."
   ]
  },
  "discussion": [
   "How do you balance the delay of approval against the need to respond quickly to an outage?",
   "Why should break-glass accounts be treated differently from normal administrators?",
   "What evidence from PIM would you show an auditor to prove standing privilege has been reduced?"
  ],
  "exit": [
   [
    "A user has an eligible assignment for Security Administrator but has not activated it. Can they change security settings?",
    "No, eligible assignments grant no permissions until activated."
   ],
   [
    "Name three PIM role settings that can be required at activation.",
    "Any three of MFA or authentication context, justification, ticket number, approval and a maximum duration."
   ],
   [
    "Which feature regularly removes eligible role holders who no longer need the role?",
    "A recurring access review with auto-apply and a remove-access default for non-responses."
   ]
  ],
  "differentiation": [
   "Support: Provide a filled-in example role-settings form and a two-column chart contrasting eligible and active with one example each, so students can model their own form on it.",
   "Extend: Ask students to design a complete PIM rollout for a company with Entra roles, three subscriptions and privileged groups, including which roles need approval, alert review cadence and access review settings, and to justify each choice."
  ]
 },
 {
  "t": "Conditional Access: users and workload identities, cloud apps, conditions (sign-in risk, locations, device platform), grant and session controls, report-only mode",
  "objectives": [
   "Students will be able to describe the parts of a Conditional Access policy: assignments, target resources, conditions, grant controls and session controls.",
   "Students will be able to predict the outcome when multiple policies apply to one sign-in.",
   "Students will be able to build a policy on paper for a stated requirement, including break-glass exclusions.",
   "Students will be able to plan a safe rollout using report-only mode, What If and pilot groups."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up story of a Friday lockout and ask students to guess two things that might have gone wrong."
   ],
   [
    15,
    "Teach",
    "Draw a policy as an if-then box: assignments and conditions on the left, grant and session controls on the right. Walk through each component with examples, explain licensing, then explain evaluation logic with three overlapping policies. Finish with report-only, the insights workbook, What If and the sign-in log Conditional Access tab."
   ],
   [
    15,
    "Activity",
    "Groups play the policy evaluation game with sign-in cards and policy cards."
   ],
   [
    5,
    "Discuss",
    "Debrief tricky sign-ins and work through the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A new policy that blocks sign-ins from other countries locked out administrators and the help desk. What do you think went wrong, and how could it have been tested first?",
  "activity": {
   "title": "Policy evaluation game",
   "materials": "Printed policy cards (five policies with assignments, conditions and controls written out), printed sign-in cards (user, group, app, location, device platform, risk level), whiteboard, markers.",
   "steps": [
    "Each group receives the same five policy cards and a stack of ten sign-in cards.",
    "For each sign-in, the group lists which policies apply, then writes the final outcome: allowed, allowed after specific requirements, or blocked.",
    "The teacher reveals answers one at a time; groups score a point for each correct outcome and explanation.",
    "Groups then write one new policy card for a requirement the teacher gives, including an exclusion for break-glass accounts.",
    "Each group describes how they would roll out their new policy using report-only and What If."
   ]
  },
  "discussion": [
   "Why is 'all users, all resources, block' such a risky combination, and how would you make it safe?",
   "What are the trade-offs between requiring a compliant device and requiring MFA?",
   "How would you explain report-only results to a manager who wants the policy turned on today?"
  ],
  "exit": [
   [
    "Policy A requires MFA and policy B blocks access from a country. A user signs in from that country. What happens?",
    "Access is blocked, because all matching policies apply and block wins."
   ],
   [
    "Which policy state lets you see the impact without enforcing it?",
    "Report-only mode, with results shown in sign-in logs and the insights workbook."
   ],
   [
    "Which license is needed for a policy that requires MFA when sign-in risk is medium or high?",
    "Microsoft Entra ID P2."
   ]
  ],
  "differentiation": [
   "Support: Give students a blank policy template with labeled boxes for users, target resources, conditions, grant and session controls, and walk through filling one in together before the game.",
   "Extend: Ask students to design a baseline set of five policies for a company, explain how they interact, list the exclusions, and describe the order in which they would roll them out."
  ]
 },
 {
  "t": "MFA and authentication methods policy, phishing-resistant methods (FIDO2, passkeys, Windows Hello), authentication strengths",
  "objectives": [
   "Students will be able to explain the three factor categories and compare security defaults, per-user MFA and Conditional Access as ways to require MFA.",
   "Students will be able to identify which Entra authentication methods are phishing-resistant and explain why.",
   "Students will be able to choose the correct built-in or custom authentication strength for a scenario.",
   "Students will be able to plan a rollout that registers strong methods with Temporary Access Pass before enforcement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Tell the warm-up story and ask students why MFA did not stop the attacker."
   ],
   [
    15,
    "Teach",
    "Draw a phishing proxy between a user and the real site and show how a code or push approval is relayed. Then show how a passkey checks the origin. Tour the authentication methods policy, list the methods, and present the three built-in authentication strengths and custom strengths. Explain Temporary Access Pass and rollout order."
   ],
   [
    15,
    "Activity",
    "Groups complete the method ranking and policy design task."
   ],
   [
    5,
    "Discuss",
    "Groups compare rankings and discuss the questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "An administrator used MFA and still had their session stolen by a fake sign-in page. How is that possible?",
  "activity": {
   "title": "Rank the methods, then require the right strength",
   "materials": "Printed method cards (SMS, voice call, Authenticator push with number matching, Authenticator passwordless, OATH hardware token, FIDO2 security key, passkey in Authenticator, Windows Hello for Business, certificate-based authentication, Temporary Access Pass), whiteboard, sticky notes.",
   "steps": [
    "Groups arrange method cards from weakest to strongest against phishing, marking which ones are phishing-resistant.",
    "Groups sort the same cards into the three built-in authentication strengths, noting cards that fit more than one.",
    "The teacher hands each group a scenario (admins, frontline workers, contractors, break-glass accounts).",
    "Groups write a short plan on sticky notes: which methods to enable in the authentication methods policy, which strength to require in Conditional Access, and how users register.",
    "Groups post plans on the board and the class checks each one for lockout risks."
   ]
  },
  "discussion": [
   "Why might an organization keep SMS enabled for some users even though it is weak, and how would you limit the risk?",
   "What problems could arise if you enforce a phishing-resistant strength before users register keys?",
   "How do number matching and phishing-resistant methods address different attacks?"
  ],
  "exit": [
   [
    "Name three phishing-resistant methods in Entra ID.",
    "Any three of FIDO2 security keys, passkeys (including in Microsoft Authenticator), Windows Hello for Business and certificate-based authentication."
   ],
   [
    "Which Conditional Access grant control requires a specific set of methods?",
    "Require authentication strength."
   ],
   [
    "What is Temporary Access Pass used for?",
    "A time-limited code for onboarding or recovering strong methods without a password."
   ]
  ],
  "differentiation": [
   "Support: Provide a table with each method, its factor type and a yes or no column for phishing-resistant, and let students use it during the ranking task.",
   "Extend: Ask students to design a custom authentication strength that allows only approved FIDO2 key models for administrators and explain how AAGUIDs make that possible, plus how they would handle a lost key."
  ]
 },
 {
  "t": "Managed identities: system-assigned vs user-assigned, and replacing stored secrets with token-based access",
  "objectives": [
   "Students will be able to explain how a managed identity removes stored secrets from application code and configuration.",
   "Students will be able to compare system-assigned and user-assigned identities and choose the right one for a scenario.",
   "Students will be able to describe how code obtains a token and why an RBAC role on the target is still required.",
   "Students will be able to sequence the steps for replacing a stored key with token-based access."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a fictional configuration file containing a connection string with the key replaced by asterisks and ask students what could go wrong."
   ],
   [
    15,
    "Teach",
    "Diagram an app, the local token endpoint, Entra ID and a target service. Explain system-assigned versus user-assigned with life cycle arrows, show DefaultAzureCredential conceptually, and stress that authorization is a separate RBAC step. Walk through the secret-replacement sequence."
   ],
   [
    15,
    "Activity",
    "Pairs complete the migration sequencing and identity choice cards."
   ],
   [
    5,
    "Discuss",
    "Review answers and work through the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A storage key has been found in a code repository. If you rotate it right now, what might break, and what would a better long-term design look like?",
  "activity": {
   "title": "From secrets to identities",
   "materials": "Printed step cards for a secret-to-identity migration (shuffled), printed scenario cards describing five workloads, whiteboard, sticky notes.",
   "steps": [
    "Pairs put the shuffled migration step cards in the correct order, from enabling the identity to rotating the old key.",
    "Pairs then read five scenario cards (single web app, scale set rebuilt weekly, many function apps sharing access, a VM that must be cleaned up automatically, a pipeline outside Azure).",
    "For each scenario, pairs choose system-assigned, user-assigned or 'not a managed identity' and write the reason on a sticky note.",
    "For each Azure scenario, pairs name the RBAC role they would grant on the target.",
    "Pairs post their answers on the whiteboard and the teacher discusses any disagreements."
   ]
  },
  "discussion": [
   "Why is removing the secret from configuration not the final step of a migration?",
   "What are the operational risks of sharing one user-assigned identity across many resources?",
   "How does a managed identity change what you would look for in an incident investigation?"
  ],
  "exit": [
   [
    "Which managed identity type is deleted automatically with its resource?",
    "System-assigned."
   ],
   [
    "An app gets a token successfully but receives 403 from Storage. What is the likely fix?",
    "Grant the identity a data-plane role such as Storage Blob Data Reader on the target."
   ],
   [
    "Why choose a user-assigned identity for a scale set that is rebuilt often?",
    "It persists across rebuilds and keeps its role assignments, and it can be shared by all instances."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column comparison chart of system-assigned and user-assigned identities with life cycle, sharing and typical use, and let students use it during the scenario cards.",
   "Extend: Ask students to write pseudocode showing an app reading a Key Vault secret with DefaultAzureCredential and to list every Azure configuration step needed for it to work in production."
  ]
 },
 {
  "t": "App registrations vs enterprise applications (service principals), API permissions, admin consent and user consent settings",
  "objectives": [
   "Students will be able to distinguish the application object from the service principal and state where each is managed.",
   "Students will be able to compare delegated and application permissions and identify which require admin consent.",
   "Students will be able to configure user consent settings and the admin consent workflow for a scenario.",
   "Students will be able to describe how to detect and respond to an illicit consent grant."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a mock consent screen (drawn or described) and ask students whether they would click Accept and why."
   ],
   [
    15,
    "Teach",
    "Draw one application object in a home tenant with arrows to service principals in two customer tenants. Explain App registrations versus Enterprise applications, delegated versus application permissions with the intersection rule, user versus admin consent, and the consent settings and admin consent workflow."
   ],
   [
    15,
    "Activity",
    "Groups run the consent incident tabletop exercise."
   ],
   [
    5,
    "Discuss",
    "Groups report their containment steps and discuss the questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A pop-up asks you to let a calendar tool 'read and write your mail'. What questions should you ask before agreeing, and who in your organization should decide?",
  "activity": {
   "title": "Consent incident tabletop",
   "materials": "Printed incident timeline cards (user clicks link, consent granted, unusual mail reads, alert raised), printed excerpts of an enterprise app's permissions page and audit log entries written by the teacher, whiteboard.",
   "steps": [
    "Groups read the timeline cards and identify which object (application object or service principal) the attacker's app created in the tenant.",
    "Using the permissions page excerpt, groups decide which permissions are delegated or application and which needed admin consent.",
    "Groups list containment steps in order: revoke grants, disable sign-in or delete the service principal, review audit logs, check other users who consented.",
    "Groups write the consent settings and admin consent workflow configuration they would apply to prevent a repeat.",
    "Each group presents one prevention change and the class votes on the most effective."
   ]
  },
  "discussion": [
   "Why does a password reset not stop an app that was granted consent?",
   "What are the costs of disabling user consent entirely in a large organization?",
   "How would you decide which permissions count as low impact for user consent?"
  ],
  "exit": [
   [
    "Where do you set 'Assignment required' so only assigned users can sign in to an app?",
    "On the enterprise application (service principal) in Enterprise applications."
   ],
   [
    "Which permission type always needs admin consent?",
    "Application (app-only) permissions."
   ],
   [
    "What feature lets users request approval for apps they cannot consent to themselves?",
    "The admin consent workflow."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of the application object and service principal with arrows to the blades where each is managed, and a short glossary of consent terms.",
   "Extend: Ask students to write a quarterly app review procedure that identifies high-risk application permissions, unused apps and client secrets nearing expiry, and explain which roles are needed to act on the findings."
  ]
 },
 {
  "t": "Azure Key Vault: RBAC vs access policies, soft delete and purge protection, key rotation, network restrictions, Defender for Key Vault",
  "objectives": [
   "Students will be able to compare the Azure RBAC and access policy permission models and explain why RBAC is recommended.",
   "Students will be able to explain soft delete and purge protection and when each is required.",
   "Students will be able to describe automated key rotation and network restriction options for a vault.",
   "Students will be able to identify how Defender for Key Vault and diagnostic logs support detection and investigation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the 2 a.m. alert scenario and ask students to list what they would want to know first."
   ],
   [
    15,
    "Teach",
    "Draw the management plane and data plane with the roles that control each. Contrast access policies and RBAC, including the Contributor weakness. Show soft delete and purge protection on a timeline, then cover rotation policies with Event Grid, network options and Defender for Key Vault with AuditEvent logs."
   ],
   [
    15,
    "Activity",
    "Groups harden a vault using a printed configuration review sheet."
   ],
   [
    5,
    "Discuss",
    "Groups share their top three changes and discuss the questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Someone deleted the key that encrypts a production database. What settings would decide whether you can get it back?",
  "activity": {
   "title": "Vault hardening review",
   "materials": "Printed vault configuration sheets written by the teacher (permission model, soft delete retention, purge protection status, network settings, a list of role assignments and access policies, diagnostic settings), printed short AuditEvent log excerpts, highlighters, whiteboard.",
   "steps": [
    "Groups read the configuration sheet and highlight every setting that creates risk.",
    "For each risk, groups write the change they would make and why on the sheet margin.",
    "Groups read the log excerpt and identify which identity performed a suspicious operation and from where.",
    "Groups rank their changes by priority and write the top three on the whiteboard.",
    "The teacher reviews the class list and points out which changes are irreversible, such as enabling purge protection."
   ]
  },
  "discussion": [
   "Why might an organization hesitate to enable purge protection, and is that hesitation justified?",
   "How does moving to the RBAC permission model change who can grant data access?",
   "What would you look for in AuditEvent logs after a Defender for Key Vault alert?"
  ],
  "exit": [
   [
    "In which permission model can a vault Contributor grant themselves secret access?",
    "The access policy model."
   ],
   [
    "What does purge protection prevent?",
    "Permanent purging of deleted vaults and objects before the retention period ends, even by administrators."
   ],
   [
    "Which feature automatically creates new key versions on a schedule?",
    "A key rotation policy."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card with the two planes, the main data roles and a timeline of delete, soft-deleted, recover or purge, so students can check each setting against it.",
   "Extend: Ask students to design a complete customer-managed key setup for a storage account, listing the vault settings, identity, data role, rotation policy, network configuration and the alerts they would expect to receive."
  ]
 },
 {
  "t": "Azure Policy: built-in vs custom definitions, initiatives, effects (Deny, Audit, Modify, DeployIfNotExists), remediation tasks, exemptions",
  "objectives": [
   "Students will be able to distinguish Azure Policy from Azure RBAC and describe the parts of a policy definition and assignment.",
   "Students will be able to select the correct effect (Deny, Audit, AuditIfNotExists, Modify, DeployIfNotExists) for a requirement.",
   "Students will be able to explain when a remediation task and managed identity are needed.",
   "Students will be able to choose between an exemption and an exclusion and justify the category."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the compliance officer's three complaints on the board and ask students how they would prevent each one in future."
   ],
   [
    15,
    "Teach",
    "Contrast RBAC and Policy. Walk through a definition's if and then blocks, built-in versus custom, parameters and initiatives. Present the effects as a ladder from Disabled to DeployIfNotExists, then explain remediation tasks, the managed identity requirement, and exemptions versus exclusions."
   ],
   [
    15,
    "Activity",
    "Groups play the effect-matching card game, then plan remediation."
   ],
   [
    5,
    "Discuss",
    "Review the trickiest cards and the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Teams keep deploying resources in unapproved regions and without tags. Would you rather block them, report them or fix their resources automatically, and why?",
  "activity": {
   "title": "Pick the effect",
   "materials": "Printed requirement cards (12 requirements such as 'no resources outside two regions', 'report VMs without backup', 'add an owner tag automatically', 'enable diagnostic settings on all key vaults'), printed effect cards, sticky notes, whiteboard.",
   "steps": [
    "Groups match each requirement card to the most suitable effect card and note whether a remediation task would be needed for existing resources.",
    "For any Modify or DeployIfNotExists match, groups write which role the assignment's managed identity would need.",
    "The teacher hands out two exception scenarios and groups decide between an exemption and an exclusion, choosing Waiver or Mitigated and an expiry.",
    "Groups group related requirements into a proposed initiative and give it a name.",
    "Groups present one requirement where they disagreed internally and how they resolved it."
   ]
  },
  "discussion": [
   "When would you start a new rule in Audit rather than Deny, and how long would you wait before switching?",
   "What risks come from giving a policy assignment's managed identity broad roles like Contributor?",
   "How do exemptions with expiration dates help during an audit?"
  ],
  "exit": [
   [
    "Which effect blocks a non-compliant resource from being created?",
    "Deny."
   ],
   [
    "Existing resources are non-compliant with a DeployIfNotExists assignment. What two things are needed to fix them?",
    "A remediation task and a managed identity on the assignment with the required roles."
   ],
   [
    "Name the two exemption categories.",
    "Waiver and Mitigated."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page effect ladder with a plain-language sentence and an example for each effect, and pair students so one reads requirements aloud while the other chooses.",
   "Extend: Ask students to write the if condition for a custom policy that denies storage accounts with a minimum Transport Layer Security (TLS) version below 1.2 using an alias, and to explain how they would roll it out from Audit to Deny."
  ]
 },
 {
  "t": "Resource locks (CanNotDelete, ReadOnly), management group hierarchy and governance at scale",
  "objectives": [
   "Students will be able to compare CanNotDelete and ReadOnly locks and predict which operations each blocks.",
   "Students will be able to explain why locks apply to Owners but not to data-plane operations.",
   "Students will be able to describe management group hierarchy rules and inheritance of RBAC and policy.",
   "Students will be able to design a management group structure with guardrails at appropriate levels."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Tell the accidental deletion story and ask students what single change might have prevented it."
   ],
   [
    15,
    "Teach",
    "Explain the two lock types with a table of allowed and blocked operations, including the control-plane-only rule and ReadOnly side effects. Then draw a management group tree from the root, explain the six-level limit, single parent rule and inheritance, and sketch a landing zone layout. Mention tags, budgets, deployment stacks and infrastructure as code."
   ],
   [
    15,
    "Activity",
    "Groups whiteboard a management group hierarchy and decide where locks and policies go."
   ],
   [
    5,
    "Discuss",
    "Groups compare designs and discuss the questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "An Owner deleted a production resource group by mistake. Should Azure have stopped them? What kind of control would make that mistake harder?",
  "activity": {
   "title": "Design the hierarchy",
   "materials": "Whiteboard or large paper per group, sticky notes in three colors (subscriptions, policies, locks), printed company profile describing 12 subscriptions and their purposes.",
   "steps": [
    "Groups read the company profile and draw a management group tree under the root, staying within the nesting limit.",
    "Groups place subscription sticky notes in the tree, making sure each subscription has exactly one parent.",
    "Groups place policy sticky notes at the highest level where each guardrail should apply.",
    "Groups mark which resource groups or resources need CanNotDelete or ReadOnly locks and write one sentence justifying each choice.",
    "Groups do a gallery walk, leaving one question sticky note on another group's design."
   ]
  },
  "discussion": [
   "Why are locks described as a speed bump rather than a security boundary?",
   "What could go wrong if you assign a strict Deny policy at the root management group?",
   "How would you protect data inside a locked storage account?"
  ],
  "exit": [
   [
    "Which lock type blocks updates as well as deletion?",
    "ReadOnly."
   ],
   [
    "Does a CanNotDelete lock on a storage account stop a user deleting blobs?",
    "No, locks apply only to control-plane operations, not data."
   ],
   [
    "How many management groups can a subscription belong to at once?",
    "Exactly one."
   ]
  ],
  "differentiation": [
   "Support: Provide a pre-drawn management group tree with blanks and a lock comparison table, so students fill in names and checkmarks rather than starting from scratch.",
   "Extend: Ask students to write a short runbook for safely retiring a locked production resource group, including who may remove the lock, how the action is approved through PIM and how it is audited."
  ]
 },
 {
  "t": "Finding and fixing over-privileged access with access reviews and Entra ID Protection risk policies",
  "objectives": [
   "Students will be able to identify sources that reveal over-privileged access, including PIM alerts, IAM role assignments and Defender for Cloud recommendations.",
   "Students will be able to configure an access review's reviewers, recurrence, non-response default and auto-apply settings for a scenario.",
   "Students will be able to distinguish sign-in risk from user risk and classify common detections.",
   "Students will be able to match each risk type to the correct Conditional Access remediation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Share the 27-Owners scenario and ask students to estimate how many of those accounts are truly needed and how they would find out."
   ],
   [
    15,
    "Teach",
    "Explain how privilege accumulates, then walk through access review settings. Present ID Protection, sign-in risk versus user risk with example detections, risk-based Conditional Access policies, MFA registration, and the admin reports and actions."
   ],
   [
    15,
    "Activity",
    "Groups sort detection cards and design an access review."
   ],
   [
    5,
    "Discuss",
    "Groups share their designs and discuss the questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Twenty-seven people hold Owner on production. How would you decide who should keep it, and who should make that decision?",
  "activity": {
   "title": "Risk sort and review design",
   "materials": "Printed detection cards (leaked credentials, anonymous IP address, atypical travel, unfamiliar sign-in properties, malicious IP address, password spray, Microsoft threat intelligence), two labeled areas on the whiteboard for sign-in risk and user risk, printed access review planning forms.",
   "steps": [
    "Groups sort each detection card into sign-in risk or user risk on the whiteboard.",
    "Next to each area, groups write the Conditional Access remediation they would require and at which risk level.",
    "Groups receive a scenario (stale subscription Owners, forgotten Teams guests, or unused app assignments) and fill in an access review planning form: target, reviewers, recurrence, duration, non-response default, auto-apply and recommendations.",
    "Groups swap forms with another group, which looks for settings that would let stale access survive.",
    "The teacher reveals the correct detection sort and highlights common misplacements."
   ]
  },
  "discussion": [
   "Who makes a better reviewer for privileged access: the user, the manager or the resource owner, and why?",
   "What are the risks of setting non-responses to Remove access?",
   "Why does Microsoft recommend configuring risk policies in Conditional Access rather than the older standalone policies?"
  ],
  "exit": [
   [
    "Is leaked credentials a sign-in risk or user risk detection?",
    "User risk."
   ],
   [
    "What remediation fits a medium or high sign-in risk?",
    "Require MFA through a sign-in risk Conditional Access policy."
   ],
   [
    "Which two access review settings together remove unreviewed users automatically?",
    "Non-response default set to Remove access, and auto-apply results enabled."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column reference chart with sign-in risk and user risk definitions, three example detections each and the matching remediation, plus a partially completed review planning form.",
   "Extend: Ask students to design a full privileged-access hygiene program combining PIM, quarterly access reviews, risk-based Conditional Access and Sentinel export, and to write the metrics they would report to leadership each quarter."
  ]
 },
 {
  "t": "Storage authorization: Entra ID with data-plane RBAC, account keys, disabling Shared Key, key rotation",
  "objectives": [
   "Students will be able to rank storage authorization methods from most to least secure and explain why.",
   "Students will be able to distinguish management roles from data-plane roles and choose the least-privileged data role.",
   "Students will be able to predict the effect of disabling Shared Key on keys and each type of SAS.",
   "Students will be able to sequence a zero-downtime key rotation and a migration from keys to Entra ID."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the auditor's question and ask students what information the logs would need to answer it."
   ],
   [
    15,
    "Teach",
    "Compare Entra ID authorization and Shared Key side by side. List the data roles per storage service, explain listKeys and why Contributor is powerful, then cover the allowSharedKeyAccess setting, what breaks when it is disabled, two-key rotation, key expiration policy and anonymous access."
   ],
   [
    15,
    "Activity",
    "Pairs work through the storage migration planning cards."
   ],
   [
    5,
    "Discuss",
    "Pairs share their migration order and discuss the questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "An auditor asks who downloaded a set of files, but every log entry shows only that an account key was used. What would you change so this question can be answered next time?",
  "activity": {
   "title": "Kill the key migration plan",
   "materials": "Printed inventory cards describing clients of one storage account (web app, VM batch job, developer scripts, partner with a service SAS, legacy on-premises tool), printed shuffled migration step cards, whiteboard.",
   "steps": [
    "Pairs read the inventory cards and decide, for each client, which identity and data role it should use instead of the key.",
    "Pairs mark any client that would break when Shared Key is disabled and write what replaces it, such as a user delegation SAS.",
    "Pairs put the shuffled migration step cards in order, from granting roles to regenerating both keys.",
    "Pairs write a separate four-step plan for rotating keys without downtime in case one client cannot migrate yet.",
    "Two pairs present their plans and the class identifies any step that could cause an outage."
   ]
  },
  "discussion": [
   "Why is Contributor on a storage account effectively full data access?",
   "What would you do about a legacy tool that can only use account keys?",
   "How do Azure Policy and metrics help you disable Shared Key safely?"
  ],
  "exit": [
   [
    "Which role lets a user read blobs with Entra authorization and least privilege?",
    "Storage Blob Data Reader at the narrowest needed scope."
   ],
   [
    "Which SAS type keeps working after Shared Key is disabled?",
    "User delegation SAS."
   ],
   [
    "What is the first step in rotating keys without downtime?",
    "Move all clients to the other key before regenerating the first."
   ]
  ],
  "differentiation": [
   "Support: Provide a chart listing each storage service with its data roles and a simple flow diagram of the two-key rotation, so students can refer to them while sequencing.",
   "Extend: Ask students to write an Azure Policy approach that audits and then denies storage accounts with Shared Key enabled or anonymous blob access allowed, and to describe how they would handle exemptions for legacy systems."
  ]
 },
 {
  "t": "Shared access signatures: user delegation vs service vs account SAS, stored access policies and revocation",
  "objectives": [
   "Students will be able to distinguish user delegation, service and account SAS by how they are signed and what they can reach.",
   "Students will be able to explain how stored access policies enable revocation and which SAS types support them.",
   "Students will be able to choose the least disruptive revocation method for a leaked SAS in a given scenario.",
   "Students will be able to apply SAS best practices such as HTTPS only, short expiry, narrow scope and expiration policies."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a fake SAS URL on the projector (no real account) and ask students to circle each parameter and guess what it means."
   ],
   [
    12,
    "Teach",
    "Walk through the three SAS types with a table on the whiteboard: signed by, services covered, works with Shared Key disabled, stored access policy support. Then explain revocation options for each."
   ],
   [
    18,
    "Activity",
    "Run the 'Leak Response' card exercise in small groups."
   ],
   [
    5,
    "Discuss",
    "Ask groups to share their hardest card and why the obvious answer was wrong."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three questions on sticky notes and post them on the door."
   ]
  ],
  "warmup": "If you give a contractor a link that lets them upload files, how would you take that access back before the link's expiry date?",
  "activity": {
   "title": "Leak Response",
   "materials": "Printed scenario cards (8 to 10), whiteboard, markers.",
   "steps": [
    "Prepare cards, each describing a leaked SAS: its type, whether it references a stored access policy, which key signed it and what other apps depend on that key.",
    "Groups pick a card and decide the revocation method, the expected blast radius and one design change that would have made revocation easier.",
    "Each group writes its answer on the whiteboard in a three-column table: method, side effects, prevention.",
    "The teacher reviews each row, correcting any group that chose key regeneration when a stored access policy was available, or that tried to attach a policy to an account SAS."
   ]
  },
  "discussion": [
   "Why would Microsoft recommend user delegation SAS even though service SAS is simpler to create?",
   "When, if ever, is an account SAS the right tool?"
  ],
  "exit": [
   [
    "Which SAS type is signed with Entra credentials?",
    "User delegation SAS."
   ],
   [
    "How do you revoke all service SAS tokens linked to a stored access policy?",
    "Delete the policy or set its expiry to the past."
   ],
   [
    "A leaked ad hoc account SAS was signed with key2. What must you do?",
    "Regenerate key2 after moving dependent apps to key1 or Entra authentication, or wait for expiry."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a one-page comparison table of the three SAS types to use during the card activity, and pair them with a confident partner.",
   "Extend: ask fast finishers to design a storage access standard for a company that disables Shared Key, explaining how partners and browsers will still get scoped access."
  ]
 },
 {
  "t": "Storage encryption: Microsoft-managed vs customer-managed keys, infrastructure encryption, immutable blob storage",
  "objectives": [
   "Students will be able to compare Microsoft-managed keys and customer-managed keys, including the envelope encryption model.",
   "Students will be able to list the prerequisites for configuring CMK on a storage account.",
   "Students will be able to explain when infrastructure encryption can be enabled and why it is used.",
   "Students will be able to select between time-based retention and legal hold for a given compliance scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three answers on the whiteboard."
   ],
   [
    15,
    "Teach",
    "Draw envelope encryption as nested boxes, then list CMK prerequisites. Contrast infrastructure encryption (creation only) and immutable storage (integrity, not secrecy)."
   ],
   [
    15,
    "Activity",
    "Run the 'Auditor's Checklist' matching exercise in pairs."
   ],
   [
    5,
    "Discuss",
    "Discuss which requirements could be retrofitted on existing accounts and which force a migration."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions on paper."
   ]
  ],
  "warmup": "If all Azure Storage data is already encrypted, why would a regulator still ask who holds the key?",
  "activity": {
   "title": "Auditor's Checklist",
   "materials": "Printed checklist of 8 auditor requirements, printed cards naming features (CMK, Microsoft-managed keys, infrastructure encryption, encryption scope, customer-provided key, time-based retention unlocked, time-based retention locked, legal hold, soft delete).",
   "steps": [
    "Pairs receive the checklist and feature cards.",
    "For each requirement, pairs place the feature card that satisfies it and note whether it can be applied to an existing account.",
    "Pairs swap with a neighboring pair and check each other's matches.",
    "The teacher reveals the answers and highlights two traps: infrastructure encryption only at creation, and CMK not preventing deletion."
   ]
  },
  "discussion": [
   "What risk does an organization take on when it chooses CMK and then loses control of its key vault?",
   "Why might a company use both a locked retention policy and a legal hold on the same data?"
  ],
  "exit": [
   [
    "Name two key vault settings required for storage CMK.",
    "Soft delete and purge protection."
   ],
   [
    "Why is a user-assigned identity needed for CMK at account creation?",
    "The system-assigned identity does not exist until the account is created."
   ],
   [
    "A locked retention policy is set to 5 years. Can it be changed to 3?",
    "No, a locked policy can only be extended."
   ]
  ],
  "differentiation": [
   "Support: give students a two-column organizer labeled 'Who holds the key' and 'Can it be changed or deleted' to sort features into before the activity.",
   "Extend: ask students to design a ransomware-resilient backup storage account, justifying each choice among CMK, immutability, soft delete and versioning."
  ]
 },
 {
  "t": "Storage firewall, trusted services exceptions, and Defender for Storage (activity monitoring, malware scanning, sensitive data threat detection)",
  "objectives": [
   "Students will be able to configure the three public network access options and explain the limits of IP rules.",
   "Students will be able to choose between the trusted services exception and a resource instance rule.",
   "Students will be able to describe the three Defender for Storage capabilities: activity monitoring, malware scanning and sensitive data threat detection.",
   "Students will be able to design an automated response to a malware scan result."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the three-alert hook scenario on the projector and ask students which problem they would tackle first and why."
   ],
   [
    15,
    "Teach",
    "Sketch the storage account with firewall rings on the whiteboard: VNet rules, IP rules, exceptions, private endpoints. Then add Defender for Storage as a monitoring layer with its three capabilities."
   ],
   [
    15,
    "Activity",
    "Pairs complete the 'Who Gets In' rule-reading exercise and design a quarantine flow."
   ],
   [
    5,
    "Discuss",
    "Discuss why network rules and authorization must both pass."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three questions on index cards."
   ]
  ],
  "warmup": "If a storage account requires a valid key or token, why add a network firewall at all?",
  "activity": {
   "title": "Who Gets In",
   "materials": "Printed handout showing a storage account's network settings (allowed subnets, IP ranges, exceptions) and a list of 8 connection attempts; whiteboard.",
   "steps": [
    "Pairs read the network settings and decide for each connection attempt whether it is allowed, blocked by the firewall or blocked by authorization.",
    "For two blocked Microsoft services on the list, pairs choose the trusted services exception or a resource instance rule and justify the choice.",
    "Pairs sketch on paper a flow from blob upload to malware scan result to Event Grid to an automated quarantine action.",
    "Two pairs present their flows on the whiteboard and the class critiques them."
   ]
  },
  "discussion": [
   "What are the risks of leaving the trusted services exception enabled permanently?",
   "How should a team balance malware scanning costs against coverage?"
  ],
  "exit": [
   [
    "Can you add 10.1.0.0/16 to a storage account's IP firewall rules?",
    "No, private ranges are not allowed; use VNet rules or private endpoints."
   ],
   [
    "What does on-upload malware scanning write to a scanned blob?",
    "Blob index tags with the scan result."
   ],
   [
    "What Defender for Storage feature uses Purview sensitive information types?",
    "Sensitive data threat detection."
   ]
  ],
  "differentiation": [
   "Support: provide a flowchart that walks through firewall evaluation step by step for students to follow during the activity.",
   "Extend: ask students to write a short runbook for responding to a 'Tor exit node access' alert, including which logs to check and what containment steps to take."
  ]
 },
 {
  "t": "Azure SQL security: Entra-only authentication, server and database firewall rules, TDE with CMK, Always Encrypted, dynamic data masking, auditing, Defender for SQL",
  "objectives": [
   "Students will be able to map Azure SQL security features to the layer and threat each addresses.",
   "Students will be able to contrast TDE, Always Encrypted and dynamic data masking in terms of who can see plaintext.",
   "Students will be able to explain server-level versus database-level firewall rules and the risk of allowing all Azure services.",
   "Students will be able to recommend authentication and monitoring settings, including Entra-only authentication and Defender for SQL."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and have students vote by raising hands."
   ],
   [
    15,
    "Teach",
    "Draw four horizontal layers on the whiteboard (Reach, Prove, See, Watch) and place each feature in its layer, stressing who sees plaintext under TDE, Always Encrypted and masking."
   ],
   [
    15,
    "Activity",
    "Groups play the 'Requirement Match' card game."
   ],
   [
    5,
    "Discuss",
    "Debate when deterministic encryption is acceptable."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions individually."
   ]
  ],
  "warmup": "If a database is encrypted with TDE, can the database administrator read customer card numbers? Why or why not?",
  "activity": {
   "title": "Requirement Match",
   "materials": "Two sets of printed cards: 10 requirement cards (for example 'DBAs must not see SSNs', 'support sees last four digits', 'no password logins', 'rules must follow a geo-replica') and feature cards; whiteboard.",
   "steps": [
    "Groups of three receive both card sets.",
    "Groups match each requirement with the feature that meets it and write one sentence on what that feature does not protect.",
    "Each group places its matches on a whiteboard grid under the four layers.",
    "The teacher reviews mismatches, especially TDE chosen for DBA-proofing and masking chosen as encryption."
   ]
  },
  "discussion": [
   "Why might an organization use Always Encrypted and dynamic data masking on different columns of the same table?",
   "What operational risks come with TDE customer-managed keys?"
  ],
  "exit": [
   [
    "Which feature encrypts data in the client driver?",
    "Always Encrypted."
   ],
   [
    "Which stored procedure creates a database-level firewall rule?",
    "sp_set_database_firewall_rule."
   ],
   [
    "Name two alert types from Defender for SQL Advanced Threat Protection.",
    "SQL injection attempts and brute force or unusual-location logins."
   ]
  ],
  "differentiation": [
   "Support: give students a 'who sees plaintext' table with rows for DBA, app with key, support user and backup thief to fill in for each feature.",
   "Extend: ask students to design the full security configuration for a multi-region SQL deployment, including firewall rule scope, key placement and audit destinations."
  ]
 },
 {
  "t": "Network security groups and application security groups, service tags, rule priority and default rules",
  "objectives": [
   "Students will be able to determine the outcome of traffic given a set of NSG rules with priorities.",
   "Students will be able to describe the six default NSG rules and their practical effect.",
   "Students will be able to explain evaluation order when NSGs are applied at both subnet and NIC.",
   "Students will be able to design rules using service tags and application security groups for a multi-tier application."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display two conflicting rules with different priorities and ask students to predict the result."
   ],
   [
    12,
    "Teach",
    "Explain rule anatomy, first-match processing and default rules. Draw a packet passing subnet and NIC NSGs inbound and outbound."
   ],
   [
    18,
    "Activity",
    "Run 'Human Packets', a role-play in which students act as NSGs."
   ],
   [
    5,
    "Discuss",
    "Discuss why defaults allow VNet traffic and what micro-segmentation requires."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions."
   ]
  ],
  "warmup": "An NSG allows TCP 22 at priority 500 and denies all traffic at priority 400. Can you SSH to the VM?",
  "activity": {
   "title": "Human Packets",
   "materials": "Printed rule sheets for a subnet NSG and a NIC NSG, printed packet cards (source, destination, port, direction), sticky notes, whiteboard.",
   "steps": [
    "Two students play the subnet NSG and NIC NSG, each holding a printed rule sheet sorted by priority.",
    "Other students draw packet cards and walk them through the NSGs in the correct order for their direction.",
    "Each NSG student reads rules from the lowest number and announces the first match and action; the class records outcomes on the whiteboard.",
    "Groups then rewrite the rules using ASGs and service tags to meet a micro-segmentation requirement and retest three packets."
   ]
  },
  "discussion": [
   "Should NSGs be attached to subnets, NICs or both in a large environment? Why?",
   "What are the risks of relying on the default AllowInternetOutBound rule?"
  ],
  "exit": [
   [
    "What priority range do custom NSG rules use?",
    "100 to 4096."
   ],
   [
    "Inbound traffic hits which NSG first when both exist?",
    "The subnet NSG."
   ],
   [
    "Which service tag would you deny to block general internet access outbound?",
    "Internet."
   ]
  ],
  "differentiation": [
   "Support: provide a printed decision flowchart (direction, then NSG order, then lowest-priority match) to use during the role-play.",
   "Extend: have students write a complete NSG rule set for a four-tier app with a management subnet and justify each priority."
  ]
 },
 {
  "t": "Azure Virtual Network Manager security admin rules vs NSGs",
  "objectives": [
   "Students will be able to explain the evaluation order between security admin rules and NSGs.",
   "Students will be able to predict outcomes for the Allow, Deny and Always Allow actions combined with NSG rules.",
   "Students will be able to describe network manager scope, static and dynamic network groups and deployments.",
   "Students will be able to recommend AVNM for centrally enforced guardrails in a multi-subscription scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student ideas on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Draw two stacked layers, admin rules above NSGs, and trace packets through each of the three actions. Explain scope, network groups and deployments."
   ],
   [
    18,
    "Activity",
    "Groups complete the 'Two-Layer Verdict' outcome grid."
   ],
   [
    5,
    "Discuss",
    "Discuss who should own admin rules versus NSGs in an organization."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions."
   ]
  ],
  "warmup": "How would you guarantee that no team in a 40-subscription company can open RDP to the internet, even if they own their NSGs?",
  "activity": {
   "title": "Two-Layer Verdict",
   "materials": "Printed grid with 9 rows (each a combination of admin action and NSG action), printed scenario cards, whiteboard.",
   "steps": [
    "Groups fill in the grid with the final outcome for each combination of admin action (Allow, Deny, Always Allow) and NSG result (allow, deny, no matching custom rule).",
    "Groups then read three scenario cards and decide the admin rules, network group type and deployment regions needed.",
    "Each group writes one scenario solution on the whiteboard.",
    "The teacher checks the grid aloud, highlighting that admin Allow does not guarantee delivery."
   ]
  },
  "discussion": [
   "What risks come with giving a central team Always Allow rights over every network?",
   "Why might an organization still need NSGs once AVNM security admin rules are in place?"
  ],
  "exit": [
   [
    "Which is evaluated first, security admin rules or NSGs?",
    "Security admin rules."
   ],
   [
    "An admin rule Denies TCP 22 and an NSG Allows it. Result?",
    "Denied."
   ],
   [
    "What type of network group adds new VNets automatically?",
    "A dynamic network group based on Azure Policy conditions."
   ]
  ],
  "differentiation": [
   "Support: give students a color-coded card for each action (red for Deny, yellow for Allow, green for Always Allow) with a one-line rule on each to use during the grid.",
   "Extend: ask students to design an AVNM rollout for a company with production, development and sandbox environments, including exceptions and rollback steps."
  ]
 },
 {
  "t": "Private endpoints and Private Link vs service endpoints, private DNS zones",
  "objectives": [
   "Students will be able to compare service endpoints and private endpoints on IP addressing, reach, cost and exfiltration protection.",
   "Students will be able to explain how DNS resolution works for private endpoints, including the privatelink CNAME and private DNS zones.",
   "Students will be able to design DNS resolution for on-premises clients using Azure DNS Private Resolver.",
   "Students will be able to troubleshoot a failing private endpoint from nslookup output."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers."
   ],
   [
    15,
    "Teach",
    "Draw a VNet, an on-premises site and a storage account on the whiteboard. Show the service endpoint path to the public IP, then the private endpoint NIC. Trace the DNS lookup chain step by step."
   ],
   [
    15,
    "Activity",
    "Pairs work through the 'nslookup Detective' troubleshooting sheet."
   ],
   [
    5,
    "Discuss",
    "Discuss when a service endpoint is still the better choice."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions."
   ]
  ],
  "warmup": "If a storage account is reached through a service endpoint, what IP address does the VM connect to?",
  "activity": {
   "title": "nslookup Detective",
   "materials": "Printed sheet with six nslookup outputs and network descriptions (zone linked or not, forwarder present or not), whiteboard.",
   "steps": [
    "Pairs read each nslookup output and decide whether DNS resolution is correct for a private endpoint.",
    "For each failure, pairs identify the missing piece: private DNS zone, A record, VNet link or conditional forwarder.",
    "Pairs then draw on paper the DNS path for an on-premises client using DNS Private Resolver.",
    "Two pairs present their diagrams and the class corrects any missing step."
   ]
  },
  "discussion": [
   "Why does Azure keep clients on the public name instead of asking them to use the privatelink name?",
   "What problems arise if every team creates its own privatelink DNS zones?"
  ],
  "exit": [
   [
    "Name one capability private endpoints have that service endpoints lack.",
    "Reachability from on-premises over VPN or ExpressRoute (or per-resource scope or a private IP)."
   ],
   [
    "What DNS record type points the public name to the privatelink name?",
    "A CNAME."
   ],
   [
    "Which service lets on-premises DNS resolve Azure private DNS zones?",
    "Azure DNS Private Resolver (or a DNS forwarder VM)."
   ]
  ],
  "differentiation": [
   "Support: give students a partially completed DNS flow diagram with blanks for the CNAME, zone and A record.",
   "Extend: ask students to design a hub-and-spoke private DNS strategy for ten services across five spokes and an on-premises data center."
  ]
 },
 {
  "t": "Azure Firewall (Standard vs Premium: TLS inspection, IDPS, URL filtering), Firewall Manager and firewall policy, forced tunneling with user-defined routes",
  "objectives": [
   "Students will be able to differentiate Azure Firewall Standard and Premium features, including TLS inspection, IDPS and URL filtering.",
   "Students will be able to explain the processing order of DNAT, network and application rules.",
   "Students will be able to design firewall policy inheritance managed through Firewall Manager.",
   "Students will be able to configure user-defined routes so spoke traffic passes through the firewall, and distinguish this from forced tunneling."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a hub-and-spoke diagram with a firewall and no route tables; ask whether spoke traffic is inspected."
   ],
   [
    15,
    "Teach",
    "Explain the three rule types and their order, then contrast Standard and Premium. Draw parent and child policies, then add UDRs to the diagram."
   ],
   [
    15,
    "Activity",
    "Groups complete 'Build the Bank's Firewall' design cards."
   ],
   [
    5,
    "Discuss",
    "Discuss privacy and trust implications of TLS inspection."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions."
   ]
  ],
  "warmup": "A firewall is deployed in the hub VNet and spokes are peered to it. Is spoke internet traffic going through the firewall right now? How would you know?",
  "activity": {
   "title": "Build the Bank's Firewall",
   "materials": "Printed requirement cards (for example 'block gambling sites', 'publish an internal web server', 'inspect HTTPS for malware', 'regional teams add rules'), blank route table templates, whiteboard.",
   "steps": [
    "Groups draw each requirement card and decide the SKU, rule type or policy feature that satisfies it.",
    "Groups fill in a route table template for two spoke subnets so all internet and cross-spoke traffic reaches the firewall.",
    "Groups sketch the parent and child policy structure for three regions.",
    "Each group presents one requirement, and the class challenges any choice that relies on Standard for a Premium-only feature."
   ]
  },
  "discussion": [
   "What should an organization tell employees before enabling TLS inspection?",
   "When would you choose forced tunneling instead of letting the firewall reach the internet directly?"
  ],
  "exit": [
   [
    "In what order are Azure Firewall rule types processed?",
    "DNAT, then network, then application."
   ],
   [
    "Which Premium feature needs TLS inspection to see inside HTTPS?",
    "IDPS (and full URL filtering)."
   ],
   [
    "What subnet name does forced tunneling require in addition to AzureFirewallSubnet?",
    "AzureFirewallManagementSubnet."
   ]
  ],
  "differentiation": [
   "Support: provide a Standard versus Premium comparison sheet and a pre-drawn hub-and-spoke diagram for students to annotate.",
   "Extend: challenge students to design inspection for traffic between two spokes and from on-premises, listing every UDR needed."
  ]
 },
 {
  "t": "Web Application Firewall on Application Gateway and Front Door, DDoS Protection",
  "objectives": [
   "Students will be able to choose between WAF on Application Gateway and WAF on Front Door for a given application.",
   "Students will be able to describe managed rule sets, custom rules, exclusions and the Detection-to-Prevention rollout.",
   "Students will be able to compare free DDoS infrastructure protection with DDoS Network Protection and DDoS IP Protection.",
   "Students will be able to match attack types to the WAF layer or the DDoS layer."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the hook scenario aloud and ask students to list the attacks they hear."
   ],
   [
    15,
    "Teach",
    "Draw the request path from attacker through Front Door or Application Gateway to the app. Add WAF policy components, then add DDoS Protection at the network layer and compare tiers."
   ],
   [
    15,
    "Activity",
    "Pairs complete the 'Tune the WAF' log-reading exercise and an attack sort."
   ],
   [
    5,
    "Discuss",
    "Discuss the cost of false positives versus false negatives."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions."
   ]
  ],
  "warmup": "What is the difference between an attack that tricks a web page and an attack that floods it?",
  "activity": {
   "title": "Tune the WAF",
   "materials": "Printed excerpt of ten simplified WAF log entries (rule ID, field matched, client IP, action logged in Detection mode), printed attack cards for sorting, whiteboard.",
   "steps": [
    "Pairs read the log entries and mark each as a likely true attack or a false positive based on the field and the value matched.",
    "For each false positive, pairs write the exclusion they would add, naming the request field.",
    "Pairs sort attack cards (SQL injection, SYN flood, credential stuffing, UDP reflection, cross-site scripting, bad bot scraping) into WAF managed rules, WAF custom rules or DDoS Protection.",
    "The class compiles answers on the whiteboard and the teacher explains each placement."
   ]
  },
  "discussion": [
   "How long should a WAF stay in Detection mode before Prevention, and what evidence would convince you to switch?",
   "Why might a company pay for DDoS Network Protection even though basic protection is free?"
  ],
  "exit": [
   [
    "Which WAF mode logs but never blocks?",
    "Detection mode."
   ],
   [
    "Which WAF placement suits a single-region app in a virtual network?",
    "Application Gateway."
   ],
   [
    "Which layers does Azure DDoS Protection defend?",
    "Layers 3 and 4 (volumetric and protocol attacks)."
   ]
  ],
  "differentiation": [
   "Support: give students a two-column reference card listing layer 7 attacks and layer 3/4 attacks with examples to use during the sort.",
   "Extend: ask students to design a protection architecture for a global app with regional APIs, specifying where each WAF policy and DDoS plan sits."
  ]
 },
 {
  "t": "Site-to-site and point-to-site VPN, Virtual WAN secured hubs, Microsoft Entra Private Access (ZTNA)",
  "objectives": [
   "Students will be able to distinguish site-to-site and point-to-site VPN use cases and authentication options.",
   "Students will be able to explain how a secured virtual hub with routing intent centralizes inspection in Virtual WAN.",
   "Students will be able to compare traditional VPN access with ZTNA through Microsoft Entra Private Access.",
   "Students will be able to recommend a connectivity design for a scenario with branches, remote users and private apps."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record answers."
   ],
   [
    12,
    "Teach",
    "Draw an on-premises site, laptops, Azure VNets and a Virtual WAN hub. Add S2S and P2S tunnels, then the secured hub. Finish by redrawing remote access as ZTNA with per-app arrows."
   ],
   [
    18,
    "Activity",
    "Groups complete 'Connect Copperfield', a whiteboard design exercise."
   ],
   [
    5,
    "Discuss",
    "Discuss what changes for users when moving from VPN to ZTNA."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions."
   ]
  ],
  "warmup": "If an attacker steals a laptop that is connected to a company VPN, what can they reach?",
  "activity": {
   "title": "Connect Copperfield",
   "materials": "Printed scenario sheet (three branches, two Azure regions, remote staff, contractors, a finance app), whiteboard, colored markers, sticky notes.",
   "steps": [
    "Groups read the scenario and list each connectivity requirement on sticky notes.",
    "Groups draw a design on the whiteboard, using one color for S2S, one for P2S, one for Virtual WAN hubs and one for Private Access app segments.",
    "Groups label each P2S authentication method and each Conditional Access policy they would apply.",
    "Groups present for two minutes each while others check whether lateral movement risk was addressed."
   ]
  },
  "discussion": [
   "Should an organization keep a traditional VPN at all once ZTNA is deployed? Why or why not?",
   "What new dependencies does ZTNA introduce, such as connectors and client software?"
  ],
  "exit": [
   [
    "Which subnet name must hold an Azure VPN gateway?",
    "GatewaySubnet."
   ],
   [
    "Which P2S protocol is required for Entra ID authentication?",
    "OpenVPN."
   ],
   [
    "Name the Microsoft service that provides ZTNA to private apps.",
    "Microsoft Entra Private Access."
   ]
  ],
  "differentiation": [
   "Support: give students a matching card set pairing each scenario phrase (whole site, single laptop, central inspection, per-app) with the right service before the design activity.",
   "Extend: ask students to plan a phased migration from a legacy VPN to Entra Private Access using Quick Access first, then per-app segments."
  ]
 },
 {
  "t": "Network Watcher: IP flow verify, effective security rules, VNet flow logs and traffic analytics",
  "objectives": [
   "Students will be able to select the right Network Watcher tool for a given troubleshooting question.",
   "Students will be able to interpret IP flow verify and effective security rules output to find a blocking rule.",
   "Students will be able to compare VNet flow logs and NSG flow logs.",
   "Students will be able to explain how traffic analytics uses Log Analytics to support security investigations."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up and list student guesses on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Present the tools as answers to questions: allowed now, rules in force, routing, end-to-end, historical traffic. Show sample outputs on the projector."
   ],
   [
    18,
    "Activity",
    "Pairs solve 'Find the Culprit' troubleshooting cases."
   ],
   [
    5,
    "Discuss",
    "Discuss what to log by default and the storage cost tradeoff."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions."
   ]
  ],
  "warmup": "A user says, 'I can't connect to the server on port 443.' What are three possible causes in an Azure network?",
  "activity": {
   "title": "Find the Culprit",
   "materials": "Printed case cards with simplified IP flow verify output, effective security rules tables, effective routes and flow log excerpts; whiteboard.",
   "steps": [
    "Pairs receive four case cards, each describing a symptom.",
    "For each case, pairs name the first Network Watcher tool they would use and why, then read the provided output to identify the cause.",
    "Pairs write the fix and the tool that would confirm it.",
    "The class reviews answers, and the teacher highlights cases where routing, not NSGs, was the cause."
   ]
  },
  "discussion": [
   "Why might an organization keep flow logs even when nothing is broken?",
   "How could traffic analytics data help during an incident investigation?"
  ],
  "exit": [
   [
    "Which tool tells you whether a packet would be allowed and names the rule?",
    "IP flow verify."
   ],
   [
    "Where are flow logs written?",
    "To a storage account as JSON."
   ],
   [
    "Which tool shows whether a UDR sends traffic to a firewall?",
    "Next hop (or effective routes)."
   ]
  ],
  "differentiation": [
   "Support: give students a one-page 'question to tool' lookup table to keep beside them during the cases.",
   "Extend: ask students to write a KQL query outline that would find denied flows to port 22 from internet sources in traffic analytics data, describing the filters in plain words."
  ]
 },
 {
  "t": "Security for AI: Defender for AI services threat protection, prompt injection and jailbreak alerts, Azure AI Content Safety Prompt Shields",
  "objectives": [
   "Students will be able to distinguish jailbreaks from indirect prompt injections with examples.",
   "Students will be able to explain where Prompt Shields and content filters sit in an AI application's request path.",
   "Students will be able to describe the alerts and integrations provided by Defender for AI services.",
   "Students will be able to assemble a defense-in-depth plan for a generative AI application."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect responses."
   ],
   [
    12,
    "Teach",
    "Draw the request path: user prompt and retrieved documents, content filter with Prompt Shields, model, response. Add Defender for AI services as the monitoring layer and AI posture management beside it."
   ],
   [
    18,
    "Activity",
    "Groups run the 'Spot the Injection' sort and defense planning exercise."
   ],
   [
    5,
    "Discuss",
    "Discuss privacy tradeoffs of storing prompts as evidence."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions."
   ]
  ],
  "warmup": "If a chatbot reads an email to summarize it, and the email contains the sentence 'ignore your rules', who is giving the bot instructions?",
  "activity": {
   "title": "Spot the Injection",
   "materials": "Printed cards describing 12 benign scenarios of AI app inputs (written descriptions only, no working attack prompts), whiteboard, sticky notes.",
   "steps": [
    "Groups sort scenario cards into three piles: likely jailbreak, likely indirect injection, or benign.",
    "For each suspicious card, groups write on a sticky note which control would prevent it (Prompt Shields on prompts, Prompt Shields on documents, tool permissions) and which would detect it (Defender for AI services).",
    "Groups build a layered defense diagram on the whiteboard for one chosen app, including network isolation and keyless authentication.",
    "The teacher reviews piles and diagrams, correcting any group that assigned prevention to Defender for AI services."
   ]
  },
  "discussion": [
   "Why can't a well-written system prompt alone stop prompt injection?",
   "What should a SOC do first when it receives a jailbreak alert from Defender for AI services?"
  ],
  "exit": [
   [
    "Which kind of injection hides in a retrieved document?",
    "Indirect prompt injection."
   ],
   [
    "Which feature is the prevention layer for jailbreaks in Azure OpenAI and Foundry deployments?",
    "Prompt Shields within the content filter."
   ],
   [
    "Name one alert type from Defender for AI services.",
    "Jailbreak attempt detected (or sensitive data exposure, suspicious IP access, wallet abuse)."
   ]
  ],
  "differentiation": [
   "Support: give students a labeled request-path diagram with blank boxes to fill in with the right control names.",
   "Extend: ask students to write a one-page AI application security standard covering filters, identities, network isolation, logging and alert response."
  ]
 },
 {
  "t": "Microsoft Purview DSPM for AI to find data overexposure to Microsoft 365 Copilot and AI apps",
  "objectives": [
   "Students will be able to explain why Microsoft 365 Copilot increases oversharing risk without bypassing permissions.",
   "Students will be able to identify the Purview components DSPM for AI depends on, including Audit, labels and browser or endpoint onboarding.",
   "Students will be able to interpret a data risk assessment finding and choose an appropriate remediation.",
   "Students will be able to select the correct DSPM for AI one-click policy for a described AI data risk."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the whiteboard. Steer toward the idea that Copilot uses the user's own access."
   ],
   [
    12,
    "Teach",
    "Walk through the DSPM for AI dependency chain on the whiteboard: Audit, labels and sensitive information types, browser and endpoint onboarding, Insider Risk. Then explain data risk assessments, remediation options and the one-click policies, and finish with the EXTRACT right and label inheritance."
   ],
   [
    18,
    "Activity",
    "Run the 'Oversharing triage' card activity in small groups, then have each group present one finding and its remediation."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect remediation choices to user productivity and to rollout order."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes and post them by the door."
   ]
  ],
  "warmup": "If a new assistant could instantly read every file you are allowed to open at work, what is the most embarrassing or risky thing it might find for you, and whose fault would that be?",
  "activity": {
   "title": "Oversharing triage",
   "materials": "Printed finding cards (one per row of a mock data risk assessment: site name, link type, number of users accessing, count of unlabeled sensitive files), a printed remediation menu, whiteboard, markers.",
   "steps": [
    "Prepare eight finding cards, for example an HR site with an organization-wide link and unlabeled payroll files, or a large all-staff news site with no sensitive files.",
    "Give each group of three or four students a set of cards and the remediation menu: remove link, site access restriction, restricted content discovery, apply label, site access review, no action.",
    "Groups rank the cards from most to least urgent before a Copilot rollout and assign one remediation to each, writing a one-line reason.",
    "Hand each group a twist card, such as 'Users report third-party AI pastes are invisible in reports', and ask them to name the missing prerequisite.",
    "Groups present their top finding and remediation while the teacher records choices on the whiteboard and corrects misconceptions."
   ]
  },
  "discussion": [
   "When is restricting a site better than labeling files, and what does each choice cost users in productivity?",
   "Why should the oversharing assessment happen before broad Copilot licensing rather than after?"
  ],
  "exit": [
   [
    "Can Copilot show a user content they cannot open themselves?",
    "No. It works within the user's existing permissions; oversharing is the real risk."
   ],
   [
    "Which Purview feature must be on for DSPM for AI to show AI interaction activity?",
    "Microsoft Purview Audit (the unified audit log)."
   ],
   [
    "Which DSPM for AI feature finds overshared SharePoint sites?",
    "Data risk assessments, with remediations such as removing broad links, restricting access or applying labels."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column cheat sheet pairing each risk ('overshared site', 'paste into chatbot', 'risky user') with the matching DSPM for AI feature before they sort the cards.",
   "Extend: Ask fast finishers to write a one-page rollout plan in the correct order, including which prerequisites they would verify first and how they would measure success after licensing."
  ]
 },
 {
  "t": "AI Gateway in Azure API Management in front of Microsoft Foundry models: managed identity authentication, token limits, logging",
  "objectives": [
   "Students will be able to explain the two authentication hops in an APIM AI gateway and the control used for each.",
   "Students will be able to configure, in outline, managed identity authentication from APIM to a Foundry or Azure OpenAI model.",
   "Students will be able to choose between token limit, token metric and logging features for a stated requirement.",
   "Students will be able to identify privacy risks of prompt logging and appropriate safeguards."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers. Highlight 'shared key' and 'no usage record' as the two problems to solve."
   ],
   [
    12,
    "Teach",
    "Draw client, APIM and model as three boxes. Label hop one (client to APIM: subscription key, validate-azure-ad-token) and hop two (APIM to model: managed identity, RBAC role, authentication-managed-identity). Add token limit, token metric, logging and backend pools as policies on the APIM box."
   ],
   [
    18,
    "Activity",
    "Run the 'Build the gateway policy' pair activity with a projected skeleton policy and requirement cards."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions on counter keys and logging trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students write answers to the three exit questions and hand them in."
   ]
  ],
  "warmup": "Five apps share one secret key to a paid service and the bill triples. What two pieces of information would you want, and why can't you get them today?",
  "activity": {
   "title": "Build the gateway policy",
   "materials": "Projector showing an empty APIM policy skeleton with inbound, backend, outbound and on-error sections; printed policy cards (authentication-managed-identity, validate-azure-ad-token, llm-token-limit, llm-emit-token-metric, semantic cache, backend pool); requirement cards; sticky notes.",
   "steps": [
    "Pairs receive a requirement card, for example 'No app may hold a model key and each department is capped at a fixed token rate'.",
    "Pairs choose the policy cards that meet the requirement and place them in the correct section of a paper copy of the skeleton, inbound or outbound.",
    "Pairs list any non-policy steps needed, such as enabling APIM's managed identity, granting the RBAC role on the model and disabling local auth.",
    "Swap with another pair, who checks for a missing hop or a wrong section and writes feedback on a sticky note.",
    "The teacher reviews two or three solutions on the projector and confirms which section each policy belongs in."
   ]
  },
  "discussion": [
   "What are the pros and cons of using client IP versus subscription ID as the token limit counter key?",
   "How would you balance the value of logging full prompts for investigations against privacy obligations?"
  ],
  "exit": [
   [
    "Which policy lets APIM call the model with its own identity?",
    "authentication-managed-identity, with APIM's managed identity granted a model user role."
   ],
   [
    "What HTTP status does a client get when it exceeds the token limit?",
    "429 Too Many Requests."
   ],
   [
    "Where do token metrics from llm-emit-token-metric go?",
    "Application Insights, with custom dimensions such as client or API."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of the two hops with blanks for the control on each hop, and let students fill it in before the pair activity.",
   "Extend: Ask fast finishers to design a multi-region setup with backend pools and circuit breakers, and explain how token limits should behave when one region fails."
  ]
 },
 {
  "t": "Microsoft Entra Agent ID: agent identities, Conditional Access and access management for AI agents",
  "objectives": [
   "Students will be able to explain why AI agents should have their own directory identities with accountable sponsors.",
   "Students will be able to compare app-only and delegated permissions for agents and apply least privilege.",
   "Students will be able to describe how Conditional Access, ID Protection and ID Governance features protect and govern agents.",
   "Students will be able to evaluate a proposed agent design and identify governance gaps."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up prompt about lending a keycard and collect quick answers."
   ],
   [
    12,
    "Teach",
    "Introduce agent identities, blueprints and sponsors, then draw a two-column comparison of app-only versus delegated permissions. Finish with the Know, Limit, Watch, Stop loop mapped to inventory, Conditional Access, logs and access reviews."
   ],
   [
    18,
    "Activity",
    "Run the 'Agent design review' role-play in groups of three."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore ownership and when agents should act on their own."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "Would you lend your work keycard to a contractor for a month? What could go wrong, and what would you give them instead?",
  "activity": {
   "title": "Agent design review",
   "materials": "Printed agent proposal cards (each describing an agent, its account, permissions and owner), a printed review checklist (own identity, sponsor, least privilege, delegated or app-only, Conditional Access, review schedule), whiteboard.",
   "steps": [
    "In groups of three, assign roles: developer presenting the proposal, identity reviewer and security reviewer.",
    "The developer reads a proposal card aloud, for example an agent running under a developer's account with tenant-wide mail access.",
    "The reviewers use the checklist to identify every gap and propose a corrected design.",
    "Groups rotate roles and repeat with a second card.",
    "Each group writes its best corrected design on the whiteboard, and the class compares them against the core pattern."
   ]
  },
  "discussion": [
   "Who should be an agent's sponsor: the developer who built it, or the business owner who relies on it? Why?",
   "When is it acceptable for an agent to use app-only permissions rather than act on behalf of a user?"
  ],
  "exit": [
   [
    "Name two problems with running an agent under a human's account.",
    "It gets all of the human's rights, its actions are indistinguishable in logs, and blocking it blocks the human."
   ],
   [
    "What limits an agent using delegated permissions?",
    "The delegated permissions granted to it and the signed-in user's own access."
   ],
   [
    "Which feature removes an agent's access when no one confirms it is still needed?",
    "An access review from Entra ID Governance, ideally with the sponsor as reviewer."
   ]
  ],
  "differentiation": [
   "Support: Give students a completed example review of one proposal card so they can see what a finished checklist looks like before attempting their own.",
   "Extend: Ask fast finishers to write a Conditional Access and access review plan for a fleet of fifty agent instances created from one blueprint, explaining what they would configure once versus per instance."
  ]
 },
 {
  "t": "VM disk protection: encryption at host, Azure Disk Encryption, server-side encryption with customer-managed keys",
  "objectives": [
   "Students will be able to compare SSE, encryption at host, Azure Disk Encryption and confidential disk encryption by location, key control and coverage.",
   "Students will be able to describe how a disk encryption set enables customer-managed keys for managed disks.",
   "Students will be able to recommend a disk encryption design for a stated compliance requirement.",
   "Students will be able to explain why Azure Disk Encryption is considered legacy."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch the student answers on a simple diagram of host server and storage."
   ],
   [
    13,
    "Teach",
    "Build a comparison grid on the whiteboard with rows SSE, SSE with CMK, encryption at host, ADE and confidential disk encryption, and columns 'where', 'who holds keys', 'covers temp disk and cache', 'agent in guest'. Explain the disk encryption set and its managed identity."
   ],
   [
    17,
    "Activity",
    "Run the 'Encryption matchmaker' requirement card activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions about key revocation and migration from ADE."
   ],
   [
    5,
    "Exit ticket",
    "Collect written answers to the three exit questions."
   ]
  ],
  "warmup": "If Azure already encrypts every disk by default, why would a bank still fail an audit question about disk encryption?",
  "activity": {
   "title": "Encryption matchmaker",
   "materials": "Printed requirement cards, a blank copy of the comparison grid per pair, sticky notes, whiteboard.",
   "steps": [
    "Give each pair six requirement cards, such as 'Must be able to revoke keys immediately', 'Temp disk must be encrypted', 'No agents allowed in the guest', 'Existing VM shows BitLocker on in Windows'.",
    "Pairs first complete the blank comparison grid from memory, then check it against the board.",
    "For each card, pairs choose the minimum set of options that meets it and write it on a sticky note.",
    "Pairs combine all six cards into a single recommended design for a regulated workload and list any prerequisites, such as feature registration and purge protection.",
    "Two pairs present; the class votes on whether each design meets every card."
   ]
  },
  "discussion": [
   "What are the operational risks of customer-managed keys, and how do soft delete and purge protection reduce them?",
   "How would you plan a migration of existing ADE-protected VMs to encryption at host?"
  ],
  "exit": [
   [
    "Which option covers temporary disks and caches?",
    "Encryption at host."
   ],
   [
    "What does a disk encryption set link together?",
    "Managed disks and a customer-managed key in Key Vault or Managed HSM, through a managed identity."
   ],
   [
    "Name one reason ADE is legacy.",
    "It runs inside the guest using VM CPU, has OS and feature limits, and Microsoft has announced its retirement."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed comparison grid with the 'where' column filled in so students can focus on keys and coverage.",
   "Extend: Ask fast finishers to write the Azure Policy logic they would want, in plain words, to deny VMs without encryption at host while allowing approved exceptions."
  ]
 },
 {
  "t": "Trusted launch: secure boot, vTPM and boot integrity monitoring",
  "objectives": [
   "Students will be able to explain how bootkits and rootkits evade traditional antivirus.",
   "Students will be able to describe the roles of Secure Boot, vTPM and boot integrity monitoring in trusted launch.",
   "Students will be able to list the prerequisites for trusted launch and for boot integrity monitoring.",
   "Students will be able to distinguish trusted launch from confidential VMs in a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers about what runs first when a computer starts."
   ],
   [
    12,
    "Teach",
    "Draw the boot chain (firmware, boot loader, kernel, drivers, OS) left to right. Add Secure Boot as a gate at each step, the vTPM as a logbook underneath, and attestation as an arrow to Azure Attestation and Defender for Cloud. Close with a two-column trusted launch versus confidential VM contrast."
   ],
   [
    18,
    "Activity",
    "Run the 'Boot chain detective' card sequencing activity in small groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about compatibility and threat models."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If malware loads before your antivirus does, how could the antivirus ever find it? Write one idea.",
  "activity": {
   "title": "Boot chain detective",
   "materials": "Printed cards for boot stages (firmware, boot loader, kernel, drivers, OS), cards for controls (Secure Boot, vTPM measurement, Guest Attestation, Defender for Cloud alert), incident cards, whiteboard.",
   "steps": [
    "Groups arrange the boot stage cards in order and place each control card where it acts.",
    "The teacher reads an incident card, for example 'A signed but unexpected driver loaded after an update'.",
    "Groups decide which control would block it, which would record it, and which would raise an alert, and explain why Secure Boot alone may not catch it.",
    "Repeat with two more incidents, including one about memory being read by a host operator, where groups must say trusted launch is not the answer.",
    "Each group shares one conclusion, and the teacher records the control-to-incident mapping on the board."
   ]
  },
  "discussion": [
   "What problems might Secure Boot cause for teams that build custom Linux kernels, and how should they handle them?",
   "For which workloads is trusted launch enough, and when would you insist on confidential VMs?"
  ],
  "exit": [
   [
    "Which component blocks unsigned boot components?",
    "Secure Boot."
   ],
   [
    "What two prerequisites does boot integrity monitoring need?",
    "The Guest Attestation extension and a system-assigned managed identity on the VM."
   ],
   [
    "Which option encrypts VM memory in use?",
    "Confidential VMs, not trusted launch."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-sentence role card for each component (gate, logbook, auditor) to hold while sequencing the boot chain.",
   "Extend: Ask fast finishers to explain why measured boot can catch a change that Secure Boot allowed, and to describe how they would respond to a failed attestation alert."
  ]
 },
 {
  "t": "Azure Bastion and just-in-time VM access instead of public RDP/SSH",
  "objectives": [
   "Students will be able to explain the risks of exposing RDP and SSH to the internet.",
   "Students will be able to describe how Azure Bastion provides access without public IPs, including its subnet and SKU requirements.",
   "Students will be able to explain how JIT VM access modifies NSG rules and which plan it requires.",
   "Students will be able to choose Bastion, JIT or both for a given scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up prompt and collect guesses. Reveal that automated scanners find open ports within minutes."
   ],
   [
    13,
    "Teach",
    "Draw admin, internet, Bastion in AzureBastionSubnet, and VMs with private IPs. Trace the 443 connection and the private RDP hop. Then draw an NSG table and show JIT adding and removing a higher-priority allow rule. Summarize SKU differences."
   ],
   [
    17,
    "Activity",
    "Run the 'NSG rule walk-through' exercise in pairs using a printed NSG table."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions on combining Bastion and JIT."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "How long do you think it takes for an internet scanner to find a newly opened RDP port on a cloud VM: minutes, days or weeks? Why does it matter?",
  "activity": {
   "title": "NSG rule walk-through",
   "materials": "Printed NSG rule tables (priority, name, port, source, action), printed JIT request cards (user, port, source IP, duration), scenario cards, pencils, whiteboard.",
   "steps": [
    "Pairs start with an NSG table that has an 'Allow 3389 from Any' rule and identify why Defender for Cloud flags it.",
    "Pairs rewrite the table as JIT would configure it, adding a deny rule for 3389.",
    "The teacher hands out a JIT request card; pairs add the temporary allow rule with the correct priority and source IP, then cross it out when the duration ends.",
    "Pairs read a scenario card (for example 'no public IPs allowed' or 'appliance must keep public IP') and decide whether Bastion, JIT or both fit, noting the SKU or plan required.",
    "Pairs compare answers with a neighboring pair and the teacher reviews the trickiest scenario on the board."
   ]
  },
  "discussion": [
   "If you already have Azure Bastion, is there still value in JIT? When?",
   "What are the trade-offs between using the browser session in Bastion and the native client, from both a usability and a security point of view?"
  ],
  "exit": [
   [
    "What subnet name does Azure Bastion require?",
    "AzureBastionSubnet."
   ],
   [
    "What does JIT add to an NSG when a request is approved?",
    "A temporary, higher-priority allow rule for the requested port and source IP, removed when the time expires."
   ],
   [
    "Which plan includes JIT?",
    "Microsoft Defender for Servers Plan 2."
   ]
  ],
  "differentiation": [
   "Support: Provide an annotated example NSG table showing a completed JIT request so students can copy the pattern before trying their own.",
   "Extend: Ask fast finishers to design remote access for a hub-and-spoke network with Bastion, Entra ID login for VMs and Conditional Access, listing every role assignment needed."
  ]
 },
 {
  "t": "Defender for Servers (Plan 1 vs Plan 2), vulnerability assessment, Azure Arc for hybrid and multicloud servers, Azure Update Manager",
  "objectives": [
   "Students will be able to compare the features of Defender for Servers Plan 1 and Plan 2.",
   "Students will be able to explain how Azure Arc brings on-premises and multicloud servers under Azure management and Defender for Cloud.",
   "Students will be able to describe how vulnerability assessment and Azure Update Manager work together to reduce risk.",
   "Students will be able to recommend the correct plan and onboarding steps for a hybrid scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and tally answers about how many tools a hybrid estate needs."
   ],
   [
    12,
    "Teach",
    "Draw a two-column Plan 1 versus Plan 2 table. Then draw Azure, on-premises and another cloud as three boxes, with Arc connecting the outer two to Azure. Add Defender Vulnerability Management findings and Update Manager schedules as the remediation loop."
   ],
   [
    18,
    "Activity",
    "Run the 'Plan 1 or Plan 2' card sort followed by a hybrid design challenge."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions on cost and coverage trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "Your company has servers in Azure, in its own data center and in another cloud. Do you think one security tool can cover all three? What would it need?",
  "activity": {
   "title": "Plan 1 or Plan 2, then onboard",
   "materials": "Printed feature cards (MDE integration, EDR, core vulnerability management, agentless scanning, JIT, FIM, OS configuration assessment, premium vulnerability management, data ingestion benefit), two labeled areas on the whiteboard, scenario sheets.",
   "steps": [
    "Groups sort feature cards into Plan 1 (included in both) and Plan 2 only, placing them on the whiteboard.",
    "The teacher reveals the correct sort and groups note any cards they misplaced.",
    "Groups receive a scenario sheet describing a hybrid estate with specific requirements, such as FIM on payment servers and monthly patching.",
    "Groups write the onboarding and configuration steps in order: Arc onboarding, plan selection, FIM, Update Manager schedules, policy assignments.",
    "Groups swap sheets and check each other's order and plan choice."
   ]
  },
  "discussion": [
   "Would you enable Plan 2 everywhere or only on certain servers? What factors would drive that decision?",
   "Why might patching through Update Manager still leave vulnerability findings open in Defender for Cloud?"
  ],
  "exit": [
   [
    "Name two features available only in Plan 2.",
    "Any two of JIT, file integrity monitoring, agentless scanning, premium Defender Vulnerability Management, OS configuration assessment."
   ],
   [
    "What must you install to bring an on-premises server into Defender for Servers?",
    "The Azure Connected Machine agent, making it an Azure Arc-enabled server."
   ],
   [
    "Which service schedules patches for Azure VMs and Arc servers?",
    "Azure Update Manager."
   ]
  ],
  "differentiation": [
   "Support: Give students a pre-filled Plan 1 column so they only need to decide which remaining cards are Plan 2.",
   "Extend: Ask fast finishers to describe how they would cover AWS EC2 instances using Defender for Cloud multicloud connectors and Arc auto-provisioning, and what they would verify afterward."
  ]
 },
 {
  "t": "AKS security: Entra ID integration, Azure RBAC for Kubernetes, private clusters, network policies, Defender for Containers, Azure Policy for AKS",
  "objectives": [
   "Students will be able to explain how Entra integration, disabled local accounts and Azure RBAC control access to the Kubernetes API.",
   "Students will be able to compare private clusters with authorized IP ranges for API server exposure.",
   "Students will be able to describe how network policies segment pod traffic and what they require.",
   "Students will be able to distinguish the roles of Defender for Containers and Azure Policy for AKS."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up scenario and have students list risks they notice."
   ],
   [
    13,
    "Teach",
    "Draw four layers on the whiteboard: identity, API exposure, pod network, detection and enforcement. Fill each with the AKS feature, highlighting disabled local accounts, private clusters, the network policy engine requirement and detect-versus-prevent."
   ],
   [
    17,
    "Activity",
    "Run the 'Harden the cluster' findings-to-fixes exercise in groups."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions on Azure RBAC versus Kubernetes RBAC and Audit versus Deny."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A copied admin password for a system keeps working even after the person who copied it leaves. What would you change so that leaving the company actually removes their access?",
  "activity": {
   "title": "Harden the cluster",
   "materials": "Printed cluster audit report with eight findings (public API server, local accounts enabled, no network policy engine, privileged pods running, images from unknown registries, kubeconfig shared, no threat detection, pods using stored secrets), feature cards, whiteboard.",
   "steps": [
    "Groups read the audit report and match each finding to one feature card that fixes it.",
    "Groups mark which fixes can be applied to the existing cluster and which may require rebuilding or careful planning, such as choosing a network policy engine.",
    "Groups order the fixes by priority and justify the top three.",
    "Each group writes one network policy rule in plain English, for example which namespace may reach the database pods and on which port.",
    "Groups present their top three fixes and the class discusses differences."
   ]
  },
  "discussion": [
   "When would you choose Azure RBAC for Kubernetes over Kubernetes RBAC, and could you use both?",
   "Why is it wise to run Azure Policy for AKS in Audit mode before Deny?"
  ],
  "exit": [
   [
    "What setting makes a leaked admin kubeconfig useless once Entra integration is enabled?",
    "Disabling local accounts."
   ],
   [
    "What must a cluster have for network policies to take effect?",
    "A network policy engine such as Azure Network Policy Manager, Calico or Cilium."
   ],
   [
    "Which service detects crypto-mining in a cluster, and which prevents privileged pods?",
    "Defender for Containers detects; Azure Policy for AKS prevents."
   ]
  ],
  "differentiation": [
   "Support: Provide a feature-to-layer reference table so students can focus on matching findings rather than recalling every feature name.",
   "Extend: Ask fast finishers to design network policies for a three-tier app across three namespaces and explain how Workload ID replaces stored secrets for each tier."
  ]
 },
 {
  "t": "Container registry security: disable the admin user, RBAC pull/push roles, private endpoints, image vulnerability scanning",
  "objectives": [
   "Students will be able to explain why the ACR admin user should remain disabled.",
   "Students will be able to assign least-privilege ACR roles to clusters, pipelines and administrators.",
   "Students will be able to describe network isolation options for ACR and the SKU they require.",
   "Students will be able to identify which service provides image vulnerability scanning and how findings are prioritized."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up prompt and discuss what 'pushed by: registry name' tells an investigator."
   ],
   [
    12,
    "Teach",
    "Draw the registry with arrows to developers, the pipeline and AKS. Label each arrow with the right role. Add a Premium private endpoint and DNS zone, then Defender for Containers scanning on push, pull and schedule."
   ],
   [
    18,
    "Activity",
    "Run the 'Who gets which key' role assignment exercise followed by a registry audit."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about supply chain trust."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If a log says an action was done by 'admin', and five people and three systems know the admin password, what can you conclude about who did it?",
  "activity": {
   "title": "Who gets which key",
   "materials": "Printed identity cards (AKS kubelet identity, CI/CD pipeline, developer, cleanup automation, IoT device fleet), printed role cards (AcrPull, AcrPush, AcrDelete, repository-scoped role, scope map token), a printed registry configuration sheet with deliberate weaknesses, whiteboard.",
   "steps": [
    "Pairs match each identity card with the least-privilege role or credential card and write a one-line justification.",
    "The teacher reveals the answers and discusses the IoT case, where a scope map token may be needed.",
    "Pairs receive the registry configuration sheet (admin user enabled, Standard SKU, public access open, no scanning) and list every change needed, in priority order.",
    "Pairs identify which changes need a SKU upgrade and which service provides scanning.",
    "Two pairs present their prioritized list and the class agrees on a final order."
   ]
  },
  "discussion": [
   "Why is pushing a malicious image to a trusted registry so effective for an attacker, and which controls make it harder?",
   "What would image signing add beyond role-based access control?"
  ],
  "exit": [
   [
    "Which role should a cluster's kubelet identity have?",
    "AcrPull."
   ],
   [
    "Which SKU is required for private endpoints?",
    "Premium."
   ],
   [
    "Which service scans registry images for CVEs?",
    "Microsoft Defender for Containers."
   ]
  ],
  "differentiation": [
   "Support: Provide a role summary card listing what each ACR role allows so students can focus on matching rather than recall.",
   "Extend: Ask fast finishers to design a supply-chain flow from commit to deployment that includes signing, verification, approved-registry policy and base image rebuilds with ACR Tasks."
  ]
 },
 {
  "t": "App Service, Functions and Logic Apps: managed identities, Key Vault references, access restrictions, HTTPS only and minimum TLS, authentication (Easy Auth)",
  "objectives": [
   "Students will be able to explain how managed identities and Key Vault references remove secrets from app configuration.",
   "Students will be able to distinguish inbound controls (access restrictions, private endpoints) from outbound VNet integration.",
   "Students will be able to select transport security settings, including HTTPS Only, minimum TLS and disabled FTP and basic auth.",
   "Students will be able to describe when Easy Auth is the right way to add authentication."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student ideas on the board."
   ],
   [
    12,
    "Teach",
    "Draw an app in the center with inbound arrows (Front Door, access restrictions, private endpoint, Easy Auth) and outbound arrows (VNet integration, managed identity to Key Vault, SQL and Storage). Show the Key Vault reference syntax on the projector and explain the two common failure causes."
   ],
   [
    18,
    "Activity",
    "Run the 'Pen test remediation' exercise in small groups using the printed findings."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions on trade-offs of private endpoints and Easy Auth."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "If you could fix a web app's security problems only by changing settings, not code, which problems do you think you could solve?",
  "activity": {
   "title": "Pen test remediation",
   "materials": "Printed mock penetration test findings (plain HTTP accepted, TLS 1.0 allowed, connection string in app settings, app reachable bypassing Front Door, FTP enabled with basic auth, no authentication on an internal tool, vault behind a private endpoint unreachable), printed settings cards, projector.",
   "steps": [
    "Groups match each finding to the setting or feature that fixes it, writing the exact setting name on a sticky note.",
    "For the connection string finding, groups write the Key Vault reference format and list the permission and network prerequisites.",
    "For the Front Door finding, groups explain why the service tag alone is not enough.",
    "Groups mark the direction of each control (inbound or outbound) on a copy of the whiteboard diagram.",
    "The teacher reviews answers on the projector and highlights any direction mix-ups."
   ]
  },
  "discussion": [
   "What are the trade-offs between access restrictions and a private endpoint for protecting an internal app?",
   "When might built-in Easy Auth be insufficient, so that the application should handle authentication itself?"
  ],
  "exit": [
   [
    "What two things does a Key Vault reference need to resolve successfully?",
    "A managed identity with secret read permission and network reachability to the vault."
   ],
   [
    "Is VNet integration inbound or outbound?",
    "Outbound."
   ],
   [
    "Which feature adds Entra sign-in to an app without code changes?",
    "Built-in authentication (Easy Auth)."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column inbound versus outbound reference card listing each feature, so students can focus on applying them to findings.",
   "Extend: Ask fast finishers to design a fully private App Service deployment behind Front Door Premium, including private endpoints, DNS, VNet integration and Key Vault references."
  ]
 },
 {
  "t": "Defender for Cloud: foundational CSPM vs Defender CSPM, secure score and recommendations",
  "objectives": [
   "Students will be able to compare foundational CSPM with Defender CSPM and identify which features require the paid plan.",
   "Students will be able to explain how recommendations, security controls and secure score relate.",
   "Students will be able to calculate the effect of partial remediation and exemptions on a control's score.",
   "Students will be able to recommend whether an organization needs Defender CSPM based on its requirements."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about a single security number and collect opinions."
   ],
   [
    12,
    "Teach",
    "Draw a two-column free versus paid table. Then show a security control with ten resources and work through the points for zero, five, nine and ten healthy resources, and for an exemption. Mention continuous export and management group scope."
   ],
   [
    18,
    "Activity",
    "Run the 'Score the controls' calculation and feature-sort exercise in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about score limitations and exemptions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Can one number really tell a board how secure a company's cloud is? What would that number hide?",
  "activity": {
   "title": "Score the controls",
   "materials": "Printed mock secure score sheet with four security controls (maximum points, number of resources, number healthy), printed feature cards for the free versus paid sort, calculators or student laptops, whiteboard.",
   "steps": [
    "Pairs calculate the current points for each control using proportional credit, then the total score percentage.",
    "Pairs decide which single control to fix first for the largest score increase and justify it.",
    "The teacher announces that two unhealthy resources are exempted as mitigated; pairs recalculate.",
    "Pairs sort feature cards (recommendations, secure score, inventory, attack path analysis, cloud security explorer, governance rules, agentless scanning, MCSB compliance) into free and Defender CSPM.",
    "Pairs compare totals and sorts with another pair and resolve differences with the teacher."
   ]
  },
  "discussion": [
   "How could an organization misuse exemptions to inflate its secure score, and how would you prevent that?",
   "Is secure score a good metric to share with a board? What would you present alongside it?"
  ],
  "exit": [
   [
    "Name two features that require Defender CSPM.",
    "Any two of attack path analysis, cloud security explorer, agentless scanning, governance rules, data-aware posture."
   ],
   [
    "A control is worth 10 points and 8 of 10 resources are healthy. How many points does it earn?",
    "8 points, because credit is proportional and full points need all resources healthy."
   ],
   [
    "What benchmark does foundational CSPM assess against by default?",
    "The Microsoft cloud security benchmark (MCSB)."
   ]
  ],
  "differentiation": [
   "Support: Provide a worked example of one control's calculation, step by step, before students try the rest.",
   "Extend: Ask fast finishers to draft an Azure Resource Graph or continuous export plan for a monthly board report, describing what data they would trend and why."
  ]
 },
 {
  "t": "Defender CSPM features: attack path analysis, cloud security explorer, agentless scanning, governance rules",
  "objectives": [
   "Students will be able to explain how the cloud security graph enables context-aware prioritization.",
   "Students will be able to interpret an attack path and identify the most efficient link to break.",
   "Students will be able to choose between attack path analysis, cloud security explorer, agentless scanning and governance rules for a stated need.",
   "Students will be able to describe how governance rules assign ownership and track remediation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up puzzle about small problems that combine into a big one."
   ],
   [
    12,
    "Teach",
    "Draw a simple graph on the whiteboard: internet, VM with CVE, managed identity, storage account with sensitive data. Trace the attack path, mark the choke point, then show how explorer queries the same graph, how agentless scanning feeds it, and how governance rules assign the fix."
   ],
   [
    18,
    "Activity",
    "Run the 'Break the path' sticky-note graph activity in groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions on prioritization and accountability."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A door with a weak lock, a window left open, and a ladder in the yard: which is the most serious problem? Does your answer change if they are all on the same side of the house?",
  "activity": {
   "title": "Break the path",
   "materials": "Sticky notes in two colors, markers, a large whiteboard area per group, printed resource cards (public IP, VM with critical CVE, managed identity with role, storage account with customer data, key vault, AKS cluster, container image with CVE), printed question cards.",
   "steps": [
    "Each group builds a mini security graph on the whiteboard using resource cards and draws relationship arrows such as 'exposed to', 'has identity', 'has role on'.",
    "Groups identify every attack path from the internet to a sensitive resource and mark any choke point with a second sticky note color.",
    "Groups choose the single fix that breaks the most paths and explain it.",
    "The teacher hands out question cards (for example 'Which images with critical CVEs are running?' or 'Who owns the fix and by when?'), and groups name the Defender CSPM feature that answers each.",
    "Groups write a governance rule in plain words for their chosen fix, including owner source, severity condition, due date and whether to use a grace period, then present."
   ]
  },
  "discussion": [
   "Should teams always fix choke points before high-severity findings that are not on any attack path? Why or why not?",
   "What could go wrong if a governance rule assigns owners from a tag that many resources do not have?"
  ],
  "exit": [
   [
    "Which feature answers your own custom question across the security graph?",
    "Cloud security explorer."
   ],
   [
    "How do you eliminate an attack path most efficiently?",
    "Break one link in the chain, ideally at a choke point that many paths share."
   ],
   [
    "What does agentless scanning do with the disk snapshot after analysis?",
    "It deletes the snapshot after analyzing it out of band."
   ]
  ],
  "differentiation": [
   "Support: Provide a pre-drawn graph with one path already traced so students can practice finding a second path and the choke point.",
   "Extend: Ask fast finishers to design three cloud security explorer queries for their organization's top risks and explain how data-aware posture would change path risk levels."
  ]
 },
 {
  "t": "Regulatory compliance dashboard: Microsoft cloud security benchmark and adding standards",
  "objectives": [
   "Students will be able to explain the role of the Microsoft cloud security benchmark as the default standard that drives recommendations and secure score.",
   "Students will be able to determine whether a compliance control shows as passing, failing or manual from the state of its linked assessments.",
   "Students will be able to describe how to add a regulatory or custom standard to a scope and how it is implemented through Azure Policy.",
   "Students will be able to justify why a green compliance dashboard is not the same as certification."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up question and take three or four answers. Write the words 'technical check' and 'human evidence' on the whiteboard and sort the answers under them."
   ],
   [
    15,
    "Teach",
    "Walk through MCSB as the default standard, the pass, fail and manual logic, attestation and reports, adding standards in Environment settings with Defender CSPM, the Azure Policy initiative behind each standard, scope choice, and continuous export with workbooks. Pause after the status logic and ask students to restate it in one sentence."
   ],
   [
    15,
    "Activity",
    "Run the control status card sort described below in groups of three or four. Circulate and ask each group to defend one tricky card."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the activity to real audits and the shared responsibility model."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand it in at the door."
   ]
  ],
  "warmup": "An auditor asks you to prove your cloud environment follows a card-payment security rule book. Name two things a tool could check automatically and two things only a person could prove.",
  "activity": {
   "title": "Control status card sort",
   "materials": "Printed cards the teacher prepares (each card shows a control name and the health of its linked assessments, for example 'Encrypt data in transit: 2 healthy, 1 unhealthy' or 'Security awareness training: no automated assessments'), whiteboard divided into Pass, Fail and Manual columns, sticky notes.",
   "steps": [
    "Give each group a set of twelve control cards, including some with all healthy assessments, some with one unhealthy assessment and some with none.",
    "Groups place each card in the Pass, Fail or Manual column and write on a sticky note the action they would take next (fix a resource, attest with evidence, or nothing).",
    "Hand each group a scenario card: 'Your company must track PCI DSS for two card-processing subscriptions only.' Groups write the steps to add the standard and the scope they would choose.",
    "Each group reports one card they debated and their scope decision; the teacher confirms the Azure Policy initiative and Defender CSPM requirement."
   ]
  },
  "discussion": [
   "If every automated control is green, what would you still need to show an auditor, and who is responsible for producing it?",
   "When would you assign a standard at a management group, and when only to specific subscriptions?"
  ],
  "exit": [
   [
    "Which standard is applied by default and drives secure score?",
    "The Microsoft cloud security benchmark."
   ],
   [
    "A control has four linked assessments and one is unhealthy. What is its status?",
    "Failing, because any unhealthy assessment fails the control."
   ],
   [
    "How does Defender for Cloud implement an added regulatory standard on an Azure subscription, and which plan is generally required?",
    "As an Azure Policy initiative assignment; adding regulatory standards generally requires Defender CSPM."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-line rule card ('all healthy equals pass, any unhealthy equals fail, none equals manual') and let them sort only six cards first before the full set.",
   "Extend: Ask fast finishers to design a custom standard for an internal policy, listing five recommendations it would include and explaining how they would show the compliance trend over six months using continuous export and a workbook."
  ]
 },
 {
  "t": "Workload protection plans (Servers, Storage, SQL, Containers, Key Vault, App Service, AI) and alert handling",
  "objectives": [
   "Students will be able to match common threats to the Defender for Cloud workload protection plan that detects them.",
   "Students will be able to explain why plans should be enabled at the subscription level.",
   "Students will be able to apply an alert-handling routine of triage, investigation, containment and status update to a sample alert.",
   "Students will be able to choose between suppression rules, workflow automation, email notifications and sample alerts for a given need."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the whiteboard under 'before an attack' and 'during an attack'."
   ],
   [
    15,
    "Teach",
    "Present each Defender plan with one signature threat, then the anatomy of an alert (severity, evidence, MITRE tactics, Take action tab), the five-step handling routine, and tuning with suppression, automation, notifications, continuous export and sample alerts."
   ],
   [
    15,
    "Activity",
    "Run the alert triage relay below in pairs. Time each round at about four minutes."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to surface trade-offs between noise reduction and missed detections."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Your house has a home inspection report and a burglar alarm. Which one helps you before a break-in and which one helps during it? How might that map to cloud security?",
  "activity": {
   "title": "Alert triage relay",
   "materials": "Printed alert cards the teacher prepares (each with an alert name, severity, affected resource, short evidence such as an IP address or command line, and asset importance), a printed plan list, whiteboard, sticky notes.",
   "steps": [
    "Pairs draw an alert card and write on a sticky note which Defender plan raised it.",
    "For the same card, pairs write the order they would act in: triage reason, one investigation step, one containment action and the final status.",
    "The teacher reveals that two of the cards came from a scheduled penetration test; pairs design a suppression rule with conditions and an expiry.",
    "Pairs swap cards with a neighboring pair, check each other's answers, and the class reviews any disagreements on the whiteboard."
   ]
  },
  "discussion": [
   "What could go wrong if a suppression rule is too broad or has no expiration date?",
   "Why might a Medium alert on a critical server deserve attention before a High alert on a test machine?"
  ],
  "exit": [
   [
    "Which plan detects possible SQL injection against Azure SQL?",
    "Defender for Databases."
   ],
   [
    "Why enable Defender plans at the subscription level?",
    "It covers existing and future resources of that type in the subscription."
   ],
   [
    "How do you safely verify that your alert email notifications and Logic App work?",
    "Generate sample alerts from the Security alerts page."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column reference card pairing each plan with one example threat, and let struggling students use it during the relay.",
   "Extend: Ask fast finishers to sketch an end-to-end pipeline in which a High alert triggers workflow automation, is exported to Sentinel, and is closed with a classification, naming each component."
  ]
 },
 {
  "t": "Multicloud connectors for AWS and GCP, and workflow automation with Logic Apps",
  "objectives": [
   "Students will be able to describe how Defender for Cloud onboards AWS and GCP using generated templates or scripts and federated trust instead of long-lived keys.",
   "Students will be able to explain why Azure Arc is required for full Defender for Servers coverage of EC2 and Compute Engine instances.",
   "Students will be able to configure, on paper, a workflow automation with the correct trigger type, filter and Logic App.",
   "Students will be able to identify the permissions needed by both the configuring user and the Logic App."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers about why sharing permanent keys is risky."
   ],
   [
    15,
    "Teach",
    "Diagram on the whiteboard the AWS path (account or organization, plans, CloudFormation, IAM roles, OIDC) and the GCP path (project or organization, Cloud Shell or Terraform, workload identity federation). Add Azure Arc for servers. Then draw workflow automation: trigger type, filters, Logic App, managed identity, and the permissions box."
   ],
   [
    15,
    "Activity",
    "Run the whiteboard design challenge below in groups of three."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare workflow automation with Sentinel playbooks."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A contractor needs to inspect your office once a week. Would you give them a copy of your master key or a badge that only opens certain rooms and can be revoked? Why?",
  "activity": {
   "title": "Three-cloud design challenge",
   "materials": "Whiteboard or large paper per group, markers, printed scenario cards the teacher prepares (company with Azure, AWS and GCP footprints, plus requirements such as 'no stored keys' and 'High alerts to chat and ticket').",
   "steps": [
    "Each group reads its scenario card and draws the onboarding path for AWS and GCP, labeling what Defender for Cloud generates and what identity mechanism avoids keys.",
    "Groups add the servers in each cloud and mark what must be installed for full Defender for Servers coverage and how it gets there.",
    "Groups design one workflow automation: trigger type, filter conditions, the Logic App's actions and which identity and roles it uses, plus the role the configuring person needs.",
    "Groups rotate to another group's board and leave one sticky note with a question or correction; the teacher reviews common corrections with the class."
   ]
  },
  "discussion": [
   "Why is federated trust safer than storing access keys, and what would you check if a connector stopped reporting findings?",
   "When would you use Defender for Cloud workflow automation, and when would a Sentinel playbook be the better choice?"
  ],
  "exit": [
   [
    "What does Defender for Cloud provide to set up access to an AWS account?",
    "A CloudFormation template that creates IAM roles with an OIDC trust."
   ],
   [
    "What agent enables full Defender for Servers protection on GCP Compute Engine VMs?",
    "The Azure Arc agent, typically auto-provisioned by the connector."
   ],
   [
    "Name the three trigger types for workflow automation.",
    "Security alerts, recommendations and regulatory compliance assessments."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially completed diagram with blanks for 'CloudFormation template', 'IAM role', 'OIDC', 'Azure Arc' and 'Logic App', and a word bank to fill them in.",
   "Extend: Ask fast finishers to explain how they would roll out the same workflow automation to 30 subscriptions using Azure Policy and how they would prove it is deployed everywhere."
  ]
 },
 {
  "t": "Microsoft Sentinel workspace design, data connectors, Azure Monitor Agent with data collection rules, Syslog and CEF, Windows security events",
  "objectives": [
   "Students will be able to justify a Sentinel workspace design and identify valid reasons for more than one workspace.",
   "Students will be able to explain how the Azure Monitor Agent and data collection rules select, transform and route data.",
   "Students will be able to design collection for appliances that send Syslog or CEF using a Linux log forwarder.",
   "Students will be able to name the destination tables for Windows security events, Syslog and CEF."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record answers. Steer toward the idea that clues are easier to connect when they are stored together."
   ],
   [
    15,
    "Teach",
    "Cover SIEM and SOAR on a Log Analytics workspace, the one-workspace principle and valid exceptions, Sentinel roles, Content hub connectors, AMA replacing the legacy agent, DCR parts, Windows event sets and SecurityEvent, Syslog and CEF tables, the forwarder pattern and the duplicate-collection trap."
   ],
   [
    15,
    "Activity",
    "Run the data flow mapping activity below in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions on workspace splits and cost control."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a half sheet."
   ]
  ],
  "warmup": "A detective has clues stored in five different buildings across town. What problems does that create, and when might it still be necessary to keep some clues in a separate building?",
  "activity": {
   "title": "Data flow mapping",
   "materials": "Printed source cards the teacher prepares (domain controller, Linux web server, perimeter firewall sending CEF, Entra ID sign-ins, Azure Activity, a router sending plain Syslog), printed table cards (SecurityEvent, Syslog, CommonSecurityLog, SigninLogs, AzureActivity), whiteboard, markers.",
   "steps": [
    "Pairs place each source card on the whiteboard and draw the path its data takes to the workspace, labeling the connector and whether AMA, a forwarder or a service-to-service connection is used.",
    "Pairs attach the correct table card at the end of each path.",
    "The teacher announces a cost problem ('firewall allow logs from the test network are half the bill'); pairs write the DCR transformation idea that would solve it in plain words.",
    "The teacher announces a residency rule for one region; pairs decide whether to add a workspace and defend the choice to the neighboring pair."
   ]
  },
  "discussion": [
   "A team asks for its own workspace for privacy. What would you offer instead, and when would you agree to a separate workspace?",
   "What are the risks of collecting every event from every source, and how do DCRs help you strike a balance?"
  ],
  "exit": [
   [
    "Which agent and configuration object should you use to collect Windows security events from new servers?",
    "The Azure Monitor Agent configured by a data collection rule."
   ],
   [
    "Where does parsed CEF data land, and what component receives it from appliances?",
    "CommonSecurityLog, through a Linux log forwarder running AMA."
   ],
   [
    "Give one valid reason for a second Sentinel workspace.",
    "Data residency, a separate tenant, or a hard billing boundary."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a completed example path for the domain controller and let them use it as a template for the other sources.",
   "Extend: Ask fast finishers to write, in plain words or KQL, a DCR transformation that drops events from a test subnet and removes a sensitive field, and explain where it runs relative to billing."
  ]
 },
 {
  "t": "Sentinel analytics rules: scheduled, near-real-time, Microsoft security (incident creation) and anomaly rules; entity mapping",
  "objectives": [
   "Students will be able to choose between scheduled, NRT, Microsoft security and anomaly rules for a given detection requirement.",
   "Students will be able to explain the relationship between schedule, lookback and ingestion delay in scheduled rules.",
   "Students will be able to identify why Microsoft security rules cause duplicate incidents when Defender XDR incident sync is enabled.",
   "Students will be able to map query columns to entities and explain how entity mapping supports grouping and automation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about security guards and door sensors, and connect answers to speed versus flexibility."
   ],
   [
    15,
    "Teach",
    "Explain each rule type with one example, draw a timeline on the whiteboard to show ingestion delay and overlapping lookback, explain the Defender XDR duplicate trap, and show a sample query output table with columns mapped to Account and IP entities."
   ],
   [
    15,
    "Activity",
    "Run the rule design workshop below in groups of three."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions on detection speed and noise."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "A museum has guards who patrol every ten minutes and a sensor on the most valuable painting that alarms instantly. Why not put instant sensors on everything?",
  "activity": {
   "title": "Rule design workshop",
   "materials": "Printed requirement cards the teacher prepares (for example 'alert within a minute on break-glass sign-in', 'detect 10 failures then a success', 'turn Defender for Cloud alerts into incidents in a workspace without Defender XDR', 'notice unusual download volumes'), printed sample query outputs with column headers, whiteboard timeline, markers.",
   "steps": [
    "Groups match each requirement card to a rule type and write one sentence justifying it.",
    "For the scheduled rule card, groups choose a schedule and lookback and draw it on the whiteboard timeline with a late-arriving event.",
    "Groups take a sample query output and decide which columns map to Account, Host and IP entities, and how they would group alerts into incidents.",
    "The teacher reveals 'Defender XDR incident sync was just enabled'; groups decide which rules to disable and explain why."
   ]
  },
  "discussion": [
   "What trade-offs come with adding many NRT rules or very frequent scheduled rules?",
   "How would missing entity mapping affect an analyst and an automated response during a real incident?"
  ],
  "exit": [
   [
    "Which rule type is best for a simple condition that must be detected within about a minute?",
    "A near-real-time (NRT) rule."
   ],
   [
    "A rule runs every 30 minutes. Should its lookback be 20, 30 or 35 minutes, and why?",
    "35 minutes, slightly longer than the schedule, to cover ingestion delay."
   ],
   [
    "Why might an automation rule fail to block an IP from an incident created by a scheduled rule?",
    "The rule has no entity mapping for the IP column, so the incident carries no IP entity."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a decision flowchart card (Is it from another Microsoft product? Must it be under a minute? Is it a learned baseline? Otherwise scheduled) to use during the workshop.",
   "Extend: Ask fast finishers to write a short KQL sketch for the password spray detection and specify its entity mapping, custom details and incident grouping settings."
  ]
 },
 {
  "t": "Automation rules vs playbooks, incident management, workbooks, hunting queries, watchlists and threat intelligence",
  "objectives": [
   "Students will be able to distinguish automation rules from playbooks and choose the right one for a scenario.",
   "Students will be able to identify the permissions required for Sentinel to run a playbook.",
   "Students will be able to describe the incident lifecycle, including statuses and closing classifications.",
   "Students will be able to match workbooks, hunting queries, watchlists and threat intelligence to their purposes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about email sorting rules versus a personal assistant and record answers in two columns."
   ],
   [
    15,
    "Teach",
    "Present automation rules (triggers, conditions, actions, order, expiry), playbooks (triggers, managed identity, Automation Contributor), the incident page and classifications, then workbooks, hunting with bookmarks and livestream, watchlists with _GetWatchlist, and threat intelligence."
   ],
   [
    15,
    "Activity",
    "Run the 'Which tool?' card sort below in groups of three or four."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about when to automate and when to keep a human in the loop."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Your email program can automatically move or flag messages, and a personal assistant can call people and wait for your approval. Which tasks would you give to each?",
  "activity": {
   "title": "Which tool? card sort",
   "materials": "Printed scenario cards the teacher prepares (about 14, such as 'auto-close backup-job incidents', 'ask a manager to approve disabling a user', 'weekly chart for leadership', 'search for a rare persistence technique', 'list of approved scanner IPs', 'vendor list of malicious domains'), whiteboard with six labeled columns, sticky notes.",
   "steps": [
    "Groups sort each scenario card into Automation rule, Playbook, Workbook, Hunting, Watchlist or Threat intelligence.",
    "For any card sorted as Playbook, groups write on a sticky note the trigger, the identity it uses and the role Sentinel needs.",
    "Groups pick one VIP scenario and design the combination: watchlist, analytics rule change, automation rule and playbook, drawn as a flow on the whiteboard.",
    "Groups compare their columns with another group and resolve differences, then the teacher reviews any cards most groups disagreed on."
   ]
  },
  "discussion": [
   "Which response actions are safe to fully automate, and which should require an analyst's approval in a playbook?",
   "How do closing classifications such as benign positive and false positive help a team tune its detections over time?"
  ],
  "exit": [
   [
    "You want incidents from one rule automatically tagged and assigned with no code. Which feature?",
    "An automation rule."
   ],
   [
    "What role does Sentinel need on a playbook's resource group to run it?",
    "Microsoft Sentinel Automation Contributor."
   ],
   [
    "How does a query use a watchlist named ApprovedScanners?",
    "By calling _GetWatchlist('ApprovedScanners') and joining or filtering on it."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-line definition card for each of the six tools and start them with eight scenario cards instead of fourteen.",
   "Extend: Ask fast finishers to design a hunt for a hypothesis of their choice, naming the tables they would query, what they would bookmark, and when they would promote a bookmark to an incident."
  ]
 },
 {
  "t": "Log tiers and retention (Analytics vs data lake/auxiliary), custom tables, KQL basics",
  "objectives": [
   "Students will be able to compare the Analytics tier with lower-cost tiers in terms of features, query behavior and cost.",
   "Students will be able to design a tiering and retention plan that keeps detections while reducing cost.",
   "Students will be able to explain how custom tables are created and how they are named.",
   "Students will be able to read and write a basic KQL query using where, summarize, project and sort."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about kitchens and storage units, and record which household items go where and why."
   ],
   [
    15,
    "Teach",
    "Explain the Analytics tier, Basic and Auxiliary plans, the data lake, the summarize-and-promote pattern, interactive versus long-term retention with search jobs and restore, custom _CL tables via the Logs Ingestion API and DCRs, then walk line by line through the sample KQL query on the projector."
   ],
   [
    15,
    "Activity",
    "Run the tier-and-query workshop below in pairs, using student laptops or paper."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions on cost versus investigative value."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "At home, which things do you keep in the kitchen and which go into a cheap storage unit across town? What makes you decide?",
  "activity": {
   "title": "Tier-and-query workshop",
   "materials": "Printed log source cards the teacher prepares (each with daily volume, how often it is queried, whether detections use it, and a retention requirement), a printed sample table of about 15 sign-in rows, projector, student laptops with a browser or paper.",
   "steps": [
    "Pairs assign each log source card to the Analytics tier or a lower-cost tier and set interactive and long-term retention, writing one reason per card.",
    "For one bulk source, pairs describe a daily summary they would promote to Analytics and what rule would watch it.",
    "Using the printed sign-in table, pairs write a KQL query that counts failures per user in the last day and keeps only users above a threshold, then trace by hand what rows each line returns.",
    "Pairs swap queries with another pair, check the operator order, and the teacher projects one correct version and discusses filtering on time first."
   ]
  },
  "discussion": [
   "What could go wrong if a team moves a log source to a lower-cost tier without checking which analytics rules depend on it?",
   "How would you explain to a finance director why some data is kept for years even though it is rarely queried?"
  ],
  "exit": [
   [
    "Which tier must data be in for near-real-time and standard scheduled analytics rules?",
    "The Analytics tier."
   ],
   [
    "How do you access data that has moved into long-term retention?",
    "Run a search job or restore it."
   ],
   [
    "Write the KQL line that counts rows per IPAddress.",
    "summarize count() by IPAddress"
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a KQL operator cheat card with one example per operator and a partially written query to complete.",
   "Extend: Ask fast finishers to design a custom table for a homegrown app's JSON logs, naming the table, describing the DCR transformation, and choosing its table plan with a justification."
  ]
 },
 {
  "t": "Microsoft Security Copilot: capacity in SCUs, roles, plugins, promptbooks, standalone vs embedded experiences and agents",
  "objectives": [
   "Students will be able to explain how Security Copilot respects user permissions in underlying products.",
   "Students will be able to describe SCU-based capacity and how standalone and embedded use share it.",
   "Students will be able to distinguish the Copilot owner and contributor roles and their control over plugins.",
   "Students will be able to recommend promptbooks or agents for a scenario and identify the governance each requires."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a librarian and a library card, and draw out the idea that a helper should not exceed the requester's access."
   ],
   [
    15,
    "Teach",
    "Cover the permission principle, SCUs and overage, usage monitoring, owner and contributor roles with default Entra mappings, plugins and who controls them, promptbooks with inputs, standalone versus embedded experiences, and agents with their own identity and guardrails. End with the layered governance summary on the whiteboard."
   ],
   [
    15,
    "Activity",
    "Run the Copilot governance role-play below in groups of four."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions on trust and oversight of AI in security operations."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A research librarian helps you using your library card. Should the librarian be able to bring you books from a restricted archive your card cannot open? Why or why not?",
  "activity": {
   "title": "Copilot governance role-play",
   "materials": "Printed role cards the teacher prepares (Copilot owner, SOC analyst contributor, help desk contributor, finance manager), printed request cards (for example 'enable a third-party plugin', 'summarize an incident I cannot open', 'why did usage spike', 'deploy a phishing triage agent'), whiteboard, sticky notes.",
   "steps": [
    "Each group member takes a role card; the group draws request cards one at a time and the person holding the relevant role responds.",
    "For each request, the group writes on a sticky note what Copilot will or will not do and which layer decides it (SCUs, Copilot role, plugin, product permission or agent guardrail).",
    "Groups design a promptbook for a common investigation, listing its input and four prompts in order.",
    "Groups present one tricky request to the class, and the teacher confirms the governing layer."
   ]
  },
  "discussion": [
   "What oversight would you require before letting an agent take action, such as closing phishing reports, without a human reviewing each one?",
   "How could usage monitoring help a team decide whether to buy more capacity or change how analysts work?"
  ],
  "exit": [
   [
    "Can a contributor use Copilot to view incidents they lack permission to see in Defender XDR? Why?",
    "No, Copilot uses the user's own permissions in each product."
   ],
   [
    "Who controls which plugins are available to the organization?",
    "Copilot owners."
   ],
   [
    "What is a promptbook?",
    "A saved, reusable sequence of prompts, often with inputs, that runs together for a common task."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a layered diagram card (SCUs, roles, plugins, product permissions, agent guardrails) with one example beside each layer to reference during the role-play.",
   "Extend: Ask fast finishers to write a one-page governance policy for introducing a Copilot agent, covering its identity, permissions, review process and capacity monitoring."
  ]
 },
 {
  "t": "Microsoft Purview Audit for investigations",
  "objectives": [
   "Students will be able to compare Audit (Standard) and Audit (Premium) in retention, policies and available insight events.",
   "Students will be able to identify the audit events that scope an email compromise, including MailItemsAccessed and search-query events.",
   "Students will be able to plan an audit search with the correct filters, roles and export steps.",
   "Students will be able to explain how audit data is brought into Microsoft Sentinel for correlation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a stolen office badge and list what investigators would want to know."
   ],
   [
    15,
    "Teach",
    "Explain the unified audit log and its services, Standard versus Premium, the licensing change for MailItemsAccessed and Send, the key investigation events, how to search and read AuditData, required roles, the Management Activity API and the Sentinel OfficeActivity table, and preparation steps."
   ],
   [
    15,
    "Activity",
    "Run the audit log detective activity below in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about scoping and notification."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a half sheet."
   ]
  ],
  "warmup": "Someone used a stolen badge in your office building last night. What would you want the building's logs to tell you, and what would you do if the logs had been switched off?",
  "activity": {
   "title": "Audit log detective",
   "materials": "A printed audit log excerpt the teacher prepares (about 20 fictional rows with columns for time, user, operation such as UserLoggedIn, New-InboxRule, MailItemsAccessed, SearchQueryInitiatedExchange and FileDownloaded, client IP, and a short AuditData note), highlighters, whiteboard.",
   "steps": [
    "Pairs highlight every row from the unfamiliar IP address and build a timeline on paper from first sign-in to last action.",
    "Pairs identify which rows show persistence (inbox rule or app consent), data access (mail or files) and intent (search queries), and note which tier each event requires.",
    "Pairs write the remediation and notification steps their findings support, such as deleting the rule and notifying specific partners.",
    "The teacher projects the intended timeline; pairs compare and discuss what they would have lost without Premium events or with auditing turned off."
   ]
  },
  "discussion": [
   "How does knowing exactly which emails were accessed change an organization's notification obligations and costs?",
   "Which users would you prioritize for Audit (Premium) licensing and longer retention, and why?"
  ],
  "exit": [
   [
    "Which event lists the mailbox items a compromised account accessed?",
    "MailItemsAccessed."
   ],
   [
    "Name one capability that still requires Audit (Premium).",
    "Search-query events, longer retention, or custom audit log retention policies."
   ],
   [
    "Which role lets an investigator search the unified audit log without changing settings?",
    "View-Only Audit Logs."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a glossary card explaining each operation name in the excerpt and a partially filled timeline template.",
   "Extend: Ask fast finishers to describe a Sentinel analytics rule using the OfficeActivity table that alerts when a new inbox rule forwards mail to an external domain, including its entity mapping."
  ]
 }
]);
